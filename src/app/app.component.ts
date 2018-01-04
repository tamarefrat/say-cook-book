import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _recipeService: RecipeService) {

  }
  title = 'say cook book';
  login() {

  }
   logout() {

   }
}
