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

  const [dataUrlCloud, setDataUrlCloud] = useState();
  const [dataUrlLightning, setDataUrlLightning] = useState();
  const [dataUrlMill, setDataUrlMill] = useState();
  const [periodCloud, setPeriodCloud] = useState();
  const [periodLightning, setPeriodLightning] = useState();
  const [periodMill, setPeriodMill] = useState();

  const handleTextChange = (event) => {
    switch (event.target.name) {
      case "cloud/url": {
        setDataUrlCloud(event.target.value);
        break;
      }
      case "cloud/period": {
        setPeriodCloud(event.target.value);
        break;
      }
      case "lightning/url": {
        setDataUrlLightning(event.target.value);
        break;
      }
      case "lightning/period": {
        setPeriodLightning(event.target.value);
        break;
      }
      case "mill/url": {
        setDataUrlMill(event.target.value);
        break;
      }
      case "mill/period": {
        setPeriodMill(event.target.value);
        break;
      }
      default: {
        console.log("No data pulled for ", event.target.name);
      }
    }
  };

  const handleUpload = () => {
    putAPIData("all/update");
  };

  const putAPIData = async (source) => {
    let payload = {
      dataUrlMill: dataUrlMill,
      periodMill: periodMill,
      dataUrlCloud: dataUrlCloud,
      periodCloud: periodCloud,
      dataUrlLightning: dataUrlLightning,
      periodLightning: periodLightning,
    };

    const response = await fetch(`http://localhost:3001/data/${source}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
  };

  const getAPIData = async (source) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${source}`);
      const json = await response.json();
      switch (source) {
        case "cloud/url": {
          setDataUrlCloud(json);
          break;
        }
        case "cloud/period": {
          setPeriodCloud(json);
          break;
        }
        case "lightning/url": {
          setDataUrlLightning(json);
          break;
        }
        case "lightning/period": {
          setPeriodLightning(json);
          break;
        }
        case "mill/url": {
          setDataUrlMill(json);
          break;
        }
        case "mill/period": {
          setPeriodMill(json);
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

  const handleRefresh = () => {
    getAPIData("cloud/url");
    getAPIData("cloud/period");
    getAPIData("lightning/url");
    getAPIData("lightning/period");
    getAPIData("mill/url");
    getAPIData("mill/period");
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
          value={dataUrlCloud}
          label="Cloud URL"
          handleTextChange={handleTextChange}
        />
        <CustomizedTextField
          name="cloud/period"
          value={periodCloud}
          label="Cloud Period (ms)"
          handleTextChange={handleTextChange}
        />
      </Box>
      <Box>
        <CustomizedTextField
          name="lightning/url"
          value={dataUrlLightning}
          label="Lightning URL"
          handleTextChange={handleTextChange}
        />
        <CustomizedTextField
          name="lightning/period"
          value={periodLightning}
          label="Lightning Period (ms)"
          handleTextChange={handleTextChange}
        />
      </Box>
      <Box>
        <CustomizedTextField
          name="mill/url"
          value={dataUrlMill}
          label="Mill URL"
          handleTextChange={handleTextChange}
        />
        <CustomizedTextField
          name="mill/period"
          value={periodMill}
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
