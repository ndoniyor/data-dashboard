import { useState, useEffect } from 'react'
import { MD5 } from 'crypto-js'
import './App.css'

const API_KEY = "26474ad52214f6a11bc60ef59c2c59fb"
const PRIV_KEY = "dd7e326f3f9fb5d320f24cf5eeab555dd5bba3a5"

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [seriesList, setList] = useState([])
  const [charList, setChars] = useState([])
  const [seriesCount, setSeriesCount] = useState(0)
  const [charCount, setCharCount] = useState(0) 
  const [oldestSeries, setOldest] = useState(0)
  const [newestSeries, setNewest] = useState(0)

  const searchChar = (searchValue) => {
    const charNames = []
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
      setChars(charNames)
    }
    setCharCount(charNames.length)
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
    let data = await response.json()
    data=data.data.results

    setSeriesCount(data.length)
    setList(data)
    const years = data.map((obj)=>obj.startYear)
    setNewest(Math.max(...years))
    setOldest(Math.min(...years))
  }

  useEffect(()=>{
    fetchSeries("a")
  },[])


  return (
    <div className="App">
      <div className="header">
        <img class="headerPic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"></img>
        <h1>Character Directory</h1>
      </div>
      
      <div className="searchBars">
        <label for="seriesSearch">Series:</label>
        <input
        id="seriesSearch"
        type="text"
        placeholder='Search for series'
        onChange={(inputString)=>fetchSeries(inputString.target.value)}
        />

        <label for="charSearch">Characters:</label>
        <input
        id="charSearch"
        type="text"
        placeholder='Search for characters'
        onChange={(inputString)=>searchChar(inputString.target.value)}
        />

      </div>
      <div className="results">
        <div className="charList">
          <h3>Characters</h3>
          {charCount>0 && <p class="lastData">Count: {charCount}</p>}
          <ul>
            {charList && charList.map((name,index) => {
              return <li key={index}>{name}</li>
            }
            )}
          </ul>
        </div>
        
        <div className="seriesList">
          <h3>Series</h3>
          {oldestSeries>0 && <p>Oldest Series: {oldestSeries}</p>}
          {newestSeries>0 && <p>Newest Series: {newestSeries}</p>}
          {seriesCount>0 && <p class="lastData" >Count: {seriesCount}</p>}
          <ul>
            {seriesList && seriesList.map((series,index) => {
              return <li key={index}>{series.title}</li>
            }
            )}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default App
