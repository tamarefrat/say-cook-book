import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
//  import { AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { Router, ActivatedRoute, Params} from '@angular/router';
// import { AuthServiceService } from '../auth-service.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { RecipeService } from '../services/recipe.service';
import { NewRecipeComponent } from '../recipe/new-recipe/new-recipe.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  withold: Boolean;
  withnewA: Boolean;
  oldid: string;
  newid: string;



  constructor( private afs: AngularFirestore,
     private _recipeService: RecipeService ,
    private route: Router) {
    this.withold = false;
    this.withnewA = false;
  }


  changeoldStatus(ch) {
    this.withold = ch;
    if (ch) {
      this.withnewA = false;
    }
  }
  changeNewAStatus(ch) {
    this.withnewA = ch;
    if (ch) {
      this.withold = false;
    }
  }
  /*
    customErrorStateMatcher: ErrorStateMatcher = {
      isErrorState: (control: FormControl | null) => {
        if (control) {
          const hasInteraction = control.dirty || control.touched;
          const isInvalid = control.invalid;

          return !!(hasInteraction && isInvalid);
        }

        return false;
      }
    };
  */
  addoldUser() {
    this._recipeService.user = this.oldid;
    this._recipeService.userRef = this.afs.collection(this.oldid); // get to his collection
    console.log(this._recipeService.userRef.valueChanges());
    this.route.navigate(['/']);

  }
  addNewUser() {
    // add check if exist
    console.log(this.newid);
    this._recipeService.user = this.newid;
    this._recipeService.userRef = this.afs.collection(this.newid);
    this._recipeService.userRef.doc('recipes').set({'recipes': [], 'counter': '0'});
    this._recipeService.userRef.doc('category').set({ 'categories': [], 'counter': '0' });
    this._recipeService.userRef.doc('voiceSetting').set({});
    this._recipeService.userRef.doc('shared').set({ 'recipes': [], 'counter': '0' });
    /*this._recipeService.addNewRecipeToDB({'code': '1', 'name': '2'});
    this._recipeService.addNewRecipeToDB({ 'code': '2', 'name': '2' });
    this._recipeService.addNewRecipeToDB({ 'code': '3', 'name': '2' });*/
    this.route.navigate(['/']);
  }

  ngOnInit() {
  }

}
