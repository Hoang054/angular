import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  ProductList:any=[];
  errorMessage:any;
  
  ActivateSaveProduct:boolean=false;
  product:any;
  showModal:boolean = true;
  page: number = 1;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.showProduct();
  }

  addClick(){
    this.product = {
      id : 0,
      productname : '',
      image : '',
      brandId : '',
      categoryId : '',
      description : '',
      price : '',
      statusProduct : '',
      date : ''
    }
    this.ActivateSaveProduct = true;
    this.showModal = false;
  }

  editClick(item:any){
    this.product = {
      id : item.id,
      productname : item.productname,
      image : item.image,
      brandId : item.brandId,
      categoryId : item.categoryId,
      description : item.description,
      price : item.price,
      statusProduct : item.statusProduct,
      dateofSale : item.dateofSale
    }
    this.ActivateSaveProduct = true;
    this.showModal = false;
  }

  deleteClick(item:any){
    this.service.deleteProduct(item.id).subscribe(res => {
      alert(res.message.toString());
    });
    this.showProduct();
  }

  showProduct(){
    this.service.getsProduct().subscribe({
      next: data => {
      this.ProductList=data;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log('There was an error!', error);
      }
    });
  }

  closeClick(){
    this.ActivateSaveProduct = false;
    this.showProduct();
  }
}
