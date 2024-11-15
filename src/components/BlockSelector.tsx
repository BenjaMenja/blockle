import * as Blocks from "../data/Blocks";
import Block, {BlockType, Position} from "./Block";
import {Button} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {VersionToNumber} from "../util";

export interface BlockSelectorProps {
    searchString: string,
    selectedBlock: BlockType,
    setSelectedBlock: React.Dispatch<React.SetStateAction<BlockType>>
}

function BlockSelector(props: BlockSelectorProps) {

    const blocks = Object.values(Blocks) as BlockType[]
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipPos, setTooltipPos] = useState<Position>({x: 0, y: 0})
    const [searchArray, setSearchArray] = useState<string[]>([])
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

    function blockFilter(blocks: BlockType[], filters: string[]): BlockType[] {
        if (searchArray[0] === '') return blocks
        let filteredBlocks: BlockType[] = blocks
        for (const param of filters) {
            filteredBlocks = filteredBlocks.filter((block, index) => {
                    const delims: RegExpMatchArray | null = param.match(/[=<>]/)
                    if (delims) {
                        const split: string[] = param.split(/[=<>]/, 2)
                        const key: string = split[0]
                        const value: string = split[1]
                        if (key in block) {
                            const blockFieldValue = block[key as keyof BlockType]
                            if (typeof blockFieldValue === 'string') { // Name, Technically Image, Tool, Color, Version
                                if (key === "version") {
                                    if (delims[0] === "=") {
                                        return blockFieldValue === value
                                    }
                                    let versionAsNumber: number = VersionToNumber(blockFieldValue)

                                    if (isNaN(versionAsNumber)) {
                                        return false
                                    }
                                    else {
                                        let valueAsNumber: number = VersionToNumber(value)

                                        if (delims[0] === ">") {
                                            return versionAsNumber > valueAsNumber
                                        }
                                        else if (delims[0] === "<") {
                                            return versionAsNumber > valueAsNumber
                                        }
                                    }
                                }
                                else if (delims[0] === "=") {
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
                    return block.name.includes(param)
                }
            )
        }
        return filteredBlocks
    }

    useEffect(() => {
        const searchSplit: string[] = props.searchString.split(" ")
        setSearchArray(searchSplit)
    }, [props.searchString])

    return (
        <>
            <div className="block-scroll" ref={containerRef}>
                {blockFilter(blocks, searchArray).map((block,index) => <Button className={`block-button ${props.selectedBlock.name === block.name ? 'selected' : ''}`} onClick={(e) => selectBlock(e, block.name)} onMouseMove={handleMouseMove} key={index}>
                    <Block block={block} position={tooltipPos}/>
                </Button>)}
            </div>
        </>
    )
}
export default BlockSelector