jquery-slider
=============

A slider plugin to convert HTML lists to a slider. 

Usage
=====

$("[selector]").appSlider();

That will turn a list in a slider where each page has 5 items.

Example
=======

&lquo;div class="my-slider"&rquo;
	&lquo;ul&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
		&lquo;li&rquo;&lquo;img src=[...] /&rquo;&lquo;/li&rquo;
	&lquo;/ul&rquo;
&lquo;/div&rquo;

&lquo;div class="my-slider-footer"&rquo;
	&lquo;a class="my-slider-previous" href="previous"&rquo;&lquo;/a&rquo;

	Displaying &lquo;span class="from"&rquo;1&lquo;/span&rquo; - &lquo;span class="to"&rquo;...&lquo;/span&rquo; of &lquo;span class="count"&rquo;...&lquo;/span&rquo;

	&lquo;a class="my-slider-next" href="next"&rquo;&lquo;/a&rquo;
&lquo;/div&rquo;

&lquo;script&rquo;
$(".my-slider").appSlider();
&lquo;/script&rquo;