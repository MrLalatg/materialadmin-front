import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import Banlist from "./Banlist";
import Donate from "./Donate";
import Home from "./Home";
import WaitPage from "./WaitPage";
import moment from "moment";
import 'vue-progress-path/dist/vue-progress-path.css'
import VueProgress from 'vue-progress-path'

Vue.use(VueProgress);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$moment = moment;


const routes = [
  {path: '/bans', component: Banlist},
  {path: '/donate', component: Donate},
  {path: '/payment', component: WaitPage},
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
