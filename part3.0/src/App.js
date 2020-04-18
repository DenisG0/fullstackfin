import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      // .catch(error => next(error)) 
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let found = persons.filter((person)=>newPerson == person.name)
    if(found.length){
      if (window.confirm("Are you sure you want to replace" + newPerson + "'s number?")) {
        const id =found[0].id;
        const PersonObject = {
          name: newPerson,
          number: newNumber,
          id: id
        }
        PersonService
          .update(id,PersonObject)
          .then(returnedPerson => {
            var newPersons = persons.map((person)=>{
              if(person.id===returnedPerson.id){
                return returnedPerson
              }else{
                return person
              }
            })
            setPersons(newPersons)
            setNewPerson('')
            setNewNumber('')
          })
          // .catch(error => next(error)) 
      } 
    }else{
      const PersonObject = {
        name: newPerson,
        number: newNumber,
        // id: persons.length+1 
      }
      PersonService
        .create(PersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewPerson('')
          setNewNumber('')
        })
        // .catch(error => next(error)) 
    }
  }

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete?")) { 
    PersonService
      .DELETE(id)
      .then(data => {
          console.log(data, "DELETE SUCCESSFULL");
          setPersons(data)
      })
       .catch(error => {
        setErrorMessage(
          `Person '${Person.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })

    }
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Persons</h1>
      <Notification message={errorMessage} />
      <div>
      </div>      
      <ul>
        {persons.map((person, i) => 
          <Person
            key={i}
            person={person} 
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </ul>
      <form onSubmit={addPerson}>
        <input
          value={newPerson}
          onChange={handlePersonChange}
        />
        <input
        value={newNumber}
        onChange={handleNumberChange}
      />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 