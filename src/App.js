import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./App.css";
import LLCCAppBar from "./components/LLCCAppBar";
import Documents from "./components/Documents";
import Home from "./components/Home";
import APIAdmin from "./components/APIAdmin";

const axios = require("axios");

const dataUrl = "http://localhost:3001/api/";
const dataUrlOn = "http://localhost:3001/on/";
const dataUrlOff = "http://localhost:3001/off/";

const shortTemp = [
  { name: "LIG", fullName: "Lightning", status: true, active: false },
  {
    name: "SEF",
    fullName: "Surface Electric Field Mill",
    status: true,
    active: false,
  },
  { name: "CML", fullName: "Cumulus Cloud", status: false, active: true },
  { name: "ATT", fullName: "Attached Cloud", status: false, active: false },
  { name: "DET", fullName: "Detached Cloud", status: true, active: false },
  { name: "DBR", fullName: "Debris Cloud", status: true, active: false },
  { name: "DTB", fullName: "Disturbed Cloud", status: false, active: false },
  { name: "THK", fullName: "Thick Cloud", status: true, active: false },
  { name: "SMK", fullName: "Smoke", status: false, active: false },
  { name: "TRB", fullName: "Triboelectricity", status: true, active: false },
];

function App() {
  const [dataFeed, setDataFeed] = useState([]);
  const [darkMode, setDarkMode] = useState();
  const [ruleStatus, setRuleStatus] = useState(shortTemp);

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

  const handleDataSwitch = useCallback((event) => {
    if (event.target.checked) {
      fetch(dataUrlOn).then();
    } else {
      fetch(dataUrlOff).then();
    }
  }, []);

  const handleInfo = (tag) => {
    console.log("More info requested for", tag);
    let newRuleStatus = [];
    for (let i = 0; i < ruleStatus.length; i++) {
      if (ruleStatus[i].name === tag) {
        newRuleStatus.push({ ...ruleStatus[i], active: true });
      } else {
        newRuleStatus.push({ ...ruleStatus[i], active: false });
      }
    }
    setRuleStatus(newRuleStatus);
    console.log("Rulestate: ", ruleStatus);
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
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>
          <div className="App">
            <header className="App-header">
              <LLCCAppBar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                dataFeed={dataFeed}
                ruleStatus={ruleStatus}
                handleDataSwitch={handleDataSwitch}
                handleInfo={handleInfo}
              />
            </header>
            <main className="App-main">
              <Routes>
                <Route path="/documents" element={<Documents />} />
                <Route path="/api" element={<APIAdmin />} />
                <Route
                  path="/"
                  element={
                    <Home
                      dataFeed={dataFeed}
                      ruleStatus={ruleStatus}
                      handleInfo={handleInfo}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
