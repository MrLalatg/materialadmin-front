import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import Banlist from "./Banlist";
import Donate from "./Donate";
import Home from "./Home";
import moment from "moment";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$moment = moment;


const routes = [
  {path: '/bans', component: Banlist},
  {path: '/donate', component: Donate},
  {path: '/', component: Home}
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
