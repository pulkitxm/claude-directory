(function () {
	const i = document.createElement("link").relList;
	if (i && i.supports && i.supports("modulepreload")) return;
	for (const u of document.querySelectorAll('link[rel="modulepreload"]')) r(u);
	new MutationObserver((u) => {
		for (const h of u)
			if (h.type === "childList")
				for (const d of h.addedNodes)
					d.tagName === "LINK" && d.rel === "modulepreload" && r(d);
	}).observe(document, { childList: !0, subtree: !0 });
	function s(u) {
		const h = {};
		return (
			u.integrity && (h.integrity = u.integrity),
			u.referrerPolicy && (h.referrerPolicy = u.referrerPolicy),
			u.crossOrigin === "use-credentials"
				? (h.credentials = "include")
				: u.crossOrigin === "anonymous"
					? (h.credentials = "omit")
					: (h.credentials = "same-origin"),
			h
		);
	}
	function r(u) {
		if (u.ep) return;
		u.ep = !0;
		const h = s(u);
		fetch(u.href, h);
	}
})();
var Vc = { exports: {} },
	Zl = {};
var A0;
function yx() {
	if (A0) return Zl;
	A0 = 1;
	var n = Symbol.for("react.transitional.element"),
		i = Symbol.for("react.fragment");
	function s(r, u, h) {
		var d = null;
		if (
			(h !== void 0 && (d = "" + h),
			u.key !== void 0 && (d = "" + u.key),
			"key" in u)
		) {
			h = {};
			for (var g in u) g !== "key" && (h[g] = u[g]);
		} else h = u;
		return (
			(u = h.ref),
			{ $$typeof: n, type: r, key: d, ref: u !== void 0 ? u : null, props: h }
		);
	}
	return (Zl.Fragment = i), (Zl.jsx = s), (Zl.jsxs = s), Zl;
}
var E0;
function vx() {
	return E0 || ((E0 = 1), (Vc.exports = yx())), Vc.exports;
}
var f = vx(),
	Bc = { exports: {} },
	fe = {};
var M0;
function bx() {
	if (M0) return fe;
	M0 = 1;
	var n = Symbol.for("react.transitional.element"),
		i = Symbol.for("react.portal"),
		s = Symbol.for("react.fragment"),
		r = Symbol.for("react.strict_mode"),
		u = Symbol.for("react.profiler"),
		h = Symbol.for("react.consumer"),
		d = Symbol.for("react.context"),
		g = Symbol.for("react.forward_ref"),
		p = Symbol.for("react.suspense"),
		x = Symbol.for("react.memo"),
		y = Symbol.for("react.lazy"),
		v = Symbol.for("react.activity"),
		w = Symbol.iterator;
	function A(T) {
		return T === null || typeof T != "object"
			? null
			: ((T = (w && T[w]) || T["@@iterator"]),
				typeof T == "function" ? T : null);
	}
	var M = {
			isMounted: function () {
				return !1;
			},
			enqueueForceUpdate: function () {},
			enqueueReplaceState: function () {},
			enqueueSetState: function () {},
		},
		z = Object.assign,
		N = {};
	function V(T, Y, F) {
		(this.props = T),
			(this.context = Y),
			(this.refs = N),
			(this.updater = F || M);
	}
	(V.prototype.isReactComponent = {}),
		(V.prototype.setState = function (T, Y) {
			if (typeof T != "object" && typeof T != "function" && T != null)
				throw Error(
					"takes an object of state variables to update or a function which returns an object of state variables.",
				);
			this.updater.enqueueSetState(this, T, Y, "setState");
		}),
		(V.prototype.forceUpdate = function (T) {
			this.updater.enqueueForceUpdate(this, T, "forceUpdate");
		});
	function q() {}
	q.prototype = V.prototype;
	function k(T, Y, F) {
		(this.props = T),
			(this.context = Y),
			(this.refs = N),
			(this.updater = F || M);
	}
	var K = (k.prototype = new q());
	(K.constructor = k), z(K, V.prototype), (K.isPureReactComponent = !0);
	var X = Array.isArray;
	function ie() {}
	var J = { H: null, A: null, T: null, S: null },
		H = Object.prototype.hasOwnProperty;
	function ne(T, Y, F) {
		var W = F.ref;
		return {
			$$typeof: n,
			type: T,
			key: Y,
			ref: W !== void 0 ? W : null,
			props: F,
		};
	}
	function Ce(T, Y) {
		return ne(T.type, Y, T.props);
	}
	function Be(T) {
		return typeof T == "object" && T !== null && T.$$typeof === n;
	}
	function Oe(T) {
		var Y = { "=": "=0", ":": "=2" };
		return (
			"$" +
			T.replace(/[=:]/g, function (F) {
				return Y[F];
			})
		);
	}
	var ut = /\/+/g;
	function et(T, Y) {
		return typeof T == "object" && T !== null && T.key != null
			? Oe("" + T.key)
			: Y.toString(36);
	}
	function Me(T) {
		switch (T.status) {
			case "fulfilled":
				return T.value;
			case "rejected":
				throw T.reason;
			default:
				switch (
					(typeof T.status == "string"
						? T.then(ie, ie)
						: ((T.status = "pending"),
							T.then(
								function (Y) {
									T.status === "pending" &&
										((T.status = "fulfilled"), (T.value = Y));
								},
								function (Y) {
									T.status === "pending" &&
										((T.status = "rejected"), (T.reason = Y));
								},
							)),
					T.status)
				) {
					case "fulfilled":
						return T.value;
					case "rejected":
						throw T.reason;
				}
		}
		throw T;
	}
	function B(T, Y, F, W, se) {
		var oe = typeof T;
		(oe === "undefined" || oe === "boolean") && (T = null);
		var we = !1;
		if (T === null) we = !0;
		else
			switch (oe) {
				case "bigint":
				case "string":
				case "number":
					we = !0;
					break;
				case "object":
					switch (T.$$typeof) {
						case n:
						case i:
							we = !0;
							break;
						case y:
							return (we = T._init), B(we(T._payload), Y, F, W, se);
					}
			}
		if (we)
			return (
				(se = se(T)),
				(we = W === "" ? "." + et(T, 0) : W),
				X(se)
					? ((F = ""),
						we != null && (F = we.replace(ut, "$&/") + "/"),
						B(se, Y, F, "", function (Zn) {
							return Zn;
						}))
					: se != null &&
						(Be(se) &&
							(se = Ce(
								se,
								F +
									(se.key == null || (T && T.key === se.key)
										? ""
										: ("" + se.key).replace(ut, "$&/") + "/") +
									we,
							)),
						Y.push(se)),
				1
			);
		we = 0;
		var lt = W === "" ? "." : W + ":";
		if (X(T))
			for (var pe = 0; pe < T.length; pe++)
				(W = T[pe]), (oe = lt + et(W, pe)), (we += B(W, Y, F, oe, se));
		else if (((pe = A(T)), typeof pe == "function"))
			for (T = pe.call(T), pe = 0; !(W = T.next()).done; )
				(W = W.value), (oe = lt + et(W, pe++)), (we += B(W, Y, F, oe, se));
		else if (oe === "object") {
			if (typeof T.then == "function") return B(Me(T), Y, F, W, se);
			throw (
				((Y = String(T)),
				Error(
					"Objects are not valid as a React child (found: " +
						(Y === "[object Object]"
							? "object with keys {" + Object.keys(T).join(", ") + "}"
							: Y) +
						"). If you meant to render a collection of children, use an array instead.",
				))
			);
		}
		return we;
	}
	function Z(T, Y, F) {
		if (T == null) return T;
		var W = [],
			se = 0;
		return (
			B(T, W, "", "", function (oe) {
				return Y.call(F, oe, se++);
			}),
			W
		);
	}
	function $(T) {
		if (T._status === -1) {
			var Y = T._result;
			(Y = Y()),
				Y.then(
					function (F) {
						(T._status === 0 || T._status === -1) &&
							((T._status = 1), (T._result = F));
					},
					function (F) {
						(T._status === 0 || T._status === -1) &&
							((T._status = 2), (T._result = F));
					},
				),
				T._status === -1 && ((T._status = 0), (T._result = Y));
		}
		if (T._status === 1) return T._result.default;
		throw T._result;
	}
	var me =
			typeof reportError == "function"
				? reportError
				: function (T) {
						if (
							typeof window == "object" &&
							typeof window.ErrorEvent == "function"
						) {
							var Y = new window.ErrorEvent("error", {
								bubbles: !0,
								cancelable: !0,
								message:
									typeof T == "object" &&
									T !== null &&
									typeof T.message == "string"
										? String(T.message)
										: String(T),
								error: T,
							});
							if (!window.dispatchEvent(Y)) return;
						} else if (
							typeof process == "object" &&
							typeof process.emit == "function"
						) {
							process.emit("uncaughtException", T);
							return;
						}
						console.error(T);
					},
		Q = {
			map: Z,
			forEach: function (T, Y, F) {
				Z(
					T,
					function () {
						Y.apply(this, arguments);
					},
					F,
				);
			},
			count: function (T) {
				var Y = 0;
				return (
					Z(T, function () {
						Y++;
					}),
					Y
				);
			},
			toArray: function (T) {
				return (
					Z(T, function (Y) {
						return Y;
					}) || []
				);
			},
			only: function (T) {
				if (!Be(T))
					throw Error(
						"React.Children.only expected to receive a single React element child.",
					);
				return T;
			},
		};
	return (
		(fe.Activity = v),
		(fe.Children = Q),
		(fe.Component = V),
		(fe.Fragment = s),
		(fe.Profiler = u),
		(fe.PureComponent = k),
		(fe.StrictMode = r),
		(fe.Suspense = p),
		(fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
		(fe.__COMPILER_RUNTIME = {
			__proto__: null,
			c: function (T) {
				return J.H.useMemoCache(T);
			},
		}),
		(fe.cache = function (T) {
			return function () {
				return T.apply(null, arguments);
			};
		}),
		(fe.cacheSignal = function () {
			return null;
		}),
		(fe.cloneElement = function (T, Y, F) {
			if (T == null)
				throw Error(
					"The argument must be a React element, but you passed " + T + ".",
				);
			var W = z({}, T.props),
				se = T.key;
			if (Y != null)
				for (oe in (Y.key !== void 0 && (se = "" + Y.key), Y))
					!H.call(Y, oe) ||
						oe === "key" ||
						oe === "__self" ||
						oe === "__source" ||
						(oe === "ref" && Y.ref === void 0) ||
						(W[oe] = Y[oe]);
			var oe = arguments.length - 2;
			if (oe === 1) W.children = F;
			else if (1 < oe) {
				for (var we = Array(oe), lt = 0; lt < oe; lt++)
					we[lt] = arguments[lt + 2];
				W.children = we;
			}
			return ne(T.type, se, W);
		}),
		(fe.createContext = function (T) {
			return (
				(T = {
					$$typeof: d,
					_currentValue: T,
					_currentValue2: T,
					_threadCount: 0,
					Provider: null,
					Consumer: null,
				}),
				(T.Provider = T),
				(T.Consumer = { $$typeof: h, _context: T }),
				T
			);
		}),
		(fe.createElement = function (T, Y, F) {
			var W,
				se = {},
				oe = null;
			if (Y != null)
				for (W in (Y.key !== void 0 && (oe = "" + Y.key), Y))
					H.call(Y, W) &&
						W !== "key" &&
						W !== "__self" &&
						W !== "__source" &&
						(se[W] = Y[W]);
			var we = arguments.length - 2;
			if (we === 1) se.children = F;
			else if (1 < we) {
				for (var lt = Array(we), pe = 0; pe < we; pe++)
					lt[pe] = arguments[pe + 2];
				se.children = lt;
			}
			if (T && T.defaultProps)
				for (W in ((we = T.defaultProps), we))
					se[W] === void 0 && (se[W] = we[W]);
			return ne(T, oe, se);
		}),
		(fe.createRef = function () {
			return { current: null };
		}),
		(fe.forwardRef = function (T) {
			return { $$typeof: g, render: T };
		}),
		(fe.isValidElement = Be),
		(fe.lazy = function (T) {
			return { $$typeof: y, _payload: { _status: -1, _result: T }, _init: $ };
		}),
		(fe.memo = function (T, Y) {
			return { $$typeof: x, type: T, compare: Y === void 0 ? null : Y };
		}),
		(fe.startTransition = function (T) {
			var Y = J.T,
				F = {};
			J.T = F;
			try {
				var W = T(),
					se = J.S;
				se !== null && se(F, W),
					typeof W == "object" &&
						W !== null &&
						typeof W.then == "function" &&
						W.then(ie, me);
			} catch (oe) {
				me(oe);
			} finally {
				Y !== null && F.types !== null && (Y.types = F.types), (J.T = Y);
			}
		}),
		(fe.unstable_useCacheRefresh = function () {
			return J.H.useCacheRefresh();
		}),
		(fe.use = function (T) {
			return J.H.use(T);
		}),
		(fe.useActionState = function (T, Y, F) {
			return J.H.useActionState(T, Y, F);
		}),
		(fe.useCallback = function (T, Y) {
			return J.H.useCallback(T, Y);
		}),
		(fe.useContext = function (T) {
			return J.H.useContext(T);
		}),
		(fe.useDebugValue = function () {}),
		(fe.useDeferredValue = function (T, Y) {
			return J.H.useDeferredValue(T, Y);
		}),
		(fe.useEffect = function (T, Y) {
			return J.H.useEffect(T, Y);
		}),
		(fe.useEffectEvent = function (T) {
			return J.H.useEffectEvent(T);
		}),
		(fe.useId = function () {
			return J.H.useId();
		}),
		(fe.useImperativeHandle = function (T, Y, F) {
			return J.H.useImperativeHandle(T, Y, F);
		}),
		(fe.useInsertionEffect = function (T, Y) {
			return J.H.useInsertionEffect(T, Y);
		}),
		(fe.useLayoutEffect = function (T, Y) {
			return J.H.useLayoutEffect(T, Y);
		}),
		(fe.useMemo = function (T, Y) {
			return J.H.useMemo(T, Y);
		}),
		(fe.useOptimistic = function (T, Y) {
			return J.H.useOptimistic(T, Y);
		}),
		(fe.useReducer = function (T, Y, F) {
			return J.H.useReducer(T, Y, F);
		}),
		(fe.useRef = function (T) {
			return J.H.useRef(T);
		}),
		(fe.useState = function (T) {
			return J.H.useState(T);
		}),
		(fe.useSyncExternalStore = function (T, Y, F) {
			return J.H.useSyncExternalStore(T, Y, F);
		}),
		(fe.useTransition = function () {
			return J.H.useTransition();
		}),
		(fe.version = "19.2.4"),
		fe
	);
}
var N0;
function kf() {
	return N0 || ((N0 = 1), (Bc.exports = bx())), Bc.exports;
}
var C = kf(),
	_c = { exports: {} },
	Xl = {},
	kc = { exports: {} },
	Hc = {};
var R0;
function wx() {
	return (
		R0 ||
			((R0 = 1),
			(function (n) {
				function i(B, Z) {
					var $ = B.length;
					B.push(Z);
					e: for (; 0 < $; ) {
						var me = ($ - 1) >>> 1,
							Q = B[me];
						if (0 < u(Q, Z)) (B[me] = Z), (B[$] = Q), ($ = me);
						else break e;
					}
				}
				function s(B) {
					return B.length === 0 ? null : B[0];
				}
				function r(B) {
					if (B.length === 0) return null;
					var Z = B[0],
						$ = B.pop();
					if ($ !== Z) {
						B[0] = $;
						e: for (var me = 0, Q = B.length, T = Q >>> 1; me < T; ) {
							var Y = 2 * (me + 1) - 1,
								F = B[Y],
								W = Y + 1,
								se = B[W];
							if (0 > u(F, $))
								W < Q && 0 > u(se, F)
									? ((B[me] = se), (B[W] = $), (me = W))
									: ((B[me] = F), (B[Y] = $), (me = Y));
							else if (W < Q && 0 > u(se, $))
								(B[me] = se), (B[W] = $), (me = W);
							else break e;
						}
					}
					return Z;
				}
				function u(B, Z) {
					var $ = B.sortIndex - Z.sortIndex;
					return $ !== 0 ? $ : B.id - Z.id;
				}
				if (
					((n.unstable_now = void 0),
					typeof performance == "object" &&
						typeof performance.now == "function")
				) {
					var h = performance;
					n.unstable_now = function () {
						return h.now();
					};
				} else {
					var d = Date,
						g = d.now();
					n.unstable_now = function () {
						return d.now() - g;
					};
				}
				var p = [],
					x = [],
					y = 1,
					v = null,
					w = 3,
					A = !1,
					M = !1,
					z = !1,
					N = !1,
					V = typeof setTimeout == "function" ? setTimeout : null,
					q = typeof clearTimeout == "function" ? clearTimeout : null,
					k = typeof setImmediate < "u" ? setImmediate : null;
				function K(B) {
					for (var Z = s(x); Z !== null; ) {
						if (Z.callback === null) r(x);
						else if (Z.startTime <= B)
							r(x), (Z.sortIndex = Z.expirationTime), i(p, Z);
						else break;
						Z = s(x);
					}
				}
				function X(B) {
					if (((z = !1), K(B), !M))
						if (s(p) !== null) (M = !0), ie || ((ie = !0), Oe());
						else {
							var Z = s(x);
							Z !== null && Me(X, Z.startTime - B);
						}
				}
				var ie = !1,
					J = -1,
					H = 5,
					ne = -1;
				function Ce() {
					return N ? !0 : !(n.unstable_now() - ne < H);
				}
				function Be() {
					if (((N = !1), ie)) {
						var B = n.unstable_now();
						ne = B;
						var Z = !0;
						try {
							e: {
								(M = !1), z && ((z = !1), q(J), (J = -1)), (A = !0);
								var $ = w;
								try {
									t: {
										for (
											K(B), v = s(p);
											v !== null && !(v.expirationTime > B && Ce());
										) {
											var me = v.callback;
											if (typeof me == "function") {
												(v.callback = null), (w = v.priorityLevel);
												var Q = me(v.expirationTime <= B);
												if (((B = n.unstable_now()), typeof Q == "function")) {
													(v.callback = Q), K(B), (Z = !0);
													break t;
												}
												v === s(p) && r(p), K(B);
											} else r(p);
											v = s(p);
										}
										if (v !== null) Z = !0;
										else {
											var T = s(x);
											T !== null && Me(X, T.startTime - B), (Z = !1);
										}
									}
									break e;
								} finally {
									(v = null), (w = $), (A = !1);
								}
								Z = void 0;
							}
						} finally {
							Z ? Oe() : (ie = !1);
						}
					}
				}
				var Oe;
				if (typeof k == "function")
					Oe = function () {
						k(Be);
					};
				else if (typeof MessageChannel < "u") {
					var ut = new MessageChannel(),
						et = ut.port2;
					(ut.port1.onmessage = Be),
						(Oe = function () {
							et.postMessage(null);
						});
				} else
					Oe = function () {
						V(Be, 0);
					};
				function Me(B, Z) {
					J = V(function () {
						B(n.unstable_now());
					}, Z);
				}
				(n.unstable_IdlePriority = 5),
					(n.unstable_ImmediatePriority = 1),
					(n.unstable_LowPriority = 4),
					(n.unstable_NormalPriority = 3),
					(n.unstable_Profiling = null),
					(n.unstable_UserBlockingPriority = 2),
					(n.unstable_cancelCallback = function (B) {
						B.callback = null;
					}),
					(n.unstable_forceFrameRate = function (B) {
						0 > B || 125 < B
							? console.error(
									"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
								)
							: (H = 0 < B ? Math.floor(1e3 / B) : 5);
					}),
					(n.unstable_getCurrentPriorityLevel = function () {
						return w;
					}),
					(n.unstable_next = function (B) {
						switch (w) {
							case 1:
							case 2:
							case 3:
								var Z = 3;
								break;
							default:
								Z = w;
						}
						var $ = w;
						w = Z;
						try {
							return B();
						} finally {
							w = $;
						}
					}),
					(n.unstable_requestPaint = function () {
						N = !0;
					}),
					(n.unstable_runWithPriority = function (B, Z) {
						switch (B) {
							case 1:
							case 2:
							case 3:
							case 4:
							case 5:
								break;
							default:
								B = 3;
						}
						var $ = w;
						w = B;
						try {
							return Z();
						} finally {
							w = $;
						}
					}),
					(n.unstable_scheduleCallback = function (B, Z, $) {
						var me = n.unstable_now();
						switch (
							(typeof $ == "object" && $ !== null
								? (($ = $.delay),
									($ = typeof $ == "number" && 0 < $ ? me + $ : me))
								: ($ = me),
							B)
						) {
							case 1:
								var Q = -1;
								break;
							case 2:
								Q = 250;
								break;
							case 5:
								Q = 1073741823;
								break;
							case 4:
								Q = 1e4;
								break;
							default:
								Q = 5e3;
						}
						return (
							(Q = $ + Q),
							(B = {
								id: y++,
								callback: Z,
								priorityLevel: B,
								startTime: $,
								expirationTime: Q,
								sortIndex: -1,
							}),
							$ > me
								? ((B.sortIndex = $),
									i(x, B),
									s(p) === null &&
										B === s(x) &&
										(z ? (q(J), (J = -1)) : (z = !0), Me(X, $ - me)))
								: ((B.sortIndex = Q),
									i(p, B),
									M || A || ((M = !0), ie || ((ie = !0), Oe()))),
							B
						);
					}),
					(n.unstable_shouldYield = Ce),
					(n.unstable_wrapCallback = function (B) {
						var Z = w;
						return function () {
							var $ = w;
							w = Z;
							try {
								return B.apply(this, arguments);
							} finally {
								w = $;
							}
						};
					});
			})(Hc)),
		Hc
	);
}
var D0;
function Sx() {
	return D0 || ((D0 = 1), (kc.exports = wx())), kc.exports;
}
var Uc = { exports: {} },
	gt = {};
var L0;
function Cx() {
	if (L0) return gt;
	L0 = 1;
	var n = kf();
	function i(p) {
		var x = "https://react.dev/errors/" + p;
		if (1 < arguments.length) {
			x += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var y = 2; y < arguments.length; y++)
				x += "&args[]=" + encodeURIComponent(arguments[y]);
		}
		return (
			"Minified React error #" +
			p +
			"; visit " +
			x +
			" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
		);
	}
	function s() {}
	var r = {
			d: {
				f: s,
				r: function () {
					throw Error(i(522));
				},
				D: s,
				C: s,
				L: s,
				m: s,
				X: s,
				S: s,
				M: s,
			},
			p: 0,
			findDOMNode: null,
		},
		u = Symbol.for("react.portal");
	function h(p, x, y) {
		var v =
			3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: u,
			key: v == null ? null : "" + v,
			children: p,
			containerInfo: x,
			implementation: y,
		};
	}
	var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function g(p, x) {
		if (p === "font") return "";
		if (typeof x == "string") return x === "use-credentials" ? x : "";
	}
	return (
		(gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
		(gt.createPortal = function (p, x) {
			var y =
				2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!x || (x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11))
				throw Error(i(299));
			return h(p, x, null, y);
		}),
		(gt.flushSync = function (p) {
			var x = d.T,
				y = r.p;
			try {
				if (((d.T = null), (r.p = 2), p)) return p();
			} finally {
				(d.T = x), (r.p = y), r.d.f();
			}
		}),
		(gt.preconnect = function (p, x) {
			typeof p == "string" &&
				(x
					? ((x = x.crossOrigin),
						(x =
							typeof x == "string"
								? x === "use-credentials"
									? x
									: ""
								: void 0))
					: (x = null),
				r.d.C(p, x));
		}),
		(gt.prefetchDNS = function (p) {
			typeof p == "string" && r.d.D(p);
		}),
		(gt.preinit = function (p, x) {
			if (typeof p == "string" && x && typeof x.as == "string") {
				var y = x.as,
					v = g(y, x.crossOrigin),
					w = typeof x.integrity == "string" ? x.integrity : void 0,
					A = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
				y === "style"
					? r.d.S(p, typeof x.precedence == "string" ? x.precedence : void 0, {
							crossOrigin: v,
							integrity: w,
							fetchPriority: A,
						})
					: y === "script" &&
						r.d.X(p, {
							crossOrigin: v,
							integrity: w,
							fetchPriority: A,
							nonce: typeof x.nonce == "string" ? x.nonce : void 0,
						});
			}
		}),
		(gt.preinitModule = function (p, x) {
			if (typeof p == "string")
				if (typeof x == "object" && x !== null) {
					if (x.as == null || x.as === "script") {
						var y = g(x.as, x.crossOrigin);
						r.d.M(p, {
							crossOrigin: y,
							integrity: typeof x.integrity == "string" ? x.integrity : void 0,
							nonce: typeof x.nonce == "string" ? x.nonce : void 0,
						});
					}
				} else x == null && r.d.M(p);
		}),
		(gt.preload = function (p, x) {
			if (
				typeof p == "string" &&
				typeof x == "object" &&
				x !== null &&
				typeof x.as == "string"
			) {
				var y = x.as,
					v = g(y, x.crossOrigin);
				r.d.L(p, y, {
					crossOrigin: v,
					integrity: typeof x.integrity == "string" ? x.integrity : void 0,
					nonce: typeof x.nonce == "string" ? x.nonce : void 0,
					type: typeof x.type == "string" ? x.type : void 0,
					fetchPriority:
						typeof x.fetchPriority == "string" ? x.fetchPriority : void 0,
					referrerPolicy:
						typeof x.referrerPolicy == "string" ? x.referrerPolicy : void 0,
					imageSrcSet:
						typeof x.imageSrcSet == "string" ? x.imageSrcSet : void 0,
					imageSizes: typeof x.imageSizes == "string" ? x.imageSizes : void 0,
					media: typeof x.media == "string" ? x.media : void 0,
				});
			}
		}),
		(gt.preloadModule = function (p, x) {
			if (typeof p == "string")
				if (x) {
					var y = g(x.as, x.crossOrigin);
					r.d.m(p, {
						as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
						crossOrigin: y,
						integrity: typeof x.integrity == "string" ? x.integrity : void 0,
					});
				} else r.d.m(p);
		}),
		(gt.requestFormReset = function (p) {
			r.d.r(p);
		}),
		(gt.unstable_batchedUpdates = function (p, x) {
			return p(x);
		}),
		(gt.useFormState = function (p, x, y) {
			return d.H.useFormState(p, x, y);
		}),
		(gt.useFormStatus = function () {
			return d.H.useHostTransitionStatus();
		}),
		(gt.version = "19.2.4"),
		gt
	);
}
var z0;
function jx() {
	if (z0) return Uc.exports;
	z0 = 1;
	function n() {
		if (
			!(
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
			)
		)
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (i) {
				console.error(i);
			}
	}
	return n(), (Uc.exports = Cx()), Uc.exports;
}
var O0;
function Tx() {
	if (O0) return Xl;
	O0 = 1;
	var n = Sx(),
		i = kf(),
		s = jx();
	function r(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var a = 2; a < arguments.length; a++)
				t += "&args[]=" + encodeURIComponent(arguments[a]);
		}
		return (
			"Minified React error #" +
			e +
			"; visit " +
			t +
			" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
		);
	}
	function u(e) {
		return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
	}
	function h(e) {
		var t = e,
			a = e;
		if (e.alternate) for (; t.return; ) t = t.return;
		else {
			e = t;
			do (t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return);
			while (e);
		}
		return t.tag === 3 ? a : null;
	}
	function d(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (
				(t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
				t !== null)
			)
				return t.dehydrated;
		}
		return null;
	}
	function g(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (
				(t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
				t !== null)
			)
				return t.dehydrated;
		}
		return null;
	}
	function p(e) {
		if (h(e) !== e) throw Error(r(188));
	}
	function x(e) {
		var t = e.alternate;
		if (!t) {
			if (((t = h(e)), t === null)) throw Error(r(188));
			return t !== e ? null : e;
		}
		for (var a = e, l = t; ; ) {
			var o = a.return;
			if (o === null) break;
			var c = o.alternate;
			if (c === null) {
				if (((l = o.return), l !== null)) {
					a = l;
					continue;
				}
				break;
			}
			if (o.child === c.child) {
				for (c = o.child; c; ) {
					if (c === a) return p(o), e;
					if (c === l) return p(o), t;
					c = c.sibling;
				}
				throw Error(r(188));
			}
			if (a.return !== l.return) (a = o), (l = c);
			else {
				for (var m = !1, b = o.child; b; ) {
					if (b === a) {
						(m = !0), (a = o), (l = c);
						break;
					}
					if (b === l) {
						(m = !0), (l = o), (a = c);
						break;
					}
					b = b.sibling;
				}
				if (!m) {
					for (b = c.child; b; ) {
						if (b === a) {
							(m = !0), (a = c), (l = o);
							break;
						}
						if (b === l) {
							(m = !0), (l = c), (a = o);
							break;
						}
						b = b.sibling;
					}
					if (!m) throw Error(r(189));
				}
			}
			if (a.alternate !== l) throw Error(r(190));
		}
		if (a.tag !== 3) throw Error(r(188));
		return a.stateNode.current === a ? e : t;
	}
	function y(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null; ) {
			if (((t = y(e)), t !== null)) return t;
			e = e.sibling;
		}
		return null;
	}
	var v = Object.assign,
		w = Symbol.for("react.element"),
		A = Symbol.for("react.transitional.element"),
		M = Symbol.for("react.portal"),
		z = Symbol.for("react.fragment"),
		N = Symbol.for("react.strict_mode"),
		V = Symbol.for("react.profiler"),
		q = Symbol.for("react.consumer"),
		k = Symbol.for("react.context"),
		K = Symbol.for("react.forward_ref"),
		X = Symbol.for("react.suspense"),
		ie = Symbol.for("react.suspense_list"),
		J = Symbol.for("react.memo"),
		H = Symbol.for("react.lazy"),
		ne = Symbol.for("react.activity"),
		Ce = Symbol.for("react.memo_cache_sentinel"),
		Be = Symbol.iterator;
	function Oe(e) {
		return e === null || typeof e != "object"
			? null
			: ((e = (Be && e[Be]) || e["@@iterator"]),
				typeof e == "function" ? e : null);
	}
	var ut = Symbol.for("react.client.reference");
	function et(e) {
		if (e == null) return null;
		if (typeof e == "function")
			return e.$$typeof === ut ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case z:
				return "Fragment";
			case V:
				return "Profiler";
			case N:
				return "StrictMode";
			case X:
				return "Suspense";
			case ie:
				return "SuspenseList";
			case ne:
				return "Activity";
		}
		if (typeof e == "object")
			switch (e.$$typeof) {
				case M:
					return "Portal";
				case k:
					return e.displayName || "Context";
				case q:
					return (e._context.displayName || "Context") + ".Consumer";
				case K:
					var t = e.render;
					return (
						(e = e.displayName),
						e ||
							((e = t.displayName || t.name || ""),
							(e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
						e
					);
				case J:
					return (
						(t = e.displayName || null), t !== null ? t : et(e.type) || "Memo"
					);
				case H:
					(t = e._payload), (e = e._init);
					try {
						return et(e(t));
					} catch {}
			}
		return null;
	}
	var Me = Array.isArray,
		B = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
		Z = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
		$ = { pending: !1, data: null, method: null, action: null },
		me = [],
		Q = -1;
	function T(e) {
		return { current: e };
	}
	function Y(e) {
		0 > Q || ((e.current = me[Q]), (me[Q] = null), Q--);
	}
	function F(e, t) {
		Q++, (me[Q] = e.current), (e.current = t);
	}
	var W = T(null),
		se = T(null),
		oe = T(null),
		we = T(null);
	function lt(e, t) {
		switch ((F(oe, t), F(se, e), F(W, null), t.nodeType)) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Fm(e) : 0;
				break;
			default:
				if (((e = t.tagName), (t = t.namespaceURI)))
					(t = Fm(t)), (e = Jm(t, e));
				else
					switch (e) {
						case "svg":
							e = 1;
							break;
						case "math":
							e = 2;
							break;
						default:
							e = 0;
					}
		}
		Y(W), F(W, e);
	}
	function pe() {
		Y(W), Y(se), Y(oe);
	}
	function Zn(e) {
		e.memoizedState !== null && F(we, e);
		var t = W.current,
			a = Jm(t, e.type);
		t !== a && (F(se, e), F(W, a));
	}
	function Sn(e) {
		se.current === e && (Y(W), Y(se)),
			we.current === e && (Y(we), (Ul._currentValue = $));
	}
	var Xn, $a;
	function Ht(e) {
		if (Xn === void 0)
			try {
				throw Error();
			} catch (a) {
				var t = a.stack.trim().match(/\n( *(at )?)/);
				(Xn = (t && t[1]) || ""),
					($a =
						-1 <
						a.stack.indexOf(`
    at`)
							? " (<anonymous>)"
							: -1 < a.stack.indexOf("@")
								? "@unknown:0:0"
								: "");
			}
		return (
			`
` +
			Xn +
			e +
			$a
		);
	}
	var yo = !1;
	function vo(e, t) {
		if (!e || yo) return "";
		yo = !0;
		var a = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var l = {
				DetermineComponentFrameRoot: function () {
					try {
						if (t) {
							var G = function () {
								throw Error();
							};
							if (
								(Object.defineProperty(G.prototype, "props", {
									set: function () {
										throw Error();
									},
								}),
								typeof Reflect == "object" && Reflect.construct)
							) {
								try {
									Reflect.construct(G, []);
								} catch (O) {
									var L = O;
								}
								Reflect.construct(e, [], G);
							} else {
								try {
									G.call();
								} catch (O) {
									L = O;
								}
								e.call(G.prototype);
							}
						} else {
							try {
								throw Error();
							} catch (O) {
								L = O;
							}
							(G = e()) &&
								typeof G.catch == "function" &&
								G.catch(function () {});
						}
					} catch (O) {
						if (O && L && typeof O.stack == "string") return [O.stack, L.stack];
					}
					return [null, null];
				},
			};
			l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var o = Object.getOwnPropertyDescriptor(
				l.DetermineComponentFrameRoot,
				"name",
			);
			o &&
				o.configurable &&
				Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
					value: "DetermineComponentFrameRoot",
				});
			var c = l.DetermineComponentFrameRoot(),
				m = c[0],
				b = c[1];
			if (m && b) {
				var S = m.split(`
`),
					D = b.split(`
`);
				for (
					o = l = 0;
					l < S.length && !S[l].includes("DetermineComponentFrameRoot");
				)
					l++;
				for (; o < D.length && !D[o].includes("DetermineComponentFrameRoot"); )
					o++;
				if (l === S.length || o === D.length)
					for (
						l = S.length - 1, o = D.length - 1;
						1 <= l && 0 <= o && S[l] !== D[o];
					)
						o--;
				for (; 1 <= l && 0 <= o; l--, o--)
					if (S[l] !== D[o]) {
						if (l !== 1 || o !== 1)
							do
								if ((l--, o--, 0 > o || S[l] !== D[o])) {
									var _ =
										`
` + S[l].replace(" at new ", " at ");
									return (
										e.displayName &&
											_.includes("<anonymous>") &&
											(_ = _.replace("<anonymous>", e.displayName)),
										_
									);
								}
							while (1 <= l && 0 <= o);
						break;
					}
			}
		} finally {
			(yo = !1), (Error.prepareStackTrace = a);
		}
		return (a = e ? e.displayName || e.name : "") ? Ht(a) : "";
	}
	function F5(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5:
				return Ht(e.type);
			case 16:
				return Ht("Lazy");
			case 13:
				return e.child !== t && t !== null
					? Ht("Suspense Fallback")
					: Ht("Suspense");
			case 19:
				return Ht("SuspenseList");
			case 0:
			case 15:
				return vo(e.type, !1);
			case 11:
				return vo(e.type.render, !1);
			case 1:
				return vo(e.type, !0);
			case 31:
				return Ht("Activity");
			default:
				return "";
		}
	}
	function Ad(e) {
		try {
			var t = "",
				a = null;
			do (t += F5(e, a)), (a = e), (e = e.return);
			while (e);
			return t;
		} catch (l) {
			return (
				`
Error generating stack: ` +
				l.message +
				`
` +
				l.stack
			);
		}
	}
	var bo = Object.prototype.hasOwnProperty,
		wo = n.unstable_scheduleCallback,
		So = n.unstable_cancelCallback,
		J5 = n.unstable_shouldYield,
		W5 = n.unstable_requestPaint,
		Nt = n.unstable_now,
		$5 = n.unstable_getCurrentPriorityLevel,
		Ed = n.unstable_ImmediatePriority,
		Md = n.unstable_UserBlockingPriority,
		ps = n.unstable_NormalPriority,
		I5 = n.unstable_LowPriority,
		Nd = n.unstable_IdlePriority,
		e3 = n.log,
		t3 = n.unstable_setDisableYieldValue,
		$i = null,
		Rt = null;
	function Kn(e) {
		if (
			(typeof e3 == "function" && t3(e),
			Rt && typeof Rt.setStrictMode == "function")
		)
			try {
				Rt.setStrictMode($i, e);
			} catch {}
	}
	var Dt = Math.clz32 ? Math.clz32 : i3,
		n3 = Math.log,
		a3 = Math.LN2;
	function i3(e) {
		return (e >>>= 0), e === 0 ? 32 : (31 - ((n3(e) / a3) | 0)) | 0;
	}
	var gs = 256,
		xs = 262144,
		ys = 4194304;
	function Ta(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1:
				return 1;
			case 2:
				return 2;
			case 4:
				return 4;
			case 8:
				return 8;
			case 16:
				return 16;
			case 32:
				return 32;
			case 64:
				return 64;
			case 128:
				return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
				return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
				return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				return e & 62914560;
			case 67108864:
				return 67108864;
			case 134217728:
				return 134217728;
			case 268435456:
				return 268435456;
			case 536870912:
				return 536870912;
			case 1073741824:
				return 0;
			default:
				return e;
		}
	}
	function vs(e, t, a) {
		var l = e.pendingLanes;
		if (l === 0) return 0;
		var o = 0,
			c = e.suspendedLanes,
			m = e.pingedLanes;
		e = e.warmLanes;
		var b = l & 134217727;
		return (
			b !== 0
				? ((l = b & ~c),
					l !== 0
						? (o = Ta(l))
						: ((m &= b),
							m !== 0
								? (o = Ta(m))
								: a || ((a = b & ~e), a !== 0 && (o = Ta(a)))))
				: ((b = l & ~c),
					b !== 0
						? (o = Ta(b))
						: m !== 0
							? (o = Ta(m))
							: a || ((a = l & ~e), a !== 0 && (o = Ta(a)))),
			o === 0
				? 0
				: t !== 0 &&
						t !== o &&
						(t & c) === 0 &&
						((c = o & -o),
						(a = t & -t),
						c >= a || (c === 32 && (a & 4194048) !== 0))
					? t
					: o
		);
	}
	function Ii(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function l3(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64:
				return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
				return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824:
				return -1;
			default:
				return -1;
		}
	}
	function Rd() {
		var e = ys;
		return (ys <<= 1), (ys & 62914560) === 0 && (ys = 4194304), e;
	}
	function Co(e) {
		for (var t = [], a = 0; 31 > a; a++) t.push(e);
		return t;
	}
	function el(e, t) {
		(e.pendingLanes |= t),
			t !== 268435456 &&
				((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
	}
	function s3(e, t, a, l, o, c) {
		var m = e.pendingLanes;
		(e.pendingLanes = a),
			(e.suspendedLanes = 0),
			(e.pingedLanes = 0),
			(e.warmLanes = 0),
			(e.expiredLanes &= a),
			(e.entangledLanes &= a),
			(e.errorRecoveryDisabledLanes &= a),
			(e.shellSuspendCounter = 0);
		var b = e.entanglements,
			S = e.expirationTimes,
			D = e.hiddenUpdates;
		for (a = m & ~a; 0 < a; ) {
			var _ = 31 - Dt(a),
				G = 1 << _;
			(b[_] = 0), (S[_] = -1);
			var L = D[_];
			if (L !== null)
				for (D[_] = null, _ = 0; _ < L.length; _++) {
					var O = L[_];
					O !== null && (O.lane &= -536870913);
				}
			a &= ~G;
		}
		l !== 0 && Dd(e, l, 0),
			c !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(m & ~t));
	}
	function Dd(e, t, a) {
		(e.pendingLanes |= t), (e.suspendedLanes &= ~t);
		var l = 31 - Dt(t);
		(e.entangledLanes |= t),
			(e.entanglements[l] = e.entanglements[l] | 1073741824 | (a & 261930));
	}
	function Ld(e, t) {
		var a = (e.entangledLanes |= t);
		for (e = e.entanglements; a; ) {
			var l = 31 - Dt(a),
				o = 1 << l;
			(o & t) | (e[l] & t) && (e[l] |= t), (a &= ~o);
		}
	}
	function zd(e, t) {
		var a = t & -t;
		return (
			(a = (a & 42) !== 0 ? 1 : jo(a)),
			(a & (e.suspendedLanes | t)) !== 0 ? 0 : a
		);
	}
	function jo(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default:
				e = 0;
		}
		return e;
	}
	function To(e) {
		return (
			(e &= -e),
			2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
		);
	}
	function Od() {
		var e = Z.p;
		return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : v0(e.type));
	}
	function Vd(e, t) {
		var a = Z.p;
		try {
			return (Z.p = e), t();
		} finally {
			Z.p = a;
		}
	}
	var Qn = Math.random().toString(36).slice(2),
		ct = "__reactFiber$" + Qn,
		wt = "__reactProps$" + Qn,
		Ia = "__reactContainer$" + Qn,
		Ao = "__reactEvents$" + Qn,
		r3 = "__reactListeners$" + Qn,
		o3 = "__reactHandles$" + Qn,
		Bd = "__reactResources$" + Qn,
		tl = "__reactMarker$" + Qn;
	function Eo(e) {
		delete e[ct], delete e[wt], delete e[Ao], delete e[r3], delete e[o3];
	}
	function ei(e) {
		var t = e[ct];
		if (t) return t;
		for (var a = e.parentNode; a; ) {
			if ((t = a[Ia] || a[ct])) {
				if (
					((a = t.alternate),
					t.child !== null || (a !== null && a.child !== null))
				)
					for (e = a0(e); e !== null; ) {
						if ((a = e[ct])) return a;
						e = a0(e);
					}
				return t;
			}
			(e = a), (a = e.parentNode);
		}
		return null;
	}
	function ti(e) {
		if ((e = e[ct] || e[Ia])) {
			var t = e.tag;
			if (
				t === 5 ||
				t === 6 ||
				t === 13 ||
				t === 31 ||
				t === 26 ||
				t === 27 ||
				t === 3
			)
				return e;
		}
		return null;
	}
	function nl(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(r(33));
	}
	function ni(e) {
		var t = e[Bd];
		return (
			t ||
				(t = e[Bd] =
					{ hoistableStyles: new Map(), hoistableScripts: new Map() }),
			t
		);
	}
	function st(e) {
		e[tl] = !0;
	}
	var _d = new Set(),
		kd = {};
	function Aa(e, t) {
		ai(e, t), ai(e + "Capture", t);
	}
	function ai(e, t) {
		for (kd[e] = t, e = 0; e < t.length; e++) _d.add(t[e]);
	}
	var u3 = RegExp(
			"^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
		),
		Hd = {},
		Ud = {};
	function c3(e) {
		return bo.call(Ud, e)
			? !0
			: bo.call(Hd, e)
				? !1
				: u3.test(e)
					? (Ud[e] = !0)
					: ((Hd[e] = !0), !1);
	}
	function bs(e, t, a) {
		if (c3(t))
			if (a === null) e.removeAttribute(t);
			else {
				switch (typeof a) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var l = t.toLowerCase().slice(0, 5);
						if (l !== "data-" && l !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, "" + a);
			}
	}
	function ws(e, t, a) {
		if (a === null) e.removeAttribute(t);
		else {
			switch (typeof a) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + a);
		}
	}
	function Cn(e, t, a, l) {
		if (l === null) e.removeAttribute(a);
		else {
			switch (typeof l) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(a);
					return;
			}
			e.setAttributeNS(t, a, "" + l);
		}
	}
	function Ut(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined":
				return e;
			case "object":
				return e;
			default:
				return "";
		}
	}
	function Gd(e) {
		var t = e.type;
		return (
			(e = e.nodeName) &&
			e.toLowerCase() === "input" &&
			(t === "checkbox" || t === "radio")
		);
	}
	function f3(e, t, a) {
		var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (
			!e.hasOwnProperty(t) &&
			typeof l < "u" &&
			typeof l.get == "function" &&
			typeof l.set == "function"
		) {
			var o = l.get,
				c = l.set;
			return (
				Object.defineProperty(e, t, {
					configurable: !0,
					get: function () {
						return o.call(this);
					},
					set: function (m) {
						(a = "" + m), c.call(this, m);
					},
				}),
				Object.defineProperty(e, t, { enumerable: l.enumerable }),
				{
					getValue: function () {
						return a;
					},
					setValue: function (m) {
						a = "" + m;
					},
					stopTracking: function () {
						(e._valueTracker = null), delete e[t];
					},
				}
			);
		}
	}
	function Mo(e) {
		if (!e._valueTracker) {
			var t = Gd(e) ? "checked" : "value";
			e._valueTracker = f3(e, t, "" + e[t]);
		}
	}
	function Yd(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var a = t.getValue(),
			l = "";
		return (
			e && (l = Gd(e) ? (e.checked ? "true" : "false") : e.value),
			(e = l),
			e !== a ? (t.setValue(e), !0) : !1
		);
	}
	function Ss(e) {
		if (
			((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
		)
			return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var d3 = /[\n"\\]/g;
	function Gt(e) {
		return e.replace(d3, function (t) {
			return "\\" + t.charCodeAt(0).toString(16) + " ";
		});
	}
	function No(e, t, a, l, o, c, m, b) {
		(e.name = ""),
			m != null &&
			typeof m != "function" &&
			typeof m != "symbol" &&
			typeof m != "boolean"
				? (e.type = m)
				: e.removeAttribute("type"),
			t != null
				? m === "number"
					? ((t === 0 && e.value === "") || e.value != t) &&
						(e.value = "" + Ut(t))
					: e.value !== "" + Ut(t) && (e.value = "" + Ut(t))
				: (m !== "submit" && m !== "reset") || e.removeAttribute("value"),
			t != null
				? Ro(e, m, Ut(t))
				: a != null
					? Ro(e, m, Ut(a))
					: l != null && e.removeAttribute("value"),
			o == null && c != null && (e.defaultChecked = !!c),
			o != null &&
				(e.checked = o && typeof o != "function" && typeof o != "symbol"),
			b != null &&
			typeof b != "function" &&
			typeof b != "symbol" &&
			typeof b != "boolean"
				? (e.name = "" + Ut(b))
				: e.removeAttribute("name");
	}
	function qd(e, t, a, l, o, c, m, b) {
		if (
			(c != null &&
				typeof c != "function" &&
				typeof c != "symbol" &&
				typeof c != "boolean" &&
				(e.type = c),
			t != null || a != null)
		) {
			if (!((c !== "submit" && c !== "reset") || t != null)) {
				Mo(e);
				return;
			}
			(a = a != null ? "" + Ut(a) : ""),
				(t = t != null ? "" + Ut(t) : a),
				b || t === e.value || (e.value = t),
				(e.defaultValue = t);
		}
		(l = l ?? o),
			(l = typeof l != "function" && typeof l != "symbol" && !!l),
			(e.checked = b ? e.checked : !!l),
			(e.defaultChecked = !!l),
			m != null &&
				typeof m != "function" &&
				typeof m != "symbol" &&
				typeof m != "boolean" &&
				(e.name = m),
			Mo(e);
	}
	function Ro(e, t, a) {
		(t === "number" && Ss(e.ownerDocument) === e) ||
			e.defaultValue === "" + a ||
			(e.defaultValue = "" + a);
	}
	function ii(e, t, a, l) {
		if (((e = e.options), t)) {
			t = {};
			for (var o = 0; o < a.length; o++) t["$" + a[o]] = !0;
			for (a = 0; a < e.length; a++)
				(o = t.hasOwnProperty("$" + e[a].value)),
					e[a].selected !== o && (e[a].selected = o),
					o && l && (e[a].defaultSelected = !0);
		} else {
			for (a = "" + Ut(a), t = null, o = 0; o < e.length; o++) {
				if (e[o].value === a) {
					(e[o].selected = !0), l && (e[o].defaultSelected = !0);
					return;
				}
				t !== null || e[o].disabled || (t = e[o]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Zd(e, t, a) {
		if (
			t != null &&
			((t = "" + Ut(t)), t !== e.value && (e.value = t), a == null)
		) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = a != null ? "" + Ut(a) : "";
	}
	function Xd(e, t, a, l) {
		if (t == null) {
			if (l != null) {
				if (a != null) throw Error(r(92));
				if (Me(l)) {
					if (1 < l.length) throw Error(r(93));
					l = l[0];
				}
				a = l;
			}
			a == null && (a = ""), (t = a);
		}
		(a = Ut(t)),
			(e.defaultValue = a),
			(l = e.textContent),
			l === a && l !== "" && l !== null && (e.value = l),
			Mo(e);
	}
	function li(e, t) {
		if (t) {
			var a = e.firstChild;
			if (a && a === e.lastChild && a.nodeType === 3) {
				a.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var h3 = new Set(
		"animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
			" ",
		),
	);
	function Kd(e, t, a) {
		var l = t.indexOf("--") === 0;
		a == null || typeof a == "boolean" || a === ""
			? l
				? e.setProperty(t, "")
				: t === "float"
					? (e.cssFloat = "")
					: (e[t] = "")
			: l
				? e.setProperty(t, a)
				: typeof a != "number" || a === 0 || h3.has(t)
					? t === "float"
						? (e.cssFloat = a)
						: (e[t] = ("" + a).trim())
					: (e[t] = a + "px");
	}
	function Qd(e, t, a) {
		if (t != null && typeof t != "object") throw Error(r(62));
		if (((e = e.style), a != null)) {
			for (var l in a)
				!a.hasOwnProperty(l) ||
					(t != null && t.hasOwnProperty(l)) ||
					(l.indexOf("--") === 0
						? e.setProperty(l, "")
						: l === "float"
							? (e.cssFloat = "")
							: (e[l] = ""));
			for (var o in t)
				(l = t[o]), t.hasOwnProperty(o) && a[o] !== l && Kd(e, o, l);
		} else for (var c in t) t.hasOwnProperty(c) && Kd(e, c, t[c]);
	}
	function Do(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph":
				return !1;
			default:
				return !0;
		}
	}
	var m3 = new Map([
			["acceptCharset", "accept-charset"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
			["crossOrigin", "crossorigin"],
			["accentHeight", "accent-height"],
			["alignmentBaseline", "alignment-baseline"],
			["arabicForm", "arabic-form"],
			["baselineShift", "baseline-shift"],
			["capHeight", "cap-height"],
			["clipPath", "clip-path"],
			["clipRule", "clip-rule"],
			["colorInterpolation", "color-interpolation"],
			["colorInterpolationFilters", "color-interpolation-filters"],
			["colorProfile", "color-profile"],
			["colorRendering", "color-rendering"],
			["dominantBaseline", "dominant-baseline"],
			["enableBackground", "enable-background"],
			["fillOpacity", "fill-opacity"],
			["fillRule", "fill-rule"],
			["floodColor", "flood-color"],
			["floodOpacity", "flood-opacity"],
			["fontFamily", "font-family"],
			["fontSize", "font-size"],
			["fontSizeAdjust", "font-size-adjust"],
			["fontStretch", "font-stretch"],
			["fontStyle", "font-style"],
			["fontVariant", "font-variant"],
			["fontWeight", "font-weight"],
			["glyphName", "glyph-name"],
			["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
			["glyphOrientationVertical", "glyph-orientation-vertical"],
			["horizAdvX", "horiz-adv-x"],
			["horizOriginX", "horiz-origin-x"],
			["imageRendering", "image-rendering"],
			["letterSpacing", "letter-spacing"],
			["lightingColor", "lighting-color"],
			["markerEnd", "marker-end"],
			["markerMid", "marker-mid"],
			["markerStart", "marker-start"],
			["overlinePosition", "overline-position"],
			["overlineThickness", "overline-thickness"],
			["paintOrder", "paint-order"],
			["panose-1", "panose-1"],
			["pointerEvents", "pointer-events"],
			["renderingIntent", "rendering-intent"],
			["shapeRendering", "shape-rendering"],
			["stopColor", "stop-color"],
			["stopOpacity", "stop-opacity"],
			["strikethroughPosition", "strikethrough-position"],
			["strikethroughThickness", "strikethrough-thickness"],
			["strokeDasharray", "stroke-dasharray"],
			["strokeDashoffset", "stroke-dashoffset"],
			["strokeLinecap", "stroke-linecap"],
			["strokeLinejoin", "stroke-linejoin"],
			["strokeMiterlimit", "stroke-miterlimit"],
			["strokeOpacity", "stroke-opacity"],
			["strokeWidth", "stroke-width"],
			["textAnchor", "text-anchor"],
			["textDecoration", "text-decoration"],
			["textRendering", "text-rendering"],
			["transformOrigin", "transform-origin"],
			["underlinePosition", "underline-position"],
			["underlineThickness", "underline-thickness"],
			["unicodeBidi", "unicode-bidi"],
			["unicodeRange", "unicode-range"],
			["unitsPerEm", "units-per-em"],
			["vAlphabetic", "v-alphabetic"],
			["vHanging", "v-hanging"],
			["vIdeographic", "v-ideographic"],
			["vMathematical", "v-mathematical"],
			["vectorEffect", "vector-effect"],
			["vertAdvY", "vert-adv-y"],
			["vertOriginX", "vert-origin-x"],
			["vertOriginY", "vert-origin-y"],
			["wordSpacing", "word-spacing"],
			["writingMode", "writing-mode"],
			["xmlnsXlink", "xmlns:xlink"],
			["xHeight", "x-height"],
		]),
		p3 =
			/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Cs(e) {
		return p3.test("" + e)
			? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
			: e;
	}
	function jn() {}
	var Lo = null;
	function zo(e) {
		return (
			(e = e.target || e.srcElement || window),
			e.correspondingUseElement && (e = e.correspondingUseElement),
			e.nodeType === 3 ? e.parentNode : e
		);
	}
	var si = null,
		ri = null;
	function Pd(e) {
		var t = ti(e);
		if (t && (e = t.stateNode)) {
			var a = e[wt] || null;
			e: switch (((e = t.stateNode), t.type)) {
				case "input":
					if (
						(No(
							e,
							a.value,
							a.defaultValue,
							a.defaultValue,
							a.checked,
							a.defaultChecked,
							a.type,
							a.name,
						),
						(t = a.name),
						a.type === "radio" && t != null)
					) {
						for (a = e; a.parentNode; ) a = a.parentNode;
						for (
							a = a.querySelectorAll(
								'input[name="' + Gt("" + t) + '"][type="radio"]',
							),
								t = 0;
							t < a.length;
							t++
						) {
							var l = a[t];
							if (l !== e && l.form === e.form) {
								var o = l[wt] || null;
								if (!o) throw Error(r(90));
								No(
									l,
									o.value,
									o.defaultValue,
									o.defaultValue,
									o.checked,
									o.defaultChecked,
									o.type,
									o.name,
								);
							}
						}
						for (t = 0; t < a.length; t++)
							(l = a[t]), l.form === e.form && Yd(l);
					}
					break e;
				case "textarea":
					Zd(e, a.value, a.defaultValue);
					break e;
				case "select":
					(t = a.value), t != null && ii(e, !!a.multiple, t, !1);
			}
		}
	}
	var Oo = !1;
	function Fd(e, t, a) {
		if (Oo) return e(t, a);
		Oo = !0;
		try {
			var l = e(t);
			return l;
		} finally {
			if (
				((Oo = !1),
				(si !== null || ri !== null) &&
					(cr(), si && ((t = si), (e = ri), (ri = si = null), Pd(t), e)))
			)
				for (t = 0; t < e.length; t++) Pd(e[t]);
		}
	}
	function al(e, t) {
		var a = e.stateNode;
		if (a === null) return null;
		var l = a[wt] || null;
		if (l === null) return null;
		a = l[t];
		e: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(l = !l.disabled) ||
					((e = e.type),
					(l = !(
						e === "button" ||
						e === "input" ||
						e === "select" ||
						e === "textarea"
					))),
					(e = !l);
				break e;
			default:
				e = !1;
		}
		if (e) return null;
		if (a && typeof a != "function") throw Error(r(231, t, typeof a));
		return a;
	}
	var Tn = !(
			typeof window > "u" ||
			typeof window.document > "u" ||
			typeof window.document.createElement > "u"
		),
		Vo = !1;
	if (Tn)
		try {
			var il = {};
			Object.defineProperty(il, "passive", {
				get: function () {
					Vo = !0;
				},
			}),
				window.addEventListener("test", il, il),
				window.removeEventListener("test", il, il);
		} catch {
			Vo = !1;
		}
	var Pn = null,
		Bo = null,
		js = null;
	function Jd() {
		if (js) return js;
		var e,
			t = Bo,
			a = t.length,
			l,
			o = "value" in Pn ? Pn.value : Pn.textContent,
			c = o.length;
		for (e = 0; e < a && t[e] === o[e]; e++);
		var m = a - e;
		for (l = 1; l <= m && t[a - l] === o[c - l]; l++);
		return (js = o.slice(e, 1 < l ? 1 - l : void 0));
	}
	function Ts(e) {
		var t = e.keyCode;
		return (
			"charCode" in e
				? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
				: (e = t),
			e === 10 && (e = 13),
			32 <= e || e === 13 ? e : 0
		);
	}
	function As() {
		return !0;
	}
	function Wd() {
		return !1;
	}
	function St(e) {
		function t(a, l, o, c, m) {
			(this._reactName = a),
				(this._targetInst = o),
				(this.type = l),
				(this.nativeEvent = c),
				(this.target = m),
				(this.currentTarget = null);
			for (var b in e)
				e.hasOwnProperty(b) && ((a = e[b]), (this[b] = a ? a(c) : c[b]));
			return (
				(this.isDefaultPrevented = (
					c.defaultPrevented != null
						? c.defaultPrevented
						: c.returnValue === !1
				)
					? As
					: Wd),
				(this.isPropagationStopped = Wd),
				this
			);
		}
		return (
			v(t.prototype, {
				preventDefault: function () {
					this.defaultPrevented = !0;
					var a = this.nativeEvent;
					a &&
						(a.preventDefault
							? a.preventDefault()
							: typeof a.returnValue != "unknown" && (a.returnValue = !1),
						(this.isDefaultPrevented = As));
				},
				stopPropagation: function () {
					var a = this.nativeEvent;
					a &&
						(a.stopPropagation
							? a.stopPropagation()
							: typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
						(this.isPropagationStopped = As));
				},
				persist: function () {},
				isPersistent: As,
			}),
			t
		);
	}
	var Ea = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function (e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0,
		},
		Es = St(Ea),
		ll = v({}, Ea, { view: 0, detail: 0 }),
		g3 = St(ll),
		_o,
		ko,
		sl,
		Ms = v({}, ll, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: Uo,
			button: 0,
			buttons: 0,
			relatedTarget: function (e) {
				return e.relatedTarget === void 0
					? e.fromElement === e.srcElement
						? e.toElement
						: e.fromElement
					: e.relatedTarget;
			},
			movementX: function (e) {
				return "movementX" in e
					? e.movementX
					: (e !== sl &&
							(sl && e.type === "mousemove"
								? ((_o = e.screenX - sl.screenX), (ko = e.screenY - sl.screenY))
								: (ko = _o = 0),
							(sl = e)),
						_o);
			},
			movementY: function (e) {
				return "movementY" in e ? e.movementY : ko;
			},
		}),
		$d = St(Ms),
		x3 = v({}, Ms, { dataTransfer: 0 }),
		y3 = St(x3),
		v3 = v({}, ll, { relatedTarget: 0 }),
		Ho = St(v3),
		b3 = v({}, Ea, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
		w3 = St(b3),
		S3 = v({}, Ea, {
			clipboardData: function (e) {
				return "clipboardData" in e ? e.clipboardData : window.clipboardData;
			},
		}),
		C3 = St(S3),
		j3 = v({}, Ea, { data: 0 }),
		Id = St(j3),
		T3 = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified",
		},
		A3 = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta",
		},
		E3 = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey",
		};
	function M3(e) {
		var t = this.nativeEvent;
		return t.getModifierState
			? t.getModifierState(e)
			: (e = E3[e])
				? !!t[e]
				: !1;
	}
	function Uo() {
		return M3;
	}
	var N3 = v({}, ll, {
			key: function (e) {
				if (e.key) {
					var t = T3[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress"
					? ((e = Ts(e)), e === 13 ? "Enter" : String.fromCharCode(e))
					: e.type === "keydown" || e.type === "keyup"
						? A3[e.keyCode] || "Unidentified"
						: "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: Uo,
			charCode: function (e) {
				return e.type === "keypress" ? Ts(e) : 0;
			},
			keyCode: function (e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function (e) {
				return e.type === "keypress"
					? Ts(e)
					: e.type === "keydown" || e.type === "keyup"
						? e.keyCode
						: 0;
			},
		}),
		R3 = St(N3),
		D3 = v({}, Ms, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0,
		}),
		eh = St(D3),
		L3 = v({}, ll, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: Uo,
		}),
		z3 = St(L3),
		O3 = v({}, Ea, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
		V3 = St(O3),
		B3 = v({}, Ms, {
			deltaX: function (e) {
				return "deltaX" in e
					? e.deltaX
					: "wheelDeltaX" in e
						? -e.wheelDeltaX
						: 0;
			},
			deltaY: function (e) {
				return "deltaY" in e
					? e.deltaY
					: "wheelDeltaY" in e
						? -e.wheelDeltaY
						: "wheelDelta" in e
							? -e.wheelDelta
							: 0;
			},
			deltaZ: 0,
			deltaMode: 0,
		}),
		_3 = St(B3),
		k3 = v({}, Ea, { newState: 0, oldState: 0 }),
		H3 = St(k3),
		U3 = [9, 13, 27, 32],
		Go = Tn && "CompositionEvent" in window,
		rl = null;
	Tn && "documentMode" in document && (rl = document.documentMode);
	var G3 = Tn && "TextEvent" in window && !rl,
		th = Tn && (!Go || (rl && 8 < rl && 11 >= rl)),
		nh = " ",
		ah = !1;
	function ih(e, t) {
		switch (e) {
			case "keyup":
				return U3.indexOf(t.keyCode) !== -1;
			case "keydown":
				return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout":
				return !0;
			default:
				return !1;
		}
	}
	function lh(e) {
		return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
	}
	var oi = !1;
	function Y3(e, t) {
		switch (e) {
			case "compositionend":
				return lh(t);
			case "keypress":
				return t.which !== 32 ? null : ((ah = !0), nh);
			case "textInput":
				return (e = t.data), e === nh && ah ? null : e;
			default:
				return null;
		}
	}
	function q3(e, t) {
		if (oi)
			return e === "compositionend" || (!Go && ih(e, t))
				? ((e = Jd()), (js = Bo = Pn = null), (oi = !1), e)
				: null;
		switch (e) {
			case "paste":
				return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend":
				return th && t.locale !== "ko" ? null : t.data;
			default:
				return null;
		}
	}
	var Z3 = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0,
	};
	function sh(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Z3[e.type] : t === "textarea";
	}
	function rh(e, t, a, l) {
		si ? (ri ? ri.push(l) : (ri = [l])) : (si = l),
			(t = xr(t, "onChange")),
			0 < t.length &&
				((a = new Es("onChange", "change", null, a, l)),
				e.push({ event: a, listeners: t }));
	}
	var ol = null,
		ul = null;
	function X3(e) {
		qm(e, 0);
	}
	function Ns(e) {
		var t = nl(e);
		if (Yd(t)) return e;
	}
	function oh(e, t) {
		if (e === "change") return t;
	}
	var uh = !1;
	if (Tn) {
		var Yo;
		if (Tn) {
			var qo = "oninput" in document;
			if (!qo) {
				var ch = document.createElement("div");
				ch.setAttribute("oninput", "return;"),
					(qo = typeof ch.oninput == "function");
			}
			Yo = qo;
		} else Yo = !1;
		uh = Yo && (!document.documentMode || 9 < document.documentMode);
	}
	function fh() {
		ol && (ol.detachEvent("onpropertychange", dh), (ul = ol = null));
	}
	function dh(e) {
		if (e.propertyName === "value" && Ns(ul)) {
			var t = [];
			rh(t, ul, e, zo(e)), Fd(X3, t);
		}
	}
	function K3(e, t, a) {
		e === "focusin"
			? (fh(), (ol = t), (ul = a), ol.attachEvent("onpropertychange", dh))
			: e === "focusout" && fh();
	}
	function Q3(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown")
			return Ns(ul);
	}
	function P3(e, t) {
		if (e === "click") return Ns(t);
	}
	function F3(e, t) {
		if (e === "input" || e === "change") return Ns(t);
	}
	function J3(e, t) {
		return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
	}
	var Lt = typeof Object.is == "function" ? Object.is : J3;
	function cl(e, t) {
		if (Lt(e, t)) return !0;
		if (
			typeof e != "object" ||
			e === null ||
			typeof t != "object" ||
			t === null
		)
			return !1;
		var a = Object.keys(e),
			l = Object.keys(t);
		if (a.length !== l.length) return !1;
		for (l = 0; l < a.length; l++) {
			var o = a[l];
			if (!bo.call(t, o) || !Lt(e[o], t[o])) return !1;
		}
		return !0;
	}
	function hh(e) {
		for (; e && e.firstChild; ) e = e.firstChild;
		return e;
	}
	function mh(e, t) {
		var a = hh(e);
		e = 0;
		for (var l; a; ) {
			if (a.nodeType === 3) {
				if (((l = e + a.textContent.length), e <= t && l >= t))
					return { node: a, offset: t - e };
				e = l;
			}
			e: {
				for (; a; ) {
					if (a.nextSibling) {
						a = a.nextSibling;
						break e;
					}
					a = a.parentNode;
				}
				a = void 0;
			}
			a = hh(a);
		}
	}
	function ph(e, t) {
		return e && t
			? e === t
				? !0
				: e && e.nodeType === 3
					? !1
					: t && t.nodeType === 3
						? ph(e, t.parentNode)
						: "contains" in e
							? e.contains(t)
							: e.compareDocumentPosition
								? !!(e.compareDocumentPosition(t) & 16)
								: !1
			: !1;
	}
	function gh(e) {
		e =
			e != null &&
			e.ownerDocument != null &&
			e.ownerDocument.defaultView != null
				? e.ownerDocument.defaultView
				: window;
		for (var t = Ss(e.document); t instanceof e.HTMLIFrameElement; ) {
			try {
				var a = typeof t.contentWindow.location.href == "string";
			} catch {
				a = !1;
			}
			if (a) e = t.contentWindow;
			else break;
			t = Ss(e.document);
		}
		return t;
	}
	function Zo(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return (
			t &&
			((t === "input" &&
				(e.type === "text" ||
					e.type === "search" ||
					e.type === "tel" ||
					e.type === "url" ||
					e.type === "password")) ||
				t === "textarea" ||
				e.contentEditable === "true")
		);
	}
	var W3 = Tn && "documentMode" in document && 11 >= document.documentMode,
		ui = null,
		Xo = null,
		fl = null,
		Ko = !1;
	function xh(e, t, a) {
		var l =
			a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
		Ko ||
			ui == null ||
			ui !== Ss(l) ||
			((l = ui),
			"selectionStart" in l && Zo(l)
				? (l = { start: l.selectionStart, end: l.selectionEnd })
				: ((l = (
						(l.ownerDocument && l.ownerDocument.defaultView) ||
						window
					).getSelection()),
					(l = {
						anchorNode: l.anchorNode,
						anchorOffset: l.anchorOffset,
						focusNode: l.focusNode,
						focusOffset: l.focusOffset,
					})),
			(fl && cl(fl, l)) ||
				((fl = l),
				(l = xr(Xo, "onSelect")),
				0 < l.length &&
					((t = new Es("onSelect", "select", null, t, a)),
					e.push({ event: t, listeners: l }),
					(t.target = ui))));
	}
	function Ma(e, t) {
		var a = {};
		return (
			(a[e.toLowerCase()] = t.toLowerCase()),
			(a["Webkit" + e] = "webkit" + t),
			(a["Moz" + e] = "moz" + t),
			a
		);
	}
	var ci = {
			animationend: Ma("Animation", "AnimationEnd"),
			animationiteration: Ma("Animation", "AnimationIteration"),
			animationstart: Ma("Animation", "AnimationStart"),
			transitionrun: Ma("Transition", "TransitionRun"),
			transitionstart: Ma("Transition", "TransitionStart"),
			transitioncancel: Ma("Transition", "TransitionCancel"),
			transitionend: Ma("Transition", "TransitionEnd"),
		},
		Qo = {},
		yh = {};
	Tn &&
		((yh = document.createElement("div").style),
		"AnimationEvent" in window ||
			(delete ci.animationend.animation,
			delete ci.animationiteration.animation,
			delete ci.animationstart.animation),
		"TransitionEvent" in window || delete ci.transitionend.transition);
	function Na(e) {
		if (Qo[e]) return Qo[e];
		if (!ci[e]) return e;
		var t = ci[e],
			a;
		for (a in t) if (t.hasOwnProperty(a) && a in yh) return (Qo[e] = t[a]);
		return e;
	}
	var vh = Na("animationend"),
		bh = Na("animationiteration"),
		wh = Na("animationstart"),
		$3 = Na("transitionrun"),
		I3 = Na("transitionstart"),
		e4 = Na("transitioncancel"),
		Sh = Na("transitionend"),
		Ch = new Map(),
		Po =
			"abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
				" ",
			);
	Po.push("scrollEnd");
	function It(e, t) {
		Ch.set(e, t), Aa(t, [e]);
	}
	var Rs =
			typeof reportError == "function"
				? reportError
				: function (e) {
						if (
							typeof window == "object" &&
							typeof window.ErrorEvent == "function"
						) {
							var t = new window.ErrorEvent("error", {
								bubbles: !0,
								cancelable: !0,
								message:
									typeof e == "object" &&
									e !== null &&
									typeof e.message == "string"
										? String(e.message)
										: String(e),
								error: e,
							});
							if (!window.dispatchEvent(t)) return;
						} else if (
							typeof process == "object" &&
							typeof process.emit == "function"
						) {
							process.emit("uncaughtException", e);
							return;
						}
						console.error(e);
					},
		Yt = [],
		fi = 0,
		Fo = 0;
	function Ds() {
		for (var e = fi, t = (Fo = fi = 0); t < e; ) {
			var a = Yt[t];
			Yt[t++] = null;
			var l = Yt[t];
			Yt[t++] = null;
			var o = Yt[t];
			Yt[t++] = null;
			var c = Yt[t];
			if (((Yt[t++] = null), l !== null && o !== null)) {
				var m = l.pending;
				m === null ? (o.next = o) : ((o.next = m.next), (m.next = o)),
					(l.pending = o);
			}
			c !== 0 && jh(a, o, c);
		}
	}
	function Ls(e, t, a, l) {
		(Yt[fi++] = e),
			(Yt[fi++] = t),
			(Yt[fi++] = a),
			(Yt[fi++] = l),
			(Fo |= l),
			(e.lanes |= l),
			(e = e.alternate),
			e !== null && (e.lanes |= l);
	}
	function Jo(e, t, a, l) {
		return Ls(e, t, a, l), zs(e);
	}
	function Ra(e, t) {
		return Ls(e, null, null, t), zs(e);
	}
	function jh(e, t, a) {
		e.lanes |= a;
		var l = e.alternate;
		l !== null && (l.lanes |= a);
		for (var o = !1, c = e.return; c !== null; )
			(c.childLanes |= a),
				(l = c.alternate),
				l !== null && (l.childLanes |= a),
				c.tag === 22 &&
					((e = c.stateNode), e === null || e._visibility & 1 || (o = !0)),
				(e = c),
				(c = c.return);
		return e.tag === 3
			? ((c = e.stateNode),
				o &&
					t !== null &&
					((o = 31 - Dt(a)),
					(e = c.hiddenUpdates),
					(l = e[o]),
					l === null ? (e[o] = [t]) : l.push(t),
					(t.lane = a | 536870912)),
				c)
			: null;
	}
	function zs(e) {
		if (50 < zl) throw ((zl = 0), (lc = null), Error(r(185)));
		for (var t = e.return; t !== null; ) (e = t), (t = e.return);
		return e.tag === 3 ? e.stateNode : null;
	}
	var di = {};
	function t4(e, t, a, l) {
		(this.tag = e),
			(this.key = a),
			(this.sibling =
				this.child =
				this.return =
				this.stateNode =
				this.type =
				this.elementType =
					null),
			(this.index = 0),
			(this.refCleanup = this.ref = null),
			(this.pendingProps = t),
			(this.dependencies =
				this.memoizedState =
				this.updateQueue =
				this.memoizedProps =
					null),
			(this.mode = l),
			(this.subtreeFlags = this.flags = 0),
			(this.deletions = null),
			(this.childLanes = this.lanes = 0),
			(this.alternate = null);
	}
	function zt(e, t, a, l) {
		return new t4(e, t, a, l);
	}
	function Wo(e) {
		return (e = e.prototype), !(!e || !e.isReactComponent);
	}
	function An(e, t) {
		var a = e.alternate;
		return (
			a === null
				? ((a = zt(e.tag, t, e.key, e.mode)),
					(a.elementType = e.elementType),
					(a.type = e.type),
					(a.stateNode = e.stateNode),
					(a.alternate = e),
					(e.alternate = a))
				: ((a.pendingProps = t),
					(a.type = e.type),
					(a.flags = 0),
					(a.subtreeFlags = 0),
					(a.deletions = null)),
			(a.flags = e.flags & 65011712),
			(a.childLanes = e.childLanes),
			(a.lanes = e.lanes),
			(a.child = e.child),
			(a.memoizedProps = e.memoizedProps),
			(a.memoizedState = e.memoizedState),
			(a.updateQueue = e.updateQueue),
			(t = e.dependencies),
			(a.dependencies =
				t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
			(a.sibling = e.sibling),
			(a.index = e.index),
			(a.ref = e.ref),
			(a.refCleanup = e.refCleanup),
			a
		);
	}
	function Th(e, t) {
		e.flags &= 65011714;
		var a = e.alternate;
		return (
			a === null
				? ((e.childLanes = 0),
					(e.lanes = t),
					(e.child = null),
					(e.subtreeFlags = 0),
					(e.memoizedProps = null),
					(e.memoizedState = null),
					(e.updateQueue = null),
					(e.dependencies = null),
					(e.stateNode = null))
				: ((e.childLanes = a.childLanes),
					(e.lanes = a.lanes),
					(e.child = a.child),
					(e.subtreeFlags = 0),
					(e.deletions = null),
					(e.memoizedProps = a.memoizedProps),
					(e.memoizedState = a.memoizedState),
					(e.updateQueue = a.updateQueue),
					(e.type = a.type),
					(t = a.dependencies),
					(e.dependencies =
						t === null
							? null
							: { lanes: t.lanes, firstContext: t.firstContext })),
			e
		);
	}
	function Os(e, t, a, l, o, c) {
		var m = 0;
		if (((l = e), typeof e == "function")) Wo(e) && (m = 1);
		else if (typeof e == "string")
			m = sx(e, a, W.current)
				? 26
				: e === "html" || e === "head" || e === "body"
					? 27
					: 5;
		else
			e: switch (e) {
				case ne:
					return (e = zt(31, a, t, o)), (e.elementType = ne), (e.lanes = c), e;
				case z:
					return Da(a.children, o, c, t);
				case N:
					(m = 8), (o |= 24);
					break;
				case V:
					return (
						(e = zt(12, a, t, o | 2)), (e.elementType = V), (e.lanes = c), e
					);
				case X:
					return (e = zt(13, a, t, o)), (e.elementType = X), (e.lanes = c), e;
				case ie:
					return (e = zt(19, a, t, o)), (e.elementType = ie), (e.lanes = c), e;
				default:
					if (typeof e == "object" && e !== null)
						switch (e.$$typeof) {
							case k:
								m = 10;
								break e;
							case q:
								m = 9;
								break e;
							case K:
								m = 11;
								break e;
							case J:
								m = 14;
								break e;
							case H:
								(m = 16), (l = null);
								break e;
						}
					(m = 29),
						(a = Error(r(130, e === null ? "null" : typeof e, ""))),
						(l = null);
			}
		return (
			(t = zt(m, a, t, o)), (t.elementType = e), (t.type = l), (t.lanes = c), t
		);
	}
	function Da(e, t, a, l) {
		return (e = zt(7, e, l, t)), (e.lanes = a), e;
	}
	function $o(e, t, a) {
		return (e = zt(6, e, null, t)), (e.lanes = a), e;
	}
	function Ah(e) {
		var t = zt(18, null, null, 0);
		return (t.stateNode = e), t;
	}
	function Io(e, t, a) {
		return (
			(t = zt(4, e.children !== null ? e.children : [], e.key, t)),
			(t.lanes = a),
			(t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation,
			}),
			t
		);
	}
	var Eh = new WeakMap();
	function qt(e, t) {
		if (typeof e == "object" && e !== null) {
			var a = Eh.get(e);
			return a !== void 0
				? a
				: ((t = { value: e, source: t, stack: Ad(t) }), Eh.set(e, t), t);
		}
		return { value: e, source: t, stack: Ad(t) };
	}
	var hi = [],
		mi = 0,
		Vs = null,
		dl = 0,
		Zt = [],
		Xt = 0,
		Fn = null,
		fn = 1,
		dn = "";
	function En(e, t) {
		(hi[mi++] = dl), (hi[mi++] = Vs), (Vs = e), (dl = t);
	}
	function Mh(e, t, a) {
		(Zt[Xt++] = fn), (Zt[Xt++] = dn), (Zt[Xt++] = Fn), (Fn = e);
		var l = fn;
		e = dn;
		var o = 32 - Dt(l) - 1;
		(l &= ~(1 << o)), (a += 1);
		var c = 32 - Dt(t) + o;
		if (30 < c) {
			var m = o - (o % 5);
			(c = (l & ((1 << m) - 1)).toString(32)),
				(l >>= m),
				(o -= m),
				(fn = (1 << (32 - Dt(t) + o)) | (a << o) | l),
				(dn = c + e);
		} else (fn = (1 << c) | (a << o) | l), (dn = e);
	}
	function eu(e) {
		e.return !== null && (En(e, 1), Mh(e, 1, 0));
	}
	function tu(e) {
		for (; e === Vs; )
			(Vs = hi[--mi]), (hi[mi] = null), (dl = hi[--mi]), (hi[mi] = null);
		for (; e === Fn; )
			(Fn = Zt[--Xt]),
				(Zt[Xt] = null),
				(dn = Zt[--Xt]),
				(Zt[Xt] = null),
				(fn = Zt[--Xt]),
				(Zt[Xt] = null);
	}
	function Nh(e, t) {
		(Zt[Xt++] = fn),
			(Zt[Xt++] = dn),
			(Zt[Xt++] = Fn),
			(fn = t.id),
			(dn = t.overflow),
			(Fn = e);
	}
	var ft = null,
		ke = null,
		Se = !1,
		Jn = null,
		Kt = !1,
		nu = Error(r(519));
	function Wn(e) {
		var t = Error(
			r(
				418,
				1 < arguments.length && arguments[1] !== void 0 && arguments[1]
					? "text"
					: "HTML",
				"",
			),
		);
		throw (hl(qt(t, e)), nu);
	}
	function Rh(e) {
		var t = e.stateNode,
			a = e.type,
			l = e.memoizedProps;
		switch (((t[ct] = e), (t[wt] = l), a)) {
			case "dialog":
				ye("cancel", t), ye("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				ye("load", t);
				break;
			case "video":
			case "audio":
				for (a = 0; a < Vl.length; a++) ye(Vl[a], t);
				break;
			case "source":
				ye("error", t);
				break;
			case "img":
			case "image":
			case "link":
				ye("error", t), ye("load", t);
				break;
			case "details":
				ye("toggle", t);
				break;
			case "input":
				ye("invalid", t),
					qd(
						t,
						l.value,
						l.defaultValue,
						l.checked,
						l.defaultChecked,
						l.type,
						l.name,
						!0,
					);
				break;
			case "select":
				ye("invalid", t);
				break;
			case "textarea":
				ye("invalid", t), Xd(t, l.value, l.defaultValue, l.children);
		}
		(a = l.children),
			(typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
			t.textContent === "" + a ||
			l.suppressHydrationWarning === !0 ||
			Qm(t.textContent, a)
				? (l.popover != null && (ye("beforetoggle", t), ye("toggle", t)),
					l.onScroll != null && ye("scroll", t),
					l.onScrollEnd != null && ye("scrollend", t),
					l.onClick != null && (t.onclick = jn),
					(t = !0))
				: (t = !1),
			t || Wn(e, !0);
	}
	function Dh(e) {
		for (ft = e.return; ft; )
			switch (ft.tag) {
				case 5:
				case 31:
				case 13:
					Kt = !1;
					return;
				case 27:
				case 3:
					Kt = !0;
					return;
				default:
					ft = ft.return;
			}
	}
	function pi(e) {
		if (e !== ft) return !1;
		if (!Se) return Dh(e), (Se = !0), !1;
		var t = e.tag,
			a;
		if (
			((a = t !== 3 && t !== 27) &&
				((a = t === 5) &&
					((a = e.type),
					(a =
						!(a !== "form" && a !== "button") || bc(e.type, e.memoizedProps))),
				(a = !a)),
			a && ke && Wn(e),
			Dh(e),
			t === 13)
		) {
			if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
				throw Error(r(317));
			ke = n0(e);
		} else if (t === 31) {
			if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
				throw Error(r(317));
			ke = n0(e);
		} else
			t === 27
				? ((t = ke), fa(e.type) ? ((e = Tc), (Tc = null), (ke = e)) : (ke = t))
				: (ke = ft ? Pt(e.stateNode.nextSibling) : null);
		return !0;
	}
	function La() {
		(ke = ft = null), (Se = !1);
	}
	function au() {
		var e = Jn;
		return (
			e !== null &&
				(At === null ? (At = e) : At.push.apply(At, e), (Jn = null)),
			e
		);
	}
	function hl(e) {
		Jn === null ? (Jn = [e]) : Jn.push(e);
	}
	var iu = T(null),
		za = null,
		Mn = null;
	function $n(e, t, a) {
		F(iu, t._currentValue), (t._currentValue = a);
	}
	function Nn(e) {
		(e._currentValue = iu.current), Y(iu);
	}
	function lu(e, t, a) {
		for (; e !== null; ) {
			var l = e.alternate;
			if (
				((e.childLanes & t) !== t
					? ((e.childLanes |= t), l !== null && (l.childLanes |= t))
					: l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
				e === a)
			)
				break;
			e = e.return;
		}
	}
	function su(e, t, a, l) {
		var o = e.child;
		for (o !== null && (o.return = e); o !== null; ) {
			var c = o.dependencies;
			if (c !== null) {
				var m = o.child;
				c = c.firstContext;
				e: for (; c !== null; ) {
					var b = c;
					c = o;
					for (var S = 0; S < t.length; S++)
						if (b.context === t[S]) {
							(c.lanes |= a),
								(b = c.alternate),
								b !== null && (b.lanes |= a),
								lu(c.return, a, e),
								l || (m = null);
							break e;
						}
					c = b.next;
				}
			} else if (o.tag === 18) {
				if (((m = o.return), m === null)) throw Error(r(341));
				(m.lanes |= a),
					(c = m.alternate),
					c !== null && (c.lanes |= a),
					lu(m, a, e),
					(m = null);
			} else m = o.child;
			if (m !== null) m.return = o;
			else
				for (m = o; m !== null; ) {
					if (m === e) {
						m = null;
						break;
					}
					if (((o = m.sibling), o !== null)) {
						(o.return = m.return), (m = o);
						break;
					}
					m = m.return;
				}
			o = m;
		}
	}
	function gi(e, t, a, l) {
		e = null;
		for (var o = t, c = !1; o !== null; ) {
			if (!c) {
				if ((o.flags & 524288) !== 0) c = !0;
				else if ((o.flags & 262144) !== 0) break;
			}
			if (o.tag === 10) {
				var m = o.alternate;
				if (m === null) throw Error(r(387));
				if (((m = m.memoizedProps), m !== null)) {
					var b = o.type;
					Lt(o.pendingProps.value, m.value) ||
						(e !== null ? e.push(b) : (e = [b]));
				}
			} else if (o === we.current) {
				if (((m = o.alternate), m === null)) throw Error(r(387));
				m.memoizedState.memoizedState !== o.memoizedState.memoizedState &&
					(e !== null ? e.push(Ul) : (e = [Ul]));
			}
			o = o.return;
		}
		e !== null && su(t, e, a, l), (t.flags |= 262144);
	}
	function Bs(e) {
		for (e = e.firstContext; e !== null; ) {
			if (!Lt(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Oa(e) {
		(za = e),
			(Mn = null),
			(e = e.dependencies),
			e !== null && (e.firstContext = null);
	}
	function dt(e) {
		return Lh(za, e);
	}
	function _s(e, t) {
		return za === null && Oa(e), Lh(e, t);
	}
	function Lh(e, t) {
		var a = t._currentValue;
		if (((t = { context: t, memoizedValue: a, next: null }), Mn === null)) {
			if (e === null) throw Error(r(308));
			(Mn = t),
				(e.dependencies = { lanes: 0, firstContext: t }),
				(e.flags |= 524288);
		} else Mn = Mn.next = t;
		return a;
	}
	var n4 =
			typeof AbortController < "u"
				? AbortController
				: function () {
						var e = [],
							t = (this.signal = {
								aborted: !1,
								addEventListener: function (a, l) {
									e.push(l);
								},
							});
						this.abort = function () {
							(t.aborted = !0),
								e.forEach(function (a) {
									return a();
								});
						};
					},
		a4 = n.unstable_scheduleCallback,
		i4 = n.unstable_NormalPriority,
		Pe = {
			$$typeof: k,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
		};
	function ru() {
		return { controller: new n4(), data: new Map(), refCount: 0 };
	}
	function ml(e) {
		e.refCount--,
			e.refCount === 0 &&
				a4(i4, function () {
					e.controller.abort();
				});
	}
	var pl = null,
		ou = 0,
		xi = 0,
		yi = null;
	function l4(e, t) {
		if (pl === null) {
			var a = (pl = []);
			(ou = 0),
				(xi = fc()),
				(yi = {
					status: "pending",
					value: void 0,
					then: function (l) {
						a.push(l);
					},
				});
		}
		return ou++, t.then(zh, zh), t;
	}
	function zh() {
		if (--ou === 0 && pl !== null) {
			yi !== null && (yi.status = "fulfilled");
			var e = pl;
			(pl = null), (xi = 0), (yi = null);
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function s4(e, t) {
		var a = [],
			l = {
				status: "pending",
				value: null,
				reason: null,
				then: function (o) {
					a.push(o);
				},
			};
		return (
			e.then(
				function () {
					(l.status = "fulfilled"), (l.value = t);
					for (var o = 0; o < a.length; o++) (0, a[o])(t);
				},
				function (o) {
					for (l.status = "rejected", l.reason = o, o = 0; o < a.length; o++)
						(0, a[o])(void 0);
				},
			),
			l
		);
	}
	var Oh = B.S;
	B.S = function (e, t) {
		(xm = Nt()),
			typeof t == "object" &&
				t !== null &&
				typeof t.then == "function" &&
				l4(e, t),
			Oh !== null && Oh(e, t);
	};
	var Va = T(null);
	function uu() {
		var e = Va.current;
		return e !== null ? e : Ve.pooledCache;
	}
	function ks(e, t) {
		t === null ? F(Va, Va.current) : F(Va, t.pool);
	}
	function Vh() {
		var e = uu();
		return e === null ? null : { parent: Pe._currentValue, pool: e };
	}
	var vi = Error(r(460)),
		cu = Error(r(474)),
		Hs = Error(r(542)),
		Us = { then: function () {} };
	function Bh(e) {
		return (e = e.status), e === "fulfilled" || e === "rejected";
	}
	function _h(e, t, a) {
		switch (
			((a = e[a]),
			a === void 0 ? e.push(t) : a !== t && (t.then(jn, jn), (t = a)),
			t.status)
		) {
			case "fulfilled":
				return t.value;
			case "rejected":
				throw ((e = t.reason), Hh(e), e);
			default:
				if (typeof t.status == "string") t.then(jn, jn);
				else {
					if (((e = Ve), e !== null && 100 < e.shellSuspendCounter))
						throw Error(r(482));
					(e = t),
						(e.status = "pending"),
						e.then(
							function (l) {
								if (t.status === "pending") {
									var o = t;
									(o.status = "fulfilled"), (o.value = l);
								}
							},
							function (l) {
								if (t.status === "pending") {
									var o = t;
									(o.status = "rejected"), (o.reason = l);
								}
							},
						);
				}
				switch (t.status) {
					case "fulfilled":
						return t.value;
					case "rejected":
						throw ((e = t.reason), Hh(e), e);
				}
				throw ((_a = t), vi);
		}
	}
	function Ba(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (a) {
			throw a !== null && typeof a == "object" && typeof a.then == "function"
				? ((_a = a), vi)
				: a;
		}
	}
	var _a = null;
	function kh() {
		if (_a === null) throw Error(r(459));
		var e = _a;
		return (_a = null), e;
	}
	function Hh(e) {
		if (e === vi || e === Hs) throw Error(r(483));
	}
	var bi = null,
		gl = 0;
	function Gs(e) {
		var t = gl;
		return (gl += 1), bi === null && (bi = []), _h(bi, e, t);
	}
	function xl(e, t) {
		(t = t.props.ref), (e.ref = t !== void 0 ? t : null);
	}
	function Ys(e, t) {
		throw t.$$typeof === w
			? Error(r(525))
			: ((e = Object.prototype.toString.call(t)),
				Error(
					r(
						31,
						e === "[object Object]"
							? "object with keys {" + Object.keys(t).join(", ") + "}"
							: e,
					),
				));
	}
	function Uh(e) {
		function t(E, j) {
			if (e) {
				var R = E.deletions;
				R === null ? ((E.deletions = [j]), (E.flags |= 16)) : R.push(j);
			}
		}
		function a(E, j) {
			if (!e) return null;
			for (; j !== null; ) t(E, j), (j = j.sibling);
			return null;
		}
		function l(E) {
			for (var j = new Map(); E !== null; )
				E.key !== null ? j.set(E.key, E) : j.set(E.index, E), (E = E.sibling);
			return j;
		}
		function o(E, j) {
			return (E = An(E, j)), (E.index = 0), (E.sibling = null), E;
		}
		function c(E, j, R) {
			return (
				(E.index = R),
				e
					? ((R = E.alternate),
						R !== null
							? ((R = R.index), R < j ? ((E.flags |= 67108866), j) : R)
							: ((E.flags |= 67108866), j))
					: ((E.flags |= 1048576), j)
			);
		}
		function m(E) {
			return e && E.alternate === null && (E.flags |= 67108866), E;
		}
		function b(E, j, R, U) {
			return j === null || j.tag !== 6
				? ((j = $o(R, E.mode, U)), (j.return = E), j)
				: ((j = o(j, R)), (j.return = E), j);
		}
		function S(E, j, R, U) {
			var re = R.type;
			return re === z
				? _(E, j, R.props.children, U, R.key)
				: j !== null &&
						(j.elementType === re ||
							(typeof re == "object" &&
								re !== null &&
								re.$$typeof === H &&
								Ba(re) === j.type))
					? ((j = o(j, R.props)), xl(j, R), (j.return = E), j)
					: ((j = Os(R.type, R.key, R.props, null, E.mode, U)),
						xl(j, R),
						(j.return = E),
						j);
		}
		function D(E, j, R, U) {
			return j === null ||
				j.tag !== 4 ||
				j.stateNode.containerInfo !== R.containerInfo ||
				j.stateNode.implementation !== R.implementation
				? ((j = Io(R, E.mode, U)), (j.return = E), j)
				: ((j = o(j, R.children || [])), (j.return = E), j);
		}
		function _(E, j, R, U, re) {
			return j === null || j.tag !== 7
				? ((j = Da(R, E.mode, U, re)), (j.return = E), j)
				: ((j = o(j, R)), (j.return = E), j);
		}
		function G(E, j, R) {
			if (
				(typeof j == "string" && j !== "") ||
				typeof j == "number" ||
				typeof j == "bigint"
			)
				return (j = $o("" + j, E.mode, R)), (j.return = E), j;
			if (typeof j == "object" && j !== null) {
				switch (j.$$typeof) {
					case A:
						return (
							(R = Os(j.type, j.key, j.props, null, E.mode, R)),
							xl(R, j),
							(R.return = E),
							R
						);
					case M:
						return (j = Io(j, E.mode, R)), (j.return = E), j;
					case H:
						return (j = Ba(j)), G(E, j, R);
				}
				if (Me(j) || Oe(j))
					return (j = Da(j, E.mode, R, null)), (j.return = E), j;
				if (typeof j.then == "function") return G(E, Gs(j), R);
				if (j.$$typeof === k) return G(E, _s(E, j), R);
				Ys(E, j);
			}
			return null;
		}
		function L(E, j, R, U) {
			var re = j !== null ? j.key : null;
			if (
				(typeof R == "string" && R !== "") ||
				typeof R == "number" ||
				typeof R == "bigint"
			)
				return re !== null ? null : b(E, j, "" + R, U);
			if (typeof R == "object" && R !== null) {
				switch (R.$$typeof) {
					case A:
						return R.key === re ? S(E, j, R, U) : null;
					case M:
						return R.key === re ? D(E, j, R, U) : null;
					case H:
						return (R = Ba(R)), L(E, j, R, U);
				}
				if (Me(R) || Oe(R)) return re !== null ? null : _(E, j, R, U, null);
				if (typeof R.then == "function") return L(E, j, Gs(R), U);
				if (R.$$typeof === k) return L(E, j, _s(E, R), U);
				Ys(E, R);
			}
			return null;
		}
		function O(E, j, R, U, re) {
			if (
				(typeof U == "string" && U !== "") ||
				typeof U == "number" ||
				typeof U == "bigint"
			)
				return (E = E.get(R) || null), b(j, E, "" + U, re);
			if (typeof U == "object" && U !== null) {
				switch (U.$$typeof) {
					case A:
						return (
							(E = E.get(U.key === null ? R : U.key) || null), S(j, E, U, re)
						);
					case M:
						return (
							(E = E.get(U.key === null ? R : U.key) || null), D(j, E, U, re)
						);
					case H:
						return (U = Ba(U)), O(E, j, R, U, re);
				}
				if (Me(U) || Oe(U)) return (E = E.get(R) || null), _(j, E, U, re, null);
				if (typeof U.then == "function") return O(E, j, R, Gs(U), re);
				if (U.$$typeof === k) return O(E, j, R, _s(j, U), re);
				Ys(j, U);
			}
			return null;
		}
		function I(E, j, R, U) {
			for (
				var re = null, je = null, le = j, he = (j = 0), be = null;
				le !== null && he < R.length;
				he++
			) {
				le.index > he ? ((be = le), (le = null)) : (be = le.sibling);
				var Te = L(E, le, R[he], U);
				if (Te === null) {
					le === null && (le = be);
					break;
				}
				e && le && Te.alternate === null && t(E, le),
					(j = c(Te, j, he)),
					je === null ? (re = Te) : (je.sibling = Te),
					(je = Te),
					(le = be);
			}
			if (he === R.length) return a(E, le), Se && En(E, he), re;
			if (le === null) {
				for (; he < R.length; he++)
					(le = G(E, R[he], U)),
						le !== null &&
							((j = c(le, j, he)),
							je === null ? (re = le) : (je.sibling = le),
							(je = le));
				return Se && En(E, he), re;
			}
			for (le = l(le); he < R.length; he++)
				(be = O(le, E, he, R[he], U)),
					be !== null &&
						(e &&
							be.alternate !== null &&
							le.delete(be.key === null ? he : be.key),
						(j = c(be, j, he)),
						je === null ? (re = be) : (je.sibling = be),
						(je = be));
			return (
				e &&
					le.forEach(function (ga) {
						return t(E, ga);
					}),
				Se && En(E, he),
				re
			);
		}
		function ue(E, j, R, U) {
			if (R == null) throw Error(r(151));
			for (
				var re = null,
					je = null,
					le = j,
					he = (j = 0),
					be = null,
					Te = R.next();
				le !== null && !Te.done;
				he++, Te = R.next()
			) {
				le.index > he ? ((be = le), (le = null)) : (be = le.sibling);
				var ga = L(E, le, Te.value, U);
				if (ga === null) {
					le === null && (le = be);
					break;
				}
				e && le && ga.alternate === null && t(E, le),
					(j = c(ga, j, he)),
					je === null ? (re = ga) : (je.sibling = ga),
					(je = ga),
					(le = be);
			}
			if (Te.done) return a(E, le), Se && En(E, he), re;
			if (le === null) {
				for (; !Te.done; he++, Te = R.next())
					(Te = G(E, Te.value, U)),
						Te !== null &&
							((j = c(Te, j, he)),
							je === null ? (re = Te) : (je.sibling = Te),
							(je = Te));
				return Se && En(E, he), re;
			}
			for (le = l(le); !Te.done; he++, Te = R.next())
				(Te = O(le, E, he, Te.value, U)),
					Te !== null &&
						(e &&
							Te.alternate !== null &&
							le.delete(Te.key === null ? he : Te.key),
						(j = c(Te, j, he)),
						je === null ? (re = Te) : (je.sibling = Te),
						(je = Te));
			return (
				e &&
					le.forEach(function (xx) {
						return t(E, xx);
					}),
				Se && En(E, he),
				re
			);
		}
		function ze(E, j, R, U) {
			if (
				(typeof R == "object" &&
					R !== null &&
					R.type === z &&
					R.key === null &&
					(R = R.props.children),
				typeof R == "object" && R !== null)
			) {
				switch (R.$$typeof) {
					case A:
						e: {
							for (var re = R.key; j !== null; ) {
								if (j.key === re) {
									if (((re = R.type), re === z)) {
										if (j.tag === 7) {
											a(E, j.sibling),
												(U = o(j, R.props.children)),
												(U.return = E),
												(E = U);
											break e;
										}
									} else if (
										j.elementType === re ||
										(typeof re == "object" &&
											re !== null &&
											re.$$typeof === H &&
											Ba(re) === j.type)
									) {
										a(E, j.sibling),
											(U = o(j, R.props)),
											xl(U, R),
											(U.return = E),
											(E = U);
										break e;
									}
									a(E, j);
									break;
								} else t(E, j);
								j = j.sibling;
							}
							R.type === z
								? ((U = Da(R.props.children, E.mode, U, R.key)),
									(U.return = E),
									(E = U))
								: ((U = Os(R.type, R.key, R.props, null, E.mode, U)),
									xl(U, R),
									(U.return = E),
									(E = U));
						}
						return m(E);
					case M:
						e: {
							for (re = R.key; j !== null; ) {
								if (j.key === re)
									if (
										j.tag === 4 &&
										j.stateNode.containerInfo === R.containerInfo &&
										j.stateNode.implementation === R.implementation
									) {
										a(E, j.sibling),
											(U = o(j, R.children || [])),
											(U.return = E),
											(E = U);
										break e;
									} else {
										a(E, j);
										break;
									}
								else t(E, j);
								j = j.sibling;
							}
							(U = Io(R, E.mode, U)), (U.return = E), (E = U);
						}
						return m(E);
					case H:
						return (R = Ba(R)), ze(E, j, R, U);
				}
				if (Me(R)) return I(E, j, R, U);
				if (Oe(R)) {
					if (((re = Oe(R)), typeof re != "function")) throw Error(r(150));
					return (R = re.call(R)), ue(E, j, R, U);
				}
				if (typeof R.then == "function") return ze(E, j, Gs(R), U);
				if (R.$$typeof === k) return ze(E, j, _s(E, R), U);
				Ys(E, R);
			}
			return (typeof R == "string" && R !== "") ||
				typeof R == "number" ||
				typeof R == "bigint"
				? ((R = "" + R),
					j !== null && j.tag === 6
						? (a(E, j.sibling), (U = o(j, R)), (U.return = E), (E = U))
						: (a(E, j), (U = $o(R, E.mode, U)), (U.return = E), (E = U)),
					m(E))
				: a(E, j);
		}
		return function (E, j, R, U) {
			try {
				gl = 0;
				var re = ze(E, j, R, U);
				return (bi = null), re;
			} catch (le) {
				if (le === vi || le === Hs) throw le;
				var je = zt(29, le, null, E.mode);
				return (je.lanes = U), (je.return = E), je;
			}
		};
	}
	var ka = Uh(!0),
		Gh = Uh(!1),
		In = !1;
	function fu(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: { pending: null, lanes: 0, hiddenCallbacks: null },
			callbacks: null,
		};
	}
	function du(e, t) {
		(e = e.updateQueue),
			t.updateQueue === e &&
				(t.updateQueue = {
					baseState: e.baseState,
					firstBaseUpdate: e.firstBaseUpdate,
					lastBaseUpdate: e.lastBaseUpdate,
					shared: e.shared,
					callbacks: null,
				});
	}
	function ea(e) {
		return { lane: e, tag: 0, payload: null, callback: null, next: null };
	}
	function ta(e, t, a) {
		var l = e.updateQueue;
		if (l === null) return null;
		if (((l = l.shared), (Ee & 2) !== 0)) {
			var o = l.pending;
			return (
				o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
				(l.pending = t),
				(t = zs(e)),
				jh(e, null, a),
				t
			);
		}
		return Ls(e, l, t, a), zs(e);
	}
	function yl(e, t, a) {
		if (
			((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
		) {
			var l = t.lanes;
			(l &= e.pendingLanes), (a |= l), (t.lanes = a), Ld(e, a);
		}
	}
	function hu(e, t) {
		var a = e.updateQueue,
			l = e.alternate;
		if (l !== null && ((l = l.updateQueue), a === l)) {
			var o = null,
				c = null;
			if (((a = a.firstBaseUpdate), a !== null)) {
				do {
					var m = {
						lane: a.lane,
						tag: a.tag,
						payload: a.payload,
						callback: null,
						next: null,
					};
					c === null ? (o = c = m) : (c = c.next = m), (a = a.next);
				} while (a !== null);
				c === null ? (o = c = t) : (c = c.next = t);
			} else o = c = t;
			(a = {
				baseState: l.baseState,
				firstBaseUpdate: o,
				lastBaseUpdate: c,
				shared: l.shared,
				callbacks: l.callbacks,
			}),
				(e.updateQueue = a);
			return;
		}
		(e = a.lastBaseUpdate),
			e === null ? (a.firstBaseUpdate = t) : (e.next = t),
			(a.lastBaseUpdate = t);
	}
	var mu = !1;
	function vl() {
		if (mu) {
			var e = yi;
			if (e !== null) throw e;
		}
	}
	function bl(e, t, a, l) {
		mu = !1;
		var o = e.updateQueue;
		In = !1;
		var c = o.firstBaseUpdate,
			m = o.lastBaseUpdate,
			b = o.shared.pending;
		if (b !== null) {
			o.shared.pending = null;
			var S = b,
				D = S.next;
			(S.next = null), m === null ? (c = D) : (m.next = D), (m = S);
			var _ = e.alternate;
			_ !== null &&
				((_ = _.updateQueue),
				(b = _.lastBaseUpdate),
				b !== m &&
					(b === null ? (_.firstBaseUpdate = D) : (b.next = D),
					(_.lastBaseUpdate = S)));
		}
		if (c !== null) {
			var G = o.baseState;
			(m = 0), (_ = D = S = null), (b = c);
			do {
				var L = b.lane & -536870913,
					O = L !== b.lane;
				if (O ? (ve & L) === L : (l & L) === L) {
					L !== 0 && L === xi && (mu = !0),
						_ !== null &&
							(_ = _.next =
								{
									lane: 0,
									tag: b.tag,
									payload: b.payload,
									callback: null,
									next: null,
								});
					e: {
						var I = e,
							ue = b;
						L = t;
						var ze = a;
						switch (ue.tag) {
							case 1:
								if (((I = ue.payload), typeof I == "function")) {
									G = I.call(ze, G, L);
									break e;
								}
								G = I;
								break e;
							case 3:
								I.flags = (I.flags & -65537) | 128;
							case 0:
								if (
									((I = ue.payload),
									(L = typeof I == "function" ? I.call(ze, G, L) : I),
									L == null)
								)
									break e;
								G = v({}, G, L);
								break e;
							case 2:
								In = !0;
						}
					}
					(L = b.callback),
						L !== null &&
							((e.flags |= 64),
							O && (e.flags |= 8192),
							(O = o.callbacks),
							O === null ? (o.callbacks = [L]) : O.push(L));
				} else
					(O = {
						lane: L,
						tag: b.tag,
						payload: b.payload,
						callback: b.callback,
						next: null,
					}),
						_ === null ? ((D = _ = O), (S = G)) : (_ = _.next = O),
						(m |= L);
				if (((b = b.next), b === null)) {
					if (((b = o.shared.pending), b === null)) break;
					(O = b),
						(b = O.next),
						(O.next = null),
						(o.lastBaseUpdate = O),
						(o.shared.pending = null);
				}
			} while (!0);
			_ === null && (S = G),
				(o.baseState = S),
				(o.firstBaseUpdate = D),
				(o.lastBaseUpdate = _),
				c === null && (o.shared.lanes = 0),
				(sa |= m),
				(e.lanes = m),
				(e.memoizedState = G);
		}
	}
	function Yh(e, t) {
		if (typeof e != "function") throw Error(r(191, e));
		e.call(t);
	}
	function qh(e, t) {
		var a = e.callbacks;
		if (a !== null)
			for (e.callbacks = null, e = 0; e < a.length; e++) Yh(a[e], t);
	}
	var wi = T(null),
		qs = T(0);
	function Zh(e, t) {
		(e = kn), F(qs, e), F(wi, t), (kn = e | t.baseLanes);
	}
	function pu() {
		F(qs, kn), F(wi, wi.current);
	}
	function gu() {
		(kn = qs.current), Y(wi), Y(qs);
	}
	var Ot = T(null),
		Qt = null;
	function na(e) {
		var t = e.alternate;
		F(Ke, Ke.current & 1),
			F(Ot, e),
			Qt === null &&
				(t === null || wi.current !== null || t.memoizedState !== null) &&
				(Qt = e);
	}
	function xu(e) {
		F(Ke, Ke.current), F(Ot, e), Qt === null && (Qt = e);
	}
	function Xh(e) {
		e.tag === 22
			? (F(Ke, Ke.current), F(Ot, e), Qt === null && (Qt = e))
			: aa();
	}
	function aa() {
		F(Ke, Ke.current), F(Ot, Ot.current);
	}
	function Vt(e) {
		Y(Ot), Qt === e && (Qt = null), Y(Ke);
	}
	var Ke = T(0);
	function Zs(e) {
		for (var t = e; t !== null; ) {
			if (t.tag === 13) {
				var a = t.memoizedState;
				if (a !== null && ((a = a.dehydrated), a === null || Cc(a) || jc(a)))
					return t;
			} else if (
				t.tag === 19 &&
				(t.memoizedProps.revealOrder === "forwards" ||
					t.memoizedProps.revealOrder === "backwards" ||
					t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
					t.memoizedProps.revealOrder === "together")
			) {
				if ((t.flags & 128) !== 0) return t;
			} else if (t.child !== null) {
				(t.child.return = t), (t = t.child);
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null; ) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			(t.sibling.return = t.return), (t = t.sibling);
		}
		return null;
	}
	var Rn = 0,
		de = null,
		De = null,
		Fe = null,
		Xs = !1,
		Si = !1,
		Ha = !1,
		Ks = 0,
		wl = 0,
		Ci = null,
		r4 = 0;
	function qe() {
		throw Error(r(321));
	}
	function yu(e, t) {
		if (t === null) return !1;
		for (var a = 0; a < t.length && a < e.length; a++)
			if (!Lt(e[a], t[a])) return !1;
		return !0;
	}
	function vu(e, t, a, l, o, c) {
		return (
			(Rn = c),
			(de = t),
			(t.memoizedState = null),
			(t.updateQueue = null),
			(t.lanes = 0),
			(B.H = e === null || e.memoizedState === null ? M1 : Ou),
			(Ha = !1),
			(c = a(l, o)),
			(Ha = !1),
			Si && (c = Qh(t, a, l, o)),
			Kh(e),
			c
		);
	}
	function Kh(e) {
		B.H = jl;
		var t = De !== null && De.next !== null;
		if (((Rn = 0), (Fe = De = de = null), (Xs = !1), (wl = 0), (Ci = null), t))
			throw Error(r(300));
		e === null ||
			Je ||
			((e = e.dependencies), e !== null && Bs(e) && (Je = !0));
	}
	function Qh(e, t, a, l) {
		de = e;
		var o = 0;
		do {
			if ((Si && (Ci = null), (wl = 0), (Si = !1), 25 <= o))
				throw Error(r(301));
			if (((o += 1), (Fe = De = null), e.updateQueue != null)) {
				var c = e.updateQueue;
				(c.lastEffect = null),
					(c.events = null),
					(c.stores = null),
					c.memoCache != null && (c.memoCache.index = 0);
			}
			(B.H = N1), (c = t(a, l));
		} while (Si);
		return c;
	}
	function o4() {
		var e = B.H,
			t = e.useState()[0];
		return (
			(t = typeof t.then == "function" ? Sl(t) : t),
			(e = e.useState()[0]),
			(De !== null ? De.memoizedState : null) !== e && (de.flags |= 1024),
			t
		);
	}
	function bu() {
		var e = Ks !== 0;
		return (Ks = 0), e;
	}
	function wu(e, t, a) {
		(t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a);
	}
	function Su(e) {
		if (Xs) {
			for (e = e.memoizedState; e !== null; ) {
				var t = e.queue;
				t !== null && (t.pending = null), (e = e.next);
			}
			Xs = !1;
		}
		(Rn = 0), (Fe = De = de = null), (Si = !1), (wl = Ks = 0), (Ci = null);
	}
	function yt() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null,
		};
		return Fe === null ? (de.memoizedState = Fe = e) : (Fe = Fe.next = e), Fe;
	}
	function Qe() {
		if (De === null) {
			var e = de.alternate;
			e = e !== null ? e.memoizedState : null;
		} else e = De.next;
		var t = Fe === null ? de.memoizedState : Fe.next;
		if (t !== null) (Fe = t), (De = e);
		else {
			if (e === null)
				throw de.alternate === null ? Error(r(467)) : Error(r(310));
			(De = e),
				(e = {
					memoizedState: De.memoizedState,
					baseState: De.baseState,
					baseQueue: De.baseQueue,
					queue: De.queue,
					next: null,
				}),
				Fe === null ? (de.memoizedState = Fe = e) : (Fe = Fe.next = e);
		}
		return Fe;
	}
	function Qs() {
		return { lastEffect: null, events: null, stores: null, memoCache: null };
	}
	function Sl(e) {
		var t = wl;
		return (
			(wl += 1),
			Ci === null && (Ci = []),
			(e = _h(Ci, e, t)),
			(t = de),
			(Fe === null ? t.memoizedState : Fe.next) === null &&
				((t = t.alternate),
				(B.H = t === null || t.memoizedState === null ? M1 : Ou)),
			e
		);
	}
	function Ps(e) {
		if (e !== null && typeof e == "object") {
			if (typeof e.then == "function") return Sl(e);
			if (e.$$typeof === k) return dt(e);
		}
		throw Error(r(438, String(e)));
	}
	function Cu(e) {
		var t = null,
			a = de.updateQueue;
		if ((a !== null && (t = a.memoCache), t == null)) {
			var l = de.alternate;
			l !== null &&
				((l = l.updateQueue),
				l !== null &&
					((l = l.memoCache),
					l != null &&
						(t = {
							data: l.data.map(function (o) {
								return o.slice();
							}),
							index: 0,
						})));
		}
		if (
			(t == null && (t = { data: [], index: 0 }),
			a === null && ((a = Qs()), (de.updateQueue = a)),
			(a.memoCache = t),
			(a = t.data[t.index]),
			a === void 0)
		)
			for (a = t.data[t.index] = Array(e), l = 0; l < e; l++) a[l] = Ce;
		return t.index++, a;
	}
	function Dn(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Fs(e) {
		var t = Qe();
		return ju(t, De, e);
	}
	function ju(e, t, a) {
		var l = e.queue;
		if (l === null) throw Error(r(311));
		l.lastRenderedReducer = a;
		var o = e.baseQueue,
			c = l.pending;
		if (c !== null) {
			if (o !== null) {
				var m = o.next;
				(o.next = c.next), (c.next = m);
			}
			(t.baseQueue = o = c), (l.pending = null);
		}
		if (((c = e.baseState), o === null)) e.memoizedState = c;
		else {
			t = o.next;
			var b = (m = null),
				S = null,
				D = t,
				_ = !1;
			do {
				var G = D.lane & -536870913;
				if (G !== D.lane ? (ve & G) === G : (Rn & G) === G) {
					var L = D.revertLane;
					if (L === 0)
						S !== null &&
							(S = S.next =
								{
									lane: 0,
									revertLane: 0,
									gesture: null,
									action: D.action,
									hasEagerState: D.hasEagerState,
									eagerState: D.eagerState,
									next: null,
								}),
							G === xi && (_ = !0);
					else if ((Rn & L) === L) {
						(D = D.next), L === xi && (_ = !0);
						continue;
					} else
						(G = {
							lane: 0,
							revertLane: D.revertLane,
							gesture: null,
							action: D.action,
							hasEagerState: D.hasEagerState,
							eagerState: D.eagerState,
							next: null,
						}),
							S === null ? ((b = S = G), (m = c)) : (S = S.next = G),
							(de.lanes |= L),
							(sa |= L);
					(G = D.action),
						Ha && a(c, G),
						(c = D.hasEagerState ? D.eagerState : a(c, G));
				} else
					(L = {
						lane: G,
						revertLane: D.revertLane,
						gesture: D.gesture,
						action: D.action,
						hasEagerState: D.hasEagerState,
						eagerState: D.eagerState,
						next: null,
					}),
						S === null ? ((b = S = L), (m = c)) : (S = S.next = L),
						(de.lanes |= G),
						(sa |= G);
				D = D.next;
			} while (D !== null && D !== t);
			if (
				(S === null ? (m = c) : (S.next = b),
				!Lt(c, e.memoizedState) && ((Je = !0), _ && ((a = yi), a !== null)))
			)
				throw a;
			(e.memoizedState = c),
				(e.baseState = m),
				(e.baseQueue = S),
				(l.lastRenderedState = c);
		}
		return o === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
	}
	function Tu(e) {
		var t = Qe(),
			a = t.queue;
		if (a === null) throw Error(r(311));
		a.lastRenderedReducer = e;
		var l = a.dispatch,
			o = a.pending,
			c = t.memoizedState;
		if (o !== null) {
			a.pending = null;
			var m = (o = o.next);
			do (c = e(c, m.action)), (m = m.next);
			while (m !== o);
			Lt(c, t.memoizedState) || (Je = !0),
				(t.memoizedState = c),
				t.baseQueue === null && (t.baseState = c),
				(a.lastRenderedState = c);
		}
		return [c, l];
	}
	function Ph(e, t, a) {
		var l = de,
			o = Qe(),
			c = Se;
		if (c) {
			if (a === void 0) throw Error(r(407));
			a = a();
		} else a = t();
		var m = !Lt((De || o).memoizedState, a);
		if (
			(m && ((o.memoizedState = a), (Je = !0)),
			(o = o.queue),
			Mu(Wh.bind(null, l, o, e), [e]),
			o.getSnapshot !== t || m || (Fe !== null && Fe.memoizedState.tag & 1))
		) {
			if (
				((l.flags |= 2048),
				ji(9, { destroy: void 0 }, Jh.bind(null, l, o, a, t), null),
				Ve === null)
			)
				throw Error(r(349));
			c || (Rn & 127) !== 0 || Fh(l, t, a);
		}
		return a;
	}
	function Fh(e, t, a) {
		(e.flags |= 16384),
			(e = { getSnapshot: t, value: a }),
			(t = de.updateQueue),
			t === null
				? ((t = Qs()), (de.updateQueue = t), (t.stores = [e]))
				: ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e));
	}
	function Jh(e, t, a, l) {
		(t.value = a), (t.getSnapshot = l), $h(t) && Ih(e);
	}
	function Wh(e, t, a) {
		return a(function () {
			$h(t) && Ih(e);
		});
	}
	function $h(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var a = t();
			return !Lt(e, a);
		} catch {
			return !0;
		}
	}
	function Ih(e) {
		var t = Ra(e, 2);
		t !== null && Et(t, e, 2);
	}
	function Au(e) {
		var t = yt();
		if (typeof e == "function") {
			var a = e;
			if (((e = a()), Ha)) {
				Kn(!0);
				try {
					a();
				} finally {
					Kn(!1);
				}
			}
		}
		return (
			(t.memoizedState = t.baseState = e),
			(t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Dn,
				lastRenderedState: e,
			}),
			t
		);
	}
	function e1(e, t, a, l) {
		return (e.baseState = a), ju(e, De, typeof l == "function" ? l : Dn);
	}
	function u4(e, t, a, l, o) {
		if ($s(e)) throw Error(r(485));
		if (((e = t.action), e !== null)) {
			var c = {
				payload: o,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function (m) {
					c.listeners.push(m);
				},
			};
			B.T !== null ? a(!0) : (c.isTransition = !1),
				l(c),
				(a = t.pending),
				a === null
					? ((c.next = t.pending = c), t1(t, c))
					: ((c.next = a.next), (t.pending = a.next = c));
		}
	}
	function t1(e, t) {
		var a = t.action,
			l = t.payload,
			o = e.state;
		if (t.isTransition) {
			var c = B.T,
				m = {};
			B.T = m;
			try {
				var b = a(o, l),
					S = B.S;
				S !== null && S(m, b), n1(e, t, b);
			} catch (D) {
				Eu(e, t, D);
			} finally {
				c !== null && m.types !== null && (c.types = m.types), (B.T = c);
			}
		} else
			try {
				(c = a(o, l)), n1(e, t, c);
			} catch (D) {
				Eu(e, t, D);
			}
	}
	function n1(e, t, a) {
		a !== null && typeof a == "object" && typeof a.then == "function"
			? a.then(
					function (l) {
						a1(e, t, l);
					},
					function (l) {
						return Eu(e, t, l);
					},
				)
			: a1(e, t, a);
	}
	function a1(e, t, a) {
		(t.status = "fulfilled"),
			(t.value = a),
			i1(t),
			(e.state = a),
			(t = e.pending),
			t !== null &&
				((a = t.next),
				a === t ? (e.pending = null) : ((a = a.next), (t.next = a), t1(e, a)));
	}
	function Eu(e, t, a) {
		var l = e.pending;
		if (((e.pending = null), l !== null)) {
			l = l.next;
			do (t.status = "rejected"), (t.reason = a), i1(t), (t = t.next);
			while (t !== l);
		}
		e.action = null;
	}
	function i1(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function l1(e, t) {
		return t;
	}
	function s1(e, t) {
		if (Se) {
			var a = Ve.formState;
			if (a !== null) {
				e: {
					var l = de;
					if (Se) {
						if (ke) {
							t: {
								for (var o = ke, c = Kt; o.nodeType !== 8; ) {
									if (!c) {
										o = null;
										break t;
									}
									if (((o = Pt(o.nextSibling)), o === null)) {
										o = null;
										break t;
									}
								}
								(c = o.data), (o = c === "F!" || c === "F" ? o : null);
							}
							if (o) {
								(ke = Pt(o.nextSibling)), (l = o.data === "F!");
								break e;
							}
						}
						Wn(l);
					}
					l = !1;
				}
				l && (t = a[0]);
			}
		}
		return (
			(a = yt()),
			(a.memoizedState = a.baseState = t),
			(l = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: l1,
				lastRenderedState: t,
			}),
			(a.queue = l),
			(a = T1.bind(null, de, l)),
			(l.dispatch = a),
			(l = Au(!1)),
			(c = zu.bind(null, de, !1, l.queue)),
			(l = yt()),
			(o = { state: t, dispatch: null, action: e, pending: null }),
			(l.queue = o),
			(a = u4.bind(null, de, o, c, a)),
			(o.dispatch = a),
			(l.memoizedState = e),
			[t, a, !1]
		);
	}
	function r1(e) {
		var t = Qe();
		return o1(t, De, e);
	}
	function o1(e, t, a) {
		if (
			((t = ju(e, t, l1)[0]),
			(e = Fs(Dn)[0]),
			typeof t == "object" && t !== null && typeof t.then == "function")
		)
			try {
				var l = Sl(t);
			} catch (m) {
				throw m === vi ? Hs : m;
			}
		else l = t;
		t = Qe();
		var o = t.queue,
			c = o.dispatch;
		return (
			a !== t.memoizedState &&
				((de.flags |= 2048),
				ji(9, { destroy: void 0 }, c4.bind(null, o, a), null)),
			[l, c, e]
		);
	}
	function c4(e, t) {
		e.action = t;
	}
	function u1(e) {
		var t = Qe(),
			a = De;
		if (a !== null) return o1(t, a, e);
		Qe(), (t = t.memoizedState), (a = Qe());
		var l = a.queue.dispatch;
		return (a.memoizedState = e), [t, l, !1];
	}
	function ji(e, t, a, l) {
		return (
			(e = { tag: e, create: a, deps: l, inst: t, next: null }),
			(t = de.updateQueue),
			t === null && ((t = Qs()), (de.updateQueue = t)),
			(a = t.lastEffect),
			a === null
				? (t.lastEffect = e.next = e)
				: ((l = a.next), (a.next = e), (e.next = l), (t.lastEffect = e)),
			e
		);
	}
	function c1() {
		return Qe().memoizedState;
	}
	function Js(e, t, a, l) {
		var o = yt();
		(de.flags |= e),
			(o.memoizedState = ji(
				1 | t,
				{ destroy: void 0 },
				a,
				l === void 0 ? null : l,
			));
	}
	function Ws(e, t, a, l) {
		var o = Qe();
		l = l === void 0 ? null : l;
		var c = o.memoizedState.inst;
		De !== null && l !== null && yu(l, De.memoizedState.deps)
			? (o.memoizedState = ji(t, c, a, l))
			: ((de.flags |= e), (o.memoizedState = ji(1 | t, c, a, l)));
	}
	function f1(e, t) {
		Js(8390656, 8, e, t);
	}
	function Mu(e, t) {
		Ws(2048, 8, e, t);
	}
	function f4(e) {
		de.flags |= 4;
		var t = de.updateQueue;
		if (t === null) (t = Qs()), (de.updateQueue = t), (t.events = [e]);
		else {
			var a = t.events;
			a === null ? (t.events = [e]) : a.push(e);
		}
	}
	function d1(e) {
		var t = Qe().memoizedState;
		return (
			f4({ ref: t, nextImpl: e }),
			function () {
				if ((Ee & 2) !== 0) throw Error(r(440));
				return t.impl.apply(void 0, arguments);
			}
		);
	}
	function h1(e, t) {
		return Ws(4, 2, e, t);
	}
	function m1(e, t) {
		return Ws(4, 4, e, t);
	}
	function p1(e, t) {
		if (typeof t == "function") {
			e = e();
			var a = t(e);
			return function () {
				typeof a == "function" ? a() : t(null);
			};
		}
		if (t != null)
			return (
				(e = e()),
				(t.current = e),
				function () {
					t.current = null;
				}
			);
	}
	function g1(e, t, a) {
		(a = a != null ? a.concat([e]) : null), Ws(4, 4, p1.bind(null, t, e), a);
	}
	function Nu() {}
	function x1(e, t) {
		var a = Qe();
		t = t === void 0 ? null : t;
		var l = a.memoizedState;
		return t !== null && yu(t, l[1]) ? l[0] : ((a.memoizedState = [e, t]), e);
	}
	function y1(e, t) {
		var a = Qe();
		t = t === void 0 ? null : t;
		var l = a.memoizedState;
		if (t !== null && yu(t, l[1])) return l[0];
		if (((l = e()), Ha)) {
			Kn(!0);
			try {
				e();
			} finally {
				Kn(!1);
			}
		}
		return (a.memoizedState = [l, t]), l;
	}
	function Ru(e, t, a) {
		return a === void 0 || ((Rn & 1073741824) !== 0 && (ve & 261930) === 0)
			? (e.memoizedState = t)
			: ((e.memoizedState = a), (e = vm()), (de.lanes |= e), (sa |= e), a);
	}
	function v1(e, t, a, l) {
		return Lt(a, t)
			? a
			: wi.current !== null
				? ((e = Ru(e, a, l)), Lt(e, t) || (Je = !0), e)
				: (Rn & 42) === 0 || ((Rn & 1073741824) !== 0 && (ve & 261930) === 0)
					? ((Je = !0), (e.memoizedState = a))
					: ((e = vm()), (de.lanes |= e), (sa |= e), t);
	}
	function b1(e, t, a, l, o) {
		var c = Z.p;
		Z.p = c !== 0 && 8 > c ? c : 8;
		var m = B.T,
			b = {};
		(B.T = b), zu(e, !1, t, a);
		try {
			var S = o(),
				D = B.S;
			if (
				(D !== null && D(b, S),
				S !== null && typeof S == "object" && typeof S.then == "function")
			) {
				var _ = s4(S, l);
				Cl(e, t, _, kt(e));
			} else Cl(e, t, l, kt(e));
		} catch (G) {
			Cl(e, t, { then: function () {}, status: "rejected", reason: G }, kt());
		} finally {
			(Z.p = c),
				m !== null && b.types !== null && (m.types = b.types),
				(B.T = m);
		}
	}
	function d4() {}
	function Du(e, t, a, l) {
		if (e.tag !== 5) throw Error(r(476));
		var o = w1(e).queue;
		b1(
			e,
			o,
			t,
			$,
			a === null
				? d4
				: function () {
						return S1(e), a(l);
					},
		);
	}
	function w1(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: $,
			baseState: $,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Dn,
				lastRenderedState: $,
			},
			next: null,
		};
		var a = {};
		return (
			(t.next = {
				memoizedState: a,
				baseState: a,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Dn,
					lastRenderedState: a,
				},
				next: null,
			}),
			(e.memoizedState = t),
			(e = e.alternate),
			e !== null && (e.memoizedState = t),
			t
		);
	}
	function S1(e) {
		var t = w1(e);
		t.next === null && (t = e.alternate.memoizedState),
			Cl(e, t.next.queue, {}, kt());
	}
	function Lu() {
		return dt(Ul);
	}
	function C1() {
		return Qe().memoizedState;
	}
	function j1() {
		return Qe().memoizedState;
	}
	function h4(e) {
		for (var t = e.return; t !== null; ) {
			switch (t.tag) {
				case 24:
				case 3:
					var a = kt();
					e = ea(a);
					var l = ta(t, e, a);
					l !== null && (Et(l, t, a), yl(l, t, a)),
						(t = { cache: ru() }),
						(e.payload = t);
					return;
			}
			t = t.return;
		}
	}
	function m4(e, t, a) {
		var l = kt();
		(a = {
			lane: l,
			revertLane: 0,
			gesture: null,
			action: a,
			hasEagerState: !1,
			eagerState: null,
			next: null,
		}),
			$s(e)
				? A1(t, a)
				: ((a = Jo(e, t, a, l)), a !== null && (Et(a, e, l), E1(a, t, l)));
	}
	function T1(e, t, a) {
		var l = kt();
		Cl(e, t, a, l);
	}
	function Cl(e, t, a, l) {
		var o = {
			lane: l,
			revertLane: 0,
			gesture: null,
			action: a,
			hasEagerState: !1,
			eagerState: null,
			next: null,
		};
		if ($s(e)) A1(t, o);
		else {
			var c = e.alternate;
			if (
				e.lanes === 0 &&
				(c === null || c.lanes === 0) &&
				((c = t.lastRenderedReducer), c !== null)
			)
				try {
					var m = t.lastRenderedState,
						b = c(m, a);
					if (((o.hasEagerState = !0), (o.eagerState = b), Lt(b, m)))
						return Ls(e, t, o, 0), Ve === null && Ds(), !1;
				} catch {}
			if (((a = Jo(e, t, o, l)), a !== null))
				return Et(a, e, l), E1(a, t, l), !0;
		}
		return !1;
	}
	function zu(e, t, a, l) {
		if (
			((l = {
				lane: 2,
				revertLane: fc(),
				gesture: null,
				action: l,
				hasEagerState: !1,
				eagerState: null,
				next: null,
			}),
			$s(e))
		) {
			if (t) throw Error(r(479));
		} else (t = Jo(e, a, l, 2)), t !== null && Et(t, e, 2);
	}
	function $s(e) {
		var t = e.alternate;
		return e === de || (t !== null && t === de);
	}
	function A1(e, t) {
		Si = Xs = !0;
		var a = e.pending;
		a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
			(e.pending = t);
	}
	function E1(e, t, a) {
		if ((a & 4194048) !== 0) {
			var l = t.lanes;
			(l &= e.pendingLanes), (a |= l), (t.lanes = a), Ld(e, a);
		}
	}
	var jl = {
		readContext: dt,
		use: Ps,
		useCallback: qe,
		useContext: qe,
		useEffect: qe,
		useImperativeHandle: qe,
		useLayoutEffect: qe,
		useInsertionEffect: qe,
		useMemo: qe,
		useReducer: qe,
		useRef: qe,
		useState: qe,
		useDebugValue: qe,
		useDeferredValue: qe,
		useTransition: qe,
		useSyncExternalStore: qe,
		useId: qe,
		useHostTransitionStatus: qe,
		useFormState: qe,
		useActionState: qe,
		useOptimistic: qe,
		useMemoCache: qe,
		useCacheRefresh: qe,
	};
	jl.useEffectEvent = qe;
	var M1 = {
			readContext: dt,
			use: Ps,
			useCallback: function (e, t) {
				return (yt().memoizedState = [e, t === void 0 ? null : t]), e;
			},
			useContext: dt,
			useEffect: f1,
			useImperativeHandle: function (e, t, a) {
				(a = a != null ? a.concat([e]) : null),
					Js(4194308, 4, p1.bind(null, t, e), a);
			},
			useLayoutEffect: function (e, t) {
				return Js(4194308, 4, e, t);
			},
			useInsertionEffect: function (e, t) {
				Js(4, 2, e, t);
			},
			useMemo: function (e, t) {
				var a = yt();
				t = t === void 0 ? null : t;
				var l = e();
				if (Ha) {
					Kn(!0);
					try {
						e();
					} finally {
						Kn(!1);
					}
				}
				return (a.memoizedState = [l, t]), l;
			},
			useReducer: function (e, t, a) {
				var l = yt();
				if (a !== void 0) {
					var o = a(t);
					if (Ha) {
						Kn(!0);
						try {
							a(t);
						} finally {
							Kn(!1);
						}
					}
				} else o = t;
				return (
					(l.memoizedState = l.baseState = o),
					(e = {
						pending: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: e,
						lastRenderedState: o,
					}),
					(l.queue = e),
					(e = e.dispatch = m4.bind(null, de, e)),
					[l.memoizedState, e]
				);
			},
			useRef: function (e) {
				var t = yt();
				return (e = { current: e }), (t.memoizedState = e);
			},
			useState: function (e) {
				e = Au(e);
				var t = e.queue,
					a = T1.bind(null, de, t);
				return (t.dispatch = a), [e.memoizedState, a];
			},
			useDebugValue: Nu,
			useDeferredValue: function (e, t) {
				var a = yt();
				return Ru(a, e, t);
			},
			useTransition: function () {
				var e = Au(!1);
				return (
					(e = b1.bind(null, de, e.queue, !0, !1)),
					(yt().memoizedState = e),
					[!1, e]
				);
			},
			useSyncExternalStore: function (e, t, a) {
				var l = de,
					o = yt();
				if (Se) {
					if (a === void 0) throw Error(r(407));
					a = a();
				} else {
					if (((a = t()), Ve === null)) throw Error(r(349));
					(ve & 127) !== 0 || Fh(l, t, a);
				}
				o.memoizedState = a;
				var c = { value: a, getSnapshot: t };
				return (
					(o.queue = c),
					f1(Wh.bind(null, l, c, e), [e]),
					(l.flags |= 2048),
					ji(9, { destroy: void 0 }, Jh.bind(null, l, c, a, t), null),
					a
				);
			},
			useId: function () {
				var e = yt(),
					t = Ve.identifierPrefix;
				if (Se) {
					var a = dn,
						l = fn;
					(a = (l & ~(1 << (32 - Dt(l) - 1))).toString(32) + a),
						(t = "_" + t + "R_" + a),
						(a = Ks++),
						0 < a && (t += "H" + a.toString(32)),
						(t += "_");
				} else (a = r4++), (t = "_" + t + "r_" + a.toString(32) + "_");
				return (e.memoizedState = t);
			},
			useHostTransitionStatus: Lu,
			useFormState: s1,
			useActionState: s1,
			useOptimistic: function (e) {
				var t = yt();
				t.memoizedState = t.baseState = e;
				var a = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: null,
					lastRenderedState: null,
				};
				return (
					(t.queue = a),
					(t = zu.bind(null, de, !0, a)),
					(a.dispatch = t),
					[e, t]
				);
			},
			useMemoCache: Cu,
			useCacheRefresh: function () {
				return (yt().memoizedState = h4.bind(null, de));
			},
			useEffectEvent: function (e) {
				var t = yt(),
					a = { impl: e };
				return (
					(t.memoizedState = a),
					function () {
						if ((Ee & 2) !== 0) throw Error(r(440));
						return a.impl.apply(void 0, arguments);
					}
				);
			},
		},
		Ou = {
			readContext: dt,
			use: Ps,
			useCallback: x1,
			useContext: dt,
			useEffect: Mu,
			useImperativeHandle: g1,
			useInsertionEffect: h1,
			useLayoutEffect: m1,
			useMemo: y1,
			useReducer: Fs,
			useRef: c1,
			useState: function () {
				return Fs(Dn);
			},
			useDebugValue: Nu,
			useDeferredValue: function (e, t) {
				var a = Qe();
				return v1(a, De.memoizedState, e, t);
			},
			useTransition: function () {
				var e = Fs(Dn)[0],
					t = Qe().memoizedState;
				return [typeof e == "boolean" ? e : Sl(e), t];
			},
			useSyncExternalStore: Ph,
			useId: C1,
			useHostTransitionStatus: Lu,
			useFormState: r1,
			useActionState: r1,
			useOptimistic: function (e, t) {
				var a = Qe();
				return e1(a, De, e, t);
			},
			useMemoCache: Cu,
			useCacheRefresh: j1,
		};
	Ou.useEffectEvent = d1;
	var N1 = {
		readContext: dt,
		use: Ps,
		useCallback: x1,
		useContext: dt,
		useEffect: Mu,
		useImperativeHandle: g1,
		useInsertionEffect: h1,
		useLayoutEffect: m1,
		useMemo: y1,
		useReducer: Tu,
		useRef: c1,
		useState: function () {
			return Tu(Dn);
		},
		useDebugValue: Nu,
		useDeferredValue: function (e, t) {
			var a = Qe();
			return De === null ? Ru(a, e, t) : v1(a, De.memoizedState, e, t);
		},
		useTransition: function () {
			var e = Tu(Dn)[0],
				t = Qe().memoizedState;
			return [typeof e == "boolean" ? e : Sl(e), t];
		},
		useSyncExternalStore: Ph,
		useId: C1,
		useHostTransitionStatus: Lu,
		useFormState: u1,
		useActionState: u1,
		useOptimistic: function (e, t) {
			var a = Qe();
			return De !== null
				? e1(a, De, e, t)
				: ((a.baseState = e), [e, a.queue.dispatch]);
		},
		useMemoCache: Cu,
		useCacheRefresh: j1,
	};
	N1.useEffectEvent = d1;
	function Vu(e, t, a, l) {
		(t = e.memoizedState),
			(a = a(l, t)),
			(a = a == null ? t : v({}, t, a)),
			(e.memoizedState = a),
			e.lanes === 0 && (e.updateQueue.baseState = a);
	}
	var Bu = {
		enqueueSetState: function (e, t, a) {
			e = e._reactInternals;
			var l = kt(),
				o = ea(l);
			(o.payload = t),
				a != null && (o.callback = a),
				(t = ta(e, o, l)),
				t !== null && (Et(t, e, l), yl(t, e, l));
		},
		enqueueReplaceState: function (e, t, a) {
			e = e._reactInternals;
			var l = kt(),
				o = ea(l);
			(o.tag = 1),
				(o.payload = t),
				a != null && (o.callback = a),
				(t = ta(e, o, l)),
				t !== null && (Et(t, e, l), yl(t, e, l));
		},
		enqueueForceUpdate: function (e, t) {
			e = e._reactInternals;
			var a = kt(),
				l = ea(a);
			(l.tag = 2),
				t != null && (l.callback = t),
				(t = ta(e, l, a)),
				t !== null && (Et(t, e, a), yl(t, e, a));
		},
	};
	function R1(e, t, a, l, o, c, m) {
		return (
			(e = e.stateNode),
			typeof e.shouldComponentUpdate == "function"
				? e.shouldComponentUpdate(l, c, m)
				: t.prototype && t.prototype.isPureReactComponent
					? !cl(a, l) || !cl(o, c)
					: !0
		);
	}
	function D1(e, t, a, l) {
		(e = t.state),
			typeof t.componentWillReceiveProps == "function" &&
				t.componentWillReceiveProps(a, l),
			typeof t.UNSAFE_componentWillReceiveProps == "function" &&
				t.UNSAFE_componentWillReceiveProps(a, l),
			t.state !== e && Bu.enqueueReplaceState(t, t.state, null);
	}
	function Ua(e, t) {
		var a = t;
		if ("ref" in t) {
			a = {};
			for (var l in t) l !== "ref" && (a[l] = t[l]);
		}
		if ((e = e.defaultProps)) {
			a === t && (a = v({}, a));
			for (var o in e) a[o] === void 0 && (a[o] = e[o]);
		}
		return a;
	}
	function L1(e) {
		Rs(e);
	}
	function z1(e) {
		console.error(e);
	}
	function O1(e) {
		Rs(e);
	}
	function Is(e, t) {
		try {
			var a = e.onUncaughtError;
			a(t.value, { componentStack: t.stack });
		} catch (l) {
			setTimeout(function () {
				throw l;
			});
		}
	}
	function V1(e, t, a) {
		try {
			var l = e.onCaughtError;
			l(a.value, {
				componentStack: a.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null,
			});
		} catch (o) {
			setTimeout(function () {
				throw o;
			});
		}
	}
	function _u(e, t, a) {
		return (
			(a = ea(a)),
			(a.tag = 3),
			(a.payload = { element: null }),
			(a.callback = function () {
				Is(e, t);
			}),
			a
		);
	}
	function B1(e) {
		return (e = ea(e)), (e.tag = 3), e;
	}
	function _1(e, t, a, l) {
		var o = a.type.getDerivedStateFromError;
		if (typeof o == "function") {
			var c = l.value;
			(e.payload = function () {
				return o(c);
			}),
				(e.callback = function () {
					V1(t, a, l);
				});
		}
		var m = a.stateNode;
		m !== null &&
			typeof m.componentDidCatch == "function" &&
			(e.callback = function () {
				V1(t, a, l),
					typeof o != "function" &&
						(ra === null ? (ra = new Set([this])) : ra.add(this));
				var b = l.stack;
				this.componentDidCatch(l.value, {
					componentStack: b !== null ? b : "",
				});
			});
	}
	function p4(e, t, a, l, o) {
		if (
			((a.flags |= 32768),
			l !== null && typeof l == "object" && typeof l.then == "function")
		) {
			if (
				((t = a.alternate),
				t !== null && gi(t, a, o, !0),
				(a = Ot.current),
				a !== null)
			) {
				switch (a.tag) {
					case 31:
					case 13:
						return (
							Qt === null ? fr() : a.alternate === null && Ze === 0 && (Ze = 3),
							(a.flags &= -257),
							(a.flags |= 65536),
							(a.lanes = o),
							l === Us
								? (a.flags |= 16384)
								: ((t = a.updateQueue),
									t === null ? (a.updateQueue = new Set([l])) : t.add(l),
									oc(e, l, o)),
							!1
						);
					case 22:
						return (
							(a.flags |= 65536),
							l === Us
								? (a.flags |= 16384)
								: ((t = a.updateQueue),
									t === null
										? ((t = {
												transitions: null,
												markerInstances: null,
												retryQueue: new Set([l]),
											}),
											(a.updateQueue = t))
										: ((a = t.retryQueue),
											a === null ? (t.retryQueue = new Set([l])) : a.add(l)),
									oc(e, l, o)),
							!1
						);
				}
				throw Error(r(435, a.tag));
			}
			return oc(e, l, o), fr(), !1;
		}
		if (Se)
			return (
				(t = Ot.current),
				t !== null
					? ((t.flags & 65536) === 0 && (t.flags |= 256),
						(t.flags |= 65536),
						(t.lanes = o),
						l !== nu && ((e = Error(r(422), { cause: l })), hl(qt(e, a))))
					: (l !== nu && ((t = Error(r(423), { cause: l })), hl(qt(t, a))),
						(e = e.current.alternate),
						(e.flags |= 65536),
						(o &= -o),
						(e.lanes |= o),
						(l = qt(l, a)),
						(o = _u(e.stateNode, l, o)),
						hu(e, o),
						Ze !== 4 && (Ze = 2)),
				!1
			);
		var c = Error(r(520), { cause: l });
		if (
			((c = qt(c, a)),
			Ll === null ? (Ll = [c]) : Ll.push(c),
			Ze !== 4 && (Ze = 2),
			t === null)
		)
			return !0;
		(l = qt(l, a)), (a = t);
		do {
			switch (a.tag) {
				case 3:
					return (
						(a.flags |= 65536),
						(e = o & -o),
						(a.lanes |= e),
						(e = _u(a.stateNode, l, e)),
						hu(a, e),
						!1
					);
				case 1:
					if (
						((t = a.type),
						(c = a.stateNode),
						(a.flags & 128) === 0 &&
							(typeof t.getDerivedStateFromError == "function" ||
								(c !== null &&
									typeof c.componentDidCatch == "function" &&
									(ra === null || !ra.has(c)))))
					)
						return (
							(a.flags |= 65536),
							(o &= -o),
							(a.lanes |= o),
							(o = B1(o)),
							_1(o, e, a, l),
							hu(a, o),
							!1
						);
			}
			a = a.return;
		} while (a !== null);
		return !1;
	}
	var ku = Error(r(461)),
		Je = !1;
	function ht(e, t, a, l) {
		t.child = e === null ? Gh(t, null, a, l) : ka(t, e.child, a, l);
	}
	function k1(e, t, a, l, o) {
		a = a.render;
		var c = t.ref;
		if ("ref" in l) {
			var m = {};
			for (var b in l) b !== "ref" && (m[b] = l[b]);
		} else m = l;
		return (
			Oa(t),
			(l = vu(e, t, a, m, c, o)),
			(b = bu()),
			e !== null && !Je
				? (wu(e, t, o), Ln(e, t, o))
				: (Se && b && eu(t), (t.flags |= 1), ht(e, t, l, o), t.child)
		);
	}
	function H1(e, t, a, l, o) {
		if (e === null) {
			var c = a.type;
			return typeof c == "function" &&
				!Wo(c) &&
				c.defaultProps === void 0 &&
				a.compare === null
				? ((t.tag = 15), (t.type = c), U1(e, t, c, l, o))
				: ((e = Os(a.type, null, l, t, t.mode, o)),
					(e.ref = t.ref),
					(e.return = t),
					(t.child = e));
		}
		if (((c = e.child), !Ku(e, o))) {
			var m = c.memoizedProps;
			if (
				((a = a.compare), (a = a !== null ? a : cl), a(m, l) && e.ref === t.ref)
			)
				return Ln(e, t, o);
		}
		return (
			(t.flags |= 1),
			(e = An(c, l)),
			(e.ref = t.ref),
			(e.return = t),
			(t.child = e)
		);
	}
	function U1(e, t, a, l, o) {
		if (e !== null) {
			var c = e.memoizedProps;
			if (cl(c, l) && e.ref === t.ref)
				if (((Je = !1), (t.pendingProps = l = c), Ku(e, o)))
					(e.flags & 131072) !== 0 && (Je = !0);
				else return (t.lanes = e.lanes), Ln(e, t, o);
		}
		return Hu(e, t, a, l, o);
	}
	function G1(e, t, a, l) {
		var o = l.children,
			c = e !== null ? e.memoizedState : null;
		if (
			(e === null &&
				t.stateNode === null &&
				(t.stateNode = {
					_visibility: 1,
					_pendingMarkers: null,
					_retryCache: null,
					_transitions: null,
				}),
			l.mode === "hidden")
		) {
			if ((t.flags & 128) !== 0) {
				if (((c = c !== null ? c.baseLanes | a : a), e !== null)) {
					for (l = t.child = e.child, o = 0; l !== null; )
						(o = o | l.lanes | l.childLanes), (l = l.sibling);
					l = o & ~c;
				} else (l = 0), (t.child = null);
				return Y1(e, t, c, a, l);
			}
			if ((a & 536870912) !== 0)
				(t.memoizedState = { baseLanes: 0, cachePool: null }),
					e !== null && ks(t, c !== null ? c.cachePool : null),
					c !== null ? Zh(t, c) : pu(),
					Xh(t);
			else
				return (
					(l = t.lanes = 536870912),
					Y1(e, t, c !== null ? c.baseLanes | a : a, a, l)
				);
		} else
			c !== null
				? (ks(t, c.cachePool), Zh(t, c), aa(), (t.memoizedState = null))
				: (e !== null && ks(t, null), pu(), aa());
		return ht(e, t, o, a), t.child;
	}
	function Tl(e, t) {
		return (
			(e !== null && e.tag === 22) ||
				t.stateNode !== null ||
				(t.stateNode = {
					_visibility: 1,
					_pendingMarkers: null,
					_retryCache: null,
					_transitions: null,
				}),
			t.sibling
		);
	}
	function Y1(e, t, a, l, o) {
		var c = uu();
		return (
			(c = c === null ? null : { parent: Pe._currentValue, pool: c }),
			(t.memoizedState = { baseLanes: a, cachePool: c }),
			e !== null && ks(t, null),
			pu(),
			Xh(t),
			e !== null && gi(e, t, l, !0),
			(t.childLanes = o),
			null
		);
	}
	function er(e, t) {
		return (
			(t = nr({ mode: t.mode, children: t.children }, e.mode)),
			(t.ref = e.ref),
			(e.child = t),
			(t.return = e),
			t
		);
	}
	function q1(e, t, a) {
		return (
			ka(t, e.child, null, a),
			(e = er(t, t.pendingProps)),
			(e.flags |= 2),
			Vt(t),
			(t.memoizedState = null),
			e
		);
	}
	function g4(e, t, a) {
		var l = t.pendingProps,
			o = (t.flags & 128) !== 0;
		if (((t.flags &= -129), e === null)) {
			if (Se) {
				if (l.mode === "hidden")
					return (e = er(t, l)), (t.lanes = 536870912), Tl(null, e);
				if (
					(xu(t),
					(e = ke)
						? ((e = t0(e, Kt)),
							(e = e !== null && e.data === "&" ? e : null),
							e !== null &&
								((t.memoizedState = {
									dehydrated: e,
									treeContext: Fn !== null ? { id: fn, overflow: dn } : null,
									retryLane: 536870912,
									hydrationErrors: null,
								}),
								(a = Ah(e)),
								(a.return = t),
								(t.child = a),
								(ft = t),
								(ke = null)))
						: (e = null),
					e === null)
				)
					throw Wn(t);
				return (t.lanes = 536870912), null;
			}
			return er(t, l);
		}
		var c = e.memoizedState;
		if (c !== null) {
			var m = c.dehydrated;
			if ((xu(t), o))
				if (t.flags & 256) (t.flags &= -257), (t = q1(e, t, a));
				else if (t.memoizedState !== null)
					(t.child = e.child), (t.flags |= 128), (t = null);
				else throw Error(r(558));
			else if (
				(Je || gi(e, t, a, !1), (o = (a & e.childLanes) !== 0), Je || o)
			) {
				if (
					((l = Ve),
					l !== null && ((m = zd(l, a)), m !== 0 && m !== c.retryLane))
				)
					throw ((c.retryLane = m), Ra(e, m), Et(l, e, m), ku);
				fr(), (t = q1(e, t, a));
			} else
				(e = c.treeContext),
					(ke = Pt(m.nextSibling)),
					(ft = t),
					(Se = !0),
					(Jn = null),
					(Kt = !1),
					e !== null && Nh(t, e),
					(t = er(t, l)),
					(t.flags |= 4096);
			return t;
		}
		return (
			(e = An(e.child, { mode: l.mode, children: l.children })),
			(e.ref = t.ref),
			(t.child = e),
			(e.return = t),
			e
		);
	}
	function tr(e, t) {
		var a = t.ref;
		if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof a != "function" && typeof a != "object") throw Error(r(284));
			(e === null || e.ref !== a) && (t.flags |= 4194816);
		}
	}
	function Hu(e, t, a, l, o) {
		return (
			Oa(t),
			(a = vu(e, t, a, l, void 0, o)),
			(l = bu()),
			e !== null && !Je
				? (wu(e, t, o), Ln(e, t, o))
				: (Se && l && eu(t), (t.flags |= 1), ht(e, t, a, o), t.child)
		);
	}
	function Z1(e, t, a, l, o, c) {
		return (
			Oa(t),
			(t.updateQueue = null),
			(a = Qh(t, l, a, o)),
			Kh(e),
			(l = bu()),
			e !== null && !Je
				? (wu(e, t, c), Ln(e, t, c))
				: (Se && l && eu(t), (t.flags |= 1), ht(e, t, a, c), t.child)
		);
	}
	function X1(e, t, a, l, o) {
		if ((Oa(t), t.stateNode === null)) {
			var c = di,
				m = a.contextType;
			typeof m == "object" && m !== null && (c = dt(m)),
				(c = new a(l, c)),
				(t.memoizedState =
					c.state !== null && c.state !== void 0 ? c.state : null),
				(c.updater = Bu),
				(t.stateNode = c),
				(c._reactInternals = t),
				(c = t.stateNode),
				(c.props = l),
				(c.state = t.memoizedState),
				(c.refs = {}),
				fu(t),
				(m = a.contextType),
				(c.context = typeof m == "object" && m !== null ? dt(m) : di),
				(c.state = t.memoizedState),
				(m = a.getDerivedStateFromProps),
				typeof m == "function" && (Vu(t, a, m, l), (c.state = t.memoizedState)),
				typeof a.getDerivedStateFromProps == "function" ||
					typeof c.getSnapshotBeforeUpdate == "function" ||
					(typeof c.UNSAFE_componentWillMount != "function" &&
						typeof c.componentWillMount != "function") ||
					((m = c.state),
					typeof c.componentWillMount == "function" && c.componentWillMount(),
					typeof c.UNSAFE_componentWillMount == "function" &&
						c.UNSAFE_componentWillMount(),
					m !== c.state && Bu.enqueueReplaceState(c, c.state, null),
					bl(t, l, c, o),
					vl(),
					(c.state = t.memoizedState)),
				typeof c.componentDidMount == "function" && (t.flags |= 4194308),
				(l = !0);
		} else if (e === null) {
			c = t.stateNode;
			var b = t.memoizedProps,
				S = Ua(a, b);
			c.props = S;
			var D = c.context,
				_ = a.contextType;
			(m = di), typeof _ == "object" && _ !== null && (m = dt(_));
			var G = a.getDerivedStateFromProps;
			(_ =
				typeof G == "function" ||
				typeof c.getSnapshotBeforeUpdate == "function"),
				(b = t.pendingProps !== b),
				_ ||
					(typeof c.UNSAFE_componentWillReceiveProps != "function" &&
						typeof c.componentWillReceiveProps != "function") ||
					((b || D !== m) && D1(t, c, l, m)),
				(In = !1);
			var L = t.memoizedState;
			(c.state = L),
				bl(t, l, c, o),
				vl(),
				(D = t.memoizedState),
				b || L !== D || In
					? (typeof G == "function" && (Vu(t, a, G, l), (D = t.memoizedState)),
						(S = In || R1(t, a, S, l, L, D, m))
							? (_ ||
									(typeof c.UNSAFE_componentWillMount != "function" &&
										typeof c.componentWillMount != "function") ||
									(typeof c.componentWillMount == "function" &&
										c.componentWillMount(),
									typeof c.UNSAFE_componentWillMount == "function" &&
										c.UNSAFE_componentWillMount()),
								typeof c.componentDidMount == "function" &&
									(t.flags |= 4194308))
							: (typeof c.componentDidMount == "function" &&
									(t.flags |= 4194308),
								(t.memoizedProps = l),
								(t.memoizedState = D)),
						(c.props = l),
						(c.state = D),
						(c.context = m),
						(l = S))
					: (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
						(l = !1));
		} else {
			(c = t.stateNode),
				du(e, t),
				(m = t.memoizedProps),
				(_ = Ua(a, m)),
				(c.props = _),
				(G = t.pendingProps),
				(L = c.context),
				(D = a.contextType),
				(S = di),
				typeof D == "object" && D !== null && (S = dt(D)),
				(b = a.getDerivedStateFromProps),
				(D =
					typeof b == "function" ||
					typeof c.getSnapshotBeforeUpdate == "function") ||
					(typeof c.UNSAFE_componentWillReceiveProps != "function" &&
						typeof c.componentWillReceiveProps != "function") ||
					((m !== G || L !== S) && D1(t, c, l, S)),
				(In = !1),
				(L = t.memoizedState),
				(c.state = L),
				bl(t, l, c, o),
				vl();
			var O = t.memoizedState;
			m !== G ||
			L !== O ||
			In ||
			(e !== null && e.dependencies !== null && Bs(e.dependencies))
				? (typeof b == "function" && (Vu(t, a, b, l), (O = t.memoizedState)),
					(_ =
						In ||
						R1(t, a, _, l, L, O, S) ||
						(e !== null && e.dependencies !== null && Bs(e.dependencies)))
						? (D ||
								(typeof c.UNSAFE_componentWillUpdate != "function" &&
									typeof c.componentWillUpdate != "function") ||
								(typeof c.componentWillUpdate == "function" &&
									c.componentWillUpdate(l, O, S),
								typeof c.UNSAFE_componentWillUpdate == "function" &&
									c.UNSAFE_componentWillUpdate(l, O, S)),
							typeof c.componentDidUpdate == "function" && (t.flags |= 4),
							typeof c.getSnapshotBeforeUpdate == "function" &&
								(t.flags |= 1024))
						: (typeof c.componentDidUpdate != "function" ||
								(m === e.memoizedProps && L === e.memoizedState) ||
								(t.flags |= 4),
							typeof c.getSnapshotBeforeUpdate != "function" ||
								(m === e.memoizedProps && L === e.memoizedState) ||
								(t.flags |= 1024),
							(t.memoizedProps = l),
							(t.memoizedState = O)),
					(c.props = l),
					(c.state = O),
					(c.context = S),
					(l = _))
				: (typeof c.componentDidUpdate != "function" ||
						(m === e.memoizedProps && L === e.memoizedState) ||
						(t.flags |= 4),
					typeof c.getSnapshotBeforeUpdate != "function" ||
						(m === e.memoizedProps && L === e.memoizedState) ||
						(t.flags |= 1024),
					(l = !1));
		}
		return (
			(c = l),
			tr(e, t),
			(l = (t.flags & 128) !== 0),
			c || l
				? ((c = t.stateNode),
					(a =
						l && typeof a.getDerivedStateFromError != "function"
							? null
							: c.render()),
					(t.flags |= 1),
					e !== null && l
						? ((t.child = ka(t, e.child, null, o)),
							(t.child = ka(t, null, a, o)))
						: ht(e, t, a, o),
					(t.memoizedState = c.state),
					(e = t.child))
				: (e = Ln(e, t, o)),
			e
		);
	}
	function K1(e, t, a, l) {
		return La(), (t.flags |= 256), ht(e, t, a, l), t.child;
	}
	var Uu = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null,
	};
	function Gu(e) {
		return { baseLanes: e, cachePool: Vh() };
	}
	function Yu(e, t, a) {
		return (e = e !== null ? e.childLanes & ~a : 0), t && (e |= _t), e;
	}
	function Q1(e, t, a) {
		var l = t.pendingProps,
			o = !1,
			c = (t.flags & 128) !== 0,
			m;
		if (
			((m = c) ||
				(m =
					e !== null && e.memoizedState === null ? !1 : (Ke.current & 2) !== 0),
			m && ((o = !0), (t.flags &= -129)),
			(m = (t.flags & 32) !== 0),
			(t.flags &= -33),
			e === null)
		) {
			if (Se) {
				if (
					(o ? na(t) : aa(),
					(e = ke)
						? ((e = t0(e, Kt)),
							(e = e !== null && e.data !== "&" ? e : null),
							e !== null &&
								((t.memoizedState = {
									dehydrated: e,
									treeContext: Fn !== null ? { id: fn, overflow: dn } : null,
									retryLane: 536870912,
									hydrationErrors: null,
								}),
								(a = Ah(e)),
								(a.return = t),
								(t.child = a),
								(ft = t),
								(ke = null)))
						: (e = null),
					e === null)
				)
					throw Wn(t);
				return jc(e) ? (t.lanes = 32) : (t.lanes = 536870912), null;
			}
			var b = l.children;
			return (
				(l = l.fallback),
				o
					? (aa(),
						(o = t.mode),
						(b = nr({ mode: "hidden", children: b }, o)),
						(l = Da(l, o, a, null)),
						(b.return = t),
						(l.return = t),
						(b.sibling = l),
						(t.child = b),
						(l = t.child),
						(l.memoizedState = Gu(a)),
						(l.childLanes = Yu(e, m, a)),
						(t.memoizedState = Uu),
						Tl(null, l))
					: (na(t), qu(t, b))
			);
		}
		var S = e.memoizedState;
		if (S !== null && ((b = S.dehydrated), b !== null)) {
			if (c)
				t.flags & 256
					? (na(t), (t.flags &= -257), (t = Zu(e, t, a)))
					: t.memoizedState !== null
						? (aa(), (t.child = e.child), (t.flags |= 128), (t = null))
						: (aa(),
							(b = l.fallback),
							(o = t.mode),
							(l = nr({ mode: "visible", children: l.children }, o)),
							(b = Da(b, o, a, null)),
							(b.flags |= 2),
							(l.return = t),
							(b.return = t),
							(l.sibling = b),
							(t.child = l),
							ka(t, e.child, null, a),
							(l = t.child),
							(l.memoizedState = Gu(a)),
							(l.childLanes = Yu(e, m, a)),
							(t.memoizedState = Uu),
							(t = Tl(null, l)));
			else if ((na(t), jc(b))) {
				if (((m = b.nextSibling && b.nextSibling.dataset), m)) var D = m.dgst;
				(m = D),
					(l = Error(r(419))),
					(l.stack = ""),
					(l.digest = m),
					hl({ value: l, source: null, stack: null }),
					(t = Zu(e, t, a));
			} else if (
				(Je || gi(e, t, a, !1), (m = (a & e.childLanes) !== 0), Je || m)
			) {
				if (
					((m = Ve),
					m !== null && ((l = zd(m, a)), l !== 0 && l !== S.retryLane))
				)
					throw ((S.retryLane = l), Ra(e, l), Et(m, e, l), ku);
				Cc(b) || fr(), (t = Zu(e, t, a));
			} else
				Cc(b)
					? ((t.flags |= 192), (t.child = e.child), (t = null))
					: ((e = S.treeContext),
						(ke = Pt(b.nextSibling)),
						(ft = t),
						(Se = !0),
						(Jn = null),
						(Kt = !1),
						e !== null && Nh(t, e),
						(t = qu(t, l.children)),
						(t.flags |= 4096));
			return t;
		}
		return o
			? (aa(),
				(b = l.fallback),
				(o = t.mode),
				(S = e.child),
				(D = S.sibling),
				(l = An(S, { mode: "hidden", children: l.children })),
				(l.subtreeFlags = S.subtreeFlags & 65011712),
				D !== null ? (b = An(D, b)) : ((b = Da(b, o, a, null)), (b.flags |= 2)),
				(b.return = t),
				(l.return = t),
				(l.sibling = b),
				(t.child = l),
				Tl(null, l),
				(l = t.child),
				(b = e.child.memoizedState),
				b === null
					? (b = Gu(a))
					: ((o = b.cachePool),
						o !== null
							? ((S = Pe._currentValue),
								(o = o.parent !== S ? { parent: S, pool: S } : o))
							: (o = Vh()),
						(b = { baseLanes: b.baseLanes | a, cachePool: o })),
				(l.memoizedState = b),
				(l.childLanes = Yu(e, m, a)),
				(t.memoizedState = Uu),
				Tl(e.child, l))
			: (na(t),
				(a = e.child),
				(e = a.sibling),
				(a = An(a, { mode: "visible", children: l.children })),
				(a.return = t),
				(a.sibling = null),
				e !== null &&
					((m = t.deletions),
					m === null ? ((t.deletions = [e]), (t.flags |= 16)) : m.push(e)),
				(t.child = a),
				(t.memoizedState = null),
				a);
	}
	function qu(e, t) {
		return (
			(t = nr({ mode: "visible", children: t }, e.mode)),
			(t.return = e),
			(e.child = t)
		);
	}
	function nr(e, t) {
		return (e = zt(22, e, null, t)), (e.lanes = 0), e;
	}
	function Zu(e, t, a) {
		return (
			ka(t, e.child, null, a),
			(e = qu(t, t.pendingProps.children)),
			(e.flags |= 2),
			(t.memoizedState = null),
			e
		);
	}
	function P1(e, t, a) {
		e.lanes |= t;
		var l = e.alternate;
		l !== null && (l.lanes |= t), lu(e.return, t, a);
	}
	function Xu(e, t, a, l, o, c) {
		var m = e.memoizedState;
		m === null
			? (e.memoizedState = {
					isBackwards: t,
					rendering: null,
					renderingStartTime: 0,
					last: l,
					tail: a,
					tailMode: o,
					treeForkCount: c,
				})
			: ((m.isBackwards = t),
				(m.rendering = null),
				(m.renderingStartTime = 0),
				(m.last = l),
				(m.tail = a),
				(m.tailMode = o),
				(m.treeForkCount = c));
	}
	function F1(e, t, a) {
		var l = t.pendingProps,
			o = l.revealOrder,
			c = l.tail;
		l = l.children;
		var m = Ke.current,
			b = (m & 2) !== 0;
		if (
			(b ? ((m = (m & 1) | 2), (t.flags |= 128)) : (m &= 1),
			F(Ke, m),
			ht(e, t, l, a),
			(l = Se ? dl : 0),
			!b && e !== null && (e.flags & 128) !== 0)
		)
			e: for (e = t.child; e !== null; ) {
				if (e.tag === 13) e.memoizedState !== null && P1(e, a, t);
				else if (e.tag === 19) P1(e, a, t);
				else if (e.child !== null) {
					(e.child.return = e), (e = e.child);
					continue;
				}
				if (e === t) break e;
				for (; e.sibling === null; ) {
					if (e.return === null || e.return === t) break e;
					e = e.return;
				}
				(e.sibling.return = e.return), (e = e.sibling);
			}
		switch (o) {
			case "forwards":
				for (a = t.child, o = null; a !== null; )
					(e = a.alternate),
						e !== null && Zs(e) === null && (o = a),
						(a = a.sibling);
				(a = o),
					a === null
						? ((o = t.child), (t.child = null))
						: ((o = a.sibling), (a.sibling = null)),
					Xu(t, !1, o, a, c, l);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (a = null, o = t.child, t.child = null; o !== null; ) {
					if (((e = o.alternate), e !== null && Zs(e) === null)) {
						t.child = o;
						break;
					}
					(e = o.sibling), (o.sibling = a), (a = o), (o = e);
				}
				Xu(t, !0, a, null, c, l);
				break;
			case "together":
				Xu(t, !1, null, null, void 0, l);
				break;
			default:
				t.memoizedState = null;
		}
		return t.child;
	}
	function Ln(e, t, a) {
		if (
			(e !== null && (t.dependencies = e.dependencies),
			(sa |= t.lanes),
			(a & t.childLanes) === 0)
		)
			if (e !== null) {
				if ((gi(e, t, a, !1), (a & t.childLanes) === 0)) return null;
			} else return null;
		if (e !== null && t.child !== e.child) throw Error(r(153));
		if (t.child !== null) {
			for (
				e = t.child, a = An(e, e.pendingProps), t.child = a, a.return = t;
				e.sibling !== null;
			)
				(e = e.sibling),
					(a = a.sibling = An(e, e.pendingProps)),
					(a.return = t);
			a.sibling = null;
		}
		return t.child;
	}
	function Ku(e, t) {
		return (e.lanes & t) !== 0
			? !0
			: ((e = e.dependencies), !!(e !== null && Bs(e)));
	}
	function x4(e, t, a) {
		switch (t.tag) {
			case 3:
				lt(t, t.stateNode.containerInfo),
					$n(t, Pe, e.memoizedState.cache),
					La();
				break;
			case 27:
			case 5:
				Zn(t);
				break;
			case 4:
				lt(t, t.stateNode.containerInfo);
				break;
			case 10:
				$n(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return (t.flags |= 128), xu(t), null;
				break;
			case 13:
				var l = t.memoizedState;
				if (l !== null)
					return l.dehydrated !== null
						? (na(t), (t.flags |= 128), null)
						: (a & t.child.childLanes) !== 0
							? Q1(e, t, a)
							: (na(t), (e = Ln(e, t, a)), e !== null ? e.sibling : null);
				na(t);
				break;
			case 19:
				var o = (e.flags & 128) !== 0;
				if (
					((l = (a & t.childLanes) !== 0),
					l || (gi(e, t, a, !1), (l = (a & t.childLanes) !== 0)),
					o)
				) {
					if (l) return F1(e, t, a);
					t.flags |= 128;
				}
				if (
					((o = t.memoizedState),
					o !== null &&
						((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
					F(Ke, Ke.current),
					l)
				)
					break;
				return null;
			case 22:
				return (t.lanes = 0), G1(e, t, a, t.pendingProps);
			case 24:
				$n(t, Pe, e.memoizedState.cache);
		}
		return Ln(e, t, a);
	}
	function J1(e, t, a) {
		if (e !== null)
			if (e.memoizedProps !== t.pendingProps) Je = !0;
			else {
				if (!Ku(e, a) && (t.flags & 128) === 0) return (Je = !1), x4(e, t, a);
				Je = (e.flags & 131072) !== 0;
			}
		else (Je = !1), Se && (t.flags & 1048576) !== 0 && Mh(t, dl, t.index);
		switch (((t.lanes = 0), t.tag)) {
			case 16:
				e: {
					var l = t.pendingProps;
					if (((e = Ba(t.elementType)), (t.type = e), typeof e == "function"))
						Wo(e)
							? ((l = Ua(e, l)), (t.tag = 1), (t = X1(null, t, e, l, a)))
							: ((t.tag = 0), (t = Hu(null, t, e, l, a)));
					else {
						if (e != null) {
							var o = e.$$typeof;
							if (o === K) {
								(t.tag = 11), (t = k1(null, t, e, l, a));
								break e;
							} else if (o === J) {
								(t.tag = 14), (t = H1(null, t, e, l, a));
								break e;
							}
						}
						throw ((t = et(e) || e), Error(r(306, t, "")));
					}
				}
				return t;
			case 0:
				return Hu(e, t, t.type, t.pendingProps, a);
			case 1:
				return (l = t.type), (o = Ua(l, t.pendingProps)), X1(e, t, l, o, a);
			case 3:
				e: {
					if ((lt(t, t.stateNode.containerInfo), e === null))
						throw Error(r(387));
					l = t.pendingProps;
					var c = t.memoizedState;
					(o = c.element), du(e, t), bl(t, l, null, a);
					var m = t.memoizedState;
					if (
						((l = m.cache),
						$n(t, Pe, l),
						l !== c.cache && su(t, [Pe], a, !0),
						vl(),
						(l = m.element),
						c.isDehydrated)
					)
						if (
							((c = { element: l, isDehydrated: !1, cache: m.cache }),
							(t.updateQueue.baseState = c),
							(t.memoizedState = c),
							t.flags & 256)
						) {
							t = K1(e, t, l, a);
							break e;
						} else if (l !== o) {
							(o = qt(Error(r(424)), t)), hl(o), (t = K1(e, t, l, a));
							break e;
						} else
							for (
								e = t.stateNode.containerInfo,
									e.nodeType === 9
										? (e = e.body)
										: (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
									ke = Pt(e.firstChild),
									ft = t,
									Se = !0,
									Jn = null,
									Kt = !0,
									a = Gh(t, null, l, a),
									t.child = a;
								a;
							)
								(a.flags = (a.flags & -3) | 4096), (a = a.sibling);
					else {
						if ((La(), l === o)) {
							t = Ln(e, t, a);
							break e;
						}
						ht(e, t, l, a);
					}
					t = t.child;
				}
				return t;
			case 26:
				return (
					tr(e, t),
					e === null
						? (a = r0(t.type, null, t.pendingProps, null))
							? (t.memoizedState = a)
							: Se ||
								((a = t.type),
								(e = t.pendingProps),
								(l = yr(oe.current).createElement(a)),
								(l[ct] = t),
								(l[wt] = e),
								mt(l, a, e),
								st(l),
								(t.stateNode = l))
						: (t.memoizedState = r0(
								t.type,
								e.memoizedProps,
								t.pendingProps,
								e.memoizedState,
							)),
					null
				);
			case 27:
				return (
					Zn(t),
					e === null &&
						Se &&
						((l = t.stateNode = i0(t.type, t.pendingProps, oe.current)),
						(ft = t),
						(Kt = !0),
						(o = ke),
						fa(t.type) ? ((Tc = o), (ke = Pt(l.firstChild))) : (ke = o)),
					ht(e, t, t.pendingProps.children, a),
					tr(e, t),
					e === null && (t.flags |= 4194304),
					t.child
				);
			case 5:
				return (
					e === null &&
						Se &&
						((o = l = ke) &&
							((l = Q4(l, t.type, t.pendingProps, Kt)),
							l !== null
								? ((t.stateNode = l),
									(ft = t),
									(ke = Pt(l.firstChild)),
									(Kt = !1),
									(o = !0))
								: (o = !1)),
						o || Wn(t)),
					Zn(t),
					(o = t.type),
					(c = t.pendingProps),
					(m = e !== null ? e.memoizedProps : null),
					(l = c.children),
					bc(o, c) ? (l = null) : m !== null && bc(o, m) && (t.flags |= 32),
					t.memoizedState !== null &&
						((o = vu(e, t, o4, null, null, a)), (Ul._currentValue = o)),
					tr(e, t),
					ht(e, t, l, a),
					t.child
				);
			case 6:
				return (
					e === null &&
						Se &&
						((e = a = ke) &&
							((a = P4(a, t.pendingProps, Kt)),
							a !== null
								? ((t.stateNode = a), (ft = t), (ke = null), (e = !0))
								: (e = !1)),
						e || Wn(t)),
					null
				);
			case 13:
				return Q1(e, t, a);
			case 4:
				return (
					lt(t, t.stateNode.containerInfo),
					(l = t.pendingProps),
					e === null ? (t.child = ka(t, null, l, a)) : ht(e, t, l, a),
					t.child
				);
			case 11:
				return k1(e, t, t.type, t.pendingProps, a);
			case 7:
				return ht(e, t, t.pendingProps, a), t.child;
			case 8:
				return ht(e, t, t.pendingProps.children, a), t.child;
			case 12:
				return ht(e, t, t.pendingProps.children, a), t.child;
			case 10:
				return (
					(l = t.pendingProps),
					$n(t, t.type, l.value),
					ht(e, t, l.children, a),
					t.child
				);
			case 9:
				return (
					(o = t.type._context),
					(l = t.pendingProps.children),
					Oa(t),
					(o = dt(o)),
					(l = l(o)),
					(t.flags |= 1),
					ht(e, t, l, a),
					t.child
				);
			case 14:
				return H1(e, t, t.type, t.pendingProps, a);
			case 15:
				return U1(e, t, t.type, t.pendingProps, a);
			case 19:
				return F1(e, t, a);
			case 31:
				return g4(e, t, a);
			case 22:
				return G1(e, t, a, t.pendingProps);
			case 24:
				return (
					Oa(t),
					(l = dt(Pe)),
					e === null
						? ((o = uu()),
							o === null &&
								((o = Ve),
								(c = ru()),
								(o.pooledCache = c),
								c.refCount++,
								c !== null && (o.pooledCacheLanes |= a),
								(o = c)),
							(t.memoizedState = { parent: l, cache: o }),
							fu(t),
							$n(t, Pe, o))
						: ((e.lanes & a) !== 0 && (du(e, t), bl(t, null, null, a), vl()),
							(o = e.memoizedState),
							(c = t.memoizedState),
							o.parent !== l
								? ((o = { parent: l, cache: l }),
									(t.memoizedState = o),
									t.lanes === 0 &&
										(t.memoizedState = t.updateQueue.baseState = o),
									$n(t, Pe, l))
								: ((l = c.cache),
									$n(t, Pe, l),
									l !== o.cache && su(t, [Pe], a, !0))),
					ht(e, t, t.pendingProps.children, a),
					t.child
				);
			case 29:
				throw t.pendingProps;
		}
		throw Error(r(156, t.tag));
	}
	function zn(e) {
		e.flags |= 4;
	}
	function Qu(e, t, a, l, o) {
		if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
			if (((e.flags |= 16777216), (o & 335544128) === o))
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Cm()) e.flags |= 8192;
				else throw ((_a = Us), cu);
		} else e.flags &= -16777217;
	}
	function W1(e, t) {
		if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
			e.flags &= -16777217;
		else if (((e.flags |= 16777216), !d0(t)))
			if (Cm()) e.flags |= 8192;
			else throw ((_a = Us), cu);
	}
	function ar(e, t) {
		t !== null && (e.flags |= 4),
			e.flags & 16384 &&
				((t = e.tag !== 22 ? Rd() : 536870912), (e.lanes |= t), (Mi |= t));
	}
	function Al(e, t) {
		if (!Se)
			switch (e.tailMode) {
				case "hidden":
					t = e.tail;
					for (var a = null; t !== null; )
						t.alternate !== null && (a = t), (t = t.sibling);
					a === null ? (e.tail = null) : (a.sibling = null);
					break;
				case "collapsed":
					a = e.tail;
					for (var l = null; a !== null; )
						a.alternate !== null && (l = a), (a = a.sibling);
					l === null
						? t || e.tail === null
							? (e.tail = null)
							: (e.tail.sibling = null)
						: (l.sibling = null);
			}
	}
	function He(e) {
		var t = e.alternate !== null && e.alternate.child === e.child,
			a = 0,
			l = 0;
		if (t)
			for (var o = e.child; o !== null; )
				(a |= o.lanes | o.childLanes),
					(l |= o.subtreeFlags & 65011712),
					(l |= o.flags & 65011712),
					(o.return = e),
					(o = o.sibling);
		else
			for (o = e.child; o !== null; )
				(a |= o.lanes | o.childLanes),
					(l |= o.subtreeFlags),
					(l |= o.flags),
					(o.return = e),
					(o = o.sibling);
		return (e.subtreeFlags |= l), (e.childLanes = a), t;
	}
	function y4(e, t, a) {
		var l = t.pendingProps;
		switch ((tu(t), t.tag)) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14:
				return He(t), null;
			case 1:
				return He(t), null;
			case 3:
				return (
					(a = t.stateNode),
					(l = null),
					e !== null && (l = e.memoizedState.cache),
					t.memoizedState.cache !== l && (t.flags |= 2048),
					Nn(Pe),
					pe(),
					a.pendingContext &&
						((a.context = a.pendingContext), (a.pendingContext = null)),
					(e === null || e.child === null) &&
						(pi(t)
							? zn(t)
							: e === null ||
								(e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
								((t.flags |= 1024), au())),
					He(t),
					null
				);
			case 26:
				var o = t.type,
					c = t.memoizedState;
				return (
					e === null
						? (zn(t),
							c !== null ? (He(t), W1(t, c)) : (He(t), Qu(t, o, null, l, a)))
						: c
							? c !== e.memoizedState
								? (zn(t), He(t), W1(t, c))
								: (He(t), (t.flags &= -16777217))
							: ((e = e.memoizedProps),
								e !== l && zn(t),
								He(t),
								Qu(t, o, e, l, a)),
					null
				);
			case 27:
				if (
					(Sn(t),
					(a = oe.current),
					(o = t.type),
					e !== null && t.stateNode != null)
				)
					e.memoizedProps !== l && zn(t);
				else {
					if (!l) {
						if (t.stateNode === null) throw Error(r(166));
						return He(t), null;
					}
					(e = W.current),
						pi(t) ? Rh(t) : ((e = i0(o, l, a)), (t.stateNode = e), zn(t));
				}
				return He(t), null;
			case 5:
				if ((Sn(t), (o = t.type), e !== null && t.stateNode != null))
					e.memoizedProps !== l && zn(t);
				else {
					if (!l) {
						if (t.stateNode === null) throw Error(r(166));
						return He(t), null;
					}
					if (((c = W.current), pi(t))) Rh(t);
					else {
						var m = yr(oe.current);
						switch (c) {
							case 1:
								c = m.createElementNS("http://www.w3.org/2000/svg", o);
								break;
							case 2:
								c = m.createElementNS("http://www.w3.org/1998/Math/MathML", o);
								break;
							default:
								switch (o) {
									case "svg":
										c = m.createElementNS("http://www.w3.org/2000/svg", o);
										break;
									case "math":
										c = m.createElementNS(
											"http://www.w3.org/1998/Math/MathML",
											o,
										);
										break;
									case "script":
										(c = m.createElement("div")),
											(c.innerHTML = "<script><\/script>"),
											(c = c.removeChild(c.firstChild));
										break;
									case "select":
										(c =
											typeof l.is == "string"
												? m.createElement("select", { is: l.is })
												: m.createElement("select")),
											l.multiple
												? (c.multiple = !0)
												: l.size && (c.size = l.size);
										break;
									default:
										c =
											typeof l.is == "string"
												? m.createElement(o, { is: l.is })
												: m.createElement(o);
								}
						}
						(c[ct] = t), (c[wt] = l);
						e: for (m = t.child; m !== null; ) {
							if (m.tag === 5 || m.tag === 6) c.appendChild(m.stateNode);
							else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
								(m.child.return = m), (m = m.child);
								continue;
							}
							if (m === t) break e;
							for (; m.sibling === null; ) {
								if (m.return === null || m.return === t) break e;
								m = m.return;
							}
							(m.sibling.return = m.return), (m = m.sibling);
						}
						t.stateNode = c;
						e: switch ((mt(c, o, l), o)) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								l = !!l.autoFocus;
								break e;
							case "img":
								l = !0;
								break e;
							default:
								l = !1;
						}
						l && zn(t);
					}
				}
				return (
					He(t),
					Qu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a),
					null
				);
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== l && zn(t);
				else {
					if (typeof l != "string" && t.stateNode === null) throw Error(r(166));
					if (((e = oe.current), pi(t))) {
						if (
							((e = t.stateNode),
							(a = t.memoizedProps),
							(l = null),
							(o = ft),
							o !== null)
						)
							switch (o.tag) {
								case 27:
								case 5:
									l = o.memoizedProps;
							}
						(e[ct] = t),
							(e = !!(
								e.nodeValue === a ||
								(l !== null && l.suppressHydrationWarning === !0) ||
								Qm(e.nodeValue, a)
							)),
							e || Wn(t, !0);
					} else (e = yr(e).createTextNode(l)), (e[ct] = t), (t.stateNode = e);
				}
				return He(t), null;
			case 31:
				if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
					if (((l = pi(t)), a !== null)) {
						if (e === null) {
							if (!l) throw Error(r(318));
							if (
								((e = t.memoizedState),
								(e = e !== null ? e.dehydrated : null),
								!e)
							)
								throw Error(r(557));
							e[ct] = t;
						} else
							La(),
								(t.flags & 128) === 0 && (t.memoizedState = null),
								(t.flags |= 4);
						He(t), (e = !1);
					} else
						(a = au()),
							e !== null &&
								e.memoizedState !== null &&
								(e.memoizedState.hydrationErrors = a),
							(e = !0);
					if (!e) return t.flags & 256 ? (Vt(t), t) : (Vt(t), null);
					if ((t.flags & 128) !== 0) throw Error(r(558));
				}
				return He(t), null;
			case 13:
				if (
					((l = t.memoizedState),
					e === null ||
						(e.memoizedState !== null && e.memoizedState.dehydrated !== null))
				) {
					if (((o = pi(t)), l !== null && l.dehydrated !== null)) {
						if (e === null) {
							if (!o) throw Error(r(318));
							if (
								((o = t.memoizedState),
								(o = o !== null ? o.dehydrated : null),
								!o)
							)
								throw Error(r(317));
							o[ct] = t;
						} else
							La(),
								(t.flags & 128) === 0 && (t.memoizedState = null),
								(t.flags |= 4);
						He(t), (o = !1);
					} else
						(o = au()),
							e !== null &&
								e.memoizedState !== null &&
								(e.memoizedState.hydrationErrors = o),
							(o = !0);
					if (!o) return t.flags & 256 ? (Vt(t), t) : (Vt(t), null);
				}
				return (
					Vt(t),
					(t.flags & 128) !== 0
						? ((t.lanes = a), t)
						: ((a = l !== null),
							(e = e !== null && e.memoizedState !== null),
							a &&
								((l = t.child),
								(o = null),
								l.alternate !== null &&
									l.alternate.memoizedState !== null &&
									l.alternate.memoizedState.cachePool !== null &&
									(o = l.alternate.memoizedState.cachePool.pool),
								(c = null),
								l.memoizedState !== null &&
									l.memoizedState.cachePool !== null &&
									(c = l.memoizedState.cachePool.pool),
								c !== o && (l.flags |= 2048)),
							a !== e && a && (t.child.flags |= 8192),
							ar(t, t.updateQueue),
							He(t),
							null)
				);
			case 4:
				return pe(), e === null && pc(t.stateNode.containerInfo), He(t), null;
			case 10:
				return Nn(t.type), He(t), null;
			case 19:
				if ((Y(Ke), (l = t.memoizedState), l === null)) return He(t), null;
				if (((o = (t.flags & 128) !== 0), (c = l.rendering), c === null))
					if (o) Al(l, !1);
					else {
						if (Ze !== 0 || (e !== null && (e.flags & 128) !== 0))
							for (e = t.child; e !== null; ) {
								if (((c = Zs(e)), c !== null)) {
									for (
										t.flags |= 128,
											Al(l, !1),
											e = c.updateQueue,
											t.updateQueue = e,
											ar(t, e),
											t.subtreeFlags = 0,
											e = a,
											a = t.child;
										a !== null;
									)
										Th(a, e), (a = a.sibling);
									return (
										F(Ke, (Ke.current & 1) | 2),
										Se && En(t, l.treeForkCount),
										t.child
									);
								}
								e = e.sibling;
							}
						l.tail !== null &&
							Nt() > or &&
							((t.flags |= 128), (o = !0), Al(l, !1), (t.lanes = 4194304));
					}
				else {
					if (!o)
						if (((e = Zs(c)), e !== null)) {
							if (
								((t.flags |= 128),
								(o = !0),
								(e = e.updateQueue),
								(t.updateQueue = e),
								ar(t, e),
								Al(l, !0),
								l.tail === null &&
									l.tailMode === "hidden" &&
									!c.alternate &&
									!Se)
							)
								return He(t), null;
						} else
							2 * Nt() - l.renderingStartTime > or &&
								a !== 536870912 &&
								((t.flags |= 128), (o = !0), Al(l, !1), (t.lanes = 4194304));
					l.isBackwards
						? ((c.sibling = t.child), (t.child = c))
						: ((e = l.last),
							e !== null ? (e.sibling = c) : (t.child = c),
							(l.last = c));
				}
				return l.tail !== null
					? ((e = l.tail),
						(l.rendering = e),
						(l.tail = e.sibling),
						(l.renderingStartTime = Nt()),
						(e.sibling = null),
						(a = Ke.current),
						F(Ke, o ? (a & 1) | 2 : a & 1),
						Se && En(t, l.treeForkCount),
						e)
					: (He(t), null);
			case 22:
			case 23:
				return (
					Vt(t),
					gu(),
					(l = t.memoizedState !== null),
					e !== null
						? (e.memoizedState !== null) !== l && (t.flags |= 8192)
						: l && (t.flags |= 8192),
					l
						? (a & 536870912) !== 0 &&
							(t.flags & 128) === 0 &&
							(He(t), t.subtreeFlags & 6 && (t.flags |= 8192))
						: He(t),
					(a = t.updateQueue),
					a !== null && ar(t, a.retryQueue),
					(a = null),
					e !== null &&
						e.memoizedState !== null &&
						e.memoizedState.cachePool !== null &&
						(a = e.memoizedState.cachePool.pool),
					(l = null),
					t.memoizedState !== null &&
						t.memoizedState.cachePool !== null &&
						(l = t.memoizedState.cachePool.pool),
					l !== a && (t.flags |= 2048),
					e !== null && Y(Va),
					null
				);
			case 24:
				return (
					(a = null),
					e !== null && (a = e.memoizedState.cache),
					t.memoizedState.cache !== a && (t.flags |= 2048),
					Nn(Pe),
					He(t),
					null
				);
			case 25:
				return null;
			case 30:
				return null;
		}
		throw Error(r(156, t.tag));
	}
	function v4(e, t) {
		switch ((tu(t), t.tag)) {
			case 1:
				return (
					(e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
				);
			case 3:
				return (
					Nn(Pe),
					pe(),
					(e = t.flags),
					(e & 65536) !== 0 && (e & 128) === 0
						? ((t.flags = (e & -65537) | 128), t)
						: null
				);
			case 26:
			case 27:
			case 5:
				return Sn(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if ((Vt(t), t.alternate === null)) throw Error(r(340));
					La();
				}
				return (
					(e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
				);
			case 13:
				if (
					(Vt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
				) {
					if (t.alternate === null) throw Error(r(340));
					La();
				}
				return (
					(e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
				);
			case 19:
				return Y(Ke), null;
			case 4:
				return pe(), null;
			case 10:
				return Nn(t.type), null;
			case 22:
			case 23:
				return (
					Vt(t),
					gu(),
					e !== null && Y(Va),
					(e = t.flags),
					e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
				);
			case 24:
				return Nn(Pe), null;
			case 25:
				return null;
			default:
				return null;
		}
	}
	function $1(e, t) {
		switch ((tu(t), t.tag)) {
			case 3:
				Nn(Pe), pe();
				break;
			case 26:
			case 27:
			case 5:
				Sn(t);
				break;
			case 4:
				pe();
				break;
			case 31:
				t.memoizedState !== null && Vt(t);
				break;
			case 13:
				Vt(t);
				break;
			case 19:
				Y(Ke);
				break;
			case 10:
				Nn(t.type);
				break;
			case 22:
			case 23:
				Vt(t), gu(), e !== null && Y(Va);
				break;
			case 24:
				Nn(Pe);
		}
	}
	function El(e, t) {
		try {
			var a = t.updateQueue,
				l = a !== null ? a.lastEffect : null;
			if (l !== null) {
				var o = l.next;
				a = o;
				do {
					if ((a.tag & e) === e) {
						l = void 0;
						var c = a.create,
							m = a.inst;
						(l = c()), (m.destroy = l);
					}
					a = a.next;
				} while (a !== o);
			}
		} catch (b) {
			Re(t, t.return, b);
		}
	}
	function ia(e, t, a) {
		try {
			var l = t.updateQueue,
				o = l !== null ? l.lastEffect : null;
			if (o !== null) {
				var c = o.next;
				l = c;
				do {
					if ((l.tag & e) === e) {
						var m = l.inst,
							b = m.destroy;
						if (b !== void 0) {
							(m.destroy = void 0), (o = t);
							var S = a,
								D = b;
							try {
								D();
							} catch (_) {
								Re(o, S, _);
							}
						}
					}
					l = l.next;
				} while (l !== c);
			}
		} catch (_) {
			Re(t, t.return, _);
		}
	}
	function I1(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var a = e.stateNode;
			try {
				qh(t, a);
			} catch (l) {
				Re(e, e.return, l);
			}
		}
	}
	function em(e, t, a) {
		(a.props = Ua(e.type, e.memoizedProps)), (a.state = e.memoizedState);
		try {
			a.componentWillUnmount();
		} catch (l) {
			Re(e, t, l);
		}
	}
	function Ml(e, t) {
		try {
			var a = e.ref;
			if (a !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var l = e.stateNode;
						break;
					case 30:
						l = e.stateNode;
						break;
					default:
						l = e.stateNode;
				}
				typeof a == "function" ? (e.refCleanup = a(l)) : (a.current = l);
			}
		} catch (o) {
			Re(e, t, o);
		}
	}
	function hn(e, t) {
		var a = e.ref,
			l = e.refCleanup;
		if (a !== null)
			if (typeof l == "function")
				try {
					l();
				} catch (o) {
					Re(e, t, o);
				} finally {
					(e.refCleanup = null),
						(e = e.alternate),
						e != null && (e.refCleanup = null);
				}
			else if (typeof a == "function")
				try {
					a(null);
				} catch (o) {
					Re(e, t, o);
				}
			else a.current = null;
	}
	function tm(e) {
		var t = e.type,
			a = e.memoizedProps,
			l = e.stateNode;
		try {
			e: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					a.autoFocus && l.focus();
					break e;
				case "img":
					a.src ? (l.src = a.src) : a.srcSet && (l.srcset = a.srcSet);
			}
		} catch (o) {
			Re(e, e.return, o);
		}
	}
	function Pu(e, t, a) {
		try {
			var l = e.stateNode;
			G4(l, e.type, a, t), (l[wt] = t);
		} catch (o) {
			Re(e, e.return, o);
		}
	}
	function nm(e) {
		return (
			e.tag === 5 ||
			e.tag === 3 ||
			e.tag === 26 ||
			(e.tag === 27 && fa(e.type)) ||
			e.tag === 4
		);
	}
	function Fu(e) {
		e: for (;;) {
			for (; e.sibling === null; ) {
				if (e.return === null || nm(e.return)) return null;
				e = e.return;
			}
			for (
				e.sibling.return = e.return, e = e.sibling;
				e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
			) {
				if (
					(e.tag === 27 && fa(e.type)) ||
					e.flags & 2 ||
					e.child === null ||
					e.tag === 4
				)
					continue e;
				(e.child.return = e), (e = e.child);
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Ju(e, t, a) {
		var l = e.tag;
		if (l === 5 || l === 6)
			(e = e.stateNode),
				t
					? (a.nodeType === 9
							? a.body
							: a.nodeName === "HTML"
								? a.ownerDocument.body
								: a
						).insertBefore(e, t)
					: ((t =
							a.nodeType === 9
								? a.body
								: a.nodeName === "HTML"
									? a.ownerDocument.body
									: a),
						t.appendChild(e),
						(a = a._reactRootContainer),
						a != null || t.onclick !== null || (t.onclick = jn));
		else if (
			l !== 4 &&
			(l === 27 && fa(e.type) && ((a = e.stateNode), (t = null)),
			(e = e.child),
			e !== null)
		)
			for (Ju(e, t, a), e = e.sibling; e !== null; )
				Ju(e, t, a), (e = e.sibling);
	}
	function ir(e, t, a) {
		var l = e.tag;
		if (l === 5 || l === 6)
			(e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e);
		else if (
			l !== 4 &&
			(l === 27 && fa(e.type) && (a = e.stateNode), (e = e.child), e !== null)
		)
			for (ir(e, t, a), e = e.sibling; e !== null; )
				ir(e, t, a), (e = e.sibling);
	}
	function am(e) {
		var t = e.stateNode,
			a = e.memoizedProps;
		try {
			for (var l = e.type, o = t.attributes; o.length; )
				t.removeAttributeNode(o[0]);
			mt(t, l, a), (t[ct] = e), (t[wt] = a);
		} catch (c) {
			Re(e, e.return, c);
		}
	}
	var On = !1,
		We = !1,
		Wu = !1,
		im = typeof WeakSet == "function" ? WeakSet : Set,
		rt = null;
	function b4(e, t) {
		if (((e = e.containerInfo), (yc = Tr), (e = gh(e)), Zo(e))) {
			if ("selectionStart" in e)
				var a = { start: e.selectionStart, end: e.selectionEnd };
			else
				e: {
					a = ((a = e.ownerDocument) && a.defaultView) || window;
					var l = a.getSelection && a.getSelection();
					if (l && l.rangeCount !== 0) {
						a = l.anchorNode;
						var o = l.anchorOffset,
							c = l.focusNode;
						l = l.focusOffset;
						try {
							a.nodeType, c.nodeType;
						} catch {
							a = null;
							break e;
						}
						var m = 0,
							b = -1,
							S = -1,
							D = 0,
							_ = 0,
							G = e,
							L = null;
						t: for (;;) {
							for (
								var O;
								G !== a || (o !== 0 && G.nodeType !== 3) || (b = m + o),
									G !== c || (l !== 0 && G.nodeType !== 3) || (S = m + l),
									G.nodeType === 3 && (m += G.nodeValue.length),
									(O = G.firstChild) !== null;
							)
								(L = G), (G = O);
							for (;;) {
								if (G === e) break t;
								if (
									(L === a && ++D === o && (b = m),
									L === c && ++_ === l && (S = m),
									(O = G.nextSibling) !== null)
								)
									break;
								(G = L), (L = G.parentNode);
							}
							G = O;
						}
						a = b === -1 || S === -1 ? null : { start: b, end: S };
					} else a = null;
				}
			a = a || { start: 0, end: 0 };
		} else a = null;
		for (
			vc = { focusedElem: e, selectionRange: a }, Tr = !1, rt = t;
			rt !== null;
		)
			if (
				((t = rt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
			)
				(e.return = t), (rt = e);
			else
				for (; rt !== null; ) {
					switch (((t = rt), (c = t.alternate), (e = t.flags), t.tag)) {
						case 0:
							if (
								(e & 4) !== 0 &&
								((e = t.updateQueue),
								(e = e !== null ? e.events : null),
								e !== null)
							)
								for (a = 0; a < e.length; a++)
									(o = e[a]), (o.ref.impl = o.nextImpl);
							break;
						case 11:
						case 15:
							break;
						case 1:
							if ((e & 1024) !== 0 && c !== null) {
								(e = void 0),
									(a = t),
									(o = c.memoizedProps),
									(c = c.memoizedState),
									(l = a.stateNode);
								try {
									var I = Ua(a.type, o);
									(e = l.getSnapshotBeforeUpdate(I, c)),
										(l.__reactInternalSnapshotBeforeUpdate = e);
								} catch (ue) {
									Re(a, a.return, ue);
								}
							}
							break;
						case 3:
							if ((e & 1024) !== 0) {
								if (
									((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)
								)
									Sc(e);
								else if (a === 1)
									switch (e.nodeName) {
										case "HEAD":
										case "HTML":
										case "BODY":
											Sc(e);
											break;
										default:
											e.textContent = "";
									}
							}
							break;
						case 5:
						case 26:
						case 27:
						case 6:
						case 4:
						case 17:
							break;
						default:
							if ((e & 1024) !== 0) throw Error(r(163));
					}
					if (((e = t.sibling), e !== null)) {
						(e.return = t.return), (rt = e);
						break;
					}
					rt = t.return;
				}
	}
	function lm(e, t, a) {
		var l = a.flags;
		switch (a.tag) {
			case 0:
			case 11:
			case 15:
				Bn(e, a), l & 4 && El(5, a);
				break;
			case 1:
				if ((Bn(e, a), l & 4))
					if (((e = a.stateNode), t === null))
						try {
							e.componentDidMount();
						} catch (m) {
							Re(a, a.return, m);
						}
					else {
						var o = Ua(a.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(o, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (m) {
							Re(a, a.return, m);
						}
					}
				l & 64 && I1(a), l & 512 && Ml(a, a.return);
				break;
			case 3:
				if ((Bn(e, a), l & 64 && ((e = a.updateQueue), e !== null))) {
					if (((t = null), a.child !== null))
						switch (a.child.tag) {
							case 27:
							case 5:
								t = a.child.stateNode;
								break;
							case 1:
								t = a.child.stateNode;
						}
					try {
						qh(e, t);
					} catch (m) {
						Re(a, a.return, m);
					}
				}
				break;
			case 27:
				t === null && l & 4 && am(a);
			case 26:
			case 5:
				Bn(e, a), t === null && l & 4 && tm(a), l & 512 && Ml(a, a.return);
				break;
			case 12:
				Bn(e, a);
				break;
			case 31:
				Bn(e, a), l & 4 && om(e, a);
				break;
			case 13:
				Bn(e, a),
					l & 4 && um(e, a),
					l & 64 &&
						((e = a.memoizedState),
						e !== null &&
							((e = e.dehydrated),
							e !== null && ((a = N4.bind(null, a)), F4(e, a))));
				break;
			case 22:
				if (((l = a.memoizedState !== null || On), !l)) {
					(t = (t !== null && t.memoizedState !== null) || We), (o = On);
					var c = We;
					(On = l),
						(We = t) && !c ? _n(e, a, (a.subtreeFlags & 8772) !== 0) : Bn(e, a),
						(On = o),
						(We = c);
				}
				break;
			case 30:
				break;
			default:
				Bn(e, a);
		}
	}
	function sm(e) {
		var t = e.alternate;
		t !== null && ((e.alternate = null), sm(t)),
			(e.child = null),
			(e.deletions = null),
			(e.sibling = null),
			e.tag === 5 && ((t = e.stateNode), t !== null && Eo(t)),
			(e.stateNode = null),
			(e.return = null),
			(e.dependencies = null),
			(e.memoizedProps = null),
			(e.memoizedState = null),
			(e.pendingProps = null),
			(e.stateNode = null),
			(e.updateQueue = null);
	}
	var Ue = null,
		Ct = !1;
	function Vn(e, t, a) {
		for (a = a.child; a !== null; ) rm(e, t, a), (a = a.sibling);
	}
	function rm(e, t, a) {
		if (Rt && typeof Rt.onCommitFiberUnmount == "function")
			try {
				Rt.onCommitFiberUnmount($i, a);
			} catch {}
		switch (a.tag) {
			case 26:
				We || hn(a, t),
					Vn(e, t, a),
					a.memoizedState
						? a.memoizedState.count--
						: a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
				break;
			case 27:
				We || hn(a, t);
				var l = Ue,
					o = Ct;
				fa(a.type) && ((Ue = a.stateNode), (Ct = !1)),
					Vn(e, t, a),
					_l(a.stateNode),
					(Ue = l),
					(Ct = o);
				break;
			case 5:
				We || hn(a, t);
			case 6:
				if (
					((l = Ue),
					(o = Ct),
					(Ue = null),
					Vn(e, t, a),
					(Ue = l),
					(Ct = o),
					Ue !== null)
				)
					if (Ct)
						try {
							(Ue.nodeType === 9
								? Ue.body
								: Ue.nodeName === "HTML"
									? Ue.ownerDocument.body
									: Ue
							).removeChild(a.stateNode);
						} catch (c) {
							Re(a, t, c);
						}
					else
						try {
							Ue.removeChild(a.stateNode);
						} catch (c) {
							Re(a, t, c);
						}
				break;
			case 18:
				Ue !== null &&
					(Ct
						? ((e = Ue),
							Im(
								e.nodeType === 9
									? e.body
									: e.nodeName === "HTML"
										? e.ownerDocument.body
										: e,
								a.stateNode,
							),
							Bi(e))
						: Im(Ue, a.stateNode));
				break;
			case 4:
				(l = Ue),
					(o = Ct),
					(Ue = a.stateNode.containerInfo),
					(Ct = !0),
					Vn(e, t, a),
					(Ue = l),
					(Ct = o);
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				ia(2, a, t), We || ia(4, a, t), Vn(e, t, a);
				break;
			case 1:
				We ||
					(hn(a, t),
					(l = a.stateNode),
					typeof l.componentWillUnmount == "function" && em(a, t, l)),
					Vn(e, t, a);
				break;
			case 21:
				Vn(e, t, a);
				break;
			case 22:
				(We = (l = We) || a.memoizedState !== null), Vn(e, t, a), (We = l);
				break;
			default:
				Vn(e, t, a);
		}
	}
	function om(e, t) {
		if (
			t.memoizedState === null &&
			((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
		) {
			e = e.dehydrated;
			try {
				Bi(e);
			} catch (a) {
				Re(t, t.return, a);
			}
		}
	}
	function um(e, t) {
		if (
			t.memoizedState === null &&
			((e = t.alternate),
			e !== null &&
				((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
		)
			try {
				Bi(e);
			} catch (a) {
				Re(t, t.return, a);
			}
	}
	function w4(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new im()), t;
			case 22:
				return (
					(e = e.stateNode),
					(t = e._retryCache),
					t === null && (t = e._retryCache = new im()),
					t
				);
			default:
				throw Error(r(435, e.tag));
		}
	}
	function lr(e, t) {
		var a = w4(e);
		t.forEach(function (l) {
			if (!a.has(l)) {
				a.add(l);
				var o = R4.bind(null, e, l);
				l.then(o, o);
			}
		});
	}
	function jt(e, t) {
		var a = t.deletions;
		if (a !== null)
			for (var l = 0; l < a.length; l++) {
				var o = a[l],
					c = e,
					m = t,
					b = m;
				e: for (; b !== null; ) {
					switch (b.tag) {
						case 27:
							if (fa(b.type)) {
								(Ue = b.stateNode), (Ct = !1);
								break e;
							}
							break;
						case 5:
							(Ue = b.stateNode), (Ct = !1);
							break e;
						case 3:
						case 4:
							(Ue = b.stateNode.containerInfo), (Ct = !0);
							break e;
					}
					b = b.return;
				}
				if (Ue === null) throw Error(r(160));
				rm(c, m, o),
					(Ue = null),
					(Ct = !1),
					(c = o.alternate),
					c !== null && (c.return = null),
					(o.return = null);
			}
		if (t.subtreeFlags & 13886)
			for (t = t.child; t !== null; ) cm(t, e), (t = t.sibling);
	}
	var en = null;
	function cm(e, t) {
		var a = e.alternate,
			l = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				jt(t, e),
					Tt(e),
					l & 4 && (ia(3, e, e.return), El(3, e), ia(5, e, e.return));
				break;
			case 1:
				jt(t, e),
					Tt(e),
					l & 512 && (We || a === null || hn(a, a.return)),
					l & 64 &&
						On &&
						((e = e.updateQueue),
						e !== null &&
							((l = e.callbacks),
							l !== null &&
								((a = e.shared.hiddenCallbacks),
								(e.shared.hiddenCallbacks = a === null ? l : a.concat(l)))));
				break;
			case 26:
				var o = en;
				if (
					(jt(t, e),
					Tt(e),
					l & 512 && (We || a === null || hn(a, a.return)),
					l & 4)
				) {
					var c = a !== null ? a.memoizedState : null;
					if (((l = e.memoizedState), a === null))
						if (l === null)
							if (e.stateNode === null) {
								e: {
									(l = e.type),
										(a = e.memoizedProps),
										(o = o.ownerDocument || o);
									t: switch (l) {
										case "title":
											(c = o.getElementsByTagName("title")[0]),
												(!c ||
													c[tl] ||
													c[ct] ||
													c.namespaceURI === "http://www.w3.org/2000/svg" ||
													c.hasAttribute("itemprop")) &&
													((c = o.createElement(l)),
													o.head.insertBefore(
														c,
														o.querySelector("head > title"),
													)),
												mt(c, l, a),
												(c[ct] = e),
												st(c),
												(l = c);
											break e;
										case "link":
											var m = c0("link", "href", o).get(l + (a.href || ""));
											if (m) {
												for (var b = 0; b < m.length; b++)
													if (
														((c = m[b]),
														c.getAttribute("href") ===
															(a.href == null || a.href === ""
																? null
																: a.href) &&
															c.getAttribute("rel") ===
																(a.rel == null ? null : a.rel) &&
															c.getAttribute("title") ===
																(a.title == null ? null : a.title) &&
															c.getAttribute("crossorigin") ===
																(a.crossOrigin == null ? null : a.crossOrigin))
													) {
														m.splice(b, 1);
														break t;
													}
											}
											(c = o.createElement(l)),
												mt(c, l, a),
												o.head.appendChild(c);
											break;
										case "meta":
											if (
												(m = c0("meta", "content", o).get(
													l + (a.content || ""),
												))
											) {
												for (b = 0; b < m.length; b++)
													if (
														((c = m[b]),
														c.getAttribute("content") ===
															(a.content == null ? null : "" + a.content) &&
															c.getAttribute("name") ===
																(a.name == null ? null : a.name) &&
															c.getAttribute("property") ===
																(a.property == null ? null : a.property) &&
															c.getAttribute("http-equiv") ===
																(a.httpEquiv == null ? null : a.httpEquiv) &&
															c.getAttribute("charset") ===
																(a.charSet == null ? null : a.charSet))
													) {
														m.splice(b, 1);
														break t;
													}
											}
											(c = o.createElement(l)),
												mt(c, l, a),
												o.head.appendChild(c);
											break;
										default:
											throw Error(r(468, l));
									}
									(c[ct] = e), st(c), (l = c);
								}
								e.stateNode = l;
							} else f0(o, e.type, e.stateNode);
						else e.stateNode = u0(o, l, e.memoizedProps);
					else
						c !== l
							? (c === null
									? a.stateNode !== null &&
										((a = a.stateNode), a.parentNode.removeChild(a))
									: c.count--,
								l === null
									? f0(o, e.type, e.stateNode)
									: u0(o, l, e.memoizedProps))
							: l === null &&
								e.stateNode !== null &&
								Pu(e, e.memoizedProps, a.memoizedProps);
				}
				break;
			case 27:
				jt(t, e),
					Tt(e),
					l & 512 && (We || a === null || hn(a, a.return)),
					a !== null && l & 4 && Pu(e, e.memoizedProps, a.memoizedProps);
				break;
			case 5:
				if (
					(jt(t, e),
					Tt(e),
					l & 512 && (We || a === null || hn(a, a.return)),
					e.flags & 32)
				) {
					o = e.stateNode;
					try {
						li(o, "");
					} catch (I) {
						Re(e, e.return, I);
					}
				}
				l & 4 &&
					e.stateNode != null &&
					((o = e.memoizedProps), Pu(e, o, a !== null ? a.memoizedProps : o)),
					l & 1024 && (Wu = !0);
				break;
			case 6:
				if ((jt(t, e), Tt(e), l & 4)) {
					if (e.stateNode === null) throw Error(r(162));
					(l = e.memoizedProps), (a = e.stateNode);
					try {
						a.nodeValue = l;
					} catch (I) {
						Re(e, e.return, I);
					}
				}
				break;
			case 3:
				if (
					((wr = null),
					(o = en),
					(en = vr(t.containerInfo)),
					jt(t, e),
					(en = o),
					Tt(e),
					l & 4 && a !== null && a.memoizedState.isDehydrated)
				)
					try {
						Bi(t.containerInfo);
					} catch (I) {
						Re(e, e.return, I);
					}
				Wu && ((Wu = !1), fm(e));
				break;
			case 4:
				(l = en),
					(en = vr(e.stateNode.containerInfo)),
					jt(t, e),
					Tt(e),
					(en = l);
				break;
			case 12:
				jt(t, e), Tt(e);
				break;
			case 31:
				jt(t, e),
					Tt(e),
					l & 4 &&
						((l = e.updateQueue),
						l !== null && ((e.updateQueue = null), lr(e, l)));
				break;
			case 13:
				jt(t, e),
					Tt(e),
					e.child.flags & 8192 &&
						(e.memoizedState !== null) !=
							(a !== null && a.memoizedState !== null) &&
						(rr = Nt()),
					l & 4 &&
						((l = e.updateQueue),
						l !== null && ((e.updateQueue = null), lr(e, l)));
				break;
			case 22:
				o = e.memoizedState !== null;
				var S = a !== null && a.memoizedState !== null,
					D = On,
					_ = We;
				if (
					((On = D || o),
					(We = _ || S),
					jt(t, e),
					(We = _),
					(On = D),
					Tt(e),
					l & 8192)
				)
					e: for (
						t = e.stateNode,
							t._visibility = o ? t._visibility & -2 : t._visibility | 1,
							o && (a === null || S || On || We || Ga(e)),
							a = null,
							t = e;
						;
					) {
						if (t.tag === 5 || t.tag === 26) {
							if (a === null) {
								S = a = t;
								try {
									if (((c = S.stateNode), o))
										(m = c.style),
											typeof m.setProperty == "function"
												? m.setProperty("display", "none", "important")
												: (m.display = "none");
									else {
										b = S.stateNode;
										var G = S.memoizedProps.style,
											L =
												G != null && G.hasOwnProperty("display")
													? G.display
													: null;
										b.style.display =
											L == null || typeof L == "boolean" ? "" : ("" + L).trim();
									}
								} catch (I) {
									Re(S, S.return, I);
								}
							}
						} else if (t.tag === 6) {
							if (a === null) {
								S = t;
								try {
									S.stateNode.nodeValue = o ? "" : S.memoizedProps;
								} catch (I) {
									Re(S, S.return, I);
								}
							}
						} else if (t.tag === 18) {
							if (a === null) {
								S = t;
								try {
									var O = S.stateNode;
									o ? e0(O, !0) : e0(S.stateNode, !1);
								} catch (I) {
									Re(S, S.return, I);
								}
							}
						} else if (
							((t.tag !== 22 && t.tag !== 23) ||
								t.memoizedState === null ||
								t === e) &&
							t.child !== null
						) {
							(t.child.return = t), (t = t.child);
							continue;
						}
						if (t === e) break e;
						for (; t.sibling === null; ) {
							if (t.return === null || t.return === e) break e;
							a === t && (a = null), (t = t.return);
						}
						a === t && (a = null),
							(t.sibling.return = t.return),
							(t = t.sibling);
					}
				l & 4 &&
					((l = e.updateQueue),
					l !== null &&
						((a = l.retryQueue),
						a !== null && ((l.retryQueue = null), lr(e, a))));
				break;
			case 19:
				jt(t, e),
					Tt(e),
					l & 4 &&
						((l = e.updateQueue),
						l !== null && ((e.updateQueue = null), lr(e, l)));
				break;
			case 30:
				break;
			case 21:
				break;
			default:
				jt(t, e), Tt(e);
		}
	}
	function Tt(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var a, l = e.return; l !== null; ) {
					if (nm(l)) {
						a = l;
						break;
					}
					l = l.return;
				}
				if (a == null) throw Error(r(160));
				switch (a.tag) {
					case 27:
						var o = a.stateNode,
							c = Fu(e);
						ir(e, c, o);
						break;
					case 5:
						var m = a.stateNode;
						a.flags & 32 && (li(m, ""), (a.flags &= -33));
						var b = Fu(e);
						ir(e, b, m);
						break;
					case 3:
					case 4:
						var S = a.stateNode.containerInfo,
							D = Fu(e);
						Ju(e, D, S);
						break;
					default:
						throw Error(r(161));
				}
			} catch (_) {
				Re(e, e.return, _);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function fm(e) {
		if (e.subtreeFlags & 1024)
			for (e = e.child; e !== null; ) {
				var t = e;
				fm(t),
					t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
					(e = e.sibling);
			}
	}
	function Bn(e, t) {
		if (t.subtreeFlags & 8772)
			for (t = t.child; t !== null; ) lm(e, t.alternate, t), (t = t.sibling);
	}
	function Ga(e) {
		for (e = e.child; e !== null; ) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					ia(4, t, t.return), Ga(t);
					break;
				case 1:
					hn(t, t.return);
					var a = t.stateNode;
					typeof a.componentWillUnmount == "function" && em(t, t.return, a),
						Ga(t);
					break;
				case 27:
					_l(t.stateNode);
				case 26:
				case 5:
					hn(t, t.return), Ga(t);
					break;
				case 22:
					t.memoizedState === null && Ga(t);
					break;
				case 30:
					Ga(t);
					break;
				default:
					Ga(t);
			}
			e = e.sibling;
		}
	}
	function _n(e, t, a) {
		for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
			var l = t.alternate,
				o = e,
				c = t,
				m = c.flags;
			switch (c.tag) {
				case 0:
				case 11:
				case 15:
					_n(o, c, a), El(4, c);
					break;
				case 1:
					if (
						(_n(o, c, a),
						(l = c),
						(o = l.stateNode),
						typeof o.componentDidMount == "function")
					)
						try {
							o.componentDidMount();
						} catch (D) {
							Re(l, l.return, D);
						}
					if (((l = c), (o = l.updateQueue), o !== null)) {
						var b = l.stateNode;
						try {
							var S = o.shared.hiddenCallbacks;
							if (S !== null)
								for (o.shared.hiddenCallbacks = null, o = 0; o < S.length; o++)
									Yh(S[o], b);
						} catch (D) {
							Re(l, l.return, D);
						}
					}
					a && m & 64 && I1(c), Ml(c, c.return);
					break;
				case 27:
					am(c);
				case 26:
				case 5:
					_n(o, c, a), a && l === null && m & 4 && tm(c), Ml(c, c.return);
					break;
				case 12:
					_n(o, c, a);
					break;
				case 31:
					_n(o, c, a), a && m & 4 && om(o, c);
					break;
				case 13:
					_n(o, c, a), a && m & 4 && um(o, c);
					break;
				case 22:
					c.memoizedState === null && _n(o, c, a), Ml(c, c.return);
					break;
				case 30:
					break;
				default:
					_n(o, c, a);
			}
			t = t.sibling;
		}
	}
	function $u(e, t) {
		var a = null;
		e !== null &&
			e.memoizedState !== null &&
			e.memoizedState.cachePool !== null &&
			(a = e.memoizedState.cachePool.pool),
			(e = null),
			t.memoizedState !== null &&
				t.memoizedState.cachePool !== null &&
				(e = t.memoizedState.cachePool.pool),
			e !== a && (e != null && e.refCount++, a != null && ml(a));
	}
	function Iu(e, t) {
		(e = null),
			t.alternate !== null && (e = t.alternate.memoizedState.cache),
			(t = t.memoizedState.cache),
			t !== e && (t.refCount++, e != null && ml(e));
	}
	function tn(e, t, a, l) {
		if (t.subtreeFlags & 10256)
			for (t = t.child; t !== null; ) dm(e, t, a, l), (t = t.sibling);
	}
	function dm(e, t, a, l) {
		var o = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				tn(e, t, a, l), o & 2048 && El(9, t);
				break;
			case 1:
				tn(e, t, a, l);
				break;
			case 3:
				tn(e, t, a, l),
					o & 2048 &&
						((e = null),
						t.alternate !== null && (e = t.alternate.memoizedState.cache),
						(t = t.memoizedState.cache),
						t !== e && (t.refCount++, e != null && ml(e)));
				break;
			case 12:
				if (o & 2048) {
					tn(e, t, a, l), (e = t.stateNode);
					try {
						var c = t.memoizedProps,
							m = c.id,
							b = c.onPostCommit;
						typeof b == "function" &&
							b(
								m,
								t.alternate === null ? "mount" : "update",
								e.passiveEffectDuration,
								-0,
							);
					} catch (S) {
						Re(t, t.return, S);
					}
				} else tn(e, t, a, l);
				break;
			case 31:
				tn(e, t, a, l);
				break;
			case 13:
				tn(e, t, a, l);
				break;
			case 23:
				break;
			case 22:
				(c = t.stateNode),
					(m = t.alternate),
					t.memoizedState !== null
						? c._visibility & 2
							? tn(e, t, a, l)
							: Nl(e, t)
						: c._visibility & 2
							? tn(e, t, a, l)
							: ((c._visibility |= 2),
								Ti(e, t, a, l, (t.subtreeFlags & 10256) !== 0 || !1)),
					o & 2048 && $u(m, t);
				break;
			case 24:
				tn(e, t, a, l), o & 2048 && Iu(t.alternate, t);
				break;
			default:
				tn(e, t, a, l);
		}
	}
	function Ti(e, t, a, l, o) {
		for (
			o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
			t !== null;
		) {
			var c = e,
				m = t,
				b = a,
				S = l,
				D = m.flags;
			switch (m.tag) {
				case 0:
				case 11:
				case 15:
					Ti(c, m, b, S, o), El(8, m);
					break;
				case 23:
					break;
				case 22:
					var _ = m.stateNode;
					m.memoizedState !== null
						? _._visibility & 2
							? Ti(c, m, b, S, o)
							: Nl(c, m)
						: ((_._visibility |= 2), Ti(c, m, b, S, o)),
						o && D & 2048 && $u(m.alternate, m);
					break;
				case 24:
					Ti(c, m, b, S, o), o && D & 2048 && Iu(m.alternate, m);
					break;
				default:
					Ti(c, m, b, S, o);
			}
			t = t.sibling;
		}
	}
	function Nl(e, t) {
		if (t.subtreeFlags & 10256)
			for (t = t.child; t !== null; ) {
				var a = e,
					l = t,
					o = l.flags;
				switch (l.tag) {
					case 22:
						Nl(a, l), o & 2048 && $u(l.alternate, l);
						break;
					case 24:
						Nl(a, l), o & 2048 && Iu(l.alternate, l);
						break;
					default:
						Nl(a, l);
				}
				t = t.sibling;
			}
	}
	var Rl = 8192;
	function Ai(e, t, a) {
		if (e.subtreeFlags & Rl)
			for (e = e.child; e !== null; ) hm(e, t, a), (e = e.sibling);
	}
	function hm(e, t, a) {
		switch (e.tag) {
			case 26:
				Ai(e, t, a),
					e.flags & Rl &&
						e.memoizedState !== null &&
						rx(a, en, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Ai(e, t, a);
				break;
			case 3:
			case 4:
				var l = en;
				(en = vr(e.stateNode.containerInfo)), Ai(e, t, a), (en = l);
				break;
			case 22:
				e.memoizedState === null &&
					((l = e.alternate),
					l !== null && l.memoizedState !== null
						? ((l = Rl), (Rl = 16777216), Ai(e, t, a), (Rl = l))
						: Ai(e, t, a));
				break;
			default:
				Ai(e, t, a);
		}
	}
	function mm(e) {
		var t = e.alternate;
		if (t !== null && ((e = t.child), e !== null)) {
			t.child = null;
			do (t = e.sibling), (e.sibling = null), (e = t);
			while (e !== null);
		}
	}
	function Dl(e) {
		var t = e.deletions;
		if ((e.flags & 16) !== 0) {
			if (t !== null)
				for (var a = 0; a < t.length; a++) {
					var l = t[a];
					(rt = l), gm(l, e);
				}
			mm(e);
		}
		if (e.subtreeFlags & 10256)
			for (e = e.child; e !== null; ) pm(e), (e = e.sibling);
	}
	function pm(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Dl(e), e.flags & 2048 && ia(9, e, e.return);
				break;
			case 3:
				Dl(e);
				break;
			case 12:
				Dl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null &&
				t._visibility & 2 &&
				(e.return === null || e.return.tag !== 13)
					? ((t._visibility &= -3), sr(e))
					: Dl(e);
				break;
			default:
				Dl(e);
		}
	}
	function sr(e) {
		var t = e.deletions;
		if ((e.flags & 16) !== 0) {
			if (t !== null)
				for (var a = 0; a < t.length; a++) {
					var l = t[a];
					(rt = l), gm(l, e);
				}
			mm(e);
		}
		for (e = e.child; e !== null; ) {
			switch (((t = e), t.tag)) {
				case 0:
				case 11:
				case 15:
					ia(8, t, t.return), sr(t);
					break;
				case 22:
					(a = t.stateNode),
						a._visibility & 2 && ((a._visibility &= -3), sr(t));
					break;
				default:
					sr(t);
			}
			e = e.sibling;
		}
	}
	function gm(e, t) {
		for (; rt !== null; ) {
			var a = rt;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					ia(8, a, t);
					break;
				case 23:
				case 22:
					if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
						var l = a.memoizedState.cachePool.pool;
						l != null && l.refCount++;
					}
					break;
				case 24:
					ml(a.memoizedState.cache);
			}
			if (((l = a.child), l !== null)) (l.return = a), (rt = l);
			else
				e: for (a = e; rt !== null; ) {
					l = rt;
					var o = l.sibling,
						c = l.return;
					if ((sm(l), l === a)) {
						rt = null;
						break e;
					}
					if (o !== null) {
						(o.return = c), (rt = o);
						break e;
					}
					rt = c;
				}
		}
	}
	var S4 = {
			getCacheForType: function (e) {
				var t = dt(Pe),
					a = t.data.get(e);
				return a === void 0 && ((a = e()), t.data.set(e, a)), a;
			},
			cacheSignal: function () {
				return dt(Pe).controller.signal;
			},
		},
		C4 = typeof WeakMap == "function" ? WeakMap : Map,
		Ee = 0,
		Ve = null,
		xe = null,
		ve = 0,
		Ne = 0,
		Bt = null,
		la = !1,
		Ei = !1,
		ec = !1,
		kn = 0,
		Ze = 0,
		sa = 0,
		Ya = 0,
		tc = 0,
		_t = 0,
		Mi = 0,
		Ll = null,
		At = null,
		nc = !1,
		rr = 0,
		xm = 0,
		or = 1 / 0,
		ur = null,
		ra = null,
		tt = 0,
		oa = null,
		Ni = null,
		Hn = 0,
		ac = 0,
		ic = null,
		ym = null,
		zl = 0,
		lc = null;
	function kt() {
		return (Ee & 2) !== 0 && ve !== 0 ? ve & -ve : B.T !== null ? fc() : Od();
	}
	function vm() {
		if (_t === 0)
			if ((ve & 536870912) === 0 || Se) {
				var e = xs;
				(xs <<= 1), (xs & 3932160) === 0 && (xs = 262144), (_t = e);
			} else _t = 536870912;
		return (e = Ot.current), e !== null && (e.flags |= 32), _t;
	}
	function Et(e, t, a) {
		((e === Ve && (Ne === 2 || Ne === 9)) || e.cancelPendingCommit !== null) &&
			(Ri(e, 0), ua(e, ve, _t, !1)),
			el(e, a),
			((Ee & 2) === 0 || e !== Ve) &&
				(e === Ve &&
					((Ee & 2) === 0 && (Ya |= a), Ze === 4 && ua(e, ve, _t, !1)),
				mn(e));
	}
	function bm(e, t, a) {
		if ((Ee & 6) !== 0) throw Error(r(327));
		var l = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ii(e, t),
			o = l ? A4(e, t) : rc(e, t, !0),
			c = l;
		do {
			if (o === 0) {
				Ei && !l && ua(e, t, 0, !1);
				break;
			} else {
				if (((a = e.current.alternate), c && !j4(a))) {
					(o = rc(e, t, !1)), (c = !1);
					continue;
				}
				if (o === 2) {
					if (((c = t), e.errorRecoveryDisabledLanes & c)) var m = 0;
					else
						(m = e.pendingLanes & -536870913),
							(m = m !== 0 ? m : m & 536870912 ? 536870912 : 0);
					if (m !== 0) {
						t = m;
						e: {
							var b = e;
							o = Ll;
							var S = b.current.memoizedState.isDehydrated;
							if ((S && (Ri(b, m).flags |= 256), (m = rc(b, m, !1)), m !== 2)) {
								if (ec && !S) {
									(b.errorRecoveryDisabledLanes |= c), (Ya |= c), (o = 4);
									break e;
								}
								(c = At),
									(At = o),
									c !== null && (At === null ? (At = c) : At.push.apply(At, c));
							}
							o = m;
						}
						if (((c = !1), o !== 2)) continue;
					}
				}
				if (o === 1) {
					Ri(e, 0), ua(e, t, 0, !0);
					break;
				}
				e: {
					switch (((l = e), (c = o), c)) {
						case 0:
						case 1:
							throw Error(r(345));
						case 4:
							if ((t & 4194048) !== t) break;
						case 6:
							ua(l, t, _t, !la);
							break e;
						case 2:
							At = null;
							break;
						case 3:
						case 5:
							break;
						default:
							throw Error(r(329));
					}
					if ((t & 62914560) === t && ((o = rr + 300 - Nt()), 10 < o)) {
						if ((ua(l, t, _t, !la), vs(l, 0, !0) !== 0)) break e;
						(Hn = t),
							(l.timeoutHandle = Wm(
								wm.bind(
									null,
									l,
									a,
									At,
									ur,
									nc,
									t,
									_t,
									Ya,
									Mi,
									la,
									c,
									"Throttled",
									-0,
									0,
								),
								o,
							));
						break e;
					}
					wm(l, a, At, ur, nc, t, _t, Ya, Mi, la, c, null, -0, 0);
				}
			}
			break;
		} while (!0);
		mn(e);
	}
	function wm(e, t, a, l, o, c, m, b, S, D, _, G, L, O) {
		if (
			((e.timeoutHandle = -1),
			(G = t.subtreeFlags),
			G & 8192 || (G & 16785408) === 16785408)
		) {
			(G = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: jn,
			}),
				hm(t, c, G);
			var I =
				(c & 62914560) === c ? rr - Nt() : (c & 4194048) === c ? xm - Nt() : 0;
			if (((I = ox(G, I)), I !== null)) {
				(Hn = c),
					(e.cancelPendingCommit = I(
						Nm.bind(null, e, t, c, a, l, o, m, b, S, _, G, null, L, O),
					)),
					ua(e, c, m, !D);
				return;
			}
		}
		Nm(e, t, c, a, l, o, m, b, S);
	}
	function j4(e) {
		for (var t = e; ; ) {
			var a = t.tag;
			if (
				(a === 0 || a === 11 || a === 15) &&
				t.flags & 16384 &&
				((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
			)
				for (var l = 0; l < a.length; l++) {
					var o = a[l],
						c = o.getSnapshot;
					o = o.value;
					try {
						if (!Lt(c(), o)) return !1;
					} catch {
						return !1;
					}
				}
			if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
				(a.return = t), (t = a);
			else {
				if (t === e) break;
				for (; t.sibling === null; ) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				(t.sibling.return = t.return), (t = t.sibling);
			}
		}
		return !0;
	}
	function ua(e, t, a, l) {
		(t &= ~tc),
			(t &= ~Ya),
			(e.suspendedLanes |= t),
			(e.pingedLanes &= ~t),
			l && (e.warmLanes |= t),
			(l = e.expirationTimes);
		for (var o = t; 0 < o; ) {
			var c = 31 - Dt(o),
				m = 1 << c;
			(l[c] = -1), (o &= ~m);
		}
		a !== 0 && Dd(e, a, t);
	}
	function cr() {
		return (Ee & 6) === 0 ? (Ol(0), !1) : !0;
	}
	function sc() {
		if (xe !== null) {
			if (Ne === 0) var e = xe.return;
			else (e = xe), (Mn = za = null), Su(e), (bi = null), (gl = 0), (e = xe);
			for (; e !== null; ) $1(e.alternate, e), (e = e.return);
			xe = null;
		}
	}
	function Ri(e, t) {
		var a = e.timeoutHandle;
		a !== -1 && ((e.timeoutHandle = -1), Z4(a)),
			(a = e.cancelPendingCommit),
			a !== null && ((e.cancelPendingCommit = null), a()),
			(Hn = 0),
			sc(),
			(Ve = e),
			(xe = a = An(e.current, null)),
			(ve = t),
			(Ne = 0),
			(Bt = null),
			(la = !1),
			(Ei = Ii(e, t)),
			(ec = !1),
			(Mi = _t = tc = Ya = sa = Ze = 0),
			(At = Ll = null),
			(nc = !1),
			(t & 8) !== 0 && (t |= t & 32);
		var l = e.entangledLanes;
		if (l !== 0)
			for (e = e.entanglements, l &= t; 0 < l; ) {
				var o = 31 - Dt(l),
					c = 1 << o;
				(t |= e[o]), (l &= ~c);
			}
		return (kn = t), Ds(), a;
	}
	function Sm(e, t) {
		(de = null),
			(B.H = jl),
			t === vi || t === Hs
				? ((t = kh()), (Ne = 3))
				: t === cu
					? ((t = kh()), (Ne = 4))
					: (Ne =
							t === ku
								? 8
								: t !== null &&
										typeof t == "object" &&
										typeof t.then == "function"
									? 6
									: 1),
			(Bt = t),
			xe === null && ((Ze = 1), Is(e, qt(t, e.current)));
	}
	function Cm() {
		var e = Ot.current;
		return e === null
			? !0
			: (ve & 4194048) === ve
				? Qt === null
				: (ve & 62914560) === ve || (ve & 536870912) !== 0
					? e === Qt
					: !1;
	}
	function jm() {
		var e = B.H;
		return (B.H = jl), e === null ? jl : e;
	}
	function Tm() {
		var e = B.A;
		return (B.A = S4), e;
	}
	function fr() {
		(Ze = 4),
			la || ((ve & 4194048) !== ve && Ot.current !== null) || (Ei = !0),
			((sa & 134217727) === 0 && (Ya & 134217727) === 0) ||
				Ve === null ||
				ua(Ve, ve, _t, !1);
	}
	function rc(e, t, a) {
		var l = Ee;
		Ee |= 2;
		var o = jm(),
			c = Tm();
		(Ve !== e || ve !== t) && ((ur = null), Ri(e, t)), (t = !1);
		var m = Ze;
		e: do
			try {
				if (Ne !== 0 && xe !== null) {
					var b = xe,
						S = Bt;
					switch (Ne) {
						case 8:
							sc(), (m = 6);
							break e;
						case 3:
						case 2:
						case 9:
						case 6:
							Ot.current === null && (t = !0);
							var D = Ne;
							if (((Ne = 0), (Bt = null), Di(e, b, S, D), a && Ei)) {
								m = 0;
								break e;
							}
							break;
						default:
							(D = Ne), (Ne = 0), (Bt = null), Di(e, b, S, D);
					}
				}
				T4(), (m = Ze);
				break;
			} catch (_) {
				Sm(e, _);
			}
		while (!0);
		return (
			t && e.shellSuspendCounter++,
			(Mn = za = null),
			(Ee = l),
			(B.H = o),
			(B.A = c),
			xe === null && ((Ve = null), (ve = 0), Ds()),
			m
		);
	}
	function T4() {
		for (; xe !== null; ) Am(xe);
	}
	function A4(e, t) {
		var a = Ee;
		Ee |= 2;
		var l = jm(),
			o = Tm();
		Ve !== e || ve !== t
			? ((ur = null), (or = Nt() + 500), Ri(e, t))
			: (Ei = Ii(e, t));
		e: do
			try {
				if (Ne !== 0 && xe !== null) {
					t = xe;
					var c = Bt;
					t: switch (Ne) {
						case 1:
							(Ne = 0), (Bt = null), Di(e, t, c, 1);
							break;
						case 2:
						case 9:
							if (Bh(c)) {
								(Ne = 0), (Bt = null), Em(t);
								break;
							}
							(t = function () {
								(Ne !== 2 && Ne !== 9) || Ve !== e || (Ne = 7), mn(e);
							}),
								c.then(t, t);
							break e;
						case 3:
							Ne = 7;
							break e;
						case 4:
							Ne = 5;
							break e;
						case 7:
							Bh(c)
								? ((Ne = 0), (Bt = null), Em(t))
								: ((Ne = 0), (Bt = null), Di(e, t, c, 7));
							break;
						case 5:
							var m = null;
							switch (xe.tag) {
								case 26:
									m = xe.memoizedState;
								case 5:
								case 27:
									var b = xe;
									if (m ? d0(m) : b.stateNode.complete) {
										(Ne = 0), (Bt = null);
										var S = b.sibling;
										if (S !== null) xe = S;
										else {
											var D = b.return;
											D !== null ? ((xe = D), dr(D)) : (xe = null);
										}
										break t;
									}
							}
							(Ne = 0), (Bt = null), Di(e, t, c, 5);
							break;
						case 6:
							(Ne = 0), (Bt = null), Di(e, t, c, 6);
							break;
						case 8:
							sc(), (Ze = 6);
							break e;
						default:
							throw Error(r(462));
					}
				}
				E4();
				break;
			} catch (_) {
				Sm(e, _);
			}
		while (!0);
		return (
			(Mn = za = null),
			(B.H = l),
			(B.A = o),
			(Ee = a),
			xe !== null ? 0 : ((Ve = null), (ve = 0), Ds(), Ze)
		);
	}
	function E4() {
		for (; xe !== null && !J5(); ) Am(xe);
	}
	function Am(e) {
		var t = J1(e.alternate, e, kn);
		(e.memoizedProps = e.pendingProps), t === null ? dr(e) : (xe = t);
	}
	function Em(e) {
		var t = e,
			a = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Z1(a, t, t.pendingProps, t.type, void 0, ve);
				break;
			case 11:
				t = Z1(a, t, t.pendingProps, t.type.render, t.ref, ve);
				break;
			case 5:
				Su(t);
			default:
				$1(a, t), (t = xe = Th(t, kn)), (t = J1(a, t, kn));
		}
		(e.memoizedProps = e.pendingProps), t === null ? dr(e) : (xe = t);
	}
	function Di(e, t, a, l) {
		(Mn = za = null), Su(t), (bi = null), (gl = 0);
		var o = t.return;
		try {
			if (p4(e, o, t, a, ve)) {
				(Ze = 1), Is(e, qt(a, e.current)), (xe = null);
				return;
			}
		} catch (c) {
			if (o !== null) throw ((xe = o), c);
			(Ze = 1), Is(e, qt(a, e.current)), (xe = null);
			return;
		}
		t.flags & 32768
			? (Se || l === 1
					? (e = !0)
					: Ei || (ve & 536870912) !== 0
						? (e = !1)
						: ((la = e = !0),
							(l === 2 || l === 9 || l === 3 || l === 6) &&
								((l = Ot.current),
								l !== null && l.tag === 13 && (l.flags |= 16384))),
				Mm(t, e))
			: dr(t);
	}
	function dr(e) {
		var t = e;
		do {
			if ((t.flags & 32768) !== 0) {
				Mm(t, la);
				return;
			}
			e = t.return;
			var a = y4(t.alternate, t, kn);
			if (a !== null) {
				xe = a;
				return;
			}
			if (((t = t.sibling), t !== null)) {
				xe = t;
				return;
			}
			xe = t = e;
		} while (t !== null);
		Ze === 0 && (Ze = 5);
	}
	function Mm(e, t) {
		do {
			var a = v4(e.alternate, e);
			if (a !== null) {
				(a.flags &= 32767), (xe = a);
				return;
			}
			if (
				((a = e.return),
				a !== null &&
					((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
				!t && ((e = e.sibling), e !== null))
			) {
				xe = e;
				return;
			}
			xe = e = a;
		} while (e !== null);
		(Ze = 6), (xe = null);
	}
	function Nm(e, t, a, l, o, c, m, b, S) {
		e.cancelPendingCommit = null;
		do hr();
		while (tt !== 0);
		if ((Ee & 6) !== 0) throw Error(r(327));
		if (t !== null) {
			if (t === e.current) throw Error(r(177));
			if (
				((c = t.lanes | t.childLanes),
				(c |= Fo),
				s3(e, a, c, m, b, S),
				e === Ve && ((xe = Ve = null), (ve = 0)),
				(Ni = t),
				(oa = e),
				(Hn = a),
				(ac = c),
				(ic = o),
				(ym = l),
				(t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
					? ((e.callbackNode = null),
						(e.callbackPriority = 0),
						D4(ps, function () {
							return Om(), null;
						}))
					: ((e.callbackNode = null), (e.callbackPriority = 0)),
				(l = (t.flags & 13878) !== 0),
				(t.subtreeFlags & 13878) !== 0 || l)
			) {
				(l = B.T), (B.T = null), (o = Z.p), (Z.p = 2), (m = Ee), (Ee |= 4);
				try {
					b4(e, t, a);
				} finally {
					(Ee = m), (Z.p = o), (B.T = l);
				}
			}
			(tt = 1), Rm(), Dm(), Lm();
		}
	}
	function Rm() {
		if (tt === 1) {
			tt = 0;
			var e = oa,
				t = Ni,
				a = (t.flags & 13878) !== 0;
			if ((t.subtreeFlags & 13878) !== 0 || a) {
				(a = B.T), (B.T = null);
				var l = Z.p;
				Z.p = 2;
				var o = Ee;
				Ee |= 4;
				try {
					cm(t, e);
					var c = vc,
						m = gh(e.containerInfo),
						b = c.focusedElem,
						S = c.selectionRange;
					if (
						m !== b &&
						b &&
						b.ownerDocument &&
						ph(b.ownerDocument.documentElement, b)
					) {
						if (S !== null && Zo(b)) {
							var D = S.start,
								_ = S.end;
							if ((_ === void 0 && (_ = D), "selectionStart" in b))
								(b.selectionStart = D),
									(b.selectionEnd = Math.min(_, b.value.length));
							else {
								var G = b.ownerDocument || document,
									L = (G && G.defaultView) || window;
								if (L.getSelection) {
									var O = L.getSelection(),
										I = b.textContent.length,
										ue = Math.min(S.start, I),
										ze = S.end === void 0 ? ue : Math.min(S.end, I);
									!O.extend && ue > ze && ((m = ze), (ze = ue), (ue = m));
									var E = mh(b, ue),
										j = mh(b, ze);
									if (
										E &&
										j &&
										(O.rangeCount !== 1 ||
											O.anchorNode !== E.node ||
											O.anchorOffset !== E.offset ||
											O.focusNode !== j.node ||
											O.focusOffset !== j.offset)
									) {
										var R = G.createRange();
										R.setStart(E.node, E.offset),
											O.removeAllRanges(),
											ue > ze
												? (O.addRange(R), O.extend(j.node, j.offset))
												: (R.setEnd(j.node, j.offset), O.addRange(R));
									}
								}
							}
						}
						for (G = [], O = b; (O = O.parentNode); )
							O.nodeType === 1 &&
								G.push({ element: O, left: O.scrollLeft, top: O.scrollTop });
						for (
							typeof b.focus == "function" && b.focus(), b = 0;
							b < G.length;
							b++
						) {
							var U = G[b];
							(U.element.scrollLeft = U.left), (U.element.scrollTop = U.top);
						}
					}
					(Tr = !!yc), (vc = yc = null);
				} finally {
					(Ee = o), (Z.p = l), (B.T = a);
				}
			}
			(e.current = t), (tt = 2);
		}
	}
	function Dm() {
		if (tt === 2) {
			tt = 0;
			var e = oa,
				t = Ni,
				a = (t.flags & 8772) !== 0;
			if ((t.subtreeFlags & 8772) !== 0 || a) {
				(a = B.T), (B.T = null);
				var l = Z.p;
				Z.p = 2;
				var o = Ee;
				Ee |= 4;
				try {
					lm(e, t.alternate, t);
				} finally {
					(Ee = o), (Z.p = l), (B.T = a);
				}
			}
			tt = 3;
		}
	}
	function Lm() {
		if (tt === 4 || tt === 3) {
			(tt = 0), W5();
			var e = oa,
				t = Ni,
				a = Hn,
				l = ym;
			(t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
				? (tt = 5)
				: ((tt = 0), (Ni = oa = null), zm(e, e.pendingLanes));
			var o = e.pendingLanes;
			if (
				(o === 0 && (ra = null),
				To(a),
				(t = t.stateNode),
				Rt && typeof Rt.onCommitFiberRoot == "function")
			)
				try {
					Rt.onCommitFiberRoot($i, t, void 0, (t.current.flags & 128) === 128);
				} catch {}
			if (l !== null) {
				(t = B.T), (o = Z.p), (Z.p = 2), (B.T = null);
				try {
					for (var c = e.onRecoverableError, m = 0; m < l.length; m++) {
						var b = l[m];
						c(b.value, { componentStack: b.stack });
					}
				} finally {
					(B.T = t), (Z.p = o);
				}
			}
			(Hn & 3) !== 0 && hr(),
				mn(e),
				(o = e.pendingLanes),
				(a & 261930) !== 0 && (o & 42) !== 0
					? e === lc
						? zl++
						: ((zl = 0), (lc = e))
					: (zl = 0),
				Ol(0);
		}
	}
	function zm(e, t) {
		(e.pooledCacheLanes &= t) === 0 &&
			((t = e.pooledCache), t != null && ((e.pooledCache = null), ml(t)));
	}
	function hr() {
		return Rm(), Dm(), Lm(), Om();
	}
	function Om() {
		if (tt !== 5) return !1;
		var e = oa,
			t = ac;
		ac = 0;
		var a = To(Hn),
			l = B.T,
			o = Z.p;
		try {
			(Z.p = 32 > a ? 32 : a), (B.T = null), (a = ic), (ic = null);
			var c = oa,
				m = Hn;
			if (((tt = 0), (Ni = oa = null), (Hn = 0), (Ee & 6) !== 0))
				throw Error(r(331));
			var b = Ee;
			if (
				((Ee |= 4),
				pm(c.current),
				dm(c, c.current, m, a),
				(Ee = b),
				Ol(0, !1),
				Rt && typeof Rt.onPostCommitFiberRoot == "function")
			)
				try {
					Rt.onPostCommitFiberRoot($i, c);
				} catch {}
			return !0;
		} finally {
			(Z.p = o), (B.T = l), zm(e, t);
		}
	}
	function Vm(e, t, a) {
		(t = qt(a, t)),
			(t = _u(e.stateNode, t, 2)),
			(e = ta(e, t, 2)),
			e !== null && (el(e, 2), mn(e));
	}
	function Re(e, t, a) {
		if (e.tag === 3) Vm(e, e, a);
		else
			for (; t !== null; ) {
				if (t.tag === 3) {
					Vm(t, e, a);
					break;
				} else if (t.tag === 1) {
					var l = t.stateNode;
					if (
						typeof t.type.getDerivedStateFromError == "function" ||
						(typeof l.componentDidCatch == "function" &&
							(ra === null || !ra.has(l)))
					) {
						(e = qt(a, e)),
							(a = B1(2)),
							(l = ta(t, a, 2)),
							l !== null && (_1(a, l, t, e), el(l, 2), mn(l));
						break;
					}
				}
				t = t.return;
			}
	}
	function oc(e, t, a) {
		var l = e.pingCache;
		if (l === null) {
			l = e.pingCache = new C4();
			var o = new Set();
			l.set(t, o);
		} else (o = l.get(t)), o === void 0 && ((o = new Set()), l.set(t, o));
		o.has(a) ||
			((ec = !0), o.add(a), (e = M4.bind(null, e, t, a)), t.then(e, e));
	}
	function M4(e, t, a) {
		var l = e.pingCache;
		l !== null && l.delete(t),
			(e.pingedLanes |= e.suspendedLanes & a),
			(e.warmLanes &= ~a),
			Ve === e &&
				(ve & a) === a &&
				(Ze === 4 || (Ze === 3 && (ve & 62914560) === ve && 300 > Nt() - rr)
					? (Ee & 2) === 0 && Ri(e, 0)
					: (tc |= a),
				Mi === ve && (Mi = 0)),
			mn(e);
	}
	function Bm(e, t) {
		t === 0 && (t = Rd()), (e = Ra(e, t)), e !== null && (el(e, t), mn(e));
	}
	function N4(e) {
		var t = e.memoizedState,
			a = 0;
		t !== null && (a = t.retryLane), Bm(e, a);
	}
	function R4(e, t) {
		var a = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var l = e.stateNode,
					o = e.memoizedState;
				o !== null && (a = o.retryLane);
				break;
			case 19:
				l = e.stateNode;
				break;
			case 22:
				l = e.stateNode._retryCache;
				break;
			default:
				throw Error(r(314));
		}
		l !== null && l.delete(t), Bm(e, a);
	}
	function D4(e, t) {
		return wo(e, t);
	}
	var mr = null,
		Li = null,
		uc = !1,
		pr = !1,
		cc = !1,
		ca = 0;
	function mn(e) {
		e !== Li &&
			e.next === null &&
			(Li === null ? (mr = Li = e) : (Li = Li.next = e)),
			(pr = !0),
			uc || ((uc = !0), z4());
	}
	function Ol(e, t) {
		if (!cc && pr) {
			cc = !0;
			do
				for (var a = !1, l = mr; l !== null; ) {
					if (e !== 0) {
						var o = l.pendingLanes;
						if (o === 0) var c = 0;
						else {
							var m = l.suspendedLanes,
								b = l.pingedLanes;
							(c = (1 << (31 - Dt(42 | e) + 1)) - 1),
								(c &= o & ~(m & ~b)),
								(c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0);
						}
						c !== 0 && ((a = !0), Um(l, c));
					} else
						(c = ve),
							(c = vs(
								l,
								l === Ve ? c : 0,
								l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
							)),
							(c & 3) === 0 || Ii(l, c) || ((a = !0), Um(l, c));
					l = l.next;
				}
			while (a);
			cc = !1;
		}
	}
	function L4() {
		_m();
	}
	function _m() {
		pr = uc = !1;
		var e = 0;
		ca !== 0 && q4() && (e = ca);
		for (var t = Nt(), a = null, l = mr; l !== null; ) {
			var o = l.next,
				c = km(l, t);
			c === 0
				? ((l.next = null),
					a === null ? (mr = o) : (a.next = o),
					o === null && (Li = a))
				: ((a = l), (e !== 0 || (c & 3) !== 0) && (pr = !0)),
				(l = o);
		}
		(tt !== 0 && tt !== 5) || Ol(e), ca !== 0 && (ca = 0);
	}
	function km(e, t) {
		for (
			var a = e.suspendedLanes,
				l = e.pingedLanes,
				o = e.expirationTimes,
				c = e.pendingLanes & -62914561;
			0 < c;
		) {
			var m = 31 - Dt(c),
				b = 1 << m,
				S = o[m];
			S === -1
				? ((b & a) === 0 || (b & l) !== 0) && (o[m] = l3(b, t))
				: S <= t && (e.expiredLanes |= b),
				(c &= ~b);
		}
		if (
			((t = Ve),
			(a = ve),
			(a = vs(
				e,
				e === t ? a : 0,
				e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
			)),
			(l = e.callbackNode),
			a === 0 ||
				(e === t && (Ne === 2 || Ne === 9)) ||
				e.cancelPendingCommit !== null)
		)
			return (
				l !== null && l !== null && So(l),
				(e.callbackNode = null),
				(e.callbackPriority = 0)
			);
		if ((a & 3) === 0 || Ii(e, a)) {
			if (((t = a & -a), t === e.callbackPriority)) return t;
			switch ((l !== null && So(l), To(a))) {
				case 2:
				case 8:
					a = Md;
					break;
				case 32:
					a = ps;
					break;
				case 268435456:
					a = Nd;
					break;
				default:
					a = ps;
			}
			return (
				(l = Hm.bind(null, e)),
				(a = wo(a, l)),
				(e.callbackPriority = t),
				(e.callbackNode = a),
				t
			);
		}
		return (
			l !== null && l !== null && So(l),
			(e.callbackPriority = 2),
			(e.callbackNode = null),
			2
		);
	}
	function Hm(e, t) {
		if (tt !== 0 && tt !== 5)
			return (e.callbackNode = null), (e.callbackPriority = 0), null;
		var a = e.callbackNode;
		if (hr() && e.callbackNode !== a) return null;
		var l = ve;
		return (
			(l = vs(
				e,
				e === Ve ? l : 0,
				e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
			)),
			l === 0
				? null
				: (bm(e, l, t),
					km(e, Nt()),
					e.callbackNode != null && e.callbackNode === a
						? Hm.bind(null, e)
						: null)
		);
	}
	function Um(e, t) {
		if (hr()) return null;
		bm(e, t, !0);
	}
	function z4() {
		X4(function () {
			(Ee & 6) !== 0 ? wo(Ed, L4) : _m();
		});
	}
	function fc() {
		if (ca === 0) {
			var e = xi;
			e === 0 && ((e = gs), (gs <<= 1), (gs & 261888) === 0 && (gs = 256)),
				(ca = e);
		}
		return ca;
	}
	function Gm(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean"
			? null
			: typeof e == "function"
				? e
				: Cs("" + e);
	}
	function Ym(e, t) {
		var a = t.ownerDocument.createElement("input");
		return (
			(a.name = t.name),
			(a.value = t.value),
			e.id && a.setAttribute("form", e.id),
			t.parentNode.insertBefore(a, t),
			(e = new FormData(e)),
			a.parentNode.removeChild(a),
			e
		);
	}
	function O4(e, t, a, l, o) {
		if (t === "submit" && a && a.stateNode === o) {
			var c = Gm((o[wt] || null).action),
				m = l.submitter;
			m &&
				((t = (t = m[wt] || null)
					? Gm(t.formAction)
					: m.getAttribute("formAction")),
				t !== null && ((c = t), (m = null)));
			var b = new Es("action", "action", null, l, o);
			e.push({
				event: b,
				listeners: [
					{
						instance: null,
						listener: function () {
							if (l.defaultPrevented) {
								if (ca !== 0) {
									var S = m ? Ym(o, m) : new FormData(o);
									Du(
										a,
										{ pending: !0, data: S, method: o.method, action: c },
										null,
										S,
									);
								}
							} else
								typeof c == "function" &&
									(b.preventDefault(),
									(S = m ? Ym(o, m) : new FormData(o)),
									Du(
										a,
										{ pending: !0, data: S, method: o.method, action: c },
										c,
										S,
									));
						},
						currentTarget: o,
					},
				],
			});
		}
	}
	for (var dc = 0; dc < Po.length; dc++) {
		var hc = Po[dc],
			V4 = hc.toLowerCase(),
			B4 = hc[0].toUpperCase() + hc.slice(1);
		It(V4, "on" + B4);
	}
	It(vh, "onAnimationEnd"),
		It(bh, "onAnimationIteration"),
		It(wh, "onAnimationStart"),
		It("dblclick", "onDoubleClick"),
		It("focusin", "onFocus"),
		It("focusout", "onBlur"),
		It($3, "onTransitionRun"),
		It(I3, "onTransitionStart"),
		It(e4, "onTransitionCancel"),
		It(Sh, "onTransitionEnd"),
		ai("onMouseEnter", ["mouseout", "mouseover"]),
		ai("onMouseLeave", ["mouseout", "mouseover"]),
		ai("onPointerEnter", ["pointerout", "pointerover"]),
		ai("onPointerLeave", ["pointerout", "pointerover"]),
		Aa(
			"onChange",
			"change click focusin focusout input keydown keyup selectionchange".split(
				" ",
			),
		),
		Aa(
			"onSelect",
			"focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
				" ",
			),
		),
		Aa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
		Aa(
			"onCompositionEnd",
			"compositionend focusout keydown keypress keyup mousedown".split(" "),
		),
		Aa(
			"onCompositionStart",
			"compositionstart focusout keydown keypress keyup mousedown".split(" "),
		),
		Aa(
			"onCompositionUpdate",
			"compositionupdate focusout keydown keypress keyup mousedown".split(" "),
		);
	var Vl =
			"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
				" ",
			),
		_4 = new Set(
			"beforetoggle cancel close invalid load scroll scrollend toggle"
				.split(" ")
				.concat(Vl),
		);
	function qm(e, t) {
		t = (t & 4) !== 0;
		for (var a = 0; a < e.length; a++) {
			var l = e[a],
				o = l.event;
			l = l.listeners;
			e: {
				var c = void 0;
				if (t)
					for (var m = l.length - 1; 0 <= m; m--) {
						var b = l[m],
							S = b.instance,
							D = b.currentTarget;
						if (((b = b.listener), S !== c && o.isPropagationStopped()))
							break e;
						(c = b), (o.currentTarget = D);
						try {
							c(o);
						} catch (_) {
							Rs(_);
						}
						(o.currentTarget = null), (c = S);
					}
				else
					for (m = 0; m < l.length; m++) {
						if (
							((b = l[m]),
							(S = b.instance),
							(D = b.currentTarget),
							(b = b.listener),
							S !== c && o.isPropagationStopped())
						)
							break e;
						(c = b), (o.currentTarget = D);
						try {
							c(o);
						} catch (_) {
							Rs(_);
						}
						(o.currentTarget = null), (c = S);
					}
			}
		}
	}
	function ye(e, t) {
		var a = t[Ao];
		a === void 0 && (a = t[Ao] = new Set());
		var l = e + "__bubble";
		a.has(l) || (Zm(t, e, 2, !1), a.add(l));
	}
	function mc(e, t, a) {
		var l = 0;
		t && (l |= 4), Zm(a, e, l, t);
	}
	var gr = "_reactListening" + Math.random().toString(36).slice(2);
	function pc(e) {
		if (!e[gr]) {
			(e[gr] = !0),
				_d.forEach(function (a) {
					a !== "selectionchange" && (_4.has(a) || mc(a, !1, e), mc(a, !0, e));
				});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[gr] || ((t[gr] = !0), mc("selectionchange", !1, t));
		}
	}
	function Zm(e, t, a, l) {
		switch (v0(t)) {
			case 2:
				var o = fx;
				break;
			case 8:
				o = dx;
				break;
			default:
				o = Rc;
		}
		(a = o.bind(null, t, a, e)),
			(o = void 0),
			!Vo ||
				(t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
				(o = !0),
			l
				? o !== void 0
					? e.addEventListener(t, a, { capture: !0, passive: o })
					: e.addEventListener(t, a, !0)
				: o !== void 0
					? e.addEventListener(t, a, { passive: o })
					: e.addEventListener(t, a, !1);
	}
	function gc(e, t, a, l, o) {
		var c = l;
		if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
			e: for (;;) {
				if (l === null) return;
				var m = l.tag;
				if (m === 3 || m === 4) {
					var b = l.stateNode.containerInfo;
					if (b === o) break;
					if (m === 4)
						for (m = l.return; m !== null; ) {
							var S = m.tag;
							if ((S === 3 || S === 4) && m.stateNode.containerInfo === o)
								return;
							m = m.return;
						}
					for (; b !== null; ) {
						if (((m = ei(b)), m === null)) return;
						if (((S = m.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
							l = c = m;
							continue e;
						}
						b = b.parentNode;
					}
				}
				l = l.return;
			}
		Fd(function () {
			var D = c,
				_ = zo(a),
				G = [];
			e: {
				var L = Ch.get(e);
				if (L !== void 0) {
					var O = Es,
						I = e;
					switch (e) {
						case "keypress":
							if (Ts(a) === 0) break e;
						case "keydown":
						case "keyup":
							O = R3;
							break;
						case "focusin":
							(I = "focus"), (O = Ho);
							break;
						case "focusout":
							(I = "blur"), (O = Ho);
							break;
						case "beforeblur":
						case "afterblur":
							O = Ho;
							break;
						case "click":
							if (a.button === 2) break e;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							O = $d;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							O = y3;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							O = z3;
							break;
						case vh:
						case bh:
						case wh:
							O = w3;
							break;
						case Sh:
							O = V3;
							break;
						case "scroll":
						case "scrollend":
							O = g3;
							break;
						case "wheel":
							O = _3;
							break;
						case "copy":
						case "cut":
						case "paste":
							O = C3;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							O = eh;
							break;
						case "toggle":
						case "beforetoggle":
							O = H3;
					}
					var ue = (t & 4) !== 0,
						ze = !ue && (e === "scroll" || e === "scrollend"),
						E = ue ? (L !== null ? L + "Capture" : null) : L;
					ue = [];
					for (var j = D, R; j !== null; ) {
						var U = j;
						if (
							((R = U.stateNode),
							(U = U.tag),
							(U !== 5 && U !== 26 && U !== 27) ||
								R === null ||
								E === null ||
								((U = al(j, E)), U != null && ue.push(Bl(j, U, R))),
							ze)
						)
							break;
						j = j.return;
					}
					0 < ue.length &&
						((L = new O(L, I, null, a, _)),
						G.push({ event: L, listeners: ue }));
				}
			}
			if ((t & 7) === 0) {
				e: {
					if (
						((L = e === "mouseover" || e === "pointerover"),
						(O = e === "mouseout" || e === "pointerout"),
						L &&
							a !== Lo &&
							(I = a.relatedTarget || a.fromElement) &&
							(ei(I) || I[Ia]))
					)
						break e;
					if (
						(O || L) &&
						((L =
							_.window === _
								? _
								: (L = _.ownerDocument)
									? L.defaultView || L.parentWindow
									: window),
						O
							? ((I = a.relatedTarget || a.toElement),
								(O = D),
								(I = I ? ei(I) : null),
								I !== null &&
									((ze = h(I)),
									(ue = I.tag),
									I !== ze || (ue !== 5 && ue !== 27 && ue !== 6)) &&
									(I = null))
							: ((O = null), (I = D)),
						O !== I)
					) {
						if (
							((ue = $d),
							(U = "onMouseLeave"),
							(E = "onMouseEnter"),
							(j = "mouse"),
							(e === "pointerout" || e === "pointerover") &&
								((ue = eh),
								(U = "onPointerLeave"),
								(E = "onPointerEnter"),
								(j = "pointer")),
							(ze = O == null ? L : nl(O)),
							(R = I == null ? L : nl(I)),
							(L = new ue(U, j + "leave", O, a, _)),
							(L.target = ze),
							(L.relatedTarget = R),
							(U = null),
							ei(_) === D &&
								((ue = new ue(E, j + "enter", I, a, _)),
								(ue.target = R),
								(ue.relatedTarget = ze),
								(U = ue)),
							(ze = U),
							O && I)
						)
							t: {
								for (ue = k4, E = O, j = I, R = 0, U = E; U; U = ue(U)) R++;
								U = 0;
								for (var re = j; re; re = ue(re)) U++;
								for (; 0 < R - U; ) (E = ue(E)), R--;
								for (; 0 < U - R; ) (j = ue(j)), U--;
								for (; R--; ) {
									if (E === j || (j !== null && E === j.alternate)) {
										ue = E;
										break t;
									}
									(E = ue(E)), (j = ue(j));
								}
								ue = null;
							}
						else ue = null;
						O !== null && Xm(G, L, O, ue, !1),
							I !== null && ze !== null && Xm(G, ze, I, ue, !0);
					}
				}
				e: {
					if (
						((L = D ? nl(D) : window),
						(O = L.nodeName && L.nodeName.toLowerCase()),
						O === "select" || (O === "input" && L.type === "file"))
					)
						var je = oh;
					else if (sh(L))
						if (uh) je = F3;
						else {
							je = Q3;
							var le = K3;
						}
					else
						(O = L.nodeName),
							!O ||
							O.toLowerCase() !== "input" ||
							(L.type !== "checkbox" && L.type !== "radio")
								? D && Do(D.elementType) && (je = oh)
								: (je = P3);
					if (je && (je = je(e, D))) {
						rh(G, je, a, _);
						break e;
					}
					le && le(e, L, D),
						e === "focusout" &&
							D &&
							L.type === "number" &&
							D.memoizedProps.value != null &&
							Ro(L, "number", L.value);
				}
				switch (((le = D ? nl(D) : window), e)) {
					case "focusin":
						(sh(le) || le.contentEditable === "true") &&
							((ui = le), (Xo = D), (fl = null));
						break;
					case "focusout":
						fl = Xo = ui = null;
						break;
					case "mousedown":
						Ko = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						(Ko = !1), xh(G, a, _);
						break;
					case "selectionchange":
						if (W3) break;
					case "keydown":
					case "keyup":
						xh(G, a, _);
				}
				var he;
				if (Go)
					e: {
						switch (e) {
							case "compositionstart":
								var be = "onCompositionStart";
								break e;
							case "compositionend":
								be = "onCompositionEnd";
								break e;
							case "compositionupdate":
								be = "onCompositionUpdate";
								break e;
						}
						be = void 0;
					}
				else
					oi
						? ih(e, a) && (be = "onCompositionEnd")
						: e === "keydown" &&
							a.keyCode === 229 &&
							(be = "onCompositionStart");
				be &&
					(th &&
						a.locale !== "ko" &&
						(oi || be !== "onCompositionStart"
							? be === "onCompositionEnd" && oi && (he = Jd())
							: ((Pn = _),
								(Bo = "value" in Pn ? Pn.value : Pn.textContent),
								(oi = !0))),
					(le = xr(D, be)),
					0 < le.length &&
						((be = new Id(be, e, null, a, _)),
						G.push({ event: be, listeners: le }),
						he
							? (be.data = he)
							: ((he = lh(a)), he !== null && (be.data = he)))),
					(he = G3 ? Y3(e, a) : q3(e, a)) &&
						((be = xr(D, "onBeforeInput")),
						0 < be.length &&
							((le = new Id("onBeforeInput", "beforeinput", null, a, _)),
							G.push({ event: le, listeners: be }),
							(le.data = he))),
					O4(G, e, D, a, _);
			}
			qm(G, t);
		});
	}
	function Bl(e, t, a) {
		return { instance: e, listener: t, currentTarget: a };
	}
	function xr(e, t) {
		for (var a = t + "Capture", l = []; e !== null; ) {
			var o = e,
				c = o.stateNode;
			if (
				((o = o.tag),
				(o !== 5 && o !== 26 && o !== 27) ||
					c === null ||
					((o = al(e, a)),
					o != null && l.unshift(Bl(e, o, c)),
					(o = al(e, t)),
					o != null && l.push(Bl(e, o, c))),
				e.tag === 3)
			)
				return l;
			e = e.return;
		}
		return [];
	}
	function k4(e) {
		if (e === null) return null;
		do e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Xm(e, t, a, l, o) {
		for (var c = t._reactName, m = []; a !== null && a !== l; ) {
			var b = a,
				S = b.alternate,
				D = b.stateNode;
			if (((b = b.tag), S !== null && S === l)) break;
			(b !== 5 && b !== 26 && b !== 27) ||
				D === null ||
				((S = D),
				o
					? ((D = al(a, c)), D != null && m.unshift(Bl(a, D, S)))
					: o || ((D = al(a, c)), D != null && m.push(Bl(a, D, S)))),
				(a = a.return);
		}
		m.length !== 0 && e.push({ event: t, listeners: m });
	}
	var H4 = /\r\n?/g,
		U4 = /\u0000|\uFFFD/g;
	function Km(e) {
		return (typeof e == "string" ? e : "" + e)
			.replace(
				H4,
				`
`,
			)
			.replace(U4, "");
	}
	function Qm(e, t) {
		return (t = Km(t)), Km(e) === t;
	}
	function Le(e, t, a, l, o, c) {
		switch (a) {
			case "children":
				typeof l == "string"
					? t === "body" || (t === "textarea" && l === "") || li(e, l)
					: (typeof l == "number" || typeof l == "bigint") &&
						t !== "body" &&
						li(e, "" + l);
				break;
			case "className":
				ws(e, "class", l);
				break;
			case "tabIndex":
				ws(e, "tabindex", l);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				ws(e, a, l);
				break;
			case "style":
				Qd(e, l, c);
				break;
			case "data":
				if (t !== "object") {
					ws(e, "data", l);
					break;
				}
			case "src":
			case "href":
				if (l === "" && (t !== "a" || a !== "href")) {
					e.removeAttribute(a);
					break;
				}
				if (
					l == null ||
					typeof l == "function" ||
					typeof l == "symbol" ||
					typeof l == "boolean"
				) {
					e.removeAttribute(a);
					break;
				}
				(l = Cs("" + l)), e.setAttribute(a, l);
				break;
			case "action":
			case "formAction":
				if (typeof l == "function") {
					e.setAttribute(
						a,
						"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
					);
					break;
				} else
					typeof c == "function" &&
						(a === "formAction"
							? (t !== "input" && Le(e, t, "name", o.name, o, null),
								Le(e, t, "formEncType", o.formEncType, o, null),
								Le(e, t, "formMethod", o.formMethod, o, null),
								Le(e, t, "formTarget", o.formTarget, o, null))
							: (Le(e, t, "encType", o.encType, o, null),
								Le(e, t, "method", o.method, o, null),
								Le(e, t, "target", o.target, o, null)));
				if (l == null || typeof l == "symbol" || typeof l == "boolean") {
					e.removeAttribute(a);
					break;
				}
				(l = Cs("" + l)), e.setAttribute(a, l);
				break;
			case "onClick":
				l != null && (e.onclick = jn);
				break;
			case "onScroll":
				l != null && ye("scroll", e);
				break;
			case "onScrollEnd":
				l != null && ye("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (l != null) {
					if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
					if (((a = l.__html), a != null)) {
						if (o.children != null) throw Error(r(60));
						e.innerHTML = a;
					}
				}
				break;
			case "multiple":
				e.multiple = l && typeof l != "function" && typeof l != "symbol";
				break;
			case "muted":
				e.muted = l && typeof l != "function" && typeof l != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref":
				break;
			case "autoFocus":
				break;
			case "xlinkHref":
				if (
					l == null ||
					typeof l == "function" ||
					typeof l == "boolean" ||
					typeof l == "symbol"
				) {
					e.removeAttribute("xlink:href");
					break;
				}
				(a = Cs("" + l)),
					e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				l != null && typeof l != "function" && typeof l != "symbol"
					? e.setAttribute(a, "" + l)
					: e.removeAttribute(a);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				l && typeof l != "function" && typeof l != "symbol"
					? e.setAttribute(a, "")
					: e.removeAttribute(a);
				break;
			case "capture":
			case "download":
				l === !0
					? e.setAttribute(a, "")
					: l !== !1 &&
							l != null &&
							typeof l != "function" &&
							typeof l != "symbol"
						? e.setAttribute(a, l)
						: e.removeAttribute(a);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				l != null &&
				typeof l != "function" &&
				typeof l != "symbol" &&
				!isNaN(l) &&
				1 <= l
					? e.setAttribute(a, l)
					: e.removeAttribute(a);
				break;
			case "rowSpan":
			case "start":
				l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l)
					? e.removeAttribute(a)
					: e.setAttribute(a, l);
				break;
			case "popover":
				ye("beforetoggle", e), ye("toggle", e), bs(e, "popover", l);
				break;
			case "xlinkActuate":
				Cn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
				break;
			case "xlinkArcrole":
				Cn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
				break;
			case "xlinkRole":
				Cn(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
				break;
			case "xlinkShow":
				Cn(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
				break;
			case "xlinkTitle":
				Cn(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
				break;
			case "xlinkType":
				Cn(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
				break;
			case "xmlBase":
				Cn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
				break;
			case "xmlLang":
				Cn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
				break;
			case "xmlSpace":
				Cn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
				break;
			case "is":
				bs(e, "is", l);
				break;
			case "innerText":
			case "textContent":
				break;
			default:
				(!(2 < a.length) ||
					(a[0] !== "o" && a[0] !== "O") ||
					(a[1] !== "n" && a[1] !== "N")) &&
					((a = m3.get(a) || a), bs(e, a, l));
		}
	}
	function xc(e, t, a, l, o, c) {
		switch (a) {
			case "style":
				Qd(e, l, c);
				break;
			case "dangerouslySetInnerHTML":
				if (l != null) {
					if (typeof l != "object" || !("__html" in l)) throw Error(r(61));
					if (((a = l.__html), a != null)) {
						if (o.children != null) throw Error(r(60));
						e.innerHTML = a;
					}
				}
				break;
			case "children":
				typeof l == "string"
					? li(e, l)
					: (typeof l == "number" || typeof l == "bigint") && li(e, "" + l);
				break;
			case "onScroll":
				l != null && ye("scroll", e);
				break;
			case "onScrollEnd":
				l != null && ye("scrollend", e);
				break;
			case "onClick":
				l != null && (e.onclick = jn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref":
				break;
			case "innerText":
			case "textContent":
				break;
			default:
				if (!kd.hasOwnProperty(a))
					e: {
						if (
							a[0] === "o" &&
							a[1] === "n" &&
							((o = a.endsWith("Capture")),
							(t = a.slice(2, o ? a.length - 7 : void 0)),
							(c = e[wt] || null),
							(c = c != null ? c[a] : null),
							typeof c == "function" && e.removeEventListener(t, c, o),
							typeof l == "function")
						) {
							typeof c != "function" &&
								c !== null &&
								(a in e
									? (e[a] = null)
									: e.hasAttribute(a) && e.removeAttribute(a)),
								e.addEventListener(t, l, o);
							break e;
						}
						a in e
							? (e[a] = l)
							: l === !0
								? e.setAttribute(a, "")
								: bs(e, a, l);
					}
		}
	}
	function mt(e, t, a) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li":
				break;
			case "img":
				ye("error", e), ye("load", e);
				var l = !1,
					o = !1,
					c;
				for (c in a)
					if (a.hasOwnProperty(c)) {
						var m = a[c];
						if (m != null)
							switch (c) {
								case "src":
									l = !0;
									break;
								case "srcSet":
									o = !0;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									throw Error(r(137, t));
								default:
									Le(e, t, c, m, a, null);
							}
					}
				o && Le(e, t, "srcSet", a.srcSet, a, null),
					l && Le(e, t, "src", a.src, a, null);
				return;
			case "input":
				ye("invalid", e);
				var b = (c = m = o = null),
					S = null,
					D = null;
				for (l in a)
					if (a.hasOwnProperty(l)) {
						var _ = a[l];
						if (_ != null)
							switch (l) {
								case "name":
									o = _;
									break;
								case "type":
									m = _;
									break;
								case "checked":
									S = _;
									break;
								case "defaultChecked":
									D = _;
									break;
								case "value":
									c = _;
									break;
								case "defaultValue":
									b = _;
									break;
								case "children":
								case "dangerouslySetInnerHTML":
									if (_ != null) throw Error(r(137, t));
									break;
								default:
									Le(e, t, l, _, a, null);
							}
					}
				qd(e, c, b, S, D, m, o, !1);
				return;
			case "select":
				ye("invalid", e), (l = m = c = null);
				for (o in a)
					if (a.hasOwnProperty(o) && ((b = a[o]), b != null))
						switch (o) {
							case "value":
								c = b;
								break;
							case "defaultValue":
								m = b;
								break;
							case "multiple":
								l = b;
							default:
								Le(e, t, o, b, a, null);
						}
				(t = c),
					(a = m),
					(e.multiple = !!l),
					t != null ? ii(e, !!l, t, !1) : a != null && ii(e, !!l, a, !0);
				return;
			case "textarea":
				ye("invalid", e), (c = o = l = null);
				for (m in a)
					if (a.hasOwnProperty(m) && ((b = a[m]), b != null))
						switch (m) {
							case "value":
								l = b;
								break;
							case "defaultValue":
								o = b;
								break;
							case "children":
								c = b;
								break;
							case "dangerouslySetInnerHTML":
								if (b != null) throw Error(r(91));
								break;
							default:
								Le(e, t, m, b, a, null);
						}
				Xd(e, l, o, c);
				return;
			case "option":
				for (S in a)
					a.hasOwnProperty(S) &&
						((l = a[S]), l != null) &&
						(S === "selected"
							? (e.selected =
									l && typeof l != "function" && typeof l != "symbol")
							: Le(e, t, S, l, a, null));
				return;
			case "dialog":
				ye("beforetoggle", e), ye("toggle", e), ye("cancel", e), ye("close", e);
				break;
			case "iframe":
			case "object":
				ye("load", e);
				break;
			case "video":
			case "audio":
				for (l = 0; l < Vl.length; l++) ye(Vl[l], e);
				break;
			case "image":
				ye("error", e), ye("load", e);
				break;
			case "details":
				ye("toggle", e);
				break;
			case "embed":
			case "source":
			case "link":
				ye("error", e), ye("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (D in a)
					if (a.hasOwnProperty(D) && ((l = a[D]), l != null))
						switch (D) {
							case "children":
							case "dangerouslySetInnerHTML":
								throw Error(r(137, t));
							default:
								Le(e, t, D, l, a, null);
						}
				return;
			default:
				if (Do(t)) {
					for (_ in a)
						a.hasOwnProperty(_) &&
							((l = a[_]), l !== void 0 && xc(e, t, _, l, a, void 0));
					return;
				}
		}
		for (b in a)
			a.hasOwnProperty(b) && ((l = a[b]), l != null && Le(e, t, b, l, a, null));
	}
	function G4(e, t, a, l) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li":
				break;
			case "input":
				var o = null,
					c = null,
					m = null,
					b = null,
					S = null,
					D = null,
					_ = null;
				for (O in a) {
					var G = a[O];
					if (a.hasOwnProperty(O) && G != null)
						switch (O) {
							case "checked":
								break;
							case "value":
								break;
							case "defaultValue":
								S = G;
							default:
								l.hasOwnProperty(O) || Le(e, t, O, null, l, G);
						}
				}
				for (var L in l) {
					var O = l[L];
					if (((G = a[L]), l.hasOwnProperty(L) && (O != null || G != null)))
						switch (L) {
							case "type":
								c = O;
								break;
							case "name":
								o = O;
								break;
							case "checked":
								D = O;
								break;
							case "defaultChecked":
								_ = O;
								break;
							case "value":
								m = O;
								break;
							case "defaultValue":
								b = O;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (O != null) throw Error(r(137, t));
								break;
							default:
								O !== G && Le(e, t, L, O, l, G);
						}
				}
				No(e, m, b, S, D, _, c, o);
				return;
			case "select":
				O = m = b = L = null;
				for (c in a)
					if (((S = a[c]), a.hasOwnProperty(c) && S != null))
						switch (c) {
							case "value":
								break;
							case "multiple":
								O = S;
							default:
								l.hasOwnProperty(c) || Le(e, t, c, null, l, S);
						}
				for (o in l)
					if (
						((c = l[o]),
						(S = a[o]),
						l.hasOwnProperty(o) && (c != null || S != null))
					)
						switch (o) {
							case "value":
								L = c;
								break;
							case "defaultValue":
								b = c;
								break;
							case "multiple":
								m = c;
							default:
								c !== S && Le(e, t, o, c, l, S);
						}
				(t = b),
					(a = m),
					(l = O),
					L != null
						? ii(e, !!a, L, !1)
						: !!l != !!a &&
							(t != null ? ii(e, !!a, t, !0) : ii(e, !!a, a ? [] : "", !1));
				return;
			case "textarea":
				O = L = null;
				for (b in a)
					if (
						((o = a[b]),
						a.hasOwnProperty(b) && o != null && !l.hasOwnProperty(b))
					)
						switch (b) {
							case "value":
								break;
							case "children":
								break;
							default:
								Le(e, t, b, null, l, o);
						}
				for (m in l)
					if (
						((o = l[m]),
						(c = a[m]),
						l.hasOwnProperty(m) && (o != null || c != null))
					)
						switch (m) {
							case "value":
								L = o;
								break;
							case "defaultValue":
								O = o;
								break;
							case "children":
								break;
							case "dangerouslySetInnerHTML":
								if (o != null) throw Error(r(91));
								break;
							default:
								o !== c && Le(e, t, m, o, l, c);
						}
				Zd(e, L, O);
				return;
			case "option":
				for (var I in a)
					(L = a[I]),
						a.hasOwnProperty(I) &&
							L != null &&
							!l.hasOwnProperty(I) &&
							(I === "selected" ? (e.selected = !1) : Le(e, t, I, null, l, L));
				for (S in l)
					(L = l[S]),
						(O = a[S]),
						l.hasOwnProperty(S) &&
							L !== O &&
							(L != null || O != null) &&
							(S === "selected"
								? (e.selected =
										L && typeof L != "function" && typeof L != "symbol")
								: Le(e, t, S, L, l, O));
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var ue in a)
					(L = a[ue]),
						a.hasOwnProperty(ue) &&
							L != null &&
							!l.hasOwnProperty(ue) &&
							Le(e, t, ue, null, l, L);
				for (D in l)
					if (
						((L = l[D]),
						(O = a[D]),
						l.hasOwnProperty(D) && L !== O && (L != null || O != null))
					)
						switch (D) {
							case "children":
							case "dangerouslySetInnerHTML":
								if (L != null) throw Error(r(137, t));
								break;
							default:
								Le(e, t, D, L, l, O);
						}
				return;
			default:
				if (Do(t)) {
					for (var ze in a)
						(L = a[ze]),
							a.hasOwnProperty(ze) &&
								L !== void 0 &&
								!l.hasOwnProperty(ze) &&
								xc(e, t, ze, void 0, l, L);
					for (_ in l)
						(L = l[_]),
							(O = a[_]),
							!l.hasOwnProperty(_) ||
								L === O ||
								(L === void 0 && O === void 0) ||
								xc(e, t, _, L, l, O);
					return;
				}
		}
		for (var E in a)
			(L = a[E]),
				a.hasOwnProperty(E) &&
					L != null &&
					!l.hasOwnProperty(E) &&
					Le(e, t, E, null, l, L);
		for (G in l)
			(L = l[G]),
				(O = a[G]),
				!l.hasOwnProperty(G) ||
					L === O ||
					(L == null && O == null) ||
					Le(e, t, G, L, l, O);
	}
	function Pm(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link":
				return !0;
			default:
				return !1;
		}
	}
	function Y4() {
		if (typeof performance.getEntriesByType == "function") {
			for (
				var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0;
				l < a.length;
				l++
			) {
				var o = a[l],
					c = o.transferSize,
					m = o.initiatorType,
					b = o.duration;
				if (c && b && Pm(m)) {
					for (m = 0, b = o.responseEnd, l += 1; l < a.length; l++) {
						var S = a[l],
							D = S.startTime;
						if (D > b) break;
						var _ = S.transferSize,
							G = S.initiatorType;
						_ &&
							Pm(G) &&
							((S = S.responseEnd), (m += _ * (S < b ? 1 : (b - D) / (S - D))));
					}
					if ((--l, (t += (8 * (c + m)) / (o.duration / 1e3)), e++, 10 < e))
						break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection &&
			((e = navigator.connection.downlink), typeof e == "number")
			? e
			: 5;
	}
	var yc = null,
		vc = null;
	function yr(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Fm(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg":
				return 1;
			case "http://www.w3.org/1998/Math/MathML":
				return 2;
			default:
				return 0;
		}
	}
	function Jm(e, t) {
		if (e === 0)
			switch (t) {
				case "svg":
					return 1;
				case "math":
					return 2;
				default:
					return 0;
			}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function bc(e, t) {
		return (
			e === "textarea" ||
			e === "noscript" ||
			typeof t.children == "string" ||
			typeof t.children == "number" ||
			typeof t.children == "bigint" ||
			(typeof t.dangerouslySetInnerHTML == "object" &&
				t.dangerouslySetInnerHTML !== null &&
				t.dangerouslySetInnerHTML.__html != null)
		);
	}
	var wc = null;
	function q4() {
		var e = window.event;
		return e && e.type === "popstate"
			? e === wc
				? !1
				: ((wc = e), !0)
			: ((wc = null), !1);
	}
	var Wm = typeof setTimeout == "function" ? setTimeout : void 0,
		Z4 = typeof clearTimeout == "function" ? clearTimeout : void 0,
		$m = typeof Promise == "function" ? Promise : void 0,
		X4 =
			typeof queueMicrotask == "function"
				? queueMicrotask
				: typeof $m < "u"
					? function (e) {
							return $m.resolve(null).then(e).catch(K4);
						}
					: Wm;
	function K4(e) {
		setTimeout(function () {
			throw e;
		});
	}
	function fa(e) {
		return e === "head";
	}
	function Im(e, t) {
		var a = t,
			l = 0;
		do {
			var o = a.nextSibling;
			if ((e.removeChild(a), o && o.nodeType === 8))
				if (((a = o.data), a === "/$" || a === "/&")) {
					if (l === 0) {
						e.removeChild(o), Bi(t);
						return;
					}
					l--;
				} else if (
					a === "$" ||
					a === "$?" ||
					a === "$~" ||
					a === "$!" ||
					a === "&"
				)
					l++;
				else if (a === "html") _l(e.ownerDocument.documentElement);
				else if (a === "head") {
					(a = e.ownerDocument.head), _l(a);
					for (var c = a.firstChild; c; ) {
						var m = c.nextSibling,
							b = c.nodeName;
						c[tl] ||
							b === "SCRIPT" ||
							b === "STYLE" ||
							(b === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
							a.removeChild(c),
							(c = m);
					}
				} else a === "body" && _l(e.ownerDocument.body);
			a = o;
		} while (a);
		Bi(t);
	}
	function e0(e, t) {
		var a = e;
		e = 0;
		do {
			var l = a.nextSibling;
			if (
				(a.nodeType === 1
					? t
						? ((a._stashedDisplay = a.style.display),
							(a.style.display = "none"))
						: ((a.style.display = a._stashedDisplay || ""),
							a.getAttribute("style") === "" && a.removeAttribute("style"))
					: a.nodeType === 3 &&
						(t
							? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
							: (a.nodeValue = a._stashedText || "")),
				l && l.nodeType === 8)
			)
				if (((a = l.data), a === "/$")) {
					if (e === 0) break;
					e--;
				} else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || e++;
			a = l;
		} while (a);
	}
	function Sc(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
			var a = t;
			switch (((t = t.nextSibling), a.nodeName)) {
				case "HTML":
				case "HEAD":
				case "BODY":
					Sc(a), Eo(a);
					continue;
				case "SCRIPT":
				case "STYLE":
					continue;
				case "LINK":
					if (a.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(a);
		}
	}
	function Q4(e, t, a, l) {
		for (; e.nodeType === 1; ) {
			var o = a;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (l) {
				if (!e[tl])
					switch (t) {
						case "meta":
							if (!e.hasAttribute("itemprop")) break;
							return e;
						case "link":
							if (
								((c = e.getAttribute("rel")),
								c === "stylesheet" && e.hasAttribute("data-precedence"))
							)
								break;
							if (
								c !== o.rel ||
								e.getAttribute("href") !==
									(o.href == null || o.href === "" ? null : o.href) ||
								e.getAttribute("crossorigin") !==
									(o.crossOrigin == null ? null : o.crossOrigin) ||
								e.getAttribute("title") !== (o.title == null ? null : o.title)
							)
								break;
							return e;
						case "style":
							if (e.hasAttribute("data-precedence")) break;
							return e;
						case "script":
							if (
								((c = e.getAttribute("src")),
								(c !== (o.src == null ? null : o.src) ||
									e.getAttribute("type") !== (o.type == null ? null : o.type) ||
									e.getAttribute("crossorigin") !==
										(o.crossOrigin == null ? null : o.crossOrigin)) &&
									c &&
									e.hasAttribute("async") &&
									!e.hasAttribute("itemprop"))
							)
								break;
							return e;
						default:
							return e;
					}
			} else if (t === "input" && e.type === "hidden") {
				var c = o.name == null ? null : "" + o.name;
				if (o.type === "hidden" && e.getAttribute("name") === c) return e;
			} else return e;
			if (((e = Pt(e.nextSibling)), e === null)) break;
		}
		return null;
	}
	function P4(e, t, a) {
		if (t === "") return null;
		for (; e.nodeType !== 3; )
			if (
				((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
					!a) ||
				((e = Pt(e.nextSibling)), e === null)
			)
				return null;
		return e;
	}
	function t0(e, t) {
		for (; e.nodeType !== 8; )
			if (
				((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
					!t) ||
				((e = Pt(e.nextSibling)), e === null)
			)
				return null;
		return e;
	}
	function Cc(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function jc(e) {
		return (
			e.data === "$!" ||
			(e.data === "$?" && e.ownerDocument.readyState !== "loading")
		);
	}
	function F4(e, t) {
		var a = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || a.readyState !== "loading") t();
		else {
			var l = function () {
				t(), a.removeEventListener("DOMContentLoaded", l);
			};
			a.addEventListener("DOMContentLoaded", l), (e._reactRetry = l);
		}
	}
	function Pt(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (
					((t = e.data),
					t === "$" ||
						t === "$!" ||
						t === "$?" ||
						t === "$~" ||
						t === "&" ||
						t === "F!" ||
						t === "F")
				)
					break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var Tc = null;
	function n0(e) {
		e = e.nextSibling;
		for (var t = 0; e; ) {
			if (e.nodeType === 8) {
				var a = e.data;
				if (a === "/$" || a === "/&") {
					if (t === 0) return Pt(e.nextSibling);
					t--;
				} else
					(a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
						t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function a0(e) {
		e = e.previousSibling;
		for (var t = 0; e; ) {
			if (e.nodeType === 8) {
				var a = e.data;
				if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
					if (t === 0) return e;
					t--;
				} else (a !== "/$" && a !== "/&") || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function i0(e, t, a) {
		switch (((t = yr(a)), e)) {
			case "html":
				if (((e = t.documentElement), !e)) throw Error(r(452));
				return e;
			case "head":
				if (((e = t.head), !e)) throw Error(r(453));
				return e;
			case "body":
				if (((e = t.body), !e)) throw Error(r(454));
				return e;
			default:
				throw Error(r(451));
		}
	}
	function _l(e) {
		for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
		Eo(e);
	}
	var Ft = new Map(),
		l0 = new Set();
	function vr(e) {
		return typeof e.getRootNode == "function"
			? e.getRootNode()
			: e.nodeType === 9
				? e
				: e.ownerDocument;
	}
	var Un = Z.d;
	Z.d = { f: J4, r: W4, D: $4, C: I4, L: ex, m: tx, X: ax, S: nx, M: ix };
	function J4() {
		var e = Un.f(),
			t = cr();
		return e || t;
	}
	function W4(e) {
		var t = ti(e);
		t !== null && t.tag === 5 && t.type === "form" ? S1(t) : Un.r(e);
	}
	var zi = typeof document > "u" ? null : document;
	function s0(e, t, a) {
		var l = zi;
		if (l && typeof t == "string" && t) {
			var o = Gt(t);
			(o = 'link[rel="' + e + '"][href="' + o + '"]'),
				typeof a == "string" && (o += '[crossorigin="' + a + '"]'),
				l0.has(o) ||
					(l0.add(o),
					(e = { rel: e, crossOrigin: a, href: t }),
					l.querySelector(o) === null &&
						((t = l.createElement("link")),
						mt(t, "link", e),
						st(t),
						l.head.appendChild(t)));
		}
	}
	function $4(e) {
		Un.D(e), s0("dns-prefetch", e, null);
	}
	function I4(e, t) {
		Un.C(e, t), s0("preconnect", e, t);
	}
	function ex(e, t, a) {
		Un.L(e, t, a);
		var l = zi;
		if (l && e && t) {
			var o = 'link[rel="preload"][as="' + Gt(t) + '"]';
			t === "image" && a && a.imageSrcSet
				? ((o += '[imagesrcset="' + Gt(a.imageSrcSet) + '"]'),
					typeof a.imageSizes == "string" &&
						(o += '[imagesizes="' + Gt(a.imageSizes) + '"]'))
				: (o += '[href="' + Gt(e) + '"]');
			var c = o;
			switch (t) {
				case "style":
					c = Oi(e);
					break;
				case "script":
					c = Vi(e);
			}
			Ft.has(c) ||
				((e = v(
					{
						rel: "preload",
						href: t === "image" && a && a.imageSrcSet ? void 0 : e,
						as: t,
					},
					a,
				)),
				Ft.set(c, e),
				l.querySelector(o) !== null ||
					(t === "style" && l.querySelector(kl(c))) ||
					(t === "script" && l.querySelector(Hl(c))) ||
					((t = l.createElement("link")),
					mt(t, "link", e),
					st(t),
					l.head.appendChild(t)));
		}
	}
	function tx(e, t) {
		Un.m(e, t);
		var a = zi;
		if (a && e) {
			var l = t && typeof t.as == "string" ? t.as : "script",
				o =
					'link[rel="modulepreload"][as="' + Gt(l) + '"][href="' + Gt(e) + '"]',
				c = o;
			switch (l) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script":
					c = Vi(e);
			}
			if (
				!Ft.has(c) &&
				((e = v({ rel: "modulepreload", href: e }, t)),
				Ft.set(c, e),
				a.querySelector(o) === null)
			) {
				switch (l) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script":
						if (a.querySelector(Hl(c))) return;
				}
				(l = a.createElement("link")),
					mt(l, "link", e),
					st(l),
					a.head.appendChild(l);
			}
		}
	}
	function nx(e, t, a) {
		Un.S(e, t, a);
		var l = zi;
		if (l && e) {
			var o = ni(l).hoistableStyles,
				c = Oi(e);
			t = t || "default";
			var m = o.get(c);
			if (!m) {
				var b = { loading: 0, preload: null };
				if ((m = l.querySelector(kl(c)))) b.loading = 5;
				else {
					(e = v({ rel: "stylesheet", href: e, "data-precedence": t }, a)),
						(a = Ft.get(c)) && Ac(e, a);
					var S = (m = l.createElement("link"));
					st(S),
						mt(S, "link", e),
						(S._p = new Promise(function (D, _) {
							(S.onload = D), (S.onerror = _);
						})),
						S.addEventListener("load", function () {
							b.loading |= 1;
						}),
						S.addEventListener("error", function () {
							b.loading |= 2;
						}),
						(b.loading |= 4),
						br(m, t, l);
				}
				(m = { type: "stylesheet", instance: m, count: 1, state: b }),
					o.set(c, m);
			}
		}
	}
	function ax(e, t) {
		Un.X(e, t);
		var a = zi;
		if (a && e) {
			var l = ni(a).hoistableScripts,
				o = Vi(e),
				c = l.get(o);
			c ||
				((c = a.querySelector(Hl(o))),
				c ||
					((e = v({ src: e, async: !0 }, t)),
					(t = Ft.get(o)) && Ec(e, t),
					(c = a.createElement("script")),
					st(c),
					mt(c, "link", e),
					a.head.appendChild(c)),
				(c = { type: "script", instance: c, count: 1, state: null }),
				l.set(o, c));
		}
	}
	function ix(e, t) {
		Un.M(e, t);
		var a = zi;
		if (a && e) {
			var l = ni(a).hoistableScripts,
				o = Vi(e),
				c = l.get(o);
			c ||
				((c = a.querySelector(Hl(o))),
				c ||
					((e = v({ src: e, async: !0, type: "module" }, t)),
					(t = Ft.get(o)) && Ec(e, t),
					(c = a.createElement("script")),
					st(c),
					mt(c, "link", e),
					a.head.appendChild(c)),
				(c = { type: "script", instance: c, count: 1, state: null }),
				l.set(o, c));
		}
	}
	function r0(e, t, a, l) {
		var o = (o = oe.current) ? vr(o) : null;
		if (!o) throw Error(r(446));
		switch (e) {
			case "meta":
			case "title":
				return null;
			case "style":
				return typeof a.precedence == "string" && typeof a.href == "string"
					? ((t = Oi(a.href)),
						(a = ni(o).hoistableStyles),
						(l = a.get(t)),
						l ||
							((l = { type: "style", instance: null, count: 0, state: null }),
							a.set(t, l)),
						l)
					: { type: "void", instance: null, count: 0, state: null };
			case "link":
				if (
					a.rel === "stylesheet" &&
					typeof a.href == "string" &&
					typeof a.precedence == "string"
				) {
					e = Oi(a.href);
					var c = ni(o).hoistableStyles,
						m = c.get(e);
					if (
						(m ||
							((o = o.ownerDocument || o),
							(m = {
								type: "stylesheet",
								instance: null,
								count: 0,
								state: { loading: 0, preload: null },
							}),
							c.set(e, m),
							(c = o.querySelector(kl(e))) &&
								!c._p &&
								((m.instance = c), (m.state.loading = 5)),
							Ft.has(e) ||
								((a = {
									rel: "preload",
									as: "style",
									href: a.href,
									crossOrigin: a.crossOrigin,
									integrity: a.integrity,
									media: a.media,
									hrefLang: a.hrefLang,
									referrerPolicy: a.referrerPolicy,
								}),
								Ft.set(e, a),
								c || lx(o, e, a, m.state))),
						t && l === null)
					)
						throw Error(r(528, ""));
					return m;
				}
				if (t && l !== null) throw Error(r(529, ""));
				return null;
			case "script":
				return (
					(t = a.async),
					(a = a.src),
					typeof a == "string" &&
					t &&
					typeof t != "function" &&
					typeof t != "symbol"
						? ((t = Vi(a)),
							(a = ni(o).hoistableScripts),
							(l = a.get(t)),
							l ||
								((l = {
									type: "script",
									instance: null,
									count: 0,
									state: null,
								}),
								a.set(t, l)),
							l)
						: { type: "void", instance: null, count: 0, state: null }
				);
			default:
				throw Error(r(444, e));
		}
	}
	function Oi(e) {
		return 'href="' + Gt(e) + '"';
	}
	function kl(e) {
		return 'link[rel="stylesheet"][' + e + "]";
	}
	function o0(e) {
		return v({}, e, { "data-precedence": e.precedence, precedence: null });
	}
	function lx(e, t, a, l) {
		e.querySelector('link[rel="preload"][as="style"][' + t + "]")
			? (l.loading = 1)
			: ((t = e.createElement("link")),
				(l.preload = t),
				t.addEventListener("load", function () {
					return (l.loading |= 1);
				}),
				t.addEventListener("error", function () {
					return (l.loading |= 2);
				}),
				mt(t, "link", a),
				st(t),
				e.head.appendChild(t));
	}
	function Vi(e) {
		return '[src="' + Gt(e) + '"]';
	}
	function Hl(e) {
		return "script[async]" + e;
	}
	function u0(e, t, a) {
		if ((t.count++, t.instance === null))
			switch (t.type) {
				case "style":
					var l = e.querySelector('style[data-href~="' + Gt(a.href) + '"]');
					if (l) return (t.instance = l), st(l), l;
					var o = v({}, a, {
						"data-href": a.href,
						"data-precedence": a.precedence,
						href: null,
						precedence: null,
					});
					return (
						(l = (e.ownerDocument || e).createElement("style")),
						st(l),
						mt(l, "style", o),
						br(l, a.precedence, e),
						(t.instance = l)
					);
				case "stylesheet":
					o = Oi(a.href);
					var c = e.querySelector(kl(o));
					if (c) return (t.state.loading |= 4), (t.instance = c), st(c), c;
					(l = o0(a)),
						(o = Ft.get(o)) && Ac(l, o),
						(c = (e.ownerDocument || e).createElement("link")),
						st(c);
					var m = c;
					return (
						(m._p = new Promise(function (b, S) {
							(m.onload = b), (m.onerror = S);
						})),
						mt(c, "link", l),
						(t.state.loading |= 4),
						br(c, a.precedence, e),
						(t.instance = c)
					);
				case "script":
					return (
						(c = Vi(a.src)),
						(o = e.querySelector(Hl(c)))
							? ((t.instance = o), st(o), o)
							: ((l = a),
								(o = Ft.get(c)) && ((l = v({}, a)), Ec(l, o)),
								(e = e.ownerDocument || e),
								(o = e.createElement("script")),
								st(o),
								mt(o, "link", l),
								e.head.appendChild(o),
								(t.instance = o))
					);
				case "void":
					return null;
				default:
					throw Error(r(443, t.type));
			}
		else
			t.type === "stylesheet" &&
				(t.state.loading & 4) === 0 &&
				((l = t.instance), (t.state.loading |= 4), br(l, a.precedence, e));
		return t.instance;
	}
	function br(e, t, a) {
		for (
			var l = a.querySelectorAll(
					'link[rel="stylesheet"][data-precedence],style[data-precedence]',
				),
				o = l.length ? l[l.length - 1] : null,
				c = o,
				m = 0;
			m < l.length;
			m++
		) {
			var b = l[m];
			if (b.dataset.precedence === t) c = b;
			else if (c !== o) break;
		}
		c
			? c.parentNode.insertBefore(e, c.nextSibling)
			: ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
	}
	function Ac(e, t) {
		e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
			e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
			e.title == null && (e.title = t.title);
	}
	function Ec(e, t) {
		e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
			e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
			e.integrity == null && (e.integrity = t.integrity);
	}
	var wr = null;
	function c0(e, t, a) {
		if (wr === null) {
			var l = new Map(),
				o = (wr = new Map());
			o.set(a, l);
		} else (o = wr), (l = o.get(a)), l || ((l = new Map()), o.set(a, l));
		if (l.has(e)) return l;
		for (
			l.set(e, null), a = a.getElementsByTagName(e), o = 0;
			o < a.length;
			o++
		) {
			var c = a[o];
			if (
				!(
					c[tl] ||
					c[ct] ||
					(e === "link" && c.getAttribute("rel") === "stylesheet")
				) &&
				c.namespaceURI !== "http://www.w3.org/2000/svg"
			) {
				var m = c.getAttribute(t) || "";
				m = e + m;
				var b = l.get(m);
				b ? b.push(c) : l.set(m, [c]);
			}
		}
		return l;
	}
	function f0(e, t, a) {
		(e = e.ownerDocument || e),
			e.head.insertBefore(
				a,
				t === "title" ? e.querySelector("head > title") : null,
			);
	}
	function sx(e, t, a) {
		if (a === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title":
				return !0;
			case "style":
				if (
					typeof t.precedence != "string" ||
					typeof t.href != "string" ||
					t.href === ""
				)
					break;
				return !0;
			case "link":
				if (
					typeof t.rel != "string" ||
					typeof t.href != "string" ||
					t.href === "" ||
					t.onLoad ||
					t.onError
				)
					break;
				return t.rel === "stylesheet"
					? ((e = t.disabled), typeof t.precedence == "string" && e == null)
					: !0;
			case "script":
				if (
					t.async &&
					typeof t.async != "function" &&
					typeof t.async != "symbol" &&
					!t.onLoad &&
					!t.onError &&
					t.src &&
					typeof t.src == "string"
				)
					return !0;
		}
		return !1;
	}
	function d0(e) {
		return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
	}
	function rx(e, t, a, l) {
		if (
			a.type === "stylesheet" &&
			(typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
			(a.state.loading & 4) === 0
		) {
			if (a.instance === null) {
				var o = Oi(l.href),
					c = t.querySelector(kl(o));
				if (c) {
					(t = c._p),
						t !== null &&
							typeof t == "object" &&
							typeof t.then == "function" &&
							(e.count++, (e = Sr.bind(e)), t.then(e, e)),
						(a.state.loading |= 4),
						(a.instance = c),
						st(c);
					return;
				}
				(c = t.ownerDocument || t),
					(l = o0(l)),
					(o = Ft.get(o)) && Ac(l, o),
					(c = c.createElement("link")),
					st(c);
				var m = c;
				(m._p = new Promise(function (b, S) {
					(m.onload = b), (m.onerror = S);
				})),
					mt(c, "link", l),
					(a.instance = c);
			}
			e.stylesheets === null && (e.stylesheets = new Map()),
				e.stylesheets.set(a, t),
				(t = a.state.preload) &&
					(a.state.loading & 3) === 0 &&
					(e.count++,
					(a = Sr.bind(e)),
					t.addEventListener("load", a),
					t.addEventListener("error", a));
		}
	}
	var Mc = 0;
	function ox(e, t) {
		return (
			e.stylesheets && e.count === 0 && jr(e, e.stylesheets),
			0 < e.count || 0 < e.imgCount
				? function (a) {
						var l = setTimeout(function () {
							if ((e.stylesheets && jr(e, e.stylesheets), e.unsuspend)) {
								var c = e.unsuspend;
								(e.unsuspend = null), c();
							}
						}, 6e4 + t);
						0 < e.imgBytes && Mc === 0 && (Mc = 62500 * Y4());
						var o = setTimeout(
							function () {
								if (
									((e.waitingForImages = !1),
									e.count === 0 &&
										(e.stylesheets && jr(e, e.stylesheets), e.unsuspend))
								) {
									var c = e.unsuspend;
									(e.unsuspend = null), c();
								}
							},
							(e.imgBytes > Mc ? 50 : 800) + t,
						);
						return (
							(e.unsuspend = a),
							function () {
								(e.unsuspend = null), clearTimeout(l), clearTimeout(o);
							}
						);
					}
				: null
		);
	}
	function Sr() {
		if (
			(this.count--,
			this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
		) {
			if (this.stylesheets) jr(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				(this.unsuspend = null), e();
			}
		}
	}
	var Cr = null;
	function jr(e, t) {
		(e.stylesheets = null),
			e.unsuspend !== null &&
				(e.count++,
				(Cr = new Map()),
				t.forEach(ux, e),
				(Cr = null),
				Sr.call(e));
	}
	function ux(e, t) {
		if (!(t.state.loading & 4)) {
			var a = Cr.get(e);
			if (a) var l = a.get(null);
			else {
				(a = new Map()), Cr.set(e, a);
				for (
					var o = e.querySelectorAll(
							"link[data-precedence],style[data-precedence]",
						),
						c = 0;
					c < o.length;
					c++
				) {
					var m = o[c];
					(m.nodeName === "LINK" || m.getAttribute("media") !== "not all") &&
						(a.set(m.dataset.precedence, m), (l = m));
				}
				l && a.set(null, l);
			}
			(o = t.instance),
				(m = o.getAttribute("data-precedence")),
				(c = a.get(m) || l),
				c === l && a.set(null, o),
				a.set(m, o),
				this.count++,
				(l = Sr.bind(this)),
				o.addEventListener("load", l),
				o.addEventListener("error", l),
				c
					? c.parentNode.insertBefore(o, c.nextSibling)
					: ((e = e.nodeType === 9 ? e.head : e),
						e.insertBefore(o, e.firstChild)),
				(t.state.loading |= 4);
		}
	}
	var Ul = {
		$$typeof: k,
		Provider: null,
		Consumer: null,
		_currentValue: $,
		_currentValue2: $,
		_threadCount: 0,
	};
	function cx(e, t, a, l, o, c, m, b, S) {
		(this.tag = 1),
			(this.containerInfo = e),
			(this.pingCache = this.current = this.pendingChildren = null),
			(this.timeoutHandle = -1),
			(this.callbackNode =
				this.next =
				this.pendingContext =
				this.context =
				this.cancelPendingCommit =
					null),
			(this.callbackPriority = 0),
			(this.expirationTimes = Co(-1)),
			(this.entangledLanes =
				this.shellSuspendCounter =
				this.errorRecoveryDisabledLanes =
				this.expiredLanes =
				this.warmLanes =
				this.pingedLanes =
				this.suspendedLanes =
				this.pendingLanes =
					0),
			(this.entanglements = Co(0)),
			(this.hiddenUpdates = Co(null)),
			(this.identifierPrefix = l),
			(this.onUncaughtError = o),
			(this.onCaughtError = c),
			(this.onRecoverableError = m),
			(this.pooledCache = null),
			(this.pooledCacheLanes = 0),
			(this.formState = S),
			(this.incompleteTransitions = new Map());
	}
	function h0(e, t, a, l, o, c, m, b, S, D, _, G) {
		return (
			(e = new cx(e, t, a, m, S, D, _, G, b)),
			(t = 1),
			c === !0 && (t |= 24),
			(c = zt(3, null, null, t)),
			(e.current = c),
			(c.stateNode = e),
			(t = ru()),
			t.refCount++,
			(e.pooledCache = t),
			t.refCount++,
			(c.memoizedState = { element: l, isDehydrated: a, cache: t }),
			fu(c),
			e
		);
	}
	function m0(e) {
		return e ? ((e = di), e) : di;
	}
	function p0(e, t, a, l, o, c) {
		(o = m0(o)),
			l.context === null ? (l.context = o) : (l.pendingContext = o),
			(l = ea(t)),
			(l.payload = { element: a }),
			(c = c === void 0 ? null : c),
			c !== null && (l.callback = c),
			(a = ta(e, l, t)),
			a !== null && (Et(a, e, t), yl(a, e, t));
	}
	function g0(e, t) {
		if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
			var a = e.retryLane;
			e.retryLane = a !== 0 && a < t ? a : t;
		}
	}
	function Nc(e, t) {
		g0(e, t), (e = e.alternate) && g0(e, t);
	}
	function x0(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Ra(e, 67108864);
			t !== null && Et(t, e, 67108864), Nc(e, 67108864);
		}
	}
	function y0(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = kt();
			t = jo(t);
			var a = Ra(e, t);
			a !== null && Et(a, e, t), Nc(e, t);
		}
	}
	var Tr = !0;
	function fx(e, t, a, l) {
		var o = B.T;
		B.T = null;
		var c = Z.p;
		try {
			(Z.p = 2), Rc(e, t, a, l);
		} finally {
			(Z.p = c), (B.T = o);
		}
	}
	function dx(e, t, a, l) {
		var o = B.T;
		B.T = null;
		var c = Z.p;
		try {
			(Z.p = 8), Rc(e, t, a, l);
		} finally {
			(Z.p = c), (B.T = o);
		}
	}
	function Rc(e, t, a, l) {
		if (Tr) {
			var o = Dc(l);
			if (o === null) gc(e, t, l, Ar, a), b0(e, l);
			else if (mx(o, e, t, a, l)) l.stopPropagation();
			else if ((b0(e, l), t & 4 && -1 < hx.indexOf(e))) {
				for (; o !== null; ) {
					var c = ti(o);
					if (c !== null)
						switch (c.tag) {
							case 3:
								if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
									var m = Ta(c.pendingLanes);
									if (m !== 0) {
										var b = c;
										for (b.pendingLanes |= 2, b.entangledLanes |= 2; m; ) {
											var S = 1 << (31 - Dt(m));
											(b.entanglements[1] |= S), (m &= ~S);
										}
										mn(c), (Ee & 6) === 0 && ((or = Nt() + 500), Ol(0));
									}
								}
								break;
							case 31:
							case 13:
								(b = Ra(c, 2)), b !== null && Et(b, c, 2), cr(), Nc(c, 2);
						}
					if (((c = Dc(l)), c === null && gc(e, t, l, Ar, a), c === o)) break;
					o = c;
				}
				o !== null && l.stopPropagation();
			} else gc(e, t, l, null, a);
		}
	}
	function Dc(e) {
		return (e = zo(e)), Lc(e);
	}
	var Ar = null;
	function Lc(e) {
		if (((Ar = null), (e = ei(e)), e !== null)) {
			var t = h(e);
			if (t === null) e = null;
			else {
				var a = t.tag;
				if (a === 13) {
					if (((e = d(t)), e !== null)) return e;
					e = null;
				} else if (a === 31) {
					if (((e = g(t)), e !== null)) return e;
					e = null;
				} else if (a === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated)
						return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return (Ar = e), null;
	}
	function v0(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart":
				return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave":
				return 8;
			case "message":
				switch ($5()) {
					case Ed:
						return 2;
					case Md:
						return 8;
					case ps:
					case I5:
						return 32;
					case Nd:
						return 268435456;
					default:
						return 32;
				}
			default:
				return 32;
		}
	}
	var zc = !1,
		da = null,
		ha = null,
		ma = null,
		Gl = new Map(),
		Yl = new Map(),
		pa = [],
		hx =
			"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
				" ",
			);
	function b0(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				da = null;
				break;
			case "dragenter":
			case "dragleave":
				ha = null;
				break;
			case "mouseover":
			case "mouseout":
				ma = null;
				break;
			case "pointerover":
			case "pointerout":
				Gl.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture":
				Yl.delete(t.pointerId);
		}
	}
	function ql(e, t, a, l, o, c) {
		return e === null || e.nativeEvent !== c
			? ((e = {
					blockedOn: t,
					domEventName: a,
					eventSystemFlags: l,
					nativeEvent: c,
					targetContainers: [o],
				}),
				t !== null && ((t = ti(t)), t !== null && x0(t)),
				e)
			: ((e.eventSystemFlags |= l),
				(t = e.targetContainers),
				o !== null && t.indexOf(o) === -1 && t.push(o),
				e);
	}
	function mx(e, t, a, l, o) {
		switch (t) {
			case "focusin":
				return (da = ql(da, e, t, a, l, o)), !0;
			case "dragenter":
				return (ha = ql(ha, e, t, a, l, o)), !0;
			case "mouseover":
				return (ma = ql(ma, e, t, a, l, o)), !0;
			case "pointerover":
				var c = o.pointerId;
				return Gl.set(c, ql(Gl.get(c) || null, e, t, a, l, o)), !0;
			case "gotpointercapture":
				return (
					(c = o.pointerId), Yl.set(c, ql(Yl.get(c) || null, e, t, a, l, o)), !0
				);
		}
		return !1;
	}
	function w0(e) {
		var t = ei(e.target);
		if (t !== null) {
			var a = h(t);
			if (a !== null) {
				if (((t = a.tag), t === 13)) {
					if (((t = d(a)), t !== null)) {
						(e.blockedOn = t),
							Vd(e.priority, function () {
								y0(a);
							});
						return;
					}
				} else if (t === 31) {
					if (((t = g(a)), t !== null)) {
						(e.blockedOn = t),
							Vd(e.priority, function () {
								y0(a);
							});
						return;
					}
				} else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Er(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length; ) {
			var a = Dc(e.nativeEvent);
			if (a === null) {
				a = e.nativeEvent;
				var l = new a.constructor(a.type, a);
				(Lo = l), a.target.dispatchEvent(l), (Lo = null);
			} else return (t = ti(a)), t !== null && x0(t), (e.blockedOn = a), !1;
			t.shift();
		}
		return !0;
	}
	function S0(e, t, a) {
		Er(e) && a.delete(t);
	}
	function px() {
		(zc = !1),
			da !== null && Er(da) && (da = null),
			ha !== null && Er(ha) && (ha = null),
			ma !== null && Er(ma) && (ma = null),
			Gl.forEach(S0),
			Yl.forEach(S0);
	}
	function Mr(e, t) {
		e.blockedOn === t &&
			((e.blockedOn = null),
			zc ||
				((zc = !0),
				n.unstable_scheduleCallback(n.unstable_NormalPriority, px)));
	}
	var Nr = null;
	function C0(e) {
		Nr !== e &&
			((Nr = e),
			n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
				Nr === e && (Nr = null);
				for (var t = 0; t < e.length; t += 3) {
					var a = e[t],
						l = e[t + 1],
						o = e[t + 2];
					if (typeof l != "function") {
						if (Lc(l || a) === null) continue;
						break;
					}
					var c = ti(a);
					c !== null &&
						(e.splice(t, 3),
						(t -= 3),
						Du(c, { pending: !0, data: o, method: a.method, action: l }, l, o));
				}
			}));
	}
	function Bi(e) {
		function t(S) {
			return Mr(S, e);
		}
		da !== null && Mr(da, e),
			ha !== null && Mr(ha, e),
			ma !== null && Mr(ma, e),
			Gl.forEach(t),
			Yl.forEach(t);
		for (var a = 0; a < pa.length; a++) {
			var l = pa[a];
			l.blockedOn === e && (l.blockedOn = null);
		}
		for (; 0 < pa.length && ((a = pa[0]), a.blockedOn === null); )
			w0(a), a.blockedOn === null && pa.shift();
		if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
			for (l = 0; l < a.length; l += 3) {
				var o = a[l],
					c = a[l + 1],
					m = o[wt] || null;
				if (typeof c == "function") m || C0(a);
				else if (m) {
					var b = null;
					if (c && c.hasAttribute("formAction")) {
						if (((o = c), (m = c[wt] || null))) b = m.formAction;
						else if (Lc(o) !== null) continue;
					} else b = m.action;
					typeof b == "function" ? (a[l + 1] = b) : (a.splice(l, 3), (l -= 3)),
						C0(a);
				}
			}
	}
	function j0() {
		function e(c) {
			c.canIntercept &&
				c.info === "react-transition" &&
				c.intercept({
					handler: function () {
						return new Promise(function (m) {
							return (o = m);
						});
					},
					focusReset: "manual",
					scroll: "manual",
				});
		}
		function t() {
			o !== null && (o(), (o = null)), l || setTimeout(a, 20);
		}
		function a() {
			if (!l && !navigation.transition) {
				var c = navigation.currentEntry;
				c &&
					c.url != null &&
					navigation.navigate(c.url, {
						state: c.getState(),
						info: "react-transition",
						history: "replace",
					});
			}
		}
		if (typeof navigation == "object") {
			var l = !1,
				o = null;
			return (
				navigation.addEventListener("navigate", e),
				navigation.addEventListener("navigatesuccess", t),
				navigation.addEventListener("navigateerror", t),
				setTimeout(a, 100),
				function () {
					(l = !0),
						navigation.removeEventListener("navigate", e),
						navigation.removeEventListener("navigatesuccess", t),
						navigation.removeEventListener("navigateerror", t),
						o !== null && (o(), (o = null));
				}
			);
		}
	}
	function Oc(e) {
		this._internalRoot = e;
	}
	(Rr.prototype.render = Oc.prototype.render =
		function (e) {
			var t = this._internalRoot;
			if (t === null) throw Error(r(409));
			var a = t.current,
				l = kt();
			p0(a, l, e, t, null, null);
		}),
		(Rr.prototype.unmount = Oc.prototype.unmount =
			function () {
				var e = this._internalRoot;
				if (e !== null) {
					this._internalRoot = null;
					var t = e.containerInfo;
					p0(e.current, 2, null, e, null, null), cr(), (t[Ia] = null);
				}
			});
	function Rr(e) {
		this._internalRoot = e;
	}
	Rr.prototype.unstable_scheduleHydration = function (e) {
		if (e) {
			var t = Od();
			e = { blockedOn: null, target: e, priority: t };
			for (var a = 0; a < pa.length && t !== 0 && t < pa[a].priority; a++);
			pa.splice(a, 0, e), a === 0 && w0(e);
		}
	};
	var T0 = i.version;
	if (T0 !== "19.2.4") throw Error(r(527, T0, "19.2.4"));
	Z.findDOMNode = function (e) {
		var t = e._reactInternals;
		if (t === void 0)
			throw typeof e.render == "function"
				? Error(r(188))
				: ((e = Object.keys(e).join(",")), Error(r(268, e)));
		return (
			(e = x(t)),
			(e = e !== null ? y(e) : null),
			(e = e === null ? null : e.stateNode),
			e
		);
	};
	var gx = {
		bundleType: 0,
		version: "19.2.4",
		rendererPackageName: "react-dom",
		currentDispatcherRef: B,
		reconcilerVersion: "19.2.4",
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Dr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Dr.isDisabled && Dr.supportsFiber)
			try {
				($i = Dr.inject(gx)), (Rt = Dr);
			} catch {}
	}
	return (
		(Xl.createRoot = function (e, t) {
			if (!u(e)) throw Error(r(299));
			var a = !1,
				l = "",
				o = L1,
				c = z1,
				m = O1;
			return (
				t != null &&
					(t.unstable_strictMode === !0 && (a = !0),
					t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
					t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
					t.onCaughtError !== void 0 && (c = t.onCaughtError),
					t.onRecoverableError !== void 0 && (m = t.onRecoverableError)),
				(t = h0(e, 1, !1, null, null, a, l, null, o, c, m, j0)),
				(e[Ia] = t.current),
				pc(e),
				new Oc(t)
			);
		}),
		(Xl.hydrateRoot = function (e, t, a) {
			if (!u(e)) throw Error(r(299));
			var l = !1,
				o = "",
				c = L1,
				m = z1,
				b = O1,
				S = null;
			return (
				a != null &&
					(a.unstable_strictMode === !0 && (l = !0),
					a.identifierPrefix !== void 0 && (o = a.identifierPrefix),
					a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
					a.onCaughtError !== void 0 && (m = a.onCaughtError),
					a.onRecoverableError !== void 0 && (b = a.onRecoverableError),
					a.formState !== void 0 && (S = a.formState)),
				(t = h0(e, 1, !0, t, a ?? null, l, o, S, c, m, b, j0)),
				(t.context = m0(null)),
				(a = t.current),
				(l = kt()),
				(l = jo(l)),
				(o = ea(l)),
				(o.callback = null),
				ta(a, o, l),
				(a = l),
				(t.current.lanes = a),
				el(t, a),
				mn(t),
				(e[Ia] = t.current),
				pc(e),
				new Rr(t)
			);
		}),
		(Xl.version = "19.2.4"),
		Xl
	);
}
var V0;
function Ax() {
	if (V0) return _c.exports;
	V0 = 1;
	function n() {
		if (
			!(
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
				typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
			)
		)
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (i) {
				console.error(i);
			}
	}
	return n(), (_c.exports = Tx()), _c.exports;
}
var Ex = Ax();
var B0 = "popstate";
function _0(n) {
	return (
		typeof n == "object" &&
		n != null &&
		"pathname" in n &&
		"search" in n &&
		"hash" in n &&
		"state" in n &&
		"key" in n
	);
}
function Mx(n = {}) {
	function i(r, u) {
		let h = u.state?.masked,
			{ pathname: d, search: g, hash: p } = h || r.location;
		return ff(
			"",
			{ pathname: d, search: g, hash: p },
			(u.state && u.state.usr) || null,
			(u.state && u.state.key) || "default",
			h
				? {
						pathname: r.location.pathname,
						search: r.location.search,
						hash: r.location.hash,
					}
				: void 0,
		);
	}
	function s(r, u) {
		return typeof u == "string" ? u : ts(u);
	}
	return Rx(i, s, null, n);
}
function Ye(n, i) {
	if (n === !1 || n === null || typeof n > "u") throw new Error(i);
}
function bn(n, i) {
	if (!n) {
		typeof console < "u" && console.warn(i);
		try {
			throw new Error(i);
		} catch {}
	}
}
function Nx() {
	return Math.random().toString(36).substring(2, 10);
}
function k0(n, i) {
	return {
		usr: n.state,
		key: n.key,
		idx: i,
		masked: n.unstable_mask
			? { pathname: n.pathname, search: n.search, hash: n.hash }
			: void 0,
	};
}
function ff(n, i, s = null, r, u) {
	return {
		pathname: typeof n == "string" ? n : n.pathname,
		search: "",
		hash: "",
		...(typeof i == "string" ? Qi(i) : i),
		state: s,
		key: (i && i.key) || r || Nx(),
		unstable_mask: u,
	};
}
function ts({ pathname: n = "/", search: i = "", hash: s = "" }) {
	return (
		i && i !== "?" && (n += i.charAt(0) === "?" ? i : "?" + i),
		s && s !== "#" && (n += s.charAt(0) === "#" ? s : "#" + s),
		n
	);
}
function Qi(n) {
	let i = {};
	if (n) {
		let s = n.indexOf("#");
		s >= 0 && ((i.hash = n.substring(s)), (n = n.substring(0, s)));
		let r = n.indexOf("?");
		r >= 0 && ((i.search = n.substring(r)), (n = n.substring(0, r))),
			n && (i.pathname = n);
	}
	return i;
}
function Rx(n, i, s, r = {}) {
	let { window: u = document.defaultView, v5Compat: h = !1 } = r,
		d = u.history,
		g = "POP",
		p = null,
		x = y();
	x == null && ((x = 0), d.replaceState({ ...d.state, idx: x }, ""));
	function y() {
		return (d.state || { idx: null }).idx;
	}
	function v() {
		g = "POP";
		let N = y(),
			V = N == null ? null : N - x;
		(x = N), p && p({ action: g, location: z.location, delta: V });
	}
	function w(N, V) {
		g = "PUSH";
		let q = _0(N) ? N : ff(z.location, N, V);
		x = y() + 1;
		let k = k0(q, x),
			K = z.createHref(q.unstable_mask || q);
		try {
			d.pushState(k, "", K);
		} catch (X) {
			if (X instanceof DOMException && X.name === "DataCloneError") throw X;
			u.location.assign(K);
		}
		h && p && p({ action: g, location: z.location, delta: 1 });
	}
	function A(N, V) {
		g = "REPLACE";
		let q = _0(N) ? N : ff(z.location, N, V);
		x = y();
		let k = k0(q, x),
			K = z.createHref(q.unstable_mask || q);
		d.replaceState(k, "", K),
			h && p && p({ action: g, location: z.location, delta: 0 });
	}
	function M(N) {
		return Dx(N);
	}
	let z = {
		get action() {
			return g;
		},
		get location() {
			return n(u, d);
		},
		listen(N) {
			if (p) throw new Error("A history only accepts one active listener");
			return (
				u.addEventListener(B0, v),
				(p = N),
				() => {
					u.removeEventListener(B0, v), (p = null);
				}
			);
		},
		createHref(N) {
			return i(u, N);
		},
		createURL: M,
		encodeLocation(N) {
			let V = M(N);
			return { pathname: V.pathname, search: V.search, hash: V.hash };
		},
		push: w,
		replace: A,
		go(N) {
			return d.go(N);
		},
	};
	return z;
}
function Dx(n, i = !1) {
	let s = "http://localhost";
	typeof window < "u" &&
		(s =
			window.location.origin !== "null"
				? window.location.origin
				: window.location.href),
		Ye(s, "No window.location.(origin|href) available to create URL");
	let r = typeof n == "string" ? n : ts(n);
	return (
		(r = r.replace(/ $/, "%20")),
		!i && r.startsWith("//") && (r = s + r),
		new URL(r, s)
	);
}
function vg(n, i, s = "/") {
	return Lx(n, i, s, !1);
}
function Lx(n, i, s, r) {
	let u = typeof i == "string" ? Qi(i) : i,
		h = Yn(u.pathname || "/", s);
	if (h == null) return null;
	let d = bg(n);
	zx(d);
	let g = null;
	for (let p = 0; g == null && p < d.length; ++p) {
		let x = Zx(h);
		g = Yx(d[p], x, r);
	}
	return g;
}
function bg(n, i = [], s = [], r = "", u = !1) {
	let h = (d, g, p = u, x) => {
		let y = {
			relativePath: x === void 0 ? d.path || "" : x,
			caseSensitive: d.caseSensitive === !0,
			childrenIndex: g,
			route: d,
		};
		if (y.relativePath.startsWith("/")) {
			if (!y.relativePath.startsWith(r) && p) return;
			Ye(
				y.relativePath.startsWith(r),
				`Absolute route path "${y.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
			),
				(y.relativePath = y.relativePath.slice(r.length));
		}
		let v = xn([r, y.relativePath]),
			w = s.concat(y);
		d.children &&
			d.children.length > 0 &&
			(Ye(
				d.index !== !0,
				`Index routes must not have child routes. Please remove all child routes from route path "${v}".`,
			),
			bg(d.children, i, w, v, p)),
			!(d.path == null && !d.index) &&
				i.push({ path: v, score: Ux(v, d.index), routesMeta: w });
	};
	return (
		n.forEach((d, g) => {
			if (d.path === "" || !d.path?.includes("?")) h(d, g);
			else for (let p of wg(d.path)) h(d, g, !0, p);
		}),
		i
	);
}
function wg(n) {
	let i = n.split("/");
	if (i.length === 0) return [];
	let [s, ...r] = i,
		u = s.endsWith("?"),
		h = s.replace(/\?$/, "");
	if (r.length === 0) return u ? [h, ""] : [h];
	let d = wg(r.join("/")),
		g = [];
	return (
		g.push(...d.map((p) => (p === "" ? h : [h, p].join("/")))),
		u && g.push(...d),
		g.map((p) => (n.startsWith("/") && p === "" ? "/" : p))
	);
}
function zx(n) {
	n.sort((i, s) =>
		i.score !== s.score
			? s.score - i.score
			: Gx(
					i.routesMeta.map((r) => r.childrenIndex),
					s.routesMeta.map((r) => r.childrenIndex),
				),
	);
}
var Ox = /^:[\w-]+$/,
	Vx = 3,
	Bx = 2,
	_x = 1,
	kx = 10,
	Hx = -2,
	H0 = (n) => n === "*";
function Ux(n, i) {
	let s = n.split("/"),
		r = s.length;
	return (
		s.some(H0) && (r += Hx),
		i && (r += Bx),
		s
			.filter((u) => !H0(u))
			.reduce((u, h) => u + (Ox.test(h) ? Vx : h === "" ? _x : kx), r)
	);
}
function Gx(n, i) {
	return n.length === i.length && n.slice(0, -1).every((r, u) => r === i[u])
		? n[n.length - 1] - i[i.length - 1]
		: 0;
}
function Yx(n, i, s = !1) {
	let { routesMeta: r } = n,
		u = {},
		h = "/",
		d = [];
	for (let g = 0; g < r.length; ++g) {
		let p = r[g],
			x = g === r.length - 1,
			y = h === "/" ? i : i.slice(h.length) || "/",
			v = Wr(
				{ path: p.relativePath, caseSensitive: p.caseSensitive, end: x },
				y,
			),
			w = p.route;
		if (
			(!v &&
				x &&
				s &&
				!r[r.length - 1].route.index &&
				(v = Wr(
					{ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
					y,
				)),
			!v)
		)
			return null;
		Object.assign(u, v.params),
			d.push({
				params: u,
				pathname: xn([h, v.pathname]),
				pathnameBase: Px(xn([h, v.pathnameBase])),
				route: w,
			}),
			v.pathnameBase !== "/" && (h = xn([h, v.pathnameBase]));
	}
	return d;
}
function Wr(n, i) {
	typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
	let [s, r] = qx(n.path, n.caseSensitive, n.end),
		u = i.match(s);
	if (!u) return null;
	let h = u[0],
		d = h.replace(/(.)\/+$/, "$1"),
		g = u.slice(1);
	return {
		params: r.reduce((x, { paramName: y, isOptional: v }, w) => {
			if (y === "*") {
				let M = g[w] || "";
				d = h.slice(0, h.length - M.length).replace(/(.)\/+$/, "$1");
			}
			const A = g[w];
			return (
				v && !A ? (x[y] = void 0) : (x[y] = (A || "").replace(/%2F/g, "/")), x
			);
		}, {}),
		pathname: h,
		pathnameBase: d,
		pattern: n,
	};
}
function qx(n, i = !1, s = !0) {
	bn(
		n === "*" || !n.endsWith("*") || n.endsWith("/*"),
		`Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`,
	);
	let r = [],
		u =
			"^" +
			n
				.replace(/\/*\*?$/, "")
				.replace(/^\/*/, "/")
				.replace(/[\\.*+^${}|()[\]]/g, "\\$&")
				.replace(/\/:([\w-]+)(\?)?/g, (d, g, p, x, y) => {
					if ((r.push({ paramName: g, isOptional: p != null }), p)) {
						let v = y.charAt(x + d.length);
						return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
					}
					return "/([^\\/]+)";
				})
				.replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
	return (
		n.endsWith("*")
			? (r.push({ paramName: "*" }),
				(u += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
			: s
				? (u += "\\/*$")
				: n !== "" && n !== "/" && (u += "(?:(?=\\/|$))"),
		[new RegExp(u, i ? void 0 : "i"), r]
	);
}
function Zx(n) {
	try {
		return n
			.split("/")
			.map((i) => decodeURIComponent(i).replace(/\//g, "%2F"))
			.join("/");
	} catch (i) {
		return (
			bn(
				!1,
				`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`,
			),
			n
		);
	}
}
function Yn(n, i) {
	if (i === "/") return n;
	if (!n.toLowerCase().startsWith(i.toLowerCase())) return null;
	let s = i.endsWith("/") ? i.length - 1 : i.length,
		r = n.charAt(s);
	return r && r !== "/" ? null : n.slice(s) || "/";
}
var Xx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Kx(n, i = "/") {
	let {
			pathname: s,
			search: r = "",
			hash: u = "",
		} = typeof n == "string" ? Qi(n) : n,
		h;
	return (
		s
			? ((s = s.replace(/\/\/+/g, "/")),
				s.startsWith("/") ? (h = U0(s.substring(1), "/")) : (h = U0(s, i)))
			: (h = i),
		{ pathname: h, search: Fx(r), hash: Jx(u) }
	);
}
function U0(n, i) {
	let s = i.replace(/\/+$/, "").split("/");
	return (
		n.split("/").forEach((u) => {
			u === ".." ? s.length > 1 && s.pop() : u !== "." && s.push(u);
		}),
		s.length > 1 ? s.join("/") : "/"
	);
}
function Gc(n, i, s, r) {
	return `Cannot include a '${n}' character in a manually specified \`to.${i}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qx(n) {
	return n.filter(
		(i, s) => s === 0 || (i.route.path && i.route.path.length > 0),
	);
}
function Sg(n) {
	let i = Qx(n);
	return i.map((s, r) => (r === i.length - 1 ? s.pathname : s.pathnameBase));
}
function Hf(n, i, s, r = !1) {
	let u;
	typeof n == "string"
		? (u = Qi(n))
		: ((u = { ...n }),
			Ye(
				!u.pathname || !u.pathname.includes("?"),
				Gc("?", "pathname", "search", u),
			),
			Ye(
				!u.pathname || !u.pathname.includes("#"),
				Gc("#", "pathname", "hash", u),
			),
			Ye(!u.search || !u.search.includes("#"), Gc("#", "search", "hash", u)));
	let h = n === "" || u.pathname === "",
		d = h ? "/" : u.pathname,
		g;
	if (d == null) g = s;
	else {
		let v = i.length - 1;
		if (!r && d.startsWith("..")) {
			let w = d.split("/");
			for (; w[0] === ".."; ) w.shift(), (v -= 1);
			u.pathname = w.join("/");
		}
		g = v >= 0 ? i[v] : "/";
	}
	let p = Kx(u, g),
		x = d && d !== "/" && d.endsWith("/"),
		y = (h || d === ".") && s.endsWith("/");
	return !p.pathname.endsWith("/") && (x || y) && (p.pathname += "/"), p;
}
var xn = (n) => n.join("/").replace(/\/\/+/g, "/"),
	Px = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
	Fx = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
	Jx = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n),
	Wx = class {
		constructor(n, i, s, r = !1) {
			(this.status = n),
				(this.statusText = i || ""),
				(this.internal = r),
				s instanceof Error
					? ((this.data = s.toString()), (this.error = s))
					: (this.data = s);
		}
	};
function $x(n) {
	return (
		n != null &&
		typeof n.status == "number" &&
		typeof n.statusText == "string" &&
		typeof n.internal == "boolean" &&
		"data" in n
	);
}
function Ix(n) {
	return (
		n
			.map((i) => i.route.path)
			.filter(Boolean)
			.join("/")
			.replace(/\/\/*/g, "/") || "/"
	);
}
var Cg =
	typeof window < "u" &&
	typeof window.document < "u" &&
	typeof window.document.createElement < "u";
function jg(n, i) {
	let s = n;
	if (typeof s != "string" || !Xx.test(s))
		return { absoluteURL: void 0, isExternal: !1, to: s };
	let r = s,
		u = !1;
	if (Cg)
		try {
			let h = new URL(window.location.href),
				d = s.startsWith("//") ? new URL(h.protocol + s) : new URL(s),
				g = Yn(d.pathname, i);
			d.origin === h.origin && g != null
				? (s = g + d.search + d.hash)
				: (u = !0);
		} catch {
			bn(
				!1,
				`<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
			);
		}
	return { absoluteURL: r, isExternal: u, to: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Tg = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Tg);
var ey = ["GET", ...Tg];
new Set(ey);
var Pi = C.createContext(null);
Pi.displayName = "DataRouter";
var uo = C.createContext(null);
uo.displayName = "DataRouterState";
var ty = C.createContext(!1),
	Ag = C.createContext({ isTransitioning: !1 });
Ag.displayName = "ViewTransition";
var ny = C.createContext(new Map());
ny.displayName = "Fetchers";
var ay = C.createContext(null);
ay.displayName = "Await";
var $t = C.createContext(null);
$t.displayName = "Navigation";
var rs = C.createContext(null);
rs.displayName = "Location";
var cn = C.createContext({ outlet: null, matches: [], isDataRoute: !1 });
cn.displayName = "Route";
var Uf = C.createContext(null);
Uf.displayName = "RouteError";
var Eg = "REACT_ROUTER_ERROR",
	iy = "REDIRECT",
	ly = "ROUTE_ERROR_RESPONSE";
function sy(n) {
	if (n.startsWith(`${Eg}:${iy}:{`))
		try {
			let i = JSON.parse(n.slice(28));
			if (
				typeof i == "object" &&
				i &&
				typeof i.status == "number" &&
				typeof i.statusText == "string" &&
				typeof i.location == "string" &&
				typeof i.reloadDocument == "boolean" &&
				typeof i.replace == "boolean"
			)
				return i;
		} catch {}
}
function ry(n) {
	if (n.startsWith(`${Eg}:${ly}:{`))
		try {
			let i = JSON.parse(n.slice(40));
			if (
				typeof i == "object" &&
				i &&
				typeof i.status == "number" &&
				typeof i.statusText == "string"
			)
				return new Wx(i.status, i.statusText, i.data);
		} catch {}
}
function oy(n, { relative: i } = {}) {
	Ye(
		os(),
		"useHref() may be used only in the context of a <Router> component.",
	);
	let { basename: s, navigator: r } = C.useContext($t),
		{ hash: u, pathname: h, search: d } = us(n, { relative: i }),
		g = h;
	return (
		s !== "/" && (g = h === "/" ? s : xn([s, h])),
		r.createHref({ pathname: g, search: d, hash: u })
	);
}
function os() {
	return C.useContext(rs) != null;
}
function wn() {
	return (
		Ye(
			os(),
			"useLocation() may be used only in the context of a <Router> component.",
		),
		C.useContext(rs).location
	);
}
var Mg =
	"You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ng(n) {
	C.useContext($t).static || C.useLayoutEffect(n);
}
function uy() {
	let { isDataRoute: n } = C.useContext(cn);
	return n ? Ty() : cy();
}
function cy() {
	Ye(
		os(),
		"useNavigate() may be used only in the context of a <Router> component.",
	);
	let n = C.useContext(Pi),
		{ basename: i, navigator: s } = C.useContext($t),
		{ matches: r } = C.useContext(cn),
		{ pathname: u } = wn(),
		h = JSON.stringify(Sg(r)),
		d = C.useRef(!1);
	return (
		Ng(() => {
			d.current = !0;
		}),
		C.useCallback(
			(p, x = {}) => {
				if ((bn(d.current, Mg), !d.current)) return;
				if (typeof p == "number") {
					s.go(p);
					return;
				}
				let y = Hf(p, JSON.parse(h), u, x.relative === "path");
				n == null &&
					i !== "/" &&
					(y.pathname = y.pathname === "/" ? i : xn([i, y.pathname])),
					(x.replace ? s.replace : s.push)(y, x.state, x);
			},
			[i, s, h, u, n],
		)
	);
}
var fy = C.createContext(null);
function dy(n) {
	let i = C.useContext(cn).outlet;
	return C.useMemo(
		() => i && C.createElement(fy.Provider, { value: n }, i),
		[i, n],
	);
}
function hy() {
	let { matches: n } = C.useContext(cn),
		i = n[n.length - 1];
	return i ? i.params : {};
}
function us(n, { relative: i } = {}) {
	let { matches: s } = C.useContext(cn),
		{ pathname: r } = wn(),
		u = JSON.stringify(Sg(s));
	return C.useMemo(() => Hf(n, JSON.parse(u), r, i === "path"), [n, u, r, i]);
}
function my(n, i) {
	return Rg(n, i);
}
function Rg(n, i, s) {
	Ye(
		os(),
		"useRoutes() may be used only in the context of a <Router> component.",
	);
	let { navigator: r } = C.useContext($t),
		{ matches: u } = C.useContext(cn),
		h = u[u.length - 1],
		d = h ? h.params : {},
		g = h ? h.pathname : "/",
		p = h ? h.pathnameBase : "/",
		x = h && h.route;
	{
		let N = (x && x.path) || "";
		Lg(
			g,
			!x || N.endsWith("*") || N.endsWith("*?"),
			`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === "/" ? "*" : `${N}/*`}">.`,
		);
	}
	let y = wn(),
		v;
	if (i) {
		let N = typeof i == "string" ? Qi(i) : i;
		Ye(
			p === "/" || N.pathname?.startsWith(p),
			`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${N.pathname}" was given in the \`location\` prop.`,
		),
			(v = N);
	} else v = y;
	let w = v.pathname || "/",
		A = w;
	if (p !== "/") {
		let N = p.replace(/^\//, "").split("/");
		A = "/" + w.replace(/^\//, "").split("/").slice(N.length).join("/");
	}
	let M = vg(n, { pathname: A });
	bn(
		x || M != null,
		`No routes matched location "${v.pathname}${v.search}${v.hash}" `,
	),
		bn(
			M == null ||
				M[M.length - 1].route.element !== void 0 ||
				M[M.length - 1].route.Component !== void 0 ||
				M[M.length - 1].route.lazy !== void 0,
			`Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
		);
	let z = vy(
		M &&
			M.map((N) =>
				Object.assign({}, N, {
					params: Object.assign({}, d, N.params),
					pathname: xn([
						p,
						r.encodeLocation
							? r.encodeLocation(
									N.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23"),
								).pathname
							: N.pathname,
					]),
					pathnameBase:
						N.pathnameBase === "/"
							? p
							: xn([
									p,
									r.encodeLocation
										? r.encodeLocation(
												N.pathnameBase
													.replace(/\?/g, "%3F")
													.replace(/#/g, "%23"),
											).pathname
										: N.pathnameBase,
								]),
				}),
			),
		u,
		s,
	);
	return i && z
		? C.createElement(
				rs.Provider,
				{
					value: {
						location: {
							pathname: "/",
							search: "",
							hash: "",
							state: null,
							key: "default",
							unstable_mask: void 0,
							...v,
						},
						navigationType: "POP",
					},
				},
				z,
			)
		: z;
}
function py() {
	let n = jy(),
		i = $x(n)
			? `${n.status} ${n.statusText}`
			: n instanceof Error
				? n.message
				: JSON.stringify(n),
		s = n instanceof Error ? n.stack : null,
		r = "rgba(200,200,200, 0.5)",
		u = { padding: "0.5rem", backgroundColor: r },
		h = { padding: "2px 4px", backgroundColor: r },
		d = null;
	return (
		console.error("Error handled by React Router default ErrorBoundary:", n),
		(d = C.createElement(
			C.Fragment,
			null,
			C.createElement("p", null, "💿 Hey developer 👋"),
			C.createElement(
				"p",
				null,
				"You can provide a way better UX than this when your app throws errors by providing your own ",
				C.createElement("code", { style: h }, "ErrorBoundary"),
				" or",
				" ",
				C.createElement("code", { style: h }, "errorElement"),
				" prop on your route.",
			),
		)),
		C.createElement(
			C.Fragment,
			null,
			C.createElement("h2", null, "Unexpected Application Error!"),
			C.createElement("h3", { style: { fontStyle: "italic" } }, i),
			s ? C.createElement("pre", { style: u }, s) : null,
			d,
		)
	);
}
var gy = C.createElement(py, null),
	Dg = class extends C.Component {
		constructor(n) {
			super(n),
				(this.state = {
					location: n.location,
					revalidation: n.revalidation,
					error: n.error,
				});
		}
		static getDerivedStateFromError(n) {
			return { error: n };
		}
		static getDerivedStateFromProps(n, i) {
			return i.location !== n.location ||
				(i.revalidation !== "idle" && n.revalidation === "idle")
				? { error: n.error, location: n.location, revalidation: n.revalidation }
				: {
						error: n.error !== void 0 ? n.error : i.error,
						location: i.location,
						revalidation: n.revalidation || i.revalidation,
					};
		}
		componentDidCatch(n, i) {
			this.props.onError
				? this.props.onError(n, i)
				: console.error(
						"React Router caught the following error during render",
						n,
					);
		}
		render() {
			let n = this.state.error;
			if (
				this.context &&
				typeof n == "object" &&
				n &&
				"digest" in n &&
				typeof n.digest == "string"
			) {
				const s = ry(n.digest);
				s && (n = s);
			}
			let i =
				n !== void 0
					? C.createElement(
							cn.Provider,
							{ value: this.props.routeContext },
							C.createElement(Uf.Provider, {
								value: n,
								children: this.props.component,
							}),
						)
					: this.props.children;
			return this.context ? C.createElement(xy, { error: n }, i) : i;
		}
	};
Dg.contextType = ty;
var Yc = new WeakMap();
function xy({ children: n, error: i }) {
	let { basename: s } = C.useContext($t);
	if (
		typeof i == "object" &&
		i &&
		"digest" in i &&
		typeof i.digest == "string"
	) {
		let r = sy(i.digest);
		if (r) {
			let u = Yc.get(i);
			if (u) throw u;
			let h = jg(r.location, s);
			if (Cg && !Yc.get(i))
				if (h.isExternal || r.reloadDocument)
					window.location.href = h.absoluteURL || h.to;
				else {
					const d = Promise.resolve().then(() =>
						window.__reactRouterDataRouter.navigate(h.to, {
							replace: r.replace,
						}),
					);
					throw (Yc.set(i, d), d);
				}
			return C.createElement("meta", {
				httpEquiv: "refresh",
				content: `0;url=${h.absoluteURL || h.to}`,
			});
		}
	}
	return n;
}
function yy({ routeContext: n, match: i, children: s }) {
	let r = C.useContext(Pi);
	return (
		r &&
			r.static &&
			r.staticContext &&
			(i.route.errorElement || i.route.ErrorBoundary) &&
			(r.staticContext._deepestRenderedBoundaryId = i.route.id),
		C.createElement(cn.Provider, { value: n }, s)
	);
}
function vy(n, i = [], s) {
	let r = s?.state;
	if (n == null) {
		if (!r) return null;
		if (r.errors) n = r.matches;
		else if (i.length === 0 && !r.initialized && r.matches.length > 0)
			n = r.matches;
		else return null;
	}
	let u = n,
		h = r?.errors;
	if (h != null) {
		let y = u.findIndex((v) => v.route.id && h?.[v.route.id] !== void 0);
		Ye(
			y >= 0,
			`Could not find a matching route for errors on route IDs: ${Object.keys(h).join(",")}`,
		),
			(u = u.slice(0, Math.min(u.length, y + 1)));
	}
	let d = !1,
		g = -1;
	if (s && r) {
		d = r.renderFallback;
		for (let y = 0; y < u.length; y++) {
			let v = u[y];
			if (
				((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (g = y),
				v.route.id)
			) {
				let { loaderData: w, errors: A } = r,
					M =
						v.route.loader &&
						!w.hasOwnProperty(v.route.id) &&
						(!A || A[v.route.id] === void 0);
				if (v.route.lazy || M) {
					s.isStatic && (d = !0),
						g >= 0 ? (u = u.slice(0, g + 1)) : (u = [u[0]]);
					break;
				}
			}
		}
	}
	let p = s?.onError,
		x =
			r && p
				? (y, v) => {
						p(y, {
							location: r.location,
							params: r.matches?.[0]?.params ?? {},
							unstable_pattern: Ix(r.matches),
							errorInfo: v,
						});
					}
				: void 0;
	return u.reduceRight((y, v, w) => {
		let A,
			M = !1,
			z = null,
			N = null;
		r &&
			((A = h && v.route.id ? h[v.route.id] : void 0),
			(z = v.route.errorElement || gy),
			d &&
				(g < 0 && w === 0
					? (Lg(
							"route-fallback",
							!1,
							"No `HydrateFallback` element provided to render during initial hydration",
						),
						(M = !0),
						(N = null))
					: g === w &&
						((M = !0), (N = v.route.hydrateFallbackElement || null))));
		let V = i.concat(u.slice(0, w + 1)),
			q = () => {
				let k;
				return (
					A
						? (k = z)
						: M
							? (k = N)
							: v.route.Component
								? (k = C.createElement(v.route.Component, null))
								: v.route.element
									? (k = v.route.element)
									: (k = y),
					C.createElement(yy, {
						match: v,
						routeContext: { outlet: y, matches: V, isDataRoute: r != null },
						children: k,
					})
				);
			};
		return r && (v.route.ErrorBoundary || v.route.errorElement || w === 0)
			? C.createElement(Dg, {
					location: r.location,
					revalidation: r.revalidation,
					component: z,
					error: A,
					children: q(),
					routeContext: { outlet: null, matches: V, isDataRoute: !0 },
					onError: x,
				})
			: q();
	}, null);
}
function Gf(n) {
	return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function by(n) {
	let i = C.useContext(Pi);
	return Ye(i, Gf(n)), i;
}
function wy(n) {
	let i = C.useContext(uo);
	return Ye(i, Gf(n)), i;
}
function Sy(n) {
	let i = C.useContext(cn);
	return Ye(i, Gf(n)), i;
}
function Yf(n) {
	let i = Sy(n),
		s = i.matches[i.matches.length - 1];
	return (
		Ye(
			s.route.id,
			`${n} can only be used on routes that contain a unique "id"`,
		),
		s.route.id
	);
}
function Cy() {
	return Yf("useRouteId");
}
function jy() {
	let n = C.useContext(Uf),
		i = wy("useRouteError"),
		s = Yf("useRouteError");
	return n !== void 0 ? n : i.errors?.[s];
}
function Ty() {
	let { router: n } = by("useNavigate"),
		i = Yf("useNavigate"),
		s = C.useRef(!1);
	return (
		Ng(() => {
			s.current = !0;
		}),
		C.useCallback(
			async (u, h = {}) => {
				bn(s.current, Mg),
					s.current &&
						(typeof u == "number"
							? await n.navigate(u)
							: await n.navigate(u, { fromRouteId: i, ...h }));
			},
			[n, i],
		)
	);
}
var G0 = {};
function Lg(n, i, s) {
	!i && !G0[n] && ((G0[n] = !0), bn(!1, s));
}
C.memo(Ay);
function Ay({ routes: n, future: i, state: s, isStatic: r, onError: u }) {
	return Rg(n, void 0, { state: s, isStatic: r, onError: u });
}
function Ey(n) {
	return dy(n.context);
}
function pn(n) {
	Ye(
		!1,
		"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
	);
}
function My({
	basename: n = "/",
	children: i = null,
	location: s,
	navigationType: r = "POP",
	navigator: u,
	static: h = !1,
	unstable_useTransitions: d,
}) {
	Ye(
		!os(),
		"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
	);
	let g = n.replace(/^\/*/, "/"),
		p = C.useMemo(
			() => ({
				basename: g,
				navigator: u,
				static: h,
				unstable_useTransitions: d,
				future: {},
			}),
			[g, u, h, d],
		);
	typeof s == "string" && (s = Qi(s));
	let {
			pathname: x = "/",
			search: y = "",
			hash: v = "",
			state: w = null,
			key: A = "default",
			unstable_mask: M,
		} = s,
		z = C.useMemo(() => {
			let N = Yn(x, g);
			return N == null
				? null
				: {
						location: {
							pathname: N,
							search: y,
							hash: v,
							state: w,
							key: A,
							unstable_mask: M,
						},
						navigationType: r,
					};
		}, [g, x, y, v, w, A, r, M]);
	return (
		bn(
			z != null,
			`<Router basename="${g}"> is not able to match the URL "${x}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`,
		),
		z == null
			? null
			: C.createElement(
					$t.Provider,
					{ value: p },
					C.createElement(rs.Provider, { children: i, value: z }),
				)
	);
}
function Ny({ children: n, location: i }) {
	return my(df(n), i);
}
function df(n, i = []) {
	let s = [];
	return (
		C.Children.forEach(n, (r, u) => {
			if (!C.isValidElement(r)) return;
			let h = [...i, u];
			if (r.type === C.Fragment) {
				s.push.apply(s, df(r.props.children, h));
				return;
			}
			Ye(
				r.type === pn,
				`[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
			),
				Ye(
					!r.props.index || !r.props.children,
					"An index route cannot have child routes.",
				);
			let d = {
				id: r.props.id || h.join("-"),
				caseSensitive: r.props.caseSensitive,
				element: r.props.element,
				Component: r.props.Component,
				index: r.props.index,
				path: r.props.path,
				middleware: r.props.middleware,
				loader: r.props.loader,
				action: r.props.action,
				hydrateFallbackElement: r.props.hydrateFallbackElement,
				HydrateFallback: r.props.HydrateFallback,
				errorElement: r.props.errorElement,
				ErrorBoundary: r.props.ErrorBoundary,
				hasErrorBoundary:
					r.props.hasErrorBoundary === !0 ||
					r.props.ErrorBoundary != null ||
					r.props.errorElement != null,
				shouldRevalidate: r.props.shouldRevalidate,
				handle: r.props.handle,
				lazy: r.props.lazy,
			};
			r.props.children && (d.children = df(r.props.children, h)), s.push(d);
		}),
		s
	);
}
var Gr = "get",
	Yr = "application/x-www-form-urlencoded";
function co(n) {
	return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function Ry(n) {
	return co(n) && n.tagName.toLowerCase() === "button";
}
function Dy(n) {
	return co(n) && n.tagName.toLowerCase() === "form";
}
function Ly(n) {
	return co(n) && n.tagName.toLowerCase() === "input";
}
function zy(n) {
	return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function Oy(n, i) {
	return n.button === 0 && (!i || i === "_self") && !zy(n);
}
var Lr = null;
function Vy() {
	if (Lr === null)
		try {
			new FormData(document.createElement("form"), 0), (Lr = !1);
		} catch {
			Lr = !0;
		}
	return Lr;
}
var By = new Set([
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain",
]);
function qc(n) {
	return n != null && !By.has(n)
		? (bn(
				!1,
				`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Yr}"`,
			),
			null)
		: n;
}
function _y(n, i) {
	let s, r, u, h, d;
	if (Dy(n)) {
		let g = n.getAttribute("action");
		(r = g ? Yn(g, i) : null),
			(s = n.getAttribute("method") || Gr),
			(u = qc(n.getAttribute("enctype")) || Yr),
			(h = new FormData(n));
	} else if (Ry(n) || (Ly(n) && (n.type === "submit" || n.type === "image"))) {
		let g = n.form;
		if (g == null)
			throw new Error(
				'Cannot submit a <button> or <input type="submit"> without a <form>',
			);
		let p = n.getAttribute("formaction") || g.getAttribute("action");
		if (
			((r = p ? Yn(p, i) : null),
			(s = n.getAttribute("formmethod") || g.getAttribute("method") || Gr),
			(u =
				qc(n.getAttribute("formenctype")) ||
				qc(g.getAttribute("enctype")) ||
				Yr),
			(h = new FormData(g, n)),
			!Vy())
		) {
			let { name: x, type: y, value: v } = n;
			if (y === "image") {
				let w = x ? `${x}.` : "";
				h.append(`${w}x`, "0"), h.append(`${w}y`, "0");
			} else x && h.append(x, v);
		}
	} else {
		if (co(n))
			throw new Error(
				'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
			);
		(s = Gr), (r = null), (u = Yr), (d = n);
	}
	return (
		h && u === "text/plain" && ((d = h), (h = void 0)),
		{ action: r, method: s.toLowerCase(), encType: u, formData: h, body: d }
	);
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function qf(n, i) {
	if (n === !1 || n === null || typeof n > "u") throw new Error(i);
}
function ky(n, i, s, r) {
	let u =
		typeof n == "string"
			? new URL(
					n,
					typeof window > "u"
						? "server://singlefetch/"
						: window.location.origin,
				)
			: n;
	return (
		s
			? u.pathname.endsWith("/")
				? (u.pathname = `${u.pathname}_.${r}`)
				: (u.pathname = `${u.pathname}.${r}`)
			: u.pathname === "/"
				? (u.pathname = `_root.${r}`)
				: i && Yn(u.pathname, i) === "/"
					? (u.pathname = `${i.replace(/\/$/, "")}/_root.${r}`)
					: (u.pathname = `${u.pathname.replace(/\/$/, "")}.${r}`),
		u
	);
}
async function Hy(n, i) {
	if (n.id in i) return i[n.id];
	try {
		let s = await import(n.module);
		return (i[n.id] = s), s;
	} catch (s) {
		return (
			console.error(
				`Error loading route module \`${n.module}\`, reloading page...`,
			),
			console.error(s),
			window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
			window.location.reload(),
			new Promise(() => {})
		);
	}
}
function Uy(n) {
	return n == null
		? !1
		: n.href == null
			? n.rel === "preload" &&
				typeof n.imageSrcSet == "string" &&
				typeof n.imageSizes == "string"
			: typeof n.rel == "string" && typeof n.href == "string";
}
async function Gy(n, i, s) {
	let r = await Promise.all(
		n.map(async (u) => {
			let h = i.routes[u.route.id];
			if (h) {
				let d = await Hy(h, s);
				return d.links ? d.links() : [];
			}
			return [];
		}),
	);
	return Xy(
		r
			.flat(1)
			.filter(Uy)
			.filter((u) => u.rel === "stylesheet" || u.rel === "preload")
			.map((u) =>
				u.rel === "stylesheet"
					? { ...u, rel: "prefetch", as: "style" }
					: { ...u, rel: "prefetch" },
			),
	);
}
function Y0(n, i, s, r, u, h) {
	let d = (p, x) => (s[x] ? p.route.id !== s[x].route.id : !0),
		g = (p, x) =>
			s[x].pathname !== p.pathname ||
			(s[x].route.path?.endsWith("*") && s[x].params["*"] !== p.params["*"]);
	return h === "assets"
		? i.filter((p, x) => d(p, x) || g(p, x))
		: h === "data"
			? i.filter((p, x) => {
					let y = r.routes[p.route.id];
					if (!y || !y.hasLoader) return !1;
					if (d(p, x) || g(p, x)) return !0;
					if (p.route.shouldRevalidate) {
						let v = p.route.shouldRevalidate({
							currentUrl: new URL(
								u.pathname + u.search + u.hash,
								window.origin,
							),
							currentParams: s[0]?.params || {},
							nextUrl: new URL(n, window.origin),
							nextParams: p.params,
							defaultShouldRevalidate: !0,
						});
						if (typeof v == "boolean") return v;
					}
					return !0;
				})
			: [];
}
function Yy(n, i, { includeHydrateFallback: s } = {}) {
	return qy(
		n
			.map((r) => {
				let u = i.routes[r.route.id];
				if (!u) return [];
				let h = [u.module];
				return (
					u.clientActionModule && (h = h.concat(u.clientActionModule)),
					u.clientLoaderModule && (h = h.concat(u.clientLoaderModule)),
					s &&
						u.hydrateFallbackModule &&
						(h = h.concat(u.hydrateFallbackModule)),
					u.imports && (h = h.concat(u.imports)),
					h
				);
			})
			.flat(1),
	);
}
function qy(n) {
	return [...new Set(n)];
}
function Zy(n) {
	let i = {},
		s = Object.keys(n).sort();
	for (let r of s) i[r] = n[r];
	return i;
}
function Xy(n, i) {
	let s = new Set();
	return (
		new Set(i),
		n.reduce((r, u) => {
			let h = JSON.stringify(Zy(u));
			return s.has(h) || (s.add(h), r.push({ key: h, link: u })), r;
		}, [])
	);
}
function zg() {
	let n = C.useContext(Pi);
	return (
		qf(
			n,
			"You must render this element inside a <DataRouterContext.Provider> element",
		),
		n
	);
}
function Ky() {
	let n = C.useContext(uo);
	return (
		qf(
			n,
			"You must render this element inside a <DataRouterStateContext.Provider> element",
		),
		n
	);
}
var Zf = C.createContext(void 0);
Zf.displayName = "FrameworkContext";
function Og() {
	let n = C.useContext(Zf);
	return (
		qf(n, "You must render this element inside a <HydratedRouter> element"), n
	);
}
function Qy(n, i) {
	let s = C.useContext(Zf),
		[r, u] = C.useState(!1),
		[h, d] = C.useState(!1),
		{
			onFocus: g,
			onBlur: p,
			onMouseEnter: x,
			onMouseLeave: y,
			onTouchStart: v,
		} = i,
		w = C.useRef(null);
	C.useEffect(() => {
		if ((n === "render" && d(!0), n === "viewport")) {
			let z = (V) => {
					V.forEach((q) => {
						d(q.isIntersecting);
					});
				},
				N = new IntersectionObserver(z, { threshold: 0.5 });
			return (
				w.current && N.observe(w.current),
				() => {
					N.disconnect();
				}
			);
		}
	}, [n]),
		C.useEffect(() => {
			if (r) {
				let z = setTimeout(() => {
					d(!0);
				}, 100);
				return () => {
					clearTimeout(z);
				};
			}
		}, [r]);
	let A = () => {
			u(!0);
		},
		M = () => {
			u(!1), d(!1);
		};
	return s
		? n !== "intent"
			? [h, w, {}]
			: [
					h,
					w,
					{
						onFocus: Kl(g, A),
						onBlur: Kl(p, M),
						onMouseEnter: Kl(x, A),
						onMouseLeave: Kl(y, M),
						onTouchStart: Kl(v, A),
					},
				]
		: [!1, w, {}];
}
function Kl(n, i) {
	return (s) => {
		n && n(s), s.defaultPrevented || i(s);
	};
}
function Py({ page: n, ...i }) {
	let { router: s } = zg(),
		r = C.useMemo(() => vg(s.routes, n, s.basename), [s.routes, n, s.basename]);
	return r ? C.createElement(Jy, { page: n, matches: r, ...i }) : null;
}
function Fy(n) {
	let { manifest: i, routeModules: s } = Og(),
		[r, u] = C.useState([]);
	return (
		C.useEffect(() => {
			let h = !1;
			return (
				Gy(n, i, s).then((d) => {
					h || u(d);
				}),
				() => {
					h = !0;
				}
			);
		}, [n, i, s]),
		r
	);
}
function Jy({ page: n, matches: i, ...s }) {
	let r = wn(),
		{ future: u, manifest: h, routeModules: d } = Og(),
		{ basename: g } = zg(),
		{ loaderData: p, matches: x } = Ky(),
		y = C.useMemo(() => Y0(n, i, x, h, r, "data"), [n, i, x, h, r]),
		v = C.useMemo(() => Y0(n, i, x, h, r, "assets"), [n, i, x, h, r]),
		w = C.useMemo(() => {
			if (n === r.pathname + r.search + r.hash) return [];
			let z = new Set(),
				N = !1;
			if (
				(i.forEach((q) => {
					let k = h.routes[q.route.id];
					!k ||
						!k.hasLoader ||
						((!y.some((K) => K.route.id === q.route.id) &&
							q.route.id in p &&
							d[q.route.id]?.shouldRevalidate) ||
						k.hasClientLoader
							? (N = !0)
							: z.add(q.route.id));
				}),
				z.size === 0)
			)
				return [];
			let V = ky(n, g, u.unstable_trailingSlashAwareDataRequests, "data");
			return (
				N &&
					z.size > 0 &&
					V.searchParams.set(
						"_routes",
						i
							.filter((q) => z.has(q.route.id))
							.map((q) => q.route.id)
							.join(","),
					),
				[V.pathname + V.search]
			);
		}, [g, u.unstable_trailingSlashAwareDataRequests, p, r, h, y, i, n, d]),
		A = C.useMemo(() => Yy(v, h), [v, h]),
		M = Fy(v);
	return C.createElement(
		C.Fragment,
		null,
		w.map((z) =>
			C.createElement("link", {
				key: z,
				rel: "prefetch",
				as: "fetch",
				href: z,
				...s,
			}),
		),
		A.map((z) =>
			C.createElement("link", { key: z, rel: "modulepreload", href: z, ...s }),
		),
		M.map(({ key: z, link: N }) =>
			C.createElement("link", {
				key: z,
				nonce: s.nonce,
				...N,
				crossOrigin: N.crossOrigin ?? s.crossOrigin,
			}),
		),
	);
}
function Wy(...n) {
	return (i) => {
		n.forEach((s) => {
			typeof s == "function" ? s(i) : s != null && (s.current = i);
		});
	};
}
var $y =
	typeof window < "u" &&
	typeof window.document < "u" &&
	typeof window.document.createElement < "u";
try {
	$y && (window.__reactRouterVersion = "7.13.1");
} catch {}
function Iy({
	basename: n,
	children: i,
	unstable_useTransitions: s,
	window: r,
}) {
	let u = C.useRef();
	u.current == null && (u.current = Mx({ window: r, v5Compat: !0 }));
	let h = u.current,
		[d, g] = C.useState({ action: h.action, location: h.location }),
		p = C.useCallback(
			(x) => {
				s === !1 ? g(x) : C.startTransition(() => g(x));
			},
			[s],
		);
	return (
		C.useLayoutEffect(() => h.listen(p), [h, p]),
		C.createElement(My, {
			basename: n,
			children: i,
			location: d.location,
			navigationType: d.action,
			navigator: h,
			unstable_useTransitions: s,
		})
	);
}
var Vg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
	_e = C.forwardRef(function (
		{
			onClick: i,
			discover: s = "render",
			prefetch: r = "none",
			relative: u,
			reloadDocument: h,
			replace: d,
			unstable_mask: g,
			state: p,
			target: x,
			to: y,
			preventScrollReset: v,
			viewTransition: w,
			unstable_defaultShouldRevalidate: A,
			...M
		},
		z,
	) {
		let {
				basename: N,
				navigator: V,
				unstable_useTransitions: q,
			} = C.useContext($t),
			k = typeof y == "string" && Vg.test(y),
			K = jg(y, N);
		y = K.to;
		let X = oy(y, { relative: u }),
			ie = wn(),
			J = null;
		if (g) {
			let Me = Hf(
				g,
				[],
				ie.unstable_mask ? ie.unstable_mask.pathname : "/",
				!0,
			);
			N !== "/" &&
				(Me.pathname = Me.pathname === "/" ? N : xn([N, Me.pathname])),
				(J = V.createHref(Me));
		}
		let [H, ne, Ce] = Qy(r, M),
			Be = nv(y, {
				replace: d,
				unstable_mask: g,
				state: p,
				target: x,
				preventScrollReset: v,
				relative: u,
				viewTransition: w,
				unstable_defaultShouldRevalidate: A,
				unstable_useTransitions: q,
			});
		function Oe(Me) {
			i && i(Me), Me.defaultPrevented || Be(Me);
		}
		let ut = !(K.isExternal || h),
			et = C.createElement("a", {
				...M,
				...Ce,
				href: (ut ? J : void 0) || K.absoluteURL || X,
				onClick: ut ? Oe : i,
				ref: Wy(z, ne),
				target: x,
				"data-discover": !k && s === "render" ? "true" : void 0,
			});
		return H && !k
			? C.createElement(C.Fragment, null, et, C.createElement(Py, { page: X }))
			: et;
	});
_e.displayName = "Link";
var an = C.forwardRef(function (
	{
		"aria-current": i = "page",
		caseSensitive: s = !1,
		className: r = "",
		end: u = !1,
		style: h,
		to: d,
		viewTransition: g,
		children: p,
		...x
	},
	y,
) {
	let v = us(d, { relative: x.relative }),
		w = wn(),
		A = C.useContext(uo),
		{ navigator: M, basename: z } = C.useContext($t),
		N = A != null && rv(v) && g === !0,
		V = M.encodeLocation ? M.encodeLocation(v).pathname : v.pathname,
		q = w.pathname,
		k =
			A && A.navigation && A.navigation.location
				? A.navigation.location.pathname
				: null;
	s ||
		((q = q.toLowerCase()),
		(k = k ? k.toLowerCase() : null),
		(V = V.toLowerCase())),
		k && z && (k = Yn(k, z) || k);
	const K = V !== "/" && V.endsWith("/") ? V.length - 1 : V.length;
	let X = q === V || (!u && q.startsWith(V) && q.charAt(K) === "/"),
		ie =
			k != null &&
			(k === V || (!u && k.startsWith(V) && k.charAt(V.length) === "/")),
		J = { isActive: X, isPending: ie, isTransitioning: N },
		H = X ? i : void 0,
		ne;
	typeof r == "function"
		? (ne = r(J))
		: (ne = [
				r,
				X ? "active" : null,
				ie ? "pending" : null,
				N ? "transitioning" : null,
			]
				.filter(Boolean)
				.join(" "));
	let Ce = typeof h == "function" ? h(J) : h;
	return C.createElement(
		_e,
		{
			...x,
			"aria-current": H,
			className: ne,
			ref: y,
			style: Ce,
			to: d,
			viewTransition: g,
		},
		typeof p == "function" ? p(J) : p,
	);
});
an.displayName = "NavLink";
var ev = C.forwardRef(
	(
		{
			discover: n = "render",
			fetcherKey: i,
			navigate: s,
			reloadDocument: r,
			replace: u,
			state: h,
			method: d = Gr,
			action: g,
			onSubmit: p,
			relative: x,
			preventScrollReset: y,
			viewTransition: v,
			unstable_defaultShouldRevalidate: w,
			...A
		},
		M,
	) => {
		let { unstable_useTransitions: z } = C.useContext($t),
			N = lv(),
			V = sv(g, { relative: x }),
			q = d.toLowerCase() === "get" ? "get" : "post",
			k = typeof g == "string" && Vg.test(g),
			K = (X) => {
				if ((p && p(X), X.defaultPrevented)) return;
				X.preventDefault();
				let ie = X.nativeEvent.submitter,
					J = ie?.getAttribute("formmethod") || d,
					H = () =>
						N(ie || X.currentTarget, {
							fetcherKey: i,
							method: J,
							navigate: s,
							replace: u,
							state: h,
							relative: x,
							preventScrollReset: y,
							viewTransition: v,
							unstable_defaultShouldRevalidate: w,
						});
				z && s !== !1 ? C.startTransition(() => H()) : H();
			};
		return C.createElement("form", {
			ref: M,
			method: q,
			action: V,
			onSubmit: r ? p : K,
			...A,
			"data-discover": !k && n === "render" ? "true" : void 0,
		});
	},
);
ev.displayName = "Form";
function tv(n) {
	return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bg(n) {
	let i = C.useContext(Pi);
	return Ye(i, tv(n)), i;
}
function nv(
	n,
	{
		target: i,
		replace: s,
		unstable_mask: r,
		state: u,
		preventScrollReset: h,
		relative: d,
		viewTransition: g,
		unstable_defaultShouldRevalidate: p,
		unstable_useTransitions: x,
	} = {},
) {
	let y = uy(),
		v = wn(),
		w = us(n, { relative: d });
	return C.useCallback(
		(A) => {
			if (Oy(A, i)) {
				A.preventDefault();
				let M = s !== void 0 ? s : ts(v) === ts(w),
					z = () =>
						y(n, {
							replace: M,
							unstable_mask: r,
							state: u,
							preventScrollReset: h,
							relative: d,
							viewTransition: g,
							unstable_defaultShouldRevalidate: p,
						});
				x ? C.startTransition(() => z()) : z();
			}
		},
		[v, y, w, s, r, u, i, n, h, d, g, p, x],
	);
}
var av = 0,
	iv = () => `__${String(++av)}__`;
function lv() {
	let { router: n } = Bg("useSubmit"),
		{ basename: i } = C.useContext($t),
		s = Cy(),
		r = n.fetch,
		u = n.navigate;
	return C.useCallback(
		async (h, d = {}) => {
			let { action: g, method: p, encType: x, formData: y, body: v } = _y(h, i);
			if (d.navigate === !1) {
				let w = d.fetcherKey || iv();
				await r(w, s, d.action || g, {
					unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
					preventScrollReset: d.preventScrollReset,
					formData: y,
					body: v,
					formMethod: d.method || p,
					formEncType: d.encType || x,
					flushSync: d.flushSync,
				});
			} else
				await u(d.action || g, {
					unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
					preventScrollReset: d.preventScrollReset,
					formData: y,
					body: v,
					formMethod: d.method || p,
					formEncType: d.encType || x,
					replace: d.replace,
					state: d.state,
					fromRouteId: s,
					flushSync: d.flushSync,
					viewTransition: d.viewTransition,
				});
		},
		[r, u, i, s],
	);
}
function sv(n, { relative: i } = {}) {
	let { basename: s } = C.useContext($t),
		r = C.useContext(cn);
	Ye(r, "useFormAction must be used inside a RouteContext");
	let [u] = r.matches.slice(-1),
		h = { ...us(n || ".", { relative: i }) },
		d = wn();
	if (n == null) {
		h.search = d.search;
		let g = new URLSearchParams(h.search),
			p = g.getAll("index");
		if (p.some((y) => y === "")) {
			g.delete("index"),
				p.filter((v) => v).forEach((v) => g.append("index", v));
			let y = g.toString();
			h.search = y ? `?${y}` : "";
		}
	}
	return (
		(!n || n === ".") &&
			u.route.index &&
			(h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"),
		s !== "/" && (h.pathname = h.pathname === "/" ? s : xn([s, h.pathname])),
		ts(h)
	);
}
function rv(n, { relative: i } = {}) {
	let s = C.useContext(Ag);
	Ye(
		s != null,
		"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
	);
	let { basename: r } = Bg("useViewTransitionState"),
		u = us(n, { relative: i });
	if (!s.isTransitioning) return !1;
	let h = Yn(s.currentLocation.pathname, r) || s.currentLocation.pathname,
		d = Yn(s.nextLocation.pathname, r) || s.nextLocation.pathname;
	return Wr(u.pathname, d) != null || Wr(u.pathname, h) != null;
}
const Xf = C.createContext({});
function wa(n) {
	const i = C.useRef(null);
	return i.current === null && (i.current = n()), i.current;
}
const _g = typeof window < "u",
	fo = _g ? C.useLayoutEffect : C.useEffect,
	ho = C.createContext(null);
function Kf(n, i) {
	n.indexOf(i) === -1 && n.push(i);
}
function $r(n, i) {
	const s = n.indexOf(i);
	s > -1 && n.splice(s, 1);
}
const un = (n, i, s) => (s > i ? i : s < n ? n : s);
let ns = () => {};
const qn = {},
	kg = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function Hg(n) {
	return typeof n == "object" && n !== null;
}
const Ug = (n) => /^0[^.\s]+$/u.test(n);
function Gg(n) {
	let i;
	return () => (i === void 0 && (i = n()), i);
}
const Mt = (n) => n,
	ov = (n, i) => (s) => i(n(s)),
	cs = (...n) => n.reduce(ov),
	Ki = (n, i, s) => {
		const r = i - n;
		return r === 0 ? 1 : (s - n) / r;
	};
class Qf {
	constructor() {
		this.subscriptions = [];
	}
	add(i) {
		return Kf(this.subscriptions, i), () => $r(this.subscriptions, i);
	}
	notify(i, s, r) {
		const u = this.subscriptions.length;
		if (u)
			if (u === 1) this.subscriptions[0](i, s, r);
			else
				for (let h = 0; h < u; h++) {
					const d = this.subscriptions[h];
					d && d(i, s, r);
				}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}
const rn = (n) => n * 1e3,
	Jt = (n) => n / 1e3;
function Pf(n, i) {
	return i ? n * (1e3 / i) : 0;
}
const Yg = (n, i, s) =>
		(((1 - 3 * s + 3 * i) * n + (3 * s - 6 * i)) * n + 3 * i) * n,
	uv = 1e-7,
	cv = 12;
function fv(n, i, s, r, u) {
	let h,
		d,
		g = 0;
	do (d = i + (s - i) / 2), (h = Yg(d, r, u) - n), h > 0 ? (s = d) : (i = d);
	while (Math.abs(h) > uv && ++g < cv);
	return d;
}
function fs(n, i, s, r) {
	if (n === i && s === r) return Mt;
	const u = (h) => fv(h, 0, 1, n, s);
	return (h) => (h === 0 || h === 1 ? h : Yg(u(h), i, r));
}
const qg = (n) => (i) => (i <= 0.5 ? n(2 * i) / 2 : (2 - n(2 * (1 - i))) / 2),
	Zg = (n) => (i) => 1 - n(1 - i),
	Xg = fs(0.33, 1.53, 0.69, 0.99),
	Ff = Zg(Xg),
	Kg = qg(Ff),
	Qg = (n) =>
		(n *= 2) < 1 ? 0.5 * Ff(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))),
	Jf = (n) => 1 - Math.sin(Math.acos(n)),
	Pg = Zg(Jf),
	Fg = qg(Jf),
	dv = fs(0.42, 0, 1, 1),
	hv = fs(0, 0, 0.58, 1),
	Jg = fs(0.42, 0, 0.58, 1),
	mv = (n) => Array.isArray(n) && typeof n[0] != "number",
	Wg = (n) => Array.isArray(n) && typeof n[0] == "number",
	pv = {
		linear: Mt,
		easeIn: dv,
		easeInOut: Jg,
		easeOut: hv,
		circIn: Jf,
		circInOut: Fg,
		circOut: Pg,
		backIn: Ff,
		backInOut: Kg,
		backOut: Xg,
		anticipate: Qg,
	},
	gv = (n) => typeof n == "string",
	q0 = (n) => {
		if (Wg(n)) {
			ns(n.length === 4);
			const [i, s, r, u] = n;
			return fs(i, s, r, u);
		} else if (gv(n)) return pv[n];
		return n;
	},
	zr = [
		"setup",
		"read",
		"resolveKeyframes",
		"preUpdate",
		"update",
		"preRender",
		"render",
		"postRender",
	];
function xv(n, i) {
	let s = new Set(),
		r = new Set(),
		u = !1,
		h = !1;
	const d = new WeakSet();
	let g = { delta: 0, timestamp: 0, isProcessing: !1 };
	function p(y) {
		d.has(y) && (x.schedule(y), n()), y(g);
	}
	const x = {
		schedule: (y, v = !1, w = !1) => {
			const M = w && u ? s : r;
			return v && d.add(y), M.has(y) || M.add(y), y;
		},
		cancel: (y) => {
			r.delete(y), d.delete(y);
		},
		process: (y) => {
			if (((g = y), u)) {
				h = !0;
				return;
			}
			(u = !0),
				([s, r] = [r, s]),
				s.forEach(p),
				s.clear(),
				(u = !1),
				h && ((h = !1), x.process(y));
		},
	};
	return x;
}
const yv = 40;
function $g(n, i) {
	let s = !1,
		r = !0;
	const u = { delta: 0, timestamp: 0, isProcessing: !1 },
		h = () => (s = !0),
		d = zr.reduce((k, K) => ((k[K] = xv(h)), k), {}),
		{
			setup: g,
			read: p,
			resolveKeyframes: x,
			preUpdate: y,
			update: v,
			preRender: w,
			render: A,
			postRender: M,
		} = d,
		z = () => {
			const k = qn.useManualTiming ? u.timestamp : performance.now();
			(s = !1),
				qn.useManualTiming ||
					(u.delta = r ? 1e3 / 60 : Math.max(Math.min(k - u.timestamp, yv), 1)),
				(u.timestamp = k),
				(u.isProcessing = !0),
				g.process(u),
				p.process(u),
				x.process(u),
				y.process(u),
				v.process(u),
				w.process(u),
				A.process(u),
				M.process(u),
				(u.isProcessing = !1),
				s && i && ((r = !1), n(z));
		},
		N = () => {
			(s = !0), (r = !0), u.isProcessing || n(z);
		};
	return {
		schedule: zr.reduce((k, K) => {
			const X = d[K];
			return (
				(k[K] = (ie, J = !1, H = !1) => (s || N(), X.schedule(ie, J, H))), k
			);
		}, {}),
		cancel: (k) => {
			for (let K = 0; K < zr.length; K++) d[zr[K]].cancel(k);
		},
		state: u,
		steps: d,
	};
}
const {
	schedule: Ae,
	cancel: Wt,
	state: ot,
	steps: Zc,
} = $g(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Mt, !0);
let qr;
function vv() {
	qr = void 0;
}
const vt = {
		now: () => (
			qr === void 0 &&
				vt.set(
					ot.isProcessing || qn.useManualTiming
						? ot.timestamp
						: performance.now(),
				),
			qr
		),
		set: (n) => {
			(qr = n), queueMicrotask(vv);
		},
	},
	Ig = (n) => (i) => typeof i == "string" && i.startsWith(n),
	e2 = Ig("--"),
	bv = Ig("var(--"),
	Wf = (n) => (bv(n) ? wv.test(n.split("/*")[0].trim()) : !1),
	wv =
		/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Z0(n) {
	return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Fi = {
		test: (n) => typeof n == "number",
		parse: parseFloat,
		transform: (n) => n,
	},
	as = { ...Fi, transform: (n) => un(0, 1, n) },
	Or = { ...Fi, default: 1 },
	Jl = (n) => Math.round(n * 1e5) / 1e5,
	$f = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Sv(n) {
	return n == null;
}
const Cv =
		/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
	If = (n, i) => (s) =>
		!!(
			(typeof s == "string" && Cv.test(s) && s.startsWith(n)) ||
			(i && !Sv(s) && Object.prototype.hasOwnProperty.call(s, i))
		),
	t2 = (n, i, s) => (r) => {
		if (typeof r != "string") return r;
		const [u, h, d, g] = r.match($f);
		return {
			[n]: parseFloat(u),
			[i]: parseFloat(h),
			[s]: parseFloat(d),
			alpha: g !== void 0 ? parseFloat(g) : 1,
		};
	},
	jv = (n) => un(0, 255, n),
	Xc = { ...Fi, transform: (n) => Math.round(jv(n)) },
	Qa = {
		test: If("rgb", "red"),
		parse: t2("red", "green", "blue"),
		transform: ({ red: n, green: i, blue: s, alpha: r = 1 }) =>
			"rgba(" +
			Xc.transform(n) +
			", " +
			Xc.transform(i) +
			", " +
			Xc.transform(s) +
			", " +
			Jl(as.transform(r)) +
			")",
	};
function Tv(n) {
	let i = "",
		s = "",
		r = "",
		u = "";
	return (
		n.length > 5
			? ((i = n.substring(1, 3)),
				(s = n.substring(3, 5)),
				(r = n.substring(5, 7)),
				(u = n.substring(7, 9)))
			: ((i = n.substring(1, 2)),
				(s = n.substring(2, 3)),
				(r = n.substring(3, 4)),
				(u = n.substring(4, 5)),
				(i += i),
				(s += s),
				(r += r),
				(u += u)),
		{
			red: parseInt(i, 16),
			green: parseInt(s, 16),
			blue: parseInt(r, 16),
			alpha: u ? parseInt(u, 16) / 255 : 1,
		}
	);
}
const hf = { test: If("#"), parse: Tv, transform: Qa.transform },
	ds = (n) => ({
		test: (i) =>
			typeof i == "string" && i.endsWith(n) && i.split(" ").length === 1,
		parse: parseFloat,
		transform: (i) => `${i}${n}`,
	}),
	va = ds("deg"),
	yn = ds("%"),
	te = ds("px"),
	Av = ds("vh"),
	Ev = ds("vw"),
	X0 = {
		...yn,
		parse: (n) => yn.parse(n) / 100,
		transform: (n) => yn.transform(n * 100),
	},
	Hi = {
		test: If("hsl", "hue"),
		parse: t2("hue", "saturation", "lightness"),
		transform: ({ hue: n, saturation: i, lightness: s, alpha: r = 1 }) =>
			"hsla(" +
			Math.round(n) +
			", " +
			yn.transform(Jl(i)) +
			", " +
			yn.transform(Jl(s)) +
			", " +
			Jl(as.transform(r)) +
			")",
	},
	$e = {
		test: (n) => Qa.test(n) || hf.test(n) || Hi.test(n),
		parse: (n) =>
			Qa.test(n) ? Qa.parse(n) : Hi.test(n) ? Hi.parse(n) : hf.parse(n),
		transform: (n) =>
			typeof n == "string"
				? n
				: n.hasOwnProperty("red")
					? Qa.transform(n)
					: Hi.transform(n),
		getAnimatableNone: (n) => {
			const i = $e.parse(n);
			return (i.alpha = 0), $e.transform(i);
		},
	},
	Mv =
		/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Nv(n) {
	return (
		isNaN(n) &&
		typeof n == "string" &&
		(n.match($f)?.length || 0) + (n.match(Mv)?.length || 0) > 0
	);
}
const n2 = "number",
	a2 = "color",
	Rv = "var",
	Dv = "var(",
	K0 = "${}",
	Lv =
		/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function is(n) {
	const i = n.toString(),
		s = [],
		r = { color: [], number: [], var: [] },
		u = [];
	let h = 0;
	const g = i
		.replace(
			Lv,
			(p) => (
				$e.test(p)
					? (r.color.push(h), u.push(a2), s.push($e.parse(p)))
					: p.startsWith(Dv)
						? (r.var.push(h), u.push(Rv), s.push(p))
						: (r.number.push(h), u.push(n2), s.push(parseFloat(p))),
				++h,
				K0
			),
		)
		.split(K0);
	return { values: s, split: g, indexes: r, types: u };
}
function i2(n) {
	return is(n).values;
}
function l2(n) {
	const { split: i, types: s } = is(n),
		r = i.length;
	return (u) => {
		let h = "";
		for (let d = 0; d < r; d++)
			if (((h += i[d]), u[d] !== void 0)) {
				const g = s[d];
				g === n2
					? (h += Jl(u[d]))
					: g === a2
						? (h += $e.transform(u[d]))
						: (h += u[d]);
			}
		return h;
	};
}
const zv = (n) =>
	typeof n == "number" ? 0 : $e.test(n) ? $e.getAnimatableNone(n) : n;
function Ov(n) {
	const i = i2(n);
	return l2(n)(i.map(zv));
}
const on = {
	test: Nv,
	parse: i2,
	createTransformer: l2,
	getAnimatableNone: Ov,
};
function Kc(n, i, s) {
	return (
		s < 0 && (s += 1),
		s > 1 && (s -= 1),
		s < 1 / 6
			? n + (i - n) * 6 * s
			: s < 1 / 2
				? i
				: s < 2 / 3
					? n + (i - n) * (2 / 3 - s) * 6
					: n
	);
}
function Vv({ hue: n, saturation: i, lightness: s, alpha: r }) {
	(n /= 360), (i /= 100), (s /= 100);
	let u = 0,
		h = 0,
		d = 0;
	if (!i) u = h = d = s;
	else {
		const g = s < 0.5 ? s * (1 + i) : s + i - s * i,
			p = 2 * s - g;
		(u = Kc(p, g, n + 1 / 3)), (h = Kc(p, g, n)), (d = Kc(p, g, n - 1 / 3));
	}
	return {
		red: Math.round(u * 255),
		green: Math.round(h * 255),
		blue: Math.round(d * 255),
		alpha: r,
	};
}
function Ir(n, i) {
	return (s) => (s > 0 ? i : n);
}
const Ge = (n, i, s) => n + (i - n) * s,
	Qc = (n, i, s) => {
		const r = n * n,
			u = s * (i * i - r) + r;
		return u < 0 ? 0 : Math.sqrt(u);
	},
	Bv = [hf, Qa, Hi],
	_v = (n) => Bv.find((i) => i.test(n));
function Q0(n) {
	const i = _v(n);
	if (!i) return !1;
	let s = i.parse(n);
	return i === Hi && (s = Vv(s)), s;
}
const P0 = (n, i) => {
		const s = Q0(n),
			r = Q0(i);
		if (!s || !r) return Ir(n, i);
		const u = { ...s };
		return (h) => (
			(u.red = Qc(s.red, r.red, h)),
			(u.green = Qc(s.green, r.green, h)),
			(u.blue = Qc(s.blue, r.blue, h)),
			(u.alpha = Ge(s.alpha, r.alpha, h)),
			Qa.transform(u)
		);
	},
	mf = new Set(["none", "hidden"]);
function kv(n, i) {
	return mf.has(n) ? (s) => (s <= 0 ? n : i) : (s) => (s >= 1 ? i : n);
}
function Hv(n, i) {
	return (s) => Ge(n, i, s);
}
function ed(n) {
	return typeof n == "number"
		? Hv
		: typeof n == "string"
			? Wf(n)
				? Ir
				: $e.test(n)
					? P0
					: Yv
			: Array.isArray(n)
				? s2
				: typeof n == "object"
					? $e.test(n)
						? P0
						: Uv
					: Ir;
}
function s2(n, i) {
	const s = [...n],
		r = s.length,
		u = n.map((h, d) => ed(h)(h, i[d]));
	return (h) => {
		for (let d = 0; d < r; d++) s[d] = u[d](h);
		return s;
	};
}
function Uv(n, i) {
	const s = { ...n, ...i },
		r = {};
	for (const u in s)
		n[u] !== void 0 && i[u] !== void 0 && (r[u] = ed(n[u])(n[u], i[u]));
	return (u) => {
		for (const h in r) s[h] = r[h](u);
		return s;
	};
}
function Gv(n, i) {
	const s = [],
		r = { color: 0, var: 0, number: 0 };
	for (let u = 0; u < i.values.length; u++) {
		const h = i.types[u],
			d = n.indexes[h][r[h]],
			g = n.values[d] ?? 0;
		(s[u] = g), r[h]++;
	}
	return s;
}
const Yv = (n, i) => {
	const s = on.createTransformer(i),
		r = is(n),
		u = is(i);
	return r.indexes.var.length === u.indexes.var.length &&
		r.indexes.color.length === u.indexes.color.length &&
		r.indexes.number.length >= u.indexes.number.length
		? (mf.has(n) && !u.values.length) || (mf.has(i) && !r.values.length)
			? kv(n, i)
			: cs(s2(Gv(r, u), u.values), s)
		: Ir(n, i);
};
function r2(n, i, s) {
	return typeof n == "number" && typeof i == "number" && typeof s == "number"
		? Ge(n, i, s)
		: ed(n)(n, i);
}
const qv = (n) => {
		const i = ({ timestamp: s }) => n(s);
		return {
			start: (s = !0) => Ae.update(i, s),
			stop: () => Wt(i),
			now: () => (ot.isProcessing ? ot.timestamp : vt.now()),
		};
	},
	o2 = (n, i, s = 10) => {
		let r = "";
		const u = Math.max(Math.round(i / s), 2);
		for (let h = 0; h < u; h++)
			r += Math.round(n(h / (u - 1)) * 1e4) / 1e4 + ", ";
		return `linear(${r.substring(0, r.length - 2)})`;
	},
	eo = 2e4;
function td(n) {
	let i = 0;
	const s = 50;
	let r = n.next(i);
	for (; !r.done && i < eo; ) (i += s), (r = n.next(i));
	return i >= eo ? 1 / 0 : i;
}
function Zv(n, i = 100, s) {
	const r = s({ ...n, keyframes: [0, i] }),
		u = Math.min(td(r), eo);
	return {
		type: "keyframes",
		ease: (h) => r.next(u * h).value / i,
		duration: Jt(u),
	};
}
const Xv = 5;
function u2(n, i, s) {
	const r = Math.max(i - Xv, 0);
	return Pf(s - n(r), i - r);
}
const Xe = {
		stiffness: 100,
		damping: 10,
		mass: 1,
		velocity: 0,
		duration: 800,
		bounce: 0.3,
		visualDuration: 0.3,
		restSpeed: { granular: 0.01, default: 2 },
		restDelta: { granular: 0.005, default: 0.5 },
		minDuration: 0.01,
		maxDuration: 10,
		minDamping: 0.05,
		maxDamping: 1,
	},
	Pc = 0.001;
function Kv({
	duration: n = Xe.duration,
	bounce: i = Xe.bounce,
	velocity: s = Xe.velocity,
	mass: r = Xe.mass,
}) {
	let u,
		h,
		d = 1 - i;
	(d = un(Xe.minDamping, Xe.maxDamping, d)),
		(n = un(Xe.minDuration, Xe.maxDuration, Jt(n))),
		d < 1
			? ((u = (x) => {
					const y = x * d,
						v = y * n,
						w = y - s,
						A = pf(x, d),
						M = Math.exp(-v);
					return Pc - (w / A) * M;
				}),
				(h = (x) => {
					const v = x * d * n,
						w = v * s + s,
						A = Math.pow(d, 2) * Math.pow(x, 2) * n,
						M = Math.exp(-v),
						z = pf(Math.pow(x, 2), d);
					return ((-u(x) + Pc > 0 ? -1 : 1) * ((w - A) * M)) / z;
				}))
			: ((u = (x) => {
					const y = Math.exp(-x * n),
						v = (x - s) * n + 1;
					return -Pc + y * v;
				}),
				(h = (x) => {
					const y = Math.exp(-x * n),
						v = (s - x) * (n * n);
					return y * v;
				}));
	const g = 5 / n,
		p = Pv(u, h, g);
	if (((n = rn(n)), isNaN(p)))
		return { stiffness: Xe.stiffness, damping: Xe.damping, duration: n };
	{
		const x = Math.pow(p, 2) * r;
		return { stiffness: x, damping: d * 2 * Math.sqrt(r * x), duration: n };
	}
}
const Qv = 12;
function Pv(n, i, s) {
	let r = s;
	for (let u = 1; u < Qv; u++) r = r - n(r) / i(r);
	return r;
}
function pf(n, i) {
	return n * Math.sqrt(1 - i * i);
}
const Fv = ["duration", "bounce"],
	Jv = ["stiffness", "damping", "mass"];
function F0(n, i) {
	return i.some((s) => n[s] !== void 0);
}
function Wv(n) {
	let i = {
		velocity: Xe.velocity,
		stiffness: Xe.stiffness,
		damping: Xe.damping,
		mass: Xe.mass,
		isResolvedFromDuration: !1,
		...n,
	};
	if (!F0(n, Jv) && F0(n, Fv))
		if (((i.velocity = 0), n.visualDuration)) {
			const s = n.visualDuration,
				r = (2 * Math.PI) / (s * 1.2),
				u = r * r,
				h = 2 * un(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(u);
			i = { ...i, mass: Xe.mass, stiffness: u, damping: h };
		} else {
			const s = Kv({ ...n, velocity: 0 });
			(i = { ...i, ...s, mass: Xe.mass }), (i.isResolvedFromDuration = !0);
		}
	return i;
}
function to(n = Xe.visualDuration, i = Xe.bounce) {
	const s =
		typeof n != "object"
			? { visualDuration: n, keyframes: [0, 1], bounce: i }
			: n;
	let { restSpeed: r, restDelta: u } = s;
	const h = s.keyframes[0],
		d = s.keyframes[s.keyframes.length - 1],
		g = { done: !1, value: h },
		{
			stiffness: p,
			damping: x,
			mass: y,
			duration: v,
			velocity: w,
			isResolvedFromDuration: A,
		} = Wv({ ...s, velocity: -Jt(s.velocity || 0) }),
		M = w || 0,
		z = x / (2 * Math.sqrt(p * y)),
		N = d - h,
		V = Jt(Math.sqrt(p / y)),
		q = Math.abs(N) < 5;
	r || (r = q ? Xe.restSpeed.granular : Xe.restSpeed.default),
		u || (u = q ? Xe.restDelta.granular : Xe.restDelta.default);
	let k;
	if (z < 1) {
		const X = pf(V, z);
		k = (ie) => {
			const J = Math.exp(-z * V * ie);
			return (
				d -
				J * (((M + z * V * N) / X) * Math.sin(X * ie) + N * Math.cos(X * ie))
			);
		};
	} else if (z === 1) k = (X) => d - Math.exp(-V * X) * (N + (M + V * N) * X);
	else {
		const X = V * Math.sqrt(z * z - 1);
		k = (ie) => {
			const J = Math.exp(-z * V * ie),
				H = Math.min(X * ie, 300);
			return (
				d - (J * ((M + z * V * N) * Math.sinh(H) + X * N * Math.cosh(H))) / X
			);
		};
	}
	const K = {
		calculatedDuration: (A && v) || null,
		next: (X) => {
			const ie = k(X);
			if (A) g.done = X >= v;
			else {
				let J = X === 0 ? M : 0;
				z < 1 && (J = X === 0 ? rn(M) : u2(k, X, ie));
				const H = Math.abs(J) <= r,
					ne = Math.abs(d - ie) <= u;
				g.done = H && ne;
			}
			return (g.value = g.done ? d : ie), g;
		},
		toString: () => {
			const X = Math.min(td(K), eo),
				ie = o2((J) => K.next(X * J).value, X, 30);
			return X + "ms " + ie;
		},
		toTransition: () => {},
	};
	return K;
}
to.applyToOptions = (n) => {
	const i = Zv(n, 100, to);
	return (
		(n.ease = i.ease), (n.duration = rn(i.duration)), (n.type = "keyframes"), n
	);
};
function gf({
	keyframes: n,
	velocity: i = 0,
	power: s = 0.8,
	timeConstant: r = 325,
	bounceDamping: u = 10,
	bounceStiffness: h = 500,
	modifyTarget: d,
	min: g,
	max: p,
	restDelta: x = 0.5,
	restSpeed: y,
}) {
	const v = n[0],
		w = { done: !1, value: v },
		A = (H) => (g !== void 0 && H < g) || (p !== void 0 && H > p),
		M = (H) =>
			g === void 0
				? p
				: p === void 0 || Math.abs(g - H) < Math.abs(p - H)
					? g
					: p;
	let z = s * i;
	const N = v + z,
		V = d === void 0 ? N : d(N);
	V !== N && (z = V - v);
	const q = (H) => -z * Math.exp(-H / r),
		k = (H) => V + q(H),
		K = (H) => {
			const ne = q(H),
				Ce = k(H);
			(w.done = Math.abs(ne) <= x), (w.value = w.done ? V : Ce);
		};
	let X, ie;
	const J = (H) => {
		A(w.value) &&
			((X = H),
			(ie = to({
				keyframes: [w.value, M(w.value)],
				velocity: u2(k, H, w.value),
				damping: u,
				stiffness: h,
				restDelta: x,
				restSpeed: y,
			})));
	};
	return (
		J(0),
		{
			calculatedDuration: null,
			next: (H) => {
				let ne = !1;
				return (
					!ie && X === void 0 && ((ne = !0), K(H), J(H)),
					X !== void 0 && H >= X ? ie.next(H - X) : (!ne && K(H), w)
				);
			},
		}
	);
}
function $v(n, i, s) {
	const r = [],
		u = s || qn.mix || r2,
		h = n.length - 1;
	for (let d = 0; d < h; d++) {
		let g = u(n[d], n[d + 1]);
		if (i) {
			const p = Array.isArray(i) ? i[d] || Mt : i;
			g = cs(p, g);
		}
		r.push(g);
	}
	return r;
}
function nd(n, i, { clamp: s = !0, ease: r, mixer: u } = {}) {
	const h = n.length;
	if ((ns(h === i.length), h === 1)) return () => i[0];
	if (h === 2 && i[0] === i[1]) return () => i[1];
	const d = n[0] === n[1];
	n[0] > n[h - 1] && ((n = [...n].reverse()), (i = [...i].reverse()));
	const g = $v(i, r, u),
		p = g.length,
		x = (y) => {
			if (d && y < n[0]) return i[0];
			let v = 0;
			if (p > 1) for (; v < n.length - 2 && !(y < n[v + 1]); v++);
			const w = Ki(n[v], n[v + 1], y);
			return g[v](w);
		};
	return s ? (y) => x(un(n[0], n[h - 1], y)) : x;
}
function Iv(n, i) {
	const s = n[n.length - 1];
	for (let r = 1; r <= i; r++) {
		const u = Ki(0, i, r);
		n.push(Ge(s, 1, u));
	}
}
function c2(n) {
	const i = [0];
	return Iv(i, n.length - 1), i;
}
function e6(n, i) {
	return n.map((s) => s * i);
}
function t6(n, i) {
	return n.map(() => i || Jg).splice(0, n.length - 1);
}
function Wl({
	duration: n = 300,
	keyframes: i,
	times: s,
	ease: r = "easeInOut",
}) {
	const u = mv(r) ? r.map(q0) : q0(r),
		h = { done: !1, value: i[0] },
		d = e6(s && s.length === i.length ? s : c2(i), n),
		g = nd(d, i, { ease: Array.isArray(u) ? u : t6(i, u) });
	return {
		calculatedDuration: n,
		next: (p) => ((h.value = g(p)), (h.done = p >= n), h),
	};
}
const n6 = (n) => n !== null;
function ad(n, { repeat: i, repeatType: s = "loop" }, r, u = 1) {
	const h = n.filter(n6),
		g = u < 0 || (i && s !== "loop" && i % 2 === 1) ? 0 : h.length - 1;
	return !g || r === void 0 ? h[g] : r;
}
const a6 = { decay: gf, inertia: gf, tween: Wl, keyframes: Wl, spring: to };
function f2(n) {
	typeof n.type == "string" && (n.type = a6[n.type]);
}
class id {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((i) => {
			this.resolve = i;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(i, s) {
		return this.finished.then(i, s);
	}
}
const i6 = (n) => n / 100;
class ld extends id {
	constructor(i) {
		super(),
			(this.state = "idle"),
			(this.startTime = null),
			(this.isStopped = !1),
			(this.currentTime = 0),
			(this.holdTime = null),
			(this.playbackSpeed = 1),
			(this.stop = () => {
				const { motionValue: s } = this.options;
				s && s.updatedAt !== vt.now() && this.tick(vt.now()),
					(this.isStopped = !0),
					this.state !== "idle" && (this.teardown(), this.options.onStop?.());
			}),
			(this.options = i),
			this.initAnimation(),
			this.play(),
			i.autoplay === !1 && this.pause();
	}
	initAnimation() {
		const { options: i } = this;
		f2(i);
		const {
			type: s = Wl,
			repeat: r = 0,
			repeatDelay: u = 0,
			repeatType: h,
			velocity: d = 0,
		} = i;
		let { keyframes: g } = i;
		const p = s || Wl;
		p !== Wl &&
			typeof g[0] != "number" &&
			((this.mixKeyframes = cs(i6, r2(g[0], g[1]))), (g = [0, 100]));
		const x = p({ ...i, keyframes: g });
		h === "mirror" &&
			(this.mirroredGenerator = p({
				...i,
				keyframes: [...g].reverse(),
				velocity: -d,
			})),
			x.calculatedDuration === null && (x.calculatedDuration = td(x));
		const { calculatedDuration: y } = x;
		(this.calculatedDuration = y),
			(this.resolvedDuration = y + u),
			(this.totalDuration = this.resolvedDuration * (r + 1) - u),
			(this.generator = x);
	}
	updateTime(i) {
		const s = Math.round(i - this.startTime) * this.playbackSpeed;
		this.holdTime !== null
			? (this.currentTime = this.holdTime)
			: (this.currentTime = s);
	}
	tick(i, s = !1) {
		const {
			generator: r,
			totalDuration: u,
			mixKeyframes: h,
			mirroredGenerator: d,
			resolvedDuration: g,
			calculatedDuration: p,
		} = this;
		if (this.startTime === null) return r.next(0);
		const {
			delay: x = 0,
			keyframes: y,
			repeat: v,
			repeatType: w,
			repeatDelay: A,
			type: M,
			onUpdate: z,
			finalKeyframe: N,
		} = this.options;
		this.speed > 0
			? (this.startTime = Math.min(this.startTime, i))
			: this.speed < 0 &&
				(this.startTime = Math.min(i - u / this.speed, this.startTime)),
			s ? (this.currentTime = i) : this.updateTime(i);
		const V = this.currentTime - x * (this.playbackSpeed >= 0 ? 1 : -1),
			q = this.playbackSpeed >= 0 ? V < 0 : V > u;
		(this.currentTime = Math.max(V, 0)),
			this.state === "finished" &&
				this.holdTime === null &&
				(this.currentTime = u);
		let k = this.currentTime,
			K = r;
		if (v) {
			const H = Math.min(this.currentTime, u) / g;
			let ne = Math.floor(H),
				Ce = H % 1;
			!Ce && H >= 1 && (Ce = 1),
				Ce === 1 && ne--,
				(ne = Math.min(ne, v + 1)),
				ne % 2 &&
					(w === "reverse"
						? ((Ce = 1 - Ce), A && (Ce -= A / g))
						: w === "mirror" && (K = d)),
				(k = un(0, 1, Ce) * g);
		}
		const X = q ? { done: !1, value: y[0] } : K.next(k);
		h && (X.value = h(X.value));
		let { done: ie } = X;
		!q &&
			p !== null &&
			(ie =
				this.playbackSpeed >= 0
					? this.currentTime >= u
					: this.currentTime <= 0);
		const J =
			this.holdTime === null &&
			(this.state === "finished" || (this.state === "running" && ie));
		return (
			J && M !== gf && (X.value = ad(y, this.options, N, this.speed)),
			z && z(X.value),
			J && this.finish(),
			X
		);
	}
	then(i, s) {
		return this.finished.then(i, s);
	}
	get duration() {
		return Jt(this.calculatedDuration);
	}
	get iterationDuration() {
		const { delay: i = 0 } = this.options || {};
		return this.duration + Jt(i);
	}
	get time() {
		return Jt(this.currentTime);
	}
	set time(i) {
		(i = rn(i)),
			(this.currentTime = i),
			this.startTime === null ||
			this.holdTime !== null ||
			this.playbackSpeed === 0
				? (this.holdTime = i)
				: this.driver &&
					(this.startTime = this.driver.now() - i / this.playbackSpeed),
			this.driver?.start(!1);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(i) {
		this.updateTime(vt.now());
		const s = this.playbackSpeed !== i;
		(this.playbackSpeed = i), s && (this.time = Jt(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		const { driver: i = qv, startTime: s } = this.options;
		this.driver || (this.driver = i((u) => this.tick(u))),
			this.options.onPlay?.();
		const r = this.driver.now();
		this.state === "finished"
			? (this.updateFinished(), (this.startTime = r))
			: this.holdTime !== null
				? (this.startTime = r - this.holdTime)
				: this.startTime || (this.startTime = s ?? r),
			this.state === "finished" &&
				this.speed < 0 &&
				(this.startTime += this.calculatedDuration),
			(this.holdTime = null),
			(this.state = "running"),
			this.driver.start();
	}
	pause() {
		(this.state = "paused"),
			this.updateTime(vt.now()),
			(this.holdTime = this.currentTime);
	}
	complete() {
		this.state !== "running" && this.play(),
			(this.state = "finished"),
			(this.holdTime = null);
	}
	finish() {
		this.notifyFinished(),
			this.teardown(),
			(this.state = "finished"),
			this.options.onComplete?.();
	}
	cancel() {
		(this.holdTime = null),
			(this.startTime = 0),
			this.tick(0),
			this.teardown(),
			this.options.onCancel?.();
	}
	teardown() {
		(this.state = "idle"),
			this.stopDriver(),
			(this.startTime = this.holdTime = null);
	}
	stopDriver() {
		this.driver && (this.driver.stop(), (this.driver = void 0));
	}
	sample(i) {
		return (this.startTime = 0), this.tick(i, !0);
	}
	attachTimeline(i) {
		return (
			this.options.allowFlatten &&
				((this.options.type = "keyframes"),
				(this.options.ease = "linear"),
				this.initAnimation()),
			this.driver?.stop(),
			i.observe(this)
		);
	}
}
function l6(n) {
	for (let i = 1; i < n.length; i++) n[i] ?? (n[i] = n[i - 1]);
}
const Pa = (n) => (n * 180) / Math.PI,
	xf = (n) => {
		const i = Pa(Math.atan2(n[1], n[0]));
		return yf(i);
	},
	s6 = {
		x: 4,
		y: 5,
		translateX: 4,
		translateY: 5,
		scaleX: 0,
		scaleY: 3,
		scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
		rotate: xf,
		rotateZ: xf,
		skewX: (n) => Pa(Math.atan(n[1])),
		skewY: (n) => Pa(Math.atan(n[2])),
		skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2,
	},
	yf = (n) => ((n = n % 360), n < 0 && (n += 360), n),
	J0 = xf,
	W0 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]),
	$0 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]),
	r6 = {
		x: 12,
		y: 13,
		z: 14,
		translateX: 12,
		translateY: 13,
		translateZ: 14,
		scaleX: W0,
		scaleY: $0,
		scale: (n) => (W0(n) + $0(n)) / 2,
		rotateX: (n) => yf(Pa(Math.atan2(n[6], n[5]))),
		rotateY: (n) => yf(Pa(Math.atan2(-n[2], n[0]))),
		rotateZ: J0,
		rotate: J0,
		skewX: (n) => Pa(Math.atan(n[4])),
		skewY: (n) => Pa(Math.atan(n[1])),
		skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2,
	};
function vf(n) {
	return n.includes("scale") ? 1 : 0;
}
function bf(n, i) {
	if (!n || n === "none") return vf(i);
	const s = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
	let r, u;
	if (s) (r = r6), (u = s);
	else {
		const g = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		(r = s6), (u = g);
	}
	if (!u) return vf(i);
	const h = r[i],
		d = u[1].split(",").map(u6);
	return typeof h == "function" ? h(d) : d[h];
}
const o6 = (n, i) => {
	const { transform: s = "none" } = getComputedStyle(n);
	return bf(s, i);
};
function u6(n) {
	return parseFloat(n.trim());
}
const Ji = [
		"transformPerspective",
		"x",
		"y",
		"z",
		"translateX",
		"translateY",
		"translateZ",
		"scale",
		"scaleX",
		"scaleY",
		"rotate",
		"rotateX",
		"rotateY",
		"rotateZ",
		"skew",
		"skewX",
		"skewY",
	],
	Wi = new Set(Ji),
	I0 = (n) => n === Fi || n === te,
	c6 = new Set(["x", "y", "z"]),
	f6 = Ji.filter((n) => !c6.has(n));
function d6(n) {
	const i = [];
	return (
		f6.forEach((s) => {
			const r = n.getValue(s);
			r !== void 0 &&
				(i.push([s, r.get()]), r.set(s.startsWith("scale") ? 1 : 0));
		}),
		i
	);
}
const ba = {
	width: ({ x: n }, { paddingLeft: i = "0", paddingRight: s = "0" }) =>
		n.max - n.min - parseFloat(i) - parseFloat(s),
	height: ({ y: n }, { paddingTop: i = "0", paddingBottom: s = "0" }) =>
		n.max - n.min - parseFloat(i) - parseFloat(s),
	top: (n, { top: i }) => parseFloat(i),
	left: (n, { left: i }) => parseFloat(i),
	bottom: ({ y: n }, { top: i }) => parseFloat(i) + (n.max - n.min),
	right: ({ x: n }, { left: i }) => parseFloat(i) + (n.max - n.min),
	x: (n, { transform: i }) => bf(i, "x"),
	y: (n, { transform: i }) => bf(i, "y"),
};
ba.translateX = ba.x;
ba.translateY = ba.y;
const Fa = new Set();
let wf = !1,
	Sf = !1,
	Cf = !1;
function d2() {
	if (Sf) {
		const n = Array.from(Fa).filter((r) => r.needsMeasurement),
			i = new Set(n.map((r) => r.element)),
			s = new Map();
		i.forEach((r) => {
			const u = d6(r);
			u.length && (s.set(r, u), r.render());
		}),
			n.forEach((r) => r.measureInitialState()),
			i.forEach((r) => {
				r.render();
				const u = s.get(r);
				u &&
					u.forEach(([h, d]) => {
						r.getValue(h)?.set(d);
					});
			}),
			n.forEach((r) => r.measureEndState()),
			n.forEach((r) => {
				r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
			});
	}
	(Sf = !1), (wf = !1), Fa.forEach((n) => n.complete(Cf)), Fa.clear();
}
function h2() {
	Fa.forEach((n) => {
		n.readKeyframes(), n.needsMeasurement && (Sf = !0);
	});
}
function h6() {
	(Cf = !0), h2(), d2(), (Cf = !1);
}
class sd {
	constructor(i, s, r, u, h, d = !1) {
		(this.state = "pending"),
			(this.isAsync = !1),
			(this.needsMeasurement = !1),
			(this.unresolvedKeyframes = [...i]),
			(this.onComplete = s),
			(this.name = r),
			(this.motionValue = u),
			(this.element = h),
			(this.isAsync = d);
	}
	scheduleResolve() {
		(this.state = "scheduled"),
			this.isAsync
				? (Fa.add(this),
					wf || ((wf = !0), Ae.read(h2), Ae.resolveKeyframes(d2)))
				: (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		const {
			unresolvedKeyframes: i,
			name: s,
			element: r,
			motionValue: u,
		} = this;
		if (i[0] === null) {
			const h = u?.get(),
				d = i[i.length - 1];
			if (h !== void 0) i[0] = h;
			else if (r && s) {
				const g = r.readValue(s, d);
				g != null && (i[0] = g);
			}
			i[0] === void 0 && (i[0] = d), u && h === void 0 && u.set(i[0]);
		}
		l6(i);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(i = !1) {
		(this.state = "complete"),
			this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i),
			Fa.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (Fa.delete(this), (this.state = "pending"));
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}
const m6 = (n) => n.startsWith("--");
function p6(n, i, s) {
	m6(i) ? n.style.setProperty(i, s) : (n.style[i] = s);
}
const g6 = {};
function m2(n, i) {
	const s = Gg(n);
	return () => g6[i] ?? s();
}
const p2 = m2(() => window.ScrollTimeline !== void 0, "scrollTimeline"),
	g2 = m2(() => {
		try {
			document
				.createElement("div")
				.animate({ opacity: 0 }, { easing: "linear(0, 1)" });
		} catch {
			return !1;
		}
		return !0;
	}, "linearEasing"),
	Fl = ([n, i, s, r]) => `cubic-bezier(${n}, ${i}, ${s}, ${r})`,
	ep = {
		linear: "linear",
		ease: "ease",
		easeIn: "ease-in",
		easeOut: "ease-out",
		easeInOut: "ease-in-out",
		circIn: Fl([0, 0.65, 0.55, 1]),
		circOut: Fl([0.55, 0, 1, 0.45]),
		backIn: Fl([0.31, 0.01, 0.66, -0.59]),
		backOut: Fl([0.33, 1.53, 0.69, 0.99]),
	};
function x2(n, i) {
	if (n)
		return typeof n == "function"
			? g2()
				? o2(n, i)
				: "ease-out"
			: Wg(n)
				? Fl(n)
				: Array.isArray(n)
					? n.map((s) => x2(s, i) || ep.easeOut)
					: ep[n];
}
function x6(
	n,
	i,
	s,
	{
		delay: r = 0,
		duration: u = 300,
		repeat: h = 0,
		repeatType: d = "loop",
		ease: g = "easeOut",
		times: p,
	} = {},
	x = void 0,
) {
	const y = { [i]: s };
	p && (y.offset = p);
	const v = x2(g, u);
	Array.isArray(v) && (y.easing = v);
	const w = {
		delay: r,
		duration: u,
		easing: Array.isArray(v) ? "linear" : v,
		fill: "both",
		iterations: h + 1,
		direction: d === "reverse" ? "alternate" : "normal",
	};
	return x && (w.pseudoElement = x), n.animate(y, w);
}
function y2(n) {
	return typeof n == "function" && "applyToOptions" in n;
}
function y6({ type: n, ...i }) {
	return y2(n) && g2()
		? n.applyToOptions(i)
		: (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = "easeOut"), i);
}
class v2 extends id {
	constructor(i) {
		if (
			(super(),
			(this.finishedTime = null),
			(this.isStopped = !1),
			(this.manualStartTime = null),
			!i)
		)
			return;
		const {
			element: s,
			name: r,
			keyframes: u,
			pseudoElement: h,
			allowFlatten: d = !1,
			finalKeyframe: g,
			onComplete: p,
		} = i;
		(this.isPseudoElement = !!h),
			(this.allowFlatten = d),
			(this.options = i),
			ns(typeof i.type != "string");
		const x = y6(i);
		(this.animation = x6(s, r, u, x, h)),
			x.autoplay === !1 && this.animation.pause(),
			(this.animation.onfinish = () => {
				if (((this.finishedTime = this.time), !h)) {
					const y = ad(u, this.options, g, this.speed);
					this.updateMotionValue ? this.updateMotionValue(y) : p6(s, r, y),
						this.animation.cancel();
				}
				p?.(), this.notifyFinished();
			});
	}
	play() {
		this.isStopped ||
			((this.manualStartTime = null),
			this.animation.play(),
			this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		const { state: i } = this;
		i === "idle" ||
			i === "finished" ||
			(this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
			this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		const i = this.options?.element;
		!this.isPseudoElement && i?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		const i = this.animation.effect?.getComputedTiming?.().duration || 0;
		return Jt(Number(i));
	}
	get iterationDuration() {
		const { delay: i = 0 } = this.options || {};
		return this.duration + Jt(i);
	}
	get time() {
		return Jt(Number(this.animation.currentTime) || 0);
	}
	set time(i) {
		(this.manualStartTime = null),
			(this.finishedTime = null),
			(this.animation.currentTime = rn(i));
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(i) {
		i < 0 && (this.finishedTime = null), (this.animation.playbackRate = i);
	}
	get state() {
		return this.finishedTime !== null ? "finished" : this.animation.playState;
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(i) {
		this.manualStartTime = this.animation.startTime = i;
	}
	attachTimeline({ timeline: i, observe: s }) {
		return (
			this.allowFlatten &&
				this.animation.effect?.updateTiming({ easing: "linear" }),
			(this.animation.onfinish = null),
			i && p2() ? ((this.animation.timeline = i), Mt) : s(this)
		);
	}
}
const b2 = { anticipate: Qg, backInOut: Kg, circInOut: Fg };
function v6(n) {
	return n in b2;
}
function b6(n) {
	typeof n.ease == "string" && v6(n.ease) && (n.ease = b2[n.ease]);
}
const Fc = 10;
class w6 extends v2 {
	constructor(i) {
		b6(i),
			f2(i),
			super(i),
			i.startTime !== void 0 && (this.startTime = i.startTime),
			(this.options = i);
	}
	updateMotionValue(i) {
		const {
			motionValue: s,
			onUpdate: r,
			onComplete: u,
			element: h,
			...d
		} = this.options;
		if (!s) return;
		if (i !== void 0) {
			s.set(i);
			return;
		}
		const g = new ld({ ...d, autoplay: !1 }),
			p = Math.max(Fc, vt.now() - this.startTime),
			x = un(0, Fc, p - Fc);
		s.setWithVelocity(g.sample(Math.max(0, p - x)).value, g.sample(p).value, x),
			g.stop();
	}
}
const tp = (n, i) =>
	i === "zIndex"
		? !1
		: !!(
				typeof n == "number" ||
				Array.isArray(n) ||
				(typeof n == "string" &&
					(on.test(n) || n === "0") &&
					!n.startsWith("url("))
			);
function S6(n) {
	const i = n[0];
	if (n.length === 1) return !0;
	for (let s = 0; s < n.length; s++) if (n[s] !== i) return !0;
}
function C6(n, i, s, r) {
	const u = n[0];
	if (u === null) return !1;
	if (i === "display" || i === "visibility") return !0;
	const h = n[n.length - 1],
		d = tp(u, i),
		g = tp(h, i);
	return !d || !g ? !1 : S6(n) || ((s === "spring" || y2(s)) && r);
}
function jf(n) {
	(n.duration = 0), (n.type = "keyframes");
}
const j6 = new Set(["opacity", "clipPath", "filter", "transform"]),
	T6 = Gg(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function A6(n) {
	const {
		motionValue: i,
		name: s,
		repeatDelay: r,
		repeatType: u,
		damping: h,
		type: d,
	} = n;
	if (!(i?.owner?.current instanceof HTMLElement)) return !1;
	const { onUpdate: p, transformTemplate: x } = i.owner.getProps();
	return (
		T6() &&
		s &&
		j6.has(s) &&
		(s !== "transform" || !x) &&
		!p &&
		!r &&
		u !== "mirror" &&
		h !== 0 &&
		d !== "inertia"
	);
}
const E6 = 40;
class M6 extends id {
	constructor({
		autoplay: i = !0,
		delay: s = 0,
		type: r = "keyframes",
		repeat: u = 0,
		repeatDelay: h = 0,
		repeatType: d = "loop",
		keyframes: g,
		name: p,
		motionValue: x,
		element: y,
		...v
	}) {
		super(),
			(this.stop = () => {
				this._animation && (this._animation.stop(), this.stopTimeline?.()),
					this.keyframeResolver?.cancel();
			}),
			(this.createdAt = vt.now());
		const w = {
				autoplay: i,
				delay: s,
				type: r,
				repeat: u,
				repeatDelay: h,
				repeatType: d,
				name: p,
				motionValue: x,
				element: y,
				...v,
			},
			A = y?.KeyframeResolver || sd;
		(this.keyframeResolver = new A(
			g,
			(M, z, N) => this.onKeyframesResolved(M, z, w, !N),
			p,
			x,
			y,
		)),
			this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(i, s, r, u) {
		this.keyframeResolver = void 0;
		const {
			name: h,
			type: d,
			velocity: g,
			delay: p,
			isHandoff: x,
			onUpdate: y,
		} = r;
		(this.resolvedAt = vt.now()),
			C6(i, h, d, g) ||
				((qn.instantAnimations || !p) && y?.(ad(i, r, s)),
				(i[0] = i[i.length - 1]),
				jf(r),
				(r.repeat = 0));
		const w = {
				startTime: u
					? this.resolvedAt
						? this.resolvedAt - this.createdAt > E6
							? this.resolvedAt
							: this.createdAt
						: this.createdAt
					: void 0,
				finalKeyframe: s,
				...r,
				keyframes: i,
			},
			A = !x && A6(w),
			M = w.motionValue?.owner?.current,
			z = A ? new w6({ ...w, element: M }) : new ld(w);
		z.finished
			.then(() => {
				this.notifyFinished();
			})
			.catch(Mt),
			this.pendingTimeline &&
				((this.stopTimeline = z.attachTimeline(this.pendingTimeline)),
				(this.pendingTimeline = void 0)),
			(this._animation = z);
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(i, s) {
		return this.finished.finally(i).then(() => {});
	}
	get animation() {
		return (
			this._animation || (this.keyframeResolver?.resume(), h6()),
			this._animation
		);
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(i) {
		this.animation.time = i;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(i) {
		this.animation.speed = i;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(i) {
		return (
			this._animation
				? (this.stopTimeline = this.animation.attachTimeline(i))
				: (this.pendingTimeline = i),
			() => this.stop()
		);
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}
function w2(n, i, s, r = 0, u = 1) {
	const h = Array.from(n)
			.sort((x, y) => x.sortNodePosition(y))
			.indexOf(i),
		d = n.size,
		g = (d - 1) * r;
	return typeof s == "function" ? s(h, d) : u === 1 ? h * r : g - h * r;
}
const N6 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function R6(n) {
	const i = N6.exec(n);
	if (!i) return [,];
	const [, s, r, u] = i;
	return [`--${s ?? r}`, u];
}
function S2(n, i, s = 1) {
	const [r, u] = R6(n);
	if (!r) return;
	const h = window.getComputedStyle(i).getPropertyValue(r);
	if (h) {
		const d = h.trim();
		return kg(d) ? parseFloat(d) : d;
	}
	return Wf(u) ? S2(u, i, s + 1) : u;
}
const D6 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
	L6 = (n) => ({
		type: "spring",
		stiffness: 550,
		damping: n === 0 ? 2 * Math.sqrt(550) : 30,
		restSpeed: 10,
	}),
	z6 = { type: "keyframes", duration: 0.8 },
	O6 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
	V6 = (n, { keyframes: i }) =>
		i.length > 2
			? z6
			: Wi.has(n)
				? n.startsWith("scale")
					? L6(i[1])
					: D6
				: O6,
	B6 = (n) => n !== null;
function _6(n, { repeat: i, repeatType: s = "loop" }, r) {
	const u = n.filter(B6),
		h = i && s !== "loop" && i % 2 === 1 ? 0 : u.length - 1;
	return u[h];
}
function C2(n, i) {
	if (n?.inherit && i) {
		const { inherit: s, ...r } = n;
		return { ...i, ...r };
	}
	return n;
}
function rd(n, i) {
	const s = n?.[i] ?? n?.default ?? n;
	return s !== n ? C2(s, n) : s;
}
function k6({
	when: n,
	delay: i,
	delayChildren: s,
	staggerChildren: r,
	staggerDirection: u,
	repeat: h,
	repeatType: d,
	repeatDelay: g,
	from: p,
	elapsed: x,
	...y
}) {
	return !!Object.keys(y).length;
}
const od =
	(n, i, s, r = {}, u, h) =>
	(d) => {
		const g = rd(r, n) || {},
			p = g.delay || r.delay || 0;
		let { elapsed: x = 0 } = r;
		x = x - rn(p);
		const y = {
			keyframes: Array.isArray(s) ? s : [null, s],
			ease: "easeOut",
			velocity: i.getVelocity(),
			...g,
			delay: -x,
			onUpdate: (w) => {
				i.set(w), g.onUpdate && g.onUpdate(w);
			},
			onComplete: () => {
				d(), g.onComplete && g.onComplete();
			},
			name: n,
			motionValue: i,
			element: h ? void 0 : u,
		};
		k6(g) || Object.assign(y, V6(n, y)),
			y.duration && (y.duration = rn(y.duration)),
			y.repeatDelay && (y.repeatDelay = rn(y.repeatDelay)),
			y.from !== void 0 && (y.keyframes[0] = y.from);
		let v = !1;
		if (
			((y.type === !1 || (y.duration === 0 && !y.repeatDelay)) &&
				(jf(y), y.delay === 0 && (v = !0)),
			(qn.instantAnimations || qn.skipAnimations || u?.shouldSkipAnimations) &&
				((v = !0), jf(y), (y.delay = 0)),
			(y.allowFlatten = !g.type && !g.ease),
			v && !h && i.get() !== void 0)
		) {
			const w = _6(y.keyframes, g);
			if (w !== void 0) {
				Ae.update(() => {
					y.onUpdate(w), y.onComplete();
				});
				return;
			}
		}
		return g.isSync ? new ld(y) : new M6(y);
	};
function np(n) {
	const i = [{}, {}];
	return (
		n?.values.forEach((s, r) => {
			(i[0][r] = s.get()), (i[1][r] = s.getVelocity());
		}),
		i
	);
}
function ud(n, i, s, r) {
	if (typeof i == "function") {
		const [u, h] = np(r);
		i = i(s !== void 0 ? s : n.custom, u, h);
	}
	if (
		(typeof i == "string" && (i = n.variants && n.variants[i]),
		typeof i == "function")
	) {
		const [u, h] = np(r);
		i = i(s !== void 0 ? s : n.custom, u, h);
	}
	return i;
}
function Xi(n, i, s) {
	const r = n.getProps();
	return ud(r, i, s !== void 0 ? s : r.custom, n);
}
const j2 = new Set([
		"width",
		"height",
		"top",
		"left",
		"right",
		"bottom",
		...Ji,
	]),
	ap = 30,
	H6 = (n) => !isNaN(parseFloat(n)),
	$l = { current: void 0 };
class U6 {
	constructor(i, s = {}) {
		(this.canTrackVelocity = null),
			(this.events = {}),
			(this.updateAndNotify = (r) => {
				const u = vt.now();
				if (
					(this.updatedAt !== u && this.setPrevFrameValue(),
					(this.prev = this.current),
					this.setCurrent(r),
					this.current !== this.prev &&
						(this.events.change?.notify(this.current), this.dependents))
				)
					for (const h of this.dependents) h.dirty();
			}),
			(this.hasAnimated = !1),
			this.setCurrent(i),
			(this.owner = s.owner);
	}
	setCurrent(i) {
		(this.current = i),
			(this.updatedAt = vt.now()),
			this.canTrackVelocity === null &&
				i !== void 0 &&
				(this.canTrackVelocity = H6(this.current));
	}
	setPrevFrameValue(i = this.current) {
		(this.prevFrameValue = i), (this.prevUpdatedAt = this.updatedAt);
	}
	onChange(i) {
		return this.on("change", i);
	}
	on(i, s) {
		this.events[i] || (this.events[i] = new Qf());
		const r = this.events[i].add(s);
		return i === "change"
			? () => {
					r(),
						Ae.read(() => {
							this.events.change.getSize() || this.stop();
						});
				}
			: r;
	}
	clearListeners() {
		for (const i in this.events) this.events[i].clear();
	}
	attach(i, s) {
		(this.passiveEffect = i), (this.stopPassiveEffect = s);
	}
	set(i) {
		this.passiveEffect
			? this.passiveEffect(i, this.updateAndNotify)
			: this.updateAndNotify(i);
	}
	setWithVelocity(i, s, r) {
		this.set(s),
			(this.prev = void 0),
			(this.prevFrameValue = i),
			(this.prevUpdatedAt = this.updatedAt - r);
	}
	jump(i, s = !0) {
		this.updateAndNotify(i),
			(this.prev = i),
			(this.prevUpdatedAt = this.prevFrameValue = void 0),
			s && this.stop(),
			this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(i) {
		this.dependents || (this.dependents = new Set()), this.dependents.add(i);
	}
	removeDependent(i) {
		this.dependents && this.dependents.delete(i);
	}
	get() {
		return $l.current && $l.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		const i = vt.now();
		if (
			!this.canTrackVelocity ||
			this.prevFrameValue === void 0 ||
			i - this.updatedAt > ap
		)
			return 0;
		const s = Math.min(this.updatedAt - this.prevUpdatedAt, ap);
		return Pf(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
	}
	start(i) {
		return (
			this.stop(),
			new Promise((s) => {
				(this.hasAnimated = !0),
					(this.animation = i(s)),
					this.events.animationStart && this.events.animationStart.notify();
			}).then(() => {
				this.events.animationComplete && this.events.animationComplete.notify(),
					this.clearAnimation();
			})
		);
	}
	stop() {
		this.animation &&
			(this.animation.stop(),
			this.events.animationCancel && this.events.animationCancel.notify()),
			this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(),
			this.events.destroy?.notify(),
			this.clearListeners(),
			this.stop(),
			this.stopPassiveEffect && this.stopPassiveEffect();
	}
}
function sn(n, i) {
	return new U6(n, i);
}
const Tf = (n) => Array.isArray(n);
function G6(n, i, s) {
	n.hasValue(i) ? n.getValue(i).set(s) : n.addValue(i, sn(s));
}
function Y6(n) {
	return Tf(n) ? n[n.length - 1] || 0 : n;
}
function q6(n, i) {
	const s = Xi(n, i);
	let { transitionEnd: r = {}, transition: u = {}, ...h } = s || {};
	h = { ...h, ...r };
	for (const d in h) {
		const g = Y6(h[d]);
		G6(n, d, g);
	}
}
const xt = (n) => !!(n && n.getVelocity);
function Z6(n) {
	return !!(xt(n) && n.add);
}
function Af(n, i) {
	const s = n.getValue("willChange");
	if (Z6(s)) return s.add(i);
	if (!s && qn.WillChange) {
		const r = new qn.WillChange("auto");
		n.addValue("willChange", r), r.add(i);
	}
}
function cd(n) {
	return n.replace(/([A-Z])/g, (i) => `-${i.toLowerCase()}`);
}
const X6 = "framerAppearId",
	T2 = "data-" + cd(X6);
function A2(n) {
	return n.props[T2];
}
function K6({ protectedKeys: n, needsAnimating: i }, s) {
	const r = n.hasOwnProperty(s) && i[s] !== !0;
	return (i[s] = !1), r;
}
function E2(n, i, { delay: s = 0, transitionOverride: r, type: u } = {}) {
	let { transition: h, transitionEnd: d, ...g } = i;
	const p = n.getDefaultTransition();
	h = h ? C2(h, p) : p;
	const x = h?.reduceMotion;
	r && (h = r);
	const y = [],
		v = u && n.animationState && n.animationState.getState()[u];
	for (const w in g) {
		const A = n.getValue(w, n.latestValues[w] ?? null),
			M = g[w];
		if (M === void 0 || (v && K6(v, w))) continue;
		const z = { delay: s, ...rd(h || {}, w) },
			N = A.get();
		if (
			N !== void 0 &&
			!A.isAnimating &&
			!Array.isArray(M) &&
			M === N &&
			!z.velocity
		)
			continue;
		let V = !1;
		if (window.MotionHandoffAnimation) {
			const K = A2(n);
			if (K) {
				const X = window.MotionHandoffAnimation(K, w, Ae);
				X !== null && ((z.startTime = X), (V = !0));
			}
		}
		Af(n, w);
		const q = x ?? n.shouldReduceMotion;
		A.start(od(w, A, M, q && j2.has(w) ? { type: !1 } : z, n, V));
		const k = A.animation;
		k && y.push(k);
	}
	if (d) {
		const w = () =>
			Ae.update(() => {
				d && q6(n, d);
			});
		y.length ? Promise.all(y).then(w) : w();
	}
	return y;
}
function Ef(n, i, s = {}) {
	const r = Xi(n, i, s.type === "exit" ? n.presenceContext?.custom : void 0);
	let { transition: u = n.getDefaultTransition() || {} } = r || {};
	s.transitionOverride && (u = s.transitionOverride);
	const h = r ? () => Promise.all(E2(n, r, s)) : () => Promise.resolve(),
		d =
			n.variantChildren && n.variantChildren.size
				? (p = 0) => {
						const {
							delayChildren: x = 0,
							staggerChildren: y,
							staggerDirection: v,
						} = u;
						return Q6(n, i, p, x, y, v, s);
					}
				: () => Promise.resolve(),
		{ when: g } = u;
	if (g) {
		const [p, x] = g === "beforeChildren" ? [h, d] : [d, h];
		return p().then(() => x());
	} else return Promise.all([h(), d(s.delay)]);
}
function Q6(n, i, s = 0, r = 0, u = 0, h = 1, d) {
	const g = [];
	for (const p of n.variantChildren)
		p.notify("AnimationStart", i),
			g.push(
				Ef(p, i, {
					...d,
					delay:
						s +
						(typeof r == "function" ? 0 : r) +
						w2(n.variantChildren, p, r, u, h),
				}).then(() => p.notify("AnimationComplete", i)),
			);
	return Promise.all(g);
}
function P6(n, i, s = {}) {
	n.notify("AnimationStart", i);
	let r;
	if (Array.isArray(i)) {
		const u = i.map((h) => Ef(n, h, s));
		r = Promise.all(u);
	} else if (typeof i == "string") r = Ef(n, i, s);
	else {
		const u = typeof i == "function" ? Xi(n, i, s.custom) : i;
		r = Promise.all(E2(n, u, s));
	}
	return r.then(() => {
		n.notify("AnimationComplete", i);
	});
}
const F6 = { test: (n) => n === "auto", parse: (n) => n },
	M2 = (n) => (i) => i.test(n),
	N2 = [Fi, te, yn, va, Ev, Av, F6],
	ip = (n) => N2.find(M2(n));
function J6(n) {
	return typeof n == "number"
		? n === 0
		: n !== null
			? n === "none" || n === "0" || Ug(n)
			: !0;
}
const W6 = new Set(["brightness", "contrast", "saturate", "opacity"]);
function $6(n) {
	const [i, s] = n.slice(0, -1).split("(");
	if (i === "drop-shadow") return n;
	const [r] = s.match($f) || [];
	if (!r) return n;
	const u = s.replace(r, "");
	let h = W6.has(i) ? 1 : 0;
	return r !== s && (h *= 100), i + "(" + h + u + ")";
}
const I6 = /\b([a-z-]*)\(.*?\)/gu,
	Mf = {
		...on,
		getAnimatableNone: (n) => {
			const i = n.match(I6);
			return i ? i.map($6).join(" ") : n;
		},
	},
	Nf = {
		...on,
		getAnimatableNone: (n) => {
			const i = on.parse(n);
			return on.createTransformer(n)(
				i.map((r) =>
					typeof r == "number"
						? 0
						: typeof r == "object"
							? { ...r, alpha: 1 }
							: r,
				),
			);
		},
	},
	lp = { ...Fi, transform: Math.round },
	e9 = {
		rotate: va,
		rotateX: va,
		rotateY: va,
		rotateZ: va,
		scale: Or,
		scaleX: Or,
		scaleY: Or,
		scaleZ: Or,
		skew: va,
		skewX: va,
		skewY: va,
		distance: te,
		translateX: te,
		translateY: te,
		translateZ: te,
		x: te,
		y: te,
		z: te,
		perspective: te,
		transformPerspective: te,
		opacity: as,
		originX: X0,
		originY: X0,
		originZ: te,
	},
	fd = {
		borderWidth: te,
		borderTopWidth: te,
		borderRightWidth: te,
		borderBottomWidth: te,
		borderLeftWidth: te,
		borderRadius: te,
		borderTopLeftRadius: te,
		borderTopRightRadius: te,
		borderBottomRightRadius: te,
		borderBottomLeftRadius: te,
		width: te,
		maxWidth: te,
		height: te,
		maxHeight: te,
		top: te,
		right: te,
		bottom: te,
		left: te,
		inset: te,
		insetBlock: te,
		insetBlockStart: te,
		insetBlockEnd: te,
		insetInline: te,
		insetInlineStart: te,
		insetInlineEnd: te,
		padding: te,
		paddingTop: te,
		paddingRight: te,
		paddingBottom: te,
		paddingLeft: te,
		paddingBlock: te,
		paddingBlockStart: te,
		paddingBlockEnd: te,
		paddingInline: te,
		paddingInlineStart: te,
		paddingInlineEnd: te,
		margin: te,
		marginTop: te,
		marginRight: te,
		marginBottom: te,
		marginLeft: te,
		marginBlock: te,
		marginBlockStart: te,
		marginBlockEnd: te,
		marginInline: te,
		marginInlineStart: te,
		marginInlineEnd: te,
		fontSize: te,
		backgroundPositionX: te,
		backgroundPositionY: te,
		...e9,
		zIndex: lp,
		fillOpacity: as,
		strokeOpacity: as,
		numOctaves: lp,
	},
	t9 = {
		...fd,
		color: $e,
		backgroundColor: $e,
		outlineColor: $e,
		fill: $e,
		stroke: $e,
		borderColor: $e,
		borderTopColor: $e,
		borderRightColor: $e,
		borderBottomColor: $e,
		borderLeftColor: $e,
		filter: Mf,
		WebkitFilter: Mf,
		mask: Nf,
		WebkitMask: Nf,
	},
	R2 = (n) => t9[n],
	n9 = new Set([Mf, Nf]);
function D2(n, i) {
	let s = R2(n);
	return (
		n9.has(s) || (s = on), s.getAnimatableNone ? s.getAnimatableNone(i) : void 0
	);
}
const a9 = new Set(["auto", "none", "0"]);
function i9(n, i, s) {
	let r = 0,
		u;
	for (; r < n.length && !u; ) {
		const h = n[r];
		typeof h == "string" && !a9.has(h) && is(h).values.length && (u = n[r]),
			r++;
	}
	if (u && s) for (const h of i) n[h] = D2(s, u);
}
class l9 extends sd {
	constructor(i, s, r, u, h) {
		super(i, s, r, u, h, !0);
	}
	readKeyframes() {
		const { unresolvedKeyframes: i, element: s, name: r } = this;
		if (!s || !s.current) return;
		super.readKeyframes();
		for (let y = 0; y < i.length; y++) {
			let v = i[y];
			if (typeof v == "string" && ((v = v.trim()), Wf(v))) {
				const w = S2(v, s.current);
				w !== void 0 && (i[y] = w),
					y === i.length - 1 && (this.finalKeyframe = v);
			}
		}
		if ((this.resolveNoneKeyframes(), !j2.has(r) || i.length !== 2)) return;
		const [u, h] = i,
			d = ip(u),
			g = ip(h),
			p = Z0(u),
			x = Z0(h);
		if (p !== x && ba[r]) {
			this.needsMeasurement = !0;
			return;
		}
		if (d !== g)
			if (I0(d) && I0(g))
				for (let y = 0; y < i.length; y++) {
					const v = i[y];
					typeof v == "string" && (i[y] = parseFloat(v));
				}
			else ba[r] && (this.needsMeasurement = !0);
	}
	resolveNoneKeyframes() {
		const { unresolvedKeyframes: i, name: s } = this,
			r = [];
		for (let u = 0; u < i.length; u++) (i[u] === null || J6(i[u])) && r.push(u);
		r.length && i9(i, r, s);
	}
	measureInitialState() {
		const { element: i, unresolvedKeyframes: s, name: r } = this;
		if (!i || !i.current) return;
		r === "height" && (this.suspendedScrollY = window.pageYOffset),
			(this.measuredOrigin = ba[r](
				i.measureViewportBox(),
				window.getComputedStyle(i.current),
			)),
			(s[0] = this.measuredOrigin);
		const u = s[s.length - 1];
		u !== void 0 && i.getValue(r, u).jump(u, !1);
	}
	measureEndState() {
		const { element: i, name: s, unresolvedKeyframes: r } = this;
		if (!i || !i.current) return;
		const u = i.getValue(s);
		u && u.jump(this.measuredOrigin, !1);
		const h = r.length - 1,
			d = r[h];
		(r[h] = ba[s](i.measureViewportBox(), window.getComputedStyle(i.current))),
			d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d),
			this.removedTransforms?.length &&
				this.removedTransforms.forEach(([g, p]) => {
					i.getValue(g).set(p);
				}),
			this.resolveNoneKeyframes();
	}
}
const s9 = new Set(["opacity", "clipPath", "filter", "transform"]);
function L2(n, i, s) {
	if (n == null) return [];
	if (n instanceof EventTarget) return [n];
	if (typeof n == "string") {
		const u = document.querySelectorAll(n);
		return u ? Array.from(u) : [];
	}
	return Array.from(n).filter((r) => r != null);
}
const z2 = (n, i) => (i && typeof n == "number" ? i.transform(n) : n);
function no(n) {
	return Hg(n) && "offsetHeight" in n;
}
const { schedule: dd } = $g(queueMicrotask, !1),
	ln = { x: !1, y: !1 };
function O2() {
	return ln.x || ln.y;
}
function r9(n) {
	return n === "x" || n === "y"
		? ln[n]
			? null
			: ((ln[n] = !0),
				() => {
					ln[n] = !1;
				})
		: ln.x || ln.y
			? null
			: ((ln.x = ln.y = !0),
				() => {
					ln.x = ln.y = !1;
				});
}
function V2(n, i) {
	const s = L2(n),
		r = new AbortController(),
		u = { passive: !0, ...i, signal: r.signal };
	return [s, u, () => r.abort()];
}
function o9(n) {
	return !(n.pointerType === "touch" || O2());
}
function u9(n, i, s = {}) {
	const [r, u, h] = V2(n, s);
	return (
		r.forEach((d) => {
			let g = !1,
				p = !1,
				x;
			const y = () => {
					d.removeEventListener("pointerleave", M);
				},
				v = (N) => {
					x && (x(N), (x = void 0)), y();
				},
				w = (N) => {
					(g = !1),
						window.removeEventListener("pointerup", w),
						window.removeEventListener("pointercancel", w),
						p && ((p = !1), v(N));
				},
				A = () => {
					(g = !0),
						window.addEventListener("pointerup", w, u),
						window.addEventListener("pointercancel", w, u);
				},
				M = (N) => {
					if (N.pointerType !== "touch") {
						if (g) {
							p = !0;
							return;
						}
						v(N);
					}
				},
				z = (N) => {
					if (!o9(N)) return;
					p = !1;
					const V = i(d, N);
					typeof V == "function" &&
						((x = V), d.addEventListener("pointerleave", M, u));
				};
			d.addEventListener("pointerenter", z, u),
				d.addEventListener("pointerdown", A, u);
		}),
		h
	);
}
const B2 = (n, i) => (i ? (n === i ? !0 : B2(n, i.parentElement)) : !1),
	hd = (n) =>
		n.pointerType === "mouse"
			? typeof n.button != "number" || n.button <= 0
			: n.isPrimary !== !1,
	c9 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function f9(n) {
	return c9.has(n.tagName) || n.isContentEditable === !0;
}
const d9 = new Set(["INPUT", "SELECT", "TEXTAREA"]);
function h9(n) {
	return d9.has(n.tagName) || n.isContentEditable === !0;
}
const Zr = new WeakSet();
function sp(n) {
	return (i) => {
		i.key === "Enter" && n(i);
	};
}
function Jc(n, i) {
	n.dispatchEvent(
		new PointerEvent("pointer" + i, { isPrimary: !0, bubbles: !0 }),
	);
}
const m9 = (n, i) => {
	const s = n.currentTarget;
	if (!s) return;
	const r = sp(() => {
		if (Zr.has(s)) return;
		Jc(s, "down");
		const u = sp(() => {
				Jc(s, "up");
			}),
			h = () => Jc(s, "cancel");
		s.addEventListener("keyup", u, i), s.addEventListener("blur", h, i);
	});
	s.addEventListener("keydown", r, i),
		s.addEventListener("blur", () => s.removeEventListener("keydown", r), i);
};
function rp(n) {
	return hd(n) && !O2();
}
const op = new WeakSet();
function p9(n, i, s = {}) {
	const [r, u, h] = V2(n, s),
		d = (g) => {
			const p = g.currentTarget;
			if (!rp(g) || op.has(g)) return;
			Zr.add(p), s.stopPropagation && op.add(g);
			const x = i(p, g),
				y = (A, M) => {
					window.removeEventListener("pointerup", v),
						window.removeEventListener("pointercancel", w),
						Zr.has(p) && Zr.delete(p),
						rp(A) && typeof x == "function" && x(A, { success: M });
				},
				v = (A) => {
					y(
						A,
						p === window ||
							p === document ||
							s.useGlobalTarget ||
							B2(p, A.target),
					);
				},
				w = (A) => {
					y(A, !1);
				};
			window.addEventListener("pointerup", v, u),
				window.addEventListener("pointercancel", w, u);
		};
	return (
		r.forEach((g) => {
			(s.useGlobalTarget ? window : g).addEventListener("pointerdown", d, u),
				no(g) &&
					(g.addEventListener("focus", (x) => m9(x, u)),
					!f9(g) && !g.hasAttribute("tabindex") && (g.tabIndex = 0));
		}),
		h
	);
}
function md(n) {
	return Hg(n) && "ownerSVGElement" in n;
}
const Xr = new WeakMap();
let Kr;
const _2 = (n, i, s) => (r, u) =>
		u && u[0]
			? u[0][n + "Size"]
			: md(r) && "getBBox" in r
				? r.getBBox()[i]
				: r[s],
	g9 = _2("inline", "width", "offsetWidth"),
	x9 = _2("block", "height", "offsetHeight");
function y9({ target: n, borderBoxSize: i }) {
	Xr.get(n)?.forEach((s) => {
		s(n, {
			get width() {
				return g9(n, i);
			},
			get height() {
				return x9(n, i);
			},
		});
	});
}
function v9(n) {
	n.forEach(y9);
}
function b9() {
	typeof ResizeObserver > "u" || (Kr = new ResizeObserver(v9));
}
function w9(n, i) {
	Kr || b9();
	const s = L2(n);
	return (
		s.forEach((r) => {
			let u = Xr.get(r);
			u || ((u = new Set()), Xr.set(r, u)), u.add(i), Kr?.observe(r);
		}),
		() => {
			s.forEach((r) => {
				const u = Xr.get(r);
				u?.delete(i), u?.size || Kr?.unobserve(r);
			});
		}
	);
}
const Qr = new Set();
let Ui;
function S9() {
	(Ui = () => {
		const n = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			},
		};
		Qr.forEach((i) => i(n));
	}),
		window.addEventListener("resize", Ui);
}
function C9(n) {
	return (
		Qr.add(n),
		Ui || S9(),
		() => {
			Qr.delete(n),
				!Qr.size &&
					typeof Ui == "function" &&
					(window.removeEventListener("resize", Ui), (Ui = void 0));
		}
	);
}
function Rf(n, i) {
	return typeof n == "function" ? C9(n) : w9(n, i);
}
function k2(n, i) {
	let s;
	const r = () => {
		const { currentTime: u } = i,
			d = (u === null ? 0 : u.value) / 100;
		s !== d && n(d), (s = d);
	};
	return Ae.preUpdate(r, !0), () => Wt(r);
}
function j9(n) {
	return md(n) && n.tagName === "svg";
}
function T9(...n) {
	const i = !Array.isArray(n[0]),
		s = i ? 0 : -1,
		r = n[0 + s],
		u = n[1 + s],
		h = n[2 + s],
		d = n[3 + s],
		g = nd(u, h, d);
	return i ? g(r) : g;
}
const A9 = [...N2, $e, on],
	E9 = (n) => A9.find(M2(n)),
	up = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
	Gi = () => ({ x: up(), y: up() }),
	cp = () => ({ min: 0, max: 0 }),
	at = () => ({ x: cp(), y: cp() }),
	M9 = new WeakMap();
function mo(n) {
	return n !== null && typeof n == "object" && typeof n.start == "function";
}
function ls(n) {
	return typeof n == "string" || Array.isArray(n);
}
const pd = [
		"animate",
		"whileInView",
		"whileFocus",
		"whileHover",
		"whileTap",
		"whileDrag",
		"exit",
	],
	gd = ["initial", ...pd];
function po(n) {
	return mo(n.animate) || gd.some((i) => ls(n[i]));
}
function H2(n) {
	return !!(po(n) || n.variants);
}
function N9(n, i, s) {
	for (const r in i) {
		const u = i[r],
			h = s[r];
		if (xt(u)) n.addValue(r, u);
		else if (xt(h)) n.addValue(r, sn(u, { owner: n }));
		else if (h !== u)
			if (n.hasValue(r)) {
				const d = n.getValue(r);
				d.liveStyle === !0 ? d.jump(u) : d.hasAnimated || d.set(u);
			} else {
				const d = n.getStaticValue(r);
				n.addValue(r, sn(d !== void 0 ? d : u, { owner: n }));
			}
	}
	for (const r in s) i[r] === void 0 && n.removeValue(r);
	return i;
}
const ao = { current: null },
	xd = { current: !1 },
	R9 = typeof window < "u";
function U2() {
	if (((xd.current = !0), !!R9))
		if (window.matchMedia) {
			const n = window.matchMedia("(prefers-reduced-motion)"),
				i = () => (ao.current = n.matches);
			n.addEventListener("change", i), i();
		} else ao.current = !1;
}
const fp = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete",
];
let io = {};
function G2(n) {
	io = n;
}
function D9() {
	return io;
}
class L9 {
	scrapeMotionValuesFromProps(i, s, r) {
		return {};
	}
	constructor(
		{
			parent: i,
			props: s,
			presenceContext: r,
			reducedMotionConfig: u,
			skipAnimations: h,
			blockInitialAnimation: d,
			visualState: g,
		},
		p = {},
	) {
		(this.current = null),
			(this.children = new Set()),
			(this.isVariantNode = !1),
			(this.isControllingVariants = !1),
			(this.shouldReduceMotion = null),
			(this.shouldSkipAnimations = !1),
			(this.values = new Map()),
			(this.KeyframeResolver = sd),
			(this.features = {}),
			(this.valueSubscriptions = new Map()),
			(this.prevMotionValues = {}),
			(this.hasBeenMounted = !1),
			(this.events = {}),
			(this.propEventSubscriptions = {}),
			(this.notifyUpdate = () => this.notify("Update", this.latestValues)),
			(this.render = () => {
				this.current &&
					(this.triggerBuild(),
					this.renderInstance(
						this.current,
						this.renderState,
						this.props.style,
						this.projection,
					));
			}),
			(this.renderScheduledAt = 0),
			(this.scheduleRender = () => {
				const A = vt.now();
				this.renderScheduledAt < A &&
					((this.renderScheduledAt = A), Ae.render(this.render, !1, !0));
			});
		const { latestValues: x, renderState: y } = g;
		(this.latestValues = x),
			(this.baseTarget = { ...x }),
			(this.initialValues = s.initial ? { ...x } : {}),
			(this.renderState = y),
			(this.parent = i),
			(this.props = s),
			(this.presenceContext = r),
			(this.depth = i ? i.depth + 1 : 0),
			(this.reducedMotionConfig = u),
			(this.skipAnimationsConfig = h),
			(this.options = p),
			(this.blockInitialAnimation = !!d),
			(this.isControllingVariants = po(s)),
			(this.isVariantNode = H2(s)),
			this.isVariantNode && (this.variantChildren = new Set()),
			(this.manuallyAnimateOnMount = !!(i && i.current));
		const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(
			s,
			{},
			this,
		);
		for (const A in w) {
			const M = w[A];
			x[A] !== void 0 && xt(M) && M.set(x[A]);
		}
	}
	mount(i) {
		if (this.hasBeenMounted)
			for (const s in this.initialValues)
				this.values.get(s)?.jump(this.initialValues[s]),
					(this.latestValues[s] = this.initialValues[s]);
		(this.current = i),
			M9.set(i, this),
			this.projection && !this.projection.instance && this.projection.mount(i),
			this.parent &&
				this.isVariantNode &&
				!this.isControllingVariants &&
				(this.removeFromVariantTree = this.parent.addVariantChild(this)),
			this.values.forEach((s, r) => this.bindToMotionValue(r, s)),
			this.reducedMotionConfig === "never"
				? (this.shouldReduceMotion = !1)
				: this.reducedMotionConfig === "always"
					? (this.shouldReduceMotion = !0)
					: (xd.current || U2(), (this.shouldReduceMotion = ao.current)),
			(this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
			this.parent?.addChild(this),
			this.update(this.props, this.presenceContext),
			(this.hasBeenMounted = !0);
	}
	unmount() {
		this.projection && this.projection.unmount(),
			Wt(this.notifyUpdate),
			Wt(this.render),
			this.valueSubscriptions.forEach((i) => i()),
			this.valueSubscriptions.clear(),
			this.removeFromVariantTree && this.removeFromVariantTree(),
			this.parent?.removeChild(this);
		for (const i in this.events) this.events[i].clear();
		for (const i in this.features) {
			const s = this.features[i];
			s && (s.unmount(), (s.isMounted = !1));
		}
		this.current = null;
	}
	addChild(i) {
		this.children.add(i),
			this.enteringChildren ?? (this.enteringChildren = new Set()),
			this.enteringChildren.add(i);
	}
	removeChild(i) {
		this.children.delete(i),
			this.enteringChildren && this.enteringChildren.delete(i);
	}
	bindToMotionValue(i, s) {
		if (
			(this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)(),
			s.accelerate && s9.has(i) && this.current instanceof HTMLElement)
		) {
			const {
					factory: d,
					keyframes: g,
					times: p,
					ease: x,
					duration: y,
				} = s.accelerate,
				v = new v2({
					element: this.current,
					name: i,
					keyframes: g,
					times: p,
					ease: x,
					duration: rn(y),
				}),
				w = d(v);
			this.valueSubscriptions.set(i, () => {
				w(), v.cancel();
			});
			return;
		}
		const r = Wi.has(i);
		r && this.onBindTransform && this.onBindTransform();
		const u = s.on("change", (d) => {
			(this.latestValues[i] = d),
				this.props.onUpdate && Ae.preRender(this.notifyUpdate),
				r && this.projection && (this.projection.isTransformDirty = !0),
				this.scheduleRender();
		});
		let h;
		typeof window < "u" &&
			window.MotionCheckAppearSync &&
			(h = window.MotionCheckAppearSync(this, i, s)),
			this.valueSubscriptions.set(i, () => {
				u(), h && h(), s.owner && s.stop();
			});
	}
	sortNodePosition(i) {
		return !this.current ||
			!this.sortInstanceNodePosition ||
			this.type !== i.type
			? 0
			: this.sortInstanceNodePosition(this.current, i.current);
	}
	updateFeatures() {
		let i = "animation";
		for (i in io) {
			const s = io[i];
			if (!s) continue;
			const { isEnabled: r, Feature: u } = s;
			if (
				(!this.features[i] &&
					u &&
					r(this.props) &&
					(this.features[i] = new u(this)),
				this.features[i])
			) {
				const h = this.features[i];
				h.isMounted ? h.update() : (h.mount(), (h.isMounted = !0));
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current
			? this.measureInstanceViewportBox(this.current, this.props)
			: at();
	}
	getStaticValue(i) {
		return this.latestValues[i];
	}
	setStaticValue(i, s) {
		this.latestValues[i] = s;
	}
	update(i, s) {
		(i.transformTemplate || this.props.transformTemplate) &&
			this.scheduleRender(),
			(this.prevProps = this.props),
			(this.props = i),
			(this.prevPresenceContext = this.presenceContext),
			(this.presenceContext = s);
		for (let r = 0; r < fp.length; r++) {
			const u = fp[r];
			this.propEventSubscriptions[u] &&
				(this.propEventSubscriptions[u](),
				delete this.propEventSubscriptions[u]);
			const h = "on" + u,
				d = i[h];
			d && (this.propEventSubscriptions[u] = this.on(u, d));
		}
		(this.prevMotionValues = N9(
			this,
			this.scrapeMotionValuesFromProps(i, this.prevProps || {}, this),
			this.prevMotionValues,
		)),
			this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(i) {
		return this.props.variants ? this.props.variants[i] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode
			? this
			: this.parent
				? this.parent.getClosestVariantNode()
				: void 0;
	}
	addVariantChild(i) {
		const s = this.getClosestVariantNode();
		if (s)
			return (
				s.variantChildren && s.variantChildren.add(i),
				() => s.variantChildren.delete(i)
			);
	}
	addValue(i, s) {
		const r = this.values.get(i);
		s !== r &&
			(r && this.removeValue(i),
			this.bindToMotionValue(i, s),
			this.values.set(i, s),
			(this.latestValues[i] = s.get()));
	}
	removeValue(i) {
		this.values.delete(i);
		const s = this.valueSubscriptions.get(i);
		s && (s(), this.valueSubscriptions.delete(i)),
			delete this.latestValues[i],
			this.removeValueFromRenderState(i, this.renderState);
	}
	hasValue(i) {
		return this.values.has(i);
	}
	getValue(i, s) {
		if (this.props.values && this.props.values[i]) return this.props.values[i];
		let r = this.values.get(i);
		return (
			r === void 0 &&
				s !== void 0 &&
				((r = sn(s === null ? void 0 : s, { owner: this })),
				this.addValue(i, r)),
			r
		);
	}
	readValue(i, s) {
		let r =
			this.latestValues[i] !== void 0 || !this.current
				? this.latestValues[i]
				: (this.getBaseTargetFromProps(this.props, i) ??
					this.readValueFromInstance(this.current, i, this.options));
		return (
			r != null &&
				(typeof r == "string" && (kg(r) || Ug(r))
					? (r = parseFloat(r))
					: !E9(r) && on.test(s) && (r = D2(i, s)),
				this.setBaseTarget(i, xt(r) ? r.get() : r)),
			xt(r) ? r.get() : r
		);
	}
	setBaseTarget(i, s) {
		this.baseTarget[i] = s;
	}
	getBaseTarget(i) {
		const { initial: s } = this.props;
		let r;
		if (typeof s == "string" || typeof s == "object") {
			const h = ud(this.props, s, this.presenceContext?.custom);
			h && (r = h[i]);
		}
		if (s && r !== void 0) return r;
		const u = this.getBaseTargetFromProps(this.props, i);
		return u !== void 0 && !xt(u)
			? u
			: this.initialValues[i] !== void 0 && r === void 0
				? void 0
				: this.baseTarget[i];
	}
	on(i, s) {
		return this.events[i] || (this.events[i] = new Qf()), this.events[i].add(s);
	}
	notify(i, ...s) {
		this.events[i] && this.events[i].notify(...s);
	}
	scheduleRenderMicrotask() {
		dd.render(this.render);
	}
}
class Y2 extends L9 {
	constructor() {
		super(...arguments), (this.KeyframeResolver = l9);
	}
	sortInstanceNodePosition(i, s) {
		return i.compareDocumentPosition(s) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(i, s) {
		const r = i.style;
		return r ? r[s] : void 0;
	}
	removeValueFromRenderState(i, { vars: s, style: r }) {
		delete s[i], delete r[i];
	}
	handleChildMotionValue() {
		this.childSubscription &&
			(this.childSubscription(), delete this.childSubscription);
		const { children: i } = this.props;
		xt(i) &&
			(this.childSubscription = i.on("change", (s) => {
				this.current && (this.current.textContent = `${s}`);
			}));
	}
}
class Sa {
	constructor(i) {
		(this.isMounted = !1), (this.node = i);
	}
	update() {}
}
function q2({ top: n, left: i, right: s, bottom: r }) {
	return { x: { min: i, max: s }, y: { min: n, max: r } };
}
function z9({ x: n, y: i }) {
	return { top: i.min, right: n.max, bottom: i.max, left: n.min };
}
function O9(n, i) {
	if (!i) return n;
	const s = i({ x: n.left, y: n.top }),
		r = i({ x: n.right, y: n.bottom });
	return { top: s.y, left: s.x, bottom: r.y, right: r.x };
}
function Wc(n) {
	return n === void 0 || n === 1;
}
function Df({ scale: n, scaleX: i, scaleY: s }) {
	return !Wc(n) || !Wc(i) || !Wc(s);
}
function Ka(n) {
	return (
		Df(n) ||
		Z2(n) ||
		n.z ||
		n.rotate ||
		n.rotateX ||
		n.rotateY ||
		n.skewX ||
		n.skewY
	);
}
function Z2(n) {
	return dp(n.x) || dp(n.y);
}
function dp(n) {
	return n && n !== "0%";
}
function lo(n, i, s) {
	const r = n - s,
		u = i * r;
	return s + u;
}
function hp(n, i, s, r, u) {
	return u !== void 0 && (n = lo(n, u, r)), lo(n, s, r) + i;
}
function Lf(n, i = 0, s = 1, r, u) {
	(n.min = hp(n.min, i, s, r, u)), (n.max = hp(n.max, i, s, r, u));
}
function X2(n, { x: i, y: s }) {
	Lf(n.x, i.translate, i.scale, i.originPoint),
		Lf(n.y, s.translate, s.scale, s.originPoint);
}
const mp = 0.999999999999,
	pp = 1.0000000000001;
function V9(n, i, s, r = !1) {
	const u = s.length;
	if (!u) return;
	i.x = i.y = 1;
	let h, d;
	for (let g = 0; g < u; g++) {
		(h = s[g]), (d = h.projectionDelta);
		const { visualElement: p } = h.options;
		(p && p.props.style && p.props.style.display === "contents") ||
			(r &&
				h.options.layoutScroll &&
				h.scroll &&
				h !== h.root &&
				qi(n, { x: -h.scroll.offset.x, y: -h.scroll.offset.y }),
			d && ((i.x *= d.x.scale), (i.y *= d.y.scale), X2(n, d)),
			r && Ka(h.latestValues) && qi(n, h.latestValues));
	}
	i.x < pp && i.x > mp && (i.x = 1), i.y < pp && i.y > mp && (i.y = 1);
}
function Yi(n, i) {
	(n.min = n.min + i), (n.max = n.max + i);
}
function gp(n, i, s, r, u = 0.5) {
	const h = Ge(n.min, n.max, u);
	Lf(n, i, s, h, r);
}
function qi(n, i) {
	gp(n.x, i.x, i.scaleX, i.scale, i.originX),
		gp(n.y, i.y, i.scaleY, i.scale, i.originY);
}
function K2(n, i) {
	return q2(O9(n.getBoundingClientRect(), i));
}
function B9(n, i, s) {
	const r = K2(n, s),
		{ scroll: u } = i;
	return u && (Yi(r.x, u.offset.x), Yi(r.y, u.offset.y)), r;
}
const _9 = {
		x: "translateX",
		y: "translateY",
		z: "translateZ",
		transformPerspective: "perspective",
	},
	k9 = Ji.length;
function H9(n, i, s) {
	let r = "",
		u = !0;
	for (let h = 0; h < k9; h++) {
		const d = Ji[h],
			g = n[d];
		if (g === void 0) continue;
		let p = !0;
		if (typeof g == "number") p = g === (d.startsWith("scale") ? 1 : 0);
		else {
			const x = parseFloat(g);
			p = d.startsWith("scale") ? x === 1 : x === 0;
		}
		if (!p || s) {
			const x = z2(g, fd[d]);
			if (!p) {
				u = !1;
				const y = _9[d] || d;
				r += `${y}(${x}) `;
			}
			s && (i[d] = x);
		}
	}
	return (r = r.trim()), s ? (r = s(i, u ? "" : r)) : u && (r = "none"), r;
}
function yd(n, i, s) {
	const { style: r, vars: u, transformOrigin: h } = n;
	let d = !1,
		g = !1;
	for (const p in i) {
		const x = i[p];
		if (Wi.has(p)) {
			d = !0;
			continue;
		} else if (e2(p)) {
			u[p] = x;
			continue;
		} else {
			const y = z2(x, fd[p]);
			p.startsWith("origin") ? ((g = !0), (h[p] = y)) : (r[p] = y);
		}
	}
	if (
		(i.transform ||
			(d || s
				? (r.transform = H9(i, n.transform, s))
				: r.transform && (r.transform = "none")),
		g)
	) {
		const { originX: p = "50%", originY: x = "50%", originZ: y = 0 } = h;
		r.transformOrigin = `${p} ${x} ${y}`;
	}
}
function Q2(n, { style: i, vars: s }, r, u) {
	const h = n.style;
	let d;
	for (d in i) h[d] = i[d];
	u?.applyProjectionStyles(h, r);
	for (d in s) h.setProperty(d, s[d]);
}
function xp(n, i) {
	return i.max === i.min ? 0 : (n / (i.max - i.min)) * 100;
}
const Ql = {
		correct: (n, i) => {
			if (!i.target) return n;
			if (typeof n == "string")
				if (te.test(n)) n = parseFloat(n);
				else return n;
			const s = xp(n, i.target.x),
				r = xp(n, i.target.y);
			return `${s}% ${r}%`;
		},
	},
	U9 = {
		correct: (n, { treeScale: i, projectionDelta: s }) => {
			const r = n,
				u = on.parse(n);
			if (u.length > 5) return r;
			const h = on.createTransformer(n),
				d = typeof u[0] != "number" ? 1 : 0,
				g = s.x.scale * i.x,
				p = s.y.scale * i.y;
			(u[0 + d] /= g), (u[1 + d] /= p);
			const x = Ge(g, p, 0.5);
			return (
				typeof u[2 + d] == "number" && (u[2 + d] /= x),
				typeof u[3 + d] == "number" && (u[3 + d] /= x),
				h(u)
			);
		},
	},
	zf = {
		borderRadius: {
			...Ql,
			applyTo: [
				"borderTopLeftRadius",
				"borderTopRightRadius",
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
			],
		},
		borderTopLeftRadius: Ql,
		borderTopRightRadius: Ql,
		borderBottomLeftRadius: Ql,
		borderBottomRightRadius: Ql,
		boxShadow: U9,
	};
function P2(n, { layout: i, layoutId: s }) {
	return (
		Wi.has(n) ||
		n.startsWith("origin") ||
		((i || s !== void 0) && (!!zf[n] || n === "opacity"))
	);
}
function vd(n, i, s) {
	const r = n.style,
		u = i?.style,
		h = {};
	if (!r) return h;
	for (const d in r)
		(xt(r[d]) ||
			(u && xt(u[d])) ||
			P2(d, n) ||
			s?.getValue(d)?.liveStyle !== void 0) &&
			(h[d] = r[d]);
	return h;
}
function G9(n) {
	return window.getComputedStyle(n);
}
class Y9 extends Y2 {
	constructor() {
		super(...arguments), (this.type = "html"), (this.renderInstance = Q2);
	}
	readValueFromInstance(i, s) {
		if (Wi.has(s)) return this.projection?.isProjecting ? vf(s) : o6(i, s);
		{
			const r = G9(i),
				u = (e2(s) ? r.getPropertyValue(s) : r[s]) || 0;
			return typeof u == "string" ? u.trim() : u;
		}
	}
	measureInstanceViewportBox(i, { transformPagePoint: s }) {
		return K2(i, s);
	}
	build(i, s, r) {
		yd(i, s, r.transformTemplate);
	}
	scrapeMotionValuesFromProps(i, s, r) {
		return vd(i, s, r);
	}
}
const q9 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
	Z9 = { offset: "strokeDashoffset", array: "strokeDasharray" };
function X9(n, i, s = 1, r = 0, u = !0) {
	n.pathLength = 1;
	const h = u ? q9 : Z9;
	(n[h.offset] = `${-r}`), (n[h.array] = `${i} ${s}`);
}
const K9 = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];
function F2(
	n,
	{
		attrX: i,
		attrY: s,
		attrScale: r,
		pathLength: u,
		pathSpacing: h = 1,
		pathOffset: d = 0,
		...g
	},
	p,
	x,
	y,
) {
	if ((yd(n, g, x), p)) {
		n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
		return;
	}
	(n.attrs = n.style), (n.style = {});
	const { attrs: v, style: w } = n;
	v.transform && ((w.transform = v.transform), delete v.transform),
		(w.transform || v.transformOrigin) &&
			((w.transformOrigin = v.transformOrigin ?? "50% 50%"),
			delete v.transformOrigin),
		w.transform &&
			((w.transformBox = y?.transformBox ?? "fill-box"), delete v.transformBox);
	for (const A of K9) v[A] !== void 0 && ((w[A] = v[A]), delete v[A]);
	i !== void 0 && (v.x = i),
		s !== void 0 && (v.y = s),
		r !== void 0 && (v.scale = r),
		u !== void 0 && X9(v, u, h, d, !1);
}
const J2 = new Set([
		"baseFrequency",
		"diffuseConstant",
		"kernelMatrix",
		"kernelUnitLength",
		"keySplines",
		"keyTimes",
		"limitingConeAngle",
		"markerHeight",
		"markerWidth",
		"numOctaves",
		"targetX",
		"targetY",
		"surfaceScale",
		"specularConstant",
		"specularExponent",
		"stdDeviation",
		"tableValues",
		"viewBox",
		"gradientTransform",
		"pathLength",
		"startOffset",
		"textLength",
		"lengthAdjust",
	]),
	W2 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Q9(n, i, s, r) {
	Q2(n, i, void 0, r);
	for (const u in i.attrs) n.setAttribute(J2.has(u) ? u : cd(u), i.attrs[u]);
}
function $2(n, i, s) {
	const r = vd(n, i, s);
	for (const u in n)
		if (xt(n[u]) || xt(i[u])) {
			const h =
				Ji.indexOf(u) !== -1
					? "attr" + u.charAt(0).toUpperCase() + u.substring(1)
					: u;
			r[h] = n[u];
		}
	return r;
}
class P9 extends Y2 {
	constructor() {
		super(...arguments),
			(this.type = "svg"),
			(this.isSVGTag = !1),
			(this.measureInstanceViewportBox = at);
	}
	getBaseTargetFromProps(i, s) {
		return i[s];
	}
	readValueFromInstance(i, s) {
		if (Wi.has(s)) {
			const r = R2(s);
			return (r && r.default) || 0;
		}
		return (s = J2.has(s) ? s : cd(s)), i.getAttribute(s);
	}
	scrapeMotionValuesFromProps(i, s, r) {
		return $2(i, s, r);
	}
	build(i, s, r) {
		F2(i, s, this.isSVGTag, r.transformTemplate, r.style);
	}
	renderInstance(i, s, r, u) {
		Q9(i, s, r, u);
	}
	mount(i) {
		(this.isSVGTag = W2(i.tagName)), super.mount(i);
	}
}
const F9 = gd.length;
function I2(n) {
	if (!n) return;
	if (!n.isControllingVariants) {
		const s = n.parent ? I2(n.parent) || {} : {};
		return n.props.initial !== void 0 && (s.initial = n.props.initial), s;
	}
	const i = {};
	for (let s = 0; s < F9; s++) {
		const r = gd[s],
			u = n.props[r];
		(ls(u) || u === !1) && (i[r] = u);
	}
	return i;
}
function e5(n, i) {
	if (!Array.isArray(i)) return !1;
	const s = i.length;
	if (s !== n.length) return !1;
	for (let r = 0; r < s; r++) if (i[r] !== n[r]) return !1;
	return !0;
}
const J9 = [...pd].reverse(),
	W9 = pd.length;
function $9(n) {
	return (i) =>
		Promise.all(i.map(({ animation: s, options: r }) => P6(n, s, r)));
}
function I9(n) {
	let i = $9(n),
		s = yp(),
		r = !0;
	const u = (p) => (x, y) => {
		const v = Xi(n, y, p === "exit" ? n.presenceContext?.custom : void 0);
		if (v) {
			const { transition: w, transitionEnd: A, ...M } = v;
			x = { ...x, ...M, ...A };
		}
		return x;
	};
	function h(p) {
		i = p(n);
	}
	function d(p) {
		const { props: x } = n,
			y = I2(n.parent) || {},
			v = [],
			w = new Set();
		let A = {},
			M = 1 / 0;
		for (let N = 0; N < W9; N++) {
			const V = J9[N],
				q = s[V],
				k = x[V] !== void 0 ? x[V] : y[V],
				K = ls(k),
				X = V === p ? q.isActive : null;
			X === !1 && (M = N);
			let ie = k === y[V] && k !== x[V] && K;
			if (
				(ie && r && n.manuallyAnimateOnMount && (ie = !1),
				(q.protectedKeys = { ...A }),
				(!q.isActive && X === null) ||
					(!k && !q.prevProp) ||
					mo(k) ||
					typeof k == "boolean")
			)
				continue;
			if (V === "exit" && q.isActive && X !== !0) {
				q.prevResolvedValues && (A = { ...A, ...q.prevResolvedValues });
				continue;
			}
			const J = e8(q.prevProp, k);
			let H = J || (V === p && q.isActive && !ie && K) || (N > M && K),
				ne = !1;
			const Ce = Array.isArray(k) ? k : [k];
			let Be = Ce.reduce(u(V), {});
			X === !1 && (Be = {});
			const { prevResolvedValues: Oe = {} } = q,
				ut = { ...Oe, ...Be },
				et = (Z) => {
					(H = !0),
						w.has(Z) && ((ne = !0), w.delete(Z)),
						(q.needsAnimating[Z] = !0);
					const $ = n.getValue(Z);
					$ && ($.liveStyle = !1);
				};
			for (const Z in ut) {
				const $ = Be[Z],
					me = Oe[Z];
				if (A.hasOwnProperty(Z)) continue;
				let Q = !1;
				Tf($) && Tf(me) ? (Q = !e5($, me)) : (Q = $ !== me),
					Q
						? $ != null
							? et(Z)
							: w.add(Z)
						: $ !== void 0 && w.has(Z)
							? et(Z)
							: (q.protectedKeys[Z] = !0);
			}
			(q.prevProp = k),
				(q.prevResolvedValues = Be),
				q.isActive && (A = { ...A, ...Be }),
				r && n.blockInitialAnimation && (H = !1);
			const Me = ie && J;
			H &&
				(!Me || ne) &&
				v.push(
					...Ce.map((Z) => {
						const $ = { type: V };
						if (
							typeof Z == "string" &&
							r &&
							!Me &&
							n.manuallyAnimateOnMount &&
							n.parent
						) {
							const { parent: me } = n,
								Q = Xi(me, Z);
							if (me.enteringChildren && Q) {
								const { delayChildren: T } = Q.transition || {};
								$.delay = w2(me.enteringChildren, n, T);
							}
						}
						return { animation: Z, options: $ };
					}),
				);
		}
		if (w.size) {
			const N = {};
			if (typeof x.initial != "boolean") {
				const V = Xi(n, Array.isArray(x.initial) ? x.initial[0] : x.initial);
				V && V.transition && (N.transition = V.transition);
			}
			w.forEach((V) => {
				const q = n.getBaseTarget(V),
					k = n.getValue(V);
				k && (k.liveStyle = !0), (N[V] = q ?? null);
			}),
				v.push({ animation: N });
		}
		let z = !!v.length;
		return (
			r &&
				(x.initial === !1 || x.initial === x.animate) &&
				!n.manuallyAnimateOnMount &&
				(z = !1),
			(r = !1),
			z ? i(v) : Promise.resolve()
		);
	}
	function g(p, x) {
		if (s[p].isActive === x) return Promise.resolve();
		n.variantChildren?.forEach((v) => v.animationState?.setActive(p, x)),
			(s[p].isActive = x);
		const y = d(p);
		for (const v in s) s[v].protectedKeys = {};
		return y;
	}
	return {
		animateChanges: d,
		setActive: g,
		setAnimateFunction: h,
		getState: () => s,
		reset: () => {
			s = yp();
		},
	};
}
function e8(n, i) {
	return typeof i == "string" ? i !== n : Array.isArray(i) ? !e5(i, n) : !1;
}
function qa(n = !1) {
	return {
		isActive: n,
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {},
	};
}
function yp() {
	return {
		animate: qa(!0),
		whileInView: qa(),
		whileHover: qa(),
		whileTap: qa(),
		whileDrag: qa(),
		whileFocus: qa(),
		exit: qa(),
	};
}
function vp(n, i) {
	(n.min = i.min), (n.max = i.max);
}
function nn(n, i) {
	vp(n.x, i.x), vp(n.y, i.y);
}
function bp(n, i) {
	(n.translate = i.translate),
		(n.scale = i.scale),
		(n.originPoint = i.originPoint),
		(n.origin = i.origin);
}
const t5 = 1e-4,
	t8 = 1 - t5,
	n8 = 1 + t5,
	n5 = 0.01,
	a8 = 0 - n5,
	i8 = 0 + n5;
function bt(n) {
	return n.max - n.min;
}
function l8(n, i, s) {
	return Math.abs(n - i) <= s;
}
function wp(n, i, s, r = 0.5) {
	(n.origin = r),
		(n.originPoint = Ge(i.min, i.max, n.origin)),
		(n.scale = bt(s) / bt(i)),
		(n.translate = Ge(s.min, s.max, n.origin) - n.originPoint),
		((n.scale >= t8 && n.scale <= n8) || isNaN(n.scale)) && (n.scale = 1),
		((n.translate >= a8 && n.translate <= i8) || isNaN(n.translate)) &&
			(n.translate = 0);
}
function Il(n, i, s, r) {
	wp(n.x, i.x, s.x, r ? r.originX : void 0),
		wp(n.y, i.y, s.y, r ? r.originY : void 0);
}
function Sp(n, i, s) {
	(n.min = s.min + i.min), (n.max = n.min + bt(i));
}
function s8(n, i, s) {
	Sp(n.x, i.x, s.x), Sp(n.y, i.y, s.y);
}
function Cp(n, i, s) {
	(n.min = i.min - s.min), (n.max = n.min + bt(i));
}
function so(n, i, s) {
	Cp(n.x, i.x, s.x), Cp(n.y, i.y, s.y);
}
function jp(n, i, s, r, u) {
	return (
		(n -= i), (n = lo(n, 1 / s, r)), u !== void 0 && (n = lo(n, 1 / u, r)), n
	);
}
function r8(n, i = 0, s = 1, r = 0.5, u, h = n, d = n) {
	if (
		(yn.test(i) &&
			((i = parseFloat(i)), (i = Ge(d.min, d.max, i / 100) - d.min)),
		typeof i != "number")
	)
		return;
	let g = Ge(h.min, h.max, r);
	n === h && (g -= i),
		(n.min = jp(n.min, i, s, g, u)),
		(n.max = jp(n.max, i, s, g, u));
}
function Tp(n, i, [s, r, u], h, d) {
	r8(n, i[s], i[r], i[u], i.scale, h, d);
}
const o8 = ["x", "scaleX", "originX"],
	u8 = ["y", "scaleY", "originY"];
function Ap(n, i, s, r) {
	Tp(n.x, i, o8, s ? s.x : void 0, r ? r.x : void 0),
		Tp(n.y, i, u8, s ? s.y : void 0, r ? r.y : void 0);
}
function Ep(n) {
	return n.translate === 0 && n.scale === 1;
}
function a5(n) {
	return Ep(n.x) && Ep(n.y);
}
function Mp(n, i) {
	return n.min === i.min && n.max === i.max;
}
function c8(n, i) {
	return Mp(n.x, i.x) && Mp(n.y, i.y);
}
function Np(n, i) {
	return (
		Math.round(n.min) === Math.round(i.min) &&
		Math.round(n.max) === Math.round(i.max)
	);
}
function i5(n, i) {
	return Np(n.x, i.x) && Np(n.y, i.y);
}
function Rp(n) {
	return bt(n.x) / bt(n.y);
}
function Dp(n, i) {
	return (
		n.translate === i.translate &&
		n.scale === i.scale &&
		n.originPoint === i.originPoint
	);
}
function gn(n) {
	return [n("x"), n("y")];
}
function f8(n, i, s) {
	let r = "";
	const u = n.x.translate / i.x,
		h = n.y.translate / i.y,
		d = s?.z || 0;
	if (
		((u || h || d) && (r = `translate3d(${u}px, ${h}px, ${d}px) `),
		(i.x !== 1 || i.y !== 1) && (r += `scale(${1 / i.x}, ${1 / i.y}) `),
		s)
	) {
		const {
			transformPerspective: x,
			rotate: y,
			rotateX: v,
			rotateY: w,
			skewX: A,
			skewY: M,
		} = s;
		x && (r = `perspective(${x}px) ${r}`),
			y && (r += `rotate(${y}deg) `),
			v && (r += `rotateX(${v}deg) `),
			w && (r += `rotateY(${w}deg) `),
			A && (r += `skewX(${A}deg) `),
			M && (r += `skewY(${M}deg) `);
	}
	const g = n.x.scale * i.x,
		p = n.y.scale * i.y;
	return (g !== 1 || p !== 1) && (r += `scale(${g}, ${p})`), r || "none";
}
const l5 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
	d8 = l5.length,
	Lp = (n) => (typeof n == "string" ? parseFloat(n) : n),
	zp = (n) => typeof n == "number" || te.test(n);
function h8(n, i, s, r, u, h) {
	u
		? ((n.opacity = Ge(0, s.opacity ?? 1, m8(r))),
			(n.opacityExit = Ge(i.opacity ?? 1, 0, p8(r))))
		: h && (n.opacity = Ge(i.opacity ?? 1, s.opacity ?? 1, r));
	for (let d = 0; d < d8; d++) {
		const g = `border${l5[d]}Radius`;
		let p = Op(i, g),
			x = Op(s, g);
		if (p === void 0 && x === void 0) continue;
		p || (p = 0),
			x || (x = 0),
			p === 0 || x === 0 || zp(p) === zp(x)
				? ((n[g] = Math.max(Ge(Lp(p), Lp(x), r), 0)),
					(yn.test(x) || yn.test(p)) && (n[g] += "%"))
				: (n[g] = x);
	}
	(i.rotate || s.rotate) && (n.rotate = Ge(i.rotate || 0, s.rotate || 0, r));
}
function Op(n, i) {
	return n[i] !== void 0 ? n[i] : n.borderRadius;
}
const m8 = s5(0, 0.5, Pg),
	p8 = s5(0.5, 0.95, Mt);
function s5(n, i, s) {
	return (r) => (r < n ? 0 : r > i ? 1 : s(Ki(n, i, r)));
}
function g8(n, i, s) {
	const r = xt(n) ? n : sn(n);
	return r.start(od("", r, i, s)), r.animation;
}
function ss(n, i, s, r = { passive: !0 }) {
	return n.addEventListener(i, s, r), () => n.removeEventListener(i, s);
}
const x8 = (n, i) => n.depth - i.depth;
class y8 {
	constructor() {
		(this.children = []), (this.isDirty = !1);
	}
	add(i) {
		Kf(this.children, i), (this.isDirty = !0);
	}
	remove(i) {
		$r(this.children, i), (this.isDirty = !0);
	}
	forEach(i) {
		this.isDirty && this.children.sort(x8),
			(this.isDirty = !1),
			this.children.forEach(i);
	}
}
function v8(n, i) {
	const s = vt.now(),
		r = ({ timestamp: u }) => {
			const h = u - s;
			h >= i && (Wt(r), n(h - i));
		};
	return Ae.setup(r, !0), () => Wt(r);
}
function Pr(n) {
	return xt(n) ? n.get() : n;
}
class b8 {
	constructor() {
		this.members = [];
	}
	add(i) {
		Kf(this.members, i);
		for (let s = this.members.length - 1; s >= 0; s--) {
			const r = this.members[s];
			if (r === i || r === this.lead || r === this.prevLead) continue;
			const u = r.instance;
			u &&
				u.isConnected === !1 &&
				r.isPresent !== !1 &&
				!r.snapshot &&
				$r(this.members, r);
		}
		i.scheduleRender();
	}
	remove(i) {
		if (
			($r(this.members, i),
			i === this.prevLead && (this.prevLead = void 0),
			i === this.lead)
		) {
			const s = this.members[this.members.length - 1];
			s && this.promote(s);
		}
	}
	relegate(i) {
		const s = this.members.findIndex((u) => i === u);
		if (s === 0) return !1;
		let r;
		for (let u = s; u >= 0; u--) {
			const h = this.members[u],
				d = h.instance;
			if (h.isPresent !== !1 && (!d || d.isConnected !== !1)) {
				r = h;
				break;
			}
		}
		return r ? (this.promote(r), !0) : !1;
	}
	promote(i, s) {
		const r = this.lead;
		if (i !== r && ((this.prevLead = r), (this.lead = i), i.show(), r)) {
			r.instance && r.scheduleRender(), i.scheduleRender();
			const u = r.options.layoutDependency,
				h = i.options.layoutDependency;
			if (!(u !== void 0 && h !== void 0 && u === h)) {
				const p = r.instance;
				(p && p.isConnected === !1 && !r.snapshot) ||
					((i.resumeFrom = r),
					s && (i.resumeFrom.preserveOpacity = !0),
					r.snapshot &&
						((i.snapshot = r.snapshot),
						(i.snapshot.latestValues = r.animationValues || r.latestValues)),
					i.root && i.root.isUpdating && (i.isLayoutDirty = !0));
			}
			const { crossfade: g } = i.options;
			g === !1 && r.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((i) => {
			const { options: s, resumingFrom: r } = i;
			s.onExitComplete && s.onExitComplete(),
				r && r.options.onExitComplete && r.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((i) => {
			i.instance && i.scheduleRender(!1);
		});
	}
	removeLeadSnapshot() {
		this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
	}
}
const Fr = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
	$c = ["", "X", "Y", "Z"],
	w8 = 1e3;
let S8 = 0;
function Ic(n, i, s, r) {
	const { latestValues: u } = i;
	u[n] && ((s[n] = u[n]), i.setStaticValue(n, 0), r && (r[n] = 0));
}
function r5(n) {
	if (((n.hasCheckedOptimisedAppear = !0), n.root === n)) return;
	const { visualElement: i } = n.options;
	if (!i) return;
	const s = A2(i);
	if (window.MotionHasOptimisedAnimation(s, "transform")) {
		const { layout: u, layoutId: h } = n.options;
		window.MotionCancelOptimisedAnimation(s, "transform", Ae, !(u || h));
	}
	const { parent: r } = n;
	r && !r.hasCheckedOptimisedAppear && r5(r);
}
function o5({
	attachResizeListener: n,
	defaultParent: i,
	measureScroll: s,
	checkIsScrollRoot: r,
	resetTransform: u,
}) {
	return class {
		constructor(d = {}, g = i?.()) {
			(this.id = S8++),
				(this.animationId = 0),
				(this.animationCommitId = 0),
				(this.children = new Set()),
				(this.options = {}),
				(this.isTreeAnimating = !1),
				(this.isAnimationBlocked = !1),
				(this.isLayoutDirty = !1),
				(this.isProjectionDirty = !1),
				(this.isSharedProjectionDirty = !1),
				(this.isTransformDirty = !1),
				(this.updateManuallyBlocked = !1),
				(this.updateBlockedByResize = !1),
				(this.isUpdating = !1),
				(this.isSVG = !1),
				(this.needsReset = !1),
				(this.shouldResetTransform = !1),
				(this.hasCheckedOptimisedAppear = !1),
				(this.treeScale = { x: 1, y: 1 }),
				(this.eventHandlers = new Map()),
				(this.hasTreeAnimated = !1),
				(this.layoutVersion = 0),
				(this.updateScheduled = !1),
				(this.scheduleUpdate = () => this.update()),
				(this.projectionUpdateScheduled = !1),
				(this.checkUpdateFailed = () => {
					this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
				}),
				(this.updateProjection = () => {
					(this.projectionUpdateScheduled = !1),
						this.nodes.forEach(T8),
						this.nodes.forEach(N8),
						this.nodes.forEach(R8),
						this.nodes.forEach(A8);
				}),
				(this.resolvedRelativeTargetAt = 0),
				(this.linkedParentVersion = 0),
				(this.hasProjected = !1),
				(this.isVisible = !0),
				(this.animationProgress = 0),
				(this.sharedNodes = new Map()),
				(this.latestValues = d),
				(this.root = g ? g.root || g : this),
				(this.path = g ? [...g.path, g] : []),
				(this.parent = g),
				(this.depth = g ? g.depth + 1 : 0);
			for (let p = 0; p < this.path.length; p++)
				this.path[p].shouldResetTransform = !0;
			this.root === this && (this.nodes = new y8());
		}
		addEventListener(d, g) {
			return (
				this.eventHandlers.has(d) || this.eventHandlers.set(d, new Qf()),
				this.eventHandlers.get(d).add(g)
			);
		}
		notifyListeners(d, ...g) {
			const p = this.eventHandlers.get(d);
			p && p.notify(...g);
		}
		hasListeners(d) {
			return this.eventHandlers.has(d);
		}
		mount(d) {
			if (this.instance) return;
			(this.isSVG = md(d) && !j9(d)), (this.instance = d);
			const { layoutId: g, layout: p, visualElement: x } = this.options;
			if (
				(x && !x.current && x.mount(d),
				this.root.nodes.add(this),
				this.parent && this.parent.children.add(this),
				this.root.hasTreeAnimated && (p || g) && (this.isLayoutDirty = !0),
				n)
			) {
				let y,
					v = 0;
				const w = () => (this.root.updateBlockedByResize = !1);
				Ae.read(() => {
					v = window.innerWidth;
				}),
					n(d, () => {
						const A = window.innerWidth;
						A !== v &&
							((v = A),
							(this.root.updateBlockedByResize = !0),
							y && y(),
							(y = v8(w, 250)),
							Fr.hasAnimatedSinceResize &&
								((Fr.hasAnimatedSinceResize = !1), this.nodes.forEach(_p)));
					});
			}
			g && this.root.registerSharedNode(g, this),
				this.options.animate !== !1 &&
					x &&
					(g || p) &&
					this.addEventListener(
						"didUpdate",
						({
							delta: y,
							hasLayoutChanged: v,
							hasRelativeLayoutChanged: w,
							layout: A,
						}) => {
							if (this.isTreeAnimationBlocked()) {
								(this.target = void 0), (this.relativeTarget = void 0);
								return;
							}
							const M =
									this.options.transition || x.getDefaultTransition() || V8,
								{ onLayoutAnimationStart: z, onLayoutAnimationComplete: N } =
									x.getProps(),
								V = !this.targetLayout || !i5(this.targetLayout, A),
								q = !v && w;
							if (
								this.options.layoutRoot ||
								this.resumeFrom ||
								q ||
								(v && (V || !this.currentAnimation))
							) {
								this.resumeFrom &&
									((this.resumingFrom = this.resumeFrom),
									(this.resumingFrom.resumingFrom = void 0));
								const k = { ...rd(M, "layout"), onPlay: z, onComplete: N };
								(x.shouldReduceMotion || this.options.layoutRoot) &&
									((k.delay = 0), (k.type = !1)),
									this.startAnimation(k),
									this.setAnimationOrigin(y, q);
							} else
								v || _p(this),
									this.isLead() &&
										this.options.onExitComplete &&
										this.options.onExitComplete();
							this.targetLayout = A;
						},
					);
		}
		unmount() {
			this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
			const d = this.getStack();
			d && d.remove(this),
				this.parent && this.parent.children.delete(this),
				(this.instance = void 0),
				this.eventHandlers.clear(),
				Wt(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = !0;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = !1;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return (
				this.isAnimationBlocked ||
				(this.parent && this.parent.isTreeAnimationBlocked()) ||
				!1
			);
		}
		startUpdate() {
			this.isUpdateBlocked() ||
				((this.isUpdating = !0),
				this.nodes && this.nodes.forEach(D8),
				this.animationId++);
		}
		getTransformTemplate() {
			const { visualElement: d } = this.options;
			return d && d.getProps().transformTemplate;
		}
		willUpdate(d = !0) {
			if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			if (
				(window.MotionCancelOptimisedAnimation &&
					!this.hasCheckedOptimisedAppear &&
					r5(this),
				!this.root.isUpdating && this.root.startUpdate(),
				this.isLayoutDirty)
			)
				return;
			this.isLayoutDirty = !0;
			for (let y = 0; y < this.path.length; y++) {
				const v = this.path[y];
				(v.shouldResetTransform = !0),
					v.updateScroll("snapshot"),
					v.options.layoutRoot && v.willUpdate(!1);
			}
			const { layoutId: g, layout: p } = this.options;
			if (g === void 0 && !p) return;
			const x = this.getTransformTemplate();
			(this.prevTransformTemplateValue = x ? x(this.latestValues, "") : void 0),
				this.updateSnapshot(),
				d && this.notifyListeners("willUpdate");
		}
		update() {
			if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
				this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Vp);
				return;
			}
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(Bp);
				return;
			}
			(this.animationCommitId = this.animationId),
				this.isUpdating
					? ((this.isUpdating = !1),
						this.nodes.forEach(M8),
						this.nodes.forEach(C8),
						this.nodes.forEach(j8))
					: this.nodes.forEach(Bp),
				this.clearAllSnapshots();
			const g = vt.now();
			(ot.delta = un(0, 1e3 / 60, g - ot.timestamp)),
				(ot.timestamp = g),
				(ot.isProcessing = !0),
				Zc.update.process(ot),
				Zc.preRender.process(ot),
				Zc.render.process(ot),
				(ot.isProcessing = !1);
		}
		didUpdate() {
			this.updateScheduled ||
				((this.updateScheduled = !0), dd.read(this.scheduleUpdate));
		}
		clearAllSnapshots() {
			this.nodes.forEach(E8), this.sharedNodes.forEach(L8);
		}
		scheduleUpdateProjection() {
			this.projectionUpdateScheduled ||
				((this.projectionUpdateScheduled = !0),
				Ae.preRender(this.updateProjection, !1, !0));
		}
		scheduleCheckAfterUnmount() {
			Ae.postRender(() => {
				this.isLayoutDirty
					? this.root.didUpdate()
					: this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			this.snapshot ||
				!this.instance ||
				((this.snapshot = this.measure()),
				this.snapshot &&
					!bt(this.snapshot.measuredBox.x) &&
					!bt(this.snapshot.measuredBox.y) &&
					(this.snapshot = void 0));
		}
		updateLayout() {
			if (
				!this.instance ||
				(this.updateScroll(),
				!(this.options.alwaysMeasureLayout && this.isLead()) &&
					!this.isLayoutDirty)
			)
				return;
			if (this.resumeFrom && !this.resumeFrom.instance)
				for (let p = 0; p < this.path.length; p++) this.path[p].updateScroll();
			const d = this.layout;
			(this.layout = this.measure(!1)),
				this.layoutVersion++,
				(this.layoutCorrected = at()),
				(this.isLayoutDirty = !1),
				(this.projectionDelta = void 0),
				this.notifyListeners("measure", this.layout.layoutBox);
			const { visualElement: g } = this.options;
			g &&
				g.notify(
					"LayoutMeasure",
					this.layout.layoutBox,
					d ? d.layoutBox : void 0,
				);
		}
		updateScroll(d = "measure") {
			let g = !!(this.options.layoutScroll && this.instance);
			if (
				(this.scroll &&
					this.scroll.animationId === this.root.animationId &&
					this.scroll.phase === d &&
					(g = !1),
				g && this.instance)
			) {
				const p = r(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase: d,
					isRoot: p,
					offset: s(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : p,
				};
			}
		}
		resetTransform() {
			if (!u) return;
			const d =
					this.isLayoutDirty ||
					this.shouldResetTransform ||
					this.options.alwaysMeasureLayout,
				g = this.projectionDelta && !a5(this.projectionDelta),
				p = this.getTransformTemplate(),
				x = p ? p(this.latestValues, "") : void 0,
				y = x !== this.prevTransformTemplateValue;
			d &&
				this.instance &&
				(g || Ka(this.latestValues) || y) &&
				(u(this.instance, x),
				(this.shouldResetTransform = !1),
				this.scheduleRender());
		}
		measure(d = !0) {
			const g = this.measurePageBox();
			let p = this.removeElementScroll(g);
			return (
				d && (p = this.removeTransform(p)),
				B8(p),
				{
					animationId: this.root.animationId,
					measuredBox: g,
					layoutBox: p,
					latestValues: {},
					source: this.id,
				}
			);
		}
		measurePageBox() {
			const { visualElement: d } = this.options;
			if (!d) return at();
			const g = d.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(_8))) {
				const { scroll: x } = this.root;
				x && (Yi(g.x, x.offset.x), Yi(g.y, x.offset.y));
			}
			return g;
		}
		removeElementScroll(d) {
			const g = at();
			if ((nn(g, d), this.scroll?.wasRoot)) return g;
			for (let p = 0; p < this.path.length; p++) {
				const x = this.path[p],
					{ scroll: y, options: v } = x;
				x !== this.root &&
					y &&
					v.layoutScroll &&
					(y.wasRoot && nn(g, d), Yi(g.x, y.offset.x), Yi(g.y, y.offset.y));
			}
			return g;
		}
		applyTransform(d, g = !1) {
			const p = at();
			nn(p, d);
			for (let x = 0; x < this.path.length; x++) {
				const y = this.path[x];
				!g &&
					y.options.layoutScroll &&
					y.scroll &&
					y !== y.root &&
					qi(p, { x: -y.scroll.offset.x, y: -y.scroll.offset.y }),
					Ka(y.latestValues) && qi(p, y.latestValues);
			}
			return Ka(this.latestValues) && qi(p, this.latestValues), p;
		}
		removeTransform(d) {
			const g = at();
			nn(g, d);
			for (let p = 0; p < this.path.length; p++) {
				const x = this.path[p];
				if (!x.instance || !Ka(x.latestValues)) continue;
				Df(x.latestValues) && x.updateSnapshot();
				const y = at(),
					v = x.measurePageBox();
				nn(y, v),
					Ap(g, x.latestValues, x.snapshot ? x.snapshot.layoutBox : void 0, y);
			}
			return Ka(this.latestValues) && Ap(g, this.latestValues), g;
		}
		setTargetDelta(d) {
			(this.targetDelta = d),
				this.root.scheduleUpdateProjection(),
				(this.isProjectionDirty = !0);
		}
		setOptions(d) {
			this.options = {
				...this.options,
				...d,
				crossfade: d.crossfade !== void 0 ? d.crossfade : !0,
			};
		}
		clearMeasurements() {
			(this.scroll = void 0),
				(this.layout = void 0),
				(this.snapshot = void 0),
				(this.prevTransformTemplateValue = void 0),
				(this.targetDelta = void 0),
				(this.target = void 0),
				(this.isLayoutDirty = !1);
		}
		forceRelativeParentToResolveTarget() {
			this.relativeParent &&
				this.relativeParent.resolvedRelativeTargetAt !== ot.timestamp &&
				this.relativeParent.resolveTargetDelta(!0);
		}
		resolveTargetDelta(d = !1) {
			const g = this.getLead();
			this.isProjectionDirty || (this.isProjectionDirty = g.isProjectionDirty),
				this.isTransformDirty || (this.isTransformDirty = g.isTransformDirty),
				this.isSharedProjectionDirty ||
					(this.isSharedProjectionDirty = g.isSharedProjectionDirty);
			const p = !!this.resumingFrom || this !== g;
			if (
				!(
					d ||
					(p && this.isSharedProjectionDirty) ||
					this.isProjectionDirty ||
					this.parent?.isProjectionDirty ||
					this.attemptToResolveRelativeTarget ||
					this.root.updateBlockedByResize
				)
			)
				return;
			const { layout: y, layoutId: v } = this.options;
			if (!this.layout || !(y || v)) return;
			this.resolvedRelativeTargetAt = ot.timestamp;
			const w = this.getClosestProjectingParent();
			w &&
				this.linkedParentVersion !== w.layoutVersion &&
				!w.options.layoutRoot &&
				this.removeRelativeTarget(),
				!this.targetDelta &&
					!this.relativeTarget &&
					(w && w.layout
						? this.createRelativeTarget(
								w,
								this.layout.layoutBox,
								w.layout.layoutBox,
							)
						: this.removeRelativeTarget()),
				!(!this.relativeTarget && !this.targetDelta) &&
					(this.target ||
						((this.target = at()), (this.targetWithTransforms = at())),
					this.relativeTarget &&
					this.relativeTargetOrigin &&
					this.relativeParent &&
					this.relativeParent.target
						? (this.forceRelativeParentToResolveTarget(),
							s8(this.target, this.relativeTarget, this.relativeParent.target))
						: this.targetDelta
							? (this.resumingFrom
									? (this.target = this.applyTransform(this.layout.layoutBox))
									: nn(this.target, this.layout.layoutBox),
								X2(this.target, this.targetDelta))
							: nn(this.target, this.layout.layoutBox),
					this.attemptToResolveRelativeTarget &&
						((this.attemptToResolveRelativeTarget = !1),
						w &&
						!!w.resumingFrom == !!this.resumingFrom &&
						!w.options.layoutScroll &&
						w.target &&
						this.animationProgress !== 1
							? this.createRelativeTarget(w, this.target, w.target)
							: (this.relativeParent = this.relativeTarget = void 0)));
		}
		getClosestProjectingParent() {
			if (
				!(
					!this.parent ||
					Df(this.parent.latestValues) ||
					Z2(this.parent.latestValues)
				)
			)
				return this.parent.isProjecting()
					? this.parent
					: this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return !!(
				(this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
				this.layout
			);
		}
		createRelativeTarget(d, g, p) {
			(this.relativeParent = d),
				(this.linkedParentVersion = d.layoutVersion),
				this.forceRelativeParentToResolveTarget(),
				(this.relativeTarget = at()),
				(this.relativeTargetOrigin = at()),
				so(this.relativeTargetOrigin, g, p),
				nn(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			const d = this.getLead(),
				g = !!this.resumingFrom || this !== d;
			let p = !0;
			if (
				((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1),
				g &&
					(this.isSharedProjectionDirty || this.isTransformDirty) &&
					(p = !1),
				this.resolvedRelativeTargetAt === ot.timestamp && (p = !1),
				p)
			)
				return;
			const { layout: x, layoutId: y } = this.options;
			if (
				((this.isTreeAnimating = !!(
					(this.parent && this.parent.isTreeAnimating) ||
					this.currentAnimation ||
					this.pendingAnimation
				)),
				this.isTreeAnimating ||
					(this.targetDelta = this.relativeTarget = void 0),
				!this.layout || !(x || y))
			)
				return;
			nn(this.layoutCorrected, this.layout.layoutBox);
			const v = this.treeScale.x,
				w = this.treeScale.y;
			V9(this.layoutCorrected, this.treeScale, this.path, g),
				d.layout &&
					!d.target &&
					(this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
					((d.target = d.layout.layoutBox), (d.targetWithTransforms = at()));
			const { target: A } = d;
			if (!A) {
				this.prevProjectionDelta &&
					(this.createProjectionDeltas(), this.scheduleRender());
				return;
			}
			!this.projectionDelta || !this.prevProjectionDelta
				? this.createProjectionDeltas()
				: (bp(this.prevProjectionDelta.x, this.projectionDelta.x),
					bp(this.prevProjectionDelta.y, this.projectionDelta.y)),
				Il(this.projectionDelta, this.layoutCorrected, A, this.latestValues),
				(this.treeScale.x !== v ||
					this.treeScale.y !== w ||
					!Dp(this.projectionDelta.x, this.prevProjectionDelta.x) ||
					!Dp(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
					((this.hasProjected = !0),
					this.scheduleRender(),
					this.notifyListeners("projectionUpdate", A));
		}
		hide() {
			this.isVisible = !1;
		}
		show() {
			this.isVisible = !0;
		}
		scheduleRender(d = !0) {
			if ((this.options.visualElement?.scheduleRender(), d)) {
				const g = this.getStack();
				g && g.scheduleRender();
			}
			this.resumingFrom &&
				!this.resumingFrom.instance &&
				(this.resumingFrom = void 0);
		}
		createProjectionDeltas() {
			(this.prevProjectionDelta = Gi()),
				(this.projectionDelta = Gi()),
				(this.projectionDeltaWithTransform = Gi());
		}
		setAnimationOrigin(d, g = !1) {
			const p = this.snapshot,
				x = p ? p.latestValues : {},
				y = { ...this.latestValues },
				v = Gi();
			(!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
				(this.relativeTarget = this.relativeTargetOrigin = void 0),
				(this.attemptToResolveRelativeTarget = !g);
			const w = at(),
				A = p ? p.source : void 0,
				M = this.layout ? this.layout.source : void 0,
				z = A !== M,
				N = this.getStack(),
				V = !N || N.members.length <= 1,
				q = !!(z && !V && this.options.crossfade === !0 && !this.path.some(O8));
			this.animationProgress = 0;
			let k;
			(this.mixTargetDelta = (K) => {
				const X = K / 1e3;
				kp(v.x, d.x, X),
					kp(v.y, d.y, X),
					this.setTargetDelta(v),
					this.relativeTarget &&
						this.relativeTargetOrigin &&
						this.layout &&
						this.relativeParent &&
						this.relativeParent.layout &&
						(so(w, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
						z8(this.relativeTarget, this.relativeTargetOrigin, w, X),
						k && c8(this.relativeTarget, k) && (this.isProjectionDirty = !1),
						k || (k = at()),
						nn(k, this.relativeTarget)),
					z &&
						((this.animationValues = y), h8(y, x, this.latestValues, X, q, V)),
					this.root.scheduleUpdateProjection(),
					this.scheduleRender(),
					(this.animationProgress = X);
			}),
				this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(d) {
			this.notifyListeners("animationStart"),
				this.currentAnimation?.stop(),
				this.resumingFrom?.currentAnimation?.stop(),
				this.pendingAnimation &&
					(Wt(this.pendingAnimation), (this.pendingAnimation = void 0)),
				(this.pendingAnimation = Ae.update(() => {
					(Fr.hasAnimatedSinceResize = !0),
						this.motionValue || (this.motionValue = sn(0)),
						this.motionValue.jump(0, !1),
						(this.currentAnimation = g8(this.motionValue, [0, 1e3], {
							...d,
							velocity: 0,
							isSync: !0,
							onUpdate: (g) => {
								this.mixTargetDelta(g), d.onUpdate && d.onUpdate(g);
							},
							onStop: () => {},
							onComplete: () => {
								d.onComplete && d.onComplete(), this.completeAnimation();
							},
						})),
						this.resumingFrom &&
							(this.resumingFrom.currentAnimation = this.currentAnimation),
						(this.pendingAnimation = void 0);
				}));
		}
		completeAnimation() {
			this.resumingFrom &&
				((this.resumingFrom.currentAnimation = void 0),
				(this.resumingFrom.preserveOpacity = void 0));
			const d = this.getStack();
			d && d.exitAnimationComplete(),
				(this.resumingFrom =
					this.currentAnimation =
					this.animationValues =
						void 0),
				this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			this.currentAnimation &&
				(this.mixTargetDelta && this.mixTargetDelta(w8),
				this.currentAnimation.stop()),
				this.completeAnimation();
		}
		applyTransformsToTarget() {
			const d = this.getLead();
			let {
				targetWithTransforms: g,
				target: p,
				layout: x,
				latestValues: y,
			} = d;
			if (!(!g || !p || !x)) {
				if (
					this !== d &&
					this.layout &&
					x &&
					u5(this.options.animationType, this.layout.layoutBox, x.layoutBox)
				) {
					p = this.target || at();
					const v = bt(this.layout.layoutBox.x);
					(p.x.min = d.target.x.min), (p.x.max = p.x.min + v);
					const w = bt(this.layout.layoutBox.y);
					(p.y.min = d.target.y.min), (p.y.max = p.y.min + w);
				}
				nn(g, p),
					qi(g, y),
					Il(this.projectionDeltaWithTransform, this.layoutCorrected, g, y);
			}
		}
		registerSharedNode(d, g) {
			this.sharedNodes.has(d) || this.sharedNodes.set(d, new b8()),
				this.sharedNodes.get(d).add(g);
			const x = g.options.initialPromotionConfig;
			g.promote({
				transition: x ? x.transition : void 0,
				preserveFollowOpacity:
					x && x.shouldPreserveFollowOpacity
						? x.shouldPreserveFollowOpacity(g)
						: void 0,
			});
		}
		isLead() {
			const d = this.getStack();
			return d ? d.lead === this : !0;
		}
		getLead() {
			const { layoutId: d } = this.options;
			return d ? this.getStack()?.lead || this : this;
		}
		getPrevLead() {
			const { layoutId: d } = this.options;
			return d ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			const { layoutId: d } = this.options;
			if (d) return this.root.sharedNodes.get(d);
		}
		promote({ needsReset: d, transition: g, preserveFollowOpacity: p } = {}) {
			const x = this.getStack();
			x && x.promote(this, p),
				d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
				g && this.setOptions({ transition: g });
		}
		relegate() {
			const d = this.getStack();
			return d ? d.relegate(this) : !1;
		}
		resetSkewAndRotation() {
			const { visualElement: d } = this.options;
			if (!d) return;
			let g = !1;
			const { latestValues: p } = d;
			if (
				((p.z ||
					p.rotate ||
					p.rotateX ||
					p.rotateY ||
					p.rotateZ ||
					p.skewX ||
					p.skewY) &&
					(g = !0),
				!g)
			)
				return;
			const x = {};
			p.z && Ic("z", d, x, this.animationValues);
			for (let y = 0; y < $c.length; y++)
				Ic(`rotate${$c[y]}`, d, x, this.animationValues),
					Ic(`skew${$c[y]}`, d, x, this.animationValues);
			d.render();
			for (const y in x)
				d.setStaticValue(y, x[y]),
					this.animationValues && (this.animationValues[y] = x[y]);
			d.scheduleRender();
		}
		applyProjectionStyles(d, g) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				d.visibility = "hidden";
				return;
			}
			const p = this.getTransformTemplate();
			if (this.needsReset) {
				(this.needsReset = !1),
					(d.visibility = ""),
					(d.opacity = ""),
					(d.pointerEvents = Pr(g?.pointerEvents) || ""),
					(d.transform = p ? p(this.latestValues, "") : "none");
				return;
			}
			const x = this.getLead();
			if (!this.projectionDelta || !this.layout || !x.target) {
				this.options.layoutId &&
					((d.opacity =
						this.latestValues.opacity !== void 0
							? this.latestValues.opacity
							: 1),
					(d.pointerEvents = Pr(g?.pointerEvents) || "")),
					this.hasProjected &&
						!Ka(this.latestValues) &&
						((d.transform = p ? p({}, "") : "none"), (this.hasProjected = !1));
				return;
			}
			d.visibility = "";
			const y = x.animationValues || x.latestValues;
			this.applyTransformsToTarget();
			let v = f8(this.projectionDeltaWithTransform, this.treeScale, y);
			p && (v = p(y, v)), (d.transform = v);
			const { x: w, y: A } = this.projectionDelta;
			(d.transformOrigin = `${w.origin * 100}% ${A.origin * 100}% 0`),
				x.animationValues
					? (d.opacity =
							x === this
								? (y.opacity ?? this.latestValues.opacity ?? 1)
								: this.preserveOpacity
									? this.latestValues.opacity
									: y.opacityExit)
					: (d.opacity =
							x === this
								? y.opacity !== void 0
									? y.opacity
									: ""
								: y.opacityExit !== void 0
									? y.opacityExit
									: 0);
			for (const M in zf) {
				if (y[M] === void 0) continue;
				const { correct: z, applyTo: N, isCSSVariable: V } = zf[M],
					q = v === "none" ? y[M] : z(y[M], x);
				if (N) {
					const k = N.length;
					for (let K = 0; K < k; K++) d[N[K]] = q;
				} else
					V ? (this.options.visualElement.renderState.vars[M] = q) : (d[M] = q);
			}
			this.options.layoutId &&
				(d.pointerEvents = x === this ? Pr(g?.pointerEvents) || "" : "none");
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((d) => d.currentAnimation?.stop()),
				this.root.nodes.forEach(Vp),
				this.root.sharedNodes.clear();
		}
	};
}
function C8(n) {
	n.updateLayout();
}
function j8(n) {
	const i = n.resumeFrom?.snapshot || n.snapshot;
	if (n.isLead() && n.layout && i && n.hasListeners("didUpdate")) {
		const { layoutBox: s, measuredBox: r } = n.layout,
			{ animationType: u } = n.options,
			h = i.source !== n.layout.source;
		u === "size"
			? gn((y) => {
					const v = h ? i.measuredBox[y] : i.layoutBox[y],
						w = bt(v);
					(v.min = s[y].min), (v.max = v.min + w);
				})
			: u5(u, i.layoutBox, s) &&
				gn((y) => {
					const v = h ? i.measuredBox[y] : i.layoutBox[y],
						w = bt(s[y]);
					(v.max = v.min + w),
						n.relativeTarget &&
							!n.currentAnimation &&
							((n.isProjectionDirty = !0),
							(n.relativeTarget[y].max = n.relativeTarget[y].min + w));
				});
		const d = Gi();
		Il(d, s, i.layoutBox);
		const g = Gi();
		h ? Il(g, n.applyTransform(r, !0), i.measuredBox) : Il(g, s, i.layoutBox);
		const p = !a5(d);
		let x = !1;
		if (!n.resumeFrom) {
			const y = n.getClosestProjectingParent();
			if (y && !y.resumeFrom) {
				const { snapshot: v, layout: w } = y;
				if (v && w) {
					const A = at();
					so(A, i.layoutBox, v.layoutBox);
					const M = at();
					so(M, s, w.layoutBox),
						i5(A, M) || (x = !0),
						y.options.layoutRoot &&
							((n.relativeTarget = M),
							(n.relativeTargetOrigin = A),
							(n.relativeParent = y));
				}
			}
		}
		n.notifyListeners("didUpdate", {
			layout: s,
			snapshot: i,
			delta: g,
			layoutDelta: d,
			hasLayoutChanged: p,
			hasRelativeLayoutChanged: x,
		});
	} else if (n.isLead()) {
		const { onExitComplete: s } = n.options;
		s && s();
	}
	n.options.transition = void 0;
}
function T8(n) {
	n.parent &&
		(n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty),
		n.isSharedProjectionDirty ||
			(n.isSharedProjectionDirty = !!(
				n.isProjectionDirty ||
				n.parent.isProjectionDirty ||
				n.parent.isSharedProjectionDirty
			)),
		n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function A8(n) {
	n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function E8(n) {
	n.clearSnapshot();
}
function Vp(n) {
	n.clearMeasurements();
}
function Bp(n) {
	n.isLayoutDirty = !1;
}
function M8(n) {
	const { visualElement: i } = n.options;
	i && i.getProps().onBeforeLayoutMeasure && i.notify("BeforeLayoutMeasure"),
		n.resetTransform();
}
function _p(n) {
	n.finishAnimation(),
		(n.targetDelta = n.relativeTarget = n.target = void 0),
		(n.isProjectionDirty = !0);
}
function N8(n) {
	n.resolveTargetDelta();
}
function R8(n) {
	n.calcProjection();
}
function D8(n) {
	n.resetSkewAndRotation();
}
function L8(n) {
	n.removeLeadSnapshot();
}
function kp(n, i, s) {
	(n.translate = Ge(i.translate, 0, s)),
		(n.scale = Ge(i.scale, 1, s)),
		(n.origin = i.origin),
		(n.originPoint = i.originPoint);
}
function Hp(n, i, s, r) {
	(n.min = Ge(i.min, s.min, r)), (n.max = Ge(i.max, s.max, r));
}
function z8(n, i, s, r) {
	Hp(n.x, i.x, s.x, r), Hp(n.y, i.y, s.y, r);
}
function O8(n) {
	return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const V8 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
	Up = (n) =>
		typeof navigator < "u" &&
		navigator.userAgent &&
		navigator.userAgent.toLowerCase().includes(n),
	Gp = Up("applewebkit/") && !Up("chrome/") ? Math.round : Mt;
function Yp(n) {
	(n.min = Gp(n.min)), (n.max = Gp(n.max));
}
function B8(n) {
	Yp(n.x), Yp(n.y);
}
function u5(n, i, s) {
	return (
		n === "position" || (n === "preserve-aspect" && !l8(Rp(i), Rp(s), 0.2))
	);
}
function _8(n) {
	return n !== n.root && n.scroll?.wasRoot;
}
const k8 = o5({
		attachResizeListener: (n, i) => ss(n, "resize", i),
		measureScroll: () => ({
			x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
			y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
		}),
		checkIsScrollRoot: () => !0,
	}),
	ef = { current: void 0 },
	c5 = o5({
		measureScroll: (n) => ({ x: n.scrollLeft, y: n.scrollTop }),
		defaultParent: () => {
			if (!ef.current) {
				const n = new k8({});
				n.mount(window), n.setOptions({ layoutScroll: !0 }), (ef.current = n);
			}
			return ef.current;
		},
		resetTransform: (n, i) => {
			n.style.transform = i !== void 0 ? i : "none";
		},
		checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed",
	}),
	go = C.createContext({
		transformPagePoint: (n) => n,
		isStatic: !1,
		reducedMotion: "never",
	});
function qp(n, i) {
	if (typeof n == "function") return n(i);
	n != null && (n.current = i);
}
function H8(...n) {
	return (i) => {
		let s = !1;
		const r = n.map((u) => {
			const h = qp(u, i);
			return !s && typeof h == "function" && (s = !0), h;
		});
		if (s)
			return () => {
				for (let u = 0; u < r.length; u++) {
					const h = r[u];
					typeof h == "function" ? h() : qp(n[u], null);
				}
			};
	};
}
function U8(...n) {
	return C.useCallback(H8(...n), n);
}
class G8 extends C.Component {
	getSnapshotBeforeUpdate(i) {
		const s = this.props.childRef.current;
		if (s && i.isPresent && !this.props.isPresent && this.props.pop !== !1) {
			const r = s.offsetParent,
				u = (no(r) && r.offsetWidth) || 0,
				h = (no(r) && r.offsetHeight) || 0,
				d = this.props.sizeRef.current;
			(d.height = s.offsetHeight || 0),
				(d.width = s.offsetWidth || 0),
				(d.top = s.offsetTop),
				(d.left = s.offsetLeft),
				(d.right = u - d.width - d.left),
				(d.bottom = h - d.height - d.top);
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
}
function Y8({
	children: n,
	isPresent: i,
	anchorX: s,
	anchorY: r,
	root: u,
	pop: h,
}) {
	const d = C.useId(),
		g = C.useRef(null),
		p = C.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }),
		{ nonce: x } = C.useContext(go),
		y = n.props?.ref ?? n?.ref,
		v = U8(g, y);
	return (
		C.useInsertionEffect(() => {
			const {
				width: w,
				height: A,
				top: M,
				left: z,
				right: N,
				bottom: V,
			} = p.current;
			if (i || h === !1 || !g.current || !w || !A) return;
			const q = s === "left" ? `left: ${z}` : `right: ${N}`,
				k = r === "bottom" ? `bottom: ${V}` : `top: ${M}`;
			g.current.dataset.motionPopId = d;
			const K = document.createElement("style");
			x && (K.nonce = x);
			const X = u ?? document.head;
			return (
				X.appendChild(K),
				K.sheet &&
					K.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${A}px !important;
            ${q}px !important;
            ${k}px !important;
          }
        `),
				() => {
					X.contains(K) && X.removeChild(K);
				}
			);
		}, [i]),
		f.jsx(G8, {
			isPresent: i,
			childRef: g,
			sizeRef: p,
			pop: h,
			children: h === !1 ? n : C.cloneElement(n, { ref: v }),
		})
	);
}
const q8 = ({
	children: n,
	initial: i,
	isPresent: s,
	onExitComplete: r,
	custom: u,
	presenceAffectsLayout: h,
	mode: d,
	anchorX: g,
	anchorY: p,
	root: x,
}) => {
	const y = wa(Z8),
		v = C.useId();
	let w = !0,
		A = C.useMemo(
			() => (
				(w = !1),
				{
					id: v,
					initial: i,
					isPresent: s,
					custom: u,
					onExitComplete: (M) => {
						y.set(M, !0);
						for (const z of y.values()) if (!z) return;
						r && r();
					},
					register: (M) => (y.set(M, !1), () => y.delete(M)),
				}
			),
			[s, y, r],
		);
	return (
		h && w && (A = { ...A }),
		C.useMemo(() => {
			y.forEach((M, z) => y.set(z, !1));
		}, [s]),
		C.useEffect(() => {
			!s && !y.size && r && r();
		}, [s]),
		(n = f.jsx(Y8, {
			pop: d === "popLayout",
			isPresent: s,
			anchorX: g,
			anchorY: p,
			root: x,
			children: n,
		})),
		f.jsx(ho.Provider, { value: A, children: n })
	);
};
function Z8() {
	return new Map();
}
function f5(n = !0) {
	const i = C.useContext(ho);
	if (i === null) return [!0, null];
	const { isPresent: s, onExitComplete: r, register: u } = i,
		h = C.useId();
	C.useEffect(() => {
		if (n) return u(h);
	}, [n]);
	const d = C.useCallback(() => n && r && r(h), [h, r, n]);
	return !s && r ? [!1, d] : [!0];
}
const Vr = (n) => n.key || "";
function Zp(n) {
	const i = [];
	return (
		C.Children.forEach(n, (s) => {
			C.isValidElement(s) && i.push(s);
		}),
		i
	);
}
const X8 = ({
		children: n,
		custom: i,
		initial: s = !0,
		onExitComplete: r,
		presenceAffectsLayout: u = !0,
		mode: h = "sync",
		propagate: d = !1,
		anchorX: g = "left",
		anchorY: p = "top",
		root: x,
	}) => {
		const [y, v] = f5(d),
			w = C.useMemo(() => Zp(n), [n]),
			A = d && !y ? [] : w.map(Vr),
			M = C.useRef(!0),
			z = C.useRef(w),
			N = wa(() => new Map()),
			V = C.useRef(new Set()),
			[q, k] = C.useState(w),
			[K, X] = C.useState(w);
		fo(() => {
			(M.current = !1), (z.current = w);
			for (let H = 0; H < K.length; H++) {
				const ne = Vr(K[H]);
				A.includes(ne)
					? (N.delete(ne), V.current.delete(ne))
					: N.get(ne) !== !0 && N.set(ne, !1);
			}
		}, [K, A.length, A.join("-")]);
		const ie = [];
		if (w !== q) {
			let H = [...w];
			for (let ne = 0; ne < K.length; ne++) {
				const Ce = K[ne],
					Be = Vr(Ce);
				A.includes(Be) || (H.splice(ne, 0, Ce), ie.push(Ce));
			}
			return h === "wait" && ie.length && (H = ie), X(Zp(H)), k(w), null;
		}
		const { forceRender: J } = C.useContext(Xf);
		return f.jsx(f.Fragment, {
			children: K.map((H) => {
				const ne = Vr(H),
					Ce = d && !y ? !1 : w === K || A.includes(ne),
					Be = () => {
						if (V.current.has(ne)) return;
						if ((V.current.add(ne), N.has(ne))) N.set(ne, !0);
						else return;
						let Oe = !0;
						N.forEach((ut) => {
							ut || (Oe = !1);
						}),
							Oe && (J?.(), X(z.current), d && v?.(), r && r());
					};
				return f.jsx(
					q8,
					{
						isPresent: Ce,
						initial: !M.current || s ? void 0 : !1,
						custom: i,
						presenceAffectsLayout: u,
						mode: h,
						root: x,
						onExitComplete: Ce ? void 0 : Be,
						anchorX: g,
						anchorY: p,
						children: H,
					},
					ne,
				);
			}),
		});
	},
	d5 = C.createContext({ strict: !1 }),
	Xp = {
		animation: [
			"animate",
			"variants",
			"whileHover",
			"whileTap",
			"exit",
			"whileInView",
			"whileFocus",
			"whileDrag",
		],
		exit: ["exit"],
		drag: ["drag", "dragControls"],
		focus: ["whileFocus"],
		hover: ["whileHover", "onHoverStart", "onHoverEnd"],
		tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
		pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
		inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
		layout: ["layout", "layoutId"],
	};
let Kp = !1;
function K8() {
	if (Kp) return;
	const n = {};
	for (const i in Xp) n[i] = { isEnabled: (s) => Xp[i].some((r) => !!s[r]) };
	G2(n), (Kp = !0);
}
function h5() {
	return K8(), D9();
}
function Q8(n) {
	const i = h5();
	for (const s in n) i[s] = { ...i[s], ...n[s] };
	G2(i);
}
const P8 = new Set([
	"animate",
	"exit",
	"variants",
	"initial",
	"style",
	"values",
	"variants",
	"transition",
	"transformTemplate",
	"custom",
	"inherit",
	"onBeforeLayoutMeasure",
	"onAnimationStart",
	"onAnimationComplete",
	"onUpdate",
	"onDragStart",
	"onDrag",
	"onDragEnd",
	"onMeasureDragConstraints",
	"onDirectionLock",
	"onDragTransitionEnd",
	"_dragX",
	"_dragY",
	"onHoverStart",
	"onHoverEnd",
	"onViewportEnter",
	"onViewportLeave",
	"globalTapTarget",
	"propagate",
	"ignoreStrict",
	"viewport",
]);
function ro(n) {
	return (
		n.startsWith("while") ||
		(n.startsWith("drag") && n !== "draggable") ||
		n.startsWith("layout") ||
		n.startsWith("onTap") ||
		n.startsWith("onPan") ||
		n.startsWith("onLayout") ||
		P8.has(n)
	);
}
let m5 = (n) => !ro(n);
function F8(n) {
	typeof n == "function" && (m5 = (i) => (i.startsWith("on") ? !ro(i) : n(i)));
}
try {
	F8(require("@emotion/is-prop-valid").default);
} catch {}
function J8(n, i, s) {
	const r = {};
	for (const u in n)
		(u === "values" && typeof n.values == "object") ||
			((m5(u) ||
				(s === !0 && ro(u)) ||
				(!i && !ro(u)) ||
				(n.draggable && u.startsWith("onDrag"))) &&
				(r[u] = n[u]));
	return r;
}
const xo = C.createContext({});
function W8(n, i) {
	if (po(n)) {
		const { initial: s, animate: r } = n;
		return {
			initial: s === !1 || ls(s) ? s : void 0,
			animate: ls(r) ? r : void 0,
		};
	}
	return n.inherit !== !1 ? i : {};
}
function $8(n) {
	const { initial: i, animate: s } = W8(n, C.useContext(xo));
	return C.useMemo(() => ({ initial: i, animate: s }), [Qp(i), Qp(s)]);
}
function Qp(n) {
	return Array.isArray(n) ? n.join(" ") : n;
}
const bd = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function p5(n, i, s) {
	for (const r in i) !xt(i[r]) && !P2(r, s) && (n[r] = i[r]);
}
function I8({ transformTemplate: n }, i) {
	return C.useMemo(() => {
		const s = bd();
		return yd(s, i, n), Object.assign({}, s.vars, s.style);
	}, [i]);
}
function e7(n, i) {
	const s = n.style || {},
		r = {};
	return p5(r, s, n), Object.assign(r, I8(n, i)), r;
}
function t7(n, i) {
	const s = {},
		r = e7(n, i);
	return (
		n.drag &&
			n.dragListener !== !1 &&
			((s.draggable = !1),
			(r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
			(r.touchAction =
				n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`)),
		n.tabIndex === void 0 &&
			(n.onTap || n.onTapStart || n.whileTap) &&
			(s.tabIndex = 0),
		(s.style = r),
		s
	);
}
const g5 = () => ({ ...bd(), attrs: {} });
function n7(n, i, s, r) {
	const u = C.useMemo(() => {
		const h = g5();
		return (
			F2(h, i, W2(r), n.transformTemplate, n.style),
			{ ...h.attrs, style: { ...h.style } }
		);
	}, [i]);
	if (n.style) {
		const h = {};
		p5(h, n.style, n), (u.style = { ...h, ...u.style });
	}
	return u;
}
const a7 = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view",
];
function wd(n) {
	return typeof n != "string" || n.includes("-")
		? !1
		: !!(a7.indexOf(n) > -1 || /[A-Z]/u.test(n));
}
function i7(n, i, s, { latestValues: r }, u, h = !1, d) {
	const p = ((d ?? wd(n)) ? n7 : t7)(i, r, u, n),
		x = J8(i, typeof n == "string", h),
		y = n !== C.Fragment ? { ...x, ...p, ref: s } : {},
		{ children: v } = i,
		w = C.useMemo(() => (xt(v) ? v.get() : v), [v]);
	return C.createElement(n, { ...y, children: w });
}
function l7({ scrapeMotionValuesFromProps: n, createRenderState: i }, s, r, u) {
	return { latestValues: s7(s, r, u, n), renderState: i() };
}
function s7(n, i, s, r) {
	const u = {},
		h = r(n, {});
	for (const w in h) u[w] = Pr(h[w]);
	let { initial: d, animate: g } = n;
	const p = po(n),
		x = H2(n);
	i &&
		x &&
		!p &&
		n.inherit !== !1 &&
		(d === void 0 && (d = i.initial), g === void 0 && (g = i.animate));
	let y = s ? s.initial === !1 : !1;
	y = y || d === !1;
	const v = y ? g : d;
	if (v && typeof v != "boolean" && !mo(v)) {
		const w = Array.isArray(v) ? v : [v];
		for (let A = 0; A < w.length; A++) {
			const M = ud(n, w[A]);
			if (M) {
				const { transitionEnd: z, transition: N, ...V } = M;
				for (const q in V) {
					let k = V[q];
					if (Array.isArray(k)) {
						const K = y ? k.length - 1 : 0;
						k = k[K];
					}
					k !== null && (u[q] = k);
				}
				for (const q in z) u[q] = z[q];
			}
		}
	}
	return u;
}
const x5 = (n) => (i, s) => {
		const r = C.useContext(xo),
			u = C.useContext(ho),
			h = () => l7(n, i, r, u);
		return s ? h() : wa(h);
	},
	r7 = x5({ scrapeMotionValuesFromProps: vd, createRenderState: bd }),
	o7 = x5({ scrapeMotionValuesFromProps: $2, createRenderState: g5 }),
	u7 = Symbol.for("motionComponentSymbol");
function c7(n, i, s) {
	const r = C.useRef(s);
	C.useInsertionEffect(() => {
		r.current = s;
	});
	const u = C.useRef(null);
	return C.useCallback(
		(h) => {
			h && n.onMount?.(h), i && (h ? i.mount(h) : i.unmount());
			const d = r.current;
			if (typeof d == "function")
				if (h) {
					const g = d(h);
					typeof g == "function" && (u.current = g);
				} else u.current ? (u.current(), (u.current = null)) : d(h);
			else d && (d.current = h);
		},
		[i],
	);
}
const y5 = C.createContext({});
function ki(n) {
	return (
		n &&
		typeof n == "object" &&
		Object.prototype.hasOwnProperty.call(n, "current")
	);
}
function f7(n, i, s, r, u, h) {
	const { visualElement: d } = C.useContext(xo),
		g = C.useContext(d5),
		p = C.useContext(ho),
		x = C.useContext(go),
		y = x.reducedMotion,
		v = x.skipAnimations,
		w = C.useRef(null),
		A = C.useRef(!1);
	(r = r || g.renderer),
		!w.current &&
			r &&
			((w.current = r(n, {
				visualState: i,
				parent: d,
				props: s,
				presenceContext: p,
				blockInitialAnimation: p ? p.initial === !1 : !1,
				reducedMotionConfig: y,
				skipAnimations: v,
				isSVG: h,
			})),
			A.current && w.current && (w.current.manuallyAnimateOnMount = !0));
	const M = w.current,
		z = C.useContext(y5);
	M &&
		!M.projection &&
		u &&
		(M.type === "html" || M.type === "svg") &&
		d7(w.current, s, u, z);
	const N = C.useRef(!1);
	C.useInsertionEffect(() => {
		M && N.current && M.update(s, p);
	});
	const V = s[T2],
		q = C.useRef(
			!!V &&
				!window.MotionHandoffIsComplete?.(V) &&
				window.MotionHasOptimisedAnimation?.(V),
		);
	return (
		fo(() => {
			(A.current = !0),
				M &&
					((N.current = !0),
					(window.MotionIsMounted = !0),
					M.updateFeatures(),
					M.scheduleRenderMicrotask(),
					q.current && M.animationState && M.animationState.animateChanges());
		}),
		C.useEffect(() => {
			M &&
				(!q.current && M.animationState && M.animationState.animateChanges(),
				q.current &&
					(queueMicrotask(() => {
						window.MotionHandoffMarkAsComplete?.(V);
					}),
					(q.current = !1)),
				(M.enteringChildren = void 0));
		}),
		M
	);
}
function d7(n, i, s, r) {
	const {
		layoutId: u,
		layout: h,
		drag: d,
		dragConstraints: g,
		layoutScroll: p,
		layoutRoot: x,
		layoutCrossfade: y,
	} = i;
	(n.projection = new s(
		n.latestValues,
		i["data-framer-portal-id"] ? void 0 : v5(n.parent),
	)),
		n.projection.setOptions({
			layoutId: u,
			layout: h,
			alwaysMeasureLayout: !!d || (g && ki(g)),
			visualElement: n,
			animationType: typeof h == "string" ? h : "both",
			initialPromotionConfig: r,
			crossfade: y,
			layoutScroll: p,
			layoutRoot: x,
		});
}
function v5(n) {
	if (n) return n.options.allowProjection !== !1 ? n.projection : v5(n.parent);
}
function tf(n, { forwardMotionProps: i = !1, type: s } = {}, r, u) {
	r && Q8(r);
	const h = s ? s === "svg" : wd(n),
		d = h ? o7 : r7;
	function g(x, y) {
		let v;
		const w = { ...C.useContext(go), ...x, layoutId: h7(x) },
			{ isStatic: A } = w,
			M = $8(x),
			z = d(x, A);
		if (!A && _g) {
			m7();
			const N = p7(w);
			(v = N.MeasureLayout),
				(M.visualElement = f7(n, z, w, u, N.ProjectionNode, h));
		}
		return f.jsxs(xo.Provider, {
			value: M,
			children: [
				v && M.visualElement
					? f.jsx(v, { visualElement: M.visualElement, ...w })
					: null,
				i7(n, x, c7(z, M.visualElement, y), z, A, i, h),
			],
		});
	}
	g.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
	const p = C.forwardRef(g);
	return (p[u7] = n), p;
}
function h7({ layoutId: n }) {
	const i = C.useContext(Xf).id;
	return i && n !== void 0 ? i + "-" + n : n;
}
function m7(n, i) {
	C.useContext(d5).strict;
}
function p7(n) {
	const i = h5(),
		{ drag: s, layout: r } = i;
	if (!s && !r) return {};
	const u = { ...s, ...r };
	return {
		MeasureLayout:
			s?.isEnabled(n) || r?.isEnabled(n) ? u.MeasureLayout : void 0,
		ProjectionNode: u.ProjectionNode,
	};
}
function g7(n, i) {
	if (typeof Proxy > "u") return tf;
	const s = new Map(),
		r = (h, d) => tf(h, d, n, i),
		u = (h, d) => r(h, d);
	return new Proxy(u, {
		get: (h, d) =>
			d === "create"
				? r
				: (s.has(d) || s.set(d, tf(d, void 0, n, i)), s.get(d)),
	});
}
const x7 = (n, i) =>
	(i.isSVG ?? wd(n))
		? new P9(i)
		: new Y9(i, { allowProjection: n !== C.Fragment });
class y7 extends Sa {
	constructor(i) {
		super(i), i.animationState || (i.animationState = I9(i));
	}
	updateAnimationControlsSubscription() {
		const { animate: i } = this.node.getProps();
		mo(i) && (this.unmountControls = i.subscribe(this.node));
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		const { animate: i } = this.node.getProps(),
			{ animate: s } = this.node.prevProps || {};
		i !== s && this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset(), this.unmountControls?.();
	}
}
let v7 = 0;
class b7 extends Sa {
	constructor() {
		super(...arguments), (this.id = v7++);
	}
	update() {
		if (!this.node.presenceContext) return;
		const { isPresent: i, onExitComplete: s } = this.node.presenceContext,
			{ isPresent: r } = this.node.prevPresenceContext || {};
		if (!this.node.animationState || i === r) return;
		const u = this.node.animationState.setActive("exit", !i);
		s &&
			!i &&
			u.then(() => {
				s(this.id);
			});
	}
	mount() {
		const { register: i, onExitComplete: s } = this.node.presenceContext || {};
		s && s(this.id), i && (this.unmount = i(this.id));
	}
	unmount() {}
}
const w7 = { animation: { Feature: y7 }, exit: { Feature: b7 } };
function hs(n) {
	return { point: { x: n.pageX, y: n.pageY } };
}
const S7 = (n) => (i) => hd(i) && n(i, hs(i));
function es(n, i, s, r) {
	return ss(n, i, S7(s), r);
}
const b5 = ({ current: n }) => (n ? n.ownerDocument.defaultView : null),
	Pp = (n, i) => Math.abs(n - i);
function C7(n, i) {
	const s = Pp(n.x, i.x),
		r = Pp(n.y, i.y);
	return Math.sqrt(s ** 2 + r ** 2);
}
const Fp = new Set(["auto", "scroll"]);
class w5 {
	constructor(
		i,
		s,
		{
			transformPagePoint: r,
			contextWindow: u = window,
			dragSnapToOrigin: h = !1,
			distanceThreshold: d = 3,
			element: g,
		} = {},
	) {
		if (
			((this.startEvent = null),
			(this.lastMoveEvent = null),
			(this.lastMoveEventInfo = null),
			(this.handlers = {}),
			(this.contextWindow = window),
			(this.scrollPositions = new Map()),
			(this.removeScrollListeners = null),
			(this.onElementScroll = (A) => {
				this.handleScroll(A.target);
			}),
			(this.onWindowScroll = () => {
				this.handleScroll(window);
			}),
			(this.updatePoint = () => {
				if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
				const A = af(this.lastMoveEventInfo, this.history),
					M = this.startEvent !== null,
					z = C7(A.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
				if (!M && !z) return;
				const { point: N } = A,
					{ timestamp: V } = ot;
				this.history.push({ ...N, timestamp: V });
				const { onStart: q, onMove: k } = this.handlers;
				M ||
					(q && q(this.lastMoveEvent, A),
					(this.startEvent = this.lastMoveEvent)),
					k && k(this.lastMoveEvent, A);
			}),
			(this.handlePointerMove = (A, M) => {
				(this.lastMoveEvent = A),
					(this.lastMoveEventInfo = nf(M, this.transformPagePoint)),
					Ae.update(this.updatePoint, !0);
			}),
			(this.handlePointerUp = (A, M) => {
				this.end();
				const { onEnd: z, onSessionEnd: N, resumeAnimation: V } = this.handlers;
				if (
					((this.dragSnapToOrigin || !this.startEvent) && V && V(),
					!(this.lastMoveEvent && this.lastMoveEventInfo))
				)
					return;
				const q = af(
					A.type === "pointercancel"
						? this.lastMoveEventInfo
						: nf(M, this.transformPagePoint),
					this.history,
				);
				this.startEvent && z && z(A, q), N && N(A, q);
			}),
			!hd(i))
		)
			return;
		(this.dragSnapToOrigin = h),
			(this.handlers = s),
			(this.transformPagePoint = r),
			(this.distanceThreshold = d),
			(this.contextWindow = u || window);
		const p = hs(i),
			x = nf(p, this.transformPagePoint),
			{ point: y } = x,
			{ timestamp: v } = ot;
		this.history = [{ ...y, timestamp: v }];
		const { onSessionStart: w } = s;
		w && w(i, af(x, this.history)),
			(this.removeListeners = cs(
				es(this.contextWindow, "pointermove", this.handlePointerMove),
				es(this.contextWindow, "pointerup", this.handlePointerUp),
				es(this.contextWindow, "pointercancel", this.handlePointerUp),
			)),
			g && this.startScrollTracking(g);
	}
	startScrollTracking(i) {
		let s = i.parentElement;
		for (; s; ) {
			const r = getComputedStyle(s);
			(Fp.has(r.overflowX) || Fp.has(r.overflowY)) &&
				this.scrollPositions.set(s, { x: s.scrollLeft, y: s.scrollTop }),
				(s = s.parentElement);
		}
		this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
			window.addEventListener("scroll", this.onElementScroll, { capture: !0 }),
			window.addEventListener("scroll", this.onWindowScroll),
			(this.removeScrollListeners = () => {
				window.removeEventListener("scroll", this.onElementScroll, {
					capture: !0,
				}),
					window.removeEventListener("scroll", this.onWindowScroll);
			});
	}
	handleScroll(i) {
		const s = this.scrollPositions.get(i);
		if (!s) return;
		const r = i === window,
			u = r
				? { x: window.scrollX, y: window.scrollY }
				: { x: i.scrollLeft, y: i.scrollTop },
			h = { x: u.x - s.x, y: u.y - s.y };
		(h.x === 0 && h.y === 0) ||
			(r
				? this.lastMoveEventInfo &&
					((this.lastMoveEventInfo.point.x += h.x),
					(this.lastMoveEventInfo.point.y += h.y))
				: this.history.length > 0 &&
					((this.history[0].x -= h.x), (this.history[0].y -= h.y)),
			this.scrollPositions.set(i, u),
			Ae.update(this.updatePoint, !0));
	}
	updateHandlers(i) {
		this.handlers = i;
	}
	end() {
		this.removeListeners && this.removeListeners(),
			this.removeScrollListeners && this.removeScrollListeners(),
			this.scrollPositions.clear(),
			Wt(this.updatePoint);
	}
}
function nf(n, i) {
	return i ? { point: i(n.point) } : n;
}
function Jp(n, i) {
	return { x: n.x - i.x, y: n.y - i.y };
}
function af({ point: n }, i) {
	return {
		point: n,
		delta: Jp(n, S5(i)),
		offset: Jp(n, j7(i)),
		velocity: T7(i, 0.1),
	};
}
function j7(n) {
	return n[0];
}
function S5(n) {
	return n[n.length - 1];
}
function T7(n, i) {
	if (n.length < 2) return { x: 0, y: 0 };
	let s = n.length - 1,
		r = null;
	const u = S5(n);
	for (; s >= 0 && ((r = n[s]), !(u.timestamp - r.timestamp > rn(i))); ) s--;
	if (!r) return { x: 0, y: 0 };
	r === n[0] &&
		n.length > 2 &&
		u.timestamp - r.timestamp > rn(i) * 2 &&
		(r = n[1]);
	const h = Jt(u.timestamp - r.timestamp);
	if (h === 0) return { x: 0, y: 0 };
	const d = { x: (u.x - r.x) / h, y: (u.y - r.y) / h };
	return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function A7(n, { min: i, max: s }, r) {
	return (
		i !== void 0 && n < i
			? (n = r ? Ge(i, n, r.min) : Math.max(n, i))
			: s !== void 0 && n > s && (n = r ? Ge(s, n, r.max) : Math.min(n, s)),
		n
	);
}
function Wp(n, i, s) {
	return {
		min: i !== void 0 ? n.min + i : void 0,
		max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0,
	};
}
function E7(n, { top: i, left: s, bottom: r, right: u }) {
	return { x: Wp(n.x, s, u), y: Wp(n.y, i, r) };
}
function $p(n, i) {
	let s = i.min - n.min,
		r = i.max - n.max;
	return i.max - i.min < n.max - n.min && ([s, r] = [r, s]), { min: s, max: r };
}
function M7(n, i) {
	return { x: $p(n.x, i.x), y: $p(n.y, i.y) };
}
function N7(n, i) {
	let s = 0.5;
	const r = bt(n),
		u = bt(i);
	return (
		u > r
			? (s = Ki(i.min, i.max - r, n.min))
			: r > u && (s = Ki(n.min, n.max - u, i.min)),
		un(0, 1, s)
	);
}
function R7(n, i) {
	const s = {};
	return (
		i.min !== void 0 && (s.min = i.min - n.min),
		i.max !== void 0 && (s.max = i.max - n.min),
		s
	);
}
const Of = 0.35;
function D7(n = Of) {
	return (
		n === !1 ? (n = 0) : n === !0 && (n = Of),
		{ x: Ip(n, "left", "right"), y: Ip(n, "top", "bottom") }
	);
}
function Ip(n, i, s) {
	return { min: eg(n, i), max: eg(n, s) };
}
function eg(n, i) {
	return typeof n == "number" ? n : n[i] || 0;
}
const L7 = new WeakMap();
class z7 {
	constructor(i) {
		(this.openDragLock = null),
			(this.isDragging = !1),
			(this.currentDirection = null),
			(this.originPoint = { x: 0, y: 0 }),
			(this.constraints = !1),
			(this.hasMutatedConstraints = !1),
			(this.elastic = at()),
			(this.latestPointerEvent = null),
			(this.latestPanInfo = null),
			(this.visualElement = i);
	}
	start(i, { snapToCursor: s = !1, distanceThreshold: r } = {}) {
		const { presenceContext: u } = this.visualElement;
		if (u && u.isPresent === !1) return;
		const h = (v) => {
				s && this.snapToCursor(hs(v).point), this.stopAnimation();
			},
			d = (v, w) => {
				const { drag: A, dragPropagation: M, onDragStart: z } = this.getProps();
				if (
					A &&
					!M &&
					(this.openDragLock && this.openDragLock(),
					(this.openDragLock = r9(A)),
					!this.openDragLock)
				)
					return;
				(this.latestPointerEvent = v),
					(this.latestPanInfo = w),
					(this.isDragging = !0),
					(this.currentDirection = null),
					this.resolveConstraints(),
					this.visualElement.projection &&
						((this.visualElement.projection.isAnimationBlocked = !0),
						(this.visualElement.projection.target = void 0)),
					gn((V) => {
						let q = this.getAxisMotionValue(V).get() || 0;
						if (yn.test(q)) {
							const { projection: k } = this.visualElement;
							if (k && k.layout) {
								const K = k.layout.layoutBox[V];
								K && (q = bt(K) * (parseFloat(q) / 100));
							}
						}
						this.originPoint[V] = q;
					}),
					z && Ae.update(() => z(v, w), !1, !0),
					Af(this.visualElement, "transform");
				const { animationState: N } = this.visualElement;
				N && N.setActive("whileDrag", !0);
			},
			g = (v, w) => {
				(this.latestPointerEvent = v), (this.latestPanInfo = w);
				const {
					dragPropagation: A,
					dragDirectionLock: M,
					onDirectionLock: z,
					onDrag: N,
				} = this.getProps();
				if (!A && !this.openDragLock) return;
				const { offset: V } = w;
				if (M && this.currentDirection === null) {
					(this.currentDirection = V7(V)),
						this.currentDirection !== null && z && z(this.currentDirection);
					return;
				}
				this.updateAxis("x", w.point, V),
					this.updateAxis("y", w.point, V),
					this.visualElement.render(),
					N && Ae.update(() => N(v, w), !1, !0);
			},
			p = (v, w) => {
				(this.latestPointerEvent = v),
					(this.latestPanInfo = w),
					this.stop(v, w),
					(this.latestPointerEvent = null),
					(this.latestPanInfo = null);
			},
			x = () => {
				const { dragSnapToOrigin: v } = this.getProps();
				(v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
			},
			{ dragSnapToOrigin: y } = this.getProps();
		this.panSession = new w5(
			i,
			{
				onSessionStart: h,
				onStart: d,
				onMove: g,
				onSessionEnd: p,
				resumeAnimation: x,
			},
			{
				transformPagePoint: this.visualElement.getTransformPagePoint(),
				dragSnapToOrigin: y,
				distanceThreshold: r,
				contextWindow: b5(this.visualElement),
				element: this.visualElement.current,
			},
		);
	}
	stop(i, s) {
		const r = i || this.latestPointerEvent,
			u = s || this.latestPanInfo,
			h = this.isDragging;
		if ((this.cancel(), !h || !u || !r)) return;
		const { velocity: d } = u;
		this.startAnimation(d);
		const { onDragEnd: g } = this.getProps();
		g && Ae.postRender(() => g(r, u));
	}
	cancel() {
		this.isDragging = !1;
		const { projection: i, animationState: s } = this.visualElement;
		i && (i.isAnimationBlocked = !1), this.endPanSession();
		const { dragPropagation: r } = this.getProps();
		!r &&
			this.openDragLock &&
			(this.openDragLock(), (this.openDragLock = null)),
			s && s.setActive("whileDrag", !1);
	}
	endPanSession() {
		this.panSession && this.panSession.end(), (this.panSession = void 0);
	}
	updateAxis(i, s, r) {
		const { drag: u } = this.getProps();
		if (!r || !Br(i, u, this.currentDirection)) return;
		const h = this.getAxisMotionValue(i);
		let d = this.originPoint[i] + r[i];
		this.constraints &&
			this.constraints[i] &&
			(d = A7(d, this.constraints[i], this.elastic[i])),
			h.set(d);
	}
	resolveConstraints() {
		const { dragConstraints: i, dragElastic: s } = this.getProps(),
			r =
				this.visualElement.projection && !this.visualElement.projection.layout
					? this.visualElement.projection.measure(!1)
					: this.visualElement.projection?.layout,
			u = this.constraints;
		i && ki(i)
			? this.constraints || (this.constraints = this.resolveRefConstraints())
			: i && r
				? (this.constraints = E7(r.layoutBox, i))
				: (this.constraints = !1),
			(this.elastic = D7(s)),
			u !== this.constraints &&
				!ki(i) &&
				r &&
				this.constraints &&
				!this.hasMutatedConstraints &&
				gn((h) => {
					this.constraints !== !1 &&
						this.getAxisMotionValue(h) &&
						(this.constraints[h] = R7(r.layoutBox[h], this.constraints[h]));
				});
	}
	resolveRefConstraints() {
		const { dragConstraints: i, onMeasureDragConstraints: s } = this.getProps();
		if (!i || !ki(i)) return !1;
		const r = i.current,
			{ projection: u } = this.visualElement;
		if (!u || !u.layout) return !1;
		const h = B9(r, u.root, this.visualElement.getTransformPagePoint());
		let d = M7(u.layout.layoutBox, h);
		if (s) {
			const g = s(z9(d));
			(this.hasMutatedConstraints = !!g), g && (d = q2(g));
		}
		return d;
	}
	startAnimation(i) {
		const {
				drag: s,
				dragMomentum: r,
				dragElastic: u,
				dragTransition: h,
				dragSnapToOrigin: d,
				onDragTransitionEnd: g,
			} = this.getProps(),
			p = this.constraints || {},
			x = gn((y) => {
				if (!Br(y, s, this.currentDirection)) return;
				let v = (p && p[y]) || {};
				d && (v = { min: 0, max: 0 });
				const w = u ? 200 : 1e6,
					A = u ? 40 : 1e7,
					M = {
						type: "inertia",
						velocity: r ? i[y] : 0,
						bounceStiffness: w,
						bounceDamping: A,
						timeConstant: 750,
						restDelta: 1,
						restSpeed: 10,
						...h,
						...v,
					};
				return this.startAxisValueAnimation(y, M);
			});
		return Promise.all(x).then(g);
	}
	startAxisValueAnimation(i, s) {
		const r = this.getAxisMotionValue(i);
		return (
			Af(this.visualElement, i), r.start(od(i, r, 0, s, this.visualElement, !1))
		);
	}
	stopAnimation() {
		gn((i) => this.getAxisMotionValue(i).stop());
	}
	getAxisMotionValue(i) {
		const s = `_drag${i.toUpperCase()}`,
			r = this.visualElement.getProps(),
			u = r[s];
		return (
			u ||
			this.visualElement.getValue(i, (r.initial ? r.initial[i] : void 0) || 0)
		);
	}
	snapToCursor(i) {
		gn((s) => {
			const { drag: r } = this.getProps();
			if (!Br(s, r, this.currentDirection)) return;
			const { projection: u } = this.visualElement,
				h = this.getAxisMotionValue(s);
			if (u && u.layout) {
				const { min: d, max: g } = u.layout.layoutBox[s],
					p = h.get() || 0;
				h.set(i[s] - Ge(d, g, 0.5) + p);
			}
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		const { drag: i, dragConstraints: s } = this.getProps(),
			{ projection: r } = this.visualElement;
		if (!ki(s) || !r || !this.constraints) return;
		this.stopAnimation();
		const u = { x: 0, y: 0 };
		gn((d) => {
			const g = this.getAxisMotionValue(d);
			if (g && this.constraints !== !1) {
				const p = g.get();
				u[d] = N7({ min: p, max: p }, this.constraints[d]);
			}
		});
		const { transformTemplate: h } = this.visualElement.getProps();
		(this.visualElement.current.style.transform = h ? h({}, "") : "none"),
			r.root && r.root.updateScroll(),
			r.updateLayout(),
			(this.constraints = !1),
			this.resolveConstraints(),
			gn((d) => {
				if (!Br(d, i, null)) return;
				const g = this.getAxisMotionValue(d),
					{ min: p, max: x } = this.constraints[d];
				g.set(Ge(p, x, u[d]));
			}),
			this.visualElement.render();
	}
	addListeners() {
		if (!this.visualElement.current) return;
		L7.set(this.visualElement, this);
		const i = this.visualElement.current,
			s = es(i, "pointerdown", (x) => {
				const { drag: y, dragListener: v = !0 } = this.getProps(),
					w = x.target,
					A = w !== i && h9(w);
				y && v && !A && this.start(x);
			});
		let r;
		const u = () => {
				const { dragConstraints: x } = this.getProps();
				ki(x) &&
					x.current &&
					((this.constraints = this.resolveRefConstraints()),
					r ||
						(r = O7(i, x.current, () =>
							this.scalePositionWithinConstraints(),
						)));
			},
			{ projection: h } = this.visualElement,
			d = h.addEventListener("measure", u);
		h && !h.layout && (h.root && h.root.updateScroll(), h.updateLayout()),
			Ae.read(u);
		const g = ss(window, "resize", () => this.scalePositionWithinConstraints()),
			p = h.addEventListener(
				"didUpdate",
				({ delta: x, hasLayoutChanged: y }) => {
					this.isDragging &&
						y &&
						(gn((v) => {
							const w = this.getAxisMotionValue(v);
							w &&
								((this.originPoint[v] += x[v].translate),
								w.set(w.get() + x[v].translate));
						}),
						this.visualElement.render());
				},
			);
		return () => {
			g(), s(), d(), p && p(), r && r();
		};
	}
	getProps() {
		const i = this.visualElement.getProps(),
			{
				drag: s = !1,
				dragDirectionLock: r = !1,
				dragPropagation: u = !1,
				dragConstraints: h = !1,
				dragElastic: d = Of,
				dragMomentum: g = !0,
			} = i;
		return {
			...i,
			drag: s,
			dragDirectionLock: r,
			dragPropagation: u,
			dragConstraints: h,
			dragElastic: d,
			dragMomentum: g,
		};
	}
}
function tg(n) {
	let i = !0;
	return () => {
		if (i) {
			i = !1;
			return;
		}
		n();
	};
}
function O7(n, i, s) {
	const r = Rf(n, tg(s)),
		u = Rf(i, tg(s));
	return () => {
		r(), u();
	};
}
function Br(n, i, s) {
	return (i === !0 || i === n) && (s === null || s === n);
}
function V7(n, i = 10) {
	let s = null;
	return Math.abs(n.y) > i ? (s = "y") : Math.abs(n.x) > i && (s = "x"), s;
}
class B7 extends Sa {
	constructor(i) {
		super(i),
			(this.removeGroupControls = Mt),
			(this.removeListeners = Mt),
			(this.controls = new z7(i));
	}
	mount() {
		const { dragControls: i } = this.node.getProps();
		i && (this.removeGroupControls = i.subscribe(this.controls)),
			(this.removeListeners = this.controls.addListeners() || Mt);
	}
	update() {
		const { dragControls: i } = this.node.getProps(),
			{ dragControls: s } = this.node.prevProps || {};
		i !== s &&
			(this.removeGroupControls(),
			i && (this.removeGroupControls = i.subscribe(this.controls)));
	}
	unmount() {
		this.removeGroupControls(),
			this.removeListeners(),
			this.controls.isDragging || this.controls.endPanSession();
	}
}
const lf = (n) => (i, s) => {
	n && Ae.update(() => n(i, s), !1, !0);
};
class _7 extends Sa {
	constructor() {
		super(...arguments), (this.removePointerDownListener = Mt);
	}
	onPointerDown(i) {
		this.session = new w5(i, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: b5(this.node),
		});
	}
	createPanHandlers() {
		const {
			onPanSessionStart: i,
			onPanStart: s,
			onPan: r,
			onPanEnd: u,
		} = this.node.getProps();
		return {
			onSessionStart: lf(i),
			onStart: lf(s),
			onMove: lf(r),
			onEnd: (h, d) => {
				delete this.session, u && Ae.postRender(() => u(h, d));
			},
		};
	}
	mount() {
		this.removePointerDownListener = es(this.node.current, "pointerdown", (i) =>
			this.onPointerDown(i),
		);
	}
	update() {
		this.session && this.session.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener(), this.session && this.session.end();
	}
}
let sf = !1;
class k7 extends C.Component {
	componentDidMount() {
		const {
				visualElement: i,
				layoutGroup: s,
				switchLayoutGroup: r,
				layoutId: u,
			} = this.props,
			{ projection: h } = i;
		h &&
			(s.group && s.group.add(h),
			r && r.register && u && r.register(h),
			sf && h.root.didUpdate(),
			h.addEventListener("animationComplete", () => {
				this.safeToRemove();
			}),
			h.setOptions({
				...h.options,
				layoutDependency: this.props.layoutDependency,
				onExitComplete: () => this.safeToRemove(),
			})),
			(Fr.hasEverUpdated = !0);
	}
	getSnapshotBeforeUpdate(i) {
		const {
				layoutDependency: s,
				visualElement: r,
				drag: u,
				isPresent: h,
			} = this.props,
			{ projection: d } = r;
		return (
			d &&
				((d.isPresent = h),
				i.layoutDependency !== s &&
					d.setOptions({ ...d.options, layoutDependency: s }),
				(sf = !0),
				u || i.layoutDependency !== s || s === void 0 || i.isPresent !== h
					? d.willUpdate()
					: this.safeToRemove(),
				i.isPresent !== h &&
					(h
						? d.promote()
						: d.relegate() ||
							Ae.postRender(() => {
								const g = d.getStack();
								(!g || !g.members.length) && this.safeToRemove();
							}))),
			null
		);
	}
	componentDidUpdate() {
		const { projection: i } = this.props.visualElement;
		i &&
			(i.root.didUpdate(),
			dd.postRender(() => {
				!i.currentAnimation && i.isLead() && this.safeToRemove();
			}));
	}
	componentWillUnmount() {
		const {
				visualElement: i,
				layoutGroup: s,
				switchLayoutGroup: r,
			} = this.props,
			{ projection: u } = i;
		(sf = !0),
			u &&
				(u.scheduleCheckAfterUnmount(),
				s && s.group && s.group.remove(u),
				r && r.deregister && r.deregister(u));
	}
	safeToRemove() {
		const { safeToRemove: i } = this.props;
		i && i();
	}
	render() {
		return null;
	}
}
function C5(n) {
	const [i, s] = f5(),
		r = C.useContext(Xf);
	return f.jsx(k7, {
		...n,
		layoutGroup: r,
		switchLayoutGroup: C.useContext(y5),
		isPresent: i,
		safeToRemove: s,
	});
}
const H7 = {
	pan: { Feature: _7 },
	drag: { Feature: B7, ProjectionNode: c5, MeasureLayout: C5 },
};
function ng(n, i, s) {
	const { props: r } = n;
	n.animationState &&
		r.whileHover &&
		n.animationState.setActive("whileHover", s === "Start");
	const u = "onHover" + s,
		h = r[u];
	h && Ae.postRender(() => h(i, hs(i)));
}
class U7 extends Sa {
	mount() {
		const { current: i } = this.node;
		i &&
			(this.unmount = u9(
				i,
				(s, r) => (ng(this.node, r, "Start"), (u) => ng(this.node, u, "End")),
			));
	}
	unmount() {}
}
class G7 extends Sa {
	constructor() {
		super(...arguments), (this.isActive = !1);
	}
	onFocus() {
		let i = !1;
		try {
			i = this.node.current.matches(":focus-visible");
		} catch {
			i = !0;
		}
		!i ||
			!this.node.animationState ||
			(this.node.animationState.setActive("whileFocus", !0),
			(this.isActive = !0));
	}
	onBlur() {
		!this.isActive ||
			!this.node.animationState ||
			(this.node.animationState.setActive("whileFocus", !1),
			(this.isActive = !1));
	}
	mount() {
		this.unmount = cs(
			ss(this.node.current, "focus", () => this.onFocus()),
			ss(this.node.current, "blur", () => this.onBlur()),
		);
	}
	unmount() {}
}
function ag(n, i, s) {
	const { props: r } = n;
	if (n.current instanceof HTMLButtonElement && n.current.disabled) return;
	n.animationState &&
		r.whileTap &&
		n.animationState.setActive("whileTap", s === "Start");
	const u = "onTap" + (s === "End" ? "" : s),
		h = r[u];
	h && Ae.postRender(() => h(i, hs(i)));
}
class Y7 extends Sa {
	mount() {
		const { current: i } = this.node;
		if (!i) return;
		const { globalTapTarget: s, propagate: r } = this.node.props;
		this.unmount = p9(
			i,
			(u, h) => (
				ag(this.node, h, "Start"),
				(d, { success: g }) => ag(this.node, d, g ? "End" : "Cancel")
			),
			{ useGlobalTarget: s, stopPropagation: r?.tap === !1 },
		);
	}
	unmount() {}
}
const Vf = new WeakMap(),
	rf = new WeakMap(),
	q7 = (n) => {
		const i = Vf.get(n.target);
		i && i(n);
	},
	Z7 = (n) => {
		n.forEach(q7);
	};
function X7({ root: n, ...i }) {
	const s = n || document;
	rf.has(s) || rf.set(s, {});
	const r = rf.get(s),
		u = JSON.stringify(i);
	return r[u] || (r[u] = new IntersectionObserver(Z7, { root: n, ...i })), r[u];
}
function K7(n, i, s) {
	const r = X7(i);
	return (
		Vf.set(n, s),
		r.observe(n),
		() => {
			Vf.delete(n), r.unobserve(n);
		}
	);
}
const Q7 = { some: 0, all: 1 };
class P7 extends Sa {
	constructor() {
		super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
	}
	startObserver() {
		this.unmount();
		const { viewport: i = {} } = this.node.getProps(),
			{ root: s, margin: r, amount: u = "some", once: h } = i,
			d = {
				root: s ? s.current : void 0,
				rootMargin: r,
				threshold: typeof u == "number" ? u : Q7[u],
			},
			g = (p) => {
				const { isIntersecting: x } = p;
				if (
					this.isInView === x ||
					((this.isInView = x), h && !x && this.hasEnteredView)
				)
					return;
				x && (this.hasEnteredView = !0),
					this.node.animationState &&
						this.node.animationState.setActive("whileInView", x);
				const { onViewportEnter: y, onViewportLeave: v } = this.node.getProps(),
					w = x ? y : v;
				w && w(p);
			};
		return K7(this.node.current, d, g);
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver > "u") return;
		const { props: i, prevProps: s } = this.node;
		["amount", "margin", "root"].some(F7(i, s)) && this.startObserver();
	}
	unmount() {}
}
function F7({ viewport: n = {} }, { viewport: i = {} } = {}) {
	return (s) => n[s] !== i[s];
}
const J7 = {
		inView: { Feature: P7 },
		tap: { Feature: Y7 },
		focus: { Feature: G7 },
		hover: { Feature: U7 },
	},
	W7 = { layout: { ProjectionNode: c5, MeasureLayout: C5 } },
	$7 = { ...w7, ...J7, ...H7, ...W7 },
	P = g7($7, x7),
	I7 = 50,
	ig = () => ({
		current: 0,
		offset: [],
		progress: 0,
		scrollLength: 0,
		targetOffset: 0,
		targetLength: 0,
		containerLength: 0,
		velocity: 0,
	}),
	eb = () => ({ time: 0, x: ig(), y: ig() }),
	tb = {
		x: { length: "Width", position: "Left" },
		y: { length: "Height", position: "Top" },
	};
function lg(n, i, s, r) {
	const u = s[i],
		{ length: h, position: d } = tb[i],
		g = u.current,
		p = s.time;
	(u.current = n[`scroll${d}`]),
		(u.scrollLength = n[`scroll${h}`] - n[`client${h}`]),
		(u.offset.length = 0),
		(u.offset[0] = 0),
		(u.offset[1] = u.scrollLength),
		(u.progress = Ki(0, u.scrollLength, u.current));
	const x = r - p;
	u.velocity = x > I7 ? 0 : Pf(u.current - g, x);
}
function nb(n, i, s) {
	lg(n, "x", i, s), lg(n, "y", i, s), (i.time = s);
}
function ab(n, i) {
	const s = { x: 0, y: 0 };
	let r = n;
	for (; r && r !== i; )
		if (no(r))
			(s.x += r.offsetLeft), (s.y += r.offsetTop), (r = r.offsetParent);
		else if (r.tagName === "svg") {
			const u = r.getBoundingClientRect();
			r = r.parentElement;
			const h = r.getBoundingClientRect();
			(s.x += u.left - h.left), (s.y += u.top - h.top);
		} else if (r instanceof SVGGraphicsElement) {
			const { x: u, y: h } = r.getBBox();
			(s.x += u), (s.y += h);
			let d = null,
				g = r.parentNode;
			for (; !d; ) g.tagName === "svg" && (d = g), (g = r.parentNode);
			r = d;
		} else break;
	return s;
}
const Bf = { start: 0, center: 0.5, end: 1 };
function sg(n, i, s = 0) {
	let r = 0;
	if ((n in Bf && (n = Bf[n]), typeof n == "string")) {
		const u = parseFloat(n);
		n.endsWith("px")
			? (r = u)
			: n.endsWith("%")
				? (n = u / 100)
				: n.endsWith("vw")
					? (r = (u / 100) * document.documentElement.clientWidth)
					: n.endsWith("vh")
						? (r = (u / 100) * document.documentElement.clientHeight)
						: (n = u);
	}
	return typeof n == "number" && (r = i * n), s + r;
}
const ib = [0, 0];
function lb(n, i, s, r) {
	let u = Array.isArray(n) ? n : ib,
		h = 0,
		d = 0;
	return (
		typeof n == "number"
			? (u = [n, n])
			: typeof n == "string" &&
				((n = n.trim()),
				n.includes(" ") ? (u = n.split(" ")) : (u = [n, Bf[n] ? n : "0"])),
		(h = sg(u[0], s, r)),
		(d = sg(u[1], i)),
		h - d
	);
}
const sb = {
		All: [
			[0, 0],
			[1, 1],
		],
	},
	rb = { x: 0, y: 0 };
function ob(n) {
	return "getBBox" in n && n.tagName !== "svg"
		? n.getBBox()
		: { width: n.clientWidth, height: n.clientHeight };
}
function ub(n, i, s) {
	const { offset: r = sb.All } = s,
		{ target: u = n, axis: h = "y" } = s,
		d = h === "y" ? "height" : "width",
		g = u !== n ? ab(u, n) : rb,
		p = u === n ? { width: n.scrollWidth, height: n.scrollHeight } : ob(u),
		x = { width: n.clientWidth, height: n.clientHeight };
	i[h].offset.length = 0;
	let y = !i[h].interpolate;
	const v = r.length;
	for (let w = 0; w < v; w++) {
		const A = lb(r[w], x[d], p[d], g[h]);
		!y && A !== i[h].interpolatorOffsets[w] && (y = !0), (i[h].offset[w] = A);
	}
	y &&
		((i[h].interpolate = nd(i[h].offset, c2(r), { clamp: !1 })),
		(i[h].interpolatorOffsets = [...i[h].offset])),
		(i[h].progress = un(0, 1, i[h].interpolate(i[h].current)));
}
function cb(n, i = n, s) {
	if (((s.x.targetOffset = 0), (s.y.targetOffset = 0), i !== n)) {
		let r = i;
		for (; r && r !== n; )
			(s.x.targetOffset += r.offsetLeft),
				(s.y.targetOffset += r.offsetTop),
				(r = r.offsetParent);
	}
	(s.x.targetLength = i === n ? i.scrollWidth : i.clientWidth),
		(s.y.targetLength = i === n ? i.scrollHeight : i.clientHeight),
		(s.x.containerLength = n.clientWidth),
		(s.y.containerLength = n.clientHeight);
}
function fb(n, i, s, r = {}) {
	return {
		measure: (u) => {
			cb(n, r.target, s), nb(n, s, u), (r.offset || r.target) && ub(n, s, r);
		},
		notify: () => i(s),
	};
}
const _i = new WeakMap(),
	rg = new WeakMap(),
	of = new WeakMap(),
	og = new WeakMap(),
	_r = new WeakMap(),
	ug = (n) => (n === document.scrollingElement ? window : n);
function j5(
	n,
	{
		container: i = document.scrollingElement,
		trackContentSize: s = !1,
		...r
	} = {},
) {
	if (!i) return Mt;
	let u = of.get(i);
	u || ((u = new Set()), of.set(i, u));
	const h = eb(),
		d = fb(i, n, h, r);
	if ((u.add(d), !_i.has(i))) {
		const p = () => {
				for (const w of u) w.measure(ot.timestamp);
				Ae.preUpdate(x);
			},
			x = () => {
				for (const w of u) w.notify();
			},
			y = () => Ae.read(p);
		_i.set(i, y);
		const v = ug(i);
		window.addEventListener("resize", y),
			i !== document.documentElement && rg.set(i, Rf(i, y)),
			v.addEventListener("scroll", y),
			y();
	}
	if (s && !_r.has(i)) {
		const p = _i.get(i),
			x = { width: i.scrollWidth, height: i.scrollHeight };
		og.set(i, x);
		const y = () => {
				const w = i.scrollWidth,
					A = i.scrollHeight;
				(x.width !== w || x.height !== A) &&
					(p(), (x.width = w), (x.height = A));
			},
			v = Ae.read(y, !0);
		_r.set(i, v);
	}
	const g = _i.get(i);
	return (
		Ae.read(g, !1, !0),
		() => {
			Wt(g);
			const p = of.get(i);
			if (!p || (p.delete(d), p.size)) return;
			const x = _i.get(i);
			_i.delete(i),
				x &&
					(ug(i).removeEventListener("scroll", x),
					rg.get(i)?.(),
					window.removeEventListener("resize", x));
			const y = _r.get(i);
			y && (Wt(y), _r.delete(i)), og.delete(i);
		}
	);
}
function T5(n) {
	return typeof window < "u" && !n && p2();
}
const cg = new Map();
function db(n) {
	const i = { value: 0 },
		s = j5((r) => {
			i.value = r[n.axis].progress * 100;
		}, n);
	return { currentTime: i, cancel: s };
}
function A5({ source: n, container: i, ...s }) {
	const { axis: r } = s;
	n && (i = n);
	const u = cg.get(i) ?? new Map();
	cg.set(i, u);
	const h = s.target ?? "self",
		d = u.get(h) ?? {},
		g = r + (s.offset ?? []).join(",");
	return (
		d[g] ||
			(d[g] = T5(s.target)
				? new ScrollTimeline({ source: i, axis: r })
				: db({ container: i, ...s })),
		d[g]
	);
}
function hb(n, i) {
	const s = A5(i);
	return n.attachTimeline({
		timeline: i.target ? void 0 : s,
		observe: (r) => (
			r.pause(),
			k2((u) => {
				r.time = r.iterationDuration * u;
			}, s)
		),
	});
}
function mb(n) {
	return n.length === 2;
}
function pb(n, i) {
	return mb(n)
		? j5((s) => {
				n(s[i.axis].progress, s);
			}, i)
		: k2(n, A5(i));
}
function E5(
	n,
	{ axis: i = "y", container: s = document.scrollingElement, ...r } = {},
) {
	if (!s) return Mt;
	const u = { axis: i, container: s, ...r };
	return typeof n == "function" ? pb(n, u) : hb(n, u);
}
const gb = () => ({
		scrollX: sn(0),
		scrollY: sn(0),
		scrollXProgress: sn(0),
		scrollYProgress: sn(0),
	}),
	kr = (n) => (n ? !n.current : !1);
function fg(n, i, s) {
	return {
		factory: (r) => E5(r, { ...i, axis: n, container: s }),
		times: [0, 1],
		keyframes: [0, 1],
		ease: (r) => r,
		duration: 1,
	};
}
function xb({ container: n, target: i, ...s } = {}) {
	const r = wa(gb);
	if (!i && T5()) {
		const g = n?.current || void 0;
		(r.scrollXProgress.accelerate = fg("x", s, g)),
			(r.scrollYProgress.accelerate = fg("y", s, g));
	}
	const u = C.useRef(null),
		h = C.useRef(!1),
		d = C.useCallback(
			() => (
				(u.current = E5(
					(g, { x: p, y: x }) => {
						r.scrollX.set(p.current),
							r.scrollXProgress.set(p.progress),
							r.scrollY.set(x.current),
							r.scrollYProgress.set(x.progress);
					},
					{
						...s,
						container: n?.current || void 0,
						target: i?.current || void 0,
					},
				)),
				() => {
					u.current?.();
				}
			),
			[n, i, JSON.stringify(s.offset)],
		);
	return (
		fo(() => {
			if (((h.current = !1), kr(n) || kr(i))) {
				h.current = !0;
				return;
			} else return d();
		}, [d]),
		C.useEffect(() => {
			if (h.current) return ns(!kr(n)), ns(!kr(i)), d();
		}, [d]),
		r
	);
}
function yb(n) {
	const i = wa(() => sn(n)),
		{ isStatic: s } = C.useContext(go);
	if (s) {
		const [, r] = C.useState(n);
		C.useEffect(() => i.on("change", r), []);
	}
	return i;
}
function M5(n, i) {
	const s = yb(i()),
		r = () => s.set(i());
	return (
		r(),
		fo(() => {
			const u = () => Ae.preRender(r, !1, !0),
				h = n.map((d) => d.on("change", u));
			return () => {
				h.forEach((d) => d()), Wt(r);
			};
		}),
		s
	);
}
function vb(n) {
	($l.current = []), n();
	const i = M5($l.current, n);
	return ($l.current = void 0), i;
}
function Jr(n, i, s, r) {
	if (typeof n == "function") return vb(n);
	if (s !== void 0 && !Array.isArray(s) && typeof i != "function")
		return bb(n, i, s, r);
	const d = typeof i == "function" ? i : T9(i, s, r),
		g = Array.isArray(n) ? dg(n, d) : dg([n], ([x]) => d(x)),
		p = Array.isArray(n) ? void 0 : n.accelerate;
	return (
		p &&
			!p.isTransformed &&
			typeof i != "function" &&
			Array.isArray(s) &&
			r?.clamp !== !1 &&
			(g.accelerate = { ...p, times: i, keyframes: s, isTransformed: !0 }),
		g
	);
}
function dg(n, i) {
	const s = wa(() => []);
	return M5(n, () => {
		s.length = 0;
		const r = n.length;
		for (let u = 0; u < r; u++) s[u] = n[u].get();
		return i(s);
	});
}
function bb(n, i, s, r) {
	const u = wa(() => Object.keys(s)),
		h = wa(() => ({}));
	for (const d of u) h[d] = Jr(n, i, s[d], r);
	return h;
}
function it() {
	!xd.current && U2();
	const [n] = C.useState(ao.current);
	return n;
}
function ms() {
	return f.jsxs("span", {
		className: "relative overflow-hidden inline-flex w-5 h-5",
		children: [
			f.jsx(P.span, {
				className: "absolute inset-0 flex items-center justify-center",
				initial: { x: 0, y: 0 },
				variants: {
					hover: {
						x: "100%",
						y: "-100%",
						transition: { duration: 0.3, ease: "easeInOut" },
					},
				},
				children: f.jsx("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: f.jsx("path", {
						fillRule: "evenodd",
						clipRule: "evenodd",
						d: "M15.3581 4.46332C15.2893 4.41722 15.2113 4.38389 15.1273 4.36675L15.1156 4.36557C15.0812 4.3593 15.0464 4.35582 15.0115 4.35512L14.9968 4.35364L7.50083 4.35156C7.14186 4.35144 6.85049 4.64175 6.85021 5.00053C6.85008 5.35922 7.14069 5.6504 7.49945 5.65087L13.4311 5.65267L4.54155 14.5422C4.28781 14.7961 4.28843 15.2075 4.54224 15.4613C4.79605 15.7151 5.20749 15.7158 5.46134 15.462L14.3465 6.57691L14.3482 12.4967C14.3484 12.8556 14.6405 13.1465 14.9996 13.1464C15.3584 13.146 15.6489 12.8548 15.6488 12.4961L15.6467 5.0544C15.6605 4.87194 15.5976 4.68478 15.4582 4.54536C15.427 4.51418 15.3935 4.48684 15.3581 4.46332Z",
						fill: "currentColor",
					}),
				}),
			}),
			f.jsx(P.span, {
				className: "absolute inset-0 flex items-center justify-center",
				initial: { x: "-100%", y: "100%" },
				variants: {
					hover: {
						x: 0,
						y: 0,
						transition: { duration: 0.3, ease: "easeInOut" },
					},
				},
				children: f.jsx("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: f.jsx("path", {
						fillRule: "evenodd",
						clipRule: "evenodd",
						d: "M15.3581 4.46332C15.2893 4.41722 15.2113 4.38389 15.1273 4.36675L15.1156 4.36557C15.0812 4.3593 15.0464 4.35582 15.0115 4.35512L14.9968 4.35364L7.50083 4.35156C7.14186 4.35144 6.85049 4.64175 6.85021 5.00053C6.85008 5.35922 7.14069 5.6504 7.49945 5.65087L13.4311 5.65267L4.54155 14.5422C4.28781 14.7961 4.28843 15.2075 4.54224 15.4613C4.79605 15.7151 5.20749 15.7158 5.46134 15.462L14.3465 6.57691L14.3482 12.4967C14.3484 12.8556 14.6405 13.1465 14.9996 13.1464C15.3584 13.146 15.6489 12.8548 15.6488 12.4961L15.6467 5.0544C15.6605 4.87194 15.5976 4.68478 15.4582 4.54536C15.427 4.51418 15.3935 4.48684 15.3581 4.46332Z",
						fill: "currentColor",
					}),
				}),
			}),
		],
	});
}
const wb = [0.16, 1, 0.3, 1],
	ce = (n, i, s = 0.6) => ({
		variants: {
			hidden: { opacity: 0, y: 24 },
			visible: {
				opacity: 1,
				y: 0,
				transition: { duration: s, ease: wb, delay: i },
			},
		},
	}),
	Ie = (n, i = 0, s = 0.12) => {
		const r = !!n;
		return {
			variants: {
				hidden: {},
				visible: { transition: { staggerChildren: s, delayChildren: i } },
			},
			initial: r ? !1 : "hidden",
			whileInView: r ? void 0 : "visible",
			viewport: r ? void 0 : { once: !0, amount: 0.2 },
		};
	},
	Sb = P(_e);
function Cb() {
	const n = it();
	return f.jsx(P.section, {
		className:
			"bg-[url('/images/cta-bg.png')] py-16 relative overflow-hidden  bg-no-repeat bg-cover rounded-xl",
		...ce(),
		children: f.jsxs(P.div, {
			className: "max-w-3xl text-center flex-col items-center flex mx-auto",
			...Ie(n),
			children: [
				f.jsxs("p", {
					className:
						"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
					children: [
						f.jsx("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 20 20",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: f.jsx("path", {
								d: "M10 0C10.1952 5.43992 14.5601 9.80475 20 10C14.5601 10.1952 10.1952 14.5601 10 20C9.80475 14.5601 5.43992 10.1952 0 10C5.43992 9.80475 9.80475 5.43992 10 0Z",
								fill: "black",
							}),
						}),
						"Next-Generation AI Platform",
					],
				}),
				f.jsx("h2", {
					className:
						"text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-neutral-900 xl:leading-none mb-11",
					children: "Start Using Your AI Business Assistant Today",
				}),
				f.jsxs(P.div, {
					className:
						"flex flex-col sm:flex-row items-center justify-center gap-4 ",
					...ce(n, 0.1),
					children: [
						f.jsxs(Sb, {
							to: "/about",
							className:
								"py-3 px-5 inline-flex text-white h-11 font-mono text-sm uppercase gap-2 items-center rounded-lg bg-black transition-colors duration-300 hover:bg-neutral-700",
							initial: "initial",
							whileHover: "hover",
							children: ["Get Started free", f.jsx(ms, {})],
						}),
						f.jsx(_e, {
							to: "/contacts",
							className:
								"py-3 bg-white text-neutral-900 h-11 border border-neutral-900 hover:bg-neutral-100 transition-colors duration-300 px-5 rounded-lg text-sm font-mono uppercase",
							children: "talk to sale",
						}),
					],
				}),
			],
		}),
	});
}
function jb() {
	const { pathname: n } = wn();
	return f.jsxs("footer", {
		className: "bg-black p-3 rounded-[22px] mt-3 ",
		children: [
			n !== "/pricing" && f.jsx(Cb, {}),
			f.jsxs("div", {
				className: "px-4 sm:px-6  lg:px-10",
				children: [
					f.jsxs("div", {
						className: ` ${n !== "/pricing" ? "pt-12 lg:pt-16 2xl:pt-20" : "pt-10"} grid grid-cols-1 lg:grid-cols-12`,
						children: [
							f.jsxs("div", {
								className: "lg:col-span-4 2xl:pr-40",
								children: [
									f.jsx(_e, {
										to: "/",
										className: "mb-7 block",
										children: f.jsx("img", {
											src: "/images/logo/logo-white.svg",
											alt: "",
										}),
									}),
									f.jsx("p", {
										className: "text-neutral-400 text-base mb-10",
										children:
											"A modern AI platform helping businesses operate through automation, intelligent assistance, and smarter workflows.",
									}),
									f.jsxs("div", {
										className: "flex gap-8 mb-10",
										children: [
											f.jsx("a", {
												href: "http://",
												target: "_blank",
												rel: "noopener noreferrer",
												className:
													"text-white hover:text-white/60 transition-colors",
												children: f.jsx("svg", {
													width: "20",
													height: "20",
													viewBox: "0 0 20 20",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: f.jsx("path", {
														d: "M14.793 2.46875H17.3499L11.7652 8.85L18.3346 17.5347H13.1923L9.16172 12.2688L4.55477 17.5347H1.99366L7.96589 10.7076L1.66797 2.46875H6.94089L10.5805 7.28194L14.793 2.46875ZM13.8951 16.0062H15.311L6.16936 3.91736H4.64852L13.8951 16.0062Z",
														fill: "currentColor",
													}),
												}),
											}),
											f.jsx("a", {
												href: "http://",
												target: "_blank",
												rel: "noopener noreferrer",
												className:
													"text-white hover:text-white/60 transition-colors",
												children: f.jsxs("svg", {
													width: "20",
													height: "20",
													viewBox: "0 0 20 20",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: [
														f.jsx("g", {
															clipPath: "url(#clip0_19242_435)",
															children: f.jsx("path", {
																d: "M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z",
																fill: "currentColor",
															}),
														}),
														f.jsx("defs", {
															children: f.jsx("clipPath", {
																id: "clip0_19242_435",
																children: f.jsx("rect", {
																	width: "20",
																	height: "20",
																	rx: "10",
																	fill: "currentColor",
																}),
															}),
														}),
													],
												}),
											}),
											f.jsx("a", {
												href: "http://",
												target: "_blank",
												rel: "noopener noreferrer",
												className:
													"text-white hover:text-white/60 transition-colors",
												children: f.jsxs("svg", {
													width: "20",
													height: "20",
													viewBox: "0 0 20 20",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: [
														f.jsxs("g", {
															clipPath: "url(#clip0_19242_437)",
															children: [
																f.jsx("path", {
																	d: "M19.9805 5.88005C19.9336 4.81738 19.7618 4.0868 19.5156 3.45374C19.2616 2.78176 18.8709 2.18014 18.359 1.68002C17.8589 1.1721 17.2533 0.777435 16.5891 0.527447C15.9524 0.281274 15.2257 0.109427 14.163 0.0625732C13.0924 0.0117516 12.7525 0 10.0371 0C7.32174 0 6.98186 0.0117516 5.91521 0.0586052C4.85253 0.105459 4.12195 0.277459 3.48905 0.523479C2.81692 0.777435 2.2153 1.16814 1.71517 1.68002C1.20726 2.18014 0.812743 2.78573 0.562603 3.44992C0.316431 4.0868 0.144583 4.81341 0.0977295 5.87609C0.0469078 6.9467 0.0351562 7.28658 0.0351562 10.002C0.0351562 12.7173 0.0469078 13.0572 0.0937615 14.1239C0.140615 15.1865 0.312615 15.9171 0.558788 16.5502C0.812743 17.2221 1.20726 17.8238 1.71517 18.3239C2.2153 18.8318 2.82089 19.2265 3.48508 19.4765C4.12195 19.7226 4.84857 19.8945 5.9114 19.9413C6.97789 19.9883 7.31792 19.9999 10.0333 19.9999C12.7487 19.9999 13.0885 19.9883 14.1552 19.9413C15.2179 19.8945 15.9485 19.7226 16.5814 19.4765C17.9255 18.9568 18.9881 17.8941 19.5078 16.5502C19.7538 15.9133 19.9258 15.1865 19.9727 14.1239C20.0195 13.0572 20.0313 12.7173 20.0313 10.002C20.0313 7.28658 20.0273 6.9467 19.9805 5.88005ZM18.1794 14.0457C18.1364 15.0225 17.9723 15.5499 17.8356 15.9015C17.4995 16.7728 16.808 17.4643 15.9367 17.8004C15.5851 17.9372 15.0538 18.1012 14.0809 18.1441C13.026 18.1911 12.7096 18.2027 10.0411 18.2027C7.37256 18.2027 7.05221 18.1911 6.00113 18.1441C5.02438 18.1012 4.49693 17.9372 4.1453 17.8004C3.71172 17.6402 3.31705 17.3862 2.9967 17.0541C2.66461 16.7298 2.41065 16.3391 2.2504 15.9055C2.11366 15.5539 1.94959 15.0225 1.90671 14.0497C1.8597 12.9948 1.8481 12.6783 1.8481 10.0097C1.8481 7.34122 1.8597 7.02087 1.90671 5.96995C1.94959 4.99319 2.11366 4.46575 2.2504 4.11412C2.41065 3.68038 2.66461 3.28586 3.00067 2.96536C3.32483 2.63327 3.71553 2.37931 4.14927 2.21921C4.5009 2.08247 5.03232 1.9184 6.0051 1.87537C7.06 1.82851 7.37653 1.81676 10.0449 1.81676C12.7174 1.81676 13.0338 1.82851 14.0848 1.87537C15.0616 1.9184 15.589 2.08247 15.9407 2.21921C16.3743 2.37931 16.7689 2.63327 17.0893 2.96536C17.4214 3.28967 17.6753 3.68038 17.8356 4.11412C17.9723 4.46575 18.1364 4.99701 18.1794 5.96995C18.2263 7.02484 18.238 7.34122 18.238 10.0097C18.238 12.6783 18.2263 12.9908 18.1794 14.0457Z",
																	fill: "currentColor",
																}),
																f.jsx("path", {
																	d: "M10.0362 4.86328C7.19976 4.86328 4.89844 7.16445 4.89844 10.001C4.89844 12.8376 7.19976 15.1387 10.0362 15.1387C12.8727 15.1387 15.1739 12.8376 15.1739 10.001C15.1739 7.16445 12.8727 4.86328 10.0362 4.86328ZM10.0362 13.3337C8.19605 13.3337 6.70345 11.8413 6.70345 10.001C6.70345 8.16074 8.19605 6.66829 10.0362 6.66829C11.8764 6.66829 13.3689 8.16074 13.3689 10.001C13.3689 11.8413 11.8764 13.3337 10.0362 13.3337Z",
																	fill: "currentColor",
																}),
																f.jsx("path", {
																	d: "M16.5787 4.66036C16.5787 5.32272 16.0416 5.85978 15.3791 5.85978C14.7167 5.85978 14.1797 5.32272 14.1797 4.66036C14.1797 3.99785 14.7167 3.46094 15.3791 3.46094C16.0416 3.46094 16.5787 3.99785 16.5787 4.66036Z",
																	fill: "currentColor",
																}),
															],
														}),
														f.jsx("defs", {
															children: f.jsx("clipPath", {
																id: "clip0_19242_437",
																children: f.jsx("rect", {
																	width: "20",
																	height: "20",
																	fill: "currentColor",
																}),
															}),
														}),
													],
												}),
											}),
											f.jsx("a", {
												href: "http://",
												target: "_blank",
												rel: "noopener noreferrer",
												className:
													"text-white hover:text-white/60 transition-colors",
												children: f.jsx("svg", {
													width: "20",
													height: "20",
													viewBox: "0 0 20 20",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: f.jsx("path", {
														fillRule: "evenodd",
														clipRule: "evenodd",
														d: "M17.0422 17.0422H14.0778V12.4C14.0778 11.2944 14.0589 9.87 12.5367 9.87C10.9922 9.87 10.7578 11.0767 10.7578 12.3222V17.0422H7.79333V7.49778H10.6367V8.80222H10.6778C11.0733 8.05222 12.0411 7.26111 13.4844 7.26111C16.4878 7.26111 17.0433 9.23667 17.0433 11.8078V17.0422H17.0422ZM4.45 6.19444C4.22413 6.19466 4.00042 6.15039 3.79166 6.06416C3.58289 5.97792 3.39316 5.85141 3.23329 5.69185C3.07342 5.53228 2.94654 5.3428 2.8599 5.1342C2.77326 4.9256 2.72855 4.70198 2.72833 4.47611C2.72811 4.25024 2.77239 4.02653 2.85862 3.81777C2.94486 3.609 3.07137 3.41927 3.23093 3.2594C3.39049 3.09953 3.57998 2.97265 3.78858 2.88601C3.99717 2.79937 4.22079 2.75466 4.44667 2.75444C4.90284 2.754 5.3405 2.93479 5.66338 3.25704C5.98625 3.57929 6.16789 4.01661 6.16833 4.47278C6.16878 4.92895 5.98799 5.36661 5.66574 5.68949C5.34349 6.01236 4.90617 6.194 4.45 6.19444ZM2.96444 17.0422H5.93333V7.49778H2.96333L2.96444 17.0422ZM18.52 0H1.47556C0.661111 0 0 0.645556 0 1.44222V18.5567C0 19.3533 0.661111 20 1.47556 20H18.52C19.3356 20 20 19.3533 20 18.5567V1.44222C20 0.645556 19.3356 0 18.52 0Z",
														fill: "currentColor",
													}),
												}),
											}),
										],
									}),
								],
							}),
							f.jsx("div", {
								className:
									"lg:col-span-8 lg:ml-10 lg:border-l border-white/12 pb-8 sm:pb-10  lg:pb-16 2xl:pb-25",
								children: f.jsxs("div", {
									className:
										"grid grid-cols-2 sm:grid-cols-3 gap-y-8  pl-0 lg:pl-10 xl:pl-30 2xl:pl-40",
									children: [
										f.jsxs("div", {
											children: [
												f.jsx("h3", {
													className:
														"mb-5 text-white -tracking-[0.2px] text-xl font-medium",
													children: "Main pages",
												}),
												f.jsx("ul", {
													className: "space-y-2",
													children: [
														{ label: "Home", to: "/" },
														{ label: "About", to: "/about" },
														{ label: "Features", to: "/features" },
														{ label: "Pricing", to: "/pricing" },
														{ label: "Contacts", to: "/contacts" },
														{ label: "Blogs", to: "/blog" },
													].map((i) =>
														f.jsx(
															"li",
															{
																children: f.jsx(_e, {
																	to: i.to,
																	className:
																		"text-neutral-400 text-base hover:text-white transition-colors",
																	children: i.label,
																}),
															},
															i.to,
														),
													),
												}),
											],
										}),
										f.jsxs("div", {
											children: [
												f.jsx("h3", {
													className:
														"mb-5 text-white -tracking-[0.2px] text-xl font-medium",
													children: "Inner pages",
												}),
												f.jsx("ul", {
													className: "space-y-2",
													children: [
														{ label: "Pricing Details", to: "/pricing" },
														{ label: "Blog Details", to: "/blog-details" },
														{ label: "404 Page", to: "/404" },
													].map((i) =>
														f.jsx(
															"li",
															{
																children: f.jsx(_e, {
																	to: i.to,
																	className:
																		"text-neutral-400 text-base hover:text-white transition-colors",
																	children: i.label,
																}),
															},
															i.to,
														),
													),
												}),
											],
										}),
										f.jsxs("div", {
											children: [
												f.jsx("h3", {
													className:
														"mb-5 text-white -tracking-[0.2px] text-xl font-medium",
													children: "Legal pages",
												}),
												f.jsx("ul", {
													className: "space-y-2",
													children: [
														{ label: "Privacy policy", to: "/privacy-policy" },
														{ label: "Terms and conditions", to: "/terms" },
													].map((i) =>
														f.jsx(
															"li",
															{
																children: f.jsx(_e, {
																	to: i.to,
																	className:
																		"text-neutral-400 text-base hover:text-white transition-colors",
																	children: i.label,
																}),
															},
															i.to,
														),
													),
												}),
											],
										}),
									],
								}),
							}),
						],
					}),
					f.jsxs("div", {
						className:
							"pt-8 sm:pt-10 pb-6 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center border-t border-white/12",
						children: [
							f.jsxs("p", {
								className: "text-neutral-400",
								children: [
									" ",
									"©SynthAI. ",
									new Date().getFullYear(),
									" All Rights Reserved",
								],
							}),
							f.jsxs("p", {
								className: "text-neutral-400",
								children: [
									"Designed with love by",
									" ",
									f.jsx("a", {
										href: "#",
										className: "hover:text-white",
										children: "Pimjo",
									}),
									".",
								],
							}),
						],
					}),
				],
			}),
		],
	});
}
function Tb() {
	return f.jsx("div", {
		className: "bg-neutral-100 antialiased overflow-clip",
		children: f.jsxs("div", {
			className: "p-3  mx-auto",
			children: [f.jsx("main", { children: f.jsx(Ey, {}) }), f.jsx(jb, {})],
		}),
	});
}
function N5(n) {
	var i,
		s,
		r = "";
	if (typeof n == "string" || typeof n == "number") r += n;
	else if (typeof n == "object")
		if (Array.isArray(n)) {
			var u = n.length;
			for (i = 0; i < u; i++)
				n[i] && (s = N5(n[i])) && (r && (r += " "), (r += s));
		} else for (s in n) n[s] && (r && (r += " "), (r += s));
	return r;
}
function Ab() {
	for (var n, i, s = 0, r = "", u = arguments.length; s < u; s++)
		(n = arguments[s]) && (i = N5(n)) && (r && (r += " "), (r += i));
	return r;
}
const Eb = (n, i) => {
		const s = new Array(n.length + i.length);
		for (let r = 0; r < n.length; r++) s[r] = n[r];
		for (let r = 0; r < i.length; r++) s[n.length + r] = i[r];
		return s;
	},
	Mb = (n, i) => ({ classGroupId: n, validator: i }),
	R5 = (n = new Map(), i = null, s) => ({
		nextPart: n,
		validators: i,
		classGroupId: s,
	}),
	oo = "-",
	hg = [],
	Nb = "arbitrary..",
	Rb = (n) => {
		const i = Lb(n),
			{ conflictingClassGroups: s, conflictingClassGroupModifiers: r } = n;
		return {
			getClassGroupId: (d) => {
				if (d.startsWith("[") && d.endsWith("]")) return Db(d);
				const g = d.split(oo),
					p = g[0] === "" && g.length > 1 ? 1 : 0;
				return D5(g, p, i);
			},
			getConflictingClassGroupIds: (d, g) => {
				if (g) {
					const p = r[d],
						x = s[d];
					return p ? (x ? Eb(x, p) : p) : x || hg;
				}
				return s[d] || hg;
			},
		};
	},
	D5 = (n, i, s) => {
		if (n.length - i === 0) return s.classGroupId;
		const u = n[i],
			h = s.nextPart.get(u);
		if (h) {
			const x = D5(n, i + 1, h);
			if (x) return x;
		}
		const d = s.validators;
		if (d === null) return;
		const g = i === 0 ? n.join(oo) : n.slice(i).join(oo),
			p = d.length;
		for (let x = 0; x < p; x++) {
			const y = d[x];
			if (y.validator(g)) return y.classGroupId;
		}
	},
	Db = (n) =>
		n.slice(1, -1).indexOf(":") === -1
			? void 0
			: (() => {
					const i = n.slice(1, -1),
						s = i.indexOf(":"),
						r = i.slice(0, s);
					return r ? Nb + r : void 0;
				})(),
	Lb = (n) => {
		const { theme: i, classGroups: s } = n;
		return zb(s, i);
	},
	zb = (n, i) => {
		const s = R5();
		for (const r in n) {
			const u = n[r];
			Sd(u, s, r, i);
		}
		return s;
	},
	Sd = (n, i, s, r) => {
		const u = n.length;
		for (let h = 0; h < u; h++) {
			const d = n[h];
			Ob(d, i, s, r);
		}
	},
	Ob = (n, i, s, r) => {
		if (typeof n == "string") {
			Vb(n, i, s);
			return;
		}
		if (typeof n == "function") {
			Bb(n, i, s, r);
			return;
		}
		_b(n, i, s, r);
	},
	Vb = (n, i, s) => {
		const r = n === "" ? i : L5(i, n);
		r.classGroupId = s;
	},
	Bb = (n, i, s, r) => {
		if (kb(n)) {
			Sd(n(r), i, s, r);
			return;
		}
		i.validators === null && (i.validators = []), i.validators.push(Mb(s, n));
	},
	_b = (n, i, s, r) => {
		const u = Object.entries(n),
			h = u.length;
		for (let d = 0; d < h; d++) {
			const [g, p] = u[d];
			Sd(p, L5(i, g), s, r);
		}
	},
	L5 = (n, i) => {
		let s = n;
		const r = i.split(oo),
			u = r.length;
		for (let h = 0; h < u; h++) {
			const d = r[h];
			let g = s.nextPart.get(d);
			g || ((g = R5()), s.nextPart.set(d, g)), (s = g);
		}
		return s;
	},
	kb = (n) => "isThemeGetter" in n && n.isThemeGetter === !0,
	Hb = (n) => {
		if (n < 1) return { get: () => {}, set: () => {} };
		let i = 0,
			s = Object.create(null),
			r = Object.create(null);
		const u = (h, d) => {
			(s[h] = d), i++, i > n && ((i = 0), (r = s), (s = Object.create(null)));
		};
		return {
			get(h) {
				let d = s[h];
				if (d !== void 0) return d;
				if ((d = r[h]) !== void 0) return u(h, d), d;
			},
			set(h, d) {
				h in s ? (s[h] = d) : u(h, d);
			},
		};
	},
	_f = "!",
	mg = ":",
	Ub = [],
	pg = (n, i, s, r, u) => ({
		modifiers: n,
		hasImportantModifier: i,
		baseClassName: s,
		maybePostfixModifierPosition: r,
		isExternal: u,
	}),
	Gb = (n) => {
		const { prefix: i, experimentalParseClassName: s } = n;
		let r = (u) => {
			const h = [];
			let d = 0,
				g = 0,
				p = 0,
				x;
			const y = u.length;
			for (let z = 0; z < y; z++) {
				const N = u[z];
				if (d === 0 && g === 0) {
					if (N === mg) {
						h.push(u.slice(p, z)), (p = z + 1);
						continue;
					}
					if (N === "/") {
						x = z;
						continue;
					}
				}
				N === "[" ? d++ : N === "]" ? d-- : N === "(" ? g++ : N === ")" && g--;
			}
			const v = h.length === 0 ? u : u.slice(p);
			let w = v,
				A = !1;
			v.endsWith(_f)
				? ((w = v.slice(0, -1)), (A = !0))
				: v.startsWith(_f) && ((w = v.slice(1)), (A = !0));
			const M = x && x > p ? x - p : void 0;
			return pg(h, A, w, M);
		};
		if (i) {
			const u = i + mg,
				h = r;
			r = (d) =>
				d.startsWith(u) ? h(d.slice(u.length)) : pg(Ub, !1, d, void 0, !0);
		}
		if (s) {
			const u = r;
			r = (h) => s({ className: h, parseClassName: u });
		}
		return r;
	},
	Yb = (n) => {
		const i = new Map();
		return (
			n.orderSensitiveModifiers.forEach((s, r) => {
				i.set(s, 1e6 + r);
			}),
			(s) => {
				const r = [];
				let u = [];
				for (let h = 0; h < s.length; h++) {
					const d = s[h],
						g = d[0] === "[",
						p = i.has(d);
					g || p
						? (u.length > 0 && (u.sort(), r.push(...u), (u = [])), r.push(d))
						: u.push(d);
				}
				return u.length > 0 && (u.sort(), r.push(...u)), r;
			}
		);
	},
	qb = (n) => ({
		cache: Hb(n.cacheSize),
		parseClassName: Gb(n),
		sortModifiers: Yb(n),
		...Rb(n),
	}),
	Zb = /\s+/,
	Xb = (n, i) => {
		const {
				parseClassName: s,
				getClassGroupId: r,
				getConflictingClassGroupIds: u,
				sortModifiers: h,
			} = i,
			d = [],
			g = n.trim().split(Zb);
		let p = "";
		for (let x = g.length - 1; x >= 0; x -= 1) {
			const y = g[x],
				{
					isExternal: v,
					modifiers: w,
					hasImportantModifier: A,
					baseClassName: M,
					maybePostfixModifierPosition: z,
				} = s(y);
			if (v) {
				p = y + (p.length > 0 ? " " + p : p);
				continue;
			}
			let N = !!z,
				V = r(N ? M.substring(0, z) : M);
			if (!V) {
				if (!N) {
					p = y + (p.length > 0 ? " " + p : p);
					continue;
				}
				if (((V = r(M)), !V)) {
					p = y + (p.length > 0 ? " " + p : p);
					continue;
				}
				N = !1;
			}
			const q = w.length === 0 ? "" : w.length === 1 ? w[0] : h(w).join(":"),
				k = A ? q + _f : q,
				K = k + V;
			if (d.indexOf(K) > -1) continue;
			d.push(K);
			const X = u(V, N);
			for (let ie = 0; ie < X.length; ++ie) {
				const J = X[ie];
				d.push(k + J);
			}
			p = y + (p.length > 0 ? " " + p : p);
		}
		return p;
	},
	Kb = (...n) => {
		let i = 0,
			s,
			r,
			u = "";
		for (; i < n.length; )
			(s = n[i++]) && (r = z5(s)) && (u && (u += " "), (u += r));
		return u;
	},
	z5 = (n) => {
		if (typeof n == "string") return n;
		let i,
			s = "";
		for (let r = 0; r < n.length; r++)
			n[r] && (i = z5(n[r])) && (s && (s += " "), (s += i));
		return s;
	},
	Qb = (n, ...i) => {
		let s, r, u, h;
		const d = (p) => {
				const x = i.reduce((y, v) => v(y), n());
				return (s = qb(x)), (r = s.cache.get), (u = s.cache.set), (h = g), g(p);
			},
			g = (p) => {
				const x = r(p);
				if (x) return x;
				const y = Xb(p, s);
				return u(p, y), y;
			};
		return (h = d), (...p) => h(Kb(...p));
	},
	Pb = [],
	nt = (n) => {
		const i = (s) => s[n] || Pb;
		return (i.isThemeGetter = !0), i;
	},
	O5 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
	V5 = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
	Fb = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
	Jb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	Wb =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
	$b = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
	Ib = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
	ew =
		/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
	xa = (n) => Fb.test(n),
	ge = (n) => !!n && !Number.isNaN(Number(n)),
	ya = (n) => !!n && Number.isInteger(Number(n)),
	uf = (n) => n.endsWith("%") && ge(n.slice(0, -1)),
	Gn = (n) => Jb.test(n),
	B5 = () => !0,
	tw = (n) => Wb.test(n) && !$b.test(n),
	Cd = () => !1,
	nw = (n) => Ib.test(n),
	aw = (n) => ew.test(n),
	iw = (n) => !ee(n) && !ae(n),
	lw = (n) => Ca(n, H5, Cd),
	ee = (n) => O5.test(n),
	Za = (n) => Ca(n, U5, tw),
	gg = (n) => Ca(n, hw, ge),
	sw = (n) => Ca(n, Y5, B5),
	rw = (n) => Ca(n, G5, Cd),
	xg = (n) => Ca(n, _5, Cd),
	ow = (n) => Ca(n, k5, aw),
	Hr = (n) => Ca(n, q5, nw),
	ae = (n) => V5.test(n),
	Pl = (n) => Wa(n, U5),
	uw = (n) => Wa(n, G5),
	yg = (n) => Wa(n, _5),
	cw = (n) => Wa(n, H5),
	fw = (n) => Wa(n, k5),
	Ur = (n) => Wa(n, q5, !0),
	dw = (n) => Wa(n, Y5, !0),
	Ca = (n, i, s) => {
		const r = O5.exec(n);
		return r ? (r[1] ? i(r[1]) : s(r[2])) : !1;
	},
	Wa = (n, i, s = !1) => {
		const r = V5.exec(n);
		return r ? (r[1] ? i(r[1]) : s) : !1;
	},
	_5 = (n) => n === "position" || n === "percentage",
	k5 = (n) => n === "image" || n === "url",
	H5 = (n) => n === "length" || n === "size" || n === "bg-size",
	U5 = (n) => n === "length",
	hw = (n) => n === "number",
	G5 = (n) => n === "family-name",
	Y5 = (n) => n === "number" || n === "weight",
	q5 = (n) => n === "shadow",
	mw = () => {
		const n = nt("color"),
			i = nt("font"),
			s = nt("text"),
			r = nt("font-weight"),
			u = nt("tracking"),
			h = nt("leading"),
			d = nt("breakpoint"),
			g = nt("container"),
			p = nt("spacing"),
			x = nt("radius"),
			y = nt("shadow"),
			v = nt("inset-shadow"),
			w = nt("text-shadow"),
			A = nt("drop-shadow"),
			M = nt("blur"),
			z = nt("perspective"),
			N = nt("aspect"),
			V = nt("ease"),
			q = nt("animate"),
			k = () => [
				"auto",
				"avoid",
				"all",
				"avoid-page",
				"page",
				"left",
				"right",
				"column",
			],
			K = () => [
				"center",
				"top",
				"bottom",
				"left",
				"right",
				"top-left",
				"left-top",
				"top-right",
				"right-top",
				"bottom-right",
				"right-bottom",
				"bottom-left",
				"left-bottom",
			],
			X = () => [...K(), ae, ee],
			ie = () => ["auto", "hidden", "clip", "visible", "scroll"],
			J = () => ["auto", "contain", "none"],
			H = () => [ae, ee, p],
			ne = () => [xa, "full", "auto", ...H()],
			Ce = () => [ya, "none", "subgrid", ae, ee],
			Be = () => ["auto", { span: ["full", ya, ae, ee] }, ya, ae, ee],
			Oe = () => [ya, "auto", ae, ee],
			ut = () => ["auto", "min", "max", "fr", ae, ee],
			et = () => [
				"start",
				"end",
				"center",
				"between",
				"around",
				"evenly",
				"stretch",
				"baseline",
				"center-safe",
				"end-safe",
			],
			Me = () => [
				"start",
				"end",
				"center",
				"stretch",
				"center-safe",
				"end-safe",
			],
			B = () => ["auto", ...H()],
			Z = () => [
				xa,
				"auto",
				"full",
				"dvw",
				"dvh",
				"lvw",
				"lvh",
				"svw",
				"svh",
				"min",
				"max",
				"fit",
				...H(),
			],
			$ = () => [
				xa,
				"screen",
				"full",
				"dvw",
				"lvw",
				"svw",
				"min",
				"max",
				"fit",
				...H(),
			],
			me = () => [
				xa,
				"screen",
				"full",
				"lh",
				"dvh",
				"lvh",
				"svh",
				"min",
				"max",
				"fit",
				...H(),
			],
			Q = () => [n, ae, ee],
			T = () => [...K(), yg, xg, { position: [ae, ee] }],
			Y = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
			F = () => ["auto", "cover", "contain", cw, lw, { size: [ae, ee] }],
			W = () => [uf, Pl, Za],
			se = () => ["", "none", "full", x, ae, ee],
			oe = () => ["", ge, Pl, Za],
			we = () => ["solid", "dashed", "dotted", "double"],
			lt = () => [
				"normal",
				"multiply",
				"screen",
				"overlay",
				"darken",
				"lighten",
				"color-dodge",
				"color-burn",
				"hard-light",
				"soft-light",
				"difference",
				"exclusion",
				"hue",
				"saturation",
				"color",
				"luminosity",
			],
			pe = () => [ge, uf, yg, xg],
			Zn = () => ["", "none", M, ae, ee],
			Sn = () => ["none", ge, ae, ee],
			Xn = () => ["none", ge, ae, ee],
			$a = () => [ge, ae, ee],
			Ht = () => [xa, "full", ...H()];
		return {
			cacheSize: 500,
			theme: {
				animate: ["spin", "ping", "pulse", "bounce"],
				aspect: ["video"],
				blur: [Gn],
				breakpoint: [Gn],
				color: [B5],
				container: [Gn],
				"drop-shadow": [Gn],
				ease: ["in", "out", "in-out"],
				font: [iw],
				"font-weight": [
					"thin",
					"extralight",
					"light",
					"normal",
					"medium",
					"semibold",
					"bold",
					"extrabold",
					"black",
				],
				"inset-shadow": [Gn],
				leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
				perspective: [
					"dramatic",
					"near",
					"normal",
					"midrange",
					"distant",
					"none",
				],
				radius: [Gn],
				shadow: [Gn],
				spacing: ["px", ge],
				text: [Gn],
				"text-shadow": [Gn],
				tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
			},
			classGroups: {
				aspect: [{ aspect: ["auto", "square", xa, ee, ae, N] }],
				container: ["container"],
				columns: [{ columns: [ge, ee, ae, g] }],
				"break-after": [{ "break-after": k() }],
				"break-before": [{ "break-before": k() }],
				"break-inside": [
					{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
				],
				"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
				box: [{ box: ["border", "content"] }],
				display: [
					"block",
					"inline-block",
					"inline",
					"flex",
					"inline-flex",
					"table",
					"inline-table",
					"table-caption",
					"table-cell",
					"table-column",
					"table-column-group",
					"table-footer-group",
					"table-header-group",
					"table-row-group",
					"table-row",
					"flow-root",
					"grid",
					"inline-grid",
					"contents",
					"list-item",
					"hidden",
				],
				sr: ["sr-only", "not-sr-only"],
				float: [{ float: ["right", "left", "none", "start", "end"] }],
				clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
				isolation: ["isolate", "isolation-auto"],
				"object-fit": [
					{ object: ["contain", "cover", "fill", "none", "scale-down"] },
				],
				"object-position": [{ object: X() }],
				overflow: [{ overflow: ie() }],
				"overflow-x": [{ "overflow-x": ie() }],
				"overflow-y": [{ "overflow-y": ie() }],
				overscroll: [{ overscroll: J() }],
				"overscroll-x": [{ "overscroll-x": J() }],
				"overscroll-y": [{ "overscroll-y": J() }],
				position: ["static", "fixed", "absolute", "relative", "sticky"],
				inset: [{ inset: ne() }],
				"inset-x": [{ "inset-x": ne() }],
				"inset-y": [{ "inset-y": ne() }],
				start: [{ "inset-s": ne(), start: ne() }],
				end: [{ "inset-e": ne(), end: ne() }],
				"inset-bs": [{ "inset-bs": ne() }],
				"inset-be": [{ "inset-be": ne() }],
				top: [{ top: ne() }],
				right: [{ right: ne() }],
				bottom: [{ bottom: ne() }],
				left: [{ left: ne() }],
				visibility: ["visible", "invisible", "collapse"],
				z: [{ z: [ya, "auto", ae, ee] }],
				basis: [{ basis: [xa, "full", "auto", g, ...H()] }],
				"flex-direction": [
					{ flex: ["row", "row-reverse", "col", "col-reverse"] },
				],
				"flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
				flex: [{ flex: [ge, xa, "auto", "initial", "none", ee] }],
				grow: [{ grow: ["", ge, ae, ee] }],
				shrink: [{ shrink: ["", ge, ae, ee] }],
				order: [{ order: [ya, "first", "last", "none", ae, ee] }],
				"grid-cols": [{ "grid-cols": Ce() }],
				"col-start-end": [{ col: Be() }],
				"col-start": [{ "col-start": Oe() }],
				"col-end": [{ "col-end": Oe() }],
				"grid-rows": [{ "grid-rows": Ce() }],
				"row-start-end": [{ row: Be() }],
				"row-start": [{ "row-start": Oe() }],
				"row-end": [{ "row-end": Oe() }],
				"grid-flow": [
					{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
				],
				"auto-cols": [{ "auto-cols": ut() }],
				"auto-rows": [{ "auto-rows": ut() }],
				gap: [{ gap: H() }],
				"gap-x": [{ "gap-x": H() }],
				"gap-y": [{ "gap-y": H() }],
				"justify-content": [{ justify: [...et(), "normal"] }],
				"justify-items": [{ "justify-items": [...Me(), "normal"] }],
				"justify-self": [{ "justify-self": ["auto", ...Me()] }],
				"align-content": [{ content: ["normal", ...et()] }],
				"align-items": [{ items: [...Me(), { baseline: ["", "last"] }] }],
				"align-self": [{ self: ["auto", ...Me(), { baseline: ["", "last"] }] }],
				"place-content": [{ "place-content": et() }],
				"place-items": [{ "place-items": [...Me(), "baseline"] }],
				"place-self": [{ "place-self": ["auto", ...Me()] }],
				p: [{ p: H() }],
				px: [{ px: H() }],
				py: [{ py: H() }],
				ps: [{ ps: H() }],
				pe: [{ pe: H() }],
				pbs: [{ pbs: H() }],
				pbe: [{ pbe: H() }],
				pt: [{ pt: H() }],
				pr: [{ pr: H() }],
				pb: [{ pb: H() }],
				pl: [{ pl: H() }],
				m: [{ m: B() }],
				mx: [{ mx: B() }],
				my: [{ my: B() }],
				ms: [{ ms: B() }],
				me: [{ me: B() }],
				mbs: [{ mbs: B() }],
				mbe: [{ mbe: B() }],
				mt: [{ mt: B() }],
				mr: [{ mr: B() }],
				mb: [{ mb: B() }],
				ml: [{ ml: B() }],
				"space-x": [{ "space-x": H() }],
				"space-x-reverse": ["space-x-reverse"],
				"space-y": [{ "space-y": H() }],
				"space-y-reverse": ["space-y-reverse"],
				size: [{ size: Z() }],
				"inline-size": [{ inline: ["auto", ...$()] }],
				"min-inline-size": [{ "min-inline": ["auto", ...$()] }],
				"max-inline-size": [{ "max-inline": ["none", ...$()] }],
				"block-size": [{ block: ["auto", ...me()] }],
				"min-block-size": [{ "min-block": ["auto", ...me()] }],
				"max-block-size": [{ "max-block": ["none", ...me()] }],
				w: [{ w: [g, "screen", ...Z()] }],
				"min-w": [{ "min-w": [g, "screen", "none", ...Z()] }],
				"max-w": [
					{ "max-w": [g, "screen", "none", "prose", { screen: [d] }, ...Z()] },
				],
				h: [{ h: ["screen", "lh", ...Z()] }],
				"min-h": [{ "min-h": ["screen", "lh", "none", ...Z()] }],
				"max-h": [{ "max-h": ["screen", "lh", ...Z()] }],
				"font-size": [{ text: ["base", s, Pl, Za] }],
				"font-smoothing": ["antialiased", "subpixel-antialiased"],
				"font-style": ["italic", "not-italic"],
				"font-weight": [{ font: [r, dw, sw] }],
				"font-stretch": [
					{
						"font-stretch": [
							"ultra-condensed",
							"extra-condensed",
							"condensed",
							"semi-condensed",
							"normal",
							"semi-expanded",
							"expanded",
							"extra-expanded",
							"ultra-expanded",
							uf,
							ee,
						],
					},
				],
				"font-family": [{ font: [uw, rw, i] }],
				"font-features": [{ "font-features": [ee] }],
				"fvn-normal": ["normal-nums"],
				"fvn-ordinal": ["ordinal"],
				"fvn-slashed-zero": ["slashed-zero"],
				"fvn-figure": ["lining-nums", "oldstyle-nums"],
				"fvn-spacing": ["proportional-nums", "tabular-nums"],
				"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
				tracking: [{ tracking: [u, ae, ee] }],
				"line-clamp": [{ "line-clamp": [ge, "none", ae, gg] }],
				leading: [{ leading: [h, ...H()] }],
				"list-image": [{ "list-image": ["none", ae, ee] }],
				"list-style-position": [{ list: ["inside", "outside"] }],
				"list-style-type": [{ list: ["disc", "decimal", "none", ae, ee] }],
				"text-alignment": [
					{ text: ["left", "center", "right", "justify", "start", "end"] },
				],
				"placeholder-color": [{ placeholder: Q() }],
				"text-color": [{ text: Q() }],
				"text-decoration": [
					"underline",
					"overline",
					"line-through",
					"no-underline",
				],
				"text-decoration-style": [{ decoration: [...we(), "wavy"] }],
				"text-decoration-thickness": [
					{ decoration: [ge, "from-font", "auto", ae, Za] },
				],
				"text-decoration-color": [{ decoration: Q() }],
				"underline-offset": [{ "underline-offset": [ge, "auto", ae, ee] }],
				"text-transform": [
					"uppercase",
					"lowercase",
					"capitalize",
					"normal-case",
				],
				"text-overflow": ["truncate", "text-ellipsis", "text-clip"],
				"text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
				indent: [{ indent: H() }],
				"vertical-align": [
					{
						align: [
							"baseline",
							"top",
							"middle",
							"bottom",
							"text-top",
							"text-bottom",
							"sub",
							"super",
							ae,
							ee,
						],
					},
				],
				whitespace: [
					{
						whitespace: [
							"normal",
							"nowrap",
							"pre",
							"pre-line",
							"pre-wrap",
							"break-spaces",
						],
					},
				],
				break: [{ break: ["normal", "words", "all", "keep"] }],
				wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
				hyphens: [{ hyphens: ["none", "manual", "auto"] }],
				content: [{ content: ["none", ae, ee] }],
				"bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
				"bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
				"bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
				"bg-position": [{ bg: T() }],
				"bg-repeat": [{ bg: Y() }],
				"bg-size": [{ bg: F() }],
				"bg-image": [
					{
						bg: [
							"none",
							{
								linear: [
									{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
									ya,
									ae,
									ee,
								],
								radial: ["", ae, ee],
								conic: [ya, ae, ee],
							},
							fw,
							ow,
						],
					},
				],
				"bg-color": [{ bg: Q() }],
				"gradient-from-pos": [{ from: W() }],
				"gradient-via-pos": [{ via: W() }],
				"gradient-to-pos": [{ to: W() }],
				"gradient-from": [{ from: Q() }],
				"gradient-via": [{ via: Q() }],
				"gradient-to": [{ to: Q() }],
				rounded: [{ rounded: se() }],
				"rounded-s": [{ "rounded-s": se() }],
				"rounded-e": [{ "rounded-e": se() }],
				"rounded-t": [{ "rounded-t": se() }],
				"rounded-r": [{ "rounded-r": se() }],
				"rounded-b": [{ "rounded-b": se() }],
				"rounded-l": [{ "rounded-l": se() }],
				"rounded-ss": [{ "rounded-ss": se() }],
				"rounded-se": [{ "rounded-se": se() }],
				"rounded-ee": [{ "rounded-ee": se() }],
				"rounded-es": [{ "rounded-es": se() }],
				"rounded-tl": [{ "rounded-tl": se() }],
				"rounded-tr": [{ "rounded-tr": se() }],
				"rounded-br": [{ "rounded-br": se() }],
				"rounded-bl": [{ "rounded-bl": se() }],
				"border-w": [{ border: oe() }],
				"border-w-x": [{ "border-x": oe() }],
				"border-w-y": [{ "border-y": oe() }],
				"border-w-s": [{ "border-s": oe() }],
				"border-w-e": [{ "border-e": oe() }],
				"border-w-bs": [{ "border-bs": oe() }],
				"border-w-be": [{ "border-be": oe() }],
				"border-w-t": [{ "border-t": oe() }],
				"border-w-r": [{ "border-r": oe() }],
				"border-w-b": [{ "border-b": oe() }],
				"border-w-l": [{ "border-l": oe() }],
				"divide-x": [{ "divide-x": oe() }],
				"divide-x-reverse": ["divide-x-reverse"],
				"divide-y": [{ "divide-y": oe() }],
				"divide-y-reverse": ["divide-y-reverse"],
				"border-style": [{ border: [...we(), "hidden", "none"] }],
				"divide-style": [{ divide: [...we(), "hidden", "none"] }],
				"border-color": [{ border: Q() }],
				"border-color-x": [{ "border-x": Q() }],
				"border-color-y": [{ "border-y": Q() }],
				"border-color-s": [{ "border-s": Q() }],
				"border-color-e": [{ "border-e": Q() }],
				"border-color-bs": [{ "border-bs": Q() }],
				"border-color-be": [{ "border-be": Q() }],
				"border-color-t": [{ "border-t": Q() }],
				"border-color-r": [{ "border-r": Q() }],
				"border-color-b": [{ "border-b": Q() }],
				"border-color-l": [{ "border-l": Q() }],
				"divide-color": [{ divide: Q() }],
				"outline-style": [{ outline: [...we(), "none", "hidden"] }],
				"outline-offset": [{ "outline-offset": [ge, ae, ee] }],
				"outline-w": [{ outline: ["", ge, Pl, Za] }],
				"outline-color": [{ outline: Q() }],
				shadow: [{ shadow: ["", "none", y, Ur, Hr] }],
				"shadow-color": [{ shadow: Q() }],
				"inset-shadow": [{ "inset-shadow": ["none", v, Ur, Hr] }],
				"inset-shadow-color": [{ "inset-shadow": Q() }],
				"ring-w": [{ ring: oe() }],
				"ring-w-inset": ["ring-inset"],
				"ring-color": [{ ring: Q() }],
				"ring-offset-w": [{ "ring-offset": [ge, Za] }],
				"ring-offset-color": [{ "ring-offset": Q() }],
				"inset-ring-w": [{ "inset-ring": oe() }],
				"inset-ring-color": [{ "inset-ring": Q() }],
				"text-shadow": [{ "text-shadow": ["none", w, Ur, Hr] }],
				"text-shadow-color": [{ "text-shadow": Q() }],
				opacity: [{ opacity: [ge, ae, ee] }],
				"mix-blend": [
					{ "mix-blend": [...lt(), "plus-darker", "plus-lighter"] },
				],
				"bg-blend": [{ "bg-blend": lt() }],
				"mask-clip": [
					{
						"mask-clip": [
							"border",
							"padding",
							"content",
							"fill",
							"stroke",
							"view",
						],
					},
					"mask-no-clip",
				],
				"mask-composite": [
					{ mask: ["add", "subtract", "intersect", "exclude"] },
				],
				"mask-image-linear-pos": [{ "mask-linear": [ge] }],
				"mask-image-linear-from-pos": [{ "mask-linear-from": pe() }],
				"mask-image-linear-to-pos": [{ "mask-linear-to": pe() }],
				"mask-image-linear-from-color": [{ "mask-linear-from": Q() }],
				"mask-image-linear-to-color": [{ "mask-linear-to": Q() }],
				"mask-image-t-from-pos": [{ "mask-t-from": pe() }],
				"mask-image-t-to-pos": [{ "mask-t-to": pe() }],
				"mask-image-t-from-color": [{ "mask-t-from": Q() }],
				"mask-image-t-to-color": [{ "mask-t-to": Q() }],
				"mask-image-r-from-pos": [{ "mask-r-from": pe() }],
				"mask-image-r-to-pos": [{ "mask-r-to": pe() }],
				"mask-image-r-from-color": [{ "mask-r-from": Q() }],
				"mask-image-r-to-color": [{ "mask-r-to": Q() }],
				"mask-image-b-from-pos": [{ "mask-b-from": pe() }],
				"mask-image-b-to-pos": [{ "mask-b-to": pe() }],
				"mask-image-b-from-color": [{ "mask-b-from": Q() }],
				"mask-image-b-to-color": [{ "mask-b-to": Q() }],
				"mask-image-l-from-pos": [{ "mask-l-from": pe() }],
				"mask-image-l-to-pos": [{ "mask-l-to": pe() }],
				"mask-image-l-from-color": [{ "mask-l-from": Q() }],
				"mask-image-l-to-color": [{ "mask-l-to": Q() }],
				"mask-image-x-from-pos": [{ "mask-x-from": pe() }],
				"mask-image-x-to-pos": [{ "mask-x-to": pe() }],
				"mask-image-x-from-color": [{ "mask-x-from": Q() }],
				"mask-image-x-to-color": [{ "mask-x-to": Q() }],
				"mask-image-y-from-pos": [{ "mask-y-from": pe() }],
				"mask-image-y-to-pos": [{ "mask-y-to": pe() }],
				"mask-image-y-from-color": [{ "mask-y-from": Q() }],
				"mask-image-y-to-color": [{ "mask-y-to": Q() }],
				"mask-image-radial": [{ "mask-radial": [ae, ee] }],
				"mask-image-radial-from-pos": [{ "mask-radial-from": pe() }],
				"mask-image-radial-to-pos": [{ "mask-radial-to": pe() }],
				"mask-image-radial-from-color": [{ "mask-radial-from": Q() }],
				"mask-image-radial-to-color": [{ "mask-radial-to": Q() }],
				"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
				"mask-image-radial-size": [
					{
						"mask-radial": [
							{ closest: ["side", "corner"], farthest: ["side", "corner"] },
						],
					},
				],
				"mask-image-radial-pos": [{ "mask-radial-at": K() }],
				"mask-image-conic-pos": [{ "mask-conic": [ge] }],
				"mask-image-conic-from-pos": [{ "mask-conic-from": pe() }],
				"mask-image-conic-to-pos": [{ "mask-conic-to": pe() }],
				"mask-image-conic-from-color": [{ "mask-conic-from": Q() }],
				"mask-image-conic-to-color": [{ "mask-conic-to": Q() }],
				"mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
				"mask-origin": [
					{
						"mask-origin": [
							"border",
							"padding",
							"content",
							"fill",
							"stroke",
							"view",
						],
					},
				],
				"mask-position": [{ mask: T() }],
				"mask-repeat": [{ mask: Y() }],
				"mask-size": [{ mask: F() }],
				"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
				"mask-image": [{ mask: ["none", ae, ee] }],
				filter: [{ filter: ["", "none", ae, ee] }],
				blur: [{ blur: Zn() }],
				brightness: [{ brightness: [ge, ae, ee] }],
				contrast: [{ contrast: [ge, ae, ee] }],
				"drop-shadow": [{ "drop-shadow": ["", "none", A, Ur, Hr] }],
				"drop-shadow-color": [{ "drop-shadow": Q() }],
				grayscale: [{ grayscale: ["", ge, ae, ee] }],
				"hue-rotate": [{ "hue-rotate": [ge, ae, ee] }],
				invert: [{ invert: ["", ge, ae, ee] }],
				saturate: [{ saturate: [ge, ae, ee] }],
				sepia: [{ sepia: ["", ge, ae, ee] }],
				"backdrop-filter": [{ "backdrop-filter": ["", "none", ae, ee] }],
				"backdrop-blur": [{ "backdrop-blur": Zn() }],
				"backdrop-brightness": [{ "backdrop-brightness": [ge, ae, ee] }],
				"backdrop-contrast": [{ "backdrop-contrast": [ge, ae, ee] }],
				"backdrop-grayscale": [{ "backdrop-grayscale": ["", ge, ae, ee] }],
				"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [ge, ae, ee] }],
				"backdrop-invert": [{ "backdrop-invert": ["", ge, ae, ee] }],
				"backdrop-opacity": [{ "backdrop-opacity": [ge, ae, ee] }],
				"backdrop-saturate": [{ "backdrop-saturate": [ge, ae, ee] }],
				"backdrop-sepia": [{ "backdrop-sepia": ["", ge, ae, ee] }],
				"border-collapse": [{ border: ["collapse", "separate"] }],
				"border-spacing": [{ "border-spacing": H() }],
				"border-spacing-x": [{ "border-spacing-x": H() }],
				"border-spacing-y": [{ "border-spacing-y": H() }],
				"table-layout": [{ table: ["auto", "fixed"] }],
				caption: [{ caption: ["top", "bottom"] }],
				transition: [
					{
						transition: [
							"",
							"all",
							"colors",
							"opacity",
							"shadow",
							"transform",
							"none",
							ae,
							ee,
						],
					},
				],
				"transition-behavior": [{ transition: ["normal", "discrete"] }],
				duration: [{ duration: [ge, "initial", ae, ee] }],
				ease: [{ ease: ["linear", "initial", V, ae, ee] }],
				delay: [{ delay: [ge, ae, ee] }],
				animate: [{ animate: ["none", q, ae, ee] }],
				backface: [{ backface: ["hidden", "visible"] }],
				perspective: [{ perspective: [z, ae, ee] }],
				"perspective-origin": [{ "perspective-origin": X() }],
				rotate: [{ rotate: Sn() }],
				"rotate-x": [{ "rotate-x": Sn() }],
				"rotate-y": [{ "rotate-y": Sn() }],
				"rotate-z": [{ "rotate-z": Sn() }],
				scale: [{ scale: Xn() }],
				"scale-x": [{ "scale-x": Xn() }],
				"scale-y": [{ "scale-y": Xn() }],
				"scale-z": [{ "scale-z": Xn() }],
				"scale-3d": ["scale-3d"],
				skew: [{ skew: $a() }],
				"skew-x": [{ "skew-x": $a() }],
				"skew-y": [{ "skew-y": $a() }],
				transform: [{ transform: [ae, ee, "", "none", "gpu", "cpu"] }],
				"transform-origin": [{ origin: X() }],
				"transform-style": [{ transform: ["3d", "flat"] }],
				translate: [{ translate: Ht() }],
				"translate-x": [{ "translate-x": Ht() }],
				"translate-y": [{ "translate-y": Ht() }],
				"translate-z": [{ "translate-z": Ht() }],
				"translate-none": ["translate-none"],
				accent: [{ accent: Q() }],
				appearance: [{ appearance: ["none", "auto"] }],
				"caret-color": [{ caret: Q() }],
				"color-scheme": [
					{
						scheme: [
							"normal",
							"dark",
							"light",
							"light-dark",
							"only-dark",
							"only-light",
						],
					},
				],
				cursor: [
					{
						cursor: [
							"auto",
							"default",
							"pointer",
							"wait",
							"text",
							"move",
							"help",
							"not-allowed",
							"none",
							"context-menu",
							"progress",
							"cell",
							"crosshair",
							"vertical-text",
							"alias",
							"copy",
							"no-drop",
							"grab",
							"grabbing",
							"all-scroll",
							"col-resize",
							"row-resize",
							"n-resize",
							"e-resize",
							"s-resize",
							"w-resize",
							"ne-resize",
							"nw-resize",
							"se-resize",
							"sw-resize",
							"ew-resize",
							"ns-resize",
							"nesw-resize",
							"nwse-resize",
							"zoom-in",
							"zoom-out",
							ae,
							ee,
						],
					},
				],
				"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
				"pointer-events": [{ "pointer-events": ["auto", "none"] }],
				resize: [{ resize: ["none", "", "y", "x"] }],
				"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
				"scroll-m": [{ "scroll-m": H() }],
				"scroll-mx": [{ "scroll-mx": H() }],
				"scroll-my": [{ "scroll-my": H() }],
				"scroll-ms": [{ "scroll-ms": H() }],
				"scroll-me": [{ "scroll-me": H() }],
				"scroll-mbs": [{ "scroll-mbs": H() }],
				"scroll-mbe": [{ "scroll-mbe": H() }],
				"scroll-mt": [{ "scroll-mt": H() }],
				"scroll-mr": [{ "scroll-mr": H() }],
				"scroll-mb": [{ "scroll-mb": H() }],
				"scroll-ml": [{ "scroll-ml": H() }],
				"scroll-p": [{ "scroll-p": H() }],
				"scroll-px": [{ "scroll-px": H() }],
				"scroll-py": [{ "scroll-py": H() }],
				"scroll-ps": [{ "scroll-ps": H() }],
				"scroll-pe": [{ "scroll-pe": H() }],
				"scroll-pbs": [{ "scroll-pbs": H() }],
				"scroll-pbe": [{ "scroll-pbe": H() }],
				"scroll-pt": [{ "scroll-pt": H() }],
				"scroll-pr": [{ "scroll-pr": H() }],
				"scroll-pb": [{ "scroll-pb": H() }],
				"scroll-pl": [{ "scroll-pl": H() }],
				"snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
				"snap-stop": [{ snap: ["normal", "always"] }],
				"snap-type": [{ snap: ["none", "x", "y", "both"] }],
				"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
				touch: [{ touch: ["auto", "none", "manipulation"] }],
				"touch-x": [{ "touch-pan": ["x", "left", "right"] }],
				"touch-y": [{ "touch-pan": ["y", "up", "down"] }],
				"touch-pz": ["touch-pinch-zoom"],
				select: [{ select: ["none", "text", "all", "auto"] }],
				"will-change": [
					{
						"will-change": ["auto", "scroll", "contents", "transform", ae, ee],
					},
				],
				fill: [{ fill: ["none", ...Q()] }],
				"stroke-w": [{ stroke: [ge, Pl, Za, gg] }],
				stroke: [{ stroke: ["none", ...Q()] }],
				"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
			},
			conflictingClassGroups: {
				overflow: ["overflow-x", "overflow-y"],
				overscroll: ["overscroll-x", "overscroll-y"],
				inset: [
					"inset-x",
					"inset-y",
					"inset-bs",
					"inset-be",
					"start",
					"end",
					"top",
					"right",
					"bottom",
					"left",
				],
				"inset-x": ["right", "left"],
				"inset-y": ["top", "bottom"],
				flex: ["basis", "grow", "shrink"],
				gap: ["gap-x", "gap-y"],
				p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
				px: ["pr", "pl"],
				py: ["pt", "pb"],
				m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
				mx: ["mr", "ml"],
				my: ["mt", "mb"],
				size: ["w", "h"],
				"font-size": ["leading"],
				"fvn-normal": [
					"fvn-ordinal",
					"fvn-slashed-zero",
					"fvn-figure",
					"fvn-spacing",
					"fvn-fraction",
				],
				"fvn-ordinal": ["fvn-normal"],
				"fvn-slashed-zero": ["fvn-normal"],
				"fvn-figure": ["fvn-normal"],
				"fvn-spacing": ["fvn-normal"],
				"fvn-fraction": ["fvn-normal"],
				"line-clamp": ["display", "overflow"],
				rounded: [
					"rounded-s",
					"rounded-e",
					"rounded-t",
					"rounded-r",
					"rounded-b",
					"rounded-l",
					"rounded-ss",
					"rounded-se",
					"rounded-ee",
					"rounded-es",
					"rounded-tl",
					"rounded-tr",
					"rounded-br",
					"rounded-bl",
				],
				"rounded-s": ["rounded-ss", "rounded-es"],
				"rounded-e": ["rounded-se", "rounded-ee"],
				"rounded-t": ["rounded-tl", "rounded-tr"],
				"rounded-r": ["rounded-tr", "rounded-br"],
				"rounded-b": ["rounded-br", "rounded-bl"],
				"rounded-l": ["rounded-tl", "rounded-bl"],
				"border-spacing": ["border-spacing-x", "border-spacing-y"],
				"border-w": [
					"border-w-x",
					"border-w-y",
					"border-w-s",
					"border-w-e",
					"border-w-bs",
					"border-w-be",
					"border-w-t",
					"border-w-r",
					"border-w-b",
					"border-w-l",
				],
				"border-w-x": ["border-w-r", "border-w-l"],
				"border-w-y": ["border-w-t", "border-w-b"],
				"border-color": [
					"border-color-x",
					"border-color-y",
					"border-color-s",
					"border-color-e",
					"border-color-bs",
					"border-color-be",
					"border-color-t",
					"border-color-r",
					"border-color-b",
					"border-color-l",
				],
				"border-color-x": ["border-color-r", "border-color-l"],
				"border-color-y": ["border-color-t", "border-color-b"],
				translate: ["translate-x", "translate-y", "translate-none"],
				"translate-none": [
					"translate",
					"translate-x",
					"translate-y",
					"translate-z",
				],
				"scroll-m": [
					"scroll-mx",
					"scroll-my",
					"scroll-ms",
					"scroll-me",
					"scroll-mbs",
					"scroll-mbe",
					"scroll-mt",
					"scroll-mr",
					"scroll-mb",
					"scroll-ml",
				],
				"scroll-mx": ["scroll-mr", "scroll-ml"],
				"scroll-my": ["scroll-mt", "scroll-mb"],
				"scroll-p": [
					"scroll-px",
					"scroll-py",
					"scroll-ps",
					"scroll-pe",
					"scroll-pbs",
					"scroll-pbe",
					"scroll-pt",
					"scroll-pr",
					"scroll-pb",
					"scroll-pl",
				],
				"scroll-px": ["scroll-pr", "scroll-pl"],
				"scroll-py": ["scroll-pt", "scroll-pb"],
				touch: ["touch-x", "touch-y", "touch-pz"],
				"touch-x": ["touch"],
				"touch-y": ["touch"],
				"touch-pz": ["touch"],
			},
			conflictingClassGroupModifiers: { "font-size": ["leading"] },
			orderSensitiveModifiers: [
				"*",
				"**",
				"after",
				"backdrop",
				"before",
				"details-content",
				"file",
				"first-letter",
				"first-line",
				"marker",
				"placeholder",
				"selection",
			],
		};
	},
	pw = Qb(mw);
function vn(...n) {
	return pw(Ab(n));
}
function pt({ children: n, className: i = "" }) {
	return f.jsx("section", {
		className: vn("bg-white rounded-xl py-5 lg:py-10 px-3", i),
		children: f.jsx("div", { className: "max-w-7xl mx-auto ", children: n }),
	});
}
function gw(n, i, s) {
	const r = n.toFixed(i);
	if (!s) return r;
	const [u, h] = r.split("."),
		d = u.replace(/\B(?=(\d{3})+(?!\d))/g, s);
	return h ? `${d}.${h}` : d;
}
function Zi({
	to: n,
	duration: i = 2,
	decimals: s = 0,
	prefix: r = "",
	suffix: u = "",
	separator: h = "",
}) {
	const [d, g] = C.useState(0),
		p = C.useRef(null);
	return (
		C.useEffect(() => {
			let x = 0;
			const y = (v) => {
				p.current === null && (p.current = v);
				const w = (v - p.current) / 1e3,
					A = Math.min(w / i, 1),
					M = n * A;
				g(M), A < 1 && (x = requestAnimationFrame(y));
			};
			return (
				(x = requestAnimationFrame(y)),
				() => {
					cancelAnimationFrame(x), (p.current = null);
				}
			);
		}, [n, i]),
		f.jsxs("span", { children: [r, gw(d, s, h), u] })
	);
}
const xw = P(_e);
function Z5({ className: n }) {
	const i = it();
	return f.jsx(pt, {
		className: vn("py-12 lg:py-25", n),
		children: f.jsxs(P.div, {
			className:
				"flex-col flex lg:flex-row justify-between gap-10 sm:gap-14 lg:gap-16 xl:gap-23.5",
			...Ie(i),
			children: [
				f.jsxs(P.div, {
					className: "lg:w-1/2 flex flex-col justify-between gap-10 lg:gap-0",
					...ce(),
					children: [
						f.jsxs("div", {
							children: [
								f.jsxs("p", {
									className:
										"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
									children: [
										f.jsxs("svg", {
											width: "20",
											height: "20",
											viewBox: "0 0 20 20",
											fill: "none",
											xmlns: "http://www.w3.org/2000/svg",
											children: [
												f.jsx("path", {
													d: "M16.4596 11.6681H17.293C17.5231 11.6681 17.7096 11.4815 17.7096 11.2514V8.75139C17.7096 8.52127 17.5231 8.33472 17.293 8.33472H16.4596M3.54297 8.33472H2.70964C2.47952 8.33472 2.29297 8.52127 2.29297 8.75139V11.2514C2.29297 11.4815 2.47952 11.6681 2.70964 11.6681H3.54297M10.0013 2.29297V4.3763M7.5013 11.9135H12.5013M4.79297 4.3763H15.2096C15.9 4.3763 16.4596 4.93595 16.4596 5.6263V14.3763C16.4596 15.0667 15.9 15.6263 15.2096 15.6263H4.79297C4.10261 15.6263 3.54297 15.0667 3.54297 14.3763V5.6263C3.54297 4.93595 4.10261 4.3763 4.79297 4.3763Z",
													stroke: "#323544",
													strokeWidth: "1.5",
													strokeLinecap: "round",
													strokeLinejoin: "round",
												}),
												f.jsx("path", {
													d: "M7.70703 8.23047L7.70703 8.2388M12.2904 8.23047V8.2388",
													stroke: "#323544",
													strokeWidth: "2.5",
													strokeLinecap: "round",
													strokeLinejoin: "round",
												}),
											],
										}),
										"Automation",
									],
								}),
								f.jsx("h2", {
									className:
										"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
									children: "Built to simplify how modern businesses operate",
								}),
								f.jsx("p", {
									className:
										"text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg",
									children:
										"Empower your business with intelligent automation, real-time insights, and scalable tools designed to improve efficiency and accelerate growth.",
								}),
								f.jsxs(xw, {
									initial: "initial",
									whileHover: "hover",
									to: "/about",
									className:
										"py-3 px-5 inline-flex  text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-neutral-900 transition-colors duration-300 hover:bg-neutral-700 ",
									children: ["Start Now ", f.jsx(ms, {})],
								}),
							],
						}),
						f.jsxs("div", {
							className: "flex flex-col sm:flex-row gap-8",
							children: [
								f.jsxs("div", {
									children: [
										f.jsx("h3", {
											className: "text-neutral-900 text-[52px] mb-4",
											children: f.jsx(Zi, {
												to: 350,
												suffix: "K+",
												duration: 2.5,
												separator: ",",
											}),
										}),
										f.jsx("p", {
											className: "text-neutral-500 text-base font-normal",
											children: "Teams using the platform globally",
										}),
									],
								}),
								f.jsxs("div", {
									children: [
										f.jsx("h3", {
											className: "text-neutral-900 text-[52px] mb-4",
											children: f.jsx(Zi, {
												to: 4.8,
												decimals: 1,
												duration: 2.5,
											}),
										}),
										f.jsx("p", {
											className: "text-neutral-500 text-base font-normal",
											children: "Average customer rating",
										}),
									],
								}),
							],
						}),
					],
				}),
				f.jsx(P.div, {
					className: "lg:w-1/2",
					...ce(i, 0.1),
					children: f.jsx("div", {
						children: f.jsx("img", {
							src: "/images/about-img.png",
							className: "w-full rounded-xl",
							alt: "Description of image",
						}),
					}),
				}),
			],
		}),
	});
}
const cf = [
	{ img: "/images/clients-logo/logo-1.svg", href: "#" },
	{ img: "/images/clients-logo/logo-2.svg", href: "#" },
	{ img: "/images/clients-logo/logo-3.svg", href: "#" },
	{ img: "/images/clients-logo/logo-4.svg", href: "#" },
	{ img: "/images/clients-logo/logo-5.svg", href: "#" },
];
function yw() {
	const n = it();
	return f.jsx(pt, {
		children: f.jsxs(P.div, {
			className:
				"flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 overflow-hidden",
			...Ie(n),
			children: [
				f.jsx(P.div, {
					className:
						"md:w-auto w-full text-center md:text-left shrink-0 z-10 relative pr-4",
					...ce(),
					children: f.jsxs("p", {
						className: "text-neutral-500 whitespace-nowrap",
						children: [
							"Trusted by",
							" ",
							f.jsxs("strong", {
								className: "text-neutral-900",
								children: ["5000+ ", f.jsx("br", {}), " companies"],
							}),
							" ",
							"of all sizes",
						],
					}),
				}),
				f.jsx(P.div, {
					className: "relative flex-1 overflow-hidden w-full",
					...ce(n, 0.1),
					style: {
						maskImage:
							"linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
						WebkitMaskImage:
							"linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					},
					children: f.jsxs("div", {
						className:
							"flex animate-marquee w-max hover:[animation-play-state:paused]",
						children: [
							f.jsx("div", {
								className: "flex gap-16 pr-16 items-center",
								children: cf.map((i, s) =>
									f.jsx(
										_e,
										{
											to: i.href,
											className: "shrink-0 block",
											children: f.jsx("img", {
												src: i.img,
												alt: "Tailgrids",
												className:
													"h-8 opacity-70 hover:opacity-100 transition-opacity block",
											}),
										},
										s,
									),
								),
							}),
							f.jsx("div", {
								className: "flex gap-16 pr-16 items-center",
								children: cf.map((i, s) =>
									f.jsx(
										_e,
										{
											to: i.href,
											className: "shrink-0 block",
											children: f.jsx("img", {
												src: i.img,
												alt: "Tailgrids",
												className:
													"h-8 opacity-70 hover:opacity-100 transition-opacity block",
											}),
										},
										`dup-${s}`,
									),
								),
							}),
							f.jsx("div", {
								className: "flex gap-16 pr-16 items-center",
								children: cf.map((i, s) =>
									f.jsx(
										_e,
										{
											to: i.href,
											className: "shrink-0 block",
											children: f.jsx("img", {
												src: i.img,
												alt: "Tailgrids",
												className:
													"h-8 opacity-70 hover:opacity-100 transition-opacity block",
											}),
										},
										`trip-${s}`,
									),
								),
							}),
						],
					}),
				}),
			],
		}),
	});
}
function ja({ title: n, description: i }) {
	return (
		C.useEffect(() => {
			n && (document.title = n);
		}, [n]),
		C.useEffect(() => {
			const s = document.querySelector('meta[name="description"]');
			i && s && s.setAttribute("content", i);
		}, [i]),
		null
	);
}
function X5({ absolute: n = !0 }) {
	const [i, s] = C.useState(!1),
		[r, u] = C.useState(!1);
	return (
		C.useEffect(() => {
			const h = () => {
				window.scrollY > 50 ? u(!0) : u(!1);
			};
			return (
				window.addEventListener("scroll", h),
				() => window.removeEventListener("scroll", h)
			);
		}, []),
		f.jsxs("header", {
			className: `w-full z-50 transition-all duration-300 ${r ? "fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-xs py-3" : n ? "absolute top-10 left-0" : "relative py-4"}`,
			children: [
				f.jsx("div", {
					className: "max-w-7xl mx-auto px-7 xl:px-0",
					children: f.jsxs("div", {
						className: "flex items-center justify-between",
						children: [
							f.jsx("div", {
								children: f.jsx(_e, {
									to: "/",
									children: f.jsx("img", {
										src: "/images/logo/logo-black.svg",
										alt: "logo",
									}),
								}),
							}),
							f.jsx("button", {
								onClick: () => s(!i),
								className:
									"lg:hidden p-2 cursor-pointer text-neutral-900 focus:outline-none",
								children: i
									? f.jsx("svg", {
											xmlns: "http://www.w3.org/2000/svg",
											className: "h-8 w-8",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											children: f.jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M6 18L18 6M6 6l12 12",
											}),
										})
									: f.jsx("svg", {
											xmlns: "http://www.w3.org/2000/svg",
											className: "h-8 w-8",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											children: f.jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M4 6h16M4 12h16M4 18h16",
											}),
										}),
							}),
							f.jsx("nav", {
								className: `${r ? "" : "bg-white"}  hidden lg:flex flex-1 max-w-fit rounded-xl p-1 h-13 items-center`,
								children: f.jsxs("ul", {
									className: "flex flex-wrap justify-center items-center gap-1",
									children: [
										f.jsx("li", {
											children: f.jsx(an, {
												to: "/features",
												className: ({ isActive: h }) =>
													`py-2.5 px-4 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900  ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:bg-neutral-50"}`,
												children: "Features",
											}),
										}),
										f.jsx("li", {
											children: f.jsx(an, {
												to: "/pricing",
												className: ({ isActive: h }) =>
													`py-2.5 px-4 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900  ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:bg-neutral-50"}`,
												children: "Pricing",
											}),
										}),
										f.jsx("li", {
											children: f.jsx(an, {
												to: "/about",
												className: ({ isActive: h }) =>
													`py-2.5 px-4 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900  ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:bg-neutral-50"}`,
												children: "About",
											}),
										}),
										f.jsx("li", {
											children: f.jsx(an, {
												to: "/blog",
												className: ({ isActive: h }) =>
													`py-2.5 px-4 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900  ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:bg-neutral-50"}`,
												children: "Blog",
											}),
										}),
										f.jsx("li", {
											children: f.jsx(an, {
												to: "/contacts",
												className: ({ isActive: h }) =>
													`py-2.5 px-4 font-mono uppercase text-base transition-colors rounded-lg hover:text-neutral-900  ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:bg-neutral-50"}`,
												children: "Contact",
											}),
										}),
										f.jsx("li", {
											children: f.jsx(_e, {
												to: "/contacts",
												className:
													"text-white ml-2 py-2.5 px-5 h-11 font-mono uppercase text-base rounded-lg bg-neutral-950 transition-colors duration-300 hover:bg-neutral-700",
												children: "Get Started",
											}),
										}),
									],
								}),
							}),
						],
					}),
				}),
				i &&
					f.jsxs("div", {
						className:
							"lg:hidden absolute top-full left-3 right-3 rounded-xl bg-white  py-4 px-4 mt-2 flex flex-col space-y-4",
						children: [
							f.jsx(an, {
								to: "/features",
								className: ({ isActive: h }) =>
									`font-mono uppercase text-base transition-colors rounded-lg px-4 py-2 block ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:text-neutral-900 hover:bg-neutral-50"}`,
								children: "Features",
							}),
							f.jsx(an, {
								to: "/pricing",
								className: ({ isActive: h }) =>
									`font-mono uppercase text-base transition-colors rounded-lg px-4 py-2 block ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:text-neutral-900 hover:bg-neutral-50"}`,
								children: "Pricing",
							}),
							f.jsx(an, {
								to: "/about",
								className: ({ isActive: h }) =>
									`font-mono uppercase text-base transition-colors rounded-lg px-4 py-2 block ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:text-neutral-900 hover:bg-neutral-50"}`,
								children: "About",
							}),
							f.jsx(an, {
								to: "/blog",
								className: ({ isActive: h }) =>
									`font-mono uppercase text-base transition-colors rounded-lg px-4 py-2 block ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:text-neutral-900 hover:bg-neutral-50"}`,
								children: "Blog",
							}),
							f.jsx(an, {
								to: "/contacts",
								className: ({ isActive: h }) =>
									`font-mono uppercase text-base transition-colors rounded-lg px-4 py-2 block ${h ? "text-neutral-900 bg-neutral-100 font-medium" : " hover:text-neutral-900 hover:bg-neutral-50"}`,
								children: "Contact",
							}),
							f.jsx(_e, {
								to: "/contacts",
								className:
									"text-white py-3 px-5 font-mono uppercase text-base rounded-lg bg-black transition-colors duration-300 block text-center hover:bg-neutral-700",
								children: "Get Started",
							}),
						],
					}),
			],
		})
	);
}
const vw = P(_e);
function bw() {
	const n = it();
	return f.jsxs("div", {
		children: [
			f.jsx(X5, {}),
			f.jsx(P.section, {
				className:
					"bg-[url('/images/hero/hero-bg.png')]  pt-30 lg:pt-40 lg:pb-75 pb-16 sm:pb-20  relative overflow-hidden  bg-no-repeat bg-cover rounded-xl",
				...Ie(n),
				children: f.jsx("div", {
					className: "max-w-7xl mx-auto px-4 xl:px-0 ",
					children: f.jsxs("div", {
						className: "flex flex-col lg:flex-row",
						children: [
							f.jsxs(P.div, {
								className: "max-w-xl relative z-30",
								...ce(),
								children: [
									f.jsxs("p", {
										className:
											"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
										children: [
											f.jsxs("svg", {
												className: "shrink-0",
												width: "20",
												height: "20",
												viewBox: "0 0 20 20",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: [
													f.jsx("g", {
														clipPath: "url(#clip0_19138_5080)",
														children: f.jsx("path", {
															d: "M8.84436 5.18872L9.57569 6.86389C10.2266 8.35456 11.3981 9.54122 12.8594 10.1899L14.8725 11.0835C15.5125 11.3676 15.5125 12.2987 14.8725 12.5827L12.9223 13.4484C11.4234 14.1138 10.2309 15.3444 9.59111 16.8859L8.85027 18.6711C8.57536 19.3336 7.66001 19.3336 7.38511 18.6711L6.64425 16.886C6.0045 15.3444 4.81196 14.1138 3.31306 13.4484L1.36284 12.5827C0.722804 12.2987 0.722803 11.3676 1.36284 11.0835L3.37594 10.1899C4.83726 9.54122 6.00878 8.35456 6.65965 6.86389L7.39102 5.18872C7.67216 4.54489 8.56319 4.54489 8.84436 5.18872ZM16.1669 1.11014L16.3725 1.58156C16.7392 2.42206 17.3996 3.09131 18.2236 3.45739L18.8573 3.73898C19.2 3.89123 19.2 4.38931 18.8573 4.54156L18.2591 4.80739C17.4139 5.18289 16.7416 5.87689 16.3812 6.74597L16.17 7.25539C16.0228 7.61039 15.5319 7.61039 15.3847 7.25539L15.1735 6.74597C14.8132 5.87689 14.1409 5.18289 13.2957 4.80739L12.6974 4.54156C12.3548 4.38931 12.3548 3.89123 12.6974 3.73898L13.3311 3.45739C14.1552 3.09131 14.8155 2.42206 15.1822 1.58156L15.3879 1.11014C15.5384 0.76506 16.0163 0.76506 16.1669 1.11014Z",
															fill: "#2A2A2A",
														}),
													}),
													f.jsx("defs", {
														children: f.jsx("clipPath", {
															id: "clip0_19138_5080",
															children: f.jsx("rect", {
																width: "20",
																height: "20",
																fill: "white",
															}),
														}),
													}),
												],
											}),
											"AI Business Assistant Platform",
										],
									}),
									f.jsx("h2", {
										className:
											"text-4xl lg:text-5xl xl:text-6xl font-medium text-neutral-900 xl:leading-none mb-4",
										children: "Your Intelligent Assistant for Modern Business",
									}),
									f.jsx("p", {
										className:
											"text-base sm:text-lg text-neutral-500 mb-8 lg:mb-20 font-normal max-w-lg",
										children:
											"Streamline operations, automate workflows, and unlock smarter decision-making with a powerful AI assistant designed for modern teams",
									}),
									f.jsxs("div", {
										className: "flex gap-4",
										children: [
											f.jsxs(vw, {
												to: "/about",
												className:
													"py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-black transition-colors duration-300 hover:bg-neutral-700",
												whileHover: "hover",
												initial: "initial",
												children: ["Start Now ", f.jsx(ms, {})],
											}),
											f.jsx(_e, {
												to: "/features",
												className:
													"py-3 bg-white text-neutral-900 border border-neutral-900 hover:bg-neutral-100 transition-colors duration-300 px-5 rounded-lg text-sm font-mono uppercase",
												children: "View Demo",
											}),
										],
									}),
								],
							}),
							f.jsx(P.div, {
								className:
									"transform hidden lg:block  absolute lg:translate-x-45 xl:translate-x-0 right-0",
								...ce(n, 0.1),
								children: f.jsx("img", {
									src: "/images/hero/star.png",
									className: "h-[80%]",
									alt: "Hero",
								}),
							}),
						],
					}),
				}),
			}),
		],
	});
}
function K5() {
	const n = it(),
		i = C.useRef(null),
		{ scrollYProgress: s } = xb({
			target: i,
			offset: ["start start", "end end"],
		}),
		r = Jr(s, [0, 0.5], [1, 0.9]),
		u = Jr(s, [0.5, 1], [1, 0.9]),
		h = Jr(s, [1, 1], [1, 1]);
	return f.jsxs(pt, {
		className: "py-12 lg:py-25",
		children: [
			f.jsxs(P.div, {
				className: "max-w-6xl mx-auto",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono justify-center text-center gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									d: "M11.6654 16.6654V3.33203L4.22285 5.56479C3.69412 5.72341 3.33203 6.21006 3.33203 6.76207V16.6654H11.6654ZM11.6654 16.6654H16.6654V9.58203C16.6654 8.89168 16.1057 8.33203 15.4154 8.33203H11.6654V16.6654ZM6.66536 8.12222H8.33203M6.66536 10.9347H8.33203M6.66536 13.7472H8.33203",
									stroke: "#171717",
									"stroke-width": "1.5",
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
								}),
							}),
							"Platform Capabilities",
						],
					}),
					f.jsxs("h2", {
						className:
							"block lg:hidden text-2xl sm:text-3xl leading-normal -tracking-[1px] mb-10 text-center font-medium text-neutral-400",
						children: [
							"Powerful, flexible AI platform designed to",
							" ",
							f.jsx("span", {
								className: "text-neutral-900",
								children: "automate workflows",
							}),
							",",
							" ",
							f.jsx("span", {
								className: "text-neutral-900",
								children: "enhance productivity",
							}),
							" and",
							" ",
							f.jsx("span", {
								className: "text-neutral-900",
								children: "scale your business effortlessly.",
							}),
						],
					}),
					f.jsxs("h2", {
						className:
							"hidden lg:block text-3xl leading-normal lg:text-4xl xl:text-5xl -tracking-[2px] mb-23 text-center font-medium text-neutral-400 lg:leading-tight",
						children: [
							f.jsx("span", {
								className: "block",
								children: "Powerful, flexible AI platform designed to",
							}),
							f.jsxs("span", {
								className: "block",
								children: [
									f.jsxs("span", {
										className:
											"text-neutral-900 inline-flex items-center gap-2",
										children: [
											"automate workflows",
											f.jsx("img", {
												src: "/images/features/one.svg",
												className: "hidden sm:block",
												alt: "",
											}),
										],
									}),
									" ",
									f.jsxs("span", {
										className:
											"text-neutral-900 inline-flex items-center gap-2",
										children: [
											"enhance productivity",
											f.jsx("img", {
												src: "/images/features/two.svg",
												className: "hidden sm:block",
												alt: "",
											}),
										],
									}),
								],
							}),
							f.jsxs("span", {
								className: "block",
								children: [
									"and",
									" ",
									f.jsxs("span", {
										className:
											"text-neutral-900 inline-flex items-center gap-2",
										children: [
											"scale",
											f.jsx("img", {
												src: "/images/features/three.svg",
												className: "hidden sm:block",
												alt: "",
											}),
										],
									}),
									" ",
									f.jsx("span", {
										className: "text-neutral-900",
										children: "your business effortlessly.",
									}),
								],
							}),
						],
					}),
				],
			}),
			f.jsxs(P.div, {
				ref: i,
				className: "space-y-6 relative",
				...Ie(n),
				children: [
					f.jsxs(P.div, {
						style: { scale: n ? 1 : r },
						className:
							"bg-soft-green lg:items-center gap-8 py-6 px-6 sm:px-12 rounded-xl flex flex-col lg:flex-row sticky top-24 z-10 origin-top",
						...ce(),
						children: [
							f.jsxs("div", {
								className: "lg:w-1/2 space-y-4",
								children: [
									f.jsxs("p", {
										className:
											"flex font-mono gap-2 items-center uppercase text-neutral-900 ",
										children: [
											f.jsxs("svg", {
												width: "20",
												height: "20",
												viewBox: "0 0 20 20",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: [
													f.jsx("path", {
														d: "M16.4596 11.6681H17.293C17.5231 11.6681 17.7096 11.4815 17.7096 11.2514V8.75139C17.7096 8.52127 17.5231 8.33472 17.293 8.33472H16.4596M3.54297 8.33472H2.70964C2.47952 8.33472 2.29297 8.52127 2.29297 8.75139V11.2514C2.29297 11.4815 2.47952 11.6681 2.70964 11.6681H3.54297M10.0013 2.29297V4.3763M7.5013 11.9135H12.5013M4.79297 4.3763H15.2096C15.9 4.3763 16.4596 4.93595 16.4596 5.6263V14.3763C16.4596 15.0667 15.9 15.6263 15.2096 15.6263H4.79297C4.10261 15.6263 3.54297 15.0667 3.54297 14.3763V5.6263C3.54297 4.93595 4.10261 4.3763 4.79297 4.3763Z",
														stroke: "#323544",
														strokeWidth: "1.5",
														strokeLinecap: "round",
														strokeLinejoin: "round",
													}),
													f.jsx("path", {
														d: "M7.70703 8.23047L7.70703 8.2388M12.2904 8.23047V8.2388",
														stroke: "#323544",
														strokeWidth: "2.5",
														strokeLinecap: "round",
														strokeLinejoin: "round",
													}),
												],
											}),
											"Automation",
										],
									}),
									f.jsx("h2", {
										className:
											"text-3xl sm:text-4xl -tracking-[2px] lg:text-5xl font-medium text-neutral-900 lg:leading-14",
										children: "Automate repetitive tasks",
									}),
									f.jsx("p", {
										className: "text-lg text-neutral-500  font-normal ",
										children:
											"Eliminate manual work and automate routine processes to save time and increase operational efficiency.",
									}),
								],
							}),
							f.jsx("div", {
								className: "lg:w-1/2",
								children: f.jsx("img", {
									src: "/images/features/img-1.png",
									className: "rounded-2xl",
									alt: "",
								}),
							}),
						],
					}),
					" ",
					f.jsxs(P.div, {
						style: { scale: n ? 1 : u },
						className:
							"bg-soft-purple lg:items-center gap-8 py-6 px-6 sm:px-12 rounded-xl flex flex-col lg:flex-row sticky top-28 z-20 origin-top",
						...ce(n, 0.1),
						children: [
							f.jsxs("div", {
								className: "lg:w-1/2 space-y-4",
								children: [
									f.jsxs("p", {
										className:
											"flex font-mono gap-2 items-center uppercase text-neutral-900 ",
										children: [
											f.jsx("svg", {
												width: "20",
												height: "20",
												viewBox: "0 0 20 20",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("path", {
													fillRule: "evenodd",
													clipRule: "evenodd",
													d: "M15.165 4.08203C15.5793 4.08203 15.915 4.41782 15.915 4.83203V15.165C15.915 15.5793 15.5793 15.915 15.165 15.915H4.83203C4.41782 15.915 4.08203 15.5793 4.08203 15.165V4.83203C4.08203 4.41782 4.41782 4.08203 4.83203 4.08203H15.165ZM15.165 17.415C16.4077 17.415 17.415 16.4077 17.415 15.165V4.83203C17.415 3.58939 16.4077 2.58203 15.165 2.58203H4.83203C3.58939 2.58203 2.58203 3.58939 2.58203 4.83203V15.165C2.58203 16.4077 3.58939 17.415 4.83203 17.415H15.165ZM14.1651 7.34394C14.5793 7.34394 14.9151 7.67973 14.9151 8.09394C14.9151 8.50816 14.5793 8.84394 14.1651 8.84394L5.83207 8.84394C5.41786 8.84394 5.08207 8.50816 5.08207 8.09394C5.08207 7.67973 5.41786 7.34394 5.83207 7.34394L14.1651 7.34394ZM14.1651 11.1535C14.5793 11.1535 14.9151 11.4893 14.9151 11.9035C14.9151 12.3177 14.5793 12.6535 14.1651 12.6535L5.83207 12.6535C5.41786 12.6535 5.08207 12.3177 5.08207 11.9035C5.08207 11.4893 5.41786 11.1535 5.83207 11.1535L14.1651 11.1535Z",
													fill: "#404040",
												}),
											}),
											"Analytics",
										],
									}),
									f.jsx("h2", {
										className:
											"text-3xl sm:text-4xl -tracking-[2px] lg:text-5xl font-medium text-neutral-900 lg:leading-14",
										children: "Analyze business performance",
									}),
									f.jsx("p", {
										className: "text-lg text-neutral-500  font-normal ",
										children:
											"Eliminate manual work and automate routine processes to save time and increase operational efficiency.",
									}),
								],
							}),
							f.jsx("div", {
								className: "lg:w-1/2",
								children: f.jsx("img", {
									src: "/images/features/img-2.png",
									className: "rounded-2xl",
									alt: "",
								}),
							}),
						],
					}),
					" ",
					f.jsxs(P.div, {
						style: { scale: n ? 1 : h },
						className:
							"bg-soft-pink lg:items-center gap-8 py-6 px-6 sm:px-12 rounded-xl flex flex-col lg:flex-row sticky top-32 z-30 origin-top",
						...ce(n, 0.2),
						children: [
							f.jsxs("div", {
								className: "lg:w-1/2 space-y-4",
								children: [
									f.jsxs("p", {
										className:
											"flex font-mono gap-2 items-center uppercase text-neutral-900 ",
										children: [
											f.jsx("svg", {
												width: "20",
												height: "20",
												viewBox: "0 0 20 20",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("path", {
													d: "M12.4158 15.9573C12.4158 15.9573 12.5018 11.0041 7.29193 11.0041C2.08208 11.0041 2.16806 15.9573 2.16806 15.9573M11.7564 4.25428C12.0614 4.11846 12.3991 4.04297 12.7545 4.04297C14.1108 4.04297 15.2103 5.14246 15.2103 6.49876C15.2103 7.85505 14.1108 8.95454 12.7545 8.95454C12.4006 8.95454 12.0642 8.87968 11.7602 8.74493M13.1611 11.0171C17.9136 11.2952 17.8326 15.9572 17.8326 15.9572M9.79348 6.49879C9.79348 7.85508 8.69399 8.95458 7.33769 8.95458C5.9814 8.95458 4.88191 7.85508 4.88191 6.49879C4.88191 5.1425 5.9814 4.043 7.33769 4.043C8.69399 4.043 9.79348 5.1425 9.79348 6.49879Z",
													stroke: "#404040",
													strokeWidth: "1.5",
													strokeLinecap: "round",
													strokeLinejoin: "round",
												}),
											}),
											"AI Assistant",
										],
									}),
									f.jsx("h2", {
										className:
											"text-3xl sm:text-4xl -tracking-[2px] lg:text-5xl font-medium text-neutral-900 lg:leading-14",
										children: "Assist your team and customers",
									}),
									f.jsx("p", {
										className: "text-lg text-neutral-500  font-normal ",
										children:
											"Eliminate manual work and automate routine processes to save time and increase operational efficiency.",
									}),
								],
							}),
							f.jsx("div", {
								className: "lg:w-1/2",
								children: f.jsx("img", {
									src: "/images/features/img-3.png",
									className: "rounded-2xl",
									alt: "",
								}),
							}),
						],
					}),
				],
			}),
		],
	});
}
const ww = P(_e);
function Q5() {
	const [n, i] = C.useState(0),
		s = C.useRef([]),
		r = it();
	C.useEffect(() => {
		const h = () => {
			const d = window.innerHeight / 2;
			s.current.forEach((g, p) => {
				if (g) {
					const x = g.getBoundingClientRect();
					x.top <= d && x.bottom >= d && i(p);
				}
			});
		};
		return (
			window.addEventListener("scroll", h),
			h(),
			() => window.removeEventListener("scroll", h)
		);
	}, []);
	const u = [
		{
			id: "01",
			title: "Connect your tools",
			description: "We understand your goals and craft a clear.",
			icon: f.jsx("img", {
				src: "/images/steps/step-1.svg",
				alt: "Connect your tools",
				className: "size-11.5",
			}),
		},
		{
			id: "02",
			title: "Configure your assistant",
			description: "We understand your goals and craft a clear.",
			icon: f.jsx("img", {
				src: "/images/steps/step-2.svg",
				alt: "Configure your assistant",
				className: "size-11.5",
			}),
		},
		{
			id: "03",
			title: "Let AI handle operations",
			description: "We understand your goals and craft a clear.",
			icon: f.jsx("img", {
				src: "/images/steps/step-3.svg",
				alt: "Let AI handle operations",
				className: "size-11.5",
			}),
		},
	];
	return f.jsx(pt, {
		className: "py-12 lg:py-25",
		children: f.jsxs(P.div, {
			className:
				"flex-col flex lg:flex-row justify-between gap-14 lg:gap-16 xl:gap-23.5",
			...Ie(r),
			children: [
				f.jsx(P.div, {
					className: "lg:w-1/2 flex flex-col justify-between gap-10 lg:gap-0",
					...ce(),
					children: f.jsxs("div", {
						children: [
							f.jsxs("p", {
								className:
									"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
								children: [
									f.jsx("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 20 20",
										fill: "none",
										xmlns: "http://www.w3.org/2000/svg",
										children: f.jsx("path", {
											d: "M4.9019 15.1007L2.66562 17.337M6.64006 16.8388L5.77104 17.7078M3.16199 13.3624L2.29297 14.2314M13.4208 6.58181L11.653 8.34958M9.88112 16.5444L3.45785 10.1211C2.73444 9.3977 3.13895 8.15905 4.14988 8.00203L7.12389 7.54009C7.38599 7.49938 7.62835 7.37635 7.81591 7.18879L10.6893 4.31537C10.8747 4.13004 11.1136 4.00765 11.3722 3.96551L15.2305 3.33702C16.0732 3.19974 16.8025 3.929 16.6652 4.77173L16.0367 8.62998C15.9946 8.88866 15.8722 9.12756 15.6869 9.31289L12.8134 12.1863C12.6259 12.3739 12.5028 12.6162 12.4621 12.8783L12.0002 15.8523C11.8432 16.8633 10.6045 17.2678 9.88112 16.5444Z",
											stroke: "#404040",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
										}),
									}),
									"Setup",
								],
							}),
							f.jsx("h2", {
								className:
									"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
								children: "Launch your AI assistant in minutes",
							}),
							f.jsx("p", {
								className:
									"text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg",
								children:
									"Connect your tools, define your workflows, and let your assistant begin improving efficiency immediately.",
							}),
							f.jsxs(ww, {
								to: "/contacts",
								className:
									"py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-black hover:bg-neutral-700 transition-colors duration-300",
								initial: "initial",
								whileHover: "hover",
								children: ["Try it now", f.jsx(ms, {})],
							}),
						],
					}),
				}),
				f.jsx(P.div, {
					className: "lg:w-1/2",
					...ce(r, 0.1),
					children: f.jsx("div", {
						className: "flex flex-col",
						children: u.map((h, d) =>
							f.jsxs(
								P.div,
								{
									ref: (g) => {
										s.current[d] = g;
									},
									className: "flex gap-6 items-stretch",
									...ce(r, d * 0.05),
									children: [
										f.jsxs("div", {
											className:
												"hidden sm:flex flex-col items-center shrink-0",
											children: [
												f.jsx("div", {
													className: `w-0.75 flex-1 overflow-hidden ${d === 0 ? "invisible" : "bg-[#F9F7F7]"}`,
													children: f.jsx("div", {
														className: `w-full bg-neutral-900 transition-all ease-linear ${n >= d ? "h-full duration-150 delay-150" : "h-0 duration-150 delay-0"}`,
													}),
												}),
												f.jsx("div", {
													className:
														"size-11.5 shrink-0 bg-white flex shadow-[0px_6px_18.6px_0px_rgba(208,208,208,0.45)] items-center justify-center rounded-full border border-neutral-100 z-10",
													children: f.jsx("span", {
														className: `font-mono text-sm font-medium transition-colors ease-linear ${n >= d ? "text-neutral-900 duration-150 delay-300" : "text-neutral-400 duration-150 delay-0"}`,
														children: h.id,
													}),
												}),
												f.jsx("div", {
													className: `w-0.75 flex-1 overflow-hidden ${d === u.length - 1 ? "invisible" : "bg-[#F9F7F7]"}`,
													children: f.jsx("div", {
														className: `w-full bg-neutral-900 transition-all ease-linear ${n > d ? "h-full duration-150 delay-0" : "h-0 duration-150 delay-150"}`,
													}),
												}),
											],
										}),
										f.jsx("div", {
											className: "flex-1 py-3",
											children: f.jsxs("div", {
												className:
													"p-6 rounded-2xl transition-all bg-neutral-50 duration-300 h-full",
												children: [
													f.jsx("div", { className: "mb-4", children: h.icon }),
													f.jsx("h3", {
														className:
															"text-xl font-medium text-neutral-900 mb-1 -tracking-[0.2px]",
														children: h.title,
													}),
													f.jsx("p", {
														className:
															"text-neutral-500 text-sm leading-relaxed",
														children: h.description,
													}),
												],
											}),
										}),
									],
								},
								d,
							),
						),
					}),
				}),
			],
		}),
	});
}
const Sw = [
	{
		name: "Github",
		icon: "/images/integrations/github.svg",
		position: "absolute xl:left-10 2xl:left-50 top-39",
	},
	{
		name: "Drive",
		icon: "/images/integrations/drive.svg",
		position: "absolute xl:left-60 2xl:left-120 top-39",
	},
	{
		name: "Notion",
		icon: "/images/integrations/notion.svg",
		position: "absolute xl:left-100 2xl:left-155 bottom-16",
	},
	{
		name: "Zapier",
		icon: "/images/integrations/xapier.svg",
		position: "absolute xl:right-10 2xl:right-50 top-39",
	},
	{
		name: "Stripe",
		icon: "/images/integrations/stripe.svg",
		position: "absolute xl:right-60 2xl:right-120 top-39",
	},
	{
		name: "Slack",
		icon: "/images/integrations/slack.svg",
		position: "absolute xl:right-100 2xl:right-155 bottom-16",
	},
];
function P5() {
	const n = it();
	return f.jsxs(pt, {
		className: "py-12 lg:py-25 relative",
		children: [
			f.jsxs(P.div, {
				className: "lg:max-w-xl xl:max-w-xl mx-auto text-center relative z-10",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono justify-center text-center gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									fillRule: "evenodd",
									clipRule: "evenodd",
									d: "M13.0433 4.65373V2.29297C13.0433 1.87876 12.7075 1.54297 12.2933 1.54297C11.8791 1.54297 11.5433 1.87876 11.5433 2.29297L11.5433 4.65373L8.46029 4.65373L8.46029 2.29297C8.46029 1.87886 8.12435 1.54314 7.71029 1.54297C7.29607 1.54297 6.96029 1.87876 6.96029 2.29297L6.96029 4.65373L5.21029 4.65373C5.21015 4.65373 5.21002 4.65373 5.20988 4.65373H4.16797C3.75391 4.6539 3.41797 4.98962 3.41797 5.40373C3.41797 5.81783 3.7539 6.15355 4.16797 6.15373H4.46029L4.46029 10.1957C4.46045 13.0018 6.54593 15.3204 9.25163 15.6864V17.7093C9.25163 18.1235 9.58741 18.4593 10.0016 18.4593C10.4158 18.4593 10.7516 18.1235 10.7516 17.7093V15.6864C13.4573 15.3202 15.5431 13.0017 15.5433 10.1957V6.15373H15.835C16.2492 6.15373 16.585 5.81794 16.585 5.40373C16.585 4.98951 16.2492 4.65373 15.835 4.65373H14.7937C14.7936 4.65373 14.7934 4.65373 14.7933 4.65373L13.0433 4.65373ZM14.0433 6.15373L5.96029 6.15373L5.96029 10.1957C5.96046 12.4276 7.76941 14.2366 10.0013 14.2367C12.2333 14.2367 14.0431 12.4277 14.0433 10.1957V6.15373Z",
									fill: "#404040",
								}),
							}),
							"Integration",
						],
					}),
					f.jsx("h2", {
						className:
							"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
						children: "Works with the tools you already use",
					}),
					f.jsx("p", {
						className:
							"text-lg text-neutral-500 mb-8  lg:mb-11 font-normal mx-auto max-w-lg",
						children:
							"Bring all your workflows together by integrating with the platforms your team relies on daily.",
					}),
					f.jsx(_e, {
						to: "/about",
						className:
							"py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-black transition-colors duration-300 hover:bg-neutral-700",
						children: "Explore integration",
					}),
				],
			}),
			Sw.map((i) =>
				f.jsxs(
					P.div,
					{
						className: `${i.position} hidden xl:inline-flex gap-3 items-center z-10 flex-col`,
						...ce(n, 0.1),
						children: [
							f.jsx("div", {
								className:
									"border size-20 inline-flex shadow-integration  items-center justify-center border-black/10 bg-white rounded-xl ",
								children: f.jsx("img", { src: i.icon, alt: i.name }),
							}),
							f.jsx("span", {
								className:
									"border inline-flex items-center justify-center h-7 rounded-full px-3 py-1 font-medium text-neutral-900 border-black/10 bg-white text-sm",
								children: i.name,
							}),
						],
					},
					i.name,
				),
			),
			f.jsx("svg", {
				className: "absolute 2xl:left-70 left-10 top-50 hidden xl:block",
				width: "494",
				height: "190",
				viewBox: "0 0 494 190",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: f.jsx("path", {
					d: "M494 189.5L427.133 189.5C405.87 189.5 385.761 179.836 372.477 163.235L263.276 26.7652C249.992 10.1638 229.882 0.500026 208.62 0.50003L-1.65229e-05 0.500061",
					stroke: "#F1F1F1",
				}),
			}),
			f.jsx("svg", {
				className: "absolute 2xl:right-70 xl:right-10 top-50 hidden xl:block",
				width: "494",
				height: "190",
				viewBox: "0 0 494 190",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: f.jsx("path", {
					d: "M0 189.5L66.8675 189.5C88.1296 189.5 108.239 179.836 121.523 163.235L230.724 26.7652C244.008 10.1638 264.118 0.500026 285.38 0.50003L494 0.500061",
					stroke: "#F1F1F1",
				}),
			}),
		],
	});
}
function Cw() {
	const n = it();
	return f.jsxs(pt, {
		className: "py-12 lg:py-25",
		children: [
			f.jsxs(P.div, {
				className: "max-w-lg mx-auto text-center relative z-10 mb-10 sm:mb-16",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono justify-center text-center gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									d: "M10.0016 2.375C10.2871 2.375 10.5481 2.53698 10.6744 2.79297L12.733 6.96582L17.3385 7.63477C17.6209 7.67589 17.8558 7.87407 17.944 8.14551C18.032 8.41692 17.9579 8.71489 17.7535 8.91406L14.4215 12.1611L15.2086 16.748C15.2568 17.0294 15.1407 17.3137 14.9098 17.4814C14.679 17.649 14.3732 17.6716 14.1207 17.5391L10.0016 15.373L5.88342 17.5391C5.63074 17.6719 5.32434 17.6492 5.09339 17.4814C4.86247 17.3137 4.74636 17.0294 4.79456 16.748L5.58069 12.1611L2.24964 8.91406C2.04525 8.71484 1.97206 8.41697 2.06018 8.14551C2.1484 7.874 2.38314 7.67582 2.66565 7.63477L7.26917 6.96582L9.32874 2.79297L9.38245 2.70117C9.52088 2.49881 9.75194 2.37505 10.0016 2.375ZM8.44006 7.9834C8.33075 8.20451 8.11973 8.35808 7.87561 8.39355L4.3844 8.90039L6.91077 11.3633C7.08737 11.5355 7.16814 11.7832 7.12659 12.0264L6.52991 15.5039L9.65296 13.8623L9.73694 13.8242C9.93614 13.749 10.1602 13.7619 10.3512 13.8623L13.4723 15.5029L12.8766 12.0264C12.8351 11.7833 12.9159 11.5355 13.0924 11.3633L15.6178 8.90039L12.1276 8.39355C11.8834 8.35805 11.6724 8.20456 11.5631 7.9834L10.0016 4.81934L8.44006 7.9834Z",
									fill: "#404040",
								}),
							}),
							"Testimonial",
						],
					}),
					f.jsx("h2", {
						className:
							"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
						children: "Loved by modern teams and businesses",
					}),
				],
			}),
			f.jsxs(P.div, {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-12",
				...Ie(n),
				children: [
					f.jsxs(P.div, {
						className:
							"bg-soft-green rounded-3xl py-5 px-8 sm:py-9 sm:px-12 flex-col flex justify-between sm:col-span-2 lg:col-span-9",
						...ce(),
						children: [
							f.jsxs("p", {
								className:
									"text-lg sm:text-3xl font-medium text-neutral-900 mb-8 lg:mb-0",
								children: [
									"This solution helped us streamline operations and save countless hours every week.”",
									" ",
								],
							}),
							f.jsxs("div", {
								children: [
									f.jsx("span", {
										className: "text-lg text-neutral-500 block",
										children: "Daniel Carter",
									}),
									f.jsx("span", {
										className: "text-lg text-neutral-500 block",
										children: "Head of Product at AYMO.AI",
									}),
								],
							}),
						],
					}),
					f.jsx(P.div, {
						className: "sm:col-span-2 lg:col-span-3",
						...ce(n, 0.05),
						children: f.jsx("img", {
							src: "/images/testimonials/avatar-lg.png",
							className: "w-full h-full object-cover rounded-2xl",
							alt: "",
						}),
					}),
					f.jsxs(P.div, {
						className: "lg:col-span-4 rounded-3xl p-6 bg-neutral-100",
						...ce(n, 0.1),
						children: [
							f.jsx("p", {
								children:
									"By this I save on drafting proposals and managing my calendar means I can focus on higher-level strategy and actually growing my revenue.",
							}),
							f.jsxs("div", {
								className: "gap-2 flex items-center mt-10",
								children: [
									f.jsx("div", {
										children: f.jsx("img", {
											src: "/images/testimonials/avatar-1.png",
											className: "size-14 rounded-full",
											alt: "",
										}),
									}),
									f.jsxs("div", {
										children: [
											f.jsx("span", {
												className:
													" text-neutral-900 block text-base font-medium",
												children: "Emily Johnson",
											}),
											f.jsx("span", {
												className: "text-sm text-neutral-500 block",
												children: "Founder of TechNova Solutions",
											}),
										],
									}),
								],
							}),
						],
					}),
					" ",
					f.jsxs(P.div, {
						className: "lg:col-span-4 rounded-3xl p-6 bg-neutral-100",
						...ce(n, 0.15),
						children: [
							f.jsx("p", {
								children:
									"This AI assistant handles my scheduling, drafts client emails, and even summarizes my meeting notes.",
							}),
							f.jsxs("div", {
								className: "gap-2 flex items-center mt-10",
								children: [
									f.jsx("div", {
										children: f.jsx("img", {
											src: "/images/testimonials/avatar-2.png",
											className: "size-14 rounded-full",
											alt: "",
										}),
									}),
									f.jsxs("div", {
										children: [
											f.jsx("span", {
												className:
													" text-neutral-900 block text-base font-medium",
												children: "Michael Chen",
											}),
											f.jsx("span", {
												className: "text-sm text-neutral-500 block",
												children: "Founder at BrightLabs",
											}),
										],
									}),
								],
							}),
						],
					}),
					f.jsxs(P.div, {
						className:
							"sm:col-span-2 lg:col-span-4 rounded-3xl p-6 bg-neutral-100",
						...ce(n, 0.2),
						children: [
							f.jsx("p", {
								children:
									"It helps me prep for client calls by pulling up past data and suggesting agenda items based on what we discussed last week.",
							}),
							f.jsxs("div", {
								className: "gap-2 flex items-center mt-10",
								children: [
									f.jsx("div", {
										children: f.jsx("img", {
											src: "/images/testimonials/avatar-3.png",
											className: "size-14 rounded-full",
											alt: "",
										}),
									}),
									f.jsxs("div", {
										children: [
											f.jsx("span", {
												className:
													" text-neutral-900 block text-base font-medium",
												children: "John Mendos",
											}),
											f.jsx("span", {
												className: "text-sm text-neutral-500 block",
												children: "Project Manager at Philips",
											}),
										],
									}),
								],
							}),
						],
					}),
				],
			}),
		],
	});
}
const jw = [
	{
		question: "What does this platform do?",
		answer:
			"It helps automate workflows, assist teams, and improve overall business efficiency using AI.",
	},
	{
		question: "Can it work with our existing tools?",
		answer:
			"Yes, it integrates seamlessly with popular tools like Slack, Notion, GitHub, and more.",
	},
	{
		question: "Can workflows be customized?",
		answer:
			"Absolutely. You can define custom workflows tailored to your team's specific needs and processes.",
	},
	{
		question: "Is it suitable for growing teams?",
		answer:
			"Yes, the platform is built to scale with your team — from early-stage startups to enterprise organizations.",
	},
	{
		question: "Can I cancel my subscription",
		answer:
			"You can cancel anytime from your account settings with no hidden fees or penalties.",
	},
];
function jd() {
	const [n, i] = C.useState(0),
		s = it();
	return f.jsx(pt, {
		className: "py-12 pb-8 lg:py-25",
		children: f.jsxs(P.div, {
			className: "flex-col flex lg:flex-row justify-between gap-10 xl:gap-16",
			...Ie(s),
			children: [
				f.jsx(P.div, {
					className: "xl:w-4/12",
					...ce(),
					children: f.jsxs("div", {
						children: [
							f.jsxs("p", {
								className:
									"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
								children: [
									f.jsx("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 20 20",
										fill: "none",
										xmlns: "http://www.w3.org/2000/svg",
										children: f.jsx("path", {
											d: "M8.47624 8.69997C8.47624 7.85773 9.159 7.17497 10.0012 7.17497C10.8435 7.17497 11.5262 7.85773 11.5262 8.69997C11.5262 9.21722 11.2687 9.67432 10.8749 9.95007C10.454 10.2447 10.0012 10.6415 10.0012 11.1552M10.0012 12.8286H10.0074M17.7096 10.0013C17.7096 14.2585 14.2585 17.7096 10.0013 17.7096C5.74411 17.7096 2.29297 14.2585 2.29297 10.0013C2.29297 5.74411 5.74411 2.29297 10.0013 2.29297C14.2585 2.29297 17.7096 5.74411 17.7096 10.0013Z",
											stroke: "#404040",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
										}),
									}),
									"FAQ",
								],
							}),
							f.jsx("h2", {
								className:
									"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
								children: "Frequently Asked Questions",
							}),
						],
					}),
				}),
				f.jsx(P.div, {
					className: "xl:w-6/12",
					...ce(s, 0.1),
					children: f.jsx("div", {
						className: "divide-y divide-neutral-100",
						children: jw.map((r, u) =>
							f.jsxs(
								"div",
								{
									className: "bg-white",
									children: [
										f.jsxs("button", {
											onClick: () => i(n === u ? -1 : u),
											className:
												"w-full flex items-center gap-4  py-5 text-left",
											children: [
												f.jsx(P.span, {
													animate: {
														backgroundColor:
															n === u ? "#111827" : "transparent",
														color: n === u ? "#ffffff" : "#6b7280",
													},
													transition: { duration: 0.2 },
													className:
														"shrink-0 size-7 rounded-lg flex items-center justify-center",
													children: f.jsx(P.svg, {
														width: "17",
														height: "17",
														viewBox: "0 0 17 17",
														fill: "none",
														xmlns: "http://www.w3.org/2000/svg",
														animate: { rotate: n === u ? 90 : 0 },
														transition: { duration: 0.25, ease: "easeInOut" },
														children: f.jsx("path", {
															d: "M6.30078 13.6523L11.5508 8.40234L6.30078 3.15234",
															stroke: "currentColor",
															strokeWidth: "1.5",
															strokeLinecap: "round",
															strokeLinejoin: "round",
														}),
													}),
												}),
												f.jsx("span", {
													className: "font-medium text-xl text-neutral-900",
													children: r.question,
												}),
											],
										}),
										f.jsx(X8, {
											initial: !1,
											children:
												n === u &&
												f.jsx(
													P.div,
													{
														initial: { height: 0, opacity: 0 },
														animate: { height: "auto", opacity: 1 },
														exit: { height: 0, opacity: 0 },
														transition: { duration: 0.3, ease: "easeInOut" },
														style: { overflow: "hidden" },
														children: f.jsx("p", {
															className:
																" pb-5 max-w-xl text-neutral-500 text-base leading-relaxed",
															children: r.answer,
														}),
													},
													"content",
												),
										}),
									],
								},
								u,
							),
						),
					}),
				}),
			],
		}),
	});
}
function Tw() {
	return f.jsxs("div", {
		className: "space-y-3",
		children: [
			f.jsx(ja, {
				description:
					"React AI website template for AI business assistant platforms. Includes features, integrations, pricing, blog, testimonials, and FAQs. Built with Tailwind CSS.",
			}),
			f.jsx(bw, {}),
			f.jsx(yw, {}),
			f.jsx(Z5, {}),
			f.jsx(K5, {}),
			f.jsx(Q5, {}),
			f.jsx(P5, {}),
			f.jsx(Cw, {}),
			f.jsx(jd, {}),
		],
	});
}
function Ja({ children: n }) {
	return f.jsxs("div", { children: [f.jsx(X5, { absolute: !0 }), n] });
}
function Aw({ className: n }) {
	const i = it();
	return f.jsx(pt, {
		className: vn("py-12 pt-25 lg:pt-30 lg:pb-25", n),
		children: f.jsxs(P.div, {
			className: "max-w-7xl mx-auto",
			...Ie(i),
			children: [
				f.jsxs(P.div, {
					className: "flex flex-col lg:flex-row justify-between gap-10",
					...ce(),
					children: [
						f.jsxs("div", {
							className: "lg:w-1/2",
							children: [
								f.jsxs("p", {
									className:
										"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
									children: [
										f.jsx("svg", {
											width: "20",
											height: "20",
											viewBox: "0 0 20 20",
											fill: "none",
											xmlns: "http://www.w3.org/2000/svg",
											children: f.jsx("path", {
												d: "M11.6654 16.6654V3.33203L4.22285 5.56479C3.69412 5.72341 3.33203 6.21006 3.33203 6.76207V16.6654H11.6654ZM11.6654 16.6654H16.6654V9.58203C16.6654 8.89168 16.1057 8.33203 15.4154 8.33203H11.6654V16.6654ZM6.66536 8.12222H8.33203M6.66536 10.9347H8.33203M6.66536 13.7472H8.33203",
												stroke: "#171717",
												strokeWidth: "1.5",
												strokeLinecap: "round",
												strokeLinejoin: "round",
											}),
										}),
										"About Us",
									],
								}),
								f.jsx("h2", {
									className:
										"text-3xl max-w-lg -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
									children: "Smarter businesses start with intelligent systems",
								}),
							],
						}),
						f.jsxs("div", {
							className: "lg:w-1/2",
							children: [
								f.jsx("p", {
									className: "mb-8 text-base text-neutral-500",
									children:
										"We build AI-powered tools that help modern teams automate operations, simplify workflows, and focus on what truly matters — growth.",
								}),
								f.jsx("p", {
									className: "text-base text-neutral-500",
									children:
										"Our mission is to make AI accessible, practical, and impactful for businesses of all sizes. We believe automation should reduce complexity — not create it. Our platform is built to remove repetitive work, unlock real-time insights, and empower teams to move faster with confidence.",
								}),
							],
						}),
					],
				}),
				f.jsx(P.div, {
					className: "py-10 lg:py-20",
					...ce(i, 0.1),
					children: f.jsx("img", {
						src: "/images/about-hero-img.png",
						className: "w-full",
						alt: "",
					}),
				}),
				f.jsxs(P.div, {
					className:
						"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  lg:gap-8",
					...ce(i, 0.2),
					children: [
						f.jsxs("div", {
							className: "flex flex-col items-center sm:items-start",
							children: [
								f.jsx("h3", {
									className: "text-neutral-900 text-[52px]",
									children: f.jsx(Zi, {
										to: 350,
										suffix: "K+",
										duration: 2.5,
										separator: ",",
									}),
								}),
								f.jsx("p", {
									className: "text-neutral-500 text-base font-normal",
									children: "Teams using the platform globally",
								}),
							],
						}),
						f.jsxs("div", {
							className: "flex flex-col items-center sm:items-start",
							children: [
								f.jsx("h3", {
									className: "text-neutral-900 text-[52px]",
									children: f.jsx(Zi, { to: 120, suffix: "+", duration: 2.5 }),
								}),
								f.jsx("p", {
									className: "text-neutral-500 text-base font-normal",
									children: "Countries supported",
								}),
							],
						}),
						" ",
						f.jsxs("div", {
							className: "flex flex-col items-center sm:items-start",
							children: [
								f.jsx("h3", {
									className: "text-neutral-900 text-[52px] ",
									children: f.jsx(Zi, { to: 4.8, decimals: 1, duration: 2.5 }),
								}),
								f.jsx("p", {
									className: "text-neutral-500 text-base font-normal",
									children: "Average customer rating",
								}),
							],
						}),
						f.jsxs("div", {
							className: "flex flex-col items-center sm:items-start",
							children: [
								f.jsx("h3", {
									className: "text-neutral-900 text-[52px]",
									children: f.jsx(Zi, {
										to: 99.9,
										decimals: 1,
										suffix: "%",
										duration: 2.5,
									}),
								}),
								f.jsx("p", {
									className: "text-neutral-500 text-base font-normal",
									children: "Platform uptime",
								}),
							],
						}),
					],
				}),
			],
		}),
	});
}
const Ew = [
	{
		name: "Justin Curtis",
		role: "CEO, Software Engineer",
		image: "/images/team/team-1.png",
	},
	{
		name: "Zaire Westervelt",
		role: "Design Engineer",
		image: "/images/team/team-2.png",
	},
	{
		name: "Kaiya Saris",
		role: "Marketing Manager",
		image: "/images/team/team-3.png",
	},
];
function Mw() {
	const n = it();
	return f.jsx(pt, {
		className: "py-12 lg:py-25",
		children: f.jsxs(P.div, {
			className: "max-w-7xl",
			...Ie(n),
			children: [
				f.jsxs(P.div, {
					className:
						"max-w-2xl mx-auto flex flex-col items-center mb-8 lg:mb-16",
					...ce(),
					children: [
						f.jsxs("div", {
							className: "relative",
							children: [
								f.jsx("img", { src: "/images/world-map.png", alt: "" }),
								f.jsx("div", {
									className:
										"absolute bottom-0 w-full  bg-linear-to-b h-50 from-white/0 to-white",
								}),
							],
						}),
						f.jsxs("p", {
							className:
								"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
							children: [
								f.jsx("svg", {
									width: "20",
									height: "20",
									viewBox: "0 0 20 20",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: f.jsx("path", {
										d: "M12.4158 15.9573C12.4158 15.9573 12.5018 11.0041 7.29193 11.0041C2.08208 11.0041 2.16806 15.9573 2.16806 15.9573M11.7564 4.25428C12.0614 4.11846 12.3991 4.04297 12.7545 4.04297C14.1108 4.04297 15.2103 5.14246 15.2103 6.49876C15.2103 7.85505 14.1108 8.95454 12.7545 8.95454C12.4006 8.95454 12.0642 8.87968 11.7602 8.74493M13.1611 11.0171C17.9136 11.2952 17.8326 15.9572 17.8326 15.9572M9.79348 6.49879C9.79348 7.85508 8.69399 8.95458 7.33769 8.95458C5.9814 8.95458 4.88191 7.85508 4.88191 6.49879C4.88191 5.1425 5.9814 4.043 7.33769 4.043C8.69399 4.043 9.79348 5.1425 9.79348 6.49879Z",
										stroke: "#404040",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
									}),
								}),
								"Our Team",
							],
						}),
						f.jsx("h2", {
							className:
								"text-3xl text-center -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
							children: "Our Remote Team",
						}),
						f.jsx("p", {
							className: "text-lg text-neutral-500 text-center font-normal ",
							children:
								"Behind every intelligent platform is a team passionate about technology and business innovation.",
						}),
					],
				}),
				f.jsx(P.div, {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					...Ie(n, 0.1),
					children: Ew.map((i, s) =>
						f.jsxs(
							P.div,
							{
								...ce(n, s * 0.05),
								children: [
									f.jsxs("div", {
										className: "relative mb-4 group overflow-hidden rounded-xl",
										children: [
											f.jsx("img", {
												src: i.image,
												className: "w-full",
												alt: i.name,
											}),
											f.jsxs("div", {
												className:
													"flex flex-col gap-3 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0",
												children: [
													f.jsx("a", {
														href: "#",
														className:
															"size-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 transition-colors",
														children: f.jsx("svg", {
															width: "24",
															height: "24",
															viewBox: "0 0 24 24",
															fill: "none",
															xmlns: "http://www.w3.org/2000/svg",
															children: f.jsx("path", {
																d: "M17.75 2.96094H20.8183L14.1167 10.6184L22 21.0401H15.8292L10.9925 14.7209L5.46417 21.0401H2.39083L9.5575 12.8476L2 2.96094H8.3275L12.695 8.73677L17.75 2.96094ZM16.6725 19.2059H18.3717L7.40167 4.69927H5.57667L16.6725 19.2059Z",
																fill: "white",
															}),
														}),
													}),
													f.jsx("a", {
														href: "#",
														className:
															"size-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 transition-colors",
														children: f.jsx("svg", {
															width: "23",
															height: "24",
															viewBox: "0 0 23 24",
															fill: "none",
															xmlns: "http://www.w3.org/2000/svg",
															children: f.jsx("path", {
																fillRule: "evenodd",
																clipRule: "evenodd",
																d: "M19.5986 20.4507H16.1894V14.88C16.1894 13.5533 16.1677 11.844 14.4172 11.844C12.6411 11.844 12.3714 13.292 12.3714 14.7867V20.4507H8.96233V8.99733H12.2322V10.5627H12.2794C12.7343 9.66267 13.8473 8.71333 15.5071 8.71333C18.9609 8.71333 19.5998 11.084 19.5998 14.1693V20.4507H19.5986ZM5.1175 7.43333C4.85775 7.4336 4.60048 7.38047 4.36041 7.27699C4.12033 7.1735 3.90213 7.02169 3.71828 6.83022C3.53443 6.63874 3.38852 6.41136 3.28888 6.16104C3.18925 5.91072 3.13783 5.64238 3.13758 5.37133C3.13733 5.10029 3.18824 4.83184 3.28742 4.58132C3.38659 4.33081 3.53207 4.10313 3.71557 3.91128C3.89907 3.71943 4.11698 3.56718 4.35687 3.46321C4.59675 3.35924 4.85391 3.3056 5.11367 3.30533C5.63826 3.3048 6.14158 3.52175 6.51289 3.90845C6.88419 4.29515 7.09307 4.81993 7.09358 5.36733C7.09409 5.91474 6.88618 6.43994 6.5156 6.82739C6.14501 7.21484 5.6421 7.4328 5.1175 7.43333ZM3.40911 20.4507H6.82333V8.99733H3.40783L3.40911 20.4507ZM21.298 0H1.69689C0.760278 0 0 0.774667 0 1.73067V22.268C0 23.224 0.760278 24 1.69689 24H21.298C22.2359 24 23 23.224 23 22.268V1.73067C23 0.774667 22.2359 0 21.298 0Z",
																fill: "white",
															}),
														}),
													}),
													f.jsx("a", {
														href: "#",
														className:
															"size-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 transition-colors",
														children: f.jsxs("svg", {
															width: "24",
															height: "24",
															viewBox: "0 0 24 24",
															fill: "none",
															xmlns: "http://www.w3.org/2000/svg",
															children: [
																f.jsxs("g", {
																	clipPath: "url(#clip0_19142_12022)",
																	children: [
																		f.jsx("path", {
																			d: "M23.9773 7.05607C23.9211 5.78085 23.7149 4.90416 23.4195 4.14449C23.1147 3.33812 22.6459 2.61617 22.0316 2.01602C21.4315 1.40652 20.7048 0.932921 19.9078 0.632936C19.1437 0.337529 18.2716 0.131312 16.9964 0.0750879C15.7116 0.0141019 15.3038 0 12.0453 0C8.78686 0 8.37901 0.0141019 7.09903 0.0703262C5.82382 0.126551 4.94712 0.332951 4.18764 0.628174C3.38108 0.932922 2.65914 1.40176 2.05899 2.01602C1.44949 2.61617 0.976073 3.34288 0.675905 4.13991C0.380498 4.90416 0.174281 5.77609 0.118057 7.0513C0.0570706 8.33604 0.0429688 8.7439 0.0429688 12.0023C0.0429688 15.2608 0.0570706 15.6686 0.113295 16.9486C0.169519 18.2238 0.37592 19.1005 0.671326 19.8602C0.976073 20.6666 1.44949 21.3885 2.05899 21.9887C2.65914 22.5982 3.38585 23.0718 4.18288 23.3718C4.94712 23.6672 5.81906 23.8734 7.09446 23.9296C8.37425 23.986 8.78229 23.9999 12.0407 23.9999C15.2992 23.9999 15.707 23.986 16.987 23.9296C18.2622 23.8734 19.1389 23.6672 19.8984 23.3718C21.5113 22.7482 22.7865 21.4729 23.4101 19.8602C23.7054 19.096 23.9118 18.2238 23.968 16.9486C24.0242 15.6686 24.0383 15.2608 24.0383 12.0023C24.0383 8.7439 24.0336 8.33604 23.9773 7.05607ZM21.8161 16.8549C21.7644 18.027 21.5676 18.6599 21.4035 19.0819C21.0002 20.1274 20.1704 20.9572 19.1248 21.3605C18.7029 21.5246 18.0653 21.7215 16.8978 21.7729C15.632 21.8293 15.2523 21.8433 12.0501 21.8433C8.84785 21.8433 8.46344 21.8293 7.20214 21.7729C6.03004 21.7215 5.3971 21.5246 4.97515 21.3605C4.45484 21.1682 3.98124 20.8634 3.59682 20.4649C3.19831 20.0758 2.89356 19.6069 2.70126 19.0866C2.53717 18.6647 2.34029 18.027 2.28883 16.8596C2.23242 15.5937 2.2185 15.2139 2.2185 12.0117C2.2185 8.80946 2.23242 8.42505 2.28883 7.16394C2.34029 5.99183 2.53717 5.3589 2.70126 4.93694C2.89356 4.41645 3.19831 3.94303 3.60159 3.55843C3.99058 3.15992 4.45942 2.85517 4.97991 2.66306C5.40187 2.49896 6.03956 2.30209 7.2069 2.25044C8.47278 2.19422 8.85261 2.18011 12.0547 2.18011C15.2616 2.18011 15.6413 2.19422 16.9026 2.25044C18.0747 2.30209 18.7076 2.49896 19.1296 2.66306C19.6499 2.85517 20.1235 3.15992 20.5079 3.55843C20.9064 3.94761 21.2112 4.41645 21.4035 4.93694C21.5676 5.3589 21.7644 5.99641 21.8161 7.16394C21.8723 8.42981 21.8864 8.80946 21.8864 12.0117C21.8864 15.2139 21.8723 15.589 21.8161 16.8549Z",
																			fill: "white",
																		}),
																		f.jsx("path", {
																			d: "M12.0442 5.83594C8.64049 5.83594 5.87891 8.59734 5.87891 12.0012C5.87891 15.4051 8.64049 18.1665 12.0442 18.1665C15.448 18.1665 18.2094 15.4051 18.2094 12.0012C18.2094 8.59734 15.448 5.83594 12.0442 5.83594ZM12.0442 16.0005C9.83604 16.0005 8.04492 14.2095 8.04492 12.0012C8.04492 9.79289 9.83604 8.00195 12.0442 8.00195C14.2525 8.00195 16.0434 9.79289 16.0434 12.0012C16.0434 14.2095 14.2525 16.0005 12.0442 16.0005Z",
																			fill: "white",
																		}),
																		f.jsx("path", {
																			d: "M19.8944 5.59165C19.8944 6.38648 19.2499 7.03096 18.4549 7.03096C17.6601 7.03096 17.0156 6.38648 17.0156 5.59165C17.0156 4.79663 17.6601 4.15234 18.4549 4.15234C19.2499 4.15234 19.8944 4.79663 19.8944 5.59165Z",
																			fill: "white",
																		}),
																	],
																}),
																f.jsx("defs", {
																	children: f.jsx("clipPath", {
																		id: "clip0_19142_12022",
																		children: f.jsx("rect", {
																			width: "24",
																			height: "24",
																			fill: "white",
																		}),
																	}),
																}),
															],
														}),
													}),
												],
											}),
										],
									}),
									f.jsx("h3", {
										className:
											"mb-1 text-neutral-900  leading-7 font-medium text-lg",
										children: i.name,
									}),
									f.jsx("p", {
										className: "text-neutral-500 text-sm",
										children: i.role,
									}),
								],
							},
							s,
						),
					),
				}),
			],
		}),
	});
}
const Nw = [
	{
		icon: "/images/what-we-do/icon-1.svg",
		title: "Workflow Automation",
		description:
			"Automate repetitive processes and eliminate manual bottlenecks.",
	},
	{
		icon: "/images/what-we-do/icon-2.svg",
		title: "Scalable Infrastructure",
		description: "Built to grow with your team — from startup to enterprise.",
	},
	{
		icon: "/images/what-we-do/icon-3.svg",
		title: "Business Intelligence",
		description: "Access insights that guide faster and smarter decisions.",
	},
	{
		icon: "/images/what-we-do/icon-4.svg",
		title: "AI-Powered Assistance",
		description:
			"Support teams and customers with reliable, always-available AI tools.",
	},
];
function Rw() {
	const n = it();
	return f.jsx(pt, {
		className: "py-12 lg:py-25",
		children: f.jsxs(P.div, {
			className: "max-w-7xl",
			...Ie(n),
			children: [
				f.jsxs(P.div, {
					className:
						"max-w-2xl mx-auto flex flex-col items-center mb-8 lg:mb-16",
					...ce(),
					children: [
						f.jsxs("p", {
							className:
								"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
							children: [
								f.jsx("svg", {
									width: "20",
									height: "20",
									viewBox: "0 0 20 20",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: f.jsx("path", {
										fillRule: "evenodd",
										clipRule: "evenodd",
										d: "M10.001 3.08594C13.8201 3.08594 16.9159 6.18189 16.916 10.001C16.916 13.8201 13.8201 16.916 10.001 16.916C6.18189 16.9159 3.08594 13.8201 3.08594 10.001C3.08603 6.18195 6.18195 3.08603 10.001 3.08594ZM10.001 18.416C14.6486 18.416 18.416 14.6486 18.416 10.001C18.4159 5.35346 14.6485 1.58594 10.001 1.58594C5.35352 1.58603 1.58603 5.35352 1.58594 10.001C1.58594 14.6485 5.35346 18.4159 10.001 18.416ZM13.0171 7.89005C12.7242 7.59733 12.2494 7.59721 11.9566 7.89005L9.32472 10.5209L8.04542 9.24161C7.75253 8.94872 7.27777 8.94872 6.98487 9.24161C6.69211 9.53451 6.69203 10.0093 6.98487 10.3022L8.79542 12.1127C8.93604 12.2532 9.12693 12.3324 9.3257 12.3324C9.52448 12.3324 9.71537 12.2532 9.85597 12.1127L13.0171 8.95059C13.31 8.6577 13.31 8.18294 13.0171 7.89005Z",
										fill: "#404040",
									}),
								}),
								"What We Do",
							],
						}),
						f.jsx("h2", {
							className:
								"text-3xl text-center -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
							children: "What We Do",
						}),
						f.jsx("p", {
							className: "text-lg text-neutral-500 text-center font-normal ",
							children:
								"We design intelligent systems that transform how businesses operate.",
						}),
					],
				}),
				f.jsx(P.div, {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
					...Ie(n, 0.1),
					children: Nw.map((i, s) =>
						f.jsxs(
							P.div,
							{
								className: "flex flex-col items-center sm:items-start",
								...ce(n, s * 0.05),
								children: [
									f.jsx("img", {
										src: i.icon,
										className: "mb-8 size-12 rounded-xl",
										alt: "",
									}),
									f.jsx("h3", {
										className: "font-medium text-lg text-neutral-900 mb-2",
										children: i.title,
									}),
									f.jsx("p", {
										className:
											"text-neutral-500 text-base text-center sm:text-left",
										children: i.description,
									}),
								],
							},
							s,
						),
					),
				}),
			],
		}),
	});
}
function Dw() {
	const n = it();
	return f.jsx(pt, {
		className: "py-12 lg:py-25",
		children: f.jsx(P.div, {
			className: "max-w-260 mx-auto",
			...Ie(n),
			children: f.jsxs(P.div, {
				className: "flex gap-10 flex-col lg:flex-row justify-between xl:gap-16",
				...Ie(n),
				children: [
					f.jsxs(P.div, {
						className: "lg:w-1/2  xl:w-5/12",
						...ce(),
						children: [
							f.jsxs("div", {
								children: [
									f.jsxs("p", {
										className:
											"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
										children: [
											f.jsx("svg", {
												width: "20",
												height: "20",
												viewBox: "0 0 20 20",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("path", {
													d: "M8.47624 8.69997C8.47624 7.85773 9.159 7.17497 10.0012 7.17497C10.8435 7.17497 11.5262 7.85773 11.5262 8.69997C11.5262 9.21722 11.2687 9.67432 10.8749 9.95007C10.454 10.2447 10.0012 10.6415 10.0012 11.1552M10.0012 12.8286H10.0074M17.7096 10.0013C17.7096 14.2585 14.2585 17.7096 10.0013 17.7096C5.74411 17.7096 2.29297 14.2585 2.29297 10.0013C2.29297 5.74411 5.74411 2.29297 10.0013 2.29297C14.2585 2.29297 17.7096 5.74411 17.7096 10.0013Z",
													stroke: "#404040",
													strokeWidth: "1.5",
													strokeLinecap: "round",
													strokeLinejoin: "round",
												}),
											}),
											"Why us",
										],
									}),
									f.jsx("h2", {
										className:
											"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
										children: "Why Businesses Choose Us",
									}),
									f.jsx("p", {
										className:
											"text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg",
										children:
											"Modern teams choose SynthAI because we combine flexibility, performance, and simplicity in one scalable AI platform.",
									}),
								],
							}),
							f.jsxs("ul", {
								className: "text-base text-neutral-500 space-y-3",
								children: [
									f.jsxs("li", {
										className: "flex items-center gap-3",
										children: [
											f.jsx("svg", {
												width: "6",
												height: "6",
												viewBox: "0 0 6 6",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("rect", {
													width: "6",
													height: "6",
													rx: "3",
													fill: "#A3A3A3",
												}),
											}),
											"No unnecessary complexity",
										],
									}),
									" ",
									f.jsxs("li", {
										className: "flex items-center gap-3",
										children: [
											f.jsx("svg", {
												width: "6",
												height: "6",
												viewBox: "0 0 6 6",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("rect", {
													width: "6",
													height: "6",
													rx: "3",
													fill: "#A3A3A3",
												}),
											}),
											"Seamless integrations",
										],
									}),
									" ",
									f.jsxs("li", {
										className: "flex items-center gap-3",
										children: [
											f.jsx("svg", {
												width: "6",
												height: "6",
												viewBox: "0 0 6 6",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("rect", {
													width: "6",
													height: "6",
													rx: "3",
													fill: "#A3A3A3",
												}),
											}),
											"Advanced automation",
										],
									}),
									" ",
									f.jsxs("li", {
										className: "flex items-center gap-3",
										children: [
											f.jsx("svg", {
												width: "6",
												height: "6",
												viewBox: "0 0 6 6",
												fill: "none",
												xmlns: "http://www.w3.org/2000/svg",
												children: f.jsx("rect", {
													width: "6",
													height: "6",
													rx: "3",
													fill: "#A3A3A3",
												}),
											}),
											"Enterprise-ready security",
										],
									}),
								],
							}),
						],
					}),
					f.jsx(P.div, {
						className: "lg:w-1/2 xl:w-6/12 lg:ml-auto",
						...ce(n, 0.1),
						children: f.jsx("div", {
							children: f.jsx("img", {
								src: "/images/why-us.png",
								className: "w-full rounded-xl",
								alt: "Description of image",
							}),
						}),
					}),
				],
			}),
		}),
	});
}
function Lw() {
	return f.jsxs(Ja, {
		children: [
			f.jsx(ja, {
				title: "About Us | Synth AI",
				description: "Learn more about our mission and team at Synth AI.",
			}),
			f.jsxs("div", {
				className: "space-y-3",
				children: [
					f.jsx(Aw, { className: vn("lg:pt-40") }),
					f.jsx(Rw, {}),
					f.jsx(Dw, {}),
					f.jsx(Mw, {}),
				],
			}),
		],
	});
}
function zw() {
	return f.jsxs(Ja, {
		children: [
			f.jsx(ja, {
				title: "Features | Synth AI",
				description: "Explore the powerful features of our platform.",
			}),
			f.jsxs("div", {
				className: "space-y-3",
				children: [
					f.jsx(Z5, { className: vn("pt-30 lg:pt-40") }),
					f.jsx(K5, {}),
					f.jsx(Q5, {}),
					f.jsx(P5, {}),
				],
			}),
		],
	});
}
const Ow = () =>
		f.jsx("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: f.jsx("path", {
				d: "M13.401 4.35938L6.12099 11.6394L2.59766 8.11608",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
			}),
		}),
	Vw = [
		{
			name: "Free",
			icon: "/images/pricing/free.svg",
			description: "Perfect for exploring the platform",
			price: { monthly: "0", annually: "0" },
			btnText: "Started free",
			btnStyles:
				"text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-300",
			features: [
				"Access to AI assistant",
				"Up to 3 active workflows",
				"500 AI requests per month",
				"Basic integrations",
				"Standard performance",
				"Community support",
			],
		},
		{
			name: "Basic",
			icon: "/images/pricing/basic.svg",
			description: "Best for individuals and small teams",
			price: { monthly: "12", annually: "10" },
			btnText: "Choose plan",
			btnStyles:
				"text-neutral-900 border border-neutral-900 bg-white hover:bg-neutral-100 transition-colors duration-300",
			features: [
				"Everything in Free",
				"Up to 10 active workflows",
				"5,000 AI requests per month",
				"All standard integrations",
				"Faster processing speed",
				"Email support",
			],
		},
		{
			name: "Pro",
			icon: "/images/pricing/pro.svg",
			description: "Perfect for exploring the platform",
			price: { monthly: "29", annually: "24" },
			btnText: "Choose plan",
			btnStyles:
				"text-white bg-neutral-900 border border-neutral-900 hover:bg-neutral-700 transition-colors duration-300",
			features: [
				"Everything in Basic",
				"Unlimited workflows",
				"50,000 AI requests per month",
				"Advanced automation tools",
				"Analytics and performance insights",
				"Priority support",
			],
			isPopular: !0,
		},
		{
			name: "Enterprise",
			icon: "/images/pricing/enterprise.svg",
			description: "For large teams and organizations",
			price: { monthly: "Custom", annually: "Custom" },
			btnText: "Contact Sales",
			btnStyles:
				"text-neutral-900 border border-neutral-900 bg-white hover:bg-neutral-100 transition-colors duration-300",
			features: [
				"Everything in Pro",
				"Unlimited AI requests",
				"Unlimited workspaces",
				"Dedicated infrastructure",
				"Custom integrations",
				"Advanced security and compliance",
				"24/7 priority support",
			],
		},
	];
function Bw() {
	const [n, i] = C.useState("monthly"),
		s = it();
	return f.jsxs(pt, {
		className: "pb-12 lg:pb-25 lg:pt-40",
		children: [
			f.jsxs(P.div, {
				className: "flex flex-col items-center text-center mb-10 lg:mb-16",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									d: "M11.0859 9.91871C11.0859 9.46914 10.7215 9.1047 10.2719 9.1047H9.94271C9.37533 9.1047 8.91538 9.56465 8.91538 10.132C8.91538 10.5603 9.18101 10.9436 9.58197 11.0939L10.4193 11.408C10.8203 11.5583 11.0859 11.9417 11.0859 12.3699C11.0859 12.9373 10.626 13.3972 10.0586 13.3972H9.72939C9.27983 13.3972 8.91538 13.0328 8.91538 12.5832M10.0007 13.3972V14.1191M10.0007 8.38269V9.1047M8.11144 5.27678H11.7439C12.0501 5.27678 12.3425 5.38593 12.5633 5.59818C13.8771 6.86123 18.4152 11.5692 16.5943 14.7221C15.0965 17.3156 4.7597 17.3172 3.261 14.7221C1.44011 11.5692 5.97824 6.86123 7.29204 5.59818C7.51282 5.38593 7.80518 5.27678 8.11144 5.27678ZM11.9734 5.27678L8.02694 5.27678L6.43932 2.36012C6.43932 2.36012 8.67678 3.27584 10.0002 2.36012C11.3236 1.44439 13.561 2.36012 13.561 2.36012L11.9734 5.27678Z",
									stroke: "#404040",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
								}),
							}),
							"pricing",
						],
					}),
					f.jsx("h2", {
						className:
							"text-3xl max-w-2xl mb-4 -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
						children: "Simple, Transparent Pricing",
					}),
					f.jsx("p", {
						className: "text-base text-neutral-500 mb-9",
						children:
							"Choose a plan that fits your business. Start small and scale as you grow.",
					}),
					f.jsxs("div", {
						className:
							"bg-neutral-100  rounded-lg p-0.5 inline-flex items-center relative z-0",
						children: [
							f.jsxs("button", {
								onClick: () => i("monthly"),
								className: `relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 ${n === "monthly" ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`,
								children: [
									n === "monthly" &&
										f.jsx(P.div, {
											layoutId: "activeTab",
											className:
												"absolute inset-0 bg-white rounded-md shadow-sm border border-neutral-200",
											transition: {
												type: "spring",
												bounce: 0.2,
												duration: 0.6,
											},
											style: { zIndex: -1 },
										}),
									"Monthly",
								],
							}),
							f.jsxs("button", {
								onClick: () => i("annually"),
								className: `relative z-10 px-4 pr-3 py-2 text-sm font-medium transition-colors duration-200 ${n === "annually" ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`,
								children: [
									n === "annually" &&
										f.jsx(P.div, {
											layoutId: "activeTab",
											className:
												"absolute inset-0 bg-white rounded-md shadow-sm border border-neutral-200",
											transition: {
												type: "spring",
												bounce: 0.2,
												duration: 0.6,
											},
											style: { zIndex: -1 },
										}),
									"Annually",
									f.jsx("span", {
										className:
											"ml-3  bg-[#20833F] text-white text-xs font-bold px-2 py-0.5 rounded",
										children: "Save 20%",
									}),
								],
							}),
						],
					}),
				],
			}),
			f.jsx(P.div, {
				className: "mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5",
				...Ie(s),
				children: Vw.map((r, u) =>
					f.jsxs(
						P.div,
						{
							className: `rounded-2xl p-2 ${r.isPopular ? "bg-neutral-900" : "bg-neutral-50 border border-neutral-100"}`,
							...ce(s, u * 0.05),
							children: [
								f.jsxs("div", {
									className:
										"py-5 px-4 rounded-xl relative overflow-hidden bg-white",
									children: [
										r.isPopular &&
											f.jsxs(f.Fragment, {
												children: [
													f.jsx("img", {
														src: "/images/pricing/pro-bg.png",
														className:
															"w-full h-full inset-0 rounded-xl absolute pointer-events-none object-cover",
														alt: "",
													}),
													f.jsxs("span", {
														className:
															"absolute z-20 h-6 inline-flex items-center text-xs font-medium justify-center top-2 right-2 text-[#585ECE] bg-[#F3F3F3] rounded-full p-1 pr-2 ",
														children: [
															f.jsxs("svg", {
																className: "-mb-1.5",
																width: "23",
																height: "22",
																viewBox: "0 0 23 22",
																fill: "none",
																xmlns: "http://www.w3.org/2000/svg",
																children: [
																	f.jsx("g", {
																		filter: "url(#filter0_di_19124_3657)",
																		children: f.jsx("path", {
																			d: "M6.83676 2.60156H15.3892C15.4838 2.60155 15.5772 2.62394 15.6615 2.6669C15.7459 2.70987 15.8189 2.77218 15.8746 2.84876L18.1684 6.00236C18.2091 6.05848 18.2292 6.12699 18.2252 6.19623C18.2211 6.26548 18.1932 6.33118 18.1462 6.38216L11.3332 13.7628C11.3051 13.7931 11.271 13.8173 11.2331 13.8339C11.1952 13.8505 11.1543 13.859 11.113 13.859C11.0716 13.859 11.0307 13.8505 10.9928 13.8339C10.9549 13.8173 10.9208 13.7931 10.8928 13.7628L4.07976 6.38276C4.03257 6.33174 4.00456 6.26592 4.00051 6.19654C3.99646 6.12716 4.01663 6.05853 4.05756 6.00236L6.35136 2.84876C6.40703 2.77218 6.48003 2.70987 6.56439 2.6669C6.64875 2.62394 6.74209 2.60155 6.83676 2.60156Z",
																			fill: "#9292E6",
																		}),
																	}),
																	f.jsx("defs", {
																		children: f.jsxs("filter", {
																			id: "filter0_di_19124_3657",
																			x: "0",
																			y: "2.60156",
																			width: "22.2266",
																			height: "19.2578",
																			filterUnits: "userSpaceOnUse",
																			"color-interpolation-filters": "sRGB",
																			children: [
																				f.jsx("feFlood", {
																					"flood-opacity": "0",
																					result: "BackgroundImageFix",
																				}),
																				f.jsx("feColorMatrix", {
																					in: "SourceAlpha",
																					type: "matrix",
																					values:
																						"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
																					result: "hardAlpha",
																				}),
																				f.jsx("feOffset", { dy: "4" }),
																				f.jsx("feGaussianBlur", {
																					stdDeviation: "2",
																				}),
																				f.jsx("feComposite", {
																					in2: "hardAlpha",
																					operator: "out",
																				}),
																				f.jsx("feColorMatrix", {
																					type: "matrix",
																					values:
																						"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0",
																				}),
																				f.jsx("feBlend", {
																					mode: "normal",
																					in2: "BackgroundImageFix",
																					result:
																						"effect1_dropShadow_19124_3657",
																				}),
																				f.jsx("feBlend", {
																					mode: "normal",
																					in: "SourceGraphic",
																					in2: "effect1_dropShadow_19124_3657",
																					result: "shape",
																				}),
																				f.jsx("feColorMatrix", {
																					in: "SourceAlpha",
																					type: "matrix",
																					values:
																						"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
																					result: "hardAlpha",
																				}),
																				f.jsx("feOffset", { dy: "4" }),
																				f.jsx("feGaussianBlur", {
																					stdDeviation: "2",
																				}),
																				f.jsx("feComposite", {
																					in2: "hardAlpha",
																					operator: "arithmetic",
																					k2: "-1",
																					k3: "1",
																				}),
																				f.jsx("feColorMatrix", {
																					type: "matrix",
																					values:
																						"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0",
																				}),
																				f.jsx("feBlend", {
																					mode: "normal",
																					in2: "shape",
																					result:
																						"effect2_innerShadow_19124_3657",
																				}),
																			],
																		}),
																	}),
																],
															}),
															f.jsx("span", { children: " BEST VALUE" }),
														],
													}),
												],
											}),
										f.jsxs("div", {
											className: "relative z-10",
											children: [
												f.jsx("img", {
													src: r.icon,
													className: "mb-2 size-9",
													alt: "",
												}),
												f.jsx("h3", {
													className: "text-xl font-medium text-neutral-900",
													children: r.name,
												}),
												f.jsx("p", {
													className: "mb-5 text-neutral-500",
													children: r.description,
												}),
												r.price[n] === "Custom"
													? f.jsx("h3", {
															className: `text-4xl font-semibold gap-1 mb-6 -tracking-[2px] flex items-end ${r.isPopular ? "text-white" : "text-neutral-900"}`,
															children: "Custom pricing",
														})
													: f.jsxs("h3", {
															className:
																"text-5xl font-medium gap-1 mb-5 -tracking-[2px] flex items-end  text-neutral-900}",
															children: [
																"$",
																r.price[n],
																f.jsx("span", {
																	className:
																		'text-base tracking-normal text-neutral-500"}',
																	children: "/month",
																}),
															],
														}),
												f.jsx(_e, {
													to: "/contacts",
													className: `py-3 px-5 uppercase font-mono h-11 text-sm flex items-center justify-center rounded-lg ${r.btnStyles}`,
													children: r.btnText,
												}),
											],
										}),
									],
								}),
								f.jsxs("div", {
									className: "py-6 px-4",
									children: [
										f.jsx("span", {
											className: `block mb-3 text-sm font-medium ${r.isPopular ? "text-white" : "text-neutral-900"}`,
											children: "Features:",
										}),
										f.jsx("ul", {
											className: "space-y-3",
											children: r.features.map((h, d) =>
												f.jsxs(
													"li",
													{
														className: `flex gap-1 text-sm items-center ${r.isPopular ? "text-neutral-400" : "text-neutral-700"}`,
														children: [f.jsx(Ow, {}), h],
													},
													d,
												),
											),
										}),
									],
								}),
							],
						},
						u,
					),
				),
			}),
		],
	});
}
const _w = () =>
		f.jsx("svg", {
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: f.jsx("path", {
				d: "M11.999 2.05078C17.4933 2.05078 21.9473 6.50476 21.9473 11.999C21.9473 17.4933 17.4933 21.9473 11.999 21.9473C6.50476 21.9473 2.05078 17.4933 2.05078 11.999C2.05079 6.50477 6.50477 2.05079 11.999 2.05078ZM11.999 3.55078C7.33319 3.55079 3.55079 7.33319 3.55078 11.999C3.55078 16.6649 7.33319 20.4473 11.999 20.4473C16.6649 20.4473 20.4473 16.6649 20.4473 11.999C20.4473 7.33319 16.6649 3.55078 11.999 3.55078ZM14.4521 9.57129C14.745 9.27882 15.2199 9.27884 15.5127 9.57129C15.8053 9.86409 15.8052 10.339 15.5127 10.6318L11.7188 14.4258C11.5782 14.5663 11.3872 14.6454 11.1885 14.6455C10.9897 14.6455 10.7988 14.5663 10.6582 14.4258L8.48535 12.2539C8.1928 11.961 8.19257 11.4852 8.48535 11.1924C8.77808 10.9 9.25308 10.9002 9.5459 11.1924L11.1885 12.835L14.4521 9.57129Z",
				fill: "#737373",
			}),
		}),
	kw = [
		{
			name: "Free",
			price: { monthly: "$0", annually: "$0" },
			sub: "/month",
			btnText: "STARTED FREE",
			btnStyle:
				"bg-[#F3F3F3] text-neutral-900 transition-colors duration-300 hover:bg-neutral-300",
		},
		{
			name: "Basic",
			price: { monthly: "$12", annually: "$9" },
			sub: "/month",
			btnText: "CHOOSE PLAN",
			btnStyle:
				"border border-neutral-900 text-neutral-900 bg-white transition-colors duration-300 hover:bg-neutral-100",
		},
		{
			name: "Pro",
			price: { monthly: "$29", annually: "$23" },
			sub: "/month",
			btnText: "CHOOSE PLAN",
			btnStyle:
				"bg-black text-white transition-colors duration-300 hover:bg-neutral-700",
			isBestValue: !0,
		},
		{
			name: "Enterprise",
			price: { monthly: "Custom pricing", annually: "Custom pricing" },
			sub: "",
			btnText: "CONTACT SALES",
			btnStyle:
				"border border-neutral-900 text-neutral-900 bg-white transition-colors duration-300 hover:bg-neutral-100",
		},
	],
	Hw = [
		{
			category: "CORE USAGE",
			items: [
				{
					name: "Messages per month",
					values: ["1,000", "5,000", "50,000", "Unlimited"],
				},
				{ name: "AI Assistant Access", values: [!0, !0, !0, !0] },
				{ name: "Workspaces", values: ["1", "3", "10", "Unlimited"] },
			],
		},
		{
			category: "FEATURES",
			items: [
				{ name: "AI Chat Assistant", values: [!0, !0, !0, !0] },
				{
					name: "Workflow Automation",
					values: ["Basic", "Standard", "Advanced", "Advanced"],
				},
				{ name: "Custom Workflow Builder", values: ["-", !0, !0, !0] },
			],
		},
		{
			category: "PERFORMANCE & LIMITS",
			items: [
				{
					name: "Processing Speed",
					values: [
						"Standard",
						"Faster",
						"High Priority",
						"Dedicated Infrastructure",
					],
				},
				{ name: "Data Storage", values: ["1GB", "10GB", "50GB", "Unlimited"] },
				{ name: "Uptime SLA", values: ["-", "-", "99.9%", "99.9%"] },
			],
		},
	];
function Uw() {
	const [n, i] = C.useState("monthly"),
		s = it();
	return f.jsxs(pt, {
		className: "py-12 lg:py-25",
		children: [
			f.jsxs(P.div, {
				className: "flex flex-col items-center text-center mb-16",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									fillRule: "evenodd",
									clipRule: "evenodd",
									d: "M15.915 4.83203C15.915 4.41782 15.5793 4.08203 15.165 4.08203H4.83203C4.41782 4.08203 4.08203 4.41782 4.08203 4.83203V7.02641L15.915 7.02641V4.83203ZM15.915 8.52641L12.9704 8.52641V11.4708H15.915V8.52641ZM11.4704 8.52641H8.5262V11.4708L11.4704 11.4708V8.52641ZM7.0262 8.52641L4.08203 8.52641V11.4708H7.0262V8.52641ZM4.08203 15.165V12.9708H7.0262V15.915H4.83203C4.41782 15.915 4.08203 15.5793 4.08203 15.165ZM8.5262 15.915V12.9708L11.4704 12.9708V15.915H8.5262ZM12.9704 15.915V12.9708H15.915V15.165C15.915 15.5793 15.5793 15.915 15.165 15.915H12.9704ZM17.415 15.165C17.415 16.4077 16.4077 17.415 15.165 17.415H4.83203C3.58939 17.415 2.58203 16.4077 2.58203 15.165V4.83203C2.58203 3.58939 3.58939 2.58203 4.83203 2.58203H15.165C16.4077 2.58203 17.415 3.58939 17.415 4.83203V15.165Z",
									fill: "#404040",
								}),
							}),
							"pricing",
						],
					}),
					f.jsx("h2", {
						className:
							"text-3xl max-w-2xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
						children: "Compare table",
					}),
				],
			}),
			f.jsx(P.div, {
				className: "overflow-x-auto xl:overflow-visible",
				...ce(s, 0.1),
				children: f.jsxs("div", {
					className: "min-w-275 grid grid-cols-10",
					children: [
						f.jsxs("div", {
							className:
								"col-span-10 grid grid-cols-10 sticky top-20 z-40 bg-white pb-4 pt-6 -mt-6 ",
							children: [
								f.jsxs("div", {
									className: "col-span-3 pt-4 pr-8",
									children: [
										f.jsx("h3", {
											className: "text-xl font-medium text-neutral-900 mb-2",
											children: "Billing Cycle",
										}),
										f.jsx("p", {
											className: "text-sm text-neutral-500 mb-6",
											children:
												"Choose how you’d like to be billed. Save more with annual plans.",
										}),
										f.jsxs("div", {
											className:
												"bg-neutral-100 rounded-lg p-0.5 inline-flex items-center relative z-0",
											children: [
												f.jsxs("button", {
													onClick: () => i("monthly"),
													className: `relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 ${n === "monthly" ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`,
													children: [
														n === "monthly" &&
															f.jsx(P.div, {
																layoutId: "activeTabCompare",
																className:
																	"absolute inset-0 bg-white rounded-md shadow-sm border border-neutral-200",
																transition: {
																	type: "spring",
																	bounce: 0.2,
																	duration: 0.6,
																},
																style: { zIndex: -1 },
															}),
														"Monthly",
													],
												}),
												f.jsxs("button", {
													onClick: () => i("annually"),
													className: `relative z-10 px-4 pr-3 py-2 text-sm font-medium transition-colors duration-200 ${n === "annually" ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`,
													children: [
														n === "annually" &&
															f.jsx(P.div, {
																layoutId: "activeTabCompare",
																className:
																	"absolute inset-0 bg-white rounded-md shadow-sm border border-neutral-200",
																transition: {
																	type: "spring",
																	bounce: 0.2,
																	duration: 0.6,
																},
																style: { zIndex: -1 },
															}),
														"Annually",
														f.jsx("span", {
															className:
																"ml-3  inline-flex items-center rounded bg-[#20833F] px-2 py-0.5 text-xs font-medium text-white",
															children: "Save 20%",
														}),
													],
												}),
											],
										}),
									],
								}),
								f.jsx("div", {
									className: "col-span-7 grid grid-cols-4 gap-3",
									children: kw.map((r, u) =>
										f.jsxs(
											"div",
											{
												className: vn(
													" py-5 px-4 rounded-2xl shrink-0 relative  border border-neutral-200",
													r.isBestValue ? " border-0" : "bg-white",
												),
												children: [
													r.isBestValue &&
														f.jsx("img", {
															src: "/images/pricing/table-value-bg.png",
															className:
																"w-full h-full absolute inset-0 pointer-events-none rounded-2xl z-10",
															alt: "",
														}),
													r.isBestValue &&
														f.jsxs("span", {
															className:
																"absolute h-6 z-20 inline-flex items-center text-xs font-medium justify-center top-2 right-2 text-[#585ECE] bg-white rounded-full p-1 pr-2",
															children: [
																f.jsxs("svg", {
																	className: "-mb-1.5",
																	width: "23",
																	height: "22",
																	viewBox: "0 0 23 22",
																	fill: "none",
																	xmlns: "http://www.w3.org/2000/svg",
																	children: [
																		f.jsx("g", {
																			filter: "url(#filter0_di_19124_3657)",
																			children: f.jsx("path", {
																				d: "M6.83676 2.60156H15.3892C15.4838 2.60155 15.5772 2.62394 15.6615 2.6669C15.7459 2.70987 15.8189 2.77218 15.8746 2.84876L18.1684 6.00236C18.2091 6.05848 18.2292 6.12699 18.2252 6.19623C18.2211 6.26548 18.1932 6.33118 18.1462 6.38216L11.3332 13.7628C11.3051 13.7931 11.271 13.8173 11.2331 13.8339C11.1952 13.8505 11.1543 13.859 11.113 13.859C11.0716 13.859 11.0307 13.8505 10.9928 13.8339C10.9549 13.8173 10.9208 13.7931 10.8928 13.7628L4.07976 6.38276C4.03257 6.33174 4.00456 6.26592 4.00051 6.19654C3.99646 6.12716 4.01663 6.05853 4.05756 6.00236L6.35136 2.84876C6.40703 2.77218 6.48003 2.70987 6.56439 2.6669C6.64875 2.62394 6.74209 2.60155 6.83676 2.60156Z",
																				fill: "#9292E6",
																			}),
																		}),
																		f.jsx("defs", {
																			children: f.jsxs("filter", {
																				id: "filter0_di_19124_3657",
																				x: "0",
																				y: "2.60156",
																				width: "22.2266",
																				height: "19.2578",
																				filterUnits: "userSpaceOnUse",
																				"color-interpolation-filters": "sRGB",
																				children: [
																					f.jsx("feFlood", {
																						"flood-opacity": "0",
																						result: "BackgroundImageFix",
																					}),
																					f.jsx("feColorMatrix", {
																						in: "SourceAlpha",
																						type: "matrix",
																						values:
																							"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
																						result: "hardAlpha",
																					}),
																					f.jsx("feOffset", { dy: "4" }),
																					f.jsx("feGaussianBlur", {
																						stdDeviation: "2",
																					}),
																					f.jsx("feComposite", {
																						in2: "hardAlpha",
																						operator: "out",
																					}),
																					f.jsx("feColorMatrix", {
																						type: "matrix",
																						values:
																							"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0",
																					}),
																					f.jsx("feBlend", {
																						mode: "normal",
																						in2: "BackgroundImageFix",
																						result:
																							"effect1_dropShadow_19124_3657",
																					}),
																					f.jsx("feBlend", {
																						mode: "normal",
																						in: "SourceGraphic",
																						in2: "effect1_dropShadow_19124_3657",
																						result: "shape",
																					}),
																					f.jsx("feColorMatrix", {
																						in: "SourceAlpha",
																						type: "matrix",
																						values:
																							"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
																						result: "hardAlpha",
																					}),
																					f.jsx("feOffset", { dy: "4" }),
																					f.jsx("feGaussianBlur", {
																						stdDeviation: "2",
																					}),
																					f.jsx("feComposite", {
																						in2: "hardAlpha",
																						operator: "arithmetic",
																						k2: "-1",
																						k3: "1",
																					}),
																					f.jsx("feColorMatrix", {
																						type: "matrix",
																						values:
																							"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0",
																					}),
																					f.jsx("feBlend", {
																						mode: "normal",
																						in2: "shape",
																						result:
																							"effect2_innerShadow_19124_3657",
																					}),
																				],
																			}),
																		}),
																	],
																}),
																f.jsx("span", { children: " BEST VALUE" }),
															],
														}),
													f.jsxs("div", {
														className: "relative z-20",
														children: [
															f.jsx("h3", {
																className:
																	"text-lg font-medium text-neutral-500 mb-5",
																children: r.name,
															}),
															f.jsxs("div", {
																className: "flex items-baseline gap-1 mb-5",
																children: [
																	r.name === "Enterprise"
																		? f.jsx("span", {
																				className:
																					"text-xl lg:text-2xl font-medium text-neutral-900 mb-1.5  -tracking-[1px]",
																				children: r.price[n],
																			})
																		: f.jsx("span", {
																				className:
																					"text-2xl lg:text-4xl font-medium text-neutral-900 -tracking-[1px]",
																				children: r.price[n],
																			}),
																	f.jsx("span", {
																		className: "text-sm text-neutral-500",
																		children: r.sub,
																	}),
																],
															}),
															f.jsx(_e, {
																to: "/contacts",
																className: vn(
																	"w-full  text-center h-11 inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-mono uppercase transition-colors",
																	r.btnStyle,
																),
																children: r.btnText,
															}),
														],
													}),
												],
											},
											u,
										),
									),
								}),
							],
						}),
						Hw.map((r, u) =>
							f.jsxs(
								"div",
								{
									className: "col-span-full grid grid-cols-10",
									children: [
										f.jsx("div", {
											className: "col-span-10 p-4 mt-5",
											children: f.jsx("p", {
												className:
													"text-sm font-semibold text-neutral-400 uppercase tracking-wider",
												children: r.category,
											}),
										}),
										r.items.map((h, d) =>
											f.jsxs(
												"div",
												{
													className:
														"col-span-10 px-4 grid grid-cols-10 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50",
													children: [
														f.jsx("div", {
															className:
																"col-span-3 py-5 pr-4 text-base font-medium text-neutral-700 border-r border-transparent",
															children: h.name,
														}),
														f.jsx("div", {
															className: "col-span-7 grid grid-cols-4 gap-3",
															children: h.values.map((g, p) =>
																f.jsx(
																	"div",
																	{
																		className: vn(
																			"col-span-1 py-5 px-4 text-sm text-neutral-500 flex items-center justify-center font-medium",
																			p === 2 ? "bg-neutral-50" : "",
																		),
																		children:
																			g === !0
																				? f.jsx(_w, {})
																				: g === "-"
																					? f.jsx("span", {
																							className: "text-neutral-300",
																							children: "—",
																						})
																					: g,
																	},
																	p,
																),
															),
														}),
													],
												},
												d,
											),
										),
									],
								},
								u,
							),
						),
					],
				}),
			}),
		],
	});
}
function Gw() {
	return f.jsxs(Ja, {
		children: [
			f.jsx(ja, {
				title: "Pricing | Synth AI",
				description: "Choose the pricing plan that fits your needs.",
			}),
			f.jsxs("div", {
				className: "space-y-3",
				children: [f.jsx(Bw, {}), f.jsx(Uw, {}), f.jsx(jd, {})],
			}),
		],
	});
}
const Xa = () => {
		const n = new Date().getFullYear(),
			i = new Date(n, 0, 1),
			s = new Date();
		return new Date(
			i.getTime() + Math.random() * (s.getTime() - i.getTime()),
		).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	},
	Td = [
		{
			id: 1,
			category: "Product Update",
			title: "How AI Business Assistants Are Transforming Daily Operations",
			image: "/images/blog/blog-thumb-lg.png",
			author: { name: "Samual Halter", image: "/images/blog/author-1.png" },
			date: Xa(),
		},
		{
			id: 2,
			category: "Development",
			title: "The Future of Generative AI: What to Expect in the Next 5 Years",
			image: "/images/blog/blog-thumb-md-1.png",
			author: { name: "Meg Lewis", image: "/images/blog/author-2.png" },
			date: Xa(),
		},
		{
			id: 3,
			category: "Engineering",
			title: "How Synth AI Helps Enterprise Teams Scale Faster",
			image: "/images/blog/blog-thumb-md-2.png",
			author: { name: "Lethium K.", image: "/images/blog/author-3.png" },
			date: Xa(),
		},
		{
			id: 4,
			category: "Design",
			title: "5 Ways to Optimize Your Workflow with Intelligent Automation",
			image: "/images/blog/blog-thumb-md-3.png",
			author: { name: "Samual Halter", image: "/images/blog/author-1.png" },
			date: Xa(),
		},
		{
			id: 5,
			category: "Product Update",
			title: "Start Building Your Own AI Business Assistant Today",
			image: "/images/blog/blog-thumb-md-4.png",
			author: { name: "Meg Lewis", image: "/images/blog/author-2.png" },
			date: Xa(),
		},
		{
			id: 6,
			category: "Engineering",
			title: "The Rise of Autonomous Agents in Software Development",
			image: "/images/blog/blog-thumb-md-5.png",
			author: { name: "Lethium K.", image: "/images/blog/author-3.png" },
			date: Xa(),
		},
		{
			id: 7,
			category: "Design",
			title: "Designing for AI: Best Practices for User Experience",
			image: "/images/blog/blog-thumb-md-6.png",
			author: { name: "Samual Halter", image: "/images/blog/author-1.png" },
			date: Xa(),
		},
	];
function Yw() {
	const n = it();
	return f.jsx(pt, {
		className: "pt-30 lg:pt-40 pb-12 lg:pb-25",
		children: f.jsxs(P.div, {
			...Ie(n),
			children: [
				f.jsxs(P.div, {
					className: "flex flex-col items-center text-center mb-10 lg:mb-16",
					...ce(),
					children: [
						f.jsxs("p", {
							className:
								"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
							children: [
								f.jsx("svg", {
									width: "20",
									height: "20",
									viewBox: "0 0 20 20",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: f.jsx("path", {
										fillRule: "evenodd",
										clipRule: "evenodd",
										d: "M15.165 4.08203C15.5793 4.08203 15.915 4.41782 15.915 4.83203V15.165C15.915 15.5793 15.5793 15.915 15.165 15.915H4.83203C4.41782 15.915 4.08203 15.5793 4.08203 15.165V4.83203C4.08203 4.41782 4.41782 4.08203 4.83203 4.08203H15.165ZM15.165 17.415C16.4077 17.415 17.415 16.4077 17.415 15.165V4.83203C17.415 3.58939 16.4077 2.58203 15.165 2.58203H4.83203C3.58939 2.58203 2.58203 3.58939 2.58203 4.83203V15.165C2.58203 16.4077 3.58939 17.415 4.83203 17.415H15.165ZM14.1651 7.34394C14.5793 7.34394 14.9151 7.67973 14.9151 8.09394C14.9151 8.50816 14.5793 8.84394 14.1651 8.84394L5.83207 8.84394C5.41786 8.84394 5.08207 8.50816 5.08207 8.09394C5.08207 7.67973 5.41786 7.34394 5.83207 7.34394L14.1651 7.34394ZM14.1651 11.1535C14.5793 11.1535 14.9151 11.4893 14.9151 11.9035C14.9151 12.3177 14.5793 12.6535 14.1651 12.6535L5.83207 12.6535C5.41786 12.6535 5.08207 12.3177 5.08207 11.9035C5.08207 11.4893 5.41786 11.1535 5.83207 11.1535L14.1651 11.1535Z",
										fill: "#404040",
									}),
								}),
								"Blog",
							],
						}),
						f.jsx("h2", {
							className:
								"text-3xl max-w-2xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
							children: "Insights for smarter businesses",
						}),
					],
				}),
				f.jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
					children: Td.map((i, s) =>
						f.jsxs(
							P.article,
							{
								className: `flex flex-col gap-6 ${s === 0 ? "col-span-1 sm:col-span-2 group lg:col-span-3 lg:flex-row lg:items-center" : ""}`,
								...ce(n, s * 0.05),
								children: [
									f.jsx("div", {
										className: s === 0 ? "lg:w-1/2" : "",
										children: f.jsx(_e, {
											to: `/blog/${i.id}`,
											className: "block overflow-hidden rounded-xl",
											children: f.jsx("img", {
												src: i.image,
												alt: i.title,
												className:
													"w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-xl",
											}),
										}),
									}),
									f.jsxs("div", {
										className: `space-y-4 group ${s === 0 ? "lg:w-1/2" : ""}`,
										children: [
											f.jsx("span", {
												className:
													"border inline-flex text-[#585ECE] rounded border-[#DCDEFF] px-1.5 py-0.5 text-sm font-mono uppercase bg-[#F4F5FF]",
												children: i.category,
											}),
											f.jsx("h2", {
												className: `font-medium text-neutral-900  group-hover:text-[#585ECE] transition-colors ${s === 0 ? "text-2xl lg:text-4xl" : "text-2xl -leading-[2px]"}`,
												children: f.jsx(_e, {
													to: `/blog/${i.id}`,
													children: i.title,
												}),
											}),
											f.jsxs("div", {
												className:
													"flex items-center gap-4 text-sm text-neutral-500 font-medium",
												children: [
													f.jsxs("div", {
														className: "flex items-center gap-2",
														children: [
															f.jsx("img", {
																src: i.author.image,
																className: "size-10 rounded-lg shrink-0",
																alt: i.author.name,
															}),
															f.jsx("span", {
																className:
																	"text-base font-mono uppercase text-black",
																children: i.author.name,
															}),
														],
													}),
													f.jsx("svg", {
														width: "7",
														height: "7",
														viewBox: "0 0 7 7",
														fill: "none",
														xmlns: "http://www.w3.org/2000/svg",
														children: f.jsx("rect", {
															width: "6.92188",
															height: "6.92188",
															rx: "3.46094",
															fill: "#A3A3A3",
														}),
													}),
													f.jsx("span", {
														className: "text-base text-neutral-500 font-mono",
														children: i.date,
													}),
												],
											}),
										],
									}),
								],
							},
							i.id,
						),
					),
				}),
			],
		}),
	});
}
function qw() {
	return f.jsxs(Ja, {
		children: [
			f.jsx(ja, {
				title: "Blog | Synth AI",
				description: "Read our latest articles and updates.",
			}),
			f.jsx("div", { className: "space-y-3", children: f.jsx(Yw, {}) }),
		],
	});
}
function Zw() {
	const n = Td.slice(-3),
		i = it();
	return f.jsxs(pt, {
		className: "py-12 lg:py-25",
		children: [
			f.jsxs(P.div, {
				className: "flex flex-col items-center text-center mb-10 lg:mb-16",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									fillRule: "evenodd",
									clipRule: "evenodd",
									d: "M15.165 4.08203C15.5793 4.08203 15.915 4.41782 15.915 4.83203V15.165C15.915 15.5793 15.5793 15.915 15.165 15.915H4.83203C4.41782 15.915 4.08203 15.5793 4.08203 15.165V4.83203C4.08203 4.41782 4.41782 4.08203 4.83203 4.08203H15.165ZM15.165 17.415C16.4077 17.415 17.415 16.4077 17.415 15.165V4.83203C17.415 3.58939 16.4077 2.58203 15.165 2.58203H4.83203C3.58939 2.58203 2.58203 3.58939 2.58203 4.83203V15.165C2.58203 16.4077 3.58939 17.415 4.83203 17.415H15.165ZM14.1651 7.34394C14.5793 7.34394 14.9151 7.67973 14.9151 8.09394C14.9151 8.50816 14.5793 8.84394 14.1651 8.84394L5.83207 8.84394C5.41786 8.84394 5.08207 8.50816 5.08207 8.09394C5.08207 7.67973 5.41786 7.34394 5.83207 7.34394L14.1651 7.34394ZM14.1651 11.1535C14.5793 11.1535 14.9151 11.4893 14.9151 11.9035C14.9151 12.3177 14.5793 12.6535 14.1651 12.6535L5.83207 12.6535C5.41786 12.6535 5.08207 12.3177 5.08207 11.9035C5.08207 11.4893 5.41786 11.1535 5.83207 11.1535L14.1651 11.1535Z",
									fill: "#404040",
								}),
							}),
							"Blog",
						],
					}),
					f.jsx("h2", {
						className:
							"text-3xl max-w-2xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14",
						children: "Read More Articals",
					}),
				],
			}),
			f.jsx(P.div, {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
				...Ie(i),
				children: n.map((s) =>
					f.jsxs(
						P.article,
						{
							className: "flex flex-col gap-6 group",
							...ce(),
							children: [
								f.jsx(_e, {
									to: `/blog/${s.id}`,
									className: "block overflow-hidden rounded-xl",
									children: f.jsx("img", {
										src: s.image,
										alt: s.title,
										className:
											"w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl",
									}),
								}),
								f.jsxs("div", {
									className: "space-y-4",
									children: [
										f.jsx("span", {
											className:
												"border inline-flex text-[#585ECE] rounded border-[#DCDEFF] px-1.5 py-0.5 text-sm font-mono uppercase bg-[#F4F5FF]",
											children: s.category,
										}),
										f.jsx("h2", {
											className:
												"font-medium line-clamp-2 text-neutral-900 group-hover:text-[#585ECE] transition-colors text-2xl -leading-[2px]",
											children: f.jsx(_e, {
												to: `/blog/${s.id}`,
												children: s.title,
											}),
										}),
										f.jsxs("div", {
											className:
												"flex items-center gap-4 text-sm text-neutral-500 font-medium",
											children: [
												f.jsxs("div", {
													className: "flex items-center gap-2",
													children: [
														f.jsx("img", {
															src: s.author.image,
															className: "size-10 rounded-lg shrink-0",
															alt: s.author.name,
														}),
														f.jsx("span", {
															className:
																"text-base font-mono uppercase text-black",
															children: s.author.name,
														}),
													],
												}),
												f.jsx("svg", {
													width: "7",
													height: "7",
													viewBox: "0 0 7 7",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: f.jsx("rect", {
														width: "6.92188",
														height: "6.92188",
														rx: "3.46094",
														fill: "#A3A3A3",
													}),
												}),
												f.jsx("span", {
													className: "text-base text-neutral-500 font-mono",
													children: s.date,
												}),
											],
										}),
									],
								}),
							],
						},
						s.id,
					),
				),
			}),
		],
	});
}
function Xw({ post: n }) {
	if (!n) return null;
	const i = it();
	return f.jsx(pt, {
		className: "pt-30 lg:pt-40 pb-12 lg:pb-20",
		children: f.jsxs(P.div, {
			...Ie(i),
			children: [
				f.jsx(P.div, {
					className: "max-w-4xl mx-auto",
					...ce(),
					children: f.jsxs("div", {
						className: "text-center mb-10 lg:mb-14",
						children: [
							f.jsx("span", {
								className:
									"border inline-flex text-[#585ECE] rounded border-[#DCDEFF] px-1.5 py-0.5 text-sm font-mono uppercase bg-[#F4F5FF] mb-4",
								children: n.category,
							}),
							f.jsx("h1", {
								className:
									"text-3xl lg:text-5xl font-medium text-neutral-900 mb-6 lg:leading-tight",
								children: n.title,
							}),
							f.jsx("p", {
								className: "text-neutral-500 text-lg mb-8 max-w-2xl mx-auto",
								children:
									"From automating repetitive workflows to delivering real-time insights, AI assistants are becoming essential tools for modern teams. Learn how businesses are using automation to reduce manual effort.",
							}),
							f.jsxs("div", {
								className:
									"flex items-center justify-center gap-4 text-sm text-neutral-500 font-medium",
								children: [
									f.jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											f.jsx("img", {
												src: n.author.image,
												className: "size-10 rounded-lg shrink-0",
												alt: n.author.name,
											}),
											f.jsx("span", {
												className: "text-base font-mono uppercase text-black",
												children: n.author.name,
											}),
										],
									}),
									f.jsx("svg", {
										width: "7",
										height: "7",
										viewBox: "0 0 7 7",
										fill: "none",
										xmlns: "http://www.w3.org/2000/svg",
										children: f.jsx("rect", {
											width: "6.92188",
											height: "6.92188",
											rx: "3.46094",
											fill: "#A3A3A3",
										}),
									}),
									f.jsx("span", {
										className: "text-base text-neutral-500 font-mono",
										children: n.date,
									}),
								],
							}),
						],
					}),
				}),
				f.jsx(P.div, {
					className: "rounded-2xl overflow-hidden  mb-12 lg:mb-16",
					...ce(i, 0.1),
					children: f.jsx("img", {
						src: "/images/blog/detail-1.png",
						alt: n.title,
						className: "w-full h-auto object-cover",
					}),
				}),
				f.jsx(P.div, {
					className: "max-w-4xl mx-auto",
					...ce(i, 0.2),
					children: f.jsxs("div", {
						className: "prose prose-lg max-w-none text-neutral-500",
						children: [
							f.jsx("h2", {
								className: "text-2xl font-semibold text-neutral-900 mb-4",
								children: "Introduction",
							}),
							f.jsx("p", {
								className: "mb-8",
								children:
									"Modern businesses move fast. Teams handle emails, manage tasks, analyze data, respond to customers, and coordinate across multiple tools — often all in the same day. As operations grow more complex, manual processes create friction, slow down productivity, and increase the risk of errors. AI business assistants are changing that.",
							}),
							f.jsx("h2", {
								className: "text-2xl font-semibold text-neutral-900 mb-4",
								children: "The Problem with Traditional Operations",
							}),
							f.jsx("p", {
								className: "mb-4",
								children:
									"As companies scale, their inefficiencies multiply. Teams spend more time managing work than actually doing meaningful work. This is where AI business assistants make a measurable impact.",
							}),
							f.jsx("p", {
								className: "mb-6",
								children: "Many businesses still rely on:",
							}),
							f.jsxs("ul", {
								className: "list-disc pl-5 space-y-2 mb-8",
								children: [
									f.jsx("li", { children: "Manual data entry" }),
									f.jsx("li", { children: "Repetitive administrative tasks" }),
									f.jsx("li", {
										children: "Siloed tools with no central coordination",
									}),
									f.jsx("li", {
										children: "Delayed reporting and performance tracking",
									}),
									f.jsx("li", { children: "Slow internal communication" }),
								],
							}),
							f.jsx("div", {
								className: "rounded-2xl overflow-hidden mb-12",
								children: f.jsx("img", {
									src: "/images/blog/detail-2.png",
									alt: "Content Image",
									className: "w-full h-auto object-cover",
								}),
							}),
							f.jsx("h2", {
								className: "text-2xl font-semibold text-neutral-900 mb-4",
								children: "Conclusion",
							}),
							f.jsx("p", {
								className: "mb-4",
								children:
									"Daily operations define business performance. When processes are slow and fragmented, growth stalls. When workflows are automated and intelligent, teams move faster and operate with confidence. AI business assistants transform daily operations by simplifying complexity, increasing efficiency, and enabling smarter decisions.",
							}),
							f.jsx("p", {
								children:
									"The question is no longer whether businesses should adopt AI — it’s how quickly they can integrate it into their daily workflows.",
							}),
						],
					}),
				}),
			],
		}),
	});
}
function Kw() {
	const { id: n } = hy(),
		i = Td.find((s) => s.id === Number(n));
	return i
		? f.jsxs(Ja, {
				children: [
					f.jsx(ja, {
						title: `${i.title} | Synth AI`,
						description: `Read details about ${i.title}`,
					}),
					f.jsxs("div", {
						className: "space-y-3",
						children: [f.jsx(Xw, { post: i }), f.jsx(Zw, {})],
					}),
				],
			})
		: f.jsx(Ja, {
				children: f.jsx("div", {
					className: "flex h-[50vh] items-center justify-center",
					children: f.jsx("h1", {
						className: "text-2xl font-bold",
						children: "Blog post not found",
					}),
				}),
			});
}
function Qw({ className: n }) {
	const i = it();
	return f.jsxs(pt, {
		className: vn("pb-12 lg:pb-25 pt-30", n),
		children: [
			f.jsxs(P.div, {
				className: "max-w-xl flex flex-col items-center mx-auto text-center",
				...ce(),
				children: [
					f.jsxs("p", {
						className:
							"flex font-mono gap-2 items-center uppercase text-neutral-900 mb-4",
						children: [
							f.jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 20 20",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: f.jsx("path", {
									d: "M4.61943 9.76985L7.29802 8.39661C7.43697 8.32538 7.56875 8.23637 7.66094 8.11034C7.98312 7.66984 8.04919 7.08345 7.81841 6.57573L6.46735 3.6034C6.02572 2.63182 4.74962 2.40041 3.99496 3.15507L3.1048 4.04517C2.79974 4.35022 2.65029 4.78075 2.72683 5.20532C3.2497 8.10574 4.63206 10.8816 6.87391 13.1235C9.11577 15.3653 11.8917 16.7477 14.7921 17.2706C15.2166 17.3471 15.6472 17.1977 15.9522 16.8926L16.8424 16.0025C17.597 15.2478 17.3656 13.9717 16.394 13.5301L13.4217 12.179C12.914 11.9482 12.3276 12.0143 11.8871 12.3365C11.7611 12.4287 11.6721 12.5605 11.6008 12.6994L10.2276 15.378",
									stroke: "#404040",
									strokeWidth: "1.5",
								}),
							}),
							"Contact Us",
						],
					}),
					f.jsx("h2", {
						className:
							"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
						children: "Contact Us",
					}),
					f.jsx("p", {
						className:
							"text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg",
						children:
							"Have questions about features, pricing, or enterprise solutions? Our team is here to help you get started.",
					}),
				],
			}),
			f.jsxs(P.div, {
				className: "flex flex-col lg:flex-row gap-2",
				...Ie(i),
				children: [
					f.jsxs(P.div, {
						className:
							"bg-[url('/images/contact-bg.png')] p-7  lg:w-1/2 relative overflow-hidden  bg-no-repeat bg-cover rounded-xl",
						...ce(i, 0.1),
						children: [
							f.jsx("div", {
								className:
									"size-12 rounded-xl bg-neutral-950 inline-flex items-center justify-center mb-9",
								children: f.jsx("svg", {
									width: "24",
									height: "24",
									viewBox: "0 0 24 24",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: f.jsx("path", {
										d: "M13.3815 4.08568C16.9895 4.08568 19.9144 7.01055 19.9144 10.6186M13.3357 7.2674C15.1674 7.36455 16.6354 8.83258 16.7325 10.6643M5.291 11.8555C4.29669 10.0901 3.62428 8.19234 3.27376 6.24794C3.18191 5.73847 3.36125 5.22182 3.72733 4.85577L4.79552 3.78764C5.7011 2.88206 7.23243 3.15974 7.76238 4.32564L9.38366 7.89244C9.70888 8.60794 9.55145 9.67132 8.80112 10.056L5.291 11.8555ZM5.291 11.8555C6.07651 13.2503 7.06293 14.5624 8.25026 15.7497C9.43759 16.9371 10.7498 17.9235 12.1445 18.709M12.1445 18.709C13.9099 19.7033 15.8077 20.3757 17.7521 20.7262C18.2615 20.8181 18.7782 20.6388 19.1442 20.2727L20.2124 19.2045C21.118 18.2989 20.8403 16.7676 19.6744 16.2377L16.1076 14.6164C15.3921 14.2912 14.3287 14.4486 13.944 15.1989L12.1445 18.709Z",
										stroke: "white",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
									}),
								}),
							}),
							f.jsx("h3", {
								className: "text-3xl font-medium text-neutral-900 mb-2",
								children: "Talk to sales team",
							}),
							f.jsx("p", {
								className: "mb-6  text-neutral-500 max-w-lg",
								children:
									"Discuss custom plans, enterprise solutions, or request a personalized product demonstration.",
							}),
							f.jsx("a", {
								href: "mailto:sales@example.com",
								className:
									"bg-white transition-colors hover:bg-neutral-50 inline-flex items-center justify-center py-3 px-5 rounded-lg text-base uppercase font-mono",
								children: "contact to sale",
							}),
							f.jsxs("div", {
								className: "mt-16 space-y-9",
								children: [
									f.jsxs("div", {
										className: " flex items-center gap-3 ",
										children: [
											f.jsx("div", {
												className:
													"size-12 shrink-0 rounded-xl bg-white inline-flex items-center justify-center",
												children: f.jsx("svg", {
													width: "24",
													height: "24",
													viewBox: "0 0 24 24",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: f.jsx("path", {
														d: "M13.3815 4.08568C16.9895 4.08568 19.9144 7.01055 19.9144 10.6186M13.3357 7.2674C15.1674 7.36455 16.6354 8.83258 16.7325 10.6643M5.291 11.8555C4.29669 10.0901 3.62428 8.19234 3.27376 6.24794C3.18191 5.73847 3.36125 5.22182 3.72733 4.85577L4.79552 3.78764C5.7011 2.88206 7.23243 3.15974 7.76238 4.32564L9.38366 7.89244C9.70888 8.60794 9.55145 9.67132 8.80112 10.056L5.291 11.8555ZM5.291 11.8555C6.07651 13.2503 7.06293 14.5624 8.25026 15.7497C9.43759 16.9371 10.7498 17.9235 12.1445 18.709M12.1445 18.709C13.9099 19.7033 15.8077 20.3757 17.7521 20.7262C18.2615 20.8181 18.7782 20.6388 19.1442 20.2727L20.2124 19.2045C21.118 18.2989 20.8403 16.7676 19.6744 16.2377L16.1076 14.6164C15.3921 14.2912 14.3287 14.4486 13.944 15.1989L12.1445 18.709Z",
														stroke: "#525866",
														strokeWidth: "1.5",
														strokeLinecap: "round",
														strokeLinejoin: "round",
													}),
												}),
											}),
											f.jsxs("div", {
												children: [
													f.jsx("p", {
														className: "text-sm text-neutral-500 mb-1",
														children: "Call Us",
													}),
													f.jsx("p", {
														className: "text-neutral-900 font-medium text-base",
														children: "+894 022 0232",
													}),
												],
											}),
										],
									}),
									f.jsxs("div", {
										className: " flex items-center gap-4",
										children: [
											f.jsx("div", {
												className:
													"size-12 shrink-0 rounded-xl bg-white inline-flex items-center justify-center",
												children: f.jsx("svg", {
													width: "24",
													height: "24",
													viewBox: "0 0 24 24",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: f.jsx("path", {
														d: "M20.2637 4.5C21.1959 4.5 21.955 5.23508 21.9961 6.15723C21.9987 6.18246 22 6.20846 22 6.23438V17.25C21.9998 18.4925 20.9925 19.5 19.75 19.5H4.25C3.00749 19.5 2.00021 18.4925 2 17.25V6.23438C2 6.20813 2.00128 6.1818 2.00391 6.15625C2.04549 5.23486 2.80371 4.5003 3.73535 4.5H20.2637ZM13.2871 13.2168C12.5139 13.7559 11.4861 13.756 10.7129 13.2168L3.5 8.18652V17.25C3.50021 17.664 3.83592 18 4.25 18H19.75C20.1641 18 20.4998 17.664 20.5 17.25V8.18652L13.2871 13.2168ZM3.73535 6C3.60557 6.00031 3.50013 6.10554 3.5 6.23535C3.50003 6.31217 3.5377 6.38464 3.60059 6.42871L11.5713 11.9863C11.829 12.166 12.171 12.1659 12.4287 11.9863L20.3984 6.42871C20.4617 6.38463 20.5 6.31243 20.5 6.23535C20.4998 6.10534 20.3937 6 20.2637 6H3.73535Z",
														fill: "#525866",
													}),
												}),
											}),
											f.jsxs("div", {
												children: [
													f.jsx("p", {
														className: "text-sm text-neutral-500 mb-1",
														children: "Email",
													}),
													f.jsx("p", {
														className: "text-neutral-900 font-medium text-base",
														children: "hello@synthai.com",
													}),
												],
											}),
										],
									}),
									f.jsxs("div", {
										className: "= flex  items-center gap-4",
										children: [
											f.jsx("div", {
												className:
													"size-12 bg-white shrink-0 rounded-xl inline-flex items-center justify-center",
												children: f.jsxs("svg", {
													width: "24",
													height: "24",
													viewBox: "0 0 24 24",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: [
														f.jsx("path", {
															d: "M15.0846 9.47001C15.0846 11.1738 13.7033 12.555 11.9996 12.555C10.2958 12.555 8.91455 11.1738 8.91455 9.47001C8.91455 7.76621 10.2958 6.38501 11.9996 6.38501C13.7033 6.38501 15.0846 7.76621 15.0846 9.47001Z",
															stroke: "#525866",
															strokeWidth: "1.5",
															strokeLinecap: "round",
															strokeLinejoin: "round",
														}),
														f.jsx("path", {
															d: "M18.7215 9.47206C18.7215 14.6995 14.7421 19.1274 12.915 20.885C12.405 21.3756 11.6285 21.3766 11.1171 20.8874C9.28144 19.1315 5.27734 14.7019 5.27734 9.47206C5.27734 5.75957 8.28691 2.75 11.9994 2.75C15.7119 2.75 18.7215 5.75957 18.7215 9.47206Z",
															stroke: "#525866",
															strokeWidth: "1.5",
															strokeLinecap: "round",
															strokeLinejoin: "round",
														}),
													],
												}),
											}),
											f.jsxs("div", {
												children: [
													f.jsx("p", {
														className: "text-sm text-neutral-500 mb-1",
														children: "Office Address",
													}),
													f.jsx("p", {
														className: "text-neutral-900 font-medium text-base",
														children: "6391 Elgin St. Celina, Delaware 10299",
													}),
												],
											}),
										],
									}),
								],
							}),
						],
					}),
					f.jsxs(P.div, {
						className: "bg-neutral-100 p-7 rounded-xl lg:w-1/2 ",
						...ce(i, 0.2),
						children: [
							f.jsx("div", {
								className:
									"size-12 rounded-xl bg-neutral-950 inline-flex items-center justify-center mb-9",
								children: f.jsx("svg", {
									width: "24",
									height: "24",
									viewBox: "0 0 24 24",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: f.jsx("path", {
										d: "M20.0001 17.0518V12C20.0001 7.58174 16.4183 4 12 4C7.58174 4 4 7.58174 4 12V17.0518M19.9998 14.041V19.75C19.9998 20.5784 19.3282 21.25 18.4998 21.25H13.9998M6.50006 18.75H5.50006C4.67163 18.75 4.00006 18.0784 4.00006 17.25V13.75C4.00006 12.9216 4.67163 12.25 5.50006 12.25H6.50006C7.32849 12.25 8.00006 12.9216 8.00006 13.75V17.25C8.00006 18.0784 7.32849 18.75 6.50006 18.75ZM17.5 18.75H18.5C19.3284 18.75 20 18.0784 20 17.25V13.75C20 12.9216 19.3284 12.25 18.5 12.25H17.5C16.6716 12.25 16 12.9216 16 13.75V17.25C16 18.0784 16.6716 18.75 17.5 18.75Z",
										stroke: "white",
										strokeWidth: "1.5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
									}),
								}),
							}),
							f.jsx("h3", {
								className: "text-3xl font-medium text-neutral-900 mb-2",
								children: "Reach Out support team",
							}),
							f.jsx("p", {
								className: "mb-6  text-neutral-500 max-w-lg",
								children:
									"Get assistance with your account, features, or technical issues. Our team is here to help you at every step.",
							}),
							f.jsxs("div", {
								className: "bg-white p-5 lg:p-8 rounded-2xl",
								children: [
									f.jsxs("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6",
										children: [
											f.jsx("input", {
												type: "text",
												placeholder: "First Name",
												className: `w-full rounded-lg bg-neutral-100 px-4 py-3 text-neutral-900 
               border border-transparent h-11 focus:border-neutral-900 
               focus:outline-none focus:shadow-[0px_0px_0px_4px_rgba(128,128,128,0.12)] 
               `,
											}),
											" ",
											f.jsx("input", {
												type: "text",
												placeholder: "Last Name",
												className: `w-full rounded-lg bg-neutral-100 px-4 py-3 text-neutral-900 
               border border-transparent h-11 focus:border-neutral-900 
               focus:outline-none focus:shadow-[0px_0px_0px_4px_rgba(128,128,128,0.12)] 
               `,
											}),
											" ",
											f.jsx("input", {
												type: "email",
												placeholder: "Email Address",
												className: `w-full rounded-lg col-span-full bg-neutral-100 px-4 py-3 text-neutral-900 
               border border-transparent h-11 focus:border-neutral-900 
               focus:outline-none focus:shadow-[0px_0px_0px_4px_rgba(128,128,128,0.12)] 
               `,
											}),
											" ",
											f.jsx("input", {
												type: "text",
												placeholder: "Subject",
												className: `w-full rounded-lg col-span-full bg-neutral-100 px-4 py-3 text-neutral-900 
               border border-transparent h-11 focus:border-neutral-900 
               focus:outline-none focus:shadow-[0px_0px_0px_4px_rgba(128,128,128,0.12)] 
               `,
											}),
											" ",
											f.jsx("textarea", {
												placeholder: "Enter your message here...",
												className: `w-full rounded-lg col-span-full h-32 bg-neutral-100 px-4 py-3 text-neutral-900 
               border border-transparent focus:border-neutral-900 
               focus:outline-none focus:shadow-[0px_0px_0px_4px_rgba(128,128,128,0.12)] 
               `,
											}),
										],
									}),
									f.jsx("button", {
										className: `w-full bg-black font-mono text-white rounded-lg py-3 px-5
             tracking-widest uppercase text-sm 
             hover:bg-neutral-700 transition-colors duration-300`,
										children: "Send Message",
									}),
								],
							}),
						],
					}),
				],
			}),
		],
	});
}
function Pw() {
	return f.jsxs(Ja, {
		children: [
			f.jsx(ja, {
				title: "Contact Us | Synth AI",
				description: "Get in touch with our support team.",
			}),
			f.jsxs("div", {
				className: "space-y-3",
				children: [f.jsx(Qw, { className: vn("lg:pt-40") }), f.jsx(jd, {})],
			}),
		],
	});
}
const Fw = P(_e);
function Jw() {
	return f.jsxs("div", {
		children: [
			f.jsx(ja, {
				title: "404 Not Found | Synth AI",
				description: "The page you are looking for does not exist.",
			}),
			f.jsx("div", {
				className: "p-3 bg-neutral-100 antialiased overflow-x-hidden ",
				children: f.jsx("div", {
					className: "bg-white py-12 lg:py-25 rounded-xl min-h-screen",
					children: f.jsxs("div", {
						className: "max-w-2xl mx-auto text-center",
						children: [
							f.jsx("h2", {
								className:
									"text-3xl -tracking-[2px] sm:text-4xl lg:text-5xl font-medium text-neutral-900 lg:leading-14 mb-4",
								children: "Oops ! Page not Found",
							}),
							f.jsx("p", {
								className:
									"text-lg text-neutral-500 mb-8 sm:mb-11 font-normal max-w-lg mx-auto",
								children:
									"The page you’re looking for might have been moved, deleted, or never existed. Let’s get you back on track.",
							}),
							f.jsxs(Fw, {
								to: "/",
								className:
									"py-3 px-5 inline-flex text-white font-mono text-sm uppercase gap-2 items-center rounded-lg bg-black hover:bg-neutral-700 transition-colors duration-300",
								initial: "initial",
								whileHover: "hover",
								children: ["Go back to home", f.jsx(ms, {})],
							}),
							f.jsx("div", {
								className: "mt-10 sm:mt-16",
								children: f.jsx("img", { src: "/images/404.png", alt: "" }),
							}),
						],
					}),
				}),
			}),
		],
	});
}
function Ww() {
	const { pathname: n } = wn();
	return (
		C.useEffect(() => {
			window.scrollTo(0, 0);
		}, [n]),
		f.jsxs(Ny, {
			children: [
				f.jsxs(pn, {
					element: f.jsx(Tb, {}),
					children: [
						f.jsx(pn, { path: "/", element: f.jsx(Tw, {}) }),
						f.jsx(pn, { path: "/about", element: f.jsx(Lw, {}) }),
						f.jsx(pn, { path: "/features", element: f.jsx(zw, {}) }),
						f.jsx(pn, { path: "/pricing", element: f.jsx(Gw, {}) }),
						f.jsx(pn, { path: "/blog", element: f.jsx(qw, {}) }),
						f.jsx(pn, { path: "/blog/:id", element: f.jsx(Kw, {}) }),
						f.jsx(pn, { path: "/contacts", element: f.jsx(Pw, {}) }),
					],
				}),
				f.jsx(pn, { path: "*", element: f.jsx(Jw, {}) }),
			],
		})
	);
}
Ex.createRoot(document.getElementById("root")).render(
	f.jsx(C.StrictMode, { children: f.jsx(Iy, { children: f.jsx(Ww, {}) }) }),
);
