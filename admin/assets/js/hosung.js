//셀렉터 부분 411~2620 and 2937~3041
Array.prototype.remove = function (val) {
    var j = 0;
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] !== val) {
            this[j++] = this[i];
        }
    }
    this.length = j;
};
(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document
            ? factory(global, true)
            : function (w) {
                  if (!w.document) {
                      throw new Error("HOSUNG requires a window with a document");
                  }
                  return factory(w);
              };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var ieOn = false,
        ie9 = false,
        ffOn = false,
        agt = navigator.userAgent.toLowerCase();
    if (/trident\/5\.0/.test(agt)) ie9 = true;
    if (/trident\/[567]\.0/.test(agt)) ieOn = true;
    if (/firefox/.test(agt)) ffOn = true;
    var arr = [],
        document = window.document,
        getProto = Object.getPrototypeOf,
        slice = arr.slice,
        concat = arr.concat,
        push = arr.push,
        indexOf = arr.indexOf,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object),
        support = {},
        classExr = /\S+/g,
        scroll = {},
        HSAnim = {},
        // HOSUNG("#asdf") << 식으로 사용
        version = "0.0.1",
        HOSUNG = function (selector, context) {
            return new HOSUNG.fn.init(selector, context);
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    HOSUNG.File = {};
    HOSUNG.fn = HOSUNG.prototype = {
        constructor: HOSUNG,
        length: 0,
        pushStack: function (elems) {
            var ret = HOSUNG.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
        },
        each: function (callback) {
            return HOSUNG.each(this, callback);
        },
        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },
        sort: arr.sort,
        index: function (elem) {
            if (!elem) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }

            if (typeof elem === "string") {
                return indexOf.call(HOSUNG(elem), this[0]);
            }

            return indexOf.call(
                this,

                elem.HOSUNG ? elem[0] : elem
            );
        },
        push: push,
    };

    HOSUNG.extend = HOSUNG.fn.extend = scroll.extend = HSAnim.extend = HOSUNG.File.extend = function () {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !HOSUNG.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (HOSUNG.isPlainObject(copy) || (copyIsArray = HOSUNG.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && HOSUNG.isArray(src) ? src : [];
                        } else {
                            clone = src && HOSUNG.isPlainObject(src) ? src : {};
                        }
                        target[name] = HOSUNG.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    HOSUNG.extend({
        expando: "HOSUNG" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function (msg) {
            throw new Error(msg);
        },
        noop: function () {},
        isFunction: function (obj) {
            return HOSUNG.type(obj) === "function";
        },
        isArray: Array.isArray,
        isWindow: function (obj) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function (obj) {
            var type = HOSUNG.type(obj);
            return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
        },
        isPlainObject: function (obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }
            proto = getProto(obj);
            if (!proto) {
                return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function (obj) {
            //비어있는 object 체크
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function"
                ? class2type[toString.call(obj)] || "object"
                : typeof obj;
        },
        nodeName: function (elem, name) {
            //attr에서 사용
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function (obj, callback) {
            var length,
                i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    HOSUNG.merge(ret, arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function (first, second) {
            //어떠한 객체안에 배열의 원소들을 집어넣는 메서드
            var len = +second.length,
                j = 0,
                i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        map: function (elems, callback, arg) {
            var length,
                value,
                i = 0,
                ret = [];
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        //씀
        guid: 1,
        now: Date.now,
        support: support,
    });
    HOSUNG.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArrayLike(obj) {
        //[]나 new Array로 안만들어도 배열의 형태만 가지면 true 리턴
        var length = !!obj && "length" in obj && obj.length,
            type = HOSUNG.type(obj);
        if (type === "function" || HOSUNG.isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 || (typeof length === "number" && length > 0 && length - 1 in obj);
    }

    var rnotwhite = /\S+/g;

    //util 코드 시작
    var rclass = /[\t\r\n\f]/g,
        rparentsprev = /^(?:parents|prev(?:Until|All))/;

    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        if (HOSUNG.type(key) === "object") {
            //key와 value로 안받고 key에 오브젝트로 다중key를 받았을경우
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!HOSUNG.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function (elem, key, value) {
                        return bulk.call(HOSUNG(elem), value);
                    };
                }
            }
            if (fn) {
                for (; i < len; i++) {
                    fn(
                        elems[i],
                        key,
                        raw
                            ? value //일반적인 루트 값을 세팅
                            : value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }

        return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet; //fn(elems[0],key)를 호출하는경우는 css value를 안줬을경우 즉 값을얻어오고싶을때
    };

    function getClass(elem) {
        return (elem.getAttribute && elem.getAttribute("class")) || "";
    }

    HOSUNG.extend({
        split: function (a, option) {
            if (HOSUNG.trim(a) !== "") {
                var b = a.split(option);
                for (var i = 0; i < b.length; i++) {
                    b[i] = HOSUNG.trim(b[i]);
                    if (b[i] === "") {
                        b.splice(i, 1);
                    }
                }
                return b;
            } else {
                return false;
            }
        },
        domMake: function (desc) {
            var name = desc[0],
                attributes = desc[1],
                el = document.createElement(name),
                start = 1,
                i;
            if (typeof attributes === "object" && attributes !== null && !HOSUNG.isArray(attributes)) {
                for (var attr in attributes) {
                    if (attr === "class") {
                        HOSUNG.addClass(el, attributes[attr]);
                    } else el.setAttribute(attr, attributes[attr]);
                }
                start = 2;
            }
            for (i = start; i < desc.length; i++) {
                if (HOSUNG.isArray(desc[i])) {
                    el.appendChild(HOSUNG.domMake(desc[i]));
                } else {
                    el.appendChild(document.createTextNode(desc[i]));
                }
            }
            return el;
        },
        find: function (elem, selector) {
            var type,
                newContext = elem && (elem.nodeType === 9 ? elem : elem.ownerDocument),
                nodeSelectors,
                nodeSelector,
                nodes = [],
                i = 0;
            if (selector.charAt(0) === "#") {
                type = 1;
            } else if (selector.charAt(0) === ".") {
                type = 2;
                selector = selector.substring(1);
            } else {
                type = 0;
            }
            if (type === 1 && (elem.nodeType === 1 || elem.nodeType === 9)) {
                //ID가져오기
                if (newContext && (nodeSelectors = newContext.querySelectorAll(selector))) {
                    while ((nodeSelector = nodeSelectors[i++])) {
                        if (nodeSelector && HOSUNG.contains(elem, nodeSelector)) {
                            return nodeSelector;
                        }
                    }
                }
            } else if (type === 0 && (elem.nodeType === 1 || elem.nodeType === 9)) {
                //TAG가져오기
                if (newContext && newContext.getElementsByTagName) {
                    nodeSelectors = newContext.getElementsByTagName(selector);
                } else {
                    nodeSelectors = newContext.querySelectorAll(selector);
                }
                while ((nodeSelector = nodeSelectors[i++])) {
                    if (nodeSelector && HOSUNG.contains(elem, nodeSelector)) {
                        nodes[nodes.length] = nodeSelector;
                    }
                }
                return nodes;
            } else if (type === 2 && (elem.nodeType === 1 || elem.nodeType === 9)) {
                if (newContext && newContext.getElementsByClassName) {
                    nodeSelectors = newContext.getElementsByClassName(selector);
                } else {
                    selector = "." + selector;
                    nodeSelectors = newContext.querySelectorAll(selector);
                }
                while ((nodeSelector = nodeSelectors[i++])) {
                    if (nodeSelector && HOSUNG.contains(elem, nodeSelector)) {
                        nodes[nodes.length] = nodeSelector;
                    }
                }
                return nodes;
            } else if (elem.nodeType === 3) {
                return nodes;
            }
        },
        contains: function (a, b) {
            //compareDocumentPosition = contains Support차이 a에 b가있는지 체크
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return (
                a === bup ||
                !!(
                    bup &&
                    bup.nodeType === 1 &&
                    (adown.contains
                        ? adown.contains(bup)
                        : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16)
                )
            );
        },
        isInclude: function (a, b) {
            if (a === b || HOSUNG.contains(a, b)) {
                return true;
            }
            return false;
        },
        domProcess: function (target, node, callBack) {
            var dumNode,
                i = 0;
            if (typeof node === "string") {
                dumNode = target.ownerDocument.createElement("div");
                dumNode.innerHTML = node;
                while ((node = dumNode.childNodes[0])) {
                    callBack(target, node);
                }
            } else {
                callBack(target, node);
            }
        },
        before: function (target, node) {
            HOSUNG.domProcess(target, node, function (target, node) {
                target.parentNode.insertBefore(node, target);
            });
        },
        after: function (target, node) {
            HOSUNG.domProcess(target, node, function (target, node) {
                target.parentNode.insertBefore(node, target.nextSibling);
            });
        },
        first: function (target, node) {
            HOSUNG.domProcess(target, node, function (target, node) {
                target.insertBefore(node, target.firstChild);
            });
        },
        globalEvent: function (type, fun, type2) {
            var frames, i;
            frames = document.getElementsByTagName("iframe");
            if (type2) {
                document.addEventListener(type, fun);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.addEventListener(type, fun);
                }
            } else {
                document.removeEventListener(type, fun);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.removeEventListener(type, fun);
                }
            }
        },
        removeStyle: function (node, name) {
            if (node) {
                var styles,
                    all = [],
                    pass = true;
                styles = HOSUNG.getAttributeStyleProperty(node);
                for (var i = 0; i < styles.length; i++) {
                    all.push(HOSUNG.split(styles[i], ":"));
                }
                node.removeAttribute("style");
                for (i = 0; i < all.length; i++) {
                    if (all[i][0] === name) {
                        all.splice(i, 1);
                        pass = false;
                        i--;
                    }
                    if (pass) {
                        node.style[all[i][0]] = all[i][1];
                    }
                    pass = true;
                }
            }
        },
        attr: function (elem, name, value) {
            var ret,
                hooks,
                nType = elem.nodeType;
            if (nType !== 1) {
                return;
            }
            if (value !== undefined) {
                if (value === null) {
                    HOSUNG.removeAttr(elem, name);
                    return;
                }
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                elem.setAttribute(name, value + "");
                return value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            ret = HOSUNG.find.attr(elem, name);
            return ret == null ? undefined : ret;
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === "radio" && HOSUNG.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                },
            },
        },
        removeAttr: function (elem, value) {
            var name,
                i = 0,
                attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    elem.removeAttribute(name);
                }
            }
        },
        addClass: function (node, value) {
            var classes,
                cur,
                curValue,
                clazz,
                j,
                finalValue,
                i = 0;
            if (typeof value === "string" && value) {
                classes = value.match(classExr) || [];
                curValue = node.getAttribute("class") || "";
                cur = (" " + curValue + " ").replace(/[\t\r\n\f]/g, " ");
                if (cur) {
                    j = 0;
                    while ((clazz = classes[j++])) {
                        if (cur.indexOf(" " + clazz + " ") < 0) {
                            cur += clazz + " ";
                        }
                    }
                    finalValue = HOSUNG.trim(cur);
                    if (curValue !== finalValue) {
                        node.setAttribute("class", finalValue);
                    }
                }
            }
        },
        removeClass: function (node, value) {
            if (node) {
                var classes,
                    cur,
                    curValue,
                    clazz,
                    j,
                    finalValue,
                    i = 0;
                if (!arguments.length) {
                    node.setAttribute("class", "");
                }
                if (typeof value === "string" && value) {
                    classes = value.match(classExr) || [];
                    curValue = node.getAttribute("class") || "";
                    cur = (" " + curValue + " ").replace(/[\t\r\n\f]/g, " ");
                    if (cur) {
                        while ((clazz = classes[i++])) {
                            if (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = HOSUNG.trim(cur);
                        if (curValue !== finalValue) {
                            node.setAttribute("class", finalValue);
                        }
                    }
                }
            }
        },
        hasClass: function (node, selector) {
            var className,
                a,
                i = 0;
            className = " " + selector + " ";
            a = node.getAttribute("class") || "";
            if (node.nodeType === 1 && (" " + a + " ").indexOf(className) > -1) {
                return true;
            }
            return false;
        },
        getClassArray: function (node) {
            var strClass;
            strClass = HOSUNG.trim(node.getAttribute("class"));
            strClass = HOSUNG.split(strClass, " ");
            return strClass ? strClass : [];
        },
        trim: function (text) {
            if (text !== null) {
                text = text.replace(/^\s+/, "");
                text = text.replace(/\s+$/, "");
            }
            return text == null ? "" : text;
        },
    });

    HOSUNG.fn.extend({
        hasClass: function (selector) {
            var i = 0,
                elem;
            while ((elem = this[i++])) {
                HOSUNG.hasClass(elem, selector);
            }
            return this;
        },
        attr: function (name, value) {
            return access(this, HOSUNG.attr, name, value, arguments.length > 1);
        },
        removeAttr: function (name) {
            return this.each(function () {
                HOSUNG.removeAttr(this[i], name);
            });
        },
        removeStyle: function (name) {
            var i = 0,
                elem;
            while ((elem = this[i++])) {
                HOSUNG.removeStyle(elem, name);
            }
            return this;
        },
        addClass: function (value) {
            var i = 0,
                elem;
            while ((elem = this[i++])) {
                HOSUNG.addClass(elem, value);
            }
            return this;
        },
        removeClass: function (value) {
            var i = 0,
                elem;
            while ((elem = this[i++])) {
                HOSUNG.removeClass(elem, value);
            }
            return this;
        },
        hasClass: function (selector) {
            var i = 0,
                elem;
            while ((elem = this[i++])) {
                if (!HOSUNG.hasClass(elem, selector)) {
                    return false;
                }
            }
            return true;
        },
        getClassArray: function () {
            var i = 0;
            elem, ret;
            while ((elem = this[i++])) {
                ret.push(HOSUNG.getClassArray(elem));
            }
            return ret;
        },
        toggleClass: function (value) {
            var classes,
                elem,
                clazz,
                i = 0,
                self;
            if (typeof value === "string" && value) {
                classes = value.match(rnotwhite) || [];
                while ((elem = this[i++])) {
                    self = HOSUNG(elem);
                    j = 0;
                    while ((clazz = classes[j++])) {
                        if (self.hasClass(clazz)) self.removeClass(clazz);
                        else self.addClass(clazz);
                    }
                }
            }
            return this;
        },
        hasId: function (selector) {
            var a,
                i = 0;
            a = node.getAttribute("id") || "";
            if (node.nodeType === 1 && a.indexOf(selector) > -1) {
                return true;
            }
            return false;
        },
        find: function (selector) {
            var i = 0,
                elem,
                nodes = [],
                nodes2 = [];
            while ((elem = this[i++])) {
                nodes = HOSUNG.find(elem, selector);
                for (var j = 0; j < nodes.length; j++) {
                    nodes2.push(nodes[j]);
                }
            }
            return HS(nodes2);
        },
    });
    //util 코드 끝

    //셀렉터 코드
    var rootHOSUNG,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        init = (HOSUNG.fn.init = function (selector, context, root) {
            var match, elem;
            root = root || rootHOSUNG;
            if (typeof selector === "string") {
                match = rquickExpr.exec(selector);
                if (match && (match[1] || !context)) {
                }
                //HS(expr) ex)HS(".className")
                else if (!context || context.jquery) {
                    return (context || root).find(selector);
                }
            }
            //HS(DOMElement)
            else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            }
            return HOSUNG.makeArray(selector, this);
        });
    init.prototype = HOSUNG.fn;
    rootHOSUNG = HOSUNG(document);
    //셀렉터 코드 끝

    //이벤트 코드 handleFn은 init이벤트
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var needsContext = new RegExp(
        "^" +
            whitespace +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            whitespace +
            "*((?:-\\d)?\\d*)" +
            whitespace +
            "*\\)|)(?=[^-]|$)",
        "i"
    );
    var handleObj, handleFn;
    HOSUNG.Event = function (src, props) {
        if (!(this instanceof HOSUNG.Event)) {
            return new HOSUNG.Event(src, props);
        }
        this.type = src;
        this.timeStamp = (src && src.timeStamp) || HOSUNG.now();
        this[HOSUNG.expando] = true;
    };

    HOSUNG.Event.prototype = {
        constructor: HOSUNG.Event,
        isDefaultPrevented: false,
        isPropagationStopped: false,
        isImmediatePropagationStopped: false,
        isSimulated: false,

        preventDefault: function () {
            var e = this.originalEvent;

            this.isDefaultPrevented = true;

            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;

            this.isPropagationStopped = true;

            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = true;

            if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        },
    };

    HOSUNG.event = {
        add: function (elem, types, selector, fn) {
            var handle, events;
            if (typeof fn !== "function" || typeof types !== "string") {
                return false;
            }
            if (types.substring(0, 3) === "pjax") {
            } else {
            }
            if (!elem.eventObj) {
                //elem event init코드
                elem.eventObj = {};
            }
            if (!elem.eventObj[types]) {
                handleFn = function (e) {
                    HOSUNG.event.dispatch.apply(elem, arguments);
                };
                elem.eventObj[types] = [];
                elem.eventObj.handleFn = handleFn;
                elem.addEventListener(types, elem.eventObj.handleFn);
            }
            events = elem.eventObj[types];
            if (!events.lengthN) {
                events.lengthN = 0;
            }
            if (selector == null) {
                events[events.length] = {
                    type: types,
                    fn: fn,
                    elem: elem,
                };
            } else {
                events[events.length] = {
                    type: types,
                    fn: fn,
                    selector: selector,
                    needsContext: selector && needsContext.test(selector),
                };
            }
        },
        trigger: function (elem, event, param) {
            if (elem.eventObj) {
                var events = elem.eventObj[event];
                if (events) {
                    for (i = 0; i < events.length; i++) {
                        events[i].fn(param);
                    }
                }
            }
        },
        dispatch: function (event) {
            var type = event.type,
                cur = event.target,
                events = this.eventObj[type],
                len = events.length,
                i,
                j,
                handleObj,
                matches,
                handlerQueue = [],
                nonSelState = false;
            for (; cur !== document; cur = cur.parentNode || this) {
                matches = [];
                for (i = 0, j = 0; i < len; i++) {
                    handleObj = events[i];
                    if (handleObj.selector) {
                        sel = handleObj.selector + " ";
                        if (matches[sel] === undefined) {
                            matches[sel] = handleObj.needsContext
                                ? HOSUNG(sel, this).index(cur) > -1
                                : HOSUNG.find(sel, this, null, [cur]).length;
                        }
                        if (matches[sel]) {
                            matches[matches.length] = handleObj;
                        }
                    } else if (!nonSelState && this == events[i].elem) {
                        matches[matches.length] = handleObj;
                    }
                }
                nonSelState = true;
                if (matches.length) {
                    handlerQueue[handlerQueue.length] = { elem: cur, handlers: matches };
                }
            }

            /*여기서부터 이벤트 실행 코드
			click이벤트로 예를들면 한번클릭하면 그거에 해당하는 타겟
			1차로 li.asdf를 클릭시 document를제외한 html body ul li.asdf 4개가 타겟이 될수있음.
			해당타겟에 이벤트가 들어있으면 그만큼 반복
			2차로 해당타겟에 중복이벤트가 있을경우 li.asdf에 click 이벤트가 여러개있을경우 그만큼 반복문을 돈다.
			*/
            i = 0;

            while ((matched = handlerQueue[i++])) {
                j = 0;
                while ((handleObj = matched.handlers[j++])) {
                    //이벤트 실행
                    if (handleObj.fn.call(matched.elem, event) === false) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
            }
        },
        remove: function (elem, type, selector) {
            if (elem.eventObj && elem.eventObj[type]) {
                var events = elem.eventObj[type],
                    i = 0;
                if (selector == null && events.lengthN > 0) {
                    while (events.lengthN) {
                        delete events["N" + events.lengthN];
                        events.lengthN--;
                    }
                } else if (selector !== null) {
                    for (i = 0; i < events.length; i++) {
                        if (events[i].selector === selector) {
                            events.splice(i, 1);
                        }
                    }
                }
                if (events.lengthN === 0 && (!events.length || events.length === 0)) {
                    if (elem.removeEventListener) {
                        elem.removeEventListener(type, elem.eventObj.handleFn);
                    }
                    elem.eventObj = null;
                }
            }
        },
        //test부분
        props: [],
        //test부분 끝
    };

    function on(elem, types, selector, fn, one) {
        var origFn, type;
        if (fn == null) {
            fn = selector;
            selector = undefined;
        }
        return elem.each(function () {
            HOSUNG.event.add(this, types, selector, fn);
        });
    }

    //이벤트 코드 메인 시작
    HOSUNG.fn.extend({
        on: function (types, selector, fn) {
            return on(this, types, selector, fn);
        },
        off: function (types, selector) {
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector);
                }
                return this;
            }
            return this.each(function () {
                HOSUNG.event.remove(this, types, selector);
            });
        },
        trigger: function (types, param) {
            HOSUNG.event.trigger(this[0], types, param);
        },
    });
    //이벤트 코드 메인 끝

    //이벤트 코드 끝

    //css 코드 시작
    HOSUNG.fn.extend({
        css: function (name, value) {
            var _name;
            i = 0;
            while (this[i]) {
                if (typeof name === "string") {
                    this[i].style[name] = value;
                } else if (typeof name === "object") {
                    for (_name in name) {
                        this[i].style[_name] = name[_name];
                    }
                }
                i++;
            }
            return this;
        },
    });
    //css 코드 끝

    //ajax 코드부분
    var xhr = new XMLHttpRequest();
    HOSUNG.extend({
        ajax: function (options) {
            var type,
                url,
                async,
                dataType,
                data,
                isSuccess = true,
                isLoaded = false;
            if (!options) {
                return false;
            }
            typeof options.type === "string" && options.type ? (type = options.type.toUpperCase()) : (type = "POST");
            typeof options.url === "string" && options.url ? (url = options.url) : (url = window.location.href);
            typeof options.async === "boolean" && options.async === false ? (async = false) : (async = true);
            typeof options.dataType === "string" && options.dataType
                ? (dataType = options.dataType.toLowerCase())
                : (dataType = "html");
            typeof options.timeout === "number" && options.timeout ? (timeout = options.timeout) : (timeout = 2000);
            if (dataType === "jsonp" && type === "POST") {
                type = "GET";
                console.log("HS개발로그:jsonp는 type(GET)만 가능합니다.(가독성을 위해 수정해주세요)");
            }
            function errorProcess(errorCode) {
                if (options.error) {
                    options.error(xhr, errorCode);
                    isSuccess = false;
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 3) {
                    isLoaded = true;
                    if (dataType === "json") {
                        try {
                            xhr.parseData = JSON.parse(xhr.responseText);
                        } catch (e) {
                            //parseError error진입
                            errorProcess("parseError");
                        }
                    } else if (dataType === "xml") {
                        try {
                            xhr.parseData = new window.DOMParser().parseFromString(xhr.responseText, "text/xml");
                        } catch (e) {
                            //parseError error진입
                            errorProcess("parseError");
                        }
                    }
                    //성공시에 success함수 진입
                    if (isSuccess) {
                        if (options.success) {
                            options.success(xhr.parseData || xhr.responseText, xhr);
                        }
                    }
                } else if (xhr.readyState === 4) {
                    if (!async && xhr.status === 200) {
                        //동기방식일 경우 success가 readyState4에서 작동
                        if (dataType === "json") {
                            try {
                                xhr.parseData = JSON.parse(xhr.responseText);
                            } catch (e) {
                                //parseError error진입
                                errorProcess("parseError");
                            }
                        } else if (dataType === "xml") {
                            try {
                                xhr.parseData = new window.DOMParser().parseFromString(xhr.responseText, "text/xml");
                            } catch (e) {
                                //parseError error진입
                                errorProcess("parseError");
                            }
                        }
                        options.success(xhr.parseData || xhr.responseText, xhr);
                    } else if (!isLoaded && async) {
                        //비동기방식이고 readyState3을 거치지 않은경우
                        errorProcess("서버로부터 받을 수 없거나 응답받은 메시지가 비어있습니다.");
                    }
                    //Complete시에 작동(success,error)후에 작동
                    if (options.complete) {
                        options.complete(xhr);
                        xhr.abort();
                    }
                }
            };
            if (!async && xhr.timeout !== 0) {
                xhr.timeout = undefined;
            }
            xhr.open(type, url, async); //ajax 열기
            if (async) {
                xhr.timeout = timeout;
                xhr.ontimeout = function (e) {
                    errorProcess("timeout");
                };
            }
            if (!options.contentType) {
                if (dataType !== "multiform") {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                }
            } else {
                xhr.setRequestHeader("Content-Type", options.contentType);
            }

            if (!options.Accept) {
                if (dataType === "html") {
                    xhr.setRequestHeader("Accept", "text/html, */*; q=0.1");
                } else if (dataType === "json") {
                    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.1");
                } else if (dataType === "text") {
                    xhr.setRequestHeader("Accept", "text/plain, */*; q=0.1");
                } else if (dataType === "jsonp") {
                    xhr.setRequestHeader(
                        "Accept",
                        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.1"
                    );
                } else if (dataType === "xml") {
                    xhr.setRequestHeader("Accept", "application/xml, text/xml, */*; q=0.1");
                }
            } else {
                xhr.setRequestHeader("Accept", options.Accept); //custom Accept Header
            }
            if (options.beforeSend) {
                options.beforeSend(xhr, options);
            }
            (data = options.data) ? xhr.send(data) : xhr.send(); //ajax 시작
        },
    });

    //ajax 끝

    //pjax 시작
    function onPjaxpopstate(e) {
        //container 복원
        var state = e.state,
            container;
        if (state) {
            for (var i = 0; i < e.state.count + 1; i++) {
                container = document.getElementById(e.state["containerId" + i]);
                container.innerHTML = e.state["html" + i];
            }
        }
    }
    HOSUNG.pjax = function (options) {
        if (!options.container) {
            return false;
        }
        if (options.type.toLowerCase() == "get" && options.data) {
            options.parameter = "";
            for (var key in options.data) {
                options.parameter += key + "=" + options.data[key] + "&";
            }
            options.parameter = options.parameter.substr(0, options.parameter.length - 1);
        }
        var successFun = options.success,
            beforeSendFun = options.beforeSend,
            completeFun = options.complete,
            errorFun = options.error,
            save = typeof options.save && options.save === true ? true : false,
            i;
        HOSUNG.pjax.container.push(options.container);
        options.beforeSend = function (xhr, options) {
            xhr.setRequestHeader("HS-PJAX", "true");
            if (beforeSendFun) beforeSendFun(xhr, options);
        };
        options.complete = function (xhr, type) {
            if (completeFun) completeFun(xhr, type);
        };
        options.success = function (responseText, xhr) {
            if (!HOSUNG.pjax.state) {
                HOSUNG.pjax.state = {
                    id: uniqueId() + 10,
                    url: options.url + (options.data ? "?" + options.parameter : ""),
                    title: document.title,
                    count: 0,
                };
            } else {
                HOSUNG.pjax.state.count++;
            }
            i = HOSUNG.pjax.state.count;
            HOSUNG.pjax.state["containerId" + i] = HOSUNG.pjax.container[i].id;
            HOSUNG.pjax.state["html" + i] = responseText;
            if (!save) {
                for (i = 0; i < HOSUNG.pjax.container.length; i++) {
                    HOSUNG.pjax.container[i].innerHTML = HOSUNG.pjax.state["html" + i];
                }
                if (HOSUNG.pjax.movePage) {
                    window.history.pushState(HOSUNG.pjax.state, HOSUNG.pjax.state.title, HOSUNG.pjax.state.url);
                } else {
                    window.history.pushState(HOSUNG.pjax.state, HOSUNG.pjax.state.title);
                }
                HOSUNG.pjax.container = [];
                HOSUNG.pjax.state = null;
                HOSUNG.pjax.oldState = null;
                HOSUNG.pjax.movePage = true;
            }
            if (successFun) {
                successFun(responseText, xhr);
            }
        };
        options.error = function (xhr, status, errorType) {
            HOSUNG.pjax.container = [];
            HOSUNG.pjax.state = null;
            HOSUNG.pjax.oldState = null;
            HOSUNG.pjax.movePage = true;
            if (errorFun) errorFun(xhr, status, errorType);
        };
        options.dataType = "HTML";

        if (!HOSUNG.pjax.oldState) {
            HOSUNG.pjax.oldState = {
                id: uniqueId() + 5,
                url: window.location.href,
                title: document.title,
                count: 0,
            };
            if (!options.movePage) {
                HOSUNG.pjax.movePage = false;
            }
        } else {
            HOSUNG.pjax.oldState.count++;
        }
        i = HOSUNG.pjax.oldState.count;
        HOSUNG.pjax.oldState["containerId" + i] = HOSUNG.pjax.container[i].id;
        HOSUNG.pjax.oldState["html" + i] = HOSUNG.pjax.container[i].innerHTML;
        if (!save) {
            window.history.replaceState(HOSUNG.pjax.oldState, document.title, window.location.href);
            if (options.title) {
                options.title = document.title;
            }
        }
        HS.ajax(options);
    };
    HOSUNG.pjax.container = [];
    HOSUNG.pjax.movePage = true;
    window.addEventListener("popstate", onPjaxpopstate);
    function uniqueId() {
        return new Date().getTime();
    }
    support.pjax =
        window.history &&
        window.history.pushState &&
        window.history.replaceState &&
        !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
    //pjax 끝
    //popup 시작
    function Popup(title) {
        //Popup클래스의 생성자,Popup을 인스턴스화하자마자 이 생성자가 실행
        //Popup에 관련된 것들을 설정 (받은 options를 통해서);
        Popup.prototype.count++;
        if (!title) {
            this.id = new Date().getTime() * 10 + Popup.prototype.count; //맨마지막에 이 팝업의 id지정(id는 시간값을 이용하여 popup창마다 서로다르게 생성)
        } else {
            this.title = title; //받은 options들 저장
            this.id = new Date().getTime() * 10 + Popup.prototype.count; //맨마지막에 이 팝업의 id지정(id는 시간값을 이용하여 popup창마다 서로다르게 생성)
        }
    }
    Popup.prototype.count = 0;
    Popup.prototype.show = function (x, y) {
        //var a = HS.popup({ }).show() 또는 var a = HS.popup({ }); a.show()로 사용가능
        style = this.pop.style;
        style.display = "block";
        style.position = "absolute";
        style.border = "1px solid black";
        style.backgroundColor = "white";
        if (x >= 0) style.left = x;
        else {
            style.left = 50 + "%";
            style.marginLeft = -this.width / 2 + "px";
        }
        if (y >= 0) style.top = y;
        else style.top = 80 + "px";
    };
    Popup.prototype.block = function () {
        this.block = block = document.createElement("div");
        document.body.appendChild(block);
        block.id = "pop-block";
        style = block.style;
        style.position = "absolute";
        style.left = 0;
        style.top = 0;
        style.width = 100 + "%";
        style.height = 100 + "%";
        style.backgroundColor = "black";
        style.opacity = 0.65;
        style.zIndex = 9998;
    };
    Popup.prototype.set = function (width, height, headHeight, contentsHtml) {
        this.height = height;
        this.width = width;
        this.headHeight = headHeight;
        this.cHtml = contentsHtml;
    };
    Popup.prototype.close = function () {
        Popup.prototype.count--;
        document.body.removeChild(this.pop);
        document.body.removeChild(this.block);
    };
    Popup.prototype.getPop = function () {
        if (this.width && this.height) {
            if (this.title) {
                var pop,
                    popHead,
                    self = this;
                this.pop = pop = document.createElement("div");
                pop.id = "popup" + this.id;
                pop.innerHTML =
                    "<div class='popup-head'><label class='popup-title'>" +
                    this.title +
                    "</label><div class='popup-close'>X</div></div><div class='popup-contents'></div>";
                document.body.appendChild(pop);
                pop.style.height = this.height + "px";
                pop.style.width = this.width + "px";
                popHead = document.getElementsByClassName("popup-head")[0];
                popHead.style.height = this.headHeight + "px";
                popHead.style.width = this.width;
                popClose = document.getElementsByClassName("popup-close")[0];
                HS(popClose).on("click", function () {
                    self.close();
                });
                popClose.style.width = this.headHeight + "px";
                popClose.style.height = this.headHeight + "px";
                pop.style.zIndex = 9999;
            } else {
                var pop,
                    popHead,
                    self = this,
                    pick;
                this.pop = pop = document.createElement("div");
                pop.id = "popup" + this.id;
                pop.innerHTML =
                    "<div class='popup-head'><div class='popup-close'>X</div></div><div class='popup-contents'></div>";
                document.body.appendChild(pop);
                pop.style.height = this.height + "px";
                pop.style.width = this.width + "px";
                popClose = document.getElementsByClassName("popup-close")[0];
                HS(popClose).on("click", function () {
                    self.close();
                });
                popClose.style.width = this.headHeight + "px";
                popClose.style.height = this.headHeight + "px";
                pop.style.zIndex = 9999;
            }
        }
    };
    HOSUNG.extend({
        popup: function (e) {
            //HOSUNG.popup() 또는 HS.popup() 으로 접근 가능.
            return new Popup(e); //Popup클래스를 인스턴스화한 인스턴스를 리턴받음
        },
    });
    //popup 끝
    //box Make 시작
    function Box(setting) {
        var node,
            i,
            content,
            box = HOSUNG.domMake([
                "hs-box",
                { id: setting.id },
                [
                    "div",
                    { class: "hs-box-selecting-off hs-box" },
                    ["label", { class: "hs-normal-text hs-left" }, setting.baseText],
                    ["span", { class: "hs-box-open" }, ["img", { src: "./img/arrow1.svg" }]],
                ],
                ["div", { class: "hs-box-list-wrap" }, ["div", { class: "hs-box-list" }]],
            ]),
            scrollEl,
            listWrap,
            kkk;
        this.box = box;
        this.listWrap = listWrap = box.children[1];
        contentWrap = listWrap.children[0];
        if (setting.width) {
            box.children[0].style.width = setting.width;
        }
        kkk = function (e) {
            if (e.which === 1 || e.target === window) {
                var selectBox = box.children,
                    label;
                label = document.getElementsByClassName("hs-normal-text")[0];
                selectBox[1].style.display = "none";
                HOSUNG.removeClass(selectBox[0], "hs-box-selecting-on");
                HOSUNG.addClass(selectBox[0], "hs-box-selecting-off");
                HOSUNG.globalEvent("mousedown", selectOffFun, false);
                console.log(this.textContent);
                console.log(label.textContent);
                label.textContent = "" + this.textContent + "";
            }
        };
        i = 0;
        //멤버 만들어지는 코드
        while ((content = setting.members[i])) {
            node = HOSUNG.domMake(["div", { class: "hs-list-mem", title: content.title }, content.text]);
            if (content.size) {
                node.style.fontSize = content.size;
            }
            if (content.font) {
                node.style.fontFamily = content.font;
            }
            contentWrap.appendChild(node);
            if (!content.event) {
                setting.event(content[setting.eventParam], node);
            } else {
                node.addEventListener("click", content.event);
                node.addEventListener("click", kkk);
            }
            i++;
        }
        //멤버 만들어지는 코드 끝
        //box 이벤트 등록
        var boxOpenFun, openUpFun, closeUpFun, selectOffFun;
        selectOffFun = function (e) {
            if (e.which === 1 || e.target === window) {
                var selectBox = box.children;
                if (!(e.target === box || HOSUNG.contains(box, e.target)) || e.target === window) {
                    selectBox[1].style.display = "none";
                    HOSUNG.removeClass(selectBox[0], "hs-box-selecting-on");
                    HOSUNG.addClass(selectBox[0], "hs-box-selecting-off");
                    HOSUNG.globalEvent("mousedown", selectOffFun, false);
                } else {
                }
            }
        };
        openUpFun = function (e) {
            if (e.target === box || HOSUNG.contains(box, e.target)) {
                var list = box.children[1];
                list.style.display = "block";
                if (HOSUNG.find(list, "hs-scroll").length === 0) {
                    scrollEl = scroll.make(list, 12);
                    scrollEl.setting(list);
                }
                HOSUNG.globalEvent("mousedown", selectOffFun, true);
            } else {
                HOSUNG.removeClass(box.children[0], "hs-box-selecting-on");
                HOSUNG.addClass(box.children[0], "hs-box-selecting-off");
            }
            HOSUNG.globalEvent("mouseup", openUpFun, false);
        };
        closeUpFun = function (e) {
            if (e.which === 1) {
                if (e.target === box.children[0] || HOSUNG.contains(box.children[0], e.target)) {
                    box.children[1].style.display = "none";
                    HOSUNG.removeClass(box.children[0], "hs-box-selecting-on");
                    HOSUNG.addClass(box.children[0], "hs-box-selecting-off");
                    HOSUNG.globalEvent("mouseup", closeUpFun, false);
                }
            }
        };
        boxOpenFun = function (e) {
            if (e.which === 1) {
                if (HOSUNG.hasClass(this, "hs-box-selecting-off")) {
                    HOSUNG.removeClass(this, "hs-box-selecting-off");
                    HOSUNG.addClass(this, "hs-box-selecting-on");
                    HOSUNG.globalEvent("mouseup", openUpFun, true);
                } else if (HOSUNG.hasClass(this, "hs-box-selecting-on")) {
                    HOSUNG.globalEvent("mouseup", closeUpFun, true);
                }
            }
        };
        box.children[0].addEventListener("mousedown", boxOpenFun);
        box.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        if (setting.parent) {
            setting.parent.appendChild(box);
        }
    }
    Box.prototype.setBaseText = function () {};
    HOSUNG.extend({
        box: function (options) {
            return new Box(options);
        },
    });
    //box Make 끝

    //ResizeObserver polyfill and comfortable api
    (function () {
        var scrollRegexp = /auto|scroll/;
        var verticalRegexp = /^tb|vertical/;
        var IE = /msie|trident/i.test(window.navigator && window.navigator.userAgent);
        var parseDimension = function (pixel) {
            return parseFloat(pixel || "0");
        };
        var ResizeObserverBoxOptions;
        (function (ResizeObserverBoxOptions) {
            ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
            ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
        })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
        var resizeObservers = [];

        var DOMRectReadOnly = (function () {
            function DOMRectReadOnly(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.top = this.y;
                this.left = this.x;
                this.bottom = this.top + this.height;
                this.right = this.left + this.width;
                return Object.freeze(this);
            }
            DOMRectReadOnly.fromRect = function (rectangle) {
                return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            };
            return DOMRectReadOnly;
        })();

        function isSVG(target) {
            return target instanceof SVGElement && "getBBox" in target;
        }
        function isHidden(target) {
            if (isSVG(target)) {
                var _a = target.getBBox(),
                    width = _a.width,
                    height = _a.height;
                return !width && !height;
            }
            var _b = target,
                offsetWidth = _b.offsetWidth,
                offsetHeight = _b.offsetHeight;
            return !(offsetWidth || offsetHeight || target.getClientRects().length);
        }
        function isReplacedElement(target) {
            switch (target.tagName) {
                case "INPUT":
                    if (target.type !== "image") {
                        break;
                    }
                case "VIDEO":
                case "AUDIO":
                case "EMBED":
                case "OBJECT":
                case "CANVAS":
                case "IFRAME":
                case "IMG":
                    return true;
            }
            return false;
        }
        //Calculate Box Size
        var zeroBoxes = Object.freeze({
            borderBoxSize: size(),
            contentBoxSize: size(),
            contentRect: new DOMRectReadOnly(0, 0, 0, 0),
        });
        function size(inlineSize, blockSize, switchSizes) {
            if (inlineSize === void 0) {
                inlineSize = 0;
            }
            if (blockSize === void 0) {
                blockSize = 0;
            }
            if (switchSizes === void 0) {
                switchSizes = false;
            }
            return Object.freeze({
                inlineSize: (switchSizes ? blockSize : inlineSize) || 0,
                blockSize: (switchSizes ? inlineSize : blockSize) || 0,
            });
        }
        function calculateBoxSize(target, observedBox) {
            var _a = calculateBoxSizes(target),
                borderBoxSize = _a.borderBoxSize,
                contentBoxSize = _a.contentBoxSize;
            return observedBox === ResizeObserverBoxOptions.BORDER_BOX ? borderBoxSize : contentBoxSize;
        }
        calculateBoxSize.cache = new Map();
        function calculateBoxSizes(target) {
            if (calculateBoxSize.cache.has(target)) {
                return calculateBoxSize.cache.get(target);
            }
            if (isHidden(target)) {
                calculateBoxSize.cache.set(target, zeroBoxes);
                return zeroBoxes;
            }
            var cs = getComputedStyle(target);
            var svg = isSVG(target) && target.getBBox();
            var removePadding = !IE && cs.boxSizing === "border-box";
            var switchSizes = verticalRegexp.test(cs.writingMode || "");
            var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
            var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
            var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
            var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
            var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
            var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
            var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
            var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
            var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
            var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
            var horizontalPadding = paddingLeft + paddingRight;
            var verticalPadding = paddingTop + paddingBottom;
            var horizontalBorderArea = borderLeft + borderRight;
            var verticalBorderArea = borderTop + borderBottom;
            var horizontalScrollbarThickness = !canScrollHorizontally
                ? 0
                : target.offsetHeight - verticalBorderArea - target.clientHeight;
            var verticalScrollbarThickness = !canScrollVertically
                ? 0
                : target.offsetWidth - horizontalBorderArea - target.clientWidth;
            var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
            var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
            var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
            var contentHeight = svg
                ? svg.height
                : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
            var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
            var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
            var boxes = Object.freeze({
                borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
                contentBoxSize: size(contentWidth, contentHeight, switchSizes),
                contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight),
            });
            calculateBoxSize.cache.set(target, boxes);
            return boxes;
        }

        var ResizeObservation = (function () {
            var skipNotifyOnElement = function (target) {
                return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
            };
            function ResizeObservation(target, observedBox) {
                this.target = target;
                this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
                this.lastReportedSize = {
                    inlineSize: 0,
                    blockSize: 0,
                };
            }
            ResizeObservation.prototype.isActive = function () {
                var size = calculateBoxSize(this.target, this.observedBox);
                if (skipNotifyOnElement(this.target)) {
                    this.lastReportedSize = size;
                }
                if (
                    this.lastReportedSize.inlineSize !== size.inlineSize ||
                    this.lastReportedSize.blockSize !== size.blockSize
                ) {
                    return true;
                }
                return false;
            };
            return ResizeObservation;
        })();

        var queueMicroTask = (function () {
            var trigger;
            var callbacks = [];
            var notify = function () {
                return callbacks.splice(0).forEach(function (cb) {
                    return cb();
                });
            };
            function queueMicroTask(callback) {
                if (!trigger) {
                    var el_1 = document.createTextNode("");
                    var config = { characterData: true };
                    new MutationObserver(function () {
                        return notify();
                    }).observe(el_1, config);
                    trigger = function () {
                        el_1.textContent = "";
                    };
                }
                callbacks.push(callback);
                trigger();
            }
            return queueMicroTask;
        })();

        var queueResizeObserver = function (cb) {
            queueMicroTask(function ResizeObserver() {
                requestAnimationFrame(cb);
            });
        };

        var CATCH_FRAMES = 60 / 5;
        var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
        var events = [
            "resize",
            "load",
            "transitionend",
            "animationend",
            "animationstart",
            "animationiteration",
            "keyup",
            "keydown",
            "mouseup",
            "mousedown",
            "mouseover",
            "mouseout",
            "blur",
            "focus",
        ];
        var scheduled = false;
        var Scheduler = (function () {
            function Scheduler() {
                var _this = this;
                this.stopped = true;
                this.listener = function () {
                    return _this.schedule();
                };
            }
            Scheduler.prototype.run = function (frames) {
                var _this = this;
                if (scheduled) {
                    return;
                }
                scheduled = true;
                queueResizeObserver(function () {
                    var elementsHaveResized = false;
                    try {
                        elementsHaveResized = ResizeObserverController.process();
                    } finally {
                        scheduled = false;
                        if (!ResizeObserverController.isWatching()) {
                            return;
                        }
                        if (elementsHaveResized) {
                            _this.run(60);
                        } else if (frames) {
                            _this.run(frames - 1);
                        } else {
                            _this.start();
                        }
                    }
                });
            };
            Scheduler.prototype.schedule = function () {
                this.stop();
                this.run(CATCH_FRAMES);
            };
            Scheduler.prototype.observe = function () {
                var _this = this;
                var cb = function () {
                    return _this.observer && _this.observer.observe(document.body, observerConfig);
                };
                document.body ? cb() : window.addEventListener("DOMContentLoaded", cb);
            };
            Scheduler.prototype.start = function () {
                var _this = this;
                if (this.stopped) {
                    this.stopped = false;
                    this.observer = new MutationObserver(this.listener);
                    this.observe();
                    events.forEach(function (name) {
                        return window.addEventListener(name, _this.listener, true);
                    });
                }
            };
            Scheduler.prototype.stop = function () {
                var _this = this;
                if (!this.stopped) {
                    this.observer && this.observer.disconnect();
                    events.forEach(function (name) {
                        return window.removeEventListener(name, _this.listener, true);
                    });
                    this.stopped = true;
                }
            };
            return Scheduler;
        })();
        var scheduler = new Scheduler();
        var ResizeObserverEntry = (function () {
            function ResizeObserverEntry(target) {
                var boxes = calculateBoxSizes(target);
                this.target = target;
                this.contentRect = boxes.contentRect;
                this.borderBoxSize = boxes.borderBoxSize;
                this.contentBoxSize = boxes.contentBoxSize;
            }
            return ResizeObserverEntry;
        })();
        var ResizeObserverDetail = (function () {
            function ResizeObserverDetail(resizeObserver, callback) {
                this.activeTargets = [];
                this.skippedTargets = [];
                this.observationTargets = [];
                this.observer = resizeObserver;
                this.callback = callback;
            }
            return ResizeObserverDetail;
        })();
        var hasActiveObservations = function () {
            return resizeObservers.some(function (ro) {
                return ro.activeTargets.length > 0;
            });
        };
        var hasSkippedObservations = function () {
            return resizeObservers.some(function (ro) {
                return ro.skippedTargets.length > 0;
            });
        };

        var deliverResizeLoopErrorMsg = "ResizeObserver loop completed with undelivered notifications.";
        var deliverResizeLoopError = function () {
            var event;
            if (typeof ErrorEvent === "function") {
                event = new ErrorEvent("error", {
                    message: deliverResizeLoopErrorMsg,
                });
            } else {
                event = document.createEvent("Event");
                event.initEvent("error", false, false);
                event.message = deliverResizeLoopErrorMsg;
            }
            window.dispatchEvent(event);
        };
        var calculateDepthForNode = function (node) {
            if (isHidden(node)) {
                return Infinity;
            }
            var depth = 0;
            var parent = node.parentNode;
            while (parent) {
                depth += 1;
                parent = parent.parentNode;
            }
            return depth;
        };
        var broadcastActiveObservations = function () {
            var shallowestDepth = Infinity;
            var callbacks = [];
            resizeObservers.forEach(function processObserver(ro) {
                if (ro.activeTargets.length === 0) {
                    return;
                }
                var entries = [];
                ro.activeTargets.forEach(function processTarget(ot) {
                    var entry = new ResizeObserverEntry(ot.target);
                    var targetDepth = calculateDepthForNode(ot.target);
                    entries.push(entry);
                    ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
                    if (targetDepth < shallowestDepth) {
                        shallowestDepth = targetDepth;
                    }
                });
                callbacks.push(function resizeObserverCallback() {
                    ro.callback.call(ro.observer, entries, ro.observer);
                });
                ro.activeTargets.splice(0, ro.activeTargets.length);
            });
            for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                var callback = callbacks_1[_i];
                callback();
            }
            return shallowestDepth;
        };
        var gatherActiveObservationsAtDepth = function (depth) {
            calculateBoxSize.cache.clear();
            resizeObservers.forEach(function processObserver(ro) {
                ro.activeTargets.splice(0, ro.activeTargets.length);
                ro.skippedTargets.splice(0, ro.skippedTargets.length);
                ro.observationTargets.forEach(function processTarget(ot) {
                    if (ot.isActive()) {
                        if (calculateDepthForNode(ot.target) > depth) {
                            ro.activeTargets.push(ot);
                        } else {
                            ro.skippedTargets.push(ot);
                        }
                    }
                });
            });
        };

        var ResizeObserverController = (function () {
            var watching = 0;
            var observerMap = new Map();
            var updateCount = function (n) {
                !watching && n > 0 && scheduler.start();
                watching += n;
                !watching && scheduler.stop();
            };
            var getObservationIndex = function (observationTargets, target) {
                for (var i = 0; i < observationTargets.length; i += 1) {
                    if (observationTargets[i].target === target) {
                        return i;
                    }
                }
                return -1;
            };

            function ResizeObserverController() {}
            ResizeObserverController.connect = function (resizeObserver, callback) {
                var detail = new ResizeObserverDetail(resizeObserver, callback);
                resizeObservers.push(detail);
                observerMap.set(resizeObserver, detail);
            };
            ResizeObserverController.observe = function (resizeObserver, target, options) {
                if (observerMap.has(resizeObserver)) {
                    var detail = observerMap.get(resizeObserver);
                    if (getObservationIndex(detail.observationTargets, target) < 0) {
                        detail.observationTargets.push(new ResizeObservation(target, options && options.box));
                        updateCount(1);
                        scheduler.schedule();
                    }
                }
            };
            ResizeObserverController.unobserve = function (resizeObserver, target) {
                if (observerMap.has(resizeObserver)) {
                    var detail = observerMap.get(resizeObserver);
                    var index = getObservationIndex(detail.observationTargets, target);
                    if (index >= 0) {
                        detail.observationTargets.splice(index, 1);
                        updateCount(-1);
                    }
                }
            };
            ResizeObserverController.disconnect = function (resizeObserver) {
                if (observerMap.has(resizeObserver)) {
                    var detail = observerMap.get(resizeObserver);
                    resizeObservers.splice(resizeObservers.indexOf(detail), 1);
                    observerMap["delete"](resizeObserver);
                    updateCount(-detail.observationTargets.length);
                }
            };
            ResizeObserverController.process = function () {
                var depth = 0;
                gatherActiveObservationsAtDepth(depth);
                while (hasActiveObservations()) {
                    depth = broadcastActiveObservations();
                    gatherActiveObservationsAtDepth(depth);
                }
                if (hasSkippedObservations()) {
                    deliverResizeLoopError();
                }
                return depth > 0;
            };
            ResizeObserverController.isWatching = function () {
                return !!watching;
            };
            return ResizeObserverController;
        })();

        var ResizeObserver = (function () {
            function ResizeObserver(callback) {
                if (arguments.length === 0) {
                    throw new TypeError(
                        "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
                    );
                }
                if (typeof callback !== "function") {
                    throw new TypeError(
                        "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
                    );
                }
                ResizeObserverController.connect(this, callback);
            }
            ResizeObserver.prototype.observe = function (target, options) {
                if (arguments.length === 0) {
                    throw new TypeError(
                        "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
                    );
                }
                if (target instanceof Element === false) {
                    throw new TypeError(
                        "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
                    );
                }
                ResizeObserverController.observe(this, target, options);
            };
            ResizeObserver.prototype.unobserve = function (target) {
                if (arguments.length === 0) {
                    throw new TypeError(
                        "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
                    );
                }
                if (target instanceof Element === false) {
                    throw new TypeError(
                        "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
                    );
                }
                ResizeObserverController.unobserve(this, target);
            };
            ResizeObserver.prototype.disconnect = function () {
                ResizeObserverController.disconnect(this);
            };
            ResizeObserver.toString = function () {
                return "function ResizeObserver () { [polyfill code] }";
            };
            return ResizeObserver;
        })();
        window.ResizeObserver = ResizeObserver;
    })();
    var resizeEventMap = new Map(),
        resizeObserver;
    function addResizeEvent(node, cb) {
        var eventArray,
            isNew = false;
        if ((eventArray = resizeEventMap.get(node))) {
            eventArray.push(cb);
        } else {
            eventArray = [cb];
            isNew = true;
        }
        resizeEventMap.set(node, eventArray);
        if (!resizeObserver) {
            resizeObserver = new window.ResizeObserver(function (entries) {
                resizeEventMap.forEach(function (value, key) {
                    var i;
                    for (i = 0; i < value.length; i++) {
                        value[i](entries);
                    }
                });
            });
        }
        if (isNew) {
            resizeObserver.observe(node);
        }
    }
    function removeResizeEvent(node, cb) {
        var eventArray;
        if ((eventArray = resizeEventMap.get(node))) {
            eventArray.remove(cb);
            if (eventArray.length === 0) {
                resizeEventMap.delete(node);
                resizeObserver.unobserve(node);
            }
        }
    }
    HOSUNG.addResizeEvent = addResizeEvent;
    HOSUNG.removeResizeEvent = removeResizeEvent;
    //ResizeObserver polyfill and comfortable api 끝

    //scroll 시작
    function resizeBody() {
        var draggerHeight;
        if (this.config.tickButton.display) {
            topButtonHeight = this.dragger.parentNode.previousElementSibling.offsetHeight;
            bottomButtonHeight = this.dragger.parentNode.nextElementSibling.offsetHeight;
        }
        if (this.body.clientHeight === this.body.scrollHeight) {
            if (this.display) {
                this.hide();
                this.dragger.style.height = this.rail.offsetHeight + "px";
                this.dragger.style.top = "0px";
            }
            return;
        }
        if (!this.display) {
            this.show();
        }
        draggerHeight = this.rail.offsetHeight * (this.body.clientHeight / this.body.scrollHeight);
        this.dragger.style.height = draggerHeight + "px";
        this.dTop = this.rail.offsetHeight * (this.body.scrollTop / this.body.scrollHeight);
        this.dragger.style.top = this.dTop + "px";
        this.bHeight = this.body.scrollTop;
    }
    function bodyScrollSet(deltaY, animateSpeed) {
        if (animateSpeed === undefined) animateSpeed = 200;
        var dragger = this.dragger,
            rail = this.rail,
            sHeight = this.body.scrollHeight,
            cHeight = this.body.clientHeight,
            rHeight = rail.clientHeight;
        if (
            this.bHeight <= sHeight - cHeight &&
            this.bHeight >= 0 &&
            !(deltaY > 0 && this.bHeight === sHeight - cHeight) &&
            !(deltaY < 0 && this.bHeight === 0)
        ) {
            this.bHeight += deltaY;
            if (this.bHeight > sHeight - cHeight) this.bHeight = sHeight - cHeight;
            if (this.bHeight < 0) this.bHeight = 0;
            HSAnim.stop(this.body);
            HSAnim.animate(this.body, { scrollTop: this.bHeight }, animateSpeed);
        }
    }

    function draggerScrollSet(deltaY, animateSpeed) {
        if (animateSpeed === undefined) animateSpeed = 200;
        var dragger = this.dragger,
            rail = this.rail,
            sHeight = this.body.scrollHeight,
            cHeight = this.body.clientHeight,
            rHeight = rail.clientHeight,
            dHeight = parseFloat(dragger.style.height);
        if (dHeight < 20) {
            dHeight = 20;
        }
        this.dTop = this.dTop || 0;
        if (
            this.dTop >= 0 &&
            !(deltaY > 0 && this.dTop + dHeight === rHeight) &&
            !(deltaY < 0 && this.dTop + dHeight === 0)
        ) {
            this.dTop = parseFloat(this.dTop) + (rHeight - parseFloat(dHeight)) / ((sHeight - cHeight) / deltaY);
            if (this.dTop + dHeight > rHeight) this.dTop = rHeight - dHeight;
            if (this.dTop < 0) this.dTop = 0;
            HSAnim.stop(this.dragger);
            HSAnim.animate(dragger, { top: this.dTop }, animateSpeed);
        }
    }

    function Scroll(config) {
        if (config === undefined) config = {};
        var scrollWrap,
            scrollContainer,
            dragger,
            rail,
            upTime,
            downTime,
            buttonEndFun,
            railFun,
            self = this,
            draggerClick = false,
            downFun = true,
            upFun = true,
            scrollAppendNode;
        typeof config.width === "number" && config.width ? null : (config.width = 8);
        typeof config.fade === "boolean" && config.fade ? null : (config.fade = false);
        if (typeof config.railDisplay !== "boolean") config.railDisplay = true;
        if (typeof config.railOpacity !== "number") config.railOpacity = 1;
        if (typeof config.over === "object") {
            if (typeof config.over.railOpacity !== "number") config.over.railOpacity = 0.5;
            if (typeof config.over.overWidth !== "number") config.over.railOpacity = 16;
            if (typeof config.over.scrollOpacity !== "number") config.over.scrollOpacity = undefined;
        }
        if (config.tickButton) {
            if (typeof config.tickButton.display !== "boolean") config.tickButton.display = true;
        }
        config.scrollAppendNode ? (scrollAppendNode = config.scrollAppendNode) : (scrollAppendNode = document.body);
        this.scrollAppendNode = scrollAppendNode;
        this.config = config;
        this.body = config.scrollTarget;
        this.scrollWrap = scrollWrap = document.createElement("hs-scroll");
        scrollWrap.style.width = config.width + "px";
        scrollWrap.style.zIndex = 999;
        scrollWrap.innerHTML =
            "<div class='hs-scroll-container'>" +
            (config.tickButton.display ? "<div class='hs-scroll-button-top'></div>" : "") +
            "<div class='hs-scroll'><div class='hs-scroll-dragger-wrap'><div class='hs-scroll-dragger'></div></div><div class='hs-scroll-rail'></div></div>" +
            (config.tickButton.display ? "<div class='hs-scroll-button-bottom'></div>" : "") +
            "</div>";
        scrollAppendNode.appendChild(scrollWrap);

        this.scrollContainer = scrollContainer = scrollWrap.children[0];
        this.dragger = HS(scrollAppendNode).find(".hs-scroll-dragger-wrap")[0];
        if (config.scrollOpacity !== undefined) this.dragger.style.opacity = config.scrollOpacity;
        this.rail = HS(scrollAppendNode).find(".hs-scroll-rail")[0];
        config.railDisplay ? (this.rail.style.opacity = config.railOpacity) : (this.rail.style.opacity = 0);
        this.bHeight = this.body.scrollTop;
        this.dTop = this.dTop || 0;
        this.event = {};
        //창 크기 변경될 시 스크롤바 크기 변경
        this.event.resizeBody = resizeBody.bind(this);
        this.resize();

        //스크롤영역에 마우스 들어오면 스크롤 크기
        if (config.over) {
            var scrollMouseOver, scrollMouseOut;
            scrollMouseOver = function () {
                self.scrollOver = true;
                scrollWrap.style.width = config.over.overWidth;
                self.rail.style.opacity = config.over.railOpacity;
                if (config.over.scrollOpacity !== undefined) self.dragger.style.opacity = config.over.scrollOpacity;
            };
            scrollMouseOut = function () {
                self.scrollOver = false;
                if (!self.draggerMouseDown) {
                    scrollWrap.style.width = config.width;
                    config.railDisplay ? (self.rail.style.opacity = config.railOpacity) : (self.rail.style.opacity = 0);
                    if (config.scrollOpacity !== undefined) self.dragger.style.opacity = config.scrollOpacity;
                }
            };
            this.event.scrollMouseOver = scrollMouseOver;
            this.event.scrollMouseOut = scrollMouseOut;
        }
        /*
	컨텐츠영역에서 마우스 벗어나면 스크롤바가 사라진다.
	config.fade == true
	*/
        if (config.fade) {
            var scrollWrapVisible, scrollWrapHidden;
            scrollWrapVisible = function () {
                self.scrollFade = false;
                scrollWrap.style.opacity = 1;
            };
            scrollWrapHidden = function () {
                self.scrollFade = true;
                if (!self.draggerMouseDown) {
                    scrollWrap.style.opacity = 0;
                }
            };
            this.event.scrollWrapVisible = scrollWrapVisible.bind(this);
            this.event.scrollWrapHidden = scrollWrapHidden.bind(this);
        }

        //마우스 휠 돌릴때 스크롤 이동
        this.event.mouseWheelScrollAction = function (e) {
            var deltaY = ieOn ? ~e.wheelDelta * +1 : e.deltaY;
            bodyScrollSet.call(self, deltaY);
            draggerScrollSet.call(self, deltaY);
            e.preventDefault();
        };
        //스크롤 위 아래 이동 버튼
        if (config.tickButton.display) {
            buttonEndFun = function () {
                clearInterval(self.downTime);
                clearInterval(self.upTime);
                scrollContainer.children[1].removeEventListener("mouseover", railFun);
                document.removeEventListener("mouseup", buttonEndFun);
                if (!upFun) {
                    scrollContainer.children[0].addEventListener("mousedown", self.event.upButtonAction);
                    upFun = true;
                }
                if (!downFun) {
                    scrollContainer.children[2].addEventListener("mousedown", self.event.downButtonAction);
                    downFun = true;
                }
            };
            //스크롤 위로 이동하는 버튼 클릭
            this.event.upButtonAction = function (e) {
                var deltaY = -40;
                bodyScrollSet.call(self, deltaY);
                draggerScrollSet.call(self, deltaY);
                self.upTime = setInterval(function () {
                    bodyScrollSet.call(self, deltaY, 100);
                    draggerScrollSet.call(self, deltaY, 100);
                }, 100);
                upFun = false;
                scrollContainer.children[0].removeEventListener("mousedown", self.event.upButtonAction);
                document.addEventListener("mouseup", buttonEndFun);
                e.stopPropagation();
                e.preventDefault();
            };
            //스크롤 아래로 이동하는 버튼 클릭
            this.event.downButtonAction = function (e) {
                var deltaY = 40;
                bodyScrollSet.call(self, deltaY);
                draggerScrollSet.call(self, deltaY);
                self.downTime = setInterval(function () {
                    bodyScrollSet.call(self, deltaY, 100);
                    draggerScrollSet.call(self, deltaY, 100);
                }, 100);
                downFun = false;
                scrollContainer.children[2].removeEventListener("mousedown", self.event.downButtonAction);
                document.addEventListener("mouseup", buttonEndFun);
                e.stopPropagation();
                e.preventDefault();
            };
            //up버튼 down버튼 우클릭시 context menu
            this.event.upButtonContextMenu = function (e) {
                e.preventDefault();
            };
            this.event.downButtonContextMenu = function (e) {
                e.preventDefault();
            };
        }
        //스크롤 레일 영역 클릭 시 스크롤 이동
        this.event.scrollRailClick = function (e) {
            var deltaY, getMouseY, mouseY;
            if (self.dTop + self.dragger.clientHeight < e.layerY) {
                deltaY = self.body.clientHeight * 0.875;
            } else if (self.dTop > e.layerY) {
                deltaY = -(self.body.clientHeight * 0.875);
            }
            bodyScrollSet.call(self, deltaY);
            draggerScrollSet.call(self, deltaY);
        };

        //마우스로 스크롤바 누른상태로 마우스 위아래로 이동시 스크롤 이동
        this.event.draggerPressMoveAction = function (e) {
            var dTop = parseFloat(self.dragger.style.top || 0),
                frames;
            self.draggerMouseDown = true;
            moveFun = function (e2) {
                var t = self.dTop + (e2.screenY - e.screenY) / window.devicePixelRatio;
                var draggerHeight = parseFloat(self.dragger.style.height);
                if (draggerHeight < 20) {
                    draggerHeight = 20;
                }
                if (t < 0) {
                    self.bHeight = 0;
                    dTop = 0;
                } else if (t + self.dragger.clientHeight > self.rail.clientHeight) {
                    self.bHeight = self.body.scrollHeight - self.body.clientHeight;
                    dTop = self.rail.clientHeight - parseFloat(draggerHeight);
                } else {
                    self.bHeight =
                        t *
                        ((self.body.scrollHeight - self.body.clientHeight) / (self.rail.clientHeight - draggerHeight));
                    dTop = t;
                }
                HSAnim.stop(self.body);
                HSAnim.animate(self.body, { scrollTop: self.bHeight }, 100);
                self.dragger.style.top = dTop + "px";
            };
            eventRemove = function () {
                self.draggerMouseDown = false;
                self.dTop = dTop;
                document.removeEventListener("mousemove", moveFun);
                document.removeEventListener("mouseup", eventRemove);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.removeEventListener("mousemove", moveFun);
                    frames[i].contentDocument.removeEventListener("mouseup", eventRemove);
                }
                self.dragger.addEventListener("mousedown", self.event.draggerPressMoveAction);
                if (config.fade && self.scrollFade) {
                    scrollWrapHidden();
                }
                if (config.over && !self.scrollOver) {
                    scrollMouseOut();
                }
            };
            frames = document.getElementsByTagName("iframe");
            document.addEventListener("mousemove", moveFun);
            document.addEventListener("mouseup", eventRemove);
            for (i = 0; i < frames.length; i++) {
                frames[i].contentDocument.addEventListener("mousemove", moveFun);
                frames[i].contentDocument.addEventListener("mouseup", eventRemove);
            }
            this.removeEventListener("mousedown", self.event.draggerPressMoveAction);

            e.preventDefault();
        };
        this.startEvent();
    }
    Scroll.prototype.setting = function (node, railHeight, scrollHeight) {
        var scrollWrap = HOSUNG.find(node, "hs-scroll")[0],
            dragger,
            rail;
        dragger = HOSUNG.find(scrollWrap, ".hs-scroll-dragger-wrap")[0];
        rail = HOSUNG.find(scrollWrap, ".hs-scroll-rail")[0];
        var railHeight = railHeight || rail.clientHeight,
            scrollHeight = scrollHeight || node.childNodes[0].scrollHeight;
        dragger.style.height = (railHeight * railHeight) / scrollHeight + "px";
    };
    Scroll.prototype.startEvent = function () {
        //window.addEventListener("resize", this.event.resizeBody);
        HOSUNG.addResizeEvent(this.body, this.event.resizeBody);
        HOSUNG.addResizeEvent(this.scrollWrap, this.event.resizeBody);

        if (this.config.over) {
            this.scrollWrap.addEventListener("mouseover", this.event.scrollMouseOver);
            this.scrollWrap.addEventListener("mouseout", this.event.scrollMouseOut);
        }
        if (this.config.fade) {
            this.body.addEventListener("mouseover", this.event.scrollWrapVisible);
            this.body.addEventListener("mouseout", this.event.scrollWrapHidden);
            this.scrollWrap.addEventListener("mouseover", this.event.scrollWrapVisible);
            this.scrollWrap.addEventListener("mouseout", this.event.scrollWrapHidden);
        }

        this.body.addEventListener("mousewheel", this.event.mouseWheelScrollAction);
        this.scrollWrap.addEventListener("mousewheel", this.event.mouseWheelScrollAction);

        if (this.config.tickButton.display) {
            this.scrollContainer.children[0].addEventListener("mousedown", this.event.upButtonAction);
            this.scrollContainer.children[2].addEventListener("mousedown", this.event.downButtonAction);
            this.scrollContainer.children[0].addEventListener("contextmenu", this.event.upButtonContextMenu);
            this.scrollContainer.children[2].addEventListener("contextmenu", this.event.downButtonContextMenu);
        }
        this.rail.addEventListener("click", this.event.scrollRailClick);

        this.dragger.addEventListener("mousedown", this.event.draggerPressMoveAction);
    };
    Scroll.prototype.stopEvent = function () {
        window.removeEventListener("resize", this.event.resizeBody);

        if (this.config.over) {
            this.scrollWrap.removeEventListener("mouseover", this.event.scrollMouseOver);
            this.scrollWrap.removeEventListener("mouseout", this.event.scrollMouseOut);
        }

        if (this.config.fade) {
            this.body.removeEventListener("mouseover", this.event.scrollWrapVisible);
            this.body.removeEventListener("mouseout", this.event.scrollWrapHidden);
            this.scrollWrap.removeEventListener("mouseover", this.event.scrollWrapVisible);
            this.scrollWrap.removeEventListener("mouseout", this.event.scrollWrapHidden);
        }

        this.body.removeEventListener("mousewheel", this.event.mouseWheelScrollAction);
        this.scrollWrap.removeEventListener("mousewheel", this.event.mouseWheelScrollAction);

        if (this.config.tickButton.display) {
            this.scrollContainer.children[0].removeEventListener("mousedown", this.event.upButtonAction);
            this.scrollContainer.children[2].removeEventListener("mousedown", this.event.downButtonAction);
            this.scrollContainer.children[0].removeEventListener("contextmenu", this.event.upButtonContextMenu);
            this.scrollContainer.children[2].removeEventListener("contextmenu", this.event.downButtonContextMenu);
        }
        this.rail.removeEventListener("click", this.event.scrollRailClick);

        this.dragger.removeEventListener("mousedown", this.event.draggerPressMoveAction);
    };
    Scroll.prototype.remove = function () {
        this.stopEvent();
        this.scrollWrap.parentNode.removeChild(this.scrollWrap);
    };
    Scroll.prototype.resize = function () {
        if (this.body.clientHeight === this.body.scrollHeight) {
            this.hide();
        } else {
            this.show();
        }
        this.event.resizeBody();
    };
    Scroll.prototype.hide = function () {
        this.display = false;
        this.scrollWrap.style.display = "none";
    };
    Scroll.prototype.show = function () {
        this.display = true;
        this.scrollWrap.style.display = "block";
    };
    scroll.extend({
        make: function (config) {
            return new Scroll(config);
        },
    });
    window.HSScroll = scroll;
    //scroll 끝
    //animation 시작 (미완성)
    var list = [],
        listCur = 0,
        render,
        lpos = 0;
    window.requestAnimationFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();
    window.cancelAnimationFrame = (function () {
        return (
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            }
        );
    })();
    function tick(i) {
        var type = list[i].type,
            name = list[i].name,
            speed = list[i].speed,
            value = list[i].value;
        if (!list[i].notCss) {
            list[i].node.style[name] = (list[i].cur += speed) + "px";
            if ((type === 0 && list[i].cur > value) || (type === 1 && list[i].cur <= value)) {
                list[i].node.style[name] = value + "px";
                if (list[i].endFun) {
                    list[i].endFun();
                }
                list.splice(i, 1);
            }
        } else if (list[i].notCss === 1) {
            list[i].node.style[name] = list[i].cur += speed;
            if ((type === 0 && list[i].cur > value) || (type === 1 && list[i].cur < value)) {
                list[i].node.style[name] = value;
                if (list[i].endFun) {
                    list[i].endFun();
                }
                list.splice(i, 1);
            }
        } else if (list[i].notCss === 2) {
            list[i].node[name] = list[i].cur += speed;
            if ((type === 0 && list[i].cur > value) || (type === 1 && list[i].cur < value)) {
                list[i].node[name] = value;
                if (list[i].endFun) {
                    list[i].endFun();
                }
                list.splice(i, 1);
            }
        }
    }
    function frameCompute() {
        for (i = 0; i < list.length; i++) {
            tick(i);
        }
        if (list.length !== 0) {
            render = requestAnimationFrame(frameCompute);
        } else {
            cancelAnimationFrame(render);
            render = undefined;
        }
    }

    function Animate(node, name, value, speed, count, endFun, fCur) {
        var cur,
            vLen,
            notCss = 0,
            frame = {},
            type;
        if (name === "width") {
            cur = node.clientWidth;
            if (value - node.clientWidth > 0) {
                type = 0;
            } else {
                type = 1;
            }
        } else if (name === "height") {
            cur = node.clientHeight;
            if (value - node.clientHeight > 0) {
                type = 0;
            } else {
                type = 1;
            }
        } else if (name === "scrollTop") {
            cur = node.scrollTop;
            if (value - node.scrollTop > 0) {
                type = 0;
            } else {
                type = 1;
            }
            notCss = 2;
        } else if (name === "opacity") {
            if (fCur !== null) {
                cur = fCur;
            } else {
                cur = parseFloat(node.style[name]) || 1;
            }

            if (value - cur > 0) {
                type = 0;
            } else {
                type = 1;
            }
            notCss = 1;
        } else {
            cur = parseInt(node.style[name]) || 0;
            if (value - parseInt(node.style[name] || 0) > 0) {
                type = 0;
            } else {
                type = 1;
            }
        }
        speed = (value - cur) / ((60 * speed) / 1000);

        frame = { node: node, type: type, speed: speed, value: value, cur: cur, name: name, notCss: notCss };
        if (endFun) {
            frame.endFun = endFun;
        }
        list[list.length] = frame;
        if (!render) {
            render = requestAnimationFrame(frameCompute);
        }
    }
    HSAnim.extend({
        animate: function (node, css, speed, endFun, fCur) {
            var save, _name;
            if (!Array.isArray(node)) {
                save = node;
                node = [];
                node[node.length] = save;
            }
            i = 0;

            while (node[i]) {
                for (_name in css) {
                    Animate(node[i], _name, css[_name], speed, list.length, endFun, fCur);
                }
                i++;
            }
        },
        stop: function (node) {
            var i = 0;

            while (list[i]) {
                if (list[i].node === node) {
                    list.splice(i--, 1);
                }
                i++;
            }
        },
    });
    window.HSAnim = HSAnim;
    //animation 끝
    //Image 시작
    var imgTypeReg1 = /image\/(jpeg|png)/;
    function imageResize(fileType, resize, blob, success, error) {
        var nData, newWidth, newHeight;
        if (imgTypeReg1.test(fileType)) {
            //jpeg, png
            //이미지 사이즈 조정
            var h_image = new Image();
            //이미지 로딩시간이 존재하므로 src에 파일 삽입 후 로딩 완료까지 시간이 필요함
            h_image.onload = function () {
                if (resize.width || resize.height) {
                    if (this.width && this.height) {
                        if (this.width < resize.width && this.height < resize.height && !resize.sizeup) {
                            nData = canvas.toDataURL(fileType).replace(fileType, "application/octec-stream");
                            success(nData, {
                                width: this.width,
                                height: this.height,
                            });
                            return;
                        } else {
                            newWidth = resize.width;
                            newHeight = resize.height;
                        }
                    } else {
                        if (this.width) {
                            newWidth = resize.width;
                            if (resize.keepAspectRatio) {
                                newHeight = newWidth * (this.height / this.width);
                            } else {
                                newHeight = this.height;
                            }
                        } else {
                            newHeight = resize.height;
                            if (resize.keepAspectRatio) {
                                newWidth = newHeight * (this.width / this.height);
                            } else {
                                newWidth = this.width;
                            }
                        }
                    }
                } else {
                    if (this.width > resize.maxWidth) {
                        //img 가로 최대사이즈 조정
                        newWidth = resize.maxWidth;
                        newHeight = newWidth * (this.height / this.width);
                    } else {
                        newWidth = this.width;
                        newHeight = this.height;
                    }
                    if (this.height > resize.maxHeight) {
                        //img 세로 최대사이즈 조정
                        newHeight = resize.maxHeight;
                        newWidth = newHeight * (newWidth / newHeight);
                    }
                }
                //canvas를 통해 이미지 resize
                canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, newWidth, newHeight);
                nData = canvas.toDataURL(fileType).replace(fileType, "application/octec-stream");
                success(nData, {
                    orgWidth: this.width,
                    orgHeight: this.height,
                    width: newWidth,
                    height: newHeight,
                });
            };
            h_image.src = blob;
        } else if (fileType === "image/gif") {
            var gif = new GIF(blob);
            nData = gif.data;
            newWidth = gif.width;
            newHeight = gif.height;
            gif = null;
            success(nData, {
                orgWidth: this.width,
                orgHeight: this.height,
                width: newWidth,
                height: newHeight,
            });
        } else {
            error();
        }
    }
    //Image 끝
    //FileUploader 시작!
    var files,
        curSize = 0;
    function stopUpload(config, type) {
        if (config.progress) {
            var progress = config.progress;
            if (type === 1) {
                progress.progressWarning.innerHTML = "이미지는 최대 " + config.count + "개 까지 업로드 가능합니다.";
            } else if (type === 2) {
                progress.progressWarning.innerHTML =
                    "이미지는 최대 " + HSedit.changeSize(config.maxSize) + "MB까지 업로드 가능합니다.";
            } else if (type === 3) {
                progress.progressWarning.innerHTML = "이미지의 확장자가 불확실합니다. 파일을 확인해주세요.";
            }
            progress.stop();
            progress = undefined;
        }
        config.error();
    }
    function fileValidTest(config) {
        var fileReader = new FileReader(),
            mimeReader = new FileReader(),
            fileDetails = [],
            isImage = false,
            isGIF = false,
            files = config.files,
            accessUpload = 0,
            fileIndex = 1;

        if (files.length > 0) {
            var allSize = 0,
                upSize = 0;
            if (config.maxCount) {
                if (files.length > config.maxCount) {
                    accessUpload = 1;
                    stopUpload(config, accessUpload);
                }
            }
            for (i = 0; i < files.length; i++) {
                allSize += files[i].size;
            }
            fileReader.onload = function (e) {
                var fileDetail, size, canvas, ctx, nData;
                var fileValidEnd;
                //개별파일 유효성 검증 끝날때마다 호출
                fileValidEnd = function (blob, info) {
                    if (!info) info = {};
                    if (isImage && info.width && info.height) {
                        fileDetails.push({
                            originalFile: new File([e.target.result], fileDetail.file.name, {
                                type: fileDetail.file.type,
                            }),
                            file: new File([blob], fileDetail.file.name, {
                                type: fileDetail.file.type,
                            }),
                            orgWidth: info.orgWidth,
                            orgHeight: info.orgHeight,
                            width: info.width,
                            height: info.height,
                            per: info.width / info.height,
                        });
                    } else {
                        fileDetails.push({
                            file: new File([blob], fileDetail.file.name, {
                                type: fileDetail.file.type,
                            }),
                        });
                    }
                    if (fileIndex < files.length) {
                        mimeReader.readAsArrayBuffer(files[tt]);
                    }
                    fileIndex++;
                    //모든 파일 유효성&사이즈 검증 끝난 뒤.
                    if (fileIndex - 1 === files.length) {
                        config.success(fileDetails);
                    }
                };

                fileDetail = { file: files[fileIndex - 1] };
                if (config.maxSize) {
                    if (curSize > config.maxSize === false) {
                        curSize += fileDetail.file.size;
                    } else {
                        //총 업로드된 이미지 사이즈가 maxSize일시 access 불가설정
                        accessUpload = 2;
                        stopUpload(config, accessUpload);
                    }
                }
                if (accessUpload === 0) {
                    upSize += fileDetail.file.size;
                    if (isImage && config.imageResize) {
                        imageResize(fileDetail.file.type, config.imageResize, e.target.result, fileValidEnd);
                    } else {
                        fileValidEnd(e.target.result);
                    }
                }
            };
            //mime 검사
            mimeReader.onload = function (e) {
                if (config.mimeCheck) {
                    var mime,
                        header = "",
                        gifCheck = "",
                        headerCheck = "",
                        i;
                    //mime type 가져오기
                    mime = new Uint8Array(e.target.result).subarray(0, 6);
                    for (i = 0; i < mime.length; i++) {
                        headerCheck += mime[i] < 16 ? "0" + mime[i].toString(16) : mime[i].toString(16);
                    }
                    header = headerCheck.substr(0, 8);
                    //mime 검사
                    if (
                        config.fileTypes & HOSUNG.File.JPG_FLAG &&
                        (header !== "ffd8ffe0" || header !== "ffd8ffe1" || header !== "ffd8ffe8")
                    ) {
                        isImage = true;
                    } else if (
                        config.fileTypes & HOSUNG.File.JPG_FLAG &&
                        (header !== "ffd8ffe0" || header !== "ffd8ffe2" || header !== "ffd8ffe3")
                    ) {
                        isImage = true;
                    } else if (config.fileTypes & "png" && header !== "89504e47") {
                        isImage = true;
                    } else if (config.fileTypes & "gif" && header !== "47494638") {
                        if (gifCheck === "474946383761" || gifCheck === "474946383961") {
                            isImage = true;
                            isGIF = true;
                        }
                    } else {
                        accessUpload = 3;
                    }
                }
                if (accessUpload === 0) {
                    fileReader.readAsDataURL(files[fileIndex - 1]);
                } else {
                    mimeReader = null;
                    stopUpload(config, accessUpload);
                }
            };
            //첫번째 파일 클라이언트 업로드 시작
            accessUpload === 0 ? mimeReader.readAsArrayBuffer(files[0]) : stopUpload();
        }
    }
    function fileUpload(url, fileData, cb, error) {
        HOSUNG.ajax({
            type: "post",
            dataType: "multiform",
            url: url,
            success: function (info) {
                info = JSON.parse(info);
                cb(info);
            },
            error: error,
            data: fileData,
        });
    }
    function FileUploader(info) {
        this.count = 0;
        this.url = info.url;
        this.success = info.success;
        this.error = info.error;
        this.files = info.files;
    }
    FileUploader.prototype.start = function () {
        this.count = 0;
        this.process();
    };
    FileUploader.prototype.process = function () {
        var self = this;
        if (this.count < this.files.length) {
            var fileData;
            if (ie9) {
                fileData = this.files[this.count].data;
            } else {
                fileData = new FormData();
                fileData.append("file", this.files[this.count].file);
            }
            this.count++;
            fileUpload(
                this.url,
                fileData,
                function (files) {
                    if (self.count === self.files.length) {
                        self.success(files);
                    } else {
                        self.process();
                    }
                },
                function (xhr, err) {
                    if (self.error) self.error();
                }
            );
        }
    };
    HOSUNG.File.extend({
        GIF_FLAG: 0x01,
        JPEG_FLAG: 0x02,
        JPG_FLAG: 0x04,
        PNG_FLAG: 0x08,
        SVG_FLAG: 0x10,
        fileValidCheck: function (config, event) {
            if (!config.fileTypes) throw new TypeError("file type don't be assigned.");
            if (!config.files) {
                if (event.type === "change")
                    // Common Upload
                    config.files = event.target.files;
                else if (event.type === "drop")
                    //드래그앤드랍
                    config.files = e.dataTransfer.files;
            } else {
                throw new TypeError("file is null.");
            }
            if (!config.mimeCheck) config.mimeCheck = true;
            return fileValidTest(config);
        },
        imageValidCheck: function (config, event) {
            if (!config.fileTypes)
                config.fileTypes =
                    HOSUNG.File.GIF_FLAG | HOSUNG.File.JPG_FLAG | HOSUNG.File.JPEG_FLAG | HOSUNG.File.PNG_FLAG;

            return HOSUNG.File.fileValidCheck(config, event);
        },
        Upload: {
            fileUpload: function (config, event) {
                var newConfig = {};
                if (config.maxSize) newConfig.maxSize = config.maxSize;
                if (config.maxCount) newConfig.maxCount = config.maxCount;
                if (config.imageResize) newConfig.imageResize = config.imageReSize;
                newConfig.success = function () {
                    HOSUNG.ajax({
                        type: "post",
                        url: config.url,
                        success: config.success,
                        error: config.error,
                    });
                };
                HOSUNG.File.fileValidCheck(newConfig, event);
            },
            imageFileUpload: function (config, event) {
                var newConfig = {};
                if (config.maxSize) newConfig.maxSize = config.maxSize;
                if (config.maxCount) newConfig.maxCount = config.maxCount;
                if (config.imageResize) newConfig.imageResize = config.imageResize;
                newConfig.success = function (files) {
                    var fileUploader = new FileUploader({
                        files: files,
                        url: config.url,
                        success: config.success,
                        error: config.error,
                    });
                    fileUploader.start();
                };
                newConfig.error = function () {
                    config.error();
                };
                HOSUNG.File.imageValidCheck(newConfig, event);
            },
        },
    });
    //FileUploader 끝!
    var _load = HOSUNG.fn.load;
    function getWindow(elem) {
        return HOSUNG.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    HOSUNG.fn.andSelf = HOSUNG.fn.addBack;
    HOSUNG.parseJSON = JSON.parse;
    if (typeof define === "function" && define.amd) {
        define("HOSUNG", [], function () {
            return HOSUNG;
        });
    }
    var _HOSUNG = window.HOSUNG,
        _HS = window.HS;
    HOSUNG.noConflict = function (deep) {
        if (window.HS === HOSUNG) {
            window.HS = _HS;
        }

        if (deep && window.HOSUNG === HOSUNG) {
            window.HOSUNG = _HOSUNG;
        }

        return HOSUNG;
    };

    if (!noGlobal) {
        window.HOSUNG = window.HS = HOSUNG;
    }

    return HOSUNG;
});
