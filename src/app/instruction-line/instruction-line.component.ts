import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Instruction, DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-instruction-line',
  templateUrl: './instruction-line.component.html',
  styleUrls: ['./instruction-line.component.scss']
})
export class InstructionLineComponent implements OnInit {
  @Input() code: any;
  @Input() instructions: Instruction[];
  zeroInstructions: boolean;
  @Input() statusDetails;
  nDescription = '';
  newItemEnable = false;
  inEditState = false;
  instructionToEdit: Instruction;
   itemToDelete: Instruction;

  constructor(private _recipeService: RecipeService, private dbs: DataBaseService) {
    if (!this.code) {
      this.code = this.dbs.recipeInWork.code;
    }
    dbs.getInstructionsByRecipeID(dbs.recipeInWork.code);
  }

  ngOnInit() {

  }
  /*functions*/
  /******************************************************************************************* */
  /*instruction line functions*/


 
  editInstructionLine(instruction: Instruction) {
    this.inEditState = true;
    this.instructionToEdit = instruction;
  }

  deleteItemLine(instruction: Instruction) {
    
    this.itemToDelete = null;
    this.dbs.deleteInstruction(this.code, this.itemToDelete);
  }

  canselFromDelete() {
    this.itemToDelete = null;
  }

  saveInstructionLine() {
    this.dbs.addInstruction( this.nDescription, this.code);
    this.newItemEnable = true;
    this.nDescription = '';
  }

  createItemLine() {

    this.newItemEnable = false;
  }

  updateItemLine(instruction: Instruction) {
    this.dbs.updateInstruction(this.code, instruction);
    this.inEditState = false;
  }
}













  