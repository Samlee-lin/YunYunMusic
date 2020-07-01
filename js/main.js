function move(){
    var _move = false; //标记是否点击
    var _x,_y; //鼠标离浏览器边框的横纵距离
    var winWidth = $("#main").css("width").replace("px",""); //屏幕宽度 这是取main的宽高
    var winHeight = $("#main").css("height").replace("px",""); //屏幕高度
    var playerW = $("#player").css("width").replace("px","");
    var playerH = $("#player").css("height").replace("px","");
    $("#pltitle").dblclick(function(){
        //alert("松开后触发");
        //console.log(winWidth+"-"+winHeight+"-"+playerW+"-"+playerH);

    }).mousedown(function(e){
        _move=true;
        _x=e.pageX-parseInt($("#player").css("margin-left"));
        _y=e.pageY-parseInt($("#player").css("margin-top"));
        //console.log(_x);
        //console.log(_y);
        //fadeTo() 方法将被选元素的不透明度逐渐地改变为指定的值。淡出
        //$("#player").fadeTo(20,0.5);
    });
    $(document).mousemove(function(e){
        //alert("鼠标拖动了");
        if(_move){
            var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            maxX =  winWidth-playerW;
            maxY =  winHeight-playerH;
            //console.log(x+"----"+y+"----"+maxX+"----"+maxY);
            x = x<0?0:x>(winWidth-playerW)?winWidth-playerW:x;
            y = y<0?0:y>(winHeight-playerH)?winHeight-playerH:y;
            $("#player").css({"margin-left":x,"margin-top":y}); //设置新的位置
        }
    }).mouseup(function(){
        _move = false;
        //$("#player").fadeTo(20,1);
    })
}
move();