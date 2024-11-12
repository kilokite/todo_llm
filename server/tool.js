// 生成一个随机的大写字母
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // 生成八位大写字母组成的ID
  function generateCODE() {
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += getRandomLetter();
    }
    return id;
  }

  function getCurrentTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = {Y: year, M: month, D: day, h: hour, m: minute};
    return time;
  }
  function convertToTimestamp(jsonTime) {
    const time = JSON.parse(jsonTime);
    const date = new Date(time.Y, time.M - 1, time.D, time.h, time.m);
    return date.getTime();
  }

  // 文本处理
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function reverseString(string) {
    return string.split("").reverse().join("");
  }

  // 时间格式化
  function formatDate(date, format) {
    const map = {
      'M': date.getMonth() + 1, // 月份
      'd': date.getDate(), // 日
      'h': date.getHours(), // 小时
      'm': date.getMinutes(), // 分
      's': date.getSeconds(), // 秒
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
      let v = map[t];
      if (v !== undefined) {
        if (all.length > 1) {
          v = '0' + v;
          v = v.substr(v.length - 2);
        }
        return v;
      } else if (t === 'y') {
        return (date.getFullYear() + '').substr(4 - all.length);
      }
      return all;
    });
    return format;
  }

  // 列表查找
  function findInList(list, predicate) {
    return list.find(predicate);
  }

  export default {
    generateCODE,
    getCurrentTime,
    convertToTimestamp,
    capitalizeFirstLetter,
    reverseString,
    formatDate,
    findInList,
  };