import React, { useState, useEffect } from 'react';
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Stopwatch from './components/Stopwatch';

export default function App() {
    const [clicks, setClicks] = useState(0);
    const [bestResult, setBestResult] = useState(
        JSON.parse(localStorage.getItem("bestResult")) || "none"
    )

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

    const firstDice = () => {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: 4,
                isHeld: true,
                id: nanoid()
            })
        }
        return newDice;
    }

    const [dice, setDice] = useState(firstDice());
    const [tenzies, setTenzies] = useState(false);
    

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const allSameValue = dice.every(die => die.value === dice[0].value);

        if (allHeld && allSameValue) {
            if ((bestResult === "none" || clicks < bestResult) && clicks > 0) {
                setBestResult(clicks);
            }
            setTenzies(true);
        }
    }, [dice]);

    useEffect(() => {
        localStorage.setItem("bestResult", JSON.stringify(bestResult));
    }, [bestResult]);

    const generateNewDie = () => {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const button = () => {
        if (!tenzies) {
            setClicks(clicks + 1);
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie();
            }))
        } else {
            setTenzies(false);
            setClicks(0);
            setDice(newDiceGrid());
        }
    }

    const holdDice = (id) => {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            <h1>Tenzies Game</h1>
            <p>Roll or hold by clicking on dice till you get all same</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="button" onClick={button}>
                {tenzies ? "New Game" : "Roll"}
            </button>
            <Stopwatch tenzies={tenzies} dice={dice} />
            <div className="text-center">
                <p>Rolls counter: {clicks}</p>
                <p>Best result: {bestResult}</p>
            </div>
        </main>
    )
}
