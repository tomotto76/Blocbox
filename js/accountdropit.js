;(function($) {

    $.fn.acctdropit = function(method) {

        var methods = {

            init : function(options) {
                this.acctdropit.settings = $.extend({}, this.acctdropit.defaults, options);
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.acctdropit.settings;

                    // Hide initial submenus
                    $el.addClass('acctdropit')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('acctdropit-trigger')
                    .find(settings.submenuEl).addClass('acctdropit-submenu').hide();

                    // Open on click
                    $el.off(settings.action).on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        // Close click menu's if clicked again
                        if(settings.action == 'click' && $(this).parents(settings.triggerParentEl).hasClass('acctdropit-open')){
                            settings.beforeHide.call(this);
                            $(this).parents(settings.triggerParentEl).removeClass('acctdropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                            return false;
                        }

                        // Hide open menus
                        settings.beforeHide.call(this);
                        $('.acctdropit-open').removeClass('acctdropit-open').find('.acctdropit-submenu').hide();
                        settings.afterHide.call(this);

                        // Open this menu
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('acctdropit-open').find(settings.submenuEl).show();
                        settings.afterShow.call(this);

                        return false;
                    });

                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.acctdropit-open').removeClass('acctdropit-open').find('.acctdropit-submenu').hide();
                        settings.afterHide.call(this);
                    });

                    // If hover
                    if(settings.action == 'mouseenter'){
                        $el.on('mouseleave', '.acctdropit-open', function(){
                            settings.beforeHide.call(this);
                            $(this).removeClass('acctdropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                        });
                    }

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in acctdropit plugin!');
        }

    };

    $.fn.acctdropit.defaults = {
        action: 'click', // The open action for the trigger
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    };

    $.fn.acctdropit.settings = {};

})(jQuery);





