# parabolaAnimation.js

#### 项目介绍
js 抛物线动画 for mobile

#### 使用：

```js
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


