<template>
  <div class="lg:text-10xl flex gap-6 text-7xl font-bold md:text-9xl">
    <span class="gradient-text title-code transition-transform duration-300">Code</span>
    <span class="gradient-text title-time transition-transform duration-300">Time</span>
  </div>
</template>

<style scoped>
.gradient-text {
  font-family: "Share Tech Mono", monospace;
  background-clip: text;
  background-size: 500% 500%;
  -webkit-background-clip: text;
  color: transparent;
  animation: spin 12s infinite;
}

.title-code {
  background-image: linear-gradient(-45deg, #0000 10%,  #2ad 50%);
}

.title-time {
  background-image: linear-gradient(135deg, #777 40%,  #0000 90%);
}

@keyframes spin {
  0% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
