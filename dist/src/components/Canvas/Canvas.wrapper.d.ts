import * as React from 'react';
import { IConfig, IZoom, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnZoomCanvas, IOnDragCanvas, IOnCanvasKeyCommand } from '../../';
import { ICanvasInnerDefaultProps } from './CanvasInner.default';
import { ICanvasOuterDefaultProps } from './CanvasOuter.default';
export interface ICanvasWrapperProps {
    config: IConfig;
    position: {
        x: number;
        y: number;
    };
    zoom: IZoom;
    onCanvasKeyCommand: IOnCanvasKeyCommand;
    onZoomCanvas: IOnZoomCanvas;
    onDragCanvas: IOnDragCanvas;
    onDeleteKey: IOnDeleteKey;
    onCanvasClick: IOnCanvasClick;
    onCanvasDrop: IOnCanvasDrop;
    ComponentInner: React.FunctionComponent<ICanvasInnerDefaultProps>;
    ComponentOuter: React.FunctionComponent<ICanvasOuterDefaultProps>;
    onSizeChange: (x: number, y: number) => void;
    children: any;
}
interface IState {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    disableSelection: boolean;
}
export declare class CanvasWrapper extends React.Component<ICanvasWrapperProps, IState> {
    state: {
        width: number;
        height: number;
        offsetX: number;
        offsetY: number;
        disableSelection: boolean;
    };
    private ref;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element | IOnZoomCanvas;
    private updateSize;
}
export {};
