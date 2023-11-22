class FreeMealsDBAPI {
  _allCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  _dishesByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  _dishByID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  async getCategories() {
    try {
      const response = await fetch(this._allCategoriesURL);
      const data = await response.json();

      console.log("Fetched categories successfully.");
      return data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  async getDishes(category) {
    try {
      const response = await fetch(this._dishesByCategory + category);
      const data = await response.json();

      console.log(`Fetched dishes for category "${category}" successfully.`);
      return data.meals;
    } catch (error) {
      console.error(`Error fetching dishes for category "${category}":`, error);
      return [];
    }
  }

  async getDishByID(idMeal) {
    try {
      const response = await fetch(this._dishByID + idMeal);
      const data = await response.json();

      console.log(`Fetched dish with ID "${idMeal}" successfully.`);
      return data.meals[0];
    } catch (error) {
      console.error(`Error fetching dish with ID "${idMeal}":`, error);
      return null;
    }
  }

  async getIngredients(dish) {
    try {
      const keys = Object.keys(dish);
      const ingredients = [];

      keys.forEach(key => {
        let ingredient = {
          ingredient: null,
          amount: null
        };
        if (key.includes("Ingredient") && dish[key]) {
          ingredient.ingredient = dish[key];
          ingredient.amount = dish[`strMeasure${RegExp(/\d+/).exec(key)[0]}`];
          ingredients.push(ingredient);
        }
      });

      console.log("Extracted ingredients successfully.");
      return ingredients;
    } catch (error) {
      console.error("Error extracting ingredients:", error);
      return [];
    }
  }
}

export const freeMealsAPI = new FreeMealsDBAPI();
