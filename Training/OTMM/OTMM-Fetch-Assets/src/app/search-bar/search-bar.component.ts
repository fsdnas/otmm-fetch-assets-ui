import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  enteredKeyword: string = '';

  constructor(private _assets: AssetsService, private router: Router) {}

  keyword(e: any) {
    this.enteredKeyword = e.target.value;
    console.log(this.enteredKeyword);
    this._assets.changeAsset(this.enteredKeyword);
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {}
}
