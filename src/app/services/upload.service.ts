import { HttpService } from 'src/app/services/http.service';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private MAX_FILE_SIZE_ALLOWED: number = 25000000;
  private TYPE_IMAGE_ALLOWED: string[] = ['image/png', 'image/jpeg'];
  // private TYPE_FILE_ALLOWED : string[] = ['image/png','image/jpeg','application/pdf'];
  constructor(
    private http: HttpService,
    private toastService: ToastService
  ) { }


  fileValidator(file: File,): boolean {
    let isValid: boolean = true;
    if (file.size > this.MAX_FILE_SIZE_ALLOWED) {
      this.toastService.show('warning', 'Vous ne pouvez pas télécharger un fichier  supérieur de 25MB');
      isValid = false
    } else {
      if (!this.TYPE_IMAGE_ALLOWED.includes(file.type)) {
        this.toastService.show('warning', 'Image n\'est pas validé',);
        isValid = false
      }
    }
    return isValid
  }
  upload(data: any) {
    return this.http.post('upload', data).toPromise();
  }
}
