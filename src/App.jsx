import React, { useState } from 'react'
import Die from "./Die"

export default function App() {
  const [dice, setDice] = useState(newDiceGrid())

  //arrow function?
  function newDiceGrid() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(Math.ceil(Math.random() * 6)) //floor, ceil, etc.
      }
      return newDice
  }

  function rollDice() {
    setDice(newDiceGrid())
  }
  
  const diceElements = dice.map(die => <Die value={die} />)
  
  return (
      <main>
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>Roll</button>
      </main>
  )
}
