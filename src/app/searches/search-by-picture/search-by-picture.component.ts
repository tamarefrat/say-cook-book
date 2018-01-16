import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-by-picture',
  templateUrl: './search-by-picture.component.html',
  styleUrls: ['./search-by-picture.component.scss']
})
export class SearchByPictureComponent implements OnInit {

   images = [
     {
       img: 'assets\\homeImg\\logo.png',
       thumb: 'assets\\homeImg\\logo.png',
        description: "Image 1" },
     {
       img: 'assets\\homeImg\\logo.png',
       thumb: 'assets\\homeImg\\logo.png',
        description: "Image 2" },
     {
       img: 'assets\\homeImg\\logo.png',
       thumb: 'assets\\homeImg\\logo.png',
        description: "Image 3" },
     {
       img: 'assets\\homeImg\\logo.png',
       thumb: 'assets\\homeImg\\logo.png',
        description: "Image 4" }

    ];

  constructor() { }

  ngOnInit() {
  }

}
