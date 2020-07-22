// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"styles/login-signup.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"login.js":[function(require,module,exports) {
"use strict";

require("./styles/login-signup.scss");

window.addEventListener('load', function () {
  if (document.getElementById('btnSubmitLogin')) {
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('password').addEventListener('blur', validPassword);
    document.getElementById('btnSubmitLogin').addEventListener('click', validateLogIn);
  }
});
var email;

function validateEmail(event) {
  email = event.target;
  var regxEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  var textEmail = document.getElementById("textEmail");

  if (email.value != '') {
    if (email.value.length >= 3) {
      if (email.value.match(regxEmail)) {
        textEmail.textContent = 'Valid email.';
        textEmail.style.color = "green";
      } else {
        textEmail.textContent = 'Your email has to include only letters, numbers, special symbols and @ symbol.';
        textEmail.style.color = "red";
        formIsValid = false;
      }
    } else {
      textEmail.textContent = 'your email is less than 3 chracters';
      textEmail.style.color = "red";
      formIsValid = false;
    }
  } else {
    textEmail.textContent = 'Please, fill the field !';
    textEmail.style.color = "red";
    formIsValid = false;
  }
}

var inputPass;

function validPassword(event) {
  inputPass = event.target;
  var regxPass = /^(?=.*\.)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var textPassword = document.getElementById("textPassword");

  if (inputPass.value != '') {
    if (inputPass.value.length >= 8) {
      if (inputPass.value.match(regxPass)) {
        textPassword.textContent = 'Valid password.';
        textPassword.style.color = "green";
      } else {
        textPassword.textContent = 'Your password has to include Uppercase letters: A-Z, Lowercase letters: a-z. Numbers: 0-9 and special symbols.';
        textPassword.style.color = "red";
        formIsValid = false;
      }
    } else {
      textPassword.textContent = 'Your password is less than 8 chracters';
      textPassword.style.color = "red";
      formIsValid = false;
    }
  } else {
    textPassword.textContent = 'Please, fill the field !';
    textPassword.style.color = "red";
    formIsValid = false;
  }
}

var formIsValid = true;
var formvalid;

function validateLogIn(event) {
  formvalid = formIsValid;
  formvalid = event.target;
  formvalid = formIsValid;

  if (formIsValid != true) {
    event.preventDefault();
  } else {
    document.getElementById('btnSubmitLogin').removeEventListener('click', validateLogIn);
    document.forms["myFormLogin"].submit();
    location.reload();
  }
}

console.log("LOGIN");
},{"./styles/login-signup.scss":"styles/login-signup.scss"}],"signup.js":[function(require,module,exports) {
"use strict";

require("./styles/login-signup.scss");

console.log('SIGNUP');
window.addEventListener('load', function () {
  if (document.getElementById('btnSubmit')) {
    document.getElementById('emailSignup').addEventListener('blur', validateEmailSignup);
    document.getElementById('passwordSignup').addEventListener('blur', validPasswordSignup);
    document.getElementById('confirmPasswordSignup').addEventListener('blur', validConfirmPasswordSignup);
    document.getElementById('btnSubmit').addEventListener('click', validate);
  }
});
var email;

function validateEmailSignup(event) {
  email = event.target;
  var regxEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  var textEmail = document.getElementById("textEmail");

  if (email.value != '') {
    if (email.value.length >= 3) {
      if (email.value.match(regxEmail)) {
        textEmail.textContent = 'Valid email.';
        textEmail.style.color = "green";
      } else {
        textEmail.textContent = 'Your email has to include only letters, numbers, special symbols and @ symbol.';
        textEmail.style.color = "red";
        formIsValid = false;
      }
    } else {
      textEmail.textContent = 'your email is less than 3 chracters';
      textEmail.style.color = "red";
      formIsValid = false;
    }
  } else {
    textEmail.textContent = 'Please, fill the field !';
    textEmail.style.color = "red";
    formIsValid = false;
  }
}

var inputPass;

function validPasswordSignup(event) {
  inputPass = event.target;
  var regxPass = /^(?=.*\.)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var textPassword = document.getElementById("textPassword");

  if (inputPass.value != '') {
    if (inputPass.value.length >= 8) {
      if (inputPass.value.match(regxPass)) {
        textPassword.textContent = 'Valid password.';
        textPassword.style.color = "green";
      } else {
        textPassword.textContent = 'Your password has to include Uppercase letters: A-Z, Lowercase letters: a-z. Numbers: 0-9 and special symbols.';
        textPassword.style.color = "red";
        formIsValid = false;
      }
    } else {
      textPassword.textContent = 'Your password is less than 8 chracters';
      textPassword.style.color = "red";
      formIsValid = false;
    }
  } else {
    textPassword.textContent = 'Please, fill the field !';
    textPassword.style.color = "red";
    formIsValid = false;
  }
}

var confirmPass;

function validConfirmPasswordSignup(event) {
  confirmPass = event.target;

  if (confirmPass.value != '') {
    if (confirmPass.value != inputPass.value) {
      document.getElementById('textConfirmPassword').innerHTML = 'Not matching,please try again.';
      document.getElementById('textConfirmPassword').style = "color: red";
      formIsValid = false;
    } else {
      document.getElementById('textConfirmPassword').innerHTML = 'Matching';
      document.getElementById('textConfirmPassword').style = 'color:green';
    }
  } else {
    document.getElementById('textConfirmPassword').innerHTML = 'Please, fill the field';
    document.getElementById('textConfirmPassword').style = "color: red";
    formIsValid = false;
  }
}

var formIsValid = true;
var formvalid;

function validate(event) {
  formvalid = formIsValid;
  formvalid = event.target;
  formvalid = formIsValid;

  if (formIsValid != true) {
    event.preventDefault();
  } else {
    document.getElementById('btnSubmit').removeEventListener('click', validate);
    document.forms["myForm"].submit();
    location.reload();
  }
}
},{"./styles/login-signup.scss":"styles/login-signup.scss"}],"styles/movies.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"movies.js":[function(require,module,exports) {
"use strict";

require("./styles/movies.scss");

window.addEventListener('load', function () {
  document.getElementById('searchField').addEventListener('keypress', searchMovie);
});

function searchMovie() {
  var keyword = document.getElementById('searchField').value;
  var APIKEY = 'c1331ced0972e705bf9584e0c8199a6d';
  var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIKEY + '&language=en-US&query=' + keyword + '&page=1&include_adult=false';
  fetch(url).then(function (result) {
    return result.json();
  }).then(function (data) {
    data.results.forEach(function (data) {
      console.log(data);
      createCard(data);
    });
  }).catch(function (err) {
    console.log(err);
  });
}

function createCard(data) {
  var newDiv = document.createElement("div");
  newDiv.classList.add("card");
  newDiv.setAttribute("id", "card");
  var row = document.createElement("div");
  row.classList.add("row");
  var pic = document.createElement("div");
  pic.classList.add("col-sm-3");
  pic.innerHTML = "<img class='px-3 py-3' src='https://image.tmdb.org/t/p/w185" + data.poster_path + "' alt='Opps, something is wrong'>";
  var txt = document.createElement("div");
  txt.classList.add("col-sm-6");
  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  var titleMovie = document.createElement("h4");
  titleMovie.classList.add("card-title", "font-weight-bold"), titleMovie.innerText = data.title + " (" + data.release_date + ")";
  var ratingMovie = document.createElement("p");
  ratingMovie.classList.add("card-text"), ratingMovie.innerHTML = '<p class="font-weight-bold">ratingMovie: </p>' + data.vote_average;
  var plot = document.createElement("p");
  plot.classList.add("card-text"), plot.innerHTML = '<p class="font-weight-bold">Plot: </p>' + data.overview;
  var director = document.createElement("p");
  director.classList.add("card-text"), director.innerHTML = '<p class="font-weight-bold">Director:</p>';
  var stars = document.createElement("p");
  stars.classList.add("card-text"), stars.innerHTML = '<span class="font-weight-bold">Stars:</span>' + data.popularity;
  var btnFav = document.createElement("button");
  btnFav.classList.add("btn", "btn-lg", "btn-secondary", "m-2");
  btnFav.innerText = "Add to favorites";
  var iconFav = document.createElement("span");
  iconFav.classList.add("glyphicon", "glyphicon-heart");
  iconFav.setAttribute("aria-hidden", "true");
  iconFav.setAttribute("style", "float:left;");
  btnFav.appendChild(iconFav);
  var btnTrailer = document.createElement("button");
  btnTrailer.classList.add("btn", "btn-lg", "btn-secondary", "m-2"), btnTrailer.innerText = "Watch Trailer";
  var iconTrailer = document.createElement("span");
  iconTrailer.classList.add("glyphicon", "glyphicon-play");
  iconTrailer.setAttribute("aria-hidden", "true");
  iconTrailer.setAttribute("style", "float:left;");
  btnTrailer.appendChild(iconTrailer);
  cardBody.appendChild(titleMovie), cardBody.appendChild(ratingMovie), cardBody.appendChild(plot), cardBody.appendChild(director), cardBody.appendChild(stars), cardBody.appendChild(btnFav), cardBody.appendChild(btnTrailer), txt.appendChild(cardBody);
  var lastDiv = document.createElement("div");
  lastDiv.classList.add("col-md-3");
  var btnReview = document.createElement("button");
  btnReview.classList.add("btn", "btn-lg", "btn-secondary", "m-2"), btnReview.innerText = "Add review";
  var iconReview = document.createElement("span");
  iconReview.classList.add("glyphicon", "glyphicon-pencil");
  iconReview.setAttribute("aria-hidden", "true");
  iconReview.setAttribute("style", "float:left;");
  btnReview.appendChild(iconReview);
  lastDiv.appendChild(btnReview), row.appendChild(pic), row.appendChild(txt), row.appendChild(lastDiv), newDiv.appendChild(row), document.getElementById("moviesOutput").appendChild(newDiv);
}
},{"./styles/movies.scss":"styles/movies.scss"}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/main.scss");

require("./login.js");

require("./signup.js");

require("./movies.js");

function getContent(fragmentId, callback) {
  var request = new XMLHttpRequest();

  request.onload = function () {
    callback(request.responseText);
  };

  request.open("GET", fragmentId + ".html");
  request.send(null);
}

function navigate() {
  var fragmentId;
  var ContentDiv = document.getElementById('output');

  if (!location.hash) {
    fragmentId = "login";
  } else {
    fragmentId = location.hash.substr(1);
  }

  getContent(fragmentId, function (output) {
    ContentDiv.innerHTML = output;
  });
}

window.addEventListener("hashchange", navigate);
navigate(); //import {bro} from './bro'
//document.querySelector('h1').textContent = bro(`How's it going`)

/*
let url = 'http://localhost:63347'

fetch('index.html')
.then(function(response){
    return response.text();
    let parser = new DOMParcel(html,"text/html");
})
.catch(function (err) {
	console.log('Something is wrong.', err);
});
*/
},{"./styles/main.scss":"styles/main.scss","./login.js":"login.js","./signup.js":"signup.js","./movies.js":"movies.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55541" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map