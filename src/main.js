import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import Banlist from "./Banlist";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {path: '/bans', component: Banlist},
  // {path: '/', component: }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
