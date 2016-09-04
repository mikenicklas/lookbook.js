/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	;(function(global, $) {
	  'use strict';

	  var defaults = {
	    imagePosition: '100% 0%',
	    trigger: 'hover',
	    'class': 'lb-container',
	    point: {
	      height: '30px',
	      width: '30px',
	      backgroundColor: '#000',
	      borderRadius: '50%',
	      'class': 'focal-point'},
	    animation: {
	      startColor: 'rgba(255, 255, 255, .5)',
	      endColor: 'rgba(0, 0, 0, 0.0)',
	      duration: '2s'
	    }
	  };

	  var Lookbook = function(selector, opts) {
	    this.options = $.extend(true, {}, defaults, opts);
	    for(var i = 0; i < selector.length; i++) {
	      var $el = $(selector[i]);
	      this.createLookbook($el);
	    }
	    this._appendStyles();
	  };

	  Lookbook.prototype = {
	    createLookbook: function ($el) {
	      this.dimensions = {height: $el.height(), width: $el.width()};
	      var image = $el.clone(),
	          lbHTML = this._lookbookHTML(image);
	      $el.replaceWith(lbHTML);
	      $('.lb-container .focal-point').popover({trigger: this.options.trigger});
	    },

	    _lookbookHTML: function ($image) {
	      var div = '<div class="' + this.options['class'] + '" style="position: relative; display: inline-block;"></div>',
	          base = $(div).append($image);
	      return base.append(this._generateFocalPoints($image));
	    },

	    _generateFocalPoints: function($image) {
	      var points = $image.data('lookbook-points'),
	          lookbook = this,
	          pointsArr = [];
	      for(var i = 0; i < points.length; i++) {
	        var fp = new Lookbook.FocalPoint(points[i], this.options, lookbook);
	        pointsArr.push(fp);
	      }

	      return this._buildFocalPointHTML(pointsArr);
	    },

	    _buildFocalPointHTML: function(arr) {
	      var html = '';
	      for(var i = 0; i < arr.length; i++) {
	        html += arr[i].html;
	      }
	      return html;
	    },

	    _appendStyles: function() {
	      var styles = this._animationStyleEl(this.options),
	          fullElement = this._styleWrap(styles);
	      $('head').append(fullElement);
	    },

	    _animationStyleEl: function(opts) {
	      var base = '.lb-container .focal-point {animation: focalPoint {{duration}} infinite ease-out;}'
	      base += '@keyframes focalPoint {0% {box-shadow: 0px 0px 0px 0px {{animationStartColor}};}'
	      base += '100% {box-shadow: 0px 0px 0px 10px {{animationEndColor}};}}';
	      return base.replace('{{duration}}', opts.animation.duration)
	          .replace('{{animationStartColor}}', opts.animation.startColor)
	          .replace('{{animationEndColor}}', opts.animation.endColor);
	    },

	    _styleWrap: function(styleStr) {
	      return '<style class="lb-style">' + styleStr +'</style>'
	    }
	  };

	  Lookbook.FocalPoint = function(point, options, lookbook) {
	    var styleRule = this._styleRule,
	        styles = '',
	        fullElement = '';
	    point.posX = (point.posX / lookbook.dimensions.width) * 100;
	    point.posY = (point.posY / lookbook.dimensions.height) * 100;
	    styles += styleRule('position', 'absolute');
	    styles += styleRule('height', options.point.height);
	    styles += styleRule('width', options.point.width);
	    styles += styleRule('border-radius', options.point.borderRadius);
	    styles += styleRule('background-color', options.point.backgroundColor);
	    styles += styleRule('left', point.posX + '%');
	    styles += styleRule('top', point.posY + '%');
	    fullElement = '<button type="button" class="btn ' + options.point['class'] + '" style="';
	    fullElement += styles + '" title="' + point.title + '" data-toggle="popover" data-content="';
	    fullElement += point.description + '" data-placement="top"></button>';
	    this.html = fullElement;
	  };

	  Lookbook.FocalPoint.prototype = {
	    _styleRule: function(attr, val) {
	      return attr + ':' + val + ';';
	    }
	  }

	  $.fn.lookbook = function(opts) {
	    var opts = opts || {};
	    var lb = new Lookbook(this, opts);
	  };

	})(window, $);


/***/ }
/******/ ]);