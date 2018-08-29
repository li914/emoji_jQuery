/**
 * 人口文件
 * */
(function ($, window, document) {
    const style = require('./style/style.css');
    const emojiFaceMap = require('./js/emojiFaceMap');
    const emojiFaceCreate = require('./js/emojiFaceCreate');
    const emojiInstrTxt = require('./js/emojiInstrTxt');
    const emojiPositions = require('./js/emojiPositions');
    $.extend({
        Lemoji: function (options) {
            // console.log(options);
            if (!isValid(options)) {
                return this;
            }
            var defaults = {
                before: function () {
                },
                after: function () {
                },
                emojiInput: 'input',
                emojiBtn: '.emojiBtn',
                position: 'RIGTHBOTTOM',
                length: 7,
                emojis: {
                    qq: {
                        path: 'static/images/qq/',
                        code: ':',
                        name: 'QQ表情'
                    },
                    tieba: {
                        path: 'static/images/tieba',
                        code: ';',
                        name: "贴吧表情"
                    },
                    emoji: {
                        path: 'static/images/emoji',
                        code: ',',
                        name: 'Emoji表情'
                    }
                },
                showBabar: true
            };
            var opt = $.extend({}, defaults, options);
            // console.log(opt);
            var emoji_item = emojiFaceCreate(opt.emojis, emojiFaceMap, opt.length);
            var container = $("<div class='emoji_container'>");
            var content = $("<div class='emoji_content'>");
            var tabar = $("<div class='emoji_tabar' style='display: " + (opt.showBabar ? '' : 'none') + ";'>");
            var tabarChild = '';
            var childNum = 0;
            $.map(opt.emojis, function (item, index) {
                tabarChild += '<li data-index="' + childNum + '">' + item.name + '</li>';
                childNum++;
            });
            tabar.append('<ul>' + tabarChild + '</ul>');
            container.append(content.append(emoji_item)).append(tabar).appendTo('body');


            /**
             * 处理表情点击事件，并插入到输入框控件
             * */
            content.on('click', 'li', function () {
                var code = $(this).attr('data-code');
                var title = $(this).attr('title');
                var str = '';
                switch (code) {
                    case ':':
                        str = '[' + code + title + ']';
                        emojiInstrTxt($(opt.emojiInput), str);
                        break;
                    case ';':
                        str = '[' + code + title + ']';
                        emojiInstrTxt($(opt.emojiInput), str);
                        break;
                    case ',':
                        str = '[' + code + title + ']';
                        emojiInstrTxt($(opt.emojiInput), str);
                        break;
                }
            });
            /**
             * 处理表情面板选择事件
             * */
            tabar.on('click', 'li', function () {
                var dLeft=467;
                if ($(window).width()<dLeft) {
                    dLeft=$(window).width();
                }
                console.log($(window).width()<dLeft)
                console.log('dleft:',dLeft)
                var index = $(this).attr('data-index');
                var left = -dLeft * parseInt(index);
                left = left + 'px';
                content.css({
                    marginLeft: left
                });
            });
            /**
             * 表情按钮事件处理
             * */
            var isShowEmoji=true;
            $(opt.emojiBtn).on('click', function (e) {
                if (isShowEmoji){
                    container.show('slow',function () {
                        emojiPositions(container, $(opt.emojiBtn), opt.position);
                    });
                    emojiPositions(container, $(opt.emojiBtn), opt.position);
                    e.stopPropagation();
                    isShowEmoji=false;
                } else {
                    container.hide('slow');
                    isShowEmoji=true;
                }
            });
            /**
             * 点击表情空白处隐藏表情框
             * */
            $(document).on('click', function (e) {
                console.log($(e.target).parent().parent().attr('class'));
                if ($(e.target).parent().parent().attr('class')=='emoji_tabar') {
                    e.stopPropagation();
                    return;
                }
                isShowEmoji=true;
                container.hide('slow');
            });


            function isValid(options) {
                return !options || (options && typeof options === 'object') ? true : false;
            }
        },
        emojiParse: function (options) {
            if (!isValid(options)) {
                return this;
            }
            var defaults = {
                content: '',
                emojis: [
                    {
                        path: 'static/images/qq',
                        code: ':',
                        type: 'qq'
                    },
                    {
                        path: 'static/images/tieba',
                        code: ';',
                        type: 'tieba'
                    },
                    {
                        path: 'static/images/emoji',
                        code: ',',
                        type: 'emoji'
                    }
                ]
            };
            var opts = $.extend({}, defaults, options);
            var content = $.trim(opts.content) ? opts.content : '';
            if (!content) {
                return content;
            }

            function isValid(options) {
                return !options || (options && typeof options === 'object') ? true : false;
            }

            for (let i = 0; i < opts.emojis.length; i++) {
                content = parse(content, opts.emojis[i].code, opts.emojis[i].path, opts.emojis[i].type);
            }

            /**
             * 判断是否存在该表情
             * */
            function getPath(str, type) {
                var path;
                $.map(emojiFaceMap[type], function (value, key) {
                    if (value === str) {
                        path = key;
                    }
                });
                return path;
            }

            /**
             * 解析表情，并插入表情图片
             * */
            function parse(content, code, path, type) {
                var reg = new RegExp('\\[\\' + code + "[\\u4e00-\\u9fa5]+\\]", 'g');
                var result = content.match(reg);
                if (result) {
                    var patt02 = new RegExp('\^\\[\\' + code);
                    var patt03 = /\]$/;
                    for (var i = 0; i < result.length; i++) {
                        var tmp = result[i].replace(patt02, '');
                        tmp = tmp.replace(patt03, '');
                        var name = '';
                        name = getPath(tmp, type);
                        //判断是否存在，不存在则结束该次循环
                        if (name == undefined) {
                            continue;
                        }
                        var path1 = path + name + '.png';
                        content = content.replace(result[i], '<img src="' + path1 + '" border="0"  width="25" height="25">')
                    }
                }
                return content;
            }

            return content;
        }
    });

})(window.jQuery, window, document);