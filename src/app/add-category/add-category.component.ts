import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: string;
  isFavorite: boolean;
  selectedOptions: string[];

  constructor(private _recipeService: RecipeService) {
    this.selectedOptions = this._recipeService.favorites;
  }

  addCategory() {

    if (this._recipeService.optionCategories.indexOf(this.category) > 0) {
      alert('category appeares');
    } else {
      this._recipeService.optionCategories.push(this.category);
      if (this.isFavorite) {
        this._recipeService.favorites.push(this.category);
        }
        this.category = '';
        this.isFavorite = false;
    }
}

  deleteCategory(category) {
    this._recipeService.optionCategories.splice(
      this._recipeService.optionCategories.indexOf(category), 1);
    if (this.isFavoriteCategory(category)) {
      this._recipeService.favorites.splice(
        this._recipeService.favorites.indexOf(category), 1);
    }
  }
isFavoriteCategory(category: string) {
return (this._recipeService.favorites.indexOf(category) >= 0 );
}

  onSelectedOptionsChange(values: string[]) {
    this.selectedOptions = values;
    this._recipeService.favorites = this.selectedOptions;

  }
  ngOnInit() {
  }

}
