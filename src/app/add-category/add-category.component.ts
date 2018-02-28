import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { DataBaseService, Category } from '../services/data-base.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category: string;
  isFavorite: boolean;
dbs;
  selectedOptions: string[];

  constructor(private _recipeService: RecipeService,  dbs: DataBaseService) {
    this.dbs = dbs;
    this.selectedOptions = this.dbs.getFavoritesFromOption();
// this.selectedOptions = DataBaseService.getFavoritesFromOption();

  }

  addCategory() {
    const cat1 = {
      name: this.category,
      isFavorite: true
    };

    const cat2 = {
      name: this.category,
      isFavorite: false
    };

    if (this.dbs.categoryList.indexOf(cat1) > 0) {
      alert('category appeares');
      return;
    } else if (this._recipeService.optionCategories.indexOf(cat2) > 0) {
      alert('category appeares');
      return;
    } else {
      this.dbs.addCategory(this.category, this.isFavorite);
      /*  if (this.isFavorite) {
          this._recipeService.favorites.push(this.category);
          }*/
      this.category = '';
      this.isFavorite = false;
    }
  }

  deleteCategory(category: Category) {
    this.dbs.deleteCategory(category);
    /*  if (this.isFavoriteCategory(this.category)) {
        this._recipeService.favorites.splice(
          this._recipeService.favorites.indexOf(category), 1);
        this._recipeService.optionCategories.splice(
          this._recipeService.optionCategories.indexOf(new Category(1,category, true)), 1);
      }*/
  }
  isFavoriteCategory(category: string) {
    return (this.dbs.getFavoritesFromOption().indexOf(category) >= 0);
  }

  onSelectedOptionsChange(values: string[]) {
    this.selectedOptions = values;
    // this._recipeService.favorites = this.selectedOptions;
    this.selectedOptions.forEach(element => {
      const cat = {
        name: element,
        isFavorite: true
      };
      this.dbs.updateCategory(cat);

    });

  }
  ngOnInit() {
    this.selectedOptions = this.dbs.getFavoritesFromOption();
  }

}
