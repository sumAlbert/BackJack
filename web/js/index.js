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
    //click_lock
    var getCard_lock=false;
    var insurance_lock=false;
    var double_lock=false;
    var stop_lock=false;
    var again_lock=false;

    //function to execute after init web
    againGame();


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
                    if(JSON_data.bet_money=="0"){
                        getCard_lock=false;
                    }
                    else{
                        getCard_lock=true;
                    }
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
                    if(JSON_data.bet_money=="0"){
                        getCard_lock=false;
                    }
                    else{
                        getCard_lock=true;
                    }
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
                    if(JSON_data.bet_money=="0"){
                        getCard_lock=false;
                    }
                    else{
                        getCard_lock=true;
                    }
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
        if(again_lock){
            window.location.reload();
        }
        if(getCard_lock){
            getCard_lock=false;
            stop_lock=false;
            if(play0Num){
                double_lock=false;
                insurance_lock=false;
                $("#getDouble").removeClass("game-button-active");
                $("#getDouble").addClass("game-button-inactive");
                $("#getInsurance").removeClass("game-button-active");
                $("#getInsurance").addClass("game-button-inactive");
                $.ajax({
                    url: 'BlackJack',
                    data:{
                        command: 'hit'
                    },
                    success: function (data) {
                        console.log(data);
                        var JSON_data=JSON.parse(data);
                        if(JSON_data.resultCode){
                            setTimeout(function () {
                                addCardPlay0Display(JSON_data.cards[0]);
                                setScore("play0",JSON_data.scores[0],0);
                                if(JSON_data.boom){
                                    someBoom("play0");
                                    passCards();
                                }
                            },0);
                            setTimeout(function () {
                                getCard_lock=true;
                                stop_lock=true;
                            },1000);
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
                                double_lock=true;
                                stop_lock=true;
                                $("#getDouble").removeClass("game-button-inactive");
                                $("#getDouble").addClass("game-button-active");
                                $("#stopCard").removeClass("game-button-inactive");
                                $("#stopCard").addClass("game-button-active");
                                if(JSON_data.scores[0]==JSON_data.scores[2]){
                                    setScore("play0",JSON_data.scores[0],0);
                                    setScore("play1",JSON_data.scores[1],0);
                                    getCard_lock=true;
                                }
                                else{
                                    setScore("play0",JSON_data.scores[0],JSON_data.scores[2]);
                                    setScore("play1",JSON_data.scores[1],0);
                                    getCard_lock=true;
                                }
                            },4800);
                            if(JSON_data.cards[0]=="A1"||JSON_data.cards[0]=="B1"||JSON_data.cards[0]=="C1"||JSON_data.cards[0]=="D1"){
                                setTimeout(function () {
                                    insurance_lock=true;
                                    $("#getInsurance").removeClass("game-button-inactive");
                                    $("#getInsurance").addClass("game-button-active");
                                },4800)
                            }
                        }
                    },
                    error: function () {
                        console.log("failure");
                    }
                });
            }
        }
    });
    $("#getInsurance").click(function () {
        if(insurance_lock){
            insurance_lock=false;
            $.ajax({
                url: 'BlackJack',
                data:{
                    command: 'insurance'
                },
                success: function (data) {
                    console.log(data);
                    var JSON_data=JSON.parse(data);
                    if(JSON_data.resultCode){
                        changeSaveMoney(JSON_data.money);
                        $("#getInsurance").addClass("game-button-inactive");
                        $("#getInsurance").removeClass("game-button-active");
                        if(JSON_data.state!=""){
                            openHiddenCard();
                            setScore("bank",21,0);
                            getCard_lock=false;
                            insurance_lock=false;
                            double_lock=false;
                            stop_lock=false;
                        }
                    }
                },
                error: function () {
                    console.log("failure");
                }
            });
        }
    });
    $("#getDouble").click(function () {
        if(double_lock){
            $.ajax({
                url: 'BlackJack',
                data:{
                    command: 'double'
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    if(JSON_data.resultCode){
                        changeBetMoney(JSON_data.bet_money);
                        changeSaveMoney(JSON_data.money);
                        addCardPlay0Display(JSON_data.cards[0]);
                        setScore("play0",JSON_data.scores[0],0);
                        if(JSON_data.boom){
                            someBoom("play0");
                        }
                        passCards();
                    }
                },
                error: function () {
                    console.log("failure");
                }
            });
        }
    });
    $("#stopCard").click(function () {
        if(stop_lock){
            console.log("stop card button");
            passCards();
        }
    });



    function againGame(){
        $.ajax({
            url: 'BlackJack',
            data:{
                command: 'again'
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                if(JSON_data.resultCode){
                    changeSaveMoney(JSON_data.money);
                }
            },
            error: function () {
                console.log("failure");
            }
        });
    }

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
        $("#"+event.data.DOM_id).off("click");
        switch (event.data.value){
            case 20:
                $("#"+event.data.DOM_id).css({"left" : "calc(50% - 2em)","top":"0"});
                $.ajax({
                    url: 'BlackJack',
                    data:{
                        command: 'bet',
                        value: '-20'
                    },
                    success: function (data) {
                        var JSON_data=JSON.parse(data);
                        if(JSON_data.resultCode){
                            changeBetMoney(JSON_data.bet_money);
                            changeSaveMoney(JSON_data.money);
                            if(JSON_data.bet_money=="0"){
                                getCard_lock=false;
                            }
                            else{
                                getCard_lock=true;
                            }
                        }
                    },
                    error: function () {
                        console.log("failure");
                    }
                });
                setTimeout(function () {
                    $("#"+event.data.DOM_id).remove();
                    coinsNum[0]--;
                },1000);
                break;
            case 50:
                $("#"+event.data.DOM_id).css({"left" : "calc(30% - 2em)","top":"4em"});
                $.ajax({
                    url: 'BlackJack',
                    data:{
                        command: 'bet',
                        value: '-50'
                    },
                    success: function (data) {
                        var JSON_data=JSON.parse(data);
                        if(JSON_data.resultCode){
                            changeBetMoney(JSON_data.bet_money);
                            changeSaveMoney(JSON_data.money);
                            if(JSON_data.bet_money=="0"){
                                getCard_lock=false;
                            }
                            else{
                                getCard_lock=true;
                            }
                        }
                    },
                    error: function () {
                        console.log("failure");
                    }
                });
                setTimeout(function () {
                    $("#"+event.data.DOM_id).remove();
                    coinsNum[1]--;
                },1000);
                break;
            case 100:
                $("#"+event.data.DOM_id).css({"left" : "calc(70% - 2em)","top":"4em"});
                $.ajax({
                    url: 'BlackJack',
                    data:{
                        command: 'bet',
                        value: '-100'
                    },
                    success: function (data) {
                        var JSON_data=JSON.parse(data);
                        if(JSON_data.resultCode){
                            changeBetMoney(JSON_data.bet_money);
                            changeSaveMoney(JSON_data.money);
                            if(JSON_data.bet_money=="0"){
                                getCard_lock=false;
                            }
                            else{
                                getCard_lock=true;
                            }
                        }
                    },
                    error: function () {
                        console.log("failure");
                    }
                });
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
        },100);
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
        },100);
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
        },100);
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
    function whoSuccess(result){
        switch (result[0]){
            case 0:
                result[0]="输";
                break;
            case 1:
                result[0]="平";
                break;
            default:
                result[0]="赢";
                break;
        }
        switch (result[1]){
            case 0:
                result[1]="输";
                break;
            case 1:
                result[1]="平";
                break;
            default:
                result[1]="赢";
                break;
        }
        $(".game-icon-note").html("玩家一:"+result[0]+",玩家二:"+result[1]);
        $(".game-icon-note").show();
        setTimeout(function () {
            $(".game-icon-note").hide();
        },5000);
    }

    //pass the card
    function passCards(){
        passCard();
        $.ajax({
            url: 'BlackJack',
            data:{
                command: 'pass'
            },
            success: function (data) {
                console.log(data);
                var JSON_data=JSON.parse(data);
                if(JSON_data.resultCode){
                    var person="play0";
                    var cards=JSON_data.cards;
                    var scores=JSON_data.scores;
                    for(var i=0;i<cards.length;i++){
                        let kind=cards[i];
                        setTimeout(function () {
                            if(kind=="*"){
                                person="banker";
                            }else{
                                if(person=="banker"){
                                    addCardBankDisplay(kind);
                                }
                                else{
                                    addCardPlay1Display(kind);
                                }
                            }
                        },i*800);
                    }
                    setTimeout(function () {
                        setScore("play1",scores[0],0);
                        setScore("bank",scores[1],0);
                        openHiddenCard();
                    },800*cards.length);
                }
            },
            error: function () {
                console.log("failure");
            }
        });
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
    function someBoom(person){
        if(person=="play0"){
            getCard_lock=false;
            $(".game-icon-note").html("你爆了！！");
            $(".game-icon-note").show();
            setTimeout(function () {
                $(".game-icon-note").hide();
            },5000);
            $("#getInsurance").addClass("game-button-inactive");
            $("#getDouble").addClass("game-button-inactive");
            $("#stopCard").addClass("game-button-inactive");
            $("#getCard").addClass("game-button-inactive");
            $("#getInsurance").removeClass("game-button-active");
            $("#getDouble").removeClass("game-button-active");
            $("#stopCard").removeClass("game-button-active");
            $("#getCard").removeClass("game-button-active");
        }
    }
    /*return the hidden card of banker*/
    function openHiddenCard() {
        $("#bank-1 > img").attr("src","img/cards/"+bgCard+".png");
        again_lock=true;
    }
    //TODO
    /*pass the card*/
    function passCard(){
        $("#getInsurance").addClass("game-button-inactive");
        $("#getDouble").addClass("game-button-inactive");
        $("#stopCard").addClass("game-button-inactive");
        $("#getCard").addClass("game-button-inactive");
        $("#getInsurance").removeClass("game-button-active");
        $("#getDouble").removeClass("game-button-active");
        $("#stopCard").removeClass("game-button-active");
        $("#getCard").removeClass("game-button-active");
        getCard_lock=false;
        insurance_lock=false;
        double_lock=false;
        stop_lock=false;
    }

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
});