<template>
  <div>
    <p>Is Mobile ? {{ isOpenFromMobile }}</p>
    <p>Opened ? {{ showScanner }}</p>
    <hr>

    <button
      class="cursor-not-allowed"
      :disabled="!isOpenFromMobile"
      @click="showScanner = !showScanner"
    >
      Open Scanner
    </button>
    <ScannerQR 
      v-if="showScanner"
      @close="showScanner = false"
      @close-failed="showScanner = false"
      @close-success="showScanner = false"
    />
  </div>
</template>

<script>
  import ScannerQR from '../../components/ScannerQR.vue';

  export default {
    components: { 
      ScannerQR 
    },
    data() {
      return {
        showScanner: false
      }
    },
    computed: {
      isOpenFromMobile() {
        //  Check if the user is using a mobile device
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>