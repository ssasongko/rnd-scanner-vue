<template>
  <div
    ref="wrapper"
    :class="{ fullscreen: fullscreen }"
    @fullscreenchange="fullscreen = document.fullscreenElement !== null"
  >
    <div 
      v-if="isLoading"
      class="bg-white h-full text-black flex justify-center items-center"
    >
      <p>Loading...</p>
    </div>
    <qrcode-stream
      :track="paintOutline"
      :paused="isPaused"
      @detect="onDetect"
      @camera-on="handleCameraOn" 
    >
      <div
        v-if="validationSuccess"
        class="validation-success"
      >
        Verified!
      </div>

      <div
        v-if="validationFailure"
        class="validation-failure"
      >
        {{ errorMessage }}
      </div>

      <div
        v-if="validationPending"
        class="validation-pending"
      >
        Verifying QR code...
      </div>

      <div class="bg-white text-black">
        {{ result }}
      </div>

      <button
        class="fullscreen-button"
        @click="fullscreen = !fullscreen"
      >
        <img
          src="/fullscreen-exit.svg"
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
  emits: ['close', 'close-failed'],
  data() {
    return {
      fullscreen: true,
      isInit: true,
      isLoading: true,
      isPaused: false,
      isValid: undefined,
      result: null,
      errorMessage: 'Invalid QR code'
    }
  },
  computed: {
    validationPending() {
      return this.isValid === undefined && this.isPaused
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
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
  mounted(){
    /** 
     * 5 minutes timeout to prevent the camera from being turned on for too long
     * and to prevent the user from forgetting to close the camera
    */
    setTimeout(() => {
      if(this.isValid === undefined){
        this.errorMessage = 'QR code not detected';
        this.isValid = false;
        this.isPaused = true;
        
        setTimeout(() => {
          this.$emit('close-failed');
        }, 5000);
      }
    }, 300000);
  },
  methods: {
    handleCameraOn(){
      this.isLoading = false;
      this.isValid = undefined;
    },
    async onDetect([firstDetectedCode]) {
      const value = atob(firstDetectedCode.rawValue);

       try {
        const decodedObj = JSON.parse(value);

        // Check if the decoded object has the required keys
        if (
          decodedObj &&
          typeof decodedObj === 'object' &&
          'classroom_batch_id' in decodedObj &&
          'batch_id' in decodedObj
        ) {
          // Object has both keys
          this.result = decodedObj;
          this.isPaused = true;
          this.isValid = true;
        } else {
          throw new Error('Invalid QR code');
        }
      } catch (error) {
        this.isValid = false;
        
         // some more delay, so users have time to read the message
        setTimeout(() => {
          this.isValid = undefined;
          this.isPaused = true;
          this.$emit('close-failed');
        }, 2000);
      }
    },
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

.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>