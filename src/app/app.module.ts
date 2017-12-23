import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeButtonComponent } from './recipe-button/recipe-button.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database'

@NgModule({
  declarations: [
    AppComponent,
    RecipeButtonComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
