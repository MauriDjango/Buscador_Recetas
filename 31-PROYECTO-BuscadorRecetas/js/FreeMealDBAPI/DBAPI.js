

class FreeMealsDBAPI {
  _categoriesURL = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  _dishesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'

  async getCategories() {
    const response = await fetch(this._categoriesURL)
    const data = await response.json()

    return data.categories
  }

  async getDishes(category) {
    const response = await fetch(this._dishesURL)
    const data = await response.json()

    console.log(data)
    return data
  }
}

export const freeMealsAPI = new FreeMealsDBAPI()
freeMealsAPI.getCategories()
