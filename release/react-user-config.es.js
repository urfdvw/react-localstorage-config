import * as P from "react";
import hr, { useState as Bo, useEffect as Va, forwardRef as gy, useContext as k$, Children as M$, isValidElement as Gs, cloneElement as Ys, createElement as vy, Component as os, useCallback as $t, useReducer as D$, createRef as F$ } from "react";
import * as by from "react-dom";
import Cs from "react-dom";
var $o = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function L$(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
function B$(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var $y = { exports: {} };
(function(e, t) {
  (function(r, n) {
    if (typeof B$ == "function")
      e.exports = n();
    else {
      var o = r.jsonSchemaDefaults;
      r.jsonSchemaDefaults = n(), r.jsonSchemaDefaults.noConflict = function() {
        var i = r.jsonSchemaDefaults;
        return r.jsonSchemaDefaults = o, i;
      };
    }
  })($o, function() {
    var r = function(c) {
      return typeof c == "object" && c !== null && c.toString() === {}.toString();
    }, n = function(c) {
      return JSON.parse(JSON.stringify(c));
    }, o = function(c, u) {
      c = n(c);
      for (var d in u)
        u.hasOwnProperty(d) && (r(c[d]) && r(u[d]) ? c[d] = o(c[d], u[d]) : c[d] = u[d]);
      return c;
    }, i = function(c, u) {
      c = c.replace(/^#\/definitions\//, "").split("/");
      var d = function(f, m) {
        var h = f.shift();
        return m[h] ? f.length ? d(f, m[h]) : m[h] : {};
      }, p = d(c, u);
      return r(p) ? n(p) : p;
    }, a = function(c, u) {
      for (var d = c.length, p = -1, f = {}; ++p < d; ) {
        var m = c[p];
        m = typeof m.$ref < "u" ? i(m.$ref, u) : m, f = o(f, m);
      }
      return f;
    }, l = function(c, u) {
      if (typeof c.default < "u")
        return c.default;
      if (typeof c.allOf < "u") {
        var d = a(c.allOf, u);
        return l(d, u);
      } else if (typeof c.$ref < "u") {
        var p = i(c.$ref, u);
        return l(p, u);
      } else if (c.type === "object") {
        if (!c.properties)
          return {};
        for (var f in c.properties)
          c.properties.hasOwnProperty(f) && (c.properties[f] = l(c.properties[f], u), typeof c.properties[f] > "u" && delete c.properties[f]);
        return c.properties;
      } else if (c.type === "array") {
        if (!c.items)
          return [];
        var m = c.minItems || 0;
        if (c.items.constructor === Array) {
          for (var h = c.items.map(function(v) {
            return l(v, u);
          }), g = h.length - 1; g >= 0 && !(typeof h[g] < "u"); g--)
            g + 1 > m && h.pop();
          return h;
        }
        var y = l(c.items, u);
        if (typeof y > "u")
          return [];
        for (var h = [], g = 0; g < Math.max(1, m); g++)
          h.push(n(y));
        return h;
      }
    };
    return function(c, u) {
      return typeof u > "u" ? u = c.definitions || {} : r(c.definitions) && (u = o(u, c.definitions)), l(n(c), u);
    };
  });
})($y);
var V$ = $y.exports, z$ = V$;
const U$ = /* @__PURE__ */ pt(z$);
function yu(e) {
  return e !== null && e != null;
}
function W$(e) {
  return typeof e == typeof {};
}
function Gl() {
  try {
    return Object.keys(localStorage).reduce((e, t) => ({ ...e, [t]: JSON.parse(localStorage.getItem(t)) }), {});
  } catch {
    return console.warn("LocalStorage contents cannot be converted to objects. bleached."), localStorage.clear(), {};
  }
}
function q$(e) {
  const [t, r] = Bo({});
  function n() {
    Gl(), yu(localStorage.getItem(e)) || localStorage.setItem(e, JSON.stringify({})), r(Gl()[e]);
  }
  function o(i, a) {
    localStorage.setItem(
      e,
      JSON.stringify({
        ...JSON.parse(localStorage.getItem(e)),
        [i]: a
      })
    ), r(Gl()[e]);
  }
  return { localStorageState: t, setLocalStorageState: o, initLocalStorageState: n };
}
function K$(e, t) {
  var r = U$(t);
  if (yu(e) && W$(e))
    for (const n in r)
      n in e && (r[n] = e[n]);
  return r;
}
function VX(e) {
  const { localStorageState: t, setLocalStorageState: r, initLocalStorageState: n } = q$("config"), [o, i] = Bo(0);
  Va(() => {
    if (o === 0 && (console.log("init step 0: initialize localStorageState"), n(), i(1)), o === 1) {
      console.log("init step 1: update localStorageState by schema defaults");
      for (const d of e) {
        const p = d.name;
        var u = K$(a(p), d);
        l(p, u);
      }
      i(-1);
    }
  }, [o]);
  function a(u) {
    const d = t[u];
    return yu(d) ? d : null;
  }
  function l(u, d) {
    r(u, d);
  }
  function c(u, d, p) {
    const f = a(u);
    d in f ? typeof p != typeof f[d] ? console.error(
      "given value " + p + " has a different type from config schema. Given: " + typeof p + ", required: " + typeof f[d]
    ) : l(u, { ...f, [d]: p }) : console.error("no field called " + d + " in config schema " + u);
  }
  return { config: t, set_config: l, set_config_field: c, ready: o < 0 };
}
var Ac = { exports: {} }, fi = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zf;
function H$() {
  if (zf)
    return fi;
  zf = 1;
  var e = hr, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, c, u) {
    var d, p = {}, f = null, m = null;
    u !== void 0 && (f = "" + u), c.key !== void 0 && (f = "" + c.key), c.ref !== void 0 && (m = c.ref);
    for (d in c)
      n.call(c, d) && !i.hasOwnProperty(d) && (p[d] = c[d]);
    if (l && l.defaultProps)
      for (d in c = l.defaultProps, c)
        p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: t, type: l, key: f, ref: m, props: p, _owner: o.current };
  }
  return fi.Fragment = r, fi.jsx = a, fi.jsxs = a, fi;
}
var pi = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uf;
function G$() {
  return Uf || (Uf = 1, process.env.NODE_ENV !== "production" && function() {
    var e = hr, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), h = Symbol.iterator, g = "@@iterator";
    function y(O) {
      if (O === null || typeof O != "object")
        return null;
      var j = h && O[h] || O[g];
      return typeof j == "function" ? j : null;
    }
    var v = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function $(O) {
      {
        for (var j = arguments.length, ee = new Array(j > 1 ? j - 1 : 0), ae = 1; ae < j; ae++)
          ee[ae - 1] = arguments[ae];
        E("error", O, ee);
      }
    }
    function E(O, j, ee) {
      {
        var ae = v.ReactDebugCurrentFrame, de = ae.getStackAddendum();
        de !== "" && (j += "%s", ee = ee.concat([de]));
        var ve = ee.map(function(we) {
          return String(we);
        });
        ve.unshift("Warning: " + j), Function.prototype.apply.call(console[O], console, ve);
      }
    }
    var S = !1, b = !1, x = !1, w = !1, A = !1, M;
    M = Symbol.for("react.module.reference");
    function k(O) {
      return !!(typeof O == "string" || typeof O == "function" || O === n || O === i || A || O === o || O === u || O === d || w || O === m || S || b || x || typeof O == "object" && O !== null && (O.$$typeof === f || O.$$typeof === p || O.$$typeof === a || O.$$typeof === l || O.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      O.$$typeof === M || O.getModuleId !== void 0));
    }
    function H(O, j, ee) {
      var ae = O.displayName;
      if (ae)
        return ae;
      var de = j.displayName || j.name || "";
      return de !== "" ? ee + "(" + de + ")" : ee;
    }
    function U(O) {
      return O.displayName || "Context";
    }
    function K(O) {
      if (O == null)
        return null;
      if (typeof O.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof O == "function")
        return O.displayName || O.name || null;
      if (typeof O == "string")
        return O;
      switch (O) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case i:
          return "Profiler";
        case o:
          return "StrictMode";
        case u:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof O == "object")
        switch (O.$$typeof) {
          case l:
            var j = O;
            return U(j) + ".Consumer";
          case a:
            var ee = O;
            return U(ee._context) + ".Provider";
          case c:
            return H(O, O.render, "ForwardRef");
          case p:
            var ae = O.displayName || null;
            return ae !== null ? ae : K(O.type) || "Memo";
          case f: {
            var de = O, ve = de._payload, we = de._init;
            try {
              return K(we(ve));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, G = 0, X, J, Z, ne, D, N, W;
    function F() {
    }
    F.__reactDisabledLog = !0;
    function T() {
      {
        if (G === 0) {
          X = console.log, J = console.info, Z = console.warn, ne = console.error, D = console.group, N = console.groupCollapsed, W = console.groupEnd;
          var O = {
            configurable: !0,
            enumerable: !0,
            value: F,
            writable: !0
          };
          Object.defineProperties(console, {
            info: O,
            log: O,
            warn: O,
            error: O,
            group: O,
            groupCollapsed: O,
            groupEnd: O
          });
        }
        G++;
      }
    }
    function R() {
      {
        if (G--, G === 0) {
          var O = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, O, {
              value: X
            }),
            info: z({}, O, {
              value: J
            }),
            warn: z({}, O, {
              value: Z
            }),
            error: z({}, O, {
              value: ne
            }),
            group: z({}, O, {
              value: D
            }),
            groupCollapsed: z({}, O, {
              value: N
            }),
            groupEnd: z({}, O, {
              value: W
            })
          });
        }
        G < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var B = v.ReactCurrentDispatcher, Q;
    function Y(O, j, ee) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (de) {
            var ae = de.stack.trim().match(/\n( *(at )?)/);
            Q = ae && ae[1] || "";
          }
        return `
` + Q + O;
      }
    }
    var oe = !1, ie;
    {
      var ce = typeof WeakMap == "function" ? WeakMap : Map;
      ie = new ce();
    }
    function q(O, j) {
      if (!O || oe)
        return "";
      {
        var ee = ie.get(O);
        if (ee !== void 0)
          return ee;
      }
      var ae;
      oe = !0;
      var de = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ve;
      ve = B.current, B.current = null, T();
      try {
        if (j) {
          var we = function() {
            throw Error();
          };
          if (Object.defineProperty(we.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(we, []);
            } catch (Mt) {
              ae = Mt;
            }
            Reflect.construct(O, [], we);
          } else {
            try {
              we.call();
            } catch (Mt) {
              ae = Mt;
            }
            O.call(we.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Mt) {
            ae = Mt;
          }
          O();
        }
      } catch (Mt) {
        if (Mt && ae && typeof Mt.stack == "string") {
          for (var me = Mt.stack.split(`
`), Ce = ae.stack.split(`
`), Me = me.length - 1, _e = Ce.length - 1; Me >= 1 && _e >= 0 && me[Me] !== Ce[_e]; )
            _e--;
          for (; Me >= 1 && _e >= 0; Me--, _e--)
            if (me[Me] !== Ce[_e]) {
              if (Me !== 1 || _e !== 1)
                do
                  if (Me--, _e--, _e < 0 || me[Me] !== Ce[_e]) {
                    var Ye = `
` + me[Me].replace(" at new ", " at ");
                    return O.displayName && Ye.includes("<anonymous>") && (Ye = Ye.replace("<anonymous>", O.displayName)), typeof O == "function" && ie.set(O, Ye), Ye;
                  }
                while (Me >= 1 && _e >= 0);
              break;
            }
        }
      } finally {
        oe = !1, B.current = ve, R(), Error.prepareStackTrace = de;
      }
      var mt = O ? O.displayName || O.name : "", ht = mt ? Y(mt) : "";
      return typeof O == "function" && ie.set(O, ht), ht;
    }
    function pe(O, j, ee) {
      return q(O, !1);
    }
    function te(O) {
      var j = O.prototype;
      return !!(j && j.isReactComponent);
    }
    function fe(O, j, ee) {
      if (O == null)
        return "";
      if (typeof O == "function")
        return q(O, te(O));
      if (typeof O == "string")
        return Y(O);
      switch (O) {
        case u:
          return Y("Suspense");
        case d:
          return Y("SuspenseList");
      }
      if (typeof O == "object")
        switch (O.$$typeof) {
          case c:
            return pe(O.render);
          case p:
            return fe(O.type, j, ee);
          case f: {
            var ae = O, de = ae._payload, ve = ae._init;
            try {
              return fe(ve(de), j, ee);
            } catch {
            }
          }
        }
      return "";
    }
    var Pe = Object.prototype.hasOwnProperty, je = {}, Ve = v.ReactDebugCurrentFrame;
    function st(O) {
      if (O) {
        var j = O._owner, ee = fe(O.type, O._source, j ? j.type : null);
        Ve.setExtraStackFrame(ee);
      } else
        Ve.setExtraStackFrame(null);
    }
    function ke(O, j, ee, ae, de) {
      {
        var ve = Function.call.bind(Pe);
        for (var we in O)
          if (ve(O, we)) {
            var me = void 0;
            try {
              if (typeof O[we] != "function") {
                var Ce = Error((ae || "React class") + ": " + ee + " type `" + we + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof O[we] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ce.name = "Invariant Violation", Ce;
              }
              me = O[we](j, we, ae, ee, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Me) {
              me = Me;
            }
            me && !(me instanceof Error) && (st(de), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ae || "React class", ee, we, typeof me), st(null)), me instanceof Error && !(me.message in je) && (je[me.message] = !0, st(de), $("Failed %s type: %s", ee, me.message), st(null));
          }
      }
    }
    var De = Array.isArray;
    function Qe(O) {
      return De(O);
    }
    function Ge(O) {
      {
        var j = typeof Symbol == "function" && Symbol.toStringTag, ee = j && O[Symbol.toStringTag] || O.constructor.name || "Object";
        return ee;
      }
    }
    function Ue(O) {
      try {
        return le(O), !1;
      } catch {
        return !0;
      }
    }
    function le(O) {
      return "" + O;
    }
    function ye(O) {
      if (Ue(O))
        return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(O)), le(O);
    }
    var be = v.ReactCurrentOwner, ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ue, We, Ne;
    Ne = {};
    function Xe(O) {
      if (Pe.call(O, "ref")) {
        var j = Object.getOwnPropertyDescriptor(O, "ref").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return O.ref !== void 0;
    }
    function Je(O) {
      if (Pe.call(O, "key")) {
        var j = Object.getOwnPropertyDescriptor(O, "key").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return O.key !== void 0;
    }
    function Ot(O, j) {
      if (typeof O.ref == "string" && be.current && j && be.current.stateNode !== j) {
        var ee = K(be.current.type);
        Ne[ee] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', K(be.current.type), O.ref), Ne[ee] = !0);
      }
    }
    function re(O, j) {
      {
        var ee = function() {
          ue || (ue = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        ee.isReactWarning = !0, Object.defineProperty(O, "key", {
          get: ee,
          configurable: !0
        });
      }
    }
    function se(O, j) {
      {
        var ee = function() {
          We || (We = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        ee.isReactWarning = !0, Object.defineProperty(O, "ref", {
          get: ee,
          configurable: !0
        });
      }
    }
    var $e = function(O, j, ee, ae, de, ve, we) {
      var me = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: O,
        key: j,
        ref: ee,
        props: we,
        // Record the component responsible for creating this element.
        _owner: ve
      };
      return me._store = {}, Object.defineProperty(me._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(me, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ae
      }), Object.defineProperty(me, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: de
      }), Object.freeze && (Object.freeze(me.props), Object.freeze(me)), me;
    };
    function Ae(O, j, ee, ae, de) {
      {
        var ve, we = {}, me = null, Ce = null;
        ee !== void 0 && (ye(ee), me = "" + ee), Je(j) && (ye(j.key), me = "" + j.key), Xe(j) && (Ce = j.ref, Ot(j, de));
        for (ve in j)
          Pe.call(j, ve) && !ge.hasOwnProperty(ve) && (we[ve] = j[ve]);
        if (O && O.defaultProps) {
          var Me = O.defaultProps;
          for (ve in Me)
            we[ve] === void 0 && (we[ve] = Me[ve]);
        }
        if (me || Ce) {
          var _e = typeof O == "function" ? O.displayName || O.name || "Unknown" : O;
          me && re(we, _e), Ce && se(we, _e);
        }
        return $e(O, me, Ce, de, ae, be.current, we);
      }
    }
    var et = v.ReactCurrentOwner, St = v.ReactDebugCurrentFrame;
    function _t(O) {
      if (O) {
        var j = O._owner, ee = fe(O.type, O._source, j ? j.type : null);
        St.setExtraStackFrame(ee);
      } else
        St.setExtraStackFrame(null);
    }
    var Yt;
    Yt = !1;
    function kt(O) {
      return typeof O == "object" && O !== null && O.$$typeof === t;
    }
    function Ut() {
      {
        if (et.current) {
          var O = K(et.current.type);
          if (O)
            return `

Check the render method of \`` + O + "`.";
        }
        return "";
      }
    }
    function wn(O) {
      {
        if (O !== void 0) {
          var j = O.fileName.replace(/^.*[\\\/]/, ""), ee = O.lineNumber;
          return `

Check your code at ` + j + ":" + ee + ".";
        }
        return "";
      }
    }
    var Tn = {};
    function On(O) {
      {
        var j = Ut();
        if (!j) {
          var ee = typeof O == "string" ? O : O.displayName || O.name;
          ee && (j = `

Check the top-level render call using <` + ee + ">.");
        }
        return j;
      }
    }
    function Rr(O, j) {
      {
        if (!O._store || O._store.validated || O.key != null)
          return;
        O._store.validated = !0;
        var ee = On(j);
        if (Tn[ee])
          return;
        Tn[ee] = !0;
        var ae = "";
        O && O._owner && O._owner !== et.current && (ae = " It was passed a child from " + K(O._owner.type) + "."), _t(O), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ee, ae), _t(null);
      }
    }
    function Wr(O, j) {
      {
        if (typeof O != "object")
          return;
        if (Qe(O))
          for (var ee = 0; ee < O.length; ee++) {
            var ae = O[ee];
            kt(ae) && Rr(ae, j);
          }
        else if (kt(O))
          O._store && (O._store.validated = !0);
        else if (O) {
          var de = y(O);
          if (typeof de == "function" && de !== O.entries)
            for (var ve = de.call(O), we; !(we = ve.next()).done; )
              kt(we.value) && Rr(we.value, j);
        }
      }
    }
    function ci(O) {
      {
        var j = O.type;
        if (j == null || typeof j == "string")
          return;
        var ee;
        if (typeof j == "function")
          ee = j.propTypes;
        else if (typeof j == "object" && (j.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        j.$$typeof === p))
          ee = j.propTypes;
        else
          return;
        if (ee) {
          var ae = K(j);
          ke(ee, O.props, "prop", ae, O);
        } else if (j.PropTypes !== void 0 && !Yt) {
          Yt = !0;
          var de = K(j);
          $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", de || "Unknown");
        }
        typeof j.getDefaultProps == "function" && !j.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ro(O) {
      {
        for (var j = Object.keys(O.props), ee = 0; ee < j.length; ee++) {
          var ae = j[ee];
          if (ae !== "children" && ae !== "key") {
            _t(O), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ae), _t(null);
            break;
          }
        }
        O.ref !== null && (_t(O), $("Invalid attribute `ref` supplied to `React.Fragment`."), _t(null));
      }
    }
    function no(O, j, ee, ae, de, ve) {
      {
        var we = k(O);
        if (!we) {
          var me = "";
          (O === void 0 || typeof O == "object" && O !== null && Object.keys(O).length === 0) && (me += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ce = wn(de);
          Ce ? me += Ce : me += Ut();
          var Me;
          O === null ? Me = "null" : Qe(O) ? Me = "array" : O !== void 0 && O.$$typeof === t ? (Me = "<" + (K(O.type) || "Unknown") + " />", me = " Did you accidentally export a JSX literal instead of a component?") : Me = typeof O, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Me, me);
        }
        var _e = Ae(O, j, ee, de, ve);
        if (_e == null)
          return _e;
        if (we) {
          var Ye = j.children;
          if (Ye !== void 0)
            if (ae)
              if (Qe(Ye)) {
                for (var mt = 0; mt < Ye.length; mt++)
                  Wr(Ye[mt], O);
                Object.freeze && Object.freeze(Ye);
              } else
                $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Wr(Ye, O);
        }
        return O === n ? ro(_e) : ci(_e), _e;
      }
    }
    function oo(O, j, ee) {
      return no(O, j, ee, !0);
    }
    function L(O, j, ee) {
      return no(O, j, ee, !1);
    }
    var I = L, V = oo;
    pi.Fragment = n, pi.jsx = I, pi.jsxs = V;
  }()), pi;
}
process.env.NODE_ENV === "production" ? Ac.exports = H$() : Ac.exports = G$();
var _ = Ac.exports;
function Zr(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || t(...n);
  };
}
function C() {
  return C = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, C.apply(this, arguments);
}
function Hr(e) {
  return e !== null && typeof e == "object" && e.constructor === Object;
}
function Sy(e) {
  if (!Hr(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = Sy(e[r]);
  }), t;
}
function Ht(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? C({}, e) : e;
  return Hr(e) && Hr(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Hr(t[o]) && o in e && Hr(e[o]) ? n[o] = Ht(e[o], t[o], r) : r.clone ? n[o] = Hr(t[o]) ? Sy(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var jc = { exports: {} }, Ps = { exports: {} }, at = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wf;
function Y$() {
  if (Wf)
    return at;
  Wf = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, y = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function E(b) {
    if (typeof b == "object" && b !== null) {
      var x = b.$$typeof;
      switch (x) {
        case t:
          switch (b = b.type, b) {
            case c:
            case u:
            case n:
            case i:
            case o:
            case p:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case d:
                case h:
                case m:
                case a:
                  return b;
                default:
                  return x;
              }
          }
        case r:
          return x;
      }
    }
  }
  function S(b) {
    return E(b) === u;
  }
  return at.AsyncMode = c, at.ConcurrentMode = u, at.ContextConsumer = l, at.ContextProvider = a, at.Element = t, at.ForwardRef = d, at.Fragment = n, at.Lazy = h, at.Memo = m, at.Portal = r, at.Profiler = i, at.StrictMode = o, at.Suspense = p, at.isAsyncMode = function(b) {
    return S(b) || E(b) === c;
  }, at.isConcurrentMode = S, at.isContextConsumer = function(b) {
    return E(b) === l;
  }, at.isContextProvider = function(b) {
    return E(b) === a;
  }, at.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, at.isForwardRef = function(b) {
    return E(b) === d;
  }, at.isFragment = function(b) {
    return E(b) === n;
  }, at.isLazy = function(b) {
    return E(b) === h;
  }, at.isMemo = function(b) {
    return E(b) === m;
  }, at.isPortal = function(b) {
    return E(b) === r;
  }, at.isProfiler = function(b) {
    return E(b) === i;
  }, at.isStrictMode = function(b) {
    return E(b) === o;
  }, at.isSuspense = function(b) {
    return E(b) === p;
  }, at.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === u || b === i || b === o || b === p || b === f || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === m || b.$$typeof === a || b.$$typeof === l || b.$$typeof === d || b.$$typeof === y || b.$$typeof === v || b.$$typeof === $ || b.$$typeof === g);
  }, at.typeOf = E, at;
}
var lt = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qf;
function X$() {
  return qf || (qf = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, y = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function E(q) {
      return typeof q == "string" || typeof q == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      q === n || q === u || q === i || q === o || q === p || q === f || typeof q == "object" && q !== null && (q.$$typeof === h || q.$$typeof === m || q.$$typeof === a || q.$$typeof === l || q.$$typeof === d || q.$$typeof === y || q.$$typeof === v || q.$$typeof === $ || q.$$typeof === g);
    }
    function S(q) {
      if (typeof q == "object" && q !== null) {
        var pe = q.$$typeof;
        switch (pe) {
          case t:
            var te = q.type;
            switch (te) {
              case c:
              case u:
              case n:
              case i:
              case o:
              case p:
                return te;
              default:
                var fe = te && te.$$typeof;
                switch (fe) {
                  case l:
                  case d:
                  case h:
                  case m:
                  case a:
                    return fe;
                  default:
                    return pe;
                }
            }
          case r:
            return pe;
        }
      }
    }
    var b = c, x = u, w = l, A = a, M = t, k = d, H = n, U = h, K = m, z = r, G = i, X = o, J = p, Z = !1;
    function ne(q) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), D(q) || S(q) === c;
    }
    function D(q) {
      return S(q) === u;
    }
    function N(q) {
      return S(q) === l;
    }
    function W(q) {
      return S(q) === a;
    }
    function F(q) {
      return typeof q == "object" && q !== null && q.$$typeof === t;
    }
    function T(q) {
      return S(q) === d;
    }
    function R(q) {
      return S(q) === n;
    }
    function B(q) {
      return S(q) === h;
    }
    function Q(q) {
      return S(q) === m;
    }
    function Y(q) {
      return S(q) === r;
    }
    function oe(q) {
      return S(q) === i;
    }
    function ie(q) {
      return S(q) === o;
    }
    function ce(q) {
      return S(q) === p;
    }
    lt.AsyncMode = b, lt.ConcurrentMode = x, lt.ContextConsumer = w, lt.ContextProvider = A, lt.Element = M, lt.ForwardRef = k, lt.Fragment = H, lt.Lazy = U, lt.Memo = K, lt.Portal = z, lt.Profiler = G, lt.StrictMode = X, lt.Suspense = J, lt.isAsyncMode = ne, lt.isConcurrentMode = D, lt.isContextConsumer = N, lt.isContextProvider = W, lt.isElement = F, lt.isForwardRef = T, lt.isFragment = R, lt.isLazy = B, lt.isMemo = Q, lt.isPortal = Y, lt.isProfiler = oe, lt.isStrictMode = ie, lt.isSuspense = ce, lt.isValidElementType = E, lt.typeOf = S;
  }()), lt;
}
var Kf;
function Ey() {
  return Kf || (Kf = 1, process.env.NODE_ENV === "production" ? Ps.exports = Y$() : Ps.exports = X$()), Ps.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Yl, Hf;
function J$() {
  if (Hf)
    return Yl;
  Hf = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var a = {}, l = 0; l < 10; l++)
        a["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(a).map(function(d) {
        return a[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Yl = o() ? Object.assign : function(i, a) {
    for (var l, c = n(i), u, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var p in l)
        t.call(l, p) && (c[p] = l[p]);
      if (e) {
        u = e(l);
        for (var f = 0; f < u.length; f++)
          r.call(l, u[f]) && (c[u[f]] = l[u[f]]);
      }
    }
    return c;
  }, Yl;
}
var Xl, Gf;
function gu() {
  if (Gf)
    return Xl;
  Gf = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Xl = e, Xl;
}
var Jl, Yf;
function _y() {
  return Yf || (Yf = 1, Jl = Function.call.bind(Object.prototype.hasOwnProperty)), Jl;
}
var Zl, Xf;
function Z$() {
  if (Xf)
    return Zl;
  Xf = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = gu(), r = {}, n = _y();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, l, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (n(i, d)) {
          var p;
          try {
            if (typeof i[d] != "function") {
              var f = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            p = i[d](a, d, c, l, null, t);
          } catch (h) {
            p = h;
          }
          if (p && !(p instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var m = u ? u() : "";
            e(
              "Failed " + l + " type: " + p.message + (m ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Zl = o, Zl;
}
var Ql, Jf;
function Q$() {
  if (Jf)
    return Ql;
  Jf = 1;
  var e = Ey(), t = J$(), r = gu(), n = _y(), o = Z$(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return Ql = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function p(D) {
      var N = D && (u && D[u] || D[d]);
      if (typeof N == "function")
        return N;
    }
    var f = "<<anonymous>>", m = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: $(),
      arrayOf: E,
      element: S(),
      elementType: b(),
      instanceOf: x,
      node: k(),
      objectOf: A,
      oneOf: w,
      oneOfType: M,
      shape: U,
      exact: K
    };
    function h(D, N) {
      return D === N ? D !== 0 || 1 / D === 1 / N : D !== D && N !== N;
    }
    function g(D, N) {
      this.message = D, this.data = N && typeof N == "object" ? N : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function y(D) {
      if (process.env.NODE_ENV !== "production")
        var N = {}, W = 0;
      function F(R, B, Q, Y, oe, ie, ce) {
        if (Y = Y || f, ie = ie || Q, ce !== r) {
          if (c) {
            var q = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw q.name = "Invariant Violation", q;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var pe = Y + ":" + Q;
            !N[pe] && // Avoid spamming the console because they are often not actionable except for lib authors
            W < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + ie + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), N[pe] = !0, W++);
          }
        }
        return B[Q] == null ? R ? B[Q] === null ? new g("The " + oe + " `" + ie + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new g("The " + oe + " `" + ie + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : D(B, Q, Y, oe, ie);
      }
      var T = F.bind(null, !1);
      return T.isRequired = F.bind(null, !0), T;
    }
    function v(D) {
      function N(W, F, T, R, B, Q) {
        var Y = W[F], oe = X(Y);
        if (oe !== D) {
          var ie = J(Y);
          return new g(
            "Invalid " + R + " `" + B + "` of type " + ("`" + ie + "` supplied to `" + T + "`, expected ") + ("`" + D + "`."),
            { expectedType: D }
          );
        }
        return null;
      }
      return y(N);
    }
    function $() {
      return y(a);
    }
    function E(D) {
      function N(W, F, T, R, B) {
        if (typeof D != "function")
          return new g("Property `" + B + "` of component `" + T + "` has invalid PropType notation inside arrayOf.");
        var Q = W[F];
        if (!Array.isArray(Q)) {
          var Y = X(Q);
          return new g("Invalid " + R + " `" + B + "` of type " + ("`" + Y + "` supplied to `" + T + "`, expected an array."));
        }
        for (var oe = 0; oe < Q.length; oe++) {
          var ie = D(Q, oe, T, R, B + "[" + oe + "]", r);
          if (ie instanceof Error)
            return ie;
        }
        return null;
      }
      return y(N);
    }
    function S() {
      function D(N, W, F, T, R) {
        var B = N[W];
        if (!l(B)) {
          var Q = X(B);
          return new g("Invalid " + T + " `" + R + "` of type " + ("`" + Q + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return y(D);
    }
    function b() {
      function D(N, W, F, T, R) {
        var B = N[W];
        if (!e.isValidElementType(B)) {
          var Q = X(B);
          return new g("Invalid " + T + " `" + R + "` of type " + ("`" + Q + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return y(D);
    }
    function x(D) {
      function N(W, F, T, R, B) {
        if (!(W[F] instanceof D)) {
          var Q = D.name || f, Y = ne(W[F]);
          return new g("Invalid " + R + " `" + B + "` of type " + ("`" + Y + "` supplied to `" + T + "`, expected ") + ("instance of `" + Q + "`."));
        }
        return null;
      }
      return y(N);
    }
    function w(D) {
      if (!Array.isArray(D))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function N(W, F, T, R, B) {
        for (var Q = W[F], Y = 0; Y < D.length; Y++)
          if (h(Q, D[Y]))
            return null;
        var oe = JSON.stringify(D, function(ce, q) {
          var pe = J(q);
          return pe === "symbol" ? String(q) : q;
        });
        return new g("Invalid " + R + " `" + B + "` of value `" + String(Q) + "` " + ("supplied to `" + T + "`, expected one of " + oe + "."));
      }
      return y(N);
    }
    function A(D) {
      function N(W, F, T, R, B) {
        if (typeof D != "function")
          return new g("Property `" + B + "` of component `" + T + "` has invalid PropType notation inside objectOf.");
        var Q = W[F], Y = X(Q);
        if (Y !== "object")
          return new g("Invalid " + R + " `" + B + "` of type " + ("`" + Y + "` supplied to `" + T + "`, expected an object."));
        for (var oe in Q)
          if (n(Q, oe)) {
            var ie = D(Q, oe, T, R, B + "." + oe, r);
            if (ie instanceof Error)
              return ie;
          }
        return null;
      }
      return y(N);
    }
    function M(D) {
      if (!Array.isArray(D))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var N = 0; N < D.length; N++) {
        var W = D[N];
        if (typeof W != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(W) + " at index " + N + "."
          ), a;
      }
      function F(T, R, B, Q, Y) {
        for (var oe = [], ie = 0; ie < D.length; ie++) {
          var ce = D[ie], q = ce(T, R, B, Q, Y, r);
          if (q == null)
            return null;
          q.data && n(q.data, "expectedType") && oe.push(q.data.expectedType);
        }
        var pe = oe.length > 0 ? ", expected one of type [" + oe.join(", ") + "]" : "";
        return new g("Invalid " + Q + " `" + Y + "` supplied to " + ("`" + B + "`" + pe + "."));
      }
      return y(F);
    }
    function k() {
      function D(N, W, F, T, R) {
        return z(N[W]) ? null : new g("Invalid " + T + " `" + R + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return y(D);
    }
    function H(D, N, W, F, T) {
      return new g(
        (D || "React class") + ": " + N + " type `" + W + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + T + "`."
      );
    }
    function U(D) {
      function N(W, F, T, R, B) {
        var Q = W[F], Y = X(Q);
        if (Y !== "object")
          return new g("Invalid " + R + " `" + B + "` of type `" + Y + "` " + ("supplied to `" + T + "`, expected `object`."));
        for (var oe in D) {
          var ie = D[oe];
          if (typeof ie != "function")
            return H(T, R, B, oe, J(ie));
          var ce = ie(Q, oe, T, R, B + "." + oe, r);
          if (ce)
            return ce;
        }
        return null;
      }
      return y(N);
    }
    function K(D) {
      function N(W, F, T, R, B) {
        var Q = W[F], Y = X(Q);
        if (Y !== "object")
          return new g("Invalid " + R + " `" + B + "` of type `" + Y + "` " + ("supplied to `" + T + "`, expected `object`."));
        var oe = t({}, W[F], D);
        for (var ie in oe) {
          var ce = D[ie];
          if (n(D, ie) && typeof ce != "function")
            return H(T, R, B, ie, J(ce));
          if (!ce)
            return new g(
              "Invalid " + R + " `" + B + "` key `" + ie + "` supplied to `" + T + "`.\nBad object: " + JSON.stringify(W[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(D), null, "  ")
            );
          var q = ce(Q, ie, T, R, B + "." + ie, r);
          if (q)
            return q;
        }
        return null;
      }
      return y(N);
    }
    function z(D) {
      switch (typeof D) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !D;
        case "object":
          if (Array.isArray(D))
            return D.every(z);
          if (D === null || l(D))
            return !0;
          var N = p(D);
          if (N) {
            var W = N.call(D), F;
            if (N !== D.entries) {
              for (; !(F = W.next()).done; )
                if (!z(F.value))
                  return !1;
            } else
              for (; !(F = W.next()).done; ) {
                var T = F.value;
                if (T && !z(T[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function G(D, N) {
      return D === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && N instanceof Symbol : !1;
    }
    function X(D) {
      var N = typeof D;
      return Array.isArray(D) ? "array" : D instanceof RegExp ? "object" : G(N, D) ? "symbol" : N;
    }
    function J(D) {
      if (typeof D > "u" || D === null)
        return "" + D;
      var N = X(D);
      if (N === "object") {
        if (D instanceof Date)
          return "date";
        if (D instanceof RegExp)
          return "regexp";
      }
      return N;
    }
    function Z(D) {
      var N = J(D);
      switch (N) {
        case "array":
        case "object":
          return "an " + N;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + N;
        default:
          return N;
      }
    }
    function ne(D) {
      return !D.constructor || !D.constructor.name ? f : D.constructor.name;
    }
    return m.checkPropTypes = o, m.resetWarningCache = o.resetWarningCache, m.PropTypes = m, m;
  }, Ql;
}
var ec, Zf;
function e1() {
  if (Zf)
    return ec;
  Zf = 1;
  var e = gu();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, ec = function() {
    function n(a, l, c, u, d, p) {
      if (p !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, ec;
}
if (process.env.NODE_ENV !== "production") {
  var t1 = Ey(), r1 = !0;
  jc.exports = Q$()(t1.isElement, r1);
} else
  jc.exports = e1()();
var n1 = jc.exports;
const s = /* @__PURE__ */ pt(n1);
function o1(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function xy(e, t, r, n, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !o1(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${a}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const wy = Zr(s.element, xy);
wy.isRequired = Zr(s.element.isRequired, xy);
const za = wy;
function i1(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function s1(e, t, r, n, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !i1(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${a}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ua = Zr(s.elementType, s1), a1 = "exact-prop: ​";
function Ty(e) {
  return process.env.NODE_ENV === "production" ? e : C({}, e, {
    [a1]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function vn(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var kc = { exports: {} }, ct = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qf;
function l1() {
  if (Qf)
    return ct;
  Qf = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function g(y) {
    if (typeof y == "object" && y !== null) {
      var v = y.$$typeof;
      switch (v) {
        case e:
          switch (y = y.type, y) {
            case r:
            case o:
            case n:
            case u:
            case d:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case l:
                case a:
                case c:
                case f:
                case p:
                case i:
                  return y;
                default:
                  return v;
              }
          }
        case t:
          return v;
      }
    }
  }
  return ct.ContextConsumer = a, ct.ContextProvider = i, ct.Element = e, ct.ForwardRef = c, ct.Fragment = r, ct.Lazy = f, ct.Memo = p, ct.Portal = t, ct.Profiler = o, ct.StrictMode = n, ct.Suspense = u, ct.SuspenseList = d, ct.isAsyncMode = function() {
    return !1;
  }, ct.isConcurrentMode = function() {
    return !1;
  }, ct.isContextConsumer = function(y) {
    return g(y) === a;
  }, ct.isContextProvider = function(y) {
    return g(y) === i;
  }, ct.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === e;
  }, ct.isForwardRef = function(y) {
    return g(y) === c;
  }, ct.isFragment = function(y) {
    return g(y) === r;
  }, ct.isLazy = function(y) {
    return g(y) === f;
  }, ct.isMemo = function(y) {
    return g(y) === p;
  }, ct.isPortal = function(y) {
    return g(y) === t;
  }, ct.isProfiler = function(y) {
    return g(y) === o;
  }, ct.isStrictMode = function(y) {
    return g(y) === n;
  }, ct.isSuspense = function(y) {
    return g(y) === u;
  }, ct.isSuspenseList = function(y) {
    return g(y) === d;
  }, ct.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === r || y === o || y === n || y === u || y === d || y === m || typeof y == "object" && y !== null && (y.$$typeof === f || y.$$typeof === p || y.$$typeof === i || y.$$typeof === a || y.$$typeof === c || y.$$typeof === h || y.getModuleId !== void 0);
  }, ct.typeOf = g, ct;
}
var ut = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ep;
function c1() {
  return ep || (ep = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), h = !1, g = !1, y = !1, v = !1, $ = !1, E;
    E = Symbol.for("react.module.reference");
    function S(te) {
      return !!(typeof te == "string" || typeof te == "function" || te === r || te === o || $ || te === n || te === u || te === d || v || te === m || h || g || y || typeof te == "object" && te !== null && (te.$$typeof === f || te.$$typeof === p || te.$$typeof === i || te.$$typeof === a || te.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      te.$$typeof === E || te.getModuleId !== void 0));
    }
    function b(te) {
      if (typeof te == "object" && te !== null) {
        var fe = te.$$typeof;
        switch (fe) {
          case e:
            var Pe = te.type;
            switch (Pe) {
              case r:
              case o:
              case n:
              case u:
              case d:
                return Pe;
              default:
                var je = Pe && Pe.$$typeof;
                switch (je) {
                  case l:
                  case a:
                  case c:
                  case f:
                  case p:
                  case i:
                    return je;
                  default:
                    return fe;
                }
            }
          case t:
            return fe;
        }
      }
    }
    var x = a, w = i, A = e, M = c, k = r, H = f, U = p, K = t, z = o, G = n, X = u, J = d, Z = !1, ne = !1;
    function D(te) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function N(te) {
      return ne || (ne = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(te) {
      return b(te) === a;
    }
    function F(te) {
      return b(te) === i;
    }
    function T(te) {
      return typeof te == "object" && te !== null && te.$$typeof === e;
    }
    function R(te) {
      return b(te) === c;
    }
    function B(te) {
      return b(te) === r;
    }
    function Q(te) {
      return b(te) === f;
    }
    function Y(te) {
      return b(te) === p;
    }
    function oe(te) {
      return b(te) === t;
    }
    function ie(te) {
      return b(te) === o;
    }
    function ce(te) {
      return b(te) === n;
    }
    function q(te) {
      return b(te) === u;
    }
    function pe(te) {
      return b(te) === d;
    }
    ut.ContextConsumer = x, ut.ContextProvider = w, ut.Element = A, ut.ForwardRef = M, ut.Fragment = k, ut.Lazy = H, ut.Memo = U, ut.Portal = K, ut.Profiler = z, ut.StrictMode = G, ut.Suspense = X, ut.SuspenseList = J, ut.isAsyncMode = D, ut.isConcurrentMode = N, ut.isContextConsumer = W, ut.isContextProvider = F, ut.isElement = T, ut.isForwardRef = R, ut.isFragment = B, ut.isLazy = Q, ut.isMemo = Y, ut.isPortal = oe, ut.isProfiler = ie, ut.isStrictMode = ce, ut.isSuspense = q, ut.isSuspenseList = pe, ut.isValidElementType = S, ut.typeOf = b;
  }()), ut;
}
process.env.NODE_ENV === "production" ? kc.exports = l1() : kc.exports = c1();
var Un = kc.exports;
const tp = /* @__PURE__ */ pt(Un), u1 = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function d1(e) {
  const t = `${e}`.match(u1);
  return t && t[1] || "";
}
function Oy(e, t = "") {
  return e.displayName || e.name || d1(e) || t;
}
function rp(e, t, r) {
  const n = Oy(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function f1(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Oy(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Un.ForwardRef:
          return rp(e, e.render, "ForwardRef");
        case Un.Memo:
          return rp(e, e.type, "memo");
        default:
          return;
      }
  }
}
function qi(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${n} \`${a}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const p1 = s.oneOfType([s.func, s.object]), rr = p1;
function xe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : vn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function da(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function is(e, t = 166) {
  let r;
  function n(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(r), r = setTimeout(i, t);
  }
  return n.clear = () => {
    clearTimeout(r);
  }, n;
}
function m1(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, i, a) => {
    const l = o || "<<anonymous>>", c = a || n;
    return typeof r[n] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Eo(e, t) {
  var r, n;
  return /* @__PURE__ */ P.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (r = e.type.muiName) != null ? r : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function jt(e) {
  return e && e.ownerDocument || document;
}
function Br(e) {
  return jt(e).defaultView || window;
}
function Cy(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? C({}, t.propTypes) : null;
  return (o) => (i, a, l, c, u, ...d) => {
    const p = u || a, f = r == null ? void 0 : r[p];
    if (f) {
      const m = f(i, a, l, c, u, ...d);
      if (m)
        return m;
    }
    return typeof i[a] < "u" && !i[o] ? new Error(`The prop \`${p}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function fa(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const h1 = typeof window < "u" ? P.useLayoutEffect : P.useEffect, gr = h1;
let np = 0;
function y1(e) {
  const [t, r] = P.useState(e), n = e || t;
  return P.useEffect(() => {
    t == null && (np += 1, r(`mui-${np}`));
  }, [t]), n;
}
const op = P["useId".toString()];
function Ki(e) {
  if (op !== void 0) {
    const t = op();
    return e ?? t;
  }
  return y1(e);
}
function Py(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Po({
  controlled: e,
  default: t,
  name: r,
  state: n = "value"
}) {
  const {
    current: o
  } = P.useRef(e !== void 0), [i, a] = P.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    P.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${r} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, r, e]);
    const {
      current: u
    } = P.useRef(t);
    P.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = P.useCallback((u) => {
    o || a(u);
  }, []);
  return [l, c];
}
function sr(e) {
  const t = P.useRef(e);
  return gr(() => {
    t.current = e;
  }), P.useRef((...r) => (
    // @ts-expect-error hide `this`
    // tslint:disable-next-line:ban-comma-operator
    (0, t.current)(...r)
  )).current;
}
function Nt(...e) {
  return P.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      fa(r, t);
    });
  }, e);
}
let Wa = !0, Mc = !1, ip;
const g1 = {
  text: !0,
  search: !0,
  url: !0,
  tel: !0,
  email: !0,
  password: !0,
  number: !0,
  date: !0,
  month: !0,
  week: !0,
  time: !0,
  datetime: !0,
  "datetime-local": !0
};
function v1(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && g1[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function b1(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Wa = !0);
}
function tc() {
  Wa = !1;
}
function $1() {
  this.visibilityState === "hidden" && Mc && (Wa = !0);
}
function S1(e) {
  e.addEventListener("keydown", b1, !0), e.addEventListener("mousedown", tc, !0), e.addEventListener("pointerdown", tc, !0), e.addEventListener("touchstart", tc, !0), e.addEventListener("visibilitychange", $1, !0);
}
function E1(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Wa || v1(t);
}
function vu() {
  const e = P.useCallback((o) => {
    o != null && S1(o.ownerDocument);
  }, []), t = P.useRef(!1);
  function r() {
    return t.current ? (Mc = !0, window.clearTimeout(ip), ip = window.setTimeout(() => {
      Mc = !1;
    }, 100), t.current = !1, !0) : !1;
  }
  function n(o) {
    return E1(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function Ry(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
let so;
function Iy() {
  if (so)
    return so;
  const e = document.createElement("div"), t = document.createElement("div");
  return t.style.width = "10px", t.style.height = "1px", e.appendChild(t), e.dir = "rtl", e.style.fontSize = "14px", e.style.width = "4px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.overflow = "scroll", document.body.appendChild(e), so = "reverse", e.scrollLeft > 0 ? so = "default" : (e.scrollLeft = 1, e.scrollLeft === 0 && (so = "negative")), document.body.removeChild(e), so;
}
function _1(e, t) {
  const r = e.scrollLeft;
  if (t !== "rtl")
    return r;
  switch (Iy()) {
    case "negative":
      return e.scrollWidth - e.clientWidth + r;
    case "reverse":
      return e.scrollWidth - e.clientWidth - r;
    default:
      return r;
  }
}
const x1 = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
}, w1 = x1;
function T1(e) {
  const t = typeof e;
  switch (t) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return t;
  }
}
function O1(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const C1 = Number.isInteger || O1;
function Ny(e, t, r, n) {
  const o = e[t];
  if (o == null || !C1(o)) {
    const i = T1(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${i}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function Ay(e, t, ...r) {
  return e[t] === void 0 ? null : Ny(e, t, ...r);
}
function Dc() {
  return null;
}
Ay.isRequired = Ny;
Dc.isRequired = Dc;
const jy = process.env.NODE_ENV === "production" ? Dc : Ay;
function bu(e, t) {
  const r = C({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = C({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, i = t[n];
      r[n] = {}, !i || !Object.keys(i) ? r[n] = o : !o || !Object.keys(o) ? r[n] = i : (r[n] = C({}, i), Object.keys(o).forEach((a) => {
        r[n][a] = bu(o[a], i[a]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function ze(e, t, r = void 0) {
  const n = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      n[o] = e[o].reduce((i, a) => {
        if (a) {
          const l = t(a);
          l !== "" && i.push(l), r && r[a] && i.push(r[a]);
        }
        return i;
      }, []).join(" ");
    }
  ), n;
}
const sp = (e) => e, P1 = () => {
  let e = sp;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = sp;
    }
  };
}, R1 = P1(), $u = R1, I1 = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function Fe(e, t, r = "Mui") {
  const n = I1[t];
  return n ? `${r}-${n}` : `${$u.generate(e)}-${t}`;
}
function Le(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = Fe(e, o, r);
  }), n;
}
function ky(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var N1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, A1 = /* @__PURE__ */ ky(
  function(e) {
    return N1.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
function j1(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function k1(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var M1 = /* @__PURE__ */ function() {
  function e(r) {
    var n = this;
    this._insertTag = function(o) {
      var i;
      n.tags.length === 0 ? n.insertionPoint ? i = n.insertionPoint.nextSibling : n.prepend ? i = n.container.firstChild : i = n.before : i = n.tags[n.tags.length - 1].nextSibling, n.container.insertBefore(o, i), n.tags.push(o);
    }, this.isSpeedy = r.speedy === void 0 ? process.env.NODE_ENV === "production" : r.speedy, this.tags = [], this.ctr = 0, this.nonce = r.nonce, this.key = r.key, this.container = r.container, this.prepend = r.prepend, this.insertionPoint = r.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(n) {
    n.forEach(this._insertTag);
  }, t.insert = function(n) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(k1(this));
    var o = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var i = n.charCodeAt(0) === 64 && n.charCodeAt(1) === 105;
      i && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + n + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !i;
    }
    if (this.isSpeedy) {
      var a = j1(o);
      try {
        a.insertRule(n, a.cssRules.length);
      } catch (l) {
        process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(n) && console.error('There was a problem inserting the following rule: "' + n + '"', l);
      }
    } else
      o.appendChild(document.createTextNode(n));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(n) {
      return n.parentNode && n.parentNode.removeChild(n);
    }), this.tags = [], this.ctr = 0, process.env.NODE_ENV !== "production" && (this._alreadyInsertedOrderInsensitiveRule = !1);
  }, e;
}(), qt = "-ms-", pa = "-moz-", nt = "-webkit-", Su = "comm", Eu = "rule", _u = "decl", D1 = "@import", My = "@keyframes", F1 = "@layer", L1 = Math.abs, qa = String.fromCharCode, B1 = Object.assign;
function V1(e, t) {
  return Vt(e, 0) ^ 45 ? (((t << 2 ^ Vt(e, 0)) << 2 ^ Vt(e, 1)) << 2 ^ Vt(e, 2)) << 2 ^ Vt(e, 3) : 0;
}
function Dy(e) {
  return e.trim();
}
function z1(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function ot(e, t, r) {
  return e.replace(t, r);
}
function Fc(e, t) {
  return e.indexOf(t);
}
function Vt(e, t) {
  return e.charCodeAt(t) | 0;
}
function Hi(e, t, r) {
  return e.slice(t, r);
}
function jr(e) {
  return e.length;
}
function xu(e) {
  return e.length;
}
function Rs(e, t) {
  return t.push(e), e;
}
function U1(e, t) {
  return e.map(t).join("");
}
var Ka = 1, Ro = 1, Fy = 0, er = 0, It = 0, Vo = "";
function Ha(e, t, r, n, o, i, a) {
  return { value: e, root: t, parent: r, type: n, props: o, children: i, line: Ka, column: Ro, length: a, return: "" };
}
function mi(e, t) {
  return B1(Ha("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function W1() {
  return It;
}
function q1() {
  return It = er > 0 ? Vt(Vo, --er) : 0, Ro--, It === 10 && (Ro = 1, Ka--), It;
}
function cr() {
  return It = er < Fy ? Vt(Vo, er++) : 0, Ro++, It === 10 && (Ro = 1, Ka++), It;
}
function Fr() {
  return Vt(Vo, er);
}
function Xs() {
  return er;
}
function ss(e, t) {
  return Hi(Vo, e, t);
}
function Gi(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Ly(e) {
  return Ka = Ro = 1, Fy = jr(Vo = e), er = 0, [];
}
function By(e) {
  return Vo = "", e;
}
function Js(e) {
  return Dy(ss(er - 1, Lc(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function K1(e) {
  for (; (It = Fr()) && It < 33; )
    cr();
  return Gi(e) > 2 || Gi(It) > 3 ? "" : " ";
}
function H1(e, t) {
  for (; --t && cr() && !(It < 48 || It > 102 || It > 57 && It < 65 || It > 70 && It < 97); )
    ;
  return ss(e, Xs() + (t < 6 && Fr() == 32 && cr() == 32));
}
function Lc(e) {
  for (; cr(); )
    switch (It) {
      case e:
        return er;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Lc(It);
        break;
      case 40:
        e === 41 && Lc(e);
        break;
      case 92:
        cr();
        break;
    }
  return er;
}
function G1(e, t) {
  for (; cr() && e + It !== 47 + 10; )
    if (e + It === 42 + 42 && Fr() === 47)
      break;
  return "/*" + ss(t, er - 1) + "*" + qa(e === 47 ? e : cr());
}
function Y1(e) {
  for (; !Gi(Fr()); )
    cr();
  return ss(e, er);
}
function X1(e) {
  return By(Zs("", null, null, null, [""], e = Ly(e), 0, [0], e));
}
function Zs(e, t, r, n, o, i, a, l, c) {
  for (var u = 0, d = 0, p = a, f = 0, m = 0, h = 0, g = 1, y = 1, v = 1, $ = 0, E = "", S = o, b = i, x = n, w = E; y; )
    switch (h = $, $ = cr()) {
      case 40:
        if (h != 108 && Vt(w, p - 1) == 58) {
          Fc(w += ot(Js($), "&", "&\f"), "&\f") != -1 && (v = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += Js($);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += K1(h);
        break;
      case 92:
        w += H1(Xs() - 1, 7);
        continue;
      case 47:
        switch (Fr()) {
          case 42:
          case 47:
            Rs(J1(G1(cr(), Xs()), t, r), c);
            break;
          default:
            w += "/";
        }
        break;
      case 123 * g:
        l[u++] = jr(w) * v;
      case 125 * g:
      case 59:
      case 0:
        switch ($) {
          case 0:
          case 125:
            y = 0;
          case 59 + d:
            v == -1 && (w = ot(w, /\f/g, "")), m > 0 && jr(w) - p && Rs(m > 32 ? lp(w + ";", n, r, p - 1) : lp(ot(w, " ", "") + ";", n, r, p - 2), c);
            break;
          case 59:
            w += ";";
          default:
            if (Rs(x = ap(w, t, r, u, d, o, l, E, S = [], b = [], p), i), $ === 123)
              if (d === 0)
                Zs(w, t, x, x, S, i, p, l, b);
              else
                switch (f === 99 && Vt(w, 3) === 110 ? 100 : f) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Zs(e, x, x, n && Rs(ap(e, x, x, 0, 0, o, l, E, o, S = [], p), b), o, b, p, l, n ? S : b);
                    break;
                  default:
                    Zs(w, x, x, x, [""], b, 0, l, b);
                }
        }
        u = d = m = 0, g = v = 1, E = w = "", p = a;
        break;
      case 58:
        p = 1 + jr(w), m = h;
      default:
        if (g < 1) {
          if ($ == 123)
            --g;
          else if ($ == 125 && g++ == 0 && q1() == 125)
            continue;
        }
        switch (w += qa($), $ * g) {
          case 38:
            v = d > 0 ? 1 : (w += "\f", -1);
            break;
          case 44:
            l[u++] = (jr(w) - 1) * v, v = 1;
            break;
          case 64:
            Fr() === 45 && (w += Js(cr())), f = Fr(), d = p = jr(E = w += Y1(Xs())), $++;
            break;
          case 45:
            h === 45 && jr(w) == 2 && (g = 0);
        }
    }
  return i;
}
function ap(e, t, r, n, o, i, a, l, c, u, d) {
  for (var p = o - 1, f = o === 0 ? i : [""], m = xu(f), h = 0, g = 0, y = 0; h < n; ++h)
    for (var v = 0, $ = Hi(e, p + 1, p = L1(g = a[h])), E = e; v < m; ++v)
      (E = Dy(g > 0 ? f[v] + " " + $ : ot($, /&\f/g, f[v]))) && (c[y++] = E);
  return Ha(e, t, r, o === 0 ? Eu : l, c, u, d);
}
function J1(e, t, r) {
  return Ha(e, t, r, Su, qa(W1()), Hi(e, 2, -2), 0);
}
function lp(e, t, r, n) {
  return Ha(e, t, r, _u, Hi(e, 0, n), Hi(e, n + 1, -1), n);
}
function _o(e, t) {
  for (var r = "", n = xu(e), o = 0; o < n; o++)
    r += t(e[o], o, e, t) || "";
  return r;
}
function Z1(e, t, r, n) {
  switch (e.type) {
    case F1:
      if (e.children.length)
        break;
    case D1:
    case _u:
      return e.return = e.return || e.value;
    case Su:
      return "";
    case My:
      return e.return = e.value + "{" + _o(e.children, n) + "}";
    case Eu:
      e.value = e.props.join(",");
  }
  return jr(r = _o(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Q1(e) {
  var t = xu(e);
  return function(r, n, o, i) {
    for (var a = "", l = 0; l < t; l++)
      a += e[l](r, n, o, i) || "";
    return a;
  };
}
function eS(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
var tS = function(t, r, n) {
  for (var o = 0, i = 0; o = i, i = Fr(), o === 38 && i === 12 && (r[n] = 1), !Gi(i); )
    cr();
  return ss(t, er);
}, rS = function(t, r) {
  var n = -1, o = 44;
  do
    switch (Gi(o)) {
      case 0:
        o === 38 && Fr() === 12 && (r[n] = 1), t[n] += tS(er - 1, r, n);
        break;
      case 2:
        t[n] += Js(o);
        break;
      case 4:
        if (o === 44) {
          t[++n] = Fr() === 58 ? "&\f" : "", r[n] = t[n].length;
          break;
        }
      default:
        t[n] += qa(o);
    }
  while (o = cr());
  return t;
}, nS = function(t, r) {
  return By(rS(Ly(t), r));
}, cp = /* @__PURE__ */ new WeakMap(), oS = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, n = t.parent, o = t.column === n.column && t.line === n.line; n.type !== "rule"; )
      if (n = n.parent, !n)
        return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !cp.get(n)) && !o) {
      cp.set(t, !0);
      for (var i = [], a = nS(r, i), l = n.props, c = 0, u = 0; c < a.length; c++)
        for (var d = 0; d < l.length; d++, u++)
          t.props[u] = i[c] ? a[c].replace(/&\f/g, l[d]) : l[d] + " " + a[c];
    }
  }
}, iS = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
}, sS = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", aS = function(t) {
  return t.type === "comm" && t.children.indexOf(sS) > -1;
}, lS = function(t) {
  return function(r, n, o) {
    if (!(r.type !== "rule" || t.compat)) {
      var i = r.value.match(/(:first|:nth|:nth-last)-child/g);
      if (i) {
        for (var a = !!r.parent, l = a ? r.parent.children : (
          // global rule at the root level
          o
        ), c = l.length - 1; c >= 0; c--) {
          var u = l[c];
          if (u.line < r.line)
            break;
          if (u.column < r.column) {
            if (aS(u))
              return;
            break;
          }
        }
        i.forEach(function(d) {
          console.error('The pseudo class "' + d + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + d.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, Vy = function(t) {
  return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
}, cS = function(t, r) {
  for (var n = t - 1; n >= 0; n--)
    if (!Vy(r[n]))
      return !0;
  return !1;
}, up = function(t) {
  t.type = "", t.value = "", t.return = "", t.children = "", t.props = "";
}, uS = function(t, r, n) {
  Vy(t) && (t.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), up(t)) : cS(r, n) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), up(t)));
};
function zy(e, t) {
  switch (V1(e, t)) {
    case 5103:
      return nt + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return nt + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return nt + e + pa + e + qt + e + e;
    case 6828:
    case 4268:
      return nt + e + qt + e + e;
    case 6165:
      return nt + e + qt + "flex-" + e + e;
    case 5187:
      return nt + e + ot(e, /(\w+).+(:[^]+)/, nt + "box-$1$2" + qt + "flex-$1$2") + e;
    case 5443:
      return nt + e + qt + "flex-item-" + ot(e, /flex-|-self/, "") + e;
    case 4675:
      return nt + e + qt + "flex-line-pack" + ot(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return nt + e + qt + ot(e, "shrink", "negative") + e;
    case 5292:
      return nt + e + qt + ot(e, "basis", "preferred-size") + e;
    case 6060:
      return nt + "box-" + ot(e, "-grow", "") + nt + e + qt + ot(e, "grow", "positive") + e;
    case 4554:
      return nt + ot(e, /([^-])(transform)/g, "$1" + nt + "$2") + e;
    case 6187:
      return ot(ot(ot(e, /(zoom-|grab)/, nt + "$1"), /(image-set)/, nt + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return ot(e, /(image-set\([^]*)/, nt + "$1$`$1");
    case 4968:
      return ot(ot(e, /(.+:)(flex-)?(.*)/, nt + "box-pack:$3" + qt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + nt + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return ot(e, /(.+)-inline(.+)/, nt + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (jr(e) - 1 - t > 6)
        switch (Vt(e, t + 1)) {
          case 109:
            if (Vt(e, t + 4) !== 45)
              break;
          case 102:
            return ot(e, /(.+:)(.+)-([^]+)/, "$1" + nt + "$2-$3$1" + pa + (Vt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~Fc(e, "stretch") ? zy(ot(e, "stretch", "fill-available"), t) + e : e;
        }
      break;
    case 4949:
      if (Vt(e, t + 1) !== 115)
        break;
    case 6444:
      switch (Vt(e, jr(e) - 3 - (~Fc(e, "!important") && 10))) {
        case 107:
          return ot(e, ":", ":" + nt) + e;
        case 101:
          return ot(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + nt + (Vt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + nt + "$2$3$1" + qt + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (Vt(e, t + 11)) {
        case 114:
          return nt + e + qt + ot(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return nt + e + qt + ot(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return nt + e + qt + ot(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return nt + e + qt + e + e;
  }
  return e;
}
var dS = function(t, r, n, o) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case _u:
        t.return = zy(t.value, t.length);
        break;
      case My:
        return _o([mi(t, {
          value: ot(t.value, "@", "@" + nt)
        })], o);
      case Eu:
        if (t.length)
          return U1(t.props, function(i) {
            switch (z1(i, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return _o([mi(t, {
                  props: [ot(i, /:(read-\w+)/, ":" + pa + "$1")]
                })], o);
              case "::placeholder":
                return _o([mi(t, {
                  props: [ot(i, /:(plac\w+)/, ":" + nt + "input-$1")]
                }), mi(t, {
                  props: [ot(i, /:(plac\w+)/, ":" + pa + "$1")]
                }), mi(t, {
                  props: [ot(i, /:(plac\w+)/, qt + "input-$1")]
                })], o);
            }
            return "";
          });
    }
}, fS = [dS], pS = function(t) {
  var r = t.key;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (r === "css") {
    var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n, function(g) {
      var y = g.getAttribute("data-emotion");
      y.indexOf(" ") !== -1 && (document.head.appendChild(g), g.setAttribute("data-s", ""));
    });
  }
  var o = t.stylisPlugins || fS;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(r))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + r + '" was passed');
  var i = {}, a, l = [];
  a = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(g) {
      for (var y = g.getAttribute("data-emotion").split(" "), v = 1; v < y.length; v++)
        i[y[v]] = !0;
      l.push(g);
    }
  );
  var c, u = [oS, iS];
  process.env.NODE_ENV !== "production" && u.push(lS({
    get compat() {
      return h.compat;
    }
  }), uS);
  {
    var d, p = [Z1, process.env.NODE_ENV !== "production" ? function(g) {
      g.root || (g.return ? d.insert(g.return) : g.value && g.type !== Su && d.insert(g.value + "{}"));
    } : eS(function(g) {
      d.insert(g);
    })], f = Q1(u.concat(o, p)), m = function(y) {
      return _o(X1(y), f);
    };
    c = function(y, v, $, E) {
      d = $, process.env.NODE_ENV !== "production" && v.map !== void 0 && (d = {
        insert: function(b) {
          $.insert(b + v.map);
        }
      }), m(y ? y + "{" + v.styles + "}" : v.styles), E && (h.inserted[v.name] = !0);
    };
  }
  var h = {
    key: r,
    sheet: new M1({
      key: r,
      container: a,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: i,
    registered: {},
    insert: c
  };
  return h.sheet.hydrate(l), h;
}, Bc = { exports: {} }, dt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dp;
function mS() {
  if (dp)
    return dt;
  dp = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, y = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function E(b) {
    if (typeof b == "object" && b !== null) {
      var x = b.$$typeof;
      switch (x) {
        case t:
          switch (b = b.type, b) {
            case c:
            case u:
            case n:
            case i:
            case o:
            case p:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case d:
                case h:
                case m:
                case a:
                  return b;
                default:
                  return x;
              }
          }
        case r:
          return x;
      }
    }
  }
  function S(b) {
    return E(b) === u;
  }
  return dt.AsyncMode = c, dt.ConcurrentMode = u, dt.ContextConsumer = l, dt.ContextProvider = a, dt.Element = t, dt.ForwardRef = d, dt.Fragment = n, dt.Lazy = h, dt.Memo = m, dt.Portal = r, dt.Profiler = i, dt.StrictMode = o, dt.Suspense = p, dt.isAsyncMode = function(b) {
    return S(b) || E(b) === c;
  }, dt.isConcurrentMode = S, dt.isContextConsumer = function(b) {
    return E(b) === l;
  }, dt.isContextProvider = function(b) {
    return E(b) === a;
  }, dt.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, dt.isForwardRef = function(b) {
    return E(b) === d;
  }, dt.isFragment = function(b) {
    return E(b) === n;
  }, dt.isLazy = function(b) {
    return E(b) === h;
  }, dt.isMemo = function(b) {
    return E(b) === m;
  }, dt.isPortal = function(b) {
    return E(b) === r;
  }, dt.isProfiler = function(b) {
    return E(b) === i;
  }, dt.isStrictMode = function(b) {
    return E(b) === o;
  }, dt.isSuspense = function(b) {
    return E(b) === p;
  }, dt.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === u || b === i || b === o || b === p || b === f || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === m || b.$$typeof === a || b.$$typeof === l || b.$$typeof === d || b.$$typeof === y || b.$$typeof === v || b.$$typeof === $ || b.$$typeof === g);
  }, dt.typeOf = E, dt;
}
var ft = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fp;
function hS() {
  return fp || (fp = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, y = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function E(q) {
      return typeof q == "string" || typeof q == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      q === n || q === u || q === i || q === o || q === p || q === f || typeof q == "object" && q !== null && (q.$$typeof === h || q.$$typeof === m || q.$$typeof === a || q.$$typeof === l || q.$$typeof === d || q.$$typeof === y || q.$$typeof === v || q.$$typeof === $ || q.$$typeof === g);
    }
    function S(q) {
      if (typeof q == "object" && q !== null) {
        var pe = q.$$typeof;
        switch (pe) {
          case t:
            var te = q.type;
            switch (te) {
              case c:
              case u:
              case n:
              case i:
              case o:
              case p:
                return te;
              default:
                var fe = te && te.$$typeof;
                switch (fe) {
                  case l:
                  case d:
                  case h:
                  case m:
                  case a:
                    return fe;
                  default:
                    return pe;
                }
            }
          case r:
            return pe;
        }
      }
    }
    var b = c, x = u, w = l, A = a, M = t, k = d, H = n, U = h, K = m, z = r, G = i, X = o, J = p, Z = !1;
    function ne(q) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), D(q) || S(q) === c;
    }
    function D(q) {
      return S(q) === u;
    }
    function N(q) {
      return S(q) === l;
    }
    function W(q) {
      return S(q) === a;
    }
    function F(q) {
      return typeof q == "object" && q !== null && q.$$typeof === t;
    }
    function T(q) {
      return S(q) === d;
    }
    function R(q) {
      return S(q) === n;
    }
    function B(q) {
      return S(q) === h;
    }
    function Q(q) {
      return S(q) === m;
    }
    function Y(q) {
      return S(q) === r;
    }
    function oe(q) {
      return S(q) === i;
    }
    function ie(q) {
      return S(q) === o;
    }
    function ce(q) {
      return S(q) === p;
    }
    ft.AsyncMode = b, ft.ConcurrentMode = x, ft.ContextConsumer = w, ft.ContextProvider = A, ft.Element = M, ft.ForwardRef = k, ft.Fragment = H, ft.Lazy = U, ft.Memo = K, ft.Portal = z, ft.Profiler = G, ft.StrictMode = X, ft.Suspense = J, ft.isAsyncMode = ne, ft.isConcurrentMode = D, ft.isContextConsumer = N, ft.isContextProvider = W, ft.isElement = F, ft.isForwardRef = T, ft.isFragment = R, ft.isLazy = B, ft.isMemo = Q, ft.isPortal = Y, ft.isProfiler = oe, ft.isStrictMode = ie, ft.isSuspense = ce, ft.isValidElementType = E, ft.typeOf = S;
  }()), ft;
}
process.env.NODE_ENV === "production" ? Bc.exports = mS() : Bc.exports = hS();
var yS = Bc.exports, Uy = yS, gS = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, vS = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Wy = {};
Wy[Uy.ForwardRef] = gS;
Wy[Uy.Memo] = vS;
var bS = !0;
function wu(e, t, r) {
  var n = "";
  return r.split(" ").forEach(function(o) {
    e[o] !== void 0 ? t.push(e[o] + ";") : n += o + " ";
  }), n;
}
var Ga = function(t, r, n) {
  var o = t.key + "-" + r.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (n === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  bS === !1) && t.registered[o] === void 0 && (t.registered[o] = r.styles);
}, Ya = function(t, r, n) {
  Ga(t, r, n);
  var o = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var i = r;
    do
      t.insert(r === i ? "." + o : "", i, t.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function $S(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var SS = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, pp = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, ES = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", _S = /[A-Z]|^ms/g, qy = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Tu = function(t) {
  return t.charCodeAt(1) === 45;
}, mp = function(t) {
  return t != null && typeof t != "boolean";
}, rc = /* @__PURE__ */ ky(function(e) {
  return Tu(e) ? e : e.replace(_S, "-$&").toLowerCase();
}), ma = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(qy, function(n, o, i) {
          return Er = {
            name: o,
            styles: i,
            next: Er
          }, o;
        });
  }
  return SS[t] !== 1 && !Tu(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
if (process.env.NODE_ENV !== "production") {
  var xS = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, wS = ["normal", "none", "initial", "inherit", "unset"], TS = ma, OS = /^-ms-/, CS = /-(.)/g, hp = {};
  ma = function(t, r) {
    if (t === "content" && (typeof r != "string" || wS.indexOf(r) === -1 && !xS.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + r + "\"'`");
    var n = TS(t, r);
    return n !== "" && !Tu(t) && t.indexOf("-") !== -1 && hp[t] === void 0 && (hp[t] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + t.replace(OS, "ms-").replace(CS, function(o, i) {
      return i.toUpperCase();
    }) + "?")), n;
  };
}
var Ky = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function Yi(e, t, r) {
  if (r == null)
    return "";
  if (r.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && r.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error(Ky);
    return r;
  }
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1)
        return Er = {
          name: r.name,
          styles: r.styles,
          next: Er
        }, r.name;
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0)
          for (; n !== void 0; )
            Er = {
              name: n.name,
              styles: n.styles,
              next: Er
            }, n = n.next;
        var o = r.styles + ";";
        return process.env.NODE_ENV !== "production" && r.map !== void 0 && (o += r.map), o;
      }
      return PS(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var i = Er, a = r(e);
        return Er = i, Yi(e, t, a);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var l = [], c = r.replace(qy, function(d, p, f) {
          var m = "animation" + l.length;
          return l.push("const " + m + " = keyframes`" + f.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + m + "}";
        });
        l.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(l, ["`" + c + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + c + "`"));
      }
      break;
  }
  if (t == null)
    return r;
  var u = t[r];
  return u !== void 0 ? u : r;
}
function PS(e, t, r) {
  var n = "";
  if (Array.isArray(r))
    for (var o = 0; o < r.length; o++)
      n += Yi(e, t, r[o]) + ";";
  else
    for (var i in r) {
      var a = r[i];
      if (typeof a != "object")
        t != null && t[a] !== void 0 ? n += i + "{" + t[a] + "}" : mp(a) && (n += rc(i) + ":" + ma(i, a) + ";");
      else {
        if (i === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error(Ky);
        if (Array.isArray(a) && typeof a[0] == "string" && (t == null || t[a[0]] === void 0))
          for (var l = 0; l < a.length; l++)
            mp(a[l]) && (n += rc(i) + ":" + ma(i, a[l]) + ";");
        else {
          var c = Yi(e, t, a);
          switch (i) {
            case "animation":
            case "animationName": {
              n += rc(i) + ":" + c + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && i === "undefined" && console.error(ES), n += i + "{" + c + "}";
          }
        }
      }
    }
  return n;
}
var yp = /label:\s*([^\s;\n{]+)\s*(;|$)/g, Hy;
process.env.NODE_ENV !== "production" && (Hy = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var Er, Io = function(t, r, n) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var o = !0, i = "";
  Er = void 0;
  var a = t[0];
  a == null || a.raw === void 0 ? (o = !1, i += Yi(n, r, a)) : (process.env.NODE_ENV !== "production" && a[0] === void 0 && console.error(pp), i += a[0]);
  for (var l = 1; l < t.length; l++)
    i += Yi(n, r, t[l]), o && (process.env.NODE_ENV !== "production" && a[l] === void 0 && console.error(pp), i += a[l]);
  var c;
  process.env.NODE_ENV !== "production" && (i = i.replace(Hy, function(f) {
    return c = f, "";
  })), yp.lastIndex = 0;
  for (var u = "", d; (d = yp.exec(i)) !== null; )
    u += "-" + // $FlowFixMe we know it's not null
    d[1];
  var p = $S(i) + u;
  return process.env.NODE_ENV !== "production" ? {
    name: p,
    styles: i,
    map: c,
    next: Er,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: p,
    styles: i,
    next: Er
  };
}, RS = function(t) {
  return t();
}, Gy = P["useInsertionEffect"] ? P["useInsertionEffect"] : !1, Ou = Gy || RS, gp = Gy || P.useLayoutEffect, IS = {}.hasOwnProperty, Cu = /* @__PURE__ */ P.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ pS({
    key: "css"
  }) : null
);
process.env.NODE_ENV !== "production" && (Cu.displayName = "EmotionCacheContext");
Cu.Provider;
var Xa = function(t) {
  return /* @__PURE__ */ gy(function(r, n) {
    var o = k$(Cu);
    return t(r, o, n);
  });
}, zo = /* @__PURE__ */ P.createContext({});
process.env.NODE_ENV !== "production" && (zo.displayName = "EmotionThemeContext");
var vp = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", bp = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", NS = function(t) {
  var r = t.cache, n = t.serialized, o = t.isStringTag;
  return Ga(r, n, o), Ou(function() {
    return Ya(r, n, o);
  }), null;
}, AS = /* @__PURE__ */ Xa(function(e, t, r) {
  var n = e.css;
  typeof n == "string" && t.registered[n] !== void 0 && (n = t.registered[n]);
  var o = e[vp], i = [n], a = "";
  typeof e.className == "string" ? a = wu(t.registered, i, e.className) : e.className != null && (a = e.className + " ");
  var l = Io(i, void 0, P.useContext(zo));
  if (process.env.NODE_ENV !== "production" && l.name.indexOf("-") === -1) {
    var c = e[bp];
    c && (l = Io([l, "label:" + c + ";"]));
  }
  a += t.key + "-" + l.name;
  var u = {};
  for (var d in e)
    IS.call(e, d) && d !== "css" && d !== vp && (process.env.NODE_ENV === "production" || d !== bp) && (u[d] = e[d]);
  return u.ref = r, u.className = a, /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(NS, {
    cache: t,
    serialized: l,
    isStringTag: typeof o == "string"
  }), /* @__PURE__ */ P.createElement(o, u));
});
process.env.NODE_ENV !== "production" && (AS.displayName = "EmotionCssPropInternal");
var jS = {
  name: "@emotion/react",
  version: "11.11.1",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  exports: {
    ".": {
      module: {
        worker: "./dist/emotion-react.worker.esm.js",
        browser: "./dist/emotion-react.browser.esm.js",
        default: "./dist/emotion-react.esm.js"
      },
      import: "./dist/emotion-react.cjs.mjs",
      default: "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      module: {
        worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
        browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        default: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
      },
      import: "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
      default: "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      module: {
        worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
        browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
      },
      import: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
      default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      module: {
        worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
        browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
      },
      import: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
      default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": {
      types: {
        import: "./macro.d.mts",
        default: "./macro.d.ts"
      },
      default: "./macro.js"
    }
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.*"
  ],
  sideEffects: !1,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.11.0",
    "@emotion/cache": "^11.11.0",
    "@emotion/serialize": "^1.1.2",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.0.1",
    "@emotion/utils": "^1.2.1",
    "@emotion/weak-memoize": "^0.3.1",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@types/react": {
      optional: !0
    }
  },
  devDependencies: {
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.11.0",
    "@emotion/css-prettifier": "1.1.3",
    "@emotion/server": "11.11.0",
    "@emotion/styled": "11.11.0",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact",
    exports: {
      envConditions: [
        "browser",
        "worker"
      ],
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": {
          types: {
            import: "./macro.d.mts",
            default: "./macro.d.ts"
          },
          default: "./macro.js"
        }
      }
    }
  }
}, $p = !1, Yy = /* @__PURE__ */ Xa(function(e, t) {
  process.env.NODE_ENV !== "production" && !$p && // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  (e.className || e.css) && (console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"), $p = !0);
  var r = e.styles, n = Io([r], void 0, P.useContext(zo)), o = P.useRef();
  return gp(function() {
    var i = t.key + "-global", a = new t.sheet.constructor({
      key: i,
      nonce: t.sheet.nonce,
      container: t.sheet.container,
      speedy: t.sheet.isSpeedy
    }), l = !1, c = document.querySelector('style[data-emotion="' + i + " " + n.name + '"]');
    return t.sheet.tags.length && (a.before = t.sheet.tags[0]), c !== null && (l = !0, c.setAttribute("data-emotion", i), a.hydrate([c])), o.current = [a, l], function() {
      a.flush();
    };
  }, [t]), gp(function() {
    var i = o.current, a = i[0], l = i[1];
    if (l) {
      i[1] = !1;
      return;
    }
    if (n.next !== void 0 && Ya(t, n.next, !0), a.tags.length) {
      var c = a.tags[a.tags.length - 1].nextElementSibling;
      a.before = c, a.flush();
    }
    t.insert("", n, a, !1);
  }, [t, n.name]), null;
});
process.env.NODE_ENV !== "production" && (Yy.displayName = "EmotionGlobal");
function kS() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return Io(t);
}
var Pu = function() {
  var t = kS.apply(void 0, arguments), r = "animation-" + t.name;
  return {
    name: r,
    styles: "@keyframes " + r + "{" + t.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, MS = function e(t) {
  for (var r = t.length, n = 0, o = ""; n < r; n++) {
    var i = t[n];
    if (i != null) {
      var a = void 0;
      switch (typeof i) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(i))
            a = e(i);
          else {
            process.env.NODE_ENV !== "production" && i.styles !== void 0 && i.name !== void 0 && console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component."), a = "";
            for (var l in i)
              i[l] && l && (a && (a += " "), a += l);
          }
          break;
        }
        default:
          a = i;
      }
      a && (o && (o += " "), o += a);
    }
  }
  return o;
};
function DS(e, t, r) {
  var n = [], o = wu(e, n, r);
  return n.length < 2 ? r : o + t(n);
}
var FS = function(t) {
  var r = t.cache, n = t.serializedArr;
  return Ou(function() {
    for (var o = 0; o < n.length; o++)
      Ya(r, n[o], !1);
  }), null;
}, LS = /* @__PURE__ */ Xa(function(e, t) {
  var r = !1, n = [], o = function() {
    if (r && process.env.NODE_ENV !== "production")
      throw new Error("css can only be used during render");
    for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++)
      d[p] = arguments[p];
    var f = Io(d, t.registered);
    return n.push(f), Ga(t, f, !1), t.key + "-" + f.name;
  }, i = function() {
    if (r && process.env.NODE_ENV !== "production")
      throw new Error("cx can only be used during render");
    for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++)
      d[p] = arguments[p];
    return DS(t.registered, o, MS(d));
  }, a = {
    css: o,
    cx: i,
    theme: P.useContext(zo)
  }, l = e.children(a);
  return r = !0, /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(FS, {
    cache: t,
    serializedArr: n
  }), l);
});
process.env.NODE_ENV !== "production" && (LS.displayName = "EmotionClassNames");
if (process.env.NODE_ENV !== "production") {
  var Sp = !0, BS = typeof jest < "u" || typeof vi < "u";
  if (Sp && !BS) {
    var Ep = (
      // $FlowIgnore
      typeof globalThis < "u" ? globalThis : Sp ? window : global
    ), _p = "__EMOTION_REACT_" + jS.version.split(".")[0] + "__";
    Ep[_p] && console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."), Ep[_p] = !0;
  }
}
var VS = A1, zS = function(t) {
  return t !== "theme";
}, xp = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? VS : zS;
}, wp = function(t, r, n) {
  var o;
  if (r) {
    var i = r.shouldForwardProp;
    o = t.__emotion_forwardProp && i ? function(a) {
      return t.__emotion_forwardProp(a) && i(a);
    } : i;
  }
  return typeof o != "function" && n && (o = t.__emotion_forwardProp), o;
}, Tp = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, US = function(t) {
  var r = t.cache, n = t.serialized, o = t.isStringTag;
  return Ga(r, n, o), Ou(function() {
    return Ya(r, n, o);
  }), null;
}, WS = function e(t, r) {
  if (process.env.NODE_ENV !== "production" && t === void 0)
    throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
  var n = t.__emotion_real === t, o = n && t.__emotion_base || t, i, a;
  r !== void 0 && (i = r.label, a = r.target);
  var l = wp(t, r, n), c = l || xp(o), u = !c("as");
  return function() {
    var d = arguments, p = n && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (i !== void 0 && p.push("label:" + i + ";"), d[0] == null || d[0].raw === void 0)
      p.push.apply(p, d);
    else {
      process.env.NODE_ENV !== "production" && d[0][0] === void 0 && console.error(Tp), p.push(d[0][0]);
      for (var f = d.length, m = 1; m < f; m++)
        process.env.NODE_ENV !== "production" && d[0][m] === void 0 && console.error(Tp), p.push(d[m], d[0][m]);
    }
    var h = Xa(function(g, y, v) {
      var $ = u && g.as || o, E = "", S = [], b = g;
      if (g.theme == null) {
        b = {};
        for (var x in g)
          b[x] = g[x];
        b.theme = P.useContext(zo);
      }
      typeof g.className == "string" ? E = wu(y.registered, S, g.className) : g.className != null && (E = g.className + " ");
      var w = Io(p.concat(S), y.registered, b);
      E += y.key + "-" + w.name, a !== void 0 && (E += " " + a);
      var A = u && l === void 0 ? xp($) : c, M = {};
      for (var k in g)
        u && k === "as" || // $FlowFixMe
        A(k) && (M[k] = g[k]);
      return M.className = E, M.ref = v, /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(US, {
        cache: y,
        serialized: w,
        isStringTag: typeof $ == "string"
      }), /* @__PURE__ */ P.createElement($, M));
    });
    return h.displayName = i !== void 0 ? i : "Styled(" + (typeof o == "string" ? o : o.displayName || o.name || "Component") + ")", h.defaultProps = t.defaultProps, h.__emotion_real = h, h.__emotion_base = o, h.__emotion_styles = p, h.__emotion_forwardProp = l, Object.defineProperty(h, "toString", {
      value: function() {
        return a === void 0 && process.env.NODE_ENV !== "production" ? "NO_COMPONENT_SELECTOR" : "." + a;
      }
    }), h.withComponent = function(g, y) {
      return e(g, C({}, r, y, {
        shouldForwardProp: wp(h, y, !0)
      })).apply(void 0, p);
    }, h;
  };
}, qS = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], Vc = WS.bind();
qS.forEach(function(e) {
  Vc[e] = Vc(e);
});
function KS(e) {
  return e == null || Object.keys(e).length === 0;
}
function Xy(e) {
  const {
    styles: t,
    defaultTheme: r = {}
  } = e, n = typeof t == "function" ? (o) => t(KS(o) ? r : o) : t;
  return /* @__PURE__ */ _.jsx(Yy, {
    styles: n
  });
}
process.env.NODE_ENV !== "production" && (Xy.propTypes = {
  defaultTheme: s.object,
  styles: s.oneOfType([s.array, s.string, s.object, s.func])
});
/**
 * @mui/styled-engine v5.14.20
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Jy(e, t) {
  const r = Vc(e, t);
  return process.env.NODE_ENV !== "production" ? (...n) => {
    const o = typeof e == "string" ? `"${e}"` : "component";
    return n.length === 0 ? console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : n.some((i) => i === void 0) && console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`), r(...n);
  } : r;
}
const HS = (e, t) => {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
};
function Ee(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const GS = ["values", "unit", "step"], YS = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => C({}, r, {
    [n.key]: n.val
  }), {});
};
function XS(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: r = "px",
    step: n = 5
  } = e, o = Ee(e, GS), i = YS(t), a = Object.keys(i);
  function l(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${r})`;
  }
  function c(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - n / 100}${r})`;
  }
  function u(f, m) {
    const h = a.indexOf(m);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${r}) and (max-width:${(h !== -1 && typeof t[a[h]] == "number" ? t[a[h]] : m) - n / 100}${r})`;
  }
  function d(f) {
    return a.indexOf(f) + 1 < a.length ? u(f, a[a.indexOf(f) + 1]) : l(f);
  }
  function p(f) {
    const m = a.indexOf(f);
    return m === 0 ? l(a[1]) : m === a.length - 1 ? c(a[m]) : u(f, a[a.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return C({
    keys: a,
    values: i,
    up: l,
    down: c,
    between: u,
    only: d,
    not: p,
    unit: r
  }, o);
}
const JS = {
  borderRadius: 4
}, ZS = JS, QS = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, $n = QS;
function Ai(e, t) {
  return t ? Ht(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Ru = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, Op = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Ru[e]}px)`
};
function tr(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const i = n.breakpoints || Op;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = r(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = n.breakpoints || Op;
    return Object.keys(t).reduce((a, l) => {
      if (Object.keys(i.values || Ru).indexOf(l) !== -1) {
        const c = i.up(l);
        a[c] = r(t[l], l);
      } else {
        const c = l;
        a[c] = t[c];
      }
      return a;
    }, {});
  }
  return r(t);
}
function Zy(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const i = e.up(o);
    return n[i] = {}, n;
  }, {})) || {};
}
function Qy(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function eE(e, ...t) {
  const r = Zy(e), n = [r, ...t].reduce((o, i) => Ht(o, i), {});
  return Qy(Object.keys(r), n);
}
function tE(e, t) {
  if (typeof e != "object")
    return {};
  const r = {}, n = Object.keys(t);
  return Array.isArray(e) ? n.forEach((o, i) => {
    i < e.length && (r[o] = !0);
  }) : n.forEach((o) => {
    e[o] != null && (r[o] = !0);
  }), r;
}
function zn({
  values: e,
  breakpoints: t,
  base: r
}) {
  const n = r || tE(e, t), o = Object.keys(n);
  if (o.length === 0)
    return e;
  let i;
  return o.reduce((a, l, c) => (Array.isArray(e) ? (a[l] = e[c] != null ? e[c] : e[i], i = c) : typeof e == "object" ? (a[l] = e[l] != null ? e[l] : e[i], i = l) : a[l] = e, a), {});
}
function Ja(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function ha(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = Ja(e, r) || n, t && (o = t(o, n, e)), o;
}
function Rt(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: n,
    transform: o
  } = e, i = (a) => {
    if (a[t] == null)
      return null;
    const l = a[t], c = a.theme, u = Ja(c, n) || {};
    return tr(a, l, (p) => {
      let f = ha(u, o, p);
      return p === f && typeof p == "string" && (f = ha(u, o, `${t}${p === "default" ? "" : xe(p)}`, p)), r === !1 ? f : {
        [r]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: $n
  } : {}, i.filterProps = [t], i;
}
function rE(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const nE = {
  m: "margin",
  p: "padding"
}, oE = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Cp = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, iE = rE((e) => {
  if (e.length > 2)
    if (Cp[e])
      e = Cp[e];
    else
      return [e];
  const [t, r] = e.split(""), n = nE[t], o = oE[r] || "";
  return Array.isArray(o) ? o.map((i) => n + i) : [n + o];
}), Za = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Qa = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], sE = [...Za, ...Qa];
function as(e, t, r, n) {
  var o;
  const i = (o = Ja(e, t, !1)) != null ? o : r;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Iu(e) {
  return as(e, "spacing", 8, "spacing");
}
function Wn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function aE(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Wn(t, r), n), {});
}
function lE(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = iE(r), i = aE(o, n), a = e[r];
  return tr(e, a, i);
}
function eg(e, t) {
  const r = Iu(e.theme);
  return Object.keys(e).map((n) => lE(e, t, n, r)).reduce(Ai, {});
}
function xt(e) {
  return eg(e, Za);
}
xt.propTypes = process.env.NODE_ENV !== "production" ? Za.reduce((e, t) => (e[t] = $n, e), {}) : {};
xt.filterProps = Za;
function wt(e) {
  return eg(e, Qa);
}
wt.propTypes = process.env.NODE_ENV !== "production" ? Qa.reduce((e, t) => (e[t] = $n, e), {}) : {};
wt.filterProps = Qa;
process.env.NODE_ENV !== "production" && sE.reduce((e, t) => (e[t] = $n, e), {});
function cE(e = 8) {
  if (e.mui)
    return e;
  const t = Iu({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((i) => {
    const a = t(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return r.mui = !0, r;
}
function el(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((i) => {
    n[i] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, i) => t[i] ? Ai(o, t[i](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function pr(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function vr(e, t) {
  return Rt({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const uE = vr("border", pr), dE = vr("borderTop", pr), fE = vr("borderRight", pr), pE = vr("borderBottom", pr), mE = vr("borderLeft", pr), hE = vr("borderColor"), yE = vr("borderTopColor"), gE = vr("borderRightColor"), vE = vr("borderBottomColor"), bE = vr("borderLeftColor"), $E = vr("outline", pr), SE = vr("outlineColor"), tl = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = as(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Wn(t, n)
    });
    return tr(e, e.borderRadius, r);
  }
  return null;
};
tl.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: $n
} : {};
tl.filterProps = ["borderRadius"];
el(uE, dE, fE, pE, mE, hE, yE, gE, vE, bE, tl, $E, SE);
const rl = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = as(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Wn(t, n)
    });
    return tr(e, e.gap, r);
  }
  return null;
};
rl.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: $n
} : {};
rl.filterProps = ["gap"];
const nl = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = as(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Wn(t, n)
    });
    return tr(e, e.columnGap, r);
  }
  return null;
};
nl.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: $n
} : {};
nl.filterProps = ["columnGap"];
const ol = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = as(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Wn(t, n)
    });
    return tr(e, e.rowGap, r);
  }
  return null;
};
ol.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: $n
} : {};
ol.filterProps = ["rowGap"];
const EE = Rt({
  prop: "gridColumn"
}), _E = Rt({
  prop: "gridRow"
}), xE = Rt({
  prop: "gridAutoFlow"
}), wE = Rt({
  prop: "gridAutoColumns"
}), TE = Rt({
  prop: "gridAutoRows"
}), OE = Rt({
  prop: "gridTemplateColumns"
}), CE = Rt({
  prop: "gridTemplateRows"
}), PE = Rt({
  prop: "gridTemplateAreas"
}), RE = Rt({
  prop: "gridArea"
});
el(rl, nl, ol, EE, _E, xE, wE, TE, OE, CE, PE, RE);
function xo(e, t) {
  return t === "grey" ? t : e;
}
const IE = Rt({
  prop: "color",
  themeKey: "palette",
  transform: xo
}), NE = Rt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: xo
}), AE = Rt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: xo
});
el(IE, NE, AE);
function ir(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const jE = Rt({
  prop: "width",
  transform: ir
}), Nu = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const i = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Ru[r];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: ir(r)
      };
    };
    return tr(e, e.maxWidth, t);
  }
  return null;
};
Nu.filterProps = ["maxWidth"];
const kE = Rt({
  prop: "minWidth",
  transform: ir
}), ME = Rt({
  prop: "height",
  transform: ir
}), DE = Rt({
  prop: "maxHeight",
  transform: ir
}), FE = Rt({
  prop: "minHeight",
  transform: ir
});
Rt({
  prop: "size",
  cssProperty: "width",
  transform: ir
});
Rt({
  prop: "size",
  cssProperty: "height",
  transform: ir
});
const LE = Rt({
  prop: "boxSizing"
});
el(jE, Nu, kE, ME, DE, FE, LE);
const BE = {
  // borders
  border: {
    themeKey: "borders",
    transform: pr
  },
  borderTop: {
    themeKey: "borders",
    transform: pr
  },
  borderRight: {
    themeKey: "borders",
    transform: pr
  },
  borderBottom: {
    themeKey: "borders",
    transform: pr
  },
  borderLeft: {
    themeKey: "borders",
    transform: pr
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: pr
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: tl
  },
  // palette
  color: {
    themeKey: "palette",
    transform: xo
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: xo
  },
  backgroundColor: {
    themeKey: "palette",
    transform: xo
  },
  // spacing
  p: {
    style: wt
  },
  pt: {
    style: wt
  },
  pr: {
    style: wt
  },
  pb: {
    style: wt
  },
  pl: {
    style: wt
  },
  px: {
    style: wt
  },
  py: {
    style: wt
  },
  padding: {
    style: wt
  },
  paddingTop: {
    style: wt
  },
  paddingRight: {
    style: wt
  },
  paddingBottom: {
    style: wt
  },
  paddingLeft: {
    style: wt
  },
  paddingX: {
    style: wt
  },
  paddingY: {
    style: wt
  },
  paddingInline: {
    style: wt
  },
  paddingInlineStart: {
    style: wt
  },
  paddingInlineEnd: {
    style: wt
  },
  paddingBlock: {
    style: wt
  },
  paddingBlockStart: {
    style: wt
  },
  paddingBlockEnd: {
    style: wt
  },
  m: {
    style: xt
  },
  mt: {
    style: xt
  },
  mr: {
    style: xt
  },
  mb: {
    style: xt
  },
  ml: {
    style: xt
  },
  mx: {
    style: xt
  },
  my: {
    style: xt
  },
  margin: {
    style: xt
  },
  marginTop: {
    style: xt
  },
  marginRight: {
    style: xt
  },
  marginBottom: {
    style: xt
  },
  marginLeft: {
    style: xt
  },
  marginX: {
    style: xt
  },
  marginY: {
    style: xt
  },
  marginInline: {
    style: xt
  },
  marginInlineStart: {
    style: xt
  },
  marginInlineEnd: {
    style: xt
  },
  marginBlock: {
    style: xt
  },
  marginBlockStart: {
    style: xt
  },
  marginBlockEnd: {
    style: xt
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: rl
  },
  rowGap: {
    style: ol
  },
  columnGap: {
    style: nl
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: ir
  },
  maxWidth: {
    style: Nu
  },
  minWidth: {
    transform: ir
  },
  height: {
    transform: ir
  },
  maxHeight: {
    transform: ir
  },
  minHeight: {
    transform: ir
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
}, il = BE;
function VE(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function zE(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function UE() {
  function e(r, n, o, i) {
    const a = {
      [r]: n,
      theme: o
    }, l = i[r];
    if (!l)
      return {
        [r]: n
      };
    const {
      cssProperty: c = r,
      themeKey: u,
      transform: d,
      style: p
    } = l;
    if (n == null)
      return null;
    if (u === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const f = Ja(o, u) || {};
    return p ? p(a) : tr(a, n, (h) => {
      let g = ha(f, d, h);
      return h === g && typeof h == "string" && (g = ha(f, d, `${r}${h === "default" ? "" : xe(h)}`, h)), c === !1 ? g : {
        [c]: g
      };
    });
  }
  function t(r) {
    var n;
    const {
      sx: o,
      theme: i = {}
    } = r || {};
    if (!o)
      return null;
    const a = (n = i.unstable_sxConfig) != null ? n : il;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = Zy(i.breakpoints), p = Object.keys(d);
      let f = d;
      return Object.keys(u).forEach((m) => {
        const h = zE(u[m], i);
        if (h != null)
          if (typeof h == "object")
            if (a[m])
              f = Ai(f, e(m, h, i, a));
            else {
              const g = tr({
                theme: i
              }, h, (y) => ({
                [m]: y
              }));
              VE(g, h) ? f[m] = t({
                sx: h,
                theme: i
              }) : f = Ai(f, g);
            }
          else
            f = Ai(f, e(m, h, i, a));
      }), Qy(p, f);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const tg = UE();
tg.filterProps = ["sx"];
const sl = tg, WE = ["breakpoints", "palette", "spacing", "shape"];
function al(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: i = {}
  } = e, a = Ee(e, WE), l = XS(r), c = cE(o);
  let u = Ht({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: C({
      mode: "light"
    }, n),
    spacing: c,
    shape: C({}, ZS, i)
  }, a);
  return u = t.reduce((d, p) => Ht(d, p), u), u.unstable_sxConfig = C({}, il, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(p) {
    return sl({
      sx: p,
      theme: this
    });
  }, u;
}
function qE(e) {
  return Object.keys(e).length === 0;
}
function KE(e = null) {
  const t = P.useContext(zo);
  return !t || qE(t) ? e : t;
}
const HE = al();
function ll(e = HE) {
  return KE(e);
}
function rg({
  styles: e,
  themeId: t,
  defaultTheme: r = {}
}) {
  const n = ll(r), o = typeof e == "function" ? e(t && n[t] || n) : e;
  return /* @__PURE__ */ _.jsx(Xy, {
    styles: o
  });
}
process.env.NODE_ENV !== "production" && (rg.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  defaultTheme: s.object,
  /**
   * @ignore
   */
  styles: s.oneOfType([s.array, s.func, s.number, s.object, s.string, s.bool]),
  /**
   * @ignore
   */
  themeId: s.string
});
const GE = ["sx"], YE = (e) => {
  var t, r;
  const n = {
    systemProps: {},
    otherProps: {}
  }, o = (t = e == null || (r = e.theme) == null ? void 0 : r.unstable_sxConfig) != null ? t : il;
  return Object.keys(e).forEach((i) => {
    o[i] ? n.systemProps[i] = e[i] : n.otherProps[i] = e[i];
  }), n;
};
function cl(e) {
  const {
    sx: t
  } = e, r = Ee(e, GE), {
    systemProps: n,
    otherProps: o
  } = YE(r);
  let i;
  return Array.isArray(t) ? i = [n, ...t] : typeof t == "function" ? i = (...a) => {
    const l = t(...a);
    return Hr(l) ? C({}, n, l) : n;
  } : i = C({}, n, t), C({}, o, {
    sx: i
  });
}
function ng(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (r = ng(e[t])) && (n && (n += " "), n += r);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function Se() {
  for (var e, t, r = 0, n = ""; r < arguments.length; )
    (e = arguments[r++]) && (t = ng(e)) && (n && (n += " "), n += t);
  return n;
}
const XE = ["className", "component"];
function JE(e = {}) {
  const {
    themeId: t,
    defaultTheme: r,
    defaultClassName: n = "MuiBox-root",
    generateClassName: o
  } = e, i = Jy("div", {
    shouldForwardProp: (l) => l !== "theme" && l !== "sx" && l !== "as"
  })(sl);
  return /* @__PURE__ */ P.forwardRef(function(c, u) {
    const d = ll(r), p = cl(c), {
      className: f,
      component: m = "div"
    } = p, h = Ee(p, XE);
    return /* @__PURE__ */ _.jsx(i, C({
      as: m,
      ref: u,
      className: Se(f, o ? o(n) : n),
      theme: t && d[t] || d
    }, h));
  });
}
const ZE = ["variant"];
function Pp(e) {
  return e.length === 0;
}
function og(e) {
  const {
    variant: t
  } = e, r = Ee(e, ZE);
  let n = t || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? n += Pp(n) ? e[o] : xe(e[o]) : n += `${Pp(n) ? o : xe(o)}${xe(e[o].toString())}`;
  }), n;
}
const QE = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function e_(e) {
  return Object.keys(e).length === 0;
}
function t_(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const r_ = (e, t) => t.components && t.components[e] && t.components[e].styleOverrides ? t.components[e].styleOverrides : null, ya = (e) => {
  const t = {};
  return e && e.forEach((r) => {
    const n = og(r.props);
    t[n] = r.style;
  }), t;
}, n_ = (e, t) => {
  let r = [];
  return t && t.components && t.components[e] && t.components[e].variants && (r = t.components[e].variants), ya(r);
}, ga = (e, t, r) => {
  const {
    ownerState: n = {}
  } = e, o = [];
  return r && r.forEach((i) => {
    let a = !0;
    Object.keys(i.props).forEach((l) => {
      n[l] !== i.props[l] && e[l] !== i.props[l] && (a = !1);
    }), a && o.push(t[og(i.props)]);
  }), o;
}, o_ = (e, t, r, n) => {
  var o;
  const i = r == null || (o = r.components) == null || (o = o[n]) == null ? void 0 : o.variants;
  return ga(e, t, i);
};
function ji(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const i_ = al(), Rp = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Qs({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return e_(t) ? e : t[r] || t;
}
function s_(e) {
  return e ? (t, r) => r[e] : null;
}
const Ip = ({
  styledArg: e,
  props: t,
  defaultTheme: r,
  themeId: n
}) => {
  const o = e(C({}, t, {
    theme: Qs(C({}, t, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  let i;
  if (o && o.variants && (i = o.variants, delete o.variants), i) {
    const a = ga(t, ya(i), i);
    return [o, ...a];
  }
  return o;
};
function ig(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = i_,
    rootShouldForwardProp: n = ji,
    slotShouldForwardProp: o = ji
  } = e, i = (a) => sl(C({}, a, {
    theme: Qs(C({}, a, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    HS(a, (S) => S.filter((b) => !(b != null && b.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = s_(Rp(u))
    } = l, m = Ee(l, QE), h = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = p || !1;
    let y;
    process.env.NODE_ENV !== "production" && c && (y = `${c}-${Rp(u || "Root")}`);
    let v = ji;
    u === "Root" || u === "root" ? v = n : u ? v = o : t_(a) && (v = void 0);
    const $ = Jy(a, C({
      shouldForwardProp: v,
      label: y
    }, m)), E = (S, ...b) => {
      const x = b ? b.map((k) => {
        if (typeof k == "function" && k.__emotion_real !== k)
          return (H) => Ip({
            styledArg: k,
            props: H,
            defaultTheme: r,
            themeId: t
          });
        if (Hr(k)) {
          let H = k, U;
          return k && k.variants && (U = k.variants, delete H.variants, H = (K) => {
            let z = k;
            return ga(K, ya(U), U).forEach((X) => {
              z = Ht(z, X);
            }), z;
          }), H;
        }
        return k;
      }) : [];
      let w = S;
      if (Hr(S)) {
        let k;
        S && S.variants && (k = S.variants, delete w.variants, w = (H) => {
          let U = S;
          return ga(H, ya(k), k).forEach((z) => {
            U = Ht(U, z);
          }), U;
        });
      } else
        typeof S == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        S.__emotion_real !== S && (w = (k) => Ip({
          styledArg: S,
          props: k,
          defaultTheme: r,
          themeId: t
        }));
      c && f && x.push((k) => {
        const H = Qs(C({}, k, {
          defaultTheme: r,
          themeId: t
        })), U = r_(c, H);
        if (U) {
          const K = {};
          return Object.entries(U).forEach(([z, G]) => {
            K[z] = typeof G == "function" ? G(C({}, k, {
              theme: H
            })) : G;
          }), f(k, K);
        }
        return null;
      }), c && !h && x.push((k) => {
        const H = Qs(C({}, k, {
          defaultTheme: r,
          themeId: t
        }));
        return o_(k, n_(c, H), H, c);
      }), g || x.push(i);
      const A = x.length - b.length;
      if (Array.isArray(S) && A > 0) {
        const k = new Array(A).fill("");
        w = [...S, ...k], w.raw = [...S.raw, ...k];
      }
      const M = $(w, ...x);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${xe(u || "")}`), k === void 0 && (k = `Styled(${f1(a)})`), M.displayName = k;
      }
      return a.muiName && (M.muiName = a.muiName), M;
    };
    return $.withConfig && (E.withConfig = $.withConfig), E;
  };
}
const a_ = ig(), l_ = a_;
function c_(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : bu(t.components[r].defaultProps, n);
}
function sg({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = ll(r);
  return n && (o = o[n] || o), c_({
    theme: o,
    name: t,
    props: e
  });
}
function Au(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Math.min(Math.max(t, e), r);
}
function u_(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function qn(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return qn(u_(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : vn(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : vn(10, o));
  } else
    n = n.split(",");
  return n = n.map((i) => parseFloat(i)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function ul(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function d_(e) {
  e = qn(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, i = n * Math.min(o, 1 - o), a = (u, d = (u + r / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), ul({
    type: l,
    values: c
  });
}
function Np(e) {
  e = qn(e);
  let t = e.type === "hsl" || e.type === "hsla" ? qn(d_(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ap(e, t) {
  const r = Np(e), n = Np(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function Pt(e, t) {
  return e = qn(e), t = Au(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, ul(e);
}
function ag(e, t) {
  if (e = qn(e), t = Au(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return ul(e);
}
function lg(e, t) {
  if (e = qn(e), t = Au(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return ul(e);
}
const f_ = ["component", "direction", "spacing", "divider", "children", "className", "useFlexGap"], p_ = al(), m_ = l_("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (e, t) => t.root
});
function h_(e) {
  return sg({
    props: e,
    name: "MuiStack",
    defaultTheme: p_
  });
}
function y_(e, t) {
  const r = P.Children.toArray(e).filter(Boolean);
  return r.reduce((n, o, i) => (n.push(o), i < r.length - 1 && n.push(/* @__PURE__ */ P.cloneElement(t, {
    key: `separator-${i}`
  })), n), []);
}
const g_ = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], v_ = ({
  ownerState: e,
  theme: t
}) => {
  let r = C({
    display: "flex",
    flexDirection: "column"
  }, tr({
    theme: t
  }, zn({
    values: e.direction,
    breakpoints: t.breakpoints.values
  }), (n) => ({
    flexDirection: n
  })));
  if (e.spacing) {
    const n = Iu(t), o = Object.keys(t.breakpoints.values).reduce((c, u) => ((typeof e.spacing == "object" && e.spacing[u] != null || typeof e.direction == "object" && e.direction[u] != null) && (c[u] = !0), c), {}), i = zn({
      values: e.direction,
      base: o
    }), a = zn({
      values: e.spacing,
      base: o
    });
    typeof i == "object" && Object.keys(i).forEach((c, u, d) => {
      if (!i[c]) {
        const f = u > 0 ? i[d[u - 1]] : "column";
        i[c] = f;
      }
    }), r = Ht(r, tr({
      theme: t
    }, a, (c, u) => e.useFlexGap ? {
      gap: Wn(n, c)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${g_(u ? i[u] : e.direction)}`]: Wn(n, c)
      }
    }));
  }
  return r = eE(t.breakpoints, r), r;
};
function b_(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = m_,
    useThemeProps: r = h_,
    componentName: n = "MuiStack"
  } = e, o = () => ze({
    root: ["root"]
  }, (c) => Fe(n, c), {}), i = t(v_), a = /* @__PURE__ */ P.forwardRef(function(c, u) {
    const d = r(c), p = cl(d), {
      component: f = "div",
      direction: m = "column",
      spacing: h = 0,
      divider: g,
      children: y,
      className: v,
      useFlexGap: $ = !1
    } = p, E = Ee(p, f_), S = {
      direction: m,
      spacing: h,
      useFlexGap: $
    }, b = o();
    return /* @__PURE__ */ _.jsx(i, C({
      as: f,
      ownerState: S,
      ref: u,
      className: Se(b.root, v)
    }, E, {
      children: g ? y_(y, g) : y
    }));
  });
  return process.env.NODE_ENV !== "production" && (a.propTypes = {
    children: s.node,
    direction: s.oneOfType([s.oneOf(["column-reverse", "column", "row-reverse", "row"]), s.arrayOf(s.oneOf(["column-reverse", "column", "row-reverse", "row"])), s.object]),
    divider: s.node,
    spacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
    sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
  }), a;
}
const ls = "$$material";
function $_(e, t) {
  return C({
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    }
  }, t);
}
const S_ = {
  black: "#000",
  white: "#fff"
}, Xi = S_, E_ = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, __ = E_, x_ = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, ao = x_, w_ = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, lo = w_, T_ = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, hi = T_, O_ = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, co = O_, C_ = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, uo = C_, P_ = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, fo = P_, R_ = ["mode", "contrastThreshold", "tonalOffset"], jp = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: Xi.white,
    default: Xi.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, nc = {
  text: {
    primary: Xi.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: Xi.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function kp(e, t, r, n) {
  const o = n.light || n, i = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = lg(e.main, o) : t === "dark" && (e.dark = ag(e.main, i)));
}
function I_(e = "light") {
  return e === "dark" ? {
    main: co[200],
    light: co[50],
    dark: co[400]
  } : {
    main: co[700],
    light: co[400],
    dark: co[800]
  };
}
function N_(e = "light") {
  return e === "dark" ? {
    main: ao[200],
    light: ao[50],
    dark: ao[400]
  } : {
    main: ao[500],
    light: ao[300],
    dark: ao[700]
  };
}
function A_(e = "light") {
  return e === "dark" ? {
    main: lo[500],
    light: lo[300],
    dark: lo[700]
  } : {
    main: lo[700],
    light: lo[400],
    dark: lo[800]
  };
}
function j_(e = "light") {
  return e === "dark" ? {
    main: uo[400],
    light: uo[300],
    dark: uo[700]
  } : {
    main: uo[700],
    light: uo[500],
    dark: uo[900]
  };
}
function k_(e = "light") {
  return e === "dark" ? {
    main: fo[400],
    light: fo[300],
    dark: fo[700]
  } : {
    main: fo[800],
    light: fo[500],
    dark: fo[900]
  };
}
function M_(e = "light") {
  return e === "dark" ? {
    main: hi[400],
    light: hi[300],
    dark: hi[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: hi[500],
    dark: hi[900]
  };
}
function D_(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = Ee(e, R_), i = e.primary || I_(t), a = e.secondary || N_(t), l = e.error || A_(t), c = e.info || j_(t), u = e.success || k_(t), d = e.warning || M_(t);
  function p(g) {
    const y = Ap(g, nc.text.primary) >= r ? nc.text.primary : jp.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const v = Ap(g, y);
      v < 3 && console.error([`MUI: The contrast ratio of ${v}:1 for ${y} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return y;
  }
  const f = ({
    color: g,
    name: y,
    mainShade: v = 500,
    lightShade: $ = 300,
    darkShade: E = 700
  }) => {
    if (g = C({}, g), !g.main && g[v] && (g.main = g[v]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${y ? ` (${y})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${v}\` property.` : vn(11, y ? ` (${y})` : "", v));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${y ? ` (${y})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : vn(12, y ? ` (${y})` : "", JSON.stringify(g.main)));
    return kp(g, "light", $, n), kp(g, "dark", E, n), g.contrastText || (g.contrastText = p(g.main)), g;
  }, m = {
    dark: nc,
    light: jp
  };
  return process.env.NODE_ENV !== "production" && (m[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ht(C({
    // A collection of common colors.
    common: C({}, Xi),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: f({
      color: a,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: f({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: __,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, m[t]), o);
}
const F_ = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function L_(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Mp = {
  textTransform: "uppercase"
}, Dp = '"Roboto", "Helvetica", "Arial", sans-serif';
function B_(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = Dp,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: p
  } = r, f = Ee(r, F_);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const m = o / 14, h = p || ((v) => `${v / u * m}rem`), g = (v, $, E, S, b) => C({
    fontFamily: n,
    fontWeight: v,
    fontSize: h($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: E
  }, n === Dp ? {
    letterSpacing: `${L_(S / $)}em`
  } : {}, b, d), y = {
    h1: g(i, 96, 1.167, -1.5),
    h2: g(i, 60, 1.2, -0.5),
    h3: g(a, 48, 1.167, 0),
    h4: g(a, 34, 1.235, 0.25),
    h5: g(a, 24, 1.334, 0),
    h6: g(l, 20, 1.6, 0.15),
    subtitle1: g(a, 16, 1.75, 0.15),
    subtitle2: g(l, 14, 1.57, 0.1),
    body1: g(a, 16, 1.5, 0.15),
    body2: g(a, 14, 1.43, 0.15),
    button: g(l, 14, 1.75, 0.4, Mp),
    caption: g(a, 12, 1.66, 0.4),
    overline: g(a, 12, 2.66, 1, Mp),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ht(C({
    htmlFontSize: u,
    pxToRem: h,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, y), f, {
    clone: !1
    // No need to clone deep
  });
}
const V_ = 0.2, z_ = 0.14, U_ = 0.12;
function bt(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${V_})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${z_})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${U_})`].join(",");
}
const W_ = ["none", bt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), bt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), bt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), bt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), bt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), bt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), bt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), bt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), bt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), bt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), bt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), bt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), bt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), bt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), bt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), bt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), bt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), bt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), bt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), bt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), bt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), bt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), bt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), bt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], q_ = W_, K_ = ["duration", "easing", "delay"], H_ = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, G_ = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Fp(e) {
  return `${Math.round(e)}ms`;
}
function Y_(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function X_(e) {
  const t = C({}, H_, e.easing), r = C({}, G_, e.duration);
  return C({
    getAutoHeightDuration: Y_,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = Ee(i, K_);
      if (process.env.NODE_ENV !== "production") {
        const d = (f) => typeof f == "string", p = (f) => !isNaN(parseFloat(f));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(a) && !d(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !p(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof a == "string" ? a : Fp(a)} ${l} ${typeof c == "string" ? c : Fp(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const J_ = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Z_ = J_, Q_ = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function cg(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = Ee(e, Q_);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : vn(18));
  const l = D_(n), c = al(e);
  let u = Ht(c, {
    mixins: $_(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: q_.slice(),
    typography: B_(l, i),
    transitions: X_(o),
    zIndex: C({}, Z_)
  });
  if (u = Ht(u, a), u = t.reduce((d, p) => Ht(d, p), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (f, m) => {
      let h;
      for (h in f) {
        const g = f[h];
        if (d.indexOf(h) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const y = Fe("", h);
            console.error([`MUI: The \`${m}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${y}' syntax:`, JSON.stringify({
              root: {
                [`&.${y}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[h] = {};
        }
      }
    };
    Object.keys(u.components).forEach((f) => {
      const m = u.components[f].styleOverrides;
      m && f.indexOf("Mui") === 0 && p(m, f);
    });
  }
  return u.unstable_sxConfig = C({}, il, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(p) {
    return sl({
      sx: p,
      theme: this
    });
  }, u;
}
const ex = cg(), dl = ex;
function Sn() {
  const e = ll(dl);
  return process.env.NODE_ENV !== "production" && P.useDebugValue(e), e[ls] || e;
}
function He({
  props: e,
  name: t
}) {
  return sg({
    props: e,
    name: t,
    defaultTheme: dl,
    themeId: ls
  });
}
const Gt = (e) => ji(e) && e !== "classes", ju = ji, tx = ig({
  themeId: ls,
  defaultTheme: dl,
  rootShouldForwardProp: Gt
}), he = tx, rx = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Lp = rx, nx = Le("MuiBox", ["root"]), ox = nx, ix = cg(), ug = JE({
  themeId: ls,
  defaultTheme: ix,
  defaultClassName: ox.root,
  generateClassName: $u.generate
});
process.env.NODE_ENV !== "production" && (ug.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: s.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Vr = ug;
function Lr(e) {
  return typeof e == "string";
}
function sx(e, t, r) {
  return e === void 0 || Lr(e) ? t : C({}, t, {
    ownerState: C({}, t.ownerState, r)
  });
}
function ax(e, t, r = (n, o) => n === o) {
  return e.length === t.length && e.every((n, o) => r(n, t[o]));
}
function ki(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function lx(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function Bp(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function cx(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const m = Se(r == null ? void 0 : r.className, i, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = C({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = C({}, r, o, n);
    return m.length > 0 && (g.className = m), Object.keys(h).length > 0 && (g.style = h), {
      props: g,
      internalRef: void 0
    };
  }
  const a = ki(C({}, o, n)), l = Bp(n), c = Bp(o), u = t(a), d = Se(u == null ? void 0 : u.className, r == null ? void 0 : r.className, i, o == null ? void 0 : o.className, n == null ? void 0 : n.className), p = C({}, u == null ? void 0 : u.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), f = C({}, u, r, c, l);
  return d.length > 0 && (f.className = d), Object.keys(p).length > 0 && (f.style = p), {
    props: f,
    internalRef: u.ref
  };
}
const ux = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Dt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = Ee(e, ux), l = i ? {} : lx(n, o), {
    props: c,
    internalRef: u
  } = cx(C({}, a, {
    externalSlotProps: l
  })), d = Nt(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return sx(r, C({}, c, {
    ref: d
  }), o);
}
const dx = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function fx(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function px(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function mx(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || px(e));
}
function hx(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(dx)).forEach((n, o) => {
    const i = fx(n);
    i === -1 || !mx(n) || (i === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: i,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function yx() {
  return !0;
}
function va(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = hx,
    isEnabled: a = yx,
    open: l
  } = e, c = P.useRef(!1), u = P.useRef(null), d = P.useRef(null), p = P.useRef(null), f = P.useRef(null), m = P.useRef(!1), h = P.useRef(null), g = Nt(t.ref, h), y = P.useRef(null);
  P.useEffect(() => {
    !l || !h.current || (m.current = !r);
  }, [r, l]), P.useEffect(() => {
    if (!l || !h.current)
      return;
    const E = jt(h.current);
    return h.current.contains(E.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), m.current && h.current.focus()), () => {
      o || (p.current && p.current.focus && (c.current = !0, p.current.focus()), p.current = null);
    };
  }, [l]), P.useEffect(() => {
    if (!l || !h.current)
      return;
    const E = jt(h.current), S = (w) => {
      y.current = w, !(n || !a() || w.key !== "Tab") && E.activeElement === h.current && w.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, b = () => {
      const w = h.current;
      if (w === null)
        return;
      if (!E.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (w.contains(E.activeElement) || n && E.activeElement !== u.current && E.activeElement !== d.current)
        return;
      if (E.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!m.current)
        return;
      let A = [];
      if ((E.activeElement === u.current || E.activeElement === d.current) && (A = i(h.current)), A.length > 0) {
        var M, k;
        const H = !!((M = y.current) != null && M.shiftKey && ((k = y.current) == null ? void 0 : k.key) === "Tab"), U = A[0], K = A[A.length - 1];
        typeof U != "string" && typeof K != "string" && (H ? K.focus() : U.focus());
      } else
        w.focus();
    };
    E.addEventListener("focusin", b), E.addEventListener("keydown", S, !0);
    const x = setInterval(() => {
      E.activeElement && E.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(x), E.removeEventListener("focusin", b), E.removeEventListener("keydown", S, !0);
    };
  }, [r, n, o, a, l, i]);
  const v = (E) => {
    p.current === null && (p.current = E.relatedTarget), m.current = !0, f.current = E.target;
    const S = t.props.onFocus;
    S && S(E);
  }, $ = (E) => {
    p.current === null && (p.current = E.relatedTarget), m.current = !0;
  };
  return /* @__PURE__ */ _.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ _.jsx("div", {
      tabIndex: l ? 0 : -1,
      onFocus: $,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ P.cloneElement(t, {
      ref: g,
      onFocus: v
    }), /* @__PURE__ */ _.jsx("div", {
      tabIndex: l ? 0 : -1,
      onFocus: $,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (va.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A single child content element.
   */
  children: za,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: s.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: s.func,
  /**
   * If `true`, focus is locked.
   */
  open: s.bool.isRequired
});
process.env.NODE_ENV !== "production" && (va["propTypes"] = Ty(va.propTypes));
function gx(e) {
  return typeof e == "function" ? e() : e;
}
const ba = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = P.useState(null), c = Nt(/* @__PURE__ */ P.isValidElement(n) ? n.ref : null, r);
  if (gr(() => {
    i || l(gx(o) || document.body);
  }, [o, i]), gr(() => {
    if (a && !i)
      return fa(r, a), () => {
        fa(r, null);
      };
  }, [r, a, i]), i) {
    if (/* @__PURE__ */ P.isValidElement(n)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ P.cloneElement(n, u);
    }
    return /* @__PURE__ */ _.jsx(P.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ _.jsx(P.Fragment, {
    children: a && /* @__PURE__ */ by.createPortal(n, a)
  });
});
process.env.NODE_ENV !== "production" && (ba.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The children to render into the `container`.
   */
  children: s.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([qi, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (ba["propTypes"] = Ty(ba.propTypes));
function vx(e) {
  const t = jt(e);
  return t.body === e ? Br(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Mi(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Vp(e) {
  return parseInt(Br(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function bx(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function zp(e, t, r, n, o) {
  const i = [t, r, ...n];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !bx(a);
    l && c && Mi(a, o);
  });
}
function oc(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function $x(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (vx(n)) {
      const a = Ry(jt(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${Vp(n) + a}px`;
      const l = jt(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Vp(c) + a}px`;
      });
    }
    let i;
    if (n.parentNode instanceof DocumentFragment)
      i = jt(n).body;
    else {
      const a = n.parentElement, l = Br(n);
      i = (a == null ? void 0 : a.nodeName) === "HTML" && l.getComputedStyle(a).overflowY === "scroll" ? a : n;
    }
    r.push({
      value: i.style.overflow,
      property: "overflow",
      el: i
    }, {
      value: i.style.overflowX,
      property: "overflow-x",
      el: i
    }, {
      value: i.style.overflowY,
      property: "overflow-y",
      el: i
    }), i.style.overflow = "hidden";
  }
  return () => {
    r.forEach(({
      value: i,
      el: a,
      property: l
    }) => {
      i ? a.style.setProperty(l, i) : a.style.removeProperty(l);
    });
  };
}
function Sx(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class Ex {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Mi(t.modalRef, !1);
    const o = Sx(r);
    zp(r, t.mount, t.modalRef, o, !0);
    const i = oc(this.containers, (a) => a.container === r);
    return i !== -1 ? (this.containers[i].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = oc(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = $x(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = oc(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(n, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && Mi(t.modalRef, r), zp(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && Mi(a.modalRef, !1);
    }
    return n;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function _x(e) {
  return typeof e == "function" ? e() : e;
}
function xx(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const wx = new Ex();
function Tx(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = wx,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: p
  } = e, f = P.useRef({}), m = P.useRef(null), h = P.useRef(null), g = Nt(h, p), [y, v] = P.useState(!d), $ = xx(c);
  let E = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (E = !1);
  const S = () => jt(m.current), b = () => (f.current.modalRef = h.current, f.current.mount = m.current, f.current), x = () => {
    o.mount(b(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, w = sr(() => {
    const X = _x(t) || S().body;
    o.add(b(), X), h.current && x();
  }), A = P.useCallback(() => o.isTopModal(b()), [o]), M = sr((X) => {
    m.current = X, X && (d && A() ? x() : h.current && Mi(h.current, E));
  }), k = P.useCallback(() => {
    o.remove(b(), E);
  }, [E, o]);
  P.useEffect(() => () => {
    k();
  }, [k]), P.useEffect(() => {
    d ? w() : (!$ || !i) && k();
  }, [d, k, $, i, w]);
  const H = (X) => (J) => {
    var Z;
    (Z = X.onKeyDown) == null || Z.call(X, J), !(J.key !== "Escape" || J.which === 229 || // Wait until IME is settled.
    !A()) && (r || (J.stopPropagation(), u && u(J, "escapeKeyDown")));
  }, U = (X) => (J) => {
    var Z;
    (Z = X.onClick) == null || Z.call(X, J), J.target === J.currentTarget && u && u(J, "backdropClick");
  };
  return {
    getRootProps: (X = {}) => {
      const J = ki(e);
      delete J.onTransitionEnter, delete J.onTransitionExited;
      const Z = C({}, J, X);
      return C({
        role: "presentation"
      }, Z, {
        onKeyDown: H(Z),
        ref: g
      });
    },
    getBackdropProps: (X = {}) => {
      const J = X;
      return C({
        "aria-hidden": !0
      }, J, {
        onClick: U(J),
        open: d
      });
    },
    getTransitionProps: () => {
      const X = () => {
        v(!1), a && a();
      }, J = () => {
        v(!0), l && l(), i && k();
      };
      return {
        onEnter: da(X, c == null ? void 0 : c.props.onEnter),
        onExited: da(J, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: M,
    isTopModal: A,
    exited: y,
    hasTransition: $
  };
}
const Ox = 2;
function dg(e, t) {
  return e - t;
}
function yi(e, t, r) {
  return e == null ? t : Math.min(Math.max(t, e), r);
}
function Up(e, t) {
  var r;
  const {
    index: n
  } = (r = e.reduce((o, i, a) => {
    const l = Math.abs(t - i);
    return o === null || l < o.distance || l === o.distance ? {
      distance: l,
      index: a
    } : o;
  }, null)) != null ? r : {};
  return n;
}
function Is(e, t) {
  if (t.current !== void 0 && e.changedTouches) {
    const r = e;
    for (let n = 0; n < r.changedTouches.length; n += 1) {
      const o = r.changedTouches[n];
      if (o.identifier === t.current)
        return {
          x: o.clientX,
          y: o.clientY
        };
    }
    return !1;
  }
  return {
    x: e.clientX,
    y: e.clientY
  };
}
function $a(e, t, r) {
  return (e - t) * 100 / (r - t);
}
function Cx(e, t, r) {
  return (r - t) * e + t;
}
function Px(e) {
  if (Math.abs(e) < 1) {
    const r = e.toExponential().split("e-"), n = r[0].split(".")[1];
    return (n ? n.length : 0) + parseInt(r[1], 10);
  }
  const t = e.toString().split(".")[1];
  return t ? t.length : 0;
}
function Rx(e, t, r) {
  const n = Math.round((e - r) / t) * t + r;
  return Number(n.toFixed(Px(t)));
}
function Wp({
  values: e,
  newValue: t,
  index: r
}) {
  const n = e.slice();
  return n[r] = t, n.sort(dg);
}
function Ns({
  sliderRef: e,
  activeIndex: t,
  setActive: r
}) {
  var n, o;
  const i = jt(e.current);
  if (!((n = e.current) != null && n.contains(i.activeElement)) || Number(i == null || (o = i.activeElement) == null ? void 0 : o.getAttribute("data-index")) !== t) {
    var a;
    (a = e.current) == null || a.querySelector(`[type="range"][data-index="${t}"]`).focus();
  }
  r && r(t);
}
function As(e, t) {
  return typeof e == "number" && typeof t == "number" ? e === t : typeof e == "object" && typeof t == "object" ? ax(e, t) : !1;
}
const Ix = {
  horizontal: {
    offset: (e) => ({
      left: `${e}%`
    }),
    leap: (e) => ({
      width: `${e}%`
    })
  },
  "horizontal-reverse": {
    offset: (e) => ({
      right: `${e}%`
    }),
    leap: (e) => ({
      width: `${e}%`
    })
  },
  vertical: {
    offset: (e) => ({
      bottom: `${e}%`
    }),
    leap: (e) => ({
      height: `${e}%`
    })
  }
}, Nx = (e) => e;
let js;
function ic() {
  return js === void 0 && (typeof CSS < "u" && typeof CSS.supports == "function" ? js = CSS.supports("touch-action", "none") : js = !0), js;
}
function Ax(e) {
  const {
    "aria-labelledby": t,
    defaultValue: r,
    disabled: n = !1,
    disableSwap: o = !1,
    isRtl: i = !1,
    marks: a = !1,
    max: l = 100,
    min: c = 0,
    name: u,
    onChange: d,
    onChangeCommitted: p,
    orientation: f = "horizontal",
    rootRef: m,
    scale: h = Nx,
    step: g = 1,
    tabIndex: y,
    value: v
  } = e, $ = P.useRef(), [E, S] = P.useState(-1), [b, x] = P.useState(-1), [w, A] = P.useState(!1), M = P.useRef(0), [k, H] = Po({
    controlled: v,
    default: r ?? c,
    name: "Slider"
  }), U = d && ((le, ye, be) => {
    const ge = le.nativeEvent || le, ue = new ge.constructor(ge.type, ge);
    Object.defineProperty(ue, "target", {
      writable: !0,
      value: {
        value: ye,
        name: u
      }
    }), d(ue, ye, be);
  }), K = Array.isArray(k);
  let z = K ? k.slice().sort(dg) : [k];
  z = z.map((le) => yi(le, c, l));
  const G = a === !0 && g !== null ? [...Array(Math.floor((l - c) / g) + 1)].map((le, ye) => ({
    value: c + g * ye
  })) : a || [], X = G.map((le) => le.value), {
    isFocusVisibleRef: J,
    onBlur: Z,
    onFocus: ne,
    ref: D
  } = vu(), [N, W] = P.useState(-1), F = P.useRef(), T = Nt(D, F), R = Nt(m, T), B = (le) => (ye) => {
    var be;
    const ge = Number(ye.currentTarget.getAttribute("data-index"));
    ne(ye), J.current === !0 && W(ge), x(ge), le == null || (be = le.onFocus) == null || be.call(le, ye);
  }, Q = (le) => (ye) => {
    var be;
    Z(ye), J.current === !1 && W(-1), x(-1), le == null || (be = le.onBlur) == null || be.call(le, ye);
  };
  gr(() => {
    if (n && F.current.contains(document.activeElement)) {
      var le;
      (le = document.activeElement) == null || le.blur();
    }
  }, [n]), n && E !== -1 && S(-1), n && N !== -1 && W(-1);
  const Y = (le) => (ye) => {
    var be;
    (be = le.onChange) == null || be.call(le, ye);
    const ge = Number(ye.currentTarget.getAttribute("data-index")), ue = z[ge], We = X.indexOf(ue);
    let Ne = ye.target.valueAsNumber;
    if (G && g == null) {
      const Xe = X[X.length - 1];
      Ne > Xe ? Ne = Xe : Ne < X[0] ? Ne = X[0] : Ne = Ne < ue ? X[We - 1] : X[We + 1];
    }
    if (Ne = yi(Ne, c, l), K) {
      o && (Ne = yi(Ne, z[ge - 1] || -1 / 0, z[ge + 1] || 1 / 0));
      const Xe = Ne;
      Ne = Wp({
        values: z,
        newValue: Ne,
        index: ge
      });
      let Je = ge;
      o || (Je = Ne.indexOf(Xe)), Ns({
        sliderRef: F,
        activeIndex: Je
      });
    }
    H(Ne), W(ge), U && !As(Ne, k) && U(ye, Ne, ge), p && p(ye, Ne);
  }, oe = P.useRef();
  let ie = f;
  i && f === "horizontal" && (ie += "-reverse");
  const ce = ({
    finger: le,
    move: ye = !1
  }) => {
    const {
      current: be
    } = F, {
      width: ge,
      height: ue,
      bottom: We,
      left: Ne
    } = be.getBoundingClientRect();
    let Xe;
    ie.indexOf("vertical") === 0 ? Xe = (We - le.y) / ue : Xe = (le.x - Ne) / ge, ie.indexOf("-reverse") !== -1 && (Xe = 1 - Xe);
    let Je;
    if (Je = Cx(Xe, c, l), g)
      Je = Rx(Je, g, c);
    else {
      const re = Up(X, Je);
      Je = X[re];
    }
    Je = yi(Je, c, l);
    let Ot = 0;
    if (K) {
      ye ? Ot = oe.current : Ot = Up(z, Je), o && (Je = yi(Je, z[Ot - 1] || -1 / 0, z[Ot + 1] || 1 / 0));
      const re = Je;
      Je = Wp({
        values: z,
        newValue: Je,
        index: Ot
      }), o && ye || (Ot = Je.indexOf(re), oe.current = Ot);
    }
    return {
      newValue: Je,
      activeIndex: Ot
    };
  }, q = sr((le) => {
    const ye = Is(le, $);
    if (!ye)
      return;
    if (M.current += 1, le.type === "mousemove" && le.buttons === 0) {
      pe(le);
      return;
    }
    const {
      newValue: be,
      activeIndex: ge
    } = ce({
      finger: ye,
      move: !0
    });
    Ns({
      sliderRef: F,
      activeIndex: ge,
      setActive: S
    }), H(be), !w && M.current > Ox && A(!0), U && !As(be, k) && U(le, be, ge);
  }), pe = sr((le) => {
    const ye = Is(le, $);
    if (A(!1), !ye)
      return;
    const {
      newValue: be
    } = ce({
      finger: ye,
      move: !0
    });
    S(-1), le.type === "touchend" && x(-1), p && p(le, be), $.current = void 0, fe();
  }), te = sr((le) => {
    if (n)
      return;
    ic() || le.preventDefault();
    const ye = le.changedTouches[0];
    ye != null && ($.current = ye.identifier);
    const be = Is(le, $);
    if (be !== !1) {
      const {
        newValue: ue,
        activeIndex: We
      } = ce({
        finger: be
      });
      Ns({
        sliderRef: F,
        activeIndex: We,
        setActive: S
      }), H(ue), U && !As(ue, k) && U(le, ue, We);
    }
    M.current = 0;
    const ge = jt(F.current);
    ge.addEventListener("touchmove", q), ge.addEventListener("touchend", pe);
  }), fe = P.useCallback(() => {
    const le = jt(F.current);
    le.removeEventListener("mousemove", q), le.removeEventListener("mouseup", pe), le.removeEventListener("touchmove", q), le.removeEventListener("touchend", pe);
  }, [pe, q]);
  P.useEffect(() => {
    const {
      current: le
    } = F;
    return le.addEventListener("touchstart", te, {
      passive: ic()
    }), () => {
      le.removeEventListener("touchstart", te, {
        passive: ic()
      }), fe();
    };
  }, [fe, te]), P.useEffect(() => {
    n && fe();
  }, [n, fe]);
  const Pe = (le) => (ye) => {
    var be;
    if ((be = le.onMouseDown) == null || be.call(le, ye), n || ye.defaultPrevented || ye.button !== 0)
      return;
    ye.preventDefault();
    const ge = Is(ye, $);
    if (ge !== !1) {
      const {
        newValue: We,
        activeIndex: Ne
      } = ce({
        finger: ge
      });
      Ns({
        sliderRef: F,
        activeIndex: Ne,
        setActive: S
      }), H(We), U && !As(We, k) && U(ye, We, Ne);
    }
    M.current = 0;
    const ue = jt(F.current);
    ue.addEventListener("mousemove", q), ue.addEventListener("mouseup", pe);
  }, je = $a(K ? z[0] : c, c, l), Ve = $a(z[z.length - 1], c, l) - je, st = (le = {}) => {
    const ye = ki(le), be = {
      onMouseDown: Pe(ye || {})
    }, ge = C({}, ye, be);
    return C({}, le, {
      ref: R
    }, ge);
  }, ke = (le) => (ye) => {
    var be;
    (be = le.onMouseOver) == null || be.call(le, ye);
    const ge = Number(ye.currentTarget.getAttribute("data-index"));
    x(ge);
  }, De = (le) => (ye) => {
    var be;
    (be = le.onMouseLeave) == null || be.call(le, ye), x(-1);
  };
  return {
    active: E,
    axis: ie,
    axisProps: Ix,
    dragging: w,
    focusedThumbIndex: N,
    getHiddenInputProps: (le = {}) => {
      var ye;
      const be = ki(le), ge = {
        onChange: Y(be || {}),
        onFocus: B(be || {}),
        onBlur: Q(be || {})
      }, ue = C({}, be, ge);
      return C({
        tabIndex: y,
        "aria-labelledby": t,
        "aria-orientation": f,
        "aria-valuemax": h(l),
        "aria-valuemin": h(c),
        name: u,
        type: "range",
        min: e.min,
        max: e.max,
        step: e.step === null && e.marks ? "any" : (ye = e.step) != null ? ye : void 0,
        disabled: n
      }, le, ue, {
        style: C({}, w1, {
          direction: i ? "rtl" : "ltr",
          // So that VoiceOver's focus indicator matches the thumb's dimensions
          width: "100%",
          height: "100%"
        })
      });
    },
    getRootProps: st,
    getThumbProps: (le = {}) => {
      const ye = ki(le), be = {
        onMouseOver: ke(ye || {}),
        onMouseLeave: De(ye || {})
      };
      return C({}, le, ye, be);
    },
    marks: G,
    open: b,
    range: K,
    rootRef: R,
    trackLeap: Ve,
    trackOffset: je,
    values: z,
    getThumbStyle: (le) => ({
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: E !== -1 && E !== le ? "none" : void 0
    })
  };
}
const jx = ["onChange", "maxRows", "minRows", "style", "value"];
function ks(e) {
  return parseInt(e, 10) || 0;
}
const kx = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function qp(e) {
  return e == null || Object.keys(e).length === 0 || e.outerHeightStyle === 0 && !e.overflow;
}
const fg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    onChange: n,
    maxRows: o,
    minRows: i = 1,
    style: a,
    value: l
  } = t, c = Ee(t, jx), {
    current: u
  } = P.useRef(l != null), d = P.useRef(null), p = Nt(r, d), f = P.useRef(null), m = P.useRef(0), [h, g] = P.useState({
    outerHeightStyle: 0
  }), y = P.useCallback(() => {
    const S = d.current, x = Br(S).getComputedStyle(S);
    if (x.width === "0px")
      return {
        outerHeightStyle: 0
      };
    const w = f.current;
    w.style.width = x.width, w.value = S.value || t.placeholder || "x", w.value.slice(-1) === `
` && (w.value += " ");
    const A = x.boxSizing, M = ks(x.paddingBottom) + ks(x.paddingTop), k = ks(x.borderBottomWidth) + ks(x.borderTopWidth), H = w.scrollHeight;
    w.value = "x";
    const U = w.scrollHeight;
    let K = H;
    i && (K = Math.max(Number(i) * U, K)), o && (K = Math.min(Number(o) * U, K)), K = Math.max(K, U);
    const z = K + (A === "border-box" ? M + k : 0), G = Math.abs(K - H) <= 1;
    return {
      outerHeightStyle: z,
      overflow: G
    };
  }, [o, i, t.placeholder]), v = (S, b) => {
    const {
      outerHeightStyle: x,
      overflow: w
    } = b;
    return m.current < 20 && (x > 0 && Math.abs((S.outerHeightStyle || 0) - x) > 1 || S.overflow !== w) ? (m.current += 1, {
      overflow: w,
      outerHeightStyle: x
    }) : (process.env.NODE_ENV !== "production" && m.current === 20 && console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join(`
`)), S);
  }, $ = P.useCallback(() => {
    const S = y();
    qp(S) || g((b) => v(b, S));
  }, [y]);
  gr(() => {
    const S = () => {
      const U = y();
      qp(U) || by.flushSync(() => {
        g((K) => v(K, U));
      });
    }, b = () => {
      m.current = 0, S();
    };
    let x;
    const w = () => {
      cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        b();
      });
    }, A = is(b), M = d.current, k = Br(M);
    k.addEventListener("resize", A);
    let H;
    return typeof ResizeObserver < "u" && (H = new ResizeObserver(process.env.NODE_ENV === "test" ? w : b), H.observe(M)), () => {
      A.clear(), cancelAnimationFrame(x), k.removeEventListener("resize", A), H && H.disconnect();
    };
  }, [y]), gr(() => {
    $();
  }), P.useEffect(() => {
    m.current = 0;
  }, [l]);
  const E = (S) => {
    m.current = 0, u || $(), n && n(S);
  };
  return /* @__PURE__ */ _.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ _.jsx("textarea", C({
      value: l,
      onChange: E,
      ref: p,
      rows: i,
      style: C({
        height: h.outerHeightStyle,
        // Need a large enough difference to allow scrolling.
        // This prevents infinite rendering loop.
        overflow: h.overflow ? "hidden" : void 0
      }, a)
    }, c)), /* @__PURE__ */ _.jsx("textarea", {
      "aria-hidden": !0,
      className: t.className,
      readOnly: !0,
      ref: f,
      tabIndex: -1,
      style: C({}, kx.shadow, a, {
        paddingTop: 0,
        paddingBottom: 0
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (fg.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  className: s.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: s.oneOfType([s.number, s.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: s.oneOfType([s.number, s.string]),
  /**
   * @ignore
   */
  onChange: s.func,
  /**
   * @ignore
   */
  placeholder: s.string,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * @ignore
   */
  value: s.oneOfType([s.arrayOf(s.string), s.number, s.string])
});
function Mx(e) {
  return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
}
function Dx(e, t, r, n = {}, o = () => {
}) {
  const {
    ease: i = Mx,
    duration: a = 300
    // standard
  } = n;
  let l = null;
  const c = t[e];
  let u = !1;
  const d = () => {
    u = !0;
  }, p = (f) => {
    if (u) {
      o(new Error("Animation cancelled"));
      return;
    }
    l === null && (l = f);
    const m = Math.min(1, (f - l) / a);
    if (t[e] = i(m) * (r - c) + c, m >= 1) {
      requestAnimationFrame(() => {
        o(null);
      });
      return;
    }
    requestAnimationFrame(p);
  };
  return c === r ? (o(new Error("Element already at target position")), d) : (requestAnimationFrame(p), d);
}
function Fx(e) {
  return Fe("MuiSvgIcon", e);
}
Le("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Lx = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Bx = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${xe(t)}`, `fontSize${xe(r)}`]
  };
  return ze(o, Fx, n);
}, Vx = he("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${xe(r.color)}`], t[`fontSize${xe(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, i, a, l, c, u, d, p, f, m, h;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (n = r.create) == null ? void 0 : n.call(r, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((i = e.typography) == null || (a = i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? p : {
      action: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), ku = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: p,
    viewBox: f = "0 0 24 24"
  } = n, m = Ee(n, Lx), h = /* @__PURE__ */ P.isValidElement(o) && o.type === "svg", g = C({}, n, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: f,
    hasSvgAsChild: h
  }), y = {};
  d || (y.viewBox = f);
  const v = Bx(g);
  return /* @__PURE__ */ _.jsxs(Vx, C({
    as: l,
    className: Se(v.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: r
  }, y, m, h && o.props, {
    ownerState: g,
    children: [h ? o.props.children : o, p ? /* @__PURE__ */ _.jsx("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (ku.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: s.oneOfType([s.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: s.oneOfType([s.oneOf(["inherit", "large", "medium", "small"]), s.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: s.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: s.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: s.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: s.string
});
ku.muiName = "SvgIcon";
const Kp = ku;
function en(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ _.jsx(Kp, C({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Kp.muiName, /* @__PURE__ */ P.memo(/* @__PURE__ */ P.forwardRef(r));
}
const zx = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), $u.configure(e);
  }
}, Ux = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: xe,
  createChainedFunction: da,
  createSvgIcon: en,
  debounce: is,
  deprecatedPropType: m1,
  isMuiElement: Eo,
  ownerDocument: jt,
  ownerWindow: Br,
  requirePropFactory: Cy,
  setRef: fa,
  unstable_ClassNameGenerator: zx,
  unstable_useEnhancedEffect: gr,
  unstable_useId: Ki,
  unsupportedProp: Py,
  useControlled: Po,
  useEventCallback: sr,
  useForkRef: Nt,
  useIsFocusVisible: vu
}, Symbol.toStringTag, { value: "Module" })), Wx = ["onChange"], qx = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll"
};
function pg(e) {
  const {
    onChange: t
  } = e, r = Ee(e, Wx), n = P.useRef(), o = P.useRef(null), i = () => {
    n.current = o.current.offsetHeight - o.current.clientHeight;
  };
  return gr(() => {
    const a = is(() => {
      const c = n.current;
      i(), c !== n.current && t(n.current);
    }), l = Br(o.current);
    return l.addEventListener("resize", a), () => {
      a.clear(), l.removeEventListener("resize", a);
    };
  }, [t]), P.useEffect(() => {
    i(), t(n.current);
  }, [t]), /* @__PURE__ */ _.jsx("div", C({
    style: qx,
    ref: o
  }, r));
}
process.env.NODE_ENV !== "production" && (pg.propTypes = {
  onChange: s.func.isRequired
});
const Kx = en(/* @__PURE__ */ _.jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), "KeyboardArrowLeft"), Hx = en(/* @__PURE__ */ _.jsx("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), "KeyboardArrowRight");
function zc(e, t) {
  return zc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, zc(e, t);
}
function mg(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, zc(e, t);
}
const Hp = {
  disabled: !1
};
var Gx = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
  enter: s.number,
  exit: s.number,
  appear: s.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && s.oneOfType([s.string, s.shape({
  enter: s.string,
  exit: s.string,
  active: s.string
}), s.shape({
  enter: s.string,
  enterDone: s.string,
  enterActive: s.string,
  exit: s.string,
  exitDone: s.string,
  exitActive: s.string
})]);
const Sa = hr.createContext(null);
var Yx = function(t) {
  return t.scrollTop;
}, Ri = "unmounted", An = "exited", jn = "entering", go = "entered", Uc = "exiting", tn = /* @__PURE__ */ function(e) {
  mg(t, e);
  function t(n, o) {
    var i;
    i = e.call(this, n, o) || this;
    var a = o, l = a && !a.isMounting ? n.enter : n.appear, c;
    return i.appearStatus = null, n.in ? l ? (c = An, i.appearStatus = jn) : c = go : n.unmountOnExit || n.mountOnEnter ? c = Ri : c = An, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === Ri ? {
      status: An
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== jn && a !== go && (i = jn) : (a === jn || a === go) && (i = Uc);
    }
    this.updateStatus(!1, i);
  }, r.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, r.getTimeouts = function() {
    var o = this.props.timeout, i, a, l;
    return i = a = l = o, o != null && typeof o != "number" && (i = o.exit, a = o.enter, l = o.appear !== void 0 ? o.appear : a), {
      exit: i,
      enter: a,
      appear: l
    };
  }, r.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === jn) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : Cs.findDOMNode(this);
          a && Yx(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === An && this.setState({
        status: Ri
      });
  }, r.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Cs.findDOMNode(this), l], u = c[0], d = c[1], p = this.getTimeouts(), f = l ? p.appear : p.enter;
    if (!o && !a || Hp.disabled) {
      this.safeSetState({
        status: go
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: jn
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: go
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Cs.findDOMNode(this);
    if (!i || Hp.disabled) {
      this.safeSetState({
        status: An
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Uc
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: An
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, r.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, r.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, r.setNextCallback = function(o) {
    var i = this, a = !0;
    return this.nextCallback = function(l) {
      a && (a = !1, i.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, r.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var a = this.props.nodeRef ? this.props.nodeRef.current : Cs.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!a || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], u = c[0], d = c[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === Ri)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = Ee(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ hr.createElement(Sa.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : hr.cloneElement(hr.Children.only(a), l))
    );
  }, t;
}(hr.Component);
tn.contextType = Sa;
tn.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: s.shape({
    current: typeof Element > "u" ? s.any : function(e, t, r, n, o, i) {
      var a = e[t];
      return s.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, t, r, n, o, i);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: s.oneOfType([s.func.isRequired, s.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: s.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: s.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: s.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: s.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: s.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: s.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(t) {
    var r = Gx;
    t.addEndListener || (r = r.isRequired);
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      o[i - 1] = arguments[i];
    return r.apply(void 0, [t].concat(o));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: s.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: s.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: s.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: s.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: s.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: s.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: s.func
} : {};
function po() {
}
tn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: po,
  onEntering: po,
  onEntered: po,
  onExit: po,
  onExiting: po,
  onExited: po
};
tn.UNMOUNTED = Ri;
tn.EXITED = An;
tn.ENTERING = jn;
tn.ENTERED = go;
tn.EXITING = Uc;
const hg = tn;
function Xx(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Mu(e, t) {
  var r = function(i) {
    return t && Gs(i) ? t(i) : i;
  }, n = /* @__PURE__ */ Object.create(null);
  return e && M$.map(e, function(o) {
    return o;
  }).forEach(function(o) {
    n[o.key] = r(o);
  }), n;
}
function Jx(e, t) {
  e = e || {}, t = t || {};
  function r(d) {
    return d in t ? t[d] : e[d];
  }
  var n = /* @__PURE__ */ Object.create(null), o = [];
  for (var i in e)
    i in t ? o.length && (n[i] = o, o = []) : o.push(i);
  var a, l = {};
  for (var c in t) {
    if (n[c])
      for (a = 0; a < n[c].length; a++) {
        var u = n[c][a];
        l[n[c][a]] = r(u);
      }
    l[c] = r(c);
  }
  for (a = 0; a < o.length; a++)
    l[o[a]] = r(o[a]);
  return l;
}
function Vn(e, t, r) {
  return r[t] != null ? r[t] : e.props[t];
}
function Zx(e, t) {
  return Mu(e.children, function(r) {
    return Ys(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: Vn(r, "appear", e),
      enter: Vn(r, "enter", e),
      exit: Vn(r, "exit", e)
    });
  });
}
function Qx(e, t, r) {
  var n = Mu(e.children), o = Jx(t, n);
  return Object.keys(o).forEach(function(i) {
    var a = o[i];
    if (Gs(a)) {
      var l = i in t, c = i in n, u = t[i], d = Gs(u) && !u.props.in;
      c && (!l || d) ? o[i] = Ys(a, {
        onExited: r.bind(null, a),
        in: !0,
        exit: Vn(a, "exit", e),
        enter: Vn(a, "enter", e)
      }) : !c && l && !d ? o[i] = Ys(a, {
        in: !1
      }) : c && l && Gs(u) && (o[i] = Ys(a, {
        onExited: r.bind(null, a),
        in: u.props.in,
        exit: Vn(a, "exit", e),
        enter: Vn(a, "enter", e)
      }));
    }
  }), o;
}
var ew = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, tw = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, Du = /* @__PURE__ */ function(e) {
  mg(t, e);
  function t(n, o) {
    var i;
    i = e.call(this, n, o) || this;
    var a = i.handleExited.bind(Xx(i));
    return i.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: a,
      firstRender: !0
    }, i;
  }
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, r.componentWillUnmount = function() {
    this.mounted = !1;
  }, t.getDerivedStateFromProps = function(o, i) {
    var a = i.children, l = i.handleExited, c = i.firstRender;
    return {
      children: c ? Zx(o, l) : Qx(o, a, l),
      firstRender: !1
    };
  }, r.handleExited = function(o, i) {
    var a = Mu(this.props.children);
    o.key in a || (o.props.onExited && o.props.onExited(i), this.mounted && this.setState(function(l) {
      var c = C({}, l.children);
      return delete c[o.key], {
        children: c
      };
    }));
  }, r.render = function() {
    var o = this.props, i = o.component, a = o.childFactory, l = Ee(o, ["component", "childFactory"]), c = this.state.contextValue, u = ew(this.state.children).map(a);
    return delete l.appear, delete l.enter, delete l.exit, i === null ? /* @__PURE__ */ hr.createElement(Sa.Provider, {
      value: c
    }, u) : /* @__PURE__ */ hr.createElement(Sa.Provider, {
      value: c
    }, /* @__PURE__ */ hr.createElement(i, l, u));
  }, t;
}(hr.Component);
Du.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: s.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: s.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: s.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: s.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: s.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: s.func
} : {};
Du.defaultProps = tw;
const rw = Du;
function yg(e) {
  const {
    className: t,
    classes: r,
    pulsate: n = !1,
    rippleX: o,
    rippleY: i,
    rippleSize: a,
    in: l,
    onExited: c,
    timeout: u
  } = e, [d, p] = P.useState(!1), f = Se(t, r.ripple, r.rippleVisible, n && r.ripplePulsate), m = {
    width: a,
    height: a,
    top: -(a / 2) + i,
    left: -(a / 2) + o
  }, h = Se(r.child, d && r.childLeaving, n && r.childPulsate);
  return !l && !d && p(!0), P.useEffect(() => {
    if (!l && c != null) {
      const g = setTimeout(c, u);
      return () => {
        clearTimeout(g);
      };
    }
  }, [c, l, u]), /* @__PURE__ */ _.jsx("span", {
    className: f,
    style: m,
    children: /* @__PURE__ */ _.jsx("span", {
      className: h
    })
  });
}
process.env.NODE_ENV !== "production" && (yg.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object.isRequired,
  className: s.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: s.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: s.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: s.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: s.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: s.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: s.number,
  /**
   * exit delay
   */
  timeout: s.number.isRequired
});
const nw = Le("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), fr = nw, ow = ["center", "classes", "className"];
let fl = (e) => e, Gp, Yp, Xp, Jp;
const Wc = 550, iw = 80, sw = Pu(Gp || (Gp = fl`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), aw = Pu(Yp || (Yp = fl`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), lw = Pu(Xp || (Xp = fl`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), cw = he("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), uw = he(yg, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(Jp || (Jp = fl`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), fr.rippleVisible, sw, Wc, ({
  theme: e
}) => e.transitions.easing.easeInOut, fr.ripplePulsate, ({
  theme: e
}) => e.transitions.duration.shorter, fr.child, fr.childLeaving, aw, Wc, ({
  theme: e
}) => e.transitions.easing.easeInOut, fr.childPulsate, lw, ({
  theme: e
}) => e.transitions.easing.easeInOut), gg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: o = !1,
    classes: i = {},
    className: a
  } = n, l = Ee(n, ow), [c, u] = P.useState([]), d = P.useRef(0), p = P.useRef(null);
  P.useEffect(() => {
    p.current && (p.current(), p.current = null);
  }, [c]);
  const f = P.useRef(!1), m = P.useRef(0), h = P.useRef(null), g = P.useRef(null);
  P.useEffect(() => () => {
    m.current && clearTimeout(m.current);
  }, []);
  const y = P.useCallback((S) => {
    const {
      pulsate: b,
      rippleX: x,
      rippleY: w,
      rippleSize: A,
      cb: M
    } = S;
    u((k) => [...k, /* @__PURE__ */ _.jsx(uw, {
      classes: {
        ripple: Se(i.ripple, fr.ripple),
        rippleVisible: Se(i.rippleVisible, fr.rippleVisible),
        ripplePulsate: Se(i.ripplePulsate, fr.ripplePulsate),
        child: Se(i.child, fr.child),
        childLeaving: Se(i.childLeaving, fr.childLeaving),
        childPulsate: Se(i.childPulsate, fr.childPulsate)
      },
      timeout: Wc,
      pulsate: b,
      rippleX: x,
      rippleY: w,
      rippleSize: A
    }, d.current)]), d.current += 1, p.current = M;
  }, [i]), v = P.useCallback((S = {}, b = {}, x = () => {
  }) => {
    const {
      pulsate: w = !1,
      center: A = o || b.pulsate,
      fakeElement: M = !1
      // For test purposes
    } = b;
    if ((S == null ? void 0 : S.type) === "mousedown" && f.current) {
      f.current = !1;
      return;
    }
    (S == null ? void 0 : S.type) === "touchstart" && (f.current = !0);
    const k = M ? null : g.current, H = k ? k.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let U, K, z;
    if (A || S === void 0 || S.clientX === 0 && S.clientY === 0 || !S.clientX && !S.touches)
      U = Math.round(H.width / 2), K = Math.round(H.height / 2);
    else {
      const {
        clientX: G,
        clientY: X
      } = S.touches && S.touches.length > 0 ? S.touches[0] : S;
      U = Math.round(G - H.left), K = Math.round(X - H.top);
    }
    if (A)
      z = Math.sqrt((2 * H.width ** 2 + H.height ** 2) / 3), z % 2 === 0 && (z += 1);
    else {
      const G = Math.max(Math.abs((k ? k.clientWidth : 0) - U), U) * 2 + 2, X = Math.max(Math.abs((k ? k.clientHeight : 0) - K), K) * 2 + 2;
      z = Math.sqrt(G ** 2 + X ** 2);
    }
    S != null && S.touches ? h.current === null && (h.current = () => {
      y({
        pulsate: w,
        rippleX: U,
        rippleY: K,
        rippleSize: z,
        cb: x
      });
    }, m.current = setTimeout(() => {
      h.current && (h.current(), h.current = null);
    }, iw)) : y({
      pulsate: w,
      rippleX: U,
      rippleY: K,
      rippleSize: z,
      cb: x
    });
  }, [o, y]), $ = P.useCallback(() => {
    v({}, {
      pulsate: !0
    });
  }, [v]), E = P.useCallback((S, b) => {
    if (clearTimeout(m.current), (S == null ? void 0 : S.type) === "touchend" && h.current) {
      h.current(), h.current = null, m.current = setTimeout(() => {
        E(S, b);
      });
      return;
    }
    h.current = null, u((x) => x.length > 0 ? x.slice(1) : x), p.current = b;
  }, []);
  return P.useImperativeHandle(r, () => ({
    pulsate: $,
    start: v,
    stop: E
  }), [$, v, E]), /* @__PURE__ */ _.jsx(cw, C({
    className: Se(fr.root, i.root, a),
    ref: g
  }, l, {
    children: /* @__PURE__ */ _.jsx(rw, {
      component: null,
      exit: !0,
      children: c
    })
  }));
});
process.env.NODE_ENV !== "production" && (gg.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: s.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string
});
const dw = gg;
function fw(e) {
  return Fe("MuiButtonBase", e);
}
const pw = Le("MuiButtonBase", ["root", "disabled", "focusVisible"]), mw = pw, hw = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"], yw = (e) => {
  const {
    disabled: t,
    focusVisible: r,
    focusVisibleClassName: n,
    classes: o
  } = e, a = ze({
    root: ["root", t && "disabled", r && "focusVisible"]
  }, fw, o);
  return r && n && (a.root += ` ${n}`), a;
}, gw = he("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${mw.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), vg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiButtonBase"
  }), {
    action: o,
    centerRipple: i = !1,
    children: a,
    className: l,
    component: c = "button",
    disabled: u = !1,
    disableRipple: d = !1,
    disableTouchRipple: p = !1,
    focusRipple: f = !1,
    LinkComponent: m = "a",
    onBlur: h,
    onClick: g,
    onContextMenu: y,
    onDragLeave: v,
    onFocus: $,
    onFocusVisible: E,
    onKeyDown: S,
    onKeyUp: b,
    onMouseDown: x,
    onMouseLeave: w,
    onMouseUp: A,
    onTouchEnd: M,
    onTouchMove: k,
    onTouchStart: H,
    tabIndex: U = 0,
    TouchRippleProps: K,
    touchRippleRef: z,
    type: G
  } = n, X = Ee(n, hw), J = P.useRef(null), Z = P.useRef(null), ne = Nt(Z, z), {
    isFocusVisibleRef: D,
    onFocus: N,
    onBlur: W,
    ref: F
  } = vu(), [T, R] = P.useState(!1);
  u && T && R(!1), P.useImperativeHandle(o, () => ({
    focusVisible: () => {
      R(!0), J.current.focus();
    }
  }), []);
  const [B, Q] = P.useState(!1);
  P.useEffect(() => {
    Q(!0);
  }, []);
  const Y = B && !d && !u;
  P.useEffect(() => {
    T && f && !d && B && Z.current.pulsate();
  }, [d, f, T, B]);
  function oe(ue, We, Ne = p) {
    return sr((Xe) => (We && We(Xe), !Ne && Z.current && Z.current[ue](Xe), !0));
  }
  const ie = oe("start", x), ce = oe("stop", y), q = oe("stop", v), pe = oe("stop", A), te = oe("stop", (ue) => {
    T && ue.preventDefault(), w && w(ue);
  }), fe = oe("start", H), Pe = oe("stop", M), je = oe("stop", k), Ve = oe("stop", (ue) => {
    W(ue), D.current === !1 && R(!1), h && h(ue);
  }, !1), st = sr((ue) => {
    J.current || (J.current = ue.currentTarget), N(ue), D.current === !0 && (R(!0), E && E(ue)), $ && $(ue);
  }), ke = () => {
    const ue = J.current;
    return c && c !== "button" && !(ue.tagName === "A" && ue.href);
  }, De = P.useRef(!1), Qe = sr((ue) => {
    f && !De.current && T && Z.current && ue.key === " " && (De.current = !0, Z.current.stop(ue, () => {
      Z.current.start(ue);
    })), ue.target === ue.currentTarget && ke() && ue.key === " " && ue.preventDefault(), S && S(ue), ue.target === ue.currentTarget && ke() && ue.key === "Enter" && !u && (ue.preventDefault(), g && g(ue));
  }), Ge = sr((ue) => {
    f && ue.key === " " && Z.current && T && !ue.defaultPrevented && (De.current = !1, Z.current.stop(ue, () => {
      Z.current.pulsate(ue);
    })), b && b(ue), g && ue.target === ue.currentTarget && ke() && ue.key === " " && !ue.defaultPrevented && g(ue);
  });
  let Ue = c;
  Ue === "button" && (X.href || X.to) && (Ue = m);
  const le = {};
  Ue === "button" ? (le.type = G === void 0 ? "button" : G, le.disabled = u) : (!X.href && !X.to && (le.role = "button"), u && (le["aria-disabled"] = u));
  const ye = Nt(r, F, J);
  process.env.NODE_ENV !== "production" && P.useEffect(() => {
    Y && !Z.current && console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join(`
`));
  }, [Y]);
  const be = C({}, n, {
    centerRipple: i,
    component: c,
    disabled: u,
    disableRipple: d,
    disableTouchRipple: p,
    focusRipple: f,
    tabIndex: U,
    focusVisible: T
  }), ge = yw(be);
  return /* @__PURE__ */ _.jsxs(gw, C({
    as: Ue,
    className: Se(ge.root, l),
    ownerState: be,
    onBlur: Ve,
    onClick: g,
    onContextMenu: ce,
    onFocus: st,
    onKeyDown: Qe,
    onKeyUp: Ge,
    onMouseDown: ie,
    onMouseLeave: te,
    onMouseUp: pe,
    onDragLeave: q,
    onTouchEnd: Pe,
    onTouchMove: je,
    onTouchStart: fe,
    ref: ye,
    tabIndex: u ? -1 : U,
    type: G
  }, le, X, {
    children: [a, Y ? (
      /* TouchRipple is only needed client-side, x2 boost on the server. */
      /* @__PURE__ */ _.jsx(dw, C({
        ref: ne,
        center: i
      }, K))
    ) : null]
  }));
});
process.env.NODE_ENV !== "production" && (vg.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: rr,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: s.bool,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: Ua,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: s.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: s.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: s.string,
  /**
   * @ignore
   */
  href: s.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: s.elementType,
  /**
   * @ignore
   */
  onBlur: s.func,
  /**
   * @ignore
   */
  onClick: s.func,
  /**
   * @ignore
   */
  onContextMenu: s.func,
  /**
   * @ignore
   */
  onDragLeave: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: s.func,
  /**
   * @ignore
   */
  onKeyDown: s.func,
  /**
   * @ignore
   */
  onKeyUp: s.func,
  /**
   * @ignore
   */
  onMouseDown: s.func,
  /**
   * @ignore
   */
  onMouseLeave: s.func,
  /**
   * @ignore
   */
  onMouseUp: s.func,
  /**
   * @ignore
   */
  onTouchEnd: s.func,
  /**
   * @ignore
   */
  onTouchMove: s.func,
  /**
   * @ignore
   */
  onTouchStart: s.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * @default 0
   */
  tabIndex: s.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: s.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: s.oneOfType([s.func, s.shape({
    current: s.shape({
      pulsate: s.func.isRequired,
      start: s.func.isRequired,
      stop: s.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: s.oneOfType([s.oneOf(["button", "reset", "submit"]), s.string])
});
const Xn = vg;
function vw(e) {
  return Fe("MuiTabScrollButton", e);
}
const bw = Le("MuiTabScrollButton", ["root", "vertical", "horizontal", "disabled"]), $w = bw, Sw = ["className", "slots", "slotProps", "direction", "orientation", "disabled"], Ew = (e) => {
  const {
    classes: t,
    orientation: r,
    disabled: n
  } = e;
  return ze({
    root: ["root", r, n && "disabled"]
  }, vw, t);
}, _w = he(Xn, {
  name: "MuiTabScrollButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.orientation && t[r.orientation]];
  }
})(({
  ownerState: e
}) => C({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${$w.disabled}`]: {
    opacity: 0
  }
}, e.orientation === "vertical" && {
  width: "100%",
  height: 40,
  "& svg": {
    transform: `rotate(${e.isRtl ? -90 : 90}deg)`
  }
})), bg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = He({
    props: t,
    name: "MuiTabScrollButton"
  }), {
    className: a,
    slots: l = {},
    slotProps: c = {},
    direction: u
  } = i, d = Ee(i, Sw), f = Sn().direction === "rtl", m = C({
    isRtl: f
  }, i), h = Ew(m), g = (n = l.StartScrollButtonIcon) != null ? n : Kx, y = (o = l.EndScrollButtonIcon) != null ? o : Hx, v = Dt({
    elementType: g,
    externalSlotProps: c.startScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: m
  }), $ = Dt({
    elementType: y,
    externalSlotProps: c.endScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: m
  });
  return /* @__PURE__ */ _.jsx(_w, C({
    component: "div",
    className: Se(h.root, a),
    ref: r,
    role: null,
    ownerState: m,
    tabIndex: null
  }, d, {
    children: u === "left" ? /* @__PURE__ */ _.jsx(g, C({}, v)) : /* @__PURE__ */ _.jsx(y, C({}, $))
  }));
});
process.env.NODE_ENV !== "production" && (bg.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The direction the button should indicate.
   */
  direction: s.oneOf(["left", "right"]).isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * The component orientation (layout flow direction).
   */
  orientation: s.oneOf(["horizontal", "vertical"]).isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps: s.shape({
    endScrollButtonIcon: s.oneOfType([s.func, s.object]),
    startScrollButtonIcon: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    EndScrollButtonIcon: s.elementType,
    StartScrollButtonIcon: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const xw = bg;
function ww(e) {
  return Fe("MuiTabs", e);
}
const Tw = Le("MuiTabs", ["root", "vertical", "flexContainer", "flexContainerVertical", "centered", "scroller", "fixed", "scrollableX", "scrollableY", "hideScrollbar", "scrollButtons", "scrollButtonsHideMobile", "indicator"]), sc = Tw, Ow = ["aria-label", "aria-labelledby", "action", "centered", "children", "className", "component", "allowScrollButtonsMobile", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "slots", "slotProps", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant", "visibleScrollbar"], Zp = (e, t) => e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : e.firstChild, Qp = (e, t) => e === t ? e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : e.lastChild, Ms = (e, t, r) => {
  let n = !1, o = r(e, t);
  for (; o; ) {
    if (o === e.firstChild) {
      if (n)
        return;
      n = !0;
    }
    const i = o.disabled || o.getAttribute("aria-disabled") === "true";
    if (!o.hasAttribute("tabindex") || i)
      o = r(e, o);
    else {
      o.focus();
      return;
    }
  }
}, Cw = (e) => {
  const {
    vertical: t,
    fixed: r,
    hideScrollbar: n,
    scrollableX: o,
    scrollableY: i,
    centered: a,
    scrollButtonsHideMobile: l,
    classes: c
  } = e;
  return ze({
    root: ["root", t && "vertical"],
    scroller: ["scroller", r && "fixed", n && "hideScrollbar", o && "scrollableX", i && "scrollableY"],
    flexContainer: ["flexContainer", t && "flexContainerVertical", a && "centered"],
    indicator: ["indicator"],
    scrollButtons: ["scrollButtons", l && "scrollButtonsHideMobile"],
    scrollableX: [o && "scrollableX"],
    hideScrollbar: [n && "hideScrollbar"]
  }, ww, c);
}, Pw = he("div", {
  name: "MuiTabs",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [{
      [`& .${sc.scrollButtons}`]: t.scrollButtons
    }, {
      [`& .${sc.scrollButtons}`]: r.scrollButtonsHideMobile && t.scrollButtonsHideMobile
    }, t.root, r.vertical && t.vertical];
  }
})(({
  ownerState: e,
  theme: t
}) => C({
  overflow: "hidden",
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
  display: "flex"
}, e.vertical && {
  flexDirection: "column"
}, e.scrollButtonsHideMobile && {
  [`& .${sc.scrollButtons}`]: {
    [t.breakpoints.down("sm")]: {
      display: "none"
    }
  }
})), Rw = he("div", {
  name: "MuiTabs",
  slot: "Scroller",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.scroller, r.fixed && t.fixed, r.hideScrollbar && t.hideScrollbar, r.scrollableX && t.scrollableX, r.scrollableY && t.scrollableY];
  }
})(({
  ownerState: e
}) => C({
  position: "relative",
  display: "inline-block",
  flex: "1 1 auto",
  whiteSpace: "nowrap"
}, e.fixed && {
  overflowX: "hidden",
  width: "100%"
}, e.hideScrollbar && {
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: "none",
  // Firefox
  "&::-webkit-scrollbar": {
    display: "none"
    // Safari + Chrome
  }
}, e.scrollableX && {
  overflowX: "auto",
  overflowY: "hidden"
}, e.scrollableY && {
  overflowY: "auto",
  overflowX: "hidden"
})), Iw = he("div", {
  name: "MuiTabs",
  slot: "FlexContainer",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.flexContainer, r.vertical && t.flexContainerVertical, r.centered && t.centered];
  }
})(({
  ownerState: e
}) => C({
  display: "flex"
}, e.vertical && {
  flexDirection: "column"
}, e.centered && {
  justifyContent: "center"
})), Nw = he("span", {
  name: "MuiTabs",
  slot: "Indicator",
  overridesResolver: (e, t) => t.indicator
})(({
  ownerState: e,
  theme: t
}) => C({
  position: "absolute",
  height: 2,
  bottom: 0,
  width: "100%",
  transition: t.transitions.create()
}, e.indicatorColor === "primary" && {
  backgroundColor: (t.vars || t).palette.primary.main
}, e.indicatorColor === "secondary" && {
  backgroundColor: (t.vars || t).palette.secondary.main
}, e.vertical && {
  height: "100%",
  width: 2,
  right: 0
})), Aw = he(pg)({
  overflowX: "auto",
  overflowY: "hidden",
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: "none",
  // Firefox
  "&::-webkit-scrollbar": {
    display: "none"
    // Safari + Chrome
  }
}), em = {};
let tm = !1;
const $g = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiTabs"
  }), o = Sn(), i = o.direction === "rtl", {
    "aria-label": a,
    "aria-labelledby": l,
    action: c,
    centered: u = !1,
    children: d,
    className: p,
    component: f = "div",
    allowScrollButtonsMobile: m = !1,
    indicatorColor: h = "primary",
    onChange: g,
    orientation: y = "horizontal",
    ScrollButtonComponent: v = xw,
    scrollButtons: $ = "auto",
    selectionFollowsFocus: E,
    slots: S = {},
    slotProps: b = {},
    TabIndicatorProps: x = {},
    TabScrollButtonProps: w = {},
    textColor: A = "primary",
    value: M,
    variant: k = "standard",
    visibleScrollbar: H = !1
  } = n, U = Ee(n, Ow), K = k === "scrollable", z = y === "vertical", G = z ? "scrollTop" : "scrollLeft", X = z ? "top" : "left", J = z ? "bottom" : "right", Z = z ? "clientHeight" : "clientWidth", ne = z ? "height" : "width", D = C({}, n, {
    component: f,
    allowScrollButtonsMobile: m,
    indicatorColor: h,
    orientation: y,
    vertical: z,
    scrollButtons: $,
    textColor: A,
    variant: k,
    visibleScrollbar: H,
    fixed: !K,
    hideScrollbar: K && !H,
    scrollableX: K && !z,
    scrollableY: K && z,
    centered: u && !K,
    scrollButtonsHideMobile: !m
  }), N = Cw(D), W = Dt({
    elementType: S.StartScrollButtonIcon,
    externalSlotProps: b.startScrollButtonIcon,
    ownerState: D
  }), F = Dt({
    elementType: S.EndScrollButtonIcon,
    externalSlotProps: b.endScrollButtonIcon,
    ownerState: D
  });
  process.env.NODE_ENV !== "production" && u && K && console.error('MUI: You can not use the `centered={true}` and `variant="scrollable"` properties at the same time on a `Tabs` component.');
  const [T, R] = P.useState(!1), [B, Q] = P.useState(em), [Y, oe] = P.useState(!1), [ie, ce] = P.useState(!1), [q, pe] = P.useState(!1), [te, fe] = P.useState({
    overflow: "hidden",
    scrollbarWidth: 0
  }), Pe = /* @__PURE__ */ new Map(), je = P.useRef(null), Ve = P.useRef(null), st = () => {
    const re = je.current;
    let se;
    if (re) {
      const Ae = re.getBoundingClientRect();
      se = {
        clientWidth: re.clientWidth,
        scrollLeft: re.scrollLeft,
        scrollTop: re.scrollTop,
        scrollLeftNormalized: _1(re, o.direction),
        scrollWidth: re.scrollWidth,
        top: Ae.top,
        bottom: Ae.bottom,
        left: Ae.left,
        right: Ae.right
      };
    }
    let $e;
    if (re && M !== !1) {
      const Ae = Ve.current.children;
      if (Ae.length > 0) {
        const et = Ae[Pe.get(M)];
        process.env.NODE_ENV !== "production" && (et || console.error(["MUI: The `value` provided to the Tabs component is invalid.", `None of the Tabs' children match with "${M}".`, Pe.keys ? `You can provide one of the following values: ${Array.from(Pe.keys()).join(", ")}.` : null].join(`
`))), $e = et ? et.getBoundingClientRect() : null, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && !tm && $e && $e.width === 0 && $e.height === 0 && // if the whole Tabs component is hidden, don't warn
        se.clientWidth !== 0 && (se = null, console.error(["MUI: The `value` provided to the Tabs component is invalid.", `The Tab with this \`value\` ("${M}") is not part of the document layout.`, "Make sure the tab item is present in the document or that it's not `display: none`."].join(`
`)), tm = !0);
      }
    }
    return {
      tabsMeta: se,
      tabMeta: $e
    };
  }, ke = sr(() => {
    const {
      tabsMeta: re,
      tabMeta: se
    } = st();
    let $e = 0, Ae;
    if (z)
      Ae = "top", se && re && ($e = se.top - re.top + re.scrollTop);
    else if (Ae = i ? "right" : "left", se && re) {
      const St = i ? re.scrollLeftNormalized + re.clientWidth - re.scrollWidth : re.scrollLeft;
      $e = (i ? -1 : 1) * (se[Ae] - re[Ae] + St);
    }
    const et = {
      [Ae]: $e,
      // May be wrong until the font is loaded.
      [ne]: se ? se[ne] : 0
    };
    if (isNaN(B[Ae]) || isNaN(B[ne]))
      Q(et);
    else {
      const St = Math.abs(B[Ae] - et[Ae]), _t = Math.abs(B[ne] - et[ne]);
      (St >= 1 || _t >= 1) && Q(et);
    }
  }), De = (re, {
    animation: se = !0
  } = {}) => {
    se ? Dx(G, je.current, re, {
      duration: o.transitions.duration.standard
    }) : je.current[G] = re;
  }, Qe = (re) => {
    let se = je.current[G];
    z ? se += re : (se += re * (i ? -1 : 1), se *= i && Iy() === "reverse" ? -1 : 1), De(se);
  }, Ge = () => {
    const re = je.current[Z];
    let se = 0;
    const $e = Array.from(Ve.current.children);
    for (let Ae = 0; Ae < $e.length; Ae += 1) {
      const et = $e[Ae];
      if (se + et[Z] > re) {
        Ae === 0 && (se = re);
        break;
      }
      se += et[Z];
    }
    return se;
  }, Ue = () => {
    Qe(-1 * Ge());
  }, le = () => {
    Qe(Ge());
  }, ye = P.useCallback((re) => {
    fe({
      overflow: null,
      scrollbarWidth: re
    });
  }, []), be = () => {
    const re = {};
    re.scrollbarSizeListener = K ? /* @__PURE__ */ _.jsx(Aw, {
      onChange: ye,
      className: Se(N.scrollableX, N.hideScrollbar)
    }) : null;
    const $e = K && ($ === "auto" && (Y || ie) || $ === !0);
    return re.scrollButtonStart = $e ? /* @__PURE__ */ _.jsx(v, C({
      slots: {
        StartScrollButtonIcon: S.StartScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: W
      },
      orientation: y,
      direction: i ? "right" : "left",
      onClick: Ue,
      disabled: !Y
    }, w, {
      className: Se(N.scrollButtons, w.className)
    })) : null, re.scrollButtonEnd = $e ? /* @__PURE__ */ _.jsx(v, C({
      slots: {
        EndScrollButtonIcon: S.EndScrollButtonIcon
      },
      slotProps: {
        endScrollButtonIcon: F
      },
      orientation: y,
      direction: i ? "left" : "right",
      onClick: le,
      disabled: !ie
    }, w, {
      className: Se(N.scrollButtons, w.className)
    })) : null, re;
  }, ge = sr((re) => {
    const {
      tabsMeta: se,
      tabMeta: $e
    } = st();
    if (!(!$e || !se)) {
      if ($e[X] < se[X]) {
        const Ae = se[G] + ($e[X] - se[X]);
        De(Ae, {
          animation: re
        });
      } else if ($e[J] > se[J]) {
        const Ae = se[G] + ($e[J] - se[J]);
        De(Ae, {
          animation: re
        });
      }
    }
  }), ue = sr(() => {
    K && $ !== !1 && pe(!q);
  });
  P.useEffect(() => {
    const re = is(() => {
      je.current && ke();
    });
    let se;
    const $e = (St) => {
      St.forEach((_t) => {
        _t.removedNodes.forEach((Yt) => {
          var kt;
          (kt = se) == null || kt.unobserve(Yt);
        }), _t.addedNodes.forEach((Yt) => {
          var kt;
          (kt = se) == null || kt.observe(Yt);
        });
      }), re(), ue();
    }, Ae = Br(je.current);
    Ae.addEventListener("resize", re);
    let et;
    return typeof ResizeObserver < "u" && (se = new ResizeObserver(re), Array.from(Ve.current.children).forEach((St) => {
      se.observe(St);
    })), typeof MutationObserver < "u" && (et = new MutationObserver($e), et.observe(Ve.current, {
      childList: !0
    })), () => {
      var St, _t;
      re.clear(), Ae.removeEventListener("resize", re), (St = et) == null || St.disconnect(), (_t = se) == null || _t.disconnect();
    };
  }, [ke, ue]), P.useEffect(() => {
    const re = Array.from(Ve.current.children), se = re.length;
    if (typeof IntersectionObserver < "u" && se > 0 && K && $ !== !1) {
      const $e = re[0], Ae = re[se - 1], et = {
        root: je.current,
        threshold: 0.99
      }, St = (Ut) => {
        oe(!Ut[0].isIntersecting);
      }, _t = new IntersectionObserver(St, et);
      _t.observe($e);
      const Yt = (Ut) => {
        ce(!Ut[0].isIntersecting);
      }, kt = new IntersectionObserver(Yt, et);
      return kt.observe(Ae), () => {
        _t.disconnect(), kt.disconnect();
      };
    }
  }, [K, $, q, d == null ? void 0 : d.length]), P.useEffect(() => {
    R(!0);
  }, []), P.useEffect(() => {
    ke();
  }), P.useEffect(() => {
    ge(em !== B);
  }, [ge, B]), P.useImperativeHandle(c, () => ({
    updateIndicator: ke,
    updateScrollButtons: ue
  }), [ke, ue]);
  const We = /* @__PURE__ */ _.jsx(Nw, C({}, x, {
    className: Se(N.indicator, x.className),
    ownerState: D,
    style: C({}, B, x.style)
  }));
  let Ne = 0;
  const Xe = P.Children.map(d, (re) => {
    if (!/* @__PURE__ */ P.isValidElement(re))
      return null;
    process.env.NODE_ENV !== "production" && Un.isFragment(re) && console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    const se = re.props.value === void 0 ? Ne : re.props.value;
    Pe.set(se, Ne);
    const $e = se === M;
    return Ne += 1, /* @__PURE__ */ P.cloneElement(re, C({
      fullWidth: k === "fullWidth",
      indicator: $e && !T && We,
      selected: $e,
      selectionFollowsFocus: E,
      onChange: g,
      textColor: A,
      value: se
    }, Ne === 1 && M === !1 && !re.props.tabIndex ? {
      tabIndex: 0
    } : {}));
  }), Je = (re) => {
    const se = Ve.current, $e = jt(se).activeElement;
    if ($e.getAttribute("role") !== "tab")
      return;
    let et = y === "horizontal" ? "ArrowLeft" : "ArrowUp", St = y === "horizontal" ? "ArrowRight" : "ArrowDown";
    switch (y === "horizontal" && i && (et = "ArrowRight", St = "ArrowLeft"), re.key) {
      case et:
        re.preventDefault(), Ms(se, $e, Qp);
        break;
      case St:
        re.preventDefault(), Ms(se, $e, Zp);
        break;
      case "Home":
        re.preventDefault(), Ms(se, null, Zp);
        break;
      case "End":
        re.preventDefault(), Ms(se, null, Qp);
        break;
    }
  }, Ot = be();
  return /* @__PURE__ */ _.jsxs(Pw, C({
    className: Se(N.root, p),
    ownerState: D,
    ref: r,
    as: f
  }, U, {
    children: [Ot.scrollButtonStart, Ot.scrollbarSizeListener, /* @__PURE__ */ _.jsxs(Rw, {
      className: N.scroller,
      ownerState: D,
      style: {
        overflow: te.overflow,
        [z ? `margin${i ? "Left" : "Right"}` : "marginBottom"]: H ? void 0 : -te.scrollbarWidth
      },
      ref: je,
      children: [/* @__PURE__ */ _.jsx(Iw, {
        "aria-label": a,
        "aria-labelledby": l,
        "aria-orientation": y === "vertical" ? "vertical" : null,
        className: N.flexContainer,
        ownerState: D,
        onKeyDown: Je,
        ref: Ve,
        role: "tablist",
        children: Xe
      }), T && We]
    }), Ot.scrollButtonEnd]
  }));
});
process.env.NODE_ENV !== "production" && ($g.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: rr,
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: s.bool,
  /**
   * The label for the Tabs as a string.
   */
  "aria-label": s.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  "aria-labelledby": s.string,
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: s.bool,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: s.oneOfType([s.oneOf(["primary", "secondary"]), s.string]),
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: s.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: s.oneOf(["horizontal", "vertical"]),
  /**
   * The component used to render the scroll buttons.
   * @default TabScrollButton
   */
  ScrollButtonComponent: s.elementType,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: s.oneOf(["auto", !1, !0]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: s.bool,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps: s.shape({
    endScrollButtonIcon: s.oneOfType([s.func, s.object]),
    startScrollButtonIcon: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: s.shape({
    EndScrollButtonIcon: s.elementType,
    StartScrollButtonIcon: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Props applied to the tab indicator element.
   * @default  {}
   */
  TabIndicatorProps: s.object,
  /**
   * Props applied to the [`TabScrollButton`](/material-ui/api/tab-scroll-button/) element.
   * @default {}
   */
  TabScrollButtonProps: s.object,
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: s.oneOf(["inherit", "primary", "secondary"]),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: s.any,
  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: s.oneOf(["fullWidth", "scrollable", "standard"]),
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: s.bool
});
const jw = $g;
function kw(e) {
  return Fe("MuiTab", e);
}
const Mw = Le("MuiTab", ["root", "labelIcon", "textColorInherit", "textColorPrimary", "textColorSecondary", "selected", "disabled", "fullWidth", "wrapped", "iconWrapper"]), Rn = Mw, Dw = ["className", "disabled", "disableFocusRipple", "fullWidth", "icon", "iconPosition", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"], Fw = (e) => {
  const {
    classes: t,
    textColor: r,
    fullWidth: n,
    wrapped: o,
    icon: i,
    label: a,
    selected: l,
    disabled: c
  } = e, u = {
    root: ["root", i && a && "labelIcon", `textColor${xe(r)}`, n && "fullWidth", o && "wrapped", l && "selected", c && "disabled"],
    iconWrapper: ["iconWrapper"]
  };
  return ze(u, kw, t);
}, Lw = he(Xn, {
  name: "MuiTab",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.label && r.icon && t.labelIcon, t[`textColor${xe(r.textColor)}`], r.fullWidth && t.fullWidth, r.wrapped && t.wrapped];
  }
})(({
  theme: e,
  ownerState: t
}) => C({}, e.typography.button, {
  maxWidth: 360,
  minWidth: 90,
  position: "relative",
  minHeight: 48,
  flexShrink: 0,
  padding: "12px 16px",
  overflow: "hidden",
  whiteSpace: "normal",
  textAlign: "center"
}, t.label && {
  flexDirection: t.iconPosition === "top" || t.iconPosition === "bottom" ? "column" : "row"
}, {
  lineHeight: 1.25
}, t.icon && t.label && {
  minHeight: 72,
  paddingTop: 9,
  paddingBottom: 9,
  [`& > .${Rn.iconWrapper}`]: C({}, t.iconPosition === "top" && {
    marginBottom: 6
  }, t.iconPosition === "bottom" && {
    marginTop: 6
  }, t.iconPosition === "start" && {
    marginRight: e.spacing(1)
  }, t.iconPosition === "end" && {
    marginLeft: e.spacing(1)
  })
}, t.textColor === "inherit" && {
  color: "inherit",
  opacity: 0.6,
  // same opacity as theme.palette.text.secondary
  [`&.${Rn.selected}`]: {
    opacity: 1
  },
  [`&.${Rn.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  }
}, t.textColor === "primary" && {
  color: (e.vars || e).palette.text.secondary,
  [`&.${Rn.selected}`]: {
    color: (e.vars || e).palette.primary.main
  },
  [`&.${Rn.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  }
}, t.textColor === "secondary" && {
  color: (e.vars || e).palette.text.secondary,
  [`&.${Rn.selected}`]: {
    color: (e.vars || e).palette.secondary.main
  },
  [`&.${Rn.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  }
}, t.fullWidth && {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: 0,
  maxWidth: "none"
}, t.wrapped && {
  fontSize: e.typography.pxToRem(12)
})), Sg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiTab"
  }), {
    className: o,
    disabled: i = !1,
    disableFocusRipple: a = !1,
    // eslint-disable-next-line react/prop-types
    fullWidth: l,
    icon: c,
    iconPosition: u = "top",
    // eslint-disable-next-line react/prop-types
    indicator: d,
    label: p,
    onChange: f,
    onClick: m,
    onFocus: h,
    // eslint-disable-next-line react/prop-types
    selected: g,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus: y,
    // eslint-disable-next-line react/prop-types
    textColor: v = "inherit",
    value: $,
    wrapped: E = !1
  } = n, S = Ee(n, Dw), b = C({}, n, {
    disabled: i,
    disableFocusRipple: a,
    selected: g,
    icon: !!c,
    iconPosition: u,
    label: !!p,
    fullWidth: l,
    textColor: v,
    wrapped: E
  }), x = Fw(b), w = c && p && /* @__PURE__ */ P.isValidElement(c) ? /* @__PURE__ */ P.cloneElement(c, {
    className: Se(x.iconWrapper, c.props.className)
  }) : c, A = (k) => {
    !g && f && f(k, $), m && m(k);
  }, M = (k) => {
    y && !g && f && f(k, $), h && h(k);
  };
  return /* @__PURE__ */ _.jsxs(Lw, C({
    focusRipple: !a,
    className: Se(x.root, o),
    ref: r,
    role: "tab",
    "aria-selected": g,
    disabled: i,
    onClick: A,
    onFocus: M,
    ownerState: b,
    tabIndex: g ? 0 : -1
  }, S, {
    children: [u === "top" || u === "start" ? /* @__PURE__ */ _.jsxs(P.Fragment, {
      children: [w, p]
    }) : /* @__PURE__ */ _.jsxs(P.Fragment, {
      children: [p, w]
    }), d]
  }));
});
process.env.NODE_ENV !== "production" && (Sg.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: Py,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * The icon to display.
   */
  icon: s.oneOfType([s.element, s.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: s.oneOf(["bottom", "end", "start", "top"]),
  /**
   * The label element.
   */
  label: s.node,
  /**
   * @ignore
   */
  onChange: s.func,
  /**
   * @ignore
   */
  onClick: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: s.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: s.bool
});
const Bw = Sg;
function Eg(e) {
  const { children: t, value: r, index: n, ...o } = e;
  return /* @__PURE__ */ _.jsx(
    "div",
    {
      role: "tabpanel",
      hidden: r !== n,
      id: `simple-tabpanel-${n}`,
      "aria-labelledby": `simple-tab-${n}`,
      ...o,
      children: r === n && /* @__PURE__ */ _.jsx(Vr, { sx: { p: 3 }, children: t })
    }
  );
}
Eg.propTypes = {
  children: s.node,
  index: s.number.isRequired,
  value: s.number.isRequired
};
function Vw(e) {
  return {
    id: `simple-tab-${e}`,
    "aria-controls": `simple-tabpanel-${e}`
  };
}
function Et(e) {
  return typeof File < "u" && e instanceof File || typeof Date < "u" && e instanceof Date ? !1 : typeof e == "object" && e !== null && !Array.isArray(e);
}
function zw(e) {
  return e.additionalItems === !0 && console.warn("additionalItems=true is currently not supported"), Et(e.additionalItems);
}
function rm(e) {
  if (e === "")
    return;
  if (e === null)
    return null;
  if (/\.$/.test(e) || /\.0$/.test(e) || /\.\d*0$/.test(e))
    return e;
  const t = Number(e);
  return typeof t == "number" && !Number.isNaN(t) ? t : e;
}
const Uo = "__additional_property", qc = "additionalProperties", cs = "allOf", No = "anyOf", _g = "const", Uw = "default", pl = "dependencies", Ww = "enum", xr = "__errors", pn = "$id", qw = "if", hn = "items", Kw = "_$junk_option_schema_id$_", ea = "$name", yn = "oneOf", Tt = "properties", Hw = "required", Ea = "submitButtonOptions", At = "$ref", Fu = "__rjsf_additionalProperties", xg = "__rjsf_rootSchema", Gw = "ui:field", Lu = "ui:widget", Di = "ui:options", Yw = "ui:globalOptions";
function rt(e = {}, t = {}) {
  return Object.keys(e).filter((r) => r.indexOf("ui:") === 0).reduce((r, n) => {
    const o = e[n];
    return n === Lu && Et(o) ? (console.error("Setting options via ui:widget object is no longer supported, use ui:options instead"), r) : n === Di && Et(o) ? { ...r, ...o } : { ...r, [n.substring(3)]: o };
  }, { ...t });
}
function wg(e, t = {}, r) {
  if (!e.additionalProperties)
    return !1;
  const { expandable: n = !0 } = rt(t);
  return n === !1 ? n : e.maxProperties !== void 0 && r ? Object.keys(r).length < e.maxProperties : !0;
}
var Xw = typeof $o == "object" && $o && $o.Object === Object && $o, Tg = Xw, Jw = Tg, Zw = typeof self == "object" && self && self.Object === Object && self, Qw = Jw || Zw || Function("return this")(), zr = Qw, eT = zr, tT = eT.Symbol, Wo = tT, nm = Wo, Og = Object.prototype, rT = Og.hasOwnProperty, nT = Og.toString, gi = nm ? nm.toStringTag : void 0;
function oT(e) {
  var t = rT.call(e, gi), r = e[gi];
  try {
    e[gi] = void 0;
    var n = !0;
  } catch {
  }
  var o = nT.call(e);
  return n && (t ? e[gi] = r : delete e[gi]), o;
}
var iT = oT, sT = Object.prototype, aT = sT.toString;
function lT(e) {
  return aT.call(e);
}
var cT = lT, om = Wo, uT = iT, dT = cT, fT = "[object Null]", pT = "[object Undefined]", im = om ? om.toStringTag : void 0;
function mT(e) {
  return e == null ? e === void 0 ? pT : fT : im && im in Object(e) ? uT(e) : dT(e);
}
var rn = mT;
function hT(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Cg = hT, yT = Cg, gT = yT(Object.getPrototypeOf, Object), ml = gT;
function vT(e) {
  return e != null && typeof e == "object";
}
var br = vT, bT = rn, $T = ml, ST = br, ET = "[object Object]", _T = Function.prototype, xT = Object.prototype, Pg = _T.toString, wT = xT.hasOwnProperty, TT = Pg.call(Object);
function OT(e) {
  if (!ST(e) || bT(e) != ET)
    return !1;
  var t = $T(e);
  if (t === null)
    return !0;
  var r = wT.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Pg.call(r) == TT;
}
var qo = OT;
const Bu = /* @__PURE__ */ pt(qo);
function Kc(e) {
  const t = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // 'errors' (see `utils.toErrorSchema`).
    [xr]: [],
    addError(r) {
      this[xr].push(r);
    }
  };
  if (Array.isArray(e))
    return e.reduce((r, n, o) => ({ ...r, [o]: Kc(n) }), t);
  if (Bu(e)) {
    const r = e;
    return Object.keys(r).reduce((n, o) => ({ ...n, [o]: Kc(r[o]) }), t);
  }
  return t;
}
function CT() {
  this.__data__ = [], this.size = 0;
}
var PT = CT;
function RT(e, t) {
  return e === t || e !== e && t !== t;
}
var Ko = RT, IT = Ko;
function NT(e, t) {
  for (var r = e.length; r--; )
    if (IT(e[r][0], t))
      return r;
  return -1;
}
var hl = NT, AT = hl, jT = Array.prototype, kT = jT.splice;
function MT(e) {
  var t = this.__data__, r = AT(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : kT.call(t, r, 1), --this.size, !0;
}
var DT = MT, FT = hl;
function LT(e) {
  var t = this.__data__, r = FT(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var BT = LT, VT = hl;
function zT(e) {
  return VT(this.__data__, e) > -1;
}
var UT = zT, WT = hl;
function qT(e, t) {
  var r = this.__data__, n = WT(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var KT = qT, HT = PT, GT = DT, YT = BT, XT = UT, JT = KT;
function Ho(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ho.prototype.clear = HT;
Ho.prototype.delete = GT;
Ho.prototype.get = YT;
Ho.prototype.has = XT;
Ho.prototype.set = JT;
var yl = Ho, ZT = yl;
function QT() {
  this.__data__ = new ZT(), this.size = 0;
}
var eO = QT;
function tO(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var rO = tO;
function nO(e) {
  return this.__data__.get(e);
}
var oO = nO;
function iO(e) {
  return this.__data__.has(e);
}
var sO = iO;
function aO(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var nr = aO;
const wr = /* @__PURE__ */ pt(nr);
var lO = rn, cO = nr, uO = "[object AsyncFunction]", dO = "[object Function]", fO = "[object GeneratorFunction]", pO = "[object Proxy]";
function mO(e) {
  if (!cO(e))
    return !1;
  var t = lO(e);
  return t == dO || t == fO || t == uO || t == pO;
}
var gl = mO, hO = zr, yO = hO["__core-js_shared__"], gO = yO, ac = gO, sm = function() {
  var e = /[^.]+$/.exec(ac && ac.keys && ac.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function vO(e) {
  return !!sm && sm in e;
}
var bO = vO, $O = Function.prototype, SO = $O.toString;
function EO(e) {
  if (e != null) {
    try {
      return SO.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Rg = EO, _O = gl, xO = bO, wO = nr, TO = Rg, OO = /[\\^$.*+?()[\]{}|]/g, CO = /^\[object .+?Constructor\]$/, PO = Function.prototype, RO = Object.prototype, IO = PO.toString, NO = RO.hasOwnProperty, AO = RegExp(
  "^" + IO.call(NO).replace(OO, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function jO(e) {
  if (!wO(e) || xO(e))
    return !1;
  var t = _O(e) ? AO : CO;
  return t.test(TO(e));
}
var kO = jO;
function MO(e, t) {
  return e == null ? void 0 : e[t];
}
var DO = MO, FO = kO, LO = DO;
function BO(e, t) {
  var r = LO(e, t);
  return FO(r) ? r : void 0;
}
var Jn = BO, VO = Jn, zO = zr, UO = VO(zO, "Map"), Vu = UO, WO = Jn, qO = WO(Object, "create"), vl = qO, am = vl;
function KO() {
  this.__data__ = am ? am(null) : {}, this.size = 0;
}
var HO = KO;
function GO(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var YO = GO, XO = vl, JO = "__lodash_hash_undefined__", ZO = Object.prototype, QO = ZO.hasOwnProperty;
function eC(e) {
  var t = this.__data__;
  if (XO) {
    var r = t[e];
    return r === JO ? void 0 : r;
  }
  return QO.call(t, e) ? t[e] : void 0;
}
var tC = eC, rC = vl, nC = Object.prototype, oC = nC.hasOwnProperty;
function iC(e) {
  var t = this.__data__;
  return rC ? t[e] !== void 0 : oC.call(t, e);
}
var sC = iC, aC = vl, lC = "__lodash_hash_undefined__";
function cC(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = aC && t === void 0 ? lC : t, this;
}
var uC = cC, dC = HO, fC = YO, pC = tC, mC = sC, hC = uC;
function Go(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Go.prototype.clear = dC;
Go.prototype.delete = fC;
Go.prototype.get = pC;
Go.prototype.has = mC;
Go.prototype.set = hC;
var yC = Go, lm = yC, gC = yl, vC = Vu;
function bC() {
  this.size = 0, this.__data__ = {
    hash: new lm(),
    map: new (vC || gC)(),
    string: new lm()
  };
}
var $C = bC;
function SC(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var EC = SC, _C = EC;
function xC(e, t) {
  var r = e.__data__;
  return _C(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var bl = xC, wC = bl;
function TC(e) {
  var t = wC(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var OC = TC, CC = bl;
function PC(e) {
  return CC(this, e).get(e);
}
var RC = PC, IC = bl;
function NC(e) {
  return IC(this, e).has(e);
}
var AC = NC, jC = bl;
function kC(e, t) {
  var r = jC(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var MC = kC, DC = $C, FC = OC, LC = RC, BC = AC, VC = MC;
function Yo(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Yo.prototype.clear = DC;
Yo.prototype.delete = FC;
Yo.prototype.get = LC;
Yo.prototype.has = BC;
Yo.prototype.set = VC;
var zu = Yo, zC = yl, UC = Vu, WC = zu, qC = 200;
function KC(e, t) {
  var r = this.__data__;
  if (r instanceof zC) {
    var n = r.__data__;
    if (!UC || n.length < qC - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new WC(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var HC = KC, GC = yl, YC = eO, XC = rO, JC = oO, ZC = sO, QC = HC;
function Xo(e) {
  var t = this.__data__ = new GC(e);
  this.size = t.size;
}
Xo.prototype.clear = YC;
Xo.prototype.delete = XC;
Xo.prototype.get = JC;
Xo.prototype.has = ZC;
Xo.prototype.set = QC;
var $l = Xo, eP = "__lodash_hash_undefined__";
function tP(e) {
  return this.__data__.set(e, eP), this;
}
var rP = tP;
function nP(e) {
  return this.__data__.has(e);
}
var oP = nP, iP = zu, sP = rP, aP = oP;
function _a(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new iP(); ++t < r; )
    this.add(e[t]);
}
_a.prototype.add = _a.prototype.push = sP;
_a.prototype.has = aP;
var Sl = _a;
function lP(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var cP = lP;
function uP(e, t) {
  return e.has(t);
}
var El = uP, dP = Sl, fP = cP, pP = El, mP = 1, hP = 2;
function yP(e, t, r, n, o, i) {
  var a = r & mP, l = e.length, c = t.length;
  if (l != c && !(a && c > l))
    return !1;
  var u = i.get(e), d = i.get(t);
  if (u && d)
    return u == t && d == e;
  var p = -1, f = !0, m = r & hP ? new dP() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < l; ) {
    var h = e[p], g = t[p];
    if (n)
      var y = a ? n(g, h, p, t, e, i) : n(h, g, p, e, t, i);
    if (y !== void 0) {
      if (y)
        continue;
      f = !1;
      break;
    }
    if (m) {
      if (!fP(t, function(v, $) {
        if (!pP(m, $) && (h === v || o(h, v, r, n, i)))
          return m.push($);
      })) {
        f = !1;
        break;
      }
    } else if (!(h === g || o(h, g, r, n, i))) {
      f = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), f;
}
var Ig = yP, gP = zr, vP = gP.Uint8Array, Ng = vP;
function bP(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
var $P = bP;
function SP(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Uu = SP, cm = Wo, um = Ng, EP = Ko, _P = Ig, xP = $P, wP = Uu, TP = 1, OP = 2, CP = "[object Boolean]", PP = "[object Date]", RP = "[object Error]", IP = "[object Map]", NP = "[object Number]", AP = "[object RegExp]", jP = "[object Set]", kP = "[object String]", MP = "[object Symbol]", DP = "[object ArrayBuffer]", FP = "[object DataView]", dm = cm ? cm.prototype : void 0, lc = dm ? dm.valueOf : void 0;
function LP(e, t, r, n, o, i, a) {
  switch (r) {
    case FP:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case DP:
      return !(e.byteLength != t.byteLength || !i(new um(e), new um(t)));
    case CP:
    case PP:
    case NP:
      return EP(+e, +t);
    case RP:
      return e.name == t.name && e.message == t.message;
    case AP:
    case kP:
      return e == t + "";
    case IP:
      var l = xP;
    case jP:
      var c = n & TP;
      if (l || (l = wP), e.size != t.size && !c)
        return !1;
      var u = a.get(e);
      if (u)
        return u == t;
      n |= OP, a.set(e, t);
      var d = _P(l(e), l(t), n, o, i, a);
      return a.delete(e), d;
    case MP:
      if (lc)
        return lc.call(e) == lc.call(t);
  }
  return !1;
}
var BP = LP;
function VP(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Wu = VP, zP = Array.isArray, Lt = zP, UP = Wu, WP = Lt;
function qP(e, t, r) {
  var n = t(e);
  return WP(e) ? n : UP(n, r(e));
}
var Ag = qP;
function KP(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (i[o++] = a);
  }
  return i;
}
var HP = KP;
function GP() {
  return [];
}
var jg = GP, YP = HP, XP = jg, JP = Object.prototype, ZP = JP.propertyIsEnumerable, fm = Object.getOwnPropertySymbols, QP = fm ? function(e) {
  return e == null ? [] : (e = Object(e), YP(fm(e), function(t) {
    return ZP.call(e, t);
  }));
} : XP, qu = QP;
function eR(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var kg = eR, tR = rn, rR = br, nR = "[object Arguments]";
function oR(e) {
  return rR(e) && tR(e) == nR;
}
var iR = oR, pm = iR, sR = br, Mg = Object.prototype, aR = Mg.hasOwnProperty, lR = Mg.propertyIsEnumerable, cR = pm(function() {
  return arguments;
}()) ? pm : function(e) {
  return sR(e) && aR.call(e, "callee") && !lR.call(e, "callee");
}, us = cR, xa = { exports: {} };
function uR() {
  return !1;
}
var dR = uR;
xa.exports;
(function(e, t) {
  var r = zr, n = dR, o = t && !t.nodeType && t, i = o && !0 && e && !e.nodeType && e, a = i && i.exports === o, l = a ? r.Buffer : void 0, c = l ? l.isBuffer : void 0, u = c || n;
  e.exports = u;
})(xa, xa.exports);
var Jo = xa.exports, fR = 9007199254740991, pR = /^(?:0|[1-9]\d*)$/;
function mR(e, t) {
  var r = typeof e;
  return t = t ?? fR, !!t && (r == "number" || r != "symbol" && pR.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var _l = mR, hR = 9007199254740991;
function yR(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= hR;
}
var Ku = yR, gR = rn, vR = Ku, bR = br, $R = "[object Arguments]", SR = "[object Array]", ER = "[object Boolean]", _R = "[object Date]", xR = "[object Error]", wR = "[object Function]", TR = "[object Map]", OR = "[object Number]", CR = "[object Object]", PR = "[object RegExp]", RR = "[object Set]", IR = "[object String]", NR = "[object WeakMap]", AR = "[object ArrayBuffer]", jR = "[object DataView]", kR = "[object Float32Array]", MR = "[object Float64Array]", DR = "[object Int8Array]", FR = "[object Int16Array]", LR = "[object Int32Array]", BR = "[object Uint8Array]", VR = "[object Uint8ClampedArray]", zR = "[object Uint16Array]", UR = "[object Uint32Array]", gt = {};
gt[kR] = gt[MR] = gt[DR] = gt[FR] = gt[LR] = gt[BR] = gt[VR] = gt[zR] = gt[UR] = !0;
gt[$R] = gt[SR] = gt[AR] = gt[ER] = gt[jR] = gt[_R] = gt[xR] = gt[wR] = gt[TR] = gt[OR] = gt[CR] = gt[PR] = gt[RR] = gt[IR] = gt[NR] = !1;
function WR(e) {
  return bR(e) && vR(e.length) && !!gt[gR(e)];
}
var qR = WR;
function KR(e) {
  return function(t) {
    return e(t);
  };
}
var Zn = KR, wa = { exports: {} };
wa.exports;
(function(e, t) {
  var r = Tg, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, i = o && o.exports === n, a = i && r.process, l = function() {
    try {
      var c = o && o.require && o.require("util").types;
      return c || a && a.binding && a.binding("util");
    } catch {
    }
  }();
  e.exports = l;
})(wa, wa.exports);
var Hu = wa.exports, HR = qR, GR = Zn, mm = Hu, hm = mm && mm.isTypedArray, YR = hm ? GR(hm) : HR, ds = YR, XR = kg, JR = us, ZR = Lt, QR = Jo, eI = _l, tI = ds, rI = Object.prototype, nI = rI.hasOwnProperty;
function oI(e, t) {
  var r = ZR(e), n = !r && JR(e), o = !r && !n && QR(e), i = !r && !n && !o && tI(e), a = r || n || o || i, l = a ? XR(e.length, String) : [], c = l.length;
  for (var u in e)
    (t || nI.call(e, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    eI(u, c))) && l.push(u);
  return l;
}
var Dg = oI, iI = Object.prototype;
function sI(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || iI;
  return e === r;
}
var xl = sI, aI = Cg, lI = aI(Object.keys, Object), cI = lI, uI = xl, dI = cI, fI = Object.prototype, pI = fI.hasOwnProperty;
function mI(e) {
  if (!uI(e))
    return dI(e);
  var t = [];
  for (var r in Object(e))
    pI.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Fg = mI, hI = gl, yI = Ku;
function gI(e) {
  return e != null && yI(e.length) && !hI(e);
}
var Qn = gI, vI = Dg, bI = Fg, $I = Qn;
function SI(e) {
  return $I(e) ? vI(e) : bI(e);
}
var fs = SI, EI = Ag, _I = qu, xI = fs;
function wI(e) {
  return EI(e, xI, _I);
}
var Lg = wI, ym = Lg, TI = 1, OI = Object.prototype, CI = OI.hasOwnProperty;
function PI(e, t, r, n, o, i) {
  var a = r & TI, l = ym(e), c = l.length, u = ym(t), d = u.length;
  if (c != d && !a)
    return !1;
  for (var p = c; p--; ) {
    var f = l[p];
    if (!(a ? f in t : CI.call(t, f)))
      return !1;
  }
  var m = i.get(e), h = i.get(t);
  if (m && h)
    return m == t && h == e;
  var g = !0;
  i.set(e, t), i.set(t, e);
  for (var y = a; ++p < c; ) {
    f = l[p];
    var v = e[f], $ = t[f];
    if (n)
      var E = a ? n($, v, f, t, e, i) : n(v, $, f, e, t, i);
    if (!(E === void 0 ? v === $ || o(v, $, r, n, i) : E)) {
      g = !1;
      break;
    }
    y || (y = f == "constructor");
  }
  if (g && !y) {
    var S = e.constructor, b = t.constructor;
    S != b && "constructor" in e && "constructor" in t && !(typeof S == "function" && S instanceof S && typeof b == "function" && b instanceof b) && (g = !1);
  }
  return i.delete(e), i.delete(t), g;
}
var RI = PI, II = Jn, NI = zr, AI = II(NI, "DataView"), jI = AI, kI = Jn, MI = zr, DI = kI(MI, "Promise"), FI = DI, LI = Jn, BI = zr, VI = LI(BI, "Set"), Bg = VI, zI = Jn, UI = zr, WI = zI(UI, "WeakMap"), qI = WI, Hc = jI, Gc = Vu, Yc = FI, Xc = Bg, Jc = qI, Vg = rn, Zo = Rg, gm = "[object Map]", KI = "[object Object]", vm = "[object Promise]", bm = "[object Set]", $m = "[object WeakMap]", Sm = "[object DataView]", HI = Zo(Hc), GI = Zo(Gc), YI = Zo(Yc), XI = Zo(Xc), JI = Zo(Jc), kn = Vg;
(Hc && kn(new Hc(new ArrayBuffer(1))) != Sm || Gc && kn(new Gc()) != gm || Yc && kn(Yc.resolve()) != vm || Xc && kn(new Xc()) != bm || Jc && kn(new Jc()) != $m) && (kn = function(e) {
  var t = Vg(e), r = t == KI ? e.constructor : void 0, n = r ? Zo(r) : "";
  if (n)
    switch (n) {
      case HI:
        return Sm;
      case GI:
        return gm;
      case YI:
        return vm;
      case XI:
        return bm;
      case JI:
        return $m;
    }
  return t;
});
var ps = kn, cc = $l, ZI = Ig, QI = BP, eN = RI, Em = ps, _m = Lt, xm = Jo, tN = ds, rN = 1, wm = "[object Arguments]", Tm = "[object Array]", Ds = "[object Object]", nN = Object.prototype, Om = nN.hasOwnProperty;
function oN(e, t, r, n, o, i) {
  var a = _m(e), l = _m(t), c = a ? Tm : Em(e), u = l ? Tm : Em(t);
  c = c == wm ? Ds : c, u = u == wm ? Ds : u;
  var d = c == Ds, p = u == Ds, f = c == u;
  if (f && xm(e)) {
    if (!xm(t))
      return !1;
    a = !0, d = !1;
  }
  if (f && !d)
    return i || (i = new cc()), a || tN(e) ? ZI(e, t, r, n, o, i) : QI(e, t, c, r, n, o, i);
  if (!(r & rN)) {
    var m = d && Om.call(e, "__wrapped__"), h = p && Om.call(t, "__wrapped__");
    if (m || h) {
      var g = m ? e.value() : e, y = h ? t.value() : t;
      return i || (i = new cc()), o(g, y, r, n, i);
    }
  }
  return f ? (i || (i = new cc()), eN(e, t, r, n, o, i)) : !1;
}
var iN = oN, sN = iN, Cm = br;
function zg(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !Cm(e) && !Cm(t) ? e !== e && t !== t : sN(e, t, r, n, zg, o);
}
var wl = zg, aN = wl;
function lN(e, t, r) {
  r = typeof r == "function" ? r : void 0;
  var n = r ? r(e, t) : void 0;
  return n === void 0 ? aN(e, t, void 0, r) : !!n;
}
var cN = lN;
const uN = /* @__PURE__ */ pt(cN);
function mr(e, t) {
  return uN(e, t, (r, n) => {
    if (typeof r == "function" && typeof n == "function")
      return !0;
  });
}
var dN = rn, fN = br, pN = "[object Symbol]";
function mN(e) {
  return typeof e == "symbol" || fN(e) && dN(e) == pN;
}
var Qo = mN, hN = Lt, yN = Qo, gN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, vN = /^\w*$/;
function bN(e, t) {
  if (hN(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || yN(e) ? !0 : vN.test(e) || !gN.test(e) || t != null && e in Object(t);
}
var Gu = bN, Ug = zu, $N = "Expected a function";
function Yu(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError($N);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = e.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Yu.Cache || Ug)(), r;
}
Yu.Cache = Ug;
var SN = Yu, EN = SN, _N = 500;
function xN(e) {
  var t = EN(e, function(n) {
    return r.size === _N && r.clear(), n;
  }), r = t.cache;
  return t;
}
var wN = xN, TN = wN, ON = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, CN = /\\(\\)?/g, PN = TN(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(ON, function(r, n, o, i) {
    t.push(o ? i.replace(CN, "$1") : n || r);
  }), t;
}), Wg = PN;
function RN(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var nn = RN, Pm = Wo, IN = nn, NN = Lt, AN = Qo, jN = 1 / 0, Rm = Pm ? Pm.prototype : void 0, Im = Rm ? Rm.toString : void 0;
function qg(e) {
  if (typeof e == "string")
    return e;
  if (NN(e))
    return IN(e, qg) + "";
  if (AN(e))
    return Im ? Im.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -jN ? "-0" : t;
}
var kN = qg, MN = kN;
function DN(e) {
  return e == null ? "" : MN(e);
}
var Kg = DN, FN = Lt, LN = Gu, BN = Wg, VN = Kg;
function zN(e, t) {
  return FN(e) ? e : LN(e, t) ? [e] : BN(VN(e));
}
var ei = zN, UN = Qo, WN = 1 / 0;
function qN(e) {
  if (typeof e == "string" || UN(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -WN ? "-0" : t;
}
var eo = qN, KN = ei, HN = eo;
function GN(e, t) {
  t = KN(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[HN(t[r++])];
  return r && r == n ? e : void 0;
}
var ms = GN, YN = ms;
function XN(e, t, r) {
  var n = e == null ? void 0 : YN(e, t);
  return n === void 0 ? r : n;
}
var Hg = XN;
const Te = /* @__PURE__ */ pt(Hg);
var JN = Fg, ZN = ps, QN = us, eA = Lt, tA = Qn, rA = Jo, nA = xl, oA = ds, iA = "[object Map]", sA = "[object Set]", aA = Object.prototype, lA = aA.hasOwnProperty;
function cA(e) {
  if (e == null)
    return !0;
  if (tA(e) && (eA(e) || typeof e == "string" || typeof e.splice == "function" || rA(e) || oA(e) || QN(e)))
    return !e.length;
  var t = ZN(e);
  if (t == iA || t == sA)
    return !e.size;
  if (nA(e))
    return !JN(e).length;
  for (var r in e)
    if (lA.call(e, r))
      return !1;
  return !0;
}
var uA = cA;
const Kn = /* @__PURE__ */ pt(uA);
var Tl = {}, dA = /~/, fA = /~[01]/g;
function pA(e) {
  switch (e) {
    case "~1":
      return "/";
    case "~0":
      return "~";
  }
  throw new Error("Invalid tilde escape: " + e);
}
function Gg(e) {
  return dA.test(e) ? e.replace(fA, pA) : e;
}
function mA(e, t, r) {
  for (var n, o, i = 1, a = t.length; i < a; ) {
    if (t[i] === "constructor" || t[i] === "prototype" || t[i] === "__proto__")
      return e;
    if (n = Gg(t[i++]), o = a > i, typeof e[n] > "u" && (Array.isArray(e) && n === "-" && (n = e.length), o && (t[i] !== "" && t[i] < 1 / 0 || t[i] === "-" ? e[n] = [] : e[n] = {})), !o)
      break;
    e = e[n];
  }
  var l = e[n];
  return r === void 0 ? delete e[n] : e[n] = r, l;
}
function Xu(e) {
  if (typeof e == "string") {
    if (e = e.split("/"), e[0] === "")
      return e;
    throw new Error("Invalid JSON pointer.");
  } else if (Array.isArray(e)) {
    for (const t of e)
      if (typeof t != "string" && typeof t != "number")
        throw new Error("Invalid JSON pointer. Must be of type string or number.");
    return e;
  }
  throw new Error("Invalid JSON pointer.");
}
function Yg(e, t) {
  if (typeof e != "object")
    throw new Error("Invalid input object.");
  t = Xu(t);
  var r = t.length;
  if (r === 1)
    return e;
  for (var n = 1; n < r; ) {
    if (e = e[Gg(t[n++])], r === n)
      return e;
    if (typeof e != "object" || e === null)
      return;
  }
}
function Xg(e, t, r) {
  if (typeof e != "object")
    throw new Error("Invalid input object.");
  if (t = Xu(t), t.length === 0)
    throw new Error("Invalid JSON pointer for set.");
  return mA(e, t, r);
}
function hA(e) {
  var t = Xu(e);
  return {
    get: function(r) {
      return Yg(r, t);
    },
    set: function(r, n) {
      return Xg(r, t, n);
    }
  };
}
Tl.get = Yg;
Tl.set = Xg;
Tl.compile = hA;
function yA(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Ju = yA, gA = Jn, vA = function() {
  try {
    var e = gA(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Jg = vA, Nm = Jg;
function bA(e, t, r) {
  t == "__proto__" && Nm ? Nm(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Zu = bA, $A = Zu, SA = Ko, EA = Object.prototype, _A = EA.hasOwnProperty;
function xA(e, t, r) {
  var n = e[t];
  (!(_A.call(e, t) && SA(n, r)) || r === void 0 && !(t in e)) && $A(e, t, r);
}
var Qu = xA, wA = Qu, TA = Zu;
function OA(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i], c = n ? n(r[l], e[l], l, r, e) : void 0;
    c === void 0 && (c = e[l]), o ? TA(r, l, c) : wA(r, l, c);
  }
  return r;
}
var ti = OA, CA = ti, PA = fs;
function RA(e, t) {
  return e && CA(t, PA(t), e);
}
var IA = RA;
function NA(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var AA = NA, jA = nr, kA = xl, MA = AA, DA = Object.prototype, FA = DA.hasOwnProperty;
function LA(e) {
  if (!jA(e))
    return MA(e);
  var t = kA(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !FA.call(e, n)) || r.push(n);
  return r;
}
var BA = LA, VA = Dg, zA = BA, UA = Qn;
function WA(e) {
  return UA(e) ? VA(e, !0) : zA(e);
}
var ri = WA, qA = ti, KA = ri;
function HA(e, t) {
  return e && qA(t, KA(t), e);
}
var GA = HA, Ta = { exports: {} };
Ta.exports;
(function(e, t) {
  var r = zr, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, i = o && o.exports === n, a = i ? r.Buffer : void 0, l = a ? a.allocUnsafe : void 0;
  function c(u, d) {
    if (d)
      return u.slice();
    var p = u.length, f = l ? l(p) : new u.constructor(p);
    return u.copy(f), f;
  }
  e.exports = c;
})(Ta, Ta.exports);
var Zg = Ta.exports;
function YA(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Ol = YA, XA = ti, JA = qu;
function ZA(e, t) {
  return XA(e, JA(e), t);
}
var QA = ZA, ej = Wu, tj = ml, rj = qu, nj = jg, oj = Object.getOwnPropertySymbols, ij = oj ? function(e) {
  for (var t = []; e; )
    ej(t, rj(e)), e = tj(e);
  return t;
} : nj, Qg = ij, sj = ti, aj = Qg;
function lj(e, t) {
  return sj(e, aj(e), t);
}
var cj = lj, uj = Ag, dj = Qg, fj = ri;
function pj(e) {
  return uj(e, fj, dj);
}
var ev = pj, mj = Object.prototype, hj = mj.hasOwnProperty;
function yj(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && hj.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var gj = yj, Am = Ng;
function vj(e) {
  var t = new e.constructor(e.byteLength);
  return new Am(t).set(new Am(e)), t;
}
var ed = vj, bj = ed;
function $j(e, t) {
  var r = t ? bj(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Sj = $j, Ej = /\w*$/;
function _j(e) {
  var t = new e.constructor(e.source, Ej.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var xj = _j, jm = Wo, km = jm ? jm.prototype : void 0, Mm = km ? km.valueOf : void 0;
function wj(e) {
  return Mm ? Object(Mm.call(e)) : {};
}
var Tj = wj, Oj = ed;
function Cj(e, t) {
  var r = t ? Oj(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var tv = Cj, Pj = ed, Rj = Sj, Ij = xj, Nj = Tj, Aj = tv, jj = "[object Boolean]", kj = "[object Date]", Mj = "[object Map]", Dj = "[object Number]", Fj = "[object RegExp]", Lj = "[object Set]", Bj = "[object String]", Vj = "[object Symbol]", zj = "[object ArrayBuffer]", Uj = "[object DataView]", Wj = "[object Float32Array]", qj = "[object Float64Array]", Kj = "[object Int8Array]", Hj = "[object Int16Array]", Gj = "[object Int32Array]", Yj = "[object Uint8Array]", Xj = "[object Uint8ClampedArray]", Jj = "[object Uint16Array]", Zj = "[object Uint32Array]";
function Qj(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case zj:
      return Pj(e);
    case jj:
    case kj:
      return new n(+e);
    case Uj:
      return Rj(e, r);
    case Wj:
    case qj:
    case Kj:
    case Hj:
    case Gj:
    case Yj:
    case Xj:
    case Jj:
    case Zj:
      return Aj(e, r);
    case Mj:
      return new n();
    case Dj:
    case Bj:
      return new n(e);
    case Fj:
      return Ij(e);
    case Lj:
      return new n();
    case Vj:
      return Nj(e);
  }
}
var ek = Qj, tk = nr, Dm = Object.create, rk = function() {
  function e() {
  }
  return function(t) {
    if (!tk(t))
      return {};
    if (Dm)
      return Dm(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), rv = rk, nk = rv, ok = ml, ik = xl;
function sk(e) {
  return typeof e.constructor == "function" && !ik(e) ? nk(ok(e)) : {};
}
var nv = sk, ak = ps, lk = br, ck = "[object Map]";
function uk(e) {
  return lk(e) && ak(e) == ck;
}
var dk = uk, fk = dk, pk = Zn, Fm = Hu, Lm = Fm && Fm.isMap, mk = Lm ? pk(Lm) : fk, hk = mk, yk = ps, gk = br, vk = "[object Set]";
function bk(e) {
  return gk(e) && yk(e) == vk;
}
var $k = bk, Sk = $k, Ek = Zn, Bm = Hu, Vm = Bm && Bm.isSet, _k = Vm ? Ek(Vm) : Sk, xk = _k, wk = $l, Tk = Ju, Ok = Qu, Ck = IA, Pk = GA, Rk = Zg, Ik = Ol, Nk = QA, Ak = cj, jk = Lg, kk = ev, Mk = ps, Dk = gj, Fk = ek, Lk = nv, Bk = Lt, Vk = Jo, zk = hk, Uk = nr, Wk = xk, qk = fs, Kk = ri, Hk = 1, Gk = 2, Yk = 4, ov = "[object Arguments]", Xk = "[object Array]", Jk = "[object Boolean]", Zk = "[object Date]", Qk = "[object Error]", iv = "[object Function]", eM = "[object GeneratorFunction]", tM = "[object Map]", rM = "[object Number]", sv = "[object Object]", nM = "[object RegExp]", oM = "[object Set]", iM = "[object String]", sM = "[object Symbol]", aM = "[object WeakMap]", lM = "[object ArrayBuffer]", cM = "[object DataView]", uM = "[object Float32Array]", dM = "[object Float64Array]", fM = "[object Int8Array]", pM = "[object Int16Array]", mM = "[object Int32Array]", hM = "[object Uint8Array]", yM = "[object Uint8ClampedArray]", gM = "[object Uint16Array]", vM = "[object Uint32Array]", yt = {};
yt[ov] = yt[Xk] = yt[lM] = yt[cM] = yt[Jk] = yt[Zk] = yt[uM] = yt[dM] = yt[fM] = yt[pM] = yt[mM] = yt[tM] = yt[rM] = yt[sv] = yt[nM] = yt[oM] = yt[iM] = yt[sM] = yt[hM] = yt[yM] = yt[gM] = yt[vM] = !0;
yt[Qk] = yt[iv] = yt[aM] = !1;
function ta(e, t, r, n, o, i) {
  var a, l = t & Hk, c = t & Gk, u = t & Yk;
  if (r && (a = o ? r(e, n, o, i) : r(e)), a !== void 0)
    return a;
  if (!Uk(e))
    return e;
  var d = Bk(e);
  if (d) {
    if (a = Dk(e), !l)
      return Ik(e, a);
  } else {
    var p = Mk(e), f = p == iv || p == eM;
    if (Vk(e))
      return Rk(e, l);
    if (p == sv || p == ov || f && !o) {
      if (a = c || f ? {} : Lk(e), !l)
        return c ? Ak(e, Pk(a, e)) : Nk(e, Ck(a, e));
    } else {
      if (!yt[p])
        return o ? e : {};
      a = Fk(e, p, l);
    }
  }
  i || (i = new wk());
  var m = i.get(e);
  if (m)
    return m;
  i.set(e, a), Wk(e) ? e.forEach(function(y) {
    a.add(ta(y, t, r, y, e, i));
  }) : zk(e) && e.forEach(function(y, v) {
    a.set(v, ta(y, t, r, v, e, i));
  });
  var h = u ? c ? kk : jk : c ? Kk : qk, g = d ? void 0 : h(e);
  return Tk(g || e, function(y, v) {
    g && (v = y, y = e[v]), Ok(a, v, ta(y, t, r, v, e, i));
  }), a;
}
var av = ta;
function bM(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var lv = bM;
function $M(e, t, r) {
  var n = -1, o = e.length;
  t < 0 && (t = -t > o ? 0 : o + t), r = r > o ? o : r, r < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var i = Array(o); ++n < o; )
    i[n] = e[n + t];
  return i;
}
var SM = $M, EM = ms, _M = SM;
function xM(e, t) {
  return t.length < 2 ? e : EM(e, _M(t, 0, -1));
}
var wM = xM, TM = ei, OM = lv, CM = wM, PM = eo;
function RM(e, t) {
  return t = TM(t, e), e = CM(e, t), e == null || delete e[PM(OM(t))];
}
var cv = RM, IM = qo;
function NM(e) {
  return IM(e) ? void 0 : e;
}
var AM = NM, zm = Wo, jM = us, kM = Lt, Um = zm ? zm.isConcatSpreadable : void 0;
function MM(e) {
  return kM(e) || jM(e) || !!(Um && e && e[Um]);
}
var DM = MM, FM = Wu, LM = DM;
function uv(e, t, r, n, o) {
  var i = -1, a = e.length;
  for (r || (r = LM), o || (o = []); ++i < a; ) {
    var l = e[i];
    t > 0 && r(l) ? t > 1 ? uv(l, t - 1, r, n, o) : FM(o, l) : n || (o[o.length] = l);
  }
  return o;
}
var Cl = uv, BM = Cl;
function VM(e) {
  var t = e == null ? 0 : e.length;
  return t ? BM(e, 1) : [];
}
var td = VM;
function zM(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var dv = zM, UM = dv, Wm = Math.max;
function WM(e, t, r) {
  return t = Wm(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = Wm(n.length - t, 0), a = Array(i); ++o < i; )
      a[o] = n[t + o];
    o = -1;
    for (var l = Array(t + 1); ++o < t; )
      l[o] = n[o];
    return l[t] = r(a), UM(e, this, l);
  };
}
var fv = WM;
function qM(e) {
  return function() {
    return e;
  };
}
var KM = qM;
function HM(e) {
  return e;
}
var hs = HM, GM = KM, qm = Jg, YM = hs, XM = qm ? function(e, t) {
  return qm(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: GM(t),
    writable: !0
  });
} : YM, JM = XM, ZM = 800, QM = 16, e2 = Date.now;
function t2(e) {
  var t = 0, r = 0;
  return function() {
    var n = e2(), o = QM - (n - r);
    if (r = n, o > 0) {
      if (++t >= ZM)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var r2 = t2, n2 = JM, o2 = r2, i2 = o2(n2), pv = i2, s2 = td, a2 = fv, l2 = pv;
function c2(e) {
  return l2(a2(e, void 0, s2), e + "");
}
var mv = c2, u2 = nn, d2 = av, f2 = cv, p2 = ei, m2 = ti, h2 = AM, y2 = mv, g2 = ev, v2 = 1, b2 = 2, $2 = 4, S2 = y2(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = u2(t, function(i) {
    return i = p2(i, e), n || (n = i.length > 1), i;
  }), m2(e, g2(e), r), n && (r = d2(r, v2 | b2 | $2, h2));
  for (var o = t.length; o--; )
    f2(r, t[o]);
  return r;
}), E2 = S2;
const Oa = /* @__PURE__ */ pt(E2);
function rd(e, t) {
  const r = t[e];
  return [Oa(t, [e]), r];
}
function nd(e, t = {}) {
  let r = e || "";
  if (r.startsWith("#"))
    r = decodeURIComponent(r.substring(1));
  else
    throw new Error(`Could not find a definition for ${e}.`);
  const n = Tl.get(t, r);
  if (n === void 0)
    throw new Error(`Could not find a definition for ${e}.`);
  if (n[At]) {
    const [o, i] = rd(At, n), a = nd(i, t);
    return Object.keys(o).length > 0 ? { ...o, ...a } : a;
  }
  return n;
}
var _2 = Object.prototype, x2 = _2.hasOwnProperty;
function w2(e, t) {
  return e != null && x2.call(e, t);
}
var T2 = w2, O2 = ei, C2 = us, P2 = Lt, R2 = _l, I2 = Ku, N2 = eo;
function A2(e, t, r) {
  t = O2(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var a = N2(t[n]);
    if (!(i = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && I2(o) && R2(a, o) && (P2(e) || C2(e)));
}
var hv = A2, j2 = T2, k2 = hv;
function M2(e, t) {
  return e != null && k2(e, t, j2);
}
var D2 = M2;
const Jt = /* @__PURE__ */ pt(D2);
var F2 = rn, L2 = br, B2 = "[object Number]";
function V2(e) {
  return typeof e == "number" || L2(e) && F2(e) == B2;
}
var z2 = V2;
const yv = /* @__PURE__ */ pt(z2);
var U2 = rn, W2 = Lt, q2 = br, K2 = "[object String]";
function H2(e) {
  return typeof e == "string" || !W2(e) && q2(e) && U2(e) == K2;
}
var G2 = H2;
const od = /* @__PURE__ */ pt(G2);
function Y2(e, t, r, n) {
  var o = -1, i = e == null ? 0 : e.length;
  for (n && i && (r = e[++o]); ++o < i; )
    r = t(r, e[o], o, e);
  return r;
}
var X2 = Y2;
function J2(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), a = n(t), l = a.length; l--; ) {
      var c = a[e ? l : ++o];
      if (r(i[c], c, i) === !1)
        break;
    }
    return t;
  };
}
var Z2 = J2, Q2 = Z2, eD = Q2(), gv = eD, tD = gv, rD = fs;
function nD(e, t) {
  return e && tD(e, t, rD);
}
var vv = nD, oD = Qn;
function iD(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!oD(r))
      return e(r, n);
    for (var o = r.length, i = t ? o : -1, a = Object(r); (t ? i-- : ++i < o) && n(a[i], i, a) !== !1; )
      ;
    return r;
  };
}
var sD = iD, aD = vv, lD = sD, cD = lD(aD), id = cD, uD = $l, dD = wl, fD = 1, pD = 2;
function mD(e, t, r, n) {
  var o = r.length, i = o, a = !n;
  if (e == null)
    return !i;
  for (e = Object(e); o--; ) {
    var l = r[o];
    if (a && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++o < i; ) {
    l = r[o];
    var c = l[0], u = e[c], d = l[1];
    if (a && l[2]) {
      if (u === void 0 && !(c in e))
        return !1;
    } else {
      var p = new uD();
      if (n)
        var f = n(u, d, c, e, t, p);
      if (!(f === void 0 ? dD(d, u, fD | pD, n, p) : f))
        return !1;
    }
  }
  return !0;
}
var hD = mD, yD = nr;
function gD(e) {
  return e === e && !yD(e);
}
var bv = gD, vD = bv, bD = fs;
function $D(e) {
  for (var t = bD(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, vD(o)];
  }
  return t;
}
var SD = $D;
function ED(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var $v = ED, _D = hD, xD = SD, wD = $v;
function TD(e) {
  var t = xD(e);
  return t.length == 1 && t[0][2] ? wD(t[0][0], t[0][1]) : function(r) {
    return r === e || _D(r, e, t);
  };
}
var OD = TD;
function CD(e, t) {
  return e != null && t in Object(e);
}
var PD = CD, RD = PD, ID = hv;
function ND(e, t) {
  return e != null && ID(e, t, RD);
}
var Sv = ND, AD = wl, jD = Hg, kD = Sv, MD = Gu, DD = bv, FD = $v, LD = eo, BD = 1, VD = 2;
function zD(e, t) {
  return MD(e) && DD(t) ? FD(LD(e), t) : function(r) {
    var n = jD(r, e);
    return n === void 0 && n === t ? kD(r, e) : AD(t, n, BD | VD);
  };
}
var UD = zD;
function WD(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var qD = WD, KD = ms;
function HD(e) {
  return function(t) {
    return KD(t, e);
  };
}
var GD = HD, YD = qD, XD = GD, JD = Gu, ZD = eo;
function QD(e) {
  return JD(e) ? YD(ZD(e)) : XD(e);
}
var eF = QD, tF = OD, rF = UD, nF = hs, oF = Lt, iF = eF;
function sF(e) {
  return typeof e == "function" ? e : e == null ? nF : typeof e == "object" ? oF(e) ? rF(e[0], e[1]) : tF(e) : iF(e);
}
var sd = sF;
function aF(e, t, r, n, o) {
  return o(e, function(i, a, l) {
    r = n ? (n = !1, i) : t(r, i, a, l);
  }), r;
}
var lF = aF, cF = X2, uF = id, dF = sd, fF = lF, pF = Lt;
function mF(e, t, r) {
  var n = pF(e) ? cF : fF, o = arguments.length < 3;
  return n(e, dF(t), r, o, uF);
}
var hF = mF;
const yF = /* @__PURE__ */ pt(hF);
var gF = hs;
function vF(e) {
  return typeof e == "function" ? e : gF;
}
var Ev = vF, bF = /\s/;
function $F(e) {
  for (var t = e.length; t-- && bF.test(e.charAt(t)); )
    ;
  return t;
}
var SF = $F, EF = SF, _F = /^\s+/;
function xF(e) {
  return e && e.slice(0, EF(e) + 1).replace(_F, "");
}
var wF = xF, TF = wF, Km = nr, OF = Qo, Hm = 0 / 0, CF = /^[-+]0x[0-9a-f]+$/i, PF = /^0b[01]+$/i, RF = /^0o[0-7]+$/i, IF = parseInt;
function NF(e) {
  if (typeof e == "number")
    return e;
  if (OF(e))
    return Hm;
  if (Km(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Km(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = TF(e);
  var r = PF.test(e);
  return r || RF.test(e) ? IF(e.slice(2), r ? 2 : 8) : CF.test(e) ? Hm : +e;
}
var AF = NF, jF = AF, Gm = 1 / 0, kF = 17976931348623157e292;
function MF(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = jF(e), e === Gm || e === -Gm) {
    var t = e < 0 ? -1 : 1;
    return t * kF;
  }
  return e === e ? e : 0;
}
var DF = MF, FF = DF;
function LF(e) {
  var t = FF(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var BF = LF, VF = kg, zF = Ev, UF = BF, WF = 9007199254740991, uc = 4294967295, qF = Math.min;
function KF(e, t) {
  if (e = UF(e), e < 1 || e > WF)
    return [];
  var r = uc, n = qF(e, uc);
  t = zF(t), e -= uc;
  for (var o = VF(n, t); ++r < e; )
    t(r);
  return o;
}
var HF = KF;
const _v = /* @__PURE__ */ pt(HF);
function xv(e, t, r) {
  var n;
  if (e && r) {
    const o = Te(e, r);
    if (o === void 0)
      return;
    for (let i = 0; i < t.length; i++) {
      const a = t[i], l = Te(a, [Tt, r], {});
      if (!(l.type === "object" || l.type === "array") && (l.const === o || !((n = l.enum) === null || n === void 0) && n.includes(o)))
        return i;
    }
  }
}
function wv(e, t, r, n, o) {
  if (t === void 0)
    return 0;
  const i = xv(t, r, o);
  if (yv(i))
    return i;
  for (let a = 0; a < r.length; a++) {
    const l = r[a];
    if (o && Jt(l, [Tt, o])) {
      const c = Te(t, o), u = Te(l, [Tt, o], {});
      if (e.isValid(u, c, n))
        return a;
    } else if (l[Tt]) {
      const c = {
        anyOf: Object.keys(l[Tt]).map((d) => ({
          required: [d]
        }))
      };
      let u;
      if (l.anyOf) {
        const { ...d } = l;
        d.allOf ? d.allOf = d.allOf.slice() : d.allOf = [], d.allOf.push(c), u = d;
      } else
        u = Object.assign({}, l, c);
      if (delete u.required, e.isValid(u, t, n))
        return a;
    } else if (e.isValid(l, t, n))
      return a;
  }
  return 0;
}
function ad(e, t, r, n, o) {
  return wv(e, t, r, n, o);
}
var GF = wl;
function YF(e, t) {
  return GF(e, t);
}
var ld = YF;
const Hn = /* @__PURE__ */ pt(ld);
var XF = Qu, JF = ei, ZF = _l, Ym = nr, QF = eo;
function eL(e, t, r, n) {
  if (!Ym(e))
    return e;
  t = JF(t, e);
  for (var o = -1, i = t.length, a = i - 1, l = e; l != null && ++o < i; ) {
    var c = QF(t[o]), u = r;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return e;
    if (o != a) {
      var d = l[c];
      u = n ? n(d, c, l) : void 0, u === void 0 && (u = Ym(d) ? d : ZF(t[o + 1]) ? [] : {});
    }
    XF(l, c, u), l = l[c];
  }
  return e;
}
var Tv = eL, tL = Tv;
function rL(e, t, r) {
  return e == null ? e : tL(e, t, r);
}
var nL = rL;
const Kt = /* @__PURE__ */ pt(nL);
var oL = Ju, iL = rv, sL = vv, aL = sd, lL = ml, cL = Lt, uL = Jo, dL = gl, fL = nr, pL = ds;
function mL(e, t, r) {
  var n = cL(e), o = n || uL(e) || pL(e);
  if (t = aL(t), r == null) {
    var i = e && e.constructor;
    o ? r = n ? new i() : [] : fL(e) ? r = dL(i) ? iL(lL(e)) : {} : r = {};
  }
  return (o ? oL : sL)(e, function(a, l, c) {
    return t(r, a, l, c);
  }), r;
}
var hL = mL;
const yL = /* @__PURE__ */ pt(hL);
var gL = Zu, vL = Ko;
function bL(e, t, r) {
  (r !== void 0 && !vL(e[t], r) || r === void 0 && !(t in e)) && gL(e, t, r);
}
var Ov = bL, $L = Qn, SL = br;
function EL(e) {
  return SL(e) && $L(e);
}
var Pl = EL;
function _L(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Cv = _L, xL = ti, wL = ri;
function TL(e) {
  return xL(e, wL(e));
}
var OL = TL, Xm = Ov, CL = Zg, PL = tv, RL = Ol, IL = nv, Jm = us, Zm = Lt, NL = Pl, AL = Jo, jL = gl, kL = nr, ML = qo, DL = ds, Qm = Cv, FL = OL;
function LL(e, t, r, n, o, i, a) {
  var l = Qm(e, r), c = Qm(t, r), u = a.get(c);
  if (u) {
    Xm(e, r, u);
    return;
  }
  var d = i ? i(l, c, r + "", e, t, a) : void 0, p = d === void 0;
  if (p) {
    var f = Zm(c), m = !f && AL(c), h = !f && !m && DL(c);
    d = c, f || m || h ? Zm(l) ? d = l : NL(l) ? d = RL(l) : m ? (p = !1, d = CL(c, !0)) : h ? (p = !1, d = PL(c, !0)) : d = [] : ML(c) || Jm(c) ? (d = l, Jm(l) ? d = FL(l) : (!kL(l) || jL(l)) && (d = IL(c))) : p = !1;
  }
  p && (a.set(c, d), o(d, c, n, i, a), a.delete(c)), Xm(e, r, d);
}
var BL = LL, VL = $l, zL = Ov, UL = gv, WL = BL, qL = nr, KL = ri, HL = Cv;
function Pv(e, t, r, n, o) {
  e !== t && UL(t, function(i, a) {
    if (o || (o = new VL()), qL(i))
      WL(e, t, a, r, Pv, n, o);
    else {
      var l = n ? n(HL(e, a), i, a + "", e, t, o) : void 0;
      l === void 0 && (l = i), zL(e, a, l);
    }
  }, KL);
}
var cd = Pv, GL = hs, YL = fv, XL = pv;
function JL(e, t) {
  return XL(YL(e, t, GL), e + "");
}
var En = JL, ZL = Ko, QL = Qn, eB = _l, tB = nr;
function rB(e, t, r) {
  if (!tB(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? QL(r) && eB(t, r.length) : n == "string" && t in r) ? ZL(r[t], e) : !1;
}
var ud = rB, nB = En, oB = ud;
function iB(e) {
  return nB(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && oB(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var l = r[n];
      l && e(t, l, n, i);
    }
    return t;
  });
}
var Rv = iB, sB = cd, aB = Rv, lB = aB(function(e, t, r) {
  sB(e, t, r);
}), cB = lB;
const uB = /* @__PURE__ */ pt(cB);
var dB = Cl, fB = 1 / 0;
function pB(e) {
  var t = e == null ? 0 : e.length;
  return t ? dB(e, fB) : [];
}
var dd = pB;
const mB = /* @__PURE__ */ pt(dd);
function hB(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
var yB = hB;
function gB(e) {
  return e !== e;
}
var vB = gB;
function bB(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
var $B = bB, SB = yB, EB = vB, _B = $B;
function xB(e, t, r) {
  return t === t ? _B(e, t, r) : SB(e, EB, r);
}
var Iv = xB, wB = Iv;
function TB(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && wB(e, t, 0) > -1;
}
var fd = TB;
function OB(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var pd = OB;
function CB() {
}
var PB = CB, dc = Bg, RB = PB, IB = Uu, NB = 1 / 0, AB = dc && 1 / IB(new dc([, -0]))[1] == NB ? function(e) {
  return new dc(e);
} : RB, jB = AB, kB = Sl, MB = fd, DB = pd, FB = El, LB = jB, BB = Uu, VB = 200;
function zB(e, t, r) {
  var n = -1, o = MB, i = e.length, a = !0, l = [], c = l;
  if (r)
    a = !1, o = DB;
  else if (i >= VB) {
    var u = t ? null : LB(e);
    if (u)
      return BB(u);
    a = !1, o = FB, c = new kB();
  } else
    c = t ? [] : l;
  e:
    for (; ++n < i; ) {
      var d = e[n], p = t ? t(d) : d;
      if (d = r || d !== 0 ? d : 0, a && p === p) {
        for (var f = c.length; f--; )
          if (c[f] === p)
            continue e;
        t && c.push(p), l.push(d);
      } else
        o(c, p, r) || (c !== l && c.push(p), l.push(d));
    }
  return l;
}
var md = zB, UB = md;
function WB(e) {
  return e && e.length ? UB(e) : [];
}
var Rl = WB;
const qB = /* @__PURE__ */ pt(Rl);
var KB = av, HB = 1, GB = 4;
function YB(e) {
  return KB(e, HB | GB);
}
var Nv = YB;
const Av = /* @__PURE__ */ pt(Nv);
var XB = id, JB = Qn;
function ZB(e, t) {
  var r = -1, n = JB(e) ? Array(e.length) : [];
  return XB(e, function(o, i, a) {
    n[++r] = t(o, i, a);
  }), n;
}
var QB = ZB;
function e5(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var t5 = e5, eh = Qo;
function r5(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, o = e === e, i = eh(e), a = t !== void 0, l = t === null, c = t === t, u = eh(t);
    if (!l && !u && !i && e > t || i && a && c && !l && !u || n && a && c || !r && c || !o)
      return 1;
    if (!n && !i && !u && e < t || u && r && o && !n && !i || l && r && o || !a && o || !c)
      return -1;
  }
  return 0;
}
var n5 = r5, o5 = n5;
function i5(e, t, r) {
  for (var n = -1, o = e.criteria, i = t.criteria, a = o.length, l = r.length; ++n < a; ) {
    var c = o5(o[n], i[n]);
    if (c) {
      if (n >= l)
        return c;
      var u = r[n];
      return c * (u == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var s5 = i5, fc = nn, a5 = ms, l5 = sd, c5 = QB, u5 = t5, d5 = Zn, f5 = s5, p5 = hs, m5 = Lt;
function h5(e, t, r) {
  t.length ? t = fc(t, function(i) {
    return m5(i) ? function(a) {
      return a5(a, i.length === 1 ? i[0] : i);
    } : i;
  }) : t = [p5];
  var n = -1;
  t = fc(t, d5(l5));
  var o = c5(e, function(i, a, l) {
    var c = fc(t, function(u) {
      return u(i);
    });
    return { criteria: c, index: ++n, value: i };
  });
  return u5(o, function(i, a) {
    return f5(i, a, r);
  });
}
var y5 = h5, g5 = Cl, v5 = y5, b5 = En, th = ud, $5 = b5(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && th(e, t[0], t[1]) ? t = [] : r > 2 && th(t[0], t[1], t[2]) && (t = [t[0]]), v5(e, g5(t, 1), []);
}), jv = $5, S5 = md;
function E5(e, t) {
  return t = typeof t == "function" ? t : void 0, e && e.length ? S5(e, void 0, t) : [];
}
var hd = E5, _5 = En, x5 = Ko, w5 = ud, T5 = ri, kv = Object.prototype, O5 = kv.hasOwnProperty, C5 = _5(function(e, t) {
  e = Object(e);
  var r = -1, n = t.length, o = n > 2 ? t[2] : void 0;
  for (o && w5(t[0], t[1], o) && (n = 1); ++r < n; )
    for (var i = t[r], a = T5(i), l = -1, c = a.length; ++l < c; ) {
      var u = a[l], d = e[u];
      (d === void 0 || x5(d, kv[u]) && !O5.call(e, u)) && (e[u] = i[u]);
    }
  return e;
}), P5 = C5, R5 = Sl, I5 = fd, N5 = pd, A5 = nn, j5 = Zn, rh = El, k5 = Math.min;
function M5(e, t, r) {
  for (var n = r ? N5 : I5, o = e[0].length, i = e.length, a = i, l = Array(i), c = 1 / 0, u = []; a--; ) {
    var d = e[a];
    a && t && (d = A5(d, j5(t))), c = k5(d.length, c), l[a] = !r && (t || o >= 120 && d.length >= 120) ? new R5(a && d) : void 0;
  }
  d = e[0];
  var p = -1, f = l[0];
  e:
    for (; ++p < o && u.length < c; ) {
      var m = d[p], h = t ? t(m) : m;
      if (m = r || m !== 0 ? m : 0, !(f ? rh(f, h) : n(u, h, r))) {
        for (a = i; --a; ) {
          var g = l[a];
          if (!(g ? rh(g, h) : n(e[a], h, r)))
            continue e;
        }
        f && f.push(h), u.push(m);
      }
    }
  return u;
}
var Mv = M5, D5 = Pl;
function F5(e) {
  return D5(e) ? e : [];
}
var Dv = F5, L5 = nn, B5 = Mv, V5 = En, z5 = Dv, U5 = lv, W5 = V5(function(e) {
  var t = U5(e), r = L5(e, z5);
  return t = typeof t == "function" ? t : void 0, t && r.pop(), r.length && r[0] === e[0] ? B5(r, void 0, t) : [];
}), Fv = W5, q5 = rn, K5 = br, H5 = "[object Boolean]";
function G5(e) {
  return e === !0 || e === !1 || K5(e) && q5(e) == H5;
}
var Y5 = G5, Pr = ld, X5 = jv, yd = Rl, nh = hd, J5 = P5, Z5 = Fv, Ca = qo, pc = Y5, oh = (e) => Array.isArray(e) ? e : [e], yr = (e) => e === void 0, Fs = (e) => Ca(e) || Array.isArray(e) ? Object.keys(e) : [], So = (e, t) => e.hasOwnProperty(t), Ao = (e) => X5(yd(e)), ih = (e) => yr(e) || Array.isArray(e) && e.length === 0, Q5 = (e, t, r, n) => t && So(t, r) && e && So(e, r) && n(e[r], t[r]), mc = (e, t) => yr(e) && t === 0 || yr(t) && e === 0 || Pr(e, t), eV = (e, t) => yr(e) && t === !1 || yr(t) && e === !1 || Pr(e, t), sh = (e) => yr(e) || Pr(e, {}) || e === !0, Ls = (e) => yr(e) || Pr(e, {}), ah = (e) => yr(e) || Ca(e) || e === !0 || e === !1;
function lh(e, t) {
  return ih(e) && ih(t) ? !0 : Pr(Ao(e), Ao(t));
}
function tV(e, t) {
  return e = oh(e), t = oh(t), Pr(Ao(e), Ao(t));
}
function ra(e, t, r, n) {
  var o = yd(Fs(e).concat(Fs(t)));
  return Ls(e) && Ls(t) ? !0 : Ls(e) && Fs(t).length || Ls(t) && Fs(e).length ? !1 : o.every(function(i) {
    var a = e[i], l = t[i];
    return Array.isArray(a) && Array.isArray(l) ? Pr(Ao(e), Ao(t)) : Array.isArray(a) && !Array.isArray(l) || Array.isArray(l) && !Array.isArray(a) ? !1 : Q5(e, t, i, n);
  });
}
function rV(e, t, r, n) {
  return Ca(e) && Ca(t) ? n(e, t) : Array.isArray(e) && Array.isArray(t) ? ra(e, t, r, n) : Pr(e, t);
}
function hc(e, t, r, n) {
  var o = nh(e, n), i = nh(t, n), a = Z5(o, i, n);
  return a.length === Math.max(o.length, i.length);
}
var nV = {
  title: Pr,
  uniqueItems: eV,
  minLength: mc,
  minItems: mc,
  minProperties: mc,
  required: lh,
  enum: lh,
  type: tV,
  items: rV,
  anyOf: hc,
  allOf: hc,
  oneOf: hc,
  properties: ra,
  patternProperties: ra,
  dependencies: ra
}, oV = [
  "properties",
  "patternProperties",
  "dependencies",
  "uniqueItems",
  "minLength",
  "minItems",
  "minProperties",
  "required"
], iV = ["additionalProperties", "additionalItems", "contains", "propertyNames", "not"];
function Zc(e, t, r) {
  if (r = J5(r, {
    ignore: []
  }), sh(e) && sh(t))
    return !0;
  if (!ah(e) || !ah(t))
    throw new Error("Either of the values are not a JSON schema.");
  if (e === t)
    return !0;
  if (pc(e) && pc(t))
    return e === t;
  if (e === void 0 && t === !1 || t === void 0 && e === !1 || yr(e) && !yr(t) || !yr(e) && yr(t))
    return !1;
  var n = yd(Object.keys(e).concat(Object.keys(t)));
  if (r.ignore.length && (n = n.filter((i) => r.ignore.indexOf(i) === -1)), !n.length)
    return !0;
  function o(i, a) {
    return Zc(i, a, r);
  }
  return n.every(function(i) {
    var a = e[i], l = t[i];
    if (iV.indexOf(i) !== -1)
      return Zc(a, l, r);
    var c = nV[i];
    if (c || (c = Pr), Pr(a, l))
      return !0;
    if (oV.indexOf(i) === -1 && (!So(e, i) && So(t, i) || So(e, i) && !So(t, i)))
      return a === l;
    var u = c(a, l, i, o);
    if (!pc(u))
      throw new Error("Comparer must return true or false");
    return u;
  });
}
var gd = Zc;
function sV(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
}
var vd = Array.isArray || sV;
function aV(e) {
  return (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]") && e.valueOf() === e.valueOf();
}
var lV = aV, cV = lV;
function uV(e) {
  return cV(e) && e % 1 === 0;
}
var dV = uV, fV = vd, pV = dV;
function mV(e) {
  var t;
  if (!fV(e) || (t = e.length, !t))
    return !1;
  for (var r = 0; r < t; r++)
    if (!pV(e[r]))
      return !1;
  return !0;
}
var Lv = mV;
function hV(e) {
  return typeof e == "function";
}
var Bv = hV, yV = vd, ch = Lv, gV = Bv, Bs = Math.pow(2, 31) - 1;
function uh(e, t) {
  var r = 1, n;
  if (e === 0)
    return t;
  if (t === 0)
    return e;
  for (; e % 2 === 0 && t % 2 === 0; )
    e = e / 2, t = t / 2, r = r * 2;
  for (; e % 2 === 0; )
    e = e / 2;
  for (; t; ) {
    for (; t % 2 === 0; )
      t = t / 2;
    e > t && (n = t, t = e, e = n), t = t - e;
  }
  return r * e;
}
function dh(e, t) {
  var r = 0, n;
  if (e === 0)
    return t;
  if (t === 0)
    return e;
  for (; !(e & 1) && !(t & 1); )
    e >>>= 1, t >>>= 1, r++;
  for (; !(e & 1); )
    e >>>= 1;
  for (; t; ) {
    for (; !(t & 1); )
      t >>>= 1;
    e > t && (n = t, t = e, e = n), t = t - e;
  }
  return e << r;
}
function vV() {
  var e = arguments.length, t, r, n, o, i, a, l;
  for (t = new Array(e), l = 0; l < e; l++)
    t[l] = arguments[l];
  if (ch(t)) {
    if (e === 2)
      return i = t[0], a = t[1], i < 0 && (i = -i), a < 0 && (a = -a), i <= Bs && a <= Bs ? dh(i, a) : uh(i, a);
    n = t;
  } else if (yV(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !gV(r))
        throw new TypeError("gcd()::invalid input argument. Accessor must be a function. Value: `" + r + "`.");
    } else
      n = t[0];
  else
    throw new TypeError("gcd()::invalid input argument. Must provide an array of integers. Value: `" + t[0] + "`.");
  if (o = n.length, o < 2)
    return null;
  if (r) {
    for (i = new Array(o), l = 0; l < o; l++)
      i[l] = r(n[l], l);
    n = i;
  }
  if (e < 3 && !ch(n))
    throw new TypeError("gcd()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (l = 0; l < o; l++)
    i = n[l], i < 0 && (n[l] = -i);
  for (i = n[0], l = 1; l < o; l++)
    a = n[l], a <= Bs && i <= Bs ? i = dh(i, a) : i = uh(i, a);
  return i;
}
var bV = vV, fh = bV, $V = vd, ph = Lv, SV = Bv;
function EV() {
  var e = arguments.length, t, r, n, o, i, a, l;
  for (t = new Array(e), l = 0; l < e; l++)
    t[l] = arguments[l];
  if (ph(t)) {
    if (e === 2)
      return i = t[0], a = t[1], i < 0 && (i = -i), a < 0 && (a = -a), i === 0 || a === 0 ? 0 : i / fh(i, a) * a;
    n = t;
  } else if ($V(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !SV(r))
        throw new TypeError("lcm()::invalid input argument. Accessor must be a function. Value: `" + r + "`.");
    } else
      n = t[0];
  else
    throw new TypeError("lcm()::invalid input argument. Must provide an array of integers. Value: `" + t[0] + "`.");
  if (o = n.length, o < 2)
    return null;
  if (r) {
    for (i = new Array(o), l = 0; l < o; l++)
      i[l] = r(n[l], l);
    n = i;
  }
  if (e < 3 && !ph(n))
    throw new TypeError("lcm()::invalid input argument. Accessed array values must be integers. Value: `" + n + "`.");
  for (l = 0; l < o; l++)
    i = n[l], i < 0 && (n[l] = -i);
  for (i = n[0], l = 1; l < o; l++) {
    if (a = n[l], i === 0 || a === 0)
      return 0;
    i = i / fh(i, a) * a;
  }
  return i;
}
var _V = EV, xV = cd, mh = nr;
function Vv(e, t, r, n, o, i) {
  return mh(e) && mh(t) && (i.set(t, e), xV(e, t, void 0, Vv, i), i.delete(t)), e;
}
var wV = Vv, TV = cd, OV = Rv, CV = OV(function(e, t, r, n) {
  TV(e, t, r, n);
}), PV = CV, RV = dv, IV = En, NV = wV, AV = PV, jV = IV(function(e) {
  return e.push(void 0, NV), RV(AV, void 0, e);
}), kV = jV, MV = nn, DV = Mv, FV = En, LV = Dv, BV = FV(function(e) {
  var t = MV(e, LV);
  return t.length && t[0] === e[0] ? DV(t) : [];
}), VV = BV;
function zV(e, t, r, n) {
  for (var o = r - 1, i = e.length; ++o < i; )
    if (n(e[o], t))
      return o;
  return -1;
}
var UV = zV, WV = nn, qV = Iv, KV = UV, HV = Zn, GV = Ol, YV = Array.prototype, hh = YV.splice;
function XV(e, t, r, n) {
  var o = n ? KV : qV, i = -1, a = t.length, l = e;
  for (e === t && (t = GV(t)), r && (l = WV(e, HV(r))); ++i < a; )
    for (var c = 0, u = t[i], d = r ? r(u) : u; (c = o(l, d, c, n)) > -1; )
      l !== e && hh.call(l, c, 1), hh.call(e, c, 1);
  return e;
}
var JV = XV, ZV = JV;
function QV(e, t) {
  return e && e.length && t && t.length ? ZV(e, t) : e;
}
var ez = QV, tz = Ju, rz = id, nz = Ev, oz = Lt;
function iz(e, t) {
  var r = oz(e) ? tz : rz;
  return r(e, nz(t));
}
var zv = iz, sz = Sl, az = fd, lz = pd, cz = nn, uz = Zn, dz = El, fz = 200;
function pz(e, t, r, n) {
  var o = -1, i = az, a = !0, l = e.length, c = [], u = t.length;
  if (!l)
    return c;
  r && (t = cz(t, uz(r))), n ? (i = lz, a = !1) : t.length >= fz && (i = dz, a = !1, t = new sz(t));
  e:
    for (; ++o < l; ) {
      var d = e[o], p = r == null ? d : r(d);
      if (d = n || d !== 0 ? d : 0, a && p === p) {
        for (var f = u; f--; )
          if (t[f] === p)
            continue e;
        c.push(d);
      } else
        i(t, p, n) || c.push(d);
    }
  return c;
}
var mz = pz, hz = mz, yz = En, gz = Pl, vz = yz(function(e, t) {
  return gz(e) ? hz(e, t) : [];
}), bz = vz;
const $z = td, Sz = dd, Uv = qo, Ez = Rl, _z = hd, xz = bz;
function wz(e) {
  for (const t in e)
    Wv(e, t) && qv(e[t]) && delete e[t];
  return e;
}
const Tz = (e) => Ez(Sz(e.map(bd))), Oz = (e, t) => e.map((r) => r && r[t]), Wv = (e, t) => Object.prototype.hasOwnProperty.call(e, t), bd = (e) => Uv(e) || Array.isArray(e) ? Object.keys(e) : [], Cz = (e) => e !== void 0, Pz = (e) => Uv(e) || e === !0 || e === !1, qv = (e) => !bd(e).length && e !== !1 && e !== !0, Rz = (e, ...t) => xz.apply(null, [e].concat($z(t)));
var Kv = {
  allUniqueKeys: Tz,
  deleteUndefinedProps: wz,
  getValues: Oz,
  has: Wv,
  isEmptySchema: qv,
  isSchema: Pz,
  keys: bd,
  notUndefined: Cz,
  uniqWith: _z,
  withoutArr: Rz
};
const Iz = gd, Nz = zv, {
  allUniqueKeys: Az,
  deleteUndefinedProps: jz,
  getValues: kz,
  keys: bi,
  notUndefined: Mz,
  uniqWith: Dz,
  withoutArr: yh
} = Kv;
function Fz(e) {
  Nz(e, function(t, r) {
    t === !1 && delete e[r];
  });
}
function gh(e, t) {
  return Az(e).reduce(function(n, o) {
    const i = kz(e, o), a = Dz(i.filter(Mz), Iz);
    return n[o] = t(a, o), n;
  }, {});
}
var Lz = {
  keywords: ["properties", "patternProperties", "additionalProperties"],
  resolver(e, t, r, n) {
    n.ignoreAdditionalProperties || (e.forEach(function(i) {
      const a = e.filter((d) => d !== i), l = bi(i.properties), u = bi(i.patternProperties).map((d) => new RegExp(d));
      a.forEach(function(d) {
        const p = bi(d.properties), f = p.filter((h) => u.some((g) => g.test(h)));
        yh(p, l, f).forEach(function(h) {
          d.properties[h] = r.properties([
            d.properties[h],
            i.additionalProperties
          ], h);
        });
      });
    }), e.forEach(function(i) {
      const a = e.filter((c) => c !== i), l = bi(i.patternProperties);
      i.additionalProperties === !1 && a.forEach(function(c) {
        const u = bi(c.patternProperties);
        yh(u, l).forEach((p) => delete c.patternProperties[p]);
      });
    }));
    const o = {
      additionalProperties: r.additionalProperties(e.map((i) => i.additionalProperties)),
      patternProperties: gh(e.map((i) => i.patternProperties), r.patternProperties),
      properties: gh(e.map((i) => i.properties), r.properties)
    };
    return o.additionalProperties === !1 && Fz(o.properties), jz(o);
  }
};
const Bz = gd, Vz = zv, {
  allUniqueKeys: zz,
  deleteUndefinedProps: Uz,
  has: Wz,
  isSchema: Hv,
  notUndefined: Gv,
  uniqWith: qz
} = Kv;
function Kz(e) {
  Vz(e, function(t, r) {
    t === !1 && e.splice(r, 1);
  });
}
function Hz(e, t) {
  return e.map(function(r) {
    if (r)
      if (Array.isArray(r.items)) {
        const n = r.items[t];
        if (Hv(n))
          return n;
        if (Wz(r, "additionalItems"))
          return r.additionalItems;
      } else
        return r.items;
  });
}
function Gz(e) {
  return e.map(function(t) {
    if (t)
      return Array.isArray(t.items) ? t.additionalItems : t.items;
  });
}
function Yz(e, t, r) {
  return zz(r).reduce(function(o, i) {
    const a = Hz(e, i), l = qz(a.filter(Gv), Bz);
    return o[i] = t(l, i), o;
  }, []);
}
var Xz = {
  keywords: ["items", "additionalItems"],
  resolver(e, t, r) {
    const n = e.map((l) => l.items), o = n.filter(Gv), i = {};
    o.every(Hv) ? i.items = r.items(n) : i.items = Yz(e, r.items, n);
    let a;
    return o.every(Array.isArray) ? a = e.map((l) => l.additionalItems) : o.some(Array.isArray) && (a = Gz(e)), a && (i.additionalItems = r.additionalItems(a)), i.additionalItems === !1 && Array.isArray(i.items) && Kz(i.items), Uz(i);
  }
};
const Yv = Nv, Pa = gd, Jz = _V, Zz = kV, Xv = td, $d = dd, Qz = VV, eU = Fv, Qc = ld, jo = qo, tU = ez, Jv = jv, Sd = Rl, wo = hd, Zv = Lz, Qv = Xz, Vs = (e, t) => e.indexOf(t) !== -1, rU = (e) => jo(e) || e === !0 || e === !1, nU = (e) => e === !1, eb = (e) => e === !0, Il = (e, t, r) => r(e), tb = (e) => Jv(Sd($d(e))), Ra = (e) => e !== void 0, rb = (e) => Sd($d(e.map(cU))), ni = (e) => e[0], oU = (e) => tb(e), ys = (e) => Math.max.apply(Math, e), gs = (e) => Math.min.apply(Math, e), iU = (e) => e.some(eb), sU = (e) => wo(Xv(e), Qc);
function aU(e) {
  return function(t, r) {
    return Pa({
      [e]: t
    }, { [e]: r });
  };
}
function nb(e) {
  let { allOf: t = [], ...r } = e;
  return r = jo(e) ? r : e, [r, ...t.map(nb)];
}
function ob(e, t) {
  return e.map((r) => r && r[t]);
}
function lU(e, t) {
  return e.map(function(r, n) {
    try {
      return t(r, n);
    } catch {
      return;
    }
  }).filter(Ra);
}
function cU(e) {
  return jo(e) || Array.isArray(e) ? Object.keys(e) : [];
}
function eu(e, t) {
  if (t = t || [], !e.length)
    return t;
  const r = e.slice(0).shift(), n = e.slice(1);
  return t.length ? eu(n, Xv(t.map((o) => r.map((i) => [i].concat(o))))) : eu(n, r.map((o) => o));
}
function ib(e, t) {
  let r;
  try {
    r = e.map(function(n) {
      return JSON.stringify(n, null, 2);
    }).join(`
`);
  } catch {
    r = e.join(", ");
  }
  throw new Error('Could not resolve values for path:"' + t.join(".") + `". They are probably incompatible. Values: 
` + r);
}
function uU(e, t, r, n, o, i) {
  if (e.length) {
    const a = o.complexResolvers[t];
    if (!a || !a.resolver)
      throw new Error("No resolver found for " + t);
    const l = r.map((p) => e.reduce((f, m) => (p[m] !== void 0 && (f[m] = p[m]), f), {})), c = wo(l, Pa), u = a.keywords.reduce((p, f) => ({
      ...p,
      [f]: (m, h = []) => n(m, null, i.concat(f, h))
    }), {}), d = a.resolver(c, i.concat(t), u, o);
    return jo(d) || ib(c, i.concat(t)), d;
  }
}
function dU(e) {
  return { required: e };
}
const fU = ["properties", "patternProperties", "definitions", "dependencies"], pU = ["anyOf", "oneOf"], mU = [
  "additionalProperties",
  "additionalItems",
  "contains",
  "propertyNames",
  "not",
  "items"
], it = {
  type(e) {
    if (e.some(Array.isArray)) {
      const t = e.map(function(n) {
        return Array.isArray(n) ? n : [n];
      }), r = Qz.apply(null, t);
      if (r.length === 1)
        return r[0];
      if (r.length > 1)
        return Sd(r);
    }
  },
  dependencies(e, t, r) {
    return rb(e).reduce(function(o, i) {
      const a = ob(e, i);
      let l = wo(a.filter(Ra), Qc);
      const c = l.filter(Array.isArray);
      if (c.length) {
        if (c.length === l.length)
          o[i] = tb(l);
        else {
          const u = l.filter(rU), d = c.map(dU);
          o[i] = r(u.concat(d), i);
        }
        return o;
      }
      return l = wo(l, Pa), o[i] = r(l, i), o;
    }, {});
  },
  oneOf(e, t, r) {
    const n = eu(Yv(e)), o = lU(n, r), i = wo(o, Pa);
    if (i.length)
      return i;
  },
  not(e) {
    return { anyOf: e };
  },
  pattern(e) {
    return e.map((t) => "(?=" + t + ")").join("");
  },
  multipleOf(e) {
    let t = e.slice(0), r = 1;
    for (; t.some((n) => !Number.isInteger(n)); )
      t = t.map((n) => n * 10), r = r * 10;
    return Jz(t) / r;
  },
  enum(e) {
    const t = eU.apply(null, e.concat(Qc));
    if (t.length)
      return Jv(t);
  }
};
it.$id = ni;
it.$ref = ni;
it.$schema = ni;
it.additionalItems = Il;
it.additionalProperties = Il;
it.anyOf = it.oneOf;
it.contains = Il;
it.default = ni;
it.definitions = it.dependencies;
it.description = ni;
it.examples = sU;
it.exclusiveMaximum = gs;
it.exclusiveMinimum = ys;
it.items = Qv;
it.maximum = gs;
it.maxItems = gs;
it.maxLength = gs;
it.maxProperties = gs;
it.minimum = ys;
it.minItems = ys;
it.minLength = ys;
it.minProperties = ys;
it.properties = Zv;
it.propertyNames = Il;
it.required = oU;
it.title = ni;
it.uniqueItems = iU;
const hU = {
  properties: Zv,
  items: Qv
};
function Ed(e, t, r) {
  t = Zz(t, {
    ignoreAdditionalProperties: !1,
    resolvers: it,
    complexResolvers: hU,
    deep: !0
  });
  const n = Object.entries(t.complexResolvers);
  function o(l, c, u) {
    l = Yv(l.filter(Ra)), u = u || [];
    const d = jo(c) ? c : {};
    if (!l.length)
      return;
    if (l.some(nU))
      return !1;
    if (l.every(eb))
      return !0;
    l = l.filter(jo);
    const p = rb(l);
    if (t.deep && Vs(p, "allOf"))
      return Ed({
        allOf: l
      }, t);
    const f = n.map(([m, h]) => p.filter((g) => h.keywords.includes(g)));
    return f.forEach((m) => tU(p, m)), p.forEach(function(m) {
      const h = ob(l, m), g = wo(h.filter(Ra), aU(m));
      if (g.length === 1 && Vs(pU, m))
        d[m] = g[0].map((y) => o([y], y));
      else if (g.length === 1 && !Vs(fU, m) && !Vs(mU, m))
        d[m] = g[0];
      else {
        const y = t.resolvers[m] || t.resolvers.defaultResolver;
        if (!y)
          throw new Error("No resolver found for key " + m + ". You can provide a resolver for this keyword in the options, or provide a default resolver.");
        const v = ($, E = []) => o($, null, u.concat(m, E));
        d[m] = y(g, u.concat(m), v, t), d[m] === void 0 ? ib(g, u.concat(m)) : d[m] === void 0 && delete d[m];
      }
    }), n.reduce((m, [h, g], y) => ({
      ...m,
      ...uU(f[y], h, l, o, t, u)
    }), d);
  }
  const i = $d(nb(e));
  return o(i);
}
Ed.options = {
  resolvers: it
};
var yU = Ed;
const gU = /* @__PURE__ */ pt(yU);
function ko(e) {
  let t;
  const r = Te(e, "discriminator.propertyName", void 0);
  return od(r) ? t = r : r !== void 0 && console.warn(`Expecting discriminator to be a string, got "${typeof r}" instead`), t;
}
function Ji(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : e == null ? "null" : typeof e == "boolean" ? "boolean" : isNaN(e) ? typeof e == "object" ? "object" : "string" : "number";
}
var vU = Cl, bU = En, $U = md, SU = Pl, EU = bU(function(e) {
  return $U(vU(e, 1, SU, !0));
}), _U = EU;
const xU = /* @__PURE__ */ pt(_U);
function bn(e) {
  let { type: t } = e;
  return !t && e.const ? Ji(e.const) : !t && e.enum ? "string" : !t && (e.properties || e.additionalProperties) ? "object" : (Array.isArray(t) && (t.length === 2 && t.includes("null") ? t = t.find((r) => r !== "null") : t = t[0]), t);
}
function Qr(e, t) {
  const r = Object.assign({}, e);
  return Object.keys(t).reduce((n, o) => {
    const i = e ? e[o] : {}, a = t[o];
    return e && o in e && Et(a) ? n[o] = Qr(i, a) : e && t && (bn(e) === "object" || bn(t) === "object") && o === Hw && Array.isArray(i) && Array.isArray(a) ? n[o] = xU(i, a) : n[o] = a, n;
  }, r);
}
function ar(e, t, r = {}, n) {
  return Mr(e, t, r, n)[0];
}
function wU(e, t, r, n, o, i) {
  const { if: a, then: l, else: c, ...u } = t, d = e.isValid(a, i || {}, r);
  let p = [u], f = [];
  if (n)
    l && typeof l != "boolean" && (f = f.concat(Mr(e, l, r, i, n, o))), c && typeof c != "boolean" && (f = f.concat(Mr(e, c, r, i, n, o)));
  else {
    const m = d ? l : c;
    m && typeof m != "boolean" && (f = f.concat(Mr(e, m, r, i, n, o)));
  }
  return f.length && (p = f.map((m) => Qr(u, m))), p.flatMap((m) => Mr(e, m, r, i, n, o));
}
function sb(e) {
  return e.reduce(
    (r, n) => n.length > 1 ? n.flatMap((o) => _v(r.length, (i) => [...r[i]].concat(o))) : (r.forEach((o) => o.push(n[0])), r),
    [[]]
    // Start with an empty list
  );
}
function TU(e, t, r, n, o, i) {
  const a = ab(e, t, r, n, o, i);
  if (a.length > 1 || a[0] !== t)
    return a;
  if (pl in t)
    return lb(e, t, r, n, o, i).flatMap((c) => Mr(e, c, r, i, n, o));
  if (cs in t && Array.isArray(t.allOf)) {
    const l = t.allOf.map((u) => Mr(e, u, r, i, n, o));
    return sb(l).map((u) => ({ ...t, allOf: u }));
  }
  return [t];
}
function ab(e, t, r, n, o, i) {
  const a = Zi(t, r, o);
  return a !== t ? Mr(e, a, r, i, n, o) : [t];
}
function Zi(e, t, r) {
  if (!Et(e))
    return e;
  let n = e;
  if (At in n) {
    const { $ref: o, ...i } = n;
    if (r.includes(o))
      return n;
    r.push(o), n = { ...nd(o, t), ...i };
  }
  if (Tt in n) {
    const o = [], i = yL(n[Tt], (a, l, c) => {
      const u = [...r];
      a[c] = Zi(l, t, u), o.push(u);
    }, {});
    uB(r, qB(mB(o))), n = { ...n, [Tt]: i };
  }
  return hn in n && !Array.isArray(n.items) && typeof n.items != "boolean" && (n = {
    ...n,
    items: Zi(n.items, t, r)
  }), Hn(e, n) ? e : n;
}
function OU(e, t, r, n) {
  const o = {
    ...t,
    properties: { ...t.properties }
  }, i = n && Et(n) ? n : {};
  return Object.keys(i).forEach((a) => {
    if (a in o.properties)
      return;
    let l = {};
    typeof o.additionalProperties != "boolean" ? At in o.additionalProperties ? l = ar(e, { $ref: Te(o.additionalProperties, [At]) }, r, i) : "type" in o.additionalProperties ? l = { ...o.additionalProperties } : No in o.additionalProperties || yn in o.additionalProperties ? l = {
      type: "object",
      ...o.additionalProperties
    } : l = { type: Ji(Te(i, [a])) } : l = { type: Ji(Te(i, [a])) }, o.properties[a] = l, Kt(o.properties, [a, Uo], !0);
  }), o;
}
function Mr(e, t, r, n, o = !1, i = []) {
  return Et(t) ? TU(e, t, r, o, i, n).flatMap((l) => {
    let c = l;
    if (qw in c)
      return wU(e, c, r, o, i, n);
    if (cs in c) {
      if (o) {
        const { allOf: d, ...p } = c;
        return [...d, p];
      }
      try {
        c = gU(c, {
          deep: !1
        });
      } catch (d) {
        console.warn(`could not merge subschemas in allOf:
`, d);
        const { allOf: p, ...f } = c;
        return f;
      }
    }
    return qc in c && c.additionalProperties !== !1 ? OU(e, c, r, n) : c;
  }) : [{}];
}
function CU(e, t, r, n, o) {
  let i;
  const { oneOf: a, anyOf: l, ...c } = t;
  if (Array.isArray(a) ? i = a : Array.isArray(l) && (i = l), i) {
    const u = o === void 0 && n ? {} : o, d = ko(t);
    i = i.map((f) => Zi(f, r, []));
    const p = ad(e, u, i, r, d);
    if (n)
      return i.map((f) => Qr(c, f));
    t = Qr(c, i[p]);
  }
  return [t];
}
function lb(e, t, r, n, o, i) {
  const { dependencies: a, ...l } = t;
  return CU(e, l, r, n, i).flatMap((u) => cb(e, a, u, r, n, o, i));
}
function cb(e, t, r, n, o, i, a) {
  let l = [r];
  for (const c in t) {
    if (!o && Te(a, [c]) === void 0 || r.properties && !(c in r.properties))
      continue;
    const [u, d] = rd(c, t);
    return Array.isArray(d) ? l[0] = PU(r, d) : Et(d) && (l = RU(e, r, n, c, d, o, i, a)), l.flatMap((p) => cb(e, u, p, n, o, i, a));
  }
  return l;
}
function PU(e, t) {
  if (!t)
    return e;
  const r = Array.isArray(e.required) ? Array.from(/* @__PURE__ */ new Set([...e.required, ...t])) : t;
  return { ...e, required: r };
}
function RU(e, t, r, n, o, i, a, l) {
  return Mr(e, o, r, l, i, a).flatMap((u) => {
    const { oneOf: d, ...p } = u;
    if (t = Qr(t, p), d === void 0)
      return t;
    const f = d.map((h) => typeof h == "boolean" || !(At in h) ? [h] : ab(e, h, r, i, a, l));
    return sb(f).flatMap((h) => IU(e, t, r, n, h, i, a, l));
  });
}
function IU(e, t, r, n, o, i, a, l) {
  const c = o.filter((u) => {
    if (typeof u == "boolean" || !u || !u.properties)
      return !1;
    const { [n]: d } = u.properties;
    if (d) {
      const p = {
        type: "object",
        properties: {
          [n]: d
        }
      };
      return e.isValid(p, l, r) || i;
    }
    return !1;
  });
  return !i && c.length !== 1 ? (console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid"), [t]) : c.flatMap((u) => {
    const d = u, [p] = rd(n, d.properties), f = { ...d, properties: p };
    return Mr(e, f, r, l, i, a).map((h) => Qr(t, h));
  });
}
const NU = {
  type: "object",
  $id: Kw,
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
function tu(e, t, r, n = {}) {
  let o = 0;
  return r && (wr(r.properties) ? o += yF(r.properties, (i, a, l) => {
    const c = Te(n, l);
    if (typeof a == "boolean")
      return i;
    if (Jt(a, At)) {
      const u = ar(e, a, t, c);
      return i + tu(e, t, u, c || {});
    }
    if ((Jt(a, yn) || Jt(a, No)) && c) {
      const u = Jt(a, yn) ? yn : No, d = ko(a);
      return i + Qi(e, t, c, Te(a, u), -1, d);
    }
    if (a.type === "object")
      return i + tu(e, t, a, c || {});
    if (a.type === Ji(c)) {
      let u = i + 1;
      return a.default ? u += c === a.default ? 1 : -1 : a.const && (u += c === a.const ? 1 : -1), u;
    }
    return i;
  }, 0) : od(r.type) && r.type === Ji(n) && (o += 1)), o;
}
function Qi(e, t, r, n, o = -1, i) {
  const a = n.map((p) => Zi(p, t, [])), l = xv(r, n, i);
  if (yv(l))
    return l;
  const c = a.reduce((p, f, m) => (ad(e, r, [NU, f], t, i) === 1 && p.push(m), p), []);
  if (c.length === 1)
    return c[0];
  c.length || _v(a.length, (p) => c.push(p));
  const u = /* @__PURE__ */ new Set(), { bestIndex: d } = c.reduce((p, f) => {
    const { bestScore: m } = p, h = a[f], g = tu(e, t, h, r);
    return u.add(g), g > m ? { bestIndex: f, bestScore: g } : p;
  }, { bestIndex: o, bestScore: 0 });
  return u.size === 1 && o >= 0 ? o : d;
}
function ru(e) {
  return Array.isArray(e.items) && e.items.length > 0 && e.items.every((t) => Et(t));
}
function Ia(e, t, r = !1) {
  if (Array.isArray(t)) {
    const n = Array.isArray(e) ? e : [], o = t.map((i, a) => n[a] ? Ia(n[a], i, r) : i);
    return r && o.length < n.length && o.push(...n.slice(o.length)), o;
  }
  if (Et(t)) {
    const n = Object.assign({}, e);
    return Object.keys(t).reduce((o, i) => (o[i] = Ia(e ? Te(e, i) : {}, Te(t, i), r), o), n);
  }
  return t;
}
function oi(e, t, r = !1) {
  return Object.keys(t).reduce((n, o) => {
    const i = e ? e[o] : {}, a = t[o];
    if (e && o in e && Et(a))
      n[o] = oi(i, a, r);
    else if (r && Array.isArray(i) && Array.isArray(a)) {
      let l = a;
      r === "preventDuplicates" && (l = a.reduce((c, u) => (i.includes(u) || c.push(u), c), [])), n[o] = i.concat(l);
    } else
      n[o] = a;
    return n;
  }, Object.assign({}, e));
}
function AU(e) {
  return Array.isArray(e.enum) && e.enum.length === 1 || _g in e;
}
function ub(e, t, r = {}) {
  const n = ar(e, t, r, void 0), o = n.oneOf || n.anyOf;
  return Array.isArray(n.enum) ? !0 : Array.isArray(o) ? o.every((i) => typeof i != "boolean" && AU(i)) : !1;
}
function _d(e, t, r) {
  return !t.uniqueItems || !t.items || typeof t.items == "boolean" ? !1 : ub(e, t.items, r);
}
var Mo;
(function(e) {
  e[e.Ignore = 0] = "Ignore", e[e.Invert = 1] = "Invert", e[e.Fallback = 2] = "Fallback";
})(Mo || (Mo = {}));
function yc(e, t = Mo.Ignore, r = -1) {
  if (r >= 0) {
    if (Array.isArray(e.items) && r < e.items.length) {
      const n = e.items[r];
      if (typeof n != "boolean")
        return n;
    }
  } else if (e.items && !Array.isArray(e.items) && typeof e.items != "boolean")
    return e.items;
  return t !== Mo.Ignore && Et(e.additionalItems) ? e.additionalItems : {};
}
function vh(e, t, r, n, o, i = [], a = {}) {
  const { emptyObjectFields: l = "populateAllDefaults" } = a;
  if (n)
    e[t] = r;
  else if (l !== "skipDefaults")
    if (Et(r)) {
      const c = o === void 0 ? i.includes(t) : o;
      (!Kn(r) || i.includes(t)) && (c || l !== "populateRequiredDefaults") && (e[t] = r);
    } else
      // Store computedDefault if it's a defined primitive (e.g., true) and satisfies certain conditions
      // Condition 1: computedDefault is not undefined
      // Condition 2: If emptyObjectFields is 'populateAllDefaults' or if the key is a required field
      r !== void 0 && (l === "populateAllDefaults" || i.includes(t)) && (e[t] = r);
}
function dn(e, t, { parentDefaults: r, rawFormData: n, rootSchema: o = {}, includeUndefinedValues: i = !1, _recurseList: a = [], experimental_defaultFormStateBehavior: l = void 0, required: c } = {}) {
  var u, d;
  const p = Et(n) ? n : {}, f = Et(t) ? t : {};
  let m = r, h = null, g = a;
  if (Et(m) && Et(f.default))
    m = oi(m, f.default);
  else if (Uw in f)
    m = f.default;
  else if (At in f) {
    const y = f[At];
    a.includes(y) || (g = a.concat(y), h = nd(y, o));
  } else if (pl in f)
    h = lb(e, f, o, !1, [], p)[0];
  else if (ru(f))
    m = f.items.map((y, v) => dn(e, y, {
      rootSchema: o,
      includeUndefinedValues: i,
      _recurseList: a,
      experimental_defaultFormStateBehavior: l,
      parentDefaults: Array.isArray(r) ? r[v] : void 0,
      rawFormData: p,
      required: c
    }));
  else if (yn in f) {
    const { oneOf: y, ...v } = f;
    if (y.length === 0)
      return;
    const $ = ko(f);
    h = y[Qi(e, o, Kn(p) ? void 0 : p, y, 0, $)], h = Qr(v, h);
  } else if (No in f) {
    const { anyOf: y, ...v } = f;
    if (y.length === 0)
      return;
    const $ = ko(f);
    h = y[Qi(e, o, Kn(p) ? void 0 : p, y, 0, $)], h = Qr(v, h);
  }
  if (h)
    return dn(e, h, {
      rootSchema: o,
      includeUndefinedValues: i,
      _recurseList: g,
      experimental_defaultFormStateBehavior: l,
      parentDefaults: m,
      rawFormData: p,
      required: c
    });
  switch (m === void 0 && (m = f.default), bn(f)) {
    case "object": {
      const y = (l == null ? void 0 : l.allOf) === "populateDefaults" && cs in f ? ar(e, f, o, p) : f, v = Object.keys(y.properties || {}).reduce(($, E) => {
        var S;
        const b = dn(e, Te(y, [Tt, E]), {
          rootSchema: o,
          _recurseList: a,
          experimental_defaultFormStateBehavior: l,
          includeUndefinedValues: i === !0,
          parentDefaults: Te(m, [E]),
          rawFormData: Te(p, [E]),
          required: (S = y.required) === null || S === void 0 ? void 0 : S.includes(E)
        });
        return vh($, E, b, i, c, y.required, l), $;
      }, {});
      if (y.additionalProperties) {
        const $ = Et(y.additionalProperties) ? y.additionalProperties : {}, E = /* @__PURE__ */ new Set();
        Et(m) && Object.keys(m).filter((b) => !y.properties || !y.properties[b]).forEach((b) => E.add(b));
        const S = [];
        Object.keys(p).filter((b) => !y.properties || !y.properties[b]).forEach((b) => {
          E.add(b), S.push(b);
        }), E.forEach((b) => {
          var x;
          const w = dn(e, $, {
            rootSchema: o,
            _recurseList: a,
            experimental_defaultFormStateBehavior: l,
            includeUndefinedValues: i === !0,
            parentDefaults: Te(m, [b]),
            rawFormData: Te(p, [b]),
            required: (x = y.required) === null || x === void 0 ? void 0 : x.includes(b)
          });
          vh(v, b, w, i, c, S);
        });
      }
      return v;
    }
    case "array": {
      const y = ((u = l == null ? void 0 : l.arrayMinItems) === null || u === void 0 ? void 0 : u.populate) === "never", v = ((d = l == null ? void 0 : l.arrayMinItems) === null || d === void 0 ? void 0 : d.populate) === "requiredOnly";
      if (Array.isArray(m) && (m = m.map((w, A) => {
        const M = yc(f, Mo.Fallback, A);
        return dn(e, M, {
          rootSchema: o,
          _recurseList: a,
          experimental_defaultFormStateBehavior: l,
          parentDefaults: w,
          required: c
        });
      })), Array.isArray(n)) {
        const w = yc(f);
        y ? m = n : m = n.map((A, M) => dn(e, w, {
          rootSchema: o,
          _recurseList: a,
          experimental_defaultFormStateBehavior: l,
          rawFormData: A,
          parentDefaults: Te(m, [M]),
          required: c
        }));
      }
      if (y)
        return m ?? [];
      if (v && !c)
        return m || void 0;
      const $ = Array.isArray(m) ? m.length : 0;
      if (!f.minItems || _d(e, f, o) || f.minItems <= $)
        return m || [];
      const E = m || [], S = yc(f, Mo.Invert), b = S.default, x = new Array(f.minItems - $).fill(dn(e, S, {
        parentDefaults: b,
        rootSchema: o,
        _recurseList: a,
        experimental_defaultFormStateBehavior: l,
        required: c
      }));
      return E.concat(x);
    }
  }
  return m;
}
function db(e, t, r, n, o = !1, i) {
  if (!Et(t))
    throw new Error("Invalid schema: " + t);
  const a = ar(e, t, n, r), l = dn(e, a, {
    rootSchema: n,
    includeUndefinedValues: o,
    experimental_defaultFormStateBehavior: i,
    rawFormData: r
  });
  if (r == null || typeof r == "number" && isNaN(r))
    return l;
  const { mergeExtraDefaults: c } = (i == null ? void 0 : i.arrayMinItems) || {};
  return Et(r) || Array.isArray(r) ? Ia(l, r, c) : r;
}
function fb(e = {}) {
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/#hidden-widgets
    "widget" in rt(e) && rt(e).widget !== "hidden"
  );
}
function pb(e, t, r = {}, n) {
  if (r[Lu] === "files")
    return !0;
  if (t.items) {
    const o = ar(e, t.items, n);
    return o.type === "string" && o.format === "data-url";
  }
  return !1;
}
function jU(e, t, r = {}, n, o) {
  const i = rt(r, o), { label: a = !0 } = i;
  let l = !!a;
  const c = bn(t);
  return c === "array" && (l = _d(e, t, n) || pb(e, t, r, n) || fb(r)), c === "object" && (l = !1), c === "boolean" && !r[Lu] && (l = !1), r[Gw] && (l = !1), l;
}
function kU(e, t, r) {
  if (!r)
    return t;
  const { errors: n, errorSchema: o } = t;
  let i = e.toErrorList(r), a = r;
  return Kn(o) || (a = oi(o, r, !0), i = [...n].concat(i)), { errorSchema: a, errors: i };
}
const mo = Symbol("no Value");
function nu(e, t, r, n, o = {}) {
  let i;
  if (Jt(r, Tt)) {
    const a = {};
    if (Jt(n, Tt)) {
      const u = Te(n, Tt, {});
      Object.keys(u).forEach((d) => {
        Jt(o, d) && (a[d] = void 0);
      });
    }
    const l = Object.keys(Te(r, Tt, {})), c = {};
    l.forEach((u) => {
      const d = Te(o, u);
      let p = Te(n, [Tt, u], {}), f = Te(r, [Tt, u], {});
      Jt(p, At) && (p = ar(e, p, t, d)), Jt(f, At) && (f = ar(e, f, t, d));
      const m = Te(p, "type"), h = Te(f, "type");
      if (!m || m === h)
        if (Jt(a, u) && delete a[u], h === "object" || h === "array" && Array.isArray(d)) {
          const g = nu(e, t, f, p, d);
          (g !== void 0 || h === "array") && (c[u] = g);
        } else {
          const g = Te(f, "default", mo), y = Te(p, "default", mo);
          g !== mo && g !== d && (y === d ? a[u] = g : Te(f, "readOnly") === !0 && (a[u] = void 0));
          const v = Te(f, "const", mo), $ = Te(p, "const", mo);
          v !== mo && v !== d && (a[u] = $ === d ? v : void 0);
        }
    }), i = {
      ...typeof o == "string" || Array.isArray(o) ? void 0 : o,
      ...a,
      ...c
    };
  } else if (Te(n, "type") === "array" && Te(r, "type") === "array" && Array.isArray(o)) {
    let a = Te(n, "items"), l = Te(r, "items");
    if (typeof a == "object" && typeof l == "object" && !Array.isArray(a) && !Array.isArray(l)) {
      Jt(a, At) && (a = ar(e, a, t, o)), Jt(l, At) && (l = ar(e, l, t, o));
      const c = Te(a, "type"), u = Te(l, "type");
      if (!c || c === u) {
        const d = Te(r, "maxItems", -1);
        u === "object" ? i = o.reduce((p, f) => {
          const m = nu(e, t, l, a, f);
          return m !== void 0 && (d < 0 || p.length < d) && p.push(m), p;
        }, []) : i = d > 0 && o.length > d ? o.slice(0, d) : o;
      }
    } else
      typeof a == "boolean" && typeof l == "boolean" && a === l && (i = o);
  }
  return i;
}
function na(e, t, r, n, o, i, a, l = []) {
  if (At in t || pl in t || cs in t) {
    const d = ar(e, t, i, a);
    if (l.findIndex((f) => Hn(f, d)) === -1)
      return na(e, d, r, n, o, i, a, l.concat(d));
  }
  if (hn in t && !Te(t, [hn, At]))
    return na(e, Te(t, hn), r, n, o, i, a, l);
  const u = { $id: o || r };
  if (bn(t) === "object" && Tt in t)
    for (const d in t.properties) {
      const p = Te(t, [Tt, d]), f = u[pn] + n + d;
      u[d] = na(
        e,
        Et(p) ? p : {},
        r,
        n,
        f,
        i,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        Te(a, [d]),
        l
      );
    }
  return u;
}
function MU(e, t, r, n, o, i = "root", a = "_") {
  return na(e, t, i, a, r, n, o);
}
function Mn(e, t, r, n, o, i = []) {
  if (At in t || pl in t || cs in t) {
    const l = ar(e, t, n, o);
    if (i.findIndex((u) => Hn(u, l)) === -1)
      return Mn(e, l, r, n, o, i.concat(l));
  }
  let a = {
    [ea]: r.replace(/^\./, "")
  };
  if (yn in t || No in t) {
    const l = yn in t ? t.oneOf : t.anyOf, c = ko(t), u = Qi(e, n, o, l, 0, c), d = l[u];
    a = {
      ...a,
      ...Mn(e, d, r, n, o, i)
    };
  }
  if (qc in t && t[qc] !== !1 && Kt(a, Fu, !0), hn in t && Array.isArray(o)) {
    const { items: l, additionalItems: c } = t;
    Array.isArray(l) ? o.forEach((u, d) => {
      l[d] ? a[d] = Mn(e, l[d], `${r}.${d}`, n, u, i) : c ? a[d] = Mn(e, c, `${r}.${d}`, n, u, i) : console.warn(`Unable to generate path schema for "${r}.${d}". No schema defined for it`);
    }) : o.forEach((u, d) => {
      a[d] = Mn(e, l, `${r}.${d}`, n, u, i);
    });
  } else if (Tt in t)
    for (const l in t.properties) {
      const c = Te(t, [Tt, l]);
      a[l] = Mn(
        e,
        c,
        `${r}.${l}`,
        n,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        Te(o, [l]),
        i
      );
    }
  return a;
}
function DU(e, t, r = "", n, o) {
  return Mn(e, t, r, n, o);
}
class FU {
  /** Constructs the `SchemaUtils` instance with the given `validator` and `rootSchema` stored as instance variables
   *
   * @param validator - An implementation of the `ValidatorType` interface that will be forwarded to all the APIs
   * @param rootSchema - The root schema that will be forwarded to all the APIs
   * @param experimental_defaultFormStateBehavior - Configuration flags to allow users to override default form state behavior
   */
  constructor(t, r, n) {
    this.rootSchema = r, this.validator = t, this.experimental_defaultFormStateBehavior = n;
  }
  /** Returns the `ValidatorType` in the `SchemaUtilsType`
   *
   * @returns - The `ValidatorType`
   */
  getValidator() {
    return this.validator;
  }
  /** Determines whether either the `validator` and `rootSchema` differ from the ones associated with this instance of
   * the `SchemaUtilsType`. If either `validator` or `rootSchema` are falsy, then return false to prevent the creation
   * of a new `SchemaUtilsType` with incomplete properties.
   *
   * @param validator - An implementation of the `ValidatorType` interface that will be compared against the current one
   * @param rootSchema - The root schema that will be compared against the current one
   * @param [experimental_defaultFormStateBehavior] Optional configuration object, if provided, allows users to override default form state behavior
   * @returns - True if the `SchemaUtilsType` differs from the given `validator` or `rootSchema`
   */
  doesSchemaUtilsDiffer(t, r, n = {}) {
    return !t || !r ? !1 : this.validator !== t || !mr(this.rootSchema, r) || !mr(this.experimental_defaultFormStateBehavior, n);
  }
  /** Returns the superset of `formData` that includes the given set updated to include any missing fields that have
   * computed to have defaults provided in the `schema`.
   *
   * @param schema - The schema for which the default state is desired
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @param [includeUndefinedValues=false] - Optional flag, if true, cause undefined values to be added as defaults.
   *          If "excludeObjectChildren", pass `includeUndefinedValues` as false when computing defaults for any nested
   *          object properties.
   * @returns - The resulting `formData` with all the defaults provided
   */
  getDefaultFormState(t, r, n = !1) {
    return db(this.validator, t, r, this.rootSchema, n, this.experimental_defaultFormStateBehavior);
  }
  /** Determines whether the combination of `schema` and `uiSchema` properties indicates that the label for the `schema`
   * should be displayed in a UI.
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [uiSchema] - The UI schema from which to derive potentially displayable information
   * @param [globalOptions={}] - The optional Global UI Schema from which to get any fallback `xxx` options
   * @returns - True if the label should be displayed or false if it should not
   */
  getDisplayLabel(t, r, n) {
    return jU(this.validator, t, r, this.rootSchema, n);
  }
  /** Determines which of the given `options` provided most closely matches the `formData`.
   * Returns the index of the option that is valid and is the closest match, or 0 if there is no match.
   *
   * The closest match is determined using the number of matching properties, and more heavily favors options with
   * matching readOnly, default, or const values.
   *
   * @param formData - The form data associated with the schema
   * @param options - The list of options that can be selected from
   * @param [selectedOption] - The index of the currently selected option, defaulted to -1 if not specified
   * @param [discriminatorField] - The optional name of the field within the options object whose value is used to
   *          determine which option is selected
   * @returns - The index of the option that is the closest match to the `formData` or the `selectedOption` if no match
   */
  getClosestMatchingOption(t, r, n, o) {
    return Qi(this.validator, this.rootSchema, t, r, n, o);
  }
  /** Given the `formData` and list of `options`, attempts to find the index of the first option that matches the data.
   * Always returns the first option if there is nothing that matches.
   *
   * @param formData - The current formData, if any, used to figure out a match
   * @param options - The list of options to find a matching options from
   * @param [discriminatorField] - The optional name of the field within the options object whose value is used to
   *          determine which option is selected
   * @returns - The firstindex of the matched option or 0 if none is available
   */
  getFirstMatchingOption(t, r, n) {
    return ad(this.validator, t, r, this.rootSchema, n);
  }
  /** Given the `formData` and list of `options`, attempts to find the index of the option that best matches the data.
   * Deprecated, use `getFirstMatchingOption()` instead.
   *
   * @param formData - The current formData, if any, onto which to provide any missing defaults
   * @param options - The list of options to find a matching options from
   * @param [discriminatorField] - The optional name of the field within the options object whose value is used to
   *          determine which option is selected
   * @returns - The index of the matched option or 0 if none is available
   * @deprecated
   */
  getMatchingOption(t, r, n) {
    return wv(this.validator, t, r, this.rootSchema, n);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */
  isFilesArray(t, r) {
    return pb(this.validator, t, r, this.rootSchema);
  }
  /** Checks to see if the `schema` combination represents a multi-select
   *
   * @param schema - The schema for which check for a multi-select flag is desired
   * @returns - True if schema contains a multi-select, otherwise false
   */
  isMultiSelect(t) {
    return _d(this.validator, t, this.rootSchema);
  }
  /** Checks to see if the `schema` combination represents a select
   *
   * @param schema - The schema for which check for a select flag is desired
   * @returns - True if schema contains a select, otherwise false
   */
  isSelect(t) {
    return ub(this.validator, t, this.rootSchema);
  }
  /** Merges the errors in `additionalErrorSchema` into the existing `validationData` by combining the hierarchies in
   * the two `ErrorSchema`s and then appending the error list from the `additionalErrorSchema` obtained by calling
   * `getValidator().toErrorList()` onto the `errors` in the `validationData`. If no `additionalErrorSchema` is passed,
   * then `validationData` is returned.
   *
   * @param validationData - The current `ValidationData` into which to merge the additional errors
   * @param [additionalErrorSchema] - The additional set of errors
   * @returns - The `validationData` with the additional errors from `additionalErrorSchema` merged into it, if provided.
   * @deprecated - Use the `validationDataMerge()` function exported from `@rjsf/utils` instead. This function will be
   *        removed in the next major release.
   */
  mergeValidationData(t, r) {
    return kU(this.validator, t, r);
  }
  /** Retrieves an expanded schema that has had all of its conditions, additional properties, references and
   * dependencies resolved and merged into the `schema` given a `rawFormData` that is used to do the potentially
   * recursive resolution.
   *
   * @param schema - The schema for which retrieving a schema is desired
   * @param [rawFormData] - The current formData, if any, to assist retrieving a schema
   * @returns - The schema having its conditions, additional properties, references and dependencies resolved
   */
  retrieveSchema(t, r) {
    return ar(this.validator, t, this.rootSchema, r);
  }
  /** Sanitize the `data` associated with the `oldSchema` so it is considered appropriate for the `newSchema`. If the
   * new schema does not contain any properties, then `undefined` is returned to clear all the form data. Due to the
   * nature of schemas, this sanitization happens recursively for nested objects of data. Also, any properties in the
   * old schemas that are non-existent in the new schema are set to `undefined`.
   *
   * @param [newSchema] - The new schema for which the data is being sanitized
   * @param [oldSchema] - The old schema from which the data originated
   * @param [data={}] - The form data associated with the schema, defaulting to an empty object when undefined
   * @returns - The new form data, with all the fields uniquely associated with the old schema set
   *      to `undefined`. Will return `undefined` if the new schema is not an object containing properties.
   */
  sanitizeDataForNewSchema(t, r, n) {
    return nu(this.validator, this.rootSchema, t, r, n);
  }
  /** Generates an `IdSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [id] - The base id for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @param [idPrefix='root'] - The prefix to use for the id
   * @param [idSeparator='_'] - The separator to use for the path segments in the id
   * @returns - The `IdSchema` object for the `schema`
   */
  toIdSchema(t, r, n, o = "root", i = "_") {
    return MU(this.validator, t, r, this.rootSchema, n, o, i);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */
  toPathSchema(t, r, n) {
    return DU(this.validator, t, r, this.rootSchema, n);
  }
}
function LU(e, t, r = {}) {
  return new FU(e, t, r);
}
function BU(e) {
  const t = e.split(","), r = t[0].split(";"), n = r[0].replace("data:", ""), o = r.filter((a) => a.split("=")[0] === "name");
  let i;
  o.length !== 1 ? i = "unknown" : i = decodeURI(o[0].split("=")[1]);
  try {
    const a = atob(t[1]), l = [];
    for (let u = 0; u < a.length; u++)
      l.push(a.charCodeAt(u));
    return { blob: new window.Blob([new Uint8Array(l)], { type: n }), name: i };
  } catch (a) {
    return { blob: { size: 0, type: a.message }, name: e };
  }
}
function VU(e, t) {
  let r = e;
  if (Array.isArray(t)) {
    const n = r.split(/(%\d)/);
    t.forEach((o, i) => {
      const a = n.findIndex((l) => l === `%${i + 1}`);
      a >= 0 && (n[a] = o);
    }), r = n.join("");
  }
  return r;
}
function zU(e, t) {
  return VU(e, t);
}
function Ft(e, t = [], r) {
  if (Array.isArray(e))
    return e.map((i) => Ft(i, t)).filter((i) => i);
  const n = e === "" || e === null ? -1 : Number(e), o = t[n];
  return o ? o.value : r;
}
function mb(e, t, r = []) {
  const n = Ft(e, r);
  return Array.isArray(t) ? t.filter((o) => !Hn(o, n)) : Hn(n, t) ? void 0 : t;
}
function Nl(e, t) {
  return Array.isArray(t) ? t.some((r) => Hn(r, e)) : Hn(t, e);
}
function xd(e, t = [], r = !1) {
  const n = t.map((o, i) => Nl(o.value, e) ? String(i) : void 0).filter((o) => typeof o < "u");
  return r ? n : n[0];
}
function UU(e) {
  return e == null;
}
var WU = UU;
const qU = /* @__PURE__ */ pt(WU);
function hb(e, t, r = []) {
  const n = Ft(e, r);
  if (!qU(n)) {
    const o = r.findIndex((l) => n === l.value), i = r.map(({ value: l }) => l);
    return t.slice(0, o).concat(n, t.slice(o)).sort((l, c) => +(i.indexOf(l) > i.indexOf(c)));
  }
  return t;
}
class KU {
  /** Construct an `ErrorSchemaBuilder` with an optional initial set of errors in an `ErrorSchema`.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   */
  constructor(t) {
    this.errorSchema = {}, this.resetAllErrors(t);
  }
  /** Returns the `ErrorSchema` that has been updated by the methods of the `ErrorSchemaBuilder`
   */
  get ErrorSchema() {
    return this.errorSchema;
  }
  /** Will get an existing `ErrorSchema` at the specified `pathOfError` or create and return one.
   *
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to add the error(s)
   * @returns - The error block for the given `pathOfError` or the root if not provided
   * @private
   */
  getOrCreateErrorBlock(t) {
    let n = Array.isArray(t) && t.length > 0 || typeof t == "string" ? Te(this.errorSchema, t) : this.errorSchema;
    return !n && t && (n = {}, Kt(this.errorSchema, t, n)), n;
  }
  /** Resets all errors in the `ErrorSchemaBuilder` back to the `initialSchema` if provided, otherwise an empty set.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  resetAllErrors(t) {
    return this.errorSchema = t ? Av(t) : {}, this;
  }
  /** Adds the `errorOrList` to the list of errors in the `ErrorSchema` at either the root level or the location within
   * the schema described by the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param errorOrList - The error or list of errors to add into the `ErrorSchema`
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to add the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  addErrors(t, r) {
    const n = this.getOrCreateErrorBlock(r);
    let o = Te(n, xr);
    return Array.isArray(o) || (o = [], n[xr] = o), Array.isArray(t) ? o.push(...t) : o.push(t), this;
  }
  /** Sets/replaces the `errorOrList` as the error(s) in the `ErrorSchema` at either the root level or the location
   * within the schema described by the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param errorOrList - The error or list of errors to set into the `ErrorSchema`
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to set the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  setErrors(t, r) {
    const n = this.getOrCreateErrorBlock(r), o = Array.isArray(t) ? [...t] : [t];
    return Kt(n, xr, o), this;
  }
  /** Clears the error(s) in the `ErrorSchema` at either the root level or the location within the schema described by
   * the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to clear the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  clearErrors(t) {
    const r = this.getOrCreateErrorBlock(t);
    return Kt(r, xr, []), this;
  }
}
function yb(e) {
  const t = {};
  return e.multipleOf && (t.step = e.multipleOf), (e.minimum || e.minimum === 0) && (t.min = e.minimum), (e.maximum || e.maximum === 0) && (t.max = e.maximum), t;
}
function gb(e, t, r = {}, n = !0) {
  const o = {
    type: t || "text",
    ...yb(e)
  };
  return r.inputType ? o.type = r.inputType : t || (e.type === "number" ? (o.type = "number", n && o.step === void 0 && (o.step = "any")) : e.type === "integer" && (o.type = "number", o.step === void 0 && (o.step = 1))), r.autocomplete && (o.autoComplete = r.autocomplete), o;
}
const bh = {
  props: {
    disabled: !1
  },
  submitText: "Submit",
  norender: !1
};
function vb(e = {}) {
  const t = rt(e);
  if (t && t[Ea]) {
    const r = t[Ea];
    return { ...bh, ...r };
  }
  return bh;
}
function Ke(e, t, r = {}) {
  const { templates: n } = t;
  return e === "ButtonTemplates" ? n[e] : (
    // Evaluating uiOptions[name] results in TS2590: Expression produces a union type that is too complex to represent
    // To avoid that, we cast uiOptions to `any` before accessing the name field
    r[e] || n[e]
  );
}
const gc = {
  boolean: {
    checkbox: "CheckboxWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    hidden: "HiddenWidget"
  },
  string: {
    text: "TextWidget",
    password: "PasswordWidget",
    email: "EmailWidget",
    hostname: "TextWidget",
    ipv4: "TextWidget",
    ipv6: "TextWidget",
    uri: "URLWidget",
    "data-url": "FileWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    textarea: "TextareaWidget",
    hidden: "HiddenWidget",
    date: "DateWidget",
    datetime: "DateTimeWidget",
    "date-time": "DateTimeWidget",
    "alt-date": "AltDateWidget",
    "alt-datetime": "AltDateTimeWidget",
    time: "TimeWidget",
    color: "ColorWidget",
    file: "FileWidget"
  },
  number: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  integer: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  array: {
    select: "SelectWidget",
    checkboxes: "CheckboxesWidget",
    files: "FileWidget",
    hidden: "HiddenWidget"
  }
};
function HU(e) {
  let t = Te(e, "MergedWidget");
  if (!t) {
    const r = e.defaultProps && e.defaultProps.options || {};
    t = ({ options: n, ...o }) => _.jsx(e, { options: { ...r, ...n }, ...o }), Kt(e, "MergedWidget", t);
  }
  return t;
}
function Gr(e, t, r = {}) {
  const n = bn(e);
  if (typeof t == "function" || t && tp.isForwardRef(vy(t)) || tp.isMemo(t))
    return HU(t);
  if (typeof t != "string")
    throw new Error(`Unsupported widget definition: ${typeof t}`);
  if (t in r) {
    const o = r[t];
    return Gr(e, o, r);
  }
  if (typeof n == "string") {
    if (!(n in gc))
      throw new Error(`No widget for type '${n}'`);
    if (t in gc[n]) {
      const o = r[gc[n][t]];
      return Gr(e, o, r);
    }
  }
  throw new Error(`No widget '${t}' for type '${n}'`);
}
function GU(e) {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t.toString(16);
}
function YU(e) {
  const t = /* @__PURE__ */ new Set();
  return JSON.stringify(e, (r, n) => (t.add(r), n)), GU(JSON.stringify(e, Array.from(t).sort()));
}
function XU(e, t, r = {}) {
  try {
    return Gr(e, t, r), !0;
  } catch (n) {
    const o = n;
    if (o.message && (o.message.startsWith("No widget") || o.message.startsWith("Unsupported widget")))
      return !1;
    throw n;
  }
}
function vs(e, t) {
  return `${od(e) ? e : e[pn]}__${t}`;
}
function to(e) {
  return vs(e, "description");
}
function wd(e) {
  return vs(e, "error");
}
function es(e) {
  return vs(e, "examples");
}
function Td(e) {
  return vs(e, "help");
}
function Od(e) {
  return vs(e, "title");
}
function or(e, t = !1) {
  const r = t ? ` ${es(e)}` : "";
  return `${wd(e)} ${to(e)} ${Td(e)}${r}`;
}
function Al(e, t) {
  return `${e}-${t}`;
}
function _n(e, t, r) {
  return t ? r : e;
}
function JU(e) {
  return e ? new Date(e).toJSON() : void 0;
}
function ZU(e) {
  if (Ww in e && Array.isArray(e.enum) && e.enum.length === 1)
    return e.enum[0];
  if (_g in e)
    return e.const;
  throw new Error("schema cannot be inferred as a constant");
}
function Na(e) {
  const t = e;
  if (t.enumNames && process.env.NODE_ENV !== "production" && console.warn("The enumNames property is deprecated and may be removed in a future major release."), e.enum)
    return e.enum.map((n, o) => ({ label: t.enumNames && t.enumNames[o] || String(n), value: n }));
  const r = e.oneOf || e.anyOf;
  return r && r.map((n) => {
    const o = n, i = ZU(o), a = o.title || String(i);
    return {
      schema: o,
      label: a,
      value: i
    };
  });
}
function QU(e, t) {
  if (!Array.isArray(t))
    return e;
  const r = (d) => d.reduce((p, f) => (p[f] = !0, p), {}), n = (d) => d.length > 1 ? `properties '${d.join("', '")}'` : `property '${d[0]}'`, o = r(e), i = t.filter((d) => d === "*" || o[d]), a = r(i), l = e.filter((d) => !a[d]), c = i.indexOf("*");
  if (c === -1) {
    if (l.length)
      throw new Error(`uiSchema order list does not contain ${n(l)}`);
    return i;
  }
  if (c !== i.lastIndexOf("*"))
    throw new Error("uiSchema order list contains more than one wildcard item");
  const u = [...i];
  return u.splice(c, 1, ...l), u;
}
function fn(e, t) {
  let r = String(e);
  for (; r.length < t; )
    r = "0" + r;
  return r;
}
function vc(e, t = !0) {
  if (!e)
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: t ? -1 : 0,
      minute: t ? -1 : 0,
      second: t ? -1 : 0
    };
  const r = new Date(e);
  if (Number.isNaN(r.getTime()))
    throw new Error("Unable to parse date " + e);
  return {
    year: r.getUTCFullYear(),
    month: r.getUTCMonth() + 1,
    day: r.getUTCDate(),
    hour: t ? r.getUTCHours() : 0,
    minute: t ? r.getUTCMinutes() : 0,
    second: t ? r.getUTCSeconds() : 0
  };
}
function To(e) {
  if (e.const || e.enum && e.enum.length === 1 && e.enum[0] === !0)
    return !0;
  if (e.anyOf && e.anyOf.length === 1)
    return To(e.anyOf[0]);
  if (e.oneOf && e.oneOf.length === 1)
    return To(e.oneOf[0]);
  if (e.allOf) {
    const t = (r) => To(r);
    return e.allOf.some(t);
  }
  return !1;
}
function e4(e, t, r) {
  const { props: n, state: o } = e;
  return !mr(n, t) || !mr(o, r);
}
function $h(e, t = !0) {
  const { year: r, month: n, day: o, hour: i = 0, minute: a = 0, second: l = 0 } = e, c = Date.UTC(r, n - 1, o, i, a, l), u = new Date(c).toJSON();
  return t ? u : u.slice(0, 10);
}
function ts(e, t = []) {
  if (!e)
    return [];
  let r = [];
  return xr in e && (r = r.concat(e[xr].map((n) => {
    const o = `.${t.join(".")}`;
    return {
      property: o,
      message: n,
      stack: `${o} ${n}`
    };
  }))), Object.keys(e).reduce((n, o) => {
    if (o !== xr) {
      const i = e[o];
      Bu(i) && (n = n.concat(ts(i, [...t, o])));
    }
    return n;
  }, r);
}
var t4 = nn, r4 = Ol, n4 = Lt, o4 = Qo, i4 = Wg, s4 = eo, a4 = Kg;
function l4(e) {
  return n4(e) ? t4(e, s4) : o4(e) ? [e] : r4(i4(a4(e)));
}
var c4 = l4;
const bb = /* @__PURE__ */ pt(c4);
function u4(e) {
  const t = new KU();
  return e.length && e.forEach((r) => {
    const { property: n, message: o } = r, i = n === "." ? [] : bb(n);
    i.length > 0 && i[0] === "" && i.splice(0, 1), o && t.addErrors(o, i);
  }), t.ErrorSchema;
}
function $b(e) {
  return Object.keys(e).reduce((t, r) => {
    if (r === "addError")
      return t;
    {
      const n = e[r];
      return Bu(n) ? {
        ...t,
        [r]: $b(n)
      } : { ...t, [r]: n };
    }
  }, {});
}
function d4(e) {
  if (!e)
    return "";
  const t = new Date(e), r = fn(t.getFullYear(), 4), n = fn(t.getMonth() + 1, 2), o = fn(t.getDate(), 2), i = fn(t.getHours(), 2), a = fn(t.getMinutes(), 2), l = fn(t.getSeconds(), 2), c = fn(t.getMilliseconds(), 3);
  return `${r}-${n}-${o}T${i}:${a}:${l}.${c}`;
}
function oa(e, t) {
  if (!t)
    return e;
  const { errors: r, errorSchema: n } = e;
  let o = ts(t), i = t;
  return Kn(n) || (i = oi(n, t, !0), o = [...r].concat(o)), { errorSchema: i, errors: o };
}
function f4(e) {
  for (const t in e) {
    const r = e, n = r[t];
    t === At && typeof n == "string" && n.startsWith("#") ? r[t] = xg + n : r[t] = Cd(n);
  }
  return e;
}
function p4(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = Cd(e[t]);
  return e;
}
function Cd(e) {
  return Array.isArray(e) ? p4([...e]) : wr(e) ? f4({ ...e }) : e;
}
var Ze;
(function(e) {
  e.ArrayItemTitle = "Item", e.MissingItems = "Missing items definition", e.YesLabel = "Yes", e.NoLabel = "No", e.CloseLabel = "Close", e.ErrorsLabel = "Errors", e.NewStringDefault = "New Value", e.AddButton = "Add", e.AddItemButton = "Add Item", e.CopyButton = "Copy", e.MoveDownButton = "Move down", e.MoveUpButton = "Move up", e.RemoveButton = "Remove", e.NowLabel = "Now", e.ClearLabel = "Clear", e.AriaDateLabel = "Select a date", e.PreviewLabel = "Preview", e.DecrementAriaLabel = "Decrease value by 1", e.IncrementAriaLabel = "Increase value by 1", e.UnknownFieldType = "Unknown field type %1", e.OptionPrefix = "Option %1", e.TitleOptionPrefix = "%1 option %2", e.KeyLabel = "%1 Key", e.InvalidObjectField = 'Invalid "%1" object field configuration: <em>%2</em>.', e.UnsupportedField = "Unsupported field schema.", e.UnsupportedFieldWithId = "Unsupported field schema for field <code>%1</code>.", e.UnsupportedFieldWithReason = "Unsupported field schema: <em>%1</em>.", e.UnsupportedFieldWithIdAndReason = "Unsupported field schema for field <code>%1</code>: <em>%2</em>.", e.FilesInfo = "<strong>%1</strong> (%2, %3 bytes)";
})(Ze || (Ze = {}));
var m4 = ms, h4 = Tv, y4 = ei;
function g4(e, t, r) {
  for (var n = -1, o = t.length, i = {}; ++n < o; ) {
    var a = t[n], l = m4(e, a);
    r(l, a) && h4(i, y4(a, e), l);
  }
  return i;
}
var v4 = g4, b4 = v4, $4 = Sv;
function S4(e, t) {
  return b4(e, t, function(r, n) {
    return $4(e, n);
  });
}
var E4 = S4, _4 = E4, x4 = mv, w4 = x4(function(e, t) {
  return e == null ? {} : _4(e, t);
}), T4 = w4;
const O4 = /* @__PURE__ */ pt(T4);
let C4 = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), "");
function ou() {
  return C4();
}
function Sh(e) {
  return Array.isArray(e) ? e.map((t) => ({
    key: ou(),
    item: t
  })) : [];
}
function $i(e) {
  return Array.isArray(e) ? e.map((t) => t.item) : [];
}
class P4 extends os {
  /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(t) {
    super(t), this._getNewFormDataRow = () => {
      const { schema: o, registry: i } = this.props, { schemaUtils: a } = i;
      let l = o.items;
      return ru(o) && zw(o) && (l = o.additionalItems), a.getDefaultFormState(l);
    }, this.onAddClick = (o) => {
      this._handleAddClick(o);
    }, this.onAddIndexClick = (o) => (i) => {
      this._handleAddClick(i, o);
    }, this.onCopyIndexClick = (o) => (i) => {
      i && i.preventDefault();
      const { onChange: a, errorSchema: l } = this.props, { keyedFormData: c } = this.state;
      let u;
      if (l) {
        u = {};
        for (const f in l) {
          const m = parseInt(f);
          m <= o ? Kt(u, [m], l[f]) : m > o && Kt(u, [m + 1], l[f]);
        }
      }
      const d = {
        key: ou(),
        item: Av(c[o].item)
      }, p = [...c];
      o !== void 0 ? p.splice(o + 1, 0, d) : p.push(d), this.setState({
        keyedFormData: p,
        updatedKeyedFormData: !0
      }, () => a($i(p), u));
    }, this.onDropIndexClick = (o) => (i) => {
      i && i.preventDefault();
      const { onChange: a, errorSchema: l } = this.props, { keyedFormData: c } = this.state;
      let u;
      if (l) {
        u = {};
        for (const p in l) {
          const f = parseInt(p);
          f < o ? Kt(u, [f], l[p]) : f > o && Kt(u, [f - 1], l[p]);
        }
      }
      const d = c.filter((p, f) => f !== o);
      this.setState({
        keyedFormData: d,
        updatedKeyedFormData: !0
      }, () => a($i(d), u));
    }, this.onReorderClick = (o, i) => (a) => {
      a && (a.preventDefault(), a.currentTarget.blur());
      const { onChange: l, errorSchema: c } = this.props;
      let u;
      if (c) {
        u = {};
        for (const m in c) {
          const h = parseInt(m);
          h == o ? Kt(u, [i], c[o]) : h == i ? Kt(u, [o], c[i]) : Kt(u, [m], c[h]);
        }
      }
      const { keyedFormData: d } = this.state;
      function p() {
        const m = d.slice();
        return m.splice(o, 1), m.splice(i, 0, d[o]), m;
      }
      const f = p();
      this.setState({
        keyedFormData: f
      }, () => l($i(f), u));
    }, this.onChangeForIndex = (o) => (i, a, l) => {
      const { formData: c, onChange: u, errorSchema: d } = this.props, f = (Array.isArray(c) ? c : []).map((m, h) => o === h ? typeof i > "u" ? null : i : m);
      u(f, d && d && {
        ...d,
        [o]: a
      }, l);
    }, this.onSelectChange = (o) => {
      const { onChange: i, idSchema: a } = this.props;
      i(o, void 0, a && a.$id);
    };
    const { formData: r = [] } = t, n = Sh(r);
    this.state = {
      keyedFormData: n,
      updatedKeyedFormData: !1
    };
  }
  /** React lifecycle method that is called when the props are about to change allowing the state to be updated. It
   * regenerates the keyed form data and returns it
   *
   * @param nextProps - The next set of props data
   * @param prevState - The previous set of state data
   */
  static getDerivedStateFromProps(t, r) {
    if (r.updatedKeyedFormData)
      return {
        updatedKeyedFormData: !1
      };
    const n = Array.isArray(t.formData) ? t.formData : [], o = r.keyedFormData || [];
    return {
      keyedFormData: n.length === o.length ? o.map((a, l) => ({
        key: a.key,
        item: n[l]
      })) : Sh(n)
    };
  }
  /** Returns the appropriate title for an item by getting first the title from the schema.items, then falling back to
   * the description from the schema.items, and finally the string "Item"
   */
  get itemTitle() {
    const { schema: t, registry: r } = this.props, { translateString: n } = r;
    return Te(t, [hn, "title"], Te(t, [hn, "description"], n(Ze.ArrayItemTitle)));
  }
  /** Determines whether the item described in the schema is always required, which is determined by whether any item
   * may be null.
   *
   * @param itemSchema - The schema for the item
   * @return - True if the item schema type does not contain the "null" type
   */
  isItemRequired(t) {
    return Array.isArray(t.type) ? !t.type.includes("null") : t.type !== "null";
  }
  /** Determines whether more items can be added to the array. If the uiSchema indicates the array doesn't allow adding
   * then false is returned. Otherwise, if the schema indicates that there are a maximum number of items and the
   * `formData` matches that value, then false is returned, otherwise true is returned.
   *
   * @param formItems - The list of items in the form
   * @returns - True if the item is addable otherwise false
   */
  canAddItem(t) {
    const { schema: r, uiSchema: n, registry: o } = this.props;
    let { addable: i } = rt(n, o.globalUiOptions);
    return i !== !1 && (r.maxItems !== void 0 ? i = t.length < r.maxItems : i = !0), i;
  }
  /** Callback handler for when the user clicks on the add or add at index buttons. Creates a new row of keyed form data
   * either at the end of the list (when index is not specified) or inserted at the `index` when it is, adding it into
   * the state, and then returning `onChange()` with the plain form data converted from the keyed data
   *
   * @param event - The event for the click
   * @param [index] - The optional index at which to add the new data
   */
  _handleAddClick(t, r) {
    t && t.preventDefault();
    const { onChange: n, errorSchema: o } = this.props, { keyedFormData: i } = this.state;
    let a;
    if (o) {
      a = {};
      for (const u in o) {
        const d = parseInt(u);
        r === void 0 || d < r ? Kt(a, [d], o[u]) : d >= r && Kt(a, [d + 1], o[u]);
      }
    }
    const l = {
      key: ou(),
      item: this._getNewFormDataRow()
    }, c = [...i];
    r !== void 0 ? c.splice(r, 0, l) : c.push(l), this.setState({
      keyedFormData: c,
      updatedKeyedFormData: !0
    }, () => n($i(c), a));
  }
  /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
   */
  render() {
    const { schema: t, uiSchema: r, idSchema: n, registry: o } = this.props, { schemaUtils: i, translateString: a } = o;
    if (!(hn in t)) {
      const l = rt(r), c = Ke("UnsupportedFieldTemplate", o, l);
      return _.jsx(c, { schema: t, idSchema: n, reason: a(Ze.MissingItems), registry: o });
    }
    return i.isMultiSelect(t) ? this.renderMultiSelect() : fb(r) ? this.renderCustomWidget() : ru(t) ? this.renderFixedArray() : i.isFilesArray(t, r) ? this.renderFiles() : this.renderNormalArray();
  }
  /** Renders a normal array without any limitations of length
   */
  renderNormalArray() {
    const { schema: t, uiSchema: r = {}, errorSchema: n, idSchema: o, name: i, disabled: a = !1, readonly: l = !1, autofocus: c = !1, required: u = !1, registry: d, onBlur: p, onFocus: f, idPrefix: m, idSeparator: h = "_", rawErrors: g } = this.props, { keyedFormData: y } = this.state, v = t.title === void 0 ? i : t.title, { schemaUtils: $, formContext: E } = d, S = rt(r), b = wr(t.items) ? t.items : {}, x = $.retrieveSchema(b), w = $i(this.state.keyedFormData), A = this.canAddItem(w), M = {
      canAdd: A,
      items: y.map((H, U) => {
        const { key: K, item: z } = H, G = z, X = $.retrieveSchema(b, G), J = n ? n[U] : void 0, Z = o.$id + h + U, ne = $.toIdSchema(X, Z, G, m, h);
        return this.renderArrayFieldItem({
          key: K,
          index: U,
          name: i && `${i}-${U}`,
          canAdd: A,
          canMoveUp: U > 0,
          canMoveDown: U < w.length - 1,
          itemSchema: X,
          itemIdSchema: ne,
          itemErrorSchema: J,
          itemData: G,
          itemUiSchema: r.items,
          autofocus: c && U === 0,
          onBlur: p,
          onFocus: f,
          rawErrors: g,
          totalItems: y.length
        });
      }),
      className: `field field-array field-array-of-${x.type}`,
      disabled: a,
      idSchema: o,
      uiSchema: r,
      onAddClick: this.onAddClick,
      readonly: l,
      required: u,
      schema: t,
      title: v,
      formContext: E,
      formData: w,
      rawErrors: g,
      registry: d
    }, k = Ke("ArrayFieldTemplate", d, S);
    return _.jsx(k, { ...M });
  }
  /** Renders an array using the custom widget provided by the user in the `uiSchema`
   */
  renderCustomWidget() {
    var t;
    const { schema: r, idSchema: n, uiSchema: o, disabled: i = !1, readonly: a = !1, autofocus: l = !1, required: c = !1, hideError: u, placeholder: d, onBlur: p, onFocus: f, formData: m = [], registry: h, rawErrors: g, name: y } = this.props, { widgets: v, formContext: $, globalUiOptions: E, schemaUtils: S } = h, { widget: b, title: x, ...w } = rt(o, E), A = Gr(r, b, v), M = (t = x ?? r.title) !== null && t !== void 0 ? t : y, k = S.getDisplayLabel(r, o, E);
    return _.jsx(A, { id: n.$id, name: y, multiple: !0, onChange: this.onSelectChange, onBlur: p, onFocus: f, options: w, schema: r, uiSchema: o, registry: h, value: m, disabled: i, readonly: a, hideError: u, required: c, label: M, hideLabel: !k, placeholder: d, formContext: $, autofocus: l, rawErrors: g });
  }
  /** Renders an array as a set of checkboxes
   */
  renderMultiSelect() {
    var t;
    const { schema: r, idSchema: n, uiSchema: o, formData: i = [], disabled: a = !1, readonly: l = !1, autofocus: c = !1, required: u = !1, placeholder: d, onBlur: p, onFocus: f, registry: m, rawErrors: h, name: g } = this.props, { widgets: y, schemaUtils: v, formContext: $, globalUiOptions: E } = m, S = v.retrieveSchema(r.items, i), b = Na(S), { widget: x = "select", title: w, ...A } = rt(o, E), M = Gr(r, x, y), k = (t = w ?? r.title) !== null && t !== void 0 ? t : g, H = v.getDisplayLabel(r, o, E);
    return _.jsx(M, { id: n.$id, name: g, multiple: !0, onChange: this.onSelectChange, onBlur: p, onFocus: f, options: { ...A, enumOptions: b }, schema: r, uiSchema: o, registry: m, value: i, disabled: a, readonly: l, required: u, label: k, hideLabel: !H, placeholder: d, formContext: $, autofocus: c, rawErrors: h });
  }
  /** Renders an array of files using the `FileWidget`
   */
  renderFiles() {
    var t;
    const { schema: r, uiSchema: n, idSchema: o, name: i, disabled: a = !1, readonly: l = !1, autofocus: c = !1, required: u = !1, onBlur: d, onFocus: p, registry: f, formData: m = [], rawErrors: h } = this.props, { widgets: g, formContext: y, globalUiOptions: v, schemaUtils: $ } = f, { widget: E = "files", title: S, ...b } = rt(n, v), x = Gr(r, E, g), w = (t = S ?? r.title) !== null && t !== void 0 ? t : i, A = $.getDisplayLabel(r, n, v);
    return _.jsx(x, { options: b, id: o.$id, name: i, multiple: !0, onChange: this.onSelectChange, onBlur: d, onFocus: p, schema: r, uiSchema: n, value: m, disabled: a, readonly: l, required: u, registry: f, formContext: y, autofocus: c, rawErrors: h, label: w, hideLabel: !A });
  }
  /** Renders an array that has a maximum limit of items
   */
  renderFixedArray() {
    const { schema: t, uiSchema: r = {}, formData: n = [], errorSchema: o, idPrefix: i, idSeparator: a = "_", idSchema: l, name: c, disabled: u = !1, readonly: d = !1, autofocus: p = !1, required: f = !1, registry: m, onBlur: h, onFocus: g, rawErrors: y } = this.props, { keyedFormData: v } = this.state;
    let { formData: $ = [] } = this.props;
    const E = t.title || c, S = rt(r), { schemaUtils: b, formContext: x } = m, A = (wr(t.items) ? t.items : []).map((K, z) => b.retrieveSchema(K, n[z])), M = wr(t.additionalItems) ? b.retrieveSchema(t.additionalItems, n) : null;
    (!$ || $.length < A.length) && ($ = $ || [], $ = $.concat(new Array(A.length - $.length)));
    const k = this.canAddItem($) && !!M, H = {
      canAdd: k,
      className: "field field-array field-array-fixed-items",
      disabled: u,
      idSchema: l,
      formData: n,
      items: v.map((K, z) => {
        const { key: G, item: X } = K, J = X, Z = z >= A.length, ne = (Z && wr(t.additionalItems) ? b.retrieveSchema(t.additionalItems, J) : A[z]) || {}, D = l.$id + a + z, N = b.toIdSchema(ne, D, J, i, a), W = Z ? r.additionalItems || {} : Array.isArray(r.items) ? r.items[z] : r.items || {}, F = o ? o[z] : void 0;
        return this.renderArrayFieldItem({
          key: G,
          index: z,
          name: c && `${c}-${z}`,
          canAdd: k,
          canRemove: Z,
          canMoveUp: z >= A.length + 1,
          canMoveDown: Z && z < $.length - 1,
          itemSchema: ne,
          itemData: J,
          itemUiSchema: W,
          itemIdSchema: N,
          itemErrorSchema: F,
          autofocus: p && z === 0,
          onBlur: h,
          onFocus: g,
          rawErrors: y,
          totalItems: v.length
        });
      }),
      onAddClick: this.onAddClick,
      readonly: d,
      required: f,
      registry: m,
      schema: t,
      uiSchema: r,
      title: E,
      formContext: x,
      rawErrors: y
    }, U = Ke("ArrayFieldTemplate", m, S);
    return _.jsx(U, { ...H });
  }
  /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
   * back to the `ArrayFieldItemTemplate`.
   *
   * @param props - The props for the individual array item to be rendered
   */
  renderArrayFieldItem(t) {
    const { key: r, index: n, name: o, canAdd: i, canRemove: a = !0, canMoveUp: l, canMoveDown: c, itemSchema: u, itemData: d, itemUiSchema: p, itemIdSchema: f, itemErrorSchema: m, autofocus: h, onBlur: g, onFocus: y, rawErrors: v, totalItems: $ } = t, { disabled: E, hideError: S, idPrefix: b, idSeparator: x, readonly: w, uiSchema: A, registry: M, formContext: k } = this.props, { fields: { ArraySchemaField: H, SchemaField: U }, globalUiOptions: K } = M, z = H || U, { orderable: G = !0, removable: X = !0, copyable: J = !1 } = rt(A, K), Z = {
      moveUp: G && l,
      moveDown: G && c,
      copy: J && i,
      remove: X && a,
      toolbar: !1
    };
    return Z.toolbar = Object.keys(Z).some((ne) => Z[ne]), {
      children: _.jsx(z, { name: o, index: n, schema: u, uiSchema: p, formData: d, formContext: k, errorSchema: m, idPrefix: b, idSeparator: x, idSchema: f, required: this.isItemRequired(u), onChange: this.onChangeForIndex(n), onBlur: g, onFocus: y, registry: M, disabled: E, readonly: w, hideError: S, autofocus: h, rawErrors: v }),
      className: "array-item",
      disabled: E,
      canAdd: i,
      hasCopy: Z.copy,
      hasToolbar: Z.toolbar,
      hasMoveUp: Z.moveUp,
      hasMoveDown: Z.moveDown,
      hasRemove: Z.remove,
      index: n,
      totalItems: $,
      key: r,
      onAddIndexClick: this.onAddIndexClick,
      onCopyIndexClick: this.onCopyIndexClick,
      onDropIndexClick: this.onDropIndexClick,
      onReorderClick: this.onReorderClick,
      readonly: w,
      registry: M,
      schema: u,
      uiSchema: p
    };
  }
}
function R4(e) {
  var t, r;
  const { schema: n, name: o, uiSchema: i, idSchema: a, formData: l, registry: c, required: u, disabled: d, readonly: p, hideError: f, autofocus: m, onChange: h, onFocus: g, onBlur: y, rawErrors: v } = e, { title: $ } = n, { widgets: E, formContext: S, translateString: b, globalUiOptions: x } = c, {
    widget: w = "checkbox",
    title: A,
    // Unlike the other fields, don't use `getDisplayLabel()` since it always returns false for the boolean type
    label: M = !0,
    ...k
  } = rt(i, x), H = Gr(n, w, E), U = b(Ze.YesLabel), K = b(Ze.NoLabel);
  let z;
  const G = (t = A ?? $) !== null && t !== void 0 ? t : o;
  if (Array.isArray(n.oneOf))
    z = Na({
      oneOf: n.oneOf.map((X) => {
        if (wr(X))
          return {
            ...X,
            title: X.title || (X.const === !0 ? U : K)
          };
      }).filter((X) => X)
      // cast away the error that typescript can't grok is fixed
    });
  else {
    const X = n, J = (r = n.enum) !== null && r !== void 0 ? r : [!0, !1];
    !X.enumNames && J.length === 2 && J.every((Z) => typeof Z == "boolean") ? z = [
      {
        value: J[0],
        label: J[0] ? U : K
      },
      {
        value: J[1],
        label: J[1] ? U : K
      }
    ] : z = Na({
      enum: J,
      // NOTE: enumNames is deprecated, but still supported for now.
      enumNames: X.enumNames
    });
  }
  return _.jsx(H, { options: { ...k, enumOptions: z }, schema: n, uiSchema: i, id: a.$id, name: o, onChange: h, onFocus: g, onBlur: y, label: G, hideLabel: !M, value: l, required: u, disabled: d, readonly: p, hideError: f, registry: c, formContext: S, autofocus: m, rawErrors: v });
}
class Eh extends os {
  /** Constructs an `AnyOfField` with the given `props` to initialize the initially selected option in state
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(t) {
    super(t), this.onOptionChange = (a) => {
      const { selectedOption: l, retrievedOptions: c } = this.state, { formData: u, onChange: d, registry: p } = this.props, { schemaUtils: f } = p, m = a !== void 0 ? parseInt(a, 10) : -1;
      if (m === l)
        return;
      const h = m >= 0 ? c[m] : void 0, g = l >= 0 ? c[l] : void 0;
      let y = f.sanitizeDataForNewSchema(h, g, u);
      y && h && (y = f.getDefaultFormState(h, y, "excludeObjectChildren")), d(y, void 0, this.getFieldId()), this.setState({ selectedOption: m });
    };
    const { formData: r, options: n, registry: { schemaUtils: o } } = this.props, i = n.map((a) => o.retrieveSchema(a, r));
    this.state = {
      retrievedOptions: i,
      selectedOption: this.getMatchingOption(0, r, i)
    };
  }
  /** React lifecycle method that is called when the props and/or state for this component is updated. It recomputes the
   * currently selected option based on the overall `formData`
   *
   * @param prevProps - The previous `FieldProps` for this template
   * @param prevState - The previous `AnyOfFieldState` for this template
   */
  componentDidUpdate(t, r) {
    const { formData: n, options: o, idSchema: i } = this.props, { selectedOption: a } = this.state;
    let l = this.state;
    if (!mr(t.options, o)) {
      const { registry: { schemaUtils: c } } = this.props, u = o.map((d) => c.retrieveSchema(d, n));
      l = { selectedOption: a, retrievedOptions: u };
    }
    if (!mr(n, t.formData) && i.$id === t.idSchema.$id) {
      const { retrievedOptions: c } = l, u = this.getMatchingOption(a, n, c);
      r && u !== a && (l = { selectedOption: u, retrievedOptions: c });
    }
    l !== this.state && this.setState(l);
  }
  /** Determines the best matching option for the given `formData` and `options`.
   *
   * @param formData - The new formData
   * @param options - The list of options to choose from
   * @return - The index of the `option` that best matches the `formData`
   */
  getMatchingOption(t, r, n) {
    const { schema: o, registry: { schemaUtils: i } } = this.props, a = ko(o);
    return i.getClosestMatchingOption(r, n, t, a);
  }
  getFieldId() {
    const { idSchema: t, schema: r } = this.props;
    return `${t.$id}${r.oneOf ? "__oneof_select" : "__anyof_select"}`;
  }
  /** Renders the `AnyOfField` selector along with a `SchemaField` for the value of the `formData`
   */
  render() {
    const { name: t, disabled: r = !1, errorSchema: n = {}, formContext: o, onBlur: i, onFocus: a, registry: l, schema: c, uiSchema: u } = this.props, { widgets: d, fields: p, translateString: f, globalUiOptions: m, schemaUtils: h } = l, { SchemaField: g } = p, { selectedOption: y, retrievedOptions: v } = this.state, { widget: $ = "select", placeholder: E, autofocus: S, autocomplete: b, title: x = c.title, ...w } = rt(u, m), A = Gr({ type: "number" }, $, d), M = Te(n, xr, []), k = Oa(n, [xr]), H = h.getDisplayLabel(c, u, m), U = y >= 0 && v[y] || null;
    let K;
    if (U) {
      const { required: J } = c;
      K = J ? Qr({ required: J }, U) : U;
    }
    const z = x ? Ze.TitleOptionPrefix : Ze.OptionPrefix, G = x ? [x] : [], X = v.map((J, Z) => ({
      label: J.title || f(z, G.concat(String(Z + 1))),
      value: Z
    }));
    return _.jsxs("div", { className: "panel panel-default panel-body", children: [_.jsx("div", { className: "form-group", children: _.jsx(A, { id: this.getFieldId(), name: `${t}${c.oneOf ? "__oneof_select" : "__anyof_select"}`, schema: { type: "number", default: 0 }, onChange: this.onOptionChange, onBlur: i, onFocus: a, disabled: r || Kn(X), multiple: !1, rawErrors: M, errorSchema: k, value: y >= 0 ? y : void 0, options: { enumOptions: X, ...w }, registry: l, formContext: o, placeholder: E, autocomplete: b, autofocus: S, label: x ?? t, hideLabel: !H }) }), U !== null && _.jsx(g, { ...this.props, schema: K })] });
  }
}
const I4 = /\.([0-9]*0)*$/, N4 = /[0.]0*$/;
function A4(e) {
  const { registry: t, onChange: r, formData: n, value: o } = e, [i, a] = Bo(o), { StringField: l } = t.fields;
  let c = n;
  const u = $t((d) => {
    a(d), `${d}`.charAt(0) === "." && (d = `0${d}`);
    const p = typeof d == "string" && d.match(I4) ? rm(d.replace(N4, "")) : rm(d);
    r(p);
  }, [r]);
  if (typeof i == "string" && typeof c == "number") {
    const d = new RegExp(`${c}`.replace(".", "\\.") + "\\.?0*$");
    i.match(d) && (c = i);
  }
  return _.jsx(l, { ...e, formData: c, onChange: u });
}
function Dn() {
  return Dn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Dn.apply(this, arguments);
}
const j4 = ["children", "options"], Re = { blockQuote: "0", breakLine: "1", breakThematic: "2", codeBlock: "3", codeFenced: "4", codeInline: "5", footnote: "6", footnoteReference: "7", gfmTask: "8", heading: "9", headingSetext: "10", htmlBlock: "11", htmlComment: "12", htmlSelfClosing: "13", image: "14", link: "15", linkAngleBraceStyleDetector: "16", linkBareUrlDetector: "17", linkMailtoDetector: "18", newlineCoalescer: "19", orderedList: "20", paragraph: "21", ref: "22", refImage: "23", refLink: "24", table: "25", tableSeparator: "26", text: "27", textBolded: "28", textEmphasized: "29", textEscaped: "30", textMarked: "31", textStrikethroughed: "32", unorderedList: "33" };
var _h;
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(_h || (_h = {}));
const xh = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { class: "className", for: "htmlFor" }), wh = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, k4 = ["style", "script"], M4 = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, D4 = /mailto:/i, F4 = /\n{2,}$/, Sb = /^(\s*>[\s\S]*?)(?=\n\n|$)/, L4 = /^ *> ?/gm, B4 = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/, V4 = /^ {2,}\n/, z4 = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Eb = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/, _b = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, U4 = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, W4 = /^(?:\n *)*\n/, q4 = /\r\n?/g, K4 = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, H4 = /^\[\^([^\]]+)]/, G4 = /\f/g, Y4 = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, X4 = /^\s*?\[(x|\s)\]/, xb = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, wb = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Tb = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, iu = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, J4 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Ob = /^<!--[\s\S]*?(?:-->)/, Z4 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, su = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Q4 = /^\{.*\}$/, e3 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, t3 = /^<([^ >]+@[^ >]+)>/, r3 = /^<([^ >]+:\/[^ >]+)>/, n3 = /-([a-z])?/gi, Cb = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, o3 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, i3 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, s3 = /^\[([^\]]*)\] ?\[([^\]]*)\]/, a3 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, l3 = /\t/g, c3 = /(^ *\||\| *$)/g, u3 = /^ *:-+: *$/, d3 = /^ *:-+ *$/, f3 = /^ *-+: *$/, jl = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)", p3 = new RegExp(`^([*_])\\1${jl}\\1\\1(?!\\1)`), m3 = new RegExp(`^([*_])${jl}\\1(?!\\1|\\w)`), h3 = new RegExp(`^==${jl}==`), y3 = new RegExp(`^~~${jl}~~`), g3 = /^\\([^0-9A-Za-z\s])/, v3 = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, b3 = /^\n+/, $3 = /^([ \t]*)/, S3 = /\\([^\\])/g, Th = / *\n+$/, E3 = /(?:^|\n)( *)$/, Pd = "(?:\\d+\\.)", Rd = "(?:[*+-])";
function Pb(e) {
  return "( *)(" + (e === 1 ? Pd : Rd) + ") +";
}
const Rb = Pb(1), Ib = Pb(2);
function Nb(e) {
  return new RegExp("^" + (e === 1 ? Rb : Ib));
}
const _3 = Nb(1), x3 = Nb(2);
function Ab(e) {
  return new RegExp("^" + (e === 1 ? Rb : Ib) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Pd : Rd) + " )[^\\n]*)*(\\n|$)", "gm");
}
const jb = Ab(1), kb = Ab(2);
function Mb(e) {
  const t = e === 1 ? Pd : Rd;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Db = Mb(1), Fb = Mb(2);
function Oh(e, t) {
  const r = t === 1, n = r ? Db : Fb, o = r ? jb : kb, i = r ? _3 : x3;
  return { match(a, l) {
    const c = E3.exec(l.prevCapture);
    return c && (l.list || !l.inline && !l.simple) ? n.exec(a = c[1] + a) : null;
  }, order: 1, parse(a, l, c) {
    const u = r ? +a[2] : void 0, d = a[0].replace(F4, `
`).match(o);
    let p = !1;
    return { items: d.map(function(f, m) {
      const h = i.exec(f)[0].length, g = new RegExp("^ {1," + h + "}", "gm"), y = f.replace(g, "").replace(i, ""), v = m === d.length - 1, $ = y.indexOf(`

`) !== -1 || v && p;
      p = $;
      const E = c.inline, S = c.list;
      let b;
      c.list = !0, $ ? (c.inline = !1, b = y.replace(Th, `

`)) : (c.inline = !0, b = y.replace(Th, ""));
      const x = l(b, c);
      return c.inline = E, c.list = S, x;
    }), ordered: r, start: u };
  }, render: (a, l, c) => e(a.ordered ? "ol" : "ul", { key: c.key, start: a.type === Re.orderedList ? a.start : void 0 }, a.items.map(function(u, d) {
    return e("li", { key: d }, l(u, c));
  })) };
}
const w3 = new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), T3 = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Lb = [Sb, Eb, _b, xb, Tb, wb, Ob, Cb, jb, Db, kb, Fb], O3 = [...Lb, /^[^\n]+(?:  \n|\n{2,})/, iu, su];
function Si(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function C3(e) {
  return f3.test(e) ? "right" : u3.test(e) ? "center" : d3.test(e) ? "left" : null;
}
function Ch(e, t, r, n) {
  const o = r.inTable;
  r.inTable = !0;
  let i = [[]], a = "";
  function l() {
    if (!a)
      return;
    const c = i[i.length - 1];
    c.push.apply(c, t(a, r)), a = "";
  }
  return e.trim().split(/(`[^`]*`|\\\||\|)/).filter(Boolean).forEach((c, u, d) => {
    c.trim() === "|" && (l(), n) ? u !== 0 && u !== d.length - 1 && i.push([]) : a += c;
  }), l(), r.inTable = o, i;
}
function P3(e, t, r) {
  r.inline = !0;
  const n = e[2] ? e[2].replace(c3, "").split("|").map(C3) : [], o = e[3] ? function(a, l, c) {
    return a.trim().split(`
`).map(function(u) {
      return Ch(u, l, c, !0);
    });
  }(e[3], t, r) : [], i = Ch(e[1], t, r, !!o.length);
  return r.inline = !1, o.length ? { align: n, cells: o, header: i, type: Re.table } : { children: i, type: Re.paragraph };
}
function Ph(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function sn(e) {
  return function(t, r) {
    return r.inline ? e.exec(t) : null;
  };
}
function an(e) {
  return function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  };
}
function Kr(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function Ei(e) {
  return function(t) {
    return e.exec(t);
  };
}
function R3(e, t) {
  if (t.inline || t.simple)
    return null;
  let r = "";
  e.split(`
`).every((o) => (o += `
`, !Lb.some((i) => i.test(o)) && (r += o, !!o.trim())));
  const n = r.trimEnd();
  return n == "" ? null : [r, n];
}
function I3(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return null;
  } catch {
    return null;
  }
  return e;
}
function Rh(e) {
  return e.replace(S3, "$1");
}
function ia(e, t, r) {
  const n = r.inline || !1, o = r.simple || !1;
  r.inline = !0, r.simple = !0;
  const i = e(t, r);
  return r.inline = n, r.simple = o, i;
}
function N3(e, t, r) {
  const n = r.inline || !1, o = r.simple || !1;
  r.inline = !1, r.simple = !0;
  const i = e(t, r);
  return r.inline = n, r.simple = o, i;
}
function A3(e, t, r) {
  const n = r.inline || !1;
  r.inline = !1;
  const o = e(t, r);
  return r.inline = n, o;
}
const bc = (e, t, r) => ({ children: ia(t, e[1], r) });
function $c() {
  return {};
}
function Sc() {
  return null;
}
function j3(...e) {
  return e.filter(Boolean).join(" ");
}
function Ec(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
function k3(e = "", t = {}) {
  function r(f, m, ...h) {
    const g = Ec(t.overrides, `${f}.props`, {});
    return t.createElement(function(y, v) {
      const $ = Ec(v, y);
      return $ ? typeof $ == "function" || typeof $ == "object" && "render" in $ ? $ : Ec(v, `${y}.component`, y) : y;
    }(f, t.overrides), Dn({}, m, g, { className: j3(m == null ? void 0 : m.className, g.className) || void 0 }), ...h);
  }
  function n(f) {
    f = f.replace(Y4, "");
    let m = !1;
    t.forceInline ? m = !0 : t.forceBlock || (m = a3.test(f) === !1);
    const h = u(c(m ? f : `${f.trimEnd().replace(b3, "")}

`, { inline: m }));
    for (; typeof h[h.length - 1] == "string" && !h[h.length - 1].trim(); )
      h.pop();
    if (t.wrapper === null)
      return h;
    const g = t.wrapper || (m ? "span" : "div");
    let y;
    if (h.length > 1 || t.forceWrapper)
      y = h;
    else {
      if (h.length === 1)
        return y = h[0], typeof y == "string" ? r("span", { key: "outer" }, y) : y;
      y = null;
    }
    return t.createElement(g, { key: "outer" }, y);
  }
  function o(f, m) {
    const h = m.match(M4);
    return h ? h.reduce(function(g, y) {
      const v = y.indexOf("=");
      if (v !== -1) {
        const $ = function(x) {
          return x.indexOf("-") !== -1 && x.match(Z4) === null && (x = x.replace(n3, function(w, A) {
            return A.toUpperCase();
          })), x;
        }(y.slice(0, v)).trim(), E = function(x) {
          const w = x[0];
          return (w === '"' || w === "'") && x.length >= 2 && x[x.length - 1] === w ? x.slice(1, -1) : x;
        }(y.slice(v + 1).trim()), S = xh[$] || $;
        if (S === "ref")
          return g;
        const b = g[S] = function(x, w, A, M) {
          return w === "style" ? A.split(/;\s?/).reduce(function(k, H) {
            const U = H.slice(0, H.indexOf(":"));
            return k[U.trim().replace(/(-[a-z])/g, (K) => K[1].toUpperCase())] = H.slice(U.length + 1).trim(), k;
          }, {}) : w === "href" || w === "src" ? M(A, x, w) : (A.match(Q4) && (A = A.slice(1, A.length - 1)), A === "true" || A !== "false" && A);
        }(f, $, E, t.sanitizer);
        typeof b == "string" && (iu.test(b) || su.test(b)) && (g[S] = n(b.trim()));
      } else
        y !== "style" && (g[xh[y] || y] = !0);
      return g;
    }, {}) : null;
  }
  t.overrides = t.overrides || {}, t.sanitizer = t.sanitizer || I3, t.slugify = t.slugify || Si, t.namedCodesToUnicode = t.namedCodesToUnicode ? Dn({}, wh, t.namedCodesToUnicode) : wh, t.createElement = t.createElement || P.createElement;
  const i = [], a = {}, l = { [Re.blockQuote]: { match: Kr(Sb), order: 1, parse(f, m, h) {
    const [, g, y] = f[0].replace(L4, "").match(B4);
    return { alert: g, children: m(y, h) };
  }, render(f, m, h) {
    const g = { key: h.key };
    return f.alert && (g.className = "markdown-alert-" + t.slugify(f.alert.toLowerCase(), Si), f.children.unshift({ attrs: {}, children: [{ type: Re.text, text: f.alert }], noInnerParse: !0, type: Re.htmlBlock, tag: "header" })), r("blockquote", g, m(f.children, h));
  } }, [Re.breakLine]: { match: Ei(V4), order: 1, parse: $c, render: (f, m, h) => r("br", { key: h.key }) }, [Re.breakThematic]: { match: Kr(z4), order: 1, parse: $c, render: (f, m, h) => r("hr", { key: h.key }) }, [Re.codeBlock]: { match: Kr(_b), order: 0, parse: (f) => ({ lang: void 0, text: f[0].replace(/^ {4}/gm, "").replace(/\n+$/, "") }), render: (f, m, h) => r("pre", { key: h.key }, r("code", Dn({}, f.attrs, { className: f.lang ? `lang-${f.lang}` : "" }), f.text)) }, [Re.codeFenced]: { match: Kr(Eb), order: 0, parse: (f) => ({ attrs: o("code", f[3] || ""), lang: f[2] || void 0, text: f[4], type: Re.codeBlock }) }, [Re.codeInline]: { match: an(U4), order: 3, parse: (f) => ({ text: f[2] }), render: (f, m, h) => r("code", { key: h.key }, f.text) }, [Re.footnote]: { match: Kr(K4), order: 0, parse: (f) => (i.push({ footnote: f[2], identifier: f[1] }), {}), render: Sc }, [Re.footnoteReference]: { match: sn(H4), order: 1, parse: (f) => ({ target: `#${t.slugify(f[1], Si)}`, text: f[1] }), render: (f, m, h) => r("a", { key: h.key, href: t.sanitizer(f.target, "a", "href") }, r("sup", { key: h.key }, f.text)) }, [Re.gfmTask]: { match: sn(X4), order: 1, parse: (f) => ({ completed: f[1].toLowerCase() === "x" }), render: (f, m, h) => r("input", { checked: f.completed, key: h.key, readOnly: !0, type: "checkbox" }) }, [Re.heading]: { match: Kr(t.enforceAtxHeadings ? wb : xb), order: 1, parse: (f, m, h) => ({ children: ia(m, f[2], h), id: t.slugify(f[2], Si), level: f[1].length }), render: (f, m, h) => r(`h${f.level}`, { id: f.id, key: h.key }, m(f.children, h)) }, [Re.headingSetext]: { match: Kr(Tb), order: 0, parse: (f, m, h) => ({ children: ia(m, f[1], h), level: f[2] === "=" ? 1 : 2, type: Re.heading }) }, [Re.htmlBlock]: { match: Ei(iu), order: 1, parse(f, m, h) {
    const [, g] = f[3].match($3), y = new RegExp(`^${g}`, "gm"), v = f[3].replace(y, ""), $ = (E = v, O3.some((A) => A.test(E)) ? A3 : ia);
    var E;
    const S = f[1].toLowerCase(), b = k4.indexOf(S) !== -1, x = (b ? S : f[1]).trim(), w = { attrs: o(x, f[2]), noInnerParse: b, tag: x };
    return h.inAnchor = h.inAnchor || S === "a", b ? w.text = f[3] : w.children = $(m, v, h), h.inAnchor = !1, w;
  }, render: (f, m, h) => r(f.tag, Dn({ key: h.key }, f.attrs), f.text || (f.children ? m(f.children, h) : "")) }, [Re.htmlSelfClosing]: { match: Ei(su), order: 1, parse(f) {
    const m = f[1].trim();
    return { attrs: o(m, f[2] || ""), tag: m };
  }, render: (f, m, h) => r(f.tag, Dn({}, f.attrs, { key: h.key })) }, [Re.htmlComment]: { match: Ei(Ob), order: 1, parse: () => ({}), render: Sc }, [Re.image]: { match: an(T3), order: 1, parse: (f) => ({ alt: f[1], target: Rh(f[2]), title: f[3] }), render: (f, m, h) => r("img", { key: h.key, alt: f.alt || void 0, title: f.title || void 0, src: t.sanitizer(f.target, "img", "src") }) }, [Re.link]: { match: sn(w3), order: 3, parse: (f, m, h) => ({ children: N3(m, f[1], h), target: Rh(f[2]), title: f[3] }), render: (f, m, h) => r("a", { key: h.key, href: t.sanitizer(f.target, "a", "href"), title: f.title }, m(f.children, h)) }, [Re.linkAngleBraceStyleDetector]: { match: sn(r3), order: 0, parse: (f) => ({ children: [{ text: f[1], type: Re.text }], target: f[1], type: Re.link }) }, [Re.linkBareUrlDetector]: { match: (f, m) => m.inAnchor || t.disableAutoLink ? null : sn(e3)(f, m), order: 0, parse: (f) => ({ children: [{ text: f[1], type: Re.text }], target: f[1], title: void 0, type: Re.link }) }, [Re.linkMailtoDetector]: { match: sn(t3), order: 0, parse(f) {
    let m = f[1], h = f[1];
    return D4.test(h) || (h = "mailto:" + h), { children: [{ text: m.replace("mailto:", ""), type: Re.text }], target: h, type: Re.link };
  } }, [Re.orderedList]: Oh(r, 1), [Re.unorderedList]: Oh(r, 2), [Re.newlineCoalescer]: { match: Kr(W4), order: 3, parse: $c, render: () => `
` }, [Re.paragraph]: { match: R3, order: 3, parse: bc, render: (f, m, h) => r("p", { key: h.key }, m(f.children, h)) }, [Re.ref]: { match: sn(o3), order: 0, parse: (f) => (a[f[1]] = { target: f[2], title: f[4] }, {}), render: Sc }, [Re.refImage]: { match: an(i3), order: 0, parse: (f) => ({ alt: f[1] || void 0, ref: f[2] }), render: (f, m, h) => a[f.ref] ? r("img", { key: h.key, alt: f.alt, src: t.sanitizer(a[f.ref].target, "img", "src"), title: a[f.ref].title }) : null }, [Re.refLink]: { match: sn(s3), order: 0, parse: (f, m, h) => ({ children: m(f[1], h), fallbackChildren: f[0], ref: f[2] }), render: (f, m, h) => a[f.ref] ? r("a", { key: h.key, href: t.sanitizer(a[f.ref].target, "a", "href"), title: a[f.ref].title }, m(f.children, h)) : r("span", { key: h.key }, f.fallbackChildren) }, [Re.table]: { match: Kr(Cb), order: 1, parse: P3, render(f, m, h) {
    const g = f;
    return r("table", { key: h.key }, r("thead", null, r("tr", null, g.header.map(function(y, v) {
      return r("th", { key: v, style: Ph(g, v) }, m(y, h));
    }))), r("tbody", null, g.cells.map(function(y, v) {
      return r("tr", { key: v }, y.map(function($, E) {
        return r("td", { key: E, style: Ph(g, E) }, m($, h));
      }));
    })));
  } }, [Re.text]: { match: Ei(v3), order: 4, parse: (f) => ({ text: f[0].replace(J4, (m, h) => t.namedCodesToUnicode[h] ? t.namedCodesToUnicode[h] : m) }), render: (f) => f.text }, [Re.textBolded]: { match: an(p3), order: 2, parse: (f, m, h) => ({ children: m(f[2], h) }), render: (f, m, h) => r("strong", { key: h.key }, m(f.children, h)) }, [Re.textEmphasized]: { match: an(m3), order: 3, parse: (f, m, h) => ({ children: m(f[2], h) }), render: (f, m, h) => r("em", { key: h.key }, m(f.children, h)) }, [Re.textEscaped]: { match: an(g3), order: 1, parse: (f) => ({ text: f[1], type: Re.text }) }, [Re.textMarked]: { match: an(h3), order: 3, parse: bc, render: (f, m, h) => r("mark", { key: h.key }, m(f.children, h)) }, [Re.textStrikethroughed]: { match: an(y3), order: 3, parse: bc, render: (f, m, h) => r("del", { key: h.key }, m(f.children, h)) } };
  t.disableParsingRawHTML === !0 && (delete l[Re.htmlBlock], delete l[Re.htmlSelfClosing]);
  const c = function(f) {
    let m = Object.keys(f);
    function h(g, y) {
      let v = [];
      for (y.prevCapture = y.prevCapture || ""; g; ) {
        let $ = 0;
        for (; $ < m.length; ) {
          const E = m[$], S = f[E], b = S.match(g, y);
          if (b) {
            const x = b[0];
            y.prevCapture += x, g = g.substring(x.length);
            const w = S.parse(b, h, y);
            w.type == null && (w.type = E), v.push(w);
            break;
          }
          $++;
        }
      }
      return y.prevCapture = "", v;
    }
    return m.sort(function(g, y) {
      let v = f[g].order, $ = f[y].order;
      return v !== $ ? v - $ : g < y ? -1 : 1;
    }), function(g, y) {
      return h(function(v) {
        return v.replace(q4, `
`).replace(G4, "").replace(l3, "    ");
      }(g), y);
    };
  }(l), u = (d = function(f, m) {
    return function(h, g, y) {
      const v = f[h.type].render;
      return m ? m(() => v(h, g, y), h, g, y) : v(h, g, y);
    };
  }(l, t.renderRule), function f(m, h = {}) {
    if (Array.isArray(m)) {
      const g = h.key, y = [];
      let v = !1;
      for (let $ = 0; $ < m.length; $++) {
        h.key = $;
        const E = f(m[$], h), S = typeof E == "string";
        S && v ? y[y.length - 1] += E : E !== null && y.push(E), v = S;
      }
      return h.key = g, y;
    }
    return d(m, f, h);
  });
  var d;
  const p = n(e);
  return i.length ? r("div", null, p, r("footer", { key: "footer" }, i.map(function(f) {
    return r("div", { id: t.slugify(f.identifier, Si), key: f.identifier }, f.identifier, u(c(f.footnote, { inline: !0 })));
  }))) : p;
}
const kl = (e) => {
  let { children: t = "", options: r } = e, n = function(o, i) {
    if (o == null)
      return {};
    var a, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      i.indexOf(a = u[l]) >= 0 || (c[a] = o[a]);
    return c;
  }(e, j4);
  return P.cloneElement(k3(t, r), n);
};
var M3 = cv;
function D3(e, t) {
  return e == null ? !0 : M3(e, t);
}
var F3 = D3;
const L3 = /* @__PURE__ */ pt(F3);
class B3 extends os {
  constructor() {
    super(...arguments), this.state = {
      wasPropertyKeyModified: !1,
      additionalProperties: {}
    }, this.onPropertyChange = (t, r = !1) => (n, o, i) => {
      const { formData: a, onChange: l, errorSchema: c } = this.props;
      n === void 0 && r && (n = "");
      const u = { ...a, [t]: n };
      l(u, c && c && {
        ...c,
        [t]: o
      }, i);
    }, this.onDropPropertyClick = (t) => (r) => {
      r.preventDefault();
      const { onChange: n, formData: o } = this.props, i = { ...o };
      L3(i, t), n(i);
    }, this.getAvailableKey = (t, r) => {
      const { uiSchema: n, registry: o } = this.props, { duplicateKeySuffixSeparator: i = "-" } = rt(n, o.globalUiOptions);
      let a = 0, l = t;
      for (; Jt(r, l); )
        l = `${t}${i}${++a}`;
      return l;
    }, this.onKeyChange = (t) => (r, n) => {
      if (t === r)
        return;
      const { formData: o, onChange: i, errorSchema: a } = this.props;
      r = this.getAvailableKey(r, o);
      const l = {
        ...o
      }, c = { [t]: r }, u = Object.keys(l).map((p) => ({ [c[p] || p]: l[p] })), d = Object.assign({}, ...u);
      this.setState({ wasPropertyKeyModified: !0 }), i(d, a && a && {
        ...a,
        [r]: n
      });
    }, this.handleAddClick = (t) => () => {
      if (!t.additionalProperties)
        return;
      const { formData: r, onChange: n, registry: o } = this.props, i = { ...r };
      let a;
      if (wr(t.additionalProperties)) {
        a = t.additionalProperties.type;
        let c = t.additionalProperties;
        if (At in c) {
          const { schemaUtils: u } = o;
          c = u.retrieveSchema({ $ref: c[At] }, r), a = c.type;
        }
        !a && (No in c || yn in c) && (a = "object");
      }
      const l = this.getAvailableKey("newKey", i);
      Kt(i, l, this.getDefaultValue(a)), n(i);
    };
  }
  /** Returns a flag indicating whether the `name` field is required in the object schema
   *
   * @param name - The name of the field to check for required-ness
   * @returns - True if the field `name` is required, false otherwise
   */
  isRequired(t) {
    const { schema: r } = this.props;
    return Array.isArray(r.required) && r.required.indexOf(t) !== -1;
  }
  /** Returns a default value to be used for a new additional schema property of the given `type`
   *
   * @param type - The type of the new additional schema property
   */
  getDefaultValue(t) {
    const { registry: { translateString: r } } = this.props;
    switch (t) {
      case "array":
        return [];
      case "boolean":
        return !1;
      case "null":
        return null;
      case "number":
        return 0;
      case "object":
        return {};
      case "string":
      default:
        return r(Ze.NewStringDefault);
    }
  }
  /** Renders the `ObjectField` from the given props
   */
  render() {
    var t, r, n;
    const { schema: o, uiSchema: i = {}, formData: a, errorSchema: l, idSchema: c, name: u, required: d = !1, disabled: p = !1, readonly: f = !1, hideError: m, idPrefix: h, idSeparator: g, onBlur: y, onFocus: v, registry: $ } = this.props, { fields: E, formContext: S, schemaUtils: b, translateString: x, globalUiOptions: w } = $, { SchemaField: A } = E, M = b.retrieveSchema(o, a), k = rt(i, w), { properties: H = {} } = M, U = (r = (t = k.title) !== null && t !== void 0 ? t : M.title) !== null && r !== void 0 ? r : u, K = (n = k.description) !== null && n !== void 0 ? n : M.description;
    let z;
    try {
      const J = Object.keys(H);
      z = QU(J, k.order);
    } catch (J) {
      return _.jsxs("div", { children: [_.jsx("p", { className: "config-error", style: { color: "red" }, children: _.jsx(kl, { children: x(Ze.InvalidObjectField, [u || "root", J.message]) }) }), _.jsx("pre", { children: JSON.stringify(M) })] });
    }
    const G = Ke("ObjectFieldTemplate", $, k), X = {
      // getDisplayLabel() always returns false for object types, so just check the `uiOptions.label`
      title: k.label === !1 ? "" : U,
      description: k.label === !1 ? void 0 : K,
      properties: z.map((J) => {
        const Z = Jt(M, [Tt, J, Uo]), ne = Z ? i.additionalProperties : i[J], D = rt(ne).widget === "hidden", N = Te(c, [J], {});
        return {
          content: _.jsx(A, { name: J, required: this.isRequired(J), schema: Te(M, [Tt, J], {}), uiSchema: ne, errorSchema: Te(l, J), idSchema: N, idPrefix: h, idSeparator: g, formData: Te(a, J), formContext: S, wasPropertyKeyModified: this.state.wasPropertyKeyModified, onKeyChange: this.onKeyChange(J), onChange: this.onPropertyChange(J, Z), onBlur: y, onFocus: v, registry: $, disabled: p, readonly: f, hideError: m, onDropPropertyClick: this.onDropPropertyClick }, J),
          name: J,
          readonly: f,
          disabled: p,
          required: d,
          hidden: D
        };
      }),
      readonly: f,
      disabled: p,
      required: d,
      idSchema: c,
      uiSchema: i,
      errorSchema: l,
      schema: M,
      formData: a,
      formContext: S,
      registry: $
    };
    return _.jsx(G, { ...X, onAddClick: this.handleAddClick });
  }
}
const V3 = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  null: "NullField"
};
function z3(e, t, r, n) {
  const o = t.field, { fields: i, translateString: a } = n;
  if (typeof o == "function")
    return o;
  if (typeof o == "string" && o in i)
    return i[o];
  const l = bn(e), c = Array.isArray(l) ? l[0] : l || "", u = e.$id;
  let d = V3[c];
  return u && u in i && (d = u), !d && (e.anyOf || e.oneOf) ? () => null : d in i ? i[d] : () => {
    const p = Ke("UnsupportedFieldTemplate", n, t);
    return _.jsx(p, { schema: e, idSchema: r, reason: a(Ze.UnknownFieldType, [String(e.type)]), registry: n });
  };
}
function U3(e) {
  const { schema: t, idSchema: r, uiSchema: n, formData: o, errorSchema: i, idPrefix: a, idSeparator: l, name: c, onChange: u, onKeyChange: d, onDropPropertyClick: p, required: f, registry: m, wasPropertyKeyModified: h = !1 } = e, { formContext: g, schemaUtils: y, globalUiOptions: v } = m, $ = rt(n, v), E = Ke("FieldTemplate", m, $), S = Ke("DescriptionFieldTemplate", m, $), b = Ke("FieldHelpTemplate", m, $), x = Ke("FieldErrorTemplate", m, $), w = y.retrieveSchema(t, o), A = r[pn], M = oi(y.toIdSchema(w, A, o, a, l), r), k = $t((fe, Pe, je) => u(fe, Pe, je || A), [A, u]), H = z3(w, $, M, m), U = !!(e.disabled || $.disabled), K = !!(e.readonly || $.readonly || e.schema.readOnly || w.readOnly), z = $.hideError, G = z === void 0 ? e.hideError : !!z, X = !!(e.autofocus || $.autofocus);
  if (Object.keys(w).length === 0)
    return null;
  const J = y.getDisplayLabel(w, n, v), { __errors: Z, ...ne } = i || {}, D = Oa(n, ["ui:classNames", "classNames", "ui:style"]);
  Di in D && (D[Di] = Oa(D[Di], ["classNames", "style"]));
  const N = _.jsx(H, { ...e, onChange: k, idSchema: M, schema: w, uiSchema: D, disabled: U, readonly: K, hideError: G, autofocus: X, errorSchema: ne, formContext: g, rawErrors: Z }), W = M[pn];
  let F;
  h ? F = c : F = Uo in w ? c : $.title || e.schema.title || w.title || c;
  const T = $.description || e.schema.description || w.description || "", R = $.enableMarkdownInDescription ? _.jsx(kl, { children: T }) : T, B = $.help, Q = $.widget === "hidden", Y = ["form-group", "field", `field-${bn(w)}`];
  !G && Z && Z.length > 0 && Y.push("field-error has-error has-danger"), n != null && n.classNames && (process.env.NODE_ENV !== "production" && console.warn("'uiSchema.classNames' is deprecated and may be removed in a major release; Use 'ui:classNames' instead."), Y.push(n.classNames)), $.classNames && Y.push($.classNames);
  const oe = _.jsx(b, { help: B, idSchema: M, schema: w, uiSchema: n, hasErrors: !G && Z && Z.length > 0, registry: m }), ie = G || (w.anyOf || w.oneOf) && !y.isSelect(w) ? void 0 : _.jsx(x, { errors: Z, errorSchema: i, idSchema: M, schema: w, uiSchema: n, registry: m }), ce = {
    description: _.jsx(S, { id: to(W), description: R, schema: w, uiSchema: n, registry: m }),
    rawDescription: T,
    help: oe,
    rawHelp: typeof B == "string" ? B : void 0,
    errors: ie,
    rawErrors: G ? void 0 : Z,
    id: W,
    label: F,
    hidden: Q,
    onChange: u,
    onKeyChange: d,
    onDropPropertyClick: p,
    required: f,
    disabled: U,
    readonly: K,
    hideError: G,
    displayLabel: J,
    classNames: Y.join(" ").trim(),
    style: $.style,
    formContext: g,
    formData: o,
    schema: w,
    uiSchema: n,
    registry: m
  }, q = m.fields.AnyOfField, pe = m.fields.OneOfField, te = (n == null ? void 0 : n["ui:field"]) && (n == null ? void 0 : n["ui:fieldReplacesAnyOrOneOf"]) === !0;
  return _.jsx(E, { ...ce, children: _.jsxs(_.Fragment, { children: [N, w.anyOf && !te && !y.isSelect(w) && _.jsx(q, { name: c, disabled: U, readonly: K, hideError: G, errorSchema: i, formData: o, formContext: g, idPrefix: a, idSchema: M, idSeparator: l, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: w.anyOf.map((fe) => y.retrieveSchema(wr(fe) ? fe : {}, o)), registry: m, schema: w, uiSchema: n }), w.oneOf && !te && !y.isSelect(w) && _.jsx(pe, { name: c, disabled: U, readonly: K, hideError: G, errorSchema: i, formData: o, formContext: g, idPrefix: a, idSchema: M, idSeparator: l, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: w.oneOf.map((fe) => y.retrieveSchema(wr(fe) ? fe : {}, o)), registry: m, schema: w, uiSchema: n })] }) });
}
class W3 extends os {
  shouldComponentUpdate(t) {
    return !mr(this.props, t);
  }
  render() {
    return _.jsx(U3, { ...this.props });
  }
}
function q3(e) {
  var t;
  const { schema: r, name: n, uiSchema: o, idSchema: i, formData: a, required: l, disabled: c = !1, readonly: u = !1, autofocus: d = !1, onChange: p, onBlur: f, onFocus: m, registry: h, rawErrors: g, hideError: y } = e, { title: v, format: $ } = r, { widgets: E, formContext: S, schemaUtils: b, globalUiOptions: x } = h, w = b.isSelect(r) ? Na(r) : void 0;
  let A = w ? "select" : "text";
  $ && XU(r, $, E) && (A = $);
  const { widget: M = A, placeholder: k = "", title: H, ...U } = rt(o), K = b.getDisplayLabel(r, o, x), z = (t = H ?? v) !== null && t !== void 0 ? t : n, G = Gr(r, M, E);
  return _.jsx(G, { options: { ...U, enumOptions: w }, schema: r, uiSchema: o, id: i.$id, name: n, label: z, hideLabel: !K, hideError: y, value: a, onChange: p, onBlur: f, onFocus: m, required: l, disabled: c, readonly: u, formContext: S, autofocus: d, registry: h, placeholder: k, rawErrors: g });
}
function K3(e) {
  const { formData: t, onChange: r } = e;
  return Va(() => {
    t === void 0 && r(null);
  }, [t, r]), null;
}
function H3() {
  return {
    AnyOfField: Eh,
    ArrayField: P4,
    // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
    BooleanField: R4,
    NumberField: A4,
    ObjectField: B3,
    OneOfField: Eh,
    SchemaField: W3,
    StringField: q3,
    NullField: K3
  };
}
function G3(e) {
  const { idSchema: t, description: r, registry: n, schema: o, uiSchema: i } = e, a = rt(i, n.globalUiOptions), { label: l = !0 } = a;
  if (!r || !l)
    return null;
  const c = Ke("DescriptionFieldTemplate", n, a);
  return _.jsx(c, { id: to(t), description: r, schema: o, uiSchema: i, registry: n });
}
function Y3(e) {
  const { children: t, className: r, disabled: n, hasToolbar: o, hasMoveDown: i, hasMoveUp: a, hasRemove: l, hasCopy: c, index: u, onCopyIndexClick: d, onDropIndexClick: p, onReorderClick: f, readonly: m, registry: h, uiSchema: g } = e, { CopyButton: y, MoveDownButton: v, MoveUpButton: $, RemoveButton: E } = h.templates.ButtonTemplates, S = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return _.jsxs("div", { className: r, children: [_.jsx("div", { className: o ? "col-xs-9" : "col-xs-12", children: t }), o && _.jsx("div", { className: "col-xs-3 array-item-toolbox", children: _.jsxs("div", { className: "btn-group", style: {
    display: "flex",
    justifyContent: "space-around"
  }, children: [(a || i) && _.jsx($, { style: S, disabled: n || m || !a, onClick: f(u, u - 1), uiSchema: g, registry: h }), (a || i) && _.jsx(v, { style: S, disabled: n || m || !i, onClick: f(u, u + 1), uiSchema: g, registry: h }), c && _.jsx(y, { style: S, disabled: n || m, onClick: d(u), uiSchema: g, registry: h }), l && _.jsx(E, { style: S, disabled: n || m, onClick: p(u), uiSchema: g, registry: h })] }) })] });
}
function X3(e) {
  const { canAdd: t, className: r, disabled: n, idSchema: o, uiSchema: i, items: a, onAddClick: l, readonly: c, registry: u, required: d, schema: p, title: f } = e, m = rt(i), h = Ke("ArrayFieldDescriptionTemplate", u, m), g = Ke("ArrayFieldItemTemplate", u, m), y = Ke("ArrayFieldTitleTemplate", u, m), { ButtonTemplates: { AddButton: v } } = u.templates;
  return _.jsxs("fieldset", { className: r, id: o.$id, children: [_.jsx(y, { idSchema: o, title: m.title || f, required: d, schema: p, uiSchema: i, registry: u }), _.jsx(h, { idSchema: o, description: m.description || p.description, schema: p, uiSchema: i, registry: u }), _.jsx("div", { className: "row array-item-list", children: a && a.map(({ key: $, ...E }) => _.jsx(g, { ...E }, $)) }), t && _.jsx(v, { className: "array-item-add", onClick: l, disabled: n || c, uiSchema: i, registry: u })] });
}
function J3(e) {
  const { idSchema: t, title: r, schema: n, uiSchema: o, required: i, registry: a } = e, l = rt(o, a.globalUiOptions), { label: c = !0 } = l;
  if (!r || !c)
    return null;
  const u = Ke("TitleFieldTemplate", a, l);
  return _.jsx(u, { id: Od(t), title: r, required: i, schema: n, uiSchema: o, registry: a });
}
function Z3(e) {
  const {
    id: t,
    name: r,
    // remove this from ...rest
    value: n,
    readonly: o,
    disabled: i,
    autofocus: a,
    onBlur: l,
    onFocus: c,
    onChange: u,
    onChangeOverride: d,
    options: p,
    schema: f,
    uiSchema: m,
    formContext: h,
    registry: g,
    rawErrors: y,
    type: v,
    hideLabel: $,
    // remove this from ...rest
    hideError: E,
    // remove this from ...rest
    ...S
  } = e;
  if (!t)
    throw console.log("No id for", e), new Error(`no id for props ${JSON.stringify(e)}`);
  const b = {
    ...S,
    ...gb(f, v, p)
  };
  let x;
  b.type === "number" || b.type === "integer" ? x = n || n === 0 ? n : "" : x = n ?? "";
  const w = $t(({ target: { value: k } }) => u(k === "" ? p.emptyValue : k), [u, p]), A = $t(({ target: { value: k } }) => l(t, k), [l, t]), M = $t(({ target: { value: k } }) => c(t, k), [c, t]);
  return _.jsxs(_.Fragment, { children: [_.jsx("input", { id: t, name: t, className: "form-control", readOnly: o, disabled: i, autoFocus: a, value: x, ...b, list: f.examples ? es(t) : void 0, onChange: d || w, onBlur: A, onFocus: M, "aria-describedby": or(t, !!f.examples) }), Array.isArray(f.examples) && _.jsx("datalist", { id: es(t), children: f.examples.concat(f.default && !f.examples.includes(f.default) ? [f.default] : []).map((k) => _.jsx("option", { value: k }, k)) }, `datalist_${t}`)] });
}
function Q3({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = vb(e);
  return r ? null : _.jsx("div", { children: _.jsx("button", { type: "submit", ...n, className: `btn btn-info ${n.className || ""}`, children: t }) });
}
function bs(e) {
  const { iconType: t = "default", icon: r, className: n, uiSchema: o, registry: i, ...a } = e;
  return _.jsx("button", { type: "button", className: `btn btn-${t} ${n}`, ...a, children: _.jsx("i", { className: `glyphicon glyphicon-${r}` }) });
}
function e9(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(bs, { title: t(Ze.CopyButton), className: "array-item-copy", ...e, icon: "copy" });
}
function t9(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(bs, { title: t(Ze.MoveDownButton), className: "array-item-move-down", ...e, icon: "arrow-down" });
}
function r9(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(bs, { title: t(Ze.MoveUpButton), className: "array-item-move-up", ...e, icon: "arrow-up" });
}
function n9(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(bs, { title: t(Ze.RemoveButton), className: "array-item-remove", ...e, iconType: "danger", icon: "remove" });
}
function o9({ className: e, onClick: t, disabled: r, registry: n }) {
  const { translateString: o } = n;
  return _.jsx("div", { className: "row", children: _.jsx("p", { className: `col-xs-3 col-xs-offset-9 text-right ${e}`, children: _.jsx(bs, { iconType: "info", icon: "plus", className: "btn-add col-xs-12", title: o(Ze.AddButton), onClick: t, disabled: r, registry: n }) }) });
}
function i9() {
  return {
    SubmitButton: Q3,
    AddButton: o9,
    CopyButton: e9,
    MoveDownButton: t9,
    MoveUpButton: r9,
    RemoveButton: n9
  };
}
function s9(e) {
  const { id: t, description: r } = e;
  return r ? typeof r == "string" ? _.jsx("p", { id: t, className: "field-description", children: r }) : _.jsx("div", { id: t, className: "field-description", children: r }) : null;
}
function a9({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return _.jsxs("div", { className: "panel panel-danger errors", children: [_.jsx("div", { className: "panel-heading", children: _.jsx("h3", { className: "panel-title", children: r(Ze.ErrorsLabel) }) }), _.jsx("ul", { className: "list-group", children: e.map((n, o) => _.jsx("li", { className: "list-group-item text-danger", children: n.stack }, o)) })] });
}
const l9 = "*";
function Bb(e) {
  const { label: t, required: r, id: n } = e;
  return t ? _.jsxs("label", { className: "control-label", htmlFor: n, children: [t, r && _.jsx("span", { className: "required", children: l9 })] }) : null;
}
function c9(e) {
  const { id: t, label: r, children: n, errors: o, help: i, description: a, hidden: l, required: c, displayLabel: u, registry: d, uiSchema: p } = e, f = rt(p), m = Ke("WrapIfAdditionalTemplate", d, f);
  return l ? _.jsx("div", { className: "hidden", children: n }) : _.jsxs(m, { ...e, children: [u && _.jsx(Bb, { label: r, required: c, id: t }), u && a ? a : null, n, o, i] });
}
function u9(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = wd(r);
  return _.jsx("div", { children: _.jsx("ul", { id: n, className: "error-detail bs-callout bs-callout-info", children: t.filter((o) => !!o).map((o, i) => _.jsx("li", { className: "text-danger", children: o }, i)) }) });
}
function d9(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = Td(t);
  return typeof r == "string" ? _.jsx("p", { id: n, className: "help-block", children: r }) : _.jsx("div", { id: n, className: "help-block", children: r });
}
function f9(e) {
  const { description: t, disabled: r, formData: n, idSchema: o, onAddClick: i, properties: a, readonly: l, registry: c, required: u, schema: d, title: p, uiSchema: f } = e, m = rt(f), h = Ke("TitleFieldTemplate", c, m), g = Ke("DescriptionFieldTemplate", c, m), { ButtonTemplates: { AddButton: y } } = c.templates;
  return _.jsxs("fieldset", { id: o.$id, children: [p && _.jsx(h, { id: Od(o), title: p, required: u, schema: d, uiSchema: f, registry: c }), t && _.jsx(g, { id: to(o), description: t, schema: d, uiSchema: f, registry: c }), a.map((v) => v.content), wg(d, f, n) && _.jsx(y, { className: "object-property-expand", onClick: i(d), disabled: r || l, uiSchema: f, registry: c })] });
}
const p9 = "*";
function m9(e) {
  const { id: t, title: r, required: n } = e;
  return _.jsxs("legend", { id: t, children: [r, n && _.jsx("span", { className: "required", children: p9 })] });
}
function h9(e) {
  const { schema: t, idSchema: r, reason: n, registry: o } = e, { translateString: i } = o;
  let a = Ze.UnsupportedField;
  const l = [];
  return r && r.$id && (a = Ze.UnsupportedFieldWithId, l.push(r.$id)), n && (a = a === Ze.UnsupportedField ? Ze.UnsupportedFieldWithReason : Ze.UnsupportedFieldWithIdAndReason, l.push(n)), _.jsxs("div", { className: "unsupported-field", children: [_.jsx("p", { children: _.jsx(kl, { children: i(a, l) }) }), t && _.jsx("pre", { children: JSON.stringify(t, null, 2) })] });
}
function y9(e) {
  const { id: t, classNames: r, style: n, disabled: o, label: i, onKeyChange: a, onDropPropertyClick: l, readonly: c, required: u, schema: d, children: p, uiSchema: f, registry: m } = e, { templates: h, translateString: g } = m, { RemoveButton: y } = h.ButtonTemplates, v = g(Ze.KeyLabel, [i]);
  return Uo in d ? _.jsx("div", { className: r, style: n, children: _.jsxs("div", { className: "row", children: [_.jsx("div", { className: "col-xs-5 form-additional", children: _.jsxs("div", { className: "form-group", children: [_.jsx(Bb, { label: v, required: u, id: `${t}-key` }), _.jsx("input", { className: "form-control", type: "text", id: `${t}-key`, onBlur: (E) => a(E.target.value), defaultValue: i })] }) }), _.jsx("div", { className: "form-additional form-group col-xs-5", children: p }), _.jsx("div", { className: "col-xs-2", children: _.jsx(y, { className: "array-item-remove btn-block", style: { border: "0" }, disabled: o || c, onClick: l(i), uiSchema: f, registry: m }) })] }) }) : _.jsx("div", { className: r, style: n, children: p });
}
function g9() {
  return {
    ArrayFieldDescriptionTemplate: G3,
    ArrayFieldItemTemplate: Y3,
    ArrayFieldTemplate: X3,
    ArrayFieldTitleTemplate: J3,
    ButtonTemplates: i9(),
    BaseInputTemplate: Z3,
    DescriptionFieldTemplate: s9,
    ErrorListTemplate: a9,
    FieldTemplate: c9,
    FieldErrorTemplate: u9,
    FieldHelpTemplate: d9,
    ObjectFieldTemplate: f9,
    TitleFieldTemplate: m9,
    UnsupportedFieldTemplate: h9,
    WrapIfAdditionalTemplate: y9
  };
}
function v9(e, t) {
  const r = [];
  for (let n = e; n <= t; n++)
    r.push({ value: n, label: fn(n, 2) });
  return r;
}
function b9(e) {
  return Object.values(e).every((t) => t !== -1);
}
function $9(e, t, r = [1900, (/* @__PURE__ */ new Date()).getFullYear() + 2]) {
  const { year: n, month: o, day: i, hour: a, minute: l, second: c } = e, u = [
    {
      type: "year",
      range: r,
      value: n
    },
    { type: "month", range: [1, 12], value: o },
    { type: "day", range: [1, 31], value: i }
  ];
  return t && u.push({ type: "hour", range: [0, 23], value: a }, { type: "minute", range: [0, 59], value: l }, { type: "second", range: [0, 59], value: c }), u;
}
function S9({ type: e, range: t, value: r, select: n, rootId: o, name: i, disabled: a, readonly: l, autofocus: c, registry: u, onBlur: d, onFocus: p }) {
  const f = o + "_" + e, { SelectWidget: m } = u.widgets;
  return _.jsx(m, { schema: { type: "integer" }, id: f, name: i, className: "form-control", options: { enumOptions: v9(t[0], t[1]) }, placeholder: e, value: r, disabled: a, readonly: l, autofocus: c, onChange: (h) => n(e, h), onBlur: d, onFocus: p, registry: u, label: "", "aria-describedby": or(o) });
}
function E9({ time: e = !1, disabled: t = !1, readonly: r = !1, autofocus: n = !1, options: o, id: i, name: a, registry: l, onBlur: c, onFocus: u, onChange: d, value: p }) {
  const { translateString: f } = l, [m, h] = Bo(p), [g, y] = D$((S, b) => ({ ...S, ...b }), vc(p, e));
  Va(() => {
    const S = $h(g, e);
    b9(g) && S !== p ? d(S) : m !== p && (h(p), y(vc(p, e)));
  }, [e, p, d, g, m]);
  const v = $t((S, b) => {
    y({ [S]: b });
  }, []), $ = $t((S) => {
    if (S.preventDefault(), t || r)
      return;
    const b = vc((/* @__PURE__ */ new Date()).toJSON(), e);
    d($h(b, e));
  }, [t, r, e]), E = $t((S) => {
    S.preventDefault(), !(t || r) && d(void 0);
  }, [t, r, d]);
  return _.jsxs("ul", { className: "list-inline", children: [$9(g, e, o.yearsRange).map((S, b) => _.jsx("li", { className: "list-inline-item", children: _.jsx(S9, { rootId: i, name: a, select: v, ...S, disabled: t, readonly: r, registry: l, onBlur: c, onFocus: u, autofocus: n && b === 0 }) }, b)), (o.hideNowButton !== "undefined" ? !o.hideNowButton : !0) && _.jsx("li", { className: "list-inline-item", children: _.jsx("a", { href: "#", className: "btn btn-info btn-now", onClick: $, children: f(Ze.NowLabel) }) }), (o.hideClearButton !== "undefined" ? !o.hideClearButton : !0) && _.jsx("li", { className: "list-inline-item", children: _.jsx("a", { href: "#", className: "btn btn-warning btn-clear", onClick: E, children: f(Ze.ClearLabel) }) })] });
}
function _9({ time: e = !0, ...t }) {
  const { AltDateWidget: r } = t.registry.widgets;
  return _.jsx(r, { time: e, ...t });
}
function x9({ schema: e, uiSchema: t, options: r, id: n, value: o, disabled: i, readonly: a, label: l, hideLabel: c, autofocus: u = !1, onBlur: d, onFocus: p, onChange: f, registry: m }) {
  var h;
  const g = Ke("DescriptionFieldTemplate", m, r), y = To(e), v = $t((b) => f(b.target.checked), [f]), $ = $t((b) => d(n, b.target.checked), [d, n]), E = $t((b) => p(n, b.target.checked), [p, n]), S = (h = r.description) !== null && h !== void 0 ? h : e.description;
  return _.jsxs("div", { className: `checkbox ${i || a ? "disabled" : ""}`, children: [!c && !!S && _.jsx(g, { id: to(n), description: S, schema: e, uiSchema: t, registry: m }), _.jsxs("label", { children: [_.jsx("input", { type: "checkbox", id: n, name: n, checked: typeof o > "u" ? !1 : o, required: y, disabled: i || a, autoFocus: u, onChange: v, onBlur: $, onFocus: E, "aria-describedby": or(n) }), _n(_.jsx("span", { children: l }), c)] })] });
}
function w9({ id: e, disabled: t, options: { inline: r = !1, enumOptions: n, enumDisabled: o, emptyValue: i }, value: a, autofocus: l = !1, readonly: c, onChange: u, onBlur: d, onFocus: p }) {
  const f = Array.isArray(a) ? a : [a], m = $t(({ target: { value: g } }) => d(e, Ft(g, n, i)), [d, e]), h = $t(({ target: { value: g } }) => p(e, Ft(g, n, i)), [p, e]);
  return _.jsx("div", { className: "checkboxes", id: e, children: Array.isArray(n) && n.map((g, y) => {
    const v = Nl(g.value, f), $ = Array.isArray(o) && o.indexOf(g.value) !== -1, E = t || $ || c ? "disabled" : "", S = (x) => {
      x.target.checked ? u(hb(y, f, n)) : u(mb(y, f, n));
    }, b = _.jsxs("span", { children: [_.jsx("input", { type: "checkbox", id: Al(e, y), name: e, checked: v, value: String(y), disabled: t || $ || c, autoFocus: l && y === 0, onChange: S, onBlur: m, onFocus: h, "aria-describedby": or(e) }), _.jsx("span", { children: g.label })] });
    return r ? _.jsx("label", { className: `checkbox-inline ${E}`, children: b }, y) : _.jsx("div", { className: `checkbox ${E}`, children: _.jsx("label", { children: b }) }, y);
  }) });
}
function T9(e) {
  const { disabled: t, readonly: r, options: n, registry: o } = e, i = Ke("BaseInputTemplate", o, n);
  return _.jsx(i, { type: "color", ...e, disabled: t || r });
}
function O9(e) {
  const { onChange: t, options: r, registry: n } = e, o = Ke("BaseInputTemplate", n, r), i = $t((a) => t(a || void 0), [t]);
  return _.jsx(o, { type: "date", ...e, onChange: i });
}
function C9(e) {
  const { onChange: t, value: r, options: n, registry: o } = e, i = Ke("BaseInputTemplate", o, n);
  return _.jsx(i, { type: "datetime-local", ...e, value: d4(r), onChange: (a) => t(JU(a)) });
}
function P9(e) {
  const { options: t, registry: r } = e, n = Ke("BaseInputTemplate", r, t);
  return _.jsx(n, { type: "email", ...e });
}
function R9(e, t) {
  return e === null ? null : e.replace(";base64", `;name=${encodeURIComponent(t)};base64`);
}
function I9(e) {
  const { name: t, size: r, type: n } = e;
  return new Promise((o, i) => {
    const a = new window.FileReader();
    a.onerror = i, a.onload = (l) => {
      var c;
      typeof ((c = l.target) === null || c === void 0 ? void 0 : c.result) == "string" ? o({
        dataURL: R9(l.target.result, t),
        name: t,
        size: r,
        type: n
      }) : o({
        dataURL: null,
        name: t,
        size: r,
        type: n
      });
    }, a.readAsDataURL(e);
  });
}
function N9(e) {
  return Promise.all(Array.from(e).map(I9));
}
function A9({ fileInfo: e, registry: t }) {
  const { translateString: r } = t, { dataURL: n, type: o, name: i } = e;
  return n ? o.indexOf("image") !== -1 ? _.jsx("img", { src: n, style: { maxWidth: "100%" }, className: "file-preview" }) : _.jsxs(_.Fragment, { children: [" ", _.jsx("a", { download: `preview-${i}`, href: n, className: "file-download", children: r(Ze.PreviewLabel) })] }) : null;
}
function j9({ filesInfo: e, registry: t, preview: r }) {
  if (e.length === 0)
    return null;
  const { translateString: n } = t;
  return _.jsx("ul", { className: "file-info", children: e.map((o, i) => {
    const { name: a, size: l, type: c } = o;
    return _.jsxs("li", { children: [_.jsx(kl, { children: n(Ze.FilesInfo, [a, c, String(l)]) }), r && _.jsx(A9, { fileInfo: o, registry: t })] }, i);
  }) });
}
function Ih(e) {
  return e.filter((t) => t).map((t) => {
    const { blob: r, name: n } = BU(t);
    return {
      dataURL: t,
      name: n,
      size: r.size,
      type: r.type
    };
  });
}
function k9(e) {
  const { disabled: t, readonly: r, required: n, multiple: o, onChange: i, value: a, options: l, registry: c } = e, u = Ke("BaseInputTemplate", c, l), [d, p] = Bo(Array.isArray(a) ? Ih(a) : Ih([a])), f = $t((m) => {
    m.target.files && N9(m.target.files).then((h) => {
      const g = h.map((y) => y.dataURL);
      o ? (p(d.concat(h[0])), i(a.concat(g[0]))) : (p(h), i(g[0]));
    });
  }, [o, a, d, i]);
  return _.jsxs("div", { children: [_.jsx(u, { ...e, disabled: t || r, type: "file", required: a ? !1 : n, onChangeOverride: f, value: "", accept: l.accept ? String(l.accept) : void 0 }), _.jsx(j9, { filesInfo: d, registry: c, preview: l.filePreview })] });
}
function M9({ id: e, value: t }) {
  return _.jsx("input", { type: "hidden", id: e, name: e, value: typeof t > "u" ? "" : t });
}
function D9(e) {
  const { options: t, registry: r } = e, n = Ke("BaseInputTemplate", r, t);
  return _.jsx(n, { type: "password", ...e });
}
function F9({ options: e, value: t, required: r, disabled: n, readonly: o, autofocus: i = !1, onBlur: a, onFocus: l, onChange: c, id: u }) {
  const { enumOptions: d, enumDisabled: p, inline: f, emptyValue: m } = e, h = $t(({ target: { value: y } }) => a(u, Ft(y, d, m)), [a, u]), g = $t(({ target: { value: y } }) => l(u, Ft(y, d, m)), [l, u]);
  return _.jsx("div", { className: "field-radio-group", id: u, children: Array.isArray(d) && d.map((y, v) => {
    const $ = Nl(y.value, t), E = Array.isArray(p) && p.indexOf(y.value) !== -1, S = n || E || o ? "disabled" : "", b = () => c(y.value), x = _.jsxs("span", { children: [_.jsx("input", { type: "radio", id: Al(u, v), checked: $, name: u, required: r, value: String(v), disabled: n || E || o, autoFocus: i && v === 0, onChange: b, onBlur: h, onFocus: g, "aria-describedby": or(u) }), _.jsx("span", { children: y.label })] });
    return f ? _.jsx("label", { className: `radio-inline ${S}`, children: x }, v) : _.jsx("div", { className: `radio ${S}`, children: _.jsx("label", { children: x }) }, v);
  }) });
}
function L9(e) {
  const { value: t, registry: { templates: { BaseInputTemplate: r } } } = e;
  return _.jsxs("div", { className: "field-range-wrapper", children: [_.jsx(r, { type: "range", ...e }), _.jsx("span", { className: "range-view", children: t })] });
}
function _c(e, t) {
  return t ? Array.from(e.target.options).slice().filter((r) => r.selected).map((r) => r.value) : e.target.value;
}
function B9({ schema: e, id: t, options: r, value: n, required: o, disabled: i, readonly: a, multiple: l = !1, autofocus: c = !1, onChange: u, onBlur: d, onFocus: p, placeholder: f }) {
  const { enumOptions: m, enumDisabled: h, emptyValue: g } = r, y = l ? [] : "", v = $t((b) => {
    const x = _c(b, l);
    return p(t, Ft(x, m, g));
  }, [p, t, e, l, r]), $ = $t((b) => {
    const x = _c(b, l);
    return d(t, Ft(x, m, g));
  }, [d, t, e, l, r]), E = $t((b) => {
    const x = _c(b, l);
    return u(Ft(x, m, g));
  }, [u, e, l, r]), S = xd(n, m, l);
  return _.jsxs("select", { id: t, name: t, multiple: l, className: "form-control", value: typeof S > "u" ? y : S, required: o, disabled: i || a, autoFocus: c, onBlur: $, onFocus: v, onChange: E, "aria-describedby": or(t), children: [!l && e.default === void 0 && _.jsx("option", { value: "", children: f }), Array.isArray(m) && m.map(({ value: b, label: x }, w) => {
    const A = h && h.indexOf(b) !== -1;
    return _.jsx("option", { value: String(w), disabled: A, children: x }, w);
  })] });
}
function Vb({ id: e, options: t = {}, placeholder: r, value: n, required: o, disabled: i, readonly: a, autofocus: l = !1, onChange: c, onBlur: u, onFocus: d }) {
  const p = $t(({ target: { value: h } }) => c(h === "" ? t.emptyValue : h), [c, t.emptyValue]), f = $t(({ target: { value: h } }) => u(e, h), [u, e]), m = $t(({ target: { value: h } }) => d(e, h), [e, d]);
  return _.jsx("textarea", { id: e, name: e, className: "form-control", value: n || "", placeholder: r, required: o, disabled: i, readOnly: a, autoFocus: l, rows: t.rows, onBlur: f, onFocus: m, onChange: p, "aria-describedby": or(e) });
}
Vb.defaultProps = {
  autofocus: !1,
  options: {}
};
function V9(e) {
  const { options: t, registry: r } = e, n = Ke("BaseInputTemplate", r, t);
  return _.jsx(n, { ...e });
}
function z9(e) {
  const { onChange: t, options: r, registry: n } = e, o = Ke("BaseInputTemplate", n, r), i = $t((a) => t(a ? `${a}:00` : void 0), [t]);
  return _.jsx(o, { type: "time", ...e, onChange: i });
}
function U9(e) {
  const { options: t, registry: r } = e, n = Ke("BaseInputTemplate", r, t);
  return _.jsx(n, { type: "url", ...e });
}
function W9(e) {
  const { options: t, registry: r } = e, n = Ke("BaseInputTemplate", r, t);
  return _.jsx(n, { type: "number", ...e });
}
function q9() {
  return {
    AltDateWidget: E9,
    AltDateTimeWidget: _9,
    CheckboxWidget: x9,
    CheckboxesWidget: w9,
    ColorWidget: T9,
    DateWidget: O9,
    DateTimeWidget: C9,
    EmailWidget: P9,
    FileWidget: k9,
    HiddenWidget: M9,
    PasswordWidget: D9,
    RadioWidget: F9,
    RangeWidget: L9,
    SelectWidget: B9,
    TextWidget: V9,
    TextareaWidget: Vb,
    TimeWidget: z9,
    UpDownWidget: W9,
    URLWidget: U9
  };
}
function K9() {
  return {
    fields: H3(),
    templates: g9(),
    widgets: q9(),
    rootSchema: {},
    formContext: {},
    translateString: zU
  };
}
class H9 extends os {
  /** Constructs the `Form` from the `props`. Will setup the initial state from the props. It will also call the
   * `onChange` handler if the initially provided `formData` is modified to add missing default values as part of the
   * state construction.
   *
   * @param props - The initial props for the `Form`
   */
  constructor(t) {
    if (super(t), this.getUsedFormData = (r, n) => {
      if (n.length === 0 && typeof r != "object")
        return r;
      const o = O4(r, n);
      return Array.isArray(r) ? Object.keys(o).map((i) => o[i]) : o;
    }, this.getFieldNames = (r, n) => {
      const o = (i, a = [], l = [[]]) => (Object.keys(i).forEach((c) => {
        if (typeof i[c] == "object") {
          const u = l.map((d) => [...d, c]);
          i[c][Fu] && i[c][ea] !== "" ? a.push(i[c][ea]) : o(i[c], a, u);
        } else
          c === ea && i[c] !== "" && l.forEach((u) => {
            const d = Te(n, u);
            (typeof d != "object" || Kn(d)) && a.push(u);
          });
      }), a);
      return o(r);
    }, this.onChange = (r, n, o) => {
      const { extraErrors: i, omitExtraData: a, liveOmit: l, noValidate: c, liveValidate: u, onChange: d } = this.props, { schemaUtils: p, schema: f, retrievedSchema: m } = this.state;
      (Et(r) || Array.isArray(r)) && (r = this.getStateFromProps(this.props, r, m).formData);
      const h = !c && u;
      let g = { formData: r, schema: f }, y = r, v;
      if (a === !0 && l === !0) {
        v = p.retrieveSchema(f, r);
        const $ = p.toPathSchema(v, "", r), E = this.getFieldNames($, r);
        y = this.getUsedFormData(r, E), g = {
          formData: y
        };
      }
      if (h) {
        const $ = this.validate(y, f, p, m);
        let E = $.errors, S = $.errorSchema;
        const b = E, x = S;
        if (i) {
          const w = oa($, i);
          S = w.errorSchema, E = w.errors;
        }
        g = {
          formData: y,
          errors: E,
          errorSchema: S,
          schemaValidationErrors: b,
          schemaValidationErrorSchema: x
        };
      } else if (!c && n) {
        const $ = i ? oi(n, i, "preventDuplicates") : n;
        g = {
          formData: y,
          errorSchema: $,
          errors: ts($)
        };
      }
      v && (g.retrievedSchema = v), this.setState(g, () => d && d({ ...this.state, ...g }, o));
    }, this.reset = () => {
      const { onChange: r } = this.props, i = {
        formData: this.getStateFromProps(this.props, void 0).formData,
        errorSchema: {},
        errors: [],
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      };
      this.setState(i, () => r && r({ ...this.state, ...i }));
    }, this.onBlur = (r, n) => {
      const { onBlur: o } = this.props;
      o && o(r, n);
    }, this.onFocus = (r, n) => {
      const { onFocus: o } = this.props;
      o && o(r, n);
    }, this.onSubmit = (r) => {
      if (r.preventDefault(), r.target !== r.currentTarget)
        return;
      r.persist();
      const { omitExtraData: n, extraErrors: o, noValidate: i, onSubmit: a } = this.props;
      let { formData: l } = this.state;
      const { schema: c, schemaUtils: u } = this.state;
      if (n === !0) {
        const d = u.retrieveSchema(c, l), p = u.toPathSchema(d, "", l), f = this.getFieldNames(p, l);
        l = this.getUsedFormData(l, f);
      }
      if (i || this.validateForm()) {
        const d = o || {}, p = o ? ts(o) : [];
        this.setState({
          formData: l,
          errors: p,
          errorSchema: d,
          schemaValidationErrors: [],
          schemaValidationErrorSchema: {}
        }, () => {
          a && a({ ...this.state, formData: l, status: "submitted" }, r);
        });
      }
    }, !t.validator)
      throw new Error("A validator is required for Form functionality to work");
    this.state = this.getStateFromProps(t, t.formData), this.props.onChange && !mr(this.state.formData, this.props.formData) && this.props.onChange(this.state), this.formElement = F$();
  }
  /**
   * `getSnapshotBeforeUpdate` is a React lifecycle method that is invoked right before the most recently rendered
   * output is committed to the DOM. It enables your component to capture current values (e.g., scroll position) before
   * they are potentially changed.
   *
   * In this case, it checks if the props have changed since the last render. If they have, it computes the next state
   * of the component using `getStateFromProps` method and returns it along with a `shouldUpdate` flag set to `true` IF
   * the `nextState` and `prevState` are different, otherwise `false`. This ensures that we have the most up-to-date
   * state ready to be applied in `componentDidUpdate`.
   *
   * If `formData` hasn't changed, it simply returns an object with `shouldUpdate` set to `false`, indicating that a
   * state update is not necessary.
   *
   * @param prevProps - The previous set of props before the update.
   * @param prevState - The previous state before the update.
   * @returns Either an object containing the next state and a flag indicating that an update should occur, or an object
   *        with a flag indicating that an update is not necessary.
   */
  getSnapshotBeforeUpdate(t, r) {
    if (!mr(this.props, t)) {
      const n = this.getStateFromProps(this.props, this.props.formData, t.schema !== this.props.schema ? void 0 : this.state.retrievedSchema), o = !mr(n, r);
      return { nextState: n, shouldUpdate: o };
    }
    return { shouldUpdate: !1 };
  }
  /**
   * `componentDidUpdate` is a React lifecycle method that is invoked immediately after updating occurs. This method is
   * not called for the initial render.
   *
   * Here, it checks if an update is necessary based on the `shouldUpdate` flag received from `getSnapshotBeforeUpdate`.
   * If an update is required, it applies the next state and, if needed, triggers the `onChange` handler to inform about
   * changes.
   *
   * This method effectively replaces the deprecated `UNSAFE_componentWillReceiveProps`, providing a safer alternative
   * to handle prop changes and state updates.
   *
   * @param _ - The previous set of props.
   * @param prevState - The previous state of the component before the update.
   * @param snapshot - The value returned from `getSnapshotBeforeUpdate`.
   */
  componentDidUpdate(t, r, n) {
    if (n.shouldUpdate) {
      const { nextState: o } = n;
      !mr(o.formData, this.props.formData) && !mr(o.formData, r.formData) && this.props.onChange && this.props.onChange(o), this.setState(o);
    }
  }
  /** Extracts the updated state from the given `props` and `inputFormData`. As part of this process, the
   * `inputFormData` is first processed to add any missing required defaults. After that, the data is run through the
   * validation process IF required by the `props`.
   *
   * @param props - The props passed to the `Form`
   * @param inputFormData - The new or current data for the `Form`
   * @returns - The new state for the `Form`
   */
  getStateFromProps(t, r, n) {
    const o = this.state || {}, i = "schema" in t ? t.schema : this.props.schema, a = ("uiSchema" in t ? t.uiSchema : this.props.uiSchema) || {}, l = typeof r < "u", c = "liveValidate" in t ? t.liveValidate : this.props.liveValidate, u = l && !t.noValidate && c, d = i, p = "experimental_defaultFormStateBehavior" in t ? t.experimental_defaultFormStateBehavior : this.props.experimental_defaultFormStateBehavior;
    let f = o.schemaUtils;
    (!f || f.doesSchemaUtilsDiffer(t.validator, d, p)) && (f = LU(t.validator, d, p));
    const m = f.getDefaultFormState(i, r), h = n ?? f.retrieveSchema(i, m), g = () => t.noValidate ? { errors: [], errorSchema: {} } : t.liveValidate ? {
      errors: o.errors || [],
      errorSchema: o.errorSchema || {}
    } : {
      errors: o.schemaValidationErrors || [],
      errorSchema: o.schemaValidationErrorSchema || {}
    };
    let y, v, $ = o.schemaValidationErrors, E = o.schemaValidationErrorSchema;
    if (u) {
      const x = this.validate(m, i, f, h);
      y = x.errors, v = x.errorSchema, $ = y, E = v;
    } else {
      const x = g();
      y = x.errors, v = x.errorSchema;
    }
    if (t.extraErrors) {
      const x = oa({ errorSchema: v, errors: y }, t.extraErrors);
      v = x.errorSchema, y = x.errors;
    }
    const S = f.toIdSchema(h, a["ui:rootFieldId"], m, t.idPrefix, t.idSeparator);
    return {
      schemaUtils: f,
      schema: i,
      uiSchema: a,
      idSchema: S,
      formData: m,
      edit: l,
      errors: y,
      errorSchema: v,
      schemaValidationErrors: $,
      schemaValidationErrorSchema: E,
      retrievedSchema: h
    };
  }
  /** React lifecycle method that is used to determine whether component should be updated.
   *
   * @param nextProps - The next version of the props
   * @param nextState - The next version of the state
   * @returns - True if the component should be updated, false otherwise
   */
  shouldComponentUpdate(t, r) {
    return e4(this, t, r);
  }
  /** Validates the `formData` against the `schema` using the `altSchemaUtils` (if provided otherwise it uses the
   * `schemaUtils` in the state), returning the results.
   *
   * @param formData - The new form data to validate
   * @param schema - The schema used to validate against
   * @param altSchemaUtils - The alternate schemaUtils to use for validation
   */
  validate(t, r = this.props.schema, n, o) {
    const i = n || this.state.schemaUtils, { customValidate: a, transformErrors: l, uiSchema: c } = this.props, u = o ?? i.retrieveSchema(r, t);
    return i.getValidator().validateFormData(t, u, a, l, c);
  }
  /** Renders any errors contained in the `state` in using the `ErrorList`, if not disabled by `showErrorList`. */
  renderErrors(t) {
    const { errors: r, errorSchema: n, schema: o, uiSchema: i } = this.state, { formContext: a } = this.props, l = rt(i), c = Ke("ErrorListTemplate", t, l);
    return r && r.length ? _.jsx(c, { errors: r, errorSchema: n || {}, schema: o, uiSchema: i, formContext: a, registry: t }) : null;
  }
  /** Returns the registry for the form */
  getRegistry() {
    var t;
    const { translateString: r, uiSchema: n = {} } = this.props, { schemaUtils: o } = this.state, { fields: i, templates: a, widgets: l, formContext: c, translateString: u } = K9();
    return {
      fields: { ...i, ...this.props.fields },
      templates: {
        ...a,
        ...this.props.templates,
        ButtonTemplates: {
          ...a.ButtonTemplates,
          ...(t = this.props.templates) === null || t === void 0 ? void 0 : t.ButtonTemplates
        }
      },
      widgets: { ...l, ...this.props.widgets },
      rootSchema: this.props.schema,
      formContext: this.props.formContext || c,
      schemaUtils: o,
      translateString: r || u,
      globalUiOptions: n[Yw]
    };
  }
  /** Provides a function that can be used to programmatically submit the `Form` */
  submit() {
    this.formElement.current && (this.formElement.current.dispatchEvent(new CustomEvent("submit", {
      cancelable: !0
    })), this.formElement.current.requestSubmit());
  }
  /** Attempts to focus on the field associated with the `error`. Uses the `property` field to compute path of the error
   * field, then, using the `idPrefix` and `idSeparator` converts that path into an id. Then the input element with that
   * id is attempted to be found using the `formElement` ref. If it is located, then it is focused.
   *
   * @param error - The error on which to focus
   */
  focusOnError(t) {
    const { idPrefix: r = "root", idSeparator: n = "_" } = this.props, { property: o } = t, i = bb(o);
    i[0] === "" ? i[0] = r : i.unshift(r);
    const a = i.join(n);
    let l = this.formElement.current.elements[a];
    l || (l = this.formElement.current.querySelector(`input[id^=${a}`)), l && l.length && (l = l[0]), l && l.focus();
  }
  /** Programmatically validate the form. If `onError` is provided, then it will be called with the list of errors the
   * same way as would happen on form submission.
   *
   * @returns - True if the form is valid, false otherwise.
   */
  validateForm() {
    const { extraErrors: t, extraErrorsBlockSubmit: r, focusOnFirstError: n, onError: o } = this.props, { formData: i, errors: a } = this.state, l = this.validate(i);
    let c = l.errors, u = l.errorSchema;
    const d = c, p = u, f = c.length > 0 || t && r;
    if (f) {
      if (t) {
        const m = oa(l, t);
        u = m.errorSchema, c = m.errors;
      }
      n && (typeof n == "function" ? n(c[0]) : this.focusOnError(c[0])), this.setState({
        errors: c,
        errorSchema: u,
        schemaValidationErrors: d,
        schemaValidationErrorSchema: p
      }, () => {
        o ? o(c) : console.error("Form validation failed", c);
      });
    } else
      a.length > 0 && this.setState({
        errors: [],
        errorSchema: {},
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      });
    return !f;
  }
  /** Renders the `Form` fields inside the <form> | `tagName` or `_internalFormWrapper`, rendering any errors if
   * needed along with the submit button or any children of the form.
   */
  render() {
    const { children: t, id: r, idPrefix: n, idSeparator: o, className: i = "", tagName: a, name: l, method: c, target: u, action: d, autoComplete: p, enctype: f, acceptcharset: m, noHtml5Validate: h = !1, disabled: g = !1, readonly: y = !1, formContext: v, showErrorList: $ = "top", _internalFormWrapper: E } = this.props, { schema: S, uiSchema: b, formData: x, errorSchema: w, idSchema: A } = this.state, M = this.getRegistry(), { SchemaField: k } = M.fields, { SubmitButton: H } = M.templates.ButtonTemplates, U = E ? a : void 0, K = E || a || "form";
    let { [Ea]: z = {} } = rt(b);
    g && (z = { ...z, props: { ...z.props, disabled: !0 } });
    const G = { [Di]: { [Ea]: z } };
    return _.jsxs(K, { className: i || "rjsf", id: r, name: l, method: c, target: u, action: d, autoComplete: p, encType: f, acceptCharset: m, noValidate: h, onSubmit: this.onSubmit, as: U, ref: this.formElement, children: [$ === "top" && this.renderErrors(M), _.jsx(k, { name: "", schema: S, uiSchema: b, errorSchema: w, idSchema: A, idPrefix: n, idSeparator: o, formContext: v, formData: x, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, registry: M, disabled: g, readonly: y }), t || _.jsx(H, { uiSchema: G, registry: M }), $ === "bottom" && this.renderErrors(M)] });
  }
}
function G9(e) {
  return gy(({ fields: t, widgets: r, templates: n, ...o }, i) => {
    var a;
    return t = { ...e == null ? void 0 : e.fields, ...t }, r = { ...e == null ? void 0 : e.widgets, ...r }, n = {
      ...e == null ? void 0 : e.templates,
      ...n,
      ButtonTemplates: {
        ...(a = e == null ? void 0 : e.templates) === null || a === void 0 ? void 0 : a.ButtonTemplates,
        ...n == null ? void 0 : n.ButtonTemplates
      }
    }, _.jsx(H9, { ...e, ...o, fields: t, widgets: r, templates: n, ref: i });
  });
}
var Id = {}, zb = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(zb);
var ii = zb.exports, xc = {};
const Y9 = /* @__PURE__ */ L$(Ux);
var Nh;
function si() {
  return Nh || (Nh = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Y9;
  }(xc)), xc;
}
var X9 = ii;
Object.defineProperty(Id, "__esModule", {
  value: !0
});
var Ub = Id.default = void 0, J9 = X9(si()), Z9 = _, Q9 = (0, J9.default)(/* @__PURE__ */ (0, Z9.jsx)("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), "Add");
Ub = Id.default = Q9;
function eW(e) {
  return Fe("MuiIconButton", e);
}
const tW = Le("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]), rW = tW, nW = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"], oW = (e) => {
  const {
    classes: t,
    disabled: r,
    color: n,
    edge: o,
    size: i
  } = e, a = {
    root: ["root", r && "disabled", n !== "default" && `color${xe(n)}`, o && `edge${xe(o)}`, `size${xe(i)}`]
  };
  return ze(a, eW, t);
}, iW = he(Xn, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "default" && t[`color${xe(r.color)}`], r.edge && t[`edge${xe(r.edge)}`], t[`size${xe(r.size)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: e.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  overflow: "visible",
  // Explicitly set the default value to solve a bug on IE11.
  color: (e.vars || e).palette.action.active,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  })
}, !t.disableRipple && {
  "&:hover": {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette.action.active, e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, t.edge === "start" && {
  marginLeft: t.size === "small" ? -3 : -12
}, t.edge === "end" && {
  marginRight: t.size === "small" ? -3 : -12
}), ({
  theme: e,
  ownerState: t
}) => {
  var r;
  const n = (r = (e.vars || e).palette) == null ? void 0 : r[t.color];
  return C({}, t.color === "inherit" && {
    color: "inherit"
  }, t.color !== "inherit" && t.color !== "default" && C({
    color: n == null ? void 0 : n.main
  }, !t.disableRipple && {
    "&:hover": C({}, n && {
      backgroundColor: e.vars ? `rgba(${n.mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(n.main, e.palette.action.hoverOpacity)
    }, {
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    })
  }), t.size === "small" && {
    padding: 5,
    fontSize: e.typography.pxToRem(18)
  }, t.size === "large" && {
    padding: 12,
    fontSize: e.typography.pxToRem(28)
  }, {
    [`&.${rW.disabled}`]: {
      backgroundColor: "transparent",
      color: (e.vars || e).palette.action.disabled
    }
  });
}), Wb = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiIconButton"
  }), {
    edge: o = !1,
    children: i,
    className: a,
    color: l = "default",
    disabled: c = !1,
    disableFocusRipple: u = !1,
    size: d = "medium"
  } = n, p = Ee(n, nW), f = C({}, n, {
    edge: o,
    color: l,
    disabled: c,
    disableFocusRipple: u,
    size: d
  }), m = oW(f);
  return /* @__PURE__ */ _.jsx(iW, C({
    className: Se(m.root, a),
    centerRipple: !0,
    focusRipple: !u,
    disabled: c,
    ref: r,
    ownerState: f
  }, p, {
    children: i
  }));
});
process.env.NODE_ENV !== "production" && (Wb.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The icon to display.
   */
  children: Zr(s.node, (e) => P.Children.toArray(e.children).some((r) => /* @__PURE__ */ P.isValidElement(r) && r.props.onClick) ? new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join(`
`)) : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: s.oneOfType([s.oneOf(["inherit", "default", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: s.oneOf(["end", "start", !1]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["small", "medium", "large"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const qb = Wb;
function sW({ uiSchema: e, registry: t, ...r }) {
  const { translateString: n } = t;
  return _.jsx(qb, { title: n(Ze.AddItemButton), ...r, color: "primary", children: _.jsx(Ub, {}) });
}
const Kb = /* @__PURE__ */ P.createContext();
process.env.NODE_ENV !== "production" && (Kb.displayName = "GridContext");
const Ah = Kb;
function aW(e) {
  return Fe("MuiGrid", e);
}
const lW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cW = ["column-reverse", "column", "row-reverse", "row"], uW = ["nowrap", "wrap-reverse", "wrap"], _i = ["auto", !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], dW = Le("MuiGrid", [
  "root",
  "container",
  "item",
  "zeroMinWidth",
  // spacings
  ...lW.map((e) => `spacing-xs-${e}`),
  // direction values
  ...cW.map((e) => `direction-xs-${e}`),
  // wrap values
  ...uW.map((e) => `wrap-xs-${e}`),
  // grid sizes for all breakpoints
  ..._i.map((e) => `grid-xs-${e}`),
  ..._i.map((e) => `grid-sm-${e}`),
  ..._i.map((e) => `grid-md-${e}`),
  ..._i.map((e) => `grid-lg-${e}`),
  ..._i.map((e) => `grid-xl-${e}`)
]), rs = dW, fW = ["className", "columns", "columnSpacing", "component", "container", "direction", "item", "rowSpacing", "spacing", "wrap", "zeroMinWidth"];
function Oo(e) {
  const t = parseFloat(e);
  return `${t}${String(e).replace(String(t), "") || "px"}`;
}
function pW({
  theme: e,
  ownerState: t
}) {
  let r;
  return e.breakpoints.keys.reduce((n, o) => {
    let i = {};
    if (t[o] && (r = t[o]), !r)
      return n;
    if (r === !0)
      i = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
    else if (r === "auto")
      i = {
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: "none",
        width: "auto"
      };
    else {
      const a = zn({
        values: t.columns,
        breakpoints: e.breakpoints.values
      }), l = typeof a == "object" ? a[o] : a;
      if (l == null)
        return n;
      const c = `${Math.round(r / l * 1e8) / 1e6}%`;
      let u = {};
      if (t.container && t.item && t.columnSpacing !== 0) {
        const d = e.spacing(t.columnSpacing);
        if (d !== "0px") {
          const p = `calc(${c} + ${Oo(d)})`;
          u = {
            flexBasis: p,
            maxWidth: p
          };
        }
      }
      i = C({
        flexBasis: c,
        flexGrow: 0,
        maxWidth: c
      }, u);
    }
    return e.breakpoints.values[o] === 0 ? Object.assign(n, i) : n[e.breakpoints.up(o)] = i, n;
  }, {});
}
function mW({
  theme: e,
  ownerState: t
}) {
  const r = zn({
    values: t.direction,
    breakpoints: e.breakpoints.values
  });
  return tr({
    theme: e
  }, r, (n) => {
    const o = {
      flexDirection: n
    };
    return n.indexOf("column") === 0 && (o[`& > .${rs.item}`] = {
      maxWidth: "none"
    }), o;
  });
}
function Hb({
  breakpoints: e,
  values: t
}) {
  let r = "";
  Object.keys(t).forEach((o) => {
    r === "" && t[o] !== 0 && (r = o);
  });
  const n = Object.keys(e).sort((o, i) => e[o] - e[i]);
  return n.slice(0, n.indexOf(r));
}
function hW({
  theme: e,
  ownerState: t
}) {
  const {
    container: r,
    rowSpacing: n
  } = t;
  let o = {};
  if (r && n !== 0) {
    const i = zn({
      values: n,
      breakpoints: e.breakpoints.values
    });
    let a;
    typeof i == "object" && (a = Hb({
      breakpoints: e.breakpoints.values,
      values: i
    })), o = tr({
      theme: e
    }, i, (l, c) => {
      var u;
      const d = e.spacing(l);
      return d !== "0px" ? {
        marginTop: `-${Oo(d)}`,
        [`& > .${rs.item}`]: {
          paddingTop: Oo(d)
        }
      } : (u = a) != null && u.includes(c) ? {} : {
        marginTop: 0,
        [`& > .${rs.item}`]: {
          paddingTop: 0
        }
      };
    });
  }
  return o;
}
function yW({
  theme: e,
  ownerState: t
}) {
  const {
    container: r,
    columnSpacing: n
  } = t;
  let o = {};
  if (r && n !== 0) {
    const i = zn({
      values: n,
      breakpoints: e.breakpoints.values
    });
    let a;
    typeof i == "object" && (a = Hb({
      breakpoints: e.breakpoints.values,
      values: i
    })), o = tr({
      theme: e
    }, i, (l, c) => {
      var u;
      const d = e.spacing(l);
      return d !== "0px" ? {
        width: `calc(100% + ${Oo(d)})`,
        marginLeft: `-${Oo(d)}`,
        [`& > .${rs.item}`]: {
          paddingLeft: Oo(d)
        }
      } : (u = a) != null && u.includes(c) ? {} : {
        width: "100%",
        marginLeft: 0,
        [`& > .${rs.item}`]: {
          paddingLeft: 0
        }
      };
    });
  }
  return o;
}
function gW(e, t, r = {}) {
  if (!e || e <= 0)
    return [];
  if (typeof e == "string" && !Number.isNaN(Number(e)) || typeof e == "number")
    return [r[`spacing-xs-${String(e)}`]];
  const n = [];
  return t.forEach((o) => {
    const i = e[o];
    Number(i) > 0 && n.push(r[`spacing-${o}-${String(i)}`]);
  }), n;
}
const vW = he("div", {
  name: "MuiGrid",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e, {
      container: n,
      direction: o,
      item: i,
      spacing: a,
      wrap: l,
      zeroMinWidth: c,
      breakpoints: u
    } = r;
    let d = [];
    n && (d = gW(a, u, t));
    const p = [];
    return u.forEach((f) => {
      const m = r[f];
      m && p.push(t[`grid-${f}-${String(m)}`]);
    }), [t.root, n && t.container, i && t.item, c && t.zeroMinWidth, ...d, o !== "row" && t[`direction-xs-${String(o)}`], l !== "wrap" && t[`wrap-xs-${String(l)}`], ...p];
  }
})(({
  ownerState: e
}) => C({
  boxSizing: "border-box"
}, e.container && {
  display: "flex",
  flexWrap: "wrap",
  width: "100%"
}, e.item && {
  margin: 0
  // For instance, it's useful when used with a `figure` element.
}, e.zeroMinWidth && {
  minWidth: 0
}, e.wrap !== "wrap" && {
  flexWrap: e.wrap
}), mW, hW, yW, pW);
function bW(e, t) {
  if (!e || e <= 0)
    return [];
  if (typeof e == "string" && !Number.isNaN(Number(e)) || typeof e == "number")
    return [`spacing-xs-${String(e)}`];
  const r = [];
  return t.forEach((n) => {
    const o = e[n];
    if (Number(o) > 0) {
      const i = `spacing-${n}-${String(o)}`;
      r.push(i);
    }
  }), r;
}
const $W = (e) => {
  const {
    classes: t,
    container: r,
    direction: n,
    item: o,
    spacing: i,
    wrap: a,
    zeroMinWidth: l,
    breakpoints: c
  } = e;
  let u = [];
  r && (u = bW(i, c));
  const d = [];
  c.forEach((f) => {
    const m = e[f];
    m && d.push(`grid-${f}-${String(m)}`);
  });
  const p = {
    root: ["root", r && "container", o && "item", l && "zeroMinWidth", ...u, n !== "row" && `direction-xs-${String(n)}`, a !== "wrap" && `wrap-xs-${String(a)}`, ...d]
  };
  return ze(p, aW, t);
}, Fi = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiGrid"
  }), {
    breakpoints: o
  } = Sn(), i = cl(n), {
    className: a,
    columns: l,
    columnSpacing: c,
    component: u = "div",
    container: d = !1,
    direction: p = "row",
    item: f = !1,
    rowSpacing: m,
    spacing: h = 0,
    wrap: g = "wrap",
    zeroMinWidth: y = !1
  } = i, v = Ee(i, fW), $ = m || h, E = c || h, S = P.useContext(Ah), b = d ? l || 12 : S, x = {}, w = C({}, v);
  o.keys.forEach((k) => {
    v[k] != null && (x[k] = v[k], delete w[k]);
  });
  const A = C({}, i, {
    columns: b,
    container: d,
    direction: p,
    item: f,
    rowSpacing: $,
    columnSpacing: E,
    wrap: g,
    zeroMinWidth: y,
    spacing: h
  }, x, {
    breakpoints: o.keys
  }), M = $W(A);
  return /* @__PURE__ */ _.jsx(Ah.Provider, {
    value: b,
    children: /* @__PURE__ */ _.jsx(vW, C({
      ownerState: A,
      className: Se(M.root, a),
      as: u,
      ref: r
    }, w))
  });
});
process.env.NODE_ENV !== "production" && (Fi.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The number of columns.
   * @default 12
   */
  columns: s.oneOfType([s.arrayOf(s.number), s.number, s.object]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: s.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: s.oneOfType([s.oneOf(["column-reverse", "column", "row-reverse", "row"]), s.arrayOf(s.oneOf(["column-reverse", "column", "row-reverse", "row"])), s.object]),
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item: s.bool,
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg: s.oneOfType([s.oneOf(["auto"]), s.number, s.bool]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: s.oneOfType([s.oneOf(["auto"]), s.number, s.bool]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: s.oneOfType([s.oneOf(["auto"]), s.number, s.bool]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: s.oneOf(["nowrap", "wrap-reverse", "wrap"]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl: s.oneOfType([s.oneOf(["auto"]), s.number, s.bool]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: s.oneOfType([s.oneOf(["auto"]), s.number, s.bool]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth: s.bool
});
if (process.env.NODE_ENV !== "production") {
  const e = Cy("Grid", Fi);
  Fi["propTypes"] = C({}, Fi.propTypes, {
    direction: e("container"),
    lg: e("item"),
    md: e("item"),
    sm: e("item"),
    spacing: e("container"),
    wrap: e("container"),
    xs: e("item"),
    zeroMinWidth: e("item")
  });
}
const lr = Fi;
function SW(e) {
  return Fe("MuiPaper", e);
}
Le("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const EW = ["className", "component", "elevation", "square", "variant"], _W = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, i = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return ze(i, SW, o);
}, xW = he("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], !r.square && t.rounded, r.variant === "elevation" && t[`elevation${r.elevation}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r;
  return C({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && C({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${Pt("#fff", Lp(t.elevation))}, ${Pt("#fff", Lp(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), Gb = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, u = Ee(n, EW), d = C({}, n, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), p = _W(d);
  return process.env.NODE_ENV !== "production" && Sn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ _.jsx(xW, C({
    as: i,
    ownerState: d,
    className: Se(p.root, o),
    ref: r
  }, u));
});
process.env.NODE_ENV !== "production" && (Gb.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Zr(jy, (e) => {
    const {
      elevation: t,
      variant: r
    } = e;
    return t > 0 && r === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: s.oneOfType([s.oneOf(["elevation", "outlined"]), s.string])
});
const Ml = Gb;
function wW(e) {
  const { children: t, disabled: r, hasToolbar: n, hasCopy: o, hasMoveDown: i, hasMoveUp: a, hasRemove: l, index: c, onCopyIndexClick: u, onDropIndexClick: d, onReorderClick: p, readonly: f, uiSchema: m, registry: h } = e, { CopyButton: g, MoveDownButton: y, MoveUpButton: v, RemoveButton: $ } = h.templates.ButtonTemplates, E = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
    minWidth: 0
  };
  return _.jsxs(lr, { container: !0, alignItems: "center", children: [_.jsx(lr, { item: !0, xs: !0, style: { overflow: "auto" }, children: _.jsx(Vr, { mb: 2, children: _.jsx(Ml, { elevation: 2, children: _.jsx(Vr, { p: 2, children: t }) }) }) }), n && _.jsxs(lr, { item: !0, children: [(a || i) && _.jsx(v, { style: E, disabled: r || f || !a, onClick: p(c, c - 1), uiSchema: m, registry: h }), (a || i) && _.jsx(y, { style: E, disabled: r || f || !i, onClick: p(c, c + 1), uiSchema: m, registry: h }), o && _.jsx(g, { style: E, disabled: r || f, onClick: u(c), uiSchema: m, registry: h }), l && _.jsx($, { style: E, disabled: r || f, onClick: d(c), uiSchema: m, registry: h })] })] });
}
function TW(e) {
  const { canAdd: t, disabled: r, idSchema: n, uiSchema: o, items: i, onAddClick: a, readonly: l, registry: c, required: u, schema: d, title: p } = e, f = rt(o), m = Ke("ArrayFieldDescriptionTemplate", c, f), h = Ke("ArrayFieldItemTemplate", c, f), g = Ke("ArrayFieldTitleTemplate", c, f), { ButtonTemplates: { AddButton: y } } = c.templates;
  return _.jsx(Ml, { elevation: 2, children: _.jsxs(Vr, { p: 2, children: [_.jsx(g, { idSchema: n, title: f.title || p, schema: d, uiSchema: o, required: u, registry: c }), _.jsx(m, { idSchema: n, description: f.description || d.description, schema: d, uiSchema: o, registry: c }), i && i.map(({ key: v, ...$ }) => _.jsx(h, { ...$ }, v)), t && _.jsx(lr, { container: !0, justifyContent: "flex-end", children: _.jsx(lr, { item: !0, children: _.jsx(Vr, { mt: 2, children: _.jsx(y, { className: "array-item-add", onClick: a, disabled: r || l, uiSchema: o, registry: c }) }) }) })] }) });
}
function xn({
  props: e,
  states: t,
  muiFormControl: r
}) {
  return t.reduce((n, o) => (n[o] = e[o], r && typeof e[o] > "u" && (n[o] = r[o]), n), {});
}
const Yb = /* @__PURE__ */ P.createContext(void 0);
process.env.NODE_ENV !== "production" && (Yb.displayName = "FormControlContext");
const Nd = Yb;
function on() {
  return P.useContext(Nd);
}
function Xb(e) {
  return /* @__PURE__ */ _.jsx(rg, C({}, e, {
    defaultTheme: dl,
    themeId: ls
  }));
}
process.env.NODE_ENV !== "production" && (Xb.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The styles you want to apply globally.
   */
  styles: s.oneOfType([s.array, s.func, s.number, s.object, s.string, s.bool])
});
function jh(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function Aa(e, t = !1) {
  return e && (jh(e.value) && e.value !== "" || t && jh(e.defaultValue) && e.defaultValue !== "");
}
function OW(e) {
  return e.startAdornment;
}
function CW(e) {
  return Fe("MuiInputBase", e);
}
const PW = Le("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]), Do = PW, RW = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "disableInjectingGlobalStyles", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "slotProps", "slots", "startAdornment", "type", "value"], Dl = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.formControl && t.formControl, r.startAdornment && t.adornedStart, r.endAdornment && t.adornedEnd, r.error && t.error, r.size === "small" && t.sizeSmall, r.multiline && t.multiline, r.color && t[`color${xe(r.color)}`], r.fullWidth && t.fullWidth, r.hiddenLabel && t.hiddenLabel];
}, Fl = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.input, r.size === "small" && t.inputSizeSmall, r.multiline && t.inputMultiline, r.type === "search" && t.inputTypeSearch, r.startAdornment && t.inputAdornedStart, r.endAdornment && t.inputAdornedEnd, r.hiddenLabel && t.inputHiddenLabel];
}, IW = (e) => {
  const {
    classes: t,
    color: r,
    disabled: n,
    error: o,
    endAdornment: i,
    focused: a,
    formControl: l,
    fullWidth: c,
    hiddenLabel: u,
    multiline: d,
    readOnly: p,
    size: f,
    startAdornment: m,
    type: h
  } = e, g = {
    root: ["root", `color${xe(r)}`, n && "disabled", o && "error", c && "fullWidth", a && "focused", l && "formControl", f && f !== "medium" && `size${xe(f)}`, d && "multiline", m && "adornedStart", i && "adornedEnd", u && "hiddenLabel", p && "readOnly"],
    input: ["input", n && "disabled", h === "search" && "inputTypeSearch", d && "inputMultiline", f === "small" && "inputSizeSmall", u && "inputHiddenLabel", m && "inputAdornedStart", i && "inputAdornedEnd", p && "readOnly"]
  };
  return ze(g, CW, t);
}, Ll = he("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: Dl
})(({
  theme: e,
  ownerState: t
}) => C({}, e.typography.body1, {
  color: (e.vars || e).palette.text.primary,
  lineHeight: "1.4375em",
  // 23px
  boxSizing: "border-box",
  // Prevent padding issue with fullWidth.
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${Do.disabled}`]: {
    color: (e.vars || e).palette.text.disabled,
    cursor: "default"
  }
}, t.multiline && C({
  padding: "4px 0 5px"
}, t.size === "small" && {
  paddingTop: 1
}), t.fullWidth && {
  width: "100%"
})), Bl = he("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: Fl
})(({
  theme: e,
  ownerState: t
}) => {
  const r = e.palette.mode === "light", n = C({
    color: "currentColor"
  }, e.vars ? {
    opacity: e.vars.opacity.inputPlaceholder
  } : {
    opacity: r ? 0.42 : 0.5
  }, {
    transition: e.transitions.create("opacity", {
      duration: e.transitions.duration.shorter
    })
  }), o = {
    opacity: "0 !important"
  }, i = e.vars ? {
    opacity: e.vars.opacity.inputPlaceholder
  } : {
    opacity: r ? 0.42 : 0.5
  };
  return C({
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: "transparent",
    display: "block",
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: "100%",
    // Fix IE11 width issue
    animationName: "mui-auto-fill-cancel",
    animationDuration: "10ms",
    "&::-webkit-input-placeholder": n,
    "&::-moz-placeholder": n,
    // Firefox 19+
    "&:-ms-input-placeholder": n,
    // IE11
    "&::-ms-input-placeholder": n,
    // Edge
    "&:focus": {
      outline: 0
    },
    // Reset Firefox invalid required input style
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      // Remove the padding when type=search.
      WebkitAppearance: "none"
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${Do.formControl} &`]: {
      "&::-webkit-input-placeholder": o,
      "&::-moz-placeholder": o,
      // Firefox 19+
      "&:-ms-input-placeholder": o,
      // IE11
      "&::-ms-input-placeholder": o,
      // Edge
      "&:focus::-webkit-input-placeholder": i,
      "&:focus::-moz-placeholder": i,
      // Firefox 19+
      "&:focus:-ms-input-placeholder": i,
      // IE11
      "&:focus::-ms-input-placeholder": i
      // Edge
    },
    [`&.${Do.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: (e.vars || e).palette.text.disabled
      // Fix opacity Safari bug
    },
    "&:-webkit-autofill": {
      animationDuration: "5000s",
      animationName: "mui-auto-fill"
    }
  }, t.size === "small" && {
    paddingTop: 1
  }, t.multiline && {
    height: "auto",
    resize: "none",
    padding: 0,
    paddingTop: 0
  }, t.type === "search" && {
    // Improve type search style.
    MozAppearance: "textfield"
  });
}), NW = /* @__PURE__ */ _.jsx(Xb, {
  styles: {
    "@keyframes mui-auto-fill": {
      from: {
        display: "block"
      }
    },
    "@keyframes mui-auto-fill-cancel": {
      from: {
        display: "block"
      }
    }
  }
}), Jb = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n;
  const o = He({
    props: t,
    name: "MuiInputBase"
  }), {
    "aria-describedby": i,
    autoComplete: a,
    autoFocus: l,
    className: c,
    components: u = {},
    componentsProps: d = {},
    defaultValue: p,
    disabled: f,
    disableInjectingGlobalStyles: m,
    endAdornment: h,
    fullWidth: g = !1,
    id: y,
    inputComponent: v = "input",
    inputProps: $ = {},
    inputRef: E,
    maxRows: S,
    minRows: b,
    multiline: x = !1,
    name: w,
    onBlur: A,
    onChange: M,
    onClick: k,
    onFocus: H,
    onKeyDown: U,
    onKeyUp: K,
    placeholder: z,
    readOnly: G,
    renderSuffix: X,
    rows: J,
    slotProps: Z = {},
    slots: ne = {},
    startAdornment: D,
    type: N = "text",
    value: W
  } = o, F = Ee(o, RW), T = $.value != null ? $.value : W, {
    current: R
  } = P.useRef(T != null), B = P.useRef(), Q = P.useCallback((ge) => {
    process.env.NODE_ENV !== "production" && ge && ge.nodeName !== "INPUT" && !ge.focus && console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join(`
`));
  }, []), Y = Nt(B, E, $.ref, Q), [oe, ie] = P.useState(!1), ce = on();
  process.env.NODE_ENV !== "production" && P.useEffect(() => {
    if (ce)
      return ce.registerEffect();
  }, [ce]);
  const q = xn({
    props: o,
    muiFormControl: ce,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  q.focused = ce ? ce.focused : oe, P.useEffect(() => {
    !ce && f && oe && (ie(!1), A && A());
  }, [ce, f, oe, A]);
  const pe = ce && ce.onFilled, te = ce && ce.onEmpty, fe = P.useCallback((ge) => {
    Aa(ge) ? pe && pe() : te && te();
  }, [pe, te]);
  gr(() => {
    R && fe({
      value: T
    });
  }, [T, fe, R]);
  const Pe = (ge) => {
    if (q.disabled) {
      ge.stopPropagation();
      return;
    }
    H && H(ge), $.onFocus && $.onFocus(ge), ce && ce.onFocus ? ce.onFocus(ge) : ie(!0);
  }, je = (ge) => {
    A && A(ge), $.onBlur && $.onBlur(ge), ce && ce.onBlur ? ce.onBlur(ge) : ie(!1);
  }, Ve = (ge, ...ue) => {
    if (!R) {
      const We = ge.target || B.current;
      if (We == null)
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : vn(1));
      fe({
        value: We.value
      });
    }
    $.onChange && $.onChange(ge, ...ue), M && M(ge, ...ue);
  };
  P.useEffect(() => {
    fe(B.current);
  }, []);
  const st = (ge) => {
    B.current && ge.currentTarget === ge.target && B.current.focus(), k && k(ge);
  };
  let ke = v, De = $;
  x && ke === "input" && (J ? (process.env.NODE_ENV !== "production" && (b || S) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set."), De = C({
    type: void 0,
    minRows: J,
    maxRows: J
  }, De)) : De = C({
    type: void 0,
    maxRows: S,
    minRows: b
  }, De), ke = fg);
  const Qe = (ge) => {
    fe(ge.animationName === "mui-auto-fill-cancel" ? B.current : {
      value: "x"
    });
  };
  P.useEffect(() => {
    ce && ce.setAdornedStart(!!D);
  }, [ce, D]);
  const Ge = C({}, o, {
    color: q.color || "primary",
    disabled: q.disabled,
    endAdornment: h,
    error: q.error,
    focused: q.focused,
    formControl: ce,
    fullWidth: g,
    hiddenLabel: q.hiddenLabel,
    multiline: x,
    size: q.size,
    startAdornment: D,
    type: N
  }), Ue = IW(Ge), le = ne.root || u.Root || Ll, ye = Z.root || d.root || {}, be = ne.input || u.Input || Bl;
  return De = C({}, De, (n = Z.input) != null ? n : d.input), /* @__PURE__ */ _.jsxs(P.Fragment, {
    children: [!m && NW, /* @__PURE__ */ _.jsxs(le, C({}, ye, !Lr(le) && {
      ownerState: C({}, Ge, ye.ownerState)
    }, {
      ref: r,
      onClick: st
    }, F, {
      className: Se(Ue.root, ye.className, c, G && "MuiInputBase-readOnly"),
      children: [D, /* @__PURE__ */ _.jsx(Nd.Provider, {
        value: null,
        children: /* @__PURE__ */ _.jsx(be, C({
          ownerState: Ge,
          "aria-invalid": q.error,
          "aria-describedby": i,
          autoComplete: a,
          autoFocus: l,
          defaultValue: p,
          disabled: q.disabled,
          id: y,
          onAnimationStart: Qe,
          name: w,
          placeholder: z,
          readOnly: G,
          required: q.required,
          rows: J,
          value: T,
          onKeyDown: U,
          onKeyUp: K,
          type: N
        }, De, !Lr(be) && {
          as: ke,
          ownerState: C({}, Ge, De.ownerState)
        }, {
          ref: Y,
          className: Se(Ue.input, De.className, G && "MuiInputBase-readOnly"),
          onBlur: je,
          onChange: Ve,
          onFocus: Pe
        }))
      }), h, X ? X(C({}, q, {
        startAdornment: D
      })) : null]
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Jb.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  "aria-describedby": s.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: s.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: s.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Input: s.elementType,
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    input: s.object,
    root: s.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: s.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: s.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: s.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: s.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: Ua,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: s.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: s.oneOfType([s.number, s.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: s.oneOfType([s.number, s.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: s.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: s.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: s.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * @ignore
   */
  onClick: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: s.func,
  /**
   * @ignore
   */
  onKeyDown: s.func,
  /**
   * @ignore
   */
  onKeyUp: s.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: s.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: s.bool,
  /**
   * @ignore
   */
  renderSuffix: s.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: s.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: s.oneOfType([s.number, s.string]),
  /**
   * The size of the component.
   */
  size: s.oneOfType([s.oneOf(["medium", "small"]), s.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    input: s.object,
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    input: s.elementType,
    root: s.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: s.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: s.any
});
const Ad = Jb;
function AW(e) {
  return Fe("MuiInput", e);
}
const jW = C({}, Do, Le("MuiInput", ["root", "underline", "input"])), xi = jW, kW = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "slotProps", "slots", "type"], MW = (e) => {
  const {
    classes: t,
    disableUnderline: r
  } = e, o = ze({
    root: ["root", !r && "underline"],
    input: ["input"]
  }, AW, t);
  return C({}, t, o);
}, DW = he(Ll, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [...Dl(e, t), !r.disableUnderline && t.underline];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  let n = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return e.vars && (n = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`), C({
    position: "relative"
  }, t.formControl && {
    "label + &": {
      marginTop: 16
    }
  }, !t.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${(e.vars || e).palette[t.color].main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: e.transitions.create("transform", {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&.${xi.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: "scaleX(1) translateX(0)"
    },
    [`&.${xi.error}`]: {
      "&:before, &:after": {
        borderBottomColor: (e.vars || e).palette.error.main
      }
    },
    "&:before": {
      borderBottom: `1px solid ${n}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: e.transitions.create("border-bottom-color", {
        duration: e.transitions.duration.shorter
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&:hover:not(.${xi.disabled}, .${xi.error}):before`]: {
      borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        borderBottom: `1px solid ${n}`
      }
    },
    [`&.${xi.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  });
}), FW = he(Bl, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: Fl
})({}), jd = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a;
  const l = He({
    props: t,
    name: "MuiInput"
  }), {
    disableUnderline: c,
    components: u = {},
    componentsProps: d,
    fullWidth: p = !1,
    inputComponent: f = "input",
    multiline: m = !1,
    slotProps: h,
    slots: g = {},
    type: y = "text"
  } = l, v = Ee(l, kW), $ = MW(l), S = {
    root: {
      ownerState: {
        disableUnderline: c
      }
    }
  }, b = h ?? d ? Ht(h ?? d, S) : S, x = (n = (o = g.root) != null ? o : u.Root) != null ? n : DW, w = (i = (a = g.input) != null ? a : u.Input) != null ? i : FW;
  return /* @__PURE__ */ _.jsx(Ad, C({
    slots: {
      root: x,
      input: w
    },
    slotProps: b,
    fullWidth: p,
    inputComponent: f,
    multiline: m,
    ref: r,
    type: y
  }, v, {
    classes: $
  }));
});
process.env.NODE_ENV !== "production" && (jd.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: s.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: s.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary"]), s.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Input: s.elementType,
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    input: s.object,
    root: s.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: s.bool,
  /**
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline: s.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: s.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: s.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: s.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: s.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: s.oneOfType([s.number, s.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: s.oneOfType([s.number, s.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: s.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: s.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: s.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: s.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: s.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: s.oneOfType([s.number, s.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    input: s.object,
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    input: s.elementType,
    root: s.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: s.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: s.any
});
jd.muiName = "Input";
const Zb = jd;
function LW(e) {
  return Fe("MuiFilledInput", e);
}
const BW = C({}, Do, Le("MuiFilledInput", ["root", "underline", "input"])), In = BW, VW = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "slotProps", "slots", "type"], zW = (e) => {
  const {
    classes: t,
    disableUnderline: r
  } = e, o = ze({
    root: ["root", !r && "underline"],
    input: ["input"]
  }, LW, t);
  return C({}, t, o);
}, UW = he(Ll, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [...Dl(e, t), !r.disableUnderline && t.underline];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r;
  const n = e.palette.mode === "light", o = n ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)", i = n ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)", a = n ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)", l = n ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return C({
    position: "relative",
    backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i,
    borderTopLeftRadius: (e.vars || e).shape.borderRadius,
    borderTopRightRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create("background-color", {
      duration: e.transitions.duration.shorter,
      easing: e.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : a,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i
      }
    },
    [`&.${In.focused}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i
    },
    [`&.${In.disabled}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : l
    }
  }, !t.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${(r = (e.vars || e).palette[t.color || "primary"]) == null ? void 0 : r.main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: e.transitions.create("transform", {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&.${In.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: "scaleX(1) translateX(0)"
    },
    [`&.${In.error}`]: {
      "&:before, &:after": {
        borderBottomColor: (e.vars || e).palette.error.main
      }
    },
    "&:before": {
      borderBottom: `1px solid ${e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})` : o}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: e.transitions.create("border-bottom-color", {
        duration: e.transitions.duration.shorter
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&:hover:not(.${In.disabled}, .${In.error}):before`]: {
      borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`
    },
    [`&.${In.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  }, t.startAdornment && {
    paddingLeft: 12
  }, t.endAdornment && {
    paddingRight: 12
  }, t.multiline && C({
    padding: "25px 12px 8px"
  }, t.size === "small" && {
    paddingTop: 21,
    paddingBottom: 4
  }, t.hiddenLabel && {
    paddingTop: 16,
    paddingBottom: 17
  }, t.hiddenLabel && t.size === "small" && {
    paddingTop: 8,
    paddingBottom: 9
  }));
}), WW = he(Bl, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: Fl
})(({
  theme: e,
  ownerState: t
}) => C({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12
}, !e.vars && {
  "&:-webkit-autofill": {
    WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
    caretColor: e.palette.mode === "light" ? null : "#fff",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  }
}, e.vars && {
  "&:-webkit-autofill": {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  },
  [e.getColorSchemeSelector("dark")]: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    }
  }
}, t.size === "small" && {
  paddingTop: 21,
  paddingBottom: 4
}, t.hiddenLabel && {
  paddingTop: 16,
  paddingBottom: 17
}, t.startAdornment && {
  paddingLeft: 0
}, t.endAdornment && {
  paddingRight: 0
}, t.hiddenLabel && t.size === "small" && {
  paddingTop: 8,
  paddingBottom: 9
}, t.multiline && {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
})), kd = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a;
  const l = He({
    props: t,
    name: "MuiFilledInput"
  }), {
    components: c = {},
    componentsProps: u,
    fullWidth: d = !1,
    // declare here to prevent spreading to DOM
    inputComponent: p = "input",
    multiline: f = !1,
    slotProps: m,
    slots: h = {},
    type: g = "text"
  } = l, y = Ee(l, VW), v = C({}, l, {
    fullWidth: d,
    inputComponent: p,
    multiline: f,
    type: g
  }), $ = zW(l), E = {
    root: {
      ownerState: v
    },
    input: {
      ownerState: v
    }
  }, S = m ?? u ? Ht(E, m ?? u) : E, b = (n = (o = h.root) != null ? o : c.Root) != null ? n : UW, x = (i = (a = h.input) != null ? a : c.Input) != null ? i : WW;
  return /* @__PURE__ */ _.jsx(Ad, C({
    slots: {
      root: b,
      input: x
    },
    componentsProps: S,
    fullWidth: d,
    inputComponent: p,
    multiline: f,
    ref: r,
    type: g
  }, y, {
    classes: $
  }));
});
process.env.NODE_ENV !== "production" && (kd.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: s.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: s.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary"]), s.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Input: s.elementType,
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    input: s.object,
    root: s.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: s.bool,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: s.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: s.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: s.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: s.bool,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: s.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: s.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: s.oneOfType([s.number, s.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: s.oneOfType([s.number, s.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: s.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: s.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: s.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: s.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: s.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: s.oneOfType([s.number, s.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    input: s.object,
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    input: s.elementType,
    root: s.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: s.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: s.any
});
kd.muiName = "Input";
const Qb = kd;
var kh;
const qW = ["children", "classes", "className", "label", "notched"], KW = he("fieldset", {
  shouldForwardProp: Gt
})({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
}), HW = he("legend", {
  shouldForwardProp: Gt
})(({
  ownerState: e,
  theme: t
}) => C({
  float: "unset",
  // Fix conflict with bootstrap
  width: "auto",
  // Fix conflict with bootstrap
  overflow: "hidden"
}, !e.withLabel && {
  padding: 0,
  lineHeight: "11px",
  // sync with `height` in `legend` styles
  transition: t.transitions.create("width", {
    duration: 150,
    easing: t.transitions.easing.easeOut
  })
}, e.withLabel && C({
  display: "block",
  // Fix conflict with normalize.css and sanitize.css
  padding: 0,
  height: 11,
  // sync with `lineHeight` in `legend` styles
  fontSize: "0.75em",
  visibility: "hidden",
  maxWidth: 0.01,
  transition: t.transitions.create("max-width", {
    duration: 50,
    easing: t.transitions.easing.easeOut
  }),
  whiteSpace: "nowrap",
  "& > span": {
    paddingLeft: 5,
    paddingRight: 5,
    display: "inline-block",
    opacity: 0,
    visibility: "visible"
  }
}, e.notched && {
  maxWidth: "100%",
  transition: t.transitions.create("max-width", {
    duration: 100,
    easing: t.transitions.easing.easeOut,
    delay: 50
  })
})));
function e0(e) {
  const {
    className: t,
    label: r,
    notched: n
  } = e, o = Ee(e, qW), i = r != null && r !== "", a = C({}, e, {
    notched: n,
    withLabel: i
  });
  return /* @__PURE__ */ _.jsx(KW, C({
    "aria-hidden": !0,
    className: t,
    ownerState: a
  }, o, {
    children: /* @__PURE__ */ _.jsx(HW, {
      ownerState: a,
      children: i ? /* @__PURE__ */ _.jsx("span", {
        children: r
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        kh || (kh = /* @__PURE__ */ _.jsx("span", {
          className: "notranslate",
          children: "​"
        }))
      )
    })
  }));
}
process.env.NODE_ENV !== "production" && (e0.propTypes = {
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The label.
   */
  label: s.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: s.bool.isRequired,
  /**
   * @ignore
   */
  style: s.object
});
function GW(e) {
  return Fe("MuiOutlinedInput", e);
}
const YW = C({}, Do, Le("MuiOutlinedInput", ["root", "notchedOutline", "input"])), ln = YW, XW = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "slots", "type"], JW = (e) => {
  const {
    classes: t
  } = e, n = ze({
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  }, GW, t);
  return C({}, t, n);
}, ZW = he(Ll, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: Dl
})(({
  theme: e,
  ownerState: t
}) => {
  const r = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return C({
    position: "relative",
    borderRadius: (e.vars || e).shape.borderRadius,
    [`&:hover .${ln.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${ln.notchedOutline}`]: {
        borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : r
      }
    },
    [`&.${ln.focused} .${ln.notchedOutline}`]: {
      borderColor: (e.vars || e).palette[t.color].main,
      borderWidth: 2
    },
    [`&.${ln.error} .${ln.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.error.main
    },
    [`&.${ln.disabled} .${ln.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.action.disabled
    }
  }, t.startAdornment && {
    paddingLeft: 14
  }, t.endAdornment && {
    paddingRight: 14
  }, t.multiline && C({
    padding: "16.5px 14px"
  }, t.size === "small" && {
    padding: "8.5px 14px"
  }));
}), QW = he(e0, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (e, t) => t.notchedOutline
})(({
  theme: e
}) => {
  const t = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : t
  };
}), eq = he(Bl, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: Fl
})(({
  theme: e,
  ownerState: t
}) => C({
  padding: "16.5px 14px"
}, !e.vars && {
  "&:-webkit-autofill": {
    WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
    caretColor: e.palette.mode === "light" ? null : "#fff",
    borderRadius: "inherit"
  }
}, e.vars && {
  "&:-webkit-autofill": {
    borderRadius: "inherit"
  },
  [e.getColorSchemeSelector("dark")]: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    }
  }
}, t.size === "small" && {
  padding: "8.5px 14px"
}, t.multiline && {
  padding: 0
}, t.startAdornment && {
  paddingLeft: 0
}, t.endAdornment && {
  paddingRight: 0
})), Md = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a, l;
  const c = He({
    props: t,
    name: "MuiOutlinedInput"
  }), {
    components: u = {},
    fullWidth: d = !1,
    inputComponent: p = "input",
    label: f,
    multiline: m = !1,
    notched: h,
    slots: g = {},
    type: y = "text"
  } = c, v = Ee(c, XW), $ = JW(c), E = on(), S = xn({
    props: c,
    muiFormControl: E,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  }), b = C({}, c, {
    color: S.color || "primary",
    disabled: S.disabled,
    error: S.error,
    focused: S.focused,
    formControl: E,
    fullWidth: d,
    hiddenLabel: S.hiddenLabel,
    multiline: m,
    size: S.size,
    type: y
  }), x = (n = (o = g.root) != null ? o : u.Root) != null ? n : ZW, w = (i = (a = g.input) != null ? a : u.Input) != null ? i : eq;
  return /* @__PURE__ */ _.jsx(Ad, C({
    slots: {
      root: x,
      input: w
    },
    renderSuffix: (A) => /* @__PURE__ */ _.jsx(QW, {
      ownerState: b,
      className: $.notchedOutline,
      label: f != null && f !== "" && S.required ? l || (l = /* @__PURE__ */ _.jsxs(P.Fragment, {
        children: [f, " ", "*"]
      })) : f,
      notched: typeof h < "u" ? h : !!(A.startAdornment || A.filled || A.focused)
    }),
    fullWidth: d,
    inputComponent: p,
    multiline: m,
    ref: r,
    type: y
  }, v, {
    classes: C({}, $, {
      notchedOutline: null
    })
  }));
});
process.env.NODE_ENV !== "production" && (Md.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: s.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: s.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary"]), s.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Input: s.elementType,
    Root: s.elementType
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: s.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: s.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: s.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: s.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label: s.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: s.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: s.oneOfType([s.number, s.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: s.oneOfType([s.number, s.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: s.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: s.string,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: s.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: s.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: s.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: s.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: s.oneOfType([s.number, s.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    input: s.elementType,
    root: s.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: s.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: s.any
});
Md.muiName = "Input";
const t0 = Md;
function tq(e) {
  return Fe("MuiFormLabel", e);
}
const rq = Le("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]), Li = rq, nq = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"], oq = (e) => {
  const {
    classes: t,
    color: r,
    focused: n,
    disabled: o,
    error: i,
    filled: a,
    required: l
  } = e, c = {
    root: ["root", `color${xe(r)}`, o && "disabled", i && "error", a && "filled", n && "focused", l && "required"],
    asterisk: ["asterisk", i && "error"]
  };
  return ze(c, tq, t);
}, iq = he("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: ({
    ownerState: e
  }, t) => C({}, t.root, e.color === "secondary" && t.colorSecondary, e.filled && t.filled)
})(({
  theme: e,
  ownerState: t
}) => C({
  color: (e.vars || e).palette.text.secondary
}, e.typography.body1, {
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  [`&.${Li.focused}`]: {
    color: (e.vars || e).palette[t.color].main
  },
  [`&.${Li.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${Li.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), sq = he("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (e, t) => t.asterisk
})(({
  theme: e
}) => ({
  [`&.${Li.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), r0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiFormLabel"
  }), {
    children: o,
    className: i,
    component: a = "label"
  } = n, l = Ee(n, nq), c = on(), u = xn({
    props: n,
    muiFormControl: c,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  }), d = C({}, n, {
    color: u.color || "primary",
    component: a,
    disabled: u.disabled,
    error: u.error,
    filled: u.filled,
    focused: u.focused,
    required: u.required
  }), p = oq(d);
  return /* @__PURE__ */ _.jsxs(iq, C({
    as: a,
    ownerState: d,
    className: Se(p.root, i),
    ref: r
  }, l, {
    children: [o, u.required && /* @__PURE__ */ _.jsxs(sq, {
      ownerState: d,
      "aria-hidden": !0,
      className: p.asterisk,
      children: [" ", "*"]
    })]
  }));
});
process.env.NODE_ENV !== "production" && (r0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: s.oneOfType([s.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: s.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: s.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: s.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: s.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Vl = r0;
function aq(e) {
  return Fe("MuiInputLabel", e);
}
Le("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
const lq = ["disableAnimation", "margin", "shrink", "variant", "className"], cq = (e) => {
  const {
    classes: t,
    formControl: r,
    size: n,
    shrink: o,
    disableAnimation: i,
    variant: a,
    required: l
  } = e, c = {
    root: ["root", r && "formControl", !i && "animated", o && "shrink", n && n !== "normal" && `size${xe(n)}`, a],
    asterisk: [l && "asterisk"]
  }, u = ze(c, aq, t);
  return C({}, t, u);
}, uq = he(Vl, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [{
      [`& .${Li.asterisk}`]: t.asterisk
    }, t.root, r.formControl && t.formControl, r.size === "small" && t.sizeSmall, r.shrink && t.shrink, !r.disableAnimation && t.animated, r.focused && t.focused, t[r.variant]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%"
}, t.formControl && {
  position: "absolute",
  left: 0,
  top: 0,
  // slight alteration to spec spacing to match visual spec result
  transform: "translate(0, 20px) scale(1)"
}, t.size === "small" && {
  // Compensation for the `Input.inputSizeSmall` style.
  transform: "translate(0, 17px) scale(1)"
}, t.shrink && {
  transform: "translate(0, -1.5px) scale(0.75)",
  transformOrigin: "top left",
  maxWidth: "133%"
}, !t.disableAnimation && {
  transition: e.transitions.create(["color", "transform", "max-width"], {
    duration: e.transitions.duration.shorter,
    easing: e.transitions.easing.easeOut
  })
}, t.variant === "filled" && C({
  // Chrome's autofill feature gives the input field a yellow background.
  // Since the input field is behind the label in the HTML tree,
  // the input field is drawn last and hides the label with an opaque background color.
  // zIndex: 1 will raise the label above opaque background-colors of input.
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(12px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, t.size === "small" && {
  transform: "translate(12px, 13px) scale(1)"
}, t.shrink && C({
  userSelect: "none",
  pointerEvents: "auto",
  transform: "translate(12px, 7px) scale(0.75)",
  maxWidth: "calc(133% - 24px)"
}, t.size === "small" && {
  transform: "translate(12px, 4px) scale(0.75)"
})), t.variant === "outlined" && C({
  // see comment above on filled.zIndex
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(14px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, t.size === "small" && {
  transform: "translate(14px, 9px) scale(1)"
}, t.shrink && {
  userSelect: "none",
  pointerEvents: "auto",
  // Theoretically, we should have (8+5)*2/0.75 = 34px
  // but it feels a better when it bleeds a bit on the left, so 32px.
  maxWidth: "calc(133% - 32px)",
  transform: "translate(14px, -9px) scale(0.75)"
}), t.variant === "standard" && {
  "&:not(label) + div": {
    marginTop: 16
  }
})), n0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    name: "MuiInputLabel",
    props: t
  }), {
    disableAnimation: o = !1,
    shrink: i,
    className: a
  } = n, l = Ee(n, lq), c = on();
  let u = i;
  typeof u > "u" && c && (u = c.filled || c.focused || c.adornedStart);
  const d = xn({
    props: n,
    muiFormControl: c,
    states: ["size", "variant", "required", "focused"]
  }), p = C({}, n, {
    disableAnimation: o,
    formControl: c,
    shrink: u,
    size: d.size,
    variant: d.variant,
    required: d.required,
    focused: d.focused
  }), f = cq(p);
  return /* @__PURE__ */ _.jsx(uq, C({
    "data-shrink": u,
    ownerState: p,
    ref: r,
    className: Se(f.root, a)
  }, l, {
    classes: f
  }));
});
process.env.NODE_ENV !== "production" && (n0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: s.oneOfType([s.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), s.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: s.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: s.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: s.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: s.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: s.oneOf(["dense"]),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: s.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: s.bool,
  /**
   * The size of the component.
   * @default 'normal'
   */
  size: s.oneOfType([s.oneOf(["normal", "small"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   */
  variant: s.oneOf(["filled", "outlined", "standard"])
});
const dq = n0;
function fq(e) {
  return Fe("MuiFormControl", e);
}
Le("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const pq = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"], mq = (e) => {
  const {
    classes: t,
    margin: r,
    fullWidth: n
  } = e, o = {
    root: ["root", r !== "none" && `margin${xe(r)}`, n && "fullWidth"]
  };
  return ze(o, fq, t);
}, hq = he("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: ({
    ownerState: e
  }, t) => C({}, t.root, t[`margin${xe(e.margin)}`], e.fullWidth && t.fullWidth)
})(({
  ownerState: e
}) => C({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top"
}, e.margin === "normal" && {
  marginTop: 16,
  marginBottom: 8
}, e.margin === "dense" && {
  marginTop: 8,
  marginBottom: 4
}, e.fullWidth && {
  width: "100%"
})), o0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiFormControl"
  }), {
    children: o,
    className: i,
    color: a = "primary",
    component: l = "div",
    disabled: c = !1,
    error: u = !1,
    focused: d,
    fullWidth: p = !1,
    hiddenLabel: f = !1,
    margin: m = "none",
    required: h = !1,
    size: g = "medium",
    variant: y = "outlined"
  } = n, v = Ee(n, pq), $ = C({}, n, {
    color: a,
    component: l,
    disabled: c,
    error: u,
    fullWidth: p,
    hiddenLabel: f,
    margin: m,
    required: h,
    size: g,
    variant: y
  }), E = mq($), [S, b] = P.useState(() => {
    let K = !1;
    return o && P.Children.forEach(o, (z) => {
      if (!Eo(z, ["Input", "Select"]))
        return;
      const G = Eo(z, ["Select"]) ? z.props.input : z;
      G && OW(G.props) && (K = !0);
    }), K;
  }), [x, w] = P.useState(() => {
    let K = !1;
    return o && P.Children.forEach(o, (z) => {
      Eo(z, ["Input", "Select"]) && (Aa(z.props, !0) || Aa(z.props.inputProps, !0)) && (K = !0);
    }), K;
  }), [A, M] = P.useState(!1);
  c && A && M(!1);
  const k = d !== void 0 && !c ? d : A;
  let H;
  if (process.env.NODE_ENV !== "production") {
    const K = P.useRef(!1);
    H = () => (K.current && console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join(`
`)), K.current = !0, () => {
      K.current = !1;
    });
  }
  const U = P.useMemo(() => ({
    adornedStart: S,
    setAdornedStart: b,
    color: a,
    disabled: c,
    error: u,
    filled: x,
    focused: k,
    fullWidth: p,
    hiddenLabel: f,
    size: g,
    onBlur: () => {
      M(!1);
    },
    onEmpty: () => {
      w(!1);
    },
    onFilled: () => {
      w(!0);
    },
    onFocus: () => {
      M(!0);
    },
    registerEffect: H,
    required: h,
    variant: y
  }), [S, a, c, u, x, k, p, f, H, h, g, y]);
  return /* @__PURE__ */ _.jsx(Nd.Provider, {
    value: U,
    children: /* @__PURE__ */ _.jsx(hq, C({
      as: l,
      ownerState: $,
      className: Se(E.root, i),
      ref: r
    }, v, {
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (o0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: s.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: s.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: s.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: s.oneOf(["dense", "none", "normal"]),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: s.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["medium", "small"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: s.oneOf(["filled", "outlined", "standard"])
});
const i0 = o0;
function yq(e) {
  return Fe("MuiFormHelperText", e);
}
const gq = Le("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]), Mh = gq;
var Dh;
const vq = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"], bq = (e) => {
  const {
    classes: t,
    contained: r,
    size: n,
    disabled: o,
    error: i,
    filled: a,
    focused: l,
    required: c
  } = e, u = {
    root: ["root", o && "disabled", i && "error", n && `size${xe(n)}`, r && "contained", l && "focused", a && "filled", c && "required"]
  };
  return ze(u, yq, t);
}, $q = he("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.size && t[`size${xe(r.size)}`], r.contained && t.contained, r.filled && t.filled];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  color: (e.vars || e).palette.text.secondary
}, e.typography.caption, {
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${Mh.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${Mh.error}`]: {
    color: (e.vars || e).palette.error.main
  }
}, t.size === "small" && {
  marginTop: 4
}, t.contained && {
  marginLeft: 14,
  marginRight: 14
})), s0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiFormHelperText"
  }), {
    children: o,
    className: i,
    component: a = "p"
  } = n, l = Ee(n, vq), c = on(), u = xn({
    props: n,
    muiFormControl: c,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  }), d = C({}, n, {
    component: a,
    contained: u.variant === "filled" || u.variant === "outlined",
    variant: u.variant,
    size: u.size,
    disabled: u.disabled,
    error: u.error,
    filled: u.filled,
    focused: u.focused,
    required: u.required
  }), p = bq(d);
  return /* @__PURE__ */ _.jsx($q, C({
    as: a,
    ownerState: d,
    className: Se(p.root, i),
    ref: r
  }, l, {
    children: o === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      Dh || (Dh = /* @__PURE__ */ _.jsx("span", {
        className: "notranslate",
        children: "​"
      }))
    ) : o
  }));
});
process.env.NODE_ENV !== "production" && (s0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: s.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: s.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: s.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: s.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: s.oneOf(["dense"]),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   */
  variant: s.oneOfType([s.oneOf(["filled", "outlined", "standard"]), s.string])
});
const Dd = s0, a0 = /* @__PURE__ */ P.createContext({});
process.env.NODE_ENV !== "production" && (a0.displayName = "ListContext");
const Yr = a0;
function Sq(e) {
  return Fe("MuiList", e);
}
Le("MuiList", ["root", "padding", "dense", "subheader"]);
const Eq = ["children", "className", "component", "dense", "disablePadding", "subheader"], _q = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return ze({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, Sq, t);
}, xq = he("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.disablePadding && t.padding, r.dense && t.dense, r.subheader && t.subheader];
  }
})(({
  ownerState: e
}) => C({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), l0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = n, d = Ee(n, Eq), p = P.useMemo(() => ({
    dense: l
  }), [l]), f = C({}, n, {
    component: a,
    dense: l,
    disablePadding: c
  }), m = _q(f);
  return /* @__PURE__ */ _.jsx(Yr.Provider, {
    value: p,
    children: /* @__PURE__ */ _.jsxs(xq, C({
      as: a,
      className: Se(m.root, i),
      ref: r,
      ownerState: f
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (l0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: s.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Fd = l0, wq = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function wc(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function Fh(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function c0(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function wi(e, t, r, n, o, i) {
  let a = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !c0(l, i) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const u0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: a,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: d,
    variant: p = "selectedMenu"
  } = t, f = Ee(t, wq), m = P.useRef(null), h = P.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  gr(() => {
    o && m.current.focus();
  }, [o]), P.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (E, S) => {
      const b = !m.current.style.width;
      if (E.clientHeight < m.current.clientHeight && b) {
        const x = `${Ry(jt(E))}px`;
        m.current.style[S.direction === "rtl" ? "paddingLeft" : "paddingRight"] = x, m.current.style.width = `calc(100% + ${x})`;
      }
      return m.current;
    }
  }), []);
  const g = (E) => {
    const S = m.current, b = E.key, x = jt(S).activeElement;
    if (b === "ArrowDown")
      E.preventDefault(), wi(S, x, u, c, wc);
    else if (b === "ArrowUp")
      E.preventDefault(), wi(S, x, u, c, Fh);
    else if (b === "Home")
      E.preventDefault(), wi(S, null, u, c, wc);
    else if (b === "End")
      E.preventDefault(), wi(S, null, u, c, Fh);
    else if (b.length === 1) {
      const w = h.current, A = b.toLowerCase(), M = performance.now();
      w.keys.length > 0 && (M - w.lastTime > 500 ? (w.keys = [], w.repeating = !0, w.previousKeyMatched = !0) : w.repeating && A !== w.keys[0] && (w.repeating = !1)), w.lastTime = M, w.keys.push(A);
      const k = x && !w.repeating && c0(x, w);
      w.previousKeyMatched && (k || wi(S, x, !1, c, wc, w)) ? E.preventDefault() : w.previousKeyMatched = !1;
    }
    d && d(E);
  }, y = Nt(m, r);
  let v = -1;
  P.Children.forEach(a, (E, S) => {
    if (!/* @__PURE__ */ P.isValidElement(E)) {
      v === S && (v += 1, v >= a.length && (v = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Un.isFragment(E) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), E.props.disabled || (p === "selectedMenu" && E.props.selected || v === -1) && (v = S), v === S && (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) && (v += 1, v >= a.length && (v = -1));
  });
  const $ = P.Children.map(a, (E, S) => {
    if (S === v) {
      const b = {};
      return i && (b.autoFocus = !0), E.props.tabIndex === void 0 && p === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ P.cloneElement(E, b);
    }
    return E;
  });
  return /* @__PURE__ */ _.jsx(Fd, C({
    role: "menu",
    ref: y,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, f, {
    children: $
  }));
});
process.env.NODE_ENV !== "production" && (u0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: s.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: s.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: s.node,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: s.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: s.bool,
  /**
   * @ignore
   */
  onKeyDown: s.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const Tq = u0, d0 = (e) => e.scrollTop;
function ja(e, t) {
  var r, n;
  const {
    timeout: o,
    easing: i,
    style: a = {}
  } = e;
  return {
    duration: (r = a.transitionDuration) != null ? r : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (n = a.transitionTimingFunction) != null ? n : typeof i == "object" ? i[t.mode] : i,
    delay: a.transitionDelay
  };
}
const Oq = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function au(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Cq = {
  entering: {
    opacity: 1,
    transform: au(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Tc = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Ld = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: i,
    easing: a,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: d,
    onExit: p,
    onExited: f,
    onExiting: m,
    style: h,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: y = hg
  } = t, v = Ee(t, Oq), $ = P.useRef(), E = P.useRef(), S = Sn(), b = P.useRef(null), x = Nt(b, i.ref, r), w = (G) => (X) => {
    if (G) {
      const J = b.current;
      X === void 0 ? G(J) : G(J, X);
    }
  }, A = w(d), M = w((G, X) => {
    d0(G);
    const {
      duration: J,
      delay: Z,
      easing: ne
    } = ja({
      style: h,
      timeout: g,
      easing: a
    }, {
      mode: "enter"
    });
    let D;
    g === "auto" ? (D = S.transitions.getAutoHeightDuration(G.clientHeight), E.current = D) : D = J, G.style.transition = [S.transitions.create("opacity", {
      duration: D,
      delay: Z
    }), S.transitions.create("transform", {
      duration: Tc ? D : D * 0.666,
      delay: Z,
      easing: ne
    })].join(","), c && c(G, X);
  }), k = w(u), H = w(m), U = w((G) => {
    const {
      duration: X,
      delay: J,
      easing: Z
    } = ja({
      style: h,
      timeout: g,
      easing: a
    }, {
      mode: "exit"
    });
    let ne;
    g === "auto" ? (ne = S.transitions.getAutoHeightDuration(G.clientHeight), E.current = ne) : ne = X, G.style.transition = [S.transitions.create("opacity", {
      duration: ne,
      delay: J
    }), S.transitions.create("transform", {
      duration: Tc ? ne : ne * 0.666,
      delay: Tc ? J : J || ne * 0.333,
      easing: Z
    })].join(","), G.style.opacity = 0, G.style.transform = au(0.75), p && p(G);
  }), K = w(f), z = (G) => {
    g === "auto" && ($.current = setTimeout(G, E.current || 0)), n && n(b.current, G);
  };
  return P.useEffect(() => () => {
    clearTimeout($.current);
  }, []), /* @__PURE__ */ _.jsx(y, C({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: M,
    onEntered: k,
    onEntering: A,
    onExit: U,
    onExited: K,
    onExiting: H,
    addEndListener: z,
    timeout: g === "auto" ? null : g
  }, v, {
    children: (G, X) => /* @__PURE__ */ P.cloneElement(i, C({
      style: C({
        opacity: 0,
        transform: au(0.75),
        visibility: G === "exited" && !l ? "hidden" : void 0
      }, Cq[G], h, i.props.style),
      ref: x
    }, X))
  }));
});
process.env.NODE_ENV !== "production" && (Ld.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: za.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
Ld.muiSupportAuto = !0;
const Pq = Ld, Rq = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Iq = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, f0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Sn(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: a = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: d,
    onEntered: p,
    onEntering: f,
    onExit: m,
    onExited: h,
    onExiting: g,
    style: y,
    timeout: v = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: $ = hg
  } = t, E = Ee(t, Rq), S = P.useRef(null), b = Nt(S, l.ref, r), x = (z) => (G) => {
    if (z) {
      const X = S.current;
      G === void 0 ? z(X) : z(X, G);
    }
  }, w = x(f), A = x((z, G) => {
    d0(z);
    const X = ja({
      style: y,
      timeout: v,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", X), z.style.transition = n.transitions.create("opacity", X), d && d(z, G);
  }), M = x(p), k = x(g), H = x((z) => {
    const G = ja({
      style: y,
      timeout: v,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", G), z.style.transition = n.transitions.create("opacity", G), m && m(z);
  }), U = x(h), K = (z) => {
    i && i(S.current, z);
  };
  return /* @__PURE__ */ _.jsx($, C({
    appear: a,
    in: u,
    nodeRef: S,
    onEnter: A,
    onEntered: M,
    onEntering: w,
    onExit: H,
    onExited: U,
    onExiting: k,
    addEndListener: K,
    timeout: v
  }, E, {
    children: (z, G) => /* @__PURE__ */ P.cloneElement(l, C({
      style: C({
        opacity: 0,
        visibility: z === "exited" && !u ? "hidden" : void 0
      }, Iq[z], y, l.props.style),
      ref: b
    }, G))
  }));
});
process.env.NODE_ENV !== "production" && (f0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: za.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
const Nq = f0;
function Aq(e) {
  return Fe("MuiBackdrop", e);
}
Le("MuiBackdrop", ["root", "invisible"]);
const jq = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], kq = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return ze({
    root: ["root", r && "invisible"]
  }, Aq, t);
}, Mq = he("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.invisible && t.invisible];
  }
})(({
  ownerState: e
}) => C({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, e.invisible && {
  backgroundColor: "transparent"
})), p0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i;
  const a = He({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: p = {},
    invisible: f = !1,
    open: m,
    slotProps: h = {},
    slots: g = {},
    TransitionComponent: y = Nq,
    transitionDuration: v
  } = a, $ = Ee(a, jq), E = C({}, a, {
    component: u,
    invisible: f
  }), S = kq(E), b = (n = h.root) != null ? n : p.root;
  return /* @__PURE__ */ _.jsx(y, C({
    in: m,
    timeout: v
  }, $, {
    children: /* @__PURE__ */ _.jsx(Mq, C({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = g.root) != null ? i : d.Root) != null ? o : u,
      className: Se(S.root, c, b == null ? void 0 : b.className),
      ownerState: C({}, E, b == null ? void 0 : b.ownerState),
      classes: S,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (p0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    root: s.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: s.bool,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: s.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
const Dq = p0;
function Fq(e) {
  return Fe("MuiModal", e);
}
Le("MuiModal", ["root", "hidden", "backdrop"]);
const Lq = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Bq = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return ze({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, Fq, n);
}, Vq = he("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.open && r.exited && t.hidden];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), zq = he(Dq, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), m0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a, l, c;
  const u = He({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = zq,
    BackdropProps: p,
    className: f,
    closeAfterTransition: m = !1,
    children: h,
    container: g,
    component: y,
    components: v = {},
    componentsProps: $ = {},
    disableAutoFocus: E = !1,
    disableEnforceFocus: S = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: x = !1,
    disableRestoreFocus: w = !1,
    disableScrollLock: A = !1,
    hideBackdrop: M = !1,
    keepMounted: k = !1,
    onBackdropClick: H,
    open: U,
    slotProps: K,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = u, G = Ee(u, Lq), X = C({}, u, {
    closeAfterTransition: m,
    disableAutoFocus: E,
    disableEnforceFocus: S,
    disableEscapeKeyDown: b,
    disablePortal: x,
    disableRestoreFocus: w,
    disableScrollLock: A,
    hideBackdrop: M,
    keepMounted: k
  }), {
    getRootProps: J,
    getBackdropProps: Z,
    getTransitionProps: ne,
    portalRef: D,
    isTopModal: N,
    exited: W,
    hasTransition: F
  } = Tx(C({}, X, {
    rootRef: r
  })), T = C({}, X, {
    exited: W
  }), R = Bq(T), B = {};
  if (h.props.tabIndex === void 0 && (B.tabIndex = "-1"), F) {
    const {
      onEnter: pe,
      onExited: te
    } = ne();
    B.onEnter = pe, B.onExited = te;
  }
  const Q = (n = (o = z == null ? void 0 : z.root) != null ? o : v.Root) != null ? n : Vq, Y = (i = (a = z == null ? void 0 : z.backdrop) != null ? a : v.Backdrop) != null ? i : d, oe = (l = K == null ? void 0 : K.root) != null ? l : $.root, ie = (c = K == null ? void 0 : K.backdrop) != null ? c : $.backdrop, ce = Dt({
    elementType: Q,
    externalSlotProps: oe,
    externalForwardedProps: G,
    getSlotProps: J,
    additionalProps: {
      ref: r,
      as: y
    },
    ownerState: T,
    className: Se(f, oe == null ? void 0 : oe.className, R == null ? void 0 : R.root, !T.open && T.exited && (R == null ? void 0 : R.hidden))
  }), q = Dt({
    elementType: Y,
    externalSlotProps: ie,
    additionalProps: p,
    getSlotProps: (pe) => Z(C({}, pe, {
      onClick: (te) => {
        H && H(te), pe != null && pe.onClick && pe.onClick(te);
      }
    })),
    className: Se(ie == null ? void 0 : ie.className, p == null ? void 0 : p.className, R == null ? void 0 : R.backdrop),
    ownerState: T
  });
  return !k && !U && (!F || W) ? null : /* @__PURE__ */ _.jsx(ba, {
    ref: D,
    container: g,
    disablePortal: x,
    children: /* @__PURE__ */ _.jsxs(Q, C({}, ce, {
      children: [!M && d ? /* @__PURE__ */ _.jsx(Y, C({}, q)) : null, /* @__PURE__ */ _.jsx(va, {
        disableEnforceFocus: S,
        disableAutoFocus: E,
        disableRestoreFocus: w,
        isEnabled: N,
        open: U,
        children: /* @__PURE__ */ P.cloneElement(h, B)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (m0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: s.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: s.object,
  /**
   * A single child content element.
   */
  children: za.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: s.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Backdrop: s.elementType,
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([qi, s.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: s.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: s.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: s.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: s.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    backdrop: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const Uq = m0;
function Wq(e) {
  return Fe("MuiPopover", e);
}
Le("MuiPopover", ["root", "paper"]);
const qq = ["onEntering"], Kq = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Hq = ["slotProps"];
function Lh(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function Bh(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function Vh(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function sa(e) {
  return typeof e == "function" ? e() : e;
}
const Gq = (e) => {
  const {
    classes: t
  } = e;
  return ze({
    root: ["root"],
    paper: ["paper"]
  }, Wq, t);
}, Yq = he(Uq, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), h0 = he(Ml, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), y0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i;
  const a = He({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: p = "anchorEl",
    children: f,
    className: m,
    container: h,
    elevation: g = 8,
    marginThreshold: y = 16,
    open: v,
    PaperProps: $ = {},
    slots: E,
    slotProps: S,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: x = Pq,
    transitionDuration: w = "auto",
    TransitionProps: {
      onEntering: A
    } = {},
    disableScrollLock: M = !1
  } = a, k = Ee(a.TransitionProps, qq), H = Ee(a, Kq), U = (n = S == null ? void 0 : S.paper) != null ? n : $, K = P.useRef(), z = Nt(K, U.ref), G = C({}, a, {
    anchorOrigin: u,
    anchorReference: p,
    elevation: g,
    marginThreshold: y,
    externalPaperSlotProps: U,
    transformOrigin: b,
    TransitionComponent: x,
    transitionDuration: w,
    TransitionProps: k
  }), X = Gq(G), J = P.useCallback(() => {
    if (p === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const pe = sa(c), te = pe && pe.nodeType === 1 ? pe : jt(K.current).body, fe = te.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Pe = te.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Pe.top === 0 && Pe.left === 0 && Pe.right === 0 && Pe.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: fe.top + Lh(fe, u.vertical),
      left: fe.left + Bh(fe, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, p]), Z = P.useCallback((pe) => ({
    vertical: Lh(pe, b.vertical),
    horizontal: Bh(pe, b.horizontal)
  }), [b.horizontal, b.vertical]), ne = P.useCallback((pe) => {
    const te = {
      width: pe.offsetWidth,
      height: pe.offsetHeight
    }, fe = Z(te);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Vh(fe)
      };
    const Pe = J();
    let je = Pe.top - fe.vertical, Ve = Pe.left - fe.horizontal;
    const st = je + te.height, ke = Ve + te.width, De = Br(sa(c)), Qe = De.innerHeight - y, Ge = De.innerWidth - y;
    if (y !== null && je < y) {
      const Ue = je - y;
      je -= Ue, fe.vertical += Ue;
    } else if (y !== null && st > Qe) {
      const Ue = st - Qe;
      je -= Ue, fe.vertical += Ue;
    }
    if (process.env.NODE_ENV !== "production" && te.height > Qe && te.height && Qe && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${te.height - Qe}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), y !== null && Ve < y) {
      const Ue = Ve - y;
      Ve -= Ue, fe.horizontal += Ue;
    } else if (ke > Ge) {
      const Ue = ke - Ge;
      Ve -= Ue, fe.horizontal += Ue;
    }
    return {
      top: `${Math.round(je)}px`,
      left: `${Math.round(Ve)}px`,
      transformOrigin: Vh(fe)
    };
  }, [c, p, J, Z, y]), [D, N] = P.useState(v), W = P.useCallback(() => {
    const pe = K.current;
    if (!pe)
      return;
    const te = ne(pe);
    te.top !== null && (pe.style.top = te.top), te.left !== null && (pe.style.left = te.left), pe.style.transformOrigin = te.transformOrigin, N(!0);
  }, [ne]);
  P.useEffect(() => (M && window.addEventListener("scroll", W), () => window.removeEventListener("scroll", W)), [c, M, W]);
  const F = (pe, te) => {
    A && A(pe, te), W();
  }, T = () => {
    N(!1);
  };
  P.useEffect(() => {
    v && W();
  }), P.useImperativeHandle(l, () => v ? {
    updatePosition: () => {
      W();
    }
  } : null, [v, W]), P.useEffect(() => {
    if (!v)
      return;
    const pe = is(() => {
      W();
    }), te = Br(c);
    return te.addEventListener("resize", pe), () => {
      pe.clear(), te.removeEventListener("resize", pe);
    };
  }, [c, v, W]);
  let R = w;
  w === "auto" && !x.muiSupportAuto && (R = void 0);
  const B = h || (c ? jt(sa(c)).body : void 0), Q = (o = E == null ? void 0 : E.root) != null ? o : Yq, Y = (i = E == null ? void 0 : E.paper) != null ? i : h0, oe = Dt({
    elementType: Y,
    externalSlotProps: C({}, U, {
      style: D ? U.style : C({}, U.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: z
    },
    ownerState: G,
    className: Se(X.paper, U == null ? void 0 : U.className)
  }), ie = Dt({
    elementType: Q,
    externalSlotProps: (S == null ? void 0 : S.root) || {},
    externalForwardedProps: H,
    additionalProps: {
      ref: r,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: B,
      open: v
    },
    ownerState: G,
    className: Se(X.root, m)
  }), {
    slotProps: ce
  } = ie, q = Ee(ie, Hq);
  return /* @__PURE__ */ _.jsx(Q, C({}, q, !Lr(Q) && {
    slotProps: ce,
    disableScrollLock: M
  }, {
    children: /* @__PURE__ */ _.jsx(x, C({
      appear: !0,
      in: v,
      onEntering: F,
      onExited: T,
      timeout: R
    }, k, {
      children: /* @__PURE__ */ _.jsx(Y, C({}, oe, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (y0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: rr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Zr(s.oneOfType([qi, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = sa(e.anchorEl);
      if (t && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`));
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: s.shape({
    left: s.number.isRequired,
    top: s.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: s.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([qi, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: jy,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: s.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: s.shape({
    component: Ua
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: s.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object
});
const Xq = y0;
function Jq(e) {
  return Fe("MuiMenu", e);
}
Le("MuiMenu", ["root", "paper", "list"]);
const Zq = ["onEntering"], Qq = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], e6 = {
  vertical: "top",
  horizontal: "right"
}, t6 = {
  vertical: "top",
  horizontal: "left"
}, r6 = (e) => {
  const {
    classes: t
  } = e;
  return ze({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Jq, t);
}, n6 = he(Xq, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), o6 = he(h0, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), i6 = he(Tq, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), g0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = He({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: p,
    open: f,
    PaperProps: m = {},
    PopoverClasses: h,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: y
    } = {},
    variant: v = "selectedMenu",
    slots: $ = {},
    slotProps: E = {}
  } = i, S = Ee(i.TransitionProps, Zq), b = Ee(i, Qq), x = Sn(), w = x.direction === "rtl", A = C({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: y,
    PaperProps: m,
    transitionDuration: g,
    TransitionProps: S,
    variant: v
  }), M = r6(A), k = a && !u && f, H = P.useRef(null), U = (ne, D) => {
    H.current && H.current.adjustStyleForScrollbar(ne, x), y && y(ne, D);
  }, K = (ne) => {
    ne.key === "Tab" && (ne.preventDefault(), p && p(ne, "tabKeyDown"));
  };
  let z = -1;
  P.Children.map(l, (ne, D) => {
    /* @__PURE__ */ P.isValidElement(ne) && (process.env.NODE_ENV !== "production" && Un.isFragment(ne) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), ne.props.disabled || (v === "selectedMenu" && ne.props.selected || z === -1) && (z = D));
  });
  const G = (n = $.paper) != null ? n : o6, X = (o = E.paper) != null ? o : m, J = Dt({
    elementType: $.root,
    externalSlotProps: E.root,
    ownerState: A,
    className: [M.root, c]
  }), Z = Dt({
    elementType: G,
    externalSlotProps: X,
    ownerState: A,
    className: M.paper
  });
  return /* @__PURE__ */ _.jsx(n6, C({
    onClose: p,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: w ? "right" : "left"
    },
    transformOrigin: w ? e6 : t6,
    slots: {
      paper: G,
      root: $.root
    },
    slotProps: {
      root: J,
      paper: Z
    },
    open: f,
    ref: r,
    transitionDuration: g,
    TransitionProps: C({
      onEntering: U
    }, S),
    ownerState: A
  }, b, {
    classes: h,
    children: /* @__PURE__ */ _.jsx(i6, C({
      onKeyDown: K,
      actions: H,
      autoFocus: a && (z === -1 || u),
      autoFocusItem: k,
      variant: v
    }, d, {
      className: Se(M.list, d.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (g0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([qi, s.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: s.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: s.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: s.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: s.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: s.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const s6 = g0;
function a6(e) {
  return Fe("MuiNativeSelect", e);
}
const l6 = Le("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Bd = l6, c6 = ["className", "disabled", "error", "IconComponent", "inputRef", "variant"], u6 = (e) => {
  const {
    classes: t,
    variant: r,
    disabled: n,
    multiple: o,
    open: i,
    error: a
  } = e, l = {
    select: ["select", r, n && "disabled", o && "multiple", a && "error"],
    icon: ["icon", `icon${xe(r)}`, i && "iconOpen", n && "disabled"]
  };
  return ze(l, a6, t);
}, v0 = ({
  ownerState: e,
  theme: t
}) => C({
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: "none",
  borderRadius: 0,
  // Reset
  cursor: "pointer",
  "&:focus": C({}, t.vars ? {
    backgroundColor: `rgba(${t.vars.palette.common.onBackgroundChannel} / 0.05)`
  } : {
    backgroundColor: t.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"
  }, {
    borderRadius: 0
    // Reset Chrome style
  }),
  // Remove IE11 arrow
  "&::-ms-expand": {
    display: "none"
  },
  [`&.${Bd.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: (t.vars || t).palette.background.paper
  },
  // Bump specificity to allow extending custom inputs
  "&&&": {
    paddingRight: 24,
    minWidth: 16
    // So it doesn't collapse.
  }
}, e.variant === "filled" && {
  "&&&": {
    paddingRight: 32
  }
}, e.variant === "outlined" && {
  borderRadius: (t.vars || t).shape.borderRadius,
  "&:focus": {
    borderRadius: (t.vars || t).shape.borderRadius
    // Reset the reset for Chrome style
  },
  "&&&": {
    paddingRight: 32
  }
}), d6 = he("select", {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: Gt,
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.select, t[r.variant], r.error && t.error, {
      [`&.${Bd.multiple}`]: t.multiple
    }];
  }
})(v0), b0 = ({
  ownerState: e,
  theme: t
}) => C({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: "absolute",
  right: 0,
  top: "calc(50% - .5em)",
  // Center vertically, height is 1em
  pointerEvents: "none",
  // Don't block pointer events on the select under the icon.
  color: (t.vars || t).palette.action.active,
  [`&.${Bd.disabled}`]: {
    color: (t.vars || t).palette.action.disabled
  }
}, e.open && {
  transform: "rotate(180deg)"
}, e.variant === "filled" && {
  right: 7
}, e.variant === "outlined" && {
  right: 7
}), f6 = he("svg", {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.icon, r.variant && t[`icon${xe(r.variant)}`], r.open && t.iconOpen];
  }
})(b0), $0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    className: n,
    disabled: o,
    error: i,
    IconComponent: a,
    inputRef: l,
    variant: c = "standard"
  } = t, u = Ee(t, c6), d = C({}, t, {
    disabled: o,
    variant: c,
    error: i
  }), p = u6(d);
  return /* @__PURE__ */ _.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ _.jsx(d6, C({
      ownerState: d,
      className: Se(p.select, n),
      disabled: o,
      ref: l || r
    }, u)), t.multiple ? null : /* @__PURE__ */ _.jsx(f6, {
      as: a,
      ownerState: d,
      className: p.icon
    })]
  });
});
process.env.NODE_ENV !== "production" && ($0.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object,
  /**
   * The CSS class name of the select element.
   */
  className: s.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: s.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: s.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: s.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: rr,
  /**
   * @ignore
   */
  multiple: s.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: s.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * The input value.
   */
  value: s.any,
  /**
   * The variant to use.
   */
  variant: s.oneOf(["standard", "outlined", "filled"])
});
const p6 = $0;
function m6(e) {
  return Fe("MuiSelect", e);
}
const h6 = Le("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Ti = h6;
var zh;
const y6 = ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultOpen", "defaultValue", "disabled", "displayEmpty", "error", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"], g6 = he("div", {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [
      // Win specificity over the input base
      {
        [`&.${Ti.select}`]: t.select
      },
      {
        [`&.${Ti.select}`]: t[r.variant]
      },
      {
        [`&.${Ti.error}`]: t.error
      },
      {
        [`&.${Ti.multiple}`]: t.multiple
      }
    ];
  }
})(v0, {
  // Win specificity over the input base
  [`&.${Ti.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}), v6 = he("svg", {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.icon, r.variant && t[`icon${xe(r.variant)}`], r.open && t.iconOpen];
  }
})(b0), b6 = he("input", {
  shouldForwardProp: (e) => ju(e) && e !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (e, t) => t.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function Uh(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
function $6(e) {
  return e == null || typeof e == "string" && !e.trim();
}
const S6 = (e) => {
  const {
    classes: t,
    variant: r,
    disabled: n,
    multiple: o,
    open: i,
    error: a
  } = e, l = {
    select: ["select", r, n && "disabled", o && "multiple", a && "error"],
    icon: ["icon", `icon${xe(r)}`, i && "iconOpen", n && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return ze(l, m6, t);
}, S0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n;
  const {
    "aria-describedby": o,
    "aria-label": i,
    autoFocus: a,
    autoWidth: l,
    children: c,
    className: u,
    defaultOpen: d,
    defaultValue: p,
    disabled: f,
    displayEmpty: m,
    error: h = !1,
    IconComponent: g,
    inputRef: y,
    labelId: v,
    MenuProps: $ = {},
    multiple: E,
    name: S,
    onBlur: b,
    onChange: x,
    onClose: w,
    onFocus: A,
    onOpen: M,
    open: k,
    readOnly: H,
    renderValue: U,
    SelectDisplayProps: K = {},
    tabIndex: z,
    value: G,
    variant: X = "standard"
  } = t, J = Ee(t, y6), [Z, ne] = Po({
    controlled: G,
    default: p,
    name: "Select"
  }), [D, N] = Po({
    controlled: k,
    default: d,
    name: "Select"
  }), W = P.useRef(null), F = P.useRef(null), [T, R] = P.useState(null), {
    current: B
  } = P.useRef(k != null), [Q, Y] = P.useState(), oe = Nt(r, y), ie = P.useCallback((re) => {
    F.current = re, re && R(re);
  }, []), ce = T == null ? void 0 : T.parentNode;
  P.useImperativeHandle(oe, () => ({
    focus: () => {
      F.current.focus();
    },
    node: W.current,
    value: Z
  }), [Z]), P.useEffect(() => {
    d && D && T && !B && (Y(l ? null : ce.clientWidth), F.current.focus());
  }, [T, l]), P.useEffect(() => {
    a && F.current.focus();
  }, [a]), P.useEffect(() => {
    if (!v)
      return;
    const re = jt(F.current).getElementById(v);
    if (re) {
      const se = () => {
        getSelection().isCollapsed && F.current.focus();
      };
      return re.addEventListener("click", se), () => {
        re.removeEventListener("click", se);
      };
    }
  }, [v]);
  const q = (re, se) => {
    re ? M && M(se) : w && w(se), B || (Y(l ? null : ce.clientWidth), N(re));
  }, pe = (re) => {
    re.button === 0 && (re.preventDefault(), F.current.focus(), q(!0, re));
  }, te = (re) => {
    q(!1, re);
  }, fe = P.Children.toArray(c), Pe = (re) => {
    const se = fe.find(($e) => $e.props.value === re.target.value);
    se !== void 0 && (ne(se.props.value), x && x(re, se));
  }, je = (re) => (se) => {
    let $e;
    if (se.currentTarget.hasAttribute("tabindex")) {
      if (E) {
        $e = Array.isArray(Z) ? Z.slice() : [];
        const Ae = Z.indexOf(re.props.value);
        Ae === -1 ? $e.push(re.props.value) : $e.splice(Ae, 1);
      } else
        $e = re.props.value;
      if (re.props.onClick && re.props.onClick(se), Z !== $e && (ne($e), x)) {
        const Ae = se.nativeEvent || se, et = new Ae.constructor(Ae.type, Ae);
        Object.defineProperty(et, "target", {
          writable: !0,
          value: {
            value: $e,
            name: S
          }
        }), x(et, re);
      }
      E || q(!1, se);
    }
  }, Ve = (re) => {
    H || [
      " ",
      "ArrowUp",
      "ArrowDown",
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      "Enter"
    ].indexOf(re.key) !== -1 && (re.preventDefault(), q(!0, re));
  }, st = T !== null && D, ke = (re) => {
    !st && b && (Object.defineProperty(re, "target", {
      writable: !0,
      value: {
        value: Z,
        name: S
      }
    }), b(re));
  };
  delete J["aria-invalid"];
  let De, Qe;
  const Ge = [];
  let Ue = !1, le = !1;
  (Aa({
    value: Z
  }) || m) && (U ? De = U(Z) : Ue = !0);
  const ye = fe.map((re) => {
    if (!/* @__PURE__ */ P.isValidElement(re))
      return null;
    process.env.NODE_ENV !== "production" && Un.isFragment(re) && console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    let se;
    if (E) {
      if (!Array.isArray(Z))
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : vn(2));
      se = Z.some(($e) => Uh($e, re.props.value)), se && Ue && Ge.push(re.props.children);
    } else
      se = Uh(Z, re.props.value), se && Ue && (Qe = re.props.children);
    return se && (le = !0), /* @__PURE__ */ P.cloneElement(re, {
      "aria-selected": se ? "true" : "false",
      onClick: je(re),
      onKeyUp: ($e) => {
        $e.key === " " && $e.preventDefault(), re.props.onKeyUp && re.props.onKeyUp($e);
      },
      role: "option",
      selected: se,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": re.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  process.env.NODE_ENV !== "production" && P.useEffect(() => {
    if (!le && !E && Z !== "") {
      const re = fe.map((se) => se.props.value);
      console.warn([`MUI: You have provided an out-of-range value \`${Z}\` for the select ${S ? `(name="${S}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${re.filter((se) => se != null).map((se) => `\`${se}\``).join(", ") || '""'}.`].join(`
`));
    }
  }, [le, fe, E, S, Z]), Ue && (E ? Ge.length === 0 ? De = null : De = Ge.reduce((re, se, $e) => (re.push(se), $e < Ge.length - 1 && re.push(", "), re), []) : De = Qe);
  let be = Q;
  !l && B && T && (be = ce.clientWidth);
  let ge;
  typeof z < "u" ? ge = z : ge = f ? null : 0;
  const ue = K.id || (S ? `mui-component-select-${S}` : void 0), We = C({}, t, {
    variant: X,
    value: Z,
    open: st,
    error: h
  }), Ne = S6(We), Xe = C({}, $.PaperProps, (n = $.slotProps) == null ? void 0 : n.paper), Je = Ki(), Ot = Ki();
  return /* @__PURE__ */ _.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ _.jsx(g6, C({
      ref: ie,
      tabIndex: ge,
      role: "combobox",
      "aria-controls": Je,
      "aria-disabled": f ? "true" : void 0,
      "aria-expanded": st ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": i,
      "aria-labelledby": [v, ue].filter(Boolean).join(" ") || void 0,
      "aria-describedby": o,
      onKeyDown: Ve,
      onMouseDown: f || H ? null : pe,
      onBlur: ke,
      onFocus: A
    }, K, {
      ownerState: We,
      className: Se(K.className, Ne.select, u),
      id: ue,
      children: $6(De) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        zh || (zh = /* @__PURE__ */ _.jsx("span", {
          className: "notranslate",
          children: "​"
        }))
      ) : De
    })), /* @__PURE__ */ _.jsx(b6, C({
      "aria-invalid": h,
      value: Array.isArray(Z) ? Z.join(",") : Z,
      name: S ?? Ot,
      ref: W,
      "aria-hidden": !0,
      onChange: Pe,
      tabIndex: -1,
      disabled: f,
      className: Ne.nativeInput,
      autoFocus: a,
      ownerState: We
    }, J)), /* @__PURE__ */ _.jsx(v6, {
      as: g,
      className: Ne.icon,
      ownerState: We
    }), /* @__PURE__ */ _.jsx(s6, C({
      id: `menu-${S || ""}`,
      anchorEl: ce,
      open: st,
      onClose: te,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    }, $, {
      MenuListProps: C({
        "aria-labelledby": v,
        role: "listbox",
        "aria-multiselectable": E ? "true" : void 0,
        disableListWrap: !0,
        id: Je
      }, $.MenuListProps),
      slotProps: C({}, $.slotProps, {
        paper: C({}, Xe, {
          style: C({
            minWidth: be
          }, Xe != null ? Xe.style : null)
        })
      }),
      children: ye
    }))]
  });
});
process.env.NODE_ENV !== "production" && (S0.propTypes = {
  /**
   * @ignore
   */
  "aria-describedby": s.string,
  /**
   * @ignore
   */
  "aria-label": s.string,
  /**
   * @ignore
   */
  autoFocus: s.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: s.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object,
  /**
   * The CSS class name of the select element.
   */
  className: s.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: s.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: s.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: s.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: s.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: s.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: rr,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: s.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: s.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: s.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: s.string,
  /**
   * @ignore
   */
  onBlur: s.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: s.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool,
  /**
   * @ignore
   */
  readOnly: s.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: s.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: s.object,
  /**
   * @ignore
   */
  tabIndex: s.oneOfType([s.number, s.string]),
  /**
   * @ignore
   */
  type: s.any,
  /**
   * The input value.
   */
  value: s.any,
  /**
   * The variant to use.
   */
  variant: s.oneOf(["standard", "outlined", "filled"])
});
const E6 = S0, _6 = en(/* @__PURE__ */ _.jsx("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown"), x6 = ["autoWidth", "children", "classes", "className", "defaultOpen", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"], w6 = ["root"], T6 = (e) => {
  const {
    classes: t
  } = e;
  return t;
}, Vd = {
  name: "MuiSelect",
  overridesResolver: (e, t) => t.root,
  shouldForwardProp: (e) => Gt(e) && e !== "variant",
  slot: "Root"
}, O6 = he(Zb, Vd)(""), C6 = he(t0, Vd)(""), P6 = he(Qb, Vd)(""), zd = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    name: "MuiSelect",
    props: t
  }), {
    autoWidth: o = !1,
    children: i,
    classes: a = {},
    className: l,
    defaultOpen: c = !1,
    displayEmpty: u = !1,
    IconComponent: d = _6,
    id: p,
    input: f,
    inputProps: m,
    label: h,
    labelId: g,
    MenuProps: y,
    multiple: v = !1,
    native: $ = !1,
    onClose: E,
    onOpen: S,
    open: b,
    renderValue: x,
    SelectDisplayProps: w,
    variant: A = "outlined"
  } = n, M = Ee(n, x6), k = $ ? p6 : E6, H = on(), U = xn({
    props: n,
    muiFormControl: H,
    states: ["variant", "error"]
  }), K = U.variant || A, z = C({}, n, {
    variant: K,
    classes: a
  }), G = T6(z), X = Ee(G, w6), J = f || {
    standard: /* @__PURE__ */ _.jsx(O6, {
      ownerState: z
    }),
    outlined: /* @__PURE__ */ _.jsx(C6, {
      label: h,
      ownerState: z
    }),
    filled: /* @__PURE__ */ _.jsx(P6, {
      ownerState: z
    })
  }[K], Z = Nt(r, J.ref);
  return /* @__PURE__ */ _.jsx(P.Fragment, {
    children: /* @__PURE__ */ P.cloneElement(J, C({
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: k,
      inputProps: C({
        children: i,
        error: U.error,
        IconComponent: d,
        variant: K,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple: v
      }, $ ? {
        id: p
      } : {
        autoWidth: o,
        defaultOpen: c,
        displayEmpty: u,
        labelId: g,
        MenuProps: y,
        onClose: E,
        onOpen: S,
        open: b,
        renderValue: x,
        SelectDisplayProps: C({
          id: p
        }, w)
      }, m, {
        classes: m ? Ht(X, m.classes) : X
      }, f ? f.props.inputProps : {})
    }, v && $ && K === "outlined" ? {
      notched: !0
    } : {}, {
      ref: Z,
      className: Se(J.props.className, l, G.root)
    }, !f && {
      variant: K
    }, M))
  });
});
process.env.NODE_ENV !== "production" && (zd.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: s.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: s.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: s.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: s.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: s.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: s.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: s.object,
  /**
   * See [OutlinedInput#label](/material-ui/api/outlined-input/#props)
   */
  label: s.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: s.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: s.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: s.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: s.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: s.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: s.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: s.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: s.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: s.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: s.oneOfType([s.oneOf([""]), s.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: s.oneOf(["filled", "outlined", "standard"])
});
zd.muiName = "Select";
const R6 = zd;
function I6(e) {
  return Fe("MuiTextField", e);
}
Le("MuiTextField", ["root"]);
const N6 = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"], A6 = {
  standard: Zb,
  filled: Qb,
  outlined: t0
}, j6 = (e) => {
  const {
    classes: t
  } = e;
  return ze({
    root: ["root"]
  }, I6, t);
}, k6 = he(i0, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), E0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiTextField"
  }), {
    autoComplete: o,
    autoFocus: i = !1,
    children: a,
    className: l,
    color: c = "primary",
    defaultValue: u,
    disabled: d = !1,
    error: p = !1,
    FormHelperTextProps: f,
    fullWidth: m = !1,
    helperText: h,
    id: g,
    InputLabelProps: y,
    inputProps: v,
    InputProps: $,
    inputRef: E,
    label: S,
    maxRows: b,
    minRows: x,
    multiline: w = !1,
    name: A,
    onBlur: M,
    onChange: k,
    onFocus: H,
    placeholder: U,
    required: K = !1,
    rows: z,
    select: G = !1,
    SelectProps: X,
    type: J,
    value: Z,
    variant: ne = "outlined"
  } = n, D = Ee(n, N6), N = C({}, n, {
    autoFocus: i,
    color: c,
    disabled: d,
    error: p,
    fullWidth: m,
    multiline: w,
    required: K,
    select: G,
    variant: ne
  }), W = j6(N);
  process.env.NODE_ENV !== "production" && G && !a && console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
  const F = {};
  ne === "outlined" && (y && typeof y.shrink < "u" && (F.notched = y.shrink), F.label = S), G && ((!X || !X.native) && (F.id = void 0), F["aria-describedby"] = void 0);
  const T = Ki(g), R = h && T ? `${T}-helper-text` : void 0, B = S && T ? `${T}-label` : void 0, Q = A6[ne], Y = /* @__PURE__ */ _.jsx(Q, C({
    "aria-describedby": R,
    autoComplete: o,
    autoFocus: i,
    defaultValue: u,
    fullWidth: m,
    multiline: w,
    name: A,
    rows: z,
    maxRows: b,
    minRows: x,
    type: J,
    value: Z,
    id: T,
    inputRef: E,
    onBlur: M,
    onChange: k,
    onFocus: H,
    placeholder: U,
    inputProps: v
  }, F, $));
  return /* @__PURE__ */ _.jsxs(k6, C({
    className: Se(W.root, l),
    disabled: d,
    error: p,
    fullWidth: m,
    ref: r,
    required: K,
    color: c,
    variant: ne,
    ownerState: N
  }, D, {
    children: [S != null && S !== "" && /* @__PURE__ */ _.jsx(dq, C({
      htmlFor: T,
      id: B
    }, y, {
      children: S
    })), G ? /* @__PURE__ */ _.jsx(R6, C({
      "aria-describedby": R,
      id: T,
      labelId: B,
      value: Z,
      input: Y
    }, X, {
      children: a
    })) : Y, h && /* @__PURE__ */ _.jsx(Dd, C({
      id: R
    }, f, {
      children: h
    }))]
  }));
});
process.env.NODE_ENV !== "production" && (E0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: s.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: s.bool,
  /**
   * @ignore
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: s.bool,
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps: s.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * The helper text content.
   */
  helperText: s.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: s.string,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: s.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: s.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * The label content.
   */
  label: s.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: s.oneOf(["dense", "none", "normal"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: s.oneOfType([s.number, s.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: s.oneOfType([s.number, s.string]),
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline: s.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: s.string,
  /**
   * @ignore
   */
  onBlur: s.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: s.string,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: s.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: s.oneOfType([s.number, s.string]),
  /**
   * Render a [`Select`](/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select: s.bool,
  /**
   * Props applied to the [`Select`](/material-ui/api/select/) element.
   */
  SelectProps: s.object,
  /**
   * The size of the component.
   */
  size: s.oneOfType([s.oneOf(["medium", "small"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: s.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: s.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: s.oneOf(["filled", "outlined", "standard"])
});
const Ud = E0, M6 = ["date", "datetime-local", "file", "time"];
function D6(e) {
  const {
    id: t,
    name: r,
    // remove this from textFieldProps
    placeholder: n,
    required: o,
    readonly: i,
    disabled: a,
    type: l,
    label: c,
    hideLabel: u,
    hideError: d,
    value: p,
    onChange: f,
    onChangeOverride: m,
    onBlur: h,
    onFocus: g,
    autofocus: y,
    options: v,
    schema: $,
    uiSchema: E,
    rawErrors: S = [],
    formContext: b,
    registry: x,
    InputLabelProps: w,
    ...A
  } = e, M = gb($, l, v), { step: k, min: H, max: U, ...K } = M, z = {
    inputProps: {
      step: k,
      min: H,
      max: U,
      ...$.examples ? { list: es(t) } : void 0
    },
    ...K
  }, G = ({ target: { value: ne } }) => f(ne === "" ? v.emptyValue : ne), X = ({ target: { value: ne } }) => h(t, ne), J = ({ target: { value: ne } }) => g(t, ne), Z = M6.includes(l) ? {
    ...w,
    shrink: !0
  } : w;
  return _.jsxs(_.Fragment, { children: [_.jsx(Ud, { id: t, name: t, placeholder: n, label: _n(c || void 0, u, void 0), autoFocus: y, required: o, disabled: a || i, ...z, value: p || p === 0 ? p : "", error: S.length > 0, onChange: m || G, onBlur: X, onFocus: J, InputLabelProps: Z, ...A, "aria-describedby": or(t, !!$.examples) }), Array.isArray($.examples) && _.jsx("datalist", { id: es(t), children: $.examples.concat($.default && !$.examples.includes($.default) ? [$.default] : []).map((ne) => _.jsx("option", { value: ne }, ne)) })] });
}
function F6(e) {
  return Fe("MuiTypography", e);
}
Le("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const L6 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"], B6 = (e) => {
  const {
    align: t,
    gutterBottom: r,
    noWrap: n,
    paragraph: o,
    variant: i,
    classes: a
  } = e, l = {
    root: ["root", i, e.align !== "inherit" && `align${xe(t)}`, r && "gutterBottom", n && "noWrap", o && "paragraph"]
  };
  return ze(l, F6, a);
}, V6 = he("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.variant && t[r.variant], r.align !== "inherit" && t[`align${xe(r.align)}`], r.noWrap && t.noWrap, r.gutterBottom && t.gutterBottom, r.paragraph && t.paragraph];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  margin: 0
}, t.variant === "inherit" && {
  // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
  font: "inherit"
}, t.variant !== "inherit" && e.typography[t.variant], t.align !== "inherit" && {
  textAlign: t.align
}, t.noWrap && {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, t.gutterBottom && {
  marginBottom: "0.35em"
}, t.paragraph && {
  marginBottom: 16
})), Wh = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, z6 = {
  primary: "primary.main",
  textPrimary: "text.primary",
  secondary: "secondary.main",
  textSecondary: "text.secondary",
  error: "error.main"
}, U6 = (e) => z6[e] || e, _0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiTypography"
  }), o = U6(n.color), i = cl(C({}, n, {
    color: o
  })), {
    align: a = "inherit",
    className: l,
    component: c,
    gutterBottom: u = !1,
    noWrap: d = !1,
    paragraph: p = !1,
    variant: f = "body1",
    variantMapping: m = Wh
  } = i, h = Ee(i, L6), g = C({}, i, {
    align: a,
    color: o,
    className: l,
    component: c,
    gutterBottom: u,
    noWrap: d,
    paragraph: p,
    variant: f,
    variantMapping: m
  }), y = c || (p ? "p" : m[f] || Wh[f]) || "span", v = B6(g);
  return /* @__PURE__ */ _.jsx(V6, C({
    as: y,
    ref: r,
    ownerState: g,
    className: Se(v.root, l)
  }, h));
});
process.env.NODE_ENV !== "production" && (_0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: s.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: s.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: s.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: s.oneOfType([s.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), s.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: s.object
});
const Tr = _0;
function W6(e) {
  const { id: t, description: r } = e;
  return r ? _.jsx(Tr, { id: t, variant: "subtitle2", style: { marginTop: "5px" }, children: r }) : null;
}
var Wd = {}, q6 = ii;
Object.defineProperty(Wd, "__esModule", {
  value: !0
});
var x0 = Wd.default = void 0, K6 = q6(si()), H6 = _, G6 = (0, K6.default)(/* @__PURE__ */ (0, H6.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
}), "Error");
x0 = Wd.default = G6;
function Y6(e) {
  return Fe("MuiListItem", e);
}
const X6 = Le("MuiListItem", ["root", "container", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "padding", "button", "secondaryAction", "selected"]), vo = X6, J6 = Le("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]), Z6 = J6;
function Q6(e) {
  return Fe("MuiListItemSecondaryAction", e);
}
Le("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const eK = ["className"], tK = (e) => {
  const {
    disableGutters: t,
    classes: r
  } = e;
  return ze({
    root: ["root", t && "disableGutters"]
  }, Q6, r);
}, rK = he("div", {
  name: "MuiListItemSecondaryAction",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.disableGutters && t.disableGutters];
  }
})(({
  ownerState: e
}) => C({
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)"
}, e.disableGutters && {
  right: 0
})), qd = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiListItemSecondaryAction"
  }), {
    className: o
  } = n, i = Ee(n, eK), a = P.useContext(Yr), l = C({}, n, {
    disableGutters: a.disableGutters
  }), c = tK(l);
  return /* @__PURE__ */ _.jsx(rK, C({
    className: Se(c.root, o),
    ownerState: l,
    ref: r
  }, i));
});
process.env.NODE_ENV !== "production" && (qd.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
qd.muiName = "ListItemSecondaryAction";
const nK = qd, oK = ["className"], iK = ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "disablePadding", "divider", "focusVisibleClassName", "secondaryAction", "selected", "slotProps", "slots"], sK = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.dense && t.dense, r.alignItems === "flex-start" && t.alignItemsFlexStart, r.divider && t.divider, !r.disableGutters && t.gutters, !r.disablePadding && t.padding, r.button && t.button, r.hasSecondaryAction && t.secondaryAction];
}, aK = (e) => {
  const {
    alignItems: t,
    button: r,
    classes: n,
    dense: o,
    disabled: i,
    disableGutters: a,
    disablePadding: l,
    divider: c,
    hasSecondaryAction: u,
    selected: d
  } = e;
  return ze({
    root: ["root", o && "dense", !a && "gutters", !l && "padding", c && "divider", i && "disabled", r && "button", t === "flex-start" && "alignItemsFlexStart", u && "secondaryAction", d && "selected"],
    container: ["container"]
  }, Y6, n);
}, lK = he("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: sK
})(({
  theme: e,
  ownerState: t
}) => C({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left"
}, !t.disablePadding && C({
  paddingTop: 8,
  paddingBottom: 8
}, t.dense && {
  paddingTop: 4,
  paddingBottom: 4
}, !t.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, !!t.secondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}), !!t.secondaryAction && {
  [`& > .${Z6.root}`]: {
    paddingRight: 48
  }
}, {
  [`&.${vo.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${vo.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${vo.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${vo.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  }
}, t.alignItems === "flex-start" && {
  alignItems: "flex-start"
}, t.divider && {
  borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
  backgroundClip: "padding-box"
}, t.button && {
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  }),
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (e.vars || e).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${vo.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  }
}, t.hasSecondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
})), cK = he("li", {
  name: "MuiListItem",
  slot: "Container",
  overridesResolver: (e, t) => t.container
})({
  position: "relative"
}), w0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiListItem"
  }), {
    alignItems: o = "center",
    autoFocus: i = !1,
    button: a = !1,
    children: l,
    className: c,
    component: u,
    components: d = {},
    componentsProps: p = {},
    ContainerComponent: f = "li",
    ContainerProps: {
      className: m
    } = {},
    dense: h = !1,
    disabled: g = !1,
    disableGutters: y = !1,
    disablePadding: v = !1,
    divider: $ = !1,
    focusVisibleClassName: E,
    secondaryAction: S,
    selected: b = !1,
    slotProps: x = {},
    slots: w = {}
  } = n, A = Ee(n.ContainerProps, oK), M = Ee(n, iK), k = P.useContext(Yr), H = P.useMemo(() => ({
    dense: h || k.dense || !1,
    alignItems: o,
    disableGutters: y
  }), [o, k.dense, h, y]), U = P.useRef(null);
  gr(() => {
    i && (U.current ? U.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a ListItem whose component has not been rendered."));
  }, [i]);
  const K = P.Children.toArray(l), z = K.length && Eo(K[K.length - 1], ["ListItemSecondaryAction"]), G = C({}, n, {
    alignItems: o,
    autoFocus: i,
    button: a,
    dense: H.dense,
    disabled: g,
    disableGutters: y,
    disablePadding: v,
    divider: $,
    hasSecondaryAction: z,
    selected: b
  }), X = aK(G), J = Nt(U, r), Z = w.root || d.Root || lK, ne = x.root || p.root || {}, D = C({
    className: Se(X.root, ne.className, c),
    disabled: g
  }, M);
  let N = u || "li";
  return a && (D.component = u || "div", D.focusVisibleClassName = Se(vo.focusVisible, E), N = Xn), z ? (N = !D.component && !u ? "div" : N, f === "li" && (N === "li" ? N = "div" : D.component === "li" && (D.component = "div")), /* @__PURE__ */ _.jsx(Yr.Provider, {
    value: H,
    children: /* @__PURE__ */ _.jsxs(cK, C({
      as: f,
      className: Se(X.container, m),
      ref: J,
      ownerState: G
    }, A, {
      children: [/* @__PURE__ */ _.jsx(Z, C({}, ne, !Lr(Z) && {
        as: N,
        ownerState: C({}, G, ne.ownerState)
      }, D, {
        children: K
      })), K.pop()]
    }))
  })) : /* @__PURE__ */ _.jsx(Yr.Provider, {
    value: H,
    children: /* @__PURE__ */ _.jsxs(Z, C({}, ne, {
      as: N,
      ref: J
    }, !Lr(Z) && {
      ownerState: C({}, G, ne.ownerState)
    }, D, {
      children: [K, S && /* @__PURE__ */ _.jsx(nK, {
        children: S
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (w0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: s.oneOf(["center", "flex-start"]),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  autoFocus: s.bool,
  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  button: s.bool,
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: Zr(s.node, (e) => {
    const t = P.Children.toArray(e.children);
    let r = -1;
    for (let n = t.length - 1; n >= 0; n -= 1) {
      const o = t[n];
      if (Eo(o, ["ListItemSecondaryAction"])) {
        r = n;
        break;
      }
    }
    return r !== -1 && r !== t.length - 1 ? new Error("MUI: You used an element after ListItemSecondaryAction. For ListItem to detect that it has a secondary action you must pass it as the last child to ListItem.") : null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    root: s.object
  }),
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent: Ua,
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps: s.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  disabled: s.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: s.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: s.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: s.string,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: s.node,
  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  selected: s.bool,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const T0 = w0;
function uK(e) {
  return Fe("MuiListItemIcon", e);
}
const dK = Le("MuiListItemIcon", ["root", "alignItemsFlexStart"]), qh = dK, fK = ["className"], pK = (e) => {
  const {
    alignItems: t,
    classes: r
  } = e;
  return ze({
    root: ["root", t === "flex-start" && "alignItemsFlexStart"]
  }, uK, r);
}, mK = he("div", {
  name: "MuiListItemIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.alignItems === "flex-start" && t.alignItemsFlexStart];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  minWidth: 56,
  color: (e.vars || e).palette.action.active,
  flexShrink: 0,
  display: "inline-flex"
}, t.alignItems === "flex-start" && {
  marginTop: 8
})), O0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiListItemIcon"
  }), {
    className: o
  } = n, i = Ee(n, fK), a = P.useContext(Yr), l = C({}, n, {
    alignItems: a.alignItems
  }), c = pK(l);
  return /* @__PURE__ */ _.jsx(mK, C({
    className: Se(c.root, o),
    ownerState: l,
    ref: r
  }, i));
});
process.env.NODE_ENV !== "production" && (O0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const hK = O0;
function yK(e) {
  return Fe("MuiListItemText", e);
}
const gK = Le("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]), ka = gK, vK = ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"], bK = (e) => {
  const {
    classes: t,
    inset: r,
    primary: n,
    secondary: o,
    dense: i
  } = e;
  return ze({
    root: ["root", r && "inset", i && "dense", n && o && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  }, yK, t);
}, $K = he("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [{
      [`& .${ka.primary}`]: t.primary
    }, {
      [`& .${ka.secondary}`]: t.secondary
    }, t.root, r.inset && t.inset, r.primary && r.secondary && t.multiline, r.dense && t.dense];
  }
})(({
  ownerState: e
}) => C({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4
}, e.primary && e.secondary && {
  marginTop: 6,
  marginBottom: 6
}, e.inset && {
  paddingLeft: 56
})), C0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiListItemText"
  }), {
    children: o,
    className: i,
    disableTypography: a = !1,
    inset: l = !1,
    primary: c,
    primaryTypographyProps: u,
    secondary: d,
    secondaryTypographyProps: p
  } = n, f = Ee(n, vK), {
    dense: m
  } = P.useContext(Yr);
  let h = c ?? o, g = d;
  const y = C({}, n, {
    disableTypography: a,
    inset: l,
    primary: !!h,
    secondary: !!g,
    dense: m
  }), v = bK(y);
  return h != null && h.type !== Tr && !a && (h = /* @__PURE__ */ _.jsx(Tr, C({
    variant: m ? "body2" : "body1",
    className: v.primary,
    component: u != null && u.variant ? void 0 : "span",
    display: "block"
  }, u, {
    children: h
  }))), g != null && g.type !== Tr && !a && (g = /* @__PURE__ */ _.jsx(Tr, C({
    variant: "body2",
    className: v.secondary,
    color: "text.secondary",
    display: "block"
  }, p, {
    children: g
  }))), /* @__PURE__ */ _.jsxs($K, C({
    className: Se(v.root, i),
    ownerState: y,
    ref: r
  }, f, {
    children: [h, g]
  }));
});
process.env.NODE_ENV !== "production" && (C0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Alias for the `primary` prop.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: s.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: s.bool,
  /**
   * The main content element.
   */
  primary: s.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: s.object,
  /**
   * The secondary content element.
   */
  secondary: s.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: s.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const SK = C0;
function EK({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return _.jsx(Ml, { elevation: 2, children: _.jsxs(Vr, { mb: 2, p: 2, children: [_.jsx(Tr, { variant: "h6", children: r(Ze.ErrorsLabel) }), _.jsx(Fd, { dense: !0, children: e.map((n, o) => _.jsxs(T0, { children: [_.jsx(hK, { children: _.jsx(x0, { color: "error" }) }), _.jsx(SK, { primary: n.stack })] }, o)) })] }) });
}
var Kd = {}, _K = ii;
Object.defineProperty(Kd, "__esModule", {
  value: !0
});
var P0 = Kd.default = void 0, xK = _K(si()), wK = _, TK = (0, xK.default)(/* @__PURE__ */ (0, wK.jsx)("path", {
  d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
}), "ArrowDownward");
P0 = Kd.default = TK;
var Hd = {}, OK = ii;
Object.defineProperty(Hd, "__esModule", {
  value: !0
});
var R0 = Hd.default = void 0, CK = OK(si()), PK = _, RK = (0, CK.default)(/* @__PURE__ */ (0, PK.jsx)("path", {
  d: "m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
}), "ArrowUpward");
R0 = Hd.default = RK;
var Gd = {}, IK = ii;
Object.defineProperty(Gd, "__esModule", {
  value: !0
});
var I0 = Gd.default = void 0, NK = IK(si()), AK = _, jK = (0, NK.default)(/* @__PURE__ */ (0, AK.jsx)("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
}), "ContentCopy");
I0 = Gd.default = jK;
var Yd = {}, kK = ii;
Object.defineProperty(Yd, "__esModule", {
  value: !0
});
var N0 = Yd.default = void 0, MK = kK(si()), DK = _, FK = (0, MK.default)(/* @__PURE__ */ (0, DK.jsx)("path", {
  d: "M19 13H5v-2h14v2z"
}), "Remove");
N0 = Yd.default = FK;
function zl(e) {
  const { icon: t, color: r, uiSchema: n, registry: o, ...i } = e;
  return _.jsx(qb, { ...i, size: "small", color: r, children: t });
}
function LK(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(zl, { title: t(Ze.CopyButton), ...e, icon: _.jsx(I0, { fontSize: "small" }) });
}
function BK(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(zl, { title: t(Ze.MoveDownButton), ...e, icon: _.jsx(P0, { fontSize: "small" }) });
}
function VK(e) {
  const { registry: { translateString: t } } = e;
  return _.jsx(zl, { title: t(Ze.MoveUpButton), ...e, icon: _.jsx(R0, { fontSize: "small" }) });
}
function zK(e) {
  const { iconType: t, ...r } = e, { registry: { translateString: n } } = r;
  return _.jsx(zl, { title: n(Ze.RemoveButton), ...r, color: "error", icon: _.jsx(N0, { fontSize: t === "default" ? void 0 : "small" }) });
}
function UK(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = wd(r);
  return _.jsx(Fd, { dense: !0, disablePadding: !0, children: t.map((o, i) => _.jsx(T0, { disableGutters: !0, children: _.jsx(Dd, { id: n, children: o }) }, i)) });
}
function WK(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = Td(t);
  return _.jsx(Dd, { id: n, children: r });
}
function qK(e) {
  const { id: t, children: r, classNames: n, style: o, disabled: i, displayLabel: a, hidden: l, label: c, onDropPropertyClick: u, onKeyChange: d, readonly: p, required: f, rawErrors: m = [], errors: h, help: g, description: y, rawDescription: v, schema: $, uiSchema: E, registry: S } = e, b = rt(E), x = Ke("WrapIfAdditionalTemplate", S, b);
  return l ? _.jsx("div", { style: { display: "none" }, children: r }) : _.jsx(x, { classNames: n, style: o, disabled: i, id: t, label: c, onDropPropertyClick: u, onKeyChange: d, readonly: p, required: f, schema: $, uiSchema: E, registry: S, children: _.jsxs(i0, { fullWidth: !0, error: !!m.length, required: f, children: [r, a && v ? _.jsx(Tr, { variant: "caption", color: "textSecondary", children: y }) : null, h, g] }) });
}
function KK(e) {
  const { description: t, title: r, properties: n, required: o, disabled: i, readonly: a, uiSchema: l, idSchema: c, schema: u, formData: d, onAddClick: p, registry: f } = e, m = rt(l), h = Ke("TitleFieldTemplate", f, m), g = Ke("DescriptionFieldTemplate", f, m), { ButtonTemplates: { AddButton: y } } = f.templates;
  return _.jsxs(_.Fragment, { children: [r && _.jsx(h, { id: Od(c), title: r, required: o, schema: u, uiSchema: l, registry: f }), t && _.jsx(g, { id: to(c), description: t, schema: u, uiSchema: l, registry: f }), _.jsxs(lr, { container: !0, spacing: 2, style: { marginTop: "10px" }, children: [n.map((v, $) => (
    // Remove the <Grid> if the inner element is hidden as the <Grid>
    // itself would otherwise still take up space.
    v.hidden ? v.content : _.jsx(lr, { item: !0, xs: 12, style: { marginBottom: "10px" }, children: v.content }, $)
  )), wg(u, l, d) && _.jsx(lr, { container: !0, justifyContent: "flex-end", children: _.jsx(lr, { item: !0, children: _.jsx(y, { className: "object-property-expand", onClick: p(u), disabled: i || a, uiSchema: l, registry: f }) }) })] })] });
}
function HK(e) {
  return Fe("MuiButton", e);
}
const GK = Le("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), zs = GK, A0 = /* @__PURE__ */ P.createContext({});
process.env.NODE_ENV !== "production" && (A0.displayName = "ButtonGroupContext");
const YK = A0, j0 = /* @__PURE__ */ P.createContext(void 0);
process.env.NODE_ENV !== "production" && (j0.displayName = "ButtonGroupButtonContext");
const XK = j0, JK = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"], ZK = (e) => {
  const {
    color: t,
    disableElevation: r,
    fullWidth: n,
    size: o,
    variant: i,
    classes: a
  } = e, l = {
    root: ["root", i, `${i}${xe(t)}`, `size${xe(o)}`, `${i}Size${xe(o)}`, t === "inherit" && "colorInherit", r && "disableElevation", n && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${xe(o)}`],
    endIcon: ["endIcon", `iconSize${xe(o)}`]
  }, c = ze(l, HK, a);
  return C({}, a, c);
}, k0 = (e) => C({}, e.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, e.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, e.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
}), QK = he(Xn, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], t[`${r.variant}${xe(r.color)}`], t[`size${xe(r.size)}`], t[`${r.variant}Size${xe(r.size)}`], r.color === "inherit" && t.colorInherit, r.disableElevation && t.disableElevation, r.fullWidth && t.fullWidth];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n;
  const o = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], i = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return C({}, e.typography.button, {
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: e.transitions.duration.short
    }),
    "&:hover": C({
      textDecoration: "none",
      backgroundColor: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette.text.primary, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, t.variant === "text" && t.color !== "inherit" && {
      backgroundColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette[t.color].main, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, t.variant === "outlined" && t.color !== "inherit" && {
      border: `1px solid ${(e.vars || e).palette[t.color].main}`,
      backgroundColor: e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(e.palette[t.color].main, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, t.variant === "contained" && {
      backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedHoverBg : i,
      boxShadow: (e.vars || e).shadows[4],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: (e.vars || e).shadows[2],
        backgroundColor: (e.vars || e).palette.grey[300]
      }
    }, t.variant === "contained" && t.color !== "inherit" && {
      backgroundColor: (e.vars || e).palette[t.color].dark,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: (e.vars || e).palette[t.color].main
      }
    }),
    "&:active": C({}, t.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[8]
    }),
    [`&.${zs.focusVisible}`]: C({}, t.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[6]
    }),
    [`&.${zs.disabled}`]: C({
      color: (e.vars || e).palette.action.disabled
    }, t.variant === "outlined" && {
      border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`
    }, t.variant === "contained" && {
      color: (e.vars || e).palette.action.disabled,
      boxShadow: (e.vars || e).shadows[0],
      backgroundColor: (e.vars || e).palette.action.disabledBackground
    })
  }, t.variant === "text" && {
    padding: "6px 8px"
  }, t.variant === "text" && t.color !== "inherit" && {
    color: (e.vars || e).palette[t.color].main
  }, t.variant === "outlined" && {
    padding: "5px 15px",
    border: "1px solid currentColor"
  }, t.variant === "outlined" && t.color !== "inherit" && {
    color: (e.vars || e).palette[t.color].main,
    border: e.vars ? `1px solid rgba(${e.vars.palette[t.color].mainChannel} / 0.5)` : `1px solid ${Pt(e.palette[t.color].main, 0.5)}`
  }, t.variant === "contained" && {
    color: e.vars ? (
      // this is safe because grey does not change between default light/dark mode
      e.vars.palette.text.primary
    ) : (r = (n = e.palette).getContrastText) == null ? void 0 : r.call(n, e.palette.grey[300]),
    backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedBg : o,
    boxShadow: (e.vars || e).shadows[2]
  }, t.variant === "contained" && t.color !== "inherit" && {
    color: (e.vars || e).palette[t.color].contrastText,
    backgroundColor: (e.vars || e).palette[t.color].main
  }, t.color === "inherit" && {
    color: "inherit",
    borderColor: "currentColor"
  }, t.size === "small" && t.variant === "text" && {
    padding: "4px 5px",
    fontSize: e.typography.pxToRem(13)
  }, t.size === "large" && t.variant === "text" && {
    padding: "8px 11px",
    fontSize: e.typography.pxToRem(15)
  }, t.size === "small" && t.variant === "outlined" && {
    padding: "3px 9px",
    fontSize: e.typography.pxToRem(13)
  }, t.size === "large" && t.variant === "outlined" && {
    padding: "7px 21px",
    fontSize: e.typography.pxToRem(15)
  }, t.size === "small" && t.variant === "contained" && {
    padding: "4px 10px",
    fontSize: e.typography.pxToRem(13)
  }, t.size === "large" && t.variant === "contained" && {
    padding: "8px 22px",
    fontSize: e.typography.pxToRem(15)
  }, t.fullWidth && {
    width: "100%"
  });
}, ({
  ownerState: e
}) => e.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${zs.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${zs.disabled}`]: {
    boxShadow: "none"
  }
}), e8 = he("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.startIcon, t[`iconSize${xe(r.size)}`]];
  }
})(({
  ownerState: e
}) => C({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, e.size === "small" && {
  marginLeft: -2
}, k0(e))), t8 = he("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.endIcon, t[`iconSize${xe(r.size)}`]];
  }
})(({
  ownerState: e
}) => C({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, e.size === "small" && {
  marginRight: -2
}, k0(e))), M0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = P.useContext(YK), o = P.useContext(XK), i = bu(n, t), a = He({
    props: i,
    name: "MuiButton"
  }), {
    children: l,
    color: c = "primary",
    component: u = "button",
    className: d,
    disabled: p = !1,
    disableElevation: f = !1,
    disableFocusRipple: m = !1,
    endIcon: h,
    focusVisibleClassName: g,
    fullWidth: y = !1,
    size: v = "medium",
    startIcon: $,
    type: E,
    variant: S = "text"
  } = a, b = Ee(a, JK), x = C({}, a, {
    color: c,
    component: u,
    disabled: p,
    disableElevation: f,
    disableFocusRipple: m,
    fullWidth: y,
    size: v,
    type: E,
    variant: S
  }), w = ZK(x), A = $ && /* @__PURE__ */ _.jsx(e8, {
    className: w.startIcon,
    ownerState: x,
    children: $
  }), M = h && /* @__PURE__ */ _.jsx(t8, {
    className: w.endIcon,
    ownerState: x,
    children: h
  }), k = o || "";
  return /* @__PURE__ */ _.jsxs(QK, C({
    ownerState: x,
    className: Se(n.className, w.root, d, k),
    component: u,
    disabled: p,
    focusRipple: !m,
    focusVisibleClassName: Se(w.focusVisible, g),
    ref: r,
    type: E
  }, b, {
    classes: w,
    children: [A, l, M]
  }));
});
process.env.NODE_ENV !== "production" && (M0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: s.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * Element placed after the children.
   */
  endIcon: s.node,
  /**
   * @ignore
   */
  focusVisibleClassName: s.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: s.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: s.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["small", "medium", "large"]), s.string]),
  /**
   * Element placed before the children.
   */
  startIcon: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * @ignore
   */
  type: s.oneOfType([s.oneOf(["button", "reset", "submit"]), s.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: s.oneOfType([s.oneOf(["contained", "outlined", "text"]), s.string])
});
const r8 = M0;
function n8({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = vb(e);
  return r ? null : _.jsx(Vr, { marginTop: 3, children: _.jsx(r8, { type: "submit", variant: "contained", color: "primary", ...n, children: t }) });
}
function o8(e) {
  return Fe("MuiDivider", e);
}
const i8 = Le("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]), Kh = i8, s8 = ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"], a8 = (e) => {
  const {
    absolute: t,
    children: r,
    classes: n,
    flexItem: o,
    light: i,
    orientation: a,
    textAlign: l,
    variant: c
  } = e;
  return ze({
    root: ["root", t && "absolute", c, i && "light", a === "vertical" && "vertical", o && "flexItem", r && "withChildren", r && a === "vertical" && "withChildrenVertical", l === "right" && a !== "vertical" && "textAlignRight", l === "left" && a !== "vertical" && "textAlignLeft"],
    wrapper: ["wrapper", a === "vertical" && "wrapperVertical"]
  }, o8, n);
}, l8 = he("div", {
  name: "MuiDivider",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.absolute && t.absolute, t[r.variant], r.light && t.light, r.orientation === "vertical" && t.vertical, r.flexItem && t.flexItem, r.children && t.withChildren, r.children && r.orientation === "vertical" && t.withChildrenVertical, r.textAlign === "right" && r.orientation !== "vertical" && t.textAlignRight, r.textAlign === "left" && r.orientation !== "vertical" && t.textAlignLeft];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: (e.vars || e).palette.divider,
  borderBottomWidth: "thin"
}, t.absolute && {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%"
}, t.light && {
  borderColor: e.vars ? `rgba(${e.vars.palette.dividerChannel} / 0.08)` : Pt(e.palette.divider, 0.08)
}, t.variant === "inset" && {
  marginLeft: 72
}, t.variant === "middle" && t.orientation === "horizontal" && {
  marginLeft: e.spacing(2),
  marginRight: e.spacing(2)
}, t.variant === "middle" && t.orientation === "vertical" && {
  marginTop: e.spacing(1),
  marginBottom: e.spacing(1)
}, t.orientation === "vertical" && {
  height: "100%",
  borderBottomWidth: 0,
  borderRightWidth: "thin"
}, t.flexItem && {
  alignSelf: "stretch",
  height: "auto"
}), ({
  ownerState: e
}) => C({}, e.children && {
  display: "flex",
  whiteSpace: "nowrap",
  textAlign: "center",
  border: 0,
  "&::before, &::after": {
    content: '""',
    alignSelf: "center"
  }
}), ({
  theme: e,
  ownerState: t
}) => C({}, t.children && t.orientation !== "vertical" && {
  "&::before, &::after": {
    width: "100%",
    borderTop: `thin solid ${(e.vars || e).palette.divider}`
  }
}), ({
  theme: e,
  ownerState: t
}) => C({}, t.children && t.orientation === "vertical" && {
  flexDirection: "column",
  "&::before, &::after": {
    height: "100%",
    borderLeft: `thin solid ${(e.vars || e).palette.divider}`
  }
}), ({
  ownerState: e
}) => C({}, e.textAlign === "right" && e.orientation !== "vertical" && {
  "&::before": {
    width: "90%"
  },
  "&::after": {
    width: "10%"
  }
}, e.textAlign === "left" && e.orientation !== "vertical" && {
  "&::before": {
    width: "10%"
  },
  "&::after": {
    width: "90%"
  }
})), c8 = he("span", {
  name: "MuiDivider",
  slot: "Wrapper",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.wrapper, r.orientation === "vertical" && t.wrapperVertical];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  display: "inline-block",
  paddingLeft: `calc(${e.spacing(1)} * 1.2)`,
  paddingRight: `calc(${e.spacing(1)} * 1.2)`
}, t.orientation === "vertical" && {
  paddingTop: `calc(${e.spacing(1)} * 1.2)`,
  paddingBottom: `calc(${e.spacing(1)} * 1.2)`
})), Xd = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiDivider"
  }), {
    absolute: o = !1,
    children: i,
    className: a,
    component: l = i ? "div" : "hr",
    flexItem: c = !1,
    light: u = !1,
    orientation: d = "horizontal",
    role: p = l !== "hr" ? "separator" : void 0,
    textAlign: f = "center",
    variant: m = "fullWidth"
  } = n, h = Ee(n, s8), g = C({}, n, {
    absolute: o,
    component: l,
    flexItem: c,
    light: u,
    orientation: d,
    role: p,
    textAlign: f,
    variant: m
  }), y = a8(g);
  return /* @__PURE__ */ _.jsx(l8, C({
    as: l,
    className: Se(y.root, a),
    role: p,
    ref: r,
    ownerState: g
  }, h, {
    children: i ? /* @__PURE__ */ _.jsx(c8, {
      className: y.wrapper,
      ownerState: g,
      children: i
    }) : null
  }));
});
Xd.muiSkipListHighlight = !0;
process.env.NODE_ENV !== "production" && (Xd.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: s.bool,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: s.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: s.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: s.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  role: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: s.oneOf(["center", "left", "right"]),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: s.oneOfType([s.oneOf(["fullWidth", "inset", "middle"]), s.string])
});
const u8 = Xd;
function d8({ id: e, title: t }) {
  return _.jsxs(Vr, { id: e, mb: 1, mt: 1, children: [_.jsx(Tr, { variant: "h5", children: t }), _.jsx(u8, {})] });
}
function f8(e) {
  const { children: t, classNames: r, style: n, disabled: o, id: i, label: a, onDropPropertyClick: l, onKeyChange: c, readonly: u, required: d, schema: p, uiSchema: f, registry: m } = e, { templates: h, translateString: g } = m, { RemoveButton: y } = h.ButtonTemplates, v = g(Ze.KeyLabel, [a]), $ = Uo in p, E = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  if (!$)
    return _.jsx("div", { className: r, style: n, children: t });
  const S = ({ target: b }) => c(b.value);
  return _.jsxs(lr, { container: !0, alignItems: "center", spacing: 2, className: r, style: n, children: [_.jsx(lr, { item: !0, xs: !0, children: _.jsx(Ud, { fullWidth: !0, required: d, label: v, defaultValue: a, disabled: o || u, id: `${i}-key`, name: `${i}-key`, onBlur: u ? void 0 : S, type: "text" }) }), _.jsx(lr, { item: !0, xs: !0, children: t }), _.jsx(lr, { item: !0, children: _.jsx(y, { iconType: "default", style: E, disabled: o || u, onClick: l(a), uiSchema: f, registry: m }) })] }, `${i}-key`);
}
function p8() {
  return {
    ArrayFieldItemTemplate: wW,
    ArrayFieldTemplate: TW,
    BaseInputTemplate: D6,
    ButtonTemplates: {
      AddButton: sW,
      CopyButton: LK,
      MoveDownButton: BK,
      MoveUpButton: VK,
      RemoveButton: zK,
      SubmitButton: n8
    },
    DescriptionFieldTemplate: W6,
    ErrorListTemplate: EK,
    FieldErrorTemplate: UK,
    FieldHelpTemplate: WK,
    FieldTemplate: qK,
    ObjectFieldTemplate: KK,
    TitleFieldTemplate: d8,
    WrapIfAdditionalTemplate: f8
  };
}
function m8(e) {
  return Fe("PrivateSwitchBase", e);
}
Le("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const h8 = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"], y8 = (e) => {
  const {
    classes: t,
    checked: r,
    disabled: n,
    edge: o
  } = e, i = {
    root: ["root", r && "checked", n && "disabled", o && `edge${xe(o)}`],
    input: ["input"]
  };
  return ze(i, m8, t);
}, g8 = he(Xn)(({
  ownerState: e
}) => C({
  padding: 9,
  borderRadius: "50%"
}, e.edge === "start" && {
  marginLeft: e.size === "small" ? -3 : -12
}, e.edge === "end" && {
  marginRight: e.size === "small" ? -3 : -12
})), v8 = he("input", {
  shouldForwardProp: Gt
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
}), D0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    autoFocus: n,
    checked: o,
    checkedIcon: i,
    className: a,
    defaultChecked: l,
    disabled: c,
    disableFocusRipple: u = !1,
    edge: d = !1,
    icon: p,
    id: f,
    inputProps: m,
    inputRef: h,
    name: g,
    onBlur: y,
    onChange: v,
    onFocus: $,
    readOnly: E,
    required: S = !1,
    tabIndex: b,
    type: x,
    value: w
  } = t, A = Ee(t, h8), [M, k] = Po({
    controlled: o,
    default: !!l,
    name: "SwitchBase",
    state: "checked"
  }), H = on(), U = (ne) => {
    $ && $(ne), H && H.onFocus && H.onFocus(ne);
  }, K = (ne) => {
    y && y(ne), H && H.onBlur && H.onBlur(ne);
  }, z = (ne) => {
    if (ne.nativeEvent.defaultPrevented)
      return;
    const D = ne.target.checked;
    k(D), v && v(ne, D);
  };
  let G = c;
  H && typeof G > "u" && (G = H.disabled);
  const X = x === "checkbox" || x === "radio", J = C({}, t, {
    checked: M,
    disabled: G,
    disableFocusRipple: u,
    edge: d
  }), Z = y8(J);
  return /* @__PURE__ */ _.jsxs(g8, C({
    component: "span",
    className: Se(Z.root, a),
    centerRipple: !0,
    focusRipple: !u,
    disabled: G,
    tabIndex: null,
    role: void 0,
    onFocus: U,
    onBlur: K,
    ownerState: J,
    ref: r
  }, A, {
    children: [/* @__PURE__ */ _.jsx(v8, C({
      autoFocus: n,
      checked: o,
      defaultChecked: l,
      className: Z.input,
      disabled: G,
      id: X ? f : void 0,
      name: g,
      onChange: z,
      readOnly: E,
      ref: h,
      required: S,
      ownerState: J,
      tabIndex: b,
      type: x
    }, x === "checkbox" && w === void 0 ? {} : {
      value: w
    }, m)), M ? i : p]
  }));
});
process.env.NODE_ENV !== "production" && (D0.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: s.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: s.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: s.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * @ignore
   */
  defaultChecked: s.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: s.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: s.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: s.oneOf(["end", "start", !1]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: s.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /*
   * @ignore
   */
  name: s.string,
  /**
   * @ignore
   */
  onBlur: s.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: s.func,
  /**
   * @ignore
   */
  onFocus: s.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: s.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.object,
  /**
   * @ignore
   */
  tabIndex: s.oneOfType([s.number, s.string]),
  /**
   * The input component prop `type`.
   */
  type: s.string.isRequired,
  /**
   * The value of the component.
   */
  value: s.any
});
const F0 = D0, b8 = en(/* @__PURE__ */ _.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank"), $8 = en(/* @__PURE__ */ _.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox"), S8 = en(/* @__PURE__ */ _.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
function E8(e) {
  return Fe("MuiCheckbox", e);
}
const _8 = Le("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]), Oc = _8, x8 = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size", "className"], w8 = (e) => {
  const {
    classes: t,
    indeterminate: r,
    color: n,
    size: o
  } = e, i = {
    root: ["root", r && "indeterminate", `color${xe(n)}`, `size${xe(o)}`]
  }, a = ze(i, E8, t);
  return C({}, t, a);
}, T8 = he(F0, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.indeterminate && t.indeterminate, t[`size${xe(r.size)}`], r.color !== "default" && t[`color${xe(r.color)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  color: (e.vars || e).palette.text.secondary
}, !t.disableRipple && {
  "&:hover": {
    backgroundColor: e.vars ? `rgba(${t.color === "default" ? e.vars.palette.action.activeChannel : e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(t.color === "default" ? e.palette.action.active : e.palette[t.color].main, e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, t.color !== "default" && {
  [`&.${Oc.checked}, &.${Oc.indeterminate}`]: {
    color: (e.vars || e).palette[t.color].main
  },
  [`&.${Oc.disabled}`]: {
    color: (e.vars || e).palette.action.disabled
  }
})), O8 = /* @__PURE__ */ _.jsx($8, {}), C8 = /* @__PURE__ */ _.jsx(b8, {}), P8 = /* @__PURE__ */ _.jsx(S8, {}), L0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = He({
    props: t,
    name: "MuiCheckbox"
  }), {
    checkedIcon: a = O8,
    color: l = "primary",
    icon: c = C8,
    indeterminate: u = !1,
    indeterminateIcon: d = P8,
    inputProps: p,
    size: f = "medium",
    className: m
  } = i, h = Ee(i, x8), g = u ? d : c, y = u ? d : a, v = C({}, i, {
    color: l,
    indeterminate: u,
    size: f
  }), $ = w8(v);
  return /* @__PURE__ */ _.jsx(T8, C({
    type: "checkbox",
    inputProps: C({
      "data-indeterminate": u
    }, p),
    icon: /* @__PURE__ */ P.cloneElement(g, {
      fontSize: (n = g.props.fontSize) != null ? n : f
    }),
    checkedIcon: /* @__PURE__ */ P.cloneElement(y, {
      fontSize: (o = y.props.fontSize) != null ? o : f
    }),
    ownerState: v,
    ref: r,
    className: Se($.root, m)
  }, h, {
    classes: $
  }));
});
process.env.NODE_ENV !== "production" && (L0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: s.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: s.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: s.node,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: s.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: s.node,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: s.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: s.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["medium", "small"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: s.any
});
const Jd = L0, B0 = b_({
  createStyledComponent: he("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (e, t) => t.root
  }),
  useThemeProps: (e) => He({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (B0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: s.oneOfType([s.oneOf(["column-reverse", "column", "row-reverse", "row"]), s.arrayOf(s.oneOf(["column-reverse", "column", "row-reverse", "row"])), s.object]),
  /**
   * Add an element between each child.
   */
  divider: s.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: s.oneOfType([s.arrayOf(s.oneOfType([s.number, s.string])), s.number, s.object, s.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: s.bool
});
const R8 = B0;
function I8(e) {
  return Fe("MuiFormControlLabel", e);
}
const N8 = Le("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label", "error", "required", "asterisk"]), Ii = N8, A8 = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "required", "slotProps", "value"], j8 = (e) => {
  const {
    classes: t,
    disabled: r,
    labelPlacement: n,
    error: o,
    required: i
  } = e, a = {
    root: ["root", r && "disabled", `labelPlacement${xe(n)}`, o && "error", i && "required"],
    label: ["label", r && "disabled"],
    asterisk: ["asterisk", o && "error"]
  };
  return ze(a, I8, t);
}, k8 = he("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [{
      [`& .${Ii.label}`]: t.label
    }, t.root, t[`labelPlacement${xe(r.labelPlacement)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  // For correct alignment with the text.
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  [`&.${Ii.disabled}`]: {
    cursor: "default"
  }
}, t.labelPlacement === "start" && {
  flexDirection: "row-reverse",
  marginLeft: 16,
  // used for row presentation of radio/checkbox
  marginRight: -11
}, t.labelPlacement === "top" && {
  flexDirection: "column-reverse",
  marginLeft: 16
}, t.labelPlacement === "bottom" && {
  flexDirection: "column",
  marginLeft: 16
}, {
  [`& .${Ii.label}`]: {
    [`&.${Ii.disabled}`]: {
      color: (e.vars || e).palette.text.disabled
    }
  }
})), M8 = he("span", {
  name: "MuiFormControlLabel",
  slot: "Asterisk",
  overridesResolver: (e, t) => t.asterisk
})(({
  theme: e
}) => ({
  [`&.${Ii.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), V0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = He({
    props: t,
    name: "MuiFormControlLabel"
  }), {
    className: a,
    componentsProps: l = {},
    control: c,
    disabled: u,
    disableTypography: d,
    label: p,
    labelPlacement: f = "end",
    required: m,
    slotProps: h = {}
  } = i, g = Ee(i, A8), y = on(), v = (n = u ?? c.props.disabled) != null ? n : y == null ? void 0 : y.disabled, $ = m ?? c.props.required, E = {
    disabled: v,
    required: $
  };
  ["checked", "name", "onChange", "value", "inputRef"].forEach((M) => {
    typeof c.props[M] > "u" && typeof i[M] < "u" && (E[M] = i[M]);
  });
  const S = xn({
    props: i,
    muiFormControl: y,
    states: ["error"]
  }), b = C({}, i, {
    disabled: v,
    labelPlacement: f,
    required: $,
    error: S.error
  }), x = j8(b), w = (o = h.typography) != null ? o : l.typography;
  let A = p;
  return A != null && A.type !== Tr && !d && (A = /* @__PURE__ */ _.jsx(Tr, C({
    component: "span"
  }, w, {
    className: Se(x.label, w == null ? void 0 : w.className),
    children: A
  }))), /* @__PURE__ */ _.jsxs(k8, C({
    className: Se(x.root, a),
    ownerState: b,
    ref: r
  }, g, {
    children: [/* @__PURE__ */ P.cloneElement(c, E), $ ? /* @__PURE__ */ _.jsxs(R8, {
      display: "block",
      children: [A, /* @__PURE__ */ _.jsxs(M8, {
        ownerState: b,
        "aria-hidden": !0,
        className: x.asterisk,
        children: [" ", "*"]
      })]
    }) : A]
  }));
});
process.env.NODE_ENV !== "production" && (V0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component appears selected.
   */
  checked: s.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: s.shape({
    typography: s.object
  }),
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: s.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: s.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: s.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: s.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: s.oneOf(["bottom", "end", "start", "top"]),
  /**
   * @ignore
   */
  name: s.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: s.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: s.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: s.shape({
    typography: s.object
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The value of the component.
   */
  value: s.any
});
const Ul = V0;
function D8(e) {
  var t;
  const { schema: r, id: n, value: o, disabled: i, readonly: a, label: l = "", hideLabel: c, autofocus: u, onChange: d, onBlur: p, onFocus: f, registry: m, options: h, uiSchema: g } = e, y = Ke("DescriptionFieldTemplate", m, h), v = To(r), $ = (x, w) => d(w), E = ({ target: { value: x } }) => p(n, x), S = ({ target: { value: x } }) => f(n, x), b = (t = h.description) !== null && t !== void 0 ? t : r.description;
  return _.jsxs(_.Fragment, { children: [!c && !!b && _.jsx(y, { id: to(n), description: b, schema: r, uiSchema: g, registry: m }), _.jsx(Ul, { control: _.jsx(Jd, { id: n, name: n, checked: typeof o > "u" ? !1 : !!o, required: v, disabled: i || a, autoFocus: u, onChange: $, onBlur: E, onFocus: S, "aria-describedby": or(n) }), label: _n(l, c, !1) })] });
}
function F8(e) {
  return Fe("MuiFormGroup", e);
}
Le("MuiFormGroup", ["root", "row", "error"]);
const L8 = ["className", "row"], B8 = (e) => {
  const {
    classes: t,
    row: r,
    error: n
  } = e;
  return ze({
    root: ["root", r && "row", n && "error"]
  }, F8, t);
}, V8 = he("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.row && t.row];
  }
})(({
  ownerState: e
}) => C({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap"
}, e.row && {
  flexDirection: "row"
})), z0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiFormGroup"
  }), {
    className: o,
    row: i = !1
  } = n, a = Ee(n, L8), l = on(), c = xn({
    props: n,
    muiFormControl: l,
    states: ["error"]
  }), u = C({}, n, {
    row: i,
    error: c.error
  }), d = B8(u);
  return /* @__PURE__ */ _.jsx(V8, C({
    className: Se(d.root, o),
    ownerState: u,
    ref: r
  }, a));
});
process.env.NODE_ENV !== "production" && (z0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const U0 = z0;
function z8({ label: e, hideLabel: t, id: r, disabled: n, options: o, value: i, autofocus: a, readonly: l, required: c, onChange: u, onBlur: d, onFocus: p }) {
  const { enumOptions: f, enumDisabled: m, inline: h, emptyValue: g } = o, y = Array.isArray(i) ? i : [i], v = (S) => ({ target: { checked: b } }) => {
    u(b ? hb(S, y, f) : mb(S, y, f));
  }, $ = ({ target: { value: S } }) => d(r, Ft(S, f, g)), E = ({ target: { value: S } }) => p(r, Ft(S, f, g));
  return _.jsxs(_.Fragment, { children: [_n(_.jsx(Vl, { required: c, htmlFor: r, children: e || void 0 }), t), _.jsx(U0, { id: r, row: !!h, children: Array.isArray(f) && f.map((S, b) => {
    const x = Nl(S.value, y), w = Array.isArray(m) && m.indexOf(S.value) !== -1, A = _.jsx(Jd, { id: Al(r, b), name: r, checked: x, disabled: n || w || l, autoFocus: a && b === 0, onChange: v(b), onBlur: $, onFocus: E, "aria-describedby": or(r) });
    return _.jsx(Ul, { control: A, label: S.label }, b);
  }) })] });
}
const U8 = en(/* @__PURE__ */ _.jsx("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "RadioButtonUnchecked"), W8 = en(/* @__PURE__ */ _.jsx("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), "RadioButtonChecked"), q8 = he("span", {
  shouldForwardProp: Gt
})({
  position: "relative",
  display: "flex"
}), K8 = he(U8)({
  // Scale applied to prevent dot misalignment in Safari
  transform: "scale(1)"
}), H8 = he(W8)(({
  theme: e,
  ownerState: t
}) => C({
  left: 0,
  position: "absolute",
  transform: "scale(0)",
  transition: e.transitions.create("transform", {
    easing: e.transitions.easing.easeIn,
    duration: e.transitions.duration.shortest
  })
}, t.checked && {
  transform: "scale(1)",
  transition: e.transitions.create("transform", {
    easing: e.transitions.easing.easeOut,
    duration: e.transitions.duration.shortest
  })
}));
function Zd(e) {
  const {
    checked: t = !1,
    classes: r = {},
    fontSize: n
  } = e, o = C({}, e, {
    checked: t
  });
  return /* @__PURE__ */ _.jsxs(q8, {
    className: r.root,
    ownerState: o,
    children: [/* @__PURE__ */ _.jsx(K8, {
      fontSize: n,
      className: r.background,
      ownerState: o
    }), /* @__PURE__ */ _.jsx(H8, {
      fontSize: n,
      className: r.dot,
      ownerState: o
    })]
  });
}
process.env.NODE_ENV !== "production" && (Zd.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: s.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: s.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: s.oneOf(["small", "medium"])
});
const W0 = /* @__PURE__ */ P.createContext(void 0);
process.env.NODE_ENV !== "production" && (W0.displayName = "RadioGroupContext");
const q0 = W0;
function G8() {
  return P.useContext(q0);
}
function Y8(e) {
  return Fe("MuiRadio", e);
}
const X8 = Le("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary", "sizeSmall"]), Hh = X8, J8 = ["checked", "checkedIcon", "color", "icon", "name", "onChange", "size", "className"], Z8 = (e) => {
  const {
    classes: t,
    color: r,
    size: n
  } = e, o = {
    root: ["root", `color${xe(r)}`, n !== "medium" && `size${xe(n)}`]
  };
  return C({}, t, ze(o, Y8, t));
}, Q8 = he(F0, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiRadio",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.size !== "medium" && t[`size${xe(r.size)}`], t[`color${xe(r.color)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  color: (e.vars || e).palette.text.secondary
}, !t.disableRipple && {
  "&:hover": {
    backgroundColor: e.vars ? `rgba(${t.color === "default" ? e.vars.palette.action.activeChannel : e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Pt(t.color === "default" ? e.palette.action.active : e.palette[t.color].main, e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, t.color !== "default" && {
  [`&.${Hh.checked}`]: {
    color: (e.vars || e).palette[t.color].main
  }
}, {
  [`&.${Hh.disabled}`]: {
    color: (e.vars || e).palette.action.disabled
  }
}));
function eH(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
const Gh = /* @__PURE__ */ _.jsx(Zd, {
  checked: !0
}), Yh = /* @__PURE__ */ _.jsx(Zd, {}), K0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = He({
    props: t,
    name: "MuiRadio"
  }), {
    checked: a,
    checkedIcon: l = Gh,
    color: c = "primary",
    icon: u = Yh,
    name: d,
    onChange: p,
    size: f = "medium",
    className: m
  } = i, h = Ee(i, J8), g = C({}, i, {
    color: c,
    size: f
  }), y = Z8(g), v = G8();
  let $ = a;
  const E = da(p, v && v.onChange);
  let S = d;
  return v && (typeof $ > "u" && ($ = eH(v.value, i.value)), typeof S > "u" && (S = v.name)), /* @__PURE__ */ _.jsx(Q8, C({
    type: "radio",
    icon: /* @__PURE__ */ P.cloneElement(u, {
      fontSize: (n = Yh.props.fontSize) != null ? n : f
    }),
    checkedIcon: /* @__PURE__ */ P.cloneElement(l, {
      fontSize: (o = Gh.props.fontSize) != null ? o : f
    }),
    ownerState: g,
    classes: y,
    name: S,
    checked: $,
    onChange: E,
    ref: r,
    className: Se(y.root, m)
  }, h));
});
process.env.NODE_ENV !== "production" && (K0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: s.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: s.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: s.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: s.node,
  /**
   * The id of the `input` element.
   */
  id: s.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: s.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: rr,
  /**
   * Name attribute of the `input` element.
   */
  name: s.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: s.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: s.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["medium", "small"]), s.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: s.any
});
const tH = K0, rH = ["actions", "children", "defaultValue", "name", "onChange", "value"], H0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    children: o,
    defaultValue: i,
    name: a,
    onChange: l,
    value: c
  } = t, u = Ee(t, rH), d = P.useRef(null), [p, f] = Po({
    controlled: c,
    default: i,
    name: "RadioGroup"
  });
  P.useImperativeHandle(n, () => ({
    focus: () => {
      let y = d.current.querySelector("input:not(:disabled):checked");
      y || (y = d.current.querySelector("input:not(:disabled)")), y && y.focus();
    }
  }), []);
  const m = Nt(r, d), h = Ki(a), g = P.useMemo(() => ({
    name: h,
    onChange(y) {
      f(y.target.value), l && l(y, y.target.value);
    },
    value: p
  }), [h, l, f, p]);
  return /* @__PURE__ */ _.jsx(q0.Provider, {
    value: g,
    children: /* @__PURE__ */ _.jsx(U0, C({
      role: "radiogroup",
      ref: m
    }, u, {
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (H0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.any,
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: s.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The value of the selected radio button.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: s.func,
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: s.any
});
const nH = H0;
function oH({ id: e, options: t, value: r, required: n, disabled: o, readonly: i, label: a, hideLabel: l, onChange: c, onBlur: u, onFocus: d }) {
  var p;
  const { enumOptions: f, enumDisabled: m, emptyValue: h } = t, g = (S, b) => c(Ft(b, f, h)), y = ({ target: { value: S } }) => u(e, Ft(S, f, h)), v = ({ target: { value: S } }) => d(e, Ft(S, f, h)), $ = t ? t.inline : !1, E = (p = xd(r, f)) !== null && p !== void 0 ? p : null;
  return _.jsxs(_.Fragment, { children: [_n(_.jsx(Vl, { required: n, htmlFor: e, children: a || void 0 }), l), _.jsx(nH, { id: e, name: e, value: E, row: $, onChange: g, onBlur: y, onFocus: v, "aria-describedby": or(e), children: Array.isArray(f) && f.map((S, b) => {
    const x = Array.isArray(m) && m.indexOf(S.value) !== -1;
    return _.jsx(Ul, { control: _.jsx(tH, { name: e, id: Al(e, b), color: "primary" }), label: S.label, value: String(b), disabled: o || x || i }, b);
  }) })] });
}
const iH = (e) => !e || !Lr(e), sH = iH;
function aH(e) {
  return Fe("MuiSlider", e);
}
const lH = Le("MuiSlider", ["root", "active", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "disabled", "dragging", "focusVisible", "mark", "markActive", "marked", "markLabel", "markLabelActive", "rail", "sizeSmall", "thumb", "thumbColorPrimary", "thumbColorSecondary", "thumbColorError", "thumbColorSuccess", "thumbColorInfo", "thumbColorWarning", "track", "trackInverted", "trackFalse", "thumbSizeSmall", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel", "vertical"]), Or = lH, cH = (e) => {
  const {
    open: t
  } = e;
  return {
    offset: Se(t && Or.valueLabelOpen),
    circle: Or.valueLabelCircle,
    label: Or.valueLabelLabel
  };
};
function G0(e) {
  const {
    children: t,
    className: r,
    value: n
  } = e, o = cH(e);
  return t ? /* @__PURE__ */ P.cloneElement(t, {
    className: Se(t.props.className)
  }, /* @__PURE__ */ _.jsxs(P.Fragment, {
    children: [t.props.children, /* @__PURE__ */ _.jsx("span", {
      className: Se(o.offset, r),
      "aria-hidden": !0,
      children: /* @__PURE__ */ _.jsx("span", {
        className: o.circle,
        children: /* @__PURE__ */ _.jsx("span", {
          className: o.label,
          children: n
        })
      })
    })]
  })) : null;
}
process.env.NODE_ENV !== "production" && (G0.propTypes = {
  children: s.element.isRequired,
  className: s.string,
  value: s.node
});
const uH = ["aria-label", "aria-valuetext", "aria-labelledby", "component", "components", "componentsProps", "color", "classes", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "size", "step", "scale", "slotProps", "slots", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat"];
function Xh(e) {
  return e;
}
const dH = he("span", {
  name: "MuiSlider",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[`color${xe(r.color)}`], r.size !== "medium" && t[`size${xe(r.size)}`], r.marked && t.marked, r.orientation === "vertical" && t.vertical, r.track === "inverted" && t.trackInverted, r.track === !1 && t.trackFalse];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  borderRadius: 12,
  boxSizing: "content-box",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  touchAction: "none",
  color: (e.vars || e).palette[t.color].main,
  WebkitTapHighlightColor: "transparent"
}, t.orientation === "horizontal" && C({
  height: 4,
  width: "100%",
  padding: "13px 0",
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  "@media (pointer: coarse)": {
    // Reach 42px touch target, about ~8mm on screen.
    padding: "20px 0"
  }
}, t.size === "small" && {
  height: 2
}, t.marked && {
  marginBottom: 20
}), t.orientation === "vertical" && C({
  height: "100%",
  width: 4,
  padding: "0 13px",
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  "@media (pointer: coarse)": {
    // Reach 42px touch target, about ~8mm on screen.
    padding: "0 20px"
  }
}, t.size === "small" && {
  width: 2
}, t.marked && {
  marginRight: 44
}), {
  "@media print": {
    colorAdjust: "exact"
  },
  [`&.${Or.disabled}`]: {
    pointerEvents: "none",
    cursor: "default",
    color: (e.vars || e).palette.grey[400]
  },
  [`&.${Or.dragging}`]: {
    [`& .${Or.thumb}, & .${Or.track}`]: {
      transition: "none"
    }
  }
})), fH = he("span", {
  name: "MuiSlider",
  slot: "Rail",
  overridesResolver: (e, t) => t.rail
})(({
  ownerState: e
}) => C({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: 0.38
}, e.orientation === "horizontal" && {
  width: "100%",
  height: "inherit",
  top: "50%",
  transform: "translateY(-50%)"
}, e.orientation === "vertical" && {
  height: "100%",
  width: "inherit",
  left: "50%",
  transform: "translateX(-50%)"
}, e.track === "inverted" && {
  opacity: 1
})), pH = he("span", {
  name: "MuiSlider",
  slot: "Track",
  overridesResolver: (e, t) => t.track
})(({
  theme: e,
  ownerState: t
}) => {
  const r = (
    // Same logic as the LinearProgress track color
    e.palette.mode === "light" ? lg(e.palette[t.color].main, 0.62) : ag(e.palette[t.color].main, 0.5)
  );
  return C({
    display: "block",
    position: "absolute",
    borderRadius: "inherit",
    border: "1px solid currentColor",
    backgroundColor: "currentColor",
    transition: e.transitions.create(["left", "width", "bottom", "height"], {
      duration: e.transitions.duration.shortest
    })
  }, t.size === "small" && {
    border: "none"
  }, t.orientation === "horizontal" && {
    height: "inherit",
    top: "50%",
    transform: "translateY(-50%)"
  }, t.orientation === "vertical" && {
    width: "inherit",
    left: "50%",
    transform: "translateX(-50%)"
  }, t.track === !1 && {
    display: "none"
  }, t.track === "inverted" && {
    backgroundColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : r,
    borderColor: e.vars ? e.vars.palette.Slider[`${t.color}Track`] : r
  });
}), mH = he("span", {
  name: "MuiSlider",
  slot: "Thumb",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.thumb, t[`thumbColor${xe(r.color)}`], r.size !== "medium" && t[`thumbSize${xe(r.size)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  position: "absolute",
  width: 20,
  height: 20,
  boxSizing: "border-box",
  borderRadius: "50%",
  outline: 0,
  backgroundColor: "currentColor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: e.transitions.create(["box-shadow", "left", "bottom"], {
    duration: e.transitions.duration.shortest
  })
}, t.size === "small" && {
  width: 12,
  height: 12
}, t.orientation === "horizontal" && {
  top: "50%",
  transform: "translate(-50%, -50%)"
}, t.orientation === "vertical" && {
  left: "50%",
  transform: "translate(-50%, 50%)"
}, {
  "&:before": C({
    position: "absolute",
    content: '""',
    borderRadius: "inherit",
    width: "100%",
    height: "100%",
    boxShadow: (e.vars || e).shadows[2]
  }, t.size === "small" && {
    boxShadow: "none"
  }),
  "&::after": {
    position: "absolute",
    content: '""',
    borderRadius: "50%",
    // 42px is the hit target
    width: 42,
    height: 42,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  [`&:hover, &.${Or.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)` : Pt(e.palette[t.color].main, 0.16)}`,
    "@media (hover: none)": {
      boxShadow: "none"
    }
  },
  [`&.${Or.active}`]: {
    boxShadow: `0px 0px 0px 14px ${e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)` : Pt(e.palette[t.color].main, 0.16)}`
  },
  [`&.${Or.disabled}`]: {
    "&:hover": {
      boxShadow: "none"
    }
  }
})), hH = he(G0, {
  name: "MuiSlider",
  slot: "ValueLabel",
  overridesResolver: (e, t) => t.valueLabel
})(({
  theme: e,
  ownerState: t
}) => C({
  [`&.${Or.valueLabelOpen}`]: {
    transform: `${t.orientation === "vertical" ? "translateY(-50%)" : "translateY(-100%)"} scale(1)`
  },
  zIndex: 1,
  whiteSpace: "nowrap"
}, e.typography.body2, {
  fontWeight: 500,
  transition: e.transitions.create(["transform"], {
    duration: e.transitions.duration.shortest
  }),
  transform: `${t.orientation === "vertical" ? "translateY(-50%)" : "translateY(-100%)"} scale(0)`,
  position: "absolute",
  backgroundColor: (e.vars || e).palette.grey[600],
  borderRadius: 2,
  color: (e.vars || e).palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 0.75rem"
}, t.orientation === "horizontal" && {
  top: "-10px",
  transformOrigin: "bottom center",
  "&:before": {
    position: "absolute",
    content: '""',
    width: 8,
    height: 8,
    transform: "translate(-50%, 50%) rotate(45deg)",
    backgroundColor: "inherit",
    bottom: 0,
    left: "50%"
  }
}, t.orientation === "vertical" && {
  right: t.size === "small" ? "20px" : "30px",
  top: "50%",
  transformOrigin: "right center",
  "&:before": {
    position: "absolute",
    content: '""',
    width: 8,
    height: 8,
    transform: "translate(-50%, -50%) rotate(45deg)",
    backgroundColor: "inherit",
    right: -8,
    top: "50%"
  }
}, t.size === "small" && {
  fontSize: e.typography.pxToRem(12),
  padding: "0.25rem 0.5rem"
})), yH = he("span", {
  name: "MuiSlider",
  slot: "Mark",
  shouldForwardProp: (e) => ju(e) && e !== "markActive",
  overridesResolver: (e, t) => {
    const {
      markActive: r
    } = e;
    return [t.mark, r && t.markActive];
  }
})(({
  theme: e,
  ownerState: t,
  markActive: r
}) => C({
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor"
}, t.orientation === "horizontal" && {
  top: "50%",
  transform: "translate(-1px, -50%)"
}, t.orientation === "vertical" && {
  left: "50%",
  transform: "translate(-50%, 1px)"
}, r && {
  backgroundColor: (e.vars || e).palette.background.paper,
  opacity: 0.8
})), gH = he("span", {
  name: "MuiSlider",
  slot: "MarkLabel",
  shouldForwardProp: (e) => ju(e) && e !== "markLabelActive",
  overridesResolver: (e, t) => t.markLabel
})(({
  theme: e,
  ownerState: t,
  markLabelActive: r
}) => C({}, e.typography.body2, {
  color: (e.vars || e).palette.text.secondary,
  position: "absolute",
  whiteSpace: "nowrap"
}, t.orientation === "horizontal" && {
  top: 30,
  transform: "translateX(-50%)",
  "@media (pointer: coarse)": {
    top: 40
  }
}, t.orientation === "vertical" && {
  left: 36,
  transform: "translateY(50%)",
  "@media (pointer: coarse)": {
    left: 44
  }
}, r && {
  color: (e.vars || e).palette.text.primary
})), vH = (e) => {
  const {
    disabled: t,
    dragging: r,
    marked: n,
    orientation: o,
    track: i,
    classes: a,
    color: l,
    size: c
  } = e, u = {
    root: ["root", t && "disabled", r && "dragging", n && "marked", o === "vertical" && "vertical", i === "inverted" && "trackInverted", i === !1 && "trackFalse", l && `color${xe(l)}`, c && `size${xe(c)}`],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: ["thumb", t && "disabled", c && `thumbSize${xe(c)}`, l && `thumbColor${xe(l)}`],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"]
  };
  return ze(u, aH, a);
}, bH = ({
  children: e
}) => e, Y0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a, l, c, u, d, p, f, m, h, g, y, v, $, E, S, b, x, w, A, M, k;
  const H = He({
    props: t,
    name: "MuiSlider"
  }), K = Sn().direction === "rtl", {
    "aria-label": z,
    "aria-valuetext": G,
    "aria-labelledby": X,
    // eslint-disable-next-line react/prop-types
    component: J = "span",
    components: Z = {},
    componentsProps: ne = {},
    color: D = "primary",
    classes: N,
    className: W,
    disableSwap: F = !1,
    disabled: T = !1,
    getAriaLabel: R,
    getAriaValueText: B,
    marks: Q = !1,
    max: Y = 100,
    min: oe = 0,
    orientation: ie = "horizontal",
    size: ce = "medium",
    step: q = 1,
    scale: pe = Xh,
    slotProps: te,
    slots: fe,
    track: Pe = "normal",
    valueLabelDisplay: je = "off",
    valueLabelFormat: Ve = Xh
  } = H, st = Ee(H, uH), ke = C({}, H, {
    isRtl: K,
    max: Y,
    min: oe,
    classes: N,
    disabled: T,
    disableSwap: F,
    orientation: ie,
    marks: Q,
    color: D,
    size: ce,
    step: q,
    scale: pe,
    track: Pe,
    valueLabelDisplay: je,
    valueLabelFormat: Ve
  }), {
    axisProps: De,
    getRootProps: Qe,
    getHiddenInputProps: Ge,
    getThumbProps: Ue,
    open: le,
    active: ye,
    axis: be,
    focusedThumbIndex: ge,
    range: ue,
    dragging: We,
    marks: Ne,
    values: Xe,
    trackOffset: Je,
    trackLeap: Ot,
    getThumbStyle: re
  } = Ax(C({}, ke, {
    rootRef: r
  }));
  ke.marked = Ne.length > 0 && Ne.some((de) => de.label), ke.dragging = We, ke.focusedThumbIndex = ge;
  const se = vH(ke), $e = (n = (o = fe == null ? void 0 : fe.root) != null ? o : Z.Root) != null ? n : dH, Ae = (i = (a = fe == null ? void 0 : fe.rail) != null ? a : Z.Rail) != null ? i : fH, et = (l = (c = fe == null ? void 0 : fe.track) != null ? c : Z.Track) != null ? l : pH, St = (u = (d = fe == null ? void 0 : fe.thumb) != null ? d : Z.Thumb) != null ? u : mH, _t = (p = (f = fe == null ? void 0 : fe.valueLabel) != null ? f : Z.ValueLabel) != null ? p : hH, Yt = (m = (h = fe == null ? void 0 : fe.mark) != null ? h : Z.Mark) != null ? m : yH, kt = (g = (y = fe == null ? void 0 : fe.markLabel) != null ? y : Z.MarkLabel) != null ? g : gH, Ut = (v = ($ = fe == null ? void 0 : fe.input) != null ? $ : Z.Input) != null ? v : "input", wn = (E = te == null ? void 0 : te.root) != null ? E : ne.root, Tn = (S = te == null ? void 0 : te.rail) != null ? S : ne.rail, On = (b = te == null ? void 0 : te.track) != null ? b : ne.track, Rr = (x = te == null ? void 0 : te.thumb) != null ? x : ne.thumb, Wr = (w = te == null ? void 0 : te.valueLabel) != null ? w : ne.valueLabel, ci = (A = te == null ? void 0 : te.mark) != null ? A : ne.mark, ro = (M = te == null ? void 0 : te.markLabel) != null ? M : ne.markLabel, no = (k = te == null ? void 0 : te.input) != null ? k : ne.input, oo = Dt({
    elementType: $e,
    getSlotProps: Qe,
    externalSlotProps: wn,
    externalForwardedProps: st,
    additionalProps: C({}, sH($e) && {
      as: J
    }),
    ownerState: C({}, ke, wn == null ? void 0 : wn.ownerState),
    className: [se.root, W]
  }), L = Dt({
    elementType: Ae,
    externalSlotProps: Tn,
    ownerState: ke,
    className: se.rail
  }), I = Dt({
    elementType: et,
    externalSlotProps: On,
    additionalProps: {
      style: C({}, De[be].offset(Je), De[be].leap(Ot))
    },
    ownerState: C({}, ke, On == null ? void 0 : On.ownerState),
    className: se.track
  }), V = Dt({
    elementType: St,
    getSlotProps: Ue,
    externalSlotProps: Rr,
    ownerState: C({}, ke, Rr == null ? void 0 : Rr.ownerState),
    className: se.thumb
  }), O = Dt({
    elementType: _t,
    externalSlotProps: Wr,
    ownerState: C({}, ke, Wr == null ? void 0 : Wr.ownerState),
    className: se.valueLabel
  }), j = Dt({
    elementType: Yt,
    externalSlotProps: ci,
    ownerState: ke,
    className: se.mark
  }), ee = Dt({
    elementType: kt,
    externalSlotProps: ro,
    ownerState: ke,
    className: se.markLabel
  }), ae = Dt({
    elementType: Ut,
    getSlotProps: Ge,
    externalSlotProps: no,
    ownerState: ke
  });
  return /* @__PURE__ */ _.jsxs($e, C({}, oo, {
    children: [/* @__PURE__ */ _.jsx(Ae, C({}, L)), /* @__PURE__ */ _.jsx(et, C({}, I)), Ne.filter((de) => de.value >= oe && de.value <= Y).map((de, ve) => {
      const we = $a(de.value, oe, Y), me = De[be].offset(we);
      let Ce;
      return Pe === !1 ? Ce = Xe.indexOf(de.value) !== -1 : Ce = Pe === "normal" && (ue ? de.value >= Xe[0] && de.value <= Xe[Xe.length - 1] : de.value <= Xe[0]) || Pe === "inverted" && (ue ? de.value <= Xe[0] || de.value >= Xe[Xe.length - 1] : de.value >= Xe[0]), /* @__PURE__ */ _.jsxs(P.Fragment, {
        children: [/* @__PURE__ */ _.jsx(Yt, C({
          "data-index": ve
        }, j, !Lr(Yt) && {
          markActive: Ce
        }, {
          style: C({}, me, j.style),
          className: Se(j.className, Ce && se.markActive)
        })), de.label != null ? /* @__PURE__ */ _.jsx(kt, C({
          "aria-hidden": !0,
          "data-index": ve
        }, ee, !Lr(kt) && {
          markLabelActive: Ce
        }, {
          style: C({}, me, ee.style),
          className: Se(se.markLabel, ee.className, Ce && se.markLabelActive),
          children: de.label
        })) : null]
      }, ve);
    }), Xe.map((de, ve) => {
      const we = $a(de, oe, Y), me = De[be].offset(we), Ce = je === "off" ? bH : _t;
      return (
        /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
        /* @__PURE__ */ _.jsx(Ce, C({}, !Lr(Ce) && {
          valueLabelFormat: Ve,
          valueLabelDisplay: je,
          value: typeof Ve == "function" ? Ve(pe(de), ve) : Ve,
          index: ve,
          open: le === ve || ye === ve || je === "on",
          disabled: T
        }, O, {
          children: /* @__PURE__ */ _.jsx(St, C({
            "data-index": ve
          }, V, {
            className: Se(se.thumb, V.className, ye === ve && se.active, ge === ve && se.focusVisible),
            style: C({}, me, re(ve), V.style),
            children: /* @__PURE__ */ _.jsx(Ut, C({
              "data-index": ve,
              "aria-label": R ? R(ve) : z,
              "aria-valuenow": pe(de),
              "aria-labelledby": X,
              "aria-valuetext": B ? B(pe(de), ve) : G,
              value: Xe[ve]
            }, ae))
          }))
        }), ve)
      );
    })]
  }));
});
process.env.NODE_ENV !== "production" && (Y0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The label of the slider.
   */
  "aria-label": Zr(s.string, (e) => Array.isArray(e.value || e.defaultValue) && e["aria-label"] != null ? new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.") : null),
  /**
   * The id of the element containing a label for the slider.
   */
  "aria-labelledby": s.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  "aria-valuetext": Zr(s.string, (e) => Array.isArray(e.value || e.defaultValue) && e["aria-valuetext"] != null ? new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.") : null),
  /**
   * @ignore
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: s.oneOfType([s.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Input: s.elementType,
    Mark: s.elementType,
    MarkLabel: s.elementType,
    Rail: s.elementType,
    Root: s.elementType,
    Thumb: s.elementType,
    Track: s.elementType,
    ValueLabel: s.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: s.shape({
    input: s.oneOfType([s.func, s.object]),
    mark: s.oneOfType([s.func, s.object]),
    markLabel: s.oneOfType([s.func, s.object]),
    rail: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object]),
    thumb: s.oneOfType([s.func, s.object]),
    track: s.oneOfType([s.func, s.object]),
    valueLabel: s.oneOfType([s.func, s.shape({
      children: s.element,
      className: s.string,
      open: s.bool,
      style: s.object,
      value: s.number,
      valueLabelDisplay: s.oneOf(["auto", "off", "on"])
    })])
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: s.oneOfType([s.arrayOf(s.number), s.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: s.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: s.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: s.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: s.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: s.oneOfType([s.arrayOf(s.shape({
    label: s.node,
    value: s.number.isRequired
  })), s.bool]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: s.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: s.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: s.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: s.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: s.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: s.oneOf(["horizontal", "vertical"]),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: s.func,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: s.oneOfType([s.oneOf(["small", "medium"]), s.string]),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: s.shape({
    input: s.oneOfType([s.func, s.object]),
    mark: s.oneOfType([s.func, s.object]),
    markLabel: s.oneOfType([s.func, s.object]),
    rail: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object]),
    thumb: s.oneOfType([s.func, s.object]),
    track: s.oneOfType([s.func, s.object]),
    valueLabel: s.oneOfType([s.func, s.shape({
      children: s.element,
      className: s.string,
      open: s.bool,
      style: s.object,
      value: s.number,
      valueLabelDisplay: s.oneOf(["auto", "off", "on"])
    })])
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    input: s.elementType,
    mark: s.elementType,
    markLabel: s.elementType,
    rail: s.elementType,
    root: s.elementType,
    thumb: s.elementType,
    track: s.elementType,
    valueLabel: s.elementType
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: s.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: s.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: s.oneOf(["inverted", "normal", !1]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: s.oneOfType([s.arrayOf(s.number), s.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: s.oneOf(["auto", "off", "on"]),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: s.oneOfType([s.func, s.string])
});
const $H = Y0;
function SH(e) {
  const { value: t, readonly: r, disabled: n, onBlur: o, onFocus: i, options: a, schema: l, onChange: c, required: u, label: d, hideLabel: p, id: f } = e, m = { value: t, label: d, id: f, name: f, ...yb(l) }, h = (v, $) => {
    c($ ?? a.emptyValue);
  }, g = ({ target: { value: v } }) => o(f, v), y = ({ target: { value: v } }) => i(f, v);
  return _.jsxs(_.Fragment, { children: [_n(_.jsx(Vl, { required: u, htmlFor: f, children: d || void 0 }), p), _.jsx($H, { disabled: n || r, onChange: h, onBlur: g, onFocus: y, valueLabelDisplay: "auto", ...m, "aria-describedby": or(f) })] });
}
function EH(e) {
  return Fe("MuiMenuItem", e);
}
const _H = Le("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), Oi = _H, xH = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex", "className"], wH = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.dense && t.dense, r.divider && t.divider, !r.disableGutters && t.gutters];
}, TH = (e) => {
  const {
    disabled: t,
    dense: r,
    divider: n,
    disableGutters: o,
    selected: i,
    classes: a
  } = e, c = ze({
    root: ["root", r && "dense", t && "disabled", !o && "gutters", n && "divider", i && "selected"]
  }, EH, a);
  return C({}, a, c);
}, OH = he(Xn, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: wH
})(({
  theme: e,
  ownerState: t
}) => C({}, e.typography.body1, {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap"
}, !t.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, t.divider && {
  borderBottom: `1px solid ${(e.vars || e).palette.divider}`,
  backgroundClip: "padding-box"
}, {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (e.vars || e).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${Oi.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${Oi.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${Oi.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  },
  [`&.${Oi.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Oi.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${Kh.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${Kh.inset}`]: {
    marginLeft: 52
  },
  [`& .${ka.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${ka.inset}`]: {
    paddingLeft: 36
  },
  [`& .${qh.root}`]: {
    minWidth: 36
  }
}, !t.dense && {
  [e.breakpoints.up("sm")]: {
    minHeight: "auto"
  }
}, t.dense && C({
  minHeight: 32,
  // https://m2.material.io/components/menus#specs > Dense
  paddingTop: 4,
  paddingBottom: 4
}, e.typography.body2, {
  [`& .${qh.root} svg`]: {
    fontSize: "1.25rem"
  }
}))), X0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = He({
    props: t,
    name: "MuiMenuItem"
  }), {
    autoFocus: o = !1,
    component: i = "li",
    dense: a = !1,
    divider: l = !1,
    disableGutters: c = !1,
    focusVisibleClassName: u,
    role: d = "menuitem",
    tabIndex: p,
    className: f
  } = n, m = Ee(n, xH), h = P.useContext(Yr), g = P.useMemo(() => ({
    dense: a || h.dense || !1,
    disableGutters: c
  }), [h.dense, a, c]), y = P.useRef(null);
  gr(() => {
    o && (y.current ? y.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered."));
  }, [o]);
  const v = C({}, n, {
    dense: g.dense,
    divider: l,
    disableGutters: c
  }), $ = TH(n), E = Nt(y, r);
  let S;
  return n.disabled || (S = p !== void 0 ? p : -1), /* @__PURE__ */ _.jsx(Yr.Provider, {
    value: g,
    children: /* @__PURE__ */ _.jsx(OH, C({
      ref: E,
      role: d,
      tabIndex: S,
      component: i,
      focusVisibleClassName: Se($.focusVisible, u),
      className: Se($.root, f)
    }, m, {
      ownerState: v,
      classes: $
    }))
  });
});
process.env.NODE_ENV !== "production" && (X0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: s.bool,
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: s.bool,
  /**
   * @ignore
   */
  disabled: s.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: s.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: s.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: s.string,
  /**
   * @ignore
   */
  role: s.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * @default 0
   */
  tabIndex: s.number
});
const CH = X0;
function PH({
  schema: e,
  id: t,
  name: r,
  // remove this from textFieldProps
  options: n,
  label: o,
  hideLabel: i,
  required: a,
  disabled: l,
  placeholder: c,
  readonly: u,
  value: d,
  multiple: p,
  autofocus: f,
  onChange: m,
  onBlur: h,
  onFocus: g,
  rawErrors: y = [],
  registry: v,
  uiSchema: $,
  hideError: E,
  formContext: S,
  ...b
}) {
  const { enumOptions: x, enumDisabled: w, emptyValue: A } = n;
  p = typeof p > "u" ? !1 : !!p;
  const M = p ? [] : "", k = typeof d > "u" || p && d.length < 1 || !p && d === M, H = ({ target: { value: G } }) => m(Ft(G, x, A)), U = ({ target: { value: G } }) => h(t, Ft(G, x, A)), K = ({ target: { value: G } }) => g(t, Ft(G, x, A)), z = xd(d, x, p);
  return _.jsx(Ud, { id: t, name: t, label: _n(o || void 0, i, void 0), value: !k && typeof z < "u" ? z : M, required: a, disabled: l || u, autoFocus: f, placeholder: c, error: y.length > 0, onChange: H, onBlur: U, onFocus: K, ...b, select: !0, InputLabelProps: {
    ...b.InputLabelProps,
    shrink: !k
  }, SelectProps: {
    ...b.SelectProps,
    multiple: p
  }, "aria-describedby": or(t), children: Array.isArray(x) && x.map(({ value: G, label: X }, J) => {
    const Z = Array.isArray(w) && w.indexOf(G) !== -1;
    return _.jsx(CH, { value: String(J), disabled: Z, children: X }, J);
  }) });
}
function RH(e) {
  const { options: t, registry: r } = e, n = Ke("BaseInputTemplate", r, t);
  let o = 5;
  return (typeof t.rows == "string" || typeof t.rows == "number") && (o = t.rows), _.jsx(n, { ...e, multiline: !0, rows: o });
}
function IH() {
  return {
    CheckboxWidget: D8,
    CheckboxesWidget: z8,
    RadioWidget: oH,
    RangeWidget: SH,
    SelectWidget: PH,
    TextareaWidget: RH
  };
}
function NH() {
  return {
    templates: p8(),
    widgets: IH()
  };
}
function AH() {
  return G9(NH());
}
const jH = AH();
var lu = { exports: {} }, J0 = {}, Cr = {}, Fo = {}, $s = {}, Be = {}, ns = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor($) {
      if (super(), !e.IDENTIFIER.test($))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = $;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor($) {
      super(), this._items = typeof $ == "string" ? [$] : $;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const $ = this._items[0];
      return $ === "" || $ === '""';
    }
    get str() {
      var $;
      return ($ = this._str) !== null && $ !== void 0 ? $ : this._str = this._items.reduce((E, S) => `${E}${S}`, "");
    }
    get names() {
      var $;
      return ($ = this._names) !== null && $ !== void 0 ? $ : this._names = this._items.reduce((E, S) => (S instanceof r && (E[S.str] = (E[S.str] || 0) + 1), E), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function o(v, ...$) {
    const E = [v[0]];
    let S = 0;
    for (; S < $.length; )
      l(E, $[S]), E.push(v[++S]);
    return new n(E);
  }
  e._ = o;
  const i = new n("+");
  function a(v, ...$) {
    const E = [m(v[0])];
    let S = 0;
    for (; S < $.length; )
      E.push(i), l(E, $[S]), E.push(i, m(v[++S]));
    return c(E), new n(E);
  }
  e.str = a;
  function l(v, $) {
    $ instanceof n ? v.push(...$._items) : $ instanceof r ? v.push($) : v.push(p($));
  }
  e.addCodeArg = l;
  function c(v) {
    let $ = 1;
    for (; $ < v.length - 1; ) {
      if (v[$] === i) {
        const E = u(v[$ - 1], v[$ + 1]);
        if (E !== void 0) {
          v.splice($ - 1, 3, E);
          continue;
        }
        v[$++] = "+";
      }
      $++;
    }
  }
  function u(v, $) {
    if ($ === '""')
      return v;
    if (v === '""')
      return $;
    if (typeof v == "string")
      return $ instanceof r || v[v.length - 1] !== '"' ? void 0 : typeof $ != "string" ? `${v.slice(0, -1)}${$}"` : $[0] === '"' ? v.slice(0, -1) + $.slice(1) : void 0;
    if (typeof $ == "string" && $[0] === '"' && !(v instanceof r))
      return `"${v}${$.slice(1)}`;
  }
  function d(v, $) {
    return $.emptyStr() ? v : v.emptyStr() ? $ : a`${v}${$}`;
  }
  e.strConcat = d;
  function p(v) {
    return typeof v == "number" || typeof v == "boolean" || v === null ? v : m(Array.isArray(v) ? v.join(",") : v);
  }
  function f(v) {
    return new n(m(v));
  }
  e.stringify = f;
  function m(v) {
    return JSON.stringify(v).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = m;
  function h(v) {
    return typeof v == "string" && e.IDENTIFIER.test(v) ? new n(`.${v}`) : o`[${v}]`;
  }
  e.getProperty = h;
  function g(v) {
    if (typeof v == "string" && e.IDENTIFIER.test(v))
      return new n(`${v}`);
    throw new Error(`CodeGen: invalid export name: ${v}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function y(v) {
    return new n(v.toString());
  }
  e.regexpCode = y;
})(ns);
var cu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = ns;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n = e.UsedValueState || (e.UsedValueState = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class o {
    constructor({ prefixes: u, parent: d } = {}) {
      this._names = {}, this._prefixes = u, this._parent = d;
    }
    toName(u) {
      return u instanceof t.Name ? u : this.name(u);
    }
    name(u) {
      return new t.Name(this._newName(u));
    }
    _newName(u) {
      const d = this._names[u] || this._nameGroup(u);
      return `${u}${d.index++}`;
    }
    _nameGroup(u) {
      var d, p;
      if (!((p = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || p === void 0) && p.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  e.Scope = o;
  class i extends t.Name {
    constructor(u, d) {
      super(d), this.prefix = u;
    }
    setValue(u, { property: d, itemIndex: p }) {
      this.value = u, this.scopePath = (0, t._)`.${new t.Name(d)}[${p}]`;
    }
  }
  e.ValueScopeName = i;
  const a = (0, t._)`\n`;
  class l extends o {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new i(u, this._newName(u));
    }
    value(u, d) {
      var p;
      if (d.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const f = this.toName(u), { prefix: m } = f, h = (p = d.key) !== null && p !== void 0 ? p : d.ref;
      let g = this._values[m];
      if (g) {
        const $ = g.get(h);
        if ($)
          return $;
      } else
        g = this._values[m] = /* @__PURE__ */ new Map();
      g.set(h, f);
      const y = this._scope[m] || (this._scope[m] = []), v = y.length;
      return y[v] = d.ref, f.setValue(d, { property: m, itemIndex: v }), f;
    }
    getValue(u, d) {
      const p = this._values[u];
      if (p)
        return p.get(d);
    }
    scopeRefs(u, d = this._values) {
      return this._reduceValues(d, (p) => {
        if (p.scopePath === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return (0, t._)`${u}${p.scopePath}`;
      });
    }
    scopeCode(u = this._values, d, p) {
      return this._reduceValues(u, (f) => {
        if (f.value === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return f.value.code;
      }, d, p);
    }
    _reduceValues(u, d, p = {}, f) {
      let m = t.nil;
      for (const h in u) {
        const g = u[h];
        if (!g)
          continue;
        const y = p[h] = p[h] || /* @__PURE__ */ new Map();
        g.forEach((v) => {
          if (y.has(v))
            return;
          y.set(v, n.Started);
          let $ = d(v);
          if ($) {
            const E = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            m = (0, t._)`${m}${E} ${v} = ${$};${this.opts._n}`;
          } else if ($ = f == null ? void 0 : f(v))
            m = (0, t._)`${m}${$}${this.opts._n}`;
          else
            throw new r(v);
          y.set(v, n.Completed);
        });
      }
      return m;
    }
  }
  e.ValueScope = l;
})(cu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = ns, r = cu;
  var n = ns;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var o = cu;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return o.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return o.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return o.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return o.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class i {
    optimizeNodes() {
      return this;
    }
    optimizeNames(T, R) {
      return this;
    }
  }
  class a extends i {
    constructor(T, R, B) {
      super(), this.varKind = T, this.name = R, this.rhs = B;
    }
    render({ es5: T, _n: R }) {
      const B = T ? r.varKinds.var : this.varKind, Q = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${B} ${this.name}${Q};` + R;
    }
    optimizeNames(T, R) {
      if (T[this.name.str])
        return this.rhs && (this.rhs = z(this.rhs, T, R)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends i {
    constructor(T, R, B) {
      super(), this.lhs = T, this.rhs = R, this.sideEffects = B;
    }
    render({ _n: T }) {
      return `${this.lhs} = ${this.rhs};` + T;
    }
    optimizeNames(T, R) {
      if (!(this.lhs instanceof t.Name && !T[this.lhs.str] && !this.sideEffects))
        return this.rhs = z(this.rhs, T, R), this;
    }
    get names() {
      const T = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return K(T, this.rhs);
    }
  }
  class c extends l {
    constructor(T, R, B, Q) {
      super(T, B, Q), this.op = R;
    }
    render({ _n: T }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + T;
    }
  }
  class u extends i {
    constructor(T) {
      super(), this.label = T, this.names = {};
    }
    render({ _n: T }) {
      return `${this.label}:` + T;
    }
  }
  class d extends i {
    constructor(T) {
      super(), this.label = T, this.names = {};
    }
    render({ _n: T }) {
      return `break${this.label ? ` ${this.label}` : ""};` + T;
    }
  }
  class p extends i {
    constructor(T) {
      super(), this.error = T;
    }
    render({ _n: T }) {
      return `throw ${this.error};` + T;
    }
    get names() {
      return this.error.names;
    }
  }
  class f extends i {
    constructor(T) {
      super(), this.code = T;
    }
    render({ _n: T }) {
      return `${this.code};` + T;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(T, R) {
      return this.code = z(this.code, T, R), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class m extends i {
    constructor(T = []) {
      super(), this.nodes = T;
    }
    render(T) {
      return this.nodes.reduce((R, B) => R + B.render(T), "");
    }
    optimizeNodes() {
      const { nodes: T } = this;
      let R = T.length;
      for (; R--; ) {
        const B = T[R].optimizeNodes();
        Array.isArray(B) ? T.splice(R, 1, ...B) : B ? T[R] = B : T.splice(R, 1);
      }
      return T.length > 0 ? this : void 0;
    }
    optimizeNames(T, R) {
      const { nodes: B } = this;
      let Q = B.length;
      for (; Q--; ) {
        const Y = B[Q];
        Y.optimizeNames(T, R) || (G(T, Y.names), B.splice(Q, 1));
      }
      return B.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((T, R) => U(T, R.names), {});
    }
  }
  class h extends m {
    render(T) {
      return "{" + T._n + super.render(T) + "}" + T._n;
    }
  }
  class g extends m {
  }
  class y extends h {
  }
  y.kind = "else";
  class v extends h {
    constructor(T, R) {
      super(R), this.condition = T;
    }
    render(T) {
      let R = `if(${this.condition})` + super.render(T);
      return this.else && (R += "else " + this.else.render(T)), R;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const T = this.condition;
      if (T === !0)
        return this.nodes;
      let R = this.else;
      if (R) {
        const B = R.optimizeNodes();
        R = this.else = Array.isArray(B) ? new y(B) : B;
      }
      if (R)
        return T === !1 ? R instanceof v ? R : R.nodes : this.nodes.length ? this : new v(X(T), R instanceof v ? [R] : R.nodes);
      if (!(T === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(T, R) {
      var B;
      if (this.else = (B = this.else) === null || B === void 0 ? void 0 : B.optimizeNames(T, R), !!(super.optimizeNames(T, R) || this.else))
        return this.condition = z(this.condition, T, R), this;
    }
    get names() {
      const T = super.names;
      return K(T, this.condition), this.else && U(T, this.else.names), T;
    }
  }
  v.kind = "if";
  class $ extends h {
  }
  $.kind = "for";
  class E extends $ {
    constructor(T) {
      super(), this.iteration = T;
    }
    render(T) {
      return `for(${this.iteration})` + super.render(T);
    }
    optimizeNames(T, R) {
      if (super.optimizeNames(T, R))
        return this.iteration = z(this.iteration, T, R), this;
    }
    get names() {
      return U(super.names, this.iteration.names);
    }
  }
  class S extends $ {
    constructor(T, R, B, Q) {
      super(), this.varKind = T, this.name = R, this.from = B, this.to = Q;
    }
    render(T) {
      const R = T.es5 ? r.varKinds.var : this.varKind, { name: B, from: Q, to: Y } = this;
      return `for(${R} ${B}=${Q}; ${B}<${Y}; ${B}++)` + super.render(T);
    }
    get names() {
      const T = K(super.names, this.from);
      return K(T, this.to);
    }
  }
  class b extends $ {
    constructor(T, R, B, Q) {
      super(), this.loop = T, this.varKind = R, this.name = B, this.iterable = Q;
    }
    render(T) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(T);
    }
    optimizeNames(T, R) {
      if (super.optimizeNames(T, R))
        return this.iterable = z(this.iterable, T, R), this;
    }
    get names() {
      return U(super.names, this.iterable.names);
    }
  }
  class x extends h {
    constructor(T, R, B) {
      super(), this.name = T, this.args = R, this.async = B;
    }
    render(T) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(T);
    }
  }
  x.kind = "func";
  class w extends m {
    render(T) {
      return "return " + super.render(T);
    }
  }
  w.kind = "return";
  class A extends h {
    render(T) {
      let R = "try" + super.render(T);
      return this.catch && (R += this.catch.render(T)), this.finally && (R += this.finally.render(T)), R;
    }
    optimizeNodes() {
      var T, R;
      return super.optimizeNodes(), (T = this.catch) === null || T === void 0 || T.optimizeNodes(), (R = this.finally) === null || R === void 0 || R.optimizeNodes(), this;
    }
    optimizeNames(T, R) {
      var B, Q;
      return super.optimizeNames(T, R), (B = this.catch) === null || B === void 0 || B.optimizeNames(T, R), (Q = this.finally) === null || Q === void 0 || Q.optimizeNames(T, R), this;
    }
    get names() {
      const T = super.names;
      return this.catch && U(T, this.catch.names), this.finally && U(T, this.finally.names), T;
    }
  }
  class M extends h {
    constructor(T) {
      super(), this.error = T;
    }
    render(T) {
      return `catch(${this.error})` + super.render(T);
    }
  }
  M.kind = "catch";
  class k extends h {
    render(T) {
      return "finally" + super.render(T);
    }
  }
  k.kind = "finally";
  class H {
    constructor(T, R = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...R, _n: R.lines ? `
` : "" }, this._extScope = T, this._scope = new r.Scope({ parent: T }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(T) {
      return this._scope.name(T);
    }
    // reserves unique name in the external scope
    scopeName(T) {
      return this._extScope.name(T);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(T, R) {
      const B = this._extScope.value(T, R);
      return (this._values[B.prefix] || (this._values[B.prefix] = /* @__PURE__ */ new Set())).add(B), B;
    }
    getScopeValue(T, R) {
      return this._extScope.getValue(T, R);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(T) {
      return this._extScope.scopeRefs(T, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(T, R, B, Q) {
      const Y = this._scope.toName(R);
      return B !== void 0 && Q && (this._constants[Y.str] = B), this._leafNode(new a(T, Y, B)), Y;
    }
    // `const` declaration (`var` in es5 mode)
    const(T, R, B) {
      return this._def(r.varKinds.const, T, R, B);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(T, R, B) {
      return this._def(r.varKinds.let, T, R, B);
    }
    // `var` declaration with optional assignment
    var(T, R, B) {
      return this._def(r.varKinds.var, T, R, B);
    }
    // assignment code
    assign(T, R, B) {
      return this._leafNode(new l(T, R, B));
    }
    // `+=` code
    add(T, R) {
      return this._leafNode(new c(T, e.operators.ADD, R));
    }
    // appends passed SafeExpr to code or executes Block
    code(T) {
      return typeof T == "function" ? T() : T !== t.nil && this._leafNode(new f(T)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...T) {
      const R = ["{"];
      for (const [B, Q] of T)
        R.length > 1 && R.push(","), R.push(B), (B !== Q || this.opts.es5) && (R.push(":"), (0, t.addCodeArg)(R, Q));
      return R.push("}"), new t._Code(R);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(T, R, B) {
      if (this._blockNode(new v(T)), R && B)
        this.code(R).else().code(B).endIf();
      else if (R)
        this.code(R).endIf();
      else if (B)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(T) {
      return this._elseNode(new v(T));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new y());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(v, y);
    }
    _for(T, R) {
      return this._blockNode(T), R && this.code(R).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(T, R) {
      return this._for(new E(T), R);
    }
    // `for` statement for a range of values
    forRange(T, R, B, Q, Y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const oe = this._scope.toName(T);
      return this._for(new S(Y, oe, R, B), () => Q(oe));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(T, R, B, Q = r.varKinds.const) {
      const Y = this._scope.toName(T);
      if (this.opts.es5) {
        const oe = R instanceof t.Name ? R : this.var("_arr", R);
        return this.forRange("_i", 0, (0, t._)`${oe}.length`, (ie) => {
          this.var(Y, (0, t._)`${oe}[${ie}]`), B(Y);
        });
      }
      return this._for(new b("of", Q, Y, R), () => B(Y));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(T, R, B, Q = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(T, (0, t._)`Object.keys(${R})`, B);
      const Y = this._scope.toName(T);
      return this._for(new b("in", Q, Y, R), () => B(Y));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode($);
    }
    // `label` statement
    label(T) {
      return this._leafNode(new u(T));
    }
    // `break` statement
    break(T) {
      return this._leafNode(new d(T));
    }
    // `return` statement
    return(T) {
      const R = new w();
      if (this._blockNode(R), this.code(T), R.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(w);
    }
    // `try` statement
    try(T, R, B) {
      if (!R && !B)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const Q = new A();
      if (this._blockNode(Q), this.code(T), R) {
        const Y = this.name("e");
        this._currNode = Q.catch = new M(Y), R(Y);
      }
      return B && (this._currNode = Q.finally = new k(), this.code(B)), this._endBlockNode(M, k);
    }
    // `throw` statement
    throw(T) {
      return this._leafNode(new p(T));
    }
    // start self-balancing block
    block(T, R) {
      return this._blockStarts.push(this._nodes.length), T && this.code(T).endBlock(R), this;
    }
    // end the current self-balancing block
    endBlock(T) {
      const R = this._blockStarts.pop();
      if (R === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const B = this._nodes.length - R;
      if (B < 0 || T !== void 0 && B !== T)
        throw new Error(`CodeGen: wrong number of nodes: ${B} vs ${T} expected`);
      return this._nodes.length = R, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(T, R = t.nil, B, Q) {
      return this._blockNode(new x(T, R, B)), Q && this.code(Q).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(x);
    }
    optimize(T = 1) {
      for (; T-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(T) {
      return this._currNode.nodes.push(T), this;
    }
    _blockNode(T) {
      this._currNode.nodes.push(T), this._nodes.push(T);
    }
    _endBlockNode(T, R) {
      const B = this._currNode;
      if (B instanceof T || R && B instanceof R)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${R ? `${T.kind}/${R.kind}` : T.kind}"`);
    }
    _elseNode(T) {
      const R = this._currNode;
      if (!(R instanceof v))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = R.else = T, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const T = this._nodes;
      return T[T.length - 1];
    }
    set _currNode(T) {
      const R = this._nodes;
      R[R.length - 1] = T;
    }
  }
  e.CodeGen = H;
  function U(F, T) {
    for (const R in T)
      F[R] = (F[R] || 0) + (T[R] || 0);
    return F;
  }
  function K(F, T) {
    return T instanceof t._CodeOrName ? U(F, T.names) : F;
  }
  function z(F, T, R) {
    if (F instanceof t.Name)
      return B(F);
    if (!Q(F))
      return F;
    return new t._Code(F._items.reduce((Y, oe) => (oe instanceof t.Name && (oe = B(oe)), oe instanceof t._Code ? Y.push(...oe._items) : Y.push(oe), Y), []));
    function B(Y) {
      const oe = R[Y.str];
      return oe === void 0 || T[Y.str] !== 1 ? Y : (delete T[Y.str], oe);
    }
    function Q(Y) {
      return Y instanceof t._Code && Y._items.some((oe) => oe instanceof t.Name && T[oe.str] === 1 && R[oe.str] !== void 0);
    }
  }
  function G(F, T) {
    for (const R in T)
      F[R] = (F[R] || 0) - (T[R] || 0);
  }
  function X(F) {
    return typeof F == "boolean" || typeof F == "number" || F === null ? !F : (0, t._)`!${W(F)}`;
  }
  e.not = X;
  const J = N(e.operators.AND);
  function Z(...F) {
    return F.reduce(J);
  }
  e.and = Z;
  const ne = N(e.operators.OR);
  function D(...F) {
    return F.reduce(ne);
  }
  e.or = D;
  function N(F) {
    return (T, R) => T === t.nil ? R : R === t.nil ? T : (0, t._)`${W(T)} ${F} ${W(R)}`;
  }
  function W(F) {
    return F instanceof t.Name ? F : (0, t._)`(${F})`;
  }
})(Be);
var tt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.checkStrictMode = e.getErrorPath = e.Type = e.useFunc = e.setEvaluated = e.evaluatedPropsToName = e.mergeEvaluated = e.eachItem = e.unescapeJsonPointer = e.escapeJsonPointer = e.escapeFragment = e.unescapeFragment = e.schemaRefOrVal = e.schemaHasRulesButRef = e.schemaHasRules = e.checkUnknownRules = e.alwaysValidSchema = e.toHash = void 0;
  const t = Be, r = ns;
  function n(x) {
    const w = {};
    for (const A of x)
      w[A] = !0;
    return w;
  }
  e.toHash = n;
  function o(x, w) {
    return typeof w == "boolean" ? w : Object.keys(w).length === 0 ? !0 : (i(x, w), !a(w, x.self.RULES.all));
  }
  e.alwaysValidSchema = o;
  function i(x, w = x.schema) {
    const { opts: A, self: M } = x;
    if (!A.strictSchema || typeof w == "boolean")
      return;
    const k = M.RULES.keywords;
    for (const H in w)
      k[H] || b(x, `unknown keyword: "${H}"`);
  }
  e.checkUnknownRules = i;
  function a(x, w) {
    if (typeof x == "boolean")
      return !x;
    for (const A in x)
      if (w[A])
        return !0;
    return !1;
  }
  e.schemaHasRules = a;
  function l(x, w) {
    if (typeof x == "boolean")
      return !x;
    for (const A in x)
      if (A !== "$ref" && w.all[A])
        return !0;
    return !1;
  }
  e.schemaHasRulesButRef = l;
  function c({ topSchemaRef: x, schemaPath: w }, A, M, k) {
    if (!k) {
      if (typeof A == "number" || typeof A == "boolean")
        return A;
      if (typeof A == "string")
        return (0, t._)`${A}`;
    }
    return (0, t._)`${x}${w}${(0, t.getProperty)(M)}`;
  }
  e.schemaRefOrVal = c;
  function u(x) {
    return f(decodeURIComponent(x));
  }
  e.unescapeFragment = u;
  function d(x) {
    return encodeURIComponent(p(x));
  }
  e.escapeFragment = d;
  function p(x) {
    return typeof x == "number" ? `${x}` : x.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  e.escapeJsonPointer = p;
  function f(x) {
    return x.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  e.unescapeJsonPointer = f;
  function m(x, w) {
    if (Array.isArray(x))
      for (const A of x)
        w(A);
    else
      w(x);
  }
  e.eachItem = m;
  function h({ mergeNames: x, mergeToName: w, mergeValues: A, resultToName: M }) {
    return (k, H, U, K) => {
      const z = U === void 0 ? H : U instanceof t.Name ? (H instanceof t.Name ? x(k, H, U) : w(k, H, U), U) : H instanceof t.Name ? (w(k, U, H), H) : A(H, U);
      return K === t.Name && !(z instanceof t.Name) ? M(k, z) : z;
    };
  }
  e.mergeEvaluated = {
    props: h({
      mergeNames: (x, w, A) => x.if((0, t._)`${A} !== true && ${w} !== undefined`, () => {
        x.if((0, t._)`${w} === true`, () => x.assign(A, !0), () => x.assign(A, (0, t._)`${A} || {}`).code((0, t._)`Object.assign(${A}, ${w})`));
      }),
      mergeToName: (x, w, A) => x.if((0, t._)`${A} !== true`, () => {
        w === !0 ? x.assign(A, !0) : (x.assign(A, (0, t._)`${A} || {}`), y(x, A, w));
      }),
      mergeValues: (x, w) => x === !0 ? !0 : { ...x, ...w },
      resultToName: g
    }),
    items: h({
      mergeNames: (x, w, A) => x.if((0, t._)`${A} !== true && ${w} !== undefined`, () => x.assign(A, (0, t._)`${w} === true ? true : ${A} > ${w} ? ${A} : ${w}`)),
      mergeToName: (x, w, A) => x.if((0, t._)`${A} !== true`, () => x.assign(A, w === !0 ? !0 : (0, t._)`${A} > ${w} ? ${A} : ${w}`)),
      mergeValues: (x, w) => x === !0 ? !0 : Math.max(x, w),
      resultToName: (x, w) => x.var("items", w)
    })
  };
  function g(x, w) {
    if (w === !0)
      return x.var("props", !0);
    const A = x.var("props", (0, t._)`{}`);
    return w !== void 0 && y(x, A, w), A;
  }
  e.evaluatedPropsToName = g;
  function y(x, w, A) {
    Object.keys(A).forEach((M) => x.assign((0, t._)`${w}${(0, t.getProperty)(M)}`, !0));
  }
  e.setEvaluated = y;
  const v = {};
  function $(x, w) {
    return x.scopeValue("func", {
      ref: w,
      code: v[w.code] || (v[w.code] = new r._Code(w.code))
    });
  }
  e.useFunc = $;
  var E;
  (function(x) {
    x[x.Num = 0] = "Num", x[x.Str = 1] = "Str";
  })(E = e.Type || (e.Type = {}));
  function S(x, w, A) {
    if (x instanceof t.Name) {
      const M = w === E.Num;
      return A ? M ? (0, t._)`"[" + ${x} + "]"` : (0, t._)`"['" + ${x} + "']"` : M ? (0, t._)`"/" + ${x}` : (0, t._)`"/" + ${x}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return A ? (0, t.getProperty)(x).toString() : "/" + p(x);
  }
  e.getErrorPath = S;
  function b(x, w, A = x.opts.strictSchema) {
    if (A) {
      if (w = `strict mode: ${w}`, A === !0)
        throw new Error(w);
      x.self.logger.warn(w);
    }
  }
  e.checkStrictMode = b;
})(tt);
var Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
const Wt = Be, kH = {
  // validation function arguments
  data: new Wt.Name("data"),
  // args passed from referencing schema
  valCxt: new Wt.Name("valCxt"),
  instancePath: new Wt.Name("instancePath"),
  parentData: new Wt.Name("parentData"),
  parentDataProperty: new Wt.Name("parentDataProperty"),
  rootData: new Wt.Name("rootData"),
  dynamicAnchors: new Wt.Name("dynamicAnchors"),
  // function scoped variables
  vErrors: new Wt.Name("vErrors"),
  errors: new Wt.Name("errors"),
  this: new Wt.Name("this"),
  // "globals"
  self: new Wt.Name("self"),
  scope: new Wt.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Wt.Name("json"),
  jsonPos: new Wt.Name("jsonPos"),
  jsonLen: new Wt.Name("jsonLen"),
  jsonPart: new Wt.Name("jsonPart")
};
Ur.default = kH;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Be, r = tt, n = Ur;
  e.keywordError = {
    message: ({ keyword: y }) => (0, t.str)`must pass "${y}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: y, schemaType: v }) => v ? (0, t.str)`"${y}" keyword must be ${v} ($data)` : (0, t.str)`"${y}" keyword is invalid ($data)`
  };
  function o(y, v = e.keywordError, $, E) {
    const { it: S } = y, { gen: b, compositeRule: x, allErrors: w } = S, A = p(y, v, $);
    E ?? (x || w) ? c(b, A) : u(S, (0, t._)`[${A}]`);
  }
  e.reportError = o;
  function i(y, v = e.keywordError, $) {
    const { it: E } = y, { gen: S, compositeRule: b, allErrors: x } = E, w = p(y, v, $);
    c(S, w), b || x || u(E, n.default.vErrors);
  }
  e.reportExtraError = i;
  function a(y, v) {
    y.assign(n.default.errors, v), y.if((0, t._)`${n.default.vErrors} !== null`, () => y.if(v, () => y.assign((0, t._)`${n.default.vErrors}.length`, v), () => y.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: y, keyword: v, schemaValue: $, data: E, errsCount: S, it: b }) {
    if (S === void 0)
      throw new Error("ajv implementation error");
    const x = y.name("err");
    y.forRange("i", S, n.default.errors, (w) => {
      y.const(x, (0, t._)`${n.default.vErrors}[${w}]`), y.if((0, t._)`${x}.instancePath === undefined`, () => y.assign((0, t._)`${x}.instancePath`, (0, t.strConcat)(n.default.instancePath, b.errorPath))), y.assign((0, t._)`${x}.schemaPath`, (0, t.str)`${b.errSchemaPath}/${v}`), b.opts.verbose && (y.assign((0, t._)`${x}.schema`, $), y.assign((0, t._)`${x}.data`, E));
    });
  }
  e.extendErrors = l;
  function c(y, v) {
    const $ = y.const("err", v);
    y.if((0, t._)`${n.default.vErrors} === null`, () => y.assign(n.default.vErrors, (0, t._)`[${$}]`), (0, t._)`${n.default.vErrors}.push(${$})`), y.code((0, t._)`${n.default.errors}++`);
  }
  function u(y, v) {
    const { gen: $, validateName: E, schemaEnv: S } = y;
    S.$async ? $.throw((0, t._)`new ${y.ValidationError}(${v})`) : ($.assign((0, t._)`${E}.errors`, v), $.return(!1));
  }
  const d = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function p(y, v, $) {
    const { createErrors: E } = y.it;
    return E === !1 ? (0, t._)`{}` : f(y, v, $);
  }
  function f(y, v, $ = {}) {
    const { gen: E, it: S } = y, b = [
      m(S, $),
      h(y, $)
    ];
    return g(y, v, b), E.object(...b);
  }
  function m({ errorPath: y }, { instancePath: v }) {
    const $ = v ? (0, t.str)`${y}${(0, r.getErrorPath)(v, r.Type.Str)}` : y;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, $)];
  }
  function h({ keyword: y, it: { errSchemaPath: v } }, { schemaPath: $, parentSchema: E }) {
    let S = E ? v : (0, t.str)`${v}/${y}`;
    return $ && (S = (0, t.str)`${S}${(0, r.getErrorPath)($, r.Type.Str)}`), [d.schemaPath, S];
  }
  function g(y, { params: v, message: $ }, E) {
    const { keyword: S, data: b, schemaValue: x, it: w } = y, { opts: A, propertyName: M, topSchemaRef: k, schemaPath: H } = w;
    E.push([d.keyword, S], [d.params, typeof v == "function" ? v(y) : v || (0, t._)`{}`]), A.messages && E.push([d.message, typeof $ == "function" ? $(y) : $]), A.verbose && E.push([d.schema, x], [d.parentSchema, (0, t._)`${k}${H}`], [n.default.data, b]), M && E.push([d.propertyName, M]);
  }
})($s);
Object.defineProperty(Fo, "__esModule", { value: !0 });
Fo.boolOrEmptySchema = Fo.topBoolOrEmptySchema = void 0;
const MH = $s, DH = Be, FH = Ur, LH = {
  message: "boolean schema is false"
};
function BH(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Z0(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(FH.default.data) : (t.assign((0, DH._)`${n}.errors`, null), t.return(!0));
}
Fo.topBoolOrEmptySchema = BH;
function VH(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Z0(e)) : r.var(t, !0);
}
Fo.boolOrEmptySchema = VH;
function Z0(e, t) {
  const { gen: r, data: n } = e, o = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, MH.reportError)(o, LH, void 0, t);
}
var Ss = {}, Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.getRules = Gn.isJSONType = void 0;
const zH = ["string", "number", "integer", "boolean", "null", "object", "array"], UH = new Set(zH);
function WH(e) {
  return typeof e == "string" && UH.has(e);
}
Gn.isJSONType = WH;
function qH() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Gn.getRules = qH;
var Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.shouldUseRule = Xr.shouldUseGroup = Xr.schemaHasRulesForType = void 0;
function KH({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Q0(e, n);
}
Xr.schemaHasRulesForType = KH;
function Q0(e, t) {
  return t.rules.some((r) => e$(e, r));
}
Xr.shouldUseGroup = Q0;
function e$(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Xr.shouldUseRule = e$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.reportTypeError = e.checkDataTypes = e.checkDataType = e.coerceAndCheckDataType = e.getJSONTypes = e.getSchemaTypes = e.DataType = void 0;
  const t = Gn, r = Xr, n = $s, o = Be, i = tt;
  var a;
  (function(E) {
    E[E.Correct = 0] = "Correct", E[E.Wrong = 1] = "Wrong";
  })(a = e.DataType || (e.DataType = {}));
  function l(E) {
    const S = c(E.type);
    if (S.includes("null")) {
      if (E.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!S.length && E.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      E.nullable === !0 && S.push("null");
    }
    return S;
  }
  e.getSchemaTypes = l;
  function c(E) {
    const S = Array.isArray(E) ? E : E ? [E] : [];
    if (S.every(t.isJSONType))
      return S;
    throw new Error("type must be JSONType or JSONType[]: " + S.join(","));
  }
  e.getJSONTypes = c;
  function u(E, S) {
    const { gen: b, data: x, opts: w } = E, A = p(S, w.coerceTypes), M = S.length > 0 && !(A.length === 0 && S.length === 1 && (0, r.schemaHasRulesForType)(E, S[0]));
    if (M) {
      const k = g(S, x, w.strictNumbers, a.Wrong);
      b.if(k, () => {
        A.length ? f(E, S, A) : v(E);
      });
    }
    return M;
  }
  e.coerceAndCheckDataType = u;
  const d = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function p(E, S) {
    return S ? E.filter((b) => d.has(b) || S === "array" && b === "array") : [];
  }
  function f(E, S, b) {
    const { gen: x, data: w, opts: A } = E, M = x.let("dataType", (0, o._)`typeof ${w}`), k = x.let("coerced", (0, o._)`undefined`);
    A.coerceTypes === "array" && x.if((0, o._)`${M} == 'object' && Array.isArray(${w}) && ${w}.length == 1`, () => x.assign(w, (0, o._)`${w}[0]`).assign(M, (0, o._)`typeof ${w}`).if(g(S, w, A.strictNumbers), () => x.assign(k, w))), x.if((0, o._)`${k} !== undefined`);
    for (const U of b)
      (d.has(U) || U === "array" && A.coerceTypes === "array") && H(U);
    x.else(), v(E), x.endIf(), x.if((0, o._)`${k} !== undefined`, () => {
      x.assign(w, k), m(E, k);
    });
    function H(U) {
      switch (U) {
        case "string":
          x.elseIf((0, o._)`${M} == "number" || ${M} == "boolean"`).assign(k, (0, o._)`"" + ${w}`).elseIf((0, o._)`${w} === null`).assign(k, (0, o._)`""`);
          return;
        case "number":
          x.elseIf((0, o._)`${M} == "boolean" || ${w} === null
              || (${M} == "string" && ${w} && ${w} == +${w})`).assign(k, (0, o._)`+${w}`);
          return;
        case "integer":
          x.elseIf((0, o._)`${M} === "boolean" || ${w} === null
              || (${M} === "string" && ${w} && ${w} == +${w} && !(${w} % 1))`).assign(k, (0, o._)`+${w}`);
          return;
        case "boolean":
          x.elseIf((0, o._)`${w} === "false" || ${w} === 0 || ${w} === null`).assign(k, !1).elseIf((0, o._)`${w} === "true" || ${w} === 1`).assign(k, !0);
          return;
        case "null":
          x.elseIf((0, o._)`${w} === "" || ${w} === 0 || ${w} === false`), x.assign(k, null);
          return;
        case "array":
          x.elseIf((0, o._)`${M} === "string" || ${M} === "number"
              || ${M} === "boolean" || ${w} === null`).assign(k, (0, o._)`[${w}]`);
      }
    }
  }
  function m({ gen: E, parentData: S, parentDataProperty: b }, x) {
    E.if((0, o._)`${S} !== undefined`, () => E.assign((0, o._)`${S}[${b}]`, x));
  }
  function h(E, S, b, x = a.Correct) {
    const w = x === a.Correct ? o.operators.EQ : o.operators.NEQ;
    let A;
    switch (E) {
      case "null":
        return (0, o._)`${S} ${w} null`;
      case "array":
        A = (0, o._)`Array.isArray(${S})`;
        break;
      case "object":
        A = (0, o._)`${S} && typeof ${S} == "object" && !Array.isArray(${S})`;
        break;
      case "integer":
        A = M((0, o._)`!(${S} % 1) && !isNaN(${S})`);
        break;
      case "number":
        A = M();
        break;
      default:
        return (0, o._)`typeof ${S} ${w} ${E}`;
    }
    return x === a.Correct ? A : (0, o.not)(A);
    function M(k = o.nil) {
      return (0, o.and)((0, o._)`typeof ${S} == "number"`, k, b ? (0, o._)`isFinite(${S})` : o.nil);
    }
  }
  e.checkDataType = h;
  function g(E, S, b, x) {
    if (E.length === 1)
      return h(E[0], S, b, x);
    let w;
    const A = (0, i.toHash)(E);
    if (A.array && A.object) {
      const M = (0, o._)`typeof ${S} != "object"`;
      w = A.null ? M : (0, o._)`!${S} || ${M}`, delete A.null, delete A.array, delete A.object;
    } else
      w = o.nil;
    A.number && delete A.integer;
    for (const M in A)
      w = (0, o.and)(w, h(M, S, b, x));
    return w;
  }
  e.checkDataTypes = g;
  const y = {
    message: ({ schema: E }) => `must be ${E}`,
    params: ({ schema: E, schemaValue: S }) => typeof E == "string" ? (0, o._)`{type: ${E}}` : (0, o._)`{type: ${S}}`
  };
  function v(E) {
    const S = $(E);
    (0, n.reportError)(S, y);
  }
  e.reportTypeError = v;
  function $(E) {
    const { gen: S, data: b, schema: x } = E, w = (0, i.schemaRefOrVal)(E, x, "type");
    return {
      gen: S,
      keyword: "type",
      data: b,
      schema: x.type,
      schemaCode: w,
      schemaValue: w,
      parentSchema: x,
      params: {},
      it: E
    };
  }
})(Ss);
var Wl = {};
Object.defineProperty(Wl, "__esModule", { value: !0 });
Wl.assignDefaults = void 0;
const ho = Be, HH = tt;
function GH(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const o in r)
      Jh(e, o, r[o].default);
  else
    t === "array" && Array.isArray(n) && n.forEach((o, i) => Jh(e, i, o.default));
}
Wl.assignDefaults = GH;
function Jh(e, t, r) {
  const { gen: n, compositeRule: o, data: i, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, ho._)`${i}${(0, ho.getProperty)(t)}`;
  if (o) {
    (0, HH.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, ho._)`${l} === undefined`;
  a.useDefaults === "empty" && (c = (0, ho._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, ho._)`${l} = ${(0, ho.stringify)(r)}`);
}
var Dr = {}, qe = {};
Object.defineProperty(qe, "__esModule", { value: !0 });
qe.validateUnion = qe.validateArray = qe.usePattern = qe.callValidateCode = qe.schemaProperties = qe.allSchemaProperties = qe.noPropertyInData = qe.propertyInData = qe.isOwnProperty = qe.hasPropFunc = qe.reportMissingProp = qe.checkMissingProp = qe.checkReportMissingProp = void 0;
const vt = Be, Qd = tt, cn = Ur, YH = tt;
function XH(e, t) {
  const { gen: r, data: n, it: o } = e;
  r.if(tf(r, n, t, o.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, vt._)`${t}` }, !0), e.error();
  });
}
qe.checkReportMissingProp = XH;
function JH({ gen: e, data: t, it: { opts: r } }, n, o) {
  return (0, vt.or)(...n.map((i) => (0, vt.and)(tf(e, t, i, r.ownProperties), (0, vt._)`${o} = ${i}`)));
}
qe.checkMissingProp = JH;
function ZH(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
qe.reportMissingProp = ZH;
function t$(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, vt._)`Object.prototype.hasOwnProperty`
  });
}
qe.hasPropFunc = t$;
function ef(e, t, r) {
  return (0, vt._)`${t$(e)}.call(${t}, ${r})`;
}
qe.isOwnProperty = ef;
function QH(e, t, r, n) {
  const o = (0, vt._)`${t}${(0, vt.getProperty)(r)} !== undefined`;
  return n ? (0, vt._)`${o} && ${ef(e, t, r)}` : o;
}
qe.propertyInData = QH;
function tf(e, t, r, n) {
  const o = (0, vt._)`${t}${(0, vt.getProperty)(r)} === undefined`;
  return n ? (0, vt.or)(o, (0, vt.not)(ef(e, t, r))) : o;
}
qe.noPropertyInData = tf;
function r$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
qe.allSchemaProperties = r$;
function eG(e, t) {
  return r$(t).filter((r) => !(0, Qd.alwaysValidSchema)(e, t[r]));
}
qe.schemaProperties = eG;
function tG({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: o, errorPath: i }, it: a }, l, c, u) {
  const d = u ? (0, vt._)`${e}, ${t}, ${n}${o}` : t, p = [
    [cn.default.instancePath, (0, vt.strConcat)(cn.default.instancePath, i)],
    [cn.default.parentData, a.parentData],
    [cn.default.parentDataProperty, a.parentDataProperty],
    [cn.default.rootData, cn.default.rootData]
  ];
  a.opts.dynamicRef && p.push([cn.default.dynamicAnchors, cn.default.dynamicAnchors]);
  const f = (0, vt._)`${d}, ${r.object(...p)}`;
  return c !== vt.nil ? (0, vt._)`${l}.call(${c}, ${f})` : (0, vt._)`${l}(${f})`;
}
qe.callValidateCode = tG;
const rG = (0, vt._)`new RegExp`;
function nG({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: o } = t.code, i = o(r, n);
  return e.scopeValue("pattern", {
    key: i.toString(),
    ref: i,
    code: (0, vt._)`${o.code === "new RegExp" ? rG : (0, YH.useFunc)(e, o)}(${r}, ${n})`
  });
}
qe.usePattern = nG;
function oG(e) {
  const { gen: t, data: r, keyword: n, it: o } = e, i = t.name("valid");
  if (o.allErrors) {
    const l = t.let("valid", !0);
    return a(() => t.assign(l, !1)), l;
  }
  return t.var(i, !0), a(() => t.break()), i;
  function a(l) {
    const c = t.const("len", (0, vt._)`${r}.length`);
    t.forRange("i", 0, c, (u) => {
      e.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: Qd.Type.Num
      }, i), t.if((0, vt.not)(i), l);
    });
  }
}
qe.validateArray = oG;
function iG(e) {
  const { gen: t, schema: r, keyword: n, it: o } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Qd.alwaysValidSchema)(o, c)) && !o.opts.unevaluated)
    return;
  const a = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, u) => {
    const d = e.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, l);
    t.assign(a, (0, vt._)`${a} || ${l}`), e.mergeValidEvaluated(d, l) || t.if((0, vt.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
qe.validateUnion = iG;
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.validateKeywordUsage = Dr.validSchemaType = Dr.funcKeywordCode = Dr.macroKeywordCode = void 0;
const Xt = Be, Fn = Ur, sG = qe, aG = $s;
function lG(e, t) {
  const { gen: r, keyword: n, schema: o, parentSchema: i, it: a } = e, l = t.macro.call(a.self, o, i, a), c = n$(r, n, l);
  a.opts.validateSchema !== !1 && a.self.validateSchema(l, !0);
  const u = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Xt.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), e.pass(u, () => e.error(!0));
}
Dr.macroKeywordCode = lG;
function cG(e, t) {
  var r;
  const { gen: n, keyword: o, schema: i, parentSchema: a, $data: l, it: c } = e;
  dG(c, t);
  const u = !l && t.compile ? t.compile.call(c.self, i, a, c) : t.validate, d = n$(n, o, u), p = n.let("valid");
  e.block$data(p, f), e.ok((r = t.valid) !== null && r !== void 0 ? r : p);
  function f() {
    if (t.errors === !1)
      g(), t.modifying && Zh(e), y(() => e.error());
    else {
      const v = t.async ? m() : h();
      t.modifying && Zh(e), y(() => uG(e, v));
    }
  }
  function m() {
    const v = n.let("ruleErrs", null);
    return n.try(() => g((0, Xt._)`await `), ($) => n.assign(p, !1).if((0, Xt._)`${$} instanceof ${c.ValidationError}`, () => n.assign(v, (0, Xt._)`${$}.errors`), () => n.throw($))), v;
  }
  function h() {
    const v = (0, Xt._)`${d}.errors`;
    return n.assign(v, null), g(Xt.nil), v;
  }
  function g(v = t.async ? (0, Xt._)`await ` : Xt.nil) {
    const $ = c.opts.passContext ? Fn.default.this : Fn.default.self, E = !("compile" in t && !l || t.schema === !1);
    n.assign(p, (0, Xt._)`${v}${(0, sG.callValidateCode)(e, d, $, E)}`, t.modifying);
  }
  function y(v) {
    var $;
    n.if((0, Xt.not)(($ = t.valid) !== null && $ !== void 0 ? $ : p), v);
  }
}
Dr.funcKeywordCode = cG;
function Zh(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Xt._)`${n.parentData}[${n.parentDataProperty}]`));
}
function uG(e, t) {
  const { gen: r } = e;
  r.if((0, Xt._)`Array.isArray(${t})`, () => {
    r.assign(Fn.default.vErrors, (0, Xt._)`${Fn.default.vErrors} === null ? ${t} : ${Fn.default.vErrors}.concat(${t})`).assign(Fn.default.errors, (0, Xt._)`${Fn.default.vErrors}.length`), (0, aG.extendErrors)(e);
  }, () => e.error());
}
function dG({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function n$(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Xt.stringify)(r) });
}
function fG(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
Dr.validSchemaType = fG;
function pG({ schema: e, opts: t, self: r, errSchemaPath: n }, o, i) {
  if (Array.isArray(o.keyword) ? !o.keyword.includes(i) : o.keyword !== i)
    throw new Error("ajv implementation error");
  const a = o.dependencies;
  if (a != null && a.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${i}: ${a.join(",")}`);
  if (o.validateSchema && !o.validateSchema(e[i])) {
    const c = `keyword "${i}" value is invalid at path "${n}": ` + r.errorsText(o.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
Dr.validateKeywordUsage = pG;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.extendSubschemaMode = gn.extendSubschemaData = gn.getSubschema = void 0;
const kr = Be, o$ = tt;
function mG(e, { keyword: t, schemaProp: r, schema: n, schemaPath: o, errSchemaPath: i, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, kr._)`${e.schemaPath}${(0, kr.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, kr._)`${e.schemaPath}${(0, kr.getProperty)(t)}${(0, kr.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, o$.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (o === void 0 || i === void 0 || a === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: o,
      topSchemaRef: a,
      errSchemaPath: i
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
gn.getSubschema = mG;
function hG(e, t, { dataProp: r, dataPropType: n, data: o, dataTypes: i, propertyName: a }) {
  if (o !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: d, opts: p } = t, f = l.let("data", (0, kr._)`${t.data}${(0, kr.getProperty)(r)}`, !0);
    c(f), e.errorPath = (0, kr.str)`${u}${(0, o$.getErrorPath)(r, n, p.jsPropertySyntax)}`, e.parentDataProperty = (0, kr._)`${r}`, e.dataPathArr = [...d, e.parentDataProperty];
  }
  if (o !== void 0) {
    const u = o instanceof kr.Name ? o : l.let("data", o, !0);
    c(u), a !== void 0 && (e.propertyName = a);
  }
  i && (e.dataTypes = i);
  function c(u) {
    e.data = u, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, u];
  }
}
gn.extendSubschemaData = hG;
function yG(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: o, allErrors: i }) {
  n !== void 0 && (e.compositeRule = n), o !== void 0 && (e.createErrors = o), i !== void 0 && (e.allErrors = i), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
gn.extendSubschemaMode = yG;
var zt = {}, i$ = function e(t, r) {
  if (t === r)
    return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor)
      return !1;
    var n, o, i;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length)
        return !1;
      for (o = n; o-- !== 0; )
        if (!e(t[o], r[o]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === r.toString();
    if (i = Object.keys(t), n = i.length, n !== Object.keys(r).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, i[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      var a = i[o];
      if (!e(t[a], r[a]))
        return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, s$ = { exports: {} }, mn = s$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, o = r.post || function() {
  };
  aa(t, n, o, e, "", e);
};
mn.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
mn.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
mn.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
mn.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function aa(e, t, r, n, o, i, a, l, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, o, i, a, l, c, u);
    for (var d in n) {
      var p = n[d];
      if (Array.isArray(p)) {
        if (d in mn.arrayKeywords)
          for (var f = 0; f < p.length; f++)
            aa(e, t, r, p[f], o + "/" + d + "/" + f, i, o, d, n, f);
      } else if (d in mn.propsKeywords) {
        if (p && typeof p == "object")
          for (var m in p)
            aa(e, t, r, p[m], o + "/" + d + "/" + gG(m), i, o, d, n, m);
      } else
        (d in mn.keywords || e.allKeys && !(d in mn.skipKeywords)) && aa(e, t, r, p, o + "/" + d, i, o, d, n);
    }
    r(n, o, i, a, l, c, u);
  }
}
function gG(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var vG = s$.exports;
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.getSchemaRefs = zt.resolveUrl = zt.normalizeId = zt._getFullPath = zt.getFullPath = zt.inlineRef = void 0;
const bG = tt, $G = i$, SG = vG, EG = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function _G(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !uu(e) : t ? a$(e) <= t : !1;
}
zt.inlineRef = _G;
const xG = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function uu(e) {
  for (const t in e) {
    if (xG.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(uu) || typeof r == "object" && uu(r))
      return !0;
  }
  return !1;
}
function a$(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !EG.has(r) && (typeof e[r] == "object" && (0, bG.eachItem)(e[r], (n) => t += a$(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function l$(e, t = "", r) {
  r !== !1 && (t = Co(t));
  const n = e.parse(t);
  return c$(e, n);
}
zt.getFullPath = l$;
function c$(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
zt._getFullPath = c$;
const wG = /#\/?$/;
function Co(e) {
  return e ? e.replace(wG, "") : "";
}
zt.normalizeId = Co;
function TG(e, t, r) {
  return r = Co(r), e.resolve(t, r);
}
zt.resolveUrl = TG;
const OG = /^[a-z_][-a-z0-9._]*$/i;
function CG(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, o = Co(e[r] || t), i = { "": o }, a = l$(n, o, !1), l = {}, c = /* @__PURE__ */ new Set();
  return SG(e, { allKeys: !0 }, (p, f, m, h) => {
    if (h === void 0)
      return;
    const g = a + f;
    let y = i[h];
    typeof p[r] == "string" && (y = v.call(this, p[r])), $.call(this, p.$anchor), $.call(this, p.$dynamicAnchor), i[f] = y;
    function v(E) {
      const S = this.opts.uriResolver.resolve;
      if (E = Co(y ? S(y, E) : E), c.has(E))
        throw d(E);
      c.add(E);
      let b = this.refs[E];
      return typeof b == "string" && (b = this.refs[b]), typeof b == "object" ? u(p, b.schema, E) : E !== Co(g) && (E[0] === "#" ? (u(p, l[E], E), l[E] = p) : this.refs[E] = g), E;
    }
    function $(E) {
      if (typeof E == "string") {
        if (!OG.test(E))
          throw new Error(`invalid anchor "${E}"`);
        v.call(this, `#${E}`);
      }
    }
  }), l;
  function u(p, f, m) {
    if (f !== void 0 && !$G(p, f))
      throw d(m);
  }
  function d(p) {
    return new Error(`reference "${p}" resolves to more than one schema`);
  }
}
zt.getSchemaRefs = CG;
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.getData = Cr.KeywordCxt = Cr.validateFunctionCode = void 0;
const u$ = Fo, Qh = Ss, rf = Xr, Ma = Ss, PG = Wl, Bi = Dr, Cc = gn, Oe = Be, Ie = Ur, RG = zt, Jr = tt, Ci = $s;
function IG(e) {
  if (p$(e) && (m$(e), f$(e))) {
    jG(e);
    return;
  }
  d$(e, () => (0, u$.topBoolOrEmptySchema)(e));
}
Cr.validateFunctionCode = IG;
function d$({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: o }, i) {
  o.code.es5 ? e.func(t, (0, Oe._)`${Ie.default.data}, ${Ie.default.valCxt}`, n.$async, () => {
    e.code((0, Oe._)`"use strict"; ${ey(r, o)}`), AG(e, o), e.code(i);
  }) : e.func(t, (0, Oe._)`${Ie.default.data}, ${NG(o)}`, n.$async, () => e.code(ey(r, o)).code(i));
}
function NG(e) {
  return (0, Oe._)`{${Ie.default.instancePath}="", ${Ie.default.parentData}, ${Ie.default.parentDataProperty}, ${Ie.default.rootData}=${Ie.default.data}${e.dynamicRef ? (0, Oe._)`, ${Ie.default.dynamicAnchors}={}` : Oe.nil}}={}`;
}
function AG(e, t) {
  e.if(Ie.default.valCxt, () => {
    e.var(Ie.default.instancePath, (0, Oe._)`${Ie.default.valCxt}.${Ie.default.instancePath}`), e.var(Ie.default.parentData, (0, Oe._)`${Ie.default.valCxt}.${Ie.default.parentData}`), e.var(Ie.default.parentDataProperty, (0, Oe._)`${Ie.default.valCxt}.${Ie.default.parentDataProperty}`), e.var(Ie.default.rootData, (0, Oe._)`${Ie.default.valCxt}.${Ie.default.rootData}`), t.dynamicRef && e.var(Ie.default.dynamicAnchors, (0, Oe._)`${Ie.default.valCxt}.${Ie.default.dynamicAnchors}`);
  }, () => {
    e.var(Ie.default.instancePath, (0, Oe._)`""`), e.var(Ie.default.parentData, (0, Oe._)`undefined`), e.var(Ie.default.parentDataProperty, (0, Oe._)`undefined`), e.var(Ie.default.rootData, Ie.default.data), t.dynamicRef && e.var(Ie.default.dynamicAnchors, (0, Oe._)`{}`);
  });
}
function jG(e) {
  const { schema: t, opts: r, gen: n } = e;
  d$(e, () => {
    r.$comment && t.$comment && y$(e), LG(e), n.let(Ie.default.vErrors, null), n.let(Ie.default.errors, 0), r.unevaluated && kG(e), h$(e), zG(e);
  });
}
function kG(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, Oe._)`${r}.evaluated`), t.if((0, Oe._)`${e.evaluated}.dynamicProps`, () => t.assign((0, Oe._)`${e.evaluated}.props`, (0, Oe._)`undefined`)), t.if((0, Oe._)`${e.evaluated}.dynamicItems`, () => t.assign((0, Oe._)`${e.evaluated}.items`, (0, Oe._)`undefined`));
}
function ey(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, Oe._)`/*# sourceURL=${r} */` : Oe.nil;
}
function MG(e, t) {
  if (p$(e) && (m$(e), f$(e))) {
    DG(e, t);
    return;
  }
  (0, u$.boolOrEmptySchema)(e, t);
}
function f$({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function p$(e) {
  return typeof e.schema != "boolean";
}
function DG(e, t) {
  const { schema: r, gen: n, opts: o } = e;
  o.$comment && r.$comment && y$(e), BG(e), VG(e);
  const i = n.const("_errs", Ie.default.errors);
  h$(e, i), n.var(t, (0, Oe._)`${i} === ${Ie.default.errors}`);
}
function m$(e) {
  (0, Jr.checkUnknownRules)(e), FG(e);
}
function h$(e, t) {
  if (e.opts.jtd)
    return ty(e, [], !1, t);
  const r = (0, Qh.getSchemaTypes)(e.schema), n = (0, Qh.coerceAndCheckDataType)(e, r);
  ty(e, r, !n, t);
}
function FG(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: o } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Jr.schemaHasRulesButRef)(t, o.RULES) && o.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function LG(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Jr.checkStrictMode)(e, "default is ignored in the schema root");
}
function BG(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, RG.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function VG(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function y$({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: o }) {
  const i = r.$comment;
  if (o.$comment === !0)
    e.code((0, Oe._)`${Ie.default.self}.logger.log(${i})`);
  else if (typeof o.$comment == "function") {
    const a = (0, Oe.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, Oe._)`${Ie.default.self}.opts.$comment(${i}, ${a}, ${l}.schema)`);
  }
}
function zG(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: o, opts: i } = e;
  r.$async ? t.if((0, Oe._)`${Ie.default.errors} === 0`, () => t.return(Ie.default.data), () => t.throw((0, Oe._)`new ${o}(${Ie.default.vErrors})`)) : (t.assign((0, Oe._)`${n}.errors`, Ie.default.vErrors), i.unevaluated && UG(e), t.return((0, Oe._)`${Ie.default.errors} === 0`));
}
function UG({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof Oe.Name && e.assign((0, Oe._)`${t}.props`, r), n instanceof Oe.Name && e.assign((0, Oe._)`${t}.items`, n);
}
function ty(e, t, r, n) {
  const { gen: o, schema: i, data: a, allErrors: l, opts: c, self: u } = e, { RULES: d } = u;
  if (i.$ref && (c.ignoreKeywordsWithRef || !(0, Jr.schemaHasRulesButRef)(i, d))) {
    o.block(() => b$(e, "$ref", d.all.$ref.definition));
    return;
  }
  c.jtd || WG(e, t), o.block(() => {
    for (const f of d.rules)
      p(f);
    p(d.post);
  });
  function p(f) {
    (0, rf.shouldUseGroup)(i, f) && (f.type ? (o.if((0, Ma.checkDataType)(f.type, a, c.strictNumbers)), ry(e, f), t.length === 1 && t[0] === f.type && r && (o.else(), (0, Ma.reportTypeError)(e)), o.endIf()) : ry(e, f), l || o.if((0, Oe._)`${Ie.default.errors} === ${n || 0}`));
  }
}
function ry(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: o } } = e;
  o && (0, PG.assignDefaults)(e, t.type), r.block(() => {
    for (const i of t.rules)
      (0, rf.shouldUseRule)(n, i) && b$(e, i.keyword, i.definition, t.type);
  });
}
function WG(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (qG(e, t), e.opts.allowUnionTypes || KG(e, t), HG(e, e.dataTypes));
}
function qG(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      g$(e.dataTypes, r) || nf(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), YG(e, t);
  }
}
function KG(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && nf(e, "use allowUnionTypes to allow union type keyword");
}
function HG(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const o = r[n];
    if (typeof o == "object" && (0, rf.shouldUseRule)(e.schema, o)) {
      const { type: i } = o.definition;
      i.length && !i.some((a) => GG(t, a)) && nf(e, `missing type "${i.join(",")}" for keyword "${n}"`);
    }
  }
}
function GG(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function g$(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function YG(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    g$(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function nf(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Jr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class v$ {
  constructor(t, r, n) {
    if ((0, Bi.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Jr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", $$(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Bi.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Ie.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, Oe.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, Oe.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, Oe._)`${r} !== undefined && (${(0, Oe.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Ci.reportExtraError : Ci.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ci.reportError)(this, this.def.$dataError || Ci.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ci.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = Oe.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = Oe.nil, r = Oe.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: o, schemaType: i, def: a } = this;
    n.if((0, Oe.or)((0, Oe._)`${o} === undefined`, r)), t !== Oe.nil && n.assign(t, !0), (i.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== Oe.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: o, it: i } = this;
    return (0, Oe.or)(a(), l());
    function a() {
      if (n.length) {
        if (!(r instanceof Oe.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, Oe._)`${(0, Ma.checkDataTypes)(c, r, i.opts.strictNumbers, Ma.DataType.Wrong)}`;
      }
      return Oe.nil;
    }
    function l() {
      if (o.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: o.validateSchema });
        return (0, Oe._)`!${c}(${r})`;
      }
      return Oe.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Cc.getSubschema)(this.it, t);
    (0, Cc.extendSubschemaData)(n, this.it, t), (0, Cc.extendSubschemaMode)(n, t);
    const o = { ...this.it, ...n, items: void 0, props: void 0 };
    return MG(o, r), o;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: o } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Jr.mergeEvaluated.props(o, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Jr.mergeEvaluated.items(o, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: o } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return o.if(r, () => this.mergeEvaluated(t, Oe.Name)), !0;
  }
}
Cr.KeywordCxt = v$;
function b$(e, t, r, n) {
  const o = new v$(e, r, t);
  "code" in r ? r.code(o, n) : o.$data && r.validate ? (0, Bi.funcKeywordCode)(o, r) : "macro" in r ? (0, Bi.macroKeywordCode)(o, r) : (r.compile || r.validate) && (0, Bi.funcKeywordCode)(o, r);
}
const XG = /^\/(?:[^~]|~0|~1)*$/, JG = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function $$(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let o, i;
  if (e === "")
    return Ie.default.rootData;
  if (e[0] === "/") {
    if (!XG.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    o = e, i = Ie.default.rootData;
  } else {
    const u = JG.exec(e);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const d = +u[1];
    if (o = u[2], o === "#") {
      if (d >= t)
        throw new Error(c("property/index", d));
      return n[t - d];
    }
    if (d > t)
      throw new Error(c("data", d));
    if (i = r[t - d], !o)
      return i;
  }
  let a = i;
  const l = o.split("/");
  for (const u of l)
    u && (i = (0, Oe._)`${i}${(0, Oe.getProperty)((0, Jr.unescapeJsonPointer)(u))}`, a = (0, Oe._)`${a} && ${i}`);
  return a;
  function c(u, d) {
    return `Cannot access ${u} ${d} levels up, current level is ${t}`;
  }
}
Cr.getData = $$;
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
class ZG extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Es.default = ZG;
var _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
const Pc = zt;
class QG extends Error {
  constructor(t, r, n, o) {
    super(o || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Pc.resolveUrl)(t, r, n), this.missingSchema = (0, Pc.normalizeId)((0, Pc.getFullPath)(t, this.missingRef));
  }
}
_s.default = QG;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.resolveSchema = Qt.getCompilingSchema = Qt.resolveRef = Qt.compileSchema = Qt.SchemaEnv = void 0;
const $r = Be, e7 = Es, Nn = Ur, _r = zt, ny = tt, t7 = Cr;
class ql {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, _r.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Qt.SchemaEnv = ql;
function of(e) {
  const t = S$.call(this, e);
  if (t)
    return t;
  const r = (0, _r.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: o } = this.opts.code, { ownProperties: i } = this.opts, a = new $r.CodeGen(this.scope, { es5: n, lines: o, ownProperties: i });
  let l;
  e.$async && (l = a.scopeValue("Error", {
    ref: e7.default,
    code: (0, $r._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const u = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Nn.default.data,
    parentData: Nn.default.parentData,
    parentDataProperty: Nn.default.parentDataProperty,
    dataNames: [Nn.default.data],
    dataPathArr: [$r.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, $r.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: $r.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, $r._)`""`,
    opts: this.opts,
    self: this
  };
  let d;
  try {
    this._compilations.add(e), (0, t7.validateFunctionCode)(u), a.optimize(this.opts.code.optimize);
    const p = a.toString();
    d = `${a.scopeRefs(Nn.default.scope)}return ${p}`, this.opts.code.process && (d = this.opts.code.process(d, e));
    const m = new Function(`${Nn.default.self}`, `${Nn.default.scope}`, d)(this, this.scope.get());
    if (this.scope.value(c, { ref: m }), m.errors = null, m.schema = e.schema, m.schemaEnv = e, e.$async && (m.$async = !0), this.opts.code.source === !0 && (m.source = { validateName: c, validateCode: p, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: h, items: g } = u;
      m.evaluated = {
        props: h instanceof $r.Name ? void 0 : h,
        items: g instanceof $r.Name ? void 0 : g,
        dynamicProps: h instanceof $r.Name,
        dynamicItems: g instanceof $r.Name
      }, m.source && (m.source.evaluated = (0, $r.stringify)(m.evaluated));
    }
    return e.validate = m, e;
  } catch (p) {
    throw delete e.validate, delete e.validateName, d && this.logger.error("Error compiling schema, function code:", d), p;
  } finally {
    this._compilations.delete(e);
  }
}
Qt.compileSchema = of;
function r7(e, t, r) {
  var n;
  r = (0, _r.resolveUrl)(this.opts.uriResolver, t, r);
  const o = e.refs[r];
  if (o)
    return o;
  let i = i7.call(this, e, r);
  if (i === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    a && (i = new ql({ schema: a, schemaId: l, root: e, baseId: t }));
  }
  if (i !== void 0)
    return e.refs[r] = n7.call(this, i);
}
Qt.resolveRef = r7;
function n7(e) {
  return (0, _r.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : of.call(this, e);
}
function S$(e) {
  for (const t of this._compilations)
    if (o7(t, e))
      return t;
}
Qt.getCompilingSchema = S$;
function o7(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function i7(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Kl.call(this, e, t);
}
function Kl(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, _r._getFullPath)(this.opts.uriResolver, r);
  let o = (0, _r.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === o)
    return Rc.call(this, r, e);
  const i = (0, _r.normalizeId)(n), a = this.refs[i] || this.schemas[i];
  if (typeof a == "string") {
    const l = Kl.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Rc.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || of.call(this, a), i === (0, _r.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: c } = this.opts, u = l[c];
      return u && (o = (0, _r.resolveUrl)(this.opts.uriResolver, o, u)), new ql({ schema: l, schemaId: c, root: e, baseId: o });
    }
    return Rc.call(this, r, a);
  }
}
Qt.resolveSchema = Kl;
const s7 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Rc(e, { baseId: t, schema: r, root: n }) {
  var o;
  if (((o = e.fragment) === null || o === void 0 ? void 0 : o[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, ny.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !s7.has(l) && u && (t = (0, _r.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let i;
  if (typeof r != "boolean" && r.$ref && !(0, ny.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, _r.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    i = Kl.call(this, n, l);
  }
  const { schemaId: a } = this.opts;
  if (i = i || new ql({ schema: r, schemaId: a, root: n, baseId: t }), i.schema !== i.root.schema)
    return i;
}
const a7 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", l7 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", c7 = "object", u7 = [
  "$data"
], d7 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, f7 = !1, p7 = {
  $id: a7,
  description: l7,
  type: c7,
  required: u7,
  properties: d7,
  additionalProperties: f7
};
var sf = {}, du = { exports: {} };
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function(e, t) {
  (function(r, n) {
    n(t);
  })($o, function(r) {
    function n() {
      for (var L = arguments.length, I = Array(L), V = 0; V < L; V++)
        I[V] = arguments[V];
      if (I.length > 1) {
        I[0] = I[0].slice(0, -1);
        for (var O = I.length - 1, j = 1; j < O; ++j)
          I[j] = I[j].slice(1, -1);
        return I[O] = I[O].slice(1), I.join("");
      } else
        return I[0];
    }
    function o(L) {
      return "(?:" + L + ")";
    }
    function i(L) {
      return L === void 0 ? "undefined" : L === null ? "null" : Object.prototype.toString.call(L).split(" ").pop().split("]").shift().toLowerCase();
    }
    function a(L) {
      return L.toUpperCase();
    }
    function l(L) {
      return L != null ? L instanceof Array ? L : typeof L.length != "number" || L.split || L.setInterval || L.call ? [L] : Array.prototype.slice.call(L) : [];
    }
    function c(L, I) {
      var V = L;
      if (I)
        for (var O in I)
          V[O] = I[O];
      return V;
    }
    function u(L) {
      var I = "[A-Za-z]", V = "[0-9]", O = n(V, "[A-Fa-f]"), j = o(o("%[EFef]" + O + "%" + O + O + "%" + O + O) + "|" + o("%[89A-Fa-f]" + O + "%" + O + O) + "|" + o("%" + O + O)), ee = "[\\:\\/\\?\\#\\[\\]\\@]", ae = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", de = n(ee, ae), ve = L ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", we = L ? "[\\uE000-\\uF8FF]" : "[]", me = n(I, V, "[\\-\\.\\_\\~]", ve);
      o(I + n(I, V, "[\\+\\-\\.]") + "*"), o(o(j + "|" + n(me, ae, "[\\:]")) + "*");
      var Ce = o(o("25[0-5]") + "|" + o("2[0-4]" + V) + "|" + o("1" + V + V) + "|" + o("0?[1-9]" + V) + "|0?0?" + V), Me = o(Ce + "\\." + Ce + "\\." + Ce + "\\." + Ce), _e = o(O + "{1,4}"), Ye = o(o(_e + "\\:" + _e) + "|" + Me), mt = o(o(_e + "\\:") + "{6}" + Ye), ht = o("\\:\\:" + o(_e + "\\:") + "{5}" + Ye), Mt = o(o(_e) + "?\\:\\:" + o(_e + "\\:") + "{4}" + Ye), Ir = o(o(o(_e + "\\:") + "{0,1}" + _e) + "?\\:\\:" + o(_e + "\\:") + "{3}" + Ye), Nr = o(o(o(_e + "\\:") + "{0,2}" + _e) + "?\\:\\:" + o(_e + "\\:") + "{2}" + Ye), io = o(o(o(_e + "\\:") + "{0,3}" + _e) + "?\\:\\:" + _e + "\\:" + Ye), Cn = o(o(o(_e + "\\:") + "{0,4}" + _e) + "?\\:\\:" + Ye), ur = o(o(o(_e + "\\:") + "{0,5}" + _e) + "?\\:\\:" + _e), Ar = o(o(o(_e + "\\:") + "{0,6}" + _e) + "?\\:\\:"), Pn = o([mt, ht, Mt, Ir, Nr, io, Cn, ur, Ar].join("|")), qr = o(o(me + "|" + j) + "+");
      o("[vV]" + O + "+\\." + n(me, ae, "[\\:]") + "+"), o(o(j + "|" + n(me, ae)) + "*");
      var ui = o(j + "|" + n(me, ae, "[\\:\\@]"));
      return o(o(j + "|" + n(me, ae, "[\\@]")) + "+"), o(o(ui + "|" + n("[\\/\\?]", we)) + "*"), {
        NOT_SCHEME: new RegExp(n("[^]", I, V, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(n("[^\\%\\:]", me, ae), "g"),
        NOT_HOST: new RegExp(n("[^\\%\\[\\]\\:]", me, ae), "g"),
        NOT_PATH: new RegExp(n("[^\\%\\/\\:\\@]", me, ae), "g"),
        NOT_PATH_NOSCHEME: new RegExp(n("[^\\%\\/\\@]", me, ae), "g"),
        NOT_QUERY: new RegExp(n("[^\\%]", me, ae, "[\\:\\@\\/\\?]", we), "g"),
        NOT_FRAGMENT: new RegExp(n("[^\\%]", me, ae, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(n("[^]", me, ae), "g"),
        UNRESERVED: new RegExp(me, "g"),
        OTHER_CHARS: new RegExp(n("[^\\%]", me, de), "g"),
        PCT_ENCODED: new RegExp(j, "g"),
        IPV4ADDRESS: new RegExp("^(" + Me + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + Pn + ")" + o(o("\\%25|\\%(?!" + O + "{2})") + "(" + qr + ")") + "?\\]?$")
        //RFC 6874, with relaxed parsing rules
      };
    }
    var d = u(!1), p = u(!0), f = function() {
      function L(I, V) {
        var O = [], j = !0, ee = !1, ae = void 0;
        try {
          for (var de = I[Symbol.iterator](), ve; !(j = (ve = de.next()).done) && (O.push(ve.value), !(V && O.length === V)); j = !0)
            ;
        } catch (we) {
          ee = !0, ae = we;
        } finally {
          try {
            !j && de.return && de.return();
          } finally {
            if (ee)
              throw ae;
          }
        }
        return O;
      }
      return function(I, V) {
        if (Array.isArray(I))
          return I;
        if (Symbol.iterator in Object(I))
          return L(I, V);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), m = function(L) {
      if (Array.isArray(L)) {
        for (var I = 0, V = Array(L.length); I < L.length; I++)
          V[I] = L[I];
        return V;
      } else
        return Array.from(L);
    }, h = 2147483647, g = 36, y = 1, v = 26, $ = 38, E = 700, S = 72, b = 128, x = "-", w = /^xn--/, A = /[^\0-\x7E]/, M = /[\x2E\u3002\uFF0E\uFF61]/g, k = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, H = g - y, U = Math.floor, K = String.fromCharCode;
    function z(L) {
      throw new RangeError(k[L]);
    }
    function G(L, I) {
      for (var V = [], O = L.length; O--; )
        V[O] = I(L[O]);
      return V;
    }
    function X(L, I) {
      var V = L.split("@"), O = "";
      V.length > 1 && (O = V[0] + "@", L = V[1]), L = L.replace(M, ".");
      var j = L.split("."), ee = G(j, I).join(".");
      return O + ee;
    }
    function J(L) {
      for (var I = [], V = 0, O = L.length; V < O; ) {
        var j = L.charCodeAt(V++);
        if (j >= 55296 && j <= 56319 && V < O) {
          var ee = L.charCodeAt(V++);
          (ee & 64512) == 56320 ? I.push(((j & 1023) << 10) + (ee & 1023) + 65536) : (I.push(j), V--);
        } else
          I.push(j);
      }
      return I;
    }
    var Z = function(I) {
      return String.fromCodePoint.apply(String, m(I));
    }, ne = function(I) {
      return I - 48 < 10 ? I - 22 : I - 65 < 26 ? I - 65 : I - 97 < 26 ? I - 97 : g;
    }, D = function(I, V) {
      return I + 22 + 75 * (I < 26) - ((V != 0) << 5);
    }, N = function(I, V, O) {
      var j = 0;
      for (
        I = O ? U(I / E) : I >> 1, I += U(I / V);
        /* no initialization */
        I > H * v >> 1;
        j += g
      )
        I = U(I / H);
      return U(j + (H + 1) * I / (I + $));
    }, W = function(I) {
      var V = [], O = I.length, j = 0, ee = b, ae = S, de = I.lastIndexOf(x);
      de < 0 && (de = 0);
      for (var ve = 0; ve < de; ++ve)
        I.charCodeAt(ve) >= 128 && z("not-basic"), V.push(I.charCodeAt(ve));
      for (var we = de > 0 ? de + 1 : 0; we < O; ) {
        for (
          var me = j, Ce = 1, Me = g;
          ;
          /* no condition */
          Me += g
        ) {
          we >= O && z("invalid-input");
          var _e = ne(I.charCodeAt(we++));
          (_e >= g || _e > U((h - j) / Ce)) && z("overflow"), j += _e * Ce;
          var Ye = Me <= ae ? y : Me >= ae + v ? v : Me - ae;
          if (_e < Ye)
            break;
          var mt = g - Ye;
          Ce > U(h / mt) && z("overflow"), Ce *= mt;
        }
        var ht = V.length + 1;
        ae = N(j - me, ht, me == 0), U(j / ht) > h - ee && z("overflow"), ee += U(j / ht), j %= ht, V.splice(j++, 0, ee);
      }
      return String.fromCodePoint.apply(String, V);
    }, F = function(I) {
      var V = [];
      I = J(I);
      var O = I.length, j = b, ee = 0, ae = S, de = !0, ve = !1, we = void 0;
      try {
        for (var me = I[Symbol.iterator](), Ce; !(de = (Ce = me.next()).done); de = !0) {
          var Me = Ce.value;
          Me < 128 && V.push(K(Me));
        }
      } catch (di) {
        ve = !0, we = di;
      } finally {
        try {
          !de && me.return && me.return();
        } finally {
          if (ve)
            throw we;
        }
      }
      var _e = V.length, Ye = _e;
      for (_e && V.push(x); Ye < O; ) {
        var mt = h, ht = !0, Mt = !1, Ir = void 0;
        try {
          for (var Nr = I[Symbol.iterator](), io; !(ht = (io = Nr.next()).done); ht = !0) {
            var Cn = io.value;
            Cn >= j && Cn < mt && (mt = Cn);
          }
        } catch (di) {
          Mt = !0, Ir = di;
        } finally {
          try {
            !ht && Nr.return && Nr.return();
          } finally {
            if (Mt)
              throw Ir;
          }
        }
        var ur = Ye + 1;
        mt - j > U((h - ee) / ur) && z("overflow"), ee += (mt - j) * ur, j = mt;
        var Ar = !0, Pn = !1, qr = void 0;
        try {
          for (var ui = I[Symbol.iterator](), Ff; !(Ar = (Ff = ui.next()).done); Ar = !0) {
            var Lf = Ff.value;
            if (Lf < j && ++ee > h && z("overflow"), Lf == j) {
              for (
                var ws = ee, Ts = g;
                ;
                /* no condition */
                Ts += g
              ) {
                var Os = Ts <= ae ? y : Ts >= ae + v ? v : Ts - ae;
                if (ws < Os)
                  break;
                var Bf = ws - Os, Vf = g - Os;
                V.push(K(D(Os + Bf % Vf, 0))), ws = U(Bf / Vf);
              }
              V.push(K(D(ws, 0))), ae = N(ee, ur, Ye == _e), ee = 0, ++Ye;
            }
          }
        } catch (di) {
          Pn = !0, qr = di;
        } finally {
          try {
            !Ar && ui.return && ui.return();
          } finally {
            if (Pn)
              throw qr;
          }
        }
        ++ee, ++j;
      }
      return V.join("");
    }, T = function(I) {
      return X(I, function(V) {
        return w.test(V) ? W(V.slice(4).toLowerCase()) : V;
      });
    }, R = function(I) {
      return X(I, function(V) {
        return A.test(V) ? "xn--" + F(V) : V;
      });
    }, B = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "2.1.0",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: J,
        encode: Z
      },
      decode: W,
      encode: F,
      toASCII: R,
      toUnicode: T
    }, Q = {};
    function Y(L) {
      var I = L.charCodeAt(0), V = void 0;
      return I < 16 ? V = "%0" + I.toString(16).toUpperCase() : I < 128 ? V = "%" + I.toString(16).toUpperCase() : I < 2048 ? V = "%" + (I >> 6 | 192).toString(16).toUpperCase() + "%" + (I & 63 | 128).toString(16).toUpperCase() : V = "%" + (I >> 12 | 224).toString(16).toUpperCase() + "%" + (I >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (I & 63 | 128).toString(16).toUpperCase(), V;
    }
    function oe(L) {
      for (var I = "", V = 0, O = L.length; V < O; ) {
        var j = parseInt(L.substr(V + 1, 2), 16);
        if (j < 128)
          I += String.fromCharCode(j), V += 3;
        else if (j >= 194 && j < 224) {
          if (O - V >= 6) {
            var ee = parseInt(L.substr(V + 4, 2), 16);
            I += String.fromCharCode((j & 31) << 6 | ee & 63);
          } else
            I += L.substr(V, 6);
          V += 6;
        } else if (j >= 224) {
          if (O - V >= 9) {
            var ae = parseInt(L.substr(V + 4, 2), 16), de = parseInt(L.substr(V + 7, 2), 16);
            I += String.fromCharCode((j & 15) << 12 | (ae & 63) << 6 | de & 63);
          } else
            I += L.substr(V, 9);
          V += 9;
        } else
          I += L.substr(V, 3), V += 3;
      }
      return I;
    }
    function ie(L, I) {
      function V(O) {
        var j = oe(O);
        return j.match(I.UNRESERVED) ? j : O;
      }
      return L.scheme && (L.scheme = String(L.scheme).replace(I.PCT_ENCODED, V).toLowerCase().replace(I.NOT_SCHEME, "")), L.userinfo !== void 0 && (L.userinfo = String(L.userinfo).replace(I.PCT_ENCODED, V).replace(I.NOT_USERINFO, Y).replace(I.PCT_ENCODED, a)), L.host !== void 0 && (L.host = String(L.host).replace(I.PCT_ENCODED, V).toLowerCase().replace(I.NOT_HOST, Y).replace(I.PCT_ENCODED, a)), L.path !== void 0 && (L.path = String(L.path).replace(I.PCT_ENCODED, V).replace(L.scheme ? I.NOT_PATH : I.NOT_PATH_NOSCHEME, Y).replace(I.PCT_ENCODED, a)), L.query !== void 0 && (L.query = String(L.query).replace(I.PCT_ENCODED, V).replace(I.NOT_QUERY, Y).replace(I.PCT_ENCODED, a)), L.fragment !== void 0 && (L.fragment = String(L.fragment).replace(I.PCT_ENCODED, V).replace(I.NOT_FRAGMENT, Y).replace(I.PCT_ENCODED, a)), L;
    }
    function ce(L) {
      return L.replace(/^0*(.*)/, "$1") || "0";
    }
    function q(L, I) {
      var V = L.match(I.IPV4ADDRESS) || [], O = f(V, 2), j = O[1];
      return j ? j.split(".").map(ce).join(".") : L;
    }
    function pe(L, I) {
      var V = L.match(I.IPV6ADDRESS) || [], O = f(V, 3), j = O[1], ee = O[2];
      if (j) {
        for (var ae = j.toLowerCase().split("::").reverse(), de = f(ae, 2), ve = de[0], we = de[1], me = we ? we.split(":").map(ce) : [], Ce = ve.split(":").map(ce), Me = I.IPV4ADDRESS.test(Ce[Ce.length - 1]), _e = Me ? 7 : 8, Ye = Ce.length - _e, mt = Array(_e), ht = 0; ht < _e; ++ht)
          mt[ht] = me[ht] || Ce[Ye + ht] || "";
        Me && (mt[_e - 1] = q(mt[_e - 1], I));
        var Mt = mt.reduce(function(ur, Ar, Pn) {
          if (!Ar || Ar === "0") {
            var qr = ur[ur.length - 1];
            qr && qr.index + qr.length === Pn ? qr.length++ : ur.push({ index: Pn, length: 1 });
          }
          return ur;
        }, []), Ir = Mt.sort(function(ur, Ar) {
          return Ar.length - ur.length;
        })[0], Nr = void 0;
        if (Ir && Ir.length > 1) {
          var io = mt.slice(0, Ir.index), Cn = mt.slice(Ir.index + Ir.length);
          Nr = io.join(":") + "::" + Cn.join(":");
        } else
          Nr = mt.join(":");
        return ee && (Nr += "%" + ee), Nr;
      } else
        return L;
    }
    var te = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i, fe = "".match(/(){0}/)[1] === void 0;
    function Pe(L) {
      var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, V = {}, O = I.iri !== !1 ? p : d;
      I.reference === "suffix" && (L = (I.scheme ? I.scheme + ":" : "") + "//" + L);
      var j = L.match(te);
      if (j) {
        fe ? (V.scheme = j[1], V.userinfo = j[3], V.host = j[4], V.port = parseInt(j[5], 10), V.path = j[6] || "", V.query = j[7], V.fragment = j[8], isNaN(V.port) && (V.port = j[5])) : (V.scheme = j[1] || void 0, V.userinfo = L.indexOf("@") !== -1 ? j[3] : void 0, V.host = L.indexOf("//") !== -1 ? j[4] : void 0, V.port = parseInt(j[5], 10), V.path = j[6] || "", V.query = L.indexOf("?") !== -1 ? j[7] : void 0, V.fragment = L.indexOf("#") !== -1 ? j[8] : void 0, isNaN(V.port) && (V.port = L.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? j[4] : void 0)), V.host && (V.host = pe(q(V.host, O), O)), V.scheme === void 0 && V.userinfo === void 0 && V.host === void 0 && V.port === void 0 && !V.path && V.query === void 0 ? V.reference = "same-document" : V.scheme === void 0 ? V.reference = "relative" : V.fragment === void 0 ? V.reference = "absolute" : V.reference = "uri", I.reference && I.reference !== "suffix" && I.reference !== V.reference && (V.error = V.error || "URI is not a " + I.reference + " reference.");
        var ee = Q[(I.scheme || V.scheme || "").toLowerCase()];
        if (!I.unicodeSupport && (!ee || !ee.unicodeSupport)) {
          if (V.host && (I.domainHost || ee && ee.domainHost))
            try {
              V.host = B.toASCII(V.host.replace(O.PCT_ENCODED, oe).toLowerCase());
            } catch (ae) {
              V.error = V.error || "Host's domain name can not be converted to ASCII via punycode: " + ae;
            }
          ie(V, d);
        } else
          ie(V, O);
        ee && ee.parse && ee.parse(V, I);
      } else
        V.error = V.error || "URI can not be parsed.";
      return V;
    }
    function je(L, I) {
      var V = I.iri !== !1 ? p : d, O = [];
      return L.userinfo !== void 0 && (O.push(L.userinfo), O.push("@")), L.host !== void 0 && O.push(pe(q(String(L.host), V), V).replace(V.IPV6ADDRESS, function(j, ee, ae) {
        return "[" + ee + (ae ? "%25" + ae : "") + "]";
      })), (typeof L.port == "number" || typeof L.port == "string") && (O.push(":"), O.push(String(L.port))), O.length ? O.join("") : void 0;
    }
    var Ve = /^\.\.?\//, st = /^\/\.(\/|$)/, ke = /^\/\.\.(\/|$)/, De = /^\/?(?:.|\n)*?(?=\/|$)/;
    function Qe(L) {
      for (var I = []; L.length; )
        if (L.match(Ve))
          L = L.replace(Ve, "");
        else if (L.match(st))
          L = L.replace(st, "/");
        else if (L.match(ke))
          L = L.replace(ke, "/"), I.pop();
        else if (L === "." || L === "..")
          L = "";
        else {
          var V = L.match(De);
          if (V) {
            var O = V[0];
            L = L.slice(O.length), I.push(O);
          } else
            throw new Error("Unexpected dot segment condition");
        }
      return I.join("");
    }
    function Ge(L) {
      var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, V = I.iri ? p : d, O = [], j = Q[(I.scheme || L.scheme || "").toLowerCase()];
      if (j && j.serialize && j.serialize(L, I), L.host && !V.IPV6ADDRESS.test(L.host)) {
        if (I.domainHost || j && j.domainHost)
          try {
            L.host = I.iri ? B.toUnicode(L.host) : B.toASCII(L.host.replace(V.PCT_ENCODED, oe).toLowerCase());
          } catch (de) {
            L.error = L.error || "Host's domain name can not be converted to " + (I.iri ? "Unicode" : "ASCII") + " via punycode: " + de;
          }
      }
      ie(L, V), I.reference !== "suffix" && L.scheme && (O.push(L.scheme), O.push(":"));
      var ee = je(L, I);
      if (ee !== void 0 && (I.reference !== "suffix" && O.push("//"), O.push(ee), L.path && L.path.charAt(0) !== "/" && O.push("/")), L.path !== void 0) {
        var ae = L.path;
        !I.absolutePath && (!j || !j.absolutePath) && (ae = Qe(ae)), ee === void 0 && (ae = ae.replace(/^\/\//, "/%2F")), O.push(ae);
      }
      return L.query !== void 0 && (O.push("?"), O.push(L.query)), L.fragment !== void 0 && (O.push("#"), O.push(L.fragment)), O.join("");
    }
    function Ue(L, I) {
      var V = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, O = arguments[3], j = {};
      return O || (L = Pe(Ge(L, V), V), I = Pe(Ge(I, V), V)), V = V || {}, !V.tolerant && I.scheme ? (j.scheme = I.scheme, j.userinfo = I.userinfo, j.host = I.host, j.port = I.port, j.path = Qe(I.path || ""), j.query = I.query) : (I.userinfo !== void 0 || I.host !== void 0 || I.port !== void 0 ? (j.userinfo = I.userinfo, j.host = I.host, j.port = I.port, j.path = Qe(I.path || ""), j.query = I.query) : (I.path ? (I.path.charAt(0) === "/" ? j.path = Qe(I.path) : ((L.userinfo !== void 0 || L.host !== void 0 || L.port !== void 0) && !L.path ? j.path = "/" + I.path : L.path ? j.path = L.path.slice(0, L.path.lastIndexOf("/") + 1) + I.path : j.path = I.path, j.path = Qe(j.path)), j.query = I.query) : (j.path = L.path, I.query !== void 0 ? j.query = I.query : j.query = L.query), j.userinfo = L.userinfo, j.host = L.host, j.port = L.port), j.scheme = L.scheme), j.fragment = I.fragment, j;
    }
    function le(L, I, V) {
      var O = c({ scheme: "null" }, V);
      return Ge(Ue(Pe(L, O), Pe(I, O), O, !0), O);
    }
    function ye(L, I) {
      return typeof L == "string" ? L = Ge(Pe(L, I), I) : i(L) === "object" && (L = Pe(Ge(L, I), I)), L;
    }
    function be(L, I, V) {
      return typeof L == "string" ? L = Ge(Pe(L, V), V) : i(L) === "object" && (L = Ge(L, V)), typeof I == "string" ? I = Ge(Pe(I, V), V) : i(I) === "object" && (I = Ge(I, V)), L === I;
    }
    function ge(L, I) {
      return L && L.toString().replace(!I || !I.iri ? d.ESCAPE : p.ESCAPE, Y);
    }
    function ue(L, I) {
      return L && L.toString().replace(!I || !I.iri ? d.PCT_ENCODED : p.PCT_ENCODED, oe);
    }
    var We = {
      scheme: "http",
      domainHost: !0,
      parse: function(I, V) {
        return I.host || (I.error = I.error || "HTTP URIs must have a host."), I;
      },
      serialize: function(I, V) {
        var O = String(I.scheme).toLowerCase() === "https";
        return (I.port === (O ? 443 : 80) || I.port === "") && (I.port = void 0), I.path || (I.path = "/"), I;
      }
    }, Ne = {
      scheme: "https",
      domainHost: We.domainHost,
      parse: We.parse,
      serialize: We.serialize
    };
    function Xe(L) {
      return typeof L.secure == "boolean" ? L.secure : String(L.scheme).toLowerCase() === "wss";
    }
    var Je = {
      scheme: "ws",
      domainHost: !0,
      parse: function(I, V) {
        var O = I;
        return O.secure = Xe(O), O.resourceName = (O.path || "/") + (O.query ? "?" + O.query : ""), O.path = void 0, O.query = void 0, O;
      },
      serialize: function(I, V) {
        if ((I.port === (Xe(I) ? 443 : 80) || I.port === "") && (I.port = void 0), typeof I.secure == "boolean" && (I.scheme = I.secure ? "wss" : "ws", I.secure = void 0), I.resourceName) {
          var O = I.resourceName.split("?"), j = f(O, 2), ee = j[0], ae = j[1];
          I.path = ee && ee !== "/" ? ee : void 0, I.query = ae, I.resourceName = void 0;
        }
        return I.fragment = void 0, I;
      }
    }, Ot = {
      scheme: "wss",
      domainHost: Je.domainHost,
      parse: Je.parse,
      serialize: Je.serialize
    }, re = {}, se = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]", $e = "[0-9A-Fa-f]", Ae = o(o("%[EFef]" + $e + "%" + $e + $e + "%" + $e + $e) + "|" + o("%[89A-Fa-f]" + $e + "%" + $e + $e) + "|" + o("%" + $e + $e)), et = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]", St = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]", _t = n(St, '[\\"\\\\]'), Yt = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]", kt = new RegExp(se, "g"), Ut = new RegExp(Ae, "g"), wn = new RegExp(n("[^]", et, "[\\.]", '[\\"]', _t), "g"), Tn = new RegExp(n("[^]", se, Yt), "g"), On = Tn;
    function Rr(L) {
      var I = oe(L);
      return I.match(kt) ? I : L;
    }
    var Wr = {
      scheme: "mailto",
      parse: function(I, V) {
        var O = I, j = O.to = O.path ? O.path.split(",") : [];
        if (O.path = void 0, O.query) {
          for (var ee = !1, ae = {}, de = O.query.split("&"), ve = 0, we = de.length; ve < we; ++ve) {
            var me = de[ve].split("=");
            switch (me[0]) {
              case "to":
                for (var Ce = me[1].split(","), Me = 0, _e = Ce.length; Me < _e; ++Me)
                  j.push(Ce[Me]);
                break;
              case "subject":
                O.subject = ue(me[1], V);
                break;
              case "body":
                O.body = ue(me[1], V);
                break;
              default:
                ee = !0, ae[ue(me[0], V)] = ue(me[1], V);
                break;
            }
          }
          ee && (O.headers = ae);
        }
        O.query = void 0;
        for (var Ye = 0, mt = j.length; Ye < mt; ++Ye) {
          var ht = j[Ye].split("@");
          if (ht[0] = ue(ht[0]), V.unicodeSupport)
            ht[1] = ue(ht[1], V).toLowerCase();
          else
            try {
              ht[1] = B.toASCII(ue(ht[1], V).toLowerCase());
            } catch (Mt) {
              O.error = O.error || "Email address's domain name can not be converted to ASCII via punycode: " + Mt;
            }
          j[Ye] = ht.join("@");
        }
        return O;
      },
      serialize: function(I, V) {
        var O = I, j = l(I.to);
        if (j) {
          for (var ee = 0, ae = j.length; ee < ae; ++ee) {
            var de = String(j[ee]), ve = de.lastIndexOf("@"), we = de.slice(0, ve).replace(Ut, Rr).replace(Ut, a).replace(wn, Y), me = de.slice(ve + 1);
            try {
              me = V.iri ? B.toUnicode(me) : B.toASCII(ue(me, V).toLowerCase());
            } catch (Ye) {
              O.error = O.error || "Email address's domain name can not be converted to " + (V.iri ? "Unicode" : "ASCII") + " via punycode: " + Ye;
            }
            j[ee] = we + "@" + me;
          }
          O.path = j.join(",");
        }
        var Ce = I.headers = I.headers || {};
        I.subject && (Ce.subject = I.subject), I.body && (Ce.body = I.body);
        var Me = [];
        for (var _e in Ce)
          Ce[_e] !== re[_e] && Me.push(_e.replace(Ut, Rr).replace(Ut, a).replace(Tn, Y) + "=" + Ce[_e].replace(Ut, Rr).replace(Ut, a).replace(On, Y));
        return Me.length && (O.query = Me.join("&")), O;
      }
    }, ci = /^([^\:]+)\:(.*)/, ro = {
      scheme: "urn",
      parse: function(I, V) {
        var O = I.path && I.path.match(ci), j = I;
        if (O) {
          var ee = V.scheme || j.scheme || "urn", ae = O[1].toLowerCase(), de = O[2], ve = ee + ":" + (V.nid || ae), we = Q[ve];
          j.nid = ae, j.nss = de, j.path = void 0, we && (j = we.parse(j, V));
        } else
          j.error = j.error || "URN can not be parsed.";
        return j;
      },
      serialize: function(I, V) {
        var O = V.scheme || I.scheme || "urn", j = I.nid, ee = O + ":" + (V.nid || j), ae = Q[ee];
        ae && (I = ae.serialize(I, V));
        var de = I, ve = I.nss;
        return de.path = (j || V.nid) + ":" + ve, de;
      }
    }, no = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/, oo = {
      scheme: "urn:uuid",
      parse: function(I, V) {
        var O = I;
        return O.uuid = O.nss, O.nss = void 0, !V.tolerant && (!O.uuid || !O.uuid.match(no)) && (O.error = O.error || "UUID is not valid."), O;
      },
      serialize: function(I, V) {
        var O = I;
        return O.nss = (I.uuid || "").toLowerCase(), O;
      }
    };
    Q[We.scheme] = We, Q[Ne.scheme] = Ne, Q[Je.scheme] = Je, Q[Ot.scheme] = Ot, Q[Wr.scheme] = Wr, Q[ro.scheme] = ro, Q[oo.scheme] = oo, r.SCHEMES = Q, r.pctEncChar = Y, r.pctDecChars = oe, r.parse = Pe, r.removeDotSegments = Qe, r.serialize = Ge, r.resolveComponents = Ue, r.resolve = le, r.normalize = ye, r.equal = be, r.escapeComponent = ge, r.unescapeComponent = ue, Object.defineProperty(r, "__esModule", { value: !0 });
  });
})(du, du.exports);
var m7 = du.exports;
Object.defineProperty(sf, "__esModule", { value: !0 });
const E$ = m7;
E$.code = 'require("ajv/dist/runtime/uri").default';
sf.default = E$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Cr;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Be;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Es, o = _s, i = Gn, a = Qt, l = Be, c = zt, u = Ss, d = tt, p = p7, f = sf, m = (D, N) => new RegExp(D, N);
  m.code = "new RegExp";
  const h = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), y = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, v = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, $ = 200;
  function E(D) {
    var N, W, F, T, R, B, Q, Y, oe, ie, ce, q, pe, te, fe, Pe, je, Ve, st, ke, De, Qe, Ge, Ue, le;
    const ye = D.strict, be = (N = D.code) === null || N === void 0 ? void 0 : N.optimize, ge = be === !0 || be === void 0 ? 1 : be || 0, ue = (F = (W = D.code) === null || W === void 0 ? void 0 : W.regExp) !== null && F !== void 0 ? F : m, We = (T = D.uriResolver) !== null && T !== void 0 ? T : f.default;
    return {
      strictSchema: (B = (R = D.strictSchema) !== null && R !== void 0 ? R : ye) !== null && B !== void 0 ? B : !0,
      strictNumbers: (Y = (Q = D.strictNumbers) !== null && Q !== void 0 ? Q : ye) !== null && Y !== void 0 ? Y : !0,
      strictTypes: (ie = (oe = D.strictTypes) !== null && oe !== void 0 ? oe : ye) !== null && ie !== void 0 ? ie : "log",
      strictTuples: (q = (ce = D.strictTuples) !== null && ce !== void 0 ? ce : ye) !== null && q !== void 0 ? q : "log",
      strictRequired: (te = (pe = D.strictRequired) !== null && pe !== void 0 ? pe : ye) !== null && te !== void 0 ? te : !1,
      code: D.code ? { ...D.code, optimize: ge, regExp: ue } : { optimize: ge, regExp: ue },
      loopRequired: (fe = D.loopRequired) !== null && fe !== void 0 ? fe : $,
      loopEnum: (Pe = D.loopEnum) !== null && Pe !== void 0 ? Pe : $,
      meta: (je = D.meta) !== null && je !== void 0 ? je : !0,
      messages: (Ve = D.messages) !== null && Ve !== void 0 ? Ve : !0,
      inlineRefs: (st = D.inlineRefs) !== null && st !== void 0 ? st : !0,
      schemaId: (ke = D.schemaId) !== null && ke !== void 0 ? ke : "$id",
      addUsedSchema: (De = D.addUsedSchema) !== null && De !== void 0 ? De : !0,
      validateSchema: (Qe = D.validateSchema) !== null && Qe !== void 0 ? Qe : !0,
      validateFormats: (Ge = D.validateFormats) !== null && Ge !== void 0 ? Ge : !0,
      unicodeRegExp: (Ue = D.unicodeRegExp) !== null && Ue !== void 0 ? Ue : !0,
      int32range: (le = D.int32range) !== null && le !== void 0 ? le : !0,
      uriResolver: We
    };
  }
  class S {
    constructor(N = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), N = this.opts = { ...N, ...E(N) };
      const { es5: W, lines: F } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: g, es5: W, lines: F }), this.logger = U(N.logger);
      const T = N.validateFormats;
      N.validateFormats = !1, this.RULES = (0, i.getRules)(), b.call(this, y, N, "NOT SUPPORTED"), b.call(this, v, N, "DEPRECATED", "warn"), this._metaOpts = k.call(this), N.formats && A.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), N.keywords && M.call(this, N.keywords), typeof N.meta == "object" && this.addMetaSchema(N.meta), w.call(this), N.validateFormats = T;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: N, meta: W, schemaId: F } = this.opts;
      let T = p;
      F === "id" && (T = { ...p }, T.id = T.$id, delete T.$id), W && N && this.addMetaSchema(T, T[F], !1);
    }
    defaultMeta() {
      const { meta: N, schemaId: W } = this.opts;
      return this.opts.defaultMeta = typeof N == "object" ? N[W] || N : void 0;
    }
    validate(N, W) {
      let F;
      if (typeof N == "string") {
        if (F = this.getSchema(N), !F)
          throw new Error(`no schema with key or ref "${N}"`);
      } else
        F = this.compile(N);
      const T = F(W);
      return "$async" in F || (this.errors = F.errors), T;
    }
    compile(N, W) {
      const F = this._addSchema(N, W);
      return F.validate || this._compileSchemaEnv(F);
    }
    compileAsync(N, W) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: F } = this.opts;
      return T.call(this, N, W);
      async function T(ie, ce) {
        await R.call(this, ie.$schema);
        const q = this._addSchema(ie, ce);
        return q.validate || B.call(this, q);
      }
      async function R(ie) {
        ie && !this.getSchema(ie) && await T.call(this, { $ref: ie }, !0);
      }
      async function B(ie) {
        try {
          return this._compileSchemaEnv(ie);
        } catch (ce) {
          if (!(ce instanceof o.default))
            throw ce;
          return Q.call(this, ce), await Y.call(this, ce.missingSchema), B.call(this, ie);
        }
      }
      function Q({ missingSchema: ie, missingRef: ce }) {
        if (this.refs[ie])
          throw new Error(`AnySchema ${ie} is loaded but ${ce} cannot be resolved`);
      }
      async function Y(ie) {
        const ce = await oe.call(this, ie);
        this.refs[ie] || await R.call(this, ce.$schema), this.refs[ie] || this.addSchema(ce, ie, W);
      }
      async function oe(ie) {
        const ce = this._loading[ie];
        if (ce)
          return ce;
        try {
          return await (this._loading[ie] = F(ie));
        } finally {
          delete this._loading[ie];
        }
      }
    }
    // Adds schema to the instance
    addSchema(N, W, F, T = this.opts.validateSchema) {
      if (Array.isArray(N)) {
        for (const B of N)
          this.addSchema(B, void 0, F, T);
        return this;
      }
      let R;
      if (typeof N == "object") {
        const { schemaId: B } = this.opts;
        if (R = N[B], R !== void 0 && typeof R != "string")
          throw new Error(`schema ${B} must be string`);
      }
      return W = (0, c.normalizeId)(W || R), this._checkUnique(W), this.schemas[W] = this._addSchema(N, F, W, T, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(N, W, F = this.opts.validateSchema) {
      return this.addSchema(N, W, !0, F), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(N, W) {
      if (typeof N == "boolean")
        return !0;
      let F;
      if (F = N.$schema, F !== void 0 && typeof F != "string")
        throw new Error("$schema must be a string");
      if (F = F || this.opts.defaultMeta || this.defaultMeta(), !F)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const T = this.validate(F, N);
      if (!T && W) {
        const R = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(R);
        else
          throw new Error(R);
      }
      return T;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(N) {
      let W;
      for (; typeof (W = x.call(this, N)) == "string"; )
        N = W;
      if (W === void 0) {
        const { schemaId: F } = this.opts, T = new a.SchemaEnv({ schema: {}, schemaId: F });
        if (W = a.resolveSchema.call(this, T, N), !W)
          return;
        this.refs[N] = W;
      }
      return W.validate || this._compileSchemaEnv(W);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(N) {
      if (N instanceof RegExp)
        return this._removeAllSchemas(this.schemas, N), this._removeAllSchemas(this.refs, N), this;
      switch (typeof N) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const W = x.call(this, N);
          return typeof W == "object" && this._cache.delete(W.schema), delete this.schemas[N], delete this.refs[N], this;
        }
        case "object": {
          const W = N;
          this._cache.delete(W);
          let F = N[this.opts.schemaId];
          return F && (F = (0, c.normalizeId)(F), delete this.schemas[F], delete this.refs[F]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(N) {
      for (const W of N)
        this.addKeyword(W);
      return this;
    }
    addKeyword(N, W) {
      let F;
      if (typeof N == "string")
        F = N, typeof W == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), W.keyword = F);
      else if (typeof N == "object" && W === void 0) {
        if (W = N, F = W.keyword, Array.isArray(F) && !F.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (z.call(this, F, W), !W)
        return (0, d.eachItem)(F, (R) => G.call(this, R)), this;
      J.call(this, W);
      const T = {
        ...W,
        type: (0, u.getJSONTypes)(W.type),
        schemaType: (0, u.getJSONTypes)(W.schemaType)
      };
      return (0, d.eachItem)(F, T.type.length === 0 ? (R) => G.call(this, R, T) : (R) => T.type.forEach((B) => G.call(this, R, T, B))), this;
    }
    getKeyword(N) {
      const W = this.RULES.all[N];
      return typeof W == "object" ? W.definition : !!W;
    }
    // Remove keyword
    removeKeyword(N) {
      const { RULES: W } = this;
      delete W.keywords[N], delete W.all[N];
      for (const F of W.rules) {
        const T = F.rules.findIndex((R) => R.keyword === N);
        T >= 0 && F.rules.splice(T, 1);
      }
      return this;
    }
    // Add format
    addFormat(N, W) {
      return typeof W == "string" && (W = new RegExp(W)), this.formats[N] = W, this;
    }
    errorsText(N = this.errors, { separator: W = ", ", dataVar: F = "data" } = {}) {
      return !N || N.length === 0 ? "No errors" : N.map((T) => `${F}${T.instancePath} ${T.message}`).reduce((T, R) => T + W + R);
    }
    $dataMetaSchema(N, W) {
      const F = this.RULES.all;
      N = JSON.parse(JSON.stringify(N));
      for (const T of W) {
        const R = T.split("/").slice(1);
        let B = N;
        for (const Q of R)
          B = B[Q];
        for (const Q in F) {
          const Y = F[Q];
          if (typeof Y != "object")
            continue;
          const { $data: oe } = Y.definition, ie = B[Q];
          oe && ie && (B[Q] = ne(ie));
        }
      }
      return N;
    }
    _removeAllSchemas(N, W) {
      for (const F in N) {
        const T = N[F];
        (!W || W.test(F)) && (typeof T == "string" ? delete N[F] : T && !T.meta && (this._cache.delete(T.schema), delete N[F]));
      }
    }
    _addSchema(N, W, F, T = this.opts.validateSchema, R = this.opts.addUsedSchema) {
      let B;
      const { schemaId: Q } = this.opts;
      if (typeof N == "object")
        B = N[Q];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof N != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let Y = this._cache.get(N);
      if (Y !== void 0)
        return Y;
      F = (0, c.normalizeId)(B || F);
      const oe = c.getSchemaRefs.call(this, N, F);
      return Y = new a.SchemaEnv({ schema: N, schemaId: Q, meta: W, baseId: F, localRefs: oe }), this._cache.set(Y.schema, Y), R && !F.startsWith("#") && (F && this._checkUnique(F), this.refs[F] = Y), T && this.validateSchema(N, !0), Y;
    }
    _checkUnique(N) {
      if (this.schemas[N] || this.refs[N])
        throw new Error(`schema with key or id "${N}" already exists`);
    }
    _compileSchemaEnv(N) {
      if (N.meta ? this._compileMetaSchema(N) : a.compileSchema.call(this, N), !N.validate)
        throw new Error("ajv implementation error");
      return N.validate;
    }
    _compileMetaSchema(N) {
      const W = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, N);
      } finally {
        this.opts = W;
      }
    }
  }
  e.default = S, S.ValidationError = n.default, S.MissingRefError = o.default;
  function b(D, N, W, F = "error") {
    for (const T in D) {
      const R = T;
      R in N && this.logger[F](`${W}: option ${T}. ${D[R]}`);
    }
  }
  function x(D) {
    return D = (0, c.normalizeId)(D), this.schemas[D] || this.refs[D];
  }
  function w() {
    const D = this.opts.schemas;
    if (D)
      if (Array.isArray(D))
        this.addSchema(D);
      else
        for (const N in D)
          this.addSchema(D[N], N);
  }
  function A() {
    for (const D in this.opts.formats) {
      const N = this.opts.formats[D];
      N && this.addFormat(D, N);
    }
  }
  function M(D) {
    if (Array.isArray(D)) {
      this.addVocabulary(D);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const N in D) {
      const W = D[N];
      W.keyword || (W.keyword = N), this.addKeyword(W);
    }
  }
  function k() {
    const D = { ...this.opts };
    for (const N of h)
      delete D[N];
    return D;
  }
  const H = { log() {
  }, warn() {
  }, error() {
  } };
  function U(D) {
    if (D === !1)
      return H;
    if (D === void 0)
      return console;
    if (D.log && D.warn && D.error)
      return D;
    throw new Error("logger must implement log, warn and error methods");
  }
  const K = /^[a-z_$][a-z0-9_$:-]*$/i;
  function z(D, N) {
    const { RULES: W } = this;
    if ((0, d.eachItem)(D, (F) => {
      if (W.keywords[F])
        throw new Error(`Keyword ${F} is already defined`);
      if (!K.test(F))
        throw new Error(`Keyword ${F} has invalid name`);
    }), !!N && N.$data && !("code" in N || "validate" in N))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function G(D, N, W) {
    var F;
    const T = N == null ? void 0 : N.post;
    if (W && T)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: R } = this;
    let B = T ? R.post : R.rules.find(({ type: Y }) => Y === W);
    if (B || (B = { type: W, rules: [] }, R.rules.push(B)), R.keywords[D] = !0, !N)
      return;
    const Q = {
      keyword: D,
      definition: {
        ...N,
        type: (0, u.getJSONTypes)(N.type),
        schemaType: (0, u.getJSONTypes)(N.schemaType)
      }
    };
    N.before ? X.call(this, B, Q, N.before) : B.rules.push(Q), R.all[D] = Q, (F = N.implements) === null || F === void 0 || F.forEach((Y) => this.addKeyword(Y));
  }
  function X(D, N, W) {
    const F = D.rules.findIndex((T) => T.keyword === W);
    F >= 0 ? D.rules.splice(F, 0, N) : (D.rules.push(N), this.logger.warn(`rule ${W} is not defined`));
  }
  function J(D) {
    let { metaSchema: N } = D;
    N !== void 0 && (D.$data && this.opts.$data && (N = ne(N)), D.validateSchema = this.compile(N, !0));
  }
  const Z = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function ne(D) {
    return { anyOf: [D, Z] };
  }
})(J0);
var af = {}, lf = {}, cf = {};
Object.defineProperty(cf, "__esModule", { value: !0 });
const h7 = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
cf.default = h7;
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.callRef = Yn.getValidate = void 0;
const y7 = _s, oy = qe, Zt = Be, yo = Ur, iy = Qt, Us = tt, g7 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: o, schemaEnv: i, validateName: a, opts: l, self: c } = n, { root: u } = i;
    if ((r === "#" || r === "#/") && o === u.baseId)
      return p();
    const d = iy.resolveRef.call(c, u, o, r);
    if (d === void 0)
      throw new y7.default(n.opts.uriResolver, o, r);
    if (d instanceof iy.SchemaEnv)
      return f(d);
    return m(d);
    function p() {
      if (i === u)
        return la(e, a, i, i.$async);
      const h = t.scopeValue("root", { ref: u });
      return la(e, (0, Zt._)`${h}.validate`, u, u.$async);
    }
    function f(h) {
      const g = _$(e, h);
      la(e, g, h, h.$async);
    }
    function m(h) {
      const g = t.scopeValue("schema", l.code.source === !0 ? { ref: h, code: (0, Zt.stringify)(h) } : { ref: h }), y = t.name("valid"), v = e.subschema({
        schema: h,
        dataTypes: [],
        schemaPath: Zt.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, y);
      e.mergeEvaluated(v), e.ok(y);
    }
  }
};
function _$(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Zt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Yn.getValidate = _$;
function la(e, t, r, n) {
  const { gen: o, it: i } = e, { allErrors: a, schemaEnv: l, opts: c } = i, u = c.passContext ? yo.default.this : Zt.nil;
  n ? d() : p();
  function d() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const h = o.let("valid");
    o.try(() => {
      o.code((0, Zt._)`await ${(0, oy.callValidateCode)(e, t, u)}`), m(t), a || o.assign(h, !0);
    }, (g) => {
      o.if((0, Zt._)`!(${g} instanceof ${i.ValidationError})`, () => o.throw(g)), f(g), a || o.assign(h, !1);
    }), e.ok(h);
  }
  function p() {
    e.result((0, oy.callValidateCode)(e, t, u), () => m(t), () => f(t));
  }
  function f(h) {
    const g = (0, Zt._)`${h}.errors`;
    o.assign(yo.default.vErrors, (0, Zt._)`${yo.default.vErrors} === null ? ${g} : ${yo.default.vErrors}.concat(${g})`), o.assign(yo.default.errors, (0, Zt._)`${yo.default.vErrors}.length`);
  }
  function m(h) {
    var g;
    if (!i.opts.unevaluated)
      return;
    const y = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (i.props !== !0)
      if (y && !y.dynamicProps)
        y.props !== void 0 && (i.props = Us.mergeEvaluated.props(o, y.props, i.props));
      else {
        const v = o.var("props", (0, Zt._)`${h}.evaluated.props`);
        i.props = Us.mergeEvaluated.props(o, v, i.props, Zt.Name);
      }
    if (i.items !== !0)
      if (y && !y.dynamicItems)
        y.items !== void 0 && (i.items = Us.mergeEvaluated.items(o, y.items, i.items));
      else {
        const v = o.var("items", (0, Zt._)`${h}.evaluated.items`);
        i.items = Us.mergeEvaluated.items(o, v, i.items, Zt.Name);
      }
  }
}
Yn.callRef = la;
Yn.default = g7;
Object.defineProperty(lf, "__esModule", { value: !0 });
const v7 = cf, b7 = Yn, $7 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  v7.default,
  b7.default
];
lf.default = $7;
var uf = {}, df = {};
Object.defineProperty(df, "__esModule", { value: !0 });
const Da = Be, un = Da.operators, Fa = {
  maximum: { okStr: "<=", ok: un.LTE, fail: un.GT },
  minimum: { okStr: ">=", ok: un.GTE, fail: un.LT },
  exclusiveMaximum: { okStr: "<", ok: un.LT, fail: un.GTE },
  exclusiveMinimum: { okStr: ">", ok: un.GT, fail: un.LTE }
}, S7 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Da.str)`must be ${Fa[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Da._)`{comparison: ${Fa[e].okStr}, limit: ${t}}`
}, E7 = {
  keyword: Object.keys(Fa),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: S7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Da._)`${r} ${Fa[t].fail} ${n} || isNaN(${r})`);
  }
};
df.default = E7;
var ff = {};
Object.defineProperty(ff, "__esModule", { value: !0 });
const Vi = Be, _7 = {
  message: ({ schemaCode: e }) => (0, Vi.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Vi._)`{multipleOf: ${e}}`
}, x7 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: _7,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: o } = e, i = o.opts.multipleOfPrecision, a = t.let("res"), l = i ? (0, Vi._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${i}` : (0, Vi._)`${a} !== parseInt(${a})`;
    e.fail$data((0, Vi._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
ff.default = x7;
var pf = {}, mf = {};
Object.defineProperty(mf, "__esModule", { value: !0 });
function x$(e) {
  const t = e.length;
  let r = 0, n = 0, o;
  for (; n < t; )
    r++, o = e.charCodeAt(n++), o >= 55296 && o <= 56319 && n < t && (o = e.charCodeAt(n), (o & 64512) === 56320 && n++);
  return r;
}
mf.default = x$;
x$.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(pf, "__esModule", { value: !0 });
const Ln = Be, w7 = tt, T7 = mf, O7 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Ln.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Ln._)`{limit: ${e}}`
}, C7 = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: O7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: o } = e, i = t === "maxLength" ? Ln.operators.GT : Ln.operators.LT, a = o.opts.unicode === !1 ? (0, Ln._)`${r}.length` : (0, Ln._)`${(0, w7.useFunc)(e.gen, T7.default)}(${r})`;
    e.fail$data((0, Ln._)`${a} ${i} ${n}`);
  }
};
pf.default = C7;
var hf = {};
Object.defineProperty(hf, "__esModule", { value: !0 });
const P7 = qe, La = Be, R7 = {
  message: ({ schemaCode: e }) => (0, La.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, La._)`{pattern: ${e}}`
}, I7 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: R7,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: o, it: i } = e, a = i.opts.unicodeRegExp ? "u" : "", l = r ? (0, La._)`(new RegExp(${o}, ${a}))` : (0, P7.usePattern)(e, n);
    e.fail$data((0, La._)`!${l}.test(${t})`);
  }
};
hf.default = I7;
var yf = {};
Object.defineProperty(yf, "__esModule", { value: !0 });
const zi = Be, N7 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, zi.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, zi._)`{limit: ${e}}`
}, A7 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: N7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, o = t === "maxProperties" ? zi.operators.GT : zi.operators.LT;
    e.fail$data((0, zi._)`Object.keys(${r}).length ${o} ${n}`);
  }
};
yf.default = A7;
var gf = {};
Object.defineProperty(gf, "__esModule", { value: !0 });
const Pi = qe, Ui = Be, j7 = tt, k7 = {
  message: ({ params: { missingProperty: e } }) => (0, Ui.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Ui._)`{missingProperty: ${e}}`
}, M7 = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: k7,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: o, $data: i, it: a } = e, { opts: l } = a;
    if (!i && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (a.allErrors ? u() : d(), l.strictRequired) {
      const m = e.parentSchema.properties, { definedProperties: h } = e.it;
      for (const g of r)
        if ((m == null ? void 0 : m[g]) === void 0 && !h.has(g)) {
          const y = a.schemaEnv.baseId + a.errSchemaPath, v = `required property "${g}" is not defined at "${y}" (strictRequired)`;
          (0, j7.checkStrictMode)(a, v, a.opts.strictRequired);
        }
    }
    function u() {
      if (c || i)
        e.block$data(Ui.nil, p);
      else
        for (const m of r)
          (0, Pi.checkReportMissingProp)(e, m);
    }
    function d() {
      const m = t.let("missing");
      if (c || i) {
        const h = t.let("valid", !0);
        e.block$data(h, () => f(m, h)), e.ok(h);
      } else
        t.if((0, Pi.checkMissingProp)(e, r, m)), (0, Pi.reportMissingProp)(e, m), t.else();
    }
    function p() {
      t.forOf("prop", n, (m) => {
        e.setParams({ missingProperty: m }), t.if((0, Pi.noPropertyInData)(t, o, m, l.ownProperties), () => e.error());
      });
    }
    function f(m, h) {
      e.setParams({ missingProperty: m }), t.forOf(m, n, () => {
        t.assign(h, (0, Pi.propertyInData)(t, o, m, l.ownProperties)), t.if((0, Ui.not)(h), () => {
          e.error(), t.break();
        });
      }, Ui.nil);
    }
  }
};
gf.default = M7;
var vf = {};
Object.defineProperty(vf, "__esModule", { value: !0 });
const Wi = Be, D7 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Wi.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Wi._)`{limit: ${e}}`
}, F7 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: D7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, o = t === "maxItems" ? Wi.operators.GT : Wi.operators.LT;
    e.fail$data((0, Wi._)`${r}.length ${o} ${n}`);
  }
};
vf.default = F7;
var bf = {}, xs = {};
Object.defineProperty(xs, "__esModule", { value: !0 });
const w$ = i$;
w$.code = 'require("ajv/dist/runtime/equal").default';
xs.default = w$;
Object.defineProperty(bf, "__esModule", { value: !0 });
const Ic = Ss, Bt = Be, L7 = tt, B7 = xs, V7 = {
  message: ({ params: { i: e, j: t } }) => (0, Bt.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Bt._)`{i: ${e}, j: ${t}}`
}, z7 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: V7,
  code(e) {
    const { gen: t, data: r, $data: n, schema: o, parentSchema: i, schemaCode: a, it: l } = e;
    if (!n && !o)
      return;
    const c = t.let("valid"), u = i.items ? (0, Ic.getSchemaTypes)(i.items) : [];
    e.block$data(c, d, (0, Bt._)`${a} === false`), e.ok(c);
    function d() {
      const h = t.let("i", (0, Bt._)`${r}.length`), g = t.let("j");
      e.setParams({ i: h, j: g }), t.assign(c, !0), t.if((0, Bt._)`${h} > 1`, () => (p() ? f : m)(h, g));
    }
    function p() {
      return u.length > 0 && !u.some((h) => h === "object" || h === "array");
    }
    function f(h, g) {
      const y = t.name("item"), v = (0, Ic.checkDataTypes)(u, y, l.opts.strictNumbers, Ic.DataType.Wrong), $ = t.const("indices", (0, Bt._)`{}`);
      t.for((0, Bt._)`;${h}--;`, () => {
        t.let(y, (0, Bt._)`${r}[${h}]`), t.if(v, (0, Bt._)`continue`), u.length > 1 && t.if((0, Bt._)`typeof ${y} == "string"`, (0, Bt._)`${y} += "_"`), t.if((0, Bt._)`typeof ${$}[${y}] == "number"`, () => {
          t.assign(g, (0, Bt._)`${$}[${y}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Bt._)`${$}[${y}] = ${h}`);
      });
    }
    function m(h, g) {
      const y = (0, L7.useFunc)(t, B7.default), v = t.name("outer");
      t.label(v).for((0, Bt._)`;${h}--;`, () => t.for((0, Bt._)`${g} = ${h}; ${g}--;`, () => t.if((0, Bt._)`${y}(${r}[${h}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(v);
      })));
    }
  }
};
bf.default = z7;
var $f = {};
Object.defineProperty($f, "__esModule", { value: !0 });
const fu = Be, U7 = tt, W7 = xs, q7 = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, fu._)`{allowedValue: ${e}}`
}, K7 = {
  keyword: "const",
  $data: !0,
  error: q7,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: o, schema: i } = e;
    n || i && typeof i == "object" ? e.fail$data((0, fu._)`!${(0, U7.useFunc)(t, W7.default)}(${r}, ${o})`) : e.fail((0, fu._)`${i} !== ${r}`);
  }
};
$f.default = K7;
var Sf = {};
Object.defineProperty(Sf, "__esModule", { value: !0 });
const Ni = Be, H7 = tt, G7 = xs, Y7 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ni._)`{allowedValues: ${e}}`
}, X7 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Y7,
  code(e) {
    const { gen: t, data: r, $data: n, schema: o, schemaCode: i, it: a } = e;
    if (!n && o.length === 0)
      throw new Error("enum must have non-empty array");
    const l = o.length >= a.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, H7.useFunc)(t, G7.default));
    let d;
    if (l || n)
      d = t.let("valid"), e.block$data(d, p);
    else {
      if (!Array.isArray(o))
        throw new Error("ajv implementation error");
      const m = t.const("vSchema", i);
      d = (0, Ni.or)(...o.map((h, g) => f(m, g)));
    }
    e.pass(d);
    function p() {
      t.assign(d, !1), t.forOf("v", i, (m) => t.if((0, Ni._)`${u()}(${r}, ${m})`, () => t.assign(d, !0).break()));
    }
    function f(m, h) {
      const g = o[h];
      return typeof g == "object" && g !== null ? (0, Ni._)`${u()}(${r}, ${m}[${h}])` : (0, Ni._)`${r} === ${g}`;
    }
  }
};
Sf.default = X7;
Object.defineProperty(uf, "__esModule", { value: !0 });
const J7 = df, Z7 = ff, Q7 = pf, eY = hf, tY = yf, rY = gf, nY = vf, oY = bf, iY = $f, sY = Sf, aY = [
  // number
  J7.default,
  Z7.default,
  // string
  Q7.default,
  eY.default,
  // object
  tY.default,
  rY.default,
  // array
  nY.default,
  oY.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  iY.default,
  sY.default
];
uf.default = aY;
var Ef = {}, ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.validateAdditionalItems = void 0;
const Bn = Be, pu = tt, lY = {
  message: ({ params: { len: e } }) => (0, Bn.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Bn._)`{limit: ${e}}`
}, cY = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: lY,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, pu.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    T$(e, n);
  }
};
function T$(e, t) {
  const { gen: r, schema: n, data: o, keyword: i, it: a } = e;
  a.items = !0;
  const l = r.const("len", (0, Bn._)`${o}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Bn._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, pu.alwaysValidSchema)(a, n)) {
    const u = r.var("valid", (0, Bn._)`${l} <= ${t.length}`);
    r.if((0, Bn.not)(u), () => c(u)), e.ok(u);
  }
  function c(u) {
    r.forRange("i", t.length, l, (d) => {
      e.subschema({ keyword: i, dataProp: d, dataPropType: pu.Type.Num }, u), a.allErrors || r.if((0, Bn.not)(u), () => r.break());
    });
  }
}
ai.validateAdditionalItems = T$;
ai.default = cY;
var _f = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.validateTuple = void 0;
const sy = Be, ca = tt, uY = qe, dY = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return O$(e, "additionalItems", t);
    r.items = !0, !(0, ca.alwaysValidSchema)(r, t) && e.ok((0, uY.validateArray)(e));
  }
};
function O$(e, t, r = e.schema) {
  const { gen: n, parentSchema: o, data: i, keyword: a, it: l } = e;
  d(o), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = ca.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), u = n.const("len", (0, sy._)`${i}.length`);
  r.forEach((p, f) => {
    (0, ca.alwaysValidSchema)(l, p) || (n.if((0, sy._)`${u} > ${f}`, () => e.subschema({
      keyword: a,
      schemaProp: f,
      dataProp: f
    }, c)), e.ok(c));
  });
  function d(p) {
    const { opts: f, errSchemaPath: m } = l, h = r.length, g = h === p.minItems && (h === p.maxItems || p[t] === !1);
    if (f.strictTuples && !g) {
      const y = `"${a}" is ${h}-tuple, but minItems or maxItems/${t} are not specified or different at path "${m}"`;
      (0, ca.checkStrictMode)(l, y, f.strictTuples);
    }
  }
}
li.validateTuple = O$;
li.default = dY;
Object.defineProperty(_f, "__esModule", { value: !0 });
const fY = li, pY = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, fY.validateTuple)(e, "items")
};
_f.default = pY;
var xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
const ay = Be, mY = tt, hY = qe, yY = ai, gY = {
  message: ({ params: { len: e } }) => (0, ay.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ay._)`{limit: ${e}}`
}, vY = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: gY,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: o } = r;
    n.items = !0, !(0, mY.alwaysValidSchema)(n, t) && (o ? (0, yY.validateAdditionalItems)(e, o) : e.ok((0, hY.validateArray)(e)));
  }
};
xf.default = vY;
var wf = {};
Object.defineProperty(wf, "__esModule", { value: !0 });
const dr = Be, Ws = tt, bY = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, dr.str)`must contain at least ${e} valid item(s)` : (0, dr.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, dr._)`{minContains: ${e}}` : (0, dr._)`{minContains: ${e}, maxContains: ${t}}`
}, $Y = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: bY,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: o, it: i } = e;
    let a, l;
    const { minContains: c, maxContains: u } = n;
    i.opts.next ? (a = c === void 0 ? 1 : c, l = u) : a = 1;
    const d = t.const("len", (0, dr._)`${o}.length`);
    if (e.setParams({ min: a, max: l }), l === void 0 && a === 0) {
      (0, Ws.checkStrictMode)(i, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, Ws.checkStrictMode)(i, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Ws.alwaysValidSchema)(i, r)) {
      let g = (0, dr._)`${d} >= ${a}`;
      l !== void 0 && (g = (0, dr._)`${g} && ${d} <= ${l}`), e.pass(g);
      return;
    }
    i.items = !0;
    const p = t.name("valid");
    l === void 0 && a === 1 ? m(p, () => t.if(p, () => t.break())) : a === 0 ? (t.let(p, !0), l !== void 0 && t.if((0, dr._)`${o}.length > 0`, f)) : (t.let(p, !1), f()), e.result(p, () => e.reset());
    function f() {
      const g = t.name("_valid"), y = t.let("count", 0);
      m(g, () => t.if(g, () => h(y)));
    }
    function m(g, y) {
      t.forRange("i", 0, d, (v) => {
        e.subschema({
          keyword: "contains",
          dataProp: v,
          dataPropType: Ws.Type.Num,
          compositeRule: !0
        }, g), y();
      });
    }
    function h(g) {
      t.code((0, dr._)`${g}++`), l === void 0 ? t.if((0, dr._)`${g} >= ${a}`, () => t.assign(p, !0).break()) : (t.if((0, dr._)`${g} > ${l}`, () => t.assign(p, !1).break()), a === 1 ? t.assign(p, !0) : t.if((0, dr._)`${g} >= ${a}`, () => t.assign(p, !0)));
    }
  }
};
wf.default = $Y;
var C$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Be, r = tt, n = qe;
  e.error = {
    message: ({ params: { property: c, depsCount: u, deps: d } }) => {
      const p = u === 1 ? "property" : "properties";
      return (0, t.str)`must have ${p} ${d} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: d, missingProperty: p } }) => (0, t._)`{property: ${c},
    missingProperty: ${p},
    depsCount: ${u},
    deps: ${d}}`
    // TODO change to reference
  };
  const o = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [u, d] = i(c);
      a(c, u), l(c, d);
    }
  };
  function i({ schema: c }) {
    const u = {}, d = {};
    for (const p in c) {
      if (p === "__proto__")
        continue;
      const f = Array.isArray(c[p]) ? u : d;
      f[p] = c[p];
    }
    return [u, d];
  }
  function a(c, u = c.schema) {
    const { gen: d, data: p, it: f } = c;
    if (Object.keys(u).length === 0)
      return;
    const m = d.let("missing");
    for (const h in u) {
      const g = u[h];
      if (g.length === 0)
        continue;
      const y = (0, n.propertyInData)(d, p, h, f.opts.ownProperties);
      c.setParams({
        property: h,
        depsCount: g.length,
        deps: g.join(", ")
      }), f.allErrors ? d.if(y, () => {
        for (const v of g)
          (0, n.checkReportMissingProp)(c, v);
      }) : (d.if((0, t._)`${y} && (${(0, n.checkMissingProp)(c, g, m)})`), (0, n.reportMissingProp)(c, m), d.else());
    }
  }
  e.validatePropertyDeps = a;
  function l(c, u = c.schema) {
    const { gen: d, data: p, keyword: f, it: m } = c, h = d.name("valid");
    for (const g in u)
      (0, r.alwaysValidSchema)(m, u[g]) || (d.if(
        (0, n.propertyInData)(d, p, g, m.opts.ownProperties),
        () => {
          const y = c.subschema({ keyword: f, schemaProp: g }, h);
          c.mergeValidEvaluated(y, h);
        },
        () => d.var(h, !0)
        // TODO var
      ), c.ok(h));
  }
  e.validateSchemaDeps = l, e.default = o;
})(C$);
var Tf = {};
Object.defineProperty(Tf, "__esModule", { value: !0 });
const P$ = Be, SY = tt, EY = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, P$._)`{propertyName: ${e.propertyName}}`
}, _Y = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: EY,
  code(e) {
    const { gen: t, schema: r, data: n, it: o } = e;
    if ((0, SY.alwaysValidSchema)(o, r))
      return;
    const i = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, i), t.if((0, P$.not)(i), () => {
        e.error(!0), o.allErrors || t.break();
      });
    }), e.ok(i);
  }
};
Tf.default = _Y;
var Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
const qs = qe, Sr = Be, xY = Ur, Ks = tt, wY = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Sr._)`{additionalProperty: ${e.additionalProperty}}`
}, TY = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: wY,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: o, errsCount: i, it: a } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Ks.alwaysValidSchema)(a, r))
      return;
    const u = (0, qs.allSchemaProperties)(n.properties), d = (0, qs.allSchemaProperties)(n.patternProperties);
    p(), e.ok((0, Sr._)`${i} === ${xY.default.errors}`);
    function p() {
      t.forIn("key", o, (y) => {
        !u.length && !d.length ? h(y) : t.if(f(y), () => h(y));
      });
    }
    function f(y) {
      let v;
      if (u.length > 8) {
        const $ = (0, Ks.schemaRefOrVal)(a, n.properties, "properties");
        v = (0, qs.isOwnProperty)(t, $, y);
      } else
        u.length ? v = (0, Sr.or)(...u.map(($) => (0, Sr._)`${y} === ${$}`)) : v = Sr.nil;
      return d.length && (v = (0, Sr.or)(v, ...d.map(($) => (0, Sr._)`${(0, qs.usePattern)(e, $)}.test(${y})`))), (0, Sr.not)(v);
    }
    function m(y) {
      t.code((0, Sr._)`delete ${o}[${y}]`);
    }
    function h(y) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        m(y);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: y }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Ks.alwaysValidSchema)(a, r)) {
        const v = t.name("valid");
        c.removeAdditional === "failing" ? (g(y, v, !1), t.if((0, Sr.not)(v), () => {
          e.reset(), m(y);
        })) : (g(y, v), l || t.if((0, Sr.not)(v), () => t.break()));
      }
    }
    function g(y, v, $) {
      const E = {
        keyword: "additionalProperties",
        dataProp: y,
        dataPropType: Ks.Type.Str
      };
      $ === !1 && Object.assign(E, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(E, v);
    }
  }
};
Hl.default = TY;
var Of = {};
Object.defineProperty(Of, "__esModule", { value: !0 });
const OY = Cr, ly = qe, Nc = tt, cy = Hl, CY = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: o, it: i } = e;
    i.opts.removeAdditional === "all" && n.additionalProperties === void 0 && cy.default.code(new OY.KeywordCxt(i, cy.default, "additionalProperties"));
    const a = (0, ly.allSchemaProperties)(r);
    for (const p of a)
      i.definedProperties.add(p);
    i.opts.unevaluated && a.length && i.props !== !0 && (i.props = Nc.mergeEvaluated.props(t, (0, Nc.toHash)(a), i.props));
    const l = a.filter((p) => !(0, Nc.alwaysValidSchema)(i, r[p]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const p of l)
      u(p) ? d(p) : (t.if((0, ly.propertyInData)(t, o, p, i.opts.ownProperties)), d(p), i.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(p), e.ok(c);
    function u(p) {
      return i.opts.useDefaults && !i.compositeRule && r[p].default !== void 0;
    }
    function d(p) {
      e.subschema({
        keyword: "properties",
        schemaProp: p,
        dataProp: p
      }, c);
    }
  }
};
Of.default = CY;
var Cf = {};
Object.defineProperty(Cf, "__esModule", { value: !0 });
const uy = qe, Hs = Be, dy = tt, fy = tt, PY = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: o, it: i } = e, { opts: a } = i, l = (0, uy.allSchemaProperties)(r), c = l.filter((g) => (0, dy.alwaysValidSchema)(i, r[g]));
    if (l.length === 0 || c.length === l.length && (!i.opts.unevaluated || i.props === !0))
      return;
    const u = a.strictSchema && !a.allowMatchingProperties && o.properties, d = t.name("valid");
    i.props !== !0 && !(i.props instanceof Hs.Name) && (i.props = (0, fy.evaluatedPropsToName)(t, i.props));
    const { props: p } = i;
    f();
    function f() {
      for (const g of l)
        u && m(g), i.allErrors ? h(g) : (t.var(d, !0), h(g), t.if(d));
    }
    function m(g) {
      for (const y in u)
        new RegExp(g).test(y) && (0, dy.checkStrictMode)(i, `property ${y} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function h(g) {
      t.forIn("key", n, (y) => {
        t.if((0, Hs._)`${(0, uy.usePattern)(e, g)}.test(${y})`, () => {
          const v = c.includes(g);
          v || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: y,
            dataPropType: fy.Type.Str
          }, d), i.opts.unevaluated && p !== !0 ? t.assign((0, Hs._)`${p}[${y}]`, !0) : !v && !i.allErrors && t.if((0, Hs.not)(d), () => t.break());
        });
      });
    }
  }
};
Cf.default = PY;
var Pf = {};
Object.defineProperty(Pf, "__esModule", { value: !0 });
const RY = tt, IY = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, RY.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const o = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, o), e.failResult(o, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Pf.default = IY;
var Rf = {};
Object.defineProperty(Rf, "__esModule", { value: !0 });
const NY = qe, AY = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: NY.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Rf.default = AY;
var If = {};
Object.defineProperty(If, "__esModule", { value: !0 });
const ua = Be, jY = tt, kY = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ua._)`{passingSchemas: ${e.passing}}`
}, MY = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: kY,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: o } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (o.opts.discriminator && n.discriminator)
      return;
    const i = r, a = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(u), e.result(a, () => e.reset(), () => e.error(!0));
    function u() {
      i.forEach((d, p) => {
        let f;
        (0, jY.alwaysValidSchema)(o, d) ? t.var(c, !0) : f = e.subschema({
          keyword: "oneOf",
          schemaProp: p,
          compositeRule: !0
        }, c), p > 0 && t.if((0, ua._)`${c} && ${a}`).assign(a, !1).assign(l, (0, ua._)`[${l}, ${p}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(l, p), f && e.mergeEvaluated(f, ua.Name);
        });
      });
    }
  }
};
If.default = MY;
var Nf = {};
Object.defineProperty(Nf, "__esModule", { value: !0 });
const DY = tt, FY = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const o = t.name("valid");
    r.forEach((i, a) => {
      if ((0, DY.alwaysValidSchema)(n, i))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: a }, o);
      e.ok(o), e.mergeEvaluated(l);
    });
  }
};
Nf.default = FY;
var Af = {};
Object.defineProperty(Af, "__esModule", { value: !0 });
const Ba = Be, R$ = tt, LY = {
  message: ({ params: e }) => (0, Ba.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Ba._)`{failingKeyword: ${e.ifClause}}`
}, BY = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: LY,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, R$.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const o = py(n, "then"), i = py(n, "else");
    if (!o && !i)
      return;
    const a = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), o && i) {
      const d = t.let("ifClause");
      e.setParams({ ifClause: d }), t.if(l, u("then", d), u("else", d));
    } else
      o ? t.if(l, u("then")) : t.if((0, Ba.not)(l), u("else"));
    e.pass(a, () => e.error(!0));
    function c() {
      const d = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(d);
    }
    function u(d, p) {
      return () => {
        const f = e.subschema({ keyword: d }, l);
        t.assign(a, l), e.mergeValidEvaluated(f, a), p ? t.assign(p, (0, Ba._)`${d}`) : e.setParams({ ifClause: d });
      };
    }
  }
};
function py(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, R$.alwaysValidSchema)(e, r);
}
Af.default = BY;
var jf = {};
Object.defineProperty(jf, "__esModule", { value: !0 });
const VY = tt, zY = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, VY.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
jf.default = zY;
Object.defineProperty(Ef, "__esModule", { value: !0 });
const UY = ai, WY = _f, qY = li, KY = xf, HY = wf, GY = C$, YY = Tf, XY = Hl, JY = Of, ZY = Cf, QY = Pf, eX = Rf, tX = If, rX = Nf, nX = Af, oX = jf;
function iX(e = !1) {
  const t = [
    // any
    QY.default,
    eX.default,
    tX.default,
    rX.default,
    nX.default,
    oX.default,
    // object
    YY.default,
    XY.default,
    GY.default,
    JY.default,
    ZY.default
  ];
  return e ? t.push(WY.default, KY.default) : t.push(UY.default, qY.default), t.push(HY.default), t;
}
Ef.default = iX;
var kf = {}, Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const Ct = Be, sX = {
  message: ({ schemaCode: e }) => (0, Ct.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Ct._)`{format: ${e}}`
}, aX = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: sX,
  code(e, t) {
    const { gen: r, data: n, $data: o, schema: i, schemaCode: a, it: l } = e, { opts: c, errSchemaPath: u, schemaEnv: d, self: p } = l;
    if (!c.validateFormats)
      return;
    o ? f() : m();
    function f() {
      const h = r.scopeValue("formats", {
        ref: p.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, Ct._)`${h}[${a}]`), y = r.let("fType"), v = r.let("format");
      r.if((0, Ct._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(y, (0, Ct._)`${g}.type || "string"`).assign(v, (0, Ct._)`${g}.validate`), () => r.assign(y, (0, Ct._)`"string"`).assign(v, g)), e.fail$data((0, Ct.or)($(), E()));
      function $() {
        return c.strictSchema === !1 ? Ct.nil : (0, Ct._)`${a} && !${v}`;
      }
      function E() {
        const S = d.$async ? (0, Ct._)`(${g}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, Ct._)`${v}(${n})`, b = (0, Ct._)`(typeof ${v} == "function" ? ${S} : ${v}.test(${n}))`;
        return (0, Ct._)`${v} && ${v} !== true && ${y} === ${t} && !${b}`;
      }
    }
    function m() {
      const h = p.formats[i];
      if (!h) {
        $();
        return;
      }
      if (h === !0)
        return;
      const [g, y, v] = E(h);
      g === t && e.pass(S());
      function $() {
        if (c.strictSchema === !1) {
          p.logger.warn(b());
          return;
        }
        throw new Error(b());
        function b() {
          return `unknown format "${i}" ignored in schema at path "${u}"`;
        }
      }
      function E(b) {
        const x = b instanceof RegExp ? (0, Ct.regexpCode)(b) : c.code.formats ? (0, Ct._)`${c.code.formats}${(0, Ct.getProperty)(i)}` : void 0, w = r.scopeValue("formats", { key: i, ref: b, code: x });
        return typeof b == "object" && !(b instanceof RegExp) ? [b.type || "string", b.validate, (0, Ct._)`${w}.validate`] : ["string", b, w];
      }
      function S() {
        if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
          if (!d.$async)
            throw new Error("async format in sync schema");
          return (0, Ct._)`await ${v}(${n})`;
        }
        return typeof y == "function" ? (0, Ct._)`${v}(${n})` : (0, Ct._)`${v}.test(${n})`;
      }
    }
  }
};
Mf.default = aX;
Object.defineProperty(kf, "__esModule", { value: !0 });
const lX = Mf, cX = [lX.default];
kf.default = cX;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
Lo.contentVocabulary = Lo.metadataVocabulary = void 0;
Lo.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Lo.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(af, "__esModule", { value: !0 });
const uX = lf, dX = uf, fX = Ef, pX = kf, my = Lo, mX = [
  uX.default,
  dX.default,
  (0, fX.default)(),
  pX.default,
  my.metadataVocabulary,
  my.contentVocabulary
];
af.default = mX;
var Df = {}, I$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DiscrError = void 0, function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e.DiscrError || (e.DiscrError = {}));
})(I$);
Object.defineProperty(Df, "__esModule", { value: !0 });
const bo = Be, mu = I$, hy = Qt, hX = tt, yX = {
  message: ({ params: { discrError: e, tagName: t } }) => e === mu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, bo._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, gX = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: yX,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: o, it: i } = e, { oneOf: a } = o;
    if (!i.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), u = t.const("tag", (0, bo._)`${r}${(0, bo.getProperty)(l)}`);
    t.if((0, bo._)`typeof ${u} == "string"`, () => d(), () => e.error(!1, { discrError: mu.DiscrError.Tag, tag: u, tagName: l })), e.ok(c);
    function d() {
      const m = f();
      t.if(!1);
      for (const h in m)
        t.elseIf((0, bo._)`${u} === ${h}`), t.assign(c, p(m[h]));
      t.else(), e.error(!1, { discrError: mu.DiscrError.Mapping, tag: u, tagName: l }), t.endIf();
    }
    function p(m) {
      const h = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: m }, h);
      return e.mergeEvaluated(g, bo.Name), h;
    }
    function f() {
      var m;
      const h = {}, g = v(o);
      let y = !0;
      for (let S = 0; S < a.length; S++) {
        let b = a[S];
        b != null && b.$ref && !(0, hX.schemaHasRulesButRef)(b, i.self.RULES) && (b = hy.resolveRef.call(i.self, i.schemaEnv.root, i.baseId, b == null ? void 0 : b.$ref), b instanceof hy.SchemaEnv && (b = b.schema));
        const x = (m = b == null ? void 0 : b.properties) === null || m === void 0 ? void 0 : m[l];
        if (typeof x != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        y = y && (g || v(b)), $(x, S);
      }
      if (!y)
        throw new Error(`discriminator: "${l}" must be required`);
      return h;
      function v({ required: S }) {
        return Array.isArray(S) && S.includes(l);
      }
      function $(S, b) {
        if (S.const)
          E(S.const, b);
        else if (S.enum)
          for (const x of S.enum)
            E(x, b);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function E(S, b) {
        if (typeof S != "string" || S in h)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        h[S] = b;
      }
    }
  }
};
Df.default = gX;
const vX = "http://json-schema.org/draft-07/schema#", bX = "http://json-schema.org/draft-07/schema#", $X = "Core schema meta-schema", SX = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, EX = [
  "object",
  "boolean"
], _X = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, xX = {
  $schema: vX,
  $id: bX,
  title: $X,
  definitions: SX,
  type: EX,
  properties: _X,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
  const r = J0, n = af, o = Df, i = xX, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(o.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const h = this.opts.$data ? this.$dataMetaSchema(i, a) : i;
      this.addMetaSchema(h, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  e.exports = t = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var u = Cr;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var d = Be;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return d._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return d.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return d.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return d.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return d.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return d.CodeGen;
  } });
  var p = Es;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return p.default;
  } });
  var f = _s;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(lu, lu.exports);
var N$ = lu.exports;
const wX = /* @__PURE__ */ pt(N$);
var hu = { exports: {} }, A$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(M, k) {
    return { validate: M, compare: k };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(i, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, u),
    "date-time": t(p, f),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: A,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: v,
    // signed 32 bit integer
    int32: { type: "number", validate: S },
    // signed 64 bit integer
    int64: { type: "number", validate: b },
    // C-type float
    float: { type: "number", validate: x },
    // C-type double
    double: { type: "number", validate: x },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(M) {
    return M % 4 === 0 && (M % 100 !== 0 || M % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, o = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function i(M) {
    const k = n.exec(M);
    if (!k)
      return !1;
    const H = +k[1], U = +k[2], K = +k[3];
    return U >= 1 && U <= 12 && K >= 1 && K <= (U === 2 && r(H) ? 29 : o[U]);
  }
  function a(M, k) {
    if (M && k)
      return M > k ? 1 : M < k ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(M, k) {
    const H = l.exec(M);
    if (!H)
      return !1;
    const U = +H[1], K = +H[2], z = +H[3], G = H[5];
    return (U <= 23 && K <= 59 && z <= 59 || U === 23 && K === 59 && z === 60) && (!k || G !== "");
  }
  function u(M, k) {
    if (!(M && k))
      return;
    const H = l.exec(M), U = l.exec(k);
    if (H && U)
      return M = H[1] + H[2] + H[3] + (H[4] || ""), k = U[1] + U[2] + U[3] + (U[4] || ""), M > k ? 1 : M < k ? -1 : 0;
  }
  const d = /t|\s/i;
  function p(M) {
    const k = M.split(d);
    return k.length === 2 && i(k[0]) && c(k[1], !0);
  }
  function f(M, k) {
    if (!(M && k))
      return;
    const [H, U] = M.split(d), [K, z] = k.split(d), G = a(H, K);
    if (G !== void 0)
      return G || u(U, z);
  }
  const m = /\/|:/, h = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(M) {
    return m.test(M) && h.test(M);
  }
  const y = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function v(M) {
    return y.lastIndex = 0, y.test(M);
  }
  const $ = -(2 ** 31), E = 2 ** 31 - 1;
  function S(M) {
    return Number.isInteger(M) && M <= E && M >= $;
  }
  function b(M) {
    return Number.isInteger(M);
  }
  function x() {
    return !0;
  }
  const w = /[^\\]\\Z/;
  function A(M) {
    if (w.test(M))
      return !1;
    try {
      return new RegExp(M), !0;
    } catch {
      return !1;
    }
  }
})(A$);
var j$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = N$, r = Be, n = r.operators, o = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, i = {
    message: ({ keyword: l, schemaCode: c }) => r.str`should be ${o[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => r._`{comparison: ${o[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(o),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: i,
    code(l) {
      const { gen: c, data: u, schemaCode: d, keyword: p, it: f } = l, { opts: m, self: h } = f;
      if (!m.validateFormats)
        return;
      const g = new t.KeywordCxt(f, h.RULES.all.format.definition, "format");
      g.$data ? y() : v();
      function y() {
        const E = c.scopeValue("formats", {
          ref: h.formats,
          code: m.code.formats
        }), S = c.const("fmt", r._`${E}[${g.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${S} != "object"`, r._`${S} instanceof RegExp`, r._`typeof ${S}.compare != "function"`, $(S)));
      }
      function v() {
        const E = g.schema, S = h.formats[E];
        if (!S || S === !0)
          return;
        if (typeof S != "object" || S instanceof RegExp || typeof S.compare != "function")
          throw new Error(`"${p}": format "${E}" does not define "compare" function`);
        const b = c.scopeValue("formats", {
          key: E,
          ref: S,
          code: m.code.formats ? r._`${m.code.formats}${r.getProperty(E)}` : void 0
        });
        l.fail$data($(b));
      }
      function $(E) {
        return r._`${E}.compare(${u}, ${d}) ${o[p].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = a;
})(j$);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = A$, n = j$, o = Be, i = new o.Name("fullFormats"), a = new o.Name("fastFormats"), l = (u, d = { keywords: !0 }) => {
    if (Array.isArray(d))
      return c(u, d, r.fullFormats, i), u;
    const [p, f] = d.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, i], m = d.formats || r.formatNames;
    return c(u, m, p, f), d.keywords && n.default(u), u;
  };
  l.get = (u, d = "full") => {
    const f = (d === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!f)
      throw new Error(`Unknown format "${u}"`);
    return f;
  };
  function c(u, d, p, f) {
    var m, h;
    (m = (h = u.opts.code).formats) !== null && m !== void 0 || (h.formats = o._`require("ajv-formats/dist/formats").${f}`);
    for (const g of d)
      u.addFormat(g, p[g]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(hu, hu.exports);
var TX = hu.exports;
const yy = /* @__PURE__ */ pt(TX), OX = {
  allErrors: !0,
  multipleOfPrecision: 8,
  strict: !1,
  verbose: !0
}, CX = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/, PX = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
function RX(e, t, r = {}, n, o = wX) {
  const i = new o({ ...OX, ...r });
  return n ? yy(i, n) : n !== !1 && yy(i), i.addFormat("data-url", PX), i.addFormat("color", CX), i.addKeyword(Uo), i.addKeyword(Fu), Array.isArray(e) && i.addMetaSchema(e), wr(t) && Object.keys(t).forEach((a) => {
    i.addFormat(a, t[a]);
  }), i;
}
function IX(e = [], t) {
  return e.map((r) => {
    const { instancePath: n, keyword: o, params: i, schemaPath: a, parentSchema: l, ...c } = r;
    let { message: u = "" } = c, d = n.replace(/\//g, "."), p = `${d} ${u}`.trim();
    if ("missingProperty" in i) {
      d = d ? `${d}.${i.missingProperty}` : i.missingProperty;
      const f = i.missingProperty, m = rt(Te(t, `${d.replace(/^\./, "")}`)).title;
      if (m)
        u = u.replace(f, m);
      else {
        const h = Te(l, [Tt, f, "title"]);
        h && (u = u.replace(f, h));
      }
      p = u;
    } else {
      const f = rt(Te(t, `${d.replace(/^\./, "")}`)).title;
      if (f)
        p = `'${f}' ${u}`.trim();
      else {
        const m = l == null ? void 0 : l.title;
        m && (p = `'${m}' ${u}`.trim());
      }
    }
    return {
      name: o,
      property: d,
      message: u,
      params: i,
      stack: p,
      schemaPath: a
    };
  });
}
function NX(e, t, r, n, o, i, a) {
  const { validationError: l } = t;
  let c = IX(t.errors, a);
  l && (c = [...c, { stack: l.message }]), typeof i == "function" && (c = i(c, a));
  let u = u4(c);
  if (l && (u = {
    ...u,
    $schema: {
      __errors: [l.message]
    }
  }), typeof o != "function")
    return { errors: c, errorSchema: u };
  const d = db(e, n, r, n, !0), p = o(d, Kc(d), a), f = $b(p);
  return oa({ errors: c, errorSchema: u }, f);
}
class AX {
  /** Constructs an `AJV8Validator` instance using the `options`
   *
   * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
   * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
   */
  constructor(t, r) {
    const { additionalMetaSchemas: n, customFormats: o, ajvOptionsOverrides: i, ajvFormatOptions: a, AjvClass: l } = t;
    this.ajv = RX(n, o, i, a, l), this.localizer = r;
  }
  /** Converts an `errorSchema` into a list of `RJSFValidationErrors`
   *
   * @param errorSchema - The `ErrorSchema` instance to convert
   * @param [fieldPath=[]] - The current field path, defaults to [] if not specified
   * @deprecated - Use the `toErrorList()` function provided by `@rjsf/utils` instead. This function will be removed in
   *        the next major release.
   */
  toErrorList(t, r = []) {
    return ts(t, r);
  }
  /** Runs the pure validation of the `schema` and `formData` without any of the RJSF functionality. Provided for use
   * by the playground. Returns the `errors` from the validation
   *
   * @param schema - The schema against which to validate the form data   * @param schema
   * @param formData - The form data to validate
   */
  rawValidation(t, r) {
    let n, o;
    t[pn] && (o = this.ajv.getSchema(t[pn]));
    try {
      o === void 0 && (o = this.ajv.compile(t)), o(r);
    } catch (a) {
      n = a;
    }
    let i;
    return o && (typeof this.localizer == "function" && this.localizer(o.errors), i = o.errors || void 0, o.errors = null), {
      errors: i,
      validationError: n
    };
  }
  /** This function processes the `formData` with an optional user contributed `customValidate` function, which receives
   * the form data and a `errorHandler` function that will be used to add custom validation errors for each field. Also
   * supports a `transformErrors` function that will take the raw AJV validation errors, prior to custom validation and
   * transform them in what ever way it chooses.
   *
   * @param formData - The form data to validate
   * @param schema - The schema against which to validate the form data
   * @param [customValidate] - An optional function that is used to perform custom validation
   * @param [transformErrors] - An optional function that is used to transform errors after AJV validation
   * @param [uiSchema] - An optional uiSchema that is passed to `transformErrors` and `customValidate`
   */
  validateFormData(t, r, n, o, i) {
    const a = this.rawValidation(r, t);
    return NX(this, a, t, r, n, o, i);
  }
  /** Validates data against a schema, returning true if the data is valid, or
   * false otherwise. If the schema is invalid, then this function will return
   * false.
   *
   * @param schema - The schema against which to validate the form data
   * @param formData - The form data to validate
   * @param rootSchema - The root schema used to provide $ref resolutions
   */
  isValid(t, r, n) {
    var o, i;
    const a = (o = n[pn]) !== null && o !== void 0 ? o : xg;
    try {
      this.ajv.addSchema(n, a);
      const l = Cd(t), c = (i = l[pn]) !== null && i !== void 0 ? i : YU(l);
      let u;
      return u = this.ajv.getSchema(c), u === void 0 && (u = this.ajv.addSchema(l, c).getSchema(c) || this.ajv.compile(l)), u(r);
    } catch (l) {
      return console.warn("Error encountered compiling schema:", l), !1;
    } finally {
      this.ajv.removeSchema(a);
    }
  }
}
function jX(e = {}, t) {
  return new AX(e, t);
}
const kX = jX();
function MX(e) {
  const {
    schema: t,
    id: r,
    value: n,
    disabled: o,
    readonly: i,
    label: a = "",
    hideLabel: l,
    autofocus: c,
    onChange: u,
    onBlur: d,
    onFocus: p,
    registry: f,
    options: m,
    uiSchema: h
  } = e;
  Ke("DescriptionFieldTemplate", f, m);
  const g = To(t), y = (S, b) => u(b), v = ({ target: { value: S } }) => d(r, S), $ = ({ target: { value: S } }) => p(r, S), E = m.description ?? t.description;
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsx(
      Ul,
      {
        control: /* @__PURE__ */ _.jsx(
          Jd,
          {
            id: r,
            name: r,
            checked: typeof n > "u" ? !1 : !!n,
            required: g,
            disabled: o || i,
            autoFocus: c,
            onChange: y,
            onBlur: v,
            onFocus: $,
            "aria-describedby": or(r)
          }
        ),
        label: _n(a, l, !1)
      }
    ),
    !l && !!E && /* @__PURE__ */ _.jsx(Tr, { style: { fontSize: "14px", color: "rgb(102, 102, 102)" }, children: E })
  ] });
}
const DX = {
  "ui:submitButtonOptions": {
    submitText: "Apply"
  }
};
function FX({ initFormData: e, schema: t, onSubmit: r }) {
  const [n, o] = Bo();
  Va(() => {
    o(e);
  }, [e]);
  function i(l) {
    o(l.formData);
  }
  function a(l) {
    r(l.formData);
  }
  return /* @__PURE__ */ _.jsx(
    jH,
    {
      formData: n,
      schema: t,
      uiSchema: DX,
      validator: kX,
      onSubmit: a,
      omitExtraData: !0,
      onChange: i,
      widgets: {
        CheckboxWidget: MX
      }
    }
  );
}
function zX({ schemas: e, config: t, set_config: r }) {
  const [n, o] = hr.useState(0);
  return /* @__PURE__ */ _.jsxs(Vr, { sx: { flexGrow: 1 }, children: [
    /* @__PURE__ */ _.jsx(Vr, { sx: { borderBottom: 1, borderColor: "divider" }, children: /* @__PURE__ */ _.jsx(
      jw,
      {
        value: n,
        onChange: (i, a) => {
          o(a);
        },
        variant: "scrollable",
        scrollButtons: "auto",
        children: e.map((i, a) => /* @__PURE__ */ vy(
          Bw,
          {
            label: i.title,
            ...Vw(a),
            key: "schema_tab_key_" + i.name
          }
        ))
      }
    ) }),
    e.map((i, a) => /* @__PURE__ */ _.jsx(Eg, { value: n, index: a, children: /* @__PURE__ */ _.jsx(
      FX,
      {
        initFormData: t[i.name],
        schema: i,
        onSubmit: (l) => {
          r(i.name, l);
        }
      }
    ) }, "schema_key_" + i.name))
  ] });
}
export {
  zX as ConfigForms,
  VX as useConfig
};
