
import * as layers from "../mutation-type/layer"

const state = {
    userId:'',
}
const getters = {
    getUserId:state=>state.userId,
}
const mutations = {
    [layers.SET_USER_ID]: (state, userId) => {
        state.userId = userId
    },
}
export default {
    namespaced: true, 
    state,
    getters,
    mutations
}
