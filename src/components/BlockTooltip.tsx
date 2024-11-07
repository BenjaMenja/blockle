import {BlockType, Position} from "./Block";

export interface TooltipProps {
    block: BlockType,
    position?: Position
}

function BlockTooltip(props: TooltipProps) {
    return (
        <div className={"block-tooltip"} style={{position: "absolute", top: `${props.position?.y}px`, left:`${props.position?.x}px`}}>
            <span>{props.block.name}</span>
            <span>Hardness: {props.block.hardness}</span>
            <span>Blast Resistance: {props.block.blast_resistance}</span>
            <span>Tool: {props.block.tool}</span>
            <span>Version: {props.block.version}</span>
            <span>Color: {props.block.color}</span>
        </div>
    )
}

export default BlockTooltip