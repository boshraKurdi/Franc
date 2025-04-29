import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/cookie-universal/dist/cookie-universal-common.js
var require_cookie_universal_common = __commonJS({
  "node_modules/cookie-universal/dist/cookie-universal-common.js"(exports, module) {
    module.exports = function(e) {
      function t(o) {
        if (r[o]) return r[o].exports;
        var n = r[o] = { i: o, l: false, exports: {} };
        return e[o].call(n.exports, n, n.exports, t), n.l = true, n.exports;
      }
      var r = {};
      return t.m = e, t.c = r, t.d = function(e2, r2, o) {
        t.o(e2, r2) || Object.defineProperty(e2, r2, { configurable: false, enumerable: true, get: o });
      }, t.n = function(e2) {
        var r2 = e2 && e2.__esModule ? function() {
          return e2.default;
        } : function() {
          return e2;
        };
        return t.d(r2, "a", r2), r2;
      }, t.o = function(e2, t2) {
        return Object.prototype.hasOwnProperty.call(e2, t2);
      }, t.p = "", t(t.s = 0);
    }([function(e, t, r) {
      "use strict";
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
        return typeof e2;
      } : function(e2) {
        return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
      }, n = r(1);
      e.exports = function(t2, r2) {
        var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], a = "object" === ("undefined" == typeof document ? "undefined" : o(document)) && "string" == typeof document.cookie, s = "object" === (void 0 === t2 ? "undefined" : o(t2)) && "object" === (void 0 === r2 ? "undefined" : o(r2)) && void 0 !== e, u = !a && !s || a && s, f = function(e2) {
          if (s) {
            var o2 = t2.headers.cookie || "";
            return e2 && (o2 = r2.getHeaders(), o2 = o2["set-cookie"] ? o2["set-cookie"].map(function(e3) {
              return e3.split(";")[0];
            }).join(";") : ""), o2;
          }
          if (a) return document.cookie || "";
        }, c = function() {
          var e2 = r2.getHeader("Set-Cookie");
          return (e2 = "string" == typeof e2 ? [e2] : e2) || [];
        }, p = function(e2) {
          return r2.setHeader("Set-Cookie", e2);
        }, d = function(e2, t3) {
          if (!t3) return e2;
          try {
            return JSON.parse(e2);
          } catch (t4) {
            return e2;
          }
        }, l = { parseJSON: i, set: function() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { path: "/" };
          if (!u) if (t3 = "object" === (void 0 === t3 ? "undefined" : o(t3)) ? JSON.stringify(t3) : t3, s) {
            var i2 = c();
            i2.push(n.serialize(e2, t3, r3)), p(i2);
          } else document.cookie = n.serialize(e2, t3, r3);
        }, setAll: function() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          u || Array.isArray(e2) && e2.forEach(function(e3) {
            var t3 = e3.name, r3 = void 0 === t3 ? "" : t3, o2 = e3.value, n2 = void 0 === o2 ? "" : o2, i2 = e3.opts, a2 = void 0 === i2 ? { path: "/" } : i2;
            l.set(r3, n2, a2);
          });
        }, get: function() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { fromRes: false, parseJSON: l.parseJSON };
          if (u) return "";
          var r3 = n.parse(f(t3.fromRes)), o2 = r3[e2];
          return d(o2, t3.parseJSON);
        }, getAll: function() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { fromRes: false, parseJSON: l.parseJSON };
          if (u) return {};
          var t3 = n.parse(f(e2.fromRes));
          for (var r3 in t3) t3[r3] = d(t3[r3], e2.parseJSON);
          return t3;
        }, remove: function() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { path: "/" };
          u || (t3.expires = /* @__PURE__ */ new Date(0), l.set(e2, "", t3));
        }, removeAll: function() {
          var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { path: "/" };
          if (!u) {
            var t3 = n.parse(f());
            for (var r3 in t3) l.remove(r3, e2);
          }
        }, nodeCookie: n };
        return l;
      };
    }, function(e, t, r) {
      "use strict";
      function o(e2, t2) {
        if ("string" != typeof e2) throw new TypeError("argument str must be a string");
        for (var r2 = {}, o2 = t2 || {}, n2 = e2.split(u), s2 = o2.decode || a, f2 = 0; f2 < n2.length; f2++) {
          var c = n2[f2], p = c.indexOf("=");
          if (!(p < 0)) {
            var d = c.substr(0, p).trim(), l = c.substr(++p, c.length).trim();
            '"' == l[0] && (l = l.slice(1, -1)), void 0 == r2[d] && (r2[d] = i(l, s2));
          }
        }
        return r2;
      }
      function n(e2, t2, r2) {
        var o2 = r2 || {}, n2 = o2.encode || s;
        if ("function" != typeof n2) throw new TypeError("option encode is invalid");
        if (!f.test(e2)) throw new TypeError("argument name is invalid");
        var i2 = n2(t2);
        if (i2 && !f.test(i2)) throw new TypeError("argument val is invalid");
        var a2 = e2 + "=" + i2;
        if (null != o2.maxAge) {
          var u2 = o2.maxAge - 0;
          if (isNaN(u2)) throw new Error("maxAge should be a Number");
          a2 += "; Max-Age=" + Math.floor(u2);
        }
        if (o2.domain) {
          if (!f.test(o2.domain)) throw new TypeError("option domain is invalid");
          a2 += "; Domain=" + o2.domain;
        }
        if (o2.path) {
          if (!f.test(o2.path)) throw new TypeError("option path is invalid");
          a2 += "; Path=" + o2.path;
        }
        if (o2.expires) {
          if ("function" != typeof o2.expires.toUTCString) throw new TypeError("option expires is invalid");
          a2 += "; Expires=" + o2.expires.toUTCString();
        }
        if (o2.httpOnly && (a2 += "; HttpOnly"), o2.secure && (a2 += "; Secure"), o2.sameSite) {
          switch ("string" == typeof o2.sameSite ? o2.sameSite.toLowerCase() : o2.sameSite) {
            case true:
              a2 += "; SameSite=Strict";
              break;
            case "lax":
              a2 += "; SameSite=Lax";
              break;
            case "strict":
              a2 += "; SameSite=Strict";
              break;
            case "none":
              a2 += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return a2;
      }
      function i(e2, t2) {
        try {
          return t2(e2);
        } catch (t3) {
          return e2;
        }
      }
      t.parse = o, t.serialize = n;
      var a = decodeURIComponent, s = encodeURIComponent, u = /; */, f = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    }]);
  }
});
export default require_cookie_universal_common();
/*! Bundled license information:

cookie-universal/dist/cookie-universal-common.js:
  (*!
  * cookie
  * Copyright(c) 2012-2014 Roman Shtylman
  * Copyright(c) 2015 Douglas Christopher Wilson
  * MIT Licensed
  *)
*/
//# sourceMappingURL=cookie-universal.js.map
