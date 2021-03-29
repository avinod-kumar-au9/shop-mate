import React, { useEffect, useState, useRef } from "react";
import Pagination from "react-js-pagination";
import "./styles/admin.scss";

const Admin = (props) => {
  const { allorderslist, callbackafterupdateclick, updateordersList } = props;
  const [postPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [state, setstate] = useState({
    id: "",
    deliveredDate: new Date(),
    orderConformStatus: "",
  });
  const [productname, setproductname] = useState("");
  const [err, seterr] = useState("");
  const [spinner, setspinner] = useState(false);
  const closemodelafterupdate = useRef(null);
  const [ordersList, setordersList] = useState("");
  const [qtysort, setqtysort] = useState(1);
  const [pricesort, setpricesort] = useState(1);
  const [statussort, setstatussort] = useState(1);
  const [update,setupdate]=useState("Update")

  const indexOfLastPost = activePage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const FilteredData =
    ordersList && ordersList.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (allorderslist) {
      setordersList(allorderslist);
    }
  }, [allorderslist]);


  const editclickHandler = (idx, id) => {
    setproductname(FilteredData[idx].name);
    setstate({
      ...state,
      id: id,
    });
    seterr("");
  };

  const modalinputhandler = (e) => {
    setstate({
      ...state,
      orderConformStatus: e.target.value,
    });
  };

  const updateHandler = () => {
    if (state.orderConformStatus !== "Delivered") {
      seterr("no changes found");

      setTimeout(() => {
        closemodelafterupdate.current.click();
      }, 1000);
    } else {
      seterr("");
      callbackafterupdateclick(state);
      setspinner(true);
    }
  };

  useEffect(() => {
    if (updateordersList) {
      setspinner(false);
      setupdate("Updated Successfully")
      setTimeout(() => {
        closemodelafterupdate.current.click();
        setupdate("Update")
      }, 1000);
      setstate({
        ...state,
        orderConformStatus: "",
      });
    }
  }, [updateordersList]);


  const rendertableRows = () => {
    return (
      FilteredData &&
      FilteredData.map((product, idx) => {
        return (
          <tr key={idx}>
            <td className="productimgrcol">
              <img className="adminproductimage" src={product.img} />
            </td>
            <td>
              {product.name.charAt(0).toUpperCase() +
                product.name.slice(1).substring(0, 45)}
            </td>
            <td>{product.quantity}</td>
            <td className="productpriceRow">₹ {product.price}</td>
            <td style={{color: product.orderConformStatus=== "Pending" ? "red" : "#626299"}} className="productstatusRow">{product.orderConformStatus}</td>
            <td>
              {product.orderConformStatus === "Pending" ? (
                
                <i
                onClick={() => editclickHandler(idx, product._id)}
                  data-toggle="modal"
                  data-target="#exampleModal"
                className="ri-edit-box-line productactionRow"
              ></i>
              ) : (
                ""
              )}
            </td>
          </tr>
        );
      })
    );
  };

  const qtysortHandler = () => {
    if (qtysort === 1) {
      const myData = [...ordersList].sort((a, b) =>
        parseInt(a.quantity) > parseInt(b.quantity) ? 1 : -1
      );
      setordersList(myData);
      setqtysort(-1);
    } else {
      const myData = [...ordersList].sort((a, b) =>
        parseInt(a.quantity) > parseInt(b.quantity) ? -1 : 1
      );
      setordersList(myData);
      setqtysort(1);
    }
  };

  const pricesortHandler = () => {
    if (pricesort === 1) {
      const myData = [...ordersList].sort((a, b) =>
        parseInt(a.price) > parseInt(b.price) ? 1 : -1
      );
      setordersList(myData);
      setpricesort(-1);
    } else {
      const myData = [...ordersList].sort((a, b) =>
        parseInt(a.price) > parseInt(b.price) ? -1 : 1
      );
      setordersList(myData);
      setpricesort(1);
    }
  };

  const statussortHandler = () => {
    if (statussort === 1) {
      const myData = [...ordersList].sort((a, b) =>
        a.orderConformStatus > b.orderConformStatus ? 1 : -1
      );
      setordersList(myData);
      setstatussort(-1);
    } else {
      const myData = [...ordersList].sort((a, b) =>
        a.orderConformStatus > b.orderConformStatus ? -1 : 1
      );
      setordersList(myData);
      setstatussort(1);
    }
  };

  return (
    <div className="adminmaindiv">
    <div className="adminpage">
      <h4 className="adminpagetitle" style={{backgroundColor:"white",marginBottom:"0px",padding:"20px 0",paddingLeft:"30px"}}>Orders List <span className="orderslistresultsdisplay">({`${ordersList && ordersList.length} results found`})</span></h4>
      {ordersList.length > 0 ? <div className="orderslisttable">
        <table className="table">
          <thead>
            <tr >
              <th className="productimagecol " scope="col">
                Product
              </th>
              <th className="productnamecol" scope="col">
                Name
              </th>
              <th
                onClick={qtysortHandler}
                className="productqtycol"
                scope="col"
              >
                Qty
                <span className='pt-5 mt-5'>
                <span className="material-icons adminsortarrows">
                  unfold_more
                </span></span>
              </th>
              <th
                onClick={pricesortHandler}
                className="productpricecol"
                scope="col"
              >
                Price
                <span className="material-icons adminsortarrows">
                  unfold_more
                </span>
              </th>
              <th
                onClick={statussortHandler}
                className="productstatuscol"
                scope="col"
              >
                Status
                <span className="material-icons adminsortarrows">
                  unfold_more
                </span>
              </th>
              <th className="productactioncol" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{rendertableRows()}</tbody>
        </table>
      </div> : <div style={{backgroundColor:"white",textAlign:"center",height:"90px"}}>No Data Found</div>
}
      <div className="paginatioRow">
        <div className="paginatioCol">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={postPerPage}
            totalItemsCount={allorderslist && allorderslist.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {spinner ? (
                  <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Id
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  disabled
                  value={state.id}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-default">
                    Name
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  disabled
                  value={
                    productname.charAt(0).toUpperCase() +
                    productname.slice(1).substring(0, 30)
                  }
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">
                    Status
                  </label>
                </div>
                <select
                  onChange={modalinputhandler}
                  className="custom-select"
                  id="inputGroupSelect01"
                  value={state.orderConformStatus}
                  
                >
                  <option defaultValue>
                    Choose...
                  </option>
                  <option>Delivered</option>
                </select>
              </div>
              <small style={{ color: "red" }}>{err}</small>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                style={{ display: "none" }}
                ref={closemodelafterupdate}
              >
                Close
              </button>
              <button
                onClick={updateHandler}
                type="button"
                className="btn btn-primary"
              >
                {update}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admin;
