/**
  @author ArvinH
**/
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


$('body').mouseup(function(){
  var t = getSelText().toString();
    var reg = /[A-Za-z]+/;
    if(t.search(reg)!= -1){
          alert(t);
    }
});