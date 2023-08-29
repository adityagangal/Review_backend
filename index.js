
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import { error } from "console";

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.DB_USERNAME;
const mongo_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://adityagangal03:aditya@cluster0.7t8izbf.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })