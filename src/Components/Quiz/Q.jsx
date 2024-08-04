import React, { useRef, useState } from 'react'
import "./Quiz.css"
import Data from '../Assets/Data'

const Q = () => {

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(Data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);


  let opt1 = useRef(null);
  let opt2 = useRef(null);
  let opt3 = useRef(null);
  let opt4 = useRef(null);

  let optArr = [opt1, opt2, opt3, opt4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optArr[question.ans - 1].current.classList.add("correct");
      }
    }

  }

  const next = () => {
    if (lock === true) {
      if (index === Data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(Data[index]);
      setLock(false);
      optArr.map((opt) => {
        opt.current.classList.remove("wrong");
        opt.current.classList.remove("correct");
        return null;
      })
    }
  }

  const reset = ()=>{
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <>
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? <></> : <><h2>{index + 1}. {question.question}</h2>

        <ul>
          <li ref={opt1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
          <li ref={opt2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
          <li ref={opt3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
          <li ref={opt4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index + 1} of {Data.length} Questions</div></>}

        {result ? <><h2>Your score {score} out of {Data.length}</h2>
        <button onClick={reset}>Reset</button></> : <></>}
    </div>
    <p className='text'>Created With ❤️ By Puspalal</p>
    </>
  )
}

export default Q
