import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient,
              private route: ActivatedRoute,) {
  }

  postMailKoori(data: {}): any{
    // @ts-ignore
    return this.http.post(`${environment.API}post/mail/koori`, data)
  }
  postMailIbox(data: {}): any{
    // @ts-ignore
    return this.http.post(`${environment.API}post/mail/ibox`, data)
  }
  postMailFiche(id: number, data: {}): any{
    // @ts-ignore
    return this.http.post(`${environment.API}post/mail/fiche/${id}`, data)
  }
}
