import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { DataBaseService } from './services/data-base.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
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
  duration: 3000
};
oldid= '';
newid = '';
modeClass;
modeDisplay;
  constructor(private _recipeService: RecipeService,
    private dbs: DataBaseService,
    private _alert: AlertsService) {

if (this.dbs.user === 'demoUser') {
this.showWarning();
  // this.createAlert('warning', 'You Are Not Log In!', '');
}


    }

showWarning() {
  this.modeClass = "modal fade top in show";
this.modeDisplay = 'block';
}

hideWarning() {
  this.modeClass = "modal fade top";
this.modeDisplay = 'none';
}

createAlert(type, message, tytle) {
  if (tytle === '') {
    this._alert.create(type, message);
  } else {
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
this.showWarning();
   }
   isLogin() {
     return this.dbs.user !== 'demoUser';
   }
   chackImails(){
 alert('sihjbn');
   }
}
