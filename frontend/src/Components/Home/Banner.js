import { Link } from "react-router-dom";
import PhonesBanner from "../images/phonesBanner.jpg";
import fashionBanner from "../images/men-fashion.jpg";
import TvBanner from "../images/Philips-tv-banner.jpg";
import Carousel from "react-bootstrap/Carousel";

const Banner = () => {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        <Link to="/list?subCategory=Mobiles">
          <img
            style={{ height: "350px" }}
            className="d-block w-100"
            src={PhonesBanner}
            alt="First slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Link to="/list?subCategory=Mens">
          <img
            style={{ height: "350px" }}
            className="d-block w-100"
            src={fashionBanner}
            alt="Second slide"
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Link to="/list?subCategory=Televisions">
          <img
            style={{ height: "350px" }}
            className="d-block w-100"
            src={TvBanner}
            alt="Third slide"
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
