import axios from 'axios'
import qs from 'qs'
import { Message } from "element-ui"
axios.defaults.timeout = 15000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.withCredentials = false
const http = {}
http.get = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.get(url, {params: params},
            ).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
            console.log(err)
        })
    })
}
http.post = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.post(url, params, {
            headers: {

            }
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
http.postUrl = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        let newStr = ''
        for (let item in params){
            newStr += encodeURIComponent(item) + '=' + encodeURIComponent(params[item]) + '&'
        }
        newStr = newStr.slice(0, -1)
        console.log(newStr)
        axios.post(url+"?"+newStr, null, {
            headers: {
               
            }
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
http.postFormData = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.post(url, params, {
            transformRequest: [
                function(oldData){
                    let newStr = ''
                    for (let item in oldData){
                        newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
                    }
                    newStr = newStr.slice(0, -1)
                    return newStr
                }
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
http.postFormDataFile = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.post(url, params, {
            transformRequest: [
                function(oldData){
                    let newStr = ''
                    for (let item in oldData){
                        newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&'
                    }
                    newStr = newStr.slice(0, -1)
                    return newStr
                }
            ],
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
http.put = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        params = qs.stringify(params)
        axios.put(url, params).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
http.putJson = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.put(url, params, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
http.delete = (url, params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.delete(url, {params: params}, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
axios.interceptors.request.use(
    config => {
        if (window.localStorage.access_token) {
            config.headers.common.Authorization = localStorage.getExpire("token_type") + ' ' + localStorage.getExpire("access_token")
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    response => {
        return response
    }, error => { 
        console.log('err' + error)
        if(error.response.status === 401 || error.response.status === 403 || error.response.status === 406){
            Message({
                message: "你还没有登录",
                type: "error"
            });
            // 进行重新登陆
            setTimeout(()=>{
                localStorage.clear();
                window.location.href = loginPageUrl;
            },2000)
        }
        return Promise.reject(error)
    }
)
export default http
