import mongodb from "mongodb"
import { ObjectId } from 'mongodb'

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews){ //if there's already a DB connection
            return
        }

        try {
            reviews = await conn.db("reviews").collection("reviews")
        }

        catch (e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review){
        try{
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc) //insert doc into DB
        }

        catch (e){
            console.error(`Unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async getReview(reviewId){
        try{
            return await reviews.findOne({_id: new ObjectId(String(reviewId))}) //find post by id of doc
        }

        catch (e){
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewId, user, review){
        try{
            const updateResponse = await reviews.updateOne({_id: new ObjectId(String(reviewId))}, {$set: {user: user, review: review}}) //find post and update/set features
            return updateResponse
        }

        catch (e){
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne({_id: new ObjectId(String(reviewId)),}) //delete post by id

            return deleteResponse
        }

        catch (e){
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }

    static async getReviewsByMovieId(movieId){
        try{
            const cursor = await reviews.find({movieId: parseInt(movieId)}) //gets every movie that matches id
            return cursor.toArray()
        }

        catch (e){
            console.error(`Unable to get review: ${e}`)
            return {error: e}
        }
    }
}