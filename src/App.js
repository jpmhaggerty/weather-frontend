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
import fetch from "cross-fetch";
import Button from "@mui/material/Button";

const axios = require("axios");

const dataUrl = "http://localhost:3001/api/lightning";
const dataUrlCloud = "http://localhost:3001/api/cloud/";
const dataUrlCloudOn = "http://localhost:3001/data/cloud/on/";
const dataUrlCloudOff = "http://localhost:3001/data/cloud/off/";
const dataUrlLightning = "http://localhost:3001/api/lightning/";
const dataUrlLightningOn = "http://localhost:3001/data/lightning/on/";
const dataUrlLightningOff = "http://localhost:3001/data/lightning/off/";
const dataUrlMill = "http://localhost:3001/api/mill/";
const dataUrlMillOn = "http://localhost:3001/data/mill/on/";
const dataUrlMillOff = "http://localhost:3001/data/mill/off/";

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
  const [dataFeedCloud, setDataFeedCloud] = useState([]);
  const [dataFeedLightning, setDataFeedLightning] = useState([]);
  const [dataFeedMill, setDataFeedMill] = useState([]);
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
    let putParameters = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (event.target.checked) {
      fetch(dataUrlCloudOn, putParameters).then();
      fetch(dataUrlLightningOn, putParameters).then();
      fetch(dataUrlMillOn, putParameters).then();
    } else {
      fetch(dataUrlCloudOff, putParameters).then();
      fetch(dataUrlLightningOff, putParameters).then();
      fetch(dataUrlMillOff, putParameters).then();
    }
  }, []);

  const handleInfo = (tag) => {
    let newRuleStatus = [];
    for (let i = 0; i < ruleStatus.length; i++) {
      if (ruleStatus[i].name === tag) {
        newRuleStatus.push({ ...ruleStatus[i], active: true });
      } else {
        newRuleStatus.push({ ...ruleStatus[i], active: false });
      }
    }
    setRuleStatus(newRuleStatus);
  };

  // useEffect(() => {
  //   let dataFeed;
  //   const getDataFeed = (url) => {
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         if (response.status >= 400) {
  //           dataFeed = [];
  //           throw new Error("Bad response from server");
  //         }
  //         dataFeed = response.data.sort(
  //           (first, second) => first.number - second.number
  //         );
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   getDataFeed(dataUrlCloud);
  //   setDataFeedCloud(dataFeed);
  //   getDataFeed(dataUrlLightning);
  //   setDataFeedLightning(dataFeed);
  //   getDataFeed(dataUrlMill);
  //   setDataFeedMill(dataFeed);
  //   console.log("Feedback: ", dataFeedMill);
  // }, [handleDataSwitch]);

  const getFeedData = async (source) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${source}`);
      const json = await response.json();
      switch (source) {
        case "cloud": {
          setDataFeedCloud(json);
          break;
        }
        case "lightning": {
          setDataFeedLightning(json);
          break;
        }
        case "mill": {
          setDataFeedMill(json);
          break;
        }
        default: {
          console.log("No data pulled for ", source);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdate = (value) => {
    return !value;
  };

  useEffect(() => {
    getFeedData("cloud");
    getFeedData("lightning");
    getFeedData("mill");
  }, [handleUpdate]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme>
          <div className="App">
            <header className="App-header">
              <LLCCAppBar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                dataFeed={dataFeedMill}
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
                      dataFeedCloud={dataFeedCloud}
                      dataFeedLightning={dataFeedLightning}
                      dataFeedMill={dataFeedMill}
                      ruleStatus={ruleStatus}
                      handleInfo={handleInfo}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
          <Button onClick={handleUpdate(true)}>Update</Button>
        </CssBaseline>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
