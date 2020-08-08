import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { State } from '../models/state';
import { StateData } from '../models/stateData';
import { District } from '../models/district';
import { Router } from '@angular/router';

@Component({
  selector: 'app-andhra',
  templateUrl: './andhra.component.html',
  styleUrls: ['./andhra.component.css']
})
export class AndhraComponent implements OnInit {

  districts: StateData[] = [];
  act: number = 0;
  rec: number = 0;
  cnf: number = 0;
  dec: number = 0;
  constructor(private dataSer: DataServiceService, private route: Router) { }

  ngOnInit() {
    this.dataSer.getData().subscribe(posts => {
      const postArray: State[] = [];
      let disData: District;
      for (const key in posts) {
        if (posts.hasOwnProperty(key)) {
          postArray.push(posts[key]);
          if (key === 'Andhra Pradesh') {
            disData = posts[key].districtData;
            console.log(disData);
            for (const key2 in disData) {
              if (disData.hasOwnProperty(key2)) {
                console.log(disData[key2].recovered);
                let dist = new StateData();
                dist.district = key2;
                dist.active = +disData[key2].active;
                this.act += +disData[key2].active;
                dist.confirmed = +disData[key2].confirmed;
                this.cnf += +disData[key2].confirmed;;
                dist.deceased = +disData[key2].deceased;
                this.dec += +disData[key2].deceased;
                dist.recovered = +disData[key2].recovered;
                this.rec += +disData[key2].recovered;
                this.districts.push(dist);
                console.log(dist);
              }
          }
        }
      }
    }
    });
  }

  home(){
    this.route.navigate(['']);
  };
}
