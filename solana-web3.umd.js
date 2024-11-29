!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.solanaWeb3 = e())
    : (t.solanaWeb3 = e());
})(self, () =>
  (() => {
    var t = {
        601: (t, e, r) => {
          "use strict";
          (e.I0 = e.DH = e.NX = e.u8 = e.cY = void 0),
            (e.av = e.O6 = e.w3 = e.Wg = void 0);
          const n = r(287);
          function i(t) {
            if (!(t instanceof Uint8Array))
              throw new TypeError("b must be a Uint8Array");
          }
          function o(t) {
            return i(t), n.Buffer.from(t.buffer, t.byteOffset, t.length);
          }
          class s {
            constructor(t, e) {
              if (!Number.isInteger(t))
                throw new TypeError("span must be an integer");
              (this.span = t), (this.property = e);
            }
            makeDestinationObject() {
              return {};
            }
            getSpan(t, e) {
              if (0 > this.span) throw new RangeError("indeterminate span");
              return this.span;
            }
            replicate(t) {
              const e = Object.create(this.constructor.prototype);
              return Object.assign(e, this), (e.property = t), e;
            }
            fromArray(t) {}
          }
          function a(t, e) {
            return e.property ? t + "[" + e.property + "]" : t;
          }
          class c extends s {
            isCount() {
              throw new Error("ExternalLayout is abstract");
            }
          }
          class u extends c {
            constructor(t, e = 0, r) {
              if (!(t instanceof s))
                throw new TypeError("layout must be a Layout");
              if (!Number.isInteger(e))
                throw new TypeError("offset must be integer or undefined");
              super(t.span, r || t.property),
                (this.layout = t),
                (this.offset = e);
            }
            isCount() {
              return this.layout instanceof h || this.layout instanceof l;
            }
            decode(t, e = 0) {
              return this.layout.decode(t, e + this.offset);
            }
            encode(t, e, r = 0) {
              return this.layout.encode(t, e, r + this.offset);
            }
          }
          class h extends s {
            constructor(t, e) {
              if ((super(t, e), 6 < this.span))
                throw new RangeError("span must not exceed 6 bytes");
            }
            decode(t, e = 0) {
              return o(t).readUIntLE(e, this.span);
            }
            encode(t, e, r = 0) {
              return o(e).writeUIntLE(t, r, this.span), this.span;
            }
          }
          class l extends s {
            constructor(t, e) {
              if ((super(t, e), 6 < this.span))
                throw new RangeError("span must not exceed 6 bytes");
            }
            decode(t, e = 0) {
              return o(t).readUIntBE(e, this.span);
            }
            encode(t, e, r = 0) {
              return o(e).writeUIntBE(t, r, this.span), this.span;
            }
          }
          const d = Math.pow(2, 32);
          function f(t) {
            const e = Math.floor(t / d);
            return { hi32: e, lo32: t - e * d };
          }
          function p(t, e) {
            return t * d + e;
          }
          class g extends s {
            constructor(t) {
              super(8, t);
            }
            decode(t, e = 0) {
              const r = o(t),
                n = r.readUInt32LE(e);
              return p(r.readUInt32LE(e + 4), n);
            }
            encode(t, e, r = 0) {
              const n = f(t),
                i = o(e);
              return (
                i.writeUInt32LE(n.lo32, r), i.writeUInt32LE(n.hi32, r + 4), 8
              );
            }
          }
          class m extends s {
            constructor(t) {
              super(8, t);
            }
            decode(t, e = 0) {
              const r = o(t),
                n = r.readUInt32LE(e);
              return p(r.readInt32LE(e + 4), n);
            }
            encode(t, e, r = 0) {
              const n = f(t),
                i = o(e);
              return (
                i.writeUInt32LE(n.lo32, r), i.writeInt32LE(n.hi32, r + 4), 8
              );
            }
          }
          class y extends s {
            constructor(t, e, r) {
              if (!(t instanceof s))
                throw new TypeError("elementLayout must be a Layout");
              if (
                !(
                  (e instanceof c && e.isCount()) ||
                  (Number.isInteger(e) && 0 <= e)
                )
              )
                throw new TypeError(
                  "count must be non-negative integer or an unsigned integer ExternalLayout"
                );
              let n = -1;
              !(e instanceof c) && 0 < t.span && (n = e * t.span),
                super(n, r),
                (this.elementLayout = t),
                (this.count = e);
            }
            getSpan(t, e = 0) {
              if (0 <= this.span) return this.span;
              let r = 0,
                n = this.count;
              if (
                (n instanceof c && (n = n.decode(t, e)),
                0 < this.elementLayout.span)
              )
                r = n * this.elementLayout.span;
              else {
                let i = 0;
                for (; i < n; )
                  (r += this.elementLayout.getSpan(t, e + r)), ++i;
              }
              return r;
            }
            decode(t, e = 0) {
              const r = [];
              let n = 0,
                i = this.count;
              for (i instanceof c && (i = i.decode(t, e)); n < i; )
                r.push(this.elementLayout.decode(t, e)),
                  (e += this.elementLayout.getSpan(t, e)),
                  (n += 1);
              return r;
            }
            encode(t, e, r = 0) {
              const n = this.elementLayout,
                i = t.reduce((t, i) => t + n.encode(i, e, r + t), 0);
              return (
                this.count instanceof c && this.count.encode(t.length, e, r), i
              );
            }
          }
          class b extends s {
            constructor(t, e, r) {
              if (
                !Array.isArray(t) ||
                !t.reduce((t, e) => t && e instanceof s, !0)
              )
                throw new TypeError("fields must be array of Layout instances");
              "boolean" == typeof e && void 0 === r && ((r = e), (e = void 0));
              for (const e of t)
                if (0 > e.span && void 0 === e.property)
                  throw new Error(
                    "fields cannot contain unnamed variable-length layout"
                  );
              let n = -1;
              try {
                n = t.reduce((t, e) => t + e.getSpan(), 0);
              } catch (t) {}
              super(n, e), (this.fields = t), (this.decodePrefixes = !!r);
            }
            getSpan(t, e = 0) {
              if (0 <= this.span) return this.span;
              let r = 0;
              try {
                r = this.fields.reduce((r, n) => {
                  const i = n.getSpan(t, e);
                  return (e += i), r + i;
                }, 0);
              } catch (t) {
                throw new RangeError("indeterminate span");
              }
              return r;
            }
            decode(t, e = 0) {
              i(t);
              const r = this.makeDestinationObject();
              for (const n of this.fields)
                if (
                  (void 0 !== n.property && (r[n.property] = n.decode(t, e)),
                  (e += n.getSpan(t, e)),
                  this.decodePrefixes && t.length === e)
                )
                  break;
              return r;
            }
            encode(t, e, r = 0) {
              const n = r;
              let i = 0,
                o = 0;
              for (const n of this.fields) {
                let s = n.span;
                if (((o = 0 < s ? s : 0), void 0 !== n.property)) {
                  const i = t[n.property];
                  void 0 !== i &&
                    ((o = n.encode(i, e, r)), 0 > s && (s = n.getSpan(e, r)));
                }
                (i = r), (r += s);
              }
              return i + o - n;
            }
            fromArray(t) {
              const e = this.makeDestinationObject();
              for (const r of this.fields)
                void 0 !== r.property &&
                  0 < t.length &&
                  (e[r.property] = t.shift());
              return e;
            }
            layoutFor(t) {
              if ("string" != typeof t)
                throw new TypeError("property must be string");
              for (const e of this.fields) if (e.property === t) return e;
            }
            offsetOf(t) {
              if ("string" != typeof t)
                throw new TypeError("property must be string");
              let e = 0;
              for (const r of this.fields) {
                if (r.property === t) return e;
                0 > r.span ? (e = -1) : 0 <= e && (e += r.span);
              }
            }
          }
          class w extends s {
            constructor(t, e) {
              if (
                !(
                  (t instanceof c && t.isCount()) ||
                  (Number.isInteger(t) && 0 <= t)
                )
              )
                throw new TypeError(
                  "length must be positive integer or an unsigned integer ExternalLayout"
                );
              let r = -1;
              t instanceof c || (r = t), super(r, e), (this.length = t);
            }
            getSpan(t, e) {
              let r = this.span;
              return 0 > r && (r = this.length.decode(t, e)), r;
            }
            decode(t, e = 0) {
              let r = this.span;
              return (
                0 > r && (r = this.length.decode(t, e)), o(t).slice(e, e + r)
              );
            }
            encode(t, e, r) {
              let n = this.length;
              if (
                (this.length instanceof c && (n = t.length),
                !(t instanceof Uint8Array && n === t.length))
              )
                throw new TypeError(
                  a("Blob.encode", this) +
                    " requires (length " +
                    n +
                    ") Uint8Array as src"
                );
              if (r + n > e.length)
                throw new RangeError("encoding overruns Uint8Array");
              const i = o(t);
              return (
                o(e).write(i.toString("hex"), r, n, "hex"),
                this.length instanceof c && this.length.encode(n, e, r),
                n
              );
            }
          }
          (e.cY = (t, e, r) => new u(t, e, r)),
            (e.u8 = (t) => new h(1, t)),
            (e.NX = (t) => new h(2, t)),
            (e.DH = (t) => new h(4, t)),
            (e.I0 = (t) => new g(t)),
            (e.Wg = (t) => new m(t)),
            (e.w3 = (t, e, r) => new b(t, e, r)),
            (e.O6 = (t, e, r) => new y(t, e, r)),
            (e.av = (t, e) => new w(t, e));
        },
        364: (t, e, r) => {
          "use strict";
          var n = r(861).Buffer;
          t.exports = function (t) {
            if (t.length >= 255) throw new TypeError("Alphabet too long");
            for (var e = new Uint8Array(256), r = 0; r < e.length; r++)
              e[r] = 255;
            for (var i = 0; i < t.length; i++) {
              var o = t.charAt(i),
                s = o.charCodeAt(0);
              if (255 !== e[s]) throw new TypeError(o + " is ambiguous");
              e[s] = i;
            }
            var a = t.length,
              c = t.charAt(0),
              u = Math.log(a) / Math.log(256),
              h = Math.log(256) / Math.log(a);
            function l(t) {
              if ("string" != typeof t) throw new TypeError("Expected String");
              if (0 === t.length) return n.alloc(0);
              for (var r = 0, i = 0, o = 0; t[r] === c; ) i++, r++;
              for (
                var s = ((t.length - r) * u + 1) >>> 0, h = new Uint8Array(s);
                r < t.length;

              ) {
                var l = e[t.charCodeAt(r)];
                if (255 === l) return;
                for (
                  var d = 0, f = s - 1;
                  (0 !== l || d < o) && -1 !== f;
                  f--, d++
                )
                  (l += (a * h[f]) >>> 0),
                    (h[f] = l % 256 >>> 0),
                    (l = (l / 256) >>> 0);
                if (0 !== l) throw new Error("Non-zero carry");
                (o = d), r++;
              }
              for (var p = s - o; p !== s && 0 === h[p]; ) p++;
              var g = n.allocUnsafe(i + (s - p));
              g.fill(0, 0, i);
              for (var m = i; p !== s; ) g[m++] = h[p++];
              return g;
            }
            return {
              encode: function (e) {
                if (
                  ((Array.isArray(e) || e instanceof Uint8Array) &&
                    (e = n.from(e)),
                  !n.isBuffer(e))
                )
                  throw new TypeError("Expected Buffer");
                if (0 === e.length) return "";
                for (
                  var r = 0, i = 0, o = 0, s = e.length;
                  o !== s && 0 === e[o];

                )
                  o++, r++;
                for (
                  var u = ((s - o) * h + 1) >>> 0, l = new Uint8Array(u);
                  o !== s;

                ) {
                  for (
                    var d = e[o], f = 0, p = u - 1;
                    (0 !== d || f < i) && -1 !== p;
                    p--, f++
                  )
                    (d += (256 * l[p]) >>> 0),
                      (l[p] = d % a >>> 0),
                      (d = (d / a) >>> 0);
                  if (0 !== d) throw new Error("Non-zero carry");
                  (i = f), o++;
                }
                for (var g = u - i; g !== u && 0 === l[g]; ) g++;
                for (var m = c.repeat(r); g < u; ++g) m += t.charAt(l[g]);
                return m;
              },
              decodeUnsafe: l,
              decode: function (t) {
                var e = l(t);
                if (e) return e;
                throw new Error("Non-base" + a + " character");
              },
            };
          };
        },
        526: (t, e) => {
          "use strict";
          (e.byteLength = function (t) {
            var e = a(t),
              r = e[0],
              n = e[1];
            return (3 * (r + n)) / 4 - n;
          }),
            (e.toByteArray = function (t) {
              var e,
                r,
                o = a(t),
                s = o[0],
                c = o[1],
                u = new i(
                  (function (t, e, r) {
                    return (3 * (e + r)) / 4 - r;
                  })(0, s, c)
                ),
                h = 0,
                l = c > 0 ? s - 4 : s;
              for (r = 0; r < l; r += 4)
                (e =
                  (n[t.charCodeAt(r)] << 18) |
                  (n[t.charCodeAt(r + 1)] << 12) |
                  (n[t.charCodeAt(r + 2)] << 6) |
                  n[t.charCodeAt(r + 3)]),
                  (u[h++] = (e >> 16) & 255),
                  (u[h++] = (e >> 8) & 255),
                  (u[h++] = 255 & e);
              return (
                2 === c &&
                  ((e =
                    (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)),
                  (u[h++] = 255 & e)),
                1 === c &&
                  ((e =
                    (n[t.charCodeAt(r)] << 10) |
                    (n[t.charCodeAt(r + 1)] << 4) |
                    (n[t.charCodeAt(r + 2)] >> 2)),
                  (u[h++] = (e >> 8) & 255),
                  (u[h++] = 255 & e)),
                u
              );
            }),
            (e.fromByteArray = function (t) {
              for (
                var e,
                  n = t.length,
                  i = n % 3,
                  o = [],
                  s = 16383,
                  a = 0,
                  u = n - i;
                a < u;
                a += s
              )
                o.push(c(t, a, a + s > u ? u : a + s));
              return (
                1 === i
                  ? ((e = t[n - 1]),
                    o.push(r[e >> 2] + r[(e << 4) & 63] + "=="))
                  : 2 === i &&
                    ((e = (t[n - 2] << 8) + t[n - 1]),
                    o.push(
                      r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + "="
                    )),
                o.join("")
              );
            });
          for (
            var r = [],
              n = [],
              i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
              o =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              s = 0;
            s < 64;
            ++s
          )
            (r[s] = o[s]), (n[o.charCodeAt(s)] = s);
          function a(t) {
            var e = t.length;
            if (e % 4 > 0)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var r = t.indexOf("=");
            return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
          }
          function c(t, e, n) {
            for (var i, o, s = [], a = e; a < n; a += 3)
              (i =
                ((t[a] << 16) & 16711680) +
                ((t[a + 1] << 8) & 65280) +
                (255 & t[a + 2])),
                s.push(
                  r[((o = i) >> 18) & 63] +
                    r[(o >> 12) & 63] +
                    r[(o >> 6) & 63] +
                    r[63 & o]
                );
            return s.join("");
          }
          (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
        },
        184: (t, e) => {
          "use strict";
          (e.k5 = function (t) {
            {
              const e = Buffer.from(t);
              e.reverse();
              const r = e.toString("hex");
              return 0 === r.length ? BigInt(0) : BigInt(`0x${r}`);
            }
          }),
            (e.Bq = function (t, e) {
              {
                const r = t.toString(16),
                  n = Buffer.from(
                    r.padStart(2 * e, "0").slice(0, 2 * e),
                    "hex"
                  );
                return n.reverse(), n;
              }
            });
        },
        404: function (t, e, r) {
          !(function (t, e) {
            "use strict";
            function n(t, e) {
              if (!t) throw new Error(e || "Assertion failed");
            }
            function i(t, e) {
              t.super_ = e;
              var r = function () {};
              (r.prototype = e.prototype),
                (t.prototype = new r()),
                (t.prototype.constructor = t);
            }
            function o(t, e, r) {
              if (o.isBN(t)) return t;
              (this.negative = 0),
                (this.words = null),
                (this.length = 0),
                (this.red = null),
                null !== t &&
                  (("le" !== e && "be" !== e) || ((r = e), (e = 10)),
                  this._init(t || 0, e || 10, r || "be"));
            }
            var s;
            "object" == typeof t ? (t.exports = o) : (e.BN = o),
              (o.BN = o),
              (o.wordSize = 26);
            try {
              s =
                "undefined" != typeof window && void 0 !== window.Buffer
                  ? window.Buffer
                  : r(790).Buffer;
            } catch (t) {}
            function a(t, e) {
              var r = t.charCodeAt(e);
              return r >= 48 && r <= 57
                ? r - 48
                : r >= 65 && r <= 70
                ? r - 55
                : r >= 97 && r <= 102
                ? r - 87
                : void n(!1, "Invalid character in " + t);
            }
            function c(t, e, r) {
              var n = a(t, r);
              return r - 1 >= e && (n |= a(t, r - 1) << 4), n;
            }
            function u(t, e, r, i) {
              for (
                var o = 0, s = 0, a = Math.min(t.length, r), c = e;
                c < a;
                c++
              ) {
                var u = t.charCodeAt(c) - 48;
                (o *= i),
                  (s = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u),
                  n(u >= 0 && s < i, "Invalid character"),
                  (o += s);
              }
              return o;
            }
            function h(t, e) {
              (t.words = e.words),
                (t.length = e.length),
                (t.negative = e.negative),
                (t.red = e.red);
            }
            if (
              ((o.isBN = function (t) {
                return (
                  t instanceof o ||
                  (null !== t &&
                    "object" == typeof t &&
                    t.constructor.wordSize === o.wordSize &&
                    Array.isArray(t.words))
                );
              }),
              (o.max = function (t, e) {
                return t.cmp(e) > 0 ? t : e;
              }),
              (o.min = function (t, e) {
                return t.cmp(e) < 0 ? t : e;
              }),
              (o.prototype._init = function (t, e, r) {
                if ("number" == typeof t) return this._initNumber(t, e, r);
                if ("object" == typeof t) return this._initArray(t, e, r);
                "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
                var i = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
                  (i++, (this.negative = 1)),
                  i < t.length &&
                    (16 === e
                      ? this._parseHex(t, i, r)
                      : (this._parseBase(t, e, i),
                        "le" === r && this._initArray(this.toArray(), e, r)));
              }),
              (o.prototype._initNumber = function (t, e, r) {
                t < 0 && ((this.negative = 1), (t = -t)),
                  t < 67108864
                    ? ((this.words = [67108863 & t]), (this.length = 1))
                    : t < 4503599627370496
                    ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                      (this.length = 2))
                    : (n(t < 9007199254740992),
                      (this.words = [
                        67108863 & t,
                        (t / 67108864) & 67108863,
                        1,
                      ]),
                      (this.length = 3)),
                  "le" === r && this._initArray(this.toArray(), e, r);
              }),
              (o.prototype._initArray = function (t, e, r) {
                if ((n("number" == typeof t.length), t.length <= 0))
                  return (this.words = [0]), (this.length = 1), this;
                (this.length = Math.ceil(t.length / 3)),
                  (this.words = new Array(this.length));
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var o,
                  s,
                  a = 0;
                if ("be" === r)
                  for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                    (s = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                      (this.words[o] |= (s << a) & 67108863),
                      (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                      (a += 24) >= 26 && ((a -= 26), o++);
                else if ("le" === r)
                  for (i = 0, o = 0; i < t.length; i += 3)
                    (s = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                      (this.words[o] |= (s << a) & 67108863),
                      (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                      (a += 24) >= 26 && ((a -= 26), o++);
                return this._strip();
              }),
              (o.prototype._parseHex = function (t, e, r) {
                (this.length = Math.ceil((t.length - e) / 6)),
                  (this.words = new Array(this.length));
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var i,
                  o = 0,
                  s = 0;
                if ("be" === r)
                  for (n = t.length - 1; n >= e; n -= 2)
                    (i = c(t, e, n) << o),
                      (this.words[s] |= 67108863 & i),
                      o >= 18
                        ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26))
                        : (o += 8);
                else
                  for (
                    n = (t.length - e) % 2 == 0 ? e + 1 : e;
                    n < t.length;
                    n += 2
                  )
                    (i = c(t, e, n) << o),
                      (this.words[s] |= 67108863 & i),
                      o >= 18
                        ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26))
                        : (o += 8);
                this._strip();
              }),
              (o.prototype._parseBase = function (t, e, r) {
                (this.words = [0]), (this.length = 1);
                for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
                n--, (i = (i / e) | 0);
                for (
                  var o = t.length - r,
                    s = o % n,
                    a = Math.min(o, o - s) + r,
                    c = 0,
                    h = r;
                  h < a;
                  h += n
                )
                  (c = u(t, h, h + n, e)),
                    this.imuln(i),
                    this.words[0] + c < 67108864
                      ? (this.words[0] += c)
                      : this._iaddn(c);
                if (0 !== s) {
                  var l = 1;
                  for (c = u(t, h, t.length, e), h = 0; h < s; h++) l *= e;
                  this.imuln(l),
                    this.words[0] + c < 67108864
                      ? (this.words[0] += c)
                      : this._iaddn(c);
                }
                this._strip();
              }),
              (o.prototype.copy = function (t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++)
                  t.words[e] = this.words[e];
                (t.length = this.length),
                  (t.negative = this.negative),
                  (t.red = this.red);
              }),
              (o.prototype._move = function (t) {
                h(t, this);
              }),
              (o.prototype.clone = function () {
                var t = new o(null);
                return this.copy(t), t;
              }),
              (o.prototype._expand = function (t) {
                for (; this.length < t; ) this.words[this.length++] = 0;
                return this;
              }),
              (o.prototype._strip = function () {
                for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                  this.length--;
                return this._normSign();
              }),
              (o.prototype._normSign = function () {
                return (
                  1 === this.length &&
                    0 === this.words[0] &&
                    (this.negative = 0),
                  this
                );
              }),
              "undefined" != typeof Symbol && "function" == typeof Symbol.for)
            )
              try {
                o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l;
              } catch (t) {
                o.prototype.inspect = l;
              }
            else o.prototype.inspect = l;
            function l() {
              return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
            }
            var d = [
                "",
                "0",
                "00",
                "000",
                "0000",
                "00000",
                "000000",
                "0000000",
                "00000000",
                "000000000",
                "0000000000",
                "00000000000",
                "000000000000",
                "0000000000000",
                "00000000000000",
                "000000000000000",
                "0000000000000000",
                "00000000000000000",
                "000000000000000000",
                "0000000000000000000",
                "00000000000000000000",
                "000000000000000000000",
                "0000000000000000000000",
                "00000000000000000000000",
                "000000000000000000000000",
                "0000000000000000000000000",
              ],
              f = [
                0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
                6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
              ],
              p = [
                0, 0, 33554432, 43046721, 16777216, 48828125, 60466176,
                40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517,
                7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6,
                4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907,
                17210368, 20511149, 243e5, 28629151, 33554432, 39135393,
                45435424, 52521875, 60466176,
              ];
            function g(t, e, r) {
              r.negative = e.negative ^ t.negative;
              var n = (t.length + e.length) | 0;
              (r.length = n), (n = (n - 1) | 0);
              var i = 0 | t.words[0],
                o = 0 | e.words[0],
                s = i * o,
                a = 67108863 & s,
                c = (s / 67108864) | 0;
              r.words[0] = a;
              for (var u = 1; u < n; u++) {
                for (
                  var h = c >>> 26,
                    l = 67108863 & c,
                    d = Math.min(u, e.length - 1),
                    f = Math.max(0, u - t.length + 1);
                  f <= d;
                  f++
                ) {
                  var p = (u - f) | 0;
                  (h +=
                    ((s = (i = 0 | t.words[p]) * (o = 0 | e.words[f]) + l) /
                      67108864) |
                    0),
                    (l = 67108863 & s);
                }
                (r.words[u] = 0 | l), (c = 0 | h);
              }
              return 0 !== c ? (r.words[u] = 0 | c) : r.length--, r._strip();
            }
            (o.prototype.toString = function (t, e) {
              var r;
              if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
                r = "";
                for (var i = 0, o = 0, s = 0; s < this.length; s++) {
                  var a = this.words[s],
                    c = (16777215 & ((a << i) | o)).toString(16);
                  (o = (a >>> (24 - i)) & 16777215),
                    (i += 2) >= 26 && ((i -= 26), s--),
                    (r =
                      0 !== o || s !== this.length - 1
                        ? d[6 - c.length] + c + r
                        : c + r);
                }
                for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; )
                  r = "0" + r;
                return 0 !== this.negative && (r = "-" + r), r;
              }
              if (t === (0 | t) && t >= 2 && t <= 36) {
                var u = f[t],
                  h = p[t];
                r = "";
                var l = this.clone();
                for (l.negative = 0; !l.isZero(); ) {
                  var g = l.modrn(h).toString(t);
                  r = (l = l.idivn(h)).isZero()
                    ? g + r
                    : d[u - g.length] + g + r;
                }
                for (this.isZero() && (r = "0" + r); r.length % e != 0; )
                  r = "0" + r;
                return 0 !== this.negative && (r = "-" + r), r;
              }
              n(!1, "Base should be between 2 and 36");
            }),
              (o.prototype.toNumber = function () {
                var t = this.words[0];
                return (
                  2 === this.length
                    ? (t += 67108864 * this.words[1])
                    : 3 === this.length && 1 === this.words[2]
                    ? (t += 4503599627370496 + 67108864 * this.words[1])
                    : this.length > 2 &&
                      n(!1, "Number can only safely store up to 53 bits"),
                  0 !== this.negative ? -t : t
                );
              }),
              (o.prototype.toJSON = function () {
                return this.toString(16, 2);
              }),
              s &&
                (o.prototype.toBuffer = function (t, e) {
                  return this.toArrayLike(s, t, e);
                }),
              (o.prototype.toArray = function (t, e) {
                return this.toArrayLike(Array, t, e);
              }),
              (o.prototype.toArrayLike = function (t, e, r) {
                this._strip();
                var i = this.byteLength(),
                  o = r || Math.max(1, i);
                n(i <= o, "byte array longer than desired length"),
                  n(o > 0, "Requested array length <= 0");
                var s = (function (t, e) {
                  return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
                })(t, o);
                return (
                  this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i), s
                );
              }),
              (o.prototype._toArrayLikeLE = function (t, e) {
                for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
                  var s = (this.words[i] << o) | n;
                  (t[r++] = 255 & s),
                    r < t.length && (t[r++] = (s >> 8) & 255),
                    r < t.length && (t[r++] = (s >> 16) & 255),
                    6 === o
                      ? (r < t.length && (t[r++] = (s >> 24) & 255),
                        (n = 0),
                        (o = 0))
                      : ((n = s >>> 24), (o += 2));
                }
                if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
              }),
              (o.prototype._toArrayLikeBE = function (t, e) {
                for (
                  var r = t.length - 1, n = 0, i = 0, o = 0;
                  i < this.length;
                  i++
                ) {
                  var s = (this.words[i] << o) | n;
                  (t[r--] = 255 & s),
                    r >= 0 && (t[r--] = (s >> 8) & 255),
                    r >= 0 && (t[r--] = (s >> 16) & 255),
                    6 === o
                      ? (r >= 0 && (t[r--] = (s >> 24) & 255), (n = 0), (o = 0))
                      : ((n = s >>> 24), (o += 2));
                }
                if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
              }),
              Math.clz32
                ? (o.prototype._countBits = function (t) {
                    return 32 - Math.clz32(t);
                  })
                : (o.prototype._countBits = function (t) {
                    var e = t,
                      r = 0;
                    return (
                      e >= 4096 && ((r += 13), (e >>>= 13)),
                      e >= 64 && ((r += 7), (e >>>= 7)),
                      e >= 8 && ((r += 4), (e >>>= 4)),
                      e >= 2 && ((r += 2), (e >>>= 2)),
                      r + e
                    );
                  }),
              (o.prototype._zeroBits = function (t) {
                if (0 === t) return 26;
                var e = t,
                  r = 0;
                return (
                  8191 & e || ((r += 13), (e >>>= 13)),
                  127 & e || ((r += 7), (e >>>= 7)),
                  15 & e || ((r += 4), (e >>>= 4)),
                  3 & e || ((r += 2), (e >>>= 2)),
                  1 & e || r++,
                  r
                );
              }),
              (o.prototype.bitLength = function () {
                var t = this.words[this.length - 1],
                  e = this._countBits(t);
                return 26 * (this.length - 1) + e;
              }),
              (o.prototype.zeroBits = function () {
                if (this.isZero()) return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                  var r = this._zeroBits(this.words[e]);
                  if (((t += r), 26 !== r)) break;
                }
                return t;
              }),
              (o.prototype.byteLength = function () {
                return Math.ceil(this.bitLength() / 8);
              }),
              (o.prototype.toTwos = function (t) {
                return 0 !== this.negative
                  ? this.abs().inotn(t).iaddn(1)
                  : this.clone();
              }),
              (o.prototype.fromTwos = function (t) {
                return this.testn(t - 1)
                  ? this.notn(t).iaddn(1).ineg()
                  : this.clone();
              }),
              (o.prototype.isNeg = function () {
                return 0 !== this.negative;
              }),
              (o.prototype.neg = function () {
                return this.clone().ineg();
              }),
              (o.prototype.ineg = function () {
                return this.isZero() || (this.negative ^= 1), this;
              }),
              (o.prototype.iuor = function (t) {
                for (; this.length < t.length; ) this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++)
                  this.words[e] = this.words[e] | t.words[e];
                return this._strip();
              }),
              (o.prototype.ior = function (t) {
                return n(!(this.negative | t.negative)), this.iuor(t);
              }),
              (o.prototype.or = function (t) {
                return this.length > t.length
                  ? this.clone().ior(t)
                  : t.clone().ior(this);
              }),
              (o.prototype.uor = function (t) {
                return this.length > t.length
                  ? this.clone().iuor(t)
                  : t.clone().iuor(this);
              }),
              (o.prototype.iuand = function (t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var r = 0; r < e.length; r++)
                  this.words[r] = this.words[r] & t.words[r];
                return (this.length = e.length), this._strip();
              }),
              (o.prototype.iand = function (t) {
                return n(!(this.negative | t.negative)), this.iuand(t);
              }),
              (o.prototype.and = function (t) {
                return this.length > t.length
                  ? this.clone().iand(t)
                  : t.clone().iand(this);
              }),
              (o.prototype.uand = function (t) {
                return this.length > t.length
                  ? this.clone().iuand(t)
                  : t.clone().iuand(this);
              }),
              (o.prototype.iuxor = function (t) {
                var e, r;
                this.length > t.length
                  ? ((e = this), (r = t))
                  : ((e = t), (r = this));
                for (var n = 0; n < r.length; n++)
                  this.words[n] = e.words[n] ^ r.words[n];
                if (this !== e)
                  for (; n < e.length; n++) this.words[n] = e.words[n];
                return (this.length = e.length), this._strip();
              }),
              (o.prototype.ixor = function (t) {
                return n(!(this.negative | t.negative)), this.iuxor(t);
              }),
              (o.prototype.xor = function (t) {
                return this.length > t.length
                  ? this.clone().ixor(t)
                  : t.clone().ixor(this);
              }),
              (o.prototype.uxor = function (t) {
                return this.length > t.length
                  ? this.clone().iuxor(t)
                  : t.clone().iuxor(this);
              }),
              (o.prototype.inotn = function (t) {
                n("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26),
                  r = t % 26;
                this._expand(e), r > 0 && e--;
                for (var i = 0; i < e; i++)
                  this.words[i] = 67108863 & ~this.words[i];
                return (
                  r > 0 &&
                    (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))),
                  this._strip()
                );
              }),
              (o.prototype.notn = function (t) {
                return this.clone().inotn(t);
              }),
              (o.prototype.setn = function (t, e) {
                n("number" == typeof t && t >= 0);
                var r = (t / 26) | 0,
                  i = t % 26;
                return (
                  this._expand(r + 1),
                  (this.words[r] = e
                    ? this.words[r] | (1 << i)
                    : this.words[r] & ~(1 << i)),
                  this._strip()
                );
              }),
              (o.prototype.iadd = function (t) {
                var e, r, n;
                if (0 !== this.negative && 0 === t.negative)
                  return (
                    (this.negative = 0),
                    (e = this.isub(t)),
                    (this.negative ^= 1),
                    this._normSign()
                  );
                if (0 === this.negative && 0 !== t.negative)
                  return (
                    (t.negative = 0),
                    (e = this.isub(t)),
                    (t.negative = 1),
                    e._normSign()
                  );
                this.length > t.length
                  ? ((r = this), (n = t))
                  : ((r = t), (n = this));
                for (var i = 0, o = 0; o < n.length; o++)
                  (e = (0 | r.words[o]) + (0 | n.words[o]) + i),
                    (this.words[o] = 67108863 & e),
                    (i = e >>> 26);
                for (; 0 !== i && o < r.length; o++)
                  (e = (0 | r.words[o]) + i),
                    (this.words[o] = 67108863 & e),
                    (i = e >>> 26);
                if (((this.length = r.length), 0 !== i))
                  (this.words[this.length] = i), this.length++;
                else if (r !== this)
                  for (; o < r.length; o++) this.words[o] = r.words[o];
                return this;
              }),
              (o.prototype.add = function (t) {
                var e;
                return 0 !== t.negative && 0 === this.negative
                  ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                  : 0 === t.negative && 0 !== this.negative
                  ? ((this.negative = 0),
                    (e = t.sub(this)),
                    (this.negative = 1),
                    e)
                  : this.length > t.length
                  ? this.clone().iadd(t)
                  : t.clone().iadd(this);
              }),
              (o.prototype.isub = function (t) {
                if (0 !== t.negative) {
                  t.negative = 0;
                  var e = this.iadd(t);
                  return (t.negative = 1), e._normSign();
                }
                if (0 !== this.negative)
                  return (
                    (this.negative = 0),
                    this.iadd(t),
                    (this.negative = 1),
                    this._normSign()
                  );
                var r,
                  n,
                  i = this.cmp(t);
                if (0 === i)
                  return (
                    (this.negative = 0),
                    (this.length = 1),
                    (this.words[0] = 0),
                    this
                  );
                i > 0 ? ((r = this), (n = t)) : ((r = t), (n = this));
                for (var o = 0, s = 0; s < n.length; s++)
                  (o = (e = (0 | r.words[s]) - (0 | n.words[s]) + o) >> 26),
                    (this.words[s] = 67108863 & e);
                for (; 0 !== o && s < r.length; s++)
                  (o = (e = (0 | r.words[s]) + o) >> 26),
                    (this.words[s] = 67108863 & e);
                if (0 === o && s < r.length && r !== this)
                  for (; s < r.length; s++) this.words[s] = r.words[s];
                return (
                  (this.length = Math.max(this.length, s)),
                  r !== this && (this.negative = 1),
                  this._strip()
                );
              }),
              (o.prototype.sub = function (t) {
                return this.clone().isub(t);
              });
            var m = function (t, e, r) {
              var n,
                i,
                o,
                s = t.words,
                a = e.words,
                c = r.words,
                u = 0,
                h = 0 | s[0],
                l = 8191 & h,
                d = h >>> 13,
                f = 0 | s[1],
                p = 8191 & f,
                g = f >>> 13,
                m = 0 | s[2],
                y = 8191 & m,
                b = m >>> 13,
                w = 0 | s[3],
                k = 8191 & w,
                v = w >>> 13,
                S = 0 | s[4],
                I = 8191 & S,
                A = S >>> 13,
                E = 0 | s[5],
                _ = 8191 & E,
                B = E >>> 13,
                x = 0 | s[6],
                M = 8191 & x,
                P = x >>> 13,
                R = 0 | s[7],
                T = 8191 & R,
                O = R >>> 13,
                L = 0 | s[8],
                C = 8191 & L,
                z = L >>> 13,
                U = 0 | s[9],
                N = 8191 & U,
                W = U >>> 13,
                K = 0 | a[0],
                q = 8191 & K,
                D = K >>> 13,
                H = 0 | a[1],
                F = 8191 & H,
                j = H >>> 13,
                $ = 0 | a[2],
                V = 8191 & $,
                G = $ >>> 13,
                Y = 0 | a[3],
                Z = 8191 & Y,
                J = Y >>> 13,
                X = 0 | a[4],
                Q = 8191 & X,
                tt = X >>> 13,
                et = 0 | a[5],
                rt = 8191 & et,
                nt = et >>> 13,
                it = 0 | a[6],
                ot = 8191 & it,
                st = it >>> 13,
                at = 0 | a[7],
                ct = 8191 & at,
                ut = at >>> 13,
                ht = 0 | a[8],
                lt = 8191 & ht,
                dt = ht >>> 13,
                ft = 0 | a[9],
                pt = 8191 & ft,
                gt = ft >>> 13;
              (r.negative = t.negative ^ e.negative), (r.length = 19);
              var mt =
                (((u + (n = Math.imul(l, q))) | 0) +
                  ((8191 &
                    (i = ((i = Math.imul(l, D)) + Math.imul(d, q)) | 0)) <<
                    13)) |
                0;
              (u =
                ((((o = Math.imul(d, D)) + (i >>> 13)) | 0) + (mt >>> 26)) | 0),
                (mt &= 67108863),
                (n = Math.imul(p, q)),
                (i = ((i = Math.imul(p, D)) + Math.imul(g, q)) | 0),
                (o = Math.imul(g, D));
              var yt =
                (((u + (n = (n + Math.imul(l, F)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, j)) | 0) + Math.imul(d, F)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, j)) | 0) + (i >>> 13)) | 0) +
                  (yt >>> 26)) |
                0),
                (yt &= 67108863),
                (n = Math.imul(y, q)),
                (i = ((i = Math.imul(y, D)) + Math.imul(b, q)) | 0),
                (o = Math.imul(b, D)),
                (n = (n + Math.imul(p, F)) | 0),
                (i = ((i = (i + Math.imul(p, j)) | 0) + Math.imul(g, F)) | 0),
                (o = (o + Math.imul(g, j)) | 0);
              var bt =
                (((u + (n = (n + Math.imul(l, V)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, G)) | 0) + Math.imul(d, V)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, G)) | 0) + (i >>> 13)) | 0) +
                  (bt >>> 26)) |
                0),
                (bt &= 67108863),
                (n = Math.imul(k, q)),
                (i = ((i = Math.imul(k, D)) + Math.imul(v, q)) | 0),
                (o = Math.imul(v, D)),
                (n = (n + Math.imul(y, F)) | 0),
                (i = ((i = (i + Math.imul(y, j)) | 0) + Math.imul(b, F)) | 0),
                (o = (o + Math.imul(b, j)) | 0),
                (n = (n + Math.imul(p, V)) | 0),
                (i = ((i = (i + Math.imul(p, G)) | 0) + Math.imul(g, V)) | 0),
                (o = (o + Math.imul(g, G)) | 0);
              var wt =
                (((u + (n = (n + Math.imul(l, Z)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, J)) | 0) + Math.imul(d, Z)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, J)) | 0) + (i >>> 13)) | 0) +
                  (wt >>> 26)) |
                0),
                (wt &= 67108863),
                (n = Math.imul(I, q)),
                (i = ((i = Math.imul(I, D)) + Math.imul(A, q)) | 0),
                (o = Math.imul(A, D)),
                (n = (n + Math.imul(k, F)) | 0),
                (i = ((i = (i + Math.imul(k, j)) | 0) + Math.imul(v, F)) | 0),
                (o = (o + Math.imul(v, j)) | 0),
                (n = (n + Math.imul(y, V)) | 0),
                (i = ((i = (i + Math.imul(y, G)) | 0) + Math.imul(b, V)) | 0),
                (o = (o + Math.imul(b, G)) | 0),
                (n = (n + Math.imul(p, Z)) | 0),
                (i = ((i = (i + Math.imul(p, J)) | 0) + Math.imul(g, Z)) | 0),
                (o = (o + Math.imul(g, J)) | 0);
              var kt =
                (((u + (n = (n + Math.imul(l, Q)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, tt)) | 0) + Math.imul(d, Q)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) +
                  (kt >>> 26)) |
                0),
                (kt &= 67108863),
                (n = Math.imul(_, q)),
                (i = ((i = Math.imul(_, D)) + Math.imul(B, q)) | 0),
                (o = Math.imul(B, D)),
                (n = (n + Math.imul(I, F)) | 0),
                (i = ((i = (i + Math.imul(I, j)) | 0) + Math.imul(A, F)) | 0),
                (o = (o + Math.imul(A, j)) | 0),
                (n = (n + Math.imul(k, V)) | 0),
                (i = ((i = (i + Math.imul(k, G)) | 0) + Math.imul(v, V)) | 0),
                (o = (o + Math.imul(v, G)) | 0),
                (n = (n + Math.imul(y, Z)) | 0),
                (i = ((i = (i + Math.imul(y, J)) | 0) + Math.imul(b, Z)) | 0),
                (o = (o + Math.imul(b, J)) | 0),
                (n = (n + Math.imul(p, Q)) | 0),
                (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(g, Q)) | 0),
                (o = (o + Math.imul(g, tt)) | 0);
              var vt =
                (((u + (n = (n + Math.imul(l, rt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, nt)) | 0) + Math.imul(d, rt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, nt)) | 0) + (i >>> 13)) | 0) +
                  (vt >>> 26)) |
                0),
                (vt &= 67108863),
                (n = Math.imul(M, q)),
                (i = ((i = Math.imul(M, D)) + Math.imul(P, q)) | 0),
                (o = Math.imul(P, D)),
                (n = (n + Math.imul(_, F)) | 0),
                (i = ((i = (i + Math.imul(_, j)) | 0) + Math.imul(B, F)) | 0),
                (o = (o + Math.imul(B, j)) | 0),
                (n = (n + Math.imul(I, V)) | 0),
                (i = ((i = (i + Math.imul(I, G)) | 0) + Math.imul(A, V)) | 0),
                (o = (o + Math.imul(A, G)) | 0),
                (n = (n + Math.imul(k, Z)) | 0),
                (i = ((i = (i + Math.imul(k, J)) | 0) + Math.imul(v, Z)) | 0),
                (o = (o + Math.imul(v, J)) | 0),
                (n = (n + Math.imul(y, Q)) | 0),
                (i = ((i = (i + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
                (o = (o + Math.imul(b, tt)) | 0),
                (n = (n + Math.imul(p, rt)) | 0),
                (i = ((i = (i + Math.imul(p, nt)) | 0) + Math.imul(g, rt)) | 0),
                (o = (o + Math.imul(g, nt)) | 0);
              var St =
                (((u + (n = (n + Math.imul(l, ot)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, st)) | 0) + Math.imul(d, ot)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, st)) | 0) + (i >>> 13)) | 0) +
                  (St >>> 26)) |
                0),
                (St &= 67108863),
                (n = Math.imul(T, q)),
                (i = ((i = Math.imul(T, D)) + Math.imul(O, q)) | 0),
                (o = Math.imul(O, D)),
                (n = (n + Math.imul(M, F)) | 0),
                (i = ((i = (i + Math.imul(M, j)) | 0) + Math.imul(P, F)) | 0),
                (o = (o + Math.imul(P, j)) | 0),
                (n = (n + Math.imul(_, V)) | 0),
                (i = ((i = (i + Math.imul(_, G)) | 0) + Math.imul(B, V)) | 0),
                (o = (o + Math.imul(B, G)) | 0),
                (n = (n + Math.imul(I, Z)) | 0),
                (i = ((i = (i + Math.imul(I, J)) | 0) + Math.imul(A, Z)) | 0),
                (o = (o + Math.imul(A, J)) | 0),
                (n = (n + Math.imul(k, Q)) | 0),
                (i = ((i = (i + Math.imul(k, tt)) | 0) + Math.imul(v, Q)) | 0),
                (o = (o + Math.imul(v, tt)) | 0),
                (n = (n + Math.imul(y, rt)) | 0),
                (i = ((i = (i + Math.imul(y, nt)) | 0) + Math.imul(b, rt)) | 0),
                (o = (o + Math.imul(b, nt)) | 0),
                (n = (n + Math.imul(p, ot)) | 0),
                (i = ((i = (i + Math.imul(p, st)) | 0) + Math.imul(g, ot)) | 0),
                (o = (o + Math.imul(g, st)) | 0);
              var It =
                (((u + (n = (n + Math.imul(l, ct)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, ut)) | 0) + Math.imul(d, ct)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, ut)) | 0) + (i >>> 13)) | 0) +
                  (It >>> 26)) |
                0),
                (It &= 67108863),
                (n = Math.imul(C, q)),
                (i = ((i = Math.imul(C, D)) + Math.imul(z, q)) | 0),
                (o = Math.imul(z, D)),
                (n = (n + Math.imul(T, F)) | 0),
                (i = ((i = (i + Math.imul(T, j)) | 0) + Math.imul(O, F)) | 0),
                (o = (o + Math.imul(O, j)) | 0),
                (n = (n + Math.imul(M, V)) | 0),
                (i = ((i = (i + Math.imul(M, G)) | 0) + Math.imul(P, V)) | 0),
                (o = (o + Math.imul(P, G)) | 0),
                (n = (n + Math.imul(_, Z)) | 0),
                (i = ((i = (i + Math.imul(_, J)) | 0) + Math.imul(B, Z)) | 0),
                (o = (o + Math.imul(B, J)) | 0),
                (n = (n + Math.imul(I, Q)) | 0),
                (i = ((i = (i + Math.imul(I, tt)) | 0) + Math.imul(A, Q)) | 0),
                (o = (o + Math.imul(A, tt)) | 0),
                (n = (n + Math.imul(k, rt)) | 0),
                (i = ((i = (i + Math.imul(k, nt)) | 0) + Math.imul(v, rt)) | 0),
                (o = (o + Math.imul(v, nt)) | 0),
                (n = (n + Math.imul(y, ot)) | 0),
                (i = ((i = (i + Math.imul(y, st)) | 0) + Math.imul(b, ot)) | 0),
                (o = (o + Math.imul(b, st)) | 0),
                (n = (n + Math.imul(p, ct)) | 0),
                (i = ((i = (i + Math.imul(p, ut)) | 0) + Math.imul(g, ct)) | 0),
                (o = (o + Math.imul(g, ut)) | 0);
              var At =
                (((u + (n = (n + Math.imul(l, lt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, dt)) | 0) + Math.imul(d, lt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, dt)) | 0) + (i >>> 13)) | 0) +
                  (At >>> 26)) |
                0),
                (At &= 67108863),
                (n = Math.imul(N, q)),
                (i = ((i = Math.imul(N, D)) + Math.imul(W, q)) | 0),
                (o = Math.imul(W, D)),
                (n = (n + Math.imul(C, F)) | 0),
                (i = ((i = (i + Math.imul(C, j)) | 0) + Math.imul(z, F)) | 0),
                (o = (o + Math.imul(z, j)) | 0),
                (n = (n + Math.imul(T, V)) | 0),
                (i = ((i = (i + Math.imul(T, G)) | 0) + Math.imul(O, V)) | 0),
                (o = (o + Math.imul(O, G)) | 0),
                (n = (n + Math.imul(M, Z)) | 0),
                (i = ((i = (i + Math.imul(M, J)) | 0) + Math.imul(P, Z)) | 0),
                (o = (o + Math.imul(P, J)) | 0),
                (n = (n + Math.imul(_, Q)) | 0),
                (i = ((i = (i + Math.imul(_, tt)) | 0) + Math.imul(B, Q)) | 0),
                (o = (o + Math.imul(B, tt)) | 0),
                (n = (n + Math.imul(I, rt)) | 0),
                (i = ((i = (i + Math.imul(I, nt)) | 0) + Math.imul(A, rt)) | 0),
                (o = (o + Math.imul(A, nt)) | 0),
                (n = (n + Math.imul(k, ot)) | 0),
                (i = ((i = (i + Math.imul(k, st)) | 0) + Math.imul(v, ot)) | 0),
                (o = (o + Math.imul(v, st)) | 0),
                (n = (n + Math.imul(y, ct)) | 0),
                (i = ((i = (i + Math.imul(y, ut)) | 0) + Math.imul(b, ct)) | 0),
                (o = (o + Math.imul(b, ut)) | 0),
                (n = (n + Math.imul(p, lt)) | 0),
                (i = ((i = (i + Math.imul(p, dt)) | 0) + Math.imul(g, lt)) | 0),
                (o = (o + Math.imul(g, dt)) | 0);
              var Et =
                (((u + (n = (n + Math.imul(l, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(l, gt)) | 0) + Math.imul(d, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(d, gt)) | 0) + (i >>> 13)) | 0) +
                  (Et >>> 26)) |
                0),
                (Et &= 67108863),
                (n = Math.imul(N, F)),
                (i = ((i = Math.imul(N, j)) + Math.imul(W, F)) | 0),
                (o = Math.imul(W, j)),
                (n = (n + Math.imul(C, V)) | 0),
                (i = ((i = (i + Math.imul(C, G)) | 0) + Math.imul(z, V)) | 0),
                (o = (o + Math.imul(z, G)) | 0),
                (n = (n + Math.imul(T, Z)) | 0),
                (i = ((i = (i + Math.imul(T, J)) | 0) + Math.imul(O, Z)) | 0),
                (o = (o + Math.imul(O, J)) | 0),
                (n = (n + Math.imul(M, Q)) | 0),
                (i = ((i = (i + Math.imul(M, tt)) | 0) + Math.imul(P, Q)) | 0),
                (o = (o + Math.imul(P, tt)) | 0),
                (n = (n + Math.imul(_, rt)) | 0),
                (i = ((i = (i + Math.imul(_, nt)) | 0) + Math.imul(B, rt)) | 0),
                (o = (o + Math.imul(B, nt)) | 0),
                (n = (n + Math.imul(I, ot)) | 0),
                (i = ((i = (i + Math.imul(I, st)) | 0) + Math.imul(A, ot)) | 0),
                (o = (o + Math.imul(A, st)) | 0),
                (n = (n + Math.imul(k, ct)) | 0),
                (i = ((i = (i + Math.imul(k, ut)) | 0) + Math.imul(v, ct)) | 0),
                (o = (o + Math.imul(v, ut)) | 0),
                (n = (n + Math.imul(y, lt)) | 0),
                (i = ((i = (i + Math.imul(y, dt)) | 0) + Math.imul(b, lt)) | 0),
                (o = (o + Math.imul(b, dt)) | 0);
              var _t =
                (((u + (n = (n + Math.imul(p, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(p, gt)) | 0) + Math.imul(g, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(g, gt)) | 0) + (i >>> 13)) | 0) +
                  (_t >>> 26)) |
                0),
                (_t &= 67108863),
                (n = Math.imul(N, V)),
                (i = ((i = Math.imul(N, G)) + Math.imul(W, V)) | 0),
                (o = Math.imul(W, G)),
                (n = (n + Math.imul(C, Z)) | 0),
                (i = ((i = (i + Math.imul(C, J)) | 0) + Math.imul(z, Z)) | 0),
                (o = (o + Math.imul(z, J)) | 0),
                (n = (n + Math.imul(T, Q)) | 0),
                (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(O, Q)) | 0),
                (o = (o + Math.imul(O, tt)) | 0),
                (n = (n + Math.imul(M, rt)) | 0),
                (i = ((i = (i + Math.imul(M, nt)) | 0) + Math.imul(P, rt)) | 0),
                (o = (o + Math.imul(P, nt)) | 0),
                (n = (n + Math.imul(_, ot)) | 0),
                (i = ((i = (i + Math.imul(_, st)) | 0) + Math.imul(B, ot)) | 0),
                (o = (o + Math.imul(B, st)) | 0),
                (n = (n + Math.imul(I, ct)) | 0),
                (i = ((i = (i + Math.imul(I, ut)) | 0) + Math.imul(A, ct)) | 0),
                (o = (o + Math.imul(A, ut)) | 0),
                (n = (n + Math.imul(k, lt)) | 0),
                (i = ((i = (i + Math.imul(k, dt)) | 0) + Math.imul(v, lt)) | 0),
                (o = (o + Math.imul(v, dt)) | 0);
              var Bt =
                (((u + (n = (n + Math.imul(y, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(y, gt)) | 0) + Math.imul(b, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(b, gt)) | 0) + (i >>> 13)) | 0) +
                  (Bt >>> 26)) |
                0),
                (Bt &= 67108863),
                (n = Math.imul(N, Z)),
                (i = ((i = Math.imul(N, J)) + Math.imul(W, Z)) | 0),
                (o = Math.imul(W, J)),
                (n = (n + Math.imul(C, Q)) | 0),
                (i = ((i = (i + Math.imul(C, tt)) | 0) + Math.imul(z, Q)) | 0),
                (o = (o + Math.imul(z, tt)) | 0),
                (n = (n + Math.imul(T, rt)) | 0),
                (i = ((i = (i + Math.imul(T, nt)) | 0) + Math.imul(O, rt)) | 0),
                (o = (o + Math.imul(O, nt)) | 0),
                (n = (n + Math.imul(M, ot)) | 0),
                (i = ((i = (i + Math.imul(M, st)) | 0) + Math.imul(P, ot)) | 0),
                (o = (o + Math.imul(P, st)) | 0),
                (n = (n + Math.imul(_, ct)) | 0),
                (i = ((i = (i + Math.imul(_, ut)) | 0) + Math.imul(B, ct)) | 0),
                (o = (o + Math.imul(B, ut)) | 0),
                (n = (n + Math.imul(I, lt)) | 0),
                (i = ((i = (i + Math.imul(I, dt)) | 0) + Math.imul(A, lt)) | 0),
                (o = (o + Math.imul(A, dt)) | 0);
              var xt =
                (((u + (n = (n + Math.imul(k, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(k, gt)) | 0) + Math.imul(v, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(v, gt)) | 0) + (i >>> 13)) | 0) +
                  (xt >>> 26)) |
                0),
                (xt &= 67108863),
                (n = Math.imul(N, Q)),
                (i = ((i = Math.imul(N, tt)) + Math.imul(W, Q)) | 0),
                (o = Math.imul(W, tt)),
                (n = (n + Math.imul(C, rt)) | 0),
                (i = ((i = (i + Math.imul(C, nt)) | 0) + Math.imul(z, rt)) | 0),
                (o = (o + Math.imul(z, nt)) | 0),
                (n = (n + Math.imul(T, ot)) | 0),
                (i = ((i = (i + Math.imul(T, st)) | 0) + Math.imul(O, ot)) | 0),
                (o = (o + Math.imul(O, st)) | 0),
                (n = (n + Math.imul(M, ct)) | 0),
                (i = ((i = (i + Math.imul(M, ut)) | 0) + Math.imul(P, ct)) | 0),
                (o = (o + Math.imul(P, ut)) | 0),
                (n = (n + Math.imul(_, lt)) | 0),
                (i = ((i = (i + Math.imul(_, dt)) | 0) + Math.imul(B, lt)) | 0),
                (o = (o + Math.imul(B, dt)) | 0);
              var Mt =
                (((u + (n = (n + Math.imul(I, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(I, gt)) | 0) + Math.imul(A, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(A, gt)) | 0) + (i >>> 13)) | 0) +
                  (Mt >>> 26)) |
                0),
                (Mt &= 67108863),
                (n = Math.imul(N, rt)),
                (i = ((i = Math.imul(N, nt)) + Math.imul(W, rt)) | 0),
                (o = Math.imul(W, nt)),
                (n = (n + Math.imul(C, ot)) | 0),
                (i = ((i = (i + Math.imul(C, st)) | 0) + Math.imul(z, ot)) | 0),
                (o = (o + Math.imul(z, st)) | 0),
                (n = (n + Math.imul(T, ct)) | 0),
                (i = ((i = (i + Math.imul(T, ut)) | 0) + Math.imul(O, ct)) | 0),
                (o = (o + Math.imul(O, ut)) | 0),
                (n = (n + Math.imul(M, lt)) | 0),
                (i = ((i = (i + Math.imul(M, dt)) | 0) + Math.imul(P, lt)) | 0),
                (o = (o + Math.imul(P, dt)) | 0);
              var Pt =
                (((u + (n = (n + Math.imul(_, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(_, gt)) | 0) + Math.imul(B, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(B, gt)) | 0) + (i >>> 13)) | 0) +
                  (Pt >>> 26)) |
                0),
                (Pt &= 67108863),
                (n = Math.imul(N, ot)),
                (i = ((i = Math.imul(N, st)) + Math.imul(W, ot)) | 0),
                (o = Math.imul(W, st)),
                (n = (n + Math.imul(C, ct)) | 0),
                (i = ((i = (i + Math.imul(C, ut)) | 0) + Math.imul(z, ct)) | 0),
                (o = (o + Math.imul(z, ut)) | 0),
                (n = (n + Math.imul(T, lt)) | 0),
                (i = ((i = (i + Math.imul(T, dt)) | 0) + Math.imul(O, lt)) | 0),
                (o = (o + Math.imul(O, dt)) | 0);
              var Rt =
                (((u + (n = (n + Math.imul(M, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(M, gt)) | 0) + Math.imul(P, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(P, gt)) | 0) + (i >>> 13)) | 0) +
                  (Rt >>> 26)) |
                0),
                (Rt &= 67108863),
                (n = Math.imul(N, ct)),
                (i = ((i = Math.imul(N, ut)) + Math.imul(W, ct)) | 0),
                (o = Math.imul(W, ut)),
                (n = (n + Math.imul(C, lt)) | 0),
                (i = ((i = (i + Math.imul(C, dt)) | 0) + Math.imul(z, lt)) | 0),
                (o = (o + Math.imul(z, dt)) | 0);
              var Tt =
                (((u + (n = (n + Math.imul(T, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(T, gt)) | 0) + Math.imul(O, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(O, gt)) | 0) + (i >>> 13)) | 0) +
                  (Tt >>> 26)) |
                0),
                (Tt &= 67108863),
                (n = Math.imul(N, lt)),
                (i = ((i = Math.imul(N, dt)) + Math.imul(W, lt)) | 0),
                (o = Math.imul(W, dt));
              var Ot =
                (((u + (n = (n + Math.imul(C, pt)) | 0)) | 0) +
                  ((8191 &
                    (i =
                      ((i = (i + Math.imul(C, gt)) | 0) + Math.imul(z, pt)) |
                      0)) <<
                    13)) |
                0;
              (u =
                ((((o = (o + Math.imul(z, gt)) | 0) + (i >>> 13)) | 0) +
                  (Ot >>> 26)) |
                0),
                (Ot &= 67108863);
              var Lt =
                (((u + (n = Math.imul(N, pt))) | 0) +
                  ((8191 &
                    (i = ((i = Math.imul(N, gt)) + Math.imul(W, pt)) | 0)) <<
                    13)) |
                0;
              return (
                (u =
                  ((((o = Math.imul(W, gt)) + (i >>> 13)) | 0) + (Lt >>> 26)) |
                  0),
                (Lt &= 67108863),
                (c[0] = mt),
                (c[1] = yt),
                (c[2] = bt),
                (c[3] = wt),
                (c[4] = kt),
                (c[5] = vt),
                (c[6] = St),
                (c[7] = It),
                (c[8] = At),
                (c[9] = Et),
                (c[10] = _t),
                (c[11] = Bt),
                (c[12] = xt),
                (c[13] = Mt),
                (c[14] = Pt),
                (c[15] = Rt),
                (c[16] = Tt),
                (c[17] = Ot),
                (c[18] = Lt),
                0 !== u && ((c[19] = u), r.length++),
                r
              );
            };
            function y(t, e, r) {
              (r.negative = e.negative ^ t.negative),
                (r.length = t.length + e.length);
              for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
                var s = i;
                i = 0;
                for (
                  var a = 67108863 & n,
                    c = Math.min(o, e.length - 1),
                    u = Math.max(0, o - t.length + 1);
                  u <= c;
                  u++
                ) {
                  var h = o - u,
                    l = (0 | t.words[h]) * (0 | e.words[u]),
                    d = 67108863 & l;
                  (a = 67108863 & (d = (d + a) | 0)),
                    (i +=
                      (s =
                        ((s = (s + ((l / 67108864) | 0)) | 0) + (d >>> 26)) |
                        0) >>> 26),
                    (s &= 67108863);
                }
                (r.words[o] = a), (n = s), (s = i);
              }
              return 0 !== n ? (r.words[o] = n) : r.length--, r._strip();
            }
            function b(t, e, r) {
              return y(t, e, r);
            }
            function w(t, e) {
              (this.x = t), (this.y = e);
            }
            Math.imul || (m = g),
              (o.prototype.mulTo = function (t, e) {
                var r = this.length + t.length;
                return 10 === this.length && 10 === t.length
                  ? m(this, t, e)
                  : r < 63
                  ? g(this, t, e)
                  : r < 1024
                  ? y(this, t, e)
                  : b(this, t, e);
              }),
              (w.prototype.makeRBT = function (t) {
                for (
                  var e = new Array(t),
                    r = o.prototype._countBits(t) - 1,
                    n = 0;
                  n < t;
                  n++
                )
                  e[n] = this.revBin(n, r, t);
                return e;
              }),
              (w.prototype.revBin = function (t, e, r) {
                if (0 === t || t === r - 1) return t;
                for (var n = 0, i = 0; i < e; i++)
                  (n |= (1 & t) << (e - i - 1)), (t >>= 1);
                return n;
              }),
              (w.prototype.permute = function (t, e, r, n, i, o) {
                for (var s = 0; s < o; s++) (n[s] = e[t[s]]), (i[s] = r[t[s]]);
              }),
              (w.prototype.transform = function (t, e, r, n, i, o) {
                this.permute(o, t, e, r, n, i);
                for (var s = 1; s < i; s <<= 1)
                  for (
                    var a = s << 1,
                      c = Math.cos((2 * Math.PI) / a),
                      u = Math.sin((2 * Math.PI) / a),
                      h = 0;
                    h < i;
                    h += a
                  )
                    for (var l = c, d = u, f = 0; f < s; f++) {
                      var p = r[h + f],
                        g = n[h + f],
                        m = r[h + f + s],
                        y = n[h + f + s],
                        b = l * m - d * y;
                      (y = l * y + d * m),
                        (m = b),
                        (r[h + f] = p + m),
                        (n[h + f] = g + y),
                        (r[h + f + s] = p - m),
                        (n[h + f + s] = g - y),
                        f !== a &&
                          ((b = c * l - u * d), (d = c * d + u * l), (l = b));
                    }
              }),
              (w.prototype.guessLen13b = function (t, e) {
                var r = 1 | Math.max(e, t),
                  n = 1 & r,
                  i = 0;
                for (r = (r / 2) | 0; r; r >>>= 1) i++;
                return 1 << (i + 1 + n);
              }),
              (w.prototype.conjugate = function (t, e, r) {
                if (!(r <= 1))
                  for (var n = 0; n < r / 2; n++) {
                    var i = t[n];
                    (t[n] = t[r - n - 1]),
                      (t[r - n - 1] = i),
                      (i = e[n]),
                      (e[n] = -e[r - n - 1]),
                      (e[r - n - 1] = -i);
                  }
              }),
              (w.prototype.normalize13b = function (t, e) {
                for (var r = 0, n = 0; n < e / 2; n++) {
                  var i =
                    8192 * Math.round(t[2 * n + 1] / e) +
                    Math.round(t[2 * n] / e) +
                    r;
                  (t[n] = 67108863 & i),
                    (r = i < 67108864 ? 0 : (i / 67108864) | 0);
                }
                return t;
              }),
              (w.prototype.convert13b = function (t, e, r, i) {
                for (var o = 0, s = 0; s < e; s++)
                  (o += 0 | t[s]),
                    (r[2 * s] = 8191 & o),
                    (o >>>= 13),
                    (r[2 * s + 1] = 8191 & o),
                    (o >>>= 13);
                for (s = 2 * e; s < i; ++s) r[s] = 0;
                n(0 === o), n(!(-8192 & o));
              }),
              (w.prototype.stub = function (t) {
                for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
                return e;
              }),
              (w.prototype.mulp = function (t, e, r) {
                var n = 2 * this.guessLen13b(t.length, e.length),
                  i = this.makeRBT(n),
                  o = this.stub(n),
                  s = new Array(n),
                  a = new Array(n),
                  c = new Array(n),
                  u = new Array(n),
                  h = new Array(n),
                  l = new Array(n),
                  d = r.words;
                (d.length = n),
                  this.convert13b(t.words, t.length, s, n),
                  this.convert13b(e.words, e.length, u, n),
                  this.transform(s, o, a, c, n, i),
                  this.transform(u, o, h, l, n, i);
                for (var f = 0; f < n; f++) {
                  var p = a[f] * h[f] - c[f] * l[f];
                  (c[f] = a[f] * l[f] + c[f] * h[f]), (a[f] = p);
                }
                return (
                  this.conjugate(a, c, n),
                  this.transform(a, c, d, o, n, i),
                  this.conjugate(d, o, n),
                  this.normalize13b(d, n),
                  (r.negative = t.negative ^ e.negative),
                  (r.length = t.length + e.length),
                  r._strip()
                );
              }),
              (o.prototype.mul = function (t) {
                var e = new o(null);
                return (
                  (e.words = new Array(this.length + t.length)),
                  this.mulTo(t, e)
                );
              }),
              (o.prototype.mulf = function (t) {
                var e = new o(null);
                return (
                  (e.words = new Array(this.length + t.length)), b(this, t, e)
                );
              }),
              (o.prototype.imul = function (t) {
                return this.clone().mulTo(t, this);
              }),
              (o.prototype.imuln = function (t) {
                var e = t < 0;
                e && (t = -t), n("number" == typeof t), n(t < 67108864);
                for (var r = 0, i = 0; i < this.length; i++) {
                  var o = (0 | this.words[i]) * t,
                    s = (67108863 & o) + (67108863 & r);
                  (r >>= 26),
                    (r += (o / 67108864) | 0),
                    (r += s >>> 26),
                    (this.words[i] = 67108863 & s);
                }
                return (
                  0 !== r && ((this.words[i] = r), this.length++),
                  e ? this.ineg() : this
                );
              }),
              (o.prototype.muln = function (t) {
                return this.clone().imuln(t);
              }),
              (o.prototype.sqr = function () {
                return this.mul(this);
              }),
              (o.prototype.isqr = function () {
                return this.imul(this.clone());
              }),
              (o.prototype.pow = function (t) {
                var e = (function (t) {
                  for (
                    var e = new Array(t.bitLength()), r = 0;
                    r < e.length;
                    r++
                  ) {
                    var n = (r / 26) | 0,
                      i = r % 26;
                    e[r] = (t.words[n] >>> i) & 1;
                  }
                  return e;
                })(t);
                if (0 === e.length) return new o(1);
                for (
                  var r = this, n = 0;
                  n < e.length && 0 === e[n];
                  n++, r = r.sqr()
                );
                if (++n < e.length)
                  for (var i = r.sqr(); n < e.length; n++, i = i.sqr())
                    0 !== e[n] && (r = r.mul(i));
                return r;
              }),
              (o.prototype.iushln = function (t) {
                n("number" == typeof t && t >= 0);
                var e,
                  r = t % 26,
                  i = (t - r) / 26,
                  o = (67108863 >>> (26 - r)) << (26 - r);
                if (0 !== r) {
                  var s = 0;
                  for (e = 0; e < this.length; e++) {
                    var a = this.words[e] & o,
                      c = ((0 | this.words[e]) - a) << r;
                    (this.words[e] = c | s), (s = a >>> (26 - r));
                  }
                  s && ((this.words[e] = s), this.length++);
                }
                if (0 !== i) {
                  for (e = this.length - 1; e >= 0; e--)
                    this.words[e + i] = this.words[e];
                  for (e = 0; e < i; e++) this.words[e] = 0;
                  this.length += i;
                }
                return this._strip();
              }),
              (o.prototype.ishln = function (t) {
                return n(0 === this.negative), this.iushln(t);
              }),
              (o.prototype.iushrn = function (t, e, r) {
                var i;
                n("number" == typeof t && t >= 0),
                  (i = e ? (e - (e % 26)) / 26 : 0);
                var o = t % 26,
                  s = Math.min((t - o) / 26, this.length),
                  a = 67108863 ^ ((67108863 >>> o) << o),
                  c = r;
                if (((i -= s), (i = Math.max(0, i)), c)) {
                  for (var u = 0; u < s; u++) c.words[u] = this.words[u];
                  c.length = s;
                }
                if (0 === s);
                else if (this.length > s)
                  for (this.length -= s, u = 0; u < this.length; u++)
                    this.words[u] = this.words[u + s];
                else (this.words[0] = 0), (this.length = 1);
                var h = 0;
                for (u = this.length - 1; u >= 0 && (0 !== h || u >= i); u--) {
                  var l = 0 | this.words[u];
                  (this.words[u] = (h << (26 - o)) | (l >>> o)), (h = l & a);
                }
                return (
                  c && 0 !== h && (c.words[c.length++] = h),
                  0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                  this._strip()
                );
              }),
              (o.prototype.ishrn = function (t, e, r) {
                return n(0 === this.negative), this.iushrn(t, e, r);
              }),
              (o.prototype.shln = function (t) {
                return this.clone().ishln(t);
              }),
              (o.prototype.ushln = function (t) {
                return this.clone().iushln(t);
              }),
              (o.prototype.shrn = function (t) {
                return this.clone().ishrn(t);
              }),
              (o.prototype.ushrn = function (t) {
                return this.clone().iushrn(t);
              }),
              (o.prototype.testn = function (t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                  r = (t - e) / 26,
                  i = 1 << e;
                return !(this.length <= r || !(this.words[r] & i));
              }),
              (o.prototype.imaskn = function (t) {
                n("number" == typeof t && t >= 0);
                var e = t % 26,
                  r = (t - e) / 26;
                if (
                  (n(
                    0 === this.negative,
                    "imaskn works only with positive numbers"
                  ),
                  this.length <= r)
                )
                  return this;
                if (
                  (0 !== e && r++,
                  (this.length = Math.min(r, this.length)),
                  0 !== e)
                ) {
                  var i = 67108863 ^ ((67108863 >>> e) << e);
                  this.words[this.length - 1] &= i;
                }
                return this._strip();
              }),
              (o.prototype.maskn = function (t) {
                return this.clone().imaskn(t);
              }),
              (o.prototype.iaddn = function (t) {
                return (
                  n("number" == typeof t),
                  n(t < 67108864),
                  t < 0
                    ? this.isubn(-t)
                    : 0 !== this.negative
                    ? 1 === this.length && (0 | this.words[0]) <= t
                      ? ((this.words[0] = t - (0 | this.words[0])),
                        (this.negative = 0),
                        this)
                      : ((this.negative = 0),
                        this.isubn(t),
                        (this.negative = 1),
                        this)
                    : this._iaddn(t)
                );
              }),
              (o.prototype._iaddn = function (t) {
                this.words[0] += t;
                for (
                  var e = 0;
                  e < this.length && this.words[e] >= 67108864;
                  e++
                )
                  (this.words[e] -= 67108864),
                    e === this.length - 1
                      ? (this.words[e + 1] = 1)
                      : this.words[e + 1]++;
                return (this.length = Math.max(this.length, e + 1)), this;
              }),
              (o.prototype.isubn = function (t) {
                if ((n("number" == typeof t), n(t < 67108864), t < 0))
                  return this.iaddn(-t);
                if (0 !== this.negative)
                  return (
                    (this.negative = 0),
                    this.iaddn(t),
                    (this.negative = 1),
                    this
                  );
                if (
                  ((this.words[0] -= t), 1 === this.length && this.words[0] < 0)
                )
                  (this.words[0] = -this.words[0]), (this.negative = 1);
                else
                  for (var e = 0; e < this.length && this.words[e] < 0; e++)
                    (this.words[e] += 67108864), (this.words[e + 1] -= 1);
                return this._strip();
              }),
              (o.prototype.addn = function (t) {
                return this.clone().iaddn(t);
              }),
              (o.prototype.subn = function (t) {
                return this.clone().isubn(t);
              }),
              (o.prototype.iabs = function () {
                return (this.negative = 0), this;
              }),
              (o.prototype.abs = function () {
                return this.clone().iabs();
              }),
              (o.prototype._ishlnsubmul = function (t, e, r) {
                var i,
                  o,
                  s = t.length + r;
                this._expand(s);
                var a = 0;
                for (i = 0; i < t.length; i++) {
                  o = (0 | this.words[i + r]) + a;
                  var c = (0 | t.words[i]) * e;
                  (a = ((o -= 67108863 & c) >> 26) - ((c / 67108864) | 0)),
                    (this.words[i + r] = 67108863 & o);
                }
                for (; i < this.length - r; i++)
                  (a = (o = (0 | this.words[i + r]) + a) >> 26),
                    (this.words[i + r] = 67108863 & o);
                if (0 === a) return this._strip();
                for (n(-1 === a), a = 0, i = 0; i < this.length; i++)
                  (a = (o = -(0 | this.words[i]) + a) >> 26),
                    (this.words[i] = 67108863 & o);
                return (this.negative = 1), this._strip();
              }),
              (o.prototype._wordDiv = function (t, e) {
                var r = (this.length, t.length),
                  n = this.clone(),
                  i = t,
                  s = 0 | i.words[i.length - 1];
                0 != (r = 26 - this._countBits(s)) &&
                  ((i = i.ushln(r)),
                  n.iushln(r),
                  (s = 0 | i.words[i.length - 1]));
                var a,
                  c = n.length - i.length;
                if ("mod" !== e) {
                  ((a = new o(null)).length = c + 1),
                    (a.words = new Array(a.length));
                  for (var u = 0; u < a.length; u++) a.words[u] = 0;
                }
                var h = n.clone()._ishlnsubmul(i, 1, c);
                0 === h.negative && ((n = h), a && (a.words[c] = 1));
                for (var l = c - 1; l >= 0; l--) {
                  var d =
                    67108864 * (0 | n.words[i.length + l]) +
                    (0 | n.words[i.length + l - 1]);
                  for (
                    d = Math.min((d / s) | 0, 67108863),
                      n._ishlnsubmul(i, d, l);
                    0 !== n.negative;

                  )
                    d--,
                      (n.negative = 0),
                      n._ishlnsubmul(i, 1, l),
                      n.isZero() || (n.negative ^= 1);
                  a && (a.words[l] = d);
                }
                return (
                  a && a._strip(),
                  n._strip(),
                  "div" !== e && 0 !== r && n.iushrn(r),
                  { div: a || null, mod: n }
                );
              }),
              (o.prototype.divmod = function (t, e, r) {
                return (
                  n(!t.isZero()),
                  this.isZero()
                    ? { div: new o(0), mod: new o(0) }
                    : 0 !== this.negative && 0 === t.negative
                    ? ((a = this.neg().divmod(t, e)),
                      "mod" !== e && (i = a.div.neg()),
                      "div" !== e &&
                        ((s = a.mod.neg()), r && 0 !== s.negative && s.iadd(t)),
                      { div: i, mod: s })
                    : 0 === this.negative && 0 !== t.negative
                    ? ((a = this.divmod(t.neg(), e)),
                      "mod" !== e && (i = a.div.neg()),
                      { div: i, mod: a.mod })
                    : this.negative & t.negative
                    ? ((a = this.neg().divmod(t.neg(), e)),
                      "div" !== e &&
                        ((s = a.mod.neg()), r && 0 !== s.negative && s.isub(t)),
                      { div: a.div, mod: s })
                    : t.length > this.length || this.cmp(t) < 0
                    ? { div: new o(0), mod: this }
                    : 1 === t.length
                    ? "div" === e
                      ? { div: this.divn(t.words[0]), mod: null }
                      : "mod" === e
                      ? { div: null, mod: new o(this.modrn(t.words[0])) }
                      : {
                          div: this.divn(t.words[0]),
                          mod: new o(this.modrn(t.words[0])),
                        }
                    : this._wordDiv(t, e)
                );
                var i, s, a;
              }),
              (o.prototype.div = function (t) {
                return this.divmod(t, "div", !1).div;
              }),
              (o.prototype.mod = function (t) {
                return this.divmod(t, "mod", !1).mod;
              }),
              (o.prototype.umod = function (t) {
                return this.divmod(t, "mod", !0).mod;
              }),
              (o.prototype.divRound = function (t) {
                var e = this.divmod(t);
                if (e.mod.isZero()) return e.div;
                var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                  n = t.ushrn(1),
                  i = t.andln(1),
                  o = r.cmp(n);
                return o < 0 || (1 === i && 0 === o)
                  ? e.div
                  : 0 !== e.div.negative
                  ? e.div.isubn(1)
                  : e.div.iaddn(1);
              }),
              (o.prototype.modrn = function (t) {
                var e = t < 0;
                e && (t = -t), n(t <= 67108863);
                for (
                  var r = (1 << 26) % t, i = 0, o = this.length - 1;
                  o >= 0;
                  o--
                )
                  i = (r * i + (0 | this.words[o])) % t;
                return e ? -i : i;
              }),
              (o.prototype.modn = function (t) {
                return this.modrn(t);
              }),
              (o.prototype.idivn = function (t) {
                var e = t < 0;
                e && (t = -t), n(t <= 67108863);
                for (var r = 0, i = this.length - 1; i >= 0; i--) {
                  var o = (0 | this.words[i]) + 67108864 * r;
                  (this.words[i] = (o / t) | 0), (r = o % t);
                }
                return this._strip(), e ? this.ineg() : this;
              }),
              (o.prototype.divn = function (t) {
                return this.clone().idivn(t);
              }),
              (o.prototype.egcd = function (t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                  r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (
                  var i = new o(1),
                    s = new o(0),
                    a = new o(0),
                    c = new o(1),
                    u = 0;
                  e.isEven() && r.isEven();

                )
                  e.iushrn(1), r.iushrn(1), ++u;
                for (var h = r.clone(), l = e.clone(); !e.isZero(); ) {
                  for (
                    var d = 0, f = 1;
                    !(e.words[0] & f) && d < 26;
                    ++d, f <<= 1
                  );
                  if (d > 0)
                    for (e.iushrn(d); d-- > 0; )
                      (i.isOdd() || s.isOdd()) && (i.iadd(h), s.isub(l)),
                        i.iushrn(1),
                        s.iushrn(1);
                  for (
                    var p = 0, g = 1;
                    !(r.words[0] & g) && p < 26;
                    ++p, g <<= 1
                  );
                  if (p > 0)
                    for (r.iushrn(p); p-- > 0; )
                      (a.isOdd() || c.isOdd()) && (a.iadd(h), c.isub(l)),
                        a.iushrn(1),
                        c.iushrn(1);
                  e.cmp(r) >= 0
                    ? (e.isub(r), i.isub(a), s.isub(c))
                    : (r.isub(e), a.isub(i), c.isub(s));
                }
                return { a, b: c, gcd: r.iushln(u) };
              }),
              (o.prototype._invmp = function (t) {
                n(0 === t.negative), n(!t.isZero());
                var e = this,
                  r = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (
                  var i, s = new o(1), a = new o(0), c = r.clone();
                  e.cmpn(1) > 0 && r.cmpn(1) > 0;

                ) {
                  for (
                    var u = 0, h = 1;
                    !(e.words[0] & h) && u < 26;
                    ++u, h <<= 1
                  );
                  if (u > 0)
                    for (e.iushrn(u); u-- > 0; )
                      s.isOdd() && s.iadd(c), s.iushrn(1);
                  for (
                    var l = 0, d = 1;
                    !(r.words[0] & d) && l < 26;
                    ++l, d <<= 1
                  );
                  if (l > 0)
                    for (r.iushrn(l); l-- > 0; )
                      a.isOdd() && a.iadd(c), a.iushrn(1);
                  e.cmp(r) >= 0
                    ? (e.isub(r), s.isub(a))
                    : (r.isub(e), a.isub(s));
                }
                return (
                  (i = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && i.iadd(t), i
                );
              }),
              (o.prototype.gcd = function (t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var e = this.clone(),
                  r = t.clone();
                (e.negative = 0), (r.negative = 0);
                for (var n = 0; e.isEven() && r.isEven(); n++)
                  e.iushrn(1), r.iushrn(1);
                for (;;) {
                  for (; e.isEven(); ) e.iushrn(1);
                  for (; r.isEven(); ) r.iushrn(1);
                  var i = e.cmp(r);
                  if (i < 0) {
                    var o = e;
                    (e = r), (r = o);
                  } else if (0 === i || 0 === r.cmpn(1)) break;
                  e.isub(r);
                }
                return r.iushln(n);
              }),
              (o.prototype.invm = function (t) {
                return this.egcd(t).a.umod(t);
              }),
              (o.prototype.isEven = function () {
                return !(1 & this.words[0]);
              }),
              (o.prototype.isOdd = function () {
                return !(1 & ~this.words[0]);
              }),
              (o.prototype.andln = function (t) {
                return this.words[0] & t;
              }),
              (o.prototype.bincn = function (t) {
                n("number" == typeof t);
                var e = t % 26,
                  r = (t - e) / 26,
                  i = 1 << e;
                if (this.length <= r)
                  return this._expand(r + 1), (this.words[r] |= i), this;
                for (var o = i, s = r; 0 !== o && s < this.length; s++) {
                  var a = 0 | this.words[s];
                  (o = (a += o) >>> 26), (a &= 67108863), (this.words[s] = a);
                }
                return 0 !== o && ((this.words[s] = o), this.length++), this;
              }),
              (o.prototype.isZero = function () {
                return 1 === this.length && 0 === this.words[0];
              }),
              (o.prototype.cmpn = function (t) {
                var e,
                  r = t < 0;
                if (0 !== this.negative && !r) return -1;
                if (0 === this.negative && r) return 1;
                if ((this._strip(), this.length > 1)) e = 1;
                else {
                  r && (t = -t), n(t <= 67108863, "Number is too big");
                  var i = 0 | this.words[0];
                  e = i === t ? 0 : i < t ? -1 : 1;
                }
                return 0 !== this.negative ? 0 | -e : e;
              }),
              (o.prototype.cmp = function (t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e;
              }),
              (o.prototype.ucmp = function (t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var e = 0, r = this.length - 1; r >= 0; r--) {
                  var n = 0 | this.words[r],
                    i = 0 | t.words[r];
                  if (n !== i) {
                    n < i ? (e = -1) : n > i && (e = 1);
                    break;
                  }
                }
                return e;
              }),
              (o.prototype.gtn = function (t) {
                return 1 === this.cmpn(t);
              }),
              (o.prototype.gt = function (t) {
                return 1 === this.cmp(t);
              }),
              (o.prototype.gten = function (t) {
                return this.cmpn(t) >= 0;
              }),
              (o.prototype.gte = function (t) {
                return this.cmp(t) >= 0;
              }),
              (o.prototype.ltn = function (t) {
                return -1 === this.cmpn(t);
              }),
              (o.prototype.lt = function (t) {
                return -1 === this.cmp(t);
              }),
              (o.prototype.lten = function (t) {
                return this.cmpn(t) <= 0;
              }),
              (o.prototype.lte = function (t) {
                return this.cmp(t) <= 0;
              }),
              (o.prototype.eqn = function (t) {
                return 0 === this.cmpn(t);
              }),
              (o.prototype.eq = function (t) {
                return 0 === this.cmp(t);
              }),
              (o.red = function (t) {
                return new _(t);
              }),
              (o.prototype.toRed = function (t) {
                return (
                  n(!this.red, "Already a number in reduction context"),
                  n(0 === this.negative, "red works only with positives"),
                  t.convertTo(this)._forceRed(t)
                );
              }),
              (o.prototype.fromRed = function () {
                return (
                  n(
                    this.red,
                    "fromRed works only with numbers in reduction context"
                  ),
                  this.red.convertFrom(this)
                );
              }),
              (o.prototype._forceRed = function (t) {
                return (this.red = t), this;
              }),
              (o.prototype.forceRed = function (t) {
                return (
                  n(!this.red, "Already a number in reduction context"),
                  this._forceRed(t)
                );
              }),
              (o.prototype.redAdd = function (t) {
                return (
                  n(this.red, "redAdd works only with red numbers"),
                  this.red.add(this, t)
                );
              }),
              (o.prototype.redIAdd = function (t) {
                return (
                  n(this.red, "redIAdd works only with red numbers"),
                  this.red.iadd(this, t)
                );
              }),
              (o.prototype.redSub = function (t) {
                return (
                  n(this.red, "redSub works only with red numbers"),
                  this.red.sub(this, t)
                );
              }),
              (o.prototype.redISub = function (t) {
                return (
                  n(this.red, "redISub works only with red numbers"),
                  this.red.isub(this, t)
                );
              }),
              (o.prototype.redShl = function (t) {
                return (
                  n(this.red, "redShl works only with red numbers"),
                  this.red.shl(this, t)
                );
              }),
              (o.prototype.redMul = function (t) {
                return (
                  n(this.red, "redMul works only with red numbers"),
                  this.red._verify2(this, t),
                  this.red.mul(this, t)
                );
              }),
              (o.prototype.redIMul = function (t) {
                return (
                  n(this.red, "redMul works only with red numbers"),
                  this.red._verify2(this, t),
                  this.red.imul(this, t)
                );
              }),
              (o.prototype.redSqr = function () {
                return (
                  n(this.red, "redSqr works only with red numbers"),
                  this.red._verify1(this),
                  this.red.sqr(this)
                );
              }),
              (o.prototype.redISqr = function () {
                return (
                  n(this.red, "redISqr works only with red numbers"),
                  this.red._verify1(this),
                  this.red.isqr(this)
                );
              }),
              (o.prototype.redSqrt = function () {
                return (
                  n(this.red, "redSqrt works only with red numbers"),
                  this.red._verify1(this),
                  this.red.sqrt(this)
                );
              }),
              (o.prototype.redInvm = function () {
                return (
                  n(this.red, "redInvm works only with red numbers"),
                  this.red._verify1(this),
                  this.red.invm(this)
                );
              }),
              (o.prototype.redNeg = function () {
                return (
                  n(this.red, "redNeg works only with red numbers"),
                  this.red._verify1(this),
                  this.red.neg(this)
                );
              }),
              (o.prototype.redPow = function (t) {
                return (
                  n(this.red && !t.red, "redPow(normalNum)"),
                  this.red._verify1(this),
                  this.red.pow(this, t)
                );
              });
            var k = { k256: null, p224: null, p192: null, p25519: null };
            function v(t, e) {
              (this.name = t),
                (this.p = new o(e, 16)),
                (this.n = this.p.bitLength()),
                (this.k = new o(1).iushln(this.n).isub(this.p)),
                (this.tmp = this._tmp());
            }
            function S() {
              v.call(
                this,
                "k256",
                "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
              );
            }
            function I() {
              v.call(
                this,
                "p224",
                "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
              );
            }
            function A() {
              v.call(
                this,
                "p192",
                "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
              );
            }
            function E() {
              v.call(
                this,
                "25519",
                "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
              );
            }
            function _(t) {
              if ("string" == typeof t) {
                var e = o._prime(t);
                (this.m = e.p), (this.prime = e);
              } else
                n(t.gtn(1), "modulus must be greater than 1"),
                  (this.m = t),
                  (this.prime = null);
            }
            function B(t) {
              _.call(this, t),
                (this.shift = this.m.bitLength()),
                this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
                (this.r = new o(1).iushln(this.shift)),
                (this.r2 = this.imod(this.r.sqr())),
                (this.rinv = this.r._invmp(this.m)),
                (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
                (this.minv = this.minv.umod(this.r)),
                (this.minv = this.r.sub(this.minv));
            }
            (v.prototype._tmp = function () {
              var t = new o(null);
              return (t.words = new Array(Math.ceil(this.n / 13))), t;
            }),
              (v.prototype.ireduce = function (t) {
                var e,
                  r = t;
                do {
                  this.split(r, this.tmp),
                    (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
                } while (e > this.n);
                var n = e < this.n ? -1 : r.ucmp(this.p);
                return (
                  0 === n
                    ? ((r.words[0] = 0), (r.length = 1))
                    : n > 0
                    ? r.isub(this.p)
                    : void 0 !== r.strip
                    ? r.strip()
                    : r._strip(),
                  r
                );
              }),
              (v.prototype.split = function (t, e) {
                t.iushrn(this.n, 0, e);
              }),
              (v.prototype.imulK = function (t) {
                return t.imul(this.k);
              }),
              i(S, v),
              (S.prototype.split = function (t, e) {
                for (
                  var r = 4194303, n = Math.min(t.length, 9), i = 0;
                  i < n;
                  i++
                )
                  e.words[i] = t.words[i];
                if (((e.length = n), t.length <= 9))
                  return (t.words[0] = 0), void (t.length = 1);
                var o = t.words[9];
                for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
                  var s = 0 | t.words[i];
                  (t.words[i - 10] = ((s & r) << 4) | (o >>> 22)), (o = s);
                }
                (o >>>= 22),
                  (t.words[i - 10] = o),
                  0 === o && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
              }),
              (S.prototype.imulK = function (t) {
                (t.words[t.length] = 0),
                  (t.words[t.length + 1] = 0),
                  (t.length += 2);
                for (var e = 0, r = 0; r < t.length; r++) {
                  var n = 0 | t.words[r];
                  (e += 977 * n),
                    (t.words[r] = 67108863 & e),
                    (e = 64 * n + ((e / 67108864) | 0));
                }
                return (
                  0 === t.words[t.length - 1] &&
                    (t.length--, 0 === t.words[t.length - 1] && t.length--),
                  t
                );
              }),
              i(I, v),
              i(A, v),
              i(E, v),
              (E.prototype.imulK = function (t) {
                for (var e = 0, r = 0; r < t.length; r++) {
                  var n = 19 * (0 | t.words[r]) + e,
                    i = 67108863 & n;
                  (n >>>= 26), (t.words[r] = i), (e = n);
                }
                return 0 !== e && (t.words[t.length++] = e), t;
              }),
              (o._prime = function (t) {
                if (k[t]) return k[t];
                var e;
                if ("k256" === t) e = new S();
                else if ("p224" === t) e = new I();
                else if ("p192" === t) e = new A();
                else {
                  if ("p25519" !== t) throw new Error("Unknown prime " + t);
                  e = new E();
                }
                return (k[t] = e), e;
              }),
              (_.prototype._verify1 = function (t) {
                n(0 === t.negative, "red works only with positives"),
                  n(t.red, "red works only with red numbers");
              }),
              (_.prototype._verify2 = function (t, e) {
                n(!(t.negative | e.negative), "red works only with positives"),
                  n(
                    t.red && t.red === e.red,
                    "red works only with red numbers"
                  );
              }),
              (_.prototype.imod = function (t) {
                return this.prime
                  ? this.prime.ireduce(t)._forceRed(this)
                  : (h(t, t.umod(this.m)._forceRed(this)), t);
              }),
              (_.prototype.neg = function (t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
              }),
              (_.prototype.add = function (t, e) {
                this._verify2(t, e);
                var r = t.add(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
              }),
              (_.prototype.iadd = function (t, e) {
                this._verify2(t, e);
                var r = t.iadd(e);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r;
              }),
              (_.prototype.sub = function (t, e) {
                this._verify2(t, e);
                var r = t.sub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
              }),
              (_.prototype.isub = function (t, e) {
                this._verify2(t, e);
                var r = t.isub(e);
                return r.cmpn(0) < 0 && r.iadd(this.m), r;
              }),
              (_.prototype.shl = function (t, e) {
                return this._verify1(t), this.imod(t.ushln(e));
              }),
              (_.prototype.imul = function (t, e) {
                return this._verify2(t, e), this.imod(t.imul(e));
              }),
              (_.prototype.mul = function (t, e) {
                return this._verify2(t, e), this.imod(t.mul(e));
              }),
              (_.prototype.isqr = function (t) {
                return this.imul(t, t.clone());
              }),
              (_.prototype.sqr = function (t) {
                return this.mul(t, t);
              }),
              (_.prototype.sqrt = function (t) {
                if (t.isZero()) return t.clone();
                var e = this.m.andln(3);
                if ((n(e % 2 == 1), 3 === e)) {
                  var r = this.m.add(new o(1)).iushrn(2);
                  return this.pow(t, r);
                }
                for (
                  var i = this.m.subn(1), s = 0;
                  !i.isZero() && 0 === i.andln(1);

                )
                  s++, i.iushrn(1);
                n(!i.isZero());
                var a = new o(1).toRed(this),
                  c = a.redNeg(),
                  u = this.m.subn(1).iushrn(1),
                  h = this.m.bitLength();
                for (
                  h = new o(2 * h * h).toRed(this);
                  0 !== this.pow(h, u).cmp(c);

                )
                  h.redIAdd(c);
                for (
                  var l = this.pow(h, i),
                    d = this.pow(t, i.addn(1).iushrn(1)),
                    f = this.pow(t, i),
                    p = s;
                  0 !== f.cmp(a);

                ) {
                  for (var g = f, m = 0; 0 !== g.cmp(a); m++) g = g.redSqr();
                  n(m < p);
                  var y = this.pow(l, new o(1).iushln(p - m - 1));
                  (d = d.redMul(y)),
                    (l = y.redSqr()),
                    (f = f.redMul(l)),
                    (p = m);
                }
                return d;
              }),
              (_.prototype.invm = function (t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative
                  ? ((e.negative = 0), this.imod(e).redNeg())
                  : this.imod(e);
              }),
              (_.prototype.pow = function (t, e) {
                if (e.isZero()) return new o(1).toRed(this);
                if (0 === e.cmpn(1)) return t.clone();
                var r = new Array(16);
                (r[0] = new o(1).toRed(this)), (r[1] = t);
                for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
                var i = r[0],
                  s = 0,
                  a = 0,
                  c = e.bitLength() % 26;
                for (0 === c && (c = 26), n = e.length - 1; n >= 0; n--) {
                  for (var u = e.words[n], h = c - 1; h >= 0; h--) {
                    var l = (u >> h) & 1;
                    i !== r[0] && (i = this.sqr(i)),
                      0 !== l || 0 !== s
                        ? ((s <<= 1),
                          (s |= l),
                          (4 == ++a || (0 === n && 0 === h)) &&
                            ((i = this.mul(i, r[s])), (a = 0), (s = 0)))
                        : (a = 0);
                  }
                  c = 26;
                }
                return i;
              }),
              (_.prototype.convertTo = function (t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e;
              }),
              (_.prototype.convertFrom = function (t) {
                var e = t.clone();
                return (e.red = null), e;
              }),
              (o.mont = function (t) {
                return new B(t);
              }),
              i(B, _),
              (B.prototype.convertTo = function (t) {
                return this.imod(t.ushln(this.shift));
              }),
              (B.prototype.convertFrom = function (t) {
                var e = this.imod(t.mul(this.rinv));
                return (e.red = null), e;
              }),
              (B.prototype.imul = function (t, e) {
                if (t.isZero() || e.isZero())
                  return (t.words[0] = 0), (t.length = 1), t;
                var r = t.imul(e),
                  n = r
                    .maskn(this.shift)
                    .mul(this.minv)
                    .imaskn(this.shift)
                    .mul(this.m),
                  i = r.isub(n).iushrn(this.shift),
                  o = i;
                return (
                  i.cmp(this.m) >= 0
                    ? (o = i.isub(this.m))
                    : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
                  o._forceRed(this)
                );
              }),
              (B.prototype.mul = function (t, e) {
                if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                var r = t.mul(e),
                  n = r
                    .maskn(this.shift)
                    .mul(this.minv)
                    .imaskn(this.shift)
                    .mul(this.m),
                  i = r.isub(n).iushrn(this.shift),
                  s = i;
                return (
                  i.cmp(this.m) >= 0
                    ? (s = i.isub(this.m))
                    : i.cmpn(0) < 0 && (s = i.iadd(this.m)),
                  s._forceRed(this)
                );
              }),
              (B.prototype.invm = function (t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
              });
          })((t = r.nmd(t)), this);
        },
        755: function (t, e, r) {
          "use strict";
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(t, n, {
                        enumerable: !0,
                        get: function () {
                          return e[r];
                        },
                      });
                  }
                : function (t, e, r, n) {
                    void 0 === n && (n = r), (t[n] = e[r]);
                  }),
            i =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (t, e) {
                    Object.defineProperty(t, "default", {
                      enumerable: !0,
                      value: e,
                    });
                  }
                : function (t, e) {
                    t.default = e;
                  }),
            o =
              (this && this.__decorate) ||
              function (t, e, r, n) {
                var i,
                  o = arguments.length,
                  s =
                    o < 3
                      ? e
                      : null === n
                      ? (n = Object.getOwnPropertyDescriptor(e, r))
                      : n;
                if (
                  "object" == typeof Reflect &&
                  "function" == typeof Reflect.decorate
                )
                  s = Reflect.decorate(t, e, r, n);
                else
                  for (var a = t.length - 1; a >= 0; a--)
                    (i = t[a]) &&
                      (s = (o < 3 ? i(s) : o > 3 ? i(e, r, s) : i(e, r)) || s);
                return o > 3 && s && Object.defineProperty(e, r, s), s;
              },
            s =
              (this && this.__importStar) ||
              function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                  for (var r in t)
                    "default" !== r &&
                      Object.hasOwnProperty.call(t, r) &&
                      n(e, t, r);
                return i(e, t), e;
              },
            a =
              (this && this.__importDefault) ||
              function (t) {
                return t && t.__esModule ? t : { default: t };
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.deserializeUnchecked =
              e.deserialize =
              e.serialize =
              e.BinaryReader =
              e.BinaryWriter =
              e.BorshError =
              e.baseDecode =
              e.baseEncode =
                void 0);
          const c = a(r(404)),
            u = a(r(763)),
            h = s(r(281)),
            l = new (
              "function" != typeof TextDecoder ? h.TextDecoder : TextDecoder
            )("utf-8", { fatal: !0 });
          (e.baseEncode = function (t) {
            return (
              "string" == typeof t && (t = Buffer.from(t, "utf8")),
              u.default.encode(Buffer.from(t))
            );
          }),
            (e.baseDecode = function (t) {
              return Buffer.from(u.default.decode(t));
            });
          const d = 1024;
          class f extends Error {
            constructor(t) {
              super(t), (this.fieldPath = []), (this.originalMessage = t);
            }
            addToFieldPath(t) {
              this.fieldPath.splice(0, 0, t),
                (this.message =
                  this.originalMessage + ": " + this.fieldPath.join("."));
            }
          }
          e.BorshError = f;
          class p {
            constructor() {
              (this.buf = Buffer.alloc(d)), (this.length = 0);
            }
            maybeResize() {
              this.buf.length < 16 + this.length &&
                (this.buf = Buffer.concat([this.buf, Buffer.alloc(d)]));
            }
            writeU8(t) {
              this.maybeResize(),
                this.buf.writeUInt8(t, this.length),
                (this.length += 1);
            }
            writeU16(t) {
              this.maybeResize(),
                this.buf.writeUInt16LE(t, this.length),
                (this.length += 2);
            }
            writeU32(t) {
              this.maybeResize(),
                this.buf.writeUInt32LE(t, this.length),
                (this.length += 4);
            }
            writeU64(t) {
              this.maybeResize(),
                this.writeBuffer(
                  Buffer.from(new c.default(t).toArray("le", 8))
                );
            }
            writeU128(t) {
              this.maybeResize(),
                this.writeBuffer(
                  Buffer.from(new c.default(t).toArray("le", 16))
                );
            }
            writeU256(t) {
              this.maybeResize(),
                this.writeBuffer(
                  Buffer.from(new c.default(t).toArray("le", 32))
                );
            }
            writeU512(t) {
              this.maybeResize(),
                this.writeBuffer(
                  Buffer.from(new c.default(t).toArray("le", 64))
                );
            }
            writeBuffer(t) {
              (this.buf = Buffer.concat([
                Buffer.from(this.buf.subarray(0, this.length)),
                t,
                Buffer.alloc(d),
              ])),
                (this.length += t.length);
            }
            writeString(t) {
              this.maybeResize();
              const e = Buffer.from(t, "utf8");
              this.writeU32(e.length), this.writeBuffer(e);
            }
            writeFixedArray(t) {
              this.writeBuffer(Buffer.from(t));
            }
            writeArray(t, e) {
              this.maybeResize(), this.writeU32(t.length);
              for (const r of t) this.maybeResize(), e(r);
            }
            toArray() {
              return this.buf.subarray(0, this.length);
            }
          }
          function g(t, e, r) {
            const n = r.value;
            r.value = function (...t) {
              try {
                return n.apply(this, t);
              } catch (t) {
                if (t instanceof RangeError) {
                  const e = t.code;
                  if (
                    ["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(
                      e
                    ) >= 0
                  )
                    throw new f("Reached the end of buffer when deserializing");
                }
                throw t;
              }
            };
          }
          e.BinaryWriter = p;
          class m {
            constructor(t) {
              (this.buf = t), (this.offset = 0);
            }
            readU8() {
              const t = this.buf.readUInt8(this.offset);
              return (this.offset += 1), t;
            }
            readU16() {
              const t = this.buf.readUInt16LE(this.offset);
              return (this.offset += 2), t;
            }
            readU32() {
              const t = this.buf.readUInt32LE(this.offset);
              return (this.offset += 4), t;
            }
            readU64() {
              const t = this.readBuffer(8);
              return new c.default(t, "le");
            }
            readU128() {
              const t = this.readBuffer(16);
              return new c.default(t, "le");
            }
            readU256() {
              const t = this.readBuffer(32);
              return new c.default(t, "le");
            }
            readU512() {
              const t = this.readBuffer(64);
              return new c.default(t, "le");
            }
            readBuffer(t) {
              if (this.offset + t > this.buf.length)
                throw new f(`Expected buffer length ${t} isn't within bounds`);
              const e = this.buf.slice(this.offset, this.offset + t);
              return (this.offset += t), e;
            }
            readString() {
              const t = this.readU32(),
                e = this.readBuffer(t);
              try {
                return l.decode(e);
              } catch (t) {
                throw new f(`Error decoding UTF-8 string: ${t}`);
              }
            }
            readFixedArray(t) {
              return new Uint8Array(this.readBuffer(t));
            }
            readArray(t) {
              const e = this.readU32(),
                r = Array();
              for (let n = 0; n < e; ++n) r.push(t());
              return r;
            }
          }
          function y(t) {
            return t.charAt(0).toUpperCase() + t.slice(1);
          }
          function b(t, e, r, n, i) {
            try {
              if ("string" == typeof n) i[`write${y(n)}`](r);
              else if (n instanceof Array)
                if ("number" == typeof n[0]) {
                  if (r.length !== n[0])
                    throw new f(
                      `Expecting byte array of length ${n[0]}, but got ${r.length} bytes`
                    );
                  i.writeFixedArray(r);
                } else if (2 === n.length && "number" == typeof n[1]) {
                  if (r.length !== n[1])
                    throw new f(
                      `Expecting byte array of length ${n[1]}, but got ${r.length} bytes`
                    );
                  for (let e = 0; e < n[1]; e++) b(t, null, r[e], n[0], i);
                } else
                  i.writeArray(r, (r) => {
                    b(t, e, r, n[0], i);
                  });
              else if (void 0 !== n.kind)
                switch (n.kind) {
                  case "option":
                    null == r
                      ? i.writeU8(0)
                      : (i.writeU8(1), b(t, e, r, n.type, i));
                    break;
                  case "map":
                    i.writeU32(r.size),
                      r.forEach((r, o) => {
                        b(t, e, o, n.key, i), b(t, e, r, n.value, i);
                      });
                    break;
                  default:
                    throw new f(`FieldType ${n} unrecognized`);
                }
              else w(t, r, i);
            } catch (t) {
              throw (t instanceof f && t.addToFieldPath(e), t);
            }
          }
          function w(t, e, r) {
            if ("function" == typeof e.borshSerialize)
              return void e.borshSerialize(r);
            const n = t.get(e.constructor);
            if (!n)
              throw new f(`Class ${e.constructor.name} is missing in schema`);
            if ("struct" === n.kind)
              n.fields.map(([n, i]) => {
                b(t, n, e[n], i, r);
              });
            else {
              if ("enum" !== n.kind)
                throw new f(
                  `Unexpected schema kind: ${n.kind} for ${e.constructor.name}`
                );
              {
                const i = e[n.field];
                for (let o = 0; o < n.values.length; ++o) {
                  const [s, a] = n.values[o];
                  if (s === i) {
                    r.writeU8(o), b(t, s, e[s], a, r);
                    break;
                  }
                }
              }
            }
          }
          function k(t, e, r, n) {
            try {
              if ("string" == typeof r) return n[`read${y(r)}`]();
              if (r instanceof Array) {
                if ("number" == typeof r[0]) return n.readFixedArray(r[0]);
                if ("number" == typeof r[1]) {
                  const e = [];
                  for (let i = 0; i < r[1]; i++) e.push(k(t, null, r[0], n));
                  return e;
                }
                return n.readArray(() => k(t, e, r[0], n));
              }
              if ("option" === r.kind)
                return n.readU8() ? k(t, e, r.type, n) : void 0;
              if ("map" === r.kind) {
                let i = new Map();
                const o = n.readU32();
                for (let s = 0; s < o; s++) {
                  const o = k(t, e, r.key, n),
                    s = k(t, e, r.value, n);
                  i.set(o, s);
                }
                return i;
              }
              return v(t, r, n);
            } catch (t) {
              throw (t instanceof f && t.addToFieldPath(e), t);
            }
          }
          function v(t, e, r) {
            if ("function" == typeof e.borshDeserialize)
              return e.borshDeserialize(r);
            const n = t.get(e);
            if (!n) throw new f(`Class ${e.name} is missing in schema`);
            if ("struct" === n.kind) {
              const n = {};
              for (const [i, o] of t.get(e).fields) n[i] = k(t, i, o, r);
              return new e(n);
            }
            if ("enum" === n.kind) {
              const i = r.readU8();
              if (i >= n.values.length)
                throw new f(`Enum index: ${i} is out of range`);
              const [o, s] = n.values[i],
                a = k(t, o, s, r);
              return new e({ [o]: a });
            }
            throw new f(
              `Unexpected schema kind: ${n.kind} for ${e.constructor.name}`
            );
          }
          o([g], m.prototype, "readU8", null),
            o([g], m.prototype, "readU16", null),
            o([g], m.prototype, "readU32", null),
            o([g], m.prototype, "readU64", null),
            o([g], m.prototype, "readU128", null),
            o([g], m.prototype, "readU256", null),
            o([g], m.prototype, "readU512", null),
            o([g], m.prototype, "readString", null),
            o([g], m.prototype, "readFixedArray", null),
            o([g], m.prototype, "readArray", null),
            (e.BinaryReader = m),
            (e.serialize = function (t, e, r = p) {
              const n = new r();
              return w(t, e, n), n.toArray();
            }),
            (e.deserialize = function (t, e, r, n = m) {
              const i = new n(r),
                o = v(t, e, i);
              if (i.offset < r.length)
                throw new f(
                  `Unexpected ${
                    r.length - i.offset
                  } bytes after deserialized data`
                );
              return o;
            }),
            (e.deserializeUnchecked = function (t, e, r, n = m) {
              return v(t, e, new n(r));
            });
        },
        763: (t, e, r) => {
          var n = r(364);
          t.exports = n(
            "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
          );
        },
        287: (t, e, r) => {
          "use strict";
          const n = r(526),
            i = r(251),
            o =
              "function" == typeof Symbol && "function" == typeof Symbol.for
                ? Symbol.for("nodejs.util.inspect.custom")
                : null;
          (e.Buffer = c),
            (e.SlowBuffer = function (t) {
              return +t != t && (t = 0), c.alloc(+t);
            }),
            (e.INSPECT_MAX_BYTES = 50);
          const s = 2147483647;
          function a(t) {
            if (t > s)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
            const e = new Uint8Array(t);
            return Object.setPrototypeOf(e, c.prototype), e;
          }
          function c(t, e, r) {
            if ("number" == typeof t) {
              if ("string" == typeof e)
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              return l(t);
            }
            return u(t, e, r);
          }
          function u(t, e, r) {
            if ("string" == typeof t)
              return (function (t, e) {
                if (
                  (("string" == typeof e && "" !== e) || (e = "utf8"),
                  !c.isEncoding(e))
                )
                  throw new TypeError("Unknown encoding: " + e);
                const r = 0 | g(t, e);
                let n = a(r);
                const i = n.write(t, e);
                return i !== r && (n = n.slice(0, i)), n;
              })(t, e);
            if (ArrayBuffer.isView(t))
              return (function (t) {
                if (Y(t, Uint8Array)) {
                  const e = new Uint8Array(t);
                  return f(e.buffer, e.byteOffset, e.byteLength);
                }
                return d(t);
              })(t);
            if (null == t)
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof t
              );
            if (Y(t, ArrayBuffer) || (t && Y(t.buffer, ArrayBuffer)))
              return f(t, e, r);
            if (
              "undefined" != typeof SharedArrayBuffer &&
              (Y(t, SharedArrayBuffer) || (t && Y(t.buffer, SharedArrayBuffer)))
            )
              return f(t, e, r);
            if ("number" == typeof t)
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            const n = t.valueOf && t.valueOf();
            if (null != n && n !== t) return c.from(n, e, r);
            const i = (function (t) {
              if (c.isBuffer(t)) {
                const e = 0 | p(t.length),
                  r = a(e);
                return 0 === r.length || t.copy(r, 0, 0, e), r;
              }
              return void 0 !== t.length
                ? "number" != typeof t.length || Z(t.length)
                  ? a(0)
                  : d(t)
                : "Buffer" === t.type && Array.isArray(t.data)
                ? d(t.data)
                : void 0;
            })(t);
            if (i) return i;
            if (
              "undefined" != typeof Symbol &&
              null != Symbol.toPrimitive &&
              "function" == typeof t[Symbol.toPrimitive]
            )
              return c.from(t[Symbol.toPrimitive]("string"), e, r);
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof t
            );
          }
          function h(t) {
            if ("number" != typeof t)
              throw new TypeError('"size" argument must be of type number');
            if (t < 0)
              throw new RangeError(
                'The value "' + t + '" is invalid for option "size"'
              );
          }
          function l(t) {
            return h(t), a(t < 0 ? 0 : 0 | p(t));
          }
          function d(t) {
            const e = t.length < 0 ? 0 : 0 | p(t.length),
              r = a(e);
            for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
            return r;
          }
          function f(t, e, r) {
            if (e < 0 || t.byteLength < e)
              throw new RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < e + (r || 0))
              throw new RangeError('"length" is outside of buffer bounds');
            let n;
            return (
              (n =
                void 0 === e && void 0 === r
                  ? new Uint8Array(t)
                  : void 0 === r
                  ? new Uint8Array(t, e)
                  : new Uint8Array(t, e, r)),
              Object.setPrototypeOf(n, c.prototype),
              n
            );
          }
          function p(t) {
            if (t >= s)
              throw new RangeError(
                "Attempt to allocate Buffer larger than maximum size: 0x" +
                  s.toString(16) +
                  " bytes"
              );
            return 0 | t;
          }
          function g(t, e) {
            if (c.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || Y(t, ArrayBuffer)) return t.byteLength;
            if ("string" != typeof t)
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                  typeof t
              );
            const r = t.length,
              n = arguments.length > 2 && !0 === arguments[2];
            if (!n && 0 === r) return 0;
            let i = !1;
            for (;;)
              switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                  return r;
                case "utf8":
                case "utf-8":
                  return $(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return 2 * r;
                case "hex":
                  return r >>> 1;
                case "base64":
                  return V(t).length;
                default:
                  if (i) return n ? -1 : $(t).length;
                  (e = ("" + e).toLowerCase()), (i = !0);
              }
          }
          function m(t, e, r) {
            let n = !1;
            if (((void 0 === e || e < 0) && (e = 0), e > this.length))
              return "";
            if (
              ((void 0 === r || r > this.length) && (r = this.length), r <= 0)
            )
              return "";
            if ((r >>>= 0) <= (e >>>= 0)) return "";
            for (t || (t = "utf8"); ; )
              switch (t) {
                case "hex":
                  return P(this, e, r);
                case "utf8":
                case "utf-8":
                  return _(this, e, r);
                case "ascii":
                  return x(this, e, r);
                case "latin1":
                case "binary":
                  return M(this, e, r);
                case "base64":
                  return E(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return R(this, e, r);
                default:
                  if (n) throw new TypeError("Unknown encoding: " + t);
                  (t = (t + "").toLowerCase()), (n = !0);
              }
          }
          function y(t, e, r) {
            const n = t[e];
            (t[e] = t[r]), (t[r] = n);
          }
          function b(t, e, r, n, i) {
            if (0 === t.length) return -1;
            if (
              ("string" == typeof r
                ? ((n = r), (r = 0))
                : r > 2147483647
                ? (r = 2147483647)
                : r < -2147483648 && (r = -2147483648),
              Z((r = +r)) && (r = i ? 0 : t.length - 1),
              r < 0 && (r = t.length + r),
              r >= t.length)
            ) {
              if (i) return -1;
              r = t.length - 1;
            } else if (r < 0) {
              if (!i) return -1;
              r = 0;
            }
            if (("string" == typeof e && (e = c.from(e, n)), c.isBuffer(e)))
              return 0 === e.length ? -1 : w(t, e, r, n, i);
            if ("number" == typeof e)
              return (
                (e &= 255),
                "function" == typeof Uint8Array.prototype.indexOf
                  ? i
                    ? Uint8Array.prototype.indexOf.call(t, e, r)
                    : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                  : w(t, [e], r, n, i)
              );
            throw new TypeError("val must be string, number or Buffer");
          }
          function w(t, e, r, n, i) {
            let o,
              s = 1,
              a = t.length,
              c = e.length;
            if (
              void 0 !== n &&
              ("ucs2" === (n = String(n).toLowerCase()) ||
                "ucs-2" === n ||
                "utf16le" === n ||
                "utf-16le" === n)
            ) {
              if (t.length < 2 || e.length < 2) return -1;
              (s = 2), (a /= 2), (c /= 2), (r /= 2);
            }
            function u(t, e) {
              return 1 === s ? t[e] : t.readUInt16BE(e * s);
            }
            if (i) {
              let n = -1;
              for (o = r; o < a; o++)
                if (u(t, o) === u(e, -1 === n ? 0 : o - n)) {
                  if ((-1 === n && (n = o), o - n + 1 === c)) return n * s;
                } else -1 !== n && (o -= o - n), (n = -1);
            } else
              for (r + c > a && (r = a - c), o = r; o >= 0; o--) {
                let r = !0;
                for (let n = 0; n < c; n++)
                  if (u(t, o + n) !== u(e, n)) {
                    r = !1;
                    break;
                  }
                if (r) return o;
              }
            return -1;
          }
          function k(t, e, r, n) {
            r = Number(r) || 0;
            const i = t.length - r;
            n ? (n = Number(n)) > i && (n = i) : (n = i);
            const o = e.length;
            let s;
            for (n > o / 2 && (n = o / 2), s = 0; s < n; ++s) {
              const n = parseInt(e.substr(2 * s, 2), 16);
              if (Z(n)) return s;
              t[r + s] = n;
            }
            return s;
          }
          function v(t, e, r, n) {
            return G($(e, t.length - r), t, r, n);
          }
          function S(t, e, r, n) {
            return G(
              (function (t) {
                const e = [];
                for (let r = 0; r < t.length; ++r)
                  e.push(255 & t.charCodeAt(r));
                return e;
              })(e),
              t,
              r,
              n
            );
          }
          function I(t, e, r, n) {
            return G(V(e), t, r, n);
          }
          function A(t, e, r, n) {
            return G(
              (function (t, e) {
                let r, n, i;
                const o = [];
                for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
                  (r = t.charCodeAt(s)),
                    (n = r >> 8),
                    (i = r % 256),
                    o.push(i),
                    o.push(n);
                return o;
              })(e, t.length - r),
              t,
              r,
              n
            );
          }
          function E(t, e, r) {
            return 0 === e && r === t.length
              ? n.fromByteArray(t)
              : n.fromByteArray(t.slice(e, r));
          }
          function _(t, e, r) {
            r = Math.min(t.length, r);
            const n = [];
            let i = e;
            for (; i < r; ) {
              const e = t[i];
              let o = null,
                s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
              if (i + s <= r) {
                let r, n, a, c;
                switch (s) {
                  case 1:
                    e < 128 && (o = e);
                    break;
                  case 2:
                    (r = t[i + 1]),
                      128 == (192 & r) &&
                        ((c = ((31 & e) << 6) | (63 & r)), c > 127 && (o = c));
                    break;
                  case 3:
                    (r = t[i + 1]),
                      (n = t[i + 2]),
                      128 == (192 & r) &&
                        128 == (192 & n) &&
                        ((c = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)),
                        c > 2047 && (c < 55296 || c > 57343) && (o = c));
                    break;
                  case 4:
                    (r = t[i + 1]),
                      (n = t[i + 2]),
                      (a = t[i + 3]),
                      128 == (192 & r) &&
                        128 == (192 & n) &&
                        128 == (192 & a) &&
                        ((c =
                          ((15 & e) << 18) |
                          ((63 & r) << 12) |
                          ((63 & n) << 6) |
                          (63 & a)),
                        c > 65535 && c < 1114112 && (o = c));
                }
              }
              null === o
                ? ((o = 65533), (s = 1))
                : o > 65535 &&
                  ((o -= 65536),
                  n.push(((o >>> 10) & 1023) | 55296),
                  (o = 56320 | (1023 & o))),
                n.push(o),
                (i += s);
            }
            return (function (t) {
              const e = t.length;
              if (e <= B) return String.fromCharCode.apply(String, t);
              let r = "",
                n = 0;
              for (; n < e; )
                r += String.fromCharCode.apply(String, t.slice(n, (n += B)));
              return r;
            })(n);
          }
          (e.kMaxLength = s),
            (c.TYPED_ARRAY_SUPPORT = (function () {
              try {
                const t = new Uint8Array(1),
                  e = {
                    foo: function () {
                      return 42;
                    },
                  };
                return (
                  Object.setPrototypeOf(e, Uint8Array.prototype),
                  Object.setPrototypeOf(t, e),
                  42 === t.foo()
                );
              } catch (t) {
                return !1;
              }
            })()),
            c.TYPED_ARRAY_SUPPORT ||
              "undefined" == typeof console ||
              "function" != typeof console.error ||
              console.error(
                "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
              ),
            Object.defineProperty(c.prototype, "parent", {
              enumerable: !0,
              get: function () {
                if (c.isBuffer(this)) return this.buffer;
              },
            }),
            Object.defineProperty(c.prototype, "offset", {
              enumerable: !0,
              get: function () {
                if (c.isBuffer(this)) return this.byteOffset;
              },
            }),
            (c.poolSize = 8192),
            (c.from = function (t, e, r) {
              return u(t, e, r);
            }),
            Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
            Object.setPrototypeOf(c, Uint8Array),
            (c.alloc = function (t, e, r) {
              return (function (t, e, r) {
                return (
                  h(t),
                  t <= 0
                    ? a(t)
                    : void 0 !== e
                    ? "string" == typeof r
                      ? a(t).fill(e, r)
                      : a(t).fill(e)
                    : a(t)
                );
              })(t, e, r);
            }),
            (c.allocUnsafe = function (t) {
              return l(t);
            }),
            (c.allocUnsafeSlow = function (t) {
              return l(t);
            }),
            (c.isBuffer = function (t) {
              return null != t && !0 === t._isBuffer && t !== c.prototype;
            }),
            (c.compare = function (t, e) {
              if (
                (Y(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                Y(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)),
                !c.isBuffer(t) || !c.isBuffer(e))
              )
                throw new TypeError(
                  'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                );
              if (t === e) return 0;
              let r = t.length,
                n = e.length;
              for (let i = 0, o = Math.min(r, n); i < o; ++i)
                if (t[i] !== e[i]) {
                  (r = t[i]), (n = e[i]);
                  break;
                }
              return r < n ? -1 : n < r ? 1 : 0;
            }),
            (c.isEncoding = function (t) {
              switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return !0;
                default:
                  return !1;
              }
            }),
            (c.concat = function (t, e) {
              if (!Array.isArray(t))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              if (0 === t.length) return c.alloc(0);
              let r;
              if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
              const n = c.allocUnsafe(e);
              let i = 0;
              for (r = 0; r < t.length; ++r) {
                let e = t[r];
                if (Y(e, Uint8Array))
                  i + e.length > n.length
                    ? (c.isBuffer(e) || (e = c.from(e)), e.copy(n, i))
                    : Uint8Array.prototype.set.call(n, e, i);
                else {
                  if (!c.isBuffer(e))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  e.copy(n, i);
                }
                i += e.length;
              }
              return n;
            }),
            (c.byteLength = g),
            (c.prototype._isBuffer = !0),
            (c.prototype.swap16 = function () {
              const t = this.length;
              if (t % 2 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 16-bits"
                );
              for (let e = 0; e < t; e += 2) y(this, e, e + 1);
              return this;
            }),
            (c.prototype.swap32 = function () {
              const t = this.length;
              if (t % 4 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 32-bits"
                );
              for (let e = 0; e < t; e += 4)
                y(this, e, e + 3), y(this, e + 1, e + 2);
              return this;
            }),
            (c.prototype.swap64 = function () {
              const t = this.length;
              if (t % 8 != 0)
                throw new RangeError(
                  "Buffer size must be a multiple of 64-bits"
                );
              for (let e = 0; e < t; e += 8)
                y(this, e, e + 7),
                  y(this, e + 1, e + 6),
                  y(this, e + 2, e + 5),
                  y(this, e + 3, e + 4);
              return this;
            }),
            (c.prototype.toString = function () {
              const t = this.length;
              return 0 === t
                ? ""
                : 0 === arguments.length
                ? _(this, 0, t)
                : m.apply(this, arguments);
            }),
            (c.prototype.toLocaleString = c.prototype.toString),
            (c.prototype.equals = function (t) {
              if (!c.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
              return this === t || 0 === c.compare(this, t);
            }),
            (c.prototype.inspect = function () {
              let t = "";
              const r = e.INSPECT_MAX_BYTES;
              return (
                (t = this.toString("hex", 0, r)
                  .replace(/(.{2})/g, "$1 ")
                  .trim()),
                this.length > r && (t += " ... "),
                "<Buffer " + t + ">"
              );
            }),
            o && (c.prototype[o] = c.prototype.inspect),
            (c.prototype.compare = function (t, e, r, n, i) {
              if (
                (Y(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
                !c.isBuffer(t))
              )
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                    typeof t
                );
              if (
                (void 0 === e && (e = 0),
                void 0 === r && (r = t ? t.length : 0),
                void 0 === n && (n = 0),
                void 0 === i && (i = this.length),
                e < 0 || r > t.length || n < 0 || i > this.length)
              )
                throw new RangeError("out of range index");
              if (n >= i && e >= r) return 0;
              if (n >= i) return -1;
              if (e >= r) return 1;
              if (this === t) return 0;
              let o = (i >>>= 0) - (n >>>= 0),
                s = (r >>>= 0) - (e >>>= 0);
              const a = Math.min(o, s),
                u = this.slice(n, i),
                h = t.slice(e, r);
              for (let t = 0; t < a; ++t)
                if (u[t] !== h[t]) {
                  (o = u[t]), (s = h[t]);
                  break;
                }
              return o < s ? -1 : s < o ? 1 : 0;
            }),
            (c.prototype.includes = function (t, e, r) {
              return -1 !== this.indexOf(t, e, r);
            }),
            (c.prototype.indexOf = function (t, e, r) {
              return b(this, t, e, r, !0);
            }),
            (c.prototype.lastIndexOf = function (t, e, r) {
              return b(this, t, e, r, !1);
            }),
            (c.prototype.write = function (t, e, r, n) {
              if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
              else if (void 0 === r && "string" == typeof e)
                (n = e), (r = this.length), (e = 0);
              else {
                if (!isFinite(e))
                  throw new Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                  );
                (e >>>= 0),
                  isFinite(r)
                    ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                    : ((n = r), (r = void 0));
              }
              const i = this.length - e;
              if (
                ((void 0 === r || r > i) && (r = i),
                (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
              )
                throw new RangeError("Attempt to write outside buffer bounds");
              n || (n = "utf8");
              let o = !1;
              for (;;)
                switch (n) {
                  case "hex":
                    return k(this, t, e, r);
                  case "utf8":
                  case "utf-8":
                    return v(this, t, e, r);
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return S(this, t, e, r);
                  case "base64":
                    return I(this, t, e, r);
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return A(this, t, e, r);
                  default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    (n = ("" + n).toLowerCase()), (o = !0);
                }
            }),
            (c.prototype.toJSON = function () {
              return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0),
              };
            });
          const B = 4096;
          function x(t, e, r) {
            let n = "";
            r = Math.min(t.length, r);
            for (let i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
            return n;
          }
          function M(t, e, r) {
            let n = "";
            r = Math.min(t.length, r);
            for (let i = e; i < r; ++i) n += String.fromCharCode(t[i]);
            return n;
          }
          function P(t, e, r) {
            const n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            let i = "";
            for (let n = e; n < r; ++n) i += J[t[n]];
            return i;
          }
          function R(t, e, r) {
            const n = t.slice(e, r);
            let i = "";
            for (let t = 0; t < n.length - 1; t += 2)
              i += String.fromCharCode(n[t] + 256 * n[t + 1]);
            return i;
          }
          function T(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r)
              throw new RangeError("Trying to access beyond buffer length");
          }
          function O(t, e, r, n, i, o) {
            if (!c.isBuffer(t))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (e > i || e < o)
              throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError("Index out of range");
          }
          function L(t, e, r, n, i) {
            D(e, n, i, t, r, 7);
            let o = Number(e & BigInt(4294967295));
            (t[r++] = o),
              (o >>= 8),
              (t[r++] = o),
              (o >>= 8),
              (t[r++] = o),
              (o >>= 8),
              (t[r++] = o);
            let s = Number((e >> BigInt(32)) & BigInt(4294967295));
            return (
              (t[r++] = s),
              (s >>= 8),
              (t[r++] = s),
              (s >>= 8),
              (t[r++] = s),
              (s >>= 8),
              (t[r++] = s),
              r
            );
          }
          function C(t, e, r, n, i) {
            D(e, n, i, t, r, 7);
            let o = Number(e & BigInt(4294967295));
            (t[r + 7] = o),
              (o >>= 8),
              (t[r + 6] = o),
              (o >>= 8),
              (t[r + 5] = o),
              (o >>= 8),
              (t[r + 4] = o);
            let s = Number((e >> BigInt(32)) & BigInt(4294967295));
            return (
              (t[r + 3] = s),
              (s >>= 8),
              (t[r + 2] = s),
              (s >>= 8),
              (t[r + 1] = s),
              (s >>= 8),
              (t[r] = s),
              r + 8
            );
          }
          function z(t, e, r, n, i, o) {
            if (r + n > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range");
          }
          function U(t, e, r, n, o) {
            return (
              (e = +e),
              (r >>>= 0),
              o || z(t, 0, r, 4),
              i.write(t, e, r, n, 23, 4),
              r + 4
            );
          }
          function N(t, e, r, n, o) {
            return (
              (e = +e),
              (r >>>= 0),
              o || z(t, 0, r, 8),
              i.write(t, e, r, n, 52, 8),
              r + 8
            );
          }
          (c.prototype.slice = function (t, e) {
            const r = this.length;
            (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
              (e = void 0 === e ? r : ~~e) < 0
                ? (e += r) < 0 && (e = 0)
                : e > r && (e = r),
              e < t && (e = t);
            const n = this.subarray(t, e);
            return Object.setPrototypeOf(n, c.prototype), n;
          }),
            (c.prototype.readUintLE = c.prototype.readUIntLE =
              function (t, e, r) {
                (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
                let n = this[t],
                  i = 1,
                  o = 0;
                for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
                return n;
              }),
            (c.prototype.readUintBE = c.prototype.readUIntBE =
              function (t, e, r) {
                (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
                let n = this[t + --e],
                  i = 1;
                for (; e > 0 && (i *= 256); ) n += this[t + --e] * i;
                return n;
              }),
            (c.prototype.readUint8 = c.prototype.readUInt8 =
              function (t, e) {
                return (t >>>= 0), e || T(t, 1, this.length), this[t];
              }),
            (c.prototype.readUint16LE = c.prototype.readUInt16LE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 2, this.length),
                  this[t] | (this[t + 1] << 8)
                );
              }),
            (c.prototype.readUint16BE = c.prototype.readUInt16BE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 2, this.length),
                  (this[t] << 8) | this[t + 1]
                );
              }),
            (c.prototype.readUint32LE = c.prototype.readUInt32LE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 4, this.length),
                  (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                    16777216 * this[t + 3]
                );
              }),
            (c.prototype.readUint32BE = c.prototype.readUInt32BE =
              function (t, e) {
                return (
                  (t >>>= 0),
                  e || T(t, 4, this.length),
                  16777216 * this[t] +
                    ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
                );
              }),
            (c.prototype.readBigUInt64LE = X(function (t) {
              H((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || F(t, this.length - 8);
              const n =
                  e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                i =
                  this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
              return BigInt(n) + (BigInt(i) << BigInt(32));
            })),
            (c.prototype.readBigUInt64BE = X(function (t) {
              H((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || F(t, this.length - 8);
              const n =
                  e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                i =
                  this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
              return (BigInt(n) << BigInt(32)) + BigInt(i);
            })),
            (c.prototype.readIntLE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              let n = this[t],
                i = 1,
                o = 0;
              for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
              return (i *= 128), n >= i && (n -= Math.pow(2, 8 * e)), n;
            }),
            (c.prototype.readIntBE = function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || T(t, e, this.length);
              let n = e,
                i = 1,
                o = this[t + --n];
              for (; n > 0 && (i *= 256); ) o += this[t + --n] * i;
              return (i *= 128), o >= i && (o -= Math.pow(2, 8 * e)), o;
            }),
            (c.prototype.readInt8 = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
              );
            }),
            (c.prototype.readInt16LE = function (t, e) {
              (t >>>= 0), e || T(t, 2, this.length);
              const r = this[t] | (this[t + 1] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (c.prototype.readInt16BE = function (t, e) {
              (t >>>= 0), e || T(t, 2, this.length);
              const r = this[t + 1] | (this[t] << 8);
              return 32768 & r ? 4294901760 | r : r;
            }),
            (c.prototype.readInt32LE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                this[t] |
                  (this[t + 1] << 8) |
                  (this[t + 2] << 16) |
                  (this[t + 3] << 24)
              );
            }),
            (c.prototype.readInt32BE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                (this[t] << 24) |
                  (this[t + 1] << 16) |
                  (this[t + 2] << 8) |
                  this[t + 3]
              );
            }),
            (c.prototype.readBigInt64LE = X(function (t) {
              H((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || F(t, this.length - 8);
              const n =
                this[t + 4] +
                256 * this[t + 5] +
                65536 * this[t + 6] +
                (r << 24);
              return (
                (BigInt(n) << BigInt(32)) +
                BigInt(
                  e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24
                )
              );
            })),
            (c.prototype.readBigInt64BE = X(function (t) {
              H((t >>>= 0), "offset");
              const e = this[t],
                r = this[t + 7];
              (void 0 !== e && void 0 !== r) || F(t, this.length - 8);
              const n =
                (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
              return (
                (BigInt(n) << BigInt(32)) +
                BigInt(
                  this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r
                )
              );
            })),
            (c.prototype.readFloatLE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                i.read(this, t, !0, 23, 4)
              );
            }),
            (c.prototype.readFloatBE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 4, this.length),
                i.read(this, t, !1, 23, 4)
              );
            }),
            (c.prototype.readDoubleLE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 8, this.length),
                i.read(this, t, !0, 52, 8)
              );
            }),
            (c.prototype.readDoubleBE = function (t, e) {
              return (
                (t >>>= 0),
                e || T(t, 8, this.length),
                i.read(this, t, !1, 52, 8)
              );
            }),
            (c.prototype.writeUintLE = c.prototype.writeUIntLE =
              function (t, e, r, n) {
                (t = +t),
                  (e >>>= 0),
                  (r >>>= 0),
                  n || O(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                let i = 1,
                  o = 0;
                for (this[e] = 255 & t; ++o < r && (i *= 256); )
                  this[e + o] = (t / i) & 255;
                return e + r;
              }),
            (c.prototype.writeUintBE = c.prototype.writeUIntBE =
              function (t, e, r, n) {
                (t = +t),
                  (e >>>= 0),
                  (r >>>= 0),
                  n || O(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                let i = r - 1,
                  o = 1;
                for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
                  this[e + i] = (t / o) & 255;
                return e + r;
              }),
            (c.prototype.writeUint8 = c.prototype.writeUInt8 =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || O(this, t, e, 1, 255, 0),
                  (this[e] = 255 & t),
                  e + 1
                );
              }),
            (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || O(this, t, e, 2, 65535, 0),
                  (this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  e + 2
                );
              }),
            (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || O(this, t, e, 2, 65535, 0),
                  (this[e] = t >>> 8),
                  (this[e + 1] = 255 & t),
                  e + 2
                );
              }),
            (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || O(this, t, e, 4, 4294967295, 0),
                  (this[e + 3] = t >>> 24),
                  (this[e + 2] = t >>> 16),
                  (this[e + 1] = t >>> 8),
                  (this[e] = 255 & t),
                  e + 4
                );
              }),
            (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
              function (t, e, r) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  r || O(this, t, e, 4, 4294967295, 0),
                  (this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t),
                  e + 4
                );
              }),
            (c.prototype.writeBigUInt64LE = X(function (t, e = 0) {
              return L(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
            })),
            (c.prototype.writeBigUInt64BE = X(function (t, e = 0) {
              return C(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
            })),
            (c.prototype.writeIntLE = function (t, e, r, n) {
              if (((t = +t), (e >>>= 0), !n)) {
                const n = Math.pow(2, 8 * r - 1);
                O(this, t, e, r, n - 1, -n);
              }
              let i = 0,
                o = 1,
                s = 0;
              for (this[e] = 255 & t; ++i < r && (o *= 256); )
                t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
                  (this[e + i] = (((t / o) | 0) - s) & 255);
              return e + r;
            }),
            (c.prototype.writeIntBE = function (t, e, r, n) {
              if (((t = +t), (e >>>= 0), !n)) {
                const n = Math.pow(2, 8 * r - 1);
                O(this, t, e, r, n - 1, -n);
              }
              let i = r - 1,
                o = 1,
                s = 0;
              for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
                t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
                  (this[e + i] = (((t / o) | 0) - s) & 255);
              return e + r;
            }),
            (c.prototype.writeInt8 = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || O(this, t, e, 1, 127, -128),
                t < 0 && (t = 255 + t + 1),
                (this[e] = 255 & t),
                e + 1
              );
            }),
            (c.prototype.writeInt16LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || O(this, t, e, 2, 32767, -32768),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
            (c.prototype.writeInt16BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || O(this, t, e, 2, 32767, -32768),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
            (c.prototype.writeInt32LE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || O(this, t, e, 4, 2147483647, -2147483648),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24),
                e + 4
              );
            }),
            (c.prototype.writeInt32BE = function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || O(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
            (c.prototype.writeBigInt64LE = X(function (t, e = 0) {
              return L(
                this,
                t,
                e,
                -BigInt("0x8000000000000000"),
                BigInt("0x7fffffffffffffff")
              );
            })),
            (c.prototype.writeBigInt64BE = X(function (t, e = 0) {
              return C(
                this,
                t,
                e,
                -BigInt("0x8000000000000000"),
                BigInt("0x7fffffffffffffff")
              );
            })),
            (c.prototype.writeFloatLE = function (t, e, r) {
              return U(this, t, e, !0, r);
            }),
            (c.prototype.writeFloatBE = function (t, e, r) {
              return U(this, t, e, !1, r);
            }),
            (c.prototype.writeDoubleLE = function (t, e, r) {
              return N(this, t, e, !0, r);
            }),
            (c.prototype.writeDoubleBE = function (t, e, r) {
              return N(this, t, e, !1, r);
            }),
            (c.prototype.copy = function (t, e, r, n) {
              if (!c.isBuffer(t))
                throw new TypeError("argument should be a Buffer");
              if (
                (r || (r = 0),
                n || 0 === n || (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r)
              )
                return 0;
              if (0 === t.length || 0 === this.length) return 0;
              if (e < 0) throw new RangeError("targetStart out of bounds");
              if (r < 0 || r >= this.length)
                throw new RangeError("Index out of range");
              if (n < 0) throw new RangeError("sourceEnd out of bounds");
              n > this.length && (n = this.length),
                t.length - e < n - r && (n = t.length - e + r);
              const i = n - r;
              return (
                this === t &&
                "function" == typeof Uint8Array.prototype.copyWithin
                  ? this.copyWithin(e, r, n)
                  : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
                i
              );
            }),
            (c.prototype.fill = function (t, e, r, n) {
              if ("string" == typeof t) {
                if (
                  ("string" == typeof e
                    ? ((n = e), (e = 0), (r = this.length))
                    : "string" == typeof r && ((n = r), (r = this.length)),
                  void 0 !== n && "string" != typeof n)
                )
                  throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !c.isEncoding(n))
                  throw new TypeError("Unknown encoding: " + n);
                if (1 === t.length) {
                  const e = t.charCodeAt(0);
                  (("utf8" === n && e < 128) || "latin1" === n) && (t = e);
                }
              } else
                "number" == typeof t
                  ? (t &= 255)
                  : "boolean" == typeof t && (t = Number(t));
              if (e < 0 || this.length < e || this.length < r)
                throw new RangeError("Out of range index");
              if (r <= e) return this;
              let i;
              if (
                ((e >>>= 0),
                (r = void 0 === r ? this.length : r >>> 0),
                t || (t = 0),
                "number" == typeof t)
              )
                for (i = e; i < r; ++i) this[i] = t;
              else {
                const o = c.isBuffer(t) ? t : c.from(t, n),
                  s = o.length;
                if (0 === s)
                  throw new TypeError(
                    'The value "' + t + '" is invalid for argument "value"'
                  );
                for (i = 0; i < r - e; ++i) this[i + e] = o[i % s];
              }
              return this;
            });
          const W = {};
          function K(t, e, r) {
            W[t] = class extends r {
              constructor() {
                super(),
                  Object.defineProperty(this, "message", {
                    value: e.apply(this, arguments),
                    writable: !0,
                    configurable: !0,
                  }),
                  (this.name = `${this.name} [${t}]`),
                  this.stack,
                  delete this.name;
              }
              get code() {
                return t;
              }
              set code(t) {
                Object.defineProperty(this, "code", {
                  configurable: !0,
                  enumerable: !0,
                  value: t,
                  writable: !0,
                });
              }
              toString() {
                return `${this.name} [${t}]: ${this.message}`;
              }
            };
          }
          function q(t) {
            let e = "",
              r = t.length;
            const n = "-" === t[0] ? 1 : 0;
            for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
            return `${t.slice(0, r)}${e}`;
          }
          function D(t, e, r, n, i, o) {
            if (t > r || t < e) {
              const n = "bigint" == typeof e ? "n" : "";
              let i;
              throw (
                ((i =
                  o > 3
                    ? 0 === e || e === BigInt(0)
                      ? `>= 0${n} and < 2${n} ** ${8 * (o + 1)}${n}`
                      : `>= -(2${n} ** ${8 * (o + 1) - 1}${n}) and < 2 ** ${
                          8 * (o + 1) - 1
                        }${n}`
                    : `>= ${e}${n} and <= ${r}${n}`),
                new W.ERR_OUT_OF_RANGE("value", i, t))
              );
            }
            !(function (t, e, r) {
              H(e, "offset"),
                (void 0 !== t[e] && void 0 !== t[e + r]) ||
                  F(e, t.length - (r + 1));
            })(n, i, o);
          }
          function H(t, e) {
            if ("number" != typeof t)
              throw new W.ERR_INVALID_ARG_TYPE(e, "number", t);
          }
          function F(t, e, r) {
            if (Math.floor(t) !== t)
              throw (
                (H(t, r),
                new W.ERR_OUT_OF_RANGE(r || "offset", "an integer", t))
              );
            if (e < 0) throw new W.ERR_BUFFER_OUT_OF_BOUNDS();
            throw new W.ERR_OUT_OF_RANGE(
              r || "offset",
              `>= ${r ? 1 : 0} and <= ${e}`,
              t
            );
          }
          K(
            "ERR_BUFFER_OUT_OF_BOUNDS",
            function (t) {
              return t
                ? `${t} is outside of buffer bounds`
                : "Attempt to access memory outside buffer bounds";
            },
            RangeError
          ),
            K(
              "ERR_INVALID_ARG_TYPE",
              function (t, e) {
                return `The "${t}" argument must be of type number. Received type ${typeof e}`;
              },
              TypeError
            ),
            K(
              "ERR_OUT_OF_RANGE",
              function (t, e, r) {
                let n = `The value of "${t}" is out of range.`,
                  i = r;
                return (
                  Number.isInteger(r) && Math.abs(r) > 2 ** 32
                    ? (i = q(String(r)))
                    : "bigint" == typeof r &&
                      ((i = String(r)),
                      (r > BigInt(2) ** BigInt(32) ||
                        r < -(BigInt(2) ** BigInt(32))) &&
                        (i = q(i)),
                      (i += "n")),
                  (n += ` It must be ${e}. Received ${i}`),
                  n
                );
              },
              RangeError
            );
          const j = /[^+/0-9A-Za-z-_]/g;
          function $(t, e) {
            let r;
            e = e || 1 / 0;
            const n = t.length;
            let i = null;
            const o = [];
            for (let s = 0; s < n; ++s) {
              if (((r = t.charCodeAt(s)), r > 55295 && r < 57344)) {
                if (!i) {
                  if (r > 56319) {
                    (e -= 3) > -1 && o.push(239, 191, 189);
                    continue;
                  }
                  if (s + 1 === n) {
                    (e -= 3) > -1 && o.push(239, 191, 189);
                    continue;
                  }
                  i = r;
                  continue;
                }
                if (r < 56320) {
                  (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
                  continue;
                }
                r = 65536 + (((i - 55296) << 10) | (r - 56320));
              } else i && (e -= 3) > -1 && o.push(239, 191, 189);
              if (((i = null), r < 128)) {
                if ((e -= 1) < 0) break;
                o.push(r);
              } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                o.push((r >> 6) | 192, (63 & r) | 128);
              } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
              } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((e -= 4) < 0) break;
                o.push(
                  (r >> 18) | 240,
                  ((r >> 12) & 63) | 128,
                  ((r >> 6) & 63) | 128,
                  (63 & r) | 128
                );
              }
            }
            return o;
          }
          function V(t) {
            return n.toByteArray(
              (function (t) {
                if (
                  (t = (t = t.split("=")[0]).trim().replace(j, "")).length < 2
                )
                  return "";
                for (; t.length % 4 != 0; ) t += "=";
                return t;
              })(t)
            );
          }
          function G(t, e, r, n) {
            let i;
            for (i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
              e[i + r] = t[i];
            return i;
          }
          function Y(t, e) {
            return (
              t instanceof e ||
              (null != t &&
                null != t.constructor &&
                null != t.constructor.name &&
                t.constructor.name === e.name)
            );
          }
          function Z(t) {
            return t != t;
          }
          const J = (function () {
            const t = "0123456789abcdef",
              e = new Array(256);
            for (let r = 0; r < 16; ++r) {
              const n = 16 * r;
              for (let i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
            }
            return e;
          })();
          function X(t) {
            return "undefined" == typeof BigInt ? Q : t;
          }
          function Q() {
            throw new Error("BigInt not supported");
          }
        },
        228: (t) => {
          "use strict";
          var e = Object.prototype.hasOwnProperty,
            r = "~";
          function n() {}
          function i(t, e, r) {
            (this.fn = t), (this.context = e), (this.once = r || !1);
          }
          function o(t, e, n, o, s) {
            if ("function" != typeof n)
              throw new TypeError("The listener must be a function");
            var a = new i(n, o || t, s),
              c = r ? r + e : e;
            return (
              t._events[c]
                ? t._events[c].fn
                  ? (t._events[c] = [t._events[c], a])
                  : t._events[c].push(a)
                : ((t._events[c] = a), t._eventsCount++),
              t
            );
          }
          function s(t, e) {
            0 == --t._eventsCount ? (t._events = new n()) : delete t._events[e];
          }
          function a() {
            (this._events = new n()), (this._eventsCount = 0);
          }
          Object.create &&
            ((n.prototype = Object.create(null)),
            new n().__proto__ || (r = !1)),
            (a.prototype.eventNames = function () {
              var t,
                n,
                i = [];
              if (0 === this._eventsCount) return i;
              for (n in (t = this._events))
                e.call(t, n) && i.push(r ? n.slice(1) : n);
              return Object.getOwnPropertySymbols
                ? i.concat(Object.getOwnPropertySymbols(t))
                : i;
            }),
            (a.prototype.listeners = function (t) {
              var e = r ? r + t : t,
                n = this._events[e];
              if (!n) return [];
              if (n.fn) return [n.fn];
              for (var i = 0, o = n.length, s = new Array(o); i < o; i++)
                s[i] = n[i].fn;
              return s;
            }),
            (a.prototype.listenerCount = function (t) {
              var e = r ? r + t : t,
                n = this._events[e];
              return n ? (n.fn ? 1 : n.length) : 0;
            }),
            (a.prototype.emit = function (t, e, n, i, o, s) {
              var a = r ? r + t : t;
              if (!this._events[a]) return !1;
              var c,
                u,
                h = this._events[a],
                l = arguments.length;
              if (h.fn) {
                switch (
                  (h.once && this.removeListener(t, h.fn, void 0, !0), l)
                ) {
                  case 1:
                    return h.fn.call(h.context), !0;
                  case 2:
                    return h.fn.call(h.context, e), !0;
                  case 3:
                    return h.fn.call(h.context, e, n), !0;
                  case 4:
                    return h.fn.call(h.context, e, n, i), !0;
                  case 5:
                    return h.fn.call(h.context, e, n, i, o), !0;
                  case 6:
                    return h.fn.call(h.context, e, n, i, o, s), !0;
                }
                for (u = 1, c = new Array(l - 1); u < l; u++)
                  c[u - 1] = arguments[u];
                h.fn.apply(h.context, c);
              } else {
                var d,
                  f = h.length;
                for (u = 0; u < f; u++)
                  switch (
                    (h[u].once && this.removeListener(t, h[u].fn, void 0, !0),
                    l)
                  ) {
                    case 1:
                      h[u].fn.call(h[u].context);
                      break;
                    case 2:
                      h[u].fn.call(h[u].context, e);
                      break;
                    case 3:
                      h[u].fn.call(h[u].context, e, n);
                      break;
                    case 4:
                      h[u].fn.call(h[u].context, e, n, i);
                      break;
                    default:
                      if (!c)
                        for (d = 1, c = new Array(l - 1); d < l; d++)
                          c[d - 1] = arguments[d];
                      h[u].fn.apply(h[u].context, c);
                  }
              }
              return !0;
            }),
            (a.prototype.on = function (t, e, r) {
              return o(this, t, e, r, !1);
            }),
            (a.prototype.once = function (t, e, r) {
              return o(this, t, e, r, !0);
            }),
            (a.prototype.removeListener = function (t, e, n, i) {
              var o = r ? r + t : t;
              if (!this._events[o]) return this;
              if (!e) return s(this, o), this;
              var a = this._events[o];
              if (a.fn)
                a.fn !== e ||
                  (i && !a.once) ||
                  (n && a.context !== n) ||
                  s(this, o);
              else {
                for (var c = 0, u = [], h = a.length; c < h; c++)
                  (a[c].fn !== e ||
                    (i && !a[c].once) ||
                    (n && a[c].context !== n)) &&
                    u.push(a[c]);
                u.length
                  ? (this._events[o] = 1 === u.length ? u[0] : u)
                  : s(this, o);
              }
              return this;
            }),
            (a.prototype.removeAllListeners = function (t) {
              var e;
              return (
                t
                  ? ((e = r ? r + t : t), this._events[e] && s(this, e))
                  : ((this._events = new n()), (this._eventsCount = 0)),
                this
              );
            }),
            (a.prototype.off = a.prototype.removeListener),
            (a.prototype.addListener = a.prototype.on),
            (a.prefixed = r),
            (a.EventEmitter = a),
            (t.exports = a);
        },
        251: (t, e) => {
          (e.read = function (t, e, r, n, i) {
            var o,
              s,
              a = 8 * i - n - 1,
              c = (1 << a) - 1,
              u = c >> 1,
              h = -7,
              l = r ? i - 1 : 0,
              d = r ? -1 : 1,
              f = t[e + l];
            for (
              l += d, o = f & ((1 << -h) - 1), f >>= -h, h += a;
              h > 0;
              o = 256 * o + t[e + l], l += d, h -= 8
            );
            for (
              s = o & ((1 << -h) - 1), o >>= -h, h += n;
              h > 0;
              s = 256 * s + t[e + l], l += d, h -= 8
            );
            if (0 === o) o = 1 - u;
            else {
              if (o === c) return s ? NaN : (1 / 0) * (f ? -1 : 1);
              (s += Math.pow(2, n)), (o -= u);
            }
            return (f ? -1 : 1) * s * Math.pow(2, o - n);
          }),
            (e.write = function (t, e, r, n, i, o) {
              var s,
                a,
                c,
                u = 8 * o - i - 1,
                h = (1 << u) - 1,
                l = h >> 1,
                d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                f = n ? 0 : o - 1,
                p = n ? 1 : -1,
                g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
              for (
                e = Math.abs(e),
                  isNaN(e) || e === 1 / 0
                    ? ((a = isNaN(e) ? 1 : 0), (s = h))
                    : ((s = Math.floor(Math.log(e) / Math.LN2)),
                      e * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                      (e += s + l >= 1 ? d / c : d * Math.pow(2, 1 - l)) * c >=
                        2 && (s++, (c /= 2)),
                      s + l >= h
                        ? ((a = 0), (s = h))
                        : s + l >= 1
                        ? ((a = (e * c - 1) * Math.pow(2, i)), (s += l))
                        : ((a = e * Math.pow(2, l - 1) * Math.pow(2, i)),
                          (s = 0)));
                i >= 8;
                t[r + f] = 255 & a, f += p, a /= 256, i -= 8
              );
              for (
                s = (s << i) | a, u += i;
                u > 0;
                t[r + f] = 255 & s, f += p, s /= 256, u -= 8
              );
              t[r + f - p] |= 128 * g;
            });
        },
        22: (t, e, r) => {
          "use strict";
          const n = r(341).v4,
            i = r(289),
            o = function (t, e) {
              if (!(this instanceof o)) return new o(t, e);
              e || (e = {}),
                (this.options = {
                  reviver: void 0 !== e.reviver ? e.reviver : null,
                  replacer: void 0 !== e.replacer ? e.replacer : null,
                  generator:
                    void 0 !== e.generator
                      ? e.generator
                      : function () {
                          return n();
                        },
                  version: void 0 !== e.version ? e.version : 2,
                  notificationIdNull:
                    "boolean" == typeof e.notificationIdNull &&
                    e.notificationIdNull,
                }),
                (this.callServer = t);
            };
          (t.exports = o),
            (o.prototype.request = function (t, e, r, n) {
              const o = this;
              let s = null;
              const a = Array.isArray(t) && "function" == typeof e;
              if (1 === this.options.version && a)
                throw new TypeError("JSON-RPC 1.0 does not support batching");
              if (
                a ||
                (!a && t && "object" == typeof t && "function" == typeof e)
              )
                (n = e), (s = t);
              else {
                "function" == typeof r && ((n = r), (r = void 0));
                const o = "function" == typeof n;
                try {
                  s = i(t, e, r, {
                    generator: this.options.generator,
                    version: this.options.version,
                    notificationIdNull: this.options.notificationIdNull,
                  });
                } catch (t) {
                  if (o) return n(t);
                  throw t;
                }
                if (!o) return s;
              }
              let c;
              try {
                c = JSON.stringify(s, this.options.replacer);
              } catch (t) {
                return n(t);
              }
              return (
                this.callServer(c, function (t, e) {
                  o._parseResponse(t, e, n);
                }),
                s
              );
            }),
            (o.prototype._parseResponse = function (t, e, r) {
              if (t) return void r(t);
              if (!e) return r();
              let n;
              try {
                n = JSON.parse(e, this.options.reviver);
              } catch (t) {
                return r(t);
              }
              if (3 === r.length) {
                if (Array.isArray(n)) {
                  const t = function (t) {
                      return void 0 !== t.error;
                    },
                    e = function (e) {
                      return !t(e);
                    };
                  return r(null, n.filter(t), n.filter(e));
                }
                return r(null, n.error, n.result);
              }
              r(null, n);
            });
        },
        289: (t, e, r) => {
          "use strict";
          const n = r(341).v4;
          t.exports = function (t, e, r, i) {
            if ("string" != typeof t)
              throw new TypeError(t + " must be a string");
            const o = "number" == typeof (i = i || {}).version ? i.version : 2;
            if (1 !== o && 2 !== o) throw new TypeError(o + " must be 1 or 2");
            const s = { method: t };
            if ((2 === o && (s.jsonrpc = "2.0"), e)) {
              if ("object" != typeof e && !Array.isArray(e))
                throw new TypeError(e + " must be an object, array or omitted");
              s.params = e;
            }
            if (void 0 === r) {
              const t =
                "function" == typeof i.generator
                  ? i.generator
                  : function () {
                      return n();
                    };
              s.id = t(s, i);
            } else
              2 === o && null === r
                ? i.notificationIdNull && (s.id = null)
                : (s.id = r);
            return s;
          };
        },
        861: (t, e, r) => {
          var n = r(287),
            i = n.Buffer;
          function o(t, e) {
            for (var r in t) e[r] = t[r];
          }
          function s(t, e, r) {
            return i(t, e, r);
          }
          i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
            ? (t.exports = n)
            : (o(n, e), (e.Buffer = s)),
            (s.prototype = Object.create(i.prototype)),
            o(i, s),
            (s.from = function (t, e, r) {
              if ("number" == typeof t)
                throw new TypeError("Argument must not be a number");
              return i(t, e, r);
            }),
            (s.alloc = function (t, e, r) {
              if ("number" != typeof t)
                throw new TypeError("Argument must be a number");
              var n = i(t);
              return (
                void 0 !== e
                  ? "string" == typeof r
                    ? n.fill(e, r)
                    : n.fill(e)
                  : n.fill(0),
                n
              );
            }),
            (s.allocUnsafe = function (t) {
              if ("number" != typeof t)
                throw new TypeError("Argument must be a number");
              return i(t);
            }),
            (s.allocUnsafeSlow = function (t) {
              if ("number" != typeof t)
                throw new TypeError("Argument must be a number");
              return n.SlowBuffer(t);
            });
        },
        281: (t, e) => {
          "use strict";
          function r(t, e, r) {
            return e <= t && t <= r;
          }
          function n(t) {
            if (void 0 === t) return {};
            if (t === Object(t)) return t;
            throw TypeError("Could not convert argument to dictionary");
          }
          function i(t) {
            this.tokens = [].slice.call(t);
          }
          i.prototype = {
            endOfStream: function () {
              return !this.tokens.length;
            },
            read: function () {
              return this.tokens.length ? this.tokens.shift() : -1;
            },
            prepend: function (t) {
              if (Array.isArray(t))
                for (var e = t; e.length; ) this.tokens.unshift(e.pop());
              else this.tokens.unshift(t);
            },
            push: function (t) {
              if (Array.isArray(t))
                for (var e = t; e.length; ) this.tokens.push(e.shift());
              else this.tokens.push(t);
            },
          };
          var o = -1;
          function s(t, e) {
            if (t) throw TypeError("Decoder error");
            return e || 65533;
          }
          var a = "utf-8";
          function c(t, e) {
            if (!(this instanceof c)) return new c(t, e);
            if ((t = void 0 !== t ? String(t).toLowerCase() : a) !== a)
              throw new Error(
                "Encoding not supported. Only utf-8 is supported"
              );
            (e = n(e)),
              (this._streaming = !1),
              (this._BOMseen = !1),
              (this._decoder = null),
              (this._fatal = Boolean(e.fatal)),
              (this._ignoreBOM = Boolean(e.ignoreBOM)),
              Object.defineProperty(this, "encoding", { value: "utf-8" }),
              Object.defineProperty(this, "fatal", { value: this._fatal }),
              Object.defineProperty(this, "ignoreBOM", {
                value: this._ignoreBOM,
              });
          }
          function u(t, e) {
            if (!(this instanceof u)) return new u(t, e);
            if ((t = void 0 !== t ? String(t).toLowerCase() : a) !== a)
              throw new Error(
                "Encoding not supported. Only utf-8 is supported"
              );
            (e = n(e)),
              (this._streaming = !1),
              (this._encoder = null),
              (this._options = { fatal: Boolean(e.fatal) }),
              Object.defineProperty(this, "encoding", { value: "utf-8" });
          }
          function h(t) {
            var e = t.fatal,
              n = 0,
              i = 0,
              a = 0,
              c = 128,
              u = 191;
            this.handler = function (t, h) {
              if (-1 === h && 0 !== a) return (a = 0), s(e);
              if (-1 === h) return o;
              if (0 === a) {
                if (r(h, 0, 127)) return h;
                if (r(h, 194, 223)) (a = 1), (n = h - 192);
                else if (r(h, 224, 239))
                  224 === h && (c = 160),
                    237 === h && (u = 159),
                    (a = 2),
                    (n = h - 224);
                else {
                  if (!r(h, 240, 244)) return s(e);
                  240 === h && (c = 144),
                    244 === h && (u = 143),
                    (a = 3),
                    (n = h - 240);
                }
                return (n <<= 6 * a), null;
              }
              if (!r(h, c, u))
                return (
                  (n = a = i = 0), (c = 128), (u = 191), t.prepend(h), s(e)
                );
              if (
                ((c = 128),
                (u = 191),
                (n += (h - 128) << (6 * (a - (i += 1)))),
                i !== a)
              )
                return null;
              var l = n;
              return (n = a = i = 0), l;
            };
          }
          function l(t) {
            t.fatal,
              (this.handler = function (t, e) {
                if (-1 === e) return o;
                if (r(e, 0, 127)) return e;
                var n, i;
                r(e, 128, 2047)
                  ? ((n = 1), (i = 192))
                  : r(e, 2048, 65535)
                  ? ((n = 2), (i = 224))
                  : r(e, 65536, 1114111) && ((n = 3), (i = 240));
                for (var s = [(e >> (6 * n)) + i]; n > 0; ) {
                  var a = e >> (6 * (n - 1));
                  s.push(128 | (63 & a)), (n -= 1);
                }
                return s;
              });
          }
          (c.prototype = {
            decode: function (t, e) {
              var r;
              (r =
                "object" == typeof t && t instanceof ArrayBuffer
                  ? new Uint8Array(t)
                  : "object" == typeof t &&
                    "buffer" in t &&
                    t.buffer instanceof ArrayBuffer
                  ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
                  : new Uint8Array(0)),
                (e = n(e)),
                this._streaming ||
                  ((this._decoder = new h({ fatal: this._fatal })),
                  (this._BOMseen = !1)),
                (this._streaming = Boolean(e.stream));
              for (
                var s, a = new i(r), c = [];
                !a.endOfStream() &&
                (s = this._decoder.handler(a, a.read())) !== o;

              )
                null !== s &&
                  (Array.isArray(s) ? c.push.apply(c, s) : c.push(s));
              if (!this._streaming) {
                do {
                  if ((s = this._decoder.handler(a, a.read())) === o) break;
                  null !== s &&
                    (Array.isArray(s) ? c.push.apply(c, s) : c.push(s));
                } while (!a.endOfStream());
                this._decoder = null;
              }
              return (
                c.length &&
                  (-1 === ["utf-8"].indexOf(this.encoding) ||
                    this._ignoreBOM ||
                    this._BOMseen ||
                    (65279 === c[0]
                      ? ((this._BOMseen = !0), c.shift())
                      : (this._BOMseen = !0))),
                (function (t) {
                  for (var e = "", r = 0; r < t.length; ++r) {
                    var n = t[r];
                    n <= 65535
                      ? (e += String.fromCharCode(n))
                      : ((n -= 65536),
                        (e += String.fromCharCode(
                          55296 + (n >> 10),
                          56320 + (1023 & n)
                        )));
                  }
                  return e;
                })(c)
              );
            },
          }),
            (u.prototype = {
              encode: function (t, e) {
                (t = t ? String(t) : ""),
                  (e = n(e)),
                  this._streaming || (this._encoder = new l(this._options)),
                  (this._streaming = Boolean(e.stream));
                for (
                  var r,
                    s = [],
                    a = new i(
                      (function (t) {
                        for (
                          var e = String(t), r = e.length, n = 0, i = [];
                          n < r;

                        ) {
                          var o = e.charCodeAt(n);
                          if (o < 55296 || o > 57343) i.push(o);
                          else if (56320 <= o && o <= 57343) i.push(65533);
                          else if (55296 <= o && o <= 56319)
                            if (n === r - 1) i.push(65533);
                            else {
                              var s = t.charCodeAt(n + 1);
                              if (56320 <= s && s <= 57343) {
                                var a = 1023 & o,
                                  c = 1023 & s;
                                i.push(65536 + (a << 10) + c), (n += 1);
                              } else i.push(65533);
                            }
                          n += 1;
                        }
                        return i;
                      })(t)
                    );
                  !a.endOfStream() &&
                  (r = this._encoder.handler(a, a.read())) !== o;

                )
                  Array.isArray(r) ? s.push.apply(s, r) : s.push(r);
                if (!this._streaming) {
                  for (; (r = this._encoder.handler(a, a.read())) !== o; )
                    Array.isArray(r) ? s.push.apply(s, r) : s.push(r);
                  this._encoder = null;
                }
                return new Uint8Array(s);
              },
            }),
            (e.TextEncoder = u),
            (e.TextDecoder = c);
        },
        341: (t, e, r) => {
          "use strict";
          var n;
          r.d(e, { v4: () => h });
          var i = new Uint8Array(16);
          function o() {
            if (
              !n &&
              !(n =
                ("undefined" != typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto)) ||
                ("undefined" != typeof msCrypto &&
                  "function" == typeof msCrypto.getRandomValues &&
                  msCrypto.getRandomValues.bind(msCrypto)))
            )
              throw new Error(
                "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
              );
            return n(i);
          }
          const s =
            /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
          for (var a = [], c = 0; c < 256; ++c)
            a.push((c + 256).toString(16).substr(1));
          const u = function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 0,
                r = (
                  a[t[e + 0]] +
                  a[t[e + 1]] +
                  a[t[e + 2]] +
                  a[t[e + 3]] +
                  "-" +
                  a[t[e + 4]] +
                  a[t[e + 5]] +
                  "-" +
                  a[t[e + 6]] +
                  a[t[e + 7]] +
                  "-" +
                  a[t[e + 8]] +
                  a[t[e + 9]] +
                  "-" +
                  a[t[e + 10]] +
                  a[t[e + 11]] +
                  a[t[e + 12]] +
                  a[t[e + 13]] +
                  a[t[e + 14]] +
                  a[t[e + 15]]
                ).toLowerCase();
              if (
                !(function (t) {
                  return "string" == typeof t && s.test(t);
                })(r)
              )
                throw TypeError("Stringified UUID is invalid");
              return r;
            },
            h = function (t, e, r) {
              var n = (t = t || {}).random || (t.rng || o)();
              if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), e)) {
                r = r || 0;
                for (var i = 0; i < 16; ++i) e[r + i] = n[i];
                return e;
              }
              return u(n);
            };
        },
        790: () => {},
      },
      e = {};
    function r(n) {
      var i = e[n];
      if (void 0 !== i) return i.exports;
      var o = (e[n] = { id: n, loaded: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
    }
    (r.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, { a: e }), e;
    }),
      (r.d = (t, e) => {
        for (var n in e)
          r.o(e, n) &&
            !r.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
      }),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t));
    var n = {};
    return (
      (() => {
        "use strict";
        r.r(n),
          r.d(n, {
            Account: () => dn,
            AddressLookupTableAccount: () => Ai,
            AddressLookupTableInstruction: () => Ss,
            AddressLookupTableProgram: () => Is,
            Authorized: () => Ls,
            BLOCKHASH_CACHE_TIMEOUT_MS: () => Pi,
            BPF_LOADER_DEPRECATED_PROGRAM_ID: () => fn,
            BPF_LOADER_PROGRAM_ID: () => fi,
            BpfLoader: () => pi,
            COMPUTE_BUDGET_INSTRUCTION_LAYOUTS: () => Es,
            ComputeBudgetInstruction: () => As,
            ComputeBudgetProgram: () => _s,
            Connection: () => ws,
            Ed25519Program: () => xs,
            Enum: () => on,
            EpochSchedule: () => vi,
            FeeCalculatorLayout: () => ni,
            Keypair: () => ks,
            LAMPORTS_PER_SOL: () => na,
            LOOKUP_TABLE_INSTRUCTION_LAYOUTS: () => vs,
            Loader: () => di,
            Lockup: () => Cs,
            MAX_SEED_LENGTH: () => cn,
            Message: () => Tn,
            MessageAccountKeys: () => kn,
            MessageV0: () => On,
            NONCE_ACCOUNT_LENGTH: () => oi,
            NonceAccount: () => si,
            PACKET_DATA_SIZE: () => pn,
            PUBLIC_KEY_LENGTH: () => un,
            PublicKey: () => ln,
            SIGNATURE_LENGTH_IN_BYTES: () => mn,
            SOLANA_SCHEMA: () => sn,
            STAKE_CONFIG_ID: () => Os,
            STAKE_INSTRUCTION_LAYOUTS: () => Us,
            SYSTEM_INSTRUCTION_LAYOUTS: () => ui,
            SYSVAR_CLOCK_PUBKEY: () => qn,
            SYSVAR_EPOCH_SCHEDULE_PUBKEY: () => Dn,
            SYSVAR_INSTRUCTIONS_PUBKEY: () => Hn,
            SYSVAR_RECENT_BLOCKHASHES_PUBKEY: () => Fn,
            SYSVAR_RENT_PUBKEY: () => jn,
            SYSVAR_REWARDS_PUBKEY: () => $n,
            SYSVAR_SLOT_HASHES_PUBKEY: () => Vn,
            SYSVAR_SLOT_HISTORY_PUBKEY: () => Gn,
            SYSVAR_STAKE_HISTORY_PUBKEY: () => Yn,
            Secp256k1Program: () => Rs,
            SendTransactionError: () => Zn,
            SolanaJSONRPCError: () => Xn,
            SolanaJSONRPCErrorCode: () => Jn,
            StakeAuthorizationLayout: () => Ns,
            StakeInstruction: () => zs,
            StakeProgram: () => Ws,
            Struct: () => nn,
            SystemInstruction: () => ci,
            SystemProgram: () => hi,
            Transaction: () => Nn,
            TransactionExpiredBlockheightExceededError: () => yn,
            TransactionExpiredNonceInvalidError: () => wn,
            TransactionExpiredTimeoutError: () => bn,
            TransactionInstruction: () => Un,
            TransactionMessage: () => Wn,
            TransactionStatus: () => Cn,
            VALIDATOR_INFO_KEY: () => js,
            VERSION_PREFIX_MASK: () => gn,
            VOTE_PROGRAM_ID: () => Gs,
            ValidatorInfo: () => Vs,
            VersionedMessage: () => Ln,
            VersionedTransaction: () => Kn,
            VoteAccount: () => Zs,
            VoteAuthorizationLayout: () => Hs,
            VoteInit: () => Ks,
            VoteInstruction: () => qs,
            VoteProgram: () => Fs,
            clusterApiUrl: () => ea,
            sendAndConfirmRawTransaction: () => ra,
            sendAndConfirmTransaction: () => Qn,
          });
        var t = {};
        r.r(t),
          r.d(t, {
            aK: () => st,
            e8: () => F,
            DO: () => H,
            dJ: () => at,
            OG: () => ct,
            My: () => $,
            Ph: () => X,
            lX: () => Q,
            Id: () => nt,
            fg: () => lt,
            qj: () => rt,
            aT: () => J,
            r4: () => ot,
            aY: () => D,
            x: () => pt,
            lq: () => tt,
            z: () => et,
            zW: () => V,
            Q5: () => ft,
          });
        var e = r(287);
        function i(t) {
          if (!Number.isSafeInteger(t) || t < 0)
            throw new Error("positive integer expected, got " + t);
        }
        function o(t, ...e) {
          if (
            !(
              (r = t) instanceof Uint8Array ||
              (ArrayBuffer.isView(r) && "Uint8Array" === r.constructor.name)
            )
          )
            throw new Error("Uint8Array expected");
          var r;
          if (e.length > 0 && !e.includes(t.length))
            throw new Error(
              "Uint8Array expected of length " + e + ", got length=" + t.length
            );
        }
        function s(t, e = !0) {
          if (t.destroyed) throw new Error("Hash instance has been destroyed");
          if (e && t.finished)
            throw new Error("Hash#digest() has already been called");
        }
        const a =
            "object" == typeof globalThis && "crypto" in globalThis
              ? globalThis.crypto
              : void 0,
          c = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
          u = (t, e) => (t << (32 - e)) | (t >>> e);
        function h(t) {
          return (
            "string" == typeof t &&
              (t = (function (t) {
                if ("string" != typeof t)
                  throw new Error(
                    "utf8ToBytes expected string, got " + typeof t
                  );
                return new Uint8Array(new TextEncoder().encode(t));
              })(t)),
            o(t),
            t
          );
        }
        class l {
          clone() {
            return this._cloneInto();
          }
        }
        function d(t) {
          const e = (e) => t().update(h(e)).digest(),
            r = t();
          return (
            (e.outputLen = r.outputLen),
            (e.blockLen = r.blockLen),
            (e.create = () => t()),
            e
          );
        }
        function f(t = 32) {
          if (a && "function" == typeof a.getRandomValues)
            return a.getRandomValues(new Uint8Array(t));
          if (a && "function" == typeof a.randomBytes) return a.randomBytes(t);
          throw new Error("crypto.getRandomValues must be defined");
        }
        const p = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
        class g extends l {
          constructor(t, e, r, n) {
            super(),
              (this.blockLen = t),
              (this.outputLen = e),
              (this.padOffset = r),
              (this.isLE = n),
              (this.finished = !1),
              (this.length = 0),
              (this.pos = 0),
              (this.destroyed = !1),
              (this.buffer = new Uint8Array(t)),
              (this.view = c(this.buffer));
          }
          update(t) {
            s(this);
            const { view: e, buffer: r, blockLen: n } = this,
              i = (t = h(t)).length;
            for (let o = 0; o < i; ) {
              const s = Math.min(n - this.pos, i - o);
              if (s !== n)
                r.set(t.subarray(o, o + s), this.pos),
                  (this.pos += s),
                  (o += s),
                  this.pos === n && (this.process(e, 0), (this.pos = 0));
              else {
                const e = c(t);
                for (; n <= i - o; o += n) this.process(e, o);
              }
            }
            return (this.length += t.length), this.roundClean(), this;
          }
          digestInto(t) {
            s(this),
              (function (t, e) {
                o(t);
                const r = e.outputLen;
                if (t.length < r)
                  throw new Error(
                    "digestInto() expects output buffer of length at least " + r
                  );
              })(t, this),
              (this.finished = !0);
            const { buffer: e, view: r, blockLen: n, isLE: i } = this;
            let { pos: a } = this;
            (e[a++] = 128),
              this.buffer.subarray(a).fill(0),
              this.padOffset > n - a && (this.process(r, 0), (a = 0));
            for (let t = a; t < n; t++) e[t] = 0;
            !(function (t, e, r, n) {
              if ("function" == typeof t.setBigUint64)
                return t.setBigUint64(e, r, n);
              const i = BigInt(32),
                o = BigInt(4294967295),
                s = Number((r >> i) & o),
                a = Number(r & o),
                c = n ? 4 : 0,
                u = n ? 0 : 4;
              t.setUint32(e + c, s, n), t.setUint32(e + u, a, n);
            })(r, n - 8, BigInt(8 * this.length), i),
              this.process(r, 0);
            const u = c(t),
              h = this.outputLen;
            if (h % 4)
              throw new Error("_sha2: outputLen should be aligned to 32bit");
            const l = h / 4,
              d = this.get();
            if (l > d.length)
              throw new Error("_sha2: outputLen bigger than state");
            for (let t = 0; t < l; t++) u.setUint32(4 * t, d[t], i);
          }
          digest() {
            const { buffer: t, outputLen: e } = this;
            this.digestInto(t);
            const r = t.slice(0, e);
            return this.destroy(), r;
          }
          _cloneInto(t) {
            t || (t = new this.constructor()), t.set(...this.get());
            const {
              blockLen: e,
              buffer: r,
              length: n,
              finished: i,
              destroyed: o,
              pos: s,
            } = this;
            return (
              (t.length = n),
              (t.pos = s),
              (t.finished = i),
              (t.destroyed = o),
              n % e && t.buffer.set(r),
              t
            );
          }
        }
        const m = BigInt(2 ** 32 - 1),
          y = BigInt(32);
        function b(t, e = !1) {
          return e
            ? { h: Number(t & m), l: Number((t >> y) & m) }
            : { h: 0 | Number((t >> y) & m), l: 0 | Number(t & m) };
        }
        const w = function (t, e = !1) {
            let r = new Uint32Array(t.length),
              n = new Uint32Array(t.length);
            for (let i = 0; i < t.length; i++) {
              const { h: o, l: s } = b(t[i], e);
              [r[i], n[i]] = [o, s];
            }
            return [r, n];
          },
          k = (t, e, r) => t >>> r,
          v = (t, e, r) => (t << (32 - r)) | (e >>> r),
          S = (t, e, r) => (t >>> r) | (e << (32 - r)),
          I = (t, e, r) => (t << (32 - r)) | (e >>> r),
          A = (t, e, r) => (t << (64 - r)) | (e >>> (r - 32)),
          E = (t, e, r) => (t >>> (r - 32)) | (e << (64 - r)),
          _ = function (t, e, r, n) {
            const i = (e >>> 0) + (n >>> 0);
            return { h: (t + r + ((i / 2 ** 32) | 0)) | 0, l: 0 | i };
          },
          B = (t, e, r) => (t >>> 0) + (e >>> 0) + (r >>> 0),
          x = (t, e, r, n) => (e + r + n + ((t / 2 ** 32) | 0)) | 0,
          M = (t, e, r, n) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0),
          P = (t, e, r, n, i) => (e + r + n + i + ((t / 2 ** 32) | 0)) | 0,
          R = (t, e, r, n, i, o) =>
            (e + r + n + i + o + ((t / 2 ** 32) | 0)) | 0,
          T = (t, e, r, n, i) =>
            (t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0),
          [O, L] = (() =>
            w(
              [
                "0x428a2f98d728ae22",
                "0x7137449123ef65cd",
                "0xb5c0fbcfec4d3b2f",
                "0xe9b5dba58189dbbc",
                "0x3956c25bf348b538",
                "0x59f111f1b605d019",
                "0x923f82a4af194f9b",
                "0xab1c5ed5da6d8118",
                "0xd807aa98a3030242",
                "0x12835b0145706fbe",
                "0x243185be4ee4b28c",
                "0x550c7dc3d5ffb4e2",
                "0x72be5d74f27b896f",
                "0x80deb1fe3b1696b1",
                "0x9bdc06a725c71235",
                "0xc19bf174cf692694",
                "0xe49b69c19ef14ad2",
                "0xefbe4786384f25e3",
                "0x0fc19dc68b8cd5b5",
                "0x240ca1cc77ac9c65",
                "0x2de92c6f592b0275",
                "0x4a7484aa6ea6e483",
                "0x5cb0a9dcbd41fbd4",
                "0x76f988da831153b5",
                "0x983e5152ee66dfab",
                "0xa831c66d2db43210",
                "0xb00327c898fb213f",
                "0xbf597fc7beef0ee4",
                "0xc6e00bf33da88fc2",
                "0xd5a79147930aa725",
                "0x06ca6351e003826f",
                "0x142929670a0e6e70",
                "0x27b70a8546d22ffc",
                "0x2e1b21385c26c926",
                "0x4d2c6dfc5ac42aed",
                "0x53380d139d95b3df",
                "0x650a73548baf63de",
                "0x766a0abb3c77b2a8",
                "0x81c2c92e47edaee6",
                "0x92722c851482353b",
                "0xa2bfe8a14cf10364",
                "0xa81a664bbc423001",
                "0xc24b8b70d0f89791",
                "0xc76c51a30654be30",
                "0xd192e819d6ef5218",
                "0xd69906245565a910",
                "0xf40e35855771202a",
                "0x106aa07032bbd1b8",
                "0x19a4c116b8d2d0c8",
                "0x1e376c085141ab53",
                "0x2748774cdf8eeb99",
                "0x34b0bcb5e19b48a8",
                "0x391c0cb3c5c95a63",
                "0x4ed8aa4ae3418acb",
                "0x5b9cca4f7763e373",
                "0x682e6ff3d6b2b8a3",
                "0x748f82ee5defb2fc",
                "0x78a5636f43172f60",
                "0x84c87814a1f0ab72",
                "0x8cc702081a6439ec",
                "0x90befffa23631e28",
                "0xa4506cebde82bde9",
                "0xbef9a3f7b2c67915",
                "0xc67178f2e372532b",
                "0xca273eceea26619c",
                "0xd186b8c721c0c207",
                "0xeada7dd6cde0eb1e",
                "0xf57d4f7fee6ed178",
                "0x06f067aa72176fba",
                "0x0a637dc5a2c898a6",
                "0x113f9804bef90dae",
                "0x1b710b35131c471b",
                "0x28db77f523047d84",
                "0x32caab7b40c72493",
                "0x3c9ebe0a15c9bebc",
                "0x431d67c49c100d4c",
                "0x4cc5d4becb3e42b6",
                "0x597f299cfc657e2a",
                "0x5fcb6fab3ad6faec",
                "0x6c44198c4a475817",
              ].map((t) => BigInt(t))
            ))(),
          C = new Uint32Array(80),
          z = new Uint32Array(80);
        class U extends g {
          constructor() {
            super(128, 64, 16, !1),
              (this.Ah = 1779033703),
              (this.Al = -205731576),
              (this.Bh = -1150833019),
              (this.Bl = -2067093701),
              (this.Ch = 1013904242),
              (this.Cl = -23791573),
              (this.Dh = -1521486534),
              (this.Dl = 1595750129),
              (this.Eh = 1359893119),
              (this.El = -1377402159),
              (this.Fh = -1694144372),
              (this.Fl = 725511199),
              (this.Gh = 528734635),
              (this.Gl = -79577749),
              (this.Hh = 1541459225),
              (this.Hl = 327033209);
          }
          get() {
            const {
              Ah: t,
              Al: e,
              Bh: r,
              Bl: n,
              Ch: i,
              Cl: o,
              Dh: s,
              Dl: a,
              Eh: c,
              El: u,
              Fh: h,
              Fl: l,
              Gh: d,
              Gl: f,
              Hh: p,
              Hl: g,
            } = this;
            return [t, e, r, n, i, o, s, a, c, u, h, l, d, f, p, g];
          }
          set(t, e, r, n, i, o, s, a, c, u, h, l, d, f, p, g) {
            (this.Ah = 0 | t),
              (this.Al = 0 | e),
              (this.Bh = 0 | r),
              (this.Bl = 0 | n),
              (this.Ch = 0 | i),
              (this.Cl = 0 | o),
              (this.Dh = 0 | s),
              (this.Dl = 0 | a),
              (this.Eh = 0 | c),
              (this.El = 0 | u),
              (this.Fh = 0 | h),
              (this.Fl = 0 | l),
              (this.Gh = 0 | d),
              (this.Gl = 0 | f),
              (this.Hh = 0 | p),
              (this.Hl = 0 | g);
          }
          process(t, e) {
            for (let r = 0; r < 16; r++, e += 4)
              (C[r] = t.getUint32(e)), (z[r] = t.getUint32((e += 4)));
            for (let t = 16; t < 80; t++) {
              const e = 0 | C[t - 15],
                r = 0 | z[t - 15],
                n = S(e, r, 1) ^ S(e, r, 8) ^ k(e, r, 7),
                i = I(e, r, 1) ^ I(e, r, 8) ^ v(e, r, 7),
                o = 0 | C[t - 2],
                s = 0 | z[t - 2],
                a = S(o, s, 19) ^ A(o, s, 61) ^ k(o, s, 6),
                c = I(o, s, 19) ^ E(o, s, 61) ^ v(o, s, 6),
                u = M(i, c, z[t - 7], z[t - 16]),
                h = P(u, n, a, C[t - 7], C[t - 16]);
              (C[t] = 0 | h), (z[t] = 0 | u);
            }
            let {
              Ah: r,
              Al: n,
              Bh: i,
              Bl: o,
              Ch: s,
              Cl: a,
              Dh: c,
              Dl: u,
              Eh: h,
              El: l,
              Fh: d,
              Fl: f,
              Gh: p,
              Gl: g,
              Hh: m,
              Hl: y,
            } = this;
            for (let t = 0; t < 80; t++) {
              const e = S(h, l, 14) ^ S(h, l, 18) ^ A(h, l, 41),
                b = I(h, l, 14) ^ I(h, l, 18) ^ E(h, l, 41),
                w = (h & d) ^ (~h & p),
                k = T(y, b, (l & f) ^ (~l & g), L[t], z[t]),
                v = R(k, m, e, w, O[t], C[t]),
                M = 0 | k,
                P = S(r, n, 28) ^ A(r, n, 34) ^ A(r, n, 39),
                U = I(r, n, 28) ^ E(r, n, 34) ^ E(r, n, 39),
                N = (r & i) ^ (r & s) ^ (i & s),
                W = (n & o) ^ (n & a) ^ (o & a);
              (m = 0 | p),
                (y = 0 | g),
                (p = 0 | d),
                (g = 0 | f),
                (d = 0 | h),
                (f = 0 | l),
                ({ h, l } = _(0 | c, 0 | u, 0 | v, 0 | M)),
                (c = 0 | s),
                (u = 0 | a),
                (s = 0 | i),
                (a = 0 | o),
                (i = 0 | r),
                (o = 0 | n);
              const K = B(M, U, W);
              (r = x(K, v, P, N)), (n = 0 | K);
            }
            ({ h: r, l: n } = _(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
              ({ h: i, l: o } = _(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | o)),
              ({ h: s, l: a } = _(0 | this.Ch, 0 | this.Cl, 0 | s, 0 | a)),
              ({ h: c, l: u } = _(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | u)),
              ({ h, l } = _(0 | this.Eh, 0 | this.El, 0 | h, 0 | l)),
              ({ h: d, l: f } = _(0 | this.Fh, 0 | this.Fl, 0 | d, 0 | f)),
              ({ h: p, l: g } = _(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | g)),
              ({ h: m, l: y } = _(0 | this.Hh, 0 | this.Hl, 0 | m, 0 | y)),
              this.set(r, n, i, o, s, a, c, u, h, l, d, f, p, g, m, y);
          }
          roundClean() {
            C.fill(0), z.fill(0);
          }
          destroy() {
            this.buffer.fill(0),
              this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          }
        }
        const N = d(() => new U()),
          W = BigInt(0),
          K = BigInt(1),
          q = BigInt(2);
        function D(t) {
          return (
            t instanceof Uint8Array ||
            (ArrayBuffer.isView(t) && "Uint8Array" === t.constructor.name)
          );
        }
        function H(t) {
          if (!D(t)) throw new Error("Uint8Array expected");
        }
        function F(t, e) {
          if ("boolean" != typeof e)
            throw new Error(t + " boolean expected, got " + e);
        }
        const j = Array.from({ length: 256 }, (t, e) =>
          e.toString(16).padStart(2, "0")
        );
        function $(t) {
          H(t);
          let e = "";
          for (let r = 0; r < t.length; r++) e += j[t[r]];
          return e;
        }
        function V(t) {
          const e = t.toString(16);
          return 1 & e.length ? "0" + e : e;
        }
        function G(t) {
          if ("string" != typeof t)
            throw new Error("hex string expected, got " + typeof t);
          return "" === t ? W : BigInt("0x" + t);
        }
        const Y = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
        function Z(t) {
          return t >= Y._0 && t <= Y._9
            ? t - Y._0
            : t >= Y.A && t <= Y.F
            ? t - (Y.A - 10)
            : t >= Y.a && t <= Y.f
            ? t - (Y.a - 10)
            : void 0;
        }
        function J(t) {
          if ("string" != typeof t)
            throw new Error("hex string expected, got " + typeof t);
          const e = t.length,
            r = e / 2;
          if (e % 2)
            throw new Error(
              "hex string expected, got unpadded hex of length " + e
            );
          const n = new Uint8Array(r);
          for (let e = 0, i = 0; e < r; e++, i += 2) {
            const r = Z(t.charCodeAt(i)),
              o = Z(t.charCodeAt(i + 1));
            if (void 0 === r || void 0 === o) {
              const e = t[i] + t[i + 1];
              throw new Error(
                'hex string expected, got non-hex character "' +
                  e +
                  '" at index ' +
                  i
              );
            }
            n[e] = 16 * r + o;
          }
          return n;
        }
        function X(t) {
          return G($(t));
        }
        function Q(t) {
          return H(t), G($(Uint8Array.from(t).reverse()));
        }
        function tt(t, e) {
          return J(t.toString(16).padStart(2 * e, "0"));
        }
        function et(t, e) {
          return tt(t, e).reverse();
        }
        function rt(t, e, r) {
          let n;
          if ("string" == typeof e)
            try {
              n = J(e);
            } catch (e) {
              throw new Error(
                t + " must be hex string or Uint8Array, cause: " + e
              );
            }
          else {
            if (!D(e)) throw new Error(t + " must be hex string or Uint8Array");
            n = Uint8Array.from(e);
          }
          const i = n.length;
          if ("number" == typeof r && i !== r)
            throw new Error(t + " of length " + r + " expected, got " + i);
          return n;
        }
        function nt(...t) {
          let e = 0;
          for (let r = 0; r < t.length; r++) {
            const n = t[r];
            H(n), (e += n.length);
          }
          const r = new Uint8Array(e);
          for (let e = 0, n = 0; e < t.length; e++) {
            const i = t[e];
            r.set(i, n), (n += i.length);
          }
          return r;
        }
        const it = (t) => "bigint" == typeof t && W <= t;
        function ot(t, e, r) {
          return it(t) && it(e) && it(r) && e <= t && t < r;
        }
        function st(t, e, r, n) {
          if (!ot(e, r, n))
            throw new Error(
              "expected valid " + t + ": " + r + " <= n < " + n + ", got " + e
            );
        }
        function at(t) {
          let e;
          for (e = 0; t > W; t >>= K, e += 1);
          return e;
        }
        const ct = (t) => (q << BigInt(t - 1)) - K,
          ut = (t) => new Uint8Array(t),
          ht = (t) => Uint8Array.from(t);
        function lt(t, e, r) {
          if ("number" != typeof t || t < 2)
            throw new Error("hashLen must be a number");
          if ("number" != typeof e || e < 2)
            throw new Error("qByteLen must be a number");
          if ("function" != typeof r)
            throw new Error("hmacFn must be a function");
          let n = ut(t),
            i = ut(t),
            o = 0;
          const s = () => {
              n.fill(1), i.fill(0), (o = 0);
            },
            a = (...t) => r(i, n, ...t),
            c = (t = ut()) => {
              (i = a(ht([0]), t)),
                (n = a()),
                0 !== t.length && ((i = a(ht([1]), t)), (n = a()));
            },
            u = () => {
              if (o++ >= 1e3) throw new Error("drbg: tried 1000 values");
              let t = 0;
              const r = [];
              for (; t < e; ) {
                n = a();
                const e = n.slice();
                r.push(e), (t += n.length);
              }
              return nt(...r);
            };
          return (t, e) => {
            let r;
            for (s(), c(t); !(r = e(u())); ) c();
            return s(), r;
          };
        }
        const dt = {
          bigint: (t) => "bigint" == typeof t,
          function: (t) => "function" == typeof t,
          boolean: (t) => "boolean" == typeof t,
          string: (t) => "string" == typeof t,
          stringOrUint8Array: (t) => "string" == typeof t || D(t),
          isSafeInteger: (t) => Number.isSafeInteger(t),
          array: (t) => Array.isArray(t),
          field: (t, e) => e.Fp.isValid(t),
          hash: (t) =>
            "function" == typeof t && Number.isSafeInteger(t.outputLen),
        };
        function ft(t, e, r = {}) {
          const n = (e, r, n) => {
            const i = dt[r];
            if ("function" != typeof i)
              throw new Error("invalid validator function");
            const o = t[e];
            if (!((n && void 0 === o) || i(o, t)))
              throw new Error(
                "param " +
                  String(e) +
                  " is invalid. Expected " +
                  r +
                  ", got " +
                  o
              );
          };
          for (const [t, r] of Object.entries(e)) n(t, r, !1);
          for (const [t, e] of Object.entries(r)) n(t, e, !0);
          return t;
        }
        function pt(t) {
          const e = new WeakMap();
          return (r, ...n) => {
            const i = e.get(r);
            if (void 0 !== i) return i;
            const o = t(r, ...n);
            return e.set(r, o), o;
          };
        }
        const gt = BigInt(0),
          mt = BigInt(1),
          yt = BigInt(2),
          bt = BigInt(3),
          wt = BigInt(4),
          kt = BigInt(5),
          vt = BigInt(8);
        function St(t, e) {
          const r = t % e;
          return r >= gt ? r : e + r;
        }
        function It(t, e, r) {
          if (e < gt)
            throw new Error("invalid exponent, negatives unsupported");
          if (r <= gt) throw new Error("invalid modulus");
          if (r === mt) return gt;
          let n = mt;
          for (; e > gt; )
            e & mt && (n = (n * t) % r), (t = (t * t) % r), (e >>= mt);
          return n;
        }
        function At(t, e, r) {
          let n = t;
          for (; e-- > gt; ) (n *= n), (n %= r);
          return n;
        }
        function Et(t, e) {
          if (t === gt) throw new Error("invert: expected non-zero number");
          if (e <= gt)
            throw new Error("invert: expected positive modulus, got " + e);
          let r = St(t, e),
            n = e,
            i = gt,
            o = mt,
            s = mt,
            a = gt;
          for (; r !== gt; ) {
            const t = n / r,
              e = n % r,
              c = i - s * t,
              u = o - a * t;
            (n = r), (r = e), (i = s), (o = a), (s = c), (a = u);
          }
          if (n !== mt) throw new Error("invert: does not exist");
          return St(i, e);
        }
        const _t = [
          "create",
          "isValid",
          "is0",
          "neg",
          "inv",
          "sqrt",
          "sqr",
          "eql",
          "add",
          "sub",
          "mul",
          "pow",
          "div",
          "addN",
          "subN",
          "mulN",
          "sqrN",
        ];
        function Bt(t, e) {
          const r = void 0 !== e ? e : t.toString(2).length;
          return { nBitLength: r, nByteLength: Math.ceil(r / 8) };
        }
        function xt(t, e, r = !1, n = {}) {
          if (t <= gt)
            throw new Error("invalid field: expected ORDER > 0, got " + t);
          const { nBitLength: i, nByteLength: o } = Bt(t, e);
          if (o > 2048)
            throw new Error("invalid field: expected ORDER of <= 2048 bytes");
          let s;
          const a = Object.freeze({
            ORDER: t,
            BITS: i,
            BYTES: o,
            MASK: ct(i),
            ZERO: gt,
            ONE: mt,
            create: (e) => St(e, t),
            isValid: (e) => {
              if ("bigint" != typeof e)
                throw new Error(
                  "invalid field element: expected bigint, got " + typeof e
                );
              return gt <= e && e < t;
            },
            is0: (t) => t === gt,
            isOdd: (t) => (t & mt) === mt,
            neg: (e) => St(-e, t),
            eql: (t, e) => t === e,
            sqr: (e) => St(e * e, t),
            add: (e, r) => St(e + r, t),
            sub: (e, r) => St(e - r, t),
            mul: (e, r) => St(e * r, t),
            pow: (t, e) =>
              (function (t, e, r) {
                if (r < gt)
                  throw new Error("invalid exponent, negatives unsupported");
                if (r === gt) return t.ONE;
                if (r === mt) return e;
                let n = t.ONE,
                  i = e;
                for (; r > gt; )
                  r & mt && (n = t.mul(n, i)), (i = t.sqr(i)), (r >>= mt);
                return n;
              })(a, t, e),
            div: (e, r) => St(e * Et(r, t), t),
            sqrN: (t) => t * t,
            addN: (t, e) => t + e,
            subN: (t, e) => t - e,
            mulN: (t, e) => t * e,
            inv: (e) => Et(e, t),
            sqrt:
              n.sqrt ||
              ((e) => (
                s ||
                  (s = (function (t) {
                    if (t % wt === bt) {
                      const e = (t + mt) / wt;
                      return function (t, r) {
                        const n = t.pow(r, e);
                        if (!t.eql(t.sqr(n), r))
                          throw new Error("Cannot find square root");
                        return n;
                      };
                    }
                    if (t % vt === kt) {
                      const e = (t - kt) / vt;
                      return function (t, r) {
                        const n = t.mul(r, yt),
                          i = t.pow(n, e),
                          o = t.mul(r, i),
                          s = t.mul(t.mul(o, yt), i),
                          a = t.mul(o, t.sub(s, t.ONE));
                        if (!t.eql(t.sqr(a), r))
                          throw new Error("Cannot find square root");
                        return a;
                      };
                    }
                    return (function (t) {
                      const e = (t - mt) / yt;
                      let r, n, i;
                      for (r = t - mt, n = 0; r % yt === gt; r /= yt, n++);
                      for (i = yt; i < t && It(i, e, t) !== t - mt; i++)
                        if (i > 1e3)
                          throw new Error(
                            "Cannot find square root: likely non-prime P"
                          );
                      if (1 === n) {
                        const e = (t + mt) / wt;
                        return function (t, r) {
                          const n = t.pow(r, e);
                          if (!t.eql(t.sqr(n), r))
                            throw new Error("Cannot find square root");
                          return n;
                        };
                      }
                      const o = (r + mt) / yt;
                      return function (t, s) {
                        if (t.pow(s, e) === t.neg(t.ONE))
                          throw new Error("Cannot find square root");
                        let a = n,
                          c = t.pow(t.mul(t.ONE, i), r),
                          u = t.pow(s, o),
                          h = t.pow(s, r);
                        for (; !t.eql(h, t.ONE); ) {
                          if (t.eql(h, t.ZERO)) return t.ZERO;
                          let e = 1;
                          for (let r = t.sqr(h); e < a && !t.eql(r, t.ONE); e++)
                            r = t.sqr(r);
                          const r = t.pow(c, mt << BigInt(a - e - 1));
                          (c = t.sqr(r)),
                            (u = t.mul(u, r)),
                            (h = t.mul(h, c)),
                            (a = e);
                        }
                        return u;
                      };
                    })(t);
                  })(t)),
                s(a, e)
              )),
            invertBatch: (t) =>
              (function (t, e) {
                const r = new Array(e.length),
                  n = e.reduce(
                    (e, n, i) => (t.is0(n) ? e : ((r[i] = e), t.mul(e, n))),
                    t.ONE
                  ),
                  i = t.inv(n);
                return (
                  e.reduceRight(
                    (e, n, i) =>
                      t.is0(n) ? e : ((r[i] = t.mul(e, r[i])), t.mul(e, n)),
                    i
                  ),
                  r
                );
              })(a, t),
            cmov: (t, e, r) => (r ? e : t),
            toBytes: (t) => (r ? et(t, o) : tt(t, o)),
            fromBytes: (t) => {
              if (t.length !== o)
                throw new Error(
                  "Field.fromBytes: expected " + o + " bytes, got " + t.length
                );
              return r ? Q(t) : X(t);
            },
          });
          return Object.freeze(a);
        }
        function Mt(t) {
          if ("bigint" != typeof t)
            throw new Error("field order must be bigint");
          const e = t.toString(2).length;
          return Math.ceil(e / 8);
        }
        function Pt(t) {
          const e = Mt(t);
          return e + Math.ceil(e / 2);
        }
        const Rt = BigInt(0),
          Tt = BigInt(1);
        function Ot(t, e) {
          const r = e.negate();
          return t ? r : e;
        }
        function Lt(t, e) {
          if (!Number.isSafeInteger(t) || t <= 0 || t > e)
            throw new Error(
              "invalid window size, expected [1.." + e + "], got W=" + t
            );
        }
        function Ct(t, e) {
          return (
            Lt(t, e),
            { windows: Math.ceil(e / t) + 1, windowSize: 2 ** (t - 1) }
          );
        }
        const zt = new WeakMap(),
          Ut = new WeakMap();
        function Nt(t) {
          return Ut.get(t) || 1;
        }
        function Wt(t, e) {
          return {
            constTimeNegate: Ot,
            hasPrecomputes: (t) => 1 !== Nt(t),
            unsafeLadder(e, r, n = t.ZERO) {
              let i = e;
              for (; r > Rt; )
                r & Tt && (n = n.add(i)), (i = i.double()), (r >>= Tt);
              return n;
            },
            precomputeWindow(t, r) {
              const { windows: n, windowSize: i } = Ct(r, e),
                o = [];
              let s = t,
                a = s;
              for (let t = 0; t < n; t++) {
                (a = s), o.push(a);
                for (let t = 1; t < i; t++) (a = a.add(s)), o.push(a);
                s = a.double();
              }
              return o;
            },
            wNAF(r, n, i) {
              const { windows: o, windowSize: s } = Ct(r, e);
              let a = t.ZERO,
                c = t.BASE;
              const u = BigInt(2 ** r - 1),
                h = 2 ** r,
                l = BigInt(r);
              for (let t = 0; t < o; t++) {
                const e = t * s;
                let r = Number(i & u);
                (i >>= l), r > s && ((r -= h), (i += Tt));
                const o = e,
                  d = e + Math.abs(r) - 1,
                  f = t % 2 != 0,
                  p = r < 0;
                0 === r ? (c = c.add(Ot(f, n[o]))) : (a = a.add(Ot(p, n[d])));
              }
              return { p: a, f: c };
            },
            wNAFUnsafe(r, n, i, o = t.ZERO) {
              const { windows: s, windowSize: a } = Ct(r, e),
                c = BigInt(2 ** r - 1),
                u = 2 ** r,
                h = BigInt(r);
              for (let t = 0; t < s; t++) {
                const e = t * a;
                if (i === Rt) break;
                let r = Number(i & c);
                if (((i >>= h), r > a && ((r -= u), (i += Tt)), 0 === r))
                  continue;
                let s = n[e + Math.abs(r) - 1];
                r < 0 && (s = s.negate()), (o = o.add(s));
              }
              return o;
            },
            getPrecomputes(t, e, r) {
              let n = zt.get(e);
              return (
                n ||
                  ((n = this.precomputeWindow(e, t)),
                  1 !== t && zt.set(e, r(n))),
                n
              );
            },
            wNAFCached(t, e, r) {
              const n = Nt(t);
              return this.wNAF(n, this.getPrecomputes(n, t, r), e);
            },
            wNAFCachedUnsafe(t, e, r, n) {
              const i = Nt(t);
              return 1 === i
                ? this.unsafeLadder(t, e, n)
                : this.wNAFUnsafe(i, this.getPrecomputes(i, t, r), e, n);
            },
            setWindowSize(t, r) {
              Lt(r, e), Ut.set(t, r), zt.delete(t);
            },
          };
        }
        function Kt(t, e, r, n) {
          if (
            ((function (t, e) {
              if (!Array.isArray(t)) throw new Error("array expected");
              t.forEach((t, r) => {
                if (!(t instanceof e))
                  throw new Error("invalid point at index " + r);
              });
            })(r, t),
            (function (t, e) {
              if (!Array.isArray(t))
                throw new Error("array of scalars expected");
              t.forEach((t, r) => {
                if (!e.isValid(t))
                  throw new Error("invalid scalar at index " + r);
              });
            })(n, e),
            r.length !== n.length)
          )
            throw new Error(
              "arrays of points and scalars must have equal length"
            );
          const i = t.ZERO,
            o = at(BigInt(r.length)),
            s = o > 12 ? o - 3 : o > 4 ? o - 2 : o ? 2 : 1,
            a = (1 << s) - 1,
            c = new Array(a + 1).fill(i);
          let u = i;
          for (let t = Math.floor((e.BITS - 1) / s) * s; t >= 0; t -= s) {
            c.fill(i);
            for (let e = 0; e < n.length; e++) {
              const i = n[e],
                o = Number((i >> BigInt(t)) & BigInt(a));
              c[o] = c[o].add(r[e]);
            }
            let e = i;
            for (let t = c.length - 1, r = i; t > 0; t--)
              (r = r.add(c[t])), (e = e.add(r));
            if (((u = u.add(e)), 0 !== t))
              for (let t = 0; t < s; t++) u = u.double();
          }
          return u;
        }
        function qt(t) {
          return (
            ft(
              t.Fp,
              _t.reduce((t, e) => ((t[e] = "function"), t), {
                ORDER: "bigint",
                MASK: "bigint",
                BYTES: "isSafeInteger",
                BITS: "isSafeInteger",
              })
            ),
            ft(
              t,
              { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
              { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }
            ),
            Object.freeze({ ...Bt(t.n, t.nBitLength), ...t, p: t.Fp.ORDER })
          );
        }
        const Dt = BigInt(0),
          Ht = BigInt(1),
          Ft = BigInt(2),
          jt = BigInt(8),
          $t = { zip215: !0 };
        const Vt = BigInt(
            "57896044618658097711785492504343953926634992332820282019728792003956564819949"
          ),
          Gt = BigInt(
            "19681161376707505956807079304988542015446066515923890162744021073123829784752"
          ),
          Yt = (BigInt(0), BigInt(1)),
          Zt = BigInt(2),
          Jt = (BigInt(3), BigInt(5)),
          Xt = BigInt(8);
        function Qt(t) {
          return (t[0] &= 248), (t[31] &= 127), (t[31] |= 64), t;
        }
        function te(t, e) {
          const r = Vt,
            n = St(e * e * e, r),
            i = St(n * n * e, r);
          let o = St(
            t *
              n *
              (function (t) {
                const e = BigInt(10),
                  r = BigInt(20),
                  n = BigInt(40),
                  i = BigInt(80),
                  o = Vt,
                  s = (((t * t) % o) * t) % o,
                  a = (At(s, Zt, o) * s) % o,
                  c = (At(a, Yt, o) * t) % o,
                  u = (At(c, Jt, o) * c) % o,
                  h = (At(u, e, o) * u) % o,
                  l = (At(h, r, o) * h) % o,
                  d = (At(l, n, o) * l) % o,
                  f = (At(d, i, o) * d) % o,
                  p = (At(f, i, o) * d) % o,
                  g = (At(p, e, o) * u) % o;
                return { pow_p_5_8: (At(g, Zt, o) * t) % o, b2: s };
              })(t * i).pow_p_5_8,
            r
          );
          const s = St(e * o * o, r),
            a = o,
            c = St(o * Gt, r),
            u = s === t,
            h = s === St(-t, r),
            l = s === St(-t * Gt, r);
          return (
            u && (o = a),
            (h || l) && (o = c),
            (St(o, r) & mt) === mt && (o = St(-o, r)),
            { isValid: u || h, value: o }
          );
        }
        const ee = (() => xt(Vt, void 0, !0))(),
          re = (() => ({
            a: BigInt(-1),
            d: BigInt(
              "37095705934669439343138083508754565189542113879843219016388785533085940283555"
            ),
            Fp: ee,
            n: BigInt(
              "7237005577332262213973186563042994240857116359379907606001950938285454250989"
            ),
            h: Xt,
            Gx: BigInt(
              "15112221349535400772501151409588531511454012693041857206046113283949847762202"
            ),
            Gy: BigInt(
              "46316835694926478169428394003475163141307993866256225615783033603165251855960"
            ),
            hash: N,
            randomBytes: f,
            adjustScalarBytes: Qt,
            uvRatio: te,
          }))(),
          ne = (() =>
            (function (t) {
              const e = (function (t) {
                  const e = qt(t);
                  return (
                    ft(
                      t,
                      {
                        hash: "function",
                        a: "bigint",
                        d: "bigint",
                        randomBytes: "function",
                      },
                      {
                        adjustScalarBytes: "function",
                        domain: "function",
                        uvRatio: "function",
                        mapToCurve: "function",
                      }
                    ),
                    Object.freeze({ ...e })
                  );
                })(t),
                {
                  Fp: r,
                  n,
                  prehash: i,
                  hash: o,
                  randomBytes: s,
                  nByteLength: a,
                  h: c,
                } = e,
                u = Ft << (BigInt(8 * a) - Ht),
                h = r.create,
                l = xt(e.n, e.nBitLength),
                d =
                  e.uvRatio ||
                  ((t, e) => {
                    try {
                      return { isValid: !0, value: r.sqrt(t * r.inv(e)) };
                    } catch (t) {
                      return { isValid: !1, value: Dt };
                    }
                  }),
                f = e.adjustScalarBytes || ((t) => t),
                p =
                  e.domain ||
                  ((t, e, r) => {
                    if ((F("phflag", r), e.length || r))
                      throw new Error("Contexts/pre-hash are not supported");
                    return t;
                  });
              function g(t, e) {
                st("coordinate " + t, e, Dt, u);
              }
              function m(t) {
                if (!(t instanceof w))
                  throw new Error("ExtendedPoint expected");
              }
              const y = pt((t, e) => {
                  const { ex: n, ey: i, ez: o } = t,
                    s = t.is0();
                  null == e && (e = s ? jt : r.inv(o));
                  const a = h(n * e),
                    c = h(i * e),
                    u = h(o * e);
                  if (s) return { x: Dt, y: Ht };
                  if (u !== Ht) throw new Error("invZ was invalid");
                  return { x: a, y: c };
                }),
                b = pt((t) => {
                  const { a: r, d: n } = e;
                  if (t.is0()) throw new Error("bad point: ZERO");
                  const { ex: i, ey: o, ez: s, et: a } = t,
                    c = h(i * i),
                    u = h(o * o),
                    l = h(s * s),
                    d = h(l * l),
                    f = h(c * r);
                  if (h(l * h(f + u)) !== h(d + h(n * h(c * u))))
                    throw new Error("bad point: equation left != right (1)");
                  if (h(i * o) !== h(s * a))
                    throw new Error("bad point: equation left != right (2)");
                  return !0;
                });
              class w {
                constructor(t, e, r, n) {
                  (this.ex = t),
                    (this.ey = e),
                    (this.ez = r),
                    (this.et = n),
                    g("x", t),
                    g("y", e),
                    g("z", r),
                    g("t", n),
                    Object.freeze(this);
                }
                get x() {
                  return this.toAffine().x;
                }
                get y() {
                  return this.toAffine().y;
                }
                static fromAffine(t) {
                  if (t instanceof w)
                    throw new Error("extended point not allowed");
                  const { x: e, y: r } = t || {};
                  return g("x", e), g("y", r), new w(e, r, Ht, h(e * r));
                }
                static normalizeZ(t) {
                  const e = r.invertBatch(t.map((t) => t.ez));
                  return t.map((t, r) => t.toAffine(e[r])).map(w.fromAffine);
                }
                static msm(t, e) {
                  return Kt(w, l, t, e);
                }
                _setWindowSize(t) {
                  S.setWindowSize(this, t);
                }
                assertValidity() {
                  b(this);
                }
                equals(t) {
                  m(t);
                  const { ex: e, ey: r, ez: n } = this,
                    { ex: i, ey: o, ez: s } = t,
                    a = h(e * s),
                    c = h(i * n),
                    u = h(r * s),
                    l = h(o * n);
                  return a === c && u === l;
                }
                is0() {
                  return this.equals(w.ZERO);
                }
                negate() {
                  return new w(h(-this.ex), this.ey, this.ez, h(-this.et));
                }
                double() {
                  const { a: t } = e,
                    { ex: r, ey: n, ez: i } = this,
                    o = h(r * r),
                    s = h(n * n),
                    a = h(Ft * h(i * i)),
                    c = h(t * o),
                    u = r + n,
                    l = h(h(u * u) - o - s),
                    d = c + s,
                    f = d - a,
                    p = c - s,
                    g = h(l * f),
                    m = h(d * p),
                    y = h(l * p),
                    b = h(f * d);
                  return new w(g, m, b, y);
                }
                add(t) {
                  m(t);
                  const { a: r, d: n } = e,
                    { ex: i, ey: o, ez: s, et: a } = this,
                    { ex: c, ey: u, ez: l, et: d } = t;
                  if (r === BigInt(-1)) {
                    const t = h((o - i) * (u + c)),
                      e = h((o + i) * (u - c)),
                      r = h(e - t);
                    if (r === Dt) return this.double();
                    const n = h(s * Ft * d),
                      f = h(a * Ft * l),
                      p = f + n,
                      g = e + t,
                      m = f - n,
                      y = h(p * r),
                      b = h(g * m),
                      k = h(p * m),
                      v = h(r * g);
                    return new w(y, b, v, k);
                  }
                  const f = h(i * c),
                    p = h(o * u),
                    g = h(a * n * d),
                    y = h(s * l),
                    b = h((i + o) * (c + u) - f - p),
                    k = y - g,
                    v = y + g,
                    S = h(p - r * f),
                    I = h(b * k),
                    A = h(v * S),
                    E = h(b * S),
                    _ = h(k * v);
                  return new w(I, A, _, E);
                }
                subtract(t) {
                  return this.add(t.negate());
                }
                wNAF(t) {
                  return S.wNAFCached(this, t, w.normalizeZ);
                }
                multiply(t) {
                  const e = t;
                  st("scalar", e, Ht, n);
                  const { p: r, f: i } = this.wNAF(e);
                  return w.normalizeZ([r, i])[0];
                }
                multiplyUnsafe(t, e = w.ZERO) {
                  const r = t;
                  return (
                    st("scalar", r, Dt, n),
                    r === Dt
                      ? v
                      : this.is0() || r === Ht
                      ? this
                      : S.wNAFCachedUnsafe(this, r, w.normalizeZ, e)
                  );
                }
                isSmallOrder() {
                  return this.multiplyUnsafe(c).is0();
                }
                isTorsionFree() {
                  return S.unsafeLadder(this, n).is0();
                }
                toAffine(t) {
                  return y(this, t);
                }
                clearCofactor() {
                  const { h: t } = e;
                  return t === Ht ? this : this.multiplyUnsafe(t);
                }
                static fromHex(t, n = !1) {
                  const { d: i, a: o } = e,
                    s = r.BYTES;
                  (t = rt("pointHex", t, s)), F("zip215", n);
                  const a = t.slice(),
                    c = t[s - 1];
                  a[s - 1] = -129 & c;
                  const l = Q(a),
                    f = n ? u : r.ORDER;
                  st("pointHex.y", l, Dt, f);
                  const p = h(l * l),
                    g = h(p - Ht),
                    m = h(i * p - o);
                  let { isValid: y, value: b } = d(g, m);
                  if (!y)
                    throw new Error("Point.fromHex: invalid y coordinate");
                  const k = (b & Ht) === Ht,
                    v = !!(128 & c);
                  if (!n && b === Dt && v)
                    throw new Error("Point.fromHex: x=0 and x_0=1");
                  return v !== k && (b = h(-b)), w.fromAffine({ x: b, y: l });
                }
                static fromPrivateKey(t) {
                  return E(t).point;
                }
                toRawBytes() {
                  const { x: t, y: e } = this.toAffine(),
                    n = et(e, r.BYTES);
                  return (n[n.length - 1] |= t & Ht ? 128 : 0), n;
                }
                toHex() {
                  return $(this.toRawBytes());
                }
              }
              (w.BASE = new w(e.Gx, e.Gy, Ht, h(e.Gx * e.Gy))),
                (w.ZERO = new w(Dt, Ht, Ht, Dt));
              const { BASE: k, ZERO: v } = w,
                S = Wt(w, 8 * a);
              function I(t) {
                return St(t, n);
              }
              function A(t) {
                return I(Q(t));
              }
              function E(t) {
                const e = r.BYTES;
                t = rt("private key", t, e);
                const n = rt("hashed private key", o(t), 2 * e),
                  i = f(n.slice(0, e)),
                  s = n.slice(e, 2 * e),
                  a = A(i),
                  c = k.multiply(a),
                  u = c.toRawBytes();
                return {
                  head: i,
                  prefix: s,
                  scalar: a,
                  point: c,
                  pointBytes: u,
                };
              }
              function _(t = new Uint8Array(), ...e) {
                const r = nt(...e);
                return A(o(p(r, rt("context", t), !!i)));
              }
              const B = $t;
              return (
                k._setWindowSize(8),
                {
                  CURVE: e,
                  getPublicKey: function (t) {
                    return E(t).pointBytes;
                  },
                  sign: function (t, e, o = {}) {
                    (t = rt("message", t)), i && (t = i(t));
                    const { prefix: s, scalar: a, pointBytes: c } = E(e),
                      u = _(o.context, s, t),
                      h = k.multiply(u).toRawBytes(),
                      l = I(u + _(o.context, h, c, t) * a);
                    return (
                      st("signature.s", l, Dt, n),
                      rt("result", nt(h, et(l, r.BYTES)), 2 * r.BYTES)
                    );
                  },
                  verify: function (t, e, n, o = B) {
                    const { context: s, zip215: a } = o,
                      c = r.BYTES;
                    (t = rt("signature", t, 2 * c)),
                      (e = rt("message", e)),
                      (n = rt("publicKey", n, c)),
                      void 0 !== a && F("zip215", a),
                      i && (e = i(e));
                    const u = Q(t.slice(c, 2 * c));
                    let h, l, d;
                    try {
                      (h = w.fromHex(n, a)),
                        (l = w.fromHex(t.slice(0, c), a)),
                        (d = k.multiplyUnsafe(u));
                    } catch (t) {
                      return !1;
                    }
                    if (!a && h.isSmallOrder()) return !1;
                    const f = _(s, l.toRawBytes(), h.toRawBytes(), e);
                    return l
                      .add(h.multiplyUnsafe(f))
                      .subtract(d)
                      .clearCofactor()
                      .equals(w.ZERO);
                  },
                  ExtendedPoint: w,
                  utils: {
                    getExtendedPublicKey: E,
                    randomPrivateKey: () => s(r.BYTES),
                    precompute: (t = 8, e = w.BASE) => (
                      e._setWindowSize(t), e.multiply(BigInt(3)), e
                    ),
                  },
                }
              );
            })(re))();
        var ie = r(404),
          oe = r.n(ie),
          se = r(763),
          ae = r.n(se);
        function ce(t) {
          if (!Number.isSafeInteger(t) || t < 0)
            throw new Error("positive integer expected, got " + t);
        }
        function ue(t, ...e) {
          if (
            !(
              (r = t) instanceof Uint8Array ||
              (ArrayBuffer.isView(r) && "Uint8Array" === r.constructor.name)
            )
          )
            throw new Error("Uint8Array expected");
          var r;
          if (e.length > 0 && !e.includes(t.length))
            throw new Error(
              "Uint8Array expected of length " + e + ", got length=" + t.length
            );
        }
        function he(t, e = !0) {
          if (t.destroyed) throw new Error("Hash instance has been destroyed");
          if (e && t.finished)
            throw new Error("Hash#digest() has already been called");
        }
        function le(t, e) {
          ue(t);
          const r = e.outputLen;
          if (t.length < r)
            throw new Error(
              "digestInto() expects output buffer of length at least " + r
            );
        }
        const de = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
          fe = (t, e) => (t << (32 - e)) | (t >>> e),
          pe = (() =>
            68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])();
        function ge(t) {
          for (let r = 0; r < t.length; r++)
            t[r] =
              (((e = t[r]) << 24) & 4278190080) |
              ((e << 8) & 16711680) |
              ((e >>> 8) & 65280) |
              ((e >>> 24) & 255);
          var e;
        }
        function me(t) {
          return (
            "string" == typeof t &&
              (t = (function (t) {
                if ("string" != typeof t)
                  throw new Error(
                    "utf8ToBytes expected string, got " + typeof t
                  );
                return new Uint8Array(new TextEncoder().encode(t));
              })(t)),
            ue(t),
            t
          );
        }
        class ye {
          clone() {
            return this._cloneInto();
          }
        }
        function be(t) {
          const e = (e) => t().update(me(e)).digest(),
            r = t();
          return (
            (e.outputLen = r.outputLen),
            (e.blockLen = r.blockLen),
            (e.create = () => t()),
            e
          );
        }
        const we = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
        class ke extends ye {
          constructor(t, e, r, n) {
            super(),
              (this.blockLen = t),
              (this.outputLen = e),
              (this.padOffset = r),
              (this.isLE = n),
              (this.finished = !1),
              (this.length = 0),
              (this.pos = 0),
              (this.destroyed = !1),
              (this.buffer = new Uint8Array(t)),
              (this.view = de(this.buffer));
          }
          update(t) {
            he(this);
            const { view: e, buffer: r, blockLen: n } = this,
              i = (t = me(t)).length;
            for (let o = 0; o < i; ) {
              const s = Math.min(n - this.pos, i - o);
              if (s !== n)
                r.set(t.subarray(o, o + s), this.pos),
                  (this.pos += s),
                  (o += s),
                  this.pos === n && (this.process(e, 0), (this.pos = 0));
              else {
                const e = de(t);
                for (; n <= i - o; o += n) this.process(e, o);
              }
            }
            return (this.length += t.length), this.roundClean(), this;
          }
          digestInto(t) {
            he(this), le(t, this), (this.finished = !0);
            const { buffer: e, view: r, blockLen: n, isLE: i } = this;
            let { pos: o } = this;
            (e[o++] = 128),
              this.buffer.subarray(o).fill(0),
              this.padOffset > n - o && (this.process(r, 0), (o = 0));
            for (let t = o; t < n; t++) e[t] = 0;
            !(function (t, e, r, n) {
              if ("function" == typeof t.setBigUint64)
                return t.setBigUint64(e, r, n);
              const i = BigInt(32),
                o = BigInt(4294967295),
                s = Number((r >> i) & o),
                a = Number(r & o),
                c = n ? 4 : 0,
                u = n ? 0 : 4;
              t.setUint32(e + c, s, n), t.setUint32(e + u, a, n);
            })(r, n - 8, BigInt(8 * this.length), i),
              this.process(r, 0);
            const s = de(t),
              a = this.outputLen;
            if (a % 4)
              throw new Error("_sha2: outputLen should be aligned to 32bit");
            const c = a / 4,
              u = this.get();
            if (c > u.length)
              throw new Error("_sha2: outputLen bigger than state");
            for (let t = 0; t < c; t++) s.setUint32(4 * t, u[t], i);
          }
          digest() {
            const { buffer: t, outputLen: e } = this;
            this.digestInto(t);
            const r = t.slice(0, e);
            return this.destroy(), r;
          }
          _cloneInto(t) {
            t || (t = new this.constructor()), t.set(...this.get());
            const {
              blockLen: e,
              buffer: r,
              length: n,
              finished: i,
              destroyed: o,
              pos: s,
            } = this;
            return (
              (t.length = n),
              (t.pos = s),
              (t.finished = i),
              (t.destroyed = o),
              n % e && t.buffer.set(r),
              t
            );
          }
        }
        const ve = new Uint32Array([
            1116352408, 1899447441, 3049323471, 3921009573, 961987163,
            1508970993, 2453635748, 2870763221, 3624381080, 310598401,
            607225278, 1426881987, 1925078388, 2162078206, 2614888103,
            3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
            1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
            2952996808, 3210313671, 3336571891, 3584528711, 113926993,
            338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
            1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
            3259730800, 3345764771, 3516065817, 3600352804, 4094571909,
            275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
            1322822218, 1537002063, 1747873779, 1955562222, 2024104815,
            2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
          ]),
          Se = new Uint32Array([
            1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
            2600822924, 528734635, 1541459225,
          ]),
          Ie = new Uint32Array(64);
        class Ae extends ke {
          constructor() {
            super(64, 32, 8, !1),
              (this.A = 0 | Se[0]),
              (this.B = 0 | Se[1]),
              (this.C = 0 | Se[2]),
              (this.D = 0 | Se[3]),
              (this.E = 0 | Se[4]),
              (this.F = 0 | Se[5]),
              (this.G = 0 | Se[6]),
              (this.H = 0 | Se[7]);
          }
          get() {
            const { A: t, B: e, C: r, D: n, E: i, F: o, G: s, H: a } = this;
            return [t, e, r, n, i, o, s, a];
          }
          set(t, e, r, n, i, o, s, a) {
            (this.A = 0 | t),
              (this.B = 0 | e),
              (this.C = 0 | r),
              (this.D = 0 | n),
              (this.E = 0 | i),
              (this.F = 0 | o),
              (this.G = 0 | s),
              (this.H = 0 | a);
          }
          process(t, e) {
            for (let r = 0; r < 16; r++, e += 4) Ie[r] = t.getUint32(e, !1);
            for (let t = 16; t < 64; t++) {
              const e = Ie[t - 15],
                r = Ie[t - 2],
                n = fe(e, 7) ^ fe(e, 18) ^ (e >>> 3),
                i = fe(r, 17) ^ fe(r, 19) ^ (r >>> 10);
              Ie[t] = (i + Ie[t - 7] + n + Ie[t - 16]) | 0;
            }
            let { A: r, B: n, C: i, D: o, E: s, F: a, G: c, H: u } = this;
            for (let t = 0; t < 64; t++) {
              const e =
                  (u +
                    (fe(s, 6) ^ fe(s, 11) ^ fe(s, 25)) +
                    (((h = s) & a) ^ (~h & c)) +
                    ve[t] +
                    Ie[t]) |
                  0,
                l = ((fe(r, 2) ^ fe(r, 13) ^ fe(r, 22)) + we(r, n, i)) | 0;
              (u = c),
                (c = a),
                (a = s),
                (s = (o + e) | 0),
                (o = i),
                (i = n),
                (n = r),
                (r = (e + l) | 0);
            }
            var h;
            (r = (r + this.A) | 0),
              (n = (n + this.B) | 0),
              (i = (i + this.C) | 0),
              (o = (o + this.D) | 0),
              (s = (s + this.E) | 0),
              (a = (a + this.F) | 0),
              (c = (c + this.G) | 0),
              (u = (u + this.H) | 0),
              this.set(r, n, i, o, s, a, c, u);
          }
          roundClean() {
            Ie.fill(0);
          }
          destroy() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
          }
        }
        const Ee = be(() => new Ae());
        var _e = r(755),
          Be = r(601),
          xe = r(184);
        class Me extends TypeError {
          constructor(t, e) {
            let r;
            const { message: n, explanation: i, ...o } = t,
              { path: s } = t,
              a = 0 === s.length ? n : `At path: ${s.join(".")} -- ${n}`;
            super(i ?? a),
              null != i && (this.cause = a),
              Object.assign(this, o),
              (this.name = this.constructor.name),
              (this.failures = () => r ?? (r = [t, ...e()]));
          }
        }
        function Pe(t) {
          return "object" == typeof t && null != t;
        }
        function Re(t) {
          return Pe(t) && !Array.isArray(t);
        }
        function Te(t) {
          return "symbol" == typeof t
            ? t.toString()
            : "string" == typeof t
            ? JSON.stringify(t)
            : `${t}`;
        }
        function Oe(t, e, r, n) {
          if (!0 === t) return;
          !1 === t ? (t = {}) : "string" == typeof t && (t = { message: t });
          const { path: i, branch: o } = e,
            { type: s } = r,
            {
              refinement: a,
              message: c = `Expected a value of type \`${s}\`${
                a ? ` with refinement \`${a}\`` : ""
              }, but received: \`${Te(n)}\``,
            } = t;
          return {
            value: n,
            type: s,
            refinement: a,
            key: i[i.length - 1],
            path: i,
            branch: o,
            ...t,
            message: c,
          };
        }
        function* Le(t, e, r, n) {
          var i;
          (Pe((i = t)) && "function" == typeof i[Symbol.iterator]) || (t = [t]);
          for (const i of t) {
            const t = Oe(i, e, r, n);
            t && (yield t);
          }
        }
        function* Ce(t, e, r = {}) {
          const {
              path: n = [],
              branch: i = [t],
              coerce: o = !1,
              mask: s = !1,
            } = r,
            a = { path: n, branch: i, mask: s };
          o && (t = e.coercer(t, a));
          let c = "valid";
          for (const n of e.validator(t, a))
            (n.explanation = r.message), (c = "not_valid"), yield [n, void 0];
          for (let [u, h, l] of e.entries(t, a)) {
            const e = Ce(h, l, {
              path: void 0 === u ? n : [...n, u],
              branch: void 0 === u ? i : [...i, h],
              coerce: o,
              mask: s,
              message: r.message,
            });
            for (const r of e)
              r[0]
                ? ((c = null != r[0].refinement ? "not_refined" : "not_valid"),
                  yield [r[0], void 0])
                : o &&
                  ((h = r[1]),
                  void 0 === u
                    ? (t = h)
                    : t instanceof Map
                    ? t.set(u, h)
                    : t instanceof Set
                    ? t.add(h)
                    : Pe(t) && (void 0 !== h || u in t) && (t[u] = h));
          }
          if ("not_valid" !== c)
            for (const n of e.refiner(t, a))
              (n.explanation = r.message),
                (c = "not_refined"),
                yield [n, void 0];
          "valid" === c && (yield [void 0, t]);
        }
        class ze {
          constructor(t) {
            const {
              type: e,
              schema: r,
              validator: n,
              refiner: i,
              coercer: o = (t) => t,
              entries: s = function* () {},
            } = t;
            (this.type = e),
              (this.schema = r),
              (this.entries = s),
              (this.coercer = o),
              (this.validator = n
                ? (t, e) => Le(n(t, e), e, this, t)
                : () => []),
              (this.refiner = i ? (t, e) => Le(i(t, e), e, this, t) : () => []);
          }
          assert(t, e) {
            return Ue(t, this, e);
          }
          create(t, e) {
            return Ne(t, this, e);
          }
          is(t) {
            return We(t, this);
          }
          mask(t, e) {
            return (function (t, e, r) {
              const n = Ke(t, e, { coerce: !0, mask: !0, message: r });
              if (n[0]) throw n[0];
              return n[1];
            })(t, this, e);
          }
          validate(t, e = {}) {
            return Ke(t, this, e);
          }
        }
        function Ue(t, e, r) {
          const n = Ke(t, e, { message: r });
          if (n[0]) throw n[0];
        }
        function Ne(t, e, r) {
          const n = Ke(t, e, { coerce: !0, message: r });
          if (n[0]) throw n[0];
          return n[1];
        }
        function We(t, e) {
          return !Ke(t, e)[0];
        }
        function Ke(t, e, r = {}) {
          const n = Ce(t, e, r),
            i = (function (t) {
              const { done: e, value: r } = t.next();
              return e ? void 0 : r;
            })(n);
          return i[0]
            ? [
                new Me(i[0], function* () {
                  for (const t of n) t[0] && (yield t[0]);
                }),
                void 0,
              ]
            : [void 0, i[1]];
        }
        function qe(t, e) {
          return new ze({ type: t, schema: null, validator: e });
        }
        function De(t) {
          return new ze({
            type: "array",
            schema: t,
            *entries(e) {
              if (t && Array.isArray(e))
                for (const [r, n] of e.entries()) yield [r, n, t];
            },
            coercer: (t) => (Array.isArray(t) ? t.slice() : t),
            validator: (t) =>
              Array.isArray(t) ||
              `Expected an array value, but received: ${Te(t)}`,
          });
        }
        function He() {
          return qe("boolean", (t) => "boolean" == typeof t);
        }
        function Fe(t) {
          return qe(
            "instance",
            (e) =>
              e instanceof t ||
              `Expected a \`${t.name}\` instance, but received: ${Te(e)}`
          );
        }
        function je(t) {
          const e = Te(t),
            r = typeof t;
          return new ze({
            type: "literal",
            schema:
              "string" === r || "number" === r || "boolean" === r ? t : null,
            validator: (r) =>
              r === t ||
              `Expected the literal \`${e}\`, but received: ${Te(r)}`,
          });
        }
        function $e(t) {
          return new ze({
            ...t,
            validator: (e, r) => null === e || t.validator(e, r),
            refiner: (e, r) => null === e || t.refiner(e, r),
          });
        }
        function Ve() {
          return qe(
            "number",
            (t) =>
              ("number" == typeof t && !isNaN(t)) ||
              `Expected a number, but received: ${Te(t)}`
          );
        }
        function Ge(t) {
          return new ze({
            ...t,
            validator: (e, r) => void 0 === e || t.validator(e, r),
            refiner: (e, r) => void 0 === e || t.refiner(e, r),
          });
        }
        function Ye(t, e) {
          return new ze({
            type: "record",
            schema: null,
            *entries(r) {
              if (Pe(r))
                for (const n in r) {
                  const i = r[n];
                  yield [n, n, t], yield [n, i, e];
                }
            },
            validator: (t) =>
              Re(t) || `Expected an object, but received: ${Te(t)}`,
            coercer: (t) => (Re(t) ? { ...t } : t),
          });
        }
        function Ze() {
          return qe(
            "string",
            (t) =>
              "string" == typeof t ||
              `Expected a string, but received: ${Te(t)}`
          );
        }
        function Je(t) {
          const e = qe("never", () => !1);
          return new ze({
            type: "tuple",
            schema: null,
            *entries(r) {
              if (Array.isArray(r)) {
                const n = Math.max(t.length, r.length);
                for (let i = 0; i < n; i++) yield [i, r[i], t[i] || e];
              }
            },
            validator: (t) =>
              Array.isArray(t) || `Expected an array, but received: ${Te(t)}`,
            coercer: (t) => (Array.isArray(t) ? t.slice() : t),
          });
        }
        function Xe(t) {
          const e = Object.keys(t);
          return new ze({
            type: "type",
            schema: t,
            *entries(r) {
              if (Pe(r)) for (const n of e) yield [n, r[n], t[n]];
            },
            validator: (t) =>
              Re(t) || `Expected an object, but received: ${Te(t)}`,
            coercer: (t) => (Re(t) ? { ...t } : t),
          });
        }
        function Qe(t) {
          const e = t.map((t) => t.type).join(" | ");
          return new ze({
            type: "union",
            schema: null,
            coercer(e, r) {
              for (const n of t) {
                const [t, i] = n.validate(e, { coerce: !0, mask: r.mask });
                if (!t) return i;
              }
              return e;
            },
            validator(r, n) {
              const i = [];
              for (const e of t) {
                const [...t] = Ce(r, e, n),
                  [o] = t;
                if (!o[0]) return [];
                for (const [e] of t) e && i.push(e);
              }
              return [
                `Expected the value to satisfy a union of \`${e}\`, but received: ${Te(
                  r
                )}`,
                ...i,
              ];
            },
          });
        }
        function tr() {
          return qe("unknown", () => !0);
        }
        function er(t, e, r) {
          return new ze({
            ...t,
            coercer: (n, i) =>
              We(n, e) ? t.coercer(r(n, i), i) : t.coercer(n, i),
          });
        }
        var rr = r(22),
          nr = r.n(rr),
          ir = r(228),
          or = class extends ir {
            socket;
            constructor(t, e, r) {
              super(),
                (this.socket = new window.WebSocket(t, r)),
                (this.socket.onopen = () => this.emit("open")),
                (this.socket.onmessage = (t) => this.emit("message", t.data)),
                (this.socket.onerror = (t) => this.emit("error", t)),
                (this.socket.onclose = (t) => {
                  this.emit("close", t.code, t.reason);
                });
            }
            send(t, e, r) {
              const n = r || e;
              try {
                this.socket.send(t), n();
              } catch (t) {
                n(t);
              }
            }
            close(t, e) {
              this.socket.close(t, e);
            }
            addEventListener(t, e, r) {
              this.socket.addEventListener(t, e, r);
            }
          };
        var sr = class {
            encode(t) {
              return JSON.stringify(t);
            }
            decode(t) {
              return JSON.parse(t);
            }
          },
          ar = class extends ir {
            address;
            rpc_id;
            queue;
            options;
            autoconnect;
            ready;
            reconnect;
            reconnect_timer_id;
            reconnect_interval;
            max_reconnects;
            rest_options;
            current_reconnects;
            generate_request_id;
            socket;
            webSocketFactory;
            dataPack;
            constructor(
              t,
              e = "ws://localhost:8080",
              {
                autoconnect: r = !0,
                reconnect: n = !0,
                reconnect_interval: i = 1e3,
                max_reconnects: o = 5,
                ...s
              } = {},
              a,
              c
            ) {
              super(),
                (this.webSocketFactory = t),
                (this.queue = {}),
                (this.rpc_id = 0),
                (this.address = e),
                (this.autoconnect = r),
                (this.ready = !1),
                (this.reconnect = n),
                (this.reconnect_timer_id = void 0),
                (this.reconnect_interval = i),
                (this.max_reconnects = o),
                (this.rest_options = s),
                (this.current_reconnects = 0),
                (this.generate_request_id = a || (() => ++this.rpc_id)),
                (this.dataPack = c || new sr()),
                this.autoconnect &&
                  this._connect(this.address, {
                    autoconnect: this.autoconnect,
                    reconnect: this.reconnect,
                    reconnect_interval: this.reconnect_interval,
                    max_reconnects: this.max_reconnects,
                    ...this.rest_options,
                  });
            }
            connect() {
              this.socket ||
                this._connect(this.address, {
                  autoconnect: this.autoconnect,
                  reconnect: this.reconnect,
                  reconnect_interval: this.reconnect_interval,
                  max_reconnects: this.max_reconnects,
                  ...this.rest_options,
                });
            }
            call(t, e, r, n) {
              return (
                n || "object" != typeof r || ((n = r), (r = null)),
                new Promise((i, o) => {
                  if (!this.ready) return o(new Error("socket not ready"));
                  const s = this.generate_request_id(t, e),
                    a = {
                      jsonrpc: "2.0",
                      method: t,
                      params: e || void 0,
                      id: s,
                    };
                  this.socket.send(this.dataPack.encode(a), n, (t) => {
                    if (t) return o(t);
                    (this.queue[s] = { promise: [i, o] }),
                      r &&
                        (this.queue[s].timeout = setTimeout(() => {
                          delete this.queue[s], o(new Error("reply timeout"));
                        }, r));
                  });
                })
              );
            }
            async login(t) {
              const e = await this.call("rpc.login", t);
              if (!e) throw new Error("authentication failed");
              return e;
            }
            async listMethods() {
              return await this.call("__listMethods");
            }
            notify(t, e) {
              return new Promise((r, n) => {
                if (!this.ready) return n(new Error("socket not ready"));
                const i = { jsonrpc: "2.0", method: t, params: e };
                this.socket.send(this.dataPack.encode(i), (t) => {
                  if (t) return n(t);
                  r();
                });
              });
            }
            async subscribe(t) {
              "string" == typeof t && (t = [t]);
              const e = await this.call("rpc.on", t);
              if ("string" == typeof t && "ok" !== e[t])
                throw new Error(
                  "Failed subscribing to an event '" + t + "' with: " + e[t]
                );
              return e;
            }
            async unsubscribe(t) {
              "string" == typeof t && (t = [t]);
              const e = await this.call("rpc.off", t);
              if ("string" == typeof t && "ok" !== e[t])
                throw new Error(
                  "Failed unsubscribing from an event with: " + e
                );
              return e;
            }
            close(t, e) {
              this.socket.close(t || 1e3, e);
            }
            setAutoReconnect(t) {
              this.reconnect = t;
            }
            setReconnectInterval(t) {
              this.reconnect_interval = t;
            }
            setMaxReconnects(t) {
              this.max_reconnects = t;
            }
            _connect(t, r) {
              clearTimeout(this.reconnect_timer_id),
                (this.socket = this.webSocketFactory(t, r)),
                this.socket.addEventListener("open", () => {
                  (this.ready = !0),
                    this.emit("open"),
                    (this.current_reconnects = 0);
                }),
                this.socket.addEventListener("message", ({ data: t }) => {
                  t instanceof ArrayBuffer && (t = e.Buffer.from(t).toString());
                  try {
                    t = this.dataPack.decode(t);
                  } catch (t) {
                    return;
                  }
                  if (t.notification && this.listeners(t.notification).length) {
                    if (!Object.keys(t.params).length)
                      return this.emit(t.notification);
                    const e = [t.notification];
                    if (t.params.constructor === Object) e.push(t.params);
                    else
                      for (let r = 0; r < t.params.length; r++)
                        e.push(t.params[r]);
                    return Promise.resolve().then(() => {
                      this.emit.apply(this, e);
                    });
                  }
                  if (!this.queue[t.id])
                    return t.method
                      ? Promise.resolve().then(() => {
                          this.emit(t.method, t?.params);
                        })
                      : void 0;
                  "error" in t == "result" in t &&
                    this.queue[t.id].promise[1](
                      new Error(
                        'Server response malformed. Response must include either "result" or "error", but not both.'
                      )
                    ),
                    this.queue[t.id].timeout &&
                      clearTimeout(this.queue[t.id].timeout),
                    t.error
                      ? this.queue[t.id].promise[1](t.error)
                      : this.queue[t.id].promise[0](t.result),
                    delete this.queue[t.id];
                }),
                this.socket.addEventListener("error", (t) =>
                  this.emit("error", t)
                ),
                this.socket.addEventListener(
                  "close",
                  ({ code: e, reason: n }) => {
                    this.ready && setTimeout(() => this.emit("close", e, n), 0),
                      (this.ready = !1),
                      (this.socket = void 0),
                      1e3 !== e &&
                        (this.current_reconnects++,
                        this.reconnect &&
                          (this.max_reconnects > this.current_reconnects ||
                            0 === this.max_reconnects) &&
                          (this.reconnect_timer_id = setTimeout(
                            () => this._connect(t, r),
                            this.reconnect_interval
                          )));
                  }
                );
            }
          };
        const cr = BigInt(2 ** 32 - 1),
          ur = BigInt(32);
        function hr(t, e = !1) {
          return e
            ? { h: Number(t & cr), l: Number((t >> ur) & cr) }
            : { h: 0 | Number((t >> ur) & cr), l: 0 | Number(t & cr) };
        }
        function lr(t, e = !1) {
          let r = new Uint32Array(t.length),
            n = new Uint32Array(t.length);
          for (let i = 0; i < t.length; i++) {
            const { h: o, l: s } = hr(t[i], e);
            [r[i], n[i]] = [o, s];
          }
          return [r, n];
        }
        const dr = [],
          fr = [],
          pr = [],
          gr = BigInt(0),
          mr = BigInt(1),
          yr = BigInt(2),
          br = BigInt(7),
          wr = BigInt(256),
          kr = BigInt(113);
        for (let t = 0, e = mr, r = 1, n = 0; t < 24; t++) {
          ([r, n] = [n, (2 * r + 3 * n) % 5]),
            dr.push(2 * (5 * n + r)),
            fr.push((((t + 1) * (t + 2)) / 2) % 64);
          let i = gr;
          for (let t = 0; t < 7; t++)
            (e = ((e << mr) ^ ((e >> br) * kr)) % wr),
              e & yr && (i ^= mr << ((mr << BigInt(t)) - mr));
          pr.push(i);
        }
        const [vr, Sr] = lr(pr, !0),
          Ir = (t, e, r) =>
            r > 32
              ? ((t, e, r) => (e << (r - 32)) | (t >>> (64 - r)))(t, e, r)
              : ((t, e, r) => (t << r) | (e >>> (32 - r)))(t, e, r),
          Ar = (t, e, r) =>
            r > 32
              ? ((t, e, r) => (t << (r - 32)) | (e >>> (64 - r)))(t, e, r)
              : ((t, e, r) => (e << r) | (t >>> (32 - r)))(t, e, r);
        class Er extends ye {
          constructor(t, e, r, n = !1, i = 24) {
            if (
              (super(),
              (this.blockLen = t),
              (this.suffix = e),
              (this.outputLen = r),
              (this.enableXOF = n),
              (this.rounds = i),
              (this.pos = 0),
              (this.posOut = 0),
              (this.finished = !1),
              (this.destroyed = !1),
              ce(r),
              0 >= this.blockLen || this.blockLen >= 200)
            )
              throw new Error("Sha3 supports only keccak-f1600 function");
            var o;
            (this.state = new Uint8Array(200)),
              (this.state32 =
                ((o = this.state),
                new Uint32Array(
                  o.buffer,
                  o.byteOffset,
                  Math.floor(o.byteLength / 4)
                )));
          }
          keccak() {
            pe || ge(this.state32),
              (function (t, e = 24) {
                const r = new Uint32Array(10);
                for (let n = 24 - e; n < 24; n++) {
                  for (let e = 0; e < 10; e++)
                    r[e] = t[e] ^ t[e + 10] ^ t[e + 20] ^ t[e + 30] ^ t[e + 40];
                  for (let e = 0; e < 10; e += 2) {
                    const n = (e + 8) % 10,
                      i = (e + 2) % 10,
                      o = r[i],
                      s = r[i + 1],
                      a = Ir(o, s, 1) ^ r[n],
                      c = Ar(o, s, 1) ^ r[n + 1];
                    for (let r = 0; r < 50; r += 10)
                      (t[e + r] ^= a), (t[e + r + 1] ^= c);
                  }
                  let e = t[2],
                    i = t[3];
                  for (let r = 0; r < 24; r++) {
                    const n = fr[r],
                      o = Ir(e, i, n),
                      s = Ar(e, i, n),
                      a = dr[r];
                    (e = t[a]), (i = t[a + 1]), (t[a] = o), (t[a + 1] = s);
                  }
                  for (let e = 0; e < 50; e += 10) {
                    for (let n = 0; n < 10; n++) r[n] = t[e + n];
                    for (let n = 0; n < 10; n++)
                      t[e + n] ^= ~r[(n + 2) % 10] & r[(n + 4) % 10];
                  }
                  (t[0] ^= vr[n]), (t[1] ^= Sr[n]);
                }
                r.fill(0);
              })(this.state32, this.rounds),
              pe || ge(this.state32),
              (this.posOut = 0),
              (this.pos = 0);
          }
          update(t) {
            he(this);
            const { blockLen: e, state: r } = this,
              n = (t = me(t)).length;
            for (let i = 0; i < n; ) {
              const o = Math.min(e - this.pos, n - i);
              for (let e = 0; e < o; e++) r[this.pos++] ^= t[i++];
              this.pos === e && this.keccak();
            }
            return this;
          }
          finish() {
            if (this.finished) return;
            this.finished = !0;
            const { state: t, suffix: e, pos: r, blockLen: n } = this;
            (t[r] ^= e),
              128 & e && r === n - 1 && this.keccak(),
              (t[n - 1] ^= 128),
              this.keccak();
          }
          writeInto(t) {
            he(this, !1), ue(t), this.finish();
            const e = this.state,
              { blockLen: r } = this;
            for (let n = 0, i = t.length; n < i; ) {
              this.posOut >= r && this.keccak();
              const o = Math.min(r - this.posOut, i - n);
              t.set(e.subarray(this.posOut, this.posOut + o), n),
                (this.posOut += o),
                (n += o);
            }
            return t;
          }
          xofInto(t) {
            if (!this.enableXOF)
              throw new Error("XOF is not possible for this instance");
            return this.writeInto(t);
          }
          xof(t) {
            return ce(t), this.xofInto(new Uint8Array(t));
          }
          digestInto(t) {
            if ((le(t, this), this.finished))
              throw new Error("digest() was already called");
            return this.writeInto(t), this.destroy(), t;
          }
          digest() {
            return this.digestInto(new Uint8Array(this.outputLen));
          }
          destroy() {
            (this.destroyed = !0), this.state.fill(0);
          }
          _cloneInto(t) {
            const {
              blockLen: e,
              suffix: r,
              outputLen: n,
              rounds: i,
              enableXOF: o,
            } = this;
            return (
              t || (t = new Er(e, r, n, o, i)),
              t.state32.set(this.state32),
              (t.pos = this.pos),
              (t.posOut = this.posOut),
              (t.finished = this.finished),
              (t.rounds = i),
              (t.suffix = r),
              (t.outputLen = n),
              (t.enableXOF = o),
              (t.destroyed = this.destroyed),
              t
            );
          }
        }
        const _r = ((t, e, r) => be(() => new Er(e, t, r)))(1, 136, 32),
          Br = new Uint32Array([
            1116352408, 1899447441, 3049323471, 3921009573, 961987163,
            1508970993, 2453635748, 2870763221, 3624381080, 310598401,
            607225278, 1426881987, 1925078388, 2162078206, 2614888103,
            3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
            1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
            2952996808, 3210313671, 3336571891, 3584528711, 113926993,
            338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
            1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
            3259730800, 3345764771, 3516065817, 3600352804, 4094571909,
            275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
            1322822218, 1537002063, 1747873779, 1955562222, 2024104815,
            2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
          ]),
          xr = new Uint32Array([
            1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
            2600822924, 528734635, 1541459225,
          ]),
          Mr = new Uint32Array(64);
        class Pr extends g {
          constructor() {
            super(64, 32, 8, !1),
              (this.A = 0 | xr[0]),
              (this.B = 0 | xr[1]),
              (this.C = 0 | xr[2]),
              (this.D = 0 | xr[3]),
              (this.E = 0 | xr[4]),
              (this.F = 0 | xr[5]),
              (this.G = 0 | xr[6]),
              (this.H = 0 | xr[7]);
          }
          get() {
            const { A: t, B: e, C: r, D: n, E: i, F: o, G: s, H: a } = this;
            return [t, e, r, n, i, o, s, a];
          }
          set(t, e, r, n, i, o, s, a) {
            (this.A = 0 | t),
              (this.B = 0 | e),
              (this.C = 0 | r),
              (this.D = 0 | n),
              (this.E = 0 | i),
              (this.F = 0 | o),
              (this.G = 0 | s),
              (this.H = 0 | a);
          }
          process(t, e) {
            for (let r = 0; r < 16; r++, e += 4) Mr[r] = t.getUint32(e, !1);
            for (let t = 16; t < 64; t++) {
              const e = Mr[t - 15],
                r = Mr[t - 2],
                n = u(e, 7) ^ u(e, 18) ^ (e >>> 3),
                i = u(r, 17) ^ u(r, 19) ^ (r >>> 10);
              Mr[t] = (i + Mr[t - 7] + n + Mr[t - 16]) | 0;
            }
            let { A: r, B: n, C: i, D: o, E: s, F: a, G: c, H: h } = this;
            for (let t = 0; t < 64; t++) {
              const e =
                  (h +
                    (u(s, 6) ^ u(s, 11) ^ u(s, 25)) +
                    (((l = s) & a) ^ (~l & c)) +
                    Br[t] +
                    Mr[t]) |
                  0,
                d = ((u(r, 2) ^ u(r, 13) ^ u(r, 22)) + p(r, n, i)) | 0;
              (h = c),
                (c = a),
                (a = s),
                (s = (o + e) | 0),
                (o = i),
                (i = n),
                (n = r),
                (r = (e + d) | 0);
            }
            var l;
            (r = (r + this.A) | 0),
              (n = (n + this.B) | 0),
              (i = (i + this.C) | 0),
              (o = (o + this.D) | 0),
              (s = (s + this.E) | 0),
              (a = (a + this.F) | 0),
              (c = (c + this.G) | 0),
              (h = (h + this.H) | 0),
              this.set(r, n, i, o, s, a, c, h);
          }
          roundClean() {
            Mr.fill(0);
          }
          destroy() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
          }
        }
        const Rr = d(() => new Pr());
        class Tr extends l {
          constructor(t, e) {
            super(),
              (this.finished = !1),
              (this.destroyed = !1),
              (function (t) {
                if ("function" != typeof t || "function" != typeof t.create)
                  throw new Error(
                    "Hash should be wrapped by utils.wrapConstructor"
                  );
                i(t.outputLen), i(t.blockLen);
              })(t);
            const r = h(e);
            if (
              ((this.iHash = t.create()),
              "function" != typeof this.iHash.update)
            )
              throw new Error(
                "Expected instance of class which extends utils.Hash"
              );
            (this.blockLen = this.iHash.blockLen),
              (this.outputLen = this.iHash.outputLen);
            const n = this.blockLen,
              o = new Uint8Array(n);
            o.set(r.length > n ? t.create().update(r).digest() : r);
            for (let t = 0; t < o.length; t++) o[t] ^= 54;
            this.iHash.update(o), (this.oHash = t.create());
            for (let t = 0; t < o.length; t++) o[t] ^= 106;
            this.oHash.update(o), o.fill(0);
          }
          update(t) {
            return s(this), this.iHash.update(t), this;
          }
          digestInto(t) {
            s(this),
              o(t, this.outputLen),
              (this.finished = !0),
              this.iHash.digestInto(t),
              this.oHash.update(t),
              this.oHash.digestInto(t),
              this.destroy();
          }
          digest() {
            const t = new Uint8Array(this.oHash.outputLen);
            return this.digestInto(t), t;
          }
          _cloneInto(t) {
            t || (t = Object.create(Object.getPrototypeOf(this), {}));
            const {
              oHash: e,
              iHash: r,
              finished: n,
              destroyed: i,
              blockLen: o,
              outputLen: s,
            } = this;
            return (
              (t.finished = n),
              (t.destroyed = i),
              (t.blockLen = o),
              (t.outputLen = s),
              (t.oHash = e._cloneInto(t.oHash)),
              (t.iHash = r._cloneInto(t.iHash)),
              t
            );
          }
          destroy() {
            (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
          }
        }
        const Or = (t, e, r) => new Tr(t, e).update(r).digest();
        function Lr(t) {
          void 0 !== t.lowS && F("lowS", t.lowS),
            void 0 !== t.prehash && F("prehash", t.prehash);
        }
        Or.create = (t, e) => new Tr(t, e);
        const { Ph: Cr, aT: zr } = t,
          Ur = {
            Err: class extends Error {
              constructor(t = "") {
                super(t);
              }
            },
            _tlv: {
              encode: (t, e) => {
                const { Err: r } = Ur;
                if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
                if (1 & e.length) throw new r("tlv.encode: unpadded data");
                const n = e.length / 2,
                  i = V(n);
                if ((i.length / 2) & 128)
                  throw new r("tlv.encode: long form length too big");
                const o = n > 127 ? V((i.length / 2) | 128) : "";
                return V(t) + o + i + e;
              },
              decode(t, e) {
                const { Err: r } = Ur;
                let n = 0;
                if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
                if (e.length < 2 || e[n++] !== t)
                  throw new r("tlv.decode: wrong tlv");
                const i = e[n++];
                let o = 0;
                if (128 & i) {
                  const t = 127 & i;
                  if (!t)
                    throw new r(
                      "tlv.decode(long): indefinite length not supported"
                    );
                  if (t > 4)
                    throw new r("tlv.decode(long): byte length is too big");
                  const s = e.subarray(n, n + t);
                  if (s.length !== t)
                    throw new r("tlv.decode: length bytes not complete");
                  if (0 === s[0])
                    throw new r("tlv.decode(long): zero leftmost byte");
                  for (const t of s) o = (o << 8) | t;
                  if (((n += t), o < 128))
                    throw new r("tlv.decode(long): not minimal encoding");
                } else o = i;
                const s = e.subarray(n, n + o);
                if (s.length !== o)
                  throw new r("tlv.decode: wrong value length");
                return { v: s, l: e.subarray(n + o) };
              },
            },
            _int: {
              encode(t) {
                const { Err: e } = Ur;
                if (t < Nr)
                  throw new e("integer: negative integers are not allowed");
                let r = V(t);
                if (
                  (8 & Number.parseInt(r[0], 16) && (r = "00" + r),
                  1 & r.length)
                )
                  throw new e("unexpected DER parsing assertion: unpadded hex");
                return r;
              },
              decode(t) {
                const { Err: e } = Ur;
                if (128 & t[0])
                  throw new e("invalid signature integer: negative");
                if (0 === t[0] && !(128 & t[1]))
                  throw new e(
                    "invalid signature integer: unnecessary leading zero"
                  );
                return Cr(t);
              },
            },
            toSig(t) {
              const { Err: e, _int: r, _tlv: n } = Ur,
                i = "string" == typeof t ? zr(t) : t;
              H(i);
              const { v: o, l: s } = n.decode(48, i);
              if (s.length)
                throw new e("invalid signature: left bytes after parsing");
              const { v: a, l: c } = n.decode(2, o),
                { v: u, l: h } = n.decode(2, c);
              if (h.length)
                throw new e("invalid signature: left bytes after parsing");
              return { r: r.decode(a), s: r.decode(u) };
            },
            hexFromSig(t) {
              const { _tlv: e, _int: r } = Ur,
                n = e.encode(2, r.encode(t.r)) + e.encode(2, r.encode(t.s));
              return e.encode(48, n);
            },
          },
          Nr = BigInt(0),
          Wr = BigInt(1),
          Kr = (BigInt(2), BigInt(3));
        function qr(t) {
          const e = (function (t) {
              const e = qt(t);
              return (
                ft(
                  e,
                  { hash: "hash", hmac: "function", randomBytes: "function" },
                  {
                    bits2int: "function",
                    bits2int_modN: "function",
                    lowS: "boolean",
                  }
                ),
                Object.freeze({ lowS: !0, ...e })
              );
            })(t),
            { Fp: r, n } = e,
            i = r.BYTES + 1,
            o = 2 * r.BYTES + 1;
          function s(t) {
            return St(t, n);
          }
          function a(t) {
            return Et(t, n);
          }
          const {
              ProjectivePoint: c,
              normPrivateKeyToScalar: u,
              weierstrassEquation: h,
              isWithinCurveOrder: l,
            } = (function (t) {
              const e = (function (t) {
                  const e = qt(t);
                  ft(
                    e,
                    { a: "field", b: "field" },
                    {
                      allowedPrivateKeyLengths: "array",
                      wrapPrivateKey: "boolean",
                      isTorsionFree: "function",
                      clearCofactor: "function",
                      allowInfinityPoint: "boolean",
                      fromBytes: "function",
                      toBytes: "function",
                    }
                  );
                  const { endo: r, Fp: n, a: i } = e;
                  if (r) {
                    if (!n.eql(i, n.ZERO))
                      throw new Error(
                        "invalid endomorphism, can only be defined for Koblitz curves that have a=0"
                      );
                    if (
                      "object" != typeof r ||
                      "bigint" != typeof r.beta ||
                      "function" != typeof r.splitScalar
                    )
                      throw new Error(
                        "invalid endomorphism, expected beta: bigint and splitScalar: function"
                      );
                  }
                  return Object.freeze({ ...e });
                })(t),
                { Fp: r } = e,
                n = xt(e.n, e.nBitLength),
                i =
                  e.toBytes ||
                  ((t, e, n) => {
                    const i = e.toAffine();
                    return nt(
                      Uint8Array.from([4]),
                      r.toBytes(i.x),
                      r.toBytes(i.y)
                    );
                  }),
                o =
                  e.fromBytes ||
                  ((t) => {
                    const e = t.subarray(1);
                    return {
                      x: r.fromBytes(e.subarray(0, r.BYTES)),
                      y: r.fromBytes(e.subarray(r.BYTES, 2 * r.BYTES)),
                    };
                  });
              function s(t) {
                const { a: n, b: i } = e,
                  o = r.sqr(t),
                  s = r.mul(o, t);
                return r.add(r.add(s, r.mul(t, n)), i);
              }
              if (!r.eql(r.sqr(e.Gy), s(e.Gx)))
                throw new Error("bad generator point: equation left != right");
              function a(t) {
                const {
                  allowedPrivateKeyLengths: r,
                  nByteLength: n,
                  wrapPrivateKey: i,
                  n: o,
                } = e;
                if (r && "bigint" != typeof t) {
                  if (
                    (D(t) && (t = $(t)),
                    "string" != typeof t || !r.includes(t.length))
                  )
                    throw new Error("invalid private key");
                  t = t.padStart(2 * n, "0");
                }
                let s;
                try {
                  s = "bigint" == typeof t ? t : X(rt("private key", t, n));
                } catch (e) {
                  throw new Error(
                    "invalid private key, expected hex or " +
                      n +
                      " bytes, got " +
                      typeof t
                  );
                }
                return i && (s = St(s, o)), st("private key", s, Wr, o), s;
              }
              function c(t) {
                if (!(t instanceof l))
                  throw new Error("ProjectivePoint expected");
              }
              const u = pt((t, e) => {
                  const { px: n, py: i, pz: o } = t;
                  if (r.eql(o, r.ONE)) return { x: n, y: i };
                  const s = t.is0();
                  null == e && (e = s ? r.ONE : r.inv(o));
                  const a = r.mul(n, e),
                    c = r.mul(i, e),
                    u = r.mul(o, e);
                  if (s) return { x: r.ZERO, y: r.ZERO };
                  if (!r.eql(u, r.ONE)) throw new Error("invZ was invalid");
                  return { x: a, y: c };
                }),
                h = pt((t) => {
                  if (t.is0()) {
                    if (e.allowInfinityPoint && !r.is0(t.py)) return;
                    throw new Error("bad point: ZERO");
                  }
                  const { x: n, y: i } = t.toAffine();
                  if (!r.isValid(n) || !r.isValid(i))
                    throw new Error("bad point: x or y not FE");
                  const o = r.sqr(i),
                    a = s(n);
                  if (!r.eql(o, a))
                    throw new Error("bad point: equation left != right");
                  if (!t.isTorsionFree())
                    throw new Error("bad point: not in prime-order subgroup");
                  return !0;
                });
              class l {
                constructor(t, e, n) {
                  if (
                    ((this.px = t),
                    (this.py = e),
                    (this.pz = n),
                    null == t || !r.isValid(t))
                  )
                    throw new Error("x required");
                  if (null == e || !r.isValid(e)) throw new Error("y required");
                  if (null == n || !r.isValid(n)) throw new Error("z required");
                  Object.freeze(this);
                }
                static fromAffine(t) {
                  const { x: e, y: n } = t || {};
                  if (!t || !r.isValid(e) || !r.isValid(n))
                    throw new Error("invalid affine point");
                  if (t instanceof l)
                    throw new Error("projective point not allowed");
                  const i = (t) => r.eql(t, r.ZERO);
                  return i(e) && i(n) ? l.ZERO : new l(e, n, r.ONE);
                }
                get x() {
                  return this.toAffine().x;
                }
                get y() {
                  return this.toAffine().y;
                }
                static normalizeZ(t) {
                  const e = r.invertBatch(t.map((t) => t.pz));
                  return t.map((t, r) => t.toAffine(e[r])).map(l.fromAffine);
                }
                static fromHex(t) {
                  const e = l.fromAffine(o(rt("pointHex", t)));
                  return e.assertValidity(), e;
                }
                static fromPrivateKey(t) {
                  return l.BASE.multiply(a(t));
                }
                static msm(t, e) {
                  return Kt(l, n, t, e);
                }
                _setWindowSize(t) {
                  f.setWindowSize(this, t);
                }
                assertValidity() {
                  h(this);
                }
                hasEvenY() {
                  const { y: t } = this.toAffine();
                  if (r.isOdd) return !r.isOdd(t);
                  throw new Error("Field doesn't support isOdd");
                }
                equals(t) {
                  c(t);
                  const { px: e, py: n, pz: i } = this,
                    { px: o, py: s, pz: a } = t,
                    u = r.eql(r.mul(e, a), r.mul(o, i)),
                    h = r.eql(r.mul(n, a), r.mul(s, i));
                  return u && h;
                }
                negate() {
                  return new l(this.px, r.neg(this.py), this.pz);
                }
                double() {
                  const { a: t, b: n } = e,
                    i = r.mul(n, Kr),
                    { px: o, py: s, pz: a } = this;
                  let c = r.ZERO,
                    u = r.ZERO,
                    h = r.ZERO,
                    d = r.mul(o, o),
                    f = r.mul(s, s),
                    p = r.mul(a, a),
                    g = r.mul(o, s);
                  return (
                    (g = r.add(g, g)),
                    (h = r.mul(o, a)),
                    (h = r.add(h, h)),
                    (c = r.mul(t, h)),
                    (u = r.mul(i, p)),
                    (u = r.add(c, u)),
                    (c = r.sub(f, u)),
                    (u = r.add(f, u)),
                    (u = r.mul(c, u)),
                    (c = r.mul(g, c)),
                    (h = r.mul(i, h)),
                    (p = r.mul(t, p)),
                    (g = r.sub(d, p)),
                    (g = r.mul(t, g)),
                    (g = r.add(g, h)),
                    (h = r.add(d, d)),
                    (d = r.add(h, d)),
                    (d = r.add(d, p)),
                    (d = r.mul(d, g)),
                    (u = r.add(u, d)),
                    (p = r.mul(s, a)),
                    (p = r.add(p, p)),
                    (d = r.mul(p, g)),
                    (c = r.sub(c, d)),
                    (h = r.mul(p, f)),
                    (h = r.add(h, h)),
                    (h = r.add(h, h)),
                    new l(c, u, h)
                  );
                }
                add(t) {
                  c(t);
                  const { px: n, py: i, pz: o } = this,
                    { px: s, py: a, pz: u } = t;
                  let h = r.ZERO,
                    d = r.ZERO,
                    f = r.ZERO;
                  const p = e.a,
                    g = r.mul(e.b, Kr);
                  let m = r.mul(n, s),
                    y = r.mul(i, a),
                    b = r.mul(o, u),
                    w = r.add(n, i),
                    k = r.add(s, a);
                  (w = r.mul(w, k)),
                    (k = r.add(m, y)),
                    (w = r.sub(w, k)),
                    (k = r.add(n, o));
                  let v = r.add(s, u);
                  return (
                    (k = r.mul(k, v)),
                    (v = r.add(m, b)),
                    (k = r.sub(k, v)),
                    (v = r.add(i, o)),
                    (h = r.add(a, u)),
                    (v = r.mul(v, h)),
                    (h = r.add(y, b)),
                    (v = r.sub(v, h)),
                    (f = r.mul(p, k)),
                    (h = r.mul(g, b)),
                    (f = r.add(h, f)),
                    (h = r.sub(y, f)),
                    (f = r.add(y, f)),
                    (d = r.mul(h, f)),
                    (y = r.add(m, m)),
                    (y = r.add(y, m)),
                    (b = r.mul(p, b)),
                    (k = r.mul(g, k)),
                    (y = r.add(y, b)),
                    (b = r.sub(m, b)),
                    (b = r.mul(p, b)),
                    (k = r.add(k, b)),
                    (m = r.mul(y, k)),
                    (d = r.add(d, m)),
                    (m = r.mul(v, k)),
                    (h = r.mul(w, h)),
                    (h = r.sub(h, m)),
                    (m = r.mul(w, y)),
                    (f = r.mul(v, f)),
                    (f = r.add(f, m)),
                    new l(h, d, f)
                  );
                }
                subtract(t) {
                  return this.add(t.negate());
                }
                is0() {
                  return this.equals(l.ZERO);
                }
                wNAF(t) {
                  return f.wNAFCached(this, t, l.normalizeZ);
                }
                multiplyUnsafe(t) {
                  const { endo: n, n: i } = e;
                  st("scalar", t, Nr, i);
                  const o = l.ZERO;
                  if (t === Nr) return o;
                  if (this.is0() || t === Wr) return this;
                  if (!n || f.hasPrecomputes(this))
                    return f.wNAFCachedUnsafe(this, t, l.normalizeZ);
                  let { k1neg: s, k1: a, k2neg: c, k2: u } = n.splitScalar(t),
                    h = o,
                    d = o,
                    p = this;
                  for (; a > Nr || u > Nr; )
                    a & Wr && (h = h.add(p)),
                      u & Wr && (d = d.add(p)),
                      (p = p.double()),
                      (a >>= Wr),
                      (u >>= Wr);
                  return (
                    s && (h = h.negate()),
                    c && (d = d.negate()),
                    (d = new l(r.mul(d.px, n.beta), d.py, d.pz)),
                    h.add(d)
                  );
                }
                multiply(t) {
                  const { endo: n, n: i } = e;
                  let o, s;
                  if ((st("scalar", t, Wr, i), n)) {
                    const {
                      k1neg: e,
                      k1: i,
                      k2neg: a,
                      k2: c,
                    } = n.splitScalar(t);
                    let { p: u, f: h } = this.wNAF(i),
                      { p: d, f: p } = this.wNAF(c);
                    (u = f.constTimeNegate(e, u)),
                      (d = f.constTimeNegate(a, d)),
                      (d = new l(r.mul(d.px, n.beta), d.py, d.pz)),
                      (o = u.add(d)),
                      (s = h.add(p));
                  } else {
                    const { p: e, f: r } = this.wNAF(t);
                    (o = e), (s = r);
                  }
                  return l.normalizeZ([o, s])[0];
                }
                multiplyAndAddUnsafe(t, e, r) {
                  const n = l.BASE,
                    i = (t, e) =>
                      e !== Nr && e !== Wr && t.equals(n)
                        ? t.multiply(e)
                        : t.multiplyUnsafe(e),
                    o = i(this, e).add(i(t, r));
                  return o.is0() ? void 0 : o;
                }
                toAffine(t) {
                  return u(this, t);
                }
                isTorsionFree() {
                  const { h: t, isTorsionFree: r } = e;
                  if (t === Wr) return !0;
                  if (r) return r(l, this);
                  throw new Error(
                    "isTorsionFree() has not been declared for the elliptic curve"
                  );
                }
                clearCofactor() {
                  const { h: t, clearCofactor: r } = e;
                  return t === Wr
                    ? this
                    : r
                    ? r(l, this)
                    : this.multiplyUnsafe(e.h);
                }
                toRawBytes(t = !0) {
                  return (
                    F("isCompressed", t), this.assertValidity(), i(l, this, t)
                  );
                }
                toHex(t = !0) {
                  return F("isCompressed", t), $(this.toRawBytes(t));
                }
              }
              (l.BASE = new l(e.Gx, e.Gy, r.ONE)),
                (l.ZERO = new l(r.ZERO, r.ONE, r.ZERO));
              const d = e.nBitLength,
                f = Wt(l, e.endo ? Math.ceil(d / 2) : d);
              return {
                CURVE: e,
                ProjectivePoint: l,
                normPrivateKeyToScalar: a,
                weierstrassEquation: s,
                isWithinCurveOrder: function (t) {
                  return ot(t, Wr, e.n);
                },
              };
            })({
              ...e,
              toBytes(t, e, n) {
                const i = e.toAffine(),
                  o = r.toBytes(i.x),
                  s = nt;
                return (
                  F("isCompressed", n),
                  n
                    ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o)
                    : s(Uint8Array.from([4]), o, r.toBytes(i.y))
                );
              },
              fromBytes(t) {
                const e = t.length,
                  n = t[0],
                  s = t.subarray(1);
                if (e !== i || (2 !== n && 3 !== n)) {
                  if (e === o && 4 === n)
                    return {
                      x: r.fromBytes(s.subarray(0, r.BYTES)),
                      y: r.fromBytes(s.subarray(r.BYTES, 2 * r.BYTES)),
                    };
                  throw new Error(
                    "invalid Point, expected length of " +
                      i +
                      ", or uncompressed " +
                      o +
                      ", got " +
                      e
                  );
                }
                {
                  const t = X(s);
                  if (!ot(t, Wr, r.ORDER))
                    throw new Error("Point is not on curve");
                  const e = h(t);
                  let i;
                  try {
                    i = r.sqrt(e);
                  } catch (t) {
                    const e = t instanceof Error ? ": " + t.message : "";
                    throw new Error("Point is not on curve" + e);
                  }
                  return (
                    !(1 & ~n) != ((i & Wr) === Wr) && (i = r.neg(i)),
                    { x: t, y: i }
                  );
                }
              },
            }),
            d = (t) => $(tt(t, e.nByteLength));
          function f(t) {
            return t > n >> Wr;
          }
          const p = (t, e, r) => X(t.slice(e, r));
          class g {
            constructor(t, e, r) {
              (this.r = t),
                (this.s = e),
                (this.recovery = r),
                this.assertValidity();
            }
            static fromCompact(t) {
              const r = e.nByteLength;
              return (
                (t = rt("compactSignature", t, 2 * r)),
                new g(p(t, 0, r), p(t, r, 2 * r))
              );
            }
            static fromDER(t) {
              const { r: e, s: r } = Ur.toSig(rt("DER", t));
              return new g(e, r);
            }
            assertValidity() {
              st("r", this.r, Wr, n), st("s", this.s, Wr, n);
            }
            addRecoveryBit(t) {
              return new g(this.r, this.s, t);
            }
            recoverPublicKey(t) {
              const { r: n, s: i, recovery: o } = this,
                u = w(rt("msgHash", t));
              if (null == o || ![0, 1, 2, 3].includes(o))
                throw new Error("recovery id invalid");
              const h = 2 === o || 3 === o ? n + e.n : n;
              if (h >= r.ORDER) throw new Error("recovery id 2 or 3 invalid");
              const l = 1 & o ? "03" : "02",
                f = c.fromHex(l + d(h)),
                p = a(h),
                g = s(-u * p),
                m = s(i * p),
                y = c.BASE.multiplyAndAddUnsafe(f, g, m);
              if (!y) throw new Error("point at infinify");
              return y.assertValidity(), y;
            }
            hasHighS() {
              return f(this.s);
            }
            normalizeS() {
              return this.hasHighS()
                ? new g(this.r, s(-this.s), this.recovery)
                : this;
            }
            toDERRawBytes() {
              return J(this.toDERHex());
            }
            toDERHex() {
              return Ur.hexFromSig({ r: this.r, s: this.s });
            }
            toCompactRawBytes() {
              return J(this.toCompactHex());
            }
            toCompactHex() {
              return d(this.r) + d(this.s);
            }
          }
          const m = {
            isValidPrivateKey(t) {
              try {
                return u(t), !0;
              } catch (t) {
                return !1;
              }
            },
            normPrivateKeyToScalar: u,
            randomPrivateKey: () => {
              const t = Pt(e.n);
              return (function (t, e, r = !1) {
                const n = t.length,
                  i = Mt(e),
                  o = Pt(e);
                if (n < 16 || n < o || n > 1024)
                  throw new Error(
                    "expected " + o + "-1024 bytes of input, got " + n
                  );
                const s = St(r ? X(t) : Q(t), e - mt) + mt;
                return r ? et(s, i) : tt(s, i);
              })(e.randomBytes(t), e.n);
            },
            precompute: (t = 8, e = c.BASE) => (
              e._setWindowSize(t), e.multiply(BigInt(3)), e
            ),
          };
          function y(t) {
            const e = D(t),
              r = "string" == typeof t,
              n = (e || r) && t.length;
            return e
              ? n === i || n === o
              : r
              ? n === 2 * i || n === 2 * o
              : t instanceof c;
          }
          const b =
              e.bits2int ||
              function (t) {
                if (t.length > 8192) throw new Error("input is too large");
                const r = X(t),
                  n = 8 * t.length - e.nBitLength;
                return n > 0 ? r >> BigInt(n) : r;
              },
            w =
              e.bits2int_modN ||
              function (t) {
                return s(b(t));
              },
            k = ct(e.nBitLength);
          function v(t) {
            return (
              st("num < 2^" + e.nBitLength, t, Nr, k), tt(t, e.nByteLength)
            );
          }
          const S = { lowS: e.lowS, prehash: !1 },
            I = { lowS: e.lowS, prehash: !1 };
          return (
            c.BASE._setWindowSize(8),
            {
              CURVE: e,
              getPublicKey: function (t, e = !0) {
                return c.fromPrivateKey(t).toRawBytes(e);
              },
              getSharedSecret: function (t, e, r = !0) {
                if (y(t)) throw new Error("first arg must be private key");
                if (!y(e)) throw new Error("second arg must be public key");
                return c.fromHex(e).multiply(u(t)).toRawBytes(r);
              },
              sign: function (t, n, i = S) {
                const { seed: o, k2sig: h } = (function (t, n, i = S) {
                    if (["recovered", "canonical"].some((t) => t in i))
                      throw new Error("sign() legacy options not supported");
                    const { hash: o, randomBytes: h } = e;
                    let { lowS: d, prehash: p, extraEntropy: m } = i;
                    null == d && (d = !0),
                      (t = rt("msgHash", t)),
                      Lr(i),
                      p && (t = rt("prehashed msgHash", o(t)));
                    const y = w(t),
                      k = u(n),
                      I = [v(k), v(y)];
                    if (null != m && !1 !== m) {
                      const t = !0 === m ? h(r.BYTES) : m;
                      I.push(rt("extraEntropy", t));
                    }
                    const A = nt(...I),
                      E = y;
                    return {
                      seed: A,
                      k2sig: function (t) {
                        const e = b(t);
                        if (!l(e)) return;
                        const r = a(e),
                          n = c.BASE.multiply(e).toAffine(),
                          i = s(n.x);
                        if (i === Nr) return;
                        const o = s(r * s(E + i * k));
                        if (o === Nr) return;
                        let u = (n.x === i ? 0 : 2) | Number(n.y & Wr),
                          h = o;
                        return (
                          d &&
                            f(o) &&
                            ((h = (function (t) {
                              return f(t) ? s(-t) : t;
                            })(o)),
                            (u ^= 1)),
                          new g(i, h, u)
                        );
                      },
                    };
                  })(t, n, i),
                  d = e;
                return lt(d.hash.outputLen, d.nByteLength, d.hmac)(o, h);
              },
              verify: function (t, r, n, i = I) {
                const o = t;
                (r = rt("msgHash", r)), (n = rt("publicKey", n));
                const { lowS: u, prehash: h, format: l } = i;
                if ((Lr(i), "strict" in i))
                  throw new Error("options.strict was renamed to lowS");
                if (void 0 !== l && "compact" !== l && "der" !== l)
                  throw new Error("format must be compact or der");
                const d = "string" == typeof o || D(o),
                  f =
                    !d &&
                    !l &&
                    "object" == typeof o &&
                    null !== o &&
                    "bigint" == typeof o.r &&
                    "bigint" == typeof o.s;
                if (!d && !f)
                  throw new Error(
                    "invalid signature, expected Uint8Array, hex string or Signature instance"
                  );
                let p, m;
                try {
                  if ((f && (p = new g(o.r, o.s)), d)) {
                    try {
                      "compact" !== l && (p = g.fromDER(o));
                    } catch (t) {
                      if (!(t instanceof Ur.Err)) throw t;
                    }
                    p || "der" === l || (p = g.fromCompact(o));
                  }
                  m = c.fromHex(n);
                } catch (t) {
                  return !1;
                }
                if (!p) return !1;
                if (u && p.hasHighS()) return !1;
                h && (r = e.hash(r));
                const { r: y, s: b } = p,
                  k = w(r),
                  v = a(b),
                  S = s(k * v),
                  A = s(y * v),
                  E = c.BASE.multiplyAndAddUnsafe(m, S, A)?.toAffine();
                return !!E && s(E.x) === y;
              },
              ProjectivePoint: c,
              Signature: g,
              utils: m,
            }
          );
        }
        function Dr(t) {
          return {
            hash: t,
            hmac: (e, ...r) =>
              Or(
                t,
                e,
                (function (...t) {
                  let e = 0;
                  for (let r = 0; r < t.length; r++) {
                    const n = t[r];
                    o(n), (e += n.length);
                  }
                  const r = new Uint8Array(e);
                  for (let e = 0, n = 0; e < t.length; e++) {
                    const i = t[e];
                    r.set(i, n), (n += i.length);
                  }
                  return r;
                })(...r)
              ),
            randomBytes: f,
          };
        }
        BigInt(4);
        const Hr = BigInt(
            "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
          ),
          Fr = BigInt(
            "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
          ),
          jr = BigInt(1),
          $r = BigInt(2),
          Vr = (t, e) => (t + e / $r) / e;
        const Gr = xt(Hr, void 0, void 0, {
            sqrt: function (t) {
              const e = Hr,
                r = BigInt(3),
                n = BigInt(6),
                i = BigInt(11),
                o = BigInt(22),
                s = BigInt(23),
                a = BigInt(44),
                c = BigInt(88),
                u = (t * t * t) % e,
                h = (u * u * t) % e,
                l = (At(h, r, e) * h) % e,
                d = (At(l, r, e) * h) % e,
                f = (At(d, $r, e) * u) % e,
                p = (At(f, i, e) * f) % e,
                g = (At(p, o, e) * p) % e,
                m = (At(g, a, e) * g) % e,
                y = (At(m, c, e) * m) % e,
                b = (At(y, a, e) * g) % e,
                w = (At(b, r, e) * h) % e,
                k = (At(w, s, e) * p) % e,
                v = (At(k, n, e) * u) % e,
                S = At(v, $r, e);
              if (!Gr.eql(Gr.sqr(S), t))
                throw new Error("Cannot find square root");
              return S;
            },
          }),
          Yr = (function (t, e) {
            const r = (e) => qr({ ...t, ...Dr(e) });
            return Object.freeze({ ...r(e), create: r });
          })(
            {
              a: BigInt(0),
              b: BigInt(7),
              Fp: Gr,
              n: Fr,
              Gx: BigInt(
                "55066263022277343669578718895168534326250603453777594175500187360389116729240"
              ),
              Gy: BigInt(
                "32670510020758816978083085130507043184471273380659243275938904335757337482424"
              ),
              h: BigInt(1),
              lowS: !0,
              endo: {
                beta: BigInt(
                  "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
                ),
                splitScalar: (t) => {
                  const e = Fr,
                    r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                    n = -jr * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                    i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                    o = r,
                    s = BigInt("0x100000000000000000000000000000000"),
                    a = Vr(o * t, e),
                    c = Vr(-n * t, e);
                  let u = St(t - a * r - c * i, e),
                    h = St(-a * n - c * o, e);
                  const l = u > s,
                    d = h > s;
                  if ((l && (u = e - u), d && (h = e - h), u > s || h > s))
                    throw new Error("splitScalar: Endomorphism failed, k=" + t);
                  return { k1neg: l, k1: u, k2neg: d, k2: h };
                },
              },
            },
            Rr
          );
        BigInt(0), Yr.ProjectivePoint;
        const Zr = ne.utils.randomPrivateKey,
          Jr = () => {
            const t = ne.utils.randomPrivateKey(),
              e = Xr(t),
              r = new Uint8Array(64);
            return r.set(t), r.set(e, 32), { publicKey: e, secretKey: r };
          },
          Xr = ne.getPublicKey;
        function Qr(t) {
          try {
            return ne.ExtendedPoint.fromHex(t), !0;
          } catch {
            return !1;
          }
        }
        const tn = (t, e) => ne.sign(t, e.slice(0, 32)),
          en = ne.verify,
          rn = (t) =>
            e.Buffer.isBuffer(t)
              ? t
              : t instanceof Uint8Array
              ? e.Buffer.from(t.buffer, t.byteOffset, t.byteLength)
              : e.Buffer.from(t);
        class nn {
          constructor(t) {
            Object.assign(this, t);
          }
          encode() {
            return e.Buffer.from((0, _e.serialize)(sn, this));
          }
          static decode(t) {
            return (0, _e.deserialize)(sn, this, t);
          }
          static decodeUnchecked(t) {
            return (0, _e.deserializeUnchecked)(sn, this, t);
          }
        }
        class on extends nn {
          constructor(t) {
            if ((super(t), (this.enum = ""), 1 !== Object.keys(t).length))
              throw new Error("Enum can only take single value");
            Object.keys(t).map((t) => {
              this.enum = t;
            });
          }
        }
        const sn = new Map();
        var an;
        const cn = 32,
          un = 32;
        let hn = 1;
        class ln extends nn {
          constructor(t) {
            if (
              (super({}),
              (this._bn = void 0),
              (function (t) {
                return void 0 !== t._bn;
              })(t))
            )
              this._bn = t._bn;
            else {
              if ("string" == typeof t) {
                const e = ae().decode(t);
                if (e.length != un) throw new Error("Invalid public key input");
                this._bn = new (oe())(e);
              } else this._bn = new (oe())(t);
              if (this._bn.byteLength() > un)
                throw new Error("Invalid public key input");
            }
          }
          static unique() {
            const t = new ln(hn);
            return (hn += 1), new ln(t.toBuffer());
          }
          equals(t) {
            return this._bn.eq(t._bn);
          }
          toBase58() {
            return ae().encode(this.toBytes());
          }
          toJSON() {
            return this.toBase58();
          }
          toBytes() {
            const t = this.toBuffer();
            return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
          }
          toBuffer() {
            const t = this._bn.toArrayLike(e.Buffer);
            if (t.length === un) return t;
            const r = e.Buffer.alloc(32);
            return t.copy(r, 32 - t.length), r;
          }
          get [Symbol.toStringTag]() {
            return `PublicKey(${this.toString()})`;
          }
          toString() {
            return this.toBase58();
          }
          static async createWithSeed(t, r, n) {
            const i = e.Buffer.concat([
                t.toBuffer(),
                e.Buffer.from(r),
                n.toBuffer(),
              ]),
              o = Ee(i);
            return new ln(o);
          }
          static createProgramAddressSync(t, r) {
            let n = e.Buffer.alloc(0);
            t.forEach(function (t) {
              if (t.length > cn)
                throw new TypeError("Max seed length exceeded");
              n = e.Buffer.concat([n, rn(t)]);
            }),
              (n = e.Buffer.concat([
                n,
                r.toBuffer(),
                e.Buffer.from("ProgramDerivedAddress"),
              ]));
            const i = Ee(n);
            if (Qr(i))
              throw new Error("Invalid seeds, address must fall off the curve");
            return new ln(i);
          }
          static async createProgramAddress(t, e) {
            return this.createProgramAddressSync(t, e);
          }
          static findProgramAddressSync(t, r) {
            let n,
              i = 255;
            for (; 0 != i; ) {
              try {
                const o = t.concat(e.Buffer.from([i]));
                n = this.createProgramAddressSync(o, r);
              } catch (t) {
                if (t instanceof TypeError) throw t;
                i--;
                continue;
              }
              return [n, i];
            }
            throw new Error("Unable to find a viable program address nonce");
          }
          static async findProgramAddress(t, e) {
            return this.findProgramAddressSync(t, e);
          }
          static isOnCurve(t) {
            return Qr(new ln(t).toBytes());
          }
        }
        (an = ln),
          (ln.default = new an("11111111111111111111111111111111")),
          sn.set(ln, { kind: "struct", fields: [["_bn", "u256"]] });
        class dn {
          constructor(t) {
            if (((this._publicKey = void 0), (this._secretKey = void 0), t)) {
              const e = rn(t);
              if (64 !== t.length) throw new Error("bad secret key size");
              (this._publicKey = e.slice(32, 64)),
                (this._secretKey = e.slice(0, 32));
            } else
              (this._secretKey = rn(Zr())),
                (this._publicKey = rn(Xr(this._secretKey)));
          }
          get publicKey() {
            return new ln(this._publicKey);
          }
          get secretKey() {
            return e.Buffer.concat([this._secretKey, this._publicKey], 64);
          }
        }
        const fn = new ln("BPFLoader1111111111111111111111111111111111"),
          pn = 1232,
          gn = 127,
          mn = 64;
        class yn extends Error {
          constructor(t) {
            super(`Signature ${t} has expired: block height exceeded.`),
              (this.signature = void 0),
              (this.signature = t);
          }
        }
        Object.defineProperty(yn.prototype, "name", {
          value: "TransactionExpiredBlockheightExceededError",
        });
        class bn extends Error {
          constructor(t, e) {
            super(
              `Transaction was not confirmed in ${e.toFixed(
                2
              )} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`
            ),
              (this.signature = void 0),
              (this.signature = t);
          }
        }
        Object.defineProperty(bn.prototype, "name", {
          value: "TransactionExpiredTimeoutError",
        });
        class wn extends Error {
          constructor(t) {
            super(`Signature ${t} has expired: the nonce is no longer valid.`),
              (this.signature = void 0),
              (this.signature = t);
          }
        }
        Object.defineProperty(wn.prototype, "name", {
          value: "TransactionExpiredNonceInvalidError",
        });
        class kn {
          constructor(t, e) {
            (this.staticAccountKeys = void 0),
              (this.accountKeysFromLookups = void 0),
              (this.staticAccountKeys = t),
              (this.accountKeysFromLookups = e);
          }
          keySegments() {
            const t = [this.staticAccountKeys];
            return (
              this.accountKeysFromLookups &&
                (t.push(this.accountKeysFromLookups.writable),
                t.push(this.accountKeysFromLookups.readonly)),
              t
            );
          }
          get(t) {
            for (const e of this.keySegments()) {
              if (t < e.length) return e[t];
              t -= e.length;
            }
          }
          get length() {
            return this.keySegments().flat().length;
          }
          compileInstructions(t) {
            if (this.length > 256)
              throw new Error(
                "Account index overflow encountered during compilation"
              );
            const e = new Map();
            this.keySegments()
              .flat()
              .forEach((t, r) => {
                e.set(t.toBase58(), r);
              });
            const r = (t) => {
              const r = e.get(t.toBase58());
              if (void 0 === r)
                throw new Error(
                  "Encountered an unknown instruction account key during compilation"
                );
              return r;
            };
            return t.map((t) => ({
              programIdIndex: r(t.programId),
              accountKeyIndexes: t.keys.map((t) => r(t.pubkey)),
              data: t.data,
            }));
          }
        }
        const vn = (t = "publicKey") => Be.av(32, t),
          Sn = (t = "signature") => Be.av(64, t),
          In = (t = "string") => {
            const r = Be.w3(
                [
                  Be.DH("length"),
                  Be.DH("lengthPadding"),
                  Be.av(Be.cY(Be.DH(), -8), "chars"),
                ],
                t
              ),
              n = r.decode.bind(r),
              i = r.encode.bind(r),
              o = r;
            return (
              (o.decode = (t, e) => n(t, e).chars.toString()),
              (o.encode = (t, r, n) => {
                const o = { chars: e.Buffer.from(t, "utf8") };
                return i(o, r, n);
              }),
              (o.alloc = (t) =>
                Be.DH().span + Be.DH().span + e.Buffer.from(t, "utf8").length),
              o
            );
          };
        function An(t, e) {
          const r = (t) => {
            if (t.span >= 0) return t.span;
            if ("function" == typeof t.alloc) return t.alloc(e[t.property]);
            if ("count" in t && "elementLayout" in t) {
              const n = e[t.property];
              if (Array.isArray(n)) return n.length * r(t.elementLayout);
            } else if ("fields" in t) return An({ layout: t }, e[t.property]);
            return 0;
          };
          let n = 0;
          return (
            t.layout.fields.forEach((t) => {
              n += r(t);
            }),
            n
          );
        }
        function En(t) {
          let e = 0,
            r = 0;
          for (;;) {
            let n = t.shift();
            if (((e |= (127 & n) << (7 * r)), (r += 1), !(128 & n))) break;
          }
          return e;
        }
        function _n(t, e) {
          let r = e;
          for (;;) {
            let e = 127 & r;
            if (((r >>= 7), 0 == r)) {
              t.push(e);
              break;
            }
            (e |= 128), t.push(e);
          }
        }
        function Bn(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        class xn {
          constructor(t, e) {
            (this.payer = void 0),
              (this.keyMetaMap = void 0),
              (this.payer = t),
              (this.keyMetaMap = e);
          }
          static compile(t, e) {
            const r = new Map(),
              n = (t) => {
                const e = t.toBase58();
                let n = r.get(e);
                return (
                  void 0 === n &&
                    ((n = { isSigner: !1, isWritable: !1, isInvoked: !1 }),
                    r.set(e, n)),
                  n
                );
              },
              i = n(e);
            (i.isSigner = !0), (i.isWritable = !0);
            for (const e of t) {
              n(e.programId).isInvoked = !0;
              for (const t of e.keys) {
                const e = n(t.pubkey);
                (e.isSigner ||= t.isSigner), (e.isWritable ||= t.isWritable);
              }
            }
            return new xn(e, r);
          }
          getMessageComponents() {
            const t = [...this.keyMetaMap.entries()];
            Bn(t.length <= 256, "Max static account keys length exceeded");
            const e = t.filter(([, t]) => t.isSigner && t.isWritable),
              r = t.filter(([, t]) => t.isSigner && !t.isWritable),
              n = t.filter(([, t]) => !t.isSigner && t.isWritable),
              i = t.filter(([, t]) => !t.isSigner && !t.isWritable),
              o = {
                numRequiredSignatures: e.length + r.length,
                numReadonlySignedAccounts: r.length,
                numReadonlyUnsignedAccounts: i.length,
              };
            {
              Bn(e.length > 0, "Expected at least one writable signer key");
              const [t] = e[0];
              Bn(
                t === this.payer.toBase58(),
                "Expected first writable signer key to be the fee payer"
              );
            }
            return [
              o,
              [
                ...e.map(([t]) => new ln(t)),
                ...r.map(([t]) => new ln(t)),
                ...n.map(([t]) => new ln(t)),
                ...i.map(([t]) => new ln(t)),
              ],
            ];
          }
          extractTableLookup(t) {
            const [e, r] = this.drainKeysFoundInLookupTable(
                t.state.addresses,
                (t) => !t.isSigner && !t.isInvoked && t.isWritable
              ),
              [n, i] = this.drainKeysFoundInLookupTable(
                t.state.addresses,
                (t) => !t.isSigner && !t.isInvoked && !t.isWritable
              );
            if (0 !== e.length || 0 !== n.length)
              return [
                { accountKey: t.key, writableIndexes: e, readonlyIndexes: n },
                { writable: r, readonly: i },
              ];
          }
          drainKeysFoundInLookupTable(t, e) {
            const r = new Array(),
              n = new Array();
            for (const [i, o] of this.keyMetaMap.entries())
              if (e(o)) {
                const e = new ln(i),
                  o = t.findIndex((t) => t.equals(e));
                o >= 0 &&
                  (Bn(o < 256, "Max lookup table index exceeded"),
                  r.push(o),
                  n.push(e),
                  this.keyMetaMap.delete(i));
              }
            return [r, n];
          }
        }
        const Mn = "Reached end of buffer unexpectedly";
        function Pn(t) {
          if (0 === t.length) throw new Error(Mn);
          return t.shift();
        }
        function Rn(t, ...e) {
          const [r] = e;
          if (2 === e.length ? r + (e[1] ?? 0) > t.length : r >= t.length)
            throw new Error(Mn);
          return t.splice(...e);
        }
        class Tn {
          constructor(t) {
            (this.header = void 0),
              (this.accountKeys = void 0),
              (this.recentBlockhash = void 0),
              (this.instructions = void 0),
              (this.indexToProgramIds = new Map()),
              (this.header = t.header),
              (this.accountKeys = t.accountKeys.map((t) => new ln(t))),
              (this.recentBlockhash = t.recentBlockhash),
              (this.instructions = t.instructions),
              this.instructions.forEach((t) =>
                this.indexToProgramIds.set(
                  t.programIdIndex,
                  this.accountKeys[t.programIdIndex]
                )
              );
          }
          get version() {
            return "legacy";
          }
          get staticAccountKeys() {
            return this.accountKeys;
          }
          get compiledInstructions() {
            return this.instructions.map((t) => ({
              programIdIndex: t.programIdIndex,
              accountKeyIndexes: t.accounts,
              data: ae().decode(t.data),
            }));
          }
          get addressTableLookups() {
            return [];
          }
          getAccountKeys() {
            return new kn(this.staticAccountKeys);
          }
          static compile(t) {
            const e = xn.compile(t.instructions, t.payerKey),
              [r, n] = e.getMessageComponents(),
              i = new kn(n)
                .compileInstructions(t.instructions)
                .map((t) => ({
                  programIdIndex: t.programIdIndex,
                  accounts: t.accountKeyIndexes,
                  data: ae().encode(t.data),
                }));
            return new Tn({
              header: r,
              accountKeys: n,
              recentBlockhash: t.recentBlockhash,
              instructions: i,
            });
          }
          isAccountSigner(t) {
            return t < this.header.numRequiredSignatures;
          }
          isAccountWritable(t) {
            const e = this.header.numRequiredSignatures;
            return t >= this.header.numRequiredSignatures
              ? t - e <
                  this.accountKeys.length -
                    e -
                    this.header.numReadonlyUnsignedAccounts
              : t < e - this.header.numReadonlySignedAccounts;
          }
          isProgramId(t) {
            return this.indexToProgramIds.has(t);
          }
          programIds() {
            return [...this.indexToProgramIds.values()];
          }
          nonProgramIds() {
            return this.accountKeys.filter((t, e) => !this.isProgramId(e));
          }
          serialize() {
            const t = this.accountKeys.length;
            let r = [];
            _n(r, t);
            const n = this.instructions.map((t) => {
              const { accounts: r, programIdIndex: n } = t,
                i = Array.from(ae().decode(t.data));
              let o = [];
              _n(o, r.length);
              let s = [];
              return (
                _n(s, i.length),
                {
                  programIdIndex: n,
                  keyIndicesCount: e.Buffer.from(o),
                  keyIndices: r,
                  dataLength: e.Buffer.from(s),
                  data: i,
                }
              );
            });
            let i = [];
            _n(i, n.length);
            let o = e.Buffer.alloc(pn);
            e.Buffer.from(i).copy(o);
            let s = i.length;
            n.forEach((t) => {
              const e = Be.w3([
                Be.u8("programIdIndex"),
                Be.av(t.keyIndicesCount.length, "keyIndicesCount"),
                Be.O6(Be.u8("keyIndex"), t.keyIndices.length, "keyIndices"),
                Be.av(t.dataLength.length, "dataLength"),
                Be.O6(Be.u8("userdatum"), t.data.length, "data"),
              ]).encode(t, o, s);
              s += e;
            }),
              (o = o.slice(0, s));
            const a = Be.w3([
                Be.av(1, "numRequiredSignatures"),
                Be.av(1, "numReadonlySignedAccounts"),
                Be.av(1, "numReadonlyUnsignedAccounts"),
                Be.av(r.length, "keyCount"),
                Be.O6(vn("key"), t, "keys"),
                vn("recentBlockhash"),
              ]),
              c = {
                numRequiredSignatures: e.Buffer.from([
                  this.header.numRequiredSignatures,
                ]),
                numReadonlySignedAccounts: e.Buffer.from([
                  this.header.numReadonlySignedAccounts,
                ]),
                numReadonlyUnsignedAccounts: e.Buffer.from([
                  this.header.numReadonlyUnsignedAccounts,
                ]),
                keyCount: e.Buffer.from(r),
                keys: this.accountKeys.map((t) => rn(t.toBytes())),
                recentBlockhash: ae().decode(this.recentBlockhash),
              };
            let u = e.Buffer.alloc(2048);
            const h = a.encode(c, u);
            return o.copy(u, h), u.slice(0, h + o.length);
          }
          static from(t) {
            let r = [...t];
            const n = Pn(r);
            if (n !== (n & gn))
              throw new Error(
                "Versioned messages must be deserialized with VersionedMessage.deserialize()"
              );
            const i = Pn(r),
              o = Pn(r),
              s = En(r);
            let a = [];
            for (let t = 0; t < s; t++) {
              const t = Rn(r, 0, un);
              a.push(new ln(e.Buffer.from(t)));
            }
            const c = Rn(r, 0, un),
              u = En(r);
            let h = [];
            for (let t = 0; t < u; t++) {
              const t = Pn(r),
                n = Rn(r, 0, En(r)),
                i = Rn(r, 0, En(r)),
                o = ae().encode(e.Buffer.from(i));
              h.push({ programIdIndex: t, accounts: n, data: o });
            }
            const l = {
              header: {
                numRequiredSignatures: n,
                numReadonlySignedAccounts: i,
                numReadonlyUnsignedAccounts: o,
              },
              recentBlockhash: ae().encode(e.Buffer.from(c)),
              accountKeys: a,
              instructions: h,
            };
            return new Tn(l);
          }
        }
        class On {
          constructor(t) {
            (this.header = void 0),
              (this.staticAccountKeys = void 0),
              (this.recentBlockhash = void 0),
              (this.compiledInstructions = void 0),
              (this.addressTableLookups = void 0),
              (this.header = t.header),
              (this.staticAccountKeys = t.staticAccountKeys),
              (this.recentBlockhash = t.recentBlockhash),
              (this.compiledInstructions = t.compiledInstructions),
              (this.addressTableLookups = t.addressTableLookups);
          }
          get version() {
            return 0;
          }
          get numAccountKeysFromLookups() {
            let t = 0;
            for (const e of this.addressTableLookups)
              t += e.readonlyIndexes.length + e.writableIndexes.length;
            return t;
          }
          getAccountKeys(t) {
            let e;
            if (
              t &&
              "accountKeysFromLookups" in t &&
              t.accountKeysFromLookups
            ) {
              if (
                this.numAccountKeysFromLookups !=
                t.accountKeysFromLookups.writable.length +
                  t.accountKeysFromLookups.readonly.length
              )
                throw new Error(
                  "Failed to get account keys because of a mismatch in the number of account keys from lookups"
                );
              e = t.accountKeysFromLookups;
            } else if (
              t &&
              "addressLookupTableAccounts" in t &&
              t.addressLookupTableAccounts
            )
              e = this.resolveAddressTableLookups(t.addressLookupTableAccounts);
            else if (this.addressTableLookups.length > 0)
              throw new Error(
                "Failed to get account keys because address table lookups were not resolved"
              );
            return new kn(this.staticAccountKeys, e);
          }
          isAccountSigner(t) {
            return t < this.header.numRequiredSignatures;
          }
          isAccountWritable(t) {
            const e = this.header.numRequiredSignatures,
              r = this.staticAccountKeys.length;
            return t >= r
              ? t - r <
                  this.addressTableLookups.reduce(
                    (t, e) => t + e.writableIndexes.length,
                    0
                  )
              : t >= this.header.numRequiredSignatures
              ? t - e < r - e - this.header.numReadonlyUnsignedAccounts
              : t < e - this.header.numReadonlySignedAccounts;
          }
          resolveAddressTableLookups(t) {
            const e = { writable: [], readonly: [] };
            for (const r of this.addressTableLookups) {
              const n = t.find((t) => t.key.equals(r.accountKey));
              if (!n)
                throw new Error(
                  `Failed to find address lookup table account for table key ${r.accountKey.toBase58()}`
                );
              for (const t of r.writableIndexes) {
                if (!(t < n.state.addresses.length))
                  throw new Error(
                    `Failed to find address for index ${t} in address lookup table ${r.accountKey.toBase58()}`
                  );
                e.writable.push(n.state.addresses[t]);
              }
              for (const t of r.readonlyIndexes) {
                if (!(t < n.state.addresses.length))
                  throw new Error(
                    `Failed to find address for index ${t} in address lookup table ${r.accountKey.toBase58()}`
                  );
                e.readonly.push(n.state.addresses[t]);
              }
            }
            return e;
          }
          static compile(t) {
            const e = xn.compile(t.instructions, t.payerKey),
              r = new Array(),
              n = { writable: new Array(), readonly: new Array() },
              i = t.addressLookupTableAccounts || [];
            for (const t of i) {
              const i = e.extractTableLookup(t);
              if (void 0 !== i) {
                const [t, { writable: e, readonly: o }] = i;
                r.push(t), n.writable.push(...e), n.readonly.push(...o);
              }
            }
            const [o, s] = e.getMessageComponents(),
              a = new kn(s, n).compileInstructions(t.instructions);
            return new On({
              header: o,
              staticAccountKeys: s,
              recentBlockhash: t.recentBlockhash,
              compiledInstructions: a,
              addressTableLookups: r,
            });
          }
          serialize() {
            const t = Array();
            _n(t, this.staticAccountKeys.length);
            const e = this.serializeInstructions(),
              r = Array();
            _n(r, this.compiledInstructions.length);
            const n = this.serializeAddressTableLookups(),
              i = Array();
            _n(i, this.addressTableLookups.length);
            const o = Be.w3([
                Be.u8("prefix"),
                Be.w3(
                  [
                    Be.u8("numRequiredSignatures"),
                    Be.u8("numReadonlySignedAccounts"),
                    Be.u8("numReadonlyUnsignedAccounts"),
                  ],
                  "header"
                ),
                Be.av(t.length, "staticAccountKeysLength"),
                Be.O6(vn(), this.staticAccountKeys.length, "staticAccountKeys"),
                vn("recentBlockhash"),
                Be.av(r.length, "instructionsLength"),
                Be.av(e.length, "serializedInstructions"),
                Be.av(i.length, "addressTableLookupsLength"),
                Be.av(n.length, "serializedAddressTableLookups"),
              ]),
              s = new Uint8Array(pn),
              a = o.encode(
                {
                  prefix: 128,
                  header: this.header,
                  staticAccountKeysLength: new Uint8Array(t),
                  staticAccountKeys: this.staticAccountKeys.map((t) =>
                    t.toBytes()
                  ),
                  recentBlockhash: ae().decode(this.recentBlockhash),
                  instructionsLength: new Uint8Array(r),
                  serializedInstructions: e,
                  addressTableLookupsLength: new Uint8Array(i),
                  serializedAddressTableLookups: n,
                },
                s
              );
            return s.slice(0, a);
          }
          serializeInstructions() {
            let t = 0;
            const e = new Uint8Array(pn);
            for (const r of this.compiledInstructions) {
              const n = Array();
              _n(n, r.accountKeyIndexes.length);
              const i = Array();
              _n(i, r.data.length),
                (t += Be.w3([
                  Be.u8("programIdIndex"),
                  Be.av(n.length, "encodedAccountKeyIndexesLength"),
                  Be.O6(
                    Be.u8(),
                    r.accountKeyIndexes.length,
                    "accountKeyIndexes"
                  ),
                  Be.av(i.length, "encodedDataLength"),
                  Be.av(r.data.length, "data"),
                ]).encode(
                  {
                    programIdIndex: r.programIdIndex,
                    encodedAccountKeyIndexesLength: new Uint8Array(n),
                    accountKeyIndexes: r.accountKeyIndexes,
                    encodedDataLength: new Uint8Array(i),
                    data: r.data,
                  },
                  e,
                  t
                ));
            }
            return e.slice(0, t);
          }
          serializeAddressTableLookups() {
            let t = 0;
            const e = new Uint8Array(pn);
            for (const r of this.addressTableLookups) {
              const n = Array();
              _n(n, r.writableIndexes.length);
              const i = Array();
              _n(i, r.readonlyIndexes.length),
                (t += Be.w3([
                  vn("accountKey"),
                  Be.av(n.length, "encodedWritableIndexesLength"),
                  Be.O6(Be.u8(), r.writableIndexes.length, "writableIndexes"),
                  Be.av(i.length, "encodedReadonlyIndexesLength"),
                  Be.O6(Be.u8(), r.readonlyIndexes.length, "readonlyIndexes"),
                ]).encode(
                  {
                    accountKey: r.accountKey.toBytes(),
                    encodedWritableIndexesLength: new Uint8Array(n),
                    writableIndexes: r.writableIndexes,
                    encodedReadonlyIndexesLength: new Uint8Array(i),
                    readonlyIndexes: r.readonlyIndexes,
                  },
                  e,
                  t
                ));
            }
            return e.slice(0, t);
          }
          static deserialize(t) {
            let e = [...t];
            const r = Pn(e),
              n = r & gn;
            Bn(
              r !== n,
              "Expected versioned message but received legacy message"
            ),
              Bn(
                0 === n,
                `Expected versioned message with version 0 but found version ${n}`
              );
            const i = {
                numRequiredSignatures: Pn(e),
                numReadonlySignedAccounts: Pn(e),
                numReadonlyUnsignedAccounts: Pn(e),
              },
              o = [],
              s = En(e);
            for (let t = 0; t < s; t++) o.push(new ln(Rn(e, 0, un)));
            const a = ae().encode(Rn(e, 0, un)),
              c = En(e),
              u = [];
            for (let t = 0; t < c; t++) {
              const t = Pn(e),
                r = Rn(e, 0, En(e)),
                n = En(e),
                i = new Uint8Array(Rn(e, 0, n));
              u.push({ programIdIndex: t, accountKeyIndexes: r, data: i });
            }
            const h = En(e),
              l = [];
            for (let t = 0; t < h; t++) {
              const t = new ln(Rn(e, 0, un)),
                r = Rn(e, 0, En(e)),
                n = Rn(e, 0, En(e));
              l.push({ accountKey: t, writableIndexes: r, readonlyIndexes: n });
            }
            return new On({
              header: i,
              staticAccountKeys: o,
              recentBlockhash: a,
              compiledInstructions: u,
              addressTableLookups: l,
            });
          }
        }
        const Ln = {
          deserializeMessageVersion(t) {
            const e = t[0],
              r = e & gn;
            return r === e ? "legacy" : r;
          },
          deserialize: (t) => {
            const e = Ln.deserializeMessageVersion(t);
            if ("legacy" === e) return Tn.from(t);
            if (0 === e) return On.deserialize(t);
            throw new Error(
              `Transaction message version ${e} deserialization is not supported`
            );
          },
        };
        let Cn = (function (t) {
          return (
            (t[(t.BLOCKHEIGHT_EXCEEDED = 0)] = "BLOCKHEIGHT_EXCEEDED"),
            (t[(t.PROCESSED = 1)] = "PROCESSED"),
            (t[(t.TIMED_OUT = 2)] = "TIMED_OUT"),
            (t[(t.NONCE_INVALID = 3)] = "NONCE_INVALID"),
            t
          );
        })({});
        const zn = e.Buffer.alloc(mn).fill(0);
        class Un {
          constructor(t) {
            (this.keys = void 0),
              (this.programId = void 0),
              (this.data = e.Buffer.alloc(0)),
              (this.programId = t.programId),
              (this.keys = t.keys),
              t.data && (this.data = t.data);
          }
          toJSON() {
            return {
              keys: this.keys.map(
                ({ pubkey: t, isSigner: e, isWritable: r }) => ({
                  pubkey: t.toJSON(),
                  isSigner: e,
                  isWritable: r,
                })
              ),
              programId: this.programId.toJSON(),
              data: [...this.data],
            };
          }
        }
        class Nn {
          get signature() {
            return this.signatures.length > 0
              ? this.signatures[0].signature
              : null;
          }
          constructor(t) {
            if (
              ((this.signatures = []),
              (this.feePayer = void 0),
              (this.instructions = []),
              (this.recentBlockhash = void 0),
              (this.lastValidBlockHeight = void 0),
              (this.nonceInfo = void 0),
              (this.minNonceContextSlot = void 0),
              (this._message = void 0),
              (this._json = void 0),
              t)
            )
              if (
                (t.feePayer && (this.feePayer = t.feePayer),
                t.signatures && (this.signatures = t.signatures),
                Object.prototype.hasOwnProperty.call(t, "nonceInfo"))
              ) {
                const { minContextSlot: e, nonceInfo: r } = t;
                (this.minNonceContextSlot = e), (this.nonceInfo = r);
              } else if (
                Object.prototype.hasOwnProperty.call(t, "lastValidBlockHeight")
              ) {
                const { blockhash: e, lastValidBlockHeight: r } = t;
                (this.recentBlockhash = e), (this.lastValidBlockHeight = r);
              } else {
                const { recentBlockhash: e, nonceInfo: r } = t;
                r && (this.nonceInfo = r), (this.recentBlockhash = e);
              }
          }
          toJSON() {
            return {
              recentBlockhash: this.recentBlockhash || null,
              feePayer: this.feePayer ? this.feePayer.toJSON() : null,
              nonceInfo: this.nonceInfo
                ? {
                    nonce: this.nonceInfo.nonce,
                    nonceInstruction: this.nonceInfo.nonceInstruction.toJSON(),
                  }
                : null,
              instructions: this.instructions.map((t) => t.toJSON()),
              signers: this.signatures.map(({ publicKey: t }) => t.toJSON()),
            };
          }
          add(...t) {
            if (0 === t.length) throw new Error("No instructions");
            return (
              t.forEach((t) => {
                "instructions" in t
                  ? (this.instructions = this.instructions.concat(
                      t.instructions
                    ))
                  : "data" in t && "programId" in t && "keys" in t
                  ? this.instructions.push(t)
                  : this.instructions.push(new Un(t));
              }),
              this
            );
          }
          compileMessage() {
            if (
              this._message &&
              JSON.stringify(this.toJSON()) === JSON.stringify(this._json)
            )
              return this._message;
            let t, e, r;
            if (
              (this.nonceInfo
                ? ((t = this.nonceInfo.nonce),
                  (e =
                    this.instructions[0] != this.nonceInfo.nonceInstruction
                      ? [this.nonceInfo.nonceInstruction, ...this.instructions]
                      : this.instructions))
                : ((t = this.recentBlockhash), (e = this.instructions)),
              !t)
            )
              throw new Error("Transaction recentBlockhash required");
            if (
              (e.length < 1 && console.warn("No instructions provided"),
              this.feePayer)
            )
              r = this.feePayer;
            else {
              if (!(this.signatures.length > 0 && this.signatures[0].publicKey))
                throw new Error("Transaction fee payer required");
              r = this.signatures[0].publicKey;
            }
            for (let t = 0; t < e.length; t++)
              if (void 0 === e[t].programId)
                throw new Error(
                  `Transaction instruction index ${t} has undefined program id`
                );
            const n = [],
              i = [];
            e.forEach((t) => {
              t.keys.forEach((t) => {
                i.push({ ...t });
              });
              const e = t.programId.toString();
              n.includes(e) || n.push(e);
            }),
              n.forEach((t) => {
                i.push({ pubkey: new ln(t), isSigner: !1, isWritable: !1 });
              });
            const o = [];
            i.forEach((t) => {
              const e = t.pubkey.toString(),
                r = o.findIndex((t) => t.pubkey.toString() === e);
              r > -1
                ? ((o[r].isWritable = o[r].isWritable || t.isWritable),
                  (o[r].isSigner = o[r].isSigner || t.isSigner))
                : o.push(t);
            }),
              o.sort(function (t, e) {
                return t.isSigner !== e.isSigner
                  ? t.isSigner
                    ? -1
                    : 1
                  : t.isWritable !== e.isWritable
                  ? t.isWritable
                    ? -1
                    : 1
                  : t.pubkey
                      .toBase58()
                      .localeCompare(e.pubkey.toBase58(), "en", {
                        localeMatcher: "best fit",
                        usage: "sort",
                        sensitivity: "variant",
                        ignorePunctuation: !1,
                        numeric: !1,
                        caseFirst: "lower",
                      });
              });
            const s = o.findIndex((t) => t.pubkey.equals(r));
            if (s > -1) {
              const [t] = o.splice(s, 1);
              (t.isSigner = !0), (t.isWritable = !0), o.unshift(t);
            } else o.unshift({ pubkey: r, isSigner: !0, isWritable: !0 });
            for (const t of this.signatures) {
              const e = o.findIndex((e) => e.pubkey.equals(t.publicKey));
              if (!(e > -1))
                throw new Error(`unknown signer: ${t.publicKey.toString()}`);
              o[e].isSigner ||
                ((o[e].isSigner = !0),
                console.warn(
                  "Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."
                ));
            }
            let a = 0,
              c = 0,
              u = 0;
            const h = [],
              l = [];
            o.forEach(({ pubkey: t, isSigner: e, isWritable: r }) => {
              e
                ? (h.push(t.toString()), (a += 1), r || (c += 1))
                : (l.push(t.toString()), r || (u += 1));
            });
            const d = h.concat(l),
              f = e.map((t) => {
                const { data: e, programId: r } = t;
                return {
                  programIdIndex: d.indexOf(r.toString()),
                  accounts: t.keys.map((t) => d.indexOf(t.pubkey.toString())),
                  data: ae().encode(e),
                };
              });
            return (
              f.forEach((t) => {
                Bn(t.programIdIndex >= 0),
                  t.accounts.forEach((t) => Bn(t >= 0));
              }),
              new Tn({
                header: {
                  numRequiredSignatures: a,
                  numReadonlySignedAccounts: c,
                  numReadonlyUnsignedAccounts: u,
                },
                accountKeys: d,
                recentBlockhash: t,
                instructions: f,
              })
            );
          }
          _compile() {
            const t = this.compileMessage(),
              e = t.accountKeys.slice(0, t.header.numRequiredSignatures);
            return (
              (this.signatures.length === e.length &&
                this.signatures.every((t, r) => e[r].equals(t.publicKey))) ||
                (this.signatures = e.map((t) => ({
                  signature: null,
                  publicKey: t,
                }))),
              t
            );
          }
          serializeMessage() {
            return this._compile().serialize();
          }
          async getEstimatedFee(t) {
            return (await t.getFeeForMessage(this.compileMessage())).value;
          }
          setSigners(...t) {
            if (0 === t.length) throw new Error("No signers");
            const e = new Set();
            this.signatures = t
              .filter((t) => {
                const r = t.toString();
                return !e.has(r) && (e.add(r), !0);
              })
              .map((t) => ({ signature: null, publicKey: t }));
          }
          sign(...t) {
            if (0 === t.length) throw new Error("No signers");
            const e = new Set(),
              r = [];
            for (const n of t) {
              const t = n.publicKey.toString();
              e.has(t) || (e.add(t), r.push(n));
            }
            this.signatures = r.map((t) => ({
              signature: null,
              publicKey: t.publicKey,
            }));
            const n = this._compile();
            this._partialSign(n, ...r);
          }
          partialSign(...t) {
            if (0 === t.length) throw new Error("No signers");
            const e = new Set(),
              r = [];
            for (const n of t) {
              const t = n.publicKey.toString();
              e.has(t) || (e.add(t), r.push(n));
            }
            const n = this._compile();
            this._partialSign(n, ...r);
          }
          _partialSign(t, ...e) {
            const r = t.serialize();
            e.forEach((t) => {
              const e = tn(r, t.secretKey);
              this._addSignature(t.publicKey, rn(e));
            });
          }
          addSignature(t, e) {
            this._compile(), this._addSignature(t, e);
          }
          _addSignature(t, r) {
            Bn(64 === r.length);
            const n = this.signatures.findIndex((e) => t.equals(e.publicKey));
            if (n < 0) throw new Error(`unknown signer: ${t.toString()}`);
            this.signatures[n].signature = e.Buffer.from(r);
          }
          verifySignatures(t = !0) {
            return !this._getMessageSignednessErrors(
              this.serializeMessage(),
              t
            );
          }
          _getMessageSignednessErrors(t, e) {
            const r = {};
            for (const { signature: n, publicKey: i } of this.signatures)
              null === n
                ? e && (r.missing ||= []).push(i)
                : en(n, t, i.toBytes()) || (r.invalid ||= []).push(i);
            return r.invalid || r.missing ? r : void 0;
          }
          serialize(t) {
            const { requireAllSignatures: e, verifySignatures: r } =
                Object.assign(
                  { requireAllSignatures: !0, verifySignatures: !0 },
                  t
                ),
              n = this.serializeMessage();
            if (r) {
              const t = this._getMessageSignednessErrors(n, e);
              if (t) {
                let e = "Signature verification failed.";
                throw (
                  (t.invalid &&
                    (e += `\nInvalid signature for public key${
                      1 === t.invalid.length ? "" : "(s)"
                    } [\`${t.invalid
                      .map((t) => t.toBase58())
                      .join("`, `")}\`].`),
                  t.missing &&
                    (e += `\nMissing signature for public key${
                      1 === t.missing.length ? "" : "(s)"
                    } [\`${t.missing
                      .map((t) => t.toBase58())
                      .join("`, `")}\`].`),
                  new Error(e))
                );
              }
            }
            return this._serialize(n);
          }
          _serialize(t) {
            const { signatures: r } = this,
              n = [];
            _n(n, r.length);
            const i = n.length + 64 * r.length + t.length,
              o = e.Buffer.alloc(i);
            return (
              Bn(r.length < 256),
              e.Buffer.from(n).copy(o, 0),
              r.forEach(({ signature: t }, r) => {
                null !== t &&
                  (Bn(64 === t.length, "signature has invalid length"),
                  e.Buffer.from(t).copy(o, n.length + 64 * r));
              }),
              t.copy(o, n.length + 64 * r.length),
              Bn(o.length <= pn, `Transaction too large: ${o.length} > ${pn}`),
              o
            );
          }
          get keys() {
            return (
              Bn(1 === this.instructions.length),
              this.instructions[0].keys.map((t) => t.pubkey)
            );
          }
          get programId() {
            return (
              Bn(1 === this.instructions.length), this.instructions[0].programId
            );
          }
          get data() {
            return (
              Bn(1 === this.instructions.length), this.instructions[0].data
            );
          }
          static from(t) {
            let r = [...t];
            const n = En(r);
            let i = [];
            for (let t = 0; t < n; t++) {
              const t = Rn(r, 0, mn);
              i.push(ae().encode(e.Buffer.from(t)));
            }
            return Nn.populate(Tn.from(r), i);
          }
          static populate(t, e = []) {
            const r = new Nn();
            return (
              (r.recentBlockhash = t.recentBlockhash),
              t.header.numRequiredSignatures > 0 &&
                (r.feePayer = t.accountKeys[0]),
              e.forEach((e, n) => {
                const i = {
                  signature: e == ae().encode(zn) ? null : ae().decode(e),
                  publicKey: t.accountKeys[n],
                };
                r.signatures.push(i);
              }),
              t.instructions.forEach((e) => {
                const n = e.accounts.map((e) => {
                  const n = t.accountKeys[e];
                  return {
                    pubkey: n,
                    isSigner:
                      r.signatures.some(
                        (t) => t.publicKey.toString() === n.toString()
                      ) || t.isAccountSigner(e),
                    isWritable: t.isAccountWritable(e),
                  };
                });
                r.instructions.push(
                  new Un({
                    keys: n,
                    programId: t.accountKeys[e.programIdIndex],
                    data: ae().decode(e.data),
                  })
                );
              }),
              (r._message = t),
              (r._json = r.toJSON()),
              r
            );
          }
        }
        class Wn {
          constructor(t) {
            (this.payerKey = void 0),
              (this.instructions = void 0),
              (this.recentBlockhash = void 0),
              (this.payerKey = t.payerKey),
              (this.instructions = t.instructions),
              (this.recentBlockhash = t.recentBlockhash);
          }
          static decompile(t, e) {
            const {
                header: r,
                compiledInstructions: n,
                recentBlockhash: i,
              } = t,
              {
                numRequiredSignatures: o,
                numReadonlySignedAccounts: s,
                numReadonlyUnsignedAccounts: a,
              } = r,
              c = o - s;
            Bn(c > 0, "Message header is invalid");
            const u = t.staticAccountKeys.length - o - a;
            Bn(u >= 0, "Message header is invalid");
            const h = t.getAccountKeys(e),
              l = h.get(0);
            if (void 0 === l)
              throw new Error(
                "Failed to decompile message because no account keys were found"
              );
            const d = [];
            for (const t of n) {
              const e = [];
              for (const n of t.accountKeyIndexes) {
                const t = h.get(n);
                if (void 0 === t)
                  throw new Error(
                    `Failed to find key for account key index ${n}`
                  );
                let i;
                (i =
                  n < o
                    ? n < c
                    : n < h.staticAccountKeys.length
                    ? n - o < u
                    : n - h.staticAccountKeys.length <
                      h.accountKeysFromLookups.writable.length),
                  e.push({
                    pubkey: t,
                    isSigner: n < r.numRequiredSignatures,
                    isWritable: i,
                  });
              }
              const n = h.get(t.programIdIndex);
              if (void 0 === n)
                throw new Error(
                  `Failed to find program id for program id index ${t.programIdIndex}`
                );
              d.push(new Un({ programId: n, data: rn(t.data), keys: e }));
            }
            return new Wn({ payerKey: l, instructions: d, recentBlockhash: i });
          }
          compileToLegacyMessage() {
            return Tn.compile({
              payerKey: this.payerKey,
              recentBlockhash: this.recentBlockhash,
              instructions: this.instructions,
            });
          }
          compileToV0Message(t) {
            return On.compile({
              payerKey: this.payerKey,
              recentBlockhash: this.recentBlockhash,
              instructions: this.instructions,
              addressLookupTableAccounts: t,
            });
          }
        }
        class Kn {
          get version() {
            return this.message.version;
          }
          constructor(t, e) {
            if (
              ((this.signatures = void 0),
              (this.message = void 0),
              void 0 !== e)
            )
              Bn(
                e.length === t.header.numRequiredSignatures,
                "Expected signatures length to be equal to the number of required signatures"
              ),
                (this.signatures = e);
            else {
              const e = [];
              for (let r = 0; r < t.header.numRequiredSignatures; r++)
                e.push(new Uint8Array(mn));
              this.signatures = e;
            }
            this.message = t;
          }
          serialize() {
            const t = this.message.serialize(),
              e = Array();
            _n(e, this.signatures.length);
            const r = Be.w3([
                Be.av(e.length, "encodedSignaturesLength"),
                Be.O6(Sn(), this.signatures.length, "signatures"),
                Be.av(t.length, "serializedMessage"),
              ]),
              n = new Uint8Array(2048),
              i = r.encode(
                {
                  encodedSignaturesLength: new Uint8Array(e),
                  signatures: this.signatures,
                  serializedMessage: t,
                },
                n
              );
            return n.slice(0, i);
          }
          static deserialize(t) {
            let e = [...t];
            const r = [],
              n = En(e);
            for (let t = 0; t < n; t++) r.push(new Uint8Array(Rn(e, 0, mn)));
            const i = Ln.deserialize(new Uint8Array(e));
            return new Kn(i, r);
          }
          sign(t) {
            const e = this.message.serialize(),
              r = this.message.staticAccountKeys.slice(
                0,
                this.message.header.numRequiredSignatures
              );
            for (const n of t) {
              const t = r.findIndex((t) => t.equals(n.publicKey));
              Bn(
                t >= 0,
                `Cannot sign with non signer key ${n.publicKey.toBase58()}`
              ),
                (this.signatures[t] = tn(e, n.secretKey));
            }
          }
          addSignature(t, e) {
            Bn(64 === e.byteLength, "Signature must be 64 bytes long");
            const r = this.message.staticAccountKeys
              .slice(0, this.message.header.numRequiredSignatures)
              .findIndex((e) => e.equals(t));
            Bn(
              r >= 0,
              `Can not add signature; \`${t.toBase58()}\` is not required to sign this transaction`
            ),
              (this.signatures[r] = e);
          }
        }
        const qn = new ln("SysvarC1ock11111111111111111111111111111111"),
          Dn = new ln("SysvarEpochSchedu1e111111111111111111111111"),
          Hn = new ln("Sysvar1nstructions1111111111111111111111111"),
          Fn = new ln("SysvarRecentB1ockHashes11111111111111111111"),
          jn = new ln("SysvarRent111111111111111111111111111111111"),
          $n = new ln("SysvarRewards111111111111111111111111111111"),
          Vn = new ln("SysvarS1otHashes111111111111111111111111111"),
          Gn = new ln("SysvarS1otHistory11111111111111111111111111"),
          Yn = new ln("SysvarStakeHistory1111111111111111111111111");
        class Zn extends Error {
          constructor({
            action: t,
            signature: e,
            transactionMessage: r,
            logs: n,
          }) {
            const i = n
                ? `Logs: \n${JSON.stringify(n.slice(-10), null, 2)}. `
                : "",
              o =
                "\nCatch the `SendTransactionError` and call `getLogs()` on it for full details.";
            let s;
            switch (t) {
              case "send":
                s = `Transaction ${e} resulted in an error. \n${r}. ` + i + o;
                break;
              case "simulate":
                s = `Simulation failed. \nMessage: ${r}. \n` + i + o;
                break;
              default:
                s = `Unknown action '${t}'`;
            }
            super(s),
              (this.signature = void 0),
              (this.transactionMessage = void 0),
              (this.transactionLogs = void 0),
              (this.signature = e),
              (this.transactionMessage = r),
              (this.transactionLogs = n || void 0);
          }
          get transactionError() {
            return {
              message: this.transactionMessage,
              logs: Array.isArray(this.transactionLogs)
                ? this.transactionLogs
                : void 0,
            };
          }
          get logs() {
            const t = this.transactionLogs;
            if (null == t || "object" != typeof t || !("then" in t)) return t;
          }
          async getLogs(t) {
            return (
              Array.isArray(this.transactionLogs) ||
                (this.transactionLogs = new Promise((e, r) => {
                  t.getTransaction(this.signature)
                    .then((t) => {
                      if (t && t.meta && t.meta.logMessages) {
                        const r = t.meta.logMessages;
                        (this.transactionLogs = r), e(r);
                      } else r(new Error("Log messages not found"));
                    })
                    .catch(r);
                })),
              await this.transactionLogs
            );
          }
        }
        const Jn = {
          JSON_RPC_SERVER_ERROR_BLOCK_CLEANED_UP: -32001,
          JSON_RPC_SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE: -32002,
          JSON_RPC_SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE:
            -32003,
          JSON_RPC_SERVER_ERROR_BLOCK_NOT_AVAILABLE: -32004,
          JSON_RPC_SERVER_ERROR_NODE_UNHEALTHY: -32005,
          JSON_RPC_SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE:
            -32006,
          JSON_RPC_SERVER_ERROR_SLOT_SKIPPED: -32007,
          JSON_RPC_SERVER_ERROR_NO_SNAPSHOT: -32008,
          JSON_RPC_SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED: -32009,
          JSON_RPC_SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX: -32010,
          JSON_RPC_SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE: -32011,
          JSON_RPC_SCAN_ERROR: -32012,
          JSON_RPC_SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH: -32013,
          JSON_RPC_SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET: -32014,
          JSON_RPC_SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION: -32015,
          JSON_RPC_SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED: -32016,
        };
        class Xn extends Error {
          constructor({ code: t, message: e, data: r }, n) {
            super(null != n ? `${n}: ${e}` : e),
              (this.code = void 0),
              (this.data = void 0),
              (this.code = t),
              (this.data = r),
              (this.name = "SolanaJSONRPCError");
          }
        }
        async function Qn(t, e, r, n) {
          const i = n && {
              skipPreflight: n.skipPreflight,
              preflightCommitment: n.preflightCommitment || n.commitment,
              maxRetries: n.maxRetries,
              minContextSlot: n.minContextSlot,
            },
            o = await t.sendTransaction(e, r, i);
          let s;
          if (null != e.recentBlockhash && null != e.lastValidBlockHeight)
            s = (
              await t.confirmTransaction(
                {
                  abortSignal: n?.abortSignal,
                  signature: o,
                  blockhash: e.recentBlockhash,
                  lastValidBlockHeight: e.lastValidBlockHeight,
                },
                n && n.commitment
              )
            ).value;
          else if (null != e.minNonceContextSlot && null != e.nonceInfo) {
            const { nonceInstruction: r } = e.nonceInfo,
              i = r.keys[0].pubkey;
            s = (
              await t.confirmTransaction(
                {
                  abortSignal: n?.abortSignal,
                  minContextSlot: e.minNonceContextSlot,
                  nonceAccountPubkey: i,
                  nonceValue: e.nonceInfo.nonce,
                  signature: o,
                },
                n && n.commitment
              )
            ).value;
          } else
            null != n?.abortSignal &&
              console.warn(
                "sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."
              ),
              (s = (await t.confirmTransaction(o, n && n.commitment)).value);
          if (s.err) {
            if (null != o)
              throw new Zn({
                action: "send",
                signature: o,
                transactionMessage: `Status: (${JSON.stringify(s)})`,
              });
            throw new Error(`Transaction ${o} failed (${JSON.stringify(s)})`);
          }
          return o;
        }
        function ti(t) {
          return new Promise((e) => setTimeout(e, t));
        }
        function ei(t, r) {
          const n = t.layout.span >= 0 ? t.layout.span : An(t, r),
            i = e.Buffer.alloc(n),
            o = Object.assign({ instruction: t.index }, r);
          return t.layout.encode(o, i), i;
        }
        function ri(t, e) {
          let r;
          try {
            r = t.layout.decode(e);
          } catch (t) {
            throw new Error("invalid instruction; " + t);
          }
          if (r.instruction !== t.index)
            throw new Error(
              `invalid instruction; instruction index mismatch ${r.instruction} != ${t.index}`
            );
          return r;
        }
        const ni = Be.I0("lamportsPerSignature"),
          ii = Be.w3([
            Be.DH("version"),
            Be.DH("state"),
            vn("authorizedPubkey"),
            vn("nonce"),
            Be.w3([ni], "feeCalculator"),
          ]),
          oi = ii.span;
        class si {
          constructor(t) {
            (this.authorizedPubkey = void 0),
              (this.nonce = void 0),
              (this.feeCalculator = void 0),
              (this.authorizedPubkey = t.authorizedPubkey),
              (this.nonce = t.nonce),
              (this.feeCalculator = t.feeCalculator);
          }
          static fromAccountData(t) {
            const e = ii.decode(rn(t), 0);
            return new si({
              authorizedPubkey: new ln(e.authorizedPubkey),
              nonce: new ln(e.nonce).toString(),
              feeCalculator: e.feeCalculator,
            });
          }
        }
        const ai = (t) => {
          const r = (0, Be.av)(8, t),
            { encode: n, decode: i } = ((t) => ({
              decode: t.decode.bind(t),
              encode: t.encode.bind(t),
            }))(r),
            o = r;
          return (
            (o.decode = (t, r) => {
              const n = i(t, r);
              return (0, xe.k5)(e.Buffer.from(n));
            }),
            (o.encode = (t, e, r) => {
              const i = (0, xe.Bq)(t, 8);
              return n(i, e, r);
            }),
            o
          );
        };
        class ci {
          constructor() {}
          static decodeInstructionType(t) {
            this.checkProgramId(t.programId);
            const e = Be.DH("instruction").decode(t.data);
            let r;
            for (const [t, n] of Object.entries(ui))
              if (n.index == e) {
                r = t;
                break;
              }
            if (!r)
              throw new Error(
                "Instruction type incorrect; not a SystemInstruction"
              );
            return r;
          }
          static decodeCreateAccount(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
            const {
              lamports: e,
              space: r,
              programId: n,
            } = ri(ui.Create, t.data);
            return {
              fromPubkey: t.keys[0].pubkey,
              newAccountPubkey: t.keys[1].pubkey,
              lamports: e,
              space: r,
              programId: new ln(n),
            };
          }
          static decodeTransfer(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
            const { lamports: e } = ri(ui.Transfer, t.data);
            return {
              fromPubkey: t.keys[0].pubkey,
              toPubkey: t.keys[1].pubkey,
              lamports: e,
            };
          }
          static decodeTransferWithSeed(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const {
              lamports: e,
              seed: r,
              programId: n,
            } = ri(ui.TransferWithSeed, t.data);
            return {
              fromPubkey: t.keys[0].pubkey,
              basePubkey: t.keys[1].pubkey,
              toPubkey: t.keys[2].pubkey,
              lamports: e,
              seed: r,
              programId: new ln(n),
            };
          }
          static decodeAllocate(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
            const { space: e } = ri(ui.Allocate, t.data);
            return { accountPubkey: t.keys[0].pubkey, space: e };
          }
          static decodeAllocateWithSeed(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
            const {
              base: e,
              seed: r,
              space: n,
              programId: i,
            } = ri(ui.AllocateWithSeed, t.data);
            return {
              accountPubkey: t.keys[0].pubkey,
              basePubkey: new ln(e),
              seed: r,
              space: n,
              programId: new ln(i),
            };
          }
          static decodeAssign(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
            const { programId: e } = ri(ui.Assign, t.data);
            return { accountPubkey: t.keys[0].pubkey, programId: new ln(e) };
          }
          static decodeAssignWithSeed(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
            const {
              base: e,
              seed: r,
              programId: n,
            } = ri(ui.AssignWithSeed, t.data);
            return {
              accountPubkey: t.keys[0].pubkey,
              basePubkey: new ln(e),
              seed: r,
              programId: new ln(n),
            };
          }
          static decodeCreateWithSeed(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
            const {
              base: e,
              seed: r,
              lamports: n,
              space: i,
              programId: o,
            } = ri(ui.CreateWithSeed, t.data);
            return {
              fromPubkey: t.keys[0].pubkey,
              newAccountPubkey: t.keys[1].pubkey,
              basePubkey: new ln(e),
              seed: r,
              lamports: n,
              space: i,
              programId: new ln(o),
            };
          }
          static decodeNonceInitialize(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const { authorized: e } = ri(ui.InitializeNonceAccount, t.data);
            return {
              noncePubkey: t.keys[0].pubkey,
              authorizedPubkey: new ln(e),
            };
          }
          static decodeNonceAdvance(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeyLength(t.keys, 3),
              ri(ui.AdvanceNonceAccount, t.data),
              {
                noncePubkey: t.keys[0].pubkey,
                authorizedPubkey: t.keys[2].pubkey,
              }
            );
          }
          static decodeNonceWithdraw(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 5);
            const { lamports: e } = ri(ui.WithdrawNonceAccount, t.data);
            return {
              noncePubkey: t.keys[0].pubkey,
              toPubkey: t.keys[1].pubkey,
              authorizedPubkey: t.keys[4].pubkey,
              lamports: e,
            };
          }
          static decodeNonceAuthorize(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
            const { authorized: e } = ri(ui.AuthorizeNonceAccount, t.data);
            return {
              noncePubkey: t.keys[0].pubkey,
              authorizedPubkey: t.keys[1].pubkey,
              newAuthorizedPubkey: new ln(e),
            };
          }
          static checkProgramId(t) {
            if (!t.equals(hi.programId))
              throw new Error(
                "invalid instruction; programId is not SystemProgram"
              );
          }
          static checkKeyLength(t, e) {
            if (t.length < e)
              throw new Error(
                `invalid instruction; found ${t.length} keys, expected at least ${e}`
              );
          }
        }
        const ui = Object.freeze({
          Create: {
            index: 0,
            layout: Be.w3([
              Be.DH("instruction"),
              Be.Wg("lamports"),
              Be.Wg("space"),
              vn("programId"),
            ]),
          },
          Assign: {
            index: 1,
            layout: Be.w3([Be.DH("instruction"), vn("programId")]),
          },
          Transfer: {
            index: 2,
            layout: Be.w3([Be.DH("instruction"), ai("lamports")]),
          },
          CreateWithSeed: {
            index: 3,
            layout: Be.w3([
              Be.DH("instruction"),
              vn("base"),
              In("seed"),
              Be.Wg("lamports"),
              Be.Wg("space"),
              vn("programId"),
            ]),
          },
          AdvanceNonceAccount: {
            index: 4,
            layout: Be.w3([Be.DH("instruction")]),
          },
          WithdrawNonceAccount: {
            index: 5,
            layout: Be.w3([Be.DH("instruction"), Be.Wg("lamports")]),
          },
          InitializeNonceAccount: {
            index: 6,
            layout: Be.w3([Be.DH("instruction"), vn("authorized")]),
          },
          AuthorizeNonceAccount: {
            index: 7,
            layout: Be.w3([Be.DH("instruction"), vn("authorized")]),
          },
          Allocate: {
            index: 8,
            layout: Be.w3([Be.DH("instruction"), Be.Wg("space")]),
          },
          AllocateWithSeed: {
            index: 9,
            layout: Be.w3([
              Be.DH("instruction"),
              vn("base"),
              In("seed"),
              Be.Wg("space"),
              vn("programId"),
            ]),
          },
          AssignWithSeed: {
            index: 10,
            layout: Be.w3([
              Be.DH("instruction"),
              vn("base"),
              In("seed"),
              vn("programId"),
            ]),
          },
          TransferWithSeed: {
            index: 11,
            layout: Be.w3([
              Be.DH("instruction"),
              ai("lamports"),
              In("seed"),
              vn("programId"),
            ]),
          },
          UpgradeNonceAccount: {
            index: 12,
            layout: Be.w3([Be.DH("instruction")]),
          },
        });
        class hi {
          constructor() {}
          static createAccount(t) {
            const e = ei(ui.Create, {
              lamports: t.lamports,
              space: t.space,
              programId: rn(t.programId.toBuffer()),
            });
            return new Un({
              keys: [
                { pubkey: t.fromPubkey, isSigner: !0, isWritable: !0 },
                { pubkey: t.newAccountPubkey, isSigner: !0, isWritable: !0 },
              ],
              programId: this.programId,
              data: e,
            });
          }
          static transfer(t) {
            let e, r;
            return (
              "basePubkey" in t
                ? ((e = ei(ui.TransferWithSeed, {
                    lamports: BigInt(t.lamports),
                    seed: t.seed,
                    programId: rn(t.programId.toBuffer()),
                  })),
                  (r = [
                    { pubkey: t.fromPubkey, isSigner: !1, isWritable: !0 },
                    { pubkey: t.basePubkey, isSigner: !0, isWritable: !1 },
                    { pubkey: t.toPubkey, isSigner: !1, isWritable: !0 },
                  ]))
                : ((e = ei(ui.Transfer, { lamports: BigInt(t.lamports) })),
                  (r = [
                    { pubkey: t.fromPubkey, isSigner: !0, isWritable: !0 },
                    { pubkey: t.toPubkey, isSigner: !1, isWritable: !0 },
                  ])),
              new Un({ keys: r, programId: this.programId, data: e })
            );
          }
          static assign(t) {
            let e, r;
            return (
              "basePubkey" in t
                ? ((e = ei(ui.AssignWithSeed, {
                    base: rn(t.basePubkey.toBuffer()),
                    seed: t.seed,
                    programId: rn(t.programId.toBuffer()),
                  })),
                  (r = [
                    { pubkey: t.accountPubkey, isSigner: !1, isWritable: !0 },
                    { pubkey: t.basePubkey, isSigner: !0, isWritable: !1 },
                  ]))
                : ((e = ei(ui.Assign, {
                    programId: rn(t.programId.toBuffer()),
                  })),
                  (r = [
                    { pubkey: t.accountPubkey, isSigner: !0, isWritable: !0 },
                  ])),
              new Un({ keys: r, programId: this.programId, data: e })
            );
          }
          static createAccountWithSeed(t) {
            const e = ei(ui.CreateWithSeed, {
              base: rn(t.basePubkey.toBuffer()),
              seed: t.seed,
              lamports: t.lamports,
              space: t.space,
              programId: rn(t.programId.toBuffer()),
            });
            let r = [
              { pubkey: t.fromPubkey, isSigner: !0, isWritable: !0 },
              { pubkey: t.newAccountPubkey, isSigner: !1, isWritable: !0 },
            ];
            return (
              t.basePubkey.equals(t.fromPubkey) ||
                r.push({ pubkey: t.basePubkey, isSigner: !0, isWritable: !1 }),
              new Un({ keys: r, programId: this.programId, data: e })
            );
          }
          static createNonceAccount(t) {
            const e = new Nn();
            "basePubkey" in t && "seed" in t
              ? e.add(
                  hi.createAccountWithSeed({
                    fromPubkey: t.fromPubkey,
                    newAccountPubkey: t.noncePubkey,
                    basePubkey: t.basePubkey,
                    seed: t.seed,
                    lamports: t.lamports,
                    space: oi,
                    programId: this.programId,
                  })
                )
              : e.add(
                  hi.createAccount({
                    fromPubkey: t.fromPubkey,
                    newAccountPubkey: t.noncePubkey,
                    lamports: t.lamports,
                    space: oi,
                    programId: this.programId,
                  })
                );
            const r = {
              noncePubkey: t.noncePubkey,
              authorizedPubkey: t.authorizedPubkey,
            };
            return e.add(this.nonceInitialize(r)), e;
          }
          static nonceInitialize(t) {
            const e = ei(ui.InitializeNonceAccount, {
                authorized: rn(t.authorizedPubkey.toBuffer()),
              }),
              r = {
                keys: [
                  { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
                  { pubkey: Fn, isSigner: !1, isWritable: !1 },
                  { pubkey: jn, isSigner: !1, isWritable: !1 },
                ],
                programId: this.programId,
                data: e,
              };
            return new Un(r);
          }
          static nonceAdvance(t) {
            const e = ei(ui.AdvanceNonceAccount),
              r = {
                keys: [
                  { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
                  { pubkey: Fn, isSigner: !1, isWritable: !1 },
                  { pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1 },
                ],
                programId: this.programId,
                data: e,
              };
            return new Un(r);
          }
          static nonceWithdraw(t) {
            const e = ei(ui.WithdrawNonceAccount, { lamports: t.lamports });
            return new Un({
              keys: [
                { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
                { pubkey: t.toPubkey, isSigner: !1, isWritable: !0 },
                { pubkey: Fn, isSigner: !1, isWritable: !1 },
                { pubkey: jn, isSigner: !1, isWritable: !1 },
                { pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: e,
            });
          }
          static nonceAuthorize(t) {
            const e = ei(ui.AuthorizeNonceAccount, {
              authorized: rn(t.newAuthorizedPubkey.toBuffer()),
            });
            return new Un({
              keys: [
                { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
                { pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: e,
            });
          }
          static allocate(t) {
            let e, r;
            return (
              "basePubkey" in t
                ? ((e = ei(ui.AllocateWithSeed, {
                    base: rn(t.basePubkey.toBuffer()),
                    seed: t.seed,
                    space: t.space,
                    programId: rn(t.programId.toBuffer()),
                  })),
                  (r = [
                    { pubkey: t.accountPubkey, isSigner: !1, isWritable: !0 },
                    { pubkey: t.basePubkey, isSigner: !0, isWritable: !1 },
                  ]))
                : ((e = ei(ui.Allocate, { space: t.space })),
                  (r = [
                    { pubkey: t.accountPubkey, isSigner: !0, isWritable: !0 },
                  ])),
              new Un({ keys: r, programId: this.programId, data: e })
            );
          }
        }
        hi.programId = new ln("11111111111111111111111111111111");
        const li = pn - 300;
        class di {
          constructor() {}
          static getMinNumSignatures(t) {
            return 2 * (Math.ceil(t / di.chunkSize) + 1 + 1);
          }
          static async load(t, r, n, i, o) {
            {
              const e = await t.getMinimumBalanceForRentExemption(o.length),
                s = await t.getAccountInfo(n.publicKey, "confirmed");
              let a = null;
              if (null !== s) {
                if (s.executable)
                  return (
                    console.error(
                      "Program load failed, account is already executable"
                    ),
                    !1
                  );
                s.data.length !== o.length &&
                  ((a = a || new Nn()),
                  a.add(
                    hi.allocate({ accountPubkey: n.publicKey, space: o.length })
                  )),
                  s.owner.equals(i) ||
                    ((a = a || new Nn()),
                    a.add(
                      hi.assign({ accountPubkey: n.publicKey, programId: i })
                    )),
                  s.lamports < e &&
                    ((a = a || new Nn()),
                    a.add(
                      hi.transfer({
                        fromPubkey: r.publicKey,
                        toPubkey: n.publicKey,
                        lamports: e - s.lamports,
                      })
                    ));
              } else
                a = new Nn().add(
                  hi.createAccount({
                    fromPubkey: r.publicKey,
                    newAccountPubkey: n.publicKey,
                    lamports: e > 0 ? e : 1,
                    space: o.length,
                    programId: i,
                  })
                );
              null !== a &&
                (await Qn(t, a, [r, n], { commitment: "confirmed" }));
            }
            const s = Be.w3([
                Be.DH("instruction"),
                Be.DH("offset"),
                Be.DH("bytesLength"),
                Be.DH("bytesLengthPadding"),
                Be.O6(Be.u8("byte"), Be.cY(Be.DH(), -8), "bytes"),
              ]),
              a = di.chunkSize;
            let c = 0,
              u = o,
              h = [];
            for (; u.length > 0; ) {
              const o = u.slice(0, a),
                l = e.Buffer.alloc(a + 16);
              s.encode(
                {
                  instruction: 0,
                  offset: c,
                  bytes: o,
                  bytesLength: 0,
                  bytesLengthPadding: 0,
                },
                l
              );
              const d = new Nn().add({
                keys: [{ pubkey: n.publicKey, isSigner: !0, isWritable: !0 }],
                programId: i,
                data: l,
              });
              if (
                (h.push(Qn(t, d, [r, n], { commitment: "confirmed" })),
                t._rpcEndpoint.includes("solana.com"))
              ) {
                const t = 4;
                await ti(1e3 / t);
              }
              (c += a), (u = u.slice(a));
            }
            await Promise.all(h);
            {
              const o = Be.w3([Be.DH("instruction")]),
                s = e.Buffer.alloc(o.span);
              o.encode({ instruction: 1 }, s);
              const a = new Nn().add({
                  keys: [
                    { pubkey: n.publicKey, isSigner: !0, isWritable: !0 },
                    { pubkey: jn, isSigner: !1, isWritable: !1 },
                  ],
                  programId: i,
                  data: s,
                }),
                c = "processed",
                u = await t.sendTransaction(a, [r, n], {
                  preflightCommitment: c,
                }),
                { context: h, value: l } = await t.confirmTransaction(
                  {
                    signature: u,
                    lastValidBlockHeight: a.lastValidBlockHeight,
                    blockhash: a.recentBlockhash,
                  },
                  c
                );
              if (l.err)
                throw new Error(
                  `Transaction ${u} failed (${JSON.stringify(l)})`
                );
              for (;;) {
                try {
                  if ((await t.getSlot({ commitment: c })) > h.slot) break;
                } catch {}
                await new Promise((t) => setTimeout(t, Math.round(200)));
              }
            }
            return !0;
          }
        }
        di.chunkSize = li;
        const fi = new ln("BPFLoader2111111111111111111111111111111111");
        class pi {
          static getMinNumSignatures(t) {
            return di.getMinNumSignatures(t);
          }
          static load(t, e, r, n, i) {
            return di.load(t, e, r, i, n);
          }
        }
        function gi(t) {
          return t &&
            t.__esModule &&
            Object.prototype.hasOwnProperty.call(t, "default")
            ? t.default
            : t;
        }
        var mi, yi;
        function bi() {
          if (yi) return mi;
          yi = 1;
          var t = Object.prototype.toString,
            e =
              Object.keys ||
              function (t) {
                var e = [];
                for (var r in t) e.push(r);
                return e;
              };
          function r(n, i) {
            var o, s, a, c, u, h, l;
            if (!0 === n) return "true";
            if (!1 === n) return "false";
            switch (typeof n) {
              case "object":
                if (null === n) return null;
                if (n.toJSON && "function" == typeof n.toJSON)
                  return r(n.toJSON(), i);
                if ("[object Array]" === (l = t.call(n))) {
                  for (a = "[", s = n.length - 1, o = 0; o < s; o++)
                    a += r(n[o], !0) + ",";
                  return s > -1 && (a += r(n[o], !0)), a + "]";
                }
                if ("[object Object]" === l) {
                  for (s = (c = e(n).sort()).length, a = "", o = 0; o < s; )
                    void 0 !== (h = r(n[(u = c[o])], !1)) &&
                      (a && (a += ","), (a += JSON.stringify(u) + ":" + h)),
                      o++;
                  return "{" + a + "}";
                }
                return JSON.stringify(n);
              case "function":
              case "undefined":
                return i ? null : void 0;
              case "string":
                return JSON.stringify(n);
              default:
                return isFinite(n) ? n : null;
            }
          }
          return (mi = function (t) {
            var e = r(t, !1);
            if (void 0 !== e) return "" + e;
          });
        }
        var wi = gi(bi());
        function ki(t) {
          let e = 0;
          for (; t > 1; ) (t /= 2), e++;
          return e;
        }
        class vi {
          constructor(t, e, r, n, i) {
            (this.slotsPerEpoch = void 0),
              (this.leaderScheduleSlotOffset = void 0),
              (this.warmup = void 0),
              (this.firstNormalEpoch = void 0),
              (this.firstNormalSlot = void 0),
              (this.slotsPerEpoch = t),
              (this.leaderScheduleSlotOffset = e),
              (this.warmup = r),
              (this.firstNormalEpoch = n),
              (this.firstNormalSlot = i);
          }
          getEpoch(t) {
            return this.getEpochAndSlotIndex(t)[0];
          }
          getEpochAndSlotIndex(t) {
            if (t < this.firstNormalSlot) {
              const r =
                ki(
                  0 === (e = t + 32 + 1)
                    ? 1
                    : (e--,
                      (e |= e >> 1),
                      (e |= e >> 2),
                      (e |= e >> 4),
                      (e |= e >> 8),
                      (e |= e >> 16),
                      1 + (e |= e >> 32))
                ) -
                ki(32) -
                1;
              return [r, t - (this.getSlotsInEpoch(r) - 32)];
            }
            {
              const e = t - this.firstNormalSlot,
                r = Math.floor(e / this.slotsPerEpoch);
              return [this.firstNormalEpoch + r, e % this.slotsPerEpoch];
            }
            var e;
          }
          getFirstSlotInEpoch(t) {
            return t <= this.firstNormalEpoch
              ? 32 * (Math.pow(2, t) - 1)
              : (t - this.firstNormalEpoch) * this.slotsPerEpoch +
                  this.firstNormalSlot;
          }
          getLastSlotInEpoch(t) {
            return this.getFirstSlotInEpoch(t) + this.getSlotsInEpoch(t) - 1;
          }
          getSlotsInEpoch(t) {
            return t < this.firstNormalEpoch
              ? Math.pow(2, t + ki(32))
              : this.slotsPerEpoch;
          }
        }
        var Si = globalThis.fetch;
        class Ii extends ar {
          constructor(t, e, r) {
            super(
              (t) => {
                const r = (function (t, e) {
                  return new or(t, e);
                })(t, {
                  autoconnect: !0,
                  max_reconnects: 5,
                  reconnect: !0,
                  reconnect_interval: 1e3,
                  ...e,
                });
                return (
                  (this.underlyingSocket = "socket" in r ? r.socket : r), r
                );
              },
              t,
              e,
              r
            ),
              (this.underlyingSocket = void 0);
          }
          call(...t) {
            const e = this.underlyingSocket?.readyState;
            return 1 === e
              ? super.call(...t)
              : Promise.reject(
                  new Error(
                    "Tried to call a JSON-RPC method `" +
                      t[0] +
                      "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " +
                      e +
                      ")"
                  )
                );
          }
          notify(...t) {
            const e = this.underlyingSocket?.readyState;
            return 1 === e
              ? super.notify(...t)
              : Promise.reject(
                  new Error(
                    "Tried to send a JSON-RPC notification `" +
                      t[0] +
                      "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " +
                      e +
                      ")"
                  )
                );
          }
        }
        class Ai {
          constructor(t) {
            (this.key = void 0),
              (this.state = void 0),
              (this.key = t.key),
              (this.state = t.state);
          }
          isActive() {
            const t = BigInt("0xffffffffffffffff");
            return this.state.deactivationSlot === t;
          }
          static deserialize(t) {
            const e = (function (t, e) {
                let r;
                try {
                  r = t.layout.decode(e);
                } catch (t) {
                  throw new Error("invalid instruction; " + t);
                }
                if (r.typeIndex !== t.index)
                  throw new Error(
                    `invalid account data; account type mismatch ${r.typeIndex} != ${t.index}`
                  );
                return r;
              })(Ei, t),
              r = t.length - 56;
            Bn(r >= 0, "lookup table is invalid"),
              Bn(r % 32 == 0, "lookup table is invalid");
            const n = r / 32,
              { addresses: i } = Be.w3([Be.O6(vn(), n, "addresses")]).decode(
                t.slice(56)
              );
            return {
              deactivationSlot: e.deactivationSlot,
              lastExtendedSlot: e.lastExtendedSlot,
              lastExtendedSlotStartIndex: e.lastExtendedStartIndex,
              authority:
                0 !== e.authority.length ? new ln(e.authority[0]) : void 0,
              addresses: i.map((t) => new ln(t)),
            };
          }
        }
        const Ei = {
            index: 1,
            layout: Be.w3([
              Be.DH("typeIndex"),
              ai("deactivationSlot"),
              Be.I0("lastExtendedSlot"),
              Be.u8("lastExtendedStartIndex"),
              Be.u8(),
              Be.O6(vn(), Be.cY(Be.u8(), -1), "authority"),
            ]),
          },
          _i = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i,
          Bi = er(Fe(ln), Ze(), (t) => new ln(t)),
          xi = Je([Ze(), je("base64")]),
          Mi = er(Fe(e.Buffer), xi, (t) => e.Buffer.from(t[0], "base64")),
          Pi = 3e4;
        function Ri(t) {
          let e, r;
          if ("string" == typeof t) e = t;
          else if (t) {
            const { commitment: n, ...i } = t;
            (e = n), (r = i);
          }
          return { commitment: e, config: r };
        }
        function Ti(t) {
          return t.map((t) =>
            "memcmp" in t
              ? {
                  ...t,
                  memcmp: {
                    ...t.memcmp,
                    encoding: t.memcmp.encoding ?? "base58",
                  },
                }
              : t
          );
        }
        function Oi(t) {
          return Qe([
            Xe({ jsonrpc: je("2.0"), id: Ze(), result: t }),
            Xe({
              jsonrpc: je("2.0"),
              id: Ze(),
              error: Xe({
                code: tr(),
                message: Ze(),
                data: Ge(qe("any", () => !0)),
              }),
            }),
          ]);
        }
        const Li = Oi(tr());
        function Ci(t) {
          return er(Oi(t), Li, (e) =>
            "error" in e ? e : { ...e, result: Ne(e.result, t) }
          );
        }
        function zi(t) {
          return Ci(Xe({ context: Xe({ slot: Ve() }), value: t }));
        }
        function Ui(t) {
          return Xe({ context: Xe({ slot: Ve() }), value: t });
        }
        function Ni(t, e) {
          return 0 === t
            ? new On({
                header: e.header,
                staticAccountKeys: e.accountKeys.map((t) => new ln(t)),
                recentBlockhash: e.recentBlockhash,
                compiledInstructions: e.instructions.map((t) => ({
                  programIdIndex: t.programIdIndex,
                  accountKeyIndexes: t.accounts,
                  data: ae().decode(t.data),
                })),
                addressTableLookups: e.addressTableLookups,
              })
            : new Tn(e);
        }
        const Wi = Xe({
            foundation: Ve(),
            foundationTerm: Ve(),
            initial: Ve(),
            taper: Ve(),
            terminal: Ve(),
          }),
          Ki = Ci(
            De(
              $e(
                Xe({
                  epoch: Ve(),
                  effectiveSlot: Ve(),
                  amount: Ve(),
                  postBalance: Ve(),
                  commission: Ge($e(Ve())),
                })
              )
            )
          ),
          qi = De(Xe({ slot: Ve(), prioritizationFee: Ve() })),
          Di = Xe({
            total: Ve(),
            validator: Ve(),
            foundation: Ve(),
            epoch: Ve(),
          }),
          Hi = Xe({
            epoch: Ve(),
            slotIndex: Ve(),
            slotsInEpoch: Ve(),
            absoluteSlot: Ve(),
            blockHeight: Ge(Ve()),
            transactionCount: Ge(Ve()),
          }),
          Fi = Xe({
            slotsPerEpoch: Ve(),
            leaderScheduleSlotOffset: Ve(),
            warmup: He(),
            firstNormalEpoch: Ve(),
            firstNormalSlot: Ve(),
          }),
          ji = Ye(Ze(), De(Ve())),
          $i = $e(Qe([Xe({}), Ze()])),
          Vi = Xe({ err: $i }),
          Gi = je("receivedSignature"),
          Yi = Xe({ "solana-core": Ze(), "feature-set": Ge(Ve()) }),
          Zi = Xe({ program: Ze(), programId: Bi, parsed: tr() }),
          Ji = Xe({ programId: Bi, accounts: De(Bi), data: Ze() }),
          Xi = zi(
            Xe({
              err: $e(Qe([Xe({}), Ze()])),
              logs: $e(De(Ze())),
              accounts: Ge(
                $e(
                  De(
                    $e(
                      Xe({
                        executable: He(),
                        owner: Ze(),
                        lamports: Ve(),
                        data: De(Ze()),
                        rentEpoch: Ge(Ve()),
                      })
                    )
                  )
                )
              ),
              unitsConsumed: Ge(Ve()),
              returnData: Ge(
                $e(Xe({ programId: Ze(), data: Je([Ze(), je("base64")]) }))
              ),
              innerInstructions: Ge(
                $e(De(Xe({ index: Ve(), instructions: De(Qe([Zi, Ji])) })))
              ),
            })
          ),
          Qi = zi(
            Xe({
              byIdentity: Ye(Ze(), De(Ve())),
              range: Xe({ firstSlot: Ve(), lastSlot: Ve() }),
            })
          ),
          to = Ci(Wi),
          eo = Ci(Di),
          ro = Ci(qi),
          no = Ci(Hi),
          io = Ci(Fi),
          oo = Ci(ji),
          so = Ci(Ve()),
          ao = zi(
            Xe({
              total: Ve(),
              circulating: Ve(),
              nonCirculating: Ve(),
              nonCirculatingAccounts: De(Bi),
            })
          ),
          co = Xe({
            amount: Ze(),
            uiAmount: $e(Ve()),
            decimals: Ve(),
            uiAmountString: Ge(Ze()),
          }),
          uo = zi(
            De(
              Xe({
                address: Bi,
                amount: Ze(),
                uiAmount: $e(Ve()),
                decimals: Ve(),
                uiAmountString: Ge(Ze()),
              })
            )
          ),
          ho = zi(
            De(
              Xe({
                pubkey: Bi,
                account: Xe({
                  executable: He(),
                  owner: Bi,
                  lamports: Ve(),
                  data: Mi,
                  rentEpoch: Ve(),
                }),
              })
            )
          ),
          lo = Xe({ program: Ze(), parsed: tr(), space: Ve() }),
          fo = zi(
            De(
              Xe({
                pubkey: Bi,
                account: Xe({
                  executable: He(),
                  owner: Bi,
                  lamports: Ve(),
                  data: lo,
                  rentEpoch: Ve(),
                }),
              })
            )
          ),
          po = zi(De(Xe({ lamports: Ve(), address: Bi }))),
          go = Xe({
            executable: He(),
            owner: Bi,
            lamports: Ve(),
            data: Mi,
            rentEpoch: Ve(),
          }),
          mo = Xe({ pubkey: Bi, account: go }),
          yo = er(Qe([Fe(e.Buffer), lo]), Qe([xi, lo]), (t) =>
            Array.isArray(t) ? Ne(t, Mi) : t
          ),
          bo = Xe({
            executable: He(),
            owner: Bi,
            lamports: Ve(),
            data: yo,
            rentEpoch: Ve(),
          }),
          wo = Xe({ pubkey: Bi, account: bo }),
          ko = Xe({
            state: Qe([
              je("active"),
              je("inactive"),
              je("activating"),
              je("deactivating"),
            ]),
            active: Ve(),
            inactive: Ve(),
          }),
          vo = Ci(
            De(
              Xe({
                signature: Ze(),
                slot: Ve(),
                err: $i,
                memo: $e(Ze()),
                blockTime: Ge($e(Ve())),
              })
            )
          ),
          So = Ci(
            De(
              Xe({
                signature: Ze(),
                slot: Ve(),
                err: $i,
                memo: $e(Ze()),
                blockTime: Ge($e(Ve())),
              })
            )
          ),
          Io = Xe({ subscription: Ve(), result: Ui(go) }),
          Ao = Xe({ pubkey: Bi, account: go }),
          Eo = Xe({ subscription: Ve(), result: Ui(Ao) }),
          _o = Xe({ parent: Ve(), slot: Ve(), root: Ve() }),
          Bo = Xe({ subscription: Ve(), result: _o }),
          xo = Qe([
            Xe({
              type: Qe([
                je("firstShredReceived"),
                je("completed"),
                je("optimisticConfirmation"),
                je("root"),
              ]),
              slot: Ve(),
              timestamp: Ve(),
            }),
            Xe({
              type: je("createdBank"),
              parent: Ve(),
              slot: Ve(),
              timestamp: Ve(),
            }),
            Xe({
              type: je("frozen"),
              slot: Ve(),
              timestamp: Ve(),
              stats: Xe({
                numTransactionEntries: Ve(),
                numSuccessfulTransactions: Ve(),
                numFailedTransactions: Ve(),
                maxTransactionsPerEntry: Ve(),
              }),
            }),
            Xe({ type: je("dead"), slot: Ve(), timestamp: Ve(), err: Ze() }),
          ]),
          Mo = Xe({ subscription: Ve(), result: xo }),
          Po = Xe({ subscription: Ve(), result: Ui(Qe([Vi, Gi])) }),
          Ro = Xe({ subscription: Ve(), result: Ve() }),
          To = Xe({
            pubkey: Ze(),
            gossip: $e(Ze()),
            tpu: $e(Ze()),
            rpc: $e(Ze()),
            version: $e(Ze()),
          }),
          Oo = Xe({
            votePubkey: Ze(),
            nodePubkey: Ze(),
            activatedStake: Ve(),
            epochVoteAccount: He(),
            epochCredits: De(Je([Ve(), Ve(), Ve()])),
            commission: Ve(),
            lastVote: Ve(),
            rootSlot: $e(Ve()),
          }),
          Lo = Ci(Xe({ current: De(Oo), delinquent: De(Oo) })),
          Co = Qe([je("processed"), je("confirmed"), je("finalized")]),
          zo = Xe({
            slot: Ve(),
            confirmations: $e(Ve()),
            err: $i,
            confirmationStatus: Ge(Co),
          }),
          Uo = zi(De($e(zo))),
          No = Ci(Ve()),
          Wo = Xe({
            accountKey: Bi,
            writableIndexes: De(Ve()),
            readonlyIndexes: De(Ve()),
          }),
          Ko = Xe({
            signatures: De(Ze()),
            message: Xe({
              accountKeys: De(Ze()),
              header: Xe({
                numRequiredSignatures: Ve(),
                numReadonlySignedAccounts: Ve(),
                numReadonlyUnsignedAccounts: Ve(),
              }),
              instructions: De(
                Xe({ accounts: De(Ve()), data: Ze(), programIdIndex: Ve() })
              ),
              recentBlockhash: Ze(),
              addressTableLookups: Ge(De(Wo)),
            }),
          }),
          qo = Xe({
            pubkey: Bi,
            signer: He(),
            writable: He(),
            source: Ge(Qe([je("transaction"), je("lookupTable")])),
          }),
          Do = Xe({ accountKeys: De(qo), signatures: De(Ze()) }),
          Ho = Xe({ parsed: tr(), program: Ze(), programId: Bi }),
          Fo = Xe({ accounts: De(Bi), data: Ze(), programId: Bi }),
          jo = er(
            Qe([Fo, Ho]),
            Qe([
              Xe({ parsed: tr(), program: Ze(), programId: Ze() }),
              Xe({ accounts: De(Ze()), data: Ze(), programId: Ze() }),
            ]),
            (t) => Ne(t, "accounts" in t ? Fo : Ho)
          ),
          $o = Xe({
            signatures: De(Ze()),
            message: Xe({
              accountKeys: De(qo),
              instructions: De(jo),
              recentBlockhash: Ze(),
              addressTableLookups: Ge($e(De(Wo))),
            }),
          }),
          Vo = Xe({
            accountIndex: Ve(),
            mint: Ze(),
            owner: Ge(Ze()),
            programId: Ge(Ze()),
            uiTokenAmount: co,
          }),
          Go = Xe({ writable: De(Bi), readonly: De(Bi) }),
          Yo = Xe({
            err: $i,
            fee: Ve(),
            innerInstructions: Ge(
              $e(
                De(
                  Xe({
                    index: Ve(),
                    instructions: De(
                      Xe({
                        accounts: De(Ve()),
                        data: Ze(),
                        programIdIndex: Ve(),
                      })
                    ),
                  })
                )
              )
            ),
            preBalances: De(Ve()),
            postBalances: De(Ve()),
            logMessages: Ge($e(De(Ze()))),
            preTokenBalances: Ge($e(De(Vo))),
            postTokenBalances: Ge($e(De(Vo))),
            loadedAddresses: Ge(Go),
            computeUnitsConsumed: Ge(Ve()),
          }),
          Zo = Xe({
            err: $i,
            fee: Ve(),
            innerInstructions: Ge(
              $e(De(Xe({ index: Ve(), instructions: De(jo) })))
            ),
            preBalances: De(Ve()),
            postBalances: De(Ve()),
            logMessages: Ge($e(De(Ze()))),
            preTokenBalances: Ge($e(De(Vo))),
            postTokenBalances: Ge($e(De(Vo))),
            loadedAddresses: Ge(Go),
            computeUnitsConsumed: Ge(Ve()),
          }),
          Jo = Qe([je(0), je("legacy")]),
          Xo = Xe({
            pubkey: Ze(),
            lamports: Ve(),
            postBalance: $e(Ve()),
            rewardType: $e(Ze()),
            commission: Ge($e(Ve())),
          }),
          Qo = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                transactions: De(
                  Xe({ transaction: Ko, meta: $e(Yo), version: Ge(Jo) })
                ),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
                blockHeight: $e(Ve()),
              })
            )
          ),
          ts = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
                blockHeight: $e(Ve()),
              })
            )
          ),
          es = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                transactions: De(
                  Xe({ transaction: Do, meta: $e(Yo), version: Ge(Jo) })
                ),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
                blockHeight: $e(Ve()),
              })
            )
          ),
          rs = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                transactions: De(
                  Xe({ transaction: $o, meta: $e(Zo), version: Ge(Jo) })
                ),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
                blockHeight: $e(Ve()),
              })
            )
          ),
          ns = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                transactions: De(
                  Xe({ transaction: Do, meta: $e(Zo), version: Ge(Jo) })
                ),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
                blockHeight: $e(Ve()),
              })
            )
          ),
          is = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
                blockHeight: $e(Ve()),
              })
            )
          ),
          os = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                transactions: De(Xe({ transaction: Ko, meta: $e(Yo) })),
                rewards: Ge(De(Xo)),
                blockTime: $e(Ve()),
              })
            )
          ),
          ss = Ci(
            $e(
              Xe({
                blockhash: Ze(),
                previousBlockhash: Ze(),
                parentSlot: Ve(),
                signatures: De(Ze()),
                blockTime: $e(Ve()),
              })
            )
          ),
          as = Ci(
            $e(
              Xe({
                slot: Ve(),
                meta: $e(Yo),
                blockTime: Ge($e(Ve())),
                transaction: Ko,
                version: Ge(Jo),
              })
            )
          ),
          cs = Ci(
            $e(
              Xe({
                slot: Ve(),
                transaction: $o,
                meta: $e(Zo),
                blockTime: Ge($e(Ve())),
                version: Ge(Jo),
              })
            )
          ),
          us = zi(
            Xe({
              blockhash: Ze(),
              feeCalculator: Xe({ lamportsPerSignature: Ve() }),
            })
          ),
          hs = zi(Xe({ blockhash: Ze(), lastValidBlockHeight: Ve() })),
          ls = zi(He()),
          ds = Ci(
            De(
              Xe({
                slot: Ve(),
                numTransactions: Ve(),
                numSlots: Ve(),
                samplePeriodSecs: Ve(),
              })
            )
          ),
          fs = zi(
            $e(Xe({ feeCalculator: Xe({ lamportsPerSignature: Ve() }) }))
          ),
          ps = Ci(Ze()),
          gs = Ci(Ze()),
          ms = Xe({ err: $i, logs: De(Ze()), signature: Ze() }),
          ys = Xe({ result: Ui(ms), subscription: Ve() }),
          bs = { "solana-client": "js/1.0.0-maintenance" };
        class ws {
          constructor(t, e) {
            let r, n, i, o, s, a;
            var c;
            (this._commitment = void 0),
              (this._confirmTransactionInitialTimeout = void 0),
              (this._rpcEndpoint = void 0),
              (this._rpcWsEndpoint = void 0),
              (this._rpcClient = void 0),
              (this._rpcRequest = void 0),
              (this._rpcBatchRequest = void 0),
              (this._rpcWebSocket = void 0),
              (this._rpcWebSocketConnected = !1),
              (this._rpcWebSocketHeartbeat = null),
              (this._rpcWebSocketIdleTimeout = null),
              (this._rpcWebSocketGeneration = 0),
              (this._disableBlockhashCaching = !1),
              (this._pollingBlockhash = !1),
              (this._blockhashInfo = {
                latestBlockhash: null,
                lastFetch: 0,
                transactionSignatures: [],
                simulatedSignatures: [],
              }),
              (this._nextClientSubscriptionId = 0),
              (this._subscriptionDisposeFunctionsByClientSubscriptionId = {}),
              (this._subscriptionHashByClientSubscriptionId = {}),
              (this._subscriptionStateChangeCallbacksByHash = {}),
              (this._subscriptionCallbacksByServerSubscriptionId = {}),
              (this._subscriptionsByHash = {}),
              (this._subscriptionsAutoDisposedByRpc = new Set()),
              (this.getBlockHeight = (() => {
                const t = {};
                return async (e) => {
                  const { commitment: r, config: n } = Ri(e),
                    i = this._buildArgs([], r, void 0, n),
                    o = wi(i);
                  return (
                    (t[o] =
                      t[o] ??
                      (async () => {
                        try {
                          const t = Ne(
                            await this._rpcRequest("getBlockHeight", i),
                            Ci(Ve())
                          );
                          if ("error" in t)
                            throw new Xn(
                              t.error,
                              "failed to get block height information"
                            );
                          return t.result;
                        } finally {
                          delete t[o];
                        }
                      })()),
                    await t[o]
                  );
                };
              })()),
              e && "string" == typeof e
                ? (this._commitment = e)
                : e &&
                  ((this._commitment = e.commitment),
                  (this._confirmTransactionInitialTimeout =
                    e.confirmTransactionInitialTimeout),
                  (r = e.wsEndpoint),
                  (n = e.httpHeaders),
                  (i = e.fetch),
                  (o = e.fetchMiddleware),
                  (s = e.disableRetryOnRateLimit),
                  (a = e.httpAgent)),
              (this._rpcEndpoint = (function (t) {
                if (!1 === /^https?:/.test(t))
                  throw new TypeError(
                    "Endpoint URL must start with `http:` or `https:`."
                  );
                return t;
              })(t)),
              (this._rpcWsEndpoint =
                r ||
                (function (t) {
                  const e = t.match(_i);
                  if (null == e)
                    throw TypeError(`Failed to validate endpoint URL \`${t}\``);
                  const [r, n, i, o] = e,
                    s = t.startsWith("https:") ? "wss:" : "ws:",
                    a = null == i ? null : parseInt(i.slice(1), 10);
                  return `${s}//${n}${null == a ? "" : `:${a + 1}`}${o}`;
                })(t)),
              (this._rpcClient = (function (t, e, r, n, i, o) {
                const s = r || Si;
                let a;
                return (
                  null != o &&
                    console.warn(
                      "You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments."
                    ),
                  n &&
                    (a = async (t, e) => {
                      const r = await new Promise((r, i) => {
                        try {
                          n(t, e, (t, e) => r([t, e]));
                        } catch (t) {
                          i(t);
                        }
                      });
                      return await s(...r);
                    }),
                  new (nr())(async (r, n) => {
                    const o = {
                      method: "POST",
                      body: r,
                      agent: void 0,
                      headers: Object.assign(
                        { "Content-Type": "application/json" },
                        e || {},
                        bs
                      ),
                    };
                    try {
                      let e,
                        r = 5,
                        c = 500;
                      for (
                        ;
                        (e = a ? await a(t, o) : await s(t, o)),
                          429 === e.status && !0 !== i && ((r -= 1), 0 !== r);

                      )
                        console.error(
                          `Server responded with ${e.status} ${e.statusText}.  Retrying after ${c}ms delay...`
                        ),
                          await ti(c),
                          (c *= 2);
                      const u = await e.text();
                      e.ok
                        ? n(null, u)
                        : n(new Error(`${e.status} ${e.statusText}: ${u}`));
                    } catch (t) {
                      t instanceof Error && n(t);
                    }
                  }, {})
                );
              })(t, n, i, o, s, a)),
              (this._rpcRequest =
                ((c = this._rpcClient),
                (t, e) =>
                  new Promise((r, n) => {
                    c.request(t, e, (t, e) => {
                      t ? n(t) : r(e);
                    });
                  }))),
              (this._rpcBatchRequest = (function (t) {
                return (e) =>
                  new Promise((r, n) => {
                    0 === e.length && r([]);
                    const i = e.map((e) => t.request(e.methodName, e.args));
                    t.request(i, (t, e) => {
                      t ? n(t) : r(e);
                    });
                  });
              })(this._rpcClient)),
              (this._rpcWebSocket = new Ii(this._rpcWsEndpoint, {
                autoconnect: !1,
                max_reconnects: 1 / 0,
              })),
              this._rpcWebSocket.on("open", this._wsOnOpen.bind(this)),
              this._rpcWebSocket.on("error", this._wsOnError.bind(this)),
              this._rpcWebSocket.on("close", this._wsOnClose.bind(this)),
              this._rpcWebSocket.on(
                "accountNotification",
                this._wsOnAccountNotification.bind(this)
              ),
              this._rpcWebSocket.on(
                "programNotification",
                this._wsOnProgramAccountNotification.bind(this)
              ),
              this._rpcWebSocket.on(
                "slotNotification",
                this._wsOnSlotNotification.bind(this)
              ),
              this._rpcWebSocket.on(
                "slotsUpdatesNotification",
                this._wsOnSlotUpdatesNotification.bind(this)
              ),
              this._rpcWebSocket.on(
                "signatureNotification",
                this._wsOnSignatureNotification.bind(this)
              ),
              this._rpcWebSocket.on(
                "rootNotification",
                this._wsOnRootNotification.bind(this)
              ),
              this._rpcWebSocket.on(
                "logsNotification",
                this._wsOnLogsNotification.bind(this)
              );
          }
          get commitment() {
            return this._commitment;
          }
          get rpcEndpoint() {
            return this._rpcEndpoint;
          }
          async getBalanceAndContext(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgs([t.toBase58()], r, void 0, n),
              o = Ne(await this._rpcRequest("getBalance", i), zi(Ve()));
            if ("error" in o)
              throw new Xn(
                o.error,
                `failed to get balance for ${t.toBase58()}`
              );
            return o.result;
          }
          async getBalance(t, e) {
            return await this.getBalanceAndContext(t, e)
              .then((t) => t.value)
              .catch((e) => {
                throw new Error(
                  "failed to get balance of account " + t.toBase58() + ": " + e
                );
              });
          }
          async getBlockTime(t) {
            const e = Ne(
              await this._rpcRequest("getBlockTime", [t]),
              Ci($e(Ve()))
            );
            if ("error" in e)
              throw new Xn(e.error, `failed to get block time for slot ${t}`);
            return e.result;
          }
          async getMinimumLedgerSlot() {
            const t = Ne(
              await this._rpcRequest("minimumLedgerSlot", []),
              Ci(Ve())
            );
            if ("error" in t)
              throw new Xn(t.error, "failed to get minimum ledger slot");
            return t.result;
          }
          async getFirstAvailableBlock() {
            const t = Ne(
              await this._rpcRequest("getFirstAvailableBlock", []),
              so
            );
            if ("error" in t)
              throw new Xn(t.error, "failed to get first available block");
            return t.result;
          }
          async getSupply(t) {
            let e = {};
            e =
              "string" == typeof t
                ? { commitment: t }
                : t
                ? { ...t, commitment: (t && t.commitment) || this.commitment }
                : { commitment: this.commitment };
            const r = Ne(await this._rpcRequest("getSupply", [e]), ao);
            if ("error" in r) throw new Xn(r.error, "failed to get supply");
            return r.result;
          }
          async getTokenSupply(t, e) {
            const r = this._buildArgs([t.toBase58()], e),
              n = Ne(await this._rpcRequest("getTokenSupply", r), zi(co));
            if ("error" in n)
              throw new Xn(n.error, "failed to get token supply");
            return n.result;
          }
          async getTokenAccountBalance(t, e) {
            const r = this._buildArgs([t.toBase58()], e),
              n = Ne(
                await this._rpcRequest("getTokenAccountBalance", r),
                zi(co)
              );
            if ("error" in n)
              throw new Xn(n.error, "failed to get token account balance");
            return n.result;
          }
          async getTokenAccountsByOwner(t, e, r) {
            const { commitment: n, config: i } = Ri(r);
            let o = [t.toBase58()];
            "mint" in e
              ? o.push({ mint: e.mint.toBase58() })
              : o.push({ programId: e.programId.toBase58() });
            const s = this._buildArgs(o, n, "base64", i),
              a = Ne(await this._rpcRequest("getTokenAccountsByOwner", s), ho);
            if ("error" in a)
              throw new Xn(
                a.error,
                `failed to get token accounts owned by account ${t.toBase58()}`
              );
            return a.result;
          }
          async getParsedTokenAccountsByOwner(t, e, r) {
            let n = [t.toBase58()];
            "mint" in e
              ? n.push({ mint: e.mint.toBase58() })
              : n.push({ programId: e.programId.toBase58() });
            const i = this._buildArgs(n, r, "jsonParsed"),
              o = Ne(await this._rpcRequest("getTokenAccountsByOwner", i), fo);
            if ("error" in o)
              throw new Xn(
                o.error,
                `failed to get token accounts owned by account ${t.toBase58()}`
              );
            return o.result;
          }
          async getLargestAccounts(t) {
            const e = {
                ...t,
                commitment: (t && t.commitment) || this.commitment,
              },
              r = e.filter || e.commitment ? [e] : [],
              n = Ne(await this._rpcRequest("getLargestAccounts", r), po);
            if ("error" in n)
              throw new Xn(n.error, "failed to get largest accounts");
            return n.result;
          }
          async getTokenLargestAccounts(t, e) {
            const r = this._buildArgs([t.toBase58()], e),
              n = Ne(await this._rpcRequest("getTokenLargestAccounts", r), uo);
            if ("error" in n)
              throw new Xn(n.error, "failed to get token largest accounts");
            return n.result;
          }
          async getAccountInfoAndContext(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgs([t.toBase58()], r, "base64", n),
              o = Ne(await this._rpcRequest("getAccountInfo", i), zi($e(go)));
            if ("error" in o)
              throw new Xn(
                o.error,
                `failed to get info about account ${t.toBase58()}`
              );
            return o.result;
          }
          async getParsedAccountInfo(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgs([t.toBase58()], r, "jsonParsed", n),
              o = Ne(await this._rpcRequest("getAccountInfo", i), zi($e(bo)));
            if ("error" in o)
              throw new Xn(
                o.error,
                `failed to get info about account ${t.toBase58()}`
              );
            return o.result;
          }
          async getAccountInfo(t, e) {
            try {
              return (await this.getAccountInfoAndContext(t, e)).value;
            } catch (e) {
              throw new Error(
                "failed to get info about account " + t.toBase58() + ": " + e
              );
            }
          }
          async getMultipleParsedAccounts(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = t.map((t) => t.toBase58()),
              o = this._buildArgs([i], r, "jsonParsed", n),
              s = Ne(
                await this._rpcRequest("getMultipleAccounts", o),
                zi(De($e(bo)))
              );
            if ("error" in s)
              throw new Xn(s.error, `failed to get info for accounts ${i}`);
            return s.result;
          }
          async getMultipleAccountsInfoAndContext(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = t.map((t) => t.toBase58()),
              o = this._buildArgs([i], r, "base64", n),
              s = Ne(
                await this._rpcRequest("getMultipleAccounts", o),
                zi(De($e(go)))
              );
            if ("error" in s)
              throw new Xn(s.error, `failed to get info for accounts ${i}`);
            return s.result;
          }
          async getMultipleAccountsInfo(t, e) {
            return (await this.getMultipleAccountsInfoAndContext(t, e)).value;
          }
          async getStakeActivation(t, e, r) {
            const { commitment: n, config: i } = Ri(e),
              o = this._buildArgs([t.toBase58()], n, void 0, {
                ...i,
                epoch: null != r ? r : i?.epoch,
              }),
              s = Ne(await this._rpcRequest("getStakeActivation", o), Ci(ko));
            if ("error" in s)
              throw new Xn(
                s.error,
                `failed to get Stake Activation ${t.toBase58()}`
              );
            return s.result;
          }
          async getProgramAccounts(t, e) {
            const { commitment: r, config: n } = Ri(e),
              { encoding: i, ...o } = n || {},
              s = this._buildArgs([t.toBase58()], r, i || "base64", {
                ...o,
                ...(o.filters ? { filters: Ti(o.filters) } : null),
              }),
              a = await this._rpcRequest("getProgramAccounts", s),
              c = De(mo),
              u = !0 === o.withContext ? Ne(a, zi(c)) : Ne(a, Ci(c));
            if ("error" in u)
              throw new Xn(
                u.error,
                `failed to get accounts owned by program ${t.toBase58()}`
              );
            return u.result;
          }
          async getParsedProgramAccounts(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgs([t.toBase58()], r, "jsonParsed", n),
              o = Ne(
                await this._rpcRequest("getProgramAccounts", i),
                Ci(De(wo))
              );
            if ("error" in o)
              throw new Xn(
                o.error,
                `failed to get accounts owned by program ${t.toBase58()}`
              );
            return o.result;
          }
          async confirmTransaction(t, e) {
            let r, n;
            if ("string" == typeof t) r = t;
            else {
              const e = t;
              if (e.abortSignal?.aborted)
                return Promise.reject(e.abortSignal.reason);
              r = e.signature;
            }
            try {
              n = ae().decode(r);
            } catch (t) {
              throw new Error("signature must be base58 encoded: " + r);
            }
            return (
              Bn(64 === n.length, "signature has invalid length"),
              "string" == typeof t
                ? await this.confirmTransactionUsingLegacyTimeoutStrategy({
                    commitment: e || this.commitment,
                    signature: r,
                  })
                : "lastValidBlockHeight" in t
                ? await this.confirmTransactionUsingBlockHeightExceedanceStrategy(
                    { commitment: e || this.commitment, strategy: t }
                  )
                : await this.confirmTransactionUsingDurableNonceStrategy({
                    commitment: e || this.commitment,
                    strategy: t,
                  })
            );
          }
          getCancellationPromise(t) {
            return new Promise((e, r) => {
              null != t &&
                (t.aborted
                  ? r(t.reason)
                  : t.addEventListener("abort", () => {
                      r(t.reason);
                    }));
            });
          }
          getTransactionConfirmationPromise({ commitment: t, signature: e }) {
            let r,
              n,
              i = !1;
            return {
              abortConfirmation: () => {
                n && (n(), (n = void 0)),
                  null != r && (this.removeSignatureListener(r), (r = void 0));
              },
              confirmationPromise: new Promise((o, s) => {
                try {
                  r = this.onSignature(
                    e,
                    (t, e) => {
                      r = void 0;
                      const n = { context: e, value: t };
                      o({ __type: Cn.PROCESSED, response: n });
                    },
                    t
                  );
                  const a = new Promise((t) => {
                    null == r
                      ? t()
                      : (n = this._onSubscriptionStateChange(r, (e) => {
                          "subscribed" === e && t();
                        }));
                  });
                  (async () => {
                    if ((await a, i)) return;
                    const r = await this.getSignatureStatus(e);
                    if (i) return;
                    if (null == r) return;
                    const { context: n, value: c } = r;
                    if (null != c)
                      if (c?.err) s(c.err);
                      else {
                        switch (t) {
                          case "confirmed":
                          case "single":
                          case "singleGossip":
                            if ("processed" === c.confirmationStatus) return;
                            break;
                          case "finalized":
                          case "max":
                          case "root":
                            if (
                              "processed" === c.confirmationStatus ||
                              "confirmed" === c.confirmationStatus
                            )
                              return;
                        }
                        (i = !0),
                          o({
                            __type: Cn.PROCESSED,
                            response: { context: n, value: c },
                          });
                      }
                  })();
                } catch (t) {
                  s(t);
                }
              }),
            };
          }
          async confirmTransactionUsingBlockHeightExceedanceStrategy({
            commitment: t,
            strategy: { abortSignal: e, lastValidBlockHeight: r, signature: n },
          }) {
            let i = !1;
            const o = new Promise((e) => {
                const n = async () => {
                  try {
                    return await this.getBlockHeight(t);
                  } catch (t) {
                    return -1;
                  }
                };
                (async () => {
                  let t = await n();
                  if (!i) {
                    for (; t <= r; ) {
                      if ((await ti(1e3), i)) return;
                      if (((t = await n()), i)) return;
                    }
                    e({ __type: Cn.BLOCKHEIGHT_EXCEEDED });
                  }
                })();
              }),
              { abortConfirmation: s, confirmationPromise: a } =
                this.getTransactionConfirmationPromise({
                  commitment: t,
                  signature: n,
                }),
              c = this.getCancellationPromise(e);
            let u;
            try {
              const t = await Promise.race([c, a, o]);
              if (t.__type !== Cn.PROCESSED) throw new yn(n);
              u = t.response;
            } finally {
              (i = !0), s();
            }
            return u;
          }
          async confirmTransactionUsingDurableNonceStrategy({
            commitment: t,
            strategy: {
              abortSignal: e,
              minContextSlot: r,
              nonceAccountPubkey: n,
              nonceValue: i,
              signature: o,
            },
          }) {
            let s = !1;
            const a = new Promise((e) => {
                let o = i,
                  a = null;
                const c = async () => {
                  try {
                    const { context: e, value: i } =
                      await this.getNonceAndContext(n, {
                        commitment: t,
                        minContextSlot: r,
                      });
                    return (a = e.slot), i?.nonce;
                  } catch (t) {
                    return o;
                  }
                };
                (async () => {
                  if (((o = await c()), !s))
                    for (;;) {
                      if (i !== o)
                        return void e({
                          __type: Cn.NONCE_INVALID,
                          slotInWhichNonceDidAdvance: a,
                        });
                      if ((await ti(2e3), s)) return;
                      if (((o = await c()), s)) return;
                    }
                })();
              }),
              { abortConfirmation: c, confirmationPromise: u } =
                this.getTransactionConfirmationPromise({
                  commitment: t,
                  signature: o,
                }),
              h = this.getCancellationPromise(e);
            let l;
            try {
              const e = await Promise.race([h, u, a]);
              if (e.__type === Cn.PROCESSED) l = e.response;
              else {
                let n;
                for (;;) {
                  const t = await this.getSignatureStatus(o);
                  if (null == t) break;
                  if (!(t.context.slot < (e.slotInWhichNonceDidAdvance ?? r))) {
                    n = t;
                    break;
                  }
                  await ti(400);
                }
                if (!n?.value) throw new wn(o);
                {
                  const e = t || "finalized",
                    { confirmationStatus: r } = n.value;
                  switch (e) {
                    case "processed":
                    case "recent":
                      if (
                        "processed" !== r &&
                        "confirmed" !== r &&
                        "finalized" !== r
                      )
                        throw new wn(o);
                      break;
                    case "confirmed":
                    case "single":
                    case "singleGossip":
                      if ("confirmed" !== r && "finalized" !== r)
                        throw new wn(o);
                      break;
                    case "finalized":
                    case "max":
                    case "root":
                      if ("finalized" !== r) throw new wn(o);
                  }
                  l = { context: n.context, value: { err: n.value.err } };
                }
              }
            } finally {
              (s = !0), c();
            }
            return l;
          }
          async confirmTransactionUsingLegacyTimeoutStrategy({
            commitment: t,
            signature: e,
          }) {
            let r;
            const n = new Promise((e) => {
                let n = this._confirmTransactionInitialTimeout || 6e4;
                switch (t) {
                  case "processed":
                  case "recent":
                  case "single":
                  case "confirmed":
                  case "singleGossip":
                    n = this._confirmTransactionInitialTimeout || 3e4;
                }
                r = setTimeout(
                  () => e({ __type: Cn.TIMED_OUT, timeoutMs: n }),
                  n
                );
              }),
              { abortConfirmation: i, confirmationPromise: o } =
                this.getTransactionConfirmationPromise({
                  commitment: t,
                  signature: e,
                });
            let s;
            try {
              const t = await Promise.race([o, n]);
              if (t.__type !== Cn.PROCESSED) throw new bn(e, t.timeoutMs / 1e3);
              s = t.response;
            } finally {
              clearTimeout(r), i();
            }
            return s;
          }
          async getClusterNodes() {
            const t = Ne(
              await this._rpcRequest("getClusterNodes", []),
              Ci(De(To))
            );
            if ("error" in t)
              throw new Xn(t.error, "failed to get cluster nodes");
            return t.result;
          }
          async getVoteAccounts(t) {
            const e = this._buildArgs([], t),
              r = Ne(await this._rpcRequest("getVoteAccounts", e), Lo);
            if ("error" in r)
              throw new Xn(r.error, "failed to get vote accounts");
            return r.result;
          }
          async getSlot(t) {
            const { commitment: e, config: r } = Ri(t),
              n = this._buildArgs([], e, void 0, r),
              i = Ne(await this._rpcRequest("getSlot", n), Ci(Ve()));
            if ("error" in i) throw new Xn(i.error, "failed to get slot");
            return i.result;
          }
          async getSlotLeader(t) {
            const { commitment: e, config: r } = Ri(t),
              n = this._buildArgs([], e, void 0, r),
              i = Ne(await this._rpcRequest("getSlotLeader", n), Ci(Ze()));
            if ("error" in i)
              throw new Xn(i.error, "failed to get slot leader");
            return i.result;
          }
          async getSlotLeaders(t, e) {
            const r = [t, e],
              n = Ne(await this._rpcRequest("getSlotLeaders", r), Ci(De(Bi)));
            if ("error" in n)
              throw new Xn(n.error, "failed to get slot leaders");
            return n.result;
          }
          async getSignatureStatus(t, e) {
            const { context: r, value: n } = await this.getSignatureStatuses(
              [t],
              e
            );
            return Bn(1 === n.length), { context: r, value: n[0] };
          }
          async getSignatureStatuses(t, e) {
            const r = [t];
            e && r.push(e);
            const n = Ne(await this._rpcRequest("getSignatureStatuses", r), Uo);
            if ("error" in n)
              throw new Xn(n.error, "failed to get signature status");
            return n.result;
          }
          async getTransactionCount(t) {
            const { commitment: e, config: r } = Ri(t),
              n = this._buildArgs([], e, void 0, r),
              i = Ne(
                await this._rpcRequest("getTransactionCount", n),
                Ci(Ve())
              );
            if ("error" in i)
              throw new Xn(i.error, "failed to get transaction count");
            return i.result;
          }
          async getTotalSupply(t) {
            return (
              await this.getSupply({
                commitment: t,
                excludeNonCirculatingAccountsList: !0,
              })
            ).value.total;
          }
          async getInflationGovernor(t) {
            const e = this._buildArgs([], t),
              r = Ne(await this._rpcRequest("getInflationGovernor", e), to);
            if ("error" in r) throw new Xn(r.error, "failed to get inflation");
            return r.result;
          }
          async getInflationReward(t, e, r) {
            const { commitment: n, config: i } = Ri(r),
              o = this._buildArgs([t.map((t) => t.toBase58())], n, void 0, {
                ...i,
                epoch: null != e ? e : i?.epoch,
              }),
              s = Ne(await this._rpcRequest("getInflationReward", o), Ki);
            if ("error" in s)
              throw new Xn(s.error, "failed to get inflation reward");
            return s.result;
          }
          async getInflationRate() {
            const t = Ne(await this._rpcRequest("getInflationRate", []), eo);
            if ("error" in t)
              throw new Xn(t.error, "failed to get inflation rate");
            return t.result;
          }
          async getEpochInfo(t) {
            const { commitment: e, config: r } = Ri(t),
              n = this._buildArgs([], e, void 0, r),
              i = Ne(await this._rpcRequest("getEpochInfo", n), no);
            if ("error" in i) throw new Xn(i.error, "failed to get epoch info");
            return i.result;
          }
          async getEpochSchedule() {
            const t = Ne(await this._rpcRequest("getEpochSchedule", []), io);
            if ("error" in t)
              throw new Xn(t.error, "failed to get epoch schedule");
            const e = t.result;
            return new vi(
              e.slotsPerEpoch,
              e.leaderScheduleSlotOffset,
              e.warmup,
              e.firstNormalEpoch,
              e.firstNormalSlot
            );
          }
          async getLeaderSchedule() {
            const t = Ne(await this._rpcRequest("getLeaderSchedule", []), oo);
            if ("error" in t)
              throw new Xn(t.error, "failed to get leader schedule");
            return t.result;
          }
          async getMinimumBalanceForRentExemption(t, e) {
            const r = this._buildArgs([t], e),
              n = Ne(
                await this._rpcRequest("getMinimumBalanceForRentExemption", r),
                No
              );
            return "error" in n
              ? (console.warn(
                  "Unable to fetch minimum balance for rent exemption"
                ),
                0)
              : n.result;
          }
          async getRecentBlockhashAndContext(t) {
            const e = this._buildArgs([], t),
              r = Ne(await this._rpcRequest("getRecentBlockhash", e), us);
            if ("error" in r)
              throw new Xn(r.error, "failed to get recent blockhash");
            return r.result;
          }
          async getRecentPerformanceSamples(t) {
            const e = Ne(
              await this._rpcRequest(
                "getRecentPerformanceSamples",
                t ? [t] : []
              ),
              ds
            );
            if ("error" in e)
              throw new Xn(e.error, "failed to get recent performance samples");
            return e.result;
          }
          async getFeeCalculatorForBlockhash(t, e) {
            const r = this._buildArgs([t], e),
              n = Ne(
                await this._rpcRequest("getFeeCalculatorForBlockhash", r),
                fs
              );
            if ("error" in n)
              throw new Xn(n.error, "failed to get fee calculator");
            const { context: i, value: o } = n.result;
            return { context: i, value: null !== o ? o.feeCalculator : null };
          }
          async getFeeForMessage(t, e) {
            const r = rn(t.serialize()).toString("base64"),
              n = this._buildArgs([r], e),
              i = Ne(
                await this._rpcRequest("getFeeForMessage", n),
                zi($e(Ve()))
              );
            if ("error" in i)
              throw new Xn(i.error, "failed to get fee for message");
            if (null === i.result) throw new Error("invalid blockhash");
            return i.result;
          }
          async getRecentPrioritizationFees(t) {
            const e = t?.lockedWritableAccounts?.map((t) => t.toBase58()),
              r = e?.length ? [e] : [],
              n = Ne(
                await this._rpcRequest("getRecentPrioritizationFees", r),
                ro
              );
            if ("error" in n)
              throw new Xn(n.error, "failed to get recent prioritization fees");
            return n.result;
          }
          async getRecentBlockhash(t) {
            try {
              return (await this.getRecentBlockhashAndContext(t)).value;
            } catch (t) {
              throw new Error("failed to get recent blockhash: " + t);
            }
          }
          async getLatestBlockhash(t) {
            try {
              return (await this.getLatestBlockhashAndContext(t)).value;
            } catch (t) {
              throw new Error("failed to get recent blockhash: " + t);
            }
          }
          async getLatestBlockhashAndContext(t) {
            const { commitment: e, config: r } = Ri(t),
              n = this._buildArgs([], e, void 0, r),
              i = Ne(await this._rpcRequest("getLatestBlockhash", n), hs);
            if ("error" in i)
              throw new Xn(i.error, "failed to get latest blockhash");
            return i.result;
          }
          async isBlockhashValid(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgs([t], r, void 0, n),
              o = Ne(await this._rpcRequest("isBlockhashValid", i), ls);
            if ("error" in o)
              throw new Xn(
                o.error,
                "failed to determine if the blockhash `" + t + "`is valid"
              );
            return o.result;
          }
          async getVersion() {
            const t = Ne(await this._rpcRequest("getVersion", []), Ci(Yi));
            if ("error" in t) throw new Xn(t.error, "failed to get version");
            return t.result;
          }
          async getGenesisHash() {
            const t = Ne(
              await this._rpcRequest("getGenesisHash", []),
              Ci(Ze())
            );
            if ("error" in t)
              throw new Xn(t.error, "failed to get genesis hash");
            return t.result;
          }
          async getBlock(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgsAtLeastConfirmed([t], r, void 0, n),
              o = await this._rpcRequest("getBlock", i);
            try {
              switch (n?.transactionDetails) {
                case "accounts": {
                  const t = Ne(o, es);
                  if ("error" in t) throw t.error;
                  return t.result;
                }
                case "none": {
                  const t = Ne(o, ts);
                  if ("error" in t) throw t.error;
                  return t.result;
                }
                default: {
                  const t = Ne(o, Qo);
                  if ("error" in t) throw t.error;
                  const { result: e } = t;
                  return e
                    ? {
                        ...e,
                        transactions: e.transactions.map(
                          ({ transaction: t, meta: e, version: r }) => ({
                            meta: e,
                            transaction: { ...t, message: Ni(r, t.message) },
                            version: r,
                          })
                        ),
                      }
                    : null;
                }
              }
            } catch (t) {
              throw new Xn(t, "failed to get confirmed block");
            }
          }
          async getParsedBlock(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgsAtLeastConfirmed([t], r, "jsonParsed", n),
              o = await this._rpcRequest("getBlock", i);
            try {
              switch (n?.transactionDetails) {
                case "accounts": {
                  const t = Ne(o, ns);
                  if ("error" in t) throw t.error;
                  return t.result;
                }
                case "none": {
                  const t = Ne(o, is);
                  if ("error" in t) throw t.error;
                  return t.result;
                }
                default: {
                  const t = Ne(o, rs);
                  if ("error" in t) throw t.error;
                  return t.result;
                }
              }
            } catch (t) {
              throw new Xn(t, "failed to get block");
            }
          }
          async getBlockProduction(t) {
            let e, r;
            if ("string" == typeof t) r = t;
            else if (t) {
              const { commitment: n, ...i } = t;
              (r = n), (e = i);
            }
            const n = this._buildArgs([], r, "base64", e),
              i = Ne(await this._rpcRequest("getBlockProduction", n), Qi);
            if ("error" in i)
              throw new Xn(
                i.error,
                "failed to get block production information"
              );
            return i.result;
          }
          async getTransaction(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgsAtLeastConfirmed([t], r, void 0, n),
              o = Ne(await this._rpcRequest("getTransaction", i), as);
            if ("error" in o)
              throw new Xn(o.error, "failed to get transaction");
            const s = o.result;
            return s
              ? {
                  ...s,
                  transaction: {
                    ...s.transaction,
                    message: Ni(s.version, s.transaction.message),
                  },
                }
              : s;
          }
          async getParsedTransaction(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = this._buildArgsAtLeastConfirmed([t], r, "jsonParsed", n),
              o = Ne(await this._rpcRequest("getTransaction", i), cs);
            if ("error" in o)
              throw new Xn(o.error, "failed to get transaction");
            return o.result;
          }
          async getParsedTransactions(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = t.map((t) => ({
                methodName: "getTransaction",
                args: this._buildArgsAtLeastConfirmed([t], r, "jsonParsed", n),
              }));
            return (await this._rpcBatchRequest(i)).map((t) => {
              const e = Ne(t, cs);
              if ("error" in e)
                throw new Xn(e.error, "failed to get transactions");
              return e.result;
            });
          }
          async getTransactions(t, e) {
            const { commitment: r, config: n } = Ri(e),
              i = t.map((t) => ({
                methodName: "getTransaction",
                args: this._buildArgsAtLeastConfirmed([t], r, void 0, n),
              }));
            return (await this._rpcBatchRequest(i)).map((t) => {
              const e = Ne(t, as);
              if ("error" in e)
                throw new Xn(e.error, "failed to get transactions");
              const r = e.result;
              return r
                ? {
                    ...r,
                    transaction: {
                      ...r.transaction,
                      message: Ni(r.version, r.transaction.message),
                    },
                  }
                : r;
            });
          }
          async getConfirmedBlock(t, e) {
            const r = this._buildArgsAtLeastConfirmed([t], e),
              n = Ne(await this._rpcRequest("getConfirmedBlock", r), os);
            if ("error" in n)
              throw new Xn(n.error, "failed to get confirmed block");
            const i = n.result;
            if (!i) throw new Error("Confirmed block " + t + " not found");
            const o = {
              ...i,
              transactions: i.transactions.map(
                ({ transaction: t, meta: e }) => {
                  const r = new Tn(t.message);
                  return { meta: e, transaction: { ...t, message: r } };
                }
              ),
            };
            return {
              ...o,
              transactions: o.transactions.map(
                ({ transaction: t, meta: e }) => ({
                  meta: e,
                  transaction: Nn.populate(t.message, t.signatures),
                })
              ),
            };
          }
          async getBlocks(t, e, r) {
            const n = this._buildArgsAtLeastConfirmed(
                void 0 !== e ? [t, e] : [t],
                r
              ),
              i = Ne(await this._rpcRequest("getBlocks", n), Ci(De(Ve())));
            if ("error" in i) throw new Xn(i.error, "failed to get blocks");
            return i.result;
          }
          async getBlockSignatures(t, e) {
            const r = this._buildArgsAtLeastConfirmed([t], e, void 0, {
                transactionDetails: "signatures",
                rewards: !1,
              }),
              n = Ne(await this._rpcRequest("getBlock", r), ss);
            if ("error" in n) throw new Xn(n.error, "failed to get block");
            const i = n.result;
            if (!i) throw new Error("Block " + t + " not found");
            return i;
          }
          async getConfirmedBlockSignatures(t, e) {
            const r = this._buildArgsAtLeastConfirmed([t], e, void 0, {
                transactionDetails: "signatures",
                rewards: !1,
              }),
              n = Ne(await this._rpcRequest("getConfirmedBlock", r), ss);
            if ("error" in n)
              throw new Xn(n.error, "failed to get confirmed block");
            const i = n.result;
            if (!i) throw new Error("Confirmed block " + t + " not found");
            return i;
          }
          async getConfirmedTransaction(t, e) {
            const r = this._buildArgsAtLeastConfirmed([t], e),
              n = Ne(await this._rpcRequest("getConfirmedTransaction", r), as);
            if ("error" in n)
              throw new Xn(n.error, "failed to get transaction");
            const i = n.result;
            if (!i) return i;
            const o = new Tn(i.transaction.message),
              s = i.transaction.signatures;
            return { ...i, transaction: Nn.populate(o, s) };
          }
          async getParsedConfirmedTransaction(t, e) {
            const r = this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"),
              n = Ne(await this._rpcRequest("getConfirmedTransaction", r), cs);
            if ("error" in n)
              throw new Xn(n.error, "failed to get confirmed transaction");
            return n.result;
          }
          async getParsedConfirmedTransactions(t, e) {
            const r = t.map((t) => ({
              methodName: "getConfirmedTransaction",
              args: this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"),
            }));
            return (await this._rpcBatchRequest(r)).map((t) => {
              const e = Ne(t, cs);
              if ("error" in e)
                throw new Xn(e.error, "failed to get confirmed transactions");
              return e.result;
            });
          }
          async getConfirmedSignaturesForAddress(t, e, r) {
            let n = {},
              i = await this.getFirstAvailableBlock();
            for (; !("until" in n) && !(--e <= 0 || e < i); )
              try {
                const t = await this.getConfirmedBlockSignatures(
                  e,
                  "finalized"
                );
                t.signatures.length > 0 &&
                  (n.until = t.signatures[t.signatures.length - 1].toString());
              } catch (t) {
                if (t instanceof Error && t.message.includes("skipped"))
                  continue;
                throw t;
              }
            let o = await this.getSlot("finalized");
            for (; !("before" in n || ++r > o); )
              try {
                const t = await this.getConfirmedBlockSignatures(r);
                t.signatures.length > 0 &&
                  (n.before = t.signatures[t.signatures.length - 1].toString());
              } catch (t) {
                if (t instanceof Error && t.message.includes("skipped"))
                  continue;
                throw t;
              }
            return (await this.getConfirmedSignaturesForAddress2(t, n)).map(
              (t) => t.signature
            );
          }
          async getConfirmedSignaturesForAddress2(t, e, r) {
            const n = this._buildArgsAtLeastConfirmed(
                [t.toBase58()],
                r,
                void 0,
                e
              ),
              i = Ne(
                await this._rpcRequest("getConfirmedSignaturesForAddress2", n),
                vo
              );
            if ("error" in i)
              throw new Xn(
                i.error,
                "failed to get confirmed signatures for address"
              );
            return i.result;
          }
          async getSignaturesForAddress(t, e, r) {
            const n = this._buildArgsAtLeastConfirmed(
                [t.toBase58()],
                r,
                void 0,
                e
              ),
              i = Ne(await this._rpcRequest("getSignaturesForAddress", n), So);
            if ("error" in i)
              throw new Xn(i.error, "failed to get signatures for address");
            return i.result;
          }
          async getAddressLookupTable(t, e) {
            const { context: r, value: n } =
              await this.getAccountInfoAndContext(t, e);
            let i = null;
            return (
              null !== n &&
                (i = new Ai({ key: t, state: Ai.deserialize(n.data) })),
              { context: r, value: i }
            );
          }
          async getNonceAndContext(t, e) {
            const { context: r, value: n } =
              await this.getAccountInfoAndContext(t, e);
            let i = null;
            return (
              null !== n && (i = si.fromAccountData(n.data)),
              { context: r, value: i }
            );
          }
          async getNonce(t, e) {
            return await this.getNonceAndContext(t, e)
              .then((t) => t.value)
              .catch((e) => {
                throw new Error(
                  "failed to get nonce for account " + t.toBase58() + ": " + e
                );
              });
          }
          async requestAirdrop(t, e) {
            const r = Ne(
              await this._rpcRequest("requestAirdrop", [t.toBase58(), e]),
              ps
            );
            if ("error" in r)
              throw new Xn(r.error, `airdrop to ${t.toBase58()} failed`);
            return r.result;
          }
          async _blockhashWithExpiryBlockHeight(t) {
            if (!t) {
              for (; this._pollingBlockhash; ) await ti(100);
              const t = Date.now() - this._blockhashInfo.lastFetch >= Pi;
              if (null !== this._blockhashInfo.latestBlockhash && !t)
                return this._blockhashInfo.latestBlockhash;
            }
            return await this._pollNewBlockhash();
          }
          async _pollNewBlockhash() {
            this._pollingBlockhash = !0;
            try {
              const t = Date.now(),
                e = this._blockhashInfo.latestBlockhash,
                r = e ? e.blockhash : null;
              for (let t = 0; t < 50; t++) {
                const t = await this.getLatestBlockhash("finalized");
                if (r !== t.blockhash)
                  return (
                    (this._blockhashInfo = {
                      latestBlockhash: t,
                      lastFetch: Date.now(),
                      transactionSignatures: [],
                      simulatedSignatures: [],
                    }),
                    t
                  );
                await ti(200);
              }
              throw new Error(
                `Unable to obtain a new blockhash after ${Date.now() - t}ms`
              );
            } finally {
              this._pollingBlockhash = !1;
            }
          }
          async getStakeMinimumDelegation(t) {
            const { commitment: e, config: r } = Ri(t),
              n = this._buildArgs([], e, "base64", r),
              i = Ne(
                await this._rpcRequest("getStakeMinimumDelegation", n),
                zi(Ve())
              );
            if ("error" in i)
              throw new Xn(i.error, "failed to get stake minimum delegation");
            return i.result;
          }
          async simulateTransaction(t, r, n) {
            if ("message" in t) {
              const i = t.serialize(),
                o = e.Buffer.from(i).toString("base64");
              if (Array.isArray(r) || void 0 !== n)
                throw new Error("Invalid arguments");
              const s = r || {};
              (s.encoding = "base64"),
                "commitment" in s || (s.commitment = this.commitment),
                r &&
                  "object" == typeof r &&
                  "innerInstructions" in r &&
                  (s.innerInstructions = r.innerInstructions);
              const a = [o, s],
                c = Ne(await this._rpcRequest("simulateTransaction", a), Xi);
              if ("error" in c)
                throw new Error(
                  "failed to simulate transaction: " + c.error.message
                );
              return c.result;
            }
            let i;
            if (t instanceof Nn) {
              let e = t;
              (i = new Nn()),
                (i.feePayer = e.feePayer),
                (i.instructions = t.instructions),
                (i.nonceInfo = e.nonceInfo),
                (i.signatures = e.signatures);
            } else (i = Nn.populate(t)), (i._message = i._json = void 0);
            if (void 0 !== r && !Array.isArray(r))
              throw new Error("Invalid arguments");
            const o = r;
            if (i.nonceInfo && o) i.sign(...o);
            else {
              let t = this._disableBlockhashCaching;
              for (;;) {
                const e = await this._blockhashWithExpiryBlockHeight(t);
                if (
                  ((i.lastValidBlockHeight = e.lastValidBlockHeight),
                  (i.recentBlockhash = e.blockhash),
                  !o)
                )
                  break;
                if ((i.sign(...o), !i.signature)) throw new Error("!signature");
                const r = i.signature.toString("base64");
                if (
                  !this._blockhashInfo.simulatedSignatures.includes(r) &&
                  !this._blockhashInfo.transactionSignatures.includes(r)
                ) {
                  this._blockhashInfo.simulatedSignatures.push(r);
                  break;
                }
                t = !0;
              }
            }
            const s = i._compile(),
              a = s.serialize(),
              c = i._serialize(a).toString("base64"),
              u = { encoding: "base64", commitment: this.commitment };
            if (n) {
              const t = (Array.isArray(n) ? n : s.nonProgramIds()).map((t) =>
                t.toBase58()
              );
              u.accounts = { encoding: "base64", addresses: t };
            }
            o && (u.sigVerify = !0),
              r &&
                "object" == typeof r &&
                "innerInstructions" in r &&
                (u.innerInstructions = r.innerInstructions);
            const h = [c, u],
              l = Ne(await this._rpcRequest("simulateTransaction", h), Xi);
            if ("error" in l) {
              let t;
              if (
                "data" in l.error &&
                ((t = l.error.data.logs), t && Array.isArray(t))
              ) {
                const e = "\n    ",
                  r = e + t.join(e);
                console.error(l.error.message, r);
              }
              throw new Zn({
                action: "simulate",
                signature: "",
                transactionMessage: l.error.message,
                logs: t,
              });
            }
            return l.result;
          }
          async sendTransaction(t, e, r) {
            if ("version" in t) {
              if (e && Array.isArray(e)) throw new Error("Invalid arguments");
              const r = t.serialize();
              return await this.sendRawTransaction(r, e);
            }
            if (void 0 === e || !Array.isArray(e))
              throw new Error("Invalid arguments");
            const n = e;
            if (t.nonceInfo) t.sign(...n);
            else {
              let e = this._disableBlockhashCaching;
              for (;;) {
                const r = await this._blockhashWithExpiryBlockHeight(e);
                if (
                  ((t.lastValidBlockHeight = r.lastValidBlockHeight),
                  (t.recentBlockhash = r.blockhash),
                  t.sign(...n),
                  !t.signature)
                )
                  throw new Error("!signature");
                const i = t.signature.toString("base64");
                if (!this._blockhashInfo.transactionSignatures.includes(i)) {
                  this._blockhashInfo.transactionSignatures.push(i);
                  break;
                }
                e = !0;
              }
            }
            const i = t.serialize();
            return await this.sendRawTransaction(i, r);
          }
          async sendRawTransaction(t, e) {
            const r = rn(t).toString("base64");
            return await this.sendEncodedTransaction(r, e);
          }
          async sendEncodedTransaction(t, e) {
            const r = { encoding: "base64" },
              n = e && e.skipPreflight,
              i =
                !0 === n
                  ? "processed"
                  : (e && e.preflightCommitment) || this.commitment;
            e && null != e.maxRetries && (r.maxRetries = e.maxRetries),
              e &&
                null != e.minContextSlot &&
                (r.minContextSlot = e.minContextSlot),
              n && (r.skipPreflight = n),
              i && (r.preflightCommitment = i);
            const o = [t, r],
              s = Ne(await this._rpcRequest("sendTransaction", o), gs);
            if ("error" in s) {
              let t;
              throw (
                ("data" in s.error && (t = s.error.data.logs),
                new Zn({
                  action: n ? "send" : "simulate",
                  signature: "",
                  transactionMessage: s.error.message,
                  logs: t,
                }))
              );
            }
            return s.result;
          }
          _wsOnOpen() {
            (this._rpcWebSocketConnected = !0),
              (this._rpcWebSocketHeartbeat = setInterval(() => {
                (async () => {
                  try {
                    await this._rpcWebSocket.notify("ping");
                  } catch {}
                })();
              }, 5e3)),
              this._updateSubscriptions();
          }
          _wsOnError(t) {
            (this._rpcWebSocketConnected = !1),
              console.error("ws error:", t.message);
          }
          _wsOnClose(t) {
            (this._rpcWebSocketConnected = !1),
              (this._rpcWebSocketGeneration =
                (this._rpcWebSocketGeneration + 1) % Number.MAX_SAFE_INTEGER),
              this._rpcWebSocketIdleTimeout &&
                (clearTimeout(this._rpcWebSocketIdleTimeout),
                (this._rpcWebSocketIdleTimeout = null)),
              this._rpcWebSocketHeartbeat &&
                (clearInterval(this._rpcWebSocketHeartbeat),
                (this._rpcWebSocketHeartbeat = null)),
              1e3 !== t
                ? ((this._subscriptionCallbacksByServerSubscriptionId = {}),
                  Object.entries(this._subscriptionsByHash).forEach(
                    ([t, e]) => {
                      this._setSubscription(t, { ...e, state: "pending" });
                    }
                  ))
                : this._updateSubscriptions();
          }
          _setSubscription(t, e) {
            const r = this._subscriptionsByHash[t]?.state;
            if (((this._subscriptionsByHash[t] = e), r !== e.state)) {
              const r = this._subscriptionStateChangeCallbacksByHash[t];
              r &&
                r.forEach((t) => {
                  try {
                    t(e.state);
                  } catch {}
                });
            }
          }
          _onSubscriptionStateChange(t, e) {
            const r = this._subscriptionHashByClientSubscriptionId[t];
            if (null == r) return () => {};
            const n = (this._subscriptionStateChangeCallbacksByHash[r] ||=
              new Set());
            return (
              n.add(e),
              () => {
                n.delete(e),
                  0 === n.size &&
                    delete this._subscriptionStateChangeCallbacksByHash[r];
              }
            );
          }
          async _updateSubscriptions() {
            if (0 === Object.keys(this._subscriptionsByHash).length)
              return void (
                this._rpcWebSocketConnected &&
                ((this._rpcWebSocketConnected = !1),
                (this._rpcWebSocketIdleTimeout = setTimeout(() => {
                  this._rpcWebSocketIdleTimeout = null;
                  try {
                    this._rpcWebSocket.close();
                  } catch (t) {
                    t instanceof Error &&
                      console.log(
                        `Error when closing socket connection: ${t.message}`
                      );
                  }
                }, 500)))
              );
            if (
              (null !== this._rpcWebSocketIdleTimeout &&
                (clearTimeout(this._rpcWebSocketIdleTimeout),
                (this._rpcWebSocketIdleTimeout = null),
                (this._rpcWebSocketConnected = !0)),
              !this._rpcWebSocketConnected)
            )
              return void this._rpcWebSocket.connect();
            const t = this._rpcWebSocketGeneration,
              e = () => t === this._rpcWebSocketGeneration;
            await Promise.all(
              Object.keys(this._subscriptionsByHash).map(async (t) => {
                const r = this._subscriptionsByHash[t];
                if (void 0 !== r)
                  switch (r.state) {
                    case "pending":
                    case "unsubscribed":
                      if (0 === r.callbacks.size)
                        return (
                          delete this._subscriptionsByHash[t],
                          "unsubscribed" === r.state &&
                            delete this
                              ._subscriptionCallbacksByServerSubscriptionId[
                              r.serverSubscriptionId
                            ],
                          void (await this._updateSubscriptions())
                        );
                      await (async () => {
                        const { args: n, method: i } = r;
                        try {
                          this._setSubscription(t, {
                            ...r,
                            state: "subscribing",
                          });
                          const e = await this._rpcWebSocket.call(i, n);
                          this._setSubscription(t, {
                            ...r,
                            serverSubscriptionId: e,
                            state: "subscribed",
                          }),
                            (this._subscriptionCallbacksByServerSubscriptionId[
                              e
                            ] = r.callbacks),
                            await this._updateSubscriptions();
                        } catch (o) {
                          if (
                            (console.error(
                              `Received ${
                                o instanceof Error ? "" : "JSON-RPC "
                              }error calling \`${i}\``,
                              { args: n, error: o }
                            ),
                            !e())
                          )
                            return;
                          this._setSubscription(t, { ...r, state: "pending" }),
                            await this._updateSubscriptions();
                        }
                      })();
                      break;
                    case "subscribed":
                      0 === r.callbacks.size &&
                        (await (async () => {
                          const {
                            serverSubscriptionId: n,
                            unsubscribeMethod: i,
                          } = r;
                          if (this._subscriptionsAutoDisposedByRpc.has(n))
                            this._subscriptionsAutoDisposedByRpc.delete(n);
                          else {
                            this._setSubscription(t, {
                              ...r,
                              state: "unsubscribing",
                            }),
                              this._setSubscription(t, {
                                ...r,
                                state: "unsubscribing",
                              });
                            try {
                              await this._rpcWebSocket.call(i, [n]);
                            } catch (n) {
                              if (
                                (n instanceof Error &&
                                  console.error(`${i} error:`, n.message),
                                !e())
                              )
                                return;
                              return (
                                this._setSubscription(t, {
                                  ...r,
                                  state: "subscribed",
                                }),
                                void (await this._updateSubscriptions())
                              );
                            }
                          }
                          this._setSubscription(t, {
                            ...r,
                            state: "unsubscribed",
                          }),
                            await this._updateSubscriptions();
                        })());
                  }
              })
            );
          }
          _handleServerNotification(t, e) {
            const r = this._subscriptionCallbacksByServerSubscriptionId[t];
            void 0 !== r &&
              r.forEach((t) => {
                try {
                  t(...e);
                } catch (t) {
                  console.error(t);
                }
              });
          }
          _wsOnAccountNotification(t) {
            const { result: e, subscription: r } = Ne(t, Io);
            this._handleServerNotification(r, [e.value, e.context]);
          }
          _makeSubscription(t, e) {
            const r = this._nextClientSubscriptionId++,
              n = wi([t.method, e]),
              i = this._subscriptionsByHash[n];
            return (
              void 0 === i
                ? (this._subscriptionsByHash[n] = {
                    ...t,
                    args: e,
                    callbacks: new Set([t.callback]),
                    state: "pending",
                  })
                : i.callbacks.add(t.callback),
              (this._subscriptionHashByClientSubscriptionId[r] = n),
              (this._subscriptionDisposeFunctionsByClientSubscriptionId[r] =
                async () => {
                  delete this
                    ._subscriptionDisposeFunctionsByClientSubscriptionId[r],
                    delete this._subscriptionHashByClientSubscriptionId[r];
                  const e = this._subscriptionsByHash[n];
                  Bn(
                    void 0 !== e,
                    `Could not find a \`Subscription\` when tearing down client subscription #${r}`
                  ),
                    e.callbacks.delete(t.callback),
                    await this._updateSubscriptions();
                }),
              this._updateSubscriptions(),
              r
            );
          }
          onAccountChange(t, e, r) {
            const { commitment: n, config: i } = Ri(r),
              o = this._buildArgs(
                [t.toBase58()],
                n || this._commitment || "finalized",
                "base64",
                i
              );
            return this._makeSubscription(
              {
                callback: e,
                method: "accountSubscribe",
                unsubscribeMethod: "accountUnsubscribe",
              },
              o
            );
          }
          async removeAccountChangeListener(t) {
            await this._unsubscribeClientSubscription(t, "account change");
          }
          _wsOnProgramAccountNotification(t) {
            const { result: e, subscription: r } = Ne(t, Eo);
            this._handleServerNotification(r, [
              { accountId: e.value.pubkey, accountInfo: e.value.account },
              e.context,
            ]);
          }
          onProgramAccountChange(t, e, r, n) {
            const { commitment: i, config: o } = Ri(r),
              s = this._buildArgs(
                [t.toBase58()],
                i || this._commitment || "finalized",
                "base64",
                o || (n ? { filters: Ti(n) } : void 0)
              );
            return this._makeSubscription(
              {
                callback: e,
                method: "programSubscribe",
                unsubscribeMethod: "programUnsubscribe",
              },
              s
            );
          }
          async removeProgramAccountChangeListener(t) {
            await this._unsubscribeClientSubscription(
              t,
              "program account change"
            );
          }
          onLogs(t, e, r) {
            const n = this._buildArgs(
              ["object" == typeof t ? { mentions: [t.toString()] } : t],
              r || this._commitment || "finalized"
            );
            return this._makeSubscription(
              {
                callback: e,
                method: "logsSubscribe",
                unsubscribeMethod: "logsUnsubscribe",
              },
              n
            );
          }
          async removeOnLogsListener(t) {
            await this._unsubscribeClientSubscription(t, "logs");
          }
          _wsOnLogsNotification(t) {
            const { result: e, subscription: r } = Ne(t, ys);
            this._handleServerNotification(r, [e.value, e.context]);
          }
          _wsOnSlotNotification(t) {
            const { result: e, subscription: r } = Ne(t, Bo);
            this._handleServerNotification(r, [e]);
          }
          onSlotChange(t) {
            return this._makeSubscription(
              {
                callback: t,
                method: "slotSubscribe",
                unsubscribeMethod: "slotUnsubscribe",
              },
              []
            );
          }
          async removeSlotChangeListener(t) {
            await this._unsubscribeClientSubscription(t, "slot change");
          }
          _wsOnSlotUpdatesNotification(t) {
            const { result: e, subscription: r } = Ne(t, Mo);
            this._handleServerNotification(r, [e]);
          }
          onSlotUpdate(t) {
            return this._makeSubscription(
              {
                callback: t,
                method: "slotsUpdatesSubscribe",
                unsubscribeMethod: "slotsUpdatesUnsubscribe",
              },
              []
            );
          }
          async removeSlotUpdateListener(t) {
            await this._unsubscribeClientSubscription(t, "slot update");
          }
          async _unsubscribeClientSubscription(t, e) {
            const r =
              this._subscriptionDisposeFunctionsByClientSubscriptionId[t];
            r
              ? await r()
              : console.warn(
                  `Ignored unsubscribe request because an active subscription with id \`${t}\` for '${e}' events could not be found.`
                );
          }
          _buildArgs(t, e, r, n) {
            const i = e || this._commitment;
            if (i || r || n) {
              let e = {};
              r && (e.encoding = r),
                i && (e.commitment = i),
                n && (e = Object.assign(e, n)),
                t.push(e);
            }
            return t;
          }
          _buildArgsAtLeastConfirmed(t, e, r, n) {
            const i = e || this._commitment;
            if (i && !["confirmed", "finalized"].includes(i))
              throw new Error(
                "Using Connection with default commitment: `" +
                  this._commitment +
                  "`, but method requires at least `confirmed`"
              );
            return this._buildArgs(t, e, r, n);
          }
          _wsOnSignatureNotification(t) {
            const { result: e, subscription: r } = Ne(t, Po);
            "receivedSignature" !== e.value &&
              this._subscriptionsAutoDisposedByRpc.add(r),
              this._handleServerNotification(
                r,
                "receivedSignature" === e.value
                  ? [{ type: "received" }, e.context]
                  : [{ type: "status", result: e.value }, e.context]
              );
          }
          onSignature(t, e, r) {
            const n = this._buildArgs(
                [t],
                r || this._commitment || "finalized"
              ),
              i = this._makeSubscription(
                {
                  callback: (t, r) => {
                    if ("status" === t.type) {
                      e(t.result, r);
                      try {
                        this.removeSignatureListener(i);
                      } catch (t) {}
                    }
                  },
                  method: "signatureSubscribe",
                  unsubscribeMethod: "signatureUnsubscribe",
                },
                n
              );
            return i;
          }
          onSignatureWithOptions(t, e, r) {
            const { commitment: n, ...i } = {
                ...r,
                commitment:
                  (r && r.commitment) || this._commitment || "finalized",
              },
              o = this._buildArgs([t], n, void 0, i),
              s = this._makeSubscription(
                {
                  callback: (t, r) => {
                    e(t, r);
                    try {
                      this.removeSignatureListener(s);
                    } catch (t) {}
                  },
                  method: "signatureSubscribe",
                  unsubscribeMethod: "signatureUnsubscribe",
                },
                o
              );
            return s;
          }
          async removeSignatureListener(t) {
            await this._unsubscribeClientSubscription(t, "signature result");
          }
          _wsOnRootNotification(t) {
            const { result: e, subscription: r } = Ne(t, Ro);
            this._handleServerNotification(r, [e]);
          }
          onRootChange(t) {
            return this._makeSubscription(
              {
                callback: t,
                method: "rootSubscribe",
                unsubscribeMethod: "rootUnsubscribe",
              },
              []
            );
          }
          async removeRootChangeListener(t) {
            await this._unsubscribeClientSubscription(t, "root change");
          }
        }
        class ks {
          constructor(t) {
            (this._keypair = void 0), (this._keypair = t ?? Jr());
          }
          static generate() {
            return new ks(Jr());
          }
          static fromSecretKey(t, e) {
            if (64 !== t.byteLength) throw new Error("bad secret key size");
            const r = t.slice(32, 64);
            if (!e || !e.skipValidation) {
              const e = t.slice(0, 32),
                n = Xr(e);
              for (let t = 0; t < 32; t++)
                if (r[t] !== n[t])
                  throw new Error("provided secretKey is invalid");
            }
            return new ks({ publicKey: r, secretKey: t });
          }
          static fromSeed(t) {
            const e = Xr(t),
              r = new Uint8Array(64);
            return (
              r.set(t), r.set(e, 32), new ks({ publicKey: e, secretKey: r })
            );
          }
          get publicKey() {
            return new ln(this._keypair.publicKey);
          }
          get secretKey() {
            return new Uint8Array(this._keypair.secretKey);
          }
        }
        const vs = Object.freeze({
          CreateLookupTable: {
            index: 0,
            layout: Be.w3([
              Be.DH("instruction"),
              ai("recentSlot"),
              Be.u8("bumpSeed"),
            ]),
          },
          FreezeLookupTable: {
            index: 1,
            layout: Be.w3([Be.DH("instruction")]),
          },
          ExtendLookupTable: {
            index: 2,
            layout: Be.w3([
              Be.DH("instruction"),
              ai(),
              Be.O6(vn(), Be.cY(Be.DH(), -8), "addresses"),
            ]),
          },
          DeactivateLookupTable: {
            index: 3,
            layout: Be.w3([Be.DH("instruction")]),
          },
          CloseLookupTable: { index: 4, layout: Be.w3([Be.DH("instruction")]) },
        });
        class Ss {
          constructor() {}
          static decodeInstructionType(t) {
            this.checkProgramId(t.programId);
            const e = Be.DH("instruction").decode(t.data);
            let r;
            for (const [t, n] of Object.entries(vs))
              if (n.index == e) {
                r = t;
                break;
              }
            if (!r)
              throw new Error(
                "Invalid Instruction. Should be a LookupTable Instruction"
              );
            return r;
          }
          static decodeCreateLookupTable(t) {
            this.checkProgramId(t.programId), this.checkKeysLength(t.keys, 4);
            const { recentSlot: e } = ri(vs.CreateLookupTable, t.data);
            return {
              authority: t.keys[1].pubkey,
              payer: t.keys[2].pubkey,
              recentSlot: Number(e),
            };
          }
          static decodeExtendLookupTable(t) {
            if ((this.checkProgramId(t.programId), t.keys.length < 2))
              throw new Error(
                `invalid instruction; found ${t.keys.length} keys, expected at least 2`
              );
            const { addresses: e } = ri(vs.ExtendLookupTable, t.data);
            return {
              lookupTable: t.keys[0].pubkey,
              authority: t.keys[1].pubkey,
              payer: t.keys.length > 2 ? t.keys[2].pubkey : void 0,
              addresses: e.map((t) => new ln(t)),
            };
          }
          static decodeCloseLookupTable(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeysLength(t.keys, 3),
              {
                lookupTable: t.keys[0].pubkey,
                authority: t.keys[1].pubkey,
                recipient: t.keys[2].pubkey,
              }
            );
          }
          static decodeFreezeLookupTable(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeysLength(t.keys, 2),
              { lookupTable: t.keys[0].pubkey, authority: t.keys[1].pubkey }
            );
          }
          static decodeDeactivateLookupTable(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeysLength(t.keys, 2),
              { lookupTable: t.keys[0].pubkey, authority: t.keys[1].pubkey }
            );
          }
          static checkProgramId(t) {
            if (!t.equals(Is.programId))
              throw new Error(
                "invalid instruction; programId is not AddressLookupTable Program"
              );
          }
          static checkKeysLength(t, e) {
            if (t.length < e)
              throw new Error(
                `invalid instruction; found ${t.length} keys, expected at least ${e}`
              );
          }
        }
        class Is {
          constructor() {}
          static createLookupTable(t) {
            const [e, r] = ln.findProgramAddressSync(
                [t.authority.toBuffer(), (0, xe.Bq)(BigInt(t.recentSlot), 8)],
                this.programId
              ),
              n = ei(vs.CreateLookupTable, {
                recentSlot: BigInt(t.recentSlot),
                bumpSeed: r,
              }),
              i = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: t.authority, isSigner: !0, isWritable: !1 },
                { pubkey: t.payer, isSigner: !0, isWritable: !0 },
                { pubkey: hi.programId, isSigner: !1, isWritable: !1 },
              ];
            return [new Un({ programId: this.programId, keys: i, data: n }), e];
          }
          static freezeLookupTable(t) {
            const e = ei(vs.FreezeLookupTable),
              r = [
                { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
                { pubkey: t.authority, isSigner: !0, isWritable: !1 },
              ];
            return new Un({ programId: this.programId, keys: r, data: e });
          }
          static extendLookupTable(t) {
            const e = ei(vs.ExtendLookupTable, {
                addresses: t.addresses.map((t) => t.toBytes()),
              }),
              r = [
                { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
                { pubkey: t.authority, isSigner: !0, isWritable: !1 },
              ];
            return (
              t.payer &&
                r.push(
                  { pubkey: t.payer, isSigner: !0, isWritable: !0 },
                  { pubkey: hi.programId, isSigner: !1, isWritable: !1 }
                ),
              new Un({ programId: this.programId, keys: r, data: e })
            );
          }
          static deactivateLookupTable(t) {
            const e = ei(vs.DeactivateLookupTable),
              r = [
                { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
                { pubkey: t.authority, isSigner: !0, isWritable: !1 },
              ];
            return new Un({ programId: this.programId, keys: r, data: e });
          }
          static closeLookupTable(t) {
            const e = ei(vs.CloseLookupTable),
              r = [
                { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
                { pubkey: t.authority, isSigner: !0, isWritable: !1 },
                { pubkey: t.recipient, isSigner: !1, isWritable: !0 },
              ];
            return new Un({ programId: this.programId, keys: r, data: e });
          }
        }
        Is.programId = new ln("AddressLookupTab1e1111111111111111111111111");
        class As {
          constructor() {}
          static decodeInstructionType(t) {
            this.checkProgramId(t.programId);
            const e = Be.u8("instruction").decode(t.data);
            let r;
            for (const [t, n] of Object.entries(Es))
              if (n.index == e) {
                r = t;
                break;
              }
            if (!r)
              throw new Error(
                "Instruction type incorrect; not a ComputeBudgetInstruction"
              );
            return r;
          }
          static decodeRequestUnits(t) {
            this.checkProgramId(t.programId);
            const { units: e, additionalFee: r } = ri(Es.RequestUnits, t.data);
            return { units: e, additionalFee: r };
          }
          static decodeRequestHeapFrame(t) {
            this.checkProgramId(t.programId);
            const { bytes: e } = ri(Es.RequestHeapFrame, t.data);
            return { bytes: e };
          }
          static decodeSetComputeUnitLimit(t) {
            this.checkProgramId(t.programId);
            const { units: e } = ri(Es.SetComputeUnitLimit, t.data);
            return { units: e };
          }
          static decodeSetComputeUnitPrice(t) {
            this.checkProgramId(t.programId);
            const { microLamports: e } = ri(Es.SetComputeUnitPrice, t.data);
            return { microLamports: e };
          }
          static checkProgramId(t) {
            if (!t.equals(_s.programId))
              throw new Error(
                "invalid instruction; programId is not ComputeBudgetProgram"
              );
          }
        }
        const Es = Object.freeze({
          RequestUnits: {
            index: 0,
            layout: Be.w3([
              Be.u8("instruction"),
              Be.DH("units"),
              Be.DH("additionalFee"),
            ]),
          },
          RequestHeapFrame: {
            index: 1,
            layout: Be.w3([Be.u8("instruction"), Be.DH("bytes")]),
          },
          SetComputeUnitLimit: {
            index: 2,
            layout: Be.w3([Be.u8("instruction"), Be.DH("units")]),
          },
          SetComputeUnitPrice: {
            index: 3,
            layout: Be.w3([Be.u8("instruction"), ai("microLamports")]),
          },
        });
        class _s {
          constructor() {}
          static requestUnits(t) {
            const e = ei(Es.RequestUnits, t);
            return new Un({ keys: [], programId: this.programId, data: e });
          }
          static requestHeapFrame(t) {
            const e = ei(Es.RequestHeapFrame, t);
            return new Un({ keys: [], programId: this.programId, data: e });
          }
          static setComputeUnitLimit(t) {
            const e = ei(Es.SetComputeUnitLimit, t);
            return new Un({ keys: [], programId: this.programId, data: e });
          }
          static setComputeUnitPrice(t) {
            const e = ei(Es.SetComputeUnitPrice, {
              microLamports: BigInt(t.microLamports),
            });
            return new Un({ keys: [], programId: this.programId, data: e });
          }
        }
        _s.programId = new ln("ComputeBudget111111111111111111111111111111");
        const Bs = Be.w3([
          Be.u8("numSignatures"),
          Be.u8("padding"),
          Be.NX("signatureOffset"),
          Be.NX("signatureInstructionIndex"),
          Be.NX("publicKeyOffset"),
          Be.NX("publicKeyInstructionIndex"),
          Be.NX("messageDataOffset"),
          Be.NX("messageDataSize"),
          Be.NX("messageInstructionIndex"),
        ]);
        class xs {
          constructor() {}
          static createInstructionWithPublicKey(t) {
            const {
              publicKey: r,
              message: n,
              signature: i,
              instructionIndex: o,
            } = t;
            Bn(
              32 === r.length,
              `Public Key must be 32 bytes but received ${r.length} bytes`
            ),
              Bn(
                64 === i.length,
                `Signature must be 64 bytes but received ${i.length} bytes`
              );
            const s = Bs.span,
              a = s + r.length,
              c = a + i.length,
              u = e.Buffer.alloc(c + n.length),
              h = null == o ? 65535 : o;
            return (
              Bs.encode(
                {
                  numSignatures: 1,
                  padding: 0,
                  signatureOffset: a,
                  signatureInstructionIndex: h,
                  publicKeyOffset: s,
                  publicKeyInstructionIndex: h,
                  messageDataOffset: c,
                  messageDataSize: n.length,
                  messageInstructionIndex: h,
                },
                u
              ),
              u.fill(r, s),
              u.fill(i, a),
              u.fill(n, c),
              new Un({ keys: [], programId: xs.programId, data: u })
            );
          }
          static createInstructionWithPrivateKey(t) {
            const { privateKey: e, message: r, instructionIndex: n } = t;
            Bn(
              64 === e.length,
              `Private key must be 64 bytes but received ${e.length} bytes`
            );
            try {
              const t = ks.fromSecretKey(e),
                i = t.publicKey.toBytes(),
                o = tn(r, t.secretKey);
              return this.createInstructionWithPublicKey({
                publicKey: i,
                message: r,
                signature: o,
                instructionIndex: n,
              });
            } catch (t) {
              throw new Error(`Error creating instruction; ${t}`);
            }
          }
        }
        (xs.programId = new ln("Ed25519SigVerify111111111111111111111111111")),
          Yr.utils.isValidPrivateKey;
        const Ms = Yr.getPublicKey,
          Ps = Be.w3([
            Be.u8("numSignatures"),
            Be.NX("signatureOffset"),
            Be.u8("signatureInstructionIndex"),
            Be.NX("ethAddressOffset"),
            Be.u8("ethAddressInstructionIndex"),
            Be.NX("messageDataOffset"),
            Be.NX("messageDataSize"),
            Be.u8("messageInstructionIndex"),
            Be.av(20, "ethAddress"),
            Be.av(64, "signature"),
            Be.u8("recoveryId"),
          ]);
        class Rs {
          constructor() {}
          static publicKeyToEthAddress(t) {
            Bn(
              64 === t.length,
              `Public key must be 64 bytes but received ${t.length} bytes`
            );
            try {
              return e.Buffer.from(_r(rn(t))).slice(-20);
            } catch (t) {
              throw new Error(`Error constructing Ethereum address: ${t}`);
            }
          }
          static createInstructionWithPublicKey(t) {
            const {
              publicKey: e,
              message: r,
              signature: n,
              recoveryId: i,
              instructionIndex: o,
            } = t;
            return Rs.createInstructionWithEthAddress({
              ethAddress: Rs.publicKeyToEthAddress(e),
              message: r,
              signature: n,
              recoveryId: i,
              instructionIndex: o,
            });
          }
          static createInstructionWithEthAddress(t) {
            const {
              ethAddress: r,
              message: n,
              signature: i,
              recoveryId: o,
              instructionIndex: s = 0,
            } = t;
            let a;
            (a =
              "string" == typeof r
                ? r.startsWith("0x")
                  ? e.Buffer.from(r.substr(2), "hex")
                  : e.Buffer.from(r, "hex")
                : r),
              Bn(
                20 === a.length,
                `Address must be 20 bytes but received ${a.length} bytes`
              );
            const c = 12 + a.length,
              u = c + i.length + 1,
              h = e.Buffer.alloc(Ps.span + n.length);
            return (
              Ps.encode(
                {
                  numSignatures: 1,
                  signatureOffset: c,
                  signatureInstructionIndex: s,
                  ethAddressOffset: 12,
                  ethAddressInstructionIndex: s,
                  messageDataOffset: u,
                  messageDataSize: n.length,
                  messageInstructionIndex: s,
                  signature: rn(i),
                  ethAddress: rn(a),
                  recoveryId: o,
                },
                h
              ),
              h.fill(rn(n), Ps.span),
              new Un({ keys: [], programId: Rs.programId, data: h })
            );
          }
          static createInstructionWithPrivateKey(t) {
            const { privateKey: r, message: n, instructionIndex: i } = t;
            Bn(
              32 === r.length,
              `Private key must be 32 bytes but received ${r.length} bytes`
            );
            try {
              const t = rn(r),
                o = Ms(t, !1).slice(1),
                s = e.Buffer.from(_r(rn(n))),
                [a, c] = ((t, e) => {
                  const r = Yr.sign(t, e);
                  return [r.toCompactRawBytes(), r.recovery];
                })(s, t);
              return this.createInstructionWithPublicKey({
                publicKey: o,
                message: n,
                signature: a,
                recoveryId: c,
                instructionIndex: i,
              });
            } catch (t) {
              throw new Error(`Error creating instruction; ${t}`);
            }
          }
        }
        var Ts;
        Rs.programId = new ln("KeccakSecp256k11111111111111111111111111111");
        const Os = new ln("StakeConfig11111111111111111111111111111111");
        class Ls {
          constructor(t, e) {
            (this.staker = void 0),
              (this.withdrawer = void 0),
              (this.staker = t),
              (this.withdrawer = e);
          }
        }
        class Cs {
          constructor(t, e, r) {
            (this.unixTimestamp = void 0),
              (this.epoch = void 0),
              (this.custodian = void 0),
              (this.unixTimestamp = t),
              (this.epoch = e),
              (this.custodian = r);
          }
        }
        (Ts = Cs), (Cs.default = new Ts(0, 0, ln.default));
        class zs {
          constructor() {}
          static decodeInstructionType(t) {
            this.checkProgramId(t.programId);
            const e = Be.DH("instruction").decode(t.data);
            let r;
            for (const [t, n] of Object.entries(Us))
              if (n.index == e) {
                r = t;
                break;
              }
            if (!r)
              throw new Error(
                "Instruction type incorrect; not a StakeInstruction"
              );
            return r;
          }
          static decodeInitialize(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
            const { authorized: e, lockup: r } = ri(Us.Initialize, t.data);
            return {
              stakePubkey: t.keys[0].pubkey,
              authorized: new Ls(new ln(e.staker), new ln(e.withdrawer)),
              lockup: new Cs(r.unixTimestamp, r.epoch, new ln(r.custodian)),
            };
          }
          static decodeDelegate(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeyLength(t.keys, 6),
              ri(Us.Delegate, t.data),
              {
                stakePubkey: t.keys[0].pubkey,
                votePubkey: t.keys[1].pubkey,
                authorizedPubkey: t.keys[5].pubkey,
              }
            );
          }
          static decodeAuthorize(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const { newAuthorized: e, stakeAuthorizationType: r } = ri(
                Us.Authorize,
                t.data
              ),
              n = {
                stakePubkey: t.keys[0].pubkey,
                authorizedPubkey: t.keys[2].pubkey,
                newAuthorizedPubkey: new ln(e),
                stakeAuthorizationType: { index: r },
              };
            return (
              t.keys.length > 3 && (n.custodianPubkey = t.keys[3].pubkey), n
            );
          }
          static decodeAuthorizeWithSeed(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
            const {
                newAuthorized: e,
                stakeAuthorizationType: r,
                authoritySeed: n,
                authorityOwner: i,
              } = ri(Us.AuthorizeWithSeed, t.data),
              o = {
                stakePubkey: t.keys[0].pubkey,
                authorityBase: t.keys[1].pubkey,
                authoritySeed: n,
                authorityOwner: new ln(i),
                newAuthorizedPubkey: new ln(e),
                stakeAuthorizationType: { index: r },
              };
            return (
              t.keys.length > 3 && (o.custodianPubkey = t.keys[3].pubkey), o
            );
          }
          static decodeSplit(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const { lamports: e } = ri(Us.Split, t.data);
            return {
              stakePubkey: t.keys[0].pubkey,
              splitStakePubkey: t.keys[1].pubkey,
              authorizedPubkey: t.keys[2].pubkey,
              lamports: e,
            };
          }
          static decodeMerge(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeyLength(t.keys, 3),
              ri(Us.Merge, t.data),
              {
                stakePubkey: t.keys[0].pubkey,
                sourceStakePubKey: t.keys[1].pubkey,
                authorizedPubkey: t.keys[4].pubkey,
              }
            );
          }
          static decodeWithdraw(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 5);
            const { lamports: e } = ri(Us.Withdraw, t.data),
              r = {
                stakePubkey: t.keys[0].pubkey,
                toPubkey: t.keys[1].pubkey,
                authorizedPubkey: t.keys[4].pubkey,
                lamports: e,
              };
            return (
              t.keys.length > 5 && (r.custodianPubkey = t.keys[5].pubkey), r
            );
          }
          static decodeDeactivate(t) {
            return (
              this.checkProgramId(t.programId),
              this.checkKeyLength(t.keys, 3),
              ri(Us.Deactivate, t.data),
              {
                stakePubkey: t.keys[0].pubkey,
                authorizedPubkey: t.keys[2].pubkey,
              }
            );
          }
          static checkProgramId(t) {
            if (!t.equals(Ws.programId))
              throw new Error(
                "invalid instruction; programId is not StakeProgram"
              );
          }
          static checkKeyLength(t, e) {
            if (t.length < e)
              throw new Error(
                `invalid instruction; found ${t.length} keys, expected at least ${e}`
              );
          }
        }
        const Us = Object.freeze({
            Initialize: {
              index: 0,
              layout: Be.w3([
                Be.DH("instruction"),
                ((t = "authorized") =>
                  Be.w3([vn("staker"), vn("withdrawer")], t))(),
                ((t = "lockup") =>
                  Be.w3(
                    [Be.Wg("unixTimestamp"), Be.Wg("epoch"), vn("custodian")],
                    t
                  ))(),
              ]),
            },
            Authorize: {
              index: 1,
              layout: Be.w3([
                Be.DH("instruction"),
                vn("newAuthorized"),
                Be.DH("stakeAuthorizationType"),
              ]),
            },
            Delegate: { index: 2, layout: Be.w3([Be.DH("instruction")]) },
            Split: {
              index: 3,
              layout: Be.w3([Be.DH("instruction"), Be.Wg("lamports")]),
            },
            Withdraw: {
              index: 4,
              layout: Be.w3([Be.DH("instruction"), Be.Wg("lamports")]),
            },
            Deactivate: { index: 5, layout: Be.w3([Be.DH("instruction")]) },
            Merge: { index: 7, layout: Be.w3([Be.DH("instruction")]) },
            AuthorizeWithSeed: {
              index: 8,
              layout: Be.w3([
                Be.DH("instruction"),
                vn("newAuthorized"),
                Be.DH("stakeAuthorizationType"),
                In("authoritySeed"),
                vn("authorityOwner"),
              ]),
            },
          }),
          Ns = Object.freeze({
            Staker: { index: 0 },
            Withdrawer: { index: 1 },
          });
        class Ws {
          constructor() {}
          static initialize(t) {
            const { stakePubkey: e, authorized: r, lockup: n } = t,
              i = n || Cs.default,
              o = ei(Us.Initialize, {
                authorized: {
                  staker: rn(r.staker.toBuffer()),
                  withdrawer: rn(r.withdrawer.toBuffer()),
                },
                lockup: {
                  unixTimestamp: i.unixTimestamp,
                  epoch: i.epoch,
                  custodian: rn(i.custodian.toBuffer()),
                },
              }),
              s = {
                keys: [
                  { pubkey: e, isSigner: !1, isWritable: !0 },
                  { pubkey: jn, isSigner: !1, isWritable: !1 },
                ],
                programId: this.programId,
                data: o,
              };
            return new Un(s);
          }
          static createAccountWithSeed(t) {
            const e = new Nn();
            e.add(
              hi.createAccountWithSeed({
                fromPubkey: t.fromPubkey,
                newAccountPubkey: t.stakePubkey,
                basePubkey: t.basePubkey,
                seed: t.seed,
                lamports: t.lamports,
                space: this.space,
                programId: this.programId,
              })
            );
            const { stakePubkey: r, authorized: n, lockup: i } = t;
            return e.add(
              this.initialize({ stakePubkey: r, authorized: n, lockup: i })
            );
          }
          static createAccount(t) {
            const e = new Nn();
            e.add(
              hi.createAccount({
                fromPubkey: t.fromPubkey,
                newAccountPubkey: t.stakePubkey,
                lamports: t.lamports,
                space: this.space,
                programId: this.programId,
              })
            );
            const { stakePubkey: r, authorized: n, lockup: i } = t;
            return e.add(
              this.initialize({ stakePubkey: r, authorized: n, lockup: i })
            );
          }
          static delegate(t) {
            const { stakePubkey: e, authorizedPubkey: r, votePubkey: n } = t,
              i = ei(Us.Delegate);
            return new Nn().add({
              keys: [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: n, isSigner: !1, isWritable: !1 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
                { pubkey: Yn, isSigner: !1, isWritable: !1 },
                { pubkey: Os, isSigner: !1, isWritable: !1 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: i,
            });
          }
          static authorize(t) {
            const {
                stakePubkey: e,
                authorizedPubkey: r,
                newAuthorizedPubkey: n,
                stakeAuthorizationType: i,
                custodianPubkey: o,
              } = t,
              s = ei(Us.Authorize, {
                newAuthorized: rn(n.toBuffer()),
                stakeAuthorizationType: i.index,
              }),
              a = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: qn, isSigner: !1, isWritable: !0 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ];
            return (
              o && a.push({ pubkey: o, isSigner: !0, isWritable: !1 }),
              new Nn().add({ keys: a, programId: this.programId, data: s })
            );
          }
          static authorizeWithSeed(t) {
            const {
                stakePubkey: e,
                authorityBase: r,
                authoritySeed: n,
                authorityOwner: i,
                newAuthorizedPubkey: o,
                stakeAuthorizationType: s,
                custodianPubkey: a,
              } = t,
              c = ei(Us.AuthorizeWithSeed, {
                newAuthorized: rn(o.toBuffer()),
                stakeAuthorizationType: s.index,
                authoritySeed: n,
                authorityOwner: rn(i.toBuffer()),
              }),
              u = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
              ];
            return (
              a && u.push({ pubkey: a, isSigner: !0, isWritable: !1 }),
              new Nn().add({ keys: u, programId: this.programId, data: c })
            );
          }
          static splitInstruction(t) {
            const {
                stakePubkey: e,
                authorizedPubkey: r,
                splitStakePubkey: n,
                lamports: i,
              } = t,
              o = ei(Us.Split, { lamports: i });
            return new Un({
              keys: [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: n, isSigner: !1, isWritable: !0 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: o,
            });
          }
          static split(t, e) {
            const r = new Nn();
            return (
              r.add(
                hi.createAccount({
                  fromPubkey: t.authorizedPubkey,
                  newAccountPubkey: t.splitStakePubkey,
                  lamports: e,
                  space: this.space,
                  programId: this.programId,
                })
              ),
              r.add(this.splitInstruction(t))
            );
          }
          static splitWithSeed(t, e) {
            const {
                stakePubkey: r,
                authorizedPubkey: n,
                splitStakePubkey: i,
                basePubkey: o,
                seed: s,
                lamports: a,
              } = t,
              c = new Nn();
            return (
              c.add(
                hi.allocate({
                  accountPubkey: i,
                  basePubkey: o,
                  seed: s,
                  space: this.space,
                  programId: this.programId,
                })
              ),
              e &&
                e > 0 &&
                c.add(
                  hi.transfer({
                    fromPubkey: t.authorizedPubkey,
                    toPubkey: i,
                    lamports: e,
                  })
                ),
              c.add(
                this.splitInstruction({
                  stakePubkey: r,
                  authorizedPubkey: n,
                  splitStakePubkey: i,
                  lamports: a,
                })
              )
            );
          }
          static merge(t) {
            const {
                stakePubkey: e,
                sourceStakePubKey: r,
                authorizedPubkey: n,
              } = t,
              i = ei(Us.Merge);
            return new Nn().add({
              keys: [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: r, isSigner: !1, isWritable: !0 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
                { pubkey: Yn, isSigner: !1, isWritable: !1 },
                { pubkey: n, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: i,
            });
          }
          static withdraw(t) {
            const {
                stakePubkey: e,
                authorizedPubkey: r,
                toPubkey: n,
                lamports: i,
                custodianPubkey: o,
              } = t,
              s = ei(Us.Withdraw, { lamports: i }),
              a = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: n, isSigner: !1, isWritable: !0 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
                { pubkey: Yn, isSigner: !1, isWritable: !1 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ];
            return (
              o && a.push({ pubkey: o, isSigner: !0, isWritable: !1 }),
              new Nn().add({ keys: a, programId: this.programId, data: s })
            );
          }
          static deactivate(t) {
            const { stakePubkey: e, authorizedPubkey: r } = t,
              n = ei(Us.Deactivate);
            return new Nn().add({
              keys: [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: n,
            });
          }
        }
        (Ws.programId = new ln("Stake11111111111111111111111111111111111111")),
          (Ws.space = 200);
        class Ks {
          constructor(t, e, r, n) {
            (this.nodePubkey = void 0),
              (this.authorizedVoter = void 0),
              (this.authorizedWithdrawer = void 0),
              (this.commission = void 0),
              (this.nodePubkey = t),
              (this.authorizedVoter = e),
              (this.authorizedWithdrawer = r),
              (this.commission = n);
          }
        }
        class qs {
          constructor() {}
          static decodeInstructionType(t) {
            this.checkProgramId(t.programId);
            const e = Be.DH("instruction").decode(t.data);
            let r;
            for (const [t, n] of Object.entries(Ds))
              if (n.index == e) {
                r = t;
                break;
              }
            if (!r)
              throw new Error(
                "Instruction type incorrect; not a VoteInstruction"
              );
            return r;
          }
          static decodeInitializeAccount(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 4);
            const { voteInit: e } = ri(Ds.InitializeAccount, t.data);
            return {
              votePubkey: t.keys[0].pubkey,
              nodePubkey: t.keys[3].pubkey,
              voteInit: new Ks(
                new ln(e.nodePubkey),
                new ln(e.authorizedVoter),
                new ln(e.authorizedWithdrawer),
                e.commission
              ),
            };
          }
          static decodeAuthorize(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const { newAuthorized: e, voteAuthorizationType: r } = ri(
              Ds.Authorize,
              t.data
            );
            return {
              votePubkey: t.keys[0].pubkey,
              authorizedPubkey: t.keys[2].pubkey,
              newAuthorizedPubkey: new ln(e),
              voteAuthorizationType: { index: r },
            };
          }
          static decodeAuthorizeWithSeed(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const {
              voteAuthorizeWithSeedArgs: {
                currentAuthorityDerivedKeyOwnerPubkey: e,
                currentAuthorityDerivedKeySeed: r,
                newAuthorized: n,
                voteAuthorizationType: i,
              },
            } = ri(Ds.AuthorizeWithSeed, t.data);
            return {
              currentAuthorityDerivedKeyBasePubkey: t.keys[2].pubkey,
              currentAuthorityDerivedKeyOwnerPubkey: new ln(e),
              currentAuthorityDerivedKeySeed: r,
              newAuthorizedPubkey: new ln(n),
              voteAuthorizationType: { index: i },
              votePubkey: t.keys[0].pubkey,
            };
          }
          static decodeWithdraw(t) {
            this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
            const { lamports: e } = ri(Ds.Withdraw, t.data);
            return {
              votePubkey: t.keys[0].pubkey,
              authorizedWithdrawerPubkey: t.keys[2].pubkey,
              lamports: e,
              toPubkey: t.keys[1].pubkey,
            };
          }
          static checkProgramId(t) {
            if (!t.equals(Fs.programId))
              throw new Error(
                "invalid instruction; programId is not VoteProgram"
              );
          }
          static checkKeyLength(t, e) {
            if (t.length < e)
              throw new Error(
                `invalid instruction; found ${t.length} keys, expected at least ${e}`
              );
          }
        }
        const Ds = Object.freeze({
            InitializeAccount: {
              index: 0,
              layout: Be.w3([
                Be.DH("instruction"),
                ((t = "voteInit") =>
                  Be.w3(
                    [
                      vn("nodePubkey"),
                      vn("authorizedVoter"),
                      vn("authorizedWithdrawer"),
                      Be.u8("commission"),
                    ],
                    t
                  ))(),
              ]),
            },
            Authorize: {
              index: 1,
              layout: Be.w3([
                Be.DH("instruction"),
                vn("newAuthorized"),
                Be.DH("voteAuthorizationType"),
              ]),
            },
            Withdraw: {
              index: 3,
              layout: Be.w3([Be.DH("instruction"), Be.Wg("lamports")]),
            },
            UpdateValidatorIdentity: {
              index: 4,
              layout: Be.w3([Be.DH("instruction")]),
            },
            AuthorizeWithSeed: {
              index: 10,
              layout: Be.w3([
                Be.DH("instruction"),
                ((t = "voteAuthorizeWithSeedArgs") =>
                  Be.w3(
                    [
                      Be.DH("voteAuthorizationType"),
                      vn("currentAuthorityDerivedKeyOwnerPubkey"),
                      In("currentAuthorityDerivedKeySeed"),
                      vn("newAuthorized"),
                    ],
                    t
                  ))(),
              ]),
            },
          }),
          Hs = Object.freeze({ Voter: { index: 0 }, Withdrawer: { index: 1 } });
        class Fs {
          constructor() {}
          static initializeAccount(t) {
            const { votePubkey: e, nodePubkey: r, voteInit: n } = t,
              i = ei(Ds.InitializeAccount, {
                voteInit: {
                  nodePubkey: rn(n.nodePubkey.toBuffer()),
                  authorizedVoter: rn(n.authorizedVoter.toBuffer()),
                  authorizedWithdrawer: rn(n.authorizedWithdrawer.toBuffer()),
                  commission: n.commission,
                },
              }),
              o = {
                keys: [
                  { pubkey: e, isSigner: !1, isWritable: !0 },
                  { pubkey: jn, isSigner: !1, isWritable: !1 },
                  { pubkey: qn, isSigner: !1, isWritable: !1 },
                  { pubkey: r, isSigner: !0, isWritable: !1 },
                ],
                programId: this.programId,
                data: i,
              };
            return new Un(o);
          }
          static createAccount(t) {
            const e = new Nn();
            return (
              e.add(
                hi.createAccount({
                  fromPubkey: t.fromPubkey,
                  newAccountPubkey: t.votePubkey,
                  lamports: t.lamports,
                  space: this.space,
                  programId: this.programId,
                })
              ),
              e.add(
                this.initializeAccount({
                  votePubkey: t.votePubkey,
                  nodePubkey: t.voteInit.nodePubkey,
                  voteInit: t.voteInit,
                })
              )
            );
          }
          static authorize(t) {
            const {
                votePubkey: e,
                authorizedPubkey: r,
                newAuthorizedPubkey: n,
                voteAuthorizationType: i,
              } = t,
              o = ei(Ds.Authorize, {
                newAuthorized: rn(n.toBuffer()),
                voteAuthorizationType: i.index,
              }),
              s = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ];
            return new Nn().add({
              keys: s,
              programId: this.programId,
              data: o,
            });
          }
          static authorizeWithSeed(t) {
            const {
                currentAuthorityDerivedKeyBasePubkey: e,
                currentAuthorityDerivedKeyOwnerPubkey: r,
                currentAuthorityDerivedKeySeed: n,
                newAuthorizedPubkey: i,
                voteAuthorizationType: o,
                votePubkey: s,
              } = t,
              a = ei(Ds.AuthorizeWithSeed, {
                voteAuthorizeWithSeedArgs: {
                  currentAuthorityDerivedKeyOwnerPubkey: rn(r.toBuffer()),
                  currentAuthorityDerivedKeySeed: n,
                  newAuthorized: rn(i.toBuffer()),
                  voteAuthorizationType: o.index,
                },
              }),
              c = [
                { pubkey: s, isSigner: !1, isWritable: !0 },
                { pubkey: qn, isSigner: !1, isWritable: !1 },
                { pubkey: e, isSigner: !0, isWritable: !1 },
              ];
            return new Nn().add({
              keys: c,
              programId: this.programId,
              data: a,
            });
          }
          static withdraw(t) {
            const {
                votePubkey: e,
                authorizedWithdrawerPubkey: r,
                lamports: n,
                toPubkey: i,
              } = t,
              o = ei(Ds.Withdraw, { lamports: n }),
              s = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: i, isSigner: !1, isWritable: !0 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ];
            return new Nn().add({
              keys: s,
              programId: this.programId,
              data: o,
            });
          }
          static safeWithdraw(t, e, r) {
            if (t.lamports > e - r)
              throw new Error(
                "Withdraw will leave vote account with insufficient funds."
              );
            return Fs.withdraw(t);
          }
          static updateValidatorIdentity(t) {
            const {
                votePubkey: e,
                authorizedWithdrawerPubkey: r,
                nodePubkey: n,
              } = t,
              i = ei(Ds.UpdateValidatorIdentity),
              o = [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: n, isSigner: !0, isWritable: !1 },
                { pubkey: r, isSigner: !0, isWritable: !1 },
              ];
            return new Nn().add({
              keys: o,
              programId: this.programId,
              data: i,
            });
          }
        }
        (Fs.programId = new ln("Vote111111111111111111111111111111111111111")),
          (Fs.space = 3762);
        const js = new ln("Va1idator1nfo111111111111111111111111111111"),
          $s = Xe({
            name: Ze(),
            website: Ge(Ze()),
            details: Ge(Ze()),
            iconUrl: Ge(Ze()),
            keybaseUsername: Ge(Ze()),
          });
        class Vs {
          constructor(t, e) {
            (this.key = void 0),
              (this.info = void 0),
              (this.key = t),
              (this.info = e);
          }
          static fromConfigData(t) {
            let r = [...t];
            if (2 !== En(r)) return null;
            const n = [];
            for (let t = 0; t < 2; t++) {
              const t = new ln(Rn(r, 0, un)),
                e = 1 === Pn(r);
              n.push({ publicKey: t, isSigner: e });
            }
            if (n[0].publicKey.equals(js) && n[1].isSigner) {
              const t = In().decode(e.Buffer.from(r)),
                i = JSON.parse(t);
              return Ue(i, $s), new Vs(n[1].publicKey, i);
            }
            return null;
          }
        }
        const Gs = new ln("Vote111111111111111111111111111111111111111"),
          Ys = Be.w3([
            vn("nodePubkey"),
            vn("authorizedWithdrawer"),
            Be.u8("commission"),
            Be.I0(),
            Be.O6(
              Be.w3([Be.I0("slot"), Be.DH("confirmationCount")]),
              Be.cY(Be.DH(), -8),
              "votes"
            ),
            Be.u8("rootSlotValid"),
            Be.I0("rootSlot"),
            Be.I0(),
            Be.O6(
              Be.w3([Be.I0("epoch"), vn("authorizedVoter")]),
              Be.cY(Be.DH(), -8),
              "authorizedVoters"
            ),
            Be.w3(
              [
                Be.O6(
                  Be.w3([
                    vn("authorizedPubkey"),
                    Be.I0("epochOfLastAuthorizedSwitch"),
                    Be.I0("targetEpoch"),
                  ]),
                  32,
                  "buf"
                ),
                Be.I0("idx"),
                Be.u8("isEmpty"),
              ],
              "priorVoters"
            ),
            Be.I0(),
            Be.O6(
              Be.w3([Be.I0("epoch"), Be.I0("credits"), Be.I0("prevCredits")]),
              Be.cY(Be.DH(), -8),
              "epochCredits"
            ),
            Be.w3([Be.I0("slot"), Be.I0("timestamp")], "lastTimestamp"),
          ]);
        class Zs {
          constructor(t) {
            (this.nodePubkey = void 0),
              (this.authorizedWithdrawer = void 0),
              (this.commission = void 0),
              (this.rootSlot = void 0),
              (this.votes = void 0),
              (this.authorizedVoters = void 0),
              (this.priorVoters = void 0),
              (this.epochCredits = void 0),
              (this.lastTimestamp = void 0),
              (this.nodePubkey = t.nodePubkey),
              (this.authorizedWithdrawer = t.authorizedWithdrawer),
              (this.commission = t.commission),
              (this.rootSlot = t.rootSlot),
              (this.votes = t.votes),
              (this.authorizedVoters = t.authorizedVoters),
              (this.priorVoters = t.priorVoters),
              (this.epochCredits = t.epochCredits),
              (this.lastTimestamp = t.lastTimestamp);
          }
          static fromAccountData(t) {
            const e = Ys.decode(rn(t), 4);
            let r = e.rootSlot;
            return (
              e.rootSlotValid || (r = null),
              new Zs({
                nodePubkey: new ln(e.nodePubkey),
                authorizedWithdrawer: new ln(e.authorizedWithdrawer),
                commission: e.commission,
                votes: e.votes,
                rootSlot: r,
                authorizedVoters: e.authorizedVoters.map(Js),
                priorVoters: Qs(e.priorVoters),
                epochCredits: e.epochCredits,
                lastTimestamp: e.lastTimestamp,
              })
            );
          }
        }
        function Js({ authorizedVoter: t, epoch: e }) {
          return { epoch: e, authorizedVoter: new ln(t) };
        }
        function Xs({
          authorizedPubkey: t,
          epochOfLastAuthorizedSwitch: e,
          targetEpoch: r,
        }) {
          return {
            authorizedPubkey: new ln(t),
            epochOfLastAuthorizedSwitch: e,
            targetEpoch: r,
          };
        }
        function Qs({ buf: t, idx: e, isEmpty: r }) {
          return r ? [] : [...t.slice(e + 1).map(Xs), ...t.slice(0, e).map(Xs)];
        }
        const ta = {
          http: {
            devnet: "http://api.devnet.solana.com",
            testnet: "http://api.testnet.solana.com",
            "mainnet-beta": "http://api.mainnet-beta.solana.com/",
          },
          https: {
            devnet: "https://api.devnet.solana.com",
            testnet: "https://api.testnet.solana.com",
            "mainnet-beta": "https://api.mainnet-beta.solana.com/",
          },
        };
        function ea(t, e) {
          const r = !1 === e ? "http" : "https";
          if (!t) return ta[r].devnet;
          const n = ta[r][t];
          if (!n) throw new Error(`Unknown ${r} cluster: ${t}`);
          return n;
        }
        async function ra(t, e, r, n) {
          let i, o;
          (r &&
            Object.prototype.hasOwnProperty.call(r, "lastValidBlockHeight")) ||
          (r && Object.prototype.hasOwnProperty.call(r, "nonceValue"))
            ? ((i = r), (o = n))
            : (o = r);
          const s = o && {
              skipPreflight: o.skipPreflight,
              preflightCommitment: o.preflightCommitment || o.commitment,
              minContextSlot: o.minContextSlot,
            },
            a = await t.sendRawTransaction(e, s),
            c = o && o.commitment,
            u = i ? t.confirmTransaction(i, c) : t.confirmTransaction(a, c),
            h = (await u).value;
          if (h.err) {
            if (null != a)
              throw new Zn({
                action: s?.skipPreflight ? "send" : "simulate",
                signature: a,
                transactionMessage: `Status: (${JSON.stringify(h)})`,
              });
            throw new Error(
              `Raw transaction ${a} failed (${JSON.stringify(h)})`
            );
          }
          return a;
        }
        const na = 1e9;
      })(),
      n
    );
  })()
);
