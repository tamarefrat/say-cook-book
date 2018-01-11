import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NewRecipeComponent } from '../recipe/new-recipe/new-recipe.component';
import { Foodstuff } from '../item-line/item-line.component';
// import { Instruction } from '../instruction-line/instruction-line.component';

export interface Category {
  name: string;
  // id: string;
  isFavorite: boolean;
}

export interface Recipe {
  isFavorit: boolean;
  nameRecipe: string;
  id: string;
  getFrom: string;
  comment: string;
  category1: string;
  category2: string;
  category3: string;
  urlImg: string;
  enable: boolean;
  keyWords: string[];
}

export interface Ingerdient {
  id: string;
  recipeId: string;
  product: string;
  amount: number;
  unit: string;
  // index: number;
}

export interface Instruction {
  id: string;
  recipeId: string;
  description: string;
  //  index: string;
}
export interface Counter {
  counter: number;
}

export interface User {
  userName: any;
  password: any;
}


@Injectable()
export class DataBaseService {

  public categoryRef: AngularFirestoreCollection<Category>;
  public recipesRef: AngularFirestoreCollection<Recipe>;
  public shareRecipesRef: AngularFirestoreCollection<Recipe>;
  public ingredientsRef: AngularFirestoreCollection<Ingerdient>;
  public instructionsRef: AngularFirestoreCollection<Instruction>;
  public counterRef: AngularFirestoreCollection<Counter>;
  public allUsersRef: AngularFirestoreCollection<User>;

  categoryObservable: Observable<Category[]>;
  recipeObservable: Observable<Recipe[]>;
  sharedRecipeObservable: Observable<Recipe[]>;
  recipeTempObservable: Observable<Recipe[]>;
  ingredientsObservable: Observable<Ingerdient[]>;
  instructionsObservable: Observable<Instruction[]>;
  settigObservable: Observable<Counter[]>;

  public categoryList: Category[] = [];
  public recipeList: Recipe[] = [];
  public sharedRecipeList: Recipe[] = [];
  public recipe: Recipe;
  public ingredientsList: Ingerdient[] = [];
  public instructionsList: Instruction[] = [];
  public userNameList: string[] = [];

  public user = 'demoUser';
  public userToShare: string;
  public counterRecipe: number; // for uniqe id for recipe-!!-isnot amount of recipes if recipes was  deleted!!
  public counterIngredients: number;
  public counterInstructions: number;
  public recipeInWork: any;

  public mailsForUser: boolean;

  constructor(private afs: AngularFirestore) {

    this.allUsersRef = this.afs.collection('users');
    this.allUsersRef.valueChanges().subscribe(users => {
      users.forEach(user => {
        this.userNameList.push(user.userName);
      });
    });
    // get counters
    this.counterRef = this.afs.collection(`users/${this.user}/counter`);
    this.settigObservable = this.counterRef.valueChanges();
    this.settigObservable.subscribe(set => {
      console.log('counters');
      console.log(set);
      // get counter of recipes
      this.counterRecipe = set[2].counter;
      // get counter of Ingredients
      this.counterIngredients = set[0].counter;
      // get counter of Instructions
      this.counterInstructions = set[1].counter;
      console.log('counter= ' + this.counterRecipe);
    });

    // get all categories
    this.categoryRef = this.afs.collection(`users/${this.user}/catgories`);
    this.categoryObservable = this.categoryRef.valueChanges();
    this.categoryObservable.subscribe(categories => {
      this.categoryList = categories;
      this.categoryList.forEach(category => {
        console.log('name:' + category.name);
      });
    });

    // get all recipes:
    this.recipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', true);
    });
    this.recipeObservable = this.recipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {
      console.log('user');
      console.log(this.user);
      console.log('recipes');
      console.log(recipes);
      this.recipeList = recipes;
      this.recipeList.forEach(recipe => {

        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });
    });

    // get all shared recipes:- recipes was shared with me
    this.shareRecipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', false);
    });
    this.sharedRecipeObservable = this.shareRecipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {
      this.sharedRecipeList = recipes;
      this.sharedRecipeList.forEach(recipe => {
        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });
    });
    this.mailsForUser = (this.sharedRecipeList.length > 0);



    // get recipe "test" ingredients
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', 'test');
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
      this.ingredientsList.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
      });
    });

    // get recipe "test" instructions
    this.instructionsRef = this.afs.collection(`users/${this.user}/instructons`, ref => {
      return ref.where('recipeId', '==', 'test');
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructionsList = instructions;
      this.instructionsList.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });
    });


    // add category to list
    // this.addCategory("Soup");

  }

  addCategory(name: string, isFavorite: boolean) {
    console.log(name);
    const category = {
      // id: name,
      name: name,
      isFavorite: isFavorite
    };
    console.log('name' + name);
    this.categoryRef.doc(category.name).set(category).then(res => {

    });
  }
  addIngredient(namount, nmeasurement, nitem, recId: any) {// order!!!!!!!!!!!!!!!!
    // console.log(name);
    const ingredient = {
      id: this.counterIngredients,
      recipeId: recId,
      amount: namount,
      product: nitem,
      unit: nmeasurement
    };
    this.counterIngredients++;
    this.counterRef.doc('counterIngredients').set({ counter: this.counterIngredients });
    this.ingredientsRef.doc('num' + ingredient.id).set(ingredient).then(res => {

    });
  }

  addInstruction(description: string, recipeId: any) {// order!!!!!!!!!!!!!!!!
    // console.log(name);
    const ins = {
      id: this.counterInstructions,
      recipeId: recipeId,
      description: description
    };
    this.counterInstructions++;
    this.counterRef.doc('counterInstructions').set({ counter: this.counterInstructions });
    this.instructionsRef.doc('num' + ins.id).set(ins).then(res => {

    });
  }

  addRecipe(rec: any) {
    console.log(name);
    const recipe = {
      id: this.counterRecipe,
      nameRecipe: rec.mainDetails.nameRecipe,
      isFavorit: true,
      getFrom: rec.mainDetails.getFrom,
      comment: rec.mainDetails.comment,
      category1: rec.mainDetails.category1,
      category2: rec.mainDetails.category2,
      category3: rec.mainDetails.category3,
      urlImg: rec.mainDetails.urlImg,
      keyWords: rec.keyWords,
      enable: true
    };
    // have to update counter
    this.counterRecipe++;
    console.log(this.counterRecipe);
   this.counterRef.doc('counterRecipe').set({ counter: this.counterRecipe });
    this.recipesRef.doc('num' + recipe.id).set(recipe).then(res => {
console.log(res);
    });
  }




  getRecipeByID(recID) {
    // get one recipe by id:
    const stringId = recID;
    this.recipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('id', '==', recID);
    });
    this.recipeTempObservable = this.recipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {
      this.recipe = recipes[0]; // the first and uniq recipe in list

     // console.log("isFavorit: " + this.recipe.isFavorit + ", name: " + this.recipe.nameRecipe);

    });
    return this.recipe;
  }

  // get ingredients by recipes id
  getIngredientsByRecipeID(id) {
    const stringId = id;
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
      this.ingredientsList.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
      });
    });
    return this.ingredientsList;
  }

  // get instuctions by recipe id
  getInstructionsByRecipeID(id) {
    const stringId = 'recipe' + id; // ?????
    this.instructionsRef = this.afs.collection(`users/${this.user}/instructions`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructionsList = instructions;
      this.instructionsList.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });
    });
    return this.instructionsList;
  }


  // delete functions
  deleteIngredient(recId, ingre: Ingerdient) {
    this.ingredientsRef.doc('num' + ingre.id).delete();
  }

  deleteInstruction(recId, instruction: Instruction) {
    this.instructionsRef.doc('num' + instruction.id).delete();
  }

  deleteRecipe(id) {
    // have to delete recipe , ingredients and instruction????????????????????????????????????????
    this.recipesRef.doc('num' + id).delete();

  }
  deleteCategory(category: Category) {
    this.categoryRef.doc(category.name).delete();
  }


  // update functions
  updateIngredient(item: Ingerdient) {
    this.ingredientsRef.doc('num' + item.id).update(item);
  }
  updateInstruction(recId, instruction: Instruction) {
    this.instructionsRef.doc('num' + instruction.id).update(instruction);
  }

  updateRecipe(rec: any) {
    const recipe = {
      id: rec.code,
      nameRecipe: rec.mainDetails.nameRecipe,
      isFavorit: true,
      getFrom: rec.mainDetails.getFrom,
      comment: rec.mainDetails.comment,
      category1: rec.mainDetails.category1,
      category2: rec.mainDetails.category2,
      category3: rec.mainDetails.category3,
      urlImg: rec.mainDetails.urlImg,
      keyWords: rec.keyWords,
      enable: true
    };

    this.recipesRef.doc('num' + recipe.id).update(recipe);

  }

  updateCategory(category: Category) {
    this.categoryRef.doc(category.name).update(category);
  }
  /************************************************************* */
  /**************       share functions        ***************** */

  getAllRecipesSharedWithMe() {
    // get them in disable  mode
    return this.sharedRecipeList;
  }


  // add recipe to shared list- disable untill coosed by user
  // it addes the recipe to another user- to his shared list
  shareWithOtherUserMyRecipe(id, userToShare) {
    // have copy recipe from me to other user with disable mode
    // have update id by other user to new id and update counters
    // have also copy ingredients and instructions
    let countRec2;
    let countIngre2;
    let countInstr2;
    let counterOtherRef: AngularFirestoreCollection<Counter>;
    let counterOtherObser: Observable<Counter[]>;
    let recipe: Recipe;
    let ingredients: Ingerdient[];
    let instructions: Instruction[];
    // get countsers of other user
    counterOtherRef = this.afs.collection(`users/${this.userToShare}/counter`);
    counterOtherObser = counterOtherRef.valueChanges();
    counterOtherObser.subscribe(set => {
      // get counter of recipes
      countRec2 = set[0].counter;
      // get counter of Ingredients
      countIngre2 = set[1].counter;
      // get counter of Instructions
      countInstr2 = set[2].counter;
      console.log('counter= ' + this.counterRecipe);
    });
    // copy recipe
    recipe = this.getRecipeByID(id);
    // change id for other user
    recipe.id = countRec2;
    recipe.enable = false;
    // add recipe to other user
    this.afs.collection((`users/${this.userToShare}/recipes`)).doc('num' + recipe.id).set(recipe).then(res => {

    });
    // update counter for other user
    countRec2++;
    counterOtherRef.doc('counterRecipe').set({ counter: countRec2 });


    // copy ingredients
    ingredients = this.getIngredientsByRecipeID(id);
    ingredients.forEach(ing => {
      // change id of ingredient for other user
      ing.id = countIngre2;
      this.afs.collection((`users/${this.userToShare}/ingerdients`)).doc('num' + ing.id).set(ing).then(res => {

      });
      // update counter for next ing
      countIngre2++;
    }); // end for

    // update counter in DB
    counterOtherRef.doc('counterIngredients').set({ counter: countIngre2 });


    // copy instructions
    instructions = this.getInstructionsByRecipeID(id);
    instructions.forEach(ins => {
      // change id of instruction for other user
      ins.id = countInstr2;
      this.afs.collection((`users/${this.userToShare}/instructions`)).doc(ins.id).set(ins).then(res => {

      });
      // update counter for next ing
      countInstr2++;
    }); // end for

    // update counter in DB
    counterOtherRef.doc('counterInstructions').set({ counter: countInstr2 });



  }


  /* addSharedRecipe(recipe: Recipe, newId: any) {
     recipe.id = newId;
     recipe.enable = false;
     this.shareRecipesRef.add(recipe).then(res => {

     });
   }*/

  shareOneRecipe(id) {
// have navigate to share page with this recipe choosed and ready to share
  }
  enableRecipeFromShare(recipe: Recipe) {
    recipe.enable = true;
    this.recipesRef.doc('num' + recipe.id).update(recipe);
  }

  /************************************************************* */
  /**************       search and other functions        ***************** */

  getFavoritesFromOption() {
    const favorites = [];
    this.categoryList.forEach(element => {
      if (element.isFavorite) {
        favorites.push(element.name);
      }
    });
    return favorites;
  }
  getRecipesByCategory(cat) {
    let recByCatRef: AngularFirestoreCollection<Recipe>;
    let recByCat1List: Recipe[] = [];
    let recByCat2List: Recipe[] = [];
    let recByCat3List: Recipe[] = [];
    let allRecByCatList: Recipe[] = [];
    let recByCatObservable: Observable<Recipe[]>;
    // get recipes of category1
    recByCatRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category1', '==', cat);
    });
    recByCatObservable = this.recipesRef.valueChanges();
    recByCatObservable.subscribe(recipes => {
      recByCat1List = recipes;
      recByCat1List.forEach(recipe => {
        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });
    });

    // get recipes of category2
    recByCatRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category2', '==', cat);
    });
    recByCatObservable = this.recipesRef.valueChanges();
    recByCatObservable.subscribe(recipes => {
      recByCat2List = recipes;
      recByCat2List.forEach(recipe => {
        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });
    });

    // get recipes of category3
    recByCatRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category3', '==', cat);
    });
    recByCatObservable = this.recipesRef.valueChanges();
    recByCatObservable.subscribe(recipes => {
      recByCat3List = recipes;
      recByCat3List.forEach(recipe => {
        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });
    });

    allRecByCatList.concat(recByCat1List).concat(recByCat2List).concat(recByCat3List);
    return allRecByCatList;
  }


  getAllIngredients() {
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`);
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
      this.ingredientsList.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
      });
    });
  }

  getIngredientsByProduct(product) {
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('product', '==', product);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
      this.ingredientsList.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
      });
    });
  }

}
