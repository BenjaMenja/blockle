import React, {useEffect, useState} from 'react';
import * as Blocks from "./data/Blocks";
import './App.css';
import Guesser from "./components/Guesser";
import GuessResultComponent, {GuessResult} from "./components/GuessResult";
import {BlockType} from "./components/Block";
import {Button} from "react-bootstrap";

function App() {
    const blocks = Object.values(Blocks) as BlockType[]
    const [targetBlock, setTargetBlock] = useState<BlockType>(chooseTarget())
    const [guesses, setGuesses] = useState<GuessResult[]>([])
    const [win, setWin] = useState<boolean>(false)

    useEffect(() => {
        for (const guess of guesses) {
            if (guess.block.name === targetBlock.name) {
                setWin(true)
            }
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
        setWin(false)
        setGuesses([])
        setTargetBlock(chooseTarget())
    }
  return (
      <div className="App">
          <header className="App-header">
              Blockle
              <Guesser guesses={guesses} setGuesses={setGuesses} targetBlock={targetBlock} win={win}/>
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
              {win && <div className={"new-game"}>
                  <Button variant={"primary"} onClick={handleNewGame}>Start New Game</Button>
              </div>}
          </header>
      </div>
  );
}

export default App;
