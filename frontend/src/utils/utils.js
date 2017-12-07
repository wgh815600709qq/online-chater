const md5 = require('js-md5')
const utils = {
  /**
   * [parseTime description]  时间格式化函数
   * @param  {[type]} time    [时间对象]
   * @param  {[type]} cFormat [格式]
   * @return {[type]} timeStr [格式化后时间]
   */
  parseTime (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    var date
    if (typeof time === 'object') {
      date = time
    } else {
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  },

  /**
   * [formatTime description] 时间展示函数
   * @param  {[type]} time   [时间戳]
   * @param  {[type]} option [参数]
   * @return {[type]}        [格式化后时间]
   */
  formatTime (time, option) {
    const d = new Date(time)
    const now = Date.now()
    const diff = (now - d) / 1000
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) { // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return this.parseTime(time, option)
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
  },

  /**
   * [inputAmountLimit description] 针对金额保留两位小数的input限制函数
   * @return {[type]} [输入合法串]
   */
  inputAmountLimit (value) {
    value = value.replace(/^0*(0\|[1-9])/, '$1') // 解决 粘贴不生效
    value = value.replace(/[^\d]/g, '') // 清除“数字”以外的字符
    if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      if (value.substr(0, 1) === '0' && value.length === 2) {
        value = value.substr(1, value.length)
      }
    }
    return value
  },

  /**
   * [deepCopy description]深拷贝
   * @param  {[type]} val [传入对象]
   * @return {[type]}     [返回拷贝对象]
   */
  deepCopy (val) {
    if (val) {
      return JSON.parse(JSON.stringify(val))
    } else {
      return null
    }
  },
  /**
   * [md5Encrypt description] md5加密，32位
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */
  md5Encrypt (password) {
    if (!password) return
    // if (password.length < 8) return
    return md5.hex(password)
  },
  /**
   * [throttle description] 函数节流
   * @param  {[type]} method  [description] 要执行节流的函数
   * @param  {[type]} time    [description] 节流的时间(单位毫秒)
   * @param  {[type]} context [description] 执行域
   * @return {[type]}         [description]
   */
  throttle (method, time, context) {
    clearTimeout(method.tId)
    method.tId = setTimeout(function () {
      method.call(context)
    }, time)
  },
  /**
   * [substr description]截取字符串,以省略形式展示
   * @param  {[type]} str [description]输入字符
   * @param  {[type]} num [description]保留数量
   * @return {[type]}     [description]
   */
  substr (str, num) {
    if (str.length > num) {
      var newStr = str.substring(0, num)
      newStr = newStr + '...'
      return newStr
    } else {
      return str
    }
  },
  /**
   * [turnArrayToTree description] 将索引数组转化成数据树
   * @param  {[type]} array [description] [{id:1, name:'xxx',parent_id: 0}, {id: 2, name: 'yyy', parent_id:1}, {id: 3, name: 'zzz', parent_id:1}]
   * @return {[type]}       [description] {
                                            name: xxx,
                                            id: 1,
                                            parentId: 0
                                            son: [
                                              {
                                                name: yyy,
                                                id: 2,
                                                parentId:1
                                                son: [],
                                                deep: 2
                                              },
                                              {
                                                name: zzz,
                                                id: 3,
                                                parentId: 1
                                                son:[],
                                                deep: 2
                                              }
                                            ],
                                            deep: 1 //层级
                                          }
   */
  turnArrayToTree (array, id, deep) {
    if (typeof array !== 'object' || !(array instanceof Array) || !array.length) return
    var newArray = []
    var layer = array.filter((item) => {
      return item.parentId === id
    })
    if (layer.length) {
      layer.forEach((it) => {
        newArray.push({
          name: it.name,
          id: it.id,
          parentId: it.parentId,
          son: this.turnArrayToTree(array, it.id, deep + 1),
          deep: deep
        })
      })
      return newArray
    } else {
      return []
    }
  },
  /**
   * [calculateDeep description] 用于计算数据树的深度,将深度存入depths数组中
   * @param  {[type]} array [description] 目标数组
   * @param  {[type]} id    [description] 最顶层id
   * @return {[type]}       [description]
   */
  depths: [],
  calculateDeep (array, id, deep) {
    if (typeof array !== 'object' || !(array instanceof Array) || !array.length) return
    var layer = array.filter((item) => {
      return item.parentId === id
    })  // 查找是否有子
    if (layer.length) {
      deep++
      layer.forEach(it => {
        deep = this.calculateDeep(array, it.id, deep)
        this.depths.push(deep)
      })
    } else {
      this.depths.push(deep)
      deep = 1
    }
    return deep
  },
  /**
   * [arrayMax description] 数组最大值
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  arrayMax (array) {
    if (!array) return
    var max = array && array[0]
    array.forEach(item => {
      if (item > max) {
        max = item
      }
    })
    return max
  },
  /**
   * [formatPrice description] 价格规范展示
   * @param  {[type]} number [description] 传入值（带两位小数或者是整数）
   * @return {[type]}        [description]
   */
  formatPrice (number) {
    var arr = (number + '').split('.')
    var integer = arr[0]
    var decimal = arr[1] || '00'
    if (integer < 4) {
      return integer + '.' + decimal
    } else {
      var r = integer.split('').reverse()
      var t = ''
      for (var i = 0; i < r.length; i++) {
        t += r[i] + ((i + 1) % 3 === 0 && (i + 1) !== r.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + decimal
    }
  },
    /**
   * [turnArrayToCascader description] 将分类数据转化成数据树级联结构
   * @param  {[type]} array [description] [{id:1, name:'xxx',parentId: 0}, {id: 2, name: 'yyy', parentId:1}, {id: 3, name: 'zzz', parentId:1}]
   * @return {[type]}       [description] {
                                            label: xxx,
                                            value: 1,
                                            parentId: 0
                                            children: [
                                              {
                                                label: yyy,
                                                value: 2,
                                                parentId:1
                                                children: []
                                              },
                                              {
                                                label: zzz,
                                                value: 3,
                                                parentId: 1
                                                children:[]
                                              }
                                            ]
                                          }
   */
  turnArrayToCascader (array, id) {
    if (typeof array !== 'object' || !(array instanceof Array) || !array.length) return
    var newArray = []
    var layer = array.filter((item) => {
      return item.parentId === id
    })
    if (layer.length) {
      layer.forEach((it) => {
        newArray.push({
          label: it.name,
          value: it.id,
          parentId: it.parentId,
          children: this.turnArrayToCascader(array, it.id)
        })
      })
      return newArray
    } else {
      return []
    }
  }
}

export default utils
