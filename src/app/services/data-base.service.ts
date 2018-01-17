import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NewRecipeComponent } from '../recipe/new-recipe/new-recipe.component';
import { Foodstuff } from '../item-line/item-line.component';
// import { Instruction } from '../instruction-line/instruction-line.component';
import * as firebase from 'firebase';
import { AlertsService } from '@jaspero/ng2-alerts';
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
  nameRecipe?: string;
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
  name?: string;
  urlProfilImg?: string;
}


@Injectable()
export class DataBaseService {

  public categoryRef: AngularFirestoreCollection<Category>;
  public recipesRef: AngularFirestoreCollection<Recipe>;
  public recipesByCategoryRef: AngularFirestoreCollection<Recipe>;
  public shareRecipesRef: AngularFirestoreCollection<Recipe>;
  public ingredientsRef: AngularFirestoreCollection<Ingerdient>;
  public instructionsRef: AngularFirestoreCollection<Instruction>;
  public counterRef: AngularFirestoreCollection<Counter>;
  public allUsersRef: AngularFirestoreCollection<User>;
  public recipeTempsRef: AngularFirestoreCollection<Recipe>;
  public recDoc: AngularFirestoreDocument<Recipe>;

  categoryObservable: Observable<Category[]>;
  recipeObservable: Observable<Recipe[]>;
  recipesByCategoryObservable: Observable<Recipe[]>;
  sharedRecipeObservable: Observable<Recipe[]>;
  recipeTempObservable: Observable<Recipe>;
  ingredientsObservable: Observable<Ingerdient[]>;
  instructionsObservable: Observable<Instruction[]>;
  settigObservable: Observable<Counter[]>;

  public categoryList: Category[] = [];
  public recipeList: Recipe[] = [];
  public recipeByCategoryList: Recipe[] = [];
 // public recipeTempList: Recipe[] = [];
  public recipeTemp: Recipe;
  public sharedRecipeList: Recipe[] = [];
  public recipe: any;
  public ingredientsList: Ingerdient[] = [];
  public instructionsList: Instruction[] = [];
  public userNameList: string[] = [];

  public user = 'demoUser';
  public userToShare: string;
  public counterRecipe: number; // for uniqe id for recipe-!!-isnot amount of recipes if recipes was  deleted!!
  public counterIngredients: number;
  public counterInstructions: number;
  public recipeInWork: any;
  public folder = 'images';
  public mailsForUser: boolean;

  constructor(private afs: AngularFirestore, private _alert: AlertsService) {

    // get all users
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

      // get counter of recipes
      this.counterRecipe = set[2].counter;
      // get counter of Ingredients
      this.counterIngredients = set[0].counter;
      // get counter of Instructions
      this.counterInstructions = set[1].counter;
    });

    // get all categories
    this.categoryRef = this.afs.collection(`users/${this.user}/catgories`);
    this.categoryObservable = this.categoryRef.valueChanges();
    this.categoryObservable.subscribe(categories => {
      this.categoryList = categories;
     /* this.categoryList.forEach(category => {
        console.log('name:' + category.name);
      });*/
    });
    this.recipeTempsRef = this.afs.collection(`users/${this.user}/recipes`);
    // get all recipes:
    this.recipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', true);
    });
    this.recipeObservable = this.recipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {

      this.recipeList = recipes;
     /* this.recipeList.forEach(recipe => {

        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });*/
    });

    // get all shared recipes:- recipes was shared with me
    this.shareRecipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', false);
    });
    this.sharedRecipeObservable = this.shareRecipesRef.valueChanges();
    this.sharedRecipeObservable.subscribe(recipes => {
      this.sharedRecipeList = recipes;
     /* this.sharedRecipeList.forEach(recipe => {
        console.log('isFavorit: ' + recipe.isFavorit + ', name: ' + recipe.nameRecipe);
      });*/
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

  }


  addCategory(name: string, isFavorite: boolean) {
    console.log(name);
    const category = {
      // id: name,
      name: name,
      isFavorite: isFavorite
    };

    this.categoryRef.doc(category.name).set(category).then(res => {

    });
  }
  addIngredient(namount, nmeasurement, nitem, recId, recName) {// order!!!!!!!!!!!!!!!!

    const ingredient = {
      id: this.counterIngredients,
      recipeId: recId,
      amount: namount,
      product: nitem,
      unit: nmeasurement,
      nameRecipe: recName
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
    let path;

    // create root ref
    const storegRef = firebase.storage().ref();
    const selectedFile = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
    if (selectedFile) {
      path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storegRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        rec.mainDetails.urlImg = path;

      });

    } else {
      rec.mainDetails.urlImg = 'images/logo.png';
    }
    const recipe = {
      id: this.counterRecipe,
      nameRecipe: rec.nameRecipe,
      isFavorit: true,
      getFrom: rec.getFrom,
      comment: rec.comment,
      category1: rec.category1,
      category2: rec.category2,
      category3: rec.category3,
      urlImg: rec.urlImg,
      keyWords: rec.keyWords,
      enable: true
    };
    // have to update counter
    this.counterRecipe++;
    console.log(this.counterRecipe);
    this.counterRef.doc('counterRecipe').set({ counter: this.counterRecipe });
    this.recipesRef.doc('num' + recipe.id).set(recipe).then(res => {

    });
  }




  getRecipeByID(recID) {
    // get one recipe by id:
    const stringId = '' + recID;
this.recipeTemp = null;
    this.recDoc = this.recipeTempsRef.doc<Recipe>('num' + recID);
    this.recipeTempObservable = this.recDoc.valueChanges();
    this.recipeTempObservable.subscribe(recipe => {
      this.recipeTemp = recipe;
      return this.recipeTemp;
});
return this.recipeTemp;
}




  // get ingredients by recipes id
  getIngredientsByRecipeID(id) {
   this.ingredientsList = null;
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
      /*this.ingredientsList.forEach(ingredient => {
        console.log('product: ' + ingredient.product + ', amount: ' +
          ingredient.amount + ', unit: amount: ' + ingredient.unit);
      });*/
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
      /*this.instructionsList.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });*/
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

    let path;

    // create root ref
    const storegRef = firebase.storage().ref();
    const selectedFile = (<HTMLInputElement>document.getElementById('imageFile')).files[0];
    if (selectedFile) {
      path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storegRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        rec.mainDetails.urlImg = path;

      });
    }
    const recipe = {
      id: rec.code,
      nameRecipe: rec.nameRecipe,
      isFavorit: true,
      getFrom: rec.getFrom,
      comment: rec.comment,
      category1: rec.category1,
      category2: rec.category2,
      category3: rec.category3,
      urlImg: rec.urlImg,
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


      // copy recipe
      recipe = this.getRecipeByID(id); // have to wait till update
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
      ingredients = this.getIngredientsByRecipeID(id); // have to wait till update
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
      instructions = this.getInstructionsByRecipeID(id); // have to wait till update
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


    });

 } // end share recipe with all details- end function


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
    let recByCat1Ref: AngularFirestoreCollection<Recipe>;
    let recByCat2Ref: AngularFirestoreCollection<Recipe>;
    let recByCat3Ref: AngularFirestoreCollection<Recipe>;
    let recByCat1List: Recipe[] = [];
    let recByCat2List: Recipe[] = [];
    let recByCat3List: Recipe[] = [];
    this.recipeByCategoryList = [];
    let recByCat1Observable: Observable<Recipe[]>;
     let recByCat2Observable: Observable<Recipe[]>;
      let recByCat3Observable: Observable<Recipe[]>;
    // get recipes of category1
    recByCat1Ref = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category1', '==', cat);
    });
    recByCat1Observable = recByCat1Ref.valueChanges();
    recByCat1Observable.subscribe(recipes1 => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
     
      
      // get images
      /*recByCat1List.forEach(rec => {
        
      });*/ //end for 
      console.log(recipes1);
       recipes1.forEach(rec => {
         if(this.recipeByCategoryList.indexOf(rec)<0) {
           // dont exist in list
        const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
        // set image url
        rec.urlImg = url;

      }).catch((error) => {
        console.log(error);
      });
        console.log(rec);
        this.recipeByCategoryList.push(rec);
    }// end if
      });// end for
     
      console.log(this.recipeByCategoryList);
    });

    // get recipes of category2
    recByCat2Ref = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category2', '==', cat);
    });
    recByCat2Observable = recByCat2Ref.valueChanges();
    recByCat2Observable.subscribe(recipes2 => {
       console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  
      console.log(recipes2);
       recipes2.forEach(rec => {
         if(this.recipeByCategoryList.indexOf(rec)<0) {
           // dont exist in list
        console.log(rec);
        this.recipeByCategoryList.push(rec);
         }// end if
      });// end for
      console.log(this.recipeByCategoryList);
    });// end subscribe

    // get recipes of category3
    recByCat3Ref = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category3', '==', cat);
    });
    recByCat3Observable = recByCat3Ref.valueChanges();
    recByCat3Observable.subscribe(recipes3 => {
       console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(recipes3);
      
      recipes3.forEach(rec => {
        if(this.recipeByCategoryList.indexOf(rec)<0) {
           // dont exist in list
        console.log(rec);
        this.recipeByCategoryList.push(rec);
        }//end if
      });// end for
      
      console.log(this.recipeByCategoryList);
    });// end subscribe

  }


  getAllIngredients() {
    this.ingredientsList = null;
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`);
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
    });
  }

  getIngredientsByProduct(product) {
    this.ingredientsList = null;
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('product', '==', product);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;

    });
  }



  /************************       storege      *************** */
  /*
  addFileToStorege(recipe) {
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
  }*/

  /*getImageByRecipeCodeFromDB(code) {
    let imageURL: any;
    const storegRef = firebase.storage().ref();
    const spaceRef = storegRef.child(this.getRecipeByCodeFromDB(code).mainDetails.path).getDownloadURL().then((url) => {
      // set image url
      imageURL = url;
    }).catch((error) => {
      console.log(error);
    });
  }*/

/********************************************************************* */


  changeUser() {

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

    });
    this.recipeTempsRef = this.afs.collection(`users/${this.user}/recipes`);
    // get all recipes:
    this.recipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', true);
    });
    this.recipeObservable = this.recipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {

      this.recipeList = recipes;

    });

    // get all shared recipes:- recipes was shared with me
    this.shareRecipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', false);
    });
    this.sharedRecipeObservable = this.shareRecipesRef.valueChanges();
    this.sharedRecipeObservable.subscribe(recipes => {
      this.sharedRecipeList = recipes;
      this.mailsForUser = (this.sharedRecipeList.length > 0);
    });

// get all ingredients
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`);
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;

    });

    // get all instructions
    this.instructionsRef = this.afs.collection(`users/${this.user}/instructons`);
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructionsList = instructions;

    });
 }

 /****************************************************************** */
 /***************             alert             **************** */
  createAlert(type, message, tytle) {
    if (tytle === '') {
      this._alert.create(type, message);
    } else {
      this._alert.create(type, message, tytle);
    }
  }
}
