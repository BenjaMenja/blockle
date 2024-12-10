import {BlockType} from "./Block";
import React, {useEffect, useRef, useState} from "react";

export interface GuessResult {
    block: BlockType,
    hardness: Comparison,
    blast_resistance: Comparison,
    tool: boolean,
    version: Comparison,
    color: boolean
}

export enum Comparison {
    GREATER = ">",
    LESS = "<",
    EQUAL = ""
}

function GuessResultComponent(guess: GuessResult) {
    const [enableTooltip, setEnableTooltip] = useState<boolean>(false)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const handleMouseEnter = () => {
        setEnableTooltip(true)
        setTooltipPos()
    }

    const setTooltipPos = () => {
        const tooltip = tooltipRef.current
        if (tooltip) {
            const tooltipRect = tooltip.getBoundingClientRect()
            const trigger = imageRef.current
            if (trigger) {
                const triggerRect = trigger.getBoundingClientRect()
                tooltip.style.top = `${triggerRect.top - (tooltipRect.height / 4) + window.scrollY}px`
                tooltip.style.left = `${triggerRect.left - tooltipRect.width - 10}px`
            }
        }
    }
    useEffect(() => {
        setTooltipPos()
    }, [])
    return (
        <table className={"guess-result"}>
            <tbody>
                <tr>
                    <td>
                        <img ref={imageRef} src={guess.block?.image} alt={"Guessed Block"} style={{width: "25%"}} onMouseEnter={handleMouseEnter} onMouseLeave={() => setEnableTooltip(false)}/>
                        <div ref={tooltipRef} className={"block-tooltip"} style={{position: "absolute", visibility: enableTooltip ? "visible" : "hidden", marginLeft: "0px"}}>
                            <span>{guess.block.name}</span>
                            <span>Hardness: {guess.block.hardness}</span>
                            <span>Blast Resistance: {guess.block.blast_resistance}</span>
                            <span>Tool: {guess.block.tool}</span>
                            <span>Version: {guess.block.version}</span>
                            <span>Color: {guess.block.color}</span>
                        </div>
                    </td>
                    <td>
                        {guess.hardness === Comparison.GREATER && <GreaterIcon />}
                        {guess.hardness === Comparison.LESS && <LesserIcon /> }
                        {guess.hardness === Comparison.EQUAL && <CheckIcon /> }
                    </td>
                    <td>
                        {guess.blast_resistance === Comparison.GREATER && <GreaterIcon />}
                        {guess.blast_resistance === Comparison.LESS && <LesserIcon /> }
                        {guess.blast_resistance === Comparison.EQUAL && <CheckIcon /> }
                    </td>
                    <td>
                        {guess.tool ? <CheckIcon /> : <XIcon />}
                    </td>
                    <td>
                        {guess.version === Comparison.GREATER && <GreaterIcon />}
                        {guess.version === Comparison.LESS && <LesserIcon /> }
                        {guess.version === Comparison.EQUAL && <CheckIcon /> }
                    </td>
                    <td>
                        {guess.color ? <CheckIcon /> : <XIcon />}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function GreaterIcon() {
    return <i className={"bi bi-arrow-up-circle-fill"} style={{color: "#2e7bc7"}}></i>
}

function LesserIcon() {
    return <i className={"bi bi-arrow-down-circle-fill"} style={{color: "#2e7bc7"}}></i>
}

function CheckIcon() {
    return<i className={"bi bi-check-circle-fill"} style={{color: "green"}}></i>
}

function XIcon() {
    return <i className={"bi bi-x-circle-fill"} style={{color: "red"}}></i>
}

export default GuessResultComponent