/**
  @author ArvinH
**/
function paresWeb(query, event){
    var TD = $.get("http://tw.dictionary.search.yahoo.com/search?q="+query, function(data) {
            var el = $( '<div></div>' );
            el.html(data);
            var attrs = $('p[class=explanation]', el);
            var rangeCount = window.getSelection().rangeCount;
            var range = window.getSelection().getRangeAt(rangeCount-1);
            var dummy = document.createElement("div");
            dummy.className = "result_content";
            range.insertNode(dummy);
            $(".result_content").css({"width":"40px", "height":"20px", "display":"inline"})
            $(".result_content").text(attrs.eq(0).html())
            /*var box = document.getBoxObjectFor(dummy);
            var x = box.x, y = box.y;
            dummy.parentNode.removeChild(dummy);
            */
            //for (var i = 0; i < attrs.length; i++) {
                $(".result_content").tooltip({content: attrs.eq(0).html()});
           // };
                setTimeout(function(){
                    dummy.parentNode.removeChild(dummy);
                },3000);
            })
    .fail(function() { alert("error"); });
}
 
function getSelText() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    } 
    return txt;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {   
    if (request.text == "ON"){
        $('body').mouseup(function(){
          var t = getSelText().toString();
            var reg = /[A-Za-z]+/;
            if(t.search(reg)!= -1){
                  paresWeb(t,$(this));
            }
        });
        console.log('ON')
    }
    else{
      $('body').off('mouseup');
                  
        console.log('OFF')
    }
      
  });
   
