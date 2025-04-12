import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-information-store',
  templateUrl: './information-store.page.html',
  styleUrls: ['./information-store.page.scss'],
})
export class InformationStorePage implements OnInit {

  ownerForm: FormGroup;
  uploadedFiles: { idDocument?: File; residenceProof?: File } = {};

  previews: { front?: string; residenceProof?: string, back?: string } = {};

  constructor(private fb: FormBuilder) {
    this.ownerForm = this.fb.group({
      fullName: ['', Validators.required],
      idNumber: ['', Validators.required],
      frontDoc: [null, Validators.required],
      backDoc: [null, Validators.required],
      residenceProof: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  uploadFile(event: Event, fileType: 'idDocument' | 'residenceProof') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFiles[fileType] = input.files[0];
    }
  }

  submitForm() {
    if (this.ownerForm.valid) {
    } else {
    }
  }


  getImage(event: any, attribut: string) {
      if (attribut === 'frontDoc') {
        this.ownerForm.get(attribut)?.setValue(event);
        this.previews.front = event.preview;
      } else if (attribut === 'backDoc') {
        this.ownerForm.get(attribut)?.setValue(event);
        this.previews.back = event.preview;
      } else if (attribut === 'residenceProof') {
        this.ownerForm.get(attribut)?.setValue(event);
        this.previews.residenceProof = event.preview;
      }
    }
}
