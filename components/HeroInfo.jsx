import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MD5 } from "crypto-js";

const API_KEY = "26474ad52214f6a11bc60ef59c2c59fb";
const PRIV_KEY = "dd7e326f3f9fb5d320f24cf5eeab555dd5bba3a5";

const HeroView = () => {
  let params = useParams();
  const [details, setDetails] = useState(null);
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

    const fullPath = data[0].thumbnail.path + "/portrait_medium.jpg";
    setPath(fullPath);
  };

  useEffect(() => {
    fetchChar();
  }, []);

  return (
    <div className="HeroView">
      <h2>Name: {charName} </h2>
      {picPath && <img src={picPath} />}
      <ul>
        <h3>Events</h3>
        {events &&
          events.map((event, index) => {
            return <li key={index}>{event}</li>;
          })}
      </ul>
    </div>
  );
};

export default HeroView;
