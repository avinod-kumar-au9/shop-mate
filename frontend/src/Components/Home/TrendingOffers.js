import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { isMobileOnly, isTablet, isBrowser } from "react-device-detect";
import React, { useState, useEffect } from "react";
import ImageResizer from "react-image-resizer";
import { Link } from "react-router-dom";
import "./styles/Offers.scss";
SwiperCore.use([Navigation]);

const Layout = (props) => {
  const [responsive, setresponsive] = useState(4);
  const [dummy, setdummy] = useState("");
  const { Discounts, DiscountsApiUpdate } = props;


  useEffect(() => {
    setdummy("some");
    if (isTablet) {
      setresponsive(4);
    }
    if (isMobileOnly) {
      setresponsive(2);
    }
    if (isBrowser) {
      setresponsive(6);
    }
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth <= 600) {
          setresponsive(2);
        } else if (window.innerWidth > 779) {
          setresponsive(5);
        } else if (window.innerWidth > 992) {
          setresponsive(6);
        } else if (window.innerWidth >= 620) {
          setresponsive(4);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (Discounts) {
      if (dummy === "some") {
        var arr = [];
        for (var i = 0; i < 15; i++) {
          var no = Math.floor(Math.random() * Discounts.length);
          let val = Discounts[no];
          arr.push(val);
          if (arr.length === 14) {
            DiscountsApiUpdate(arr);
          }
          setdummy("");
        }
      }
    }
  }, [dummy, Discounts, DiscountsApiUpdate]);



  return (
    <div className="discountsDiv">
      <h4 className="discountsTitle">Trending Offers</h4>
      <div className="discounts">
        <Swiper spaceBetween={10} slidesPerView={responsive} navigation>
          {Discounts.length > 0
            ? Discounts.map((product, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/list?subCategory=${product.subCategory}`}
                      className="slider"
                    >
                      <ImageResizer src={product.image} height={150} width={150} />
                      <p style={{ color: "black" }} className="discountText">
                        {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1).substring(0, 20)}
                        ...
                      </p>
                      <p className="discountsBrand">
                        {product.brand.charAt(0).toUpperCase() +
                          product.brand.slice(1)}
                      </p>
                    </Link>
                  </SwiperSlide>
                );
              })
            : <div>No Data Found</div>}
        </Swiper>
      </div>
    </div>
  );
};

export default Layout;
