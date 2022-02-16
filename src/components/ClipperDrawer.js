import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BasicCard from "./BasicCard";
import StickyHeadTable from "./StickyHeadTable";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ColorRadioButtons from "./ColorRadioButtons";
import StatusConsole from "./StatusConsole";

const drawerWidth = 240;

export default function ClippedDrawer({ dataFeed, handleDataSwitch }) {
  let weatherForecast = dataFeed.map((element) => {
    return (
      <div>
        <BasicCard key={element.number} dataFeed={element} />
        <Divider />
      </div>
    );
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Lightning Launch Commit Criteria
          </Typography>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={<Switch color="warning" />}
              label="Data Feed"
              labelPlacement="top"
              onChange={(event) => {
                handleDataSwitch(event);
              }}
            />
          </FormGroup>
          <StatusConsole />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {weatherForecast}
          {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <StickyHeadTable dataFeed={dataFeed} />
        {/* <Typography paragraph>
          Lorem
        </Typography>
        <Typography paragraph>
          Consequat
        </Typography> */}
      </Box>
    </Box>
  );
}
