/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sectorId = 0;
var lineDefId = 0;
var vertexId = 0;
var vertex3Id = 0;

window.sectors = [];
window.linedefs = [];
window.vertices = [];
window.things = [];

var Sector = exports.Sector = function () {
    function Sector(linedefs) {
        var floorHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var ceilingHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : sectorId++;

        _classCallCheck(this, Sector);

        this.id = id;
        this.linedefs = linedefs;
        this.floorHeight = parseFloat(floorHeight);
        this.ceilingHeight = parseFloat(ceilingHeight);
        window.sectors.push(this);
    }

    _createClass(Sector, [{
        key: 'sortedLinedefs',
        value: function sortedLinedefs() {
            var sortedLinedefs = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.linedefs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var linedef = _step.value;

                    if (sortedLinedefs.length) {
                        var lastLinedef = sortedLinedefs[sortedLinedefs.length - 1];
                        if (linedef.end.x == lastLinedef.end.x && linedef.end.y == lastLinedef.end.y) {
                            sortedLinedefs.push(_extends({}, linedef, { start: linedef.end, end: linedef.start }));
                        } else {
                            sortedLinedefs.push(linedef);
                        }
                    } else {
                        sortedLinedefs.push(linedef);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return sortedLinedefs;
        }
    }, {
        key: 'isPointInSector',
        value: function isPointInSector(origin) {
            var sumOfAngles = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.sortedLinedefs()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var linedef = _step2.value;

                    sumOfAngles += this.getAngle(origin.y - linedef.start.y, origin.x - linedef.start.x, origin.y - linedef.end.y, origin.x - linedef.end.x);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return Math.abs(sumOfAngles).toFixed(2) == (Math.PI * 2).toFixed(2);
        }
    }, {
        key: 'getAngle',
        value: function getAngle(x1, y1, x2, y2) {
            var theta1 = Math.atan2(y1, x1);
            var theta2 = Math.atan2(y2, x2);
            var dtheta = theta2 - theta1;

            if (dtheta > Math.PI) {
                dtheta -= Math.PI * 2;
            }

            if (dtheta < -Math.PI) {
                dtheta += Math.PI * 2;
            }
            // while(dtheta > Math.PI){
            //     dtheta -= Math.PI * 2;
            // }
            // while (dtheta < -Math.PI){
            //     dtheta += Math.PI * 2;
            // }

            return dtheta;
        }
    }]);

    return Sector;
}();

var LineDef = exports.LineDef = function () {
    function LineDef(vectors) {
        var leftSidedef = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#ccc';
        var rightSidedef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ccc';
        var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : lineDefId++;

        _classCallCheck(this, LineDef);

        this.id = id;
        this.vertices = vectors;
        this.start = vectors[0];
        this.end = vectors[1];
        this.leftSidedef = leftSidedef;
        this.rightSidedef = rightSidedef;
        this.parents = [];
        window.linedefs.push(this);
    }

    _createClass(LineDef, [{
        key: 'isPortal',
        value: function isPortal() {
            return this.parents.length > 1;
        }
    }, {
        key: 'length',
        value: function length() {
            var xDiff = this.vertices[0].x - this.vertices[1].x;
            var yDiff = this.vertices[0].y - this.vertices[1].y;

            return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        }
    }], [{
        key: 'transformPoints',
        value: function transformPoints(linedef, origin) {
            var startX = linedef.start.x - origin.x;
            var startY = linedef.start.y - origin.y;
            var endX = linedef.end.x - origin.x;
            var endY = linedef.end.y - origin.y;

            var y1 = startX * Math.cos(origin.rotation) + startY * Math.sin(origin.rotation);
            var x1 = startX * Math.sin(origin.rotation) - startY * Math.cos(origin.rotation);
            var y2 = endX * Math.cos(origin.rotation) + endY * Math.sin(origin.rotation);
            var x2 = endX * Math.sin(origin.rotation) - endY * Math.cos(origin.rotation);

            return {
                start: {
                    x: x1,
                    y: y1
                },
                end: {
                    x: x2,
                    y: y2
                }
            };
        }
    }]);

    return LineDef;
}();

var Vertex = exports.Vertex = function Vertex(x, y) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vertexId++;

    _classCallCheck(this, Vertex);

    this.id = id;
    this.x = x;
    this.y = y;
    window.vertices.push(this);
};

var Thing = exports.Thing = function () {
    function Thing(x, y) {
        var sprite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var type = arguments[3];
        var hex = arguments[4];
        var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : window.things.length;

        _classCallCheck(this, Thing);

        this.id = id;
        this.x = x;
        this.y = y;
        this.hex = hex;
        this.sprite = sprite;
        this.thingType = type;
        window.things.push(this);
    }

    _createClass(Thing, [{
        key: 'type',
        value: function type() {
            return 'thing';
        }
    }]);

    return Thing;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camera = __webpack_require__(5);

var _camera2 = _interopRequireDefault(_camera);

var _objects = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BirdsEyeCamera = function (_Camera) {
    _inherits(BirdsEyeCamera, _Camera);

    function BirdsEyeCamera(canvas, controller) {
        _classCallCheck(this, BirdsEyeCamera);

        return _possibleConstructorReturn(this, (BirdsEyeCamera.__proto__ || Object.getPrototypeOf(BirdsEyeCamera)).call(this, canvas, controller));
    }

    _createClass(BirdsEyeCamera, [{
        key: 'intersect',
        value: function intersect(a, b, c, d) {
            var cd = {
                left: c[0] < d[0] ? c[0] : d[0],
                right: c[0] < d[0] ? d[0] : c[0]
            };
            var ab = {
                left: a[0] < b[0] ? a[0] : b[0],
                right: a[0] < b[0] ? b[0] : a[0]
            };

            var dy1 = b[1] - a[1]; // b.y - a.y
            var dx1 = b[0] - a[0]; // b.x - a.x
            var dy2 = d[1] - c[1]; // d.y - c.y
            var dx2 = d[0] - c[0]; // d.x - c.x

            if (dy1 * dx1 == dy2 * dx1) {
                // no point
            } else {
                var x = ((c[1] - a[1]) * dx1 * dx2 + dy1 * dx2 * a[0] - dy2 * dx1 * c[0]) / (dy1 * dx2 - dy2 * dx1);
                var y = a[1] + dy1 / dx1 * (x - a[0]);

                if (x > cd.left && x < cd.right && x > ab.left && x < ab.right) {
                    return { x: x, y: y };
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var center = this.center;
            var origin = this.origin;

            if (this.scene) {
                this.clear();

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.scene.sectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var sector = _step.value;

                        var portals = [];

                        this.context.beginPath();
                        this.context.fillStyle = 'rgba(52, 152, 219,0.5)';
                        this.context.strokeStyle = '#000';
                        this.context.lineWidth = 1;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = sector.linedefs.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _step2$value = _slicedToArray(_step2.value, 2),
                                    index = _step2$value[0],
                                    linedef = _step2$value[1];

                                var points = _objects.LineDef.transformPoints(linedef, origin);
                                if (index == 0) {
                                    this.context.moveTo(center.x - points.start.x, center.y - points.start.y);
                                    this.context.lineTo(center.x - points.end.x, center.y - points.end.y);
                                } else {
                                    this.context.lineTo(center.x - points.start.x, center.y - points.start.y);
                                    this.context.lineTo(center.x - points.end.x, center.y - points.end.y);
                                }

                                if (linedef.isPortal()) {
                                    portals.push(points);
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        this.context.stroke();
                        if (sector.isPointInSector(origin)) {
                            this.context.fill();
                        }
                        this.context.closePath();

                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = portals[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var portal = _step3.value;

                                this.context.beginPath();
                                this.context.strokeStyle = 'red';
                                this.context.lineWidth = 2;
                                this.context.moveTo(center.x - portal.start.x, center.y - portal.start.y);
                                this.context.lineTo(center.x - portal.end.x, center.y - portal.end.y);
                                this.context.stroke();
                                this.context.closePath();
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = sector.linedefs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var linedef = _step4.value;

                                var _points = _objects.LineDef.transformPoints(linedef, origin);
                                // console.log(points);
                                var intersection = this.intersect([_points.start.x, _points.start.y], [_points.end.x, _points.end.y], [center.x, center.y], [0, 0]);
                                // let intersection1 = this.intersect(points.start.x, points.start.y, points.end.x, points.end.y, -0.0001,0.0001, -20,5);
                                // let intersection2 = this.intersect(points.start.x, points.start.y, points.end.x, points.end.y, 0.0001,0.0001, 20,5);
                                if (intersection) {
                                    this.context.fillStyle = 'red';
                                    this.context.fillRect(center.x - intersection.x - 2, center.y - intersection.y - 2, 4, 4);
                                }
                                console.log(intersection);
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }

                        break;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                this.context.fillStyle = 'red';
                this.context.fillRect(center.x - 2, center.y - 2, 4, 4);

                this.context.beginPath();
                this.context.lineWidth = 1;
                this.context.moveTo(center.x, center.y);
                this.context.lineTo(0, 0);
                this.context.stroke();
                this.context.closePath();

                this.context.beginPath();
                this.context.lineWidth = 1;
                this.context.moveTo(center.x, center.y);
                this.context.lineTo(this.width, 0);
                this.context.stroke();
                this.context.closePath();
            }
        }
    }]);

    return BirdsEyeCamera;
}(_camera2.default);

exports.default = BirdsEyeCamera;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objects = __webpack_require__(0);

var JsonToMap = function JsonToMap(json) {
    var map = {
        sectors: [],
        things: []
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = json.sectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var sector = _step.value;

            var currentSector = new _objects.Sector([], sector.floorHeight, sector.ceilingHeight, sector.id);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = sector.linedefs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var linedef = _step3.value;

                    var currentLinedef = null;
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = window.linedefs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var l = _step4.value;

                            if (l.id == linedef.id) {
                                currentLinedef = l;
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    if (!currentLinedef) {
                        var startVertex = new _objects.Vertex(linedef.startVertex.x, linedef.startVertex.y, linedef.startVertex.id);
                        var endVertex = new _objects.Vertex(linedef.endVertex.x, linedef.endVertex.y, linedef.endVertex.id);
                        currentLinedef = new _objects.LineDef([startVertex, endVertex], linedef.leftSidedef, linedef.rightSidedef, linedef.id);
                    }
                    currentLinedef.parents.push(currentSector);
                    currentSector.linedefs.push(currentLinedef);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            map.sectors.push(currentSector);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = json.things[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var thing = _step2.value;

            map.things.push(new _objects.Thing(thing.x, thing.y, thing.sprite, thing.type, thing.hex, thing.id));
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return map;
};

exports.default = JsonToMap;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = __webpack_require__(6);

var _gameObject2 = _interopRequireDefault(_gameObject);

var _keys = __webpack_require__(7);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_GameObject) {
    _inherits(Player, _GameObject);

    function Player() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, rotation));

        _this.speed = 0;
        _this.direction = 0;
        _this.moveSpeed = 75;
        _this.rotationSpeed = 90;
        _this.bindControls();
        return _this;
    }

    _createClass(Player, [{
        key: 'bindControls',
        value: function bindControls() {
            var _this2 = this;

            document.onkeydown = function (e) {
                var key = e.keyCode ? e.keyCode : e.which;

                switch (key) {
                    case _keys2.default.up:
                        // Up arrow
                        e.preventDefault();
                        _this2.speed = 1;
                        break;
                    case _keys2.default.down:
                        // Down arrow
                        e.preventDefault();
                        _this2.speed = -1;
                        break;
                    case _keys2.default.left:
                        // Left arrow
                        e.preventDefault();
                        _this2.direction = -1;
                        break;
                    case _keys2.default.right:
                        // Right arrow
                        e.preventDefault();
                        _this2.direction = 1;
                        break;
                }
            };

            document.onkeyup = function (e) {
                e.preventDefault();
                var key = e.keyCode ? e.keyCode : e.which;

                switch (key) {
                    case _keys2.default.up:
                        // Up arrow
                        _this2.speed = 0;
                        break;
                    case _keys2.default.down:
                        // Down arrow
                        _this2.speed = 0;
                        break;
                    case _keys2.default.left:
                        // Left arrow
                        _this2.direction = 0;
                        break;
                    case _keys2.default.right:
                        // Right arrow
                        _this2.direction = 0;
                        break;
                }
            };
        }
    }, {
        key: 'update',
        value: function update() {
            this.rotation += this.direction * this.rotationSpeed * window.deltaTime;
            // this.rotation = Math.round(this.rotation);

            if (this.rotation > 360) {
                this.rotation = 0;
            } else if (this.rotation < 0) {
                this.rotation += 360;
            }

            var moveStep = this.speed * this.moveSpeed;

            var moveX = Math.cos(this.radians) * moveStep;
            var moveY = Math.sin(this.radians) * moveStep;

            var newX = this.x + moveX * window.deltaTime;
            var newY = this.y + moveY * window.deltaTime;

            this.x = newX;
            this.y = newY;
        }
    }]);

    return Player;
}(_gameObject2.default);

exports.default = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	"sectors": [
		{
			"id": 0,
			"linedefs": [
				{
					"id": 0,
					"startVertex": {
						"id": 0,
						"x": 112,
						"y": 96
					},
					"endVertex": {
						"id": 1,
						"x": 128,
						"y": 80
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 1,
					"startVertex": {
						"id": 1,
						"x": 128,
						"y": 80
					},
					"endVertex": {
						"id": 2,
						"x": 160,
						"y": 80
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 2,
					"startVertex": {
						"id": 2,
						"x": 160,
						"y": 80
					},
					"endVertex": {
						"id": 3,
						"x": 176,
						"y": 96
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 3,
					"startVertex": {
						"id": 3,
						"x": 176,
						"y": 96
					},
					"endVertex": {
						"id": 4,
						"x": 176,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 4,
					"startVertex": {
						"id": 4,
						"x": 176,
						"y": 128
					},
					"endVertex": {
						"id": 5,
						"x": 160,
						"y": 144
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 5,
					"startVertex": {
						"id": 5,
						"x": 160,
						"y": 144
					},
					"endVertex": {
						"id": 6,
						"x": 128,
						"y": 144
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 6,
					"startVertex": {
						"id": 6,
						"x": 128,
						"y": 144
					},
					"endVertex": {
						"id": 7,
						"x": 112,
						"y": 128
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 7,
					"startVertex": {
						"id": 7,
						"x": 112,
						"y": 128
					},
					"endVertex": {
						"id": 0,
						"x": 112,
						"y": 96
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 1,
			"linedefs": [
				{
					"id": 8,
					"startVertex": {
						"id": 3,
						"x": 176,
						"y": 96
					},
					"endVertex": {
						"id": 8,
						"x": 256,
						"y": 96
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 9,
					"startVertex": {
						"id": 8,
						"x": 256,
						"y": 96
					},
					"endVertex": {
						"id": 9,
						"x": 256,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 10,
					"startVertex": {
						"id": 9,
						"x": 256,
						"y": 128
					},
					"endVertex": {
						"id": 4,
						"x": 176,
						"y": 128
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 3,
					"startVertex": {
						"id": 3,
						"x": 176,
						"y": 96
					},
					"endVertex": {
						"id": 4,
						"x": 176,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 2,
			"linedefs": [
				{
					"id": 11,
					"startVertex": {
						"id": 8,
						"x": 256,
						"y": 96
					},
					"endVertex": {
						"id": 10,
						"x": 272,
						"y": 80
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 12,
					"startVertex": {
						"id": 10,
						"x": 272,
						"y": 80
					},
					"endVertex": {
						"id": 11,
						"x": 304,
						"y": 80
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 13,
					"startVertex": {
						"id": 11,
						"x": 304,
						"y": 80
					},
					"endVertex": {
						"id": 12,
						"x": 320,
						"y": 96
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 14,
					"startVertex": {
						"id": 12,
						"x": 320,
						"y": 96
					},
					"endVertex": {
						"id": 13,
						"x": 320,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 15,
					"startVertex": {
						"id": 13,
						"x": 320,
						"y": 128
					},
					"endVertex": {
						"id": 14,
						"x": 304,
						"y": 144
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 16,
					"startVertex": {
						"id": 14,
						"x": 304,
						"y": 144
					},
					"endVertex": {
						"id": 15,
						"x": 272,
						"y": 144
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 17,
					"startVertex": {
						"id": 15,
						"x": 272,
						"y": 144
					},
					"endVertex": {
						"id": 9,
						"x": 256,
						"y": 128
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 9,
					"startVertex": {
						"id": 8,
						"x": 256,
						"y": 96
					},
					"endVertex": {
						"id": 9,
						"x": 256,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 3,
			"linedefs": [
				{
					"id": 18,
					"startVertex": {
						"id": 15,
						"x": 272,
						"y": 144
					},
					"endVertex": {
						"id": 16,
						"x": 272,
						"y": 240
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 19,
					"startVertex": {
						"id": 16,
						"x": 272,
						"y": 240
					},
					"endVertex": {
						"id": 17,
						"x": 304,
						"y": 240
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 20,
					"startVertex": {
						"id": 17,
						"x": 304,
						"y": 240
					},
					"endVertex": {
						"id": 14,
						"x": 304,
						"y": 144
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 16,
					"startVertex": {
						"id": 14,
						"x": 304,
						"y": 144
					},
					"endVertex": {
						"id": 15,
						"x": 272,
						"y": 144
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 4,
			"linedefs": [
				{
					"id": 21,
					"startVertex": {
						"id": 16,
						"x": 272,
						"y": 240
					},
					"endVertex": {
						"id": 18,
						"x": 256,
						"y": 256
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 22,
					"startVertex": {
						"id": 18,
						"x": 256,
						"y": 256
					},
					"endVertex": {
						"id": 19,
						"x": 160,
						"y": 256
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 23,
					"startVertex": {
						"id": 19,
						"x": 160,
						"y": 256
					},
					"endVertex": {
						"id": 20,
						"x": 160,
						"y": 336
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 24,
					"startVertex": {
						"id": 20,
						"x": 160,
						"y": 336
					},
					"endVertex": {
						"id": 21,
						"x": 384,
						"y": 336
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 25,
					"startVertex": {
						"id": 21,
						"x": 384,
						"y": 336
					},
					"endVertex": {
						"id": 22,
						"x": 384,
						"y": 256
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 26,
					"startVertex": {
						"id": 22,
						"x": 384,
						"y": 256
					},
					"endVertex": {
						"id": 23,
						"x": 320,
						"y": 256
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 27,
					"startVertex": {
						"id": 23,
						"x": 320,
						"y": 256
					},
					"endVertex": {
						"id": 17,
						"x": 304,
						"y": 240
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 19,
					"startVertex": {
						"id": 16,
						"x": 272,
						"y": 240
					},
					"endVertex": {
						"id": 17,
						"x": 304,
						"y": 240
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 5,
			"linedefs": [
				{
					"id": 28,
					"startVertex": {
						"id": 22,
						"x": 384,
						"y": 256
					},
					"endVertex": {
						"id": 24,
						"x": 416,
						"y": 272
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 29,
					"startVertex": {
						"id": 24,
						"x": 416,
						"y": 272
					},
					"endVertex": {
						"id": 25,
						"x": 416,
						"y": 320
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 30,
					"startVertex": {
						"id": 25,
						"x": 416,
						"y": 320
					},
					"endVertex": {
						"id": 21,
						"x": 384,
						"y": 336
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 25,
					"startVertex": {
						"id": 21,
						"x": 384,
						"y": 336
					},
					"endVertex": {
						"id": 22,
						"x": 384,
						"y": 256
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 6,
			"linedefs": [
				{
					"id": 31,
					"startVertex": {
						"id": 24,
						"x": 416,
						"y": 272
					},
					"endVertex": {
						"id": 26,
						"x": 544,
						"y": 192
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 32,
					"startVertex": {
						"id": 26,
						"x": 544,
						"y": 192
					},
					"endVertex": {
						"id": 27,
						"x": 544,
						"y": 240
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 33,
					"startVertex": {
						"id": 27,
						"x": 544,
						"y": 240
					},
					"endVertex": {
						"id": 25,
						"x": 416,
						"y": 320
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 29,
					"startVertex": {
						"id": 24,
						"x": 416,
						"y": 272
					},
					"endVertex": {
						"id": 25,
						"x": 416,
						"y": 320
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 7,
			"linedefs": [
				{
					"id": 34,
					"startVertex": {
						"id": 26,
						"x": 544,
						"y": 192
					},
					"endVertex": {
						"id": 28,
						"x": 544,
						"y": 128
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 35,
					"startVertex": {
						"id": 28,
						"x": 544,
						"y": 128
					},
					"endVertex": {
						"id": 29,
						"x": 640,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 36,
					"startVertex": {
						"id": 29,
						"x": 640,
						"y": 128
					},
					"endVertex": {
						"id": 30,
						"x": 640,
						"y": 288
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 37,
					"startVertex": {
						"id": 30,
						"x": 640,
						"y": 288
					},
					"endVertex": {
						"id": 31,
						"x": 544,
						"y": 288
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 38,
					"startVertex": {
						"id": 31,
						"x": 544,
						"y": 288
					},
					"endVertex": {
						"id": 27,
						"x": 544,
						"y": 240
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 32,
					"startVertex": {
						"id": 26,
						"x": 544,
						"y": 192
					},
					"endVertex": {
						"id": 27,
						"x": 544,
						"y": 240
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 8,
			"linedefs": [
				{
					"id": 39,
					"startVertex": {
						"id": 12,
						"x": 320,
						"y": 96
					},
					"endVertex": {
						"id": 78,
						"x": 480,
						"y": 16
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 40,
					"startVertex": {
						"id": 78,
						"x": 480,
						"y": 16
					},
					"endVertex": {
						"id": 79,
						"x": 480,
						"y": 48
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 41,
					"startVertex": {
						"id": 79,
						"x": 480,
						"y": 48
					},
					"endVertex": {
						"id": 13,
						"x": 320,
						"y": 128
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 14,
					"startVertex": {
						"id": 12,
						"x": 320,
						"y": 96
					},
					"endVertex": {
						"id": 13,
						"x": 320,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 9,
			"linedefs": [
				{
					"id": 42,
					"startVertex": {
						"id": 78,
						"x": 480,
						"y": 16
					},
					"endVertex": {
						"id": 80,
						"x": 608,
						"y": 16
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 43,
					"startVertex": {
						"id": 80,
						"x": 608,
						"y": 16
					},
					"endVertex": {
						"id": 81,
						"x": 576,
						"y": 48
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 44,
					"startVertex": {
						"id": 81,
						"x": 576,
						"y": 48
					},
					"endVertex": {
						"id": 79,
						"x": 480,
						"y": 48
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 40,
					"startVertex": {
						"id": 78,
						"x": 480,
						"y": 16
					},
					"endVertex": {
						"id": 79,
						"x": 480,
						"y": 48
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 10,
			"linedefs": [
				{
					"id": 45,
					"startVertex": {
						"id": 81,
						"x": 576,
						"y": 48
					},
					"endVertex": {
						"id": 82,
						"x": 576,
						"y": 112
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 46,
					"startVertex": {
						"id": 82,
						"x": 576,
						"y": 112
					},
					"endVertex": {
						"id": 83,
						"x": 608,
						"y": 112
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 47,
					"startVertex": {
						"id": 83,
						"x": 608,
						"y": 112
					},
					"endVertex": {
						"id": 80,
						"x": 608,
						"y": 16
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 43,
					"startVertex": {
						"id": 80,
						"x": 608,
						"y": 16
					},
					"endVertex": {
						"id": 81,
						"x": 576,
						"y": 48
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		},
		{
			"id": 11,
			"linedefs": [
				{
					"id": 48,
					"startVertex": {
						"id": 82,
						"x": 576,
						"y": 112
					},
					"endVertex": {
						"id": 28,
						"x": 544,
						"y": 128
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 35,
					"startVertex": {
						"id": 28,
						"x": 544,
						"y": 128
					},
					"endVertex": {
						"id": 29,
						"x": 640,
						"y": 128
					},
					"leftSidedef": null,
					"rightSidedef": null
				},
				{
					"id": 49,
					"startVertex": {
						"id": 29,
						"x": 640,
						"y": 128
					},
					"endVertex": {
						"id": 83,
						"x": 608,
						"y": 112
					},
					"leftSidedef": "#cccccc",
					"rightSidedef": "#cccccc"
				},
				{
					"id": 46,
					"startVertex": {
						"id": 82,
						"x": 576,
						"y": 112
					},
					"endVertex": {
						"id": 83,
						"x": 608,
						"y": 112
					},
					"leftSidedef": null,
					"rightSidedef": null
				}
			],
			"floorHeight": "0",
			"ceilingHeight": "20"
		}
	],
	"things": [
		{
			"id": 0,
			"x": 145.5,
			"y": 112.5,
			"sprite": "PLAY",
			"type": "player_starts",
			"hex": "1"
		}
	]
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
    function Camera(canvas) {
        var controller = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Camera);

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.scene = null;
        this._x = 0;
        this._y = 0;
        this._rotation = 0;
        this.controller = controller;
    }

    _createClass(Camera, [{
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }, {
        key: 'addScene',
        value: function addScene(scene) {
            this.scene = scene;
            this.render();
        }
    }, {
        key: 'width',
        get: function get() {
            return this.canvas.width;
        },
        set: function set(width) {
            this.canvas.width = width;
        }
    }, {
        key: 'height',
        get: function get() {
            return this.canvas.height;
        },
        set: function set(height) {
            this.canvas.height = height;
        }
    }, {
        key: 'center',
        get: function get() {
            return {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2
            };
        }
    }, {
        key: 'radians',
        get: function get() {
            return this.rotation * Math.PI / 180;
        },
        set: function set(radians) {
            this.rotation = radians * 180 / Math.PI;
        }
    }, {
        key: 'origin',
        get: function get() {
            return {
                x: this.x,
                y: this.y,
                rotation: this.radians
            };
        }
    }, {
        key: 'x',
        get: function get() {
            return this.controller.x;
        }
    }, {
        key: 'y',
        get: function get() {
            return this.controller.y;
        }
    }, {
        key: 'rotation',
        get: function get() {
            return this.controller.rotation;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject(x, y, rotation) {
        var _this = this;

        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
        this.rotation = rotation;

        setTimeout(function () {
            _this.loop();
        }, 100);
    }

    _createClass(GameObject, [{
        key: "update",
        value: function update() {}
    }, {
        key: "loop",
        value: function loop() {
            var _this2 = this;

            this.update();
            window.requestAnimationFrame(function () {
                return _this2.loop();
            });
        }
    }, {
        key: "radians",
        get: function get() {
            return this.rotation * Math.PI / 180;
        },
        set: function set(radians) {
            this.rotation = radians * 180 / Math.PI;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var keys = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
};

exports.default = keys;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _birdsEyeCamera = __webpack_require__(1);

var _birdsEyeCamera2 = _interopRequireDefault(_birdsEyeCamera);

var _map = __webpack_require__(4);

var _map2 = _interopRequireDefault(_map);

var _jsonToMap = __webpack_require__(2);

var _jsonToMap2 = _interopRequireDefault(_jsonToMap);

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        window.deltaTime = 0;
        window.lastUpdate = Date.now();
        this.scene = (0, _jsonToMap2.default)(_map2.default);
        this.player = new _player2.default(145, 100, 0);
        this.birdsEyeCamera = new _birdsEyeCamera2.default(document.getElementById('canvas'), this.player);

        this.birdsEyeCamera.addScene(this.scene);
        this.loop();
    }

    _createClass(Main, [{
        key: 'updateDeltaTime',
        value: function updateDeltaTime() {
            var currentFrameTime = Date.now();
            window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
            window.lastUpdate = currentFrameTime;
        }
    }, {
        key: 'loop',
        value: function loop() {
            this.updateDeltaTime();
            this.birdsEyeCamera.render();
            // window.requestAnimationFrame(() => this.loop());
        }
    }]);

    return Main;
}();

window.engine = new Main();
console.log(window.engine);

/***/ })
/******/ ]);