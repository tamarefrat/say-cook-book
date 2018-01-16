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
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

choProduct = '';
inShoeRecipes = false;
inSearch = false;

  constructor(private dbs: DataBaseService) {
    this.dbs.getAllIngredients();
  }

getRecipes() {
  this.dbs.getIngredientsByProduct(this.choProduct);
  this.inShoeRecipes = true;

}


restart() {
  this.inShoeRecipes = false;
  this.inSearch = false;
  this.dbs.getAllIngredients();
  this.choProduct = '';
}

 ngOnInit() {

  }



}
