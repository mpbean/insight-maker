/*

Copyright 2010-2011 Give Team. All rights reserved.

Give Team is a non-profit organization dedicated to
using the internet to encourage giving and greater
understanding.

This file may distributed and/or modified under the
terms of the Insight Maker Public License.

Insight Maker and Give Team are trademarks.

*/

Ext.onReady(function() {
    setTimeout(function() {
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({
            remove: true
        });
    },
    250);
});

function replace_html(el, html) {
    if (el) {
        var oldEl = (typeof el === "string" ? document.getElementById(el) : el);
        var newEl = document.createElement(oldEl.nodeName);

        // Preserve any properties we care about (id and class in this example)
        newEl.id = oldEl.id;
        newEl.className = oldEl.className;

        //set the new HTML and insert back into the DOM
        newEl.innerHTML = html;
        if (oldEl.parentNode)
        oldEl.parentNode.replaceChild(newEl, oldEl);
        else
        oldEl.innerHTML = html;

        //return a reference to the new element in case we need it
        return newEl;
    }
};

function toggle_toolbar() {
    var toolbar = ribbonPanel.getDockedItems()[0];
    if (!toolbar.isVisible()) {
        toolbar.show();
		Ext.get("toolbarToggle").update("&uarr;");
		ribbonPanel.doComponentLayout();
    } else {
        toolbar.hide();
		Ext.get("toolbarToggle").update("&darr;");
		ribbonPanel.doComponentLayout();
    }
    ribbonPanel.doLayout();

}

function setTopLinks() {
    var links = "";
    if (drupal_node_ID == -1) {
        links = '<div style="float:right;padding:0.2em;"><nobr><a href="http://InsightMaker.com/help" target="_blank">Help</a> | <a href="http://InsightMaker.com/directory" target="_blank">Find More Insights</a> | <a href="javascript:toggle_toolbar()">&uarr;</a></nobr></div>';
    } else {
        if (is_editor) {
            links = '<div style="float:left;padding:0.2em;">';
            links = links + '<a href="http://InsightMaker.com/node/' + drupal_node_ID + '/edit" target="_blank">Edit Insight Properties</a> | ';
            if (editLocation == 'graph') {
                links = links + '<a href="http://InsightMaker.com/insight/' + drupal_node_ID + '/view" target="_blank">Edit Insight User Interface</a>';
            } else {
                links = links + '<a href="http://InsightMaker.com/insight/' + drupal_node_ID + '/" target="_blank">Edit Insight Model</a>';
            }
            links = links + ' | <a href="http://InsightMaker.com/node/' + drupal_node_ID + '" target="_blank">Insight Discussion</a></div></div> ';
        } else {
            links = links + '<div style="float:left;padding:0.2em;">';
            if (!is_embed) {
                links = links + '<a href="http://InsightMaker.com/node/' + drupal_node_ID + '/" target="_blank">Insight Properties</a> | ';
            }
            links = links + '<a href="http://InsightMaker.com/node/' + drupal_node_ID + '" target="_blank">Insight Discussion</a></div>';
        }
        links = links + '<div style="float:right;padding:0.2em;"><nobr>';
        if (is_embed) {
            links = links + '<a target="_blank" href="http://InsightMaker.com/insight/' + drupal_node_ID + '">Full Screen Insight</a> | ';
        } else {
            links = links + '<a target="_blank" href="http://InsightMaker.com/insight/">Make a New Insight</a> | ';
            links = links + '<a target="_blank" href="http://InsightMaker.com/node/' + drupal_node_ID + '/clone">Duplicate Insight</a> | ';
        }
        links = links + '<a href="http://InsightMaker.com/help" target="_blank">Help</a> | <a href="http://InsightMaker.com/directory" target="_blank">Find More Insights</a> | <a href="javascript:toggle_toolbar()" id="toolbarToggle">&uarr;</a></nobr></div>';
    }
    replace_html(document.getElementById("toplinks-holder"), links);
}

