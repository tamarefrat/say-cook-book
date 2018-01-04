import { Injectable } from '@angular/core';
import { NewRecipeComponent } from '../recipe/new-recipe/new-recipe.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class RecipeService {
  user: any;
  userRef: any;
  db: AngularFireDatabase;
  allMyRecipes: any[]= [];
  recipe: RecipeComponent;
  newRecipe: NewRecipeComponent;
  sharedRecipes: any[] = [];
  optionCategories: Category[] = [];
  counter = 0; // starts from 0 - and every recipe get the counter++ for his code
  favorites: string[] = [];
  tempArr: any[] = [];
  tempObj: any;
  folder: any;

  constructor(db: AngularFireDatabase, private afs: AngularFirestore) {
    // this.newRecipe = new NewRecipeComponent();
    this.db = db;
    this.user = 'sm5800810';
    this.userRef = this.afs.collection(this.user);
    this.folder = 'recipeimages';
    this.getAllRecipesFromDB();
    this.getSharedRecipesFromDB();
    this.getAllCategoriesFromDB();
    this.getFavoritesFromOption();
    console.log(this.allMyRecipes);
   //  this.counter = 0; // ????????????????????????????????????????????????
    console.log(this.getRecipeByCodeFromDB(5));
  }

  /***************************************************************** */
  /*************          recipes functions     ******************** */
  getRecipe(code): RecipeComponent {
    this.getAllRecipesFromDB();
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

  getFavoritesFromOption() {
    this.optionCategories.forEach(element => {
      if (element.isFavorite) {
        this.favorites.push(element.value);
      }
    });
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
  getAllCategoriesFromDB() {
    this.db.list(`/${this.user}/categories`).valueChanges().subscribe(cats => {
      this.tempArr = cats;
     this.optionCategories = this.tempArr;
      console.log(this.optionCategories);
      return this.optionCategories;
    });
  }
  getSharedRecipesFromDB() {
    this.db.list(`/${this.user}/shared`).valueChanges().subscribe(recipes => {
       this.tempArr = recipes;
      this.sharedRecipes = this.tempArr;
      console.log(this.sharedRecipes);
      return this.sharedRecipes;
    });
  }

  getRecipeByCodeFromDB(code) {
    this.db.object(`/${this.user}/recipes/${code}`).valueChanges()
      .subscribe(rec => {
        this.tempObj = rec;
        this.recipe = this.tempObj;
      });
    return this.recipe;
  }
  addNewRecipeToDB(recipe: NewRecipeComponent) {
    /************************************ */
  }

  updateMainDetails(code, recipe) {

  }
  /*
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

  getNameSharedRecipes() {
    const recipes: string[] = [];
    this.sharedRecipes.forEach(element => {
      recipes.push(element.mainDetails.nameRecipe);
    });
    return recipes;
  }






}

export class Category {
  constructor(public value: string, public isFavorite: boolean) { }

}
