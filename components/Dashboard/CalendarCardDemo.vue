<template>
  <div
    class="relative min-h-210px border border-transparent rounded-2xl bg-surface-low p-[--padding]"
    style="--padding: 0.5rem;"
  >
    <div
      class="relative z-3 min-h-210px"
    >
      <div class="flex flex-col p-2">
        <div
          class="flex flex-wrap gap-2 children:flex-grow children:sm:flex-basis-[200px]"
          style="flex-wrap: nowrap;"
        >
          <div class="p-2">
            <div>
              <div class="text-base text-primary-containerd">
                Time/Total
              </div>
              <div class="text-nowrap text-sm text-surface-on">
                1374 hrs 31 mins
              </div>
            </div>
          </div>
          <div class="p-2">
            <div>
              <div class="text-base text-primary-containerd">
                Time/Today
              </div>
              <div class="text-nowrap text-sm text-surface-on">
                8 hrs 11 mins
              </div>
            </div>
          </div>
          <div class="p-2">
            <div>
              <div class="text-base text-primary-containerd">
                Streak/Current
              </div>
              <div class="text-nowrap text-sm text-surface-on">
                24 days
              </div>
            </div>
          </div>
          <div class="p-2">
            <div>
              <div class="text-base text-primary-containerd">
                Streak/Largest
              </div>
              <div class="text-nowrap text-sm text-surface-on">
                71 days
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <div class="min-w-[700px]">
            <span class="flex"><svg
              class="plot"
              fill="currentColor"
              font-family="system-ui, sans-serif"
              font-size="10"
              text-anchor="middle"
              width="800"
              height="140"
              viewBox="0 0 800 140"
            >
              <!-- <style>
                :where(.plot) {
                --plot-background: white;
                display: block;
                height: auto;
                height: intrinsic;
                max-width: 100%;
                }

                :where(.plot text),
                :where(.plot tspan) {
                white-space: pre;
                }
              </style> -->
              <g
                aria-label="y-axis tick label"
                text-anchor="end"
                transform="translate(-8.5,7)"
              ><text
                y="0.32em"
                transform="translate(40,22)"
              >Sun</text><text
                y="0.32em"
                transform="translate(40,36)"
              >Mon</text><text
                y="0.32em"
                transform="translate(40,50)"
              >Tue</text><text
                y="0.32em"
                transform="translate(40,64)"
              >Wed</text><text
                y="0.32em"
                transform="translate(40,78)"
              >Thu</text><text
                y="0.32em"
                transform="translate(40,92)"
              >Fri</text><text
                y="0.32em"
                transform="translate(40,106)"
              >Sat</text></g>
              <g
                aria-label="cell"
                stroke="rgb(var(--r-color-surface-border-low))"
                stroke-opacity="0"
              >
                <rect
                  x="50"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="50"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="50"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="50"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="50"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="50"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="50"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="64"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="64"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="64"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="64"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="64"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="64"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="64"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="78"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="78"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="78"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="78"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="78"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="78"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="78"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="92"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="92"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="92"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="92"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="92"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="92"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="92"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="106"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="120"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="134"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="134"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="134"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="134"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="134"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="134"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="134"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="148"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="148"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="148"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="148"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="148"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="148"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="148"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="162"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="162"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="162"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="162"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="162"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="162"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="162"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="176"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="176"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="176"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="176"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="176"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="176"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="176"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="190"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="190"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="190"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="190"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="190"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="190"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="190"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="204"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="204"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="204"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="204"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="204"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="204"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="204"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="218"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="218"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="218"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="218"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="218"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="218"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="218"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="232"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="232"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="232"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="232"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="232"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="232"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="232"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="246"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="246"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="246"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="246"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="246"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="246"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="246"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="260"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="260"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="260"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="260"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="260"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="260"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="260"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="274"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="274"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="274"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="274"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="274"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="274"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="274"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="288"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="288"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="288"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="288"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="288"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="288"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="288"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="302"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="302"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="302"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="302"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="302"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="302"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="302"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="316"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="316"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="316"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="316"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="316"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="316"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="316"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="330"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="330"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="330"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="330"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="330"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="330"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="330"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="344"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="344"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="344"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="344"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="344"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="344"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="344"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="358"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="358"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="358"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="358"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="358"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="358"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="358"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="372"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="372"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="372"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="372"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="372"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="372"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="372"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="386"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="386"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="386"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="386"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="386"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="386"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="386"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="400"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="400"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="400"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="400"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="400"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="400"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="400"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="414"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="414"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="414"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="414"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="414"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="414"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="414"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="428"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="428"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="428"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="428"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="428"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="428"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="428"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="442"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="442"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="442"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="442"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="442"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="442"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="442"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="456"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="456"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="456"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="456"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="456"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="456"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="456"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="470"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="470"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="470"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="470"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="470"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="470"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(34, 170, 255)"
                />
                <rect
                  x="470"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="484"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="484"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="484"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(34, 170, 255)"
                />
                <rect
                  x="484"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="484"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="484"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="484"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="498"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="498"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="498"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="498"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="498"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="498"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="498"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="512"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="512"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="512"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="512"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="512"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="512"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="512"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(34, 170, 255)"
                />
                <rect
                  x="526"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="526"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="526"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="526"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="526"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="526"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="526"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="540"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="540"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="540"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="540"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="540"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="540"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="540"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="554"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="554"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="554"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="554"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="554"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="554"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="554"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="568"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="568"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="568"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="568"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="568"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="568"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="568"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="582"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="582"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="582"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="582"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="582"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="582"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="582"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="596"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="596"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="596"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="596"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="596"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="596"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="596"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="610"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="610"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="610"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="610"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="610"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="610"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="610"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="624"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="624"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="624"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="624"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="624"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="624"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="624"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="638"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="638"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="638"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="638"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="638"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="638"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="638"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="652"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="652"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="652"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="652"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="652"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="652"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="652"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="666"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="666"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="666"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="666"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="666"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="666"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="666"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="680"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="680"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="680"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="680"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="680"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="680"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="680"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="694"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="694"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="694"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="694"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="694"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="694"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="694"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="708"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="708"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="708"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="708"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="708"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="708"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="708"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="722"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="722"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="722"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="722"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
                <rect
                  x="722"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="722"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="722"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="736"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="736"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(34, 170, 255)"
                />
                <rect
                  x="736"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="736"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="736"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(44, 170, 255, 0.8266666666666667)"
                />
                <rect
                  x="736"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="736"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="750"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="750"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="750"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="750"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="750"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="750"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="750"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(75, 170, 255, 0.30666666666666664)"
                />
                <rect
                  x="764"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(var(--r-color-surface-lowest))"
                />
                <rect
                  x="764"
                  width="11"
                  y="37"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="764"
                  width="11"
                  y="51"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="764"
                  width="11"
                  y="65"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="764"
                  width="11"
                  y="79"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(85, 170, 255, 0.13333333333333333)"
                />
                <rect
                  x="764"
                  width="11"
                  y="93"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(65, 170, 255, 0.48)"
                />
                <rect
                  x="764"
                  width="11"
                  y="107"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgb(34, 170, 255)"
                />
                <rect
                  x="778"
                  width="11"
                  y="23"
                  height="11"
                  rx="2"
                  ry="2"
                  fill="rgba(54, 170, 255, 0.6533333333333333)"
                />
              </g>
              <g
                aria-label="tip"
                fill="var(--plot-background)"
                stroke="currentColor"
                pointer-events="none"
                text-anchor="start"
                transform="translate(7,7)"
              />
            </svg></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
