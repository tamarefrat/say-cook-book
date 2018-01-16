import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { DataBaseService } from './services/data-base.service';
import { AlertsService } from '@jaspero/ng2-alerts';
// import { ToastService } from '../../typescripts/pro/alerts'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   options =  {
  overlay: false,
  overlayClickToClose: true,
  showCloseButton: false,
  duration: 4000
};
oldid= '';
newid = '';
  constructor(private _recipeService: RecipeService,
    private dbs: DataBaseService,
    private _alert: AlertsService) {

if(this.dbs.user ==='demoUser') {
  this.createAlert('warning', 'You Are Not Log In!', '');
}
if(this.dbs.sharedRecipeList.length > 0) {
  this.createAlert('info', 'There Are Shared Recipes Waiting for You', '');
}

    }


createAlert(type, message, tytle) {
  if (tytle === '') {
    this._alert.create(type, message);
  } else{
  this._alert.create(type, message, tytle);
  }
}

 apears(user) {
    return (this.dbs.userNameList.indexOf(user) > 0);
  }
signUp() {
  this.dbs.user = this.newid;
  this.dbs.changeUser();
  this.dbs.counterRef.doc('counterRecipe').set({ counter: 0 });
    this.dbs.counterRef.doc('counterIngredients').set({ counter: 0 });
    this.dbs.counterRef.doc('counterInstructions').set({ counter: 0 });
    this.dbs.allUsersRef.doc(this.newid).set({userName: this.newid, password: 1234});
this.createAlert('success', 'You Signed In Successfully!', '');
this.newid = '';

}

  login() {
this.dbs.user = this.oldid;
this.dbs.changeUser();
this.createAlert('success', 'You Loged In Successfully!', '');
this.oldid = '';
  }
   logout() {
this.dbs.user = 'demoUser';
this.createAlert('info', 'You Loged out!', 'attention');
this.dbs.changeUser();
   }
   isLogin() {
     return this.dbs.user !== 'demoUser';
   }
   chackImails(){
 alert('sihjbn');
   }
}
