import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { ConditionTermComponent } from '../../modals/condition-term/condition-term.component';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
})
export class CreateEmailComponent implements OnInit, OnDestroy {
  public isSubmited = false;
  @Input() signUpForm: FormGroup;
  @ViewChild('checkbox') checkbox: any;
  @Output() public stepperEvent: EventEmitter<any> = new EventEmitter();
  constructor(private modalController: ModalController,
    private toastService: ToastService,
    private userService: UserService) { }

  ngOnInit() {
  }

  get f() { return this.signUpForm.controls; }

  public next() {
    if (this.checkbox.checked && this.signUpForm.valid) {
      this.isSubmited = true;
      this.userService.sendEmail(this.signUpForm.value.email).subscribe((res: any) => {
        this.isSubmited = false;
        this.stepperEvent.emit('next');
      }, (err: HttpErrorResponse) => {
        if (err.error === 'ER_DUP_ENTRY') {
          this.toastService.show('danger', 'Email existe déjà');
        } else {
          this.toastService.show('danger', 'Il y a eu une erreur');
        }
        this.isSubmited = false;
      })
    }
  }
  async openModalCondtion() {
    const modal = await this.modalController.create({
      component: ConditionTermComponent,
      componentProps: { value: 123 }
    });

    await modal.present();

  }

  public toggleCheck() {
    this.checkbox.checked = !this.checkbox.checked;
  }

  ngOnDestroy(): void {
    this.stepperEvent.unsubscribe();
  }

}
