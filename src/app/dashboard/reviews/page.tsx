import { Star } from "lucide-react";
import React from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      customer: "Alice Brown",
      rating: 5,
      comment: "Amazing food and great service! Highly recommended.",
      date: "2024-01-15",
      dish: "Margherita Pizza",
    },
    {
      id: 2,
      customer: "Bob Davis",
      rating: 4,
      comment: "Good food, but the wait time was a bit long.",
      date: "2024-01-14",
      dish: "Chicken Burger",
    },
    {
      id: 3,
      customer: "Carol White",
      rating: 5,
      comment: "Perfect pasta! Will definitely come back.",
      date: "2024-01-13",
      dish: "Pasta Carbonara",
    },
    {
      id: 4,
      customer: "David Lee",
      rating: 3,
      comment: "Average experience, room for improvement.",
      date: "2024-01-12",
      dish: "Caesar Salad",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.customer}
                </h3>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{review.dish}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
