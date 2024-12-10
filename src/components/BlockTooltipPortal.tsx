import {BlockType, Position} from "./Block";
import React, {useRef} from "react";

export interface TooltipProps {
    block: BlockType,
    position: Position
}

function BlockTooltipPortal(props: TooltipProps) {
    const tooltipRef = useRef<HTMLDivElement>(null)
    return (
        <div ref={tooltipRef} className={"block-tooltip"} style={{position: "absolute", fontSize: '1rem', top: props.position ? `${props.position.y}px` : undefined, left:`${props.position.x}px`}}>
            <span>{props.block.name}</span>
            <span>Hardness: {props.block.hardness}</span>
            <span>Blast Resistance: {props.block.blast_resistance}</span>
            <span>Tool: {props.block.tool}</span>
            <span>Version: {props.block.version}</span>
            <span>Color: {props.block.color}</span>
        </div>
    )
}

export default BlockTooltipPortal