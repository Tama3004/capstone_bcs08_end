import React from "react";
import InfoProfile from "./InfoProfile";
import RentProfile from "./RentProfile";

export default function () {
  return (
    <div className="container flex space-x-10">
      <InfoProfile />
      <RentProfile />
    </div>
  );
}
