"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../../");
exports.FlowChart = function (props) {
    // const [ canvasSize, setCanvasSize ] = React.useState<{ width: number, height: number }>({ width: 0, height: 0 })
    var chart = props.chart, _a = props.callbacks, onDragNode = _a.onDragNode, onDragStop = _a.onDragStop, onDragCanvas = _a.onDragCanvas, onZoomCanvas = _a.onZoomCanvas, onCanvasKeyCommand = _a.onCanvasKeyCommand, onCanvasDrop = _a.onCanvasDrop, onLinkStart = _a.onLinkStart, onLinkMove = _a.onLinkMove, onLinkComplete = _a.onLinkComplete, onLinkCancel = _a.onLinkCancel, onPortPositionChange = _a.onPortPositionChange, onLinkMouseEnter = _a.onLinkMouseEnter, onLinkMouseLeave = _a.onLinkMouseLeave, onLinkClick = _a.onLinkClick, onCanvasClick = _a.onCanvasClick, onDeleteKey = _a.onDeleteKey, onNodeClick = _a.onNodeClick, onNodeSizeChange = _a.onNodeSizeChange, onPortEnter = _a.onPortEnter, _b = props.Components, _c = _b === void 0 ? {} : _b, _d = _c.CanvasOuter, CanvasOuter = _d === void 0 ? __1.CanvasOuterDefault : _d, _e = _c.CanvasInner, CanvasInner = _e === void 0 ? __1.CanvasInnerDefault : _e, _f = _c.NodeInner, NodeInner = _f === void 0 ? __1.NodeInnerDefault : _f, _g = _c.Ports, Ports = _g === void 0 ? __1.PortsDefault : _g, _h = _c.Port, Port = _h === void 0 ? __1.PortDefault : _h, _j = _c.Node, Node = _j === void 0 ? __1.NodeDefault : _j, _k = _c.Link, Link = _k === void 0 ? __1.LinkDefault : _k, _l = props.config, config = _l === void 0 ? {} : _l;
    var links = chart.links, nodes = chart.nodes, selected = chart.selected, hovered = chart.hovered;
    var canvasCallbacks = { onDragCanvas: onDragCanvas, onZoomCanvas: onZoomCanvas, onCanvasClick: onCanvasClick, onDeleteKey: onDeleteKey, onCanvasDrop: onCanvasDrop, onCanvasKeyCommand: onCanvasKeyCommand };
    var linkCallbacks = { onLinkMouseEnter: onLinkMouseEnter, onLinkMouseLeave: onLinkMouseLeave, onLinkClick: onLinkClick };
    var nodeCallbacks = { onDragNode: onDragNode, onDragStop: onDragStop, onNodeClick: onNodeClick, onNodeSizeChange: onNodeSizeChange };
    var portCallbacks = { onPortPositionChange: onPortPositionChange, onLinkStart: onLinkStart, onLinkMove: onLinkMove, onLinkComplete: onLinkComplete, onLinkCancel: onLinkCancel, onPortEnter: onPortEnter };
    var nodesInView = Object.keys(nodes);
    var linksInView = Object.keys(links);
    return (React.createElement(__1.CanvasWrapper, __assign({ config: config, position: chart.offset, zoom: chart.zoom, ComponentInner: CanvasInner, ComponentOuter: CanvasOuter, onSizeChange: function (width, height) { } }, canvasCallbacks),
        linksInView.map(function (linkId) {
            var isSelected = selected.type === 'link' && selected.id === linkId;
            var isHovered = hovered.type === 'link' && hovered.id === linkId;
            var fromNodeId = links[linkId].from.nodeId;
            var toNodeId = links[linkId].to.nodeId;
            return (React.createElement(__1.LinkWrapper, __assign({ config: config, key: linkId, link: links[linkId], Component: Link, isSelected: isSelected, isHovered: isHovered, fromNode: nodes[fromNodeId], toNode: toNodeId ? nodes[toNodeId] : undefined }, linkCallbacks)));
        }),
        nodesInView.map(function (nodeId) {
            var isSelected = selected.type === 'node' && selected.id === nodeId;
            var selectedLink = getSelectedLinkForNode(selected, nodeId, links);
            var hoveredLink = getSelectedLinkForNode(hovered, nodeId, links);
            var isHovered = undefined;
            if (hoveredLink) {
                isHovered = hoveredLink;
            }
            else if (hovered) {
                isHovered = hovered;
            }
            return (React.createElement(__1.NodeWrapper, __assign({ config: config, key: nodeId, Component: Node, node: nodes[nodeId], offset: chart.offset, isSelected: isSelected, selected: (selectedLink || isSelected) ? selected : undefined, hovered: isHovered, selectedLink: selectedLink, hoveredLink: hoveredLink, NodeInner: NodeInner, Ports: Ports, Port: Port }, nodeCallbacks, portCallbacks)));
        })));
};
var getSelectedLinkForNode = function (selected, nodeId, links) {
    var link = selected.type === 'link' && selected.id ? links[selected.id] : undefined;
    if (link && (link.from.nodeId === nodeId || link.to.nodeId === nodeId)) {
        return link;
    }
    return undefined;
};
//# sourceMappingURL=FlowChart.js.map