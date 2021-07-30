import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})
export class SaveProductComponent implements OnInit {
  @ViewChild('image1') image1: any;
  @ViewChild('images1') images1: any;
  constructor(private fb: FormBuilder,private service:SharedService) {
    this.formAddProduct = this.fb.group({
      id: new FormControl('',),
      productname: new FormControl('',[Validators.required]),
      image : new FormControl('',[Validators.required]),
      images : new FormControl('',[Validators.required]),
      brandId : new FormControl('',[Validators.required]),
      categoryId : new FormControl('',[Validators.required]),
      description : new FormControl('',[Validators.required]),
      price : new FormControl('',[Validators.required]),
      statusProduct :new FormControl('',[Validators.required]),
      dateofSale : new FormControl('',[Validators.required])
    });
   }

  @Input() product:any;

  formAddProduct = new FormGroup({
  });

  id : any;
  productname : any;
  image: any;
  images: any;
  brandId: any;
  categoryId:any;
  description: any;
  price: any;
  statusProduct: any;
  dateofSale: any;
  Brand: any;
  Category: any;
  errorMessage: any;
  StatusProducts:any;
  ImagesProduct: any;

  ngOnInit(): void {
    this.BrandList();
    this.CategoryList();
    this.ListStatusProduct();
    console.log(this.product)
    this.id = this.product.id;
    this.productname = this.product.productname;
    this.image = this.product.image;
    this.brandId = this.product.brandId;
    this.categoryId = this.product.categoryId;
    this.description = this.product.description;
    this.price = this.product.price;
    this.statusProduct = this.product.statusProduct;
    this.product.dateofSale = this.product.dateofSale.slice(0, -9);

    if(this.product.id == 0 || this.product.id == null){

    }
    else{
      this.GetsImage(this.product.id);
      this.product.images = this.images;
      this.formAddProduct.patchValue(this.product);
      this.imageSrc = 'https://localhost:44355/Images/Product/' + this.image;
      this.imageSrcs = [];
      for(let i = 0; i < this.ImagesProduct.length; i++){
        this.imageSrcs.push('https://localhost:44355/Images/Product/' + this.ImagesProduct[i]);
      }
    }
  }
  async addProduct(){
    var data = this.formAddProduct.value;
    data.images = this.images;

    console.log(this.image1.nativeElement.files[0]);
    console.log(this.images1.nativeElement.files);
    const image = this.image1.nativeElement.files[0];
    const images = this.images1.nativeElement.files;
    if(images.length == 0){
      this.onSave(data);
    }
    else{
      this.uploadPhoto(image, data);
      this.uploadPhotos(images, data);
    }
    
return
    
    console.log(image);
    
    
    var val = {id: +data.id,
              productname: data.productname,
              image : image,
              images : images,
              brandId : +data.brandId,
              categoryId : +data.categoryId,
              description : data.description,
              price : +data.price,
              statusProduct : +data.statusProduct,
              dateofSale : data.dateofSale,
              userId: "fbf4eb74-5358-4cb9-b855-49c88e363397"
              };
    console.log(val);
    // this.service.saveProduct(val).subscribe(res => {
    //   alert(res.message.toString());
    // });
    this.ListStatusProduct();
  }

  onSave(data: any) {
    var val = {id: +data.id,
      productname: data.productname,
      image : data.image,
      images : data.images,
      brandId : +data.brandId,
      categoryId : +data.categoryId,
      description : data.description,
      price : +data.price,
      statusProduct : +data.statusProduct,
      dateofSale : data.dateofSale,
      userId: "fbf4eb74-5358-4cb9-b855-49c88e363397"
      };

this.service.saveProduct(val).subscribe(res => {
      alert(res.message.toString());
    });
    this.ListStatusProduct();
  }

  BrandList(){
    this.service.getsBrand().subscribe({
      next: data => {
      this.Brand=data;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log('There was an error!', error);
      }
    });
  }
  
  CategoryList(){
    this.service.getsCategory().subscribe({
      next: data => {
      this.Category=data;
      },
      error: error => {
        this.errorMessage = error.message;
        console.log('There was an error!', error);
      }
    });
  }
  ListStatusProduct(){
    this.service.getsStatusproduct().subscribe(
      {next: data => {
        this.StatusProducts =data;
        },
        error: error => {
          this.errorMessage = error.message;
          console.log('There was an error!', error);
        }
      });
    }

  GetsImage(val : any){
    this.service.getsImage(val).subscribe({
        next: data => {
          this.ImagesProduct =[];
        for(let i = 0 ;i <data.length;i++){
          this.ImagesProduct.push(data[i].pathImage);
          this.imageSrcs.push('https://localhost:44355/Images/Product/' + data[i].pathImage);
          if(i == 0){
            this.images = data[i].pathImage;
          }
          else{
            this.images += '%' + data[i].pathImage;
          }
        }
        },
        error: error => {
          this.errorMessage = error.message;
          console.log('There was an error!', error);
        }
      });
  }

  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }

  imageSrc: any;
  readURL(event: any): void {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];

          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(file);
          // this.uploadPhoto(file);
      }
  }

  imageSrcs: any;
  readURL1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files;
        var tam =[];
        for(let i = 0; i < file.length; i++){
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            if(e!=null){
              tam.push(e.target?.result);
            }
          }
        }
        // this.uploadPhotos(file);
      }
      this.imageSrcs = tam;
  }

  async uploadPhoto(file: any, data: any){
    let a = '';
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.UploadPhotoProduct(formData).subscribe((res :any)=> {

      data.image = res.message;

      // a = data.message;
      // return data.message;
    });
    // console.log(a);
    
    // return a;
  }

  uploadPhotos(file: any[], data: any){
    const formData:FormData=new FormData();
    for(let i=0;i<file.length;i++){
      formData.append('uploadedFile[]',file[i],file[i].name);
    }
    
    this.service.UploadPhotoProducts(formData).subscribe((res :any)=>{
      data.images = res.message;

      this.onSave(data);
    })
    
  }
}

