/**
 * 时间转换
 * @param Times 时间戳
 * return {
 *   DD: 0, //天
     HH: 0, //小时
     mm: 0, //分钟
     ss: 0  //秒
 * }
 */
export const formatTime = (Times) => {
  let formatTimeObj = {
    DD: 0,
    HH: 0,
    mm: 0,
    ss: 0
  };
  if (!!Times) {
    let day = Math.floor(Times / (24 * 60 * 60));
    let hour = Math.floor((Times - day * 24 * 3600) / 3600);
    let noDayHour = Math.floor((Times) / 3600);
    let minute = Math.floor((Times - noDayHour * 3600) / 60);
    let second = Math.floor(Times - noDayHour * 3600 - minute * 60);
    return {
      DD: day,
      HH: noDayHour < 10 ? '0' + noDayHour : noDayHour,
      mm: minute < 10 ? '0' + minute : minute,
      ss: second < 10 ? '0' + second : second
    }
  } else {
    return formatTimeObj;
  }
};

/**
 * 分割小数，不是小数，小数位补0
 * @param number
 * @returns {*}
 */
export const splitDecimalNumber = (number) => {
  if (/^[0-9]+/.test(number)) {
    let numberStr = number.toString();
    let numberSplitArr = numberStr.split('.');
    if (numberSplitArr.length === 2) {
      return {
        pointBefore: numberSplitArr[0],
        pointAfter: numberSplitArr[1]
      }
    } else {
      return {
        pointBefore: numberSplitArr[0],
        pointAfter: 0
      }
    }
  } else {
    console.log('数据类型不是数字');
  }
};

export const formatTimeMs = (Times) => {
  let formatTimeObj = {
    mm: 0,
    ss: 0
  };
  if (!!Times) {
    let minute = Math.floor(Times / 60 % 60);
    let second = Math.floor(Times % 60);
    return {
      mm: minute < 10 ? '0' + minute : minute,
      ss: second < 10 ? '0' + second : second
    }
  } else {
    return formatTimeObj;
  }
};

/**
 *
 * @param queryParam url参数名
 * @returns {*}
 */
export const getUrlQuery = (queryParam) => {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === queryParam) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
};

let toString = Object.prototype.toString;
const toCheckVarTypeFunc = (name) => {
  return function () {
    return toString.call(arguments[0] === '[object ' + name + ']');
  }
};


export function getRandom(min_number, max_number, is_float = false) {
  if (is_float) {
    return Math.random() * (max_number - min_number) + min_number;
  } else {
    return Math.floor(Math.random() * (max_number - min_number) + min_number);
  }
}

/**
 * 99999->9.99万
 * @param num
 * @returns {string}
 */
export function formatThousand(num, s_length = 2) {
  let formatNum = (num / 10000).toString().split('.');
  return formatNum[0] > 0 ? (String(formatNum[0]) + '.' + (String(formatNum[1] ? formatNum[1] : 0)).slice(0, s_length)) : num
}

function now() {
  return new Date().getTime();
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  let later = function () {
    let last = now() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = now();

    let callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  }

}


