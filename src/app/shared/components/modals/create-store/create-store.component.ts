import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent implements OnInit {
  public storeForm: FormGroup;
  public deleverieForm: FormGroup;
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private uploadService: UploadService,
    private sessionService: SessionService,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.storeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  onSubmit() {
    console.log(this.storeForm.value);
  }
  close() {
    this.modalController.dismiss();
  }

}
