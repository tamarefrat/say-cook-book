import { Component, OnInit, transition } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {


  recipeList: recipeName[];


  myFunction() {
      var input, filter, i,a;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
        console.log(filter);
      for (i = 0; i < this.recipeList.length; i++) {
          a =  this.recipeList[i].name ;
          if (a.toUpperCase().indexOf(filter) > -1) {
            this.recipeList[i].disply = true;
          } else {
            this.recipeList[i].disply = false;

          }
      }
    }
  i : number;
  name1:recipeName;

  rec: Observable<any[]>;
  constructor(db:AngularFireDatabase, private dbs: DataBaseService) {

      console.log('in contracror');
      
      this.dbs.recipeInWork = this;
     
      const rec = this.dbs.recipesRef;
      this.recipeList = [];
      this.dbs.recipeList.forEach(recipe => {
        this.recipeList.push(new recipeName(recipe.nameRecipe, recipe.id, recipe.enable));
        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
        });


  }



    ngOnInit() {
    }

}


export class recipeName{
  constructor(public name: string, public url: string, public disply: boolean){
  }
}
