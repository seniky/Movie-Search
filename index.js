import app from "./server.js" //uses code in server file
import mongodb from "mongodb"
import dotenv from "dotenv"
import ReviewsDAO from "./dao/reviewsDAO.js" //data access object

dotenv.config();
const MongoClient = mongodb.MongoClient //to work with database
const mongo_username = process.env.DB_USERNAME
const mongo_password = process.env.DB_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@movie-reviews.iim7be6.mongodb.net/?retryWrites=true&w=majority&appName=Movie-Reviews`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //max amount of people that can be connected
        wtimeoutMS: 2500, //max time to connect before timeout in ms
    }
)

.catch(err => {
    console.error(err.stack) //log error in stack
    process.exit(1) //end program
})
.then(async client => {
    await ReviewsDAO.injectDB(client) //send ReviewsDAO DB connection
    app.listen(port, () => { //to start program
        console.log(`listening on port ${port}`)
    })
})