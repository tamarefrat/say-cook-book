import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Category, DataBaseService } from '../../services/data-base.service';

@Component({
  selector: 'app-search-by-category',
  templateUrl: './search-by-category.component.html',
  styleUrls: ['./search-by-category.component.scss']
})
export class SearchByCategoryComponent implements OnInit {
category = '';
  optionCategories: Category[] = [];
  constructor(private dbs: DataBaseService) {
     this.optionCategories = this.dbs.categoryList;
   }


 isPrefix(cat) {
const filter = this.category.toUpperCase();
  return(cat.toUpperCase().indexOf(filter) > -1);
}


  ngOnInit() {
  this.optionCategories = this.dbs.categoryList;
  }

}
