import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { robots } from '../models/robots.models';
import { ServicesService } from '../services/services.service';
import { RobotFormComponent } from './robot-form/robot-form.component';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.scss']
})
export class RobotListComponent implements OnInit {

  dataSources!: MatTableDataSource<robots>;
  displayedColumns: string[] = ['name', 'serialNumber', 'Actions'];
  robotList!: robots[] | undefined;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private services: ServicesService) { }

  ngOnInit(): void {
    this.getRobots();
  }

  async getRobots() {
    console.log('this gets the robots from db')
    await this.services.getAllRobots().subscribe((res: robots[] | undefined) => {
      this.dataSources = new MatTableDataSource(res);
      this.robotList = res
      console.log(this.robotList);
      
    });
    
    
  }

  addRobot() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';

    let dialogRef = this.dialog.open(RobotFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('The dialog was closed but robot was created');

        this._snackBar.open("Robot was created Successfully", "Close", {
          duration: 2000,
        });
        this.getRobots()
      }
      else {
        console.log('The dialog was closed');
      }

    });

  }

  editRobot(robot: robots) {
    console.log(robot.robotName + " Robot to edit")

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      robot: robot
    }

    let dialogRef = this.dialog.open(RobotFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('The dialog was closed but Robot was edited');

        this._snackBar.open("Robot was created Edited", "Close", {
          duration: 2000,
        });
        this.getRobots()
      }
      else {
        console.log('The dialog was closed');
      }

    });
  }

  async deleteRobot(robot: robots) {
    console.log(robot + " robot to delete")

    await this.services.deleteRobot(robot).subscribe((res: any) => {
      this._snackBar.open("Robot was Deleted Successfully", "Close", {
        duration: 2000,
      });
    });
  }

}