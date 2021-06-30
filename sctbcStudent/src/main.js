import Vue from 'vue'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as uiv from 'uiv'
import router from './router/index'
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.min.css'
import jquerys from './assets/js/jquery.min.js'
import $ from 'jquery'
import './assets/js/AdminLTE/app.js'
import './assets/js/bootstrap.min.js'

import echarts from 'echarts';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.use(router)
Vue.use(uiv)
Vue.use($)


//全局前置首位
router.beforeEach((to,from,next)=>{

  if(to.path=="/login"){
    next();
  }
  else{
    if(!sessionStorage.getItem("token")){
      console.log(to,from,next);
      next("/login")
    }
  }

  next();
 
})


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
