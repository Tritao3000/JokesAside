import React, { useState } from "react";
import RankingCard from "@components/RankingCard";

const RankingCarousel = ({ rankedPosts }) => {
  console.log(rankedPosts);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === rankedPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? rankedPosts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="">
      <button onClick={handlePrev}>Previous</button>
      <RankingCard post={rankedPosts[currentIndex]} index={currentIndex} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default RankingCarousel;
