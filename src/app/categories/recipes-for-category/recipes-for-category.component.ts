import { Component, OnInit } from '@angular/core';
import { DataBaseService, Recipe } from '../../services/data-base.service';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-recipes-for-category',
  templateUrl: './recipes-for-category.component.html',
  styleUrls: ['./recipes-for-category.component.scss']
})
export class RecipesForCategoryComponent implements OnInit {
category: any;
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
recipeList: Recipe[] = [];
  constructor(private dbs: DataBaseService,
    private router: Router,
    private route: ActivatedRoute ) {
    this.category = this.route.snapshot.params['id'];
    this.recipeList = this.dbs.getRecipesByCategory(this.category);

  }

  onRecipeSelect(recipe: Recipe) {

  }

  ngOnInit() {
    this.category = this.route.snapshot.params['id'];
    this.recipeList = this.dbs.getRecipesByCategory(this.category);

  }

}
