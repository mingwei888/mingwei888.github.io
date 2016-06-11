/**
 * Created by EGS on 15-5-6.
 */

$(function(){
initGoToTop();
});


function initGoToTop() {
    jQuery(function() {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 100) {
                jQuery("#backtotop").addClass("showme")
            } else {
                jQuery("#backtotop").removeClass("showme")
            }
        });
        jQuery("#backtotop").click(function() {
            jQuery("body,html").animate({scrollTop: 0}, 400);
            return false
        })
    });
    if (jQuery(window).scrollTop() == 0) {
        jQuery("#backtotop").removeClass("showme")
    } else {
        jQuery("#backtotop").addClass("showme")
    }
}