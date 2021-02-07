// setting all the elements in variables
let searchBtn = document.getElementById("search-btn")
let mealInfo = document.getElementById("meal-details")
let inputField = document.getElementById("inputField")
let modalBody = document.getElementById("modal-body")
let mealBox = document.getElementById("meal-container")
let searchValue = ""
//  will attach 
function attachOnClick(){
    let mealItem = document.querySelectorAll(".meal-item")
    mealItem.forEach(item => {
        item.addEventListener('click', (x) => {
            let clickedItem = x.target.title
            let clickedItemDetails = searchedData.meals.filter(meal => meal.strMeal == clickedItem)[0]
            console.log(clickedItemDetails);
            mealInfo.innerHTML = ''
            modalBody.innerHTML = ''
            const img = clickedItemDetails.strMealThumb
            const name = clickedItemDetails.strMeal
            var image = document.createElement('img');
            image.src = img
            image.style.width = "200px"
            image.style.height = "200px"
            image.style.display = "block"
            image.setAttribute("class", "mx-auto my-3")
            var h3 = document.createElement("h3");
            var node = document.createTextNode(`${name} - Ingredient`);
            h3.setAttribute('class', 'text-center mt-2')
            h3.appendChild(node);
            modalBody.appendChild(image)
            modalBody.appendChild(h3)
            for (let i = 1; i <= 20; i++) {
                const ingredient = clickedItemDetails[`strIngredient${i}`]
                if (Boolean(ingredient)) {
                    var h3 = document.createElement("p");
                    var node = document.createTextNode(`${i} - ${ingredient}`);
                    h3.setAttribute('class', 'mt-1 text-center')
                    h3.appendChild(node);
                    modalBody.appendChild(h3)
                }
            }
        })
    })
}

inputField.addEventListener('change', (x) => {
    searchValue = x.target.value
})


function returnMeal(mealsObj) {
    if (mealsObj.meals != null) {
        mealBox.innerHTML = ''
        mealsObj.meals.map((meal, index) => {
            document.getElementById("error-div").innerText = '';
            const img = meal.strMealThumb
            const name = meal.strMeal
            var div = document.createElement("div");
            div.setAttribute("class", 'meal-item m-4');
            div.setAttribute("data-toggle", 'modal');
            div.setAttribute("data-target", '#exampleModal');
            div.style.width = "200px";
            div.style.cursor = "pointer";
            var image = document.createElement('img');
            image.src = img
            image.title = name
            image.alt = name
            image.setAttribute("class", "img-fluid")
            var p = document.createElement("p");
            var node = document.createTextNode(name);
            p.setAttribute('class', 'text-center mt-2')
            p.setAttribute('title', name)
            p.appendChild(node);
            div.appendChild(image)
            div.appendChild(p)
            mealBox.appendChild(div)

        })
    } else {
        mealBox.innerHTML = ''
        var p = document.createElement("p");
        var node = document.createTextNode('No foods Found');
        p.setAttribute('class', 'mt-5 text-danger')
        p.appendChild(node);
        mealBox.appendChild(p)
        document.getElementById("error-div").innerText = '';
    }
    attachOnClick()
}

searchBtn.addEventListener("click", () => {
    if (searchValue == '') {
        // gives alert if field is empty
        let errorDiv = document.getElementById("error-div");
        errorDiv.innerText = 'Enter any item name.';
        document.getElementById("meal-container").innerHTML = '';
        return
    }

    const url = ('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchValue)
    fetch(url)
        .then(response => response.json())
        .then(data => searchedData = data)
        .then(() => {
            returnMeal(searchedData)
        })
})

