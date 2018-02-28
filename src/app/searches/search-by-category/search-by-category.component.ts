import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Category, DataBaseService } from '../../services/data-base.service';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
@Component({
  selector: 'app-search-by-category',
  templateUrl: './search-by-category.component.html',
  styleUrls: ['./search-by-category.component.scss']
})
export class SearchByCategoryComponent implements OnInit, AfterViewInit {
  category = '';
cols = 4;
  optionCategories: Category[] = [];
 // dbs;
  constructor(public dbs: DataBaseService, private media: ObservableMedia) {
  //  this.dbs = dbs;
    this.optionCategories = this.dbs.categoryList;
  }


  isPrefix(cat) {
    const filter = this.category.toUpperCase();
    return (cat.toUpperCase().indexOf(filter) > -1);
  }

  ngAfterViewInit() {
    // ObservableMedia does not fire on init so you have to manually update the grid first.
    this.updateGrid();
    this.media.subscribe(change => { this.updateGrid(); });
  }

  updateGrid(): void {
    if (this.media.isActive('xl')) {
      this.cols = 6;
    } else if (this.media.isActive('lg')) {
      this.cols = 4;
    } else if (this.media.isActive('md')) {
      this.cols = 3;
    } else if (this.media.isActive('sm')) {
      this.cols = 2;
    } else if (this.media.isActive('xs')) {
      this.cols = 2;
    }
  }
  ngOnInit() {
    this.optionCategories = this.dbs.categoryList;
  }

}
