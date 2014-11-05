(function() {
window.Bobcat = window.$B = window.Bobcat || {}, "function" == typeof $B.timerCheck && $B.timerCheck("application or application-editor.js run"), 
window.console || (window.console = {
log:function() {},
error:function() {},
warn:function() {}
});
}).call(this), function(e, t) {
e.rails !== t && e.error("jquery-ujs has already been loaded!");
var n;
e.rails = n = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
buttonClickSelector:"button[data-remote]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input[type=file]",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(t) {
var n = e('meta[name="csrf-token"]').attr("content");
n && t.setRequestHeader("X-CSRF-Token", n);
},
fire:function(t, n, o) {
var i = e.Event(n);
return t.trigger(i, o), i.result !== !1;
},
confirm:function(e) {
return confirm(e);
},
ajax:function(t) {
return e.ajax(t);
},
href:function(e) {
return e.attr("href");
},
handleRemote:function(o) {
var i, r, a, s, l, u, c, d;
if (n.fire(o, "ajax:before")) {
if (s = o.data("cross-domain"), l = s === t ? null :s, u = o.data("with-credentials") || null, 
c = o.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, o.is("form")) {
i = o.attr("method"), r = o.attr("action"), a = o.serializeArray();
var h = o.data("ujs:submit-button");
h && (a.push(h), o.data("ujs:submit-button", null));
} else o.is(n.inputChangeSelector) ? (i = o.data("method"), r = o.data("url"), a = o.serialize(), 
o.data("params") && (a = a + "&" + o.data("params"))) :o.is(n.buttonClickSelector) ? (i = o.data("method") || "get", 
r = o.data("url"), a = o.serialize(), o.data("params") && (a = a + "&" + o.data("params"))) :(i = o.data("method"), 
r = n.href(o), a = o.data("params") || null);
d = {
type:i || "GET",
data:a,
dataType:c,
beforeSend:function(e, i) {
return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), 
n.fire(o, "ajax:beforeSend", [ e, i ]);
},
success:function(e, t, n) {
o.trigger("ajax:success", [ e, t, n ]);
},
complete:function(e, t) {
o.trigger("ajax:complete", [ e, t ]);
},
error:function(e, t, n) {
o.trigger("ajax:error", [ e, t, n ]);
},
crossDomain:l
}, u && (d.xhrFields = {
withCredentials:u
}), r && (d.url = r);
var p = n.ajax(d);
return o.trigger("ajax:send", p), p;
}
return !1;
},
handleMethod:function(o) {
var i = n.href(o), r = o.data("method"), a = o.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + i + '"></form>'), c = '<input name="_method" value="' + r + '" type="hidden" />';
l !== t && s !== t && (c += '<input name="' + l + '" value="' + s + '" type="hidden" />'), 
a && u.attr("target", a), u.hide().append(c).appendTo("body"), u.submit();
},
disableFormElements:function(t) {
t.find(n.disableSelector).each(function() {
var t = e(this), n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0);
});
},
enableFormElements:function(t) {
t.find(n.enableSelector).each(function() {
var t = e(this), n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1);
});
},
allowAction:function(e) {
var t, o = e.data("confirm"), i = !1;
return o ? (n.fire(e, "confirm") && (i = n.confirm(o), t = n.fire(e, "confirm:complete", [ i ])), 
i && t) :!0;
},
blankInputs:function(t, n, o) {
var i, r, a = e(), s = n || "input,textarea", l = t.find(s);
return l.each(function() {
if (i = e(this), r = i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") :i.val(), 
!r == !o) {
if (i.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + i.attr("name") + '"]').length) return !0;
a = a.add(i);
}
}), a.length ? a :!1;
},
nonBlankInputs:function(e, t) {
return n.blankInputs(e, t, !0);
},
stopEverything:function(t) {
return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), 
!1;
},
disableElement:function(e) {
e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
return n.stopEverything(e);
});
},
enableElement:function(e) {
e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), 
e.unbind("click.railsDisable");
}
}, n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, o) {
e.crossDomain || n.CSRFProtection(o);
}), e(document).delegate(n.linkDisableSelector, "ajax:complete", function() {
n.enableElement(e(this));
}), e(document).delegate(n.linkClickSelector, "click.rails", function(o) {
var i = e(this), r = i.data("method"), a = i.data("params");
if (!n.allowAction(i)) return n.stopEverything(o);
if (i.is(n.linkDisableSelector) && n.disableElement(i), i.data("remote") !== t) {
if (!(!o.metaKey && !o.ctrlKey || r && "GET" !== r || a)) return !0;
var s = n.handleRemote(i);
return s === !1 ? n.enableElement(i) :s.error(function() {
n.enableElement(i);
}), !1;
}
return i.data("method") ? (n.handleMethod(i), !1) :void 0;
}), e(document).delegate(n.buttonClickSelector, "click.rails", function(t) {
var o = e(this);
return n.allowAction(o) ? (n.handleRemote(o), !1) :n.stopEverything(t);
}), e(document).delegate(n.inputChangeSelector, "change.rails", function(t) {
var o = e(this);
return n.allowAction(o) ? (n.handleRemote(o), !1) :n.stopEverything(t);
}), e(document).delegate(n.formSubmitSelector, "submit.rails", function(o) {
var i = e(this), r = i.data("remote") !== t, a = n.blankInputs(i, n.requiredInputSelector), s = n.nonBlankInputs(i, n.fileInputSelector);
if (!n.allowAction(i)) return n.stopEverything(o);
if (a && i.attr("novalidate") == t && n.fire(i, "ajax:aborted:required", [ a ])) return n.stopEverything(o);
if (r) {
if (s) {
setTimeout(function() {
n.disableFormElements(i);
}, 13);
var l = n.fire(i, "ajax:aborted:file", [ s ]);
return l || setTimeout(function() {
n.enableFormElements(i);
}, 13), l;
}
return n.handleRemote(i), !1;
}
setTimeout(function() {
n.disableFormElements(i);
}, 13);
}), e(document).delegate(n.formInputClickSelector, "click.rails", function(t) {
var o = e(this);
if (!n.allowAction(o)) return n.stopEverything(t);
var i = o.attr("name"), r = i ? {
name:i,
value:o.val()
} :null;
o.closest("form").data("ujs:submit-button", r);
}), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
this == t.target && n.disableFormElements(e(this));
}), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function(t) {
this == t.target && n.enableFormElements(e(this));
}), e(function() {
var t = e("meta[name=csrf-token]").attr("content"), n = e("meta[name=csrf-param]").attr("content");
e('form input[name="' + n + '"]').val(t);
}));
}(jQuery), function() {
var e, t;
jQuery.uaMatch = function(e) {
e = e.toLowerCase();
var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
return {
browser:t[1] || "",
version:t[2] || "0"
};
}, e = jQuery.uaMatch(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, 
t.version = e.version), t.chrome ? t.webkit = !0 :t.webkit && (t.safari = !0), jQuery.browser = t, 
jQuery.sub = function() {
function e(t, n) {
return new e.fn.init(t, n);
}
jQuery.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, 
e.sub = this.sub, e.fn.init = function(n, o) {
return o && o instanceof jQuery && !(o instanceof e) && (o = e(o)), jQuery.fn.init.call(this, n, o, t);
}, e.fn.init.prototype = e.fn;
var t = e(document);
return e;
};
}(), /*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
function(e) {
"function" == typeof define && define.amd && define.amd.jQuery ? define([ "jquery" ], e) :e(jQuery);
}(function(e) {
function t(e) {
return e;
}
function n(e) {
return decodeURIComponent(e.replace(i, " "));
}
function o(e) {
0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
try {
return r.json ? JSON.parse(e) :e;
} catch (t) {}
}
var i = /\+/g, r = e.cookie = function(i, a, s) {
if (void 0 !== a) {
if (s = e.extend({}, r.defaults, s), "number" == typeof s.expires) {
var l = s.expires, u = s.expires = new Date();
u.setDate(u.getDate() + l);
}
return a = r.json ? JSON.stringify(a) :String(a), document.cookie = [ encodeURIComponent(i), "=", r.raw ? a :encodeURIComponent(a), s.expires ? "; expires=" + s.expires.toUTCString() :"", s.path ? "; path=" + s.path :"", s.domain ? "; domain=" + s.domain :"", s.secure ? "; secure" :"" ].join("");
}
for (var c = r.raw ? t :n, d = document.cookie.split("; "), h = i ? void 0 :{}, p = 0, g = d.length; g > p; p++) {
var m = d[p].split("="), f = c(m.shift()), _ = c(m.join("="));
if (i && i === f) {
h = o(_);
break;
}
i || (h[f] = o(_));
}
return h;
};
r.defaults = {}, e.removeCookie = function(t, n) {
return void 0 !== e.cookie(t) ? (e.cookie(t, "", e.extend(n, {
expires:-1
})), !0) :!1;
};
}), function(e) {
function t(e) {
return "object" == typeof e ? e :{
top:e,
left:e
};
}
var n = e.scrollTo = function(t, n, o) {
e(window).scrollTo(t, n, o);
};
n.defaults = {
axis:"xy",
duration:parseFloat(e.fn.jquery) >= 1.3 ? 0 :1
}, n.window = function() {
return e(window)._scrollable();
}, e.fn._scrollable = function() {
return this.map(function() {
var t = this, n = !t.nodeName || -1 != e.inArray(t.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
if (!n) return t;
var o = (t.contentWindow || t).document || t.ownerDocument || t;
return e.browser.safari || "BackCompat" == o.compatMode ? o.body :o.documentElement;
});
}, e.fn.scrollTo = function(o, i, r) {
return "object" == typeof i && (r = i, i = 0), "function" == typeof r && (r = {
onAfter:r
}), "max" == o && (o = 9e9), r = e.extend({}, n.defaults, r), i = i || r.speed || r.duration, 
r.queue = r.queue && r.axis.length > 1, r.queue && (i /= 2), r.offset = t(r.offset), 
r.over = t(r.over), this._scrollable().each(function() {
function a(e) {
u.animate(d, i, r.easing, e && function() {
e.call(this, o, r);
});
}
var s, l = this, u = e(l), c = o, d = {}, h = u.is("html,body");
switch (typeof c) {
case "number":
case "string":
if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(c)) {
c = t(c);
break;
}
c = e(c, this);

case "object":
(c.is || c.style) && (s = (c = e(c)).offset());
}
e.each(r.axis.split(""), function(e, t) {
var o = "x" == t ? "Left" :"Top", i = o.toLowerCase(), p = "scroll" + o, g = l[p], m = n.max(l, t);
if (s) d[p] = s[i] + (h ? 0 :g - u.offset()[i]), r.margin && (d[p] -= parseInt(c.css("margin" + o)) || 0, 
d[p] -= parseInt(c.css("border" + o + "Width")) || 0), d[p] += r.offset[i] || 0, 
r.over[i] && (d[p] += c["x" == t ? "width" :"height"]() * r.over[i]); else {
var f = c[i];
d[p] = f.slice && "%" == f.slice(-1) ? parseFloat(f) / 100 * m :f;
}
/^\d+$/.test(d[p]) && (d[p] = d[p] <= 0 ? 0 :Math.min(d[p], m)), !e && r.queue && (g != d[p] && a(r.onAfterFirst), 
delete d[p]);
}), a(r.onAfter);
}).end();
}, n.max = function(t, n) {
var o = "x" == n ? "Width" :"Height", i = "scroll" + o;
if (!e(t).is("html,body")) return t[i] - e(t)[o.toLowerCase()]();
var r = "client" + o, a = t.ownerDocument.documentElement, s = t.ownerDocument.body;
return Math.max(a[i], s[i]) - Math.min(a[r], s[r]);
};
}(jQuery), /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def:"easeOutQuad",
swing:function(e, t, n, o, i) {
return (t /= i / 2) < 1 ? o / 2 * t * t + n :-o / 2 * (--t * (t - 2) - 1) + n;
},
easeInQuad:function(e, t, n, o, i) {
return o * (t /= i) * t + n;
},
easeOutQuad:function(e, t, n, o, i) {
return -o * (t /= i) * (t - 2) + n;
},
easeInOutQuad:function(e, t, n, o, i) {
return (t /= i / 2) < 1 ? o / 2 * t * t + n :-o / 2 * (--t * (t - 2) - 1) + n;
},
easeInCubic:function(e, t, n, o, i) {
return o * (t /= i) * t * t + n;
},
easeOutCubic:function(e, t, n, o, i) {
return o * ((t = t / i - 1) * t * t + 1) + n;
},
easeInOutCubic:function(e, t, n, o, i) {
return (t /= i / 2) < 1 ? o / 2 * t * t * t + n :o / 2 * ((t -= 2) * t * t + 2) + n;
},
easeInQuart:function(e, t, n, o, i) {
return o * (t /= i) * t * t * t + n;
},
easeOutQuart:function(e, t, n, o, i) {
return -o * ((t = t / i - 1) * t * t * t - 1) + n;
},
easeInOutQuart:function(e, t, n, o, i) {
return (t /= i / 2) < 1 ? o / 2 * t * t * t * t + n :-o / 2 * ((t -= 2) * t * t * t - 2) + n;
},
easeInQuint:function(e, t, n, o, i) {
return o * (t /= i) * t * t * t * t + n;
},
easeOutQuint:function(e, t, n, o, i) {
return o * ((t = t / i - 1) * t * t * t * t + 1) + n;
},
easeInOutQuint:function(e, t, n, o, i) {
return (t /= i / 2) < 1 ? o / 2 * t * t * t * t * t + n :o / 2 * ((t -= 2) * t * t * t * t + 2) + n;
},
easeInSine:function(e, t, n, o, i) {
return -o * Math.cos(t / i * (Math.PI / 2)) + o + n;
},
easeOutSine:function(e, t, n, o, i) {
return o * Math.sin(t / i * (Math.PI / 2)) + n;
},
easeInOutSine:function(e, t, n, o, i) {
return -o / 2 * (Math.cos(Math.PI * t / i) - 1) + n;
},
easeInExpo:function(e, t, n, o, i) {
return 0 == t ? n :o * Math.pow(2, 10 * (t / i - 1)) + n;
},
easeOutExpo:function(e, t, n, o, i) {
return t == i ? n + o :o * (-Math.pow(2, -10 * t / i) + 1) + n;
},
easeInOutExpo:function(e, t, n, o, i) {
return 0 == t ? n :t == i ? n + o :(t /= i / 2) < 1 ? o / 2 * Math.pow(2, 10 * (t - 1)) + n :o / 2 * (-Math.pow(2, -10 * --t) + 2) + n;
},
easeInCirc:function(e, t, n, o, i) {
return -o * (Math.sqrt(1 - (t /= i) * t) - 1) + n;
},
easeOutCirc:function(e, t, n, o, i) {
return o * Math.sqrt(1 - (t = t / i - 1) * t) + n;
},
easeInOutCirc:function(e, t, n, o, i) {
return (t /= i / 2) < 1 ? -o / 2 * (Math.sqrt(1 - t * t) - 1) + n :o / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
},
easeInElastic:function(e, t, n, o, i) {
var r = 1.70158, a = 0, s = o;
if (0 == t) return n;
if (1 == (t /= i)) return n + o;
if (a || (a = .3 * i), s < Math.abs(o)) {
s = o;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(o / s);
return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * i - r) * Math.PI / a)) + n;
},
easeOutElastic:function(e, t, n, o, i) {
var r = 1.70158, a = 0, s = o;
if (0 == t) return n;
if (1 == (t /= i)) return n + o;
if (a || (a = .3 * i), s < Math.abs(o)) {
s = o;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(o / s);
return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * i - r) * Math.PI / a) + o + n;
},
easeInOutElastic:function(e, t, n, o, i) {
var r = 1.70158, a = 0, s = o;
if (0 == t) return n;
if (2 == (t /= i / 2)) return n + o;
if (a || (a = .3 * i * 1.5), s < Math.abs(o)) {
s = o;
var r = a / 4;
} else var r = a / (2 * Math.PI) * Math.asin(o / s);
return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * i - r) * Math.PI / a) + n :s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * i - r) * Math.PI / a) * .5 + o + n;
},
easeInBack:function(e, t, n, o, i, r) {
return void 0 == r && (r = 1.70158), o * (t /= i) * t * ((r + 1) * t - r) + n;
},
easeOutBack:function(e, t, n, o, i, r) {
return void 0 == r && (r = 1.70158), o * ((t = t / i - 1) * t * ((r + 1) * t + r) + 1) + n;
},
easeInOutBack:function(e, t, n, o, i, r) {
return void 0 == r && (r = 1.70158), (t /= i / 2) < 1 ? o / 2 * t * t * (((r *= 1.525) + 1) * t - r) + n :o / 2 * ((t -= 2) * t * (((r *= 1.525) + 1) * t + r) + 2) + n;
},
easeInBounce:function(e, t, n, o, i) {
return o - jQuery.easing.easeOutBounce(e, i - t, 0, o, i) + n;
},
easeOutBounce:function(e, t, n, o, i) {
return (t /= i) < 1 / 2.75 ? 7.5625 * o * t * t + n :2 / 2.75 > t ? o * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n :2.5 / 2.75 > t ? o * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n :o * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n;
},
easeInOutBounce:function(e, t, n, o, i) {
return i / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, o, i) + n :.5 * jQuery.easing.easeOutBounce(e, 2 * t - i, 0, o, i) + .5 * o + n;
}
}), /*!
jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function() {
var e = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
}, t = [].slice;
!function(e, t) {
return "function" == typeof define && define.amd ? define("waypoints", [ "jquery" ], function(n) {
return t(n, e);
}) :t(e.jQuery, e);
}(window, function(n, o) {
var i, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w;
return i = n(o), d = e.call(o, "ontouchstart") >= 0, s = {
horizontal:{},
vertical:{}
}, l = 1, c = {}, u = "waypoints-context-id", g = "resize.waypoints", m = "scroll.waypoints", 
f = 1, _ = "waypoints-waypoint-ids", v = "waypoint", w = "waypoints", r = function() {
function e(e) {
var t = this;
this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, 
this.id = "context" + l++, this.oldScroll = {
x:e.scrollLeft(),
y:e.scrollTop()
}, this.waypoints = {
horizontal:{},
vertical:{}
}, this.element[u] = this.id, c[this.id] = this, e.bind(m, function() {
var e;
return t.didScroll || d ? void 0 :(t.didScroll = !0, e = function() {
return t.doScroll(), t.didScroll = !1;
}, o.setTimeout(e, n[w].settings.scrollThrottle));
}), e.bind(g, function() {
var e;
return t.didResize ? void 0 :(t.didResize = !0, e = function() {
return n[w]("refresh"), t.didResize = !1;
}, o.setTimeout(e, n[w].settings.resizeThrottle));
});
}
return e.prototype.doScroll = function() {
var e, t = this;
return e = {
horizontal:{
newScroll:this.$element.scrollLeft(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left"
},
vertical:{
newScroll:this.$element.scrollTop(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up"
}
}, !d || e.vertical.oldScroll && e.vertical.newScroll || n[w]("refresh"), n.each(e, function(e, o) {
var i, r, a;
return a = [], r = o.newScroll > o.oldScroll, i = r ? o.forward :o.backward, n.each(t.waypoints[e], function(e, t) {
var n, i;
return o.oldScroll < (n = t.offset) && n <= o.newScroll ? a.push(t) :o.newScroll < (i = t.offset) && i <= o.oldScroll ? a.push(t) :void 0;
}), a.sort(function(e, t) {
return e.offset - t.offset;
}), r || a.reverse(), n.each(a, function(e, t) {
return t.options.continuous || e === a.length - 1 ? t.trigger([ i ]) :void 0;
});
}), this.oldScroll = {
x:e.horizontal.newScroll,
y:e.vertical.newScroll
};
}, e.prototype.refresh = function() {
var e, t, o, i = this;
return o = n.isWindow(this.element), t = this.$element.offset(), this.doScroll(), 
e = {
horizontal:{
contextOffset:o ? 0 :t.left,
contextScroll:o ? 0 :this.oldScroll.x,
contextDimension:this.$element.width(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left",
offsetProp:"left"
},
vertical:{
contextOffset:o ? 0 :t.top,
contextScroll:o ? 0 :this.oldScroll.y,
contextDimension:o ? n[w]("viewportHeight") :this.$element.height(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up",
offsetProp:"top"
}
}, n.each(e, function(e, t) {
return n.each(i.waypoints[e], function(e, o) {
var i, r, a, s, l;
return i = o.options.offset, a = o.offset, r = n.isWindow(o.element) ? 0 :o.$element.offset()[t.offsetProp], 
n.isFunction(i) ? i = i.apply(o.element) :"string" == typeof i && (i = parseFloat(i), 
o.options.offset.indexOf("%") > -1 && (i = Math.ceil(t.contextDimension * i / 100))), 
o.offset = r - t.contextOffset + t.contextScroll - i, o.options.onlyOnScroll && null != a || !o.enabled ? void 0 :null !== a && a < (s = t.oldScroll) && s <= o.offset ? o.trigger([ t.backward ]) :null !== a && a > (l = t.oldScroll) && l >= o.offset ? o.trigger([ t.forward ]) :null === a && t.oldScroll >= o.offset ? o.trigger([ t.forward ]) :void 0;
});
});
}, e.prototype.checkEmpty = function() {
return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([ g, m ].join(" ")), 
delete c[this.id]) :void 0;
}, e;
}(), a = function() {
function e(e, t, o) {
var i, r;
"bottom-in-view" === o.offset && (o.offset = function() {
var e;
return e = n[w]("viewportHeight"), n.isWindow(t.element) || (e = t.$element.height()), 
e - n(this).outerHeight();
}), this.$element = e, this.element = e[0], this.axis = o.horizontal ? "horizontal" :"vertical", 
this.callback = o.handler, this.context = t, this.enabled = o.enabled, this.id = "waypoints" + f++, 
this.offset = null, this.options = o, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, 
i = null != (r = this.element[_]) ? r :[], i.push(this.id), this.element[_] = i;
}
return e.prototype.trigger = function(e) {
return this.enabled ? (null != this.callback && this.callback.apply(this.element, e), 
this.options.triggerOnce ? this.destroy() :void 0) :void 0;
}, e.prototype.disable = function() {
return this.enabled = !1;
}, e.prototype.enable = function() {
return this.context.refresh(), this.enabled = !0;
}, e.prototype.destroy = function() {
return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], 
this.context.checkEmpty();
}, e.getWaypointsByElement = function(e) {
var t, o;
return (o = e[_]) ? (t = n.extend({}, s.horizontal, s.vertical), n.map(o, function(e) {
return t[e];
})) :[];
}, e;
}(), p = {
init:function(e, t) {
var o;
return t = n.extend({}, n.fn[v].defaults, t), null == (o = t.handler) && (t.handler = e), 
this.each(function() {
var e, o, i, s;
return e = n(this), i = null != (s = t.context) ? s :n.fn[v].defaults.context, n.isWindow(i) || (i = e.closest(i)), 
i = n(i), o = c[i[0][u]], o || (o = new r(i)), new a(e, o, t);
}), n[w]("refresh"), this;
},
disable:function() {
return p._invoke.call(this, "disable");
},
enable:function() {
return p._invoke.call(this, "enable");
},
destroy:function() {
return p._invoke.call(this, "destroy");
},
prev:function(e, t) {
return p._traverse.call(this, e, t, function(e, t, n) {
return t > 0 ? e.push(n[t - 1]) :void 0;
});
},
next:function(e, t) {
return p._traverse.call(this, e, t, function(e, t, n) {
return t < n.length - 1 ? e.push(n[t + 1]) :void 0;
});
},
_traverse:function(e, t, i) {
var r, a;
return null == e && (e = "vertical"), null == t && (t = o), a = h.aggregate(t), 
r = [], this.each(function() {
var t;
return t = n.inArray(this, a[e]), i(r, t, a[e]);
}), this.pushStack(r);
},
_invoke:function(e) {
return this.each(function() {
var t;
return t = a.getWaypointsByElement(this), n.each(t, function(t, n) {
return n[e](), !0;
});
}), this;
}
}, n.fn[v] = function() {
var e, o;
return o = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], p[o] ? p[o].apply(this, e) :n.isFunction(o) ? p.init.apply(this, arguments) :n.isPlainObject(o) ? p.init.apply(this, [ null, o ]) :o ? n.error("The " + o + " method does not exist in jQuery Waypoints.") :n.error("jQuery Waypoints needs a callback function or handler option.");
}, n.fn[v].defaults = {
context:o,
continuous:!0,
enabled:!0,
horizontal:!1,
offset:0,
triggerOnce:!1
}, h = {
refresh:function() {
return n.each(c, function(e, t) {
return t.refresh();
});
},
viewportHeight:function() {
var e;
return null != (e = o.innerHeight) ? e :i.height();
},
aggregate:function(e) {
var t, o, i;
return t = s, e && (t = null != (i = c[n(e)[0][u]]) ? i.waypoints :void 0), t ? (o = {
horizontal:[],
vertical:[]
}, n.each(o, function(e, i) {
return n.each(t[e], function(e, t) {
return i.push(t);
}), i.sort(function(e, t) {
return e.offset - t.offset;
}), o[e] = n.map(i, function(e) {
return e.element;
}), o[e] = n.unique(o[e]);
}), o) :[];
},
above:function(e) {
return null == e && (e = o), h._filter(e, "vertical", function(e, t) {
return t.offset <= e.oldScroll.y;
});
},
below:function(e) {
return null == e && (e = o), h._filter(e, "vertical", function(e, t) {
return t.offset > e.oldScroll.y;
});
},
left:function(e) {
return null == e && (e = o), h._filter(e, "horizontal", function(e, t) {
return t.offset <= e.oldScroll.x;
});
},
right:function(e) {
return null == e && (e = o), h._filter(e, "horizontal", function(e, t) {
return t.offset > e.oldScroll.x;
});
},
enable:function() {
return h._invoke("enable");
},
disable:function() {
return h._invoke("disable");
},
destroy:function() {
return h._invoke("destroy");
},
extendFn:function(e, t) {
return p[e] = t;
},
_invoke:function(e) {
var t;
return t = n.extend({}, s.vertical, s.horizontal), n.each(t, function(t, n) {
return n[e](), !0;
});
},
_filter:function(e, t, o) {
var i, r;
return (i = c[n(e)[0][u]]) ? (r = [], n.each(i.waypoints[t], function(e, t) {
return o(i, t) ? r.push(t) :void 0;
}), r.sort(function(e, t) {
return e.offset - t.offset;
}), n.map(r, function(e) {
return e.element;
})) :[];
}
}, n[w] = function() {
var e, n;
return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) :[], h[n] ? h[n].apply(null, e) :h.aggregate.call(null, n);
}, n[w].settings = {
resizeThrottle:100,
scrollThrottle:30
}, i.on("load.waypoints", function() {
return n[w]("refresh");
});
});
}.call(this), function(e) {
function t() {
var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
window.console && window.console.log ? window.console.log(e) :window.opera && window.opera.postError && window.opera.postError(e);
}
e.fn.ajaxSubmit = function(n) {
function o(o) {
function r(e) {
var t = e.contentWindow ? e.contentWindow.document :e.contentDocument ? e.contentDocument :e.document;
return t;
}
function a() {
function n() {
try {
var e = r(m).readyState;
t("state = " + e), "uninitialized" == e.toLowerCase() && setTimeout(n, 50);
} catch (o) {
t("Server abort: ", o, " (", o.name, ")"), l(L), y && clearTimeout(y), y = void 0;
}
}
var o = s.attr("target"), a = s.attr("action");
b.setAttribute("target", p), i || b.setAttribute("method", "POST"), a != d.url && b.setAttribute("action", d.url), 
d.skipEncodingOverride || i && !/post/i.test(i) || s.attr({
encoding:"multipart/form-data",
enctype:"multipart/form-data"
}), d.timeout && (y = setTimeout(function() {
w = !0, l(M);
}, d.timeout));
var u = [];
try {
if (d.extraData) for (var c in d.extraData) u.push(e('<input type="hidden" name="' + c + '" />').attr("value", d.extraData[c]).appendTo(b)[0]);
d.iframeTarget || (g.appendTo("body"), m.attachEvent ? m.attachEvent("onload", l) :m.addEventListener("load", l, !1)), 
setTimeout(n, 15), b.submit();
} finally {
b.setAttribute("action", a), o ? b.setAttribute("target", o) :s.removeAttr("target"), 
e(u).remove();
}
}
function l(n) {
if (!f.aborted && !x) {
try {
T = r(m);
} catch (o) {
t("cannot access response document: ", o), n = L;
}
if (n === M && f) return f.abort("timeout"), void 0;
if (n == L && f) return f.abort("server abort"), void 0;
if (T && T.location.href != d.iframeSrc || w) {
m.detachEvent ? m.detachEvent("onload", l) :m.removeEventListener("load", l, !1);
var i, a = "success";
try {
if (w) throw "timeout";
var s = "xml" == d.dataType || T.XMLDocument || e.isXMLDoc(T);
if (t("isXml=" + s), !s && window.opera && (null == T.body || "" == T.body.innerHTML) && --D) return t("requeing onLoad callback, DOM not available"), 
setTimeout(l, 250), void 0;
var u = T.body ? T.body :T.documentElement;
f.responseText = u ? u.innerHTML :null, f.responseXML = T.XMLDocument ? T.XMLDocument :T, 
s && (d.dataType = "xml"), f.getResponseHeader = function(e) {
var t = {
"content-type":d.dataType
};
return t[e];
}, u && (f.status = Number(u.getAttribute("status")) || f.status, f.statusText = u.getAttribute("statusText") || f.statusText);
var c = d.dataType || "", p = /(json|script|text)/.test(c.toLowerCase());
if (p || d.textarea) {
var _ = T.getElementsByTagName("textarea")[0];
if (_) f.responseText = _.value, f.status = Number(_.getAttribute("status")) || f.status, 
f.statusText = _.getAttribute("statusText") || f.statusText; else if (p) {
var v = T.getElementsByTagName("pre")[0], b = T.getElementsByTagName("body")[0];
v ? f.responseText = v.textContent ? v.textContent :v.innerHTML :b && (f.responseText = b.innerHTML);
}
} else "xml" != d.dataType || f.responseXML || null == f.responseText || (f.responseXML = Y(f.responseText));
try {
S = C(f, d.dataType, d);
} catch (n) {
a = "parsererror", f.error = i = n || a;
}
} catch (n) {
t("error caught: ", n), a = "error", f.error = i = n || a;
}
f.aborted && (t("upload aborted"), a = null), f.status && (a = f.status >= 200 && f.status < 300 || 304 === f.status ? "success" :"error"), 
"success" === a ? (d.success && d.success.call(d.context, S, "success", f), h && e.event.trigger("ajaxSuccess", [ f, d ])) :a && (void 0 == i && (i = f.statusText), 
d.error && d.error.call(d.context, f, a, i), h && e.event.trigger("ajaxError", [ f, d, i ])), 
h && e.event.trigger("ajaxComplete", [ f, d ]), h && !--e.active && e.event.trigger("ajaxStop"), 
d.complete && d.complete.call(d.context, f, a), x = !0, d.timeout && clearTimeout(y), 
setTimeout(function() {
d.iframeTarget || g.remove(), f.responseXML = null;
}, 100);
}
}
}
var u, c, d, h, p, g, m, f, _, v, w, y, b = s[0], k = !!e.fn.prop;
if (o) for (c = 0; c < o.length; c++) u = e(b[o[c].name]), u[k ? "prop" :"attr"]("disabled", !1);
if (e(":input[name=submit],:input[id=submit]", b).length) return alert('Error: Form elements must not have name or id of "submit".'), 
void 0;
if (d = e.extend(!0, {}, e.ajaxSettings, n), d.context = d.context || d, p = "jqFormIO" + new Date().getTime(), 
d.iframeTarget ? (g = e(d.iframeTarget), v = g.attr("name"), null == v ? g.attr("name", p) :p = v) :(g = e('<iframe name="' + p + '" src="' + d.iframeSrc + '" />'), 
g.css({
position:"absolute",
top:"-1000px",
left:"-1000px"
})), m = g[0], f = {
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:"n/a",
getAllResponseHeaders:function() {},
getResponseHeader:function() {},
setRequestHeader:function() {},
abort:function(n) {
var o = "timeout" === n ? "timeout" :"aborted";
t("aborting upload... " + o), this.aborted = 1, g.attr("src", d.iframeSrc), f.error = o, 
d.error && d.error.call(d.context, f, o, n), h && e.event.trigger("ajaxError", [ f, d, o ]), 
d.complete && d.complete.call(d.context, f, o);
}
}, h = d.global, h && !e.active++ && e.event.trigger("ajaxStart"), h && e.event.trigger("ajaxSend", [ f, d ]), 
d.beforeSend && d.beforeSend.call(d.context, f, d) === !1) return d.global && e.active--, 
void 0;
if (!f.aborted) {
_ = b.clk, _ && (v = _.name, v && !_.disabled && (d.extraData = d.extraData || {}, 
d.extraData[v] = _.value, "image" == _.type && (d.extraData[v + ".x"] = b.clk_x, 
d.extraData[v + ".y"] = b.clk_y)));
var M = 1, L = 2;
d.forceSync ? a() :setTimeout(a, 10);
var S, T, x, D = 50, Y = e.parseXML || function(e, t) {
return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", 
t.loadXML(e)) :t = new DOMParser().parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t :null;
}, E = e.parseJSON || function(e) {
return window.eval("(" + e + ")");
}, C = function(t, n, o) {
var i = t.getResponseHeader("content-type") || "", r = "xml" === n || !n && i.indexOf("xml") >= 0, a = r ? t.responseXML :t.responseText;
return r && "parsererror" === a.documentElement.nodeName && e.error && e.error("parsererror"), 
o && o.dataFilter && (a = o.dataFilter(a, n)), "string" == typeof a && ("json" === n || !n && i.indexOf("json") >= 0 ? a = E(a) :("script" === n || !n && i.indexOf("javascript") >= 0) && e.globalEval(a)), 
a;
};
}
}
if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), 
this;
var i, r, a, s = this;
"function" == typeof n && (n = {
success:n
}), i = this.attr("method"), r = this.attr("action"), a = "string" == typeof r ? e.trim(r) :"", 
a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]), 
n = e.extend(!0, {
url:a,
success:e.ajaxSettings.success,
type:i || "GET",
iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" :"about:blank"
}, n);
var l = {};
if (this.trigger("form-pre-serialize", [ this, n, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), 
this;
if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), 
this;
var u, c, d = this.formToArray(n.semantic);
if (n.data) {
n.extraData = n.data;
for (u in n.data) if (n.data[u] instanceof Array) for (var h in n.data[u]) d.push({
name:u,
value:n.data[u][h]
}); else c = n.data[u], c = e.isFunction(c) ? c() :c, d.push({
name:u,
value:c
});
}
if (n.beforeSubmit && n.beforeSubmit(d, this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"), 
this;
if (this.trigger("form-submit-validate", [ d, this, n, l ]), l.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), 
this;
var p = e.param(d);
"GET" == n.type.toUpperCase() ? (n.url += (n.url.indexOf("?") >= 0 ? "&" :"?") + p, 
n.data = null) :n.data = p;
var g = [];
if (n.resetForm && g.push(function() {
s.resetForm();
}), n.clearForm && g.push(function() {
s.clearForm();
}), !n.dataType && n.target) {
var m = n.success || function() {};
g.push(function(t) {
var o = n.replaceTarget ? "replaceWith" :"html";
e(n.target)[o](t).each(m, arguments);
});
} else n.success && g.push(n.success);
n.success = function(e, t, o) {
for (var i = n.context || n, r = 0, a = g.length; a > r; r++) g[r].apply(i, [ e, t, o || s, s ]);
};
var f = e("input:file", this).length > 0, _ = "multipart/form-data", v = s.attr("enctype") == _ || s.attr("encoding") == _;
if (n.iframe !== !1 && (f || n.iframe || v)) n.closeKeepAlive ? e.get(n.closeKeepAlive, function() {
o(d);
}) :o(d); else {
if (e.browser.msie && "get" == i) {
var w = s[0].getAttribute("method");
"string" == typeof w && (n.type = w);
}
e.ajax(n);
}
return this.trigger("form-submit-notify", [ this, n ]), this;
}, e.fn.ajaxForm = function(n) {
if (0 === this.length) {
var o = {
s:this.selector,
c:this.context
};
return !e.isReady && o.s ? (t("DOM not ready, queuing ajaxForm"), e(function() {
e(o.s, o.c).ajaxForm(n);
}), this) :(t("terminating; zero elements found by selector" + (e.isReady ? "" :" (DOM not ready)")), 
this);
}
return this.ajaxFormUnbind().bind("submit.form-plugin", function(t) {
t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(n));
}).bind("click.form-plugin", function(t) {
var n = t.target, o = e(n);
if (!o.is(":submit,input:image")) {
var i = o.closest(":submit");
if (0 == i.length) return;
n = i[0];
}
var r = this;
if (r.clk = n, "image" == n.type) if (void 0 != t.offsetX) r.clk_x = t.offsetX, 
r.clk_y = t.offsetY; else if ("function" == typeof e.fn.offset) {
var a = o.offset();
r.clk_x = t.pageX - a.left, r.clk_y = t.pageY - a.top;
} else r.clk_x = t.pageX - n.offsetLeft, r.clk_y = t.pageY - n.offsetTop;
setTimeout(function() {
r.clk = r.clk_x = r.clk_y = null;
}, 100);
});
}, e.fn.ajaxFormUnbind = function() {
return this.unbind("submit.form-plugin click.form-plugin");
}, e.fn.formToArray = function(t) {
var n = [];
if (0 === this.length) return n;
var o = this[0], i = t ? o.getElementsByTagName("*") :o.elements;
if (!i) return n;
var r, a, s, l, u, c, d;
for (r = 0, c = i.length; c > r; r++) if (u = i[r], s = u.name) if (t && o.clk && "image" == u.type) u.disabled || o.clk != u || (n.push({
name:s,
value:e(u).val()
}), n.push({
name:s + ".x",
value:o.clk_x
}, {
name:s + ".y",
value:o.clk_y
})); else if (l = e.fieldValue(u, !0), l && l.constructor == Array) for (a = 0, 
d = l.length; d > a; a++) n.push({
name:s,
value:l[a]
}); else null !== l && "undefined" != typeof l && n.push({
name:s,
value:l
});
if (!t && o.clk) {
var h = e(o.clk), p = h[0];
s = p.name, s && !p.disabled && "image" == p.type && (n.push({
name:s,
value:h.val()
}), n.push({
name:s + ".x",
value:o.clk_x
}, {
name:s + ".y",
value:o.clk_y
}));
}
return n;
}, e.fn.formSerialize = function(t) {
return e.param(this.formToArray(t));
}, e.fn.fieldSerialize = function(t) {
var n = [];
return this.each(function() {
var o = this.name;
if (o) {
var i = e.fieldValue(this, t);
if (i && i.constructor == Array) for (var r = 0, a = i.length; a > r; r++) n.push({
name:o,
value:i[r]
}); else null !== i && "undefined" != typeof i && n.push({
name:this.name,
value:i
});
}
}), e.param(n);
}, e.fn.fieldValue = function(t) {
for (var n = [], o = 0, i = this.length; i > o; o++) {
var r = this[o], a = e.fieldValue(r, t);
null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? e.merge(n, a) :n.push(a));
}
return n;
}, e.fieldValue = function(t, n) {
var o = t.name, i = t.type, r = t.tagName.toLowerCase();
if (void 0 === n && (n = !0), n && (!o || t.disabled || "reset" == i || "button" == i || ("checkbox" == i || "radio" == i) && !t.checked || ("submit" == i || "image" == i) && t.form && t.form.clk != t || "select" == r && -1 == t.selectedIndex)) return null;
if ("select" == r) {
var a = t.selectedIndex;
if (0 > a) return null;
for (var s = [], l = t.options, u = "select-one" == i, c = u ? a + 1 :l.length, d = u ? a :0; c > d; d++) {
var h = l[d];
if (h.selected) {
var p = h.value;
if (p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text :h.value), 
u) return p;
s.push(p);
}
}
return s;
}
return e(t).val();
}, e.fn.clearForm = function() {
return this.each(function() {
e("input,select,textarea", this).clearFields();
});
}, e.fn.clearFields = e.fn.clearInputs = function() {
var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function() {
var t = this.type, n = this.tagName.toLowerCase();
e.test(t) || "textarea" == n ? this.value = "" :"checkbox" == t || "radio" == t ? this.checked = !1 :"select" == n && (this.selectedIndex = -1);
});
}, e.fn.resetForm = function() {
return this.each(function() {
("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
});
}, e.fn.enable = function(e) {
return void 0 === e && (e = !0), this.each(function() {
this.disabled = !e;
});
}, e.fn.selected = function(t) {
return void 0 === t && (t = !0), this.each(function() {
var n = this.type;
if ("checkbox" == n || "radio" == n) this.checked = t; else if ("option" == this.tagName.toLowerCase()) {
var o = e(this).parent("select");
t && o[0] && "select-one" == o[0].type && o.find("option").selected(!1), this.selected = t;
}
});
};
}(jQuery), +function(e) {
"use strict";
var t = function(e, t) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", e, t);
};
t.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:"body",
callback:function() {}
}, t.prototype.init = function(t, n, o) {
this.enabled = !0, this.type = t, this.$element = e(n), this.options = this.getOptions(o);
for (var i = this.options.trigger.split(" "), r = i.length; r--; ) {
var a = i[r];
if ("click" == a) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)); else if ("manual" != a) {
var s = "hover" == a ? "mouseenter" :"focus", l = "hover" == a ? "mouseleave" :"blur";
this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)), 
this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this));
}
}
this.options.selector ? this._options = e.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.getOptions = function(t) {
return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
show:t.delay,
hide:t.delay
}), t;
}, t.prototype.getDelegateOptions = function() {
var t = {}, n = this.getDefaults();
return this._options && e.each(this._options, function(e, o) {
n[e] != o && (t[e] = o);
}), t;
}, t.prototype.enter = function(t) {
var n = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function() {
"in" == n.hoverState && n.show();
}, n.options.delay.show), void 0) :n.show();
}, t.prototype.leave = function(t) {
var n = t instanceof this.constructor ? t :e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function() {
"out" == n.hoverState && n.hide();
}, n.options.delay.hide), void 0) :n.hide();
}, t.prototype.show = function() {
var t = e.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
if (this.$element.trigger(t), t.isDefaultPrevented()) return;
var n = this.tip();
this.setContent(), this.options.animation && n.addClass("fade");
var o = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) :this.options.placement, i = /\s?auto?\s?/i, r = i.test(o);
r && (o = o.replace(i, "") || "top"), n.detach().css({
top:0,
left:0,
display:"block"
}).addClass(o), this.options.container ? n.appendTo(this.options.container) :n.insertAfter(this.$element);
var a = this.getPosition(), s = n[0].offsetWidth, l = n[0].offsetHeight;
if (r) {
var u = this.$element.parent(), c = o, d = document.documentElement.scrollTop || document.body.scrollTop, h = "body" == this.options.container ? window.innerWidth :u.outerWidth(), p = "body" == this.options.container ? window.innerHeight :u.outerHeight(), g = "body" == this.options.container ? 0 :u.offset().left;
o = "bottom" == o && a.top + a.height + l - d > p ? "top" :"top" == o && a.top - d - l < 0 ? "bottom" :"right" == o && a.right + s > h ? "left" :"left" == o && a.left - s < g ? "right" :o, 
n.removeClass(c).addClass(o);
}
var m = this.getCalculatedOffset(o, a, s, l);
this.applyPlacement(m, o), this.$element.trigger("shown.bs." + this.type), "function" == typeof this.options.callback && this.options.callback.call(this.$element, this.tip());
}
}, t.prototype.applyPlacement = function(e, t) {
var n, o = this.tip(), i = o[0].offsetWidth, r = o[0].offsetHeight, a = parseInt(o.css("margin-top"), 10), s = parseInt(o.css("margin-left"), 10);
isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top = e.top + a, e.left = e.left + s, 
o.offset(e).addClass("in");
var l = o[0].offsetWidth, u = o[0].offsetHeight;
if ("top" == t && u != r && (n = !0, e.top = e.top + r - u), /bottom|top/.test(t)) {
var c = 0;
e.left < 0 && (c = -2 * e.left, e.left = 0, o.offset(e), l = o[0].offsetWidth, u = o[0].offsetHeight), 
this.replaceArrow(c - i + l, l, "left");
} else this.replaceArrow(u - r, u, "top");
n && o.offset(e);
}, t.prototype.replaceArrow = function(e, t, n) {
this.arrow().css(n, e ? 50 * (1 - e / t) + "%" :"");
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle();
e.find(".tooltip-inner")[this.options.html ? "html" :"text"](t), e.removeClass("fade in top bottom left right");
}, t.prototype.hide = function() {
function t() {
"in" != n.hoverState && o.detach();
}
var n = this, o = this.tip(), i = e.Event("hide.bs." + this.type);
return this.$element.trigger(i), o.hide(), i.isDefaultPrevented() ? void 0 :(o.removeClass("in"), 
e.support.transition && this.$tip.hasClass("fade") ? o.one(e.support.transition.end, t).emulateTransitionEnd(150) :t(), 
this.$element.trigger("hidden.bs." + this.type), this);
}, t.prototype.fixTitle = function() {
var e = this.$element;
(e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "");
}, t.prototype.hasContent = function() {
return this.getTitle();
}, t.prototype.getPosition = function() {
var t = this.$element[0];
return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() :{
width:t.offsetWidth,
height:t.offsetHeight
}, this.$element.offset());
}, t.prototype.getCalculatedOffset = function(e, t, n, o) {
return "bottom" == e ? {
top:t.top + t.height,
left:t.left + t.width / 2 - n / 2
} :"top" == e ? {
top:t.top - o,
left:t.left + t.width / 2 - n / 2
} :"left" == e ? {
top:t.top + t.height / 2 - o / 2,
left:t.left - n
} :{
top:t.top + t.height / 2 - o / 2,
left:t.left + t.width
};
}, t.prototype.getTitle = function() {
var e, t = this.$element, n = this.options;
return e = "function" == typeof n.title ? n.title.call(t[0]) :t.attr("data-original-title") || n.title;
}, t.prototype.tip = function() {
return this.$tip = this.$tip || e(this.options.template);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, t.prototype.validate = function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
}, t.prototype.enable = function() {
this.enabled = !0;
}, t.prototype.disable = function() {
this.enabled = !1;
}, t.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, t.prototype.toggle = function(t) {
var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
n.tip().hasClass("in") ? n.leave(n) :n.enter(n);
}, t.prototype.destroy = function() {
this.hide().$element.off("." + this.type).removeData("bs." + this.type);
};
var n = e.fn.tooltip;
e.fn.tooltip = function(n) {
return this.each(function() {
var o = e(this), i = o.data("bs.tooltip"), r = "object" == typeof n && n;
i || o.data("bs.tooltip", i = new t(this, r)), "string" == typeof n && i[n]();
});
}, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
return e.fn.tooltip = n, this;
};
}(jQuery), /* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(e) {
"use strict";
var t = function(e, t) {
this.init("popover", e, t);
};
if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
placement:"right",
trigger:"click",
content:"",
template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, 
t.prototype.getDefaults = function() {
return t.DEFAULTS;
}, t.prototype.setContent = function() {
var e = this.tip(), t = this.getTitle(), n = this.getContent();
e.find(".popover-title")[this.options.html ? "html" :"text"](t), e.find(".popover-content")[this.options.html ? "html" :"text"](n), 
e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide();
}, t.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
}, t.prototype.getContent = function() {
var e = this.$element, t = this.options;
return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) :t.content);
}, t.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".arrow");
}, t.prototype.tip = function() {
return this.$tip || (this.$tip = e(this.options.template)), this.$tip;
};
var n = e.fn.popover;
e.fn.popover = function(n) {
return this.each(function() {
var o = e(this), i = o.data("bs.popover"), r = "object" == typeof n && n;
i || o.data("bs.popover", i = new t(this, r)), "string" == typeof n && i[n]();
});
}, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
return e.fn.popover = n, this;
};
}(jQuery), /*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
function(e, t, n) {
"$:nomunge";
function o(e) {
return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1");
}
var i, r = "hashchange", a = document, s = e.event.special, l = a.documentMode, u = "on" + r in t && (l === n || l > 7);
e.fn[r] = function(e) {
return e ? this.bind(r, e) :this.trigger(r);
}, e.fn[r].delay = 50, s[r] = e.extend(s[r], {
setup:function() {
return u ? !1 :(e(i.start), void 0);
},
teardown:function() {
return u ? !1 :(e(i.stop), void 0);
}
}), i = function() {
function i() {
var n = o(), a = p(c);
n !== c ? (h(c = n, a), e(t).trigger(r)) :a !== c && (location.href = location.href.replace(/#.*/, "") + a), 
s = setTimeout(i, e.fn[r].delay);
}
var s, l = {}, c = o(), d = function(e) {
return e;
}, h = d, p = d;
return l.start = function() {
s || i();
}, l.stop = function() {
s && clearTimeout(s), s = n;
}, e.browser.msie && !u && function() {
var t, n;
l.start = function() {
t || (n = e.fn[r].src, n = n && n + o(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
n || h(o()), i();
}).attr("src", n || "javascript:void(0)").insertAfter("body")[0].contentWindow, 
a.onpropertychange = function() {
try {
"title" === event.propertyName && (t.document.title = a.title);
} catch (e) {}
});
}, l.stop = d, p = function() {
return o(t.location.href);
}, h = function(n, o) {
var i = t.document, s = e.fn[r].domain;
n !== o && (i.title = a.title, i.open(), s && i.write('<script>document.domain="' + s + '"</script>'), 
i.close(), t.location.hash = n);
};
}(), l;
}();
}(jQuery, this), !function(e) {
var t = "waitForImages";
e.waitForImages = {
hasImageProperties:[ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor" ]
}, e.expr[":"].uncached = function(t) {
if (!e(t).is('img[src!=""]')) return !1;
var n = new Image();
return n.src = t.src, !n.complete;
}, e.fn.waitForImages = function(n, o, i) {
var r = 0, a = 0;
if (e.isPlainObject(arguments[0]) && (i = arguments[0].waitForAll, o = arguments[0].each, 
n = arguments[0].finished), n = n || e.noop, o = o || e.noop, i = !!i, !e.isFunction(n) || !e.isFunction(o)) throw new TypeError("An invalid callback was supplied.");
return this.each(function() {
var s = e(this), l = [], u = e.waitForImages.hasImageProperties || [], c = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
i ? s.find("*").addBack().each(function() {
var t = e(this);
t.is("img:uncached") && l.push({
src:t.attr("src"),
element:t[0]
}), e.each(u, function(e, n) {
var o, i = t.css(n);
if (!i) return !0;
for (;o = c.exec(i); ) l.push({
src:o[2],
element:t[0]
});
});
}) :s.find("img:uncached").each(function() {
l.push({
src:this.src,
element:this
});
}), r = l.length, a = 0, 0 === r && n.call(s[0]), e.each(l, function(i, l) {
var u = new Image();
e(u).on("load." + t + " error." + t, function(e) {
return a++, o.call(l.element, a, r, "load" == e.type), a == r ? (n.call(s[0]), !1) :void 0;
}), u.src = l.src;
});
});
};
}(jQuery), /*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
function(e, t, n, o) {
var i = e(t);
e.fn.lazyload = function(r) {
function a() {
var t = 0;
l.each(function() {
var n = e(this);
if (!u.skip_invisible || n.is(":visible")) if (e.abovethetop(this, u) || e.leftofbegin(this, u)) ; else if (e.belowthefold(this, u) || e.rightoffold(this, u)) {
if (++t > u.failure_limit) return !1;
} else n.trigger("appear"), t = 0;
});
}
var s, l = this, u = {
threshold:0,
failure_limit:0,
event:"scroll",
effect:"show",
container:t,
data_attribute:"original",
skip_invisible:!0,
appear:null,
load:null
};
return r && (o !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), 
o !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(u, r)), 
s = u.container === o || u.container === t ? i :e(u.container), 0 === u.event.indexOf("scroll") && s.bind(u.event, function() {
return a();
}), this.each(function() {
var t = this, n = e(t);
t.loaded = !1, n.one("appear", function() {
if (!this.loaded) {
if (u.appear) {
var o = l.length;
u.appear.call(t, o, u);
}
if (n.data("background")) {
var i = n.data("background");
n.css("backgroundImage", "url(" + i + ")");
} else {
var i = n.data(u.data_attribute);
e("<img />").bind("load", function() {
n.hide().attr("src", i).on("load", function() {
n.trigger("afterAppear");
}), n[u.effect](u.effect_speed), t.loaded = !0;
var o = e.grep(l, function(e) {
return !e.loaded;
});
if (l = e(o), u.load) {
var r = l.length;
u.load.call(t, r, u);
}
}).attr("src", i);
}
}
}), 0 !== u.event.indexOf("scroll") && n.bind(u.event, function() {
t.loaded || n.trigger("appear");
});
}), i.bind("resize", function() {
a();
}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && i.bind("pageshow", function(t) {
t.originalEvent && t.originalEvent.persisted && l.each(function() {
e(this).trigger("appear");
});
}), e(n).ready(function() {
a();
}), this;
}, e.belowthefold = function(n, r) {
var a;
return a = r.container === o || r.container === t ? i.height() + i.scrollTop() :e(r.container).offset().top + e(r.container).height(), 
a <= e(n).offset().top - r.threshold;
}, e.rightoffold = function(n, r) {
var a;
return a = r.container === o || r.container === t ? i.width() + i.scrollLeft() :e(r.container).offset().left + e(r.container).width(), 
a <= e(n).offset().left - r.threshold;
}, e.abovethetop = function(n, r) {
var a;
return a = r.container === o || r.container === t ? i.scrollTop() :e(r.container).offset().top, 
a >= e(n).offset().top + r.threshold + e(n).height();
}, e.leftofbegin = function(n, r) {
var a;
return a = r.container === o || r.container === t ? i.scrollLeft() :e(r.container).offset().left, 
a >= e(n).offset().left + r.threshold + e(n).width();
}, e.inviewport = function(t, n) {
return !(e.rightoffold(t, n) || e.leftofbegin(t, n) || e.belowthefold(t, n) || e.abovethetop(t, n));
}, e.extend(e.expr[":"], {
"below-the-fold":function(t) {
return e.belowthefold(t, {
threshold:0
});
},
"above-the-top":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-screen":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-screen":function(t) {
return !e.rightoffold(t, {
threshold:0
});
},
"in-viewport":function(t) {
return e.inviewport(t, {
threshold:0
});
},
"above-the-fold":function(t) {
return !e.belowthefold(t, {
threshold:0
});
},
"right-of-fold":function(t) {
return e.rightoffold(t, {
threshold:0
});
},
"left-of-fold":function(t) {
return !e.rightoffold(t, {
threshold:0
});
}
});
}(jQuery, window, document), function(e) {
"function" == typeof define && define.amd ? define(e) :window.purl = e();
}(function() {
function e(e, t) {
for (var n = decodeURI(e), o = m[t ? "strict" :"loose"].exec(n), i = {
attr:{},
param:{},
seg:{}
}, a = 14; a--; ) i.attr[p[a]] = o[a] || "";
return i.param.query = r(i.attr.query), i.param.fragment = r(i.attr.fragment), i.seg.path = i.attr.path.replace(/^\/+|\/+$/g, "").split("/"), 
i.seg.fragment = i.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), i.attr.base = i.attr.host ? (i.attr.protocol ? i.attr.protocol + "://" + i.attr.host :i.attr.host) + (i.attr.port ? ":" + i.attr.port :"") :"", 
i;
}
function t(e) {
var t = e.tagName;
return "undefined" != typeof t ? h[t.toLowerCase()] :t;
}
function n(e, t) {
if (0 === e[t].length) return e[t] = {};
var n = {};
for (var o in e[t]) n[o] = e[t][o];
return e[t] = n, n;
}
function o(e, t, i, r) {
var a = e.shift();
if (a) {
var s = t[i] = t[i] || [];
"]" == a ? u(s) ? "" !== r && s.push(r) :"object" == typeof s ? s[c(s).length] = r :s = t[i] = [ t[i], r ] :~a.indexOf("]") ? (a = a.substr(0, a.length - 1), 
!f.test(a) && u(s) && (s = n(t, i)), o(e, s, a, r)) :(!f.test(a) && u(s) && (s = n(t, i)), 
o(e, s, a, r));
} else u(t[i]) ? t[i].push(r) :t[i] = "object" == typeof t[i] ? r :"undefined" == typeof t[i] ? r :[ t[i], r ];
}
function i(e, t, n) {
if (~t.indexOf("]")) {
var i = t.split("[");
o(i, e, "base", n);
} else {
if (!f.test(t) && u(e.base)) {
var r = {};
for (var s in e.base) r[s] = e.base[s];
e.base = r;
}
"" !== t && a(e.base, t, n);
}
return e;
}
function r(e) {
return l(String(e).split(/&|;/), function(e, t) {
try {
t = decodeURIComponent(t.replace(/\+/g, " "));
} catch (n) {}
var o = t.indexOf("="), r = s(t), a = t.substr(0, r || o), l = t.substr(r || o, t.length);
return l = l.substr(l.indexOf("=") + 1, l.length), "" === a && (a = t, l = ""), 
i(e, a, l);
}, {
base:{}
}).base;
}
function a(e, t, n) {
var o = e[t];
"undefined" == typeof o ? e[t] = n :u(o) ? o.push(n) :e[t] = [ o, n ];
}
function s(e) {
for (var t, n, o = e.length, i = 0; o > i; ++i) if (n = e[i], "]" == n && (t = !1), 
"[" == n && (t = !0), "=" == n && !t) return i;
}
function l(e, t) {
for (var n = 0, o = e.length >> 0, i = arguments[2]; o > n; ) n in e && (i = t.call(void 0, i, e[n], n, e)), 
++n;
return i;
}
function u(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function c(e) {
var t = [];
for (var n in e) e.hasOwnProperty(n) && t.push(n);
return t;
}
function d(t, n) {
return 1 === arguments.length && t === !0 && (n = !0, t = void 0), n = n || !1, 
t = t || window.location.toString(), {
data:e(t, n),
attr:function(e) {
return e = g[e] || e, "undefined" != typeof e ? this.data.attr[e] :this.data.attr;
},
param:function(e) {
return "undefined" != typeof e ? this.data.param.query[e] :this.data.param.query;
},
fparam:function(e) {
return "undefined" != typeof e ? this.data.param.fragment[e] :this.data.param.fragment;
},
segment:function(e) {
return "undefined" == typeof e ? this.data.seg.path :(e = 0 > e ? this.data.seg.path.length + e :e - 1, 
this.data.seg.path[e]);
},
fsegment:function(e) {
return "undefined" == typeof e ? this.data.seg.fragment :(e = 0 > e ? this.data.seg.fragment.length + e :e - 1, 
this.data.seg.fragment[e]);
}
};
}
var h = {
a:"href",
img:"src",
form:"action",
base:"href",
script:"src",
iframe:"src",
link:"href",
embed:"src",
object:"data"
}, p = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment" ], g = {
anchor:"fragment"
}, m = {
strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
}, f = /^[0-9]+$/;
return d.jQuery = function(e) {
null != e && (e.fn.url = function(n) {
var o = "";
return this.length && (o = e(this).attr(t(this[0])) || ""), d(o, n);
}, e.url = d);
}, d.jQuery(window.jQuery), d;
}), /*!
 * jQuery UI Core 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
function(e, t) {
function n(t, n) {
var i, r, a, s = t.nodeName.toLowerCase();
return "area" === s ? (i = t.parentNode, r = i.name, t.href && r && "map" === i.nodeName.toLowerCase() ? (a = e("img[usemap=#" + r + "]")[0], 
!!a && o(a)) :!1) :(/input|select|textarea|button|object/.test(s) ? !t.disabled :"a" === s ? t.href || n :n) && o(t);
}
function o(t) {
return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
return "hidden" === e.css(this, "visibility");
}).length;
}
var i = 0, r = /^ui-id-\d+$/;
e.ui = e.ui || {}, e.extend(e.ui, {
version:"1.10.3",
keyCode:{
BACKSPACE:8,
COMMA:188,
DELETE:46,
DOWN:40,
END:35,
ENTER:13,
ESCAPE:27,
HOME:36,
LEFT:37,
NUMPAD_ADD:107,
NUMPAD_DECIMAL:110,
NUMPAD_DIVIDE:111,
NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,
PAGE_DOWN:34,
PAGE_UP:33,
PERIOD:190,
RIGHT:39,
SPACE:32,
TAB:9,
UP:38
}
}), e.fn.extend({
focus:function(t) {
return function(n, o) {
return "number" == typeof n ? this.each(function() {
var t = this;
setTimeout(function() {
e(t).focus(), o && o.call(t);
}, n);
}) :t.apply(this, arguments);
};
}(e.fn.focus),
scrollParent:function() {
var t;
return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
}).eq(0) :this.parents().filter(function() {
return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"));
}).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) :t;
},
zIndex:function(n) {
if (n !== t) return this.css("zIndex", n);
if (this.length) for (var o, i, r = e(this[0]); r.length && r[0] !== document; ) {
if (o = r.css("position"), ("absolute" === o || "relative" === o || "fixed" === o) && (i = parseInt(r.css("zIndex"), 10), 
!isNaN(i) && 0 !== i)) return i;
r = r.parent();
}
return 0;
},
uniqueId:function() {
return this.each(function() {
this.id || (this.id = "ui-id-" + ++i);
});
},
removeUniqueId:function() {
return this.each(function() {
r.test(this.id) && e(this).removeAttr("id");
});
}
}), e.extend(e.expr[":"], {
data:e.expr.createPseudo ? e.expr.createPseudo(function(t) {
return function(n) {
return !!e.data(n, t);
};
}) :function(t, n, o) {
return !!e.data(t, o[3]);
},
focusable:function(t) {
return n(t, !isNaN(e.attr(t, "tabindex")));
},
tabbable:function(t) {
var o = e.attr(t, "tabindex"), i = isNaN(o);
return (i || o >= 0) && n(t, !i);
}
}), e("<a>").outerWidth(1).jquery || e.each([ "Width", "Height" ], function(n, o) {
function i(t, n, o, i) {
return e.each(r, function() {
n -= parseFloat(e.css(t, "padding" + this)) || 0, o && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), 
i && (n -= parseFloat(e.css(t, "margin" + this)) || 0);
}), n;
}
var r = "Width" === o ? [ "Left", "Right" ] :[ "Top", "Bottom" ], a = o.toLowerCase(), s = {
innerWidth:e.fn.innerWidth,
innerHeight:e.fn.innerHeight,
outerWidth:e.fn.outerWidth,
outerHeight:e.fn.outerHeight
};
e.fn["inner" + o] = function(n) {
return n === t ? s["inner" + o].call(this) :this.each(function() {
e(this).css(a, i(this, n) + "px");
});
}, e.fn["outer" + o] = function(t, n) {
return "number" != typeof t ? s["outer" + o].call(this, t) :this.each(function() {
e(this).css(a, i(this, t, !0, n) + "px");
});
};
}), e.fn.addBack || (e.fn.addBack = function(e) {
return this.add(null == e ? this.prevObject :this.prevObject.filter(e));
}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
return function(n) {
return arguments.length ? t.call(this, e.camelCase(n)) :t.call(this);
};
}(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
disableSelection:function() {
return this.bind((e.support.selectstart ? "selectstart" :"mousedown") + ".ui-disableSelection", function(e) {
e.preventDefault();
});
},
enableSelection:function() {
return this.unbind(".ui-disableSelection");
}
}), e.extend(e.ui, {
plugin:{
add:function(t, n, o) {
var i, r = e.ui[t].prototype;
for (i in o) r.plugins[i] = r.plugins[i] || [], r.plugins[i].push([ n, o[i] ]);
},
call:function(e, t, n) {
var o, i = e.plugins[t];
if (i && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType) for (o = 0; o < i.length; o++) e.options[i[o][0]] && i[o][1].apply(e.element, n);
}
},
hasScroll:function(t, n) {
if ("hidden" === e(t).css("overflow")) return !1;
var o = n && "left" === n ? "scrollLeft" :"scrollTop", i = !1;
return t[o] > 0 ? !0 :(t[o] = 1, i = t[o] > 0, t[o] = 0, i);
}
});
}(jQuery), /*!
 * jQuery UI Widget 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(e, t) {
var n = 0, o = Array.prototype.slice, i = e.cleanData;
e.cleanData = function(t) {
for (var n, o = 0; null != (n = t[o]); o++) try {
e(n).triggerHandler("remove");
} catch (r) {}
i(t);
}, e.widget = function(t, n, o) {
var i, r, a, s, l = {}, u = t.split(".")[0];
t = t.split(".")[1], i = u + "-" + t, o || (o = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
return !!e.data(t, i);
}, e[u] = e[u] || {}, r = e[u][t], a = e[u][t] = function(e, t) {
return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) :new a(e, t);
}, e.extend(a, r, {
version:o.version,
_proto:e.extend({}, o),
_childConstructors:[]
}), s = new n(), s.options = e.widget.extend({}, s.options), e.each(o, function(t, o) {
return e.isFunction(o) ? (l[t] = function() {
var e = function() {
return n.prototype[t].apply(this, arguments);
}, i = function(e) {
return n.prototype[t].apply(this, e);
};
return function() {
var t, n = this._super, r = this._superApply;
return this._super = e, this._superApply = i, t = o.apply(this, arguments), this._super = n, 
this._superApply = r, t;
};
}(), void 0) :(l[t] = o, void 0);
}), a.prototype = e.widget.extend(s, {
widgetEventPrefix:r ? s.widgetEventPrefix :t
}, l, {
constructor:a,
namespace:u,
widgetName:t,
widgetFullName:i
}), r ? (e.each(r._childConstructors, function(t, n) {
var o = n.prototype;
e.widget(o.namespace + "." + o.widgetName, a, n._proto);
}), delete r._childConstructors) :n._childConstructors.push(a), e.widget.bridge(t, a);
}, e.widget.extend = function(n) {
for (var i, r, a = o.call(arguments, 1), s = 0, l = a.length; l > s; s++) for (i in a[s]) r = a[s][i], 
a[s].hasOwnProperty(i) && r !== t && (n[i] = e.isPlainObject(r) ? e.isPlainObject(n[i]) ? e.widget.extend({}, n[i], r) :e.widget.extend({}, r) :r);
return n;
}, e.widget.bridge = function(n, i) {
var r = i.prototype.widgetFullName || n;
e.fn[n] = function(a) {
var s = "string" == typeof a, l = o.call(arguments, 1), u = this;
return a = !s && l.length ? e.widget.extend.apply(null, [ a ].concat(l)) :a, s ? this.each(function() {
var o, i = e.data(this, r);
return i ? e.isFunction(i[a]) && "_" !== a.charAt(0) ? (o = i[a].apply(i, l), o !== i && o !== t ? (u = o && o.jquery ? u.pushStack(o.get()) :o, 
!1) :void 0) :e.error("no such method '" + a + "' for " + n + " widget instance") :e.error("cannot call methods on " + n + " prior to initialization; attempted to call method '" + a + "'");
}) :this.each(function() {
var t = e.data(this, r);
t ? t.option(a || {})._init() :e.data(this, r, new i(a, this));
}), u;
};
}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
widgetName:"widget",
widgetEventPrefix:"",
defaultElement:"<div>",
options:{
disabled:!1,
create:null
},
_createWidget:function(t, o) {
o = e(o || this.defaultElement || this)[0], this.element = e(o), this.uuid = n++, 
this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), 
this.bindings = e(), this.hoverable = e(), this.focusable = e(), o !== this && (e.data(o, this.widgetFullName, this), 
this._on(!0, this.element, {
remove:function(e) {
e.target === o && this.destroy();
}
}), this.document = e(o.style ? o.ownerDocument :o.document || o), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), 
this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
},
_getCreateOptions:e.noop,
_getCreateEventData:e.noop,
_create:e.noop,
_init:e.noop,
destroy:function() {
this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), 
this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), 
this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
this.focusable.removeClass("ui-state-focus");
},
_destroy:e.noop,
widget:function() {
return this.element;
},
option:function(n, o) {
var i, r, a, s = n;
if (0 === arguments.length) return e.widget.extend({}, this.options);
if ("string" == typeof n) if (s = {}, i = n.split("."), n = i.shift(), i.length) {
for (r = s[n] = e.widget.extend({}, this.options[n]), a = 0; a < i.length - 1; a++) r[i[a]] = r[i[a]] || {}, 
r = r[i[a]];
if (n = i.pop(), o === t) return r[n] === t ? null :r[n];
r[n] = o;
} else {
if (o === t) return this.options[n] === t ? null :this.options[n];
s[n] = o;
}
return this._setOptions(s), this;
},
_setOptions:function(e) {
var t;
for (t in e) this._setOption(t, e[t]);
return this;
},
_setOption:function(e, t) {
return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), 
this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), 
this;
},
enable:function() {
return this._setOption("disabled", !1);
},
disable:function() {
return this._setOption("disabled", !0);
},
_on:function(t, n, o) {
var i, r = this;
"boolean" != typeof t && (o = n, n = t, t = !1), o ? (n = i = e(n), this.bindings = this.bindings.add(n)) :(o = n, 
n = this.element, i = this.widget()), e.each(o, function(o, a) {
function s() {
return t || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] :a).apply(r, arguments) :void 0;
}
"string" != typeof a && (s.guid = a.guid = a.guid || s.guid || e.guid++);
var l = o.match(/^(\w+)\s*(.*)$/), u = l[1] + r.eventNamespace, c = l[2];
c ? i.delegate(c, u, s) :n.bind(u, s);
});
},
_off:function(e, t) {
t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
e.unbind(t).undelegate(t);
},
_delay:function(e, t) {
function n() {
return ("string" == typeof e ? o[e] :e).apply(o, arguments);
}
var o = this;
return setTimeout(n, t || 0);
},
_hoverable:function(t) {
this.hoverable = this.hoverable.add(t), this._on(t, {
mouseenter:function(t) {
e(t.currentTarget).addClass("ui-state-hover");
},
mouseleave:function(t) {
e(t.currentTarget).removeClass("ui-state-hover");
}
});
},
_focusable:function(t) {
this.focusable = this.focusable.add(t), this._on(t, {
focusin:function(t) {
e(t.currentTarget).addClass("ui-state-focus");
},
focusout:function(t) {
e(t.currentTarget).removeClass("ui-state-focus");
}
});
},
_trigger:function(t, n, o) {
var i, r, a = this.options[t];
if (o = o || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t :this.widgetEventPrefix + t).toLowerCase(), 
n.target = this.element[0], r = n.originalEvent) for (i in r) i in n || (n[i] = r[i]);
return this.element.trigger(n, o), !(e.isFunction(a) && a.apply(this.element[0], [ n ].concat(o)) === !1 || n.isDefaultPrevented());
}
}, e.each({
show:"fadeIn",
hide:"fadeOut"
}, function(t, n) {
e.Widget.prototype["_" + t] = function(o, i, r) {
"string" == typeof i && (i = {
effect:i
});
var a, s = i ? i === !0 || "number" == typeof i ? n :i.effect || n :t;
i = i || {}, "number" == typeof i && (i = {
duration:i
}), a = !e.isEmptyObject(i), i.complete = r, i.delay && o.delay(i.delay), a && e.effects && e.effects.effect[s] ? o[t](i) :s !== t && o[s] ? o[s](i.duration, i.easing, r) :o.queue(function(n) {
e(this)[t](), r && r.call(o[0]), n();
});
};
});
}(jQuery), /*!
 * jQuery UI Mouse 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
function(e) {
var t = !1;
e(document).mouseup(function() {
t = !1;
}), e.widget("ui.mouse", {
version:"1.10.3",
options:{
cancel:"input,textarea,button,select,option",
distance:1,
delay:0
},
_mouseInit:function() {
var t = this;
this.element.bind("mousedown." + this.widgetName, function(e) {
return t._mouseDown(e);
}).bind("click." + this.widgetName, function(n) {
return !0 === e.data(n.target, t.widgetName + ".preventClickEvent") ? (e.removeData(n.target, t.widgetName + ".preventClickEvent"), 
n.stopImmediatePropagation(), !1) :void 0;
}), this.started = !1;
},
_mouseDestroy:function() {
this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
},
_mouseDown:function(n) {
if (!t) {
this._mouseStarted && this._mouseUp(n), this._mouseDownEvent = n;
var o = this, i = 1 === n.which, r = "string" == typeof this.options.cancel && n.target.nodeName ? e(n.target).closest(this.options.cancel).length :!1;
return i && !r && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, 
this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
o.mouseDelayMet = !0;
}, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, 
!this._mouseStarted) ? (n.preventDefault(), !0) :(!0 === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent"), 
this._mouseMoveDelegate = function(e) {
return o._mouseMove(e);
}, this._mouseUpDelegate = function(e) {
return o._mouseUp(e);
}, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
n.preventDefault(), t = !0, !0)) :!0;
}
},
_mouseMove:function(t) {
return e.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button ? this._mouseUp(t) :this._mouseStarted ? (this._mouseDrag(t), 
t.preventDefault()) :(this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, 
this._mouseStarted ? this._mouseDrag(t) :this._mouseUp(t)), !this._mouseStarted);
},
_mouseUp:function(t) {
return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), 
this._mouseStop(t)), !1;
},
_mouseDistanceMet:function(e) {
return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;
},
_mouseDelayMet:function() {
return this.mouseDelayMet;
},
_mouseStart:function() {},
_mouseDrag:function() {},
_mouseStop:function() {},
_mouseCapture:function() {
return !0;
}
});
}(jQuery), /*!
 * jQuery UI Sortable 1.10.3
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
function(e) {
function t(e, t, n) {
return e > t && t + n > e;
}
function n(e) {
return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"));
}
e.widget("ui.sortable", e.ui.mouse, {
version:"1.10.3",
widgetEventPrefix:"sort",
ready:!1,
options:{
appendTo:"parent",
axis:!1,
connectWith:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
dropOnEmpty:!0,
forcePlaceholderSize:!1,
forceHelperSize:!1,
grid:!1,
handle:!1,
helper:"original",
items:"> *",
opacity:!1,
placeholder:!1,
revert:!1,
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
scope:"default",
tolerance:"intersect",
zIndex:1e3,
activate:null,
beforeStop:null,
change:null,
deactivate:null,
out:null,
over:null,
receive:null,
remove:null,
sort:null,
start:null,
stop:null,
update:null
},
_create:function() {
var e = this.options;
this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
this.floating = this.items.length ? "x" === e.axis || n(this.items[0].item) :!1, 
this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
},
_destroy:function() {
this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
return this;
},
_setOption:function(t, n) {
"disabled" === t ? (this.options[t] = n, this.widget().toggleClass("ui-sortable-disabled", !!n)) :e.Widget.prototype._setOption.apply(this, arguments);
},
_mouseCapture:function(t, n) {
var o = null, i = !1, r = this;
return this.reverting ? !1 :this.options.disabled || "static" === this.options.type ? !1 :(this._refreshItems(t), 
e(t.target).parents().each(function() {
return e.data(this, r.widgetName + "-item") === r ? (o = e(this), !1) :void 0;
}), e.data(t.target, r.widgetName + "-item") === r && (o = e(t.target)), o ? !this.options.handle || n || (e(this.options.handle, o).find("*").addBack().each(function() {
this === t.target && (i = !0);
}), i) ? (this.currentItem = o, this._removeCurrentsFromItems(), !0) :!1 :!1);
},
_mouseStart:function(t, n, o) {
var i, r, a = this.options;
if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), 
this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
this.offset = this.currentItem.offset(), this.offset = {
top:this.offset.top - this.margins.top,
left:this.offset.left - this.margins.left
}, e.extend(this.offset, {
click:{
left:t.pageX - this.offset.left,
top:t.pageY - this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, 
this.originalPageY = t.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), 
this.domPosition = {
prev:this.currentItem.prev()[0],
parent:this.currentItem.parent()[0]
}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (r = this.document.find("body"), 
this.storedCursor = r.css("cursor"), r.css("cursor", a.cursor), this.storedStylesheet = e("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(r)), 
a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
!o) for (i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", t, this._uiHash(this));
return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !a.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), 
this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), 
!0;
},
_mouseDrag:function(t) {
var n, o, i, r, a = this.options, s = !1;
for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), 
this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop + a.scrollSpeed :t.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop - a.scrollSpeed), 
this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft + a.scrollSpeed :t.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft - a.scrollSpeed)) :(t.pageY - e(document).scrollTop() < a.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - a.scrollSpeed) :e(window).height() - (t.pageY - e(document).scrollTop()) < a.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + a.scrollSpeed)), 
t.pageX - e(document).scrollLeft() < a.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - a.scrollSpeed) :e(window).width() - (t.pageX - e(document).scrollLeft()) < a.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + a.scrollSpeed))), 
s !== !1 && e.ui.ddmanager && !a.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), 
this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
n = this.items.length - 1; n >= 0; n--) if (o = this.items[n], i = o.item[0], r = this._intersectsWithPointer(o), 
r && o.instance === this.currentContainer && i !== this.currentItem[0] && this.placeholder[1 === r ? "next" :"prev"]()[0] !== i && !e.contains(this.placeholder[0], i) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], i) :!0)) {
if (this.direction = 1 === r ? "down" :"up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(o)) break;
this._rearrange(t, o), this._trigger("change", t, this._uiHash());
break;
}
return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), 
this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
!1;
},
_mouseStop:function(t, n) {
if (t) {
if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), 
this.options.revert) {
var o = this, i = this.placeholder.offset(), r = this.options.axis, a = {};
r && "x" !== r || (a.left = i.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 :this.offsetParent[0].scrollLeft)), 
r && "y" !== r || (a.top = i.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 :this.offsetParent[0].scrollTop)), 
this.reverting = !0, e(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
o._clear(t);
});
} else this._clear(t, n);
return !1;
}
},
cancel:function() {
if (this.dragging) {
this._mouseUp({
target:null
}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :this.currentItem.show();
for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), 
this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), 
this.containers[t].containerCache.over = 0);
}
return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
"original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
e.extend(this, {
helper:null,
dragging:!1,
reverting:!1,
_noFinalSort:null
}), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) :e(this.domPosition.parent).prepend(this.currentItem)), 
this;
},
serialize:function(t) {
var n = this._getItemsAsjQuery(t && t.connected), o = [];
return t = t || {}, e(n).each(function() {
var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
n && o.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] :n[2]));
}), !o.length && t.key && o.push(t.key + "="), o.join("&");
},
toArray:function(t) {
var n = this._getItemsAsjQuery(t && t.connected), o = [];
return t = t || {}, n.each(function() {
o.push(e(t.item || this).attr(t.attribute || "id") || "");
}), o;
},
_intersectsWith:function(e) {
var t = this.positionAbs.left, n = t + this.helperProportions.width, o = this.positionAbs.top, i = o + this.helperProportions.height, r = e.left, a = r + e.width, s = e.top, l = s + e.height, u = this.offset.click.top, c = this.offset.click.left, d = "x" === this.options.axis || o + u > s && l > o + u, h = "y" === this.options.axis || t + c > r && a > t + c, p = d && h;
return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" :"height"] > e[this.floating ? "width" :"height"] ? p :r < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < a && s < o + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < l;
},
_intersectsWithPointer:function(e) {
var n = "x" === this.options.axis || t(this.positionAbs.top + this.offset.click.top, e.top, e.height), o = "y" === this.options.axis || t(this.positionAbs.left + this.offset.click.left, e.left, e.width), i = n && o, r = this._getDragVerticalDirection(), a = this._getDragHorizontalDirection();
return i ? this.floating ? a && "right" === a || "down" === r ? 2 :1 :r && ("down" === r ? 2 :1) :!1;
},
_intersectsWithSides:function(e) {
var n = t(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height), o = t(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width), i = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
return this.floating && r ? "right" === r && o || "left" === r && !o :i && ("down" === i && n || "up" === i && !n);
},
_getDragVerticalDirection:function() {
var e = this.positionAbs.top - this.lastPositionAbs.top;
return 0 !== e && (e > 0 ? "down" :"up");
},
_getDragHorizontalDirection:function() {
var e = this.positionAbs.left - this.lastPositionAbs.left;
return 0 !== e && (e > 0 ? "right" :"left");
},
refresh:function(e) {
return this._refreshItems(e), this.refreshPositions(), this;
},
_connectWith:function() {
var e = this.options;
return e.connectWith.constructor === String ? [ e.connectWith ] :e.connectWith;
},
_getItemsAsjQuery:function(t) {
var n, o, i, r, a = [], s = [], l = this._connectWith();
if (l && t) for (n = l.length - 1; n >= 0; n--) for (i = e(l[n]), o = i.length - 1; o >= 0; o--) r = e.data(i[o], this.widgetFullName), 
r && r !== this && !r.options.disabled && s.push([ e.isFunction(r.options.items) ? r.options.items.call(r.element) :e(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r ]);
for (s.push([ e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
options:this.options,
item:this.currentItem
}) :e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]), 
n = s.length - 1; n >= 0; n--) s[n][0].each(function() {
a.push(this);
});
return e(a);
},
_removeCurrentsFromItems:function() {
var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
this.items = e.grep(this.items, function(e) {
for (var n = 0; n < t.length; n++) if (t[n] === e.item[0]) return !1;
return !0;
});
},
_refreshItems:function(t) {
this.items = [], this.containers = [ this ];
var n, o, i, r, a, s, l, u, c = this.items, d = [ [ e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
item:this.currentItem
}) :e(this.options.items, this.element), this ] ], h = this._connectWith();
if (h && this.ready) for (n = h.length - 1; n >= 0; n--) for (i = e(h[n]), o = i.length - 1; o >= 0; o--) r = e.data(i[o], this.widgetFullName), 
r && r !== this && !r.options.disabled && (d.push([ e.isFunction(r.options.items) ? r.options.items.call(r.element[0], t, {
item:this.currentItem
}) :e(r.options.items, r.element), r ]), this.containers.push(r));
for (n = d.length - 1; n >= 0; n--) for (a = d[n][1], s = d[n][0], o = 0, u = s.length; u > o; o++) l = e(s[o]), 
l.data(this.widgetName + "-item", a), c.push({
item:l,
instance:a,
width:0,
height:0,
left:0,
top:0
});
},
refreshPositions:function(t) {
this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
var n, o, i, r;
for (n = this.items.length - 1; n >= 0; n--) o = this.items[n], o.instance !== this.currentContainer && this.currentContainer && o.item[0] !== this.currentItem[0] || (i = this.options.toleranceElement ? e(this.options.toleranceElement, o.item) :o.item, 
t || (o.width = i.outerWidth(), o.height = i.outerHeight()), r = i.offset(), o.left = r.left, 
o.top = r.top);
if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (n = this.containers.length - 1; n >= 0; n--) r = this.containers[n].element.offset(), 
this.containers[n].containerCache.left = r.left, this.containers[n].containerCache.top = r.top, 
this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), 
this.containers[n].containerCache.height = this.containers[n].element.outerHeight();
return this;
},
_createPlaceholder:function(t) {
t = t || this;
var n, o = t.options;
o.placeholder && o.placeholder.constructor !== String || (n = o.placeholder, o.placeholder = {
element:function() {
var o = t.currentItem[0].nodeName.toLowerCase(), i = e("<" + o + ">", t.document[0]).addClass(n || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
return "tr" === o ? t.currentItem.children().each(function() {
e("<td>&#160;</td>", t.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(i);
}) :"img" === o && i.attr("src", t.currentItem.attr("src")), n || i.css("visibility", "hidden"), 
i;
},
update:function(e, i) {
(!n || o.forcePlaceholderSize) && (i.height() || i.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), 
i.width() || i.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)));
}
}), t.placeholder = e(o.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), 
o.placeholder.update(t, t.placeholder);
},
_contactContainers:function(o) {
var i, r, a, s, l, u, c, d, h, p, g = null, m = null;
for (i = this.containers.length - 1; i >= 0; i--) if (!e.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
if (g && e.contains(this.containers[i].element[0], g.element[0])) continue;
g = this.containers[i], m = i;
} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", o, this._uiHash(this)), 
this.containers[i].containerCache.over = 0);
if (g) if (1 === this.containers.length) this.containers[m].containerCache.over || (this.containers[m]._trigger("over", o, this._uiHash(this)), 
this.containers[m].containerCache.over = 1); else {
for (a = 1e4, s = null, p = g.floating || n(this.currentItem), l = p ? "left" :"top", 
u = p ? "width" :"height", c = this.positionAbs[l] + this.offset.click[l], r = this.items.length - 1; r >= 0; r--) e.contains(this.containers[m].element[0], this.items[r].item[0]) && this.items[r].item[0] !== this.currentItem[0] && (!p || t(this.positionAbs.top + this.offset.click.top, this.items[r].top, this.items[r].height)) && (d = this.items[r].item.offset()[l], 
h = !1, Math.abs(d - c) > Math.abs(d + this.items[r][u] - c) && (h = !0, d += this.items[r][u]), 
Math.abs(d - c) < a && (a = Math.abs(d - c), s = this.items[r], this.direction = h ? "up" :"down"));
if (!s && !this.options.dropOnEmpty) return;
if (this.currentContainer === this.containers[m]) return;
s ? this._rearrange(o, s, null, !0) :this._rearrange(o, null, this.containers[m].element, !0), 
this._trigger("change", o, this._uiHash()), this.containers[m]._trigger("change", o, this._uiHash(this)), 
this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), 
this.containers[m]._trigger("over", o, this._uiHash(this)), this.containers[m].containerCache.over = 1;
}
},
_createHelper:function(t) {
var n = this.options, o = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [ t, this.currentItem ])) :"clone" === n.helper ? this.currentItem.clone() :this.currentItem;
return o.parents("body").length || e("parent" !== n.appendTo ? n.appendTo :this.currentItem[0].parentNode)[0].appendChild(o[0]), 
o[0] === this.currentItem[0] && (this._storedCSS = {
width:this.currentItem[0].style.width,
height:this.currentItem[0].style.height,
position:this.currentItem.css("position"),
top:this.currentItem.css("top"),
left:this.currentItem.css("left")
}), (!o[0].style.width || n.forceHelperSize) && o.width(this.currentItem.width()), 
(!o[0].style.height || n.forceHelperSize) && o.height(this.currentItem.height()), 
o;
},
_adjustOffsetFromHelper:function(t) {
"string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
left:+t[0],
top:+t[1] || 0
}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), 
"top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
},
_getParentOffset:function() {
this.offsetParent = this.helper.offsetParent();
var t = this.offsetParent.offset();
return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), 
t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
top:0,
left:0
}), {
top:t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left:t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset:function() {
if ("relative" === this.cssPosition) {
var e = this.currentItem.position();
return {
top:e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left:e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top:0,
left:0
};
},
_cacheMargins:function() {
this.margins = {
left:parseInt(this.currentItem.css("marginLeft"), 10) || 0,
top:parseInt(this.currentItem.css("marginTop"), 10) || 0
};
},
_cacheHelperProportions:function() {
this.helperProportions = {
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function() {
var t, n, o, i = this.options;
"parent" === i.containment && (i.containment = this.helper[0].parentNode), ("document" === i.containment || "window" === i.containment) && (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e("document" === i.containment ? document :window).width() - this.helperProportions.width - this.margins.left, (e("document" === i.containment ? document :window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
/^(document|window|parent)$/.test(i.containment) || (t = e(i.containment)[0], n = e(i.containment).offset(), 
o = "hidden" !== e(t).css("overflow"), this.containment = [ n.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, n.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, n.left + (o ? Math.max(t.scrollWidth, t.offsetWidth) :t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, n.top + (o ? Math.max(t.scrollHeight, t.offsetHeight) :t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ]);
},
_convertPositionTo:function(t, n) {
n || (n = this.position);
var o = "absolute" === t ? 1 :-1, i = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, r = /(html|body)/i.test(i[0].tagName);
return {
top:n.top + this.offset.relative.top * o + this.offset.parent.top * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() :r ? 0 :i.scrollTop()) * o,
left:n.left + this.offset.relative.left * o + this.offset.parent.left * o - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() :r ? 0 :i.scrollLeft()) * o
};
},
_generatePosition:function(t) {
var n, o, i = this.options, r = t.pageX, a = t.pageY, s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, l = /(html|body)/i.test(s[0].tagName);
return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), 
this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (r = this.containment[0] + this.offset.click.left), 
t.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), 
t.pageX - this.offset.click.left > this.containment[2] && (r = this.containment[2] + this.offset.click.left), 
t.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), 
i.grid && (n = this.originalPageY + Math.round((a - this.originalPageY) / i.grid[1]) * i.grid[1], 
a = this.containment ? n - this.offset.click.top >= this.containment[1] && n - this.offset.click.top <= this.containment[3] ? n :n - this.offset.click.top >= this.containment[1] ? n - i.grid[1] :n + i.grid[1] :n, 
o = this.originalPageX + Math.round((r - this.originalPageX) / i.grid[0]) * i.grid[0], 
r = this.containment ? o - this.offset.click.left >= this.containment[0] && o - this.offset.click.left <= this.containment[2] ? o :o - this.offset.click.left >= this.containment[0] ? o - i.grid[0] :o + i.grid[0] :o)), 
{
top:a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() :l ? 0 :s.scrollTop()),
left:r - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() :l ? 0 :s.scrollLeft())
};
},
_rearrange:function(e, t, n, o) {
n ? n[0].appendChild(this.placeholder[0]) :t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] :t.item[0].nextSibling), 
this.counter = this.counter ? ++this.counter :1;
var i = this.counter;
this._delay(function() {
i === this.counter && this.refreshPositions(!o);
});
},
_clear:function(e, t) {
this.reverting = !1;
var n, o = [];
if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
for (n in this._storedCSS) ("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
} else this.currentItem.show();
for (this.fromOutside && !t && o.push(function(e) {
this._trigger("receive", e, this._uiHash(this.fromOutside));
}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || o.push(function(e) {
this._trigger("update", e, this._uiHash());
}), this !== this.currentContainer && (t || (o.push(function(e) {
this._trigger("remove", e, this._uiHash());
}), o.push(function(e) {
return function(t) {
e._trigger("receive", t, this._uiHash(this));
};
}.call(this, this.currentContainer)), o.push(function(e) {
return function(t) {
e._trigger("update", t, this._uiHash(this));
};
}.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) t || o.push(function(e) {
return function(t) {
e._trigger("deactivate", t, this._uiHash(this));
};
}.call(this, this.containers[n])), this.containers[n].containerCache.over && (o.push(function(e) {
return function(t) {
e._trigger("out", t, this._uiHash(this));
};
}.call(this, this.containers[n])), this.containers[n].containerCache.over = 0);
if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), 
this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" :this._storedZIndex), 
this.dragging = !1, this.cancelHelperRemoval) {
if (!t) {
for (this._trigger("beforeStop", e, this._uiHash()), n = 0; n < o.length; n++) o[n].call(this, e);
this._trigger("stop", e, this._uiHash());
}
return this.fromOutside = !1, !1;
}
if (t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, 
!t) {
for (n = 0; n < o.length; n++) o[n].call(this, e);
this._trigger("stop", e, this._uiHash());
}
return this.fromOutside = !1, !0;
},
_trigger:function() {
e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
},
_uiHash:function(t) {
var n = t || this;
return {
helper:n.helper,
placeholder:n.placeholder || e([]),
position:n.position,
originalPosition:n.originalPosition,
offset:n.positionAbs,
item:n.currentItem,
sender:t ? t.element :null
};
}
});
}(jQuery), function(e) {
function t() {
return {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function n(e, t) {
function n() {
lt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
}
var o = !0;
return l(function() {
return o && (n(), o = !1), t.apply(this, arguments);
}, t);
}
function o(e, t) {
return function(n) {
return d(e.call(this, n), t);
};
}
function i(e, t) {
return function(n) {
return this.lang().ordinal(e.call(this, n), t);
};
}
function r() {}
function a(e) {
L(e), l(this, e);
}
function s(e) {
var t = _(e), n = t.year || 0, o = t.quarter || 0, i = t.month || 0, r = t.week || 0, a = t.day || 0, s = t.hour || 0, l = t.minute || 0, u = t.second || 0, c = t.millisecond || 0;
this._milliseconds = +c + 1e3 * u + 6e4 * l + 36e5 * s, this._days = +a + 7 * r, 
this._months = +i + 3 * o + 12 * n, this._data = {}, this._bubble();
}
function l(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
return t.hasOwnProperty("toString") && (e.toString = t.toString), t.hasOwnProperty("valueOf") && (e.valueOf = t.valueOf), 
e;
}
function u(e) {
var t, n = {};
for (t in e) e.hasOwnProperty(t) && kt.hasOwnProperty(t) && (n[t] = e[t]);
return n;
}
function c(e) {
return 0 > e ? Math.ceil(e) :Math.floor(e);
}
function d(e, t, n) {
for (var o = "" + Math.abs(e), i = e >= 0; o.length < t; ) o = "0" + o;
return (i ? n ? "+" :"" :"-") + o;
}
function h(e, t, n, o) {
var i = t._milliseconds, r = t._days, a = t._months;
o = null == o ? !0 :o, i && e._d.setTime(+e._d + i * n), r && ot(e, "Date", nt(e, "Date") + r * n), 
a && tt(e, nt(e, "Month") + a * n), o && lt.updateOffset(e, r || a);
}
function p(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function g(e) {
return "[object Date]" === Object.prototype.toString.call(e) || e instanceof Date;
}
function m(e, t, n) {
var o, i = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), a = 0;
for (o = 0; i > o; o++) (n && e[o] !== t[o] || !n && w(e[o]) !== w(t[o])) && a++;
return a + r;
}
function f(e) {
if (e) {
var t = e.toLowerCase().replace(/(.)s$/, "$1");
e = Qt[e] || Xt[t] || t;
}
return e;
}
function _(e) {
var t, n, o = {};
for (n in e) e.hasOwnProperty(n) && (t = f(n), t && (o[t] = e[n]));
return o;
}
function v(t) {
var n, o;
if (0 === t.indexOf("week")) n = 7, o = "day"; else {
if (0 !== t.indexOf("month")) return;
n = 12, o = "month";
}
lt[t] = function(i, r) {
var a, s, l = lt.fn._lang[t], u = [];
if ("number" == typeof i && (r = i, i = e), s = function(e) {
var t = lt().utc().set(o, e);
return l.call(lt.fn._lang, t, i || "");
}, null != r) return s(r);
for (a = 0; n > a; a++) u.push(s(a));
return u;
};
}
function w(e) {
var t = +e, n = 0;
return 0 !== t && isFinite(t) && (n = t >= 0 ? Math.floor(t) :Math.ceil(t)), n;
}
function y(e, t) {
return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
}
function b(e, t, n) {
return X(lt([ e, 11, 31 + t - n ]), t, n).week;
}
function k(e) {
return M(e) ? 366 :365;
}
function M(e) {
return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function L(e) {
var t;
e._a && -2 === e._pf.overflow && (t = e._a[mt] < 0 || e._a[mt] > 11 ? mt :e._a[ft] < 1 || e._a[ft] > y(e._a[gt], e._a[mt]) ? ft :e._a[_t] < 0 || e._a[_t] > 23 ? _t :e._a[vt] < 0 || e._a[vt] > 59 ? vt :e._a[wt] < 0 || e._a[wt] > 59 ? wt :e._a[yt] < 0 || e._a[yt] > 999 ? yt :-1, 
e._pf._overflowDayOfYear && (gt > t || t > ft) && (t = ft), e._pf.overflow = t);
}
function S(e) {
return null == e._isValid && (e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated, 
e._strict && (e._isValid = e._isValid && 0 === e._pf.charsLeftOver && 0 === e._pf.unusedTokens.length)), 
e._isValid;
}
function T(e) {
return e ? e.toLowerCase().replace("_", "-") :e;
}
function x(e, t) {
return t._isUTC ? lt(e).zone(t._offset || 0) :lt(e).local();
}
function D(e, t) {
return t.abbr = e, bt[e] || (bt[e] = new r()), bt[e].set(t), bt[e];
}
function Y(e) {
delete bt[e];
}
function E(e) {
var t, n, o, i, r = 0, a = function(e) {
if (!bt[e] && Mt) try {
require("./lang/" + e);
} catch (t) {}
return bt[e];
};
if (!e) return lt.fn._lang;
if (!p(e)) {
if (n = a(e)) return n;
e = [ e ];
}
for (;r < e.length; ) {
for (i = T(e[r]).split("-"), t = i.length, o = T(e[r + 1]), o = o ? o.split("-") :null; t > 0; ) {
if (n = a(i.slice(0, t).join("-"))) return n;
if (o && o.length >= t && m(i, o, !0) >= t - 1) break;
t--;
}
r++;
}
return lt.fn._lang;
}
function C(e) {
return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") :e.replace(/\\/g, "");
}
function I(e) {
var t, n, o = e.match(xt);
for (t = 0, n = o.length; n > t; t++) o[t] = nn[o[t]] ? nn[o[t]] :C(o[t]);
return function(i) {
var r = "";
for (t = 0; n > t; t++) r += o[t] instanceof Function ? o[t].call(i, e) :o[t];
return r;
};
}
function O(e, t) {
return e.isValid() ? (t = $(t, e.lang()), Zt[t] || (Zt[t] = I(t)), Zt[t](e)) :e.lang().invalidDate();
}
function $(e, t) {
function n(e) {
return t.longDateFormat(e) || e;
}
var o = 5;
for (Dt.lastIndex = 0; o >= 0 && Dt.test(e); ) e = e.replace(Dt, n), Dt.lastIndex = 0, 
o -= 1;
return e;
}
function B(e, t) {
var n, o = t._strict;
switch (e) {
case "Q":
return Nt;

case "DDDD":
return Ft;

case "YYYY":
case "GGGG":
case "gggg":
return o ? zt :Ct;

case "Y":
case "G":
case "g":
return Wt;

case "YYYYYY":
case "YYYYY":
case "GGGGG":
case "ggggg":
return o ? Rt :It;

case "S":
if (o) return Nt;

case "SS":
if (o) return Pt;

case "SSS":
if (o) return Ft;

case "DDD":
return Et;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
return $t;

case "a":
case "A":
return E(t._l)._meridiemParse;

case "X":
return At;

case "Z":
case "ZZ":
return Bt;

case "T":
return Ht;

case "SSSS":
return Ot;

case "MM":
case "DD":
case "YY":
case "GG":
case "gg":
case "HH":
case "hh":
case "mm":
case "ss":
case "ww":
case "WW":
return o ? Pt :Yt;

case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
case "w":
case "W":
case "e":
case "E":
return Yt;

case "Do":
return jt;

default:
return n = new RegExp(R(z(e.replace("\\", "")), "i"));
}
}
function H(e) {
e = e || "";
var t = e.match(Bt) || [], n = t[t.length - 1] || [], o = (n + "").match(Jt) || [ "-", 0, 0 ], i = +(60 * o[1]) + w(o[2]);
return "+" === o[0] ? -i :i;
}
function A(e, t, n) {
var o, i = n._a;
switch (e) {
case "Q":
null != t && (i[mt] = 3 * (w(t) - 1));
break;

case "M":
case "MM":
null != t && (i[mt] = w(t) - 1);
break;

case "MMM":
case "MMMM":
o = E(n._l).monthsParse(t), null != o ? i[mt] = o :n._pf.invalidMonth = t;
break;

case "D":
case "DD":
null != t && (i[ft] = w(t));
break;

case "Do":
null != t && (i[ft] = w(parseInt(t, 10)));
break;

case "DDD":
case "DDDD":
null != t && (n._dayOfYear = w(t));
break;

case "YY":
i[gt] = lt.parseTwoDigitYear(t);
break;

case "YYYY":
case "YYYYY":
case "YYYYYY":
i[gt] = w(t);
break;

case "a":
case "A":
n._isPm = E(n._l).isPM(t);
break;

case "H":
case "HH":
case "h":
case "hh":
i[_t] = w(t);
break;

case "m":
case "mm":
i[vt] = w(t);
break;

case "s":
case "ss":
i[wt] = w(t);
break;

case "S":
case "SS":
case "SSS":
case "SSSS":
i[yt] = w(1e3 * ("0." + t));
break;

case "X":
n._d = new Date(1e3 * parseFloat(t));
break;

case "Z":
case "ZZ":
n._useUTC = !0, n._tzm = H(t);
break;

case "w":
case "ww":
case "W":
case "WW":
case "d":
case "dd":
case "ddd":
case "dddd":
case "e":
case "E":
e = e.substr(0, 1);

case "gg":
case "gggg":
case "GG":
case "GGGG":
case "GGGGG":
e = e.substr(0, 2), t && (n._w = n._w || {}, n._w[e] = t);
}
}
function j(e) {
var t, n, o, i, r, a, s, l, u, c, d = [];
if (!e._d) {
for (o = P(e), e._w && null == e._a[ft] && null == e._a[mt] && (r = function(t) {
var n = parseInt(t, 10);
return t ? t.length < 3 ? n > 68 ? 1900 + n :2e3 + n :n :null == e._a[gt] ? lt().weekYear() :e._a[gt];
}, a = e._w, null != a.GG || null != a.W || null != a.E ? s = Z(r(a.GG), a.W || 1, a.E, 4, 1) :(l = E(e._l), 
u = null != a.d ? J(a.d, l) :null != a.e ? parseInt(a.e, 10) + l._week.dow :0, c = parseInt(a.w, 10) || 1, 
null != a.d && u < l._week.dow && c++, s = Z(r(a.gg), c, u, l._week.doy, l._week.dow)), 
e._a[gt] = s.year, e._dayOfYear = s.dayOfYear), e._dayOfYear && (i = null == e._a[gt] ? o[gt] :e._a[gt], 
e._dayOfYear > k(i) && (e._pf._overflowDayOfYear = !0), n = G(i, 0, e._dayOfYear), 
e._a[mt] = n.getUTCMonth(), e._a[ft] = n.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = d[t] = o[t];
for (;7 > t; t++) e._a[t] = d[t] = null == e._a[t] ? 2 === t ? 1 :0 :e._a[t];
d[_t] += w((e._tzm || 0) / 60), d[vt] += w((e._tzm || 0) % 60), e._d = (e._useUTC ? G :V).apply(null, d);
}
}
function N(e) {
var t;
e._d || (t = _(e._i), e._a = [ t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond ], 
j(e));
}
function P(e) {
var t = new Date();
return e._useUTC ? [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ] :[ t.getFullYear(), t.getMonth(), t.getDate() ];
}
function F(e) {
e._a = [], e._pf.empty = !0;
var t, n, o, i, r, a = E(e._l), s = "" + e._i, l = s.length, u = 0;
for (o = $(e._f, a).match(xt) || [], t = 0; t < o.length; t++) i = o[t], n = (s.match(B(i, e)) || [])[0], 
n && (r = s.substr(0, s.indexOf(n)), r.length > 0 && e._pf.unusedInput.push(r), 
s = s.slice(s.indexOf(n) + n.length), u += n.length), nn[i] ? (n ? e._pf.empty = !1 :e._pf.unusedTokens.push(i), 
A(i, n, e)) :e._strict && !n && e._pf.unusedTokens.push(i);
e._pf.charsLeftOver = l - u, s.length > 0 && e._pf.unusedInput.push(s), e._isPm && e._a[_t] < 12 && (e._a[_t] += 12), 
e._isPm === !1 && 12 === e._a[_t] && (e._a[_t] = 0), j(e), L(e);
}
function z(e) {
return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, o, i) {
return t || n || o || i;
});
}
function R(e) {
return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function W(e) {
var n, o, i, r, a;
if (0 === e._f.length) return e._pf.invalidFormat = !0, void (e._d = new Date(0/0));
for (r = 0; r < e._f.length; r++) a = 0, n = l({}, e), n._pf = t(), n._f = e._f[r], 
F(n), S(n) && (a += n._pf.charsLeftOver, a += 10 * n._pf.unusedTokens.length, n._pf.score = a, 
(null == i || i > a) && (i = a, o = n));
l(e, o || n);
}
function q(e) {
var t, n, o = e._i, i = qt.exec(o);
if (i) {
for (e._pf.iso = !0, t = 0, n = Vt.length; n > t; t++) if (Vt[t][1].exec(o)) {
e._f = Vt[t][0] + (i[6] || " ");
break;
}
for (t = 0, n = Gt.length; n > t; t++) if (Gt[t][1].exec(o)) {
e._f += Gt[t][0];
break;
}
o.match(Bt) && (e._f += "Z"), F(e);
} else lt.createFromInputFallback(e);
}
function U(t) {
var n = t._i, o = Lt.exec(n);
n === e ? t._d = new Date() :o ? t._d = new Date(+o[1]) :"string" == typeof n ? q(t) :p(n) ? (t._a = n.slice(0), 
j(t)) :g(n) ? t._d = new Date(+n) :"object" == typeof n ? N(t) :"number" == typeof n ? t._d = new Date(n) :lt.createFromInputFallback(t);
}
function V(e, t, n, o, i, r, a) {
var s = new Date(e, t, n, o, i, r, a);
return 1970 > e && s.setFullYear(e), s;
}
function G(e) {
var t = new Date(Date.UTC.apply(null, arguments));
return 1970 > e && t.setUTCFullYear(e), t;
}
function J(e, t) {
if ("string" == typeof e) if (isNaN(e)) {
if (e = t.weekdaysParse(e), "number" != typeof e) return null;
} else e = parseInt(e, 10);
return e;
}
function K(e, t, n, o, i) {
return i.relativeTime(t || 1, !!n, e, o);
}
function Q(e, t, n) {
var o = pt(Math.abs(e) / 1e3), i = pt(o / 60), r = pt(i / 60), a = pt(r / 24), s = pt(a / 365), l = 45 > o && [ "s", o ] || 1 === i && [ "m" ] || 45 > i && [ "mm", i ] || 1 === r && [ "h" ] || 22 > r && [ "hh", r ] || 1 === a && [ "d" ] || 25 >= a && [ "dd", a ] || 45 >= a && [ "M" ] || 345 > a && [ "MM", pt(a / 30) ] || 1 === s && [ "y" ] || [ "yy", s ];
return l[2] = t, l[3] = e > 0, l[4] = n, K.apply({}, l);
}
function X(e, t, n) {
var o, i = n - t, r = n - e.day();
return r > i && (r -= 7), i - 7 > r && (r += 7), o = lt(e).add("d", r), {
week:Math.ceil(o.dayOfYear() / 7),
year:o.year()
};
}
function Z(e, t, n, o, i) {
var r, a, s = G(e, 0, 1).getUTCDay();
return n = null != n ? n :i, r = i - s + (s > o ? 7 :0) - (i > s ? 7 :0), a = 7 * (t - 1) + (n - i) + r + 1, 
{
year:a > 0 ? e :e - 1,
dayOfYear:a > 0 ? a :k(e - 1) + a
};
}
function et(t) {
var n = t._i, o = t._f;
return null === n || o === e && "" === n ? lt.invalid({
nullInput:!0
}) :("string" == typeof n && (t._i = n = E().preparse(n)), lt.isMoment(n) ? (t = u(n), 
t._d = new Date(+n._d)) :o ? p(o) ? W(t) :F(t) :U(t), new a(t));
}
function tt(e, t) {
var n;
return "string" == typeof t && (t = e.lang().monthsParse(t), "number" != typeof t) ? e :(n = Math.min(e.date(), y(e.year(), t)), 
e._d["set" + (e._isUTC ? "UTC" :"") + "Month"](t, n), e);
}
function nt(e, t) {
return e._d["get" + (e._isUTC ? "UTC" :"") + t]();
}
function ot(e, t, n) {
return "Month" === t ? tt(e, n) :e._d["set" + (e._isUTC ? "UTC" :"") + t](n);
}
function it(e, t) {
return function(n) {
return null != n ? (ot(this, e, n), lt.updateOffset(this, t), this) :nt(this, e);
};
}
function rt(e) {
lt.duration.fn[e] = function() {
return this._data[e];
};
}
function at(e, t) {
lt.duration.fn["as" + e] = function() {
return +this / t;
};
}
function st(e) {
"undefined" == typeof ender && (ut = ht.moment, ht.moment = e ? n("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", lt) :lt);
}
for (var lt, ut, ct, dt = "2.6.0", ht = "undefined" != typeof global ? global :this, pt = Math.round, gt = 0, mt = 1, ft = 2, _t = 3, vt = 4, wt = 5, yt = 6, bt = {}, kt = {
_isAMomentObject:null,
_i:null,
_f:null,
_l:null,
_strict:null,
_isUTC:null,
_offset:null,
_pf:null,
_lang:null
}, Mt = "undefined" != typeof module && module.exports, Lt = /^\/?Date\((\-?\d+)/i, St = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Tt = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, xt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Dt = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Yt = /\d\d?/, Et = /\d{1,3}/, Ct = /\d{1,4}/, It = /[+\-]?\d{1,6}/, Ot = /\d+/, $t = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Bt = /Z|[\+\-]\d\d:?\d\d/gi, Ht = /T/i, At = /[\+\-]?\d+(\.\d{1,3})?/, jt = /\d{1,2}/, Nt = /\d/, Pt = /\d\d/, Ft = /\d{3}/, zt = /\d{4}/, Rt = /[+-]?\d{6}/, Wt = /[+-]?\d+/, qt = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ut = "YYYY-MM-DDTHH:mm:ssZ", Vt = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], Gt = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], Jt = /([\+\-]|\d\d)/gi, Kt = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), 
{
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
}), Qt = {
ms:"millisecond",
s:"second",
m:"minute",
h:"hour",
d:"day",
D:"date",
w:"week",
W:"isoWeek",
M:"month",
Q:"quarter",
y:"year",
DDD:"dayOfYear",
e:"weekday",
E:"isoWeekday",
gg:"weekYear",
GG:"isoWeekYear"
}, Xt = {
dayofyear:"dayOfYear",
isoweekday:"isoWeekday",
isoweek:"isoWeek",
weekyear:"weekYear",
isoweekyear:"isoWeekYear"
}, Zt = {}, en = "DDD w W M D d".split(" "), tn = "M D H h m s w W".split(" "), nn = {
M:function() {
return this.month() + 1;
},
MMM:function(e) {
return this.lang().monthsShort(this, e);
},
MMMM:function(e) {
return this.lang().months(this, e);
},
D:function() {
return this.date();
},
DDD:function() {
return this.dayOfYear();
},
d:function() {
return this.day();
},
dd:function(e) {
return this.lang().weekdaysMin(this, e);
},
ddd:function(e) {
return this.lang().weekdaysShort(this, e);
},
dddd:function(e) {
return this.lang().weekdays(this, e);
},
w:function() {
return this.week();
},
W:function() {
return this.isoWeek();
},
YY:function() {
return d(this.year() % 100, 2);
},
YYYY:function() {
return d(this.year(), 4);
},
YYYYY:function() {
return d(this.year(), 5);
},
YYYYYY:function() {
var e = this.year(), t = e >= 0 ? "+" :"-";
return t + d(Math.abs(e), 6);
},
gg:function() {
return d(this.weekYear() % 100, 2);
},
gggg:function() {
return d(this.weekYear(), 4);
},
ggggg:function() {
return d(this.weekYear(), 5);
},
GG:function() {
return d(this.isoWeekYear() % 100, 2);
},
GGGG:function() {
return d(this.isoWeekYear(), 4);
},
GGGGG:function() {
return d(this.isoWeekYear(), 5);
},
e:function() {
return this.weekday();
},
E:function() {
return this.isoWeekday();
},
a:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H:function() {
return this.hours();
},
h:function() {
return this.hours() % 12 || 12;
},
m:function() {
return this.minutes();
},
s:function() {
return this.seconds();
},
S:function() {
return w(this.milliseconds() / 100);
},
SS:function() {
return d(w(this.milliseconds() / 10), 2);
},
SSS:function() {
return d(this.milliseconds(), 3);
},
SSSS:function() {
return d(this.milliseconds(), 3);
},
Z:function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + d(w(e / 60), 2) + ":" + d(w(e) % 60, 2);
},
ZZ:function() {
var e = -this.zone(), t = "+";
return 0 > e && (e = -e, t = "-"), t + d(w(e / 60), 2) + d(w(e) % 60, 2);
},
z:function() {
return this.zoneAbbr();
},
zz:function() {
return this.zoneName();
},
X:function() {
return this.unix();
},
Q:function() {
return this.quarter();
}
}, on = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; en.length; ) ct = en.pop(), 
nn[ct + "o"] = i(nn[ct], ct);
for (;tn.length; ) ct = tn.pop(), nn[ct + ct] = o(nn[ct], 2);
for (nn.DDDD = o(nn.DDD, 3), l(r.prototype, {
set:function(e) {
var t, n;
for (n in e) t = e[n], "function" == typeof t ? this[n] = t :this["_" + n] = t;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(e) {
return this._months[e.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(e) {
return this._monthsShort[e.month()];
},
monthsParse:function(e) {
var t, n, o;
for (this._monthsParse || (this._monthsParse = []), t = 0; 12 > t; t++) if (this._monthsParse[t] || (n = lt.utc([ 2e3, t ]), 
o = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[t] = new RegExp(o.replace(".", ""), "i")), 
this._monthsParse[t].test(e)) return t;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(e) {
return this._weekdays[e.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(e) {
return this._weekdaysShort[e.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(e) {
return this._weekdaysMin[e.day()];
},
weekdaysParse:function(e) {
var t, n, o;
for (this._weekdaysParse || (this._weekdaysParse = []), t = 0; 7 > t; t++) if (this._weekdaysParse[t] || (n = lt([ 2e3, 1 ]).day(t), 
o = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
this._weekdaysParse[t] = new RegExp(o.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t;
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(e) {
var t = this._longDateFormat[e];
return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
return e.slice(1);
}), this._longDateFormat[e] = t), t;
},
isPM:function(e) {
return "p" === (e + "").toLowerCase().charAt(0);
},
_meridiemParse:/[ap]\.?m?\.?/i,
meridiem:function(e, t, n) {
return e > 11 ? n ? "pm" :"PM" :n ? "am" :"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
calendar:function(e, t) {
var n = this._calendar[e];
return "function" == typeof n ? n.apply(t) :n;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(e, t, n, o) {
var i = this._relativeTime[n];
return "function" == typeof i ? i(e, t, n, o) :i.replace(/%d/i, e);
},
pastFuture:function(e, t) {
var n = this._relativeTime[e > 0 ? "future" :"past"];
return "function" == typeof n ? n(t) :n.replace(/%s/i, t);
},
ordinal:function(e) {
return this._ordinal.replace("%d", e);
},
_ordinal:"%d",
preparse:function(e) {
return e;
},
postformat:function(e) {
return e;
},
week:function(e) {
return X(e, this._week.dow, this._week.doy).week;
},
_week:{
dow:0,
doy:6
},
_invalidDate:"Invalid date",
invalidDate:function() {
return this._invalidDate;
}
}), lt = function(n, o, i, r) {
var a;
return "boolean" == typeof i && (r = i, i = e), a = {}, a._isAMomentObject = !0, 
a._i = n, a._f = o, a._l = i, a._strict = r, a._isUTC = !1, a._pf = t(), et(a);
}, lt.suppressDeprecationWarnings = !1, lt.createFromInputFallback = n("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
e._d = new Date(e._i);
}), lt.utc = function(n, o, i, r) {
var a;
return "boolean" == typeof i && (r = i, i = e), a = {}, a._isAMomentObject = !0, 
a._useUTC = !0, a._isUTC = !0, a._l = i, a._i = n, a._f = o, a._strict = r, a._pf = t(), 
et(a).utc();
}, lt.unix = function(e) {
return lt(1e3 * e);
}, lt.duration = function(e, t) {
var n, o, i, r = e, a = null;
return lt.isDuration(e) ? r = {
ms:e._milliseconds,
d:e._days,
M:e._months
} :"number" == typeof e ? (r = {}, t ? r[t] = e :r.milliseconds = e) :(a = St.exec(e)) ? (n = "-" === a[1] ? -1 :1, 
r = {
y:0,
d:w(a[ft]) * n,
h:w(a[_t]) * n,
m:w(a[vt]) * n,
s:w(a[wt]) * n,
ms:w(a[yt]) * n
}) :(a = Tt.exec(e)) && (n = "-" === a[1] ? -1 :1, i = function(e) {
var t = e && parseFloat(e.replace(",", "."));
return (isNaN(t) ? 0 :t) * n;
}, r = {
y:i(a[2]),
M:i(a[3]),
d:i(a[4]),
h:i(a[5]),
m:i(a[6]),
s:i(a[7]),
w:i(a[8])
}), o = new s(r), lt.isDuration(e) && e.hasOwnProperty("_lang") && (o._lang = e._lang), 
o;
}, lt.version = dt, lt.defaultFormat = Ut, lt.momentProperties = kt, lt.updateOffset = function() {}, 
lt.lang = function(e, t) {
var n;
return e ? (t ? D(T(e), t) :null === t ? (Y(e), e = "en") :bt[e] || E(e), n = lt.duration.fn._lang = lt.fn._lang = E(e), 
n._abbr) :lt.fn._lang._abbr;
}, lt.langData = function(e) {
return e && e._lang && e._lang._abbr && (e = e._lang._abbr), E(e);
}, lt.isMoment = function(e) {
return e instanceof a || null != e && e.hasOwnProperty("_isAMomentObject");
}, lt.isDuration = function(e) {
return e instanceof s;
}, ct = on.length - 1; ct >= 0; --ct) v(on[ct]);
lt.normalizeUnits = function(e) {
return f(e);
}, lt.invalid = function(e) {
var t = lt.utc(0/0);
return null != e ? l(t._pf, e) :t._pf.userInvalidated = !0, t;
}, lt.parseZone = function() {
return lt.apply(null, arguments).parseZone();
}, lt.parseTwoDigitYear = function(e) {
return w(e) + (w(e) > 68 ? 1900 :2e3);
}, l(lt.fn = a.prototype, {
clone:function() {
return lt(this);
},
valueOf:function() {
return +this._d + 6e4 * (this._offset || 0);
},
unix:function() {
return Math.floor(+this / 1e3);
},
toString:function() {
return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function() {
return this._offset ? new Date(+this) :this._d;
},
toISOString:function() {
var e = lt(this).utc();
return 0 < e.year() && e.year() <= 9999 ? O(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") :O(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function() {
var e = this;
return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds() ];
},
isValid:function() {
return S(this);
},
isDSTShifted:function() {
return this._a ? this.isValid() && m(this._a, (this._isUTC ? lt.utc(this._a) :lt(this._a)).toArray()) > 0 :!1;
},
parsingFlags:function() {
return l({}, this._pf);
},
invalidAt:function() {
return this._pf.overflow;
},
utc:function() {
return this.zone(0);
},
local:function() {
return this.zone(0), this._isUTC = !1, this;
},
format:function(e) {
var t = O(this, e || lt.defaultFormat);
return this.lang().postformat(t);
},
add:function(e, t) {
var n;
return n = "string" == typeof e ? lt.duration(+t, e) :lt.duration(e, t), h(this, n, 1), 
this;
},
subtract:function(e, t) {
var n;
return n = "string" == typeof e ? lt.duration(+t, e) :lt.duration(e, t), h(this, n, -1), 
this;
},
diff:function(e, t, n) {
var o, i, r = x(e, this), a = 6e4 * (this.zone() - r.zone());
return t = f(t), "year" === t || "month" === t ? (o = 432e5 * (this.daysInMonth() + r.daysInMonth()), 
i = 12 * (this.year() - r.year()) + (this.month() - r.month()), i += (this - lt(this).startOf("month") - (r - lt(r).startOf("month"))) / o, 
i -= 6e4 * (this.zone() - lt(this).startOf("month").zone() - (r.zone() - lt(r).startOf("month").zone())) / o, 
"year" === t && (i /= 12)) :(o = this - r, i = "second" === t ? o / 1e3 :"minute" === t ? o / 6e4 :"hour" === t ? o / 36e5 :"day" === t ? (o - a) / 864e5 :"week" === t ? (o - a) / 6048e5 :o), 
n ? i :c(i);
},
from:function(e, t) {
return lt.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t);
},
fromNow:function(e) {
return this.from(lt(), e);
},
calendar:function() {
var e = x(lt(), this).startOf("day"), t = this.diff(e, "days", !0), n = -6 > t ? "sameElse" :-1 > t ? "lastWeek" :0 > t ? "lastDay" :1 > t ? "sameDay" :2 > t ? "nextDay" :7 > t ? "nextWeek" :"sameElse";
return this.format(this.lang().calendar(n, this));
},
isLeapYear:function() {
return M(this.year());
},
isDST:function() {
return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
},
day:function(e) {
var t = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != e ? (e = J(e, this.lang()), this.add({
d:e - t
})) :t;
},
month:it("Month", !0),
startOf:function(e) {
switch (e = f(e)) {
case "year":
this.month(0);

case "quarter":
case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === e ? this.weekday(0) :"isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), 
this;
},
endOf:function(e) {
return e = f(e), this.startOf(e).add("isoWeek" === e ? "week" :e, 1).subtract("ms", 1);
},
isAfter:function(e, t) {
return t = "undefined" != typeof t ? t :"millisecond", +this.clone().startOf(t) > +lt(e).startOf(t);
},
isBefore:function(e, t) {
return t = "undefined" != typeof t ? t :"millisecond", +this.clone().startOf(t) < +lt(e).startOf(t);
},
isSame:function(e, t) {
return t = t || "ms", +this.clone().startOf(t) === +x(e, this).startOf(t);
},
min:function(e) {
return e = lt.apply(null, arguments), this > e ? this :e;
},
max:function(e) {
return e = lt.apply(null, arguments), e > this ? this :e;
},
zone:function(e, t) {
var n = this._offset || 0;
return null == e ? this._isUTC ? n :this._d.getTimezoneOffset() :("string" == typeof e && (e = H(e)), 
Math.abs(e) < 16 && (e = 60 * e), this._offset = e, this._isUTC = !0, n !== e && (!t || this._changeInProgress ? h(this, lt.duration(n - e, "m"), 1, !1) :this._changeInProgress || (this._changeInProgress = !0, 
lt.updateOffset(this, !0), this._changeInProgress = null)), this);
},
zoneAbbr:function() {
return this._isUTC ? "UTC" :"";
},
zoneName:function() {
return this._isUTC ? "Coordinated Universal Time" :"";
},
parseZone:function() {
return this._tzm ? this.zone(this._tzm) :"string" == typeof this._i && this.zone(this._i), 
this;
},
hasAlignedHourOffset:function(e) {
return e = e ? lt(e).zone() :0, (this.zone() - e) % 60 === 0;
},
daysInMonth:function() {
return y(this.year(), this.month());
},
dayOfYear:function(e) {
var t = pt((lt(this).startOf("day") - lt(this).startOf("year")) / 864e5) + 1;
return null == e ? t :this.add("d", e - t);
},
quarter:function(e) {
return null == e ? Math.ceil((this.month() + 1) / 3) :this.month(3 * (e - 1) + this.month() % 3);
},
weekYear:function(e) {
var t = X(this, this.lang()._week.dow, this.lang()._week.doy).year;
return null == e ? t :this.add("y", e - t);
},
isoWeekYear:function(e) {
var t = X(this, 1, 4).year;
return null == e ? t :this.add("y", e - t);
},
week:function(e) {
var t = this.lang().week(this);
return null == e ? t :this.add("d", 7 * (e - t));
},
isoWeek:function(e) {
var t = X(this, 1, 4).week;
return null == e ? t :this.add("d", 7 * (e - t));
},
weekday:function(e) {
var t = (this.day() + 7 - this.lang()._week.dow) % 7;
return null == e ? t :this.add("d", e - t);
},
isoWeekday:function(e) {
return null == e ? this.day() || 7 :this.day(this.day() % 7 ? e :e - 7);
},
isoWeeksInYear:function() {
return b(this.year(), 1, 4);
},
weeksInYear:function() {
var e = this._lang._week;
return b(this.year(), e.dow, e.doy);
},
get:function(e) {
return e = f(e), this[e]();
},
set:function(e, t) {
return e = f(e), "function" == typeof this[e] && this[e](t), this;
},
lang:function(t) {
return t === e ? this._lang :(this._lang = E(t), this);
}
}), lt.fn.millisecond = lt.fn.milliseconds = it("Milliseconds", !1), lt.fn.second = lt.fn.seconds = it("Seconds", !1), 
lt.fn.minute = lt.fn.minutes = it("Minutes", !1), lt.fn.hour = lt.fn.hours = it("Hours", !0), 
lt.fn.date = it("Date", !0), lt.fn.dates = n("dates accessor is deprecated. Use date instead.", it("Date", !0)), 
lt.fn.year = it("FullYear", !0), lt.fn.years = n("years accessor is deprecated. Use year instead.", it("FullYear", !0)), 
lt.fn.days = lt.fn.day, lt.fn.months = lt.fn.month, lt.fn.weeks = lt.fn.week, lt.fn.isoWeeks = lt.fn.isoWeek, 
lt.fn.quarters = lt.fn.quarter, lt.fn.toJSON = lt.fn.toISOString, l(lt.duration.fn = s.prototype, {
_bubble:function() {
var e, t, n, o, i = this._milliseconds, r = this._days, a = this._months, s = this._data;
s.milliseconds = i % 1e3, e = c(i / 1e3), s.seconds = e % 60, t = c(e / 60), s.minutes = t % 60, 
n = c(t / 60), s.hours = n % 24, r += c(n / 24), s.days = r % 30, a += c(r / 30), 
s.months = a % 12, o = c(a / 12), s.years = o;
},
weeks:function() {
return c(this.days() / 7);
},
valueOf:function() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * w(this._months / 12);
},
humanize:function(e) {
var t = +this, n = Q(t, !e, this.lang());
return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n);
},
add:function(e, t) {
var n = lt.duration(e, t);
return this._milliseconds += n._milliseconds, this._days += n._days, this._months += n._months, 
this._bubble(), this;
},
subtract:function(e, t) {
var n = lt.duration(e, t);
return this._milliseconds -= n._milliseconds, this._days -= n._days, this._months -= n._months, 
this._bubble(), this;
},
get:function(e) {
return e = f(e), this[e.toLowerCase() + "s"]();
},
as:function(e) {
return e = f(e), this["as" + e.charAt(0).toUpperCase() + e.slice(1) + "s"]();
},
lang:lt.fn.lang,
toIsoString:function() {
var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), o = Math.abs(this.hours()), i = Math.abs(this.minutes()), r = Math.abs(this.seconds() + this.milliseconds() / 1e3);
return this.asSeconds() ? (this.asSeconds() < 0 ? "-" :"") + "P" + (e ? e + "Y" :"") + (t ? t + "M" :"") + (n ? n + "D" :"") + (o || i || r ? "T" :"") + (o ? o + "H" :"") + (i ? i + "M" :"") + (r ? r + "S" :"") :"P0D";
}
});
for (ct in Kt) Kt.hasOwnProperty(ct) && (at(ct, Kt[ct]), rt(ct.toLowerCase()));
at("Weeks", 6048e5), lt.duration.fn.asMonths = function() {
return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
}, lt.lang("en", {
ordinal:function(e) {
var t = e % 10, n = 1 === w(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
}
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ar-ma", {
months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[اليوم على الساعة] LT",
nextDay:"[غدا على الساعة] LT",
nextWeek:"dddd [على الساعة] LT",
lastDay:"[أمس على الساعة] LT",
lastWeek:"dddd [على الساعة] LT",
sameElse:"L"
},
relativeTime:{
future:"في %s",
past:"منذ %s",
s:"ثوان",
m:"دقيقة",
mm:"%d دقائق",
h:"ساعة",
hh:"%d ساعات",
d:"يوم",
dd:"%d أيام",
M:"شهر",
MM:"%d أشهر",
y:"سنة",
yy:"%d سنوات"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ar", {
months:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
monthsShort:"يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysShort:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[اليوم على الساعة] LT",
nextDay:"[غدا على الساعة] LT",
nextWeek:"dddd [على الساعة] LT",
lastDay:"[أمس على الساعة] LT",
lastWeek:"dddd [على الساعة] LT",
sameElse:"L"
},
relativeTime:{
future:"في %s",
past:"منذ %s",
s:"ثوان",
m:"دقيقة",
mm:"%d دقائق",
h:"ساعة",
hh:"%d ساعات",
d:"يوم",
dd:"%d أيام",
M:"شهر",
MM:"%d أشهر",
y:"سنة",
yy:"%d سنوات"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("bg", {
months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),
weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),
longDateFormat:{
LT:"H:mm",
L:"D.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Днес в] LT",
nextDay:"[Утре в] LT",
nextWeek:"dddd [в] LT",
lastDay:"[Вчера в] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[В изминалата] dddd [в] LT";

case 1:
case 2:
case 4:
case 5:
return "[В изминалия] dddd [в] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"след %s",
past:"преди %s",
s:"няколко секунди",
m:"минута",
mm:"%d минути",
h:"час",
hh:"%d часа",
d:"ден",
dd:"%d дни",
M:"месец",
MM:"%d месеца",
y:"година",
yy:"%d години"
},
ordinal:function(e) {
var t = e % 10, n = e % 100;
return 0 === e ? e + "-ев" :0 === n ? e + "-ен" :n > 10 && 20 > n ? e + "-ти" :1 === t ? e + "-ви" :2 === t ? e + "-ри" :7 === t || 8 === t ? e + "-ми" :e + "-ти";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(t) {
function n(e, t, n) {
var o = {
mm:"munutenn",
MM:"miz",
dd:"devezh"
};
return e + " " + r(o[n], e);
}
function o(e) {
switch (i(e)) {
case 1:
case 3:
case 4:
case 5:
case 9:
return e + " bloaz";

default:
return e + " vloaz";
}
}
function i(e) {
return e > 9 ? i(e % 10) :e;
}
function r(e, t) {
return 2 === t ? a(e) :e;
}
function a(t) {
var n = {
m:"v",
b:"v",
d:"z"
};
return n[t.charAt(0)] === e ? t :n[t.charAt(0)] + t.substring(1);
}
return t.lang("br", {
months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
longDateFormat:{
LT:"h[e]mm A",
L:"DD/MM/YYYY",
LL:"D [a viz] MMMM YYYY",
LLL:"D [a viz] MMMM YYYY LT",
LLLL:"dddd, D [a viz] MMMM YYYY LT"
},
calendar:{
sameDay:"[Hiziv da] LT",
nextDay:"[Warc'hoazh da] LT",
nextWeek:"dddd [da] LT",
lastDay:"[Dec'h da] LT",
lastWeek:"dddd [paset da] LT",
sameElse:"L"
},
relativeTime:{
future:"a-benn %s",
past:"%s 'zo",
s:"un nebeud segondennoù",
m:"ur vunutenn",
mm:n,
h:"un eur",
hh:"%d eur",
d:"un devezh",
dd:n,
M:"ur miz",
MM:n,
y:"ur bloaz",
yy:o
},
ordinal:function(e) {
var t = 1 === e ? "añ" :"vet";
return e + t;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = e + " ";
switch (n) {
case "m":
return t ? "jedna minuta" :"jedne minute";

case "mm":
return o += 1 === e ? "minuta" :2 === e || 3 === e || 4 === e ? "minute" :"minuta";

case "h":
return t ? "jedan sat" :"jednog sata";

case "hh":
return o += 1 === e ? "sat" :2 === e || 3 === e || 4 === e ? "sata" :"sati";

case "dd":
return o += 1 === e ? "dan" :"dana";

case "MM":
return o += 1 === e ? "mjesec" :2 === e || 3 === e || 4 === e ? "mjeseca" :"mjeseci";

case "yy":
return o += 1 === e ? "godina" :2 === e || 3 === e || 4 === e ? "godine" :"godina";
}
}
return e.lang("bs", {
months:"januar_februar_mart_april_maj_juni_juli_avgust_septembar_oktobar_novembar_decembar".split("_"),
monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedjelju] [u] LT";

case 3:
return "[u] [srijedu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[jučer u] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
return "[prošlu] dddd [u] LT";

case 6:
return "[prošle] [subote] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[prošli] dddd [u] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"prije %s",
s:"par sekundi",
m:t,
mm:t,
h:t,
hh:t,
d:"dan",
dd:t,
M:"mjesec",
MM:t,
y:"godinu",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ca", {
months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),
weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:function() {
return "[avui a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
nextDay:function() {
return "[demà a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
nextWeek:function() {
return "dddd [a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
lastDay:function() {
return "[ahir a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
lastWeek:function() {
return "[el] dddd [passat a " + (1 !== this.hours() ? "les" :"la") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"fa %s",
s:"uns segons",
m:"un minut",
mm:"%d minuts",
h:"una hora",
hh:"%d hores",
d:"un dia",
dd:"%d dies",
M:"un mes",
MM:"%d mesos",
y:"un any",
yy:"%d anys"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e > 1 && 5 > e && 1 !== ~~(e / 10);
}
function n(e, n, o, i) {
var r = e + " ";
switch (o) {
case "s":
return n || i ? "pár sekund" :"pár sekundami";

case "m":
return n ? "minuta" :i ? "minutu" :"minutou";

case "mm":
return n || i ? r + (t(e) ? "minuty" :"minut") :r + "minutami";

case "h":
return n ? "hodina" :i ? "hodinu" :"hodinou";

case "hh":
return n || i ? r + (t(e) ? "hodiny" :"hodin") :r + "hodinami";

case "d":
return n || i ? "den" :"dnem";

case "dd":
return n || i ? r + (t(e) ? "dny" :"dní") :r + "dny";

case "M":
return n || i ? "měsíc" :"měsícem";

case "MM":
return n || i ? r + (t(e) ? "měsíce" :"měsíců") :r + "měsíci";

case "y":
return n || i ? "rok" :"rokem";

case "yy":
return n || i ? r + (t(e) ? "roky" :"let") :r + "lety";
}
}
var o = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"), i = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");
return e.lang("cs", {
months:o,
monthsShort:i,
monthsParse:function(e, t) {
var n, o = [];
for (n = 0; 12 > n; n++) o[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
return o;
}(o, i),
weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),
weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),
longDateFormat:{
LT:"H.mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd D. MMMM YYYY LT"
},
calendar:{
sameDay:"[dnes v] LT",
nextDay:"[zítra v] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v neděli v] LT";

case 1:
case 2:
return "[v] dddd [v] LT";

case 3:
return "[ve středu v] LT";

case 4:
return "[ve čtvrtek v] LT";

case 5:
return "[v pátek v] LT";

case 6:
return "[v sobotu v] LT";
}
},
lastDay:"[včera v] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[minulou neděli v] LT";

case 1:
case 2:
return "[minulé] dddd [v] LT";

case 3:
return "[minulou středu v] LT";

case 4:
case 5:
return "[minulý] dddd [v] LT";

case 6:
return "[minulou sobotu v] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"před %s",
s:n,
m:n,
mm:n,
h:n,
hh:n,
d:n,
dd:n,
M:n,
MM:n,
y:n,
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("cv", {
months:"кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),
monthsShort:"кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),
weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),
weekdaysShort:"выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),
weekdaysMin:"вр_тн_ыт_юн_кç_эр_шм".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD-MM-YYYY",
LL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",
LLL:"YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",
LLLL:"dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"
},
calendar:{
sameDay:"[Паян] LT [сехетре]",
nextDay:"[Ыран] LT [сехетре]",
lastDay:"[Ĕнер] LT [сехетре]",
nextWeek:"[Çитес] dddd LT [сехетре]",
lastWeek:"[Иртнĕ] dddd LT [сехетре]",
sameElse:"L"
},
relativeTime:{
future:function(e) {
var t = /сехет$/i.exec(e) ? "рен" :/çул$/i.exec(e) ? "тан" :"ран";
return e + t;
},
past:"%s каялла",
s:"пĕр-ик çеккунт",
m:"пĕр минут",
mm:"%d минут",
h:"пĕр сехет",
hh:"%d сехет",
d:"пĕр кун",
dd:"%d кун",
M:"пĕр уйăх",
MM:"%d уйăх",
y:"пĕр çул",
yy:"%d çул"
},
ordinal:"%d-мĕш",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("cy", {
months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Heddiw am] LT",
nextDay:"[Yfory am] LT",
nextWeek:"dddd [am] LT",
lastDay:"[Ddoe am] LT",
lastWeek:"dddd [diwethaf am] LT",
sameElse:"L"
},
relativeTime:{
future:"mewn %s",
past:"%s yn àl",
s:"ychydig eiliadau",
m:"munud",
mm:"%d munud",
h:"awr",
hh:"%d awr",
d:"diwrnod",
dd:"%d diwrnod",
M:"mis",
MM:"%d mis",
y:"blwyddyn",
yy:"%d flynedd"
},
ordinal:function(e) {
var t = e, n = "", o = [ "", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed" ];
return t > 20 ? n = 40 === t || 50 === t || 60 === t || 80 === t || 100 === t ? "fed" :"ain" :t > 0 && (n = o[t]), 
e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("da", {
months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),
weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D. MMMM, YYYY LT"
},
calendar:{
sameDay:"[I dag kl.] LT",
nextDay:"[I morgen kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[I går kl.] LT",
lastWeek:"[sidste] dddd [kl] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"%s siden",
s:"få sekunder",
m:"et minut",
mm:"%d minutter",
h:"en time",
hh:"%d timer",
d:"en dag",
dd:"%d dage",
M:"en måned",
MM:"%d måneder",
y:"et år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = {
m:[ "eine Minute", "einer Minute" ],
h:[ "eine Stunde", "einer Stunde" ],
d:[ "ein Tag", "einem Tag" ],
dd:[ e + " Tage", e + " Tagen" ],
M:[ "ein Monat", "einem Monat" ],
MM:[ e + " Monate", e + " Monaten" ],
y:[ "ein Jahr", "einem Jahr" ],
yy:[ e + " Jahre", e + " Jahren" ]
};
return t ? o[n][0] :o[n][1];
}
return e.lang("de", {
months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm [Uhr]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Heute um] LT",
sameElse:"L",
nextDay:"[Morgen um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gestern um] LT",
lastWeek:"[letzten] dddd [um] LT"
},
relativeTime:{
future:"in %s",
past:"vor %s",
s:"ein paar Sekunden",
m:t,
mm:"%d Minuten",
h:t,
hh:"%d Stunden",
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("el", {
monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
months:function(e, t) {
return /D/.test(t.substring(0, t.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] :this._monthsNominativeEl[e.month()];
},
monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
meridiem:function(e, t, n) {
return e > 11 ? n ? "μμ" :"ΜΜ" :n ? "πμ" :"ΠΜ";
},
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendarEl:{
sameDay:"[Σήμερα {}] LT",
nextDay:"[Αύριο {}] LT",
nextWeek:"dddd [{}] LT",
lastDay:"[Χθες {}] LT",
lastWeek:"[την προηγούμενη] dddd [{}] LT",
sameElse:"L"
},
calendar:function(e, t) {
var n = this._calendarEl[e], o = t && t.hours();
return n.replace("{}", o % 12 === 1 ? "στη" :"στις");
},
relativeTime:{
future:"σε %s",
past:"%s πριν",
s:"δευτερόλεπτα",
m:"ένα λεπτό",
mm:"%d λεπτά",
h:"μία ώρα",
hh:"%d ώρες",
d:"μία μέρα",
dd:"%d μέρες",
M:"ένας μήνας",
MM:"%d μήνες",
y:"ένας χρόνος",
yy:"%d χρόνια"
},
ordinal:function(e) {
return e + "η";
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-au", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-ca", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"YYYY-MM-DD",
LL:"D MMMM, YYYY",
LLL:"D MMMM, YYYY LT",
LLLL:"dddd, D MMMM, YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("en-gb", {
months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "th" :1 === t ? "st" :2 === t ? "nd" :3 === t ? "rd" :"th";
return e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("eo", {
months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D[-an de] MMMM, YYYY",
LLL:"D[-an de] MMMM, YYYY LT",
LLLL:"dddd, [la] D[-an de] MMMM, YYYY LT"
},
meridiem:function(e, t, n) {
return e > 11 ? n ? "p.t.m." :"P.T.M." :n ? "a.t.m." :"A.T.M.";
},
calendar:{
sameDay:"[Hodiaŭ je] LT",
nextDay:"[Morgaŭ je] LT",
nextWeek:"dddd [je] LT",
lastDay:"[Hieraŭ je] LT",
lastWeek:"[pasinta] dddd [je] LT",
sameElse:"L"
},
relativeTime:{
future:"je %s",
past:"antaŭ %s",
s:"sekundoj",
m:"minuto",
mm:"%d minutoj",
h:"horo",
hh:"%d horoj",
d:"tago",
dd:"%d tagoj",
M:"monato",
MM:"%d monatoj",
y:"jaro",
yy:"%d jaroj"
},
ordinal:"%da",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"), n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
return e.lang("es", {
months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
monthsShort:function(e, o) {
return /-MMM-/.test(o) ? n[e.month()] :t[e.month()];
},
weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),
weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [del] YYYY",
LLL:"D [de] MMMM [del] YYYY LT",
LLLL:"dddd, D [de] MMMM [del] YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoy a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextDay:function() {
return "[mañana a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextWeek:function() {
return "dddd [a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastDay:function() {
return "[ayer a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastWeek:function() {
return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"hace %s",
s:"unos segundos",
m:"un minuto",
mm:"%d minutos",
h:"una hora",
hh:"%d horas",
d:"un día",
dd:"%d días",
M:"un mes",
MM:"%d meses",
y:"un año",
yy:"%d años"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, o) {
var i = {
s:[ "mõne sekundi", "mõni sekund", "paar sekundit" ],
m:[ "ühe minuti", "üks minut" ],
mm:[ e + " minuti", e + " minutit" ],
h:[ "ühe tunni", "tund aega", "üks tund" ],
hh:[ e + " tunni", e + " tundi" ],
d:[ "ühe päeva", "üks päev" ],
M:[ "kuu aja", "kuu aega", "üks kuu" ],
MM:[ e + " kuu", e + " kuud" ],
y:[ "ühe aasta", "aasta", "üks aasta" ],
yy:[ e + " aasta", e + " aastat" ]
};
return t ? i[n][2] ? i[n][2] :i[n][1] :o ? i[n][0] :i[n][1];
}
return e.lang("et", {
months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
weekdaysShort:"P_E_T_K_N_R_L".split("_"),
weekdaysMin:"P_E_T_K_N_R_L".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Täna,] LT",
nextDay:"[Homme,] LT",
nextWeek:"[Järgmine] dddd LT",
lastDay:"[Eile,] LT",
lastWeek:"[Eelmine] dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s pärast",
past:"%s tagasi",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:"%d päeva",
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("eu", {
months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),
weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"YYYY[ko] MMMM[ren] D[a]",
LLL:"YYYY[ko] MMMM[ren] D[a] LT",
LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] LT",
l:"YYYY-M-D",
ll:"YYYY[ko] MMM D[a]",
lll:"YYYY[ko] MMM D[a] LT",
llll:"ddd, YYYY[ko] MMM D[a] LT"
},
calendar:{
sameDay:"[gaur] LT[etan]",
nextDay:"[bihar] LT[etan]",
nextWeek:"dddd LT[etan]",
lastDay:"[atzo] LT[etan]",
lastWeek:"[aurreko] dddd LT[etan]",
sameElse:"L"
},
relativeTime:{
future:"%s barru",
past:"duela %s",
s:"segundo batzuk",
m:"minutu bat",
mm:"%d minutu",
h:"ordu bat",
hh:"%d ordu",
d:"egun bat",
dd:"%d egun",
M:"hilabete bat",
MM:"%d hilabete",
y:"urte bat",
yy:"%d urte"
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"۱",
2:"۲",
3:"۳",
4:"۴",
5:"۵",
6:"۶",
7:"۷",
8:"۸",
9:"۹",
0:"۰"
}, n = {
"۱":"1",
"۲":"2",
"۳":"3",
"۴":"4",
"۵":"5",
"۶":"6",
"۷":"7",
"۸":"8",
"۹":"9",
"۰":"0"
};
return e.lang("fa", {
months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
meridiem:function(e) {
return 12 > e ? "قبل از ظهر" :"بعد از ظهر";
},
calendar:{
sameDay:"[امروز ساعت] LT",
nextDay:"[فردا ساعت] LT",
nextWeek:"dddd [ساعت] LT",
lastDay:"[دیروز ساعت] LT",
lastWeek:"dddd [پیش] [ساعت] LT",
sameElse:"L"
},
relativeTime:{
future:"در %s",
past:"%s پیش",
s:"چندین ثانیه",
m:"یک دقیقه",
mm:"%d دقیقه",
h:"یک ساعت",
hh:"%d ساعت",
d:"یک روز",
dd:"%d روز",
M:"یک ماه",
MM:"%d ماه",
y:"یک سال",
yy:"%d سال"
},
preparse:function(e) {
return e.replace(/[۰-۹]/g, function(e) {
return n[e];
}).replace(/،/g, ",");
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
}).replace(/,/g, "،");
},
ordinal:"%dم",
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, o, i) {
var r = "";
switch (o) {
case "s":
return i ? "muutaman sekunnin" :"muutama sekunti";

case "m":
return i ? "minuutin" :"minuutti";

case "mm":
r = i ? "minuutin" :"minuuttia";
break;

case "h":
return i ? "tunnin" :"tunti";

case "hh":
r = i ? "tunnin" :"tuntia";
break;

case "d":
return i ? "päivän" :"päivä";

case "dd":
r = i ? "päivän" :"päivää";
break;

case "M":
return i ? "kuukauden" :"kuukausi";

case "MM":
r = i ? "kuukauden" :"kuukautta";
break;

case "y":
return i ? "vuoden" :"vuosi";

case "yy":
r = i ? "vuoden" :"vuotta";
}
return r = n(e, i) + " " + r;
}
function n(e, t) {
return 10 > e ? t ? i[e] :o[e] :e;
}
var o = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "), i = [ "nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", o[7], o[8], o[9] ];
return e.lang("fi", {
months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),
weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD.MM.YYYY",
LL:"Do MMMM[ta] YYYY",
LLL:"Do MMMM[ta] YYYY, [klo] LT",
LLLL:"dddd, Do MMMM[ta] YYYY, [klo] LT",
l:"D.M.YYYY",
ll:"Do MMM YYYY",
lll:"Do MMM YYYY, [klo] LT",
llll:"ddd, Do MMM YYYY, [klo] LT"
},
calendar:{
sameDay:"[tänään] [klo] LT",
nextDay:"[huomenna] [klo] LT",
nextWeek:"dddd [klo] LT",
lastDay:"[eilen] [klo] LT",
lastWeek:"[viime] dddd[na] [klo] LT",
sameElse:"L"
},
relativeTime:{
future:"%s päästä",
past:"%s sitten",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fo", {
months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),
weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D. MMMM, YYYY LT"
},
calendar:{
sameDay:"[Í dag kl.] LT",
nextDay:"[Í morgin kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[Í gjár kl.] LT",
lastWeek:"[síðstu] dddd [kl] LT",
sameElse:"L"
},
relativeTime:{
future:"um %s",
past:"%s síðani",
s:"fá sekund",
m:"ein minutt",
mm:"%d minuttir",
h:"ein tími",
hh:"%d tímar",
d:"ein dagur",
dd:"%d dagar",
M:"ein mánaði",
MM:"%d mánaðir",
y:"eitt ár",
yy:"%d ár"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fr-ca", {
months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui à] LT",
nextDay:"[Demain à] LT",
nextWeek:"dddd [à] LT",
lastDay:"[Hier à] LT",
lastWeek:"dddd [dernier à] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(e) {
return e + (1 === e ? "er" :"");
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("fr", {
months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),
weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui à] LT",
nextDay:"[Demain à] LT",
nextWeek:"dddd [à] LT",
lastDay:"[Hier à] LT",
lastWeek:"dddd [dernier à] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(e) {
return e + (1 === e ? "er" :"");
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("gl", {
months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),
weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoxe " + (1 !== this.hours() ? "ás" :"á") + "] LT";
},
nextDay:function() {
return "[mañá " + (1 !== this.hours() ? "ás" :"á") + "] LT";
},
nextWeek:function() {
return "dddd [" + (1 !== this.hours() ? "ás" :"a") + "] LT";
},
lastDay:function() {
return "[onte " + (1 !== this.hours() ? "á" :"a") + "] LT";
},
lastWeek:function() {
return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" :"a") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:function(e) {
return "uns segundos" === e ? "nuns segundos" :"en " + e;
},
past:"hai %s",
s:"uns segundos",
m:"un minuto",
mm:"%d minutos",
h:"unha hora",
hh:"%d horas",
d:"un día",
dd:"%d días",
M:"un mes",
MM:"%d meses",
y:"un ano",
yy:"%d anos"
},
ordinal:"%dº",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("he", {
months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [ב]MMMM YYYY",
LLL:"D [ב]MMMM YYYY LT",
LLLL:"dddd, D [ב]MMMM YYYY LT",
l:"D/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY LT",
llll:"ddd, D MMM YYYY LT"
},
calendar:{
sameDay:"[היום ב־]LT",
nextDay:"[מחר ב־]LT",
nextWeek:"dddd [בשעה] LT",
lastDay:"[אתמול ב־]LT",
lastWeek:"[ביום] dddd [האחרון בשעה] LT",
sameElse:"L"
},
relativeTime:{
future:"בעוד %s",
past:"לפני %s",
s:"מספר שניות",
m:"דקה",
mm:"%d דקות",
h:"שעה",
hh:function(e) {
return 2 === e ? "שעתיים" :e + " שעות";
},
d:"יום",
dd:function(e) {
return 2 === e ? "יומיים" :e + " ימים";
},
M:"חודש",
MM:function(e) {
return 2 === e ? "חודשיים" :e + " חודשים";
},
y:"שנה",
yy:function(e) {
return 2 === e ? "שנתיים" :e + " שנים";
}
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, n = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("hi", {
months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),
longDateFormat:{
LT:"A h:mm बजे",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[कल] LT",
nextWeek:"dddd, LT",
lastDay:"[कल] LT",
lastWeek:"[पिछले] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s में",
past:"%s पहले",
s:"कुछ ही क्षण",
m:"एक मिनट",
mm:"%d मिनट",
h:"एक घंटा",
hh:"%d घंटे",
d:"एक दिन",
dd:"%d दिन",
M:"एक महीने",
MM:"%d महीने",
y:"एक वर्ष",
yy:"%d वर्ष"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return n[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 4 > e ? "रात" :10 > e ? "सुबह" :17 > e ? "दोपहर" :20 > e ? "शाम" :"रात";
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = e + " ";
switch (n) {
case "m":
return t ? "jedna minuta" :"jedne minute";

case "mm":
return o += 1 === e ? "minuta" :2 === e || 3 === e || 4 === e ? "minute" :"minuta";

case "h":
return t ? "jedan sat" :"jednog sata";

case "hh":
return o += 1 === e ? "sat" :2 === e || 3 === e || 4 === e ? "sata" :"sati";

case "dd":
return o += 1 === e ? "dan" :"dana";

case "MM":
return o += 1 === e ? "mjesec" :2 === e || 3 === e || 4 === e ? "mjeseca" :"mjeseci";

case "yy":
return o += 1 === e ? "godina" :2 === e || 3 === e || 4 === e ? "godine" :"godina";
}
}
return e.lang("hr", {
months:"sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),
monthsShort:"sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),
weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedjelju] [u] LT";

case 3:
return "[u] [srijedu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[jučer u] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
return "[prošlu] dddd [u] LT";

case 6:
return "[prošle] [subote] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[prošli] dddd [u] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"prije %s",
s:"par sekundi",
m:t,
mm:t,
h:t,
hh:t,
d:"dan",
dd:t,
M:"mjesec",
MM:t,
y:"godinu",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, o) {
var i = e;
switch (n) {
case "s":
return o || t ? "néhány másodperc" :"néhány másodperce";

case "m":
return "egy" + (o || t ? " perc" :" perce");

case "mm":
return i + (o || t ? " perc" :" perce");

case "h":
return "egy" + (o || t ? " óra" :" órája");

case "hh":
return i + (o || t ? " óra" :" órája");

case "d":
return "egy" + (o || t ? " nap" :" napja");

case "dd":
return i + (o || t ? " nap" :" napja");

case "M":
return "egy" + (o || t ? " hónap" :" hónapja");

case "MM":
return i + (o || t ? " hónap" :" hónapja");

case "y":
return "egy" + (o || t ? " év" :" éve");

case "yy":
return i + (o || t ? " év" :" éve");
}
return "";
}
function n(e) {
return (e ? "" :"[múlt] ") + "[" + o[this.day()] + "] LT[-kor]";
}
var o = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
return e.lang("hu", {
months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),
weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),
longDateFormat:{
LT:"H:mm",
L:"YYYY.MM.DD.",
LL:"YYYY. MMMM D.",
LLL:"YYYY. MMMM D., LT",
LLLL:"YYYY. MMMM D., dddd LT"
},
meridiem:function(e, t, n) {
return 12 > e ? n === !0 ? "de" :"DE" :n === !0 ? "du" :"DU";
},
calendar:{
sameDay:"[ma] LT[-kor]",
nextDay:"[holnap] LT[-kor]",
nextWeek:function() {
return n.call(this, !0);
},
lastDay:"[tegnap] LT[-kor]",
lastWeek:function() {
return n.call(this, !1);
},
sameElse:"L"
},
relativeTime:{
future:"%s múlva",
past:"%s",
s:t,
m:t,
mm:t,
h:t,
hh:t,
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = {
nominative:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_"),
accusative:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_")
}, o = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return n[o][e.month()];
}
function n(e) {
var t = "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_");
return t[e.month()];
}
function o(e) {
var t = "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_");
return t[e.day()];
}
return e.lang("hy-am", {
months:t,
monthsShort:n,
weekdays:o,
weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY թ.",
LLL:"D MMMM YYYY թ., LT",
LLLL:"dddd, D MMMM YYYY թ., LT"
},
calendar:{
sameDay:"[այսօր] LT",
nextDay:"[վաղը] LT",
lastDay:"[երեկ] LT",
nextWeek:function() {
return "dddd [օրը ժամը] LT";
},
lastWeek:function() {
return "[անցած] dddd [օրը ժամը] LT";
},
sameElse:"L"
},
relativeTime:{
future:"%s հետո",
past:"%s առաջ",
s:"մի քանի վայրկյան",
m:"րոպե",
mm:"%d րոպե",
h:"ժամ",
hh:"%d ժամ",
d:"օր",
dd:"%d օր",
M:"ամիս",
MM:"%d ամիս",
y:"տարի",
yy:"%d տարի"
},
meridiem:function(e) {
return 4 > e ? "գիշերվա" :12 > e ? "առավոտվա" :17 > e ? "ցերեկվա" :"երեկոյան";
},
ordinal:function(e, t) {
switch (t) {
case "DDD":
case "w":
case "W":
case "DDDo":
return 1 === e ? e + "-ին" :e + "-րդ";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("id", {
months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY [pukul] LT",
LLLL:"dddd, D MMMM YYYY [pukul] LT"
},
meridiem:function(e) {
return 11 > e ? "pagi" :15 > e ? "siang" :19 > e ? "sore" :"malam";
},
calendar:{
sameDay:"[Hari ini pukul] LT",
nextDay:"[Besok pukul] LT",
nextWeek:"dddd [pukul] LT",
lastDay:"[Kemarin pukul] LT",
lastWeek:"dddd [lalu pukul] LT",
sameElse:"L"
},
relativeTime:{
future:"dalam %s",
past:"%s yang lalu",
s:"beberapa detik",
m:"semenit",
mm:"%d menit",
h:"sejam",
hh:"%d jam",
d:"sehari",
dd:"%d hari",
M:"sebulan",
MM:"%d bulan",
y:"setahun",
yy:"%d tahun"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e % 100 === 11 ? !0 :e % 10 === 1 ? !1 :!0;
}
function n(e, n, o, i) {
var r = e + " ";
switch (o) {
case "s":
return n || i ? "nokkrar sekúndur" :"nokkrum sekúndum";

case "m":
return n ? "mínúta" :"mínútu";

case "mm":
return t(e) ? r + (n || i ? "mínútur" :"mínútum") :n ? r + "mínúta" :r + "mínútu";

case "hh":
return t(e) ? r + (n || i ? "klukkustundir" :"klukkustundum") :r + "klukkustund";

case "d":
return n ? "dagur" :i ? "dag" :"degi";

case "dd":
return t(e) ? n ? r + "dagar" :r + (i ? "daga" :"dögum") :n ? r + "dagur" :r + (i ? "dag" :"degi");

case "M":
return n ? "mánuður" :i ? "mánuð" :"mánuði";

case "MM":
return t(e) ? n ? r + "mánuðir" :r + (i ? "mánuði" :"mánuðum") :n ? r + "mánuður" :r + (i ? "mánuð" :"mánuði");

case "y":
return n || i ? "ár" :"ári";

case "yy":
return t(e) ? r + (n || i ? "ár" :"árum") :r + (n || i ? "ár" :"ári");
}
}
return e.lang("is", {
months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),
weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD/MM/YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY [kl.] LT",
LLLL:"dddd, D. MMMM YYYY [kl.] LT"
},
calendar:{
sameDay:"[í dag kl.] LT",
nextDay:"[á morgun kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[í gær kl.] LT",
lastWeek:"[síðasta] dddd [kl.] LT",
sameElse:"L"
},
relativeTime:{
future:"eftir %s",
past:"fyrir %s síðan",
s:n,
m:n,
mm:n,
h:"klukkustund",
hh:n,
d:n,
dd:n,
M:n,
MM:n,
y:n,
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("it", {
months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
weekdaysMin:"D_L_Ma_Me_G_V_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Oggi alle] LT",
nextDay:"[Domani alle] LT",
nextWeek:"dddd [alle] LT",
lastDay:"[Ieri alle] LT",
lastWeek:"[lo scorso] dddd [alle] LT",
sameElse:"L"
},
relativeTime:{
future:function(e) {
return (/^[0-9].+$/.test(e) ? "tra" :"in") + " " + e;
},
past:"%s fa",
s:"alcuni secondi",
m:"un minuto",
mm:"%d minuti",
h:"un'ora",
hh:"%d ore",
d:"un giorno",
dd:"%d giorni",
M:"un mese",
MM:"%d mesi",
y:"un anno",
yy:"%d anni"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ja", {
months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
weekdaysShort:"日_月_火_水_木_金_土".split("_"),
weekdaysMin:"日_月_火_水_木_金_土".split("_"),
longDateFormat:{
LT:"Ah時m分",
L:"YYYY/MM/DD",
LL:"YYYY年M月D日",
LLL:"YYYY年M月D日LT",
LLLL:"YYYY年M月D日LT dddd"
},
meridiem:function(e) {
return 12 > e ? "午前" :"午後";
},
calendar:{
sameDay:"[今日] LT",
nextDay:"[明日] LT",
nextWeek:"[来週]dddd LT",
lastDay:"[昨日] LT",
lastWeek:"[前週]dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s後",
past:"%s前",
s:"数秒",
m:"1分",
mm:"%d分",
h:"1時間",
hh:"%d時間",
d:"1日",
dd:"%d日",
M:"1ヶ月",
MM:"%dヶ月",
y:"1年",
yy:"%d年"
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = {
nominative:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
accusative:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")
}, o = /D[oD] *MMMM?/.test(t) ? "accusative" :"nominative";
return n[o][e.month()];
}
function n(e, t) {
var n = {
nominative:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
accusative:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_")
}, o = /(წინა|შემდეგ)/.test(t) ? "accusative" :"nominative";
return n[o][e.day()];
}
return e.lang("ka", {
months:t,
monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
weekdays:n,
weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
longDateFormat:{
LT:"h:mm A",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[დღეს] LT[-ზე]",
nextDay:"[ხვალ] LT[-ზე]",
lastDay:"[გუშინ] LT[-ზე]",
nextWeek:"[შემდეგ] dddd LT[-ზე]",
lastWeek:"[წინა] dddd LT-ზე",
sameElse:"L"
},
relativeTime:{
future:function(e) {
return /(წამი|წუთი|საათი|წელი)/.test(e) ? e.replace(/ი$/, "ში") :e + "ში";
},
past:function(e) {
return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") :/წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") :void 0;
},
s:"რამდენიმე წამი",
m:"წუთი",
mm:"%d წუთი",
h:"საათი",
hh:"%d საათი",
d:"დღე",
dd:"%d დღე",
M:"თვე",
MM:"%d თვე",
y:"წელი",
yy:"%d წელი"
},
ordinal:function(e) {
return 0 === e ? e :1 === e ? e + "-ლი" :20 > e || 100 >= e && e % 20 === 0 || e % 100 === 0 ? "მე-" + e :e + "-ე";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("km", {
months:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
monthsShort:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[ថ្ងៃនៈ ម៉ោង] LT",
nextDay:"[ស្អែក ម៉ោង] LT",
nextWeek:"dddd [ម៉ោង] LT",
lastDay:"[ម្សិលមិញ ម៉ោង] LT",
lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
sameElse:"L"
},
relativeTime:{
future:"%sទៀត",
past:"%sមុន",
s:"ប៉ុន្មានវិនាទី",
m:"មួយនាទី",
mm:"%d នាទី",
h:"មួយម៉ោង",
hh:"%d ម៉ោង",
d:"មួយថ្ងៃ",
dd:"%d ថ្ងៃ",
M:"មួយខែ",
MM:"%d ខែ",
y:"មួយឆ្នាំ",
yy:"%d ឆ្នាំ"
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ko", {
months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
weekdaysShort:"일_월_화_수_목_금_토".split("_"),
weekdaysMin:"일_월_화_수_목_금_토".split("_"),
longDateFormat:{
LT:"A h시 mm분",
L:"YYYY.MM.DD",
LL:"YYYY년 MMMM D일",
LLL:"YYYY년 MMMM D일 LT",
LLLL:"YYYY년 MMMM D일 dddd LT"
},
meridiem:function(e) {
return 12 > e ? "오전" :"오후";
},
calendar:{
sameDay:"오늘 LT",
nextDay:"내일 LT",
nextWeek:"dddd LT",
lastDay:"어제 LT",
lastWeek:"지난주 dddd LT",
sameElse:"L"
},
relativeTime:{
future:"%s 후",
past:"%s 전",
s:"몇초",
ss:"%d초",
m:"일분",
mm:"%d분",
h:"한시간",
hh:"%d시간",
d:"하루",
dd:"%d일",
M:"한달",
MM:"%d달",
y:"일년",
yy:"%d년"
},
ordinal:"%d일",
meridiemParse:/(오전|오후)/,
isPM:function(e) {
return "오후" === e;
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = {
m:[ "eng Minutt", "enger Minutt" ],
h:[ "eng Stonn", "enger Stonn" ],
d:[ "een Dag", "engem Dag" ],
dd:[ e + " Deeg", e + " Deeg" ],
M:[ "ee Mount", "engem Mount" ],
MM:[ e + " Méint", e + " Méint" ],
y:[ "ee Joer", "engem Joer" ],
yy:[ e + " Joer", e + " Joer" ]
};
return t ? o[n][0] :o[n][1];
}
function n(e) {
var t = e.substr(0, e.indexOf(" "));
return a(t) ? "a " + e :"an " + e;
}
function o(e) {
var t = e.substr(0, e.indexOf(" "));
return a(t) ? "viru " + e :"virun " + e;
}
function i() {
var e = this.format("d");
return r(e) ? "[Leschte] dddd [um] LT" :"[Leschten] dddd [um] LT";
}
function r(e) {
switch (e = parseInt(e, 10)) {
case 0:
case 1:
case 3:
case 5:
case 6:
return !0;

default:
return !1;
}
}
function a(e) {
if (e = parseInt(e, 10), isNaN(e)) return !1;
if (0 > e) return !0;
if (10 > e) return e >= 4 && 7 >= e ? !0 :!1;
if (100 > e) {
var t = e % 10, n = e / 10;
return a(0 === t ? n :t);
}
if (1e4 > e) {
for (;e >= 10; ) e /= 10;
return a(e);
}
return e /= 1e3, a(e);
}
return e.lang("lb", {
months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"H:mm [Auer]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Haut um] LT",
sameElse:"L",
nextDay:"[Muer um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gëschter um] LT",
lastWeek:i
},
relativeTime:{
future:n,
past:o,
s:"e puer Sekonnen",
m:t,
mm:"%d Minutten",
h:t,
hh:"%d Stonnen",
d:t,
dd:t,
M:t,
MM:t,
y:t,
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n, o) {
return t ? "kelios sekundės" :o ? "kelių sekundžių" :"kelias sekundes";
}
function n(e, t, n, o) {
return t ? i(n)[0] :o ? i(n)[1] :i(n)[2];
}
function o(e) {
return e % 10 === 0 || e > 10 && 20 > e;
}
function i(e) {
return s[e].split("_");
}
function r(e, t, r, a) {
var s = e + " ";
return 1 === e ? s + n(e, t, r[0], a) :t ? s + (o(e) ? i(r)[1] :i(r)[0]) :a ? s + i(r)[1] :s + (o(e) ? i(r)[1] :i(r)[2]);
}
function a(e, t) {
var n = -1 === t.indexOf("dddd HH:mm"), o = l[e.weekday()];
return n ? o :o.substring(0, o.length - 2) + "į";
}
var s = {
m:"minutė_minutės_minutę",
mm:"minutės_minučių_minutes",
h:"valanda_valandos_valandą",
hh:"valandos_valandų_valandas",
d:"diena_dienos_dieną",
dd:"dienos_dienų_dienas",
M:"mėnuo_mėnesio_mėnesį",
MM:"mėnesiai_mėnesių_mėnesius",
y:"metai_metų_metus",
yy:"metai_metų_metus"
}, l = "pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis_sekmadienis".split("_");
return e.lang("lt", {
months:"sausio_vasario_kovo_balandžio_gegužės_biržėlio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
weekdays:a,
weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"YYYY [m.] MMMM D [d.]",
LLL:"YYYY [m.] MMMM D [d.], LT [val.]",
LLLL:"YYYY [m.] MMMM D [d.], dddd, LT [val.]",
l:"YYYY-MM-DD",
ll:"YYYY [m.] MMMM D [d.]",
lll:"YYYY [m.] MMMM D [d.], LT [val.]",
llll:"YYYY [m.] MMMM D [d.], ddd, LT [val.]"
},
calendar:{
sameDay:"[Šiandien] LT",
nextDay:"[Rytoj] LT",
nextWeek:"dddd LT",
lastDay:"[Vakar] LT",
lastWeek:"[Praėjusį] dddd LT",
sameElse:"L"
},
relativeTime:{
future:"po %s",
past:"prieš %s",
s:t,
m:n,
mm:r,
h:n,
hh:r,
d:n,
dd:r,
M:n,
MM:r,
y:n,
yy:r
},
ordinal:function(e) {
return e + "-oji";
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = e.split("_");
return n ? t % 10 === 1 && 11 !== t ? o[2] :o[3] :t % 10 === 1 && 11 !== t ? o[0] :o[1];
}
function n(e, n, i) {
return e + " " + t(o[i], e, n);
}
var o = {
mm:"minūti_minūtes_minūte_minūtes",
hh:"stundu_stundas_stunda_stundas",
dd:"dienu_dienas_diena_dienas",
MM:"mēnesi_mēnešus_mēnesis_mēneši",
yy:"gadu_gadus_gads_gadi"
};
return e.lang("lv", {
months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),
weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"YYYY. [gada] D. MMMM",
LLL:"YYYY. [gada] D. MMMM, LT",
LLLL:"YYYY. [gada] D. MMMM, dddd, LT"
},
calendar:{
sameDay:"[Šodien pulksten] LT",
nextDay:"[Rīt pulksten] LT",
nextWeek:"dddd [pulksten] LT",
lastDay:"[Vakar pulksten] LT",
lastWeek:"[Pagājušā] dddd [pulksten] LT",
sameElse:"L"
},
relativeTime:{
future:"%s vēlāk",
past:"%s agrāk",
s:"dažas sekundes",
m:"minūti",
mm:n,
h:"stundu",
hh:n,
d:"dienu",
dd:n,
M:"mēnesi",
MM:n,
y:"gadu",
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("mk", {
months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),
weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),
longDateFormat:{
LT:"H:mm",
L:"D.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Денес во] LT",
nextDay:"[Утре во] LT",
nextWeek:"dddd [во] LT",
lastDay:"[Вчера во] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[Во изминатата] dddd [во] LT";

case 1:
case 2:
case 4:
case 5:
return "[Во изминатиот] dddd [во] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"после %s",
past:"пред %s",
s:"неколку секунди",
m:"минута",
mm:"%d минути",
h:"час",
hh:"%d часа",
d:"ден",
dd:"%d дена",
M:"месец",
MM:"%d месеци",
y:"година",
yy:"%d години"
},
ordinal:function(e) {
var t = e % 10, n = e % 100;
return 0 === e ? e + "-ев" :0 === n ? e + "-ен" :n > 10 && 20 > n ? e + "-ти" :1 === t ? e + "-ви" :2 === t ? e + "-ри" :7 === t || 8 === t ? e + "-ми" :e + "-ти";
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ml", {
months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
longDateFormat:{
LT:"A h:mm -നു",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[ഇന്ന്] LT",
nextDay:"[നാളെ] LT",
nextWeek:"dddd, LT",
lastDay:"[ഇന്നലെ] LT",
lastWeek:"[കഴിഞ്ഞ] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s കഴിഞ്ഞ്",
past:"%s മുൻപ്",
s:"അൽപ നിമിഷങ്ങൾ",
m:"ഒരു മിനിറ്റ്",
mm:"%d മിനിറ്റ്",
h:"ഒരു മണിക്കൂർ",
hh:"%d മണിക്കൂർ",
d:"ഒരു ദിവസം",
dd:"%d ദിവസം",
M:"ഒരു മാസം",
MM:"%d മാസം",
y:"ഒരു വർഷം",
yy:"%d വർഷം"
},
meridiem:function(e) {
return 4 > e ? "രാത്രി" :12 > e ? "രാവിലെ" :17 > e ? "ഉച്ച കഴിഞ്ഞ്" :20 > e ? "വൈകുന്നേരം" :"രാത്രി";
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, n = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("mr", {
months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),
longDateFormat:{
LT:"A h:mm वाजता",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[उद्या] LT",
nextWeek:"dddd, LT",
lastDay:"[काल] LT",
lastWeek:"[मागील] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s नंतर",
past:"%s पूर्वी",
s:"सेकंद",
m:"एक मिनिट",
mm:"%d मिनिटे",
h:"एक तास",
hh:"%d तास",
d:"एक दिवस",
dd:"%d दिवस",
M:"एक महिना",
MM:"%d महिने",
y:"एक वर्ष",
yy:"%d वर्षे"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return n[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 4 > e ? "रात्री" :10 > e ? "सकाळी" :17 > e ? "दुपारी" :20 > e ? "सायंकाळी" :"रात्री";
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ms-my", {
months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
longDateFormat:{
LT:"HH.mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY [pukul] LT",
LLLL:"dddd, D MMMM YYYY [pukul] LT"
},
meridiem:function(e) {
return 11 > e ? "pagi" :15 > e ? "tengahari" :19 > e ? "petang" :"malam";
},
calendar:{
sameDay:"[Hari ini pukul] LT",
nextDay:"[Esok pukul] LT",
nextWeek:"dddd [pukul] LT",
lastDay:"[Kelmarin pukul] LT",
lastWeek:"dddd [lepas pukul] LT",
sameElse:"L"
},
relativeTime:{
future:"dalam %s",
past:"%s yang lepas",
s:"beberapa saat",
m:"seminit",
mm:"%d minit",
h:"sejam",
hh:"%d jam",
d:"sehari",
dd:"%d hari",
M:"sebulan",
MM:"%d bulan",
y:"setahun",
yy:"%d tahun"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("nb", {
months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),
weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"H.mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY [kl.] LT",
LLLL:"dddd D. MMMM YYYY [kl.] LT"
},
calendar:{
sameDay:"[i dag kl.] LT",
nextDay:"[i morgen kl.] LT",
nextWeek:"dddd [kl.] LT",
lastDay:"[i går kl.] LT",
lastWeek:"[forrige] dddd [kl.] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"for %s siden",
s:"noen sekunder",
m:"ett minutt",
mm:"%d minutter",
h:"en time",
hh:"%d timer",
d:"en dag",
dd:"%d dager",
M:"en måned",
MM:"%d måneder",
y:"ett år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"१",
2:"२",
3:"३",
4:"४",
5:"५",
6:"६",
7:"७",
8:"८",
9:"९",
0:"०"
}, n = {
"१":"1",
"२":"2",
"३":"3",
"४":"4",
"५":"5",
"६":"6",
"७":"7",
"८":"8",
"९":"9",
"०":"0"
};
return e.lang("ne", {
months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
weekdaysMin:"आइ._सो._मङ्_बु._बि._शु._श.".split("_"),
longDateFormat:{
LT:"Aको h:mm बजे",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
preparse:function(e) {
return e.replace(/[१२३४५६७८९०]/g, function(e) {
return n[e];
});
},
postformat:function(e) {
return e.replace(/\d/g, function(e) {
return t[e];
});
},
meridiem:function(e) {
return 3 > e ? "राती" :10 > e ? "बिहान" :15 > e ? "दिउँसो" :18 > e ? "बेलुका" :20 > e ? "साँझ" :"राती";
},
calendar:{
sameDay:"[आज] LT",
nextDay:"[भोली] LT",
nextWeek:"[आउँदो] dddd[,] LT",
lastDay:"[हिजो] LT",
lastWeek:"[गएको] dddd[,] LT",
sameElse:"L"
},
relativeTime:{
future:"%sमा",
past:"%s अगाडी",
s:"केही समय",
m:"एक मिनेट",
mm:"%d मिनेट",
h:"एक घण्टा",
hh:"%d घण्टा",
d:"एक दिन",
dd:"%d दिन",
M:"एक महिना",
MM:"%d महिना",
y:"एक बर्ष",
yy:"%d बर्ष"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
return e.lang("nl", {
months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
monthsShort:function(e, o) {
return /-MMM-/.test(o) ? n[e.month()] :t[e.month()];
},
weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),
weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD-MM-YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[vandaag om] LT",
nextDay:"[morgen om] LT",
nextWeek:"dddd [om] LT",
lastDay:"[gisteren om] LT",
lastWeek:"[afgelopen] dddd [om] LT",
sameElse:"L"
},
relativeTime:{
future:"over %s",
past:"%s geleden",
s:"een paar seconden",
m:"één minuut",
mm:"%d minuten",
h:"één uur",
hh:"%d uur",
d:"één dag",
dd:"%d dagen",
M:"één maand",
MM:"%d maanden",
y:"één jaar",
yy:"%d jaar"
},
ordinal:function(e) {
return e + (1 === e || 8 === e || e >= 20 ? "ste" :"de");
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("nn", {
months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),
weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[I dag klokka] LT",
nextDay:"[I morgon klokka] LT",
nextWeek:"dddd [klokka] LT",
lastDay:"[I går klokka] LT",
lastWeek:"[Føregåande] dddd [klokka] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"for %s sidan",
s:"nokre sekund",
m:"eit minutt",
mm:"%d minutt",
h:"ein time",
hh:"%d timar",
d:"ein dag",
dd:"%d dagar",
M:"ein månad",
MM:"%d månader",
y:"eit år",
yy:"%d år"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return 5 > e % 10 && e % 10 > 1 && ~~(e / 10) % 10 !== 1;
}
function n(e, n, o) {
var i = e + " ";
switch (o) {
case "m":
return n ? "minuta" :"minutę";

case "mm":
return i + (t(e) ? "minuty" :"minut");

case "h":
return n ? "godzina" :"godzinę";

case "hh":
return i + (t(e) ? "godziny" :"godzin");

case "MM":
return i + (t(e) ? "miesiące" :"miesięcy");

case "yy":
return i + (t(e) ? "lata" :"lat");
}
}
var o = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"), i = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
return e.lang("pl", {
months:function(e, t) {
return /D MMMM/.test(t) ? i[e.month()] :o[e.month()];
},
monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),
weekdaysMin:"N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Dziś o] LT",
nextDay:"[Jutro o] LT",
nextWeek:"[W] dddd [o] LT",
lastDay:"[Wczoraj o] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[W zeszłą niedzielę o] LT";

case 3:
return "[W zeszłą środę o] LT";

case 6:
return "[W zeszłą sobotę o] LT";

default:
return "[W zeszły] dddd [o] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"%s temu",
s:"kilka sekund",
m:n,
mm:n,
h:n,
hh:n,
d:"1 dzień",
dd:"%d dni",
M:"miesiąc",
MM:n,
y:"rok",
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("pt-br", {
months:"janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
weekdays:"domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
weekdaysShort:"dom_seg_ter_qua_qui_sex_sáb".split("_"),
weekdaysMin:"dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY [às] LT",
LLLL:"dddd, D [de] MMMM [de] YYYY [às] LT"
},
calendar:{
sameDay:"[Hoje às] LT",
nextDay:"[Amanhã às] LT",
nextWeek:"dddd [às] LT",
lastDay:"[Ontem às] LT",
lastWeek:function() {
return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" :"[Última] dddd [às] LT";
},
sameElse:"L"
},
relativeTime:{
future:"em %s",
past:"%s atrás",
s:"segundos",
m:"um minuto",
mm:"%d minutos",
h:"uma hora",
hh:"%d horas",
d:"um dia",
dd:"%d dias",
M:"um mês",
MM:"%d meses",
y:"um ano",
yy:"%d anos"
},
ordinal:"%dº"
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("pt", {
months:"janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
monthsShort:"jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
weekdays:"domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
weekdaysShort:"dom_seg_ter_qua_qui_sex_sáb".split("_"),
weekdaysMin:"dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY LT",
LLLL:"dddd, D [de] MMMM [de] YYYY LT"
},
calendar:{
sameDay:"[Hoje às] LT",
nextDay:"[Amanhã às] LT",
nextWeek:"dddd [às] LT",
lastDay:"[Ontem às] LT",
lastWeek:function() {
return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" :"[Última] dddd [às] LT";
},
sameElse:"L"
},
relativeTime:{
future:"em %s",
past:"%s atrás",
s:"segundos",
m:"um minuto",
mm:"%d minutos",
h:"uma hora",
hh:"%d horas",
d:"um dia",
dd:"%d dias",
M:"um mês",
MM:"%d meses",
y:"um ano",
yy:"%d anos"
},
ordinal:"%dº",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = {
mm:"minute",
hh:"ore",
dd:"zile",
MM:"luni",
yy:"ani"
}, i = " ";
return (e % 100 >= 20 || e >= 100 && e % 100 === 0) && (i = " de "), e + i + o[n];
}
return e.lang("ro", {
months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY H:mm",
LLLL:"dddd, D MMMM YYYY H:mm"
},
calendar:{
sameDay:"[azi la] LT",
nextDay:"[mâine la] LT",
nextWeek:"dddd [la] LT",
lastDay:"[ieri la] LT",
lastWeek:"[fosta] dddd [la] LT",
sameElse:"L"
},
relativeTime:{
future:"peste %s",
past:"%s în urmă",
s:"câteva secunde",
m:"un minut",
mm:t,
h:"o oră",
hh:t,
d:"o zi",
dd:t,
M:"o lună",
MM:t,
y:"un an",
yy:t
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? n[0] :t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] :n[2];
}
function n(e, n, o) {
var i = {
mm:n ? "минута_минуты_минут" :"минуту_минуты_минут",
hh:"час_часа_часов",
dd:"день_дня_дней",
MM:"месяц_месяца_месяцев",
yy:"год_года_лет"
};
return "m" === o ? n ? "минута" :"минуту" :e + " " + t(i[o], +e);
}
function o(e, t) {
var n = {
nominative:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
accusative:"января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
}, o = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return n[o][e.month()];
}
function i(e, t) {
var n = {
nominative:"янв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
accusative:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
}, o = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" :"nominative";
return n[o][e.month()];
}
function r(e, t) {
var n = {
nominative:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
accusative:"воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
}, o = /\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/.test(t) ? "accusative" :"nominative";
return n[o][e.day()];
}
return e.lang("ru", {
months:o,
monthsShort:i,
weekdays:r,
weekdaysShort:"вс_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),
monthsParse:[ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY г.",
LLL:"D MMMM YYYY г., LT",
LLLL:"dddd, D MMMM YYYY г., LT"
},
calendar:{
sameDay:"[Сегодня в] LT",
nextDay:"[Завтра в] LT",
lastDay:"[Вчера в] LT",
nextWeek:function() {
return 2 === this.day() ? "[Во] dddd [в] LT" :"[В] dddd [в] LT";
},
lastWeek:function() {
switch (this.day()) {
case 0:
return "[В прошлое] dddd [в] LT";

case 1:
case 2:
case 4:
return "[В прошлый] dddd [в] LT";

case 3:
case 5:
case 6:
return "[В прошлую] dddd [в] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"через %s",
past:"%s назад",
s:"несколько секунд",
m:n,
mm:n,
h:"час",
hh:n,
d:"день",
dd:n,
M:"месяц",
MM:n,
y:"год",
yy:n
},
meridiem:function(e) {
return 4 > e ? "ночи" :12 > e ? "утра" :17 > e ? "дня" :"вечера";
},
ordinal:function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
return e + "-й";

case "D":
return e + "-го";

case "w":
case "W":
return e + "-я";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e) {
return e > 1 && 5 > e;
}
function n(e, n, o, i) {
var r = e + " ";
switch (o) {
case "s":
return n || i ? "pár sekúnd" :"pár sekundami";

case "m":
return n ? "minúta" :i ? "minútu" :"minútou";

case "mm":
return n || i ? r + (t(e) ? "minúty" :"minút") :r + "minútami";

case "h":
return n ? "hodina" :i ? "hodinu" :"hodinou";

case "hh":
return n || i ? r + (t(e) ? "hodiny" :"hodín") :r + "hodinami";

case "d":
return n || i ? "deň" :"dňom";

case "dd":
return n || i ? r + (t(e) ? "dni" :"dní") :r + "dňami";

case "M":
return n || i ? "mesiac" :"mesiacom";

case "MM":
return n || i ? r + (t(e) ? "mesiace" :"mesiacov") :r + "mesiacmi";

case "y":
return n || i ? "rok" :"rokom";

case "yy":
return n || i ? r + (t(e) ? "roky" :"rokov") :r + "rokmi";
}
}
var o = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"), i = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
return e.lang("sk", {
months:o,
monthsShort:i,
monthsParse:function(e, t) {
var n, o = [];
for (n = 0; 12 > n; n++) o[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
return o;
}(o, i),
weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),
weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd D. MMMM YYYY LT"
},
calendar:{
sameDay:"[dnes o] LT",
nextDay:"[zajtra o] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v nedeľu o] LT";

case 1:
case 2:
return "[v] dddd [o] LT";

case 3:
return "[v stredu o] LT";

case 4:
return "[vo štvrtok o] LT";

case 5:
return "[v piatok o] LT";

case 6:
return "[v sobotu o] LT";
}
},
lastDay:"[včera o] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
return "[minulú nedeľu o] LT";

case 1:
case 2:
return "[minulý] dddd [o] LT";

case 3:
return "[minulú stredu o] LT";

case 4:
case 5:
return "[minulý] dddd [o] LT";

case 6:
return "[minulú sobotu o] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"pred %s",
s:n,
m:n,
mm:n,
h:n,
hh:n,
d:n,
dd:n,
M:n,
MM:n,
y:n,
yy:n
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t, n) {
var o = e + " ";
switch (n) {
case "m":
return t ? "ena minuta" :"eno minuto";

case "mm":
return o += 1 === e ? "minuta" :2 === e ? "minuti" :3 === e || 4 === e ? "minute" :"minut";

case "h":
return t ? "ena ura" :"eno uro";

case "hh":
return o += 1 === e ? "ura" :2 === e ? "uri" :3 === e || 4 === e ? "ure" :"ur";

case "dd":
return o += 1 === e ? "dan" :"dni";

case "MM":
return o += 1 === e ? "mesec" :2 === e ? "meseca" :3 === e || 4 === e ? "mesece" :"mesecev";

case "yy":
return o += 1 === e ? "leto" :2 === e ? "leti" :3 === e || 4 === e ? "leta" :"let";
}
}
return e.lang("sl", {
months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),
weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danes ob] LT",
nextDay:"[jutri ob] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[v] [nedeljo] [ob] LT";

case 3:
return "[v] [sredo] [ob] LT";

case 6:
return "[v] [soboto] [ob] LT";

case 1:
case 2:
case 4:
case 5:
return "[v] dddd [ob] LT";
}
},
lastDay:"[včeraj ob] LT",
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 6:
return "[prejšnja] dddd [ob] LT";

case 1:
case 2:
case 4:
case 5:
return "[prejšnji] dddd [ob] LT";
}
},
sameElse:"L"
},
relativeTime:{
future:"čez %s",
past:"%s nazaj",
s:"nekaj sekund",
m:t,
mm:t,
h:t,
hh:t,
d:"en dan",
dd:t,
M:"en mesec",
MM:t,
y:"eno leto",
yy:t
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("sq", {
months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),
meridiem:function(e) {
return 12 > e ? "PD" :"MD";
},
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[Sot në] LT",
nextDay:"[Nesër në] LT",
nextWeek:"dddd [në] LT",
lastDay:"[Dje në] LT",
lastWeek:"dddd [e kaluar në] LT",
sameElse:"L"
},
relativeTime:{
future:"në %s",
past:"%s më parë",
s:"disa sekonda",
m:"një minutë",
mm:"%d minuta",
h:"një orë",
hh:"%d orë",
d:"një ditë",
dd:"%d ditë",
M:"një muaj",
MM:"%d muaj",
y:"një vit",
yy:"%d vite"
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
words:{
m:[ "један минут", "једне минуте" ],
mm:[ "минут", "минуте", "минута" ],
h:[ "један сат", "једног сата" ],
hh:[ "сат", "сата", "сати" ],
dd:[ "дан", "дана", "дана" ],
MM:[ "месец", "месеца", "месеци" ],
yy:[ "година", "године", "година" ]
},
correctGrammaticalCase:function(e, t) {
return 1 === e ? t[0] :e >= 2 && 4 >= e ? t[1] :t[2];
},
translate:function(e, n, o) {
var i = t.words[o];
return 1 === o.length ? n ? i[0] :i[1] :e + " " + t.correctGrammaticalCase(e, i);
}
};
return e.lang("sr-cyr", {
months:[ "јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар" ],
monthsShort:[ "јан.", "феб.", "мар.", "апр.", "мај", "јун", "јул", "авг.", "сеп.", "окт.", "нов.", "дец." ],
weekdays:[ "недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота" ],
weekdaysShort:[ "нед.", "пон.", "уто.", "сре.", "чет.", "пет.", "суб." ],
weekdaysMin:[ "не", "по", "ут", "ср", "че", "пе", "су" ],
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[данас у] LT",
nextDay:"[сутра у] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[у] [недељу] [у] LT";

case 3:
return "[у] [среду] [у] LT";

case 6:
return "[у] [суботу] [у] LT";

case 1:
case 2:
case 4:
case 5:
return "[у] dddd [у] LT";
}
},
lastDay:"[јуче у] LT",
lastWeek:function() {
var e = [ "[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT" ];
return e[this.day()];
},
sameElse:"L"
},
relativeTime:{
future:"за %s",
past:"пре %s",
s:"неколико секунди",
m:t.translate,
mm:t.translate,
h:t.translate,
hh:t.translate,
d:"дан",
dd:t.translate,
M:"месец",
MM:t.translate,
y:"годину",
yy:t.translate
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
words:{
m:[ "jedan minut", "jedne minute" ],
mm:[ "minut", "minute", "minuta" ],
h:[ "jedan sat", "jednog sata" ],
hh:[ "sat", "sata", "sati" ],
dd:[ "dan", "dana", "dana" ],
MM:[ "mesec", "meseca", "meseci" ],
yy:[ "godina", "godine", "godina" ]
},
correctGrammaticalCase:function(e, t) {
return 1 === e ? t[0] :e >= 2 && 4 >= e ? t[1] :t[2];
},
translate:function(e, n, o) {
var i = t.words[o];
return 1 === o.length ? n ? i[0] :i[1] :e + " " + t.correctGrammaticalCase(e, i);
}
};
return e.lang("sr", {
months:[ "januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar" ],
monthsShort:[ "jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec." ],
weekdays:[ "nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota" ],
weekdaysShort:[ "ned.", "pon.", "uto.", "sre.", "čet.", "pet.", "sub." ],
weekdaysMin:[ "ne", "po", "ut", "sr", "če", "pe", "su" ],
longDateFormat:{
LT:"H:mm",
L:"DD. MM. YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[danas u] LT",
nextDay:"[sutra u] LT",
nextWeek:function() {
switch (this.day()) {
case 0:
return "[u] [nedelju] [u] LT";

case 3:
return "[u] [sredu] [u] LT";

case 6:
return "[u] [subotu] [u] LT";

case 1:
case 2:
case 4:
case 5:
return "[u] dddd [u] LT";
}
},
lastDay:"[juče u] LT",
lastWeek:function() {
var e = [ "[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT" ];
return e[this.day()];
},
sameElse:"L"
},
relativeTime:{
future:"za %s",
past:"pre %s",
s:"nekoliko sekundi",
m:t.translate,
mm:t.translate,
h:t.translate,
hh:t.translate,
d:"dan",
dd:t.translate,
M:"mesec",
MM:t.translate,
y:"godinu",
yy:t.translate
},
ordinal:"%d.",
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("sv", {
months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),
weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"YYYY-MM-DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Idag] LT",
nextDay:"[Imorgon] LT",
lastDay:"[Igår] LT",
nextWeek:"dddd LT",
lastWeek:"[Förra] dddd[en] LT",
sameElse:"L"
},
relativeTime:{
future:"om %s",
past:"för %s sedan",
s:"några sekunder",
m:"en minut",
mm:"%d minuter",
h:"en timme",
hh:"%d timmar",
d:"en dag",
dd:"%d dagar",
M:"en månad",
MM:"%d månader",
y:"ett år",
yy:"%d år"
},
ordinal:function(e) {
var t = e % 10, n = 1 === ~~(e % 100 / 10) ? "e" :1 === t ? "a" :2 === t ? "a" :3 === t ? "e" :"e";
return e + n;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("ta", {
months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY, LT",
LLLL:"dddd, D MMMM YYYY, LT"
},
calendar:{
sameDay:"[இன்று] LT",
nextDay:"[நாளை] LT",
nextWeek:"dddd, LT",
lastDay:"[நேற்று] LT",
lastWeek:"[கடந்த வாரம்] dddd, LT",
sameElse:"L"
},
relativeTime:{
future:"%s இல்",
past:"%s முன்",
s:"ஒரு சில விநாடிகள்",
m:"ஒரு நிமிடம்",
mm:"%d நிமிடங்கள்",
h:"ஒரு மணி நேரம்",
hh:"%d மணி நேரம்",
d:"ஒரு நாள்",
dd:"%d நாட்கள்",
M:"ஒரு மாதம்",
MM:"%d மாதங்கள்",
y:"ஒரு வருடம்",
yy:"%d ஆண்டுகள்"
},
ordinal:function(e) {
return e + "வது";
},
meridiem:function(e) {
return e >= 6 && 10 >= e ? " காலை" :e >= 10 && 14 >= e ? " நண்பகல்" :e >= 14 && 18 >= e ? " எற்பாடு" :e >= 18 && 20 >= e ? " மாலை" :e >= 20 && 24 >= e ? " இரவு" :e >= 0 && 6 >= e ? " வைகறை" :void 0;
},
week:{
dow:0,
doy:6
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("th", {
months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),
weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
longDateFormat:{
LT:"H นาฬิกา m นาที",
L:"YYYY/MM/DD",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY เวลา LT",
LLLL:"วันddddที่ D MMMM YYYY เวลา LT"
},
meridiem:function(e) {
return 12 > e ? "ก่อนเที่ยง" :"หลังเที่ยง";
},
calendar:{
sameDay:"[วันนี้ เวลา] LT",
nextDay:"[พรุ่งนี้ เวลา] LT",
nextWeek:"dddd[หน้า เวลา] LT",
lastDay:"[เมื่อวานนี้ เวลา] LT",
lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",
sameElse:"L"
},
relativeTime:{
future:"อีก %s",
past:"%sที่แล้ว",
s:"ไม่กี่วินาที",
m:"1 นาที",
mm:"%d นาที",
h:"1 ชั่วโมง",
hh:"%d ชั่วโมง",
d:"1 วัน",
dd:"%d วัน",
M:"1 เดือน",
MM:"%d เดือน",
y:"1 ปี",
yy:"%d ปี"
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tl-ph", {
months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"MM/D/YYYY",
LL:"MMMM D, YYYY",
LLL:"MMMM D, YYYY LT",
LLLL:"dddd, MMMM DD, YYYY LT"
},
calendar:{
sameDay:"[Ngayon sa] LT",
nextDay:"[Bukas sa] LT",
nextWeek:"dddd [sa] LT",
lastDay:"[Kahapon sa] LT",
lastWeek:"dddd [huling linggo] LT",
sameElse:"L"
},
relativeTime:{
future:"sa loob ng %s",
past:"%s ang nakalipas",
s:"ilang segundo",
m:"isang minuto",
mm:"%d minuto",
h:"isang oras",
hh:"%d oras",
d:"isang araw",
dd:"%d araw",
M:"isang buwan",
MM:"%d buwan",
y:"isang taon",
yy:"%d taon"
},
ordinal:function(e) {
return e;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
var t = {
1:"'inci",
5:"'inci",
8:"'inci",
70:"'inci",
80:"'inci",
2:"'nci",
7:"'nci",
20:"'nci",
50:"'nci",
3:"'üncü",
4:"'üncü",
100:"'üncü",
6:"'ncı",
9:"'uncu",
10:"'uncu",
30:"'uncu",
60:"'ıncı",
90:"'ıncı"
};
return e.lang("tr", {
months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd, D MMMM YYYY LT"
},
calendar:{
sameDay:"[bugün saat] LT",
nextDay:"[yarın saat] LT",
nextWeek:"[haftaya] dddd [saat] LT",
lastDay:"[dün] LT",
lastWeek:"[geçen hafta] dddd [saat] LT",
sameElse:"L"
},
relativeTime:{
future:"%s sonra",
past:"%s önce",
s:"birkaç saniye",
m:"bir dakika",
mm:"%d dakika",
h:"bir saat",
hh:"%d saat",
d:"bir gün",
dd:"%d gün",
M:"bir ay",
MM:"%d ay",
y:"bir yıl",
yy:"%d yıl"
},
ordinal:function(e) {
if (0 === e) return e + "'ıncı";
var n = e % 10, o = e % 100 - n, i = e >= 100 ? 100 :null;
return e + (t[n] || t[o] || t[i]);
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tzm-la", {
months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[asdkh g] LT",
nextDay:"[aska g] LT",
nextWeek:"dddd [g] LT",
lastDay:"[assant g] LT",
lastWeek:"dddd [g] LT",
sameElse:"L"
},
relativeTime:{
future:"dadkh s yan %s",
past:"yan %s",
s:"imik",
m:"minuḍ",
mm:"%d minuḍ",
h:"saɛa",
hh:"%d tassaɛin",
d:"ass",
dd:"%d ossan",
M:"ayowr",
MM:"%d iyyirn",
y:"asgas",
yy:"%d isgasn"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("tzm", {
months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",
nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",
nextWeek:"dddd [ⴴ] LT",
lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",
lastWeek:"dddd [ⴴ] LT",
sameElse:"L"
},
relativeTime:{
future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
past:"ⵢⴰⵏ %s",
s:"ⵉⵎⵉⴽ",
m:"ⵎⵉⵏⵓⴺ",
mm:"%d ⵎⵉⵏⵓⴺ",
h:"ⵙⴰⵄⴰ",
hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
d:"ⴰⵙⵙ",
dd:"%d oⵙⵙⴰⵏ",
M:"ⴰⵢoⵓⵔ",
MM:"%d ⵉⵢⵢⵉⵔⵏ",
y:"ⴰⵙⴳⴰⵙ",
yy:"%d ⵉⵙⴳⴰⵙⵏ"
},
week:{
dow:6,
doy:12
}
});
}), function(e) {
e(lt);
}(function(e) {
function t(e, t) {
var n = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? n[0] :t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] :n[2];
}
function n(e, n, o) {
var i = {
mm:"хвилина_хвилини_хвилин",
hh:"година_години_годин",
dd:"день_дні_днів",
MM:"місяць_місяці_місяців",
yy:"рік_роки_років"
};
return "m" === o ? n ? "хвилина" :"хвилину" :"h" === o ? n ? "година" :"годину" :e + " " + t(i[o], +e);
}
function o(e, t) {
var n = {
nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")
}, o = /D[oD]? *MMMM?/.test(t) ? "accusative" :"nominative";
return n[o][e.month()];
}
function i(e, t) {
var n = {
nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
}, o = /(\[[ВвУу]\]) ?dddd/.test(t) ? "accusative" :/\[?(?:минулої|наступної)? ?\] ?dddd/.test(t) ? "genitive" :"nominative";
return n[o][e.day()];
}
function r(e) {
return function() {
return e + "о" + (11 === this.hours() ? "б" :"") + "] LT";
};
}
return e.lang("uk", {
months:o,
monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
weekdays:i,
weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY р.",
LLL:"D MMMM YYYY р., LT",
LLLL:"dddd, D MMMM YYYY р., LT"
},
calendar:{
sameDay:r("[Сьогодні "),
nextDay:r("[Завтра "),
lastDay:r("[Вчора "),
nextWeek:r("[У] dddd ["),
lastWeek:function() {
switch (this.day()) {
case 0:
case 3:
case 5:
case 6:
return r("[Минулої] dddd [").call(this);

case 1:
case 2:
case 4:
return r("[Минулого] dddd [").call(this);
}
},
sameElse:"L"
},
relativeTime:{
future:"за %s",
past:"%s тому",
s:"декілька секунд",
m:n,
mm:n,
h:"годину",
hh:n,
d:"день",
dd:n,
M:"місяць",
MM:n,
y:"рік",
yy:n
},
meridiem:function(e) {
return 4 > e ? "ночі" :12 > e ? "ранку" :17 > e ? "дня" :"вечора";
},
ordinal:function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
case "w":
case "W":
return e + "-й";

case "D":
return e + "-го";

default:
return e;
}
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("uz", {
months:"январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"D MMMM YYYY, dddd LT"
},
calendar:{
sameDay:"[Бугун соат] LT [да]",
nextDay:"[Эртага] LT [да]",
nextWeek:"dddd [куни соат] LT [да]",
lastDay:"[Кеча соат] LT [да]",
lastWeek:"[Утган] dddd [куни соат] LT [да]",
sameElse:"L"
},
relativeTime:{
future:"Якин %s ичида",
past:"Бир неча %s олдин",
s:"фурсат",
m:"бир дакика",
mm:"%d дакика",
h:"бир соат",
hh:"%d соат",
d:"бир кун",
dd:"%d кун",
M:"бир ой",
MM:"%d ой",
y:"бир йил",
yy:"%d йил"
},
week:{
dow:1,
doy:7
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("vi", {
months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),
weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM [năm] YYYY",
LLL:"D MMMM [năm] YYYY LT",
LLLL:"dddd, D MMMM [năm] YYYY LT",
l:"DD/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY LT",
llll:"ddd, D MMM YYYY LT"
},
calendar:{
sameDay:"[Hôm nay lúc] LT",
nextDay:"[Ngày mai lúc] LT",
nextWeek:"dddd [tuần tới lúc] LT",
lastDay:"[Hôm qua lúc] LT",
lastWeek:"dddd [tuần rồi lúc] LT",
sameElse:"L"
},
relativeTime:{
future:"%s tới",
past:"%s trước",
s:"vài giây",
m:"một phút",
mm:"%d phút",
h:"một giờ",
hh:"%d giờ",
d:"một ngày",
dd:"%d ngày",
M:"một tháng",
MM:"%d tháng",
y:"một năm",
yy:"%d năm"
},
ordinal:function(e) {
return e;
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("zh-cn", {
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah点mm",
L:"YYYY-MM-DD",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY-MM-DD",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(e, t) {
var n = 100 * e + t;
return 600 > n ? "凌晨" :900 > n ? "早上" :1130 > n ? "上午" :1230 > n ? "中午" :1800 > n ? "下午" :"晚上";
},
calendar:{
sameDay:function() {
return 0 === this.minutes() ? "[今天]Ah[点整]" :"[今天]LT";
},
nextDay:function() {
return 0 === this.minutes() ? "[明天]Ah[点整]" :"[明天]LT";
},
lastDay:function() {
return 0 === this.minutes() ? "[昨天]Ah[点整]" :"[昨天]LT";
},
nextWeek:function() {
var t, n;
return t = e().startOf("week"), n = this.unix() - t.unix() >= 604800 ? "[下]" :"[本]", 
0 === this.minutes() ? n + "dddAh点整" :n + "dddAh点mm";
},
lastWeek:function() {
var t, n;
return t = e().startOf("week"), n = this.unix() < t.unix() ? "[上]" :"[本]", 0 === this.minutes() ? n + "dddAh点整" :n + "dddAh点mm";
},
sameElse:"LL"
},
ordinal:function(e, t) {
switch (t) {
case "d":
case "D":
case "DDD":
return e + "日";

case "M":
return e + "月";

case "w":
case "W":
return e + "周";

default:
return e;
}
},
relativeTime:{
future:"%s内",
past:"%s前",
s:"几秒",
m:"1分钟",
mm:"%d分钟",
h:"1小时",
hh:"%d小时",
d:"1天",
dd:"%d天",
M:"1个月",
MM:"%d个月",
y:"1年",
yy:"%d年"
},
week:{
dow:1,
doy:4
}
});
}), function(e) {
e(lt);
}(function(e) {
return e.lang("zh-tw", {
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah點mm",
L:"YYYY年MMMD日",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY年MMMD日",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(e, t) {
var n = 100 * e + t;
return 900 > n ? "早上" :1130 > n ? "上午" :1230 > n ? "中午" :1800 > n ? "下午" :"晚上";
},
calendar:{
sameDay:"[今天]LT",
nextDay:"[明天]LT",
nextWeek:"[下]ddddLT",
lastDay:"[昨天]LT",
lastWeek:"[上]ddddLT",
sameElse:"L"
},
ordinal:function(e, t) {
switch (t) {
case "d":
case "D":
case "DDD":
return e + "日";

case "M":
return e + "月";

case "w":
case "W":
return e + "週";

default:
return e;
}
},
relativeTime:{
future:"%s內",
past:"%s前",
s:"幾秒",
m:"一分鐘",
mm:"%d分鐘",
h:"一小時",
hh:"%d小時",
d:"一天",
dd:"%d天",
M:"一個月",
MM:"%d個月",
y:"一年",
yy:"%d年"
}
});
}), lt.lang("en"), Mt ? module.exports = lt :"function" == typeof define && define.amd ? (define("moment", function(e, t, n) {
return n.config && n.config() && n.config().noGlobal === !0 && (ht.moment = ut), 
lt;
}), st(!0)) :st();
}.call(this), function() {
var e = !0;
!function(t) {
var n = this || (0, eval)("this"), o = n.document, i = n.navigator, r = n.jQuery, a = n.JSON;
!function(e) {
if ("function" == typeof require && "object" == typeof exports && "object" == typeof module) {
var t = module.exports || exports;
e(t, require);
} else "function" == typeof define && define.amd ? define([ "exports", "require" ], e) :e(n.ko = {});
}(function(s, l) {
function u(e, t) {
var n = null === e || typeof e in f;
return n ? e === t :!1;
}
function c(e, n) {
var o;
return function() {
o || (o = setTimeout(function() {
o = t, e();
}, n));
};
}
function d(e, t) {
var n;
return function() {
clearTimeout(n), n = setTimeout(e, t);
};
}
function h(e) {
var t = this;
return e && m.utils.objectForEach(e, function(e, n) {
var o = m.extenders[e];
"function" == typeof o && (t = o(t, n) || t);
}), t;
}
function p(e) {
m.bindingHandlers[e] = {
init:function(t, n, o, i, r) {
var a = function() {
var t = {};
return t[e] = n(), t;
};
return m.bindingHandlers.event.init.call(this, t, a, o, i, r);
}
};
}
function g(e, t, n, o) {
m.bindingHandlers[e] = {
init:function(e, i, r, a, s) {
var l, u;
return m.computed(function() {
var r = m.utils.unwrapObservable(i()), a = !n != !r, c = !u, d = c || t || a !== l;
d && (c && m.computedContext.getDependenciesCount() && (u = m.utils.cloneNodes(m.virtualElements.childNodes(e), !0)), 
a ? (c || m.virtualElements.setDomNodeChildren(e, m.utils.cloneNodes(u)), m.applyBindingsToDescendants(o ? o(s, r) :s, e)) :m.virtualElements.emptyNode(e), 
l = a);
}, null, {
disposeWhenNodeIsRemoved:e
}), {
controlsDescendantBindings:!0
};
}
}, m.expressionRewriting.bindingRewriteValidators[e] = !1, m.virtualElements.allowedBindings[e] = !0;
}
var m = "undefined" != typeof s ? s :{};
m.exportSymbol = function(e, t) {
for (var n = e.split("."), o = m, i = 0; i < n.length - 1; i++) o = o[n[i]];
o[n[n.length - 1]] = t;
}, m.exportProperty = function(e, t, n) {
e[t] = n;
}, m.version = "3.2.0", m.exportSymbol("version", m.version), m.utils = function() {
function e(e, t) {
for (var n in e) e.hasOwnProperty(n) && t(n, e[n]);
}
function s(e, t) {
if (t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
return e;
}
function l(e, t) {
return e.__proto__ = t, e;
}
function u(e, t) {
if ("input" !== m.utils.tagNameLower(e) || !e.type) return !1;
if ("click" != t.toLowerCase()) return !1;
var n = e.type;
return "checkbox" == n || "radio" == n;
}
var c = {
__proto__:[]
} instanceof Array, d = {}, h = {}, p = i && /Firefox\/2/i.test(i.userAgent) ? "KeyboardEvent" :"UIEvents";
d[p] = [ "keyup", "keydown", "keypress" ], d.MouseEvents = [ "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave" ], 
e(d, function(e, t) {
if (t.length) for (var n = 0, o = t.length; o > n; n++) h[t[n]] = e;
});
var g = {
propertychange:!0
}, f = o && function() {
for (var e = 3, n = o.createElement("div"), i = n.getElementsByTagName("i"); n.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", 
i[0]; ) ;
return e > 4 ? e :t;
}(), _ = 6 === f, v = 7 === f;
return {
fieldsIncludedWithJsonPost:[ "authenticity_token", /^__RequestVerificationToken(_.*)?$/ ],
arrayForEach:function(e, t) {
for (var n = 0, o = e.length; o > n; n++) t(e[n], n);
},
arrayIndexOf:function(e, t) {
if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(e, t);
for (var n = 0, o = e.length; o > n; n++) if (e[n] === t) return n;
return -1;
},
arrayFirst:function(e, t, n) {
for (var o = 0, i = e.length; i > o; o++) if (t.call(n, e[o], o)) return e[o];
return null;
},
arrayRemoveItem:function(e, t) {
var n = m.utils.arrayIndexOf(e, t);
n > 0 ? e.splice(n, 1) :0 === n && e.shift();
},
arrayGetDistinctValues:function(e) {
e = e || [];
for (var t = [], n = 0, o = e.length; o > n; n++) m.utils.arrayIndexOf(t, e[n]) < 0 && t.push(e[n]);
return t;
},
arrayMap:function(e, t) {
e = e || [];
for (var n = [], o = 0, i = e.length; i > o; o++) n.push(t(e[o], o));
return n;
},
arrayFilter:function(e, t) {
e = e || [];
for (var n = [], o = 0, i = e.length; i > o; o++) t(e[o], o) && n.push(e[o]);
return n;
},
arrayPushAll:function(e, t) {
if (t instanceof Array) e.push.apply(e, t); else for (var n = 0, o = t.length; o > n; n++) e.push(t[n]);
return e;
},
addOrRemoveItem:function(e, t, n) {
var o = m.utils.arrayIndexOf(m.utils.peekObservable(e), t);
0 > o ? n && e.push(t) :n || e.splice(o, 1);
},
canSetPrototype:c,
extend:s,
setPrototypeOf:l,
setPrototypeOfOrExtend:c ? l :s,
objectForEach:e,
objectMap:function(e, t) {
if (!e) return e;
var n = {};
for (var o in e) e.hasOwnProperty(o) && (n[o] = t(e[o], o, e));
return n;
},
emptyDomNode:function(e) {
for (;e.firstChild; ) m.removeNode(e.firstChild);
},
moveCleanedNodesToContainerElement:function(e) {
for (var t = m.utils.makeArray(e), n = o.createElement("div"), i = 0, r = t.length; r > i; i++) n.appendChild(m.cleanNode(t[i]));
return n;
},
cloneNodes:function(e, t) {
for (var n = 0, o = e.length, i = []; o > n; n++) {
var r = e[n].cloneNode(!0);
i.push(t ? m.cleanNode(r) :r);
}
return i;
},
setDomNodeChildren:function(e, t) {
if (m.utils.emptyDomNode(e), t) for (var n = 0, o = t.length; o > n; n++) e.appendChild(t[n]);
},
replaceDomNodes:function(e, t) {
var n = e.nodeType ? [ e ] :e;
if (n.length > 0) {
for (var o = n[0], i = o.parentNode, r = 0, a = t.length; a > r; r++) i.insertBefore(t[r], o);
for (var r = 0, a = n.length; a > r; r++) m.removeNode(n[r]);
}
},
fixUpContinuousNodeArray:function(e, t) {
if (e.length) {
for (t = 8 === t.nodeType && t.parentNode || t; e.length && e[0].parentNode !== t; ) e.shift();
if (e.length > 1) {
var n = e[0], o = e[e.length - 1];
for (e.length = 0; n !== o; ) if (e.push(n), n = n.nextSibling, !n) return;
e.push(o);
}
}
return e;
},
setOptionNodeSelectionState:function(e, t) {
7 > f ? e.setAttribute("selected", t) :e.selected = t;
},
stringTrim:function(e) {
return null === e || e === t ? "" :e.trim ? e.trim() :e.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
},
stringStartsWith:function(e, t) {
return e = e || "", t.length > e.length ? !1 :e.substring(0, t.length) === t;
},
domNodeIsContainedBy:function(e, t) {
if (e === t) return !0;
if (11 === e.nodeType) return !1;
if (t.contains) return t.contains(3 === e.nodeType ? e.parentNode :e);
if (t.compareDocumentPosition) return 16 == (16 & t.compareDocumentPosition(e));
for (;e && e != t; ) e = e.parentNode;
return !!e;
},
domNodeIsAttachedToDocument:function(e) {
return m.utils.domNodeIsContainedBy(e, e.ownerDocument.documentElement);
},
anyDomNodeIsAttachedToDocument:function(e) {
return !!m.utils.arrayFirst(e, m.utils.domNodeIsAttachedToDocument);
},
tagNameLower:function(e) {
return e && e.tagName && e.tagName.toLowerCase();
},
registerEventHandler:function(e, t, n) {
var o = f && g[t];
if (!o && r) r(e).bind(t, n); else if (o || "function" != typeof e.addEventListener) {
if ("undefined" == typeof e.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
var i = function(t) {
n.call(e, t);
}, a = "on" + t;
e.attachEvent(a, i), m.utils.domNodeDisposal.addDisposeCallback(e, function() {
e.detachEvent(a, i);
});
} else e.addEventListener(t, n, !1);
},
triggerEvent:function(e, t) {
if (!e || !e.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
var i = u(e, t);
if (r && !i) r(e).trigger(t); else if ("function" == typeof o.createEvent) {
if ("function" != typeof e.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
var a = h[t] || "HTMLEvents", s = o.createEvent(a);
s.initEvent(t, !0, !0, n, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, e), e.dispatchEvent(s);
} else if (i && e.click) e.click(); else {
if ("undefined" == typeof e.fireEvent) throw new Error("Browser doesn't support triggering events");
e.fireEvent("on" + t);
}
},
unwrapObservable:function(e) {
return m.isObservable(e) ? e() :e;
},
peekObservable:function(e) {
return m.isObservable(e) ? e.peek() :e;
},
toggleDomNodeCssClass:function(e, t, n) {
if (t) {
var o = /\S+/g, i = e.className.match(o) || [];
m.utils.arrayForEach(t.match(o), function(e) {
m.utils.addOrRemoveItem(i, e, n);
}), e.className = i.join(" ");
}
},
setTextContent:function(e, n) {
var o = m.utils.unwrapObservable(n);
(null === o || o === t) && (o = "");
var i = m.virtualElements.firstChild(e);
!i || 3 != i.nodeType || m.virtualElements.nextSibling(i) ? m.virtualElements.setDomNodeChildren(e, [ e.ownerDocument.createTextNode(o) ]) :i.data = o, 
m.utils.forceRefresh(e);
},
setElementName:function(e, t) {
if (e.name = t, 7 >= f) try {
e.mergeAttributes(o.createElement("<input name='" + e.name + "'/>"), !1);
} catch (n) {}
},
forceRefresh:function(e) {
if (f >= 9) {
var t = 1 == e.nodeType ? e :e.parentNode;
t.style && (t.style.zoom = t.style.zoom);
}
},
ensureSelectElementIsRenderedCorrectly:function(e) {
if (f) {
var t = e.style.width;
e.style.width = 0, e.style.width = t;
}
},
range:function(e, t) {
e = m.utils.unwrapObservable(e), t = m.utils.unwrapObservable(t);
for (var n = [], o = e; t >= o; o++) n.push(o);
return n;
},
makeArray:function(e) {
for (var t = [], n = 0, o = e.length; o > n; n++) t.push(e[n]);
return t;
},
isIe6:_,
isIe7:v,
ieVersion:f,
getFormFields:function(e, t) {
for (var n = m.utils.makeArray(e.getElementsByTagName("input")).concat(m.utils.makeArray(e.getElementsByTagName("textarea"))), o = "string" == typeof t ? function(e) {
return e.name === t;
} :function(e) {
return t.test(e.name);
}, i = [], r = n.length - 1; r >= 0; r--) o(n[r]) && i.push(n[r]);
return i;
},
parseJson:function(e) {
return "string" == typeof e && (e = m.utils.stringTrim(e)) ? a && a.parse ? a.parse(e) :new Function("return " + e)() :null;
},
stringifyJson:function(e, t, n) {
if (!a || !a.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return a.stringify(m.utils.unwrapObservable(e), t, n);
},
postJson:function(t, n, i) {
i = i || {};
var r = i.params || {}, a = i.includeFields || this.fieldsIncludedWithJsonPost, s = t;
if ("object" == typeof t && "form" === m.utils.tagNameLower(t)) {
var l = t;
s = l.action;
for (var u = a.length - 1; u >= 0; u--) for (var c = m.utils.getFormFields(l, a[u]), d = c.length - 1; d >= 0; d--) r[c[d].name] = c[d].value;
}
n = m.utils.unwrapObservable(n);
var h = o.createElement("form");
h.style.display = "none", h.action = s, h.method = "post";
for (var p in n) {
var g = o.createElement("input");
g.type = "hidden", g.name = p, g.value = m.utils.stringifyJson(m.utils.unwrapObservable(n[p])), 
h.appendChild(g);
}
e(r, function(e, t) {
var n = o.createElement("input");
n.type = "hidden", n.name = e, n.value = t, h.appendChild(n);
}), o.body.appendChild(h), i.submitter ? i.submitter(h) :h.submit(), setTimeout(function() {
h.parentNode.removeChild(h);
}, 0);
}
};
}(), m.exportSymbol("utils", m.utils), m.exportSymbol("utils.arrayForEach", m.utils.arrayForEach), 
m.exportSymbol("utils.arrayFirst", m.utils.arrayFirst), m.exportSymbol("utils.arrayFilter", m.utils.arrayFilter), 
m.exportSymbol("utils.arrayGetDistinctValues", m.utils.arrayGetDistinctValues), 
m.exportSymbol("utils.arrayIndexOf", m.utils.arrayIndexOf), m.exportSymbol("utils.arrayMap", m.utils.arrayMap), 
m.exportSymbol("utils.arrayPushAll", m.utils.arrayPushAll), m.exportSymbol("utils.arrayRemoveItem", m.utils.arrayRemoveItem), 
m.exportSymbol("utils.extend", m.utils.extend), m.exportSymbol("utils.fieldsIncludedWithJsonPost", m.utils.fieldsIncludedWithJsonPost), 
m.exportSymbol("utils.getFormFields", m.utils.getFormFields), m.exportSymbol("utils.peekObservable", m.utils.peekObservable), 
m.exportSymbol("utils.postJson", m.utils.postJson), m.exportSymbol("utils.parseJson", m.utils.parseJson), 
m.exportSymbol("utils.registerEventHandler", m.utils.registerEventHandler), m.exportSymbol("utils.stringifyJson", m.utils.stringifyJson), 
m.exportSymbol("utils.range", m.utils.range), m.exportSymbol("utils.toggleDomNodeCssClass", m.utils.toggleDomNodeCssClass), 
m.exportSymbol("utils.triggerEvent", m.utils.triggerEvent), m.exportSymbol("utils.unwrapObservable", m.utils.unwrapObservable), 
m.exportSymbol("utils.objectForEach", m.utils.objectForEach), m.exportSymbol("utils.addOrRemoveItem", m.utils.addOrRemoveItem), 
m.exportSymbol("unwrap", m.utils.unwrapObservable), Function.prototype.bind || (Function.prototype.bind = function(e) {
var t = this, n = Array.prototype.slice.call(arguments), e = n.shift();
return function() {
return t.apply(e, n.concat(Array.prototype.slice.call(arguments)));
};
}), m.utils.domData = new function() {
function e(e, r) {
var a = e[o], s = a && "null" !== a && i[a];
if (!s) {
if (!r) return t;
a = e[o] = "ko" + n++, i[a] = {};
}
return i[a];
}
var n = 0, o = "__ko__" + new Date().getTime(), i = {};
return {
get:function(n, o) {
var i = e(n, !1);
return i === t ? t :i[o];
},
set:function(n, o, i) {
if (i !== t || e(n, !1) !== t) {
var r = e(n, !0);
r[o] = i;
}
},
clear:function(e) {
var t = e[o];
return t ? (delete i[t], e[o] = null, !0) :!1;
},
nextKey:function() {
return n++ + o;
}
};
}(), m.exportSymbol("utils.domData", m.utils.domData), m.exportSymbol("utils.domData.clear", m.utils.domData.clear), 
m.utils.domNodeDisposal = new function() {
function e(e, n) {
var o = m.utils.domData.get(e, a);
return o === t && n && (o = [], m.utils.domData.set(e, a, o)), o;
}
function n(e) {
m.utils.domData.set(e, a, t);
}
function o(t) {
var n = e(t, !1);
if (n) {
n = n.slice(0);
for (var o = 0; o < n.length; o++) n[o](t);
}
m.utils.domData.clear(t), m.utils.domNodeDisposal.cleanExternalData(t), l[t.nodeType] && i(t);
}
function i(e) {
for (var t, n = e.firstChild; t = n; ) n = t.nextSibling, 8 === t.nodeType && o(t);
}
var a = m.utils.domData.nextKey(), s = {
1:!0,
8:!0,
9:!0
}, l = {
1:!0,
9:!0
};
return {
addDisposeCallback:function(t, n) {
if ("function" != typeof n) throw new Error("Callback must be a function");
e(t, !0).push(n);
},
removeDisposeCallback:function(t, o) {
var i = e(t, !1);
i && (m.utils.arrayRemoveItem(i, o), 0 == i.length && n(t));
},
cleanNode:function(e) {
if (s[e.nodeType] && (o(e), l[e.nodeType])) {
var t = [];
m.utils.arrayPushAll(t, e.getElementsByTagName("*"));
for (var n = 0, i = t.length; i > n; n++) o(t[n]);
}
return e;
},
removeNode:function(e) {
m.cleanNode(e), e.parentNode && e.parentNode.removeChild(e);
},
cleanExternalData:function(e) {
r && "function" == typeof r.cleanData && r.cleanData([ e ]);
}
};
}(), m.cleanNode = m.utils.domNodeDisposal.cleanNode, m.removeNode = m.utils.domNodeDisposal.removeNode, 
m.exportSymbol("cleanNode", m.cleanNode), m.exportSymbol("removeNode", m.removeNode), 
m.exportSymbol("utils.domNodeDisposal", m.utils.domNodeDisposal), m.exportSymbol("utils.domNodeDisposal.addDisposeCallback", m.utils.domNodeDisposal.addDisposeCallback), 
m.exportSymbol("utils.domNodeDisposal.removeDisposeCallback", m.utils.domNodeDisposal.removeDisposeCallback), 
function() {
function e(e) {
var t = m.utils.stringTrim(e).toLowerCase(), i = o.createElement("div"), r = t.match(/^<(thead|tbody|tfoot)/) && [ 1, "<table>", "</table>" ] || !t.indexOf("<tr") && [ 2, "<table><tbody>", "</tbody></table>" ] || (!t.indexOf("<td") || !t.indexOf("<th")) && [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] || [ 0, "", "" ], a = "ignored<div>" + r[1] + e + r[2] + "</div>";
for ("function" == typeof n.innerShiv ? i.appendChild(n.innerShiv(a)) :i.innerHTML = a; r[0]--; ) i = i.lastChild;
return m.utils.makeArray(i.lastChild.childNodes);
}
function i(e) {
if (r.parseHTML) return r.parseHTML(e) || [];
var t = r.clean([ e ]);
if (t && t[0]) {
for (var n = t[0]; n.parentNode && 11 !== n.parentNode.nodeType; ) n = n.parentNode;
n.parentNode && n.parentNode.removeChild(n);
}
return t;
}
m.utils.parseHtmlFragment = function(t) {
return r ? i(t) :e(t);
}, m.utils.setHtml = function(e, n) {
if (m.utils.emptyDomNode(e), n = m.utils.unwrapObservable(n), null !== n && n !== t) if ("string" != typeof n && (n = n.toString()), 
r) r(e).html(n); else for (var o = m.utils.parseHtmlFragment(n), i = 0; i < o.length; i++) e.appendChild(o[i]);
};
}(), m.exportSymbol("utils.parseHtmlFragment", m.utils.parseHtmlFragment), m.exportSymbol("utils.setHtml", m.utils.setHtml), 
m.memoization = function() {
function e() {
return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
}
function n() {
return e() + e();
}
function o(e, t) {
if (e) if (8 == e.nodeType) {
var n = m.memoization.parseMemoText(e.nodeValue);
null != n && t.push({
domNode:e,
memoId:n
});
} else if (1 == e.nodeType) for (var i = 0, r = e.childNodes, a = r.length; a > i; i++) o(r[i], t);
}
var i = {};
return {
memoize:function(e) {
if ("function" != typeof e) throw new Error("You can only pass a function to ko.memoization.memoize()");
var t = n();
return i[t] = e, "<!--[ko_memo:" + t + "]-->";
},
unmemoize:function(e, n) {
var o = i[e];
if (o === t) throw new Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
try {
return o.apply(null, n || []), !0;
} finally {
delete i[e];
}
},
unmemoizeDomNodeAndDescendants:function(e, t) {
var n = [];
o(e, n);
for (var i = 0, r = n.length; r > i; i++) {
var a = n[i].domNode, s = [ a ];
t && m.utils.arrayPushAll(s, t), m.memoization.unmemoize(n[i].memoId, s), a.nodeValue = "", 
a.parentNode && a.parentNode.removeChild(a);
}
},
parseMemoText:function(e) {
var t = e.match(/^\[ko_memo\:(.*?)\]$/);
return t ? t[1] :null;
}
};
}(), m.exportSymbol("memoization", m.memoization), m.exportSymbol("memoization.memoize", m.memoization.memoize), 
m.exportSymbol("memoization.unmemoize", m.memoization.unmemoize), m.exportSymbol("memoization.parseMemoText", m.memoization.parseMemoText), 
m.exportSymbol("memoization.unmemoizeDomNodeAndDescendants", m.memoization.unmemoizeDomNodeAndDescendants), 
m.extenders = {
throttle:function(e, t) {
e.throttleEvaluation = t;
var n = null;
return m.dependentObservable({
read:e,
write:function(o) {
clearTimeout(n), n = setTimeout(function() {
e(o);
}, t);
}
});
},
rateLimit:function(e, t) {
var n, o, i;
"number" == typeof t ? n = t :(n = t.timeout, o = t.method), i = "notifyWhenChangesStop" == o ? d :c, 
e.limit(function(e) {
return i(e, n);
});
},
notify:function(e, t) {
e.equalityComparer = "always" == t ? null :u;
}
};
var f = {
undefined:1,
"boolean":1,
number:1,
string:1
};
m.exportSymbol("extenders", m.extenders), m.subscription = function(e, t, n) {
this.target = e, this.callback = t, this.disposeCallback = n, this.isDisposed = !1, 
m.exportProperty(this, "dispose", this.dispose);
}, m.subscription.prototype.dispose = function() {
this.isDisposed = !0, this.disposeCallback();
}, m.subscribable = function() {
m.utils.setPrototypeOfOrExtend(this, m.subscribable.fn), this._subscriptions = {};
};
var _ = "change", v = {
subscribe:function(e, t, n) {
var o = this;
n = n || _;
var i = t ? e.bind(t) :e, r = new m.subscription(o, i, function() {
m.utils.arrayRemoveItem(o._subscriptions[n], r), o.afterSubscriptionRemove && o.afterSubscriptionRemove(n);
});
return o.beforeSubscriptionAdd && o.beforeSubscriptionAdd(n), o._subscriptions[n] || (o._subscriptions[n] = []), 
o._subscriptions[n].push(r), r;
},
notifySubscribers:function(e, t) {
if (t = t || _, this.hasSubscriptionsForEvent(t)) try {
m.dependencyDetection.begin();
for (var n, o = this._subscriptions[t].slice(0), i = 0; n = o[i]; ++i) n.isDisposed || n.callback(e);
} finally {
m.dependencyDetection.end();
}
},
limit:function(e) {
var t, n, o, i = this, r = m.isObservable(i), a = "beforeChange";
i._origNotifySubscribers || (i._origNotifySubscribers = i.notifySubscribers, i.notifySubscribers = function(e, t) {
t && t !== _ ? t === a ? i._rateLimitedBeforeChange(e) :i._origNotifySubscribers(e, t) :i._rateLimitedChange(e);
});
var s = e(function() {
r && o === i && (o = i()), t = !1, i.isDifferent(n, o) && i._origNotifySubscribers(n = o);
});
i._rateLimitedChange = function(e) {
t = !0, o = e, s();
}, i._rateLimitedBeforeChange = function(e) {
t || (n = e, i._origNotifySubscribers(e, a));
};
},
hasSubscriptionsForEvent:function(e) {
return this._subscriptions[e] && this._subscriptions[e].length;
},
getSubscriptionsCount:function() {
var e = 0;
return m.utils.objectForEach(this._subscriptions, function(t, n) {
e += n.length;
}), e;
},
isDifferent:function(e, t) {
return !this.equalityComparer || !this.equalityComparer(e, t);
},
extend:h
};
m.exportProperty(v, "subscribe", v.subscribe), m.exportProperty(v, "extend", v.extend), 
m.exportProperty(v, "getSubscriptionsCount", v.getSubscriptionsCount), m.utils.canSetPrototype && m.utils.setPrototypeOf(v, Function.prototype), 
m.subscribable.fn = v, m.isSubscribable = function(e) {
return null != e && "function" == typeof e.subscribe && "function" == typeof e.notifySubscribers;
}, m.exportSymbol("subscribable", m.subscribable), m.exportSymbol("isSubscribable", m.isSubscribable), 
m.computedContext = m.dependencyDetection = function() {
function e() {
return ++r;
}
function t(e) {
i.push(o), o = e;
}
function n() {
o = i.pop();
}
var o, i = [], r = 0;
return {
begin:t,
end:n,
registerDependency:function(t) {
if (o) {
if (!m.isSubscribable(t)) throw new Error("Only subscribable things can act as dependencies");
o.callback(t, t._id || (t._id = e()));
}
},
ignore:function(e, o, i) {
try {
return t(), e.apply(o, i || []);
} finally {
n();
}
},
getDependenciesCount:function() {
return o ? o.computed.getDependenciesCount() :void 0;
},
isInitial:function() {
return o ? o.isInitial :void 0;
}
};
}(), m.exportSymbol("computedContext", m.computedContext), m.exportSymbol("computedContext.getDependenciesCount", m.computedContext.getDependenciesCount), 
m.exportSymbol("computedContext.isInitial", m.computedContext.isInitial), m.exportSymbol("computedContext.isSleeping", m.computedContext.isSleeping), 
m.observable = function(t) {
function n() {
return arguments.length > 0 ? (n.isDifferent(o, arguments[0]) && (n.valueWillMutate(), 
o = arguments[0], e && (n._latestValue = o), n.valueHasMutated()), this) :(m.dependencyDetection.registerDependency(n), 
o);
}
var o = t;
return m.subscribable.call(n), m.utils.setPrototypeOfOrExtend(n, m.observable.fn), 
e && (n._latestValue = o), n.peek = function() {
return o;
}, n.valueHasMutated = function() {
n.notifySubscribers(o);
}, n.valueWillMutate = function() {
n.notifySubscribers(o, "beforeChange");
}, m.exportProperty(n, "peek", n.peek), m.exportProperty(n, "valueHasMutated", n.valueHasMutated), 
m.exportProperty(n, "valueWillMutate", n.valueWillMutate), n;
}, m.observable.fn = {
equalityComparer:u
};
var w = m.observable.protoProperty = "__ko_proto__";
m.observable.fn[w] = m.observable, m.utils.canSetPrototype && m.utils.setPrototypeOf(m.observable.fn, m.subscribable.fn), 
m.hasPrototype = function(e, n) {
return null === e || e === t || e[w] === t ? !1 :e[w] === n ? !0 :m.hasPrototype(e[w], n);
}, m.isObservable = function(e) {
return m.hasPrototype(e, m.observable);
}, m.isWriteableObservable = function(e) {
return "function" == typeof e && e[w] === m.observable ? !0 :"function" == typeof e && e[w] === m.dependentObservable && e.hasWriteFunction ? !0 :!1;
}, m.exportSymbol("observable", m.observable), m.exportSymbol("isObservable", m.isObservable), 
m.exportSymbol("isWriteableObservable", m.isWriteableObservable), m.exportSymbol("isWritableObservable", m.isWriteableObservable), 
m.observableArray = function(e) {
if (e = e || [], "object" != typeof e || !("length" in e)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
var t = m.observable(e);
return m.utils.setPrototypeOfOrExtend(t, m.observableArray.fn), t.extend({
trackArrayChanges:!0
});
}, m.observableArray.fn = {
remove:function(e) {
for (var t = this.peek(), n = [], o = "function" != typeof e || m.isObservable(e) ? function(t) {
return t === e;
} :e, i = 0; i < t.length; i++) {
var r = t[i];
o(r) && (0 === n.length && this.valueWillMutate(), n.push(r), t.splice(i, 1), i--);
}
return n.length && this.valueHasMutated(), n;
},
removeAll:function(e) {
if (e === t) {
var n = this.peek(), o = n.slice(0);
return this.valueWillMutate(), n.splice(0, n.length), this.valueHasMutated(), o;
}
return e ? this.remove(function(t) {
return m.utils.arrayIndexOf(e, t) >= 0;
}) :[];
},
destroy:function(e) {
var t = this.peek(), n = "function" != typeof e || m.isObservable(e) ? function(t) {
return t === e;
} :e;
this.valueWillMutate();
for (var o = t.length - 1; o >= 0; o--) {
var i = t[o];
n(i) && (t[o]._destroy = !0);
}
this.valueHasMutated();
},
destroyAll:function(e) {
return e === t ? this.destroy(function() {
return !0;
}) :e ? this.destroy(function(t) {
return m.utils.arrayIndexOf(e, t) >= 0;
}) :[];
},
indexOf:function(e) {
var t = this();
return m.utils.arrayIndexOf(t, e);
},
replace:function(e, t) {
var n = this.indexOf(e);
n >= 0 && (this.valueWillMutate(), this.peek()[n] = t, this.valueHasMutated());
}
}, m.utils.arrayForEach([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
m.observableArray.fn[e] = function() {
var t = this.peek();
this.valueWillMutate(), this.cacheDiffForKnownOperation(t, e, arguments);
var n = t[e].apply(t, arguments);
return this.valueHasMutated(), n;
};
}), m.utils.arrayForEach([ "slice" ], function(e) {
m.observableArray.fn[e] = function() {
var t = this();
return t[e].apply(t, arguments);
};
}), m.utils.canSetPrototype && m.utils.setPrototypeOf(m.observableArray.fn, m.observable.fn), 
m.exportSymbol("observableArray", m.observableArray);
var y = "arrayChange";
m.extenders.trackArrayChanges = function(e) {
function t() {
if (!o) {
o = !0;
var t = e.notifySubscribers;
e.notifySubscribers = function(e, n) {
return n && n !== _ || ++r, t.apply(this, arguments);
};
var a = [].concat(e.peek() || []);
i = null, e.subscribe(function(t) {
if (t = [].concat(t || []), e.hasSubscriptionsForEvent(y)) {
var o = n(a, t);
o.length && e.notifySubscribers(o, y);
}
a = t, i = null, r = 0;
});
}
}
function n(e, t) {
return (!i || r > 1) && (i = m.utils.compareArrays(e, t, {
sparse:!0
})), i;
}
if (!e.cacheDiffForKnownOperation) {
var o = !1, i = null, r = 0, a = e.subscribe;
e.subscribe = e.subscribe = function(e, n, o) {
return o === y && t(), a.apply(this, arguments);
}, e.cacheDiffForKnownOperation = function(e, t, n) {
function a(e, t, n) {
return s[s.length] = {
status:e,
value:t,
index:n
};
}
if (o && !r) {
var s = [], l = e.length, u = n.length, c = 0;
switch (t) {
case "push":
c = l;

case "unshift":
for (var d = 0; u > d; d++) a("added", n[d], c + d);
break;

case "pop":
c = l - 1;

case "shift":
l && a("deleted", e[c], c);
break;

case "splice":
for (var h = Math.min(Math.max(0, n[0] < 0 ? l + n[0] :n[0]), l), p = 1 === u ? l :Math.min(h + (n[1] || 0), l), g = h + u - 2, f = Math.max(p, g), _ = [], v = [], d = h, w = 2; f > d; ++d, 
++w) p > d && v.push(a("deleted", e[d], d)), g > d && _.push(a("added", n[w], d));
m.utils.findMovesInArrayComparison(v, _);
break;

default:
return;
}
i = s;
}
};
}
}, m.computed = m.dependentObservable = function(n, o, i) {
function r(e, t) {
x[t] || (x[t] = e.subscribe(l), ++D);
}
function a() {
m.utils.objectForEach(x, function(e, t) {
t.dispose();
}), x = {};
}
function s() {
a(), D = 0, v = !0, g = !1;
}
function l() {
var e = c.throttleEvaluation;
e && e >= 0 ? (clearTimeout(Y), Y = setTimeout(u, e)) :c._evalRateLimited ? c._evalRateLimited() :u();
}
function u(n) {
if (f) {
if (y) throw Error("A 'pure' computed must not be called recursively");
} else if (!v) {
if (S && S()) {
if (!_) return T(), void 0;
} else _ = !1;
if (f = !0, b) try {
var i = {};
m.dependencyDetection.begin({
callback:function(e, t) {
i[t] || (i[t] = 1, ++D);
},
computed:c,
isInitial:t
}), D = 0, p = w.call(o);
} finally {
m.dependencyDetection.end(), f = !1;
} else try {
var a = x, s = D;
m.dependencyDetection.begin({
callback:function(e, t) {
v || (s && a[t] ? (x[t] = a[t], ++D, delete a[t], --s) :r(e, t));
},
computed:c,
isInitial:y ? t :!D
}), x = {}, D = 0;
try {
var l = o ? w.call(o) :w();
} finally {
m.dependencyDetection.end(), s && m.utils.objectForEach(a, function(e, t) {
t.dispose();
}), g = !1;
}
c.isDifferent(p, l) && (c.notifySubscribers(p, "beforeChange"), p = l, e && (c._latestValue = p), 
n !== !0 && c.notifySubscribers(p));
} finally {
f = !1;
}
D || T();
}
}
function c() {
if (arguments.length > 0) {
if ("function" != typeof k) throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
return k.apply(o, arguments), this;
}
return m.dependencyDetection.registerDependency(c), g && u(!0), p;
}
function d() {
return g && !D && u(!0), p;
}
function h() {
return g || D > 0;
}
var p, g = !0, f = !1, _ = !1, v = !1, w = n, y = !1, b = !1;
if (w && "object" == typeof w ? (i = w, w = i.read) :(i = i || {}, w || (w = i.read)), 
"function" != typeof w) throw new Error("Pass a function that returns the value of the ko.computed");
var k = i.write, M = i.disposeWhenNodeIsRemoved || i.disposeWhenNodeIsRemoved || null, L = i.disposeWhen || i.disposeWhen, S = L, T = s, x = {}, D = 0, Y = null;
o || (o = i.owner), m.subscribable.call(c), m.utils.setPrototypeOfOrExtend(c, m.dependentObservable.fn), 
c.peek = d, c.getDependenciesCount = function() {
return D;
}, c.hasWriteFunction = "function" == typeof i.write, c.dispose = function() {
T();
}, c.isActive = h;
var E = c.limit;
return c.limit = function(e) {
E.call(c, e), c._evalRateLimited = function() {
c._rateLimitedBeforeChange(p), g = !0, c._rateLimitedChange(c);
};
}, i.pure ? (y = !0, b = !0, c.beforeSubscriptionAdd = function() {
b && (b = !1, u(!0));
}, c.afterSubscriptionRemove = function() {
c.getSubscriptionsCount() || (a(), b = g = !0);
}) :i.deferEvaluation && (c.beforeSubscriptionAdd = function() {
d(), delete c.beforeSubscriptionAdd;
}), m.exportProperty(c, "peek", c.peek), m.exportProperty(c, "dispose", c.dispose), 
m.exportProperty(c, "isActive", c.isActive), m.exportProperty(c, "getDependenciesCount", c.getDependenciesCount), 
M && (_ = !0, M.nodeType && (S = function() {
return !m.utils.domNodeIsAttachedToDocument(M) || L && L();
})), b || i.deferEvaluation || u(), M && h() && M.nodeType && (T = function() {
m.utils.domNodeDisposal.removeDisposeCallback(M, T), s();
}, m.utils.domNodeDisposal.addDisposeCallback(M, T)), c;
}, m.isComputed = function(e) {
return m.hasPrototype(e, m.dependentObservable);
};
var b = m.observable.protoProperty;
m.dependentObservable[b] = m.observable, m.dependentObservable.fn = {
equalityComparer:u
}, m.dependentObservable.fn[b] = m.dependentObservable, m.utils.canSetPrototype && m.utils.setPrototypeOf(m.dependentObservable.fn, m.subscribable.fn), 
m.exportSymbol("dependentObservable", m.dependentObservable), m.exportSymbol("computed", m.dependentObservable), 
m.exportSymbol("isComputed", m.isComputed), m.pureComputed = function(e, t) {
return "function" == typeof e ? m.computed(e, t, {
pure:!0
}) :(e = m.utils.extend({}, e), e.pure = !0, m.computed(e, t));
}, m.exportSymbol("pureComputed", m.pureComputed), function() {
function e(i, r, a) {
a = a || new o(), i = r(i);
var s = !("object" != typeof i || null === i || i === t || i instanceof Date || i instanceof String || i instanceof Number || i instanceof Boolean);
if (!s) return i;
var l = i instanceof Array ? [] :{};
return a.save(i, l), n(i, function(n) {
var o = r(i[n]);
switch (typeof o) {
case "boolean":
case "number":
case "string":
case "function":
l[n] = o;
break;

case "object":
case "undefined":
var s = a.get(o);
l[n] = s !== t ? s :e(o, r, a);
}
}), l;
}
function n(e, t) {
if (e instanceof Array) {
for (var n = 0; n < e.length; n++) t(n);
"function" == typeof e.toJSON && t("toJSON");
} else for (var o in e) t(o);
}
function o() {
this.keys = [], this.values = [];
}
var i = 10;
m.toJS = function(t) {
if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
return e(t, function(e) {
for (var t = 0; m.isObservable(e) && i > t; t++) e = e();
return e;
});
}, m.toJSON = function(e, t, n) {
var o = m.toJS(e);
return m.utils.stringifyJson(o, t, n);
}, o.prototype = {
constructor:o,
save:function(e, t) {
var n = m.utils.arrayIndexOf(this.keys, e);
n >= 0 ? this.values[n] = t :(this.keys.push(e), this.values.push(t));
},
get:function(e) {
var n = m.utils.arrayIndexOf(this.keys, e);
return n >= 0 ? this.values[n] :t;
}
};
}(), m.exportSymbol("toJS", m.toJS), m.exportSymbol("toJSON", m.toJSON), function() {
var e = "__ko__hasDomDataOptionValue__";
m.selectExtensions = {
readValue:function(n) {
switch (m.utils.tagNameLower(n)) {
case "option":
return n[e] === !0 ? m.utils.domData.get(n, m.bindingHandlers.options.optionValueDomDataKey) :m.utils.ieVersion <= 7 ? n.getAttributeNode("value") && n.getAttributeNode("value").specified ? n.value :n.text :n.value;

case "select":
return n.selectedIndex >= 0 ? m.selectExtensions.readValue(n.options[n.selectedIndex]) :t;

default:
return n.value;
}
},
writeValue:function(n, o, i) {
switch (m.utils.tagNameLower(n)) {
case "option":
switch (typeof o) {
case "string":
m.utils.domData.set(n, m.bindingHandlers.options.optionValueDomDataKey, t), e in n && delete n[e], 
n.value = o;
break;

default:
m.utils.domData.set(n, m.bindingHandlers.options.optionValueDomDataKey, o), n[e] = !0, 
n.value = "number" == typeof o ? o :"";
}
break;

case "select":
("" === o || null === o) && (o = t);
for (var r, a = -1, s = 0, l = n.options.length; l > s; ++s) if (r = m.selectExtensions.readValue(n.options[s]), 
r == o || "" == r && o === t) {
a = s;
break;
}
(i || a >= 0 || o === t && n.size > 1) && (n.selectedIndex = a);
break;

default:
(null === o || o === t) && (o = ""), n.value = o;
}
}
};
}(), m.exportSymbol("selectExtensions", m.selectExtensions), m.exportSymbol("selectExtensions.readValue", m.selectExtensions.readValue), 
m.exportSymbol("selectExtensions.writeValue", m.selectExtensions.writeValue), m.expressionRewriting = function() {
function e(e) {
if (m.utils.arrayIndexOf(o, e) >= 0) return !1;
var t = e.match(i);
return null === t ? !1 :t[1] ? "Object(" + t[1] + ")" + t[2] :e;
}
function t(e) {
var t = m.utils.stringTrim(e);
123 === t.charCodeAt(0) && (t = t.slice(1, -1));
var n, o, i = [], r = t.match(d), a = 0;
if (r) {
r.push(",");
for (var s, l = 0; s = r[l]; ++l) {
var u = s.charCodeAt(0);
if (44 === u) {
if (0 >= a) {
n && i.push(o ? {
key:n,
value:o.join("")
} :{
unknown:n
}), n = o = a = 0;
continue;
}
} else if (58 === u) {
if (!o) continue;
} else if (47 === u && l && s.length > 1) {
var c = r[l - 1].match(h);
c && !p[c[0]] && (t = t.substr(t.indexOf(s) + 1), r = t.match(d), r.push(","), l = -1, 
s = "/");
} else if (40 === u || 123 === u || 91 === u) ++a; else if (41 === u || 125 === u || 93 === u) --a; else if (!n && !o) {
n = 34 === u || 39 === u ? s.slice(1, -1) :s;
continue;
}
o ? o.push(s) :o = [ s ];
}
}
return i;
}
function n(n, o) {
function i(t, n) {
function o(e) {
return e && e.preprocess ? n = e.preprocess(n, t, i) :!0;
}
var u;
if (!l) {
if (!o(m.getBindingHandler(t))) return;
g[t] && (u = e(n)) && a.push("'" + t + "':function(_z){" + u + "=_z}");
}
s && (n = "function(){return " + n + " }"), r.push("'" + t + "':" + n);
}
o = o || {};
var r = [], a = [], s = o.valueAccessors, l = o.bindingParams, u = "string" == typeof n ? t(n) :n;
return m.utils.arrayForEach(u, function(e) {
i(e.key || e.unknown, e.value);
}), a.length && i("_ko_property_writers", "{" + a.join(",") + " }"), r.join(",");
}
var o = [ "true", "false", "null", "undefined" ], i = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, r = '"(?:[^"\\\\]|\\\\.)*"', a = "'(?:[^'\\\\]|\\\\.)*'", s = "/(?:[^/\\\\]|\\\\.)*/w*", l = ",\"'{}()/:[\\]", u = "[^\\s:,/][^" + l + "]*[^\\s" + l + "]", c = "[^\\s]", d = RegExp(r + "|" + a + "|" + s + "|" + u + "|" + c, "g"), h = /[\])"'A-Za-z0-9_$]+$/, p = {
"in":1,
"return":1,
"typeof":1
}, g = {};
return {
bindingRewriteValidators:[],
twoWayBindings:g,
parseObjectLiteral:t,
preProcessBindings:n,
keyValueArrayContainsKey:function(e, t) {
for (var n = 0; n < e.length; n++) if (e[n].key == t) return !0;
return !1;
},
writeValueToProperty:function(e, t, n, o, i) {
if (e && m.isObservable(e)) !m.isWriteableObservable(e) || i && e.peek() === o || e(o); else {
var r = t.get("_ko_property_writers");
r && r[n] && r[n](o);
}
}
};
}(), m.exportSymbol("expressionRewriting", m.expressionRewriting), m.exportSymbol("expressionRewriting.bindingRewriteValidators", m.expressionRewriting.bindingRewriteValidators), 
m.exportSymbol("expressionRewriting.parseObjectLiteral", m.expressionRewriting.parseObjectLiteral), 
m.exportSymbol("expressionRewriting.preProcessBindings", m.expressionRewriting.preProcessBindings), 
m.exportSymbol("expressionRewriting._twoWayBindings", m.expressionRewriting.twoWayBindings), 
m.exportSymbol("jsonExpressionRewriting", m.expressionRewriting), m.exportSymbol("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", m.expressionRewriting.preProcessBindings), 
function() {
function e(e) {
return 8 == e.nodeType && s.test(a ? e.text :e.nodeValue);
}
function t(e) {
return 8 == e.nodeType && l.test(a ? e.text :e.nodeValue);
}
function n(n, o) {
for (var i = n, r = 1, a = []; i = i.nextSibling; ) {
if (t(i) && (r--, 0 === r)) return a;
a.push(i), e(i) && r++;
}
if (!o) throw new Error("Cannot find closing comment tag to match: " + n.nodeValue);
return null;
}
function i(e, t) {
var o = n(e, t);
return o ? o.length > 0 ? o[o.length - 1].nextSibling :e.nextSibling :null;
}
function r(n) {
var o = n.firstChild, r = null;
if (o) do if (r) r.push(o); else if (e(o)) {
var a = i(o, !0);
a ? o = a :r = [ o ];
} else t(o) && (r = [ o ]); while (o = o.nextSibling);
return r;
}
var a = o && "<!--test-->" === o.createComment("test").text, s = a ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ :/^\s*ko(?:\s+([\s\S]+))?\s*$/, l = a ? /^<!--\s*\/ko\s*-->$/ :/^\s*\/ko\s*$/, u = {
ul:!0,
ol:!0
};
m.virtualElements = {
allowedBindings:{},
childNodes:function(t) {
return e(t) ? n(t) :t.childNodes;
},
emptyNode:function(t) {
if (e(t)) for (var n = m.virtualElements.childNodes(t), o = 0, i = n.length; i > o; o++) m.removeNode(n[o]); else m.utils.emptyDomNode(t);
},
setDomNodeChildren:function(t, n) {
if (e(t)) {
m.virtualElements.emptyNode(t);
for (var o = t.nextSibling, i = 0, r = n.length; r > i; i++) o.parentNode.insertBefore(n[i], o);
} else m.utils.setDomNodeChildren(t, n);
},
prepend:function(t, n) {
e(t) ? t.parentNode.insertBefore(n, t.nextSibling) :t.firstChild ? t.insertBefore(n, t.firstChild) :t.appendChild(n);
},
insertAfter:function(t, n, o) {
o ? e(t) ? t.parentNode.insertBefore(n, o.nextSibling) :o.nextSibling ? t.insertBefore(n, o.nextSibling) :t.appendChild(n) :m.virtualElements.prepend(t, n);
},
firstChild:function(n) {
return e(n) ? !n.nextSibling || t(n.nextSibling) ? null :n.nextSibling :n.firstChild;
},
nextSibling:function(n) {
return e(n) && (n = i(n)), n.nextSibling && t(n.nextSibling) ? null :n.nextSibling;
},
hasBindingValue:e,
virtualNodeBindingValue:function(e) {
var t = (a ? e.text :e.nodeValue).match(s);
return t ? t[1] :null;
},
normaliseVirtualElementDomStructure:function(e) {
if (u[m.utils.tagNameLower(e)]) {
var t = e.firstChild;
if (t) do if (1 === t.nodeType) {
var n = r(t);
if (n) for (var o = t.nextSibling, i = 0; i < n.length; i++) o ? e.insertBefore(n[i], o) :e.appendChild(n[i]);
} while (t = t.nextSibling);
}
}
};
}(), m.exportSymbol("virtualElements", m.virtualElements), m.exportSymbol("virtualElements.allowedBindings", m.virtualElements.allowedBindings), 
m.exportSymbol("virtualElements.emptyNode", m.virtualElements.emptyNode), m.exportSymbol("virtualElements.insertAfter", m.virtualElements.insertAfter), 
m.exportSymbol("virtualElements.prepend", m.virtualElements.prepend), m.exportSymbol("virtualElements.setDomNodeChildren", m.virtualElements.setDomNodeChildren), 
function() {
function e(e, n, o) {
var i = e + (o && o.valueAccessors || "");
return n[i] || (n[i] = t(e, o));
}
function t(e, t) {
var n = m.expressionRewriting.preProcessBindings(e, t), o = "with($context){with($data||{}){return{" + n + "}}}";
return new Function("$context", "$element", o);
}
var n = "data-bind";
m.bindingProvider = function() {
this.bindingCache = {};
}, m.utils.extend(m.bindingProvider.prototype, {
nodeHasBindings:function(e) {
switch (e.nodeType) {
case 1:
return null != e.getAttribute(n) || m.components.getComponentNameForNode(e);

case 8:
return m.virtualElements.hasBindingValue(e);

default:
return !1;
}
},
getBindings:function(e, t) {
var n = this.getBindingsString(e, t), o = n ? this.parseBindingsString(n, t, e) :null;
return m.components.addBindingsForCustomElement(o, e, t, !1);
},
getBindingAccessors:function(e, t) {
var n = this.getBindingsString(e, t), o = n ? this.parseBindingsString(n, t, e, {
valueAccessors:!0
}) :null;
return m.components.addBindingsForCustomElement(o, e, t, !0);
},
getBindingsString:function(e) {
switch (e.nodeType) {
case 1:
return e.getAttribute(n);

case 8:
return m.virtualElements.virtualNodeBindingValue(e);

default:
return null;
}
},
parseBindingsString:function(t, n, o, i) {
try {
var r = e(t, this.bindingCache, i);
return r(n, o);
} catch (a) {
throw a.message = "Unable to parse bindings.\nBindings value: " + t + "\nMessage: " + a.message, 
a;
}
}
}), m.bindingProvider.instance = new m.bindingProvider();
}(), m.exportSymbol("bindingProvider", m.bindingProvider), function() {
function e(e) {
return function() {
return e;
};
}
function o(e) {
return e();
}
function i(e) {
return m.utils.objectMap(m.dependencyDetection.ignore(e), function(t, n) {
return function() {
return e()[n];
};
});
}
function a(t, n, o) {
return "function" == typeof t ? i(t.bind(null, n, o)) :m.utils.objectMap(t, e);
}
function s(e, t) {
return i(this.getBindings.bind(this, e, t));
}
function l(e) {
var t = m.virtualElements.allowedBindings[e];
if (!t) throw new Error("The binding '" + e + "' cannot be used with virtual elements");
}
function u(e, t, n) {
var o, i = m.virtualElements.firstChild(t), r = m.bindingProvider.instance, a = r.preprocessNode;
if (a) {
for (;o = i; ) i = m.virtualElements.nextSibling(o), a.call(r, o);
i = m.virtualElements.firstChild(t);
}
for (;o = i; ) i = m.virtualElements.nextSibling(o), c(e, o, n);
}
function c(e, t, n) {
var o = !0, i = 1 === t.nodeType;
i && m.virtualElements.normaliseVirtualElementDomStructure(t);
var r = i && n || m.bindingProvider.instance.nodeHasBindings(t);
r && (o = h(t, null, e, n).shouldBindDescendants), o && !g[m.utils.tagNameLower(t)] && u(e, t, !i);
}
function d(e) {
var t = [], n = {}, o = [];
return m.utils.objectForEach(e, function i(r) {
if (!n[r]) {
var a = m.getBindingHandler(r);
a && (a.after && (o.push(r), m.utils.arrayForEach(a.after, function(t) {
if (e[t]) {
if (-1 !== m.utils.arrayIndexOf(o, t)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + o.join(", "));
i(t);
}
}), o.length--), t.push({
key:r,
handler:a
})), n[r] = !0;
}
}), t;
}
function h(e, n, i, r) {
function a() {
return m.utils.objectMap(g ? g() :c, o);
}
var u = m.utils.domData.get(e, f);
if (!n) {
if (u) throw Error("You cannot apply bindings multiple times to the same element.");
m.utils.domData.set(e, f, !0);
}
!u && r && m.storedBindingContextForNode(e, i);
var c;
if (n && "function" != typeof n) c = n; else {
var h = m.bindingProvider.instance, p = h.getBindingAccessors || s, g = m.dependentObservable(function() {
return c = n ? n(i, e) :p.call(h, e, i), c && i._subscribable && i._subscribable(), 
c;
}, null, {
disposeWhenNodeIsRemoved:e
});
c && g.isActive() || (g = null);
}
var _;
if (c) {
var v = g ? function(e) {
return function() {
return o(g()[e]);
};
} :function(e) {
return c[e];
};
a.get = function(e) {
return c[e] && o(v(e));
}, a.has = function(e) {
return e in c;
};
var w = d(c);
m.utils.arrayForEach(w, function(n) {
var o = n.handler.init, r = n.handler.update, s = n.key;
8 === e.nodeType && l(s);
try {
"function" == typeof o && m.dependencyDetection.ignore(function() {
var n = o(e, v(s), a, i.$data, i);
if (n && n.controlsDescendantBindings) {
if (_ !== t) throw new Error("Multiple bindings (" + _ + " and " + s + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
_ = s;
}
}), "function" == typeof r && m.dependentObservable(function() {
r(e, v(s), a, i.$data, i);
}, null, {
disposeWhenNodeIsRemoved:e
});
} catch (u) {
throw u.message = 'Unable to process binding "' + s + ": " + c[s] + '"\nMessage: ' + u.message, 
u;
}
});
}
return {
shouldBindDescendants:_ === t
};
}
function p(e) {
return e && e instanceof m.bindingContext ? e :new m.bindingContext(e);
}
m.bindingHandlers = {};
var g = {
script:!0
};
m.getBindingHandler = function(e) {
return m.bindingHandlers[e];
}, m.bindingContext = function(e, n, o, i) {
function r() {
var t = u ? e() :e, r = m.utils.unwrapObservable(t);
return n ? (n._subscribable && n._subscribable(), m.utils.extend(l, n), c && (l._subscribable = c)) :(l.$parents = [], 
l.$root = r, l.ko = m), l.$rawData = t, l.$data = r, o && (l[o] = r), i && i(l, n, r), 
l.$data;
}
function a() {
return s && !m.utils.anyDomNodeIsAttachedToDocument(s);
}
var s, l = this, u = "function" == typeof e && !m.isObservable(e), c = m.dependentObservable(r, null, {
disposeWhen:a,
disposeWhenNodeIsRemoved:!0
});
c.isActive() && (l._subscribable = c, c.equalityComparer = null, s = [], c._addNode = function(e) {
s.push(e), m.utils.domNodeDisposal.addDisposeCallback(e, function(e) {
m.utils.arrayRemoveItem(s, e), s.length || (c.dispose(), l._subscribable = c = t);
});
});
}, m.bindingContext.prototype.createChildContext = function(e, t, n) {
return new m.bindingContext(e, this, t, function(e, t) {
e.$parentContext = t, e.$parent = t.$data, e.$parents = (t.$parents || []).slice(0), 
e.$parents.unshift(e.$parent), n && n(e);
});
}, m.bindingContext.prototype.extend = function(e) {
return new m.bindingContext(this._subscribable || this.$data, this, null, function(t, n) {
t.$rawData = n.$rawData, m.utils.extend(t, "function" == typeof e ? e() :e);
});
};
var f = m.utils.domData.nextKey(), _ = m.utils.domData.nextKey();
m.storedBindingContextForNode = function(e, t) {
return 2 != arguments.length ? m.utils.domData.get(e, _) :(m.utils.domData.set(e, _, t), 
t._subscribable && t._subscribable._addNode(e), void 0);
}, m.applyBindingAccessorsToNode = function(e, t, n) {
return 1 === e.nodeType && m.virtualElements.normaliseVirtualElementDomStructure(e), 
h(e, t, p(n), !0);
}, m.applyBindingsToNode = function(e, t, n) {
var o = p(n);
return m.applyBindingAccessorsToNode(e, a(t, o, e), o);
}, m.applyBindingsToDescendants = function(e, t) {
(1 === t.nodeType || 8 === t.nodeType) && u(p(e), t, !0);
}, m.applyBindings = function(e, t) {
if (!r && n.jQuery && (r = n.jQuery), t && 1 !== t.nodeType && 8 !== t.nodeType) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
t = t || n.document.body, c(p(e), t, !0);
}, m.contextFor = function(e) {
switch (e.nodeType) {
case 1:
case 8:
var n = m.storedBindingContextForNode(e);
if (n) return n;
if (e.parentNode) return m.contextFor(e.parentNode);
}
return t;
}, m.dataFor = function(e) {
var n = m.contextFor(e);
return n ? n.$data :t;
}, m.exportSymbol("bindingHandlers", m.bindingHandlers), m.exportSymbol("applyBindings", m.applyBindings), 
m.exportSymbol("applyBindingsToDescendants", m.applyBindingsToDescendants), m.exportSymbol("applyBindingAccessorsToNode", m.applyBindingAccessorsToNode), 
m.exportSymbol("applyBindingsToNode", m.applyBindingsToNode), m.exportSymbol("contextFor", m.contextFor), 
m.exportSymbol("dataFor", m.dataFor);
}(), function(e) {
function t(t, n) {
return t.hasOwnProperty(n) ? t[n] :e;
}
function n(e, n) {
var i, s = t(r, e);
s || (s = r[e] = new m.subscribable(), o(e, function(t) {
a[e] = t, delete r[e], i ? s.notifySubscribers(t) :setTimeout(function() {
s.notifySubscribers(t);
}, 0);
}), i = !0), s.subscribe(n);
}
function o(e, t) {
i("getConfig", [ e ], function(n) {
n ? i("loadComponent", [ e, n ], function(e) {
t(e);
}) :t(null);
});
}
function i(t, n, o, r) {
r || (r = m.components.loaders.slice(0));
var a = r.shift();
if (a) {
var s = a[t];
if (s) {
var l = !1, u = s.apply(a, n.concat(function(e) {
l ? o(null) :null !== e ? o(e) :i(t, n, o, r);
}));
if (u !== e && (l = !0, !a.suppressLoaderExceptions)) throw new Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
} else i(t, n, o, r);
} else o(null);
}
var r = {}, a = {};
m.components = {
get:function(e, o) {
var i = t(a, e);
i ? setTimeout(function() {
o(i);
}, 0) :n(e, o);
},
clearCachedDefinition:function(e) {
delete a[e];
},
_getFirstResultFromLoaders:i
}, m.components.loaders = [], m.exportSymbol("components", m.components), m.exportSymbol("components.get", m.components.get), 
m.exportSymbol("components.clearCachedDefinition", m.components.clearCachedDefinition);
}(), function() {
function e(e, t, n, o) {
var i = {}, r = 2, a = function() {
0 === --r && o(i);
}, s = n.template, l = n.viewModel;
s ? u(t, s, function(t) {
m.components._getFirstResultFromLoaders("loadTemplate", [ e, t ], function(e) {
i.template = e, a();
});
}) :a(), l ? u(t, l, function(t) {
m.components._getFirstResultFromLoaders("loadViewModel", [ e, t ], function(e) {
i[h] = e, a();
});
}) :a();
}
function t(e, t, n) {
if ("string" == typeof t) n(m.utils.parseHtmlFragment(t)); else if (t instanceof Array) n(t); else if (s(t)) n(m.utils.makeArray(t.childNodes)); else if (t.element) {
var i = t.element;
if (a(i)) n(r(i)); else if ("string" == typeof i) {
var l = o.getElementById(i);
l ? n(r(l)) :e("Cannot find element with ID " + i);
} else e("Unknown element type: " + i);
} else e("Unknown template value: " + t);
}
function i(e, t, n) {
if ("function" == typeof t) n(function(e) {
return new t(e);
}); else if ("function" == typeof t[h]) n(t[h]); else if ("instance" in t) {
var o = t.instance;
n(function() {
return o;
});
} else "viewModel" in t ? i(e, t.viewModel, n) :e("Unknown viewModel value: " + t);
}
function r(e) {
switch (m.utils.tagNameLower(e)) {
case "script":
return m.utils.parseHtmlFragment(e.text);

case "textarea":
return m.utils.parseHtmlFragment(e.value);

case "template":
if (s(e.content)) return m.utils.cloneNodes(e.content.childNodes);
}
return m.utils.cloneNodes(e.childNodes);
}
function a(e) {
return n.HTMLElement ? e instanceof HTMLElement :e && e.tagName && 1 === e.nodeType;
}
function s(e) {
return n.DocumentFragment ? e instanceof DocumentFragment :e && 11 === e.nodeType;
}
function u(e, t, o) {
"string" == typeof t.require ? l || n.require ? (l || n.require)([ t.require ], o) :e("Uses require, but no AMD loader is present") :o(t);
}
function c(e) {
return function(t) {
throw new Error("Component '" + e + "': " + t);
};
}
var d = {};
m.components.register = function(e, t) {
if (!t) throw new Error("Invalid configuration for " + e);
if (m.components.isRegistered(e)) throw new Error("Component " + e + " is already registered");
d[e] = t;
}, m.components.isRegistered = function(e) {
return e in d;
}, m.components.unregister = function(e) {
delete d[e], m.components.clearCachedDefinition(e);
}, m.components.defaultLoader = {
getConfig:function(e, t) {
var n = d.hasOwnProperty(e) ? d[e] :null;
t(n);
},
loadComponent:function(t, n, o) {
var i = c(t);
u(i, n, function(n) {
e(t, i, n, o);
});
},
loadTemplate:function(e, n, o) {
t(c(e), n, o);
},
loadViewModel:function(e, t, n) {
i(c(e), t, n);
}
};
var h = "createViewModel";
m.exportSymbol("components.register", m.components.register), m.exportSymbol("components.isRegistered", m.components.isRegistered), 
m.exportSymbol("components.unregister", m.components.unregister), m.exportSymbol("components.defaultLoader", m.components.defaultLoader), 
m.components.loaders.push(m.components.defaultLoader), m.components._allRegisteredComponents = d;
}(), function() {
function e(e, n) {
var o = e.getAttribute("params");
if (o) {
var i = t.parseBindingsString(o, n, e, {
valueAccessors:!0,
bindingParams:!0
}), r = m.utils.objectMap(i, function(t) {
return m.computed(t, null, {
disposeWhenNodeIsRemoved:e
});
}), a = m.utils.objectMap(r, function(t) {
return t.isActive() ? m.computed(function() {
return m.utils.unwrapObservable(t());
}, null, {
disposeWhenNodeIsRemoved:e
}) :t.peek();
});
return a.hasOwnProperty("$raw") || (a.$raw = r), a;
}
return {
$raw:{}
};
}
m.components.getComponentNameForNode = function(e) {
var t = m.utils.tagNameLower(e);
return m.components.isRegistered(t) && t;
}, m.components.addBindingsForCustomElement = function(t, n, o, i) {
if (1 === n.nodeType) {
var r = m.components.getComponentNameForNode(n);
if (r) {
if (t = t || {}, t.component) throw new Error('Cannot use the "component" binding on a custom element matching a component');
var a = {
name:r,
params:e(n, o)
};
t.component = i ? function() {
return a;
} :a;
}
}
return t;
};
var t = new m.bindingProvider();
m.utils.ieVersion < 9 && (m.components.register = function(e) {
return function(t) {
return o.createElement(t), e.apply(this, arguments);
};
}(m.components.register), o.createDocumentFragment = function(e) {
return function() {
var t = e(), n = m.components._allRegisteredComponents;
for (var o in n) n.hasOwnProperty(o) && t.createElement(o);
return t;
};
}(o.createDocumentFragment));
}(), function() {
function e(e, t, n) {
var o = t.template;
if (!o) throw new Error("Component '" + e + "' has no template");
var i = m.utils.cloneNodes(o);
m.virtualElements.setDomNodeChildren(n, i);
}
function t(e, t, n) {
var o = e.createViewModel;
return o ? o.call(e, n, {
element:t
}) :n;
}
var n = 0;
m.bindingHandlers.component = {
init:function(o, i, r, a, s) {
var l, u, c = function() {
var e = l && l.dispose;
"function" == typeof e && e.call(l), u = null;
};
return m.utils.domNodeDisposal.addDisposeCallback(o, c), m.computed(function() {
var r, a, d = m.utils.unwrapObservable(i());
if ("string" == typeof d ? r = d :(r = m.utils.unwrapObservable(d.name), a = m.utils.unwrapObservable(d.params)), 
!r) throw new Error("No component name specified");
var h = u = ++n;
m.components.get(r, function(n) {
if (u === h) {
if (c(), !n) throw new Error("Unknown component '" + r + "'");
e(r, n, o);
var i = t(n, o, a), d = s.createChildContext(i);
l = i, m.applyBindingsToDescendants(d, o);
}
});
}, null, {
disposeWhenNodeIsRemoved:o
}), {
controlsDescendantBindings:!0
};
}
}, m.virtualElements.allowedBindings.component = !0;
}();
var k = {
"class":"className",
"for":"htmlFor"
};
m.bindingHandlers.attr = {
update:function(e, n) {
var o = m.utils.unwrapObservable(n()) || {};
m.utils.objectForEach(o, function(n, o) {
o = m.utils.unwrapObservable(o);
var i = o === !1 || null === o || o === t;
i && e.removeAttribute(n), m.utils.ieVersion <= 8 && n in k ? (n = k[n], i ? e.removeAttribute(n) :e[n] = o) :i || e.setAttribute(n, o.toString()), 
"name" === n && m.utils.setElementName(e, i ? "" :o.toString());
});
}
}, function() {
m.bindingHandlers.checked = {
after:[ "value", "attr" ],
init:function(e, n, o) {
function i() {
var t = e.checked, i = d ? a() :t;
if (!m.computedContext.isInitial() && (!l || t)) {
var r = m.dependencyDetection.ignore(n);
u ? c !== i ? (t && (m.utils.addOrRemoveItem(r, i, !0), m.utils.addOrRemoveItem(r, c, !1)), 
c = i) :m.utils.addOrRemoveItem(r, i, t) :m.expressionRewriting.writeValueToProperty(r, o, "checked", i, !0);
}
}
function r() {
var t = m.utils.unwrapObservable(n());
e.checked = u ? m.utils.arrayIndexOf(t, a()) >= 0 :s ? t :a() === t;
}
var a = m.pureComputed(function() {
return o.has("checkedValue") ? m.utils.unwrapObservable(o.get("checkedValue")) :o.has("value") ? m.utils.unwrapObservable(o.get("value")) :e.value;
}), s = "checkbox" == e.type, l = "radio" == e.type;
if (s || l) {
var u = s && m.utils.unwrapObservable(n()) instanceof Array, c = u ? a() :t, d = l || u;
l && !e.name && m.bindingHandlers.uniqueName.init(e, function() {
return !0;
}), m.computed(i, null, {
disposeWhenNodeIsRemoved:e
}), m.utils.registerEventHandler(e, "click", i), m.computed(r, null, {
disposeWhenNodeIsRemoved:e
});
}
}
}, m.expressionRewriting.twoWayBindings.checked = !0, m.bindingHandlers.checkedValue = {
update:function(e, t) {
e.value = m.utils.unwrapObservable(t());
}
};
}();
var M = "__ko__cssValue";
m.bindingHandlers.css = {
update:function(e, t) {
var n = m.utils.unwrapObservable(t());
"object" == typeof n ? m.utils.objectForEach(n, function(t, n) {
n = m.utils.unwrapObservable(n), m.utils.toggleDomNodeCssClass(e, t, n);
}) :(n = String(n || ""), m.utils.toggleDomNodeCssClass(e, e[M], !1), e[M] = n, 
m.utils.toggleDomNodeCssClass(e, n, !0));
}
}, m.bindingHandlers.enable = {
update:function(e, t) {
var n = m.utils.unwrapObservable(t());
n && e.disabled ? e.removeAttribute("disabled") :n || e.disabled || (e.disabled = !0);
}
}, m.bindingHandlers.disable = {
update:function(e, t) {
m.bindingHandlers.enable.update(e, function() {
return !m.utils.unwrapObservable(t());
});
}
}, m.bindingHandlers.event = {
init:function(e, t, n, o, i) {
var r = t() || {};
m.utils.objectForEach(r, function(r) {
"string" == typeof r && m.utils.registerEventHandler(e, r, function(e) {
var a, s = t()[r];
if (s) {
try {
var l = m.utils.makeArray(arguments);
o = i.$data, l.unshift(o), a = s.apply(o, l);
} finally {
a !== !0 && (e.preventDefault ? e.preventDefault() :e.returnValue = !1);
}
var u = n.get(r + "Bubble") !== !1;
u || (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation());
}
});
});
}
}, m.bindingHandlers.foreach = {
makeTemplateValueAccessor:function(e) {
return function() {
var t = e(), n = m.utils.peekObservable(t);
return n && "number" != typeof n.length ? (m.utils.unwrapObservable(t), {
foreach:n.data,
as:n.as,
includeDestroyed:n.includeDestroyed,
afterAdd:n.afterAdd,
beforeRemove:n.beforeRemove,
afterRender:n.afterRender,
beforeMove:n.beforeMove,
afterMove:n.afterMove,
templateEngine:m.nativeTemplateEngine.instance
}) :{
foreach:t,
templateEngine:m.nativeTemplateEngine.instance
};
};
},
init:function(e, t) {
return m.bindingHandlers.template.init(e, m.bindingHandlers.foreach.makeTemplateValueAccessor(t));
},
update:function(e, t, n, o, i) {
return m.bindingHandlers.template.update(e, m.bindingHandlers.foreach.makeTemplateValueAccessor(t), n, o, i);
}
}, m.expressionRewriting.bindingRewriteValidators.foreach = !1, m.virtualElements.allowedBindings.foreach = !0;
var L = "__ko_hasfocusUpdating", S = "__ko_hasfocusLastValue";
m.bindingHandlers.hasfocus = {
init:function(e, t, n) {
var o = function(o) {
e[L] = !0;
var i = e.ownerDocument;
if ("activeElement" in i) {
var r;
try {
r = i.activeElement;
} catch (a) {
r = i.body;
}
o = r === e;
}
var s = t();
m.expressionRewriting.writeValueToProperty(s, n, "hasfocus", o, !0), e[S] = o, e[L] = !1;
}, i = o.bind(null, !0), r = o.bind(null, !1);
m.utils.registerEventHandler(e, "focus", i), m.utils.registerEventHandler(e, "focusin", i), 
m.utils.registerEventHandler(e, "blur", r), m.utils.registerEventHandler(e, "focusout", r);
},
update:function(e, t) {
var n = !!m.utils.unwrapObservable(t());
e[L] || e[S] === n || (n ? e.focus() :e.blur(), m.dependencyDetection.ignore(m.utils.triggerEvent, null, [ e, n ? "focusin" :"focusout" ]));
}
}, m.expressionRewriting.twoWayBindings.hasfocus = !0, m.bindingHandlers.hasFocus = m.bindingHandlers.hasfocus, 
m.expressionRewriting.twoWayBindings.hasFocus = !0, m.bindingHandlers.html = {
init:function() {
return {
controlsDescendantBindings:!0
};
},
update:function(e, t) {
m.utils.setHtml(e, t());
}
}, g("if"), g("ifnot", !1, !0), g("with", !0, !1, function(e, t) {
return e.createChildContext(t);
});
var T = {};
m.bindingHandlers.options = {
init:function(e) {
if ("select" !== m.utils.tagNameLower(e)) throw new Error("options binding applies only to SELECT elements");
for (;e.length > 0; ) e.remove(0);
return {
controlsDescendantBindings:!0
};
},
update:function(e, n, o) {
function i() {
return m.utils.arrayFilter(e.options, function(e) {
return e.selected;
});
}
function r(e, t, n) {
var o = typeof t;
return "function" == o ? t(e) :"string" == o ? e[t] :n;
}
function a(n, i, a) {
a.length && (c = a[0].selected ? [ m.selectExtensions.readValue(a[0]) ] :[], _ = !0);
var s = e.ownerDocument.createElement("option");
if (n === T) m.utils.setTextContent(s, o.get("optionsCaption")), m.selectExtensions.writeValue(s, t); else {
var l = r(n, o.get("optionsValue"), n);
m.selectExtensions.writeValue(s, m.utils.unwrapObservable(l));
var u = r(n, o.get("optionsText"), l);
m.utils.setTextContent(s, u);
}
return [ s ];
}
function s(t, n) {
if (c.length) {
var o = m.utils.arrayIndexOf(c, m.selectExtensions.readValue(n[0])) >= 0;
m.utils.setOptionNodeSelectionState(n[0], o), _ && !o && m.dependencyDetection.ignore(m.utils.triggerEvent, null, [ e, "change" ]);
}
}
var l, u, c, d = 0 == e.length, h = !d && e.multiple ? e.scrollTop :null, p = m.utils.unwrapObservable(n()), g = o.get("optionsIncludeDestroyed"), f = {};
c = e.multiple ? m.utils.arrayMap(i(), m.selectExtensions.readValue) :e.selectedIndex >= 0 ? [ m.selectExtensions.readValue(e.options[e.selectedIndex]) ] :[], 
p && ("undefined" == typeof p.length && (p = [ p ]), u = m.utils.arrayFilter(p, function(e) {
return g || e === t || null === e || !m.utils.unwrapObservable(e._destroy);
}), o.has("optionsCaption") && (l = m.utils.unwrapObservable(o.get("optionsCaption")), 
null !== l && l !== t && u.unshift(T)));
var _ = !1;
f.beforeRemove = function(t) {
e.removeChild(t);
};
var v = s;
o.has("optionsAfterRender") && (v = function(e, n) {
s(e, n), m.dependencyDetection.ignore(o.get("optionsAfterRender"), null, [ n[0], e !== T ? e :t ]);
}), m.utils.setDomNodeChildrenFromArrayMapping(e, u, a, f, v), m.dependencyDetection.ignore(function() {
if (o.get("valueAllowUnset") && o.has("value")) m.selectExtensions.writeValue(e, m.utils.unwrapObservable(o.get("value")), !0); else {
var t;
t = e.multiple ? c.length && i().length < c.length :c.length && e.selectedIndex >= 0 ? m.selectExtensions.readValue(e.options[e.selectedIndex]) !== c[0] :c.length || e.selectedIndex >= 0, 
t && m.utils.triggerEvent(e, "change");
}
}), m.utils.ensureSelectElementIsRenderedCorrectly(e), h && Math.abs(h - e.scrollTop) > 20 && (e.scrollTop = h);
}
}, m.bindingHandlers.options.optionValueDomDataKey = m.utils.domData.nextKey(), 
m.bindingHandlers.selectedOptions = {
after:[ "options", "foreach" ],
init:function(e, t, n) {
m.utils.registerEventHandler(e, "change", function() {
var o = t(), i = [];
m.utils.arrayForEach(e.getElementsByTagName("option"), function(e) {
e.selected && i.push(m.selectExtensions.readValue(e));
}), m.expressionRewriting.writeValueToProperty(o, n, "selectedOptions", i);
});
},
update:function(e, t) {
if ("select" != m.utils.tagNameLower(e)) throw new Error("values binding applies only to SELECT elements");
var n = m.utils.unwrapObservable(t());
n && "number" == typeof n.length && m.utils.arrayForEach(e.getElementsByTagName("option"), function(e) {
var t = m.utils.arrayIndexOf(n, m.selectExtensions.readValue(e)) >= 0;
m.utils.setOptionNodeSelectionState(e, t);
});
}
}, m.expressionRewriting.twoWayBindings.selectedOptions = !0, m.bindingHandlers.style = {
update:function(e, n) {
var o = m.utils.unwrapObservable(n() || {});
m.utils.objectForEach(o, function(n, o) {
o = m.utils.unwrapObservable(o), (null === o || o === t || o === !1) && (o = ""), 
e.style[n] = o;
});
}
}, m.bindingHandlers.submit = {
init:function(e, t, n, o, i) {
if ("function" != typeof t()) throw new Error("The value for a submit binding must be a function");
m.utils.registerEventHandler(e, "submit", function(n) {
var o, r = t();
try {
o = r.call(i.$data, e);
} finally {
o !== !0 && (n.preventDefault ? n.preventDefault() :n.returnValue = !1);
}
});
}
}, m.bindingHandlers.text = {
init:function() {
return {
controlsDescendantBindings:!0
};
},
update:function(e, t) {
m.utils.setTextContent(e, t());
}
}, m.virtualElements.allowedBindings.text = !0, function() {
if (n && n.navigator) var o = function(e) {
return e ? parseFloat(e[1]) :void 0;
}, i = n.opera && n.opera.version && parseInt(n.opera.version()), r = n.navigator.userAgent, a = o(r.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)), s = o(r.match(/Firefox\/([^ ]*)/));
if (m.utils.ieVersion < 10) var l = m.utils.domData.nextKey(), u = m.utils.domData.nextKey(), c = function(e) {
var t = this.activeElement, n = t && m.utils.domData.get(t, u);
n && n(e);
}, d = function(e, t) {
var n = e.ownerDocument;
m.utils.domData.get(n, l) || (m.utils.domData.set(n, l, !0), m.utils.registerEventHandler(n, "selectionchange", c)), 
m.utils.domData.set(e, u, t);
};
m.bindingHandlers.textInput = {
init:function(n, o, r) {
var l, u, c = n.value, h = function(i) {
clearTimeout(l), u = l = t;
var a = n.value;
c !== a && (e && i && (n._ko_textInputProcessedEvent = i.type), c = a, m.expressionRewriting.writeValueToProperty(o(), r, "textInput", a));
}, p = function(t) {
if (!l) {
u = n.value;
var o = e ? h.bind(n, {
type:t.type
}) :h;
l = setTimeout(o, 4);
}
}, g = function() {
var e = m.utils.unwrapObservable(o());
return (null === e || e === t) && (e = ""), u !== t && e === u ? (setTimeout(g, 4), 
void 0) :(n.value !== e && (c = e, n.value = e), void 0);
}, f = function(e, t) {
m.utils.registerEventHandler(n, e, t);
};
e && m.bindingHandlers.textInput._forceUpdateOn ? m.utils.arrayForEach(m.bindingHandlers.textInput._forceUpdateOn, function(e) {
"after" == e.slice(0, 5) ? f(e.slice(5), p) :f(e, h);
}) :m.utils.ieVersion < 10 ? (f("propertychange", function(e) {
"value" === e.propertyName && h(e);
}), 8 == m.utils.ieVersion && (f("keyup", h), f("keydown", h)), m.utils.ieVersion >= 8 && (d(n, h), 
f("dragend", p))) :(f("input", h), 5 > a && "textarea" === m.utils.tagNameLower(n) ? (f("keydown", p), 
f("paste", p), f("cut", p)) :11 > i ? f("keydown", p) :4 > s && (f("DOMAutoComplete", h), 
f("dragdrop", h), f("drop", h))), f("change", h), m.computed(g, null, {
disposeWhenNodeIsRemoved:n
});
}
}, m.expressionRewriting.twoWayBindings.textInput = !0, m.bindingHandlers.textinput = {
preprocess:function(e, t, n) {
n("textInput", e);
}
};
}(), m.bindingHandlers.uniqueName = {
init:function(e, t) {
if (t()) {
var n = "ko_unique_" + ++m.bindingHandlers.uniqueName.currentIndex;
m.utils.setElementName(e, n);
}
}
}, m.bindingHandlers.uniqueName.currentIndex = 0, m.bindingHandlers.value = {
after:[ "options", "foreach" ],
init:function(e, t, n) {
if ("input" == e.tagName.toLowerCase() && ("checkbox" == e.type || "radio" == e.type)) return m.applyBindingAccessorsToNode(e, {
checkedValue:t
}), void 0;
var o = [ "change" ], i = n.get("valueUpdate"), r = !1, a = null;
i && ("string" == typeof i && (i = [ i ]), m.utils.arrayPushAll(o, i), o = m.utils.arrayGetDistinctValues(o));
var s = function() {
a = null, r = !1;
var o = t(), i = m.selectExtensions.readValue(e);
m.expressionRewriting.writeValueToProperty(o, n, "value", i);
}, l = m.utils.ieVersion && "input" == e.tagName.toLowerCase() && "text" == e.type && "off" != e.autocomplete && (!e.form || "off" != e.form.autocomplete);
l && -1 == m.utils.arrayIndexOf(o, "propertychange") && (m.utils.registerEventHandler(e, "propertychange", function() {
r = !0;
}), m.utils.registerEventHandler(e, "focus", function() {
r = !1;
}), m.utils.registerEventHandler(e, "blur", function() {
r && s();
})), m.utils.arrayForEach(o, function(t) {
var n = s;
m.utils.stringStartsWith(t, "after") && (n = function() {
a = m.selectExtensions.readValue(e), setTimeout(s, 0);
}, t = t.substring("after".length)), m.utils.registerEventHandler(e, t, n);
});
var u = function() {
var o = m.utils.unwrapObservable(t()), i = m.selectExtensions.readValue(e);
if (null !== a && o === a) return setTimeout(u, 0), void 0;
var r = o !== i;
if (r) if ("select" === m.utils.tagNameLower(e)) {
var s = n.get("valueAllowUnset"), l = function() {
m.selectExtensions.writeValue(e, o, s);
};
l(), s || o === m.selectExtensions.readValue(e) ? setTimeout(l, 0) :m.dependencyDetection.ignore(m.utils.triggerEvent, null, [ e, "change" ]);
} else m.selectExtensions.writeValue(e, o);
};
m.computed(u, null, {
disposeWhenNodeIsRemoved:e
});
},
update:function() {}
}, m.expressionRewriting.twoWayBindings.value = !0, m.bindingHandlers.visible = {
update:function(e, t) {
var n = m.utils.unwrapObservable(t()), o = !("none" == e.style.display);
n && !o ? e.style.display = "" :!n && o && (e.style.display = "none");
}
}, p("click"), m.templateEngine = function() {}, m.templateEngine.prototype.renderTemplateSource = function() {
throw new Error("Override renderTemplateSource");
}, m.templateEngine.prototype.createJavaScriptEvaluatorBlock = function() {
throw new Error("Override createJavaScriptEvaluatorBlock");
}, m.templateEngine.prototype.makeTemplateSource = function(e, t) {
if ("string" == typeof e) {
t = t || o;
var n = t.getElementById(e);
if (!n) throw new Error("Cannot find template with ID " + e);
return new m.templateSources.domElement(n);
}
if (1 == e.nodeType || 8 == e.nodeType) return new m.templateSources.anonymousTemplate(e);
throw new Error("Unknown template type: " + e);
}, m.templateEngine.prototype.renderTemplate = function(e, t, n, o) {
var i = this.makeTemplateSource(e, o);
return this.renderTemplateSource(i, t, n);
}, m.templateEngine.prototype.isTemplateRewritten = function(e, t) {
return this.allowTemplateRewriting === !1 ? !0 :this.makeTemplateSource(e, t).data("isRewritten");
}, m.templateEngine.prototype.rewriteTemplate = function(e, t, n) {
var o = this.makeTemplateSource(e, n), i = t(o.text());
o.text(i), o.data("isRewritten", !0);
}, m.exportSymbol("templateEngine", m.templateEngine), m.templateRewriting = function() {
function e(e) {
for (var t = m.expressionRewriting.bindingRewriteValidators, n = 0; n < e.length; n++) {
var o = e[n].key;
if (t.hasOwnProperty(o)) {
var i = t[o];
if ("function" == typeof i) {
var r = i(e[n].value);
if (r) throw new Error(r);
} else if (!i) throw new Error("This template engine does not support the '" + o + "' binding within its templates");
}
}
}
function t(t, n, o, i) {
var r = m.expressionRewriting.parseObjectLiteral(t);
e(r);
var a = m.expressionRewriting.preProcessBindings(r, {
valueAccessors:!0
}), s = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a + " } })()},'" + o.toLowerCase() + "')";
return i.createJavaScriptEvaluatorBlock(s) + n;
}
var n = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, o = /<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;
return {
ensureTemplateIsRewritten:function(e, t, n) {
t.isTemplateRewritten(e, n) || t.rewriteTemplate(e, function(e) {
return m.templateRewriting.memoizeBindingAttributeSyntax(e, t);
}, n);
},
memoizeBindingAttributeSyntax:function(e, i) {
return e.replace(n, function() {
return t(arguments[4], arguments[1], arguments[2], i);
}).replace(o, function() {
return t(arguments[1], "<!-- ko -->", "#comment", i);
});
},
applyMemoizedBindingsToNextSibling:function(e, t) {
return m.memoization.memoize(function(n, o) {
var i = n.nextSibling;
i && i.nodeName.toLowerCase() === t && m.applyBindingAccessorsToNode(i, e, o);
});
}
};
}(), m.exportSymbol("__tr_ambtns", m.templateRewriting.applyMemoizedBindingsToNextSibling), 
function() {
m.templateSources = {}, m.templateSources.domElement = function(e) {
this.domElement = e;
}, m.templateSources.domElement.prototype.text = function() {
var e = m.utils.tagNameLower(this.domElement), t = "script" === e ? "text" :"textarea" === e ? "value" :"innerHTML";
if (0 == arguments.length) return this.domElement[t];
var n = arguments[0];
"innerHTML" === t ? m.utils.setHtml(this.domElement, n) :this.domElement[t] = n;
};
var e = m.utils.domData.nextKey() + "_";
m.templateSources.domElement.prototype.data = function(t) {
return 1 === arguments.length ? m.utils.domData.get(this.domElement, e + t) :(m.utils.domData.set(this.domElement, e + t, arguments[1]), 
void 0);
};
var n = m.utils.domData.nextKey();
m.templateSources.anonymousTemplate = function(e) {
this.domElement = e;
}, m.templateSources.anonymousTemplate.prototype = new m.templateSources.domElement(), 
m.templateSources.anonymousTemplate.prototype.constructor = m.templateSources.anonymousTemplate, 
m.templateSources.anonymousTemplate.prototype.text = function() {
if (0 == arguments.length) {
var e = m.utils.domData.get(this.domElement, n) || {};
return e.textData === t && e.containerData && (e.textData = e.containerData.innerHTML), 
e.textData;
}
var o = arguments[0];
m.utils.domData.set(this.domElement, n, {
textData:o
});
}, m.templateSources.domElement.prototype.nodes = function() {
if (0 == arguments.length) {
var e = m.utils.domData.get(this.domElement, n) || {};
return e.containerData;
}
var t = arguments[0];
m.utils.domData.set(this.domElement, n, {
containerData:t
});
}, m.exportSymbol("templateSources", m.templateSources), m.exportSymbol("templateSources.domElement", m.templateSources.domElement), 
m.exportSymbol("templateSources.anonymousTemplate", m.templateSources.anonymousTemplate);
}(), function() {
function e(e, t, n) {
for (var o, i = e, r = m.virtualElements.nextSibling(t); i && (o = i) !== r; ) i = m.virtualElements.nextSibling(o), 
n(o, i);
}
function n(t, n) {
if (t.length) {
var o = t[0], i = t[t.length - 1], r = o.parentNode, a = m.bindingProvider.instance, s = a.preprocessNode;
if (s) {
if (e(o, i, function(e, t) {
var n = e.previousSibling, r = s.call(a, e);
r && (e === o && (o = r[0] || t), e === i && (i = r[r.length - 1] || n));
}), t.length = 0, !o) return;
o === i ? t.push(o) :(t.push(o, i), m.utils.fixUpContinuousNodeArray(t, r));
}
e(o, i, function(e) {
(1 === e.nodeType || 8 === e.nodeType) && m.applyBindings(n, e);
}), e(o, i, function(e) {
(1 === e.nodeType || 8 === e.nodeType) && m.memoization.unmemoizeDomNodeAndDescendants(e, [ n ]);
}), m.utils.fixUpContinuousNodeArray(t, r);
}
}
function o(e) {
return e.nodeType ? e :e.length > 0 ? e[0] :null;
}
function i(e, t, i, r, a) {
a = a || {};
var l = e && o(e), u = l && l.ownerDocument, c = a.templateEngine || s;
m.templateRewriting.ensureTemplateIsRewritten(i, c, u);
var d = c.renderTemplate(i, r, a, u);
if ("number" != typeof d.length || d.length > 0 && "number" != typeof d[0].nodeType) throw new Error("Template engine must return an array of DOM nodes");
var h = !1;
switch (t) {
case "replaceChildren":
m.virtualElements.setDomNodeChildren(e, d), h = !0;
break;

case "replaceNode":
m.utils.replaceDomNodes(e, d), h = !0;
break;

case "ignoreTargetNode":
break;

default:
throw new Error("Unknown renderMode: " + t);
}
return h && (n(d, r), a.afterRender && m.dependencyDetection.ignore(a.afterRender, null, [ d, r.$data ])), 
d;
}
function r(e, t, n) {
return m.isObservable(e) ? e() :"function" == typeof e ? e(t, n) :e;
}
function a(e, n) {
var o = m.utils.domData.get(e, l);
o && "function" == typeof o.dispose && o.dispose(), m.utils.domData.set(e, l, n && n.isActive() ? n :t);
}
var s;
m.setTemplateEngine = function(e) {
if (e != t && !(e instanceof m.templateEngine)) throw new Error("templateEngine must inherit from ko.templateEngine");
s = e;
}, m.renderTemplate = function(e, n, a, l, u) {
if (a = a || {}, (a.templateEngine || s) == t) throw new Error("Set a template engine before calling renderTemplate");
if (u = u || "replaceChildren", l) {
var c = o(l), d = function() {
return !c || !m.utils.domNodeIsAttachedToDocument(c);
}, h = c && "replaceNode" == u ? c.parentNode :c;
return m.dependentObservable(function() {
var t = n && n instanceof m.bindingContext ? n :new m.bindingContext(m.utils.unwrapObservable(n)), s = r(e, t.$data, t), d = i(l, u, s, t, a);
"replaceNode" == u && (l = d, c = o(l));
}, null, {
disposeWhen:d,
disposeWhenNodeIsRemoved:h
});
}
return m.memoization.memoize(function(t) {
m.renderTemplate(e, n, a, t, "replaceNode");
});
}, m.renderTemplateForEach = function(e, o, a, s, l) {
var u, c = function(t, n) {
u = l.createChildContext(t, a.as, function(e) {
e.$index = n;
});
var o = r(e, t, u);
return i(null, "ignoreTargetNode", o, u, a);
}, d = function(e, t) {
n(t, u), a.afterRender && a.afterRender(t, e);
};
return m.dependentObservable(function() {
var e = m.utils.unwrapObservable(o) || [];
"undefined" == typeof e.length && (e = [ e ]);
var n = m.utils.arrayFilter(e, function(e) {
return a.includeDestroyed || e === t || null === e || !m.utils.unwrapObservable(e._destroy);
});
m.dependencyDetection.ignore(m.utils.setDomNodeChildrenFromArrayMapping, null, [ s, n, c, a, d ]);
}, null, {
disposeWhenNodeIsRemoved:s
});
};
var l = m.utils.domData.nextKey();
m.bindingHandlers.template = {
init:function(e, t) {
var n = m.utils.unwrapObservable(t());
if ("string" == typeof n || n.name) m.virtualElements.emptyNode(e); else {
var o = m.virtualElements.childNodes(e), i = m.utils.moveCleanedNodesToContainerElement(o);
new m.templateSources.anonymousTemplate(e).nodes(i);
}
return {
controlsDescendantBindings:!0
};
},
update:function(e, t, n, o, i) {
var r, s, l = t(), u = m.utils.unwrapObservable(l), c = !0, d = null;
if ("string" == typeof u ? (s = l, u = {}) :(s = u.name, "if" in u && (c = m.utils.unwrapObservable(u["if"])), 
c && "ifnot" in u && (c = !m.utils.unwrapObservable(u.ifnot)), r = m.utils.unwrapObservable(u.data)), 
"foreach" in u) {
var h = c && u.foreach || [];
d = m.renderTemplateForEach(s || e, h, u, e, i);
} else if (c) {
var p = "data" in u ? i.createChildContext(r, u.as) :i;
d = m.renderTemplate(s || e, p, u, e);
} else m.virtualElements.emptyNode(e);
a(e, d);
}
}, m.expressionRewriting.bindingRewriteValidators.template = function(e) {
var t = m.expressionRewriting.parseObjectLiteral(e);
return 1 == t.length && t[0].unknown ? null :m.expressionRewriting.keyValueArrayContainsKey(t, "name") ? null :"This template engine does not support anonymous templates nested within its templates";
}, m.virtualElements.allowedBindings.template = !0;
}(), m.exportSymbol("setTemplateEngine", m.setTemplateEngine), m.exportSymbol("renderTemplate", m.renderTemplate), 
m.utils.findMovesInArrayComparison = function(e, t, n) {
if (e.length && t.length) {
var o, i, r, a, s;
for (o = i = 0; (!n || n > o) && (a = e[i]); ++i) {
for (r = 0; s = t[r]; ++r) if (a.value === s.value) {
a.moved = s.index, s.moved = a.index, t.splice(r, 1), o = r = 0;
break;
}
o += r;
}
}
}, m.utils.compareArrays = function() {
function e(e, i, r) {
return r = "boolean" == typeof r ? {
dontLimitMoves:r
} :r || {}, e = e || [], i = i || [], e.length <= i.length ? t(e, i, n, o, r) :t(i, e, o, n, r);
}
function t(e, t, n, o, i) {
var r, a, s, l, u, c, d = Math.min, h = Math.max, p = [], g = e.length, f = t.length, _ = f - g || 1, v = g + f + 1;
for (r = 0; g >= r; r++) for (l = s, p.push(s = []), u = d(f, r + _), c = h(0, r - 1), 
a = c; u >= a; a++) if (a) if (r) if (e[r - 1] === t[a - 1]) s[a] = l[a - 1]; else {
var w = l[a] || v, y = s[a - 1] || v;
s[a] = d(w, y) + 1;
} else s[a] = a + 1; else s[a] = r + 1;
var b, k = [], M = [], L = [];
for (r = g, a = f; r || a; ) b = p[r][a] - 1, a && b === p[r][a - 1] ? M.push(k[k.length] = {
status:n,
value:t[--a],
index:a
}) :r && b === p[r - 1][a] ? L.push(k[k.length] = {
status:o,
value:e[--r],
index:r
}) :(--a, --r, i.sparse || k.push({
status:"retained",
value:t[a]
}));
return m.utils.findMovesInArrayComparison(M, L, 10 * g), k.reverse();
}
var n = "added", o = "deleted";
return e;
}(), m.exportSymbol("utils.compareArrays", m.utils.compareArrays), function() {
function e(e, n, o, i, r) {
var a = [], s = m.dependentObservable(function() {
var t = n(o, r, m.utils.fixUpContinuousNodeArray(a, e)) || [];
a.length > 0 && (m.utils.replaceDomNodes(a, t), i && m.dependencyDetection.ignore(i, null, [ o, t, r ])), 
a.length = 0, m.utils.arrayPushAll(a, t);
}, null, {
disposeWhenNodeIsRemoved:e,
disposeWhen:function() {
return !m.utils.anyDomNodeIsAttachedToDocument(a);
}
});
return {
mappedNodes:a,
dependentObservable:s.isActive() ? s :t
};
}
var n = m.utils.domData.nextKey();
m.utils.setDomNodeChildrenFromArrayMapping = function(o, i, r, a, s) {
function l(e, t) {
c = g[t], y !== t && (L[e] = c), c.indexObservable(y++), m.utils.fixUpContinuousNodeArray(c.mappedNodes, o), 
v.push(c), k.push(c);
}
function u(e, t) {
if (e) for (var n = 0, o = t.length; o > n; n++) t[n] && m.utils.arrayForEach(t[n].mappedNodes, function(o) {
e(o, n, t[n].arrayEntry);
});
}
i = i || [], a = a || {};
for (var c, d, h, p = m.utils.domData.get(o, n) === t, g = m.utils.domData.get(o, n) || [], f = m.utils.arrayMap(g, function(e) {
return e.arrayEntry;
}), _ = m.utils.compareArrays(f, i, a.dontLimitMoves), v = [], w = 0, y = 0, b = [], k = [], M = [], L = [], S = [], T = 0; d = _[T]; T++) switch (h = d.moved, 
d.status) {
case "deleted":
h === t && (c = g[w], c.dependentObservable && c.dependentObservable.dispose(), 
b.push.apply(b, m.utils.fixUpContinuousNodeArray(c.mappedNodes, o)), a.beforeRemove && (M[T] = c, 
k.push(c))), w++;
break;

case "retained":
l(T, w++);
break;

case "added":
h !== t ? l(T, h) :(c = {
arrayEntry:d.value,
indexObservable:m.observable(y++)
}, v.push(c), k.push(c), p || (S[T] = c));
}
u(a.beforeMove, L), m.utils.arrayForEach(b, a.beforeRemove ? m.cleanNode :m.removeNode);
for (var x, D, T = 0, Y = m.virtualElements.firstChild(o); c = k[T]; T++) {
c.mappedNodes || m.utils.extend(c, e(o, r, c.arrayEntry, s, c.indexObservable));
for (var E = 0; D = c.mappedNodes[E]; Y = D.nextSibling, x = D, E++) D !== Y && m.virtualElements.insertAfter(o, D, x);
!c.initialized && s && (s(c.arrayEntry, c.mappedNodes, c.indexObservable), c.initialized = !0);
}
u(a.beforeRemove, M), u(a.afterMove, L), u(a.afterAdd, S), m.utils.domData.set(o, n, v);
};
}(), m.exportSymbol("utils.setDomNodeChildrenFromArrayMapping", m.utils.setDomNodeChildrenFromArrayMapping), 
m.nativeTemplateEngine = function() {
this.allowTemplateRewriting = !1;
}, m.nativeTemplateEngine.prototype = new m.templateEngine(), m.nativeTemplateEngine.prototype.constructor = m.nativeTemplateEngine, 
m.nativeTemplateEngine.prototype.renderTemplateSource = function(e) {
var t = !(m.utils.ieVersion < 9), n = t ? e.nodes :null, o = n ? e.nodes() :null;
if (o) return m.utils.makeArray(o.cloneNode(!0).childNodes);
var i = e.text();
return m.utils.parseHtmlFragment(i);
}, m.nativeTemplateEngine.instance = new m.nativeTemplateEngine(), m.setTemplateEngine(m.nativeTemplateEngine.instance), 
m.exportSymbol("nativeTemplateEngine", m.nativeTemplateEngine), function() {
m.jqueryTmplTemplateEngine = function() {
function e() {
if (2 > n) throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
}
function t(e, t, n) {
return r.tmpl(e, t, n);
}
var n = this.jQueryTmplVersion = function() {
if (!r || !r.tmpl) return 0;
try {
if (r.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0) return 2;
} catch (e) {}
return 1;
}();
this.renderTemplateSource = function(n, i, a) {
a = a || {}, e();
var s = n.data("precompiled");
if (!s) {
var l = n.text() || "";
l = "{{ko_with $item.koBindingContext}}" + l + "{{/ko_with}}", s = r.template(null, l), 
n.data("precompiled", s);
}
var u = [ i.$data ], c = r.extend({
koBindingContext:i
}, a.templateOptions), d = t(s, u, c);
return d.appendTo(o.createElement("div")), r.fragments = {}, d;
}, this.createJavaScriptEvaluatorBlock = function(e) {
return "{{ko_code ((function() { return " + e + " })()) }}";
}, this.addTemplate = function(e, t) {
o.write("<script type='text/html' id='" + e + "'>" + t + "</script>");
}, n > 0 && (r.tmpl.tag.ko_code = {
open:"__.push($1 || '');"
}, r.tmpl.tag.ko_with = {
open:"with($1) {",
close:"} "
});
}, m.jqueryTmplTemplateEngine.prototype = new m.templateEngine(), m.jqueryTmplTemplateEngine.prototype.constructor = m.jqueryTmplTemplateEngine;
var e = new m.jqueryTmplTemplateEngine();
e.jQueryTmplVersion > 0 && m.setTemplateEngine(e), m.exportSymbol("jqueryTmplTemplateEngine", m.jqueryTmplTemplateEngine);
}();
});
}();
}(), function(e) {
"function" == typeof define && define.amd ? define([ "knockout", "jquery", "jquery.ui.sortable" ], e) :e(window.ko, jQuery);
}(function(e, t) {
var n = "ko_sortItem", o = "ko_sourceIndex", i = "ko_sortList", r = "ko_parentList", a = "ko_dragItem", s = e.utils.unwrapObservable, l = e.utils.domData.get, u = e.utils.domData.set, c = t.ui && t.ui.version, d = c && c.indexOf("1.6.") && c.indexOf("1.7.") && (c.indexOf("1.8.") || "1.8.24" === c), h = function(t, o) {
e.utils.arrayForEach(t, function(e) {
1 === e.nodeType && (u(e, n, o), u(e, r, l(e.parentNode, i)));
});
}, p = function(t, n) {
var o, i = {}, r = s(t()) || {};
return r.data ? (i[n] = r.data, i.name = r.template) :i[n] = t(), e.utils.arrayForEach([ "afterAdd", "afterRender", "as", "beforeRemove", "includeDestroyed", "templateEngine", "templateOptions" ], function(t) {
i[t] = r[t] || e.bindingHandlers.sortable[t];
}), "foreach" === n && (i.afterRender ? (o = i.afterRender, i.afterRender = function(e, t) {
h.call(t, e, t), o.call(t, e, t);
}) :i.afterRender = h), i;
}, g = function(e, t) {
var n = s(t);
if (n) for (var o = 0; e > o; o++) n[o] && s(n[o]._destroy) && e++;
return e;
}, m = function(n, o) {
var i, r;
o ? (r = document.getElementById(o), r && (i = new e.templateSources.domElement(r), 
i.text(t.trim(i.text())))) :t(n).contents().each(function() {
this && 1 !== this.nodeType && n.removeChild(this);
});
};
e.bindingHandlers.sortable = {
init:function(c, h, f, _, v) {
var w, y, b = t(c), k = s(h()) || {}, M = p(h, "foreach"), L = {};
m(c, M.name), t.extend(!0, L, e.bindingHandlers.sortable), k.options && L.options && (e.utils.extend(L.options, k.options), 
delete k.options), e.utils.extend(L, k), L.connectClass && (e.isObservable(L.allowDrop) || "function" == typeof L.allowDrop) ? e.computed({
read:function() {
var t = s(L.allowDrop), n = "function" == typeof t ? t.call(this, M.foreach) :t;
e.utils.toggleDomNodeCssClass(c, L.connectClass, n);
},
disposeWhenNodeIsRemoved:c
}, this) :e.utils.toggleDomNodeCssClass(c, L.connectClass, L.allowDrop), e.bindingHandlers.template.init(c, function() {
return M;
}, f, _, v), w = L.options.start, y = L.options.update;
var S = setTimeout(function() {
var h;
b.sortable(e.utils.extend(L.options, {
start:function(t, n) {
var i = n.item[0];
u(i, o, e.utils.arrayIndexOf(n.item.parent().children(), i)), n.item.find("input:focus").change(), 
w && w.apply(this, arguments);
},
receive:function(e, t) {
h = l(t.item[0], a), h && (h.clone && (h = h.clone()), L.dragged && (h = L.dragged.call(this, h, e, t) || h));
},
update:function(a, s) {
var c, p, m, f, _, v = s.item[0], w = s.item.parent()[0], b = l(v, n) || h;
if (h = null, b && this === w || !d && t.contains(this, w)) {
if (c = l(v, r), m = l(v, o), p = l(v.parentNode, i), f = e.utils.arrayIndexOf(s.item.parent().children(), v), 
M.includeDestroyed || (m = g(m, c), f = g(f, p)), (L.beforeMove || L.afterMove) && (_ = {
item:b,
sourceParent:c,
sourceParentNode:c && s.sender || v.parentNode,
sourceIndex:m,
targetParent:p,
targetIndex:f,
cancelDrop:!1
}, L.beforeMove && L.beforeMove.call(this, _, a, s)), c ? t(c === p ? this :s.sender || this).sortable("cancel") :t(v).remove(), 
_ && _.cancelDrop) return;
f >= 0 && (c && (c.splice(m, 1), e.processAllDeferredBindingUpdates && e.processAllDeferredBindingUpdates()), 
p.splice(f, 0, b)), u(v, n, null), e.processAllDeferredBindingUpdates && e.processAllDeferredBindingUpdates(), 
L.afterMove && L.afterMove.call(this, _, a, s);
}
y && y.apply(this, arguments);
},
connectWith:L.connectClass ? "." + L.connectClass :!1
})), void 0 !== L.isEnabled && e.computed({
read:function() {
b.sortable(s(L.isEnabled) ? "enable" :"disable");
},
disposeWhenNodeIsRemoved:c
});
}, 0);
return e.utils.domNodeDisposal.addDisposeCallback(c, function() {
(b.data("ui-sortable") || b.data("sortable")) && b.sortable("destroy"), clearTimeout(S);
}), {
controlsDescendantBindings:!0
};
},
update:function(t, n, o, r, a) {
var s = p(n, "foreach");
u(t, i, s.foreach), e.bindingHandlers.template.update(t, function() {
return s;
}, o, r, a);
},
connectClass:"ko_container",
allowDrop:!0,
afterMove:null,
beforeMove:null,
options:{}
}, e.bindingHandlers.draggable = {
init:function(n, o, i, r, l) {
var c = s(o()) || {}, d = c.options || {}, h = e.utils.extend({}, e.bindingHandlers.draggable.options), g = p(o, "data"), m = c.connectClass || e.bindingHandlers.draggable.connectClass, f = void 0 !== c.isEnabled ? c.isEnabled :e.bindingHandlers.draggable.isEnabled;
return c = "data" in c ? c.data :c, u(n, a, c), e.utils.extend(h, d), h.connectToSortable = m ? "." + m :!1, 
t(n).draggable(h), void 0 !== f && e.computed({
read:function() {
t(n).draggable(s(f) ? "enable" :"disable");
},
disposeWhenNodeIsRemoved:n
}), e.bindingHandlers.template.init(n, function() {
return g;
}, i, r, l);
},
update:function(t, n, o, i, r) {
var a = p(n, "data");
return e.bindingHandlers.template.update(t, function() {
return a;
}, o, i, r);
},
connectClass:e.bindingHandlers.sortable.connectClass,
options:{
helper:"clone"
}
};
}), function(e) {
"function" == typeof require && "object" == typeof exports && "object" == typeof module ? e(require("knockout"), exports) :"function" == typeof define && define.amd ? define([ "knockout", "exports" ], e) :e(ko, ko.mapping = {});
}(function(e, t) {
function n(e, t) {
for (var n = {}, o = e.length - 1; o >= 0; --o) n[e[o]] = e[o];
for (var o = t.length - 1; o >= 0; --o) n[t[o]] = t[o];
var i = [];
for (var r in n) i.push(n[r]);
return i;
}
function o(e, i) {
var r;
for (var a in i) if (i.hasOwnProperty(a) && i[a]) if (r = t.getType(e[a]), a && e[a] && "array" !== r && "string" !== r) o(e[a], i[a]); else {
var s = "array" === t.getType(e[a]) && "array" === t.getType(i[a]);
e[a] = s ? n(e[a], i[a]) :i[a];
}
}
function i(e, t) {
var n = {};
return o(n, e), o(n, t), n;
}
function r(e, t) {
for (var n = i({}, e), o = L.length - 1; o >= 0; o--) {
var r = L[o];
n[r] && (n[""] instanceof Object || (n[""] = {}), n[""][r] = n[r], delete n[r]);
}
return t && (n.ignore = a(t.ignore, n.ignore), n.include = a(t.include, n.include), 
n.copy = a(t.copy, n.copy), n.observe = a(t.observe, n.observe)), n.ignore = a(n.ignore, x.ignore), 
n.include = a(n.include, x.include), n.copy = a(n.copy, x.copy), n.observe = a(n.observe, x.observe), 
n.mappedProperties = n.mappedProperties || {}, n.copiedProperties = n.copiedProperties || {}, 
n;
}
function a(n, o) {
return "array" !== t.getType(n) && (n = "undefined" === t.getType(n) ? [] :[ n ]), 
"array" !== t.getType(o) && (o = "undefined" === t.getType(o) ? [] :[ o ]), e.utils.arrayGetDistinctValues(n.concat(o));
}
function s(t, n) {
var o = e.dependentObservable;
e.dependentObservable = function(n, o, i) {
i = i || {}, n && "object" == typeof n && (i = n);
var r = i.deferEvaluation, a = !1, s = function(n) {
var o = e.dependentObservable;
e.dependentObservable = k;
var i = e.isWriteableObservable(n);
e.dependentObservable = o;
var r = k({
read:function() {
return a || (e.utils.arrayRemoveItem(t, n), a = !0), n.apply(n, arguments);
},
write:i && function(e) {
return n(e);
},
deferEvaluation:!0
});
return y && (r._wrapper = !0), r.__DO = n, r;
};
i.deferEvaluation = !0;
var l = new k(n, o, i);
return r || (l = s(l), t.push(l)), l;
}, e.dependentObservable.fn = k.fn, e.computed = e.dependentObservable;
var i = n();
return e.dependentObservable = o, e.computed = e.dependentObservable, i;
}
function l(n, o, r, a, c, m, f) {
var _ = "array" === t.getType(e.utils.unwrapObservable(o));
if (m = m || "", t.isMapped(n)) {
var y = e.utils.unwrapObservable(n)[b];
r = i(y, r);
}
var k = {
data:o,
parent:f || c
}, M = function() {
return r[a] && r[a].create instanceof Function;
}, L = function(t) {
return s(v, function() {
return e.utils.unwrapObservable(c) instanceof Array ? r[a].create({
data:t || k.data,
parent:k.parent,
skip:S
}) :r[a].create({
data:t || k.data,
parent:k.parent
});
});
}, T = function() {
return r[a] && r[a].update instanceof Function;
}, x = function(t, n) {
var o = {
data:n || k.data,
parent:k.parent,
target:e.utils.unwrapObservable(t)
};
return e.isWriteableObservable(t) && (o.observable = t), r[a].update(o);
}, D = w.get(o);
if (D) return D;
if (a = a || "", _) {
var Y = [], E = !1, C = function(e) {
return e;
};
r[a] && r[a].key && (C = r[a].key, E = !0), e.isObservable(n) || (n = e.observableArray([]), 
n.mappedRemove = function(e) {
var t = "function" == typeof e ? e :function(t) {
return t === C(e);
};
return n.remove(function(e) {
return t(C(e));
});
}, n.mappedRemoveAll = function(t) {
var o = h(t, C);
return n.remove(function(t) {
return -1 != e.utils.arrayIndexOf(o, C(t));
});
}, n.mappedDestroy = function(e) {
var t = "function" == typeof e ? e :function(t) {
return t === C(e);
};
return n.destroy(function(e) {
return t(C(e));
});
}, n.mappedDestroyAll = function(t) {
var o = h(t, C);
return n.destroy(function(t) {
return -1 != e.utils.arrayIndexOf(o, C(t));
});
}, n.mappedIndexOf = function(t) {
var o = h(n(), C), i = C(t);
return e.utils.arrayIndexOf(o, i);
}, n.mappedGet = function(e) {
return n()[n.mappedIndexOf(e)];
}, n.mappedCreate = function(t) {
if (-1 !== n.mappedIndexOf(t)) throw new Error("There already is an object with the key that you specified.");
var o = M() ? L(t) :t;
if (T()) {
var i = x(o, t);
e.isWriteableObservable(o) ? o(i) :o = i;
}
return n.push(o), o;
});
var I = h(e.utils.unwrapObservable(n), C).sort(), O = h(o, C);
E && O.sort();
var $, B, H = e.utils.compareArrays(I, O), A = {}, j = e.utils.unwrapObservable(o), N = {}, P = !0;
for ($ = 0, B = j.length; B > $; $++) {
var F = C(j[$]);
if (void 0 === F || F instanceof Object) {
P = !1;
break;
}
N[F] = j[$];
}
var z = [], R = 0;
for ($ = 0, B = H.length; B > $; $++) {
var W, F = H[$], q = m + "[" + $ + "]";
switch (F.status) {
case "added":
var U = P ? N[F.value] :d(e.utils.unwrapObservable(o), F.value, C);
W = l(void 0, U, r, a, n, q, c), M() || (W = e.utils.unwrapObservable(W));
var V = u(e.utils.unwrapObservable(o), U, A);
W === S ? R++ :z[V - R] = W, A[V] = !0;
break;

case "retained":
var U = P ? N[F.value] :d(e.utils.unwrapObservable(o), F.value, C);
W = d(n, F.value, C), l(W, U, r, a, n, q, c);
var V = u(e.utils.unwrapObservable(o), U, A);
z[V] = W, A[V] = !0;
break;

case "deleted":
W = d(n, F.value, C);
}
Y.push({
event:F.status,
item:W
});
}
n(z), r[a] && r[a].arrayChanged && e.utils.arrayForEach(Y, function(e) {
r[a].arrayChanged(e.event, e.item);
});
} else if (g(o)) {
if (n = e.utils.unwrapObservable(n), !n) {
if (M()) {
var G = L();
return T() && (G = x(G)), G;
}
if (T()) return x(G);
n = {};
}
if (T() && (n = x(n)), w.save(o, n), T()) return n;
p(o, function(t) {
var i = m.length ? m + "." + t :t;
if (-1 == e.utils.arrayIndexOf(r.ignore, i)) {
if (-1 != e.utils.arrayIndexOf(r.copy, i)) return n[t] = o[t], void 0;
if ("object" != typeof o[t] && "array" != typeof o[t] && r.observe.length > 0 && -1 == e.utils.arrayIndexOf(r.observe, i)) return n[t] = o[t], 
r.copiedProperties[i] = !0, void 0;
var a = w.get(o[t]), s = l(n[t], o[t], r, t, n, i, n), u = a || s;
if (r.observe.length > 0 && -1 == e.utils.arrayIndexOf(r.observe, i)) return n[t] = u(), 
r.copiedProperties[i] = !0, void 0;
e.isWriteableObservable(n[t]) ? (u = e.utils.unwrapObservable(u), n[t]() !== u && n[t](u)) :(u = void 0 === n[t] ? u :e.utils.unwrapObservable(u), 
n[t] = u), r.mappedProperties[i] = !0;
}
});
} else switch (t.getType(o)) {
case "function":
T() ? e.isWriteableObservable(o) ? (o(x(o)), n = o) :n = x(o) :n = o;
break;

default:
if (e.isWriteableObservable(n)) {
if (T()) {
var J = x(n);
return n(J), J;
}
var J = e.utils.unwrapObservable(o);
return n(J), J;
}
var K = M() || T();
if (n = M() ? L() :e.observable(e.utils.unwrapObservable(o)), T() && n(x(n)), K) return n;
}
return n;
}
function u(e, t, n) {
for (var o = 0, i = e.length; i > o; o++) if (n[o] !== !0 && e[o] === t) return o;
return null;
}
function c(n, o) {
var i;
return o && (i = o(n)), "undefined" === t.getType(i) && (i = n), e.utils.unwrapObservable(i);
}
function d(t, n, o) {
t = e.utils.unwrapObservable(t);
for (var i = 0, r = t.length; r > i; i++) {
var a = t[i];
if (c(a, o) === n) return a;
}
throw new Error("When calling ko.update*, the key '" + n + "' was not found!");
}
function h(t, n) {
return e.utils.arrayMap(e.utils.unwrapObservable(t), function(e) {
return n ? c(e, n) :e;
});
}
function p(e, n) {
if ("array" === t.getType(e)) for (var o = 0; o < e.length; o++) n(o); else for (var i in e) n(i);
}
function g(e) {
var n = t.getType(e);
return ("object" === n || "array" === n) && null !== e;
}
function m(e, n, o) {
var i = e || "";
return "array" === t.getType(n) ? e && (i += "[" + o + "]") :(e && (i += "."), i += o), 
i;
}
function f() {
var t = [], n = [];
this.save = function(o, i) {
var r = e.utils.arrayIndexOf(t, o);
r >= 0 ? n[r] = i :(t.push(o), n.push(i));
}, this.get = function(o) {
var i = e.utils.arrayIndexOf(t, o), r = i >= 0 ? n[i] :void 0;
return r;
};
}
function _() {
var e = {}, t = function(t) {
var n;
try {
n = t;
} catch (o) {
n = "$$$";
}
var i = e[n];
return void 0 === i && (i = new f(), e[n] = i), i;
};
this.save = function(e, n) {
t(e).save(e, n);
}, this.get = function(e) {
return t(e).get(e);
};
}
var v, w, y = !0, b = "__ko_mapping__", k = e.dependentObservable, M = 0, L = [ "create", "update", "key", "arrayChanged" ], S = {}, T = {
include:[ "_destroy" ],
ignore:[],
copy:[],
observe:[]
}, x = T;
t.isMapped = function(t) {
var n = e.utils.unwrapObservable(t);
return n && n[b];
}, t.fromJS = function(e) {
if (0 == arguments.length) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
try {
M++ || (v = [], w = new _());
var t, n;
2 == arguments.length && (arguments[1][b] ? n = arguments[1] :t = arguments[1]), 
3 == arguments.length && (t = arguments[1], n = arguments[2]), n && (t = i(t, n[b])), 
t = r(t);
var o = l(n, e, t);
if (n && (o = n), !--M) for (;v.length; ) {
var a = v.pop();
a && (a(), a.__DO.throttleEvaluation = a.throttleEvaluation);
}
return o[b] = i(o[b], t), o;
} catch (s) {
throw M = 0, s;
}
}, t.fromJSON = function(n) {
var o = e.utils.parseJson(n);
return arguments[0] = o, t.fromJS.apply(this, arguments);
}, t.updateFromJS = function() {
throw new Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!");
}, t.updateFromJSON = function() {
throw new Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!");
}, t.toJS = function(n, o) {
if (x || t.resetDefaultOptions(), 0 == arguments.length) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
if ("array" !== t.getType(x.ignore)) throw new Error("ko.mapping.defaultOptions().ignore should be an array.");
if ("array" !== t.getType(x.include)) throw new Error("ko.mapping.defaultOptions().include should be an array.");
if ("array" !== t.getType(x.copy)) throw new Error("ko.mapping.defaultOptions().copy should be an array.");
return o = r(o, n[b]), t.visitModel(n, function(t) {
return e.utils.unwrapObservable(t);
}, o);
}, t.toJSON = function(n, o) {
var i = t.toJS(n, o);
return e.utils.stringifyJson(i);
}, t.defaultOptions = function() {
return arguments.length > 0 ? (x = arguments[0], void 0) :x;
}, t.resetDefaultOptions = function() {
x = {
include:T.include.slice(0),
ignore:T.ignore.slice(0),
copy:T.copy.slice(0)
};
}, t.getType = function(e) {
if (e && "object" == typeof e) {
if (e.constructor === Date) return "date";
if (e.constructor === Array) return "array";
}
return typeof e;
}, t.visitModel = function(n, o, i) {
i = i || {}, i.visitedObjects = i.visitedObjects || new _();
var a, s = e.utils.unwrapObservable(n);
if (!g(s)) return o(n, i.parentName);
i = r(i, s[b]), o(n, i.parentName), a = "array" === t.getType(s) ? [] :{}, i.visitedObjects.save(n, a);
var l = i.parentName;
return p(s, function(n) {
if (!i.ignore || -1 == e.utils.arrayIndexOf(i.ignore, n)) {
var r = s[n];
if (i.parentName = m(l, s, n), -1 !== e.utils.arrayIndexOf(i.copy, n) || -1 !== e.utils.arrayIndexOf(i.include, n) || !s[b] || !s[b].mappedProperties || s[b].mappedProperties[n] || !s[b].copiedProperties || s[b].copiedProperties[n] || "array" === t.getType(s)) {
switch (t.getType(e.utils.unwrapObservable(r))) {
case "object":
case "array":
case "undefined":
var u = i.visitedObjects.get(r);
a[n] = "undefined" !== t.getType(u) ? u :t.visitModel(r, o, i);
break;

default:
a[n] = o(r, i.parentName);
}
}
}
}), a;
};
}), function() {
function e(t, n, o) {
if (t === n) return 0 !== t || 1 / t == 1 / n;
if (null == t || null == n) return t === n;
if (t._chain && (t = t._wrapped), n._chain && (n = n._wrapped), t.isEqual && M.isFunction(t.isEqual)) return t.isEqual(n);
if (n.isEqual && M.isFunction(n.isEqual)) return n.isEqual(t);
var i = u.call(t);
if (i != u.call(n)) return !1;
switch (i) {
case "[object String]":
return t == String(n);

case "[object Number]":
return t != +t ? n != +n :0 == t ? 1 / t == 1 / n :t == +n;

case "[object Date]":
case "[object Boolean]":
return +t == +n;

case "[object RegExp]":
return t.source == n.source && t.global == n.global && t.multiline == n.multiline && t.ignoreCase == n.ignoreCase;
}
if ("object" != typeof t || "object" != typeof n) return !1;
for (var r = o.length; r--; ) if (o[r] == t) return !0;
o.push(t);
var a = 0, s = !0;
if ("[object Array]" == i) {
if (a = t.length, s = a == n.length) for (;a-- && (s = a in t == a in n && e(t[a], n[a], o)); ) ;
} else {
if ("constructor" in t != "constructor" in n || t.constructor != n.constructor) return !1;
for (var l in t) if (M.has(t, l) && (a++, !(s = M.has(n, l) && e(t[l], n[l], o)))) break;
if (s) {
for (l in n) if (M.has(n, l) && !a--) break;
s = !a;
}
}
return o.pop(), s;
}
var t = this, n = t._, o = {}, i = Array.prototype, r = Object.prototype, a = Function.prototype, s = i.slice, l = i.unshift, u = r.toString, c = r.hasOwnProperty, d = i.forEach, h = i.map, p = i.reduce, g = i.reduceRight, m = i.filter, f = i.every, _ = i.some, v = i.indexOf, w = i.lastIndexOf, y = Array.isArray, b = Object.keys, k = a.bind, M = function(e) {
return new E(e);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = M), 
exports._ = M) :t._ = M, M.VERSION = "1.3.1";
var L = M.each = M.forEach = function(e, t, n) {
if (null != e) if (d && e.forEach === d) e.forEach(t, n); else if (e.length === +e.length) {
for (var i = 0, r = e.length; r > i; i++) if (i in e && t.call(n, e[i], i, e) === o) return;
} else for (var a in e) if (M.has(e, a) && t.call(n, e[a], a, e) === o) return;
};
M.map = M.collect = function(e, t, n) {
var o = [];
return null == e ? o :h && e.map === h ? e.map(t, n) :(L(e, function(e, i, r) {
o[o.length] = t.call(n, e, i, r);
}), e.length === +e.length && (o.length = e.length), o);
}, M.reduce = M.foldl = M.inject = function(e, t, n, o) {
var i = arguments.length > 2;
if (null == e && (e = []), p && e.reduce === p) return o && (t = M.bind(t, o)), 
i ? e.reduce(t, n) :e.reduce(t);
if (L(e, function(e, r, a) {
i ? n = t.call(o, n, e, r, a) :(n = e, i = !0);
}), !i) throw new TypeError("Reduce of empty array with no initial value");
return n;
}, M.reduceRight = M.foldr = function(e, t, n, o) {
var i = arguments.length > 2;
if (null == e && (e = []), g && e.reduceRight === g) return o && (t = M.bind(t, o)), 
i ? e.reduceRight(t, n) :e.reduceRight(t);
var r = M.toArray(e).reverse();
return o && !i && (t = M.bind(t, o)), i ? M.reduce(r, t, n, o) :M.reduce(r, t);
}, M.find = M.detect = function(e, t, n) {
var o;
return S(e, function(e, i, r) {
return t.call(n, e, i, r) ? (o = e, !0) :void 0;
}), o;
}, M.filter = M.select = function(e, t, n) {
var o = [];
return null == e ? o :m && e.filter === m ? e.filter(t, n) :(L(e, function(e, i, r) {
t.call(n, e, i, r) && (o[o.length] = e);
}), o);
}, M.reject = function(e, t, n) {
var o = [];
return null == e ? o :(L(e, function(e, i, r) {
t.call(n, e, i, r) || (o[o.length] = e);
}), o);
}, M.every = M.all = function(e, t, n) {
var i = !0;
return null == e ? i :f && e.every === f ? e.every(t, n) :(L(e, function(e, r, a) {
return (i = i && t.call(n, e, r, a)) ? void 0 :o;
}), i);
};
var S = M.some = M.any = function(e, t, n) {
t || (t = M.identity);
var i = !1;
return null == e ? i :_ && e.some === _ ? e.some(t, n) :(L(e, function(e, r, a) {
return i || (i = t.call(n, e, r, a)) ? o :void 0;
}), !!i);
};
M.include = M.contains = function(e, t) {
var n = !1;
return null == e ? n :v && e.indexOf === v ? -1 != e.indexOf(t) :n = S(e, function(e) {
return e === t;
});
}, M.invoke = function(e, t) {
var n = s.call(arguments, 2);
return M.map(e, function(e) {
return (M.isFunction(t) ? t || e :e[t]).apply(e, n);
});
}, M.pluck = function(e, t) {
return M.map(e, function(e) {
return e[t];
});
}, M.max = function(e, t, n) {
if (!t && M.isArray(e)) return Math.max.apply(Math, e);
if (!t && M.isEmpty(e)) return -1/0;
var o = {
computed:-1/0
};
return L(e, function(e, i, r) {
var a = t ? t.call(n, e, i, r) :e;
a >= o.computed && (o = {
value:e,
computed:a
});
}), o.value;
}, M.min = function(e, t, n) {
if (!t && M.isArray(e)) return Math.min.apply(Math, e);
if (!t && M.isEmpty(e)) return 1/0;
var o = {
computed:1/0
};
return L(e, function(e, i, r) {
var a = t ? t.call(n, e, i, r) :e;
a < o.computed && (o = {
value:e,
computed:a
});
}), o.value;
}, M.shuffle = function(e) {
var t, n = [];
return L(e, function(e, o) {
0 == o ? n[0] = e :(t = Math.floor(Math.random() * (o + 1)), n[o] = n[t], n[t] = e);
}), n;
}, M.sortBy = function(e, t, n) {
return M.pluck(M.map(e, function(e, o, i) {
return {
value:e,
criteria:t.call(n, e, o, i)
};
}).sort(function(e, t) {
var n = e.criteria, o = t.criteria;
return o > n ? -1 :n > o ? 1 :0;
}), "value");
}, M.groupBy = function(e, t) {
var n = {}, o = M.isFunction(t) ? t :function(e) {
return e[t];
};
return L(e, function(e, t) {
var i = o(e, t);
(n[i] || (n[i] = [])).push(e);
}), n;
}, M.sortedIndex = function(e, t, n) {
n || (n = M.identity);
for (var o = 0, i = e.length; i > o; ) {
var r = o + i >> 1;
n(e[r]) < n(t) ? o = r + 1 :i = r;
}
return o;
}, M.toArray = function(e) {
return e ? e.toArray ? e.toArray() :M.isArray(e) ? s.call(e) :M.isArguments(e) ? s.call(e) :M.values(e) :[];
}, M.size = function(e) {
return M.toArray(e).length;
}, M.first = M.head = function(e, t, n) {
return null == t || n ? e[0] :s.call(e, 0, t);
}, M.initial = function(e, t, n) {
return s.call(e, 0, e.length - (null == t || n ? 1 :t));
}, M.last = function(e, t, n) {
return null == t || n ? e[e.length - 1] :s.call(e, Math.max(e.length - t, 0));
}, M.rest = M.tail = function(e, t, n) {
return s.call(e, null == t || n ? 1 :t);
}, M.compact = function(e) {
return M.filter(e, function(e) {
return !!e;
});
}, M.flatten = function(e, t) {
return M.reduce(e, function(e, n) {
return M.isArray(n) ? e.concat(t ? n :M.flatten(n)) :(e[e.length] = n, e);
}, []);
}, M.without = function(e) {
return M.difference(e, s.call(arguments, 1));
}, M.uniq = M.unique = function(e, t, n) {
var o = n ? M.map(e, n) :e, i = [];
return M.reduce(o, function(n, o, r) {
return 0 != r && (t === !0 ? M.last(n) == o :M.include(n, o)) || (n[n.length] = o, 
i[i.length] = e[r]), n;
}, []), i;
}, M.union = function() {
return M.uniq(M.flatten(arguments, !0));
}, M.intersection = M.intersect = function(e) {
var t = s.call(arguments, 1);
return M.filter(M.uniq(e), function(e) {
return M.every(t, function(t) {
return M.indexOf(t, e) >= 0;
});
});
}, M.difference = function(e) {
var t = M.flatten(s.call(arguments, 1));
return M.filter(e, function(e) {
return !M.include(t, e);
});
}, M.zip = function() {
for (var e = s.call(arguments), t = M.max(M.pluck(e, "length")), n = new Array(t), o = 0; t > o; o++) n[o] = M.pluck(e, "" + o);
return n;
}, M.indexOf = function(e, t, n) {
if (null == e) return -1;
var o, i;
if (n) return o = M.sortedIndex(e, t), e[o] === t ? o :-1;
if (v && e.indexOf === v) return e.indexOf(t);
for (o = 0, i = e.length; i > o; o++) if (o in e && e[o] === t) return o;
return -1;
}, M.lastIndexOf = function(e, t) {
if (null == e) return -1;
if (w && e.lastIndexOf === w) return e.lastIndexOf(t);
for (var n = e.length; n--; ) if (n in e && e[n] === t) return n;
return -1;
}, M.range = function(e, t, n) {
arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
for (var o = Math.max(Math.ceil((t - e) / n), 0), i = 0, r = new Array(o); o > i; ) r[i++] = e, 
e += n;
return r;
};
var T = function() {};
M.bind = function(e, t) {
var n, o;
if (e.bind === k && k) return k.apply(e, s.call(arguments, 1));
if (!M.isFunction(e)) throw new TypeError();
return o = s.call(arguments, 2), n = function() {
if (!(this instanceof n)) return e.apply(t, o.concat(s.call(arguments)));
T.prototype = e.prototype;
var i = new T(), r = e.apply(i, o.concat(s.call(arguments)));
return Object(r) === r ? r :i;
};
}, M.bindAll = function(e) {
var t = s.call(arguments, 1);
return 0 == t.length && (t = M.functions(e)), L(t, function(t) {
e[t] = M.bind(e[t], e);
}), e;
}, M.memoize = function(e, t) {
var n = {};
return t || (t = M.identity), function() {
var o = t.apply(this, arguments);
return M.has(n, o) ? n[o] :n[o] = e.apply(this, arguments);
};
}, M.delay = function(e, t) {
var n = s.call(arguments, 2);
return setTimeout(function() {
return e.apply(e, n);
}, t);
}, M.defer = function(e) {
return M.delay.apply(M, [ e, 1 ].concat(s.call(arguments, 1)));
}, M.throttle = function(e, t) {
var n, o, i, r, a, s = M.debounce(function() {
a = r = !1;
}, t);
return function() {
n = this, o = arguments;
var l = function() {
i = null, a && e.apply(n, o), s();
};
i || (i = setTimeout(l, t)), r ? a = !0 :e.apply(n, o), s(), r = !0;
};
}, M.debounce = function(e, t) {
var n;
return function() {
var o = this, i = arguments, r = function() {
n = null, e.apply(o, i);
};
clearTimeout(n), n = setTimeout(r, t);
};
}, M.once = function(e) {
var t, n = !1;
return function() {
return n ? t :(n = !0, t = e.apply(this, arguments));
};
}, M.wrap = function(e, t) {
return function() {
var n = [ e ].concat(s.call(arguments, 0));
return t.apply(this, n);
};
}, M.compose = function() {
var e = arguments;
return function() {
for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [ e[n].apply(this, t) ];
return t[0];
};
}, M.after = function(e, t) {
return 0 >= e ? t() :function() {
return --e < 1 ? t.apply(this, arguments) :void 0;
};
}, M.keys = b || function(e) {
if (e !== Object(e)) throw new TypeError("Invalid object");
var t = [];
for (var n in e) M.has(e, n) && (t[t.length] = n);
return t;
}, M.values = function(e) {
return M.map(e, M.identity);
}, M.functions = M.methods = function(e) {
var t = [];
for (var n in e) M.isFunction(e[n]) && t.push(n);
return t.sort();
}, M.extend = function(e) {
return L(s.call(arguments, 1), function(t) {
for (var n in t) e[n] = t[n];
}), e;
}, M.defaults = function(e) {
return L(s.call(arguments, 1), function(t) {
for (var n in t) null == e[n] && (e[n] = t[n]);
}), e;
}, M.clone = function(e) {
return M.isObject(e) ? M.isArray(e) ? e.slice() :M.extend({}, e) :e;
}, M.tap = function(e, t) {
return t(e), e;
}, M.isEqual = function(t, n) {
return e(t, n, []);
}, M.isEmpty = function(e) {
if (M.isArray(e) || M.isString(e)) return 0 === e.length;
for (var t in e) if (M.has(e, t)) return !1;
return !0;
}, M.isElement = function(e) {
return !(!e || 1 != e.nodeType);
}, M.isArray = y || function(e) {
return "[object Array]" == u.call(e);
}, M.isObject = function(e) {
return e === Object(e);
}, M.isArguments = function(e) {
return "[object Arguments]" == u.call(e);
}, M.isArguments(arguments) || (M.isArguments = function(e) {
return !(!e || !M.has(e, "callee"));
}), M.isFunction = function(e) {
return "[object Function]" == u.call(e);
}, M.isString = function(e) {
return "[object String]" == u.call(e);
}, M.isNumber = function(e) {
return "[object Number]" == u.call(e);
}, M.isNaN = function(e) {
return e !== e;
}, M.isBoolean = function(e) {
return e === !0 || e === !1 || "[object Boolean]" == u.call(e);
}, M.isDate = function(e) {
return "[object Date]" == u.call(e);
}, M.isRegExp = function(e) {
return "[object RegExp]" == u.call(e);
}, M.isNull = function(e) {
return null === e;
}, M.isUndefined = function(e) {
return void 0 === e;
}, M.has = function(e, t) {
return c.call(e, t);
}, M.noConflict = function() {
return t._ = n, this;
}, M.identity = function(e) {
return e;
}, M.times = function(e, t, n) {
for (var o = 0; e > o; o++) t.call(n, o);
}, M.escape = function(e) {
return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, M.mixin = function(e) {
L(M.functions(e), function(t) {
I(t, M[t] = e[t]);
});
};
var x = 0;
M.uniqueId = function(e) {
var t = x++;
return e ? e + t :t;
}, M.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var D = /.^/, Y = function(e) {
return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
};
M.template = function(e, t) {
var n = M.templateSettings, o = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape || D, function(e, t) {
return "',_.escape(" + Y(t) + "),'";
}).replace(n.interpolate || D, function(e, t) {
return "'," + Y(t) + ",'";
}).replace(n.evaluate || D, function(e, t) {
return "');" + Y(t).replace(/[\r\n\t]/g, " ") + ";__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", i = new Function("obj", "_", o);
return t ? i(t, M) :function(e) {
return i.call(this, e, M);
};
}, M.chain = function(e) {
return M(e).chain();
};
var E = function(e) {
this._wrapped = e;
};
M.prototype = E.prototype;
var C = function(e, t) {
return t ? M(e).chain() :e;
}, I = function(e, t) {
E.prototype[e] = function() {
var e = s.call(arguments);
return l.call(e, this._wrapped), C(t.apply(M, e), this._chain);
};
};
M.mixin(M), L([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
var t = i[e];
E.prototype[e] = function() {
var n = this._wrapped;
t.apply(n, arguments);
var o = n.length;
return "shift" != e && "splice" != e || 0 !== o || delete n[0], C(n, this._chain);
};
}), L([ "concat", "join", "slice" ], function(e) {
var t = i[e];
E.prototype[e] = function() {
return C(t.apply(this._wrapped, arguments), this._chain);
};
}), E.prototype.chain = function() {
return this._chain = !0, this;
}, E.prototype.value = function() {
return this._wrapped;
};
}.call(this), /*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
function(e, t, n, o) {
"use strict";
var i = n("html"), r = n(e), a = n(t), s = n.fancybox = function() {
s.open.apply(this, arguments);
}, l = navigator.userAgent.match(/msie/i), u = null, c = t.createTouch !== o, d = function(e) {
return e && e.hasOwnProperty && e instanceof n;
}, h = function(e) {
return e && "string" === n.type(e);
}, p = function(e) {
return h(e) && e.indexOf("%") > 0;
}, g = function(e) {
return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight);
}, m = function(e, t) {
var n = parseInt(e, 10) || 0;
return t && p(e) && (n = s.getViewport()[t] / 100 * n), Math.ceil(n);
}, f = function(e, t) {
return m(e, t) + "px";
};
n.extend(s, {
version:"2.1.5",
defaults:{
padding:15,
margin:20,
width:800,
height:600,
minWidth:100,
minHeight:100,
maxWidth:9999,
maxHeight:9999,
pixelRatio:1,
autoSize:!0,
autoHeight:!1,
autoWidth:!1,
autoResize:!0,
autoCenter:!c,
fitToView:!0,
aspectRatio:!1,
topRatio:.5,
leftRatio:.5,
scrolling:"auto",
wrapCSS:"",
arrows:!0,
closeBtn:!0,
closeClick:!1,
nextClick:!1,
mouseWheel:!0,
autoPlay:!1,
playSpeed:3e3,
preload:3,
modal:!1,
loop:!0,
ajax:{
dataType:"html",
headers:{
"X-fancyBox":!0
}
},
iframe:{
scrolling:"auto",
preload:!0
},
swf:{
wmode:"transparent",
allowfullscreen:"true",
allowscriptaccess:"always"
},
keys:{
next:{
13:"left",
34:"up",
39:"left",
40:"up"
},
prev:{
8:"right",
33:"down",
37:"right",
38:"down"
},
close:[ 27 ],
play:[ 32 ],
toggle:[ 70 ]
},
direction:{
next:"left",
prev:"right"
},
scrollOutside:!0,
index:0,
type:null,
href:null,
content:null,
title:null,
tpl:{
wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
image:'<img class="fancybox-image" src="{href}" alt="" />',
iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' :"") + "></iframe>",
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
},
openEffect:"fade",
openSpeed:250,
openEasing:"swing",
openOpacity:!0,
openMethod:"zoomIn",
closeEffect:"fade",
closeSpeed:250,
closeEasing:"swing",
closeOpacity:!0,
closeMethod:"zoomOut",
nextEffect:"elastic",
nextSpeed:250,
nextEasing:"swing",
nextMethod:"changeIn",
prevEffect:"elastic",
prevSpeed:250,
prevEasing:"swing",
prevMethod:"changeOut",
helpers:{
overlay:!0,
title:!0
},
onCancel:n.noop,
beforeLoad:n.noop,
afterLoad:n.noop,
beforeShow:n.noop,
afterShow:n.noop,
beforeChange:n.noop,
beforeClose:n.noop,
afterClose:n.noop
},
group:{},
opts:{},
previous:null,
coming:null,
current:null,
isActive:!1,
isOpen:!1,
isOpened:!1,
wrap:null,
skin:null,
outer:null,
inner:null,
player:{
timer:null,
isActive:!1
},
ajaxLoad:null,
imgPreload:null,
transitions:{},
helpers:{},
open:function(e, t) {
return e && (n.isPlainObject(t) || (t = {}), !1 !== s.close(!0)) ? (n.isArray(e) || (e = d(e) ? n(e).get() :[ e ]), 
n.each(e, function(i, r) {
var a, l, u, c, p, g, m, f = {};
"object" === n.type(r) && (r.nodeType && (r = n(r)), d(r) ? (f = {
href:r.data("fancybox-href") || r.attr("href"),
title:r.data("fancybox-title") || r.attr("title"),
isDom:!0,
element:r
}, n.metadata && n.extend(!0, f, r.metadata())) :f = r), a = t.href || f.href || (h(r) ? r :null), 
l = t.title !== o ? t.title :f.title || "", u = t.content || f.content, c = u ? "html" :t.type || f.type, 
!c && f.isDom && (c = r.data("fancybox-type"), c || (p = r.prop("class").match(/fancybox\.(\w+)/), 
c = p ? p[1] :null)), h(a) && (c || (s.isImage(a) ? c = "image" :s.isSWF(a) ? c = "swf" :"#" === a.charAt(0) ? c = "inline" :h(r) && (c = "html", 
u = r)), "ajax" === c && (g = a.split(/\s+/, 2), a = g.shift(), m = g.shift())), 
u || ("inline" === c ? a ? u = n(h(a) ? a.replace(/.*(?=#[^\s]+$)/, "") :a) :f.isDom && (u = r) :"html" === c ? u = a :c || a || !f.isDom || (c = "inline", 
u = r)), n.extend(f, {
href:a,
type:c,
content:u,
title:l,
selector:m
}), e[i] = f;
}), s.opts = n.extend(!0, {}, s.defaults, t), t.keys !== o && (s.opts.keys = t.keys ? n.extend({}, s.defaults.keys, t.keys) :!1), 
s.group = e, s._start(s.opts.index)) :void 0;
},
cancel:function() {
var e = s.coming;
e && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), 
s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), 
e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(e));
},
close:function(e) {
s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && e !== !0 ? (s.isOpen = s.isOpened = !1, 
s.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), 
s.transitions[s.current.closeMethod]()) :(n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), 
s._afterZoomOut())));
},
play:function(e) {
var t = function() {
clearTimeout(s.player.timer);
}, n = function() {
t(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed));
}, o = function() {
t(), a.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd");
}, i = function() {
s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, 
a.bind({
"onCancel.player beforeClose.player":o,
"onUpdate.player":n,
"beforeLoad.player":t
}), n(), s.trigger("onPlayStart"));
};
e === !0 || !s.player.isActive && e !== !1 ? i() :o();
},
next:function(e) {
var t = s.current;
t && (h(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"));
},
prev:function(e) {
var t = s.current;
t && (h(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"));
},
jumpto:function(e, t, n) {
var i = s.current;
i && (e = m(e), s.direction = t || i.direction[e >= i.index ? "next" :"prev"], s.router = n || "jumpto", 
i.loop && (0 > e && (e = i.group.length + e % i.group.length), e %= i.group.length), 
i.group[e] !== o && (s.cancel(), s._start(e)));
},
reposition:function(e, t) {
var o, i = s.current, r = i ? i.wrap :null;
r && (o = s._getPosition(t), e && "scroll" === e.type ? (delete o.position, r.stop(!0, !0).animate(o, 200)) :(r.css(o), 
i.pos = n.extend({}, i.dim, o)));
},
update:function(e) {
var t = e && e.type, n = !t || "orientationchange" === t;
n && (clearTimeout(u), u = null), s.isOpen && !u && (u = setTimeout(function() {
var o = s.current;
o && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (n || "load" === t || "resize" === t && o.autoResize) && s._setDimension(), 
"scroll" === t && o.canShrink || s.reposition(e), s.trigger("onUpdate"), u = null);
}, n && !c ? 0 :300));
},
toggle:function(e) {
s.isOpen && (s.current.fitToView = "boolean" === n.type(e) ? e :!s.current.fitToView, 
c && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), 
s.update());
},
hideLoading:function() {
a.unbind(".loading"), n("#fancybox-loading").remove();
},
showLoading:function() {
var e, t;
s.hideLoading(), e = n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), 
a.bind("keydown.loading", function(e) {
27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel());
}), s.defaults.fixed || (t = s.getViewport(), e.css({
position:"absolute",
top:.5 * t.h + t.y,
left:.5 * t.w + t.x
}));
},
getViewport:function() {
var t = s.current && s.current.locked || !1, n = {
x:r.scrollLeft(),
y:r.scrollTop()
};
return t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) :(n.w = c && e.innerWidth ? e.innerWidth :r.width(), 
n.h = c && e.innerHeight ? e.innerHeight :r.height()), n;
},
unbindEvents:function() {
s.wrap && d(s.wrap) && s.wrap.unbind(".fb"), a.unbind(".fb"), r.unbind(".fb");
},
bindEvents:function() {
var e, t = s.current;
t && (r.bind("orientationchange.fb" + (c ? "" :" resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" :""), s.update), 
e = t.keys, e && a.bind("keydown.fb", function(i) {
var r = i.which || i.keyCode, a = i.target || i.srcElement;
return 27 === r && s.coming ? !1 :(i.ctrlKey || i.altKey || i.shiftKey || i.metaKey || a && (a.type || n(a).is("[contenteditable]")) || n.each(e, function(e, a) {
return t.group.length > 1 && a[r] !== o ? (s[e](a[r]), i.preventDefault(), !1) :n.inArray(r, a) > -1 ? (s[e](), 
i.preventDefault(), !1) :void 0;
}), void 0);
}), n.fn.mousewheel && t.mouseWheel && s.wrap.bind("mousewheel.fb", function(e, o, i, r) {
for (var a = e.target || null, l = n(a), u = !1; l.length && !(u || l.is(".fancybox-skin") || l.is(".fancybox-wrap")); ) u = g(l[0]), 
l = n(l).parent();
0 === o || u || s.group.length > 1 && !t.canShrink && (r > 0 || i > 0 ? s.prev(r > 0 ? "down" :"left") :(0 > r || 0 > i) && s.next(0 > r ? "up" :"right"), 
e.preventDefault());
}));
},
trigger:function(e, t) {
var o, i = t || s.coming || s.current;
if (i) {
if (n.isFunction(i[e]) && (o = i[e].apply(i, Array.prototype.slice.call(arguments, 1))), 
o === !1) return !1;
i.helpers && n.each(i.helpers, function(t, o) {
o && s.helpers[t] && n.isFunction(s.helpers[t][e]) && s.helpers[t][e](n.extend(!0, {}, s.helpers[t].defaults, o), i);
}), a.trigger(e);
}
},
isImage:function(e) {
return h(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
},
isSWF:function(e) {
return h(e) && e.match(/\.(swf)((\?|#).*)?$/i);
},
_start:function(e) {
var t, o, i, r, a, l = {};
if (e = m(e), t = s.group[e] || null, !t) return !1;
if (l = n.extend(!0, {}, s.opts, t), r = l.margin, a = l.padding, "number" === n.type(r) && (l.margin = [ r, r, r, r ]), 
"number" === n.type(a) && (l.padding = [ a, a, a, a ]), l.modal && n.extend(!0, l, {
closeBtn:!1,
closeClick:!1,
nextClick:!1,
arrows:!1,
mouseWheel:!1,
keys:null,
helpers:{
overlay:{
closeClick:!1
}
}
}), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), 
"auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = e, s.coming = l, 
!1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
if (i = l.type, o = l.href, !i) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = e, 
s[s.router](s.direction)) :!1;
if (s.isActive = !0, ("image" === i || "swf" === i) && (l.autoHeight = l.autoWidth = !1, 
l.scrolling = "visible"), "image" === i && (l.aspectRatio = !0), "iframe" === i && c && (l.scrolling = "scroll"), 
l.wrap = n(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" :"desktop") + " fancybox-type-" + i + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), 
n.extend(l, {
skin:n(".fancybox-skin", l.wrap),
outer:n(".fancybox-outer", l.wrap),
inner:n(".fancybox-inner", l.wrap)
}), n.each([ "Top", "Right", "Bottom", "Left" ], function(e, t) {
l.skin.css("padding" + t, f(l.padding[e]));
}), s.trigger("onReady"), "inline" === i || "html" === i) {
if (!l.content || !l.content.length) return s._error("content");
} else if (!o) return s._error("href");
"image" === i ? s._loadImage() :"ajax" === i ? s._loadAjax() :"iframe" === i ? s._loadIframe() :s._afterLoad();
},
_error:function(e) {
n.extend(s.coming, {
type:"html",
autoWidth:!0,
autoHeight:!0,
minWidth:0,
minHeight:0,
scrolling:"no",
hasError:e,
content:s.coming.tpl.error
}), s._afterLoad();
},
_loadImage:function() {
var e = s.imgPreload = new Image();
e.onload = function() {
this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio, 
s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad();
}, e.onerror = function() {
this.onload = this.onerror = null, s._error("image");
}, e.src = s.coming.href, e.complete !== !0 && s.showLoading();
},
_loadAjax:function() {
var e = s.coming;
s.showLoading(), s.ajaxLoad = n.ajax(n.extend({}, e.ajax, {
url:e.href,
error:function(e, t) {
s.coming && "abort" !== t ? s._error("ajax", e) :s.hideLoading();
},
success:function(t, n) {
"success" === n && (e.content = t, s._afterLoad());
}
}));
},
_loadIframe:function() {
var e = s.coming, t = n(e.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", c ? "auto" :e.iframe.scrolling).attr("src", e.href);
n(e.wrap).bind("onReset", function() {
try {
n(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
} catch (e) {}
}), e.iframe.preload && (s.showLoading(), t.one("load", function() {
n(this).data("ready", 1), c || n(this).bind("load.fb", s.update), n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), 
s._afterLoad();
})), e.content = t.appendTo(e.inner), e.iframe.preload || s._afterLoad();
},
_preloadImages:function() {
var e, t, n = s.group, o = s.current, i = n.length, r = o.preload ? Math.min(o.preload, i - 1) :0;
for (t = 1; r >= t; t += 1) e = n[(o.index + t) % i], "image" === e.type && e.href && (new Image().src = e.href);
},
_afterLoad:function() {
var e, t, o, i, r, a, l = s.coming, u = s.current, c = "fancybox-placeholder";
if (s.hideLoading(), l && s.isActive !== !1) {
if (!1 === s.trigger("afterLoad", l, u)) return l.wrap.stop(!0).trigger("onReset").remove(), 
s.coming = null, void 0;
switch (u && (s.trigger("beforeChange", u), u.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), 
s.unbindEvents(), e = l, t = l.content, o = l.type, i = l.scrolling, n.extend(s, {
wrap:e.wrap,
skin:e.skin,
outer:e.outer,
inner:e.inner,
current:e,
previous:u
}), r = e.href, o) {
case "inline":
case "ajax":
case "html":
e.selector ? t = n("<div>").html(t).find(e.selector) :d(t) && (t.data(c) || t.data(c, n('<div class="' + c + '"></div>').insertAfter(t).hide()), 
t = t.show().detach(), e.wrap.bind("onReset", function() {
n(this).find(t).length && t.hide().replaceAll(t.data(c)).data(c, !1);
}));
break;

case "image":
t = e.tpl.image.replace("{href}", r);
break;

case "swf":
t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + r + '"></param>', 
a = "", n.each(e.swf, function(e, n) {
t += '<param name="' + e + '" value="' + n + '"></param>', a += " " + e + '="' + n + '"';
}), t += '<embed src="' + r + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>";
}
d(t) && t.parent().is(e.inner) || e.inner.append(t), s.trigger("beforeShow"), e.inner.css("overflow", "yes" === i ? "scroll" :"no" === i ? "hidden" :i), 
s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), 
s.isOpened ? u.prevMethod && s.transitions[u.prevMethod]() :n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), 
s.transitions[s.isOpened ? e.nextMethod :e.openMethod](), s._preloadImages();
}
},
_setDimension:function() {
var e, t, o, i, r, a, l, u, c, d, h, g, _, v, w, y = s.getViewport(), b = 0, k = !1, M = !1, L = s.wrap, S = s.skin, T = s.inner, x = s.current, D = x.width, Y = x.height, E = x.minWidth, C = x.minHeight, I = x.maxWidth, O = x.maxHeight, $ = x.scrolling, B = x.scrollOutside ? x.scrollbarWidth :0, H = x.margin, A = m(H[1] + H[3]), j = m(H[0] + H[2]);
if (L.add(S).add(T).width("auto").height("auto").removeClass("fancybox-tmp"), e = m(S.outerWidth(!0) - S.width()), 
t = m(S.outerHeight(!0) - S.height()), o = A + e, i = j + t, r = p(D) ? (y.w - o) * m(D) / 100 :D, 
a = p(Y) ? (y.h - i) * m(Y) / 100 :Y, "iframe" === x.type) {
if (v = x.content, x.autoHeight && 1 === v.data("ready")) try {
v[0].contentWindow.document.location && (T.width(r).height(9999), w = v.contents().find("body"), 
B && w.css("overflow-x", "hidden"), a = w.outerHeight(!0));
} catch (N) {}
} else (x.autoWidth || x.autoHeight) && (T.addClass("fancybox-tmp"), x.autoWidth || T.width(r), 
x.autoHeight || T.height(a), x.autoWidth && (r = T.width()), x.autoHeight && (a = T.height()), 
T.removeClass("fancybox-tmp"));
if (D = m(r), Y = m(a), c = r / a, E = m(p(E) ? m(E, "w") - o :E), I = m(p(I) ? m(I, "w") - o :I), 
C = m(p(C) ? m(C, "h") - i :C), O = m(p(O) ? m(O, "h") - i :O), l = I, u = O, x.fitToView && (I = Math.min(y.w - o, I), 
O = Math.min(y.h - i, O)), g = y.w - A, _ = y.h - j, x.aspectRatio ? (D > I && (D = I, 
Y = m(D / c)), Y > O && (Y = O, D = m(Y * c)), E > D && (D = E, Y = m(D / c)), C > Y && (Y = C, 
D = m(Y * c))) :(D = Math.max(E, Math.min(D, I)), x.autoHeight && "iframe" !== x.type && (T.width(D), 
Y = T.height()), Y = Math.max(C, Math.min(Y, O))), x.fitToView) if (T.width(D).height(Y), 
L.width(D + e), d = L.width(), h = L.height(), x.aspectRatio) for (;(d > g || h > _) && D > E && Y > C && !(b++ > 19); ) Y = Math.max(C, Math.min(O, Y - 10)), 
D = m(Y * c), E > D && (D = E, Y = m(D / c)), D > I && (D = I, Y = m(D / c)), T.width(D).height(Y), 
L.width(D + e), d = L.width(), h = L.height(); else D = Math.max(E, Math.min(D, D - (d - g))), 
Y = Math.max(C, Math.min(Y, Y - (h - _)));
B && "auto" === $ && a > Y && g > D + e + B && (D += B), T.width(D).height(Y), L.width(D + e), 
d = L.width(), h = L.height(), k = (d > g || h > _) && D > E && Y > C, M = x.aspectRatio ? l > D && u > Y && r > D && a > Y :(l > D || u > Y) && (r > D || a > Y), 
n.extend(x, {
dim:{
width:f(d),
height:f(h)
},
origWidth:r,
origHeight:a,
canShrink:k,
canExpand:M,
wPadding:e,
hPadding:t,
wrapSpace:h - S.outerHeight(!0),
skinSpace:S.height() - Y
}), !v && x.autoHeight && Y > C && O > Y && !M && T.height("auto");
},
_getPosition:function(e) {
var t = s.current, n = s.getViewport(), o = t.margin, i = s.wrap.width() + o[1] + o[3], r = s.wrap.height() + o[0] + o[2], a = {
position:"absolute",
top:o[0],
left:o[3]
};
return t.autoCenter && t.fixed && !e && r <= n.h && i <= n.w ? a.position = "fixed" :t.locked || (a.top += n.y, 
a.left += n.x), a.top = f(Math.max(a.top, a.top + (n.h - r) * t.topRatio)), a.left = f(Math.max(a.left, a.left + (n.w - i) * t.leftRatio)), 
a;
},
_afterZoomIn:function() {
var e = s.current;
e && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), 
s.update(), (e.closeClick || e.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function(t) {
n(t.target).is("a") || n(t.target).parent().is("a") || (t.preventDefault(), s[e.closeClick ? "close" :"next"]());
}), e.closeBtn && n(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(e) {
e.preventDefault(), s.close();
}), e.arrows && s.group.length > 1 && ((e.loop || e.index > 0) && n(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), 
(e.loop || e.index < s.group.length - 1) && n(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), 
s.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, 
s.play()) :s.play(!1));
},
_afterZoomOut:function(e) {
e = e || s.current, n(".fancybox-wrap").trigger("onReset").remove(), n.extend(s, {
group:{},
opts:{},
router:!1,
current:null,
isActive:!1,
isOpened:!1,
isOpen:!1,
isClosing:!1,
wrap:null,
skin:null,
outer:null,
inner:null
}), s.trigger("afterClose", e);
}
}), s.transitions = {
getOrigPosition:function() {
var e = s.current, t = e.element, n = e.orig, o = {}, i = 50, r = 50, a = e.hPadding, l = e.wPadding, u = s.getViewport();
return !n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t)), 
d(n) ? (o = n.offset(), n.is("img") && (i = n.outerWidth(), r = n.outerHeight())) :(o.top = u.y + (u.h - r) * e.topRatio, 
o.left = u.x + (u.w - i) * e.leftRatio), ("fixed" === s.wrap.css("position") || e.locked) && (o.top -= u.y, 
o.left -= u.x), o = {
top:f(o.top - a * e.topRatio),
left:f(o.left - l * e.leftRatio),
width:f(i + l),
height:f(r + a)
};
},
step:function(e, t) {
var n, o, i, r = t.prop, a = s.current, l = a.wrapSpace, u = a.skinSpace;
("width" === r || "height" === r) && (n = t.end === t.start ? 1 :(e - t.start) / (t.end - t.start), 
s.isClosing && (n = 1 - n), o = "width" === r ? a.wPadding :a.hPadding, i = e - o, 
s.skin[r](m("width" === r ? i :i - l * n)), s.inner[r](m("width" === r ? i :i - l * n - u * n)));
},
zoomIn:function() {
var e = s.current, t = e.pos, o = e.openEffect, i = "elastic" === o, r = n.extend({
opacity:1
}, t);
delete r.position, i ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) :"fade" === o && (t.opacity = .1), 
s.wrap.css(t).animate(r, {
duration:"none" === o ? 0 :e.openSpeed,
easing:e.openEasing,
step:i ? this.step :null,
complete:s._afterZoomIn
});
},
zoomOut:function() {
var e = s.current, t = e.closeEffect, n = "elastic" === t, o = {
opacity:.1
};
n && (o = this.getOrigPosition(), e.closeOpacity && (o.opacity = .1)), s.wrap.animate(o, {
duration:"none" === t ? 0 :e.closeSpeed,
easing:e.closeEasing,
step:n ? this.step :null,
complete:s._afterZoomOut
});
},
changeIn:function() {
var e, t = s.current, n = t.nextEffect, o = t.pos, i = {
opacity:1
}, r = s.direction, a = 200;
o.opacity = .1, "elastic" === n && (e = "down" === r || "up" === r ? "top" :"left", 
"down" === r || "right" === r ? (o[e] = f(m(o[e]) - a), i[e] = "+=" + a + "px") :(o[e] = f(m(o[e]) + a), 
i[e] = "-=" + a + "px")), "none" === n ? s._afterZoomIn() :s.wrap.css(o).animate(i, {
duration:t.nextSpeed,
easing:t.nextEasing,
complete:s._afterZoomIn
});
},
changeOut:function() {
var e = s.previous, t = e.prevEffect, o = {
opacity:.1
}, i = s.direction, r = 200;
"elastic" === t && (o["down" === i || "up" === i ? "top" :"left"] = ("up" === i || "left" === i ? "-" :"+") + "=" + r + "px"), 
e.wrap.animate(o, {
duration:"none" === t ? 0 :e.prevSpeed,
easing:e.prevEasing,
complete:function() {
n(this).trigger("onReset").remove();
}
});
}
}, s.helpers.overlay = {
defaults:{
closeClick:!0,
speedOut:200,
showEarly:!0,
css:{},
locked:!c,
fixed:!0
},
overlay:null,
fixed:!1,
el:n("html"),
create:function(e) {
e = n.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = n('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent :e.parent), 
this.fixed = !1, e.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), 
this.fixed = !0);
},
open:function(e) {
var t = this;
e = n.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") :this.create(e), 
this.fixed || (r.bind("resize.overlay", n.proxy(this.update, this)), this.update()), 
e.closeClick && this.overlay.bind("click.overlay", function(e) {
return n(e.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() :t.close(), 
!1) :void 0;
}), this.overlay.css(e.css).show();
},
close:function() {
var e, t;
r.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (n(".fancybox-margin").removeClass("fancybox-margin"), 
e = r.scrollTop(), t = r.scrollLeft(), this.el.removeClass("fancybox-lock"), r.scrollTop(e).scrollLeft(t)), 
n(".fancybox-overlay").remove().hide(), n.extend(this, {
overlay:null,
fixed:!1
});
},
update:function() {
var e, n = "100%";
this.overlay.width(n).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), 
a.width() > e && (n = a.width())) :a.width() > r.width() && (n = a.width()), this.overlay.width(n).height(a.height());
},
onReady:function(e, t) {
var o = this.overlay;
n(".fancybox-overlay").stop(!0, !0), o || this.create(e), e.locked && this.fixed && t.fixed && (o || (this.margin = a.height() > r.height() ? n("html").css("margin-right").replace("px", "") :!1), 
t.locked = this.overlay.append(t.wrap), t.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments);
},
beforeShow:function(e, t) {
var o, i;
t.locked && (this.margin !== !1 && (n("*").filter(function() {
return "fixed" === n(this).css("position") && !n(this).hasClass("fancybox-overlay") && !n(this).hasClass("fancybox-wrap");
}).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), o = r.scrollTop(), 
i = r.scrollLeft(), this.el.addClass("fancybox-lock"), r.scrollTop(o).scrollLeft(i)), 
this.open(e);
},
onUpdate:function() {
this.fixed || this.update();
},
afterClose:function(e) {
this.overlay && !s.coming && this.overlay.fadeOut(e.speedOut, n.proxy(this.close, this));
}
}, s.helpers.title = {
defaults:{
type:"float",
position:"bottom"
},
beforeShow:function(e) {
var t, o, i = s.current, r = i.title, a = e.type;
if (n.isFunction(r) && (r = r.call(i.element, i)), h(r) && "" !== n.trim(r)) {
switch (t = n('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + r + "</div>"), 
a) {
case "inside":
o = s.skin;
break;

case "outside":
o = s.wrap;
break;

case "over":
o = s.inner;
break;

default:
o = s.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), 
s.current.margin[2] += Math.abs(m(t.css("margin-bottom")));
}
t["top" === e.position ? "prependTo" :"appendTo"](o);
}
}
}, n.fn.fancybox = function(e) {
var t, o = n(this), i = this.selector || "", r = function(r) {
var a, l, u = n(this).blur(), c = t;
r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || u.is(".fancybox-wrap") || (a = e.groupAttr || "data-fancybox-group", 
l = u.attr(a), l || (a = "rel", l = u.get(0)[a]), l && "" !== l && "nofollow" !== l && (u = i.length ? n(i) :o, 
u = u.filter("[" + a + '="' + l + '"]'), c = u.index(this)), e.index = c, s.open(u, e) !== !1 && r.preventDefault());
};
return e = e || {}, t = e.index || 0, i && e.live !== !1 ? a.undelegate(i, "click.fb-start").delegate(i + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", r) :o.unbind("click.fb-start").bind("click.fb-start", r), 
this.filter("[data-fancybox-start=1]").trigger("click"), this;
}, a.ready(function() {
var t, r;
n.scrollbarWidth === o && (n.scrollbarWidth = function() {
var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), t = e.children(), o = t.innerWidth() - t.height(99).innerWidth();
return e.remove(), o;
}), n.support.fixedPosition === o && (n.support.fixedPosition = function() {
var e = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"), t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
return e.remove(), t;
}()), n.extend(s.defaults, {
scrollbarWidth:n.scrollbarWidth(),
fixed:n.support.fixedPosition,
parent:n("body")
}), t = n(e).width(), i.addClass("fancybox-lock-test"), r = n(e).width(), i.removeClass("fancybox-lock-test"), 
n("<style type='text/css'>.fancybox-margin{margin-right:" + (r - t) + "px;}</style>").appendTo("head");
});
}(window, document, jQuery), function(e) {
var t = e.fancybox;
t.helpers.buttons = {
defaults:{
skipSingle:!1,
position:"top",
tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
},
list:null,
buttons:null,
beforeLoad:function(e, t) {
return e.skipSingle && t.group.length < 2 ? (t.helpers.buttons = !1, t.closeBtn = !0, 
void 0) :(t.margin["bottom" === e.position ? 2 :0] += 30, void 0);
},
onPlayStart:function() {
this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn");
},
onPlayEnd:function() {
this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn");
},
afterShow:function(n, o) {
var i = this.buttons;
i || (this.list = e(n.tpl).addClass(n.position).appendTo("body"), i = {
prev:this.list.find(".btnPrev").click(t.prev),
next:this.list.find(".btnNext").click(t.next),
play:this.list.find(".btnPlay").click(t.play),
toggle:this.list.find(".btnToggle").click(t.toggle),
close:this.list.find(".btnClose").click(t.close)
}), o.index > 0 || o.loop ? i.prev.removeClass("btnDisabled") :i.prev.addClass("btnDisabled"), 
o.loop || o.index < o.group.length - 1 ? (i.next.removeClass("btnDisabled"), i.play.removeClass("btnDisabled")) :(i.next.addClass("btnDisabled"), 
i.play.addClass("btnDisabled")), this.buttons = i, this.onUpdate(n, o);
},
onUpdate:function(e, t) {
var n;
this.buttons && (n = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"), 
t.canShrink ? n.addClass("btnToggleOn") :t.canExpand || n.addClass("btnDisabled"));
},
beforeClose:function() {
this.list && this.list.remove(), this.list = null, this.buttons = null;
}
};
}(jQuery), function(e) {
var t = e.fancybox;
t.helpers.thumbs = {
defaults:{
width:50,
height:50,
position:"bottom",
source:function(t) {
var n;
return t.element && (n = e(t.element).find("img").attr("src")), !n && "image" === t.type && t.href && (n = t.href), 
n;
}
},
wrap:null,
list:null,
width:0,
init:function(t, n) {
var o, i = this, r = t.width, a = t.height, s = t.source;
o = "";
for (var l = 0; l < n.group.length; l++) o += '<li><a style="width:' + r + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
this.wrap = e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"), 
this.list = e("<ul>" + o + "</ul>").appendTo(this.wrap), e.each(n.group, function(t) {
var o = s(n.group[t]);
o && e("<img />").load(function() {
var n, o, s, l = this.width, u = this.height;
i.list && l && u && (n = l / r, o = u / a, s = i.list.children().eq(t).find("a"), 
n >= 1 && o >= 1 && (n > o ? (l = Math.floor(l / o), u = a) :(l = r, u = Math.floor(u / n))), 
e(this).css({
width:l,
height:u,
top:Math.floor(a / 2 - u / 2),
left:Math.floor(r / 2 - l / 2)
}), s.width(r).height(a), e(this).hide().appendTo(s).fadeIn(300));
}).attr("src", o);
}), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (n.group.length + 1)).css("left", Math.floor(.5 * e(window).width() - (n.index * this.width + .5 * this.width)));
},
beforeLoad:function(e, t) {
return t.group.length < 2 ? (t.helpers.thumbs = !1, void 0) :(t.margin["top" === e.position ? 0 :2] += e.height + 15, 
void 0);
},
afterShow:function(e, t) {
this.list ? this.onUpdate(e, t) :this.init(e, t), this.list.children().removeClass("active").eq(t.index).addClass("active");
},
onUpdate:function(t, n) {
this.list && this.list.stop(!0).animate({
left:Math.floor(.5 * e(window).width() - (n.index * this.width + .5 * this.width))
}, 150);
},
beforeClose:function() {
this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0;
}
};
}(jQuery), function(e) {
"use strict";
var t = e.fancybox, n = function(t, n, o) {
return o = o || "", "object" === e.type(o) && (o = e.param(o, !0)), e.each(n, function(e, n) {
t = t.replace("$" + e, n || "");
}), o.length && (t += (t.indexOf("?") > 0 ? "&" :"?") + o), t;
};
t.helpers.media = {
defaults:{
youtube:{
matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
params:{
autoplay:1,
autohide:1,
fs:1,
rel:0,
hd:1,
wmode:"opaque",
enablejsapi:1
},
type:"iframe",
url:"//www.youtube.com/embed/$3"
},
vimeo:{
matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
params:{
autoplay:1,
hd:1,
show_title:1,
show_byline:1,
show_portrait:0,
fullscreen:1
},
type:"iframe",
url:"//player.vimeo.com/video/$1"
},
metacafe:{
matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
params:{
autoPlay:"yes"
},
type:"swf",
url:function(t, n, o) {
return o.swf.flashVars = "playerVars=" + e.param(n, !0), "//www.metacafe.com/fplayer/" + t[1] + "/.swf";
}
},
dailymotion:{
matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,
params:{
additionalInfos:0,
autoStart:1
},
type:"swf",
url:"//www.dailymotion.com/swf/video/$1"
},
twitvid:{
matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
params:{
autoplay:0
},
type:"iframe",
url:"//www.twitvid.com/embed.php?guid=$1"
},
twitpic:{
matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
type:"image",
url:"//twitpic.com/show/full/$1/"
},
instagram:{
matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
type:"image",
url:"//$1/p/$2/media/?size=l"
},
google_maps:{
matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
type:"iframe",
url:function(e) {
return "//maps.google." + e[1] + "/" + e[3] + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed" :"embed");
}
}
},
beforeLoad:function(t, o) {
var i, r, a, s, l = o.href || "", u = !1;
for (i in t) if (t.hasOwnProperty(i) && (r = t[i], a = l.match(r.matcher))) {
u = r.type, s = e.extend(!0, {}, r.params, o[i] || (e.isPlainObject(t[i]) ? t[i].params :null)), 
l = "function" === e.type(r.url) ? r.url.call(this, a, s, o) :n(r.url, a, s);
break;
}
u && (o.href = l, o.type = u, o.autoHeight = !1);
}
};
}(jQuery), function() {
"undefined" != typeof _ && null !== _ && (_.templateSettings = {
evaluate:/\{\{(.+?)\}\}/g,
interpolate:/\{\{=(.+?)\}\}/g
}), "undefined" != typeof $ && null !== $ && ($.support.cors = !0), $B.Singleton || ($B.Singleton = {});
}.call(this), function() {
var e, t, n, o, i = [].slice, r = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, a = {}.hasOwnProperty, s = function(e, t) {
function n() {
this.constructor = e;
}
for (var o in t) a.call(t, o) && (e[o] = t[o]);
return n.prototype = t.prototype, e.prototype = new n(), e.__super__ = t.prototype, 
e;
}, l = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
String.prototype.toSlug = function() {
var e;
return e = this.replace(/[^\u0020-\u007e]/g, ""), e = e.replace(/["'`]/g, ""), e = e.replace(/@/g, " at "), 
e = e.replace(/&/g, " and "), e = e.replace(/\W+/g, " "), e = e.replace(/_/g, " "), 
e = e.trim(), e = e.replace(/\s+/g, "-"), e = e.toLowerCase();
}, String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), $(function() {
return $(document).on("click", ".open-support-popup", function(e) {
return UserVoice ? (e.preventDefault(), UserVoice.push([ "show", {
mode:"contact"
} ]), null != window.edit_page ? $B.AE.track("Click Uservoice Button - Editor v1") :$B.AE.track("Click Uservoice Button - Dashboard v1")) :void 0;
});
}), $B.trackingAlias = function(e) {
var t;
return t = !!$.cookie("__strk_aliased"), 1 !== $S.user_meta.sign_in_count || t ? void 0 :(analytics.alias(e), 
$.cookie("__strk_aliased", "1", {
expires:30,
path:"/"
}));
}, $B.store = {
enabled:!0,
set:function(e, t, n) {
var o;
if (null != window.store && this.enabled) return o = {
val:t
}, n && (o.exp = n, o.time = new Date().getTime()), window.store.set(e, o);
},
setHours:function(e, t, n) {
return this.set(e, t, Math.floor(36e5 * n));
},
get:function(e) {
var t;
return null != window.store && this.enabled ? (t = window.store.get(e), t ? t.exp && t.time && new Date().getTime() - t.time > t.exp ? null :t.val :null) :null;
},
clear:function() {
var e;
return null != (e = window.store) ? e.clear() :void 0;
},
remove:function(e) {
var t;
return null != (t = window.store) ? t.remove(e) :void 0;
}
}, $B.isStatic = function() {
return "yes" === $("html").attr("static");
}, $B.isHeadlessRendering = function() {
return $S.conf.headless_render && !$B.isStatic();
}, $B.toVal = function(e) {
return "function" == typeof e ? e() :e;
}, $B.topInWindow = function(e) {
return $(e).offset().top - $(window).scrollTop();
}, $B.checkAll = function() {
var e, t, n, o, r;
for (n = arguments[0], t = 2 <= arguments.length ? i.call(arguments, 1) :[], o = 0, 
r = t.length; r > o; o++) if (e = t[o], e !== n) return !1;
return !0;
}, $B.Cookie = function() {
function e(e) {
this.options = null != e ? e :{}, this.set = r(this.set, this), this.get = r(this.get, this);
}
return e.prototype.get = function(e) {
return $.cookie("__" + this.options.scope + "_" + e);
}, e.prototype.set = function(e, t, n) {
return null == n && (n = {
expires:1,
path:"/"
}), $.cookie("__" + this.options.scope + "_" + e, t, n);
}, e;
}(), $B.dialog = function(e) {
var t, n;
return n = $.Deferred(), 0 === $("#sdialog").length && $("body").append('      <div id="sdialog" style="opacity: 0; position: relative; z-index: 99999">        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0; background: #000; opacity: .6;">        </div>        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0;">          <div class="white-modal" style="display: block; height: auto;">            <div id="sdialog-content" class="modal-container" style="height: auto; box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.7);">              <!--text-->            </div>          </div>        </div>      </div>      '), 
$("#sdialog > div").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown"), 
n.reject();
}, 100);
}), $("#sdialog-content").unbind("click").bind("click", function(e) {
return e.stopPropagation();
}), $("#sdialog").show().animate({
opacity:"1"
}, {
easing:"easeInOutQuart",
duration:200
}), t = $("#sdialog-content").html(e).css("opacity", 0), setTimeout(function() {
return t.addClass("easeUp"), setTimeout(function() {
return t.css("opacity", 1);
}, 200);
}, 100), n;
}, $.fn.doIf = function(e, t) {
return t($(this)) ? e($(this)) :void 0;
}, $B.customAlert = function(e, t, n) {
var o, i, r;
return i = "", null != n && (i = "      <button class='s-btn cancel gray'>" + n + "</button>"), 
o = "", null != t && (o = "      <div class='bottom-actions'>        " + i + "        <button class='s-btn confirm'>" + t + "</button>      </div>    "), 
r = $B.dialog("    <div class='strikingly-custom-alert'>      <i class='fa fa-exclamation-triangle'></i>      <i class='close'>&times;</i>      <div class='alert-content'>      " + e + "      </div>      " + o + "    <div>"), 
$(".strikingly-custom-alert .confirm").unbind("click").bind("click", function() {
return $("#sdialog-content").addClass("easeDown"), setTimeout(function() {
return $("#sdialog").hide(), $("#sdialog-content").removeClass("easeUp easeDown");
}, 100), r.resolve();
}), $(".strikingly-custom-alert .close, .strikingly-custom-alert .cancel").unbind("click").bind("click", function() {
return $("#sdialog > div").trigger("click");
}), r;
}, $B.getParentWindow = function(e) {
var t;
return t = e.defaultView || e.parentWindow, t.parent;
}, $B.getFrameForDocument = function(e) {
var t, n, o, i;
for (o = $B.getParentWindow(e).document.getElementsByTagName("iframe"), i = o.length; i-- > 0; ) {
n = o[i];
try {
if (t = n.contentDocument || n.contentWindow.document, t === e) return n;
} catch (r) {}
}
}, $B.log = function() {
var e;
return e = "true" === $B.store.get("strikinglyLogger") || $B.log.enabledFlag, $B.log.enabled() ? "undefined" != typeof console && null !== console ? "function" == typeof console.log ? console.log(Array.prototype.slice.call(arguments)) :void 0 :void 0 :void 0;
}, $B.log.enabled = function() {
var e, t, n;
return t = "true" === $B.store.get("strikinglyLogger"), e = "true" === ("function" == typeof (n = $("meta[name=a-minimum]")).attr ? n.attr("content") :void 0), 
t || e || -1 !== window.location.toString().indexOf(":3000");
}, $B.log.enable = function() {
return $B.store.set("strikinglyLogger", "true"), $B.log.enabledFlag = !0, console.log("Bobcat logger enabled!");
}, $B.log.disable = function() {
return $B.store.set("strikinglyLogger", "false"), console.log("Bobcat logger disabled!");
}, $B.growl = function(e) {
var t, n, o;
if ($B.log.enabled()) return n = 2800, o = 20 + 34 * $(".s-growl").length, t = $("<div></div>").addClass("s-growl").text(e).css({
background:"rgba(0,0,0,0.85)",
color:"white",
padding:"6px 14px",
"font-size":"110%",
position:"fixed",
"z-index":999e3,
top:o,
right:20,
"-webkit-border-radius":"4px"
}), setTimeout(function() {
return t.animate({
top:"-=5",
opacity:0
}, function() {
return t.remove();
});
}, n), $("body").append(t);
}, $B.pollHelper = function(e, t) {
var n;
return null == t && (t = 1e3), (n = function() {
return setTimeout(function() {
return e.call(this, n);
}, t), t = 1.5 * t;
})();
}, $B.poller = function(e, t, n) {
var o;
return null == t && (t = function() {}), null == n && (n = function() {}), o = !1, 
$B.pollHelper(function(i) {
var r;
return r = $.getJSON(e), r.success(function(e, n, r) {
return o ? void 0 :e && "retry" !== e && "retry" !== (null != e ? e.html :void 0) ? t(e, n, r) :i();
}), r.error(function(e) {
return "retry" === e.responseText ? i() :n(e);
});
}), {
cancel:function() {
return o = !0;
}
};
}, $B.restPoller = function(e, t) {
var n;
return null == t && (t = {}), n = {
url:e
}, $.extend(!0, n, t), n.success = function(e) {
var n, o, i, r, a, s, l;
if ((null != e ? null != (o = e.message) ? o.type :void 0 :void 0) && (null != e ? null != (i = e.message) ? i.id :void 0 :void 0)) n = "/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm"; else {
if (!(null != e ? null != (r = e.data) ? null != (a = r.task) ? a.type :void 0 :void 0 :void 0) || !(null != e ? null != (s = e.data) ? null != (l = s.task) ? l.id :void 0 :void 0 :void 0)) return $B.log("Could not get poll URL!"), 
$B.log(e), void 0;
n = "/s/tasks/" + e.data.task.type + "/" + e.data.task.id + ".jsm";
}
return $B.poller(n, t.success, t.error), $B.log("Begin polling: " + n);
}, n.error = function(e, n, o) {
return t.error(e, n, o);
}, $.ajax(n), $B.log("Requesting poller: " + e);
}, $B.waitFor = function(e, t, n) {
var o;
return n = n || 100, o = setInterval(function() {
return e() ? (clearInterval(o), t()) :void 0;
}, n);
}, $B.getQueryValue = function(e) {
var t, n;
return t = new RegExp("[?&]" + e + "=([^&#]*)"), n = t.exec(window.location.href), 
null == n ? "" :n[1];
}, $B.detectCSSFeature = function(e) {
var t, n, o, i, r, a, s;
if (o = !1, t = "Webkit Moz ms O".split(" "), n = document.createElement("div"), 
e = e.toLowerCase(), i = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== n.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (r = t[a], void 0 !== n.style[r + i]) return !0;
return !1;
}, function(e) {
var t;
return t = {}, e.setCustomization = function(e, n) {
return t[e] = n;
}, e.getCustomization = function(e) {
return null != t[e] ? t[e] :void 0;
};
}($B), function(e) {
var t;
return t = {}, e.meta = function(e, n) {
var o;
return null == n && (n = !1), null == t[e] || n ? (o = $('meta[name="' + e + '"]').attr("content"), 
null != o ? t[e] = o :($B.log("" + e + " missing in meta."), void 0)) :t[e];
}, e.metaObject = function(e, n) {
var o;
return null == n && (n = !1), null == t[e] || n ? (o = $('meta[name="' + e + '"]').attr("content"), 
null != o ? t[e] = jQuery.parseJSON(o) :($B.log("" + e + " missing in meta object."), 
{})) :t[e];
}, e.appMeta = function(t) {
return e.metaObject("app-configs")[t];
}, e.siteMeta = function(t) {
return e.metaObject("site-configs")[t];
};
}($B), $B.ui = {
modalStk:[],
disableShadeClick:function() {
var e, t;
return null != (e = _.last(this.modalStk)) ? null != (t = e.options) ? t.strong = !0 :void 0 :void 0;
},
enableShadeClick:function() {
var e, t;
return null != (e = _.last(this.modalStk)) ? null != (t = e.options) ? t.strong = !1 :void 0 :void 0;
},
removeFromModalStk:function(e) {
var t;
return t = _(this.modalStk).find(function(t) {
return t.dialog[0] === e[0];
}), t ? (this.modalStk = _(this.modalStk).without(t), !0) :!1;
},
closeLastModal:function(e) {
var t;
return null == e && (e = !1), 0 === this.modalStk.length || (t = _.last(this.modalStk), 
t.options.strong && e) ? void 0 :$B.ui.closeModal(t.dialog, t.options);
},
openModal:function(e, t) {
var n, o, i, r;
if (!e.is(":visible") || "1" !== e.css("opacity")) return t.shade && (0 === (i = $("#g-shade")).length && (i = $('<div id="g-shade" class="s-editor-modal-bg">').css("opacity", 0).appendTo($("body")), 
i.click(function() {
return $B.ui.closeLastModal(!0);
})), i.stop().show(), setTimeout(function() {
return i.css("opacity", 1);
}, 1)), o = e.height(), r = $(window).height(), e.css({
"margin-top":-o / 2
}), r > 500 && .4 * r > o / 2 ? e.css("top", "45%") :e.css("top", "50%"), t.absolute && e.css({
position:"absolute",
top:$(document).scrollTop() + $(window).height() / 2
}), e.stop().addClass("invisible").show(), setTimeout(function() {
return e.removeClass("invisible");
}, 1), this.modalStk.push({
dialog:e,
options:t
}), this.preventScrollBubbling(e), (n = $(".s-modal-bg")).length ? (n.css("opacity", 0).show(), 
n.css("pointer-events", "auto"), n.animate({
opacity:1
}, 400, "easeInOutQuart")) :void 0;
},
closeModal:function(e) {
var t, n, o, i;
return t = $(".s-modal-bg"), i = $("#g-shade"), t.stop().animate({
opacity:0
}, 400, "easeInOutQuart", function() {
return t.hide();
}), e.is(":visible") ? (e.addClass("invisible"), o = this.removeFromModalStk(e), 
o || $B.log("modal", e, "not in modal stack!"), n = !this.modalStk.length, n && (i.css("opacity", 0), 
$("body").removeClass("no-scroll")), setTimeout(function() {
return e.hide(), n ? i.hide() :void 0;
}, 300), e.trigger("strikinglyCloseModal")) :void 0;
},
openCloseModal:function(e, t) {
var n, o, i;
return o = {
onlyOpen:!1,
shade:!0,
block:!1,
absolute:!1,
openCallback:null,
closeCallback:null,
strong:!1
}, $.extend(!0, o, t), (null != (i = $.browser) ? i.safari :void 0) && e.find("iframe").length && (o.absolute = !0), 
o.closeCallback && !e.data("hasModalCloseCallback") && (e.data("hasModalCloseCallback", !0), 
e.on("strikinglyCloseModal", function() {
return "function" == typeof o.closeCallback ? o.closeCallback() :void 0;
})), n = e.is(":visible"), n ? o.onlyOpen || this.closeModal(e, o) :this.openModal(e, o), 
n;
},
openPanel:function(e) {
return e.is(":visible") && "1" === e.css("opacity") ? void 0 :(e.css({
left:"-120px"
}).show(), e.stop().animate({
left:"200px"
}, 400, "easeInOutQuart"));
},
closePanel:function(e) {
return e.is(":visible") || "0" !== e.css("opacity") ? e.stop().animate({
left:"-120px"
}, 400, "easeInOutQuart", function() {
return e.hide();
}) :void 0;
},
openClosePanel:function(e, t) {
var n;
return null == t && (t = !1), n = e.is(":visible"), n ? t || this.closePanel(e) :this.openPanel(e), 
n;
},
openIframePopup:function(e, t) {
var n, o, i, r, a, s, l, u;
return null == t && (t = {}), a = $.extend({
showAddress:!1,
noOverride:!1
}, t), n = $(".s-page-layer").show(), $("iframe", n).attr("src", e), o = $(".address .link", n), 
s = $(".s-page-wrapper"), a.showAddress ? o.attr("href", e).text(e) :o.attr("href", "").text(""), 
a.noOverride || s.css({
height:"auto",
width:"auto",
"margin-top":0,
"margin-left":0,
padding:"0"
}), null != a.height && (r = null != (l = a.topOffset) ? l :0, s.css({
height:a.height + "px",
"margin-top":(.8 * $(window).height() - a.height) / 2 + r + "px"
})), null != a.width && (i = null != (u = a.leftOffset) ? u :0, s.css({
width:a.width + "px",
"margin-left":(.92 * $(window).width() - a.width) / 2 + i + "px"
})), null != a.extra && s.css(a.extra), setTimeout(function() {
return n.addClass("open"), $(".s-page-shade, .back-btn", n).click(function() {
return $B.ui.closeIframePopup();
});
}, 100);
},
closeIframePopup:function() {
var e;
return e = $(".s-page-layer"), e.removeClass("open"), setTimeout(function() {
return e.hide(), $(".s-page-shade, .back-btn", e).unbind("click"), $("iframe", e).attr("src", "");
}, 300);
},
openLinkInWindow:function(e) {
return e.click(function(e) {
var t;
return e.preventDefault(), t = $(this).attr("href"), window.open(t, "Share", "scrollbars=1,width=500,height=500,menubar=no,toolbar=no,location=no");
});
},
openInWindow:function(e, t) {
return null == t && (t = {
height:500,
width:500
}), window.open(e, "Share", "scrollbars=1,width=" + t.width + ",height=" + t.height + ",menubar=no,toolbar=no,location=no");
},
preventScrollBubbling:function(e) {
return e.data("scrollBubblingPrevented") ? void 0 :(e.data("scrollBubblingPrevented", !0), 
e.bind("mousewheel wheel DOMMouseScroll", function(e) {
return e.preventDefault();
}));
}
}, $B.Queue = function() {
function e() {
this.clear = r(this.clear, this), this.size = r(this.size, this), this.dequeue = r(this.dequeue, this), 
this.enqueue = r(this.enqueue, this), this.q = [];
}
return e.prototype.enqueue = function(e) {
return this.q.push(e);
}, e.prototype.dequeue = function() {
return this.q.shift();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.Stack = function() {
function e() {
this.clear = r(this.clear, this), this.size = r(this.size, this), this.pop = r(this.pop, this), 
this.push = r(this.push, this), this.q = [];
}
return e.prototype.push = function(e) {
return this.q.push(e);
}, e.prototype.pop = function() {
return this.q.pop();
}, e.prototype.size = function() {
return this.q.length;
}, e.prototype.clear = function() {
return this.q = [];
}, e;
}(), $B.ObservableStack = function(e) {
function t() {
this.clear = r(this.clear, this), this.pop = r(this.pop, this), this.push = r(this.push, this), 
t.__super__.constructor.call(this), this.observableSize = ko.observable(0);
}
return s(t, e), t.prototype.push = function(e) {
return t.__super__.push.call(this, e), this.observableSize(this.size());
}, t.prototype.pop = function() {
return this.observableSize(this.size() - 1), t.__super__.pop.call(this);
}, t.prototype.clear = function() {
return t.__super__.clear.call(this), this.observableSize(this.size());
}, t;
}($B.Stack), window.Singleton = function() {
function e() {}
var t;
return t = void 0, e.get = function(e) {
return null != t ? t :t = new o(e);
}, e;
}(), o = function() {
function e(e) {
this.args = e;
}
return e.prototype.echo = function() {
return this.args;
}, e;
}(), n = [ "extended", "included" ], $B.Module = function() {
function e() {}
return e.extend = function(e) {
var t, o, i;
for (t in e) o = e[t], l.call(n, t) < 0 && (this[t] = o);
return null != (i = e.extended) && i.apply(this), this;
}, e.include = function(e) {
var t, o, i;
for (t in e) o = e[t], l.call(n, t) < 0 && (this.prototype[t] = o);
return null != (i = e.included) && i.apply(this), this;
}, e;
}(), $B.UrlHelper = {
isEmail:function(e) {
var t;
return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
t.test(e);
},
hasProtocol:function(e) {
var t, n;
return t = /^((http|https|ftp|mailto|tel|fb|skype|itms-services):)/, n = /^(#)/, 
t.test(e) || n.test(e);
},
addProtocol:function(e, t) {
return null == t && (t = !1), e = $.trim(e), 0 === e.length ? e = t ? "" :"javascript:void(0);" :this.isEmail(e) ? e = "mailto:" + e :this.hasProtocol(e) || (e = "http://" + e), 
e;
},
createUrlParser:function(e) {
var t;
return t = document.createElement("a"), t.href = this.addProtocol(e, !0), t;
}
}, $B.HtmlHelper = {
htmlEncode:function(e) {
return $("<div/>").text(e).html();
},
htmlDecode:function(e) {
return $("<div/>").html(e).text();
},
checkClosingTags:function(e) {
var t, n, o, i, r, a, s, u, c, d, h;
for (o = function(e) {
var t;
return t = "area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr".split(", "), 
e = e.split(/[<>\s]/g)[1], e = e.replace(/\//g, ""), l.call(t, e) >= 0;
}, t = /<\/?([A-Z][A-Z0-9]*)\b[^>]*>/gi, i = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 
a = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, r = e; i.test(r) || a.test(r); ) r = r.replace(i, ""), 
r = r.replace(a, "");
for (u = null != (h = r.match(t)) ? h :[], n = 0, c = 0, d = u.length; d > c; c++) if (s = u[c], 
!o(s) && ("/" !== s[1] ? n += 1 :n -= 1, 0 > n)) return !1;
return 0 === n;
}
}, $B.ImageOptionHelper = {
IMAGE_SIZE:{
small:"300x225>",
medium:"720x540>",
large:"1200x900>",
background:"2000x1200>"
},
storeStyle:function(e) {
return this._imageStyle || (this._imageStyle = this.getOptions(e.closest("form")));
},
getOptions:function(e) {
var t, n, o, i, r, a, s;
return this.conversions ? this.conversions :(i = e.find('[name="asset[image_size]"]'), 
a = e.find('[name="asset[thumb_size]"]'), 0 === i.length && console.warn("[Image Component] Image size not found!"), 
0 === a.length && console.warn("[Image Component] Thumb size not found!"), r = this.toImageSize(("function" == typeof i.val ? i.val() :void 0) || "large"), 
s = this.toImageSize(("function" == typeof a.val ? a.val() :void 0) || "200x200#"), 
o = function(e) {
return e.slice(0, -1).split("x")[0];
}, n = function(e) {
return e.slice(0, -1).split("x")[1];
}, t = function(e) {
var t;
return t = e.charAt(e.length - 1), "#" === t ? {
crop:"fill",
gravity:"faces:center"
} :"<" === t || ">" === t ? {
crop:"limit"
} :void 0;
}, this.conversions = {
custom:{
width:o(r),
height:n(r)
},
thumb:{
width:o(s),
height:n(s)
}
}, this.conversions.custom = _.extend(this.conversions.custom, t(r)), this.conversions.custom = _.extend(this.conversions.custom, {
quality:80,
fetch_format:"auto"
}), this.conversions.thumb = _.extend(this.conversions.thumb, t(s)), this.conversions.thumb = _.extend(this.conversions.thumb, {
quality:80,
fetch_format:"auto"
}), this.conversions);
},
toImageSize:function(e) {
return ("small" === e || "medium" === e || "large" === e || "background" === e) && (e = this.IMAGE_SIZE[e]), 
e;
}
}, e = function() {
function e(e) {
this.handler = e, this.queue = [];
}
return e.prototype.run = function() {
var e, t = this;
return e = function() {
return t.queue.length > 0 ? t.run() :void 0;
}, this.handler(this.queue.shift(), e);
}, e.prototype.append = function(e) {
return this.queue.push(e), 1 === this.queue.length ? this.run() :void 0;
}, e;
}(), t = function() {
function e(e, t, n) {
this.item = e, this.url = t, this.callback = n;
}
return e;
}(), $B.loadFacebookScript = function() {
var e;
if (!("undefined" != typeof $S && null !== $S ? null != (e = $S.global_conf) ? e.in_china :void 0 :void 0)) return function(e, t, n) {
var o, i;
return o = e.getElementsByTagName(t)[0], e.getElementById(n) ? void 0 :(i = e.createElement(t), 
i.id = n, i.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=138736959550286", 
o.parentNode.insertBefore(i, o));
}(document, "script", "facebook-jssdk");
}, $B.TwitterLogin = function() {
function e(e) {
this._configs = e;
}
return e.prototype.load = function(e) {
var t;
if (!("undefined" != typeof $S && null !== $S ? null != (t = $S.global_conf) ? t.in_china :void 0 :void 0) && null == window.twttr) return window.twttr = function(e, t, n) {
var o, i, r;
return o = e.getElementsByTagName(t)[0], e.getElementById(n) ? void 0 :(i = e.createElement(t), 
i.id = n, i.src = "//platform.twitter.com/widgets.js", o.parentNode.insertBefore(i, o), 
window.twttr || (r = {
_e:[],
ready:function(e) {
return r._e.push(e);
}
}));
}(document, "script", "twitter-wjs"), window.twttr.ready(function(t) {
return t.events.bind("tweet", function(t) {
return callback.tweet ? e.tweet(t) :void 0;
});
});
}, e;
}(), $B.FacebookLogin = function() {
function e(e) {
this._configs = e, this.loadFacebook = r(this.loadFacebook, this), this.fbLoginPopup = r(this.fbLoginPopup, this);
}
return e.prototype.fbLoginPopup = function(e) {
return FB.login(function(t) {
if (t.authResponse) {
if (e.success) return e.success(t);
} else if (e.fail) return e.fail(t);
}, {
scope:this._configs.FACEBOOK_PERMS
});
}, e.prototype.loadFacebook = function(e) {
var t = this;
if (!$S.global_conf.in_china) return window.fbAsyncInit = function() {
return FB.init({
appId:t._configs.FACEBOOK_APP_ID,
channelUrl:"" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
status:!1,
cookie:!0,
xfbml:!0,
oauth:!0
}), FB.Event.subscribe("auth.authResponseChange", function(t) {
if (console.log(t), "connected" === t.status) {
if (e.connected) return e.connected(t);
} else if ("not_authorized" === t.status) {
if (e.notAuthorized) return e.notAuthorized(t);
} else if (e.others) return e.others(t);
});
}, function(e) {
var t, n, o;
return t = "facebook-jssdk", o = e.getElementsByTagName("script")[0], e.getElementById(t) ? void 0 :(n = e.createElement("script"), 
n.id = t, n.async = !0, n.src = "//connect.facebook.net/en_US/all.js", o.parentNode.insertBefore(n, o));
}(document);
}, e;
}(), $B.LinkedinLogin = function() {
function e(e) {
this._configs = e, this.loadLinkedin = r(this.loadLinkedin, this), this.linkedinLogout = r(this.linkedinLogout, this), 
this.linkedinLoginPopup = r(this.linkedinLoginPopup, this);
}
return e.prototype.linkedinLoginPopup = function(e) {
return IN.User.authorize(function() {
if (IN.User.isAuthorized()) {
if (e.success) return e.success();
} else if (e.fail) return e.fail();
});
}, e.prototype.linkedinLogout = function() {
return IN.User.logout();
}, e.prototype.loadLinkedin = function(e) {
var t = this;
return window.linkedinAsyncInit = function() {
return IN.init({
api_key:t._configs.LINKEDIN_API_KEY,
scope:t._configs.LINKEDIN_PERMS,
authorize:!1,
credentials_cookie:!0,
credentials_cookie_crc:!0
}), IN.Event.on(IN, "auth", function() {
return IN.User.isAuthorized() && ($B.log("[LinkedIn] Authorized user"), e.connected) ? e.connected() :void 0;
}), IN.Event.on(IN, "logout", function() {
return !IN.User.isAuthorized() && ($B.log("[LinkedIn] Deauthorized user"), e.disconnected) ? e.disconnected() :void 0;
}), e.initialized ? $B.waitFor(function() {
return "undefined" != typeof IN && null !== IN && null != IN.User && null != IN.Event;
}, e.initialized, 500) :void 0;
}, $.getScript("//platform.linkedin.com/in.js?async=true", linkedinAsyncInit);
}, e;
}(), window.AjaxQueueBuffer = e, window.Task = t, $B.debounce = function(e, t) {
var n;
return null == t && (t = 100), n = 0, function() {
var o, i;
return i = this, o = arguments, clearTimeout(n), n = setTimeout(function() {
return e.apply(i, o);
}, t);
};
}, $B.genGeneralErrorHandler = function(e) {
return function(t) {
var n, o, i;
return n = null != t.responseJSON ? null != (o = t.responseJSON.meta) ? null != (i = o.userMessage) ? i.plain :void 0 :void 0 :I18n.t("js.pages.edit.errors.api_error"), 
$B.customAlert(n), "function" == typeof e ? e() :void 0;
};
}, $B.lazyloadIframe = function() {
var e;
return e = 0, function(t, n) {
return null == n && (n = -1), -1 === n && (n = 1e4 + 1e3 * e), e += 1, setTimeout(function() {
return t.data("src") !== t.attr("src") ? (t.attr("src", t.data("src")), "function" == typeof $B.timerCheck ? $B.timerCheck("Loading iframe #" + t.attr("id")) :void 0) :void 0;
}, n);
};
}(), $B.initFilepicker = function() {
return $B.waitFor(function() {
return "undefined" != typeof filepicker && null !== filepicker;
}, function() {
return filepicker.setKey($S.conf.FILEPICKER_API_KEY), window.filepicker_options = {
extension:[ ".png", ".jpg", ".jpeg", ".gif", ".bmp" ],
container:"s-upload-iframe",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ],
openTo:"COMPUTER",
maxsize:3145728
}, window.store_options = {
location:"S3"
};
});
}, $B.initFeather = function() {
return $B.waitFor(function() {
return "undefined" != typeof Aviary && null !== Aviary;
}, function() {
return window.featherEditor = new Aviary.Feather({
apiKey:"f5da8ea5e",
apiVersion:3,
tools:"all",
appendTo:"",
theme:"dark",
maxSize:1920,
language:"en",
onError:function(e) {
return console.log("Aviary onError!", e);
}
});
});
}, $B.Embedly = function() {
function e() {
this.apiKey = $S.conf.EMBEDLY_API_KEY;
}
return e.prototype.queryUrlForHtml = function(e) {
return $.ajax({
type:"GET",
url:"http://api.embed.ly/1/oembed",
data:{
key:this.apiKey,
url:e
},
dataType:"JSON"
});
}, e;
}();
}.call(this), function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1, 
window.Bobcat.DOM = {
SLIDES:".slides .slide",
PAGE_DATA_SCOPE:"page",
EDITPAGE_DATA_SCOPE:"editpage",
NAVIGATOR:"#strikingly-navigation-menu",
FOOTER:"#strikingly-footer",
FOOTER_LOGO_EDITOR:"#edit-logo-footer",
EDITOR_OVERLAY:".edit-overlay",
EDITOR:".editor",
CONTENT:".content",
PAGE_SETTING_DIALOG:"#page-settings-menu",
NEW_PAGE_MESSAGE_DIALOG:"#new-page-message-dialog",
NEW_SECTION_DIALOG:"#new-section-dialog",
ASSET_LIB_DIALOG:"#asset-lib-dialog",
APP_STORE_DIALOG:"#app-store-dialog",
SERVICE_EDIT_DIALOG:"#service-edit-dialog",
TRAFFIC_GUIDE_DIALOG:"#traffic-guide-dialog",
PAYPAL_POPUP:".strikingly-paypal-popup",
SHARE_DIALOG:"#sharing-options-dialog",
CATEGORY_DIALOG:"#category-dialog",
PUBLISH_DIALOG:"#publish-dialog-new",
UNPUBLISH_SITES_DIALOG:"#unpublish-sites-dialog",
SAVED_DIALOG:"#saved-dialog",
FEEDBACK_DIALOG:"#feedback-dialog",
FEEDBACK_DIALOG_STEP1:".step-1",
FEEDBACK_DIALOG_STEP2:".step-2",
DIALOG_INACTIVE_CLASS:"inactive",
FACEBOOK_ROOT:"#fb-root",
FONT_SELECTOR:"select.fontselector",
VARIATION_SELECTOR:"select.variationselector",
PRESET_SELECTOR:"select.s-preset-selector-input",
STRIKINGLY_LOGO:"#strikingly-footer-logo",
SETTINGS:{
FORM:".strikingly-settings-form",
DOMAIN_FORM:".strikingly-custom-domain-form",
PUBLISH:{
FB_SHARE:"#publish-fb-button",
PUBLIC_URL:"#publish-public-url"
}
},
IMAGE_TITLE:function(e) {
return e.find("img").attr("alt") || "";
},
IMAGE_DESCRIPTION:function(e) {
return e.find("img").attr("data-description") || "";
},
GALLERY:function(e) {
var t, n, o, i;
for (i = e.parent().find("a.item"), n = 0, o = i.length; o > n; n++) t = i[n], $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER++ + "]");
},
GALLERY_IMAGES:function(e) {
return e.find("a.item");
},
GALLERY_IMAGES_EDITOR:function(e) {
return e.find(".gallery-editor-image");
}
};
}.call(this), function() {
$B.referrers_source = {
unknown:{
Google:{
domains:"support.google.com developers.google.com maps.google.com accounts.google.com drive.google.com sites.google.com groups.google.com groups.google.co.uk news.google.co.uk".split(" ")
},
"Yahoo!":{
domains:"finance.yahoo.com news.yahoo.com eurosport.yahoo.com sports.yahoo.com astrology.yahoo.com travel.yahoo.com answers.yahoo.com screen.yahoo.com weather.yahoo.com messenger.yahoo.com games.yahoo.com shopping.yahoo.net movies.yahoo.com cars.yahoo.com lifestyle.yahoo.com omg.yahoo.com match.yahoo.net".split(" ")
}
},
search:{
TalkTalk:{
domains:[ "www.talktalk.co.uk" ],
parameters:[ "query" ]
},
"1.cz":{
domains:[ "1.cz" ],
parameters:[ "q" ]
},
Softonic:{
domains:[ "search.softonic.com" ],
parameters:[ "q" ]
},
GAIS:{
domains:[ "gais.cs.ccu.edu.tw" ],
parameters:[ "q" ]
},
Freecause:{
domains:[ "search.freecause.com" ],
parameters:[ "p" ]
},
RPMFind:{
domains:[ "rpmfind.net", "fr2.rpmfind.net" ],
parameters:[ "rpmfind.net", "fr2.rpmfind.net" ]
},
Comcast:{
domains:[ "serach.comcast.net" ],
parameters:[ "q" ]
},
Voila:{
domains:[ "search.ke.voila.fr", "www.lemoteur.fr" ],
parameters:[ "rdata" ]
},
Nifty:{
domains:[ "search.nifty.com" ],
parameters:[ "q" ]
},
Atlas:{
domains:[ "searchatlas.centrum.cz" ],
parameters:[ "q" ]
},
"Lo.st":{
domains:[ "lo.st" ],
parameters:[ "x_query" ]
},
DasTelefonbuch:{
domains:[ "www1.dastelefonbuch.de" ],
parameters:[ "kw" ]
},
Fireball:{
domains:[ "www.fireball.de" ],
parameters:[ "q" ]
},
"1und1":{
domains:[ "search.1und1.de" ],
parameters:[ "su" ]
},
Virgilio:{
domains:[ "ricerca.virgilio.it", "ricercaimmagini.virgilio.it", "ricercavideo.virgilio.it", "ricercanews.virgilio.it", "mobile.virgilio.it" ],
parameters:[ "qs" ]
},
"Web.nl":{
domains:[ "www.web.nl" ],
parameters:[ "zoekwoord" ]
},
Plazoo:{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
"Goyellow.de":{
domains:[ "www.goyellow.de" ],
parameters:[ "MDN" ]
},
AOL:{
domains:"search.aol.com search.aol.it aolsearch.aol.com aolsearch.com www.aolrecherche.aol.fr www.aolrecherches.aol.fr www.aolimages.aol.fr aim.search.aol.com www.recherche.aol.fr find.web.aol.com recherche.aol.ca aolsearch.aol.co.uk search.aol.co.uk aolrecherche.aol.fr sucheaol.aol.de suche.aol.de suche.aolsvc.de aolbusqueda.aol.com.mx alicesuche.aol.de alicesuchet.aol.de suchet2.aol.de search.hp.my.aol.com.au search.hp.my.aol.de search.hp.my.aol.it search-intl.netscape.com".split(" "),
parameters:[ "q", "query" ]
},
Acoon:{
domains:[ "www.acoon.de" ],
parameters:[ "begriff" ]
},
Free:{
domains:[ "search.free.fr", "search1-2.free.fr", "search1-1.free.fr" ],
parameters:[ "q" ]
},
"Apollo Latvia":{
domains:[ "apollo.lv/portal/search/" ],
parameters:[ "q" ]
},
HighBeam:{
domains:[ "www.highbeam.com" ],
parameters:[ "q" ]
},
"I-play":{
domains:[ "start.iplay.com" ],
parameters:[ "q" ]
},
FriendFeed:{
domains:[ "friendfeed.com" ],
parameters:[ "q" ]
},
Yasni:{
domains:[ "www.yasni.de", "www.yasni.com", "www.yasni.co.uk", "www.yasni.ch", "www.yasni.at" ],
parameters:[ "query" ]
},
Gigablast:{
domains:[ "www.gigablast.com", "dir.gigablast.com" ],
parameters:[ "q" ]
},
arama:{
domains:[ "arama.com" ],
parameters:[ "q" ]
},
Fixsuche:{
domains:[ "www.fixsuche.de" ],
parameters:[ "q" ]
},
Apontador:{
domains:[ "apontador.com.br", "www.apontador.com.br" ],
parameters:[ "q" ]
},
"Search.com":{
domains:[ "www.search.com" ],
parameters:[ "q" ]
},
Monstercrawler:{
domains:[ "www.monstercrawler.com" ],
parameters:[ "qry" ]
},
"Google Images":{
domains:"google.ac/imgres google.ad/imgres google.ae/imgres google.am/imgres google.as/imgres google.at/imgres google.az/imgres google.ba/imgres google.be/imgres google.bf/imgres google.bg/imgres google.bi/imgres google.bj/imgres google.bs/imgres google.by/imgres google.ca/imgres google.cat/imgres google.cc/imgres google.cd/imgres google.cf/imgres google.cg/imgres google.ch/imgres google.ci/imgres google.cl/imgres google.cm/imgres google.cn/imgres google.co.bw/imgres google.co.ck/imgres google.co.cr/imgres google.co.id/imgres google.co.il/imgres google.co.in/imgres google.co.jp/imgres google.co.ke/imgres google.co.kr/imgres google.co.ls/imgres google.co.ma/imgres google.co.mz/imgres google.co.nz/imgres google.co.th/imgres google.co.tz/imgres google.co.ug/imgres google.co.uk/imgres google.co.uz/imgres google.co.ve/imgres google.co.vi/imgres google.co.za/imgres google.co.zm/imgres google.co.zw/imgres google.com/imgres google.com.af/imgres google.com.ag/imgres google.com.ai/imgres google.com.ar/imgres google.com.au/imgres google.com.bd/imgres google.com.bh/imgres google.com.bn/imgres google.com.bo/imgres google.com.br/imgres google.com.by/imgres google.com.bz/imgres google.com.co/imgres google.com.cu/imgres google.com.cy/imgres google.com.do/imgres google.com.ec/imgres google.com.eg/imgres google.com.et/imgres google.com.fj/imgres google.com.gh/imgres google.com.gi/imgres google.com.gt/imgres google.com.hk/imgres google.com.jm/imgres google.com.kh/imgres google.com.kh/imgres google.com.kw/imgres google.com.lb/imgres google.com.lc/imgres google.com.ly/imgres google.com.mt/imgres google.com.mx/imgres google.com.my/imgres google.com.na/imgres google.com.nf/imgres google.com.ng/imgres google.com.ni/imgres google.com.np/imgres google.com.om/imgres google.com.pa/imgres google.com.pe/imgres google.com.ph/imgres google.com.pk/imgres google.com.pr/imgres google.com.py/imgres google.com.qa/imgres google.com.sa/imgres google.com.sb/imgres google.com.sg/imgres google.com.sl/imgres google.com.sv/imgres google.com.tj/imgres google.com.tn/imgres google.com.tr/imgres google.com.tw/imgres google.com.ua/imgres google.com.uy/imgres google.com.vc/imgres google.com.vn/imgres google.cv/imgres google.cz/imgres google.de/imgres google.dj/imgres google.dk/imgres google.dm/imgres google.dz/imgres google.ee/imgres google.es/imgres google.fi/imgres google.fm/imgres google.fr/imgres google.ga/imgres google.gd/imgres google.ge/imgres google.gf/imgres google.gg/imgres google.gl/imgres google.gm/imgres google.gp/imgres google.gr/imgres google.gy/imgres google.hn/imgres google.hr/imgres google.ht/imgres google.hu/imgres google.ie/imgres google.im/imgres google.io/imgres google.iq/imgres google.is/imgres google.it/imgres google.it.ao/imgres google.je/imgres google.jo/imgres google.kg/imgres google.ki/imgres google.kz/imgres google.la/imgres google.li/imgres google.lk/imgres google.lt/imgres google.lu/imgres google.lv/imgres google.md/imgres google.me/imgres google.mg/imgres google.mk/imgres google.ml/imgres google.mn/imgres google.ms/imgres google.mu/imgres google.mv/imgres google.mw/imgres google.ne/imgres google.nl/imgres google.no/imgres google.nr/imgres google.nu/imgres google.pl/imgres google.pn/imgres google.ps/imgres google.pt/imgres google.ro/imgres google.rs/imgres google.ru/imgres google.rw/imgres google.sc/imgres google.se/imgres google.sh/imgres google.si/imgres google.sk/imgres google.sm/imgres google.sn/imgres google.so/imgres google.st/imgres google.td/imgres google.tg/imgres google.tk/imgres google.tl/imgres google.tm/imgres google.to/imgres google.tt/imgres google.us/imgres google.vg/imgres google.vu/imgres images.google.ws images.google.ac images.google.ad images.google.ae images.google.am images.google.as images.google.at images.google.az images.google.ba images.google.be images.google.bf images.google.bg images.google.bi images.google.bj images.google.bs images.google.by images.google.ca images.google.cat images.google.cc images.google.cd images.google.cf images.google.cg images.google.ch images.google.ci images.google.cl images.google.cm images.google.cn images.google.co.bw images.google.co.ck images.google.co.cr images.google.co.id images.google.co.il images.google.co.in images.google.co.jp images.google.co.ke images.google.co.kr images.google.co.ls images.google.co.ma images.google.co.mz images.google.co.nz images.google.co.th images.google.co.tz images.google.co.ug images.google.co.uk images.google.co.uz images.google.co.ve images.google.co.vi images.google.co.za images.google.co.zm images.google.co.zw images.google.com images.google.com.af images.google.com.ag images.google.com.ai images.google.com.ar images.google.com.au images.google.com.bd images.google.com.bh images.google.com.bn images.google.com.bo images.google.com.br images.google.com.by images.google.com.bz images.google.com.co images.google.com.cu images.google.com.cy images.google.com.do images.google.com.ec images.google.com.eg images.google.com.et images.google.com.fj images.google.com.gh images.google.com.gi images.google.com.gt images.google.com.hk images.google.com.jm images.google.com.kh images.google.com.kh images.google.com.kw images.google.com.lb images.google.com.lc images.google.com.ly images.google.com.mt images.google.com.mx images.google.com.my images.google.com.na images.google.com.nf images.google.com.ng images.google.com.ni images.google.com.np images.google.com.om images.google.com.pa images.google.com.pe images.google.com.ph images.google.com.pk images.google.com.pr images.google.com.py images.google.com.qa images.google.com.sa images.google.com.sb images.google.com.sg images.google.com.sl images.google.com.sv images.google.com.tj images.google.com.tn images.google.com.tr images.google.com.tw images.google.com.ua images.google.com.uy images.google.com.vc images.google.com.vn images.google.cv images.google.cz images.google.de images.google.dj images.google.dk images.google.dm images.google.dz images.google.ee images.google.es images.google.fi images.google.fm images.google.fr images.google.ga images.google.gd images.google.ge images.google.gf images.google.gg images.google.gl images.google.gm images.google.gp images.google.gr images.google.gy images.google.hn images.google.hr images.google.ht images.google.hu images.google.ie images.google.im images.google.io images.google.iq images.google.is images.google.it images.google.it.ao images.google.je images.google.jo images.google.kg images.google.ki images.google.kz images.google.la images.google.li images.google.lk images.google.lt images.google.lu images.google.lv images.google.md images.google.me images.google.mg images.google.mk images.google.ml images.google.mn images.google.ms images.google.mu images.google.mv images.google.mw images.google.ne images.google.nl images.google.no images.google.nr images.google.nu images.google.pl images.google.pn images.google.ps images.google.pt images.google.ro images.google.rs images.google.ru images.google.rw images.google.sc images.google.se images.google.sh images.google.si images.google.sk images.google.sm images.google.sn images.google.so images.google.st images.google.td images.google.tg images.google.tk images.google.tl images.google.tm images.google.to images.google.tt images.google.us images.google.vg images.google.vu images.google.ws".split(" "),
parameters:[ "q" ]
},
ABCsøk:{
domains:[ "abcsolk.no", "verden.abcsok.no" ],
parameters:[ "q" ]
},
"Google Product Search":{
domains:"google.ac/products google.ad/products google.ae/products google.am/products google.as/products google.at/products google.az/products google.ba/products google.be/products google.bf/products google.bg/products google.bi/products google.bj/products google.bs/products google.by/products google.ca/products google.cat/products google.cc/products google.cd/products google.cf/products google.cg/products google.ch/products google.ci/products google.cl/products google.cm/products google.cn/products google.co.bw/products google.co.ck/products google.co.cr/products google.co.id/products google.co.il/products google.co.in/products google.co.jp/products google.co.ke/products google.co.kr/products google.co.ls/products google.co.ma/products google.co.mz/products google.co.nz/products google.co.th/products google.co.tz/products google.co.ug/products google.co.uk/products google.co.uz/products google.co.ve/products google.co.vi/products google.co.za/products google.co.zm/products google.co.zw/products google.com/products google.com.af/products google.com.ag/products google.com.ai/products google.com.ar/products google.com.au/products google.com.bd/products google.com.bh/products google.com.bn/products google.com.bo/products google.com.br/products google.com.by/products google.com.bz/products google.com.co/products google.com.cu/products google.com.cy/products google.com.do/products google.com.ec/products google.com.eg/products google.com.et/products google.com.fj/products google.com.gh/products google.com.gi/products google.com.gt/products google.com.hk/products google.com.jm/products google.com.kh/products google.com.kh/products google.com.kw/products google.com.lb/products google.com.lc/products google.com.ly/products google.com.mt/products google.com.mx/products google.com.my/products google.com.na/products google.com.nf/products google.com.ng/products google.com.ni/products google.com.np/products google.com.om/products google.com.pa/products google.com.pe/products google.com.ph/products google.com.pk/products google.com.pr/products google.com.py/products google.com.qa/products google.com.sa/products google.com.sb/products google.com.sg/products google.com.sl/products google.com.sv/products google.com.tj/products google.com.tn/products google.com.tr/products google.com.tw/products google.com.ua/products google.com.uy/products google.com.vc/products google.com.vn/products google.cv/products google.cz/products google.de/products google.dj/products google.dk/products google.dm/products google.dz/products google.ee/products google.es/products google.fi/products google.fm/products google.fr/products google.ga/products google.gd/products google.ge/products google.gf/products google.gg/products google.gl/products google.gm/products google.gp/products google.gr/products google.gy/products google.hn/products google.hr/products google.ht/products google.hu/products google.ie/products google.im/products google.io/products google.iq/products google.is/products google.it/products google.it.ao/products google.je/products google.jo/products google.kg/products google.ki/products google.kz/products google.la/products google.li/products google.lk/products google.lt/products google.lu/products google.lv/products google.md/products google.me/products google.mg/products google.mk/products google.ml/products google.mn/products google.ms/products google.mu/products google.mv/products google.mw/products google.ne/products google.nl/products google.no/products google.nr/products google.nu/products google.pl/products google.pn/products google.ps/products google.pt/products google.ro/products google.rs/products google.ru/products google.rw/products google.sc/products google.se/products google.sh/products google.si/products google.sk/products google.sm/products google.sn/products google.so/products google.st/products google.td/products google.tg/products google.tk/products google.tl/products google.tm/products google.to/products google.tt/products google.us/products google.vg/products google.vu/products google.ws/products www.google.ac/products www.google.ad/products www.google.ae/products www.google.am/products www.google.as/products www.google.at/products www.google.az/products www.google.ba/products www.google.be/products www.google.bf/products www.google.bg/products www.google.bi/products www.google.bj/products www.google.bs/products www.google.by/products www.google.ca/products www.google.cat/products www.google.cc/products www.google.cd/products www.google.cf/products www.google.cg/products www.google.ch/products www.google.ci/products www.google.cl/products www.google.cm/products www.google.cn/products www.google.co.bw/products www.google.co.ck/products www.google.co.cr/products www.google.co.id/products www.google.co.il/products www.google.co.in/products www.google.co.jp/products www.google.co.ke/products www.google.co.kr/products www.google.co.ls/products www.google.co.ma/products www.google.co.mz/products www.google.co.nz/products www.google.co.th/products www.google.co.tz/products www.google.co.ug/products www.google.co.uk/products www.google.co.uz/products www.google.co.ve/products www.google.co.vi/products www.google.co.za/products www.google.co.zm/products www.google.co.zw/products www.google.com/products www.google.com.af/products www.google.com.ag/products www.google.com.ai/products www.google.com.ar/products www.google.com.au/products www.google.com.bd/products www.google.com.bh/products www.google.com.bn/products www.google.com.bo/products www.google.com.br/products www.google.com.by/products www.google.com.bz/products www.google.com.co/products www.google.com.cu/products www.google.com.cy/products www.google.com.do/products www.google.com.ec/products www.google.com.eg/products www.google.com.et/products www.google.com.fj/products www.google.com.gh/products www.google.com.gi/products www.google.com.gt/products www.google.com.hk/products www.google.com.jm/products www.google.com.kh/products www.google.com.kh/products www.google.com.kw/products www.google.com.lb/products www.google.com.lc/products www.google.com.ly/products www.google.com.mt/products www.google.com.mx/products www.google.com.my/products www.google.com.na/products www.google.com.nf/products www.google.com.ng/products www.google.com.ni/products www.google.com.np/products www.google.com.om/products www.google.com.pa/products www.google.com.pe/products www.google.com.ph/products www.google.com.pk/products www.google.com.pr/products www.google.com.py/products www.google.com.qa/products www.google.com.sa/products www.google.com.sb/products www.google.com.sg/products www.google.com.sl/products www.google.com.sv/products www.google.com.tj/products www.google.com.tn/products www.google.com.tr/products www.google.com.tw/products www.google.com.ua/products www.google.com.uy/products www.google.com.vc/products www.google.com.vn/products www.google.cv/products www.google.cz/products www.google.de/products www.google.dj/products www.google.dk/products www.google.dm/products www.google.dz/products www.google.ee/products www.google.es/products www.google.fi/products www.google.fm/products www.google.fr/products www.google.ga/products www.google.gd/products www.google.ge/products www.google.gf/products www.google.gg/products www.google.gl/products www.google.gm/products www.google.gp/products www.google.gr/products www.google.gy/products www.google.hn/products www.google.hr/products www.google.ht/products www.google.hu/products www.google.ie/products www.google.im/products www.google.io/products www.google.iq/products www.google.is/products www.google.it/products www.google.it.ao/products www.google.je/products www.google.jo/products www.google.kg/products www.google.ki/products www.google.kz/products www.google.la/products www.google.li/products www.google.lk/products www.google.lt/products www.google.lu/products www.google.lv/products www.google.md/products www.google.me/products www.google.mg/products www.google.mk/products www.google.ml/products www.google.mn/products www.google.ms/products www.google.mu/products www.google.mv/products www.google.mw/products www.google.ne/products www.google.nl/products www.google.no/products www.google.nr/products www.google.nu/products www.google.pl/products www.google.pn/products www.google.ps/products www.google.pt/products www.google.ro/products www.google.rs/products www.google.ru/products www.google.rw/products www.google.sc/products www.google.se/products www.google.sh/products www.google.si/products www.google.sk/products www.google.sm/products www.google.sn/products www.google.so/products www.google.st/products www.google.td/products www.google.tg/products www.google.tk/products www.google.tl/products www.google.tm/products www.google.to/products www.google.tt/products www.google.us/products www.google.vg/products www.google.vu/products www.google.ws/products".split(" "),
parameters:[ "q" ]
},
DasOertliche:{
domains:[ "www.dasoertliche.de" ],
parameters:[ "kw" ]
},
InfoSpace:{
domains:"infospace.com dogpile.com www.dogpile.com metacrawler.com webfetch.com webcrawler.com search.kiwee.com isearch.babylon.com start.facemoods.com search.magnetic.com search.searchcompletion.com clusty.com".split(" "),
parameters:[ "q", "s" ]
},
Weborama:{
domains:[ "www.weborama.com" ],
parameters:[ "QUERY" ]
},
Bluewin:{
domains:[ "search.bluewin.ch" ],
parameters:[ "searchTerm" ]
},
Neti:{
domains:[ "www.neti.ee" ],
parameters:[ "query" ]
},
Winamp:{
domains:[ "search.winamp.com" ],
parameters:[ "q" ]
},
Nigma:{
domains:[ "nigma.ru" ],
parameters:[ "s" ]
},
"Yahoo! Images":{
domains:[ "image.yahoo.cn", "images.search.yahoo.com" ],
parameters:[ "p", "q" ]
},
Exalead:{
domains:[ "www.exalead.fr", "www.exalead.com" ],
parameters:[ "q" ]
},
Teoma:{
domains:[ "www.teoma.com" ],
parameters:[ "q" ]
},
Needtofind:{
domains:[ "ko.search.need2find.com" ],
parameters:[ "searchfor" ]
},
Looksmart:{
domains:[ "www.looksmart.com" ],
parameters:[ "key" ]
},
"Wirtualna Polska":{
domains:[ "szukaj.wp.pl" ],
parameters:[ "szukaj" ]
},
Toolbarhome:{
domains:[ "www.toolbarhome.com", "vshare.toolbarhome.com" ],
parameters:[ "q" ]
},
Searchalot:{
domains:[ "searchalot.com" ],
parameters:[ "q" ]
},
Yandex:{
domains:"yandex.ru yandex.ua yandex.com www.yandex.ru www.yandex.ua www.yandex.com".split(" "),
parameters:[ "text" ]
},
"canoe.ca":{
domains:[ "web.canoe.ca" ],
parameters:[ "q" ]
},
Compuserve:{
domains:[ "websearch.cs.com" ],
parameters:[ "query" ]
},
Startpagina:{
domains:[ "startgoogle.startpagina.nl" ],
parameters:[ "q" ]
},
eo:{
domains:[ "eo.st" ],
parameters:[ "x_query" ]
},
Zhongsou:{
domains:[ "p.zhongsou.com" ],
parameters:[ "w" ]
},
"La Toile Du Quebec Via Google":{
domains:[ "www.toile.com", "web.toile.com" ],
parameters:[ "q" ]
},
Paperball:{
domains:[ "www.paperball.de" ],
parameters:[ "q" ]
},
"Jungle Spider":{
domains:[ "www.jungle-spider.de" ],
parameters:[ "q" ]
},
PeoplePC:{
domains:[ "search.peoplepc.com" ],
parameters:[ "q" ]
},
"MetaCrawler.de":{
domains:[ "s1.metacrawler.de", "s2.metacrawler.de", "s3.metacrawler.de" ],
parameters:[ "qry" ]
},
Orange:{
domains:[ "busca.orange.es", "search.orange.co.uk" ],
parameters:[ "q" ]
},
"Gule Sider":{
domains:[ "www.gulesider.no" ],
parameters:[ "q" ]
},
Francite:{
domains:[ "recherche.francite.com" ],
parameters:[ "name" ]
},
"Ask Toolbar":{
domains:[ "search.tb.ask.com" ],
parameters:[ "searchfor" ]
},
Aport:{
domains:[ "sm.aport.ru" ],
parameters:[ "r" ]
},
"Trusted-Search":{
domains:[ "www.trusted--search.com" ],
parameters:[ "w" ]
},
goo:{
domains:[ "search.goo.ne.jp", "ocnsearch.goo.ne.jp" ],
parameters:[ "MT" ]
},
"Fast Browser Search":{
domains:[ "www.fastbrowsersearch.com" ],
parameters:[ "q" ]
},
Blogpulse:{
domains:[ "www.blogpulse.com" ],
parameters:[ "query" ]
},
Volny:{
domains:[ "web.volny.cz" ],
parameters:[ "search" ]
},
Icerockeet:{
domains:[ "blogs.icerocket.com" ],
parameters:[ "q" ]
},
Terra:{
domains:[ "buscador.terra.es", "buscador.terra.cl", "buscador.terra.com.br" ],
parameters:[ "query" ]
},
Searchy:{
domains:[ "www.searchy.co.uk" ],
parameters:[ "q" ]
},
Onet:{
domains:[ "szukaj.onet.pl" ],
parameters:[ "qt" ]
},
Digg:{
domains:[ "digg.com" ],
parameters:[ "s" ]
},
Abacho:{
domains:"www.abacho.de www.abacho.com www.abacho.co.uk www.se.abacho.com www.tr.abacho.com www.abacho.at www.abacho.fr www.abacho.es www.abacho.ch www.abacho.it".split(" "),
parameters:[ "q" ]
},
maailm:{
domains:[ "www.maailm.com" ],
parameters:[ "tekst" ]
},
Flix:{
domains:[ "www.flix.de" ],
parameters:[ "keyword" ]
},
Suchnase:{
domains:[ "www.suchnase.de" ],
parameters:[ "q" ]
},
Freenet:{
domains:[ "suche.freenet.de" ],
parameters:[ "query", "Keywords" ]
},
DuckDuckGoL:{
domains:[ "duckduckgo.com" ],
parameters:[ "q" ]
},
"Poisk.ru":{
domains:[ "www.plazoo.com" ],
parameters:[ "q" ]
},
Sharelook:{
domains:[ "www.sharelook.fr" ],
parameters:[ "keyword" ]
},
Najdi:{
domains:[ "www.najdi.si" ],
parameters:[ "q" ]
},
Picsearch:{
domains:[ "www.picsearch.com" ],
parameters:[ "q" ]
},
"Mail.ru":{
domains:[ "go.mail.ru" ],
parameters:[ "q" ]
},
Alexa:{
domains:[ "alexa.com", "search.toolbars.alexa.com" ],
parameters:[ "q" ]
},
Metager:{
domains:[ "meta.rrzn.uni-hannover.de", "www.metager.de" ],
parameters:[ "eingabe" ]
},
Technorati:{
domains:[ "technorati.com" ],
parameters:[ "q" ]
},
WWW:{
domains:[ "search.www.ee" ],
parameters:[ "query" ]
},
"Trouvez.com":{
domains:[ "www.trouvez.com" ],
parameters:[ "query" ]
},
IXquick:{
domains:"ixquick.com www.eu.ixquick.com ixquick.de www.ixquick.de us.ixquick.com s1.us.ixquick.com s2.us.ixquick.com s3.us.ixquick.com s4.us.ixquick.com s5.us.ixquick.com eu.ixquick.com s8-eu.ixquick.com s1-eu.ixquick.de".split(" "),
parameters:[ "query" ]
},
Zapmeta:{
domains:[ "www.zapmeta.com", "www.zapmeta.nl", "www.zapmeta.de", "uk.zapmeta.com" ],
parameters:[ "q", "query" ]
},
Yippy:{
domains:[ "search.yippy.com" ],
parameters:[ "q", "query" ]
},
Gomeo:{
domains:[ "www.gomeo.com" ],
parameters:[ "Keywords" ]
},
Walhello:{
domains:[ "www.walhello.info", "www.walhello.com", "www.walhello.de", "www.walhello.nl" ],
parameters:[ "key" ]
},
Meta:{
domains:[ "meta.ua" ],
parameters:[ "q" ]
},
Skynet:{
domains:[ "www.skynet.be" ],
parameters:[ "q" ]
},
Blogdigger:{
domains:[ "www.blogdigger.com" ],
parameters:[ "q" ]
},
WebSearch:{
domains:[ "www.websearch.com" ],
parameters:[ "qkw", "q" ]
},
Rambler:{
domains:[ "nova.rambler.ru" ],
parameters:[ "query", "words" ]
},
Latne:{
domains:[ "www.latne.lv" ],
parameters:[ "q" ]
},
MySearch:{
domains:"www.mysearch.com ms114.mysearch.com ms146.mysearch.com kf.mysearch.myway.com ki.mysearch.myway.com search.myway.com search.mywebsearch.com".split(" "),
parameters:[ "searchfor", "searchFor" ]
},
Cuil:{
domains:[ "www.cuil.com" ],
parameters:[ "q" ]
},
Tixuma:{
domains:[ "www.tixuma.de" ],
parameters:[ "sc" ]
},
Sapo:{
domains:[ "pesquisa.sapo.pt" ],
parameters:[ "q" ]
},
Gnadenmeer:{
domains:[ "www.gnadenmeer.de" ],
parameters:[ "keyword" ]
},
Arcor:{
domains:[ "www.arcor.de" ],
parameters:[ "Keywords" ]
},
Naver:{
domains:[ "search.naver.com" ],
parameters:[ "query" ]
},
Zoeken:{
domains:[ "www.zoeken.nl" ],
parameters:[ "q" ]
},
Yam:{
domains:[ "search.yam.com" ],
parameters:[ "k" ]
},
Eniro:{
domains:[ "www.eniro.se" ],
parameters:[ "q", "search_word" ]
},
APOLL07:{
domains:[ "apollo7.de" ],
parameters:[ "query" ]
},
Biglobe:{
domains:[ "cgi.search.biglobe.ne.jp" ],
parameters:[ "q" ]
},
Mozbot:{
domains:[ "www.mozbot.fr", "www.mozbot.co.uk", "www.mozbot.com" ],
parameters:[ "q" ]
},
ICQ:{
domains:[ "www.icq.com", "search.icq.com" ],
parameters:[ "q" ]
},
Baidu:{
domains:"www.baidu.com www1.baidu.com zhidao.baidu.com tieba.baidu.com news.baidu.com web.gougou.com".split(" "),
parameters:[ "wd", "word", "kw", "k" ]
},
Conduit:{
domains:[ "search.conduit.com" ],
parameters:[ "q" ]
},
Austronaut:{
domains:[ "www2.austronaut.at", "www1.astronaut.at" ],
parameters:[ "q" ]
},
Vindex:{
domains:[ "www.vindex.nl", "search.vindex.nl" ],
parameters:[ "search_for" ]
},
TrovaRapido:{
domains:[ "www.trovarapido.com" ],
parameters:[ "q" ]
},
"Suchmaschine.com":{
domains:[ "www.suchmaschine.com" ],
parameters:[ "suchstr" ]
},
Lycos:{
domains:[ "search.lycos.com", "www.lycos.com", "lycos.com" ],
parameters:[ "query" ]
},
Vinden:{
domains:[ "www.vinden.nl" ],
parameters:[ "q" ]
},
Altavista:{
domains:"www.altavista.com search.altavista.com listings.altavista.com altavista.de altavista.fr be-nl.altavista.com be-fr.altavista.com".split(" "),
parameters:[ "q" ]
},
dmoz:{
domains:[ "dmoz.org", "editors.dmoz.org" ],
parameters:[ "q" ]
},
Ecosia:{
domains:[ "ecosia.org" ],
parameters:[ "q" ]
},
Maxwebsearch:{
domains:[ "maxwebsearch.com" ],
parameters:[ "query" ]
},
Euroseek:{
domains:[ "www.euroseek.com" ],
parameters:[ "string" ]
},
Bing:{
domains:"bing.com www.bing.com msnbc.msn.com dizionario.it.msn.com cc.bingj.com m.bing.com".split(" "),
parameters:[ "q", "Q" ]
},
"X-recherche":{
domains:[ "www.x-recherche.com" ],
parameters:[ "MOTS" ]
},
"Yandex Images":{
domains:[ "images.yandex.ru", "images.yandex.ua", "images.yandex.com" ],
parameters:[ "text" ]
},
GMX:{
domains:[ "suche.gmx.net" ],
parameters:[ "su" ]
},
"Daemon search":{
domains:[ "daemon-search.com", "my.daemon-search.com" ],
parameters:[ "q" ]
},
"Jungle Key":{
domains:[ "junglekey.com", "junglekey.fr" ],
parameters:[ "query" ]
},
Firstfind:{
domains:[ "www.firstsfind.com" ],
parameters:[ "qry" ]
},
Crawler:{
domains:[ "www.crawler.com" ],
parameters:[ "q" ]
},
Holmes:{
domains:[ "holmes.ge" ],
parameters:[ "q" ]
},
Charter:{
domains:[ "www.charter.net" ],
parameters:[ "q" ]
},
Ilse:{
domains:[ "www.ilse.nl" ],
parameters:[ "search_for" ]
},
earthlink:{
domains:[ "search.earthlink.net" ],
parameters:[ "q" ]
},
Qualigo:{
domains:[ "www.qualigo.at", "www.qualigo.ch", "www.qualigo.de", "www.qualigo.nl" ],
parameters:[ "q" ]
},
"El Mundo":{
domains:[ "ariadna.elmundo.es" ],
parameters:[ "q" ]
},
Metager2:{
domains:[ "metager2.de" ],
parameters:[ "q" ]
},
Forestle:{
domains:[ "forestle.org", "www.forestle.org", "forestle.mobi" ],
parameters:[ "q" ]
},
"Search.ch":{
domains:[ "www.search.ch" ],
parameters:[ "q" ]
},
Meinestadt:{
domains:[ "www.meinestadt.de" ],
parameters:[ "words" ]
},
Freshweather:{
domains:[ "www.fresh-weather.com" ],
parameters:[ "q" ]
},
AllTheWeb:{
domains:[ "www.alltheweb.com" ],
parameters:[ "q" ]
},
Zoek:{
domains:[ "www3.zoek.nl" ],
parameters:[ "q" ]
},
Daum:{
domains:[ "search.daum.net" ],
parameters:[ "q" ]
},
Marktplaats:{
domains:[ "www.marktplaats.nl" ],
parameters:[ "query" ]
},
"suche.info":{
domains:[ "suche.info" ],
parameters:[ "q" ]
},
"Google News":{
domains:"news.google.ac news.google.ad news.google.ae news.google.am news.google.as news.google.at news.google.az news.google.ba news.google.be news.google.bf news.google.bg news.google.bi news.google.bj news.google.bs news.google.by news.google.ca news.google.cat news.google.cc news.google.cd news.google.cf news.google.cg news.google.ch news.google.ci news.google.cl news.google.cm news.google.cn news.google.co.bw news.google.co.ck news.google.co.cr news.google.co.id news.google.co.il news.google.co.in news.google.co.jp news.google.co.ke news.google.co.kr news.google.co.ls news.google.co.ma news.google.co.mz news.google.co.nz news.google.co.th news.google.co.tz news.google.co.ug news.google.co.uk news.google.co.uz news.google.co.ve news.google.co.vi news.google.co.za news.google.co.zm news.google.co.zw news.google.com news.google.com.af news.google.com.ag news.google.com.ai news.google.com.ar news.google.com.au news.google.com.bd news.google.com.bh news.google.com.bn news.google.com.bo news.google.com.br news.google.com.by news.google.com.bz news.google.com.co news.google.com.cu news.google.com.cy news.google.com.do news.google.com.ec news.google.com.eg news.google.com.et news.google.com.fj news.google.com.gh news.google.com.gi news.google.com.gt news.google.com.hk news.google.com.jm news.google.com.kh news.google.com.kh news.google.com.kw news.google.com.lb news.google.com.lc news.google.com.ly news.google.com.mt news.google.com.mx news.google.com.my news.google.com.na news.google.com.nf news.google.com.ng news.google.com.ni news.google.com.np news.google.com.om news.google.com.pa news.google.com.pe news.google.com.ph news.google.com.pk news.google.com.pr news.google.com.py news.google.com.qa news.google.com.sa news.google.com.sb news.google.com.sg news.google.com.sl news.google.com.sv news.google.com.tj news.google.com.tn news.google.com.tr news.google.com.tw news.google.com.ua news.google.com.uy news.google.com.vc news.google.com.vn news.google.cv news.google.cz news.google.de news.google.dj news.google.dk news.google.dm news.google.dz news.google.ee news.google.es news.google.fi news.google.fm news.google.fr news.google.ga news.google.gd news.google.ge news.google.gf news.google.gg news.google.gl news.google.gm news.google.gp news.google.gr news.google.gy news.google.hn news.google.hr news.google.ht news.google.hu news.google.ie news.google.im news.google.io news.google.iq news.google.is news.google.it news.google.it.ao news.google.je news.google.jo news.google.kg news.google.ki news.google.kz news.google.la news.google.li news.google.lk news.google.lt news.google.lu news.google.lv news.google.md news.google.me news.google.mg news.google.mk news.google.ml news.google.mn news.google.ms news.google.mu news.google.mv news.google.mw news.google.ne news.google.nl news.google.no news.google.nr news.google.nu news.google.pl news.google.pn news.google.ps news.google.pt news.google.ro news.google.rs news.google.ru news.google.rw news.google.sc news.google.se news.google.sh news.google.si news.google.sk news.google.sm news.google.sn news.google.so news.google.st news.google.td news.google.tg news.google.tk news.google.tl news.google.tm news.google.to news.google.tt news.google.us news.google.vg news.google.vu news.google.ws".split(" "),
parameters:[ "q" ]
},
Zoohoo:{
domains:[ "zoohoo.cz" ],
parameters:[ "q" ]
},
Seznam:{
domains:[ "search.seznam.cz" ],
parameters:[ "q" ]
},
"Online.no":{
domains:[ "online.no" ],
parameters:[ "q" ]
},
Eurip:{
domains:[ "www.eurip.com" ],
parameters:[ "q" ]
},
"all.by":{
domains:[ "all.by" ],
parameters:[ "query" ]
},
"Road Runner Search":{
domains:[ "search.rr.com" ],
parameters:[ "q" ]
},
"Opplysningen 1881":{
domains:[ "www.1881.no" ],
parameters:[ "Query" ]
},
YouGoo:{
domains:[ "www.yougoo.fr" ],
parameters:[ "q" ]
},
"Bing Images":{
domains:[ "bing.com/images/search", "www.bing.com/images/search" ],
parameters:[ "q", "Q" ]
},
Geona:{
domains:[ "geona.net" ],
parameters:[ "q" ]
},
Nate:{
domains:[ "search.nate.com" ],
parameters:[ "q" ]
},
"T-Online":{
domains:[ "suche.t-online.de", "brisbane.t-online.de", "navigationshilfe.t-online.de" ],
parameters:[ "q" ]
},
Hotbot:{
domains:[ "www.hotbot.com" ],
parameters:[ "query" ]
},
Kvasir:{
domains:[ "www.kvasir.no" ],
parameters:[ "q" ]
},
Babylon:{
domains:[ "search.babylon.com", "searchassist.babylon.com" ],
parameters:[ "q" ]
},
Excite:{
domains:"search.excite.it search.excite.fr search.excite.de search.excite.co.uk serach.excite.es search.excite.nl msxml.excite.com www.excite.co.jp".split(" "),
parameters:[ "q", "search" ]
},
qip:{
domains:[ "search.qip.ru" ],
parameters:[ "query" ]
},
"Yahoo!":{
domains:"search.yahoo.com yahoo.com ar.search.yahoo.com ar.yahoo.com au.search.yahoo.com au.yahoo.com br.search.yahoo.com br.yahoo.com cade.searchde.yahoo.com cade.yahoo.com chinese.searchinese.yahoo.com chinese.yahoo.com cn.search.yahoo.com cn.yahoo.com de.search.yahoo.com de.yahoo.com dk.search.yahoo.com dk.yahoo.com es.search.yahoo.com es.yahoo.com espanol.searchpanol.yahoo.com espanol.searchpanol.yahoo.com espanol.yahoo.com espanol.yahoo.com fr.search.yahoo.com fr.yahoo.com ie.search.yahoo.com ie.yahoo.com it.search.yahoo.com it.yahoo.com kr.search.yahoo.com kr.yahoo.com mx.search.yahoo.com mx.yahoo.com no.search.yahoo.com no.yahoo.com nz.search.yahoo.com nz.yahoo.com one.cn.yahoo.com one.searchn.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.search.yahoo.com qc.yahoo.com qc.yahoo.com se.search.yahoo.com se.search.yahoo.com se.yahoo.com search.searcharch.yahoo.com search.yahoo.com uk.search.yahoo.com uk.yahoo.com www.yahoo.co.jp search.yahoo.co.jp www.cercato.it search.offerbox.com ys.mirostart.com".split(" "),
parameters:[ "p", "q" ]
},
"URL.ORGanizier":{
domains:[ "www.url.org" ],
parameters:[ "q" ]
},
Witch:{
domains:[ "www.witch.de" ],
parameters:[ "search" ]
},
"Mister Wong":{
domains:[ "www.mister-wong.com", "www.mister-wong.de" ],
parameters:[ "Keywords" ]
},
Startsiden:{
domains:[ "www.startsiden.no" ],
parameters:[ "q" ]
},
"Web.de":{
domains:[ "suche.web.de" ],
parameters:[ "su" ]
},
Ask:{
domains:"ask.com www.ask.com web.ask.com int.ask.com mws.ask.com uk.ask.com images.ask.com ask.reference.com www.askkids.com iwon.ask.com www.ask.co.uk www.qbyrd.com search-results.com uk.search-results.com www.search-results.com int.search-results.com".split(" "),
parameters:[ "q" ]
},
Centrum:{
domains:[ "serach.centrum.cz", "morfeo.centrum.cz" ],
parameters:[ "q" ]
},
Everyclick:{
domains:[ "www.everyclick.com" ],
parameters:[ "keyword" ]
},
"Google Video":{
domains:[ "video.google.com" ],
parameters:[ "q" ]
},
Delfi:{
domains:[ "otsing.delfi.ee" ],
parameters:[ "q" ]
},
blekko:{
domains:[ "blekko.com" ],
parameters:[ "q" ]
},
Jyxo:{
domains:[ "jyxo.1188.cz" ],
parameters:[ "q" ]
},
Kataweb:{
domains:[ "www.kataweb.it" ],
parameters:[ "q" ]
},
"uol.com.br":{
domains:[ "busca.uol.com.br" ],
parameters:[ "q" ]
},
Arianna:{
domains:[ "arianna.libero.it", "www.arianna.com" ],
parameters:[ "query" ]
},
Mamma:{
domains:[ "www.mamma.com", "mamma75.mamma.com" ],
parameters:[ "query" ]
},
Yatedo:{
domains:[ "www.yatedo.com", "www.yatedo.fr" ],
parameters:[ "q" ]
},
Twingly:{
domains:[ "www.twingly.com" ],
parameters:[ "q" ]
},
"Delfi latvia":{
domains:[ "smart.delfi.lv" ],
parameters:[ "q" ]
},
PriceRunner:{
domains:[ "www.pricerunner.co.uk" ],
parameters:[ "q" ]
},
Rakuten:{
domains:[ "websearch.rakuten.co.jp" ],
parameters:[ "qt" ]
},
Google:{
domains:"www.google.com www.google.ac www.google.ad www.google.com.af www.google.com.ag www.google.com.ai www.google.am www.google.it.ao www.google.com.ar www.google.as www.google.at www.google.com.au www.google.az www.google.ba www.google.com.bd www.google.be www.google.bf www.google.bg www.google.com.bh www.google.bi www.google.bj www.google.com.bn www.google.com.bo www.google.com.br www.google.bs www.google.co.bw www.google.com.by www.google.by www.google.com.bz www.google.ca www.google.com.kh www.google.cc www.google.cd www.google.cf www.google.cat www.google.cg www.google.ch www.google.ci www.google.co.ck www.google.cl www.google.cm www.google.cn www.google.com.co www.google.co.cr www.google.com.cu www.google.cv www.google.com.cy www.google.cz www.google.de www.google.dj www.google.dk www.google.dm www.google.com.do www.google.dz www.google.com.ec www.google.ee www.google.com.eg www.google.es www.google.com.et www.google.fi www.google.com.fj www.google.fm www.google.fr www.google.ga www.google.gd www.google.ge www.google.gf www.google.gg www.google.com.gh www.google.com.gi www.google.gl www.google.gm www.google.gp www.google.gr www.google.com.gt www.google.gy www.google.com.hk www.google.hn www.google.hr www.google.ht www.google.hu www.google.co.id www.google.iq www.google.ie www.google.co.il www.google.im www.google.co.in www.google.io www.google.is www.google.it www.google.je www.google.com.jm www.google.jo www.google.co.jp www.google.co.ke www.google.com.kh www.google.ki www.google.kg www.google.co.kr www.google.com.kw www.google.kz www.google.la www.google.com.lb www.google.com.lc www.google.li www.google.lk www.google.co.ls www.google.lt www.google.lu www.google.lv www.google.com.ly www.google.co.ma www.google.md www.google.me www.google.mg www.google.mk www.google.ml www.google.mn www.google.ms www.google.com.mt www.google.mu www.google.mv www.google.mw www.google.com.mx www.google.com.my www.google.co.mz www.google.com.na www.google.ne www.google.com.nf www.google.com.ng www.google.com.ni www.google.nl www.google.no www.google.com.np www.google.nr www.google.nu www.google.co.nz www.google.com.om www.google.com.pa www.google.com.pe www.google.com.ph www.google.com.pk www.google.pl www.google.pn www.google.com.pr www.google.ps www.google.pt www.google.com.py www.google.com.qa www.google.ro www.google.rs www.google.ru www.google.rw www.google.com.sa www.google.com.sb www.google.sc www.google.se www.google.com.sg www.google.sh www.google.si www.google.sk www.google.com.sl www.google.sn www.google.sm www.google.so www.google.st www.google.com.sv www.google.td www.google.tg www.google.co.th www.google.com.tj www.google.tk www.google.tl www.google.tm www.google.to www.google.com.tn www.google.com.tr www.google.tt www.google.com.tw www.google.co.tz www.google.com.ua www.google.co.ug www.google.ae www.google.co.uk www.google.us www.google.com.uy www.google.co.uz www.google.com.vc www.google.co.ve www.google.vg www.google.co.vi www.google.com.vn www.google.vu www.google.ws www.google.co.za www.google.co.zm www.google.co.zw google.com google.ac google.ad google.com.af google.com.ag google.com.ai google.am google.it.ao google.com.ar google.as google.at google.com.au google.az google.ba google.com.bd google.be google.bf google.bg google.com.bh google.bi google.bj google.com.bn google.com.bo google.com.br google.bs google.co.bw google.com.by google.by google.com.bz google.ca google.com.kh google.cc google.cd google.cf google.cat google.cg google.ch google.ci google.co.ck google.cl google.cm google.cn google.com.co google.co.cr google.com.cu google.cv google.com.cy google.cz google.de google.dj google.dk google.dm google.com.do google.dz google.com.ec google.ee google.com.eg google.es google.com.et google.fi google.com.fj google.fm google.fr google.ga google.gd google.ge google.gf google.gg google.com.gh google.com.gi google.gl google.gm google.gp google.gr google.com.gt google.gy google.com.hk google.hn google.hr google.ht google.hu google.co.id google.iq google.ie google.co.il google.im google.co.in google.io google.is google.it google.je google.com.jm google.jo google.co.jp google.co.ke google.com.kh google.ki google.kg google.co.kr google.com.kw google.kz google.la google.com.lb google.com.lc google.li google.lk google.co.ls google.lt google.lu google.lv google.com.ly google.co.ma google.md google.me google.mg google.mk google.ml google.mn google.ms google.com.mt google.mu google.mv google.mw google.com.mx google.com.my google.co.mz google.com.na google.ne google.com.nf google.com.ng google.com.ni google.nl google.no google.com.np google.nr google.nu google.co.nz google.com.om google.com.pa google.com.pe google.com.ph google.com.pk google.pl google.pn google.com.pr google.ps google.pt google.com.py google.com.qa google.ro google.rs google.ru google.rw google.com.sa google.com.sb google.sc google.se google.com.sg google.sh google.si google.sk google.com.sl google.sn google.sm google.so google.st google.com.sv google.td google.tg google.co.th google.com.tj google.tk google.tl google.tm google.to google.com.tn google.com.tr google.tt google.com.tw google.co.tz google.com.ua google.co.ug google.ae google.co.uk google.us google.com.uy google.co.uz google.com.vc google.co.ve google.vg google.co.vi google.com.vn google.vu google.ws google.co.za google.co.zm google.co.zw search.avg.com isearch.avg.com www.cnn.com darkoogle.com search.darkoogle.com search.foxtab.com www.gooofullsearch.com search.hiyo.com search.incredimail.com search1.incredimail.com search2.incredimail.com search3.incredimail.com search4.incredimail.com search.incredibar.com search.sweetim.com www.fastweb.it search.juno.com find.tdc.dk searchresults.verizon.com search.walla.co.il search.alot.com www.googleearth.de www.googleearth.fr webcache.googleusercontent.com encrypted.google.com googlesyndicatedsearch.com".split(" "),
parameters:[ "q", "query", "Keywords" ]
},
"Google Blogsearch":{
domains:"blogsearch.google.ac blogsearch.google.ad blogsearch.google.ae blogsearch.google.am blogsearch.google.as blogsearch.google.at blogsearch.google.az blogsearch.google.ba blogsearch.google.be blogsearch.google.bf blogsearch.google.bg blogsearch.google.bi blogsearch.google.bj blogsearch.google.bs blogsearch.google.by blogsearch.google.ca blogsearch.google.cat blogsearch.google.cc blogsearch.google.cd blogsearch.google.cf blogsearch.google.cg blogsearch.google.ch blogsearch.google.ci blogsearch.google.cl blogsearch.google.cm blogsearch.google.cn blogsearch.google.co.bw blogsearch.google.co.ck blogsearch.google.co.cr blogsearch.google.co.id blogsearch.google.co.il blogsearch.google.co.in blogsearch.google.co.jp blogsearch.google.co.ke blogsearch.google.co.kr blogsearch.google.co.ls blogsearch.google.co.ma blogsearch.google.co.mz blogsearch.google.co.nz blogsearch.google.co.th blogsearch.google.co.tz blogsearch.google.co.ug blogsearch.google.co.uk blogsearch.google.co.uz blogsearch.google.co.ve blogsearch.google.co.vi blogsearch.google.co.za blogsearch.google.co.zm blogsearch.google.co.zw blogsearch.google.com blogsearch.google.com.af blogsearch.google.com.ag blogsearch.google.com.ai blogsearch.google.com.ar blogsearch.google.com.au blogsearch.google.com.bd blogsearch.google.com.bh blogsearch.google.com.bn blogsearch.google.com.bo blogsearch.google.com.br blogsearch.google.com.by blogsearch.google.com.bz blogsearch.google.com.co blogsearch.google.com.cu blogsearch.google.com.cy blogsearch.google.com.do blogsearch.google.com.ec blogsearch.google.com.eg blogsearch.google.com.et blogsearch.google.com.fj blogsearch.google.com.gh blogsearch.google.com.gi blogsearch.google.com.gt blogsearch.google.com.hk blogsearch.google.com.jm blogsearch.google.com.kh blogsearch.google.com.kh blogsearch.google.com.kw blogsearch.google.com.lb blogsearch.google.com.lc blogsearch.google.com.ly blogsearch.google.com.mt blogsearch.google.com.mx blogsearch.google.com.my blogsearch.google.com.na blogsearch.google.com.nf blogsearch.google.com.ng blogsearch.google.com.ni blogsearch.google.com.np blogsearch.google.com.om blogsearch.google.com.pa blogsearch.google.com.pe blogsearch.google.com.ph blogsearch.google.com.pk blogsearch.google.com.pr blogsearch.google.com.py blogsearch.google.com.qa blogsearch.google.com.sa blogsearch.google.com.sb blogsearch.google.com.sg blogsearch.google.com.sl blogsearch.google.com.sv blogsearch.google.com.tj blogsearch.google.com.tn blogsearch.google.com.tr blogsearch.google.com.tw blogsearch.google.com.ua blogsearch.google.com.uy blogsearch.google.com.vc blogsearch.google.com.vn blogsearch.google.cv blogsearch.google.cz blogsearch.google.de blogsearch.google.dj blogsearch.google.dk blogsearch.google.dm blogsearch.google.dz blogsearch.google.ee blogsearch.google.es blogsearch.google.fi blogsearch.google.fm blogsearch.google.fr blogsearch.google.ga blogsearch.google.gd blogsearch.google.ge blogsearch.google.gf blogsearch.google.gg blogsearch.google.gl blogsearch.google.gm blogsearch.google.gp blogsearch.google.gr blogsearch.google.gy blogsearch.google.hn blogsearch.google.hr blogsearch.google.ht blogsearch.google.hu blogsearch.google.ie blogsearch.google.im blogsearch.google.io blogsearch.google.iq blogsearch.google.is blogsearch.google.it blogsearch.google.it.ao blogsearch.google.je blogsearch.google.jo blogsearch.google.kg blogsearch.google.ki blogsearch.google.kz blogsearch.google.la blogsearch.google.li blogsearch.google.lk blogsearch.google.lt blogsearch.google.lu blogsearch.google.lv blogsearch.google.md blogsearch.google.me blogsearch.google.mg blogsearch.google.mk blogsearch.google.ml blogsearch.google.mn blogsearch.google.ms blogsearch.google.mu blogsearch.google.mv blogsearch.google.mw blogsearch.google.ne blogsearch.google.nl blogsearch.google.no blogsearch.google.nr blogsearch.google.nu blogsearch.google.pl blogsearch.google.pn blogsearch.google.ps blogsearch.google.pt blogsearch.google.ro blogsearch.google.rs blogsearch.google.ru blogsearch.google.rw blogsearch.google.sc blogsearch.google.se blogsearch.google.sh blogsearch.google.si blogsearch.google.sk blogsearch.google.sm blogsearch.google.sn blogsearch.google.so blogsearch.google.st blogsearch.google.td blogsearch.google.tg blogsearch.google.tk blogsearch.google.tl blogsearch.google.tm blogsearch.google.to blogsearch.google.tt blogsearch.google.us blogsearch.google.vg blogsearch.google.vu blogsearch.google.ws".split(" "),
parameters:[ "q" ]
},
Amazon:{
domains:[ "amazon.com", "www.amazon.com" ],
parameters:[ "keywords" ]
},
"Hooseek.com":{
domains:[ "www.hooseek.com" ],
parameters:[ "recherche" ]
},
Dalesearch:{
domains:[ "www.dalesearch.com" ],
parameters:[ "q" ]
},
"Alice Adsl":{
domains:[ "rechercher.aliceadsl.fr" ],
parameters:[ "q" ]
},
"soso.com":{
domains:[ "www.soso.com" ],
parameters:[ "w" ]
},
Sogou:{
domains:[ "www.sougou.com" ],
parameters:[ "query" ]
},
"Hit-Parade":{
domains:[ "req.-hit-parade.com", "class.hit-parade.com", "www.hit-parade.com" ],
parameters:[ "p7" ]
},
SearchCanvas:{
domains:[ "www.searchcanvas.com" ],
parameters:[ "q" ]
},
Interia:{
domains:[ "www.google.interia.pl" ],
parameters:[ "q" ]
},
Tiscali:{
domains:[ "search.tiscali.it", "search-dyn.tiscali.it", "hledani.tiscali.cz" ],
parameters:[ "q", "key" ]
},
Clix:{
domains:[ "pesquisa.clix.pt" ],
parameters:[ "question" ]
}
},
email:{
"Outlook.com":{
domains:[ "mail.live.com" ]
},
"Orange Webmail":{
domains:[ "orange.fr/webmail" ]
},
"Yahoo! Mail":{
domains:[ "mail.yahoo.net", "mail.yahoo.com", "mail.yahoo.co.uk" ]
},
Gmail:{
domains:[ "mail.google.com" ]
}
},
social:{
hi5:{
domains:[ "hi5.com" ]
},
Friendster:{
domains:[ "friendster.com" ]
},
Weibo:{
domains:[ "weibo.com", "t.cn" ]
},
Xanga:{
domains:[ "xanga.com" ]
},
Myspace:{
domains:[ "myspace.com" ]
},
Buzznet:{
domains:[ "wayn.com" ]
},
MyLife:{
domains:[ "mylife.ru" ]
},
Flickr:{
domains:[ "flickr.com" ]
},
"Sonico.com":{
domains:[ "sonico.com" ]
},
Odnoklassniki:{
domains:[ "odnoklassniki.ru" ]
},
GitHub:{
domains:[ "github.com" ]
},
Classmates:{
domains:[ "classmates.com" ]
},
"Friends Reunited":{
domains:[ "friendsreunited.com" ]
},
Renren:{
domains:[ "renren.com" ]
},
"vKruguDruzei.ru":{
domains:[ "vkrugudruzei.ru" ]
},
"Gaia Online":{
domains:[ "gaiaonline.com" ]
},
Netlog:{
domains:[ "netlog.com" ]
},
Orkut:{
domains:[ "orkut.com" ]
},
MyHeritage:{
domains:[ "myheritage.com" ]
},
Multiply:{
domains:[ "multiply.com" ]
},
myYearbook:{
domains:[ "myyearbook.com" ]
},
WeeWorld:{
domains:[ "weeworld.com" ]
},
Geni:{
domains:[ "geni.com" ]
},
SourceForge:{
domains:[ "sourceforge.net" ]
},
Plaxo:{
domains:[ "plaxo.com" ]
},
"Taringa!":{
domains:[ "taringa.net" ]
},
Tagged:{
domains:[ "login.tagged.com" ]
},
XING:{
domains:[ "xing.com" ]
},
Vkontakte:{
domains:[ "vk.com", "vkontakte.ru" ]
},
Twitter:{
domains:[ "twitter.com", "t.co" ]
},
WAYN:{
domains:[ "wayn.com" ]
},
Tuenti:{
domains:[ "tuenti.com" ]
},
"Mail.ru":{
domains:[ "my.mail.ru" ]
},
Badoo:{
domains:[ "badoo.com" ]
},
Habbo:{
domains:[ "habbo.com" ]
},
Pinterest:{
domains:[ "pinterest.com" ]
},
LinkedIn:{
domains:[ "linkedin.com" ]
},
Foursquare:{
domains:[ "foursquare.com" ]
},
Flixster:{
domains:[ "flixster.com" ]
},
"Windows Live Spaces":{
domains:[ "login.live.com" ]
},
BlackPlanet:{
domains:[ "blackplanet.com" ]
},
Cyworld:{
domains:[ "global.cyworld.com" ]
},
Skyrock:{
domains:[ "skyrock.com" ]
},
Facebook:{
domains:[ "facebook.com", "fb.me" ]
},
StudiVZ:{
domains:[ "studivz.net" ]
},
Fotolog:{
domains:[ "fotolog.com" ]
},
"Google+":{
domains:[ "url.google.com", "plus.google.com" ]
},
"Nasza-klasa.pl":{
domains:[ "nk.pl" ]
},
Douban:{
domains:[ "douban.com" ]
},
Bebo:{
domains:[ "bebo.com" ]
},
Reddit:{
domains:[ "reddit.com" ]
},
"Identi.ca":{
domains:[ "identi.ca" ]
},
StackOverflow:{
domains:[ "stackoverflow.com" ]
},
Mixi:{
domains:[ "mixi.jp" ]
},
StumbleUpon:{
domains:[ "stumbleupon.com" ]
},
Viadeo:{
domains:[ "viadeo.com" ]
},
"Last.fm":{
domains:[ "lastfm.ru" ]
},
LiveJournal:{
domains:[ "livejournal.ru" ]
},
Tumblr:{
domains:[ "tumblr.com" ]
},
"Hacker News":{
domains:[ "news.ycombinator.com" ]
},
Qzone:{
domains:[ "qzone.qq.com" ]
},
Hyves:{
domains:[ "hyves.nl" ]
},
"Paper.li":{
domains:[ "paper.li" ]
},
"MoiKrug.ru":{
domains:[ "moikrug.ru" ]
}
}
};
}.call(this), function() {
$B.QueryStringParser = function() {
function e(e) {
var t, n;
if (this.query_params = {}, !document || !document.createElement) throw "This needs to be run in an HTML context with a document.";
t = document.createElement("a"), t.href = e, this.url = e, this.origin = t.origin ? t.origin :[ t.protocol, "//", t.host ].join(""), 
this.protocol = t.protocol, this.pathname = t.pathname, this.hostname = t.hostname, 
this.hash = t.hash, n = this, _.each(t.search.substr(1).split("&"), function(e) {
var t;
return t = e.split("="), n.query_params[t[0]] = t[1];
});
}
return e.prototype.toString = function() {
var e, t;
return t = _.compact(_.map(this.query_params, function(e, t) {
return "undefined" != typeof e && null !== e ? [ t, e ].join("=") :void 0;
})).join("&"), e = [ this.origin, this.pathname ].join(""), t && (e += "?" + t), 
this.hash && (e += this.hash), e;
}, e;
}(), $B.ReferrerParser = function() {
function e(e, t) {
var n;
this.url = t, this.referrers_map = this.loadReferrers(e), this.known = !1, this.referrer = null, 
this.medium = "unknown", this.search_parameter = null, this.search_term = null, 
n = new $B.QueryStringParser(this.url), this.host = n.hostname, this.path = n.pathname, 
this.referrer = this.lookup_referrer(this.host, this.path);
}
return e.prototype.lookup_referrer = function(e) {
var t;
return t = this.referrers_map[e];
}, e.prototype.loadReferrers = function(e) {
var t, n, o, i, r, a, s, l, u, c;
s = {};
for (i in e) {
t = e[i];
for (a in t) for (n = t[a], r = null, n.parameters && (r = $.map(n.parameters, function(e) {
return e.toLowerCase();
})), c = n.domains, l = 0, u = c.length; u > l; l++) o = c[l], s[o] = {
name:a,
medium:i
}, r && (s[o].params = r);
}
return s;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
$B.UserAnalyticsEngine = function() {
function t(t, n, o) {
this.user_id = t, this.user_email = n, this.urlBase = o, this.save = e(this.save, this), 
this.track = e(this.track, this), this.trackWithoutExternalService = e(this.trackWithoutExternalService, this), 
null == this.urlBase && (this.urlBase = $S.global_conf.BOBCAT_ANALYTICS_POST_URL);
}
return t.prototype.trackWithoutExternalService = function(e) {
return this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.track = function(e, t) {
return "function" == typeof $B.log && $B.log("[TRACKING] " + e, t), window.analytics.track(e, t), 
this.user_id && this.user_email ? this.save(this.user_id, e) :void 0;
}, t.prototype.save = function(e, t) {
var n = this;
return $.ajax({
type:"POST",
url:"" + this.urlBase + "/events",
data:{
user_id:e,
event:t
},
success:function(e) {
return "Editor - edit" === t ? _veroq.push([ "user", {
id:n.user_id,
edit_count:e.count
} ]) :void 0;
},
dataType:"json"
});
}, t;
}(), $B.PageAnalyticsEngine = function() {
function t(t) {
this.pageData = t, this.sendPbsConversion = e(this.sendPbsConversion, this), this.sendPbsImpression = e(this.sendPbsImpression, this), 
this.normalizedReferrer = e(this.normalizedReferrer, this), this.sendDataKeenIO = e(this.sendDataKeenIO, this), 
this.logSocialClicks = e(this.logSocialClicks, this), this.logPageView = e(this.logPageView, this), 
this.baseData = {
pageId:this.pageData.page_id,
userId:this.pageData.user_id,
permalink:this.pageData.permalink,
referrer:document.referrer,
membership:this.pageData.membership,
createdAt:this.pageData.created_at,
strikinglyBranding:this.pageData.showStrikinglyLogo
};
}
return t.prototype.pingInterval = 1e4, t.prototype.setInternalTracking = function() {
var e, t;
return (t = $S.page_meta.strk_upvt) ? (e = {
thm:this.pageData.theme.name,
mem:this.pageData.membership,
brd:this.pageData.showStrikinglyLogo,
v:t
}, $("<iframe />", {
name:"strk-tracking",
id:"strk-tracking",
src:"//b.strikingly.com/ping.html?" + $.param(e)
}).appendTo("body")) :void 0;
}, t.prototype.gaPushUserSite = function(e) {
return _gaq.push(e), e[0] = "b." + e[0], _gaq.push(e);
}, t.prototype.trackPageEvent = function() {
var e, t = this;
return e = function(e, n) {
var o;
return o = t, function(t) {
var i, r, a;
return a = $(this), i = {
url:a.attr("href"),
target:a.attr("target"),
text:a.text()
}, window.edit_page.Event.publish(e, i), o.gaPushUserSite([ "_setCustomVar", 1, "url", i.url, 3 ]), 
o.gaPushUserSite([ "_setCustomVar", 2, "text", i.text, 3 ]), o.gaPushUserSite([ "_trackEvent", "Actions", n.gaEventName, i.text ]), 
r = "string" == typeof i.url && "#" !== i.url[0], i.url && "_blank" !== i.target && r ? (t.preventDefault(), 
setTimeout(function() {
return window.location.href = i.url;
}, 500)) :void 0;
};
}, $("[data-component='button']").click(e("Site.button.click", {
gaEventName:"ButtonClick"
}));
}, t.prototype.logPageView = function() {
var e, t, n, o, i;
e = _.extend({
eventName:"PageView"
}, this.baseData), t = 1, i = this.baseData;
for (n in i) o = i[n], this.gaPushUserSite([ "_setCustomVar", t, n, o, 3 ]), ++t;
return this.gaPushUserSite([ "_trackEvent", "Page", e.eventName ]), this.sendDataKeenIO(this.baseData);
}, t.prototype.logSocialClicks = function(e) {
var t;
return t = _.extend({
eventName:"SocialClicks",
channel:e
}, this.baseData);
}, t.prototype.sendDataKeenIO = function(e) {
var t, n;
return n = e.referrer.split("/")[2], t = _.extend({
keen:{
addons:[ {
name:"keen:ip_to_geo",
input:{
ip:"ip_address"
},
output:"ip_geo_info"
}, {
name:"keen:ua_parser",
input:{
ua_string:"user_agent"
},
output:"parsed_user_agent"
} ]
},
ip_address:"${keen.ip}",
user_agent:"${keen.user_agent}",
host:document.location.host,
referrer_host:n,
normalized_referrer:this.normalizedReferrer(e.referrer)
}, e), Keen.addEvent($S.conf.keenio_collection, t);
}, t.prototype.normalizedReferrer = function(e) {
var t, n;
return t = new $B.ReferrerParser($B.referrers_source, e), (null != (n = t.referrer) ? n.name :void 0) || t.url || "Direct Traffic";
}, t.prototype.sendPbsImpression = function(e) {
return $B.log("[PBS] Impression", e), Keen.addEvent($S.conf.keenio_pbs_impression_collection, e);
}, t.prototype.sendPbsConversion = function(e) {
return $B.log("[PBS] Conversion", e), Keen.addEvent($S.conf.keenio_pbs_conversion_collection, e);
}, t.prototype.trackUserPageEvent = function(e, t) {
return $B.log("User Page Event Tracking", e, t), Keen.addEvent(e, t);
}, t;
}();
}.call(this), function() {
var e = {}.hasOwnProperty, t = function(t, n) {
function o() {
this.constructor = t;
}
for (var i in n) e.call(n, i) && (t[i] = n[i]);
return o.prototype = n.prototype, t.prototype = new o(), t.__super__ = n.prototype, 
t;
}, n = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
window.partial = function(e, t) {
return _.template($("#" + e + "-partial").html(), t);
}, Bobcat.IndexGenerator = function() {
function e() {
this.currentIndex = 0;
}
return e.prototype.increment = function() {
return this.currentIndex += 1;
}, e.prototype.getNext = function() {
var e;
return e = this.currentIndex, this.increment(), "model" + e;
}, e;
}(), Bobcat.PageTransformer = function() {
function e(e, t) {
this.domTree = e, this.isEdit = t, this.textTransformer = new Bobcat.TextTransformer(), 
this.imageTransformer = new Bobcat.ImageTransformer(), this.htmlTransformer = new Bobcat.HtmlTransformer();
}
return e.prototype.transform = function() {
var e, t, n, o, i, r, a, s, l, u, c, d, h, p, g, m;
for (p = this.domTree.find("[data-component='repeatable_item_template']"), r = 0, 
u = p.length; u > r; r++) n = p[r], t = $(n), $("<div id='" + t.attr("id") + "_temp' style='display:none;'>" + t.html() + "</div>").appendTo(this.domTree);
for (this.indexGenerator = new Bobcat.IndexGenerator(), i = [ this.textTransformer, this.imageTransformer, this.htmlTransformer ], 
a = 0, c = i.length; c > a; a++) o = i[a], o.indexGenerator = this.indexGenerator;
for (s = 0, d = i.length; d > s; s++) o = i[s], o.transform(this.domTree, this.isEdit);
for (g = this.domTree.find("[data-component='repeatable_item_template']"), m = [], 
l = 0, h = g.length; h > l; l++) n = g[l], t = $(n), e = $("#" + t.attr("id") + "_temp"), 
$.browser.msie && parseInt($.browser.version) > 7 && e.find("*").filter(function() {
return "" !== $(this).attr("class");
}).addClass("ie-fix"), n.text = e.html(), m.push(e.remove());
return m;
}, e;
}(), Bobcat.Transformer = function() {
function e() {}
return e.prototype.validateName = function(e) {
return null == e.attr("data-name") && (this.warning("The following DOM doesn't have data-name."), 
this.warning(e)), !0;
}, e.prototype.getDataName = function(e) {
var t;
return t = e.attr("data-name"), t || (t = this.indexGenerator.getNext()), t;
}, e.prototype.clearDom = function(e) {
return e.html("");
}, e.prototype.isEditable = function(e) {
var t;
return t = e.attr("data-show"), "true" !== t;
}, e.prototype.warning = function(e) {
return console.warn(e);
}, e.prototype.error = function(e) {
return console.error(e);
}, e;
}(), Bobcat.TextTransformer = function(e) {
function o() {}
return t(o, e), o.prototype.transform = function(e, t) {
var n = this;
return this.domTree = e, this.isEdit = null != t ? t :!1, this.domTree.find("[data-component='text']").each(function(e, t) {
var o;
return o = $(t), n.validate(o) ? n.isEdit && n.isEditable(o) ? n.transformToEditable(o) :n.transformToShow(o) :void 0;
});
}, o.prototype.getTextType = function(e) {
var t;
if (t = e.attr("data-text-type")) {
if ("heading" === t) return "headingFont";
if ("title" === t) return "titleFont";
if ("navigation" === t) return "navFont";
}
return "bodyFont";
}, o.prototype.getUseFont = function(e) {
var t;
return t = e.attr("data-use-font"), "false" === t ? !1 :!0;
}, o.prototype.buildData = function(e) {
var t, n, o, i;
return t = e.html(), n = this.getDataName(e), o = this.getTextType(e), i = this.getUseFont(e), 
{
content:t,
name:n,
textType:o,
useFont:i
};
}, o.prototype.transformToShow = function(e) {
var t, n;
return t = this.buildData(e), e.addClass("text-component").html(""), n = $.trim(_.template($("#textContent-partial").html())(t)), 
$(n).appendTo(e);
}, o.prototype.transformToEditable = function(e) {
var t, n;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable text-component"), 
e.attr("data-text-type", "" + t.textType), e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-text': " + t.name + ".showEmptyText()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#textEditor").html())(t)), $(n).appendTo(e);
}, o.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateTextType(e);
}, o.prototype.validateTextType = function(e) {
var t, o, i, r;
return i = !0, o = e.attr("data-text-type"), t = [ "body", "heading", "title", "navigation" ], 
o && (r = !o, n.call(t, r) >= 0 && (i = !1, this.warning("data-text-type should be one of " + t.join(", ")), 
this.warning(e))), i;
}, o;
}(Bobcat.Transformer), Bobcat.ImageTransformer = function(e) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return t(n, e), n.prototype.transform = function(e, t) {
var n = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='image']").each(function(e, t) {
var o;
return o = $(t), n.validate(o) ? n.isEdit && n.isEditable(o) ? n.transformToEditable(o) :n.transformToShow(o) :void 0;
});
}, n.prototype.validate = function(e) {
var t;
return t = this.validateName(e) && this.validateUrl(e) && this.validateImageSize(e) && this.validateThumbSize(e);
}, n.prototype.getImageDom = function(e) {
return e.imageDom ? e.imageDom :e.imageDom = e.find("img").first();
}, n.prototype.validateUrl = function(e) {
return "undefined" == typeof this.getImageDom(e).attr("src") ? (this.error("img doesn't have a src"), 
this.error(this.getImageDom(e)), !1) :!0;
}, n.prototype.transformToEditable = function(e) {
var t, n;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable image-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "css: {'empty-image':!" + t.name + ".hasContent()},      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#imageEditor").html())(t)), $(n).appendTo(e);
}, n.prototype.transformToShow = function(e) {
var t, n;
return t = this.buildData(e), e.html(""), n = $.trim(_.template($("#imageContent-partial").html())(t)), 
$(n).appendTo(e);
}, n.prototype.validateSize = function(e) {
return "small" === e || "medium" === e || "large" === e || "background" === e ? !0 :/^\d+x\d+[><^#]+$/.test(e) ? !0 :"undefined" == typeof e ? !0 :!1;
}, n.prototype.validateThumbSize = function(e) {
var t, n;
return t = e.attr("data-thumb-size"), n = this.validateSize(t), n || (this.warning("size format is wrong"), 
this.warning(e)), n;
}, n.prototype.validateImageSize = function(e) {
var t, n;
return t = e.attr("data-image-size"), n = this.validateSize(t), n || (this.warning("size format is wrong"), 
this.warning(e)), n;
}, n.prototype.getImageSize = function(e) {
var t;
return t = e.attr("data-image-size"), t || (t = "medium");
}, n.prototype.getThumbSize = function(e) {
var t;
return t = e.attr("data-thumb-size"), t || (t = "128x128#");
}, n.prototype.getHasUrl = function(e) {
var t;
return t = e.attr("data-use-url"), "true" === t;
}, n.prototype.getAssetType = function(e) {
var t;
return t = e.attr("data-asset-type"), null == t ? "" :t;
}, n.prototype.getAssetUrls = function(e) {
var t, n;
if (n = e.attr("data-assets"), null == n) switch (this.getAssetType(e)) {
case "black-social":
t = [ "http://uploads.striking.ly/page/images/icons/fb-icon.png", "http://uploads.striking.ly/page/images/icons/twitter-icon.png", "http://uploads.striking.ly/page/images/icons/gplus-icon.png" ];
break;

case "brown-social":
t = [ "http://assets.strikingly.com/static/icons/brown/fb-icon.png", "http://assets.strikingly.com/static/icons/brown/twitter-icon.png", "http://assets.strikingly.com/static/icons/brown/gplus-icon.png" ];
break;

case "flat-circle-160-free":
t = [ "http://assets.strikingly.com/static/icons/flat-circle-160/44.png", "http://assets.strikingly.com/static/icons/flat-circle-160/52.png", "http://assets.strikingly.com/static/icons/flat-circle-160/172.png" ];
break;

default:
t = [];
} else t = n.split(" ");
return t;
}, n.prototype.buildData = function(e) {
var t, n, o, i, r, a, s, l, u;
return l = this.getImageDom(e).attr("src"), o = this.getImageDom(e).attr("alt"), 
r = this.getDataName(e), t = this.getAssetType(e), n = this.getAssetUrls(e), a = this.getImageSize(e), 
s = this.getThumbSize(e), u = this.getHasUrl(e), o || (o = ""), i = {
url:l,
caption:o,
name:r,
imageSize:a,
useUrl:u,
thumbSize:s,
assetType:t,
assetUrls:n
};
}, n;
}(Bobcat.Transformer), Bobcat.HtmlTransformer = function(e) {
function n() {}
return t(n, e), n.prototype.transform = function(e, t) {
var n = this;
return this.domTree = e, this.isEdit = t, this.domTree.find("[data-component='html']").each(function(e, t) {
var o;
return o = $(t), n.validate(o) ? n.isEdit && n.isEditable(o) ? n.transformToEditable(o) :n.transformToShow(o) :void 0;
});
}, n.prototype.validate = function(e) {
var t;
return t = this.validateName(e);
}, n.prototype.transformToEditable = function(e) {
var t, n;
return t = this.buildData(e), this.clearDom(e), e.addClass("editable html-component"), 
e.attr("data-name", "" + t.name), e.attr("data-bind", "      mouseenter: " + t.name + ".mouseenterHandler,      mouseleave: " + t.name + ".mouseleaveHandler,      mouseclick: " + t.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#htmlEditor").html())(t)), $(n).appendTo(e);
}, n.prototype.buildData = function(e) {
return {
name:this.getDataName(e)
};
}, n.prototype.transformToShow = function() {}, n;
}(Bobcat.Transformer);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
Bobcat.ShowPage = function() {
function t(t) {
this.checkIframe = e(this.checkIframe, this), this.initAfterBindings = e(this.initAfterBindings, this), 
this.initBindings = e(this.initBindings, this), this.data = new Bobcat.PageData(t), 
this.Event = new Bobcat.Event(), this.unsavedChanges = ko.observable(!1), this.isShowPage = !0;
}
return t.prototype.initBindings = function() {
return ko.applyBindings(this), this.data.bindSlides();
}, t.prototype.initAfterBindings = function() {
var e, t, n, o;
for (Bobcat.TH.initPageHelpers(), o = window.runAfterDomBinding.getAllJobs(), t = 0, 
n = o.length; n > t; t++) (e = o[t])();
return this.checkIframe();
}, t.prototype.registerUserAnalytics = function() {
return $B.siteMeta("google_analytics_tracker") && (_gaq.push([ "b._trackPageview" ]), 
_gaq.push([ "b._setAccount" ], $B.siteMeta("google_analytics_tracker"))), $B.siteMeta("custom_domain") ? _gaq.push([ "b._setDomainName", $B.siteMeta("custom_domain") ]) :void 0;
}, t.prototype.checkIframe = function() {
var e, t;
return window.top.location !== window.location && document.referrer && (t = $B.meta("strikingly-host-suffix"), 
t && (e = $.url(document.referrer).attr("host"), !e.match("" + t + "$"))) ? (alert("Framing is not allowed with free account. Redirecting to Strikingly.com. Please contact support@strikingly.com if you have any questions."), 
window.top.location = window.location) :void 0;
}, t;
}();
}.call(this), function() {
window.$B = window.Bobcat || {}, $B.TH = {
fixNavOnScroll:function(e, t, n) {
var o, i;
return null == n && (n = 0), $B.TH.isSmallScreen() ? void 0 :(o = function() {
return $("ul.slides li.slide").css({
"padding-top":0
}), $B.TH.isSmallScreen() ? e.css("position", "static") :(e.css("position", "fixed"), 
$("ul.slides li.slide").first().css({
"padding-top":e.outerHeight(!1)
}));
}, i = function() {
var o, i, r, a;
return i = e.outerHeight() - t.height() - n, 0 !== e.length ? (o = $(window).height(), 
r = e.height(), a = $(window).scrollTop(), a > i && (a = i), $(".demo-bar-spacer").length && (a -= $(".demo-bar-spacer").outerHeight()), 
e.stop().animate({
top:-a
})) :void 0;
}, $(window).scroll(i), $(window).resize(o), setTimeout(o, 2e3), o());
},
isMobile:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(windows phone)|(iemobile)/i);
},
isAndroid:function() {
return navigator.userAgent.match(/(android)/i);
},
isWindowsPhone:function() {
return navigator.userAgent.match(/(windows phone)|(iemobile)/i);
},
isIpad:function() {
return navigator.userAgent.match(/(iPad)/i);
},
isIOS:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);
},
isSmallScreen:function() {
return $(window).width() <= 727 || $(window).height() < 400;
},
iOSversion:function() {
var e, t;
return /iP(hone|od|ad)/.test(navigator.platform) ? (e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), 
t = [ parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10) ], t[0]) :void 0;
},
androidVersion:function() {
var e;
return $B.TH.isAndroid() ? (e = navigator.userAgent, parseFloat(e.slice(e.indexOf("Android") + 8))) :void 0;
},
isAndroid2x:function() {
return $B.TH.isAndroid() && $B.TH.androidVersion() < 3;
},
shiftBody:function(e) {
var t, n;
return n = $("#s-content"), t = $("body"), e ? n.addClass("translate-" + e) :n.removeClass("translate-right translate-left"), 
t.css({
overflow:"visible",
"overflow-x":"visible"
}), n.css({
width:"auto"
});
},
shiftDrawer:function(e, t, n, o) {
return null == e && (e = 0), null == t && (t = !1), null == n && (n = 450), null == o && (o = "easeInOutQuart"), 
$(".navbar-drawer").toggleClass("translate");
},
shiftMobileDrawer:function(e, t, n, o) {
var i;
return null == e && (e = 0), null == t && (t = !1), null == n && (n = 450), null == o && (o = "easeInOutQuart"), 
i = $(".mobile-drawer"), t ? i.css({
right:e
}) :i.animate({
right:e
}, n, o);
},
toggleDrawer:function(e) {
var t, n, o, i, r, a, s, l;
return null == e && (e = !0), i = $(".navbar-drawer"), r = $(".navbar-drawer-bar"), 
o = $("#s-content"), $B.TH.canAnimateCSS() ? (s = "translate", t = "translate-left", 
n = "translate-right") :(s = "shown", t = "left", n = "right"), i.hasClass(s) ? (r.removeClass(t + " " + n), 
i.removeClass(s)) :(r.removeClass(t).addClass(n), i.addClass(s)), a = $(".mobile-actions"), 
a.removeClass(s), $B.TH.androidVersion() < 3 && (l = $(window).scrollTop(), $("#nav-drawer-list").attr("data-top", l)), 
i.css("top", 1), setTimeout(function() {
return i.css("top", 0);
}, 100);
},
toggleMobileDrawer:function(e) {
var t, n;
return null == e && (e = !0), t = $(".mobile-actions"), 0 !== t.length ? (n = $B.TH.canAnimateCSS() ? "translate" :"shown", 
t.hasClass(n) ? t.removeClass(n) :t.addClass(n)) :void 0;
},
detectCSSFeature:function(e) {
var t, n, o, i, r, a, s;
if (o = !1, t = "Webkit Moz ms O".split(" "), n = document.createElement("div"), 
e = e.toLowerCase(), i = e.charAt(0).toUpperCase() + e.substr(1), void 0 !== n.style[e]) return !0;
for (a = 0, s = t.length; s > a; a++) if (r = t[a], void 0 !== n.style[r + i]) return !0;
return !1;
},
canAnimateCSS:function() {
return $B.TH.detectCSSFeature("transform") && !$B.TH.isAndroid2x() && !$B.TH.isWindowsPhone();
},
isIE:function() {
var e;
return e = navigator.userAgent.toLowerCase(), -1 !== e.indexOf("msie") ? parseInt(e.split("msie")[1]) :!1;
},
enableAnimationForBlocks:function(e, t) {
return null == e && (e = "75%"), null == t && (t = !1), t || window.edit_page.isShowPage && !$B.TH.isMobile() && !($B.TH.isIE() && $B.TH.isIE() <= 9) ? ($(".fadeInUp").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInUp");
}, 5e3);
}, {
offset:e
}), $(".fadeInRight").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInRight");
}, 5e3);
}, {
offset:e
}), $(".fadeInLeft").css("opacity", "0").waypoint(function() {
var e = this;
return $(this).addClass("animated").waypoint("destroy"), setTimeout(function() {
return $(e).css("opacity", 1).removeClass("fadeInLeft");
}, 5e3);
}, {
offset:e
})) :$(".fadeInUp, .fadeInRight, .fadeInLeft").css("opacity", 1);
},
applyTouchNav:function() {
var e, t, n;
return $B.getCustomization("disableMobileNav") ? $(".strikingly-nav-spacer").hide() :(e = $(".navbar-touch").first(), 
$(".navbar-drawer").length && (n = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").removeClass("hidden"), 
$(".mobile-actions").css({
height:$(".mobile-actions").height()
}), $("body").bind("touchstart", function() {}).attr("ontouchstart", "").attr("screen_capture_injected", "true"), 
$B.TH.isAndroid2x() ? $(window).height() < n.height() && (n.css({
overflow:"visible",
height:"auto"
}), $(window).scroll(function() {
var e, t, o, i;
return e = parseInt(n.attr("data-top"), 10), e || 0 === e ? (i = $(window).scrollTop(), 
o = e - i, o > 0 && (o = 0), t = $(window).height() - n.height(), t > o && (o = t), 
n.css({
top:o
})) :void 0;
})) :n.height($(window).height()), $B.TH.canAnimateCSS() && $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").addClass("strikingly-nav-transition"), 
t = $(".navbar-drawer-bar .navbar-drawer-title"), t.width() < 170 && t.height() < 20 && t.addClass("big"))), 
$(window).resize(function() {
return n = $("#nav-drawer-list"), $B.TH.isAndroid2x() || n.height($(window).height()), 
$(".navbar-drawer").hasClass("shown") || $(".navbar-drawer").hasClass("translate") ? $B.TH.toggleDrawer() :void 0;
});
},
enableSlider:function(e) {
var t, n, o, i, r, a, s, l, u, c;
return i = $.extend({
fullscreen:!1,
padding:100
}, e), n = function(e, t) {
return e.find(".selector.selected").removeClass("selected"), e.find(".selector:eq(" + (t.currentSlideNumber - 1) + ")").addClass("selected");
}, t = function(e) {
var t;
return t = "strikingly-dark-text", e.css("background-image") && -1 !== e.css("background-image").indexOf("/icons/transparent.png") ? e.closest(".wide").addClass(t) :e.hasClass(t) ? e.closest(".wide").addClass(t) :e.closest(".wide").removeClass(t);
}, u = function(e) {
var o, i, r;
return i = e.sliderObject, n(i.closest(".iosslider").find(".slide-selectors"), e), 
e.slideChanged ? e.data.numberOfSlides < 2 ? !1 :(t(e.currentSlideObject), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() || (null != (r = $.browser) ? r.chrome :void 0) ? e.currentSlideObject.find(".animated").css({
opacity:1
}) :(o = i.find(".fadeIn, .fadeInLeft, .fadeInRight").css({
opacity:1
}), setTimeout(function() {
return o.animate({
opacity:0
}, {
duration:300
});
}, 10), o.removeClass("fadeIn fadeInLeft fadeInRight"), e.prevSlideNumber < e.currentSlideNumber && 1 === Math.abs(e.currentSlideNumber - e.prevSlideNumber) || e.prevSlideNumber > e.currentSlideNumber && Math.abs(e.currentSlideNumber - e.prevSlideNumber) > 1 ? (e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInRight"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInRight");
}, 100)) :(e.currentSlideObject.find('.animated:not(".slow")').addClass("fadeInLeft"), 
setTimeout(function() {
return e.currentSlideObject.find(".animated.slow").addClass("fadeInLeft");
}, 100)))) :!1;
}, c = function(e) {
var o, i;
return o = e.sliderObject, n(o.closest(".iosslider").find(".slide-selectors"), e), 
o.find(".animated").removeClass("fadeIn fadeInLeft fadeInRight"), $B.TH.isIE() && !($B.TH.isIE() > 9) || $B.TH.isMobile() || (null != (i = $.browser) ? i.chrome :void 0) ? o.find(".animated").css({
opacity:1
}) :(o.find(".animated").css({
opacity:0
}), $(e.currentSlideObject).find(".animated").addClass("fadeIn")), u(e), t(e.currentSlideObject);
}, o = function(e) {
var t, n, o;
return n = e.data("auto-play"), t = !1, o = !0, window.edit_page.isShowPage && (t = !0, 
o = !1), e.iosSlider({
responsiveSlideContainer:!0,
responsiveSlides:!0,
snapToChildren:!0,
desktopClickDrag:!1,
infiniteSlider:!0,
autoSlide:t,
autoSlideTimer:n,
onSliderLoaded:c,
onSlideChange:u,
navSlideSelector:e.find(".slide-selectors .selector-wrapper"),
navPrevSelector:e.find(".prev-button"),
navNextSelector:e.find(".next-button"),
disableActionOnSelectorClicked:o
}), e.find(".slider").css({
"min-height":300
}), s(e), e.find("img").one("load", function() {
return a();
}).each(function() {
return this.complete ? $(this).load() :void 0;
});
}, s = function(e) {
var t;
return t = e ? e.closest(".slider-container") :$(".slider-container"), t.each(function() {
var e, t, n, o, r;
return e = $(this), n = function(t) {
return e.find(".item").each(function() {
var e;
return e = $(this).find(".inner").first(), t(e);
});
}, o = 0, n(function(e) {
var t;
return t = e.outerHeight(), o = Math.max(o, t);
}), t = $B.TH.isSmallScreen() ? .8 * i.padding :i.padding, i.fullscreen || e.find(".iosslider").hasClass("full-screen") ? (r = $(window).height(), 
o = Math.max(r, o), o > r && (o += 2 * (t - 1))) :o += 2 * (t - 1), n(function(e) {
var t, n;
return t = e.outerHeight(), n = Math.max(0, .5 * (o - t)), e.css({
"margin-top":n - 15,
"margin-bottom":n + 15
});
}), $(this).find(".iosslider").css({
"min-height":"" + o + "px"
}), setTimeout(function() {
return window.edit_page.isShowPage ? e.find(".iosslider").height(o) :e.find(".iosslider").iosSlider("update");
}, 300);
});
}, a = $B.debounce(s, 100), $(window).resize(function() {
return a();
}), $(window).bind("repaint-slider", function() {
return a();
}), r = function(e, t) {
return t ? s(t) :a();
}, l = function(e, t) {
var n, o;
return null != (n = window.edit_page) ? null != (o = n.Event) ? o.subscribe(e, t || r) :void 0 :void 0;
}, l("Editor.SideMenu.Opened"), l("Editor.SideMenu.Closed"), l("Slider.ContentChanged"), 
l("Slide.afterAdd", function(e, t) {
var n;
return n = t.target.find(".iosslider"), n.length > 0 ? (o(n), s(n)) :void 0;
}), $(".iosslider").each(function() {
return o($(this));
});
},
matchHeights:function(e) {
var t, n, o, i;
if (e && ("string" == typeof e && (e = $(e)), 0 !== e.length)) {
o = {}, n = 0, e.each(function() {
var e;
return e = $(this), n = e.offset().top + "", o[n] = o[n] ? o[n].add(e) :e;
}), i = [];
for (n in o) t = o[n], i.push($B.TH.matchHeightsAll(t));
return i;
}
},
matchHeightsAll:function(e) {
var t;
return e.css("height", "auto"), e.length <= 1 || (t = 0, e.each(function() {
var e;
return e = $(this).height(), e > t ? t = e :void 0;
}), 5 > t) ? void 0 :e.each(function() {
var e, n;
return n = $(this), n.css("height", t), e = n.find("img"), "" === $.trim(n.text()) && e.length ? (e.css("vertical-align", "middle"), 
n.css("line-height", t + "px")) :void 0;
});
},
applyMatchHeights:function(e, t) {
var n, o;
return null == e && (e = ".s-mhi"), null == t && (t = ".s-mh"), n = function(n) {
return null == n && (n = !0), $(t).each(function() {
var t, o, i, r;
return t = $(this), i = t.find(e), o = $(this).find("img"), r = $(this).find("img.lazy"), 
r.length ? r.on("afterAppear", function() {
return $B.TH.matchHeights(i);
}) :o.length && n ? $(this).waitForImages(function() {
return $B.TH.matchHeights(i);
}) :$B.TH.matchHeights(i);
});
}, $(window).resize(function() {
return n(!1);
}), n(!0), window.edit_page.isShowPage ? void 0 :(o = function(n, o) {
var i, r, a;
if (o && (r = o.target, a = r.closest(t), a.length)) return i = a.find(e), $B.TH.matchHeights(i);
}, window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", o), window.edit_page.Event.subscribe("ImageComponent.afterChange", o), 
window.edit_page.Event.subscribe("Repeatable.add", o), window.edit_page.Event.subscribe("Repeatable.remove", o), 
window.edit_page.Event.subscribe("Repeatable.afterReorder", o));
},
fitText:function(e) {
return 0 !== e.length ? e.each(function() {
var e, t, n, o, i;
return i = $(this), o = i.width(), n = parseInt(i.css("font-size")), e = i.css({
position:"absolute"
}).width(), i.css({
position:"relative"
}), o >= e ? void 0 :(t = n * o / e, i.css({
"font-size":t
}));
}) :void 0;
},
isTouchDevice:function() {
try {
return document.createEvent("TouchEvent"), !0;
} catch (e) {
return !1;
}
},
touchScroll:function(e) {
var t;
return $B.TH.isTouchDevice() ? (t = 0, e.addEventListener("touchstart", function(e) {
return t = this.scrollTop + e.touches[0].pageY;
}, !1), e.addEventListener("touchmove", function(e) {
return this.scrollTop = t - e.touches[0].pageY;
}, !1)) :void 0;
},
resizeIFrame:function(e) {
var t, n, o, i, r;
if (1 !== e.data("height-binding-complete")) return e.data("height-binding-complete", 1), 
(null != (n = $.browser) ? n.safari :void 0) || (null != (o = $.browser) ? o.opera :void 0) ? (e.load(function() {
var t;
return t = function() {
return e.height(e.contents().find("body").height() + "px");
}, setTimeout(t, 1);
}), t = e[0].src, e[0].src = "", e[0].src = t) :e.load(function() {
return setTimeout(function() {
return e.height(e.contents().find("body").height() + "px");
}, 100);
}), "complete" === (null != (i = e.contents()) ? null != (r = i[0]) ? r.readyState :void 0 :void 0) && e.height() < e.contents().contents().eq(1).height() ? e.height(e.contents().contents().eq(1).height() + "px") :void 0;
},
adjustIFrameHeight:function() {
return $("iframe.s-show-frame").each(function() {
return $B.TH.resizeIFrame($(this));
});
},
enableParallax:function(e, t) {
return null == t && (t = !1), $B.TH.isMobile() || $B.TH.isSmallScreen() ? void 0 :($(window).scroll(function() {
var n, o, i;
return o = $(document).scrollTop(), i = $(window).height(), n = $(document).height(), 
e.each(function() {
var e, r, a, s, l, u, c;
if ($(this).css("background-image").length) return l = $(this), t ? (r = 0, e = n - i) :(c = l.offset().top, 
u = l.outerHeight(), r = c - i, e = c + u), s = e - r, a = 100 - .01 * ~~(1e4 * (o - r) / s), 
t && (a = 100 - a), a >= 0 && 100 >= a ? l.css({
backgroundPosition:"49.5% " + a + "%"
}) :void 0;
});
}), $(window).scroll());
},
getBackgroundImageSize:function(e, t) {
var n, o, i;
return o = null != (i = e.css("background-image")) ? i.split(/[()]/gi)[1] :void 0, 
o = o.replace(/"/g, ""), o ? (n = new Image(), n.onload = function() {
return t ? t({
width:this.width,
height:this.height
}) :void 0;
}, n.src = o) :null;
},
containBackgroundImages:function(e) {
return e.each(function() {
var e;
return e = $(this), "contain" === e.css("background-size") && "" === $.trim(e.text()) ? $B.TH.getBackgroundImageSize(e, function(t) {
var n, o, i;
return i = t.width, n = t.height, o = e.width() / i * n, e.css({
height:o,
"min-height":o
}), e.addClass("no-resize").removeClass("resize"), e.css("padding", 0);
}) :void 0;
});
},
setupStrikinglyLogo:function(e) {
var t, n, o, i, r, a, s, l, u, c, d;
return null == e && (e = -1), o = $(window), t = $(document), n = $($B.DOM.STRIKINGLY_LOGO), 
l = 4, -1 === e ? (u = "undefined" != typeof $ && null !== $ ? "function" == typeof $.cookie ? $.cookie("pbsVariationId") :void 0 :void 0) ? $B.TH.pbsVariationId = parseInt(u) :($B.TH.pbsVariationId = ~~(Math.random() * l), 
"undefined" != typeof $ && null !== $ && "function" == typeof $.cookie && $.cookie("pbsVariationId", $B.TH.pbsVariationId, {
expires:3
})) :($B.TH.pbsVariationId = e, "undefined" != typeof $ && null !== $ && "function" == typeof $.cookie && $.cookie("pbsVariationId", $B.TH.pbsVariationId, {
expires:3
})), $B.TH.pbsVariationId = 1, -1 !== e || n && n.is(":visible") ? ($(".logo-footer, .logo-footer-var2, .logo-footer-var3").hide(), 
$B.TH.isMobile() ? (n.css({
bottom:-100,
position:"fixed"
}).show(), r = !1, o.scroll(function() {
return r = !0;
}), setInterval(function() {
var e;
if (r) {
if (e = t.height() - o.height() - 20, r = !1, o.scrollTop() >= e) return n.animate({
bottom:-20
}, 1e3, "easeInOutBack");
if (o.scrollTop() < e) return n.animate({
bottom:-100
}, 1e3, "easeInOutBack");
}
}, 250)) :(1 === $B.TH.pbsVariationId && (a = $(".logo-link").attr("href"), a = a.replace("pbs_v0", "pbs_v1"), 
$(".logo-link").attr("href", a)), 0 === $B.TH.pbsVariationId || 1 === $B.TH.pbsVariationId ? ($(".logo-footer").show(), 
i = -90, n.css({
bottom:i,
position:"fixed"
}).hide(), d = 500, c = 100, o.scroll(function() {
var e, r, a, s, l;
return a = "free" === (null != (s = $S.page_meta) ? null != (l = s.user) ? l.membership :void 0 :void 0) ? o.height() + 100 :t.height() - d - 290, 
e = t.scrollTop() + o.height() + c, e > a + i ? (r = i + (e - a) / d * 60, r > -10 && (r = -10), 
i > r && (r = i), n.css({
bottom:r
}).show()) :n.css({
bottom:i
});
}), n.mouseover(function() {
return n.find(".logo-footer-tooltip").addClass("hover");
}), n.mouseout(function() {
return n.find(".logo-footer-tooltip").removeClass("hover");
})) :2 === $B.TH.pbsVariationId ? ($(".logo-footer-var2").show(), o.scroll(function() {
var e, n, i;
return e = "free" === (null != (n = $S.page_meta) ? null != (i = n.user) ? i.membership :void 0 :void 0) ? 200 :t.height() - o.height() - 750, 
t.scrollTop() > e ? $(".logo-footer-var2").addClass("show") :$(".logo-footer-var2").removeClass("show");
})) :3 === $B.TH.pbsVariationId && ($(".logo-footer-var3").show(), o.scroll(function() {
var e, n, i;
return e = "free" === (null != (n = $S.page_meta) ? null != (i = n.user) ? i.membership :void 0 :void 0) ? 200 :t.height() - o.height() - 750, 
t.scrollTop() > e ? $(".logo-footer-var3").addClass("show") :$(".logo-footer-var3").removeClass("show");
}))), s = ~~(1e6 * Math.random()) + "|" + new Date().getTime(), $B.TH.isMobile() || $B.isHeadlessRendering() || $S.conf.is_screenshot_rendering ? void 0 :($B.PageAE.sendPbsImpression({
variationId:$B.TH.pbsVariationId,
conversionKey:s
}), $(".logo-link").click(function() {
return $B.PageAE.sendPbsConversion({
variationId:$B.TH.pbsVariationId,
conversionKey:s
});
}))) :void 0;
},
disableLazyload:function(e) {
return e.each(function(e, t) {
var n;
return n = $(t), null != n.data("background") && (null != n.data("background") && n.css("background-image", "url(" + n.data("background") + ")"), 
n.removeClass("lazy")), n.is("img") && null != n.data("original") ? (n.attr("src", n.data("original")), 
n.removeClass("lazy"), n.on("load", function() {
return n.trigger("afterAppear");
})) :void 0;
});
},
applyLazyload:function(e) {
return null == e && (e = $(".lazy")), e.lazyload({
effect:"fadeIn",
effect_speed:500,
skip_invisible:!1,
threshold:$(window).height()
}), $("img.lazy-img").each(function() {
return "static" === $(this).css("position") ? $(this).css("position", "relative") :void 0;
});
},
lazyloadSection:function(e) {
return null != e ? ($B.TH.disableLazyload(e.find(".lazy-background")), $B.TH.disableLazyload(e.find(".lazy-img")), 
$B.TH.applyLazyload(e.find(".lazy"))) :void 0;
},
lazyload:function() {
var e;
return $B.TH.isMobile() ? $B.TH.disableLazyload($(".lazy")) :(e = $($B.DOM.SLIDES), 
$B.TH.disableLazyload($($B.DOM.NAVIGATOR).find(".lazy").addBack()), e.each(function(e, t) {
return $B.TH.lazyloadSection($(t));
}));
},
applyTableFormatting:function() {
var e;
return e = function(e, t) {
var n, o, i, r, a;
for (n = e.split("|||"), i = $("<tr>"), r = 0, a = n.length; a > r; r++) o = n[r], 
$("<td>").append(o).appendTo(i);
return t.append(i);
}, $(".text-component .content").each(function() {
var t, n;
return t = $(this), -1 !== t.text().indexOf("|||") ? (n = $('<table class="s-text-table">'), 
t.children("div, p").each(function() {
return e($(this).html(), n);
}), t.html("").append(n)) :void 0;
});
},
initPageHelpers:function() {
return $B.TH.adjustIFrameHeight(), $B.TH.applyMatchHeights(), window.edit_page.isShowPage ? ($B.TH.lazyload(), 
$B.TH.setupStrikinglyLogo()) :void 0;
}
};
}.call(this), function() {
Bobcat.Event = function() {
function e() {
this.topics = {}, this.subUid = -1;
}
return e.prototype.subscribe = function(e, t) {
var n;
return this.topics[e] || (this.topics[e] = []), n = ++this.subUid, this.topics[e].push({
token:n,
func:t
}), n;
}, e.prototype.publish = function(e, t) {
var n, o, i, r, a;
if (!this.topics[e]) return !1;
for (o = this.topics[e].slice(), a = [], i = 0, r = o.length; r > i; i++) {
n = o[i];
try {
a.push("function" == typeof n.func ? n.func(e, t) :void 0);
} catch (s) {
a.push(console.warn("Cannot trigger subscription! " + s));
}
}
return a;
}, e.prototype.unsubscribe = function(e) {
var t, n, o, i, r;
r = this.topics;
for (i in r) {
o = r[i];
for (t in o) if (n = o[t], n.token === e) return o.splice(t, 1), e;
}
return !1;
}, e;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
};
window.Bobcat = window.Bobcat || {}, Bobcat.Navigator = function() {
function t() {
this.selectAndGotoSlideWithIndex = e(this.selectAndGotoSlideWithIndex, this), this.getHighlightedIndex = e(this.getHighlightedIndex, this), 
this.registerSlideWaypoint = e(this.registerSlideWaypoint, this), this.registerSlideWaypoints = e(this.registerSlideWaypoints, this), 
this.selectSlideByWaypoint = e(this.selectSlideByWaypoint, this), this.hashTagChangeHandler = e(this.hashTagChangeHandler, this), 
this.getSlideName = e(this.getSlideName, this), this.setupKeyBindings = e(this.setupKeyBindings, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.currentSectionName = e(this.currentSectionName, this), 
this.currentIndex = e(this.currentIndex, this), this.slideIndex = e(this.slideIndex, this), 
this.unlockKeyboard = e(this.unlockKeyboard, this), this.lockKeyboard = e(this.lockKeyboard, this), 
this.removeHash = e(this.removeHash, this), this.setupHashTagChangeHandlerAndWaypoints = e(this.setupHashTagChangeHandlerAndWaypoints, this), 
this.runMobileOptimization = e(this.runMobileOptimization, this), this.scrolling = !1, 
this.keyboardLock = !1, this.firstTime = !0, this.current = ko.observable();
}
return t.prototype.init = function() {
return $B.log("[NAVIGATOR] Init"), this.selectSlide($(".slides .slide").first()), 
this.setupHashTagChangeHandlerAndWaypoints(), $B.getCustomization("pageKeybinding") && this.setupKeyBindings(), 
this.runMobileOptimization(), $B.isStatic() && $S.page_meta.show_navigation_buttons ? ($(".navigation-buttons").show(), 
$(".navigation-buttons span").css({
visibility:"visible",
opacity:0,
display:"block"
}), $(".navigation-buttons .prev").click(function() {
return window.slide_navigator.prev();
}), $(".navigation-buttons .next").click(function() {
return window.slide_navigator.next();
})) :void 0;
}, t.prototype.runMobileOptimization = function() {
var e;
return e = $B.TH.isMobile(), e && !location.hash ? window.scrollTo(0, 1) :void 0;
}, t.prototype.setupHashTagChangeHandlerAndWaypoints = function() {
var e = this;
return $(window).hashchange(function() {
return e.hashTagChangeHandler(location.hash);
}), "" === location.hash && this.registerSlideWaypoints, 0 === $(document).scrollTop() ? setTimeout(function() {
return $(window).hashchange(), e.registerSlideWaypoints();
}, 1500) :this.registerSlideWaypoints();
}, t.prototype.removeHash = function() {
var e;
return e = window.location.hash, "" !== e && "#" !== e && 0 !== e.indexOf("#!") ? "undefined" != typeof history && null !== history ? "function" == typeof history.replaceState ? history.replaceState("", document.title, window.location.pathname + window.location.search) :void 0 :void 0 :void 0;
}, t.prototype.lockKeyboard = function() {
return this.keyboardLock = !0;
}, t.prototype.unlockKeyboard = function() {
return this.keyboardLock = !1;
}, t.prototype.slideIndex = function(e) {
var t;
return t = $(".slides .slide"), t.index(e);
}, t.prototype.currentIndex = function() {
return this.slideIndex(this.current());
}, t.prototype.currentSectionName = function() {
return this.current().find("a.section-name-anchor").attr("data-section-name");
}, t.prototype.isFirst = function() {
var e;
return e = this.slideIndex(this.current()), 0 === e;
}, t.prototype.isLast = function() {
var e, t;
return t = $(".slides .slide"), e = this.slideIndex(this.current()), e === t.length - 1;
}, t.prototype.next = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), t.length - 1 > e ? this.selectAndGotoSlideWithIndex(e + 1) :e === t.length - 1 ? $("html, body").stop().animate({
scrollTop:$(document).height() - $(window).height()
}, 1200, "easeInOutQuart") :void 0;
}, t.prototype.prev = function() {
var e, t;
return t = $(".slides .slide"), e = t.index(this.current()), e > 0 ? this.selectAndGotoSlideWithIndex(e - 1) :$("html, body").stop().animate({
scrollTop:0
}, 1200, "easeInOutQuart");
}, t.prototype.setupKeyBindings = function() {
var e, t, n = this;
return t = !1, e = !0, $(document).on({
keydown:function(t) {
if (13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor(), !n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) {
switch (t.keyCode) {
case 32:
t.preventDefault();
break;

case 38:
t.preventDefault();
break;

case 40:
t.preventDefault();
}
return e = !0;
}
},
keyup:function(o) {
if (clearTimeout(t), t = !1, !e) return e = !0, void 0;
if (!n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) switch (o.keyCode) {
case 32:
return o.preventDefault(), n.next();

case 38:
return o.preventDefault(), n.prev();

case 40:
return o.preventDefault(), n.next();
}
}
});
}, t.prototype.getSlug = function(e, t) {
return e = e.toSlug(), (0 === e.length || e.match(/^[0-9]+$/g)) && (e = "_" + (t + 1)), 
e;
}, t.prototype.getSlideNames = function() {
var e, t, n, o, i, r, a, s, l, u;
for (o = [], s = window.edit_page.isShowPage ? $S.page_meta.slide_names :function() {
var e, t, n, o;
for (n = window.edit_page.data.slides(), o = [], e = 0, t = n.length; t > e; e++) a = n[e], 
o.push(a.components.slideSettings.name());
return o;
}(), t = l = 0, u = s.length; u > l; t = ++l) {
for (r = s[t], n = i = "#" + this.getSlug(r, t), e = 1; -1 !== $.inArray(n, o); ) n = i + "-" + e++;
o.push(n);
}
return o;
}, t.prototype.getSlideName = function(e) {
return this.getSlideNames()[e];
}, t.prototype.hashTagChangeHandler = function(e) {
var t, n, o, i, r = this;
return $B.log("[NAVIGATOR] Got hash change " + e), $("html, body").stop(), n = $('a[data-scroll-name="' + e + '"]'), 
n.length ? (o = n.closest(".slide"), $B.log("[NAVIGATOR] Found section number")) :(t = $.inArray(e, this.getSlideNames()), 
-1 !== t && ($B.log("[NAVIGATOR] Found section slug"), o = $("ul.slides .slide").eq(t), 
n = o.find("a.section-anchor").first())), n.length > 0 ? (this.scrolling = !0, window.edit_page.Event.publish("Menu.beforeChange", e), 
(null != (i = $B.TH) ? "function" == typeof i.isMobile ? i.isMobile() :void 0 :void 0) && $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"), 
this.selectSlide(o), $B.log("[NAVIGATOR] Animating to #" + ($(".slides .slide").index(o) + 1)), 
$("html, body").stop().animate({
scrollTop:n.first().offset().top
}, 1200, "easeInOutQuart", function() {
return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"), window.edit_page.Event.publish("Menu.afterChange", e), 
r.scrolling = !1;
})) :void 0;
}, t.prototype.selectSlideByWaypoint = function(e, t) {
var n;
return n = this.getSlideName(t), window.location.hash !== n ? ($B.log("[NAVIGATOR] Selecting slide " + (t + 1) + " by waypoint"), 
this.selectSlide(e), this.removeHash()) :void 0;
}, t.prototype.waypointsRegistered = !1, t.prototype.registerSlideWaypoints = function() {
var e;
return this.waypointsRegistered ? void 0 :($B.log("[NAVIGATOR] Registering waypoints"), 
e = this.registerSlideWaypoint, $(".slides .slide").each(function() {
return e($(this));
}), this.waypointsRegistered = !0);
}, t.prototype.registerSlideWaypoint = function(e) {
var t, n, o, i, r = this;
return n = this.slideIndex, e.waypoint(function(t) {
var o, i;
if (r.firstTime) return r.firstTime = !1, $B.log("[NAVIGATOR] Canceling first waypoint event"), 
void 0;
if (!r.scrolling) {
if (i = n(e), "down" === t || 0 === i) o = e; else if ("up" === t && (o = e.prev(), 
i -= 1, 0 === $(document).scrollTop() && 0 !== i)) return;
return $B.log("[NAVIGATOR] Got waypoint event " + t + ", " + i), r.selectSlideByWaypoint(o, i);
}
}, {
offset:"50%",
continuous:!1
}), t = 0, 0 === (null != (o = e.first()) ? null != (i = o.offset()) ? i.top :void 0 :void 0) ? $(window).scroll(function() {
var o;
if (!r.scrolling && 0 === n(e.first()) && e.first().height() < .5 * $(window).height() && e.eq(1).length) {
if (o = $(document).scrollTop(), t === o) return;
return 0 === o ? r.selectSlideByWaypoint(e.first(), 0) :0 === t && r.selectSlideByWaypoint(e.eq(1), 1), 
t = o;
}
}) :void 0;
}, t.prototype.getHighlightedIndex = function() {
var e, t, n;
for (n = $(".s-nav .s-nav-item"), t = $(".navbar-drawer .navbar-drawer-item"), e = this.currentIndex(); n[e] && !n.eq(e).is(":visible") && !t.eq(e).is(":visible"); ) e -= 1;
return e;
}, t.prototype.selectSlide = function(e) {
var t;
return $(".slides .slide").removeClass("selected"), e.addClass("selected"), this.current(e), 
$B.isStatic() ? (t = this.getHighlightedIndex(), $(".s-nav .s-nav-item").removeClass("selected"), 
t > -1 && $(".s-nav .s-nav-item").eq(t).addClass("selected"), $(".navbar-drawer .navbar-drawer-item").removeClass("selected"), 
t > -1 && $(".navbar-drawer .navbar-drawer-item").eq(t).addClass("selected"), this.isFirst() ? $(".navigation-buttons .prev").animate({
opacity:0
}) :$(".navigation-buttons .prev").animate({
opacity:1
}), this.isLast() ? $(".navigation-buttons .next").animate({
opacity:0
}) :$(".navigation-buttons .next").animate({
opacity:1
})) :void 0;
}, t.prototype.selectAndGotoSlideWithIndex = function(e) {
return window.location.hash = this.getSlideName(e);
}, t;
}();
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function o() {
this.constructor = e;
}
for (var i in n) t.call(n, i) && (e[i] = n[i]);
return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype, 
e;
};
window.currentComponent = null, window.currentRepeatable = null, Bobcat.EditorTracker = function(t) {
function o() {
this.closeLastEditor = e(this.closeLastEditor, this), this.addOpenedEditor = e(this.addOpenedEditor, this), 
this.removeFromOpenedEditors = e(this.removeFromOpenedEditors, this), this.hasOpenedEditor = e(this.hasOpenedEditor, this), 
this.openedEditors = [];
}
return n(o, t), o.prototype.hasOpenedEditor = function() {
return 0 === this.openedEditors.length;
}, o.prototype.removeFromOpenedEditors = function(e) {
var t;
return t = $.inArray(e, this.openedEditors), t > -1 ? this.openedEditors.splice(t, 1) :void 0;
}, o.prototype.addOpenedEditor = function(e) {
return this.openedEditors.push(e);
}, o.prototype.closeLastEditor = function() {
var e;
return e = this.openedEditors.pop(), e && (Bobcat.AE.track("Editor - Combo Key - Done"), 
e.doneClickHandler()), e;
}, o;
}($B.Module), window.editorTracker = new Bobcat.EditorTracker(), Bobcat.ComponentHelper = {
TRANSPARENT_IMAGE_URL:"/assets/icons/transparent.png",
isImageTransparent:function(e) {
return null == e && (e = ""), -1 !== e.indexOf(this.TRANSPARENT_IMAGE_URL);
},
isNull:function(e) {
return "undefined" == typeof e || null === e;
},
isBlank:function(e) {
return this.isNull(e) ? !0 :0 === e.length ? !0 :!1;
}
}, Bobcat.Component = function(t) {
function o(t, n, o) {
this.root = t, null == n && (n = {}), null == o && (o = {}), this.triggerEvent = e(this.triggerEvent, this), 
this.addSubscriber = e(this.addSubscriber, this), this.destroy = e(this.destroy, this), 
this.loadData = e(this.loadData, this), this.storeCommand = e(this.storeCommand, this), 
this.refreshRootLastData = e(this.refreshRootLastData, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.hideEditorHandler = e(this.hideEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.mouseleaveHandler = e(this.mouseleaveHandler, this), this.mouseenterHandler = e(this.mouseenterHandler, this), 
this.firstTimeToLoad = !0, this.loadData(n, o), this.selected = ko.observable(), 
this.dialogOpen = ko.observable(!1), this.state = ko.observable(0), this.lastData = n, 
this.mapping = o;
}
return n(o, t), o.include(Bobcat.ComponentHelper), o.prototype.isState = function(e) {
return "normal" === e && 0 === this.state() ? !0 :"overlay" === e && 1 === this.state() ? !0 :"editor" === e && 2 === this.state() ? !0 :!1;
}, o.prototype.gotoState = function(e) {
return "normal" === e ? (this === window.currentComponent && (window.currentComponent = null), 
this === window.currentRepeatable && (window.currentRepeatable = null), this.state(0), 
window.editorTracker.removeFromOpenedEditors(this)) :"overlay" === e ? this.type && "RepeatableItem" === this.type() || !window.currentComponent || !window.currentComponent.isState("overlay") ? (this.type && "RepeatableItem" === this.type() ? window.currentRepeatable = this :window.currentComponent = this, 
this.state(1)) :(window.currentComponent.gotoState("normal"), void 0) :"editor" === e ? (window.editorTracker.addOpenedEditor(this), 
this.state(2)) :void 0;
}, o.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, o.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, o.prototype.clickEditorHandler = function() {
return this.isState("overlay") ? this.gotoState("editor") :void 0;
}, o.prototype.hideEditorHandler = function() {
return this.isState("editor") ? this.gotoState("normal") :void 0;
}, o.prototype.doneClickHandler = function(e) {
return this.hideEditorHandler(e), window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand();
}, o.prototype.refreshRootLastData = function() {
return this.root ? this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))) :void 0;
}, o.prototype.storeCommand = function() {
var e;
return console.log("storeCommand: root: ", this.root), console.log("storeCommand: self: ", this), 
this.root ? (e = this.root.rootLastData, this.root.rootLastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this.root))), 
$B.Singleton.TimeMachine.pushOp({
action:"modify",
self:this,
root:this.root,
data:{
mapping:this.root.mapping,
oldValue:e,
newValue:this.root.rootLastData
}
})) :void 0;
}, o.prototype.loadData = function(e, t) {
var n, o, i;
null == e && (e = {}), null == t && (t = {}), this.firstTimeToLoad && (this.lastData = e, 
this.firstTimeToLoad = !1), ko.mapping.fromJS(e, t, this), i = [];
for (n in e) o = e[n], this[n] && ko.isSubscribable(this[n]) ? i.push(this[n].subscribe(function() {
return window.edit_page.unsavedChanges(!0);
})) :i.push(void 0);
return i;
}, o.prototype.destroy = function() {}, o.prototype.addSubscriber = function(e, t) {
var n, o, i, r, a;
for (this.subscribers || (this.subscribers = []), e instanceof RegExp || (e = new RegExp(e)), 
n = !1, a = this.subscribers, i = 0, r = a.length; r > i; i++) o = a[i], o.event.toString() === e.toString() && (n = !0, 
o.listeners.push(t));
return n ? void 0 :this.subscribers.push({
event:e,
listeners:[ t ]
});
}, o.prototype.triggerEvent = function(e, t) {
var n, o, i, r, a, s, l, u;
if (this.subscribers) for (l = this.subscribers, i = 0, a = l.length; a > i; i++) if (o = l[i], 
o.event.test(e)) for (u = o.listeners, r = 0, s = u.length; s > r; r++) n = u[r], 
n.call(this, t);
return this.root && this !== this.root ? this.root.triggerEvent(e, t) :void 0;
}, o;
}($B.Module);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function o() {
this.constructor = e;
}
for (var i in n) t.call(n, i) && (e[i] = n[i]);
return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype, 
e;
};
window.asset_path = function(e) {
var t, n;
return t = $("meta[name=asset-url]").attr("content"), n = /^\/assets\//, n.test(e) && t && (e = t + e), 
e;
}, Bobcat.DelayJob = function() {
function t() {
this.init = e(this.init, this), this.getAllJobs = e(this.getAllJobs, this), this.getJob = e(this.getJob, this), 
this.add = e(this.add, this), this.jobs = {};
}
return t.prototype.add = function(e, t) {
return this.jobs[e] = t;
}, t.prototype.getJob = function(e) {
return this.jobs[e];
}, t.prototype.getAllJobs = function() {
var e, t, n, o;
n = [], o = this.jobs;
for (t in o) e = o[t], n.push(e);
return n;
}, t.prototype.init = function() {}, t;
}(), window.runAfterDomBinding = new Bobcat.DelayJob(), Bobcat.PageData = function(t) {
function o(t) {
this.removePremiumSlides = e(this.removePremiumSlides, this), this.selectedPreset = e(this.selectedPreset, this);
var n;
this.isNull(t.showNavigationButtons) && (t.showNavigationButtons = !1), this.isNull(t.submenu) && (t.submenu = {
type:"SubMenu",
list:[],
components:{
link:{
type:"Button",
url:"http://www.wordpress.com",
text:"Blog",
new_target:!0
}
}
}), this.isNull(t.templateVariation) && (t.templateVariation = ""), this.isNull(t.templatePreset) && (t.templatePreset = ""), 
this.isNull(t.showMobileNav) && (t.showMobileNav = !0), n = {
slides:{
create:function(e) {
return new Bobcat.Slide(e.data);
}
},
menu:{
create:function(e) {
return new Bobcat.Menu(e.data);
}
},
footer:{
create:function(e) {
return new Bobcat.Footer(e.data);
}
},
submenu:{
create:function(e) {
return new Bobcat.SubMenu(e.data);
}
}
}, o.__super__.constructor.call(this, null, t, n);
}
return n(o, t), o.prototype.selectedPreset = function() {}, o.prototype.removePremiumSlides = function() {}, 
o.prototype.bindSlides = function() {
var e, t, n, o, i, r, a, s, l, u;
for ($(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."), 
s = this.slides(), t = o = 0, r = s.length; r > o; t = ++o) n = s[t], e = $(Bobcat.DOM.SLIDES).eq(t), 
n.index(t), n.html(e);
for (this.slides.subscribe(function(e) {
var n, o, i, r, a;
for (t = o = 0, r = e.length; r > o; t = ++o) n = e[t], n.index(t);
for (i = 0, a = e.length; a > i; i++) n = e[i], n.html().find(".section-anchor").attr("data-scroll-name", "#" + (n.index() + 1)), 
n.beforeMoveHandler(), $(".slides").append(n.html()), n.afterMovedHandler();
return $.waypoints("refresh");
}), l = this.slides(), u = [], i = 0, a = l.length; a > i; i++) n = l[i], u.push(n.bind());
return u;
}, o.prototype.addSlideData = function(e, t) {
return this.slides.splice(e, 0, t), window.edit_page.setupTooltips();
}, o.prototype.removeSlideData = function(e) {
return this.slides.splice(e, 1), window.edit_page.removeTooltips();
}, o.prototype.hideAllEditors = function() {
var e, t, n, o;
for (o = this.slides(), t = 0, n = o.length; n > t; t++) e = o[t], e.hideAllEditors();
return this.menu.hideAllEditors();
}, o.prototype.highlightInNav = function(e) {
var t;
return t = e.data, t.isSelected() && !t.isHidden() ? !0 :void 0;
}, o;
}(Bobcat.Component), Bobcat.Slide = function(t) {
function o(t) {
var n, i = this;
this.data = t, this.destroy = e(this.destroy, this), this.deleteSlide = e(this.deleteSlide, this), 
this.isSelected = e(this.isSelected, this), this.isHighlighted = e(this.isHighlighted, this), 
this.getName = e(this.getName, this), this.isHidden = e(this.isHidden, this), this.selectSlide = e(this.selectSlide, this), 
this.toggleMenu = e(this.toggleMenu, this), this.renameDone = e(this.renameDone, this), 
this.rename = e(this.rename, this), n = {
components:{
create:function(e) {
var t, n, o, r, a;
n = {}, a = e.data;
for (t in a) o = a[t], n[t] = new Bobcat[o.type](i, o), "function" == typeof (r = n[t]).init && r.init();
return n;
}
}
}, o.__super__.constructor.call(this, this, this.data, n), this.html = ko.observable(), 
this.index = ko.observable(), this.renameMode = ko.observable(!1), this.rootLastData = this.data;
}
return n(o, t), o.StripHtml = function(e) {
return Bobcat.Gallery.StripHtml(e);
}, o.prototype.htmlCopy = function() {
return this.html().html();
}, o.prototype.hideAllEditors = function() {
var e, t, n, o;
n = this.components, o = [];
for (t in n) e = n[t], o.push(e.hideEditorHandler());
return o;
}, o.prototype.bind = function() {
return ko.applyBindings(this.components, this.html().get(0));
}, o.prototype.rename = function(e) {
return this.renameMode(!0), window.dom = e, $(e.closest(".section").find("input").first()).focus(), 
window.slide_navigator.lockKeyboard();
}, o.prototype.renameDone = function() {
return this.renameMode(!1), window.slide_navigator.unlockKeyboard(), window.edit_page.track("Editor - Rename Section"), 
this.doneClickHandler();
}, o.prototype.toggleMenu = function() {
var e;
return e = this.components.slideSettings.show_nav(), this.components.slideSettings.show_nav(!e), 
window.edit_page.Event.publish("MenuItem.toggle", {});
}, o.prototype.selectSlide = function(e) {
return this.isSelected() ? this.rename(e) :window.slide_navigator.selectAndGotoSlideWithIndex(this.index());
}, o.prototype.isHidden = function() {
return !this.components.slideSettings.show_nav();
}, o.prototype.hashHref = function() {
return window.slide_navigator.getSlideName(this.index());
}, o.prototype.getName = function() {
return this.components.slideSettings.name();
}, o.prototype.isHighlighted = function() {
var e, t;
if (this.isSelected() && !this.isHidden()) return !0;
if (this.index() > window.slide_navigator.currentIndex()) return !1;
for (e = this.index() + 1, t = window.edit_page.data.slides(); t[e] && t[e].isHidden(); ) {
if (t[e].isSelected()) return !0;
e += 1;
}
return !1;
}, o.prototype.isSelected = function() {
return window.slide_navigator.currentIndex() === this.index();
}, o.prototype.deleteSlide = function() {
return this.html().append($('<div class="s-delete-slide-shade"></div>')), window.confirm(I18n.t("js.pages.edit.confirm.delete_section")) ? (window.edit_page.deleteSlide(this.index()), 
this.destroy()) :this.html().find(".s-delete-slide-shade").remove();
}, o.prototype.destroy = function() {
var e, t, n, o;
n = this.components, o = [];
for (t in n) e = n[t], o.push(e.destroy());
return o;
}, o.prototype.beforeMoveHandler = function() {
var e, t, n, o;
n = this.components, o = [];
for (t in n) e = n[t], null != e.beforeMoveHandler ? o.push(e.beforeMoveHandler()) :o.push(void 0);
return o;
}, o.prototype.afterMovedHandler = function() {}, o;
}(Bobcat.Component), Bobcat.Text = function(e) {
function t(e, n) {
var o, i = this;
this.root = e, o = {
style:{
create:function(e) {
return new Bobcat.TextStyle(i.root, e.data);
}
}
}, t.__super__.constructor.call(this, this.root, n, o), this.oldValue = ko.observable();
}
return n(t, e), t.prototype.edit = function() {
return t.__super__.edit.call(this), this["default"]() ? (this.oldValue(this.value()), 
this.value("&nbsp;")) :void 0;
}, t.prototype.deselect = function() {
return t.__super__.deselect.call(this), this["default"]() ? "&nbsp;" === this.value() ? this.value(this.oldValue()) :this["default"](!1) :void 0;
}, t;
}(Bobcat.Component), Bobcat.SocialMediaList = function(t) {
function o(t, n) {
var i, r, a = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.render = e(this.render, this), 
i = $.extend(!0, {}, n), window.social_media_config.updateButtonListData(i), r = {
link_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
},
button_list:{
create:function(e) {
return new Bobcat[e.data.type](a.root, e.data, a);
}
}
}, o.__super__.constructor.call(this, this.root, i, r), this.mediaListHtml = ko.observable();
}
return n(o, t), o.prototype.render = function() {
var e, t, n, o, i, r, a, s, l, u;
if (!$B.isHeadlessRendering()) {
for (n = "", s = this.button_list(), o = 0, r = s.length; r > o; o++) t = s[o], 
t.show_button() && (n += t.getTemplate());
for (this.mediaListHtml(n), l = this.button_list(), u = [], i = 0, a = l.length; a > i; i++) t = l[i], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
window.edit_page.isShowPage ? t.show_button() || e ? u.push(t.reRender()) :u.push(void 0) :u.push(t.reRender());
return u;
}
}, o.prototype.clickEditorHandler = function(e) {
return o.__super__.clickEditorHandler.call(this, e);
}, o.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, o.prototype.doneClickHandler = function(e) {
var t, n, i, r;
for (this.render(), r = this.link_list(), n = 0, i = r.length; i > n; n++) t = r[n], 
t.doneClickHandler();
return o.__super__.doneClickHandler.call(this, e);
}, o;
}(Bobcat.Component), Bobcat.SocialMediaItem = function(t) {
function o(t, n) {
var i = this;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.onScriptLoad = e(this.onScriptLoad, this), 
this.getUrl = e(this.getUrl, this), n.link_url || (n.link_url = ""), n.share_text || (n.share_text = window.social_media_config.get("description")), 
o.__super__.constructor.call(this, this.root, n, {}), this.show_link = ko.dependentObservable(function() {
return i.link_url().length > 0;
});
}
return n(o, t), o.include(Bobcat.UrlHelper), o.prototype.getUrl = function() {
return this.url && this.url() ? this.url() :window.social_media_config.get("url");
}, o.prototype.getSubtitle = function() {
return "";
}, o.prototype.openLinkInput = function(e) {
var t;
return t = e.closest(".social-media-item"), t.length ? (t.find("input.url").show(), 
e.hide()) :void 0;
}, o.prototype.onScriptLoad = function() {
return this.runScript();
}, o.prototype.createScriptTag = function(e, t) {
var n, o;
return n = $("<div></div>").addClass(e), o = $("<script></script>").attr({
async:!0,
src:t
}), o.bind("load", this.onScriptLoad), n.get(0).appendChild(o.get(0)), $("#fb-root").get(0).appendChild(n.get(0));
}, o.prototype.doneClickHandler = function() {
var e, t;
return t = this.link_url(), e = this.addProtocol(t, !0), this.link_url(e);
}, o;
}(Bobcat.Component), Bobcat.Facebook = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), n.app_id = window.social_media_config.get("fb_app_id"), 
n.imageUrl = asset_path("/assets/icons/facebook.png"), o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, o.prototype.getSubtitle = function() {
return "Facebook Like";
}, o.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.app_id(),
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, o.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, o;
}(Bobcat.SocialMediaItem), Bobcat.LinkedIn = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/linkedin.png"), 
o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, o.prototype.getSubtitle = function() {
return "LinkedIn Share";
}, o.prototype.runScript = function() {}, o.prototype.reRender = function() {
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, o;
}(Bobcat.SocialMediaItem), Bobcat.Twitter = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/twitter.png"), 
this.isNull(n.share_text) && (self.share_text = "Check out this awesome website on @Strikingly"), 
o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>';
}, o.prototype.getSubtitle = function() {
return "Tweet button";
}, o.prototype.runScript = function() {
var e;
return "undefined" != typeof twttr && null !== twttr ? null != (e = twttr.widgets) ? e.load() :void 0 :void 0;
}, o.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, o;
}(Bobcat.SocialMediaItem), Bobcat.GPlus = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/gplus.png"), 
o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, o.prototype.getSubtitle = function() {
return "Google +1";
}, o.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, o.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, o;
}(Bobcat.SocialMediaItem), Bobcat.Renren = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), n.imageUrl = asset_path("/assets/icons/renren.png"), 
o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.getSubtitle = function() {
return "人人喜欢";
}, o.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:window.social_media_config.get("title"),
description:window.social_media_config.get("description"),
image:window.social_media_config.get("image")
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, o.prototype.runScript = function() {}, o.prototype.reRender = function() {}, 
o;
}(Bobcat.SocialMediaItem), Bobcat.SinaWeibo = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
n.imageUrl = asset_path("/assets/icons/weibo.png"), o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.getSubtitle = function() {
return "新浪微博";
}, o.prototype.getTemplate = function() {
var e, t, n, o, i;
i = 90, o = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:window.social_media_config.get("title"),
pic:window.social_media_config.get("image"),
rnd:new Date().valueOf()
}, n = [];
for (e in t) n.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + n.join("&") + '" width="' + i + '" height="' + o + '"></iframe></div>';
}, o.prototype.runScript = function() {}, o.prototype.reRender = function() {}, 
o;
}(Bobcat.SocialMediaItem), Bobcat.Person = function(e) {
function t(e, n, o) {
this.root = e, this.parent = o, t.__super__.constructor.call(this, this.root, n, {}), 
this.name = new Bobcat.RichText(this.root, this.name), this.name.init(), this.title = new Bobcat.RichText(this.root, this.title), 
this.title.init(), this.image = new Bobcat.Image(this.root, this.image, {}, null), 
this.choosingImage = ko.observable(!1);
}
return n(t, e), t.prototype.remove = function() {
return this.parent.list.remove(this);
}, t.prototype.toggleImageChooser = function() {
return this.choosingImage(!this.choosingImage());
}, t;
}(Bobcat.Component), Bobcat.Video = function(t) {
function o(t, n, i) {
this.root = t, this.parent = i, this.remove = e(this.remove, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.errorCallback = e(this.errorCallback, this), 
this.successCallback = e(this.successCallback, this), this.upload = e(this.upload, this), 
o.__super__.constructor.call(this, this.root, n, {}), this.visible = ko.dependentObservable(function() {
var e;
return !(null != (e = window.edit_page) ? "function" == typeof e.isLoading ? e.isLoading() :void 0 :void 0);
});
}
return n(o, t), o.include(Bobcat.UrlHelper), o.prototype.upload = function(e) {
var t = this;
if (!window.edit_page.isLoading() && !this.isBlank(this.url())) return window.edit_page.isLoading(!0), 
e.target && (e = $(e.target)), this.url(this.addProtocol(this.url())), e.closest("form").ajaxSubmit({
url:"/s/videos.json",
type:"POST",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(e) {
return console.log(e), "retry" === e.html ? $B.poller("/s/tasks/" + e.message.type + "/" + e.message.id + ".jsm?v=1", t.successCallback, t.errorCallback) :"success" === e.html ? t.successCallback(e) :void 0;
},
error:this.errorCallback
});
}, o.prototype.successCallback = function(e) {
return window.edit_page.isLoading(!1), this.html(e.message.html), window.edit_page.track("Editor - Add Video");
}, o.prototype.errorCallback = function(e) {
var t;
return t = jQuery.parseJSON(e.responseText), window.edit_page.isLoading(!1), $B.log(t), 
alert(I18n.t(t.html, t.message.i18n));
}, o.prototype.clickEditorHandler = function(e) {
return this.oldHtml = this.html(), o.__super__.clickEditorHandler.call(this, e);
}, o.prototype.clickCancelEditorHandler = function() {
return this.html(this.oldHtml), this.hideEditorHandler();
}, o.prototype.remove = function() {
return this.html(""), this.url("");
}, o;
}(Bobcat.Component), Bobcat.Repeatable = function(t) {
function o(t, n) {
var i, r = this;
this.root = t, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.selectedIndex = e(this.selectedIndex, this), 
this.changeToPrev = e(this.changeToPrev, this), this.changeToNext = e(this.changeToNext, this), 
this.changeSelected = e(this.changeSelected, this), this.add = e(this.add, this), 
this.isNull(n.subItemClassName) && (n.subItemClassName = "RepeatableItem"), i = {
list:{
create:function(e) {
return new Bobcat[n.subItemClassName](r.root, e.data, r);
}
},
components:{
create:function(e) {
return e.data;
}
}
}, o.__super__.constructor.call(this, this.root, n, i), this.selected = ko.observable(), 
this.direction = ko.observable(1);
}
return n(o, t), o.prototype.add = function(e) {
var t;
return t = new (Bobcat[this.subItemClassName()])(this.root, {
components:this.components
}, this), this.changeSelected(t), this.list.push(t), this.changeSelected(t), window.edit_page.Event.publish("Repeatable.add", {
target:e
}), window.edit_page.track("Editor - Add Repeatable"), this.triggerEvent("Repeatable.Add", t), 
this.storeCommand();
}, o.prototype.changeSelected = function(e) {
return this.selected() && e.index() > 0 && this.selectedIndex() > e.index() ? this.direction(-1) :this.direction(1), 
this.selected(e);
}, o.prototype.changeToNext = function(e) {
return this.changeSelected(this.list()[(e.index() + 1) % this.list().length]);
}, o.prototype.changeToPrev = function(e) {
return this.changeSelected(this.list()[(e.index() - 1) % this.list().length]);
}, o.prototype.beforeMoveHandler = function() {
var e, t, n, o, i;
for (o = this.list(), i = [], t = 0, n = o.length; n > t; t++) e = o[t], null != e.beforeMoveHandler ? i.push(e.beforeMoveHandler()) :i.push(void 0);
return i;
}, o.prototype.afterMovedHandler = function() {}, o.prototype.selectedIndex = function() {
return this.selected() ? this.selected().index() :void 0;
}, o.prototype.hasContent = function() {
return this.list().length > 0;
}, o.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, o;
}(Bobcat.Component), Bobcat.RepeatableItem = function(t) {
function o(t, n, i) {
var r, a = this;
this.root = t, this.parent = i, this.isTextRight = e(this.isTextRight, this), this.layout = e(this.layout, this), 
this.columnVariation = e(this.columnVariation, this), this.col4 = e(this.col4, this), 
this.col3 = e(this.col3, this), this.smartCol8 = e(this.smartCol8, this), this.smartCol3 = e(this.smartCol3, this), 
this.smartCol = e(this.smartCol, this), this.deselect = e(this.deselect, this), 
this.selectForEdit = e(this.selectForEdit, this), this.direction = e(this.direction, this), 
this.prev = e(this.prev, this), this.next = e(this.next, this), this.select = e(this.select, this), 
this.showEditor = e(this.showEditor, this), this.leaveDeleteHandler = e(this.leaveDeleteHandler, this), 
this.enterDeleteHandler = e(this.enterDeleteHandler, this), this.isLast = e(this.isLast, this), 
this.isFirst = e(this.isFirst, this), this.isEven = e(this.isEven, this), this.index = e(this.index, this), 
this.remove = e(this.remove, this), r = {
components:{
create:function(e) {
var t, n, o, i;
n = {}, i = e.data;
for (t in i) o = i[t], "function" == typeof o.type && (o.type = o.type()), n[t] = new Bobcat[o.type](a.root, o), 
"undefined" != typeof n[t].init && n[t].init();
return n;
}
}
}, n.type = "RepeatableItem", n.deleteOverlayEnabled = !1, o.__super__.constructor.call(this, this.root, n, r), 
this.isSelected = ko.dependentObservable(function() {
return a.parent.selected() === a;
}, this);
}
return n(o, t), o.prototype.remove = function(e) {
var t, n, o;
return t = $(e.closest(".slide-list")[0]), n = e.closest(".repeatable").prev(), 
o = this.parent.list().indexOf(this), this.parent.list.remove(this), window.edit_page.Event.publish("Repeatable.remove", {
target:n
}), window.edit_page.track("Editor - Remove Repeatable"), this.triggerEvent("Repeatable.Remove", {
component:this,
target:e,
targetParent:t
}), this.parent.storeCommand();
}, o.prototype.index = function() {
return $.inArray(this, this.parent.list());
}, o.prototype.isEven = function() {
return this.index() % 2 === 0;
}, o.prototype.isFirst = function() {
return 0 === this.index();
}, o.prototype.isLast = function() {
return this.index() === this.parent.list().length - 1;
}, o.prototype.enterDeleteHandler = function() {
return this.deleteOverlayEnabled(!0);
}, o.prototype.leaveDeleteHandler = function() {
return this.deleteOverlayEnabled(!1);
}, o.prototype.showEditor = function() {
var e, t, n, o;
n = !0, o = this.components;
for (t in o) e = o[t], n = n && (e.isState("normal") || e.isState("overlay"));
return n;
}, o.prototype.select = function() {
return this.parent.changeSelected(this);
}, o.prototype.next = function() {
return this.deselect(), this.parent.changeToNext(this);
}, o.prototype.prev = function() {
return this.deselect(), this.parent.changeToPrev(this);
}, o.prototype.direction = function() {
return this.parent.direction();
}, o.prototype.selectForEdit = function(e) {
var t, n, o;
this.deselect(), this.select(e), o = this.components;
for (n in o) if (t = o[n], "Image" === t.type()) return t.mouseenterHandler(), t.clickEditorHandler(), 
void 0;
}, o.prototype.deselect = function() {
var e, t, n, o, i, r, a;
for (r = this.parent.list(), a = [], o = 0, i = r.length; i > o; o++) t = r[o], 
a.push(function() {
var o, i;
o = t.components, i = [];
for (n in o) e = o[n], "Image" === e.type() && e.isState("editor") ? i.push(e.clickCancelEditorHandler()) :i.push(void 0);
return i;
}());
return a;
}, o.prototype.beforeMoveHandler = function() {
var e, t, n, o;
n = this.components, o = [];
for (t in n) e = n[t], null != e.beforeMoveHandler ? o.push(e.beforeMoveHandler()) :o.push(void 0);
return o;
}, o.prototype.afterMovedHandler = function() {}, o.prototype.smartCol = function() {
return 4 === this.parent.list().length || this.parent.list().length < 3;
}, o.prototype.smartCol3 = function() {
return this.parent.list().length % 3 === 0 || this.parent.list().length < 3;
}, o.prototype.smartCol8 = function() {
var e;
return e = this.parent.list().length, 1 === e || 2 === e || 4 === e;
}, o.prototype.col3 = function() {
return this.parent.list().length <= 3;
}, o.prototype.col4 = function() {
return this.parent.list().length <= 4;
}, o.prototype.columnVariation = function() {
var e, t;
switch (null != (e = this.root.components) ? null != (t = e.slideSettings) ? t.layout_variation() :void 0 :void 0) {
case "2col":
return {
third:0,
four:0,
eight:1
};

case "3col":
return {
third:1,
four:0,
eight:0
};

case "4col":
return {
third:0,
four:1,
eight:0
};
}
}, o.prototype.layout = function() {
var e, t;
return null != (e = this.root.components) ? null != (t = e.slideSettings) ? t.layout_variation() :void 0 :void 0;
}, o.prototype.isTextRight = function() {
return "image" === this.layout() || "alt" === this.layout() && !this.isEven();
}, o;
}(Bobcat.Component), Bobcat.Slider = function(t) {
function o(t, n) {
var i, r, a, s, l, u, c, d, h = this;
for (this.root = t, this.gotoSlide = e(this.gotoSlide, this), this.updateIndex = e(this.updateIndex, this), 
this.select2 = e(this.select2, this), this.select = e(this.select, this), this.add = e(this.add, this), 
this.onClickHandler = e(this.onClickHandler, this), o.__super__.constructor.call(this, this.root, n), 
this.selectedIdx = ko.observable(0), this.formOpen = ko.observable(!1), l = function(e, t) {
var n, o;
return null != (n = window.edit_page) ? null != (o = n.Event) ? o.publish(e, t) :void 0 :void 0;
}, u = function(e, t) {
return h.root.addSubscriber(e, function(e) {
var n;
return null != (n = window.edit_page) && "function" == typeof n.track && n.track("Edit Content - Slider - Editor v1"), 
l(t, e.target);
});
}, i = "Slider.ContentChanged", a = function() {
var e, t, n, o;
for (n = [ /Text\..*/, /BackgroundImage\..*/, /Media\..*/, /Repeatable\..*/ ], o = [], 
e = 0, t = n.length; t > e; e++) r = n[e], o.push([ r, i ]);
return o;
}(), c = 0, d = a.length; d > c; c++) s = a[c], u(s[0], s[1]);
this.root.addSubscriber("Repeatable.Remove", function(e) {
var t;
return 0 === h.list().length ? (t = e.targetParent.closest(".iosslider"), t.find(".slider").css({
"max-height":300
}), t.css({
"max-height":300,
"min-height":300
}), void 0) :(h.selectedIdx() >= h.list().length && h.selectedIdx(h.list().length - 1), 
$(window).trigger("resize"), setTimeout(function() {
return h.gotoSlide(e.targetParent.closest(".iosslider"), h.selectedIdx() + 1);
}, 300));
}), this.root.addSubscriber("Repeatable.Move", function(e) {
return h.selectedIdx(e.extra.newIndex), h.gotoSlide(e.target.closest(".iosslider"), h.selectedIdx() + 1);
}), this.root.addSubscriber(/Text\..*/, function() {
return setTimeout(function() {
return $(window).trigger("resize");
}, 300);
});
}
return n(o, t), o.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().find(".slider-settings"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, o.prototype.add = function(e) {
var t = this;
return this.list().length >= 10 ? ($B.customAlert("You can only add 10 slides!"), 
void 0) :(o.__super__.add.call(this, e), this.triggerEvent("Slider.Add"), 1 === this.list().length ? (this.selectedIdx(0), 
setTimeout(function() {
return t.gotoSlide(e.closest(".iosslider"), t.selectedIdx() + 1);
}, 500)) :void 0);
}, o.prototype.select = function(e) {
var t, n;
return e = $(e), t = e.closest(".selector"), n = e.closest(".slide-list").find(".selector"), 
this.selectedIdx(n.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, o.prototype.select2 = function(e) {
var t, n;
return e = $(e), t = e.closest(".selector"), n = e.closest(".slide-selectors").find(".selector"), 
this.selectedIdx(n.index(t)), this.gotoSlide(e.closest(".iosslider"), this.selectedIdx() + 1);
}, o.prototype.updateIndex = function(e) {
var t, n;
return n = $(e).hasClass("prev-button") ? -1 :1, t = Math.max(0, this.selectedIdx() + n), 
t = Math.min(this.list().length - 1, t), this.selectedIdx(t);
}, o.prototype.gotoSlide = function(e, t) {
return e.iosSlider("goToSlide", t);
}, o;
}(Bobcat.Repeatable), Bobcat.SubMenu = function(t) {
function o(t) {
this.add = e(this.add, this), t.subItemClassName = "SubMenuItem", o.__super__.constructor.call(this, this, t), 
this.rootLastData = t;
}
return n(o, t), o.prototype.add = function(e) {
return o.__super__.add.call(this, e), this.selected().edit(), window.edit_page.setupTooltips(), 
window.edit_page.Event.publish("Submenu.add", {}), window.edit_page.track("Editor - Add External Link");
}, o;
}(Bobcat.Repeatable), Bobcat.SubMenuItem = function(t) {
function o() {
return this.remove = e(this.remove, this), this.select = e(this.select, this), this.editDone = e(this.editDone, this), 
this.edit = e(this.edit, this), o.__super__.constructor.apply(this, arguments);
}
return n(o, t), o.prototype.edit = function() {
return this.gotoState("editor");
}, o.prototype.editDone = function() {
return this.gotoState("normal"), this.parent.selected(null);
}, o.prototype.select = function(e) {
return this.isSelected() ? this.parent.selected(null) :(o.__super__.select.call(this, e), 
this.edit());
}, o.prototype.remove = function(e) {
return window.edit_page.removeTooltips(), o.__super__.remove.call(this, e), window.edit_page.Event.publish("Submenu.remove", {});
}, o;
}(Bobcat.RepeatableItem), Bobcat.Gallery = function(t) {
function o(t, n) {
var i, r, a = this;
this.root = t, this.prevImage = e(this.prevImage, this), this.nextImage = e(this.nextImage, this), 
this.changeImage = e(this.changeImage, this), this.upload = e(this.upload, this), 
this.clickRemoveCurrentHandler = e(this.clickRemoveCurrentHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.mouseleaveHandler = e(this.mouseleaveHandler, this), this.mouseenterHandler = e(this.mouseenterHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.add = e(this.add, this), 
this.createGalleryImage = e(this.createGalleryImage, this), r = {
sources:{
create:function(e) {
return a.createGalleryImage(e.data);
}
}
}, o.__super__.constructor.call(this, this.root, n, r), this.nullImage = this.createGalleryImage({
type:"Image",
url:"",
caption:"",
description:""
}), i = function() {
return "";
}, this.emptyImage = {
url:i,
caption:i,
description:i
}, this.current = ko.observable(), this.sources().length ? this.current(this.sources()[0]) :this.current(this.nullImage), 
this.empty = ko.dependentObservable(function() {
return 0 === a.sources().length;
}, this);
}
return n(o, t), o.include(Bobcat.ImageOptionHelper), o.StripHtml = function(e) {
return Bobcat.DOM.GALLERY_IMAGES(e).remove(), Bobcat.DOM.GALLERY_IMAGES_EDITOR(e).remove();
}, o.prototype.createGalleryImage = function(e) {
var t;
return e.type = "Image", e.deleteOverlayEnabled = !1, t = new Bobcat.Image(this.root, e, {}, this), 
t.enterDeleteHandler = function() {
return t.deleteOverlayEnabled(!0);
}, t.leaveDeleteHandler = function() {
return t.deleteOverlayEnabled(!1);
}, t;
}, o.prototype.add = function(e) {
var t;
return console.log("Gallery#add"), e.image_type = this.image_type(), t = this.createGalleryImage(e), 
this.sources.push(t), this.current(t), this.storeCommand();
}, o.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, o.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, o.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, o.prototype.clickEditorHandler = function(e) {
return this.current(e), this.gotoState("editor");
}, o.prototype.clickRemoveCurrentHandler = function() {
return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)), 
this.gotoState("normal");
}, o.prototype.upload = function(e) {
var t, n, o = this;
return e.target && (e = $(e.target)), this.storeStyle(e), t = {
mode:"multi",
hideTabs:[ $B.AssetDialog.ICON_LIB ]
}, n = new Bobcat.Shared.StrikinglyAssetPicker().pick({
saveRecord:!0,
assetDialogOptions:t,
handlers:{
imageSelected:function(e) {
var t, n, i, r, a;
for (n = o._imageStyle, a = [], i = 0, r = e.length; r > i; i++) t = e[i], a.push(o.add({
url:$.cloudinary.url("" + t.public_id + "." + t.format, n.custom),
thumb_url:$.cloudinary.url("" + t.public_id + "." + t.format, n.thumb)
}));
return a;
},
success:function(e) {
var t;
return t = o._imageStyle, o.add({
url:$.cloudinary.url("" + e.public_id + "." + e.format, t.custom),
thumb_url:$.cloudinary.url("" + e.public_id + "." + e.format, t.thumb)
});
}
}
}), window.edit_page.track("Editor - Upload Image Gallery");
}, o.prototype.changeImage = function(e) {
var t;
return t = (this.sources.indexOf(this.current()) + e) % this.sources().length, 0 > t && (t += this.sources().length), 
this.current(this.sources()[t]);
}, o.prototype.nextImage = function() {
return this.changeImage(1);
}, o.prototype.prevImage = function() {
return this.changeImage(-1);
}, o.prototype.isLastElement = function(e) {
return e.parent().find(".thumb").index(e) === this.sources().length - 1;
}, o.prototype.afterRender = function(e) {
var t;
return this.isLastElement($(e)) ? (t = Bobcat.DOM.GALLERY($(e)), t.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
})) :void 0;
}, o;
}(Bobcat.Component), Bobcat.Button = function(t) {
function o(t, n) {
this.root = t, this.toggleTarget = e(this.toggleTarget, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.changeUrl = e(this.changeUrl, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.link_url = e(this.link_url, this), this.target = e(this.target, this), "undefined" == typeof n.new_target && (n.new_target = !0), 
o.__super__.constructor.call(this, this.root, n, {});
}
return n(o, t), o.include(Bobcat.UrlHelper), o.prototype.target = function() {
return this.new_target() && "" !== this.url() ? "_blank" :"_self";
}, o.prototype.link_url = function() {
var e;
return e = this.url(), this.addProtocol(e);
}, o.prototype.doneClickHandler = function(e) {
var t;
return t = this.addProtocol(this.url()), this.url(t), o.__super__.doneClickHandler.call(this, e);
}, o.prototype.changeUrl = function(e) {
return this.url(e.attr("data-url"));
}, o.prototype.remove = function(e) {
return this.text(""), this.url(""), this.new_target(!1), this.doneClickHandler(e);
}, o.prototype.hasContent = function() {
return this.text().length > 0;
}, o.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, o.prototype.clickEditorHandler = function(e) {
return this.oldText = this.text(), this.oldUrl = this.url(), o.__super__.clickEditorHandler.call(this, e);
}, o.prototype.clickCancelEditorHandler = function() {
return this.text(this.oldText), this.url(this.oldUrl), this.hideEditorHandler();
}, o.prototype.toggleTarget = function() {
return this.new_target(!this.new_target());
}, o;
}(Bobcat.Component), Bobcat.Image = function(t) {
function o(t, n, i, r) {
var a = this;
this.root = t, this.parent = r, this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.remove = e(this.remove, this), 
this.clickRemoveHandler = e(this.clickRemoveHandler, this), this.clickGalleryEditorHandler = e(this.clickGalleryEditorHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.addFilter = e(this.addFilter, this), this.updateImage = e(this.updateImage, this), 
this.upload = e(this.upload, this), this.uploadWithoutIconLib = e(this.uploadWithoutIconLib, this), 
this.hasLink = e(this.hasLink, this), this.link = e(this.link, this), this.selectImage = e(this.selectImage, this), 
this.recover = e(this.recover, this), this.previewImage = e(this.previewImage, this), 
this.doneClickHandler = e(this.doneClickHandler, this), this.showDescriptionInput = e(this.showDescriptionInput, this), 
this.openAssetLib = e(this.openAssetLib, this), this.openDescriptionInput = e(this.openDescriptionInput, this), 
this.showLinkInput = e(this.showLinkInput, this), this.openLinkInput = e(this.openLinkInput, this), 
this.goToDescriptionField = e(this.goToDescriptionField, this), this.goToLinkUrlField = e(this.goToLinkUrlField, this), 
this.target = e(this.target, this), this.isNull(n.original_url) && (n.original_url = n.url), 
this.isNull(n.new_target) && (n.new_target = !0), n.linkInputEnabled = n.link_url ? n.link_url.length > 0 :!1, 
n.descriptionInputEnabled = n.caption ? n.caption.length > 0 :!1, this.isNull(n.caption) && (n.caption = ""), 
this.isNull(n.description) && (n.description = ""), o.__super__.constructor.call(this, this.root, n, i), 
this.parent && (this.selected = ko.dependentObservable(function() {
return a === a.parent.current();
}, this)), this.assetUrl = ko.dependentObservable(function() {
return window.asset_path(a.url());
}, this), this.loadingSpinner = !0, this.cloudinaryInitialized = !1;
}
return n(o, t), o.include(Bobcat.UrlHelper), o.include(Bobcat.ImageOptionHelper), 
o.prototype.target = function() {
return this.new_target() && "" !== this.link_url() ? "_blank" :"_self";
}, o.prototype.goToLinkUrlField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find(".link_url").focus(), window.el = t;
}, o.prototype.goToDescriptionField = function(e, t) {
return e.preventDefault(), $(t).closest("form").find("textarea").focus(), window.el = t;
}, o.prototype.openLinkInput = function() {
return this.linkInputEnabled(!0);
}, o.prototype.showLinkInput = function() {
return this.linkInputEnabled();
}, o.prototype.openDescriptionInput = function() {
return this.descriptionInputEnabled(!0);
}, o.prototype.openAssetLib = function(e, t) {
var n;
return n = e.closest(".image-component").data("asset-type"), null != n && window.edit_page.Event.publish("AssetLibrary.suggestSet", n), 
this.upload(e, t, !0), window.edit_page.track("Click More Icons Button - Editor v1");
}, o.prototype.showDescriptionInput = function() {
return this.descriptionInputEnabled();
}, o.prototype.doneClickHandler = function(e) {
return o.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("ImageComponent.afterChange", {
target:e.closest(".image-component")
});
}, o.prototype.previewImage = function(e) {
return this.tmpUrl || (this.tmpUrl = this.url()), this.url(e.attr("data-image-url")), 
this.onPreview = !0;
}, o.prototype.recover = function() {
return this.onPreview ? (this.url(this.tmpUrl), this.tmpUrl = "") :void 0;
}, o.prototype.selectImage = function(e) {
return this.url(e.attr("data-image-url")), this.tmpUrl = "", this.onPreview = !1, 
this.doneClickHandler(e.closest(".editor").find(".se-done-btn").first());
}, o.prototype.link = function() {
var e;
return e = this.link_url(), this.addProtocol(e);
}, o.prototype.hasLink = function() {
return !!this.link_url();
}, o.prototype.uploadWithoutIconLib = function(e, t) {
return this.upload(e, t, void 0, {
hideTabs:[ $B.AssetDialog.ICON_LIB ]
});
}, o.prototype.upload = function(e, t, n, o) {
var i, r, a = this;
return null == o && (o = {}), e.target && (e = $(e.target)), this.storeStyle(e), 
i = $.extend({
mode:"single",
hideTabs:[]
}, o), 1 === e.data("open-iconlib-tab") && (i.initialTabIdx = 2), null != n ? (i.initialTabIdx = 2, 
i.iconLibComponents = n === !0 ? "icon" :"background") :"BackgroundImage" === this.type() || "Blog.BackgroundImage" === this.type() ? i.iconLibComponents = "background" :"Image" === this.type() ? i.iconLibComponents = "icon" :"Blog.Image" === this.type() && (i.hideTabs = [ $B.AssetDialog.ICON_LIB ]), 
r = new Bobcat.Shared.StrikinglyAssetPicker().pick({
saveRecord:!0,
assetDialogOptions:i,
handlers:{
imageSelected:function(e) {
return a.updateImage(e);
},
success:function(e) {
return a.updateImage(e), "BackgroundImage" === a.type() ? (a.oldUrl = a.url(), window.edit_page.Event.publish("Background.changeBackgroundImage"), 
a.storeCommand()) :void 0;
}
}
}), window.edit_page.track("Editor - Upload Image");
}, o.prototype.updateImage = function(e) {
var t;
return this.loadingSpinner && this.url($('meta[name="loading-image-spinner"]').attr("content")), 
t = this._imageStyle, null != e.public_id ? ("BackgroundImage" === this.type() && "gif" !== e.format && (e.format = "jpg", 
t.custom.quality = 90, t.custom.flags = "progressive"), this.loadData({
url:$.cloudinary.url("" + e.public_id + "." + e.format, t.custom),
thumb_url:$.cloudinary.url("" + e.public_id + "." + e.format, t.thumb),
original_url:e.url
})) :(this.loadData({
url:e.url,
thumb_url:e.thumb_url,
original_url:e.url
}), "BackgroundImage" === this.type() && null != e.extraOptions && (null != e.extraOptions.backgroundClassName && this.selectedClassName(e.extraOptions.backgroundClassName), 
null != e.extraOptions.backgroundSizing && this.style(e.extraOptions.backgroundSizing))), 
"BackgroundImage" === this.type() ? window.edit_page.Event.publish("Background.changeBackgroundImage") :void 0;
}, o.prototype.addFilter = function(e) {
var t, n, o, i = this;
return $B.Singleton.ImageUploader || ($B.Singleton.ImageUploader = new $B.ImageUploader(), 
$B.Singleton.ImageUploader.init()), this.imageUploader = $B.Singleton.ImageUploader, 
this.storeStyle(e), "undefined" == typeof window.featherEditor || "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.effects_network_error")), 
void 0) :(n = "free" === (null != (o = $S.user_meta || $S.userMeta) ? o.plan :void 0) ? [ "effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast" ] :[ "enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish" ], 
t = function(e) {
return e = window.asset_path(e), e.replace("https://", "http://");
}, window.featherEditor.launch({
tools:n,
onSave:function(e, t) {
return window.featherEditor.close(), edit_page.Event.publish("ImageUploader.uploadFromUrl", {
url:t,
success:function(e) {
return console.log("hello world"), i.updateImage(e), "BackgroundImage" === i.type() ? (i.oldUrl = i.url(), 
window.edit_page.Event.publish("Background.changeBackgroundImage"), i.storeCommand()) :void 0;
}
});
},
image:e.closest("form").find("img"),
url:t(this.url())
}));
}, o.prototype.clickEditorHandler = function(e) {
return this.oldUrl = this.url(), this.oldThumbUrl = this.thumb_url(), o.__super__.clickEditorHandler.call(this, e);
}, o.prototype.clickCancelEditorHandler = function() {
return this.url(this.oldUrl), this.thumb_url(this.oldThumbUrl), this.hideEditorHandler();
}, o.prototype.clickGalleryEditorHandler = function(e) {
return this.parent ? (this.parent.current(this), this.parent.gotoState("editor"), 
setTimeout(function() {
return $(window).scrollTo(e.closest(".editable").find(".editor"), {
easing:"easeOutQuint",
duration:300,
axis:"y",
offset:-150
});
}, 200)) :void 0;
}, o.prototype.clickRemoveHandler = function() {
return this.parent.sources.remove(this), this.parent.storeCommand();
}, o.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.thumb_url(this.TRANSPARENT_IMAGE_URL);
}, o.prototype.hasContent = function() {
return !this.isImageTransparent(this.url());
}, o.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, o;
}(Bobcat.Component), Bobcat.TextStyle = function(e) {
function t(e, n, o) {
this.root = e, this.parent = o, t.__super__.constructor.call(this, this.root, n, {});
}
return n(t, e), t;
}(Bobcat.Component), Bobcat.BackgroundImage = function(t) {
function o(t, n) {
var i, r, a, s, l, u, c = this;
if (this.root = t, this.onDoneHandler = e(this.onDoneHandler, this), this.onClickHandler = e(this.onClickHandler, this), 
this.saveSelection = e(this.saveSelection, this), this.selectImage = e(this.selectImage, this), 
this.stockImages = e(this.stockImages, this), this.bgObject = e(this.bgObject, this), 
this.recover = e(this.recover, this), this.previewImage = e(this.previewImage, this), 
this.remove = e(this.remove, this), this.selectedStyleLazy = e(this.selectedStyleLazy, this), 
this.selectedStyle = e(this.selectedStyle, this), this.textStyle = e(this.textStyle, this), 
this.inImageMode = e(this.inImageMode, this), this.getSelectedClassName = e(this.getSelectedClassName, this), 
this.selectBackgroundVariation = e(this.selectBackgroundVariation, this), this.previewBackgroundVariation = e(this.previewBackgroundVariation, this), 
this.uploadFromLib = e(this.uploadFromLib, this), this.hasBackgroundVariations = e(this.hasBackgroundVariations, this), 
r = {}, r.textStyles = {
create:function(e) {
return new Bobcat.TextStyle(c.root, e.data, c);
}
}, null == n.backgroundVariation && (n.backgroundVariation = ""), null == n.selectedClassName && (n.selectedClassName = "strikingly-light-text"), 
(null == n.textStyles || 0 === n.textStyles.length) && (n.textStyles = [ {
displayName:"Light Text",
className:"strikingly-light-text"
}, {
displayName:"Dark Text",
className:"strikingly-dark-text"
} ]), this.backgroundVariations = [], null != ("undefined" != typeof $S && null !== $S ? null != (l = $S.conf) ? l.theme_background_variations :void 0 :void 0)) {
u = $S.conf.theme_background_variations;
for (i in u) s = u[i], a = $.extend(!0, {}, s), a.component = this, this.backgroundVariations.push(a);
}
o.__super__.constructor.call(this, this.root, n, r, null), this.opacity_f = ko.dependentObservable(function() {
return c.opacity() / 100;
}), this.onPreview = !1, this.formOpen = ko.observable(!1), this.loadingSpinner = !1, 
this.selectedClassName.subscribe(function(e) {
return c.triggerEvent("BackgroundImage.ChangeTextColor", e);
});
}
return n(o, t), o.prototype.hasBackgroundVariations = function() {
return this.backgroundVariations.length > 0;
}, o.prototype.uploadFromLib = function(e) {
return this.upload(e, null, !1);
}, o.prototype.previewBackgroundVariation = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.onPreview = !0;
}, o.prototype.selectBackgroundVariation = function(e) {
var t;
return this.url(this.TRANSPARENT_IMAGE_URL), this.backgroundVariation(e.attr("data-class-name")), 
this.saveSelection(), this.onPreview = !1, "function" == typeof (t = window.edit_page).track && t.track("Change Variation - Background - Editor v1"), 
this.triggerEvent("BackgroundImage.ChangeVariation", e), window.edit_page.Event.publish("Background.changeBackgroundVariation", {
target:e
});
}, o.prototype.getSelectedClassName = function() {
return !window.edit_page.isShowPage && this.hasBackgroundVariations() ? this.hasContent() ? this.selectedClassName() :this.backgroundVariation() :"" !== ("function" == typeof this.backgroundVariation ? this.backgroundVariation() :void 0) ? this.backgroundVariation() :!this.hasBackgroundVariations() || this.hasContent() ? this.selectedClassName() :"";
}, o.prototype.inImageMode = function() {
return this.hasBackgroundVariations() ? this.hasContent() || this.onPreview ? !0 :!1 :!0;
}, o.prototype.textStyle = function() {
var e, t = this;
return e = this.textStyles().filter(function(e) {
return e.className() === t.selectedClassName();
}), e[0];
}, o.prototype.selectedStyle = function() {
var e, t, n;
return t = function() {
switch (this.style()) {
case "cover":
return "cover";

case "contain":
return "contain";

case "100%":
return "100%";

case "stretch":
return "100%";

case "fit":
return "cover";

default:
return "auto";
}
}.call(this), e = function() {
switch (this.style()) {
case "tile":
return "repeat";

default:
return "no-repeat";
}
}.call(this), n = {
backgroundPosition:"49% 50%",
backgroundImage:"url(" + this.assetUrl() + ")",
backgroundRepeat:e,
backgroundSize:t
};
}, o.prototype.selectedStyleLazy = function() {
var e;
return e = this.selectedStyle(), e.backgroundImage = "url(" + asset_path("/assets/icons/transparent.png") + ")", 
e;
}, o.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.storeCommand();
}, o.prototype.previewImage = function(e) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style(), this.oldBackgroundVariation = this.backgroundVariation()), 
this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.onPreview = !0;
}, o.prototype.recover = function() {
return this.onPreview ? (this.url(this.oldUrl), this.style(this.oldStyle), this.backgroundVariation(this.oldBackgroundVariation), 
this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", this.onPreview = !1) :void 0;
}, o.prototype.bgObject = function(e) {
return {
url:"http://uploads.striking.ly/page/images/backgrounds/" + e + ".jpg",
thumbUrl:"http://uploads.striking.ly/page/images/backgrounds/" + e + "-thumb.jpg",
style:"stretch",
component:this
};
}, o.prototype.stockImages = function(e) {
var t, n, o, i, r, a, s, l, u;
if ("solidBanner" === e) {
for (a = [ "banners/banner1", "bg3", "banners/banner3" ], l = [], n = 0, i = a.length; i > n; n++) t = a[n], 
l.push(this.bgObject(t));
return l;
}
for (s = [ "bg1", "bg5", "bg6" ], u = [], o = 0, r = s.length; r > o; o++) t = s[o], 
u.push(this.bgObject(t));
return u;
}, o.prototype.selectImage = function(e) {
return this.url(e.attr("data-url")), this.style(e.attr("data-style")), this.saveSelection(), 
this.triggerEvent("BackgroundImage.SelectImage", e);
}, o.prototype.saveSelection = function() {
return this.storeCommand(), this.oldUrl = "", this.oldStyle = "", this.oldBackgroundVariation = "", 
this.onPreview = !1, window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved();
}, o.prototype.onClickHandler = function(e) {
var t;
return t = e.parent().parent().find(".background-form"), this.formOpen() ? (t.slideUp(), 
this.formOpen(!1)) :(t.slideDown(), this.formOpen(!0));
}, o.prototype.onDoneHandler = function(e) {
var t;
return t = e.closest(".background-form"), t.slideUp(), window.edit_page.unsavedChanges() && window.edit_page.track("Editor - Edit Background"), 
window.edit_page.saveWhenUnsaved(), this.formOpen(!1);
}, o;
}(Bobcat.Image), Bobcat.SlideSettings = function(t) {
function o(t, n) {
var i = this;
this.root = t, this.data = n, this.isSkinny = e(this.isSkinny, this), this.hasPremiumApp = e(this.hasPremiumApp, this), 
this.onClickHandler = e(this.onClickHandler, this), this.initWhenBound = e(this.initWhenBound, this), 
this.layoutCount = ko.observable(0), this.layoutIndex = ko.observable(0), this.layoutStatus = ko.dependentObservable(function() {
return "" + (i.layoutIndex() + 1);
}), null == n.layout_variation && (n.layout_variation = ""), o.__super__.constructor.call(this, this.root, n);
}
return n(o, t), o.prototype.initWhenBound = function(e) {
var t;
return t = e.data("layout-presets"), console.log("presets"), console.log(t), this.layouts = _.pluck(t, "key"), 
this.layoutCount(this.layouts.length), this.layoutIndex(this.layouts.indexOf(this.layout_variation())), 
-1 === this.layoutIndex() && (this.layout_variation(this.layouts[0]), this.layoutIndex(0)), 
this.data.layout_variation = this.layout_variation;
}, o.prototype.onClickHandler = function() {
return this.layout_variation(this.layouts[(this.layoutIndex() + 1) % this.layouts.length]), 
this.layoutIndex(this.layouts.indexOf(this.layout_variation())), this.rootLastData = this.data, 
window.edit_page.unsavedChanges() && window.edit_page.track("Change Layout - Editor v1"), 
window.edit_page.saveWhenUnsaved();
}, o.prototype.hasPremiumApp = function() {
return _.some(this.root.components, function(e) {
return "function" == typeof e.isPremiumApp ? e.isPremiumApp() :void 0;
});
}, o.prototype.isSkinny = function() {
return "skinny" === this.layout_variation();
}, o;
}(Bobcat.Component), Bobcat.Menu = function(e) {
function t(e) {
var n, o = this;
this.data = e, n = {}, n.components = {
create:function(e) {
var t, n, i, r;
n = {}, n.firstSlideBackground = function(e) {
return null == e && (e = "background1"), window.edit_page.data.slides()[0].components[e];
}, r = e.data;
for (t in r) i = r[t], n[t] = "Image" === i.type ? new Bobcat[i.type](o, i, {}, null) :new Bobcat[i.type](o, i), 
"undefined" != typeof n[t].init && n[t].init();
return n;
}
}, t.__super__.constructor.call(this, this, this.data, n), this.rootLastData = this.data;
}
return n(t, e), t.prototype.hideAllEditors = function() {
return this.logo.hideEditorHandler();
}, t;
}(Bobcat.Component), Bobcat.Footer = function(e) {
function t(e) {
var n, o = this;
n = {
socialMedia:{
create:function(e) {
return new Bobcat[e.data.type](o, e.data, o);
}
},
copyright:{
create:function(e) {
return new Bobcat[e.data.type](o, e.data, o);
}
}
}, t.__super__.constructor.call(this, this, e, n), this.rootLastData = e;
}
return n(t, e), t.prototype.lastSlideBackground = function(e) {
var t;
return null == e && (e = "background1"), t = window.edit_page.data.slides().length - 1, 
window.edit_page.data.slides()[t].components[e];
}, t;
}(Bobcat.Component), Bobcat.Media = function(t) {
function o(t, n) {
var i, r = this;
this.root = t, this.inEditorAndHasNoContent = e(this.inEditorAndHasNoContent, this), 
this.hasNoContentAndIsEditMode = e(this.hasNoContentAndIsEditMode, this), this.hasContentOrIsEditMode = e(this.hasContentOrIsEditMode, this), 
this.hasContent = e(this.hasContent, this), this.showImage = e(this.showImage, this), 
this.showVideo = e(this.showVideo, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
i = {
video:{
create:function(e) {
var t;
return t = e.data, t.type = "Video", new Bobcat.Video(r.root, t, r);
}
},
image:{
create:function(e) {
var t;
return t = e.data, t.type = "Image", new Bobcat.Image(r.root, t, {}, r);
}
}
}, o.__super__.constructor.call(this, this.root, n, i);
}
return n(o, t), o.prototype.clickEditorHandler = function(e) {
return o.__super__.clickEditorHandler.call(this, e), this.image.clickEditorHandler(e), 
this.video.clickEditorHandler(e), this.triggerEvent("Media.BeforeChange", {
target:e
});
}, o.prototype.clickCancelEditorHandler = function(e) {
return this.image.clickCancelEditorHandler(e), this.video.clickCancelEditorHandler(e), 
this.hideEditorHandler();
}, o.prototype.doneClickHandler = function(e) {
return o.__super__.doneClickHandler.call(this, e), window.edit_page.Event.publish("Media.afterChange"), 
this.triggerEvent("Media.AfterChange", {
target:e
});
}, o.prototype.showVideo = function() {
return "video" === this.current() && this.video.html() && this.video.html().length > 0;
}, o.prototype.showImage = function() {
return "image" === this.current();
}, o.prototype.hasContent = function() {
return "video" === this.current() && this.video.html() || "image" === this.current() && this.image.url() && !this.isImageTransparent(this.image.url());
}, o.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, o.prototype.hasNoContentAndIsEditMode = function() {
return !window.edit_page.isShowPage && !this.hasContent();
}, o.prototype.inEditorAndHasNoContent = function() {
return !this.isState("editor") && ("video" === this.current() && (!this.video.html() || 0 === this.video.html().length) || "image" === this.current() && 0 === this.image.url().length);
}, o;
}(Bobcat.Component), Bobcat.EmailForm = function(t) {
function o(t, n) {
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = e(this.clickEditorHandler, this), this.hasMessageBox = e(this.hasMessageBox, this), 
this.hasNameBox = e(this.hasNameBox, this), this.hasEmailBox = e(this.hasEmailBox, this), 
this.isEmailInvalid = e(this.isEmailInvalid, this), this.isNameEmpty = e(this.isNameEmpty, this), 
this.isSuccess = e(this.isSuccess, this), this.isError = e(this.isError, this), 
this.submit = e(this.submit, this), n.isLoading = !1, n.recipient || (n.recipient = ""), 
this.isNull(n.hideMessageBox) && (n.hideMessageBox = !1), this.isNull(n.hide_name) && (n.hide_name = !1), 
this.isNull(n.hide_email) && (n.hide_email = !1), this.isNull(n.thanksMessage) && (n.thanksMessage = "Thanks for your message!"), 
null == $S.page_meta.edit_count && $S.page_meta.show_strikingly_logo && (n.thanksMessage = $("#brand-info").html().replace(/\${thanksMessage}/, $("<div></div>").text(n.thanksMessage).html())), 
this.isNull(n.name_label) && (n.name_label = "Name", n.email_label = "Email", n.message_label = "Message"), 
this.isNull(n.submit_label) && (n.submit_label = "Submit"), o.__super__.constructor.call(this, this.root, n, {}), 
this.status = ko.observable(""), this.invalidEmail = ko.observable(!1), this.invalidName = ko.observable(!1);
}
return n(o, t), o.include(Bobcat.UrlHelper), o.prototype.isRecipientEmailValid = function() {
return 0 === this.recipient().length || this.isEmail(this.recipient());
}, o.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, o.prototype.submit = function(e) {
var t = this;
if (window.edit_page.isShowPage) return this.reset(), this.isLoading(!0), e.closest("form").ajaxSubmit({
success:function(e) {
return console.log(e), t.status(e.status), t.isLoading(!1), Bobcat.PageAE.gaPushUserSite([ "_trackEvent", "Actions", "EmailCollected" ]), 
window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(e) {
var n;
if (n = jQuery.parseJSON(e.responseText), console.log(n), t.status(n.status), t.isLoading(!1), 
!n.message) throw alert(n.html), n.html;
return n.message.invalid_email && t.invalidEmail(!0), n.message.invalid_name ? t.invalidName(!0) :void 0;
}
});
}, o.prototype.isError = function() {
return "error" === this.status();
}, o.prototype.isSuccess = function() {
var e;
return e = this.status(), "ok" === e;
}, o.prototype.isNameEmpty = function() {
return this.invalidName();
}, o.prototype.isEmailInvalid = function() {
return this.invalidEmail();
}, o.prototype.hasEmailBox = function() {
return !this.hide_email();
}, o.prototype.hasNameBox = function() {
return !this.hide_name();
}, o.prototype.hasMessageBox = function() {
return !this.hideMessageBox();
}, o.prototype.clickEditorHandler = function(e) {
return o.__super__.clickEditorHandler.call(this, e);
}, o.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, o.prototype.doneClickHandler = function(e) {
return o.__super__.doneClickHandler.call(this, e), window.edit_page.track("Edit Contact Form - Editor v1");
}, o;
}(Bobcat.Component);
}.call(this), function() {
var e, t = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, n = {}.hasOwnProperty, o = function(e, t) {
function o() {
this.constructor = e;
}
for (var i in t) n.call(t, i) && (e[i] = t[i]);
return o.prototype = t.prototype, e.prototype = new o(), e.__super__ = t.prototype, 
e;
};
e = function(e) {
var t, n, o, i, r, a, s, l;
return t = [ 60, 80, 100, 130, 160 ], o = 14, n = 84, a = function(e) {
var t, n;
return t = 100, n = parseFloat($(e.getBody()).css("font-size")), $(e.getBody()).find("*").each(function() {
var e, o;
return e = null != (o = this.style) ? o.fontSize :void 0, -1 !== (null != e ? e.indexOf("%") :void 0) ? (t = parseFloat(e), 
n = parseFloat($(this).css("font-size")), !1) :void 0;
}), {
perc:t,
px:n
};
}, r = function(e, i) {
var r, s, l;
return s = a(e), s.px >= n && i > 0 ? !1 :s.px <= o && 0 > i ? !1 :(l = $.inArray(s.perc, t), 
-1 === l && (l = $.inArray(100, t)), r = l + i, r > t.length - 1 ? !1 :0 > r ? !1 :t[r] + "%");
}, l = function(e, t) {
var n;
return n = e.selection.getBookmark(), e.selection.select(e.getBody(), !0), e.execCommand("FontSize", null, t), 
e.execCommand("LineHeight", null, t), e.selection.moveToBookmark(n);
}, s = function(e) {
var t;
return (t = r(e, 1)) ? (l(e, t), window.analytics.track("Font Size Up - Editor v1")) :void 0;
}, i = function(e) {
var t;
return (t = r(e, -1)) ? (l(e, t), window.analytics.track("Font Size Down - Editor v1")) :void 0;
}, e.addButton("fontsizeup", {
title:"Increase Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-up.png"),
onclick:function() {
return s(e);
}
}), e.addButton("fontsizedown", {
title:"Decrease Font Size",
image:asset_path("/assets/editor2/tinymce-fontsize-down.png"),
onclick:function() {
return i(e);
}
}), e.onExecCommand.add(function(e, t) {
var n;
return "InsertUnorderedList" === t || "InsertOrderedList" === t ? (n = r(e, 0), 
$(e.getBody()).find("li *").each(function() {
var e, t;
return (null != (e = this.style) ? null != (t = e.fontSize) ? t.indexOf(!0) :void 0 :void 0) ? this.style.fontSize = "" :void 0;
}), l(e, n)) :void 0;
});
}, $B.RichText = function(n) {
function i(e, n) {
this.root = e, this.getFontStyle = t(this.getFontStyle, this), this.isCenterAligned = t(this.isCenterAligned, this), 
this.isRightAligned = t(this.isRightAligned, this), this.isLeftAligned = t(this.isLeftAligned, this), 
this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), this.showEmptyText = t(this.showEmptyText, this), 
this.hasContent = t(this.hasContent, this), this.clickEditorHandler = t(this.clickEditorHandler, this), 
this.changeFontHandler = t(this.changeFontHandler, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.textValue = t(this.textValue, this), this.doneClickHandler = t(this.doneClickHandler, this), 
this._triggerEvent = t(this._triggerEvent, this), this.deleteHandler = t(this.deleteHandler, this), 
i.__super__.constructor.call(this, this.root, n), this.textarea = null, this.editor = null, 
this.originText = null;
}
return o(i, n), i.TINYMCE_OPTIONS = {
gecko_spellcheck:!0,
theme:"advanced",
skin:"striking",
plugins:"autoresize,paste,inlinepopups",
forced_root_block:"div",
remove_linebreaks:!1,
theme_advanced_buttons1:"bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull,fontsizeup,fontsizedown",
theme_advanced_buttons2:"",
theme_advanced_statusbar_location:"none",
theme_advanced_toolbar_align:"left",
paste_text_sticky:!0,
paste_remove_styles:!0,
paste_strip_class_attributes:"all",
convert_urls:!1,
relative_urls:!1,
valid_styles:{
"*":"text-align,text-decoration,font-size"
}
}, i.prototype.deleteHandler = function(e, t) {
return t.stopPropagation(), this.editor && this.editor.tinymce() ? (this.editor.tinymce().setContent(""), 
this.editor.tinymce().focus()) :void 0;
}, i.prototype.init = function() {}, i.prototype._triggerEvent = function(e, t) {
return this.triggerEvent(e, {
component:this,
target:t.closest(".text-component")
});
}, i.prototype.doneClickHandler = function(e) {
return this.done(), i.__super__.doneClickHandler.call(this, e), e ? (window.edit_page.Event.publish("RichTextComponent.afterTextChange", {
target:e.closest(".text-component")
}), this._triggerEvent("Text.Save", e)) :void 0;
}, i.prototype.textValue = function() {
return this.value().replace(/<\/?.*?>/g, "");
}, i.prototype.clickCancelEditorHandler = function(e) {
return this.cancel(), this.hideEditorHandler(), this._triggerEvent("Text.Cancel", e);
}, i.prototype.changeFontHandler = function(e) {
return this.doneClickHandler(e), window.edit_page.showStylePanel(e.attr("text-type")), 
window.edit_page.showMenu(), this._triggerEvent("Text.ChangeFont", e);
}, i.prototype.clickEditorHandler = function(t) {
var n = this;
if (i.__super__.clickEditorHandler.call(this, t)) return this.textarea = t.find($B.DOM.EDITOR).find("textarea"), 
this.originText = this.filterText(this.textarea.val()), this.editor && this.editor.tinymce() || (this.editor = this.textarea.tinymce($.extend({
setup:function(o) {
return o.onChange.add(function() {
return n._triggerEvent("Text.ChangeText", t);
}), e(o), o.onInit.add(function(e) {
return $(e.getBody()).css({
"font-size":t.css("font-size"),
"text-align":t.css("text-align")
}), e.pasteAsPlainText = !0;
}), o.onKeyDown.add(function(e, t) {
return 13 === t.keyCode && t.shiftKey && window.editorTracker.closeLastEditor() ? ($(window).resize(), 
t.preventDefault()) :void 0;
}), o.onClick.add(function(e) {
return $(e.getBody()).find("a").each(function(e, t) {
var o;
return o = $(t).attr("href"), n.pattern || (n.pattern = new RegExp("^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")), 
n.pattern.test(o) ? ($(t).attr("href", "http://" + o), $(t).attr("data-mce-href", "http://" + o)) :void 0;
});
});
},
init_instance_callback:function(e) {
return e.execCommand("mceAutoResize");
}
}, this.constructor.TINYMCE_OPTIONS))), this.editor.tinymce() && this.editor.tinymce().focus(), 
this.editor.init(), this._triggerEvent("Text.ClickEditor", t);
}, i.prototype.hasContent = function() {
return !/^\s*$/.test(this.value());
}, i.prototype.showEmptyText = function() {
return !this.hasContent() && !this.isState("editor");
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i.prototype.isLeftAligned = function() {
return /style="text-align: left;"/.test(this.value());
}, i.prototype.isRightAligned = function() {
return /style="text-align: right;"/.test(this.value());
}, i.prototype.isCenterAligned = function() {
return /style="text-align: center;"/.test(this.value());
}, i.prototype.getFontStyle = function(e, t) {
var n, o;
return null == t && (t = window.edit_page.data), e || (e = "body"), n = null != t ? "function" == typeof t[o = e + "Font"] ? t[o]() :void 0 :void 0, 
"" === n && (n = "inherit"), n ? {
fontFamily:n
} :{};
}, i.prototype.done = function() {
var e;
return this.editor && this.editor.tinymce() ? (e = this.filterText(this.textarea.val()), 
this.value(e), this.originText = e) :void 0;
}, i.prototype.filterText = function(e) {
return e = e.replace(/^<div>(\s|&nbsp;)?<\/div>$/, ""), e.replace("<p><br></p>", "");
}, i.prototype.cancel = function() {
return this.editor && this.editor.tinymce() ? (this.value(this.originText), this.textarea.tinymce().execCommand("mceSetContent", !1, this.originText)) :void 0;
}, i.prototype.beforeMoveHandler = function() {
return this.editor && this.editor.tinymce() ? (this.editor.tinymce().remove(), this.gotoState("normal")) :void 0;
}, i.prototype.afterMoveHandler = function() {}, i;
}($B.Text);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function o() {
this.constructor = e;
}
for (var i in n) t.call(n, i) && (e[i] = n[i]);
return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype, 
e;
}, o = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
Bobcat.HtmlComponent = function(t) {
function i(t, n) {
this.root = t, this.isPremiumApp = e(this.isPremiumApp, this), this.saveComponent = e(this.saveComponent, this), 
this.reloadIframe = e(this.reloadIframe, this), this.doneClickHandler = e(this.doneClickHandler, this), 
this.update = e(this.update, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.initWhenBound = e(this.initWhenBound, this), this.destroy = e(this.destroy, this), 
this.data = n, n.htmlValue = this.htmlDecode(n.value), n.selected_app_name || (n.selected_app_name = null), 
"undefined" == typeof n.render_as_iframe && (n.render_as_iframe = !1), n.app_list || (n.app_list = "{}"), 
n.editorIframeSrc = n.selected_app_name ? "/s/html_editor/" + n.id :"/s/editor/app_store_placeholder", 
i.__super__.constructor.call(this, this.root, n, {}), this.appList = jQuery.parseJSON(n.app_list), 
this.originalIframeSrc = this.editorIframeSrc();
}
return n(i, t), i.include(Bobcat.HtmlHelper), i.prototype.destroy = function() {
var e;
return e = $.ajax("/s/components/" + this.id(), {
type:"DELETE",
dataType:"json",
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function() {},
error:function(e) {
var t;
return t = jQuery.parseJSON(e.responseText);
}
});
}, i.prototype.initWhenBound = function(e) {
var t;
return t = e.parent().find("iframe").first(), Bobcat.TH.resizeIFrame(t);
}, i.prototype.clickEditorHandler = function() {
var e, t, n = this;
return t = {
id:this.id(),
value:this.value(),
htmlValue:this.htmlValue(),
render_as_iframe:this.render_as_iframe(),
app_list:this.app_list(),
selected_app_name:this.selected_app_name()
}, e = new $B.AppStoreDialog(t, function(t) {
return n.update(t), e.close();
}, function() {
return e.close();
});
}, i.prototype.update = function(e) {
return e.id === this.id() ? (this.value(e.value), this.htmlValue(e.htmlValue), this.render_as_iframe(e.render_as_iframe), 
this.app_list(e.app_list), this.selected_app_name(e.selected_app_name), this.saveComponent(), 
window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutExternalService("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand()) :void 0;
}, i.prototype.doneClickHandler = function(e) {
return this.done(e) !== !1 ? i.__super__.doneClickHandler.call(this, e) :void 0;
}, i.prototype.cancel = function() {
return this.value(this.htmlEncode(this.originText)), this.htmlValue(this.originText);
}, i.prototype.reloadIframe = function() {
var e;
return this.iframeSrcQ || (this.iframeSrcQ = 0), e = "" + this.originalIframeSrc + "?q=" + ++this.iframeSrcQ, 
~e.indexOf("/s/editor/app_store_placeholder") && (e = "/s/html_editor/" + this.id(), 
this.originalIframeSrc = e), this.editorIframeSrc(e);
}, i.prototype.saveComponent = function() {
var e, t = this;
return e = ko.mapping.toJS(this), $.ajax("/s/components/" + this.id(), {
dataType:"json",
type:"PUT",
data:{
component:{
value:ko.toJSON(e)
}
},
success:function() {
return t.reloadIframe();
}
});
}, i.prototype.isPremiumApp = function() {
var e;
return e = this.selected_app_name(), o.call($S.page_meta.premium_app_list, e) >= 0;
}, i;
}(Bobcat.Component);
}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function o() {
this.constructor = e;
}
for (var i in n) t.call(n, i) && (e[i] = n[i]);
return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype, 
e;
};
Bobcat.BlogCollectionComponent = function(t) {
function o(t, n) {
var i;
this.root = t, this.doneClickHandler = e(this.doneClickHandler, this), this.clickEditorHandler = e(this.clickEditorHandler, this), 
this.loadPosts = e(this.loadPosts, this), (this.root || n) && o.__super__.constructor.call(this, this.root, n), 
null != (i = this.root) && i.addSubscriber("BlogManager.CloseDialog", this.loadPosts), 
this.collectionWrapper = $(".s-blog-col-placeholder"), this.collectionWrapper.length && (this.page = 1, 
this.loadPosts());
}
return n(o, t), o.prototype.setupNavButtons = function(e) {
var t, n, o = this;
return n = this.collectionWrapper.find(".s-blog-prev-link"), t = this.collectionWrapper.find(".s-blog-next-link"), 
e === this.page ? n.hide() :n.show().click(function() {
return o.loadPosts(o.page + 1);
}), 1 === this.page ? t.hide() :t.show().click(function() {
return o.loadPostsnew(o.page - 1);
});
}, o.prototype.clearPosts = function() {
var e;
return e = this.collectionWrapper.height(), this.collectionWrapper.html("").css("height", e);
}, o.prototype.loadDataIntoTemplate = function(e) {
var t, n, o, i;
if ("undefined" != typeof moment && null !== moment) for (i = e.blogPosts, n = 0, 
o = i.length; o > n; n++) t = i[n], t.publishedAt = moment(t.publishedAt).format("MMMM D");
return $B.log("[Blog Preview Section] tmplData = ", e), this.collectionWrapper.html(_.template($("#blog-collection-tmpl").html(), e)), 
this.collectionWrapper.css("height", "auto"), this.setupNavButtons(e.pagination.blogPosts.totalPages), 
$(window).resize();
}, o.prototype.loadPosts = function(e) {
var t, n, o = this;
return null == e && (e = 1), this.page = e, this.clearPosts(), t = $S.page_meta.page_id || $S.page_meta.id, 
n = "/r/v1/pages/" + t + ("/blog?expand=blogPosts&limit=null&page=" + e), $.ajax({
type:"GET",
url:n,
beforeSend:function(e) {
return e.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
contentType:"application/json",
success:function(e) {
var t;
return console.log("Success: ", e), t = e.data.blog, o.loadDataIntoTemplate(t);
},
error:function(e) {
return console.log("Error: ", e);
}
});
}, o.prototype.clickEditorHandler = function() {
return this.dialog = new $B.BlogManagerDialog(), this.dialog.open();
}, o.prototype.doneClickHandler = function(e) {
return o.__super__.doneClickHandler.call(this, e);
}, o;
}(Bobcat.Component);
}.call(this), function() {
ko.bindingHandlers.stopBinding = {
init:function() {
return {
controlsDescendantBindings:!0
};
}
}, ko.bindingHandlers.runWhenBound = {
init:function(e, t) {
return t()($(e));
}
}, ko.bindingHandlers.enterKeyPress = {
init:function(e, t, n, o) {
var i;
i = n(), $(e).keypress(function(t) {
var n;
return n = t.which ? t.which :t.keyCode, 13 === n ? (i.enterKeyPress.call(o, t, e), 
!1) :!0;
});
}
}, ko.bindingHandlers.invisible = {
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), ko.bindingHandlers.visible.update(e, function() {
return !n;
});
}
}, ko.bindingHandlers.className = {
update:function(e, t) {
var n;
return e.__ko__previousClassValue__ && $(e).removeClass(e.__ko__previousClassValue__), 
n = ko.utils.unwrapObservable(t()), $(e).addClass(n), e.__ko__previousClassValue__ = n;
}
}, ko.bindingHandlers.htmlValue = {
init:function(e, t, n) {
return ko.utils.registerEventHandler(e, "blur", function() {
var o, i, r;
return r = t(), i = e.innerHTML, ko.isWriteableObservable(r) ? r(i) :(o = n(), o._ko_property_writers && o._ko_property_writers.htmlValue ? o._ko_property_writers.htmlValue(i) :void 0);
});
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), (null === n || void 0 === n) && (n = ""), 
"textarea" === e.tagName.toLowerCase() ? $(e).val(n) :e.innerHTML = n;
}
}, ko.bindingHandlers.escapedValue = {
init:ko.bindingHandlers.value.init,
update:function(e, t) {
var n, o, i;
return i = ko.utils.unwrapObservable(t()), n = /<script\b[^>]*>([\s\S]*?)<\/script>/gim, 
o = /<\/script>/gim, i && (i = i.replace(n, "").replace(o, "")), t()(i), ko.bindingHandlers.value.update(e, t);
}
}, ko.bindingHandlers.mouseenter = {
init:function(e, t) {
return $(e).mouseenter(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseleave = {
init:function(e, t) {
return $(e).mouseleave(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseover = {
init:function(e, t) {
return $(e).mouseover(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseout = {
init:function(e, t) {
return $(e).mouseout(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.mouseclick = {
init:function(e, t) {
return $(e).click(function(e) {
return t()($(this), e);
});
},
update:function() {}
}, ko.bindingHandlers.fadeVisible = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().fadeTo(400, 0, function() {
return $(e).css("visibility", "hidden");
});
}
}, ko.bindingHandlers.fadeVisibleAndHide = {
init:function(e, t) {
return $(e).toggle(ko.utils.unwrapObservable(t()));
},
update:function(e, t) {
return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) :$(e).stop().hide();
}
}, ko.bindingHandlers.data = {
update:function(e, t) {
var n, o, i, r;
i = ko.utils.unwrapObservable(t()) || {}, r = [];
for (n in i) o = i[n], o = ko.utils.unwrapObservable(o), "other" === n && "bananas" !== o && console.log(o), 
r.push($(e).data(n, o));
return r;
}
}, ko.bindingHandlers.bind = {
init:function(e, t) {
var n, o, i;
return i = ko.utils.unwrapObservable(t()), n = ko.utils.unwrapObservable(i.data), 
o = ko.utils.unwrapObservable(i.html), o ? ($(e).html(o), ko.applyBindings(n, e)) :void 0;
},
update:function(e, t) {
var n, o, i;
return i = ko.utils.unwrapObservable(t()), n = ko.utils.unwrapObservable(i.data), 
o = ko.utils.unwrapObservable(i.html), o ? ($(e).html(o), ko.applyBindings(n, e)) :void 0;
}
}, ko.bindingHandlers.slideVisible = {
init:function(e, t) {
var n;
return n = t(), $(e).toggle(n), $(e).data("animating", !1);
},
update:function(e, t) {
var n;
return n = t(), n ? ($(e).data("animating", !0), $(e).stop().slideDown(600, "swing", function() {
return $(this).data("animating", !1);
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.slideVisibleAndMoveTo = {
init:function(e, t) {
var n;
return n = t(), $(e).toggle(n), $(e).data("animating", !1);
},
update:function(e, t) {
var n;
return n = t(), n ? ($(e).data("animating", !0), $("html, body").stop().animate({
scrollTop:$(e).parent().offset().top - 100
}, 1200, "easeInOutQuart", function() {
return $(e).slideDown(600, "swing", function() {
return $(this).data("animating", !1);
});
})) :($(e).data("animating", !0), $(e).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.bannerVisible = {
init:function(e, t, n, o) {
return o.isFirst() && o.select(), $(e).show().css({
left:"0%"
});
},
update:function(e, t, n, o) {
var i, r, a, s;
if (s = $(e), a = ko.utils.unwrapObservable(t()), i = o.parent.direction(), a) {
if (o.animated) return;
return console.log("show " + o.index() + " " + i), r = i > 0 ? "100%" :"-100%", 
s.stop().css({
left:r
}).animate({
left:"0%"
}), o.animated = !0;
}
return o.animated !== !1 ? (console.log("hide " + o.index() + " " + i), r = i > 0 ? "-100%" :"100%", 
s.stop().css({
left:"0%"
}).animate({
left:r
}), o.animated = !1) :void 0;
}
}, ko.bindingHandlers.slidyButtonSlide = {
init:function() {},
update:function(e, t) {
var n, o, i;
if (i = t()) ; else if (n = $(e).children(".icon"), o = $(e).children(".title"), 
!$(e).data("mouseover")) return o.stop(!0), o.css("left", "0"), o.hide("slide", {
direction:"left"
}, 250), o.removeClass("hover"), n.removeClass("hover");
}
}, ko.bindingHandlers.slideVisibleWidth = {
init:function(e, t) {
var n;
return n = t(), $(e).toggle(n);
},
update:function(e, t) {
var n;
return n = t(), n ? $(e).show("slide", {
direction:"right"
}, 600) :$(e).hide("slide", {
direction:"right"
}, 600);
}
}, ko.bindingHandlers.theme = {
init:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).addClass(n), $(e).data("theme", n);
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).removeClass($(e).data("theme")), 
$(e).addClass(n), $(e).data("theme", n);
}
}, ko.bindingHandlers.currentDisabled = {
init:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") :$(e).attr("disabled", "disabled");
}
}, ko.bindingHandlers.ensureVisible = {
init:function() {},
update:function(e, t) {
var n, o, i, r, a, s;
if (ko.utils.unwrapObservable(t())) return n = $(e), o = n.parent(), s = n.position().top, 
i = s + n.height(), a = o.scrollTop(), r = o.height(), a > s || i > r ? o.scrollTo(n) :void 0;
}
}, ko.bindingHandlers.background = {
init:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).attr("src", n);
},
update:function(e, t) {
var n;
return n = ko.utils.unwrapObservable(t()), $(e).attr("src", n);
}
}, ko.bindingHandlers.inverseChecked = {
init:function(e, t, n) {
var o, i, r;
return r = t(), o = ko.dependentObservable({
read:function() {
return !r();
},
write:function(e) {
return r(!e);
},
disposeWhenNodeIsRemoved:e
}), i = function() {
return o;
}, ko.utils.domData.set(e, "newValueAccessor", i), ko.bindingHandlers.checked.init(e, i, n);
}
}, ko.bindingHandlers.computedStyles = {
init:function() {}
}, ko.bindingHandlers.sortableSections = {
init:function(e, t, n, o, i) {
var r;
return r = function() {
var n;
return n = t(), n.options || (n.options = {}), ko.utils.extend(n.options, {
tolerance:"pointer",
handle:".move.icon",
opacity:.6,
containment:e
}), ko.utils.extend(n, {
beforeMove:function(e) {
var t, n, o, i;
for (i = e.sourceParent, n = 0, o = i.length; o > n; n++) t = i[n], t.renameDone();
return window.edit_page.Event.publish("Slide.beforeReorder", {
old_index:e.sourceIndex + 1,
new_index:e.targetIndex + 1,
target:e.item.html()
});
},
afterMove:function(e) {
return window.slide_navigator.scrolling = !0, window.slide_navigator.selectAndGotoSlideWithIndex(e.targetIndex), 
window.edit_page.save(!0), window.edit_page.Event.publish("Slide.beforeReorder", {
old_index:e.sourceIndex + 1,
new_index:e.targetIndex + 1,
target:e.item.html()
});
}
}), n;
}, ko.bindingHandlers.sortable.init(e, r, n, o, i);
},
update:function(e, t, n, o, i) {
return ko.bindingHandlers.sortable.update(e, t, n, o, i);
}
}, ko.bindingHandlers.sortableGallery = {
init:function(e, t, n, o, i) {
var r;
return r = function() {
var n;
return n = t(), n.options || (n.options = {}), ko.utils.extend(n.options, {
tolerance:"pointer",
opacity:.6,
containment:$(e).parent()
}), ko.utils.extend(n, {
afterMove:function(e) {
return e.item.parent.storeCommand(), window.edit_page.save(!0);
}
}), n;
}, ko.bindingHandlers.sortable.init(e, r, n, o, i);
},
update:function(e, t, n, o, i) {
return ko.bindingHandlers.sortable.update(e, t, n, o, i);
}
}, ko.bindingHandlers.sortableRepeatable = {
init:function(e, t, n, o, i) {
var r;
return r = function() {
var n;
return n = t(), n.options || (n.options = {}), ko.utils.extend(n.options, {
tolerance:"pointer",
handle:".move-button",
revert:!0,
opacity:.6,
containment:$(e).parent(),
start:function() {
var e, n, o, i, r, a, s;
for (o = ko.utils.unwrapObservable(t()).data(), r = 0, a = o.length; a > r; r++) {
i = o[r], s = i.components;
for (n in s) e = s[n], "RichText" === e.type() && e.beforeMoveHandler();
}
return !0;
}
}), ko.utils.extend(n, {
afterMove:function(t) {
var n, o, i, r, a, s, l;
for (i = t.targetParent(), a = 0, s = i.length; s > a; a++) {
r = i[a], l = r.components;
for (o in l) n = l[o], "RichText" === n.type() && n.afterMoveHandler();
r.leaveDeleteHandler(), r.gotoState("normal");
}
return window.edit_page.Event.publish("Repeatable.afterReorder", {
component:t.item,
target:$(e)
}), t.item.parent.storeCommand(), window.edit_page.save(!0);
}
}), n;
}, ko.bindingHandlers.sortable.init(e, r, n, o, i);
},
update:function(e, t, n, o, i) {
return ko.bindingHandlers.sortable.update(e, t, n, o, i);
}
}, ko.bindingHandlers.sortableSlides = {
init:function(e, t, n, o, i) {
var r;
return r = function() {
var n;
return n = t(), n.options || (n.options = {}), ko.utils.extend(n.options, {
tolerance:"pointer",
opacity:.6,
containment:$(e).parent()
}), ko.utils.extend(n, {
afterMove:function(t) {
var n;
return n = t.item, n.triggerEvent("Repeatable.Move", {
component:n,
target:$(e),
extra:{
newIndex:t.targetIndex
}
}), window.edit_page.save(!0), $B.Singleton.TimeMachine.pushOp({
action:"reorderSlide",
self:null,
data:{
collection:t.sourceParent,
fromIndex:t.sourceIndex,
toIndex:t.targetIndex,
valueAccessor:t.sourceParent,
target:$(e)
}
});
}
}), n;
}, ko.bindingHandlers.sortable.init(e, r, n, o, i);
},
update:function(e, t, n, o, i) {
return ko.bindingHandlers.sortable.update(e, t, n, o, i);
}
}, ko.bindingHandlers.sortableSubMenu = {
init:function(e, t, n, o, i) {
var r;
return r = function() {
var n;
return n = t(), n.options || (n.options = {}), ko.utils.extend(n.options, {
tolerance:"pointer",
opacity:.6,
containment:e
}), ko.utils.extend(n, {
beforeMove:function(e) {
return window.edit_page.Event.publish("Submenu.beforeReorder", {
oldIndex:e.sourceIndex + 1,
newIndex:e.targetIndex + 1
});
},
afterMove:function(e) {
return window.edit_page.save(!0), window.edit_page.Event.publish("Submenu.afterReorder", {
oldIndex:e.sourceIndex + 1,
newIndex:e.targetIndex + 1
});
}
}), n;
}, ko.bindingHandlers.sortable.init(e, r, n, o, i);
},
update:function(e, t, n, o, i) {
return ko.bindingHandlers.sortable.update(e, t, n, o, i);
}
};
}.call(this), function() {
var e, t = [].indexOf || function(e) {
for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
return -1;
};
e = window.Bobcat || {}, e.SocialMediaConfig = function() {
function e(e) {
this.settings = e;
}
return e.prototype.get = function(e) {
return this.settings[e];
}, e.prototype.getDefaultButtonListData = function() {
return [ {
type:"Facebook",
show_button:!0,
url:""
}, {
type:"Twitter",
show_button:!0,
url:""
}, {
type:"GPlus",
show_button:!0,
url:""
}, {
type:"LinkedIn",
show_button:!1,
url:""
} ];
}, e.prototype.updateButtonListData = function(e) {
var n, o, i, r, a, s, l, u;
for (n = this.getDefaultButtonListData(), r = function() {
var t, n, i, r;
for (i = e.button_list, r = [], t = 0, n = i.length; n > t; t++) o = i[t], r.push(o.type);
return r;
}(), u = [], a = 0, s = n.length; s > a; a++) i = n[a], l = i.type, t.call(r, l) < 0 ? u.push(e.button_list.push(i)) :u.push(void 0);
return u;
}, e;
}();
}.call(this), function() {
$B.Services = {};
}.call(this), function() {
var e;
$B.Services.BaseService = function() {
function t() {
return e.apply(this, arguments);
}
return t.loadedRes = {}, e = function() {}, t.prototype.loadCss = function(e) {
var t;
return null == $B.Services.BaseService.loadedRes[e] ? (t = $("<link href='" + e + "' rel='stylesheet' type='text/css' />"), 
$("head").append(t), $B.Services.BaseService.loadedRes[e] = t) :void 0;
}, t.prototype.loadJs = function(e) {
var t;
return null == $B.Services.BaseService.loadedRes[e] ? (t = $("<script href='" + e + "' type='text/javascript'></script>"), 
$("head").append(t), $B.Services.BaseService.loadedRes[e] = t) :void 0;
}, t.prototype.pause = function() {}, t.prototype.resume = function() {}, t.prototype.terminate = function() {}, 
t;
}();
}.call(this), function() {
$B.Services.Bootloader = function() {
function Bootloader(e) {
this.servicesMeta = e, this.services = {};
}
return Bootloader.prototype.load = function() {
var serviceMeta, _i, _len, _ref, _results, _this = this;
for (_ref = this.servicesMeta, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) serviceMeta = _ref[_i], 
_results.push(function(serviceMeta) {
try {
return $.getScript(serviceMeta.mainJs).done(function() {
var cls;
return cls = eval(serviceMeta.mainClass), _this.services[serviceMeta.mainClass] = new cls(serviceMeta);
});
} catch (err) {
return $B.error("Plugin " + serviceMeta.mainClass + " failed to load or initialize!");
}
}(serviceMeta));
return _results;
}, Bootloader;
}(), runAfterDomBinding.add("strikinglyServices", function() {
return window.edit_page.isShowPage ? (window.__serviceHub = new $B.Services.ServiceHub(), 
new $B.Services.Bootloader($S.page_meta.services).load()) :void 0;
});
}.call(this), function() {
$B.Services.ServiceHub = function() {
function e() {
this.eventHub = new Bobcat.Event(), this.userKey = ~~(1e6 * Math.random()) + "|" + new Date().getTime();
}
return e.prototype.trackEvent = function(e, t) {
return $B.PageAE.trackUserPageEvent(e, {
userKey:this.userKey,
eventName:t
});
}, e;
}();
}.call(this), function() {
ko.virtualElements.allowedBindings.stopBinding = !0;
}.call(this), function() {}.call(this), function() {
var e = function(e, t) {
return function() {
return e.apply(t, arguments);
};
}, t = {}.hasOwnProperty, n = function(e, n) {
function o() {
this.constructor = e;
}
for (var i in n) t.call(n, i) && (e[i] = n[i]);
return o.prototype = n.prototype, e.prototype = new o(), e.__super__ = n.prototype, 
e;
};
$B.NavbarStatic = function() {
function e() {
this.navbarDrawerItems = $(".navbar-drawer .navbar-drawer-item"), this.navbarDrawerItems.bind("click", function() {
return Bobcat.TH.toggleDrawer();
});
}
return e;
}(), $B.EmailFormStatic = function() {
function e(e) {
this.form = e.find("form"), this.formNotSuccess = e.find(".s-form-not-success"), 
this.submitButton = e.find(".s-form-click"), this.loadingIcon = e.find(".s-form-icon"), 
this.formSuccess = e.find(".s-form-success"), this.errorEmail = e.find(".s-form-error-email"), 
this.errorName = e.find(".s-form-error-name");
}
return e.prototype.init = function() {
var e = this;
return this.submitButton.bind("click", function() {
return console.log("submitButton click"), e.reset(), e.isLoading(!0), e.form.ajaxSubmit({
success:function(t) {
return console.log(t), console.log("data.status: ", t.status), e.status(t.status), 
e.isLoading(!1), Bobcat.PageAE.gaPushUserSite([ "_trackEvent", "Actions", "EmailCollected" ]), 
window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(t) {
var n;
if (console.log("submit error"), n = jQuery.parseJSON(t.responseText), console.log(n), 
e.status(n.status), e.isLoading(!1), !n.message) throw alert(n.html), n.html;
return n.message.invalid_email && e.invalidEmail(!0), n.message.invalid_name ? e.invalidName(!0) :void 0;
}
});
});
}, e.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, e.prototype.isLoading = function(e) {
return this.loadingIcon !== [] ? e === !0 ? this.loadingIcon.show() :this.loadingIcon.hide() :void 0;
}, e.prototype.status = function(e) {
return "ok" === e ? (this.formSuccess.show(), this.formNotSuccess.hide()) :(this.formSuccess.hide(), 
this.formNotSuccess.show());
}, e.prototype.invalidEmail = function(e) {
return e === !0 ? this.errorEmail.show() :this.errorEmail.hide();
}, e.prototype.invalidName = function(e) {
return e === !0 ? this.errorName.show() :this.errorName.hide();
}, e;
}(), $B.SocialMediaListStatic = function() {
function e(e) {
this.data = e;
}
return e.prototype.init = function() {
var e, t, n, o, i, r, a, s, l, u, c;
for (i = "", o = [], u = this.data.button_list, r = 0, s = u.length; s > r; r++) n = u[r], 
e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
(n.show_button || e) && (t = new $B[n.type + "Static"](n), o.push(t), n.show_button && (i += t.getTemplate()));
for ($(".social-media-display .buttons").append($(i)), c = [], a = 0, l = o.length; l > a; a++) t = o[a], 
c.push(t.reRender());
return c;
}, e;
}(), $B.SocialMediaItemStatic = function() {
function t() {
this.onScriptLoad = e(this.onScriptLoad, this), this.getUrl = e(this.getUrl, this);
}
return t.prototype.getUrl = function() {
return this.data.url ? this.data.url :$S.page_meta.social_media_config.url;
}, t.prototype.onScriptLoad = function() {
return this.runScript();
}, t.prototype.createScriptTag = function(e, t) {
var n, o;
return n = $("<div></div>").addClass(e), o = $("<script></script>").attr({
async:!0,
src:t
}), o.bind("load", this.onScriptLoad), n.get(0).appendChild(o.get(0)), $("#fb-root").get(0).appendChild(n.get(0));
}, t;
}(), $B.FacebookStatic = function(t) {
function o(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
o.__super__.constructor.call(this);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, o.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.data.app_id,
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(e) {
return window.edit_page.Event.publish("Site.facebook.edge.create", e), $("#footer").css("margin-bottom", "+=220px");
})) :void 0;
}, o.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, o;
}($B.SocialMediaItemStatic), $B.LinkedInStatic = function(t) {
function o(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
o.__super__.constructor.call(this);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, o.prototype.runScript = function() {}, o.prototype.reRender = function() {
console.log("LinkedIn#reRender");
try {
delete window.IN;
} catch (e) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, o;
}($B.SocialMediaItemStatic), $B.TwitterStatic = function(t) {
function o(t) {
this.data = t, this.reRender = e(this.reRender, this), this.runScript = e(this.runScript, this), 
o.__super__.constructor.call(this);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.data.share_text + '"  data-count="horizontal">Tweet</a></div>';
}, o.prototype.runScript = function() {
return "undefined" != typeof twttr && "undefined" != typeof twttr.widgets ? (console.log("Twitter#runScript"), 
twttr.widgets.load()) :void 0;
}, o.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, o;
}($B.SocialMediaItemStatic), $B.GPlusStatic = function(t) {
function o(t) {
this.data = t, this.runScript = e(this.runScript, this), o.__super__.constructor.call(this);
}
return n(o, t), o.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, o.prototype.runScript = function() {
var e;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (e = $(".gplus-counter"), 
e.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, o.prototype.reRender = function() {
return $S.global_conf.in_china ? void 0 :$("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, o;
}($B.SocialMediaItemStatic), $B.RenrenStatic = function(t) {
function o(t) {
this.data = t, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
o.__super__.constructor.call(this);
}
return n(o, t), o.prototype.getSubtitle = function() {
return "人人喜欢";
}, o.prototype.getTemplate = function() {
var e, t;
this.p = [], e = {
url:this.getUrl(),
title:$S.page_meta.social_media_config.title,
description:$S.page_meta.social_media_config.description,
image:$S.page_meta.social_media_config.image
};
for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, o.prototype.runScript = function() {}, o.prototype.reRender = function() {}, 
o;
}($B.SocialMediaItemStatic), $B.SinaWeiboStatic = function(t) {
function o(t) {
this.data = t, this.runScript = e(this.runScript, this), this.getTemplate = e(this.getTemplate, this), 
t.imageUrl = asset_path("/assets/icons/weibo.png"), o.__super__.constructor.call(this);
}
return n(o, t), o.prototype.getSubtitle = function() {
return "新浪微博";
}, o.prototype.getTemplate = function() {
var e, t, n, o, i;
i = 90, o = 24, t = {
url:this.getUrl(),
type:"2",
count:"1",
title:$S.page_meta.social_media_config.title,
pic:$S.page_meta.social_media_config.image,
rnd:new Date().valueOf()
}, n = [];
for (e in t) n.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + n.join("&") + '" width="' + i + '" height="' + o + '"></iframe></div>';
}, o.prototype.runScript = function() {}, o.prototype.reRender = function() {}, 
o;
}($B.SocialMediaItemStatic), $B.GalleryStatic = function() {
function e() {
var e;
$(".lazy-gallery").lazyload(), e = $(".gallery .item"), e.fancybox({
beforeLoad:function() {
var e;
return e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
e.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
});
}
return e;
}(), $(function() {
var e, t, n, o, i;
for (t = $(".s-general-form, .s-template-form"), o = 0, i = t.length; i > o; o++) e = t[o], 
new $B.EmailFormStatic($(e)).init();
return n = new $B.SocialMediaListStatic($S.page_meta.social_media), n.init(), new $B.GalleryStatic(), 
new $B.NavbarStatic(), new $B.BlogCollectionComponent();
});
}.call(this), function() {
console.log("pages_show_static");
}.call(this), function(e) {
var t = 0, n = 0, o = 0, i = 10, r = 0, a = "ontouchstart" in window || navigator.msMaxTouchPoints > 0, s = "onorientationchange" in window, l = !1, u = !1, c = !1, d = !1, h = !1, p = !1, g = !1, m = "pointer", f = "pointer", _ = new Array(), v = new Array(), w = new Array(), y = new Array(), b = new Array(), k = new Array(), M = new Array(), L = new Array(), S = new Array(), T = new Array(), x = new Array(), D = new Array(), Y = new Array(), E = {
showScrollbar:function(t, n) {
t.scrollbarHide && e("." + n).css({
opacity:t.scrollbarOpacity,
filter:"alpha(opacity:" + 100 * t.scrollbarOpacity + ")"
});
},
hideScrollbar:function(e, t, n, o, r, a, s, l, u, c) {
if (e.scrollbar && e.scrollbarHide) for (var d = n; n + 25 > d; d++) t[t.length] = E.hideScrollbarIntervalTimer(i * d, o[n], (n + 24 - d) / 24, r, a, s, l, u, c, e);
},
hideScrollbarInterval:function(t, n, o, i, a, s, l, u, c) {
r = -1 * t / x[u] * (a - s - l - i), E.setSliderOffset("." + o, r), e("." + o).css({
opacity:c.scrollbarOpacity * n,
filter:"alpha(opacity:" + c.scrollbarOpacity * n * 100 + ")"
});
},
slowScrollHorizontalInterval:function(t, n, o, i, a, s, l, u, c, d, h, p, g, m, f, _, v, w, y) {
if (y.infiniteSlider) {
if (o <= -1 * x[_] || o <= -1 * D[_]) {
var b = e(t).width();
if (o <= -1 * D[_]) {
var k = -1 * h[0];
e(n).each(function(t) {
E.setSliderOffset(e(n)[t], k + v), t < p.length && (p[t] = -1 * k), k += f[t];
}), o += -1 * p[0], T[_] = -1 * p[0] + v, x[_] = T[_] + b - s, S[_] = 0;
}
for (;o <= -1 * x[_]; ) {
var Y = 0, C = E.getSliderOffset(e(n[0]), "x");
e(n).each(function(e) {
E.getSliderOffset(this, "x") < C && (C = E.getSliderOffset(this, "x"), Y = e);
});
var I = T[_] + b;
E.setSliderOffset(e(n)[Y], I), T[_] = -1 * p[1] + v, x[_] = T[_] + b - s, p.splice(0, 1), 
p.splice(p.length, 0, -1 * I + v), S[_]++;
}
}
if (o >= -1 * T[_] || o >= 0) {
var b = e(t).width();
if (o > 0) {
var k = -1 * h[0];
for (e(n).each(function(t) {
E.setSliderOffset(e(n)[t], k + v), t < p.length && (p[t] = -1 * k), k += f[t];
}), o -= -1 * p[0], T[_] = -1 * p[0] + v, x[_] = T[_] + b - s, S[_] = m; -1 * p[0] - b + v > 0; ) {
var O = 0, $ = E.getSliderOffset(e(n[0]), "x");
e(n).each(function(e) {
E.getSliderOffset(this, "x") > $ && ($ = E.getSliderOffset(this, "x"), O = e);
});
var I = T[_] - f[O];
E.setSliderOffset(e(n)[O], I), p.splice(0, 0, -1 * I + v), p.splice(p.length - 1, 1), 
T[_] = -1 * p[0] + v, x[_] = T[_] + b - s, S[_]--, M[_]++;
}
}
for (;o > -1 * T[_]; ) {
var O = 0, $ = E.getSliderOffset(e(n[0]), "x");
e(n).each(function(e) {
E.getSliderOffset(this, "x") > $ && ($ = E.getSliderOffset(this, "x"), O = e);
});
var I = T[_] - f[O];
E.setSliderOffset(e(n)[O], I), p.splice(0, 0, -1 * I + v), p.splice(p.length - 1, 1), 
T[_] = -1 * p[0] + v, x[_] = T[_] + b - s, S[_]--;
}
}
}
var B = !1, H = E.calcActiveOffset(y, o, p, s, S[_], m, d, _), I = (H + S[_] + m) % m;
if (y.infiniteSlider ? I != L[_] && (B = !0) :H != M[_] && (B = !0), B) {
var A = new E.args("change", y, t, e(t).children(":eq(" + I + ")"), I, w);
e(t).parent().data("args", A), "" != y.onSlideChange && y.onSlideChange(A);
}
if (M[_] = H, L[_] = I, o = Math.floor(o), E.setSliderOffset(t, o), y.scrollbar) {
r = Math.floor((-1 * o - T[_] + v) / (x[_] - T[_] + v) * (l - u - a));
var j = a - c;
o >= -1 * T[_] + v ? (j = a - c - -1 * r, E.setSliderOffset(e("." + i), 0), e("." + i).css({
width:j + "px"
})) :o <= -1 * x[_] + 1 ? (j = l - u - c - r, E.setSliderOffset(e("." + i), r), 
e("." + i).css({
width:j + "px"
})) :(E.setSliderOffset(e("." + i), r), e("." + i).css({
width:j + "px"
}));
}
},
slowScrollHorizontal:function(t, n, o, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w, y, b, D) {
var Y = E.getSliderOffset(t, "x"), C = new Array(), I = new Array(), O = 0, $ = 25 / 1024 * u;
frictionCoefficient = D.frictionCoefficient, elasticFrictionCoefficient = D.elasticFrictionCoefficient, 
snapFrictionCoefficient = D.snapFrictionCoefficient, a > D.snapVelocityThreshold && D.snapToChildren && !y ? O = 1 :a < -1 * D.snapVelocityThreshold && D.snapToChildren && !y && (O = -1), 
-1 * $ > a ? a = -1 * $ :a > $ && (a = $), e(t)[0] !== e(w)[0] && (O = -1 * O, a = -2 * a);
var B = S[f];
if (D.infiniteSlider) var H = T[f], A = x[f];
for (var j = new Array(), N = new Array(), P = 0; P < g.length; P++) j[P] = g[P], 
P < n.length && (N[P] = E.getSliderOffset(e(n[P]), "x"));
for (;a > 1 || -1 > a; ) {
if (a *= frictionCoefficient, Y += a, (Y > -1 * T[f] || Y < -1 * x[f]) && !D.infiniteSlider && (a *= elasticFrictionCoefficient, 
Y += a), D.infiniteSlider) {
if (-1 * A >= Y) {
for (var F = e(t).width(), z = 0, R = N[0], P = 0; P < N.length; P++) N[P] < R && (R = N[P], 
z = P);
var W = H + F;
N[z] = W, H = -1 * j[1] + b, A = H + F - u, j.splice(0, 1), j.splice(j.length, 0, -1 * W + b), 
B++;
}
if (Y >= -1 * H) {
for (var F = e(t).width(), q = 0, U = N[0], P = 0; P < N.length; P++) N[P] > U && (U = N[P], 
q = P);
var W = H - m[q];
N[q] = W, j.splice(0, 0, -1 * W + b), j.splice(j.length - 1, 1), H = -1 * j[0] + b, 
A = H + F - u, B--;
}
}
C[C.length] = Y, I[I.length] = a;
}
var V = !1, G = E.calcActiveOffset(D, Y, j, u, B, v, M[f], f), J = (G + B + v) % v;
if (D.snapToChildren && (D.infiniteSlider ? J != L[f] && (V = !0) :G != M[f] && (V = !0), 
0 > O && !V ? (G++, G >= g.length && !D.infiniteSlider && (G = g.length - 1)) :O > 0 && !V && (G--, 
0 > G && !D.infiniteSlider && (G = 0))), D.snapToChildren || (Y > -1 * T[f] || Y < -1 * x[f]) && !D.infiniteSlider) {
for ((Y > -1 * T[f] || Y < -1 * x[f]) && !D.infiniteSlider ? C.splice(0, C.length) :(C.splice(.1 * C.length, C.length), 
Y = C.length > 0 ? C[C.length - 1] :Y); Y < j[G] - .5 || Y > j[G] + .5; ) Y = (Y - j[G]) * snapFrictionCoefficient + j[G], 
C[C.length] = Y;
C[C.length] = j[G];
}
var K = 1;
C.length % 2 != 0 && (K = 0);
for (var Q = 0; Q < o.length; Q++) clearTimeout(o[Q]);
for (var X = (G + B + v) % v, Z = 0, Q = K; Q < C.length; Q += 2) (Q == K || Math.abs(C[Q] - Z) > 1 || Q >= C.length - 2) && (Z = C[Q], 
o[o.length] = E.slowScrollHorizontalIntervalTimer(i * Q, t, n, C[Q], r, l, u, c, d, h, G, p, g, _, v, m, f, b, X, D));
var V = !1, J = (G + S[f] + v) % v;
D.infiniteSlider ? J != L[f] && (V = !0) :G != M[f] && (V = !0), "" != D.onSlideComplete && C.length > 1 && (o[o.length] = E.onSlideCompleteTimer(i * (Q + 1), D, t, e(t).children(":eq(" + J + ")"), X, f)), 
o[o.length] = E.updateBackfaceVisibilityTimer(i * (Q + 1), n, f, v, D), k[f] = o, 
E.hideScrollbar(D, o, Q, C, r, l, u, d, h, f);
},
onSlideComplete:function(t, n, o, i, r) {
var a = (_[r] != i ? !0 :!1, new E.args("complete", t, e(n), o, i, i));
e(n).parent().data("args", a), "" != t.onSlideComplete && t.onSlideComplete(a), 
_[r] = i;
},
getSliderOffset:function(t, n) {
var o = 0;
if (n = "x" == n ? 4 :5, !u || c || d) o = parseInt(e(t).css("left"), 10); else {
for (var i, r = new Array("-webkit-transform", "-moz-transform", "transform"), a = 0; a < r.length; a++) if (void 0 != e(t).css(r[a]) && e(t).css(r[a]).length > 0) {
i = e(t).css(r[a]).split(",");
break;
}
o = void 0 == i[n] ? 0 :parseInt(i[n], 10);
}
return o;
},
setSliderOffset:function(t, n) {
n = parseInt(n, 10), !u || c || d ? e(t).css({
left:n + "px"
}) :e(t).css({
msTransform:"matrix(1,0,0,1," + n + ",0)",
webkitTransform:"matrix(1,0,0,1," + n + ",0)",
MozTransform:"matrix(1,0,0,1," + n + ",0)",
transform:"matrix(1,0,0,1," + n + ",0)"
});
},
setBrowserInfo:function() {
null != navigator.userAgent.match("WebKit") ? (l = !0, m = "-webkit-grab", f = "-webkit-grabbing") :null != navigator.userAgent.match("Gecko") ? (g = !0, 
m = "move", f = "-moz-grabbing") :null != navigator.userAgent.match("MSIE 7") ? (c = !0, 
p = !0) :null != navigator.userAgent.match("MSIE 8") ? (d = !0, p = !0) :null != navigator.userAgent.match("MSIE 9") && (h = !0, 
p = !0);
},
has3DTransform:function() {
var t = !1, n = e("<div />").css({
msTransform:"matrix(1,1,1,1,1,1)",
webkitTransform:"matrix(1,1,1,1,1,1)",
MozTransform:"matrix(1,1,1,1,1,1)",
transform:"matrix(1,1,1,1,1,1)"
});
return "" == n.attr("style") ? t = !1 :g && parseInt(navigator.userAgent.split("/")[3], 10) >= 21 ? t = !1 :void 0 != n.attr("style") && (t = !0), 
t;
},
getSlideNumber:function(e, t, n) {
return (e - S[t] + n) % n;
},
calcActiveOffset:function(e, t, n, o, i, r) {
var a, s = !1, l = new Array();
t > n[0] && (a = 0), t < n[n.length - 1] && (a = r - 1);
for (var u = 0; u < n.length; u++) n[u] <= t && n[u] > t - o && (s || n[u] == t || (l[l.length] = n[u - 1]), 
l[l.length] = n[u], s = !0);
0 == l.length && (l[0] = n[n.length - 1]);
for (var c = o, d = 0, u = 0; u < l.length; u++) {
var h = Math.abs(t - l[u]);
c > h && (d = l[u], c = h);
}
for (var u = 0; u < n.length; u++) d == n[u] && (a = u);
return a;
},
changeSlide:function(t, n, o, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w) {
E.autoSlidePause(m);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
var b = Math.ceil(w.autoSlideTransTimer / 10) + 1, T = E.getSliderOffset(n, "x"), x = p[t], D = x - T, Y = t - (M[m] + S[m] + _) % _;
if (w.infiniteSlider) {
t = (t - S[m] + 2 * _) % _;
var C = !1;
0 == t && 2 == _ && (t = _, p[t] = p[t - 1] - e(o).eq(0).outerWidth(!0), C = !0), 
x = p[t], D = x - T;
var I = new Array(p[t] - e(n).width(), p[t] + e(n).width());
C && p.splice(p.length - 1, 1);
for (var O = 0; O < I.length; O++) Math.abs(I[O] - T) < Math.abs(D) && (D = I[O] - T);
}
0 > D && -1 == Y ? D += e(n).width() :D > 0 && 1 == Y && (D -= e(n).width());
var $, B, H = new Array();
E.showScrollbar(w, a);
for (var O = 0; b >= O; O++) $ = O, $ /= b, $--, B = T + D * (Math.pow($, 5) + 1), 
H[H.length] = B;
for (var A = (t + S[m] + _) % _, j = 0, O = 0; O < H.length; O++) if ((0 == O || Math.abs(H[O] - j) > 1 || O >= H.length - 2) && (j = H[O], 
r[O] = E.slowScrollHorizontalIntervalTimer(i * (O + 1), n, o, H[O], a, s, l, u, c, d, t, h, p, f, _, g, m, v, A, w)), 
0 == O && "" != w.onSlideStart) {
var N = (M[m] + S[m] + _) % _;
w.onSlideStart(new E.args("start", w, n, e(n).children(":eq(" + N + ")"), N, t));
}
var P = !1;
w.infiniteSlider ? A != L[m] && (P = !0) :t != M[m] && (P = !0), P && "" != w.onSlideComplete && (r[r.length] = E.onSlideCompleteTimer(i * (O + 1), w, n, e(n).children(":eq(" + A + ")"), A, m)), 
k[m] = r, E.hideScrollbar(w, r, O, H, a, s, l, c, d, m), E.autoSlide(n, o, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w);
},
changeOffset:function(t, n, o, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w) {
E.autoSlidePause(m);
for (var y = 0; y < r.length; y++) clearTimeout(r[y]);
w.infiniteSlider || (t = t > -1 * T[m] + v ? -1 * T[m] + v :t, t = t < -1 * x[m] ? -1 * x[m] :t);
var b = Math.ceil(w.autoSlideTransTimer / 10) + 1, D = E.getSliderOffset(n, "x"), Y = (E.calcActiveOffset(w, t, p, l, S, _, M[m], m) + S[m] + _) % _, C = p.slice();
if (w.snapToChildren && !w.infiniteSlider) t = p[Y]; else if (w.infiniteSlider && w.snapToChildren) {
for (;t >= C[0]; ) C.splice(0, 0, C[_ - 1] + e(n).width()), C.splice(_, 1);
for (;t <= C[_ - 1]; ) C.splice(_, 0, C[0] - e(n).width()), C.splice(0, 1);
Y = E.calcActiveOffset(w, t, C, l, S, _, M[m], m), t = C[Y];
}
var I, O, $ = t - D, B = new Array();
E.showScrollbar(w, a);
for (var H = 0; b >= H; H++) I = H, I /= b, I--, O = D + $ * (Math.pow(I, 5) + 1), 
B[B.length] = O;
for (var A = (Y + S[m] + _) % _, j = 0, H = 0; H < B.length; H++) if ((0 == H || Math.abs(B[H] - j) > 1 || H >= B.length - 2) && (j = B[H], 
r[H] = E.slowScrollHorizontalIntervalTimer(i * (H + 1), n, o, B[H], a, s, l, u, c, d, Y, h, p, f, _, g, m, v, A, w)), 
0 == H && "" != w.onSlideStart) {
var A = (M[m] + S[m] + _) % _;
w.onSlideStart(new E.args("start", w, n, e(n).children(":eq(" + A + ")"), A, Y));
}
var N = !1;
w.infiniteSlider ? A != L[m] && (N = !0) :Y != M[m] && (N = !0), N && "" != w.onSlideComplete && (r[r.length] = E.onSlideCompleteTimer(i * (H + 1), w, n, e(n).children(":eq(" + A + ")"), A, m)), 
k[m] = r, E.hideScrollbar(w, r, H, B, a, s, l, c, d, m), E.autoSlide(n, o, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w);
},
autoSlide:function(e, t, n, o, i, r, a, s, l, u, c, d, h, p, g, m, f) {
return y[h].autoSlide ? (E.autoSlidePause(h), v[h] = setTimeout(function() {
!f.infiniteSlider && M[h] > c.length - 1 && (M[h] = M[h] - g);
var _ = M[h] + S[h] + 1;
E.changeSlide(_, e, t, n, o, i, r, a, s, l, u, c, d, h, p, g, m, f), E.autoSlide(e, t, n, o, i, r, a, s, l, u, c, d, h, p, g, m, f);
}, f.autoSlideTimer + f.autoSlideTransTimer), void 0) :!1;
},
autoSlidePause:function(e) {
clearTimeout(v[e]);
},
isUnselectable:function(t, n) {
return "" != n.unselectableSelector && 1 == e(t).closest(n.unselectableSelector).length ? !0 :!1;
},
slowScrollHorizontalIntervalTimer:function(e, t, n, o, i, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w) {
var y = setTimeout(function() {
E.slowScrollHorizontalInterval(t, n, o, i, r, a, s, l, u, c, d, h, p, g, m, f, _, v, w);
}, e);
return y;
},
onSlideCompleteTimer:function(e, t, n, o, i, r) {
var a = setTimeout(function() {
E.onSlideComplete(t, n, o, i, r);
}, e);
return a;
},
hideScrollbarIntervalTimer:function(e, t, n, o, i, r, a, s, l, u) {
var c = setTimeout(function() {
E.hideScrollbarInterval(t, n, o, i, r, a, s, l, u);
}, e);
return c;
},
updateBackfaceVisibilityTimer:function(e, t, n, o, i) {
var r = setTimeout(function() {
E.updateBackfaceVisibility(t, n, o, i);
}, e);
return r;
},
updateBackfaceVisibility:function(t, n, o, i) {
for (var r = (M[n] + S[n] + o) % o, a = Array(), s = 0; s < 2 * i.hardwareAccelBuffer; s++) {
var l = E.mod(r + s - i.hardwareAccelBuffer, o);
if ("visible" == e(t).eq(l).css("-webkit-backface-visibility")) {
a[a.length] = l;
var u = E.mod(l + 2 * i.hardwareAccelBuffer, o), c = E.mod(l - 2 * i.hardwareAccelBuffer, o);
e(t).eq(l).css("-webkit-backface-visibility", "hidden"), -1 == a.indexOf(c) && e(t).eq(c).css("-webkit-backface-visibility", ""), 
-1 == a.indexOf(u) && e(t).eq(u).css("-webkit-backface-visibility", "");
}
}
},
mod:function(e, t) {
var n = e % t;
return 0 > n ? n + t :n;
},
args:function(t, n, o, i, r, a) {
this.prevSlideNumber = void 0 == e(o).parent().data("args") ? void 0 :e(o).parent().data("args").prevSlideNumber, 
this.prevSlideObject = void 0 == e(o).parent().data("args") ? void 0 :e(o).parent().data("args").prevSlideObject, 
this.targetSlideNumber = a + 1, this.targetSlideObject = e(o).children(":eq(" + a + ")"), 
this.slideChanged = !1, "load" == t ? (this.targetSlideNumber = void 0, this.targetSlideObject = void 0) :"start" == t ? (this.targetSlideNumber = void 0, 
this.targetSlideObject = void 0) :"change" == t ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == e(o).parent().data("args") ? n.startAtSlide :e(o).parent().data("args").currentSlideNumber, 
this.prevSlideObject = e(o).children(":eq(" + this.prevSlideNumber + ")")) :"complete" == t && (this.slideChanged = e(o).parent().data("args").slideChanged), 
this.settings = n, this.data = e(o).parent().data("iosslider"), this.sliderObject = o, 
this.sliderContainerObject = e(o).parent(), this.currentSlideObject = i, this.currentSlideNumber = r + 1, 
this.currentSliderOffset = -1 * E.getSliderOffset(o, "x");
},
preventDrag:function(e) {
e.preventDefault();
},
preventClick:function(e) {
return e.stopImmediatePropagation(), !1;
},
enableClick:function() {
return !0;
}
};
E.setBrowserInfo();
var C = {
init:function(i, l) {
u = E.has3DTransform();
var h = e.extend(!0, {
elasticPullResistance:.6,
frictionCoefficient:.92,
elasticFrictionCoefficient:.6,
snapFrictionCoefficient:.92,
snapToChildren:!1,
snapSlideCenter:!1,
startAtSlide:1,
scrollbar:!1,
scrollbarDrag:!1,
scrollbarHide:!0,
scrollbarPaging:!1,
scrollbarLocation:"top",
scrollbarContainer:"",
scrollbarOpacity:.4,
scrollbarHeight:"4px",
scrollbarBorder:"0",
scrollbarMargin:"5px",
scrollbarBackground:"#000",
scrollbarBorderRadius:"100px",
scrollbarShadow:"0 0 0 #000",
scrollbarElasticPullResistance:.9,
desktopClickDrag:!1,
keyboardControls:!1,
tabToAdvance:!1,
responsiveSlideContainer:!0,
responsiveSlides:!0,
navSlideSelector:"",
navPrevSelector:"",
navNextSelector:"",
autoSlideToggleSelector:"",
autoSlide:!1,
autoSlideTimer:5e3,
autoSlideTransTimer:750,
autoSlideHoverPause:!0,
infiniteSlider:!1,
snapVelocityThreshold:5,
slideStartVelocityThreshold:0,
horizontalSlideLockThreshold:5,
verticalSlideLockThreshold:3,
hardwareAccelBuffer:5,
stageCSS:{
position:"relative",
top:"0",
left:"0",
overflow:"hidden",
zIndex:1
},
unselectableSelector:"",
onSliderLoaded:"",
onSliderUpdate:"",
onSliderResize:"",
onSlideStart:"",
onSlideChange:"",
onSlideComplete:""
}, i);
return void 0 == l && (l = this), e(l).each(function(i) {
function l() {
E.autoSlidePause(u), ft = e(at).find("a"), _t = e(at).find("[onclick]"), vt = e(at).find("*"), 
e(X).css("width", ""), e(X).css("height", ""), e(at).css("width", ""), R = e(at).children().not("script").get(), 
W = new Array(), q = new Array(), h.responsiveSlides && e(R).css("width", ""), x[u] = 0, 
z = new Array(), B = e(X).parent().width(), A = e(X).outerWidth(!0), h.responsiveSlideContainer && (A = e(X).outerWidth(!0) > B ? B :e(X).width()), 
e(X).css({
position:h.stageCSS.position,
top:h.stageCSS.top,
left:h.stageCSS.left,
overflow:h.stageCSS.overflow,
zIndex:h.stageCSS.zIndex,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
msTouchAction:"pan-y",
width:A
}), e(h.unselectableSelector).css({
cursor:"default"
});
for (var t = 0; t < R.length; t++) {
W[t] = e(R[t]).width(), q[t] = e(R[t]).outerWidth(!0);
var n = q[t];
h.responsiveSlides && (q[t] > A ? (n = A + -1 * (q[t] - W[t]), W[t] = n, q[t] = A) :n = W[t], 
e(R[t]).css({
width:n
})), e(R[t]).css({
overflow:"hidden",
position:"absolute"
}), z[t] = -1 * x[u], x[u] = x[u] + n + (q[t] - W[t]);
}
h.snapSlideCenter && (Q = .5 * (A - q[0]), h.responsiveSlides && q[0] > A && (Q = 0)), 
D[u] = 2 * x[u];
for (var t = 0; t < R.length; t++) E.setSliderOffset(e(R[t]), -1 * z[t] + x[u] + Q), 
z[t] = z[t] - x[u];
if (!h.infiniteSlider && !h.snapSlideCenter) {
for (var o = 0; o < z.length && !(z[o] <= -1 * (2 * x[u] - A)); o++) ut = o;
z.splice(ut + 1, z.length), z[z.length] = -1 * (2 * x[u] - A);
}
for (var o = 0; o < z.length; o++) tt[o] = z[o];
if (Z && (y[u].startAtSlide = y[u].startAtSlide > z.length ? z.length :y[u].startAtSlide, 
h.infiniteSlider ? (y[u].startAtSlide = (y[u].startAtSlide - 1 + st) % st, M[u] = y[u].startAtSlide) :(y[u].startAtSlide = y[u].startAtSlide - 1 < 0 ? z.length - 1 :y[u].startAtSlide, 
M[u] = y[u].startAtSlide - 1), L[u] = M[u]), T[u] = x[u] + Q, e(at).css({
position:"relative",
cursor:m,
webkitPerspective:"0",
webkitBackfaceVisibility:"hidden",
width:x[u] + "px"
}), mt = x[u], x[u] = 2 * x[u] - A + 2 * Q, ht = A > mt + Q || 0 == A ? !0 :!1, 
ht && e(at).css({
cursor:"default"
}), H = e(X).parent().outerHeight(!0), j = e(X).height(), h.responsiveSlideContainer && (j = j > H ? H :j), 
e(X).css({
height:j
}), E.setSliderOffset(at, z[M[u]]), h.infiniteSlider && !ht) {
for (var i = E.getSliderOffset(e(at), "x"), r = (S[u] + st) % st * -1; 0 > r; ) {
var a = 0, s = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") < s && (s = E.getSliderOffset(this, "x"), a = e);
});
var l = T[u] + mt;
E.setSliderOffset(e(R)[a], l), T[u] = -1 * z[1] + Q, x[u] = T[u] + mt - A, z.splice(0, 1), 
z.splice(z.length, 0, -1 * l + Q), r++;
}
for (;-1 * z[0] - mt + Q > 0 && h.snapSlideCenter && Z; ) {
var c = 0, d = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") > d && (d = E.getSliderOffset(this, "x"), c = e);
});
var l = T[u] - q[c];
E.setSliderOffset(e(R)[c], l), z.splice(0, 0, -1 * l + Q), z.splice(z.length - 1, 1), 
T[u] = -1 * z[0] + Q, x[u] = T[u] + mt - A, S[u]--, M[u]++;
}
for (;i <= -1 * x[u]; ) {
var a = 0, s = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") < s && (s = E.getSliderOffset(this, "x"), a = e);
});
var l = T[u] + mt;
E.setSliderOffset(e(R)[a], l), T[u] = -1 * z[1] + Q, x[u] = T[u] + mt - A, z.splice(0, 1), 
z.splice(z.length, 0, -1 * l + Q), S[u]++, M[u]--;
}
}
return E.setSliderOffset(at, z[M[u]]), E.updateBackfaceVisibility(R, u, st, h), 
h.desktopClickDrag || e(at).css({
cursor:"default"
}), h.scrollbar && (e("." + J).css({
margin:h.scrollbarMargin,
overflow:"hidden",
display:"none"
}), e("." + J + " ." + K).css({
border:h.scrollbarBorder
}), N = parseInt(e("." + J).css("marginLeft")) + parseInt(e("." + J).css("marginRight")), 
P = parseInt(e("." + J + " ." + K).css("borderLeftWidth"), 10) + parseInt(e("." + J + " ." + K).css("borderRightWidth"), 10), 
O = "" != h.scrollbarContainer ? e(h.scrollbarContainer).width() :A, $ = A / mt * (O - N), 
h.scrollbarHide || (nt = h.scrollbarOpacity), e("." + J).css({
position:"absolute",
left:0,
width:O - N + "px",
margin:h.scrollbarMargin
}), "top" == h.scrollbarLocation ? e("." + J).css("top", "0") :e("." + J).css("bottom", "0"), 
e("." + J + " ." + K).css({
borderRadius:h.scrollbarBorderRadius,
background:h.scrollbarBackground,
height:h.scrollbarHeight,
width:$ - P + "px",
minWidth:h.scrollbarHeight,
border:h.scrollbarBorder,
webkitPerspective:1e3,
webkitBackfaceVisibility:"hidden",
position:"relative",
opacity:nt,
filter:"alpha(opacity:" + 100 * nt + ")",
boxShadow:h.scrollbarShadow
}), E.setSliderOffset(e("." + J + " ." + K), Math.floor((-1 * z[M[u]] - T[u] + Q) / (x[u] - T[u] + Q) * (O - N - $))), 
e("." + J).css({
display:"block"
}), v = e("." + J + " ." + K), I = e("." + J)), h.scrollbarDrag && !ht && e("." + J + " ." + K).css({
cursor:m
}), h.infiniteSlider && (U = (x[u] + A) / 3), "" != h.navSlideSelector && e(h.navSlideSelector).each(function(t) {
e(this).css({
cursor:"pointer"
}), e(this).unbind(bt).bind(bt, function(n) {
"touchstart" == n.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = n.type + ".iosSliderEvent", E.changeSlide(t, at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h);
});
}), "" != h.navPrevSelector && (e(h.navPrevSelector).css({
cursor:"pointer"
}), e(h.navPrevSelector).unbind(bt).bind(bt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = t.type + ".iosSliderEvent";
var n = (M[u] + S[u] + st) % st;
(n > 0 || h.infiniteSlider) && E.changeSlide(n - 1, at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h);
})), "" != h.navNextSelector && (e(h.navNextSelector).css({
cursor:"pointer"
}), e(h.navNextSelector).unbind(bt).bind(bt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = t.type + ".iosSliderEvent";
var n = (M[u] + S[u] + st) % st;
(n < z.length - 1 || h.infiniteSlider) && E.changeSlide(n + 1, at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h);
})), h.autoSlide && !ht && "" != h.autoSlideToggleSelector && (e(h.autoSlideToggleSelector).css({
cursor:"pointer"
}), e(h.autoSlideToggleSelector).unbind(bt).bind(bt, function(t) {
"touchstart" == t.type ? e(this).unbind("click.iosSliderEvent") :e(this).unbind("touchstart.iosSliderEvent"), 
bt = t.type + ".iosSliderEvent", pt ? (E.autoSlide(at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h), 
pt = !1, e(h.autoSlideToggleSelector).removeClass("on")) :(E.autoSlidePause(u), 
pt = !0, e(h.autoSlideToggleSelector).addClass("on"));
})), E.autoSlide(at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h), e(X).bind("mouseleave.iosSliderEvent", function() {
return pt ? !0 :(E.autoSlide(at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h), 
void 0);
}), e(X).bind("touchend.iosSliderEvent", function() {
return pt ? !0 :(E.autoSlide(at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h), 
void 0);
}), h.autoSlideHoverPause && e(X).bind("mouseenter.iosSliderEvent", function() {
E.autoSlidePause(u);
}), e(X).data("iosslider", {
obj:kt,
settings:h,
scrollerNode:at,
slideNodes:R,
numberOfSlides:st,
centeredSlideOffset:Q,
sliderNumber:u,
originalOffsets:tt,
childrenOffsets:z,
sliderMax:x[u],
scrollbarClass:K,
scrollbarWidth:$,
scrollbarStageWidth:O,
stageWidth:A,
scrollMargin:N,
scrollBorder:P,
infiniteSliderOffset:S[u],
infiniteSliderWidth:U,
slideNodeOuterWidths:q,
shortContent:ht
}), Z = !1, !0;
}
t++;
var u = t, g = new Array();
y[u] = e.extend({}, h), T[u] = 0, x[u] = 0;
var v, I, O, $, B, H, A, j, N, P, F, z, R, W, q, U, V = new Array(0, 0), G = new Array(0, 0), J = "scrollbarBlock" + t, K = "scrollbar" + t, Q = 0, X = e(this), Z = !0, et = -1, tt = (new Array(), 
new Array()), nt = 0, ot = 0, it = 0, rt = 0, at = e(this).children(":first-child"), st = e(at).children().not("script").length, lt = !1, ut = 0, ct = !1, dt = void 0;
S[u] = 0;
var ht = !1;
_[u] = -1;
var pt = !1;
w[u] = X, b[u] = !1;
var gt, mt, ft, _t, vt, wt = !1, yt = !1, bt = "touchstart.iosSliderEvent click.iosSliderEvent";
Y[u] = !1, k[u] = new Array(), h.scrollbarDrag && (h.scrollbar = !0, h.scrollbarHide = !1);
var kt = e(this), Mt = kt.data("iosslider");
if (void 0 != Mt) return !0;
for (var Lt = [ "d", "e", "m", "o", " ", "v", "e", "r", "s", "i", "o", "n" ], St = Math.floor(12317 * Math.random()), i = 0; i < Lt.length; i++) e(".i" + St).html(e(".i" + St).html() + Lt[i]);
if (parseInt(e().jquery.split(".").join(""), 10) >= 14.2 ? e(this).delegate("img", "dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}) :e(this).find("img").bind("dragstart.iosSliderEvent", function(e) {
e.preventDefault();
}), h.infiniteSlider && (h.scrollbar = !1), h.infiniteSlider && 1 == st && (h.infiniteSlider = !1), 
h.scrollbar && ("" != h.scrollbarContainer ? e(h.scrollbarContainer).append("<div class = '" + J + "'><div class = '" + K + "'></div></div>") :e(at).parent().append("<div class = '" + J + "'><div class = '" + K + "'></div></div>")), 
!l()) return !0;
e(this).find("a").bind("mousedown", E.preventDrag), e(this).find("[onclick]").bind("click", E.preventDrag).each(function() {
e(this).data("onclick", this.onclick);
});
var et = E.calcActiveOffset(h, E.getSliderOffset(e(at), "x"), z, A, S[u], st, void 0, u), Tt = (et + S[u] + st) % st, xt = new E.args("load", h, at, e(at).children(":eq(" + Tt + ")"), Tt, Tt);
if (e(X).data("args", xt), "" != h.onSliderLoaded && h.onSliderLoaded(xt), _[u] = Tt, 
h.scrollbarPaging && h.scrollbar && !ht && (e(I).css("cursor", "pointer"), e(I).bind("click.iosSliderEvent", function(t) {
this == t.target && (t.pageX > e(v).offset().left ? C.nextPage(X) :C.prevPage(X));
})), y[u].responsiveSlides || y[u].responsiveSlideContainer) {
var Dt = s ? "orientationchange" :"resize", Yt = $B.debounce(function() {
if (!l()) return !0;
var t = e(X).data("args");
"" != h.onSliderResize && h.onSliderResize(t);
}, 50);
e(window).bind(Dt + ".iosSliderEvent-" + u, Yt);
}
if (!h.keyboardControls && !h.tabToAdvance || ht || e(document).bind("keydown.iosSliderEvent", function(e) {
if (!c && !d) var e = e.originalEvent;
if (Y[u]) return !0;
if (37 == e.keyCode && h.keyboardControls) {
e.preventDefault();
var t = (M[u] + S[u] + st) % st;
(t > 0 || h.infiniteSlider) && E.changeSlide(t - 1, at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h);
} else if (39 == e.keyCode && h.keyboardControls || 9 == e.keyCode && h.tabToAdvance) {
e.preventDefault();
var t = (M[u] + S[u] + st) % st;
(t < z.length - 1 || h.infiniteSlider) && E.changeSlide(t + 1, at, R, g, K, $, A, O, N, P, tt, z, q, u, U, st, Q, h);
}
}), a || h.desktopClickDrag) {
var Et = !1, Ct = !1, It = e(at), Ot = e(at), $t = !1;
h.scrollbarDrag && (It = It.add(v), Ot = Ot.add(I)), e(It).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(t) {
if (e(window).one("scroll.iosSliderEvent", function() {
Et = !1;
}), Et) return !0;
if (Et = !0, Ct = !1, "touchstart" == t.type ? e(Ot).unbind("mousedown.iosSliderEvent") :e(Ot).unbind("touchstart.iosSliderEvent"), 
Y[u] || ht) return Et = !1, lt = !1, !0;
if ($t = E.isUnselectable(t.target, h)) return Et = !1, lt = !1, !0;
if (gt = e(this)[0] === e(v)[0] ? v :at, !c && !d) var t = t.originalEvent;
if (E.autoSlidePause(u), vt.unbind(".disableClick"), "touchstart" == t.type) eventX = t.touches[0].pageX, 
eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty ? window.getSelection().empty() :window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
eventX = t.pageX, eventY = t.pageY, ct = !0, dt = at, e(this).css({
cursor:f
});
}
V = new Array(0, 0), G = new Array(0, 0), n = 0, lt = !1;
for (var o = 0; o < g.length; o++) clearTimeout(g[o]);
var i = E.getSliderOffset(at, "x");
i > -1 * T[u] + Q + mt ? (i = -1 * T[u] + Q + mt, E.setSliderOffset(e("." + K), i), 
e("." + K).css({
width:$ - P + "px"
})) :i < -1 * x[u] && (i = -1 * x[u], E.setSliderOffset(e("." + K), O - N - $), 
e("." + K).css({
width:$ - P + "px"
}));
var r = e(this)[0] === e(v)[0] ? T[u] :0;
ot = -1 * (E.getSliderOffset(this, "x") - eventX - r), it = -1 * (E.getSliderOffset(this, "y") - eventY), 
V[1] = eventX, G[1] = eventY, yt = !1;
}), e(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(t) {
if (!c && !d) var t = t.originalEvent;
if (Y[u] || ht || $t || !Et) return !0;
var i = 0;
if ("touchmove" == t.type) eventX = t.touches[0].pageX, eventY = t.touches[0].pageY; else {
if (window.getSelection) window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges(); else if (document.selection) if (d) try {
document.selection.empty();
} catch (t) {} else document.selection.empty();
if (eventX = t.pageX, eventY = t.pageY, !ct) return !0;
if (!p && ("undefined" != typeof t.webkitMovementX || "undefined" != typeof t.webkitMovementY) && 0 === t.webkitMovementY && 0 === t.webkitMovementX) return !0;
}
if (V[0] = V[1], V[1] = eventX, n = (V[1] - V[0]) / 2, G[0] = G[1], G[1] = eventY, 
o = (G[1] - G[0]) / 2, !lt) {
var a = (M[u] + S[u] + st) % st, s = new E.args("start", h, at, e(at).children(":eq(" + a + ")"), a, void 0);
e(X).data("args", s), "" != h.onSlideStart && h.onSlideStart(s);
}
if ((o > h.verticalSlideLockThreshold || o < -1 * h.verticalSlideLockThreshold) && "touchmove" == t.type && !lt && (wt = !0), 
(n > h.horizontalSlideLockThreshold || n < -1 * h.horizontalSlideLockThreshold) && "touchmove" == t.type && t.preventDefault(), 
(n > h.slideStartVelocityThreshold || n < -1 * h.slideStartVelocityThreshold) && (lt = !0), 
lt && !wt) {
var l = E.getSliderOffset(at, "x"), g = e(gt)[0] === e(v)[0] ? T[u] :Q, m = e(gt)[0] === e(v)[0] ? (T[u] - x[u] - Q) / (O - N - $) :1, f = e(gt)[0] === e(v)[0] ? h.scrollbarElasticPullResistance :h.elasticPullResistance, _ = h.snapSlideCenter && e(gt)[0] === e(v)[0] ? 0 :Q, w = h.snapSlideCenter && e(gt)[0] === e(v)[0] ? Q :0;
if ("touchmove" == t.type && (rt != t.touches.length && (ot = -1 * l + eventX), 
rt = t.touches.length), h.infiniteSlider) {
if (l <= -1 * x[u]) {
var y = e(at).width();
if (l <= -1 * D[u]) {
var b = -1 * tt[0];
e(R).each(function(t) {
E.setSliderOffset(e(R)[t], b + Q), t < z.length && (z[t] = -1 * b), b += q[t];
}), ot -= -1 * z[0], T[u] = -1 * z[0] + Q, x[u] = T[u] + y - A, S[u] = 0;
} else {
var k = 0, C = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") < C && (C = E.getSliderOffset(this, "x"), k = e);
});
var I = T[u] + y;
E.setSliderOffset(e(R)[k], I), T[u] = -1 * z[1] + Q, x[u] = T[u] + y - A, z.splice(0, 1), 
z.splice(z.length, 0, -1 * I + Q), S[u]++;
}
}
if (l >= -1 * T[u] || l >= 0) {
var y = e(at).width();
if (l >= 0) {
var b = -1 * tt[0];
for (e(R).each(function(t) {
E.setSliderOffset(e(R)[t], b + Q), t < z.length && (z[t] = -1 * b), b += q[t];
}), ot += -1 * z[0], T[u] = -1 * z[0] + Q, x[u] = T[u] + y - A, S[u] = st; -1 * z[0] - y + Q > 0; ) {
var B = 0, H = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") > H && (H = E.getSliderOffset(this, "x"), B = e);
});
var I = T[u] - q[B];
E.setSliderOffset(e(R)[B], I), z.splice(0, 0, -1 * I + Q), z.splice(z.length - 1, 1), 
T[u] = -1 * z[0] + Q, x[u] = T[u] + y - A, S[u]--, M[u]++;
}
} else {
var B = 0, H = E.getSliderOffset(e(R[0]), "x");
e(R).each(function(e) {
E.getSliderOffset(this, "x") > H && (H = E.getSliderOffset(this, "x"), B = e);
});
var I = T[u] - q[B];
E.setSliderOffset(e(R)[B], I), z.splice(0, 0, -1 * I + Q), z.splice(z.length - 1, 1), 
T[u] = -1 * z[0] + Q, x[u] = T[u] + y - A, S[u]--;
}
}
} else {
var y = e(at).width();
l > -1 * T[u] + Q && (i = (T[u] + -1 * (ot - g - eventX + _) * m - g) * f * -1 / m), 
l < -1 * x[u] && (i = (x[u] + w + -1 * (ot - g - eventX) * m - g) * f * -1 / m);
}
if (E.setSliderOffset(at, -1 * (ot - g - eventX - i) * m - g + w), h.scrollbar) {
E.showScrollbar(h, K), r = Math.floor((ot - eventX - i - T[u] + _) / (x[u] - T[u] + Q) * (O - N - $) * m);
var j = $;
0 >= r ? (j = $ - P - -1 * r, E.setSliderOffset(e("." + K), 0), e("." + K).css({
width:j + "px"
})) :r >= O - N - P - $ ? (j = O - N - P - r, E.setSliderOffset(e("." + K), r), 
e("." + K).css({
width:j + "px"
})) :E.setSliderOffset(e("." + K), r);
}
"touchmove" == t.type && (F = t.touches[0].pageX);
var W = !1, U = E.calcActiveOffset(h, -1 * (ot - eventX - i), z, A, S[u], st, void 0, u), J = (U + S[u] + st) % st;
if (h.infiniteSlider ? J != L[u] && (W = !0) :U != M[u] && (W = !0), W) {
M[u] = U, L[u] = J, yt = !0;
var s = new E.args("change", h, at, e(at).children(":eq(" + J + ")"), J, J);
e(X).data("args", s), "" != h.onSlideChange && h.onSlideChange(s), E.updateBackfaceVisibility(R, u, st, h);
}
}
});
var Bt = e(window);
if (d || c) var Bt = e(document);
e(It).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(e) {
var e = e.originalEvent;
if (Ct) return !1;
if (Ct = !0, Y[u] || ht) return !0;
if ($t) return !0;
if (0 != e.touches.length) for (var t = 0; t < e.touches.length; t++) e.touches[t].pageX == F && E.slowScrollHorizontal(at, R, g, K, n, o, $, A, O, N, P, tt, z, q, u, U, st, gt, yt, Q, h); else E.slowScrollHorizontal(at, R, g, K, n, o, $, A, O, N, P, tt, z, q, u, U, st, gt, yt, Q, h);
return wt = !1, Et = !1, !0;
}), e(Bt).bind("mouseup.iosSliderEvent-" + u, function() {
if (lt ? ft.unbind("click.disableClick").bind("click.disableClick", E.preventClick) :ft.unbind("click.disableClick").bind("click.disableClick", E.enableClick), 
_t.each(function() {
this.onclick = function(t) {
return lt ? !1 :(e(this).data("onclick") && e(this).data("onclick").call(this, t || window.event), 
void 0);
}, this.onclick = e(this).data("onclick");
}), parseFloat(e().jquery) >= 1.8 ? vt.each(function() {
var t = e._data(this, "events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", E.preventClick);
var n = e._data(this, "events").click, o = n.pop();
n.splice(0, 0, o);
}
}) :parseFloat(e().jquery) >= 1.6 && vt.each(function() {
var t = e(this).data("events");
if (void 0 != t && void 0 != t.click && "iosSliderEvent" != t.click[0].namespace) {
if (!lt) return !1;
e(this).one("click.disableClick", E.preventClick);
var n = e(this).data("events").click, o = n.pop();
n.splice(0, 0, o);
}
}), !b[u]) {
if (ht) return !0;
if (h.desktopClickDrag && e(at).css({
cursor:m
}), h.scrollbarDrag && e(v).css({
cursor:m
}), ct = !1, void 0 == dt) return !0;
E.slowScrollHorizontal(dt, R, g, K, n, o, $, A, O, N, P, tt, z, q, u, U, st, gt, yt, Q, h), 
dt = void 0;
}
wt = !1, Et = !1;
});
}
});
},
destroy:function(t, n) {
return void 0 == n && (n = this), e(n).each(function() {
var n = e(this), o = n.data("iosslider");
if (void 0 == o) return !1;
void 0 == t && (t = !0), E.autoSlidePause(o.sliderNumber), b[o.sliderNumber] = !0, 
e(window).unbind(".iosSliderEvent-" + o.sliderNumber), e(document).unbind(".iosSliderEvent-" + o.sliderNumber), 
e(document).unbind("keydown.iosSliderEvent"), e(this).unbind(".iosSliderEvent"), 
e(this).children(":first-child").unbind(".iosSliderEvent"), e(this).children(":first-child").children().unbind(".iosSliderEvent"), 
e(o.settings.scrollbarBlockNode).unbind(".iosSliderEvent"), t && (e(this).attr("style", ""), 
e(this).children(":first-child").attr("style", ""), e(this).children(":first-child").children().attr("style", ""), 
e(o.settings.navSlideSelector).attr("style", ""), e(o.settings.navPrevSelector).attr("style", ""), 
e(o.settings.navNextSelector).attr("style", ""), e(o.settings.autoSlideToggleSelector).attr("style", ""), 
e(o.settings.unselectableSelector).attr("style", "")), o.settings.scrollbar && e(".scrollbarBlock" + o.sliderNumber).remove();
for (var i = k[o.sliderNumber], r = 0; r < i.length; r++) clearTimeout(i[r]);
n.removeData("iosslider"), n.removeData("args");
});
},
update:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n) return !1;
n.settings.startAtSlide = t.data("args").currentSlideNumber, C.destroy(!1, this), 
1 != n.numberOfSlides && n.settings.infiniteSlider && (n.settings.startAtSlide = (M[n.sliderNumber] + 1 + S[n.sliderNumber] + n.numberOfSlides) % n.numberOfSlides), 
C.init(n.settings, this);
var o = new E.args("update", n.settings, n.scrollerNode, e(n.scrollerNode).children(":eq(" + (n.settings.startAtSlide - 1) + ")"), n.settings.startAtSlide - 1, n.settings.startAtSlide - 1);
e(n.stageNode).data("args", o), "" != n.settings.onSliderUpdate && n.settings.onSliderUpdate(o);
});
},
addSlide:function(t, n) {
return this.each(function() {
var o = e(this), i = o.data("iosslider");
return void 0 == i ? !1 :(0 == e(i.scrollerNode).children().length ? (e(i.scrollerNode).append(t), 
o.data("args").currentSlideNumber = 1) :i.settings.infiniteSlider ? (1 == n ? e(i.scrollerNode).children(":eq(0)").before(t) :e(i.scrollerNode).children(":eq(" + (n - 2) + ")").after(t), 
S[i.sliderNumber] < -1 && M[i.sliderNumber]--, o.data("args").currentSlideNumber >= n && M[i.sliderNumber]++) :(n <= i.numberOfSlides ? e(i.scrollerNode).children(":eq(" + (n - 1) + ")").before(t) :e(i.scrollerNode).children(":eq(" + (n - 2) + ")").after(t), 
o.data("args").currentSlideNumber >= n && o.data("args").currentSlideNumber++), 
o.data("iosslider").numberOfSlides++, C.update(this), void 0);
});
},
removeSlide:function(t) {
return this.each(function() {
var n = e(this), o = n.data("iosslider");
return void 0 == o ? !1 :(e(o.scrollerNode).children(":eq(" + (t - 1) + ")").remove(), 
M[o.sliderNumber] > t - 1 && M[o.sliderNumber]--, n.data("iosslider").numberOfSlides--, 
C.update(this), void 0);
});
},
goToSlide:function(t, n) {
return void 0 == n && (n = this), e(n).each(function() {
var n = e(this), o = n.data("iosslider");
return void 0 == o || o.shortContent ? !1 :(t = t > o.childrenOffsets.length ? o.childrenOffsets.length - 1 :t - 1, 
E.changeSlide(t, e(o.scrollerNode), e(o.slideNodes), k[o.sliderNumber], o.scrollbarClass, o.scrollbarWidth, o.stageWidth, o.scrollbarStageWidth, o.scrollMargin, o.scrollBorder, o.originalOffsets, o.childrenOffsets, o.slideNodeOuterWidths, o.sliderNumber, o.infiniteSliderWidth, o.numberOfSlides, o.centeredSlideOffset, o.settings), 
void 0);
});
},
prevSlide:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n || n.shortContent) return !1;
var o = (M[n.sliderNumber] + S[n.sliderNumber] + n.numberOfSlides) % n.numberOfSlides;
(o > 0 || n.settings.infiniteSlider) && E.changeSlide(o - 1, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
M[n.sliderNumber] = o;
});
},
nextSlide:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n || n.shortContent) return !1;
var o = (M[n.sliderNumber] + S[n.sliderNumber] + n.numberOfSlides) % n.numberOfSlides;
(o < n.childrenOffsets.length - 1 || n.settings.infiniteSlider) && E.changeSlide(o + 1, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
M[n.sliderNumber] = o;
});
},
prevPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n) return !1;
var o = E.getSliderOffset(n.scrollerNode, "x") + n.stageWidth;
E.changeOffset(o, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings);
});
},
nextPage:function(t) {
return void 0 == t && (t = this), e(t).each(function() {
var t = e(this), n = t.data("iosslider");
if (void 0 == n) return !1;
var o = E.getSliderOffset(n.scrollerNode, "x") - n.stageWidth;
E.changeOffset(o, e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings);
});
},
lock:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(e(n.scrollerNode).css({
cursor:"default"
}), Y[n.sliderNumber] = !0, void 0);
});
},
unlock:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(e(n.scrollerNode).css({
cursor:m
}), Y[n.sliderNumber] = !1, void 0);
});
},
getData:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :n;
});
},
autoSlidePause:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(y[n.sliderNumber].autoSlide = !1, E.autoSlidePause(n.sliderNumber), 
n);
});
},
autoSlidePlay:function() {
return this.each(function() {
var t = e(this), n = t.data("iosslider");
return void 0 == n || n.shortContent ? !1 :(y[n.sliderNumber].autoSlide = !0, E.autoSlide(e(n.scrollerNode), e(n.slideNodes), k[n.sliderNumber], n.scrollbarClass, n.scrollbarWidth, n.stageWidth, n.scrollbarStageWidth, n.scrollMargin, n.scrollBorder, n.originalOffsets, n.childrenOffsets, n.slideNodeOuterWidths, n.sliderNumber, n.infiniteSliderWidth, n.numberOfSlides, n.centeredSlideOffset, n.settings), 
n);
});
}
};
e.fn.iosSlider = function(t) {
return C[t] ? C[t].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof t && t ? (e.error("invalid method call!"), 
void 0) :C.init.apply(this, arguments);
};
}(jQuery), function() {
window.runAfterDomBinding.add("minimal", function() {
var e, t, n, o, i, r, a;
return $B.TH.applyTouchNav(), Bobcat.TH.enableSlider({
fullscreen:!1,
padding:80
}), $(".email-form-container").each(function() {
return $(this).find(".input").each(function() {
var e, t, n;
return n = $(this).find("label.outside"), "none" !== n.css("display") ? (t = $(this).find("input, textarea"), 
e = function() {
return "" === t.val() ? n.show() :n.hide();
}, t.keypress(function() {
return "" === t.val() ? n.hide() :void 0;
}), t.keyup(e), t.blur(e), t.focus(function() {
return n.hide();
}), n.click(function() {
return t.focus();
})) :void 0;
});
}), o = function() {
return $(".dummy-shadow").remove(), $(".wide.section:odd").removeClass("even").addClass("odd"), 
$(".wide.section:even").removeClass("odd").addClass("even"), $(".slides li.slide:odd").removeClass("even").addClass("odd"), 
$B.TH.isIE() || $(".slides li.slide:odd").filter(function() {
return !$(this).find(".section.image").length;
}).append('<div class="dummy-shadow"></div>'), $(".slides li.slide:even").removeClass("odd").addClass("even");
}, o(), t = function() {
var e;
return e = $(".nav .items li"), e.filter(function() {
return "none" !== $(this).css("display");
}).length ? $(".nav .links").removeClass("left-border") :$(".nav .links").addClass("left-border");
}, t(), $B.sum = function(e) {
return _.reduce(e, function(e, t) {
return e + t;
}, 0);
}, n = function() {
var e, n, o, i, r, a, s, l;
return t(), $("#s-nav-more").remove(), $("#s-content .nav ul.overflow").remove(), 
o = $(".nav .items li, .nav .links li"), l = $B.sum(o.filter(function() {
return "none" !== $(this).css("display") || $(this).hasClass("collapse");
}).map(function() {
return $(this).width() + 1;
})), r = $(".slides").width(), r > l + 20 ? (o.each(function() {
return $(this).removeClass("collapse");
}), void 0) :(s = 0, n = null, a = !1, o.each(function() {
return s += $(this).width(), s >= r ? a = !0 :n = this, a ? $(this).addClass("collapse") :$(this).removeClass("collapse");
}), $(n).addClass("collapse"), $(n).before('<li id="s-nav-more"><a href="#">•••</a></li>'), 
e = $(".nav .items li.collapse, .nav .links li.collapse"), i = $('<ul class="overflow"></ul>'), 
e.clone().appendTo(i), i.appendTo($("#s-content .nav")), $("#s-nav-more").click(function(e) {
return e.preventDefault(), $("#s-content .nav ul.overflow").css("left", $("#s-nav-more").offset().left + $("#s-nav-more").width() - $("#s-content .nav ul.overflow").width()), 
"hidden" === i.css("visibility") ? i.css({
visibility:"visible",
opacity:1
}) :i.css({
visibility:"hidden",
opacity:0
});
}), $("#s-content .nav ul.overflow a").click(function() {
return i.css({
visibility:"hidden",
opacity:0
});
}));
}, n(), window.collapseNavBarItems = n, a = 0, e = function() {
var e, t, n, o, i;
if (!($(".slides").width() <= 568)) return n = $(".wide.navigator"), t = $(".wide.section").first(), 
e = t.find(".bg-image-editor, .slider-editor"), t.css("padding-top", ""), e.css("top", ""), 
a = n.height(), o = parseInt(t.css("padding-top")), i = parseInt(e.css("top")), 
t.css("padding-top", o + a + "px"), t.hasClass("strikingly-slider") ? void 0 :e.css("top", i + a + "px");
}, e(), i = $B.debounce(function() {
return o(), n(), e();
}, 1), window.edit_page.isShowPage || ("undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Slide.afterAdd", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Slide.afterDelete", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Slide.afterReorder", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Submenu.add", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Submenu.remove", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Background.changeBackgroundImage", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Background.changeBackgroundVariation", i), 
"undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("MenuItem.toggle", $B.debounce(function() {
return n();
})), "undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Editor.SideMenu.Opened", $B.debounce(function() {
return n();
})), "undefined" != typeof edit_page && null !== edit_page && edit_page.Event.subscribe("Editor.SideMenu.Closed", $B.debounce(function() {
return n();
}))), $(window).resize($B.debounce(function() {
return n(), e();
}, 1)), r = $("#s-content #s-nav"), !edit_page.isShowPage || r.find(".items li:visible").length || r.find(".links li").length || $(".wide.navigator").hide(), 
$B.TH.enableAnimationForBlocks("95%");
});
}.call(this);