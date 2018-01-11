import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthServiceService } from '../../auth-service.service';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  withGoogle: Boolean ;
  withEmail: Boolean ;
  gmail: string;
  Email: string;

  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  constructor(private authService: AuthServiceService) {
this.withGoogle = false;
this.withEmail = false;
  }


  changeGoogleStatus(google) {
    this.withGoogle = google;
      if (google) {
      this.withEmail = false;
    }
  }
  changeEmailStatus(email) {
    this.withEmail = email;
    if (email) {
      this.withGoogle = false;
    }
  }
/*
  customErrorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl | null) => {
      if (control) {
        const hasInteraction = control.dirty || control.touched;
        const isInvalid = control.invalid;

        return !!(hasInteraction && isInvalid);
      }

      return false;
    }
  };
*/
  addGoogleUser(user) {
this.authService.addNewGoogleUser(user);
  }
  addEmailUser(user) {
    this.authService.addNewEmailUser(user);
  }

  ngOnInit() {
  }

}
