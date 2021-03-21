export function debounce(func, delay=100) {

  // 闭包
  let timer = null

  return function(...args) {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function formatDate(date, fmt) {
  // 1.获取年份
  // RegExp.$1 -> yyyy
  // console.log(RegExp.$1);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }


  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      // 1.('M:d h:m:s')
      // 2.('MM:dd hh:mm:ss')
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 添加'0'占位符
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
