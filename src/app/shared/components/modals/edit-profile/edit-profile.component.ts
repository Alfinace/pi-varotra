import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public imgs = '';
  public recto: any;
  public verso: any;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      publicKey: ['', [Validators.required]],
    })
    this.profileForm.disable()
  }

  get f() {
    return this.profileForm.controls;
  }

  public close() {
    this.modalController.dismiss();
  }

  public toggle() {
    if (this.profileForm.disabled) {
      this.profileForm.enable()
    } else {
      this.profileForm.disable()
    }
  }

  public fileUpload(event: any) {

  }

  public getImageRecto(event: any) {
    this.recto = event.preview
  }

  public getImageVerso(event: any) {
    console.log(event.preview);

    this.verso = event.preview
  }
}
