import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-images',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Output() selectImageEvent: EventEmitter<any> = new EventEmitter();
  @Input()
  public imgs!: string;
  public formGroup!: FormGroup;
  public showPreview = false;
  public isCropperShow = false;
  public imageChangedEvent: Event;
  public filename = '';

  public image: any;

  constructor() { }

  ngOnDestroy(): void {
    this.selectImageEvent.unsubscribe();
  }

  ngOnInit(): void { }

  public selectImageSource() {
    this.addImage(CameraSource.Prompt);
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      promptLabelPicture: 'Prendre une photo',
      promptLabelPhoto: 'Galerie',
      correctOrientation: true,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source,
      saveToGallery: true
    });
    const blobData = this.b64toBlob(
      image.base64String,
      `image/${image.format}`
    );

    const reader = new FileReader();
    reader.onload = () => {
      this.image = { preview: reader.result as string, source: blobData };
      this.selectImageEvent.emit(this.image);
    };
    reader.readAsDataURL(blobData);
  }

  // Used for browser direct file upload
  uploadFile(event: any) {
    const eventObj: Event = event as any;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.image = { preview: reader.result as string, source: file };
      this.selectImageEvent.emit(this.image);
    };
    reader.readAsDataURL(file);
  }

  public deleteImage() { }

  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript

  public b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  }
}
