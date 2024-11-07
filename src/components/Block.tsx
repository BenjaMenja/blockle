import React, {useState} from "react";
import BlockTooltip, {TooltipProps} from "./BlockTooltip";
import ReactDOM from "react-dom"

export interface BlockType {
    name: string,
    image: string,
    hardness: number,
    blast_resistance: number,
    tool: string,
    version: string,
    color: string
}

export interface Position {
    x: number,
    y: number
}

function Block(props: TooltipProps) {
    const [enableTooltip, setEnableTooltip] = useState<boolean>(false)
    const displayName = formatName(props.block.name)
    function formatName(name: string): string {
        if (name.includes("_")) {
            const namesplit: string[] = name.split("_")
            const formattedArray = namesplit.map((segment) => {
                return segment[0].toUpperCase() + segment.substring(1)
            })
            return formattedArray.join(" ")
        }
        return name[0].toUpperCase() + name.substring(1)
    }
    return (
        <div style={{display: "flex", flexDirection: "row"}} onMouseEnter={() => setEnableTooltip(true)} onMouseLeave={() => setEnableTooltip(false)}>
            <img src={props.block.image} alt={props.block.name} style={{width: "40px", height: "auto"}}/>
            <span style={{alignSelf: "center", marginLeft: "1em"}}>{displayName}</span>
            {enableTooltip && ReactDOM.createPortal(<BlockTooltip position={props.position} block={props.block}/>, document.body)}
        </div>
    )
}

export default Block