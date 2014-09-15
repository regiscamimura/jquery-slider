jquery-slider
=============

A slider plugin to convert HTML lists to a slider. 

Usage
=====

$("[selector]").appSlider();

That will turn a list in a slider where each page has 5 items.

Example
=======

<div class="my-slider">
	<ul>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
		<li><img src=[...] /></li>
	</ul>
</div>

<div class="my-slider-footer">
	<a class="my-slider-previous" href="previous"></a>

	Displaying <span class="from">1</span> - <span class="to">...</span> of <span class="count">...</span>

	<a class="my-slider-next" href="next"></a>
</div>

<script>
$(".my-slider").appSlider();
</script>