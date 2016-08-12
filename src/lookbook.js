;(function(global, $) {
  'use strict';

  var defaults = {
    imagePosition: '100% 0%',
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
      var image = $el.clone(),
          lbHTML = this._lookbookHTML(image);
       $el.replaceWith(lbHTML);
       $('.lb-container .focal-point').popover({trigger: 'hover'});
    },

    _lookbookHTML: function ($image) {
      var div = '<div class="' + this.options['class'] + '" style="position: relative"></div>',
          base = $(div).append($image);
      return base.append(this._generateFocalPoints($image));
    },

    _generateFocalPoints: function($image) {
      var points = $image.data('lookbook-points'),
          pointsArr = [],
          pointsHTML;

      for(var i = 0; i < points.length; i++) {
        var fp = new Lookbook.FocalPoint(points[i], this.options);
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

  Lookbook.FocalPoint = function(point, options) {
    var styleRule = this._styleRule,
        styles = '',
        fullElement = '';
    styles += styleRule('position', 'absolute');
    styles += styleRule('height', options.point.height);
    styles += styleRule('width', options.point.width);
    styles += styleRule('border-radius', options.point.borderRadius);
    styles += styleRule('background-color', options.point.backgroundColor);
    styles += styleRule('left', point.posX + 'px');
    styles += styleRule('top', point.posY + 'px');
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
