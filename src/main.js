import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCordova from 'vue-cordova'
Vue.use(VueCordova)

Vue.config.productionTip = false

// var cordovaScript = document.createElement('script')
// cordovaScript.setAttribute('type', 'text/javascript')
// cordovaScript.setAttribute('src', 'cordova.js')
// document.body.appendChild(cordovaScript)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

router.push("/");
