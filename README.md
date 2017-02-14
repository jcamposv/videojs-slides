# videojs-slides

Plugin to show slides according to the time

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

```sh
npm install --save videojs-slides
```

## Usage

To include videojs-slides on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-slides.min.js"></script>
<script>
  var player = videojs('my-video');
  slides = [{url:'image url',time:9}]
  player.slides(slide);
</script>
```

### Browserify

When using with Browserify, install videojs-slides via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-slides');

var player = videojs('my-video');

player.slides();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-slides'], function(videojs) {
  var player = videojs('my-video');

  player.slides();
});
```

## License

MIT. Copyright (c) Jairo Campos Vargas


[videojs]: http://videojs.com/
