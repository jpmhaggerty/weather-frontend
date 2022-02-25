import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BasicCard from "./BasicCard";
import StickyHeadTable from "./StickyHeadTable";
import Container from "@mui/material/Container";

export default function Home({ dataFeed=[] }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Container>
        {dataFeed.map((element) => {
          return (
            <div>
              <BasicCard key={element.number} dataFeed={element} />
              <Divider />
            </div>
          );
        })}
      </Container>
      <Container>
        <StickyHeadTable dataFeed={dataFeed} />
      </Container>
    </Box>
  );
}
