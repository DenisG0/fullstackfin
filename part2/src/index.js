import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import Note from './components/Note'

const App = () => {
  const [country, setCountry] = useState([])
  const [selectedCountry, selectCountry] = useState([])
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
  }
  
  useEffect(hook, [])


  const searchCountry = (event) => {
      const searchString = event.target.value;
      selectCountry(country.filter((x)=>x.name.includes(searchString)));
      console.log("Search String", searchString, "Found", selectedCountry )

  }

  // ...
  return (
    <div>
      <h1>Country Finder</h1>
      <p>Find Countries</p><input  onChange={searchCountry}></input>
      <Chosencountry selectedCountry={selectedCountry}/>
    </div>
  )
}

const Chosencountry = ({selectedCountry}) => {
    if(selectedCountry.length>10){
      return(
        <p> Too many Countries to List</p>
      )
    }else if(selectedCountry.length>1){
      return selectedCountry.map((country)=><p>{country.name}</p>)
    }else if(selectedCountry.length === 1){
      let country = selectedCountry[0]
      return(
        <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          {country.languages.map((ele)=><p>{ele.name}</p>)}
        </div>
      )
    }else{
      return(
        <p>Type in the to Search!</p>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
