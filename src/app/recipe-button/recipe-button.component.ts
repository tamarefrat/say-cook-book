import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-button',
  templateUrl: './recipe-button.component.html',
  styleUrls: ['./recipe-button.component.css']
})
export class RecipeButtonComponent implements OnInit {

  @Input() name: string;
  @Input() url: string;
  @Input() dsply: boolean;
  constructor() { }

  ngOnInit() {
  }

}