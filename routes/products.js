import express from "express";
import {
  discountslist,
  productslist,
  particularproductinfo,
  productslistbysubcategory,
  productslistbycategory,
  similarproducts,
  addproducts,
  updateproducts,
  deleteproduct,
  postcomments,
  ProductStockUpdate,

} from "../controllers/productsInfo/products.js";

const router = express.Router();

router.get("/discountslist", discountslist);
router.get("/productslist", productslist);
router.get("/singleproductinfo/:id", particularproductinfo);
router.get("/productslistbysubcategory", productslistbysubcategory);
router.get("/productslistbycategory", productslistbycategory);
router.get("/similarproducts", similarproducts);
router.post("/addproducts", addproducts);
router.put("/updateproducts", updateproducts);
router.delete("/deleteproduct/:id", deleteproduct);
router.patch("/comment/:id",postcomments)
router.post("/stockupdate",ProductStockUpdate)



export default router;
