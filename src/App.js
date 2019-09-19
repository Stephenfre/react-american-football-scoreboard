//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(32);
  const [awayScore, setAwayScore] = useState(31);
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);

  const homeTeam = e => {
    setHomeScore(homeScore + 7);
  };
  const awayTeam = e => {
    setAwayScore(awayScore + 7);
  };

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds <= 0) {
          clearInterval(interval);
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // setTimeout(() => {
  //   setTimer(!timer)
  // } 1000);

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">
              <span>{homeScore}</span>
            </div>
          </div>
          <div className="timer">{seconds}s</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">
              <span>{awayScore}</span>
            </div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}

          <button
            className="homeButtons__touchdown"
            onClick={() => {
              setHomeScore(homeScore + 7);
            }}
          >
            Home Touchdown
          </button>

          <button
            className="homeButtons__fieldGoal"
            onClick={() => {
              setHomeScore(homeScore + 3);
            }}
          >
            Home Field Goal
          </button>
        </div>
        <div className="awayButtons">
          <button
            className="awayButtons__touchdown"
            onClick={() => {
              setAwayScore(awayScore + 7);
            }}
          >
            Away Touchdown
          </button>
          <button
            className="awayButtons__fieldGoal"
            onClick={() => {
              setAwayScore(awayScore + 3);
            }}
          >
            Away Field Goal
          </button>

          <button
            className="reset_button"
            onClick={() => {
              setHomeScore(32);
              setAwayScore(31);
              setSeconds(3);
              setIsActive(false);
            }}
          >
            Reset
          </button>
          <div className="start_button ">
            <button
              className={`button button-primary button-primary-${
                isActive ? "active" : "inactive"
              }`}
              onClick={toggle}
            >
              {isActive ? "Pause" : "Start"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
