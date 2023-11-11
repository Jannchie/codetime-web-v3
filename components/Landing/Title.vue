<template>
  <div class="mt-24 md:text-8xl text-7xl font-bold flex gap-5">
    <span class="gradient-text title-code">Code</span>
    <span class="gradient-text title-time">Time</span>
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
