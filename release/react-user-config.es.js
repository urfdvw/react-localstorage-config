import * as P from "react";
import hr, { useState as Vo, useEffect as za, forwardRef as yy, useContext as j$, Children as k$, isValidElement as Ys, cloneElement as Xs, createElement as gy, Component as is, useCallback as $t, useReducer as M$, createRef as D$ } from "react";
import * as vy from "react-dom";
import Ps from "react-dom";
var So = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function F$(e) {
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
function L$(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var by = { exports: {} };
(function(e, t) {
  (function(r, n) {
    if (typeof L$ == "function")
      e.exports = n();
    else {
      var o = r.jsonSchemaDefaults;
      r.jsonSchemaDefaults = n(), r.jsonSchemaDefaults.noConflict = function() {
        var i = r.jsonSchemaDefaults;
        return r.jsonSchemaDefaults = o, i;
      };
    }
  })(So, function() {
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
      var d = function(m, f) {
        var y = m.shift();
        return f[y] ? m.length ? d(m, f[y]) : f[y] : {};
      }, p = d(c, u);
      return r(p) ? n(p) : p;
    }, a = function(c, u) {
      for (var d = c.length, p = -1, m = {}; ++p < d; ) {
        var f = c[p];
        f = typeof f.$ref < "u" ? i(f.$ref, u) : f, m = o(m, f);
      }
      return m;
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
        for (var m in c.properties)
          c.properties.hasOwnProperty(m) && (c.properties[m] = l(c.properties[m], u), typeof c.properties[m] > "u" && delete c.properties[m]);
        return c.properties;
      } else if (c.type === "array") {
        if (!c.items)
          return [];
        var f = c.minItems || 0;
        if (c.items.constructor === Array) {
          for (var y = c.items.map(function(v) {
            return l(v, u);
          }), h = y.length - 1; h >= 0 && !(typeof y[h] < "u"); h--)
            h + 1 > f && y.pop();
          return y;
        }
        var g = l(c.items, u);
        if (typeof g > "u")
          return [];
        for (var y = [], h = 0; h < Math.max(1, f); h++)
          y.push(n(g));
        return y;
      }
    };
    return function(c, u) {
      return typeof u > "u" ? u = c.definitions || {} : r(c.definitions) && (u = o(u, c.definitions)), l(n(c), u);
    };
  });
})(by);
var B$ = by.exports, V$ = B$;
const z$ = /* @__PURE__ */ pt(V$);
function yu(e) {
  return e !== null && e != null;
}
function U$(e) {
  return typeof e == typeof {};
}
function Ri(e) {
  return e.toLowerCase().split(" ").join("_");
}
function Gl() {
  try {
    return Object.keys(localStorage).reduce((e, t) => ({ ...e, [t]: JSON.parse(localStorage.getItem(t)) }), {});
  } catch {
    return console.warn("LocalStorage contents cannot be converted to objects. bleached."), localStorage.clear(), {};
  }
}
function W$(e) {
  const [t, r] = Vo({});
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
function q$(e, t) {
  var r = z$(t);
  if (yu(e) && U$(e))
    for (const n in r)
      n in e && (r[n] = e[n]);
  return r;
}
function VX(e) {
  const { localStorageState: t, setLocalStorageState: r, initLocalStorageState: n } = W$("config"), [o, i] = Vo(0);
  za(() => {
    if (o === 0 && (console.log("init step 0: initialize localStorageState"), n(), i(1)), o === 1) {
      console.log("init step 1: update localStorageState by schema defaults");
      for (const d of e) {
        const p = Ri(d.title);
        var u = q$(a(p), d);
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
    const m = a(u);
    d in m ? typeof p != typeof m[d] ? console.error(
      "given value " + p + " has a different type from config schema. Given: " + typeof p + ", required: " + typeof m[d]
    ) : l(u, { ...m, [d]: p }) : console.error("no field called " + d + " in config schema " + u);
  }
  return { config: t, set_config: l, set_config_field: c, ready: o < 0 };
}
var Ac = { exports: {} }, pi = {};
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
function K$() {
  if (zf)
    return pi;
  zf = 1;
  var e = hr, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, c, u) {
    var d, p = {}, m = null, f = null;
    u !== void 0 && (m = "" + u), c.key !== void 0 && (m = "" + c.key), c.ref !== void 0 && (f = c.ref);
    for (d in c)
      n.call(c, d) && !i.hasOwnProperty(d) && (p[d] = c[d]);
    if (l && l.defaultProps)
      for (d in c = l.defaultProps, c)
        p[d] === void 0 && (p[d] = c[d]);
    return { $$typeof: t, type: l, key: m, ref: f, props: p, _owner: o.current };
  }
  return pi.Fragment = r, pi.jsx = a, pi.jsxs = a, pi;
}
var mi = {};
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
function H$() {
  return Uf || (Uf = 1, process.env.NODE_ENV !== "production" && function() {
    var e = hr, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), y = Symbol.iterator, h = "@@iterator";
    function g(T) {
      if (T === null || typeof T != "object")
        return null;
      var M = y && T[y] || T[h];
      return typeof M == "function" ? M : null;
    }
    var v = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(T) {
      {
        for (var M = arguments.length, ee = new Array(M > 1 ? M - 1 : 0), ae = 1; ae < M; ae++)
          ee[ae - 1] = arguments[ae];
        _("error", T, ee);
      }
    }
    function _(T, M, ee) {
      {
        var ae = v.ReactDebugCurrentFrame, de = ae.getStackAddendum();
        de !== "" && (M += "%s", ee = ee.concat([de]));
        var ve = ee.map(function(we) {
          return String(we);
        });
        ve.unshift("Warning: " + M), Function.prototype.apply.call(console[T], console, ve);
      }
    }
    var $ = !1, b = !1, x = !1, w = !1, A = !1, j;
    j = Symbol.for("react.module.reference");
    function k(T) {
      return !!(typeof T == "string" || typeof T == "function" || T === n || T === i || A || T === o || T === u || T === d || w || T === f || $ || b || x || typeof T == "object" && T !== null && (T.$$typeof === m || T.$$typeof === p || T.$$typeof === a || T.$$typeof === l || T.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      T.$$typeof === j || T.getModuleId !== void 0));
    }
    function K(T, M, ee) {
      var ae = T.displayName;
      if (ae)
        return ae;
      var de = M.displayName || M.name || "";
      return de !== "" ? ee + "(" + de + ")" : ee;
    }
    function U(T) {
      return T.displayName || "Context";
    }
    function H(T) {
      if (T == null)
        return null;
      if (typeof T.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof T == "function")
        return T.displayName || T.name || null;
      if (typeof T == "string")
        return T;
      switch (T) {
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
      if (typeof T == "object")
        switch (T.$$typeof) {
          case l:
            var M = T;
            return U(M) + ".Consumer";
          case a:
            var ee = T;
            return U(ee._context) + ".Provider";
          case c:
            return K(T, T.render, "ForwardRef");
          case p:
            var ae = T.displayName || null;
            return ae !== null ? ae : H(T.type) || "Memo";
          case m: {
            var de = T, ve = de._payload, we = de._init;
            try {
              return H(we(ve));
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
    function O() {
      {
        if (G === 0) {
          X = console.log, J = console.info, Z = console.warn, ne = console.error, D = console.group, N = console.groupCollapsed, W = console.groupEnd;
          var T = {
            configurable: !0,
            enumerable: !0,
            value: F,
            writable: !0
          };
          Object.defineProperties(console, {
            info: T,
            log: T,
            warn: T,
            error: T,
            group: T,
            groupCollapsed: T,
            groupEnd: T
          });
        }
        G++;
      }
    }
    function R() {
      {
        if (G--, G === 0) {
          var T = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, T, {
              value: X
            }),
            info: z({}, T, {
              value: J
            }),
            warn: z({}, T, {
              value: Z
            }),
            error: z({}, T, {
              value: ne
            }),
            group: z({}, T, {
              value: D
            }),
            groupCollapsed: z({}, T, {
              value: N
            }),
            groupEnd: z({}, T, {
              value: W
            })
          });
        }
        G < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var B = v.ReactCurrentDispatcher, Q;
    function Y(T, M, ee) {
      {
        if (Q === void 0)
          try {
            throw Error();
          } catch (de) {
            var ae = de.stack.trim().match(/\n( *(at )?)/);
            Q = ae && ae[1] || "";
          }
        return `
` + Q + T;
      }
    }
    var oe = !1, ie;
    {
      var ce = typeof WeakMap == "function" ? WeakMap : Map;
      ie = new ce();
    }
    function q(T, M) {
      if (!T || oe)
        return "";
      {
        var ee = ie.get(T);
        if (ee !== void 0)
          return ee;
      }
      var ae;
      oe = !0;
      var de = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ve;
      ve = B.current, B.current = null, O();
      try {
        if (M) {
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
            Reflect.construct(T, [], we);
          } else {
            try {
              we.call();
            } catch (Mt) {
              ae = Mt;
            }
            T.call(we.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Mt) {
            ae = Mt;
          }
          T();
        }
      } catch (Mt) {
        if (Mt && ae && typeof Mt.stack == "string") {
          for (var me = Mt.stack.split(`
`), Ce = ae.stack.split(`
`), ke = me.length - 1, Ee = Ce.length - 1; ke >= 1 && Ee >= 0 && me[ke] !== Ce[Ee]; )
            Ee--;
          for (; ke >= 1 && Ee >= 0; ke--, Ee--)
            if (me[ke] !== Ce[Ee]) {
              if (ke !== 1 || Ee !== 1)
                do
                  if (ke--, Ee--, Ee < 0 || me[ke] !== Ce[Ee]) {
                    var Ge = `
` + me[ke].replace(" at new ", " at ");
                    return T.displayName && Ge.includes("<anonymous>") && (Ge = Ge.replace("<anonymous>", T.displayName)), typeof T == "function" && ie.set(T, Ge), Ge;
                  }
                while (ke >= 1 && Ee >= 0);
              break;
            }
        }
      } finally {
        oe = !1, B.current = ve, R(), Error.prepareStackTrace = de;
      }
      var mt = T ? T.displayName || T.name : "", ht = mt ? Y(mt) : "";
      return typeof T == "function" && ie.set(T, ht), ht;
    }
    function pe(T, M, ee) {
      return q(T, !1);
    }
    function te(T) {
      var M = T.prototype;
      return !!(M && M.isReactComponent);
    }
    function fe(T, M, ee) {
      if (T == null)
        return "";
      if (typeof T == "function")
        return q(T, te(T));
      if (typeof T == "string")
        return Y(T);
      switch (T) {
        case u:
          return Y("Suspense");
        case d:
          return Y("SuspenseList");
      }
      if (typeof T == "object")
        switch (T.$$typeof) {
          case c:
            return pe(T.render);
          case p:
            return fe(T.type, M, ee);
          case m: {
            var ae = T, de = ae._payload, ve = ae._init;
            try {
              return fe(ve(de), M, ee);
            } catch {
            }
          }
        }
      return "";
    }
    var Pe = Object.prototype.hasOwnProperty, Ae = {}, Be = v.ReactDebugCurrentFrame;
    function st(T) {
      if (T) {
        var M = T._owner, ee = fe(T.type, T._source, M ? M.type : null);
        Be.setExtraStackFrame(ee);
      } else
        Be.setExtraStackFrame(null);
    }
    function je(T, M, ee, ae, de) {
      {
        var ve = Function.call.bind(Pe);
        for (var we in T)
          if (ve(T, we)) {
            var me = void 0;
            try {
              if (typeof T[we] != "function") {
                var Ce = Error((ae || "React class") + ": " + ee + " type `" + we + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof T[we] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ce.name = "Invariant Violation", Ce;
              }
              me = T[we](M, we, ae, ee, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ke) {
              me = ke;
            }
            me && !(me instanceof Error) && (st(de), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ae || "React class", ee, we, typeof me), st(null)), me instanceof Error && !(me.message in Ae) && (Ae[me.message] = !0, st(de), S("Failed %s type: %s", ee, me.message), st(null));
          }
      }
    }
    var Me = Array.isArray;
    function Qe(T) {
      return Me(T);
    }
    function He(T) {
      {
        var M = typeof Symbol == "function" && Symbol.toStringTag, ee = M && T[Symbol.toStringTag] || T.constructor.name || "Object";
        return ee;
      }
    }
    function ze(T) {
      try {
        return le(T), !1;
      } catch {
        return !0;
      }
    }
    function le(T) {
      return "" + T;
    }
    function ye(T) {
      if (ze(T))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(T)), le(T);
    }
    var be = v.ReactCurrentOwner, ge = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ue, Ue, Ie;
    Ie = {};
    function Ye(T) {
      if (Pe.call(T, "ref")) {
        var M = Object.getOwnPropertyDescriptor(T, "ref").get;
        if (M && M.isReactWarning)
          return !1;
      }
      return T.ref !== void 0;
    }
    function Je(T) {
      if (Pe.call(T, "key")) {
        var M = Object.getOwnPropertyDescriptor(T, "key").get;
        if (M && M.isReactWarning)
          return !1;
      }
      return T.key !== void 0;
    }
    function Tt(T, M) {
      if (typeof T.ref == "string" && be.current && M && be.current.stateNode !== M) {
        var ee = H(be.current.type);
        Ie[ee] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', H(be.current.type), T.ref), Ie[ee] = !0);
      }
    }
    function re(T, M) {
      {
        var ee = function() {
          ue || (ue = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", M));
        };
        ee.isReactWarning = !0, Object.defineProperty(T, "key", {
          get: ee,
          configurable: !0
        });
      }
    }
    function se(T, M) {
      {
        var ee = function() {
          Ue || (Ue = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", M));
        };
        ee.isReactWarning = !0, Object.defineProperty(T, "ref", {
          get: ee,
          configurable: !0
        });
      }
    }
    var $e = function(T, M, ee, ae, de, ve, we) {
      var me = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: T,
        key: M,
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
    function Ne(T, M, ee, ae, de) {
      {
        var ve, we = {}, me = null, Ce = null;
        ee !== void 0 && (ye(ee), me = "" + ee), Je(M) && (ye(M.key), me = "" + M.key), Ye(M) && (Ce = M.ref, Tt(M, de));
        for (ve in M)
          Pe.call(M, ve) && !ge.hasOwnProperty(ve) && (we[ve] = M[ve]);
        if (T && T.defaultProps) {
          var ke = T.defaultProps;
          for (ve in ke)
            we[ve] === void 0 && (we[ve] = ke[ve]);
        }
        if (me || Ce) {
          var Ee = typeof T == "function" ? T.displayName || T.name || "Unknown" : T;
          me && re(we, Ee), Ce && se(we, Ee);
        }
        return $e(T, me, Ce, de, ae, be.current, we);
      }
    }
    var et = v.ReactCurrentOwner, St = v.ReactDebugCurrentFrame;
    function Et(T) {
      if (T) {
        var M = T._owner, ee = fe(T.type, T._source, M ? M.type : null);
        St.setExtraStackFrame(ee);
      } else
        St.setExtraStackFrame(null);
    }
    var Yt;
    Yt = !1;
    function kt(T) {
      return typeof T == "object" && T !== null && T.$$typeof === t;
    }
    function Ut() {
      {
        if (et.current) {
          var T = H(et.current.type);
          if (T)
            return `

Check the render method of \`` + T + "`.";
        }
        return "";
      }
    }
    function wn(T) {
      {
        if (T !== void 0) {
          var M = T.fileName.replace(/^.*[\\\/]/, ""), ee = T.lineNumber;
          return `

Check your code at ` + M + ":" + ee + ".";
        }
        return "";
      }
    }
    var On = {};
    function Tn(T) {
      {
        var M = Ut();
        if (!M) {
          var ee = typeof T == "string" ? T : T.displayName || T.name;
          ee && (M = `

Check the top-level render call using <` + ee + ">.");
        }
        return M;
      }
    }
    function Rr(T, M) {
      {
        if (!T._store || T._store.validated || T.key != null)
          return;
        T._store.validated = !0;
        var ee = Tn(M);
        if (On[ee])
          return;
        On[ee] = !0;
        var ae = "";
        T && T._owner && T._owner !== et.current && (ae = " It was passed a child from " + H(T._owner.type) + "."), Et(T), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ee, ae), Et(null);
      }
    }
    function Wr(T, M) {
      {
        if (typeof T != "object")
          return;
        if (Qe(T))
          for (var ee = 0; ee < T.length; ee++) {
            var ae = T[ee];
            kt(ae) && Rr(ae, M);
          }
        else if (kt(T))
          T._store && (T._store.validated = !0);
        else if (T) {
          var de = g(T);
          if (typeof de == "function" && de !== T.entries)
            for (var ve = de.call(T), we; !(we = ve.next()).done; )
              kt(we.value) && Rr(we.value, M);
        }
      }
    }
    function ui(T) {
      {
        var M = T.type;
        if (M == null || typeof M == "string")
          return;
        var ee;
        if (typeof M == "function")
          ee = M.propTypes;
        else if (typeof M == "object" && (M.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        M.$$typeof === p))
          ee = M.propTypes;
        else
          return;
        if (ee) {
          var ae = H(M);
          je(ee, T.props, "prop", ae, T);
        } else if (M.PropTypes !== void 0 && !Yt) {
          Yt = !0;
          var de = H(M);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", de || "Unknown");
        }
        typeof M.getDefaultProps == "function" && !M.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ro(T) {
      {
        for (var M = Object.keys(T.props), ee = 0; ee < M.length; ee++) {
          var ae = M[ee];
          if (ae !== "children" && ae !== "key") {
            Et(T), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ae), Et(null);
            break;
          }
        }
        T.ref !== null && (Et(T), S("Invalid attribute `ref` supplied to `React.Fragment`."), Et(null));
      }
    }
    function no(T, M, ee, ae, de, ve) {
      {
        var we = k(T);
        if (!we) {
          var me = "";
          (T === void 0 || typeof T == "object" && T !== null && Object.keys(T).length === 0) && (me += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ce = wn(de);
          Ce ? me += Ce : me += Ut();
          var ke;
          T === null ? ke = "null" : Qe(T) ? ke = "array" : T !== void 0 && T.$$typeof === t ? (ke = "<" + (H(T.type) || "Unknown") + " />", me = " Did you accidentally export a JSX literal instead of a component?") : ke = typeof T, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ke, me);
        }
        var Ee = Ne(T, M, ee, de, ve);
        if (Ee == null)
          return Ee;
        if (we) {
          var Ge = M.children;
          if (Ge !== void 0)
            if (ae)
              if (Qe(Ge)) {
                for (var mt = 0; mt < Ge.length; mt++)
                  Wr(Ge[mt], T);
                Object.freeze && Object.freeze(Ge);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Wr(Ge, T);
        }
        return T === n ? ro(Ee) : ui(Ee), Ee;
      }
    }
    function oo(T, M, ee) {
      return no(T, M, ee, !0);
    }
    function L(T, M, ee) {
      return no(T, M, ee, !1);
    }
    var I = L, V = oo;
    mi.Fragment = n, mi.jsx = I, mi.jsxs = V;
  }()), mi;
}
process.env.NODE_ENV === "production" ? Ac.exports = K$() : Ac.exports = H$();
var E = Ac.exports;
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
function $y(e) {
  if (!Hr(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = $y(e[r]);
  }), t;
}
function Ht(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? C({}, e) : e;
  return Hr(e) && Hr(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Hr(t[o]) && o in e && Hr(e[o]) ? n[o] = Ht(e[o], t[o], r) : r.clone ? n[o] = Hr(t[o]) ? $y(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var jc = { exports: {} }, Rs = { exports: {} }, at = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wf;
function G$() {
  if (Wf)
    return at;
  Wf = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
  function _(b) {
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
                case y:
                case f:
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
  function $(b) {
    return _(b) === u;
  }
  return at.AsyncMode = c, at.ConcurrentMode = u, at.ContextConsumer = l, at.ContextProvider = a, at.Element = t, at.ForwardRef = d, at.Fragment = n, at.Lazy = y, at.Memo = f, at.Portal = r, at.Profiler = i, at.StrictMode = o, at.Suspense = p, at.isAsyncMode = function(b) {
    return $(b) || _(b) === c;
  }, at.isConcurrentMode = $, at.isContextConsumer = function(b) {
    return _(b) === l;
  }, at.isContextProvider = function(b) {
    return _(b) === a;
  }, at.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, at.isForwardRef = function(b) {
    return _(b) === d;
  }, at.isFragment = function(b) {
    return _(b) === n;
  }, at.isLazy = function(b) {
    return _(b) === y;
  }, at.isMemo = function(b) {
    return _(b) === f;
  }, at.isPortal = function(b) {
    return _(b) === r;
  }, at.isProfiler = function(b) {
    return _(b) === i;
  }, at.isStrictMode = function(b) {
    return _(b) === o;
  }, at.isSuspense = function(b) {
    return _(b) === p;
  }, at.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === u || b === i || b === o || b === p || b === m || typeof b == "object" && b !== null && (b.$$typeof === y || b.$$typeof === f || b.$$typeof === a || b.$$typeof === l || b.$$typeof === d || b.$$typeof === g || b.$$typeof === v || b.$$typeof === S || b.$$typeof === h);
  }, at.typeOf = _, at;
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
function Y$() {
  return qf || (qf = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
    function _(q) {
      return typeof q == "string" || typeof q == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      q === n || q === u || q === i || q === o || q === p || q === m || typeof q == "object" && q !== null && (q.$$typeof === y || q.$$typeof === f || q.$$typeof === a || q.$$typeof === l || q.$$typeof === d || q.$$typeof === g || q.$$typeof === v || q.$$typeof === S || q.$$typeof === h);
    }
    function $(q) {
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
                  case y:
                  case f:
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
    var b = c, x = u, w = l, A = a, j = t, k = d, K = n, U = y, H = f, z = r, G = i, X = o, J = p, Z = !1;
    function ne(q) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), D(q) || $(q) === c;
    }
    function D(q) {
      return $(q) === u;
    }
    function N(q) {
      return $(q) === l;
    }
    function W(q) {
      return $(q) === a;
    }
    function F(q) {
      return typeof q == "object" && q !== null && q.$$typeof === t;
    }
    function O(q) {
      return $(q) === d;
    }
    function R(q) {
      return $(q) === n;
    }
    function B(q) {
      return $(q) === y;
    }
    function Q(q) {
      return $(q) === f;
    }
    function Y(q) {
      return $(q) === r;
    }
    function oe(q) {
      return $(q) === i;
    }
    function ie(q) {
      return $(q) === o;
    }
    function ce(q) {
      return $(q) === p;
    }
    lt.AsyncMode = b, lt.ConcurrentMode = x, lt.ContextConsumer = w, lt.ContextProvider = A, lt.Element = j, lt.ForwardRef = k, lt.Fragment = K, lt.Lazy = U, lt.Memo = H, lt.Portal = z, lt.Profiler = G, lt.StrictMode = X, lt.Suspense = J, lt.isAsyncMode = ne, lt.isConcurrentMode = D, lt.isContextConsumer = N, lt.isContextProvider = W, lt.isElement = F, lt.isForwardRef = O, lt.isFragment = R, lt.isLazy = B, lt.isMemo = Q, lt.isPortal = Y, lt.isProfiler = oe, lt.isStrictMode = ie, lt.isSuspense = ce, lt.isValidElementType = _, lt.typeOf = $;
  }()), lt;
}
var Kf;
function Sy() {
  return Kf || (Kf = 1, process.env.NODE_ENV === "production" ? Rs.exports = G$() : Rs.exports = Y$()), Rs.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Yl, Hf;
function X$() {
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
        for (var m = 0; m < u.length; m++)
          r.call(l, u[m]) && (c[u[m]] = l[u[m]]);
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
function J$() {
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
              var m = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw m.name = "Invariant Violation", m;
            }
            p = i[d](a, d, c, l, null, t);
          } catch (y) {
            p = y;
          }
          if (p && !(p instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var f = u ? u() : "";
            e(
              "Failed " + l + " type: " + p.message + (f ?? "")
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
function Z$() {
  if (Jf)
    return Ql;
  Jf = 1;
  var e = Sy(), t = X$(), r = gu(), n = _y(), o = J$(), i = function() {
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
    var m = "<<anonymous>>", f = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: S(),
      arrayOf: _,
      element: $(),
      elementType: b(),
      instanceOf: x,
      node: k(),
      objectOf: A,
      oneOf: w,
      oneOfType: j,
      shape: U,
      exact: H
    };
    function y(D, N) {
      return D === N ? D !== 0 || 1 / D === 1 / N : D !== D && N !== N;
    }
    function h(D, N) {
      this.message = D, this.data = N && typeof N == "object" ? N : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function g(D) {
      if (process.env.NODE_ENV !== "production")
        var N = {}, W = 0;
      function F(R, B, Q, Y, oe, ie, ce) {
        if (Y = Y || m, ie = ie || Q, ce !== r) {
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
        return B[Q] == null ? R ? B[Q] === null ? new h("The " + oe + " `" + ie + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new h("The " + oe + " `" + ie + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : D(B, Q, Y, oe, ie);
      }
      var O = F.bind(null, !1);
      return O.isRequired = F.bind(null, !0), O;
    }
    function v(D) {
      function N(W, F, O, R, B, Q) {
        var Y = W[F], oe = X(Y);
        if (oe !== D) {
          var ie = J(Y);
          return new h(
            "Invalid " + R + " `" + B + "` of type " + ("`" + ie + "` supplied to `" + O + "`, expected ") + ("`" + D + "`."),
            { expectedType: D }
          );
        }
        return null;
      }
      return g(N);
    }
    function S() {
      return g(a);
    }
    function _(D) {
      function N(W, F, O, R, B) {
        if (typeof D != "function")
          return new h("Property `" + B + "` of component `" + O + "` has invalid PropType notation inside arrayOf.");
        var Q = W[F];
        if (!Array.isArray(Q)) {
          var Y = X(Q);
          return new h("Invalid " + R + " `" + B + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected an array."));
        }
        for (var oe = 0; oe < Q.length; oe++) {
          var ie = D(Q, oe, O, R, B + "[" + oe + "]", r);
          if (ie instanceof Error)
            return ie;
        }
        return null;
      }
      return g(N);
    }
    function $() {
      function D(N, W, F, O, R) {
        var B = N[W];
        if (!l(B)) {
          var Q = X(B);
          return new h("Invalid " + O + " `" + R + "` of type " + ("`" + Q + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(D);
    }
    function b() {
      function D(N, W, F, O, R) {
        var B = N[W];
        if (!e.isValidElementType(B)) {
          var Q = X(B);
          return new h("Invalid " + O + " `" + R + "` of type " + ("`" + Q + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(D);
    }
    function x(D) {
      function N(W, F, O, R, B) {
        if (!(W[F] instanceof D)) {
          var Q = D.name || m, Y = ne(W[F]);
          return new h("Invalid " + R + " `" + B + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected ") + ("instance of `" + Q + "`."));
        }
        return null;
      }
      return g(N);
    }
    function w(D) {
      if (!Array.isArray(D))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function N(W, F, O, R, B) {
        for (var Q = W[F], Y = 0; Y < D.length; Y++)
          if (y(Q, D[Y]))
            return null;
        var oe = JSON.stringify(D, function(ce, q) {
          var pe = J(q);
          return pe === "symbol" ? String(q) : q;
        });
        return new h("Invalid " + R + " `" + B + "` of value `" + String(Q) + "` " + ("supplied to `" + O + "`, expected one of " + oe + "."));
      }
      return g(N);
    }
    function A(D) {
      function N(W, F, O, R, B) {
        if (typeof D != "function")
          return new h("Property `" + B + "` of component `" + O + "` has invalid PropType notation inside objectOf.");
        var Q = W[F], Y = X(Q);
        if (Y !== "object")
          return new h("Invalid " + R + " `" + B + "` of type " + ("`" + Y + "` supplied to `" + O + "`, expected an object."));
        for (var oe in Q)
          if (n(Q, oe)) {
            var ie = D(Q, oe, O, R, B + "." + oe, r);
            if (ie instanceof Error)
              return ie;
          }
        return null;
      }
      return g(N);
    }
    function j(D) {
      if (!Array.isArray(D))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var N = 0; N < D.length; N++) {
        var W = D[N];
        if (typeof W != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(W) + " at index " + N + "."
          ), a;
      }
      function F(O, R, B, Q, Y) {
        for (var oe = [], ie = 0; ie < D.length; ie++) {
          var ce = D[ie], q = ce(O, R, B, Q, Y, r);
          if (q == null)
            return null;
          q.data && n(q.data, "expectedType") && oe.push(q.data.expectedType);
        }
        var pe = oe.length > 0 ? ", expected one of type [" + oe.join(", ") + "]" : "";
        return new h("Invalid " + Q + " `" + Y + "` supplied to " + ("`" + B + "`" + pe + "."));
      }
      return g(F);
    }
    function k() {
      function D(N, W, F, O, R) {
        return z(N[W]) ? null : new h("Invalid " + O + " `" + R + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return g(D);
    }
    function K(D, N, W, F, O) {
      return new h(
        (D || "React class") + ": " + N + " type `" + W + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + O + "`."
      );
    }
    function U(D) {
      function N(W, F, O, R, B) {
        var Q = W[F], Y = X(Q);
        if (Y !== "object")
          return new h("Invalid " + R + " `" + B + "` of type `" + Y + "` " + ("supplied to `" + O + "`, expected `object`."));
        for (var oe in D) {
          var ie = D[oe];
          if (typeof ie != "function")
            return K(O, R, B, oe, J(ie));
          var ce = ie(Q, oe, O, R, B + "." + oe, r);
          if (ce)
            return ce;
        }
        return null;
      }
      return g(N);
    }
    function H(D) {
      function N(W, F, O, R, B) {
        var Q = W[F], Y = X(Q);
        if (Y !== "object")
          return new h("Invalid " + R + " `" + B + "` of type `" + Y + "` " + ("supplied to `" + O + "`, expected `object`."));
        var oe = t({}, W[F], D);
        for (var ie in oe) {
          var ce = D[ie];
          if (n(D, ie) && typeof ce != "function")
            return K(O, R, B, ie, J(ce));
          if (!ce)
            return new h(
              "Invalid " + R + " `" + B + "` key `" + ie + "` supplied to `" + O + "`.\nBad object: " + JSON.stringify(W[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(D), null, "  ")
            );
          var q = ce(Q, ie, O, R, B + "." + ie, r);
          if (q)
            return q;
        }
        return null;
      }
      return g(N);
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
                var O = F.value;
                if (O && !z(O[1]))
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
      return !D.constructor || !D.constructor.name ? m : D.constructor.name;
    }
    return f.checkPropTypes = o, f.resetWarningCache = o.resetWarningCache, f.PropTypes = f, f;
  }, Ql;
}
var ec, Zf;
function Q$() {
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
        var m = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw m.name = "Invariant Violation", m;
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
  var e1 = Sy(), t1 = !0;
  jc.exports = Z$()(e1.isElement, t1);
} else
  jc.exports = Q$()();
var r1 = jc.exports;
const s = /* @__PURE__ */ pt(r1);
function n1(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ey(e, t, r, n, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !n1(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${a}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const xy = Zr(s.element, Ey);
xy.isRequired = Zr(s.element.isRequired, Ey);
const Ua = xy;
function o1(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function i1(e, t, r, n, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !o1(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${a}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Wa = Zr(s.elementType, i1), s1 = "exact-prop: ​";
function wy(e) {
  return process.env.NODE_ENV === "production" ? e : C({}, e, {
    [s1]: (t) => {
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
function a1() {
  if (Qf)
    return ct;
  Qf = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function h(g) {
    if (typeof g == "object" && g !== null) {
      var v = g.$$typeof;
      switch (v) {
        case e:
          switch (g = g.type, g) {
            case r:
            case o:
            case n:
            case u:
            case d:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case a:
                case c:
                case m:
                case p:
                case i:
                  return g;
                default:
                  return v;
              }
          }
        case t:
          return v;
      }
    }
  }
  return ct.ContextConsumer = a, ct.ContextProvider = i, ct.Element = e, ct.ForwardRef = c, ct.Fragment = r, ct.Lazy = m, ct.Memo = p, ct.Portal = t, ct.Profiler = o, ct.StrictMode = n, ct.Suspense = u, ct.SuspenseList = d, ct.isAsyncMode = function() {
    return !1;
  }, ct.isConcurrentMode = function() {
    return !1;
  }, ct.isContextConsumer = function(g) {
    return h(g) === a;
  }, ct.isContextProvider = function(g) {
    return h(g) === i;
  }, ct.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, ct.isForwardRef = function(g) {
    return h(g) === c;
  }, ct.isFragment = function(g) {
    return h(g) === r;
  }, ct.isLazy = function(g) {
    return h(g) === m;
  }, ct.isMemo = function(g) {
    return h(g) === p;
  }, ct.isPortal = function(g) {
    return h(g) === t;
  }, ct.isProfiler = function(g) {
    return h(g) === o;
  }, ct.isStrictMode = function(g) {
    return h(g) === n;
  }, ct.isSuspense = function(g) {
    return h(g) === u;
  }, ct.isSuspenseList = function(g) {
    return h(g) === d;
  }, ct.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === o || g === n || g === u || g === d || g === f || typeof g == "object" && g !== null && (g.$$typeof === m || g.$$typeof === p || g.$$typeof === i || g.$$typeof === a || g.$$typeof === c || g.$$typeof === y || g.getModuleId !== void 0);
  }, ct.typeOf = h, ct;
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
function l1() {
  return ep || (ep = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), y = !1, h = !1, g = !1, v = !1, S = !1, _;
    _ = Symbol.for("react.module.reference");
    function $(te) {
      return !!(typeof te == "string" || typeof te == "function" || te === r || te === o || S || te === n || te === u || te === d || v || te === f || y || h || g || typeof te == "object" && te !== null && (te.$$typeof === m || te.$$typeof === p || te.$$typeof === i || te.$$typeof === a || te.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      te.$$typeof === _ || te.getModuleId !== void 0));
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
                var Ae = Pe && Pe.$$typeof;
                switch (Ae) {
                  case l:
                  case a:
                  case c:
                  case m:
                  case p:
                  case i:
                    return Ae;
                  default:
                    return fe;
                }
            }
          case t:
            return fe;
        }
      }
    }
    var x = a, w = i, A = e, j = c, k = r, K = m, U = p, H = t, z = o, G = n, X = u, J = d, Z = !1, ne = !1;
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
    function O(te) {
      return typeof te == "object" && te !== null && te.$$typeof === e;
    }
    function R(te) {
      return b(te) === c;
    }
    function B(te) {
      return b(te) === r;
    }
    function Q(te) {
      return b(te) === m;
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
    ut.ContextConsumer = x, ut.ContextProvider = w, ut.Element = A, ut.ForwardRef = j, ut.Fragment = k, ut.Lazy = K, ut.Memo = U, ut.Portal = H, ut.Profiler = z, ut.StrictMode = G, ut.Suspense = X, ut.SuspenseList = J, ut.isAsyncMode = D, ut.isConcurrentMode = N, ut.isContextConsumer = W, ut.isContextProvider = F, ut.isElement = O, ut.isForwardRef = R, ut.isFragment = B, ut.isLazy = Q, ut.isMemo = Y, ut.isPortal = oe, ut.isProfiler = ie, ut.isStrictMode = ce, ut.isSuspense = q, ut.isSuspenseList = pe, ut.isValidElementType = $, ut.typeOf = b;
  }()), ut;
}
process.env.NODE_ENV === "production" ? kc.exports = a1() : kc.exports = l1();
var Un = kc.exports;
const tp = /* @__PURE__ */ pt(Un), c1 = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function u1(e) {
  const t = `${e}`.match(c1);
  return t && t[1] || "";
}
function Oy(e, t = "") {
  return e.displayName || e.name || u1(e) || t;
}
function rp(e, t, r) {
  const n = Oy(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function d1(e) {
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
function Ki(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${n} \`${a}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const f1 = s.oneOfType([s.func, s.object]), rr = f1;
function xe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : vn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function fa(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function ss(e, t = 166) {
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
function p1(e, t) {
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
function Ty(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? C({}, t.propTypes) : null;
  return (o) => (i, a, l, c, u, ...d) => {
    const p = u || a, m = r == null ? void 0 : r[p];
    if (m) {
      const f = m(i, a, l, c, u, ...d);
      if (f)
        return f;
    }
    return typeof i[a] < "u" && !i[o] ? new Error(`The prop \`${p}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function pa(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const m1 = typeof window < "u" ? P.useLayoutEffect : P.useEffect, gr = m1;
let np = 0;
function h1(e) {
  const [t, r] = P.useState(e), n = e || t;
  return P.useEffect(() => {
    t == null && (np += 1, r(`mui-${np}`));
  }, [t]), n;
}
const op = P["useId".toString()];
function Hi(e) {
  if (op !== void 0) {
    const t = op();
    return e ?? t;
  }
  return h1(e);
}
function Cy(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Ro({
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
      pa(r, t);
    });
  }, e);
}
let qa = !0, Mc = !1, ip;
const y1 = {
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
function g1(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && y1[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function v1(e) {
  e.metaKey || e.altKey || e.ctrlKey || (qa = !0);
}
function tc() {
  qa = !1;
}
function b1() {
  this.visibilityState === "hidden" && Mc && (qa = !0);
}
function $1(e) {
  e.addEventListener("keydown", v1, !0), e.addEventListener("mousedown", tc, !0), e.addEventListener("pointerdown", tc, !0), e.addEventListener("touchstart", tc, !0), e.addEventListener("visibilitychange", b1, !0);
}
function S1(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return qa || g1(t);
}
function vu() {
  const e = P.useCallback((o) => {
    o != null && $1(o.ownerDocument);
  }, []), t = P.useRef(!1);
  function r() {
    return t.current ? (Mc = !0, window.clearTimeout(ip), ip = window.setTimeout(() => {
      Mc = !1;
    }, 100), t.current = !1, !0) : !1;
  }
  function n(o) {
    return S1(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function Py(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
let so;
function Ry() {
  if (so)
    return so;
  const e = document.createElement("div"), t = document.createElement("div");
  return t.style.width = "10px", t.style.height = "1px", e.appendChild(t), e.dir = "rtl", e.style.fontSize = "14px", e.style.width = "4px", e.style.height = "1px", e.style.position = "absolute", e.style.top = "-1000px", e.style.overflow = "scroll", document.body.appendChild(e), so = "reverse", e.scrollLeft > 0 ? so = "default" : (e.scrollLeft = 1, e.scrollLeft === 0 && (so = "negative")), document.body.removeChild(e), so;
}
function _1(e, t) {
  const r = e.scrollLeft;
  if (t !== "rtl")
    return r;
  switch (Ry()) {
    case "negative":
      return e.scrollWidth - e.clientWidth + r;
    case "reverse":
      return e.scrollWidth - e.clientWidth - r;
    default:
      return r;
  }
}
const E1 = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
}, x1 = E1;
function w1(e) {
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
const T1 = Number.isInteger || O1;
function Iy(e, t, r, n) {
  const o = e[t];
  if (o == null || !T1(o)) {
    const i = w1(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${i}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function Ny(e, t, ...r) {
  return e[t] === void 0 ? null : Iy(e, t, ...r);
}
function Dc() {
  return null;
}
Ny.isRequired = Iy;
Dc.isRequired = Dc;
const Ay = process.env.NODE_ENV === "production" ? Dc : Ny;
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
function Ve(e, t, r = void 0) {
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
const sp = (e) => e, C1 = () => {
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
}, P1 = C1(), $u = P1, R1 = {
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
function De(e, t, r = "Mui") {
  const n = R1[t];
  return n ? `${r}-${n}` : `${$u.generate(e)}-${t}`;
}
function Fe(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = De(e, o, r);
  }), n;
}
function jy(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var I1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, N1 = /* @__PURE__ */ jy(
  function(e) {
    return I1.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
function A1(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function j1(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var k1 = /* @__PURE__ */ function() {
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
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(j1(this));
    var o = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var i = n.charCodeAt(0) === 64 && n.charCodeAt(1) === 105;
      i && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + n + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !i;
    }
    if (this.isSpeedy) {
      var a = A1(o);
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
}(), qt = "-ms-", ma = "-moz-", nt = "-webkit-", Su = "comm", _u = "rule", Eu = "decl", M1 = "@import", ky = "@keyframes", D1 = "@layer", F1 = Math.abs, Ka = String.fromCharCode, L1 = Object.assign;
function B1(e, t) {
  return Vt(e, 0) ^ 45 ? (((t << 2 ^ Vt(e, 0)) << 2 ^ Vt(e, 1)) << 2 ^ Vt(e, 2)) << 2 ^ Vt(e, 3) : 0;
}
function My(e) {
  return e.trim();
}
function V1(e, t) {
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
function Gi(e, t, r) {
  return e.slice(t, r);
}
function jr(e) {
  return e.length;
}
function xu(e) {
  return e.length;
}
function Is(e, t) {
  return t.push(e), e;
}
function z1(e, t) {
  return e.map(t).join("");
}
var Ha = 1, Io = 1, Dy = 0, er = 0, It = 0, zo = "";
function Ga(e, t, r, n, o, i, a) {
  return { value: e, root: t, parent: r, type: n, props: o, children: i, line: Ha, column: Io, length: a, return: "" };
}
function hi(e, t) {
  return L1(Ga("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function U1() {
  return It;
}
function W1() {
  return It = er > 0 ? Vt(zo, --er) : 0, Io--, It === 10 && (Io = 1, Ha--), It;
}
function cr() {
  return It = er < Dy ? Vt(zo, er++) : 0, Io++, It === 10 && (Io = 1, Ha++), It;
}
function Fr() {
  return Vt(zo, er);
}
function Js() {
  return er;
}
function as(e, t) {
  return Gi(zo, e, t);
}
function Yi(e) {
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
function Fy(e) {
  return Ha = Io = 1, Dy = jr(zo = e), er = 0, [];
}
function Ly(e) {
  return zo = "", e;
}
function Zs(e) {
  return My(as(er - 1, Lc(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function q1(e) {
  for (; (It = Fr()) && It < 33; )
    cr();
  return Yi(e) > 2 || Yi(It) > 3 ? "" : " ";
}
function K1(e, t) {
  for (; --t && cr() && !(It < 48 || It > 102 || It > 57 && It < 65 || It > 70 && It < 97); )
    ;
  return as(e, Js() + (t < 6 && Fr() == 32 && cr() == 32));
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
function H1(e, t) {
  for (; cr() && e + It !== 47 + 10; )
    if (e + It === 42 + 42 && Fr() === 47)
      break;
  return "/*" + as(t, er - 1) + "*" + Ka(e === 47 ? e : cr());
}
function G1(e) {
  for (; !Yi(Fr()); )
    cr();
  return as(e, er);
}
function Y1(e) {
  return Ly(Qs("", null, null, null, [""], e = Fy(e), 0, [0], e));
}
function Qs(e, t, r, n, o, i, a, l, c) {
  for (var u = 0, d = 0, p = a, m = 0, f = 0, y = 0, h = 1, g = 1, v = 1, S = 0, _ = "", $ = o, b = i, x = n, w = _; g; )
    switch (y = S, S = cr()) {
      case 40:
        if (y != 108 && Vt(w, p - 1) == 58) {
          Fc(w += ot(Zs(S), "&", "&\f"), "&\f") != -1 && (v = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        w += Zs(S);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        w += q1(y);
        break;
      case 92:
        w += K1(Js() - 1, 7);
        continue;
      case 47:
        switch (Fr()) {
          case 42:
          case 47:
            Is(X1(H1(cr(), Js()), t, r), c);
            break;
          default:
            w += "/";
        }
        break;
      case 123 * h:
        l[u++] = jr(w) * v;
      case 125 * h:
      case 59:
      case 0:
        switch (S) {
          case 0:
          case 125:
            g = 0;
          case 59 + d:
            v == -1 && (w = ot(w, /\f/g, "")), f > 0 && jr(w) - p && Is(f > 32 ? lp(w + ";", n, r, p - 1) : lp(ot(w, " ", "") + ";", n, r, p - 2), c);
            break;
          case 59:
            w += ";";
          default:
            if (Is(x = ap(w, t, r, u, d, o, l, _, $ = [], b = [], p), i), S === 123)
              if (d === 0)
                Qs(w, t, x, x, $, i, p, l, b);
              else
                switch (m === 99 && Vt(w, 3) === 110 ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Qs(e, x, x, n && Is(ap(e, x, x, 0, 0, o, l, _, o, $ = [], p), b), o, b, p, l, n ? $ : b);
                    break;
                  default:
                    Qs(w, x, x, x, [""], b, 0, l, b);
                }
        }
        u = d = f = 0, h = v = 1, _ = w = "", p = a;
        break;
      case 58:
        p = 1 + jr(w), f = y;
      default:
        if (h < 1) {
          if (S == 123)
            --h;
          else if (S == 125 && h++ == 0 && W1() == 125)
            continue;
        }
        switch (w += Ka(S), S * h) {
          case 38:
            v = d > 0 ? 1 : (w += "\f", -1);
            break;
          case 44:
            l[u++] = (jr(w) - 1) * v, v = 1;
            break;
          case 64:
            Fr() === 45 && (w += Zs(cr())), m = Fr(), d = p = jr(_ = w += G1(Js())), S++;
            break;
          case 45:
            y === 45 && jr(w) == 2 && (h = 0);
        }
    }
  return i;
}
function ap(e, t, r, n, o, i, a, l, c, u, d) {
  for (var p = o - 1, m = o === 0 ? i : [""], f = xu(m), y = 0, h = 0, g = 0; y < n; ++y)
    for (var v = 0, S = Gi(e, p + 1, p = F1(h = a[y])), _ = e; v < f; ++v)
      (_ = My(h > 0 ? m[v] + " " + S : ot(S, /&\f/g, m[v]))) && (c[g++] = _);
  return Ga(e, t, r, o === 0 ? _u : l, c, u, d);
}
function X1(e, t, r) {
  return Ga(e, t, r, Su, Ka(U1()), Gi(e, 2, -2), 0);
}
function lp(e, t, r, n) {
  return Ga(e, t, r, Eu, Gi(e, 0, n), Gi(e, n + 1, -1), n);
}
function xo(e, t) {
  for (var r = "", n = xu(e), o = 0; o < n; o++)
    r += t(e[o], o, e, t) || "";
  return r;
}
function J1(e, t, r, n) {
  switch (e.type) {
    case D1:
      if (e.children.length)
        break;
    case M1:
    case Eu:
      return e.return = e.return || e.value;
    case Su:
      return "";
    case ky:
      return e.return = e.value + "{" + xo(e.children, n) + "}";
    case _u:
      e.value = e.props.join(",");
  }
  return jr(r = xo(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Z1(e) {
  var t = xu(e);
  return function(r, n, o, i) {
    for (var a = "", l = 0; l < t; l++)
      a += e[l](r, n, o, i) || "";
    return a;
  };
}
function Q1(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
var eS = function(t, r, n) {
  for (var o = 0, i = 0; o = i, i = Fr(), o === 38 && i === 12 && (r[n] = 1), !Yi(i); )
    cr();
  return as(t, er);
}, tS = function(t, r) {
  var n = -1, o = 44;
  do
    switch (Yi(o)) {
      case 0:
        o === 38 && Fr() === 12 && (r[n] = 1), t[n] += eS(er - 1, r, n);
        break;
      case 2:
        t[n] += Zs(o);
        break;
      case 4:
        if (o === 44) {
          t[++n] = Fr() === 58 ? "&\f" : "", r[n] = t[n].length;
          break;
        }
      default:
        t[n] += Ka(o);
    }
  while (o = cr());
  return t;
}, rS = function(t, r) {
  return Ly(tS(Fy(t), r));
}, cp = /* @__PURE__ */ new WeakMap(), nS = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var r = t.value, n = t.parent, o = t.column === n.column && t.line === n.line; n.type !== "rule"; )
      if (n = n.parent, !n)
        return;
    if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !cp.get(n)) && !o) {
      cp.set(t, !0);
      for (var i = [], a = rS(r, i), l = n.props, c = 0, u = 0; c < a.length; c++)
        for (var d = 0; d < l.length; d++, u++)
          t.props[u] = i[c] ? a[c].replace(/&\f/g, l[d]) : l[d] + " " + a[c];
    }
  }
}, oS = function(t) {
  if (t.type === "decl") {
    var r = t.value;
    // charcode for l
    r.charCodeAt(0) === 108 && // charcode for b
    r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
}, iS = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", sS = function(t) {
  return t.type === "comm" && t.children.indexOf(iS) > -1;
}, aS = function(t) {
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
            if (sS(u))
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
}, By = function(t) {
  return t.type.charCodeAt(1) === 105 && t.type.charCodeAt(0) === 64;
}, lS = function(t, r) {
  for (var n = t - 1; n >= 0; n--)
    if (!By(r[n]))
      return !0;
  return !1;
}, up = function(t) {
  t.type = "", t.value = "", t.return = "", t.children = "", t.props = "";
}, cS = function(t, r, n) {
  By(t) && (t.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), up(t)) : lS(r, n) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), up(t)));
};
function Vy(e, t) {
  switch (B1(e, t)) {
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
      return nt + e + ma + e + qt + e + e;
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
            return ot(e, /(.+:)(.+)-([^]+)/, "$1" + nt + "$2-$3$1" + ma + (Vt(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~Fc(e, "stretch") ? Vy(ot(e, "stretch", "fill-available"), t) + e : e;
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
var uS = function(t, r, n, o) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case Eu:
        t.return = Vy(t.value, t.length);
        break;
      case ky:
        return xo([hi(t, {
          value: ot(t.value, "@", "@" + nt)
        })], o);
      case _u:
        if (t.length)
          return z1(t.props, function(i) {
            switch (V1(i, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return xo([hi(t, {
                  props: [ot(i, /:(read-\w+)/, ":" + ma + "$1")]
                })], o);
              case "::placeholder":
                return xo([hi(t, {
                  props: [ot(i, /:(plac\w+)/, ":" + nt + "input-$1")]
                }), hi(t, {
                  props: [ot(i, /:(plac\w+)/, ":" + ma + "$1")]
                }), hi(t, {
                  props: [ot(i, /:(plac\w+)/, qt + "input-$1")]
                })], o);
            }
            return "";
          });
    }
}, dS = [uS], fS = function(t) {
  var r = t.key;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (r === "css") {
    var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n, function(h) {
      var g = h.getAttribute("data-emotion");
      g.indexOf(" ") !== -1 && (document.head.appendChild(h), h.setAttribute("data-s", ""));
    });
  }
  var o = t.stylisPlugins || dS;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(r))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + r + '" was passed');
  var i = {}, a, l = [];
  a = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(h) {
      for (var g = h.getAttribute("data-emotion").split(" "), v = 1; v < g.length; v++)
        i[g[v]] = !0;
      l.push(h);
    }
  );
  var c, u = [nS, oS];
  process.env.NODE_ENV !== "production" && u.push(aS({
    get compat() {
      return y.compat;
    }
  }), cS);
  {
    var d, p = [J1, process.env.NODE_ENV !== "production" ? function(h) {
      h.root || (h.return ? d.insert(h.return) : h.value && h.type !== Su && d.insert(h.value + "{}"));
    } : Q1(function(h) {
      d.insert(h);
    })], m = Z1(u.concat(o, p)), f = function(g) {
      return xo(Y1(g), m);
    };
    c = function(g, v, S, _) {
      d = S, process.env.NODE_ENV !== "production" && v.map !== void 0 && (d = {
        insert: function(b) {
          S.insert(b + v.map);
        }
      }), f(g ? g + "{" + v.styles + "}" : v.styles), _ && (y.inserted[v.name] = !0);
    };
  }
  var y = {
    key: r,
    sheet: new k1({
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
  return y.sheet.hydrate(l), y;
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
function pS() {
  if (dp)
    return dt;
  dp = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
  function _(b) {
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
                case y:
                case f:
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
  function $(b) {
    return _(b) === u;
  }
  return dt.AsyncMode = c, dt.ConcurrentMode = u, dt.ContextConsumer = l, dt.ContextProvider = a, dt.Element = t, dt.ForwardRef = d, dt.Fragment = n, dt.Lazy = y, dt.Memo = f, dt.Portal = r, dt.Profiler = i, dt.StrictMode = o, dt.Suspense = p, dt.isAsyncMode = function(b) {
    return $(b) || _(b) === c;
  }, dt.isConcurrentMode = $, dt.isContextConsumer = function(b) {
    return _(b) === l;
  }, dt.isContextProvider = function(b) {
    return _(b) === a;
  }, dt.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, dt.isForwardRef = function(b) {
    return _(b) === d;
  }, dt.isFragment = function(b) {
    return _(b) === n;
  }, dt.isLazy = function(b) {
    return _(b) === y;
  }, dt.isMemo = function(b) {
    return _(b) === f;
  }, dt.isPortal = function(b) {
    return _(b) === r;
  }, dt.isProfiler = function(b) {
    return _(b) === i;
  }, dt.isStrictMode = function(b) {
    return _(b) === o;
  }, dt.isSuspense = function(b) {
    return _(b) === p;
  }, dt.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === u || b === i || b === o || b === p || b === m || typeof b == "object" && b !== null && (b.$$typeof === y || b.$$typeof === f || b.$$typeof === a || b.$$typeof === l || b.$$typeof === d || b.$$typeof === g || b.$$typeof === v || b.$$typeof === S || b.$$typeof === h);
  }, dt.typeOf = _, dt;
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
function mS() {
  return fp || (fp = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
    function _(q) {
      return typeof q == "string" || typeof q == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      q === n || q === u || q === i || q === o || q === p || q === m || typeof q == "object" && q !== null && (q.$$typeof === y || q.$$typeof === f || q.$$typeof === a || q.$$typeof === l || q.$$typeof === d || q.$$typeof === g || q.$$typeof === v || q.$$typeof === S || q.$$typeof === h);
    }
    function $(q) {
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
                  case y:
                  case f:
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
    var b = c, x = u, w = l, A = a, j = t, k = d, K = n, U = y, H = f, z = r, G = i, X = o, J = p, Z = !1;
    function ne(q) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), D(q) || $(q) === c;
    }
    function D(q) {
      return $(q) === u;
    }
    function N(q) {
      return $(q) === l;
    }
    function W(q) {
      return $(q) === a;
    }
    function F(q) {
      return typeof q == "object" && q !== null && q.$$typeof === t;
    }
    function O(q) {
      return $(q) === d;
    }
    function R(q) {
      return $(q) === n;
    }
    function B(q) {
      return $(q) === y;
    }
    function Q(q) {
      return $(q) === f;
    }
    function Y(q) {
      return $(q) === r;
    }
    function oe(q) {
      return $(q) === i;
    }
    function ie(q) {
      return $(q) === o;
    }
    function ce(q) {
      return $(q) === p;
    }
    ft.AsyncMode = b, ft.ConcurrentMode = x, ft.ContextConsumer = w, ft.ContextProvider = A, ft.Element = j, ft.ForwardRef = k, ft.Fragment = K, ft.Lazy = U, ft.Memo = H, ft.Portal = z, ft.Profiler = G, ft.StrictMode = X, ft.Suspense = J, ft.isAsyncMode = ne, ft.isConcurrentMode = D, ft.isContextConsumer = N, ft.isContextProvider = W, ft.isElement = F, ft.isForwardRef = O, ft.isFragment = R, ft.isLazy = B, ft.isMemo = Q, ft.isPortal = Y, ft.isProfiler = oe, ft.isStrictMode = ie, ft.isSuspense = ce, ft.isValidElementType = _, ft.typeOf = $;
  }()), ft;
}
process.env.NODE_ENV === "production" ? Bc.exports = pS() : Bc.exports = mS();
var hS = Bc.exports, zy = hS, yS = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, gS = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Uy = {};
Uy[zy.ForwardRef] = yS;
Uy[zy.Memo] = gS;
var vS = !0;
function wu(e, t, r) {
  var n = "";
  return r.split(" ").forEach(function(o) {
    e[o] !== void 0 ? t.push(e[o] + ";") : n += o + " ";
  }), n;
}
var Ya = function(t, r, n) {
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
  vS === !1) && t.registered[o] === void 0 && (t.registered[o] = r.styles);
}, Xa = function(t, r, n) {
  Ya(t, r, n);
  var o = t.key + "-" + r.name;
  if (t.inserted[r.name] === void 0) {
    var i = r;
    do
      t.insert(r === i ? "." + o : "", i, t.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function bS(e) {
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
var $S = {
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
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, SS = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", _S = /[A-Z]|^ms/g, Wy = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ou = function(t) {
  return t.charCodeAt(1) === 45;
}, mp = function(t) {
  return t != null && typeof t != "boolean";
}, rc = /* @__PURE__ */ jy(function(e) {
  return Ou(e) ? e : e.replace(_S, "-$&").toLowerCase();
}), ha = function(t, r) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(Wy, function(n, o, i) {
          return _r = {
            name: o,
            styles: i,
            next: _r
          }, o;
        });
  }
  return $S[t] !== 1 && !Ou(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
if (process.env.NODE_ENV !== "production") {
  var ES = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, xS = ["normal", "none", "initial", "inherit", "unset"], wS = ha, OS = /^-ms-/, TS = /-(.)/g, hp = {};
  ha = function(t, r) {
    if (t === "content" && (typeof r != "string" || xS.indexOf(r) === -1 && !ES.test(r) && (r.charAt(0) !== r.charAt(r.length - 1) || r.charAt(0) !== '"' && r.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + r + "\"'`");
    var n = wS(t, r);
    return n !== "" && !Ou(t) && t.indexOf("-") !== -1 && hp[t] === void 0 && (hp[t] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + t.replace(OS, "ms-").replace(TS, function(o, i) {
      return i.toUpperCase();
    }) + "?")), n;
  };
}
var qy = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function Xi(e, t, r) {
  if (r == null)
    return "";
  if (r.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && r.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error(qy);
    return r;
  }
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1)
        return _r = {
          name: r.name,
          styles: r.styles,
          next: _r
        }, r.name;
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0)
          for (; n !== void 0; )
            _r = {
              name: n.name,
              styles: n.styles,
              next: _r
            }, n = n.next;
        var o = r.styles + ";";
        return process.env.NODE_ENV !== "production" && r.map !== void 0 && (o += r.map), o;
      }
      return CS(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var i = _r, a = r(e);
        return _r = i, Xi(e, t, a);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var l = [], c = r.replace(Wy, function(d, p, m) {
          var f = "animation" + l.length;
          return l.push("const " + f + " = keyframes`" + m.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + f + "}";
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
function CS(e, t, r) {
  var n = "";
  if (Array.isArray(r))
    for (var o = 0; o < r.length; o++)
      n += Xi(e, t, r[o]) + ";";
  else
    for (var i in r) {
      var a = r[i];
      if (typeof a != "object")
        t != null && t[a] !== void 0 ? n += i + "{" + t[a] + "}" : mp(a) && (n += rc(i) + ":" + ha(i, a) + ";");
      else {
        if (i === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error(qy);
        if (Array.isArray(a) && typeof a[0] == "string" && (t == null || t[a[0]] === void 0))
          for (var l = 0; l < a.length; l++)
            mp(a[l]) && (n += rc(i) + ":" + ha(i, a[l]) + ";");
        else {
          var c = Xi(e, t, a);
          switch (i) {
            case "animation":
            case "animationName": {
              n += rc(i) + ":" + c + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && i === "undefined" && console.error(SS), n += i + "{" + c + "}";
          }
        }
      }
    }
  return n;
}
var yp = /label:\s*([^\s;\n{]+)\s*(;|$)/g, Ky;
process.env.NODE_ENV !== "production" && (Ky = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var _r, No = function(t, r, n) {
  if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
    return t[0];
  var o = !0, i = "";
  _r = void 0;
  var a = t[0];
  a == null || a.raw === void 0 ? (o = !1, i += Xi(n, r, a)) : (process.env.NODE_ENV !== "production" && a[0] === void 0 && console.error(pp), i += a[0]);
  for (var l = 1; l < t.length; l++)
    i += Xi(n, r, t[l]), o && (process.env.NODE_ENV !== "production" && a[l] === void 0 && console.error(pp), i += a[l]);
  var c;
  process.env.NODE_ENV !== "production" && (i = i.replace(Ky, function(m) {
    return c = m, "";
  })), yp.lastIndex = 0;
  for (var u = "", d; (d = yp.exec(i)) !== null; )
    u += "-" + // $FlowFixMe we know it's not null
    d[1];
  var p = bS(i) + u;
  return process.env.NODE_ENV !== "production" ? {
    name: p,
    styles: i,
    map: c,
    next: _r,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: p,
    styles: i,
    next: _r
  };
}, PS = function(t) {
  return t();
}, Hy = P["useInsertionEffect"] ? P["useInsertionEffect"] : !1, Tu = Hy || PS, gp = Hy || P.useLayoutEffect, RS = {}.hasOwnProperty, Cu = /* @__PURE__ */ P.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ fS({
    key: "css"
  }) : null
);
process.env.NODE_ENV !== "production" && (Cu.displayName = "EmotionCacheContext");
Cu.Provider;
var Ja = function(t) {
  return /* @__PURE__ */ yy(function(r, n) {
    var o = j$(Cu);
    return t(r, o, n);
  });
}, Uo = /* @__PURE__ */ P.createContext({});
process.env.NODE_ENV !== "production" && (Uo.displayName = "EmotionThemeContext");
var vp = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", bp = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", IS = function(t) {
  var r = t.cache, n = t.serialized, o = t.isStringTag;
  return Ya(r, n, o), Tu(function() {
    return Xa(r, n, o);
  }), null;
}, NS = /* @__PURE__ */ Ja(function(e, t, r) {
  var n = e.css;
  typeof n == "string" && t.registered[n] !== void 0 && (n = t.registered[n]);
  var o = e[vp], i = [n], a = "";
  typeof e.className == "string" ? a = wu(t.registered, i, e.className) : e.className != null && (a = e.className + " ");
  var l = No(i, void 0, P.useContext(Uo));
  if (process.env.NODE_ENV !== "production" && l.name.indexOf("-") === -1) {
    var c = e[bp];
    c && (l = No([l, "label:" + c + ";"]));
  }
  a += t.key + "-" + l.name;
  var u = {};
  for (var d in e)
    RS.call(e, d) && d !== "css" && d !== vp && (process.env.NODE_ENV === "production" || d !== bp) && (u[d] = e[d]);
  return u.ref = r, u.className = a, /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(IS, {
    cache: t,
    serialized: l,
    isStringTag: typeof o == "string"
  }), /* @__PURE__ */ P.createElement(o, u));
});
process.env.NODE_ENV !== "production" && (NS.displayName = "EmotionCssPropInternal");
var AS = {
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
}, $p = !1, Gy = /* @__PURE__ */ Ja(function(e, t) {
  process.env.NODE_ENV !== "production" && !$p && // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  (e.className || e.css) && (console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"), $p = !0);
  var r = e.styles, n = No([r], void 0, P.useContext(Uo)), o = P.useRef();
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
    if (n.next !== void 0 && Xa(t, n.next, !0), a.tags.length) {
      var c = a.tags[a.tags.length - 1].nextElementSibling;
      a.before = c, a.flush();
    }
    t.insert("", n, a, !1);
  }, [t, n.name]), null;
});
process.env.NODE_ENV !== "production" && (Gy.displayName = "EmotionGlobal");
function jS() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return No(t);
}
var Pu = function() {
  var t = jS.apply(void 0, arguments), r = "animation-" + t.name;
  return {
    name: r,
    styles: "@keyframes " + r + "{" + t.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, kS = function e(t) {
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
function MS(e, t, r) {
  var n = [], o = wu(e, n, r);
  return n.length < 2 ? r : o + t(n);
}
var DS = function(t) {
  var r = t.cache, n = t.serializedArr;
  return Tu(function() {
    for (var o = 0; o < n.length; o++)
      Xa(r, n[o], !1);
  }), null;
}, FS = /* @__PURE__ */ Ja(function(e, t) {
  var r = !1, n = [], o = function() {
    if (r && process.env.NODE_ENV !== "production")
      throw new Error("css can only be used during render");
    for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++)
      d[p] = arguments[p];
    var m = No(d, t.registered);
    return n.push(m), Ya(t, m, !1), t.key + "-" + m.name;
  }, i = function() {
    if (r && process.env.NODE_ENV !== "production")
      throw new Error("cx can only be used during render");
    for (var u = arguments.length, d = new Array(u), p = 0; p < u; p++)
      d[p] = arguments[p];
    return MS(t.registered, o, kS(d));
  }, a = {
    css: o,
    cx: i,
    theme: P.useContext(Uo)
  }, l = e.children(a);
  return r = !0, /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(DS, {
    cache: t,
    serializedArr: n
  }), l);
});
process.env.NODE_ENV !== "production" && (FS.displayName = "EmotionClassNames");
if (process.env.NODE_ENV !== "production") {
  var Sp = !0, LS = typeof jest < "u" || typeof vi < "u";
  if (Sp && !LS) {
    var _p = (
      // $FlowIgnore
      typeof globalThis < "u" ? globalThis : Sp ? window : global
    ), Ep = "__EMOTION_REACT_" + AS.version.split(".")[0] + "__";
    _p[Ep] && console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."), _p[Ep] = !0;
  }
}
var BS = N1, VS = function(t) {
  return t !== "theme";
}, xp = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? BS : VS;
}, wp = function(t, r, n) {
  var o;
  if (r) {
    var i = r.shouldForwardProp;
    o = t.__emotion_forwardProp && i ? function(a) {
      return t.__emotion_forwardProp(a) && i(a);
    } : i;
  }
  return typeof o != "function" && n && (o = t.__emotion_forwardProp), o;
}, Op = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, zS = function(t) {
  var r = t.cache, n = t.serialized, o = t.isStringTag;
  return Ya(r, n, o), Tu(function() {
    return Xa(r, n, o);
  }), null;
}, US = function e(t, r) {
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
      process.env.NODE_ENV !== "production" && d[0][0] === void 0 && console.error(Op), p.push(d[0][0]);
      for (var m = d.length, f = 1; f < m; f++)
        process.env.NODE_ENV !== "production" && d[0][f] === void 0 && console.error(Op), p.push(d[f], d[0][f]);
    }
    var y = Ja(function(h, g, v) {
      var S = u && h.as || o, _ = "", $ = [], b = h;
      if (h.theme == null) {
        b = {};
        for (var x in h)
          b[x] = h[x];
        b.theme = P.useContext(Uo);
      }
      typeof h.className == "string" ? _ = wu(g.registered, $, h.className) : h.className != null && (_ = h.className + " ");
      var w = No(p.concat($), g.registered, b);
      _ += g.key + "-" + w.name, a !== void 0 && (_ += " " + a);
      var A = u && l === void 0 ? xp(S) : c, j = {};
      for (var k in h)
        u && k === "as" || // $FlowFixMe
        A(k) && (j[k] = h[k]);
      return j.className = _, j.ref = v, /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(zS, {
        cache: g,
        serialized: w,
        isStringTag: typeof S == "string"
      }), /* @__PURE__ */ P.createElement(S, j));
    });
    return y.displayName = i !== void 0 ? i : "Styled(" + (typeof o == "string" ? o : o.displayName || o.name || "Component") + ")", y.defaultProps = t.defaultProps, y.__emotion_real = y, y.__emotion_base = o, y.__emotion_styles = p, y.__emotion_forwardProp = l, Object.defineProperty(y, "toString", {
      value: function() {
        return a === void 0 && process.env.NODE_ENV !== "production" ? "NO_COMPONENT_SELECTOR" : "." + a;
      }
    }), y.withComponent = function(h, g) {
      return e(h, C({}, r, g, {
        shouldForwardProp: wp(y, g, !0)
      })).apply(void 0, p);
    }, y;
  };
}, WS = [
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
], Vc = US.bind();
WS.forEach(function(e) {
  Vc[e] = Vc(e);
});
function qS(e) {
  return e == null || Object.keys(e).length === 0;
}
function Yy(e) {
  const {
    styles: t,
    defaultTheme: r = {}
  } = e, n = typeof t == "function" ? (o) => t(qS(o) ? r : o) : t;
  return /* @__PURE__ */ E.jsx(Gy, {
    styles: n
  });
}
process.env.NODE_ENV !== "production" && (Yy.propTypes = {
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
function Xy(e, t) {
  const r = Vc(e, t);
  return process.env.NODE_ENV !== "production" ? (...n) => {
    const o = typeof e == "string" ? `"${e}"` : "component";
    return n.length === 0 ? console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : n.some((i) => i === void 0) && console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`), r(...n);
  } : r;
}
const KS = (e, t) => {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
};
function _e(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const HS = ["values", "unit", "step"], GS = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => C({}, r, {
    [n.key]: n.val
  }), {});
};
function YS(e) {
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
  } = e, o = _e(e, HS), i = GS(t), a = Object.keys(i);
  function l(m) {
    return `@media (min-width:${typeof t[m] == "number" ? t[m] : m}${r})`;
  }
  function c(m) {
    return `@media (max-width:${(typeof t[m] == "number" ? t[m] : m) - n / 100}${r})`;
  }
  function u(m, f) {
    const y = a.indexOf(f);
    return `@media (min-width:${typeof t[m] == "number" ? t[m] : m}${r}) and (max-width:${(y !== -1 && typeof t[a[y]] == "number" ? t[a[y]] : f) - n / 100}${r})`;
  }
  function d(m) {
    return a.indexOf(m) + 1 < a.length ? u(m, a[a.indexOf(m) + 1]) : l(m);
  }
  function p(m) {
    const f = a.indexOf(m);
    return f === 0 ? l(a[1]) : f === a.length - 1 ? c(a[f]) : u(m, a[a.indexOf(m) + 1]).replace("@media", "@media not all and");
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
const XS = {
  borderRadius: 4
}, JS = XS, ZS = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, $n = ZS;
function ji(e, t) {
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
}, Tp = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Ru[e]}px)`
};
function tr(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const i = n.breakpoints || Tp;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = r(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = n.breakpoints || Tp;
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
function Jy(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const i = e.up(o);
    return n[i] = {}, n;
  }, {})) || {};
}
function Zy(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function QS(e, ...t) {
  const r = Jy(e), n = [r, ...t].reduce((o, i) => Ht(o, i), {});
  return Zy(Object.keys(r), n);
}
function e_(e, t) {
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
  const n = r || e_(e, t), o = Object.keys(n);
  if (o.length === 0)
    return e;
  let i;
  return o.reduce((a, l, c) => (Array.isArray(e) ? (a[l] = e[c] != null ? e[c] : e[i], i = c) : typeof e == "object" ? (a[l] = e[l] != null ? e[l] : e[i], i = l) : a[l] = e, a), {});
}
function Za(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function ya(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = Za(e, r) || n, t && (o = t(o, n, e)), o;
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
    const l = a[t], c = a.theme, u = Za(c, n) || {};
    return tr(a, l, (p) => {
      let m = ya(u, o, p);
      return p === m && typeof p == "string" && (m = ya(u, o, `${t}${p === "default" ? "" : xe(p)}`, p)), r === !1 ? m : {
        [r]: m
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: $n
  } : {}, i.filterProps = [t], i;
}
function t_(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const r_ = {
  m: "margin",
  p: "padding"
}, n_ = {
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
}, o_ = t_((e) => {
  if (e.length > 2)
    if (Cp[e])
      e = Cp[e];
    else
      return [e];
  const [t, r] = e.split(""), n = r_[t], o = n_[r] || "";
  return Array.isArray(o) ? o.map((i) => n + i) : [n + o];
}), Qa = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], el = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], i_ = [...Qa, ...el];
function ls(e, t, r, n) {
  var o;
  const i = (o = Za(e, t, !1)) != null ? o : r;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Iu(e) {
  return ls(e, "spacing", 8, "spacing");
}
function Wn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function s_(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Wn(t, r), n), {});
}
function a_(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = o_(r), i = s_(o, n), a = e[r];
  return tr(e, a, i);
}
function Qy(e, t) {
  const r = Iu(e.theme);
  return Object.keys(e).map((n) => a_(e, t, n, r)).reduce(ji, {});
}
function xt(e) {
  return Qy(e, Qa);
}
xt.propTypes = process.env.NODE_ENV !== "production" ? Qa.reduce((e, t) => (e[t] = $n, e), {}) : {};
xt.filterProps = Qa;
function wt(e) {
  return Qy(e, el);
}
wt.propTypes = process.env.NODE_ENV !== "production" ? el.reduce((e, t) => (e[t] = $n, e), {}) : {};
wt.filterProps = el;
process.env.NODE_ENV !== "production" && i_.reduce((e, t) => (e[t] = $n, e), {});
function l_(e = 8) {
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
function tl(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((i) => {
    n[i] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, i) => t[i] ? ji(o, t[i](n)) : o, {});
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
const c_ = vr("border", pr), u_ = vr("borderTop", pr), d_ = vr("borderRight", pr), f_ = vr("borderBottom", pr), p_ = vr("borderLeft", pr), m_ = vr("borderColor"), h_ = vr("borderTopColor"), y_ = vr("borderRightColor"), g_ = vr("borderBottomColor"), v_ = vr("borderLeftColor"), b_ = vr("outline", pr), $_ = vr("outlineColor"), rl = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = ls(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Wn(t, n)
    });
    return tr(e, e.borderRadius, r);
  }
  return null;
};
rl.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: $n
} : {};
rl.filterProps = ["borderRadius"];
tl(c_, u_, d_, f_, p_, m_, h_, y_, g_, v_, rl, b_, $_);
const nl = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = ls(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Wn(t, n)
    });
    return tr(e, e.gap, r);
  }
  return null;
};
nl.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: $n
} : {};
nl.filterProps = ["gap"];
const ol = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = ls(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Wn(t, n)
    });
    return tr(e, e.columnGap, r);
  }
  return null;
};
ol.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: $n
} : {};
ol.filterProps = ["columnGap"];
const il = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = ls(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Wn(t, n)
    });
    return tr(e, e.rowGap, r);
  }
  return null;
};
il.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: $n
} : {};
il.filterProps = ["rowGap"];
const S_ = Rt({
  prop: "gridColumn"
}), __ = Rt({
  prop: "gridRow"
}), E_ = Rt({
  prop: "gridAutoFlow"
}), x_ = Rt({
  prop: "gridAutoColumns"
}), w_ = Rt({
  prop: "gridAutoRows"
}), O_ = Rt({
  prop: "gridTemplateColumns"
}), T_ = Rt({
  prop: "gridTemplateRows"
}), C_ = Rt({
  prop: "gridTemplateAreas"
}), P_ = Rt({
  prop: "gridArea"
});
tl(nl, ol, il, S_, __, E_, x_, w_, O_, T_, C_, P_);
function wo(e, t) {
  return t === "grey" ? t : e;
}
const R_ = Rt({
  prop: "color",
  themeKey: "palette",
  transform: wo
}), I_ = Rt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: wo
}), N_ = Rt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: wo
});
tl(R_, I_, N_);
function ir(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const A_ = Rt({
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
const j_ = Rt({
  prop: "minWidth",
  transform: ir
}), k_ = Rt({
  prop: "height",
  transform: ir
}), M_ = Rt({
  prop: "maxHeight",
  transform: ir
}), D_ = Rt({
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
const F_ = Rt({
  prop: "boxSizing"
});
tl(A_, Nu, j_, k_, M_, D_, F_);
const L_ = {
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
    style: rl
  },
  // palette
  color: {
    themeKey: "palette",
    transform: wo
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: wo
  },
  backgroundColor: {
    themeKey: "palette",
    transform: wo
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
    style: nl
  },
  rowGap: {
    style: il
  },
  columnGap: {
    style: ol
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
}, sl = L_;
function B_(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function V_(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function z_() {
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
    const m = Za(o, u) || {};
    return p ? p(a) : tr(a, n, (y) => {
      let h = ya(m, d, y);
      return y === h && typeof y == "string" && (h = ya(m, d, `${r}${y === "default" ? "" : xe(y)}`, y)), c === !1 ? h : {
        [c]: h
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
    const a = (n = i.unstable_sxConfig) != null ? n : sl;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = Jy(i.breakpoints), p = Object.keys(d);
      let m = d;
      return Object.keys(u).forEach((f) => {
        const y = V_(u[f], i);
        if (y != null)
          if (typeof y == "object")
            if (a[f])
              m = ji(m, e(f, y, i, a));
            else {
              const h = tr({
                theme: i
              }, y, (g) => ({
                [f]: g
              }));
              B_(h, y) ? m[f] = t({
                sx: y,
                theme: i
              }) : m = ji(m, h);
            }
          else
            m = ji(m, e(f, y, i, a));
      }), Zy(p, m);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const eg = z_();
eg.filterProps = ["sx"];
const al = eg, U_ = ["breakpoints", "palette", "spacing", "shape"];
function ll(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: i = {}
  } = e, a = _e(e, U_), l = YS(r), c = l_(o);
  let u = Ht({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: C({
      mode: "light"
    }, n),
    spacing: c,
    shape: C({}, JS, i)
  }, a);
  return u = t.reduce((d, p) => Ht(d, p), u), u.unstable_sxConfig = C({}, sl, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(p) {
    return al({
      sx: p,
      theme: this
    });
  }, u;
}
function W_(e) {
  return Object.keys(e).length === 0;
}
function q_(e = null) {
  const t = P.useContext(Uo);
  return !t || W_(t) ? e : t;
}
const K_ = ll();
function cl(e = K_) {
  return q_(e);
}
function tg({
  styles: e,
  themeId: t,
  defaultTheme: r = {}
}) {
  const n = cl(r), o = typeof e == "function" ? e(t && n[t] || n) : e;
  return /* @__PURE__ */ E.jsx(Yy, {
    styles: o
  });
}
process.env.NODE_ENV !== "production" && (tg.propTypes = {
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
const H_ = ["sx"], G_ = (e) => {
  var t, r;
  const n = {
    systemProps: {},
    otherProps: {}
  }, o = (t = e == null || (r = e.theme) == null ? void 0 : r.unstable_sxConfig) != null ? t : sl;
  return Object.keys(e).forEach((i) => {
    o[i] ? n.systemProps[i] = e[i] : n.otherProps[i] = e[i];
  }), n;
};
function ul(e) {
  const {
    sx: t
  } = e, r = _e(e, H_), {
    systemProps: n,
    otherProps: o
  } = G_(r);
  let i;
  return Array.isArray(t) ? i = [n, ...t] : typeof t == "function" ? i = (...a) => {
    const l = t(...a);
    return Hr(l) ? C({}, n, l) : n;
  } : i = C({}, n, t), C({}, o, {
    sx: i
  });
}
function rg(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (r = rg(e[t])) && (n && (n += " "), n += r);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function Se() {
  for (var e, t, r = 0, n = ""; r < arguments.length; )
    (e = arguments[r++]) && (t = rg(e)) && (n && (n += " "), n += t);
  return n;
}
const Y_ = ["className", "component"];
function X_(e = {}) {
  const {
    themeId: t,
    defaultTheme: r,
    defaultClassName: n = "MuiBox-root",
    generateClassName: o
  } = e, i = Xy("div", {
    shouldForwardProp: (l) => l !== "theme" && l !== "sx" && l !== "as"
  })(al);
  return /* @__PURE__ */ P.forwardRef(function(c, u) {
    const d = cl(r), p = ul(c), {
      className: m,
      component: f = "div"
    } = p, y = _e(p, Y_);
    return /* @__PURE__ */ E.jsx(i, C({
      as: f,
      ref: u,
      className: Se(m, o ? o(n) : n),
      theme: t && d[t] || d
    }, y));
  });
}
const J_ = ["variant"];
function Pp(e) {
  return e.length === 0;
}
function ng(e) {
  const {
    variant: t
  } = e, r = _e(e, J_);
  let n = t || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? n += Pp(n) ? e[o] : xe(e[o]) : n += `${Pp(n) ? o : xe(o)}${xe(e[o].toString())}`;
  }), n;
}
const Z_ = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Q_(e) {
  return Object.keys(e).length === 0;
}
function eE(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const tE = (e, t) => t.components && t.components[e] && t.components[e].styleOverrides ? t.components[e].styleOverrides : null, ga = (e) => {
  const t = {};
  return e && e.forEach((r) => {
    const n = ng(r.props);
    t[n] = r.style;
  }), t;
}, rE = (e, t) => {
  let r = [];
  return t && t.components && t.components[e] && t.components[e].variants && (r = t.components[e].variants), ga(r);
}, va = (e, t, r) => {
  const {
    ownerState: n = {}
  } = e, o = [];
  return r && r.forEach((i) => {
    let a = !0;
    Object.keys(i.props).forEach((l) => {
      n[l] !== i.props[l] && e[l] !== i.props[l] && (a = !1);
    }), a && o.push(t[ng(i.props)]);
  }), o;
}, nE = (e, t, r, n) => {
  var o;
  const i = r == null || (o = r.components) == null || (o = o[n]) == null ? void 0 : o.variants;
  return va(e, t, i);
};
function ki(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const oE = ll(), Rp = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function ea({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return Q_(t) ? e : t[r] || t;
}
function iE(e) {
  return e ? (t, r) => r[e] : null;
}
const Ip = ({
  styledArg: e,
  props: t,
  defaultTheme: r,
  themeId: n
}) => {
  const o = e(C({}, t, {
    theme: ea(C({}, t, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  let i;
  if (o && o.variants && (i = o.variants, delete o.variants), i) {
    const a = va(t, ga(i), i);
    return [o, ...a];
  }
  return o;
};
function og(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = oE,
    rootShouldForwardProp: n = ki,
    slotShouldForwardProp: o = ki
  } = e, i = (a) => al(C({}, a, {
    theme: ea(C({}, a, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    KS(a, ($) => $.filter((b) => !(b != null && b.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: m = iE(Rp(u))
    } = l, f = _e(l, Z_), y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), h = p || !1;
    let g;
    process.env.NODE_ENV !== "production" && c && (g = `${c}-${Rp(u || "Root")}`);
    let v = ki;
    u === "Root" || u === "root" ? v = n : u ? v = o : eE(a) && (v = void 0);
    const S = Xy(a, C({
      shouldForwardProp: v,
      label: g
    }, f)), _ = ($, ...b) => {
      const x = b ? b.map((k) => {
        if (typeof k == "function" && k.__emotion_real !== k)
          return (K) => Ip({
            styledArg: k,
            props: K,
            defaultTheme: r,
            themeId: t
          });
        if (Hr(k)) {
          let K = k, U;
          return k && k.variants && (U = k.variants, delete K.variants, K = (H) => {
            let z = k;
            return va(H, ga(U), U).forEach((X) => {
              z = Ht(z, X);
            }), z;
          }), K;
        }
        return k;
      }) : [];
      let w = $;
      if (Hr($)) {
        let k;
        $ && $.variants && (k = $.variants, delete w.variants, w = (K) => {
          let U = $;
          return va(K, ga(k), k).forEach((z) => {
            U = Ht(U, z);
          }), U;
        });
      } else
        typeof $ == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        $.__emotion_real !== $ && (w = (k) => Ip({
          styledArg: $,
          props: k,
          defaultTheme: r,
          themeId: t
        }));
      c && m && x.push((k) => {
        const K = ea(C({}, k, {
          defaultTheme: r,
          themeId: t
        })), U = tE(c, K);
        if (U) {
          const H = {};
          return Object.entries(U).forEach(([z, G]) => {
            H[z] = typeof G == "function" ? G(C({}, k, {
              theme: K
            })) : G;
          }), m(k, H);
        }
        return null;
      }), c && !y && x.push((k) => {
        const K = ea(C({}, k, {
          defaultTheme: r,
          themeId: t
        }));
        return nE(k, rE(c, K), K, c);
      }), h || x.push(i);
      const A = x.length - b.length;
      if (Array.isArray($) && A > 0) {
        const k = new Array(A).fill("");
        w = [...$, ...k], w.raw = [...$.raw, ...k];
      }
      const j = S(w, ...x);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${xe(u || "")}`), k === void 0 && (k = `Styled(${d1(a)})`), j.displayName = k;
      }
      return a.muiName && (j.muiName = a.muiName), j;
    };
    return S.withConfig && (_.withConfig = S.withConfig), _;
  };
}
const sE = og(), aE = sE;
function lE(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : bu(t.components[r].defaultProps, n);
}
function ig({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = cl(r);
  return n && (o = o[n] || o), lE({
    theme: o,
    name: t,
    props: e
  });
}
function Au(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Math.min(Math.max(t, e), r);
}
function cE(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function qn(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return qn(cE(e));
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
function dl(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function uE(e) {
  e = qn(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, i = n * Math.min(o, 1 - o), a = (u, d = (u + r / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), dl({
    type: l,
    values: c
  });
}
function Np(e) {
  e = qn(e);
  let t = e.type === "hsl" || e.type === "hsla" ? qn(uE(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ap(e, t) {
  const r = Np(e), n = Np(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function Pt(e, t) {
  return e = qn(e), t = Au(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, dl(e);
}
function sg(e, t) {
  if (e = qn(e), t = Au(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return dl(e);
}
function ag(e, t) {
  if (e = qn(e), t = Au(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return dl(e);
}
const dE = ["component", "direction", "spacing", "divider", "children", "className", "useFlexGap"], fE = ll(), pE = aE("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (e, t) => t.root
});
function mE(e) {
  return ig({
    props: e,
    name: "MuiStack",
    defaultTheme: fE
  });
}
function hE(e, t) {
  const r = P.Children.toArray(e).filter(Boolean);
  return r.reduce((n, o, i) => (n.push(o), i < r.length - 1 && n.push(/* @__PURE__ */ P.cloneElement(t, {
    key: `separator-${i}`
  })), n), []);
}
const yE = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], gE = ({
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
        const m = u > 0 ? i[d[u - 1]] : "column";
        i[c] = m;
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
        [`margin${yE(u ? i[u] : e.direction)}`]: Wn(n, c)
      }
    }));
  }
  return r = QS(t.breakpoints, r), r;
};
function vE(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = pE,
    useThemeProps: r = mE,
    componentName: n = "MuiStack"
  } = e, o = () => Ve({
    root: ["root"]
  }, (c) => De(n, c), {}), i = t(gE), a = /* @__PURE__ */ P.forwardRef(function(c, u) {
    const d = r(c), p = ul(d), {
      component: m = "div",
      direction: f = "column",
      spacing: y = 0,
      divider: h,
      children: g,
      className: v,
      useFlexGap: S = !1
    } = p, _ = _e(p, dE), $ = {
      direction: f,
      spacing: y,
      useFlexGap: S
    }, b = o();
    return /* @__PURE__ */ E.jsx(i, C({
      as: m,
      ownerState: $,
      ref: u,
      className: Se(b.root, v)
    }, _, {
      children: h ? hE(g, h) : g
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
const cs = "$$material";
function bE(e, t) {
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
const $E = {
  black: "#000",
  white: "#fff"
}, Ji = $E, SE = {
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
}, _E = SE, EE = {
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
}, ao = EE, xE = {
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
}, lo = xE, wE = {
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
}, yi = wE, OE = {
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
}, co = OE, TE = {
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
}, uo = TE, CE = {
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
}, fo = CE, PE = ["mode", "contrastThreshold", "tonalOffset"], jp = {
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
    paper: Ji.white,
    default: Ji.white
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
    primary: Ji.white,
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
    active: Ji.white,
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
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = ag(e.main, o) : t === "dark" && (e.dark = sg(e.main, i)));
}
function RE(e = "light") {
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
function IE(e = "light") {
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
function NE(e = "light") {
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
function AE(e = "light") {
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
function jE(e = "light") {
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
function kE(e = "light") {
  return e === "dark" ? {
    main: yi[400],
    light: yi[300],
    dark: yi[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: yi[500],
    dark: yi[900]
  };
}
function ME(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = _e(e, PE), i = e.primary || RE(t), a = e.secondary || IE(t), l = e.error || NE(t), c = e.info || AE(t), u = e.success || jE(t), d = e.warning || kE(t);
  function p(h) {
    const g = Ap(h, nc.text.primary) >= r ? nc.text.primary : jp.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const v = Ap(h, g);
      v < 3 && console.error([`MUI: The contrast ratio of ${v}:1 for ${g} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const m = ({
    color: h,
    name: g,
    mainShade: v = 500,
    lightShade: S = 300,
    darkShade: _ = 700
  }) => {
    if (h = C({}, h), !h.main && h[v] && (h.main = h[v]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${v}\` property.` : vn(11, g ? ` (${g})` : "", v));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : vn(12, g ? ` (${g})` : "", JSON.stringify(h.main)));
    return kp(h, "light", S, n), kp(h, "dark", _, n), h.contrastText || (h.contrastText = p(h.main)), h;
  }, f = {
    dark: nc,
    light: jp
  };
  return process.env.NODE_ENV !== "production" && (f[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ht(C({
    // A collection of common colors.
    common: C({}, Ji),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: m({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: m({
      color: a,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: m({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: m({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: m({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: m({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: _E,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: m,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, f[t]), o);
}
const DE = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function FE(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Mp = {
  textTransform: "uppercase"
}, Dp = '"Roboto", "Helvetica", "Arial", sans-serif';
function LE(e, t) {
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
  } = r, m = _e(r, DE);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const f = o / 14, y = p || ((v) => `${v / u * f}rem`), h = (v, S, _, $, b) => C({
    fontFamily: n,
    fontWeight: v,
    fontSize: y(S),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: _
  }, n === Dp ? {
    letterSpacing: `${FE($ / S)}em`
  } : {}, b, d), g = {
    h1: h(i, 96, 1.167, -1.5),
    h2: h(i, 60, 1.2, -0.5),
    h3: h(a, 48, 1.167, 0),
    h4: h(a, 34, 1.235, 0.25),
    h5: h(a, 24, 1.334, 0),
    h6: h(l, 20, 1.6, 0.15),
    subtitle1: h(a, 16, 1.75, 0.15),
    subtitle2: h(l, 14, 1.57, 0.1),
    body1: h(a, 16, 1.5, 0.15),
    body2: h(a, 14, 1.43, 0.15),
    button: h(l, 14, 1.75, 0.4, Mp),
    caption: h(a, 12, 1.66, 0.4),
    overline: h(a, 12, 2.66, 1, Mp),
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
    pxToRem: y,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, g), m, {
    clone: !1
    // No need to clone deep
  });
}
const BE = 0.2, VE = 0.14, zE = 0.12;
function bt(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${BE})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${VE})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${zE})`].join(",");
}
const UE = ["none", bt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), bt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), bt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), bt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), bt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), bt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), bt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), bt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), bt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), bt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), bt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), bt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), bt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), bt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), bt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), bt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), bt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), bt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), bt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), bt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), bt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), bt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), bt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), bt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], WE = UE, qE = ["duration", "easing", "delay"], KE = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, HE = {
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
function GE(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function YE(e) {
  const t = C({}, KE, e.easing), r = C({}, HE, e.duration);
  return C({
    getAutoHeightDuration: GE,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = _e(i, qE);
      if (process.env.NODE_ENV !== "production") {
        const d = (m) => typeof m == "string", p = (m) => !isNaN(parseFloat(m));
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
const XE = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, JE = XE, ZE = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function lg(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = _e(e, ZE);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : vn(18));
  const l = ME(n), c = ll(e);
  let u = Ht(c, {
    mixins: bE(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: WE.slice(),
    typography: LE(l, i),
    transitions: YE(o),
    zIndex: C({}, JE)
  });
  if (u = Ht(u, a), u = t.reduce((d, p) => Ht(d, p), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (m, f) => {
      let y;
      for (y in m) {
        const h = m[y];
        if (d.indexOf(y) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = De("", y);
            console.error([`MUI: The \`${f}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(m, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          m[y] = {};
        }
      }
    };
    Object.keys(u.components).forEach((m) => {
      const f = u.components[m].styleOverrides;
      f && m.indexOf("Mui") === 0 && p(f, m);
    });
  }
  return u.unstable_sxConfig = C({}, sl, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(p) {
    return al({
      sx: p,
      theme: this
    });
  }, u;
}
const QE = lg(), fl = QE;
function Sn() {
  const e = cl(fl);
  return process.env.NODE_ENV !== "production" && P.useDebugValue(e), e[cs] || e;
}
function Ke({
  props: e,
  name: t
}) {
  return ig({
    props: e,
    name: t,
    defaultTheme: fl,
    themeId: cs
  });
}
const Gt = (e) => ki(e) && e !== "classes", ju = ki, ex = og({
  themeId: cs,
  defaultTheme: fl,
  rootShouldForwardProp: Gt
}), he = ex, tx = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Lp = tx, rx = Fe("MuiBox", ["root"]), nx = rx, ox = lg(), cg = X_({
  themeId: cs,
  defaultTheme: ox,
  defaultClassName: nx.root,
  generateClassName: $u.generate
});
process.env.NODE_ENV !== "production" && (cg.propTypes = {
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
const Vr = cg;
function Lr(e) {
  return typeof e == "string";
}
function ix(e, t, r) {
  return e === void 0 || Lr(e) ? t : C({}, t, {
    ownerState: C({}, t.ownerState, r)
  });
}
function sx(e, t, r = (n, o) => n === o) {
  return e.length === t.length && e.every((n, o) => r(n, t[o]));
}
function Mi(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function ax(e, t, r) {
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
function lx(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const f = Se(r == null ? void 0 : r.className, i, o == null ? void 0 : o.className, n == null ? void 0 : n.className), y = C({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), h = C({}, r, o, n);
    return f.length > 0 && (h.className = f), Object.keys(y).length > 0 && (h.style = y), {
      props: h,
      internalRef: void 0
    };
  }
  const a = Mi(C({}, o, n)), l = Bp(n), c = Bp(o), u = t(a), d = Se(u == null ? void 0 : u.className, r == null ? void 0 : r.className, i, o == null ? void 0 : o.className, n == null ? void 0 : n.className), p = C({}, u == null ? void 0 : u.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), m = C({}, u, r, c, l);
  return d.length > 0 && (m.className = d), Object.keys(p).length > 0 && (m.style = p), {
    props: m,
    internalRef: u.ref
  };
}
const cx = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Dt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = _e(e, cx), l = i ? {} : ax(n, o), {
    props: c,
    internalRef: u
  } = lx(C({}, a, {
    externalSlotProps: l
  })), d = Nt(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return ix(r, C({}, c, {
    ref: d
  }), o);
}
const ux = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function dx(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function fx(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function px(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || fx(e));
}
function mx(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(ux)).forEach((n, o) => {
    const i = dx(n);
    i === -1 || !px(n) || (i === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: i,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function hx() {
  return !0;
}
function ba(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = mx,
    isEnabled: a = hx,
    open: l
  } = e, c = P.useRef(!1), u = P.useRef(null), d = P.useRef(null), p = P.useRef(null), m = P.useRef(null), f = P.useRef(!1), y = P.useRef(null), h = Nt(t.ref, y), g = P.useRef(null);
  P.useEffect(() => {
    !l || !y.current || (f.current = !r);
  }, [r, l]), P.useEffect(() => {
    if (!l || !y.current)
      return;
    const _ = jt(y.current);
    return y.current.contains(_.activeElement) || (y.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), y.current.setAttribute("tabIndex", "-1")), f.current && y.current.focus()), () => {
      o || (p.current && p.current.focus && (c.current = !0, p.current.focus()), p.current = null);
    };
  }, [l]), P.useEffect(() => {
    if (!l || !y.current)
      return;
    const _ = jt(y.current), $ = (w) => {
      g.current = w, !(n || !a() || w.key !== "Tab") && _.activeElement === y.current && w.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, b = () => {
      const w = y.current;
      if (w === null)
        return;
      if (!_.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (w.contains(_.activeElement) || n && _.activeElement !== u.current && _.activeElement !== d.current)
        return;
      if (_.activeElement !== m.current)
        m.current = null;
      else if (m.current !== null)
        return;
      if (!f.current)
        return;
      let A = [];
      if ((_.activeElement === u.current || _.activeElement === d.current) && (A = i(y.current)), A.length > 0) {
        var j, k;
        const K = !!((j = g.current) != null && j.shiftKey && ((k = g.current) == null ? void 0 : k.key) === "Tab"), U = A[0], H = A[A.length - 1];
        typeof U != "string" && typeof H != "string" && (K ? H.focus() : U.focus());
      } else
        w.focus();
    };
    _.addEventListener("focusin", b), _.addEventListener("keydown", $, !0);
    const x = setInterval(() => {
      _.activeElement && _.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(x), _.removeEventListener("focusin", b), _.removeEventListener("keydown", $, !0);
    };
  }, [r, n, o, a, l, i]);
  const v = (_) => {
    p.current === null && (p.current = _.relatedTarget), f.current = !0, m.current = _.target;
    const $ = t.props.onFocus;
    $ && $(_);
  }, S = (_) => {
    p.current === null && (p.current = _.relatedTarget), f.current = !0;
  };
  return /* @__PURE__ */ E.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ E.jsx("div", {
      tabIndex: l ? 0 : -1,
      onFocus: S,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ P.cloneElement(t, {
      ref: h,
      onFocus: v
    }), /* @__PURE__ */ E.jsx("div", {
      tabIndex: l ? 0 : -1,
      onFocus: S,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (ba.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A single child content element.
   */
  children: Ua,
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
process.env.NODE_ENV !== "production" && (ba["propTypes"] = wy(ba.propTypes));
function yx(e) {
  return typeof e == "function" ? e() : e;
}
const $a = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = P.useState(null), c = Nt(/* @__PURE__ */ P.isValidElement(n) ? n.ref : null, r);
  if (gr(() => {
    i || l(yx(o) || document.body);
  }, [o, i]), gr(() => {
    if (a && !i)
      return pa(r, a), () => {
        pa(r, null);
      };
  }, [r, a, i]), i) {
    if (/* @__PURE__ */ P.isValidElement(n)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ P.cloneElement(n, u);
    }
    return /* @__PURE__ */ E.jsx(P.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ E.jsx(P.Fragment, {
    children: a && /* @__PURE__ */ vy.createPortal(n, a)
  });
});
process.env.NODE_ENV !== "production" && ($a.propTypes = {
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
  container: s.oneOfType([Ki, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && ($a["propTypes"] = wy($a.propTypes));
function gx(e) {
  const t = jt(e);
  return t.body === e ? Br(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Di(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Vp(e) {
  return parseInt(Br(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function vx(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function zp(e, t, r, n, o) {
  const i = [t, r, ...n];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !vx(a);
    l && c && Di(a, o);
  });
}
function oc(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function bx(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (gx(n)) {
      const a = Py(jt(n));
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
function $x(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class Sx {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Di(t.modalRef, !1);
    const o = $x(r);
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
    o.restore || (o.restore = bx(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = oc(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(n, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && Di(t.modalRef, r), zp(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && Di(a.modalRef, !1);
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
function Ex(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const xx = new Sx();
function wx(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = xx,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: p
  } = e, m = P.useRef({}), f = P.useRef(null), y = P.useRef(null), h = Nt(y, p), [g, v] = P.useState(!d), S = Ex(c);
  let _ = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (_ = !1);
  const $ = () => jt(f.current), b = () => (m.current.modalRef = y.current, m.current.mount = f.current, m.current), x = () => {
    o.mount(b(), {
      disableScrollLock: n
    }), y.current && (y.current.scrollTop = 0);
  }, w = sr(() => {
    const X = _x(t) || $().body;
    o.add(b(), X), y.current && x();
  }), A = P.useCallback(() => o.isTopModal(b()), [o]), j = sr((X) => {
    f.current = X, X && (d && A() ? x() : y.current && Di(y.current, _));
  }), k = P.useCallback(() => {
    o.remove(b(), _);
  }, [_, o]);
  P.useEffect(() => () => {
    k();
  }, [k]), P.useEffect(() => {
    d ? w() : (!S || !i) && k();
  }, [d, k, S, i, w]);
  const K = (X) => (J) => {
    var Z;
    (Z = X.onKeyDown) == null || Z.call(X, J), !(J.key !== "Escape" || J.which === 229 || // Wait until IME is settled.
    !A()) && (r || (J.stopPropagation(), u && u(J, "escapeKeyDown")));
  }, U = (X) => (J) => {
    var Z;
    (Z = X.onClick) == null || Z.call(X, J), J.target === J.currentTarget && u && u(J, "backdropClick");
  };
  return {
    getRootProps: (X = {}) => {
      const J = Mi(e);
      delete J.onTransitionEnter, delete J.onTransitionExited;
      const Z = C({}, J, X);
      return C({
        role: "presentation"
      }, Z, {
        onKeyDown: K(Z),
        ref: h
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
        onEnter: fa(X, c == null ? void 0 : c.props.onEnter),
        onExited: fa(J, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: h,
    portalRef: j,
    isTopModal: A,
    exited: g,
    hasTransition: S
  };
}
const Ox = 2;
function ug(e, t) {
  return e - t;
}
function gi(e, t, r) {
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
function Ns(e, t) {
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
function Sa(e, t, r) {
  return (e - t) * 100 / (r - t);
}
function Tx(e, t, r) {
  return (r - t) * e + t;
}
function Cx(e) {
  if (Math.abs(e) < 1) {
    const r = e.toExponential().split("e-"), n = r[0].split(".")[1];
    return (n ? n.length : 0) + parseInt(r[1], 10);
  }
  const t = e.toString().split(".")[1];
  return t ? t.length : 0;
}
function Px(e, t, r) {
  const n = Math.round((e - r) / t) * t + r;
  return Number(n.toFixed(Cx(t)));
}
function Wp({
  values: e,
  newValue: t,
  index: r
}) {
  const n = e.slice();
  return n[r] = t, n.sort(ug);
}
function As({
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
function js(e, t) {
  return typeof e == "number" && typeof t == "number" ? e === t : typeof e == "object" && typeof t == "object" ? sx(e, t) : !1;
}
const Rx = {
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
}, Ix = (e) => e;
let ks;
function ic() {
  return ks === void 0 && (typeof CSS < "u" && typeof CSS.supports == "function" ? ks = CSS.supports("touch-action", "none") : ks = !0), ks;
}
function Nx(e) {
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
    orientation: m = "horizontal",
    rootRef: f,
    scale: y = Ix,
    step: h = 1,
    tabIndex: g,
    value: v
  } = e, S = P.useRef(), [_, $] = P.useState(-1), [b, x] = P.useState(-1), [w, A] = P.useState(!1), j = P.useRef(0), [k, K] = Ro({
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
  }), H = Array.isArray(k);
  let z = H ? k.slice().sort(ug) : [k];
  z = z.map((le) => gi(le, c, l));
  const G = a === !0 && h !== null ? [...Array(Math.floor((l - c) / h) + 1)].map((le, ye) => ({
    value: c + h * ye
  })) : a || [], X = G.map((le) => le.value), {
    isFocusVisibleRef: J,
    onBlur: Z,
    onFocus: ne,
    ref: D
  } = vu(), [N, W] = P.useState(-1), F = P.useRef(), O = Nt(D, F), R = Nt(f, O), B = (le) => (ye) => {
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
  }, [n]), n && _ !== -1 && $(-1), n && N !== -1 && W(-1);
  const Y = (le) => (ye) => {
    var be;
    (be = le.onChange) == null || be.call(le, ye);
    const ge = Number(ye.currentTarget.getAttribute("data-index")), ue = z[ge], Ue = X.indexOf(ue);
    let Ie = ye.target.valueAsNumber;
    if (G && h == null) {
      const Ye = X[X.length - 1];
      Ie > Ye ? Ie = Ye : Ie < X[0] ? Ie = X[0] : Ie = Ie < ue ? X[Ue - 1] : X[Ue + 1];
    }
    if (Ie = gi(Ie, c, l), H) {
      o && (Ie = gi(Ie, z[ge - 1] || -1 / 0, z[ge + 1] || 1 / 0));
      const Ye = Ie;
      Ie = Wp({
        values: z,
        newValue: Ie,
        index: ge
      });
      let Je = ge;
      o || (Je = Ie.indexOf(Ye)), As({
        sliderRef: F,
        activeIndex: Je
      });
    }
    K(Ie), W(ge), U && !js(Ie, k) && U(ye, Ie, ge), p && p(ye, Ie);
  }, oe = P.useRef();
  let ie = m;
  i && m === "horizontal" && (ie += "-reverse");
  const ce = ({
    finger: le,
    move: ye = !1
  }) => {
    const {
      current: be
    } = F, {
      width: ge,
      height: ue,
      bottom: Ue,
      left: Ie
    } = be.getBoundingClientRect();
    let Ye;
    ie.indexOf("vertical") === 0 ? Ye = (Ue - le.y) / ue : Ye = (le.x - Ie) / ge, ie.indexOf("-reverse") !== -1 && (Ye = 1 - Ye);
    let Je;
    if (Je = Tx(Ye, c, l), h)
      Je = Px(Je, h, c);
    else {
      const re = Up(X, Je);
      Je = X[re];
    }
    Je = gi(Je, c, l);
    let Tt = 0;
    if (H) {
      ye ? Tt = oe.current : Tt = Up(z, Je), o && (Je = gi(Je, z[Tt - 1] || -1 / 0, z[Tt + 1] || 1 / 0));
      const re = Je;
      Je = Wp({
        values: z,
        newValue: Je,
        index: Tt
      }), o && ye || (Tt = Je.indexOf(re), oe.current = Tt);
    }
    return {
      newValue: Je,
      activeIndex: Tt
    };
  }, q = sr((le) => {
    const ye = Ns(le, S);
    if (!ye)
      return;
    if (j.current += 1, le.type === "mousemove" && le.buttons === 0) {
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
    As({
      sliderRef: F,
      activeIndex: ge,
      setActive: $
    }), K(be), !w && j.current > Ox && A(!0), U && !js(be, k) && U(le, be, ge);
  }), pe = sr((le) => {
    const ye = Ns(le, S);
    if (A(!1), !ye)
      return;
    const {
      newValue: be
    } = ce({
      finger: ye,
      move: !0
    });
    $(-1), le.type === "touchend" && x(-1), p && p(le, be), S.current = void 0, fe();
  }), te = sr((le) => {
    if (n)
      return;
    ic() || le.preventDefault();
    const ye = le.changedTouches[0];
    ye != null && (S.current = ye.identifier);
    const be = Ns(le, S);
    if (be !== !1) {
      const {
        newValue: ue,
        activeIndex: Ue
      } = ce({
        finger: be
      });
      As({
        sliderRef: F,
        activeIndex: Ue,
        setActive: $
      }), K(ue), U && !js(ue, k) && U(le, ue, Ue);
    }
    j.current = 0;
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
    const ge = Ns(ye, S);
    if (ge !== !1) {
      const {
        newValue: Ue,
        activeIndex: Ie
      } = ce({
        finger: ge
      });
      As({
        sliderRef: F,
        activeIndex: Ie,
        setActive: $
      }), K(Ue), U && !js(Ue, k) && U(ye, Ue, Ie);
    }
    j.current = 0;
    const ue = jt(F.current);
    ue.addEventListener("mousemove", q), ue.addEventListener("mouseup", pe);
  }, Ae = Sa(H ? z[0] : c, c, l), Be = Sa(z[z.length - 1], c, l) - Ae, st = (le = {}) => {
    const ye = Mi(le), be = {
      onMouseDown: Pe(ye || {})
    }, ge = C({}, ye, be);
    return C({}, le, {
      ref: R
    }, ge);
  }, je = (le) => (ye) => {
    var be;
    (be = le.onMouseOver) == null || be.call(le, ye);
    const ge = Number(ye.currentTarget.getAttribute("data-index"));
    x(ge);
  }, Me = (le) => (ye) => {
    var be;
    (be = le.onMouseLeave) == null || be.call(le, ye), x(-1);
  };
  return {
    active: _,
    axis: ie,
    axisProps: Rx,
    dragging: w,
    focusedThumbIndex: N,
    getHiddenInputProps: (le = {}) => {
      var ye;
      const be = Mi(le), ge = {
        onChange: Y(be || {}),
        onFocus: B(be || {}),
        onBlur: Q(be || {})
      }, ue = C({}, be, ge);
      return C({
        tabIndex: g,
        "aria-labelledby": t,
        "aria-orientation": m,
        "aria-valuemax": y(l),
        "aria-valuemin": y(c),
        name: u,
        type: "range",
        min: e.min,
        max: e.max,
        step: e.step === null && e.marks ? "any" : (ye = e.step) != null ? ye : void 0,
        disabled: n
      }, le, ue, {
        style: C({}, x1, {
          direction: i ? "rtl" : "ltr",
          // So that VoiceOver's focus indicator matches the thumb's dimensions
          width: "100%",
          height: "100%"
        })
      });
    },
    getRootProps: st,
    getThumbProps: (le = {}) => {
      const ye = Mi(le), be = {
        onMouseOver: je(ye || {}),
        onMouseLeave: Me(ye || {})
      };
      return C({}, le, ye, be);
    },
    marks: G,
    open: b,
    range: H,
    rootRef: R,
    trackLeap: Be,
    trackOffset: Ae,
    values: z,
    getThumbStyle: (le) => ({
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: _ !== -1 && _ !== le ? "none" : void 0
    })
  };
}
const Ax = ["onChange", "maxRows", "minRows", "style", "value"];
function Ms(e) {
  return parseInt(e, 10) || 0;
}
const jx = {
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
const dg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    onChange: n,
    maxRows: o,
    minRows: i = 1,
    style: a,
    value: l
  } = t, c = _e(t, Ax), {
    current: u
  } = P.useRef(l != null), d = P.useRef(null), p = Nt(r, d), m = P.useRef(null), f = P.useRef(0), [y, h] = P.useState({
    outerHeightStyle: 0
  }), g = P.useCallback(() => {
    const $ = d.current, x = Br($).getComputedStyle($);
    if (x.width === "0px")
      return {
        outerHeightStyle: 0
      };
    const w = m.current;
    w.style.width = x.width, w.value = $.value || t.placeholder || "x", w.value.slice(-1) === `
` && (w.value += " ");
    const A = x.boxSizing, j = Ms(x.paddingBottom) + Ms(x.paddingTop), k = Ms(x.borderBottomWidth) + Ms(x.borderTopWidth), K = w.scrollHeight;
    w.value = "x";
    const U = w.scrollHeight;
    let H = K;
    i && (H = Math.max(Number(i) * U, H)), o && (H = Math.min(Number(o) * U, H)), H = Math.max(H, U);
    const z = H + (A === "border-box" ? j + k : 0), G = Math.abs(H - K) <= 1;
    return {
      outerHeightStyle: z,
      overflow: G
    };
  }, [o, i, t.placeholder]), v = ($, b) => {
    const {
      outerHeightStyle: x,
      overflow: w
    } = b;
    return f.current < 20 && (x > 0 && Math.abs(($.outerHeightStyle || 0) - x) > 1 || $.overflow !== w) ? (f.current += 1, {
      overflow: w,
      outerHeightStyle: x
    }) : (process.env.NODE_ENV !== "production" && f.current === 20 && console.error(["MUI: Too many re-renders. The layout is unstable.", "TextareaAutosize limits the number of renders to prevent an infinite loop."].join(`
`)), $);
  }, S = P.useCallback(() => {
    const $ = g();
    qp($) || h((b) => v(b, $));
  }, [g]);
  gr(() => {
    const $ = () => {
      const U = g();
      qp(U) || vy.flushSync(() => {
        h((H) => v(H, U));
      });
    }, b = () => {
      f.current = 0, $();
    };
    let x;
    const w = () => {
      cancelAnimationFrame(x), x = requestAnimationFrame(() => {
        b();
      });
    }, A = ss(b), j = d.current, k = Br(j);
    k.addEventListener("resize", A);
    let K;
    return typeof ResizeObserver < "u" && (K = new ResizeObserver(process.env.NODE_ENV === "test" ? w : b), K.observe(j)), () => {
      A.clear(), cancelAnimationFrame(x), k.removeEventListener("resize", A), K && K.disconnect();
    };
  }, [g]), gr(() => {
    S();
  }), P.useEffect(() => {
    f.current = 0;
  }, [l]);
  const _ = ($) => {
    f.current = 0, u || S(), n && n($);
  };
  return /* @__PURE__ */ E.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ E.jsx("textarea", C({
      value: l,
      onChange: _,
      ref: p,
      rows: i,
      style: C({
        height: y.outerHeightStyle,
        // Need a large enough difference to allow scrolling.
        // This prevents infinite rendering loop.
        overflow: y.overflow ? "hidden" : void 0
      }, a)
    }, c)), /* @__PURE__ */ E.jsx("textarea", {
      "aria-hidden": !0,
      className: t.className,
      readOnly: !0,
      ref: m,
      tabIndex: -1,
      style: C({}, jx.shadow, a, {
        paddingTop: 0,
        paddingBottom: 0
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (dg.propTypes = {
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
function kx(e) {
  return (1 + Math.sin(Math.PI * e - Math.PI / 2)) / 2;
}
function Mx(e, t, r, n = {}, o = () => {
}) {
  const {
    ease: i = kx,
    duration: a = 300
    // standard
  } = n;
  let l = null;
  const c = t[e];
  let u = !1;
  const d = () => {
    u = !0;
  }, p = (m) => {
    if (u) {
      o(new Error("Animation cancelled"));
      return;
    }
    l === null && (l = m);
    const f = Math.min(1, (m - l) / a);
    if (t[e] = i(f) * (r - c) + c, f >= 1) {
      requestAnimationFrame(() => {
        o(null);
      });
      return;
    }
    requestAnimationFrame(p);
  };
  return c === r ? (o(new Error("Element already at target position")), d) : (requestAnimationFrame(p), d);
}
function Dx(e) {
  return De("MuiSvgIcon", e);
}
Fe("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Fx = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Lx = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${xe(t)}`, `fontSize${xe(r)}`]
  };
  return Ve(o, Dx, n);
}, Bx = he("svg", {
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
  var r, n, o, i, a, l, c, u, d, p, m, f, y;
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
    color: (p = (m = (e.vars || e).palette) == null || (m = m[t.color]) == null ? void 0 : m.main) != null ? p : {
      action: (f = (e.vars || e).palette) == null || (f = f.action) == null ? void 0 : f.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[t.color]
  };
}), ku = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    viewBox: m = "0 0 24 24"
  } = n, f = _e(n, Fx), y = /* @__PURE__ */ P.isValidElement(o) && o.type === "svg", h = C({}, n, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: m,
    hasSvgAsChild: y
  }), g = {};
  d || (g.viewBox = m);
  const v = Lx(h);
  return /* @__PURE__ */ E.jsxs(Bx, C({
    as: l,
    className: Se(v.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: r
  }, g, f, y && o.props, {
    ownerState: h,
    children: [y ? o.props.children : o, p ? /* @__PURE__ */ E.jsx("title", {
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
    return /* @__PURE__ */ E.jsx(Kp, C({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Kp.muiName, /* @__PURE__ */ P.memo(/* @__PURE__ */ P.forwardRef(r));
}
const Vx = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), $u.configure(e);
  }
}, zx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: xe,
  createChainedFunction: fa,
  createSvgIcon: en,
  debounce: ss,
  deprecatedPropType: p1,
  isMuiElement: Eo,
  ownerDocument: jt,
  ownerWindow: Br,
  requirePropFactory: Ty,
  setRef: pa,
  unstable_ClassNameGenerator: Vx,
  unstable_useEnhancedEffect: gr,
  unstable_useId: Hi,
  unsupportedProp: Cy,
  useControlled: Ro,
  useEventCallback: sr,
  useForkRef: Nt,
  useIsFocusVisible: vu
}, Symbol.toStringTag, { value: "Module" })), Ux = ["onChange"], Wx = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll"
};
function fg(e) {
  const {
    onChange: t
  } = e, r = _e(e, Ux), n = P.useRef(), o = P.useRef(null), i = () => {
    n.current = o.current.offsetHeight - o.current.clientHeight;
  };
  return gr(() => {
    const a = ss(() => {
      const c = n.current;
      i(), c !== n.current && t(n.current);
    }), l = Br(o.current);
    return l.addEventListener("resize", a), () => {
      a.clear(), l.removeEventListener("resize", a);
    };
  }, [t]), P.useEffect(() => {
    i(), t(n.current);
  }, [t]), /* @__PURE__ */ E.jsx("div", C({
    style: Wx,
    ref: o
  }, r));
}
process.env.NODE_ENV !== "production" && (fg.propTypes = {
  onChange: s.func.isRequired
});
const qx = en(/* @__PURE__ */ E.jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), "KeyboardArrowLeft"), Kx = en(/* @__PURE__ */ E.jsx("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), "KeyboardArrowRight");
function zc(e, t) {
  return zc = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, zc(e, t);
}
function pg(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, zc(e, t);
}
const Hp = {
  disabled: !1
};
var Hx = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const _a = hr.createContext(null);
var Gx = function(t) {
  return t.scrollTop;
}, Ii = "unmounted", An = "exited", jn = "entering", vo = "entered", Uc = "exiting", tn = /* @__PURE__ */ function(e) {
  pg(t, e);
  function t(n, o) {
    var i;
    i = e.call(this, n, o) || this;
    var a = o, l = a && !a.isMounting ? n.enter : n.appear, c;
    return i.appearStatus = null, n.in ? l ? (c = An, i.appearStatus = jn) : c = vo : n.unmountOnExit || n.mountOnEnter ? c = Ii : c = An, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === Ii ? {
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
      this.props.in ? a !== jn && a !== vo && (i = jn) : (a === jn || a === vo) && (i = Uc);
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
          var a = this.props.nodeRef ? this.props.nodeRef.current : Ps.findDOMNode(this);
          a && Gx(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === An && this.setState({
        status: Ii
      });
  }, r.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Ps.findDOMNode(this), l], u = c[0], d = c[1], p = this.getTimeouts(), m = l ? p.appear : p.enter;
    if (!o && !a || Hp.disabled) {
      this.safeSetState({
        status: vo
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: jn
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(m, function() {
        i.safeSetState({
          status: vo
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Ps.findDOMNode(this);
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
    var a = this.props.nodeRef ? this.props.nodeRef.current : Ps.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === Ii)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = _e(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ hr.createElement(_a.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : hr.cloneElement(hr.Children.only(a), l))
    );
  }, t;
}(hr.Component);
tn.contextType = _a;
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
    var r = Hx;
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
tn.UNMOUNTED = Ii;
tn.EXITED = An;
tn.ENTERING = jn;
tn.ENTERED = vo;
tn.EXITING = Uc;
const mg = tn;
function Yx(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Mu(e, t) {
  var r = function(i) {
    return t && Ys(i) ? t(i) : i;
  }, n = /* @__PURE__ */ Object.create(null);
  return e && k$.map(e, function(o) {
    return o;
  }).forEach(function(o) {
    n[o.key] = r(o);
  }), n;
}
function Xx(e, t) {
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
function Jx(e, t) {
  return Mu(e.children, function(r) {
    return Xs(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: Vn(r, "appear", e),
      enter: Vn(r, "enter", e),
      exit: Vn(r, "exit", e)
    });
  });
}
function Zx(e, t, r) {
  var n = Mu(e.children), o = Xx(t, n);
  return Object.keys(o).forEach(function(i) {
    var a = o[i];
    if (Ys(a)) {
      var l = i in t, c = i in n, u = t[i], d = Ys(u) && !u.props.in;
      c && (!l || d) ? o[i] = Xs(a, {
        onExited: r.bind(null, a),
        in: !0,
        exit: Vn(a, "exit", e),
        enter: Vn(a, "enter", e)
      }) : !c && l && !d ? o[i] = Xs(a, {
        in: !1
      }) : c && l && Ys(u) && (o[i] = Xs(a, {
        onExited: r.bind(null, a),
        in: u.props.in,
        exit: Vn(a, "exit", e),
        enter: Vn(a, "enter", e)
      }));
    }
  }), o;
}
var Qx = Object.values || function(e) {
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}, ew = {
  component: "div",
  childFactory: function(t) {
    return t;
  }
}, Du = /* @__PURE__ */ function(e) {
  pg(t, e);
  function t(n, o) {
    var i;
    i = e.call(this, n, o) || this;
    var a = i.handleExited.bind(Yx(i));
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
      children: c ? Jx(o, l) : Zx(o, a, l),
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
    var o = this.props, i = o.component, a = o.childFactory, l = _e(o, ["component", "childFactory"]), c = this.state.contextValue, u = Qx(this.state.children).map(a);
    return delete l.appear, delete l.enter, delete l.exit, i === null ? /* @__PURE__ */ hr.createElement(_a.Provider, {
      value: c
    }, u) : /* @__PURE__ */ hr.createElement(_a.Provider, {
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
Du.defaultProps = ew;
const tw = Du;
function hg(e) {
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
  } = e, [d, p] = P.useState(!1), m = Se(t, r.ripple, r.rippleVisible, n && r.ripplePulsate), f = {
    width: a,
    height: a,
    top: -(a / 2) + i,
    left: -(a / 2) + o
  }, y = Se(r.child, d && r.childLeaving, n && r.childPulsate);
  return !l && !d && p(!0), P.useEffect(() => {
    if (!l && c != null) {
      const h = setTimeout(c, u);
      return () => {
        clearTimeout(h);
      };
    }
  }, [c, l, u]), /* @__PURE__ */ E.jsx("span", {
    className: m,
    style: f,
    children: /* @__PURE__ */ E.jsx("span", {
      className: y
    })
  });
}
process.env.NODE_ENV !== "production" && (hg.propTypes = {
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
const rw = Fe("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), fr = rw, nw = ["center", "classes", "className"];
let pl = (e) => e, Gp, Yp, Xp, Jp;
const Wc = 550, ow = 80, iw = Pu(Gp || (Gp = pl`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), sw = Pu(Yp || (Yp = pl`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), aw = Pu(Xp || (Xp = pl`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), lw = he("span", {
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
}), cw = he(hg, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(Jp || (Jp = pl`
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
`), fr.rippleVisible, iw, Wc, ({
  theme: e
}) => e.transitions.easing.easeInOut, fr.ripplePulsate, ({
  theme: e
}) => e.transitions.duration.shorter, fr.child, fr.childLeaving, sw, Wc, ({
  theme: e
}) => e.transitions.easing.easeInOut, fr.childPulsate, aw, ({
  theme: e
}) => e.transitions.easing.easeInOut), yg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiTouchRipple"
  }), {
    center: o = !1,
    classes: i = {},
    className: a
  } = n, l = _e(n, nw), [c, u] = P.useState([]), d = P.useRef(0), p = P.useRef(null);
  P.useEffect(() => {
    p.current && (p.current(), p.current = null);
  }, [c]);
  const m = P.useRef(!1), f = P.useRef(0), y = P.useRef(null), h = P.useRef(null);
  P.useEffect(() => () => {
    f.current && clearTimeout(f.current);
  }, []);
  const g = P.useCallback(($) => {
    const {
      pulsate: b,
      rippleX: x,
      rippleY: w,
      rippleSize: A,
      cb: j
    } = $;
    u((k) => [...k, /* @__PURE__ */ E.jsx(cw, {
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
    }, d.current)]), d.current += 1, p.current = j;
  }, [i]), v = P.useCallback(($ = {}, b = {}, x = () => {
  }) => {
    const {
      pulsate: w = !1,
      center: A = o || b.pulsate,
      fakeElement: j = !1
      // For test purposes
    } = b;
    if (($ == null ? void 0 : $.type) === "mousedown" && m.current) {
      m.current = !1;
      return;
    }
    ($ == null ? void 0 : $.type) === "touchstart" && (m.current = !0);
    const k = j ? null : h.current, K = k ? k.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let U, H, z;
    if (A || $ === void 0 || $.clientX === 0 && $.clientY === 0 || !$.clientX && !$.touches)
      U = Math.round(K.width / 2), H = Math.round(K.height / 2);
    else {
      const {
        clientX: G,
        clientY: X
      } = $.touches && $.touches.length > 0 ? $.touches[0] : $;
      U = Math.round(G - K.left), H = Math.round(X - K.top);
    }
    if (A)
      z = Math.sqrt((2 * K.width ** 2 + K.height ** 2) / 3), z % 2 === 0 && (z += 1);
    else {
      const G = Math.max(Math.abs((k ? k.clientWidth : 0) - U), U) * 2 + 2, X = Math.max(Math.abs((k ? k.clientHeight : 0) - H), H) * 2 + 2;
      z = Math.sqrt(G ** 2 + X ** 2);
    }
    $ != null && $.touches ? y.current === null && (y.current = () => {
      g({
        pulsate: w,
        rippleX: U,
        rippleY: H,
        rippleSize: z,
        cb: x
      });
    }, f.current = setTimeout(() => {
      y.current && (y.current(), y.current = null);
    }, ow)) : g({
      pulsate: w,
      rippleX: U,
      rippleY: H,
      rippleSize: z,
      cb: x
    });
  }, [o, g]), S = P.useCallback(() => {
    v({}, {
      pulsate: !0
    });
  }, [v]), _ = P.useCallback(($, b) => {
    if (clearTimeout(f.current), ($ == null ? void 0 : $.type) === "touchend" && y.current) {
      y.current(), y.current = null, f.current = setTimeout(() => {
        _($, b);
      });
      return;
    }
    y.current = null, u((x) => x.length > 0 ? x.slice(1) : x), p.current = b;
  }, []);
  return P.useImperativeHandle(r, () => ({
    pulsate: S,
    start: v,
    stop: _
  }), [S, v, _]), /* @__PURE__ */ E.jsx(lw, C({
    className: Se(fr.root, i.root, a),
    ref: h
  }, l, {
    children: /* @__PURE__ */ E.jsx(tw, {
      component: null,
      exit: !0,
      children: c
    })
  }));
});
process.env.NODE_ENV !== "production" && (yg.propTypes = {
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
const uw = yg;
function dw(e) {
  return De("MuiButtonBase", e);
}
const fw = Fe("MuiButtonBase", ["root", "disabled", "focusVisible"]), pw = fw, mw = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"], hw = (e) => {
  const {
    disabled: t,
    focusVisible: r,
    focusVisibleClassName: n,
    classes: o
  } = e, a = Ve({
    root: ["root", t && "disabled", r && "focusVisible"]
  }, dw, o);
  return r && n && (a.root += ` ${n}`), a;
}, yw = he("button", {
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
  [`&.${pw.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), gg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    focusRipple: m = !1,
    LinkComponent: f = "a",
    onBlur: y,
    onClick: h,
    onContextMenu: g,
    onDragLeave: v,
    onFocus: S,
    onFocusVisible: _,
    onKeyDown: $,
    onKeyUp: b,
    onMouseDown: x,
    onMouseLeave: w,
    onMouseUp: A,
    onTouchEnd: j,
    onTouchMove: k,
    onTouchStart: K,
    tabIndex: U = 0,
    TouchRippleProps: H,
    touchRippleRef: z,
    type: G
  } = n, X = _e(n, mw), J = P.useRef(null), Z = P.useRef(null), ne = Nt(Z, z), {
    isFocusVisibleRef: D,
    onFocus: N,
    onBlur: W,
    ref: F
  } = vu(), [O, R] = P.useState(!1);
  u && O && R(!1), P.useImperativeHandle(o, () => ({
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
    O && m && !d && B && Z.current.pulsate();
  }, [d, m, O, B]);
  function oe(ue, Ue, Ie = p) {
    return sr((Ye) => (Ue && Ue(Ye), !Ie && Z.current && Z.current[ue](Ye), !0));
  }
  const ie = oe("start", x), ce = oe("stop", g), q = oe("stop", v), pe = oe("stop", A), te = oe("stop", (ue) => {
    O && ue.preventDefault(), w && w(ue);
  }), fe = oe("start", K), Pe = oe("stop", j), Ae = oe("stop", k), Be = oe("stop", (ue) => {
    W(ue), D.current === !1 && R(!1), y && y(ue);
  }, !1), st = sr((ue) => {
    J.current || (J.current = ue.currentTarget), N(ue), D.current === !0 && (R(!0), _ && _(ue)), S && S(ue);
  }), je = () => {
    const ue = J.current;
    return c && c !== "button" && !(ue.tagName === "A" && ue.href);
  }, Me = P.useRef(!1), Qe = sr((ue) => {
    m && !Me.current && O && Z.current && ue.key === " " && (Me.current = !0, Z.current.stop(ue, () => {
      Z.current.start(ue);
    })), ue.target === ue.currentTarget && je() && ue.key === " " && ue.preventDefault(), $ && $(ue), ue.target === ue.currentTarget && je() && ue.key === "Enter" && !u && (ue.preventDefault(), h && h(ue));
  }), He = sr((ue) => {
    m && ue.key === " " && Z.current && O && !ue.defaultPrevented && (Me.current = !1, Z.current.stop(ue, () => {
      Z.current.pulsate(ue);
    })), b && b(ue), h && ue.target === ue.currentTarget && je() && ue.key === " " && !ue.defaultPrevented && h(ue);
  });
  let ze = c;
  ze === "button" && (X.href || X.to) && (ze = f);
  const le = {};
  ze === "button" ? (le.type = G === void 0 ? "button" : G, le.disabled = u) : (!X.href && !X.to && (le.role = "button"), u && (le["aria-disabled"] = u));
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
    focusRipple: m,
    tabIndex: U,
    focusVisible: O
  }), ge = hw(be);
  return /* @__PURE__ */ E.jsxs(yw, C({
    as: ze,
    className: Se(ge.root, l),
    ownerState: be,
    onBlur: Be,
    onClick: h,
    onContextMenu: ce,
    onFocus: st,
    onKeyDown: Qe,
    onKeyUp: He,
    onMouseDown: ie,
    onMouseLeave: te,
    onMouseUp: pe,
    onDragLeave: q,
    onTouchEnd: Pe,
    onTouchMove: Ae,
    onTouchStart: fe,
    ref: ye,
    tabIndex: u ? -1 : U,
    type: G
  }, le, X, {
    children: [a, Y ? (
      /* TouchRipple is only needed client-side, x2 boost on the server. */
      /* @__PURE__ */ E.jsx(uw, C({
        ref: ne,
        center: i
      }, H))
    ) : null]
  }));
});
process.env.NODE_ENV !== "production" && (gg.propTypes = {
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
  component: Wa,
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
const Xn = gg;
function gw(e) {
  return De("MuiTabScrollButton", e);
}
const vw = Fe("MuiTabScrollButton", ["root", "vertical", "horizontal", "disabled"]), bw = vw, $w = ["className", "slots", "slotProps", "direction", "orientation", "disabled"], Sw = (e) => {
  const {
    classes: t,
    orientation: r,
    disabled: n
  } = e;
  return Ve({
    root: ["root", r, n && "disabled"]
  }, gw, t);
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
  [`&.${bw.disabled}`]: {
    opacity: 0
  }
}, e.orientation === "vertical" && {
  width: "100%",
  height: 40,
  "& svg": {
    transform: `rotate(${e.isRtl ? -90 : 90}deg)`
  }
})), vg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = Ke({
    props: t,
    name: "MuiTabScrollButton"
  }), {
    className: a,
    slots: l = {},
    slotProps: c = {},
    direction: u
  } = i, d = _e(i, $w), m = Sn().direction === "rtl", f = C({
    isRtl: m
  }, i), y = Sw(f), h = (n = l.StartScrollButtonIcon) != null ? n : qx, g = (o = l.EndScrollButtonIcon) != null ? o : Kx, v = Dt({
    elementType: h,
    externalSlotProps: c.startScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: f
  }), S = Dt({
    elementType: g,
    externalSlotProps: c.endScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState: f
  });
  return /* @__PURE__ */ E.jsx(_w, C({
    component: "div",
    className: Se(y.root, a),
    ref: r,
    role: null,
    ownerState: f,
    tabIndex: null
  }, d, {
    children: u === "left" ? /* @__PURE__ */ E.jsx(h, C({}, v)) : /* @__PURE__ */ E.jsx(g, C({}, S))
  }));
});
process.env.NODE_ENV !== "production" && (vg.propTypes = {
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
const Ew = vg;
function xw(e) {
  return De("MuiTabs", e);
}
const ww = Fe("MuiTabs", ["root", "vertical", "flexContainer", "flexContainerVertical", "centered", "scroller", "fixed", "scrollableX", "scrollableY", "hideScrollbar", "scrollButtons", "scrollButtonsHideMobile", "indicator"]), sc = ww, Ow = ["aria-label", "aria-labelledby", "action", "centered", "children", "className", "component", "allowScrollButtonsMobile", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "slots", "slotProps", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant", "visibleScrollbar"], Zp = (e, t) => e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : e.firstChild, Qp = (e, t) => e === t ? e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : e.lastChild, Ds = (e, t, r) => {
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
}, Tw = (e) => {
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
  return Ve({
    root: ["root", t && "vertical"],
    scroller: ["scroller", r && "fixed", n && "hideScrollbar", o && "scrollableX", i && "scrollableY"],
    flexContainer: ["flexContainer", t && "flexContainerVertical", a && "centered"],
    indicator: ["indicator"],
    scrollButtons: ["scrollButtons", l && "scrollButtonsHideMobile"],
    scrollableX: [o && "scrollableX"],
    hideScrollbar: [n && "hideScrollbar"]
  }, xw, c);
}, Cw = he("div", {
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
})), Pw = he("div", {
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
})), Rw = he("div", {
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
})), Iw = he("span", {
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
})), Nw = he(fg)({
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
const bg = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiTabs"
  }), o = Sn(), i = o.direction === "rtl", {
    "aria-label": a,
    "aria-labelledby": l,
    action: c,
    centered: u = !1,
    children: d,
    className: p,
    component: m = "div",
    allowScrollButtonsMobile: f = !1,
    indicatorColor: y = "primary",
    onChange: h,
    orientation: g = "horizontal",
    ScrollButtonComponent: v = Ew,
    scrollButtons: S = "auto",
    selectionFollowsFocus: _,
    slots: $ = {},
    slotProps: b = {},
    TabIndicatorProps: x = {},
    TabScrollButtonProps: w = {},
    textColor: A = "primary",
    value: j,
    variant: k = "standard",
    visibleScrollbar: K = !1
  } = n, U = _e(n, Ow), H = k === "scrollable", z = g === "vertical", G = z ? "scrollTop" : "scrollLeft", X = z ? "top" : "left", J = z ? "bottom" : "right", Z = z ? "clientHeight" : "clientWidth", ne = z ? "height" : "width", D = C({}, n, {
    component: m,
    allowScrollButtonsMobile: f,
    indicatorColor: y,
    orientation: g,
    vertical: z,
    scrollButtons: S,
    textColor: A,
    variant: k,
    visibleScrollbar: K,
    fixed: !H,
    hideScrollbar: H && !K,
    scrollableX: H && !z,
    scrollableY: H && z,
    centered: u && !H,
    scrollButtonsHideMobile: !f
  }), N = Tw(D), W = Dt({
    elementType: $.StartScrollButtonIcon,
    externalSlotProps: b.startScrollButtonIcon,
    ownerState: D
  }), F = Dt({
    elementType: $.EndScrollButtonIcon,
    externalSlotProps: b.endScrollButtonIcon,
    ownerState: D
  });
  process.env.NODE_ENV !== "production" && u && H && console.error('MUI: You can not use the `centered={true}` and `variant="scrollable"` properties at the same time on a `Tabs` component.');
  const [O, R] = P.useState(!1), [B, Q] = P.useState(em), [Y, oe] = P.useState(!1), [ie, ce] = P.useState(!1), [q, pe] = P.useState(!1), [te, fe] = P.useState({
    overflow: "hidden",
    scrollbarWidth: 0
  }), Pe = /* @__PURE__ */ new Map(), Ae = P.useRef(null), Be = P.useRef(null), st = () => {
    const re = Ae.current;
    let se;
    if (re) {
      const Ne = re.getBoundingClientRect();
      se = {
        clientWidth: re.clientWidth,
        scrollLeft: re.scrollLeft,
        scrollTop: re.scrollTop,
        scrollLeftNormalized: _1(re, o.direction),
        scrollWidth: re.scrollWidth,
        top: Ne.top,
        bottom: Ne.bottom,
        left: Ne.left,
        right: Ne.right
      };
    }
    let $e;
    if (re && j !== !1) {
      const Ne = Be.current.children;
      if (Ne.length > 0) {
        const et = Ne[Pe.get(j)];
        process.env.NODE_ENV !== "production" && (et || console.error(["MUI: The `value` provided to the Tabs component is invalid.", `None of the Tabs' children match with "${j}".`, Pe.keys ? `You can provide one of the following values: ${Array.from(Pe.keys()).join(", ")}.` : null].join(`
`))), $e = et ? et.getBoundingClientRect() : null, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && !tm && $e && $e.width === 0 && $e.height === 0 && // if the whole Tabs component is hidden, don't warn
        se.clientWidth !== 0 && (se = null, console.error(["MUI: The `value` provided to the Tabs component is invalid.", `The Tab with this \`value\` ("${j}") is not part of the document layout.`, "Make sure the tab item is present in the document or that it's not `display: none`."].join(`
`)), tm = !0);
      }
    }
    return {
      tabsMeta: se,
      tabMeta: $e
    };
  }, je = sr(() => {
    const {
      tabsMeta: re,
      tabMeta: se
    } = st();
    let $e = 0, Ne;
    if (z)
      Ne = "top", se && re && ($e = se.top - re.top + re.scrollTop);
    else if (Ne = i ? "right" : "left", se && re) {
      const St = i ? re.scrollLeftNormalized + re.clientWidth - re.scrollWidth : re.scrollLeft;
      $e = (i ? -1 : 1) * (se[Ne] - re[Ne] + St);
    }
    const et = {
      [Ne]: $e,
      // May be wrong until the font is loaded.
      [ne]: se ? se[ne] : 0
    };
    if (isNaN(B[Ne]) || isNaN(B[ne]))
      Q(et);
    else {
      const St = Math.abs(B[Ne] - et[Ne]), Et = Math.abs(B[ne] - et[ne]);
      (St >= 1 || Et >= 1) && Q(et);
    }
  }), Me = (re, {
    animation: se = !0
  } = {}) => {
    se ? Mx(G, Ae.current, re, {
      duration: o.transitions.duration.standard
    }) : Ae.current[G] = re;
  }, Qe = (re) => {
    let se = Ae.current[G];
    z ? se += re : (se += re * (i ? -1 : 1), se *= i && Ry() === "reverse" ? -1 : 1), Me(se);
  }, He = () => {
    const re = Ae.current[Z];
    let se = 0;
    const $e = Array.from(Be.current.children);
    for (let Ne = 0; Ne < $e.length; Ne += 1) {
      const et = $e[Ne];
      if (se + et[Z] > re) {
        Ne === 0 && (se = re);
        break;
      }
      se += et[Z];
    }
    return se;
  }, ze = () => {
    Qe(-1 * He());
  }, le = () => {
    Qe(He());
  }, ye = P.useCallback((re) => {
    fe({
      overflow: null,
      scrollbarWidth: re
    });
  }, []), be = () => {
    const re = {};
    re.scrollbarSizeListener = H ? /* @__PURE__ */ E.jsx(Nw, {
      onChange: ye,
      className: Se(N.scrollableX, N.hideScrollbar)
    }) : null;
    const $e = H && (S === "auto" && (Y || ie) || S === !0);
    return re.scrollButtonStart = $e ? /* @__PURE__ */ E.jsx(v, C({
      slots: {
        StartScrollButtonIcon: $.StartScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: W
      },
      orientation: g,
      direction: i ? "right" : "left",
      onClick: ze,
      disabled: !Y
    }, w, {
      className: Se(N.scrollButtons, w.className)
    })) : null, re.scrollButtonEnd = $e ? /* @__PURE__ */ E.jsx(v, C({
      slots: {
        EndScrollButtonIcon: $.EndScrollButtonIcon
      },
      slotProps: {
        endScrollButtonIcon: F
      },
      orientation: g,
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
        const Ne = se[G] + ($e[X] - se[X]);
        Me(Ne, {
          animation: re
        });
      } else if ($e[J] > se[J]) {
        const Ne = se[G] + ($e[J] - se[J]);
        Me(Ne, {
          animation: re
        });
      }
    }
  }), ue = sr(() => {
    H && S !== !1 && pe(!q);
  });
  P.useEffect(() => {
    const re = ss(() => {
      Ae.current && je();
    });
    let se;
    const $e = (St) => {
      St.forEach((Et) => {
        Et.removedNodes.forEach((Yt) => {
          var kt;
          (kt = se) == null || kt.unobserve(Yt);
        }), Et.addedNodes.forEach((Yt) => {
          var kt;
          (kt = se) == null || kt.observe(Yt);
        });
      }), re(), ue();
    }, Ne = Br(Ae.current);
    Ne.addEventListener("resize", re);
    let et;
    return typeof ResizeObserver < "u" && (se = new ResizeObserver(re), Array.from(Be.current.children).forEach((St) => {
      se.observe(St);
    })), typeof MutationObserver < "u" && (et = new MutationObserver($e), et.observe(Be.current, {
      childList: !0
    })), () => {
      var St, Et;
      re.clear(), Ne.removeEventListener("resize", re), (St = et) == null || St.disconnect(), (Et = se) == null || Et.disconnect();
    };
  }, [je, ue]), P.useEffect(() => {
    const re = Array.from(Be.current.children), se = re.length;
    if (typeof IntersectionObserver < "u" && se > 0 && H && S !== !1) {
      const $e = re[0], Ne = re[se - 1], et = {
        root: Ae.current,
        threshold: 0.99
      }, St = (Ut) => {
        oe(!Ut[0].isIntersecting);
      }, Et = new IntersectionObserver(St, et);
      Et.observe($e);
      const Yt = (Ut) => {
        ce(!Ut[0].isIntersecting);
      }, kt = new IntersectionObserver(Yt, et);
      return kt.observe(Ne), () => {
        Et.disconnect(), kt.disconnect();
      };
    }
  }, [H, S, q, d == null ? void 0 : d.length]), P.useEffect(() => {
    R(!0);
  }, []), P.useEffect(() => {
    je();
  }), P.useEffect(() => {
    ge(em !== B);
  }, [ge, B]), P.useImperativeHandle(c, () => ({
    updateIndicator: je,
    updateScrollButtons: ue
  }), [je, ue]);
  const Ue = /* @__PURE__ */ E.jsx(Iw, C({}, x, {
    className: Se(N.indicator, x.className),
    ownerState: D,
    style: C({}, B, x.style)
  }));
  let Ie = 0;
  const Ye = P.Children.map(d, (re) => {
    if (!/* @__PURE__ */ P.isValidElement(re))
      return null;
    process.env.NODE_ENV !== "production" && Un.isFragment(re) && console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    const se = re.props.value === void 0 ? Ie : re.props.value;
    Pe.set(se, Ie);
    const $e = se === j;
    return Ie += 1, /* @__PURE__ */ P.cloneElement(re, C({
      fullWidth: k === "fullWidth",
      indicator: $e && !O && Ue,
      selected: $e,
      selectionFollowsFocus: _,
      onChange: h,
      textColor: A,
      value: se
    }, Ie === 1 && j === !1 && !re.props.tabIndex ? {
      tabIndex: 0
    } : {}));
  }), Je = (re) => {
    const se = Be.current, $e = jt(se).activeElement;
    if ($e.getAttribute("role") !== "tab")
      return;
    let et = g === "horizontal" ? "ArrowLeft" : "ArrowUp", St = g === "horizontal" ? "ArrowRight" : "ArrowDown";
    switch (g === "horizontal" && i && (et = "ArrowRight", St = "ArrowLeft"), re.key) {
      case et:
        re.preventDefault(), Ds(se, $e, Qp);
        break;
      case St:
        re.preventDefault(), Ds(se, $e, Zp);
        break;
      case "Home":
        re.preventDefault(), Ds(se, null, Zp);
        break;
      case "End":
        re.preventDefault(), Ds(se, null, Qp);
        break;
    }
  }, Tt = be();
  return /* @__PURE__ */ E.jsxs(Cw, C({
    className: Se(N.root, p),
    ownerState: D,
    ref: r,
    as: m
  }, U, {
    children: [Tt.scrollButtonStart, Tt.scrollbarSizeListener, /* @__PURE__ */ E.jsxs(Pw, {
      className: N.scroller,
      ownerState: D,
      style: {
        overflow: te.overflow,
        [z ? `margin${i ? "Left" : "Right"}` : "marginBottom"]: K ? void 0 : -te.scrollbarWidth
      },
      ref: Ae,
      children: [/* @__PURE__ */ E.jsx(Rw, {
        "aria-label": a,
        "aria-labelledby": l,
        "aria-orientation": g === "vertical" ? "vertical" : null,
        className: N.flexContainer,
        ownerState: D,
        onKeyDown: Je,
        ref: Be,
        role: "tablist",
        children: Ye
      }), O && Ue]
    }), Tt.scrollButtonEnd]
  }));
});
process.env.NODE_ENV !== "production" && (bg.propTypes = {
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
const Aw = bg;
function jw(e) {
  return De("MuiTab", e);
}
const kw = Fe("MuiTab", ["root", "labelIcon", "textColorInherit", "textColorPrimary", "textColorSecondary", "selected", "disabled", "fullWidth", "wrapped", "iconWrapper"]), Rn = kw, Mw = ["className", "disabled", "disableFocusRipple", "fullWidth", "icon", "iconPosition", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"], Dw = (e) => {
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
  return Ve(u, jw, t);
}, Fw = he(Xn, {
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
})), $g = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    onChange: m,
    onClick: f,
    onFocus: y,
    // eslint-disable-next-line react/prop-types
    selected: h,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus: g,
    // eslint-disable-next-line react/prop-types
    textColor: v = "inherit",
    value: S,
    wrapped: _ = !1
  } = n, $ = _e(n, Mw), b = C({}, n, {
    disabled: i,
    disableFocusRipple: a,
    selected: h,
    icon: !!c,
    iconPosition: u,
    label: !!p,
    fullWidth: l,
    textColor: v,
    wrapped: _
  }), x = Dw(b), w = c && p && /* @__PURE__ */ P.isValidElement(c) ? /* @__PURE__ */ P.cloneElement(c, {
    className: Se(x.iconWrapper, c.props.className)
  }) : c, A = (k) => {
    !h && m && m(k, S), f && f(k);
  }, j = (k) => {
    g && !h && m && m(k, S), y && y(k);
  };
  return /* @__PURE__ */ E.jsxs(Fw, C({
    focusRipple: !a,
    className: Se(x.root, o),
    ref: r,
    role: "tab",
    "aria-selected": h,
    disabled: i,
    onClick: A,
    onFocus: j,
    ownerState: b,
    tabIndex: h ? 0 : -1
  }, $, {
    children: [u === "top" || u === "start" ? /* @__PURE__ */ E.jsxs(P.Fragment, {
      children: [w, p]
    }) : /* @__PURE__ */ E.jsxs(P.Fragment, {
      children: [p, w]
    }), d]
  }));
});
process.env.NODE_ENV !== "production" && ($g.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: Cy,
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
const Lw = $g;
function Sg(e) {
  const { children: t, value: r, index: n, ...o } = e;
  return /* @__PURE__ */ E.jsx(
    "div",
    {
      role: "tabpanel",
      hidden: r !== n,
      id: `simple-tabpanel-${n}`,
      "aria-labelledby": `simple-tab-${n}`,
      ...o,
      children: r === n && /* @__PURE__ */ E.jsx(Vr, { sx: { p: 3 }, children: t })
    }
  );
}
Sg.propTypes = {
  children: s.node,
  index: s.number.isRequired,
  value: s.number.isRequired
};
function Bw(e) {
  return {
    id: `simple-tab-${e}`,
    "aria-controls": `simple-tabpanel-${e}`
  };
}
function _t(e) {
  return typeof File < "u" && e instanceof File || typeof Date < "u" && e instanceof Date ? !1 : typeof e == "object" && e !== null && !Array.isArray(e);
}
function Vw(e) {
  return e.additionalItems === !0 && console.warn("additionalItems=true is currently not supported"), _t(e.additionalItems);
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
const Wo = "__additional_property", qc = "additionalProperties", us = "allOf", Ao = "anyOf", _g = "const", zw = "default", ml = "dependencies", Uw = "enum", xr = "__errors", pn = "$id", Ww = "if", hn = "items", qw = "_$junk_option_schema_id$_", ta = "$name", yn = "oneOf", Ot = "properties", Kw = "required", Ea = "submitButtonOptions", At = "$ref", Fu = "__rjsf_additionalProperties", Eg = "__rjsf_rootSchema", Hw = "ui:field", Lu = "ui:widget", Fi = "ui:options", Gw = "ui:globalOptions";
function rt(e = {}, t = {}) {
  return Object.keys(e).filter((r) => r.indexOf("ui:") === 0).reduce((r, n) => {
    const o = e[n];
    return n === Lu && _t(o) ? (console.error("Setting options via ui:widget object is no longer supported, use ui:options instead"), r) : n === Fi && _t(o) ? { ...r, ...o } : { ...r, [n.substring(3)]: o };
  }, { ...t });
}
function xg(e, t = {}, r) {
  if (!e.additionalProperties)
    return !1;
  const { expandable: n = !0 } = rt(t);
  return n === !1 ? n : e.maxProperties !== void 0 && r ? Object.keys(r).length < e.maxProperties : !0;
}
var Yw = typeof So == "object" && So && So.Object === Object && So, wg = Yw, Xw = wg, Jw = typeof self == "object" && self && self.Object === Object && self, Zw = Xw || Jw || Function("return this")(), zr = Zw, Qw = zr, eO = Qw.Symbol, qo = eO, nm = qo, Og = Object.prototype, tO = Og.hasOwnProperty, rO = Og.toString, bi = nm ? nm.toStringTag : void 0;
function nO(e) {
  var t = tO.call(e, bi), r = e[bi];
  try {
    e[bi] = void 0;
    var n = !0;
  } catch {
  }
  var o = rO.call(e);
  return n && (t ? e[bi] = r : delete e[bi]), o;
}
var oO = nO, iO = Object.prototype, sO = iO.toString;
function aO(e) {
  return sO.call(e);
}
var lO = aO, om = qo, cO = oO, uO = lO, dO = "[object Null]", fO = "[object Undefined]", im = om ? om.toStringTag : void 0;
function pO(e) {
  return e == null ? e === void 0 ? fO : dO : im && im in Object(e) ? cO(e) : uO(e);
}
var rn = pO;
function mO(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Tg = mO, hO = Tg, yO = hO(Object.getPrototypeOf, Object), hl = yO;
function gO(e) {
  return e != null && typeof e == "object";
}
var br = gO, vO = rn, bO = hl, $O = br, SO = "[object Object]", _O = Function.prototype, EO = Object.prototype, Cg = _O.toString, xO = EO.hasOwnProperty, wO = Cg.call(Object);
function OO(e) {
  if (!$O(e) || vO(e) != SO)
    return !1;
  var t = bO(e);
  if (t === null)
    return !0;
  var r = xO.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Cg.call(r) == wO;
}
var Ko = OO;
const Bu = /* @__PURE__ */ pt(Ko);
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
function TO() {
  this.__data__ = [], this.size = 0;
}
var CO = TO;
function PO(e, t) {
  return e === t || e !== e && t !== t;
}
var Ho = PO, RO = Ho;
function IO(e, t) {
  for (var r = e.length; r--; )
    if (RO(e[r][0], t))
      return r;
  return -1;
}
var yl = IO, NO = yl, AO = Array.prototype, jO = AO.splice;
function kO(e) {
  var t = this.__data__, r = NO(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : jO.call(t, r, 1), --this.size, !0;
}
var MO = kO, DO = yl;
function FO(e) {
  var t = this.__data__, r = DO(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var LO = FO, BO = yl;
function VO(e) {
  return BO(this.__data__, e) > -1;
}
var zO = VO, UO = yl;
function WO(e, t) {
  var r = this.__data__, n = UO(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var qO = WO, KO = CO, HO = MO, GO = LO, YO = zO, XO = qO;
function Go(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Go.prototype.clear = KO;
Go.prototype.delete = HO;
Go.prototype.get = GO;
Go.prototype.has = YO;
Go.prototype.set = XO;
var gl = Go, JO = gl;
function ZO() {
  this.__data__ = new JO(), this.size = 0;
}
var QO = ZO;
function eT(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var tT = eT;
function rT(e) {
  return this.__data__.get(e);
}
var nT = rT;
function oT(e) {
  return this.__data__.has(e);
}
var iT = oT;
function sT(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var nr = sT;
const wr = /* @__PURE__ */ pt(nr);
var aT = rn, lT = nr, cT = "[object AsyncFunction]", uT = "[object Function]", dT = "[object GeneratorFunction]", fT = "[object Proxy]";
function pT(e) {
  if (!lT(e))
    return !1;
  var t = aT(e);
  return t == uT || t == dT || t == cT || t == fT;
}
var vl = pT, mT = zr, hT = mT["__core-js_shared__"], yT = hT, ac = yT, sm = function() {
  var e = /[^.]+$/.exec(ac && ac.keys && ac.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function gT(e) {
  return !!sm && sm in e;
}
var vT = gT, bT = Function.prototype, $T = bT.toString;
function ST(e) {
  if (e != null) {
    try {
      return $T.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Pg = ST, _T = vl, ET = vT, xT = nr, wT = Pg, OT = /[\\^$.*+?()[\]{}|]/g, TT = /^\[object .+?Constructor\]$/, CT = Function.prototype, PT = Object.prototype, RT = CT.toString, IT = PT.hasOwnProperty, NT = RegExp(
  "^" + RT.call(IT).replace(OT, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function AT(e) {
  if (!xT(e) || ET(e))
    return !1;
  var t = _T(e) ? NT : TT;
  return t.test(wT(e));
}
var jT = AT;
function kT(e, t) {
  return e == null ? void 0 : e[t];
}
var MT = kT, DT = jT, FT = MT;
function LT(e, t) {
  var r = FT(e, t);
  return DT(r) ? r : void 0;
}
var Jn = LT, BT = Jn, VT = zr, zT = BT(VT, "Map"), Vu = zT, UT = Jn, WT = UT(Object, "create"), bl = WT, am = bl;
function qT() {
  this.__data__ = am ? am(null) : {}, this.size = 0;
}
var KT = qT;
function HT(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var GT = HT, YT = bl, XT = "__lodash_hash_undefined__", JT = Object.prototype, ZT = JT.hasOwnProperty;
function QT(e) {
  var t = this.__data__;
  if (YT) {
    var r = t[e];
    return r === XT ? void 0 : r;
  }
  return ZT.call(t, e) ? t[e] : void 0;
}
var eC = QT, tC = bl, rC = Object.prototype, nC = rC.hasOwnProperty;
function oC(e) {
  var t = this.__data__;
  return tC ? t[e] !== void 0 : nC.call(t, e);
}
var iC = oC, sC = bl, aC = "__lodash_hash_undefined__";
function lC(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = sC && t === void 0 ? aC : t, this;
}
var cC = lC, uC = KT, dC = GT, fC = eC, pC = iC, mC = cC;
function Yo(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Yo.prototype.clear = uC;
Yo.prototype.delete = dC;
Yo.prototype.get = fC;
Yo.prototype.has = pC;
Yo.prototype.set = mC;
var hC = Yo, lm = hC, yC = gl, gC = Vu;
function vC() {
  this.size = 0, this.__data__ = {
    hash: new lm(),
    map: new (gC || yC)(),
    string: new lm()
  };
}
var bC = vC;
function $C(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var SC = $C, _C = SC;
function EC(e, t) {
  var r = e.__data__;
  return _C(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var $l = EC, xC = $l;
function wC(e) {
  var t = xC(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var OC = wC, TC = $l;
function CC(e) {
  return TC(this, e).get(e);
}
var PC = CC, RC = $l;
function IC(e) {
  return RC(this, e).has(e);
}
var NC = IC, AC = $l;
function jC(e, t) {
  var r = AC(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var kC = jC, MC = bC, DC = OC, FC = PC, LC = NC, BC = kC;
function Xo(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Xo.prototype.clear = MC;
Xo.prototype.delete = DC;
Xo.prototype.get = FC;
Xo.prototype.has = LC;
Xo.prototype.set = BC;
var zu = Xo, VC = gl, zC = Vu, UC = zu, WC = 200;
function qC(e, t) {
  var r = this.__data__;
  if (r instanceof VC) {
    var n = r.__data__;
    if (!zC || n.length < WC - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new UC(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var KC = qC, HC = gl, GC = QO, YC = tT, XC = nT, JC = iT, ZC = KC;
function Jo(e) {
  var t = this.__data__ = new HC(e);
  this.size = t.size;
}
Jo.prototype.clear = GC;
Jo.prototype.delete = YC;
Jo.prototype.get = XC;
Jo.prototype.has = JC;
Jo.prototype.set = ZC;
var Sl = Jo, QC = "__lodash_hash_undefined__";
function eP(e) {
  return this.__data__.set(e, QC), this;
}
var tP = eP;
function rP(e) {
  return this.__data__.has(e);
}
var nP = rP, oP = zu, iP = tP, sP = nP;
function xa(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new oP(); ++t < r; )
    this.add(e[t]);
}
xa.prototype.add = xa.prototype.push = iP;
xa.prototype.has = sP;
var _l = xa;
function aP(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var lP = aP;
function cP(e, t) {
  return e.has(t);
}
var El = cP, uP = _l, dP = lP, fP = El, pP = 1, mP = 2;
function hP(e, t, r, n, o, i) {
  var a = r & pP, l = e.length, c = t.length;
  if (l != c && !(a && c > l))
    return !1;
  var u = i.get(e), d = i.get(t);
  if (u && d)
    return u == t && d == e;
  var p = -1, m = !0, f = r & mP ? new uP() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < l; ) {
    var y = e[p], h = t[p];
    if (n)
      var g = a ? n(h, y, p, t, e, i) : n(y, h, p, e, t, i);
    if (g !== void 0) {
      if (g)
        continue;
      m = !1;
      break;
    }
    if (f) {
      if (!dP(t, function(v, S) {
        if (!fP(f, S) && (y === v || o(y, v, r, n, i)))
          return f.push(S);
      })) {
        m = !1;
        break;
      }
    } else if (!(y === h || o(y, h, r, n, i))) {
      m = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), m;
}
var Rg = hP, yP = zr, gP = yP.Uint8Array, Ig = gP;
function vP(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
var bP = vP;
function $P(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Uu = $P, cm = qo, um = Ig, SP = Ho, _P = Rg, EP = bP, xP = Uu, wP = 1, OP = 2, TP = "[object Boolean]", CP = "[object Date]", PP = "[object Error]", RP = "[object Map]", IP = "[object Number]", NP = "[object RegExp]", AP = "[object Set]", jP = "[object String]", kP = "[object Symbol]", MP = "[object ArrayBuffer]", DP = "[object DataView]", dm = cm ? cm.prototype : void 0, lc = dm ? dm.valueOf : void 0;
function FP(e, t, r, n, o, i, a) {
  switch (r) {
    case DP:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case MP:
      return !(e.byteLength != t.byteLength || !i(new um(e), new um(t)));
    case TP:
    case CP:
    case IP:
      return SP(+e, +t);
    case PP:
      return e.name == t.name && e.message == t.message;
    case NP:
    case jP:
      return e == t + "";
    case RP:
      var l = EP;
    case AP:
      var c = n & wP;
      if (l || (l = xP), e.size != t.size && !c)
        return !1;
      var u = a.get(e);
      if (u)
        return u == t;
      n |= OP, a.set(e, t);
      var d = _P(l(e), l(t), n, o, i, a);
      return a.delete(e), d;
    case kP:
      if (lc)
        return lc.call(e) == lc.call(t);
  }
  return !1;
}
var LP = FP;
function BP(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Wu = BP, VP = Array.isArray, Lt = VP, zP = Wu, UP = Lt;
function WP(e, t, r) {
  var n = t(e);
  return UP(e) ? n : zP(n, r(e));
}
var Ng = WP;
function qP(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (i[o++] = a);
  }
  return i;
}
var KP = qP;
function HP() {
  return [];
}
var Ag = HP, GP = KP, YP = Ag, XP = Object.prototype, JP = XP.propertyIsEnumerable, fm = Object.getOwnPropertySymbols, ZP = fm ? function(e) {
  return e == null ? [] : (e = Object(e), GP(fm(e), function(t) {
    return JP.call(e, t);
  }));
} : YP, qu = ZP;
function QP(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var jg = QP, eR = rn, tR = br, rR = "[object Arguments]";
function nR(e) {
  return tR(e) && eR(e) == rR;
}
var oR = nR, pm = oR, iR = br, kg = Object.prototype, sR = kg.hasOwnProperty, aR = kg.propertyIsEnumerable, lR = pm(function() {
  return arguments;
}()) ? pm : function(e) {
  return iR(e) && sR.call(e, "callee") && !aR.call(e, "callee");
}, ds = lR, wa = { exports: {} };
function cR() {
  return !1;
}
var uR = cR;
wa.exports;
(function(e, t) {
  var r = zr, n = uR, o = t && !t.nodeType && t, i = o && !0 && e && !e.nodeType && e, a = i && i.exports === o, l = a ? r.Buffer : void 0, c = l ? l.isBuffer : void 0, u = c || n;
  e.exports = u;
})(wa, wa.exports);
var Zo = wa.exports, dR = 9007199254740991, fR = /^(?:0|[1-9]\d*)$/;
function pR(e, t) {
  var r = typeof e;
  return t = t ?? dR, !!t && (r == "number" || r != "symbol" && fR.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var xl = pR, mR = 9007199254740991;
function hR(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= mR;
}
var Ku = hR, yR = rn, gR = Ku, vR = br, bR = "[object Arguments]", $R = "[object Array]", SR = "[object Boolean]", _R = "[object Date]", ER = "[object Error]", xR = "[object Function]", wR = "[object Map]", OR = "[object Number]", TR = "[object Object]", CR = "[object RegExp]", PR = "[object Set]", RR = "[object String]", IR = "[object WeakMap]", NR = "[object ArrayBuffer]", AR = "[object DataView]", jR = "[object Float32Array]", kR = "[object Float64Array]", MR = "[object Int8Array]", DR = "[object Int16Array]", FR = "[object Int32Array]", LR = "[object Uint8Array]", BR = "[object Uint8ClampedArray]", VR = "[object Uint16Array]", zR = "[object Uint32Array]", gt = {};
gt[jR] = gt[kR] = gt[MR] = gt[DR] = gt[FR] = gt[LR] = gt[BR] = gt[VR] = gt[zR] = !0;
gt[bR] = gt[$R] = gt[NR] = gt[SR] = gt[AR] = gt[_R] = gt[ER] = gt[xR] = gt[wR] = gt[OR] = gt[TR] = gt[CR] = gt[PR] = gt[RR] = gt[IR] = !1;
function UR(e) {
  return vR(e) && gR(e.length) && !!gt[yR(e)];
}
var WR = UR;
function qR(e) {
  return function(t) {
    return e(t);
  };
}
var Zn = qR, Oa = { exports: {} };
Oa.exports;
(function(e, t) {
  var r = wg, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, i = o && o.exports === n, a = i && r.process, l = function() {
    try {
      var c = o && o.require && o.require("util").types;
      return c || a && a.binding && a.binding("util");
    } catch {
    }
  }();
  e.exports = l;
})(Oa, Oa.exports);
var Hu = Oa.exports, KR = WR, HR = Zn, mm = Hu, hm = mm && mm.isTypedArray, GR = hm ? HR(hm) : KR, fs = GR, YR = jg, XR = ds, JR = Lt, ZR = Zo, QR = xl, eI = fs, tI = Object.prototype, rI = tI.hasOwnProperty;
function nI(e, t) {
  var r = JR(e), n = !r && XR(e), o = !r && !n && ZR(e), i = !r && !n && !o && eI(e), a = r || n || o || i, l = a ? YR(e.length, String) : [], c = l.length;
  for (var u in e)
    (t || rI.call(e, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    QR(u, c))) && l.push(u);
  return l;
}
var Mg = nI, oI = Object.prototype;
function iI(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || oI;
  return e === r;
}
var wl = iI, sI = Tg, aI = sI(Object.keys, Object), lI = aI, cI = wl, uI = lI, dI = Object.prototype, fI = dI.hasOwnProperty;
function pI(e) {
  if (!cI(e))
    return uI(e);
  var t = [];
  for (var r in Object(e))
    fI.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Dg = pI, mI = vl, hI = Ku;
function yI(e) {
  return e != null && hI(e.length) && !mI(e);
}
var Qn = yI, gI = Mg, vI = Dg, bI = Qn;
function $I(e) {
  return bI(e) ? gI(e) : vI(e);
}
var ps = $I, SI = Ng, _I = qu, EI = ps;
function xI(e) {
  return SI(e, EI, _I);
}
var Fg = xI, ym = Fg, wI = 1, OI = Object.prototype, TI = OI.hasOwnProperty;
function CI(e, t, r, n, o, i) {
  var a = r & wI, l = ym(e), c = l.length, u = ym(t), d = u.length;
  if (c != d && !a)
    return !1;
  for (var p = c; p--; ) {
    var m = l[p];
    if (!(a ? m in t : TI.call(t, m)))
      return !1;
  }
  var f = i.get(e), y = i.get(t);
  if (f && y)
    return f == t && y == e;
  var h = !0;
  i.set(e, t), i.set(t, e);
  for (var g = a; ++p < c; ) {
    m = l[p];
    var v = e[m], S = t[m];
    if (n)
      var _ = a ? n(S, v, m, t, e, i) : n(v, S, m, e, t, i);
    if (!(_ === void 0 ? v === S || o(v, S, r, n, i) : _)) {
      h = !1;
      break;
    }
    g || (g = m == "constructor");
  }
  if (h && !g) {
    var $ = e.constructor, b = t.constructor;
    $ != b && "constructor" in e && "constructor" in t && !(typeof $ == "function" && $ instanceof $ && typeof b == "function" && b instanceof b) && (h = !1);
  }
  return i.delete(e), i.delete(t), h;
}
var PI = CI, RI = Jn, II = zr, NI = RI(II, "DataView"), AI = NI, jI = Jn, kI = zr, MI = jI(kI, "Promise"), DI = MI, FI = Jn, LI = zr, BI = FI(LI, "Set"), Lg = BI, VI = Jn, zI = zr, UI = VI(zI, "WeakMap"), WI = UI, Hc = AI, Gc = Vu, Yc = DI, Xc = Lg, Jc = WI, Bg = rn, Qo = Pg, gm = "[object Map]", qI = "[object Object]", vm = "[object Promise]", bm = "[object Set]", $m = "[object WeakMap]", Sm = "[object DataView]", KI = Qo(Hc), HI = Qo(Gc), GI = Qo(Yc), YI = Qo(Xc), XI = Qo(Jc), kn = Bg;
(Hc && kn(new Hc(new ArrayBuffer(1))) != Sm || Gc && kn(new Gc()) != gm || Yc && kn(Yc.resolve()) != vm || Xc && kn(new Xc()) != bm || Jc && kn(new Jc()) != $m) && (kn = function(e) {
  var t = Bg(e), r = t == qI ? e.constructor : void 0, n = r ? Qo(r) : "";
  if (n)
    switch (n) {
      case KI:
        return Sm;
      case HI:
        return gm;
      case GI:
        return vm;
      case YI:
        return bm;
      case XI:
        return $m;
    }
  return t;
});
var ms = kn, cc = Sl, JI = Rg, ZI = LP, QI = PI, _m = ms, Em = Lt, xm = Zo, eN = fs, tN = 1, wm = "[object Arguments]", Om = "[object Array]", Fs = "[object Object]", rN = Object.prototype, Tm = rN.hasOwnProperty;
function nN(e, t, r, n, o, i) {
  var a = Em(e), l = Em(t), c = a ? Om : _m(e), u = l ? Om : _m(t);
  c = c == wm ? Fs : c, u = u == wm ? Fs : u;
  var d = c == Fs, p = u == Fs, m = c == u;
  if (m && xm(e)) {
    if (!xm(t))
      return !1;
    a = !0, d = !1;
  }
  if (m && !d)
    return i || (i = new cc()), a || eN(e) ? JI(e, t, r, n, o, i) : ZI(e, t, c, r, n, o, i);
  if (!(r & tN)) {
    var f = d && Tm.call(e, "__wrapped__"), y = p && Tm.call(t, "__wrapped__");
    if (f || y) {
      var h = f ? e.value() : e, g = y ? t.value() : t;
      return i || (i = new cc()), o(h, g, r, n, i);
    }
  }
  return m ? (i || (i = new cc()), QI(e, t, r, n, o, i)) : !1;
}
var oN = nN, iN = oN, Cm = br;
function Vg(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !Cm(e) && !Cm(t) ? e !== e && t !== t : iN(e, t, r, n, Vg, o);
}
var Ol = Vg, sN = Ol;
function aN(e, t, r) {
  r = typeof r == "function" ? r : void 0;
  var n = r ? r(e, t) : void 0;
  return n === void 0 ? sN(e, t, void 0, r) : !!n;
}
var lN = aN;
const cN = /* @__PURE__ */ pt(lN);
function mr(e, t) {
  return cN(e, t, (r, n) => {
    if (typeof r == "function" && typeof n == "function")
      return !0;
  });
}
var uN = rn, dN = br, fN = "[object Symbol]";
function pN(e) {
  return typeof e == "symbol" || dN(e) && uN(e) == fN;
}
var ei = pN, mN = Lt, hN = ei, yN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, gN = /^\w*$/;
function vN(e, t) {
  if (mN(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || hN(e) ? !0 : gN.test(e) || !yN.test(e) || t != null && e in Object(t);
}
var Gu = vN, zg = zu, bN = "Expected a function";
function Yu(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(bN);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = e.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Yu.Cache || zg)(), r;
}
Yu.Cache = zg;
var $N = Yu, SN = $N, _N = 500;
function EN(e) {
  var t = SN(e, function(n) {
    return r.size === _N && r.clear(), n;
  }), r = t.cache;
  return t;
}
var xN = EN, wN = xN, ON = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, TN = /\\(\\)?/g, CN = wN(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(ON, function(r, n, o, i) {
    t.push(o ? i.replace(TN, "$1") : n || r);
  }), t;
}), Ug = CN;
function PN(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var nn = PN, Pm = qo, RN = nn, IN = Lt, NN = ei, AN = 1 / 0, Rm = Pm ? Pm.prototype : void 0, Im = Rm ? Rm.toString : void 0;
function Wg(e) {
  if (typeof e == "string")
    return e;
  if (IN(e))
    return RN(e, Wg) + "";
  if (NN(e))
    return Im ? Im.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -AN ? "-0" : t;
}
var jN = Wg, kN = jN;
function MN(e) {
  return e == null ? "" : kN(e);
}
var qg = MN, DN = Lt, FN = Gu, LN = Ug, BN = qg;
function VN(e, t) {
  return DN(e) ? e : FN(e, t) ? [e] : LN(BN(e));
}
var ti = VN, zN = ei, UN = 1 / 0;
function WN(e) {
  if (typeof e == "string" || zN(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -UN ? "-0" : t;
}
var eo = WN, qN = ti, KN = eo;
function HN(e, t) {
  t = qN(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[KN(t[r++])];
  return r && r == n ? e : void 0;
}
var hs = HN, GN = hs;
function YN(e, t, r) {
  var n = e == null ? void 0 : GN(e, t);
  return n === void 0 ? r : n;
}
var Kg = YN;
const Oe = /* @__PURE__ */ pt(Kg);
var XN = Dg, JN = ms, ZN = ds, QN = Lt, eA = Qn, tA = Zo, rA = wl, nA = fs, oA = "[object Map]", iA = "[object Set]", sA = Object.prototype, aA = sA.hasOwnProperty;
function lA(e) {
  if (e == null)
    return !0;
  if (eA(e) && (QN(e) || typeof e == "string" || typeof e.splice == "function" || tA(e) || nA(e) || ZN(e)))
    return !e.length;
  var t = JN(e);
  if (t == oA || t == iA)
    return !e.size;
  if (rA(e))
    return !XN(e).length;
  for (var r in e)
    if (aA.call(e, r))
      return !1;
  return !0;
}
var cA = lA;
const Kn = /* @__PURE__ */ pt(cA);
var Tl = {}, uA = /~/, dA = /~[01]/g;
function fA(e) {
  switch (e) {
    case "~1":
      return "/";
    case "~0":
      return "~";
  }
  throw new Error("Invalid tilde escape: " + e);
}
function Hg(e) {
  return uA.test(e) ? e.replace(dA, fA) : e;
}
function pA(e, t, r) {
  for (var n, o, i = 1, a = t.length; i < a; ) {
    if (t[i] === "constructor" || t[i] === "prototype" || t[i] === "__proto__")
      return e;
    if (n = Hg(t[i++]), o = a > i, typeof e[n] > "u" && (Array.isArray(e) && n === "-" && (n = e.length), o && (t[i] !== "" && t[i] < 1 / 0 || t[i] === "-" ? e[n] = [] : e[n] = {})), !o)
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
function Gg(e, t) {
  if (typeof e != "object")
    throw new Error("Invalid input object.");
  t = Xu(t);
  var r = t.length;
  if (r === 1)
    return e;
  for (var n = 1; n < r; ) {
    if (e = e[Hg(t[n++])], r === n)
      return e;
    if (typeof e != "object" || e === null)
      return;
  }
}
function Yg(e, t, r) {
  if (typeof e != "object")
    throw new Error("Invalid input object.");
  if (t = Xu(t), t.length === 0)
    throw new Error("Invalid JSON pointer for set.");
  return pA(e, t, r);
}
function mA(e) {
  var t = Xu(e);
  return {
    get: function(r) {
      return Gg(r, t);
    },
    set: function(r, n) {
      return Yg(r, t, n);
    }
  };
}
Tl.get = Gg;
Tl.set = Yg;
Tl.compile = mA;
function hA(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Ju = hA, yA = Jn, gA = function() {
  try {
    var e = yA(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Xg = gA, Nm = Xg;
function vA(e, t, r) {
  t == "__proto__" && Nm ? Nm(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Zu = vA, bA = Zu, $A = Ho, SA = Object.prototype, _A = SA.hasOwnProperty;
function EA(e, t, r) {
  var n = e[t];
  (!(_A.call(e, t) && $A(n, r)) || r === void 0 && !(t in e)) && bA(e, t, r);
}
var Qu = EA, xA = Qu, wA = Zu;
function OA(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i], c = n ? n(r[l], e[l], l, r, e) : void 0;
    c === void 0 && (c = e[l]), o ? wA(r, l, c) : xA(r, l, c);
  }
  return r;
}
var ri = OA, TA = ri, CA = ps;
function PA(e, t) {
  return e && TA(t, CA(t), e);
}
var RA = PA;
function IA(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var NA = IA, AA = nr, jA = wl, kA = NA, MA = Object.prototype, DA = MA.hasOwnProperty;
function FA(e) {
  if (!AA(e))
    return kA(e);
  var t = jA(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !DA.call(e, n)) || r.push(n);
  return r;
}
var LA = FA, BA = Mg, VA = LA, zA = Qn;
function UA(e) {
  return zA(e) ? BA(e, !0) : VA(e);
}
var ni = UA, WA = ri, qA = ni;
function KA(e, t) {
  return e && WA(t, qA(t), e);
}
var HA = KA, Ta = { exports: {} };
Ta.exports;
(function(e, t) {
  var r = zr, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, i = o && o.exports === n, a = i ? r.Buffer : void 0, l = a ? a.allocUnsafe : void 0;
  function c(u, d) {
    if (d)
      return u.slice();
    var p = u.length, m = l ? l(p) : new u.constructor(p);
    return u.copy(m), m;
  }
  e.exports = c;
})(Ta, Ta.exports);
var Jg = Ta.exports;
function GA(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Cl = GA, YA = ri, XA = qu;
function JA(e, t) {
  return YA(e, XA(e), t);
}
var ZA = JA, QA = Wu, ej = hl, tj = qu, rj = Ag, nj = Object.getOwnPropertySymbols, oj = nj ? function(e) {
  for (var t = []; e; )
    QA(t, tj(e)), e = ej(e);
  return t;
} : rj, Zg = oj, ij = ri, sj = Zg;
function aj(e, t) {
  return ij(e, sj(e), t);
}
var lj = aj, cj = Ng, uj = Zg, dj = ni;
function fj(e) {
  return cj(e, dj, uj);
}
var Qg = fj, pj = Object.prototype, mj = pj.hasOwnProperty;
function hj(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && mj.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var yj = hj, Am = Ig;
function gj(e) {
  var t = new e.constructor(e.byteLength);
  return new Am(t).set(new Am(e)), t;
}
var ed = gj, vj = ed;
function bj(e, t) {
  var r = t ? vj(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var $j = bj, Sj = /\w*$/;
function _j(e) {
  var t = new e.constructor(e.source, Sj.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Ej = _j, jm = qo, km = jm ? jm.prototype : void 0, Mm = km ? km.valueOf : void 0;
function xj(e) {
  return Mm ? Object(Mm.call(e)) : {};
}
var wj = xj, Oj = ed;
function Tj(e, t) {
  var r = t ? Oj(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var ev = Tj, Cj = ed, Pj = $j, Rj = Ej, Ij = wj, Nj = ev, Aj = "[object Boolean]", jj = "[object Date]", kj = "[object Map]", Mj = "[object Number]", Dj = "[object RegExp]", Fj = "[object Set]", Lj = "[object String]", Bj = "[object Symbol]", Vj = "[object ArrayBuffer]", zj = "[object DataView]", Uj = "[object Float32Array]", Wj = "[object Float64Array]", qj = "[object Int8Array]", Kj = "[object Int16Array]", Hj = "[object Int32Array]", Gj = "[object Uint8Array]", Yj = "[object Uint8ClampedArray]", Xj = "[object Uint16Array]", Jj = "[object Uint32Array]";
function Zj(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Vj:
      return Cj(e);
    case Aj:
    case jj:
      return new n(+e);
    case zj:
      return Pj(e, r);
    case Uj:
    case Wj:
    case qj:
    case Kj:
    case Hj:
    case Gj:
    case Yj:
    case Xj:
    case Jj:
      return Nj(e, r);
    case kj:
      return new n();
    case Mj:
    case Lj:
      return new n(e);
    case Dj:
      return Rj(e);
    case Fj:
      return new n();
    case Bj:
      return Ij(e);
  }
}
var Qj = Zj, ek = nr, Dm = Object.create, tk = function() {
  function e() {
  }
  return function(t) {
    if (!ek(t))
      return {};
    if (Dm)
      return Dm(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), tv = tk, rk = tv, nk = hl, ok = wl;
function ik(e) {
  return typeof e.constructor == "function" && !ok(e) ? rk(nk(e)) : {};
}
var rv = ik, sk = ms, ak = br, lk = "[object Map]";
function ck(e) {
  return ak(e) && sk(e) == lk;
}
var uk = ck, dk = uk, fk = Zn, Fm = Hu, Lm = Fm && Fm.isMap, pk = Lm ? fk(Lm) : dk, mk = pk, hk = ms, yk = br, gk = "[object Set]";
function vk(e) {
  return yk(e) && hk(e) == gk;
}
var bk = vk, $k = bk, Sk = Zn, Bm = Hu, Vm = Bm && Bm.isSet, _k = Vm ? Sk(Vm) : $k, Ek = _k, xk = Sl, wk = Ju, Ok = Qu, Tk = RA, Ck = HA, Pk = Jg, Rk = Cl, Ik = ZA, Nk = lj, Ak = Fg, jk = Qg, kk = ms, Mk = yj, Dk = Qj, Fk = rv, Lk = Lt, Bk = Zo, Vk = mk, zk = nr, Uk = Ek, Wk = ps, qk = ni, Kk = 1, Hk = 2, Gk = 4, nv = "[object Arguments]", Yk = "[object Array]", Xk = "[object Boolean]", Jk = "[object Date]", Zk = "[object Error]", ov = "[object Function]", Qk = "[object GeneratorFunction]", eM = "[object Map]", tM = "[object Number]", iv = "[object Object]", rM = "[object RegExp]", nM = "[object Set]", oM = "[object String]", iM = "[object Symbol]", sM = "[object WeakMap]", aM = "[object ArrayBuffer]", lM = "[object DataView]", cM = "[object Float32Array]", uM = "[object Float64Array]", dM = "[object Int8Array]", fM = "[object Int16Array]", pM = "[object Int32Array]", mM = "[object Uint8Array]", hM = "[object Uint8ClampedArray]", yM = "[object Uint16Array]", gM = "[object Uint32Array]", yt = {};
yt[nv] = yt[Yk] = yt[aM] = yt[lM] = yt[Xk] = yt[Jk] = yt[cM] = yt[uM] = yt[dM] = yt[fM] = yt[pM] = yt[eM] = yt[tM] = yt[iv] = yt[rM] = yt[nM] = yt[oM] = yt[iM] = yt[mM] = yt[hM] = yt[yM] = yt[gM] = !0;
yt[Zk] = yt[ov] = yt[sM] = !1;
function ra(e, t, r, n, o, i) {
  var a, l = t & Kk, c = t & Hk, u = t & Gk;
  if (r && (a = o ? r(e, n, o, i) : r(e)), a !== void 0)
    return a;
  if (!zk(e))
    return e;
  var d = Lk(e);
  if (d) {
    if (a = Mk(e), !l)
      return Rk(e, a);
  } else {
    var p = kk(e), m = p == ov || p == Qk;
    if (Bk(e))
      return Pk(e, l);
    if (p == iv || p == nv || m && !o) {
      if (a = c || m ? {} : Fk(e), !l)
        return c ? Nk(e, Ck(a, e)) : Ik(e, Tk(a, e));
    } else {
      if (!yt[p])
        return o ? e : {};
      a = Dk(e, p, l);
    }
  }
  i || (i = new xk());
  var f = i.get(e);
  if (f)
    return f;
  i.set(e, a), Uk(e) ? e.forEach(function(g) {
    a.add(ra(g, t, r, g, e, i));
  }) : Vk(e) && e.forEach(function(g, v) {
    a.set(v, ra(g, t, r, v, e, i));
  });
  var y = u ? c ? jk : Ak : c ? qk : Wk, h = d ? void 0 : y(e);
  return wk(h || e, function(g, v) {
    h && (v = g, g = e[v]), Ok(a, v, ra(g, t, r, v, e, i));
  }), a;
}
var sv = ra;
function vM(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var av = vM;
function bM(e, t, r) {
  var n = -1, o = e.length;
  t < 0 && (t = -t > o ? 0 : o + t), r = r > o ? o : r, r < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var i = Array(o); ++n < o; )
    i[n] = e[n + t];
  return i;
}
var $M = bM, SM = hs, _M = $M;
function EM(e, t) {
  return t.length < 2 ? e : SM(e, _M(t, 0, -1));
}
var xM = EM, wM = ti, OM = av, TM = xM, CM = eo;
function PM(e, t) {
  return t = wM(t, e), e = TM(e, t), e == null || delete e[CM(OM(t))];
}
var lv = PM, RM = Ko;
function IM(e) {
  return RM(e) ? void 0 : e;
}
var NM = IM, zm = qo, AM = ds, jM = Lt, Um = zm ? zm.isConcatSpreadable : void 0;
function kM(e) {
  return jM(e) || AM(e) || !!(Um && e && e[Um]);
}
var MM = kM, DM = Wu, FM = MM;
function cv(e, t, r, n, o) {
  var i = -1, a = e.length;
  for (r || (r = FM), o || (o = []); ++i < a; ) {
    var l = e[i];
    t > 0 && r(l) ? t > 1 ? cv(l, t - 1, r, n, o) : DM(o, l) : n || (o[o.length] = l);
  }
  return o;
}
var Pl = cv, LM = Pl;
function BM(e) {
  var t = e == null ? 0 : e.length;
  return t ? LM(e, 1) : [];
}
var td = BM;
function VM(e, t, r) {
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
var uv = VM, zM = uv, Wm = Math.max;
function UM(e, t, r) {
  return t = Wm(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = Wm(n.length - t, 0), a = Array(i); ++o < i; )
      a[o] = n[t + o];
    o = -1;
    for (var l = Array(t + 1); ++o < t; )
      l[o] = n[o];
    return l[t] = r(a), zM(e, this, l);
  };
}
var dv = UM;
function WM(e) {
  return function() {
    return e;
  };
}
var qM = WM;
function KM(e) {
  return e;
}
var ys = KM, HM = qM, qm = Xg, GM = ys, YM = qm ? function(e, t) {
  return qm(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: HM(t),
    writable: !0
  });
} : GM, XM = YM, JM = 800, ZM = 16, QM = Date.now;
function e2(e) {
  var t = 0, r = 0;
  return function() {
    var n = QM(), o = ZM - (n - r);
    if (r = n, o > 0) {
      if (++t >= JM)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var t2 = e2, r2 = XM, n2 = t2, o2 = n2(r2), fv = o2, i2 = td, s2 = dv, a2 = fv;
function l2(e) {
  return a2(s2(e, void 0, i2), e + "");
}
var pv = l2, c2 = nn, u2 = sv, d2 = lv, f2 = ti, p2 = ri, m2 = NM, h2 = pv, y2 = Qg, g2 = 1, v2 = 2, b2 = 4, $2 = h2(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = c2(t, function(i) {
    return i = f2(i, e), n || (n = i.length > 1), i;
  }), p2(e, y2(e), r), n && (r = u2(r, g2 | v2 | b2, m2));
  for (var o = t.length; o--; )
    d2(r, t[o]);
  return r;
}), S2 = $2;
const Ca = /* @__PURE__ */ pt(S2);
function rd(e, t) {
  const r = t[e];
  return [Ca(t, [e]), r];
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
var _2 = Object.prototype, E2 = _2.hasOwnProperty;
function x2(e, t) {
  return e != null && E2.call(e, t);
}
var w2 = x2, O2 = ti, T2 = ds, C2 = Lt, P2 = xl, R2 = Ku, I2 = eo;
function N2(e, t, r) {
  t = O2(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var a = I2(t[n]);
    if (!(i = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && R2(o) && P2(a, o) && (C2(e) || T2(e)));
}
var mv = N2, A2 = w2, j2 = mv;
function k2(e, t) {
  return e != null && j2(e, t, A2);
}
var M2 = k2;
const Jt = /* @__PURE__ */ pt(M2);
var D2 = rn, F2 = br, L2 = "[object Number]";
function B2(e) {
  return typeof e == "number" || F2(e) && D2(e) == L2;
}
var V2 = B2;
const hv = /* @__PURE__ */ pt(V2);
var z2 = rn, U2 = Lt, W2 = br, q2 = "[object String]";
function K2(e) {
  return typeof e == "string" || !U2(e) && W2(e) && z2(e) == q2;
}
var H2 = K2;
const od = /* @__PURE__ */ pt(H2);
function G2(e, t, r, n) {
  var o = -1, i = e == null ? 0 : e.length;
  for (n && i && (r = e[++o]); ++o < i; )
    r = t(r, e[o], o, e);
  return r;
}
var Y2 = G2;
function X2(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), a = n(t), l = a.length; l--; ) {
      var c = a[e ? l : ++o];
      if (r(i[c], c, i) === !1)
        break;
    }
    return t;
  };
}
var J2 = X2, Z2 = J2, Q2 = Z2(), yv = Q2, eD = yv, tD = ps;
function rD(e, t) {
  return e && eD(e, t, tD);
}
var gv = rD, nD = Qn;
function oD(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!nD(r))
      return e(r, n);
    for (var o = r.length, i = t ? o : -1, a = Object(r); (t ? i-- : ++i < o) && n(a[i], i, a) !== !1; )
      ;
    return r;
  };
}
var iD = oD, sD = gv, aD = iD, lD = aD(sD), id = lD, cD = Sl, uD = Ol, dD = 1, fD = 2;
function pD(e, t, r, n) {
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
      var p = new cD();
      if (n)
        var m = n(u, d, c, e, t, p);
      if (!(m === void 0 ? uD(d, u, dD | fD, n, p) : m))
        return !1;
    }
  }
  return !0;
}
var mD = pD, hD = nr;
function yD(e) {
  return e === e && !hD(e);
}
var vv = yD, gD = vv, vD = ps;
function bD(e) {
  for (var t = vD(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, gD(o)];
  }
  return t;
}
var $D = bD;
function SD(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var bv = SD, _D = mD, ED = $D, xD = bv;
function wD(e) {
  var t = ED(e);
  return t.length == 1 && t[0][2] ? xD(t[0][0], t[0][1]) : function(r) {
    return r === e || _D(r, e, t);
  };
}
var OD = wD;
function TD(e, t) {
  return e != null && t in Object(e);
}
var CD = TD, PD = CD, RD = mv;
function ID(e, t) {
  return e != null && RD(e, t, PD);
}
var $v = ID, ND = Ol, AD = Kg, jD = $v, kD = Gu, MD = vv, DD = bv, FD = eo, LD = 1, BD = 2;
function VD(e, t) {
  return kD(e) && MD(t) ? DD(FD(e), t) : function(r) {
    var n = AD(r, e);
    return n === void 0 && n === t ? jD(r, e) : ND(t, n, LD | BD);
  };
}
var zD = VD;
function UD(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var WD = UD, qD = hs;
function KD(e) {
  return function(t) {
    return qD(t, e);
  };
}
var HD = KD, GD = WD, YD = HD, XD = Gu, JD = eo;
function ZD(e) {
  return XD(e) ? GD(JD(e)) : YD(e);
}
var QD = ZD, eF = OD, tF = zD, rF = ys, nF = Lt, oF = QD;
function iF(e) {
  return typeof e == "function" ? e : e == null ? rF : typeof e == "object" ? nF(e) ? tF(e[0], e[1]) : eF(e) : oF(e);
}
var sd = iF;
function sF(e, t, r, n, o) {
  return o(e, function(i, a, l) {
    r = n ? (n = !1, i) : t(r, i, a, l);
  }), r;
}
var aF = sF, lF = Y2, cF = id, uF = sd, dF = aF, fF = Lt;
function pF(e, t, r) {
  var n = fF(e) ? lF : dF, o = arguments.length < 3;
  return n(e, uF(t), r, o, cF);
}
var mF = pF;
const hF = /* @__PURE__ */ pt(mF);
var yF = ys;
function gF(e) {
  return typeof e == "function" ? e : yF;
}
var Sv = gF, vF = /\s/;
function bF(e) {
  for (var t = e.length; t-- && vF.test(e.charAt(t)); )
    ;
  return t;
}
var $F = bF, SF = $F, _F = /^\s+/;
function EF(e) {
  return e && e.slice(0, SF(e) + 1).replace(_F, "");
}
var xF = EF, wF = xF, Km = nr, OF = ei, Hm = 0 / 0, TF = /^[-+]0x[0-9a-f]+$/i, CF = /^0b[01]+$/i, PF = /^0o[0-7]+$/i, RF = parseInt;
function IF(e) {
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
  e = wF(e);
  var r = CF.test(e);
  return r || PF.test(e) ? RF(e.slice(2), r ? 2 : 8) : TF.test(e) ? Hm : +e;
}
var NF = IF, AF = NF, Gm = 1 / 0, jF = 17976931348623157e292;
function kF(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = AF(e), e === Gm || e === -Gm) {
    var t = e < 0 ? -1 : 1;
    return t * jF;
  }
  return e === e ? e : 0;
}
var MF = kF, DF = MF;
function FF(e) {
  var t = DF(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var LF = FF, BF = jg, VF = Sv, zF = LF, UF = 9007199254740991, uc = 4294967295, WF = Math.min;
function qF(e, t) {
  if (e = zF(e), e < 1 || e > UF)
    return [];
  var r = uc, n = WF(e, uc);
  t = VF(t), e -= uc;
  for (var o = BF(n, t); ++r < e; )
    t(r);
  return o;
}
var KF = qF;
const _v = /* @__PURE__ */ pt(KF);
function Ev(e, t, r) {
  var n;
  if (e && r) {
    const o = Oe(e, r);
    if (o === void 0)
      return;
    for (let i = 0; i < t.length; i++) {
      const a = t[i], l = Oe(a, [Ot, r], {});
      if (!(l.type === "object" || l.type === "array") && (l.const === o || !((n = l.enum) === null || n === void 0) && n.includes(o)))
        return i;
    }
  }
}
function xv(e, t, r, n, o) {
  if (t === void 0)
    return 0;
  const i = Ev(t, r, o);
  if (hv(i))
    return i;
  for (let a = 0; a < r.length; a++) {
    const l = r[a];
    if (o && Jt(l, [Ot, o])) {
      const c = Oe(t, o), u = Oe(l, [Ot, o], {});
      if (e.isValid(u, c, n))
        return a;
    } else if (l[Ot]) {
      const c = {
        anyOf: Object.keys(l[Ot]).map((d) => ({
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
  return xv(e, t, r, n, o);
}
var HF = Ol;
function GF(e, t) {
  return HF(e, t);
}
var ld = GF;
const Hn = /* @__PURE__ */ pt(ld);
var YF = Qu, XF = ti, JF = xl, Ym = nr, ZF = eo;
function QF(e, t, r, n) {
  if (!Ym(e))
    return e;
  t = XF(t, e);
  for (var o = -1, i = t.length, a = i - 1, l = e; l != null && ++o < i; ) {
    var c = ZF(t[o]), u = r;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return e;
    if (o != a) {
      var d = l[c];
      u = n ? n(d, c, l) : void 0, u === void 0 && (u = Ym(d) ? d : JF(t[o + 1]) ? [] : {});
    }
    YF(l, c, u), l = l[c];
  }
  return e;
}
var wv = QF, eL = wv;
function tL(e, t, r) {
  return e == null ? e : eL(e, t, r);
}
var rL = tL;
const Kt = /* @__PURE__ */ pt(rL);
var nL = Ju, oL = tv, iL = gv, sL = sd, aL = hl, lL = Lt, cL = Zo, uL = vl, dL = nr, fL = fs;
function pL(e, t, r) {
  var n = lL(e), o = n || cL(e) || fL(e);
  if (t = sL(t), r == null) {
    var i = e && e.constructor;
    o ? r = n ? new i() : [] : dL(e) ? r = uL(i) ? oL(aL(e)) : {} : r = {};
  }
  return (o ? nL : iL)(e, function(a, l, c) {
    return t(r, a, l, c);
  }), r;
}
var mL = pL;
const hL = /* @__PURE__ */ pt(mL);
var yL = Zu, gL = Ho;
function vL(e, t, r) {
  (r !== void 0 && !gL(e[t], r) || r === void 0 && !(t in e)) && yL(e, t, r);
}
var Ov = vL, bL = Qn, $L = br;
function SL(e) {
  return $L(e) && bL(e);
}
var Rl = SL;
function _L(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Tv = _L, EL = ri, xL = ni;
function wL(e) {
  return EL(e, xL(e));
}
var OL = wL, Xm = Ov, TL = Jg, CL = ev, PL = Cl, RL = rv, Jm = ds, Zm = Lt, IL = Rl, NL = Zo, AL = vl, jL = nr, kL = Ko, ML = fs, Qm = Tv, DL = OL;
function FL(e, t, r, n, o, i, a) {
  var l = Qm(e, r), c = Qm(t, r), u = a.get(c);
  if (u) {
    Xm(e, r, u);
    return;
  }
  var d = i ? i(l, c, r + "", e, t, a) : void 0, p = d === void 0;
  if (p) {
    var m = Zm(c), f = !m && NL(c), y = !m && !f && ML(c);
    d = c, m || f || y ? Zm(l) ? d = l : IL(l) ? d = PL(l) : f ? (p = !1, d = TL(c, !0)) : y ? (p = !1, d = CL(c, !0)) : d = [] : kL(c) || Jm(c) ? (d = l, Jm(l) ? d = DL(l) : (!jL(l) || AL(l)) && (d = RL(c))) : p = !1;
  }
  p && (a.set(c, d), o(d, c, n, i, a), a.delete(c)), Xm(e, r, d);
}
var LL = FL, BL = Sl, VL = Ov, zL = yv, UL = LL, WL = nr, qL = ni, KL = Tv;
function Cv(e, t, r, n, o) {
  e !== t && zL(t, function(i, a) {
    if (o || (o = new BL()), WL(i))
      UL(e, t, a, r, Cv, n, o);
    else {
      var l = n ? n(KL(e, a), i, a + "", e, t, o) : void 0;
      l === void 0 && (l = i), VL(e, a, l);
    }
  }, qL);
}
var cd = Cv, HL = ys, GL = dv, YL = fv;
function XL(e, t) {
  return YL(GL(e, t, HL), e + "");
}
var _n = XL, JL = Ho, ZL = Qn, QL = xl, eB = nr;
function tB(e, t, r) {
  if (!eB(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? ZL(r) && QL(t, r.length) : n == "string" && t in r) ? JL(r[t], e) : !1;
}
var ud = tB, rB = _n, nB = ud;
function oB(e) {
  return rB(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && nB(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var l = r[n];
      l && e(t, l, n, i);
    }
    return t;
  });
}
var Pv = oB, iB = cd, sB = Pv, aB = sB(function(e, t, r) {
  iB(e, t, r);
}), lB = aB;
const cB = /* @__PURE__ */ pt(lB);
var uB = Pl, dB = 1 / 0;
function fB(e) {
  var t = e == null ? 0 : e.length;
  return t ? uB(e, dB) : [];
}
var dd = fB;
const pB = /* @__PURE__ */ pt(dd);
function mB(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
var hB = mB;
function yB(e) {
  return e !== e;
}
var gB = yB;
function vB(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
var bB = vB, $B = hB, SB = gB, _B = bB;
function EB(e, t, r) {
  return t === t ? _B(e, t, r) : $B(e, SB, r);
}
var Rv = EB, xB = Rv;
function wB(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && xB(e, t, 0) > -1;
}
var fd = wB;
function OB(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var pd = OB;
function TB() {
}
var CB = TB, dc = Lg, PB = CB, RB = Uu, IB = 1 / 0, NB = dc && 1 / RB(new dc([, -0]))[1] == IB ? function(e) {
  return new dc(e);
} : PB, AB = NB, jB = _l, kB = fd, MB = pd, DB = El, FB = AB, LB = Uu, BB = 200;
function VB(e, t, r) {
  var n = -1, o = kB, i = e.length, a = !0, l = [], c = l;
  if (r)
    a = !1, o = MB;
  else if (i >= BB) {
    var u = t ? null : FB(e);
    if (u)
      return LB(u);
    a = !1, o = DB, c = new jB();
  } else
    c = t ? [] : l;
  e:
    for (; ++n < i; ) {
      var d = e[n], p = t ? t(d) : d;
      if (d = r || d !== 0 ? d : 0, a && p === p) {
        for (var m = c.length; m--; )
          if (c[m] === p)
            continue e;
        t && c.push(p), l.push(d);
      } else
        o(c, p, r) || (c !== l && c.push(p), l.push(d));
    }
  return l;
}
var md = VB, zB = md;
function UB(e) {
  return e && e.length ? zB(e) : [];
}
var Il = UB;
const WB = /* @__PURE__ */ pt(Il);
var qB = sv, KB = 1, HB = 4;
function GB(e) {
  return qB(e, KB | HB);
}
var Iv = GB;
const Nv = /* @__PURE__ */ pt(Iv);
var YB = id, XB = Qn;
function JB(e, t) {
  var r = -1, n = XB(e) ? Array(e.length) : [];
  return YB(e, function(o, i, a) {
    n[++r] = t(o, i, a);
  }), n;
}
var ZB = JB;
function QB(e, t) {
  var r = e.length;
  for (e.sort(t); r--; )
    e[r] = e[r].value;
  return e;
}
var e5 = QB, eh = ei;
function t5(e, t) {
  if (e !== t) {
    var r = e !== void 0, n = e === null, o = e === e, i = eh(e), a = t !== void 0, l = t === null, c = t === t, u = eh(t);
    if (!l && !u && !i && e > t || i && a && c && !l && !u || n && a && c || !r && c || !o)
      return 1;
    if (!n && !i && !u && e < t || u && r && o && !n && !i || l && r && o || !a && o || !c)
      return -1;
  }
  return 0;
}
var r5 = t5, n5 = r5;
function o5(e, t, r) {
  for (var n = -1, o = e.criteria, i = t.criteria, a = o.length, l = r.length; ++n < a; ) {
    var c = n5(o[n], i[n]);
    if (c) {
      if (n >= l)
        return c;
      var u = r[n];
      return c * (u == "desc" ? -1 : 1);
    }
  }
  return e.index - t.index;
}
var i5 = o5, fc = nn, s5 = hs, a5 = sd, l5 = ZB, c5 = e5, u5 = Zn, d5 = i5, f5 = ys, p5 = Lt;
function m5(e, t, r) {
  t.length ? t = fc(t, function(i) {
    return p5(i) ? function(a) {
      return s5(a, i.length === 1 ? i[0] : i);
    } : i;
  }) : t = [f5];
  var n = -1;
  t = fc(t, u5(a5));
  var o = l5(e, function(i, a, l) {
    var c = fc(t, function(u) {
      return u(i);
    });
    return { criteria: c, index: ++n, value: i };
  });
  return c5(o, function(i, a) {
    return d5(i, a, r);
  });
}
var h5 = m5, y5 = Pl, g5 = h5, v5 = _n, th = ud, b5 = v5(function(e, t) {
  if (e == null)
    return [];
  var r = t.length;
  return r > 1 && th(e, t[0], t[1]) ? t = [] : r > 2 && th(t[0], t[1], t[2]) && (t = [t[0]]), g5(e, y5(t, 1), []);
}), Av = b5, $5 = md;
function S5(e, t) {
  return t = typeof t == "function" ? t : void 0, e && e.length ? $5(e, void 0, t) : [];
}
var hd = S5, _5 = _n, E5 = Ho, x5 = ud, w5 = ni, jv = Object.prototype, O5 = jv.hasOwnProperty, T5 = _5(function(e, t) {
  e = Object(e);
  var r = -1, n = t.length, o = n > 2 ? t[2] : void 0;
  for (o && x5(t[0], t[1], o) && (n = 1); ++r < n; )
    for (var i = t[r], a = w5(i), l = -1, c = a.length; ++l < c; ) {
      var u = a[l], d = e[u];
      (d === void 0 || E5(d, jv[u]) && !O5.call(e, u)) && (e[u] = i[u]);
    }
  return e;
}), C5 = T5, P5 = _l, R5 = fd, I5 = pd, N5 = nn, A5 = Zn, rh = El, j5 = Math.min;
function k5(e, t, r) {
  for (var n = r ? I5 : R5, o = e[0].length, i = e.length, a = i, l = Array(i), c = 1 / 0, u = []; a--; ) {
    var d = e[a];
    a && t && (d = N5(d, A5(t))), c = j5(d.length, c), l[a] = !r && (t || o >= 120 && d.length >= 120) ? new P5(a && d) : void 0;
  }
  d = e[0];
  var p = -1, m = l[0];
  e:
    for (; ++p < o && u.length < c; ) {
      var f = d[p], y = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, !(m ? rh(m, y) : n(u, y, r))) {
        for (a = i; --a; ) {
          var h = l[a];
          if (!(h ? rh(h, y) : n(e[a], y, r)))
            continue e;
        }
        m && m.push(y), u.push(f);
      }
    }
  return u;
}
var kv = k5, M5 = Rl;
function D5(e) {
  return M5(e) ? e : [];
}
var Mv = D5, F5 = nn, L5 = kv, B5 = _n, V5 = Mv, z5 = av, U5 = B5(function(e) {
  var t = z5(e), r = F5(e, V5);
  return t = typeof t == "function" ? t : void 0, t && r.pop(), r.length && r[0] === e[0] ? L5(r, void 0, t) : [];
}), Dv = U5, W5 = rn, q5 = br, K5 = "[object Boolean]";
function H5(e) {
  return e === !0 || e === !1 || q5(e) && W5(e) == K5;
}
var G5 = H5, Pr = ld, Y5 = Av, yd = Il, nh = hd, X5 = C5, J5 = Dv, Pa = Ko, pc = G5, oh = (e) => Array.isArray(e) ? e : [e], yr = (e) => e === void 0, Ls = (e) => Pa(e) || Array.isArray(e) ? Object.keys(e) : [], _o = (e, t) => e.hasOwnProperty(t), jo = (e) => Y5(yd(e)), ih = (e) => yr(e) || Array.isArray(e) && e.length === 0, Z5 = (e, t, r, n) => t && _o(t, r) && e && _o(e, r) && n(e[r], t[r]), mc = (e, t) => yr(e) && t === 0 || yr(t) && e === 0 || Pr(e, t), Q5 = (e, t) => yr(e) && t === !1 || yr(t) && e === !1 || Pr(e, t), sh = (e) => yr(e) || Pr(e, {}) || e === !0, Bs = (e) => yr(e) || Pr(e, {}), ah = (e) => yr(e) || Pa(e) || e === !0 || e === !1;
function lh(e, t) {
  return ih(e) && ih(t) ? !0 : Pr(jo(e), jo(t));
}
function eV(e, t) {
  return e = oh(e), t = oh(t), Pr(jo(e), jo(t));
}
function na(e, t, r, n) {
  var o = yd(Ls(e).concat(Ls(t)));
  return Bs(e) && Bs(t) ? !0 : Bs(e) && Ls(t).length || Bs(t) && Ls(e).length ? !1 : o.every(function(i) {
    var a = e[i], l = t[i];
    return Array.isArray(a) && Array.isArray(l) ? Pr(jo(e), jo(t)) : Array.isArray(a) && !Array.isArray(l) || Array.isArray(l) && !Array.isArray(a) ? !1 : Z5(e, t, i, n);
  });
}
function tV(e, t, r, n) {
  return Pa(e) && Pa(t) ? n(e, t) : Array.isArray(e) && Array.isArray(t) ? na(e, t, r, n) : Pr(e, t);
}
function hc(e, t, r, n) {
  var o = nh(e, n), i = nh(t, n), a = J5(o, i, n);
  return a.length === Math.max(o.length, i.length);
}
var rV = {
  title: Pr,
  uniqueItems: Q5,
  minLength: mc,
  minItems: mc,
  minProperties: mc,
  required: lh,
  enum: lh,
  type: eV,
  items: tV,
  anyOf: hc,
  allOf: hc,
  oneOf: hc,
  properties: na,
  patternProperties: na,
  dependencies: na
}, nV = [
  "properties",
  "patternProperties",
  "dependencies",
  "uniqueItems",
  "minLength",
  "minItems",
  "minProperties",
  "required"
], oV = ["additionalProperties", "additionalItems", "contains", "propertyNames", "not"];
function Zc(e, t, r) {
  if (r = X5(r, {
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
    if (oV.indexOf(i) !== -1)
      return Zc(a, l, r);
    var c = rV[i];
    if (c || (c = Pr), Pr(a, l))
      return !0;
    if (nV.indexOf(i) === -1 && (!_o(e, i) && _o(t, i) || _o(e, i) && !_o(t, i)))
      return a === l;
    var u = c(a, l, i, o);
    if (!pc(u))
      throw new Error("Comparer must return true or false");
    return u;
  });
}
var gd = Zc;
function iV(e) {
  return Object.prototype.toString.call(e) === "[object Array]";
}
var vd = Array.isArray || iV;
function sV(e) {
  return (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]") && e.valueOf() === e.valueOf();
}
var aV = sV, lV = aV;
function cV(e) {
  return lV(e) && e % 1 === 0;
}
var uV = cV, dV = vd, fV = uV;
function pV(e) {
  var t;
  if (!dV(e) || (t = e.length, !t))
    return !1;
  for (var r = 0; r < t; r++)
    if (!fV(e[r]))
      return !1;
  return !0;
}
var Fv = pV;
function mV(e) {
  return typeof e == "function";
}
var Lv = mV, hV = vd, ch = Fv, yV = Lv, Vs = Math.pow(2, 31) - 1;
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
function gV() {
  var e = arguments.length, t, r, n, o, i, a, l;
  for (t = new Array(e), l = 0; l < e; l++)
    t[l] = arguments[l];
  if (ch(t)) {
    if (e === 2)
      return i = t[0], a = t[1], i < 0 && (i = -i), a < 0 && (a = -a), i <= Vs && a <= Vs ? dh(i, a) : uh(i, a);
    n = t;
  } else if (hV(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !yV(r))
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
    a = n[l], a <= Vs && i <= Vs ? i = dh(i, a) : i = uh(i, a);
  return i;
}
var vV = gV, fh = vV, bV = vd, ph = Fv, $V = Lv;
function SV() {
  var e = arguments.length, t, r, n, o, i, a, l;
  for (t = new Array(e), l = 0; l < e; l++)
    t[l] = arguments[l];
  if (ph(t)) {
    if (e === 2)
      return i = t[0], a = t[1], i < 0 && (i = -i), a < 0 && (a = -a), i === 0 || a === 0 ? 0 : i / fh(i, a) * a;
    n = t;
  } else if (bV(t[0]))
    if (e > 1) {
      if (n = t[0], r = t[1], !$V(r))
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
var _V = SV, EV = cd, mh = nr;
function Bv(e, t, r, n, o, i) {
  return mh(e) && mh(t) && (i.set(t, e), EV(e, t, void 0, Bv, i), i.delete(t)), e;
}
var xV = Bv, wV = cd, OV = Pv, TV = OV(function(e, t, r, n) {
  wV(e, t, r, n);
}), CV = TV, PV = uv, RV = _n, IV = xV, NV = CV, AV = RV(function(e) {
  return e.push(void 0, IV), PV(NV, void 0, e);
}), jV = AV, kV = nn, MV = kv, DV = _n, FV = Mv, LV = DV(function(e) {
  var t = kV(e, FV);
  return t.length && t[0] === e[0] ? MV(t) : [];
}), BV = LV;
function VV(e, t, r, n) {
  for (var o = r - 1, i = e.length; ++o < i; )
    if (n(e[o], t))
      return o;
  return -1;
}
var zV = VV, UV = nn, WV = Rv, qV = zV, KV = Zn, HV = Cl, GV = Array.prototype, hh = GV.splice;
function YV(e, t, r, n) {
  var o = n ? qV : WV, i = -1, a = t.length, l = e;
  for (e === t && (t = HV(t)), r && (l = UV(e, KV(r))); ++i < a; )
    for (var c = 0, u = t[i], d = r ? r(u) : u; (c = o(l, d, c, n)) > -1; )
      l !== e && hh.call(l, c, 1), hh.call(e, c, 1);
  return e;
}
var XV = YV, JV = XV;
function ZV(e, t) {
  return e && e.length && t && t.length ? JV(e, t) : e;
}
var QV = ZV, ez = Ju, tz = id, rz = Sv, nz = Lt;
function oz(e, t) {
  var r = nz(e) ? ez : tz;
  return r(e, rz(t));
}
var Vv = oz, iz = _l, sz = fd, az = pd, lz = nn, cz = Zn, uz = El, dz = 200;
function fz(e, t, r, n) {
  var o = -1, i = sz, a = !0, l = e.length, c = [], u = t.length;
  if (!l)
    return c;
  r && (t = lz(t, cz(r))), n ? (i = az, a = !1) : t.length >= dz && (i = uz, a = !1, t = new iz(t));
  e:
    for (; ++o < l; ) {
      var d = e[o], p = r == null ? d : r(d);
      if (d = n || d !== 0 ? d : 0, a && p === p) {
        for (var m = u; m--; )
          if (t[m] === p)
            continue e;
        c.push(d);
      } else
        i(t, p, n) || c.push(d);
    }
  return c;
}
var pz = fz, mz = pz, hz = _n, yz = Rl, gz = hz(function(e, t) {
  return yz(e) ? mz(e, t) : [];
}), vz = gz;
const bz = td, $z = dd, zv = Ko, Sz = Il, _z = hd, Ez = vz;
function xz(e) {
  for (const t in e)
    Uv(e, t) && Wv(e[t]) && delete e[t];
  return e;
}
const wz = (e) => Sz($z(e.map(bd))), Oz = (e, t) => e.map((r) => r && r[t]), Uv = (e, t) => Object.prototype.hasOwnProperty.call(e, t), bd = (e) => zv(e) || Array.isArray(e) ? Object.keys(e) : [], Tz = (e) => e !== void 0, Cz = (e) => zv(e) || e === !0 || e === !1, Wv = (e) => !bd(e).length && e !== !1 && e !== !0, Pz = (e, ...t) => Ez.apply(null, [e].concat(bz(t)));
var qv = {
  allUniqueKeys: wz,
  deleteUndefinedProps: xz,
  getValues: Oz,
  has: Uv,
  isEmptySchema: Wv,
  isSchema: Cz,
  keys: bd,
  notUndefined: Tz,
  uniqWith: _z,
  withoutArr: Pz
};
const Rz = gd, Iz = Vv, {
  allUniqueKeys: Nz,
  deleteUndefinedProps: Az,
  getValues: jz,
  keys: $i,
  notUndefined: kz,
  uniqWith: Mz,
  withoutArr: yh
} = qv;
function Dz(e) {
  Iz(e, function(t, r) {
    t === !1 && delete e[r];
  });
}
function gh(e, t) {
  return Nz(e).reduce(function(n, o) {
    const i = jz(e, o), a = Mz(i.filter(kz), Rz);
    return n[o] = t(a, o), n;
  }, {});
}
var Fz = {
  keywords: ["properties", "patternProperties", "additionalProperties"],
  resolver(e, t, r, n) {
    n.ignoreAdditionalProperties || (e.forEach(function(i) {
      const a = e.filter((d) => d !== i), l = $i(i.properties), u = $i(i.patternProperties).map((d) => new RegExp(d));
      a.forEach(function(d) {
        const p = $i(d.properties), m = p.filter((y) => u.some((h) => h.test(y)));
        yh(p, l, m).forEach(function(y) {
          d.properties[y] = r.properties([
            d.properties[y],
            i.additionalProperties
          ], y);
        });
      });
    }), e.forEach(function(i) {
      const a = e.filter((c) => c !== i), l = $i(i.patternProperties);
      i.additionalProperties === !1 && a.forEach(function(c) {
        const u = $i(c.patternProperties);
        yh(u, l).forEach((p) => delete c.patternProperties[p]);
      });
    }));
    const o = {
      additionalProperties: r.additionalProperties(e.map((i) => i.additionalProperties)),
      patternProperties: gh(e.map((i) => i.patternProperties), r.patternProperties),
      properties: gh(e.map((i) => i.properties), r.properties)
    };
    return o.additionalProperties === !1 && Dz(o.properties), Az(o);
  }
};
const Lz = gd, Bz = Vv, {
  allUniqueKeys: Vz,
  deleteUndefinedProps: zz,
  has: Uz,
  isSchema: Kv,
  notUndefined: Hv,
  uniqWith: Wz
} = qv;
function qz(e) {
  Bz(e, function(t, r) {
    t === !1 && e.splice(r, 1);
  });
}
function Kz(e, t) {
  return e.map(function(r) {
    if (r)
      if (Array.isArray(r.items)) {
        const n = r.items[t];
        if (Kv(n))
          return n;
        if (Uz(r, "additionalItems"))
          return r.additionalItems;
      } else
        return r.items;
  });
}
function Hz(e) {
  return e.map(function(t) {
    if (t)
      return Array.isArray(t.items) ? t.additionalItems : t.items;
  });
}
function Gz(e, t, r) {
  return Vz(r).reduce(function(o, i) {
    const a = Kz(e, i), l = Wz(a.filter(Hv), Lz);
    return o[i] = t(l, i), o;
  }, []);
}
var Yz = {
  keywords: ["items", "additionalItems"],
  resolver(e, t, r) {
    const n = e.map((l) => l.items), o = n.filter(Hv), i = {};
    o.every(Kv) ? i.items = r.items(n) : i.items = Gz(e, r.items, n);
    let a;
    return o.every(Array.isArray) ? a = e.map((l) => l.additionalItems) : o.some(Array.isArray) && (a = Hz(e)), a && (i.additionalItems = r.additionalItems(a)), i.additionalItems === !1 && Array.isArray(i.items) && qz(i.items), zz(i);
  }
};
const Gv = Iv, Ra = gd, Xz = _V, Jz = jV, Yv = td, $d = dd, Zz = BV, Qz = Dv, Qc = ld, ko = Ko, eU = QV, Xv = Av, Sd = Il, Oo = hd, Jv = Fz, Zv = Yz, zs = (e, t) => e.indexOf(t) !== -1, tU = (e) => ko(e) || e === !0 || e === !1, rU = (e) => e === !1, Qv = (e) => e === !0, Nl = (e, t, r) => r(e), eb = (e) => Xv(Sd($d(e))), Ia = (e) => e !== void 0, tb = (e) => Sd($d(e.map(lU))), oi = (e) => e[0], nU = (e) => eb(e), gs = (e) => Math.max.apply(Math, e), vs = (e) => Math.min.apply(Math, e), oU = (e) => e.some(Qv), iU = (e) => Oo(Yv(e), Qc);
function sU(e) {
  return function(t, r) {
    return Ra({
      [e]: t
    }, { [e]: r });
  };
}
function rb(e) {
  let { allOf: t = [], ...r } = e;
  return r = ko(e) ? r : e, [r, ...t.map(rb)];
}
function nb(e, t) {
  return e.map((r) => r && r[t]);
}
function aU(e, t) {
  return e.map(function(r, n) {
    try {
      return t(r, n);
    } catch {
      return;
    }
  }).filter(Ia);
}
function lU(e) {
  return ko(e) || Array.isArray(e) ? Object.keys(e) : [];
}
function eu(e, t) {
  if (t = t || [], !e.length)
    return t;
  const r = e.slice(0).shift(), n = e.slice(1);
  return t.length ? eu(n, Yv(t.map((o) => r.map((i) => [i].concat(o))))) : eu(n, r.map((o) => o));
}
function ob(e, t) {
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
function cU(e, t, r, n, o, i) {
  if (e.length) {
    const a = o.complexResolvers[t];
    if (!a || !a.resolver)
      throw new Error("No resolver found for " + t);
    const l = r.map((p) => e.reduce((m, f) => (p[f] !== void 0 && (m[f] = p[f]), m), {})), c = Oo(l, Ra), u = a.keywords.reduce((p, m) => ({
      ...p,
      [m]: (f, y = []) => n(f, null, i.concat(m, y))
    }), {}), d = a.resolver(c, i.concat(t), u, o);
    return ko(d) || ob(c, i.concat(t)), d;
  }
}
function uU(e) {
  return { required: e };
}
const dU = ["properties", "patternProperties", "definitions", "dependencies"], fU = ["anyOf", "oneOf"], pU = [
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
      }), r = Zz.apply(null, t);
      if (r.length === 1)
        return r[0];
      if (r.length > 1)
        return Sd(r);
    }
  },
  dependencies(e, t, r) {
    return tb(e).reduce(function(o, i) {
      const a = nb(e, i);
      let l = Oo(a.filter(Ia), Qc);
      const c = l.filter(Array.isArray);
      if (c.length) {
        if (c.length === l.length)
          o[i] = eb(l);
        else {
          const u = l.filter(tU), d = c.map(uU);
          o[i] = r(u.concat(d), i);
        }
        return o;
      }
      return l = Oo(l, Ra), o[i] = r(l, i), o;
    }, {});
  },
  oneOf(e, t, r) {
    const n = eu(Gv(e)), o = aU(n, r), i = Oo(o, Ra);
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
    return Xz(t) / r;
  },
  enum(e) {
    const t = Qz.apply(null, e.concat(Qc));
    if (t.length)
      return Xv(t);
  }
};
it.$id = oi;
it.$ref = oi;
it.$schema = oi;
it.additionalItems = Nl;
it.additionalProperties = Nl;
it.anyOf = it.oneOf;
it.contains = Nl;
it.default = oi;
it.definitions = it.dependencies;
it.description = oi;
it.examples = iU;
it.exclusiveMaximum = vs;
it.exclusiveMinimum = gs;
it.items = Zv;
it.maximum = vs;
it.maxItems = vs;
it.maxLength = vs;
it.maxProperties = vs;
it.minimum = gs;
it.minItems = gs;
it.minLength = gs;
it.minProperties = gs;
it.properties = Jv;
it.propertyNames = Nl;
it.required = nU;
it.title = oi;
it.uniqueItems = oU;
const mU = {
  properties: Jv,
  items: Zv
};
function _d(e, t, r) {
  t = Jz(t, {
    ignoreAdditionalProperties: !1,
    resolvers: it,
    complexResolvers: mU,
    deep: !0
  });
  const n = Object.entries(t.complexResolvers);
  function o(l, c, u) {
    l = Gv(l.filter(Ia)), u = u || [];
    const d = ko(c) ? c : {};
    if (!l.length)
      return;
    if (l.some(rU))
      return !1;
    if (l.every(Qv))
      return !0;
    l = l.filter(ko);
    const p = tb(l);
    if (t.deep && zs(p, "allOf"))
      return _d({
        allOf: l
      }, t);
    const m = n.map(([f, y]) => p.filter((h) => y.keywords.includes(h)));
    return m.forEach((f) => eU(p, f)), p.forEach(function(f) {
      const y = nb(l, f), h = Oo(y.filter(Ia), sU(f));
      if (h.length === 1 && zs(fU, f))
        d[f] = h[0].map((g) => o([g], g));
      else if (h.length === 1 && !zs(dU, f) && !zs(pU, f))
        d[f] = h[0];
      else {
        const g = t.resolvers[f] || t.resolvers.defaultResolver;
        if (!g)
          throw new Error("No resolver found for key " + f + ". You can provide a resolver for this keyword in the options, or provide a default resolver.");
        const v = (S, _ = []) => o(S, null, u.concat(f, _));
        d[f] = g(h, u.concat(f), v, t), d[f] === void 0 ? ob(h, u.concat(f)) : d[f] === void 0 && delete d[f];
      }
    }), n.reduce((f, [y, h], g) => ({
      ...f,
      ...cU(m[g], y, l, o, t, u)
    }), d);
  }
  const i = $d(rb(e));
  return o(i);
}
_d.options = {
  resolvers: it
};
var hU = _d;
const yU = /* @__PURE__ */ pt(hU);
function Mo(e) {
  let t;
  const r = Oe(e, "discriminator.propertyName", void 0);
  return od(r) ? t = r : r !== void 0 && console.warn(`Expecting discriminator to be a string, got "${typeof r}" instead`), t;
}
function Zi(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : e == null ? "null" : typeof e == "boolean" ? "boolean" : isNaN(e) ? typeof e == "object" ? "object" : "string" : "number";
}
var gU = Pl, vU = _n, bU = md, $U = Rl, SU = vU(function(e) {
  return bU(gU(e, 1, $U, !0));
}), _U = SU;
const EU = /* @__PURE__ */ pt(_U);
function bn(e) {
  let { type: t } = e;
  return !t && e.const ? Zi(e.const) : !t && e.enum ? "string" : !t && (e.properties || e.additionalProperties) ? "object" : (Array.isArray(t) && (t.length === 2 && t.includes("null") ? t = t.find((r) => r !== "null") : t = t[0]), t);
}
function Qr(e, t) {
  const r = Object.assign({}, e);
  return Object.keys(t).reduce((n, o) => {
    const i = e ? e[o] : {}, a = t[o];
    return e && o in e && _t(a) ? n[o] = Qr(i, a) : e && t && (bn(e) === "object" || bn(t) === "object") && o === Kw && Array.isArray(i) && Array.isArray(a) ? n[o] = EU(i, a) : n[o] = a, n;
  }, r);
}
function ar(e, t, r = {}, n) {
  return Mr(e, t, r, n)[0];
}
function xU(e, t, r, n, o, i) {
  const { if: a, then: l, else: c, ...u } = t, d = e.isValid(a, i || {}, r);
  let p = [u], m = [];
  if (n)
    l && typeof l != "boolean" && (m = m.concat(Mr(e, l, r, i, n, o))), c && typeof c != "boolean" && (m = m.concat(Mr(e, c, r, i, n, o)));
  else {
    const f = d ? l : c;
    f && typeof f != "boolean" && (m = m.concat(Mr(e, f, r, i, n, o)));
  }
  return m.length && (p = m.map((f) => Qr(u, f))), p.flatMap((f) => Mr(e, f, r, i, n, o));
}
function ib(e) {
  return e.reduce(
    (r, n) => n.length > 1 ? n.flatMap((o) => _v(r.length, (i) => [...r[i]].concat(o))) : (r.forEach((o) => o.push(n[0])), r),
    [[]]
    // Start with an empty list
  );
}
function wU(e, t, r, n, o, i) {
  const a = sb(e, t, r, n, o, i);
  if (a.length > 1 || a[0] !== t)
    return a;
  if (ml in t)
    return ab(e, t, r, n, o, i).flatMap((c) => Mr(e, c, r, i, n, o));
  if (us in t && Array.isArray(t.allOf)) {
    const l = t.allOf.map((u) => Mr(e, u, r, i, n, o));
    return ib(l).map((u) => ({ ...t, allOf: u }));
  }
  return [t];
}
function sb(e, t, r, n, o, i) {
  const a = Qi(t, r, o);
  return a !== t ? Mr(e, a, r, i, n, o) : [t];
}
function Qi(e, t, r) {
  if (!_t(e))
    return e;
  let n = e;
  if (At in n) {
    const { $ref: o, ...i } = n;
    if (r.includes(o))
      return n;
    r.push(o), n = { ...nd(o, t), ...i };
  }
  if (Ot in n) {
    const o = [], i = hL(n[Ot], (a, l, c) => {
      const u = [...r];
      a[c] = Qi(l, t, u), o.push(u);
    }, {});
    cB(r, WB(pB(o))), n = { ...n, [Ot]: i };
  }
  return hn in n && !Array.isArray(n.items) && typeof n.items != "boolean" && (n = {
    ...n,
    items: Qi(n.items, t, r)
  }), Hn(e, n) ? e : n;
}
function OU(e, t, r, n) {
  const o = {
    ...t,
    properties: { ...t.properties }
  }, i = n && _t(n) ? n : {};
  return Object.keys(i).forEach((a) => {
    if (a in o.properties)
      return;
    let l = {};
    typeof o.additionalProperties != "boolean" ? At in o.additionalProperties ? l = ar(e, { $ref: Oe(o.additionalProperties, [At]) }, r, i) : "type" in o.additionalProperties ? l = { ...o.additionalProperties } : Ao in o.additionalProperties || yn in o.additionalProperties ? l = {
      type: "object",
      ...o.additionalProperties
    } : l = { type: Zi(Oe(i, [a])) } : l = { type: Zi(Oe(i, [a])) }, o.properties[a] = l, Kt(o.properties, [a, Wo], !0);
  }), o;
}
function Mr(e, t, r, n, o = !1, i = []) {
  return _t(t) ? wU(e, t, r, o, i, n).flatMap((l) => {
    let c = l;
    if (Ww in c)
      return xU(e, c, r, o, i, n);
    if (us in c) {
      if (o) {
        const { allOf: d, ...p } = c;
        return [...d, p];
      }
      try {
        c = yU(c, {
          deep: !1
        });
      } catch (d) {
        console.warn(`could not merge subschemas in allOf:
`, d);
        const { allOf: p, ...m } = c;
        return m;
      }
    }
    return qc in c && c.additionalProperties !== !1 ? OU(e, c, r, n) : c;
  }) : [{}];
}
function TU(e, t, r, n, o) {
  let i;
  const { oneOf: a, anyOf: l, ...c } = t;
  if (Array.isArray(a) ? i = a : Array.isArray(l) && (i = l), i) {
    const u = o === void 0 && n ? {} : o, d = Mo(t);
    i = i.map((m) => Qi(m, r, []));
    const p = ad(e, u, i, r, d);
    if (n)
      return i.map((m) => Qr(c, m));
    t = Qr(c, i[p]);
  }
  return [t];
}
function ab(e, t, r, n, o, i) {
  const { dependencies: a, ...l } = t;
  return TU(e, l, r, n, i).flatMap((u) => lb(e, a, u, r, n, o, i));
}
function lb(e, t, r, n, o, i, a) {
  let l = [r];
  for (const c in t) {
    if (!o && Oe(a, [c]) === void 0 || r.properties && !(c in r.properties))
      continue;
    const [u, d] = rd(c, t);
    return Array.isArray(d) ? l[0] = CU(r, d) : _t(d) && (l = PU(e, r, n, c, d, o, i, a)), l.flatMap((p) => lb(e, u, p, n, o, i, a));
  }
  return l;
}
function CU(e, t) {
  if (!t)
    return e;
  const r = Array.isArray(e.required) ? Array.from(/* @__PURE__ */ new Set([...e.required, ...t])) : t;
  return { ...e, required: r };
}
function PU(e, t, r, n, o, i, a, l) {
  return Mr(e, o, r, l, i, a).flatMap((u) => {
    const { oneOf: d, ...p } = u;
    if (t = Qr(t, p), d === void 0)
      return t;
    const m = d.map((y) => typeof y == "boolean" || !(At in y) ? [y] : sb(e, y, r, i, a, l));
    return ib(m).flatMap((y) => RU(e, t, r, n, y, i, a, l));
  });
}
function RU(e, t, r, n, o, i, a, l) {
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
    const d = u, [p] = rd(n, d.properties), m = { ...d, properties: p };
    return Mr(e, m, r, l, i, a).map((y) => Qr(t, y));
  });
}
const IU = {
  type: "object",
  $id: qw,
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
function tu(e, t, r, n = {}) {
  let o = 0;
  return r && (wr(r.properties) ? o += hF(r.properties, (i, a, l) => {
    const c = Oe(n, l);
    if (typeof a == "boolean")
      return i;
    if (Jt(a, At)) {
      const u = ar(e, a, t, c);
      return i + tu(e, t, u, c || {});
    }
    if ((Jt(a, yn) || Jt(a, Ao)) && c) {
      const u = Jt(a, yn) ? yn : Ao, d = Mo(a);
      return i + es(e, t, c, Oe(a, u), -1, d);
    }
    if (a.type === "object")
      return i + tu(e, t, a, c || {});
    if (a.type === Zi(c)) {
      let u = i + 1;
      return a.default ? u += c === a.default ? 1 : -1 : a.const && (u += c === a.const ? 1 : -1), u;
    }
    return i;
  }, 0) : od(r.type) && r.type === Zi(n) && (o += 1)), o;
}
function es(e, t, r, n, o = -1, i) {
  const a = n.map((p) => Qi(p, t, [])), l = Ev(r, n, i);
  if (hv(l))
    return l;
  const c = a.reduce((p, m, f) => (ad(e, r, [IU, m], t, i) === 1 && p.push(f), p), []);
  if (c.length === 1)
    return c[0];
  c.length || _v(a.length, (p) => c.push(p));
  const u = /* @__PURE__ */ new Set(), { bestIndex: d } = c.reduce((p, m) => {
    const { bestScore: f } = p, y = a[m], h = tu(e, t, y, r);
    return u.add(h), h > f ? { bestIndex: m, bestScore: h } : p;
  }, { bestIndex: o, bestScore: 0 });
  return u.size === 1 && o >= 0 ? o : d;
}
function ru(e) {
  return Array.isArray(e.items) && e.items.length > 0 && e.items.every((t) => _t(t));
}
function Na(e, t, r = !1) {
  if (Array.isArray(t)) {
    const n = Array.isArray(e) ? e : [], o = t.map((i, a) => n[a] ? Na(n[a], i, r) : i);
    return r && o.length < n.length && o.push(...n.slice(o.length)), o;
  }
  if (_t(t)) {
    const n = Object.assign({}, e);
    return Object.keys(t).reduce((o, i) => (o[i] = Na(e ? Oe(e, i) : {}, Oe(t, i), r), o), n);
  }
  return t;
}
function ii(e, t, r = !1) {
  return Object.keys(t).reduce((n, o) => {
    const i = e ? e[o] : {}, a = t[o];
    if (e && o in e && _t(a))
      n[o] = ii(i, a, r);
    else if (r && Array.isArray(i) && Array.isArray(a)) {
      let l = a;
      r === "preventDuplicates" && (l = a.reduce((c, u) => (i.includes(u) || c.push(u), c), [])), n[o] = i.concat(l);
    } else
      n[o] = a;
    return n;
  }, Object.assign({}, e));
}
function NU(e) {
  return Array.isArray(e.enum) && e.enum.length === 1 || _g in e;
}
function cb(e, t, r = {}) {
  const n = ar(e, t, r, void 0), o = n.oneOf || n.anyOf;
  return Array.isArray(n.enum) ? !0 : Array.isArray(o) ? o.every((i) => typeof i != "boolean" && NU(i)) : !1;
}
function Ed(e, t, r) {
  return !t.uniqueItems || !t.items || typeof t.items == "boolean" ? !1 : cb(e, t.items, r);
}
var Do;
(function(e) {
  e[e.Ignore = 0] = "Ignore", e[e.Invert = 1] = "Invert", e[e.Fallback = 2] = "Fallback";
})(Do || (Do = {}));
function yc(e, t = Do.Ignore, r = -1) {
  if (r >= 0) {
    if (Array.isArray(e.items) && r < e.items.length) {
      const n = e.items[r];
      if (typeof n != "boolean")
        return n;
    }
  } else if (e.items && !Array.isArray(e.items) && typeof e.items != "boolean")
    return e.items;
  return t !== Do.Ignore && _t(e.additionalItems) ? e.additionalItems : {};
}
function vh(e, t, r, n, o, i = [], a = {}) {
  const { emptyObjectFields: l = "populateAllDefaults" } = a;
  if (n)
    e[t] = r;
  else if (l !== "skipDefaults")
    if (_t(r)) {
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
  const p = _t(n) ? n : {}, m = _t(t) ? t : {};
  let f = r, y = null, h = a;
  if (_t(f) && _t(m.default))
    f = ii(f, m.default);
  else if (zw in m)
    f = m.default;
  else if (At in m) {
    const g = m[At];
    a.includes(g) || (h = a.concat(g), y = nd(g, o));
  } else if (ml in m)
    y = ab(e, m, o, !1, [], p)[0];
  else if (ru(m))
    f = m.items.map((g, v) => dn(e, g, {
      rootSchema: o,
      includeUndefinedValues: i,
      _recurseList: a,
      experimental_defaultFormStateBehavior: l,
      parentDefaults: Array.isArray(r) ? r[v] : void 0,
      rawFormData: p,
      required: c
    }));
  else if (yn in m) {
    const { oneOf: g, ...v } = m;
    if (g.length === 0)
      return;
    const S = Mo(m);
    y = g[es(e, o, Kn(p) ? void 0 : p, g, 0, S)], y = Qr(v, y);
  } else if (Ao in m) {
    const { anyOf: g, ...v } = m;
    if (g.length === 0)
      return;
    const S = Mo(m);
    y = g[es(e, o, Kn(p) ? void 0 : p, g, 0, S)], y = Qr(v, y);
  }
  if (y)
    return dn(e, y, {
      rootSchema: o,
      includeUndefinedValues: i,
      _recurseList: h,
      experimental_defaultFormStateBehavior: l,
      parentDefaults: f,
      rawFormData: p,
      required: c
    });
  switch (f === void 0 && (f = m.default), bn(m)) {
    case "object": {
      const g = (l == null ? void 0 : l.allOf) === "populateDefaults" && us in m ? ar(e, m, o, p) : m, v = Object.keys(g.properties || {}).reduce((S, _) => {
        var $;
        const b = dn(e, Oe(g, [Ot, _]), {
          rootSchema: o,
          _recurseList: a,
          experimental_defaultFormStateBehavior: l,
          includeUndefinedValues: i === !0,
          parentDefaults: Oe(f, [_]),
          rawFormData: Oe(p, [_]),
          required: ($ = g.required) === null || $ === void 0 ? void 0 : $.includes(_)
        });
        return vh(S, _, b, i, c, g.required, l), S;
      }, {});
      if (g.additionalProperties) {
        const S = _t(g.additionalProperties) ? g.additionalProperties : {}, _ = /* @__PURE__ */ new Set();
        _t(f) && Object.keys(f).filter((b) => !g.properties || !g.properties[b]).forEach((b) => _.add(b));
        const $ = [];
        Object.keys(p).filter((b) => !g.properties || !g.properties[b]).forEach((b) => {
          _.add(b), $.push(b);
        }), _.forEach((b) => {
          var x;
          const w = dn(e, S, {
            rootSchema: o,
            _recurseList: a,
            experimental_defaultFormStateBehavior: l,
            includeUndefinedValues: i === !0,
            parentDefaults: Oe(f, [b]),
            rawFormData: Oe(p, [b]),
            required: (x = g.required) === null || x === void 0 ? void 0 : x.includes(b)
          });
          vh(v, b, w, i, c, $);
        });
      }
      return v;
    }
    case "array": {
      const g = ((u = l == null ? void 0 : l.arrayMinItems) === null || u === void 0 ? void 0 : u.populate) === "never", v = ((d = l == null ? void 0 : l.arrayMinItems) === null || d === void 0 ? void 0 : d.populate) === "requiredOnly";
      if (Array.isArray(f) && (f = f.map((w, A) => {
        const j = yc(m, Do.Fallback, A);
        return dn(e, j, {
          rootSchema: o,
          _recurseList: a,
          experimental_defaultFormStateBehavior: l,
          parentDefaults: w,
          required: c
        });
      })), Array.isArray(n)) {
        const w = yc(m);
        g ? f = n : f = n.map((A, j) => dn(e, w, {
          rootSchema: o,
          _recurseList: a,
          experimental_defaultFormStateBehavior: l,
          rawFormData: A,
          parentDefaults: Oe(f, [j]),
          required: c
        }));
      }
      if (g)
        return f ?? [];
      if (v && !c)
        return f || void 0;
      const S = Array.isArray(f) ? f.length : 0;
      if (!m.minItems || Ed(e, m, o) || m.minItems <= S)
        return f || [];
      const _ = f || [], $ = yc(m, Do.Invert), b = $.default, x = new Array(m.minItems - S).fill(dn(e, $, {
        parentDefaults: b,
        rootSchema: o,
        _recurseList: a,
        experimental_defaultFormStateBehavior: l,
        required: c
      }));
      return _.concat(x);
    }
  }
  return f;
}
function ub(e, t, r, n, o = !1, i) {
  if (!_t(t))
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
  return _t(r) || Array.isArray(r) ? Na(l, r, c) : r;
}
function db(e = {}) {
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/#hidden-widgets
    "widget" in rt(e) && rt(e).widget !== "hidden"
  );
}
function fb(e, t, r = {}, n) {
  if (r[Lu] === "files")
    return !0;
  if (t.items) {
    const o = ar(e, t.items, n);
    return o.type === "string" && o.format === "data-url";
  }
  return !1;
}
function AU(e, t, r = {}, n, o) {
  const i = rt(r, o), { label: a = !0 } = i;
  let l = !!a;
  const c = bn(t);
  return c === "array" && (l = Ed(e, t, n) || fb(e, t, r, n) || db(r)), c === "object" && (l = !1), c === "boolean" && !r[Lu] && (l = !1), r[Hw] && (l = !1), l;
}
function jU(e, t, r) {
  if (!r)
    return t;
  const { errors: n, errorSchema: o } = t;
  let i = e.toErrorList(r), a = r;
  return Kn(o) || (a = ii(o, r, !0), i = [...n].concat(i)), { errorSchema: a, errors: i };
}
const mo = Symbol("no Value");
function nu(e, t, r, n, o = {}) {
  let i;
  if (Jt(r, Ot)) {
    const a = {};
    if (Jt(n, Ot)) {
      const u = Oe(n, Ot, {});
      Object.keys(u).forEach((d) => {
        Jt(o, d) && (a[d] = void 0);
      });
    }
    const l = Object.keys(Oe(r, Ot, {})), c = {};
    l.forEach((u) => {
      const d = Oe(o, u);
      let p = Oe(n, [Ot, u], {}), m = Oe(r, [Ot, u], {});
      Jt(p, At) && (p = ar(e, p, t, d)), Jt(m, At) && (m = ar(e, m, t, d));
      const f = Oe(p, "type"), y = Oe(m, "type");
      if (!f || f === y)
        if (Jt(a, u) && delete a[u], y === "object" || y === "array" && Array.isArray(d)) {
          const h = nu(e, t, m, p, d);
          (h !== void 0 || y === "array") && (c[u] = h);
        } else {
          const h = Oe(m, "default", mo), g = Oe(p, "default", mo);
          h !== mo && h !== d && (g === d ? a[u] = h : Oe(m, "readOnly") === !0 && (a[u] = void 0));
          const v = Oe(m, "const", mo), S = Oe(p, "const", mo);
          v !== mo && v !== d && (a[u] = S === d ? v : void 0);
        }
    }), i = {
      ...typeof o == "string" || Array.isArray(o) ? void 0 : o,
      ...a,
      ...c
    };
  } else if (Oe(n, "type") === "array" && Oe(r, "type") === "array" && Array.isArray(o)) {
    let a = Oe(n, "items"), l = Oe(r, "items");
    if (typeof a == "object" && typeof l == "object" && !Array.isArray(a) && !Array.isArray(l)) {
      Jt(a, At) && (a = ar(e, a, t, o)), Jt(l, At) && (l = ar(e, l, t, o));
      const c = Oe(a, "type"), u = Oe(l, "type");
      if (!c || c === u) {
        const d = Oe(r, "maxItems", -1);
        u === "object" ? i = o.reduce((p, m) => {
          const f = nu(e, t, l, a, m);
          return f !== void 0 && (d < 0 || p.length < d) && p.push(f), p;
        }, []) : i = d > 0 && o.length > d ? o.slice(0, d) : o;
      }
    } else
      typeof a == "boolean" && typeof l == "boolean" && a === l && (i = o);
  }
  return i;
}
function oa(e, t, r, n, o, i, a, l = []) {
  if (At in t || ml in t || us in t) {
    const d = ar(e, t, i, a);
    if (l.findIndex((m) => Hn(m, d)) === -1)
      return oa(e, d, r, n, o, i, a, l.concat(d));
  }
  if (hn in t && !Oe(t, [hn, At]))
    return oa(e, Oe(t, hn), r, n, o, i, a, l);
  const u = { $id: o || r };
  if (bn(t) === "object" && Ot in t)
    for (const d in t.properties) {
      const p = Oe(t, [Ot, d]), m = u[pn] + n + d;
      u[d] = oa(
        e,
        _t(p) ? p : {},
        r,
        n,
        m,
        i,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        Oe(a, [d]),
        l
      );
    }
  return u;
}
function kU(e, t, r, n, o, i = "root", a = "_") {
  return oa(e, t, i, a, r, n, o);
}
function Mn(e, t, r, n, o, i = []) {
  if (At in t || ml in t || us in t) {
    const l = ar(e, t, n, o);
    if (i.findIndex((u) => Hn(u, l)) === -1)
      return Mn(e, l, r, n, o, i.concat(l));
  }
  let a = {
    [ta]: r.replace(/^\./, "")
  };
  if (yn in t || Ao in t) {
    const l = yn in t ? t.oneOf : t.anyOf, c = Mo(t), u = es(e, n, o, l, 0, c), d = l[u];
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
  } else if (Ot in t)
    for (const l in t.properties) {
      const c = Oe(t, [Ot, l]);
      a[l] = Mn(
        e,
        c,
        `${r}.${l}`,
        n,
        // It's possible that formData is not an object -- this can happen if an
        // array item has just been added, but not populated with data yet
        Oe(o, [l]),
        i
      );
    }
  return a;
}
function MU(e, t, r = "", n, o) {
  return Mn(e, t, r, n, o);
}
class DU {
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
    return ub(this.validator, t, r, this.rootSchema, n, this.experimental_defaultFormStateBehavior);
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
    return AU(this.validator, t, r, this.rootSchema, n);
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
    return es(this.validator, this.rootSchema, t, r, n, o);
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
    return xv(this.validator, t, r, this.rootSchema, n);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */
  isFilesArray(t, r) {
    return fb(this.validator, t, r, this.rootSchema);
  }
  /** Checks to see if the `schema` combination represents a multi-select
   *
   * @param schema - The schema for which check for a multi-select flag is desired
   * @returns - True if schema contains a multi-select, otherwise false
   */
  isMultiSelect(t) {
    return Ed(this.validator, t, this.rootSchema);
  }
  /** Checks to see if the `schema` combination represents a select
   *
   * @param schema - The schema for which check for a select flag is desired
   * @returns - True if schema contains a select, otherwise false
   */
  isSelect(t) {
    return cb(this.validator, t, this.rootSchema);
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
    return jU(this.validator, t, r);
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
    return kU(this.validator, t, r, this.rootSchema, n, o, i);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */
  toPathSchema(t, r, n) {
    return MU(this.validator, t, r, this.rootSchema, n);
  }
}
function FU(e, t, r = {}) {
  return new DU(e, t, r);
}
function LU(e) {
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
function BU(e, t) {
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
function VU(e, t) {
  return BU(e, t);
}
function Ft(e, t = [], r) {
  if (Array.isArray(e))
    return e.map((i) => Ft(i, t)).filter((i) => i);
  const n = e === "" || e === null ? -1 : Number(e), o = t[n];
  return o ? o.value : r;
}
function pb(e, t, r = []) {
  const n = Ft(e, r);
  return Array.isArray(t) ? t.filter((o) => !Hn(o, n)) : Hn(n, t) ? void 0 : t;
}
function Al(e, t) {
  return Array.isArray(t) ? t.some((r) => Hn(r, e)) : Hn(t, e);
}
function xd(e, t = [], r = !1) {
  const n = t.map((o, i) => Al(o.value, e) ? String(i) : void 0).filter((o) => typeof o < "u");
  return r ? n : n[0];
}
function zU(e) {
  return e == null;
}
var UU = zU;
const WU = /* @__PURE__ */ pt(UU);
function mb(e, t, r = []) {
  const n = Ft(e, r);
  if (!WU(n)) {
    const o = r.findIndex((l) => n === l.value), i = r.map(({ value: l }) => l);
    return t.slice(0, o).concat(n, t.slice(o)).sort((l, c) => +(i.indexOf(l) > i.indexOf(c)));
  }
  return t;
}
class qU {
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
    let n = Array.isArray(t) && t.length > 0 || typeof t == "string" ? Oe(this.errorSchema, t) : this.errorSchema;
    return !n && t && (n = {}, Kt(this.errorSchema, t, n)), n;
  }
  /** Resets all errors in the `ErrorSchemaBuilder` back to the `initialSchema` if provided, otherwise an empty set.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */
  resetAllErrors(t) {
    return this.errorSchema = t ? Nv(t) : {}, this;
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
    let o = Oe(n, xr);
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
function hb(e) {
  const t = {};
  return e.multipleOf && (t.step = e.multipleOf), (e.minimum || e.minimum === 0) && (t.min = e.minimum), (e.maximum || e.maximum === 0) && (t.max = e.maximum), t;
}
function yb(e, t, r = {}, n = !0) {
  const o = {
    type: t || "text",
    ...hb(e)
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
function gb(e = {}) {
  const t = rt(e);
  if (t && t[Ea]) {
    const r = t[Ea];
    return { ...bh, ...r };
  }
  return bh;
}
function qe(e, t, r = {}) {
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
function KU(e) {
  let t = Oe(e, "MergedWidget");
  if (!t) {
    const r = e.defaultProps && e.defaultProps.options || {};
    t = ({ options: n, ...o }) => E.jsx(e, { options: { ...r, ...n }, ...o }), Kt(e, "MergedWidget", t);
  }
  return t;
}
function Gr(e, t, r = {}) {
  const n = bn(e);
  if (typeof t == "function" || t && tp.isForwardRef(gy(t)) || tp.isMemo(t))
    return KU(t);
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
function HU(e) {
  let t = 0;
  for (let r = 0; r < e.length; r += 1) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t = t & t;
  }
  return t.toString(16);
}
function GU(e) {
  const t = /* @__PURE__ */ new Set();
  return JSON.stringify(e, (r, n) => (t.add(r), n)), HU(JSON.stringify(e, Array.from(t).sort()));
}
function YU(e, t, r = {}) {
  try {
    return Gr(e, t, r), !0;
  } catch (n) {
    const o = n;
    if (o.message && (o.message.startsWith("No widget") || o.message.startsWith("Unsupported widget")))
      return !1;
    throw n;
  }
}
function bs(e, t) {
  return `${od(e) ? e : e[pn]}__${t}`;
}
function to(e) {
  return bs(e, "description");
}
function wd(e) {
  return bs(e, "error");
}
function ts(e) {
  return bs(e, "examples");
}
function Od(e) {
  return bs(e, "help");
}
function Td(e) {
  return bs(e, "title");
}
function or(e, t = !1) {
  const r = t ? ` ${ts(e)}` : "";
  return `${wd(e)} ${to(e)} ${Od(e)}${r}`;
}
function jl(e, t) {
  return `${e}-${t}`;
}
function En(e, t, r) {
  return t ? r : e;
}
function XU(e) {
  return e ? new Date(e).toJSON() : void 0;
}
function JU(e) {
  if (Uw in e && Array.isArray(e.enum) && e.enum.length === 1)
    return e.enum[0];
  if (_g in e)
    return e.const;
  throw new Error("schema cannot be inferred as a constant");
}
function Aa(e) {
  const t = e;
  if (t.enumNames && process.env.NODE_ENV !== "production" && console.warn("The enumNames property is deprecated and may be removed in a future major release."), e.enum)
    return e.enum.map((n, o) => ({ label: t.enumNames && t.enumNames[o] || String(n), value: n }));
  const r = e.oneOf || e.anyOf;
  return r && r.map((n) => {
    const o = n, i = JU(o), a = o.title || String(i);
    return {
      schema: o,
      label: a,
      value: i
    };
  });
}
function ZU(e, t) {
  if (!Array.isArray(t))
    return e;
  const r = (d) => d.reduce((p, m) => (p[m] = !0, p), {}), n = (d) => d.length > 1 ? `properties '${d.join("', '")}'` : `property '${d[0]}'`, o = r(e), i = t.filter((d) => d === "*" || o[d]), a = r(i), l = e.filter((d) => !a[d]), c = i.indexOf("*");
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
function QU(e, t, r) {
  const { props: n, state: o } = e;
  return !mr(n, t) || !mr(o, r);
}
function $h(e, t = !0) {
  const { year: r, month: n, day: o, hour: i = 0, minute: a = 0, second: l = 0 } = e, c = Date.UTC(r, n - 1, o, i, a, l), u = new Date(c).toJSON();
  return t ? u : u.slice(0, 10);
}
function rs(e, t = []) {
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
      Bu(i) && (n = n.concat(rs(i, [...t, o])));
    }
    return n;
  }, r);
}
var e4 = nn, t4 = Cl, r4 = Lt, n4 = ei, o4 = Ug, i4 = eo, s4 = qg;
function a4(e) {
  return r4(e) ? e4(e, i4) : n4(e) ? [e] : t4(o4(s4(e)));
}
var l4 = a4;
const vb = /* @__PURE__ */ pt(l4);
function c4(e) {
  const t = new qU();
  return e.length && e.forEach((r) => {
    const { property: n, message: o } = r, i = n === "." ? [] : vb(n);
    i.length > 0 && i[0] === "" && i.splice(0, 1), o && t.addErrors(o, i);
  }), t.ErrorSchema;
}
function bb(e) {
  return Object.keys(e).reduce((t, r) => {
    if (r === "addError")
      return t;
    {
      const n = e[r];
      return Bu(n) ? {
        ...t,
        [r]: bb(n)
      } : { ...t, [r]: n };
    }
  }, {});
}
function u4(e) {
  if (!e)
    return "";
  const t = new Date(e), r = fn(t.getFullYear(), 4), n = fn(t.getMonth() + 1, 2), o = fn(t.getDate(), 2), i = fn(t.getHours(), 2), a = fn(t.getMinutes(), 2), l = fn(t.getSeconds(), 2), c = fn(t.getMilliseconds(), 3);
  return `${r}-${n}-${o}T${i}:${a}:${l}.${c}`;
}
function ia(e, t) {
  if (!t)
    return e;
  const { errors: r, errorSchema: n } = e;
  let o = rs(t), i = t;
  return Kn(n) || (i = ii(n, t, !0), o = [...r].concat(o)), { errorSchema: i, errors: o };
}
function d4(e) {
  for (const t in e) {
    const r = e, n = r[t];
    t === At && typeof n == "string" && n.startsWith("#") ? r[t] = Eg + n : r[t] = Cd(n);
  }
  return e;
}
function f4(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = Cd(e[t]);
  return e;
}
function Cd(e) {
  return Array.isArray(e) ? f4([...e]) : wr(e) ? d4({ ...e }) : e;
}
var Ze;
(function(e) {
  e.ArrayItemTitle = "Item", e.MissingItems = "Missing items definition", e.YesLabel = "Yes", e.NoLabel = "No", e.CloseLabel = "Close", e.ErrorsLabel = "Errors", e.NewStringDefault = "New Value", e.AddButton = "Add", e.AddItemButton = "Add Item", e.CopyButton = "Copy", e.MoveDownButton = "Move down", e.MoveUpButton = "Move up", e.RemoveButton = "Remove", e.NowLabel = "Now", e.ClearLabel = "Clear", e.AriaDateLabel = "Select a date", e.PreviewLabel = "Preview", e.DecrementAriaLabel = "Decrease value by 1", e.IncrementAriaLabel = "Increase value by 1", e.UnknownFieldType = "Unknown field type %1", e.OptionPrefix = "Option %1", e.TitleOptionPrefix = "%1 option %2", e.KeyLabel = "%1 Key", e.InvalidObjectField = 'Invalid "%1" object field configuration: <em>%2</em>.', e.UnsupportedField = "Unsupported field schema.", e.UnsupportedFieldWithId = "Unsupported field schema for field <code>%1</code>.", e.UnsupportedFieldWithReason = "Unsupported field schema: <em>%1</em>.", e.UnsupportedFieldWithIdAndReason = "Unsupported field schema for field <code>%1</code>: <em>%2</em>.", e.FilesInfo = "<strong>%1</strong> (%2, %3 bytes)";
})(Ze || (Ze = {}));
var p4 = hs, m4 = wv, h4 = ti;
function y4(e, t, r) {
  for (var n = -1, o = t.length, i = {}; ++n < o; ) {
    var a = t[n], l = p4(e, a);
    r(l, a) && m4(i, h4(a, e), l);
  }
  return i;
}
var g4 = y4, v4 = g4, b4 = $v;
function $4(e, t) {
  return v4(e, t, function(r, n) {
    return b4(e, n);
  });
}
var S4 = $4, _4 = S4, E4 = pv, x4 = E4(function(e, t) {
  return e == null ? {} : _4(e, t);
}), w4 = x4;
const O4 = /* @__PURE__ */ pt(w4);
let T4 = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), "");
function ou() {
  return T4();
}
function Sh(e) {
  return Array.isArray(e) ? e.map((t) => ({
    key: ou(),
    item: t
  })) : [];
}
function Si(e) {
  return Array.isArray(e) ? e.map((t) => t.item) : [];
}
class C4 extends is {
  /** Constructs an `ArrayField` from the `props`, generating the initial keyed data from the `formData`
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(t) {
    super(t), this._getNewFormDataRow = () => {
      const { schema: o, registry: i } = this.props, { schemaUtils: a } = i;
      let l = o.items;
      return ru(o) && Vw(o) && (l = o.additionalItems), a.getDefaultFormState(l);
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
        for (const m in l) {
          const f = parseInt(m);
          f <= o ? Kt(u, [f], l[m]) : f > o && Kt(u, [f + 1], l[m]);
        }
      }
      const d = {
        key: ou(),
        item: Nv(c[o].item)
      }, p = [...c];
      o !== void 0 ? p.splice(o + 1, 0, d) : p.push(d), this.setState({
        keyedFormData: p,
        updatedKeyedFormData: !0
      }, () => a(Si(p), u));
    }, this.onDropIndexClick = (o) => (i) => {
      i && i.preventDefault();
      const { onChange: a, errorSchema: l } = this.props, { keyedFormData: c } = this.state;
      let u;
      if (l) {
        u = {};
        for (const p in l) {
          const m = parseInt(p);
          m < o ? Kt(u, [m], l[p]) : m > o && Kt(u, [m - 1], l[p]);
        }
      }
      const d = c.filter((p, m) => m !== o);
      this.setState({
        keyedFormData: d,
        updatedKeyedFormData: !0
      }, () => a(Si(d), u));
    }, this.onReorderClick = (o, i) => (a) => {
      a && (a.preventDefault(), a.currentTarget.blur());
      const { onChange: l, errorSchema: c } = this.props;
      let u;
      if (c) {
        u = {};
        for (const f in c) {
          const y = parseInt(f);
          y == o ? Kt(u, [i], c[o]) : y == i ? Kt(u, [o], c[i]) : Kt(u, [f], c[y]);
        }
      }
      const { keyedFormData: d } = this.state;
      function p() {
        const f = d.slice();
        return f.splice(o, 1), f.splice(i, 0, d[o]), f;
      }
      const m = p();
      this.setState({
        keyedFormData: m
      }, () => l(Si(m), u));
    }, this.onChangeForIndex = (o) => (i, a, l) => {
      const { formData: c, onChange: u, errorSchema: d } = this.props, m = (Array.isArray(c) ? c : []).map((f, y) => o === y ? typeof i > "u" ? null : i : f);
      u(m, d && d && {
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
    return Oe(t, [hn, "title"], Oe(t, [hn, "description"], n(Ze.ArrayItemTitle)));
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
    }, () => n(Si(c), a));
  }
  /** Renders the `ArrayField` depending on the specific needs of the schema and uischema elements
   */
  render() {
    const { schema: t, uiSchema: r, idSchema: n, registry: o } = this.props, { schemaUtils: i, translateString: a } = o;
    if (!(hn in t)) {
      const l = rt(r), c = qe("UnsupportedFieldTemplate", o, l);
      return E.jsx(c, { schema: t, idSchema: n, reason: a(Ze.MissingItems), registry: o });
    }
    return i.isMultiSelect(t) ? this.renderMultiSelect() : db(r) ? this.renderCustomWidget() : ru(t) ? this.renderFixedArray() : i.isFilesArray(t, r) ? this.renderFiles() : this.renderNormalArray();
  }
  /** Renders a normal array without any limitations of length
   */
  renderNormalArray() {
    const { schema: t, uiSchema: r = {}, errorSchema: n, idSchema: o, name: i, disabled: a = !1, readonly: l = !1, autofocus: c = !1, required: u = !1, registry: d, onBlur: p, onFocus: m, idPrefix: f, idSeparator: y = "_", rawErrors: h } = this.props, { keyedFormData: g } = this.state, v = t.title === void 0 ? i : t.title, { schemaUtils: S, formContext: _ } = d, $ = rt(r), b = wr(t.items) ? t.items : {}, x = S.retrieveSchema(b), w = Si(this.state.keyedFormData), A = this.canAddItem(w), j = {
      canAdd: A,
      items: g.map((K, U) => {
        const { key: H, item: z } = K, G = z, X = S.retrieveSchema(b, G), J = n ? n[U] : void 0, Z = o.$id + y + U, ne = S.toIdSchema(X, Z, G, f, y);
        return this.renderArrayFieldItem({
          key: H,
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
          onFocus: m,
          rawErrors: h,
          totalItems: g.length
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
      formContext: _,
      formData: w,
      rawErrors: h,
      registry: d
    }, k = qe("ArrayFieldTemplate", d, $);
    return E.jsx(k, { ...j });
  }
  /** Renders an array using the custom widget provided by the user in the `uiSchema`
   */
  renderCustomWidget() {
    var t;
    const { schema: r, idSchema: n, uiSchema: o, disabled: i = !1, readonly: a = !1, autofocus: l = !1, required: c = !1, hideError: u, placeholder: d, onBlur: p, onFocus: m, formData: f = [], registry: y, rawErrors: h, name: g } = this.props, { widgets: v, formContext: S, globalUiOptions: _, schemaUtils: $ } = y, { widget: b, title: x, ...w } = rt(o, _), A = Gr(r, b, v), j = (t = x ?? r.title) !== null && t !== void 0 ? t : g, k = $.getDisplayLabel(r, o, _);
    return E.jsx(A, { id: n.$id, name: g, multiple: !0, onChange: this.onSelectChange, onBlur: p, onFocus: m, options: w, schema: r, uiSchema: o, registry: y, value: f, disabled: i, readonly: a, hideError: u, required: c, label: j, hideLabel: !k, placeholder: d, formContext: S, autofocus: l, rawErrors: h });
  }
  /** Renders an array as a set of checkboxes
   */
  renderMultiSelect() {
    var t;
    const { schema: r, idSchema: n, uiSchema: o, formData: i = [], disabled: a = !1, readonly: l = !1, autofocus: c = !1, required: u = !1, placeholder: d, onBlur: p, onFocus: m, registry: f, rawErrors: y, name: h } = this.props, { widgets: g, schemaUtils: v, formContext: S, globalUiOptions: _ } = f, $ = v.retrieveSchema(r.items, i), b = Aa($), { widget: x = "select", title: w, ...A } = rt(o, _), j = Gr(r, x, g), k = (t = w ?? r.title) !== null && t !== void 0 ? t : h, K = v.getDisplayLabel(r, o, _);
    return E.jsx(j, { id: n.$id, name: h, multiple: !0, onChange: this.onSelectChange, onBlur: p, onFocus: m, options: { ...A, enumOptions: b }, schema: r, uiSchema: o, registry: f, value: i, disabled: a, readonly: l, required: u, label: k, hideLabel: !K, placeholder: d, formContext: S, autofocus: c, rawErrors: y });
  }
  /** Renders an array of files using the `FileWidget`
   */
  renderFiles() {
    var t;
    const { schema: r, uiSchema: n, idSchema: o, name: i, disabled: a = !1, readonly: l = !1, autofocus: c = !1, required: u = !1, onBlur: d, onFocus: p, registry: m, formData: f = [], rawErrors: y } = this.props, { widgets: h, formContext: g, globalUiOptions: v, schemaUtils: S } = m, { widget: _ = "files", title: $, ...b } = rt(n, v), x = Gr(r, _, h), w = (t = $ ?? r.title) !== null && t !== void 0 ? t : i, A = S.getDisplayLabel(r, n, v);
    return E.jsx(x, { options: b, id: o.$id, name: i, multiple: !0, onChange: this.onSelectChange, onBlur: d, onFocus: p, schema: r, uiSchema: n, value: f, disabled: a, readonly: l, required: u, registry: m, formContext: g, autofocus: c, rawErrors: y, label: w, hideLabel: !A });
  }
  /** Renders an array that has a maximum limit of items
   */
  renderFixedArray() {
    const { schema: t, uiSchema: r = {}, formData: n = [], errorSchema: o, idPrefix: i, idSeparator: a = "_", idSchema: l, name: c, disabled: u = !1, readonly: d = !1, autofocus: p = !1, required: m = !1, registry: f, onBlur: y, onFocus: h, rawErrors: g } = this.props, { keyedFormData: v } = this.state;
    let { formData: S = [] } = this.props;
    const _ = t.title || c, $ = rt(r), { schemaUtils: b, formContext: x } = f, A = (wr(t.items) ? t.items : []).map((H, z) => b.retrieveSchema(H, n[z])), j = wr(t.additionalItems) ? b.retrieveSchema(t.additionalItems, n) : null;
    (!S || S.length < A.length) && (S = S || [], S = S.concat(new Array(A.length - S.length)));
    const k = this.canAddItem(S) && !!j, K = {
      canAdd: k,
      className: "field field-array field-array-fixed-items",
      disabled: u,
      idSchema: l,
      formData: n,
      items: v.map((H, z) => {
        const { key: G, item: X } = H, J = X, Z = z >= A.length, ne = (Z && wr(t.additionalItems) ? b.retrieveSchema(t.additionalItems, J) : A[z]) || {}, D = l.$id + a + z, N = b.toIdSchema(ne, D, J, i, a), W = Z ? r.additionalItems || {} : Array.isArray(r.items) ? r.items[z] : r.items || {}, F = o ? o[z] : void 0;
        return this.renderArrayFieldItem({
          key: G,
          index: z,
          name: c && `${c}-${z}`,
          canAdd: k,
          canRemove: Z,
          canMoveUp: z >= A.length + 1,
          canMoveDown: Z && z < S.length - 1,
          itemSchema: ne,
          itemData: J,
          itemUiSchema: W,
          itemIdSchema: N,
          itemErrorSchema: F,
          autofocus: p && z === 0,
          onBlur: y,
          onFocus: h,
          rawErrors: g,
          totalItems: v.length
        });
      }),
      onAddClick: this.onAddClick,
      readonly: d,
      required: m,
      registry: f,
      schema: t,
      uiSchema: r,
      title: _,
      formContext: x,
      rawErrors: g
    }, U = qe("ArrayFieldTemplate", f, $);
    return E.jsx(U, { ...K });
  }
  /** Renders the individual array item using a `SchemaField` along with the additional properties required to be send
   * back to the `ArrayFieldItemTemplate`.
   *
   * @param props - The props for the individual array item to be rendered
   */
  renderArrayFieldItem(t) {
    const { key: r, index: n, name: o, canAdd: i, canRemove: a = !0, canMoveUp: l, canMoveDown: c, itemSchema: u, itemData: d, itemUiSchema: p, itemIdSchema: m, itemErrorSchema: f, autofocus: y, onBlur: h, onFocus: g, rawErrors: v, totalItems: S } = t, { disabled: _, hideError: $, idPrefix: b, idSeparator: x, readonly: w, uiSchema: A, registry: j, formContext: k } = this.props, { fields: { ArraySchemaField: K, SchemaField: U }, globalUiOptions: H } = j, z = K || U, { orderable: G = !0, removable: X = !0, copyable: J = !1 } = rt(A, H), Z = {
      moveUp: G && l,
      moveDown: G && c,
      copy: J && i,
      remove: X && a,
      toolbar: !1
    };
    return Z.toolbar = Object.keys(Z).some((ne) => Z[ne]), {
      children: E.jsx(z, { name: o, index: n, schema: u, uiSchema: p, formData: d, formContext: k, errorSchema: f, idPrefix: b, idSeparator: x, idSchema: m, required: this.isItemRequired(u), onChange: this.onChangeForIndex(n), onBlur: h, onFocus: g, registry: j, disabled: _, readonly: w, hideError: $, autofocus: y, rawErrors: v }),
      className: "array-item",
      disabled: _,
      canAdd: i,
      hasCopy: Z.copy,
      hasToolbar: Z.toolbar,
      hasMoveUp: Z.moveUp,
      hasMoveDown: Z.moveDown,
      hasRemove: Z.remove,
      index: n,
      totalItems: S,
      key: r,
      onAddIndexClick: this.onAddIndexClick,
      onCopyIndexClick: this.onCopyIndexClick,
      onDropIndexClick: this.onDropIndexClick,
      onReorderClick: this.onReorderClick,
      readonly: w,
      registry: j,
      schema: u,
      uiSchema: p
    };
  }
}
function P4(e) {
  var t, r;
  const { schema: n, name: o, uiSchema: i, idSchema: a, formData: l, registry: c, required: u, disabled: d, readonly: p, hideError: m, autofocus: f, onChange: y, onFocus: h, onBlur: g, rawErrors: v } = e, { title: S } = n, { widgets: _, formContext: $, translateString: b, globalUiOptions: x } = c, {
    widget: w = "checkbox",
    title: A,
    // Unlike the other fields, don't use `getDisplayLabel()` since it always returns false for the boolean type
    label: j = !0,
    ...k
  } = rt(i, x), K = Gr(n, w, _), U = b(Ze.YesLabel), H = b(Ze.NoLabel);
  let z;
  const G = (t = A ?? S) !== null && t !== void 0 ? t : o;
  if (Array.isArray(n.oneOf))
    z = Aa({
      oneOf: n.oneOf.map((X) => {
        if (wr(X))
          return {
            ...X,
            title: X.title || (X.const === !0 ? U : H)
          };
      }).filter((X) => X)
      // cast away the error that typescript can't grok is fixed
    });
  else {
    const X = n, J = (r = n.enum) !== null && r !== void 0 ? r : [!0, !1];
    !X.enumNames && J.length === 2 && J.every((Z) => typeof Z == "boolean") ? z = [
      {
        value: J[0],
        label: J[0] ? U : H
      },
      {
        value: J[1],
        label: J[1] ? U : H
      }
    ] : z = Aa({
      enum: J,
      // NOTE: enumNames is deprecated, but still supported for now.
      enumNames: X.enumNames
    });
  }
  return E.jsx(K, { options: { ...k, enumOptions: z }, schema: n, uiSchema: i, id: a.$id, name: o, onChange: y, onFocus: h, onBlur: g, label: G, hideLabel: !j, value: l, required: u, disabled: d, readonly: p, hideError: m, registry: c, formContext: $, autofocus: f, rawErrors: v });
}
class _h extends is {
  /** Constructs an `AnyOfField` with the given `props` to initialize the initially selected option in state
   *
   * @param props - The `FieldProps` for this template
   */
  constructor(t) {
    super(t), this.onOptionChange = (a) => {
      const { selectedOption: l, retrievedOptions: c } = this.state, { formData: u, onChange: d, registry: p } = this.props, { schemaUtils: m } = p, f = a !== void 0 ? parseInt(a, 10) : -1;
      if (f === l)
        return;
      const y = f >= 0 ? c[f] : void 0, h = l >= 0 ? c[l] : void 0;
      let g = m.sanitizeDataForNewSchema(y, h, u);
      g && y && (g = m.getDefaultFormState(y, g, "excludeObjectChildren")), d(g, void 0, this.getFieldId()), this.setState({ selectedOption: f });
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
    const { schema: o, registry: { schemaUtils: i } } = this.props, a = Mo(o);
    return i.getClosestMatchingOption(r, n, t, a);
  }
  getFieldId() {
    const { idSchema: t, schema: r } = this.props;
    return `${t.$id}${r.oneOf ? "__oneof_select" : "__anyof_select"}`;
  }
  /** Renders the `AnyOfField` selector along with a `SchemaField` for the value of the `formData`
   */
  render() {
    const { name: t, disabled: r = !1, errorSchema: n = {}, formContext: o, onBlur: i, onFocus: a, registry: l, schema: c, uiSchema: u } = this.props, { widgets: d, fields: p, translateString: m, globalUiOptions: f, schemaUtils: y } = l, { SchemaField: h } = p, { selectedOption: g, retrievedOptions: v } = this.state, { widget: S = "select", placeholder: _, autofocus: $, autocomplete: b, title: x = c.title, ...w } = rt(u, f), A = Gr({ type: "number" }, S, d), j = Oe(n, xr, []), k = Ca(n, [xr]), K = y.getDisplayLabel(c, u, f), U = g >= 0 && v[g] || null;
    let H;
    if (U) {
      const { required: J } = c;
      H = J ? Qr({ required: J }, U) : U;
    }
    const z = x ? Ze.TitleOptionPrefix : Ze.OptionPrefix, G = x ? [x] : [], X = v.map((J, Z) => ({
      label: J.title || m(z, G.concat(String(Z + 1))),
      value: Z
    }));
    return E.jsxs("div", { className: "panel panel-default panel-body", children: [E.jsx("div", { className: "form-group", children: E.jsx(A, { id: this.getFieldId(), name: `${t}${c.oneOf ? "__oneof_select" : "__anyof_select"}`, schema: { type: "number", default: 0 }, onChange: this.onOptionChange, onBlur: i, onFocus: a, disabled: r || Kn(X), multiple: !1, rawErrors: j, errorSchema: k, value: g >= 0 ? g : void 0, options: { enumOptions: X, ...w }, registry: l, formContext: o, placeholder: _, autocomplete: b, autofocus: $, label: x ?? t, hideLabel: !K }) }), U !== null && E.jsx(h, { ...this.props, schema: H })] });
  }
}
const R4 = /\.([0-9]*0)*$/, I4 = /[0.]0*$/;
function N4(e) {
  const { registry: t, onChange: r, formData: n, value: o } = e, [i, a] = Vo(o), { StringField: l } = t.fields;
  let c = n;
  const u = $t((d) => {
    a(d), `${d}`.charAt(0) === "." && (d = `0${d}`);
    const p = typeof d == "string" && d.match(R4) ? rm(d.replace(I4, "")) : rm(d);
    r(p);
  }, [r]);
  if (typeof i == "string" && typeof c == "number") {
    const d = new RegExp(`${c}`.replace(".", "\\.") + "\\.?0*$");
    i.match(d) && (c = i);
  }
  return E.jsx(l, { ...e, formData: c, onChange: u });
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
const A4 = ["children", "options"], Eh = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), xh = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, j4 = ["style", "script"], k4 = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, M4 = /mailto:/i, D4 = /\n{2,}$/, $b = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, F4 = /^ *> ?/gm, L4 = /^ {2,}\n/, B4 = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Sb = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, _b = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, V4 = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, z4 = /^(?:\n *)*\n/, U4 = /\r\n?/g, W4 = /^\[\^([^\]]+)](:.*)\n/, q4 = /^\[\^([^\]]+)]/, K4 = /\f/g, H4 = /^\s*?\[(x|\s)\]/, Eb = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, xb = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, wb = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, iu = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, G4 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Ob = /^<!--[\s\S]*?(?:-->)/, Y4 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, su = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, X4 = /^\{.*\}$/, J4 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Z4 = /^<([^ >]+@[^ >]+)>/, Q4 = /^<([^ >]+:\/[^ >]+)>/, e3 = /-([a-z])?/gi, Tb = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, t3 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, r3 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, n3 = /^\[([^\]]*)\] ?\[([^\]]*)\]/, o3 = /(\[|\])/g, i3 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, s3 = /\t/g, a3 = /^ *\| */, l3 = /(^ *\||\| *$)/g, c3 = / *$/, u3 = /^ *:-+: *$/, d3 = /^ *:-+ *$/, f3 = /^ *-+: *$/, p3 = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, m3 = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, h3 = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, y3 = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, g3 = /^\\([^0-9A-Za-z\s])/, v3 = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, b3 = /^\n+/, $3 = /^([ \t]*)/, S3 = /\\([^\\])/g, wh = / *\n+$/, _3 = /(?:^|\n)( *)$/, Pd = "(?:\\d+\\.)", Rd = "(?:[*+-])";
function Cb(e) {
  return "( *)(" + (e === 1 ? Pd : Rd) + ") +";
}
const Pb = Cb(1), Rb = Cb(2);
function Ib(e) {
  return new RegExp("^" + (e === 1 ? Pb : Rb));
}
const E3 = Ib(1), x3 = Ib(2);
function Nb(e) {
  return new RegExp("^" + (e === 1 ? Pb : Rb) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Pd : Rd) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Ab = Nb(1), jb = Nb(2);
function kb(e) {
  const t = e === 1 ? Pd : Rd;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Mb = kb(1), Db = kb(2);
function Oh(e, t) {
  const r = t === 1, n = r ? Mb : Db, o = r ? Ab : jb, i = r ? E3 : x3;
  return { t(a, l, c) {
    const u = _3.exec(c);
    return u && (l.o || !l._ && !l.u) ? n.exec(a = u[1] + a) : null;
  }, i: Xe.HIGH, l(a, l, c) {
    const u = r ? +a[2] : void 0, d = a[0].replace(D4, `
`).match(o);
    let p = !1;
    return { p: d.map(function(m, f) {
      const y = i.exec(m)[0].length, h = new RegExp("^ {1," + y + "}", "gm"), g = m.replace(h, "").replace(i, ""), v = f === d.length - 1, S = g.indexOf(`

`) !== -1 || v && p;
      p = S;
      const _ = c._, $ = c.o;
      let b;
      c.o = !0, S ? (c._ = !1, b = g.replace(wh, `

`)) : (c._ = !0, b = g.replace(wh, ""));
      const x = l(b, c);
      return c._ = _, c.o = $, x;
    }), m: r, g: u };
  }, h: (a, l, c) => e(a.m ? "ol" : "ul", { key: c.k, start: a.g }, a.p.map(function(u, d) {
    return e("li", { key: d }, l(u, c));
  })) };
}
const w3 = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, O3 = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Fb = [$b, Sb, _b, Eb, wb, xb, Ob, Tb, Ab, Mb, jb, Db], T3 = [...Fb, /^[^\n]+(?:  \n|\n{2,})/, iu, su];
function C3(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function P3(e) {
  return f3.test(e) ? "right" : u3.test(e) ? "center" : d3.test(e) ? "left" : null;
}
function Th(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let i = [[]];
  return o.forEach(function(a, l) {
    a.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && i.push([]) : (a.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (a.v = a.v.replace(c3, "")), i[i.length - 1].push(a));
  }), i;
}
function R3(e, t, r) {
  r._ = !0;
  const n = Th(e[1], t, r), o = e[2].replace(l3, "").split("|").map(P3), i = function(a, l, c) {
    return a.trim().split(`
`).map(function(u) {
      return Th(u, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: i, L: n, type: "table" };
}
function Ch(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function sn(e) {
  return function(t, r) {
    return r._ ? e.exec(t) : null;
  };
}
function an(e) {
  return function(t, r) {
    return r._ || r.u ? e.exec(t) : null;
  };
}
function Kr(e) {
  return function(t, r) {
    return r._ || r.u ? null : e.exec(t);
  };
}
function _i(e) {
  return function(t) {
    return e.exec(t);
  };
}
function I3(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((i) => !Fb.some((a) => a.test(i)) && (n += i + `
`, i.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function ho(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function Ph(e) {
  return e.replace(S3, "$1");
}
function sa(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const i = e(t, r);
  return r._ = n, r.u = o, i;
}
function N3(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const i = e(t, r);
  return r._ = n, r.u = o, i;
}
function A3(e, t, r) {
  return r._ = !1, e(t, r);
}
const bc = (e, t, r) => ({ v: sa(t, e[1], r) });
function $c() {
  return {};
}
function Sc() {
  return null;
}
function j3(...e) {
  return e.filter(Boolean).join(" ");
}
function _c(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var Xe;
function k3(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || C3, t.namedCodesToUnicode = t.namedCodesToUnicode ? Dn({}, xh, t.namedCodesToUnicode) : xh;
  const r = t.createElement || P.createElement;
  function n(f, y, ...h) {
    const g = _c(t.overrides, `${f}.props`, {});
    return r(function(v, S) {
      const _ = _c(S, v);
      return _ ? typeof _ == "function" || typeof _ == "object" && "render" in _ ? _ : _c(S, `${v}.component`, v) : v;
    }(f, t.overrides), Dn({}, y, g, { className: j3(y == null ? void 0 : y.className, g.className) || void 0 }), ...h);
  }
  function o(f) {
    let y = !1;
    t.forceInline ? y = !0 : t.forceBlock || (y = i3.test(f) === !1);
    const h = d(u(y ? f : `${f.trimEnd().replace(b3, "")}

`, { _: y }));
    for (; typeof h[h.length - 1] == "string" && !h[h.length - 1].trim(); )
      h.pop();
    if (t.wrapper === null)
      return h;
    const g = t.wrapper || (y ? "span" : "div");
    let v;
    if (h.length > 1 || t.forceWrapper)
      v = h;
    else {
      if (h.length === 1)
        return v = h[0], typeof v == "string" ? n("span", { key: "outer" }, v) : v;
      v = null;
    }
    return P.createElement(g, { key: "outer" }, v);
  }
  function i(f) {
    const y = f.match(k4);
    return y ? y.reduce(function(h, g, v) {
      const S = g.indexOf("=");
      if (S !== -1) {
        const _ = function(w) {
          return w.indexOf("-") !== -1 && w.match(Y4) === null && (w = w.replace(e3, function(A, j) {
            return j.toUpperCase();
          })), w;
        }(g.slice(0, S)).trim(), $ = function(w) {
          const A = w[0];
          return (A === '"' || A === "'") && w.length >= 2 && w[w.length - 1] === A ? w.slice(1, -1) : w;
        }(g.slice(S + 1).trim()), b = Eh[_] || _, x = h[b] = function(w, A) {
          return w === "style" ? A.split(/;\s?/).reduce(function(j, k) {
            const K = k.slice(0, k.indexOf(":"));
            return j[K.replace(/(-[a-z])/g, (U) => U[1].toUpperCase())] = k.slice(K.length + 1).trim(), j;
          }, {}) : w === "href" ? ho(A) : (A.match(X4) && (A = A.slice(1, A.length - 1)), A === "true" || A !== "false" && A);
        }(_, $);
        typeof x == "string" && (iu.test(x) || su.test(x)) && (h[b] = P.cloneElement(o(x.trim()), { key: v }));
      } else
        g !== "style" && (h[Eh[g] || g] = !0);
      return h;
    }, {}) : null;
  }
  const a = [], l = {}, c = { blockQuote: { t: Kr($b), i: Xe.HIGH, l: (f, y, h) => ({ v: y(f[0].replace(F4, ""), h) }), h: (f, y, h) => n("blockquote", { key: h.k }, y(f.v, h)) }, breakLine: { t: _i(L4), i: Xe.HIGH, l: $c, h: (f, y, h) => n("br", { key: h.k }) }, breakThematic: { t: Kr(B4), i: Xe.HIGH, l: $c, h: (f, y, h) => n("hr", { key: h.k }) }, codeBlock: { t: Kr(_b), i: Xe.MAX, l: (f) => ({ v: f[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (f, y, h) => n("pre", { key: h.k }, n("code", Dn({}, f.O, { className: f.M ? `lang-${f.M}` : "" }), f.v)) }, codeFenced: { t: Kr(Sb), i: Xe.MAX, l: (f) => ({ O: i(f[3] || ""), v: f[4], M: f[2] || void 0, type: "codeBlock" }) }, codeInline: { t: an(V4), i: Xe.LOW, l: (f) => ({ v: f[2] }), h: (f, y, h) => n("code", { key: h.k }, f.v) }, footnote: { t: Kr(W4), i: Xe.MAX, l: (f) => (a.push({ I: f[2], j: f[1] }), {}), h: Sc }, footnoteReference: { t: sn(q4), i: Xe.HIGH, l: (f) => ({ v: f[1], B: `#${t.slugify(f[1])}` }), h: (f, y, h) => n("a", { key: h.k, href: ho(f.B) }, n("sup", { key: h.k }, f.v)) }, gfmTask: { t: sn(H4), i: Xe.HIGH, l: (f) => ({ R: f[1].toLowerCase() === "x" }), h: (f, y, h) => n("input", { checked: f.R, key: h.k, readOnly: !0, type: "checkbox" }) }, heading: { t: Kr(t.enforceAtxHeadings ? xb : Eb), i: Xe.HIGH, l: (f, y, h) => ({ v: sa(y, f[2], h), T: t.slugify(f[2]), C: f[1].length }), h: (f, y, h) => n(`h${f.C}`, { id: f.T, key: h.k }, y(f.v, h)) }, headingSetext: { t: Kr(wb), i: Xe.MAX, l: (f, y, h) => ({ v: sa(y, f[1], h), C: f[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: _i(Ob), i: Xe.HIGH, l: () => ({}), h: Sc }, image: { t: an(O3), i: Xe.HIGH, l: (f) => ({ D: f[1], B: Ph(f[2]), F: f[3] }), h: (f, y, h) => n("img", { key: h.k, alt: f.D || void 0, title: f.F || void 0, src: ho(f.B) }) }, link: { t: sn(w3), i: Xe.LOW, l: (f, y, h) => ({ v: N3(y, f[1], h), B: Ph(f[2]), F: f[3] }), h: (f, y, h) => n("a", { key: h.k, href: ho(f.B), title: f.F }, y(f.v, h)) }, linkAngleBraceStyleDetector: { t: sn(Q4), i: Xe.MAX, l: (f) => ({ v: [{ v: f[1], type: "text" }], B: f[1], type: "link" }) }, linkBareUrlDetector: { t: (f, y) => y.N ? null : sn(J4)(f, y), i: Xe.MAX, l: (f) => ({ v: [{ v: f[1], type: "text" }], B: f[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: sn(Z4), i: Xe.MAX, l(f) {
    let y = f[1], h = f[1];
    return M4.test(h) || (h = "mailto:" + h), { v: [{ v: y.replace("mailto:", ""), type: "text" }], B: h, type: "link" };
  } }, orderedList: Oh(n, 1), unorderedList: Oh(n, 2), newlineCoalescer: { t: Kr(z4), i: Xe.LOW, l: $c, h: () => `
` }, paragraph: { t: I3, i: Xe.LOW, l: bc, h: (f, y, h) => n("p", { key: h.k }, y(f.v, h)) }, ref: { t: sn(t3), i: Xe.MAX, l: (f) => (l[f[1]] = { B: f[2], F: f[4] }, {}), h: Sc }, refImage: { t: an(r3), i: Xe.MAX, l: (f) => ({ D: f[1] || void 0, P: f[2] }), h: (f, y, h) => n("img", { key: h.k, alt: f.D, src: ho(l[f.P].B), title: l[f.P].F }) }, refLink: { t: sn(n3), i: Xe.MAX, l: (f, y, h) => ({ v: y(f[1], h), Z: y(f[0].replace(o3, "\\$1"), h), P: f[2] }), h: (f, y, h) => l[f.P] ? n("a", { key: h.k, href: ho(l[f.P].B), title: l[f.P].F }, y(f.v, h)) : n("span", { key: h.k }, y(f.Z, h)) }, table: { t: Kr(Tb), i: Xe.HIGH, l: R3, h: (f, y, h) => n("table", { key: h.k }, n("thead", null, n("tr", null, f.L.map(function(g, v) {
    return n("th", { key: v, style: Ch(f, v) }, y(g, h));
  }))), n("tbody", null, f.A.map(function(g, v) {
    return n("tr", { key: v }, g.map(function(S, _) {
      return n("td", { key: _, style: Ch(f, _) }, y(S, h));
    }));
  }))) }, tableSeparator: { t: function(f, y) {
    return y.$ ? (y._ = !0, a3.exec(f)) : null;
  }, i: Xe.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: _i(v3), i: Xe.MIN, l: (f) => ({ v: f[0].replace(G4, (y, h) => t.namedCodesToUnicode[h] ? t.namedCodesToUnicode[h] : y) }), h: (f) => f.v }, textBolded: { t: an(p3), i: Xe.MED, l: (f, y, h) => ({ v: y(f[2], h) }), h: (f, y, h) => n("strong", { key: h.k }, y(f.v, h)) }, textEmphasized: { t: an(m3), i: Xe.LOW, l: (f, y, h) => ({ v: y(f[2], h) }), h: (f, y, h) => n("em", { key: h.k }, y(f.v, h)) }, textEscaped: { t: an(g3), i: Xe.HIGH, l: (f) => ({ v: f[1], type: "text" }) }, textMarked: { t: an(h3), i: Xe.LOW, l: bc, h: (f, y, h) => n("mark", { key: h.k }, y(f.v, h)) }, textStrikethroughed: { t: an(y3), i: Xe.LOW, l: bc, h: (f, y, h) => n("del", { key: h.k }, y(f.v, h)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: _i(iu), i: Xe.HIGH, l(f, y, h) {
    const [, g] = f[3].match($3), v = new RegExp(`^${g}`, "gm"), S = f[3].replace(v, ""), _ = ($ = S, T3.some((A) => A.test($)) ? A3 : sa);
    var $;
    const b = f[1].toLowerCase(), x = j4.indexOf(b) !== -1;
    h.N = h.N || b === "a";
    const w = x ? f[3] : _(y, S, h);
    return h.N = !1, { O: i(f[2]), v: w, G: x, H: x ? b : f[1] };
  }, h: (f, y, h) => n(f.H, Dn({ key: h.k }, f.O), f.G ? f.v : y(f.v, h)) }, c.htmlSelfClosing = { t: _i(su), i: Xe.HIGH, l: (f) => ({ O: i(f[2] || ""), H: f[1] }), h: (f, y, h) => n(f.H, Dn({}, f.O, { key: h.k })) });
  const u = function(f) {
    let y = Object.keys(f);
    function h(g, v) {
      let S = [], _ = "";
      for (; g; ) {
        let $ = 0;
        for (; $ < y.length; ) {
          const b = y[$], x = f[b], w = x.t(g, v, _);
          if (w) {
            const A = w[0];
            g = g.substring(A.length);
            const j = x.l(w, h, v);
            j.type == null && (j.type = b), S.push(j), _ = A;
            break;
          }
          $++;
        }
      }
      return S;
    }
    return y.sort(function(g, v) {
      let S = f[g].i, _ = f[v].i;
      return S !== _ ? S - _ : g < v ? -1 : 1;
    }), function(g, v) {
      return h(function(S) {
        return S.replace(U4, `
`).replace(K4, "").replace(s3, "    ");
      }(g), v);
    };
  }(c), d = (p = function(f) {
    return function(y, h, g) {
      return f[y.type].h(y, h, g);
    };
  }(c), function f(y, h = {}) {
    if (Array.isArray(y)) {
      const g = h.k, v = [];
      let S = !1;
      for (let _ = 0; _ < y.length; _++) {
        h.k = _;
        const $ = f(y[_], h), b = typeof $ == "string";
        b && S ? v[v.length - 1] += $ : $ !== null && v.push($), S = b;
      }
      return h.k = g, v;
    }
    return p(y, f, h);
  });
  var p;
  const m = o(e);
  return a.length ? n("div", null, m, n("footer", { key: "footer" }, a.map(function(f) {
    return n("div", { id: t.slugify(f.j), key: f.j }, f.j, d(u(f.I, { _: !0 })));
  }))) : m;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(Xe || (Xe = {}));
const kl = (e) => {
  let { children: t, options: r } = e, n = function(o, i) {
    if (o == null)
      return {};
    var a, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      i.indexOf(a = u[l]) >= 0 || (c[a] = o[a]);
    return c;
  }(e, A4);
  return P.cloneElement(k3(t, r), n);
};
var M3 = lv;
function D3(e, t) {
  return e == null ? !0 : M3(e, t);
}
var F3 = D3;
const L3 = /* @__PURE__ */ pt(F3);
class B3 extends is {
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
        !a && (Ao in c || yn in c) && (a = "object");
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
    const { schema: o, uiSchema: i = {}, formData: a, errorSchema: l, idSchema: c, name: u, required: d = !1, disabled: p = !1, readonly: m = !1, hideError: f, idPrefix: y, idSeparator: h, onBlur: g, onFocus: v, registry: S } = this.props, { fields: _, formContext: $, schemaUtils: b, translateString: x, globalUiOptions: w } = S, { SchemaField: A } = _, j = b.retrieveSchema(o, a), k = rt(i, w), { properties: K = {} } = j, U = (r = (t = k.title) !== null && t !== void 0 ? t : j.title) !== null && r !== void 0 ? r : u, H = (n = k.description) !== null && n !== void 0 ? n : j.description;
    let z;
    try {
      const J = Object.keys(K);
      z = ZU(J, k.order);
    } catch (J) {
      return E.jsxs("div", { children: [E.jsx("p", { className: "config-error", style: { color: "red" }, children: E.jsx(kl, { children: x(Ze.InvalidObjectField, [u || "root", J.message]) }) }), E.jsx("pre", { children: JSON.stringify(j) })] });
    }
    const G = qe("ObjectFieldTemplate", S, k), X = {
      // getDisplayLabel() always returns false for object types, so just check the `uiOptions.label`
      title: k.label === !1 ? "" : U,
      description: k.label === !1 ? void 0 : H,
      properties: z.map((J) => {
        const Z = Jt(j, [Ot, J, Wo]), ne = Z ? i.additionalProperties : i[J], D = rt(ne).widget === "hidden", N = Oe(c, [J], {});
        return {
          content: E.jsx(A, { name: J, required: this.isRequired(J), schema: Oe(j, [Ot, J], {}), uiSchema: ne, errorSchema: Oe(l, J), idSchema: N, idPrefix: y, idSeparator: h, formData: Oe(a, J), formContext: $, wasPropertyKeyModified: this.state.wasPropertyKeyModified, onKeyChange: this.onKeyChange(J), onChange: this.onPropertyChange(J, Z), onBlur: g, onFocus: v, registry: S, disabled: p, readonly: m, hideError: f, onDropPropertyClick: this.onDropPropertyClick }, J),
          name: J,
          readonly: m,
          disabled: p,
          required: d,
          hidden: D
        };
      }),
      readonly: m,
      disabled: p,
      required: d,
      idSchema: c,
      uiSchema: i,
      errorSchema: l,
      schema: j,
      formData: a,
      formContext: $,
      registry: S
    };
    return E.jsx(G, { ...X, onAddClick: this.handleAddClick });
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
    const p = qe("UnsupportedFieldTemplate", n, t);
    return E.jsx(p, { schema: e, idSchema: r, reason: a(Ze.UnknownFieldType, [String(e.type)]), registry: n });
  };
}
function U3(e) {
  const { schema: t, idSchema: r, uiSchema: n, formData: o, errorSchema: i, idPrefix: a, idSeparator: l, name: c, onChange: u, onKeyChange: d, onDropPropertyClick: p, required: m, registry: f, wasPropertyKeyModified: y = !1 } = e, { formContext: h, schemaUtils: g, globalUiOptions: v } = f, S = rt(n, v), _ = qe("FieldTemplate", f, S), $ = qe("DescriptionFieldTemplate", f, S), b = qe("FieldHelpTemplate", f, S), x = qe("FieldErrorTemplate", f, S), w = g.retrieveSchema(t, o), A = r[pn], j = ii(g.toIdSchema(w, A, o, a, l), r), k = $t((fe, Pe, Ae) => u(fe, Pe, Ae || A), [A, u]), K = z3(w, S, j, f), U = !!(e.disabled || S.disabled), H = !!(e.readonly || S.readonly || e.schema.readOnly || w.readOnly), z = S.hideError, G = z === void 0 ? e.hideError : !!z, X = !!(e.autofocus || S.autofocus);
  if (Object.keys(w).length === 0)
    return null;
  const J = g.getDisplayLabel(w, n, v), { __errors: Z, ...ne } = i || {}, D = Ca(n, ["ui:classNames", "classNames", "ui:style"]);
  Fi in D && (D[Fi] = Ca(D[Fi], ["classNames", "style"]));
  const N = E.jsx(K, { ...e, onChange: k, idSchema: j, schema: w, uiSchema: D, disabled: U, readonly: H, hideError: G, autofocus: X, errorSchema: ne, formContext: h, rawErrors: Z }), W = j[pn];
  let F;
  y ? F = c : F = Wo in w ? c : S.title || e.schema.title || w.title || c;
  const O = S.description || e.schema.description || w.description || "", R = S.enableMarkdownInDescription ? E.jsx(kl, { children: O }) : O, B = S.help, Q = S.widget === "hidden", Y = ["form-group", "field", `field-${bn(w)}`];
  !G && Z && Z.length > 0 && Y.push("field-error has-error has-danger"), n != null && n.classNames && (process.env.NODE_ENV !== "production" && console.warn("'uiSchema.classNames' is deprecated and may be removed in a major release; Use 'ui:classNames' instead."), Y.push(n.classNames)), S.classNames && Y.push(S.classNames);
  const oe = E.jsx(b, { help: B, idSchema: j, schema: w, uiSchema: n, hasErrors: !G && Z && Z.length > 0, registry: f }), ie = G || (w.anyOf || w.oneOf) && !g.isSelect(w) ? void 0 : E.jsx(x, { errors: Z, errorSchema: i, idSchema: j, schema: w, uiSchema: n, registry: f }), ce = {
    description: E.jsx($, { id: to(W), description: R, schema: w, uiSchema: n, registry: f }),
    rawDescription: O,
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
    required: m,
    disabled: U,
    readonly: H,
    hideError: G,
    displayLabel: J,
    classNames: Y.join(" ").trim(),
    style: S.style,
    formContext: h,
    formData: o,
    schema: w,
    uiSchema: n,
    registry: f
  }, q = f.fields.AnyOfField, pe = f.fields.OneOfField, te = (n == null ? void 0 : n["ui:field"]) && (n == null ? void 0 : n["ui:fieldReplacesAnyOrOneOf"]) === !0;
  return E.jsx(_, { ...ce, children: E.jsxs(E.Fragment, { children: [N, w.anyOf && !te && !g.isSelect(w) && E.jsx(q, { name: c, disabled: U, readonly: H, hideError: G, errorSchema: i, formData: o, formContext: h, idPrefix: a, idSchema: j, idSeparator: l, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: w.anyOf.map((fe) => g.retrieveSchema(wr(fe) ? fe : {}, o)), registry: f, schema: w, uiSchema: n }), w.oneOf && !te && !g.isSelect(w) && E.jsx(pe, { name: c, disabled: U, readonly: H, hideError: G, errorSchema: i, formData: o, formContext: h, idPrefix: a, idSchema: j, idSeparator: l, onBlur: e.onBlur, onChange: e.onChange, onFocus: e.onFocus, options: w.oneOf.map((fe) => g.retrieveSchema(wr(fe) ? fe : {}, o)), registry: f, schema: w, uiSchema: n })] }) });
}
class W3 extends is {
  shouldComponentUpdate(t) {
    return !mr(this.props, t);
  }
  render() {
    return E.jsx(U3, { ...this.props });
  }
}
function q3(e) {
  var t;
  const { schema: r, name: n, uiSchema: o, idSchema: i, formData: a, required: l, disabled: c = !1, readonly: u = !1, autofocus: d = !1, onChange: p, onBlur: m, onFocus: f, registry: y, rawErrors: h, hideError: g } = e, { title: v, format: S } = r, { widgets: _, formContext: $, schemaUtils: b, globalUiOptions: x } = y, w = b.isSelect(r) ? Aa(r) : void 0;
  let A = w ? "select" : "text";
  S && YU(r, S, _) && (A = S);
  const { widget: j = A, placeholder: k = "", title: K, ...U } = rt(o), H = b.getDisplayLabel(r, o, x), z = (t = K ?? v) !== null && t !== void 0 ? t : n, G = Gr(r, j, _);
  return E.jsx(G, { options: { ...U, enumOptions: w }, schema: r, uiSchema: o, id: i.$id, name: n, label: z, hideLabel: !H, hideError: g, value: a, onChange: p, onBlur: m, onFocus: f, required: l, disabled: c, readonly: u, formContext: $, autofocus: d, registry: y, placeholder: k, rawErrors: h });
}
function K3(e) {
  const { formData: t, onChange: r } = e;
  return za(() => {
    t === void 0 && r(null);
  }, [t, r]), null;
}
function H3() {
  return {
    AnyOfField: _h,
    ArrayField: C4,
    // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
    BooleanField: P4,
    NumberField: N4,
    ObjectField: B3,
    OneOfField: _h,
    SchemaField: W3,
    StringField: q3,
    NullField: K3
  };
}
function G3(e) {
  const { idSchema: t, description: r, registry: n, schema: o, uiSchema: i } = e, a = rt(i, n.globalUiOptions), { label: l = !0 } = a;
  if (!r || !l)
    return null;
  const c = qe("DescriptionFieldTemplate", n, a);
  return E.jsx(c, { id: to(t), description: r, schema: o, uiSchema: i, registry: n });
}
function Y3(e) {
  const { children: t, className: r, disabled: n, hasToolbar: o, hasMoveDown: i, hasMoveUp: a, hasRemove: l, hasCopy: c, index: u, onCopyIndexClick: d, onDropIndexClick: p, onReorderClick: m, readonly: f, registry: y, uiSchema: h } = e, { CopyButton: g, MoveDownButton: v, MoveUpButton: S, RemoveButton: _ } = y.templates.ButtonTemplates, $ = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return E.jsxs("div", { className: r, children: [E.jsx("div", { className: o ? "col-xs-9" : "col-xs-12", children: t }), o && E.jsx("div", { className: "col-xs-3 array-item-toolbox", children: E.jsxs("div", { className: "btn-group", style: {
    display: "flex",
    justifyContent: "space-around"
  }, children: [(a || i) && E.jsx(S, { style: $, disabled: n || f || !a, onClick: m(u, u - 1), uiSchema: h, registry: y }), (a || i) && E.jsx(v, { style: $, disabled: n || f || !i, onClick: m(u, u + 1), uiSchema: h, registry: y }), c && E.jsx(g, { style: $, disabled: n || f, onClick: d(u), uiSchema: h, registry: y }), l && E.jsx(_, { style: $, disabled: n || f, onClick: p(u), uiSchema: h, registry: y })] }) })] });
}
function X3(e) {
  const { canAdd: t, className: r, disabled: n, idSchema: o, uiSchema: i, items: a, onAddClick: l, readonly: c, registry: u, required: d, schema: p, title: m } = e, f = rt(i), y = qe("ArrayFieldDescriptionTemplate", u, f), h = qe("ArrayFieldItemTemplate", u, f), g = qe("ArrayFieldTitleTemplate", u, f), { ButtonTemplates: { AddButton: v } } = u.templates;
  return E.jsxs("fieldset", { className: r, id: o.$id, children: [E.jsx(g, { idSchema: o, title: f.title || m, required: d, schema: p, uiSchema: i, registry: u }), E.jsx(y, { idSchema: o, description: f.description || p.description, schema: p, uiSchema: i, registry: u }), E.jsx("div", { className: "row array-item-list", children: a && a.map(({ key: S, ..._ }) => E.jsx(h, { ..._ }, S)) }), t && E.jsx(v, { className: "array-item-add", onClick: l, disabled: n || c, uiSchema: i, registry: u })] });
}
function J3(e) {
  const { idSchema: t, title: r, schema: n, uiSchema: o, required: i, registry: a } = e, l = rt(o, a.globalUiOptions), { label: c = !0 } = l;
  if (!r || !c)
    return null;
  const u = qe("TitleFieldTemplate", a, l);
  return E.jsx(u, { id: Td(t), title: r, required: i, schema: n, uiSchema: o, registry: a });
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
    schema: m,
    uiSchema: f,
    formContext: y,
    registry: h,
    rawErrors: g,
    type: v,
    hideLabel: S,
    // remove this from ...rest
    hideError: _,
    // remove this from ...rest
    ...$
  } = e;
  if (!t)
    throw console.log("No id for", e), new Error(`no id for props ${JSON.stringify(e)}`);
  const b = {
    ...$,
    ...yb(m, v, p)
  };
  let x;
  b.type === "number" || b.type === "integer" ? x = n || n === 0 ? n : "" : x = n ?? "";
  const w = $t(({ target: { value: k } }) => u(k === "" ? p.emptyValue : k), [u, p]), A = $t(({ target: { value: k } }) => l(t, k), [l, t]), j = $t(({ target: { value: k } }) => c(t, k), [c, t]);
  return E.jsxs(E.Fragment, { children: [E.jsx("input", { id: t, name: t, className: "form-control", readOnly: o, disabled: i, autoFocus: a, value: x, ...b, list: m.examples ? ts(t) : void 0, onChange: d || w, onBlur: A, onFocus: j, "aria-describedby": or(t, !!m.examples) }), Array.isArray(m.examples) && E.jsx("datalist", { id: ts(t), children: m.examples.concat(m.default && !m.examples.includes(m.default) ? [m.default] : []).map((k) => E.jsx("option", { value: k }, k)) }, `datalist_${t}`)] });
}
function Q3({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = gb(e);
  return r ? null : E.jsx("div", { children: E.jsx("button", { type: "submit", ...n, className: `btn btn-info ${n.className || ""}`, children: t }) });
}
function $s(e) {
  const { iconType: t = "default", icon: r, className: n, uiSchema: o, registry: i, ...a } = e;
  return E.jsx("button", { type: "button", className: `btn btn-${t} ${n}`, ...a, children: E.jsx("i", { className: `glyphicon glyphicon-${r}` }) });
}
function e9(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx($s, { title: t(Ze.CopyButton), className: "array-item-copy", ...e, icon: "copy" });
}
function t9(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx($s, { title: t(Ze.MoveDownButton), className: "array-item-move-down", ...e, icon: "arrow-down" });
}
function r9(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx($s, { title: t(Ze.MoveUpButton), className: "array-item-move-up", ...e, icon: "arrow-up" });
}
function n9(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx($s, { title: t(Ze.RemoveButton), className: "array-item-remove", ...e, iconType: "danger", icon: "remove" });
}
function o9({ className: e, onClick: t, disabled: r, registry: n }) {
  const { translateString: o } = n;
  return E.jsx("div", { className: "row", children: E.jsx("p", { className: `col-xs-3 col-xs-offset-9 text-right ${e}`, children: E.jsx($s, { iconType: "info", icon: "plus", className: "btn-add col-xs-12", title: o(Ze.AddButton), onClick: t, disabled: r, registry: n }) }) });
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
  return r ? typeof r == "string" ? E.jsx("p", { id: t, className: "field-description", children: r }) : E.jsx("div", { id: t, className: "field-description", children: r }) : null;
}
function a9({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return E.jsxs("div", { className: "panel panel-danger errors", children: [E.jsx("div", { className: "panel-heading", children: E.jsx("h3", { className: "panel-title", children: r(Ze.ErrorsLabel) }) }), E.jsx("ul", { className: "list-group", children: e.map((n, o) => E.jsx("li", { className: "list-group-item text-danger", children: n.stack }, o)) })] });
}
const l9 = "*";
function Lb(e) {
  const { label: t, required: r, id: n } = e;
  return t ? E.jsxs("label", { className: "control-label", htmlFor: n, children: [t, r && E.jsx("span", { className: "required", children: l9 })] }) : null;
}
function c9(e) {
  const { id: t, label: r, children: n, errors: o, help: i, description: a, hidden: l, required: c, displayLabel: u, registry: d, uiSchema: p } = e, m = rt(p), f = qe("WrapIfAdditionalTemplate", d, m);
  return l ? E.jsx("div", { className: "hidden", children: n }) : E.jsxs(f, { ...e, children: [u && E.jsx(Lb, { label: r, required: c, id: t }), u && a ? a : null, n, o, i] });
}
function u9(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = wd(r);
  return E.jsx("div", { children: E.jsx("ul", { id: n, className: "error-detail bs-callout bs-callout-info", children: t.filter((o) => !!o).map((o, i) => E.jsx("li", { className: "text-danger", children: o }, i)) }) });
}
function d9(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = Od(t);
  return typeof r == "string" ? E.jsx("p", { id: n, className: "help-block", children: r }) : E.jsx("div", { id: n, className: "help-block", children: r });
}
function f9(e) {
  const { description: t, disabled: r, formData: n, idSchema: o, onAddClick: i, properties: a, readonly: l, registry: c, required: u, schema: d, title: p, uiSchema: m } = e, f = rt(m), y = qe("TitleFieldTemplate", c, f), h = qe("DescriptionFieldTemplate", c, f), { ButtonTemplates: { AddButton: g } } = c.templates;
  return E.jsxs("fieldset", { id: o.$id, children: [p && E.jsx(y, { id: Td(o), title: p, required: u, schema: d, uiSchema: m, registry: c }), t && E.jsx(h, { id: to(o), description: t, schema: d, uiSchema: m, registry: c }), a.map((v) => v.content), xg(d, m, n) && E.jsx(g, { className: "object-property-expand", onClick: i(d), disabled: r || l, uiSchema: m, registry: c })] });
}
const p9 = "*";
function m9(e) {
  const { id: t, title: r, required: n } = e;
  return E.jsxs("legend", { id: t, children: [r, n && E.jsx("span", { className: "required", children: p9 })] });
}
function h9(e) {
  const { schema: t, idSchema: r, reason: n, registry: o } = e, { translateString: i } = o;
  let a = Ze.UnsupportedField;
  const l = [];
  return r && r.$id && (a = Ze.UnsupportedFieldWithId, l.push(r.$id)), n && (a = a === Ze.UnsupportedField ? Ze.UnsupportedFieldWithReason : Ze.UnsupportedFieldWithIdAndReason, l.push(n)), E.jsxs("div", { className: "unsupported-field", children: [E.jsx("p", { children: E.jsx(kl, { children: i(a, l) }) }), t && E.jsx("pre", { children: JSON.stringify(t, null, 2) })] });
}
function y9(e) {
  const { id: t, classNames: r, style: n, disabled: o, label: i, onKeyChange: a, onDropPropertyClick: l, readonly: c, required: u, schema: d, children: p, uiSchema: m, registry: f } = e, { templates: y, translateString: h } = f, { RemoveButton: g } = y.ButtonTemplates, v = h(Ze.KeyLabel, [i]);
  return Wo in d ? E.jsx("div", { className: r, style: n, children: E.jsxs("div", { className: "row", children: [E.jsx("div", { className: "col-xs-5 form-additional", children: E.jsxs("div", { className: "form-group", children: [E.jsx(Lb, { label: v, required: u, id: `${t}-key` }), E.jsx("input", { className: "form-control", type: "text", id: `${t}-key`, onBlur: (_) => a(_.target.value), defaultValue: i })] }) }), E.jsx("div", { className: "form-additional form-group col-xs-5", children: p }), E.jsx("div", { className: "col-xs-2", children: E.jsx(g, { className: "array-item-remove btn-block", style: { border: "0" }, disabled: o || c, onClick: l(i), uiSchema: m, registry: f }) })] }) }) : E.jsx("div", { className: r, style: n, children: p });
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
  const m = o + "_" + e, { SelectWidget: f } = u.widgets;
  return E.jsx(f, { schema: { type: "integer" }, id: m, name: i, className: "form-control", options: { enumOptions: v9(t[0], t[1]) }, placeholder: e, value: r, disabled: a, readonly: l, autofocus: c, onChange: (y) => n(e, y), onBlur: d, onFocus: p, registry: u, label: "", "aria-describedby": or(o) });
}
function _9({ time: e = !1, disabled: t = !1, readonly: r = !1, autofocus: n = !1, options: o, id: i, name: a, registry: l, onBlur: c, onFocus: u, onChange: d, value: p }) {
  const { translateString: m } = l, [f, y] = Vo(p), [h, g] = M$(($, b) => ({ ...$, ...b }), vc(p, e));
  za(() => {
    const $ = $h(h, e);
    b9(h) && $ !== p ? d($) : f !== p && (y(p), g(vc(p, e)));
  }, [e, p, d, h, f]);
  const v = $t(($, b) => {
    g({ [$]: b });
  }, []), S = $t(($) => {
    if ($.preventDefault(), t || r)
      return;
    const b = vc((/* @__PURE__ */ new Date()).toJSON(), e);
    d($h(b, e));
  }, [t, r, e]), _ = $t(($) => {
    $.preventDefault(), !(t || r) && d(void 0);
  }, [t, r, d]);
  return E.jsxs("ul", { className: "list-inline", children: [$9(h, e, o.yearsRange).map(($, b) => E.jsx("li", { className: "list-inline-item", children: E.jsx(S9, { rootId: i, name: a, select: v, ...$, disabled: t, readonly: r, registry: l, onBlur: c, onFocus: u, autofocus: n && b === 0 }) }, b)), (o.hideNowButton !== "undefined" ? !o.hideNowButton : !0) && E.jsx("li", { className: "list-inline-item", children: E.jsx("a", { href: "#", className: "btn btn-info btn-now", onClick: S, children: m(Ze.NowLabel) }) }), (o.hideClearButton !== "undefined" ? !o.hideClearButton : !0) && E.jsx("li", { className: "list-inline-item", children: E.jsx("a", { href: "#", className: "btn btn-warning btn-clear", onClick: _, children: m(Ze.ClearLabel) }) })] });
}
function E9({ time: e = !0, ...t }) {
  const { AltDateWidget: r } = t.registry.widgets;
  return E.jsx(r, { time: e, ...t });
}
function x9({ schema: e, uiSchema: t, options: r, id: n, value: o, disabled: i, readonly: a, label: l, hideLabel: c, autofocus: u = !1, onBlur: d, onFocus: p, onChange: m, registry: f }) {
  var y;
  const h = qe("DescriptionFieldTemplate", f, r), g = To(e), v = $t((b) => m(b.target.checked), [m]), S = $t((b) => d(n, b.target.checked), [d, n]), _ = $t((b) => p(n, b.target.checked), [p, n]), $ = (y = r.description) !== null && y !== void 0 ? y : e.description;
  return E.jsxs("div", { className: `checkbox ${i || a ? "disabled" : ""}`, children: [!c && !!$ && E.jsx(h, { id: to(n), description: $, schema: e, uiSchema: t, registry: f }), E.jsxs("label", { children: [E.jsx("input", { type: "checkbox", id: n, name: n, checked: typeof o > "u" ? !1 : o, required: g, disabled: i || a, autoFocus: u, onChange: v, onBlur: S, onFocus: _, "aria-describedby": or(n) }), En(E.jsx("span", { children: l }), c)] })] });
}
function w9({ id: e, disabled: t, options: { inline: r = !1, enumOptions: n, enumDisabled: o, emptyValue: i }, value: a, autofocus: l = !1, readonly: c, onChange: u, onBlur: d, onFocus: p }) {
  const m = Array.isArray(a) ? a : [a], f = $t(({ target: { value: h } }) => d(e, Ft(h, n, i)), [d, e]), y = $t(({ target: { value: h } }) => p(e, Ft(h, n, i)), [p, e]);
  return E.jsx("div", { className: "checkboxes", id: e, children: Array.isArray(n) && n.map((h, g) => {
    const v = Al(h.value, m), S = Array.isArray(o) && o.indexOf(h.value) !== -1, _ = t || S || c ? "disabled" : "", $ = (x) => {
      x.target.checked ? u(mb(g, m, n)) : u(pb(g, m, n));
    }, b = E.jsxs("span", { children: [E.jsx("input", { type: "checkbox", id: jl(e, g), name: e, checked: v, value: String(g), disabled: t || S || c, autoFocus: l && g === 0, onChange: $, onBlur: f, onFocus: y, "aria-describedby": or(e) }), E.jsx("span", { children: h.label })] });
    return r ? E.jsx("label", { className: `checkbox-inline ${_}`, children: b }, g) : E.jsx("div", { className: `checkbox ${_}`, children: E.jsx("label", { children: b }) }, g);
  }) });
}
function O9(e) {
  const { disabled: t, readonly: r, options: n, registry: o } = e, i = qe("BaseInputTemplate", o, n);
  return E.jsx(i, { type: "color", ...e, disabled: t || r });
}
function T9(e) {
  const { onChange: t, options: r, registry: n } = e, o = qe("BaseInputTemplate", n, r), i = $t((a) => t(a || void 0), [t]);
  return E.jsx(o, { type: "date", ...e, onChange: i });
}
function C9(e) {
  const { onChange: t, value: r, options: n, registry: o } = e, i = qe("BaseInputTemplate", o, n);
  return E.jsx(i, { type: "datetime-local", ...e, value: u4(r), onChange: (a) => t(XU(a)) });
}
function P9(e) {
  const { options: t, registry: r } = e, n = qe("BaseInputTemplate", r, t);
  return E.jsx(n, { type: "email", ...e });
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
  return n ? o.indexOf("image") !== -1 ? E.jsx("img", { src: n, style: { maxWidth: "100%" }, className: "file-preview" }) : E.jsxs(E.Fragment, { children: [" ", E.jsx("a", { download: `preview-${i}`, href: n, className: "file-download", children: r(Ze.PreviewLabel) })] }) : null;
}
function j9({ filesInfo: e, registry: t, preview: r }) {
  if (e.length === 0)
    return null;
  const { translateString: n } = t;
  return E.jsx("ul", { className: "file-info", children: e.map((o, i) => {
    const { name: a, size: l, type: c } = o;
    return E.jsxs("li", { children: [E.jsx(kl, { children: n(Ze.FilesInfo, [a, c, String(l)]) }), r && E.jsx(A9, { fileInfo: o, registry: t })] }, i);
  }) });
}
function Rh(e) {
  return e.filter((t) => t).map((t) => {
    const { blob: r, name: n } = LU(t);
    return {
      dataURL: t,
      name: n,
      size: r.size,
      type: r.type
    };
  });
}
function k9(e) {
  const { disabled: t, readonly: r, required: n, multiple: o, onChange: i, value: a, options: l, registry: c } = e, u = qe("BaseInputTemplate", c, l), [d, p] = Vo(Array.isArray(a) ? Rh(a) : Rh([a])), m = $t((f) => {
    f.target.files && N9(f.target.files).then((y) => {
      const h = y.map((g) => g.dataURL);
      o ? (p(d.concat(y[0])), i(a.concat(h[0]))) : (p(y), i(h[0]));
    });
  }, [o, a, d, i]);
  return E.jsxs("div", { children: [E.jsx(u, { ...e, disabled: t || r, type: "file", required: a ? !1 : n, onChangeOverride: m, value: "", accept: l.accept ? String(l.accept) : void 0 }), E.jsx(j9, { filesInfo: d, registry: c, preview: l.filePreview })] });
}
function M9({ id: e, value: t }) {
  return E.jsx("input", { type: "hidden", id: e, name: e, value: typeof t > "u" ? "" : t });
}
function D9(e) {
  const { options: t, registry: r } = e, n = qe("BaseInputTemplate", r, t);
  return E.jsx(n, { type: "password", ...e });
}
function F9({ options: e, value: t, required: r, disabled: n, readonly: o, autofocus: i = !1, onBlur: a, onFocus: l, onChange: c, id: u }) {
  const { enumOptions: d, enumDisabled: p, inline: m, emptyValue: f } = e, y = $t(({ target: { value: g } }) => a(u, Ft(g, d, f)), [a, u]), h = $t(({ target: { value: g } }) => l(u, Ft(g, d, f)), [l, u]);
  return E.jsx("div", { className: "field-radio-group", id: u, children: Array.isArray(d) && d.map((g, v) => {
    const S = Al(g.value, t), _ = Array.isArray(p) && p.indexOf(g.value) !== -1, $ = n || _ || o ? "disabled" : "", b = () => c(g.value), x = E.jsxs("span", { children: [E.jsx("input", { type: "radio", id: jl(u, v), checked: S, name: u, required: r, value: String(v), disabled: n || _ || o, autoFocus: i && v === 0, onChange: b, onBlur: y, onFocus: h, "aria-describedby": or(u) }), E.jsx("span", { children: g.label })] });
    return m ? E.jsx("label", { className: `radio-inline ${$}`, children: x }, v) : E.jsx("div", { className: `radio ${$}`, children: E.jsx("label", { children: x }) }, v);
  }) });
}
function L9(e) {
  const { value: t, registry: { templates: { BaseInputTemplate: r } } } = e;
  return E.jsxs("div", { className: "field-range-wrapper", children: [E.jsx(r, { type: "range", ...e }), E.jsx("span", { className: "range-view", children: t })] });
}
function Ec(e, t) {
  return t ? Array.from(e.target.options).slice().filter((r) => r.selected).map((r) => r.value) : e.target.value;
}
function B9({ schema: e, id: t, options: r, value: n, required: o, disabled: i, readonly: a, multiple: l = !1, autofocus: c = !1, onChange: u, onBlur: d, onFocus: p, placeholder: m }) {
  const { enumOptions: f, enumDisabled: y, emptyValue: h } = r, g = l ? [] : "", v = $t((b) => {
    const x = Ec(b, l);
    return p(t, Ft(x, f, h));
  }, [p, t, e, l, r]), S = $t((b) => {
    const x = Ec(b, l);
    return d(t, Ft(x, f, h));
  }, [d, t, e, l, r]), _ = $t((b) => {
    const x = Ec(b, l);
    return u(Ft(x, f, h));
  }, [u, e, l, r]), $ = xd(n, f, l);
  return E.jsxs("select", { id: t, name: t, multiple: l, className: "form-control", value: typeof $ > "u" ? g : $, required: o, disabled: i || a, autoFocus: c, onBlur: S, onFocus: v, onChange: _, "aria-describedby": or(t), children: [!l && e.default === void 0 && E.jsx("option", { value: "", children: m }), Array.isArray(f) && f.map(({ value: b, label: x }, w) => {
    const A = y && y.indexOf(b) !== -1;
    return E.jsx("option", { value: String(w), disabled: A, children: x }, w);
  })] });
}
function Bb({ id: e, options: t = {}, placeholder: r, value: n, required: o, disabled: i, readonly: a, autofocus: l = !1, onChange: c, onBlur: u, onFocus: d }) {
  const p = $t(({ target: { value: y } }) => c(y === "" ? t.emptyValue : y), [c, t.emptyValue]), m = $t(({ target: { value: y } }) => u(e, y), [u, e]), f = $t(({ target: { value: y } }) => d(e, y), [e, d]);
  return E.jsx("textarea", { id: e, name: e, className: "form-control", value: n || "", placeholder: r, required: o, disabled: i, readOnly: a, autoFocus: l, rows: t.rows, onBlur: m, onFocus: f, onChange: p, "aria-describedby": or(e) });
}
Bb.defaultProps = {
  autofocus: !1,
  options: {}
};
function V9(e) {
  const { options: t, registry: r } = e, n = qe("BaseInputTemplate", r, t);
  return E.jsx(n, { ...e });
}
function z9(e) {
  const { onChange: t, options: r, registry: n } = e, o = qe("BaseInputTemplate", n, r), i = $t((a) => t(a ? `${a}:00` : void 0), [t]);
  return E.jsx(o, { type: "time", ...e, onChange: i });
}
function U9(e) {
  const { options: t, registry: r } = e, n = qe("BaseInputTemplate", r, t);
  return E.jsx(n, { type: "url", ...e });
}
function W9(e) {
  const { options: t, registry: r } = e, n = qe("BaseInputTemplate", r, t);
  return E.jsx(n, { type: "number", ...e });
}
function q9() {
  return {
    AltDateWidget: _9,
    AltDateTimeWidget: E9,
    CheckboxWidget: x9,
    CheckboxesWidget: w9,
    ColorWidget: O9,
    DateWidget: T9,
    DateTimeWidget: C9,
    EmailWidget: P9,
    FileWidget: k9,
    HiddenWidget: M9,
    PasswordWidget: D9,
    RadioWidget: F9,
    RangeWidget: L9,
    SelectWidget: B9,
    TextWidget: V9,
    TextareaWidget: Bb,
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
    translateString: VU
  };
}
class H9 extends is {
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
          i[c][Fu] && i[c][ta] !== "" ? a.push(i[c][ta]) : o(i[c], a, u);
        } else
          c === ta && i[c] !== "" && l.forEach((u) => {
            const d = Oe(n, u);
            (typeof d != "object" || Kn(d)) && a.push(u);
          });
      }), a);
      return o(r);
    }, this.onChange = (r, n, o) => {
      const { extraErrors: i, omitExtraData: a, liveOmit: l, noValidate: c, liveValidate: u, onChange: d } = this.props, { schemaUtils: p, schema: m, retrievedSchema: f } = this.state;
      (_t(r) || Array.isArray(r)) && (r = this.getStateFromProps(this.props, r, f).formData);
      const y = !c && u;
      let h = { formData: r, schema: m }, g = r, v;
      if (a === !0 && l === !0) {
        v = p.retrieveSchema(m, r);
        const S = p.toPathSchema(v, "", r), _ = this.getFieldNames(S, r);
        g = this.getUsedFormData(r, _), h = {
          formData: g
        };
      }
      if (y) {
        const S = this.validate(g, m, p, f);
        let _ = S.errors, $ = S.errorSchema;
        const b = _, x = $;
        if (i) {
          const w = ia(S, i);
          $ = w.errorSchema, _ = w.errors;
        }
        h = {
          formData: g,
          errors: _,
          errorSchema: $,
          schemaValidationErrors: b,
          schemaValidationErrorSchema: x
        };
      } else if (!c && n) {
        const S = i ? ii(n, i, "preventDuplicates") : n;
        h = {
          formData: g,
          errorSchema: S,
          errors: rs(S)
        };
      }
      v && (h.retrievedSchema = v), this.setState(h, () => d && d({ ...this.state, ...h }, o));
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
        const d = u.retrieveSchema(c, l), p = u.toPathSchema(d, "", l), m = this.getFieldNames(p, l);
        l = this.getUsedFormData(l, m);
      }
      if (i || this.validateForm()) {
        const d = o || {}, p = o ? rs(o) : [];
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
    this.state = this.getStateFromProps(t, t.formData), this.props.onChange && !mr(this.state.formData, this.props.formData) && this.props.onChange(this.state), this.formElement = D$();
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
    let m = o.schemaUtils;
    (!m || m.doesSchemaUtilsDiffer(t.validator, d, p)) && (m = FU(t.validator, d, p));
    const f = m.getDefaultFormState(i, r), y = n ?? m.retrieveSchema(i, f), h = () => t.noValidate ? { errors: [], errorSchema: {} } : t.liveValidate ? {
      errors: o.errors || [],
      errorSchema: o.errorSchema || {}
    } : {
      errors: o.schemaValidationErrors || [],
      errorSchema: o.schemaValidationErrorSchema || {}
    };
    let g, v, S = o.schemaValidationErrors, _ = o.schemaValidationErrorSchema;
    if (u) {
      const x = this.validate(f, i, m, y);
      g = x.errors, v = x.errorSchema, S = g, _ = v;
    } else {
      const x = h();
      g = x.errors, v = x.errorSchema;
    }
    if (t.extraErrors) {
      const x = ia({ errorSchema: v, errors: g }, t.extraErrors);
      v = x.errorSchema, g = x.errors;
    }
    const $ = m.toIdSchema(y, a["ui:rootFieldId"], f, t.idPrefix, t.idSeparator);
    return {
      schemaUtils: m,
      schema: i,
      uiSchema: a,
      idSchema: $,
      formData: f,
      edit: l,
      errors: g,
      errorSchema: v,
      schemaValidationErrors: S,
      schemaValidationErrorSchema: _,
      retrievedSchema: y
    };
  }
  /** React lifecycle method that is used to determine whether component should be updated.
   *
   * @param nextProps - The next version of the props
   * @param nextState - The next version of the state
   * @returns - True if the component should be updated, false otherwise
   */
  shouldComponentUpdate(t, r) {
    return QU(this, t, r);
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
    const { errors: r, errorSchema: n, schema: o, uiSchema: i } = this.state, { formContext: a } = this.props, l = rt(i), c = qe("ErrorListTemplate", t, l);
    return r && r.length ? E.jsx(c, { errors: r, errorSchema: n || {}, schema: o, uiSchema: i, formContext: a, registry: t }) : null;
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
      globalUiOptions: n[Gw]
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
    const { idPrefix: r = "root", idSeparator: n = "_" } = this.props, { property: o } = t, i = vb(o);
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
    const d = c, p = u, m = c.length > 0 || t && r;
    if (m) {
      if (t) {
        const f = ia(l, t);
        u = f.errorSchema, c = f.errors;
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
    return !m;
  }
  /** Renders the `Form` fields inside the <form> | `tagName` or `_internalFormWrapper`, rendering any errors if
   * needed along with the submit button or any children of the form.
   */
  render() {
    const { children: t, id: r, idPrefix: n, idSeparator: o, className: i = "", tagName: a, name: l, method: c, target: u, action: d, autoComplete: p, enctype: m, acceptcharset: f, noHtml5Validate: y = !1, disabled: h = !1, readonly: g = !1, formContext: v, showErrorList: S = "top", _internalFormWrapper: _ } = this.props, { schema: $, uiSchema: b, formData: x, errorSchema: w, idSchema: A } = this.state, j = this.getRegistry(), { SchemaField: k } = j.fields, { SubmitButton: K } = j.templates.ButtonTemplates, U = _ ? a : void 0, H = _ || a || "form";
    let { [Ea]: z = {} } = rt(b);
    h && (z = { ...z, props: { ...z.props, disabled: !0 } });
    const G = { [Fi]: { [Ea]: z } };
    return E.jsxs(H, { className: i || "rjsf", id: r, name: l, method: c, target: u, action: d, autoComplete: p, encType: m, acceptCharset: f, noValidate: y, onSubmit: this.onSubmit, as: U, ref: this.formElement, children: [S === "top" && this.renderErrors(j), E.jsx(k, { name: "", schema: $, uiSchema: b, errorSchema: w, idSchema: A, idPrefix: n, idSeparator: o, formContext: v, formData: x, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus, registry: j, disabled: h, readonly: g }), t || E.jsx(K, { uiSchema: G, registry: j }), S === "bottom" && this.renderErrors(j)] });
  }
}
function G9(e) {
  return yy(({ fields: t, widgets: r, templates: n, ...o }, i) => {
    var a;
    return t = { ...e == null ? void 0 : e.fields, ...t }, r = { ...e == null ? void 0 : e.widgets, ...r }, n = {
      ...e == null ? void 0 : e.templates,
      ...n,
      ButtonTemplates: {
        ...(a = e == null ? void 0 : e.templates) === null || a === void 0 ? void 0 : a.ButtonTemplates,
        ...n == null ? void 0 : n.ButtonTemplates
      }
    }, E.jsx(H9, { ...e, ...o, fields: t, widgets: r, templates: n, ref: i });
  });
}
var Id = {}, Vb = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Vb);
var si = Vb.exports, xc = {};
const Y9 = /* @__PURE__ */ F$(zx);
var Ih;
function ai() {
  return Ih || (Ih = 1, function(e) {
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
var X9 = si;
Object.defineProperty(Id, "__esModule", {
  value: !0
});
var zb = Id.default = void 0, J9 = X9(ai()), Z9 = E, Q9 = (0, J9.default)(/* @__PURE__ */ (0, Z9.jsx)("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), "Add");
zb = Id.default = Q9;
function eW(e) {
  return De("MuiIconButton", e);
}
const tW = Fe("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]), rW = tW, nW = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"], oW = (e) => {
  const {
    classes: t,
    disabled: r,
    color: n,
    edge: o,
    size: i
  } = e, a = {
    root: ["root", r && "disabled", n !== "default" && `color${xe(n)}`, o && `edge${xe(o)}`, `size${xe(i)}`]
  };
  return Ve(a, eW, t);
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
}), Ub = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
  } = n, p = _e(n, nW), m = C({}, n, {
    edge: o,
    color: l,
    disabled: c,
    disableFocusRipple: u,
    size: d
  }), f = oW(m);
  return /* @__PURE__ */ E.jsx(iW, C({
    className: Se(f.root, a),
    centerRipple: !0,
    focusRipple: !u,
    disabled: c,
    ref: r,
    ownerState: m
  }, p, {
    children: i
  }));
});
process.env.NODE_ENV !== "production" && (Ub.propTypes = {
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
const Wb = Ub;
function sW({ uiSchema: e, registry: t, ...r }) {
  const { translateString: n } = t;
  return E.jsx(Wb, { title: n(Ze.AddItemButton), ...r, color: "primary", children: E.jsx(zb, {}) });
}
const qb = /* @__PURE__ */ P.createContext();
process.env.NODE_ENV !== "production" && (qb.displayName = "GridContext");
const Nh = qb;
function aW(e) {
  return De("MuiGrid", e);
}
const lW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cW = ["column-reverse", "column", "row-reverse", "row"], uW = ["nowrap", "wrap-reverse", "wrap"], Ei = ["auto", !0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], dW = Fe("MuiGrid", [
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
  ...Ei.map((e) => `grid-xs-${e}`),
  ...Ei.map((e) => `grid-sm-${e}`),
  ...Ei.map((e) => `grid-md-${e}`),
  ...Ei.map((e) => `grid-lg-${e}`),
  ...Ei.map((e) => `grid-xl-${e}`)
]), ns = dW, fW = ["className", "columns", "columnSpacing", "component", "container", "direction", "item", "rowSpacing", "spacing", "wrap", "zeroMinWidth"];
function Co(e) {
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
          const p = `calc(${c} + ${Co(d)})`;
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
    return n.indexOf("column") === 0 && (o[`& > .${ns.item}`] = {
      maxWidth: "none"
    }), o;
  });
}
function Kb({
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
    typeof i == "object" && (a = Kb({
      breakpoints: e.breakpoints.values,
      values: i
    })), o = tr({
      theme: e
    }, i, (l, c) => {
      var u;
      const d = e.spacing(l);
      return d !== "0px" ? {
        marginTop: `-${Co(d)}`,
        [`& > .${ns.item}`]: {
          paddingTop: Co(d)
        }
      } : (u = a) != null && u.includes(c) ? {} : {
        marginTop: 0,
        [`& > .${ns.item}`]: {
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
    typeof i == "object" && (a = Kb({
      breakpoints: e.breakpoints.values,
      values: i
    })), o = tr({
      theme: e
    }, i, (l, c) => {
      var u;
      const d = e.spacing(l);
      return d !== "0px" ? {
        width: `calc(100% + ${Co(d)})`,
        marginLeft: `-${Co(d)}`,
        [`& > .${ns.item}`]: {
          paddingLeft: Co(d)
        }
      } : (u = a) != null && u.includes(c) ? {} : {
        width: "100%",
        marginLeft: 0,
        [`& > .${ns.item}`]: {
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
    return u.forEach((m) => {
      const f = r[m];
      f && p.push(t[`grid-${m}-${String(f)}`]);
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
  c.forEach((m) => {
    const f = e[m];
    f && d.push(`grid-${m}-${String(f)}`);
  });
  const p = {
    root: ["root", r && "container", o && "item", l && "zeroMinWidth", ...u, n !== "row" && `direction-xs-${String(n)}`, a !== "wrap" && `wrap-xs-${String(a)}`, ...d]
  };
  return Ve(p, aW, t);
}, Li = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiGrid"
  }), {
    breakpoints: o
  } = Sn(), i = ul(n), {
    className: a,
    columns: l,
    columnSpacing: c,
    component: u = "div",
    container: d = !1,
    direction: p = "row",
    item: m = !1,
    rowSpacing: f,
    spacing: y = 0,
    wrap: h = "wrap",
    zeroMinWidth: g = !1
  } = i, v = _e(i, fW), S = f || y, _ = c || y, $ = P.useContext(Nh), b = d ? l || 12 : $, x = {}, w = C({}, v);
  o.keys.forEach((k) => {
    v[k] != null && (x[k] = v[k], delete w[k]);
  });
  const A = C({}, i, {
    columns: b,
    container: d,
    direction: p,
    item: m,
    rowSpacing: S,
    columnSpacing: _,
    wrap: h,
    zeroMinWidth: g,
    spacing: y
  }, x, {
    breakpoints: o.keys
  }), j = $W(A);
  return /* @__PURE__ */ E.jsx(Nh.Provider, {
    value: b,
    children: /* @__PURE__ */ E.jsx(vW, C({
      ownerState: A,
      className: Se(j.root, a),
      as: u,
      ref: r
    }, w))
  });
});
process.env.NODE_ENV !== "production" && (Li.propTypes = {
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
  const e = Ty("Grid", Li);
  Li["propTypes"] = C({}, Li.propTypes, {
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
const lr = Li;
function SW(e) {
  return De("MuiPaper", e);
}
Fe("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const _W = ["className", "component", "elevation", "square", "variant"], EW = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, i = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return Ve(i, SW, o);
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
}), Hb = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, u = _e(n, _W), d = C({}, n, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), p = EW(d);
  return process.env.NODE_ENV !== "production" && Sn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ E.jsx(xW, C({
    as: i,
    ownerState: d,
    className: Se(p.root, o),
    ref: r
  }, u));
});
process.env.NODE_ENV !== "production" && (Hb.propTypes = {
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
  elevation: Zr(Ay, (e) => {
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
const Ml = Hb;
function wW(e) {
  const { children: t, disabled: r, hasToolbar: n, hasCopy: o, hasMoveDown: i, hasMoveUp: a, hasRemove: l, index: c, onCopyIndexClick: u, onDropIndexClick: d, onReorderClick: p, readonly: m, uiSchema: f, registry: y } = e, { CopyButton: h, MoveDownButton: g, MoveUpButton: v, RemoveButton: S } = y.templates.ButtonTemplates, _ = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
    minWidth: 0
  };
  return E.jsxs(lr, { container: !0, alignItems: "center", children: [E.jsx(lr, { item: !0, xs: !0, style: { overflow: "auto" }, children: E.jsx(Vr, { mb: 2, children: E.jsx(Ml, { elevation: 2, children: E.jsx(Vr, { p: 2, children: t }) }) }) }), n && E.jsxs(lr, { item: !0, children: [(a || i) && E.jsx(v, { style: _, disabled: r || m || !a, onClick: p(c, c - 1), uiSchema: f, registry: y }), (a || i) && E.jsx(g, { style: _, disabled: r || m || !i, onClick: p(c, c + 1), uiSchema: f, registry: y }), o && E.jsx(h, { style: _, disabled: r || m, onClick: u(c), uiSchema: f, registry: y }), l && E.jsx(S, { style: _, disabled: r || m, onClick: d(c), uiSchema: f, registry: y })] })] });
}
function OW(e) {
  const { canAdd: t, disabled: r, idSchema: n, uiSchema: o, items: i, onAddClick: a, readonly: l, registry: c, required: u, schema: d, title: p } = e, m = rt(o), f = qe("ArrayFieldDescriptionTemplate", c, m), y = qe("ArrayFieldItemTemplate", c, m), h = qe("ArrayFieldTitleTemplate", c, m), { ButtonTemplates: { AddButton: g } } = c.templates;
  return E.jsx(Ml, { elevation: 2, children: E.jsxs(Vr, { p: 2, children: [E.jsx(h, { idSchema: n, title: m.title || p, schema: d, uiSchema: o, required: u, registry: c }), E.jsx(f, { idSchema: n, description: m.description || d.description, schema: d, uiSchema: o, registry: c }), i && i.map(({ key: v, ...S }) => E.jsx(y, { ...S }, v)), t && E.jsx(lr, { container: !0, justifyContent: "flex-end", children: E.jsx(lr, { item: !0, children: E.jsx(Vr, { mt: 2, children: E.jsx(g, { className: "array-item-add", onClick: a, disabled: r || l, uiSchema: o, registry: c }) }) }) })] }) });
}
function xn({
  props: e,
  states: t,
  muiFormControl: r
}) {
  return t.reduce((n, o) => (n[o] = e[o], r && typeof e[o] > "u" && (n[o] = r[o]), n), {});
}
const Gb = /* @__PURE__ */ P.createContext(void 0);
process.env.NODE_ENV !== "production" && (Gb.displayName = "FormControlContext");
const Nd = Gb;
function on() {
  return P.useContext(Nd);
}
function Yb(e) {
  return /* @__PURE__ */ E.jsx(tg, C({}, e, {
    defaultTheme: fl,
    themeId: cs
  }));
}
process.env.NODE_ENV !== "production" && (Yb.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The styles you want to apply globally.
   */
  styles: s.oneOfType([s.array, s.func, s.number, s.object, s.string, s.bool])
});
function Ah(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function ja(e, t = !1) {
  return e && (Ah(e.value) && e.value !== "" || t && Ah(e.defaultValue) && e.defaultValue !== "");
}
function TW(e) {
  return e.startAdornment;
}
function CW(e) {
  return De("MuiInputBase", e);
}
const PW = Fe("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]), Fo = PW, RW = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "disableInjectingGlobalStyles", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "slotProps", "slots", "startAdornment", "type", "value"], Dl = (e, t) => {
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
    size: m,
    startAdornment: f,
    type: y
  } = e, h = {
    root: ["root", `color${xe(r)}`, n && "disabled", o && "error", c && "fullWidth", a && "focused", l && "formControl", m && m !== "medium" && `size${xe(m)}`, d && "multiline", f && "adornedStart", i && "adornedEnd", u && "hiddenLabel", p && "readOnly"],
    input: ["input", n && "disabled", y === "search" && "inputTypeSearch", d && "inputMultiline", m === "small" && "inputSizeSmall", u && "inputHiddenLabel", f && "inputAdornedStart", i && "inputAdornedEnd", p && "readOnly"]
  };
  return Ve(h, CW, t);
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
  [`&.${Fo.disabled}`]: {
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
    [`label[data-shrink=false] + .${Fo.formControl} &`]: {
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
    [`&.${Fo.disabled}`]: {
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
}), NW = /* @__PURE__ */ E.jsx(Yb, {
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
}), Xb = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n;
  const o = Ke({
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
    disabled: m,
    disableInjectingGlobalStyles: f,
    endAdornment: y,
    fullWidth: h = !1,
    id: g,
    inputComponent: v = "input",
    inputProps: S = {},
    inputRef: _,
    maxRows: $,
    minRows: b,
    multiline: x = !1,
    name: w,
    onBlur: A,
    onChange: j,
    onClick: k,
    onFocus: K,
    onKeyDown: U,
    onKeyUp: H,
    placeholder: z,
    readOnly: G,
    renderSuffix: X,
    rows: J,
    slotProps: Z = {},
    slots: ne = {},
    startAdornment: D,
    type: N = "text",
    value: W
  } = o, F = _e(o, RW), O = S.value != null ? S.value : W, {
    current: R
  } = P.useRef(O != null), B = P.useRef(), Q = P.useCallback((ge) => {
    process.env.NODE_ENV !== "production" && ge && ge.nodeName !== "INPUT" && !ge.focus && console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join(`
`));
  }, []), Y = Nt(B, _, S.ref, Q), [oe, ie] = P.useState(!1), ce = on();
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
    !ce && m && oe && (ie(!1), A && A());
  }, [ce, m, oe, A]);
  const pe = ce && ce.onFilled, te = ce && ce.onEmpty, fe = P.useCallback((ge) => {
    ja(ge) ? pe && pe() : te && te();
  }, [pe, te]);
  gr(() => {
    R && fe({
      value: O
    });
  }, [O, fe, R]);
  const Pe = (ge) => {
    if (q.disabled) {
      ge.stopPropagation();
      return;
    }
    K && K(ge), S.onFocus && S.onFocus(ge), ce && ce.onFocus ? ce.onFocus(ge) : ie(!0);
  }, Ae = (ge) => {
    A && A(ge), S.onBlur && S.onBlur(ge), ce && ce.onBlur ? ce.onBlur(ge) : ie(!1);
  }, Be = (ge, ...ue) => {
    if (!R) {
      const Ue = ge.target || B.current;
      if (Ue == null)
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : vn(1));
      fe({
        value: Ue.value
      });
    }
    S.onChange && S.onChange(ge, ...ue), j && j(ge, ...ue);
  };
  P.useEffect(() => {
    fe(B.current);
  }, []);
  const st = (ge) => {
    B.current && ge.currentTarget === ge.target && B.current.focus(), k && k(ge);
  };
  let je = v, Me = S;
  x && je === "input" && (J ? (process.env.NODE_ENV !== "production" && (b || $) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set."), Me = C({
    type: void 0,
    minRows: J,
    maxRows: J
  }, Me)) : Me = C({
    type: void 0,
    maxRows: $,
    minRows: b
  }, Me), je = dg);
  const Qe = (ge) => {
    fe(ge.animationName === "mui-auto-fill-cancel" ? B.current : {
      value: "x"
    });
  };
  P.useEffect(() => {
    ce && ce.setAdornedStart(!!D);
  }, [ce, D]);
  const He = C({}, o, {
    color: q.color || "primary",
    disabled: q.disabled,
    endAdornment: y,
    error: q.error,
    focused: q.focused,
    formControl: ce,
    fullWidth: h,
    hiddenLabel: q.hiddenLabel,
    multiline: x,
    size: q.size,
    startAdornment: D,
    type: N
  }), ze = IW(He), le = ne.root || u.Root || Ll, ye = Z.root || d.root || {}, be = ne.input || u.Input || Bl;
  return Me = C({}, Me, (n = Z.input) != null ? n : d.input), /* @__PURE__ */ E.jsxs(P.Fragment, {
    children: [!f && NW, /* @__PURE__ */ E.jsxs(le, C({}, ye, !Lr(le) && {
      ownerState: C({}, He, ye.ownerState)
    }, {
      ref: r,
      onClick: st
    }, F, {
      className: Se(ze.root, ye.className, c, G && "MuiInputBase-readOnly"),
      children: [D, /* @__PURE__ */ E.jsx(Nd.Provider, {
        value: null,
        children: /* @__PURE__ */ E.jsx(be, C({
          ownerState: He,
          "aria-invalid": q.error,
          "aria-describedby": i,
          autoComplete: a,
          autoFocus: l,
          defaultValue: p,
          disabled: q.disabled,
          id: g,
          onAnimationStart: Qe,
          name: w,
          placeholder: z,
          readOnly: G,
          required: q.required,
          rows: J,
          value: O,
          onKeyDown: U,
          onKeyUp: H,
          type: N
        }, Me, !Lr(be) && {
          as: je,
          ownerState: C({}, He, Me.ownerState)
        }, {
          ref: Y,
          className: Se(ze.input, Me.className, G && "MuiInputBase-readOnly"),
          onBlur: Ae,
          onChange: Be,
          onFocus: Pe
        }))
      }), y, X ? X(C({}, q, {
        startAdornment: D
      })) : null]
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Xb.propTypes = {
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
  inputComponent: Wa,
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
const Ad = Xb;
function AW(e) {
  return De("MuiInput", e);
}
const jW = C({}, Fo, Fe("MuiInput", ["root", "underline", "input"])), xi = jW, kW = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "slotProps", "slots", "type"], MW = (e) => {
  const {
    classes: t,
    disableUnderline: r
  } = e, o = Ve({
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
  const l = Ke({
    props: t,
    name: "MuiInput"
  }), {
    disableUnderline: c,
    components: u = {},
    componentsProps: d,
    fullWidth: p = !1,
    inputComponent: m = "input",
    multiline: f = !1,
    slotProps: y,
    slots: h = {},
    type: g = "text"
  } = l, v = _e(l, kW), S = MW(l), $ = {
    root: {
      ownerState: {
        disableUnderline: c
      }
    }
  }, b = y ?? d ? Ht(y ?? d, $) : $, x = (n = (o = h.root) != null ? o : u.Root) != null ? n : DW, w = (i = (a = h.input) != null ? a : u.Input) != null ? i : FW;
  return /* @__PURE__ */ E.jsx(Ad, C({
    slots: {
      root: x,
      input: w
    },
    slotProps: b,
    fullWidth: p,
    inputComponent: m,
    multiline: f,
    ref: r,
    type: g
  }, v, {
    classes: S
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
const Jb = jd;
function LW(e) {
  return De("MuiFilledInput", e);
}
const BW = C({}, Fo, Fe("MuiFilledInput", ["root", "underline", "input"])), In = BW, VW = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "slotProps", "slots", "type"], zW = (e) => {
  const {
    classes: t,
    disableUnderline: r
  } = e, o = Ve({
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
  const l = Ke({
    props: t,
    name: "MuiFilledInput"
  }), {
    components: c = {},
    componentsProps: u,
    fullWidth: d = !1,
    // declare here to prevent spreading to DOM
    inputComponent: p = "input",
    multiline: m = !1,
    slotProps: f,
    slots: y = {},
    type: h = "text"
  } = l, g = _e(l, VW), v = C({}, l, {
    fullWidth: d,
    inputComponent: p,
    multiline: m,
    type: h
  }), S = zW(l), _ = {
    root: {
      ownerState: v
    },
    input: {
      ownerState: v
    }
  }, $ = f ?? u ? Ht(_, f ?? u) : _, b = (n = (o = y.root) != null ? o : c.Root) != null ? n : UW, x = (i = (a = y.input) != null ? a : c.Input) != null ? i : WW;
  return /* @__PURE__ */ E.jsx(Ad, C({
    slots: {
      root: b,
      input: x
    },
    componentsProps: $,
    fullWidth: d,
    inputComponent: p,
    multiline: m,
    ref: r,
    type: h
  }, g, {
    classes: S
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
const Zb = kd;
var jh;
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
function Qb(e) {
  const {
    className: t,
    label: r,
    notched: n
  } = e, o = _e(e, qW), i = r != null && r !== "", a = C({}, e, {
    notched: n,
    withLabel: i
  });
  return /* @__PURE__ */ E.jsx(KW, C({
    "aria-hidden": !0,
    className: t,
    ownerState: a
  }, o, {
    children: /* @__PURE__ */ E.jsx(HW, {
      ownerState: a,
      children: i ? /* @__PURE__ */ E.jsx("span", {
        children: r
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        jh || (jh = /* @__PURE__ */ E.jsx("span", {
          className: "notranslate",
          children: "​"
        }))
      )
    })
  }));
}
process.env.NODE_ENV !== "production" && (Qb.propTypes = {
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
  return De("MuiOutlinedInput", e);
}
const YW = C({}, Fo, Fe("MuiOutlinedInput", ["root", "notchedOutline", "input"])), ln = YW, XW = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "slots", "type"], JW = (e) => {
  const {
    classes: t
  } = e, n = Ve({
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
}), QW = he(Qb, {
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
  const c = Ke({
    props: t,
    name: "MuiOutlinedInput"
  }), {
    components: u = {},
    fullWidth: d = !1,
    inputComponent: p = "input",
    label: m,
    multiline: f = !1,
    notched: y,
    slots: h = {},
    type: g = "text"
  } = c, v = _e(c, XW), S = JW(c), _ = on(), $ = xn({
    props: c,
    muiFormControl: _,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  }), b = C({}, c, {
    color: $.color || "primary",
    disabled: $.disabled,
    error: $.error,
    focused: $.focused,
    formControl: _,
    fullWidth: d,
    hiddenLabel: $.hiddenLabel,
    multiline: f,
    size: $.size,
    type: g
  }), x = (n = (o = h.root) != null ? o : u.Root) != null ? n : ZW, w = (i = (a = h.input) != null ? a : u.Input) != null ? i : eq;
  return /* @__PURE__ */ E.jsx(Ad, C({
    slots: {
      root: x,
      input: w
    },
    renderSuffix: (A) => /* @__PURE__ */ E.jsx(QW, {
      ownerState: b,
      className: S.notchedOutline,
      label: m != null && m !== "" && $.required ? l || (l = /* @__PURE__ */ E.jsxs(P.Fragment, {
        children: [m, " ", "*"]
      })) : m,
      notched: typeof y < "u" ? y : !!(A.startAdornment || A.filled || A.focused)
    }),
    fullWidth: d,
    inputComponent: p,
    multiline: f,
    ref: r,
    type: g
  }, v, {
    classes: C({}, S, {
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
const e0 = Md;
function tq(e) {
  return De("MuiFormLabel", e);
}
const rq = Fe("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]), Bi = rq, nq = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"], oq = (e) => {
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
  return Ve(c, tq, t);
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
  [`&.${Bi.focused}`]: {
    color: (e.vars || e).palette[t.color].main
  },
  [`&.${Bi.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${Bi.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), sq = he("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (e, t) => t.asterisk
})(({
  theme: e
}) => ({
  [`&.${Bi.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), t0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiFormLabel"
  }), {
    children: o,
    className: i,
    component: a = "label"
  } = n, l = _e(n, nq), c = on(), u = xn({
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
  return /* @__PURE__ */ E.jsxs(iq, C({
    as: a,
    ownerState: d,
    className: Se(p.root, i),
    ref: r
  }, l, {
    children: [o, u.required && /* @__PURE__ */ E.jsxs(sq, {
      ownerState: d,
      "aria-hidden": !0,
      className: p.asterisk,
      children: [" ", "*"]
    })]
  }));
});
process.env.NODE_ENV !== "production" && (t0.propTypes = {
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
const Vl = t0;
function aq(e) {
  return De("MuiInputLabel", e);
}
Fe("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
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
  }, u = Ve(c, aq, t);
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
      [`& .${Bi.asterisk}`]: t.asterisk
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
})), r0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    name: "MuiInputLabel",
    props: t
  }), {
    disableAnimation: o = !1,
    shrink: i,
    className: a
  } = n, l = _e(n, lq), c = on();
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
  }), m = cq(p);
  return /* @__PURE__ */ E.jsx(uq, C({
    "data-shrink": u,
    ownerState: p,
    ref: r,
    className: Se(m.root, a)
  }, l, {
    classes: m
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
const dq = r0;
function fq(e) {
  return De("MuiFormControl", e);
}
Fe("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const pq = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"], mq = (e) => {
  const {
    classes: t,
    margin: r,
    fullWidth: n
  } = e, o = {
    root: ["root", r !== "none" && `margin${xe(r)}`, n && "fullWidth"]
  };
  return Ve(o, fq, t);
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
})), n0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    hiddenLabel: m = !1,
    margin: f = "none",
    required: y = !1,
    size: h = "medium",
    variant: g = "outlined"
  } = n, v = _e(n, pq), S = C({}, n, {
    color: a,
    component: l,
    disabled: c,
    error: u,
    fullWidth: p,
    hiddenLabel: m,
    margin: f,
    required: y,
    size: h,
    variant: g
  }), _ = mq(S), [$, b] = P.useState(() => {
    let H = !1;
    return o && P.Children.forEach(o, (z) => {
      if (!Eo(z, ["Input", "Select"]))
        return;
      const G = Eo(z, ["Select"]) ? z.props.input : z;
      G && TW(G.props) && (H = !0);
    }), H;
  }), [x, w] = P.useState(() => {
    let H = !1;
    return o && P.Children.forEach(o, (z) => {
      Eo(z, ["Input", "Select"]) && (ja(z.props, !0) || ja(z.props.inputProps, !0)) && (H = !0);
    }), H;
  }), [A, j] = P.useState(!1);
  c && A && j(!1);
  const k = d !== void 0 && !c ? d : A;
  let K;
  if (process.env.NODE_ENV !== "production") {
    const H = P.useRef(!1);
    K = () => (H.current && console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join(`
`)), H.current = !0, () => {
      H.current = !1;
    });
  }
  const U = P.useMemo(() => ({
    adornedStart: $,
    setAdornedStart: b,
    color: a,
    disabled: c,
    error: u,
    filled: x,
    focused: k,
    fullWidth: p,
    hiddenLabel: m,
    size: h,
    onBlur: () => {
      j(!1);
    },
    onEmpty: () => {
      w(!1);
    },
    onFilled: () => {
      w(!0);
    },
    onFocus: () => {
      j(!0);
    },
    registerEffect: K,
    required: y,
    variant: g
  }), [$, a, c, u, x, k, p, m, K, y, h, g]);
  return /* @__PURE__ */ E.jsx(Nd.Provider, {
    value: U,
    children: /* @__PURE__ */ E.jsx(hq, C({
      as: l,
      ownerState: S,
      className: Se(_.root, i),
      ref: r
    }, v, {
      children: o
    }))
  });
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
const o0 = n0;
function yq(e) {
  return De("MuiFormHelperText", e);
}
const gq = Fe("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]), kh = gq;
var Mh;
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
  return Ve(u, yq, t);
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
  [`&.${kh.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${kh.error}`]: {
    color: (e.vars || e).palette.error.main
  }
}, t.size === "small" && {
  marginTop: 4
}, t.contained && {
  marginLeft: 14,
  marginRight: 14
})), i0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiFormHelperText"
  }), {
    children: o,
    className: i,
    component: a = "p"
  } = n, l = _e(n, vq), c = on(), u = xn({
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
  return /* @__PURE__ */ E.jsx($q, C({
    as: a,
    ownerState: d,
    className: Se(p.root, i),
    ref: r
  }, l, {
    children: o === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      Mh || (Mh = /* @__PURE__ */ E.jsx("span", {
        className: "notranslate",
        children: "​"
      }))
    ) : o
  }));
});
process.env.NODE_ENV !== "production" && (i0.propTypes = {
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
const Dd = i0, s0 = /* @__PURE__ */ P.createContext({});
process.env.NODE_ENV !== "production" && (s0.displayName = "ListContext");
const Yr = s0;
function Sq(e) {
  return De("MuiList", e);
}
Fe("MuiList", ["root", "padding", "dense", "subheader"]);
const _q = ["children", "className", "component", "dense", "disablePadding", "subheader"], Eq = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return Ve({
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
})), a0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = n, d = _e(n, _q), p = P.useMemo(() => ({
    dense: l
  }), [l]), m = C({}, n, {
    component: a,
    dense: l,
    disablePadding: c
  }), f = Eq(m);
  return /* @__PURE__ */ E.jsx(Yr.Provider, {
    value: p,
    children: /* @__PURE__ */ E.jsxs(xq, C({
      as: a,
      className: Se(f.root, i),
      ref: r,
      ownerState: m
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (a0.propTypes = {
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
const Fd = a0, wq = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function wc(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function Dh(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function l0(e, t) {
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
    if (!l.hasAttribute("tabindex") || !l0(l, i) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const c0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
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
  } = t, m = _e(t, wq), f = P.useRef(null), y = P.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  gr(() => {
    o && f.current.focus();
  }, [o]), P.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (_, $) => {
      const b = !f.current.style.width;
      if (_.clientHeight < f.current.clientHeight && b) {
        const x = `${Py(jt(_))}px`;
        f.current.style[$.direction === "rtl" ? "paddingLeft" : "paddingRight"] = x, f.current.style.width = `calc(100% + ${x})`;
      }
      return f.current;
    }
  }), []);
  const h = (_) => {
    const $ = f.current, b = _.key, x = jt($).activeElement;
    if (b === "ArrowDown")
      _.preventDefault(), wi($, x, u, c, wc);
    else if (b === "ArrowUp")
      _.preventDefault(), wi($, x, u, c, Dh);
    else if (b === "Home")
      _.preventDefault(), wi($, null, u, c, wc);
    else if (b === "End")
      _.preventDefault(), wi($, null, u, c, Dh);
    else if (b.length === 1) {
      const w = y.current, A = b.toLowerCase(), j = performance.now();
      w.keys.length > 0 && (j - w.lastTime > 500 ? (w.keys = [], w.repeating = !0, w.previousKeyMatched = !0) : w.repeating && A !== w.keys[0] && (w.repeating = !1)), w.lastTime = j, w.keys.push(A);
      const k = x && !w.repeating && l0(x, w);
      w.previousKeyMatched && (k || wi($, x, !1, c, wc, w)) ? _.preventDefault() : w.previousKeyMatched = !1;
    }
    d && d(_);
  }, g = Nt(f, r);
  let v = -1;
  P.Children.forEach(a, (_, $) => {
    if (!/* @__PURE__ */ P.isValidElement(_)) {
      v === $ && (v += 1, v >= a.length && (v = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Un.isFragment(_) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), _.props.disabled || (p === "selectedMenu" && _.props.selected || v === -1) && (v = $), v === $ && (_.props.disabled || _.props.muiSkipListHighlight || _.type.muiSkipListHighlight) && (v += 1, v >= a.length && (v = -1));
  });
  const S = P.Children.map(a, (_, $) => {
    if ($ === v) {
      const b = {};
      return i && (b.autoFocus = !0), _.props.tabIndex === void 0 && p === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ P.cloneElement(_, b);
    }
    return _;
  });
  return /* @__PURE__ */ E.jsx(Fd, C({
    role: "menu",
    ref: g,
    className: l,
    onKeyDown: h,
    tabIndex: o ? 0 : -1
  }, m, {
    children: S
  }));
});
process.env.NODE_ENV !== "production" && (c0.propTypes = {
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
const Oq = c0, u0 = (e) => e.scrollTop;
function ka(e, t) {
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
const Tq = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
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
}, Oc = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Ld = /* @__PURE__ */ P.forwardRef(function(t, r) {
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
    onExited: m,
    onExiting: f,
    style: y,
    timeout: h = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = mg
  } = t, v = _e(t, Tq), S = P.useRef(), _ = P.useRef(), $ = Sn(), b = P.useRef(null), x = Nt(b, i.ref, r), w = (G) => (X) => {
    if (G) {
      const J = b.current;
      X === void 0 ? G(J) : G(J, X);
    }
  }, A = w(d), j = w((G, X) => {
    u0(G);
    const {
      duration: J,
      delay: Z,
      easing: ne
    } = ka({
      style: y,
      timeout: h,
      easing: a
    }, {
      mode: "enter"
    });
    let D;
    h === "auto" ? (D = $.transitions.getAutoHeightDuration(G.clientHeight), _.current = D) : D = J, G.style.transition = [$.transitions.create("opacity", {
      duration: D,
      delay: Z
    }), $.transitions.create("transform", {
      duration: Oc ? D : D * 0.666,
      delay: Z,
      easing: ne
    })].join(","), c && c(G, X);
  }), k = w(u), K = w(f), U = w((G) => {
    const {
      duration: X,
      delay: J,
      easing: Z
    } = ka({
      style: y,
      timeout: h,
      easing: a
    }, {
      mode: "exit"
    });
    let ne;
    h === "auto" ? (ne = $.transitions.getAutoHeightDuration(G.clientHeight), _.current = ne) : ne = X, G.style.transition = [$.transitions.create("opacity", {
      duration: ne,
      delay: J
    }), $.transitions.create("transform", {
      duration: Oc ? ne : ne * 0.666,
      delay: Oc ? J : J || ne * 0.333,
      easing: Z
    })].join(","), G.style.opacity = 0, G.style.transform = au(0.75), p && p(G);
  }), H = w(m), z = (G) => {
    h === "auto" && (S.current = setTimeout(G, _.current || 0)), n && n(b.current, G);
  };
  return P.useEffect(() => () => {
    clearTimeout(S.current);
  }, []), /* @__PURE__ */ E.jsx(g, C({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: j,
    onEntered: k,
    onEntering: A,
    onExit: U,
    onExited: H,
    onExiting: K,
    addEndListener: z,
    timeout: h === "auto" ? null : h
  }, v, {
    children: (G, X) => /* @__PURE__ */ P.cloneElement(i, C({
      style: C({
        opacity: 0,
        transform: au(0.75),
        visibility: G === "exited" && !l ? "hidden" : void 0
      }, Cq[G], y, i.props.style),
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
  children: Ua.isRequired,
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
}, d0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
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
    onEntering: m,
    onExit: f,
    onExited: y,
    onExiting: h,
    style: g,
    timeout: v = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: S = mg
  } = t, _ = _e(t, Rq), $ = P.useRef(null), b = Nt($, l.ref, r), x = (z) => (G) => {
    if (z) {
      const X = $.current;
      G === void 0 ? z(X) : z(X, G);
    }
  }, w = x(m), A = x((z, G) => {
    u0(z);
    const X = ka({
      style: g,
      timeout: v,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", X), z.style.transition = n.transitions.create("opacity", X), d && d(z, G);
  }), j = x(p), k = x(h), K = x((z) => {
    const G = ka({
      style: g,
      timeout: v,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", G), z.style.transition = n.transitions.create("opacity", G), f && f(z);
  }), U = x(y), H = (z) => {
    i && i($.current, z);
  };
  return /* @__PURE__ */ E.jsx(S, C({
    appear: a,
    in: u,
    nodeRef: $,
    onEnter: A,
    onEntered: j,
    onEntering: w,
    onExit: K,
    onExited: U,
    onExiting: k,
    addEndListener: H,
    timeout: v
  }, _, {
    children: (z, G) => /* @__PURE__ */ P.cloneElement(l, C({
      style: C({
        opacity: 0,
        visibility: z === "exited" && !u ? "hidden" : void 0
      }, Iq[z], g, l.props.style),
      ref: b
    }, G))
  }));
});
process.env.NODE_ENV !== "production" && (d0.propTypes = {
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
  children: Ua.isRequired,
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
const Nq = d0;
function Aq(e) {
  return De("MuiBackdrop", e);
}
Fe("MuiBackdrop", ["root", "invisible"]);
const jq = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], kq = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return Ve({
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
})), f0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i;
  const a = Ke({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: p = {},
    invisible: m = !1,
    open: f,
    slotProps: y = {},
    slots: h = {},
    TransitionComponent: g = Nq,
    transitionDuration: v
  } = a, S = _e(a, jq), _ = C({}, a, {
    component: u,
    invisible: m
  }), $ = kq(_), b = (n = y.root) != null ? n : p.root;
  return /* @__PURE__ */ E.jsx(g, C({
    in: f,
    timeout: v
  }, S, {
    children: /* @__PURE__ */ E.jsx(Mq, C({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = h.root) != null ? i : d.Root) != null ? o : u,
      className: Se($.root, c, b == null ? void 0 : b.className),
      ownerState: C({}, _, b == null ? void 0 : b.ownerState),
      classes: $,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (f0.propTypes = {
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
const Dq = f0;
function Fq(e) {
  return De("MuiModal", e);
}
Fe("MuiModal", ["root", "hidden", "backdrop"]);
const Lq = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Bq = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return Ve({
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
}), p0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a, l, c;
  const u = Ke({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = zq,
    BackdropProps: p,
    className: m,
    closeAfterTransition: f = !1,
    children: y,
    container: h,
    component: g,
    components: v = {},
    componentsProps: S = {},
    disableAutoFocus: _ = !1,
    disableEnforceFocus: $ = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: x = !1,
    disableRestoreFocus: w = !1,
    disableScrollLock: A = !1,
    hideBackdrop: j = !1,
    keepMounted: k = !1,
    onBackdropClick: K,
    open: U,
    slotProps: H,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = u, G = _e(u, Lq), X = C({}, u, {
    closeAfterTransition: f,
    disableAutoFocus: _,
    disableEnforceFocus: $,
    disableEscapeKeyDown: b,
    disablePortal: x,
    disableRestoreFocus: w,
    disableScrollLock: A,
    hideBackdrop: j,
    keepMounted: k
  }), {
    getRootProps: J,
    getBackdropProps: Z,
    getTransitionProps: ne,
    portalRef: D,
    isTopModal: N,
    exited: W,
    hasTransition: F
  } = wx(C({}, X, {
    rootRef: r
  })), O = C({}, X, {
    exited: W
  }), R = Bq(O), B = {};
  if (y.props.tabIndex === void 0 && (B.tabIndex = "-1"), F) {
    const {
      onEnter: pe,
      onExited: te
    } = ne();
    B.onEnter = pe, B.onExited = te;
  }
  const Q = (n = (o = z == null ? void 0 : z.root) != null ? o : v.Root) != null ? n : Vq, Y = (i = (a = z == null ? void 0 : z.backdrop) != null ? a : v.Backdrop) != null ? i : d, oe = (l = H == null ? void 0 : H.root) != null ? l : S.root, ie = (c = H == null ? void 0 : H.backdrop) != null ? c : S.backdrop, ce = Dt({
    elementType: Q,
    externalSlotProps: oe,
    externalForwardedProps: G,
    getSlotProps: J,
    additionalProps: {
      ref: r,
      as: g
    },
    ownerState: O,
    className: Se(m, oe == null ? void 0 : oe.className, R == null ? void 0 : R.root, !O.open && O.exited && (R == null ? void 0 : R.hidden))
  }), q = Dt({
    elementType: Y,
    externalSlotProps: ie,
    additionalProps: p,
    getSlotProps: (pe) => Z(C({}, pe, {
      onClick: (te) => {
        K && K(te), pe != null && pe.onClick && pe.onClick(te);
      }
    })),
    className: Se(ie == null ? void 0 : ie.className, p == null ? void 0 : p.className, R == null ? void 0 : R.backdrop),
    ownerState: O
  });
  return !k && !U && (!F || W) ? null : /* @__PURE__ */ E.jsx($a, {
    ref: D,
    container: h,
    disablePortal: x,
    children: /* @__PURE__ */ E.jsxs(Q, C({}, ce, {
      children: [!j && d ? /* @__PURE__ */ E.jsx(Y, C({}, q)) : null, /* @__PURE__ */ E.jsx(ba, {
        disableEnforceFocus: $,
        disableAutoFocus: _,
        disableRestoreFocus: w,
        isEnabled: N,
        open: U,
        children: /* @__PURE__ */ P.cloneElement(y, B)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (p0.propTypes = {
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
  children: Ua.isRequired,
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
  container: s.oneOfType([Ki, s.func]),
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
const Uq = p0;
function Wq(e) {
  return De("MuiPopover", e);
}
Fe("MuiPopover", ["root", "paper"]);
const qq = ["onEntering"], Kq = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Hq = ["slotProps"];
function Fh(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function Lh(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function Bh(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function aa(e) {
  return typeof e == "function" ? e() : e;
}
const Gq = (e) => {
  const {
    classes: t
  } = e;
  return Ve({
    root: ["root"],
    paper: ["paper"]
  }, Wq, t);
}, Yq = he(Uq, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), m0 = he(Ml, {
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
}), h0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i;
  const a = Ke({
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
    children: m,
    className: f,
    container: y,
    elevation: h = 8,
    marginThreshold: g = 16,
    open: v,
    PaperProps: S = {},
    slots: _,
    slotProps: $,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: x = Pq,
    transitionDuration: w = "auto",
    TransitionProps: {
      onEntering: A
    } = {},
    disableScrollLock: j = !1
  } = a, k = _e(a.TransitionProps, qq), K = _e(a, Kq), U = (n = $ == null ? void 0 : $.paper) != null ? n : S, H = P.useRef(), z = Nt(H, U.ref), G = C({}, a, {
    anchorOrigin: u,
    anchorReference: p,
    elevation: h,
    marginThreshold: g,
    externalPaperSlotProps: U,
    transformOrigin: b,
    TransitionComponent: x,
    transitionDuration: w,
    TransitionProps: k
  }), X = Gq(G), J = P.useCallback(() => {
    if (p === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const pe = aa(c), te = pe && pe.nodeType === 1 ? pe : jt(H.current).body, fe = te.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Pe = te.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Pe.top === 0 && Pe.left === 0 && Pe.right === 0 && Pe.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: fe.top + Fh(fe, u.vertical),
      left: fe.left + Lh(fe, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, p]), Z = P.useCallback((pe) => ({
    vertical: Fh(pe, b.vertical),
    horizontal: Lh(pe, b.horizontal)
  }), [b.horizontal, b.vertical]), ne = P.useCallback((pe) => {
    const te = {
      width: pe.offsetWidth,
      height: pe.offsetHeight
    }, fe = Z(te);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Bh(fe)
      };
    const Pe = J();
    let Ae = Pe.top - fe.vertical, Be = Pe.left - fe.horizontal;
    const st = Ae + te.height, je = Be + te.width, Me = Br(aa(c)), Qe = Me.innerHeight - g, He = Me.innerWidth - g;
    if (g !== null && Ae < g) {
      const ze = Ae - g;
      Ae -= ze, fe.vertical += ze;
    } else if (g !== null && st > Qe) {
      const ze = st - Qe;
      Ae -= ze, fe.vertical += ze;
    }
    if (process.env.NODE_ENV !== "production" && te.height > Qe && te.height && Qe && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${te.height - Qe}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), g !== null && Be < g) {
      const ze = Be - g;
      Be -= ze, fe.horizontal += ze;
    } else if (je > He) {
      const ze = je - He;
      Be -= ze, fe.horizontal += ze;
    }
    return {
      top: `${Math.round(Ae)}px`,
      left: `${Math.round(Be)}px`,
      transformOrigin: Bh(fe)
    };
  }, [c, p, J, Z, g]), [D, N] = P.useState(v), W = P.useCallback(() => {
    const pe = H.current;
    if (!pe)
      return;
    const te = ne(pe);
    te.top !== null && (pe.style.top = te.top), te.left !== null && (pe.style.left = te.left), pe.style.transformOrigin = te.transformOrigin, N(!0);
  }, [ne]);
  P.useEffect(() => (j && window.addEventListener("scroll", W), () => window.removeEventListener("scroll", W)), [c, j, W]);
  const F = (pe, te) => {
    A && A(pe, te), W();
  }, O = () => {
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
    const pe = ss(() => {
      W();
    }), te = Br(c);
    return te.addEventListener("resize", pe), () => {
      pe.clear(), te.removeEventListener("resize", pe);
    };
  }, [c, v, W]);
  let R = w;
  w === "auto" && !x.muiSupportAuto && (R = void 0);
  const B = y || (c ? jt(aa(c)).body : void 0), Q = (o = _ == null ? void 0 : _.root) != null ? o : Yq, Y = (i = _ == null ? void 0 : _.paper) != null ? i : m0, oe = Dt({
    elementType: Y,
    externalSlotProps: C({}, U, {
      style: D ? U.style : C({}, U.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: h,
      ref: z
    },
    ownerState: G,
    className: Se(X.paper, U == null ? void 0 : U.className)
  }), ie = Dt({
    elementType: Q,
    externalSlotProps: ($ == null ? void 0 : $.root) || {},
    externalForwardedProps: K,
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
    className: Se(X.root, f)
  }), {
    slotProps: ce
  } = ie, q = _e(ie, Hq);
  return /* @__PURE__ */ E.jsx(Q, C({}, q, !Lr(Q) && {
    slotProps: ce,
    disableScrollLock: j
  }, {
    children: /* @__PURE__ */ E.jsx(x, C({
      appear: !0,
      in: v,
      onEntering: F,
      onExited: O,
      timeout: R
    }, k, {
      children: /* @__PURE__ */ E.jsx(Y, C({}, oe, {
        children: m
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (h0.propTypes = {
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
  anchorEl: Zr(s.oneOfType([Ki, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = aa(e.anchorEl);
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
  container: s.oneOfType([Ki, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Ay,
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
    component: Wa
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
const Xq = h0;
function Jq(e) {
  return De("MuiMenu", e);
}
Fe("MuiMenu", ["root", "paper", "list"]);
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
  return Ve({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Jq, t);
}, n6 = he(Xq, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), o6 = he(m0, {
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
}), i6 = he(Oq, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), y0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = Ke({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: p,
    open: m,
    PaperProps: f = {},
    PopoverClasses: y,
    transitionDuration: h = "auto",
    TransitionProps: {
      onEntering: g
    } = {},
    variant: v = "selectedMenu",
    slots: S = {},
    slotProps: _ = {}
  } = i, $ = _e(i.TransitionProps, Zq), b = _e(i, Qq), x = Sn(), w = x.direction === "rtl", A = C({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: g,
    PaperProps: f,
    transitionDuration: h,
    TransitionProps: $,
    variant: v
  }), j = r6(A), k = a && !u && m, K = P.useRef(null), U = (ne, D) => {
    K.current && K.current.adjustStyleForScrollbar(ne, x), g && g(ne, D);
  }, H = (ne) => {
    ne.key === "Tab" && (ne.preventDefault(), p && p(ne, "tabKeyDown"));
  };
  let z = -1;
  P.Children.map(l, (ne, D) => {
    /* @__PURE__ */ P.isValidElement(ne) && (process.env.NODE_ENV !== "production" && Un.isFragment(ne) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), ne.props.disabled || (v === "selectedMenu" && ne.props.selected || z === -1) && (z = D));
  });
  const G = (n = S.paper) != null ? n : o6, X = (o = _.paper) != null ? o : f, J = Dt({
    elementType: S.root,
    externalSlotProps: _.root,
    ownerState: A,
    className: [j.root, c]
  }), Z = Dt({
    elementType: G,
    externalSlotProps: X,
    ownerState: A,
    className: j.paper
  });
  return /* @__PURE__ */ E.jsx(n6, C({
    onClose: p,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: w ? "right" : "left"
    },
    transformOrigin: w ? e6 : t6,
    slots: {
      paper: G,
      root: S.root
    },
    slotProps: {
      root: J,
      paper: Z
    },
    open: m,
    ref: r,
    transitionDuration: h,
    TransitionProps: C({
      onEntering: U
    }, $),
    ownerState: A
  }, b, {
    classes: y,
    children: /* @__PURE__ */ E.jsx(i6, C({
      onKeyDown: H,
      actions: K,
      autoFocus: a && (z === -1 || u),
      autoFocusItem: k,
      variant: v
    }, d, {
      className: Se(j.list, d.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (y0.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([Ki, s.func]),
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
const s6 = y0;
function a6(e) {
  return De("MuiNativeSelect", e);
}
const l6 = Fe("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Bd = l6, c6 = ["className", "disabled", "error", "IconComponent", "inputRef", "variant"], u6 = (e) => {
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
  return Ve(l, a6, t);
}, g0 = ({
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
})(g0), v0 = ({
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
})(v0), b0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    className: n,
    disabled: o,
    error: i,
    IconComponent: a,
    inputRef: l,
    variant: c = "standard"
  } = t, u = _e(t, c6), d = C({}, t, {
    disabled: o,
    variant: c,
    error: i
  }), p = u6(d);
  return /* @__PURE__ */ E.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ E.jsx(d6, C({
      ownerState: d,
      className: Se(p.select, n),
      disabled: o,
      ref: l || r
    }, u)), t.multiple ? null : /* @__PURE__ */ E.jsx(f6, {
      as: a,
      ownerState: d,
      className: p.icon
    })]
  });
});
process.env.NODE_ENV !== "production" && (b0.propTypes = {
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
const p6 = b0;
function m6(e) {
  return De("MuiSelect", e);
}
const h6 = Fe("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), Oi = h6;
var Vh;
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
        [`&.${Oi.select}`]: t.select
      },
      {
        [`&.${Oi.select}`]: t[r.variant]
      },
      {
        [`&.${Oi.error}`]: t.error
      },
      {
        [`&.${Oi.multiple}`]: t.multiple
      }
    ];
  }
})(g0, {
  // Win specificity over the input base
  [`&.${Oi.select}`]: {
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
})(v0), b6 = he("input", {
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
function zh(e, t) {
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
  return Ve(l, m6, t);
}, $0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
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
    disabled: m,
    displayEmpty: f,
    error: y = !1,
    IconComponent: h,
    inputRef: g,
    labelId: v,
    MenuProps: S = {},
    multiple: _,
    name: $,
    onBlur: b,
    onChange: x,
    onClose: w,
    onFocus: A,
    onOpen: j,
    open: k,
    readOnly: K,
    renderValue: U,
    SelectDisplayProps: H = {},
    tabIndex: z,
    value: G,
    variant: X = "standard"
  } = t, J = _e(t, y6), [Z, ne] = Ro({
    controlled: G,
    default: p,
    name: "Select"
  }), [D, N] = Ro({
    controlled: k,
    default: d,
    name: "Select"
  }), W = P.useRef(null), F = P.useRef(null), [O, R] = P.useState(null), {
    current: B
  } = P.useRef(k != null), [Q, Y] = P.useState(), oe = Nt(r, g), ie = P.useCallback((re) => {
    F.current = re, re && R(re);
  }, []), ce = O == null ? void 0 : O.parentNode;
  P.useImperativeHandle(oe, () => ({
    focus: () => {
      F.current.focus();
    },
    node: W.current,
    value: Z
  }), [Z]), P.useEffect(() => {
    d && D && O && !B && (Y(l ? null : ce.clientWidth), F.current.focus());
  }, [O, l]), P.useEffect(() => {
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
    re ? j && j(se) : w && w(se), B || (Y(l ? null : ce.clientWidth), N(re));
  }, pe = (re) => {
    re.button === 0 && (re.preventDefault(), F.current.focus(), q(!0, re));
  }, te = (re) => {
    q(!1, re);
  }, fe = P.Children.toArray(c), Pe = (re) => {
    const se = fe.find(($e) => $e.props.value === re.target.value);
    se !== void 0 && (ne(se.props.value), x && x(re, se));
  }, Ae = (re) => (se) => {
    let $e;
    if (se.currentTarget.hasAttribute("tabindex")) {
      if (_) {
        $e = Array.isArray(Z) ? Z.slice() : [];
        const Ne = Z.indexOf(re.props.value);
        Ne === -1 ? $e.push(re.props.value) : $e.splice(Ne, 1);
      } else
        $e = re.props.value;
      if (re.props.onClick && re.props.onClick(se), Z !== $e && (ne($e), x)) {
        const Ne = se.nativeEvent || se, et = new Ne.constructor(Ne.type, Ne);
        Object.defineProperty(et, "target", {
          writable: !0,
          value: {
            value: $e,
            name: $
          }
        }), x(et, re);
      }
      _ || q(!1, se);
    }
  }, Be = (re) => {
    K || [
      " ",
      "ArrowUp",
      "ArrowDown",
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      "Enter"
    ].indexOf(re.key) !== -1 && (re.preventDefault(), q(!0, re));
  }, st = O !== null && D, je = (re) => {
    !st && b && (Object.defineProperty(re, "target", {
      writable: !0,
      value: {
        value: Z,
        name: $
      }
    }), b(re));
  };
  delete J["aria-invalid"];
  let Me, Qe;
  const He = [];
  let ze = !1, le = !1;
  (ja({
    value: Z
  }) || f) && (U ? Me = U(Z) : ze = !0);
  const ye = fe.map((re) => {
    if (!/* @__PURE__ */ P.isValidElement(re))
      return null;
    process.env.NODE_ENV !== "production" && Un.isFragment(re) && console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    let se;
    if (_) {
      if (!Array.isArray(Z))
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : vn(2));
      se = Z.some(($e) => zh($e, re.props.value)), se && ze && He.push(re.props.children);
    } else
      se = zh(Z, re.props.value), se && ze && (Qe = re.props.children);
    return se && (le = !0), /* @__PURE__ */ P.cloneElement(re, {
      "aria-selected": se ? "true" : "false",
      onClick: Ae(re),
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
    if (!le && !_ && Z !== "") {
      const re = fe.map((se) => se.props.value);
      console.warn([`MUI: You have provided an out-of-range value \`${Z}\` for the select ${$ ? `(name="${$}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${re.filter((se) => se != null).map((se) => `\`${se}\``).join(", ") || '""'}.`].join(`
`));
    }
  }, [le, fe, _, $, Z]), ze && (_ ? He.length === 0 ? Me = null : Me = He.reduce((re, se, $e) => (re.push(se), $e < He.length - 1 && re.push(", "), re), []) : Me = Qe);
  let be = Q;
  !l && B && O && (be = ce.clientWidth);
  let ge;
  typeof z < "u" ? ge = z : ge = m ? null : 0;
  const ue = H.id || ($ ? `mui-component-select-${$}` : void 0), Ue = C({}, t, {
    variant: X,
    value: Z,
    open: st,
    error: y
  }), Ie = S6(Ue), Ye = C({}, S.PaperProps, (n = S.slotProps) == null ? void 0 : n.paper), Je = Hi(), Tt = Hi();
  return /* @__PURE__ */ E.jsxs(P.Fragment, {
    children: [/* @__PURE__ */ E.jsx(g6, C({
      ref: ie,
      tabIndex: ge,
      role: "combobox",
      "aria-controls": Je,
      "aria-disabled": m ? "true" : void 0,
      "aria-expanded": st ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": i,
      "aria-labelledby": [v, ue].filter(Boolean).join(" ") || void 0,
      "aria-describedby": o,
      onKeyDown: Be,
      onMouseDown: m || K ? null : pe,
      onBlur: je,
      onFocus: A
    }, H, {
      ownerState: Ue,
      className: Se(H.className, Ie.select, u),
      id: ue,
      children: $6(Me) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        Vh || (Vh = /* @__PURE__ */ E.jsx("span", {
          className: "notranslate",
          children: "​"
        }))
      ) : Me
    })), /* @__PURE__ */ E.jsx(b6, C({
      "aria-invalid": y,
      value: Array.isArray(Z) ? Z.join(",") : Z,
      name: $ ?? Tt,
      ref: W,
      "aria-hidden": !0,
      onChange: Pe,
      tabIndex: -1,
      disabled: m,
      className: Ie.nativeInput,
      autoFocus: a,
      ownerState: Ue
    }, J)), /* @__PURE__ */ E.jsx(v6, {
      as: h,
      className: Ie.icon,
      ownerState: Ue
    }), /* @__PURE__ */ E.jsx(s6, C({
      id: `menu-${$ || ""}`,
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
    }, S, {
      MenuListProps: C({
        "aria-labelledby": v,
        role: "listbox",
        "aria-multiselectable": _ ? "true" : void 0,
        disableListWrap: !0,
        id: Je
      }, S.MenuListProps),
      slotProps: C({}, S.slotProps, {
        paper: C({}, Ye, {
          style: C({
            minWidth: be
          }, Ye != null ? Ye.style : null)
        })
      }),
      children: ye
    }))]
  });
});
process.env.NODE_ENV !== "production" && ($0.propTypes = {
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
const _6 = $0, E6 = en(/* @__PURE__ */ E.jsx("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown"), x6 = ["autoWidth", "children", "classes", "className", "defaultOpen", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"], w6 = ["root"], O6 = (e) => {
  const {
    classes: t
  } = e;
  return t;
}, Vd = {
  name: "MuiSelect",
  overridesResolver: (e, t) => t.root,
  shouldForwardProp: (e) => Gt(e) && e !== "variant",
  slot: "Root"
}, T6 = he(Jb, Vd)(""), C6 = he(e0, Vd)(""), P6 = he(Zb, Vd)(""), zd = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    name: "MuiSelect",
    props: t
  }), {
    autoWidth: o = !1,
    children: i,
    classes: a = {},
    className: l,
    defaultOpen: c = !1,
    displayEmpty: u = !1,
    IconComponent: d = E6,
    id: p,
    input: m,
    inputProps: f,
    label: y,
    labelId: h,
    MenuProps: g,
    multiple: v = !1,
    native: S = !1,
    onClose: _,
    onOpen: $,
    open: b,
    renderValue: x,
    SelectDisplayProps: w,
    variant: A = "outlined"
  } = n, j = _e(n, x6), k = S ? p6 : _6, K = on(), U = xn({
    props: n,
    muiFormControl: K,
    states: ["variant", "error"]
  }), H = U.variant || A, z = C({}, n, {
    variant: H,
    classes: a
  }), G = O6(z), X = _e(G, w6), J = m || {
    standard: /* @__PURE__ */ E.jsx(T6, {
      ownerState: z
    }),
    outlined: /* @__PURE__ */ E.jsx(C6, {
      label: y,
      ownerState: z
    }),
    filled: /* @__PURE__ */ E.jsx(P6, {
      ownerState: z
    })
  }[H], Z = Nt(r, J.ref);
  return /* @__PURE__ */ E.jsx(P.Fragment, {
    children: /* @__PURE__ */ P.cloneElement(J, C({
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: k,
      inputProps: C({
        children: i,
        error: U.error,
        IconComponent: d,
        variant: H,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple: v
      }, S ? {
        id: p
      } : {
        autoWidth: o,
        defaultOpen: c,
        displayEmpty: u,
        labelId: h,
        MenuProps: g,
        onClose: _,
        onOpen: $,
        open: b,
        renderValue: x,
        SelectDisplayProps: C({
          id: p
        }, w)
      }, f, {
        classes: f ? Ht(X, f.classes) : X
      }, m ? m.props.inputProps : {})
    }, v && S && H === "outlined" ? {
      notched: !0
    } : {}, {
      ref: Z,
      className: Se(J.props.className, l, G.root)
    }, !m && {
      variant: H
    }, j))
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
  return De("MuiTextField", e);
}
Fe("MuiTextField", ["root"]);
const N6 = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"], A6 = {
  standard: Jb,
  filled: Zb,
  outlined: e0
}, j6 = (e) => {
  const {
    classes: t
  } = e;
  return Ve({
    root: ["root"]
  }, I6, t);
}, k6 = he(o0, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), S0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    FormHelperTextProps: m,
    fullWidth: f = !1,
    helperText: y,
    id: h,
    InputLabelProps: g,
    inputProps: v,
    InputProps: S,
    inputRef: _,
    label: $,
    maxRows: b,
    minRows: x,
    multiline: w = !1,
    name: A,
    onBlur: j,
    onChange: k,
    onFocus: K,
    placeholder: U,
    required: H = !1,
    rows: z,
    select: G = !1,
    SelectProps: X,
    type: J,
    value: Z,
    variant: ne = "outlined"
  } = n, D = _e(n, N6), N = C({}, n, {
    autoFocus: i,
    color: c,
    disabled: d,
    error: p,
    fullWidth: f,
    multiline: w,
    required: H,
    select: G,
    variant: ne
  }), W = j6(N);
  process.env.NODE_ENV !== "production" && G && !a && console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
  const F = {};
  ne === "outlined" && (g && typeof g.shrink < "u" && (F.notched = g.shrink), F.label = $), G && ((!X || !X.native) && (F.id = void 0), F["aria-describedby"] = void 0);
  const O = Hi(h), R = y && O ? `${O}-helper-text` : void 0, B = $ && O ? `${O}-label` : void 0, Q = A6[ne], Y = /* @__PURE__ */ E.jsx(Q, C({
    "aria-describedby": R,
    autoComplete: o,
    autoFocus: i,
    defaultValue: u,
    fullWidth: f,
    multiline: w,
    name: A,
    rows: z,
    maxRows: b,
    minRows: x,
    type: J,
    value: Z,
    id: O,
    inputRef: _,
    onBlur: j,
    onChange: k,
    onFocus: K,
    placeholder: U,
    inputProps: v
  }, F, S));
  return /* @__PURE__ */ E.jsxs(k6, C({
    className: Se(W.root, l),
    disabled: d,
    error: p,
    fullWidth: f,
    ref: r,
    required: H,
    color: c,
    variant: ne,
    ownerState: N
  }, D, {
    children: [$ != null && $ !== "" && /* @__PURE__ */ E.jsx(dq, C({
      htmlFor: O,
      id: B
    }, g, {
      children: $
    })), G ? /* @__PURE__ */ E.jsx(R6, C({
      "aria-describedby": R,
      id: O,
      labelId: B,
      value: Z,
      input: Y
    }, X, {
      children: a
    })) : Y, y && /* @__PURE__ */ E.jsx(Dd, C({
      id: R
    }, m, {
      children: y
    }))]
  }));
});
process.env.NODE_ENV !== "production" && (S0.propTypes = {
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
const Ud = S0, M6 = ["date", "datetime-local", "file", "time"];
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
    onChange: m,
    onChangeOverride: f,
    onBlur: y,
    onFocus: h,
    autofocus: g,
    options: v,
    schema: S,
    uiSchema: _,
    rawErrors: $ = [],
    formContext: b,
    registry: x,
    InputLabelProps: w,
    ...A
  } = e, j = yb(S, l, v), { step: k, min: K, max: U, ...H } = j, z = {
    inputProps: {
      step: k,
      min: K,
      max: U,
      ...S.examples ? { list: ts(t) } : void 0
    },
    ...H
  }, G = ({ target: { value: ne } }) => m(ne === "" ? v.emptyValue : ne), X = ({ target: { value: ne } }) => y(t, ne), J = ({ target: { value: ne } }) => h(t, ne), Z = M6.includes(l) ? {
    ...w,
    shrink: !0
  } : w;
  return E.jsxs(E.Fragment, { children: [E.jsx(Ud, { id: t, name: t, placeholder: n, label: En(c || void 0, u, void 0), autoFocus: g, required: o, disabled: a || i, ...z, value: p || p === 0 ? p : "", error: $.length > 0, onChange: f || G, onBlur: X, onFocus: J, InputLabelProps: Z, ...A, "aria-describedby": or(t, !!S.examples) }), Array.isArray(S.examples) && E.jsx("datalist", { id: ts(t), children: S.examples.concat(S.default && !S.examples.includes(S.default) ? [S.default] : []).map((ne) => E.jsx("option", { value: ne }, ne)) })] });
}
function F6(e) {
  return De("MuiTypography", e);
}
Fe("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
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
  return Ve(l, F6, a);
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
})), Uh = {
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
  const n = Ke({
    props: t,
    name: "MuiTypography"
  }), o = U6(n.color), i = ul(C({}, n, {
    color: o
  })), {
    align: a = "inherit",
    className: l,
    component: c,
    gutterBottom: u = !1,
    noWrap: d = !1,
    paragraph: p = !1,
    variant: m = "body1",
    variantMapping: f = Uh
  } = i, y = _e(i, L6), h = C({}, i, {
    align: a,
    color: o,
    className: l,
    component: c,
    gutterBottom: u,
    noWrap: d,
    paragraph: p,
    variant: m,
    variantMapping: f
  }), g = c || (p ? "p" : f[m] || Uh[m]) || "span", v = B6(h);
  return /* @__PURE__ */ E.jsx(V6, C({
    as: g,
    ref: r,
    ownerState: h,
    className: Se(v.root, l)
  }, y));
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
const Or = _0;
function W6(e) {
  const { id: t, description: r } = e;
  return r ? E.jsx(Or, { id: t, variant: "subtitle2", style: { marginTop: "5px" }, children: r }) : null;
}
var Wd = {}, q6 = si;
Object.defineProperty(Wd, "__esModule", {
  value: !0
});
var E0 = Wd.default = void 0, K6 = q6(ai()), H6 = E, G6 = (0, K6.default)(/* @__PURE__ */ (0, H6.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
}), "Error");
E0 = Wd.default = G6;
function Y6(e) {
  return De("MuiListItem", e);
}
const X6 = Fe("MuiListItem", ["root", "container", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "padding", "button", "secondaryAction", "selected"]), bo = X6, J6 = Fe("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]), Z6 = J6;
function Q6(e) {
  return De("MuiListItemSecondaryAction", e);
}
Fe("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const eK = ["className"], tK = (e) => {
  const {
    disableGutters: t,
    classes: r
  } = e;
  return Ve({
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
  const n = Ke({
    props: t,
    name: "MuiListItemSecondaryAction"
  }), {
    className: o
  } = n, i = _e(n, eK), a = P.useContext(Yr), l = C({}, n, {
    disableGutters: a.disableGutters
  }), c = tK(l);
  return /* @__PURE__ */ E.jsx(rK, C({
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
  return Ve({
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
  [`&.${bo.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${bo.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${bo.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${bo.disabled}`]: {
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
  [`&.${bo.selected}:hover`]: {
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
}), x0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    ContainerComponent: m = "li",
    ContainerProps: {
      className: f
    } = {},
    dense: y = !1,
    disabled: h = !1,
    disableGutters: g = !1,
    disablePadding: v = !1,
    divider: S = !1,
    focusVisibleClassName: _,
    secondaryAction: $,
    selected: b = !1,
    slotProps: x = {},
    slots: w = {}
  } = n, A = _e(n.ContainerProps, oK), j = _e(n, iK), k = P.useContext(Yr), K = P.useMemo(() => ({
    dense: y || k.dense || !1,
    alignItems: o,
    disableGutters: g
  }), [o, k.dense, y, g]), U = P.useRef(null);
  gr(() => {
    i && (U.current ? U.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a ListItem whose component has not been rendered."));
  }, [i]);
  const H = P.Children.toArray(l), z = H.length && Eo(H[H.length - 1], ["ListItemSecondaryAction"]), G = C({}, n, {
    alignItems: o,
    autoFocus: i,
    button: a,
    dense: K.dense,
    disabled: h,
    disableGutters: g,
    disablePadding: v,
    divider: S,
    hasSecondaryAction: z,
    selected: b
  }), X = aK(G), J = Nt(U, r), Z = w.root || d.Root || lK, ne = x.root || p.root || {}, D = C({
    className: Se(X.root, ne.className, c),
    disabled: h
  }, j);
  let N = u || "li";
  return a && (D.component = u || "div", D.focusVisibleClassName = Se(bo.focusVisible, _), N = Xn), z ? (N = !D.component && !u ? "div" : N, m === "li" && (N === "li" ? N = "div" : D.component === "li" && (D.component = "div")), /* @__PURE__ */ E.jsx(Yr.Provider, {
    value: K,
    children: /* @__PURE__ */ E.jsxs(cK, C({
      as: m,
      className: Se(X.container, f),
      ref: J,
      ownerState: G
    }, A, {
      children: [/* @__PURE__ */ E.jsx(Z, C({}, ne, !Lr(Z) && {
        as: N,
        ownerState: C({}, G, ne.ownerState)
      }, D, {
        children: H
      })), H.pop()]
    }))
  })) : /* @__PURE__ */ E.jsx(Yr.Provider, {
    value: K,
    children: /* @__PURE__ */ E.jsxs(Z, C({}, ne, {
      as: N,
      ref: J
    }, !Lr(Z) && {
      ownerState: C({}, G, ne.ownerState)
    }, D, {
      children: [H, $ && /* @__PURE__ */ E.jsx(nK, {
        children: $
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (x0.propTypes = {
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
  ContainerComponent: Wa,
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
const w0 = x0;
function uK(e) {
  return De("MuiListItemIcon", e);
}
const dK = Fe("MuiListItemIcon", ["root", "alignItemsFlexStart"]), Wh = dK, fK = ["className"], pK = (e) => {
  const {
    alignItems: t,
    classes: r
  } = e;
  return Ve({
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
  const n = Ke({
    props: t,
    name: "MuiListItemIcon"
  }), {
    className: o
  } = n, i = _e(n, fK), a = P.useContext(Yr), l = C({}, n, {
    alignItems: a.alignItems
  }), c = pK(l);
  return /* @__PURE__ */ E.jsx(mK, C({
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
  return De("MuiListItemText", e);
}
const gK = Fe("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]), Ma = gK, vK = ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"], bK = (e) => {
  const {
    classes: t,
    inset: r,
    primary: n,
    secondary: o,
    dense: i
  } = e;
  return Ve({
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
      [`& .${Ma.primary}`]: t.primary
    }, {
      [`& .${Ma.secondary}`]: t.secondary
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
})), T0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
  } = n, m = _e(n, vK), {
    dense: f
  } = P.useContext(Yr);
  let y = c ?? o, h = d;
  const g = C({}, n, {
    disableTypography: a,
    inset: l,
    primary: !!y,
    secondary: !!h,
    dense: f
  }), v = bK(g);
  return y != null && y.type !== Or && !a && (y = /* @__PURE__ */ E.jsx(Or, C({
    variant: f ? "body2" : "body1",
    className: v.primary,
    component: u != null && u.variant ? void 0 : "span",
    display: "block"
  }, u, {
    children: y
  }))), h != null && h.type !== Or && !a && (h = /* @__PURE__ */ E.jsx(Or, C({
    variant: "body2",
    className: v.secondary,
    color: "text.secondary",
    display: "block"
  }, p, {
    children: h
  }))), /* @__PURE__ */ E.jsxs($K, C({
    className: Se(v.root, i),
    ownerState: g,
    ref: r
  }, m, {
    children: [y, h]
  }));
});
process.env.NODE_ENV !== "production" && (T0.propTypes = {
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
const SK = T0;
function _K({ errors: e, registry: t }) {
  const { translateString: r } = t;
  return E.jsx(Ml, { elevation: 2, children: E.jsxs(Vr, { mb: 2, p: 2, children: [E.jsx(Or, { variant: "h6", children: r(Ze.ErrorsLabel) }), E.jsx(Fd, { dense: !0, children: e.map((n, o) => E.jsxs(w0, { children: [E.jsx(hK, { children: E.jsx(E0, { color: "error" }) }), E.jsx(SK, { primary: n.stack })] }, o)) })] }) });
}
var Kd = {}, EK = si;
Object.defineProperty(Kd, "__esModule", {
  value: !0
});
var C0 = Kd.default = void 0, xK = EK(ai()), wK = E, OK = (0, xK.default)(/* @__PURE__ */ (0, wK.jsx)("path", {
  d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
}), "ArrowDownward");
C0 = Kd.default = OK;
var Hd = {}, TK = si;
Object.defineProperty(Hd, "__esModule", {
  value: !0
});
var P0 = Hd.default = void 0, CK = TK(ai()), PK = E, RK = (0, CK.default)(/* @__PURE__ */ (0, PK.jsx)("path", {
  d: "m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
}), "ArrowUpward");
P0 = Hd.default = RK;
var Gd = {}, IK = si;
Object.defineProperty(Gd, "__esModule", {
  value: !0
});
var R0 = Gd.default = void 0, NK = IK(ai()), AK = E, jK = (0, NK.default)(/* @__PURE__ */ (0, AK.jsx)("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
}), "ContentCopy");
R0 = Gd.default = jK;
var Yd = {}, kK = si;
Object.defineProperty(Yd, "__esModule", {
  value: !0
});
var I0 = Yd.default = void 0, MK = kK(ai()), DK = E, FK = (0, MK.default)(/* @__PURE__ */ (0, DK.jsx)("path", {
  d: "M19 13H5v-2h14v2z"
}), "Remove");
I0 = Yd.default = FK;
function zl(e) {
  const { icon: t, color: r, uiSchema: n, registry: o, ...i } = e;
  return E.jsx(Wb, { ...i, size: "small", color: r, children: t });
}
function LK(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx(zl, { title: t(Ze.CopyButton), ...e, icon: E.jsx(R0, { fontSize: "small" }) });
}
function BK(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx(zl, { title: t(Ze.MoveDownButton), ...e, icon: E.jsx(C0, { fontSize: "small" }) });
}
function VK(e) {
  const { registry: { translateString: t } } = e;
  return E.jsx(zl, { title: t(Ze.MoveUpButton), ...e, icon: E.jsx(P0, { fontSize: "small" }) });
}
function zK(e) {
  const { iconType: t, ...r } = e, { registry: { translateString: n } } = r;
  return E.jsx(zl, { title: n(Ze.RemoveButton), ...r, color: "error", icon: E.jsx(I0, { fontSize: t === "default" ? void 0 : "small" }) });
}
function UK(e) {
  const { errors: t = [], idSchema: r } = e;
  if (t.length === 0)
    return null;
  const n = wd(r);
  return E.jsx(Fd, { dense: !0, disablePadding: !0, children: t.map((o, i) => E.jsx(w0, { disableGutters: !0, children: E.jsx(Dd, { id: n, children: o }) }, i)) });
}
function WK(e) {
  const { idSchema: t, help: r } = e;
  if (!r)
    return null;
  const n = Od(t);
  return E.jsx(Dd, { id: n, children: r });
}
function qK(e) {
  const { id: t, children: r, classNames: n, style: o, disabled: i, displayLabel: a, hidden: l, label: c, onDropPropertyClick: u, onKeyChange: d, readonly: p, required: m, rawErrors: f = [], errors: y, help: h, description: g, rawDescription: v, schema: S, uiSchema: _, registry: $ } = e, b = rt(_), x = qe("WrapIfAdditionalTemplate", $, b);
  return l ? E.jsx("div", { style: { display: "none" }, children: r }) : E.jsx(x, { classNames: n, style: o, disabled: i, id: t, label: c, onDropPropertyClick: u, onKeyChange: d, readonly: p, required: m, schema: S, uiSchema: _, registry: $, children: E.jsxs(o0, { fullWidth: !0, error: !!f.length, required: m, children: [r, a && v ? E.jsx(Or, { variant: "caption", color: "textSecondary", children: g }) : null, y, h] }) });
}
function KK(e) {
  const { description: t, title: r, properties: n, required: o, disabled: i, readonly: a, uiSchema: l, idSchema: c, schema: u, formData: d, onAddClick: p, registry: m } = e, f = rt(l), y = qe("TitleFieldTemplate", m, f), h = qe("DescriptionFieldTemplate", m, f), { ButtonTemplates: { AddButton: g } } = m.templates;
  return E.jsxs(E.Fragment, { children: [r && E.jsx(y, { id: Td(c), title: r, required: o, schema: u, uiSchema: l, registry: m }), t && E.jsx(h, { id: to(c), description: t, schema: u, uiSchema: l, registry: m }), E.jsxs(lr, { container: !0, spacing: 2, style: { marginTop: "10px" }, children: [n.map((v, S) => (
    // Remove the <Grid> if the inner element is hidden as the <Grid>
    // itself would otherwise still take up space.
    v.hidden ? v.content : E.jsx(lr, { item: !0, xs: 12, style: { marginBottom: "10px" }, children: v.content }, S)
  )), xg(u, l, d) && E.jsx(lr, { container: !0, justifyContent: "flex-end", children: E.jsx(lr, { item: !0, children: E.jsx(g, { className: "object-property-expand", onClick: p(u), disabled: i || a, uiSchema: l, registry: m }) }) })] })] });
}
function HK(e) {
  return De("MuiButton", e);
}
const GK = Fe("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), Us = GK, N0 = /* @__PURE__ */ P.createContext({});
process.env.NODE_ENV !== "production" && (N0.displayName = "ButtonGroupContext");
const YK = N0, A0 = /* @__PURE__ */ P.createContext(void 0);
process.env.NODE_ENV !== "production" && (A0.displayName = "ButtonGroupButtonContext");
const XK = A0, JK = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"], ZK = (e) => {
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
  }, c = Ve(l, HK, a);
  return C({}, a, c);
}, j0 = (e) => C({}, e.size === "small" && {
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
    [`&.${Us.focusVisible}`]: C({}, t.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[6]
    }),
    [`&.${Us.disabled}`]: C({
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
  [`&.${Us.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${Us.disabled}`]: {
    boxShadow: "none"
  }
}), eH = he("span", {
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
}, j0(e))), tH = he("span", {
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
}, j0(e))), k0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = P.useContext(YK), o = P.useContext(XK), i = bu(n, t), a = Ke({
    props: i,
    name: "MuiButton"
  }), {
    children: l,
    color: c = "primary",
    component: u = "button",
    className: d,
    disabled: p = !1,
    disableElevation: m = !1,
    disableFocusRipple: f = !1,
    endIcon: y,
    focusVisibleClassName: h,
    fullWidth: g = !1,
    size: v = "medium",
    startIcon: S,
    type: _,
    variant: $ = "text"
  } = a, b = _e(a, JK), x = C({}, a, {
    color: c,
    component: u,
    disabled: p,
    disableElevation: m,
    disableFocusRipple: f,
    fullWidth: g,
    size: v,
    type: _,
    variant: $
  }), w = ZK(x), A = S && /* @__PURE__ */ E.jsx(eH, {
    className: w.startIcon,
    ownerState: x,
    children: S
  }), j = y && /* @__PURE__ */ E.jsx(tH, {
    className: w.endIcon,
    ownerState: x,
    children: y
  }), k = o || "";
  return /* @__PURE__ */ E.jsxs(QK, C({
    ownerState: x,
    className: Se(n.className, w.root, d, k),
    component: u,
    disabled: p,
    focusRipple: !f,
    focusVisibleClassName: Se(w.focusVisible, h),
    ref: r,
    type: _
  }, b, {
    classes: w,
    children: [A, l, j]
  }));
});
process.env.NODE_ENV !== "production" && (k0.propTypes = {
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
const rH = k0;
function nH({ uiSchema: e }) {
  const { submitText: t, norender: r, props: n = {} } = gb(e);
  return r ? null : E.jsx(Vr, { marginTop: 3, children: E.jsx(rH, { type: "submit", variant: "contained", color: "primary", ...n, children: t }) });
}
function oH(e) {
  return De("MuiDivider", e);
}
const iH = Fe("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]), qh = iH, sH = ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"], aH = (e) => {
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
  return Ve({
    root: ["root", t && "absolute", c, i && "light", a === "vertical" && "vertical", o && "flexItem", r && "withChildren", r && a === "vertical" && "withChildrenVertical", l === "right" && a !== "vertical" && "textAlignRight", l === "left" && a !== "vertical" && "textAlignLeft"],
    wrapper: ["wrapper", a === "vertical" && "wrapperVertical"]
  }, oH, n);
}, lH = he("div", {
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
})), cH = he("span", {
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
  const n = Ke({
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
    textAlign: m = "center",
    variant: f = "fullWidth"
  } = n, y = _e(n, sH), h = C({}, n, {
    absolute: o,
    component: l,
    flexItem: c,
    light: u,
    orientation: d,
    role: p,
    textAlign: m,
    variant: f
  }), g = aH(h);
  return /* @__PURE__ */ E.jsx(lH, C({
    as: l,
    className: Se(g.root, a),
    role: p,
    ref: r,
    ownerState: h
  }, y, {
    children: i ? /* @__PURE__ */ E.jsx(cH, {
      className: g.wrapper,
      ownerState: h,
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
const uH = Xd;
function dH({ id: e, title: t }) {
  return E.jsxs(Vr, { id: e, mb: 1, mt: 1, children: [E.jsx(Or, { variant: "h5", children: t }), E.jsx(uH, {})] });
}
function fH(e) {
  const { children: t, classNames: r, style: n, disabled: o, id: i, label: a, onDropPropertyClick: l, onKeyChange: c, readonly: u, required: d, schema: p, uiSchema: m, registry: f } = e, { templates: y, translateString: h } = f, { RemoveButton: g } = y.ButtonTemplates, v = h(Ze.KeyLabel, [a]), S = Wo in p, _ = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  if (!S)
    return E.jsx("div", { className: r, style: n, children: t });
  const $ = ({ target: b }) => c(b.value);
  return E.jsxs(lr, { container: !0, alignItems: "center", spacing: 2, className: r, style: n, children: [E.jsx(lr, { item: !0, xs: !0, children: E.jsx(Ud, { fullWidth: !0, required: d, label: v, defaultValue: a, disabled: o || u, id: `${i}-key`, name: `${i}-key`, onBlur: u ? void 0 : $, type: "text" }) }), E.jsx(lr, { item: !0, xs: !0, children: t }), E.jsx(lr, { item: !0, children: E.jsx(g, { iconType: "default", style: _, disabled: o || u, onClick: l(a), uiSchema: m, registry: f }) })] }, `${i}-key`);
}
function pH() {
  return {
    ArrayFieldItemTemplate: wW,
    ArrayFieldTemplate: OW,
    BaseInputTemplate: D6,
    ButtonTemplates: {
      AddButton: sW,
      CopyButton: LK,
      MoveDownButton: BK,
      MoveUpButton: VK,
      RemoveButton: zK,
      SubmitButton: nH
    },
    DescriptionFieldTemplate: W6,
    ErrorListTemplate: _K,
    FieldErrorTemplate: UK,
    FieldHelpTemplate: WK,
    FieldTemplate: qK,
    ObjectFieldTemplate: KK,
    TitleFieldTemplate: dH,
    WrapIfAdditionalTemplate: fH
  };
}
function mH(e) {
  return De("PrivateSwitchBase", e);
}
Fe("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const hH = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"], yH = (e) => {
  const {
    classes: t,
    checked: r,
    disabled: n,
    edge: o
  } = e, i = {
    root: ["root", r && "checked", n && "disabled", o && `edge${xe(o)}`],
    input: ["input"]
  };
  return Ve(i, mH, t);
}, gH = he(Xn)(({
  ownerState: e
}) => C({
  padding: 9,
  borderRadius: "50%"
}, e.edge === "start" && {
  marginLeft: e.size === "small" ? -3 : -12
}, e.edge === "end" && {
  marginRight: e.size === "small" ? -3 : -12
})), vH = he("input", {
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
}), M0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
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
    id: m,
    inputProps: f,
    inputRef: y,
    name: h,
    onBlur: g,
    onChange: v,
    onFocus: S,
    readOnly: _,
    required: $ = !1,
    tabIndex: b,
    type: x,
    value: w
  } = t, A = _e(t, hH), [j, k] = Ro({
    controlled: o,
    default: !!l,
    name: "SwitchBase",
    state: "checked"
  }), K = on(), U = (ne) => {
    S && S(ne), K && K.onFocus && K.onFocus(ne);
  }, H = (ne) => {
    g && g(ne), K && K.onBlur && K.onBlur(ne);
  }, z = (ne) => {
    if (ne.nativeEvent.defaultPrevented)
      return;
    const D = ne.target.checked;
    k(D), v && v(ne, D);
  };
  let G = c;
  K && typeof G > "u" && (G = K.disabled);
  const X = x === "checkbox" || x === "radio", J = C({}, t, {
    checked: j,
    disabled: G,
    disableFocusRipple: u,
    edge: d
  }), Z = yH(J);
  return /* @__PURE__ */ E.jsxs(gH, C({
    component: "span",
    className: Se(Z.root, a),
    centerRipple: !0,
    focusRipple: !u,
    disabled: G,
    tabIndex: null,
    role: void 0,
    onFocus: U,
    onBlur: H,
    ownerState: J,
    ref: r
  }, A, {
    children: [/* @__PURE__ */ E.jsx(vH, C({
      autoFocus: n,
      checked: o,
      defaultChecked: l,
      className: Z.input,
      disabled: G,
      id: X ? m : void 0,
      name: h,
      onChange: z,
      readOnly: _,
      ref: y,
      required: $,
      ownerState: J,
      tabIndex: b,
      type: x
    }, x === "checkbox" && w === void 0 ? {} : {
      value: w
    }, f)), j ? i : p]
  }));
});
process.env.NODE_ENV !== "production" && (M0.propTypes = {
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
const D0 = M0, bH = en(/* @__PURE__ */ E.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank"), $H = en(/* @__PURE__ */ E.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox"), SH = en(/* @__PURE__ */ E.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
function _H(e) {
  return De("MuiCheckbox", e);
}
const EH = Fe("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]), Tc = EH, xH = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size", "className"], wH = (e) => {
  const {
    classes: t,
    indeterminate: r,
    color: n,
    size: o
  } = e, i = {
    root: ["root", r && "indeterminate", `color${xe(n)}`, `size${xe(o)}`]
  }, a = Ve(i, _H, t);
  return C({}, t, a);
}, OH = he(D0, {
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
  [`&.${Tc.checked}, &.${Tc.indeterminate}`]: {
    color: (e.vars || e).palette[t.color].main
  },
  [`&.${Tc.disabled}`]: {
    color: (e.vars || e).palette.action.disabled
  }
})), TH = /* @__PURE__ */ E.jsx($H, {}), CH = /* @__PURE__ */ E.jsx(bH, {}), PH = /* @__PURE__ */ E.jsx(SH, {}), F0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = Ke({
    props: t,
    name: "MuiCheckbox"
  }), {
    checkedIcon: a = TH,
    color: l = "primary",
    icon: c = CH,
    indeterminate: u = !1,
    indeterminateIcon: d = PH,
    inputProps: p,
    size: m = "medium",
    className: f
  } = i, y = _e(i, xH), h = u ? d : c, g = u ? d : a, v = C({}, i, {
    color: l,
    indeterminate: u,
    size: m
  }), S = wH(v);
  return /* @__PURE__ */ E.jsx(OH, C({
    type: "checkbox",
    inputProps: C({
      "data-indeterminate": u
    }, p),
    icon: /* @__PURE__ */ P.cloneElement(h, {
      fontSize: (n = h.props.fontSize) != null ? n : m
    }),
    checkedIcon: /* @__PURE__ */ P.cloneElement(g, {
      fontSize: (o = g.props.fontSize) != null ? o : m
    }),
    ownerState: v,
    ref: r,
    className: Se(S.root, f)
  }, y, {
    classes: S
  }));
});
process.env.NODE_ENV !== "production" && (F0.propTypes = {
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
const Jd = F0, L0 = vE({
  createStyledComponent: he("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (e, t) => t.root
  }),
  useThemeProps: (e) => Ke({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (L0.propTypes = {
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
const RH = L0;
function IH(e) {
  return De("MuiFormControlLabel", e);
}
const NH = Fe("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label", "error", "required", "asterisk"]), Ni = NH, AH = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "required", "slotProps", "value"], jH = (e) => {
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
  return Ve(a, IH, t);
}, kH = he("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [{
      [`& .${Ni.label}`]: t.label
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
  [`&.${Ni.disabled}`]: {
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
  [`& .${Ni.label}`]: {
    [`&.${Ni.disabled}`]: {
      color: (e.vars || e).palette.text.disabled
    }
  }
})), MH = he("span", {
  name: "MuiFormControlLabel",
  slot: "Asterisk",
  overridesResolver: (e, t) => t.asterisk
})(({
  theme: e
}) => ({
  [`&.${Ni.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), B0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = Ke({
    props: t,
    name: "MuiFormControlLabel"
  }), {
    className: a,
    componentsProps: l = {},
    control: c,
    disabled: u,
    disableTypography: d,
    label: p,
    labelPlacement: m = "end",
    required: f,
    slotProps: y = {}
  } = i, h = _e(i, AH), g = on(), v = (n = u ?? c.props.disabled) != null ? n : g == null ? void 0 : g.disabled, S = f ?? c.props.required, _ = {
    disabled: v,
    required: S
  };
  ["checked", "name", "onChange", "value", "inputRef"].forEach((j) => {
    typeof c.props[j] > "u" && typeof i[j] < "u" && (_[j] = i[j]);
  });
  const $ = xn({
    props: i,
    muiFormControl: g,
    states: ["error"]
  }), b = C({}, i, {
    disabled: v,
    labelPlacement: m,
    required: S,
    error: $.error
  }), x = jH(b), w = (o = y.typography) != null ? o : l.typography;
  let A = p;
  return A != null && A.type !== Or && !d && (A = /* @__PURE__ */ E.jsx(Or, C({
    component: "span"
  }, w, {
    className: Se(x.label, w == null ? void 0 : w.className),
    children: A
  }))), /* @__PURE__ */ E.jsxs(kH, C({
    className: Se(x.root, a),
    ownerState: b,
    ref: r
  }, h, {
    children: [/* @__PURE__ */ P.cloneElement(c, _), S ? /* @__PURE__ */ E.jsxs(RH, {
      display: "block",
      children: [A, /* @__PURE__ */ E.jsxs(MH, {
        ownerState: b,
        "aria-hidden": !0,
        className: x.asterisk,
        children: [" ", "*"]
      })]
    }) : A]
  }));
});
process.env.NODE_ENV !== "production" && (B0.propTypes = {
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
const Ul = B0;
function DH(e) {
  var t;
  const { schema: r, id: n, value: o, disabled: i, readonly: a, label: l = "", hideLabel: c, autofocus: u, onChange: d, onBlur: p, onFocus: m, registry: f, options: y, uiSchema: h } = e, g = qe("DescriptionFieldTemplate", f, y), v = To(r), S = (x, w) => d(w), _ = ({ target: { value: x } }) => p(n, x), $ = ({ target: { value: x } }) => m(n, x), b = (t = y.description) !== null && t !== void 0 ? t : r.description;
  return E.jsxs(E.Fragment, { children: [!c && !!b && E.jsx(g, { id: to(n), description: b, schema: r, uiSchema: h, registry: f }), E.jsx(Ul, { control: E.jsx(Jd, { id: n, name: n, checked: typeof o > "u" ? !1 : !!o, required: v, disabled: i || a, autoFocus: u, onChange: S, onBlur: _, onFocus: $, "aria-describedby": or(n) }), label: En(l, c, !1) })] });
}
function FH(e) {
  return De("MuiFormGroup", e);
}
Fe("MuiFormGroup", ["root", "row", "error"]);
const LH = ["className", "row"], BH = (e) => {
  const {
    classes: t,
    row: r,
    error: n
  } = e;
  return Ve({
    root: ["root", r && "row", n && "error"]
  }, FH, t);
}, VH = he("div", {
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
})), V0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
    props: t,
    name: "MuiFormGroup"
  }), {
    className: o,
    row: i = !1
  } = n, a = _e(n, LH), l = on(), c = xn({
    props: n,
    muiFormControl: l,
    states: ["error"]
  }), u = C({}, n, {
    row: i,
    error: c.error
  }), d = BH(u);
  return /* @__PURE__ */ E.jsx(VH, C({
    className: Se(d.root, o),
    ownerState: u,
    ref: r
  }, a));
});
process.env.NODE_ENV !== "production" && (V0.propTypes = {
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
const z0 = V0;
function zH({ label: e, hideLabel: t, id: r, disabled: n, options: o, value: i, autofocus: a, readonly: l, required: c, onChange: u, onBlur: d, onFocus: p }) {
  const { enumOptions: m, enumDisabled: f, inline: y, emptyValue: h } = o, g = Array.isArray(i) ? i : [i], v = ($) => ({ target: { checked: b } }) => {
    u(b ? mb($, g, m) : pb($, g, m));
  }, S = ({ target: { value: $ } }) => d(r, Ft($, m, h)), _ = ({ target: { value: $ } }) => p(r, Ft($, m, h));
  return E.jsxs(E.Fragment, { children: [En(E.jsx(Vl, { required: c, htmlFor: r, children: e || void 0 }), t), E.jsx(z0, { id: r, row: !!y, children: Array.isArray(m) && m.map(($, b) => {
    const x = Al($.value, g), w = Array.isArray(f) && f.indexOf($.value) !== -1, A = E.jsx(Jd, { id: jl(r, b), name: r, checked: x, disabled: n || w || l, autoFocus: a && b === 0, onChange: v(b), onBlur: S, onFocus: _, "aria-describedby": or(r) });
    return E.jsx(Ul, { control: A, label: $.label }, b);
  }) })] });
}
const UH = en(/* @__PURE__ */ E.jsx("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "RadioButtonUnchecked"), WH = en(/* @__PURE__ */ E.jsx("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), "RadioButtonChecked"), qH = he("span", {
  shouldForwardProp: Gt
})({
  position: "relative",
  display: "flex"
}), KH = he(UH)({
  // Scale applied to prevent dot misalignment in Safari
  transform: "scale(1)"
}), HH = he(WH)(({
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
  return /* @__PURE__ */ E.jsxs(qH, {
    className: r.root,
    ownerState: o,
    children: [/* @__PURE__ */ E.jsx(KH, {
      fontSize: n,
      className: r.background,
      ownerState: o
    }), /* @__PURE__ */ E.jsx(HH, {
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
const U0 = /* @__PURE__ */ P.createContext(void 0);
process.env.NODE_ENV !== "production" && (U0.displayName = "RadioGroupContext");
const W0 = U0;
function GH() {
  return P.useContext(W0);
}
function YH(e) {
  return De("MuiRadio", e);
}
const XH = Fe("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary", "sizeSmall"]), Kh = XH, JH = ["checked", "checkedIcon", "color", "icon", "name", "onChange", "size", "className"], ZH = (e) => {
  const {
    classes: t,
    color: r,
    size: n
  } = e, o = {
    root: ["root", `color${xe(r)}`, n !== "medium" && `size${xe(n)}`]
  };
  return C({}, t, Ve(o, YH, t));
}, QH = he(D0, {
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
  [`&.${Kh.checked}`]: {
    color: (e.vars || e).palette[t.color].main
  }
}, {
  [`&.${Kh.disabled}`]: {
    color: (e.vars || e).palette.action.disabled
  }
}));
function e8(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
const Hh = /* @__PURE__ */ E.jsx(Zd, {
  checked: !0
}), Gh = /* @__PURE__ */ E.jsx(Zd, {}), q0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o;
  const i = Ke({
    props: t,
    name: "MuiRadio"
  }), {
    checked: a,
    checkedIcon: l = Hh,
    color: c = "primary",
    icon: u = Gh,
    name: d,
    onChange: p,
    size: m = "medium",
    className: f
  } = i, y = _e(i, JH), h = C({}, i, {
    color: c,
    size: m
  }), g = ZH(h), v = GH();
  let S = a;
  const _ = fa(p, v && v.onChange);
  let $ = d;
  return v && (typeof S > "u" && (S = e8(v.value, i.value)), typeof $ > "u" && ($ = v.name)), /* @__PURE__ */ E.jsx(QH, C({
    type: "radio",
    icon: /* @__PURE__ */ P.cloneElement(u, {
      fontSize: (n = Gh.props.fontSize) != null ? n : m
    }),
    checkedIcon: /* @__PURE__ */ P.cloneElement(l, {
      fontSize: (o = Hh.props.fontSize) != null ? o : m
    }),
    ownerState: h,
    classes: g,
    name: $,
    checked: S,
    onChange: _,
    ref: r,
    className: Se(g.root, f)
  }, y));
});
process.env.NODE_ENV !== "production" && (q0.propTypes = {
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
const t8 = q0, r8 = ["actions", "children", "defaultValue", "name", "onChange", "value"], K0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    children: o,
    defaultValue: i,
    name: a,
    onChange: l,
    value: c
  } = t, u = _e(t, r8), d = P.useRef(null), [p, m] = Ro({
    controlled: c,
    default: i,
    name: "RadioGroup"
  });
  P.useImperativeHandle(n, () => ({
    focus: () => {
      let g = d.current.querySelector("input:not(:disabled):checked");
      g || (g = d.current.querySelector("input:not(:disabled)")), g && g.focus();
    }
  }), []);
  const f = Nt(r, d), y = Hi(a), h = P.useMemo(() => ({
    name: y,
    onChange(g) {
      m(g.target.value), l && l(g, g.target.value);
    },
    value: p
  }), [y, l, m, p]);
  return /* @__PURE__ */ E.jsx(W0.Provider, {
    value: h,
    children: /* @__PURE__ */ E.jsx(z0, C({
      role: "radiogroup",
      ref: f
    }, u, {
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (K0.propTypes = {
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
const n8 = K0;
function o8({ id: e, options: t, value: r, required: n, disabled: o, readonly: i, label: a, hideLabel: l, onChange: c, onBlur: u, onFocus: d }) {
  var p;
  const { enumOptions: m, enumDisabled: f, emptyValue: y } = t, h = ($, b) => c(Ft(b, m, y)), g = ({ target: { value: $ } }) => u(e, Ft($, m, y)), v = ({ target: { value: $ } }) => d(e, Ft($, m, y)), S = t ? t.inline : !1, _ = (p = xd(r, m)) !== null && p !== void 0 ? p : null;
  return E.jsxs(E.Fragment, { children: [En(E.jsx(Vl, { required: n, htmlFor: e, children: a || void 0 }), l), E.jsx(n8, { id: e, name: e, value: _, row: S, onChange: h, onBlur: g, onFocus: v, "aria-describedby": or(e), children: Array.isArray(m) && m.map(($, b) => {
    const x = Array.isArray(f) && f.indexOf($.value) !== -1;
    return E.jsx(Ul, { control: E.jsx(t8, { name: e, id: jl(e, b), color: "primary" }), label: $.label, value: String(b), disabled: o || x || i }, b);
  }) })] });
}
const i8 = (e) => !e || !Lr(e), s8 = i8;
function a8(e) {
  return De("MuiSlider", e);
}
const l8 = Fe("MuiSlider", ["root", "active", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "disabled", "dragging", "focusVisible", "mark", "markActive", "marked", "markLabel", "markLabelActive", "rail", "sizeSmall", "thumb", "thumbColorPrimary", "thumbColorSecondary", "thumbColorError", "thumbColorSuccess", "thumbColorInfo", "thumbColorWarning", "track", "trackInverted", "trackFalse", "thumbSizeSmall", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel", "vertical"]), Tr = l8, c8 = (e) => {
  const {
    open: t
  } = e;
  return {
    offset: Se(t && Tr.valueLabelOpen),
    circle: Tr.valueLabelCircle,
    label: Tr.valueLabelLabel
  };
};
function H0(e) {
  const {
    children: t,
    className: r,
    value: n
  } = e, o = c8(e);
  return t ? /* @__PURE__ */ P.cloneElement(t, {
    className: Se(t.props.className)
  }, /* @__PURE__ */ E.jsxs(P.Fragment, {
    children: [t.props.children, /* @__PURE__ */ E.jsx("span", {
      className: Se(o.offset, r),
      "aria-hidden": !0,
      children: /* @__PURE__ */ E.jsx("span", {
        className: o.circle,
        children: /* @__PURE__ */ E.jsx("span", {
          className: o.label,
          children: n
        })
      })
    })]
  })) : null;
}
process.env.NODE_ENV !== "production" && (H0.propTypes = {
  children: s.element.isRequired,
  className: s.string,
  value: s.node
});
const u8 = ["aria-label", "aria-valuetext", "aria-labelledby", "component", "components", "componentsProps", "color", "classes", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "size", "step", "scale", "slotProps", "slots", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat"];
function Yh(e) {
  return e;
}
const d8 = he("span", {
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
  [`&.${Tr.disabled}`]: {
    pointerEvents: "none",
    cursor: "default",
    color: (e.vars || e).palette.grey[400]
  },
  [`&.${Tr.dragging}`]: {
    [`& .${Tr.thumb}, & .${Tr.track}`]: {
      transition: "none"
    }
  }
})), f8 = he("span", {
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
})), p8 = he("span", {
  name: "MuiSlider",
  slot: "Track",
  overridesResolver: (e, t) => t.track
})(({
  theme: e,
  ownerState: t
}) => {
  const r = (
    // Same logic as the LinearProgress track color
    e.palette.mode === "light" ? ag(e.palette[t.color].main, 0.62) : sg(e.palette[t.color].main, 0.5)
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
}), m8 = he("span", {
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
  [`&:hover, &.${Tr.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)` : Pt(e.palette[t.color].main, 0.16)}`,
    "@media (hover: none)": {
      boxShadow: "none"
    }
  },
  [`&.${Tr.active}`]: {
    boxShadow: `0px 0px 0px 14px ${e.vars ? `rgba(${e.vars.palette[t.color].mainChannel} / 0.16)` : Pt(e.palette[t.color].main, 0.16)}`
  },
  [`&.${Tr.disabled}`]: {
    "&:hover": {
      boxShadow: "none"
    }
  }
})), h8 = he(H0, {
  name: "MuiSlider",
  slot: "ValueLabel",
  overridesResolver: (e, t) => t.valueLabel
})(({
  theme: e,
  ownerState: t
}) => C({
  [`&.${Tr.valueLabelOpen}`]: {
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
})), y8 = he("span", {
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
})), g8 = he("span", {
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
})), v8 = (e) => {
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
  return Ve(u, a8, a);
}, b8 = ({
  children: e
}) => e, G0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  var n, o, i, a, l, c, u, d, p, m, f, y, h, g, v, S, _, $, b, x, w, A, j, k;
  const K = Ke({
    props: t,
    name: "MuiSlider"
  }), H = Sn().direction === "rtl", {
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
    disabled: O = !1,
    getAriaLabel: R,
    getAriaValueText: B,
    marks: Q = !1,
    max: Y = 100,
    min: oe = 0,
    orientation: ie = "horizontal",
    size: ce = "medium",
    step: q = 1,
    scale: pe = Yh,
    slotProps: te,
    slots: fe,
    track: Pe = "normal",
    valueLabelDisplay: Ae = "off",
    valueLabelFormat: Be = Yh
  } = K, st = _e(K, u8), je = C({}, K, {
    isRtl: H,
    max: Y,
    min: oe,
    classes: N,
    disabled: O,
    disableSwap: F,
    orientation: ie,
    marks: Q,
    color: D,
    size: ce,
    step: q,
    scale: pe,
    track: Pe,
    valueLabelDisplay: Ae,
    valueLabelFormat: Be
  }), {
    axisProps: Me,
    getRootProps: Qe,
    getHiddenInputProps: He,
    getThumbProps: ze,
    open: le,
    active: ye,
    axis: be,
    focusedThumbIndex: ge,
    range: ue,
    dragging: Ue,
    marks: Ie,
    values: Ye,
    trackOffset: Je,
    trackLeap: Tt,
    getThumbStyle: re
  } = Nx(C({}, je, {
    rootRef: r
  }));
  je.marked = Ie.length > 0 && Ie.some((de) => de.label), je.dragging = Ue, je.focusedThumbIndex = ge;
  const se = v8(je), $e = (n = (o = fe == null ? void 0 : fe.root) != null ? o : Z.Root) != null ? n : d8, Ne = (i = (a = fe == null ? void 0 : fe.rail) != null ? a : Z.Rail) != null ? i : f8, et = (l = (c = fe == null ? void 0 : fe.track) != null ? c : Z.Track) != null ? l : p8, St = (u = (d = fe == null ? void 0 : fe.thumb) != null ? d : Z.Thumb) != null ? u : m8, Et = (p = (m = fe == null ? void 0 : fe.valueLabel) != null ? m : Z.ValueLabel) != null ? p : h8, Yt = (f = (y = fe == null ? void 0 : fe.mark) != null ? y : Z.Mark) != null ? f : y8, kt = (h = (g = fe == null ? void 0 : fe.markLabel) != null ? g : Z.MarkLabel) != null ? h : g8, Ut = (v = (S = fe == null ? void 0 : fe.input) != null ? S : Z.Input) != null ? v : "input", wn = (_ = te == null ? void 0 : te.root) != null ? _ : ne.root, On = ($ = te == null ? void 0 : te.rail) != null ? $ : ne.rail, Tn = (b = te == null ? void 0 : te.track) != null ? b : ne.track, Rr = (x = te == null ? void 0 : te.thumb) != null ? x : ne.thumb, Wr = (w = te == null ? void 0 : te.valueLabel) != null ? w : ne.valueLabel, ui = (A = te == null ? void 0 : te.mark) != null ? A : ne.mark, ro = (j = te == null ? void 0 : te.markLabel) != null ? j : ne.markLabel, no = (k = te == null ? void 0 : te.input) != null ? k : ne.input, oo = Dt({
    elementType: $e,
    getSlotProps: Qe,
    externalSlotProps: wn,
    externalForwardedProps: st,
    additionalProps: C({}, s8($e) && {
      as: J
    }),
    ownerState: C({}, je, wn == null ? void 0 : wn.ownerState),
    className: [se.root, W]
  }), L = Dt({
    elementType: Ne,
    externalSlotProps: On,
    ownerState: je,
    className: se.rail
  }), I = Dt({
    elementType: et,
    externalSlotProps: Tn,
    additionalProps: {
      style: C({}, Me[be].offset(Je), Me[be].leap(Tt))
    },
    ownerState: C({}, je, Tn == null ? void 0 : Tn.ownerState),
    className: se.track
  }), V = Dt({
    elementType: St,
    getSlotProps: ze,
    externalSlotProps: Rr,
    ownerState: C({}, je, Rr == null ? void 0 : Rr.ownerState),
    className: se.thumb
  }), T = Dt({
    elementType: Et,
    externalSlotProps: Wr,
    ownerState: C({}, je, Wr == null ? void 0 : Wr.ownerState),
    className: se.valueLabel
  }), M = Dt({
    elementType: Yt,
    externalSlotProps: ui,
    ownerState: je,
    className: se.mark
  }), ee = Dt({
    elementType: kt,
    externalSlotProps: ro,
    ownerState: je,
    className: se.markLabel
  }), ae = Dt({
    elementType: Ut,
    getSlotProps: He,
    externalSlotProps: no,
    ownerState: je
  });
  return /* @__PURE__ */ E.jsxs($e, C({}, oo, {
    children: [/* @__PURE__ */ E.jsx(Ne, C({}, L)), /* @__PURE__ */ E.jsx(et, C({}, I)), Ie.filter((de) => de.value >= oe && de.value <= Y).map((de, ve) => {
      const we = Sa(de.value, oe, Y), me = Me[be].offset(we);
      let Ce;
      return Pe === !1 ? Ce = Ye.indexOf(de.value) !== -1 : Ce = Pe === "normal" && (ue ? de.value >= Ye[0] && de.value <= Ye[Ye.length - 1] : de.value <= Ye[0]) || Pe === "inverted" && (ue ? de.value <= Ye[0] || de.value >= Ye[Ye.length - 1] : de.value >= Ye[0]), /* @__PURE__ */ E.jsxs(P.Fragment, {
        children: [/* @__PURE__ */ E.jsx(Yt, C({
          "data-index": ve
        }, M, !Lr(Yt) && {
          markActive: Ce
        }, {
          style: C({}, me, M.style),
          className: Se(M.className, Ce && se.markActive)
        })), de.label != null ? /* @__PURE__ */ E.jsx(kt, C({
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
    }), Ye.map((de, ve) => {
      const we = Sa(de, oe, Y), me = Me[be].offset(we), Ce = Ae === "off" ? b8 : Et;
      return (
        /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
        /* @__PURE__ */ E.jsx(Ce, C({}, !Lr(Ce) && {
          valueLabelFormat: Be,
          valueLabelDisplay: Ae,
          value: typeof Be == "function" ? Be(pe(de), ve) : Be,
          index: ve,
          open: le === ve || ye === ve || Ae === "on",
          disabled: O
        }, T, {
          children: /* @__PURE__ */ E.jsx(St, C({
            "data-index": ve
          }, V, {
            className: Se(se.thumb, V.className, ye === ve && se.active, ge === ve && se.focusVisible),
            style: C({}, me, re(ve), V.style),
            children: /* @__PURE__ */ E.jsx(Ut, C({
              "data-index": ve,
              "aria-label": R ? R(ve) : z,
              "aria-valuenow": pe(de),
              "aria-labelledby": X,
              "aria-valuetext": B ? B(pe(de), ve) : G,
              value: Ye[ve]
            }, ae))
          }))
        }), ve)
      );
    })]
  }));
});
process.env.NODE_ENV !== "production" && (G0.propTypes = {
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
const $8 = G0;
function S8(e) {
  const { value: t, readonly: r, disabled: n, onBlur: o, onFocus: i, options: a, schema: l, onChange: c, required: u, label: d, hideLabel: p, id: m } = e, f = { value: t, label: d, id: m, name: m, ...hb(l) }, y = (v, S) => {
    c(S ?? a.emptyValue);
  }, h = ({ target: { value: v } }) => o(m, v), g = ({ target: { value: v } }) => i(m, v);
  return E.jsxs(E.Fragment, { children: [En(E.jsx(Vl, { required: u, htmlFor: m, children: d || void 0 }), p), E.jsx($8, { disabled: n || r, onChange: y, onBlur: h, onFocus: g, valueLabelDisplay: "auto", ...f, "aria-describedby": or(m) })] });
}
function _8(e) {
  return De("MuiMenuItem", e);
}
const E8 = Fe("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]), Ti = E8, x8 = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex", "className"], w8 = (e, t) => {
  const {
    ownerState: r
  } = e;
  return [t.root, r.dense && t.dense, r.divider && t.divider, !r.disableGutters && t.gutters];
}, O8 = (e) => {
  const {
    disabled: t,
    dense: r,
    divider: n,
    disableGutters: o,
    selected: i,
    classes: a
  } = e, c = Ve({
    root: ["root", r && "dense", t && "disabled", !o && "gutters", n && "divider", i && "selected"]
  }, _8, a);
  return C({}, a, c);
}, T8 = he(Xn, {
  shouldForwardProp: (e) => Gt(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: w8
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
  [`&.${Ti.selected}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity),
    [`&.${Ti.focusVisible}`]: {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
    }
  },
  [`&.${Ti.selected}:hover`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Pt(e.palette.primary.main, e.palette.action.selectedOpacity)
    }
  },
  [`&.${Ti.focusVisible}`]: {
    backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${Ti.disabled}`]: {
    opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${qh.root}`]: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
  },
  [`& + .${qh.inset}`]: {
    marginLeft: 52
  },
  [`& .${Ma.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${Ma.inset}`]: {
    paddingLeft: 36
  },
  [`& .${Wh.root}`]: {
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
  [`& .${Wh.root} svg`]: {
    fontSize: "1.25rem"
  }
}))), Y0 = /* @__PURE__ */ P.forwardRef(function(t, r) {
  const n = Ke({
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
    className: m
  } = n, f = _e(n, x8), y = P.useContext(Yr), h = P.useMemo(() => ({
    dense: a || y.dense || !1,
    disableGutters: c
  }), [y.dense, a, c]), g = P.useRef(null);
  gr(() => {
    o && (g.current ? g.current.focus() : process.env.NODE_ENV !== "production" && console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered."));
  }, [o]);
  const v = C({}, n, {
    dense: h.dense,
    divider: l,
    disableGutters: c
  }), S = O8(n), _ = Nt(g, r);
  let $;
  return n.disabled || ($ = p !== void 0 ? p : -1), /* @__PURE__ */ E.jsx(Yr.Provider, {
    value: h,
    children: /* @__PURE__ */ E.jsx(T8, C({
      ref: _,
      role: d,
      tabIndex: $,
      component: i,
      focusVisibleClassName: Se(S.focusVisible, u),
      className: Se(S.root, m)
    }, f, {
      ownerState: v,
      classes: S
    }))
  });
});
process.env.NODE_ENV !== "production" && (Y0.propTypes = {
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
const C8 = Y0;
function P8({
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
  autofocus: m,
  onChange: f,
  onBlur: y,
  onFocus: h,
  rawErrors: g = [],
  registry: v,
  uiSchema: S,
  hideError: _,
  formContext: $,
  ...b
}) {
  const { enumOptions: x, enumDisabled: w, emptyValue: A } = n;
  p = typeof p > "u" ? !1 : !!p;
  const j = p ? [] : "", k = typeof d > "u" || p && d.length < 1 || !p && d === j, K = ({ target: { value: G } }) => f(Ft(G, x, A)), U = ({ target: { value: G } }) => y(t, Ft(G, x, A)), H = ({ target: { value: G } }) => h(t, Ft(G, x, A)), z = xd(d, x, p);
  return E.jsx(Ud, { id: t, name: t, label: En(o || void 0, i, void 0), value: !k && typeof z < "u" ? z : j, required: a, disabled: l || u, autoFocus: m, placeholder: c, error: g.length > 0, onChange: K, onBlur: U, onFocus: H, ...b, select: !0, InputLabelProps: {
    ...b.InputLabelProps,
    shrink: !k
  }, SelectProps: {
    ...b.SelectProps,
    multiple: p
  }, "aria-describedby": or(t), children: Array.isArray(x) && x.map(({ value: G, label: X }, J) => {
    const Z = Array.isArray(w) && w.indexOf(G) !== -1;
    return E.jsx(C8, { value: String(J), disabled: Z, children: X }, J);
  }) });
}
function R8(e) {
  const { options: t, registry: r } = e, n = qe("BaseInputTemplate", r, t);
  let o = 5;
  return (typeof t.rows == "string" || typeof t.rows == "number") && (o = t.rows), E.jsx(n, { ...e, multiline: !0, rows: o });
}
function I8() {
  return {
    CheckboxWidget: DH,
    CheckboxesWidget: zH,
    RadioWidget: o8,
    RangeWidget: S8,
    SelectWidget: P8,
    TextareaWidget: R8
  };
}
function N8() {
  return {
    templates: pH(),
    widgets: I8()
  };
}
function A8() {
  return G9(N8());
}
const j8 = A8();
var lu = { exports: {} }, X0 = {}, Cr = {}, Lo = {}, Ss = {}, Le = {}, os = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(S) {
      if (super(), !e.IDENTIFIER.test(S))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = S;
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
    constructor(S) {
      super(), this._items = typeof S == "string" ? [S] : S;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const S = this._items[0];
      return S === "" || S === '""';
    }
    get str() {
      var S;
      return (S = this._str) !== null && S !== void 0 ? S : this._str = this._items.reduce((_, $) => `${_}${$}`, "");
    }
    get names() {
      var S;
      return (S = this._names) !== null && S !== void 0 ? S : this._names = this._items.reduce((_, $) => ($ instanceof r && (_[$.str] = (_[$.str] || 0) + 1), _), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function o(v, ...S) {
    const _ = [v[0]];
    let $ = 0;
    for (; $ < S.length; )
      l(_, S[$]), _.push(v[++$]);
    return new n(_);
  }
  e._ = o;
  const i = new n("+");
  function a(v, ...S) {
    const _ = [f(v[0])];
    let $ = 0;
    for (; $ < S.length; )
      _.push(i), l(_, S[$]), _.push(i, f(v[++$]));
    return c(_), new n(_);
  }
  e.str = a;
  function l(v, S) {
    S instanceof n ? v.push(...S._items) : S instanceof r ? v.push(S) : v.push(p(S));
  }
  e.addCodeArg = l;
  function c(v) {
    let S = 1;
    for (; S < v.length - 1; ) {
      if (v[S] === i) {
        const _ = u(v[S - 1], v[S + 1]);
        if (_ !== void 0) {
          v.splice(S - 1, 3, _);
          continue;
        }
        v[S++] = "+";
      }
      S++;
    }
  }
  function u(v, S) {
    if (S === '""')
      return v;
    if (v === '""')
      return S;
    if (typeof v == "string")
      return S instanceof r || v[v.length - 1] !== '"' ? void 0 : typeof S != "string" ? `${v.slice(0, -1)}${S}"` : S[0] === '"' ? v.slice(0, -1) + S.slice(1) : void 0;
    if (typeof S == "string" && S[0] === '"' && !(v instanceof r))
      return `"${v}${S.slice(1)}`;
  }
  function d(v, S) {
    return S.emptyStr() ? v : v.emptyStr() ? S : a`${v}${S}`;
  }
  e.strConcat = d;
  function p(v) {
    return typeof v == "number" || typeof v == "boolean" || v === null ? v : f(Array.isArray(v) ? v.join(",") : v);
  }
  function m(v) {
    return new n(f(v));
  }
  e.stringify = m;
  function f(v) {
    return JSON.stringify(v).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = f;
  function y(v) {
    return typeof v == "string" && e.IDENTIFIER.test(v) ? new n(`.${v}`) : o`[${v}]`;
  }
  e.getProperty = y;
  function h(v) {
    if (typeof v == "string" && e.IDENTIFIER.test(v))
      return new n(`${v}`);
    throw new Error(`CodeGen: invalid export name: ${v}, use explicit $id name mapping`);
  }
  e.getEsmExportName = h;
  function g(v) {
    return new n(v.toString());
  }
  e.regexpCode = g;
})(os);
var cu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = os;
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
      const m = this.toName(u), { prefix: f } = m, y = (p = d.key) !== null && p !== void 0 ? p : d.ref;
      let h = this._values[f];
      if (h) {
        const S = h.get(y);
        if (S)
          return S;
      } else
        h = this._values[f] = /* @__PURE__ */ new Map();
      h.set(y, m);
      const g = this._scope[f] || (this._scope[f] = []), v = g.length;
      return g[v] = d.ref, m.setValue(d, { property: f, itemIndex: v }), m;
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
      return this._reduceValues(u, (m) => {
        if (m.value === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return m.value.code;
      }, d, p);
    }
    _reduceValues(u, d, p = {}, m) {
      let f = t.nil;
      for (const y in u) {
        const h = u[y];
        if (!h)
          continue;
        const g = p[y] = p[y] || /* @__PURE__ */ new Map();
        h.forEach((v) => {
          if (g.has(v))
            return;
          g.set(v, n.Started);
          let S = d(v);
          if (S) {
            const _ = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            f = (0, t._)`${f}${_} ${v} = ${S};${this.opts._n}`;
          } else if (S = m == null ? void 0 : m(v))
            f = (0, t._)`${f}${S}${this.opts._n}`;
          else
            throw new r(v);
          g.set(v, n.Completed);
        });
      }
      return f;
    }
  }
  e.ValueScope = l;
})(cu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = os, r = cu;
  var n = os;
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
    optimizeNames(O, R) {
      return this;
    }
  }
  class a extends i {
    constructor(O, R, B) {
      super(), this.varKind = O, this.name = R, this.rhs = B;
    }
    render({ es5: O, _n: R }) {
      const B = O ? r.varKinds.var : this.varKind, Q = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${B} ${this.name}${Q};` + R;
    }
    optimizeNames(O, R) {
      if (O[this.name.str])
        return this.rhs && (this.rhs = z(this.rhs, O, R)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends i {
    constructor(O, R, B) {
      super(), this.lhs = O, this.rhs = R, this.sideEffects = B;
    }
    render({ _n: O }) {
      return `${this.lhs} = ${this.rhs};` + O;
    }
    optimizeNames(O, R) {
      if (!(this.lhs instanceof t.Name && !O[this.lhs.str] && !this.sideEffects))
        return this.rhs = z(this.rhs, O, R), this;
    }
    get names() {
      const O = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return H(O, this.rhs);
    }
  }
  class c extends l {
    constructor(O, R, B, Q) {
      super(O, B, Q), this.op = R;
    }
    render({ _n: O }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + O;
    }
  }
  class u extends i {
    constructor(O) {
      super(), this.label = O, this.names = {};
    }
    render({ _n: O }) {
      return `${this.label}:` + O;
    }
  }
  class d extends i {
    constructor(O) {
      super(), this.label = O, this.names = {};
    }
    render({ _n: O }) {
      return `break${this.label ? ` ${this.label}` : ""};` + O;
    }
  }
  class p extends i {
    constructor(O) {
      super(), this.error = O;
    }
    render({ _n: O }) {
      return `throw ${this.error};` + O;
    }
    get names() {
      return this.error.names;
    }
  }
  class m extends i {
    constructor(O) {
      super(), this.code = O;
    }
    render({ _n: O }) {
      return `${this.code};` + O;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(O, R) {
      return this.code = z(this.code, O, R), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class f extends i {
    constructor(O = []) {
      super(), this.nodes = O;
    }
    render(O) {
      return this.nodes.reduce((R, B) => R + B.render(O), "");
    }
    optimizeNodes() {
      const { nodes: O } = this;
      let R = O.length;
      for (; R--; ) {
        const B = O[R].optimizeNodes();
        Array.isArray(B) ? O.splice(R, 1, ...B) : B ? O[R] = B : O.splice(R, 1);
      }
      return O.length > 0 ? this : void 0;
    }
    optimizeNames(O, R) {
      const { nodes: B } = this;
      let Q = B.length;
      for (; Q--; ) {
        const Y = B[Q];
        Y.optimizeNames(O, R) || (G(O, Y.names), B.splice(Q, 1));
      }
      return B.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((O, R) => U(O, R.names), {});
    }
  }
  class y extends f {
    render(O) {
      return "{" + O._n + super.render(O) + "}" + O._n;
    }
  }
  class h extends f {
  }
  class g extends y {
  }
  g.kind = "else";
  class v extends y {
    constructor(O, R) {
      super(R), this.condition = O;
    }
    render(O) {
      let R = `if(${this.condition})` + super.render(O);
      return this.else && (R += "else " + this.else.render(O)), R;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const O = this.condition;
      if (O === !0)
        return this.nodes;
      let R = this.else;
      if (R) {
        const B = R.optimizeNodes();
        R = this.else = Array.isArray(B) ? new g(B) : B;
      }
      if (R)
        return O === !1 ? R instanceof v ? R : R.nodes : this.nodes.length ? this : new v(X(O), R instanceof v ? [R] : R.nodes);
      if (!(O === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(O, R) {
      var B;
      if (this.else = (B = this.else) === null || B === void 0 ? void 0 : B.optimizeNames(O, R), !!(super.optimizeNames(O, R) || this.else))
        return this.condition = z(this.condition, O, R), this;
    }
    get names() {
      const O = super.names;
      return H(O, this.condition), this.else && U(O, this.else.names), O;
    }
  }
  v.kind = "if";
  class S extends y {
  }
  S.kind = "for";
  class _ extends S {
    constructor(O) {
      super(), this.iteration = O;
    }
    render(O) {
      return `for(${this.iteration})` + super.render(O);
    }
    optimizeNames(O, R) {
      if (super.optimizeNames(O, R))
        return this.iteration = z(this.iteration, O, R), this;
    }
    get names() {
      return U(super.names, this.iteration.names);
    }
  }
  class $ extends S {
    constructor(O, R, B, Q) {
      super(), this.varKind = O, this.name = R, this.from = B, this.to = Q;
    }
    render(O) {
      const R = O.es5 ? r.varKinds.var : this.varKind, { name: B, from: Q, to: Y } = this;
      return `for(${R} ${B}=${Q}; ${B}<${Y}; ${B}++)` + super.render(O);
    }
    get names() {
      const O = H(super.names, this.from);
      return H(O, this.to);
    }
  }
  class b extends S {
    constructor(O, R, B, Q) {
      super(), this.loop = O, this.varKind = R, this.name = B, this.iterable = Q;
    }
    render(O) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(O);
    }
    optimizeNames(O, R) {
      if (super.optimizeNames(O, R))
        return this.iterable = z(this.iterable, O, R), this;
    }
    get names() {
      return U(super.names, this.iterable.names);
    }
  }
  class x extends y {
    constructor(O, R, B) {
      super(), this.name = O, this.args = R, this.async = B;
    }
    render(O) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(O);
    }
  }
  x.kind = "func";
  class w extends f {
    render(O) {
      return "return " + super.render(O);
    }
  }
  w.kind = "return";
  class A extends y {
    render(O) {
      let R = "try" + super.render(O);
      return this.catch && (R += this.catch.render(O)), this.finally && (R += this.finally.render(O)), R;
    }
    optimizeNodes() {
      var O, R;
      return super.optimizeNodes(), (O = this.catch) === null || O === void 0 || O.optimizeNodes(), (R = this.finally) === null || R === void 0 || R.optimizeNodes(), this;
    }
    optimizeNames(O, R) {
      var B, Q;
      return super.optimizeNames(O, R), (B = this.catch) === null || B === void 0 || B.optimizeNames(O, R), (Q = this.finally) === null || Q === void 0 || Q.optimizeNames(O, R), this;
    }
    get names() {
      const O = super.names;
      return this.catch && U(O, this.catch.names), this.finally && U(O, this.finally.names), O;
    }
  }
  class j extends y {
    constructor(O) {
      super(), this.error = O;
    }
    render(O) {
      return `catch(${this.error})` + super.render(O);
    }
  }
  j.kind = "catch";
  class k extends y {
    render(O) {
      return "finally" + super.render(O);
    }
  }
  k.kind = "finally";
  class K {
    constructor(O, R = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...R, _n: R.lines ? `
` : "" }, this._extScope = O, this._scope = new r.Scope({ parent: O }), this._nodes = [new h()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(O) {
      return this._scope.name(O);
    }
    // reserves unique name in the external scope
    scopeName(O) {
      return this._extScope.name(O);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(O, R) {
      const B = this._extScope.value(O, R);
      return (this._values[B.prefix] || (this._values[B.prefix] = /* @__PURE__ */ new Set())).add(B), B;
    }
    getScopeValue(O, R) {
      return this._extScope.getValue(O, R);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(O) {
      return this._extScope.scopeRefs(O, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(O, R, B, Q) {
      const Y = this._scope.toName(R);
      return B !== void 0 && Q && (this._constants[Y.str] = B), this._leafNode(new a(O, Y, B)), Y;
    }
    // `const` declaration (`var` in es5 mode)
    const(O, R, B) {
      return this._def(r.varKinds.const, O, R, B);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(O, R, B) {
      return this._def(r.varKinds.let, O, R, B);
    }
    // `var` declaration with optional assignment
    var(O, R, B) {
      return this._def(r.varKinds.var, O, R, B);
    }
    // assignment code
    assign(O, R, B) {
      return this._leafNode(new l(O, R, B));
    }
    // `+=` code
    add(O, R) {
      return this._leafNode(new c(O, e.operators.ADD, R));
    }
    // appends passed SafeExpr to code or executes Block
    code(O) {
      return typeof O == "function" ? O() : O !== t.nil && this._leafNode(new m(O)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...O) {
      const R = ["{"];
      for (const [B, Q] of O)
        R.length > 1 && R.push(","), R.push(B), (B !== Q || this.opts.es5) && (R.push(":"), (0, t.addCodeArg)(R, Q));
      return R.push("}"), new t._Code(R);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(O, R, B) {
      if (this._blockNode(new v(O)), R && B)
        this.code(R).else().code(B).endIf();
      else if (R)
        this.code(R).endIf();
      else if (B)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(O) {
      return this._elseNode(new v(O));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(v, g);
    }
    _for(O, R) {
      return this._blockNode(O), R && this.code(R).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(O, R) {
      return this._for(new _(O), R);
    }
    // `for` statement for a range of values
    forRange(O, R, B, Q, Y = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const oe = this._scope.toName(O);
      return this._for(new $(Y, oe, R, B), () => Q(oe));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(O, R, B, Q = r.varKinds.const) {
      const Y = this._scope.toName(O);
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
    forIn(O, R, B, Q = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(O, (0, t._)`Object.keys(${R})`, B);
      const Y = this._scope.toName(O);
      return this._for(new b("in", Q, Y, R), () => B(Y));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(S);
    }
    // `label` statement
    label(O) {
      return this._leafNode(new u(O));
    }
    // `break` statement
    break(O) {
      return this._leafNode(new d(O));
    }
    // `return` statement
    return(O) {
      const R = new w();
      if (this._blockNode(R), this.code(O), R.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(w);
    }
    // `try` statement
    try(O, R, B) {
      if (!R && !B)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const Q = new A();
      if (this._blockNode(Q), this.code(O), R) {
        const Y = this.name("e");
        this._currNode = Q.catch = new j(Y), R(Y);
      }
      return B && (this._currNode = Q.finally = new k(), this.code(B)), this._endBlockNode(j, k);
    }
    // `throw` statement
    throw(O) {
      return this._leafNode(new p(O));
    }
    // start self-balancing block
    block(O, R) {
      return this._blockStarts.push(this._nodes.length), O && this.code(O).endBlock(R), this;
    }
    // end the current self-balancing block
    endBlock(O) {
      const R = this._blockStarts.pop();
      if (R === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const B = this._nodes.length - R;
      if (B < 0 || O !== void 0 && B !== O)
        throw new Error(`CodeGen: wrong number of nodes: ${B} vs ${O} expected`);
      return this._nodes.length = R, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(O, R = t.nil, B, Q) {
      return this._blockNode(new x(O, R, B)), Q && this.code(Q).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(x);
    }
    optimize(O = 1) {
      for (; O-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(O) {
      return this._currNode.nodes.push(O), this;
    }
    _blockNode(O) {
      this._currNode.nodes.push(O), this._nodes.push(O);
    }
    _endBlockNode(O, R) {
      const B = this._currNode;
      if (B instanceof O || R && B instanceof R)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${R ? `${O.kind}/${R.kind}` : O.kind}"`);
    }
    _elseNode(O) {
      const R = this._currNode;
      if (!(R instanceof v))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = R.else = O, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const O = this._nodes;
      return O[O.length - 1];
    }
    set _currNode(O) {
      const R = this._nodes;
      R[R.length - 1] = O;
    }
  }
  e.CodeGen = K;
  function U(F, O) {
    for (const R in O)
      F[R] = (F[R] || 0) + (O[R] || 0);
    return F;
  }
  function H(F, O) {
    return O instanceof t._CodeOrName ? U(F, O.names) : F;
  }
  function z(F, O, R) {
    if (F instanceof t.Name)
      return B(F);
    if (!Q(F))
      return F;
    return new t._Code(F._items.reduce((Y, oe) => (oe instanceof t.Name && (oe = B(oe)), oe instanceof t._Code ? Y.push(...oe._items) : Y.push(oe), Y), []));
    function B(Y) {
      const oe = R[Y.str];
      return oe === void 0 || O[Y.str] !== 1 ? Y : (delete O[Y.str], oe);
    }
    function Q(Y) {
      return Y instanceof t._Code && Y._items.some((oe) => oe instanceof t.Name && O[oe.str] === 1 && R[oe.str] !== void 0);
    }
  }
  function G(F, O) {
    for (const R in O)
      F[R] = (F[R] || 0) - (O[R] || 0);
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
    return (O, R) => O === t.nil ? R : R === t.nil ? O : (0, t._)`${W(O)} ${F} ${W(R)}`;
  }
  function W(F) {
    return F instanceof t.Name ? F : (0, t._)`(${F})`;
  }
})(Le);
var tt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.checkStrictMode = e.getErrorPath = e.Type = e.useFunc = e.setEvaluated = e.evaluatedPropsToName = e.mergeEvaluated = e.eachItem = e.unescapeJsonPointer = e.escapeJsonPointer = e.escapeFragment = e.unescapeFragment = e.schemaRefOrVal = e.schemaHasRulesButRef = e.schemaHasRules = e.checkUnknownRules = e.alwaysValidSchema = e.toHash = void 0;
  const t = Le, r = os;
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
    const { opts: A, self: j } = x;
    if (!A.strictSchema || typeof w == "boolean")
      return;
    const k = j.RULES.keywords;
    for (const K in w)
      k[K] || b(x, `unknown keyword: "${K}"`);
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
  function c({ topSchemaRef: x, schemaPath: w }, A, j, k) {
    if (!k) {
      if (typeof A == "number" || typeof A == "boolean")
        return A;
      if (typeof A == "string")
        return (0, t._)`${A}`;
    }
    return (0, t._)`${x}${w}${(0, t.getProperty)(j)}`;
  }
  e.schemaRefOrVal = c;
  function u(x) {
    return m(decodeURIComponent(x));
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
  function m(x) {
    return x.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  e.unescapeJsonPointer = m;
  function f(x, w) {
    if (Array.isArray(x))
      for (const A of x)
        w(A);
    else
      w(x);
  }
  e.eachItem = f;
  function y({ mergeNames: x, mergeToName: w, mergeValues: A, resultToName: j }) {
    return (k, K, U, H) => {
      const z = U === void 0 ? K : U instanceof t.Name ? (K instanceof t.Name ? x(k, K, U) : w(k, K, U), U) : K instanceof t.Name ? (w(k, U, K), K) : A(K, U);
      return H === t.Name && !(z instanceof t.Name) ? j(k, z) : z;
    };
  }
  e.mergeEvaluated = {
    props: y({
      mergeNames: (x, w, A) => x.if((0, t._)`${A} !== true && ${w} !== undefined`, () => {
        x.if((0, t._)`${w} === true`, () => x.assign(A, !0), () => x.assign(A, (0, t._)`${A} || {}`).code((0, t._)`Object.assign(${A}, ${w})`));
      }),
      mergeToName: (x, w, A) => x.if((0, t._)`${A} !== true`, () => {
        w === !0 ? x.assign(A, !0) : (x.assign(A, (0, t._)`${A} || {}`), g(x, A, w));
      }),
      mergeValues: (x, w) => x === !0 ? !0 : { ...x, ...w },
      resultToName: h
    }),
    items: y({
      mergeNames: (x, w, A) => x.if((0, t._)`${A} !== true && ${w} !== undefined`, () => x.assign(A, (0, t._)`${w} === true ? true : ${A} > ${w} ? ${A} : ${w}`)),
      mergeToName: (x, w, A) => x.if((0, t._)`${A} !== true`, () => x.assign(A, w === !0 ? !0 : (0, t._)`${A} > ${w} ? ${A} : ${w}`)),
      mergeValues: (x, w) => x === !0 ? !0 : Math.max(x, w),
      resultToName: (x, w) => x.var("items", w)
    })
  };
  function h(x, w) {
    if (w === !0)
      return x.var("props", !0);
    const A = x.var("props", (0, t._)`{}`);
    return w !== void 0 && g(x, A, w), A;
  }
  e.evaluatedPropsToName = h;
  function g(x, w, A) {
    Object.keys(A).forEach((j) => x.assign((0, t._)`${w}${(0, t.getProperty)(j)}`, !0));
  }
  e.setEvaluated = g;
  const v = {};
  function S(x, w) {
    return x.scopeValue("func", {
      ref: w,
      code: v[w.code] || (v[w.code] = new r._Code(w.code))
    });
  }
  e.useFunc = S;
  var _;
  (function(x) {
    x[x.Num = 0] = "Num", x[x.Str = 1] = "Str";
  })(_ = e.Type || (e.Type = {}));
  function $(x, w, A) {
    if (x instanceof t.Name) {
      const j = w === _.Num;
      return A ? j ? (0, t._)`"[" + ${x} + "]"` : (0, t._)`"['" + ${x} + "']"` : j ? (0, t._)`"/" + ${x}` : (0, t._)`"/" + ${x}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return A ? (0, t.getProperty)(x).toString() : "/" + p(x);
  }
  e.getErrorPath = $;
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
const Wt = Le, k8 = {
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
Ur.default = k8;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Le, r = tt, n = Ur;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: v }) => v ? (0, t.str)`"${g}" keyword must be ${v} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function o(g, v = e.keywordError, S, _) {
    const { it: $ } = g, { gen: b, compositeRule: x, allErrors: w } = $, A = p(g, v, S);
    _ ?? (x || w) ? c(b, A) : u($, (0, t._)`[${A}]`);
  }
  e.reportError = o;
  function i(g, v = e.keywordError, S) {
    const { it: _ } = g, { gen: $, compositeRule: b, allErrors: x } = _, w = p(g, v, S);
    c($, w), b || x || u(_, n.default.vErrors);
  }
  e.reportExtraError = i;
  function a(g, v) {
    g.assign(n.default.errors, v), g.if((0, t._)`${n.default.vErrors} !== null`, () => g.if(v, () => g.assign((0, t._)`${n.default.vErrors}.length`, v), () => g.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function l({ gen: g, keyword: v, schemaValue: S, data: _, errsCount: $, it: b }) {
    if ($ === void 0)
      throw new Error("ajv implementation error");
    const x = g.name("err");
    g.forRange("i", $, n.default.errors, (w) => {
      g.const(x, (0, t._)`${n.default.vErrors}[${w}]`), g.if((0, t._)`${x}.instancePath === undefined`, () => g.assign((0, t._)`${x}.instancePath`, (0, t.strConcat)(n.default.instancePath, b.errorPath))), g.assign((0, t._)`${x}.schemaPath`, (0, t.str)`${b.errSchemaPath}/${v}`), b.opts.verbose && (g.assign((0, t._)`${x}.schema`, S), g.assign((0, t._)`${x}.data`, _));
    });
  }
  e.extendErrors = l;
  function c(g, v) {
    const S = g.const("err", v);
    g.if((0, t._)`${n.default.vErrors} === null`, () => g.assign(n.default.vErrors, (0, t._)`[${S}]`), (0, t._)`${n.default.vErrors}.push(${S})`), g.code((0, t._)`${n.default.errors}++`);
  }
  function u(g, v) {
    const { gen: S, validateName: _, schemaEnv: $ } = g;
    $.$async ? S.throw((0, t._)`new ${g.ValidationError}(${v})`) : (S.assign((0, t._)`${_}.errors`, v), S.return(!1));
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
  function p(g, v, S) {
    const { createErrors: _ } = g.it;
    return _ === !1 ? (0, t._)`{}` : m(g, v, S);
  }
  function m(g, v, S = {}) {
    const { gen: _, it: $ } = g, b = [
      f($, S),
      y(g, S)
    ];
    return h(g, v, b), _.object(...b);
  }
  function f({ errorPath: g }, { instancePath: v }) {
    const S = v ? (0, t.str)`${g}${(0, r.getErrorPath)(v, r.Type.Str)}` : g;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, S)];
  }
  function y({ keyword: g, it: { errSchemaPath: v } }, { schemaPath: S, parentSchema: _ }) {
    let $ = _ ? v : (0, t.str)`${v}/${g}`;
    return S && ($ = (0, t.str)`${$}${(0, r.getErrorPath)(S, r.Type.Str)}`), [d.schemaPath, $];
  }
  function h(g, { params: v, message: S }, _) {
    const { keyword: $, data: b, schemaValue: x, it: w } = g, { opts: A, propertyName: j, topSchemaRef: k, schemaPath: K } = w;
    _.push([d.keyword, $], [d.params, typeof v == "function" ? v(g) : v || (0, t._)`{}`]), A.messages && _.push([d.message, typeof S == "function" ? S(g) : S]), A.verbose && _.push([d.schema, x], [d.parentSchema, (0, t._)`${k}${K}`], [n.default.data, b]), j && _.push([d.propertyName, j]);
  }
})(Ss);
Object.defineProperty(Lo, "__esModule", { value: !0 });
Lo.boolOrEmptySchema = Lo.topBoolOrEmptySchema = void 0;
const M8 = Ss, D8 = Le, F8 = Ur, L8 = {
  message: "boolean schema is false"
};
function B8(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? J0(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(F8.default.data) : (t.assign((0, D8._)`${n}.errors`, null), t.return(!0));
}
Lo.topBoolOrEmptySchema = B8;
function V8(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), J0(e)) : r.var(t, !0);
}
Lo.boolOrEmptySchema = V8;
function J0(e, t) {
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
  (0, M8.reportError)(o, L8, void 0, t);
}
var _s = {}, Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.getRules = Gn.isJSONType = void 0;
const z8 = ["string", "number", "integer", "boolean", "null", "object", "array"], U8 = new Set(z8);
function W8(e) {
  return typeof e == "string" && U8.has(e);
}
Gn.isJSONType = W8;
function q8() {
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
Gn.getRules = q8;
var Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.shouldUseRule = Xr.shouldUseGroup = Xr.schemaHasRulesForType = void 0;
function K8({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && Z0(e, n);
}
Xr.schemaHasRulesForType = K8;
function Z0(e, t) {
  return t.rules.some((r) => Q0(e, r));
}
Xr.shouldUseGroup = Z0;
function Q0(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Xr.shouldUseRule = Q0;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.reportTypeError = e.checkDataTypes = e.checkDataType = e.coerceAndCheckDataType = e.getJSONTypes = e.getSchemaTypes = e.DataType = void 0;
  const t = Gn, r = Xr, n = Ss, o = Le, i = tt;
  var a;
  (function(_) {
    _[_.Correct = 0] = "Correct", _[_.Wrong = 1] = "Wrong";
  })(a = e.DataType || (e.DataType = {}));
  function l(_) {
    const $ = c(_.type);
    if ($.includes("null")) {
      if (_.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!$.length && _.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      _.nullable === !0 && $.push("null");
    }
    return $;
  }
  e.getSchemaTypes = l;
  function c(_) {
    const $ = Array.isArray(_) ? _ : _ ? [_] : [];
    if ($.every(t.isJSONType))
      return $;
    throw new Error("type must be JSONType or JSONType[]: " + $.join(","));
  }
  e.getJSONTypes = c;
  function u(_, $) {
    const { gen: b, data: x, opts: w } = _, A = p($, w.coerceTypes), j = $.length > 0 && !(A.length === 0 && $.length === 1 && (0, r.schemaHasRulesForType)(_, $[0]));
    if (j) {
      const k = h($, x, w.strictNumbers, a.Wrong);
      b.if(k, () => {
        A.length ? m(_, $, A) : v(_);
      });
    }
    return j;
  }
  e.coerceAndCheckDataType = u;
  const d = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function p(_, $) {
    return $ ? _.filter((b) => d.has(b) || $ === "array" && b === "array") : [];
  }
  function m(_, $, b) {
    const { gen: x, data: w, opts: A } = _, j = x.let("dataType", (0, o._)`typeof ${w}`), k = x.let("coerced", (0, o._)`undefined`);
    A.coerceTypes === "array" && x.if((0, o._)`${j} == 'object' && Array.isArray(${w}) && ${w}.length == 1`, () => x.assign(w, (0, o._)`${w}[0]`).assign(j, (0, o._)`typeof ${w}`).if(h($, w, A.strictNumbers), () => x.assign(k, w))), x.if((0, o._)`${k} !== undefined`);
    for (const U of b)
      (d.has(U) || U === "array" && A.coerceTypes === "array") && K(U);
    x.else(), v(_), x.endIf(), x.if((0, o._)`${k} !== undefined`, () => {
      x.assign(w, k), f(_, k);
    });
    function K(U) {
      switch (U) {
        case "string":
          x.elseIf((0, o._)`${j} == "number" || ${j} == "boolean"`).assign(k, (0, o._)`"" + ${w}`).elseIf((0, o._)`${w} === null`).assign(k, (0, o._)`""`);
          return;
        case "number":
          x.elseIf((0, o._)`${j} == "boolean" || ${w} === null
              || (${j} == "string" && ${w} && ${w} == +${w})`).assign(k, (0, o._)`+${w}`);
          return;
        case "integer":
          x.elseIf((0, o._)`${j} === "boolean" || ${w} === null
              || (${j} === "string" && ${w} && ${w} == +${w} && !(${w} % 1))`).assign(k, (0, o._)`+${w}`);
          return;
        case "boolean":
          x.elseIf((0, o._)`${w} === "false" || ${w} === 0 || ${w} === null`).assign(k, !1).elseIf((0, o._)`${w} === "true" || ${w} === 1`).assign(k, !0);
          return;
        case "null":
          x.elseIf((0, o._)`${w} === "" || ${w} === 0 || ${w} === false`), x.assign(k, null);
          return;
        case "array":
          x.elseIf((0, o._)`${j} === "string" || ${j} === "number"
              || ${j} === "boolean" || ${w} === null`).assign(k, (0, o._)`[${w}]`);
      }
    }
  }
  function f({ gen: _, parentData: $, parentDataProperty: b }, x) {
    _.if((0, o._)`${$} !== undefined`, () => _.assign((0, o._)`${$}[${b}]`, x));
  }
  function y(_, $, b, x = a.Correct) {
    const w = x === a.Correct ? o.operators.EQ : o.operators.NEQ;
    let A;
    switch (_) {
      case "null":
        return (0, o._)`${$} ${w} null`;
      case "array":
        A = (0, o._)`Array.isArray(${$})`;
        break;
      case "object":
        A = (0, o._)`${$} && typeof ${$} == "object" && !Array.isArray(${$})`;
        break;
      case "integer":
        A = j((0, o._)`!(${$} % 1) && !isNaN(${$})`);
        break;
      case "number":
        A = j();
        break;
      default:
        return (0, o._)`typeof ${$} ${w} ${_}`;
    }
    return x === a.Correct ? A : (0, o.not)(A);
    function j(k = o.nil) {
      return (0, o.and)((0, o._)`typeof ${$} == "number"`, k, b ? (0, o._)`isFinite(${$})` : o.nil);
    }
  }
  e.checkDataType = y;
  function h(_, $, b, x) {
    if (_.length === 1)
      return y(_[0], $, b, x);
    let w;
    const A = (0, i.toHash)(_);
    if (A.array && A.object) {
      const j = (0, o._)`typeof ${$} != "object"`;
      w = A.null ? j : (0, o._)`!${$} || ${j}`, delete A.null, delete A.array, delete A.object;
    } else
      w = o.nil;
    A.number && delete A.integer;
    for (const j in A)
      w = (0, o.and)(w, y(j, $, b, x));
    return w;
  }
  e.checkDataTypes = h;
  const g = {
    message: ({ schema: _ }) => `must be ${_}`,
    params: ({ schema: _, schemaValue: $ }) => typeof _ == "string" ? (0, o._)`{type: ${_}}` : (0, o._)`{type: ${$}}`
  };
  function v(_) {
    const $ = S(_);
    (0, n.reportError)($, g);
  }
  e.reportTypeError = v;
  function S(_) {
    const { gen: $, data: b, schema: x } = _, w = (0, i.schemaRefOrVal)(_, x, "type");
    return {
      gen: $,
      keyword: "type",
      data: b,
      schema: x.type,
      schemaCode: w,
      schemaValue: w,
      parentSchema: x,
      params: {},
      it: _
    };
  }
})(_s);
var Wl = {};
Object.defineProperty(Wl, "__esModule", { value: !0 });
Wl.assignDefaults = void 0;
const yo = Le, H8 = tt;
function G8(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const o in r)
      Xh(e, o, r[o].default);
  else
    t === "array" && Array.isArray(n) && n.forEach((o, i) => Xh(e, i, o.default));
}
Wl.assignDefaults = G8;
function Xh(e, t, r) {
  const { gen: n, compositeRule: o, data: i, opts: a } = e;
  if (r === void 0)
    return;
  const l = (0, yo._)`${i}${(0, yo.getProperty)(t)}`;
  if (o) {
    (0, H8.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, yo._)`${l} === undefined`;
  a.useDefaults === "empty" && (c = (0, yo._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, yo._)`${l} = ${(0, yo.stringify)(r)}`);
}
var Dr = {}, We = {};
Object.defineProperty(We, "__esModule", { value: !0 });
We.validateUnion = We.validateArray = We.usePattern = We.callValidateCode = We.schemaProperties = We.allSchemaProperties = We.noPropertyInData = We.propertyInData = We.isOwnProperty = We.hasPropFunc = We.reportMissingProp = We.checkMissingProp = We.checkReportMissingProp = void 0;
const vt = Le, Qd = tt, cn = Ur, Y8 = tt;
function X8(e, t) {
  const { gen: r, data: n, it: o } = e;
  r.if(tf(r, n, t, o.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, vt._)`${t}` }, !0), e.error();
  });
}
We.checkReportMissingProp = X8;
function J8({ gen: e, data: t, it: { opts: r } }, n, o) {
  return (0, vt.or)(...n.map((i) => (0, vt.and)(tf(e, t, i, r.ownProperties), (0, vt._)`${o} = ${i}`)));
}
We.checkMissingProp = J8;
function Z8(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
We.reportMissingProp = Z8;
function e$(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, vt._)`Object.prototype.hasOwnProperty`
  });
}
We.hasPropFunc = e$;
function ef(e, t, r) {
  return (0, vt._)`${e$(e)}.call(${t}, ${r})`;
}
We.isOwnProperty = ef;
function Q8(e, t, r, n) {
  const o = (0, vt._)`${t}${(0, vt.getProperty)(r)} !== undefined`;
  return n ? (0, vt._)`${o} && ${ef(e, t, r)}` : o;
}
We.propertyInData = Q8;
function tf(e, t, r, n) {
  const o = (0, vt._)`${t}${(0, vt.getProperty)(r)} === undefined`;
  return n ? (0, vt.or)(o, (0, vt.not)(ef(e, t, r))) : o;
}
We.noPropertyInData = tf;
function t$(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
We.allSchemaProperties = t$;
function eG(e, t) {
  return t$(t).filter((r) => !(0, Qd.alwaysValidSchema)(e, t[r]));
}
We.schemaProperties = eG;
function tG({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: o, errorPath: i }, it: a }, l, c, u) {
  const d = u ? (0, vt._)`${e}, ${t}, ${n}${o}` : t, p = [
    [cn.default.instancePath, (0, vt.strConcat)(cn.default.instancePath, i)],
    [cn.default.parentData, a.parentData],
    [cn.default.parentDataProperty, a.parentDataProperty],
    [cn.default.rootData, cn.default.rootData]
  ];
  a.opts.dynamicRef && p.push([cn.default.dynamicAnchors, cn.default.dynamicAnchors]);
  const m = (0, vt._)`${d}, ${r.object(...p)}`;
  return c !== vt.nil ? (0, vt._)`${l}.call(${c}, ${m})` : (0, vt._)`${l}(${m})`;
}
We.callValidateCode = tG;
const rG = (0, vt._)`new RegExp`;
function nG({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: o } = t.code, i = o(r, n);
  return e.scopeValue("pattern", {
    key: i.toString(),
    ref: i,
    code: (0, vt._)`${o.code === "new RegExp" ? rG : (0, Y8.useFunc)(e, o)}(${r}, ${n})`
  });
}
We.usePattern = nG;
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
We.validateArray = oG;
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
We.validateUnion = iG;
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.validateKeywordUsage = Dr.validSchemaType = Dr.funcKeywordCode = Dr.macroKeywordCode = void 0;
const Xt = Le, Fn = Ur, sG = We, aG = Ss;
function lG(e, t) {
  const { gen: r, keyword: n, schema: o, parentSchema: i, it: a } = e, l = t.macro.call(a.self, o, i, a), c = r$(r, n, l);
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
  const u = !l && t.compile ? t.compile.call(c.self, i, a, c) : t.validate, d = r$(n, o, u), p = n.let("valid");
  e.block$data(p, m), e.ok((r = t.valid) !== null && r !== void 0 ? r : p);
  function m() {
    if (t.errors === !1)
      h(), t.modifying && Jh(e), g(() => e.error());
    else {
      const v = t.async ? f() : y();
      t.modifying && Jh(e), g(() => uG(e, v));
    }
  }
  function f() {
    const v = n.let("ruleErrs", null);
    return n.try(() => h((0, Xt._)`await `), (S) => n.assign(p, !1).if((0, Xt._)`${S} instanceof ${c.ValidationError}`, () => n.assign(v, (0, Xt._)`${S}.errors`), () => n.throw(S))), v;
  }
  function y() {
    const v = (0, Xt._)`${d}.errors`;
    return n.assign(v, null), h(Xt.nil), v;
  }
  function h(v = t.async ? (0, Xt._)`await ` : Xt.nil) {
    const S = c.opts.passContext ? Fn.default.this : Fn.default.self, _ = !("compile" in t && !l || t.schema === !1);
    n.assign(p, (0, Xt._)`${v}${(0, sG.callValidateCode)(e, d, S, _)}`, t.modifying);
  }
  function g(v) {
    var S;
    n.if((0, Xt.not)((S = t.valid) !== null && S !== void 0 ? S : p), v);
  }
}
Dr.funcKeywordCode = cG;
function Jh(e) {
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
function r$(e, t, r) {
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
const kr = Le, n$ = tt;
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, n$.escapeFragment)(r)}`
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
    const { errorPath: u, dataPathArr: d, opts: p } = t, m = l.let("data", (0, kr._)`${t.data}${(0, kr.getProperty)(r)}`, !0);
    c(m), e.errorPath = (0, kr.str)`${u}${(0, n$.getErrorPath)(r, n, p.jsPropertySyntax)}`, e.parentDataProperty = (0, kr._)`${r}`, e.dataPathArr = [...d, e.parentDataProperty];
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
var zt = {}, o$ = function e(t, r) {
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
}, i$ = { exports: {} }, mn = i$.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, o = r.post || function() {
  };
  la(t, n, o, e, "", e);
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
function la(e, t, r, n, o, i, a, l, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, o, i, a, l, c, u);
    for (var d in n) {
      var p = n[d];
      if (Array.isArray(p)) {
        if (d in mn.arrayKeywords)
          for (var m = 0; m < p.length; m++)
            la(e, t, r, p[m], o + "/" + d + "/" + m, i, o, d, n, m);
      } else if (d in mn.propsKeywords) {
        if (p && typeof p == "object")
          for (var f in p)
            la(e, t, r, p[f], o + "/" + d + "/" + gG(f), i, o, d, n, f);
      } else
        (d in mn.keywords || e.allKeys && !(d in mn.skipKeywords)) && la(e, t, r, p, o + "/" + d, i, o, d, n);
    }
    r(n, o, i, a, l, c, u);
  }
}
function gG(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var vG = i$.exports;
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.getSchemaRefs = zt.resolveUrl = zt.normalizeId = zt._getFullPath = zt.getFullPath = zt.inlineRef = void 0;
const bG = tt, $G = o$, SG = vG, _G = /* @__PURE__ */ new Set([
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
function EG(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !uu(e) : t ? s$(e) <= t : !1;
}
zt.inlineRef = EG;
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
function s$(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !_G.has(r) && (typeof e[r] == "object" && (0, bG.eachItem)(e[r], (n) => t += s$(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function a$(e, t = "", r) {
  r !== !1 && (t = Po(t));
  const n = e.parse(t);
  return l$(e, n);
}
zt.getFullPath = a$;
function l$(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
zt._getFullPath = l$;
const wG = /#\/?$/;
function Po(e) {
  return e ? e.replace(wG, "") : "";
}
zt.normalizeId = Po;
function OG(e, t, r) {
  return r = Po(r), e.resolve(t, r);
}
zt.resolveUrl = OG;
const TG = /^[a-z_][-a-z0-9._]*$/i;
function CG(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, o = Po(e[r] || t), i = { "": o }, a = a$(n, o, !1), l = {}, c = /* @__PURE__ */ new Set();
  return SG(e, { allKeys: !0 }, (p, m, f, y) => {
    if (y === void 0)
      return;
    const h = a + m;
    let g = i[y];
    typeof p[r] == "string" && (g = v.call(this, p[r])), S.call(this, p.$anchor), S.call(this, p.$dynamicAnchor), i[m] = g;
    function v(_) {
      const $ = this.opts.uriResolver.resolve;
      if (_ = Po(g ? $(g, _) : _), c.has(_))
        throw d(_);
      c.add(_);
      let b = this.refs[_];
      return typeof b == "string" && (b = this.refs[b]), typeof b == "object" ? u(p, b.schema, _) : _ !== Po(h) && (_[0] === "#" ? (u(p, l[_], _), l[_] = p) : this.refs[_] = h), _;
    }
    function S(_) {
      if (typeof _ == "string") {
        if (!TG.test(_))
          throw new Error(`invalid anchor "${_}"`);
        v.call(this, `#${_}`);
      }
    }
  }), l;
  function u(p, m, f) {
    if (m !== void 0 && !$G(p, m))
      throw d(f);
  }
  function d(p) {
    return new Error(`reference "${p}" resolves to more than one schema`);
  }
}
zt.getSchemaRefs = CG;
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.getData = Cr.KeywordCxt = Cr.validateFunctionCode = void 0;
const c$ = Lo, Zh = _s, rf = Xr, Da = _s, PG = Wl, Vi = Dr, Cc = gn, Te = Le, Re = Ur, RG = zt, Jr = tt, Ci = Ss;
function IG(e) {
  if (f$(e) && (p$(e), d$(e))) {
    jG(e);
    return;
  }
  u$(e, () => (0, c$.topBoolOrEmptySchema)(e));
}
Cr.validateFunctionCode = IG;
function u$({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: o }, i) {
  o.code.es5 ? e.func(t, (0, Te._)`${Re.default.data}, ${Re.default.valCxt}`, n.$async, () => {
    e.code((0, Te._)`"use strict"; ${Qh(r, o)}`), AG(e, o), e.code(i);
  }) : e.func(t, (0, Te._)`${Re.default.data}, ${NG(o)}`, n.$async, () => e.code(Qh(r, o)).code(i));
}
function NG(e) {
  return (0, Te._)`{${Re.default.instancePath}="", ${Re.default.parentData}, ${Re.default.parentDataProperty}, ${Re.default.rootData}=${Re.default.data}${e.dynamicRef ? (0, Te._)`, ${Re.default.dynamicAnchors}={}` : Te.nil}}={}`;
}
function AG(e, t) {
  e.if(Re.default.valCxt, () => {
    e.var(Re.default.instancePath, (0, Te._)`${Re.default.valCxt}.${Re.default.instancePath}`), e.var(Re.default.parentData, (0, Te._)`${Re.default.valCxt}.${Re.default.parentData}`), e.var(Re.default.parentDataProperty, (0, Te._)`${Re.default.valCxt}.${Re.default.parentDataProperty}`), e.var(Re.default.rootData, (0, Te._)`${Re.default.valCxt}.${Re.default.rootData}`), t.dynamicRef && e.var(Re.default.dynamicAnchors, (0, Te._)`${Re.default.valCxt}.${Re.default.dynamicAnchors}`);
  }, () => {
    e.var(Re.default.instancePath, (0, Te._)`""`), e.var(Re.default.parentData, (0, Te._)`undefined`), e.var(Re.default.parentDataProperty, (0, Te._)`undefined`), e.var(Re.default.rootData, Re.default.data), t.dynamicRef && e.var(Re.default.dynamicAnchors, (0, Te._)`{}`);
  });
}
function jG(e) {
  const { schema: t, opts: r, gen: n } = e;
  u$(e, () => {
    r.$comment && t.$comment && h$(e), LG(e), n.let(Re.default.vErrors, null), n.let(Re.default.errors, 0), r.unevaluated && kG(e), m$(e), zG(e);
  });
}
function kG(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, Te._)`${r}.evaluated`), t.if((0, Te._)`${e.evaluated}.dynamicProps`, () => t.assign((0, Te._)`${e.evaluated}.props`, (0, Te._)`undefined`)), t.if((0, Te._)`${e.evaluated}.dynamicItems`, () => t.assign((0, Te._)`${e.evaluated}.items`, (0, Te._)`undefined`));
}
function Qh(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, Te._)`/*# sourceURL=${r} */` : Te.nil;
}
function MG(e, t) {
  if (f$(e) && (p$(e), d$(e))) {
    DG(e, t);
    return;
  }
  (0, c$.boolOrEmptySchema)(e, t);
}
function d$({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function f$(e) {
  return typeof e.schema != "boolean";
}
function DG(e, t) {
  const { schema: r, gen: n, opts: o } = e;
  o.$comment && r.$comment && h$(e), BG(e), VG(e);
  const i = n.const("_errs", Re.default.errors);
  m$(e, i), n.var(t, (0, Te._)`${i} === ${Re.default.errors}`);
}
function p$(e) {
  (0, Jr.checkUnknownRules)(e), FG(e);
}
function m$(e, t) {
  if (e.opts.jtd)
    return ey(e, [], !1, t);
  const r = (0, Zh.getSchemaTypes)(e.schema), n = (0, Zh.coerceAndCheckDataType)(e, r);
  ey(e, r, !n, t);
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
function h$({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: o }) {
  const i = r.$comment;
  if (o.$comment === !0)
    e.code((0, Te._)`${Re.default.self}.logger.log(${i})`);
  else if (typeof o.$comment == "function") {
    const a = (0, Te.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, Te._)`${Re.default.self}.opts.$comment(${i}, ${a}, ${l}.schema)`);
  }
}
function zG(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: o, opts: i } = e;
  r.$async ? t.if((0, Te._)`${Re.default.errors} === 0`, () => t.return(Re.default.data), () => t.throw((0, Te._)`new ${o}(${Re.default.vErrors})`)) : (t.assign((0, Te._)`${n}.errors`, Re.default.vErrors), i.unevaluated && UG(e), t.return((0, Te._)`${Re.default.errors} === 0`));
}
function UG({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof Te.Name && e.assign((0, Te._)`${t}.props`, r), n instanceof Te.Name && e.assign((0, Te._)`${t}.items`, n);
}
function ey(e, t, r, n) {
  const { gen: o, schema: i, data: a, allErrors: l, opts: c, self: u } = e, { RULES: d } = u;
  if (i.$ref && (c.ignoreKeywordsWithRef || !(0, Jr.schemaHasRulesButRef)(i, d))) {
    o.block(() => v$(e, "$ref", d.all.$ref.definition));
    return;
  }
  c.jtd || WG(e, t), o.block(() => {
    for (const m of d.rules)
      p(m);
    p(d.post);
  });
  function p(m) {
    (0, rf.shouldUseGroup)(i, m) && (m.type ? (o.if((0, Da.checkDataType)(m.type, a, c.strictNumbers)), ty(e, m), t.length === 1 && t[0] === m.type && r && (o.else(), (0, Da.reportTypeError)(e)), o.endIf()) : ty(e, m), l || o.if((0, Te._)`${Re.default.errors} === ${n || 0}`));
  }
}
function ty(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: o } } = e;
  o && (0, PG.assignDefaults)(e, t.type), r.block(() => {
    for (const i of t.rules)
      (0, rf.shouldUseRule)(n, i) && v$(e, i.keyword, i.definition, t.type);
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
      y$(e.dataTypes, r) || nf(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
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
function y$(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function YG(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    y$(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function nf(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Jr.checkStrictMode)(e, t, e.opts.strictTypes);
}
class g$ {
  constructor(t, r, n) {
    if ((0, Vi.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Jr.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", b$(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Vi.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Re.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, Te.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, Te.not)(t), void 0, r);
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
    this.fail((0, Te._)`${r} !== undefined && (${(0, Te.or)(this.invalid$data(), t)})`);
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
  block$data(t, r, n = Te.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = Te.nil, r = Te.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: o, schemaType: i, def: a } = this;
    n.if((0, Te.or)((0, Te._)`${o} === undefined`, r)), t !== Te.nil && n.assign(t, !0), (i.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== Te.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: o, it: i } = this;
    return (0, Te.or)(a(), l());
    function a() {
      if (n.length) {
        if (!(r instanceof Te.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, Te._)`${(0, Da.checkDataTypes)(c, r, i.opts.strictNumbers, Da.DataType.Wrong)}`;
      }
      return Te.nil;
    }
    function l() {
      if (o.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: o.validateSchema });
        return (0, Te._)`!${c}(${r})`;
      }
      return Te.nil;
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
      return o.if(r, () => this.mergeEvaluated(t, Te.Name)), !0;
  }
}
Cr.KeywordCxt = g$;
function v$(e, t, r, n) {
  const o = new g$(e, r, t);
  "code" in r ? r.code(o, n) : o.$data && r.validate ? (0, Vi.funcKeywordCode)(o, r) : "macro" in r ? (0, Vi.macroKeywordCode)(o, r) : (r.compile || r.validate) && (0, Vi.funcKeywordCode)(o, r);
}
const XG = /^\/(?:[^~]|~0|~1)*$/, JG = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function b$(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let o, i;
  if (e === "")
    return Re.default.rootData;
  if (e[0] === "/") {
    if (!XG.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    o = e, i = Re.default.rootData;
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
    u && (i = (0, Te._)`${i}${(0, Te.getProperty)((0, Jr.unescapeJsonPointer)(u))}`, a = (0, Te._)`${a} && ${i}`);
  return a;
  function c(u, d) {
    return `Cannot access ${u} ${d} levels up, current level is ${t}`;
  }
}
Cr.getData = b$;
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
class ZG extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Es.default = ZG;
var xs = {};
Object.defineProperty(xs, "__esModule", { value: !0 });
const Pc = zt;
class QG extends Error {
  constructor(t, r, n, o) {
    super(o || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Pc.resolveUrl)(t, r, n), this.missingSchema = (0, Pc.normalizeId)((0, Pc.getFullPath)(t, this.missingRef));
  }
}
xs.default = QG;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.resolveSchema = Qt.getCompilingSchema = Qt.resolveRef = Qt.compileSchema = Qt.SchemaEnv = void 0;
const $r = Le, e7 = Es, Nn = Ur, Er = zt, ry = tt, t7 = Cr;
class ql {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Er.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Qt.SchemaEnv = ql;
function of(e) {
  const t = $$.call(this, e);
  if (t)
    return t;
  const r = (0, Er.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: o } = this.opts.code, { ownProperties: i } = this.opts, a = new $r.CodeGen(this.scope, { es5: n, lines: o, ownProperties: i });
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
    const f = new Function(`${Nn.default.self}`, `${Nn.default.scope}`, d)(this, this.scope.get());
    if (this.scope.value(c, { ref: f }), f.errors = null, f.schema = e.schema, f.schemaEnv = e, e.$async && (f.$async = !0), this.opts.code.source === !0 && (f.source = { validateName: c, validateCode: p, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: y, items: h } = u;
      f.evaluated = {
        props: y instanceof $r.Name ? void 0 : y,
        items: h instanceof $r.Name ? void 0 : h,
        dynamicProps: y instanceof $r.Name,
        dynamicItems: h instanceof $r.Name
      }, f.source && (f.source.evaluated = (0, $r.stringify)(f.evaluated));
    }
    return e.validate = f, e;
  } catch (p) {
    throw delete e.validate, delete e.validateName, d && this.logger.error("Error compiling schema, function code:", d), p;
  } finally {
    this._compilations.delete(e);
  }
}
Qt.compileSchema = of;
function r7(e, t, r) {
  var n;
  r = (0, Er.resolveUrl)(this.opts.uriResolver, t, r);
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
  return (0, Er.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : of.call(this, e);
}
function $$(e) {
  for (const t of this._compilations)
    if (o7(t, e))
      return t;
}
Qt.getCompilingSchema = $$;
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
  const r = this.opts.uriResolver.parse(t), n = (0, Er._getFullPath)(this.opts.uriResolver, r);
  let o = (0, Er.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === o)
    return Rc.call(this, r, e);
  const i = (0, Er.normalizeId)(n), a = this.refs[i] || this.schemas[i];
  if (typeof a == "string") {
    const l = Kl.call(this, e, a);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Rc.call(this, r, l);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || of.call(this, a), i === (0, Er.normalizeId)(t)) {
      const { schema: l } = a, { schemaId: c } = this.opts, u = l[c];
      return u && (o = (0, Er.resolveUrl)(this.opts.uriResolver, o, u)), new ql({ schema: l, schemaId: c, root: e, baseId: o });
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
    const c = r[(0, ry.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !s7.has(l) && u && (t = (0, Er.resolveUrl)(this.opts.uriResolver, t, u));
  }
  let i;
  if (typeof r != "boolean" && r.$ref && !(0, ry.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, Er.resolveUrl)(this.opts.uriResolver, t, r.$ref);
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
  })(So, function(r) {
    function n() {
      for (var L = arguments.length, I = Array(L), V = 0; V < L; V++)
        I[V] = arguments[V];
      if (I.length > 1) {
        I[0] = I[0].slice(0, -1);
        for (var T = I.length - 1, M = 1; M < T; ++M)
          I[M] = I[M].slice(1, -1);
        return I[T] = I[T].slice(1), I.join("");
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
        for (var T in I)
          V[T] = I[T];
      return V;
    }
    function u(L) {
      var I = "[A-Za-z]", V = "[0-9]", T = n(V, "[A-Fa-f]"), M = o(o("%[EFef]" + T + "%" + T + T + "%" + T + T) + "|" + o("%[89A-Fa-f]" + T + "%" + T + T) + "|" + o("%" + T + T)), ee = "[\\:\\/\\?\\#\\[\\]\\@]", ae = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", de = n(ee, ae), ve = L ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", we = L ? "[\\uE000-\\uF8FF]" : "[]", me = n(I, V, "[\\-\\.\\_\\~]", ve);
      o(I + n(I, V, "[\\+\\-\\.]") + "*"), o(o(M + "|" + n(me, ae, "[\\:]")) + "*");
      var Ce = o(o("25[0-5]") + "|" + o("2[0-4]" + V) + "|" + o("1" + V + V) + "|" + o("0?[1-9]" + V) + "|0?0?" + V), ke = o(Ce + "\\." + Ce + "\\." + Ce + "\\." + Ce), Ee = o(T + "{1,4}"), Ge = o(o(Ee + "\\:" + Ee) + "|" + ke), mt = o(o(Ee + "\\:") + "{6}" + Ge), ht = o("\\:\\:" + o(Ee + "\\:") + "{5}" + Ge), Mt = o(o(Ee) + "?\\:\\:" + o(Ee + "\\:") + "{4}" + Ge), Ir = o(o(o(Ee + "\\:") + "{0,1}" + Ee) + "?\\:\\:" + o(Ee + "\\:") + "{3}" + Ge), Nr = o(o(o(Ee + "\\:") + "{0,2}" + Ee) + "?\\:\\:" + o(Ee + "\\:") + "{2}" + Ge), io = o(o(o(Ee + "\\:") + "{0,3}" + Ee) + "?\\:\\:" + Ee + "\\:" + Ge), Cn = o(o(o(Ee + "\\:") + "{0,4}" + Ee) + "?\\:\\:" + Ge), ur = o(o(o(Ee + "\\:") + "{0,5}" + Ee) + "?\\:\\:" + Ee), Ar = o(o(o(Ee + "\\:") + "{0,6}" + Ee) + "?\\:\\:"), Pn = o([mt, ht, Mt, Ir, Nr, io, Cn, ur, Ar].join("|")), qr = o(o(me + "|" + M) + "+");
      o("[vV]" + T + "+\\." + n(me, ae, "[\\:]") + "+"), o(o(M + "|" + n(me, ae)) + "*");
      var di = o(M + "|" + n(me, ae, "[\\:\\@]"));
      return o(o(M + "|" + n(me, ae, "[\\@]")) + "+"), o(o(di + "|" + n("[\\/\\?]", we)) + "*"), {
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
        PCT_ENCODED: new RegExp(M, "g"),
        IPV4ADDRESS: new RegExp("^(" + ke + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + Pn + ")" + o(o("\\%25|\\%(?!" + T + "{2})") + "(" + qr + ")") + "?\\]?$")
        //RFC 6874, with relaxed parsing rules
      };
    }
    var d = u(!1), p = u(!0), m = function() {
      function L(I, V) {
        var T = [], M = !0, ee = !1, ae = void 0;
        try {
          for (var de = I[Symbol.iterator](), ve; !(M = (ve = de.next()).done) && (T.push(ve.value), !(V && T.length === V)); M = !0)
            ;
        } catch (we) {
          ee = !0, ae = we;
        } finally {
          try {
            !M && de.return && de.return();
          } finally {
            if (ee)
              throw ae;
          }
        }
        return T;
      }
      return function(I, V) {
        if (Array.isArray(I))
          return I;
        if (Symbol.iterator in Object(I))
          return L(I, V);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), f = function(L) {
      if (Array.isArray(L)) {
        for (var I = 0, V = Array(L.length); I < L.length; I++)
          V[I] = L[I];
        return V;
      } else
        return Array.from(L);
    }, y = 2147483647, h = 36, g = 1, v = 26, S = 38, _ = 700, $ = 72, b = 128, x = "-", w = /^xn--/, A = /[^\0-\x7E]/, j = /[\x2E\u3002\uFF0E\uFF61]/g, k = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, K = h - g, U = Math.floor, H = String.fromCharCode;
    function z(L) {
      throw new RangeError(k[L]);
    }
    function G(L, I) {
      for (var V = [], T = L.length; T--; )
        V[T] = I(L[T]);
      return V;
    }
    function X(L, I) {
      var V = L.split("@"), T = "";
      V.length > 1 && (T = V[0] + "@", L = V[1]), L = L.replace(j, ".");
      var M = L.split("."), ee = G(M, I).join(".");
      return T + ee;
    }
    function J(L) {
      for (var I = [], V = 0, T = L.length; V < T; ) {
        var M = L.charCodeAt(V++);
        if (M >= 55296 && M <= 56319 && V < T) {
          var ee = L.charCodeAt(V++);
          (ee & 64512) == 56320 ? I.push(((M & 1023) << 10) + (ee & 1023) + 65536) : (I.push(M), V--);
        } else
          I.push(M);
      }
      return I;
    }
    var Z = function(I) {
      return String.fromCodePoint.apply(String, f(I));
    }, ne = function(I) {
      return I - 48 < 10 ? I - 22 : I - 65 < 26 ? I - 65 : I - 97 < 26 ? I - 97 : h;
    }, D = function(I, V) {
      return I + 22 + 75 * (I < 26) - ((V != 0) << 5);
    }, N = function(I, V, T) {
      var M = 0;
      for (
        I = T ? U(I / _) : I >> 1, I += U(I / V);
        /* no initialization */
        I > K * v >> 1;
        M += h
      )
        I = U(I / K);
      return U(M + (K + 1) * I / (I + S));
    }, W = function(I) {
      var V = [], T = I.length, M = 0, ee = b, ae = $, de = I.lastIndexOf(x);
      de < 0 && (de = 0);
      for (var ve = 0; ve < de; ++ve)
        I.charCodeAt(ve) >= 128 && z("not-basic"), V.push(I.charCodeAt(ve));
      for (var we = de > 0 ? de + 1 : 0; we < T; ) {
        for (
          var me = M, Ce = 1, ke = h;
          ;
          /* no condition */
          ke += h
        ) {
          we >= T && z("invalid-input");
          var Ee = ne(I.charCodeAt(we++));
          (Ee >= h || Ee > U((y - M) / Ce)) && z("overflow"), M += Ee * Ce;
          var Ge = ke <= ae ? g : ke >= ae + v ? v : ke - ae;
          if (Ee < Ge)
            break;
          var mt = h - Ge;
          Ce > U(y / mt) && z("overflow"), Ce *= mt;
        }
        var ht = V.length + 1;
        ae = N(M - me, ht, me == 0), U(M / ht) > y - ee && z("overflow"), ee += U(M / ht), M %= ht, V.splice(M++, 0, ee);
      }
      return String.fromCodePoint.apply(String, V);
    }, F = function(I) {
      var V = [];
      I = J(I);
      var T = I.length, M = b, ee = 0, ae = $, de = !0, ve = !1, we = void 0;
      try {
        for (var me = I[Symbol.iterator](), Ce; !(de = (Ce = me.next()).done); de = !0) {
          var ke = Ce.value;
          ke < 128 && V.push(H(ke));
        }
      } catch (fi) {
        ve = !0, we = fi;
      } finally {
        try {
          !de && me.return && me.return();
        } finally {
          if (ve)
            throw we;
        }
      }
      var Ee = V.length, Ge = Ee;
      for (Ee && V.push(x); Ge < T; ) {
        var mt = y, ht = !0, Mt = !1, Ir = void 0;
        try {
          for (var Nr = I[Symbol.iterator](), io; !(ht = (io = Nr.next()).done); ht = !0) {
            var Cn = io.value;
            Cn >= M && Cn < mt && (mt = Cn);
          }
        } catch (fi) {
          Mt = !0, Ir = fi;
        } finally {
          try {
            !ht && Nr.return && Nr.return();
          } finally {
            if (Mt)
              throw Ir;
          }
        }
        var ur = Ge + 1;
        mt - M > U((y - ee) / ur) && z("overflow"), ee += (mt - M) * ur, M = mt;
        var Ar = !0, Pn = !1, qr = void 0;
        try {
          for (var di = I[Symbol.iterator](), Ff; !(Ar = (Ff = di.next()).done); Ar = !0) {
            var Lf = Ff.value;
            if (Lf < M && ++ee > y && z("overflow"), Lf == M) {
              for (
                var Os = ee, Ts = h;
                ;
                /* no condition */
                Ts += h
              ) {
                var Cs = Ts <= ae ? g : Ts >= ae + v ? v : Ts - ae;
                if (Os < Cs)
                  break;
                var Bf = Os - Cs, Vf = h - Cs;
                V.push(H(D(Cs + Bf % Vf, 0))), Os = U(Bf / Vf);
              }
              V.push(H(D(Os, 0))), ae = N(ee, ur, Ge == Ee), ee = 0, ++Ge;
            }
          }
        } catch (fi) {
          Pn = !0, qr = fi;
        } finally {
          try {
            !Ar && di.return && di.return();
          } finally {
            if (Pn)
              throw qr;
          }
        }
        ++ee, ++M;
      }
      return V.join("");
    }, O = function(I) {
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
      toUnicode: O
    }, Q = {};
    function Y(L) {
      var I = L.charCodeAt(0), V = void 0;
      return I < 16 ? V = "%0" + I.toString(16).toUpperCase() : I < 128 ? V = "%" + I.toString(16).toUpperCase() : I < 2048 ? V = "%" + (I >> 6 | 192).toString(16).toUpperCase() + "%" + (I & 63 | 128).toString(16).toUpperCase() : V = "%" + (I >> 12 | 224).toString(16).toUpperCase() + "%" + (I >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (I & 63 | 128).toString(16).toUpperCase(), V;
    }
    function oe(L) {
      for (var I = "", V = 0, T = L.length; V < T; ) {
        var M = parseInt(L.substr(V + 1, 2), 16);
        if (M < 128)
          I += String.fromCharCode(M), V += 3;
        else if (M >= 194 && M < 224) {
          if (T - V >= 6) {
            var ee = parseInt(L.substr(V + 4, 2), 16);
            I += String.fromCharCode((M & 31) << 6 | ee & 63);
          } else
            I += L.substr(V, 6);
          V += 6;
        } else if (M >= 224) {
          if (T - V >= 9) {
            var ae = parseInt(L.substr(V + 4, 2), 16), de = parseInt(L.substr(V + 7, 2), 16);
            I += String.fromCharCode((M & 15) << 12 | (ae & 63) << 6 | de & 63);
          } else
            I += L.substr(V, 9);
          V += 9;
        } else
          I += L.substr(V, 3), V += 3;
      }
      return I;
    }
    function ie(L, I) {
      function V(T) {
        var M = oe(T);
        return M.match(I.UNRESERVED) ? M : T;
      }
      return L.scheme && (L.scheme = String(L.scheme).replace(I.PCT_ENCODED, V).toLowerCase().replace(I.NOT_SCHEME, "")), L.userinfo !== void 0 && (L.userinfo = String(L.userinfo).replace(I.PCT_ENCODED, V).replace(I.NOT_USERINFO, Y).replace(I.PCT_ENCODED, a)), L.host !== void 0 && (L.host = String(L.host).replace(I.PCT_ENCODED, V).toLowerCase().replace(I.NOT_HOST, Y).replace(I.PCT_ENCODED, a)), L.path !== void 0 && (L.path = String(L.path).replace(I.PCT_ENCODED, V).replace(L.scheme ? I.NOT_PATH : I.NOT_PATH_NOSCHEME, Y).replace(I.PCT_ENCODED, a)), L.query !== void 0 && (L.query = String(L.query).replace(I.PCT_ENCODED, V).replace(I.NOT_QUERY, Y).replace(I.PCT_ENCODED, a)), L.fragment !== void 0 && (L.fragment = String(L.fragment).replace(I.PCT_ENCODED, V).replace(I.NOT_FRAGMENT, Y).replace(I.PCT_ENCODED, a)), L;
    }
    function ce(L) {
      return L.replace(/^0*(.*)/, "$1") || "0";
    }
    function q(L, I) {
      var V = L.match(I.IPV4ADDRESS) || [], T = m(V, 2), M = T[1];
      return M ? M.split(".").map(ce).join(".") : L;
    }
    function pe(L, I) {
      var V = L.match(I.IPV6ADDRESS) || [], T = m(V, 3), M = T[1], ee = T[2];
      if (M) {
        for (var ae = M.toLowerCase().split("::").reverse(), de = m(ae, 2), ve = de[0], we = de[1], me = we ? we.split(":").map(ce) : [], Ce = ve.split(":").map(ce), ke = I.IPV4ADDRESS.test(Ce[Ce.length - 1]), Ee = ke ? 7 : 8, Ge = Ce.length - Ee, mt = Array(Ee), ht = 0; ht < Ee; ++ht)
          mt[ht] = me[ht] || Ce[Ge + ht] || "";
        ke && (mt[Ee - 1] = q(mt[Ee - 1], I));
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
      var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, V = {}, T = I.iri !== !1 ? p : d;
      I.reference === "suffix" && (L = (I.scheme ? I.scheme + ":" : "") + "//" + L);
      var M = L.match(te);
      if (M) {
        fe ? (V.scheme = M[1], V.userinfo = M[3], V.host = M[4], V.port = parseInt(M[5], 10), V.path = M[6] || "", V.query = M[7], V.fragment = M[8], isNaN(V.port) && (V.port = M[5])) : (V.scheme = M[1] || void 0, V.userinfo = L.indexOf("@") !== -1 ? M[3] : void 0, V.host = L.indexOf("//") !== -1 ? M[4] : void 0, V.port = parseInt(M[5], 10), V.path = M[6] || "", V.query = L.indexOf("?") !== -1 ? M[7] : void 0, V.fragment = L.indexOf("#") !== -1 ? M[8] : void 0, isNaN(V.port) && (V.port = L.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? M[4] : void 0)), V.host && (V.host = pe(q(V.host, T), T)), V.scheme === void 0 && V.userinfo === void 0 && V.host === void 0 && V.port === void 0 && !V.path && V.query === void 0 ? V.reference = "same-document" : V.scheme === void 0 ? V.reference = "relative" : V.fragment === void 0 ? V.reference = "absolute" : V.reference = "uri", I.reference && I.reference !== "suffix" && I.reference !== V.reference && (V.error = V.error || "URI is not a " + I.reference + " reference.");
        var ee = Q[(I.scheme || V.scheme || "").toLowerCase()];
        if (!I.unicodeSupport && (!ee || !ee.unicodeSupport)) {
          if (V.host && (I.domainHost || ee && ee.domainHost))
            try {
              V.host = B.toASCII(V.host.replace(T.PCT_ENCODED, oe).toLowerCase());
            } catch (ae) {
              V.error = V.error || "Host's domain name can not be converted to ASCII via punycode: " + ae;
            }
          ie(V, d);
        } else
          ie(V, T);
        ee && ee.parse && ee.parse(V, I);
      } else
        V.error = V.error || "URI can not be parsed.";
      return V;
    }
    function Ae(L, I) {
      var V = I.iri !== !1 ? p : d, T = [];
      return L.userinfo !== void 0 && (T.push(L.userinfo), T.push("@")), L.host !== void 0 && T.push(pe(q(String(L.host), V), V).replace(V.IPV6ADDRESS, function(M, ee, ae) {
        return "[" + ee + (ae ? "%25" + ae : "") + "]";
      })), (typeof L.port == "number" || typeof L.port == "string") && (T.push(":"), T.push(String(L.port))), T.length ? T.join("") : void 0;
    }
    var Be = /^\.\.?\//, st = /^\/\.(\/|$)/, je = /^\/\.\.(\/|$)/, Me = /^\/?(?:.|\n)*?(?=\/|$)/;
    function Qe(L) {
      for (var I = []; L.length; )
        if (L.match(Be))
          L = L.replace(Be, "");
        else if (L.match(st))
          L = L.replace(st, "/");
        else if (L.match(je))
          L = L.replace(je, "/"), I.pop();
        else if (L === "." || L === "..")
          L = "";
        else {
          var V = L.match(Me);
          if (V) {
            var T = V[0];
            L = L.slice(T.length), I.push(T);
          } else
            throw new Error("Unexpected dot segment condition");
        }
      return I.join("");
    }
    function He(L) {
      var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, V = I.iri ? p : d, T = [], M = Q[(I.scheme || L.scheme || "").toLowerCase()];
      if (M && M.serialize && M.serialize(L, I), L.host && !V.IPV6ADDRESS.test(L.host)) {
        if (I.domainHost || M && M.domainHost)
          try {
            L.host = I.iri ? B.toUnicode(L.host) : B.toASCII(L.host.replace(V.PCT_ENCODED, oe).toLowerCase());
          } catch (de) {
            L.error = L.error || "Host's domain name can not be converted to " + (I.iri ? "Unicode" : "ASCII") + " via punycode: " + de;
          }
      }
      ie(L, V), I.reference !== "suffix" && L.scheme && (T.push(L.scheme), T.push(":"));
      var ee = Ae(L, I);
      if (ee !== void 0 && (I.reference !== "suffix" && T.push("//"), T.push(ee), L.path && L.path.charAt(0) !== "/" && T.push("/")), L.path !== void 0) {
        var ae = L.path;
        !I.absolutePath && (!M || !M.absolutePath) && (ae = Qe(ae)), ee === void 0 && (ae = ae.replace(/^\/\//, "/%2F")), T.push(ae);
      }
      return L.query !== void 0 && (T.push("?"), T.push(L.query)), L.fragment !== void 0 && (T.push("#"), T.push(L.fragment)), T.join("");
    }
    function ze(L, I) {
      var V = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, T = arguments[3], M = {};
      return T || (L = Pe(He(L, V), V), I = Pe(He(I, V), V)), V = V || {}, !V.tolerant && I.scheme ? (M.scheme = I.scheme, M.userinfo = I.userinfo, M.host = I.host, M.port = I.port, M.path = Qe(I.path || ""), M.query = I.query) : (I.userinfo !== void 0 || I.host !== void 0 || I.port !== void 0 ? (M.userinfo = I.userinfo, M.host = I.host, M.port = I.port, M.path = Qe(I.path || ""), M.query = I.query) : (I.path ? (I.path.charAt(0) === "/" ? M.path = Qe(I.path) : ((L.userinfo !== void 0 || L.host !== void 0 || L.port !== void 0) && !L.path ? M.path = "/" + I.path : L.path ? M.path = L.path.slice(0, L.path.lastIndexOf("/") + 1) + I.path : M.path = I.path, M.path = Qe(M.path)), M.query = I.query) : (M.path = L.path, I.query !== void 0 ? M.query = I.query : M.query = L.query), M.userinfo = L.userinfo, M.host = L.host, M.port = L.port), M.scheme = L.scheme), M.fragment = I.fragment, M;
    }
    function le(L, I, V) {
      var T = c({ scheme: "null" }, V);
      return He(ze(Pe(L, T), Pe(I, T), T, !0), T);
    }
    function ye(L, I) {
      return typeof L == "string" ? L = He(Pe(L, I), I) : i(L) === "object" && (L = Pe(He(L, I), I)), L;
    }
    function be(L, I, V) {
      return typeof L == "string" ? L = He(Pe(L, V), V) : i(L) === "object" && (L = He(L, V)), typeof I == "string" ? I = He(Pe(I, V), V) : i(I) === "object" && (I = He(I, V)), L === I;
    }
    function ge(L, I) {
      return L && L.toString().replace(!I || !I.iri ? d.ESCAPE : p.ESCAPE, Y);
    }
    function ue(L, I) {
      return L && L.toString().replace(!I || !I.iri ? d.PCT_ENCODED : p.PCT_ENCODED, oe);
    }
    var Ue = {
      scheme: "http",
      domainHost: !0,
      parse: function(I, V) {
        return I.host || (I.error = I.error || "HTTP URIs must have a host."), I;
      },
      serialize: function(I, V) {
        var T = String(I.scheme).toLowerCase() === "https";
        return (I.port === (T ? 443 : 80) || I.port === "") && (I.port = void 0), I.path || (I.path = "/"), I;
      }
    }, Ie = {
      scheme: "https",
      domainHost: Ue.domainHost,
      parse: Ue.parse,
      serialize: Ue.serialize
    };
    function Ye(L) {
      return typeof L.secure == "boolean" ? L.secure : String(L.scheme).toLowerCase() === "wss";
    }
    var Je = {
      scheme: "ws",
      domainHost: !0,
      parse: function(I, V) {
        var T = I;
        return T.secure = Ye(T), T.resourceName = (T.path || "/") + (T.query ? "?" + T.query : ""), T.path = void 0, T.query = void 0, T;
      },
      serialize: function(I, V) {
        if ((I.port === (Ye(I) ? 443 : 80) || I.port === "") && (I.port = void 0), typeof I.secure == "boolean" && (I.scheme = I.secure ? "wss" : "ws", I.secure = void 0), I.resourceName) {
          var T = I.resourceName.split("?"), M = m(T, 2), ee = M[0], ae = M[1];
          I.path = ee && ee !== "/" ? ee : void 0, I.query = ae, I.resourceName = void 0;
        }
        return I.fragment = void 0, I;
      }
    }, Tt = {
      scheme: "wss",
      domainHost: Je.domainHost,
      parse: Je.parse,
      serialize: Je.serialize
    }, re = {}, se = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]", $e = "[0-9A-Fa-f]", Ne = o(o("%[EFef]" + $e + "%" + $e + $e + "%" + $e + $e) + "|" + o("%[89A-Fa-f]" + $e + "%" + $e + $e) + "|" + o("%" + $e + $e)), et = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]", St = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]", Et = n(St, '[\\"\\\\]'), Yt = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]", kt = new RegExp(se, "g"), Ut = new RegExp(Ne, "g"), wn = new RegExp(n("[^]", et, "[\\.]", '[\\"]', Et), "g"), On = new RegExp(n("[^]", se, Yt), "g"), Tn = On;
    function Rr(L) {
      var I = oe(L);
      return I.match(kt) ? I : L;
    }
    var Wr = {
      scheme: "mailto",
      parse: function(I, V) {
        var T = I, M = T.to = T.path ? T.path.split(",") : [];
        if (T.path = void 0, T.query) {
          for (var ee = !1, ae = {}, de = T.query.split("&"), ve = 0, we = de.length; ve < we; ++ve) {
            var me = de[ve].split("=");
            switch (me[0]) {
              case "to":
                for (var Ce = me[1].split(","), ke = 0, Ee = Ce.length; ke < Ee; ++ke)
                  M.push(Ce[ke]);
                break;
              case "subject":
                T.subject = ue(me[1], V);
                break;
              case "body":
                T.body = ue(me[1], V);
                break;
              default:
                ee = !0, ae[ue(me[0], V)] = ue(me[1], V);
                break;
            }
          }
          ee && (T.headers = ae);
        }
        T.query = void 0;
        for (var Ge = 0, mt = M.length; Ge < mt; ++Ge) {
          var ht = M[Ge].split("@");
          if (ht[0] = ue(ht[0]), V.unicodeSupport)
            ht[1] = ue(ht[1], V).toLowerCase();
          else
            try {
              ht[1] = B.toASCII(ue(ht[1], V).toLowerCase());
            } catch (Mt) {
              T.error = T.error || "Email address's domain name can not be converted to ASCII via punycode: " + Mt;
            }
          M[Ge] = ht.join("@");
        }
        return T;
      },
      serialize: function(I, V) {
        var T = I, M = l(I.to);
        if (M) {
          for (var ee = 0, ae = M.length; ee < ae; ++ee) {
            var de = String(M[ee]), ve = de.lastIndexOf("@"), we = de.slice(0, ve).replace(Ut, Rr).replace(Ut, a).replace(wn, Y), me = de.slice(ve + 1);
            try {
              me = V.iri ? B.toUnicode(me) : B.toASCII(ue(me, V).toLowerCase());
            } catch (Ge) {
              T.error = T.error || "Email address's domain name can not be converted to " + (V.iri ? "Unicode" : "ASCII") + " via punycode: " + Ge;
            }
            M[ee] = we + "@" + me;
          }
          T.path = M.join(",");
        }
        var Ce = I.headers = I.headers || {};
        I.subject && (Ce.subject = I.subject), I.body && (Ce.body = I.body);
        var ke = [];
        for (var Ee in Ce)
          Ce[Ee] !== re[Ee] && ke.push(Ee.replace(Ut, Rr).replace(Ut, a).replace(On, Y) + "=" + Ce[Ee].replace(Ut, Rr).replace(Ut, a).replace(Tn, Y));
        return ke.length && (T.query = ke.join("&")), T;
      }
    }, ui = /^([^\:]+)\:(.*)/, ro = {
      scheme: "urn",
      parse: function(I, V) {
        var T = I.path && I.path.match(ui), M = I;
        if (T) {
          var ee = V.scheme || M.scheme || "urn", ae = T[1].toLowerCase(), de = T[2], ve = ee + ":" + (V.nid || ae), we = Q[ve];
          M.nid = ae, M.nss = de, M.path = void 0, we && (M = we.parse(M, V));
        } else
          M.error = M.error || "URN can not be parsed.";
        return M;
      },
      serialize: function(I, V) {
        var T = V.scheme || I.scheme || "urn", M = I.nid, ee = T + ":" + (V.nid || M), ae = Q[ee];
        ae && (I = ae.serialize(I, V));
        var de = I, ve = I.nss;
        return de.path = (M || V.nid) + ":" + ve, de;
      }
    }, no = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/, oo = {
      scheme: "urn:uuid",
      parse: function(I, V) {
        var T = I;
        return T.uuid = T.nss, T.nss = void 0, !V.tolerant && (!T.uuid || !T.uuid.match(no)) && (T.error = T.error || "UUID is not valid."), T;
      },
      serialize: function(I, V) {
        var T = I;
        return T.nss = (I.uuid || "").toLowerCase(), T;
      }
    };
    Q[Ue.scheme] = Ue, Q[Ie.scheme] = Ie, Q[Je.scheme] = Je, Q[Tt.scheme] = Tt, Q[Wr.scheme] = Wr, Q[ro.scheme] = ro, Q[oo.scheme] = oo, r.SCHEMES = Q, r.pctEncChar = Y, r.pctDecChars = oe, r.parse = Pe, r.removeDotSegments = Qe, r.serialize = He, r.resolveComponents = ze, r.resolve = le, r.normalize = ye, r.equal = be, r.escapeComponent = ge, r.unescapeComponent = ue, Object.defineProperty(r, "__esModule", { value: !0 });
  });
})(du, du.exports);
var m7 = du.exports;
Object.defineProperty(sf, "__esModule", { value: !0 });
const S$ = m7;
S$.code = 'require("ajv/dist/runtime/uri").default';
sf.default = S$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Cr;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Le;
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
  const n = Es, o = xs, i = Gn, a = Qt, l = Le, c = zt, u = _s, d = tt, p = p7, m = sf, f = (D, N) => new RegExp(D, N);
  f.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], h = /* @__PURE__ */ new Set([
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
  ]), g = {
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
  }, S = 200;
  function _(D) {
    var N, W, F, O, R, B, Q, Y, oe, ie, ce, q, pe, te, fe, Pe, Ae, Be, st, je, Me, Qe, He, ze, le;
    const ye = D.strict, be = (N = D.code) === null || N === void 0 ? void 0 : N.optimize, ge = be === !0 || be === void 0 ? 1 : be || 0, ue = (F = (W = D.code) === null || W === void 0 ? void 0 : W.regExp) !== null && F !== void 0 ? F : f, Ue = (O = D.uriResolver) !== null && O !== void 0 ? O : m.default;
    return {
      strictSchema: (B = (R = D.strictSchema) !== null && R !== void 0 ? R : ye) !== null && B !== void 0 ? B : !0,
      strictNumbers: (Y = (Q = D.strictNumbers) !== null && Q !== void 0 ? Q : ye) !== null && Y !== void 0 ? Y : !0,
      strictTypes: (ie = (oe = D.strictTypes) !== null && oe !== void 0 ? oe : ye) !== null && ie !== void 0 ? ie : "log",
      strictTuples: (q = (ce = D.strictTuples) !== null && ce !== void 0 ? ce : ye) !== null && q !== void 0 ? q : "log",
      strictRequired: (te = (pe = D.strictRequired) !== null && pe !== void 0 ? pe : ye) !== null && te !== void 0 ? te : !1,
      code: D.code ? { ...D.code, optimize: ge, regExp: ue } : { optimize: ge, regExp: ue },
      loopRequired: (fe = D.loopRequired) !== null && fe !== void 0 ? fe : S,
      loopEnum: (Pe = D.loopEnum) !== null && Pe !== void 0 ? Pe : S,
      meta: (Ae = D.meta) !== null && Ae !== void 0 ? Ae : !0,
      messages: (Be = D.messages) !== null && Be !== void 0 ? Be : !0,
      inlineRefs: (st = D.inlineRefs) !== null && st !== void 0 ? st : !0,
      schemaId: (je = D.schemaId) !== null && je !== void 0 ? je : "$id",
      addUsedSchema: (Me = D.addUsedSchema) !== null && Me !== void 0 ? Me : !0,
      validateSchema: (Qe = D.validateSchema) !== null && Qe !== void 0 ? Qe : !0,
      validateFormats: (He = D.validateFormats) !== null && He !== void 0 ? He : !0,
      unicodeRegExp: (ze = D.unicodeRegExp) !== null && ze !== void 0 ? ze : !0,
      int32range: (le = D.int32range) !== null && le !== void 0 ? le : !0,
      uriResolver: Ue
    };
  }
  class $ {
    constructor(N = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), N = this.opts = { ...N, ..._(N) };
      const { es5: W, lines: F } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: h, es5: W, lines: F }), this.logger = U(N.logger);
      const O = N.validateFormats;
      N.validateFormats = !1, this.RULES = (0, i.getRules)(), b.call(this, g, N, "NOT SUPPORTED"), b.call(this, v, N, "DEPRECATED", "warn"), this._metaOpts = k.call(this), N.formats && A.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), N.keywords && j.call(this, N.keywords), typeof N.meta == "object" && this.addMetaSchema(N.meta), w.call(this), N.validateFormats = O;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: N, meta: W, schemaId: F } = this.opts;
      let O = p;
      F === "id" && (O = { ...p }, O.id = O.$id, delete O.$id), W && N && this.addMetaSchema(O, O[F], !1);
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
      const O = F(W);
      return "$async" in F || (this.errors = F.errors), O;
    }
    compile(N, W) {
      const F = this._addSchema(N, W);
      return F.validate || this._compileSchemaEnv(F);
    }
    compileAsync(N, W) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: F } = this.opts;
      return O.call(this, N, W);
      async function O(ie, ce) {
        await R.call(this, ie.$schema);
        const q = this._addSchema(ie, ce);
        return q.validate || B.call(this, q);
      }
      async function R(ie) {
        ie && !this.getSchema(ie) && await O.call(this, { $ref: ie }, !0);
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
    addSchema(N, W, F, O = this.opts.validateSchema) {
      if (Array.isArray(N)) {
        for (const B of N)
          this.addSchema(B, void 0, F, O);
        return this;
      }
      let R;
      if (typeof N == "object") {
        const { schemaId: B } = this.opts;
        if (R = N[B], R !== void 0 && typeof R != "string")
          throw new Error(`schema ${B} must be string`);
      }
      return W = (0, c.normalizeId)(W || R), this._checkUnique(W), this.schemas[W] = this._addSchema(N, F, W, O, !0), this;
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
      const O = this.validate(F, N);
      if (!O && W) {
        const R = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(R);
        else
          throw new Error(R);
      }
      return O;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(N) {
      let W;
      for (; typeof (W = x.call(this, N)) == "string"; )
        N = W;
      if (W === void 0) {
        const { schemaId: F } = this.opts, O = new a.SchemaEnv({ schema: {}, schemaId: F });
        if (W = a.resolveSchema.call(this, O, N), !W)
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
      const O = {
        ...W,
        type: (0, u.getJSONTypes)(W.type),
        schemaType: (0, u.getJSONTypes)(W.schemaType)
      };
      return (0, d.eachItem)(F, O.type.length === 0 ? (R) => G.call(this, R, O) : (R) => O.type.forEach((B) => G.call(this, R, O, B))), this;
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
        const O = F.rules.findIndex((R) => R.keyword === N);
        O >= 0 && F.rules.splice(O, 1);
      }
      return this;
    }
    // Add format
    addFormat(N, W) {
      return typeof W == "string" && (W = new RegExp(W)), this.formats[N] = W, this;
    }
    errorsText(N = this.errors, { separator: W = ", ", dataVar: F = "data" } = {}) {
      return !N || N.length === 0 ? "No errors" : N.map((O) => `${F}${O.instancePath} ${O.message}`).reduce((O, R) => O + W + R);
    }
    $dataMetaSchema(N, W) {
      const F = this.RULES.all;
      N = JSON.parse(JSON.stringify(N));
      for (const O of W) {
        const R = O.split("/").slice(1);
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
        const O = N[F];
        (!W || W.test(F)) && (typeof O == "string" ? delete N[F] : O && !O.meta && (this._cache.delete(O.schema), delete N[F]));
      }
    }
    _addSchema(N, W, F, O = this.opts.validateSchema, R = this.opts.addUsedSchema) {
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
      return Y = new a.SchemaEnv({ schema: N, schemaId: Q, meta: W, baseId: F, localRefs: oe }), this._cache.set(Y.schema, Y), R && !F.startsWith("#") && (F && this._checkUnique(F), this.refs[F] = Y), O && this.validateSchema(N, !0), Y;
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
  e.default = $, $.ValidationError = n.default, $.MissingRefError = o.default;
  function b(D, N, W, F = "error") {
    for (const O in D) {
      const R = O;
      R in N && this.logger[F](`${W}: option ${O}. ${D[R]}`);
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
  function j(D) {
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
    for (const N of y)
      delete D[N];
    return D;
  }
  const K = { log() {
  }, warn() {
  }, error() {
  } };
  function U(D) {
    if (D === !1)
      return K;
    if (D === void 0)
      return console;
    if (D.log && D.warn && D.error)
      return D;
    throw new Error("logger must implement log, warn and error methods");
  }
  const H = /^[a-z_$][a-z0-9_$:-]*$/i;
  function z(D, N) {
    const { RULES: W } = this;
    if ((0, d.eachItem)(D, (F) => {
      if (W.keywords[F])
        throw new Error(`Keyword ${F} is already defined`);
      if (!H.test(F))
        throw new Error(`Keyword ${F} has invalid name`);
    }), !!N && N.$data && !("code" in N || "validate" in N))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function G(D, N, W) {
    var F;
    const O = N == null ? void 0 : N.post;
    if (W && O)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: R } = this;
    let B = O ? R.post : R.rules.find(({ type: Y }) => Y === W);
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
    const F = D.rules.findIndex((O) => O.keyword === W);
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
})(X0);
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
const y7 = xs, ny = We, Zt = Le, go = Ur, oy = Qt, Ws = tt, g7 = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: o, schemaEnv: i, validateName: a, opts: l, self: c } = n, { root: u } = i;
    if ((r === "#" || r === "#/") && o === u.baseId)
      return p();
    const d = oy.resolveRef.call(c, u, o, r);
    if (d === void 0)
      throw new y7.default(n.opts.uriResolver, o, r);
    if (d instanceof oy.SchemaEnv)
      return m(d);
    return f(d);
    function p() {
      if (i === u)
        return ca(e, a, i, i.$async);
      const y = t.scopeValue("root", { ref: u });
      return ca(e, (0, Zt._)`${y}.validate`, u, u.$async);
    }
    function m(y) {
      const h = _$(e, y);
      ca(e, h, y, y.$async);
    }
    function f(y) {
      const h = t.scopeValue("schema", l.code.source === !0 ? { ref: y, code: (0, Zt.stringify)(y) } : { ref: y }), g = t.name("valid"), v = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Zt.nil,
        topSchemaRef: h,
        errSchemaPath: r
      }, g);
      e.mergeEvaluated(v), e.ok(g);
    }
  }
};
function _$(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Zt._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Yn.getValidate = _$;
function ca(e, t, r, n) {
  const { gen: o, it: i } = e, { allErrors: a, schemaEnv: l, opts: c } = i, u = c.passContext ? go.default.this : Zt.nil;
  n ? d() : p();
  function d() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const y = o.let("valid");
    o.try(() => {
      o.code((0, Zt._)`await ${(0, ny.callValidateCode)(e, t, u)}`), f(t), a || o.assign(y, !0);
    }, (h) => {
      o.if((0, Zt._)`!(${h} instanceof ${i.ValidationError})`, () => o.throw(h)), m(h), a || o.assign(y, !1);
    }), e.ok(y);
  }
  function p() {
    e.result((0, ny.callValidateCode)(e, t, u), () => f(t), () => m(t));
  }
  function m(y) {
    const h = (0, Zt._)`${y}.errors`;
    o.assign(go.default.vErrors, (0, Zt._)`${go.default.vErrors} === null ? ${h} : ${go.default.vErrors}.concat(${h})`), o.assign(go.default.errors, (0, Zt._)`${go.default.vErrors}.length`);
  }
  function f(y) {
    var h;
    if (!i.opts.unevaluated)
      return;
    const g = (h = r == null ? void 0 : r.validate) === null || h === void 0 ? void 0 : h.evaluated;
    if (i.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (i.props = Ws.mergeEvaluated.props(o, g.props, i.props));
      else {
        const v = o.var("props", (0, Zt._)`${y}.evaluated.props`);
        i.props = Ws.mergeEvaluated.props(o, v, i.props, Zt.Name);
      }
    if (i.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (i.items = Ws.mergeEvaluated.items(o, g.items, i.items));
      else {
        const v = o.var("items", (0, Zt._)`${y}.evaluated.items`);
        i.items = Ws.mergeEvaluated.items(o, v, i.items, Zt.Name);
      }
  }
}
Yn.callRef = ca;
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
const Fa = Le, un = Fa.operators, La = {
  maximum: { okStr: "<=", ok: un.LTE, fail: un.GT },
  minimum: { okStr: ">=", ok: un.GTE, fail: un.LT },
  exclusiveMaximum: { okStr: "<", ok: un.LT, fail: un.GTE },
  exclusiveMinimum: { okStr: ">", ok: un.GT, fail: un.LTE }
}, S7 = {
  message: ({ keyword: e, schemaCode: t }) => (0, Fa.str)`must be ${La[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Fa._)`{comparison: ${La[e].okStr}, limit: ${t}}`
}, _7 = {
  keyword: Object.keys(La),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: S7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Fa._)`${r} ${La[t].fail} ${n} || isNaN(${r})`);
  }
};
df.default = _7;
var ff = {};
Object.defineProperty(ff, "__esModule", { value: !0 });
const zi = Le, E7 = {
  message: ({ schemaCode: e }) => (0, zi.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, zi._)`{multipleOf: ${e}}`
}, x7 = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: E7,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: o } = e, i = o.opts.multipleOfPrecision, a = t.let("res"), l = i ? (0, zi._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${i}` : (0, zi._)`${a} !== parseInt(${a})`;
    e.fail$data((0, zi._)`(${n} === 0 || (${a} = ${r}/${n}, ${l}))`);
  }
};
ff.default = x7;
var pf = {}, mf = {};
Object.defineProperty(mf, "__esModule", { value: !0 });
function E$(e) {
  const t = e.length;
  let r = 0, n = 0, o;
  for (; n < t; )
    r++, o = e.charCodeAt(n++), o >= 55296 && o <= 56319 && n < t && (o = e.charCodeAt(n), (o & 64512) === 56320 && n++);
  return r;
}
mf.default = E$;
E$.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(pf, "__esModule", { value: !0 });
const Ln = Le, w7 = tt, O7 = mf, T7 = {
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
  error: T7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: o } = e, i = t === "maxLength" ? Ln.operators.GT : Ln.operators.LT, a = o.opts.unicode === !1 ? (0, Ln._)`${r}.length` : (0, Ln._)`${(0, w7.useFunc)(e.gen, O7.default)}(${r})`;
    e.fail$data((0, Ln._)`${a} ${i} ${n}`);
  }
};
pf.default = C7;
var hf = {};
Object.defineProperty(hf, "__esModule", { value: !0 });
const P7 = We, Ba = Le, R7 = {
  message: ({ schemaCode: e }) => (0, Ba.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Ba._)`{pattern: ${e}}`
}, I7 = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: R7,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: o, it: i } = e, a = i.opts.unicodeRegExp ? "u" : "", l = r ? (0, Ba._)`(new RegExp(${o}, ${a}))` : (0, P7.usePattern)(e, n);
    e.fail$data((0, Ba._)`!${l}.test(${t})`);
  }
};
hf.default = I7;
var yf = {};
Object.defineProperty(yf, "__esModule", { value: !0 });
const Ui = Le, N7 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ui.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ui._)`{limit: ${e}}`
}, A7 = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: N7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, o = t === "maxProperties" ? Ui.operators.GT : Ui.operators.LT;
    e.fail$data((0, Ui._)`Object.keys(${r}).length ${o} ${n}`);
  }
};
yf.default = A7;
var gf = {};
Object.defineProperty(gf, "__esModule", { value: !0 });
const Pi = We, Wi = Le, j7 = tt, k7 = {
  message: ({ params: { missingProperty: e } }) => (0, Wi.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Wi._)`{missingProperty: ${e}}`
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
      const f = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const h of r)
        if ((f == null ? void 0 : f[h]) === void 0 && !y.has(h)) {
          const g = a.schemaEnv.baseId + a.errSchemaPath, v = `required property "${h}" is not defined at "${g}" (strictRequired)`;
          (0, j7.checkStrictMode)(a, v, a.opts.strictRequired);
        }
    }
    function u() {
      if (c || i)
        e.block$data(Wi.nil, p);
      else
        for (const f of r)
          (0, Pi.checkReportMissingProp)(e, f);
    }
    function d() {
      const f = t.let("missing");
      if (c || i) {
        const y = t.let("valid", !0);
        e.block$data(y, () => m(f, y)), e.ok(y);
      } else
        t.if((0, Pi.checkMissingProp)(e, r, f)), (0, Pi.reportMissingProp)(e, f), t.else();
    }
    function p() {
      t.forOf("prop", n, (f) => {
        e.setParams({ missingProperty: f }), t.if((0, Pi.noPropertyInData)(t, o, f, l.ownProperties), () => e.error());
      });
    }
    function m(f, y) {
      e.setParams({ missingProperty: f }), t.forOf(f, n, () => {
        t.assign(y, (0, Pi.propertyInData)(t, o, f, l.ownProperties)), t.if((0, Wi.not)(y), () => {
          e.error(), t.break();
        });
      }, Wi.nil);
    }
  }
};
gf.default = M7;
var vf = {};
Object.defineProperty(vf, "__esModule", { value: !0 });
const qi = Le, D7 = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, qi.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, qi._)`{limit: ${e}}`
}, F7 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: D7,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, o = t === "maxItems" ? qi.operators.GT : qi.operators.LT;
    e.fail$data((0, qi._)`${r}.length ${o} ${n}`);
  }
};
vf.default = F7;
var bf = {}, ws = {};
Object.defineProperty(ws, "__esModule", { value: !0 });
const x$ = o$;
x$.code = 'require("ajv/dist/runtime/equal").default';
ws.default = x$;
Object.defineProperty(bf, "__esModule", { value: !0 });
const Ic = _s, Bt = Le, L7 = tt, B7 = ws, V7 = {
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
      const y = t.let("i", (0, Bt._)`${r}.length`), h = t.let("j");
      e.setParams({ i: y, j: h }), t.assign(c, !0), t.if((0, Bt._)`${y} > 1`, () => (p() ? m : f)(y, h));
    }
    function p() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function m(y, h) {
      const g = t.name("item"), v = (0, Ic.checkDataTypes)(u, g, l.opts.strictNumbers, Ic.DataType.Wrong), S = t.const("indices", (0, Bt._)`{}`);
      t.for((0, Bt._)`;${y}--;`, () => {
        t.let(g, (0, Bt._)`${r}[${y}]`), t.if(v, (0, Bt._)`continue`), u.length > 1 && t.if((0, Bt._)`typeof ${g} == "string"`, (0, Bt._)`${g} += "_"`), t.if((0, Bt._)`typeof ${S}[${g}] == "number"`, () => {
          t.assign(h, (0, Bt._)`${S}[${g}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Bt._)`${S}[${g}] = ${y}`);
      });
    }
    function f(y, h) {
      const g = (0, L7.useFunc)(t, B7.default), v = t.name("outer");
      t.label(v).for((0, Bt._)`;${y}--;`, () => t.for((0, Bt._)`${h} = ${y}; ${h}--;`, () => t.if((0, Bt._)`${g}(${r}[${y}], ${r}[${h}])`, () => {
        e.error(), t.assign(c, !1).break(v);
      })));
    }
  }
};
bf.default = z7;
var $f = {};
Object.defineProperty($f, "__esModule", { value: !0 });
const fu = Le, U7 = tt, W7 = ws, q7 = {
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
const Ai = Le, H7 = tt, G7 = ws, Y7 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ai._)`{allowedValues: ${e}}`
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
      const f = t.const("vSchema", i);
      d = (0, Ai.or)(...o.map((y, h) => m(f, h)));
    }
    e.pass(d);
    function p() {
      t.assign(d, !1), t.forOf("v", i, (f) => t.if((0, Ai._)`${u()}(${r}, ${f})`, () => t.assign(d, !0).break()));
    }
    function m(f, y) {
      const h = o[y];
      return typeof h == "object" && h !== null ? (0, Ai._)`${u()}(${r}, ${f}[${y}])` : (0, Ai._)`${r} === ${h}`;
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
var _f = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.validateAdditionalItems = void 0;
const Bn = Le, pu = tt, lY = {
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
    w$(e, n);
  }
};
function w$(e, t) {
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
li.validateAdditionalItems = w$;
li.default = cY;
var Ef = {}, ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.validateTuple = void 0;
const iy = Le, ua = tt, uY = We, dY = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return O$(e, "additionalItems", t);
    r.items = !0, !(0, ua.alwaysValidSchema)(r, t) && e.ok((0, uY.validateArray)(e));
  }
};
function O$(e, t, r = e.schema) {
  const { gen: n, parentSchema: o, data: i, keyword: a, it: l } = e;
  d(o), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = ua.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), u = n.const("len", (0, iy._)`${i}.length`);
  r.forEach((p, m) => {
    (0, ua.alwaysValidSchema)(l, p) || (n.if((0, iy._)`${u} > ${m}`, () => e.subschema({
      keyword: a,
      schemaProp: m,
      dataProp: m
    }, c)), e.ok(c));
  });
  function d(p) {
    const { opts: m, errSchemaPath: f } = l, y = r.length, h = y === p.minItems && (y === p.maxItems || p[t] === !1);
    if (m.strictTuples && !h) {
      const g = `"${a}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${f}"`;
      (0, ua.checkStrictMode)(l, g, m.strictTuples);
    }
  }
}
ci.validateTuple = O$;
ci.default = dY;
Object.defineProperty(Ef, "__esModule", { value: !0 });
const fY = ci, pY = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, fY.validateTuple)(e, "items")
};
Ef.default = pY;
var xf = {};
Object.defineProperty(xf, "__esModule", { value: !0 });
const sy = Le, mY = tt, hY = We, yY = li, gY = {
  message: ({ params: { len: e } }) => (0, sy.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, sy._)`{limit: ${e}}`
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
const dr = Le, qs = tt, bY = {
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
      (0, qs.checkStrictMode)(i, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && a > l) {
      (0, qs.checkStrictMode)(i, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, qs.alwaysValidSchema)(i, r)) {
      let h = (0, dr._)`${d} >= ${a}`;
      l !== void 0 && (h = (0, dr._)`${h} && ${d} <= ${l}`), e.pass(h);
      return;
    }
    i.items = !0;
    const p = t.name("valid");
    l === void 0 && a === 1 ? f(p, () => t.if(p, () => t.break())) : a === 0 ? (t.let(p, !0), l !== void 0 && t.if((0, dr._)`${o}.length > 0`, m)) : (t.let(p, !1), m()), e.result(p, () => e.reset());
    function m() {
      const h = t.name("_valid"), g = t.let("count", 0);
      f(h, () => t.if(h, () => y(g)));
    }
    function f(h, g) {
      t.forRange("i", 0, d, (v) => {
        e.subschema({
          keyword: "contains",
          dataProp: v,
          dataPropType: qs.Type.Num,
          compositeRule: !0
        }, h), g();
      });
    }
    function y(h) {
      t.code((0, dr._)`${h}++`), l === void 0 ? t.if((0, dr._)`${h} >= ${a}`, () => t.assign(p, !0).break()) : (t.if((0, dr._)`${h} > ${l}`, () => t.assign(p, !1).break()), a === 1 ? t.assign(p, !0) : t.if((0, dr._)`${h} >= ${a}`, () => t.assign(p, !0)));
    }
  }
};
wf.default = $Y;
var T$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Le, r = tt, n = We;
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
      const m = Array.isArray(c[p]) ? u : d;
      m[p] = c[p];
    }
    return [u, d];
  }
  function a(c, u = c.schema) {
    const { gen: d, data: p, it: m } = c;
    if (Object.keys(u).length === 0)
      return;
    const f = d.let("missing");
    for (const y in u) {
      const h = u[y];
      if (h.length === 0)
        continue;
      const g = (0, n.propertyInData)(d, p, y, m.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: h.length,
        deps: h.join(", ")
      }), m.allErrors ? d.if(g, () => {
        for (const v of h)
          (0, n.checkReportMissingProp)(c, v);
      }) : (d.if((0, t._)`${g} && (${(0, n.checkMissingProp)(c, h, f)})`), (0, n.reportMissingProp)(c, f), d.else());
    }
  }
  e.validatePropertyDeps = a;
  function l(c, u = c.schema) {
    const { gen: d, data: p, keyword: m, it: f } = c, y = d.name("valid");
    for (const h in u)
      (0, r.alwaysValidSchema)(f, u[h]) || (d.if(
        (0, n.propertyInData)(d, p, h, f.opts.ownProperties),
        () => {
          const g = c.subschema({ keyword: m, schemaProp: h }, y);
          c.mergeValidEvaluated(g, y);
        },
        () => d.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  e.validateSchemaDeps = l, e.default = o;
})(T$);
var Of = {};
Object.defineProperty(Of, "__esModule", { value: !0 });
const C$ = Le, SY = tt, _Y = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, C$._)`{propertyName: ${e.propertyName}}`
}, EY = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: _Y,
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
      }, i), t.if((0, C$.not)(i), () => {
        e.error(!0), o.allErrors || t.break();
      });
    }), e.ok(i);
  }
};
Of.default = EY;
var Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
const Ks = We, Sr = Le, xY = Ur, Hs = tt, wY = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Sr._)`{additionalProperty: ${e.additionalProperty}}`
}, OY = {
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
    if (a.props = !0, c.removeAdditional !== "all" && (0, Hs.alwaysValidSchema)(a, r))
      return;
    const u = (0, Ks.allSchemaProperties)(n.properties), d = (0, Ks.allSchemaProperties)(n.patternProperties);
    p(), e.ok((0, Sr._)`${i} === ${xY.default.errors}`);
    function p() {
      t.forIn("key", o, (g) => {
        !u.length && !d.length ? y(g) : t.if(m(g), () => y(g));
      });
    }
    function m(g) {
      let v;
      if (u.length > 8) {
        const S = (0, Hs.schemaRefOrVal)(a, n.properties, "properties");
        v = (0, Ks.isOwnProperty)(t, S, g);
      } else
        u.length ? v = (0, Sr.or)(...u.map((S) => (0, Sr._)`${g} === ${S}`)) : v = Sr.nil;
      return d.length && (v = (0, Sr.or)(v, ...d.map((S) => (0, Sr._)`${(0, Ks.usePattern)(e, S)}.test(${g})`))), (0, Sr.not)(v);
    }
    function f(g) {
      t.code((0, Sr._)`delete ${o}[${g}]`);
    }
    function y(g) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        f(g);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: g }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Hs.alwaysValidSchema)(a, r)) {
        const v = t.name("valid");
        c.removeAdditional === "failing" ? (h(g, v, !1), t.if((0, Sr.not)(v), () => {
          e.reset(), f(g);
        })) : (h(g, v), l || t.if((0, Sr.not)(v), () => t.break()));
      }
    }
    function h(g, v, S) {
      const _ = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: Hs.Type.Str
      };
      S === !1 && Object.assign(_, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(_, v);
    }
  }
};
Hl.default = OY;
var Tf = {};
Object.defineProperty(Tf, "__esModule", { value: !0 });
const TY = Cr, ay = We, Nc = tt, ly = Hl, CY = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: o, it: i } = e;
    i.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ly.default.code(new TY.KeywordCxt(i, ly.default, "additionalProperties"));
    const a = (0, ay.allSchemaProperties)(r);
    for (const p of a)
      i.definedProperties.add(p);
    i.opts.unevaluated && a.length && i.props !== !0 && (i.props = Nc.mergeEvaluated.props(t, (0, Nc.toHash)(a), i.props));
    const l = a.filter((p) => !(0, Nc.alwaysValidSchema)(i, r[p]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const p of l)
      u(p) ? d(p) : (t.if((0, ay.propertyInData)(t, o, p, i.opts.ownProperties)), d(p), i.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(p), e.ok(c);
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
Tf.default = CY;
var Cf = {};
Object.defineProperty(Cf, "__esModule", { value: !0 });
const cy = We, Gs = Le, uy = tt, dy = tt, PY = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: o, it: i } = e, { opts: a } = i, l = (0, cy.allSchemaProperties)(r), c = l.filter((h) => (0, uy.alwaysValidSchema)(i, r[h]));
    if (l.length === 0 || c.length === l.length && (!i.opts.unevaluated || i.props === !0))
      return;
    const u = a.strictSchema && !a.allowMatchingProperties && o.properties, d = t.name("valid");
    i.props !== !0 && !(i.props instanceof Gs.Name) && (i.props = (0, dy.evaluatedPropsToName)(t, i.props));
    const { props: p } = i;
    m();
    function m() {
      for (const h of l)
        u && f(h), i.allErrors ? y(h) : (t.var(d, !0), y(h), t.if(d));
    }
    function f(h) {
      for (const g in u)
        new RegExp(h).test(g) && (0, uy.checkStrictMode)(i, `property ${g} matches pattern ${h} (use allowMatchingProperties)`);
    }
    function y(h) {
      t.forIn("key", n, (g) => {
        t.if((0, Gs._)`${(0, cy.usePattern)(e, h)}.test(${g})`, () => {
          const v = c.includes(h);
          v || e.subschema({
            keyword: "patternProperties",
            schemaProp: h,
            dataProp: g,
            dataPropType: dy.Type.Str
          }, d), i.opts.unevaluated && p !== !0 ? t.assign((0, Gs._)`${p}[${g}]`, !0) : !v && !i.allErrors && t.if((0, Gs.not)(d), () => t.break());
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
const NY = We, AY = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: NY.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Rf.default = AY;
var If = {};
Object.defineProperty(If, "__esModule", { value: !0 });
const da = Le, jY = tt, kY = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, da._)`{passingSchemas: ${e.passing}}`
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
        let m;
        (0, jY.alwaysValidSchema)(o, d) ? t.var(c, !0) : m = e.subschema({
          keyword: "oneOf",
          schemaProp: p,
          compositeRule: !0
        }, c), p > 0 && t.if((0, da._)`${c} && ${a}`).assign(a, !1).assign(l, (0, da._)`[${l}, ${p}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(l, p), m && e.mergeEvaluated(m, da.Name);
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
const Va = Le, P$ = tt, LY = {
  message: ({ params: e }) => (0, Va.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Va._)`{failingKeyword: ${e.ifClause}}`
}, BY = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: LY,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, P$.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const o = fy(n, "then"), i = fy(n, "else");
    if (!o && !i)
      return;
    const a = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), o && i) {
      const d = t.let("ifClause");
      e.setParams({ ifClause: d }), t.if(l, u("then", d), u("else", d));
    } else
      o ? t.if(l, u("then")) : t.if((0, Va.not)(l), u("else"));
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
        const m = e.subschema({ keyword: d }, l);
        t.assign(a, l), e.mergeValidEvaluated(m, a), p ? t.assign(p, (0, Va._)`${d}`) : e.setParams({ ifClause: d });
      };
    }
  }
};
function fy(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, P$.alwaysValidSchema)(e, r);
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
Object.defineProperty(_f, "__esModule", { value: !0 });
const UY = li, WY = Ef, qY = ci, KY = xf, HY = wf, GY = T$, YY = Of, XY = Hl, JY = Tf, ZY = Cf, QY = Pf, eX = Rf, tX = If, rX = Nf, nX = Af, oX = jf;
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
_f.default = iX;
var kf = {}, Mf = {};
Object.defineProperty(Mf, "__esModule", { value: !0 });
const Ct = Le, sX = {
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
    o ? m() : f();
    function m() {
      const y = r.scopeValue("formats", {
        ref: p.formats,
        code: c.code.formats
      }), h = r.const("fDef", (0, Ct._)`${y}[${a}]`), g = r.let("fType"), v = r.let("format");
      r.if((0, Ct._)`typeof ${h} == "object" && !(${h} instanceof RegExp)`, () => r.assign(g, (0, Ct._)`${h}.type || "string"`).assign(v, (0, Ct._)`${h}.validate`), () => r.assign(g, (0, Ct._)`"string"`).assign(v, h)), e.fail$data((0, Ct.or)(S(), _()));
      function S() {
        return c.strictSchema === !1 ? Ct.nil : (0, Ct._)`${a} && !${v}`;
      }
      function _() {
        const $ = d.$async ? (0, Ct._)`(${h}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, Ct._)`${v}(${n})`, b = (0, Ct._)`(typeof ${v} == "function" ? ${$} : ${v}.test(${n}))`;
        return (0, Ct._)`${v} && ${v} !== true && ${g} === ${t} && !${b}`;
      }
    }
    function f() {
      const y = p.formats[i];
      if (!y) {
        S();
        return;
      }
      if (y === !0)
        return;
      const [h, g, v] = _(y);
      h === t && e.pass($());
      function S() {
        if (c.strictSchema === !1) {
          p.logger.warn(b());
          return;
        }
        throw new Error(b());
        function b() {
          return `unknown format "${i}" ignored in schema at path "${u}"`;
        }
      }
      function _(b) {
        const x = b instanceof RegExp ? (0, Ct.regexpCode)(b) : c.code.formats ? (0, Ct._)`${c.code.formats}${(0, Ct.getProperty)(i)}` : void 0, w = r.scopeValue("formats", { key: i, ref: b, code: x });
        return typeof b == "object" && !(b instanceof RegExp) ? [b.type || "string", b.validate, (0, Ct._)`${w}.validate`] : ["string", b, w];
      }
      function $() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!d.$async)
            throw new Error("async format in sync schema");
          return (0, Ct._)`await ${v}(${n})`;
        }
        return typeof g == "function" ? (0, Ct._)`${v}(${n})` : (0, Ct._)`${v}.test(${n})`;
      }
    }
  }
};
Mf.default = aX;
Object.defineProperty(kf, "__esModule", { value: !0 });
const lX = Mf, cX = [lX.default];
kf.default = cX;
var Bo = {};
Object.defineProperty(Bo, "__esModule", { value: !0 });
Bo.contentVocabulary = Bo.metadataVocabulary = void 0;
Bo.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Bo.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(af, "__esModule", { value: !0 });
const uX = lf, dX = uf, fX = _f, pX = kf, py = Bo, mX = [
  uX.default,
  dX.default,
  (0, fX.default)(),
  pX.default,
  py.metadataVocabulary,
  py.contentVocabulary
];
af.default = mX;
var Df = {}, R$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DiscrError = void 0, function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e.DiscrError || (e.DiscrError = {}));
})(R$);
Object.defineProperty(Df, "__esModule", { value: !0 });
const $o = Le, mu = R$, my = Qt, hX = tt, yX = {
  message: ({ params: { discrError: e, tagName: t } }) => e === mu.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, $o._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
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
    const c = t.let("valid", !1), u = t.const("tag", (0, $o._)`${r}${(0, $o.getProperty)(l)}`);
    t.if((0, $o._)`typeof ${u} == "string"`, () => d(), () => e.error(!1, { discrError: mu.DiscrError.Tag, tag: u, tagName: l })), e.ok(c);
    function d() {
      const f = m();
      t.if(!1);
      for (const y in f)
        t.elseIf((0, $o._)`${u} === ${y}`), t.assign(c, p(f[y]));
      t.else(), e.error(!1, { discrError: mu.DiscrError.Mapping, tag: u, tagName: l }), t.endIf();
    }
    function p(f) {
      const y = t.name("valid"), h = e.subschema({ keyword: "oneOf", schemaProp: f }, y);
      return e.mergeEvaluated(h, $o.Name), y;
    }
    function m() {
      var f;
      const y = {}, h = v(o);
      let g = !0;
      for (let $ = 0; $ < a.length; $++) {
        let b = a[$];
        b != null && b.$ref && !(0, hX.schemaHasRulesButRef)(b, i.self.RULES) && (b = my.resolveRef.call(i.self, i.schemaEnv.root, i.baseId, b == null ? void 0 : b.$ref), b instanceof my.SchemaEnv && (b = b.schema));
        const x = (f = b == null ? void 0 : b.properties) === null || f === void 0 ? void 0 : f[l];
        if (typeof x != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        g = g && (h || v(b)), S(x, $);
      }
      if (!g)
        throw new Error(`discriminator: "${l}" must be required`);
      return y;
      function v({ required: $ }) {
        return Array.isArray($) && $.includes(l);
      }
      function S($, b) {
        if ($.const)
          _($.const, b);
        else if ($.enum)
          for (const x of $.enum)
            _(x, b);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function _($, b) {
        if (typeof $ != "string" || $ in y)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        y[$] = b;
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
}, _X = [
  "object",
  "boolean"
], EX = {
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
  type: _X,
  properties: EX,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
  const r = X0, n = af, o = Df, i = xX, a = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(o.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(i, a) : i;
      this.addMetaSchema(y, l, !1), this.refs["http://json-schema.org/schema"] = l;
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
  var d = Le;
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
  var m = xs;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return m.default;
  } });
})(lu, lu.exports);
var I$ = lu.exports;
const wX = /* @__PURE__ */ pt(I$);
var hu = { exports: {} }, N$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(j, k) {
    return { validate: j, compare: k };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(i, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, u),
    "date-time": t(p, m),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: h,
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
    int32: { type: "number", validate: $ },
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
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, m),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(j) {
    return j % 4 === 0 && (j % 100 !== 0 || j % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, o = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function i(j) {
    const k = n.exec(j);
    if (!k)
      return !1;
    const K = +k[1], U = +k[2], H = +k[3];
    return U >= 1 && U <= 12 && H >= 1 && H <= (U === 2 && r(K) ? 29 : o[U]);
  }
  function a(j, k) {
    if (j && k)
      return j > k ? 1 : j < k ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(j, k) {
    const K = l.exec(j);
    if (!K)
      return !1;
    const U = +K[1], H = +K[2], z = +K[3], G = K[5];
    return (U <= 23 && H <= 59 && z <= 59 || U === 23 && H === 59 && z === 60) && (!k || G !== "");
  }
  function u(j, k) {
    if (!(j && k))
      return;
    const K = l.exec(j), U = l.exec(k);
    if (K && U)
      return j = K[1] + K[2] + K[3] + (K[4] || ""), k = U[1] + U[2] + U[3] + (U[4] || ""), j > k ? 1 : j < k ? -1 : 0;
  }
  const d = /t|\s/i;
  function p(j) {
    const k = j.split(d);
    return k.length === 2 && i(k[0]) && c(k[1], !0);
  }
  function m(j, k) {
    if (!(j && k))
      return;
    const [K, U] = j.split(d), [H, z] = k.split(d), G = a(K, H);
    if (G !== void 0)
      return G || u(U, z);
  }
  const f = /\/|:/, y = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function h(j) {
    return f.test(j) && y.test(j);
  }
  const g = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function v(j) {
    return g.lastIndex = 0, g.test(j);
  }
  const S = -(2 ** 31), _ = 2 ** 31 - 1;
  function $(j) {
    return Number.isInteger(j) && j <= _ && j >= S;
  }
  function b(j) {
    return Number.isInteger(j);
  }
  function x() {
    return !0;
  }
  const w = /[^\\]\\Z/;
  function A(j) {
    if (w.test(j))
      return !1;
    try {
      return new RegExp(j), !0;
    } catch {
      return !1;
    }
  }
})(N$);
var A$ = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = I$, r = Le, n = r.operators, o = {
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
      const { gen: c, data: u, schemaCode: d, keyword: p, it: m } = l, { opts: f, self: y } = m;
      if (!f.validateFormats)
        return;
      const h = new t.KeywordCxt(m, y.RULES.all.format.definition, "format");
      h.$data ? g() : v();
      function g() {
        const _ = c.scopeValue("formats", {
          ref: y.formats,
          code: f.code.formats
        }), $ = c.const("fmt", r._`${_}[${h.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${$} != "object"`, r._`${$} instanceof RegExp`, r._`typeof ${$}.compare != "function"`, S($)));
      }
      function v() {
        const _ = h.schema, $ = y.formats[_];
        if (!$ || $ === !0)
          return;
        if (typeof $ != "object" || $ instanceof RegExp || typeof $.compare != "function")
          throw new Error(`"${p}": format "${_}" does not define "compare" function`);
        const b = c.scopeValue("formats", {
          key: _,
          ref: $,
          code: f.code.formats ? r._`${f.code.formats}${r.getProperty(_)}` : void 0
        });
        l.fail$data(S(b));
      }
      function S(_) {
        return r._`${_}.compare(${u}, ${d}) ${o[p].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = a;
})(A$);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = N$, n = A$, o = Le, i = new o.Name("fullFormats"), a = new o.Name("fastFormats"), l = (u, d = { keywords: !0 }) => {
    if (Array.isArray(d))
      return c(u, d, r.fullFormats, i), u;
    const [p, m] = d.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, i], f = d.formats || r.formatNames;
    return c(u, f, p, m), d.keywords && n.default(u), u;
  };
  l.get = (u, d = "full") => {
    const m = (d === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!m)
      throw new Error(`Unknown format "${u}"`);
    return m;
  };
  function c(u, d, p, m) {
    var f, y;
    (f = (y = u.opts.code).formats) !== null && f !== void 0 || (y.formats = o._`require("ajv-formats/dist/formats").${m}`);
    for (const h of d)
      u.addFormat(h, p[h]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(hu, hu.exports);
var OX = hu.exports;
const hy = /* @__PURE__ */ pt(OX), TX = {
  allErrors: !0,
  multipleOfPrecision: 8,
  strict: !1,
  verbose: !0
}, CX = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/, PX = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
function RX(e, t, r = {}, n, o = wX) {
  const i = new o({ ...TX, ...r });
  return n ? hy(i, n) : n !== !1 && hy(i), i.addFormat("data-url", PX), i.addFormat("color", CX), i.addKeyword(Wo), i.addKeyword(Fu), Array.isArray(e) && i.addMetaSchema(e), wr(t) && Object.keys(t).forEach((a) => {
    i.addFormat(a, t[a]);
  }), i;
}
function IX(e = [], t) {
  return e.map((r) => {
    const { instancePath: n, keyword: o, params: i, schemaPath: a, parentSchema: l, ...c } = r;
    let { message: u = "" } = c, d = n.replace(/\//g, "."), p = `${d} ${u}`.trim();
    if ("missingProperty" in i) {
      d = d ? `${d}.${i.missingProperty}` : i.missingProperty;
      const m = i.missingProperty, f = rt(Oe(t, `${d.replace(/^\./, "")}`)).title;
      if (f)
        u = u.replace(m, f);
      else {
        const y = Oe(l, [Ot, m, "title"]);
        y && (u = u.replace(m, y));
      }
      p = u;
    } else {
      const m = rt(Oe(t, `${d.replace(/^\./, "")}`)).title;
      if (m)
        p = `'${m}' ${u}`.trim();
      else {
        const f = l == null ? void 0 : l.title;
        f && (p = `'${f}' ${u}`.trim());
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
  let u = c4(c);
  if (l && (u = {
    ...u,
    $schema: {
      __errors: [l.message]
    }
  }), typeof o != "function")
    return { errors: c, errorSchema: u };
  const d = ub(e, n, r, n, !0), p = o(d, Kc(d), a), m = bb(p);
  return ia({ errors: c, errorSchema: u }, m);
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
    return rs(t, r);
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
    const a = (o = n[pn]) !== null && o !== void 0 ? o : Eg;
    try {
      this.ajv.addSchema(n, a);
      const l = Cd(t), c = (i = l[pn]) !== null && i !== void 0 ? i : GU(l);
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
    registry: m,
    options: f,
    uiSchema: y
  } = e;
  qe("DescriptionFieldTemplate", m, f);
  const h = To(t), g = ($, b) => u(b), v = ({ target: { value: $ } }) => d(r, $), S = ({ target: { value: $ } }) => p(r, $), _ = f.description ?? t.description;
  return /* @__PURE__ */ E.jsxs(E.Fragment, { children: [
    /* @__PURE__ */ E.jsx(
      Ul,
      {
        control: /* @__PURE__ */ E.jsx(
          Jd,
          {
            id: r,
            name: r,
            checked: typeof n > "u" ? !1 : !!n,
            required: h,
            disabled: o || i,
            autoFocus: c,
            onChange: g,
            onBlur: v,
            onFocus: S,
            "aria-describedby": or(r)
          }
        ),
        label: En(a, l, !1)
      }
    ),
    !l && !!_ && /* @__PURE__ */ E.jsx(Or, { style: { fontSize: "14px", color: "rgb(102, 102, 102)" }, children: _ })
  ] });
}
const DX = {
  "ui:submitButtonOptions": {
    submitText: "Apply"
  }
};
function FX({ initFormData: e, schema: t, onSubmit: r }) {
  const [n, o] = Vo();
  za(() => {
    o(e);
  }, [e]);
  function i(l) {
    o(l.formData);
  }
  function a(l) {
    r(l.formData);
  }
  return /* @__PURE__ */ E.jsx(
    j8,
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
  return /* @__PURE__ */ E.jsxs(Vr, { sx: { flexGrow: 1 }, children: [
    /* @__PURE__ */ E.jsx(Vr, { sx: { borderBottom: 1, borderColor: "divider" }, children: /* @__PURE__ */ E.jsx(
      Aw,
      {
        value: n,
        onChange: (i, a) => {
          o(a);
        },
        variant: "scrollable",
        scrollButtons: "auto",
        children: e.map((i, a) => /* @__PURE__ */ gy(
          Lw,
          {
            label: i.title,
            ...Bw(a),
            key: "schema_tab_key_" + Ri(i.title)
          }
        ))
      }
    ) }),
    e.map((i, a) => /* @__PURE__ */ E.jsx(Sg, { value: n, index: a, children: /* @__PURE__ */ E.jsx(
      FX,
      {
        initFormData: t[Ri(i.title)],
        schema: i,
        onSubmit: (l) => {
          r(Ri(i.title), l);
        }
      }
    ) }, "schema_key_" + Ri(i.title)))
  ] });
}
export {
  zX as ConfigForms,
  VX as useConfig
};
