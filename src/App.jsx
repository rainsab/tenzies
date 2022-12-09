import React, { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Die from "./Die"

export default function App() {
    const newDiceGrid = () => {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.floor(Math.random() * 6) + 1, //array(10).fill().map()
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice;
    }
    
    const [dice, setDice] = useState(newDiceGrid());
    
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const allSameValue = dice.every(die => die.value === dice[0].value);

        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice])
    

    const generateNewDie = () => {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const button = () => {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie();
            }))
        } else {
            setTenzies(false);
            setDice(newDiceGrid());
        }
    }

    const holdDice = (id) => {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={button}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
