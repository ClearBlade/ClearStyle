/*
 * Copyright (c) 2013, ClearBlade Inc.
 */
var blade = function($,blade) {
  $(function() {
      //ios ':active' css fix
      //see http://stackoverflow.com/questions/4940429/how-to-simulate-active-css-pseudo-class-in-android-on-non-link-elements
    document.body.ontouchstart = function() {};

    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('android') > -1) {
      $("body").attr("data-platform", "android");
    } else {
      $("body").attr("data-platform", "ios");
    }
    if (window.device && device.version) {
      $("body").attr("data-version", (""+device.version).charAt(0));
    }
    //uses document because document will be topmost level in bubbling
    //uses body because jquery on events are called off of the element they are
    //added to, so bubbling would not work if we used document instead.
    $('body').on('touchstart','.scroll',function(e) {
      //http://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
      function Dimension(elm) {
        var elmHeight, elmMargin;
        elmHeight = document.defaultView.getComputedStyle(elm, '').height;
        elmHeight = parseInt(elmHeight,10);
        elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top'),10) + 
          parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'),10);
        return (elmHeight+elmMargin);
      }
      if (e.currentTarget.offsetHeight === e.currentTarget.scrollHeight) {
        var size = 0;
        for (var i = 0; i < e.currentTarget.children.length; i++) {
          size += Dimension(e.currentTarget.children[i]);
        }
        $(e.currentTarget).css('padding-bottom',
                               (e.currentTarget.offsetHeight -size + 2) + 
                                 'px');
      } 
      if (e.currentTarget.scrollTop === 0) {
        e.currentTarget.scrollTop = 1;
      } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
        e.currentTarget.scrollTop -= 1;
      }
    });
    $('body').on('touchmove','.scroll',function(e) {
      if (e.currentTarget.offsetHeight !== e.currentTarget.scrollHeight) {
        e.stopPropagation();
      }
    });
    $('html').on('touchmove', function(e) {
      e.preventDefault();
    });
  });


  // String.format: simple string formatter
  // Example:
  //   "a $0 string tastes like $1".format('cool','pizza') --> "a cool string tastes like pizza"
  String.prototype.format = function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prev, current, index) {
      return prev.replace(new RegExp('\\$'+index, 'g'), current);
    }, this);
  };
  String.prototype.escapeHTML = function(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  };

  /* Toast */
  blade.Toast = (function() {
    var DEFAULT_TIME = 4000;
    function Toast(text) {
      var self = this;
      self.element = $("<div>").addClass("toast").text(text);
      self.show = function(time, doneCallback) {
        self.element.appendTo("body");
        if ($(".tabbar:not(.out)").length) {
          self.element.addClass("with-tabbar");
        }
        self.callback = doneCallback;
        //Once it's fully shown, start hide timer
        setTimeout(function() {
          self.element.addClass("in");
          setTimeout(function() {
            self.hide();
          }, (time || DEFAULT_TIME) + 1000);
        }, 1);
      };
      self.hide = function() {
        self.element.removeClass("in");
        setTimeout(self._onClose, 1000);
      };
      self._onClose = function() {
        self.element.removeClass("in").remove();
        self.callback && self.callback();
      };
    }
    return {
      show: function(text, time, callback) {
        (new Toast(text)).show(time, callback);
      }
    };
  }());

  /* Dialog */
  blade.Dialog = (function() {
    function Dialog(title, text, buttonOk, buttonCancel) {
      var buttonsTemplate;
      this.element = $("<div>").addClass('dialog');
      this.backdrop = $("<div>").addClass('backdrop dialog-backdrop');

      //Construct dialog inner HTML
      //Two buttons or one?
      if (typeof buttonCancel == 'string') {
        buttonsTemplate = [
          '<a class="btn btn-primary right">$0</a>',
          '<a class="btn btn-cancel left">$1</a>'
        ].join('\n').format(buttonOk, buttonCancel);
      } else {
        buttonsTemplate = '<a class="btn btn-primary full">$0</a>'.format(buttonOk);
      }
      this.element.html([
                        '<div class="dialog-header"><h3>$0</h3></div>',
                        '<div class="dialog-body"><p>$1</p></div>',
                        '<div class="dialog-footer">$2</div>'
      ].join('\n').format(title, text, buttonsTemplate));

      //Stop buttons from triggering things underneath them when pressed
      this.element.find(".btn").bind("touchstart touchmove touchend", function(e) {
        e.preventDefault();
      });
    }
    Dialog.prototype.show = function(callback) {
      var self = this;
      $("body").append(self.element).append(self.backdrop);
      setTimeout(function() {
        self.element.addClass("in");
      }, 1);
      self.callback = callback;
      self.buttonOk = self.element.find(".btn-primary");
      self.buttonCancel = self.element.find(".btn-cancel");
      self.buttonOk.bind('click tap', function() {
        self.hide();
      });
      self.buttonCancel.bind('click tap', function() {
        self.hide(true);
      });
    };
    Dialog.prototype.hide = function(wasCancelled) {
      var self = this;
      self.element.removeClass("in");
      self.backdrop.addClass("out");
      self.buttonOk.unbind('click tap');
      self.buttonCancel.unbind('click tap');
      setTimeout(function() {
        self._onClose(wasCancelled);
      }, 300);
    };
    Dialog.prototype._onClose = function(wasCancelled) {
      this.backdrop.removeClass("out").remove();
      this.element
      .removeClass("out")
      .remove();
      this.callback && this.callback(wasCancelled);
    };

    var OK_BUTTON = "OK";
    var ERROR_TITLE = "Error";
    return {
      message: function(title, text, callback) {
        (new Dialog(title, text, OK_BUTTON)).show(callback);
      },
      confirm: function(title, text, cancelText, okText, callback) {
        if (typeof okText == "function") {
          callback = okText;
          okText = OK_BUTTON;
        }
        (new Dialog(title, text, okText || OK_BUTTON, cancelText)).show(callback);
      },
      error: function(error, callback) {
        if (error.data) error = error.data;
        if (error['oslc_cm:message']) error = error['oslc_cm:message'];
        if (error.text) error = error.text;
        (new Dialog(ERROR_TITLE, error, OK_BUTTON)).show(callback);
      }
    };
  }());

  /* Spinner */
  blade.Spinner = (function() {
    var $spinner, $backdrop, $spinnerText;
    var spinnerTemplate = '<div class="spinner"><i class="icon-spin icon-refresh"></i><p></p></div>';
    function onHidden() {
      $spinner.off('webkitTransitionEnd', onHidden);
      $spinner.removeClass('out');
      $backdrop.removeClass('out').css('background','');
      if ($('.spinner', $("body")).length) {
        $spinner.remove();
        $backdrop.remove();
      }
    }
    function createSpinner() {
      if (!$spinner) {
        $spinner = $(spinnerTemplate);
        $spinnerText = $spinner.find('p');
        $backdrop = $("<div>").addClass("backdrop");
      }
    }
    return {
      show: function(text) {
        text = text || '';
        if (!$spinner) createSpinner();
        //If it's fading out, just finish fade out 
        if ($spinner.hasClass('out')) {
          onHidden();
        }
        $spinner.appendTo(document.body);
        $spinnerText.text(text || '');
        $backdrop.appendTo(document.body);
      },
      hide: function() {
        if (!$spinner) createSpinner();
        $spinner.addClass('out');
        $spinner.on('webkitTransitionEnd', onHidden);
        $backdrop.addClass('out');
      }
    };
  }());
};
if (define) {
  define(['$'], function($) {
    var b = {};
    blade($,b);
    return b;
  });
} else {
  blade($,window);
}
