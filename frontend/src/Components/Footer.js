import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <footer>
      <h3 className="Dmt glow">Shop Mate</h3>
        <div className="main-content">
          <div className="left box">
            <h2 className="h2">Shop Mate</h2>
            <div className="content">
              <p className="h2">
                Electronic City, outer ring Road <br />
                Bengaluru - 560 035
                <br /> India Ph: +91 (80) 123456
              
              </p>
             
            </div>
          </div>

          <div className="center box">
            <h2 className="h2">Quick Links</h2>
            <div className="content">
              <div className="place">
                <span className="text">
                  <Link to="/aboutus" className="right " style={{textDecoration:"none"}}>
                    About Us
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div className="right box">
            <h2 className="h2">Contact us</h2>
            <div className="content">
              <li>
                <Link to="/contact" style={{textDecoration:"none"}} className="right text1" >
                  Contact Us
                </Link>
              </li>
            </div>
          </div>
          <div className="right box">
            <h2 className="h2">Support & Social</h2>
            <div className="content">
              <h6 className="h6">Email Us At</h6>
              <h6>
                <a className="social" href="/">Shop Mate@gmail.com</a>
              </h6>

              <hr className="hr " />
              <h6 className="h6"> Follow Us On</h6>
              
              <div className="social">
                <a href="https://facebook.com/coding.np">
                <i className="fab fa-facebook-square"></i>
                
                </a>
                <a href="/">
                  <span className=" soc fab fa-twitter"></span>
                </a>
                <a href="https://instagram.com/coding.np">
                  <span className="soc fab fa-instagram"></span>
                </a>
                <a href="https://youtube.com/c/codingnepal">
                  <span className="soc fab fa-youtube"></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom">
          <center>
            <span className="rights">
              Deccan Merchants E-commerce Limitted &copy; 2020 All Rights
              Reserved.
            </span>
          </center>
        </div>
      </footer>
    </div>
  );
};

export default Footer;





