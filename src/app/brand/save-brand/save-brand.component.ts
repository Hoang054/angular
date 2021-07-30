import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedService } from 'src/app/shared.service';
import { ShowBrandComponent } from '../show-brand/show-brand.component';

@Component({
  selector: 'app-save-brand',
  templateUrl: './save-brand.component.html',
  styleUrls: ['./save-brand.component.css']
})
export class SaveBrandComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service:SharedService,
              private component: ShowBrandComponent) { 
                this.formAddBrand = this.fb.group({
                  id: new FormControl('',),
                  brandName: new FormControl('',[Validators.required])
                });
              }

  @Input() brand:any;
  formAddBrand = new FormGroup({
  });

  ngOnInit(): void {

    this.formAddBrand.patchValue(this.brand);

   
  }

  addBrand(){
    let data = this.formAddBrand.value;
    this.service.saveBrand(data).subscribe(res => {
      alert(res.message.toString());
    });
    this.component.showModal = true;
    this.component.closeClick();
  }

  get brandName():any {
    return this.formAddBrand.get('brandName');
  }

}
