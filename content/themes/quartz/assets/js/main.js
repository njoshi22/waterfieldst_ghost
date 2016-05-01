/**
 * Main JS file for Quartz behaviours
 */

/*globals jQuery, document */
(function ($) {

    $(document).ready(function(){

        /* Variables */
        var win = $(window);
        var posts = $(".home-template .post, .paged .post, .author-template .post, .tag-template .post");
        var headerHeight = $(".site-header").height();
        var isMobile = $(window).width() <= 500;

        /* Trim long post titles */

        if( $(window).width() >= 500 ){
            //only trim on larger screens
            $('.home-template .post-title a').ellipsis({
                lines: 2,           
                ellipClass: 'ellip',
                responsive: true    
            });
        }
        
        $('.widget .title, .featured-posts li:nth-child(1n+2) .title').succinct({
            size: 70 //in characters
        });

        //hide pagination if empty
        if( !$.trim( $('.pagination').html() ).length ) {
            $('.pagination').hide();
        }

        /* Post Template Sidebar */

        if( $('body').hasClass('post-template') ) {
            //get num of widgets in sidebar
            var sidebarItems = $('.post-template .sidebar > .widget').length;

            //remove special styling if user adds addtional widgets
            if( sidebarItems > 3){
                $('.post-template .sidebar .read-next, .post-template .sidebar').addClass('extra-widgets');
            }

            //check if author meta exists
            if( $('.post-template .sidebar .author-meta').length === 0 ) {
                $('.post-template .sidebar .read-next, .post-template .sidebar').addClass('no-author-posts');
            }

            //check if recent posts exists
            if( $('.post-template .sidebar .recent-posts').length === 0 ) {
                $('.post-template .sidebar .read-next, .post-template .sidebar').addClass('no-recent-posts');
            }
        }

        /* Featured Posts Slider */
    
        if( $('body').hasClass('home-template') && $('.slider').length ){
            //get num of sliders
            var numItems = $('.slider > .gallery-cell').length;
            var prevNextButtons;

            //show slider
            var slider = $('.slider').removeClass('is-hidden');
            
            // trigger redraw for transition
            slider[0].offsetHeight;
            
            //use different settings depending on num of items
            if(numItems <= 2){

                //hide arrows depending on num of items
                if(numItems <= 1){
                    slider_nav = false;
                    slider_draggable = false;
                    slider_page_dots = false;
                }else{
                    slider_nav = true;
                    slider_page_dots = true;
                }

                //init slider
                slider.flickity({
                    cellAlign: 'center',
                    contain: true, 
                    wrapAround: slider_wrap_around, 
                    autoPlay: slider_auto_play_speed, 
                    pageDots: slider_page_dots,
                    draggable: slider_draggable,
                    prevNextButtons: slider_nav
                });
                
                //full width
                $('.slider-image, .gallery-cell').css('max-width','100%');
                
                //add wrapper
                $('.slider-image .info').css('padding', '0').wrap('<div class="wrapper">');
                
                //resize gallery
                slider.flickity('resize');
            }else{

                //init slider
                slider.flickity({
                    cellAlign: 'left',
                    contain: true, 
                    wrapAround: slider_wrap_around, 
                    autoPlay: slider_auto_play_speed, 
                    pageDots: true,
                    draggable: slider_draggable,
                    prevNextButtons: slider_nav
                });

            }
        }

        /* Responsive Videos */
        function fitVidInit(){
            $(".post").fitVids();
        }
        
        fitVidInit();

        /* Disqus Comments */
        if(disqus){
            $('.show-comments').on('click', function(){
              var disqus_shortname = disqus;
              var disqus_identifier = '{{post.id}}'; //avoid any issues caused by post URLs changing
            
              //ajax request to load the disqus javascript
              $.ajax({
                      type: "GET",
                      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
                      dataType: "script",
                      cache: true
              });
              //hide the button once comments load
              $(this).fadeOut();
            });
        }else{
            $('.comments').css('display', 'none');
        }
        
        /* Image lightbox */
        if(lightbox == true && !Modernizr.touch){
            $('.post-template .post-content img').each(function (){
                var currentImg = $(this);
                currentImg.wrap("<div class='full-width' >"); //full width images
                currentImg.wrap("<a href='" + currentImg.attr("src") + "' />");
            });
            $('.post-template .post-content a').fluidbox();
        }else{
            $('.post-template .post-content img').each(function (){
                var currentImg = $(this);
                currentImg.wrap("<div class='full-width' >"); //full width images
            });
        }

        /* Infinite Scroll */
        if(infinite_scroll == 'scroll'){

            var ias = $.ias({
                container:  "#main",
                item:       ".post",
                pagination: "#pagination",
                next:       ".older-posts"
            });

            ias.extension(new IASSpinnerExtension()); 
            ias.extension(new IASPagingExtension());
            ias.extension(new IASHistoryExtension());

            ias.on('rendered', function(items) {
                fitVidInit();
            })

        }else if(infinite_scroll == 'click'){

            var ias = $.ias({
                container:  "#main",
                item:       ".post",
                pagination: "#pagination",
                next:       ".older-posts"
            });

            ias.extension(new IASTriggerExtension({
                text: 'Load More Posts',
                html: '<div class="pagination"><a class="load-more-posts">{text} <i class="icon-angle-down"></i></a></div>',
                htmlPrev: " "
            }));

            ias.extension(new IASPagingExtension());
            ias.extension(new IASHistoryExtension());

            ias.on('rendered', function(items) {
                fitVidInit();
            })

        }

        /* Social Media Icons */

        //show icons once JS has loaded
        $(".social-media").css('visibility', 'visible');

        if(facebook_link){
            $(".social-media .facebook").attr("href", facebook_link);
        }else{
            $(".social-media .facebook").css("display", "none");
        }

        if(twitter_link){
            $(".social-media .twitter").attr("href", twitter_link);
        }else{
            $(".social-media .twitter").css("display", "none");
        }

        if(google_plus_link){
            $(".social-media .google-plus").attr("href", google_plus_link);
        }else{
            $(".social-media .google-plus").css("display", "none");
        }

        if(dribbble_link){
            $(".social-media .dribbble").attr("href", dribbble_link);
        }else{
            $(".social-media .dribbble").css("display", "none");
        }

        if(instagram_link){
            $(".social-media .instagram").attr("href", instagram_link);
        }else{
            $(".social-media .instagram").css("display", "none");
        }

        if(tumblr_link){
            $(".social-media .tumblr").attr("href", tumblr_link);
        }else{
            $(".social-media .tumblr").css("display", "none");
        }

        if(youtube_link){
            $(".social-media .youtube").attr("href", youtube_link);
        }else{
            $(".social-media .youtube").css("display", "none");
        }

        if(vimeo_link){
            $(".social-media .vimeo").attr("href", vimeo_link);
        }else{
            $(".social-media .vimeo").css("display", "none");
        }

        if(pinterest_link){
            $(".social-media .pinterest").attr("href", pinterest_link);
        }else{
            $(".social-media .pinterest").css("display", "none");
        }

        if(flickr_link){
            $(".social-media .flickr").attr("href", flickr_link);
        }else{
            $(".social-media .flickr").css("display", "none");
        }

        if(linkedin_link){
            $(".social-media .linkedin").attr("href", linkedin_link);
        }else{
            $(".social-media .linkedin").css("display", "none");
        }

        if(github_link){
            $(".social-media .github").attr("href", github_link);
        }else{
            $(".social-media .github").css("display", "none");
        }

        if(soundcloud_link){
            $(".social-media .soundcloud").attr("href", soundcloud_link);
        }else{
            $(".social-media .soundcloud").css("display", "none");
        }

        if(rss_link == false){
            $(".social-media .rss").css("display", "none");
        }

    });

}(jQuery));