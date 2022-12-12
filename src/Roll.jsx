import React from "react";

export default function Roll(props) {
    return (
        <button className="roll-dice" onClick={() => props.button()}>Roll</button>
    )
}
