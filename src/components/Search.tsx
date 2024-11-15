import React, {ChangeEvent, Dispatch} from "react";

export interface SearchProps {
    searchString: string,
    setSearchString: Dispatch<React.SetStateAction<string>>
}

function Search(props: SearchProps) {
    const searchForItem = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value
        props.setSearchString(newSearchTerm)
    }
    return (
        <>
            <input type={"text"} value={props.searchString} onChange={searchForItem} />
        </>
    )
}




export default Search