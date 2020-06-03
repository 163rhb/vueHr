import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'//可通过提示导入
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'

import {postRequst} from "@/utils/api";
import {getRequst} from "@/utils/api";
import {putRequst} from "@/utils/api";
import {deleteRequst} from "@/utils/api";
import {postKeyValueRequst} from "@/utils/api";
import {initMenu} from "@/utils/menus";
Vue.prototype.postRequst=postRequst
Vue.prototype.getRequst=getRequst
Vue.prototype.putRequst=putRequst
Vue.prototype.deleteRequst=deleteRequst
Vue.prototype.postKeyValueRequst=postKeyValueRequst

//注册全局插件 通过this.$..引用
//注释不能在行上添加，应另起一行，避免出现莫名错误
/*Vue.config.productionTip = false
var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8088'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios*/
router.beforeEach((to, from, next) => {
   /* // eslint-disable-next-line no-console
    console.log(from)
    // eslint-disable-next-line no-console
    console.log(to)*/
    if (to.path == '/') {
        next();
    }else {
        if (window.sessionStorage.getItem("user")) {
            /*alert("初始化菜单，加载路由")*/
            initMenu(router, store);
            next();
        }else{
            next('/?redirect='+to.path);
        }
    }
})
Vue.use(ElementUI,{size:'small'})
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
