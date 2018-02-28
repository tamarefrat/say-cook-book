import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataBaseService, Recipe } from '../../services/data-base.service';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-recipes-for-category',
  templateUrl: './recipes-for-category.component.html',
  styleUrls: ['./recipes-for-category.component.scss']
})
export class RecipesForCategoryComponent implements OnInit {
@Input() category: any;
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
recipeList: Recipe[];
// dbs;

  @ViewChild('content') public contentModal;
  public name: string;
  constructor(public dbs: DataBaseService,
    private router: Router,
    private route: ActivatedRoute ) {
     // this.dbs = dbs;
    this.category = this.route.snapshot.params['id'];
   this.dbs.getRecipesByCategory(this.category);

  }
  show(value: string) {
    this.name = value;
    this.contentModal.show();
  }

  onRecipeSelect(recipe: Recipe) {

  }

  goBack() {
    this.router.navigate(['/']);
    // this.router.navigate(['search-by-category']);
  }

  ngOnInit() {
    this.category = this.route.snapshot.params['id'];
    // this.dbs.getRecipesByCategory(this.category);

  }

}
