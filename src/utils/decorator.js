/*
 *@Description: decorator装饰器
 *@Author:  Wang zhang
 *@Date: 2021-02-18 10:50:52
*/
//批量删除 数组空验证
export function arrayEmpty(valueKey, message = '请勾选相关数据') {
    return function (target, name, decorator) {
      const fn = decorator.value
      decorator.value = function (...args) {
        if (!this[valueKey].length) {
          if (this.$_messageInstance) return
          this.$_messageInstance = this.$message({
            type: 'error',
            message: message,
            onClose: () => {
              this.$_messageInstance = null
            },
          })
          return
        }
        fn.call(this, ...args)
      }
    }
  }
  
  //二次确认
  export function confirm(
    title = '删除',
    content = '确认删除所选内容?',
    options = {
      closeOnClickModal: false,
      iconClass: 'el-icon-question',
    }
  ) {
    return function (target, name, decorator) {
      const fn = decorator.value
  
      decorator.value = function (...args) {
        this.$confirm(content, title, options)
          .then(() => {
            fn.call(this, ...args)
          })
          .catch(() => {})
      }
    }
  }
  
  //二次确认
  export function confirmOne(
    content = '确认移除该内容?',
    options = {
      closeOnClickModal: false,
      customClass: 'alert-one',
    }
  ) {
    return function (target, name, decorator) {
      const fn = decorator.value
  
      decorator.value = function (...args) {
        this.$confirm(content, options)
          .then(() => {
            fn.call(this, ...args)
          })
          .catch(() => {})
      }
    }
  }
  
  /**
   * form表单验证
   * @param {string} ref
   * @param {string} loadingKey
   * @returns
   */
  export function formValidate(ref, loadingKey = 'loading', needPromise) {
    return function (target, name, decorator) {
      const fn = decorator.value
  
      decorator.value = async function (...args) {
        if (this[loadingKey]) return
  
        this[loadingKey] = true
        const v = await this.$refs[ref].validate().catch(() => {
          this[loadingKey] = false
          if (needPromise) return Promise.reject()
        })
        if (!v) return
        return fn.call(this, ...args).finally(() => {
          this[loadingKey] = false
        })
      }
    }
  }
  
  import rootStore from '@/plugins/store'
  
  /**
   * 页面注册store
   * @param {object} store store初始化对象
   * @returns
   */
  export function registerStore(store) {
    return function (target, name, decorator) {
      const fn = decorator.value
  
      decorator.value = function (...args) {
        if (!rootStore.hasModule(store.name)) {
          rootStore.registerModule(store.name, store)
        }
  
        fn.call(this, ...args)
      }
    }
  }
  
  /**
   * 卸载页面store
   * @param {object} store store初始化对象
   * @returns
   */
  export function unregisterStore(store) {
    return function (target, name, decorator) {
      const fn = decorator.value
  
      decorator.value = function (...args) {
        let unregister = () => {}
        function unstore() {
          if (rootStore.hasModule(store.name)) {
            rootStore.unregisterModule(store.name)
          }
          unregister()
        }
  
        const has = this.$router.afterHooks.some((fn) => fn.name === unstore.name)
        if (!has) {
          unregister = this.$router.afterEach(unstore)
        }
  
        fn.call(this, ...args)
      }
    }
  }
  
  /**
   * 点击按钮之后loading
   * @param {string} key loading 属性名称
   * @returns
   */
  export function loading(key = 'loading') {
    return function (target, name, decorator) {
      const fn = decorator.value
  
      decorator.value = async function (...args) {
        if (this[key]) return
        this[key] = true
        await fn.call(this, ...args)
        this[key] = false
      }
    }
  }
  