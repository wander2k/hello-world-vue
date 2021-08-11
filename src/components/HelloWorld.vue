<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
    <p>key: {{ key }}</p>
    <p>keyCode: {{ keyCode }}</p>
    <button v-on:click="scannerTest">Scanner</button>
    <p>camera present : {{ cameraPresent }}</p>
    <p>camera available: {{ cameraAvailable }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    key: Number,
    keyCode: String,
    keyInput: String,
    cameraPresent: Boolean,
    cameraAvailable: Boolean,
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    onKeyDown(event) {
      this.key = event.key;
      this.keyCode = event.keyCode;
    },

    scannerTest: function (event) {
      let self = this;
      var str = JSON.stringify(window.cordova.plugins.barcodeScanner);
      console.log(str);
      console.log(event);
      console.log("6666");

      window.cordova.plugins.diagnostic.isCameraPresent(
        function (present) {
          self.cameraPresent = present;
          console.log("Camera is " + (present ? "present" : "absent"));
        },
        function (error) {
          console.error("The following error occurred: " + error);
        }
      );

      window.cordova.plugins.diagnostic.requestCameraAuthorization(
        function (status) {
          console.log(
            "Authorization request for camera use was " +
              (status == window.cordova.plugins.diagnostic.permissionStatus.GRANTED
                ? "granted"
                : "denied")
          );
          self.cameraAvailable = status == window.cordova.plugins.diagnostic.permissionStatus.GRANTED
                ? true
                : false;
        },
        function (error) {
          console.error("The following error occurred: " + error);
        },
        false
      ); // try {
      //   window.cordova.plugins.barcodeScanner.scan(
      //     function (result) {
      //       alert(
      //         "We got a barcode\n" +
      //           "Result: " +
      //           result.text +
      //           "\n" +
      //           "Format: " +
      //           result.format +
      //           "\n" +
      //           "Cancelled: " +
      //           result.cancelled
      //       );
      //     },
      //     function (error) {
      //       alert("Scanning failed: " + error);
      //     },
      //     {
      //       preferFrontCamera: true, // iOS and Android
      //       showFlipCameraButton: true, // iOS and Android
      //       showTorchButton: true, // iOS and Android
      //       torchOn: true, // Android, launch with the torch switched on (if available)
      //       saveHistory: true, // Android, save scan history (default false)
      //       prompt: "Place a barcode inside the scan area", // Android
      //       resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //       formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      //       orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      //       disableAnimations: true, // iOS
      //       disableSuccessBeep: false, // iOS and Android
      //     }
      //   );
      // } catch(error) {
      //   console.log(error);
      // }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
