import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IconModule } from 'angular-icon'; 
import { MediaChange, ObservableMedia} from "@angular/flex-layout";  
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})



export class HomePageComponent implements OnInit {
cols:any;
rows:any;
width:any;



ngAfterViewInit() {
        // ObservableMedia does not fire on init so you have to manually update the grid first.
        this.updateGrid();
	this.media.subscribe(change => { this.updateGrid(); });
}

updateGrid(): void {
	if (this.media.isActive('xl')) { this.cols = 6; this.width = 600; this.rows = 2;}
	else if (this.media.isActive('lg')) { this.cols = 4; this.width = 500; this.rows = 3;}
	else if (this.media.isActive('md')) { this.cols = 4; this.width = 400; this.rows = 3;}
	else if (this.media.isActive('sm')) { this.cols = 3; this.width = 350; this.rows = 4;}
	else if (this.media.isActive('xs')) { this.cols = 3; this.width = 250; this.rows = 4;}
}

  color:string;

  tiles = [
    {
      route: '/recipeList', text: 'List Of Recipies', icon: 'list', tooltip: 'Recipes'
    },
    {
      route: '/recipe', subtext: '', text: '2', icon: 'add', tooltip: 'Create Recipe'
    },
    {
      route: 'categories', text: '3', icon: 'category', tooltip: 'Categories'
    },
    {
      route: 'search-by-categories',  text: '4', icon: 'search', tooltip: 'Search by Category'
    },
    {
      route: 'about', text: '5', icon: 'home', tooltip: 'About'
    },
    {
      route: 'search-by-keywords', text: '6', icon: 'search', tooltip: 'Search by Key words'
    },
    {
      route: 'search-by-picture', text: '7', icon: 'search', tooltip: 'Search by Picture'
    },
    {
      route: 'share',text: '8', icon: 'share', tooltip: 'Share'
    },
    {
      route: 'categories/add-category', text: '9', icon: 'add', tooltip: 'Create Category'
    }
    ,
    {
      route: 'voice-setting', text: '7', icon: 'settings', tooltip: 'Settings'
    },
    {
      route: 'share', text: '8', icon: 'share'
    },
    {
      route: 'categories/add-category',  text: '9', icon: 'add'
    }
  ];
  @Input() favorites: string[];

  constructor(private _recipeService: RecipeService, private router: Router, private media: ObservableMedia) {
    this.color = 'red';
    this.cols = 3;
  }

  onSelect(route) {
    console.log(route);

    this.router.navigate([route]);

  }

  changeStyle($event){
    this.color = $event.type == 'mouseover' ?'yellow' : 'red';// '#dd5303' : '#1c1e3ac0';
  }

  ngOnInit() {
  }

}
