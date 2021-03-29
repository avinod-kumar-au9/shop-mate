import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom"
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { isMobileOnly, isTablet, isBrowser } from "react-device-detect";
import ImageResizer from "react-image-resizer";
import "./styles/RelatedItems.scss"
import {Link} from "react-router-dom"

SwiperCore.use([Navigation]);

const RelatedItemDisplay = (props) => {
  const [responsive, setresponsive] = useState(4);
  const [dummy, setdummy] = useState("");
  const { SimilarProductsApi,callbacksimilarproductrerender } = props;

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

  

  return (
    <div className="similarproductsDiv">
      <h4 className="similarproductsTitle">Similar Products</h4>
      <div className="similarproducts">
      {SimilarProductsApi.length > 1 ?  <Swiper spaceBetween={10} slidesPerView={responsive} navigation>
          
            
             {SimilarProductsApi.filter(data=>{
              return data._id !== props.match.params.id
            })
            .map((product, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Link
                      to={product._id}
                      style={{ textDecoration: "none" }}
                      className="slider"
                      onClick={()=>callbacksimilarproductrerender(product._id)}
                    >
                      <ImageResizer src={product.image} height={150} width={150} />
                      <p style={{ color: "black" }} className="similarproductsText">
                        {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1).substring(0, 20)}
                        ...
                      </p>
                      <p className="similarproductsBrand">
                        {product.brand.charAt(0).toUpperCase() +
                          product.brand.slice(1)}
                      </p>
                    </Link>
                  </SwiperSlide>
                );
              })}
           
        </Swiper>  :  <div className="relateditemsnodatafound">No Data Found</div>}
      </div>
    </div>
  );
};

export default withRouter(RelatedItemDisplay)
