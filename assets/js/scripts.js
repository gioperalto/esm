/** ********************************************** **
	@Author			Gio Peralto-Pritchard
	@Website		http://web.oneironaut.us
	@Last Update	2:43 PM Thursday, July 10, 2014

	TABLE CONTENTS
	-------------------------------
		01. CAROUSEL IMAGE EFFECTS
*************************************************** **/

var image = $("#carousel-promo").children().children().first().children().children().last().text();
// var scrollSpeed		= 4000;


/** 01. CAROUSEL IMAGE EFFECTS
*************************************************** **/
// $('#carousel-promo').carousel({interval: scrollSpeed});

$(document).ready(function() {
	$("#promo").attr("style","background-image:url('" + image + "')");
});

$("#carousel-promo").on('slide.bs.carousel', function() {
    if($(this).children().children().last().hasClass("active")) {
        image = $(this).children().children().first().children().children().last().text();

        console.log('Last ' + image);

        $("#promo").attr("style","background-image:url('" + image + "')")
        .animate({opacity:'0.5'},1000).animate({opacity:'1.0'},1000);   
    } else if($(this).children().children().hasClass("active")) {
    	image = $(".item.active").next().children().children().last().text();

    	console.log('Not last ' + image);

        $("#promo").attr("style","background-image:url('" + image + "')")
        .animate({opacity:'0.5'},1000).animate({opacity:'1.0'},1000);
    }
});