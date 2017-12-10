import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
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
          this.recipeList[i].dsply = true;
        } else {
          this.recipeList[i].dsply = false;
  
        }
    }
  }

constructor() { 
  this.recipeList = [
    new recipeName("Carrot Salad", "carrot_salad",true),
    new recipeName("Chocolate Cake", "Chocolate_Cake",true),
    new recipeName("Blintzes Cheese", "Blintzes_cheese",true),
    new recipeName("Man", "man",true),
    new recipeName("Tomato Salad", "tomato_salad",true)
  ]; 
}

  ngOnInit() {
  }

  
 
  



}




export class recipeName{

constructor(public name: string, public url: string, public dsply: boolean){

}
}