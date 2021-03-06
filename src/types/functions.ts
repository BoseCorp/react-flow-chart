import { DraggableEvent, DraggableData } from 'react-draggable'
import { INode, IPort } from './chart'
import { IConfig } from './config'
import { IOffset, IPosition, ISize } from './generics'

export type IOnDragNode = (input: { config?: IConfig, event: DraggableEvent, data: DraggableData, id: string }) => void

export type IOnDragStop = (input: { config?: IConfig, event: DraggableEvent, data: DraggableData, id: string }) => void

export type IOnZoomCanvas = (input: { config?: IConfig, data: any }) => void

export type IOnDragCanvas = (input: { config?: IConfig, data: any }) => void

export type IOnCanvasKeyCommand = (input: { config?: IConfig, keyCode: number }) => void

export type IOnPortPositionChange = (input: { config?: IConfig, node: INode, port: IPort, el: HTMLDivElement, nodesEl: HTMLDivElement | IOffset }) => void

export interface IOnLinkBaseEvent {
  config?: IConfig
  linkId: string,
  startEvent: React.MouseEvent,
  fromNodeId: string,
  fromPortId: string
}

export type IOnLinkStart = (input: IOnLinkBaseEvent) => void

export interface IOnLinkMoveInput extends IOnLinkBaseEvent {
  toPosition: {
    x: number,
    y: number,
  }
}
export type IOnLinkMove = (input: IOnLinkMoveInput) => void

export type IOnLinkCancel = (input: IOnLinkBaseEvent) => void

export interface IOnLinkCompleteInput extends IOnLinkBaseEvent {
  toNodeId: string,
  toPortId: string
}
export type IOnLinkComplete = (input: IOnLinkCompleteInput) => void

export type IOnPortMouseEnter = (input: { config?: IConfig, port: IPort, node: INode, isHovering: boolean }) => void

export type IOnLinkMouseEnter = (input: { config?: IConfig, linkId: string }) => void

export type IOnLinkMouseLeave = (input: { config?: IConfig, linkId: string }) => void

export type IOnLinkClick = (input: { config?: IConfig, linkId: string }) => void

export type IOnCanvasClick = (input: { config?: IConfig }) => void

export type IOnDeleteKey = (input: { config?: IConfig }) => void

export type IOnNodeClick = (input: { config?: IConfig, nodeId: string }) => void

export type IOnNodeSizeChange = (input: { config?: IConfig, nodeId: string, size: ISize }) => void

export type IOnCanvasDrop = (input: { config?: IConfig, data: any, position: IPosition }) => void