import { Component, OnInit} from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-brand',
  templateUrl: './show-brand.component.html',
  styleUrls: ['./show-brand.component.css']
})
export class ShowBrandComponent implements OnInit {
  
  BrandList:any=[];
  errorMessage:any;
  
  ActivateSaveBrand:boolean=false;
  brand:any;
  showModal:boolean = true;
  
  
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.refeshBrand();
  }

  addClick(){
    this.brand = {
      id : 0,
      brandName : ""
    }
    this.ActivateSaveBrand = true;
    this.showModal = false;
  }
  
  editClick(item:any){
    console.log(item);
    
    this.brand = {
      id : item.id,
      brandName : item.brandName
    }
    this.ActivateSaveBrand = true;
    this.showModal = false;
  }

  deleteClick(item:any){
    this.service.deleteBrand(item.id).subscribe(res => {
      alert(res.message.toString());
    });
    this.refeshBrand();
  }

  closeClick(){
    this.ActivateSaveBrand = false;
    this.refeshBrand();
  }

  refeshBrand(){
    this.service.getsBrand().subscribe({
      next: data => {
      this.BrandList=data;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log('There was an error!', error);
      }
    });
  }

}
