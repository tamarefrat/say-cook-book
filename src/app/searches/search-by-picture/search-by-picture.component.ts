import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-search-by-picture',
  templateUrl: './search-by-picture.component.html',
  styleUrls: ['./search-by-picture.component.scss']
})
export class SearchByPictureComponent implements OnInit {
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   sizeImage = 4;
   classImage = 'col-4 mb-2';

  constructor(private dbs: DataBaseService) {
   /* this.dbs.recipeList.forEach(recipe => {
      this.getImagesForRecipe(recipe);
      console.log(recipe);
    });*/


   }

  bigger() {
    if (this.sizeImage < 12) {
this.sizeImage++;
this.classImage = 'col-' + this.sizeImage + ' mb-2';
    }
  }
  smaller() {
    if (this.sizeImage > 1) {
      this.sizeImage--;
      this.classImage = 'col-' + this.sizeImage + ' mb-2';
    }
  }

  getImagesForRecipe(recipe) {


      const spaceRef = firebase.storage().ref().child(recipe.urlImg).getDownloadURL().then((url) => {
        // set image url
        recipe.urlImg = url;

      }).catch((error) => {
        console.log(error);
      });

 }

  ngOnInit() {
  }

}
