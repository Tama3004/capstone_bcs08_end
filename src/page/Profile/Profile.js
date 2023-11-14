import React from "react";
import InfoProfile from "./InfoProfile";
import RentProfile from "./RentProfile";
import { useMediaQuery } from "react-responsive";

export default function () {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  return (
    <div
      className={
        isMobile ? "container" : "container flex space-x-10"
      }
    >
      <InfoProfile />
      {isMobile ? "" : <RentProfile />}
    </div>
  );
}
