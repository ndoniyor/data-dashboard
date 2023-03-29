import { useEffect } from "react";
const DetailView = (props) => {
  let events = [];
  let image = "";

  const constructImage = () => {};

  const fetchChar = async () => {
    const charID = props.charID;
    const ts = Date.now();
    const preHash = ts + PRIV_KEY + API_KEY;
    const response = await fetch(
      "https://gateway.marvel.com:443/v1/public/characters/" +
        charID +
        "&ts=" +
        ts +
        "&apikey=" +
        API_KEY +
        "&hash=" +
        MD5(preHash).toString()
    );
    let data = await response.json();
    data = data.data.results;

    events = data.events.items.map((event) => {
      return event.name;
    });
  };

  useEffect(() => {
    fetchChar();
  }, []);

  return <HeroInfo charName={data.name} events={events} />;
};

export default DetailView;
