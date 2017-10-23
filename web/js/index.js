$(document).ready(function(){


    //global param
    var offsetX;// x-direction offset to ensure the coin not go over the circle
    var offsetY;// y-direction offset to ensure the coin not go over the circle
    var coinsNum=[0,0,0];
    //transform control

    //function to execute after init web
    $(".game-coins-column-20").click(function () {
        addCoinDisplay(20);
    });
    $(".game-coins-column-50").click(function () {
        addCoinDisplay(50);
    });
    $(".game-coins-column-100").click(function () {
        addCoinDisplay(100);
    });

    $.ajax({
       url: 'BackJack',
       data:{
           command: 'test'
       },
       success: function (data) {
           console.log(data);
           var JSON_data=JSON.parse(data);
           console.log(JSON_data["cards"][0]);
       },
       error: function () {
           console.log("failure");
       }
    });

    /*create coin and change its position*/
    function addCoinDisplay(value){
        /*create DOM*/
        var DOM_id="coin";
        var DOM_postfix="\"></div>";
        var DOM_coin="";
        switch (value){
            case 20:
                coinsNum[0]++;
                var DOM_prefix="<div class=\"game-coins-column-20\" id=\"";
                DOM_id=DOM_id+"20-"+coinsNum[0];
                DOM_coin=DOM_prefix+DOM_id+DOM_postfix;
                $(".game-coins-column-coins").append(DOM_coin);
                break;
            case 50:
                coinsNum[1]++;
                var DOM_prefix="<div class=\"game-coins-column-50\" id=\"";
                DOM_id=DOM_id+"50-"+coinsNum[1];
                DOM_coin=DOM_prefix+DOM_id+DOM_postfix;
                $(".game-coins-column-coins").append(DOM_coin);
                break;
            case 100:
                coinsNum[2]++;
                var DOM_prefix="<div class=\"game-coins-column-100\" id=\"";
                DOM_id=DOM_id+"100-"+coinsNum[2];
                DOM_coin=DOM_prefix+DOM_id+DOM_postfix;
                $(".game-coins-column-coins").append(DOM_coin);
                break;
            default:
                break;
        }
        /*control position*/
        getOffset();
        var $game_coin_column_height=$(".game-coins-column").innerHeight();
        var $game_coin_column_top=166-0.6*$game_coin_column_height+offsetX*62;
        var $game_coin_column_left=56+offsetY*62+"px";
        $game_coin_column_top=$game_coin_column_top.toFixed(0);
        $game_coin_column_top=$game_coin_column_top+"px";
        switch (value){
            case 20:
                console.log("#"+DOM_id);
                $("#"+DOM_id).css({"top":$game_coin_column_top,"left":$game_coin_column_left});
                $("#"+DOM_id).on("click",{DOM_id:DOM_id,value:value},removeCoinDisplay);
                break;
            case 50:
                console.log("#"+DOM_id);
                $("#"+DOM_id).css({"top":$game_coin_column_top,"left":$game_coin_column_left});
                $("#"+DOM_id).on("click",{DOM_id:DOM_id,value:value},removeCoinDisplay);
                break;
            case 100:
                console.log("#"+DOM_id);
                $("#"+DOM_id).css({"top":$game_coin_column_top,"left":$game_coin_column_left});
                $("#"+DOM_id).on("click",{DOM_id:DOM_id,value:value},removeCoinDisplay);
                break;
            default:
                break;
        }
    }

    /*change back coin position and remove it*/
    function removeCoinDisplay(event){
        switch (event.data.value){
            case 20:
                $("#"+event.data.DOM_id).css({"left" : "calc(50% - 2em)","top":"0"});
                setTimeout(function () {
                    $("#"+event.data.DOM_id).remove();
                    coinsNum[0]--;
                },1000);
                break;
            case 50:
                $("#"+event.data.DOM_id).css({"left" : "calc(30% - 2em)","top":"4em"});
                setTimeout(function () {
                    $("#"+event.data.DOM_id).remove();
                    coinsNum[1]--;
                },1000);
                break;
            case 100:
                $("#"+event.data.DOM_id).css({"left" : "calc(70% - 2em)","top":"4em"});
                setTimeout(function () {
                    $("#"+event.data.DOM_id).remove();
                    coinsNum[2]--;
                },1000);
                break;
            default:
                break;
        }
    }

    /*get offsetX and offsetY in the unit circle */
    function getOffset(){
        var angle=Math.random()*3600;
        var radius=Math.random();
        angle=Math.PI*angle/180;
        offsetX=Math.sin(angle)*radius;
        offsetY=Math.cos(angle)*radius;
    }
});