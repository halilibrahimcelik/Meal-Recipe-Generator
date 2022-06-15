const searchInput = document.querySelector("#search");
const submitBtn = document.querySelector("#submit");
const randomBtn = document.querySelector("#random");
const mealElement = document.querySelector("#meals");
const ResultHeading = document.querySelector("#result-heading");
const singleMealElement = document.querySelector("#single-meal");
console.log(submitBtn);
//Event Listeners
submitBtn.addEventListener("submit", searchMealHandler);

//Functions
function searchMealHandler(e) {
  e.preventDefault();

  //!clear single meal
  singleMealElement.innerHTML = "";

  //getting search vlaue
  let term = searchInput.value;
  console.log(term);
  searchInput.value = "";

  //checking for empty input
  if (term.trim()) {
    fetch();
  } else {
    alert("Please enter a search term");
  }
}
