import { isEqual } from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import {
  IConfig, ILink, INode, IOnLinkCancel, IOnLinkComplete, IOnLinkMove,
  IOnLinkStart, IOnPortPositionChange, IPort, IPosition, ISelectedOrHovered, IOnPortMouseEnter,
} from '../../'
import CanvasContext from '../Canvas/CanvasContext'
import { IPortDefaultProps, PortDefault } from './Port.default'

/** Construct the composed path by traversing parentElements */
const composedPath = (el: HTMLElement | null) => {
  const path: HTMLElement[] = []
  while (el) {
    path.push(el)
    el = el.parentElement
  }
  return path
}

export interface IPortWrapperProps {
  config: IConfig
  style?: object
  offset: IPosition
  selected: ISelectedOrHovered | undefined
  hovered: ISelectedOrHovered | undefined
  selectedLink: ILink | undefined
  hoveredLink: ILink | undefined
  port: IPort
  node: INode
  onPortPositionChange: IOnPortPositionChange
  Component: React.FunctionComponent<IPortDefaultProps>

  // Link handlers
  onLinkStart: IOnLinkStart
  onLinkMove: IOnLinkMove
  onLinkCancel: IOnLinkCancel
  onLinkComplete: IOnLinkComplete
  onPortEnter: IOnPortMouseEnter
}

export class PortWrapper extends React.Component<IPortWrapperProps> {

  public static contextType = CanvasContext
  public context!: React.ContextType<typeof CanvasContext>

  private nodeRef = React.createRef<HTMLDivElement>()

  public componentDidUpdate (prevProps: IPortWrapperProps) {
    // Update port position after a re-render if node.size has changed
    if (!isEqual(this.props.node.size, prevProps.node.size)) {
      const el = ReactDOM.findDOMNode(this.nodeRef.current) as HTMLInputElement
      if (el) {
        // Ports component should be positions absolute
        // Factor this in so we get position relative to the node
        const nodesEl = el.parentElement
          ? el.parentElement
          : { offsetLeft: 0, offsetTop: 0 }
        // update port position after node size has been determined
        this.props.onPortPositionChange({ config: this.props.config, node: this.props.node, port: this.props.port, el, nodesEl })
      }
    }
  }

  public onMouseDown = (startEvent: React.MouseEvent) => {
    const { offset, node, port, onLinkStart, onLinkCancel, onLinkComplete, onLinkMove, config, hovered } = this.props

    let linkId = v4()
    let fromNodeId = node.id
    let fromPortId = port.id

    if (config.getPortInfo) {
      const portInfo = config.getPortInfo({ fromNodeId, fromPortId, hovered })
      if (!portInfo.isPortValid) {
        startEvent.preventDefault()
        startEvent.stopPropagation()
        return
      }
      if (portInfo.linkId) linkId = portInfo.linkId
      if (portInfo.fromNodeId) fromNodeId = portInfo.fromNodeId
      if (portInfo.fromPortId) fromPortId = portInfo.fromPortId
    }

    // Create the move handler
    // This will update the position as the mouse moves
    const mouseMoveHandler = (e: MouseEvent) => {
      const { offsetX, offsetY, zoomScale } = this.context

      onLinkMove({
        config,
        linkId, startEvent, fromNodeId, fromPortId,
        toPosition: {
          x: (e.clientX - offsetX - offset.x) / zoomScale,
          y: (e.clientY - offsetY - offset.y) / zoomScale,
        },
      })

      // onLinkMove({
      //   config,
      //   linkId, startEvent, fromNodeId, fromPortId,
      //   toPosition: {
      //     x: ((e.clientX / zoomScale) - (offsetX / zoomScale) - offset.x),
      //     y: ((e.clientY / zoomScale) - (offsetY / zoomScale) - offset.y),
      //   },
      // })
    }

    // Create and bind the mouse up handler
    // This is used to check if the link is complete or cancelled
    const mouseUpHandler = (e: MouseEvent) => {

      // We traverse up the event path until we find an element with 'data-port-id' and data-node-id'
      // e.toElement cannot be used because it may be a child element of the port
      const path = composedPath(e.target as HTMLElement)
      const portEl = path.find((el) => {
        const toPortId = el.getAttribute && el.getAttribute('data-port-id')
        const toNodeId = el.getAttribute && el.getAttribute('data-node-id')
        return !!(toPortId && toNodeId)
      })

      // If both node-id and port-id are defined as data attributes, we are mouse-upping
      // on another port. Run the success handler
      if (portEl) {
        const toPortId = portEl.getAttribute('data-port-id') as string
        const toNodeId = portEl.getAttribute('data-node-id') as string
        onLinkComplete({ config, linkId, startEvent, fromNodeId, fromPortId, toNodeId, toPortId })
      } else {
        onLinkCancel({ config, linkId, startEvent, fromNodeId, fromPortId })
      }

      // Remove the listeners if the link is complete or canceled
      window.removeEventListener('mouseup', mouseUpHandler, false)
      window.removeEventListener('mousemove', mouseMoveHandler, false)
    }

    // Add listeners
    window.addEventListener('mouseup', mouseUpHandler, false)
    window.addEventListener('mousemove', mouseMoveHandler, false)

    // Notify state of link start
    onLinkStart({ config, linkId, startEvent, fromNodeId, fromPortId })

    // Prevent default and stop propagation to prevent text selection
    startEvent.preventDefault()
    startEvent.stopPropagation()
  }

  public onMouseOver = (startEvent: React.MouseEvent) => {
    const { config, node, port, onPortEnter } = this.props

    // Notify state of link start
    onPortEnter({ config, node, port, isHovering: true })

    // Prevent default and stop propagation to prevent text selection
    startEvent.preventDefault()
    startEvent.stopPropagation()
  }

  public onMouseOut = (startEvent: React.MouseEvent) => {
    const { config, node, port, onPortEnter } = this.props

    // Notify state of link start
    onPortEnter({ config, node, port, isHovering: false })

    // Prevent default and stop propagation to prevent text selection
    startEvent.preventDefault()
    startEvent.stopPropagation()
  }

  public onMouseDownCatch = () => {
    console.log(':: Art wears women clothes! ::')
  }

  public render () {
    const {
      selected,
      selectedLink,
      hovered,
      hoveredLink,
      style,
      port,
      node,
      Component = PortDefault,
      config,
    } = this.props
    
    return (
      <div
        data-port-id={port.id}
        data-node-id={node.id}
        onMouseDown={(!config.propagatePortClick) ? this.onMouseDown : this.onMouseDownCatch}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        ref={this.nodeRef}
        style={style}
      >
        <Component
          config={config}
          node={node}
          port={port}
          context={this.context}
          onMouseDown={(config.propagatePortClick) ? this.onMouseDown : this.onMouseDownCatch}
          isNodeSelected={!!selected && selected.type === 'node' && selected.id === node.id}
          isSelected={!!selected && selected.type === 'port' && selected.id === port.id}
          isHovered={!!hovered && hovered.type === 'port' && hovered.id === port.id && hovered.nodeId === node.id}
          isLinkSelected={ selectedLink
            ? ((selectedLink.from.portId === port.id && selectedLink.from.nodeId === node.id) ||
               (selectedLink.to.portId === port.id && selectedLink.to.nodeId === node.id))
            : false
          }
          isLinkHovered={ hoveredLink
            ? ((hoveredLink.from.portId === port.id && hoveredLink.from.nodeId === node.id) ||
               (hoveredLink.to.portId === port.id && hoveredLink.to.nodeId === node.id))
            : false
          }
        />
      </div>
    )
  }
}