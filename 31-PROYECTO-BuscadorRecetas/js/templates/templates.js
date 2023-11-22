

export function dishInfoTemplate(dish, ingredients) {
  return `
    <div class="d-flex align-items-center">
      <div class="mb-3 d-flex justify-content-start align-items-center w-50">
        <h5 class="card-title m-3">${dish.strMeal}</h5>      
        <h6 class="card-subtitle m-2 text-muted">${dish.strArea}</h6>
      </div>
      <div class="mb-3 d-flex justify-content-end align-items-center w-50">
        <button type="button" class="btn btn-outline-danger m-1" id="favourite_button-${dish.idMeal}">
          <i class="bi bi-heart" id="heart-icon-${dish.idMeal}"></i>
        </button>
        <button type="button" class="btn btn-outline-danger m-1" id="info_close_button-${dish.idMeal}">
          <i class="bi bi-x-lg "></i>
        </button>
      </div>
    </div>
    <img src="${dish.strMealThumb}" alt="${dish.strMeal}" class="card-img-top mb-3">
    <div class="card-body">
      <p class="mb-2">${dish.strInstructions}</p>
      ${ingredients.outerHTML}
    </div>
  `
}

export function dishCardTemplate(dish) {
  return `
      <img src="${dish.strMealThumb}" alt="${dish.strMeal}" class="card-img-top mt-3 mb-3"> <!-- Added margin -->
      <div class="card-body">
        <h5 class="card-title">${dish.strMeal}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <div class="d-flex align-items-center justify-content-between m-2">
        <button type="button" class="btn btn-outline-danger m-1" id="favourite_button-${dish.idMeal}">
          <i class="bi bi-heart" id="heart-icon-${dish.idMeal}"></i>
        </button>
        <a href="#" class="btn btn-primary" id="info_button-${dish.idMeal}">More Info</a>
      </div>
  `;
}
