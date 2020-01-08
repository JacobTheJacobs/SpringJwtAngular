import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { EditorModule } from "@tinymce/tinymce-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { RegisterSuccessComponent } from "./auth/register-success/register-success.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { NgxWebstorageModule } from "ngx-webstorage";
import { HomeComponent } from "./home/home.component";
import { AddPostComponent } from "./add-post/add-post.component";

import { HttpClientInterceptor } from "./http-client-interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "post/:id", component: PostComponent },
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "register-success", component: RegisterSuccessComponent },
      { path: "home", component: HomeComponent },
      { path: "add-post", component: AddPostComponent, canActivate: [AuthGuard]}
    ]),
    HttpClientModule
  ],
  //for use our custom http interceptor class as http interceptor
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
