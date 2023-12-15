<template>
  <div
    ref="wrapper"
    :class="{ fullscreen: fullscreen }"
    @fullscreenchange="fullscreen = document.fullscreenElement !== null"
  >
    <div 
      v-if="loading"
      class="bg-white h-full text-black flex justify-center items-center"
    >
      <p>Loading...</p>
    </div>
    <qrcode-stream
      :track="paintOutline"
      @error="logErrors"
      @camera-on="loading = false" 
    >
      <button
        class="fullscreen-button"
        @click="fullscreen = !fullscreen"
      >
        <img
          :src="fullscreenIcon"
          alt="toggle fullscreen"
        >
      </button>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },
  emits: ['close'],
  data() {
    return {
      fullscreen: true,
      loading: true
    }
  },
  computed: {
    fullscreenIcon() {
      if (this.fullscreen) {
        return '/fullscreen-exit.svg'
      } else {
        return '/fullscreen.svg'
      }
    }
  },
  watch: {
    fullscreen(enterFullscreen) {
      if (enterFullscreen) {
        this.requestFullscreen()
      } else {
        this.exitFullscreen()
        this.$emit('close')
      }
    }
  },
  methods: {
    requestFullscreen() {
      const elem = this.$refs.wrapper

      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen()
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen()
      }
    },
    logErrors: console.error,
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },
  }
}
</script>

<style scoped>
.fullscreen {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.fullscreen-button {
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
}

.fullscreen-button img {
  width: 2rem;
}
</style>