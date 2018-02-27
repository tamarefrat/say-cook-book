import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
// components
import { RecipeButtonComponent } from './recipe-button/recipe-button.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ItemLineComponent } from './item-line/item-line.component';
import { InstructionLineComponent } from './instruction-line/instruction-line.component';
import { MainDetailsComponent } from './main-details/main-details.component';
// import { OptionsForRecipeComponent } from './options-for-recipe/options-for-recipe.component';
import { SignupComponent } from './signup/signup.component';
// import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchByCategoryComponent } from './searches/search-by-category/search-by-category.component';
import { SearchByPictureComponent } from './searches/search-by-picture/search-by-picture.component';
import { SearchByKeywordsComponent } from './searches/search-by-keywords/search-by-keywords.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoriesComponent } from './categories/categories.component';
import { AboutComponent } from './about/about.component';
import { ShareComponent } from './recipe/share/share.component';
import { VoiceSettingComponent } from './voice-setting/voice-setting.component';
import { NewUserComponent } from './home-page/new-user/new-user.component';
// import { NewRecipeComponent } from './recipe/new-recipe/new-recipe.component';
import { ReaderRecipeComponent } from './reader-recipe/reader-recipe.component';
import { RecipesForCategoryComponent } from './categories/recipes-for-category/recipes-for-category.component';
import { OldRecipeComponent } from './old-recipe/old-recipe.component';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';

const appRoutes: Routes = [

  { path: '', component: HomePageComponent},
  { path: 'about', component: AboutComponent },
  { path: 'recipe',  component: OldRecipeComponent },
  { path: 'recipe/:id', component: OldRecipeComponent },
  { path: 'recipe-show/:id', component: RecipeShowComponent },
  { path: 'recipeList', component: RecipeListComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'voice-setting', component: VoiceSettingComponent },
  { path: 'search-by-categories', component: SearchByCategoryComponent },
  { path: 'galery', component: SearchByPictureComponent },
  { path: 'search-by-keywords', component: SearchByKeywordsComponent },
  { path: 'categories/add-category', component: AddCategoryComponent },
  { path: 'share', component: ShareComponent },
  { path: 'reader/:id', component: ReaderRecipeComponent },
  { path: 'recipesForCategory/:id', component: RecipesForCategoryComponent }
];

export const appRoutingProviders: any[] = [];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
