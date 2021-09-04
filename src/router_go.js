import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import HelloSecond from "./components/HelloSecondDisplay.vue";
Vue.use(Router);
export default new Router({
  mode: "hash",
  routes: [
    //ルーティングの設定
    {
      path: '/',
      name: 'home',
      component: HelloSecond
    },
    {
      path : '/hello',
      name : 'hello',
      component : HelloWorld
    }
  ]
});