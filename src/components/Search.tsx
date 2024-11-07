import React, {ChangeEvent, Dispatch} from "react";
import * as all_blocks from "../data/Blocks"
import {BlockType} from "./Block";

export interface SearchProps {
    searchString: string,
    setSearchString: Dispatch<React.SetStateAction<string>>
}

function Search(props: SearchProps) {
    const blocks = Object.values(all_blocks) as BlockType[]
    const searchForItem = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value
        props.setSearchString(newSearchTerm)
        blocks.forEach((block) => {
            if (block.name.includes(newSearchTerm)) {
                console.log("minecraft:" + block.name)
            }
        })
    }
    return (
        <>
            <input type={"text"} value={props.searchString} onChange={searchForItem} />
        </>
    )
}




export default Search