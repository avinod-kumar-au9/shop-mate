import Products from "../../models/productInfoModel.js";

export const addproducts = async (req, res) => {
  try {
    const create = new Products(req.body);
    const createdProducts = await create.save();
    res.send(createdProducts);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const updateproducts = async (req, res) => {
  const {
    features,
    warranty,
    reviews,
    category,
    subCategory,
    name,
    description,
    price,
    coupon,
    brand,
    delivered,
    image,
    rating,
    sellerCompany,
    sellerId,
    size,
    availableColours,
  } = req.body;
  try {
    const data = await Products.findByIdAndUpdate(
      req.body._id,
      {
        features,
        warranty,
        reviews,
        category,
        subCategory,
        name,
        description,
        price,
        coupon,
        brand,
        delivered,
        image,
        rating,
        sellerCompany,
        sellerId,
        size,
        availableColours,
      },
      { new: true }
    );

    res.send({success:"success"});
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const deleteproduct = async (req, res) => {
  try {
    const Deleteproduct = await Products.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({success:"success"});
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const discountslist = async (req, res) => {
  try {
    const DiscountsList = await Products.find({ coupon: "SAVE 50" });

    res.status(200).send(DiscountsList);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};
export const productslist = async (req, res) => {
  try {
    const productsList = await Products.find();
    res.status(200).send(productsList);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const particularproductinfo = async (req, res) => {
  try {
    Products.find({ _id: req.params.id },(err,result)=>{
      res.status(200).send(result);
    });
    
   
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const productslistbysubcategory = async (req, res) => {
  try {
    const SubCategoryList = await Products.find({
      subCategory: req.query.subCategory,
    });
    res.status(200).send(SubCategoryList);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const productslistbycategory = async (req, res) => {
  try {
    const CategoryList = await Products.find({ category: req.query.category });
    res.status(200).send(CategoryList);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const similarproducts = async (req, res) => {
  try {
    const Singleproduct = await Products.find({ _id: req.query.id });
    const SubcategoryList = await Products.find({
      subCategory: Singleproduct[0].subCategory,
    });

    res.status(200).send(SubcategoryList);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const postcomments = async(req,res)=>{
  const id=req.params.id
    try {
      Products.findByIdAndUpdate(id,
        {$push: {"reviews": req.body}},
        {new: true,upsert:true},(err,data)=>{
            res.status(200).send(data)      
      })
      } catch {
        res.status(404).send(err)
      }
}


export const  ProductStockUpdate = async (req, res) => {
  try {
    const array = req.body;
    const ids = [];
    for (var i = 0; i < array.length; i++) {
      ids.push(array[i].productId);
    }

    const list = await Products.find({ _id: { $in: ids } });
    for (var i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].availableColours.length; j++) {
        for (var k = 0; k < array.length; k++) {
          if (list[i].availableColours[j].colour == array[k].color) {
            list[i].availableColours[j].stock = list[i].availableColours[j].stock - array[k].quantity;
          }
        }
      }

      const updated = await list[i].save();
    }

    res.send(list);

  } catch (err) {
    res.send(404);
  }
};












