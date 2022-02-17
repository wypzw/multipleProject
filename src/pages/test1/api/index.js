import http from '../ajax/index'
const api = {}
/**
 * 接口列表
 * @param {*} params 
 * @returns 
 */
api.picListUpdate = (params) => http.post('/achievementMaps/update', params)
export default api;