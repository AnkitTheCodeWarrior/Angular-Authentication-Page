import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericService } from './generic.service';
import { AuthService } from './auth.service';
import { ANIMATION_TYPES } from 'ng2-loading-spinner';
import { INg2LoadingSpinnerConfig } from 'ng2-loading-spinner'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  durationInSeconds = 5;
  @ViewChild("confirmPassword",  {static: true}) focusConfirmPwd: ElementRef;
  inputType = 'password'
  showFiller = false;
  show = false;
 
  loadingConfig: INg2LoadingSpinnerConfig = {
    animationType  : ANIMATION_TYPES.chasingDots,
    // backdropColor  : 'rgba(0, 0, 0, 0.3)',
    // spinnerColor   : '#fff',
    spinnerPosition: 'center',
    // backdropBorderRadius: '15px',
    spinnerSize: 'md',
    spinnerFontSize: '10'
};

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private genericService: GenericService, private authService: AuthService) {
      this.loginForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)]],
        lastName: ['', [Validators.required, Validators.pattern(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[A-Za-z]\w{7,14}$/)]],
        confirmPassword: ['', [Validators.required]],
      })
      // this.show = true;
      // this.showSpinner = false;
  }

  login() {
    this.show = true;
    let userRawData = this.loginForm.getRawValue();
    if(userRawData.password !== userRawData.confirmPassword) {
      this.genericService.snackBar('Password Not Matched', 'Try Again', 3000).onAction().subscribe(action => {
        this.focusConfirmPwd.nativeElement.focus();
        this.inputType = 'text'
      })
    } else {
      let encodedPwd = btoa(this.loginForm.get('password').value)
      this.loginForm.get('password').patchValue(encodedPwd)
      this.loginForm.get('confirmPassword').patchValue(encodedPwd)

      this.show = true;
        this.authService.register(this.loginForm.getRawValue()).subscribe(resp => {
          if(resp['status'] === 'success') {
            this.show = false;
            this.genericService.snackBar('Registration Completed','', 3000)
            this.genericService.resetForm(this.loginForm)
          }
        })
    }
  }

}
