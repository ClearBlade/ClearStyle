/*
 * Copyright (c) 2013, ClearBlade Inc.
 */

$(function() {
  //ios ':active' css fix
  //see http://stackoverflow.com/questions/4940429/how-to-simulate-active-css-pseudo-class-in-android-on-non-link-elements
  document.body.ontouchstart = function() {};
}); 

// String.format: simple string formatter
// Example:
//   "a $0 string tastes like $1".format('cool','pizza') --> "a cool string tastes like pizza"
String.prototype.format = function() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(prev, current, index) {
    return prev.replace('$'+index, current);
  }, this);
};
String.prototype.escapeHTML = function(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

/* Toast */
var Toast = (function() {
  var DEFAULT_TIME = 4000;
  function Toast(text) {
    this.element = $("<div>").addClass("toast").text(text);
  }
  Toast.prototype.show = function(time, doneCallback) {
    var self = this;
    self.element.removeClass("out").appendTo("body");
    self.callback = doneCallback;
    //Once it's fully shown, start hide timer
    self.element.bind('webkitAnimationEnd', function() {
      self.element.unbind('webkitAnimationEnd');
      setTimeout(function() {
        self.hide();
      }, time || DEFAULT_TIME);
    });
  };
  Toast.prototype.hide = function() {
    var self = this;
    self.element.addClass("out");
    self.element.bind('webkitAnimationEnd', function() {
      self._onClose();
    });
  };
  Toast.prototype._onClose = function() {
    this.element
      .removeClass('out')
      .unbind('webkitAnimationEnd')
      .remove();
    this.callback && this.callback();
  };
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
    this.backdrop = $("<div>").addClass('dialog-backdrop');

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
    self.callback = callback;
    var buttonOk = self.element.find(".btn-primary");
    var buttonCancel = self.element.find(".btn-cancel");
    buttonOk.bind('tap', function() {
      self.hide();
    });
    buttonCancel.bind('tap', function() {
      self.hide(true);
    });
  };
  Dialog.prototype.hide = function(wasCancelled) {
    var self = this;
    self.element.addClass("out");
    self.backdrop.addClass("out");
    self.element.find('.btn').unbind('tap');
    self.element.bind('webkitAnimationEnd', function() {
      self._onClose(wasCancelled);
    });
  };
  Dialog.prototype._onClose = function(wasCancelled) {
    this.backdrop.removeClass("out").remove();
    this.element
      .removeClass("out")
      .unbind('webkitAnimationEnd')
      .remove();
    this.callback && this.callback(wasCancelled);
  };

  var OK_BUTTON = "OK";
  var ERROR_TITLE = "Error";
  return {
    message: function(title, text, callback) {
      (new Dialog(title, text, OK_BUTTON)).show(callback);
    },
    confirm: function(title, text, cancelText, callback) {
      (new Dialog(title, text, OK_BUTTON, cancelText)).show(callback);
    },
    error: function(error, callback) {
      if (error.data) error = error.data;
      if (error['oslc_cm:message']) error = error['oslc_cm:message'];
      if (error.text) error = error.text;
      (new Dialog(ERROR_TITLE, error, OK_BUTTON)).show(callback);
    }
  };
}());
