import { Injectable } from '@angular/core';
// import { NewRecipeComponent } from '../recipe/new-recipe/new-recipe.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, DatabaseSnapshot } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ItemLineComponent } from '../item-line/item-line.component';
import { InstructionLineComponent } from '../instruction-line/instruction-line.component';

@Injectable()

export class RecipeService {
  user: any;
  userRef: AngularFirestoreCollection<any>;
  recipesDoc: AngularFirestoreDocument<any>;
  categoryDoc: AngularFirestoreDocument<any>;
  sharedDoc: AngularFirestoreDocument<any>;
  db: AngularFireDatabase;
  allMyRecipes: any[] = []; // { recipes: any[], counter: any};
  recipe: any;

  sharedRecipes: any[] = [];
  optionCategories: any[] = [];
  counter = 0; // starts from 0 - and every recipe get the counter++ for his code
  favorites: string[] = [];
  tempArr: any[] = [];
  tempObj: any;
  folder: any;
   constructor(db: AngularFireDatabase, private afs: AngularFirestore) {}
    // this.newRecipe = new NewRecipeComponent();
    /*this.db = db;
    if (!this.user) {// not loged in
      this.user = 'demoUser';
      this.userRef = this.afs.collection(this.user);
    }
    this.userRef = this.afs.collection(this.user);

    this.folder = 'recipeimages';
    this.getAllRecipesFromDB();
    this.getSharedRecipesFromDB();
    this.getAllCategoriesFromDB();
    this.getFavoritesFromOption();
    console.log(this.allMyRecipes);


  }*/

  /****

  /****

  /***************************************************************** */
  /*************          recipes functions     ******************** */
  getRecipe(code) {

    // return this.allMyRecipes[this.getIndexOfRecipeByCode(code)];
    return this.getRecipeByCodeFromDB(code);
  }
  getIndexOfRecipeByCode(code) {
    this.getAllRecipesFromDB();
    if (this.allMyRecipes === null) { return null; }
    for (let i = 0; i < this.allMyRecipes.length; i++) {
      if (this.allMyRecipes[i].code === code) {
        return i;
      }
    }
    return null;
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
    for (let i = 0; i < 999; i++) {// 999 have to change????
      const obse = this.afs.collection(`${this.user}/recipes/${i}`).valueChanges();
      if (obse) {
        // recipe number "i" exist in DB- have to add to list
        obse.subscribe(rec => {
          this.recipe = rec;
          this.allMyRecipes.push(this.recipe);
          console.log(rec);
        });
      } else {
        // end of list of recipes
        this.counter = i;
        return;
      }
    }
    /*this.afs.collection(`${this.user}`).doc('recipes').valueChanges().subscribe(recipes => {
    //  this.allMyRecipes = recipes;
    console.log('all recipes:');
      console.log(recipes);
      return recipes;
    });*/
  }
  getAllCategoriesFromDB() {
    this.afs.collection('user/category/categories').valueChanges().subscribe(cats => {
      this.optionCategories = cats;
      console.log(cats);
      return cats;
    });
  }
  getSharedRecipesFromDB() {
    this.afs.collection('user/shared/recipes').valueChanges().subscribe(recipes => {
      this.sharedRecipes = recipes;
      console.log(recipes);
      return recipes;
    });
  }

  getRecipeByCodeFromDB(code) {
    const obse = this.afs.collection(`${this.user}/recipes/${code}`).valueChanges();
    if (obse) {
      // recipe number "i" exist in DB- have to add to list
      obse.subscribe(rec => {
        this.recipe = rec;
        this.allMyRecipes.push(this.recipe);
        console.log(rec);
      });
    } else {
      // not exsist
      console.log('recipe not exist!');
      return;
    }
    return this.recipe;
  }
  addNewRecipeToDB(recipe) {
    /************************************ */
    console.log('addddddddddddddddd');
    recipe.code = this.counter++;
    console.log(recipe);
    // const temp = this.convertToObject(recipe);
    // console.log(temp);
    //  this.userRef.doc('en li coach').set({ 'code': '1', 'name': '2' });
    this.afs.collection(`${this.user}/recipes/${recipe.code}`).doc(`mainDetails`).set({
      'nameRecipe': recipe.mainDetails.nameRecipe,
      'comment': recipe.mainDetails.comment,
      'getFrom': recipe.mainDetails.getFrom,
      'urlImg': recipe.mainDetails.urlImg,
      'category1': recipe.mainDetails.category1,
      'category2': recipe.mainDetails.category2,
      'category3': recipe.mainDetails.category3,
      'statusDetails': recipe.mainDetails.statusDetails
    });
    this.afs.collection(`${this.user}/recipes/${recipe.code}`).doc(`itemLines`).set({
      'zeroItems': recipe.itemLines.zeroItems,
      'foodstuffs': []
    });
    recipe.itemLines.foodstuffs.forEach(element => {
      this.afs.collection(`${this.user}/recipes/${recipe.code}/itemLines/foodstuff`).add({
        'statusLine': element.statusLine,
        'amount': element.amount,
        'measurement': element.measurement,
        'item': element.item,
        'lastLine': element.lastLine
      });
    });

    this.afs.collection(`${this.user}/recipes/${recipe.code}`).doc(`instructionLines`).set({
      'zeroInstructions': recipe.instructionLines.zeroInstructions,
      'instructions': []
    });
    recipe.instructionLines.instructions.forEach(element => {
      this.afs.collection(`${this.user}/recipes/${recipe.code}/instructionLines/instructions`).add({
        'statusLine': element.statusLine,
        'instruction': element.instruction,
        'lastLine': element.lastLine
      });
    });

    // this.userRef.doc(`recipes/recipes/counter`).set((recipe.code++));
  }
  addNewCategoryToDB(category) {
    /************************************ */
    this.userRef.doc(`category/categories/${category.code}`).set(category);
    this.userRef.doc(`category/categories/counter`).set((category.code++));
  }


  updateMainDetails(code, recipe) {
    this.userRef.doc(`recipes/recipes/${recipe.code}`).set(JSON.stringify(recipe));
  }
  updatecategoryDetails(code, category) {
    this.userRef.doc(`category/categories/${category.code}`).set(category);
  }
  removeRecipeFromDB(recipe) {
    this.userRef.doc(`recipes/recipes/${recipe.code}`).delete();
  }
  removeCategoryFromDB(category) {
    this.userRef.doc(`category/categories/${category.code}`).delete();
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


  /*convertToObject(recipe: NewRecipeComponent) {
    let obj: any;
    obj.code = 1;
    obj.nameRecipe = recipe.mainDetails.nameRecipe;
    obj.getFrom = recipe.mainDetails.getFrom;
    obj.statusDetails = recipe.mainDetails.statusDetails;
    obj.urlImg = recipe.mainDetails.urlImg;
    obj.comment = recipe.mainDetails.comment;
    obj.category1 = recipe.mainDetails.category1;
    obj.category2 = recipe.mainDetails.category2;
    obj.category3 = recipe.mainDetails.category3;
    obj.index = recipe.mainDetails.index;
    obj.zeroItems = recipe.itemLines.zeroItems;
    obj.zeroInstructions = recipe.instructionLines.zeroInstructions;
    obj.itemLines = recipe.itemLines.foodstuffs;
    obj.instroctionLines = recipe.instructionLines.instructions;
    return obj;
  }*/



}

/*export class Category {
  constructor(public code: any, public value: string, public isFavorite: boolean) { }

}*/

export class MainDetails {
  constructor(
    public nameRecipe: string,
    public getFrom: string,
    public category1: string,
    public category2: string,
    public category3: string,
    public urlImg = 'assets/Say CookBook logo.ico',
    public comment: string,
    public statusDetails = 1, /*options: 0=>created, 1=>i=on save, 2=>in adit, 4=>deleted*/
    public index: number
  ) {

  }
}

/*export class Recipe {
constructor(
  public code: number,
  public mainDetails: MainDetails,
  public itemLines: ItemLineComponent,
  public instructionLines: InstructionLineComponent,
  public keyWords: string[]
) {

}
}*/


interface Recipe {
  code: any;
  nameRecipe?: any;
  getFrom?: any;
  statusDetails?: any;
  urlImg?: any;
  comment?: any;
  category1?: any;
  category2?: any;
  category3?: any;
  index?: any;
  zeroItems?: any;
  zeroInstructions?: any;
  itemLines?: any[];
  instroctionLines?: any[];

}
