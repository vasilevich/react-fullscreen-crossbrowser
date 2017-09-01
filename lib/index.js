"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const fscreen = {
    requestFullscreen: (element) => element[vendor[key.requestFullscreen]](),
    requestFullscreenFunction: (element) => element[vendor[key.requestFullscreen]],
    get exitFullscreen() {
        return document[vendor[key.exitFullscreen]].bind(document);
    },
    addEventListener: (type, handler, options) => document.addEventListener(vendor[key[type]], handler, options),
    removeEventListener: (type, handler, options) => document.removeEventListener(vendor[key[type]], handler, options),
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
        return document[`on${vendor[key.fullscreenchange]}`.toLowerCase()];
    },
    set onfullscreenchange(handler) {
        document[`on${vendor[key.fullscreenchange]}`.toLowerCase()] = handler;
    },
    get onfullscreenerror() {
        return document[`on${vendor[key.fullscreenerror]}`.toLowerCase()];
    },
    set onfullscreenerror(handler) {
        document[`on${vendor[key.fullscreenerror]}`.toLowerCase()] = handler;
    },
};
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
        fscreen.addEventListener('fullscreenchange', this.detectFullScreen);
    }
    componentWillUnmount() {
        fscreen.removeEventListener('fullscreenchange', this.detectFullScreen);
    }
    componentWillReceiveProps(nextProps) {
        this.handleProps(nextProps);
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
FullScreen.defaultProps = {
    enabled: false,
};
exports.default = FullScreen;
//# sourceMappingURL=index.js.map