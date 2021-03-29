import React, { useEffect } from "react";
import Banner from "../Components/Home/Banner";
import BestElectronics from "../Components/Home/BestElectronics";
import { connect } from "react-redux";
import { DiscountsList, BestElectronicsList } from "../Actions/homeActions";
import Menu from "../Components/Home/menu";
import TendingOffers from "../Components/Home/TrendingOffers";
import Loader from "./Loader";


const Home = (props) => {
  const { HomeStoreInfo } = props;

  useEffect(() => {
    if (!HomeStoreInfo.DiscountsApi) {
      props.dispatch(DiscountsList());
    }
    if (!HomeStoreInfo.BestElectronicsApi) {
      props.dispatch(BestElectronicsList());
    }
  }, []);

  const CallbackDiscountsApiUpdate = (callBackval) => {
    props.dispatch({
      type: "DISCOUNTSlIST",
      payload: callBackval,
    });
  };

  const CallbackElectronicsApiUpdate = (callBackval) => {
    props.dispatch({
      type: "BESTELECTRONICSlIST",
      payload: callBackval,
    });
  };

  if (HomeStoreInfo.DiscountsApi && HomeStoreInfo.BestElectronicsApi && HomeStoreInfo.DiscountsApi.length > 0 &&
    HomeStoreInfo.BestElectronicsApi.length > 0) {
      return (
        <React.Fragment>
          <Menu />
          <Banner />
          <BestElectronics
            BestElectronics={HomeStoreInfo.BestElectronicsApi}
            ElectronicsApiUpdate={CallbackElectronicsApiUpdate}
          />
          
          <TendingOffers
            Discounts={HomeStoreInfo.DiscountsApi}
            DiscountsApiUpdate={CallbackDiscountsApiUpdate}
          />
        </React.Fragment>
      );
    } else {
      return (
        <Loader/>
      );
    }
  
};

function mapStateToProps(state) {
  return {
    HomeStoreInfo: state.HomeReducer
  };
}

export default connect(mapStateToProps)(Home);
