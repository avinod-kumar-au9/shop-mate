import React, { useState, useEffect } from "react";
import "./styles/addproducts.scss";
import {Link} from "react-router-dom"
import {withRouter} from "react-router-dom"


const UpdateProducts = (props) => {
  const { FullDataSubmitHandler,SingleProductApi,spinner } = props;
  const [state, setstate] = useState("");
  const [cnt, setcnt] = useState(0);
  
  


  useEffect(()=>{
    
   
    setstate(SingleProductApi[0])

  },[SingleProductApi])

  


  const InputsHandler = (e) => {
  
   
    setstate({
      ...state,
      [e.target.name]:
        e.target.name ===  e.target.name === "price" ? parseInt(e.target.value): e.target.value
    });
  };

  const electronicsFeaturesHandler = (e) => {
    
    setstate({
      ...state,
      features: {
        ...state.features,
        [e.target.name]: e.target.value,
      },
    });
  };

  const fashionFeaturesHandler = (e) => {
    
    setstate({
      ...state,
      features: {
        ...state.features,
        [e.target.name]: e.target.value,
      },
    });
  };

  const homeFeaturesHandler = (e) => {
    setstate({
      ...state,
      features: {
        ...state.features,
        [e.target.name]: e.target.value,
      },
    });
  };

  const sportsFeaturesHandler = (e) => {
    setstate({
      ...state,
      features: {
        ...state.features,
        [e.target.name]: e.target.value,
      },
    });
  };

  const beautyFeaturesHandler = (e) => {
    setstate({
      ...state,
      features: {
        ...state.features,
        [e.target.name]: e.target.value,
      },
    });
  };

 


  const productColoursInputHandler = (e) => {
   

    let items = [...state.availableColours];
    let item = { ...items[cnt] };

    switch (e.target.name) {
      case "name":
        item.name = e.target.value;
        items[cnt] = item;
        
        setstate({
          ...state,
          availableColours: items,
        });
        break;
      case "colour":
        item.colour = e.target.value;
        items[cnt] = item;
        console.log(items);
        setstate({
          ...state,
          availableColours: items,
        });
        break;
      case "stock":
        item.stock = parseInt(e.target.value)
        items[cnt] = item;
        
        setstate({
          ...state,
          availableColours: items,
        });
        break;
      case "frontView":
        item.frontView = e.target.value;
        items[cnt] = item;
        console.log(items);
        setstate({
          ...state,
          availableColours: items,
        });
        break;
      case "backView":
        item.backView = e.target.value;
        items[cnt] = item;
        console.log(items);
        setstate({
          ...state,
          availableColours: items,
        });
        break;
      case "leftView":
        item.leftView = e.target.value;
        items[cnt] = item;
        console.log(items);
        setstate({
          ...state,
          availableColours: items,
        });
        break;
      case "rightView":
        item.rightView = e.target.value;
        items[cnt] = item;
        console.log(items);
        setstate({
          ...state,
          availableColours: items,
        });
        break;
    }
  };

  const productColoursSubmitHandler = () => {  
    setcnt(cnt + 1);
  };


  return (
    <form className="sellerForm" onSubmit={(e) => FullDataSubmitHandler(e,state)}>
      <div className="sellerRow">
        <div className="sellerCol">
          <h3 className="sellerTitle">Update Listings in Shop-Mate</h3>
          <div className="col-lg-12  selectDiv">
            <select
              className="custom-select"
              required
              value={state ? state.category : ""}
             
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
              className="custom-select"
              required
              value={state ? state.subCategory : ""}
            >
              <option defaultValue value="">
                Choose Sub-Category
              </option>

              {state && state.category === "Electronics" && (
                <>
                  {" "}
                  <option>Mobiles</option>
                  <option>Laptops</option>
                  <option>Televisions</option>{" "}
                </>
              )}

              {state && state.category === "Fashion" && (
                <>
                  {" "}
                  <option>Mens</option>
                  <option>Womens</option>
                  <option>Kids</option>{" "}
                </>
              )}

              {state && state.category === "HomeFurniture" && (
                <>
                  {" "}
                  <option>Kitchen</option>
                  <option>Living Room</option>
                  <option>Home Decor</option>{" "}
                </>
              )}

              {state && state.category === "Sports" && (
                <>
                  {" "}
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Skating</option>{" "}
                </>
              )}

              {state && state.category === "Beauty" && (
                <>
                  {" "}
                  <option>Personal Hygiene</option>
                  <option>Hair care</option>{" "}
                </>
              )}
            </select>
          </div>
        </div>
        {state && state.subCategory ? (
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
                value={state ? state.name : ""}
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
                value={state ? state.description : ""}
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
                value={state ? state.price : ""}
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
                value={state ? state.coupon : ""}
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
                value={state ? state.brand : ""}
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
                value={state ? state.delivered : ""}
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
                value={state ? state.rating : ""}
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
                value={state ? state.sellerCompany : ""}
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
                value={state ? state.size : ""}
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
                value={state ? state.image : ""}
                required
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>

            <div>
              {state && state.category === "Electronics" && (
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
                      value={state ? state.features.inTheBox : ""}
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
                      value={state ? state.features.ModelNo : ""}
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
                      value={state ? state.features.ModelName : ""}
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
                      value={state ? state.features.colour : ""}
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
                      value={state ? state.features.BuiltInWifi : ""}
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
                      value={state ? state.features.LaunchYear : ""}
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {state && state.category === "Fashion" && (
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
                      value={state ? state.features.fabric : ""}
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
                      value={state ? state.features.occasion : ""}
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
                      value={state ? state.features.colour : ""}
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
                      value={state ? state.features.pattern : ""}
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
                        Country for Origin
                      </span>
                    </div>
                    <input
                      onChange={fashionFeaturesHandler}
                      name="countryForOrigin"
                      value={state ? state.features.countryForOrigin : ""}
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {state && state.category === "HomeFurniture" && (
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
                      value={state ? state.features.salesPackage : ""}
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
                      value={state ? state.features.material : ""}
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
                      value={state ? state.features.width : ""}
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
                      value={state ? state.features.height : ""}
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
                      value={state ? state.features.depth : ""}
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {state && state.category === "Sports" && (
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
                      value={state ? state.features.salesPackage : ""}
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
                      value={state ? state.features.width : ""}
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
                      value={state ? state.features.height : ""}
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
                      value={state ? state.features.depth : ""}
                      required
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </>
              )}

              {state && state.category === "Beauty" && (
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
                      value={state ? state.features.idealFor : ""}
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
                      value={state ? state.features.organicType : ""}
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
                      value={state ? state.features.maxShellLife : ""}
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
                      value={state ? state.features.ModelNo : ""}
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
                  value={state ? state.availableColours[cnt].name : ""}
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
                  value={state ? state.availableColours[cnt].colour : ""}
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
                  value={state && state.availableColours[cnt].stock}
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
                  value={state ? state.availableColours[cnt].frontView : ""}
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
                  value={state ? state.availableColours[cnt].backView : ""}
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
                  value={state ? state.availableColours[cnt].leftView : ""}
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
                  value={state ? state.availableColours[cnt].rightView : ""}
                  onChange={productColoursInputHandler}
                  name="rightView"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              
              <button
                onClick={productColoursSubmitHandler}
                type="button"
                className="btn btn-primary productcolorsbutt"
                style={{
                  backgroundColor: state
                    ? state.availableColours.length === cnt + 1
                      ? "#7a7a9b"
                      : "#5656bb"
                    : "#5656bb",
                  color: state
                    ? state.availableColours.length === cnt + 1
                      ? "#b8aeae"
                      : "ffffff"
                    : "ffffff",
                }}

                disabled={state
                  ? state.availableColours.length === cnt + 1
                    ? true
                    : false
                  : false}
              >
                Next
              </button>
            </div>
            <Link to="/seller/viewproducts">
              <button className="btn btn-danger productsaddbutton">
                Cancel
              </button>
            </Link>

            <button className="btn btn-success productsaddbutton" type="submit">
            {spinner ? <div className="spinner-border text-light" role="status">
  <span className="sr-only">Loading...</span>
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



export default withRouter(UpdateProducts)
