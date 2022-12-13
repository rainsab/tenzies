import React from "react";

export default function NewGame(props) {
    return (
        <button className="button" onClick={() => props.button()}>New Game</button>
    )
}
