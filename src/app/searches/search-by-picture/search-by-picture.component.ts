import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../../services/data-base.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-search-by-picture',
  templateUrl: './search-by-picture.component.html',
  styleUrls: ['./search-by-picture.component.scss']
})
export class SearchByPictureComponent implements OnInit {

   sizeImage = 4;
   classImage = 'col-md-6 col-lg-4 col-sm-12 mb-2';
delay = '3s';
// dbs;
  constructor(public dbs: DataBaseService) {
  //  this.dbs = dbs;
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
        recipe.urlImg = 'assets\\homeImg\\logo1.png';
      });
  //  recipe.urlImg = this.dbs.getPath(recipe.urlImg);

 }
/*getDelay(i) {
    i = i*0.5;
    return '' + i + 's';
  }*/
  ngOnInit() {
  }

}
