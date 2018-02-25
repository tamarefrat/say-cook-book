import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IconModule } from 'angular-icon';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})



export class HomePageComponent implements OnInit, AfterViewInit {
  features1 = [
    { route: 'recipeList', class: 'fa fa-list-ul fa-4x orange-text', text: 'Recipe List', sub: 'get list of all your recipes'},
    { route: 'recipe', class: 'fa fa-plus-circle fa-4x orange-text', text: 'New Recipe', sub: 'add new recipes to your Say Cook Book'},
     { route: 'galery', class: 'fa fa-image fa-4x orange-text', text: 'Galery', sub: 'shoes images of all your recipes'},
    { route: 'categories', class: 'fa fa-folder fa-4x orange-text', text: 'Categories', sub: 'manage your categories'}
  ];
  features2 = [
    { route: 'about', class: 'fa fa-home fa-4x orange-text', text: 'About Us',
    class2: 'link-cosmo col-lg-2 col-md-2 col-sm-4 col-xs-6 mb-4 pt-1' },
    { route: 'voice-setting', class: 'fa fa-gears fa-4x orange-text', text: 'Setting',
    class2: 'link-cosmo col-lg-2 col-md-2 col-sm-4 col-xs-6 mb-4 pt-1'},
    { route: 'share', class: 'fa fa-share fa-4x orange-text', text: 'Share',
    class2: 'link-cosmo col-lg-2 col-md-2 col-sm-4 col-xs-6 mb-4 pt-1' },
    { route: 'search-by-keywords', class: 'fa fa-search fa-4x orange-text', text: 'By Product',
    class2: 'link-cosmo col-lg-2 col-md-2 col-sm-6 col-xs-6 mb-4 pt-1' },
    { route: 'search-by-categories', class: 'fa fa-search fa-4x orange-text', text: 'By Category',
    class2: 'link-cosmo col-lg-2 col-md-2 col-sm-6 col-xs-6 mb-4 pt-1' }
   ];

 images = [
    { route: 'recipeList', src: '45.jpg', head: 'Recipes List', sub: 'get list of all your recipes' },
    { route: 'recipe', src: '22.jpg', head: 'New Recipe', sub: 'add new recipes to your app' },
    { route: '/#fav', src: '24.jpg', head: 'Favorites', sub: 'goto your favorite recipes' },
    { route: 'recipeList', src: '47.jpg', head: 'Recipes List', sub: 'get list of all your recipes' },
    { route: 'recipe', src: '29.jpg', head: 'New Recipe', sub: 'add new recipes to your app' },
    { route: '/#fav', src: '16.jpg', head: 'Favorites', sub: 'goto your favorite recipes' }
  ];
 /*wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true // default
});*/
cols: any;
  rows: any;
  width: any;
color: string;

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
      route: 'search-by-categories', text: '4', icon: 'search', tooltip: 'Search by Category'
    },
    {
      route: 'about', text: '5', icon: 'home', tooltip: 'About'
    },
    {
      route: 'search-by-keywords', text: '6', icon: 'search', tooltip: 'Search by Key words'
    },
    {
      route: 'galery', text: '7', icon: 'image', tooltip: 'Galery'
    },
    {
      route: 'share', text: '8', icon: 'share', tooltip: 'Share'
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
      route: 'categories/add-category', text: '9', icon: 'add'
    }
  ];


  constructor(private dbs: DataBaseService, private router: Router, private media: ObservableMedia) {
    this.color = 'red';
    this.cols = 3;
   // new WOW().init();
  }

  onSelect(route) {
    console.log(route);

    this.router.navigate([route]);

  }
  ngAfterViewInit() {
    // ObservableMedia does not fire on init so you have to manually update the grid first.
    this.updateGrid();
    this.media.subscribe(change => { this.updateGrid(); });
  }

  updateGrid(): void {
    if (this.media.isActive('xl')) { this.cols = 6; this.width = 600; this.rows = 2; }
    else if (this.media.isActive('lg')) { this.cols = 4; this.width = 500; this.rows = 3; }
    else if (this.media.isActive('md')) { this.cols = 4; this.width = 400; this.rows = 3; }
    else if (this.media.isActive('sm')) { this.cols = 3; this.width = 350; this.rows = 4; }
    else if (this.media.isActive('xs')) { this.cols = 3; this.width = 250; this.rows = 4; }
  }


  changeStyle($event) {
    this.color = $event.type === 'mouseover' ? 'yellow' : 'red';// '#dd5303' : '#1c1e3ac0';
  }

  ngOnInit() {
  }

  contact(mail, subject, data) {

  }
}
