import React from "react";
import Mascot from "../../assets/images/Mascot.webp";
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
        <img src={Mascot} alt="A cute pink dumpster!" />
      </div>
    </>
  );
};

export default GetStarted;
