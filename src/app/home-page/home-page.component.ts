import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  tiles = [
    {
      route: '/recipeList', subtext: 'Get all the recipies you have', text: 'List Of Recipies',
      cols: 5, rows: 1, color: '#FF9800', icon: 'assets\\homeImg\\list.png'
    },
    {
      route: '/recipe', subtext: '', text: 'Create Recipe',
      cols: 1, rows: 2, color: '#0288D1', icon: 'assets\\homeImg\\newrecipe.png'
    },
    {
      route: 'categories', subtext: 'See all categories', text: 'Categories',
      cols: 2, rows: 3, color: '#B3E5FC', icon: 'assets\\homeImg\\categories.png'
    },
    {
      route: 'search-by-categories', subtext: '', text: 'Search By Category',
      cols: 2, rows: 1, color: '#009688', icon: 'assets\\homeImg\\search.png'
    },
    {
      route: 'about', subtext: 'Read more about Say Cook Book', text: '@Say Cook Book',
      cols: 3, rows: 3, color: '#757575', icon: 'assets\\homeImg\\logo.png'
    },


    {
      route: 'search-by-keywords', subtext: 'Search By Key-Word', text: '',
      cols: 1, rows: 2, color: '#212121', icon: 'assets\\homeImg\\key.png'
    },
    {
      route: 'search-by-picture', subtext: 'Search By Picture', text: '',
      cols: 1, rows: 2, color: '#FBC02D', icon: 'assets\\homeImg\\picture.png'
    },
    {
      route: 'share', subtext: '', text: 'Sharing Recipes',
      cols: 1, rows: 2, color: 'orange', icon: 'assets\\homeImg\\share.png'
    },
    {
      route: 'categories/add-category', subtext: 'Manage your categories', text: 'Category manager',
      cols: 2, rows: 1, color: '#00BCD4', icon: 'assets\\homeImg\\addcategory.png'
    }
  ];
  @Input() favorites: string[];

  constructor(private _recipeService: RecipeService, private router: Router) {

  }

  onSelect(route) {
    console.log(route);

    this.router.navigate(['recipe/5']);

  }

  ngOnInit() {
  }

}


