import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(props.tenzies);
    const [bestTime, setBestTime] = useState(
        JSON.parse(localStorage.getItem("bestTime")) || "none"
    )

    useEffect(() => {
        if (props.tenzies === false) {
            setRunning(true);
        } else if (props.tenzies === true) {
            setRunning(false);
            if ((time > 0 || bestTime === "none") && time < bestTime) {
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
