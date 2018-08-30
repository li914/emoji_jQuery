/**
 * 处理表情框位置，默认为右下方
 * */
module.exports=function (obj,emojiBtn,position) {
    position=position.toUpperCase();
    var top=emojiBtn.offset().top;
    var left=emojiBtn.offset().left;
    var btnHeigth=emojiBtn.outerHeight();
    var btnWidth=emojiBtn.outerWidth();

    var oWidth=obj.outerWidth();
    var oHeigth=obj.outerHeight();

    var dTop,dLeft;

    var win=$(window);
    onWidth();
    win.resize(onWidth());
    function onWidth() {
        if (oWidth+left>$(window).width()){
            oWidth=$(window).width();
            obj.css({
                left:0+'px'
            });
            switch (position) {
                case 'LEFTTOP':
                    dTop=top-oHeigth;
                    break;
                case 'RIGTHTOP':
                    dTop=top-oHeigth;
                    break;
                case 'LEFTBOTTOM':
                    dTop=top+btnHeigth+3;
                    break;
                case 'RIGTHBOTTOM':
                    dTop=top+btnHeigth+3;
                    break;
                default:
                    dTop=top+btnHeigth+3;
                    break;

            }
            obj.css({
                width:oWidth+'px',
                top:dTop+'px',
                left: 0+'px'
            });
            $('.emoji_item').css({
                width: oWidth-2+'px'
            })
        }else {
            switch (position) {
                case 'LEFTTOP':
                    dTop=top-oHeigth-3;
                    dLeft=left-oWidth+btnWidth;
                    break;
                case 'RIGTHTOP':
                    dTop=top-oHeigth-3;
                    dLeft=left;
                    break;
                case 'RIGTHBOTTOM':
                    dTop=top+btnHeigth+3;
                    dLeft=left;
                    break;
                case 'LEFTBOTTOM':
                    dTop=top+btnHeigth+3;
                    dLeft=left-oWidth+btnWidth;
                    break;
                default:
                    dTop=top-btnHeigth-3;
                    dLeft=left;
                    break;
            }
            obj.css({
                top:dTop+'px',
                left:dLeft+'px'
            })
        }
    }
};