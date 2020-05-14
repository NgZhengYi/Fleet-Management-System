import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ManageMaintenanceService} from '../manage-maintenance.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-update-maintenance',
  templateUrl: './update-maintenance.component.html',
  styleUrls: ['./update-maintenance.component.css']
})
export class UpdateMaintenanceComponent implements OnInit {
  MaintenanceFormGroup: FormGroup;
  Loading = true;
  FormReady = false;
  private MaintenanceIdentity;
  private MaintenanceDetail: Subscription;

  constructor(private manageMaintenanceService: ManageMaintenanceService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private modal: NzModalService, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.MaintenanceIdentity = this.activatedRoute.snapshot.queryParams.AUTO_IDENTITY;

    this.manageMaintenanceService.SingleMaintenance(this.MaintenanceIdentity);

    this.MaintenanceDetail = this.manageMaintenanceService.$Maintenance.subscribe(value => {
      console.log(value);
      this.MaintenanceFormGroup = this.formBuilder.group({
        auto_identity: [this.MaintenanceIdentity],
        workshop_identity: [value.workshop_identity],
        workshop_code: [value.workshop_code],
        workshop_name: [value.workshop_name],
        vehicle_identity: [value.vehicle_identity],
        vehicle_code: [value.vehicle_code],
        vehicle_plate: [value.vehicle_plate],
        vehicle_manufacturer: [value.vehicle_manufacturer],
        vehicle_model: [value.vehicle_model],
        scheduled_date: [value.scheduled_date],
        maintenance_status: [value.status],
        maintenance_description: [value.maintenance_description]
      });

      this.FormReady = true;
      this.Loading = false;
      this.MaintenanceDetail.unsubscribe();
    });
  }

  updateForm() {
    this.modal.confirm({
      nzTitle: 'UPDATE Maintenance Detail ?',
      nzOkText: 'YES',
      nzOnOk: () => {
        console.log(this.MaintenanceFormGroup.value);

        if (this.MaintenanceFormGroup.valid) {
          this.manageMaintenanceService.UpdateMaintenance(this.MaintenanceFormGroup.value)
            .pipe(first())
            .subscribe(response => {
              if (response === 'Success') {
                this.message.create('success', 'Update Successfully');
              } else {
                this.message.create('error', 'Update Error');
              }
            });
        }
      },
      nzCancelText: 'NO'
    });
  }

}
