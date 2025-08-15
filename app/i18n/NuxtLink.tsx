import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NuxtLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    return () => (
      <NuxtLink
        {...attrs}
        to={props.to}
      >
        {slots.default?.()}
      </NuxtLink>
    )
  },
})
