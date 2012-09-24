/*
    OLLY'S VERY SIMPLE ACCORDION PLUGIN

    To use, make content that looks like this:

    <div class="accordion [closed]">
        <h3>Section title</h3>
        <div>Section content</div>
        <h3>Section title</h3>
        <div>Section content</div>
        [etc]
    </div>

    Then use $("div.accordion").ohAccordion() in document.ready().

    * By default, first branch is opened.
    * Supports bookmarking, e.g. this.aspx#expander01
    * A class of closed on the top div means no branches are
      open by default, unless specced in the URI.
    * The script will automatically add IDs to the divs if they
      don't already have them, e.g. #expander01/02/03/etc.
    * When open, the <h3> elements gain class="open"

    It's best to style it so it looks good even if the nodes are
    open, just in case javascript is unavailable for some reason.
*/
(function( $ ) {

    var methods = {
        /*  Init is fired on page load */
        init : function() {

            this.each(function(i,elm) {

                $(elm).addClass("accordion-js");

                /*  Cache this so we don't need to look it up over and over again */
                var winLocHash = window.location.hash;

                $(elm).children("h3").each(function (j) {
                    var relatedDiv, divId, aHref, parentClosed;

                    relatedDiv = $(this).next();
                    divId = relatedDiv.attr("id")
                    /*  Give the div an ID! */
                    if (divId === undefined || divId === '') {
                        divId = "expander" + i + j;
                        relatedDiv.attr("id", divId);
                    }
                    aHref = "#" + divId;

                    /*  If div.accordion is div.closed, close everything! */
                    if ($(elm).hasClass("closed")) {
                        parentClosed = true;
                    } else {
                        parentClosed = false;
                    }

                    /*  Figure out which node to open
                        1. See if there's a bookmark to open, using winLocHash
                        2. If not, open the first node, unless parentClosed === true.
                    */
                    if (winLocHash === undefined || winLocHash === '') {
                        if (j === 0 && parentClosed === false) {
                            winLocHash = aHref;
                        }
                    }
                    /*  Open the bookmarked/first node accordingly, close the others */
                    if (aHref === winLocHash) {
                        $(this).addClass("open");
                        $(this).wrapInner("<a href=" + aHref + " title='Close this section'></a>");
                    } else {
                        $(this).wrapInner("<a href=" + aHref + " title='Expand this section'></a>");
                        relatedDiv.hide();
                    }
                    /*  Add the click event to the links */
                    $(this).children("a").click(function () {
                        $(this).parent().ohAccordion("toggle");
                        return false;
                    });
                });
            });
        },
        /*  This is fired by clicking on the titles */
        toggle : function() {
            if (this.hasClass("open")) {
                this.removeClass("open").next().hide(300);
                this.children("a").attr("title", "Expand this section");
            } else {
                this.parent().children("div").not(this.next()).hide(300);
                this.next().show(300);
                this.parent().children("h3").not(this).removeClass("open");
                this.addClass("open");
                this.parent().children("h3").not(this).children("a").attr("title", "Expand this section");
                this.children("a").attr("title", "Close this section");
            }
            this.children("a").blur();
        }
    };

    $.fn.ohAccordion = function( method ) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.ohAccordion');
        }
    };

})(jQuery);