import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '../assets.service';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  assetList?: any = [];

  keyWord: string = '';
  constructor(
    private _router: Router,
    private _assets: AssetsService,
    private _http: HttpClient,
    private _constants: ConstantsService
  ) {}
  baseUrl = 'http://training-otmm.acheron-tech.com:11090';

  onClickAsset(assetId: any) {
    console.log('clicked Asset');
    console.log(assetId);
    localStorage.removeItem('selectedAsset');
    localStorage.setItem('selectedAsset', assetId);
    this._router.navigate(['/asset-details']);
  }

  //--------------------Search operation------------------------------------
  assets: any;
  listOfAssets: any;
  searchByKeyWord(keyword: string) {
    const headers = new HttpHeaders({
      'X-Requested-By': localStorage.getItem('sessionId')!,
      OTDSToken: localStorage.getItem('OTDSTicket')!,
    });

    return this._http
      .get(this._constants.KEYWORD_SEARCH + keyword, { headers: headers })
      .subscribe((data: any) => {
        this.assets = data;
        this.listOfAssets = this.assets['search_result_resource']['asset_list'];
        console.log(this.listOfAssets);
      });
  }

  ngOnInit(): void {
    // this._assets.assetValue$.subscribe((d) => {
    //   this.keyWord = d;
    //   this.assetList.append(this._assets.searchByKeyWord(this.keyWord));
    //   console.log(this.assetList)
    // });

    this._assets.assetValue$.subscribe((d) => {
      this.keyWord = d;
      this.assetList = this.searchByKeyWord(this.keyWord);
    });
  }
}
