import React from 'react'

const Person = ({ person, deletePerson }) => {
    // const label = person.important
    //   ? 'make not important' : 'make important'
    return (
      <li>
        {person.name} - {person.number}
        <button onClick={deletePerson}>Delete</button>
      </li>
    )
  }

export default Person