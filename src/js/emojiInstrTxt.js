/**
 * 向输入框插入表情字符
 * */
module.exports=function (obj,str) {
    obj=obj[0];
    obj.focus();
    if (document.selection){
        var sel=document.selection.createRange();
        sel.text=str;
    } else if (typeof obj.selectionStart==='number' && typeof obj.selectionEnd==='number'){
        var startPos=obj.selectionStart,endPos=obj.selectionEnd,cursorPos=startPos,tmpStr=obj.value;
        obj.value=tmpStr.substring(0,startPos)+str+tmpStr.substring(endPos,tmpStr.length);
        cursorPos+=str.length;
        obj.selectionStart=obj.selectionEnd=cursorPos;
    } else {
        obj.value+=str;
    }
};