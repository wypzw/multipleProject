/*
 *@Description: 保留小数点   使用：  {{  number | fiexd(2)  }}
 *@Author:  Wang zhang
 *@Date: 2022-02-18 11:05:20
*/
const numToChinese = (value) => {
  const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  const string = chinese[Number(value) - 1]
  if (string) {
    return string
  } else {
    return value
  }
}
export default numToChinese
