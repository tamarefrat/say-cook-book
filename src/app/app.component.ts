import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { DataBaseService } from './services/data-base.service';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AlertType } from '@jaspero/ng-alerts';
import { document } from 'angular-bootstrap-md/utils/facade/browser';
import { Router } from '@angular/router';
// import { ToastService } from '../../typescripts/pro/alerts'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options = {
    overlay: false,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 3000
  };
  oldid = '';
  newid = '';
  urlProfilImg = 'assets\\homeImg\\logo1.png';
  modeClass;
  modeDisplay;
 // dbs;
  constructor(private _recipeService: RecipeService,
  public dbs: DataBaseService,
    private _alert: AlertsService,
    private router: Router) {
setInterval(() => {this.chackImails(); }
                       , 400000);

// this.dbs = dbs;


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
    this.dbs.allUsersRef.doc(this.newid).set({ userName: this.newid, password: 1234 });
    this.setProfile();
    this.createAlert('success', 'You Signed In Successfully!', '');
    this.router.navigate(['/']);
    this.newid = '';

  }

  login() {
    this.dbs.user = this.oldid;
    this.dbs.changeUser();
    this.createAlert('success', 'You Loged In Successfully!', '');
    this.router.navigate(['/']);
    this.oldid = '';
  }
  logout() {
    this.dbs.user = 'demoUser';
    this.createAlert('success', 'You Loged Out Successfully!', '');
    this.router.navigate(['/']);
    this.dbs.changeUser();
    this.chackImails();
  }
  isLogin() {
    return this.dbs.user !== 'demoUser';
  }
  chackImails() {
    if (this.dbs.mailsForUser && this.dbs.user !== 'demoUser') {
      this.createAlert('info', 'There are recipes was shared with you!', '');
    } else if (this.dbs.user === 'demoUser' && !this.dbs.mailsForUser) {
      this.createAlert('warning', 'You are not loged in!!!', '');
    } else if (this.dbs.user === 'demoUser' && this.dbs.mailsForUser) {

    }
  }
  setProfile() {
this.dbs.updateProfileImg();
  }
}
