import { useEffect, useState } from "react";
import "./carousel.styles.scss";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start at 0, not 1

  useEffect(() => {
    // Don't set up interval if there's no data or only 1 image
    if (!data || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevState) => {
        // If at the last image, go back to 0
        if (prevState === data.length - 1) {
          return 0;
        } else {
          return prevState + 1;
        }
      });
    }, 8000);

    // Cleanup function - moved outside the setInterval callback
    return () => {
      clearInterval(interval);
    };
  }, [data.length]); // Add data.length as dependency

  // Handle empty data
  if (!data || data.length === 0) {
    return <div className="carousel-wrapper no-image">No image available</div>;
  }

  // Handle invalid currentIndex
  const safeIndex = currentIndex >= data.length ? 0 : currentIndex;

  console.log("Current index:", safeIndex);
  console.log("Image URL:", data[safeIndex]);

  return (
    <div className="carousel-wrapper">
      <img
        src={data[safeIndex]}
        alt="Room view"
        onError={(e) => {
          console.error("Failed to load image:", data[safeIndex]);
          e.target.style.display = "none";
        }}
        onLoad={() =>
          console.log("Image loaded successfully:", data[safeIndex])
        }
      />
    </div>
  );
};

export default Carousel;

// import { useEffect, useState } from "react";
// import "./carousel.styles.scss";
// import { current } from "@reduxjs/toolkit";

// const Carousel = ({ data }) => {
//   const [currentIndex, setCurrentIndex] = useState(1);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevState) => {
//         if (prevState == data.length - 1) {
//           return (prevState = 0);
//         } else {
//           return prevState + 1;
//         }
//       });

//       return () => {
//         clearInterval(interval);
//       };
//     }, 8000);
//   }, []);

//   console.log(currentIndex);
//   return (
//     <div className="carousel-wrapper">
//       <img src={data[currentIndex]} alt="data" />
//     </div>
//   );
// };

// export default Carousel;
