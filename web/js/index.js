$(document).ready(function(){
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
   })
});