import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css'],
})
export class AssetDetailsComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _constants: ConstantsService
  ) {}

 
  //--------------------get asset by id------------------------------------
  asset: any;
  assetDetails: any;
  thumbnail:any;
  baseURL='http://training-otmm.acheron-tech.com:11090'
  getAssetById() {
    const headers = new HttpHeaders({
      'X-Requested-By': localStorage.getItem('sessionId')!,
      OTDSToken: localStorage.getItem('OTDSTicket')!,
    });

   
   
    return this._http
      .get(this.baseURL+'/otmmapi/v6/assets/' +  localStorage.getItem('selectedAsset')+'?load_type=metadata', { headers: headers })
      .subscribe((data: any) => {
        this.asset = data;
        this.thumbnail = this.asset['asset_resource']['asset']
        this.assetDetails = this.asset['asset_resource']['asset']['metadata']['metadata_element_list'];
        console.log(this.thumbnail);
      });
  }

  ngOnInit(): void {
    this.getAssetById();
  }
}
