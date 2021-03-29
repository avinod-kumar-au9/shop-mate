import React, { useState } from "react";
import "./styles/menu.scss";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const [display, setdisplay] = useState("0");
  const [value, setvalue] = useState("");
  const { MenuSubCategoryclickHandler } = props;

  const DisplayonHover = (val) => {
    setdisplay("1");
    setvalue(val);
    
  };

  const HideonHover = (val) => {
    setdisplay("0");
    setvalue(val);
  };

  return (
    <div className="menu">
      <div
        onMouseEnter={() => DisplayonHover(2)}
        onMouseLeave={() => HideonHover(2)}
        onClick={MenuSubCategoryclickHandler}
        className="dropdown"
      >
        <button className="dropbtn">Fashion</button>
        {value !== 2 && <i className="ri-arrow-drop-down-line dropdown-arrow"></i>}
        {display === "0" && value === 2 && (
          <i className="ri-arrow-drop-down-line dropdown-arrow"></i>
        )}
        {display === "1" && value === 2 && (
          <i className="ri-arrow-drop-up-line dropdown-arrow"></i>
        )}
        <div className="dropdown-content">
          <Link to="/list?subCategory=Mens" className="dropdown-child">
            Mens
          </Link>
          <Link to="/list?subCategory=Womens" className="dropdown-child">
            Womens
          </Link>
          <Link to="/list?subCategory=Kids" className="dropdown-child">
            Kids
          </Link>
        </div>
      </div>

      <div
        onMouseEnter={() => DisplayonHover(3)}
        onClick={MenuSubCategoryclickHandler}
        onMouseLeave={() => HideonHover(3)}
        className="dropdown"
      >
        <button className="dropbtn">Electronics</button>
        {value !== 3 && <i className="ri-arrow-drop-down-line dropdown-arrow"></i>}
        {display === "0" && value === 3 && (
          <i className="ri-arrow-drop-down-line dropdown-arrow"></i>
        )}
        {display === "1" && value === 3 && (
          <i className="ri-arrow-drop-up-line dropdown-arrow"></i>
        )}
        <div className="dropdown-content">
          <Link to="/list?subCategory=Mobiles" className="dropdown-child">
            Mobiles
          </Link>
          <Link to="/list?subCategory=Laptops" className="dropdown-child">
            Laptops
          </Link>
          <Link to="/list?subCategory=Televisions" className="dropdown-child">
            Televisions
          </Link>
        </div>
      </div>
      <div
        onMouseEnter={() => DisplayonHover(4)}
        onMouseLeave={() => HideonHover(4)}
        onClick={MenuSubCategoryclickHandler}
        className="dropdown"
      >
        <button className="dropbtn">Home & Furniture</button>
        {value !== 4 && <i className="ri-arrow-drop-down-line dropdown-arrow"></i>}
        {display === "0" && value === 4 && (
          <i className="ri-arrow-drop-down-line dropdown-arrow"></i>
        )}
        {display === "1" && value === 4 && (
          <i className="ri-arrow-drop-up-line dropdown-arrow"></i>
        )}
        <div className="dropdown-content">
          <Link to="/list?subCategory=Kitchen" className="dropdown-child">
            Kitchen
          </Link>
          <Link to="/list?subCategory=Living Room" className="dropdown-child">
            Living Room
          </Link>
          <Link to="/list?subCategory=Home Decor" className="dropdown-child">
            Home Decor
          </Link>
        </div>
      </div>
      <div
        onMouseEnter={() => DisplayonHover(5)}
        onMouseLeave={() => HideonHover(5)}
        onClick={MenuSubCategoryclickHandler}
        className="dropdown"
      >
        <button className="dropbtn">Sports</button>
        {value !== 5 && <i className="ri-arrow-drop-down-line dropdown-arrow"></i>}
        {display === "0" && value === 5 && (
          <i className="ri-arrow-drop-down-line dropdown-arrow"></i>
        )}
        {display === "1" && value === 5 && (
          <i className="ri-arrow-drop-up-line dropdown-arrow"></i>
        )}
        <div className="dropdown-content">
          <Link to="/list?subCategory=Cricket" className="dropdown-child">
            Cricket
          </Link>
          <Link to="/list?subCategory=Football" className="dropdown-child">
            Football
          </Link>
          <Link to="/list?subCategory=Skating" className="dropdown-child">
            Skating
          </Link>
        </div>
      </div>
      <div
        onMouseEnter={() => DisplayonHover(6)}
        onMouseLeave={() => HideonHover(6)}
        onClick={MenuSubCategoryclickHandler}
        className="dropdown"
      >
        <button className="dropbtn">Beauty</button>
        {value !== 6 && <i className="ri-arrow-drop-down-line dropdown-arrow"></i>}
        {display === "0" && value === 6 && (
          <i className="ri-arrow-drop-down-line dropdown-arrow"></i>
        )}
        {display === "1" && value === 6 && (
          <i className="ri-arrow-drop-up-line dropdown-arrow"></i>
        )}
        <div className="dropdown-content">
          <Link to="/list?subCategory=Personal Hygiene" className="dropdown-child">
            Personal Hygiene
          </Link>
          <Link to="/list?subCategory=Hair care" className="dropdown-child">
            Hair care
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Menu;
