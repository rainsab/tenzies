import React from "react";

export default function Roll(props) {
    return (
        <button className="button" onClick={() => props.onButtonClick()}>Roll</button>
    )
}
