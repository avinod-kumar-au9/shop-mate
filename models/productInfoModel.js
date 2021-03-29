import mongoose from "mongoose";

const ProductsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  coupon: {
    type: String,
  },
  brand: {
    type: String,
  },
  rating: {
    type: String,
  },
  delivered: {
    type: String,
  },
  image: {
    type: String,
  },
  size: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  sellerCompany: {
    type: String,
  },
  sellerId: {
    type: String,
  },
  features: {
    inTheBox: {
      type: String,
    },
    ModelNo: {
      type: String,
    },
    ModelName: {
      type: String,
    },
    colour: {
      type: String,
    },
    BuiltInWifi: {
      type: String,
    },
    LaunchYear: {
      type: String,
    },
    fabric: {
      type: String,
    },
    occasion: {
      type: String,
    },
    pattern: {
      type: String,
    },
    countryForOrigin: {
      type: String,
    },
    salesPackage: {
      type: String,
    },
    material: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    depth: {
      type: String,
    },
    idealFor: {
      type: String,
    },
    organicType: {
      type: String,
    },
    maxShellLife: {
      type: String,
    }
  },

  availableColours: [
    {
      name: {
        type: String,
      },
      colour: {
        type: String,
      },
      stock: {
        type: Number,
      },
      frontView: {
        type: String,
      },
      backView: {
        type: String,
      },
      leftView: {
        type: String,
      },
      rightView: {
        type: String,
      }
    }
  ],

  reviews: [
    {
      name: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      rating: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  warranty: {
    WarrantyServiceType: {
      type: String,
    },
    WarrantySummary: {
      type: String,
    },
    CoveredInWarranty: {
      type: String,
    },
    NotCoveredInWarranty: {
      type: String,
    },
    DomesticWarranty: {
      type: String,
    },
  }
});

const Products = mongoose.model("products", ProductsSchema);

export default Products;
