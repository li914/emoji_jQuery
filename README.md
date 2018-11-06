### emoji_jQuery表情插件

项目示意图：![示意图](https://github.com/li914/emoji_jQuery/blob/master/emoji_shiyitu.PNG)

在线演示:[demo](https://li914.github.io/emoji_jQuery/)


#### 1.基本介绍
>本着学习的态度，本项目所有的材料来源于网络。如果有侵权，请联系删除。

>大佬[eshengsky](https://github.com/eshengsky/jQuery-emoji)的jQuery_emoji项目，大家可以去大佬的项目看看,参考大佬的项目而写的。

>本项目的功能，可以自主选择表情，包括QQ表情，贴吧表情，经典的emoji表情，根据需要选择

>本项目还可以解析表情字符，替换成图片，在div中展示

#### 2.使用方法

下载：[emoji_jQuery.min.js](https://github.com/li914/emoji_jQuery/releases/download/1.0.1/emoji_jQuery.min.js),然后在jQuery后引入使用。

* HTML代码
```html
<div id="test"></div>
<div id="div-emoji">
    <p>
        <input id="input" type="text">
    </p>
    <p>
        <button id="send">发送</button>
        <button id="btn">emojiBtn</button>
    </p>
</div>
```

* 设置表情
    
    参数说明：emojiInput：输入框，必须要有；emojiBtn：显示表情按钮，必须要有；position：位于emojiBtn什么位置，默认在右下方
    length：每行要展示的表情数；emojis：需要的表情组；
    
    
    
```javascript
$.Lemoji({
    emojiInput: '#input',
    emojiBtn: '#btn',
    position: 'LEFTBOTTOM',
    length: 8,
    emojis: {
        qq: {path: 'static/images/qq/', code: ':', name: 'QQ表情'},
        tieba: {path: 'static/images/tieba', code: ';', name: "贴吧表情"},
        emoji: {path: 'static/images/emoji', code: ',', name: 'Emoji表情'}
    }
});
```

* 解析表情

    参数说明：content：需要解析的内容；emojis：要与设置表情的一致，不然无法解析成功


```javascript
$('#send').click(function () {
    var content = $('#input').val();
    content = $.emojiParse({
        content: content,
        emojis: [{type: 'qq', path: 'static/images/qq/', code: ':'}, {
            path: 'static/images/tieba/',
            code: ';',
            type: 'tieba'
        }, {path: 'static/images/emoji/', code: ',', type: 'emoji'}]
    });
    $('#test').html(content);
});
```



 #### 3 运行项目
 
    1 下载该项目

```
git clone https://github.com/li914/emoji_jQuery.git
cd emoji_jQuery
```
    2 添加依赖
    
```
npm install
```

    3 运行项目

```
npm run server
```
