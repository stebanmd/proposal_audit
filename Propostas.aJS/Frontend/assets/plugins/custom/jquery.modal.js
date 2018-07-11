/*
 * jQuery Modal Plugin 1.0
 * Free to use under the MIT license.
 * Based on jQuery Reveal Plugin 1.0
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

/*---------------------------
 Defaults for Reveal
----------------------------*/

/*---------------------------
 Listener for data-reveal-id attributes
----------------------------*/

	$('body').on('click','[data-modal-id]', function(e) {
		if(!$(this).hasClass("modal-not-preventDefault")){
			e.preventDefault();
		}

		var hasOpened;

		$('.modal').each(function(){

			if($(this).css('display') == 'block'){
				hasOpened = $(this);
			}

		});

		var delay = 0;

		if(hasOpened){
			delay = 0.8;
			$(this).trigger('modal:swap');
		}

		var modalLocation = $(this).attr('data-modal-id');
		var data = $(this).data();
		TweenMax.delayedCall(delay, function(){
			$('#'+modalLocation).modal(data);
		});
	});

/*---------------------------
 Extend and Execute
----------------------------*/

    $.fn.modal = function(options) {


        var defaults = {
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-modal' //the class of a button or element that will close an open modal
    	};

      //Extend dem' options
      var options = $.extend({}, defaults, options);

      return this.each(function() {

/*---------------------------
 Global Variables
----------------------------*/
        	var modal = $(this),
        		topMeasure  = parseInt(modal.css('top')),
						topOffset = modal.height() + topMeasure,
          	locked = false,
						modalBG = $('.modal-bg');

/*---------------------------
 Create Modal BG
----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="modal-bg" />').insertAfter(modal);
			}

/*---------------------------
 Open & Close Animations
----------------------------*/
			//Entrance Animations
			var posCenter;
			var modalParent;

			modal.bind('modal:open', function () {
			  modalBG.unbind('click.modalEvent');
				$('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {

						modal.css({'opacity' : 0, 'display' : 'block'});

						if(modal.data().overflow === 'body'){
							$('body').addClass('overflow-body');
							$('body').append('<div class="modal-scroll"></div>');

							modalParent = modal.parent();

							$('.modal-scroll').height($(window).height());

							$('.modal-scroll').append(modal);

							posCenter = 0;
						} else {

							posCenter = Math.max(($(window).height() / 2), (modal.outerHeight() / 2)) - Math.min(($(window).height() / 2), (modal.outerHeight() / 2));

						}


						modal.css('top', -(modal.outerHeight()) + 'px');

						modalBG.css('display','block');

						TweenMax.to(modalBG, 0.8, {autoAlpha:1, ease:Quint.easeOut});
						TweenMax.to(modal, 0.8, {autoAlpha:1, top:posCenter, ease:Quint.easeOut, onComplete:function(){
							$('body').css('overflow', 'hidden');
							unlockModal();
						}});

					}
				}
				modal.unbind('modal:open');
			});

			//Closing Animation
			modal.bind('modal:close', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {



						if(modal.find('video').length > 0){

							modal.find('video').each(function(){
								$(this)[0].pause();
							});

						}

						TweenMax.to(modalBG, 1, {delay:0.2, autoAlpha:0, ease:Quint.easeOut, onComplete:function(){
							modalBG.css('display','none');
						}});
						TweenMax.to(modal, 0.6, {autoAlpha:0, top:-(modal.outerHeight()), ease:Quint.easeOut, onComplete:function(){
							$('body').css('overflow', 'visible');
							modal.css({'display' : 'none'});
							unlockModal();

							if(modal.data().overflow === 'body'){
								$('body').removeClass('overflow-body');

								modalParent.append(modal);

								$('body').find('.modal-scroll').remove();
							}

						}});

						/*
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  -(modal.outerHeight()) + 'px',
							"opacity" : 0
						}, 400, function() {
							//modal.css({'top':topMeasure, 'opacity' : 1, 'display' : 'none'});
							unlockModal();
						});
						*/
					}
				}
				modal.unbind('modal:close');
			});

			//Closing Animation
			modal.bind('modal:swap', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {

						if(modal.find('video').length > 0){

							modal.find('video').each(function(){
								$(this)[0].pause();
							});

						}

						TweenMax.to(modal, 0.6, {autoAlpha:0, top:-(modal.outerHeight()), ease:Quint.easeOut, onComplete:function(){
							$('body').css('overflow', 'visible');
							modal.css({'display' : 'none'});
							unlockModal();
						}});

						/*
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  -(modal.outerHeight()) + 'px',
							"opacity" : 0
						}, 400, function() {
							//modal.css({'top':topMeasure, 'opacity' : 1, 'display' : 'none'});
							unlockModal();
						});
						*/
					}
				}
				modal.unbind('modal:swap');
			});

/*---------------------------
 Open and add Closing Listeners
----------------------------*/
        	//Open Modal Immediately
    	modal.trigger('modal:open')

			//Close Modal Listeners
			var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
			  modal.trigger('modal:close')
			});

			if(options.closeonbackgroundclick) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
				  modal.trigger('modal:close')
				});
			}
			$('body').keyup(function(e) {
      	if(e.which===27){ modal.trigger('modal:close'); } // 27 is the keycode for the Escape key
			});

/*---------------------------
 Animations Locks
----------------------------*/
			function unlockModal() {
				locked = false;
			}
			function lockModal() {
				locked = true;
			}

        });//each call
    }//orbit plugin call
})(jQuery);

