import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TempDrawer from "../components/TempDrawer.js";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import StatusConsole from "./StatusConsole";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const shortTemp = [
  { name: "LIG", status: false },
  { name: "SEF", status: true },
  { name: "CML", status: false },
  { name: "ATT", status: false },
  { name: "DET", status: false },
  { name: "DBR", status: false },
  { name: "DTB", status: false },
  { name: "THK", status: false },
  { name: "SMK", status: false },
  { name: "TRB", status: false },
];

export default function ButtonAppBar({
  darkMode,
  setDarkMode,
  dataFeed,
  handleDataSwitch,
}) {
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInfo = (tag) => {
    console.log("More info requested for", tag);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TempDrawer />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/86/Patch_of_the_Office_of_the_Chief_of_Space_Operations.png"
                alt="logo"
                width="35"
                height="65"
              />
            </Link>
          </Typography>

          <StatusConsole shortRules={shortTemp} handleInfo={handleInfo} />

          <Tooltip
            title={<Typography fontSize={15}>Light/Dark Mode</Typography>}
            placement="top"
          >
            <IconButton onClick={handleDarkMode} color="inherit">
              {darkMode ? (
                <Brightness4Icon sx={{ fontSize: 15 }} />
              ) : (
                <Brightness7Icon sx={{ fontSize: 15 }} />
              )}
            </IconButton>
          </Tooltip>

          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#123540", ml: 1, mr: 1 }}
            >
              {" "}
              Home
            </Button>
          </Link>

          <Link
            to="/documents"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#123540", ml: 1 }}
            >
              {" "}
              NASA TS 4010
            </Button>
          </Link>

          <Link
            to="/datafeeds"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#123540", ml: 1 }}
            >
              {" "}
              Data Feeds
            </Button>
          </Link>
          <Tooltip
            title={<Typography fontSize={15}>Data Feed Toggle</Typography>}
            placement="top"
          >
          <FormControlLabel
            value="top"
            control={<Switch color="warning" />}
            label="Data"
            labelPlacement="top"
            onChange={(event) => {
              handleDataSwitch(event);
            }}
          />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
