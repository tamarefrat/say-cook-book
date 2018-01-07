import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { DataBaseService } from './services/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _recipeService: RecipeService, private dbs: DataBaseService) {

  }
  title = 'say cook book';
  login() {

  }
   logout() {

   }
}
