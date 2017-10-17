$(document).ready(function(){
   $.ajax({
       url: 'BackJack',
       data:{
           command: 'hit'
       },
       success: function () {
           console.log("success");
       },
       error: function () {
           console.log("failure");
       }
   })
});