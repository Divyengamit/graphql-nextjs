import React from "react";

import { Typography } from "@mui/material";
import style from "../../styles/EquipmentForm.module.css";
import Image from "next/image";
const img = require("../../assets/backgrounds/background_onbording.png");

const EquipmentContent = () => {
  return (
    <>
      <div className={"Equipmen-form-img"}>
        <Image src={img} alt="image" objectFit="contain" />
      </div>
      {/* <Typography variant="h2" color="secondary" sx={{ mt: 4 }} className={style.abch2}>
        Equipment Finance Features:
      </Typography>
      <Typography display="flex" variant="h4SemiBold" sx={{ mt: 3 }}>
        1) Loan amount ranging from{" "}
        <Typography variant="h4Bold" color="secondary">
          &nbsp;INR 10 Lakhs to INR 10 Crores
        </Typography>
      </Typography>
      <Typography display="flex" variant="h4SemiBold" sx={{ mt: 3 }}>
        2) Standard
        <Typography variant="h4Bold" color="secondary">
          &nbsp;Loan to Value upto 85%
        </Typography>
      </Typography>
      <Typography display="flex" variant="h4SemiBold" sx={{ mt: 3 }}>
        3)
        <Typography variant="h4Bold" color="secondary">
          &nbsp;Loan tenure&nbsp;
        </Typography>{" "}
        ranging from{" "}
        <Typography variant="h4Bold" color="secondary">
          &nbsp;12 to 84 months
        </Typography>{" "}
      </Typography>
      <Typography variant="h4SemiBold" sx={{ mt: 3 }}>
        4) Attractive rate of interest
      </Typography>
      <Typography variant="h4SemiBold" sx={{ mt: 3 }}>
        5) Dedicated Relationship Manager
      </Typography>
      <Typography variant="h4SemiBold" sx={{ mt: 3 }}>
        6) Quick Processing
      </Typography> */}
    </>
  );
};

export default EquipmentContent;
