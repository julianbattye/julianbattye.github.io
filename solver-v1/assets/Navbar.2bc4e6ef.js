import { r as a, m as I } from "./index.d940e4e8.js";
var nt = Object.defineProperty,
  lt = (e, t, r) =>
    t in e
      ? nt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  ce = (e, t, r) => (lt(e, typeof t != "symbol" ? t + "" : t, r), r);
let ot = class {
    constructor() {
      ce(this, "current", this.detect()),
        ce(this, "handoffState", "pending"),
        ce(this, "currentId", 0);
    }
    set(t) {
      this.current !== t &&
        ((this.handoffState = "pending"),
        (this.currentId = 0),
        (this.current = t));
    }
    reset() {
      this.set(this.detect());
    }
    nextId() {
      return ++this.currentId;
    }
    get isServer() {
      return this.current === "server";
    }
    get isClient() {
      return this.current === "client";
    }
    detect() {
      return typeof window > "u" || typeof document > "u" ? "server" : "client";
    }
    handoff() {
      this.handoffState === "pending" && (this.handoffState = "complete");
    }
    get isHandoffComplete() {
      return this.handoffState === "complete";
    }
  },
  H = new ot(),
  $ = (e, t) => {
    H.isServer ? a.useEffect(e, t) : a.useLayoutEffect(e, t);
  };
function L(e) {
  let t = a.useRef(e);
  return (
    $(() => {
      t.current = e;
    }, [e]),
    t
  );
}
function it(e) {
  typeof queueMicrotask == "function"
    ? queueMicrotask(e)
    : Promise.resolve()
        .then(e)
        .catch((t) =>
          setTimeout(() => {
            throw t;
          })
        );
}
function j() {
  let e = [],
    t = {
      addEventListener(r, n, l, s) {
        return (
          r.addEventListener(n, l, s),
          t.add(() => r.removeEventListener(n, l, s))
        );
      },
      requestAnimationFrame(...r) {
        let n = requestAnimationFrame(...r);
        return t.add(() => cancelAnimationFrame(n));
      },
      nextFrame(...r) {
        return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
      },
      setTimeout(...r) {
        let n = setTimeout(...r);
        return t.add(() => clearTimeout(n));
      },
      microTask(...r) {
        let n = { current: !0 };
        return (
          it(() => {
            n.current && r[0]();
          }),
          t.add(() => {
            n.current = !1;
          })
        );
      },
      style(r, n, l) {
        let s = r.style.getPropertyValue(n);
        return (
          Object.assign(r.style, { [n]: l }),
          this.add(() => {
            Object.assign(r.style, { [n]: s });
          })
        );
      },
      group(r) {
        let n = j();
        return r(n), this.add(() => n.dispose());
      },
      add(r) {
        return (
          e.push(r),
          () => {
            let n = e.indexOf(r);
            if (n >= 0) for (let l of e.splice(n, 1)) l();
          }
        );
      },
      dispose() {
        for (let r of e.splice(0)) r();
      },
    };
  return t;
}
function J() {
  let [e] = a.useState(j);
  return a.useEffect(() => () => e.dispose(), [e]), e;
}
let E = function (e) {
  let t = L(e);
  return I.useCallback((...r) => t.current(...r), [t]);
};
function xe() {
  let [e, t] = a.useState(H.isHandoffComplete);
  return (
    e && H.isHandoffComplete === !1 && t(!1),
    a.useEffect(() => {
      e !== !0 && t(!0);
    }, [e]),
    a.useEffect(() => H.handoff(), []),
    e
  );
}
var ke;
let V =
  (ke = I.useId) != null
    ? ke
    : function () {
        let e = xe(),
          [t, r] = I.useState(e ? () => H.nextId() : null);
        return (
          $(() => {
            t === null && r(H.nextId());
          }, [t]),
          t != null ? "" + t : void 0
        );
      };
function F(e, t, ...r) {
  if (e in t) {
    let l = t[e];
    return typeof l == "function" ? l(...r) : l;
  }
  let n = new Error(
    `Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      t
    )
      .map((l) => `"${l}"`)
      .join(", ")}.`
  );
  throw (Error.captureStackTrace && Error.captureStackTrace(n, F), n);
}
function W(e) {
  return H.isServer
    ? null
    : e instanceof Node
    ? e.ownerDocument
    : e != null && e.hasOwnProperty("current") && e.current instanceof Node
    ? e.current.ownerDocument
    : document;
}
let he = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map((e) => `${e}:not([tabindex='-1'])`)
  .join(",");
var ge = ((e) => (
    (e[(e.First = 1)] = "First"),
    (e[(e.Previous = 2)] = "Previous"),
    (e[(e.Next = 4)] = "Next"),
    (e[(e.Last = 8)] = "Last"),
    (e[(e.WrapAround = 16)] = "WrapAround"),
    (e[(e.NoScroll = 32)] = "NoScroll"),
    e
  ))(ge || {}),
  at = ((e) => (
    (e[(e.Error = 0)] = "Error"),
    (e[(e.Overflow = 1)] = "Overflow"),
    (e[(e.Success = 2)] = "Success"),
    (e[(e.Underflow = 3)] = "Underflow"),
    e
  ))(at || {}),
  st = ((e) => (
    (e[(e.Previous = -1)] = "Previous"), (e[(e.Next = 1)] = "Next"), e
  ))(st || {});
function He(e = document.body) {
  return e == null
    ? []
    : Array.from(e.querySelectorAll(he)).sort((t, r) =>
        Math.sign(
          (t.tabIndex || Number.MAX_SAFE_INTEGER) -
            (r.tabIndex || Number.MAX_SAFE_INTEGER)
        )
      );
}
var Ee = ((e) => (
  (e[(e.Strict = 0)] = "Strict"), (e[(e.Loose = 1)] = "Loose"), e
))(Ee || {});
function we(e, t = 0) {
  var r;
  return e === ((r = W(e)) == null ? void 0 : r.body)
    ? !1
    : F(t, {
        0() {
          return e.matches(he);
        },
        1() {
          let n = e;
          for (; n !== null; ) {
            if (n.matches(he)) return !0;
            n = n.parentElement;
          }
          return !1;
        },
      });
}
function Be(e) {
  let t = W(e);
  j().nextFrame(() => {
    t && !we(t.activeElement, 0) && ct(e);
  });
}
var ut = ((e) => (
  (e[(e.Keyboard = 0)] = "Keyboard"), (e[(e.Mouse = 1)] = "Mouse"), e
))(ut || {});
typeof window < "u" &&
  typeof document < "u" &&
  (document.addEventListener(
    "keydown",
    (e) => {
      e.metaKey ||
        e.altKey ||
        e.ctrlKey ||
        (document.documentElement.dataset.headlessuiFocusVisible = "");
    },
    !0
  ),
  document.addEventListener(
    "click",
    (e) => {
      e.detail === 1
        ? delete document.documentElement.dataset.headlessuiFocusVisible
        : e.detail === 0 &&
          (document.documentElement.dataset.headlessuiFocusVisible = "");
    },
    !0
  ));
function ct(e) {
  e?.focus({ preventScroll: !0 });
}
let dt = ["textarea", "input"].join(",");
function ft(e) {
  var t, r;
  return (r = (t = e?.matches) == null ? void 0 : t.call(e, dt)) != null
    ? r
    : !1;
}
function Ue(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let l = t(r),
      s = t(n);
    if (l === null || s === null) return 0;
    let o = l.compareDocumentPosition(s);
    return o & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : o & Node.DOCUMENT_POSITION_PRECEDING
      ? 1
      : 0;
  });
}
function mt(e, t) {
  return pt(He(), t, { relativeTo: e });
}
function pt(
  e,
  t,
  { sorted: r = !0, relativeTo: n = null, skipElements: l = [] } = {}
) {
  let s = Array.isArray(e)
      ? e.length > 0
        ? e[0].ownerDocument
        : document
      : e.ownerDocument,
    o = Array.isArray(e) ? (r ? Ue(e) : e) : He(e);
  l.length > 0 && o.length > 1 && (o = o.filter((v) => !l.includes(v))),
    (n = n ?? s.activeElement);
  let i = (() => {
      if (t & 5) return 1;
      if (t & 10) return -1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
      );
    })(),
    u = (() => {
      if (t & 1) return 0;
      if (t & 2) return Math.max(0, o.indexOf(n)) - 1;
      if (t & 4) return Math.max(0, o.indexOf(n)) + 1;
      if (t & 8) return o.length - 1;
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last"
      );
    })(),
    c = t & 32 ? { preventScroll: !0 } : {},
    d = 0,
    m = o.length,
    h;
  do {
    if (d >= m || d + m <= 0) return 0;
    let v = u + d;
    if (t & 16) v = (v + m) % m;
    else {
      if (v < 0) return 3;
      if (v >= m) return 1;
    }
    (h = o[v]), h?.focus(c), (d += i);
  } while (h !== s.activeElement);
  return t & 6 && ft(h) && h.select(), 2;
}
function De(e, t, r) {
  let n = L(t);
  a.useEffect(() => {
    function l(s) {
      n.current(s);
    }
    return (
      document.addEventListener(e, l, r),
      () => document.removeEventListener(e, l, r)
    );
  }, [e, r]);
}
function vt(e, t, r) {
  let n = L(t);
  a.useEffect(() => {
    function l(s) {
      n.current(s);
    }
    return (
      window.addEventListener(e, l, r),
      () => window.removeEventListener(e, l, r)
    );
  }, [e, r]);
}
function ht(e, t, r = !0) {
  let n = a.useRef(!1);
  a.useEffect(() => {
    requestAnimationFrame(() => {
      n.current = r;
    });
  }, [r]);
  function l(o, i) {
    if (!n.current || o.defaultPrevented) return;
    let u = i(o);
    if (u === null || !u.getRootNode().contains(u)) return;
    let c = (function d(m) {
      return typeof m == "function"
        ? d(m())
        : Array.isArray(m) || m instanceof Set
        ? m
        : [m];
    })(e);
    for (let d of c) {
      if (d === null) continue;
      let m = d instanceof HTMLElement ? d : d.current;
      if (
        (m != null && m.contains(u)) ||
        (o.composed && o.composedPath().includes(m))
      )
        return;
    }
    return !we(u, Ee.Loose) && u.tabIndex !== -1 && o.preventDefault(), t(o, u);
  }
  let s = a.useRef(null);
  De(
    "mousedown",
    (o) => {
      var i, u;
      n.current &&
        (s.current =
          ((u = (i = o.composedPath) == null ? void 0 : i.call(o)) == null
            ? void 0
            : u[0]) || o.target);
    },
    !0
  ),
    De(
      "click",
      (o) => {
        s.current && (l(o, () => s.current), (s.current = null));
      },
      !0
    ),
    vt(
      "blur",
      (o) =>
        l(o, () =>
          window.document.activeElement instanceof HTMLIFrameElement
            ? window.document.activeElement
            : null
        ),
      !0
    );
}
function je(e) {
  var t;
  if (e.type) return e.type;
  let r = (t = e.as) != null ? t : "button";
  if (typeof r == "string" && r.toLowerCase() === "button") return "button";
}
function Ke(e, t) {
  let [r, n] = a.useState(() => je(e));
  return (
    $(() => {
      n(je(e));
    }, [e.type, e.as]),
    $(() => {
      r ||
        (t.current &&
          t.current instanceof HTMLButtonElement &&
          !t.current.hasAttribute("type") &&
          n("button"));
    }, [r, t]),
    r
  );
}
let qe = Symbol();
function gt(e, t = !0) {
  return Object.assign(e, { [qe]: t });
}
function C(...e) {
  let t = a.useRef(e);
  a.useEffect(() => {
    t.current = e;
  }, [e]);
  let r = E((n) => {
    for (let l of t.current)
      l != null && (typeof l == "function" ? l(n) : (l.current = n));
  });
  return e.every((n) => n == null || n?.[qe]) ? void 0 : r;
}
function bt({ container: e, accept: t, walk: r, enabled: n = !0 }) {
  let l = a.useRef(t),
    s = a.useRef(r);
  a.useEffect(() => {
    (l.current = t), (s.current = r);
  }, [t, r]),
    $(() => {
      if (!e || !n) return;
      let o = W(e);
      if (!o) return;
      let i = l.current,
        u = s.current,
        c = Object.assign((m) => i(m), { acceptNode: i }),
        d = o.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, c, !1);
      for (; d.nextNode(); ) u(d.currentNode);
    }, [e, n, l, s]);
}
function yt(e) {
  throw new Error("Unexpected object: " + e);
}
var N = ((e) => (
  (e[(e.First = 0)] = "First"),
  (e[(e.Previous = 1)] = "Previous"),
  (e[(e.Next = 2)] = "Next"),
  (e[(e.Last = 3)] = "Last"),
  (e[(e.Specific = 4)] = "Specific"),
  (e[(e.Nothing = 5)] = "Nothing"),
  e
))(N || {});
function xt(e, t) {
  let r = t.resolveItems();
  if (r.length <= 0) return null;
  let n = t.resolveActiveIndex(),
    l = n ?? -1,
    s = (() => {
      switch (e.focus) {
        case 0:
          return r.findIndex((o) => !t.resolveDisabled(o));
        case 1: {
          let o = r
            .slice()
            .reverse()
            .findIndex((i, u, c) =>
              l !== -1 && c.length - u - 1 >= l ? !1 : !t.resolveDisabled(i)
            );
          return o === -1 ? o : r.length - 1 - o;
        }
        case 2:
          return r.findIndex((o, i) => (i <= l ? !1 : !t.resolveDisabled(o)));
        case 3: {
          let o = r
            .slice()
            .reverse()
            .findIndex((i) => !t.resolveDisabled(i));
          return o === -1 ? o : r.length - 1 - o;
        }
        case 4:
          return r.findIndex((o) => t.resolveId(o) === e.id);
        case 5:
          return null;
        default:
          yt(e);
      }
    })();
  return s === -1 ? n : s;
}
function be(...e) {
  return e.filter(Boolean).join(" ");
}
var K = ((e) => (
    (e[(e.None = 0)] = "None"),
    (e[(e.RenderStrategy = 1)] = "RenderStrategy"),
    (e[(e.Static = 2)] = "Static"),
    e
  ))(K || {}),
  D = ((e) => (
    (e[(e.Unmount = 0)] = "Unmount"), (e[(e.Hidden = 1)] = "Hidden"), e
  ))(D || {});
function O({
  ourProps: e,
  theirProps: t,
  slot: r,
  defaultTag: n,
  features: l,
  visible: s = !0,
  name: o,
}) {
  let i = Qe(t, e);
  if (s) return z(i, r, n, o);
  let u = l ?? 0;
  if (u & 2) {
    let { static: c = !1, ...d } = i;
    if (c) return z(d, r, n, o);
  }
  if (u & 1) {
    let { unmount: c = !0, ...d } = i;
    return F(c ? 0 : 1, {
      0() {
        return null;
      },
      1() {
        return z({ ...d, hidden: !0, style: { display: "none" } }, r, n, o);
      },
    });
  }
  return z(i, r, n, o);
}
function z(e, t = {}, r, n) {
  let {
      as: l = r,
      children: s,
      refName: o = "ref",
      ...i
    } = de(e, ["unmount", "static"]),
    u = e.ref !== void 0 ? { [o]: e.ref } : {},
    c = typeof s == "function" ? s(t) : s;
  "className" in i &&
    i.className &&
    typeof i.className == "function" &&
    (i.className = i.className(t));
  let d = {};
  if (t) {
    let m = !1,
      h = [];
    for (let [v, f] of Object.entries(t))
      typeof f == "boolean" && (m = !0), f === !0 && h.push(v);
    m && (d["data-headlessui-state"] = h.join(" "));
  }
  if (l === a.Fragment && Object.keys(Ce(i)).length > 0) {
    if (!a.isValidElement(c) || (Array.isArray(c) && c.length > 1))
      throw new Error(
        [
          'Passing props on "Fragment"!',
          "",
          `The current component <${n} /> is rendering a "Fragment".`,
          "However we need to passthrough the following props:",
          Object.keys(i).map((f) => `  - ${f}`).join(`
`),
          "",
          "You can apply a few solutions:",
          [
            'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
            "Render a single element as the child so that we can forward the props onto that element.",
          ].map((f) => `  - ${f}`).join(`
`),
        ].join(`
`)
      );
    let m = c.props,
      h =
        typeof m?.className == "function"
          ? (...f) => be(m?.className(...f), i.className)
          : be(m?.className, i.className),
      v = h ? { className: h } : {};
    return a.cloneElement(
      c,
      Object.assign(
        {},
        Qe(c.props, Ce(de(i, ["ref"]))),
        d,
        u,
        Et(c.ref, u.ref),
        v
      )
    );
  }
  return a.createElement(
    l,
    Object.assign(
      {},
      de(i, ["ref"]),
      l !== a.Fragment && u,
      l !== a.Fragment && d
    ),
    c
  );
}
function Et(...e) {
  return {
    ref: e.every((t) => t == null)
      ? void 0
      : (t) => {
          for (let r of e)
            r != null && (typeof r == "function" ? r(t) : (r.current = t));
        },
  };
}
function Qe(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {},
    r = {};
  for (let n of e)
    for (let l in n)
      l.startsWith("on") && typeof n[l] == "function"
        ? (r[l] != null || (r[l] = []), r[l].push(n[l]))
        : (t[l] = n[l]);
  if (t.disabled || t["aria-disabled"])
    return Object.assign(
      t,
      Object.fromEntries(Object.keys(r).map((n) => [n, void 0]))
    );
  for (let n in r)
    Object.assign(t, {
      [n](l, ...s) {
        let o = r[n];
        for (let i of o) {
          if (
            (l instanceof Event || l?.nativeEvent instanceof Event) &&
            l.defaultPrevented
          )
            return;
          i(l, ...s);
        }
      },
    });
  return t;
}
function k(e) {
  var t;
  return Object.assign(a.forwardRef(e), {
    displayName: (t = e.displayName) != null ? t : e.name,
  });
}
function Ce(e) {
  let t = Object.assign({}, e);
  for (let r in t) t[r] === void 0 && delete t[r];
  return t;
}
function de(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t) n in r && delete r[n];
  return r;
}
function Ve(e) {
  let t = e.parentElement,
    r = null;
  for (; t && !(t instanceof HTMLFieldSetElement); )
    t instanceof HTMLLegendElement && (r = t), (t = t.parentElement);
  let n = t?.getAttribute("disabled") === "";
  return n && wt(r) ? !1 : n;
}
function wt(e) {
  if (!e) return !1;
  let t = e.previousElementSibling;
  for (; t !== null; ) {
    if (t instanceof HTMLLegendElement) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
let Ie = a.createContext(null);
Ie.displayName = "OpenClosedContext";
var T = ((e) => (
  (e[(e.Open = 1)] = "Open"),
  (e[(e.Closed = 2)] = "Closed"),
  (e[(e.Closing = 4)] = "Closing"),
  (e[(e.Opening = 8)] = "Opening"),
  e
))(T || {});
function Z() {
  return a.useContext(Ie);
}
function Se({ value: e, children: t }) {
  return I.createElement(Ie.Provider, { value: e }, t);
}
var w = ((e) => (
  (e.Space = " "),
  (e.Enter = "Enter"),
  (e.Escape = "Escape"),
  (e.Backspace = "Backspace"),
  (e.Delete = "Delete"),
  (e.ArrowLeft = "ArrowLeft"),
  (e.ArrowUp = "ArrowUp"),
  (e.ArrowRight = "ArrowRight"),
  (e.ArrowDown = "ArrowDown"),
  (e.Home = "Home"),
  (e.End = "End"),
  (e.PageUp = "PageUp"),
  (e.PageDown = "PageDown"),
  (e.Tab = "Tab"),
  e
))(w || {});
function Oe(e) {
  return [e.screenX, e.screenY];
}
function It() {
  let e = a.useRef([-1, -1]);
  return {
    wasMoved(t) {
      let r = Oe(t);
      return e.current[0] === r[0] && e.current[1] === r[1]
        ? !1
        : ((e.current = r), !0);
    },
    update(t) {
      e.current = Oe(t);
    },
  };
}
function Pe() {
  let e = a.useRef(!1);
  return (
    $(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      []
    ),
    e
  );
}
function St(...e) {
  return a.useMemo(() => W(...e), [...e]);
}
var Me;
let Pt =
  (Me = I.startTransition) != null
    ? Me
    : function (e) {
        e();
      };
var Rt = ((e) => (
    (e[(e.Open = 0)] = "Open"), (e[(e.Closed = 1)] = "Closed"), e
  ))(Rt || {}),
  Tt = ((e) => (
    (e[(e.ToggleDisclosure = 0)] = "ToggleDisclosure"),
    (e[(e.CloseDisclosure = 1)] = "CloseDisclosure"),
    (e[(e.SetButtonId = 2)] = "SetButtonId"),
    (e[(e.SetPanelId = 3)] = "SetPanelId"),
    (e[(e.LinkPanel = 4)] = "LinkPanel"),
    (e[(e.UnlinkPanel = 5)] = "UnlinkPanel"),
    e
  ))(Tt || {});
let Ft = {
    0: (e) => ({ ...e, disclosureState: F(e.disclosureState, { 0: 1, 1: 0 }) }),
    1: (e) => (e.disclosureState === 1 ? e : { ...e, disclosureState: 1 }),
    4(e) {
      return e.linkedPanel === !0 ? e : { ...e, linkedPanel: !0 };
    },
    5(e) {
      return e.linkedPanel === !1 ? e : { ...e, linkedPanel: !1 };
    },
    2(e, t) {
      return e.buttonId === t.buttonId ? e : { ...e, buttonId: t.buttonId };
    },
    3(e, t) {
      return e.panelId === t.panelId ? e : { ...e, panelId: t.panelId };
    },
  },
  Re = a.createContext(null);
Re.displayName = "DisclosureContext";
function Te(e) {
  let t = a.useContext(Re);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Disclosure /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(r, Te), r);
  }
  return t;
}
let Fe = a.createContext(null);
Fe.displayName = "DisclosureAPIContext";
function We(e) {
  let t = a.useContext(Fe);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Disclosure /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(r, We), r);
  }
  return t;
}
let Ne = a.createContext(null);
Ne.displayName = "DisclosurePanelContext";
function Nt() {
  return a.useContext(Ne);
}
function $t(e, t) {
  return F(t.type, Ft, e, t);
}
let kt = a.Fragment;
function Dt(e, t) {
  let { defaultOpen: r = !1, ...n } = e,
    l = a.useRef(null),
    s = C(
      t,
      gt((g) => {
        l.current = g;
      }, e.as === void 0 || e.as === a.Fragment)
    ),
    o = a.useRef(null),
    i = a.useRef(null),
    u = a.useReducer($t, {
      disclosureState: r ? 0 : 1,
      linkedPanel: !1,
      buttonRef: i,
      panelRef: o,
      buttonId: null,
      panelId: null,
    }),
    [{ disclosureState: c, buttonId: d }, m] = u,
    h = E((g) => {
      m({ type: 1 });
      let x = W(l);
      if (!x || !d) return;
      let p = (() =>
        g
          ? g instanceof HTMLElement
            ? g
            : g.current instanceof HTMLElement
            ? g.current
            : x.getElementById(d)
          : x.getElementById(d))();
      p?.focus();
    }),
    v = a.useMemo(() => ({ close: h }), [h]),
    f = a.useMemo(() => ({ open: c === 0, close: h }), [c, h]),
    b = { ref: s };
  return I.createElement(
    Re.Provider,
    { value: u },
    I.createElement(
      Fe.Provider,
      { value: v },
      I.createElement(
        Se,
        { value: F(c, { 0: T.Open, 1: T.Closed }) },
        O({
          ourProps: b,
          theirProps: n,
          slot: f,
          defaultTag: kt,
          name: "Disclosure",
        })
      )
    )
  );
}
let jt = "button";
function Ct(e, t) {
  let r = V(),
    { id: n = `headlessui-disclosure-button-${r}`, ...l } = e,
    [s, o] = Te("Disclosure.Button"),
    i = Nt(),
    u = i === null ? !1 : i === s.panelId,
    c = a.useRef(null),
    d = C(c, t, u ? null : s.buttonRef);
  a.useEffect(() => {
    if (!u)
      return (
        o({ type: 2, buttonId: n }),
        () => {
          o({ type: 2, buttonId: null });
        }
      );
  }, [n, o, u]);
  let m = E((x) => {
      var p;
      if (u) {
        if (s.disclosureState === 1) return;
        switch (x.key) {
          case w.Space:
          case w.Enter:
            x.preventDefault(),
              x.stopPropagation(),
              o({ type: 0 }),
              (p = s.buttonRef.current) == null || p.focus();
            break;
        }
      } else
        switch (x.key) {
          case w.Space:
          case w.Enter:
            x.preventDefault(), x.stopPropagation(), o({ type: 0 });
            break;
        }
    }),
    h = E((x) => {
      switch (x.key) {
        case w.Space:
          x.preventDefault();
          break;
      }
    }),
    v = E((x) => {
      var p;
      Ve(x.currentTarget) ||
        e.disabled ||
        (u
          ? (o({ type: 0 }), (p = s.buttonRef.current) == null || p.focus())
          : o({ type: 0 }));
    }),
    f = a.useMemo(() => ({ open: s.disclosureState === 0 }), [s]),
    b = Ke(e, c),
    g = u
      ? { ref: d, type: b, onKeyDown: m, onClick: v }
      : {
          ref: d,
          id: n,
          type: b,
          "aria-expanded": e.disabled ? void 0 : s.disclosureState === 0,
          "aria-controls": s.linkedPanel ? s.panelId : void 0,
          onKeyDown: m,
          onKeyUp: h,
          onClick: v,
        };
  return O({
    ourProps: g,
    theirProps: l,
    slot: f,
    defaultTag: jt,
    name: "Disclosure.Button",
  });
}
let Ot = "div",
  Mt = K.RenderStrategy | K.Static;
function Lt(e, t) {
  let r = V(),
    { id: n = `headlessui-disclosure-panel-${r}`, ...l } = e,
    [s, o] = Te("Disclosure.Panel"),
    { close: i } = We("Disclosure.Panel"),
    u = C(t, s.panelRef, (v) => {
      Pt(() => o({ type: v ? 4 : 5 }));
    });
  a.useEffect(
    () => (
      o({ type: 3, panelId: n }),
      () => {
        o({ type: 3, panelId: null });
      }
    ),
    [n, o]
  );
  let c = Z(),
    d = (() =>
      c !== null ? (c & T.Open) === T.Open : s.disclosureState === 0)(),
    m = a.useMemo(() => ({ open: s.disclosureState === 0, close: i }), [s, i]),
    h = { ref: u, id: n };
  return I.createElement(
    Ne.Provider,
    { value: s.panelId },
    O({
      ourProps: h,
      theirProps: l,
      slot: m,
      defaultTag: Ot,
      features: Mt,
      visible: d,
      name: "Disclosure.Panel",
    })
  );
}
let At = k(Dt),
  _t = k(Ct),
  Ht = k(Lt),
  Q = Object.assign(At, { Button: _t, Panel: Ht }),
  Le =
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function Ae(e) {
  var t, r;
  let n = (t = e.innerText) != null ? t : "",
    l = e.cloneNode(!0);
  if (!(l instanceof HTMLElement)) return n;
  let s = !1;
  for (let i of l.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))
    i.remove(), (s = !0);
  let o = s ? ((r = l.innerText) != null ? r : "") : n;
  return Le.test(o) && (o = o.replace(Le, "")), o;
}
function Bt(e) {
  let t = e.getAttribute("aria-label");
  if (typeof t == "string") return t.trim();
  let r = e.getAttribute("aria-labelledby");
  if (r) {
    let n = r
      .split(" ")
      .map((l) => {
        let s = document.getElementById(l);
        if (s) {
          let o = s.getAttribute("aria-label");
          return typeof o == "string" ? o.trim() : Ae(s).trim();
        }
        return null;
      })
      .filter(Boolean);
    if (n.length > 0) return n.join(", ");
  }
  return Ae(e).trim();
}
function Ut(e) {
  let t = a.useRef(""),
    r = a.useRef("");
  return E(() => {
    let n = e.current;
    if (!n) return "";
    let l = n.innerText;
    if (t.current === l) return r.current;
    let s = Bt(n).trim().toLowerCase();
    return (t.current = l), (r.current = s), s;
  });
}
var Kt = ((e) => (
    (e[(e.Open = 0)] = "Open"), (e[(e.Closed = 1)] = "Closed"), e
  ))(Kt || {}),
  qt = ((e) => (
    (e[(e.Pointer = 0)] = "Pointer"), (e[(e.Other = 1)] = "Other"), e
  ))(qt || {}),
  Qt = ((e) => (
    (e[(e.OpenMenu = 0)] = "OpenMenu"),
    (e[(e.CloseMenu = 1)] = "CloseMenu"),
    (e[(e.GoToItem = 2)] = "GoToItem"),
    (e[(e.Search = 3)] = "Search"),
    (e[(e.ClearSearch = 4)] = "ClearSearch"),
    (e[(e.RegisterItem = 5)] = "RegisterItem"),
    (e[(e.UnregisterItem = 6)] = "UnregisterItem"),
    e
  ))(Qt || {});
function fe(e, t = (r) => r) {
  let r = e.activeItemIndex !== null ? e.items[e.activeItemIndex] : null,
    n = Ue(t(e.items.slice()), (s) => s.dataRef.current.domRef.current),
    l = r ? n.indexOf(r) : null;
  return l === -1 && (l = null), { items: n, activeItemIndex: l };
}
let Vt = {
    1(e) {
      return e.menuState === 1
        ? e
        : { ...e, activeItemIndex: null, menuState: 1 };
    },
    0(e) {
      return e.menuState === 0 ? e : { ...e, __demoMode: !1, menuState: 0 };
    },
    2: (e, t) => {
      var r;
      let n = fe(e),
        l = xt(t, {
          resolveItems: () => n.items,
          resolveActiveIndex: () => n.activeItemIndex,
          resolveId: (s) => s.id,
          resolveDisabled: (s) => s.dataRef.current.disabled,
        });
      return {
        ...e,
        ...n,
        searchQuery: "",
        activeItemIndex: l,
        activationTrigger: (r = t.trigger) != null ? r : 1,
      };
    },
    3: (e, t) => {
      let r = e.searchQuery !== "" ? 0 : 1,
        n = e.searchQuery + t.value.toLowerCase(),
        l = (
          e.activeItemIndex !== null
            ? e.items
                .slice(e.activeItemIndex + r)
                .concat(e.items.slice(0, e.activeItemIndex + r))
            : e.items
        ).find((o) => {
          var i;
          return (
            ((i = o.dataRef.current.textValue) == null
              ? void 0
              : i.startsWith(n)) && !o.dataRef.current.disabled
          );
        }),
        s = l ? e.items.indexOf(l) : -1;
      return s === -1 || s === e.activeItemIndex
        ? { ...e, searchQuery: n }
        : { ...e, searchQuery: n, activeItemIndex: s, activationTrigger: 1 };
    },
    4(e) {
      return e.searchQuery === ""
        ? e
        : { ...e, searchQuery: "", searchActiveItemIndex: null };
    },
    5: (e, t) => {
      let r = fe(e, (n) => [...n, { id: t.id, dataRef: t.dataRef }]);
      return { ...e, ...r };
    },
    6: (e, t) => {
      let r = fe(e, (n) => {
        let l = n.findIndex((s) => s.id === t.id);
        return l !== -1 && n.splice(l, 1), n;
      });
      return { ...e, ...r, activationTrigger: 1 };
    },
  },
  $e = a.createContext(null);
$e.displayName = "MenuContext";
function ee(e) {
  let t = a.useContext($e);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Menu /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(r, ee), r);
  }
  return t;
}
function Wt(e, t) {
  return F(t.type, Vt, e, t);
}
let Gt = a.Fragment;
function Xt(e, t) {
  let { __demoMode: r = !1, ...n } = e,
    l = a.useReducer(Wt, {
      __demoMode: r,
      menuState: r ? 0 : 1,
      buttonRef: a.createRef(),
      itemsRef: a.createRef(),
      items: [],
      searchQuery: "",
      activeItemIndex: null,
      activationTrigger: 1,
    }),
    [{ menuState: s, itemsRef: o, buttonRef: i }, u] = l,
    c = C(t);
  ht(
    [i, o],
    (v, f) => {
      var b;
      u({ type: 1 }),
        we(f, Ee.Loose) ||
          (v.preventDefault(), (b = i.current) == null || b.focus());
    },
    s === 0
  );
  let d = E(() => {
      u({ type: 1 });
    }),
    m = a.useMemo(() => ({ open: s === 0, close: d }), [s, d]),
    h = { ref: c };
  return I.createElement(
    $e.Provider,
    { value: l },
    I.createElement(
      Se,
      { value: F(s, { 0: T.Open, 1: T.Closed }) },
      O({ ourProps: h, theirProps: n, slot: m, defaultTag: Gt, name: "Menu" })
    )
  );
}
let Yt = "button";
function zt(e, t) {
  var r;
  let n = V(),
    { id: l = `headlessui-menu-button-${n}`, ...s } = e,
    [o, i] = ee("Menu.Button"),
    u = C(o.buttonRef, t),
    c = J(),
    d = E((b) => {
      switch (b.key) {
        case w.Space:
        case w.Enter:
        case w.ArrowDown:
          b.preventDefault(),
            b.stopPropagation(),
            i({ type: 0 }),
            c.nextFrame(() => i({ type: 2, focus: N.First }));
          break;
        case w.ArrowUp:
          b.preventDefault(),
            b.stopPropagation(),
            i({ type: 0 }),
            c.nextFrame(() => i({ type: 2, focus: N.Last }));
          break;
      }
    }),
    m = E((b) => {
      switch (b.key) {
        case w.Space:
          b.preventDefault();
          break;
      }
    }),
    h = E((b) => {
      if (Ve(b.currentTarget)) return b.preventDefault();
      e.disabled ||
        (o.menuState === 0
          ? (i({ type: 1 }),
            c.nextFrame(() => {
              var g;
              return (g = o.buttonRef.current) == null
                ? void 0
                : g.focus({ preventScroll: !0 });
            }))
          : (b.preventDefault(), i({ type: 0 })));
    }),
    v = a.useMemo(() => ({ open: o.menuState === 0 }), [o]),
    f = {
      ref: u,
      id: l,
      type: Ke(e, o.buttonRef),
      "aria-haspopup": "menu",
      "aria-controls": (r = o.itemsRef.current) == null ? void 0 : r.id,
      "aria-expanded": e.disabled ? void 0 : o.menuState === 0,
      onKeyDown: d,
      onKeyUp: m,
      onClick: h,
    };
  return O({
    ourProps: f,
    theirProps: s,
    slot: v,
    defaultTag: Yt,
    name: "Menu.Button",
  });
}
let Jt = "div",
  Zt = K.RenderStrategy | K.Static;
function er(e, t) {
  var r, n;
  let l = V(),
    { id: s = `headlessui-menu-items-${l}`, ...o } = e,
    [i, u] = ee("Menu.Items"),
    c = C(i.itemsRef, t),
    d = St(i.itemsRef),
    m = J(),
    h = Z(),
    v = (() => (h !== null ? (h & T.Open) === T.Open : i.menuState === 0))();
  a.useEffect(() => {
    let p = i.itemsRef.current;
    p &&
      i.menuState === 0 &&
      p !== d?.activeElement &&
      p.focus({ preventScroll: !0 });
  }, [i.menuState, i.itemsRef, d]),
    bt({
      container: i.itemsRef.current,
      enabled: i.menuState === 0,
      accept(p) {
        return p.getAttribute("role") === "menuitem"
          ? NodeFilter.FILTER_REJECT
          : p.hasAttribute("role")
          ? NodeFilter.FILTER_SKIP
          : NodeFilter.FILTER_ACCEPT;
      },
      walk(p) {
        p.setAttribute("role", "none");
      },
    });
  let f = E((p) => {
      var R, P;
      switch ((m.dispose(), p.key)) {
        case w.Space:
          if (i.searchQuery !== "")
            return (
              p.preventDefault(),
              p.stopPropagation(),
              u({ type: 3, value: p.key })
            );
        case w.Enter:
          if (
            (p.preventDefault(),
            p.stopPropagation(),
            u({ type: 1 }),
            i.activeItemIndex !== null)
          ) {
            let { dataRef: S } = i.items[i.activeItemIndex];
            (P = (R = S.current) == null ? void 0 : R.domRef.current) == null ||
              P.click();
          }
          Be(i.buttonRef.current);
          break;
        case w.ArrowDown:
          return (
            p.preventDefault(),
            p.stopPropagation(),
            u({ type: 2, focus: N.Next })
          );
        case w.ArrowUp:
          return (
            p.preventDefault(),
            p.stopPropagation(),
            u({ type: 2, focus: N.Previous })
          );
        case w.Home:
        case w.PageUp:
          return (
            p.preventDefault(),
            p.stopPropagation(),
            u({ type: 2, focus: N.First })
          );
        case w.End:
        case w.PageDown:
          return (
            p.preventDefault(),
            p.stopPropagation(),
            u({ type: 2, focus: N.Last })
          );
        case w.Escape:
          p.preventDefault(),
            p.stopPropagation(),
            u({ type: 1 }),
            j().nextFrame(() => {
              var S;
              return (S = i.buttonRef.current) == null
                ? void 0
                : S.focus({ preventScroll: !0 });
            });
          break;
        case w.Tab:
          p.preventDefault(),
            p.stopPropagation(),
            u({ type: 1 }),
            j().nextFrame(() => {
              mt(i.buttonRef.current, p.shiftKey ? ge.Previous : ge.Next);
            });
          break;
        default:
          p.key.length === 1 &&
            (u({ type: 3, value: p.key }),
            m.setTimeout(() => u({ type: 4 }), 350));
          break;
      }
    }),
    b = E((p) => {
      switch (p.key) {
        case w.Space:
          p.preventDefault();
          break;
      }
    }),
    g = a.useMemo(() => ({ open: i.menuState === 0 }), [i]),
    x = {
      "aria-activedescendant":
        i.activeItemIndex === null || (r = i.items[i.activeItemIndex]) == null
          ? void 0
          : r.id,
      "aria-labelledby": (n = i.buttonRef.current) == null ? void 0 : n.id,
      id: s,
      onKeyDown: f,
      onKeyUp: b,
      role: "menu",
      tabIndex: 0,
      ref: c,
    };
  return O({
    ourProps: x,
    theirProps: o,
    slot: g,
    defaultTag: Jt,
    features: Zt,
    visible: v,
    name: "Menu.Items",
  });
}
let tr = a.Fragment;
function rr(e, t) {
  let r = V(),
    { id: n = `headlessui-menu-item-${r}`, disabled: l = !1, ...s } = e,
    [o, i] = ee("Menu.Item"),
    u = o.activeItemIndex !== null ? o.items[o.activeItemIndex].id === n : !1,
    c = a.useRef(null),
    d = C(t, c);
  $(() => {
    if (o.__demoMode || o.menuState !== 0 || !u || o.activationTrigger === 0)
      return;
    let S = j();
    return (
      S.requestAnimationFrame(() => {
        var B, A;
        (A = (B = c.current) == null ? void 0 : B.scrollIntoView) == null ||
          A.call(B, { block: "nearest" });
      }),
      S.dispose
    );
  }, [o.__demoMode, c, u, o.menuState, o.activationTrigger, o.activeItemIndex]);
  let m = Ut(c),
    h = a.useRef({
      disabled: l,
      domRef: c,
      get textValue() {
        return m();
      },
    });
  $(() => {
    h.current.disabled = l;
  }, [h, l]),
    $(
      () => (i({ type: 5, id: n, dataRef: h }), () => i({ type: 6, id: n })),
      [h, n]
    );
  let v = E(() => {
      i({ type: 1 });
    }),
    f = E((S) => {
      if (l) return S.preventDefault();
      i({ type: 1 }), Be(o.buttonRef.current);
    }),
    b = E(() => {
      if (l) return i({ type: 2, focus: N.Nothing });
      i({ type: 2, focus: N.Specific, id: n });
    }),
    g = It(),
    x = E((S) => g.update(S)),
    p = E((S) => {
      g.wasMoved(S) &&
        (l || u || i({ type: 2, focus: N.Specific, id: n, trigger: 0 }));
    }),
    R = E((S) => {
      g.wasMoved(S) && (l || (u && i({ type: 2, focus: N.Nothing })));
    }),
    P = a.useMemo(() => ({ active: u, disabled: l, close: v }), [u, l, v]);
  return O({
    ourProps: {
      id: n,
      ref: d,
      role: "menuitem",
      tabIndex: l === !0 ? void 0 : -1,
      "aria-disabled": l === !0 ? !0 : void 0,
      disabled: void 0,
      onClick: f,
      onFocus: b,
      onPointerEnter: x,
      onMouseEnter: x,
      onPointerMove: p,
      onMouseMove: p,
      onPointerLeave: R,
      onMouseLeave: R,
    },
    theirProps: s,
    slot: P,
    defaultTag: tr,
    name: "Menu.Item",
  });
}
let nr = k(Xt),
  lr = k(zt),
  or = k(er),
  ir = k(rr),
  U = Object.assign(nr, { Button: lr, Items: or, Item: ir });
function ar(e = 0) {
  let [t, r] = a.useState(e),
    n = Pe(),
    l = a.useCallback(
      (u) => {
        n.current && r((c) => c | u);
      },
      [t, n]
    ),
    s = a.useCallback((u) => !!(t & u), [t]),
    o = a.useCallback(
      (u) => {
        n.current && r((c) => c & ~u);
      },
      [r, n]
    ),
    i = a.useCallback(
      (u) => {
        n.current && r((c) => c ^ u);
      },
      [r]
    );
  return { flags: t, addFlag: l, hasFlag: s, removeFlag: o, toggleFlag: i };
}
function sr(e) {
  let t = { called: !1 };
  return (...r) => {
    if (!t.called) return (t.called = !0), e(...r);
  };
}
function me(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function pe(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
function ur(e, t) {
  let r = j();
  if (!e) return r.dispose;
  let { transitionDuration: n, transitionDelay: l } = getComputedStyle(e),
    [s, o] = [n, l].map((u) => {
      let [c = 0] = u
        .split(",")
        .filter(Boolean)
        .map((d) => (d.includes("ms") ? parseFloat(d) : parseFloat(d) * 1e3))
        .sort((d, m) => m - d);
      return c;
    }),
    i = s + o;
  if (i !== 0) {
    r.group((c) => {
      c.setTimeout(() => {
        t(), c.dispose();
      }, i),
        c.addEventListener(e, "transitionrun", (d) => {
          d.target === d.currentTarget && c.dispose();
        });
    });
    let u = r.addEventListener(e, "transitionend", (c) => {
      c.target === c.currentTarget && (t(), u());
    });
  } else t();
  return r.add(() => t()), r.dispose;
}
function cr(e, t, r, n) {
  let l = r ? "enter" : "leave",
    s = j(),
    o = n !== void 0 ? sr(n) : () => {};
  l === "enter" && (e.removeAttribute("hidden"), (e.style.display = ""));
  let i = F(l, { enter: () => t.enter, leave: () => t.leave }),
    u = F(l, { enter: () => t.enterTo, leave: () => t.leaveTo }),
    c = F(l, { enter: () => t.enterFrom, leave: () => t.leaveFrom });
  return (
    pe(
      e,
      ...t.enter,
      ...t.enterTo,
      ...t.enterFrom,
      ...t.leave,
      ...t.leaveFrom,
      ...t.leaveTo,
      ...t.entered
    ),
    me(e, ...i, ...c),
    s.nextFrame(() => {
      pe(e, ...c),
        me(e, ...u),
        ur(e, () => (pe(e, ...i), me(e, ...t.entered), o()));
    }),
    s.dispose
  );
}
function dr({ container: e, direction: t, classes: r, onStart: n, onStop: l }) {
  let s = Pe(),
    o = J(),
    i = L(t);
  $(() => {
    let u = j();
    o.add(u.dispose);
    let c = e.current;
    if (c && i.current !== "idle" && s.current)
      return (
        u.dispose(),
        n.current(i.current),
        u.add(
          cr(c, r.current, i.current === "enter", () => {
            u.dispose(), l.current(i.current);
          })
        ),
        u.dispose
      );
  }, [t]);
}
function _(e = "") {
  return e.split(" ").filter((t) => t.trim().length > 1);
}
let te = a.createContext(null);
te.displayName = "TransitionContext";
var fr = ((e) => ((e.Visible = "visible"), (e.Hidden = "hidden"), e))(fr || {});
function mr() {
  let e = a.useContext(te);
  if (e === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />."
    );
  return e;
}
function pr() {
  let e = a.useContext(re);
  if (e === null)
    throw new Error(
      "A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />."
    );
  return e;
}
let re = a.createContext(null);
re.displayName = "NestingContext";
function ne(e) {
  return "children" in e
    ? ne(e.children)
    : e.current
        .filter(({ el: t }) => t.current !== null)
        .filter(({ state: t }) => t === "visible").length > 0;
}
function Ge(e, t) {
  let r = L(e),
    n = a.useRef([]),
    l = Pe(),
    s = J(),
    o = E((v, f = D.Hidden) => {
      let b = n.current.findIndex(({ el: g }) => g === v);
      b !== -1 &&
        (F(f, {
          [D.Unmount]() {
            n.current.splice(b, 1);
          },
          [D.Hidden]() {
            n.current[b].state = "hidden";
          },
        }),
        s.microTask(() => {
          var g;
          !ne(n) && l.current && ((g = r.current) == null || g.call(r));
        }));
    }),
    i = E((v) => {
      let f = n.current.find(({ el: b }) => b === v);
      return (
        f
          ? f.state !== "visible" && (f.state = "visible")
          : n.current.push({ el: v, state: "visible" }),
        () => o(v, D.Unmount)
      );
    }),
    u = a.useRef([]),
    c = a.useRef(Promise.resolve()),
    d = a.useRef({ enter: [], leave: [], idle: [] }),
    m = E((v, f, b) => {
      u.current.splice(0),
        t &&
          (t.chains.current[f] = t.chains.current[f].filter(([g]) => g !== v)),
        t?.chains.current[f].push([
          v,
          new Promise((g) => {
            u.current.push(g);
          }),
        ]),
        t?.chains.current[f].push([
          v,
          new Promise((g) => {
            Promise.all(d.current[f].map(([x, p]) => p)).then(() => g());
          }),
        ]),
        f === "enter"
          ? (c.current = c.current.then(() => t?.wait.current).then(() => b(f)))
          : b(f);
    }),
    h = E((v, f, b) => {
      Promise.all(d.current[f].splice(0).map(([g, x]) => x))
        .then(() => {
          var g;
          (g = u.current.shift()) == null || g();
        })
        .then(() => b(f));
    });
  return a.useMemo(
    () => ({
      children: n,
      register: i,
      unregister: o,
      onStart: m,
      onStop: h,
      wait: c,
      chains: d,
    }),
    [i, o, n, m, h, d, c]
  );
}
function vr() {}
let hr = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];
function _e(e) {
  var t;
  let r = {};
  for (let n of hr) r[n] = (t = e[n]) != null ? t : vr;
  return r;
}
function gr(e) {
  let t = a.useRef(_e(e));
  return (
    a.useEffect(() => {
      t.current = _e(e);
    }, [e]),
    t
  );
}
let br = "div",
  Xe = K.RenderStrategy;
function yr(e, t) {
  let {
      beforeEnter: r,
      afterEnter: n,
      beforeLeave: l,
      afterLeave: s,
      enter: o,
      enterFrom: i,
      enterTo: u,
      entered: c,
      leave: d,
      leaveFrom: m,
      leaveTo: h,
      ...v
    } = e,
    f = a.useRef(null),
    b = C(f, t),
    g = v.unmount ? D.Unmount : D.Hidden,
    { show: x, appear: p, initial: R } = mr(),
    [P, S] = a.useState(x ? "visible" : "hidden"),
    B = pr(),
    { register: A, unregister: G } = B,
    oe = a.useRef(null);
  a.useEffect(() => A(f), [A, f]),
    a.useEffect(() => {
      if (g === D.Hidden && f.current) {
        if (x && P !== "visible") {
          S("visible");
          return;
        }
        return F(P, { hidden: () => G(f), visible: () => A(f) });
      }
    }, [P, f, A, G, x, g]);
  let ie = L({
      enter: _(o),
      enterFrom: _(i),
      enterTo: _(u),
      entered: _(c),
      leave: _(d),
      leaveFrom: _(m),
      leaveTo: _(h),
    }),
    X = gr({ beforeEnter: r, afterEnter: n, beforeLeave: l, afterLeave: s }),
    ae = xe();
  a.useEffect(() => {
    if (ae && P === "visible" && f.current === null)
      throw new Error(
        "Did you forget to passthrough the `ref` to the actual DOM node?"
      );
  }, [f, P, ae]);
  let se = R && !p,
    Ze = (() =>
      !ae || se || oe.current === x ? "idle" : x ? "enter" : "leave")(),
    q = ar(0),
    et = E((M) =>
      F(M, {
        enter: () => {
          q.addFlag(T.Opening), X.current.beforeEnter();
        },
        leave: () => {
          q.addFlag(T.Closing), X.current.beforeLeave();
        },
        idle: () => {},
      })
    ),
    tt = E((M) =>
      F(M, {
        enter: () => {
          q.removeFlag(T.Opening), X.current.afterEnter();
        },
        leave: () => {
          q.removeFlag(T.Closing), X.current.afterLeave();
        },
        idle: () => {},
      })
    ),
    Y = Ge(() => {
      S("hidden"), G(f);
    }, B);
  dr({
    container: f,
    classes: ie,
    direction: Ze,
    onStart: L((M) => {
      Y.onStart(f, M, et);
    }),
    onStop: L((M) => {
      Y.onStop(f, M, tt), M === "leave" && !ne(Y) && (S("hidden"), G(f));
    }),
  }),
    a.useEffect(() => {
      se && (g === D.Hidden ? (oe.current = null) : (oe.current = x));
    }, [x, se, P]);
  let ue = v,
    rt = { ref: b };
  return (
    p &&
      x &&
      R &&
      (ue = {
        ...ue,
        className: be(
          v.className,
          ...ie.current.enter,
          ...ie.current.enterFrom
        ),
      }),
    I.createElement(
      re.Provider,
      { value: Y },
      I.createElement(
        Se,
        { value: F(P, { visible: T.Open, hidden: T.Closed }) | q.flags },
        O({
          ourProps: rt,
          theirProps: ue,
          defaultTag: br,
          features: Xe,
          visible: P === "visible",
          name: "Transition.Child",
        })
      )
    )
  );
}
function xr(e, t) {
  let { show: r, appear: n = !1, unmount: l, ...s } = e,
    o = a.useRef(null),
    i = C(o, t);
  xe();
  let u = Z();
  if (
    (r === void 0 && u !== null && (r = (u & T.Open) === T.Open),
    ![!0, !1].includes(r))
  )
    throw new Error(
      "A <Transition /> is used but it is missing a `show={true | false}` prop."
    );
  let [c, d] = a.useState(r ? "visible" : "hidden"),
    m = Ge(() => {
      d("hidden");
    }),
    [h, v] = a.useState(!0),
    f = a.useRef([r]);
  $(() => {
    h !== !1 &&
      f.current[f.current.length - 1] !== r &&
      (f.current.push(r), v(!1));
  }, [f, r]);
  let b = a.useMemo(() => ({ show: r, appear: n, initial: h }), [r, n, h]);
  a.useEffect(() => {
    if (r) d("visible");
    else if (!ne(m)) d("hidden");
    else {
      let R = o.current;
      if (!R) return;
      let P = R.getBoundingClientRect();
      P.x === 0 && P.y === 0 && P.width === 0 && P.height === 0 && d("hidden");
    }
  }, [r, m]);
  let g = { unmount: l },
    x = E(() => {
      var R;
      h && v(!1), (R = e.beforeEnter) == null || R.call(e);
    }),
    p = E(() => {
      var R;
      h && v(!1), (R = e.beforeLeave) == null || R.call(e);
    });
  return I.createElement(
    re.Provider,
    { value: m },
    I.createElement(
      te.Provider,
      { value: b },
      O({
        ourProps: {
          ...g,
          as: a.Fragment,
          children: I.createElement(Ye, {
            ref: i,
            ...g,
            ...s,
            beforeEnter: x,
            beforeLeave: p,
          }),
        },
        theirProps: {},
        defaultTag: a.Fragment,
        features: Xe,
        visible: c === "visible",
        name: "Transition",
      })
    )
  );
}
function Er(e, t) {
  let r = a.useContext(te) !== null,
    n = Z() !== null;
  return I.createElement(
    I.Fragment,
    null,
    !r && n
      ? I.createElement(ye, { ref: t, ...e })
      : I.createElement(Ye, { ref: t, ...e })
  );
}
let ye = k(xr),
  Ye = k(yr),
  wr = k(Er),
  Ir = Object.assign(ye, { Child: wr, Root: ye });
function Sr({ title: e, titleId: t, ...r }, n) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        ref: n,
        "aria-labelledby": t,
      },
      r
    ),
    e ? a.createElement("title", { id: t }, e) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3.75 9h16.5m-16.5 6.75h16.5",
    })
  );
}
const Pr = a.forwardRef(Sr),
  Rr = Pr;
function Tr({ title: e, titleId: t, ...r }, n) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        ref: n,
        "aria-labelledby": t,
      },
      r
    ),
    e ? a.createElement("title", { id: t }, e) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 18L18 6M6 6l12 12",
    })
  );
}
const Fr = a.forwardRef(Tr),
  Nr = Fr;
var ze = { exports: {} },
  le = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $r = a,
  kr = Symbol.for("react.element"),
  Dr = Symbol.for("react.fragment"),
  jr = Object.prototype.hasOwnProperty,
  Cr = $r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Or = { key: !0, ref: !0, __self: !0, __source: !0 };
function Je(e, t, r) {
  var n,
    l = {},
    s = null,
    o = null;
  r !== void 0 && (s = "" + r),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (n in t) jr.call(t, n) && !Or.hasOwnProperty(n) && (l[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) l[n] === void 0 && (l[n] = t[n]);
  return {
    $$typeof: kr,
    type: e,
    key: s,
    ref: o,
    props: l,
    _owner: Cr.current,
  };
}
le.Fragment = Dr;
le.jsx = Je;
le.jsxs = Je;
ze.exports = le;
var y = ze.exports;
function ve(...e) {
  return e.filter(Boolean).join(" ");
}
function Ar() {
  return y.jsx(Q, {
    as: "nav",
    className: "bg-yellow-400",
    children: ({ open: e }) =>
      y.jsxs(y.Fragment, {
        children: [
          y.jsx("div", {
            className: "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8",
            children: y.jsxs("div", {
              className: "relative flex h-14 justify-between",
              children: [
                y.jsx("div", {
                  className:
                    "absolute inset-y-0 left-0 flex items-center sm:hidden",
                  children: y.jsxs(Q.Button, {
                    className:
                      "inline-flex items-center justify-center rounded-md p-2 text-yellow-700 hover:text-black focus:outline-none",
                    children: [
                      y.jsx("span", {
                        className: "sr-only",
                        children: "Open main menu",
                      }),
                      e
                        ? y.jsx(Nr, {
                            className: "block h-6 w-6",
                            "aria-hidden": "true",
                          })
                        : y.jsx(Rr, {
                            className: "block h-6 w-6",
                            "aria-hidden": "true",
                          }),
                    ],
                  }),
                }),
                y.jsxs("div", {
                  className:
                    "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start",
                  children: [
                    y.jsx("div", {
                      className: "flex flex-shrink-0 items-center",
                      children: y.jsxs("a", {
                        href: "/solver-v1/",
                        children: [
                          y.jsx("img", {
                            className: "block h-8 w-auto lg:hidden",
                            src: "/solver-v1/icon.svg",
                            alt: "Solver",
                          }),
                          y.jsx("img", {
                            className: "hidden h-8 w-auto lg:block",
                            src: "/solver-v1/icon.svg",
                            alt: "Solver",
                          }),
                        ],
                      }),
                    }),
                    y.jsxs("div", {
                      className: "hidden sm:ml-6 sm:flex sm:space-x-8",
                      children: [
                        y.jsx("a", {
                          href: "#",
                          className:
                            "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-yellow-700 hover:border-yellow-600 hover:text-yellow-700",
                          children: "Classes",
                        }),
                        y.jsx("a", {
                          href: "#",
                          className:
                            "inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-black",
                          children: "Questions",
                        }),
                      ],
                    }),
                  ],
                }),
                y.jsx("div", {
                  className:
                    "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0",
                  children: y.jsxs(U, {
                    as: "div",
                    className: "relative ml-3",
                    children: [
                      y.jsx("div", {
                        children: y.jsxs(U.Button, {
                          className:
                            "flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
                          children: [
                            y.jsx("span", {
                              className: "sr-only",
                              children: "Open user menu",
                            }),
                            y.jsx("img", {
                              className: "h-9 w-9 rounded-full",
                              src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                              alt: "",
                            }),
                          ],
                        }),
                      }),
                      y.jsx(Ir, {
                        as: a.Fragment,
                        enter: "transition ease-out duration-200",
                        enterFrom: "transform opacity-0 scale-95",
                        enterTo: "transform opacity-100 scale-100",
                        leave: "transition ease-in duration-75",
                        leaveFrom: "transform opacity-100 scale-100",
                        leaveTo: "transform opacity-0 scale-95",
                        children: y.jsxs(U.Items, {
                          className:
                            "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                          children: [
                            y.jsx(U.Item, {
                              children: ({ active: t }) =>
                                y.jsx("a", {
                                  href: "#",
                                  className: ve(
                                    t ? "bg-yellow-100" : "",
                                    "block px-4 py-2 text-sm text-yellow-700"
                                  ),
                                  children: "Your Profile",
                                }),
                            }),
                            y.jsx(U.Item, {
                              children: ({ active: t }) =>
                                y.jsx("a", {
                                  href: "#",
                                  className: ve(
                                    t ? "bg-yellow-100" : "",
                                    "block px-4 py-2 text-sm text-yellow-700"
                                  ),
                                  children: "Settings",
                                }),
                            }),
                            y.jsx(U.Item, {
                              children: ({ active: t }) =>
                                y.jsx("a", {
                                  href: "#",
                                  className: ve(
                                    t ? "bg-yellow-100" : "",
                                    "block px-4 py-2 text-sm text-yellow-700"
                                  ),
                                  children: "Sign out",
                                }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          y.jsx(Q.Panel, {
            className: "sm:hidden",
            children: y.jsxs("div", {
              className: "space-y-1 pb-4 pt-2",
              children: [
                y.jsx(Q.Button, {
                  as: "a",
                  href: "#",
                  className:
                    "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-yellow-500 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700",
                  children: "Classes",
                }),
                y.jsx(Q.Button, {
                  as: "a",
                  href: "#",
                  className:
                    "block border-l-4 border-yellow-500 bg-yellow-50 py-2 pl-3 pr-4 text-base font-medium text-yellow-700",
                  children: "Questions",
                }),
              ],
            }),
          }),
        ],
      }),
  });
}
export { Ar as default };
