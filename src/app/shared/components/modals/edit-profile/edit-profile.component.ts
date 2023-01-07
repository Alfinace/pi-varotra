import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UploadService } from 'src/app/services/upload.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() public currentUser: any;
  public profileForm: FormGroup;
  public formData: FormData;
  public cin: any[] = [];
  public recto: any;
  public imgs: any;
  public verso: any;
  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private uploadService: UploadService,
    private sessionService: SessionService,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.profileForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.minLength(10), Validators.maxLength(10)]],
    })
    this.profileForm.patchValue(this.currentUser)
  }

  get f() {
    return this.profileForm.controls;
  }

  public close() {
    this.modalController.dismiss();
  }

  public onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.profileForm.value).subscribe((res: any) => {
        if (res) {
          this.toastService.show('dark', 'Votre profil a été mis à jour')
        }
      })
    } else {
      this.profileForm.markAllAsTouched()
    }
  }

  public saveCIN() {
    for (let i = 0; i < this.cin.length; i++) {
      this.userService.saveCIN(this.cin[i]).subscribe((res: any) => {
        if (res) {
          this.currentUser.images.push({ name: this.cin[i].name, type: 'cin', exist: true })
          this.sessionService.updateInfoUser(this.currentUser);
        }
      })
    }
  }

  public isUploaded(name: string) {
    for (let i = 0; i < this.currentUser.images.length; i++) {
      const image = this.currentUser.images[i];
      if (image.name == name) {
        return true;
      }
    }
    return false
  }

  public getImageRecto(event: any) {
    this.recto = event.preview
    console.log(event);

    let formData = new FormData();
    formData.append('files', event.source);
    this.uploadService.upload(formData).then((res: any) => {
      this.cin.push({ filename: res.images[0], type: 'cin', name: 'recto' })
    })
  }

  public getImageVerso(event: any) {
    this.verso = event.preview
    let formData = new FormData();
    formData.append('files', event.source);
    this.uploadService.upload(formData).then((res: any) => {
      this.cin.push({ filename: res.images[0], type: 'cin', name: 'recto' })
    })

  }
}
