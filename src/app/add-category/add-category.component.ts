import { Component, OnInit } from '@angular/core';
import { RecipeService, Category } from '../services/recipe.service';

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

    if (this._recipeService.optionCategories.indexOf(new Category(1,this.category, true)) > 0) {
      alert('category appeares');
    } else if (this._recipeService.optionCategories.indexOf(new Category(1, this.category, false)) > 0){
      alert('category appeares');
    } else {
      this._recipeService.optionCategories.push(new Category(1,this.category, this.isFavorite));
      if (this.isFavorite) {
        this._recipeService.favorites.push(this.category);
        }
        this.category = '';
        this.isFavorite = false;
    }
}

  deleteCategory(category) {

    if (this.isFavoriteCategory(this.category)) {
      this._recipeService.favorites.splice(
        this._recipeService.favorites.indexOf(category), 1);
      this._recipeService.optionCategories.splice(
        this._recipeService.optionCategories.indexOf(new Category(1,category, true)), 1);
    }
  }
isFavoriteCategory(category: string) {
return (this._recipeService.favorites.indexOf(category) >= 0 );
}

  onSelectedOptionsChange(values: string[]) {
    this.selectedOptions = values;
    this._recipeService.favorites = this.selectedOptions;
    this._recipeService.optionCategories.forEach(element => {
      if (this._recipeService.favorites.indexOf(element.value) > -1) {
        element.isFavorite = true;
      }
    });

  }
  ngOnInit() {
  }

}
