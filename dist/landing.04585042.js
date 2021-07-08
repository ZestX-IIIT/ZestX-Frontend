parcelRequire = (function (e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    sYa0: [
      function (require, module, exports) {
        var t = document.getElementById("signupbutton"),
          e = document.getElementById("signin"),
          n = document.getElementsByClassName("footer"),
          s = document.getElementById("preloader_container"),
          o = document.getElementsByClassName("arrow"),
          i = document.getElementsByClassName("main"),
          l = "https://whispering-ridge-40670.herokuapp.com",
          a = !0;
        function c() {
          t.addEventListener("click", function () {
            y(), (window.location.href = "./signupsignin.html#signup");
          }),
            e.addEventListener("click", function () {
              y(), (window.location.href = "./signupsignin.html#signin");
            }),
            o[0].addEventListener("click", function () {
              r();
            }),
            (window.onkeydown = function (t) {
              27 === t.keyCode ? a || d() : 70 === t.keyCode && r();
            }),
            u(),
            setTimeout(function () {
              AOS.init({ easing: "ease-in-out", duration: 600, once: !0 });
            }, 100);
        }
        function r() {
          a ? g() : d();
        }
        function d() {
          (a = !0),
            i[0].classList.toggle("main-opacity"),
            o[0].classList.toggle("rotate_footer_arrow_2"),
            o[0].classList.toggle("rotate_footer_arrow"),
            setTimeout(function () {
              o[0].classList.toggle("scale");
            }, 700);
          var t = 275,
            e = setInterval(function () {
              (t -= 5),
                scrollBy(0, -5),
                t <= 0 &&
                  (clearInterval(e), n[0].classList.toggle("display-none"));
            }, 8);
        }
        function g() {
          (a = !1),
            i[0].classList.toggle("main-opacity"),
            o[0].classList.toggle("rotate_footer_arrow"),
            o[0].classList.toggle("rotate_footer_arrow_2"),
            o[0].classList.toggle("scale"),
            n[0].classList.toggle("display-none");
          var t = 275,
            e = setInterval(function () {
              (t -= 5), scrollBy(0, 5), t <= 0 && clearInterval(e);
            }, 8);
        }
        function u() {
          f(i[0]), m(s);
        }
        function y() {
          m(i[0]), f(s);
        }
        function m(t) {
          t.classList.contains("display_to_block") &&
            t.classList.remove("display_to_block"),
            t.classList.add("display_to_none"),
            "none" != t.style.display &&
              (t.classList.add("display_to_none"),
              setTimeout(function () {
                (t.style.display = "none"), (t.style.opacity = 0);
              }, 500));
        }
        function f(t) {
          t == n[0] ? (t.style.display = "flex") : (t.style.display = "block"),
            (t.style.opacity = 1),
            t.classList.contains("display_to_none") &&
              t.classList.remove("display_to_none"),
            t.classList.add("display_to_block");
        }
        setTimeout(function () {
          c();
        }, 200);
      },
      {},
    ],
  },
  {},
  ["sYa0"],
  null
);
//# sourceMappingURL=/landing.04585042.js.map
