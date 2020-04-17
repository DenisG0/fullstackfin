import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.name} {props.excercise}
    </p>
  )
}

export default Part