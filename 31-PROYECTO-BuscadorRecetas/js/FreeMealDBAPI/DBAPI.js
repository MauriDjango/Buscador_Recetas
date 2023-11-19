

class FreeMealsDBAPI {
  _allCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  _dishesByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
  _dishByName =  'https://www.themealdb.com/api/json/v1/1/search.php?s='


  async getCategories() {
    const response = await fetch(this._allCategoriesURL)
    const data = await response.json()

    console.log("getCategories", data)
    return data.categories
  }

  async getDishes(category) {
    const response = await fetch(this._dishesByCategory + category)
    const data = await response.json()

    console.log(data)
    return data.meals
  }

  async getDishByName(dishName) {
    const response = await fetch(this._dishByName + dishName)
    const data = await response.json()

    console.log("Get dish by name", data.meals[0], this._dishByName + dishName)
    return data.meals[0]
  }

  async getIngredients(dish) {
    let keys = Object.keys(dish)
    const ingredients = []

    keys.forEach(key => {
      let ingredient = {
        ingredient: null,
        amount: null
      }
      if (key.includes("Ingredient") && dish[key]) {
        ingredient.ingredient = dish[key]
        ingredient.amount = dish[`strMeasure${RegExp(/\d+/).exec(key)[0]}`]
        ingredients.push(ingredient)
      }
    })
    return ingredients
  }
}



export const freeMealsAPI = new FreeMealsDBAPI()
