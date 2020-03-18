import {Component, OnInit} from '@angular/core';
import {ManageAssetService} from '../manage-asset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  loading = true;
  dataSet = [];
  fleet: Subscription;

  constructor(private manageAssetService: ManageAssetService) {
  }

  ngOnInit(): void {
    this.manageAssetService.LoadFleetData();

    this.fleet = this.manageAssetService.$FleetSubject.subscribe(value => {
      this.dataSet = value;
      this.loading = false;
      this.fleet.unsubscribe();
    });

  }

}
