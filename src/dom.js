/**
 *dom
 * **/

/**
 *
 * @param el
 * @param style
 * @param value
 */
export function setStyle(el, style, value) {
  if (!el || !style) throw new Error('no el or style param');

  if (typeof style === 'object') {

    for (let prop in style) {
      if (style.hasOwnProperty(prop)) {
        el.style[prop] = style[prop]
      }
    }

  } else {
    if (!value) throw new Error('no value param');
    el.style[style] = value;
  }
}

/**
 * 获取dom单个样式
 * @param el
 * @param attr
 * @returns {any}
 */
export function getStyle(el, attr) {
  return getComputedStyle(el, attr)
}


/**
 * 获得匹配元素相对父元素的偏移
 * @param el
 * @returns {{left: number, top: number}}
 */
export function getDomPosition(el) {
  if (!el) throw new Error('no element');
  return {
    left: el.offsetLeft,
    top: el.offsetTop
  }
}

/**
 * 相对于文档的偏移量
 * @param el
 * @returns {{top: number, left: number}}
 */
export function getDomOffset(el) {
  let box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

/**
 * 获取dom的style,包含所有的样式
 * @param el
 * @param attr
 * @returns {any}
 */
export function getComputedStyle(el, attr) {
  const win = el.ownerDocument.defaultView;
  const computedStyle = win.getComputedStyle(el, null);

  return attr ? computedStyle[attr] : computedStyle;
}

/**
 * dom字符串转换dom
 * <div><p>....</p><div/>
 * @param htmlStr
 */
export function htmlStringToDom(htmlStr) {
  if (typeof htmlStr !== 'string') {
    throw new Error('htmlStr must be string');
  }

  let els, tempParent;
  const html = htmlStr.trim();

  if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
    let toCreate = 'div';
    if (html.indexOf('<li') === 0) toCreate = 'ul';
    if (html.indexOf('<tr') === 0) toCreate = 'tbody';
    if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
    if (html.indexOf('<tbody') === 0) toCreate = 'table';
    if (html.indexOf('<option') === 0) toCreate = 'select';
    tempParent = document.createElement(toCreate);
    tempParent.innerHTML = html;
  }
  return tempParent;
}

