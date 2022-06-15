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
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        ResultHeading.innerHTML = `
        <h2>Search Results for "${term}":</h2>
        `;
        if (data.meals === null) {
          ResultHeading.innerHTML = `<p>There are no search results. Try Again</p>`;
        } else {
          mealElement.innerHTML = data.meals
            .map((meal) => {
              const { strMealThumb, strMeal, idMeal } = meal;
              return `
             <div class="meal">
              <img src="${strMealThumb}" alt="${strMeal}" />
              <div class="meal-info" data-mealID="${idMeal}">
              <h3>${strMeal} </h3>
              </div>
             </div>
              `;
            })
            .join("");
        }
      });
  } else {
    alert("Please enter a search term");
  }
}
