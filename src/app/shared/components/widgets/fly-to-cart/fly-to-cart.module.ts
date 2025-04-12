import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FlyToCartComponent } from "./fly-to-cart.component";

@NgModule({
  imports: [CommonModule,IonicModule],
  declarations: [FlyToCartComponent],
  exports: [FlyToCartComponent],
})
export class FlyToCartModule { }
