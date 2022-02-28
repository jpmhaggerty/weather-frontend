import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BasicCard from "./BasicCard";
import StickyHeadTable from "./StickyHeadTable";
import Container from "@mui/material/Container";

const shortDefault = [
  { name: "LIG", fullName: "Lightning", status: false },
  { name: "SEF", fullName: "Surface Electric Field Mill", status: false },
  { name: "CML", fullName: "Cumulus Cloud", status: false },
  { name: "ATT", fullName: "Attached Cloud", status: false },
  { name: "DET", fullName: "Detached Cloud", status: false },
  { name: "DBR", fullName: "Debris Cloud", status: false },
  { name: "DTB", fullName: "Disturbed Cloud", status: false },
  { name: "THK", fullName: "Thick Cloud", status: false },
  { name: "SMK", fullName: "Smoke", status: false },
  { name: "TRB", fullName: "Triboelectricity", status: false },
];

export default function Home({
  dataFeedCloud = [],
  dataFeedLightning = [],
  dataFeedMill = [],
  ruleStatus = shortDefault,
  handleInfo,
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <Container>
        {ruleStatus.map((element) => {
          return (
            <BasicCard
              key={element.name}
              name={element.name}
              fullName={element.fullName}
              status={element.status}
              active={element.active}
              handleInfo={handleInfo}
            />
          );
        })}
        <Divider />
      </Container>
      <Container>
        <StickyHeadTable dataFeed={dataFeedCloud} />
        <StickyHeadTable dataFeed={dataFeedLightning} />
        <StickyHeadTable dataFeed={dataFeedMill} />
      </Container>
    </Box>
  );
}
