import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit {

  @Input() code: number;
  @Input() nameRecipe: string;
  @Input() getFrom: string;
  @Input() foodstuffs: Foodstuff[]; /*change class and prop*/
  @Input() instructions: Instruction[];
  @Input() category: string[]; /* change to final number///?*/
  @Input() urlImg: string;
  @Input() keyWords: string[];
  @Input() comment: string;
  @Input() zeroItems: boolean;
  @Input() zeroInstructions: boolean;
  @Input() statusDetails: number; /*options: 0=>created, 1=>i=on save, 2=>in adit, 4=>deleted*/
  @Input() optionCategories: string[];
  @Input() partToShow: number; /*options:0=>main details, 1=>items, 2=>instructions*/


  constructor() {
    this.code = 1111;
    /*this.nameRecipe = 'choclate cake';
    this.getFrom = 'tami';*/
    this.statusDetails = 0;
    this.category = ['', '', ''];
    this.zeroInstructions = true;
    this.zeroItems = true;
    this.urlImg = 'assets/saveBtn.png';
    this.foodstuffs = [
      /*new Foodstuff(1, 30, 'kg', 'sugar', false),
      new Foodstuff(1, 30, 'gr', 'water', false),
      new Foodstuff(1, 30, 'kg', 'oil', false),
      new Foodstuff(1, 30, 'gr', 'cofee', false),
      new Foodstuff(1, 30, 'kg', 'sugar', false),
      new Foodstuff(1, 20, 'gr', 'chocolate', true),*/
    ];

    this.instructions = [
      /*new Instruction(1, 'mix all', false),
      new Instruction(1, 'bake till ready', true)*/
    ];

    this.keyWords = ['chocalate'];
    /* this.comment = 'delitios';*/
    this.optionCategories = ['cakes', 'parve', 'easy', 'milk', 'coockies', 'similiar'];

  }
  /*functions*/
  /******************************************************************************************* */
  /*item line functions*/
  firstSaveItemLine(amount, measurement, item, i) {
    /*pops without save the last empty item in the list, create a new item and pushss to list, change status of lastLine*/
    this.foodstuffs[i].statusLine = 1;
    this.foodstuffs[i].amount = amount;
    this.foodstuffs[i].measurement = measurement;
    this.foodstuffs[i].item = item;
    this.foodstuffs[i].lastLine = true;
  }
  /*can adit only 1 line in any time- have to change this*/
  aditItemLine(i) {
    this.foodstuffs[i].statusLine = 2;
  }

  deleteItemLine(i) {
    let ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    if (this.foodstuffs[i].lastLine) {/* this is the last line*/
      if (i > 0) {/*there is more then 1 line*/
        this.foodstuffs[i - 1].lastLine = true;
      }
      else {/* there is 1 line*/
        this.zeroItems = true;
      }
    }
    this.foodstuffs.splice(i, 1);

  }

  saveItemLine(i) {
    this.foodstuffs[i].statusLine = 1;
  }

  createItemLine(i) {
    if (i >= 0) {
      this.foodstuffs[i].lastLine = false;
    }
    this.foodstuffs.push(new Foodstuff(0, 0, '', '', true));
    this.zeroItems = false;
  }

  /************************************************************************************************* */
  /*instruction line functions*/
  firstSaveInstructionLine(instruction, i) {
    /*pops without save the last empty item in the list, create a new item and pushss to list, change status of lastLine*/
    this.instructions[i].statusLine = 1;
    this.instructions[i].instruction = instruction;
    this.instructions[i].lastLine = true;
  }
  /*can adit only 1 line in any time- have to change this*/
  aditInstructionLine(i) {
    this.instructions[i].statusLine = 2;
  }

  deleteInstructionLine(i) {
    let ans = confirm('Are You Sure?\nAre you want delete this line from your recipe?');
    if (!ans) {
      return;
    }

    if (this.instructions[i].lastLine) {/* this is the last line*/
      if (i > 0) {/*there is more then 1 line*/
        this.instructions[i - 1].lastLine = true;
      }
      else {/* there is 1 line*/
        this.zeroInstructions = true;
      }
    }
    this.instructions.splice(i, 1);

  }

  saveInstructionLine(i) {
    this.instructions[i].statusLine = 1;
  }

  createInstructionLine(i) {
    if (i >= 0) {
      this.instructions[i].lastLine = false;
    }
    this.instructions.push(new Instruction(0, '', true));
    this.zeroInstructions = false;
  }
  /************************************************************ */
  /*details functions*/
  firstSaveDetails() {
    /*  this.getFrom = getFrom;
      this.nameRecipe = nameRecipe;
      this.comment = comment;
      this.urlImg = urlImg;*/
    this.statusDetails = 1;
  }

  aditDetails() {
    this.statusDetails = 2;
  }

  deleteRecipe() {
    let ans = confirm('Are You Sure?\nAre you want delete this recipe from your application?');
    /*.title('Are You Sure?')
              .textContent('Are you want delete this recipe from your application?')
              .ariaLabel('delete recipe')
              .ok('Delete Recipe')
              .cancel('return without delete');*/
    if (!ans) {
      return;
    }
    this.statusDetails = 4;
  }

  saveRepice() {
    this.statusDetails = 1;
  }



  ngOnInit() {
  }

}

/********************************************************* */
export class Instruction {
  public constructor(public statusLine: number, public instruction: string, public lastLine: boolean) {
    /*statusLine:
    0=>created (before first save)
    1=> on save
    2=>in adit*/

  }

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
