import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-instruction-line',
  templateUrl: './instruction-line.component.html',
  styleUrls: ['./instruction-line.component.css']
})
export class InstructionLineComponent implements OnInit {
  @Input() code: number;
  @Input() instructions: Instruction[];
  @Input() keyWords: string[];
  @Input() zeroInstructions: boolean;
  @Input() index: number;

  constructor(private _recipeService: RecipeService) {
    this.instructions = [];
    this.keyWords = [];
    this.zeroInstructions = true;
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
  }

  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);

    this.instructions = this._recipeService.allMyRecipes[this.index].instructionLines.instructions;
    this.keyWords = this._recipeService.allMyRecipes[this.index].keyWords;
    this.zeroInstructions = this._recipeService.allMyRecipes[this.index].instructionLines.zeroInstructions;
    }

  }
  /*functions*/
  /******************************************************************************************* */
  /*instruction line functions*/
  firstSaveInstructionLine(instruction, i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    /*pops without save the last empty item in the list, create a new item and pushss to list, change status of lastLine*/

    this._recipeService.allMyRecipes[this.index].instructionLines.instructions[i] = new Instruction(1, instruction, true);

  }
  /*can adit only 1 line in any time- have to change this*/
  aditInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.instructions[i].statusLine = 2;

    this._recipeService.allMyRecipes[this.index].instructionLines.instructions[i].statusLine = 2;

  }

  deleteInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    let ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    if (this.instructions[i].lastLine) {/* this is the last line*/
      if (i > 0) {/*there is more then 1 line*/
        this.instructions[i - 1].lastLine = true;
        this._recipeService.allMyRecipes[this.index].instructionLines.instructions[i - 1].lastLine = true;
      } else {/* there is 1 line*/
        this.zeroInstructions = true;
        this._recipeService.allMyRecipes[this.index].instructionLines.zeroInstructions = true;
      }
    }
    this.instructions.splice(i, 1);
    this._recipeService.allMyRecipes[this.index].instructionLines.instructions.splice(i, 1);

  }

  saveInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.instructions[i].statusLine = 1;
    this._recipeService.allMyRecipes[this.index].instructionLines.instructions[i] = new Instruction(1,
      this.instructions[i].instruction,
      this.instructions[i].lastLine);
  }

  createInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    if (i >= 0) {
      this.instructions[i].lastLine = false;
      this._recipeService.allMyRecipes[this.index].instructionLines.instructions[i].lastLine = false;
    }
    this.instructions.push(new Instruction(0, '', true));
    this.zeroInstructions = false;

    this._recipeService.allMyRecipes[this.index].instructionLines.instructions.push(new Instruction(0, '', true));
    this._recipeService.allMyRecipes[this.index].instructionLines.zeroInstructions = false;


  }

  /************************************************************************************************* */
}

export class Instruction {
  public constructor(public statusLine: number, public instruction: string, public lastLine: boolean) {
    /*statusLine:
    0=>created (before first save)
    1=> on save
    2=>in adit*/

  }

}

