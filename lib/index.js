"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var key = {
    fullscreenEnabled: 0,
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5,
};
var webkit = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
];
var moz = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
];
var ms = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
];
var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
var vendor = (('fullscreenEnabled' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (moz[0] in document && moz) ||
    (ms[0] in document && ms) ||
    []);
var getFullScreenMethod = function (element) {
    return element[vendor[key.requestFullscreen]];
};
var fscreen = {
    requestFullscreen: function (element) { return getFullScreenMethod(element)(); },
    requestFullscreenFunction: function (element) { return element[vendor[key.requestFullscreen]]; },
    get exitFullscreen() {
        return document[vendor[key.exitFullscreen]].bind(document);
    },
    addEventListener: function (type, handler, options) { return document.addEventListener(vendor[key[type]], handler, options); },
    removeEventListener: function (type, handler, options) { return document.removeEventListener(vendor[key[type]], handler, options); },
    get fullscreenEnabled() {
        return Boolean(document[vendor[key.fullscreenEnabled]]);
    },
    set fullscreenEnabled(val) {
    },
    get fullscreenElement() {
        return document[vendor[key.fullscreenElement]];
    },
    set fullscreenElement(val) {
    },
    get onfullscreenchange() {
        return document[("on" + vendor[key.fullscreenchange]).toLowerCase()];
    },
    set onfullscreenchange(handler) {
        document[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
    },
    get onfullscreenerror() {
        return document[("on" + vendor[key.fullscreenerror]).toLowerCase()];
    },
    set onfullscreenerror(handler) {
        document[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
    },
};
var FullScreen = (function (_super) {
    __extends(FullScreen, _super);
    function FullScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.detectFullScreen = function () {
            if (_this.props.onChange) {
                _this.props.onChange(!!fscreen.fullscreenElement);
            }
            if (_this.props.onOpen && !!fscreen.fullscreenElement) {
                _this.props.onOpen();
            }
            if (_this.props.onClose && !fscreen.fullscreenElement) {
                _this.props.onClose();
            }
        };
        _this.enterFullScreen = function () {
            fscreen.requestFullscreen(_this.node);
        };
        _this.leaveFullScreen = function () {
            fscreen.exitFullscreen();
        };
        return _this;
    }
    FullScreen.prototype.componentDidMount = function () {
        fscreen.addEventListener('fullscreenchange', this.detectFullScreen);
    };
    FullScreen.prototype.componentWillUnmount = function () {
        fscreen.removeEventListener('fullscreenchange', this.detectFullScreen);
    };
    FullScreen.prototype.componentWillReceiveProps = function (nextProps) {
        this.handleProps(nextProps);
    };
    FullScreen.prototype.handleProps = function (props) {
        var enabled = fscreen.fullscreenElement;
        if (enabled && !props.enabled) {
            this.leaveFullScreen();
        }
        else if (!enabled && props.enabled) {
            this.enterFullScreen();
        }
    };
    FullScreen.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "FullScreen", ref: function (node) { return (_this.node = node); }, style: { height: '100%', width: '100%' } }, this.props.children));
    };
    FullScreen.defaultProps = {
        enabled: false,
    };
    return FullScreen;
}(React.Component));
exports.default = FullScreen;
//# sourceMappingURL=index.js.map