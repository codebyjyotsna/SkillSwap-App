import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewsList({ skillId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${skillId}`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [skillId]);

  return (
    <div className="reviews-list">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="review">
          <p><strong>{review.user.name}:</strong> {review.comment}</p>
          <p>Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
