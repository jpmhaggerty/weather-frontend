import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function BasicCard({
  name,
  fullName,
  status,
  active = false,
  handleInfo,
}) {
  return (
    <Card
      onClick={() => {
        handleInfo(name);
      }}
      sx={{
        minWidth: 100,
        maxWidth: 200,
        height: "auto",
        filter: active ? "brightness(100%)" : "brightness(40%)",
        color: status ? "yellow" : "white",
        backgroundColor: status ? "green" : "red",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`/images/${name}.png`}
        title={name}
        sx={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "5px",
        }}
      />
      <Typography
        sx={{
          fontSize: 18,
        }}
        variant="inherit"
        gutterBottom
      >
        Rule: {fullName}
      </Typography>
      {/* <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {dataFeed?.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Temperature: {dataFeed?.temperature} °{dataFeed?.temperatureUnit} {dataFeed?.temperatureTrend}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Wind: {dataFeed?.windSpeed}, {dataFeed?.windDirection}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <img src={dataFeed?.icon} />
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {dataFeed?.shortForecast}
        </Typography>
      </CardContent> */}
    </Card>
  );
}
