import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import fetch from "cross-fetch";

export default function APIAdmin() {
  //get the urls for the mills and clouds from the backend
  //display urls with user edit
  //test the urls and show results
  //put the urls to the backend

  const stubSources = {
    dataUrlMill: "https://api.weather.gov/gridpoints/MLB/46,69/forecast",
    periodMill: 11000,
    dataUrlCloud: "https://api.weather.gov/gridpoints/MLB/51,69/forecast",
    periodCloud: 12000,
    dataUrlLightning: "https://api.weather.gov/gridpoints/MLB/56,69/forecast",
    periodLightning: 13000,
  };

  const getAPIData = async (ruleName) => {
    const response = await fetch(`http://localhost:8080/rules/${ruleName}`);
    const result = await response.json();
    setRule(result);
  };

  const putAPIData = async (urlSources = stubSources, source, action) => {
    const response = await fetch(
      `http://localhost:3001/data/${source}/${action}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlSources),
      }
    );
    const result = await response.json();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Container>Place Holder</Container>
    </Box>
  );
}
