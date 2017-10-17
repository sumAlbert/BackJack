$(document).ready(function(){
   $.ajax({
       url: 'BackJack',
       success: function () {
           console.log("success");
       },
       error: function () {
           console.log("failure");
       }
   })
});