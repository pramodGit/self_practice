define(function(){
    function prSlider(appliedDiv, liWidth, totalW, totalLI, scrollCount, auto) {
        var scrollwidth = liWidth * scrollCount,
            lastIMG = '-'+(totalW - scrollwidth),
            interval,
            slideClick = scrollCount;
            appliedDiv.find('#carousel').css('width',totalW);
        if(auto == 'true' || auto == undefined){
            // Interval
            interval = setInterval(function(){
                appliedDiv.find('.btnNext').click();
            },7000);
            // Pause on mouse enter
            appliedDiv.bind('mouseenter', function(){
                clearInterval(interval);
                interval = null;
            });
            // Set Interval back on mouse leave
            appliedDiv.bind('mouseleave', function(){
                interval = setInterval(function(){
                    appliedDiv.find('.btnNext').click();
                },7000);
            })
        }
        // Previous Click
        appliedDiv.find('.btnPrev').on("click", function(event){
            event.preventDefault();
            if(slideClick > scrollCount){
                appliedDiv.find('#carousel').animate({
                    left:'+='+scrollwidth
                },800);
                slideClick = slideClick - scrollCount;
            }
            else if(slideClick == scrollCount){
                appliedDiv.find('#carousel').animate({
                    left:lastIMG
                },1000);
                slideClick = totalLI;
            }
        });
        // Next Click
        appliedDiv.find('.btnNext').on("click", function(event){
            event.preventDefault();
            if(slideClick < totalLI){
                appliedDiv.find('#carousel').animate({
                    left:'-='+scrollwidth
                },800);
                slideClick = slideClick + scrollCount;
            }
            else if(slideClick == totalLI){
                appliedDiv.find('#carousel').animate({
                    left:'0'
                },1000);
                slideClick = scrollCount;
            }
        });
    }
    return {
        slider:prSlider
    };
});