Olly's very simple accordion plugin
===================================

To use, make content that looks like this:

    <div class="accordion">
        <h3>Section title</h3>
        <div>Section content</div>
        <h3>Section title</h3>
        <div>Section content</div>
        [etc]
    </div>

Then use ```$("div.accordion").ohAccordion()``` in ```document.ready()```.

* By default, first branch is opened.
* Supports bookmarking, e.g. ```this.aspx#expander01```
* A class of closed on the top div means no branches are open by default (unless specified in the URI), e.g. ```<div class="accordion closed"```>
* The script will automatically add ID attributes to the divs if they don't already have them, e.g. ```#expander01```.
* When open, the ```<h3>``` elements gain ```class="open"```

It's best to style it so it looks good even if the nodes are open, just in case javascript is unavailable for some reason.