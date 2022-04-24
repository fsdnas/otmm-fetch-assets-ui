import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import {  lastValueFrom } from 'rxjs';


@Pipe({
  name: 'protectedImage'
})
export class ProtectedImagePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  async transform(src: string): Promise<string> {
    const headers = new HttpHeaders({
      'X-Requested-By': localStorage.getItem('sessionId')!,
      OTDSToken: localStorage.getItem('OTDSTicket')!,
    });

    const imageBlob = await lastValueFrom(
      this.http.get(src, { headers, responseType: 'blob' })
    );

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  }

}
