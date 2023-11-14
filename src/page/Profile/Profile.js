import React from "react";
import InfoProfile from "./InfoProfile";
import RentProfile from "./RentProfile";
import { useMediaQuery } from "react-responsive";

export default function () {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isIpad = useMediaQuery({ maxWidth: 960 });
  return (
    <div
      className={
        isMobile
          ? "container"
          : isIpad
          ? "container flex-row"
          : "container flex space-x-10"
      }
    >
      <InfoProfile />
      {isMobile ? "" : <RentProfile />}
    </div>
  );
}
