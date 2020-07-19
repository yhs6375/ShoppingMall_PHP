Array.prototype.remove = function(val) {
    var j = 0;
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] !== val) {
            this[j++] = this[i];
        }
    }
    this.length = j;
};
(function() {
    var scrollRegexp = /auto|scroll/;
    var verticalRegexp = /^tb|vertical/;
    var IE = /msie|trident/i.test(window.navigator && window.navigator.userAgent);
    var parseDimension = function(pixel) {
        return parseFloat(pixel || "0");
    };
    var ResizeObserverBoxOptions;
    (function(ResizeObserverBoxOptions) {
        ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
        ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
    })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
    var resizeObservers = [];

    var DOMRectReadOnly = (function() {
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
        DOMRectReadOnly.fromRect = function(rectangle) {
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
        contentRect: new DOMRectReadOnly(0, 0, 0, 0)
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
            blockSize: (switchSizes ? inlineSize : blockSize) || 0
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
            contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
        });
        calculateBoxSize.cache.set(target, boxes);
        return boxes;
    }

    var ResizeObservation = (function() {
        var skipNotifyOnElement = function(target) {
            return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
        };
        function ResizeObservation(target, observedBox) {
            this.target = target;
            this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
            this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            };
        }
        ResizeObservation.prototype.isActive = function() {
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

    var queueMicroTask = (function() {
        var trigger;
        var callbacks = [];
        var notify = function() {
            return callbacks.splice(0).forEach(function(cb) {
                return cb();
            });
        };
        function queueMicroTask(callback) {
            if (!trigger) {
                var el_1 = document.createTextNode("");
                var config = { characterData: true };
                new MutationObserver(function() {
                    return notify();
                }).observe(el_1, config);
                trigger = function() {
                    el_1.textContent = "";
                };
            }
            callbacks.push(callback);
            trigger();
        }
        return queueMicroTask;
    })();

    var queueResizeObserver = function(cb) {
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
        "focus"
    ];
    var scheduled = false;
    var Scheduler = (function() {
        function Scheduler() {
            var _this = this;
            this.stopped = true;
            this.listener = function() {
                return _this.schedule();
            };
        }
        Scheduler.prototype.run = function(frames) {
            var _this = this;
            if (scheduled) {
                return;
            }
            scheduled = true;
            queueResizeObserver(function() {
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
        Scheduler.prototype.schedule = function() {
            this.stop();
            this.run(CATCH_FRAMES);
        };
        Scheduler.prototype.observe = function() {
            var _this = this;
            var cb = function() {
                return _this.observer && _this.observer.observe(document.body, observerConfig);
            };
            document.body ? cb() : window.addEventListener("DOMContentLoaded", cb);
        };
        Scheduler.prototype.start = function() {
            var _this = this;
            if (this.stopped) {
                this.stopped = false;
                this.observer = new MutationObserver(this.listener);
                this.observe();
                events.forEach(function(name) {
                    return window.addEventListener(name, _this.listener, true);
                });
            }
        };
        Scheduler.prototype.stop = function() {
            var _this = this;
            if (!this.stopped) {
                this.observer && this.observer.disconnect();
                events.forEach(function(name) {
                    return window.removeEventListener(name, _this.listener, true);
                });
                this.stopped = true;
            }
        };
        return Scheduler;
    })();
    var scheduler = new Scheduler();
    var ResizeObserverEntry = (function() {
        function ResizeObserverEntry(target) {
            var boxes = calculateBoxSizes(target);
            this.target = target;
            this.contentRect = boxes.contentRect;
            this.borderBoxSize = boxes.borderBoxSize;
            this.contentBoxSize = boxes.contentBoxSize;
        }
        return ResizeObserverEntry;
    })();
    var ResizeObserverDetail = (function() {
        function ResizeObserverDetail(resizeObserver, callback) {
            this.activeTargets = [];
            this.skippedTargets = [];
            this.observationTargets = [];
            this.observer = resizeObserver;
            this.callback = callback;
        }
        return ResizeObserverDetail;
    })();
    var hasActiveObservations = function() {
        return resizeObservers.some(function(ro) {
            return ro.activeTargets.length > 0;
        });
    };
    var hasSkippedObservations = function() {
        return resizeObservers.some(function(ro) {
            return ro.skippedTargets.length > 0;
        });
    };

    var deliverResizeLoopErrorMsg = "ResizeObserver loop completed with undelivered notifications.";
    var deliverResizeLoopError = function() {
        var event;
        if (typeof ErrorEvent === "function") {
            event = new ErrorEvent("error", {
                message: deliverResizeLoopErrorMsg
            });
        } else {
            event = document.createEvent("Event");
            event.initEvent("error", false, false);
            event.message = deliverResizeLoopErrorMsg;
        }
        window.dispatchEvent(event);
    };
    var calculateDepthForNode = function(node) {
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
    var broadcastActiveObservations = function() {
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
    var gatherActiveObservationsAtDepth = function(depth) {
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

    var ResizeObserverController = (function() {
        var watching = 0;
        var observerMap = new Map();
        var updateCount = function(n) {
            !watching && n > 0 && scheduler.start();
            watching += n;
            !watching && scheduler.stop();
        };
        var getObservationIndex = function(observationTargets, target) {
            for (var i = 0; i < observationTargets.length; i += 1) {
                if (observationTargets[i].target === target) {
                    return i;
                }
            }
            return -1;
        };

        function ResizeObserverController() {}
        ResizeObserverController.connect = function(resizeObserver, callback) {
            var detail = new ResizeObserverDetail(resizeObserver, callback);
            resizeObservers.push(detail);
            observerMap.set(resizeObserver, detail);
        };
        ResizeObserverController.observe = function(resizeObserver, target, options) {
            if (observerMap.has(resizeObserver)) {
                var detail = observerMap.get(resizeObserver);
                if (getObservationIndex(detail.observationTargets, target) < 0) {
                    detail.observationTargets.push(new ResizeObservation(target, options && options.box));
                    updateCount(1);
                    scheduler.schedule();
                }
            }
        };
        ResizeObserverController.unobserve = function(resizeObserver, target) {
            if (observerMap.has(resizeObserver)) {
                var detail = observerMap.get(resizeObserver);
                var index = getObservationIndex(detail.observationTargets, target);
                if (index >= 0) {
                    detail.observationTargets.splice(index, 1);
                    updateCount(-1);
                }
            }
        };
        ResizeObserverController.disconnect = function(resizeObserver) {
            if (observerMap.has(resizeObserver)) {
                var detail = observerMap.get(resizeObserver);
                resizeObservers.splice(resizeObservers.indexOf(detail), 1);
                observerMap["delete"](resizeObserver);
                updateCount(-detail.observationTargets.length);
            }
        };
        ResizeObserverController.process = function() {
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
        ResizeObserverController.isWatching = function() {
            return !!watching;
        };
        return ResizeObserverController;
    })();

    var ResizeObserver = (function() {
        function ResizeObserver(callback) {
            if (arguments.length === 0) {
                throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            }
            if (typeof callback !== "function") {
                throw new TypeError(
                    "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
                );
            }
            ResizeObserverController.connect(this, callback);
        }
        ResizeObserver.prototype.observe = function(target, options) {
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
        ResizeObserver.prototype.unobserve = function(target) {
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
        ResizeObserver.prototype.disconnect = function() {
            ResizeObserverController.disconnect(this);
        };
        ResizeObserver.toString = function() {
            return "function ResizeObserver () { [polyfill code] }";
        };
        return ResizeObserver;
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
            resizeObserver = new window.ResizeObserver(function(entries) {
                resizeEventMap.forEach(function(value, key) {
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
    window.addResizeEvent = addResizeEvent;
    window.removeResizeEvent = removeResizeEvent;
    window.ResizeObserver === undefined ? (window.ResizeObserver = ResizeObserver) : null;
})();
