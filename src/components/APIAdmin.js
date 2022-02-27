import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import fetch from "cross-fetch";

const stubSources = {
  dataUrlMill: "https://api.weather.gov/gridpoints/MLB/46,69/forecast",
  periodMill: 11000,
  dataUrlCloud: "https://api.weather.gov/gridpoints/MLB/51,69/forecast",
  periodCloud: 12000,
  dataUrlLightning: "https://api.weather.gov/gridpoints/MLB/56,69/forecast",
  periodLightning: 13000,
};

export default function APIAdmin() {
  //get the urls for the mills and clouds from the backend
  //display urls with user edit
  //test the urls and show results
  //put the urls to the backend

  const [apiResponse, setApiResponse] = useState();
  const [dataUrlCloud, setDataUrlCloud] = useState();
  const [dataUrlLightning, setDataUrlLightning] = useState();
  const [dataUrlMill, setDataUrlMill] = useState();
  const [periodCloud, setPeriodCloud] = useState();
  const [periodLightning, setPeriodLightning] = useState();
  const [periodMill, setPeriodMill] = useState();

  const handleDataPush = (source, action) => {
    let payloadData = {
      dataUrlMill: dataUrlMill,
      periodMill: periodMill,
      dataUrlCloud: dataUrlCloud,
      periodCloud: periodCloud,
      dataUrlLightning: dataUrlLightning,
      periodLightning: periodLightning,
    };
    putAPIData(`http://localhost:3001/data/${source}/${action}`, payloadData);
  };

  const putAPIData = async (url, payload = stubSources) => {
    // `http://localhost:3001/data/${source}/${action}`
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
  };

  useEffect(() => {
    const getAPIData = async (source, action) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/${source}/${action}`
        );
        const json = await response.json();
        if (action === "url") {
          source === "cloud" ? setDataUrlCloud(json) : console.log();
          source === "lightning" ? setDataUrlLightning(json) : console.log();
          source === "mill" ? setDataUrlMill(json) : console.log();
        } else if (action === "period") {
          source === "cloud" ? setPeriodCloud(json) : console.log();
          source === "lightning" ? setPeriodLightning(json) : console.log();
          source === "mill" ? setPeriodMill(json) : console.log();
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getAPIData("cloud", "url");
    getAPIData("lightning", "url");
    getAPIData("mill", "url");
    getAPIData("cloud", "period");
    getAPIData("lightning", "period");
    getAPIData("mill", "period");
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <TextField
          color="warning"
          id="url-cloud"
          label="Cloud URL"
          variant="filled"
          value={dataUrlCloud}
          sx={{ width: 400, input: { color: "yellow", bgcolor: "gray" } }}
        />
        <TextField
          color="warning"
          id="url-cloud"
          label="Cloud Period"
          variant="filled"
          value={periodCloud}
          sx={{ input: { color: "yellow", bgcolor: "gray" } }}
        />
      </Box>
      <Box>
        <TextField
          color="warning"
          id="url-lightning"
          label="Lightning URL"
          variant="filled"
          value={dataUrlLightning}
          sx={{ width: 400, input: { color: "yellow", bgcolor: "gray" } }}
        />
        <TextField
          color="warning"
          id="url-lightning"
          label="Lightning Period"
          variant="filled"
          value={periodLightning}
          sx={{ input: { color: "yellow", bgcolor: "gray" } }}
        />
      </Box>
      <Box>
        <TextField
          color="warning"
          id="url-mill"
          label="Mill URL"
          variant="filled"
          value={dataUrlMill}
          sx={{ width: 400, input: { color: "yellow", bgcolor: "gray" } }}
        />
        <TextField
          color="warning"
          id="url-mill"
          label="Mill Period"
          variant="filled"
          value={periodMill}
          sx={{ input: { color: "yellow", bgcolor: "gray" } }}
        />
      </Box>
      <Button
        onClick={handleDataPush("mill", "url")}
        sx={{ color: "yellow", bgcolor: "gray" }}
      >
        Upload
      </Button>
    </Box>
  );
}
