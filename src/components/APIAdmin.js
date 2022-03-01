import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import fetch from "cross-fetch";
import CustomizedTextField from "./CustomizedTextField";

export default function APIAdmin() {
  //get the urls for the mills and clouds from the backend - check
  //display urls with user edit - check
  //test the urls and show results - to do
  //put the urls to the backend - check

  const [dataFeed, setDataFeed] = useState({
    number: 1,
    cloudurl: "https://api.weather.gov/gridpoints/MLB/46,69/forecast",
    cloudperiod: 10000,
    lightningurl: "https://api.weather.gov/gridpoints/MLB/51,69/forecast",
    lightningperiod: 10000,
    millurl: "https://api.weather.gov/gridpoints/MLB/56,69/forecast",
    millperiod: 10000,
  });

  const handleTextChange = (event) => {
    setDataFeed({
      ...dataFeed,
      [event.target.name.split("/").join("")]: event.target.value,
    });
  };

  const handleUpload = () => {
    putAPIData("url", "update");
  };

  const putAPIData = async (source, action) => {
    const response = await fetch(
      `http://localhost:3001/data/${source}/${action}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFeed),
      }
    );
    const result = await response.json();
  };

  const handleRefresh = () => {
    getAPIData("all", "url");
  };

  const getAPIData = async (source, action) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/${source}/${action}`
      );
      const json = await response.json();
      setDataFeed({ ...json });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleRefresh();
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
        <CustomizedTextField
          name="cloud/url"
          value={dataFeed.cloudurl}
          label="Cloud URL"
          handleTextChange={handleTextChange}
        />
        <CustomizedTextField
          name="cloud/period"
          value={dataFeed.cloudperiod}
          label="Cloud Period (ms)"
          handleTextChange={handleTextChange}
        />
      </Box>
      <Box>
        <CustomizedTextField
          name="lightning/url"
          value={dataFeed.lightningurl}
          label="Lightning URL"
          handleTextChange={handleTextChange}
        />
        <CustomizedTextField
          name="lightning/period"
          value={dataFeed.lightningperiod}
          label="Lightning Period (ms)"
          handleTextChange={handleTextChange}
        />
      </Box>
      <Box>
        <CustomizedTextField
          name="mill/url"
          value={dataFeed.millurl}
          label="Mill URL"
          handleTextChange={handleTextChange}
        />
        <CustomizedTextField
          name="mill/period"
          value={dataFeed.millperiod}
          label="Mill Period (ms)"
          handleTextChange={handleTextChange}
        />
      </Box>

      <Button
        name="upload"
        onClick={handleUpload}
        sx={{ color: "yellow", bgcolor: "gray" }}
      >
        Upload
      </Button>

      <Button
        name="refresh"
        onClick={handleRefresh}
        sx={{ color: "yellow", bgcolor: "gray" }}
      >
        Refresh
      </Button>
    </Box>
  );
}
