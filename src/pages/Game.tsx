import Guesser from "../components/Guesser";
import GuessResultComponent, {GuessResult} from "../components/GuessResult";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import * as Blocks from "../data/Blocks";
import {BlockType} from "../components/Block";
import {NameToDisplayFormat} from "../util";

export enum GameState {
    PLAYING,
    WIN,
    LOSE
}

function Game() {
    const maxGuesses = 6
    const blocks = Object.values(Blocks) as BlockType[]
    const [targetBlock, setTargetBlock] = useState<BlockType>(chooseTarget())
    const [guesses, setGuesses] = useState<GuessResult[]>([])
    const [gameState, setGameState] = useState<GameState>(GameState.PLAYING)
    const [remainingGuesses, setRemainingGuesses] = useState<number>(6)
    const [searchString, setSearchString] = useState<string>("")

    useEffect(() => {
        setRemainingGuesses(maxGuesses - guesses.length)
        for (const guess of guesses) {
            if (guess.block.name === targetBlock.name) {
                setGameState(GameState.WIN)
            }
        }
        if (guesses.length === maxGuesses && gameState !== GameState.WIN) {
            setGameState(GameState.LOSE)
        }
    }, [guesses])
    function nameToBlock(name: string): BlockType {
        return blocks.find((block) => {return block.name === name}) as BlockType
    }

    function chooseTarget() {
        const index = Math.floor(Math.random() * blocks.length)
        console.log("Target: ")
        console.log(blocks[index])
        return blocks[index] || null
    }

    function handleNewGame() {
        setGameState(GameState.PLAYING)
        setGuesses([])
        setTargetBlock(chooseTarget())
        setSearchString("")
    }
    return (
        <>
            <h1 style={{marginBottom: "2%", marginTop: "2%"}}>Blockle</h1>
            <h3 style={{marginBottom: "1%"}}>A Minecraft themed guessing game</h3>
            <a href={"/blockle/filters"} style={{color: "#7a29a9", fontSize: "0.8em", marginBottom: "1%"}}>Special Filters</a>
            <span>Guesses Remaining: {remainingGuesses} / {maxGuesses}</span>
            <Guesser guesses={guesses} setGuesses={setGuesses} targetBlock={targetBlock} gameState={gameState} searchString={searchString} setSearchString={setSearchString}/>
            {guesses.length > 0 && <table className={"guess-result"}>
                <tbody>
                <tr>
                    <td>
                        Block
                    </td>
                    <td>
                        Hardness
                    </td>
                    <td>
                        Blast Resistance
                    </td>
                    <td>
                        Tool
                    </td>
                    <td>
                        Version
                    </td>
                    <td>
                        Color
                    </td>
                </tr>
                </tbody>
            </table>}
            {guesses.map((guess, index) => <GuessResultComponent key={index} block={nameToBlock(guess.block.name)} hardness={guess.hardness} blast_resistance={guess.blast_resistance} tool={guess.tool} version={guess.version} color={guess.color}/>)}
            {gameState !== GameState.PLAYING && <div>
                <span>The block was: <img src={targetBlock.image} alt={targetBlock.name} style={{maxWidth: "10%"}}/>{NameToDisplayFormat(targetBlock.name)}</span>
            </div>}
            {gameState !== GameState.PLAYING && <div className={"new-game"}>
                <Button variant={"primary"} onClick={handleNewGame}>Start New Game</Button>
            </div>}
            <br/>
            <br/>
        </>
    )
}

export default Game