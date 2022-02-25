import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar.js";
import Documents from "./components/Documents";
import Home from "./components/Home";
// import ClippedDrawer from "./components/ClipperDrawer";

const axios = require("axios");

const dataUrl = "http://localhost:3001/api/";

function App() {
  const [dataFeed, setDataFeed] = useState([]);
  const [darkMode, setDarkMode] = useState();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#123548",
      },
    },
    typography: {
      fontFamily: ["Open Sans"],
    },
  });

  const handleDataSwitch = (event) => {
    if (event.target.checked) {
      fetch("http://localhost:3001/data/on").then();
    } else {
      fetch("http://localhost:3001/data/off").then();
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
  // }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>
          <div className="App">
            <header className="App-header">
              <ButtonAppBar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                dataFeed={dataFeed}
                handleDataSwitch={handleDataSwitch}
              />
            </header>
            <main className="App-main">
              <Routes>
                <Route path="/documents" element={<Documents />} />
                <Route path="/" element={<Home dataFeed={dataFeed} />} />
              </Routes>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
