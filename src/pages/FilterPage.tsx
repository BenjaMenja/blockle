import '../FilterGuide.css'
import {Button} from "react-bootstrap";

function FilterPage() {
    return (
        <div style={{maxWidth: "60%", fontSize: "0.9em"}}>
            <h1>Blockle Filter Guide</h1>
            <p style={{marginBottom: "5%"}}>Blockle introduces custom search options to help you search for blocks that fit a criteria!</p>
            <h2>How to use</h2>
            <div style={{marginBottom: "5%"}}>
                <div className={"attribute-option"}>
                    x=y
                </div>
                Shows all blocks with attribute <span className={"attribute-option"}>x</span>that are equal to <span className={"attribute-option"}>y</span>.<br/>
                <div className={"attribute-option"}>
                    x&gt;y
                </div>
                Shows all blocks whose attribute <span className={"attribute-option"}>x</span>is strictly greater than <span className={"attribute-option"}>y</span>.<br/>
                <div className={"attribute-option"}>
                    x{'<'}y
                </div>
                Shows all blocks whose attribute <span className={"attribute-option"}>x</span>is strictly less than <span className={"attribute-option"}>y</span>.<br/>
            </div>
            <h2>Attributes</h2>
            <table className={"attribute-table"}>
                <tbody>
                    <tr>
                        <td><b>Attribute</b></td>
                        <td><b>Description</b></td>
                    </tr>
                    <tr>
                        <td><span className={"attribute-option"}>hardness</span></td>
                        <td>The hardness of the block, used in determining the base amount of breaking time</td>
                    </tr>
                    <tr>
                        <td><span className={"attribute-option"}>blast_resistance</span></td>
                        <td>The blast resistance of the block</td>
                    </tr>
                    <tr>
                        <td><span className={"attribute-option"}>tool</span></td>
                        <td>
                            The preferred tool to break the block. Valid tools are <span className={"attribute-option"}>Shovel</span>,<span className={"attribute-option"}>Axe</span>,<span className={"attribute-option"}>Pickaxe</span>,
                            <span className={"attribute-option"}>Hoe</span>,<span className={"attribute-option"}>Shears</span>
                        </td>
                    </tr>
                    <tr>
                        <td><span className={"attribute-option"}>version</span></td>
                        <td>The version this block was added to the game. Valid versions are <span className={"attribute-option"}>alpha</span>,<span className={"attribute-option"}>beta</span><span className={"attribute-option"}>1.x.x</span>, where x is a value between 0-9</td>
                    </tr>
                    <tr>
                        <td><span className={"attribute-option"}>color</span></td>
                        <td>The color of the block. Hover over blocks in the selector to see the types of colors used.</td>
                    </tr>
                </tbody>
            </table>
            <Button variant={"secondary"} onClick={() => window.location.href = "/"}>
                Back to Game
            </Button>
        </div>
    )
}

export default FilterPage