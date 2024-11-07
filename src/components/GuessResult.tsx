import {BlockType} from "./Block";
import {useState} from "react";
import BlockTooltip from "./BlockTooltip";

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
    return (
        <table className={"guess-result"}>
            <tbody>
                <tr>
                    <td>
                        <img src={guess.block?.image} alt={"Guessed Block"} style={{width: "33%"}} onMouseEnter={() => setEnableTooltip(true)} onMouseLeave={() => setEnableTooltip(false)}/>
                        {enableTooltip && <BlockTooltip block={guess.block} />}
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