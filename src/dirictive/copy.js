/*
 *@Description: 复制指令
 *@Author:  Wang zhang
 *@Date: 2022-02-18 10:57:35
*/
import { Message } from 'element-ui'
const vCopy = {
  bind(el, { value }) {
    el.$value = value 
    el.handler = () => {
      if (!el.$value) {
        Message.warning('无复制内容')
        return
      }
      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = el.$value
      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)
      const result = document.execCommand('Copy')
      if (result) {
        Message.success('复制成功')
      }
      document.body.removeChild(textarea)
    }
    el.addEventListener('click', el.handler)
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}
export default vCopy
