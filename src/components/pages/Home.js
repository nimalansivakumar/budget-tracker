import { Button, Typography } from "@mui/material";
import React from "react";
import Image1 from "../../assets/images/image-1.svg";
import { ArrowRightSharp } from "@mui/icons-material";

const Home = () => {
  return (
    <div className="w-full h-screen bg-primary">
      <section className="w-full  h-full flex flex-col justify-around items-center">
        <div>
          <Typography variant="h4" component="h1" className="text-white">
            Discover your spending habits in minute.
          </Typography>
        </div>
        <img src={Image1} className="w-1/3" />
        <Button
          variant="contained"
          endIcon={<ArrowRightSharp />}
          className="m-20"
        >
          <Typography>Get Started</Typography>
        </Button>
      </section>
    </div>
  );
};

export default Home;
