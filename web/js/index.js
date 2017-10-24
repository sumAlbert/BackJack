$(document).ready(function(){


    //global param
    var offsetX;// x-direction offset to ensure the coin not go over the circle
    var offsetY;// y-direction offset to ensure the coin not go over the circle
    var coinsNum=[0,0,0];
    var play0Num=0;
    var play1Num=0;
    var bankNum=0;
    var cardsPlay0Deg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var cardsPlay1Deg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var cardsBankDeg=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bgCard="";
    //transform control

    //function to execute after init web
    initAndAgain();

    /*add coins*/
    $(".game-coins-column-20").click(function () {
        $.ajax({
            url: 'BlackJack',
            data:{
                command: 'bet',
                value: '20'
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                if(JSON_data.resultCode){
                    changeBetMoney(JSON_data.bet_money);
                    changeSaveMoney(JSON_data.money);
                }
                addCoinDisplay(20)
            },
            error: function () {
                console.log("failure");
            }
        });
    });
    $(".game-coins-column-50").click(function () {
        $.ajax({
            url: 'BlackJack',
            data:{
                command: 'bet',
                value: '50'
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                if(JSON_data.resultCode){
                    changeBetMoney(JSON_data.bet_money);
                    changeSaveMoney(JSON_data.money);
                }
                addCoinDisplay(50)
            },
            error: function () {
                console.log("failure");
            }
        });
    });
    $(".game-coins-column-100").click(function () {
        $.ajax({
            url: 'BlackJack',
            data:{
                command: 'bet',
                value: '100'
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                if(JSON_data.resultCode){
                    changeBetMoney(JSON_data.bet_money);
                    changeSaveMoney(JSON_data.money);
                }
                addCoinDisplay(100)
            },
            error: function () {
                console.log("failure");
            }
        });
    });

    /*add cards*/
    $("#getCard").click(function () {
        if(play0Num){
            $.ajax({
                url: 'BlackJack',
                data:{
                    command: 'hit'
                },
                success: function (data) {
                    console.log(data);
                    var JSON_data=JSON.parse(data);
                    if(JSON_data.resultCode){
                        bgCard=JSON_data.cards[0];
                        setTimeout(function () {
                            addCardPlay0Display(JSON_data.cards[0]);
                            setScore("play0",JSON_data.scores[0],0);
                            console.log(JSON_data.boom);
                        },0);
                    }
                },
                error: function () {
                    console.log("failure");
                }
            });
        }
        else{
            $.ajax({
                url: 'BlackJack',
                data:{
                    command: 'deal'
                },
                success: function (data) {
                    console.log(data);
                    var JSON_data=JSON.parse(data);
                    if(JSON_data.resultCode){
                        bgCard=JSON_data.cards[3];
                        setTimeout(function () {
                            addCardBankDisplay(JSON_data.cards[0]);
                        },0);
                        setTimeout(function () {
                            addCardPlay0Display(JSON_data.cards[1]);
                        },800);
                        setTimeout(function () {
                            addCardPlay1Display(JSON_data.cards[2]);
                        },1600);
                        setTimeout(function () {
                            addCardBankDisplay("bg");
                        },2400);
                        setTimeout(function () {
                            addCardPlay0Display(JSON_data.cards[4]);
                        },3200);
                        setTimeout(function () {
                            addCardPlay1Display(JSON_data.cards[5]);
                        },4000);
                        setTimeout(function () {
                            if(JSON_data.scores[0]==JSON_data.scores[2]){
                                setScore("play0",JSON_data.scores[0],0);
                                setScore("play1",JSON_data.scores[1],0);
                            }
                            else{
                                setScore("play0",JSON_data.scores[0],JSON_data.scores[2]);
                                setScore("play1",JSON_data.scores[1],0);
                            }
                        },4800);
                    }
                },
                error: function () {
                    console.log("failure");
                }
            });
        }
    });

    // $.ajax({
    //     url: 'BlackJack',
    //     data:{
    //         command: 'bet',
    //         value: '100'
    //     },
    //     success: function (data) {
    //         var JSON_data=JSON.parse(data);
    //         if(JSON_data.resultCode){
    //             changeBetMoney(JSON_data.bet_money);
    //             changeSaveMoney(JSON_data.money);
    //         }
    //         addCoinDisplay(100)
    //     },
    //     error: function () {
    //         console.log("failure");
    //     }
    // });

    //some operations about coins
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


    //some operations about cards of play0
    /*create card and change its card*/
    function addCardPlay0Display(cardName){
        var play0ID="play0-"+play0Num;
        var DOM_Prefix="            <div class=\"init-bg-card-3\" id=\"" +play0ID+
            "\">\n" +
            "              <img src=\"img/cards/";
        var DOM_Postfix=".png\" class=\"card\">\n" +
            "            </div>";
        var DOM_card=DOM_Prefix+cardName+DOM_Postfix;
        $(".game-cards-column").append(DOM_card);
        setTimeout(function () {
            sendCardPlay0Display(play0ID);
            play0Num++;
            getNextPlay0Degs();
            correctPlay0CardPositionDisplay(0);
        },0);
    }
    /*send card to play*/
    function sendCardPlay0Display(play0ID){
        var rotate_deg=cardsPlay0Deg[play0Num]+"deg";
        $("#"+play0ID).css({"left":"calc( 50% - 4.5em)","top":"calc(100% - 15.5em)","transform":"rotate("+rotate_deg+")"})
    }
    /*change rotate after put good position*/
    function correctPlay0CardPositionDisplay(value){
        if(value<play0Num-1){
            setTimeout(function () {
                correctPlay0CardPositionDisplay(value+1);
            },0);
        }
        var playOID="play0-"+value;
        var rotate_deg=cardsPlay0Deg[value]+"deg";
        $("#"+playOID).css({"transform":"rotate("+rotate_deg+")"});
    }


    //some operation about play again
    function initAndAgain(){
        $.ajax({
           url: 'BlackJack',
           data:{
               command: 'again'
           },
           success: function (data) {
               var JSON_data=JSON.parse(data);
               if(JSON_data.resultCode){
                    console.log("preparation is Ok");
               }
           },
           error: function () {
               console.log("failure");
           }
        });
    }


    //some operations about cards of play1
    /*create card and change its card*/
    function addCardPlay1Display(cardName){
        var playID="play1-"+play1Num;
        var DOM_Prefix="            <div class=\"init-bg-card-3\" id=\"" +playID+
            "\">\n" +
            "              <img src=\"img/cards/";
        var DOM_Postfix=".png\" class=\"card\">\n" +
            "            </div>";
        var DOM_card=DOM_Prefix+cardName+DOM_Postfix;
        $(".game-cards-column").append(DOM_card);
        setTimeout(function () {
            sendCardPlay1Display(playID);
            play1Num++;
            getNextPlay1Degs();
            correctPlay1CardPositionDisplay(0);
        },0);
    }
    /*send card to play*/
    function sendCardPlay1Display(playID){
        var rotate_deg=cardsPlay1Deg[play1Num]+"deg";
        $("#"+playID).css({"left":"calc( 80% - 4.5em)","top":"calc(50% - 5.5em)","transform":"rotate("+rotate_deg+")"})
    }
    /*change rotate after put good position*/
    function correctPlay1CardPositionDisplay(value){
        if(value<play1Num-1){
            setTimeout(function () {
                correctPlay1CardPositionDisplay(value+1);
            },0);
        }
        var playID="play1-"+value;
        var rotate_deg=cardsPlay1Deg[value]+"deg";
        $("#"+playID).css({"transform":"rotate("+rotate_deg+")"});
    }


    //some operations about cards of bank
    /*create card and change its card*/
    function addCardBankDisplay(cardName){
        var bankID="bank-"+bankNum;
        var DOM_Prefix="            <div class=\"init-bg-card-3\" id=\"" +bankID+
            "\">\n" +
            "              <img src=\"img/cards/";
        var DOM_Postfix=".png\" class=\"card\">\n" +
            "            </div>";
        var DOM_card=DOM_Prefix+cardName+DOM_Postfix;
        $(".game-cards-column").append(DOM_card);
        setTimeout(function () {
            sendCardBankDisplay(bankID);
            bankNum++;
            getNextBankDegs();
            correctBankCardPositionDisplay(0);
        },0);
    }
    /*send card to play*/
    function sendCardBankDisplay(bankID){
        var rotate_deg=cardsBankDeg[bankNum]+"deg";
        $("#"+bankID).css({"left":"calc( 50% - 4.5em)","top":"calc(0% + 2.5em)","transform":"rotate("+rotate_deg+")"})
    }
    /*change rotate after put good position*/
    function correctBankCardPositionDisplay(value){
        if(value<bankNum-1){
            setTimeout(function () {
                correctBankCardPositionDisplay(value+1);
            },0);
        }
        var bankID="bank-"+value;
        var rotate_deg=cardsBankDeg[value]+"deg";
        $("#"+bankID).css({"transform":"rotate("+rotate_deg+")"});
    }


    //some operation about flag
    function whoSuccess(name){
        $(".game-icon-note").html(name+"赢了!");
        $(".game-icon-note").show();
    }


    //some assistance function
    /*get next degs after require card*/
    function getNextPlay0Degs(){
        var startDeg=(1-play0Num)*15/2;
        for(var i=0;i<=play0Num;i++){
            cardsPlay0Deg[i]=startDeg;
            startDeg=startDeg+15;
        }
        console.log(cardsPlay0Deg);
    }
    function getNextBankDegs(){
        var startDeg=(1-bankNum)*15/2;
        for(var i=0;i<=bankNum;i++){
            cardsBankDeg[i]=startDeg;
            startDeg=startDeg+15;
        }
        console.log(cardsBankDeg);
    }
    function getNextPlay1Degs(){
        var startDeg=(1-play1Num)*15/2;
        for(var i=0;i<=play1Num;i++){
            cardsPlay1Deg[i]=startDeg;
            startDeg=startDeg+15;
        }
        console.log(cardsBankDeg);
    }
    /*get offsetX and offsetY in the unit circle */
    function getOffset(){
        var angle=Math.random()*3600;
        var radius=Math.random();
        angle=Math.PI*angle/180;
        offsetX=Math.sin(angle)*radius;
        offsetY=Math.cos(angle)*radius;
    }
    /*change save money*/
    function changeSaveMoney(money){
        $(".game-coins-save").html("现金：$"+money);
    }
    /*change bet money*/
    function changeBetMoney(money){
        $(".game-coins-cover").html("押注：$"+money);
    }
    /*add change banker score*/
    function setScore(person,value1,value2){
        var person_CSS="game-score-"+person;
        if(value2){
            $("."+person_CSS).html(value1+"/"+value2);
            $("."+person_CSS).show();
        }
        else{
            $("."+person_CSS).html(value1);
            $("."+person_CSS).show();
        }
    }
    /*some change after boom*/
    function play0Boom(){
        $("#getInsurance").addClass("game-button-inactive");
        $("#getDouble").addClass("game-button-inactive");
        $("#stopCard").addClass("game-button-inactive");
        $("#getCard").addClass("game-button-inactive");
        $("#getInsurance").removeClass("game-button-active");
        $("#getDouble").removeClass("game-button-active");
        $("#stopCard").removeClass("game-button-active");
        $("#getCard").removeClass("game-button-active");
    }
});