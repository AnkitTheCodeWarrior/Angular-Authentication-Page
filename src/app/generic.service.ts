import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private _snackBar: MatSnackBar) { }

  snackBar(message, action?, duration?) {
    if(action !== '') {
      return this._snackBar.open(message, action, {
        duration: duration,
        panelClass: ['mat-toolbar', 'mat-warn']
        ,

        // direction:'top'
        
      })
    } else {
      return this._snackBar.open(message, action, {
        panelClass: ['mat-toolbar', 'mat-success'],
        duration: duration,
      })
    }
  }

  resetForm(formGroup) {
    formGroup.reset();
  }

}
