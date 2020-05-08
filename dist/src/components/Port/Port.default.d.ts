/// <reference types="react" />
import { IConfig, IPort, INode } from '../../';
export interface IPortDefaultProps {
    config: IConfig;
    node: INode;
    port: IPort;
    context: any;
    onMouseDown: any;
    isNodeSelected: boolean;
    isSelected: boolean;
    isHovered: boolean;
    isLinkSelected: boolean;
    isLinkHovered: boolean;
}
export declare const PortDefault: ({ isLinkSelected, isLinkHovered }: IPortDefaultProps) => JSX.Element;
