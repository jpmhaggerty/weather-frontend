import "./App.css";
import { useState, useEffect } from "react";
import ClippedDrawer from "./components/ClipperDrawer";

const axios = require("axios");

const dataUrl = "http://localhost:3001/api/";

function App() {
  const [dataFeed, setDataFeed] = useState([]);

  const handleDataSwitch = (event) => {
    if (event.target.checked) {
    fetch("http://localhost:3001/data/on")
      .then()
    } else {
      fetch("http://localhost:3001/data/off")
      .then()
    }
  };

  useEffect(() => {
    const getDataFeed = (url) => {
      axios
        .get(url)
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

    getDataFeed(dataUrl);
  }, [handleDataSwitch]);

  return (
    <div className="App">
      <header className="App-header">
        <ClippedDrawer
          dataFeed={dataFeed}
          handleDataSwitch={handleDataSwitch}
        />
      </header>
    </div>
  );
}

export default App;
