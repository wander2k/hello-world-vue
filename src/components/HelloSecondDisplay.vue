<template>
  <div class="hello second">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloSecond",
  props: {
  },
  data: function () {
    return {
      msg: "fixed hello second."
    }
  },  
  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  beforeDestroy() {
    //document.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    onDeviceReady() {
      console.log("device ready....");
      this.msg = "See me? Second Screen?";
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
