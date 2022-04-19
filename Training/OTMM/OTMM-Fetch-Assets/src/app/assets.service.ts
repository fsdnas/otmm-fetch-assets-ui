import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConstantsService } from './constants.service';

export interface LoginResponse {
  session_resource: {
    session: {
      domain_name: string;
      id: string;
      local_session: boolean;
      login_name: string;
      message_digest: string;
      role_name: string;
      user_full_name: string;
      user_id: string;
      user_role_id: string;
      validation_key: number;
    };
  };
}

export interface OTDSResponse {
  token: string;
  userId: string;
  ticket: string;
  resourceID: string;
  passwordExpirationTime: number;
  continuation: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  //-------------------------------------------------
  assetValue$: Subject<string> = new Subject();

  changeAsset(asset: string) {
    this.assetValue$.next(asset);
  }

  // assetsList$: Subject<any[]> = new Subject();
  // getListOfAssets() {
  //   this.assetsList$.next(this.listOfAssets);
  // }
  //-----------------------------------------------------

  constructor(
    private _constants: ConstantsService,
    private _http: HttpClient
  ) {}

  //----------------Authentication ----------------------
  session = '';
  login() {
    this.getOTDSTicket().subscribe((data: any) => {
      localStorage.setItem('OTDSTicket', data.ticket);
      this.getResourceTicket(data.ticket).subscribe((value) => {
        localStorage.setItem('ResourceToken', value.ticket);
        this.getSession(value.ticket).subscribe((d: any) => {
          localStorage.setItem('sessionId', d.session_resource.session.id);
          this.session = d.session_resource.session.id;
        });
      });
    });
  }

  private getOTDSTicket() {
    return this._http.post<OTDSResponse>(this._constants.OTDS_URL, {
      userName: this._constants.username,
      password: this._constants.password,
      ticketType: 'OTDSTICKET',
    });
  }

  private getSession(ticket: string) {
    const headers = new HttpHeaders({
      OTDSToken: ticket,
    });

    return this._http.get<LoginResponse>(this._constants.RETRIEVE_SESSION_URL, {
      headers,
      withCredentials: true,
    });
  }

  private getResourceTicket(ticket: string): Observable<OTDSResponse> {
    const headers = new HttpHeaders({
      OTDSToken: ticket,
    });

    const body = {
      ticket,
      targetResourceId: 'e1332625-4b8e-4e40-94a8-012f81846665',
    };

    return this._http.post<OTDSResponse>(this._constants.RESOURCE_URL, body, {
      headers,
    });
  }

  // //--------------------Search operation------------------------------------
  // assets: any;
  // listOfAssets: any;
  // searchByKeyWord(keyword: string) {
  //   const headers = new HttpHeaders({
  //     'X-Requested-By': localStorage.getItem('sessionId')!,
  //     OTDSToken: localStorage.getItem('OTDSTicket')!,
  //   });

  //   return this._http
  //     .get(this._constants.KEYWORD_SEARCH + keyword, { headers: headers })
  //     .subscribe((data: any) => {
  //       this.assets = data;
  //       this.listOfAssets = this.assets['search_result_resource']['asset_list'];
  //       console.log(this.listOfAssets);
  //     });
  // }

  // keyWord = '';
  // assetList: any;
  // ngOnInit(): void {
  //   this.assetValue$.subscribe((d) => {
  //     this.keyWord = d;
  //     this.assetList = this.searchByKeyWord(this.keyWord);
  //   });
  // }
}
