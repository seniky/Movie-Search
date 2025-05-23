import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"
dotenv.config() //load environment variables from .env file
import mongodb from "mongodb" //import mongodb
const app = express() //load express

app.use(cors())
app.use(express.json()) //Allows server to accept json in the body of a request

app.use("/api/v1/reviews", reviews) //url that you acess to get and receive info (api/version/name). Route is reviews
app.use("/{*any}", (req, res) => res.status(404).json({error: "not found"})) //for when accessing url not included in route file

export default app //export app as a module to connect diff files together