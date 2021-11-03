import React from "react";
import { Box, Card, CardContent, Typography, Icon } from "@mui/material";
import { MonetizationOn, Money, AccountBalance } from "@mui/icons-material";
import CountUp from "react-countup";

const BoxTheme = {
  width: "100%",
  height: "20%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const CardTheme = {
  width: "25%",
  height: "70%",
  backgroundColor: "#082032",
  display: "flex",
  justifyContent: "space-around",
};

const CardContentTheme = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const DataBoard = () => {
  return (
    <Box sx={BoxTheme}>
      <Card sx={CardTheme}>
        <CardContent sx={CardContentTheme}>
          <Box>
            <Typography variant="h6" component="h6" color="white">
              Fund Alloted
            </Typography>
            <Typography variant="h6" component="h6" color="white">
              <CountUp
                start={0}
                end={45000}
                duration={1.75}
                separator=","
              ></CountUp>
            </Typography>
          </Box>
          <Icon sx={{ color: "#fff", height: "100%" }}>
            <MonetizationOn></MonetizationOn>
          </Icon>
        </CardContent>
      </Card>
      <Card sx={CardTheme}>
        <CardContent sx={CardContentTheme}>
          <Box>
            <Typography variant="h6" component="h6" color="white">
              Spend
            </Typography>
            <Typography variant="h6" component="h6" color="white">
              <CountUp
                start={0}
                end={10000}
                duration={1.75}
                separator=","
              ></CountUp>
            </Typography>
          </Box>
          <Icon sx={{ color: "#fff", height: "100%" }}>
            <Money></Money>
          </Icon>
        </CardContent>
      </Card>
      <Card sx={CardTheme}>
        <CardContent sx={CardContentTheme}>
          <Box>
            <Typography variant="h6" component="h6" color="white">
              Balance
            </Typography>
            <Typography variant="h6" component="h6" color="white">
              <CountUp
                start={0}
                end={35000}
                duration={1.75}
                separator=","
              ></CountUp>
            </Typography>
          </Box>
          <Icon sx={{ color: "#fff", height: "100%" }}>
            <AccountBalance></AccountBalance>
          </Icon>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DataBoard;
