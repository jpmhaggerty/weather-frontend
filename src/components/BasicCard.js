import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ dataFeed }) {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
