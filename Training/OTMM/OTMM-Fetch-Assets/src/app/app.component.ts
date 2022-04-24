import { Component } from '@angular/core';
import { AssetsService } from './assets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OTMM-Fetch-Assets';

  constructor(private _assets: AssetsService) {}

  assetKeyword = '';
  

  ngOnInit(): void {
    console.log(this.assetKeyword);
    // this._assets.searchByKeyWord('pooh');
    this._assets.login();
  }
}
