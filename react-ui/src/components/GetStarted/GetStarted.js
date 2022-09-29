import React from "react";
import Mascot from "../../assets/images/Mascot.png";
import "./GetStarted.scss";

const GetStarted = () => {
  return (
    <>
      <div className="flexH2">
        <h2 className="getStartedH2">
          Click on "Add Folder" to get started! 🤩
        </h2>
      </div>
      <div className="flex">
        <img src={Mascot} />
      </div>
    </>
  );
};

export default GetStarted;
