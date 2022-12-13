import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
    const [running, setRunning] = useState(false);
    const [bestTime, setBestTime] = useState(
        JSON.parse(localStorage.getItem("bestTime")) || Infinity
    )
    const [time, setTime] = useState(0);

    const runTime = () => {
        setTime((prevTime) => prevTime + 10);
    }

    const showTime = () => {
        setTime(time);
    }

    useEffect(() => {
        if (props.tenzies === false) {
            setRunning(true);
            setTime(0);
        } else {
            setRunning(false);
            if (time < bestTime && time > 0) {
                setBestTime(time);
            }
        }
    }, [props.tenzies]);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => runTime(), 10);
        } else if (!running) {
            clearInterval(interval);
            showTime();
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        localStorage.setItem("bestTime", JSON.stringify(bestTime));
    }, [bestTime]);

    return (
        <div className="text-center">
            <div className="stopwatch">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>

            <div>Best time:
                {bestTime === Infinity ?
                    <span className="span-gap">not played yet</span>
                    :
                    <span className="span-gap">
                        <span>{("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}.</span>
                        <span>{("0" + ((bestTime / 10) % 100)).slice(-2)}</span>
                    </span>
                }
            </div>
        </div>
    )
}
