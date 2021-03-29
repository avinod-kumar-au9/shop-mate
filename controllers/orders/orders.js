import Orders from "../../models//ordersModels.js";

export const placeOrders = async (req, res) => {
    try {
        const order = await Orders.insertMany(req.body);
        res.status(200).send(order);
      } catch (err) {
        res.status(404)
      }
}

export const perticularPersonOrderList = async (req, res) => {
  try {
    Orders.find({'userId':req.params.id},(err,result)=>{
      res.status(200).send(result);
    })
  } catch (err) {
    res.status(404);
  }
}

export const orderslist = async (req, res) => {
  
  try {
    const result=await Orders.find().sort({orderedDate:-1})
      res.status(200).send(result);
    
  } catch (err) {
    res.status(404);
  }
}


export const updateorderslist = async (req, res) => {
  try {
    const result=await Orders.findByIdAndUpdate(req.body.id,{
      orderConformStatus:req.body.orderConformStatus,
      deliveredDate:req.body.deliveredDate
    },{ new: true })  
      res.status(200).send(result);   
  } catch (err) {
    res.status(404);
  }
}



