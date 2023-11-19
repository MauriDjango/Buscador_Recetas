import { freeMealsAPI } from './FreeMealDBAPI/DBAPI.js'


export async function loadCategories(categorySelect) {
  const categories = await freeMealsAPI.getCategories()

  categories.forEach((category) => {
    let option = document.createElement('option')
    option.innerText = category.strCategory

    categorySelect.appendChild(option)
  })
}

export async function showDishes(category) {
  try {
    const result = document.querySelector('#resultado');
    result.innerHTML = ""
    const dishes = await freeMealsAPI.getDishes(category);

    dishes.forEach((dish) => {
      const dishCard = createDishCard(dish);
      result.appendChild(dishCard);
    });

  } catch (error) {
    console.error('Error fetching dishes:', error);
  }
}

function createDishCard(dish) {
  const dishCard = document.createElement('div');
  dishCard.classList.add('card', 'col-md-3', 'bg-light', 'm-3'); // Adjusted padding here

  dishCard.innerHTML = `
    <div class="p-3">
      <button type="button" class="btn btn-outline-danger float-end m-1">
        <i class="bi bi-heart"></i>
      </button>
      <img src="${dish.strMealThumb}" alt="${dish.strMeal}" class="card-img-top mt-3 mb-3"> <!-- Added margin -->
      <div class="card-body">
        <h5 class="card-title">${dish.strMeal}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary" id="info-${dish.strMeal}">More Info</a>
      </div>
    </div>
  `;

  return dishCard;
}

async function showDishInfo(dish) {
  const result = document.querySelector('#resultado');
  const ingredients = await showIngredients(dish);
  console.log("Show dish info", dish, ingredients);
  const dishInfo = document.createElement("div");
  dishInfo.classList.add(
      'position-absolute',
      'card', 'col-md-6', // Adjusted card width
      'bg-light',
      'm-3',
      'p-4',
      'border',
      'rounded'
  );

  dishInfo.innerHTML = `
    <div class="text-end mb-3">
      <button type="button" class="btn btn-outline-danger m-1">
          <i class="bi bi-heart"></i>
      </button>
      <button type="button" class="btn btn-outline-danger m-1">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <img src="${dish.strMealThumb}" alt="${dish.strMeal}" class="card-img-top mb-3">
    <div class="card-body">
      <h5 class="card-title mb-3">${dish.strMeal}</h5>
      ${ingredients.outerHTML}
      <p class="mb-0">${dish.strInstructions}</p>
    </div>
  `;

  result.appendChild(dishInfo);
}


async function showIngredients(dish) {
  const ingredients = await freeMealsAPI.getIngredients(dish);
  const list = document.createElement('ul')
  list.classList.add("list-group", "mb-2")

  console.log("Show ingredients", ingredients)

  ingredients.forEach((ingredient) => {
    const listItem = document.createElement("li")
    listItem.innerText = `${ingredient.amount} ${ingredient.ingredient}`

    list.appendChild(listItem)
  })

  return list
}

export async function clickHandler(targetID) {
  if (targetID.includes("info")) {
    console.log("ClickHandler", targetID, targetID.split("-")[1])
    const dish = await freeMealsAPI.getDishByName(targetID.split("-")[1])
    showDishInfo(dish)
  }
}

/*
<button type="button" class="btn btn-outline-danger float-end m-1">
  <i class="bi bi-x-lg"></i>
</button>*/
