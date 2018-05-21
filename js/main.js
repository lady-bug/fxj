//trying few things for the sticky footer
//to be cleaned up

function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(document.querySelector(selector));
    }
}

var cookiesEl;
var footerEl = document.getElementsByTagName('footer');
var stickyFooterEl = document.getElementsByClassName('sticky-footer');
var mainEl = document.getElementsByClassName('main-container');

var CheckOutStickyElts = function(){
	var cookiesHeight = Math.max(cookiesEl.offsetHeight,cookiesEl.clientHeight);
	//cookiesHeight += parseInt(window.getComputedStyle(cookiesEl).getPropertyValue('margin-top'));
	//cookiesHeight += parseInt(window.getComputedStyle(cookiesEl).getPropertyValue('margin-bottom'));
console.log(cookiesHeight);

	if( (getDocHeight() - Math.max(footerEl[0].offsetHeight,footerEl[0].clientHeight) + (cookiesEl ? cookiesHeight : 0) ) < getScrollXY()[1] + window.innerHeight) {
       stickyFooterEl[0].classList.remove('fixed');
			 mainEl[0].classList.remove('fixed');
			 if(cookiesEl){
				 cookiesEl.style = '';
			 }
    } else {
      stickyFooterEl[0].classList.add('fixed');
      mainEl[0].classList.add('fixed');
			if(cookiesEl){
				cookiesEl.style.bottom = Math.max(stickyFooterEl[0].offsetHeight,stickyFooterEl[0].clientHeight) + 'px';
			}
    }
}

//console.log('doc height '+getDocHeight());
//console.log('compare to '+getScrollXY()[1] + window.innerHeight);

//console.log('maxx footer height '+ Math.max(footerEl[0].offsetHeight,footerEl[0].clientHeight));


var CheckIfScrollBottom = debouncer(function() {
	//console.log('doc height '+getDocHeight());
	//console.log('compare to' +getScrollXY()[1] + window.innerHeight);
	CheckOutStickyElts();

},100);

checkElement('#sliding-popup')
.then((element) => {
     cookiesEl = element;
		 CheckOutStickyElts();
});

document.addEventListener('scroll',CheckIfScrollBottom);

function debouncer(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}
function getScrollXY(){var a=0,b=0;return"number"==typeof window.pageYOffset?(b=window.pageYOffset,a=window.pageXOffset):document.body&&(document.body.scrollLeft||document.body.scrollTop)?(b=document.body.scrollTop,a=document.body.scrollLeft):document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)&&(b=document.documentElement.scrollTop,a=document.documentElement.scrollLeft),[a,b]}
function getDocHeight(){var a=document;return Math.max(a.body.scrollHeight,a.documentElement.scrollHeight,a.body.offsetHeight,a.documentElement.offsetHeight,a.body.clientHeight,a.documentElement.clientHeight)}
