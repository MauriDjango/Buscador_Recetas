export function dishInfoModal(dish, ingredients) {
  return `
    <!-- Modal -->
    <div class="modal fade" id="dishModal-${dish.idMeal}" tabindex="-1" role="dialog" aria-labelledby="dishModalLabel-${dish.idMeal}" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="dishModalLabel-${dish.idMeal}">${dish.strMeal}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center">
              <div class="mb-3 d-flex justify-content-start align-items-center w-50">
                <h6 class="card-subtitle m-2 text-muted">${dish.strArea}</h6>
              </div>
              <div class="mb-3 d-flex justify-content-end align-items-center w-50">
                <button type="button" class="btn btn-outline-danger m-1">
                  <i class="bi bi-heart" id="favourite_button-${dish.idMeal}"></i>
                </button>
                <button type="button" class="btn btn-outline-danger m-1" data-dismiss="modal">
                  <i class="bi bi-x-lg "></i>
                </button>
              </div>
            </div>
            <img src="${dish.strMealThumb}" alt="${dish.strMeal}" class="card-img-top mb-3">
            <p>${dish.strInstructions}</p>
            ${ingredients.outerHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}
