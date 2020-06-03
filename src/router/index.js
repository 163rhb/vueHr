import Vue from 'vue'
import Router from 'vue-router'//可通过提示导入
import Login from "@/views/Login";
import Homel from "@/views/Homel";
/*import FriendChat from "@/views/chat/FriendChat";*/
import notFound from "@/views/notFound";

Vue.use(Router)
export default new Router(
    {
        /*mode:'history',*/
        routes: [
            {
                path: '/',
                name: 'Login',
                component: Login,
                hidden:true,
            },
            {
                path: '/home',
                name: 'Homel',
                component: Homel,
                hidden:true,
                meta:{
                    roles:['admin','user']
                },
                children:[
                   /* {
                        path:'/chat',
                        name:'在线聊天',
                        component:FriendChat,
                        hidden:true
                    }*/
                ]
            },
            {
                path:'*',
                component:notFound
            }
]})

