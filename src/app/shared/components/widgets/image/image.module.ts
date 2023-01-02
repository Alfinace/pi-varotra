import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ImageComponent } from "./image.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [ImageComponent],
  exports: [ImageComponent],
  providers: [FormGroupDirective],
})
export class ImageModule { }
