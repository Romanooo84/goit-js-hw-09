function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=o.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){n[e]=o},o.parcelRequired7c6=i);var r=i("1GAPJ");let a,l,s;e(r).Notify.init({width:"300px",position:"right-top",distance:"40px",opacity:1,borderRadius:"5px",timeout:5e3,cssAnimation:!0,cssAnimationDuration:700,cssAnimationStyle:"zoom",useIcon:!0,warning:{background:"#ff5549",textColor:"#fff",childClassName:"notiflix-notify-warning",notiflixIconColor:"rgba(0,0,0,0.2)",fontAwesomeClassName:"fas fa-exclamation-circle",fontAwesomeIconColor:"rgba(0,0,0,0.2)",backOverlayColor:"rgba(238,191,49,0.2)"},success:{background:"#32c682",textColor:"#fff",childClassName:"notiflix-notify-success",notiflixIconColor:"rgba(0,0,0,0.2)",fontAwesomeClassName:"fas fa-check-circle",fontAwesomeIconColor:"rgba(0,0,0,0.2)",backOverlayColor:"rgba(50,198,130,0.2)"}});let c=document.querySelector("button");function f(e,o){return Math.random()>.3?Promise.resolve({position:e,delay:o}):Promise.reject({position:e,delay:o})}document.addEventListener("input",(function(e){e.preventDefault();const o=e.target.name;"delay"===o?a=parseInt(e.target.value):"step"===o?l=parseInt(e.target.value):"amount"===o&&(s=parseInt(e.target.value))})),c.addEventListener("click",(function(o){o.preventDefault();for(let o=1;o<=s;o+=1){let t=1===o?a:a+(o-1)*l;setTimeout((()=>{f(o,t).then((({position:o,delay:t})=>{e(r).Notify.success(`✅ Fulfilled promise ${o} in ${t}ms`)})).catch((({position:o,delay:t})=>{e(r).Notify.warning(`❌ Rejected promise ${o} in ${t}ms`)}))}),t)}}));
//# sourceMappingURL=03-promises.eea910f6.js.map
