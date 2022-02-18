/*
 *@Description: 保留小数点   使用：  {{  number | fiexd(2)  }}
 *@Author:  Wang zhang
 *@Date: 2022-02-18 11:05:01
*/
const fixed = (value = 0, num = 2) => {
  var toFixedNum = Number(value).toFixed(num + 1)
  var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1)
  if (num > 0) {
    return realVal
  } else {
    return parseInt(Number(value))
  }
}
export default fixed
