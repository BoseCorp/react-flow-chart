import * as React from 'react'
import {
  CanvasInnerDefault, CanvasOuterDefault, CanvasWrapper, ICanvasInnerDefaultProps, ICanvasOuterDefaultProps, IChart, IConfig, ILink,
  ILinkDefaultProps, INodeDefaultProps, INodeInnerDefaultProps, IOnCanvasClick, IOnCanvasDrop, IOnDeleteKey, IOnZoomCanvas, IOnDragCanvas, IOnCanvasKeyCommand,
  IOnDragNode, IOnDragStop, IOnLinkCancel, IOnLinkClick, IOnLinkComplete, IOnLinkMouseEnter, IOnPortMouseEnter,
  IOnLinkMouseLeave, IOnLinkMove, IOnLinkStart, IOnNodeClick, IOnNodeSizeChange, IOnPortPositionChange, IPortDefaultProps,
  IPortsDefaultProps, ISelectedOrHovered, LinkDefault, LinkWrapper, NodeDefault, NodeInnerDefault, NodeWrapper, PortDefault, PortsDefault,
} from '../../'

export interface IFlowChartCallbacks {
  onDragNode: IOnDragNode
  onDragStop: IOnDragStop
  onDragCanvas: IOnDragCanvas
  onCanvasKeyCommand: IOnCanvasKeyCommand
  onZoomCanvas: IOnZoomCanvas
  onCanvasDrop: IOnCanvasDrop
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkComplete: IOnLinkComplete
  onLinkCancel: IOnLinkCancel
  onPortPositionChange: IOnPortPositionChange
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
  onCanvasClick: IOnCanvasClick
  onDeleteKey: IOnDeleteKey
  onNodeClick: IOnNodeClick
  onNodeSizeChange: IOnNodeSizeChange
  onPortEnter: IOnPortMouseEnter
}

export interface IFlowChartComponents {
  CanvasOuter?: React.FunctionComponent<ICanvasOuterDefaultProps>
  CanvasInner?: React.FunctionComponent<ICanvasInnerDefaultProps>
  NodeInner?: React.FunctionComponent<INodeInnerDefaultProps>
  Ports?: React.FunctionComponent<IPortsDefaultProps>
  Port?: React.FunctionComponent<IPortDefaultProps>
  Node?: React.FunctionComponent<INodeDefaultProps>
  Link?: React.FunctionComponent<ILinkDefaultProps>
}

export interface IFlowChartProps {
  /**
   * The current chart state
   */
  chart: IChart
  /**
   * Callbacks for updating chart state.
   * See container/actions.ts for example state mutations
   */
  callbacks: IFlowChartCallbacks
  /**
   * Custom components
   */
  Components?: IFlowChartComponents
  /**
   * Other config. This will be passed into all components and actions.
   * Don't store state here as it may trigger re-renders
   */
  config?: IConfig
}

export const FlowChart = (props: IFlowChartProps) => {
  // const [ canvasSize, setCanvasSize ] = React.useState<{ width: number, height: number }>({ width: 0, height: 0 })

  const {
    chart,
    callbacks: {
      onDragNode,
      onDragStop,
      onDragCanvas,
      onZoomCanvas,
      onCanvasKeyCommand,
      onCanvasDrop,
      onLinkStart,
      onLinkMove,
      onLinkComplete,
      onLinkCancel,
      onPortPositionChange,
      onLinkMouseEnter,
      onLinkMouseLeave,
      onLinkClick,
      onCanvasClick,
      onDeleteKey,
      onNodeClick,
      onNodeSizeChange,
      onPortEnter,
    },
    Components: {
      CanvasOuter = CanvasOuterDefault,
      CanvasInner = CanvasInnerDefault,
      NodeInner = NodeInnerDefault,
      Ports = PortsDefault,
      Port = PortDefault,
      Node = NodeDefault,
      Link = LinkDefault,
    } = {},
    config = {},
  } = props
  const { links, nodes, selected, hovered } = chart

  const canvasCallbacks = { onDragCanvas, onZoomCanvas, onCanvasClick, onDeleteKey, onCanvasDrop, onCanvasKeyCommand }
  const linkCallbacks = { onLinkMouseEnter, onLinkMouseLeave, onLinkClick }
  const nodeCallbacks = { onDragNode, onDragStop, onNodeClick, onNodeSizeChange }
  const portCallbacks = { onPortPositionChange, onLinkStart, onLinkMove, onLinkComplete, onLinkCancel, onPortEnter }

  const nodesInView = Object.keys(nodes)
  const linksInView = Object.keys(links)

  return (
    <CanvasWrapper
      config={config}
      position={chart.offset}
      zoom={chart.zoom}
      ComponentInner={CanvasInner}
      ComponentOuter={CanvasOuter}
      onSizeChange={(width, height) => {}}
      // onSizeChange={(width, height) => setCanvasSize({ width, height })}
      {...canvasCallbacks}
    >
      { linksInView.map((linkId) => {
        const isSelected = selected.type === 'link' && selected.id === linkId
        const isHovered = hovered.type === 'link' && hovered.id === linkId
        const fromNodeId = links[linkId].from.nodeId
        const toNodeId = links[linkId].to.nodeId

        return (
          <LinkWrapper
            config={config}
            key={linkId}
            link={links[linkId]}
            Component={Link}
            isSelected={isSelected}
            isHovered={isHovered}
            fromNode={nodes[fromNodeId]}
            toNode={toNodeId ? nodes[toNodeId] : undefined}
            {...linkCallbacks}
          />
        )
      })}
      { nodesInView.map((nodeId) => {
        const isSelected = selected.type === 'node' && selected.id === nodeId
        const selectedLink = getSelectedLinkForNode(selected, nodeId, links)
        const hoveredLink = getSelectedLinkForNode(hovered, nodeId, links)

        let isHovered = undefined
        if (hoveredLink) {
          isHovered = hoveredLink
        } else if (hovered) {
          isHovered = hovered
        }

        return (
          <NodeWrapper
            config={config}
            key={nodeId}
            Component={Node}
            node={nodes[nodeId]}
            offset={chart.offset}
            isSelected={isSelected}
            selected={(selectedLink || isSelected) ? selected : undefined}
            hovered={isHovered}
            selectedLink={selectedLink}
            hoveredLink={hoveredLink}
            NodeInner={NodeInner}
            Ports={Ports}
            Port={Port}
            {...nodeCallbacks}
            {...portCallbacks}
          />
        )
      })
    }
    </CanvasWrapper>
  )
}

const getSelectedLinkForNode = (
  selected: ISelectedOrHovered,
  nodeId: string,
  links: IChart['links'],
): ILink | undefined => {
  const link = selected.type === 'link' && selected.id ? links[selected.id] : undefined

  if (link && (link.from.nodeId === nodeId || link.to.nodeId === nodeId)) {
    return link
  }

  return undefined
}