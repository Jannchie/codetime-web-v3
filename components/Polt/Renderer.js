import * as Plot from '@observablehq/plot'
import { h, withDirectives } from 'vue'

class Document {
  constructor() {
    this.documentElement = new Element(this, 'html')
  }

  createElementNS(namespace, tagName) {
    return new Element(this, tagName)
  }

  createElement(tagName) {
    return new Element(this, tagName)
  }

  createTextNode(value) {
    return new TextNode(this, value)
  }

  querySelector() {
    return null
  }

  querySelectorAll() {
    return []
  }
}

class Style {
  static empty = new Style()
  setProperty() { }
  removeProperty() { }
}

class Element {
  constructor(ownerDocument, tagName) {
    this.ownerDocument = ownerDocument
    this.tagName = tagName
    this.attributes = {}
    this.children = []
    this.parentNode = null
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value)
  }

  setAttributeNS(namespace, name, value) {
    this.setAttribute(name, value)
  }

  getAttribute(name) {
    return this.attributes[name]
  }

  getAttributeNS(name) {
    return this.getAttribute(name)
  }

  hasAttribute(name) {
    return name in this.attributes
  }

  hasAttributeNS(name) {
    return this.hasAttribute(name)
  }

  removeAttribute(name) {
    delete this.attributes[name]
  }

  removeAttributeNS(namespace, name) {
    this.removeAttribute(name)
  }

  addEventListener() {
    // ignored; interaction needs real DOM
  }

  removeEventListener() {
    // ignored; interaction needs real DOM
  }

  dispatchEvent() {
    // ignored; interaction needs real DOM
  }

  append(...children) {
    for (const child of children) {
      this.appendChild(child?.ownerDocument ? child : this.ownerDocument.createTextNode(child))
    }
  }

  appendChild(child) {
    this.children.push(child)
    child.parentNode = this
    return child
  }

  insertBefore(child, after) {
    if (after == null) {
      this.children.push(child)
    }
    else {
      const i = this.children.indexOf(after)
      if (i < 0) {
        throw new Error('insertBefore reference node not found')
      }
      this.children.splice(i, 0, child)
    }
    child.parentNode = this
    return child
  }

  querySelector() {
    return null
  }

  querySelectorAll() {
    return []
  }

  get textContent() {
    return this.children.map(c => c.textContent).join('')
  }

  set textContent(value) {
    this.children = [this.ownerDocument.createTextNode(value)]
  }

  set style(value) {
    this.attributes.style = value
  }

  get style() {
    return Style.empty
  }

  toHyperScript() {
    return h(
      this.tagName,
      this.attributes,
      this.children.sort((d) => {
        return d.tagName === 'style' ? -1 : 1
      }).map((c) => {
        return c.toHyperScript()
      }),
    )
  }
}
class TextNode {
  constructor(ownerDocument, nodeValue) {
    this.ownerDocument = ownerDocument
    this.nodeValue = String(nodeValue)
  }

  toHyperScript() {
    return this.nodeValue
  }
}

// Converts the real DOM to virtual DOM (for client-side hydration).
function toHyperScript(node) {
  if (node.nodeType === 3) {
    return node.nodeValue
  } // TextNode
  const props = {}
  for (const name of node.getAttributeNames()) props[name] = node.getAttribute(name)
  const children = []
  for (let child = node.firstChild; child; child = child.nextSibling) children.push(toHyperScript(child))
  return h(node.tagName, props, children)
}

export default {
  props: {
    options: Object, /** @type {} */
    mark: Object,
    defer: Boolean,
    method: { type: String, default: 'plot' },
  },
  render() {
    const { method } = this
    const options = {
      ...(method === 'plot' && {
        marks: this.mark == null ? [] : [this.mark],
        width: 1110, // better default for Codetime
      }),
      ...this.options,
      className: this.options.className && 'plot',
    }
    if (this.defer) {
      const disconnect = () => {
        if (this._observer !== undefined) {
          this._observer.disconnect()
          this._observer = undefined
        }
        if (this._idling !== undefined) {
          cancelIdleCallback(this._idling)
          this._idling = undefined
        }
      }

      const unmounted = (el) => {
        while (el.lastChild) el.lastChild.remove()
        disconnect()
      }

      const mounted = (el) => {
        disconnect() // remove old listeners
        function observed() {
          unmounted(el) // remove old plot (and listeners)
          el.append(Plot[method](options))
        }
        const rect = el.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          observed()
        }
        else {
          this._observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                observed()
              }
            },
            { rootMargin: '100px' },
          )
          this._observer.observe(el)
          if (typeof requestIdleCallback === 'function') {
            this._idling = requestIdleCallback(observed)
          }
        }
      }
      const { height = 300 } = this.options
      return withDirectives(
        h(
          'span',
          method === 'plot'
            ? [
                h('div', {
                  style: {
                    maxWidth: '100%',
                    width: `1110px`,
                    aspectRatio: `688 / ${height}`,
                  },
                }),
              ]
            : [],
        ),
        [
          [
            {
              mounted,
              updated: mounted,
              unmounted,
            },
          ],
        ],
      )
    }
    if (typeof document !== 'undefined') {
      const plot = Plot[method](options)
      plot.addEventListener('input', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.$emit('input', e, plot.value)
      })
      plot.addEventListener('pointerup', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.$emit('pointerup', e, plot.value)
      })
      const replace = (el) => {
        while (el.lastChild) el.lastChild.remove()
        el.append(plot)
      }
      return withDirectives(h('span', [toHyperScript(plot)]), [[{ mounted: replace, updated: replace }]])
    }
    return h('span', [Plot[method]({ ...options, document: new Document() }).toHyperScript()])
  },
}
