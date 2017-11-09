/**
  @author ArvinH
**/
function paresWeb(query, event){
    var TD = $.get("https://tw.dictionary.search.yahoo.com/search?q="+query, function(data) {
                var el = $( '<div></div>' );
                el.html(data);
                // var attrs = $('p[class=explanation]', el);
                var attrs = $('p[class=DictionaryResults]', el);
                // exp = el.find('div[class=DictionaryResults][class=1st][class=explain]');
                exp = el.find('.DictionaryResults');
                
                var rangeCount = window.getSelection().rangeCount;
                var range = window.getSelection().getRangeAt(rangeCount-1);
                /*
                if (window.getSelection) {
                    rangeCount = window.getSelection().rangeCount;
                    range = window.getSelection().getRangeAt(rangeCount-1);
                } else if (document.getSelection) {
                    rangeCount = document.getSelection().rangeCount;
                    range = document.getSelection().getRangeAt(rangeCount-1);
                } else if (document.selection) {
                    rangeCount = document.selection.rangeCount;
                    range = document.selection.getRangeAt(rangeCount-1);
                } 
                */
                var dummy = document.createElement("div");
                dummy.setAttribute("id","dialog");
                dummy.setAttribute("title","翻譯結果");
                dummy.className = "result_content";
                range.insertNode(dummy);
                
                $(".result_content").css({"width":"40px", "height":"20px", "display":"inline", "z-index":"3000"})
                var box = dummy.getBoundingClientRect();
                var x = box.left+25, y = box.top+15;
                console.log(x);
                console.log(y);

                $(".result_content").html(exp.eq(2).html());
                
                jQuery("#dialog").dialog({
                  autoOpen: true, 
                  draggable: true,
                  resizable: true,
                  height: 'auto',
                  width: 'auto', // "250px",
                  modal: false, //true,
                  open: function(event, ui) {
                    $(event.target).parent().css('position','fixed');
                    $(event.target).parent().css('top', y+'px');
                    $(event.target).parent().css('left', x+'px');
                  }
                });
                //*/   
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
   
