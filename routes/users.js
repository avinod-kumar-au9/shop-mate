import express from "express";
import {
  register,
  users,
  login,
  mailregistercheck,
  googlelogin,
  forgotpsw,
  profileedit,
  userinfo,
  uploadprofileimg,
  addcart,
  cartQuantityUpdate,
  cartItemDelete,
  addDeliveryAdress,
  discountamtAdded,
  cartAlldataRemove,

} from "../controllers/registerUsers/users.js";

const router = express.Router();

router.post("/register", register);
router.get("/userdata", users);
router.post("/login", login);
router.post("/emailregistercheck",mailregistercheck);
router.post("/googlelogin", googlelogin);
router.patch("/forgotpsw", forgotpsw);
router.patch("/profile", profileedit);
router.get("/userinfo", userinfo);
router.put("/uploadprofileimg", uploadprofileimg);
router.patch("/addcart/:id",addcart)
router.patch("/updatecart/:id",cartQuantityUpdate)
router.patch("/cartitemdelete/:id",cartItemDelete)
router.patch("/deliveryadress/:id",addDeliveryAdress)
router.patch("/discountadd/:id",discountamtAdded)
router.patch("/clearcart/:id",cartAlldataRemove)

export default router;
