import * as React from 'react';
import { IConfig, ILink, INode, INodeInnerDefaultProps, IOnDragNode, IOnLinkCancel, IOnLinkComplete, IOnLinkMove, IOnLinkStart, IOnNodeClick, IOnDragStop, IOnNodeSizeChange, IOnPortPositionChange, IPortDefaultProps, IPortsDefaultProps, IPosition, ISelectedOrHovered, IOnPortMouseEnter } from '../../';
import { INodeDefaultProps } from './Node.default';
export interface INodeWrapperProps {
    config: IConfig;
    node: INode;
    Component: React.FunctionComponent<INodeDefaultProps>;
    offset: IPosition;
    selected: ISelectedOrHovered | undefined;
    hovered: ISelectedOrHovered | undefined;
    selectedLink: ILink | undefined;
    hoveredLink: ILink | undefined;
    isSelected: boolean;
    NodeInner: React.FunctionComponent<INodeInnerDefaultProps>;
    Ports: React.FunctionComponent<IPortsDefaultProps>;
    Port: React.FunctionComponent<IPortDefaultProps>;
    onPortPositionChange: IOnPortPositionChange;
    onLinkStart: IOnLinkStart;
    onLinkMove: IOnLinkMove;
    onLinkComplete: IOnLinkComplete;
    onLinkCancel: IOnLinkCancel;
    onDragNode: IOnDragNode;
    onNodeClick: IOnNodeClick;
    onDragStop: IOnDragStop;
    onNodeSizeChange: IOnNodeSizeChange;
    onPortEnter: IOnPortMouseEnter;
}
export declare const NodeWrapper: ({ config, node, onDragNode, onNodeClick, onDragStop, isSelected, Component, onNodeSizeChange, NodeInner, Ports, Port, offset, selected, selectedLink, hovered, hoveredLink, onPortPositionChange, onLinkStart, onLinkMove, onLinkComplete, onLinkCancel, onPortEnter, }: INodeWrapperProps) => JSX.Element;
