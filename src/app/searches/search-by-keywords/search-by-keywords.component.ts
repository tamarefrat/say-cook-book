import { Component, OnInit } from '@angular/core';
import { DataBaseService, Ingerdient } from '../../services/data-base.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-search-by-keywords',
  templateUrl: './search-by-keywords.component.html',
  styleUrls: ['./search-by-keywords.component.scss']
})
export class SearchByKeywordsComponent implements OnInit {
nameRecipesByIngredients: Ingerdient[] = [];
inShoeRecipes = false;




  options = [
    'One',
    'Two',
    'Three'
  ];



  constructor(private dbs: DataBaseService) {
    this.dbs.getAllIngredients();
  }

getRecipesByIngredients(product) {
  this.dbs.getIngredientsByProduct(product);
  this.inShoeRecipes = true;
}

restart() {
  this.inShoeRecipes = false;
  this.dbs.getAllIngredients();
}

 ngOnInit() {

  }



}
