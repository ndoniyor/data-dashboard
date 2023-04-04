import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MD5 } from "crypto-js";


const API_KEY = import.meta.env.VITE_APP_API_KEY;
const PRIV_KEY = import.meta.env.VITE_APP_PRIV_KEY;

const HeroView = () => {
  let params = useParams();
  const [description, setDescription] = useState("");
  const [charName, setName] = useState("");
  const [picPath, setPath] = useState("");
  const [events, setEvents] = useState([]);

  const fetchChar = async () => {
    const charID = params.charID;
    const ts = Date.now();
    const preHash = ts + PRIV_KEY + API_KEY;
    const response = await fetch(
      "https://gateway.marvel.com:443/v1/public/characters/" +
        charID +
        "?ts=" +
        ts +
        "&apikey=" +
        API_KEY +
        "&hash=" +
        MD5(preHash).toString()
    );
    let data = await response.json();
    data = data.data.results;
    setName(data[0].name);

    setEvents(
      data[0].events.items.map((event) => {
        return event.name;
      })
    );
    setDescription(data[0].description);

    const fullPath = data[0].thumbnail.path + "/portrait_xlarge.jpg";
    setPath(fullPath);
  };

  useEffect(() => {
    fetchChar();
  }, []);

  return (
    <div className="HeroView">
      <h2>Name: {charName} </h2>
      {picPath && <img className="char-portrait" src={picPath} />}
      <div className="hero-results">
        <div className="hero-seriesList">
          <ul>
            <h3>Events</h3>
            {events &&
              events.map((event, index) => {
                return <li key={index}>{event}</li>;
              })}
          </ul>
        </div>
        <div className="hero-description">
          <h3>Description</h3>
          {description && <li className="desc-text">{description}</li>}
        </div>
      </div>
    </div>
  );
};

export default HeroView;
