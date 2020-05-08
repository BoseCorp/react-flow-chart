"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// import DraggableCore from 'react-draggable'
var react_zoom_pan_pinch_1 = require("react-zoom-pan-pinch");
var __1 = require("../../");
var CanvasContext_1 = require("./CanvasContext");
var CanvasWrapper = /** @class */ (function (_super) {
    __extends(CanvasWrapper, _super);
    function CanvasWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0,
            height: 0,
            offsetX: 0,
            offsetY: 0,
            disableSelection: false
        };
        _this.ref = React.createRef();
        _this.updateSize = function () {
            var el = _this.ref.current;
            if (el) {
                var rect = el.getBoundingClientRect();
                if (el.offsetWidth !== _this.state.width || el.offsetHeight !== _this.state.height) {
                    _this.setState({ width: el.offsetWidth, height: el.offsetHeight });
                    _this.props.onSizeChange(el.offsetWidth, el.offsetHeight);
                }
                if (rect.left !== _this.state.offsetX || rect.top !== _this.state.offsetY) {
                    _this.setState({ offsetX: rect.left, offsetY: rect.top });
                }
            }
        };
        return _this;
    }
    CanvasWrapper.prototype.componentDidMount = function () {
        this.updateSize();
        if (this.ref.current) {
            if (window.ResizeObserver) {
                var ro = new window.ResizeObserver(this.updateSize);
                ro.observe(this.ref.current);
            }
            else {
                window.addEventListener('resize', this.updateSize);
            }
            window.addEventListener('scroll', this.updateSize);
        }
    };
    CanvasWrapper.prototype.componentDidUpdate = function () {
        this.updateSize();
    };
    CanvasWrapper.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.updateSize);
        window.removeEventListener('scroll', this.updateSize);
    };
    CanvasWrapper.prototype.render = function () {
        var _this = this;
        var _a = this.props, config = _a.config, ComponentInner = _a.ComponentInner, ComponentOuter = _a.ComponentOuter, position = _a.position, zoom = _a.zoom, onZoomCanvas = _a.onZoomCanvas, onDragCanvas = _a.onDragCanvas, onCanvasKeyCommand = _a.onCanvasKeyCommand, children = _a.children, onCanvasDrop = _a.onCanvasDrop;
        var _b = this.state, offsetX = _b.offsetX, offsetY = _b.offsetY, disableSelection = _b.disableSelection;
        var options = {
            transformEnabled: zoom.transformEnabled || true,
            minScale: zoom.minScale || .25,
            maxScale: zoom.maxScale || 2,
            limitToBounds: false,
            limitToWrapper: false,
            centerContent: false
        };
        config.readonly = disableSelection;
        var doubleClickMode = disableSelection ? 'zoomOut' : 'zoomIn';
        return (React.createElement(CanvasContext_1.default.Provider, { value: { offsetX: this.state.offsetX, offsetY: this.state.offsetY, zoomScale: zoom.scale } },
            React.createElement(ComponentOuter, { config: config, ref: this.ref },
                React.createElement(react_zoom_pan_pinch_1.TransformWrapper, { defaultPositionX: position.x, defaultPositionY: position.y, positionX: position.x, positionY: position.y, scale: zoom.scale, options: options, zoomIn: zoom.zoomIn || { step: 300 }, zoomOut: zoom.zoomOut || { step: 300 }, pan: zoom.pan || { disabled: false }, wheel: zoom.wheel || { disabled: false, step: 75 }, doubleClick: { disabled: true, step: 10, mode: doubleClickMode }, pinch: { disabled: false }, onWheel: function (data) { return onZoomCanvas({ config: config, data: data }); }, onWheelStop: function (data) { return onZoomCanvas({ config: config, data: data }); }, onPanning: function (data) { return onDragCanvas({ config: config, data: data }); }, onPanningStop: function (data) { return onDragCanvas({ config: config, data: data }); } },
                    React.createElement(react_zoom_pan_pinch_1.TransformComponent, null,
                        React.createElement(ComponentInner, { config: config, children: children, onClick: function () { return null; }, tabIndex: 0, onKeyDown: function (e) {
                                // delete or backspace keys
                                if (e.keyCode === 32 && !disableSelection) {
                                    _this.setState({ disableSelection: true });
                                }
                            }, onKeyUp: function (e) {
                                // delete or backspace keys
                                if (e.keyCode === 32 && disableSelection) {
                                    _this.setState({ disableSelection: false });
                                }
                                onCanvasKeyCommand({ config: config, keyCode: e.keyCode });
                            }, onDrop: function (e) {
                                var data = JSON.parse(e.dataTransfer.getData(__1.REACT_FLOW_CHART));
                                if (data) {
                                    onCanvasDrop({ config: config, data: data, position: {
                                            x: e.clientX - (position.x + offsetX),
                                            y: e.clientY - (position.y + offsetY),
                                        } });
                                }
                            }, onDragOver: function (e) { return e.preventDefault(); } }))))));
        return (onZoomCanvas);
        // return (
        //   <CanvasContext.Provider value={{ offsetX: this.state.offsetX, offsetY: this.state.offsetY }}>
        //     <ComponentOuter config={config} ref={this.ref}>
        //       <DraggableCore
        //         axis="both"
        //         defaultPosition={config.defaultPosition}
        //         position={position}
        //         grid={config.grid}
        //         onDrag={(event, data) => onDragCanvas({ config, event, data })}
        //         disabled={config.disableCanvas}
        //       >
        //         <ComponentInner
        //           config={config}
        //           children={children}
        //           onClick={() => onCanvasClick({ config })}
        //           tabIndex={0}
        //           onKeyDown={ (e: React.KeyboardEvent) => {
        //             // delete or backspace keys
        //             if (e.keyCode === 46 || e.keyCode === 8) {
        //               onDeleteKey({ config })
        //             }
        //           }}
        //           onDrop={ (e) => {
        //             const data = JSON.parse(e.dataTransfer.getData(REACT_FLOW_CHART))
        //             if (data) {
        //               onCanvasDrop({ config, data, position: {
        //                 x: e.clientX - (position.x + offsetX),
        //                 y: e.clientY - (position.y + offsetY),
        //               }})
        //             }
        //           } }
        //           onDragOver={(e) => e.preventDefault()}
        //         />
        //       </DraggableCore>
        //     </ComponentOuter>
        //   </CanvasContext.Provider>
        // )
    };
    return CanvasWrapper;
}(React.Component));
exports.CanvasWrapper = CanvasWrapper;
//# sourceMappingURL=Canvas.wrapper.js.map