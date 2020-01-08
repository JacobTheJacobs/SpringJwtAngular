import { Injectable } from "@angular/core";
import { RegisterPayload } from "./register-payload";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginPayload } from "./login-payload";
import { JwtAutResponse } from "./jwt-aut-response";

import { map } from "rxjs/operators";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private URL = "http://localhost:8090/api/auth/";

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.URL + "signup", registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    //returns as observable so we can map the response using pipe and map the response object
    return this.httpClient
      .post<JwtAutResponse>(this.URL + "login", loginPayload)
      .pipe(
        map(
          //data as varibale for checking if each request contains JWT "npm i ngx-webstorage"
          data => {
            this.localStorageService.store(
              "authenticationToken",
              data.authenticationToken
            );
            //store(KEY,VALUE);
            this.localStorageService.store("username", data.username);
            return true;
          }
        )
      );
  }

  //chakcs if value loged in
  isAuthenticated(): boolean {
    return this.localStorageService.retrieve("username") != null;
  }

  logout() {
    this.localStorageService.clear("authenticationToken");
    this.localStorageService.clear("username");
  }
}
