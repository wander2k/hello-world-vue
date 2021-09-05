<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>key: {{ keyInput }}</p>
    <p>keyCode: {{ keyCode }}</p>
    <button v-on:click="cameraTest">Camera Test</button>
    <button v-on:click="scannerTest">Scanner Test</button>
    <button v-on:click="inappbrowserTest">InAppBrowserTest</button>
    <button v-on:click="inappbrowserClose">InappbrowserClose</button>
    <button v-on:click="routerTest">RouterTest</button>
    <p>camera present : {{ cameraPresent }}</p>
    <p>camera available: {{ cameraAvailable }}</p>    
    <textarea cols="100" rows="30" v-bind:value="note"></textarea>    
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props: {
    msg: String,
    keyInput: Number,
    keyCode: String,
    cameraPresent: Boolean,
    cameraAvailable: Boolean,
    note : String,
    InAppBrowserRef : Object
  },
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  created() {
     window.addEventListener("beforeunload", this.onBeforeunload);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
   getNowYMD(){
      var dt = new Date();
      var y = dt.getFullYear();
      var m = ("00" + (dt.getMonth()+1)).slice(-2);
      var d = ("00" + dt.getDate()).slice(-2);
      var result = y + "/" + m + "/" + d;
      return result;
    },

    onBeforeunload() {
      this.InAppBrowserRef.close();
    },
    onDeviceReady() {
      console.log("device ready....");
      console.log(navigator.camera);
      var str = JSON.stringify(navigator.camera);
      this.note = str;

      const nowDt = this.getNowYMD();
      
      var url = "file:///android_asset/www/go.html#/?inputDate=" + nowDt;
      console.log(url);
      var ref = window.cordova.InAppBrowser.open(url, '_blank', 'location=no');
      // var ref = window.cordova.InAppBrowser.open(url, '_self', 'location=yes');
      this.InAppBrowserRef = ref;
      console.log(ref);

    },   

    routerTest() {
       console.log("start routerTest");
       this.$router.push("/second");
       console.log(window.location.href);
       console.log("end routerTest");
    },

    inappbrowserClose() {
      this.InAppBrowserRef.close();
    },

    inappbrowserTest() {
      // var url =  window.location.origin + '/second';
      // var url = "file:///android_asset/www/index.html#/second";
      // var url = "http://localhost/second";
      // var url = "/second";
      var url = "file:///android_asset/www/go.html";
      console.log(url);
      var ref = window.cordova.InAppBrowser.open(url, '_blank', 'location=no');
      // var ref = window.cordova.InAppBrowser.open(url, '_self', 'location=yes');
      this.InAppBrowserRef = ref;
      console.log(ref);
    },

    onKeyDown(event) {
      this.keyInput = event.key;
      this.keyCodeInput = event.keyCode;
    },

    cameraTest: function (event) {
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

      window.cordova.plugins.diagnostic.isCameraAvailable(
        function (available) {
          self.cameraAvailable = available;
          console.log("Camera is " + (available ? "available" : "unavailable"));
        },
        function (error) {
          console.error("The following error occurred: " + error);
        },
        false
      ); 

    },

    scannerTest: function (event) {
      console.log(event);
      try {
        window.cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert(
              "We got a barcode\n" +
                "Result: " +
                result.text +
                "\n" +
                "Format: " +
                result.format +
                "\n" +
                "Cancelled: " +
                result.cancelled
            );
          },
          function (error) {
            alert("Scanning failed: " + error);
          },
          {
            preferFrontCamera: true, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false, // iOS and Android
          }
        );
      } catch(error) {
        console.log(error);
      }
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
