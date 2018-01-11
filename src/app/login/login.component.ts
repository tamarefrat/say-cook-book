import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
//  import { AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { Router, ActivatedRoute, Params} from '@angular/router';
// import { AuthServiceService } from '../auth-service.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { RecipeService } from '../services/recipe.service';
import { NewRecipeComponent } from '../recipe/new-recipe/new-recipe.component';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  withold: Boolean;
  withnewA: Boolean;
  oldid: string;
  newid: string;



  constructor( private dbs: DataBaseService,
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

  addoldUser() {
    this.dbs.user = this.oldid;

   /* this._recipeService.user = this.oldid;
   this._recipeService.userRef = this.afs.collection(this.oldid); // get to his collection
    console.log(this._recipeService.userRef.valueChanges());*/
    this.route.navigate(['/']);

  }
  addNewUser() {
    // add check if exist
    console.log(this.newid);

    this.dbs.user = this.newid;
    this.dbs.counterRef.doc('counterRecipe').set({ counter: 0 });
    this.dbs.counterRef.doc('counterIngredients').set({ counter: 0 });
    this.dbs.counterRef.doc('counterInstructions').set({ counter: 0 });
    this.dbs.allUsersRef.doc(this.newid).set({userName: this.newid, password: 1234});
    this.route.navigate(['/']);
  }

  apears(user) {
    return (this.dbs.userNameList.indexOf(user) > 0);
  }

  ngOnInit() {
  }

}
