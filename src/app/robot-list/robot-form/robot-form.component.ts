import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {robots} from 'src/app/models/robots.models';
import {FormControl, FormGroup} from '@angular/forms'
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-robot-form',
  templateUrl: './robot-form.component.html',
  styleUrls: ['./robot-form.component.scss']
})
export class RobotFormComponent implements OnInit {

  newRobot: robots | undefined;
  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<RobotFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private services: ServicesService) {
    
  }

  newRobotForm = new FormGroup({
    name: new FormControl(''),
    serialNumber: new FormControl(null)
  })

  ngOnInit(): void {
    if(this.data != null) {
      this.newRobotForm = new FormGroup({
        name: new FormControl(this.data.robot.name),
        serialNumber: new FormControl(this.data.robot.serialNumber)
      });
      this.isEdit = true;
    }
  }

  onNoClick():void {
    this.dialogRef.close(0);
  }

  async onSubmit(){
    if(this.isEdit == false){
      this.newRobot = new robots(0,this.newRobotForm.value.name!, this.newRobotForm.value.serialNumber!);
      await this.services.createNewRobot(this.newRobot).subscribe((res: any) => {
        this.dialogRef.close(0);
      })
    }else{
      this.newRobot = new robots(this.data.robot.robotId, this.newRobotForm.value.name!, this.newRobotForm.value.serialNumber!);
      await this.services.editRobot(this.newRobot).subscribe((res: any) => {
        this.dialogRef.close(0)
      })
    }
  }
}
