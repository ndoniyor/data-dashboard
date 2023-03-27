import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MD5 } from 'crypto-js'

import './App.css'

const API_KEY = "26474ad52214f6a11bc60ef59c2c59fb"
const PRIV_KEY = "dd7e326f3f9fb5d320f24cf5eeab555dd5bba3a5"

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [seriesList, setList] = useState([])
  const [charList, setChars] = useState([])
  const [nameFilter, setNameFilter] = ""

  const searchChar = (searchValue) => {
    const charNames = []
    console.log(seriesList)
    setSearchInput(searchValue)
    if(searchValue!=""){
      seriesList.forEach(series =>{
        if(series.characters.available > 0){
          series.characters.items.forEach(character => {
            if(character.name && character.name.toLowerCase().startsWith(searchValue.toLowerCase())){
              if(!charNames.includes(character.name)){
                charNames.push(character.name);
              }
            }
          })
        }
      })
      console.log(charNames)
      setChars(charNames)
    }
  }

  const fetchSeries = async (seriesName) => {
    const seriesNameMod = seriesName.replace(/\s/g,"%20")
    const ts = Date.now()
    const preHash = ts + PRIV_KEY + API_KEY
    const response = await fetch(
      "https://gateway.marvel.com:443/v1/public/series?titleStartsWith=" + seriesNameMod
       + "&limit=100"
       + "&ts=" + ts
       + "&apikey=" + API_KEY
       + "&hash=" + MD5(preHash).toString()
    )
    const data = await response.json()
    setList(data.data.results)
  }


  return (
    <div className="App">
      <h1>Marvel Character Directory</h1>
      <div className="searchBars">
        <input
        type="text"
        placeholder='Search for characters'
        onChange={(inputString)=>searchChar(inputString.target.value)}
        />
        
        <input
        type="text"
        placeholder='Search for series'
        onChange={(inputString)=>fetchSeries(inputString.target.value)}
        />
      </div>
      <div className="results">
        <h2>Characters</h2>
        <ul>
          {charList && charList.map((name,index) => {
            return <li key={index}>{name}</li>
          }
          )}
        </ul>
        <h2>Series</h2>
        <ul>
          {seriesList && seriesList.map((series,index) => {
            return <li key={index}>{series.title}</li>
          }
          )}
        </ul>
      </div>
      
    </div>
  )
}

export default App
