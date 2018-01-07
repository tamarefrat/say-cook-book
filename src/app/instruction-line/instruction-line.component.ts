import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Instruction, DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-instruction-line',
  templateUrl: './instruction-line.component.html',
  styleUrls: ['./instruction-line.component.css']
})
export class InstructionLineComponent implements OnInit {
  @Input() code: any;
  @Input() instructions: Instruction[];

  @Input() zeroInstructions: boolean;
  @Input() index: number;
  nDescrib = '';
  newItemEnable = false;
  inEditState = false;
  instructionToEdit: Instruction;

  constructor(private _recipeService: RecipeService, private dbs: DataBaseService) {
    if (!this.code) {
this.code = this.dbs.recipeInWork.code;
    }
    this.instructions = this.dbs.getInstructionsByRecipeID(this.code);
    this.newItemEnable = (this.instructions.length > 0);

  }

  ngOnInit() {
    this.code = this.dbs.recipeInWork.code;
    if (this.dbs.getRecipeByID(this.code) != null) {
      this.instructions = this.dbs.getInstructionsByRecipeID(this.code);
      if (this.instructions.length <= 0) {
        this.newItemEnable = false;
      }

    }

  }
  /*functions*/
  /******************************************************************************************* */
  /*instruction line functions*/


  /*can adit only 1 line in any time- have to change this*/
  editInstructionLine(instruction: Instruction) {
    this.inEditState = true;
    this.instructionToEdit = instruction;
  }

  deleteItemLine(instruction: Instruction) {
    /* this.index = this._recipeService.getIndexOfRecipeByCode(this.code);*/
    const ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    this.dbs.deleteInstruction(this.code, instruction);
  }

  saveItemLine() {
    this.dbs.addInstruction( this.nDescrib, this.code);
    this.newItemEnable = true;
    this.nDescrib = '';
  }

  createItemLine() {

    this.newItemEnable = false;
  }

  updateItemLine(instruction: Instruction) {
    this.dbs.updateInstruction(this.code, instruction);
    this.inEditState = false;
  }













  /*
  constructor(private _recipeService: RecipeService) {
    this.instructions = [];

    this.zeroInstructions = false;
    this.instructions.push(new Instruction(0, '', true));
    // this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
  }

  ngOnInit() {
    if (this._recipeService.getRecipe(this.code) != null) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);

    this.instructions = this._recipeService.allMyRecipes[this.index].instructionLines.instructions;

    this.zeroInstructions = this._recipeService.allMyRecipes[this.index].instructionLines.zeroInstructions;
    }

  }*/
  /*functions*/
  /******************************************************************************************* */
  /*instruction line functions*/
 /* firstSaveInstructionLine( i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    *//*pops without save the last empty item in the list, create a new item and pushss to list, change status of lastLine*/

   /* this.instructions[i].lastLine = true;
    this.instructions[i].statusLine = 1;

  }
  *//*can adit only 1 line in any time- have to change this*/
  /*aditInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.instructions[i].statusLine = 2;
  }

  deleteInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    const ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    if (this.instructions[i].lastLine) {/* this is the last line*/
   /*   if (i > 0) {/*there is more then 1 line*/
   /*     this.instructions[i - 1].lastLine = true;
      } else {/* there is 1 line*/
    /*    this.zeroInstructions = true;
      }
    }
    this.instructions.splice(i, 1);
  }

  saveInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    this.instructions[i].statusLine = 1;
  }

  createInstructionLine(i) {
    this.index = this._recipeService.getIndexOfRecipeByCode(this.code);
    if (i >= 0) {
      this.instructions[i].lastLine = false;
    }
    this.instructions.push(new Instruction(0, '', true));
    this.zeroInstructions = false;
  }

  /************************************************************************************************* */
}
/*
export class Instruction {
  public constructor(public statusLine: number, public instruction: string, public lastLine: boolean) {
    /*statusLine:
    0=>created (before first save)
    1=> on save
    2=>in adit

  }

}**/


