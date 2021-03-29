import React, { useEffect, useState } from "react";
import "./detail.scss";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Image from "react-image-resizer";
import ReactImageMagnify from "react-image-magnify";
import {useHistory } from "react-router-dom";
import { isMobileOnly, isTablet} from "react-device-detect";

const DetailDisplay = (props) => {
  const [detail, setDetail] = useState("");
  const [img, setImg] = useState("");
  const [cartImg, setCartImg] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [err, setErr] = useState("");
  const [id, setId] = useState("");
  const [responsiveWidth, setresponsiveWidth] = useState(50);
  const [responsiveHeight, setresponsiveHeight] = useState(60);
  const [largeimgWidth, setLargeimgWidth] = useState(300);
  const [largeimgHeight, setlargeimgHeight] = useState(380);

  const history = useHistory();

  useEffect(()=>{
    if (isTablet) {
      setresponsiveWidth(40);
      setresponsiveHeight(50);
      setLargeimgWidth(250)
      setlargeimgHeight(350)
    }
    if (isMobileOnly) {
      setresponsiveWidth(30);
      setresponsiveHeight(40);
      setLargeimgWidth(200)
      setlargeimgHeight(310)
    }
   
  },[])

  useEffect(() => {
    setDetail(props.data);
  }, [props.data]);

  const frontImage = (Img) => {
    setImg(Img);
  };

  const cartRender = () => {
      if ((!props.pdata || (props.pdata && !props.pdata.data))) {
       props.login()
      }else{
    if (detail[0].category === "Fashion") {
      if (!size || !color) {
        setErr("select size and color");
      } else {
        setErr("");
        history.push("/cart");
        props.cartdetail(
          detail[0]._id,
          cartImg,
          name,
          color,
          size,
          detail[0].price,
          detail[0].delivered,
          detail[0].coupon,
          detail[0].sellerCompany
        );
      }
    } else {
      history.push("/cart");
      props.cartdetail(
        detail[0]._id,
        detail[0].image,
        detail[0].name,
        detail[0].availableColours[0].colour,
        0,
        detail[0].price,
        detail[0].delivered,
        detail[0].coupon,
        detail[0].sellerCompany
      );
    }
  }};

 

  const sizeRender = (e) => {
    setSize(e.target.value);
    
  };

  const selectedcolor = (i, n, c,id) => {
    setCartImg(i);
    setName(n);
    setColor(c);
    setId(id)
  };

  return (
    <>
      {detail && (
        <div className="row detailpage">
          <div className="col-lg-4 col-md-5 col-sm-4 col-xs-12 ">
            <div className="d-flex imgfield">
              <div>
                <div
                  className="views"
                  onMouseOver={() => {
                    frontImage(detail[0].availableColours[0].frontView);
                  }}
                >
                  <Image
                    src={detail[0].availableColours[0].frontView}
                    isFluidWidth='true'
                    height={responsiveHeight}
                    width={responsiveWidth}
                  />
                </div>
                <div
                  className="views"
                  onMouseOver={() => {
                    frontImage(detail[0].availableColours[0].backView);
                  }}
                >
                  <Image
                    src={detail[0].availableColours[0].backView}
                    height={responsiveHeight}
                    width={responsiveWidth}
                  ></Image>
                </div>
                {detail[0].availableColours[0].leftView &&
                <div
                  className="views"
                  onMouseOver={() => {
                    frontImage(detail[0].availableColours[0].leftView);
                  }}
                >
                  <Image
                    src={detail[0].availableColours[0].leftView}
                    height={responsiveHeight}
                    width={responsiveWidth}
                  ></Image>
                </div>
                }
               {detail[0].availableColours[0].rightView &&
                <div
                  className="views"
                  onMouseOver={() => {
                    frontImage(detail[0].availableColours[0].rightView);
                  }}
                >
                  <Image
                    src={detail[0].availableColours[0].rightView}
                    height={responsiveHeight}
                    width={responsiveWidth}
                  ></Image>
                </div>
                    }
              </div>
              <div className="img1 pt-3">
                {/* <div className="largeimg"> */}
                <center>  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        // isFluidWidth: true,
                        height:largeimgHeight,
                        width:largeimgWidth,
                        src: img ? img : detail[0].image,
                      },
                      largeImage: {
                        src: img ? img : detail[0].image,
                        width: 800,
                        height: 1300,
                      },
                      enlargedImageContainerStyle: { zIndex: "1000" },
                      enlargedImageContainerDimensions: {
                        width: "310%",
                        height: "130%",
                      },
                    }}
                  /></center>
                {/* </div> */}
              </div>
            </div>

            <center><p style={{ color: "red" }}>{err}</p>
            {props.productincart?
            <div className=" mb-5 mt-4">
           <Link to='/cart'> <button
               className="btn btn-warning icondetail" 
             >
               <i className="fas fa-shopping-cart "></i>GO TO CART
             </button></Link>
            
           </div>:
           <div className=" mb-5 mt-4">
             <button
                className="btn btn-warning icondetail"
                onClick={cartRender}
              >
                <i className="fas fa-shopping-cart "></i>ADD TO CART
              </button>
             
            </div>}
            </center>
          </div>

          <div className="col-lg-8 col-md-7 col-sm-8 col-xs-12 rightcols">
            <div className="linktext mt-2 mb-2">
              <span className="links">
                <Link
                  to="/"
                  className=" pr-2"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Home
                </Link>
              </span>
              <i style={{ fontSize: "10px" }} className="fas fa-chevron-right"></i>
              <Link
                className="pr-2 pl-2"
                to={`/list?category=${detail[0].category}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {detail[0].category}
              </Link>
              <i style={{ fontSize: "10px" }} className="fas fa-chevron-right"></i>
              <Link
                className="pr-2 pl-2"
                to={`/list?subCategory=${detail[0].subCategory}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {detail[0].subCategory}
              </Link>
              <i style={{ fontSize: "10px" }} className="fas fa-chevron-right"></i>
              <span className=" pl-2">
                {detail[0].availableColours[0].name.slice(0, 10)}...
              </span>
            </div>
            <h5>{detail[0].availableColours[0].name}</h5>
            <div className='listrating mt-2'>{detail[0].rating} 
            <span className="material-icons listrating ">star_border</span></div>
            <h3>₹ {detail[0].price.toLocaleString()}</h3>
            {detail[0].coupon && (
              <>
                <h6 className="mt-3">Offer available </h6>
                <div className=' sidehead'>Coupon Code - 'SAVE 50'</div>
                {/* <div>Coupon Code - 'SAVE 50'</div> */}
              </>
            )}
            {detail[0].category === "Fashion" && (
              <>
                <div className="d-flex mt-3 ">
                  <p className="pt-3 pr-3 sidehead margin">Colors </p>
                  <div className="colors ">
                    {detail[0].availableColours.map((item) => {
                      return (
                        <div
                          key={item.color}
                          onMouseOver={() => {
                            frontImage(item.frontView);
                          }}
                          onClick={() =>
                            selectedcolor(
                              item.frontView,
                              item.name,
                              item.colour,
                              item._id
                            )
                          }
                          style={id===item._id?{border: "2px red solid"} 
                              : { border: "none" }
                          }
                          className="viewscolor"
                        >
                          <Image 
                            src={item.frontView}
                            height={responsiveHeight}
                            width={responsiveWidth}
                          ></Image>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="d-flex mt-4">
                  <p className="margin sidehead">Size </p>
                  <div className="d-flex">
                    <button
                      className="size ml-5"
                      value="S"
                      onClick={sizeRender}
                    
                    >
                      S
                    </button>
                    <button className="size" value="M" onClick={sizeRender} >
                      M
                    </button>
                    <button className="size" value="L" onClick={sizeRender} >
                      L
                    </button>
                    <button className="size" value="XL" onClick={sizeRender} >
                      XL
                    </button>
                    <button className="size" value="XXL" onClick={sizeRender} >
                      XXL
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="d-flex mt-4">
              <p className="margin sidehead">Service </p>
              <div className=" ml-4 ">
                <div className="">
                  <i className="fas fa-undo-alt icondet"></i>30 Day Return Policy
                </div>
                <div className="">
                  <i className="fas fa-rupee-sign icondet"></i>Cash on Delivery
                  available
                </div>
              </div>
            </div>
            <div className="d-flex mt-4">
              <p className=" margin sidehead">Delivery </p>
              <div className=" ml-4 ">
                <div className="">{detail[0].delivered}</div>
              </div>
            </div>
            {detail[0].category !== "Fashion" && (
              <div className="d-flex  mt-4">
                <p className="margin  sidehead">Warrenty</p>
                <div className="ml-3">
                  <div>
                    <b>Covered in Warranty:</b>{" "}
                    {detail[0].warranty.CoveredInWarranty}
                  </div>
                  <div>
                    <b>Domestic Warranty:</b>
                    {detail[0].warranty.DomesticWarranty}
                  </div>
                  <div>
                    <b>NotCovered in Warranty:</b>
                    {detail[0].warranty.NotCoveredInWarranty}
                  </div>
                  <div>
                    <b>Warranty Service Type:</b>
                    {detail[0].warranty.WarrantyServiceType}
                  </div>
                  <div>
                    <b>Warranty Summary:</b>
                    {detail[0].warranty.WarrantySummary}
                  </div>
                </div>
              </div>
            )}
            <div className="d-flex mt-4">
              <p className="margin  sidehead">Seller</p>
              <div className="ml-5">
                <div className="">{detail[0].sellerCompany}</div>
              </div>
            </div>
            <div className="d-flex mt-4">
              <p className="margin  sidehead">Description </p>
              <div className="ml-1">
                <div className="">{detail[0].description}</div>
              </div>
            </div>
            <hr />
            <h5>Product Details</h5>
            <table>
              <tbody>
                <tr className="m-4">
                  <td className="sidehead" style={{ width: "150px" }}>
                    Secondary Color
                  </td>
                  <td className="">{detail[0].availableColours[0].colour}</td>
                </tr>
                {detail[0].category === "Fashion" && (
                  <>
                    <tr>
                      <td className="sidehead">Pack of</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td className="sidehead">fabric</td>
                      <td>{detail[0].features.fabric}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">occasion</td>
                      <td>{detail[0].features.occasion}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">pattern</td>
                      <td>{detail[0].features.pattern}</td>
                    </tr>
                  </>
                )}
                {detail[0].category === "Electronics" && (
                  <>
                    <tr>
                      <td className="sidehead">In The Box</td>
                      <td>{detail[0].features.inTheBox}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Model No</td>
                      <td>{detail[0].features.ModelNo}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Model Name</td>
                      <td>{detail[0].features.ModelName}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Built In Wifi</td>
                      <td>{detail[0].features.BuiltInWifi}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Launch Year</td>
                      <td>{detail[0].features.LaunchYear}</td>
                    </tr>
                  </>
                )}
                {detail[0].category === "HomeFurniture" && (
                  <>
                    <tr>
                      <td className="sidehead">Sales Package</td>
                      <td>{detail[0].features.salesPackage}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Material</td>
                      <td>{detail[0].features.material}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Width</td>
                      <td>{detail[0].features.width}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Height</td>
                      <td>{detail[0].features.height}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Depth</td>
                      <td>{detail[0].features.depth}</td>
                    </tr>
                  </>
                )}
                {detail[0].category === "Sports" && (
                  <>
                    <tr>
                      <td className="sidehead">Sales Package</td>
                      <td>{detail[0].features.salesPackage}</td>
                    </tr>
                   
                    <tr>
                      <td className="sidehead">Width</td>
                      <td>{detail[0].features.width}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Height</td>
                      <td>{detail[0].features.height}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Depth</td>
                      <td>{detail[0].features.depth}</td>
                    </tr>
                  </>
                )}
                {detail[0].category === "Beauty" && (
                  <>
                   
                    <tr>
                      <td className="sidehead">Model No</td>
                      <td>{detail[0].features.ModelNo}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Ideal For</td>
                      <td>{detail[0].features.idealFor}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Max Shell Life</td>
                      <td>{detail[0].features.maxShellLife}</td>
                    </tr>
                    <tr>
                      <td className="sidehead">Organic Type</td>
                      <td>{detail[0].features.organicType}</td>
                    </tr>
                  </>
                )}
               
                <tr>
                  <td className="sidehead">Other Details</td>
                  <td>
                    Immportant :- Product colour may slightly vary due to
                    photographic lighting sources or your monitor settings
                  </td>
                </tr>
                <tr>
                  <td className="sidehead">Country of Origin</td>
                  <td>India</td>
                </tr>
              </tbody>
            </table>

            <hr />
            <Comments
              comments={detail[0].reviews}
              commentpostdetails={props.commentpostdetails}
              pdata={props.pdata}
              login={props.login}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailDisplay;
