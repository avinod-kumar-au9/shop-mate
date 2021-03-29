import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Link } from "react-router-dom";
import { isMobileOnly, isTablet, isBrowser } from "react-device-detect";
import ImageResizer from "react-image-resizer";
import "./styles/BestElectronics.scss";
SwiperCore.use([Navigation]);

const Electronics = (props) => {
  const [responsive, setresponsive] = useState(4);
  const [dummy, setdummy] = useState("");
  const { BestElectronics, ElectronicsApiUpdate } = props;

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
    if (BestElectronics) {
      if (dummy === "some") {
        var arr = [];
        for (var i = 0; i < 15; i++) {
          var no = Math.floor(Math.random() * BestElectronics.length);
          let val = BestElectronics[no];
          arr.push(val);
          if (arr.length === 14) {
            ElectronicsApiUpdate(arr);
          }
          setdummy("");
        }
      }
    }
  }, [dummy, BestElectronics, ElectronicsApiUpdate]);



  return (
    <div className="electronicsDiv">
      <h4 className="electronicsTitle">Best Electronics</h4>
      <div className="electronics">
        <Swiper spaceBetween={10} slidesPerView={responsive} navigation>
          {BestElectronics.length > 0
            ? BestElectronics.map((product, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/list?subCategory=${product.subCategory}`}
                      className="slider"
                    >
                      <ImageResizer src={product.image} height={150} width={150}  />
                      <p style={{ color: "black" }} className="electronicsText">
                        {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1).substring(0, 20)}
                        ...
                      </p>
                      <p className="electronicsBrand">
                        {product.brand.charAt(0).toUpperCase() +
                          product.brand.slice(1)}
                      </p>
                    </Link>
                  </SwiperSlide>
                );
              })
            :  <div>No Data Found</div>}
        </Swiper>
      </div>
    </div>
  );
};

export default Electronics;
