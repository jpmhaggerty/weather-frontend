import "./App.css";
import { useState, useEffect } from "react";
import BasicCard from "./components/BasicCard";

const axios = require("axios");

const dataURI = "http://localhost:3001/api/";

function App() {
  const [dataFeed, setDataFeed] = useState([]);

  useEffect(() => {
    const getDataFeed = () => {
      axios
        .get(dataURI)
        .then((response) => {
          if (response.status >= 400) {
            setDataFeed([]);
            throw new Error("Bad response from server");
          }
          setDataFeed(
            response.data.sort((first, second) => first.number - second.number)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getDataFeed();
  }, []);

  let weatherForecast = dataFeed.map((element) => {
    return <BasicCard key={element.number} dataFeed={element} />;
  });

  return (
    <div className="App">
      <header className="App-header">{weatherForecast}</header>
    </div>
  );
}

export default App;
