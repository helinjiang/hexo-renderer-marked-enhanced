'use strict';

var marked = require('marked');
var assign = require('object-assign');
var stripIndent = require('strip-indent');
var util = require('hexo-util');
var highlight = util.highlight;
var stripHTML = util.stripHTML;
var MarkedRenderer = marked.Renderer;

function Renderer() {
    MarkedRenderer.apply(this, arguments);

    this._headingId = {};
}

require('util').inherits(Renderer, MarkedRenderer);

// Add id attribute to headings
Renderer.prototype.heading = function(text, level) {
    var id = anchorId(stripHTML(text));
    var headingId = this._headingId;

    // Add a number after id if repeated
    if (headingId[id]) {
        id += '-' + headingId[id]++;
    } else {
        headingId[id] = 1;
    }
    // add headerlink
    return '<h' + level + ' id="' + id + '"><a href="#' + id + '" class="headerlink" title="' + stripHTML(text) + '"></a>' + text + '</h' + level + '>';
};

function anchorId(str) {
    // Add support for Chinese
    return escape(str
        .replace(/\s+/g, '_')
        .replace(/\./g, '-')
        .replace(/-{2,}/g, '-')).replace(/%/g, '_').replace(/^[\-_]+|[\-_]+$/g, '');
}

marked.setOptions({
    langPrefix: '',
    highlight: function(code, lang) {
        return highlight(stripIndent(code), {
            lang: lang,
            gutter: false,
            wrap: false
        });
    }
});

module.exports = function(data, options) {
    // return marked(data.text, assign({
    //    renderer: new Renderer()
    //  }, this.config.marked, options));

    var curRender = new Renderer(),
        markedRenderer = this.markedRenderer;

    // init function
    if (markedRenderer && typeof(markedRenderer.init) == 'function') {
        markedRenderer.init.call(this, data, options);
    }

    // override marked.Render
    if (markedRenderer) {
        curRender = assign(curRender, markedRenderer);
    }

    // get html content
    var html = marked(data.text, assign({
        renderer: curRender
    }, this.config.marked, options));

    // complete function
    if (markedRenderer && typeof(markedRenderer.complete) == 'function') {
        var tmpHtml = markedRenderer.complete.call(this, html);

        if (!tmpHtml) {
            html = tmpHtml;
        }
    }


    return html;

};
