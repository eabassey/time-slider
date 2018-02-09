// import { Injectable } from '@angular/core';


// @Injectable()
// export class SliderConfig {


//     create(target: any, originalOptions: any) {
//         if (!target || !target.nodeName) {
//             throw new Error(
//               'timeSlider (' +
//                 '): create requires a single element, got: ' +
//                 target
//             );
//           }

//           // Throw an error if the slider was already initialized.
//           if (target.timeSlider) {
//             throw new Error(
//               'noUiSlider (' +  '): Slider was already initialized.'
//             );
//           }
//          // Test the options and create the slider environment;
//         const options = this.testOptions(originalOptions, target);
//         const api = this.scope(target, options, originalOptions);

//         target.timeSlider = api;

//         return api;
//     }

//       // Test all developer settings and parse to assumption-safe values.
//    private testOptions(options, target?: any) {
//     // To prove a fix for #537, freeze options here.
//     // If the object is modified, an error will be thrown.
//     // Object.freeze(options);

//     const parsed = {
//       margin: 0,
//       limit: 0,
//       padding: 0,
//       animate: true,
//       animationDuration: 300,
//       ariaFormat: defaultFormatter,
//       format: defaultFormatter
//     };

//     // Tests are executed in the order they are presented here.
//     var tests = {
//       step: { r: false, t: testStep },
//       start: { r: true, t: testStart },
//       connect: { r: true, t: testConnect },
//       direction: { r: true, t: testDirection },
//       snap: { r: false, t: testSnap },
//       animate: { r: false, t: testAnimate },
//       animationDuration: { r: false, t: testAnimationDuration },
//       range: { r: true, t: testRange },
//       orientation: { r: false, t: testOrientation },
//       margin: { r: false, t: testMargin },
//       limit: { r: false, t: testLimit },
//       padding: { r: false, t: testPadding },
//       behaviour: { r: true, t: testBehaviour },
//       ariaFormat: { r: false, t: testAriaFormat },
//       format: { r: false, t: testFormat },
//       tooltips: { r: false, t: testTooltips },
//       cssPrefix: { r: false, t: testCssPrefix },
//       cssClasses: { r: false, t: testCssClasses }
//     };

//     var defaults = {
//       connect: false,
//       direction: "ltr",
//       behaviour: "tap",
//       orientation: "horizontal",
//       cssPrefix: "noUi-",
//       cssClasses: {
//         target: "target",
//         base: "base",
//         origin: "origin",
//         handle: "handle",
//         handleLower: "handle-lower",
//         handleUpper: "handle-upper",
//         horizontal: "horizontal",
//         vertical: "vertical",
//         background: "background",
//         connect: "connect",
//         connects: "connects",
//         ltr: "ltr",
//         rtl: "rtl",
//         draggable: "draggable",
//         drag: "state-drag",
//         tap: "state-tap",
//         active: "active",
//         tooltip: "tooltip",
//         pips: "pips",
//         pipsHorizontal: "pips-horizontal",
//         pipsVertical: "pips-vertical",
//         marker: "marker",
//         markerHorizontal: "marker-horizontal",
//         markerVertical: "marker-vertical",
//         markerNormal: "marker-normal",
//         markerLarge: "marker-large",
//         markerSub: "marker-sub",
//         value: "value",
//         valueHorizontal: "value-horizontal",
//         valueVertical: "value-vertical",
//         valueNormal: "value-normal",
//         valueLarge: "value-large",
//         valueSub: "value-sub"
//       }
//     };

//     // AriaFormat defaults to regular format, if any.
//     if (options.format && !options.ariaFormat) {
//       options.ariaFormat = options.format;
//     }

//     // Run all options through a testing mechanism to ensure correct
//     // input. It should be noted that options might get modified to
//     // be handled properly. E.g. wrapping integers in arrays.
//     Object.keys(tests).forEach(function(name) {
//       // If the option isn't set, but it is required, throw an error.
//       if (options[name] === undefined && defaults[name] === undefined) {
//         if (tests[name].r) {
//           throw new Error(
//             "noUiSlider (" + VERSION + "): '" + name + "' is required."
//           );
//         }

//         return true;
//       }

//       tests[name].t(
//         parsed,
//         options[name] === undefined ? defaults[name] : options[name]
//       );
//     });

//     // Forward pips options
//     parsed.pips = options.pips;

//     // All recent browsers accept unprefixed transform.
//     // We need -ms- for IE9 and -webkit- for older Android;
//     // Assume use of -webkit- if unprefixed and -ms- are not supported.
//     // https://caniuse.com/#feat=transforms2d
//     var d = document.createElement("div");
//     var msPrefix = d.style.msTransform !== undefined;
//     var noPrefix = d.style.transform !== undefined;

//     parsed.transformRule = noPrefix
//       ? "transform"
//       : msPrefix ? "msTransform" : "webkitTransform";

//     // Pips don't move, so we can place them using left/top.
//     var styles = [["left", "top"], ["right", "bottom"]];

//     parsed.style = styles[parsed.dir][parsed.ort];

//     return parsed;
//   }

//     // Sets a class and removes it after [duration] ms.
//     private addClassFor(element, className, duration) {
//         if (duration > 0) {
//           addClass(element, className);
//           setTimeout(function() {
//             removeClass(element, className);
//           }, duration);
//         }
//       }

//    private scope(target, options, originalOptions) {
//     const actions = this.getActions();
//     const supportsTouchActionNone = this.getSupportsTouchActionNone();
//     const supportsPassive = supportsTouchActionNone && this.getSupportsPassive();

//     // All variables local to 'scope' are prefixed with 'scope_'
//     const scope_Target = target;
//     const scope_Locations = [];
//     let scope_Base;
//     let scope_Handles;
//     const scope_HandleNumbers = [];
//     const scope_ActiveHandlesCount = 0;
//     let scope_Connects;
//     const scope_Spectrum = options.spectrum;
//     const scope_Values = [];
//     const scope_Events = {};
//     let scope_Self;
//     let scope_Pips;
//     const scope_Document = target.ownerDocument;
//     const scope_DocumentElement = scope_Document.documentElement;
//     const scope_Body = scope_Document.body;

//     // For horizontal sliders in standard ltr documents,
//     // make .noUi-origin overflow to the left so the document doesn't scroll.
//     const scope_DirOffset =
//       scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;

//     /*! In this file: Construction of DOM elements; */

//     // Creates a node, adds it to target, returns the new node.
//     function addNodeTo(addTarget, className) {
//         const div = scope_Document.createElement("div");

//       if (className) {
//         addClass(div, className);
//       }

//       addTarget.appendChild(div);

//       return div;
//     }

//     // Append a origin to the base
//     function addOrigin(base, handleNumber) {
//       var origin = addNodeTo(base, options.cssClasses.origin);
//       var handle = addNodeTo(origin, options.cssClasses.handle);

//       handle.setAttribute("data-handle", handleNumber);

//       // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
//       // 0 = focusable and reachable
//       handle.setAttribute("tabindex", "0");
//       handle.setAttribute("role", "slider");
//       handle.setAttribute(
//         "aria-orientation",
//         options.ort ? "vertical" : "horizontal"
//       );

//       if (handleNumber === 0) {
//         addClass(handle, options.cssClasses.handleLower);
//       } else if (handleNumber === options.handles - 1) {
//         addClass(handle, options.cssClasses.handleUpper);
//       }

//       return origin;
//     }

//     // Insert nodes for connect elements
//     function addConnect(base, add) {
//       if (!add) {
//         return false;
//       }

//       return addNodeTo(base, options.cssClasses.connect);
//     }

//     // Add handles to the slider base.
//     function addElements(connectOptions, base) {
//       var connectBase = addNodeTo(base, options.cssClasses.connects);

//       scope_Handles = [];
//       scope_Connects = [];

//       scope_Connects.push(addConnect(connectBase, connectOptions[0]));

//       // [::::O====O====O====]
//       // connectOptions = [0, 1, 1, 1]

//       for (var i = 0; i < options.handles; i++) {
//         // Keep a list of all added handles.
//         scope_Handles.push(addOrigin(base, i));
//         scope_HandleNumbers[i] = i;
//         scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
//       }
//     }

//     // Initialize a single slider.
//     function addSlider(addTarget) {
//       // Apply classes and data to the target.
//       addClass(addTarget, options.cssClasses.target);

//       if (options.dir === 0) {
//         addClass(addTarget, options.cssClasses.ltr);
//       } else {
//         addClass(addTarget, options.cssClasses.rtl);
//       }

//       if (options.ort === 0) {
//         addClass(addTarget, options.cssClasses.horizontal);
//       } else {
//         addClass(addTarget, options.cssClasses.vertical);
//       }

//       scope_Base = addNodeTo(addTarget, options.cssClasses.base);
//     }

//     function addTooltip(handle, handleNumber) {
//       if (!options.tooltips[handleNumber]) {
//         return false;
//       }

//       return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
//     }

//     // The tooltips option is a shorthand for using the 'update' event.
//     function tooltips() {
//       // Tooltips are added with options.tooltips in original order.
//       var tips = scope_Handles.map(addTooltip);

//       bindEvent("update", function(values, handleNumber, unencoded) {
//         if (!tips[handleNumber]) {
//           return;
//         }

//         var formattedValue = values[handleNumber];

//         if (options.tooltips[handleNumber] !== true) {
//           formattedValue = options.tooltips[handleNumber].to(
//             unencoded[handleNumber]
//           );
//         }

//         tips[handleNumber].innerHTML = formattedValue;
//       });
//     }

//     function aria() {
//       bindEvent("update", function(
//         values,
//         handleNumber,
//         unencoded,
//         tap,
//         positions
//       ) {
//         // Update Aria Values for all handles, as a change in one changes min and max values for the next.
//         scope_HandleNumbers.forEach(function(index) {
//           var handle = scope_Handles[index];

//           var min = checkHandlePosition(
//             scope_Locations,
//             index,
//             0,
//             true,
//             true,
//             true
//           );
//           var max = checkHandlePosition(
//             scope_Locations,
//             index,
//             100,
//             true,
//             true,
//             true
//           );

//           var now = positions[index];
//           var text = options.ariaFormat.to(unencoded[index]);

//           handle.children[0].setAttribute("aria-valuemin", min.toFixed(1));
//           handle.children[0].setAttribute("aria-valuemax", max.toFixed(1));
//           handle.children[0].setAttribute("aria-valuenow", now.toFixed(1));
//           handle.children[0].setAttribute("aria-valuetext", text);
//         });
//       });
//     }

//     function getGroup(mode, values, stepped) {
//       // Use the range.
//       if (mode === "range" || mode === "steps") {
//         return scope_Spectrum.xVal;
//       }

//       if (mode === "count") {
//         if (values < 2) {
//           throw new Error(
//             "noUiSlider (" +
//               VERSION +
//               "): 'values' (>= 2) required for mode 'count'."
//           );
//         }

//         // Divide 0 - 100 in 'count' parts.
//         var interval = values - 1;
//         var spread = 100 / interval;

//         values = [];

//         // List these parts and have them handled as 'positions'.
//         while (interval--) {
//           values[interval] = interval * spread;
//         }

//         values.push(100);

//         mode = "positions";
//       }

//       if (mode === "positions") {
//         // Map all percentages to on-range values.
//         return values.map(function(value) {
//           return scope_Spectrum.fromStepping(
//             stepped ? scope_Spectrum.getStep(value) : value
//           );
//         });
//       }

//       if (mode === "values") {
//         // If the value must be stepped, it needs to be converted to a percentage first.
//         if (stepped) {
//           return values.map(function(value) {
//             // Convert to percentage, apply step, return to value.
//             return scope_Spectrum.fromStepping(
//               scope_Spectrum.getStep(scope_Spectrum.toStepping(value))
//             );
//           });
//         }

//         // Otherwise, we can simply use the values.
//         return values;
//       }
//     }

//     function generateSpread(density, mode, group) {
//       function safeIncrement(value, increment) {
//         // Avoid floating point variance by dropping the smallest decimal places.
//         return (value + increment).toFixed(7) / 1;
//       }

//       var indexes = {};
//       var firstInRange = scope_Spectrum.xVal[0];
//       var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
//       var ignoreFirst = false;
//       var ignoreLast = false;
//       var prevPct = 0;

//       // Create a copy of the group, sort it and filter away all duplicates.
//       group = unique(
//         group.slice().sort(function(a, b) {
//           return a - b;
//         })
//       );

//       // Make sure the range starts with the first element.
//       if (group[0] !== firstInRange) {
//         group.unshift(firstInRange);
//         ignoreFirst = true;
//       }

//       // Likewise for the last one.
//       if (group[group.length - 1] !== lastInRange) {
//         group.push(lastInRange);
//         ignoreLast = true;
//       }

//       group.forEach(function(current, index) {
//         // Get the current step and the lower + upper positions.
//         var step;
//         var i;
//         var q;
//         var low = current;
//         var high = group[index + 1];
//         var newPct;
//         var pctDifference;
//         var pctPos;
//         var type;
//         var steps;
//         var realSteps;
//         var stepsize;

//         // When using 'steps' mode, use the provided steps.
//         // Otherwise, we'll step on to the next subrange.
//         if (mode === "steps") {
//           step = scope_Spectrum.xNumSteps[index];
//         }

//         // Default to a 'full' step.
//         if (!step) {
//           step = high - low;
//         }

//         // Low can be 0, so test for false. If high is undefined,
//         // we are at the last subrange. Index 0 is already handled.
//         if (low === false || high === undefined) {
//           return;
//         }

//         // Make sure step isn't 0, which would cause an infinite loop (#654)
//         step = Math.max(step, 0.0000001);

//         // Find all steps in the subrange.
//         for (i = low; i <= high; i = safeIncrement(i, step)) {
//           // Get the percentage value for the current step,
//           // calculate the size for the subrange.
//           newPct = scope_Spectrum.toStepping(i);
//           pctDifference = newPct - prevPct;

//           steps = pctDifference / density;
//           realSteps = Math.round(steps);

//           // This ratio represents the amount of percentage-space a point indicates.
//           // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
//           // Round the percentage offset to an even number, then divide by two
//           // to spread the offset on both sides of the range.
//           stepsize = pctDifference / realSteps;

//           // Divide all points evenly, adding the correct number to this subrange.
//           // Run up to <= so that 100% gets a point, event if ignoreLast is set.
//           for (q = 1; q <= realSteps; q += 1) {
//             // The ratio between the rounded value and the actual size might be ~1% off.
//             // Correct the percentage offset by the number of points
//             // per subrange. density = 1 will result in 100 points on the
//             // full range, 2 for 50, 4 for 25, etc.
//             pctPos = prevPct + q * stepsize;
//             indexes[pctPos.toFixed(5)] = ["x", 0];
//           }

//           // Determine the point type.
//           type = group.indexOf(i) > -1 ? 1 : mode === "steps" ? 2 : 0;

//           // Enforce the 'ignoreFirst' option by overwriting the type for 0.
//           if (!index && ignoreFirst) {
//             type = 0;
//           }

//           if (!(i === high && ignoreLast)) {
//             // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
//             indexes[newPct.toFixed(5)] = [i, type];
//           }

//           // Update the percentage count.
//           prevPct = newPct;
//         }
//       });

//       return indexes;
//     }

//     function addMarking(spread, filterFunc, formatter) {
//       var element = scope_Document.createElement("div");

//       var valueSizeClasses = [
//         options.cssClasses.valueNormal,
//         options.cssClasses.valueLarge,
//         options.cssClasses.valueSub
//       ];
//       var markerSizeClasses = [
//         options.cssClasses.markerNormal,
//         options.cssClasses.markerLarge,
//         options.cssClasses.markerSub
//       ];
//       var valueOrientationClasses = [
//         options.cssClasses.valueHorizontal,
//         options.cssClasses.valueVertical
//       ];
//       var markerOrientationClasses = [
//         options.cssClasses.markerHorizontal,
//         options.cssClasses.markerVertical
//       ];

//       addClass(element, options.cssClasses.pips);
//       addClass(
//         element,
//         options.ort === 0
//           ? options.cssClasses.pipsHorizontal
//           : options.cssClasses.pipsVertical
//       );

//       function getClasses(type, source) {
//         var a = source === options.cssClasses.value;
//         var orientationClasses = a
//           ? valueOrientationClasses
//           : markerOrientationClasses;
//         var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

//         return (
//           source +
//           " " +
//           orientationClasses[options.ort] +
//           " " +
//           sizeClasses[type]
//         );
//       }

//       function addSpread(offset, values) {
//         // Apply the filter function, if it is set.
//         values[1] =
//           values[1] && filterFunc
//             ? filterFunc(values[0], values[1])
//             : values[1];

//         // Add a marker for every point
//         var node = addNodeTo(element, false);
//         node.className = getClasses(values[1], options.cssClasses.marker);
//         node.style[options.style] = offset + "%";

//         // Values are only appended for points marked '1' or '2'.
//         if (values[1]) {
//           node = addNodeTo(element, false);
//           node.className = getClasses(values[1], options.cssClasses.value);
//           node.setAttribute("data-value", values[0]);
//           node.style[options.style] = offset + "%";
//           node.innerText = formatter.to(values[0]);
//         }
//       }

//       // Append all points.
//       Object.keys(spread).forEach(function(a) {
//         addSpread(a, spread[a]);
//       });

//       return element;
//     }

//     function removePips() {
//       if (scope_Pips) {
//         removeElement(scope_Pips);
//         scope_Pips = null;
//       }
//     }

//     function pips(grid) {
//       // Fix #669
//       removePips();

//       var mode = grid.mode;
//       var density = grid.density || 1;
//       var filter = grid.filter || false;
//       var values = grid.values || false;
//       var stepped = grid.stepped || false;
//       var group = getGroup(mode, values, stepped);
//       var spread = generateSpread(density, mode, group);
//       var format = grid.format || {
//         to: Math.round
//       };

//       scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));

//       return scope_Pips;
//     }

//     /*! In this file: Browser events (not slider events like slide, change); */

//     // Shorthand for base dimensions.
//     function baseSize() {
//       var rect = scope_Base.getBoundingClientRect();
//       var alt = "offset" + ["Width", "Height"][options.ort];
//       return options.ort === 0
//         ? rect.width || scope_Base[alt]
//         : rect.height || scope_Base[alt];
//     }

//     // Handler for attaching events trough a proxy.
//     function attachEvent(events, element, callback, data) {
//       // This function can be used to 'filter' events to the slider.
//       // element is a node, not a nodeList

//       var method = function(e) {
//         e = fixEvent(e, data.pageOffset, data.target || element);

//         // fixEvent returns false if this event has a different target
//         // when handling (multi-) touch events;
//         if (!e) {
//           return false;
//         }

//         // doNotReject is passed by all end events to make sure released touches
//         // are not rejected, leaving the slider "stuck" to the cursor;
//         if (scope_Target.hasAttribute("disabled") && !data.doNotReject) {
//           return false;
//         }

//         // Stop if an active 'tap' transition is taking place.
//         if (
//           hasClass(scope_Target, options.cssClasses.tap) &&
//           !data.doNotReject
//         ) {
//           return false;
//         }

//         // Ignore right or middle clicks on start #454
//         if (
//           events === actions.start &&
//           e.buttons !== undefined &&
//           e.buttons > 1
//         ) {
//           return false;
//         }

//         // Ignore right or middle clicks on start #454
//         if (data.hover && e.buttons) {
//           return false;
//         }

//         // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
//         // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
//         // touch-action: manipulation, but that allows panning, which breaks
//         // sliders after zooming/on non-responsive pages.
//         // See: https://bugs.webkit.org/show_bug.cgi?id=133112
//         if (!supportsPassive) {
//           e.preventDefault();
//         }

//         e.calcPoint = e.points[options.ort];

//         // Call the event handler with the event [ and additional data ].
//         callback(e, data);
//       };

//       var methods = [];

//       // Bind a closure on the target for every event type.
//       events.split(" ").forEach(function(eventName) {
//         element.addEventListener(
//           eventName,
//           method,
//           supportsPassive ? { passive: true } : false
//         );
//         methods.push([eventName, method]);
//       });

//       return methods;
//     }

//     // Provide a clean event with standardized offset values.
//     function fixEvent(e, pageOffset, eventTarget) {
//       // Filter the event to register the type, which can be
//       // touch, mouse or pointer. Offset changes need to be
//       // made on an event specific basis.
//       var touch = e.type.indexOf("touch") === 0;
//       var mouse = e.type.indexOf("mouse") === 0;
//       var pointer = e.type.indexOf("pointer") === 0;

//       var x;
//       var y;

//       // IE10 implemented pointer events with a prefix;
//       if (e.type.indexOf("MSPointer") === 0) {
//         pointer = true;
//       }

//       // In the event that multitouch is activated, the only thing one handle should be concerned
//       // about is the touches that originated on top of it.
//       if (touch) {
//         // Returns true if a touch originated on the target.
//         var isTouchOnTarget = function(checkTouch) {
//           return (
//             checkTouch.target === eventTarget ||
//             eventTarget.contains(checkTouch.target)
//           );
//         };

//         // In the case of touchstart events, we need to make sure there is still no more than one
//         // touch on the target so we look amongst all touches.
//         if (e.type === "touchstart") {
//           var targetTouches = Array.prototype.filter.call(
//             e.touches,
//             isTouchOnTarget
//           );

//           // Do not support more than one touch per handle.
//           if (targetTouches.length > 1) {
//             return false;
//           }

//           x = targetTouches[0].pageX;
//           y = targetTouches[0].pageY;
//         } else {
//           // In the other cases, find on changedTouches is enough.
//           var targetTouch = Array.prototype.find.call(
//             e.changedTouches,
//             isTouchOnTarget
//           );

//           // Cancel if the target touch has not moved.
//           if (!targetTouch) {
//             return false;
//           }

//           x = targetTouch.pageX;
//           y = targetTouch.pageY;
//         }
//       }

//       pageOffset = pageOffset || getPageOffset(scope_Document);

//       if (mouse || pointer) {
//         x = e.clientX + pageOffset.x;
//         y = e.clientY + pageOffset.y;
//       }

//       e.pageOffset = pageOffset;
//       e.points = [x, y];
//       e.cursor = mouse || pointer; // Fix #435

//       return e;
//     }

//     // Translate a coordinate in the document to a percentage on the slider
//     function calcPointToPercentage(calcPoint) {
//       var location = calcPoint - offset(scope_Base, options.ort);
//       var proposal = location * 100 / baseSize();

//       // Clamp proposal between 0% and 100%
//       // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
//       // are used (e.g. contained handles feature)
//       proposal = limit(proposal);

//       return options.dir ? 100 - proposal : proposal;
//     }

//     // Find handle closest to a certain percentage on the slider
//     function getClosestHandle(proposal) {
//       var closest = 100;
//       var handleNumber = false;

//       scope_Handles.forEach(function(handle, index) {
//         // Disabled handles are ignored
//         if (handle.hasAttribute("disabled")) {
//           return;
//         }

//         var pos = Math.abs(scope_Locations[index] - proposal);

//         if (pos < closest || (pos === 100 && closest === 100)) {
//           handleNumber = index;
//           closest = pos;
//         }
//       });

//       return handleNumber;
//     }

//     // Fire 'end' when a mouse or pen leaves the document.
//     function documentLeave(event, data) {
//       if (
//         event.type === "mouseout" &&
//         event.target.nodeName === "HTML" &&
//         event.relatedTarget === null
//       ) {
//         eventEnd(event, data);
//       }
//     }

//     // Handle movement on document for handle and range drag.
//     function eventMove(event, data) {
//       // Fix #498
//       // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
//       // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
//       // IE9 has .buttons and .which zero on mousemove.
//       // Firefox breaks the spec MDN defines.
//       if (
//         navigator.appVersion.indexOf("MSIE 9") === -1 &&
//         event.buttons === 0 &&
//         data.buttonsProperty !== 0
//       ) {
//         return eventEnd(event, data);
//       }

//       // Check if we are moving up or down
//       var movement =
//         (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

//       // Convert the movement into a percentage of the slider width/height
//       var proposal = movement * 100 / data.baseSize;

//       moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
//     }

//     // Unbind move events on document, call callbacks.
//     function eventEnd(event, data) {
//       // The handle is no longer active, so remove the class.
//       if (data.handle) {
//         removeClass(data.handle, options.cssClasses.active);
//         scope_ActiveHandlesCount -= 1;
//       }

//       // Unbind the move and end events, which are added on 'start'.
//       data.listeners.forEach(function(c) {
//         scope_DocumentElement.removeEventListener(c[0], c[1]);
//       });

//       if (scope_ActiveHandlesCount === 0) {
//         // Remove dragging class.
//         removeClass(scope_Target, options.cssClasses.drag);
//         setZindex();

//         // Remove cursor styles and text-selection events bound to the body.
//         if (event.cursor) {
//           scope_Body.style.cursor = "";
//           scope_Body.removeEventListener("selectstart", preventDefault);
//         }
//       }

//       data.handleNumbers.forEach(function(handleNumber) {
//         fireEvent("change", handleNumber);
//         fireEvent("set", handleNumber);
//         fireEvent("end", handleNumber);
//       });
//     }

//     // Bind move events on document.
//     function eventStart(event, data) {
//       var handle;
//       if (data.handleNumbers.length === 1) {
//         var handleOrigin = scope_Handles[data.handleNumbers[0]];

//         // Ignore 'disabled' handles
//         if (handleOrigin.hasAttribute("disabled")) {
//           return false;
//         }

//         handle = handleOrigin.children[0];
//         scope_ActiveHandlesCount += 1;

//         // Mark the handle as 'active' so it can be styled.
//         addClass(handle, options.cssClasses.active);
//       }

//       // A drag should never propagate up to the 'tap' event.
//       event.stopPropagation();

//       // Record the event listeners.
//       var listeners = [];

//       // Attach the move and end events.
//       var moveEvent = attachEvent(
//         actions.move,
//         scope_DocumentElement,
//         eventMove,
//         {
//           // The event target has changed so we need to propagate the original one so that we keep
//           // relying on it to extract target touches.
//           target: event.target,
//           handle: handle,
//           listeners: listeners,
//           startCalcPoint: event.calcPoint,
//           baseSize: baseSize(),
//           pageOffset: event.pageOffset,
//           handleNumbers: data.handleNumbers,
//           buttonsProperty: event.buttons,
//           locations: scope_Locations.slice()
//         }
//       );

//       var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
//         target: event.target,
//         handle: handle,
//         listeners: listeners,
//         doNotReject: true,
//         handleNumbers: data.handleNumbers
//       });

//       var outEvent = attachEvent(
//         "mouseout",
//         scope_DocumentElement,
//         documentLeave,
//         {
//           target: event.target,
//           handle: handle,
//           listeners: listeners,
//           doNotReject: true,
//           handleNumbers: data.handleNumbers
//         }
//       );

//       // We want to make sure we pushed the listeners in the listener list rather than creating
//       // a new one as it has already been passed to the event handlers.
//       listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

//       // Text selection isn't an issue on touch devices,
//       // so adding cursor styles can be skipped.
//       if (event.cursor) {
//         // Prevent the 'I' cursor and extend the range-drag cursor.
//         scope_Body.style.cursor = getComputedStyle(event.target).cursor;

//         // Mark the target with a dragging state.
//         if (scope_Handles.length > 1) {
//           addClass(scope_Target, options.cssClasses.drag);
//         }

//         // Prevent text selection when dragging the handles.
//         // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
//         // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
//         // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
//         // The 'cursor' flag is false.
//         // See: http://caniuse.com/#search=selectstart
//         scope_Body.addEventListener("selectstart", preventDefault, false);
//       }

//       data.handleNumbers.forEach(function(handleNumber) {
//         fireEvent("start", handleNumber);
//       });
//     }

//     // Move closest handle to tapped location.
//     function eventTap(event) {
//       // The tap event shouldn't propagate up
//       event.stopPropagation();

//       var proposal = calcPointToPercentage(event.calcPoint);
//       var handleNumber = getClosestHandle(proposal);

//       // Tackle the case that all handles are 'disabled'.
//       if (handleNumber === false) {
//         return false;
//       }

//       // Flag the slider as it is now in a transitional state.
//       // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
//       if (!options.events.snap) {
//         addClassFor(
//           scope_Target,
//           options.cssClasses.tap,
//           options.animationDuration
//         );
//       }

//       setHandle(handleNumber, proposal, true, true);

//       setZindex();

//       fireEvent("slide", handleNumber, true);
//       fireEvent("update", handleNumber, true);
//       fireEvent("change", handleNumber, true);
//       fireEvent("set", handleNumber, true);

//       if (options.events.snap) {
//         eventStart(event, { handleNumbers: [handleNumber] });
//       }
//     }

//     // Fires a 'hover' event for a hovered mouse/pen position.
//     function eventHover(event) {
//       var proposal = calcPointToPercentage(event.calcPoint);

//       var to = scope_Spectrum.getStep(proposal);
//       var value = scope_Spectrum.fromStepping(to);

//       Object.keys(scope_Events).forEach(function(targetEvent) {
//         if ("hover" === targetEvent.split(".")[0]) {
//           scope_Events[targetEvent].forEach(function(callback) {
//             callback.call(scope_Self, value);
//           });
//         }
//       });
//     }

//     // Attach events to several slider parts.
//     function bindSliderEvents(behaviour) {
//       // Attach the standard drag event to the handles.
//       if (!behaviour.fixed) {
//         scope_Handles.forEach(function(handle, index) {
//           // These events are only bound to the visual handle
//           // element, not the 'real' origin element.
//           attachEvent(actions.start, handle.children[0], eventStart, {
//             handleNumbers: [index]
//           });
//         });
//       }

//       // Attach the tap event to the slider base.
//       if (behaviour.tap) {
//         attachEvent(actions.start, scope_Base, eventTap, {});
//       }

//       // Fire hover events
//       if (behaviour.hover) {
//         attachEvent(actions.move, scope_Base, eventHover, { hover: true });
//       }

//       // Make the range draggable.
//       if (behaviour.drag) {
//         scope_Connects.forEach(function(connect, index) {
//           if (
//             connect === false ||
//             index === 0 ||
//             index === scope_Connects.length - 1
//           ) {
//             return;
//           }

//           var handleBefore = scope_Handles[index - 1];
//           var handleAfter = scope_Handles[index];
//           var eventHolders = [connect];

//           addClass(connect, options.cssClasses.draggable);

//           // When the range is fixed, the entire range can
//           // be dragged by the handles. The handle in the first
//           // origin will propagate the start event upward,
//           // but it needs to be bound manually on the other.
//           if (behaviour.fixed) {
//             eventHolders.push(handleBefore.children[0]);
//             eventHolders.push(handleAfter.children[0]);
//           }

//           eventHolders.forEach(function(eventHolder) {
//             attachEvent(actions.start, eventHolder, eventStart, {
//               handles: [handleBefore, handleAfter],
//               handleNumbers: [index - 1, index]
//             });
//           });
//         });
//       }
//     }

//     /*! In this file: Slider events (not browser events); */

//     // Attach an event to this slider, possibly including a namespace
//     function bindEvent(namespacedEvent, callback) {
//       scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
//       scope_Events[namespacedEvent].push(callback);

//       // If the event bound is 'update,' fire it immediately for all handles.
//       if (namespacedEvent.split(".")[0] === "update") {
//         scope_Handles.forEach(function(a, index) {
//           fireEvent("update", index);
//         });
//       }
//     }

//     // Undo attachment of event
//     function removeEvent(namespacedEvent) {
//       var event = namespacedEvent && namespacedEvent.split(".")[0];
//       var namespace = event && namespacedEvent.substring(event.length);

//       Object.keys(scope_Events).forEach(function(bind) {
//         var tEvent = bind.split(".")[0];
//         var tNamespace = bind.substring(tEvent.length);

//         if (
//           (!event || event === tEvent) &&
//           (!namespace || namespace === tNamespace)
//         ) {
//           delete scope_Events[bind];
//         }
//       });
//     }

//     // External event handling
//     function fireEvent(eventName, handleNumber, tap) {
//       Object.keys(scope_Events).forEach(function(targetEvent) {
//         var eventType = targetEvent.split(".")[0];

//         if (eventName === eventType) {
//           scope_Events[targetEvent].forEach(function(callback) {
//             callback.call(
//               // Use the slider public API as the scope ('this')
//               scope_Self,
//               // Return values as array, so arg_1[arg_2] is always valid.
//               scope_Values.map(options.format.to),
//               // Handle index, 0 or 1
//               handleNumber,
//               // Unformatted slider values
//               scope_Values.slice(),
//               // Event is fired by tap, true or false
//               tap || false,
//               // Left offset of the handle, in relation to the slider
//               scope_Locations.slice()
//             );
//           });
//         }
//       });
//     }

//     /*! In this file: Mechanics for slider operation */

//     function toPct(pct) {
//       return pct + "%";
//     }

//     // Split out the handle positioning logic so the Move event can use it, too
//     function checkHandlePosition(
//       reference,
//       handleNumber,
//       to,
//       lookBackward,
//       lookForward,
//       getValue
//     ) {
//       // For sliders with multiple handles, limit movement to the other handle.
//       // Apply the margin option by adding it to the handle positions.
//       if (scope_Handles.length > 1) {
//         if (lookBackward && handleNumber > 0) {
//           to = Math.max(to, reference[handleNumber - 1] + options.margin);
//         }

//         if (lookForward && handleNumber < scope_Handles.length - 1) {
//           to = Math.min(to, reference[handleNumber + 1] - options.margin);
//         }
//       }

//       // The limit option has the opposite effect, limiting handles to a
//       // maximum distance from another. Limit must be > 0, as otherwise
//       // handles would be unmoveable.
//       if (scope_Handles.length > 1 && options.limit) {
//         if (lookBackward && handleNumber > 0) {
//           to = Math.min(to, reference[handleNumber - 1] + options.limit);
//         }

//         if (lookForward && handleNumber < scope_Handles.length - 1) {
//           to = Math.max(to, reference[handleNumber + 1] - options.limit);
//         }
//       }

//       // The padding option keeps the handles a certain distance from the
//       // edges of the slider. Padding must be > 0.
//       if (options.padding) {
//         if (handleNumber === 0) {
//           to = Math.max(to, options.padding[0]);
//         }

//         if (handleNumber === scope_Handles.length - 1) {
//           to = Math.min(to, 100 - options.padding[1]);
//         }
//       }

//       to = scope_Spectrum.getStep(to);

//       // Limit percentage to the 0 - 100 range
//       to = limit(to);

//       // Return false if handle can't move
//       if (to === reference[handleNumber] && !getValue) {
//         return false;
//       }

//       return to;
//     }

//     // Uses slider orientation to create CSS rules. a = base value;
//     function inRuleOrder(v, a) {
//       var o = options.ort;
//       return (o ? a : v) + ", " + (o ? v : a);
//     }

//     // Moves handle(s) by a percentage
//     // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
//     function moveHandles(upward, proposal, locations, handleNumbers) {
//       var proposals = locations.slice();

//       var b = [!upward, upward];
//       var f = [upward, !upward];

//       // Copy handleNumbers so we don't change the dataset
//       handleNumbers = handleNumbers.slice();

//       // Check to see which handle is 'leading'.
//       // If that one can't move the second can't either.
//       if (upward) {
//         handleNumbers.reverse();
//       }

//       // Step 1: get the maximum percentage that any of the handles can move
//       if (handleNumbers.length > 1) {
//         handleNumbers.forEach(function(handleNumber, o) {
//           var to = checkHandlePosition(
//             proposals,
//             handleNumber,
//             proposals[handleNumber] + proposal,
//             b[o],
//             f[o],
//             false
//           );

//           // Stop if one of the handles can't move.
//           if (to === false) {
//             proposal = 0;
//           } else {
//             proposal = to - proposals[handleNumber];
//             proposals[handleNumber] = to;
//           }
//         });
//       } else {
//         // If using one handle, check backward AND forward
//         b = f = [true];
//       }

//       var state = false;

//       // Step 2: Try to set the handles with the found percentage
//       handleNumbers.forEach(function(handleNumber, o) {
//         state =
//           setHandle(
//             handleNumber,
//             locations[handleNumber] + proposal,
//             b[o],
//             f[o]
//           ) || state;
//       });

//       // Step 3: If a handle moved, fire events
//       if (state) {
//         handleNumbers.forEach(function(handleNumber) {
//           fireEvent("update", handleNumber);
//           fireEvent("slide", handleNumber);
//         });
//       }
//     }

//     // Takes a base value and an offset. This offset is used for the connect bar size.
//     // In the initial design for this feature, the origin element was 1% wide.
//     // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
//     // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
//     function transformDirection(a, b) {
//       return options.dir ? 100 - a - b : a;
//     }

//     // Updates scope_Locations and scope_Values, updates visual state
//     function updateHandlePosition(handleNumber, to) {
//       // Update locations.
//       scope_Locations[handleNumber] = to;

//       // Convert the value to the slider stepping/range.
//       scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

//       var rule =
//         "translate(" +
//         inRuleOrder(toPct(transformDirection(to, 0) - scope_DirOffset), "0") +
//         ")";
//       scope_Handles[handleNumber].style[options.transformRule] = rule;

//       updateConnect(handleNumber);
//       updateConnect(handleNumber + 1);
//     }

//     // Handles before the slider middle are stacked later = higher,
//     // Handles after the middle later is lower
//     // [[7] [8] .......... | .......... [5] [4]
//     function setZindex() {
//       scope_HandleNumbers.forEach(function(handleNumber) {
//         var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
//         var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
//         scope_Handles[handleNumber].style.zIndex = zIndex;
//       });
//     }

//     // Test suggested values and apply margin, step.
//     function setHandle(handleNumber, to, lookBackward, lookForward) {
//       to = checkHandlePosition(
//         scope_Locations,
//         handleNumber,
//         to,
//         lookBackward,
//         lookForward,
//         false
//       );

//       if (to === false) {
//         return false;
//       }

//       updateHandlePosition(handleNumber, to);

//       return true;
//     }

//     // Updates style attribute for connect nodes
//     function updateConnect(index) {
//       // Skip connects set to false
//       if (!scope_Connects[index]) {
//         return;
//       }

//       var l = 0;
//       var h = 100;

//       if (index !== 0) {
//         l = scope_Locations[index - 1];
//       }

//       if (index !== scope_Connects.length - 1) {
//         h = scope_Locations[index];
//       }

//       // We use two rules:
//       // 'translate' to change the left/top offset;
//       // 'scale' to change the width of the element;
//       // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
//       var connectWidth = h - l;
//       var translateRule =
//         "translate(" +
//         inRuleOrder(toPct(transformDirection(l, connectWidth)), "0") +
//         ")";
//       var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";

//       scope_Connects[index].style[options.transformRule] =
//         translateRule + " " + scaleRule;
//     }

//     /*! In this file: All methods eventually exposed in slider.noUiSlider... */

//     // Parses value passed to .set method. Returns current value if not parse-able.
//     function resolveToValue(to, handleNumber) {
//       // Setting with null indicates an 'ignore'.
//       // Inputting 'false' is invalid.
//       if (to === null || to === false || to === undefined) {
//         return scope_Locations[handleNumber];
//       }

//       // If a formatted number was passed, attempt to decode it.
//       if (typeof to === "number") {
//         to = String(to);
//       }

//       to = options.format.from(to);
//       to = scope_Spectrum.toStepping(to);

//       // If parsing the number failed, use the current value.
//       if (to === false || isNaN(to)) {
//         return scope_Locations[handleNumber];
//       }

//       return to;
//     }

//     // Set the slider value.
//     function valueSet(input, fireSetEvent) {
//       var values = asArray(input);
//       var isInit = scope_Locations[0] === undefined;

//       // Event fires by default
//       fireSetEvent = fireSetEvent === undefined ? true : !!fireSetEvent;

//       // Animation is optional.
//       // Make sure the initial values were set before using animated placement.
//       if (options.animate && !isInit) {
//         addClassFor(
//           scope_Target,
//           options.cssClasses.tap,
//           options.animationDuration
//         );
//       }

//       // First pass, without lookAhead but with lookBackward. Values are set from left to right.
//       scope_HandleNumbers.forEach(function(handleNumber) {
//         setHandle(
//           handleNumber,
//           resolveToValue(values[handleNumber], handleNumber),
//           true,
//           false
//         );
//       });

//       // Second pass. Now that all base values are set, apply constraints
//       scope_HandleNumbers.forEach(function(handleNumber) {
//         setHandle(handleNumber, scope_Locations[handleNumber], true, true);
//       });

//       setZindex();

//       scope_HandleNumbers.forEach(function(handleNumber) {
//         fireEvent("update", handleNumber);

//         // Fire the event only for handles that received a new value, as per #579
//         if (values[handleNumber] !== null && fireSetEvent) {
//           fireEvent("set", handleNumber);
//         }
//       });
//     }

//     // Reset slider to initial values
//     function valueReset(fireSetEvent) {
//       valueSet(options.start, fireSetEvent);
//     }

//     // Get the slider value.
//     function valueGet() {
//       var values = scope_Values.map(options.format.to);

//       // If only one handle is used, return a single value.
//       if (values.length === 1) {
//         return values[0];
//       }

//       return values;
//     }

//     // Removes classes from the root and empties it.
//     function destroy() {
//       for (var key in options.cssClasses) {
//         if (!options.cssClasses.hasOwnProperty(key)) {
//           continue;
//         }
//         removeClass(scope_Target, options.cssClasses[key]);
//       }

//       while (scope_Target.firstChild) {
//         scope_Target.removeChild(scope_Target.firstChild);
//       }

//       delete scope_Target.noUiSlider;
//     }

//     // Get the current step size for the slider.
//     function getCurrentStep() {
//       // Check all locations, map them to their stepping point.
//       // Get the step point, then find it in the input list.
//       return scope_Locations.map(function(location, index) {
//         var nearbySteps = scope_Spectrum.getNearbySteps(location);
//         var value = scope_Values[index];
//         var increment = nearbySteps.thisStep.step;
//         var decrement = null;

//         // If the next value in this step moves into the next step,
//         // the increment is the start of the next step - the current value
//         if (increment !== false) {
//           if (value + increment > nearbySteps.stepAfter.startValue) {
//             increment = nearbySteps.stepAfter.startValue - value;
//           }
//         }

//         // If the value is beyond the starting point
//         if (value > nearbySteps.thisStep.startValue) {
//           decrement = nearbySteps.thisStep.step;
//         } else if (nearbySteps.stepBefore.step === false) {
//           decrement = false;
//         } else {
//           // If a handle is at the start of a step, it always steps back into the previous step first
//           decrement = value - nearbySteps.stepBefore.highestStep;
//         }

//         // Now, if at the slider edges, there is not in/decrement
//         if (location === 100) {
//           increment = null;
//         } else if (location === 0) {
//           decrement = null;
//         }

//         // As per #391, the comparison for the decrement step can have some rounding issues.
//         var stepDecimals = scope_Spectrum.countStepDecimals();

//         // Round per #391
//         if (increment !== null && increment !== false) {
//           increment = Number(increment.toFixed(stepDecimals));
//         }

//         if (decrement !== null && decrement !== false) {
//           decrement = Number(decrement.toFixed(stepDecimals));
//         }

//         return [decrement, increment];
//       });
//     }

//     // Updateable: margin, limit, padding, step, range, animate, snap
//     function updateOptions(optionsToUpdate, fireSetEvent) {
//       // Spectrum is created using the range, snap, direction and step options.
//       // 'snap' and 'step' can be updated.
//       // If 'snap' and 'step' are not passed, they should remain unchanged.
//       var v = valueGet();

//       var updateAble = [
//         "margin",
//         "limit",
//         "padding",
//         "range",
//         "animate",
//         "snap",
//         "step",
//         "format"
//       ];

//       // Only change options that we're actually passed to update.
//       updateAble.forEach(function(name) {
//         if (optionsToUpdate[name] !== undefined) {
//           originalOptions[name] = optionsToUpdate[name];
//         }
//       });

//       var newOptions = testOptions(originalOptions);

//       // Load new options into the slider state
//       updateAble.forEach(function(name) {
//         if (optionsToUpdate[name] !== undefined) {
//           options[name] = newOptions[name];
//         }
//       });

//       scope_Spectrum = newOptions.spectrum;

//       // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
//       options.margin = newOptions.margin;
//       options.limit = newOptions.limit;
//       options.padding = newOptions.padding;

//       // Update pips, removes existing.
//       if (options.pips) {
//         pips(options.pips);
//       }

//       // Invalidate the current positioning so valueSet forces an update.
//       scope_Locations = [];
//       valueSet(optionsToUpdate.start || v, fireSetEvent);
//     }

//     /*! In this file: Calls to functions. All other scope_ files define functions only; */

//     // Create the base element, initialize HTML and set classes.
//     // Add handles and connect elements.
//     addSlider(scope_Target);
//     addElements(options.connect, scope_Base);

//     // Attach user events.
//     bindSliderEvents(options.events);

//     // Use the public value method to set the start values.
//     valueSet(options.start);

//     scope_Self = {
//       destroy: destroy,
//       steps: getCurrentStep,
//       on: bindEvent,
//       off: removeEvent,
//       get: valueGet,
//       set: valueSet,
//       reset: valueReset,
//       // Exposed for unit testing, don't use this in your application.
//       __moveHandles: function(a, b, c) {
//         moveHandles(a, b, scope_Locations, c);
//       },
//       options: originalOptions, // Issue #600, #678
//       updateOptions: updateOptions,
//       target: scope_Target, // Issue #597
//       removePips: removePips,
//       pips: pips // Issue #594
//     };

//     if (options.pips) {
//       pips(options.pips);
//     }

//     if (options.tooltips) {
//       tooltips();
//     }

//     aria();

//     return scope_Self;
//   }

//     // we provide a function to compute constants instead
//   // of accessing window.* as soon as the module needs it
//   // so that we do not compute anything if not needed
//   private getActions() {
//     // Determine the events to bind. IE11 implements pointerEvents without
//     // a prefix, which breaks compatibility with the IE10 implementation.
//     return window.navigator.pointerEnabled
//       ? {
//           start: "pointerdown",
//           move: "pointermove",
//           end: "pointerup"
//         }
//       : window.navigator.msPointerEnabled
//         ? {
//             start: "MSPointerDown",
//             move: "MSPointerMove",
//             end: "MSPointerUp"
//           }
//         : {
//             start: "mousedown touchstart",
//             move: "mousemove touchmove",
//             end: "mouseup touchend"
//           };
//   }

//   private getSupportsTouchActionNone() {
//     return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
//   }

//   private getSupportsPassive() {
//     var supportsPassive = false;

//     try {
//       var opts = Object.defineProperty({}, "passive", {
//         get: function() {
//           supportsPassive = true;
//         }
//       });

//       window.addEventListener("test", null, opts);
//     } catch (e) {}

//     return supportsPassive;
//   }
// }
