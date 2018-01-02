import { Injectable } from '@angular/core';
import { InstructionLineComponent } from '../instruction-line/instruction-line.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, DatabaseSnapshot} from 'angularfire2/database';
import * as firebase from 'firebase';
@Injectable()

export class RecipeService {
user: any;
db: AngularFireDatabase;
  allMyRecipes: RecipeComponent[];
  recipe: RecipeComponent;
  sharedRecipes: RecipeComponent[];
  optionCategories: string[];
  counter: number; // starts from 0 - and every recipe get the counter++ for his code
  favorites: string[];
  tempArr: any[];
  tempObj: any;
  folder: any;

  constructor( db: AngularFireDatabase) {

    this.db = db;
    this.user = 'sm5800810';
    this.folder = 'recipeimages';
    this.allMyRecipes = [];

    this.getAllRecipesFromDB();
    console.log(this.allMyRecipes);
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];
    this.counter = 0;
    this.favorites = ['milk', 'easy', 'parve'];
    this.sharedRecipes = [];
  }

  getRecipe(code): RecipeComponent {
    return this.allMyRecipes[this.getIndexOfRecipeByCode(code)];
  }



  getIndexOfRecipeByCode(code: number) {
    if (this.allMyRecipes === null) { return null; }
    for (let i = 0; i < this.allMyRecipes.length; i++) {
      if (this.allMyRecipes[i].code === code) {
        return i;
      }
      return null;
    }
  }

  getNameAllRecipes() {
    const recipes: string[] = [];
    this.allMyRecipes.forEach(element => {
      recipes.push(element.mainDetails.nameRecipe);
    });
    return recipes;
  }
  getNameSharedRecipes() {
    const recipes: string[] = [];
    this.sharedRecipes.forEach(element => {
      recipes.push(element.mainDetails.nameRecipe);
    });
    return recipes;
  }
/************************************************************ */
/**************             firebase functions            ********** */

getAllRecipesFromDB() {
  this.db.list(`/${this.user}/recipes`).valueChanges().subscribe(recipes => {
    this.tempArr = recipes;
    this.allMyRecipes = this.tempArr;
    console.log(this.allMyRecipes);
    return this.allMyRecipes;
  });
}
/*
  getRecipeByCodeFromDB(code) {
    this.db.object('/recipe/' + code).valueChanges()
      .subscribe(recipes => {
        this.tempObj = recipes;
      });
     return this.recipe = this.tempObj;
  }

addRecipeToDB(recipe: RecipeComponent) {
  // create root ref
const storegRef = firebase.storage().ref();
for (const selectedFile of [(<HTMLInputElement>document.getElementById('imageFile')).files[0]]) {
const path = `/${this.folder}/${selectedFile.name}`;
const iRef = storegRef.child(path);
iRef.put(selectedFile).then((snapshot) => {
  recipe.mainDetails.urlImg = selectedFile.name;
  recipe.mainDetails.path = path;
  return this.tempArr.push(recipe);
});
}
}

getImageByRecipeCodeFromDB(code) {
  let imageURL: any;
  const storegRef = firebase.storage().ref();
  const spaceRef = storegRef.child(this.getRecipeByCodeFromDB(code).mainDetails.path).getDownloadURL().then((url) => {
    // set image url
    imageURL = url;
  }).catch((error) => {
console.log(error);
  });
}



*/

/************************************************************ */
/**************             share functions            ********** */
getIndexOfSharedRecipeByName(name) {
  for (let i = 0; i < this.allMyRecipes.length; i++) {
    if (this.sharedRecipes[i].mainDetails.nameRecipe === name) {
      return i;
    }
    return null;
}
}





}
