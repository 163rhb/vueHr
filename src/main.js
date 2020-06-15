import Vue from 'vue'
import App from './App.vue'
import router from './router'
/*import ElementUI from 'element-ui'//可通过提示导入*/

import {
    Button,
    Input,
    Table,
    TableColumn,
    Dialog,
    Card,
    Container,
    Icon,
    Select,
    Form,
    Tag,
    Tree,
    Pagination,
    Badge,
    Loading,
    Message,
    MessageBox,
    Menu,
    Tabs,
    TabPane,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    Steps,
    Tooltip,
    Popover,
    Collapse,
    FormItem,
    Checkbox,
    Header,
    DropdownMenu,
    DropdownItem,
    Aside,
    Main,
    MenuItem,
    Submenu,
    Option,
    Col,
    Row,
    Upload,
    Radio,
    DatePicker,
    RadioGroup,
    CollapseItem,
    Switch
} from 'element-ui';
Vue.use(Switch);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Aside);
Vue.use(Message)
Vue.use(MessageBox)
Vue.use(Main);
Vue.use(Checkbox);
Vue.use(FormItem);
Vue.use(Collapse);
Vue.use(Popover);
Vue.use(Menu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(Steps);
Vue.use(Tooltip);
Vue.use(Tree);
Vue.use(Pagination);
Vue.use(Badge);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Container);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Form);
Vue.use(Tag);
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};



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
Vue.config.productionTip = false
/*var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8088'*/
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
//Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
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
/*Vue.use(ElementUI,{size:'small'})*/
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
