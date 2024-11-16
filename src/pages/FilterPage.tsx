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
                    x{'!'}y
                </div>
                Shows all blocks with attribute <span className={"attribute-option"}>x</span>that are not equal to <span className={"attribute-option"}>y</span>.<br/>
                <div className={"attribute-option"}>
                    x&gt;y
                </div>
                Shows all blocks whose attribute <span className={"attribute-option"}>x</span>is strictly greater than <span className={"attribute-option"}>y</span>.<br/>
                <div className={"attribute-option"}>
                    x{'<'}y
                </div>
                Shows all blocks whose attribute <span className={"attribute-option"}>x</span>is strictly less than <span className={"attribute-option"}>y</span>.<br/>
                Filters can be chained together with single spaces to further assist you in finding the block you need!<br/>
                Note: All attributes and values are case sensitive!
            </div>
            <h2>Attributes</h2>
            <table className={"attribute-table"}>
                <tbody>
                    <tr>
                        <td><b><u>Attribute</u></b></td>
                        <td><b><u>Description</u></b></td>
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
            <h2>Examples</h2>
            <ul style={{listStyleType: "none"}}>
                <li>
                    <div className={"attribute-option"}>tool=Axe</div>shows all blocks that are broken with an Axe.
                </li>
                <li>
                    <div className={"attribute-option"}>{"hardness>1 version>alpha"}</div>shows all blocks with hardness greater than 1 and that were released in versions newer than the game's alpha.
                </li>
                <li>
                    <div className={"attribute-option"}>{"stone version=1.8"}</div>shows all blocks with "stone" in the name that released in version 1.8.
                </li>
                <li>
                    <div className={"attribute-option"}>{"color!orange version<beta"}</div>shows all blocks that are not orange that were released in versions older than the game's beta.
                </li>
            </ul>
            <Button variant={"secondary"} onClick={() => window.location.href = "/blockle"}>
                Back to Game
            </Button>
        </div>
    )
}

export default FilterPage