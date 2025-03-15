import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent implements OnInit, AfterViewInit {
  public storeForm: FormGroup;
  @ViewChild('slider') slider: IonSlides;
  public deliveryForm: FormGroup;
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  preview: any;
  currentIndex = 0
  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private uploadService: UploadService,
    private sessionService: SessionService,
    private userService: UserService,
    private fb: FormBuilder) { }
  ngAfterViewInit(): void {
    this.slider.lockSwipes(true);
  }

  ngOnInit() {

    this.storeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      logo: ['',],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.minLength(10), Validators.maxLength(10)]],
      deliveries: this.fb.array([]), // delivery mode
      description: ['', [Validators.required]],
    })
    // this.addDeliverieMode()
  }

  deliverieMode(): FormArray {
    return this.storeForm.get("deliveries") as FormArray
  }

  get f() { return this.storeForm.controls; }

  newDeliverieMode(): FormGroup {
    return this.fb.group({
      distance: '',
      costs: '',
    })
  }

  async next() {
    if (await this.slider.getActiveIndex() > 0 && this.storeForm.invalid) {
      this.toastService.show('dark', 'Verifiez remplir les champs');
      return;
    }
    this.slider.lockSwipes(false);
    this.slider.slideNext();
    this.slider.lockSwipes(true);
    this.currentIndex = await this.slider.getActiveIndex();
  }



  async prev() {
    if (await this.slider.getActiveIndex() == 0) {
      this.close();
    }
    this.slider.lockSwipes(false);
    this.slider.slidePrev();
    this.slider.lockSwipes(true);
    this.currentIndex = await this.slider.getActiveIndex();
  }

  addDeliverieMode() {
    this.deliverieMode().push(this.newDeliverieMode());
  }

  removeDeliverieMode(i: number) {
    this.deliverieMode().removeAt(i);
  }

  save() {
    if (this.storeForm.invalid) {
      this.toastService.show('dark', 'Verifiez remplir les champs');
      return;
    }

    this.userService.createStore({ ...this.storeForm.value, deliveries: JSON.stringify(this.storeForm.value.deliveries) }).subscribe((res) => {
      this.toastService.show('dark', 'Votre magasin a été créer avec succès');
      this.modalController.dismiss(true)
    }, err => {
      this.toastService.show('dark', 'Il y a une erreur');
    })
  }
  close() {
    this.modalController.dismiss();
  }

  public getImage(event: any) {
    this.preview = event.preview;
    let formData = new FormData();
    formData.append('files', event.source);
    this.uploadService.upload(formData).then((res: any) => {
      this.storeForm.patchValue({ logo: res.images[0] });
    })
  }
}
