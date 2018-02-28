import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Category, DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  optionCategories: Category[] = [];
  favorites: string[] = [];
/***************************************** */
// for modals
  category: string;
  isFavorite = false;
  selectedOptions: string[];
 // dbs;
  /********************************************** */
  constructor(private _recipeService: RecipeService, public dbs: DataBaseService) {
    this.dbs = dbs;
    this.optionCategories = this.dbs.categoryList;
    this.favorites = this.dbs.getFavoritesFromOption();
    /*********************************************************************************** */
    // for modals
    this.selectedOptions = this.dbs.getFavoritesFromOption();
    /*********************************************** */
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


  /******************************************* */
  // for modals
  addCategory() {
    const cat1 = {
      name: this.category,
      isFavorite: true
    };

    const cat2 = {
      name: this.category,
      isFavorite: false
    };

    if (this.dbs.categoryList.indexOf(cat1) > -1) {
      this.dbs.createAlert('attention', 'category appeares', '');
      this.isFavorite = false;
       this.category = '';
       return;
    } else if (this.dbs.categoryList.indexOf(cat2) > -1) {
      this.isFavorite = false;
      this.category = '';
      this.dbs.createAlert('attention', 'category appeares', '');
      return;
    } else {
      this.dbs.addCategory(this.category, this.isFavorite);
      /*  if (this.isFavorite) {
          this._recipeService.favorites.push(this.category);
          }*/
      this.category = '';
      this.isFavorite = false;
      this.dbs.createAlert('success', 'new category addad successfuly', '');
    }
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
  /********************************************************** */

}
