import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {

  @Input() code: any;
  @Input() foodstuffs: Foodstuff[]; /*change class and prop*/

  @Input() zeroItems: boolean;
  @Input() index: number;

  constructor(private _recipeService: RecipeService) {
    this.foodstuffs = [];

   // this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
  }

  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
      this.index = this._recipeService.getIndexOfRecipeByCode(this.code);

      this.foodstuffs = this._recipeService.allMyRecipes[this.index].itemLines.foodstuffs;
      /*this.keyWords = this._recipeService.allMyRecipes[this.index].itemLines.keyWords;*/
      this.zeroItems = this._recipeService.allMyRecipes[this.index].itemLines.zeroItems;
    }

  }
  /*functions*/
  /******************************************************************************************* */
  /*item line functions*/


  /*can adit only 1 line in any time- have to change this*/
  aditItemLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.foodstuffs[i].statusLine = 2;
  }

  deleteItemLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    let ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    if (this.foodstuffs[i].lastLine) {/* this is the last line*/
      if (i > 0) {/*there is more then 1 line*/
        this.foodstuffs[i - 1].lastLine = true;
      } else {/* there is 1 line*/
        this.zeroItems = true;
      }
    }
    this.foodstuffs.splice(i, 1);
  }

  saveItemLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    if (this.foodstuffs[i].statusLine === 0) {
      this.foodstuffs[i].lastLine = true;
    }
    this.foodstuffs[i].statusLine = 1;
  }

  createItemLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    if (i >= 0) {
      this.foodstuffs[i].lastLine = false;
    }
    this.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.zeroItems = false;
    console.log(this.index);
    console.log(this._recipeService);
  }



  /************************************************************************************************* */
}

export class Foodstuff {

  constructor(public statusLine: number,
    public amount: number,
    public measurement: string,
    public item: string,
    public lastLine: boolean) {
    /*statusLine:
    0=>created (before first save)
    1=> on save
    2=>in adit*/
  }
}
