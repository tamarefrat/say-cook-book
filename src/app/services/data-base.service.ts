import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AlertType } from '@jaspero/ng-alerts';
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
  id: any;
  recipeId: string;
  product: string;
  amount: number;
  unit: string;
  nameRecipe?: string;
  // index: number;
}

export interface Instruction {
  id: any;
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
  public favoriteRecipesRef: AngularFirestoreCollection<Recipe>;
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
  favoriteRecipeObservable: Observable<Recipe[]>;
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
  public favoriteRecipeList: Recipe[] = [];
  public recipe: any;
  public ingredientsList: Ingerdient[] = [];
  public instructionsList: Instruction[] = [];
  public userNameList: string[] = [];

  public user = 'demoUser';
  public userImg = 'assets\\homeImg\\logo1.png';
  public counterRecipe: number; // for uniqe id for recipe-!!-isnot amount of recipes if recipes was  deleted!!
  public counterIngredients: number;
  public counterInstructions: number;
  public recipeInWork: any;
  public folder = 'images';
  public mailsForUser: boolean;
  classForMails;
  // for sharing
  countRec2 = 0;
  countIngre2 = 0;
  countInstr2 = 0;
  copyFlag = false;
  sharedFlag = false;
  public userToShare: string;

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
      this.recipeList.forEach(rec => {
         const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
           // set image url
           rec.urlImg = url;

         }).catch((error) => {
           rec.urlImg = 'assets\\homeImg\\logo1.png';
           console.log(error);
         });
      //  rec.urlImg = this.getPath(rec.urlImg);
      });

    });

    // get all favorite recipes:
    this.favoriteRecipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('isFavorit', '==', true);
    });
    this.favoriteRecipeObservable = this.favoriteRecipesRef.valueChanges();
    this.favoriteRecipeObservable.subscribe(recipes => {

      this.favoriteRecipeList = recipes;
      this.favoriteRecipeList.forEach(rec => {
         const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
           // set image url
           rec.urlImg = url;
           console.log(rec);

         }).catch((error) => {
           rec.urlImg = 'assets\\homeImg\\logo1.png';
           console.log(error);
         });
  // rec.urlImg = this.getPath(rec.urlImg);
      });
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
      });
    });

    // get recipe "test" instructions
    this.instructionsRef = this.afs.collection(`users/${this.user}/instructions`, ref => {
      return ref.where('recipeId', '==', 'test');
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructionsList = instructions;
      this.instructionsList.forEach(instruction => {
        // console.log('description: ' + instruction.description);
      });
    });

  }


  addCategory(name: string, isFavorite: boolean) {
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
        rec.urlImg = path;
        const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
                 // set image url
                 rec.urlImg = url;

               }).catch((error) => {
                 rec.urlImg = 'assets\\homeImg\\logo1.png';
                 console.log(error);
               });
      //  rec.urlImg = this.getPath(rec.urlImg);
      });

    } else {
      path = '/images/logo1.png';
    }
    const recipe = {
      id: this.counterRecipe,
      nameRecipe: rec.nameRecipe,
      isFavorit: rec.isFavorit,
      getFrom: rec.getFrom,
      comment: rec.comment,
      category1: rec.category1,
      category2: rec.category2,
      category3: rec.category3,
      urlImg: path,
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
  public getIngredientsByRecipeID(id) {
    this.ingredientsList = null;
    this.ingredientsRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
    });
  }

  // get instuctions by recipe id
  public getInstructionsByRecipeID(id) {
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
  }


  // delete functions
  deleteIngredient(recId, ingre: Ingerdient) {
    this.ingredientsRef.doc('num' + ingre.id).delete();
    console.log('delete' + ingre.id);
  }

  deleteInstruction(recId, instruction: Instruction) {
    this.instructionsRef.doc('num' + instruction.id).delete();
    console.log('delete' + instruction.id);
  }

  deleteRecipe(id) {
    // have to delete recipe , ingredients and instruction????????????????????????????????????????

    const ingRef: AngularFirestoreCollection<Ingerdient> = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    const ingredientsObservable: Observable<Ingerdient[]> = ingRef.valueChanges();
    ingredientsObservable.subscribe(ingredients => {
      ingredients.forEach(ing => {
        this.deleteIngredient(id, ing);
      });

    });

    // get all instructions
    const instructionsRef: AngularFirestoreCollection<Instruction> = this.afs.collection(`users/${this.user}/instructons`, ref => {
      return ref.where('recipeId', '==', id);
    });
    const instructionsObservable: Observable<Instruction[]> = instructionsRef.valueChanges();
    instructionsObservable.subscribe(instructions => {
      instructions.forEach(ins => {
        this.deleteInstruction(id, ins);
      });

    });

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
        rec.urlImg = path;
     const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
           // set image url
           rec.urlImg = url;

         }).catch((error) => {
           rec.urlImg = 'assets\\homeImg\\logo1.png';
           console.log(error);
         });
      //  rec.urlImg = this.getPath(rec.urlImg);
      });
    } else {
      path = rec.urlImg;
    }
    const recipe = {
      id: rec.code,
      nameRecipe: rec.nameRecipe,
      isFavorit: rec.isFavorit,
      getFrom: rec.getFrom,
      comment: rec.comment,
      category1: rec.category1,
      category2: rec.category2,
      category3: rec.category3,
      urlImg: path,
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
  shareWithOtherUserMyRecipe(recipes, userToShare, isArray) {
    let counterOtherRef: AngularFirestoreCollection<Counter>;
    let counterOtherObser: Observable<Counter[]>;
    const mySelected = this.recipeList;
    const myPromise = new Promise((resolve, reject) => {
      // get countsers of other user
      counterOtherRef = this.afs.collection(`users/${userToShare}/counter`);
      counterOtherObser = counterOtherRef.valueChanges();
      counterOtherObser.subscribe(set => {
        resolve(set);
      });
    });

    myPromise.then(set => {
     // get counter of recipes
    this.countRec2 = set[2].counter;
    // get counter of Ingredients
    this.countIngre2 = set[0].counter;
    // get counter of Instructions
    this.countInstr2 = set[1].counter;

if (isArray) {
  for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].selected) {
        // have to share this recipe
        this.copyRecipe(mySelected[i].id, userToShare, this.countRec2++);
        console.log(mySelected[i].nameRecipe);
      }
    }
} else { // only 1 recipe
  this.copyRecipe(recipes, userToShare, this.countRec2++);
}
});
  }

  copyRecipe(id, userToShare, countRec2) {

    // have copy recipe from me to other user with disable mode
    // have update id by other user to new id and update counters
    // have also copy ingredients and instructions

    // let countIngre2;
    // let countInstr2;
    let counterOtherRef: AngularFirestoreCollection<Counter>;
    let recShareDoc: AngularFirestoreDocument<Recipe>;
    let recipeShareObservable: Observable<Recipe>;
    let ingreShareObser: Observable<Ingerdient[]>;
    let ingreShareRef: AngularFirestoreCollection<Ingerdient>;
    let instruShareObser: Observable<Instruction[]>;
    let instrShareRef: AngularFirestoreCollection<Instruction>;
    // let counterOtherObser: Observable<Counter[]>;
    //  let recipe: Recipe;
    let ingredients: Ingerdient[];
    /*counterOtherRef = this.afs.collection(`users/${userToShare}/counter`);

        // get countsers of other user
        counterOtherRef = this.afs.collection(`users/${userToShare}/counter`);
        counterOtherObser = counterOtherRef.valueChanges();
        counterOtherObser.subscribe(set => {*/
    // get counter of recipes
   /* countRec2 = this.countRec2++;*/
    // get counter of Ingredients
    /*countIngre2 = this.countIngre2++;*/
    // get counter of Instructions
  /*  countInstr2 = this.countInstr2++;*/
    counterOtherRef = this.afs.collection(`users/${userToShare}/counter`);


    // copy recipe
    recShareDoc = this.afs.collection(`users/${this.user}/recipes`).doc<Recipe>('num' + id);
    recipeShareObservable = recShareDoc.valueChanges();
    recipeShareObservable.subscribe(recipe => { // have to wait till update
      // change id for other user
      recipe.id = countRec2;
      console.log('countRec');
      console.log(countRec2);
      console.log(recipe.id);
      // remove categoris from recipe for new user????????????????????????
      recipe.category1 = '';
      recipe.category2 = '';
      recipe.category3 = '';
      recipe.enable = false;
      recipe.isFavorit = false;
      // add recipe to other user
      this.afs.collection((`users/${userToShare}/recipes`)).doc('num' + recipe.id).set(recipe).then(res => {
      });
    }); // end copy recipe


    // copy ingredients
    ingreShareRef = this.afs.collection(`users/${this.user}/ingredients`, ref => {
      return ref.where('recipeId', '==', id);
    });
    ingreShareObser = ingreShareRef.valueChanges();
    ingreShareObser.subscribe(ingre => {

      ingredients = ingre; // have to wait till update
      ingredients.forEach(ing => {
        console.log('shared ing');
        console.log(ing);
        // change id of ingredient for other user
        ing.id = this.countIngre2++; // ?????????
        ing.recipeId = countRec2;
        console.log('rec id');
        console.log(countRec2);
        console.log(ing.recipeId);
        this.afs.collection((`users/${userToShare}/ingredients`)).doc('num' + ing.id).set(ing).then(res => {

          console.log('shared ing');
          console.log(ing);
        });
        // update counter for next ing
        /*countIngre2++;*/
      }); // end for
      // update counter in DB
      counterOtherRef.doc('counterIngredients').set({ counter: this.countIngre2 });
    }); // end copy ingredients




    // copy instructions
    instrShareRef = this.afs.collection(`users/${this.user}/instructions`, ref => {
      return ref.where('recipeId', '==', id);
    });
    instruShareObser = instrShareRef.valueChanges(); // have to wait till update
    instruShareObser.subscribe(instr => {

      instr.forEach(ins => {
        // change id of instruction for other user
        ins.id = this.countInstr2++; // ?????????????/
        ins.recipeId = countRec2;
        this.afs.collection((`users/${userToShare}/instructions`)).doc('num' + ins.id).set(ins).then(res => {

        });
        // update counter for next ing
       /* countInstr2++;*/
      }); // end for
      // update instruction counter in DB
      counterOtherRef.doc('counterInstructions').set({ counter: this.countInstr2 });

    }); // end copy instructions

    // update recipe counter for other user
    /*countRec2++;*/
    counterOtherRef.doc('counterRecipe').set({ counter: this.countRec2 });
    console.log(this.sharedRecipeList);
  } // end share recipe with all details- end function


  updateCounters() {
    console.log('inupdate');
    console.log(this.countIngre2);
    let counterOtherRef: AngularFirestoreCollection<Counter>;
    counterOtherRef = this.afs.collection(`users/${this.userToShare}/counter`);
    // update counter in DB
    counterOtherRef.doc('counterIngredients').set({ counter: this.countIngre2 });
    console.log(this.countIngre2);
    // update instruction counter in DB
    counterOtherRef.doc('counterInstructions').set({ counter: this.countInstr2 });

    // update recipe counter for other user
    this.countRec2++;
    counterOtherRef.doc('counterRecipe').set({ counter: this.countRec2 });
  }

  enableRecipeFromShare(recipe: Recipe) {
    recipe.enable = true;
    this.recipesRef.doc('num' + recipe.id).update(recipe);
    this.mailsForUser = (this.sharedRecipeList.length > 0);
  }

  /************************************************************* */
  /**************       search and other functions        ***************** */

  public getFavoritesFromOption() {
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
    const recByCat1List: Recipe[] = [];
    const recByCat2List: Recipe[] = [];
    const recByCat3List: Recipe[] = [];
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


      // get images
      /*recByCat1List.forEach(rec => {

      });*/ // end for
      console.log(recipes1);
      recipes1.forEach(rec => {
      //  if (this.recipeByCategoryList.indexOf(rec) < 0) {
          // dont exist in list
          const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
             // set image url
             rec.urlImg = url;

           }).catch((error) => {
             rec.urlImg = 'assets\\homeImg\\logo1.png';
             console.log(error);
           });
          this.recipeByCategoryList.push(rec);
     //   }// end if
      }); // end for
});

    // get recipes of category2
    recByCat2Ref = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category2', '==', cat);
    });
    recByCat2Observable = recByCat2Ref.valueChanges();
    recByCat2Observable.subscribe(recipes2 => {

      recipes2.forEach(rec => {
        if (this.recipeByCategoryList.indexOf(rec) < 0) {
          // dont exist in list
          const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
            // set image url
            rec.urlImg = url;

          }).catch((error) => {
            rec.urlImg = 'assets\\homeImg\\logo1.png';
            console.log(error);
          });
          this.recipeByCategoryList.push(rec);
        }// end if
      }); // end for
      console.log(this.recipeByCategoryList);
    }); // end subscribe

    // get recipes of category3
    recByCat3Ref = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('category3', '==', cat);
    });
    recByCat3Observable = recByCat3Ref.valueChanges();
    recByCat3Observable.subscribe(recipes3 => {
      recipes3.forEach(rec => {
        if (this.recipeByCategoryList.indexOf(rec) < 0) {
          // dont exist in list
          const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
            // set image url
            rec.urlImg = url;

          }).catch((error) => {
            rec.urlImg = 'assets\\homeImg\\logo1.png';
            console.log(error);
          });
          this.recipeByCategoryList.push(rec);
        } // end if
      }); // end for

      console.log(this.recipeByCategoryList);
    }); // end subscribe

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

  getPath(img) {
    const spaceRef = firebase.storage().ref().child(img).getDownloadURL().then((url) => {
      // set image url
      return url;

    }).catch((error) => {
      console.log(error);
      return 'assets\\homeImg\\logo1.png';
    });

    return img;
  }
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
// change profile image
let img;
    this.allUsersRef.doc<User>(this.user).valueChanges().subscribe(user => {
       img = user.urlProfilImg;
      const spaceRef = firebase.storage().ref().child(img).getDownloadURL().then((url) => {
        // set image url
        this.userImg = url;

      }).catch((error) => {
        this.userImg = 'assets\\homeImg\\logo1.png';
        console.log(error);
      });
    });

    // get counters
    this.counterRef = this.afs.collection(`users/${this.user}/counter`);
    this.settigObservable = this.counterRef.valueChanges();
    this.settigObservable.subscribe(set => {
      // console.log('counters');
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

    });
    this.recipeTempsRef = this.afs.collection(`users/${this.user}/recipes`);
    // get all recipes:
    this.recipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('enable', '==', true);
    });
    this.recipeObservable = this.recipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {

      this.recipeList = recipes;
      this.recipeList.forEach(rec => {
         const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
           // set image url
           rec.urlImg = url;

         }).catch((error) => {
           rec.urlImg = 'assets\\homeImg\\logo1.png';
           console.log(error);
         });
 //   rec.urlImg = this.getPath(rec.urlImg);
      });

    });
    // get all favorite recipes:
    this.favoriteRecipesRef = this.afs.collection(`users/${this.user}/recipes`, ref => {
      return ref.where('isFavorit', '==', true);
    });
    this.favoriteRecipeObservable = this.favoriteRecipesRef.valueChanges();
    this.favoriteRecipeObservable.subscribe(recipes => {

      this.favoriteRecipeList = recipes;
      this.favoriteRecipeList.forEach(rec => {
     const spaceRef = firebase.storage().ref().child(rec.urlImg).getDownloadURL().then((url) => {
                // set image url
                rec.urlImg = url;
                console.log(rec);

              }).catch((error) => {
                rec.urlImg = 'assets\\homeImg\\logo1.png';
                console.log(error);
              });
       // rec.urlImg = this.getPath(rec.urlImg);
      });
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
    this.instructionsRef = this.afs.collection(`users/${this.user}/instructions`);
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
  checkIfThereIsMails() {
    if (this.mailsForUser || this.user === 'demoUser') {
      this.classForMails = 'fa fa-envelope fa-x animated flash infinite';
    } else {
      this.classForMails = 'fa fa-envelope';
    }
  }


  updateProfileImg() {
    let path;

    // create root ref
    const storegRef = firebase.storage().ref();
    const selectedFile = (<HTMLInputElement>document.getElementById('imageUser')).files[0];
    if (selectedFile) { // if upload new image
      path = `/users/${this.user}`;
      const iRef = storegRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
       // this.userImg = path;
         const spaceRef = firebase.storage().ref().child(path).getDownloadURL().then((url) => {
           // set image url
           this.userImg = url;

         }).catch((error) => {
           this.userImg = 'assets\\homeImg\\logo1.png';
           console.log(error);
         });

      });

    } else {
      path = 'images/logo1.png';
    }

    const user = {
      userName: this.user,
      password: 1234,
      urlProfilImg: path
    };

    // have to update in db

    this.allUsersRef.doc(this.user).set(user).then(res => {

    });
  }
}

