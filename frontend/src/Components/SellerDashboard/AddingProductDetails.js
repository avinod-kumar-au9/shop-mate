import React, { useState, useEffect } from "react";
import "./styles/addproducts.scss";
import { Link,withRouter } from "react-router-dom";

const AddingProducts = (props) => {
  const { FullDataSubmitHandler,Responseafteraddingproducts,Sellerlogin } = props;
  const [state, setstate] = useState({
    category: "",
    subCategory: "",
    name: "",
    description: "",
    price: "",
    coupon: "",
    brand: "",
    delivered: "",
    image: "",
    rating: "",
    sellerId:"",
    sellerCompany: "",
    size: "",
    reviews: [],
    warranty: {
      WarrantyServiceType: "Carry-in",
      WarrantySummary: "1 Year Warranty From the Date of Purchase",
      CoveredInWarranty: "Manufacturing Defects",
      NotCoveredInWarranty:
        "Does Not Cover Damages to the Product Resulting from Unauthorised Adaptations, Adjustments, Tampering or Repair, Improper Installation or Placement, Mishandling, Improper Use, Deviation from the Instructions Set Out in the User Manual (If Applicable) Normal Wear and Tear Caused Due to Use of the Product.",
      DomesticWarranty: "1 Year",
    },
    availableColours: [],
    features: "",
  });
  const [dummy, setdummy] = useState("");
  const [dummy1, setdummy1] = useState("");
  const [error, seterror] = useState("");
  const [spinner,setspinner]=useState(false)

  const [productColours, setproductColours] = useState({
    name: "",
    colour: "",
    stock: "",
    frontView: "",
    backView: "",
    leftView: "",
    rightView: "",
  });

  const [electronicsFeatures, setelectronicsFeatures] = useState({
    inTheBox: "",
    ModelNo: "",
    ModelName: "",
    colour: "",
    BuiltInWifi: "",
    LaunchYear: "",
  });

  const [fashionFeatures, setfashionFeatures] = useState({
    fabric: "",
    occasion: "",
    colour: "",
    pattern: "",
    countryForOrigin: "India",
  });

  const [homeFeatures, sethomeFeatures] = useState({
    salesPackage: "",
    material: "",
    width: "",
    height: "",
    depth: "",
  });

  const [sportsFeatures, setsportsFeatures] = useState({
    salesPackage: "",
    width: "",
    height: "",
    depth: "",
  });

  const [beautyFeatures, setbeautyFeatures] = useState({
    idealFor: "",
    organicType: "",
    maxShellLife: "",
    ModelNo: "",
  });

  const {
    name,
    colour,
    stock,
    frontView,
    backView,
    leftView,
    rightView,
  } = productColours;

  const categorySelecthandler = (e) => {
    
    setstate({
      ...state,
      category: e.target.value,

    });
  };

  const subcategorySelecthandler = (e) => {
    setstate({
      ...state,
      subCategory: e.target.value,
    });
  };

  const InputsHandler = (e) => {
    setstate({
      ...state,
      [e.target.name]:
        e.target.name === "price" ? parseInt(e.target.value) : e.target.value.trim(),
    });
  };

  const electronicsFeaturesHandler = (e) => {
    setelectronicsFeatures({
      ...electronicsFeatures,
      [e.target.name]: e.target.value,
    });
  };

  const fashionFeaturesHandler = (e) => {
    setfashionFeatures({
      ...fashionFeatures,
      [e.target.name]: e.target.value,
    });
  };

  const homeFeaturesHandler = (e) => {
    sethomeFeatures({
      ...homeFeatures,
      [e.target.name]: e.target.value,
    });
  };

  const sportsFeaturesHandler = (e) => {
    setsportsFeatures({
      ...sportsFeatures,
      [e.target.name]: e.target.value,
    });
  };

  const beautyFeaturesHandler = (e) => {
    setbeautyFeatures({
      ...beautyFeatures,
      [e.target.name]: e.target.value,
    });
  };

  const productColoursInputHandler = (e) => {
    setproductColours({
      ...productColours,
      [e.target.name]:
        e.target.name === "stock" ? parseInt(e.target.value) : e.target.value,
    });
  };

  const productColoursSubmitHandler = () => {
      
    if (!name || !colour || !stock || !frontView) {
      seterror("name, colour, stock, frontview should be filled");
    } else {
      setstate({
        ...state,
        availableColours: [...state.availableColours, productColours],
      });

      seterror("");

      setproductColours({
        ...productColours,
        name: "",
        colour: "",
        stock: "",
        frontView: "",
        backView: "",
        leftView: "",
        rightView: "",
      });

     
    }



  };

  const { category, subCategory } = state;

  const SubmitHandler = (e) => {
    e.preventDefault();

    setspinner(true)

    if (category === "Electronics")
      setstate({
        ...state,
        features: electronicsFeatures,
      });
    else if (category === "Fashion") {
      setstate({
        ...state,
        features: fashionFeatures,
      });
    } else if (category === "HomeFurniture") {
      setstate({
        ...state,
        features: homeFeatures,
      });
    } else if (category === "Sports") {
      setstate({
        ...state,
        features: sportsFeatures,
      });
    } else if (category === "Beauty") {
      setstate({
        ...state,
        features: beautyFeatures,
      });
    }

    

    setdummy("some");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    
    if (dummy) {
      setstate({
        ...state,
        availableColours: [...state.availableColours, productColours],
        sellerId:Sellerlogin ? Sellerlogin._id : ""
      });
      setdummy("");
      setdummy1("some");
    }

    if (dummy1) {
      FullDataSubmitHandler(state);
      setdummy1("");
    }


    if (Responseafteraddingproducts === "success"){
      
      setspinner(false)
      

    }
  }, [dummy, dummy1,Responseafteraddingproducts]);

  return (
    <form className="sellerForm" onSubmit={(e) => SubmitHandler(e)}>
      <div className="sellerRow">
        <div className="sellerCol">
          <h4 className="sellerTitle">Add New Listings to Shop-Mate</h4>
          <div className="col-lg-12  selectDiv">
            <select
              onChange={categorySelecthandler}
              className="custom-select"
              required
            >
              <option defaultValue value="">
                Choose Category
              </option>
              <option className="option">Electronics</option>
              <option className="option">Fashion</option>
              <option>HomeFurniture</option>
              <option>Sports</option>
              <option>Beauty</option>
            </select>
          </div>

          <div className="col-lg-12 selectDiv">
            <select
              onChange={subcategorySelecthandler}
              className="custom-select"
              required
            >
              <option defaultValue value="">
                Choose Sub-Category
              </option>

              {category === "Electronics" && (
                <>
                  {" "}
                  <option>Mobiles</option>
                  <option>Laptops</option>
                  <option>Televisions</option>{" "}
                </>
              )}

              {category === "Fashion" && (
                <>
                  {" "}
                  <option>Mens</option>
                  <option>Womens</option>
                  <option>Kids</option>{" "}
                </>
              )}

              {category === "HomeFurniture" && (
                <>
                  {" "}
                  <option>Kitchen</option>
                  <option>Living Room</option>
                  <option>Home Decor</option>{" "}
                </>
              )}

              {category === "Sports" && (
                <>
                  {" "}
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Skating</option>{" "}
                </>
              )}

              {category === "Beauty" && (
                <>
                  {" "}
                  <option>Personal Hygiene</option>
                  <option>Hair care</option>{" "}
                </>
              )}
            </select>
          </div>
        </div>
        {subCategory ? (
          <div className="sellerCol">
            <div
              style={{ marginTop: "20px" }}
              className="input-group col-lg-12"
            >
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Short Name
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="name"
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Description
                </span>
              </div>
              <input
                name="description"
                onChange={InputsHandler}
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Price
                </span>
              </div>
              <input
                name="price"
                onChange={InputsHandler}
                required
                type="number"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Coupon
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="coupon"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Brand
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="brand"
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Delivery Estimation
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="delivered"
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Rating
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="rating"
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Seller Company
                </span>
              </div>
              <input
                onChange={InputsHandler}
                required
                name="sellerCompany"
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Size
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="size"
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="input-group col-lg-12">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Poster Image Url
                </span>
              </div>
              <input
                onChange={InputsHandler}
                name="image"
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>

            <div>
              {category === "Electronics" && (
                <>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        In the Box
                      </span>
                    </div>
                    <input
                      onChange={electronicsFeaturesHandler}
                      name="inTheBox"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Model No.
                      </span>
                    </div>
                    <input
                      onChange={electronicsFeaturesHandler}
                      name="ModelNo"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Model Name
                      </span>
                    </div>
                    <input
                      onChange={electronicsFeaturesHandler}
                      name="ModelName"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Colour
                      </span>
                    </div>
                    <input
                      onChange={electronicsFeaturesHandler}
                      name="colour"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Built in Wifi
                      </span>
                    </div>
                    <input
                      onChange={electronicsFeaturesHandler}
                      name="BuiltInWifi"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Launch Year
                      </span>
                    </div>
                    <input
                      onChange={electronicsFeaturesHandler}
                      name="LaunchYear"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {category === "Fashion" && (
                <>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Fabric
                      </span>
                    </div>
                    <input
                      onChange={fashionFeaturesHandler}
                      name="fabric"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Occasion
                      </span>
                    </div>
                    <input
                      onChange={fashionFeaturesHandler}
                      name="occasion"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        colour
                      </span>
                    </div>
                    <input
                      onChange={fashionFeaturesHandler}
                      name="colour"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Pattern
                      </span>
                    </div>
                    <input
                      onChange={fashionFeaturesHandler}
                      name="pattern"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  
                </>
              )}

              {category === "HomeFurniture" && (
                <>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Sales Package
                      </span>
                    </div>
                    <input
                      onChange={homeFeaturesHandler}
                      name="salesPackage"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Material
                      </span>
                    </div>
                    <input
                      onChange={homeFeaturesHandler}
                      name="material"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Width
                      </span>
                    </div>
                    <input
                      onChange={homeFeaturesHandler}
                      name="width"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Height
                      </span>
                    </div>
                    <input
                      onChange={homeFeaturesHandler}
                      name="height"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Depth
                      </span>
                    </div>
                    <input
                      onChange={homeFeaturesHandler}
                      name="depth"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {category === "Sports" && (
                <>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Sales Package
                      </span>
                    </div>
                    <input
                      onChange={sportsFeaturesHandler}
                      name="salesPackage"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>

                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Width
                      </span>
                    </div>
                    <input
                      onChange={sportsFeaturesHandler}
                      name="width"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Height
                      </span>
                    </div>
                    <input
                      onChange={sportsFeaturesHandler}
                      name="height"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Depth
                      </span>
                    </div>
                    <input
                      onChange={sportsFeaturesHandler}
                      name="depth"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {category === "Beauty" && (
                <>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Ideal For
                      </span>
                    </div>
                    <input
                      onChange={beautyFeaturesHandler}
                      name="idealFor"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Organic Type
                      </span>
                    </div>
                    <input
                      onChange={beautyFeaturesHandler}
                      name="organicType"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Max Shell Life
                      </span>
                    </div>
                    <input
                      onChange={beautyFeaturesHandler}
                      name="maxShellLife"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                  <div className="input-group col-lg-12">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Model No.
                      </span>
                    </div>
                    <input
                      onChange={beautyFeaturesHandler}
                      name="ModelNo"
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="productsWithDifferentcolours">
              <p className="productsWithDifferentcoloursTitle">
                Add Products with different colours
              </p>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Product Name
                  </span>
                </div>
                <input
                  value={name}
                  onChange={productColoursInputHandler}
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Colour
                  </span>
                </div>
                <input
                  value={colour}
                  onChange={productColoursInputHandler}
                  name="colour"
                  required
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Stock
                  </span>
                </div>
                <input
                  value={stock}
                  onChange={productColoursInputHandler}
                  name="stock"
                  required
                  type="number"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Image FrontView Url
                  </span>
                </div>
                <input
                  value={frontView}
                  onChange={productColoursInputHandler}
                  name="frontView"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Image BackView Url
                  </span>
                </div>
                <input
                  value={backView}
                  onChange={productColoursInputHandler}
                  name="backView"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Image LeftView Url
                  </span>
                </div>
                <input
                  value={leftView}
                  onChange={productColoursInputHandler}
                  name="leftView"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="input-group col-lg-12">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Image RightView Url
                  </span>
                </div>
                <input
                  value={rightView}
                  onChange={productColoursInputHandler}
                  name="rightView"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <small
                style={{
                  color: "red",
                  display: "block",
                  marginLeft: "20px",
                  marginBottom: "10px",
                }}
              >
                {error}
              </small>
              <button
                onClick={productColoursSubmitHandler}
                type="button"
                className="btn btn-primary productcolorsbutt"
              >
                Add More
              </button>
            </div>
            <Link to="/seller/viewproducts">
              <button className="btn btn-danger productsaddbutton">
                Cancel
              </button>
            </Link>
            <button className="btn btn-success productsaddbutton" type="submit">
            {spinner ? <div class="spinner-border text-light" role="status">
  <span class="sr-only">Loading...</span>
</div> : "Submit"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default withRouter(AddingProducts)
