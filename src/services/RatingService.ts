import type { Ingredient } from '../types/IngredientType'
import type { Rating } from '../types/Rating'
import { CRUDService } from "./CRUDService"


export class RatingService extends CRUDService<Rating> {
  constructor() {
    super('rating')
  }

  async getLocalReviews(localId: Number) {
    const response = await this.api.get<Rating[]>(`/${this.path}/local/${localId}`)
    return response.data
  }
}

export const ratingService = new RatingService()

