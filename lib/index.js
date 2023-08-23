"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullScreenEnabled = void 0;
const React = require("react");
const key = {
    fullscreenEnabled: 0,
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5,
};
const webkit = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
];
const moz = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
];
const ms = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
];
const document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
const vendor = (('fullscreenEnabled' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (moz[0] in document && moz) ||
    (ms[0] in document && ms) ||
    []);
class fscreen {
    static requestFullscreen(element) { return element[vendor[key.requestFullscreen]](); }
    ;
    static requestFullscreenFunction(element) { return element[vendor[key.requestFullscreen]]; }
    ;
    static get exitFullscreen() {
        return document[vendor[key.exitFullscreen]].bind(document);
    }
    ;
    static addEventListener(type, handler, options) { return document.addEventListener(vendor[key[type]], handler, options); }
    ;
    static removeEventListener(type, handler, options) { return document.removeEventListener(vendor[key[type]], handler, options); }
    ;
    static get fullscreenEnabled() {
        return Boolean(document[vendor[key.fullscreenEnabled]]);
    }
    ;
    static set fullscreenEnabled(val) {
    }
    ;
    static get fullscreenElement() {
        return document[vendor[key.fullscreenElement]];
    }
    ;
    static set fullscreenElement(val) {
    }
    ;
    static get onfullscreenchange() {
        return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()];
    }
    ;
    static set onfullscreenchange(handler) {
        document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler;
    }
    ;
    static get onfullscreenerror() {
        return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()];
    }
    ;
    static set onfullscreenerror(handler) {
        document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler;
    }
    ;
}
;
const getFullScreenEnabled = () => {
    return fscreen.fullscreenEnabled;
};
exports.getFullScreenEnabled = getFullScreenEnabled;
class FullScreen extends React.Component {
    constructor(props) {
        super(props);
        this.detectFullScreen = () => {
            if (this.props.onChange) {
                this.props.onChange(!!fscreen.fullscreenElement);
            }
            if (this.props.onOpen && !!fscreen.fullscreenElement) {
                this.props.onOpen();
            }
            if (this.props.onClose && !fscreen.fullscreenElement) {
                this.props.onClose();
            }
        };
        this.enterFullScreen = () => {
            fscreen.requestFullscreen(this.node);
        };
        this.leaveFullScreen = () => {
            fscreen.exitFullscreen();
        };
    }
    componentDidMount() {
        fscreen.addEventListener('fullscreenchange', this.detectFullScreen, {});
    }
    componentWillUnmount() {
        fscreen.removeEventListener('fullscreenchange', this.detectFullScreen, {});
    }
    componentDidUpdate() {
        this.handleProps(this.props);
    }
    handleProps(props) {
        const enabled = fscreen.fullscreenElement;
        if (enabled && !props.enabled) {
            this.leaveFullScreen();
        }
        else if (!enabled && props.enabled) {
            this.enterFullScreen();
        }
    }
    render() {
        return (React.createElement("div", { className: "FullScreen", ref: node => (this.node = node), style: { height: '100%', width: '100%' } }, this.props.children));
    }
}
exports.default = FullScreen;
FullScreen.defaultProps = {
    enabled: false,
};
//# sourceMappingURL=index.js.map