

(function ($) {

    "use strict";
	
	// PARALLAX EFFECT
	if(isExists($('.parallax-window'))){
		var parallaxElem = $('.parallax-window');
		$(parallaxElem).each(function(){
			var $this = $(this),
				imgSrc = $this.data('image-src');
			
			$this.parallax({
				imageSrc: imgSrc
			});
		});
	}
	
	// POP UP VIDEO
	if(isExists($('.magnific-pop-up'))){
		var $magnificPopUp = $('.magnific-pop-up');
		
		$($magnificPopUp).each(function(){
			var $this = $(this),
				popType = $this.data('popup-type');
			$(this).magnificPopup({
				type: (popType ? popType: 'image'),
				 removalDelay: 300,

				  // Class that is added to popup wrapper and background
				  // make it unique to apply your CSS animations just to this exact popup
				  mainClass: 'mfp-fade'
			});
			
		});
		
	}

	// // PAGE LOADER
	$(window).on('load', function() {
		
		$(".loader-wrapper").fadeOut("slow");
		
		// ENABLE MASONARY
		if(isExists('.grid')){
			var $container = $('.grid');
			$container.multipleFilterMasonry({
				itemSelector: '.grid-item',
				filtersGroupSelector:'.filters',
			});
		}
	});
	
	// REVOLUTIONSLIDER
	if(isExists('#rev_slider_1014_1')){
	
		var tpj=jQuery;
		
		var revapi1014;
		if(tpj("#rev_slider_1014_1").revolution == undefined){
			revslider_showDoubleJqueryError("#rev_slider_1014_1");
		}else{
			revapi1014 = tpj("#rev_slider_1014_1").show().revolution({
				sliderType:"standard",
				jsFileLocation:"revolution/js/",
				sliderLayout:"fullwidth",
				dottedOverlay:"none",
				delay:4000,
				navigation: {
					keyboardNavigation:"off",
					keyboard_direction: "horizontal",
					mouseScrollNavigation:"off",
					mouseScrollReverse:"default",
					onHoverStop:"off",
					touch:{
						touchenabled:"on",
						swipe_threshold: 75,
						swipe_min_touches: 1,
						swipe_direction: "horizontal",
						drag_block_vertical: false
					}
					,
					arrows: {
						style:"zeus",
						enable:true,
						hide_onmobile:true,
						hide_under:300,
						hide_onleave:false,
						hide_delay:200,
						hide_delay_mobile:1200,
						tmp:'<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
						left: {
							h_align:"left",
							v_align:"center",
							h_offset:30,
							v_offset:0
						},
						right: {
							h_align:"right",
							v_align:"center",
							h_offset:30,
							v_offset:0
						}
					}
				},
				
						responsiveLevels:[1240,1024,778,480],
						visibilityLevels:[1240,1024,778,480],
						gridwidth:[1240,1024,778,480],
						gridheight:[800,800,600,500],
						lazyType:"none",
						
						shadow:0,
						spinner:"off",
						stopLoop:"off",
						stopAfterLoops:-1,
						stopAtSlide:-1,
						shuffle:"off",
						autoHeight:"off",
						hideThumbsOnMobile:"off",
						hideSliderAtLimit:0,
						hideCaptionAtLimit:0,
						hideAllCaptionAtLilmit:0,
						debugMode:false,
						fallbacks: {
							simplifyAll:"off",
							nextSlideOnWindowFocus:"off",
							disableFocusListener:false,
						}
			});
		}
	}
  
	
	// Dropdown functionality
	var winWidth = $(window).width();
	var isTouchDevice = (winWidth < 767) ? true : false;
	menuDropdown(isTouchDevice);

	// Window resize event for dropdown menu
	$(window).on('resize', function(){
		
		winWidth = $(window).width();
		isTouchDevice = (winWidth < 767) ? true : false;
		
		debounceFnForDropDown(isTouchDevice);
	});

	
	// POP UP ON CLICK
	enbalePopUpFn();
		
	// SMOOTH SCROLL ON THE SAME PAGE AFTER CLICKING A LINK
	smoothScroll();
	
	//Enable swiper slider
	enableSwiper();
	

	// FIXED MENU ON SCROLL
	var $fixedMenu
	
	if(isExists('.fixed-on-scroll')){
		$fixedMenu = $('.fixed-on-scroll');
		fixedMenuOnScrollFn($fixedMenu);
	}
	
	
	// Enable counter on visible
	var a = 0;
	enableCounter(a)
	
	// SCROLL EVENT
	$(window).on('scroll', function() {
		
		// FIXED MENU ON SCROLL
		if(typeof $fixedMenu != 'undefined'){
			fixedMenuOnScrollFn($fixedMenu);
		}
	
		// BACK TO TOP VISIBLE AFTER THE CENTER OF THE PAGE
		backToTop();
		
		// Enable counter on visible
		enableCounter(a);
		
	});
	
	
	// Prevent fire an event if anchor is null
	$('a[href="#"]').on('click', function(){
		return false;
	});
	
	// ENABLE MENU ICON FOR SMALLER DEVICE
	$('[data-menu-visible]').on('click', function(event){
		
		var $this = $(this),
			visibleHeadArea = $this.data('menu-visible');
		
		$('.nav-visible').not(visibleHeadArea).removeClass('visible');
		
		$(visibleHeadArea).toggleClass('visible');

		event.stopPropagation();
	});
	
	// BACK TO TOP VISIBLE AFTER THE CENTER OF THE PAGE
    backToTop();
	
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
	
	
	// ACCORDIAN FOR PRODUCT DETAILS PAGE
	enableAccordian();
	
	// ADD TO CART FUNCTIONALITY
	addtoCartFunc();
	
	// PRODUCT DETAILS PAGE ZOOM EFFECT
	productDetailFunc();
	
	// SUBMIT REVIEW BY STAR
	submit_review();
	
})(jQuery);

// PRICE RANGE FILTER
function priceRangeFilter(){
	// PRICE RANGE FILTER
	if(isExists('#price-range')){
		var $priceRange = $('#price-range');
		$priceRange.slider({
			range: true,
			min: 0,
			max: 1500,
			values: [ 10, 800 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		  }
		});
		$( "#amount" ).val( "$" + $priceRange.slider( "values", 0 ) +
			" - $" + $priceRange.slider( "values", 1 ) );
	}
}


// PRODUCT DETAILS SCRIPT
function productDetailFunc(){
	
	// PRODUCT IMAGE
	$('[data-prod-image]').on('click', function(){
		var $this = $(this),
			imageSrc = $this.data('prod-image');
		$('.prod-img').removeClass('active');
		$(imageSrc).addClass('active');
		
	});
	
	if(isExists('.zoom')){ $('.zoom').zoom(); }
	
	$('[data-quantity]').click(function(){
		var $this = $(this),
			btn = $this.data('quantity'),
			$qtyInput =  $('#quantity-input'),
			qty =  $qtyInput.val();
		
		if(qty === null || isNaN(qty)){ $qtyInput.val('1'); return; }
		
		if(btn === 'plus') {
			qty++; 
			$qtyInput.val(qty);
		}
		else if(btn === 'minus' && qty > 1){
			qty--; 
			$qtyInput.val(qty);
		}
	});
}


// PRODUCT DETAILS ACCORDIAN
function enableAccordian(){
	$('[data-desc-active]').on('click', function(){
		
		$('[data-desc-active]').removeClass('active');
		$('.desc-item').removeClass('active');
		
		var $this = $(this),
			activeElem = $this.data('desc-active'),
			activeHeading = 'a[data-desc-active="'+ activeElem +'"]';

		$('.product-heading ' + activeHeading).addClass('active');
		$(activeElem).addClass('active');
		
		return;
	});
}


// SUBMIT REVIEW BY STAR
function submit_review(){
	$('.review-stars .star').on('click', function(){
		$('.review-stars .star').removeClass('active');
		var clickedCurrent = $(this);
		$('.review-stars .star').each(function(){
			$(this).addClass('active');
			if(clickedCurrent.is($(this))) return false;
		});
	});
}

// ADD TO CART FUNCTIONALITY
function addtoCartFunc(){
	
	// CART FUNCTIONALITY
	var products = [];
	var productCartCount = 0;
	var subTotal = 0;
	
	
	$('[data-cart-popup]').on('click', function(){
		
		var $this = $(this),
			$popUp = $this.data('cart-popup');
		
		$($popUp).toggleClass('active');
	});
	
	// ADD TO CART
	$('[data-cart-btn]').on('click', function(){
		
		var $this = $(this),
			title = $this.parents('[data-product="1"]').find('[data-p-title]').text(),
			price = $this.parents('[data-product="1"]').find('.price').text(),
			quantity = $this.parents('[data-product="1"]').find('input[name="quantity"]').val(),
			// imageSrc = "",
			imageSrc = $this.parents('[data-product="1"]').find('.p-img').attr('src'),
			totalItemPrice = price * quantity;
			
		if(!$.isNumeric(quantity)){ 
			return false;
		}
		
		productCartCount++;
		
		// SINGLE PRODUCT OBJECT
		var product = {};
		product.pId = productCartCount;
		product.title = title;
		product.price = price;
		product.quantity = quantity;
		product.imageSrc = imageSrc;
		product.totalItemPrice = totalItemPrice;
		
		products.push(product);
		
		$('.no-item').css('display', 'none');
		
		$('#added-item').text(productCartCount);
		
		var htmlString;
		$('#cart-product-list').html("");
		
		$.each(products, function( k, v ) {
			
			htmlString ='<div class="cart-product">' + 
							'<input class="hidden-id" type="hidden" value="'+ v.pId +'">' +
							'<input class="total-item-price" type="hidden" value="'+ v.totalItemPrice +'">' +
							'<a class="product-img" href="#"><img src="'+ v.imageSrc +'" alt=""></a>' +
							'<div class="product-detail">' +
								'<a href="#"><h6 class="title">'+ v.title +'</h6></a>' +
								'<h6 class="product-price">' +
									'<span class="quantity">'+ v.quantity +'</span> x ' +
									'$<span class="price">'+ v.price +'</span>' +
								'</h6>' +
								'<a href="#" class="cart-remove-btn"><i class="ion-close-round"></i></a>' +
							'</div>' +
						'</div>';
			
			$('#cart-product-list').append(htmlString);
		});
		
		subTotal = subTotal + totalItemPrice;
		$('.subtotal').text(subTotal);
			
	});
	
	// REMOVE FROM CART
	$("body").on("click", ".cart-remove-btn", function(){
		productCartCount --;
		$('#added-item').text(productCartCount);
		
		var cartProduct = $(this).parents('.cart-product'),
			pId = cartProduct.find('.hidden-id').val(),
			totalItemPrice = cartProduct.find('.total-item-price').val();
			
		subTotal = subTotal - totalItemPrice;
		$('.subtotal').text(subTotal);
		
		// var index = products.findIndex(function(product) {
			
			// return product.pId === pId;
		// });
		
		var index = $.each(products, function( k, v ) {
			if(v.pId === pId) return k;
		});
			
		products.splice(index,1);
		
		if(products.length  === 0) $('.no-item').css('display', 'block');
		cartProduct.css('display', 'none');
		return false;
		
	});
}

// FIXED MENU ON SCROLL
function fixedMenuOnScrollFn($fixedElem){
		
	var topWindow = $(window).scrollTop();
	var fixedPosition = 500;
	
	if((fixedPosition) < topWindow){
		$fixedElem.addClass('fixed');
	}else if((fixedPosition) > topWindow){
		$fixedElem.removeClass('fixed');
	}
}
	
// Dropdown menu Function
function menuDropdown(isTouchDevice){
	
	$('.main-menu li').removeClass('d-hover-effect');
	
	if(isTouchDevice){
		
		$('.main-menu  a').unbind('click').on('click', function(e) {
			
			var listElem = $(this).parent();
			
			$(listElem).toggleClass('d-hover-effect');
			
		});
		
	}else{
		
		var anchorElem = $('.main-menu li');
		
		$(anchorElem).unbind('mouseenter').on('mouseenter', function(e) {
			$(this).addClass('d-hover-effect');
			
		}).unbind('mouseleave').on('mouseleave', function(e) {
			$(this).removeClass('d-hover-effect');
			
		});
	}
	
}

// Debounce Function for Dropdown menu
var debounceFnForDropDown = debounce(function( isTouchDevice ) {
	menuDropdown(isTouchDevice);
},50);


// POP UP ON CLICK
function enbalePopUpFn(){
	
	// Close the div if user clicks outside of the div
	$(window).on('click', function() {
		$('.pop-up').removeClass('visible');
		// setInterval(function(){ 
			
			// alert("Hello"); }, 3000
			// );
	});
	
	// Prevent the closing the div if user clicks inside of the div
	$('.pop-up-main').on('click', function(event){
		event.stopPropagation();
	});
	
	// Close button for right side hidden area
	$('.close-btn').on('click', function(){
		var closeElem = $(this).data('close');
		$(closeElem).removeClass('visible');
		
	});
	
	// Click event for displaying the div that has "data-popup" attribute 
	
	$('[data-popup]').on('click', function(event){
		
		var $this = $(this),
			popUp = $this.data('popup');
		
		$('.pop-up').removeClass('visible');
		
		$(popUp).toggleClass('visible');
		$(popUp).find('input').focus();
		event.stopPropagation();
	
	});
}

function smoothScroll(){
	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#bs-carousel"]')
	  .not('[href="#0"]')
	  .click(function(event) {
		// On-page links
		if (
		  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		  && 
		  location.hostname == this.hostname
		) {
		  // Figure out element to scroll to
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  // Does a scroll target exist?
		  if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
			  scrollTop: target.offset().top - 150
			}, 500, function() {
			  // Callback after animation
			  // Must change focus!
			  var $target = $(target);
			  $target.focus();
			  
			});
		  }
		}
	  });
}


function backToTop() {
	var scrollTrigger = $(document).outerHeight()/2;
	var scrollTop = $(window).scrollTop();
	if (scrollTop > scrollTrigger) {
		$('#back-to-top').addClass('show');
	} else {
		$('#back-to-top').removeClass('show');
	}
};
	
// Debounce Function for Dropdown menu
var debounceFnForDropDown = debounce(function( isTouchDevice ) {
	menuDropdown(isTouchDevice);
},50);

// Debounce Function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


// Counter Function
function enableCounter(a){
	var a = a;
	if(!isExists('.counter')) return;
	var windowTop = $(window).scrollTop();
	var windowBottom = $(window).scrollTop() + $(window).height();
	
	$('.counter').each(function(){
		var $this = $(this);
		var oMiddle = $this.offset().top + $this.height()/2;
		if (a == 0 && ( windowTop <= oMiddle) && ( windowBottom >= oMiddle)) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
				duration: 1000,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
					},
				complete: function() {
					$this.text(this.countNum);
					}
				});
			});
		}
	});
	
	a = 1;
}

// Swiper slider function
function enableSwiper(){
	
	if ( isExists('.swiper-container') ) {
		
		$('.swiper-container').each(function (index) {
			
			var $this						= $(this),
				swprDirection 				= $this.data('swpr-direction'),
				swprSlidePerView			= $this.data('swpr-slides-per-view'),
				swprCenteredSlides			= $this.data('swpr-centered-slides'),
				// swprBreakpoints				= $this.data('swpr-breakpoints'),
				swprSpeed					= $this.data('swpr-speed'),
				swprCrossFade				= $this.data('swpr-crossfade'),
				swprLoop					= $this.data('swpr-loop'),
				swprAutoplay 				= $this.data('swpr-autoplay'),
				swprMousewheelControl 		= $this.data('swpr-wheel-control'),
				swprlidesPerview 			= $this.data('slides-perview'),
				swprMargin 					= parseInt($(this).data('swpr-margin')),
				swprSlideEffect 			= $this.data('slide-effect'),
				swprAutoHeight 				= $this.data('autoheight'),
				swprResponsiveSlide 		= $this.data('swpr-responsive-slide'),
				swprScrollbar 				= ($this.data('scrollbar') ? $(this).find('.swiper-scrollbar') : null),
				swprNextButton				= $this.parentsUntil('section').find('.swpr-control .swiper-button-next'),
				swprPrevButton				= $this.parentsUntil('section').find('.swpr-control .swiper-button-prev');
				swprScrollbar 				= (isExists(swprScrollbar) ? swprScrollbar : null);
				
			
			var swiper = new Swiper($(this)[0], {
				pagination			: $(this).find('.swiper-pagination'),
				
				slidesPerView		: ( swprSlidePerView ? swprSlidePerView : 'auto' ),
				direction			: ( swprDirection ? swprDirection : 'horizontal'),
				loop				: ( swprLoop ? swprLoop : false),
				nextButton			: swprNextButton,
				prevButton			: swprPrevButton,
				autoplay			: ( swprAutoplay ? swprAutoplay : false),
				paginationClickable	: true,
				spaceBetween		: ( swprMargin ? swprMargin : 0),
				mousewheelControl	: ( (swprMousewheelControl) ? swprMousewheelControl : false),
				scrollbar			: ( swprScrollbar ? swprScrollbar : null ),
				scrollbarHide		: false,
				centeredSlides		: ( swprCenteredSlides ? swprCenteredSlides : false ),
				speed				: ( swprSpeed ? swprSpeed : 1000 ),
				autoHeight			: ( (swprAutoHeight == false) ? swprAutoHeight : true ),
				effect				: ( swprSlideEffect ? swprSlideEffect : 'coverflow' ),
				fade				: { crossFade: swprCrossFade ? swprCrossFade : false },
				breakpoints			: {
										1200: { slidesPerView: swprResponsiveSlide ? swprResponsiveSlide[0] : 1, },
										992: { slidesPerView: swprResponsiveSlide ? swprResponsiveSlide[1] : 1, },
										767: { slidesPerView: swprResponsiveSlide ? swprResponsiveSlide[2] : 1, },
										479: { slidesPerView: swprResponsiveSlide ? swprResponsiveSlide[3] : 1, }
										},
			});
			
			$(".swiper-container").hover(function(){
				swiper.stopAutoplay();
			}, function(){
				swiper.startAutoplay();
			});

		});
	}
}

function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
	google.maps.event.addDomListener(window, 'load', initMap);
	
}

// Masonary LIST

$.fn.multipleFilterMasonry = function(options){
    var cache=[];
    var filters = [];

    if(options.selectorType === 'list') {
      $(options.filtersGroupSelector).children().each(function() {
        filters.push($(this).data('filter'));
      });
    }

    //the main job of the function is to cache the item,because we are going to filter the items later
    var init = function($container){
		$container.find(options.itemSelector).each(function(){
			cache.push($(this));
		});
		$container.masonry(options);
    };

    //filter items in cache
    var filterItems = function(selector){
		var result=[];
		$(cache).each(function(item){
			$(selector).each(function(index,sel) {
				if(cache[item].is(sel)){
					if($.inArray(cache[item], result) === -1) result.push(cache[item]);
				}	
			});
		});
		return result;
    };

    //reload masonry
    var reload = function($container,items){
		  $container.empty();
		  $(items).each(function(){
			$($container).append($(this));
		  });
		  $container.masonry('reloadItems');
		  $container.masonry();
    };

    // Hash filter
    var hashFilter = function($container) {
      var hash = window.location.hash.replace("#", "");
      if($.inArray(hash, filters) !== -1) {
        reload($container, $('.' + hash));
      }
    };

    var proc = function($container){
      $(options.filtersGroupSelector).find('input[type=checkbox]').each(function(){
        $(this).change(function(){
          var selector = [];
          $(options.filtersGroupSelector).find('input[type=checkbox]').each( function() {
            if ( $(this).is(':checked') ) {
              selector.push( '.' + $(this).val() );
            }
          });
          var items = cache;
          if (selector.length > 0) {
            items = filterItems(selector);
          }
          reload($container,items);
        });
      });
    };

    var procUL = function($container){
      $(options.filtersGroupSelector).children().each(function(){
        $(this).click(function(){
          $(options.filtersGroupSelector).children().removeClass('selected');
          window.location.hash = $(this).data('filter');
          var selector = [];
          selector.push( '.' + $(this).data('filter') );
          $(this).addClass('selected');
          var items = cache;
          if (selector.length > 0) {
            items = filterItems(selector);
          }
          reload($container,items);
        });
      });

      hashFilter($container);
      $(options.filtersGroupSelector).children().removeClass('selected');
      $('.filters li[data-filter='+window.location.hash.replace("#", "")+']').addClass('selected');
    };

    return this.each(function() {
      var $$ = $(this);
      init($$);
      options.selectorType === 'list' ? procUL($$) : proc($$);
    });
};
 

 function initMap() {
	var uluru = {lat: 22.820574, lng: 89.553616};
	var labels = 'W3 Engineers Ltd.';
	
	

	
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: uluru,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#f6f4f1"
				},
				{
					"lightness": 20
				}
			]
		},{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#cfc2a9"
				},
				{
					"lightness": 21
				}
			]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#e4ddd1"
				},
				{
					"lightness": 21
				}
			]
		},{
			"featureType": "transit",
			"elementType": "geometry",
			"stylers": [
				{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#c1b49a"
				},
				{
					"lightness": 18
				},
				{
					"weight": "0.66"
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "geometry",
			"stylers": [
				{
					"color": "#c1b49a"
				},
				{
					"lightness": 16
				}
			]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"color": "#c1b49a"
				},
				{
					"lightness": 17
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [
				{
					"color": "#c1b49a"
				},
				{
					"lightness": 29
				},
				{
					"weight": "0.50"
				}
			]
		},{
					"color": "#f2f2f2"
				},
				{
					"lightness": 19
				}
			]
		},{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dcedf9"
					},
					{
						"lightness": 17
					}
				]
			}
		
		]
	});
	
	
	var marker = new google.maps.Marker({
		position: uluru,
		map: map,
		labelClass: "labels",
		label: {
		  text: labels,
		  fontSize: "18px",
		  fontWeight: "bold"
		},
	});
		
}

function isExists(elem){
	if ($(elem).length > 0) { 
		return true;
	}
	return false;
}

