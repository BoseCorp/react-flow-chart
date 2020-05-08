"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../../");
exports.PortsDefault = function (_a) {
    var children = _a.children, config = _a.config;
    return (React.createElement("div", { "data-ports": true },
        React.createElement(__1.PortsGroupDefault, { config: config, side: "top", "data-ports-top": true }, children.filter(function (child) { return ['input', 'top'].includes(child.props.port.type); })),
        React.createElement(__1.PortsGroupDefault, { config: config, side: "bottom", "data-ports-bottom": true }, children.filter(function (child) { return ['output', 'bottom'].includes(child.props.port.type); })),
        React.createElement(__1.PortsGroupDefault, { config: config, side: "right", "data-ports-right": true }, children.filter(function (child) { return ['right'].includes(child.props.port.type); })),
        React.createElement(__1.PortsGroupDefault, { config: config, side: "left", "data-ports-left": true }, children.filter(function (child) { return ['left'].includes(child.props.port.type); }))));
};
//# sourceMappingURL=Ports.default.js.map