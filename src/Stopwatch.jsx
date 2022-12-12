import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
    const [running, setRunning] = useState(props.tenzies);
    const [bestTime, setBestTime] = useState(
        JSON.parse(localStorage.getItem("bestTime")) || Infinity
    )

    useEffect(() => {
        if (props.tenzies === false) {
            setRunning(true);
        } else if (props.tenzies === true) {
            setRunning(false);
            if (props.time < bestTime && props.time > 0) {
                setBestTime(props.time);
            }
        } else {
            setRunning(false);
        }
    }, [props]);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => props.runTime(), 10);
        } else if (!running) {
            clearInterval(interval);
            props.showTime();
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        localStorage.setItem("bestTime", JSON.stringify(bestTime));
    }, [bestTime]);

    return (
        <div className="stopwatch-container">
            <div className="stopwatch">
                <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((props.time / 10) % 100)).slice(-2)}</span>
            </div>

            <p>Best time:
                {bestTime === Infinity ?
                    <span className="span-gap">not played yet</span>
                    :
                    <span className="span-gap">
                        <span>{("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
                    </span>
                }
            </p>
        </div>
    )
}
