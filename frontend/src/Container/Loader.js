import React from 'react'
import "./styles/List.scss";
import Loader from "../Components/images/Loader.txt";

const Loaders = () => {
  return (
      <div className="loaderRow">
        <div className="loaderCol">
          <img  className="loader" alt='' src={Loader} />
        </div>
      </div>
    
  )
}

export default Loaders
