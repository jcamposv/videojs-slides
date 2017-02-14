import videojs from 'video.js';

// Default options for the plugin.
const defaults = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
class videoSlides{
  constructor(items) {
    this.slides = document.createElement('ul');
    this.slidesItems = items;
    this.oldTime = 0;
    this.appendSlider();
  }
  appendSlider() {
    // Get control bar element
    let controlBar = document.getElementsByClassName('vjs-control-bar')[0].parentNode;
    // Add slide list className
    this.slides.className = 'video-slides';
    // Append new video slides before control bar
    controlBar.insertBefore(this.slides, document.getElementsByClassName('vjs-control-bar')[0]);
    this.appendSliderItem();
  }
  appendSliderItem() {
     for(var i = 0; i <= this.slidesItems.length - 1; i++){
       // Create an image and li tag
       let img = document.createElement('img');
       let li = document.createElement('li');
       // Added src and Class name
       img.src = this.slidesItems[i].url;
       li.className = 'slide_'+this.slidesItems[i].time;
       // Append image into li
       li.appendChild(img);
       // Append li into ul list
       this.slides.appendChild(li);
     }
  }
  slideShow(time) {
     const currentTime = Math.floor( time );
     for(var i = 0; i <= this.slidesItems.length - 1; i++){
       if( currentTime === this.slidesItems[i].time && this.oldTime !== currentTime ){
        let firstItem = ( i === 0 ) ? 0 : 1;
        let beforeSlide = document.getElementsByClassName( 'slide_'  + this.slidesItems[i - firstItem].time )[0];
        let currentSlide = document.getElementsByClassName( 'slide_'  + this.slidesItems[i].time )[0];
        beforeSlide.style.display = 'none';
        currentSlide.style.display = 'block';
        this.oldTime = currentTime;
        return false;
      }
    }
  }
 }
const onPlayerReady = (player, options) => {
  player.addClass('vjs-slides');
  const slides = new videoSlides(options.slides);
  player.on('timeupdate', function(){
    slides.slideShow(this.currentTime());
  });
};

/**
 * A video.js plugin.
 *
 * @function slides
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const slides = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('slides', slides);

// Include the version number.
slides.VERSION = '__VERSION__';

export default slides;
