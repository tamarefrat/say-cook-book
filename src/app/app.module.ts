import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
/*material*/
/*import {
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';*/
/*components*/
import { AppComponent } from './app.component';
import { RecipeButtonComponent } from './recipe-button/recipe-button.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ItemLineComponent } from './item-line/item-line.component';
import { InstructionLineComponent } from './instruction-line/instruction-line.component';
import { MainDetailsComponent } from './main-details/main-details.component';
/*services*/
import { RecipeService } from './services/recipe.service';


@NgModule({
  declarations: [
    AppComponent,
    RecipeButtonComponent,
    RecipeListComponent,
    RecipeComponent,
    ItemLineComponent,
    InstructionLineComponent,
    MainDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
   BrowserAnimationsModule,
   /*MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule*/
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
