/**
 * 创建表情
 * */
module.exports=function (emojis,emojiMaps,length) {
    var emojiStr='';
    $.map(emojis,function (item,index) {
        index=index.toLowerCase();
        var arr,emojiChild,imgPath;
        switch (index) {
            case 'qq':
                arr=emojiMaps[index];
                imgPath=emojis[index]['path'];
                emojiChild=createFace(arr,'.png',':',imgPath,length);
                emojiStr+=emojiChild;
                break;
            case 'tieba':
                arr=emojiMaps[index];
                imgPath=emojis[index]['path'];
                emojiChild=createFace(arr,'.png',';',imgPath,length);
                emojiStr+=emojiChild;
                break;
            case 'emoji':
                arr=emojiMaps[index];
                imgPath=emojis[index]['path'];
                emojiChild=createFace(arr,'.png',',',imgPath,length);
                emojiStr+=emojiChild;
                break;
            default:
                break;
        }

    });
    function createFace(arr,suffix,code,imgPath,length) {
        if (imgPath.charAt(imgPath.length-1)!=='/') {
            imgPath=imgPath+'/';
        }
        var count=0;
        var emojiChild='';
        var emojiStr1='';
        var a=0;
        $.map(arr,function (item,index) {
            var src=imgPath+index+suffix;
            if (count<length){
                emojiChild+='<li data-code="'+code+'" data-emojiImg="'+src+'" title="'+item+'"><img src="'+src+'" width="25" height="25" /></li>'
            } else {
                emojiStr1+='<ul>'+emojiChild+'</ul>';
                count=0;
                emojiChild='';
                emojiChild+='<li data-code="'+code+'" data-emojiImg="'+src+'" title="'+item+'"><img src="'+src+'" width="25" height="25" /></li>';
            }
            if (Object.keys(arr).length===parseInt(index)){
                var tmp=length-count;
                for (var i=0;i<tmp-1;i++){
                    emojiChild+='<li data-code="'+code+'"><img src="#" width="25" height="25" style="visibility: hidden;"></li>';
                }
                emojiStr1+='<ul>'+emojiChild+'</ul>'
            }
            count++;
        });
        return '<div  class="emoji_item">'+emojiStr1+'</div>';
    }
    return emojiStr;
};