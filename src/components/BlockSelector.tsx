import * as Blocks from "../data/Blocks";
import Block, {BlockType, Position} from "./Block";
import {Button} from "react-bootstrap";
import React, {useRef, useState} from "react";

export interface BlockSelectorProps {
    searchString: string,
    selectedBlock: BlockType,
    setSelectedBlock: React.Dispatch<React.SetStateAction<BlockType>>
}

function BlockSelector(props: BlockSelectorProps) {

    const blocks = Object.values(Blocks) as BlockType[]
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<Position>({x: 0, y: 0})
    function selectBlock(event: React.MouseEvent<HTMLElement>, blockName: string) {
        for (const block of blocks) {
            if (block.name === blockName) {
                props.setSelectedBlock(block)
            }
        }
    }

    function handleMouseMove(e: any) {
        if (containerRef.current) {
            const pos: Position = {
                x: e.clientX,
                y: e.clientY
            }
            setTooltipPos(pos)
        }
    }

    return (
        <>
            <div className="block-scroll" ref={containerRef}>
                {blocks.filter((block, index) => {
                    const delims: RegExpMatchArray | null = props.searchString.match(/[=<>]/)
                        if (delims) {
                            const split: string[] = props.searchString.split(/[=<>]/, 2)
                            const key: string = split[0]
                            const value: string = split[1]
                            if (key in block) {
                                const blockFieldValue = block[key as keyof BlockType]
                                if (typeof blockFieldValue === 'string') { // Name, Technically Image, Tool, Version
                                    if (delims[0] === "=") {
                                        return blockFieldValue === value
                                    }
                                }
                                else { // Hardness, Blast Resistance
                                    const valueAsNumber = parseFloat(value)
                                    if (delims[0] === "=") {
                                        return blockFieldValue === valueAsNumber
                                    }
                                    else if (delims[0] === ">") {
                                        return blockFieldValue > valueAsNumber
                                    }
                                    else if (delims[0] === "<") {
                                        return blockFieldValue < valueAsNumber
                                    }
                                }
                            }
                        }
                        return block.name.includes(props.searchString)
                    }
                ).map((block,index) => <Button className={`block-button ${props.selectedBlock.name === block.name ? 'selected' : ''}`} onClick={(e) => selectBlock(e, block.name)} onMouseMove={handleMouseMove} key={index}>
                    <Block block={block} position={tooltipPos}/>
                </Button>)}
            </div>
        </>
    )
}
export default BlockSelector