/*
 *@Description: 自定义指令
 *@Author:  Wang zhang
 *@Date: 2022-02-18 10:56:19
*/
import copy from './copy.js'
import { debounce } from 'lodash'
const directives = {
  copy,
  defaultSelect(el, binding) {
    const defaultValues = binding.value
    const dealStyle = function (tags) {
      tags.forEach((el, index) => {
        if (
          index <= defaultValues.length - 1 &&
          ![...el.classList].includes('select-tag-close-none')
        ) {
          el.classList.add('none')
        }
      })
    }
    setTimeout(() => {
      const tagTemp = el.querySelectorAll('.el-tag__close')
      dealStyle(tagTemp)
    })
  },
  screenHeightCalc: debounce((el, binding, vnode) => {
    const bottom = binding.value || 10
    const key = binding.arg || 'height'
    const screen = document.documentElement.clientHeight
    const domRect = el.getBoundingClientRect()
    const h = screen - bottom - domRect.top
    vnode.context[key] = h
  }, 300),
}

// 批量注册指令
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
