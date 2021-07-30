import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  @ViewChild('avatar') avatar: any;
  constructor(private fb: FormBuilder,private service: SharedService) {
    this.formAddUser = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      gender: ['', Validators.required],
      doB: ['', Validators.required],
      company: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      imagePath: ['', Validators.required]
    })
  }

  @Input() user:any;
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
  password: any;
  confirmPassword: any;
  message: any;
  formAddUser = new FormGroup({});

  ngOnInit(): void {
    
  }


  // register(){
  //   var val = {fullName : this.fullName,
  //     userName : this.userName,
  //     gender : this.gender,
  //     doB : this.doB,
  //     company : this.company,
  //     address : this.address,
  //     phoneNumber : this.phoneNumber,
  //     email : this.email,
  //     imagePath : this.imagePath,
  //     password : this.password,
  //     confirmPassword : this.confirmPassword };
  //   this.service.registerweb(val).subscribe(res => {
  //     alert(res.message.toString());
  //   });
  // }

  register() {
    // const formData: any = new FormData(this.formAddUser.value);
    // formData.append('fullName', this.formAddUser.get('fullName')?.value);
    // formData.append('userName', this.formAddUser.get('userName')?.value);
    // formData.append('gender', this.formAddUser.get('gender')?.value);
    // formData.append('doB', this.formAddUser.get('doB')?.value);
    // formData.append('company', this.formAddUser.get('company')?.value);
    // formData.append('address', this.formAddUser.get('address')?.value);
    // formData.append('email', this.formAddUser.get('email')?.value);
    // formData.append('password', this.formAddUser.get('password')?.value);
    // formData.append('confirmPassword', this.formAddUser.get('confirmPassword')?.value);
    // formData.append('imagePath', this.imagePath.get('imagePath')?.value);
    console.log(this.formAddUser.value);
    let data = this.formAddUser.value;
    let data1 = {
      fullName: data.fullName,
      userName: data.userName,
      gender: data.gender,
      doB: data.doB,
      company: data.company,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      imagePath: this.uploadPhoto(this.avatar.nativeElement.files[0])
    };
    console.log(data1)
    // this.service.registerweb(data1).subscribe(res => {
    //   alert(res.message.toString());
    // });
  }

  imageSrc: any;
  image: any;
  readURL(event: any): void {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];

          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(file);
          console.log(file);
          console.log(this.avatar.nativeElement.files[0]);
          this.avatar.nativeElement.files = event.target.files;
          // this.uploadPhoto(file);
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
      return data.message;
    })
  }
}
