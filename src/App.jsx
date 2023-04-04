import { useState, useEffect } from "react";
import { MD5 } from "crypto-js";
import { Link } from "react-router-dom";
import "./App.css";
import SeriesChart from "../components/SeriesChart";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const PRIV_KEY = import.meta.env.VITE_APP_PRIV_KEY;

function App() {
  const [seriesSearchInput, setSeriesSearch] = useState("");
  const [charSearchInput, setCharacterSearch] = useState("");
  const [seriesList, setList] = useState([]);
  const [charList, setChars] = useState({});
  const [seriesCount, setSeriesCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [yearData, setYearData] = useState({});
  const [oldestSeries, setOldest] = useState(0);
  const [newestSeries, setNewest] = useState(0);

  //need to extract character ids. located in character.resourceURI

  const handleSeriesSearch = (event) => {
    setSeriesSearch(event.target.value);
  };

  const handleCharacterSearch = (event) => {
    setCharacterSearch(event.target.value);
    searchChar();
  };

  const handleSubmit = () => {
    fetchSeries();
  };

  const searchChar = () => {
    let charNames = {};
    if (charSearchInput != "") {
      seriesList.forEach((series) => {
        if (series.characters.available > 0) {
          series.characters.items.forEach((character) => {
            if (
              character.name &&
              character.name
                .toLowerCase()
                .startsWith(charSearchInput.toLowerCase())
            ) {
              if (!(character.name in charNames)) {
                let ID = character.resourceURI.split("/");
                ID = ID[ID.length - 1];
                charNames = { ...charNames, [character.name]: ID };
              }
            }
          });
        }
      });
      console.log(charNames);
      setChars(charNames);
    }
    setCharCount(Object.keys(charList).length);
  };

  const fetchSeries = async () => {
    console.log(API_KEY);
    const seriesNameMod = seriesSearchInput.replace(/\s/g, "%20");
    const ts = Date.now();
    const hash = MD5(ts + PRIV_KEY + API_KEY).toString();
    const response = await fetch(
      "https://gateway.marvel.com:443/v1/public/series?titleStartsWith=" +
        seriesNameMod +
        "&limit=100" +
        "&ts=" +
        ts +
        "&apikey=" +
        API_KEY +
        "&hash=" +
        hash
    );
    let data = await response.json();
    data = data.data.results;

    setSeriesCount(data.length);
    setList(data);
    let years = {};
    data.forEach((item) => {
      if (years[item.startYear]) {
        years[item.startYear] += 1;
      } else {
        years[item.startYear] = 1;
      }
    });
    setYearData(years);
    setNewest(Math.max(...Object.keys(years).map(Number)));
    setOldest(Math.min(...Object.keys(years).map(Number)));
  };

  return (
    <div className="App">
      <div className="header">
        <img
          className="headerPic"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
        ></img>
        <h1>Character Directory</h1>
      </div>
      <div className="info">
        <div className="searchBars">
          <label for="seriesSearch">Series:</label>
          <input
            id="seriesSearch"
            type="text"
            placeholder="Search for series"
            onChange={handleSeriesSearch}
          />
          <button className="submitBtn" onClick={handleSubmit}>
            SUBMIT
          </button>
          <label for="charSearch">Characters:</label>
          <input
            id="charSearch"
            type="text"
            placeholder="Search for characters"
            onChange={handleCharacterSearch}
          />
        </div>
        {Object.keys(yearData).length > 0 && (
          <div className="chart">
            <SeriesChart chartData={yearData} />
          </div>
        )}
      </div>

      <div className="results">
        <div className="charList">
          <h3>Characters</h3>
          {charCount > 0 && <p className="lastData">Count: {charCount}</p>}
          <ul>
            {Object.keys(charList).map((key, index) => {
              return (
                <Link to={`/heroInfo/${charList[key]}`} key={index}>
                  <button className="charBtns" key={index}>{`${key}`}</button>
                </Link>
              );
            })}
          </ul>
        </div>

        <div className="seriesList">
          <h3>Series</h3>
          {oldestSeries > 0 && <p>Oldest Series: {oldestSeries}</p>}
          {newestSeries > 0 && <p>Newest Series: {newestSeries}</p>}
          {seriesCount > 0 && <p className="lastData">Count: {seriesCount}</p>}
          <ul>
            {seriesList &&
              seriesList.map((series, index) => {
                return <li key={index}>{series.title}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
