import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { robots } from '../models/robots.models';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private path = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllRobots(): Observable<any> {
    return this.httpClient.get<any[]>(this.path + '/Robots/GetRobots');
  }

  editRobot(robot: robots): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.put(this.path + '/Robots/Put', JSON.stringify(robot), {headers: header})
  }

  createNewRobot(robot: robots): any {
    const header = new HttpHeaders().set('Concent-type', 'application/json');

    return this.httpClient.post(this.path + '/Robots/Post', JSON.stringify(robot), {headers: header})
  }

  deleteRobot(robot: robots): any {
    return this.httpClient.delete(this.path + '/Robots/Delete' + robot.robotId)
  }
}
