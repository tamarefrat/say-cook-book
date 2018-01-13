import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IconModule } from 'angular-icon'; 
import {MediaChange, ObservableMedia} from "@angular/flex-layout";  

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})



export class HomePageComponent implements OnInit {
cols:any;
width:any;



ngAfterViewInit() {
        // ObservableMedia does not fire on init so you have to manually update the grid first.
        this.updateGrid();
	this.media.subscribe(change => { this.updateGrid(); });
}

updateGrid(): void {
	if (this.media.isActive('xl')) { this.cols = 6; this.width = 600;}
	else if (this.media.isActive('lg')) { this.cols = 4; this.width = 500;}
	else if (this.media.isActive('md')) { this.cols = 4; this.width = 400;}
	else if (this.media.isActive('sm')) { this.cols = 3; this.width = 350;}
	else if (this.media.isActive('xs')) { this.cols = 3; this.width = 250;}
}

  color:string;

  tiles = [
    {
      route: '/recipeList', text: 'List Of Recipies', icon: 'list'
    },
    {
      route: '/recipe', subtext: '', text: '2', icon: 'add'
    },
    {
      route: 'categories', text: '3', icon: 'category'
    },
    {
      route: 'search-by-categories',  text: '4', icon: 'search'
    },
    {
      route: 'about', text: '5', icon: 'home'
    },
    {
      route: 'search-by-keywords', text: '6', icon: 'search'
    },
    {
      route: 'search-by-picture', text: '7', icon: 'search'
    },
    {
      route: 'share',text: '8', icon: 'share'
    },
    {
      route: 'categories/add-category', text: '9', icon: 'github'
    }
    ,
    {
      route: 'voice-setting', text: '7', icon: 'settings'
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


