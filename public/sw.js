if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let i={};const t=e=>a(e,r),f={module:{uri:r},exports:i,require:t};s[r]=Promise.all(n.map((e=>f[e]||t(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback--rw13-WgyPHUF0ehWp6YL.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_DSC0593.jpg",revision:"75b562d1fac9200f054b1dfb0dec2ea9"},{url:"/_next/static/-rw13-WgyPHUF0ehWp6YL/_buildManifest.js",revision:"a5547024ce3f7fc869efcf4880d18897"},{url:"/_next/static/-rw13-WgyPHUF0ehWp6YL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/243-792ecda8138ccb84.js",revision:"792ecda8138ccb84"},{url:"/_next/static/chunks/314.12c26c396d7cdda3.js",revision:"12c26c396d7cdda3"},{url:"/_next/static/chunks/framework-3b5a00d5d7e8d93b.js",revision:"3b5a00d5d7e8d93b"},{url:"/_next/static/chunks/main-dd460d82caf51960.js",revision:"dd460d82caf51960"},{url:"/_next/static/chunks/pages/_app-2ef8230227d6f933.js",revision:"2ef8230227d6f933"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/_offline-349736e073723b0d.js",revision:"349736e073723b0d"},{url:"/_next/static/chunks/pages/about-59e374de533a095b.js",revision:"59e374de533a095b"},{url:"/_next/static/chunks/pages/article/%5Bslug%5D-4f0d93c88b42249e.js",revision:"4f0d93c88b42249e"},{url:"/_next/static/chunks/pages/index-7f70a6a7ddf25502.js",revision:"7f70a6a7ddf25502"},{url:"/_next/static/chunks/pages/tags-4cdeb73b39f1f96e.js",revision:"4cdeb73b39f1f96e"},{url:"/_next/static/chunks/pages/tags/%5Bslug%5D-b678d868ce2f52f9.js",revision:"b678d868ce2f52f9"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5ea92380975689e0.js",revision:"5ea92380975689e0"},{url:"/_next/static/css/1f99db241cfe37f8.css",revision:"1f99db241cfe37f8"},{url:"/_next/static/css/95473c2451f97b99.css",revision:"95473c2451f97b99"},{url:"/_next/static/media/1c57ca6f5208a29b.woff2",revision:"491a7a9678c3cfd4f86c092c68480f23"},{url:"/_next/static/media/1c7891915988af4b.p.woff2",revision:"e729424846b8864cfccf2e2ec81cfaf0"},{url:"/_next/static/media/3dbd163d3bb09d47.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"/_next/static/media/5647e4c23315a2d2.woff2",revision:"e64969a373d0acf2586d1fd4224abb90"},{url:"/_next/static/media/7864201b4d23626f.woff2",revision:"8420fa6c7b117933cb2f989ba13d19e2"},{url:"/_next/static/media/7be645d133f3ee22.woff2",revision:"3ba6fb27a0ea92c2f1513add6dbddf37"},{url:"/_next/static/media/7c53f7419436e04b.woff2",revision:"fd4ff709e3581e3f62e40e90260a1ad7"},{url:"/_next/static/media/8583febc9adfe82d.woff2",revision:"b778a63e24cc56b81a3256cc368540a4"},{url:"/_next/static/media/934c4b7cb736f2a3.p.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"/_next/static/media/c715b282a4d3f16b.woff2",revision:"4ff0dff9b7e1561714b7d07c8c7a88ff"},{url:"/_next/static/media/cff529cd86cc0276.woff2",revision:"c2b2c28b98016afb2cb7e029c23f1f9f"},{url:"/_next/static/media/e16c43042232fcc3.woff2",revision:"b52e5ee4f7073ada4f000abf94ca7828"},{url:"/_next/static/media/fbfa9aa84c9b2656.woff2",revision:"a715d870449fc22ffd33e6f610fa60d6"},{url:"/_offline",revision:"-rw13-WgyPHUF0ehWp6YL"},{url:"/android-chrome-192x192.png",revision:"e132afeca3248856d5d27e555c6db612"},{url:"/android-chrome-512x512.png",revision:"b8f15d6aa1c1f552c4eea17013fa7ca0"},{url:"/android-chrome-96x96.png",revision:"abcf42facdd4f3b5edfc30f385d7cc64"},{url:"/apple-touch-icon.png",revision:"32d394b1592de6819ba1a9ff38bba410"},{url:"/browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"/favicon-16x16.png",revision:"eb6ff3dcf95d0ca09760a86dd7595346"},{url:"/favicon-32x32.png",revision:"ca428a8871366159a7f54c204004ef4c"},{url:"/favicon.ico",revision:"6ec65e366261f68c1dabae235273e9ce"},{url:"/logo.png",revision:"dd2f0721602a2624963129a9d88d55fd"},{url:"/manifest.json",revision:"7a20b55c3d0fbcd252686d7925d5a95f"},{url:"/mstile-150x150.png",revision:"6ebad1beeb66b609cee2caa7715835c7"},{url:"/safari-pinned-tab.svg",revision:"5ee6bd205060ff8b4bdde559a3fa7206"},{url:"/salesforce-trekken-cms-migration-tool/authentication.png",revision:"7ce5c5812d613646ce90fc794bbf9ff1"},{url:"/salesforce-trekken-cms-migration-tool/banner.png",revision:"b1d548701762ac81f23922a1b14d773b"},{url:"/salesforce-trekken-cms-migration-tool/logo.png",revision:"5f22dfa5bf47487c2d1f0b7f02d0ff69"},{url:"/salesforce-trekken-cms-migration-tool/select-an-org.png",revision:"acf5f15a1c4d2f6f50e0fac44eef6515"},{url:"/salesforce-trekken-cms-migration-tool/select-channel.png",revision:"c2c6fb5a10b8feedc20a9d832ca82687"},{url:"/salesforce-trekken-cms-migration-tool/select-cms-content.png",revision:"cf57082a31086e760180cca99f0f4c95"},{url:"/salesforce-trekken-cms-migration-tool/select-output-folder.png",revision:"4c74a14532cef208f2cf9767d57b8145"},{url:"/salesforce-trekken-cms-migration-tool/success.png",revision:"927608fe911bb0d4a6e6bf3588d2a70d"},{url:"/site.webmanifest",revision:"78faf3f5ade4df057b2232c201cb8536"},{url:"/thumbnail.png",revision:"138ee19ae6654d503ba0c1768d5738c5"},{url:"/~partytown/debug/partytown-atomics.js",revision:"2ef05db3d9650aae081f9fc8b4f2c19b"},{url:"/~partytown/debug/partytown-media.js",revision:"23baa17799cba65ea3355951eb54bec3"},{url:"/~partytown/debug/partytown-sandbox-sw.js",revision:"e516dfa8fb868943f64cfa3e5281591b"},{url:"/~partytown/debug/partytown-sw.js",revision:"09a6fcf78fd869eb9854e645eeb6801e"},{url:"/~partytown/debug/partytown-ww-atomics.js",revision:"79655ca9e435dcef483f6964071ab49f"},{url:"/~partytown/debug/partytown-ww-sw.js",revision:"958e04f2971fbfdcbbf7b3175f6d60c1"},{url:"/~partytown/debug/partytown.js",revision:"32b905015e618ddd77941cecc9074dc3"},{url:"/~partytown/partytown-atomics.js",revision:"66f62979427d2859f84a72b298f78739"},{url:"/~partytown/partytown-media.js",revision:"e34f309119849d37cd68e93602e0ba41"},{url:"/~partytown/partytown-sw.js",revision:"f1669f3ac6efe307e98c1622af446286"},{url:"/~partytown/partytown.js",revision:"45bf34cb51d74a577b792436f74016b2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
