const mealsContainerDiv = document.querySelector(".meals");
const ingredientInfoDiv = document.querySelector('.ingredient-info')
let fuck;
async function fetchMealInfo(mealId) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
async function fetchMeals(mealName) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}
  `;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function handleSearchFormSubmit() {
  // event.preventDefault();
  const searchInput = document.getElementById("search-form")
  if (searchInput.value.length === 0) {
    alert("⚠️ Please first enter a meal name! ⚠️");
    return;
  }
  (async function () {
    try {
      const data = await fetchMeals(searchInput.value);
      if (data.meals === null) {
        alert("⚠️ found nothing ⚠️");
      }
      const mealsHtmlString = data.meals.map(
        (meal) =>
          `
           <div class="meals-meal" data-id=${meal.idMeal}>
            <img src=${meal.strMealThumb} />
            <h2>${meal.strMeal}</h2>
           </div>
        `
      )
        .reduce((prev, curr) => {
          return (prev += curr);
        }, "");

      mealsContainerDiv.innerHTML = mealsHtmlString;
      ingredientInfoDiv.innerHTML = '';
      ingredientInfoDiv.style.background = 'transparent';
    } catch (error) {
      console.log(error);
    }
  })();
}

mealsContainerDiv.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement === event.currentTarget) return;
  const mealCard = clickedElement.closest("div");
  if (mealCard) {
    (async function () {
      try {
        let data = await fetchMealInfo(mealCard.dataset.id);
        let dataObject = data.meals[0];
        let ingredients = [];
        let ingredientsMeasure = [];

        // loop each object to get ingredients
        for (property in dataObject) {
          if (property.includes("Ingredient") && dataObject[property] !== "") {
            ingredients.push(dataObject[property]);
          }
          if (property.includes("Measure") && dataObject[property] !== "") {
            ingredientsMeasure.push(dataObject[property]);
          }
        }
        // ingredient items in html list items
        const ingredientItemsHtmlString = ingredients
          .map(
            (ingredient, index) =>
              `<li>${ingredientsMeasure[index]} ${ingredient}</li>`
          )
          .join("");

        // ingredient infos in html
        const ingredientHtmlString = `
           <div>
           <img src=${dataObject.strMealThumb}  />
           </div>
           <div>
           <h1>${dataObject.strMeal}</h1>
           <h2>Ingredients</h2>
           <ul>${ingredientItemsHtmlString}</ul>
           </div>
        `;
        ingredientInfoDiv.innerHTML = ingredientHtmlString;
        ingredientInfoDiv.style.background = 'grey';
        scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      } catch (error) {
        console.log(error);
      }
    })();
  }
});
