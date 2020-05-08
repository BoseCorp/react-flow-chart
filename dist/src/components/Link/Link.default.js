"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../../");
exports.LinkDefault = function (_a) {
    var config = _a.config, link = _a.link, startPos = _a.startPos, endPos = _a.endPos, onLinkMouseEnter = _a.onLinkMouseEnter, onLinkMouseLeave = _a.onLinkMouseLeave, onLinkClick = _a.onLinkClick, isHovered = _a.isHovered, isSelected = _a.isSelected;
    var points = __1.generateCurvePath(startPos, endPos);
    var lineColor = "cornflowerblue";
    var className = '';
    if (link && link.properties) {
        if (link.properties.lineColor) {
            lineColor = link.properties.lineColor;
        }
        if (!!link.properties.isInvalid) {
            className = 'link__invalid';
        }
        if (!!link.properties.isPreview) {
            className = 'link__preview';
        }
        if (!!link.properties.isExistingPreview) {
            className = 'link__existingPreview';
        }
    }
    return (React.createElement("svg", { "data-link": true, className: className, style: { overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 } },
        React.createElement("circle", { "data-link-circle": true, r: "4", cx: startPos.x, cy: startPos.y, fill: lineColor }),
        React.createElement("path", { "data-link-line": true, d: points, stroke: lineColor, strokeWidth: "3", fill: "none" }),
        React.createElement("path", { d: points, stroke: lineColor, strokeWidth: "20", fill: "none", strokeLinecap: "round", strokeOpacity: (isHovered || isSelected) ? 0.4 : 0, onMouseEnter: function () { return onLinkMouseEnter({ config: config, linkId: link.id }); }, onMouseLeave: function () { return onLinkMouseLeave({ config: config, linkId: link.id }); }, onClick: function (e) {
                onLinkClick({ config: config, linkId: link.id });
                e.stopPropagation();
            } }),
        React.createElement("circle", { "data-link-circle": true, r: "4", cx: endPos.x, cy: endPos.y, fill: lineColor })));
};
//# sourceMappingURL=Link.default.js.map