import { Component, Input, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements AfterViewInit, OnInit {
  @ViewChild('avatar') avatar: any;
  formAddUser = new FormGroup({});
  
  @Input() user:any;
  ActivateSaveUser:boolean = false;
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

  constructor(private fb: FormBuilder, private service: SharedService) {
    console.log(1);
    console.log(this.avatar);

    
    this.formAddUser = this.fb.group({
    id:[''],
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
  }) }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit(): void {
    var tam = this.user.doB.split('/');
    this.formAddUser = this.fb.group({
      id: this.user.id,
      fullName: this.user.fullName,
      userName: this.user.userName,
      gender: this.user.gender,
      doB: tam[2] + "-" + tam[1]+"-"+tam[0],
      company: this.user.company,
      address: this.user.address,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      imagePath: this.user.imagePath});
    // this.id = this.user.id;
    // this.userName = this.user.userName;
    // this.fullName = this.user.fullName;
    // this.gender = this.user.gender;
    // this.doB = tam[2] + "-" + tam[1]+"-"+tam[0];
    // this.company = this.user.company;
    // this.address = this.user.address;
    // this.phoneNumber = this.user.phoneNumber;
    // this.email = this.user.email;
    // this.imagePath = this.user.imagePath;
    // this.avatar = this.user.avatar;
    this.imageSrc = 'https://localhost:44355/Images/'+ this.imagePath;
    this.user = this.formAddUser;
  }

  update(){
    
    let data = this.formAddUser.value;
    let val = {
      id: data.id,
      fullName: data.fullName,
      userName: data.userName,
      gender: data.gender,
      doB: data.doB,
      company: data.company,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      imagePath: this.avatar.nativeElement.files[0].name
    };
    console.log(val);
    this.service.update(val).subscribe(res => {
        alert(res.message.toString());
        console.log(res.imagePath);
        this.uploadPhoto(this.avatar.nativeElement.files[0], res.imagePath);
    });
  }

  imageSrc: any;
  image: any;
  readURL(event: any): void {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];

          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(file);
          this.avatar.nativeElement.files = event.target.files;
          // this.formAddUser.patchValue({
          //   imagePath: file
          // });
          // this.formAddUser.get('imagePath').updateValueAndValidity()
      }
  }
  uploadPhoto(file: any, avatarPath: string){
    const formData:FormData=new FormData();
    formData.append('uploadedFile', file, file.name);
    this.service.UploadPhoto1(formData, avatarPath).subscribe((data :any)=>{
      return data.message;
    })
  }
}
