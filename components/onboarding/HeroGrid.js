import React from "react";
import { Grid, Hidden } from "@mui/material";
import GuestAppBar from "../navigation/GuestAppBar";
import Footer from "../navigation/Footer";
import Image from "next/image";

/* A UI Template component, which will show a Hero Image on the left side and content on the right */
const HeroGrid = (props) => {
  return (
    <Grid container sx={{ display: "flex", flexDirection: "row" }}>
      <Hidden mdDown>
        {/* 
        The height of this Grid will be the same as that of the next Grid.
        This is because, we made the Grid Container flexbox
      */}
        <Grid
          item
          md={6}
          xs={12}
          // sx={{
          //   background: `url('${props.img}')`,
          //   backgroundSize: "cover",
          // }}
        >
          <Image
            src={props.img}
            style={{ backgroundSize: "cover" }}
            alt="image"
          />
        </Grid>
      </Hidden>

      {/* 
      Make this Grid flex. 
      Then for the footer, specifiy marginTop: 'auto. This will make the footer position at bottom
      Then specifiy minHeight: 100vh. This will make sure that the heiight of the whole Grid will be
      minimum 100vh.
          */}
      <Grid
        item
        md={6}
        xs={12}
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <GuestAppBar />
        {props.children}
        <Footer />
      </Grid>
    </Grid>
  );
};

export default HeroGrid;
