import React,{useState} from 'react';

const Statistics = ({good,neutral,bad}) => {

  if(good !== 0 || neutral!==0 || bad !== 0){
    const calTotal = () => good + bad + neutral
    const calAvg  = () =>  ((1*good) + (0*neutral) + (-1 * bad))/calTotal()
    const calPositive=()=> (good / calTotal()) * 100

    return (
      <table>
        <tbody>
        <Statistic text="good" value ={good}/>
        <Statistic text="neutral" value ={neutral}/>
        <Statistic text="bad" value ={bad}/>
        <Statistic text="all" value ={calTotal()}/>
        <Statistic text="average" value ={calAvg()}/>
        <Statistic text="positive" value ={calPositive()}/>
        </tbody>
      </table>
    )
  }
  else{
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Statistic = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  )
}
const Button = ({text,event}) => {
  return(
    <button onClick={event}>
      {text}
    </button>
  )
}


const App = () =>{
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const goodInc = () => setGood(good  + 1)
  const neuInc  = () => setNeutral(neutral + 1)
  const badInc  = () => setBad(bad + 1)

  return (
    <div>
      <h3>give Feedback</h3>
      <div>
        <Button text="good" event={goodInc}/>
        <Button text="neutral" event={neuInc}/>
        <Button text="bad" event={badInc}/>
      </div>
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
