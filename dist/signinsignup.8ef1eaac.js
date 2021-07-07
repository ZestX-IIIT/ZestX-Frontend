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
    Woji: [
      function (require, module, exports) {
        function e(e, t, s, a, n, l, o) {
          try {
            var r = e[l](o),
              i = r.value;
          } catch (c) {
            return void s(c);
          }
          r.done ? t(i) : Promise.resolve(i).then(a, n);
        }
        function t(t) {
          return function () {
            var s = this,
              a = arguments;
            return new Promise(function (n, l) {
              var o = t.apply(s, a);
              function r(t) {
                e(o, n, l, r, i, "next", t);
              }
              function i(t) {
                e(o, n, l, r, i, "throw", t);
              }
              r(void 0);
            });
          };
        }
        var s,
          a = document.getElementById("signup"),
          n = document.getElementById("signin"),
          l = document.getElementById("signincontainer"),
          o = document.getElementById("signupcontainer"),
          r = document.getElementById("sign-up-msg-container-sign-in-up-page"),
          i = document.getElementById("signupButton"),
          c = document.getElementById("signinButton"),
          d = document.getElementById("forgot_password"),
          g = document.getElementById("preloader_container"),
          u = document.getElementById("bg1"),
          p = document.getElementById("bg2"),
          y = document.getElementById("bg3"),
          m = document.getElementById("bg4"),
          h = window.location.hash.substring(1),
          f = Date.now(),
          b = "https://whispering-ridge-40670.herokuapp.com";
        function v() {
          c.addEventListener(
            "click",
            t(
              regeneratorRuntime.mark(function e() {
                var t, a, n, l, o, r, i;
                return regeneratorRuntime.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((t = document.getElementById("signinemail").value),
                            (a =
                              document.getElementById("signinpassword").value),
                            t && a)
                          ) {
                            e.next = 4;
                            break;
                          }
                          return e.abrupt(
                            "return",
                            L(2, "Please fill all the details properly!")
                          );
                        case 4:
                          if (w(t)) {
                            e.next = 6;
                            break;
                          }
                          return e.abrupt(
                            "return",
                            L(2, "Please Enter a valid email!")
                          );
                        case 6:
                          return (
                            (g.style.display = "block"),
                            (e.prev = 7),
                            (e.next = 10),
                            fetch("".concat(b, "/auth/signin"), {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: t, password: a }),
                            })
                          );
                        case 10:
                          return (n = e.sent), (e.next = 13), n.json();
                        case 13:
                          if (((l = e.sent), 400 != n.status)) {
                            e.next = 19;
                            break;
                          }
                          L(2, "User does not exists, Please sign up!"),
                            (g.style.display = "none"),
                            (e.next = 44);
                          break;
                        case 19:
                          if (404 != n.status) {
                            e.next = 24;
                            break;
                          }
                          L(2, "Please Enter a valid email!"),
                            (g.style.display = "none"),
                            (e.next = 44);
                          break;
                        case 24:
                          if (444 != n.status) {
                            e.next = 29;
                            break;
                          }
                          L(2, "PLease Enter valid password!"),
                            (g.style.display = "none"),
                            (e.next = 44);
                          break;
                        case 29:
                          if (500 != n.status) {
                            e.next = 34;
                            break;
                          }
                          L(0, "Internal server error please re-try!"),
                            (g.style.display = "none"),
                            (e.next = 44);
                          break;
                        case 34:
                          return (
                            (o = l.token),
                            localStorage.setItem("jwt", o),
                            (e.next = 38),
                            fetch("".concat(b, "/user/getdetails"), {
                              method: "GET",
                              headers: { authorization: o },
                            })
                          );
                        case 38:
                          return (r = e.sent), (e.next = 41), r.json();
                        case 41:
                          (i = e.sent),
                            (s = i.data).is_admin
                              ? (window.location.href =
                                  "./general/admin_main_page.html")
                              : (window.location.href = "./homepage.html");
                        case 44:
                          e.next = 50;
                          break;
                        case 46:
                          (e.prev = 46),
                            (e.t0 = e.catch(7)),
                            L(0, "Internal server error please re-try!"),
                            (g.style.display = "none");
                        case 50:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[7, 46]]
                );
              })
            )
          ),
            i.addEventListener(
              "click",
              (function () {
                var e = t(
                  regeneratorRuntime.mark(function e(t) {
                    var s, a, n, l, o, i, c, d, u;
                    return regeneratorRuntime.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (
                              (t.preventDefault(),
                              (s =
                                document.getElementById("signupemail").value),
                              (a = document.getElementById("name").value),
                              (n =
                                document.getElementById(
                                  "signuppassword"
                                ).value),
                              (l = document.getElementById("mobile").value),
                              (o = document.getElementById("confirm").value),
                              s && n && a && l)
                            ) {
                              e.next = 8;
                              break;
                            }
                            return e.abrupt(
                              "return",
                              L(2, "Please fill all the details properly!")
                            );
                          case 8:
                            if (w(s)) {
                              e.next = 10;
                              break;
                            }
                            return e.abrupt(
                              "return",
                              L(2, "Please Enter a valid email!")
                            );
                          case 10:
                            if (10 == l.length) {
                              e.next = 12;
                              break;
                            }
                            return e.abrupt(
                              "return",
                              L(2, "Mobile no. should be of 10 length!")
                            );
                          case 12:
                            if (n == o) {
                              e.next = 14;
                              break;
                            }
                            return e.abrupt(
                              "return",
                              L(
                                2,
                                "Passwords not matched with confirm password!"
                              )
                            );
                          case 14:
                            if ((i = k(n))[0]) {
                              e.next = 17;
                              break;
                            }
                            return e.abrupt("return", L(2, "".concat(i[1])));
                          case 17:
                            return (
                              (g.style.display = "block"),
                              (e.next = 20),
                              fetch("".concat(b, "/auth/signup"), {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  user_name: a,
                                  email: s,
                                  password: n,
                                  mobile: l,
                                }),
                              })
                            );
                          case 20:
                            return (c = e.sent), (e.next = 23), c.json();
                          case 23:
                            (d = e.sent),
                              400 == c.status
                                ? (L(2, "User already exists, Please sign in!"),
                                  (g.style.display = "none"))
                                : 404 == c.status
                                ? (L(2, "Please Enter a valid email!"),
                                  (g.style.display = "none"))
                                : 444 == c.status
                                ? (L(2, "".concat(d.error)),
                                  (g.style.display = "none"))
                                : 500 == c.status
                                ? (L(0, "Internal server error please re-try!"),
                                  (g.style.display = "none"))
                                : ((u = d.data),
                                  localStorage.setItem("jwt", u),
                                  console.log("hehe"),
                                  (r.style.display = "flex"));
                          case 25:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()
            ),
            d.addEventListener(
              "click",
              t(
                regeneratorRuntime.mark(function e() {
                  var t, s;
                  return regeneratorRuntime.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (g.style.display = "block"),
                            (t = document.getElementById("signinemail").value),
                            (e.next = 4),
                            fetch("".concat(b, "/auth/forgotpasswordsignin"), {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: t }),
                            })
                          );
                        case 4:
                          400 == (s = e.sent).status
                            ? ((g.style.display = "none"),
                              L(2, "Please enter registered email-id!"))
                            : 404 == s.status
                            ? (L(2, "Please Enter a valid email!"),
                              (g.style.display = "none"))
                            : 500 == s.status
                            ? ((g.style.display = "none"),
                              L(0, "Error occured re-try!"),
                              console.log(err))
                            : ((g.style.display = "none"),
                              L(
                                1,
                                "Link to reset password has been sent to your email-id!"
                              ));
                        case 6:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            "signin" == h &&
              (l.classList.toggle("display-class"),
              l.classList.toggle("opacity-class"),
              o.classList.toggle("opacity-class"),
              o.classList.toggle("display-class"),
              u.classList.toggle("opacity-class"),
              p.classList.toggle("opacity-class"),
              y.classList.toggle("opacity-class"),
              m.classList.toggle("opacity-class"),
              u.classList.toggle("display-class"),
              p.classList.toggle("display-class"),
              y.classList.toggle("display-class"),
              m.classList.toggle("display-class")),
            n.addEventListener("click", function () {
              o.classList.toggle("opacity-class"),
                l.classList.toggle("opacity-class"),
                o.classList.toggle("display-class"),
                l.classList.toggle("display-class"),
                u.classList.toggle("opacity-class"),
                p.classList.toggle("opacity-class"),
                y.classList.toggle("opacity-class"),
                m.classList.toggle("opacity-class"),
                u.classList.toggle("display-class"),
                p.classList.toggle("display-class"),
                y.classList.toggle("display-class"),
                m.classList.toggle("display-class");
            }),
            a.addEventListener("click", function () {
              o.classList.toggle("opacity-class"),
                l.classList.toggle("opacity-class"),
                o.classList.toggle("display-class"),
                l.classList.toggle("display-class"),
                u.classList.toggle("opacity-class"),
                p.classList.toggle("opacity-class"),
                y.classList.toggle("opacity-class"),
                m.classList.toggle("opacity-class"),
                u.classList.toggle("display-class"),
                p.classList.toggle("display-class"),
                y.classList.toggle("display-class"),
                m.classList.toggle("display-class");
            }),
            (g.style.display = "none"),
            AOS.init({ easing: "ease-in-out", once: !0, duration: 600 });
        }
        function L(e, t) {
          if (Date.now() - f > 5e3) {
            var s = document.getElementById("toastAlertMessage"),
              a = document.getElementById("toastImage"),
              n = document.getElementById("toastFrontMessage"),
              l = document.getElementById("toastDescriptionMessage"),
              o = t.length + 7;
            document
              .getElementById("toastAlertMessage")
              .style.setProperty("--foo", "".concat(o, "ch")),
              1 == e
                ? ((a.src = "../assets/_general/success_tick.svg"),
                  (n.style.backgroundColor = "green"))
                : 0 == e
                ? ((a.src = "../assets/_general/error_cross.svg"),
                  (n.style.backgroundColor = "red"))
                : ((a.src = "../assets/_general/neutral_exclamation.svg"),
                  (n.style.backgroundColor = "black")),
              (l.innerText = " "),
              setTimeout(function () {
                l.innerText = t;
              }, 600),
              setTimeout(function () {
                l.innerText = " ";
              }, 4200),
              (s.className = "toastPopUp"),
              setTimeout(function () {
                s.className = s.className.replace("toastPopUp", "");
              }, 5e3),
              (f = Date.now());
          } else
            setTimeout(function () {
              L(e, t);
            }, 5500 - (Date.now() - f));
        }
        function w(e) {
          return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            e
          );
        }
        setTimeout(function () {
          v();
        }, 200);
        var E = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        function k(e) {
          return e.length < 6
            ? [!1, "Password should be minimum of 6 length!"]
            : e.length > 20
            ? [!1, "Password should be maximum of 20 length!"]
            : e.search(/[A-Z]/) < 0
            ? [!1, "Password should contain atleast 1 uppercase letter!"]
            : e.search(/[a-z]/) < 0
            ? [!1, "Password should contain atleast 1 lowercase letter!"]
            : e.search(/[0-9]/) < 0
            ? [!1, "Password should contain atleast 1 digit!"]
            : -1 != e.search(" ")
            ? [!1, "Password should not contain any spaces!"]
            : E.test(e)
            ? [!0, "Success"]
            : [!1, "Password should contain atleast 1 special character!"];
        }
      },
      {},
    ],
  },
  {},
  ["Woji"],
  null
);
//# sourceMappingURL=/signinsignup.8ef1eaac.js.map
