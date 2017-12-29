import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  tiles = [
    { route: 'recipeList', subtext: 'Get all the recipies you have',  text: 'List Of Recipies',
      cols: 5, rows: 1, color: 'blue', icon: 'assets\\homeImg\\list.png' },
    { route: 'recipe', subtext: '', text: 'Create Recipe',
    cols: 1, rows: 1, color: 'yellow', icon: 'assets\\homeImg\\newrecipe.png' },
    { route: 'categories', subtext: 'See all categories', text: 'Categories',
      cols: 2, rows: 3, color: 'green', icon: 'assets\\homeImg\\categories.png'},
    { route: 'search-by-categories', subtext: '', text: 'Search By Category',
       cols: 2, rows: 1, color: 'pink', icon: 'assets\\homeImg\\search.png' },
    { route: 'about', subtext: 'Read more about Say Cook Book', text: '@Say Cook Book',
       cols: 4, rows: 3, color: 'red', icon: 'assets\\homeImg\\logo.png'},
    {route: 'search-by-picture', subtext: 'Search By Picture', text: '',
      cols: 1, rows: 2, color: 'lihgtred', icon: 'assets\\homeImg\\picture.png' },
    { route: 'search-by-keywords', subtext: 'Search By Key-Word',  text: '',
      cols: 1, rows: 2, color: 'yellow', icon: 'assets\\homeImg\\key.png' },
    {route: 'categories/add-category', subtext: 'New categories', text: 'Add Category',
       cols: 2, rows: 1, color: 'pink', icon: 'assets\\homeImg\\addcategory.png'}
  ];
  @Input() favorites: string [];

  constructor(private _recipeService: RecipeService) {

   }

  ngOnInit() {
  }

}


