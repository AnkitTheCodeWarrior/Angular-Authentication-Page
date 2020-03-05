import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiServiceService) {

   }

   register(payLoad) {
      const URL = `${environment.authService}/api/v2/server/loginservice/register`;
      return this.apiService.post(URL, payLoad);
   }
}
