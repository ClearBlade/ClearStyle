/*
 * Copyright (c) 2013, ClearBlade Inc.
 */
(function() { 
  function blade($,blade) {
    $(function() {

      //ios ':active' css fix
      //see http://stackoverflow.com/questions/4940429/how-to-simulate-active-css-pseudo-class-in-android-on-non-link-elements
      document.body.ontouchstart = function() {};

      //Check our userAgent, and put the current platform onto the body tag
      var userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('android') > -1) {
        $("body").attr("data-platform", "android");
      } else {
        $("body").attr("data-platform", "ios");
      }
      //If we have cordova, after deviceready add the first number of the version
      //to the body tag. We only really care if it's android and 2.x :-)
      document.addEventListener("deviceready", function() {
        $("body").attr("data-version", (""+device.version).charAt(0));
      }, false);

      //## container bouncy fix
      //Make it so even when a list doesn't take up its full container, we can
      //bounce it around so it looks native.  We do this by adding padding-bottom
      //to the list so it actually takes up "more room" than the visible elements
      //and we can scroll it a bit.
      //@param e, touchstart event
      function bouncyFix(e) {
        //http://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
        function Dimension(elm) {
          var elmHeight, elmMargin;
          elmHeight = document.defaultView.getComputedStyle(elm, '').height;
          elmHeight = parseInt(elmHeight,10);
          elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top'),10) + 
            parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'),10);
          return (elmHeight+elmMargin);
        }
        //If our list container's visible height is the same as its scroll height,
        //we need to add our bouncy effect.
        if (e.currentTarget.offsetHeight === e.currentTarget.scrollHeight) {
          var size = 0;
          for (var i = 0; i < e.currentTarget.children.length; i++) {
            size += Dimension(e.currentTarget.children[i]);
          }
          $(e.currentTarget).css('padding-bottom',
                                 (e.currentTarget.offsetHeight -size + 2) + 
                                   'px');
        } 
      }
      $('body').on('touchstart','.scroll',function(e) {
          //If we scroll where there is no more room for the webview to scroll,
          //by default the webview itself will scroll up and down, this looks really
          //bad.  So if we are scrolling to the very top or bottom, add/subtract one
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1;
        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
          e.currentTarget.scrollTop -= 1;
        }

        //Call bouncyFix when we touchstart a scrollable area
        bouncyFix(e);
      });

      $('body').on('touchmove','.scroll',function(e) {
        if (e.currentTarget.offsetHeight !== e.currentTarget.scrollHeight) {
          e.stopPropagation();
        }
      });
      $('html').on('touchmove', function(e) {
        e.preventDefault();
      });

      //Make it so list elements are only active while touching them for a bit, without moving
      //This is how native works: It stops list elements from highlighting while just scrolling a list
      $(document).on('touchstart', 'li a, li .arrow', function(e) {
        var $this = $(this);
        //Be sure to clean up listeners when we're done so they don't start 
        //stacking up
        function deactivate() {
          $this.removeClass('active');
          $this.unbind('touchend', onTapDone);
          $this.unbind('touchmove touchcancel', deactivate);
          clearTimeout(activateTimeout);
        }
        function activate() {
          $this.addClass('active');
          clearTimeout(activateTimeout);
        }
        //If the user finishes a tap, instantly add the class and let it stay
        //on for 1 second
        function onTapDone() {
          activate();
          setTimeout(deactivate, 1500);
        }

        //Only add active after 80 seconds, incase user's finger moves
        var activateTimeout = setTimeout(activate, 80);

        $this.one('touchmove touchcancel', deactivate);
        $this.one('touchend', onTapDone);
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
String.prototype.escapeHTML = function() {
  return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};
String.prototype.unescapeHTML = function() {
  return this.replace(/&amp;/g,'&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g,'"');
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
      var $spinner, $spinnerWrapper, $spinnerText;
      var spinnerTemplate = 
        '<div class="spinner-wrapper">' +
        '<div class="spinner">' +
        '<i class="icon-spin icon-refresh"></i><p></p></div>' +
        '<div class="backdrop"></div>' +
        '</div>';
      function onHidden() {
        $spinner.off('webkitTransitionEnd', onHidden);
        $spinnerWrapper.children().removeClass('out');
        if ($('.spinner', $("body")).length) {
          $spinnerWrapper.remove();
        }
      }
      function createSpinner() {
        if (!$spinner) {
          $spinnerWrapper = $(spinnerTemplate);
          $spinner = $spinnerWrapper.children('.spinner');
          $spinnerText = $spinner.find('p');
        }
      }
      return {
        show: function(text, $owner) {
          text = text || '';
          if (!$spinner) createSpinner();
          //If it's fading out, just finish fade out 
          if ($spinner.hasClass('out')) {
            onHidden();
          }
          if (!$owner) $owner = $(document.body);
          $spinnerWrapper.appendTo($owner);
          $spinnerText.text(text || '');
        },
        hide: function() {
          if (!$spinner) createSpinner();
          $spinnerWrapper.children().addClass('out');
          $spinner.on('webkitTransitionEnd', onHidden);
        }
      };
    }());
  }
  if (typeof define !== "undefined" && define) {
    define(['$'], function($) {
      var b = {};
      blade($,b);
      return b;
    });
  } else {
    blade($,window);
  }
})();
