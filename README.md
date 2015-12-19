# hexo-renderer-marked-enhanced

[![Build Status](https://travis-ci.org/hexojs/hexo-renderer-marked-enhanced.svg?branch=master)](https://travis-ci.org/hexojs/hexo-renderer-marked-enhanced)  [![NPM version](https://badge.fury.io/js/hexo-renderer-marked-enhanced.svg)](http://badge.fury.io/js/hexo-renderer-marked-enhanced) [![Coverage Status](https://img.shields.io/coveralls/hexojs/hexo-renderer-marked-enhanced.svg)](https://coveralls.io/r/hexojs/hexo-renderer-marked-enhanced?branch=master)

Add support for [Markdown]. This plugin uses [marked] as render engine. Forked [hexo-renderer-marked] and enables theme developer to have more options when using [marked] to generate HTML from markdown.

## Installation

``` bash
$ npm install hexo-renderer-marked-enhanced --save
```

- Hexo 3: >= 0.2
- Hexo 2: 0.1.x

## Override Marked Renderer
Different from [hexo-renderer-marked], you can override [marked] Renderer within a Hexo theme script:

```javascript
hexo.markedRenderer = {
    init: function() {
        console.log("hexo.markedRenderer init!");
        // Called before rendering 
    },
    complete: function(html) {
        console.log("hexo.markedRenderer complete!");
        // Called after rendered
        
        // Deal with html here ...
        
        return html;
    },
    heading: function(text, level) {
        // Default method can be accessed via: 
        // this._super.heading(text, level) 
        return "Your custom heading format"
    }
};
```

You can save it in a script file(for example: marked-renderer.js), and put it in scripts folder of theme:
```
-[your project]
	|
    themes
        |
        [your theme]
            |
            scripts
                |
                marked-renderer.js

```

For more information on how to override marked renderer, see [here](https://github.com/chjj/marked#overriding-renderer-methods).

Besides we add two method which will be very helpful:

- `init`: function(data, options), called before rendering. The `data.text` is initial markdown text, and `data.path` is it's file path. `options` can config `gfm` , `pedantic` , `sanitize` , `tables` , `breaks` , `smartLists` , `smartypants`, but we recomment you config it in _config.yml.
- `complete`: function(html), called after rendered. The `html` is generated HTML code from markdown text, so if you want to do more with the HTML code result, just change it free and return it!


## Options

You can configure this plugin in `_config.yml`.

``` yaml
marked:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
```

- **gfm** - Enables [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown)
- **pedantic** - Conform to obscure parts of `markdown.pl` as much as possible. Don't fix any of the original markdown bugs or poor behavior.
- **sanitize** - Sanitize the output. Ignore any HTML that has been input.
- **tables** - Enable GFM [tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables). This option requires the `gfm` option to be true.
- **breaks** - Enable GFM [line breaks](https://help.github.com/articles/github-flavored-markdown#newlines). This option requires the `gfm` option to be true.
- **smartLists** - Use smarter list behavior than the original markdown.
- **smartypants** - Use "smart" typograhic punctuation for things like quotes and dashes.

[Markdown]: http://daringfireball.net/projects/markdown/
[marked]: https://github.com/chjj/marked
[hexo-renderer-marked]:(https://github.com/hexojs/hexo-renderer-marked)