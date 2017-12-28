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
  constructor(private _recipeService: RecipeService) { }

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

isFavoriteCategory(category: string) {
return (this._recipeService.favorites.indexOf(category) >= 0 );
}
  ngOnInit() {
  }

}
