import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(props.tenzies);
    const [bestTime, setBestTime] = useState(
        JSON.parse(localStorage.getItem("bestTime")) || "none"
    )
    const [lastTime, setLastTime] = useState("none")

    useEffect(() => {
        if (props.tenzies === false) {
            setRunning(true);
        } else if (props.tenzies === true) {
            setRunning(false);
            if (time < bestTime || bestTime === "none") {
                setBestTime(time);
            }
        } else {
            setRunning(false);
        }
    }, [props]);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10)
        } else if (!running) {
            clearInterval(interval);
            setLastTime(time);
            setTime(0);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        localStorage.setItem("bestTime", JSON.stringify(bestTime));
    }, [bestTime]);

    return (
        <div className="stopwatch-container">
            <div className="stopwatch">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>

            <p>Last time: 
                <span className="span-gap">
                    <span>{("0" + Math.floor((lastTime / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((lastTime / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + ((lastTime / 10) % 100)).slice(-2)}</span>
                </span>
            </p>

            <p>Best time:
                 <span className="span-gap">
                    <span>{("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
                </span>
            </p>
        </div>
    )
}
