import express from "express";
import {
  uniquebrands,
  uniqueoffers,
  uniqueprices,
  filterbycategorypricebrandoffers,
  searchfilter,
  uniquecategory,
  uniquesubcategory,
  filterbypricesubcategory,
  filterbypricecategory
} from "../controllers/filters/filters.js";


const router = express.Router();

router.get("/uniquebrands", uniquebrands);
router.get("/uniqueoffers", uniqueoffers);
router.get("/uniqueprices", uniqueprices);
router.get("/uniquecategory", uniquecategory);
router.get("/uniquesubcategory", uniquesubcategory);
router.post("/multiplefilters", filterbycategorypricebrandoffers);
router.get("/search/:val", searchfilter);
router.post("/filterbypricesubcategory", filterbypricesubcategory);
router.post("/filterbypricecategory", filterbypricecategory);

export default router;
