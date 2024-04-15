// ../.wrangler/tmp/bundle-jluBZ1/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// ../node_modules/@cloudflare/ai/dist/index.js
var e;
!function(e2) {
  e2.String = "str", e2.Bool = "bool", e2.Float16 = "float16", e2.Float32 = "float32", e2.Int16 = "int16", e2.Int32 = "int32", e2.Int64 = "int64", e2.Int8 = "int8", e2.Uint16 = "uint16", e2.Uint32 = "uint32", e2.Uint64 = "uint64", e2.Uint8 = "uint8";
}(e || (e = {}));
var t = Object.getPrototypeOf(Uint8Array);
var i;
!function(e2) {
  e2[e2.NONE = 0] = "NONE", e2[e2.CARRY_SYSTEM_INST = 1] = "CARRY_SYSTEM_INST", e2[e2.ABSORB_ROLE = 2] = "ABSORB_ROLE", e2[e2.APPEND_LAST_SYSTEM = 3] = "APPEND_LAST_SYSTEM";
}(i || (i = {}));
var R = { bare: { system: { flag: i.ABSORB_ROLE }, user: { flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: " ", post: " " } }, sqlcoder: { system: { flag: i.ABSORB_ROLE }, user: { flag: i.ABSORB_ROLE }, assistant: { flag: i.ABSORB_ROLE }, global: { template: "### Task\nGenerate a SQL query to answer [QUESTION]{user}[/QUESTION]\n\n### Database Schema\nThe query will run on a database with the following schema:\n{system}\n\n### Answer\nGiven the database schema, here is the SQL query that [QUESTION]{user}[/QUESTION]\n[SQL]" } }, inst: { system: { flag: i.ABSORB_ROLE }, user: { pre: "[INST] ", post: " [/INST]", flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: " ", post: " " } }, llama2: { system: { pre: "[INST] <<SYS>>\n", post: "\n<</SYS>>\n\n" }, user: { pre: "<s>[INST] ", post: " [/INST]", flag: i.CARRY_SYSTEM_INST }, assistant: { pre: " ", post: "</s>" } }, deepseek: { system: { post: "\n" }, user: { pre: "### Instruction:\n", post: "\n" }, assistant: { pre: "### Response:\n", post: "\n" }, global: { post: "### Response:\n" } }, falcon: { system: { post: "\n" }, user: { pre: "User: ", post: "\n" }, assistant: { pre: "Assistant: ", post: "\n" }, global: { post: "Assistant: \n" } }, openchat: { system: { flag: i.ABSORB_ROLE }, user: { pre: "GPT4 User: ", post: "<|end_of_turn|>", flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: "GPT4 Assistant: ", post: "<|end_of_turn|>" }, global: { post: "GPT4 Assistant:" } }, "openchat-alt": { system: { flag: i.ABSORB_ROLE }, user: { pre: "<s>Human: ", post: "<|end_of_turn|>", flag: i.APPEND_LAST_SYSTEM }, assistant: { pre: "Assistant: ", post: "<|end_of_turn|>" }, global: { post: "Assistant: " } }, tinyllama: { system: { pre: "<|system|>\n", post: "</s>\n" }, user: { pre: "<|user|>\n", post: "</s>\n" }, assistant: { pre: "<|assistant|>\n", post: "</s>\n" }, global: { post: "<|assistant|>\n" } }, chatml: { system: { pre: "<|im_start|>system\n", post: "<|im_end|>\n" }, user: { pre: "<|im_start|>user\n", post: "<|im_end|>\n" }, assistant: { pre: "<|im_start|>assistant\n", post: "<|im_end|>\n" }, global: { post: "<|im_start|>assistant\n" } }, "orca-hashes": { system: { pre: "### System:\n", post: "\n\n" }, user: { pre: "### User:\n", post: "\n\n" }, assistant: { pre: "### Assistant:\n", post: "\n\n" }, global: { post: "### Assistant:\n\n" } }, "codellama-instruct": { system: { pre: "[INST] ", post: "\n" }, user: { pre: "[INST] ", post: " [/INST]\n", flag: i.CARRY_SYSTEM_INST }, assistant: { post: "\n" } }, "mistral-instruct": { system: { pre: "<s>[INST] ", post: " " }, user: { pre: "[INST] ", post: " [/INST]", flag: i.CARRY_SYSTEM_INST }, assistant: { pre: " ", post: "</s>" } }, zephyr: { system: { pre: "<s><|system|>\n", post: "</s>\n" }, user: { pre: "<|user|>\n", post: "</s>\n" }, assistant: { pre: "<|assistant|>\n", post: "</s>\n" }, global: { post: "<|assistant|>\n" } } };
var S = class extends Error {
  httpCode;
  constructor(e2, t2) {
    super(e2), this.name = "InferenceUpstreamError", this.httpCode = t2;
  }
};
var N = class {
  binding;
  options;
  logs;
  lastRequestId;
  constructor(e2, t2 = {}) {
    if (!e2)
      throw new Error("Ai binding is undefined. Please provide a valid binding.");
    this.binding = e2, this.options = t2, this.lastRequestId = "";
  }
  async run(e2, t2) {
    const s = { method: "POST", body: JSON.stringify({ inputs: t2, options: { debug: this.options?.debug } }), headers: { ...this.options?.sessionOptions?.extraHeaders || {}, ...this.options?.extraHeaders || {}, "content-encoding": "application/json", "cf-consn-sdk-version": "1.1.0", "cf-consn-model-id": `${this.options.prefix ? `${this.options.prefix}:` : ""}${e2}` } }, n = await this.binding.fetch("http://workers-binding.ai/run?version=2", s);
    if (this.lastRequestId = n.headers.get("cf-ai-req-id"), t2.stream) {
      if (!n.ok)
        throw new S(await n.text(), n.status);
      return n.body;
    }
    {
      if (this.options.debug) {
        let e4 = [];
        try {
          e4 = JSON.parse(atob(n.headers.get("cf-ai-logs")));
        } catch (e5) {
        }
        this.logs = e4;
      }
      if (!n.ok)
        throw new S(await n.text(), n.status);
      const e3 = await new Response(n.body.pipeThrough(new DecompressionStream("gzip")));
      if (!n.headers.get("content-type")) {
        console.log("Your current wrangler version has a known issue when using in local dev mode, please update to the latest.");
        try {
          return await e3.clone().json();
        } catch (t3) {
          return e3.body;
        }
      }
      return "application/json" === n.headers.get("content-type") ? await e3.json() : e3.body;
    }
  }
  getLogs() {
    return this.logs;
  }
};

// api/describe.ts
async function onRequestPost(context) {
  const req = context.request;
  const body = await req.arrayBuffer();
  console.log(body);
  if (!body) {
    return new Response("No image provided", { status: 400 });
  }
  const ai = new N(context.env.AI);
  const response = await ai.run("@cf/unum/uform-gen2-qwen-500m", {
    image: [...new Uint8Array(body)]
  });
  return Response.json(response);
}

// api/fiction.ts
async function onRequestPost2(context) {
  const req = context.request;
  const body = await req.json();
  console.log(body);
  if (!body.imageDescription) {
    return new Response("No image description provided", { status: 400 });
  }
  const ai = new N(context.env.AI);
  const response = await ai.run("@cf/meta/llama-2-7b-chat-fp16", {
    messages: [
      {
        role: "system",
        content: "you are a creative writer that can spun up imaginative stories in a jiff."
      },
      { role: "user", content: body.imageDescription }
    ]
  });
  return Response.json(response);
}

// api/image.ts
async function onRequestPost3(context) {
  const req = context.request;
  const body = await req.json();
  console.log(body);
  if (!body.imageDescription) {
    return new Response("No image prompt provided", { status: 400 });
  }
  const ai = new N(context.env.AI);
  const result = await ai.run("@cf/lykon/dreamshaper-8-lcm", {
    prompt: body.imageDescription
  });
  return new Response(result, {
    headers: {
      "content-type": "image/png"
    }
  });
}

// ../.wrangler/tmp/pages-uTczKt/functionsRoutes-0.7762548026469105.mjs
var routes = [
  {
    routePath: "/api/describe",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/fiction",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/image",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i2 = 0;
  while (i2 < str.length) {
    var char = str[i2];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i2++, value: str[i2++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i2, value: str[i2++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i2 + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i2));
      tokens.push({ type: "NAME", index: i2, value: name });
      i2 = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i2 + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i2));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i2));
      tokens.push({ type: "PATTERN", index: i2, value: pattern });
      i2 = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i2, value: str[i2++] });
  }
  tokens.push({ type: "END", index: i2, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i2 = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i2 < tokens.length && tokens[i2].type === type)
      return tokens[i2++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i2], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i2 < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i3) {
      if (m[i3] === void 0)
        return "continue";
      var key = keys[i3 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i3].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i3], key);
      }
    };
    for (var i2 = 1; i2 < m.length; i2++) {
      _loop_1(i2);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    };
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = (response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
);

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-jluBZ1/middleware-insertion-facade.js
pages_template_worker_default.middleware = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default,
  ...pages_template_worker_default.middleware ?? []
].filter(Boolean);
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// ../.wrangler/tmp/bundle-jluBZ1/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (worker.middleware === void 0 || worker.middleware.length === 0) {
    return worker;
  }
  for (const middleware of worker.middleware) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (klass.middleware === void 0 || klass.middleware.length === 0) {
    return klass;
  }
  for (const middleware of klass.middleware) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.5268869903352182.mjs.map
