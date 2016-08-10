'use strict';

(function(global, $) {
  var defaults = {
    backgroundPosition: '100% 0%',
    point: {
      height: '30px',
      width: '30px',
      color: '#000',
      borderRadius: '50%',
      animationStartColor: 'rgba(255, 255, 255, .5)',
      animationEndColor: 'rgba(0, 0, 0, 0.0)'
    }
  }

  var Lookbook = function($el) {
    this.createLookbook($el);
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
        var fp = new Lookbook.FocalPoint(points[i]);
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
    }
  };

  Lookbook.FocalPoint = function(point) {
    var style = "position: absolute; height: 30px; width: 30px; border-radius: 50%; background-color: #000;left: " + point.posX + "px; top: " + point.posY + "px";
    this.html = '<button type="button" class="btn focal-point" style="' + style + '" title="' + point.title + '" data-toggle="popover" data-content="' + point.description + '" data-placement="top"></button>';
  };

  $.fn.lookbook = function() {
    var lb = new Lookbook(this);
  };

})(window, $);
