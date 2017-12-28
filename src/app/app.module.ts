import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*material*/
import {
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSliderModule,
  MatCheckboxModule,
  MatInputModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatListModule,
  MatTableModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatGridListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatTabsModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialog
} from '@angular/material';
import 'hammerjs';
import { MatIconRegistry } from '@angular/material/icon';
/*components*/
import { AppComponent } from './app.component';
import { RecipeButtonComponent } from './recipe-button/recipe-button.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ItemLineComponent } from './item-line/item-line.component';
import { InstructionLineComponent } from './instruction-line/instruction-line.component';
import { MainDetailsComponent } from './main-details/main-details.component';
import { OptionsForRecipeComponent } from './options-for-recipe/options-for-recipe.component';
import { SignupComponent } from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



/*services*/
import { RecipeService } from './services/recipe.service';
import { AuthServiceService } from './auth-service.service';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule} from 'angularfire2/database';


@NgModule({
  declarations: [
    AppComponent,
    RecipeButtonComponent,
    RecipeListComponent,
    RecipeComponent,
    ItemLineComponent,
    InstructionLineComponent,
    MainDetailsComponent,
    OptionsForRecipeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatListModule,
    MatTableModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTabsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [RecipeService, MatDialog, AuthServiceService],
  bootstrap: [AppComponent,FooterComponent,HeaderComponent]
})
export class AppModule { }
