const searchInput = document.querySelector("#search");
const submitBtn = document.querySelector("#submit");
const randomBtn = document.querySelector("#random");
const mealElement = document.querySelector("#meals");
const ResultHeading = document.querySelector("#result-heading");
const singleMealElement = document.querySelector("#single-meal");
console.log(submitBtn);
//Event Listeners
submitBtn.addEventListener("submit", searchMealHandler);
mealElement.addEventListener("click", searchDishesHandler);

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
          gettingDishes(data);
        }
      });
  } else {
    alert("Please enter a search term");
  }
}

function gettingDishes(data) {
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

//!searchDishesHandler gives us each and unique dish
function searchDishesHandler(event) {
  const mealInfo = event.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  //console.log(mealInfo);
  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    console.log(mealId);
    getDishbyId(mealId);
  }
}

function getDishbyId(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal);
      addMealFeaturesToDOM(meal);
    });
}

function addMealFeaturesToDOM(meal) {
  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } = meal;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    //!we check whether or not we have ingredient because some of ingredients do not exist in the API
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  singleMealElement.innerHTML = `
 <div class="singleMeal">
  <h2>${strMeal} </h2>
  <img src="${strMealThumb}"  alt="${strMeal} "/>
  <div class="single-meal-info">
  ${strCategory ? `<h2>${strCategory}</h2>` : ""}
  ${strArea ? `<h3>${strArea}</h3>` : ""}
  </div>
  <div class="main">
  <p>${strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}

  </ul>
  </div>
 </div>
  `;
  console.log(ingredients);
}
