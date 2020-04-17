const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
require('dotenv').config()
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.static('build'))

app.use(morgan(':method :url :response-time :body'))


app.get('/api/persons', (req, res) => {
  // res.json(persons)
  Person.find({}).then(result => {
    res.json(result.map(x=>x.toJSON()))
  })
})

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', (request, response) => {

  const body = request.body

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  // if(persons.find((person)=>person.name===body.name)){
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   })
  // } 

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId(),
  })

  person.save().then(saved =>{
    response.json(saved.toJSON())
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.get('/info', (request,response) => {
  const peopleAmount = persons.length;
  response.send(`<p>Phonebook has info for ${peopleAmount} people </p> <p> ${new Date()} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person.findById(id)
    .then(person=>{
    response.json(person.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})