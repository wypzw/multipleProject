/*
 *@Description: 自定义过滤器
 *@Author:  Wang zhang
 *@Date: 2022-02-18 11:03:08
*/
import fixed from './fixed.js'
import numToChinese from './numToChinese.js'
const filters = {
  fixed,
  numToChinese,
  ArrToString(value) {
    let str = ''
    if (value instanceof Array) {
      value.map((i, ind) => {
        if (typeof i == 'object') {
          str = str + i.label
        } else {
          str = str + i
        }
        if (value.length > 1) {
          str = str + '；'
        }
      })
    } else {
      str = typeof value === 'number' || value ? value : '-'
    }
    return str
  },
}
//批量注册filter
export default {
  install(Vue) {
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key])
    })
  },
}
