import React, { useState } from 'react'
import { nanoid } from "nanoid"
import Die from "./Die"

export default function App() {
    const [dice, setDice] = useState(newDiceGrid())

    //arrow function?
    function newDiceGrid() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6), //floor, ceil, etc.
                isHeld: false,
                id: nanoid()
            })
        }
        console.log(newDice)
        return newDice;
    }

    function rollDice() {
        setDice(newDiceGrid());
    }

    const diceElements = dice.map(die => <Die key={die.id} value={die.value} />)

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}
