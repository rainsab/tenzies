import React from "react";

export default function NewGame(props) {
    return (
        <button className="roll-dice" onClick={() => props.button()}>New Game</button>
    )
}
