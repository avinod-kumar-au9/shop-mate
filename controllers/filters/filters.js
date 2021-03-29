import Products from "../../models/productInfoModel.js";

export const uniquebrands = async (req, res) => {
  if (req.query.category) {
    try {
      var uniqueBrands = await Products.distinct("brand", {
        category: new RegExp(req.query.category),
      });
      res.status(200).send(uniqueBrands);
    } catch (err) {
      res.status(404);
    }
  } else {
    try {
      var uniqueBrands = await Products.distinct("brand", {
        subCategory: new RegExp(req.query.subCategory),
      });
      
      res.status(200).send(uniqueBrands);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  }
  

  //   option 2
  /*
      try {
        var uniqueBrands = await Products.aggregate([
          { $match: { subCategory: new RegExp(req.query.category) } },
          { $group: { _id: "$brand" } }
          
        ]);
        res.status(200).send(uniqueBrands);
      } catch (err) {
        console.log(err);
        res.status(404);
      }
      */
};

export const uniqueoffers = async (req, res) => {
  if (req.query.category) {
    try {
      var uniqueOffers = await Products.distinct("coupon", {
        category: new RegExp(req.query.category),
      });
      res.status(200).send(uniqueOffers);
    } catch (err) {
     
      res.status(404);
    }
  } else {
    try {
      var uniqueOffers = await Products.distinct("coupon", {
        subCategory: new RegExp(req.query.subCategory),
      });
      res.status(200).send(uniqueOffers);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  }
};

export const uniqueprices = async (req, res) => {
  try {
    var uniquePrices = await Products.where("price")
      .gte(req.query.min)
      .lte(req.query.max);

    res.status(200).send(uniquePrices);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const uniquecategory = async (req, res) => {
  if (req.query.category) {
    try {
      var uniqueCategory = await Products.distinct("category", {
        category: new RegExp(req.query.category),
      });
      res.status(200).send(uniqueCategory);
    } catch (err) {
      res.status(404);
    }
  } else {
    try {
      var uniqueCategory = await Products.distinct("category", {
        subCategory: new RegExp(req.query.subCategory),
      });
      res.status(200).send(uniqueCategory);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  }
};

export const uniquesubcategory = async (req, res) => {
  if (req.query.subCategory) {
    try {
      var uniquesubCategory = await Products.distinct("subCategory", {
        subCategory: new RegExp(req.query.subCategory),
      });
      res.status(200).send(uniquesubCategory);
    } catch (err) {
      res.status(404);
    }
  } else {
    try {
      var uniquesubCategory = await Products.distinct("subCategory", {
        category: new RegExp(req.query.category),
      });
      res.status(200).send(uniquesubCategory);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  }
};

export const filterbycategorypricebrandoffers = async (req, res) => {
  if (
    (req.body.category || req.body.subCategory) &&
    req.body.minPrice &&
    req.body.maxPrice &&
    req.body.brand.length > 0 &&
    req.body.coupon
  ) {
    console.log("1");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        price: { $gte: req.body.minPrice, $lte: req.body.maxPrice },
        brand: { $in: req.body.brand },
        coupon: req.body.coupon,
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  } else if (
    (req.body.category || req.body.subCategory) &&
    req.body.minPrice &&
    req.body.maxPrice &&
    req.body.brand.length > 0
  ) {
    console.log("2");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        price: { $gte: req.body.minPrice, $lte: req.body.maxPrice },
        brand: { $in: req.body.brand },
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  } else if (
    (req.body.category || req.body.subCategory) &&
    req.body.brand.length > 0 &&
    req.body.coupon
  ) {
    console.log("3");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        brand: { $in: req.body.brand },
        coupon: req.body.coupon,
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  } else if (
    (req.body.category || req.body.subCategory) &&
    req.body.minPrice &&
    req.body.maxPrice &&
    req.body.coupon
  ) {
    console.log("4");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        price: { $gte: req.body.minPrice, $lte: req.body.maxPrice },
        coupon: req.body.coupon,
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  } else if (
    (req.body.category || req.body.subCategory) &&
    req.body.minPrice &&
    req.body.maxPrice
  ) {
    console.log("entered");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        price: { $gte: req.body.minPrice, $lte: req.body.maxPrice },
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  } else if (
    (req.body.category || req.body.subCategory) &&
    req.body.brand.length > 0
  ) {
    console.log("5");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        brand: { $in: req.body.brand },
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  } else if ((req.body.category || req.body.subCategory) && req.body.coupon) {
    console.log("6");
    try {
      const filteredList = await Products.find({
        $or: [
          { category: req.body.category },
          { subCategory: req.body.subCategory },
        ],
        coupon: req.body.coupon,
      });

      res.status(200).send(filteredList);
    } catch (err) {
      res.status(404).send({ error: "something went wrong, comeback later" });
    }
  }
};

export const searchfilter = async (req, res) => {
  
  try {
    const searchResult = await Products.aggregate([
      {
        $match: {
          $or: [
            { brand: { $regex: `${req.params.val}`, $options: "i" } },
            { name: { $regex: `${req.params.val}`, $options: "i" } },
            { subCategory: { $regex: `${req.params.val}`, $options: "i" } },
          ],
        },
        
      },
      { $group: { _id: "$subCategory" ,brand: { $first: "$brand" },name: { $first: "$name" },image: { $first: "$image" },subCategory: { $first: "$subCategory" }} },
      {$limit:5}
    ]);
    res.status(200).send(searchResult);
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};



export const filterbypricesubcategory = async (req, res) => {
  const {subCategory,price} = req.body

  try {
    const list=await Products.find({subCategory:subCategory}).sort({price: parseInt(price)})
    res.status(200).send(list);
    
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};

export const filterbypricecategory = async (req, res) => {

  const {category,price} = req.body
  try {
    const list=await Products.find({category:category}).sort({price: parseInt(price)})
   
    res.status(200).send(list);

  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};