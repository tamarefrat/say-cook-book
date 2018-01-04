import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { routing } from './app.routing';




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
import { HomePageComponent } from './home-page/home-page.component';
import { SearchByCategoryComponent } from './searches/search-by-category/search-by-category.component';
import { SearchByPictureComponent } from './searches/search-by-picture/search-by-picture.component';
import { SearchByKeywordsComponent } from './searches/search-by-keywords/search-by-keywords.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
<<<<<<< HEAD
import { ShowAudioRecipeComponent } from './recipe/show-audio-recipe/show-audio-recipe.component';
import { ShareComponent } from './recipe/share/share.component';
=======
import { ReaderRecipeComponent } from './reader-recipe/reader-recipe.component';
>>>>>>> c5f8e3d31e9432805fcbaf2bb3f8e94aff68fec5
import { VoiceSettingComponent } from './voice-setting/voice-setting.component';
import { SpeechComponent } from './speech/speech.component';


/*services*/
import { RecipeService } from './services/recipe.service';
import { AuthServiceService } from './auth-service.service';
import { SpeechService } from './services/speech.service';
import { NewUserComponent } from './home-page/new-user/new-user.component';
import { NewRecipeComponent } from './recipe/new-recipe/new-recipe.component';
import { DataBaseService } from './services/data-base.service';




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
    HomePageComponent,
    SearchByCategoryComponent,
    SearchByPictureComponent,
    SearchByKeywordsComponent,
    AddCategoryComponent,
    CategoriesComponent,
    AboutComponent,
    ShowAudioRecipeComponent,
    ShareComponent,
    FooterComponent,
    HeaderComponent,
    SpeechComponent,
    VoiceSettingComponent,
<<<<<<< HEAD
    NewUserComponent,
    NewRecipeComponent
=======
    ReaderRecipeComponent
>>>>>>> c5f8e3d31e9432805fcbaf2bb3f8e94aff68fec5
  ],
  imports: [
    routing,
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
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [RecipeService, MatDialog, AuthServiceService, SpeechService, DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
