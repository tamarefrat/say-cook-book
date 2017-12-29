import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-search-by-category',
  templateUrl: './search-by-category.component.html',
  styleUrls: ['./search-by-category.component.css']
})
export class SearchByCategoryComponent implements OnInit {
category = '';
  constructor(private _recipeService: RecipeService) { }

  isPrefix(cat) {

 let filter = this.category.toUpperCase();
  return(cat.toUpperCase().indexOf(filter) > -1);
}

  /*
  myFunction() {
    var input, filter, i, a;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    console.log(filter);
    for (i = 0; i < this.recipeList.length; i++) {
      a = this.recipeList[i].name;
      if (a.toUpperCase().indexOf(filter) > -1) {
        this.recipeList[i].disply = true;
      } else {
        this.recipeList[i].disply = false;

      }
    }
  }*/
  ngOnInit() {
  }

}
