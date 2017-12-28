import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _recipeService: RecipeService) { }

  deleteCategory(category) {
this._recipeService.optionCategories.splice(
  this._recipeService.optionCategories.indexOf(category), 1);
  if (this.isFavoriteCategory(category)) {
    this._recipeService.favorites.splice(
      this._recipeService.favorites.indexOf(category), 1);
  }
  }

  isFavoriteCategory(category: string) {
    return (this._recipeService.favorites.indexOf(category) >= 0);
  }

  changeFavoriteStatus(favorite, category) {
if (favorite) {
  this._recipeService.favorites.push(category);
} else {
  this._recipeService.favorites.splice(
    this._recipeService.favorites.indexOf(category), 1);
}
  }
  ngOnInit() {
  }

}
