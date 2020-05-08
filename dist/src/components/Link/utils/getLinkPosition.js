"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkPosition = function (node, portId) {
    // const port = node.ports[portId]
    // if (port) {
    //   // console.log(port.id, port.position)
    //   return {
    //     x: node.position.x + (port.position ? port.position.x : 0),
    //     y: node.position.y + (port.position ? port.position.y : 0),
    //   }
    // }
    // console.error(`Can't find ${portId} on Node ${node.id}`)
    // console.log(node)
    // return {
    //   x: node.position.x,
    //   y: node.position.y,
    // }
    var port = node.ports[portId];
    if (port) {
        // console.log(port.position)
        return {
            x: node.position.x + (port.position ? port.position.x : 0),
            y: node.position.y + (port.position ? port.position.y : 0)
        };
    }
    // console.error(`Can't find ${portId} on Node ${node.id}`)
    // console.log(node)
    if (node && node.position) {
        return {
            x: node.position.x,
            y: node.position.y
        };
    }
    return {
        x: 0,
        y: 0
    };
};
//# sourceMappingURL=getLinkPosition.js.map