/* eslint-disable */

/*import '../utils/stomp.js'*/
/*import SockJS from '../utils/sockjs.js'*/
import Vue from 'vue'
import Vuex from 'vuex'
/*import { Notification } from 'element-ui';
import {getRequst} from "../utils/api";*/



Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
    state: {
        routes: [],
        /*用户间会话*/
        /*sessions: {},
        hrs: [],
        /!*当前选中的聊天用户*!/
        currentSession: null,*/
        /*当前用户*/
        currentHr: JSON.parse(window.sessionStorage.getItem("user")),
        filterKey: '',
        stomp: null,
        isDot: {}
    },
    mutations: {
        /*INIT_CURRENTHR(state, hr) {
            state.currentHr = hr;
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession(state, currentSession) {
            console.log(state.currentHr)
            Vue.set(state.isDot, state.currentHr.username + '#' + currentSession.username, false);
            state.currentSession = currentSession;
        },
        /!*设置当前用户和所选中聊天对象的会话*!/
        addMessage(state, msg) {
            let mss = state.sessions[state.currentHr.username + '#' + msg.to];
            if (!mss) {
                // state.sessions[state.currentHr.username+'#'+msg.to] = [];
                Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, []);
            }
            state.sessions[state.currentHr.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_DATA(state) {
            //浏览器本地的历史聊天记录可以在这里完成
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_HR(state, data) {
            state.hrs = data;
        }*/
    },
    actions: {
        /*connect(context) {
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({}, success => {
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    let receiveMsg = JSON.parse(msg.body);
                    if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
                        Notification.info({
                            title: '【' + receiveMsg.fromNickname + '】发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
                            position: 'bottom-right'
                        })
                        Vue.set(context.state.isDot, context.state.currentHr.username + '#' + receiveMsg.from, true);
                    }
                    console.log(receiveMsg)
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
                })
                // eslint-disable-next-line no-unused-vars
            }, error => {

            })
        },*/
       /* initData(context) {
            alert("initData")
            context.commit('INIT_DATA')
            getRequst("/chat/getallhrs").then(resp => {
                if (resp) {
                    context.commit('INIT_HR', resp);
                }
            })
        }*/
    }
})

/*store.watch(function (state) {
    return state.sessions
}, function (val) {
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/!*这个貌似是开启watch监测的判断,官方说明也比较模糊*!/
})*/


export default store;