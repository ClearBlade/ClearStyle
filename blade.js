/*
 * Copyright (c) 2013, ClearBlade Inc.
 */

body {
  margin: auto;
  font-family: Helvetica;
  background: #FFFFFF url(images/bg.png) repeat;
  color: #000000;
  -webkit-user-select: none;
  -webkit-text-size-adjust: none;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  margin: auto;
}  

/************************************************************************************************/

.page {
  padding: 10px;
  text-shadow: #BBB 0px 0px 2px;
  background: url(images/bg.png) repeat;
}

/* This is required to work around a bug that occurs when maps is hit on iOS devices.
 * If this is not applied the contents of the the touch overflow scrolling section the
 * content will be clipped on scroll
 * http://stackoverflow.com/questions/7808110/css3-property-webkit-overflow-scrollingtouch-error
 * http://stackoverflow.com/a/7893031/238459
*/ 
.page * {
  -webkit-transform: translate3d(0,0,0);
} 

.page h2 {
  margin: 0 0 0 14px;
  padding-top: 4px;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  font-size: 16px;
  color: black;
  text-shadow: rgba(19,129,252,0.4) 1px 1px 1px;
}

/************************************************************************************************/

/* Toolbar */ 
.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  margin: auto;
  z-index: 8;
  background: url(images/toolbar.png) repeat-x;
  -webkit-transform: translate3d(0,0,0);
}

/* If a page is after a toolbar, make it pad below the toolbar */
.toolbar ~ .page {
  padding-top: 55px;
}

.toolbar h1 {
  position: absolute;
  overflow: hidden;
  left: 50%;
  margin: -1px 0 0 -75px;
  padding-top: 10px;
  height: 45px;
  font-family: Arial;
  font-size: 22px;
  width: 150px;
  text-shadow: rgba(0, 0, 0, 0.75) 0px -1px 2px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #FFFFFF;
}

/************************************************************************************************/

/* Text input */
input:not([type|=radio]):not([type|=checkbox]) {
  -webkit-box-sizing: border-box;
  width: 100%;
  margin:auto;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  padding: 6px;
  outline:none;
  -webkit-transition: box-shadow 0.1s;
  -webkit-border-radius: 8px;
  border:1px solid rgba(0,0,0,0.2);

}
input:not([type|=radio]):not([type|=checkbox]):focus {
  box-shadow: 0 0 5px #5cafff;
  border: 1px solid rgba(60,176,222, 0.8); 

}


.input-reset.show:after{
  position: absolute;
  margin-top: 7px;
  font-size: 20px;
  font-family: FontAwesome;
  color: #555;
  content: '\f00d';
  right: 16px;
}
.input-reset + input {
  padding-right: 22px !important;

}

/************************************************************************************/

ul {
  position: relative;
  margin:auto;
  padding: 0;
  margin-top: 15px;
  margin-bottom: 15px;
  border-left: 5px solid #277bcd;
}
ul.full {
  left: 0;
  right: 0;
  top: 45px;
  margin: 0;

  position: absolute;
  border-left: none;
}

ul .title {
  background: #222;
  background-size: 20px 24px;
  line-height: 24px;

  color: #eee;
  text-shadow: #333 -1px -1px 1px;
  font-size: 17px;
  font-weight: normal;

  padding-left: 8px;
  margin: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}



ul li:first-child {
  border-top-right-radius: 4px;

}
ul li:last-child {
  border-bottom-right-radius: 4px;
  border-bottom: 1px solid #DDD;
}

ul li {
  position: relative;
  margin: 0;
  line-height: 42px;
  padding-left: 8px;  
  list-style: none;
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  border-top: 1px solid #DDD;
  border-right: 1px solid #DDD;
  background: #f0f0f0;
}


ul li a,

ul li .arrow {
  display: block;
  margin-left: -8px;
  padding-left: 8px;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: url('images/arrow.png') no-repeat;
  background-position: 99% center;
  background-size: 28px 28px;

}

ul li a:active, 
ul li a.active {
  background: url('images/arrow_select.png') no-repeat;
  background-position: 99% center;
  background-size: 28px 28px;
  background-color: #046DE6;
}

/*Make sibling elements of active links change color */
ul li a:active,
ul li a.active,
ul li a:active + .right, 
ul li a.active + .right {
  color: #EEE;
  text-shadow: rgba(0, 0, 0, 0.4) 0 1px 0;
}

/* Pair : Listitem with left and right */
ul li.pair a, 
ul li.pair .left {
  display: block;
  max-width: 50%;
  padding-right: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

ul li.pair .right {
  position: absolute;
  right: 32px;
  max-width: 40%;
  bottom: 0px;
  color: #324f85;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin:auto;
}

ul li.pair .left:not(a) ~ .right {
  right: 8px;
  max-width: 45%;
}

ul li.pair input[type=checkbox] {
  bottom: 6px;
}
ul li.pair input.right,
ul li.pair .right.full {
  right: 8px;
}


ul li.input .left {
  width: 36%;
  padding-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
ul li.input .right,
ul li.input input:not([type|=radio]):not([type|=checkbox]),
ul li.input select {
  -webkit-appearance: none;
  position: absolute;
  left: 36%;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  width: 64%;
  border: none;
  border-left: 1px solid #DDD;
  border-radius: 0px;
  padding-left: 6px;
  padding-right: 6px;
}
ul li.input select {
  font-size: inherit;
  background: url(images/arrowdown.png) no-repeat;
  background-position: 99% center;
  background-size: 28px 28px;
}
ul li.input select:active {
  background: url(images/arrowdown_select.png) no-repeat;
  background-position: 99% center;
  background-size: 28px 28px;
  background-color: #046DE6;

}


/************************************************************************************************/

/* Switch */
input[type=checkbox]:after {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  content: '';
  position: absolute;
  background: url(images/switch-mask.png);
  width: 105px;
  height: 30px;
}
input[type=checkbox] {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  width: 105px;
  height: 30px;
  background: url(images/switch.png);
  background-position: -56px;
  overflow: hidden;
  -webkit-transition: background-position 0.15s;
}
input[type=checkbox]:checked {
  background-position: 0px;
}
input[type=checkbox]:disabled {
  background: url(images/switch_disabled.png);
  background-position: -27px;
}

/*********************************************************************************************/
/* Dialog */

@-webkit-keyframes dialogIn {
  0% { -webkit-transform: scale(0.5,0.5);
      opacity: 0; }
  100% { -webkit-transform: scale(1,1);
      opacity: 1; }
}
@-webkit-keyframes dialogOut {
  0% { -webkit-transform: scale(1,1);
      opacity: 1; }
  100% { -webkit-transform: scale(0.5,0.5);
      opacity: 0; }
}

@-webkit-keyframes backdropIn {
  0% { opacity: 0; }
  100% { opacity: 0.3; }
}
@-webkit-keyframes backdropOut {
  0% { opacity: 0; }
  100% { opacity: 0.3; }
}

.dialog {
  -webkit-animation-name: dialogIn;
  opacity: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  height: 180px;
  margin-top: -100px;
  background-color: #F3F3F3;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  outline: none;
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  z-index: 1050;
  text-align: center;
}
.dialog.out {
  -webkit-animation-name: dialogOut;
  opacity: 0;
}
.dialog-backdrop {
  -webkit-animation-name: backdropIn;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: black;
  opacity: 0.3;
}
.dialog-backdrop.out {
  -webkit-animation-name: backdropOut;
  opacity: 0;
}
.dialog, 
.dialog-backdrop {
  -webkit-animation-duration: 0.2s;
}


.dialog-header {
  border-radius: 6px 6px 0 0;
  text-align: center;
  border-bottom: 1px solid rgba(19,129,252,0.8);
  background: #eaeaea;
}
.dialog-header h3 {
  margin: 0;
  line-height: 28px;

}
.dialog-body {
  position: relative;
  height: 138px;
  padding: 7px;

  overflow-y: auto;
}
.dialog-body p {
  margin: 0;
}
.dialog-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 42px;
  margin: auto;
  text-align: center;
  border-top: 1px solid rgba(19,129,252,0.8);
  background: #eaeaea;
  border-radius: 0 0 6px 6px;
}
.dialog-footer .btn {
  position: absolute;
}
.dialog-footer .btn.full {
  left: 3px;
  right: 3px;
}
.dialog-footer .btn.left {
  left: 3px;
  width: 120px;
}
.dialog-footer .btn.right {
  right: 3px;
  width: 120px;
}


/************************************************************************************************/

/* Toast */
@-webkit-keyframes toastIn {
  0% {  -webkit-transform: translate3d(0, 100%, 0); }
  100% { -webkit-transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes toastOut {
  0% {  -webkit-transform: translate3d(0, 0, 0); }
  100% { -webkit-transform: translate3d(0, 100%, 0);
  }
}

.toast {
  -webkit-animation-name: toastIn;
  -webkit-animation-timing-function: ease-out;
  -webkit-animation-duration: 1s;
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 1050;
  margin-left: -132px;
  width: 240px;
  padding: 10px;
  padding-bottom: 5px;
  border: 2px solid #1381FC;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: rgba(130, 130, 130, 0.8);
  text-align: center;
  color: #FFF;
  text-shadow: 1px 1px #333;
  font-weight: bold;
  font-size: 20px;
  pointer-events: none;
  word-wrap: break-word;
}

.toast.out {
  -webkit-animation-name: toastOut;
  -webkit-transform: translate3d(0,100%,0);
}

/************************************************************************************************/


/*  Font Awesome 3.0
 the iconic font designed for use with Twitter Bootstrap
 -------------------------------------------------------
 The full suite of pictographic icons, examples, and documentation
 can be found at: http://fortawesome.github.com/Font-Awesome/

 License
 -------------------------------------------------------
 • The Font Awesome font is licensed under the SIL Open Font License - http://scripts.sil.org/OFL
 • Font Awesome CSS, LESS, and SASS files are licensed under the MIT License -
 http://opensource.org/licenses/mit-license.html
 • The Font Awesome pictograms are licensed under the CC BY 3.0 License - http://creativecommons.org/licenses/by/3.0/
 • Attribution is no longer required in Font Awesome 3.0, but much appreciated:
 "Font Awesome by Dave Gandy - http://fortawesome.github.com/Font-Awesome"

 Contact
 -------------------------------------------------------
 Email: dave@davegandy.com
 Twitter: http://twitter.com/fortaweso_me
 Work: Lead Product Designer @ http://kyruus.com
 `
 */
@font-face {
  font-family: 'FontAwesome';
  src: url('font/fontawesome-webfont.eot?v=3.0.1') format('embedded-opentype'),
    url('font/fontawesome-webfont.woff?v=3.0.1') format('woff'),
    url('font/fontawesome-webfont.ttf?v=3.0.1') format('truetype'),
    url('font/FontAwesome.otf?v=3.0.1') format('opentype');
  font-weight: normal;
  font-style: normal;
}
/*  Font Awesome styles
 ------------------------------------------------------- */
/* includes sprites.less reset */
[class^="icon-"],
[class*=" icon-"] {
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  text-decoration: inherit;
  display: inline;
  width: auto;
  height: auto;
  line-height: normal;
  vertical-align: baseline;
  background-image: none !important;
  background-position: 0% 0%;
  background-repeat: repeat;
}
[class^="icon-"]:before,
[class*=" icon-"]:before {
  text-decoration: inherit;
  display: inline-block;
  speak: none;
}
/* makes sure icons active on rollover in links */
a [class^="icon-"],
a [class*=" icon-"] {
  display: inline-block;
}
/* makes the font 33% larger relative to the icon container */
.icon-large:before {
  vertical-align: -10%;
  font-size: 1.3333333333333333em;
}
.btn [class^="icon-"],
.nav [class^="icon-"],
.btn [class*=" icon-"],
.nav [class*=" icon-"] {
  display: inline;
  /* keeps button heights with and without icons the same */

  line-height: .6em;
}
.btn [class^="icon-"].icon-spin,
.nav [class^="icon-"].icon-spin,
.btn [class*=" icon-"].icon-spin,
.nav [class*=" icon-"].icon-spin {
  display: inline-block;
}
li [class^="icon-"],
li [class*=" icon-"] {
  display: inline-block;
  width: 1.25em;
  text-align: center;
}
li [class^="icon-"].icon-large,
li [class*=" icon-"].icon-large {
  /* increased font size for icon-large */

  width: 1.5625em;
}
ul.icons {
  list-style-type: none;
  text-indent: -0.75em;
}
ul.icons li [class^="icon-"],
ul.icons li [class*=" icon-"] {
  width: .75em;
}
.icon-muted {
  color: #eeeeee;
}
.icon-border {
  border: solid 1px #eeeeee;
  padding: .2em .25em .15em;
  -webkit-border-radius: 3px;
}
.icon-2x {
  font-size: 2em;
}
.icon-2x.icon-border {
  border-width: 2px;
  -webkit-border-radius: 4px;
}
.icon-3x {
  font-size: 3em;
}
.icon-3x.icon-border {
  border-width: 3px;
  -webkit-border-radius: 5px;
}
.icon-4x {
  font-size: 4em;
}
.icon-4x.icon-border {
  border-width: 4px;
  -webkit-border-radius: 6px;
}
.pull-right {
  float: right;
}
.pull-left {
  float: left;
}
[class^="icon-"].pull-left,
[class*=" icon-"].pull-left {
  margin-right: .35em;
}
[class^="icon-"].pull-right,
[class*=" icon-"].pull-right {
  margin-left: .35em;
}
.btn [class^="icon-"].pull-left.icon-2x,
.btn [class*=" icon-"].pull-left.icon-2x,
.btn [class^="icon-"].pull-right.icon-2x,
.btn [class*=" icon-"].pull-right.icon-2x {
  margin-top: .35em;
}
.btn [class^="icon-"].icon-spin.icon-large,
.btn [class*=" icon-"].icon-spin.icon-large {
  height: .75em;
}
.btn.btn-small [class^="icon-"].pull-left.icon-2x,
.btn.btn-small [class*=" icon-"].pull-left.icon-2x,
.btn.btn-small [class^="icon-"].pull-right.icon-2x,
.btn.btn-small [class*=" icon-"].pull-right.icon-2x {
  margin-top: .45em;
}
.btn.btn-large [class^="icon-"].pull-left.icon-2x,
.btn.btn-large [class*=" icon-"].pull-left.icon-2x,
.btn.btn-large [class^="icon-"].pull-right.icon-2x,
.btn.btn-large [class*=" icon-"].pull-right.icon-2x {
  margin-top: .2em;
}
.icon-spin {
  display: inline-block;
  -webkit-animation: spin 2s infinite linear;
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(359deg); }
}
/*  Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
 readers do not read off random characters that represent icons */
.icon-glass:before                { content: "\f000"; }
.icon-music:before                { content: "\f001"; }
.icon-search:before               { content: "\f002"; }
.icon-envelope:before             { content: "\f003"; }
.icon-heart:before                { content: "\f004"; }
.icon-star:before                 { content: "\f005"; }
.icon-star-empty:before           { content: "\f006"; }
.icon-user:before                 { content: "\f007"; }
.icon-film:before                 { content: "\f008"; }
.icon-th-large:before             { content: "\f009"; }
.icon-th:before                   { content: "\f00a"; }
.icon-th-list:before              { content: "\f00b"; }
.icon-ok:before                   { content: "\f00c"; }
.icon-remove:before               { content: "\f00d"; }
.icon-zoom-in:before              { content: "\f00e"; }

.icon-zoom-out:before             { content: "\f010"; }
.icon-off:before                  { content: "\f011"; }
.icon-signal:before               { content: "\f012"; }
.icon-cog:before                  { content: "\f013"; }
.icon-trash:before                { content: "\f014"; }
.icon-home:before                 { content: "\f015"; }
.icon-file:before                 { content: "\f016"; }
.icon-time:before                 { content: "\f017"; }
.icon-road:before                 { content: "\f018"; }
.icon-download-alt:before         { content: "\f019"; }
.icon-download:before             { content: "\f01a"; }
.icon-upload:before               { content: "\f01b"; }
.icon-inbox:before                { content: "\f01c"; }
.icon-play-circle:before          { content: "\f01d"; }
.icon-repeat:before               { content: "\f01e"; }

/* \f020 doesn't work in Safari. all shifted one down */
.icon-refresh:before              { content: "\f021"; }
.icon-list-alt:before             { content: "\f022"; }
.icon-lock:before                 { content: "\f023"; }
.icon-flag:before                 { content: "\f024"; }
.icon-headphones:before           { content: "\f025"; }
.icon-volume-off:before           { content: "\f026"; }
.icon-volume-down:before          { content: "\f027"; }
.icon-volume-up:before            { content: "\f028"; }
.icon-qrcode:before               { content: "\f029"; }
.icon-barcode:before              { content: "\f02a"; }
.icon-tag:before                  { content: "\f02b"; }
.icon-tags:before                 { content: "\f02c"; }
.icon-book:before                 { content: "\f02d"; }
.icon-bookmark:before             { content: "\f02e"; }
.icon-print:before                { content: "\f02f"; }

.icon-camera:before               { content: "\f030"; }
.icon-font:before                 { content: "\f031"; }
.icon-bold:before                 { content: "\f032"; }
.icon-italic:before               { content: "\f033"; }
.icon-text-height:before          { content: "\f034"; }
.icon-text-width:before           { content: "\f035"; }
.icon-align-left:before           { content: "\f036"; }
.icon-align-center:before         { content: "\f037"; }
.icon-align-right:before          { content: "\f038"; }
.icon-align-justify:before        { content: "\f039"; }
.icon-list:before                 { content: "\f03a"; }
.icon-indent-left:before          { content: "\f03b"; }
.icon-indent-right:before         { content: "\f03c"; }
.icon-facetime-video:before       { content: "\f03d"; }
.icon-picture:before              { content: "\f03e"; }

.icon-pencil:before               { content: "\f040"; }
.icon-map-marker:before           { content: "\f041"; }
.icon-adjust:before               { content: "\f042"; }
.icon-tint:before                 { content: "\f043"; }
.icon-edit:before                 { content: "\f044"; }
.icon-share:before                { content: "\f045"; }
.icon-check:before                { content: "\f046"; }
.icon-move:before                 { content: "\f047"; }
.icon-step-backward:before        { content: "\f048"; }
.icon-fast-backward:before        { content: "\f049"; }
.icon-backward:before             { content: "\f04a"; }
.icon-play:before                 { content: "\f04b"; }
.icon-pause:before                { content: "\f04c"; }
.icon-stop:before                 { content: "\f04d"; }
.icon-forward:before              { content: "\f04e"; }

.icon-fast-forward:before         { content: "\f050"; }
.icon-step-forward:before         { content: "\f051"; }
.icon-eject:before                { content: "\f052"; }
.icon-chevron-left:before         { content: "\f053"; }
.icon-chevron-right:before        { content: "\f054"; }
.icon-plus-sign:before            { content: "\f055"; }
.icon-minus-sign:before           { content: "\f056"; }
.icon-remove-sign:before          { content: "\f057"; }
.icon-ok-sign:before              { content: "\f058"; }
.icon-question-sign:before        { content: "\f059"; }
.icon-info-sign:before            { content: "\f05a"; }
.icon-screenshot:before           { content: "\f05b"; }
.icon-remove-circle:before        { content: "\f05c"; }
.icon-ok-circle:before            { content: "\f05d"; }
.icon-ban-circle:before           { content: "\f05e"; }

.icon-arrow-left:before           { content: "\f060"; }
.icon-arrow-right:before          { content: "\f061"; }
.icon-arrow-up:before             { content: "\f062"; }
.icon-arrow-down:before           { content: "\f063"; }
.icon-share-alt:before            { content: "\f064"; }
.icon-resize-full:before          { content: "\f065"; }
.icon-resize-small:before         { content: "\f066"; }
.icon-plus:before                 { content: "\f067"; }
.icon-minus:before                { content: "\f068"; }
.icon-asterisk:before             { content: "\f069"; }
.icon-exclamation-sign:before     { content: "\f06a"; }
.icon-gift:before                 { content: "\f06b"; }
.icon-leaf:before                 { content: "\f06c"; }
.icon-fire:before                 { content: "\f06d"; }
.icon-eye-open:before             { content: "\f06e"; }

.icon-eye-close:before            { content: "\f070"; }
.icon-warning-sign:before         { content: "\f071"; }
.icon-plane:before                { content: "\f072"; }
.icon-calendar:before             { content: "\f073"; }
.icon-random:before               { content: "\f074"; }
.icon-comment:before              { content: "\f075"; }
.icon-magnet:before               { content: "\f076"; }
.icon-chevron-up:before           { content: "\f077"; }
.icon-chevron-down:before         { content: "\f078"; }
.icon-retweet:before              { content: "\f079"; }
.icon-shopping-cart:before        { content: "\f07a"; }
.icon-folder-close:before         { content: "\f07b"; }
.icon-folder-open:before          { content: "\f07c"; }
.icon-resize-vertical:before      { content: "\f07d"; }
.icon-resize-horizontal:before    { content: "\f07e"; }

.icon-bar-chart:before            { content: "\f080"; }
.icon-twitter-sign:before         { content: "\f081"; }
.icon-facebook-sign:before        { content: "\f082"; }
.icon-camera-retro:before         { content: "\f083"; }
.icon-key:before                  { content: "\f084"; }
.icon-cogs:before                 { content: "\f085"; }
.icon-comments:before             { content: "\f086"; }
.icon-thumbs-up:before            { content: "\f087"; }
.icon-thumbs-down:before          { content: "\f088"; }
.icon-star-half:before            { content: "\f089"; }
.icon-heart-empty:before          { content: "\f08a"; }
.icon-signout:before              { content: "\f08b"; }
.icon-linkedin-sign:before        { content: "\f08c"; }
.icon-pushpin:before              { content: "\f08d"; }
.icon-external-link:before        { content: "\f08e"; }

.icon-signin:before               { content: "\f090"; }
.icon-trophy:before               { content: "\f091"; }
.icon-github-sign:before          { content: "\f092"; }
.icon-upload-alt:before           { content: "\f093"; }
.icon-lemon:before                { content: "\f094"; }
.icon-phone:before                { content: "\f095"; }
.icon-check-empty:before          { content: "\f096"; }
.icon-bookmark-empty:before       { content: "\f097"; }
.icon-phone-sign:before           { content: "\f098"; }
.icon-twitter:before              { content: "\f099"; }
.icon-facebook:before             { content: "\f09a"; }
.icon-github:before               { content: "\f09b"; }
.icon-unlock:before               { content: "\f09c"; }
.icon-credit-card:before          { content: "\f09d"; }
.icon-rss:before                  { content: "\f09e"; }

.icon-hdd:before                  { content: "\f0a0"; }
.icon-bullhorn:before             { content: "\f0a1"; }
.icon-bell:before                 { content: "\f0a2"; }
.icon-certificate:before          { content: "\f0a3"; }
.icon-hand-right:before           { content: "\f0a4"; }
.icon-hand-left:before            { content: "\f0a5"; }
.icon-hand-up:before              { content: "\f0a6"; }
.icon-hand-down:before            { content: "\f0a7"; }
.icon-circle-arrow-left:before    { content: "\f0a8"; }
.icon-circle-arrow-right:before   { content: "\f0a9"; }
.icon-circle-arrow-up:before      { content: "\f0aa"; }
.icon-circle-arrow-down:before    { content: "\f0ab"; }
.icon-globe:before                { content: "\f0ac"; }
.icon-wrench:before               { content: "\f0ad"; }
.icon-tasks:before                { content: "\f0ae"; }

.icon-filter:before               { content: "\f0b0"; }
.icon-briefcase:before            { content: "\f0b1"; }
.icon-fullscreen:before           { content: "\f0b2"; }

.icon-group:before                { content: "\f0c0"; }
.icon-link:before                 { content: "\f0c1"; }
.icon-cloud:before                { content: "\f0c2"; }
.icon-beaker:before               { content: "\f0c3"; }
.icon-cut:before                  { content: "\f0c4"; }
.icon-copy:before                 { content: "\f0c5"; }
.icon-paper-clip:before           { content: "\f0c6"; }
.icon-save:before                 { content: "\f0c7"; }
.icon-sign-blank:before           { content: "\f0c8"; }
.icon-reorder:before              { content: "\f0c9"; }
.icon-list-ul:before              { content: "\f0ca"; }
.icon-list-ol:before              { content: "\f0cb"; }
.icon-strikethrough:before        { content: "\f0cc"; }
.icon-underline:before            { content: "\f0cd"; }
.icon-table:before                { content: "\f0ce"; }

.icon-magic:before                { content: "\f0d0"; }
.icon-truck:before                { content: "\f0d1"; }
.icon-pinterest:before            { content: "\f0d2"; }
.icon-pinterest-sign:before       { content: "\f0d3"; }
.icon-google-plus-sign:before     { content: "\f0d4"; }
.icon-google-plus:before          { content: "\f0d5"; }
.icon-money:before                { content: "\f0d6"; }
.icon-caret-down:before           { content: "\f0d7"; }
.icon-caret-up:before             { content: "\f0d8"; }
.icon-caret-left:before           { content: "\f0d9"; }
.icon-caret-right:before          { content: "\f0da"; }
.icon-columns:before              { content: "\f0db"; }
.icon-sort:before                 { content: "\f0dc"; }
.icon-sort-down:before            { content: "\f0dd"; }
.icon-sort-up:before              { content: "\f0de"; }

.icon-envelope-alt:before         { content: "\f0e0"; }
.icon-linkedin:before             { content: "\f0e1"; }
.icon-undo:before                 { content: "\f0e2"; }
.icon-legal:before                { content: "\f0e3"; }
.icon-dashboard:before            { content: "\f0e4"; }
.icon-comment-alt:before          { content: "\f0e5"; }
.icon-comments-alt:before         { content: "\f0e6"; }
.icon-bolt:before                 { content: "\f0e7"; }
.icon-sitemap:before              { content: "\f0e8"; }
.icon-umbrella:before             { content: "\f0e9"; }
.icon-paste:before                { content: "\f0ea"; }
.icon-lightbulb:before            { content: "\f0eb"; }
.icon-exchange:before             { content: "\f0ec"; }
.icon-cloud-download:before       { content: "\f0ed"; }
.icon-cloud-upload:before         { content: "\f0ee"; }

.icon-user-md:before              { content: "\f0f0"; }
.icon-stethoscope:before          { content: "\f0f1"; }
.icon-suitcase:before             { content: "\f0f2"; }
.icon-bell-alt:before             { content: "\f0f3"; }
.icon-coffee:before               { content: "\f0f4"; }
.icon-food:before                 { content: "\f0f5"; }
.icon-file-alt:before             { content: "\f0f6"; }
.icon-building:before             { content: "\f0f7"; }
.icon-hospital:before             { content: "\f0f8"; }
.icon-ambulance:before            { content: "\f0f9"; }
.icon-medkit:before               { content: "\f0fa"; }
.icon-fighter-jet:before          { content: "\f0fb"; }
.icon-beer:before                 { content: "\f0fc"; }
.icon-h-sign:before               { content: "\f0fd"; }
.icon-plus-sign-alt:before        { content: "\f0fe"; }

.icon-double-angle-left:before    { content: "\f100"; }
.icon-double-angle-right:before   { content: "\f101"; }
.icon-double-angle-up:before      { content: "\f102"; }
.icon-double-angle-down:before    { content: "\f103"; }
.icon-angle-left:before           { content: "\f104"; }
.icon-angle-right:before          { content: "\f105"; }
.icon-angle-up:before             { content: "\f106"; }
.icon-angle-down:before           { content: "\f107"; }
.icon-desktop:before              { content: "\f108"; }
.icon-laptop:before               { content: "\f109"; }
.icon-tablet:before               { content: "\f10a"; }
.icon-mobile-phone:before         { content: "\f10b"; }
.icon-circle-blank:before         { content: "\f10c"; }
.icon-quote-left:before           { content: "\f10d"; }
.icon-quote-right:before          { content: "\f10e"; }

.icon-spinner:before              { content: "\f110"; }
.icon-circle:before               { content: "\f111"; }
.icon-reply:before                { content: "\f112"; }
.icon-github-alt:before           { content: "\f113"; }
.icon-folder-close-alt:before     { content: "\f114"; }
.icon-folder-open-alt:before      { content: "\f115"; }


/************************************************************************************************/
/* Buttons from twitter bootstrap */

.btn {
  text-decoration: none;
  display: inline-block;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  color: #333333;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  background-color: #f5f5f5;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
  background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
  background-repeat: repeat-x;
  border-color: #e6e6e6 #e6e6e6 #bfbfbf;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  /* Darken IE7 buttons by default so they stand out more given they won't have borders */
  border: 1px solid #bbbbbb;
  border-bottom-color: #a2a2a2;
  -webkit-border-radius: 4px;
  *margin-left: .3em;
  -webkit-box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
  margin-top: 2px;
  margin-bottom: 2px;
}

                                                

.btn:active,
.btn.active,
.btn.disabled,
.btn[disabled] {
  color: #333333;
  background-color: #e6e6e6;
  *background-color: #d9d9d9;
}
.btn:active,
.btn.active {
  background-color: #cccccc \9;
}
.btn:first-child {
  *margin-left: 0;
}

.btn:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn.active,
.btn:active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);
}
.btn.disabled,
.btn[disabled] {
  cursor: default;
  background-image: none;
  opacity: 0.65;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
}
.btn-large {
  padding: 11px 19px;
  font-size: 17.5px;
  -webkit-border-radius: 6px;
}
.btn-large [class^="icon-"],
.btn-large [class*=" icon-"] {
  margin-top: 4px;
}
.btn-small {
  padding: 2px 10px;
  font-size: 11.9px;
  -webkit-border-radius: 3px;
}
.btn-small [class^="icon-"],
.btn-small [class*=" icon-"] {
  margin-top: 0;
}
.btn-mini [class^="icon-"],
.btn-mini [class*=" icon-"] {
  margin-top: -1px;
}
.btn-mini {
  padding: 0 6px;
  font-size: 10.5px;
  -webkit-border-radius: 3px;
}
.btn-block {
  display: block;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  -webkit-box-sizing: border-box;
}
.btn-block + .btn-block {
  margin-top: 5px;
}
input[type="submit"].btn-block,
input[type="reset"].btn-block,
input[type="button"].btn-block {
  width: 100%;
}
.btn-primary.active,
.btn-warning.active,
.btn-danger.active,
.btn-success.active,
.btn-info.active,
.btn-inverse.active {
  color: rgba(255, 255, 255, 0.75);
}
.btn {
  border-color: #c5c5c5;
  border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25);
}
.btn-primary {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #006dcc;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0044cc));
  background-image: -webkit-linear-gradient(top, #0088cc, #0044cc);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0044cc', GradientType=0);
  border-color: #0044cc #0044cc #002a80;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  *background-color: #0044cc;
  /* Darken IE7 buttons by default so they stand out more given they won't have borders */

  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
}

.btn-primary:active,
.btn-primary.active,
.btn-primary.disabled,
.btn-primary[disabled] {
  color: #ffffff;
  background-color: #0044cc;
  *background-color: #003bb3;
}
.btn-primary:active,
.btn-primary.active {
  background-color: #003399 \9;
}
.btn-warning {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #faa732;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fbb450), to(#f89406));
  background-image: -webkit-linear-gradient(top, #fbb450, #f89406);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450', endColorstr='#fff89406', GradientType=0);
  border-color: #f89406 #f89406 #ad6704;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  *background-color: #f89406;
  /* Darken IE7 buttons by default so they stand out more given they won't have borders */

  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
}

.btn-warning:active,
.btn-warning.active,
.btn-warning.disabled,
.btn-warning[disabled] {
  color: #ffffff;
  background-color: #f89406;
  *background-color: #df8505;
}
.btn-warning:active,
.btn-warning.active {
  background-color: #c67605 \9;
}
.btn-danger {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #da4f49;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ee5f5b), to(#bd362f));
  background-image: -webkit-linear-gradient(top, #ee5f5b, #bd362f);
  background-repeat: repeat-x;
  border-color: #bd362f #bd362f #802420;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}
.btn-danger:active,
.btn-danger.active,
.btn-danger.disabled,
.btn-danger[disabled] {
  color: #ffffff;
  background-color: #bd362f;
  *background-color: #a9302a;
}
.btn-danger:active,
.btn-danger.active {
  background-color: #942a25 \9;
}
.btn-success {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #5bb75b;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#62c462), to(#51a351));
  background-image: -webkit-linear-gradient(top, #62c462, #51a351);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462', endColorstr='#ff51a351', GradientType=0);
  border-color: #51a351 #51a351 #387038;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  *background-color: #51a351;
  /* Darken IE7 buttons by default so they stand out more given they won't have borders */

  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
}

.btn-success:active,
.btn-success.active,
.btn-success.disabled,
.btn-success[disabled] {
  color: #ffffff;
  background-color: #51a351;
  *background-color: #499249;
}
.btn-success:active,
.btn-success.active {
  background-color: #408140 \9;
}
.btn-info {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #49afcd;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#5bc0de), to(#2f96b4));
  background-image: -webkit-linear-gradient(top, #5bc0de, #2f96b4);
  background-repeat: repeat-x;
  border-color: #2f96b4 #2f96b4 #1f6377;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}
.btn-info:active,
.btn-info.active,
.btn-info.disabled,
.btn-info[disabled] {
  color: #ffffff;
  background-color: #2f96b4;
  *background-color: #2a85a0;
}
.btn-info:active,
.btn-info.active {
  background-color: #24748c \9;
}
.btn-inverse {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #363636;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#444444), to(#222222));
  background-image: -webkit-linear-gradient(top, #444444, #222222);
  background-repeat: repeat-x;
  border-color: #222222 #222222 #000000;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}

.btn-inverse:active,
.btn-inverse.active,
.btn-inverse.disabled,
.btn-inverse[disabled] {
  color: #ffffff;
  background-color: #222222;
  *background-color: #151515;
}
.btn-inverse:active,
.btn-inverse.active {
  background-color: #080808 \9;
}
.btn-toolbar {
  position:absolute;
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #363636;
  background-image: url(images/buttonbg.png);
  border-top: none;
  border-bottom: none;
  border-left: #3F3F3F solid 1px;
  border-right: #3F3F3F solid 1px;
  background-repeat: repeat-x;
  border-radius: 4px;
  top: 5px;
  line-height: 22px;
  height: 22px;
  margin-left: 6px;
  margin-right: 6px;
}
.btn-toolbar.right {
  right: 0px;
}
.btn-toolbar.back {
  left: 17px;
  padding-left: 2px;
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

}    
.btn-toolbar.back:before {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  left: -16px;
  background: url(images/arrowback.png) no-repeat;
  top: 0px;

}
.btn-toolbar.back:active:before {
  background: url(images/arrowback_select.png) no-repeat;
}
.btn-toolbar:active,
.btn-toolbar.active {
  background-image: -webkit-linear-gradient(top, #333, #000 95%, #333);
  color: #DDD;
}
.btn-toolbar [class^="icon-"],
.btn-toolbar [class*=" icon-"] {
  font-size: 14px;
  line-height: 14px;
}

.btn,
input[type="submit"].btn {
  *padding-top: 3px;
  *padding-bottom: 3px;
}
.btn.btn-large,
input[type="submit"].btn.btn-large {
  *padding-top: 7px;
  *padding-bottom: 7px;
}
.btn.btn-small,
input[type="submit"].btn.btn-small {
  *padding-top: 3px;
  *padding-bottom: 3px;
}
.btn.btn-mini,
input[type="submit"].btn.btn-mini {
  *padding-top: 1px;
  *padding-bottom: 1px;
}
.btn-link,
.btn-link:active,
.btn-link[disabled] {
  background-color: transparent;
  background-image: none;
  -webkit-box-shadow: none;
}
.btn-link {
  border-color: transparent;
  cursor: pointer;
  color: #0088cc;
  -webkit-border-radius: 0;
}
.btn-link:hover {
  color: #005580;
  text-decoration: underline;
  background-color: transparent;
}
.btn-link[disabled]:hover {
  color: #333333;
  text-decoration: none;
}


/************************************************************************************************/
/* Media Queries */


/* Landscape smartphone or a bigger device */
@media only screen and (min-width: 321px) {
  .toolbar > h1 {
    margin-left: -125px;
    width: 250px;
  }
  .dialog {
    width: 380px;
    margin-left: -190px;
  }
  .dialog-footer .btn.left {
    width: 160px;
  }
  .dialog-footer .btn.right {
    width: 160px;
  }
  .toast {
    width: 350px;
    margin-left: -187px;
  }
}
/* Tablet */
@media only screen and (min-device-width: 768px) {
  .toast {
    width: 450px;
    margin-left: -237px;
  }
  .dialog {
    width: 500px;
    margin-left: -250px;
  }
  .dialog-footer .btn.left {
    width: 220px;
  }
  .dialog-footer .btn.right {
    width: 220px;
  }
}

