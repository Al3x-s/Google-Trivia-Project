import React, { useState } from "react";
import questionData from "./db.jsx";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//creating color themes for the MUI buttons
// DOC : https://mui.com/customization/palette/#adding-new-colors
const theme = createTheme({
  status: {
    //use when debugging
    danger: "#e53e3e"
  },
  palette: {
    primary: {
      // Blue
      main: "#4285F4"
    },
    secondary: {
      //Red
      main: "#DB4437"
    },
    neutral: {
      //Yellow
      main: "#F4B400"
    },
    last: {
      //green
      main: "#0F9D58"
    }
  }
});

export const TestConst = (props) => {
  //show hiddenscreen
  const [showDEBUG, updateShowDEBUG] = useState(false);
  //show trivia project page
  const [showInfo, updateShowInfo] = useState(false);
  // keep arraycount for parsing through the db.jsx file
  const [keepCount, SetCount] = useState(0);
  // state var for rule box or alert
  const [showrule, updateShowRule] = useState(true);
  //statevar for the render value of the endgame panel
  const [showend, updateShowEnd] = useState(false);
  // state var for displaying the trivia test
  const [showtest, updateShowTest] = useState(true);
  //function to increase count for onclick of an answer choice
  const nextQuestion = () => {
    //check to see if last question is projected
    if (keepCount === questionData.length - 1) {
      return;
    }
    SetCount(keepCount + 1);
  };
  //state var for amount correct
  const [Correct, Setcorrect] = useState(0);
  //checks the questions bool value in dbjsx file and increases if choice === right
  function Increase(questBOOL) {
    if (questBOOL === true) {
      Setcorrect(Correct + 1);
    }
  }
  //function to stop the rendering of the trivia test
  function Checkend() {
    if (keepCount === questionData.length - 1) {
      updateShowTest(false);
      updateShowEnd(true);
    }
  }
  function refresh() {
    window.location.reload();
  }
  //conditionals for onclick of trivia project
  function dispInfo() {
    if (showInfo === false && showend === true) {
      updateShowDEBUG(true);
      updateShowEnd(false);
      setTimeout(function () {
        window.location.reload();
      }, 4000);
    } else if (showInfo === false) {
      updateShowInfo(true);
      updateShowRule(false);
      updateShowTest(false);
      console.log("first IF ran");
    } else if (showInfo === true) {
      updateShowInfo(false);
      updateShowRule(true);
      updateShowTest(true);
      console.log("second IF ran");
    }
  }
  return (
    <div className="content">
      <h1 className="titleContainer">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#DB4437" }}>O</span>
        <span style={{ color: "#F4B400" }}>O</span>
        <span style={{ color: "#0F9D58" }}>G</span>
        <span style={{ color: "#4285F4" }}>L</span>
        <span style={{ color: "#DB4437" }}>E</span>
        {/*nbsp = white space in jsx  */}
        &nbsp;
        <span
          onClick={() => {
            dispInfo();
          }}
        >
          {" "}
          Trivia Project{" "}
        </span>
      </h1>
      {/*-----------------------RED ALERT CONTAINER-------------------------------------*/}
      {showrule ? (
        <div className="rulecont">
          <ul className="ruleList">
            <li>
              Made by{" "}
              <a
                href="https://github.com/Al3x-s"
                target="_blank_"
                className="xx"
              >
                {" "}
                Alex S
              </a>{" "}
              and{" "}
              <a href="https://github.com/a-k-s" target="_blank_">
                Anton S
              </a>
            </li>
            <br></br>
            <li>Click on our names to check out our github accounts</li>
            <li>or click on the top right X to close out of this pop-up</li>
            <li> or click 'Trivia Project' ¯\_(ツ)_/¯</li>
          </ul>
          <span className="closebtn" onClick={() => updateShowRule(false)}>
            &times;
          </span>
        </div>
      ) : null}
      {/*-----------------------------TEST CONTENT-------------------------------------*/}
      {showtest ? (
        <div className="showDisp">
          <div className="countAndquestion">
            <div className="QuestWithVar">Question: {keepCount + 1} &nbsp;</div>
            <div className="currentQuestion">
              {questionData[keepCount].question.text}
            </div>
          </div>
          <div className="buttonContainer">
            {questionData[keepCount].question.choices.map((q1) => (
              <ThemeProvider theme={theme} key={questionData[keepCount]}>
                <Button
                  className="muibutton"
                  color={q1[2].color}
                  variant={q1[1].variant}
                  onClick={() => {
                    Increase(q1[3]);
                    nextQuestion();
                    Checkend();
                  }}
                >
                  {q1[0]}
                </Button>
              </ThemeProvider>
            ))}
          </div>
        </div>
      ) : null}
      {/*-------------------------SHOW END SCREEN--------------------------------------*/}
      {showend ? (
        <div className="endContainer">
          <div className="endGameHeader">
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#DB4437" }}>A</span>
            <span style={{ color: "#F4B400" }}>M</span>
            <span style={{ color: "#0F9D58" }}>E</span>
            &nbsp;
            <span style={{ color: "#4285F4" }}>O</span>
            <span style={{ color: "#DB4437" }}>V</span>
            <span style={{ color: "#4285F4" }}>E</span>
            <span style={{ color: "#F4B400" }}>R</span>
          </div>
          <div className="amountCorrect">
            {" "}
            You Got {Correct} out of {questionData.length} questions Correct
          </div>
          <Button
            className="tryAgain"
            onClick={() => {
              refresh();
            }}
            size="large"
          >
            {" "}
            Try Again{" "}
          </Button>
        </div>
      ) : null}
      {/*-----------------------SHOW TRIVIA PROJECT SCREEN-------------------------------*/}
      {showInfo ? (
        <div className="infoCont">
          <p>
            {" "}
            This app uses the Material UI Library for the buttons and for some
            container customization options
          </p>
          <h4>Feel free to resize the page</h4>
          <p>The site is optimized for desktop, tablet, and mobile users</p>
          <p>Click on 'trivia project' to go back to the main screen</p>
        </div>
      ) : null}
      {/*--------------------------SECRET DEBUG SCREEN-------------------------------------*/}
      {showDEBUG ? (
        <div>
          <h1> Trying to bug my code?</h1>
          <h1> 1 step ahead of you </h1>
          <CircularProgress />
        </div>
      ) : null}
    </div>
  );
};
//done
export default TestConst;
