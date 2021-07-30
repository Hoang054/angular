import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "https://localhost:44355/api";
readonly PhotoUrl = "https://localhost:44355/Images";

  constructor(private http:HttpClient) { }

  getsBrand():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/brand/gets');
  }

  getsCategory():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/category/gets');
  }

  getsStatusproduct():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/getall/getsProductStatus');
  }

  getsImage(val :any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/getall/getsImage/' + val);
  }

  getBrand(val: any):Observable<any>{
    return this.http.get<any>(this.APIUrl+'/brand/get/'+ val);
  }

  saveBrand(val:any){
    return this.http.post<any>(this.APIUrl+'/brand/save',val);
  }

  deleteBrand(val:any){
    return this.http.patch<any>(this.APIUrl+'/brand/delete/'+val,null);
  }

  getsAccount():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:44355/api/user/gets');
  }

  update(val:any){
    return this.http.post<any>('https://localhost:44355/api/User/update',val);
  }
  
  registerweb(val:any){
    return this.http.post<any>('https://localhost:44355/api/User/register',val);
  }

  deleteUser(val:any){
    return this.http.patch<any>('https://localhost:44355/api/User/ChangeStatus/'+val,null);
  }

  UploadPhoto(val:any){
    return this.http.post<any>('https://localhost:44355/api'+'/User/SaveFile',val);
  }
  UploadPhoto1(val:any, imagePath: string){
    return this.http.post<any>('https://localhost:44355/api'+'/User/SaveFile/'+ imagePath,val);
  }
  
  getsProduct():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:44355/api/product/gets');
  }

  saveProduct(val:any){
    return this.http.post<any>('https://localhost:44355/api/product/save',val);
  }

  deleteProduct(val:any){
    return this.http.patch<any>('https://localhost:44355/api/product/delete/'+val,null);
  }

  UploadPhotoProduct(val:any){
    return this.http.post<any>('https://localhost:44355/api'+'/Product/SaveFile',val);
  }

  UploadPhotoProducts(val:any){
    return this.http.post<any>('https://localhost:44355/api'+'/Product/SaveFiles',val);
  }
}
