import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div
            className="die-ui"
            style={styles}
            onClick={props.holdDice}
        >
            <span className="die-number">{props.value}</span>
        </div>
    )
}
