(function (doc, win){
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationonchange' in window ? 'orientationonchange' : 'resize';
    var recalc = function() {
        var clientwidth = docEl.clientwidth;
        if (!clientwidth) {
            return;
        } 
        
        if (clientwidth >= 640) {
            docEl.style.fontSize = '100px';
        } else {
            docEl.style.fontSize = 100 * (clientwidth / 640) + 'px';
        }
    };
    
    if (!doc.addEventListener) {
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)