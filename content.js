/**
  @author ArvinH
**/
function paresWeb(query){
    var TD = $.get("http://tw.dictionary.search.yahoo.com/search?q="+query, function(data) {
            var el = $( '<div></div>' );
            el.html(data);
            var attrs = $('p[class=explanation]', el);
            for (var i = 0; i < 3; i++) {
                  alert(attrs.eq(i).html());
            };

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
      console.log(request.test)    
    if (request.text == "ON"){
        $('body').mouseup(function(){
          var t = getSelText().toString();
            var reg = /[A-Za-z]+/;
            if(t.search(reg)!= -1){
                  paresWeb(t);
            }
        });
        
        console.log('ON')

    }
    else{
      $('body').off('mouseup');
                  
        console.log('OFF')
    }
      
  });
   
