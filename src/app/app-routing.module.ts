import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandComponent} from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { SaveUserComponent } from './user/save-user/save-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'brand', component:BrandComponent },
  { path: 'user', component:UserComponent },
  { path: 'register', component:SaveUserComponent },
  { path: 'product', component:ProductComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
