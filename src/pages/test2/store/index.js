import Vue from 'vue'
import Vuex from 'vuex'
import * as users from './mutation-type/user'
import createLogger from 'vuex/dist/logger'
import layer from "./modules/layer"
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
    state: {
        //用户信息
        userInfo: {},
    },
    mutations: {
        [users.SET_USER_INFO]: (state, userInfo) => {
            state.userInfo = userInfo
        },
    },
    actions: {     
        setUserInfo({commit, state},{userInfo}) {
            commit(users.SET_USER_INFO, userInfo)
        }
    },
    getters: {
        getUserInfo: state=> state.userInfo,
    },
    modules: {
        layer
    },
    plugins: debug ? [createLogger()] : []
})

export default store