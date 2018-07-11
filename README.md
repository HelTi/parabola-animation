# parabolaAnimation.js

#### 项目介绍
js 抛物线动画 for mobile

##### install

```js
npm i parabola-animation

import parabolaAnimation from 'parabola-animation'

```
##### or
> <script src="../dist/parabola-animation.js"></script>

##### use
```js
/**
 * element:dom (如果是null,则默认使用圆形dom; 自定义dom:htmlString:'<div>...</div>' )
 * /
 parabolaAnimation(element,options)
 let p = new parabolaAnimation(null,{
        startPos:{
            left:10, //相对屏幕的left
            top:10   //相对屏幕的top
        },
        endPos:{
            left:100,
            top:100
        },
        endFunc:function(){
            p.destroy(); //结束时的callback
        }
    })
```


