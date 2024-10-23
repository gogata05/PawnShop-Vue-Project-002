// client\src\helpers\starsGenerator.js
const starsGenerator = input => {
  let stars = "";
  if (input >= 1 && input <= 3) {
    stars = "⭐";
  } else if (input >= 4 && input <= 6) {
    stars = "⭐⭐";
  } else if (input >= 7 && input <= 9) {
    stars = "⭐⭐⭐";
  } else if (input >= 10 && input <= 12) {
    stars = "⭐⭐⭐⭐";
  } else if (input >= 13) {
    stars = "⭐⭐⭐⭐⭐";
  }

  return stars;
};

export default starsGenerator;
