//trying few things for the sticky footer
//to be cleaned up


var cookiesEl;
var footerEl = document.getElementsByTagName('footer');
var stickyFooterEl = document.getElementsByClassName('sticky-footer');
var mainEl = document.getElementsByClassName('main-container');

var CheckOutStickyElts = function() {
  if (!document.cookie.split(';').filter((item) => { return item.includes('cookie-agreed=2') }).length) {
    cookiesEl = document.querySelector('#sliding-popup');

  }

	var cookiesHeight = (cookiesEl) ? Math.max(cookiesEl.offsetHeight,cookiesEl.clientHeight) : 0;

	if( (getDocHeight() - Math.max(footerEl[0].offsetHeight,footerEl[0].clientHeight) + (cookiesEl ? cookiesHeight : 0) ) < getScrollXY()[1] + window.innerHeight) {
			 if(cookiesEl){
				 cookiesEl.style.marginBottom = 0;
			 }
    } else {
			if(cookiesEl){
				cookiesEl.style.marginBottom = (Math.max(stickyFooterEl[0].offsetHeight,stickyFooterEl[0].clientHeight) + 30 ) + 'px';
			}
    }
}

var CheckIfScrollBottom = debouncer(function() {
	CheckOutStickyElts();

},100);

document.addEventListener("DOMContentLoaded", function(){
  CheckOutStickyElts();
});

document.addEventListener('scroll',CheckIfScrollBottom);

function debouncer(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}
function getScrollXY(){var a=0,b=0;return"number"==typeof window.pageYOffset?(b=window.pageYOffset,a=window.pageXOffset):document.body&&(document.body.scrollLeft||document.body.scrollTop)?(b=document.body.scrollTop,a=document.body.scrollLeft):document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)&&(b=document.documentElement.scrollTop,a=document.documentElement.scrollLeft),[a,b]}
function getDocHeight(){var a=document;return Math.max(a.body.scrollHeight,a.documentElement.scrollHeight,a.body.offsetHeight,a.documentElement.offsetHeight,a.body.clientHeight,a.documentElement.clientHeight)}
