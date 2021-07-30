import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './brand/brand.component';
import { ShowBrandComponent } from './brand/show-brand/show-brand.component';
import { SaveBrandComponent } from './brand/save-brand/save-brand.component';
import { SharedService } from './shared.service';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { SaveUserComponent } from './user/save-user/save-user.component';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProductComponent } from './product/product.component';
import { SaveProductComponent } from './product/save-product/save-product.component';
import { ShowProductComponent } from './product/show-product/show-product.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ShowBrandComponent,
    SaveBrandComponent,
    UserComponent,
    SaveUserComponent,
    ShowUserComponent,
    EditUserComponent,
    ProductComponent,
    SaveProductComponent,
    ShowProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule, 
    NgbModule,
    NgxSummernoteModule,
    NgxPaginationModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
