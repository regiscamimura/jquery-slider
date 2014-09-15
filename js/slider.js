var slider_current_page = {};

var APP = (function(app, $) {
	
	var slider = app.slider = app.slider || {};
	
	// constructor
	function Slider(selector, settings)
	{
        // default settings
		var settings = settings || {};
		
		settings.pagesize =  settings.pagesize || 5;   // number of items per page
		settings.animate = settings.animate || {};   // options for jQuery "animate" for previous / next
		settings.animate = settings.animate || {};   // options for jQuery "animate" for previous / next
		settings.show = settings.show || '.selected';   // selector of item to start displaying
		settings.previous = settings.previous || '.my-slider-previous';
		settings.next = settings.next || '.my-slider-next';
		settings.status = settings.status || '.my-slider-footer';
		settings.forceHeight = settings.forceHeight || true;
	
		// object properties
		var that = this;
        that.settings = settings;
        that.$wrapper = $(selector).eq(0);

       	$('.my-slider-group > li', that.$wrapper).unwrap();
		
		if (!that.$wrapper.attr('data-app-slider-id')) that.$wrapper.attr('data-app-slider-id', parseInt(parseInt(new Date().getTime())*Math.random()));
		var app_slider_id = that.$wrapper.attr('data-app-slider-id');
        that.$wrapper = $('[data-app-slider-id='+app_slider_id+']').eq(0);
        if (slider_current_page[app_slider_id] == undefined) {
			slider_current_page[app_slider_id] = 1;
		}
		
		that.$belt = that.$wrapper.children().eq(0);
		that.$items = that.$belt.children('li').not('.filtered');
		
		// TODO: improve these binding mechanisms
		that.$previous = that.$wrapper.parent().find(that.settings.previous);
        that.$next = that.$wrapper.parent().find(that.settings.next);

       	that.$status = that.$wrapper.parent().find(that.settings.status);

        // give access to the instance through jQuery data
		that.$wrapper.data('slider', that);
		that.$wrapper.find('.empty').remove();
		if (that.$items.length == 0) {
			that.update_status();
			that.unset_slider();
            return false;
        }
		
		that.pages = Math.ceil(that.$items.length / that.settings.pagesize);
		that.page_width = that.$wrapper.innerWidth();
		that.item_width = Math.floor(that.page_width / that.settings.pagesize);
		
		slider_current_page[app_slider_id] = Math.min(slider_current_page[app_slider_id], Math.ceil(that.$items.length/that.settings.pagesize));
		that.current = slider_current_page[app_slider_id];		
				
        var initial_position = Math.min((that.current - 1) * that.page_width * -1, 1);		
		
		that.$previous.off('click').on('click', function(e){
			e.preventDefault();
			that.previous();
			return false;
		});
		
		that.$next.off('click').on('click', function(e){
			e.preventDefault();
			that.next();
			return false;
		});
		
		// TODO: make it dynamic instead of the static value of 5 -- meaning the default is to have up to 5 fitting in a single line
		if (that.settings.forceHeight) {
			that.$wrapper.css('height', parseInt(that.$wrapper.css('min-height'))  * (that.settings.pagesize/5))
		}
		else if (!(Math.floor(that.$items.length / 5) < 1)) {
			that.$wrapper.css('height', parseInt(that.$wrapper.css('min-height'))  * (that.settings.pagesize/5))
		}
		
		that.$belt.css('position', 'relative');
		
		for (var i = 0; i <= that.$items.length; i = i+that.settings.pagesize) {
			var group = $('<div class="my-slider-group"></div>').css({'width': that.page_width , 'float': 'left', 'visibility': 'hidden'});
			that.$items.slice(i,i+that.settings.pagesize).wrapAll(group);
		}
		that.$belt.find('.my-slider-group').eq(0).css('visibility', 'visible').trigger('slide.visible');

		
		if (that.$wrapper.hasClass('app-slider')) {	
			that.$wrapper.trigger('reset');
			that.update_status();
			that.$belt.css({
				'width': that.page_width * that.pages
			});
			that.$belt.animate({left: initial_position + 'px'});
			return false;
		}
		
		// CSS styles for the main wrapper
		that.$wrapper.css({
			'position': 'relative'
		}).addClass('app-slider');
		
		// CSS styles for the items container
		that.$belt.css({
			'top': '0px',
			'left': initial_position + 'px',
			'width': that.page_width * that.pages
		});
		
		var position = that.$wrapper.position();		
		
		that.update_status();		
		
	}
	
    Slider.prototype.unset_slider = function() 
    {
        var that = this;
        that.$wrapper.addClass('empty_listing').append('<div class="notice empty">No items found.</div>');
				
		return false;
    }
    
	Slider.prototype.update_status = function()
	{		
		var that = this;
		that.$wrapper.find('.empty').remove();
		if (that.$items.length == 0) {
			$('span.from', that.$status).text(0);
			$('span.to', that.$status).text(0);
			$('span.count', that.$status).text(0);
			that.$previous.hide();
			that.$next.hide();
		}
		else {
			//console.log(that.pages);
			$('span.from', that.$status).text(1 + ((that.current - 1) * that.settings.pagesize));
			$('span.to', that.$status).text(Math.min(that.current * that.settings.pagesize, that.$items.length));
			$('span.count', that.$status).text(that.$items.length);
			
			if (that.current <= 1) that.$previous.hide(); 
			else that.$previous.css('display', 'inline-block'); 
			
			if (that.current >= that.pages) that.$next.hide(); 
			else that.$next.css('display', 'inline-block');
				
		}
        that.$status.show();
       
	};
	
	Slider.prototype.move_to = function(item_id, options)
	{
		var that = this;
		var item_index = that.$wrapper.find('.my-slider-group:has(li[data-item_id="'+item_id+'"])').index();
		
		if (item_index == -1) return false;
		
		var move_to = Math.ceil((item_index+1)*5/that.settings.pagesize);
		if (that.current == move_to) return false;
		if (that.current > move_to) direction = 'previous';
		else direction = 'next';
		
		move_to = Math.abs(move_to - that.current);
		
		options  = options  || that.settings.animate;
		
		that.$belt.animate({
			left: (direction == 'next' ? '-' : '+') + '=' + that.page_width*move_to + 'px'
		}, options);
		
		that.current += (direction == 'next' ? move_to : -1*move_to) * 1;
        slider_current_page[that.$wrapper.attr('data-app-slider-id')] = that.current;        
		
		that.update_status();
		
		return that;
	}
	
	Slider.prototype.previous = function(options)
	{
		return this.move('previous', options);
	};
	
	Slider.prototype.next = function(options)
	{
		return this.move('next', options);
	};
	
	Slider.prototype.move = function(direction, options)
	{
		var that = this;
		
		direction = direction || 'next';
		options   = options   || that.settings.animate;
		
		//$('#video_listing_hidden').scrollTop(-100);
		// move to new position
		that.$belt.animate({
			left: (direction == 'next' ? '-' : '+') + '=' + that.page_width + 'px'
		}, options);
		
		that.current += (direction == 'next' ? 1 : -1) * 1;
        slider_current_page[that.$wrapper.attr('data-app-slider-id')] = that.current; 

        that.$belt.find('.my-slider-group').eq(that.current - 1).css('visibility', 'visible').trigger('slide.visible');       
		
        that.$wrapper.trigger("slide");

		that.update_status();
		
		return that;
	};
	
	// expose constructor to outside
	slider.create = function(selector, settings)
	{
		return new Slider(selector, settings);
	};
	
	// expose class to outside
	slider.Slider = Slider;
	
	//jQuery plugin
	$.fn.appSlider = function(settings)
	{
		// install slider for each entry in jQuery object
		return this.each(function() {
			new Slider(this, settings);
		});
	};
	
	return app;
	
}(APP || {}, $));