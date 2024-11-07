import Search from "./Search";
import BlockSelector from "./BlockSelector";
import React, {useEffect, useState} from "react";
import {BlockType} from "./Block";
import {Button} from "react-bootstrap";
import {Comparison, GuessResult} from "./GuessResult";

export interface GuesserProps {
    guesses: GuessResult[],
    setGuesses: React.Dispatch<React.SetStateAction<GuessResult[]>>,
    targetBlock: BlockType,
    win: boolean
}

function Guesser(props: GuesserProps) {
    const [searchString, setSearchString] = useState<string>("")
    const [selectedBlock, setSelectedBlock] = useState<BlockType>({
        blast_resistance: -1, hardness: -1, image: "", name: "", tool: "", version: "", color: ""
    })
    const [buttonActive, setButtonActive] = useState<string>("secondary")

    useEffect(() => {
        if (selectedBlock.name === "") {
            setButtonActive("secondary")
        }
        else {
            setButtonActive("primary")
        }
    }, [selectedBlock])

    function Guess(): void {
        if (selectedBlock.name === "") {
            return
        }
        const hardness: Comparison = Compare(selectedBlock.hardness, props.targetBlock.hardness)
        const blast_resistance: Comparison = Compare(selectedBlock.blast_resistance, props.targetBlock.blast_resistance)
        const tool: boolean = selectedBlock.tool === props.targetBlock.tool
        const version: Comparison = VersionCompare(selectedBlock.version, props.targetBlock.version)
        const color: boolean = ColorCompare(selectedBlock.color, props.targetBlock.color)
        const result: GuessResult = {
            blast_resistance: blast_resistance,
            block: selectedBlock,
            hardness: hardness,
            tool: tool,
            version: version,
            color: color
        }
        props.setGuesses([...props.guesses, result])
        setSelectedBlock({
            blast_resistance: -1, hardness: -1, image: "", name: "", tool: "", version: "", color: ""
        })
    }

    function Compare(guessValue: number, targetValue: number): Comparison {
        if (guessValue > targetValue) {
            return Comparison.LESS
        }
        else if (guessValue < targetValue) {
            return Comparison.GREATER
        }
        else {
            return Comparison.EQUAL
        }
    }

    function ColorCompare(guessColor: string, targetColor: string): boolean {
        return guessColor === targetColor
    }

    function VersionCompare(guessValue: string, targetValue: string): Comparison {
        const guessNumber: number = VersionToNumber(guessValue)
        const targetNumber: number = VersionToNumber(targetValue)
        if (guessNumber > targetNumber) {
            return Comparison.LESS
        }
        else if (guessNumber < targetNumber) {
            return Comparison.GREATER
        }
        else {
            return Comparison.EQUAL
        }
    }

    function VersionToNumber(version: string): number {
        if (version === "alpha") {
            return -2
        }
        else if (version === "beta") {
            return -1
        }
        else {
            return parseInt(version.split(".")[1])
        }
    }

    return (
        <div style={{marginBottom: "1%"}}>
            <div style={{display: "flex", flexDirection: "row", marginBottom: "1%"}}>
                <Search searchString={searchString} setSearchString={setSearchString}/>
                <Button onClick={() => Guess()} variant={`${buttonActive}`}>Submit</Button>
            </div>
            <BlockSelector searchString={searchString} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock}/>
        </div>
    )
}

export default Guesser