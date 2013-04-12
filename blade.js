/*
 * Copyright (c) 2013, ClearBlade Inc.
 */

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
  return this.replace(/&/g,'&amp;').replace(/"/g, '&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};
String.prototype.unescapeHTML = function() {
  return this.replace(/&amp;/g,'&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g,'"');
};

/* Toast */
var Toast = (function() {
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
var Dialog = (function() {
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
var Spinner = (function() {
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
