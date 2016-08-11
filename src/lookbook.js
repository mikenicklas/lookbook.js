'use strict';

(function(global, $) {
  var defaults = {
    imagePosition: '100% 0%',
    point: {
      height: '30px',
      width: '30px',
      backgroundColor: '#000',
      borderRadius: '50%',
      animationStartColor: 'rgba(255, 255, 255, .5)',
      animationEndColor: 'rgba(0, 0, 0, 0.0)'
    }
  }

  var Lookbook = function(selector, opts) {
    this.options = $.extend(true, {}, defaults, opts);
    for(var i = 0; i < selector.length; i++) {
      var $el = $(selector[i]);
      this.createLookbook($el);
    }
  };

  Lookbook.prototype = {
    createLookbook: function ($el) {
      var image = $el.clone(),
          lbHTML = this._lookbookHTML(image)
       $el.replaceWith(lbHTML);
       $('.lb-container .focal-point').popover({trigger: 'hover'});
    },

    _lookbookHTML: function ($image) {
      var base = $('<div class="lb-container" style="position: relative"></div>').append($image);
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
      var html = "";
      for(var i = 0; i < arr.length; i++) {
        html += arr[i].html;
      }
      return html;
    },

    _setStyling: function(opts) {
      $.extend(defaults, opts);
    }
  };

  Lookbook.FocalPoint = function(point, options) {
    var styleRule = this.styleRule,
        styles = '',
        fullElement = '';
    styles += styleRule('position', 'absolute');
    styles += styleRule('height', options.point.height);
    styles += styleRule('width', options.point.width);
    styles += styleRule('border-radius', options.point.borderRadius);
    styles += styleRule('background-color', options.point.backgroundColor);
    styles += styleRule('left', point.posX + 'px');
    styles += styleRule('top', point.posY + 'px');
    fullElement = '<button type="button" class="btn focal-point" style="';
    fullElement += styles + '" title="' + point.title + '" data-toggle="popover" data-content="';
    fullElement += point.description + '" data-placement="top"></button>';
    this.html = fullElement;
  };

  Lookbook.FocalPoint.prototype = {
    styleRule: function(attr, val) {
      return attr + ':' + val + ';';
    }
  }

  $.fn.lookbook = function(opts) {
    var opts = opts || {};
    var lb = new Lookbook(this, opts);
  };

})(window, $);
