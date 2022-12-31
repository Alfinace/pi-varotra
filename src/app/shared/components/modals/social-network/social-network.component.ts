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
import { ISocial } from './../../../interface/isocial';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.scss'],
})
export class SocialNetworkComponent implements OnInit, OnDestroy {
  @Input() isEdit: boolean;
  @Input() selectedSocial: ISocial[] = [];
  @Output() socialNetwork: EventEmitter<any[]> = new EventEmitter();
  @Output() clickBackEvent = new EventEmitter();

  public socials: ISocial[] = socialsInit;
  public social: ISocial[] = [...this.socials];

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.social.map(s =>{
      let index = this.selectedSocial.findIndex(so => so.name === s.name)
      if ( index != -1) {
        s.value = this.selectedSocial[index].value;
      }
      return s
    })
  }

  public selectSocial(socialParams: ISocial) {
    if (this.selectedSocial.find((s) => s.name === socialParams.name)) {
      this.selectedSocial = this.selectedSocial.filter(
        (s) => s.name !== socialParams.name
      );
    } else if (this.selectedSocial.length < 3) {
      this.selectedSocial.push(socialParams);
    }
  }
  public validateSocial() {
    this.modalController.dismiss(this.selectedSocial);
  }

  public checkName(s: ISocial) {
    return !!this.selectedSocial.find(
      (socialItem: ISocial) => socialItem.name === s.name
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
  }
}
