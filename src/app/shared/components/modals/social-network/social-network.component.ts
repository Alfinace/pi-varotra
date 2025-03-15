import { UserService } from 'src/app/services/user.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import socialsInit from 'src/assets/data/social-network.json';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.scss'],
})
export class SocialNetworkComponent implements OnInit, OnDestroy {
  @Input() currentUser: any = {};
  public selectedSocial: any[] = [];
  @Output() socialNetwork: EventEmitter<any[]> = new EventEmitter();
  @Output() clickBackEvent = new EventEmitter();

  public socials: any[] = socialsInit;
  public social: any[] = [...this.socials];

  constructor(
    public modalController: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.selectedSocial = this.currentUser.socialNetwork
    this.social.map(s => {
      let index = this.selectedSocial.findIndex(so => so.name === s.name)
      if (index != -1) {
        s.value = this.selectedSocial[index].value;
      }
      return s
    })
  }

  public selectSocial(socialParams: any) {
    if (this.selectedSocial.find((s) => s.name === socialParams.name)) {
      this.selectedSocial = this.selectedSocial.filter(
        (s) => s.name !== socialParams.name
      );
    } else {
      this.selectedSocial.push(socialParams);
    }
  }
  public validateSocial() {
    this.userService.updateUser({ socialNetwork: JSON.stringify(this.selectedSocial) }).subscribe((res: any) => {
      this.modalController.dismiss(this.selectedSocial);
    })

  }

  public checkName(s: any) {
    return !!this.selectedSocial.find(
      (socialItem: any) => socialItem.name === s.name
    );
  }

  ngOnDestroy(): void {
    this.socialNetwork.unsubscribe();
    this.clickBackEvent.unsubscribe();
  }

  public clickBack() {
    this.clickBackEvent.emit();
  }

  public onSearch(e: any) {
    const value: string = e.target.value;
    if (value.trim() === '') {
      this.social = this.socials;
    } else {
      this.social = this.socials.filter((s) =>
        s.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
  }
  public onChangeValue(e: any, i: number) {
    this.social[i].value = e.target.value;
    if (this.social[i].value.trim() === '') {
      return
    }
    if (this.selectedSocial.find((s) => s.name === this.social[i].name)) {
      this.selectedSocial = this.selectedSocial.filter(
        (s) => s.name !== this.social[i].name
      );
    } else {
      this.selectedSocial.push(this.social[i]);
    }
    i
  }

  public close() {
    this.modalController.dismiss();
  }
}
