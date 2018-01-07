import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Category, DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  optionCategories: Category[] = [];
  favorites: string[] = [];

  constructor(private _recipeService: RecipeService, private dbs: DataBaseService) {
    this.optionCategories = this.dbs.categoryList;
    this.favorites = this.dbs.getFavoritesFromOption();
   }

  deleteCategory(category: Category) {
/*this._recipeService.optionCategories.splice(
  this._recipeService.optionCategories.indexOf(category), 1);
  if (category.isFavorite) {
    this._recipeService.favorites.splice(
      this._recipeService.favorites.indexOf(category.value), 1);
  }*/
  this.dbs.deleteCategory(category);
  }

  isFavoriteCategory(category: string) {
    return (this.favorites.indexOf(category) >= 0);
  }

  changeFavoriteStatus(favorite, category: Category) {
/*if (favorite) {
  this._recipeService.favorites.push(category);
} else {
  this._recipeService.favorites.splice(
    this._recipeService.favorites.indexOf(category), 1);
}*/
category.isFavorite = favorite;
this.dbs.updateCategory(category);
  }
  ngOnInit() {
    this.optionCategories = this.dbs.categoryList;
    this.favorites = this.dbs.getFavoritesFromOption();
  }

}
