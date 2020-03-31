import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Numberform = ({persons,setPersons}) => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  
  const submitNumber = (event) => {
    event.preventDefault();
    //Filter for same names
    setPersons(persons.concat({name:newName,number:newNumber}))
    setNewName("");
    setNewNumber("");
  }

  const checkName = (event) => {
    let found = persons.filter((person)=>event.target.value == person.name)
    console.log("FOUND:",found)
    if(found.length>0){
      alert(`${event.target.value} already exists in our system`)
    }else{
      setNewName(event.target.value);
    }
  }

  return (
    <form onSubmit={submitNumber}>
      <div>
        name: <input onChange={checkName} value={newName}/>
      </div>
      <div>
        Number: <input onChange={(event)=>setNewNumber(event.target.value)} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {

  return (
    <ul>
    {props.people.map((ele)=><li>{ele.name} {ele.number}</li>)}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])


  return (
    <div>
      <h2>Phonebook</h2>
      <hr/>
      <Numberform persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Numbers people={persons}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)