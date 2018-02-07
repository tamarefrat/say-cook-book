import { Component, OnInit ,, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss']
})
export class RecipeShowComponent implements OnInit {
  @Input() code: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dbs: DataBaseService) {
    this.code = this.route.snapshot.params['id'];
    
     }

  ngOnInit() {
    this.code = this.route.snapshot.params['id'];
    console.log(this.code);
  }

}


