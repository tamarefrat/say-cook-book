import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Instruction, DataBaseService } from '../services/data-base.service';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
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
  instructionsRef: AngularFirestoreCollection<Instruction>;
  instructionsObservable: Observable<Instruction[]>;
// dbs;
  constructor(private afs: AngularFirestore, public  dbs: DataBaseService) {
    // this.dbs = dbs;
    if (!this.code) {
      this.code = this.dbs.recipeInWork.code;
    }
    this.getInstructionsByRecipeID(this.code);
  }

  ngOnInit() {
    this.getInstructionsByRecipeID(this.code);
  }
  /*functions*/
  /******************************************************************************************* */
  /*instruction line functions*/

 /* getInstructionsByRecipeID(id) {
    this.instructionsRef = this.afs.collection(`users/${this.dbs.user}/instructions`, ref => {
      return ref.where('recipeId', '==', id);
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructions = instructions;
      this.instructions.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });
    });
  }*/

  getInstructionsByRecipeID(id) {
    this.instructionsRef = this.afs.collection(`users/${this.dbs.user}/instructions`, ref => {
      return ref.where('recipeId', '==', +id);
    });
    this.instructionsObservable = this.instructionsRef.valueChanges();
    this.instructionsObservable.subscribe(instructions => {
      this.instructions = instructions;
      this.instructions.forEach(instruction => {
        console.log('description: ' + instruction.description);
      });
    });
  }


  editInstructionLine(instruction: Instruction) {
    this.inEditState = true;
    this.instructionToEdit = instruction;
  }

  deleteItemLine() {
    this.dbs.deleteInstruction(this.code, this.itemToDelete);
    this.itemToDelete = null;

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













