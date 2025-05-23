import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router() //routes request to diff parts of application when url is accessed

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id") //id is base on moview, you can route to the following:
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

//router.route("/").get((req, res) => res.send("hello world")) //send message to whoever requests the route

export default router //to import route in other biome