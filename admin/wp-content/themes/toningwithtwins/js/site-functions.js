jQuery(document).ready(function ($) {
  /*
   * EXTERNAL LINKS
   *
   * Open external links in new window
   */
  $('a').not($('a[href^="mailto"], a[href^="tel"]')).each(function() {
    var a = new RegExp('/' + window.location.host + '/');
    var ext = this.pathname.substr(this.pathname.lastIndexOf('.') + 1);

    if(!a.test(this.href) || ext == "pdf") {
      $(this).click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        window.open(this.href, '_blank');
      });
    }
  });

  /*
   * EVENT TRACKING - GOOGLE ANALYTICS
   */

  // Track Outbound Links
  var trackOutboundLinks = function(url) {
    gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': url,
      'transport_type': 'beacon'
    });
  }
  var externalLink = new RegExp('/' + window.location.host + '/');
  $('a').click(function() {
    if(!externalLink.test(this.href)) {
      $(this).click(trackOutboundLinks(this.href));

      var data = {
        'outboundLink' : this.href,
      }

      console.log(data);
    }
  });

  // Track on-site search queries
  var trackSearchQueries = function(search_term) {
    gtag('event', 'search', {
      'event_category': 'engagement',
      'event_label': search_term
    });
  }

  $('.search-form').submit(function(e) {
    trackSearchQueries( $('.search-form input[type="search"]').val() );

    var data = {
      'searchQuery' : $('.search-form input[type="search"]').val(),
    }
  });

  /*
   * SMOOTH SCROLL
   *
   * NOTE: Conflicts with WooCommerce tabs
   */
  $('a[href*="#"]:not([href="#"])').not($('.woocommerce a[href*="#"]')).click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
      $('html,body').stop().animate({
        scrollTop: $target.offset().top - 150
      }, 1000);
      return false;
      }
    }
  });
});