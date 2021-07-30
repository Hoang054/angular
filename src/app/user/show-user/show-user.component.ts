import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor(private service:SharedService) { }

  UserList: any=[];
  errorMessage:any;
  
  ActivateSaveUser:boolean=false;
  user:any;
  showModal:boolean = true;
  id : any;
  userName : any;
  fullName : any;
  gender:any;
  doB :any;
  company: any;
  address: any;
  phoneNumber: any;
  email: any;
  imagePath: any;
  avatar: any;
  password: any;
  confirmPassword: any;
  message: any;

  ngOnInit(): void {
    this.ShowListUser();
    
  }

  ShowListUser(){
    this.service.getsAccount().subscribe({
      next: data => {
        this.UserList=data;
      },
      error: error => {
        this.UserList = error.message;
        console.log('There was an error!', error);
      }
    });
  }

  editClick(item:any){
    this.user = {
        id : item.id,
        fullName : item.fullName,
        userName : item.userName,
        gender : item.gender,
        doB : item.doB,
        company : item.company,
        address : item.address,
        phoneNumber : item.phoneNumber,
        email : item.email,
        imagePath : item.imagePath
    };
    this.ActivateSaveUser = true;
    this.showModal = false;
  }

  deleteClick(item:any){
    this.service.deleteBrand(item.id).subscribe(res => {
      alert(res.message.toString());
    });
    this.ShowListUser();
  }

  closeClick(){
    this.ActivateSaveUser = false;
    this.ShowListUser();
  }

  imageSrc: any;
  image: any;

  readURL(event: any): void {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];

          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(file);
          this.uploadPhoto(file);
          // this.formAddUser.patchValue({
          //   imagePath: file
          // });
          // this.formAddUser.get('imagePath').updateValueAndValidity()
      }
  }
  uploadPhoto(file: any){
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.UploadPhoto(formData).subscribe((data :any)=>{
      this.imagePath = data.message;
    })
  }
  
}
