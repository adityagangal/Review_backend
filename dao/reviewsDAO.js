import mongodb from "mongodb";
// Import necessary modules


let reviews


export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`);
    }
  }


  static async addReview(movieId, user, review ,rating) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
        rating: rating,
      };
      console.log("adding");
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      const ObjectId = new mongodb.ObjectId(reviewId) 
      return await reviews.findOne({ _id:ObjectId }); // Use new ObjectId()
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, user, review, rating) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) }, // Use new ObjectId()
        { $set: { user: user, review: review , rating: rating} }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId), // Use new ObjectId()
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) });
      return cursor.toArray();
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
}
