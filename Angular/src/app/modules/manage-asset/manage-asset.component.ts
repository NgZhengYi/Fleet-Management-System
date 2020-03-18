import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  modalVisible = false;

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Fleet - Manage Asset');
  }

  displayModal() {
    this.modalVisible = true;
  }

  submitModal() {
    console.log('Submit Modal');
    this.modalVisible = false;
  }

  cancelModal() {
    console.log('Cancel Modal');
    this.modalVisible = false;
  }

}
