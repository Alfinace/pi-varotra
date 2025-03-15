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
      if (attribut === 'id') {
        this.ownerForm.get('frontDoc')?.setValue(event);
      } else if (attribut === 'back') {
        this.ownerForm.get('backDoc')?.setValue(event);
      } else if (attribut === 'residence') {
        this.ownerForm.get('residenceProof')?.setValue(event);
      }
    }
}
