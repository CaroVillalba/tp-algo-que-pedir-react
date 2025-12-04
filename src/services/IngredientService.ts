import type { Ingredient } from '../types/IngredientType'
import { CRUDService } from "./CRUDService"


export class IngredientService extends CRUDService<Ingredient> {
  constructor() {
    super('ingredients')
  }
}
export const ingredientService = new IngredientService()