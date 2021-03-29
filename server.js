
import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./config/db.js"
import bodyParser from "body-parser"
import FiltersRoute from "./routes/filter.js"
import ProductsRoute from "./routes/products.js"
import UsersRoute from "./routes/users.js"
import SellerUsersRoute from "./routes/sellerUsers.js"
import PaymentRoute from "./routes/stripepayment.js"
import OrderRoute from "./routes/order.js"
import cors from "cors"
import path from "path"


dotenv.config()
ConnectDB()
const app= express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/api",FiltersRoute)
app.use("/api",ProductsRoute)
app.use("/api/customers",UsersRoute)
app.use("/api/seller",SellerUsersRoute)
app.use("/api",PaymentRoute)
app.use("/api",OrderRoute)

const ImportData= async()=>{

    try{
        // await Products.deleteMany()

        // const sample= ProductsData.map(product=>{
        //     return {...product}
        // })

        // await Products.insertMany(sample)
        // console.log(JSON.stringify(ProductsData));

        console.log("Data Imported");
       

    }
    catch(err){
        console.log(err);
        // process.exit(1)
    }
}

// ImportData()




const __dirname= path.resolve()

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send("api is running")
    })
}


const port = process.env.PORT 

app.listen(port,(err)=>{
    if (err) throw err
    console.log(`server is up and running...${port}`);
})

