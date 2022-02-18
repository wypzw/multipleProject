/*
 *@Description: 常用方法
 *@Author:  Wang zhang
 *@Date: 2021-01-18 10:52:20
*/
// 获取url里的参数
export function getUrlParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) {
      return decodeURI(r[2]) // 返回参数值，转码中文使中文参数不乱码
    }
  }
  //获取当前ip地址和协议端口号
  export function getHost() {
    return window.location.protocol + '//' + window.location.host + '/'
  }
  /**
   * 判断数组对象中是否有某个值
   * @author chenjun
   * @param {array} array 要查询的数组
   * @param {string} attr 要查询的字段   如果有重复数据 默认返回查找的第一个的下标
   * @param {*} val 要查询的字段值qu
   */
  export function findItem(array, attr, val) {
    let ind = -1
    const fn = function (array, attr, val) {
      array.forEach((i, index) => {
        if (i[attr] == val) {
          ind = index
        } else {
          if (i.children && i.children.length > 0) {
            fn(i.children, attr, val)
          }
        }
      })
    }
    fn(array, attr, val)
    return ind
  }
  // 判断数量  >0
  export function findItemTrue(array, attr, val) {
    let ind = -1
    const fn = function (array, attr, val) {
      array.forEach((i, index) => {
        if (i[attr]) {
          ind = index
        } else {
          if (i.children && i.children.length > 0) {
            fn(i.children, attr, val)
          }
        }
      })
    }
    fn(array, attr, val)
    return ind
  }
  
  /**
   * 将树结构转为一维数组
   * @author yaqian
   * @param {*} array tree
   * @param 下一级的标签
   */
  export function treeToList(tree, label) {
    let arrs = []
    let result = []
    arrs = arrs.concat(tree)
    while (arrs.length) {
      let first = arrs.shift() // 弹出第一个元素
      if (first[label]) {
        arrs = arrs.concat(first[label])
        delete first[label]
      }
      result.push(first)
    }
    return result
  }
  /**
   * @desc: 将一维转换成树结构
   * @name: yaqian
   * @param {*} source
   * @param {*} parentId 父级节点id
   * @return {*} tree树结构
   */
  export function listToTree(
    source,
    parentId = 0 || '0',
    key = 'parentId',
    id = 'id'
  ) {
    let trees = []
    for (let item of source) {
      if (item[key] === parentId) {
        let children = listToTree(source, item[id], key, id)
        if (children.length) {
          item.children = children
        }
        trees.push(item)
      }
    }
    return trees
  }
  //下载文件
  export function downFile(filename, blob) {
    let link = document.createElement('a')
    if ('download' in link) {
      const url = window.URL.createObjectURL(blob)
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
  
      link.click()
  
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } else {
      navigator.msSaveBlob(blob, filename)
    }
  }
  
  export function instanceMessage(options) {
    if (this.$_instanceMessage) {
      this.$_instanceMessage.close()
      this.$_instanceMessage = null
    }
  
    this.$_instanceMessage = this.$message({
      ...options,
    })
  }
  // 比较两个数组中是否有相同的值
  export function FilterData(a, b) {
    //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
    var result = new Array()
    for (var i = 0; i < a.length; i++) {
      if (b.indexOf(a[i]) != -1) {
        result.push(a[i])
      }
    }
    return result
  }
  // 判断数组中是否有重复的值
  export function checkForDuplicates(array) {
    return new Set(array).size !== array.length
  }
  //两个数组对象 取不同的值
  export function arrayRepeat(array1, array2, code) {
    var result = []
    for (var i = 0; i < array2.length; i++) {
      var obj = array2[i]
      var num = obj[code]
      var isExist = false
      for (var j = 0; j < array1.length; j++) {
        var aj = array1[j]
        var n = aj[code]
        if (n === num) {
          isExist = true
          break
        }
      }
      if (!isExist) {
        result.push(obj)
      }
    }
    return result
  }
  //取出两个数组的不同元素
  export function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v)
    })
  }
  // 时间转换
  export function formatDate(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
    time = time.replace(/-/g, '/')
    const date = new Date(time)
    if (/(y+)/.test(fmt)) {
      fmt = fmt
        .replace(RegExp.$1, date.getFullYear() + '')
        .substr(4 - RegExp.$1.length)
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    for (const key in o) {
      if (RegExp(`(${key})`).test(fmt)) {
        const str = o[key] + ''
        fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : '0' + str)
      }
    }
    return fmt
  }
  // 获取时间的数字类型
  export function getTimeNum(date) {
    return new Date(date).getTime()
  }
  
  // 比对时间
  export function compareDate(a, b) {
    return getTimeNum(b) - getTimeNum(a)
  }
  //错误提示
  export function errorMessage(msg) {
    if (this.__error_message__) {
      this.__error_message__.close()
    }
  
    this.__error_message__ = this.$message({
      type: 'error',
      message: msg,
      duration: 2000,
      onClose: () => {
        this.__error_message__ = null
      },
    })
  }
  
  export function strlength(str) {
    var len = 0
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i)
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++
      } else {
        len += 2
      }
    }
  
    return len
  }
  
