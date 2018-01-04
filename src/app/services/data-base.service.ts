import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Category {
  name: string;
  id: string;
}

export interface Recipe {
  isFavorit: boolean;
  name: string;
  id: string;
}

export interface Ingerdient {
  recipeId: string;
  product: string;
  amount: number;
  unit: string;
}

export interface Instruction {
  recipeId: string;
  description: string;
}


@Injectable()
export class DataBaseService {

  public categoryRef: AngularFirestoreCollection<Category>;
  public recipesRef: AngularFirestoreCollection<Recipe>;
  public ingredientsRef : AngularFirestoreCollection<Ingerdient>;
  public instructionsRef: AngularFirestoreCollection<Instruction>;

  categoryObservable: Observable<Category[]>;
  recipeObservable: Observable<Recipe[]>;
  ingredientsObservable: Observable<Ingerdient[]>;
  instructionsObservable: Observable<Instruction[]>;

  public categoryList: Category[];
  public recipeList: Recipe[];
  public ingredientsList: Ingerdient[];
  public instructionsList: Instruction[];

  constructor(private afs: AngularFirestore){
    

    //get all categories
    this.categoryRef = this.afs.collection("catgories");
    this.categoryObservable = this.categoryRef.valueChanges();
    this.categoryObservable.subscribe(categories => {
      this.categoryList = categories; 
      this.categoryList.forEach(category => {
        console.log("id: " + category.id + ", name: " + category.name);
      })
    })

    //get all recipes:
    this.recipesRef = this.afs.collection("recipes");
    this.recipeObservable = this.recipesRef.valueChanges();
    this.recipeObservable.subscribe(recipes => {
      this.recipeList = recipes; 
      this.recipeList.forEach(recipe => {
        console.log("isFavorit: " + recipe.isFavorit + ", name: " + recipe.name);
      })
    })

    //get recipe "test" ingredients
    this.ingredientsRef = this.afs.collection("ingredients", ref => {
      return ref.where('recipeId', '==', 'test');
    });
    this.ingredientsObservable = this.ingredientsRef.valueChanges();
    this.ingredientsObservable.subscribe(ingredients => {
      this.ingredientsList = ingredients;
      this.ingredientsList.forEach(ingredient => {
        console.log("product: "  + ingredient.product + ", amount: "  +
         ingredient.amount + ", unit: amount: "  + ingredient.unit);
      })
    });

     //get recipe "test" instructions
     this.instructionsRef = this.afs.collection("instructions", ref => {
      return ref.where('recipeId', '==', 'test');
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructionsList = instructions;
      this.instructionsList.forEach(instruction => {
        console.log("description: " + instruction.description);
      })
    })


    //add category to list
    //this.addCategory("Soup");
    
  }

  addCategory(name: string){
    console.log(name);
    let category = {
      id: name,
      name: name
    }
    this.categoryRef.add(category).then(res=>{
      
    })
  }

}
