import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good,neutral,bad}) => {
  let total = good+neutral+bad;
  let score = good + (bad*-1);
  if(good||neutral||bad){
    return(
      <div>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {total}</p>
        <p>Average: {score/total}</p>
        <p>Positive: {good/total}%</p>
      </div>
    )
  }else{
    return(
      <div>
       <h2>Statistics</h2>
       <p>No feedback given!!!</p>
      </div>
    )

  }


}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={()=>setGood(good+1)}>Good</button>
        <button onClick={()=>setNeutral(neutral+1)}>Nuetral</button>
        <button onClick={()=>setBad(bad+1)}>Bad</button>
      </div>
     <Statistics good={good} neutral={neutral} bad={bad}/>
     <hr></hr>
     <Anecdotes/>
    </div>
  )
}

const Anecdotes = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState({
    0:2,
    1:0,
    2:3,
    3:2,
    4:1,
    5:2
  })
  const [top,setTop] = useState(2)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const voteAnecdote = () => {
    setVote({...votes, [selected]:votes[selected]+1})
    checkHighestNumber();
  }
  const randomNumber = () => {
    return Math.floor(Math.random() * Math.floor(anecdotes.length))
  }
  const checkHighestNumber = () => {
    let highest = 0;
    let highestIndex = 0;
    for(var vote in votes){
      if(votes[vote]>highest){
        highest = votes[vote];
        highestIndex = vote
      }
    }
    setTop(highestIndex);
  }
  console.log("votes",votes)

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <button onClick={()=>setSelected(randomNumber())}>Next Anecodote</button>
      <button onClick={voteAnecdote}>Vote</button>
      <p>Votes: {votes[selected]}</p>
      <hr></hr>
      <h2>Anecdotes with Most Votes</h2>
      {anecdotes[top]}
      VOTES:{votes[top]}
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)