<template>
  <view class="container">
    <view class="timer">{{ formatTime }}</view>
    <view class="buttons">
      <button class="start" @click="startTimer">开始</button>
      <button class="stop" @click="stopTimer">停止</button>
      <button class="reset" @click="resetTimer">重置</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: null,
      elapsedTime: 0,
      timerInterval: null
    }
  },
  computed: {
    formatTime() {
      const date = new Date(this.elapsedTime)
      const minutes = date.getUTCMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0')
      return `${minutes}:${seconds}.${milliseconds}`
    }
  },
  methods: {
    startTimer() {
      if (!this.startTime) {
        this.startTime = Date.now() - this.elapsedTime
      }
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime
      }, 10)
    },
    stopTimer() {
      clearInterval(this.timerInterval)
    },
    resetTimer() {
      this.startTime = null
      this.elapsedTime = 0
      clearInterval(this.timerInterval)
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.timer {
  font-size: 5rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 20rem;
}

button {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  color: white;
  cursor: pointer;
}

.start {
  background-color: rgb(174, 255, 174);
}

.stop {
  background-color: rgb(255, 177, 177);
}

.reset {
  background-color: rgb(199, 199, 255);
}
</style>
