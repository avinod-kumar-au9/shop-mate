import React from "react";
import "./styles/homePage.scss";
import Image from "../images/sellerDashboardhome.jpg";

const HomePage = () => {
  return (
    <div className="sellerHomeRow">
      <div className="sellerHomeCol">
        <h1 className="sellerhometitle">Welcome to the SHOP-MATE Family ...</h1>
        <h4 className="sellerhometitle2">
          We are happy to see here, to start growing with us
        </h4>
      </div>
      <div className="sellerHomeCol">
        <img className="sellerhomeimg" src={Image} />
      </div>
    </div>
  );
};

export default HomePage;
