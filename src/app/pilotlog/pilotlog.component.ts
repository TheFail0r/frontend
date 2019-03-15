import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatSort } from '@angular/material';
import { Member } from './../models/member.model';
import { MemberService } from './../services/member.service';
import { Pilotlog } from './../models/pilotlog.model';
import { PilotlogService } from './../services/pilotlog.service';

@Component({
  selector: 'app-pilotlog',
  templateUrl: './pilotlog.component.html',
  styleUrls: ['./pilotlog.component.css']
})
export class PilotLogComponent implements OnInit {

  member: Member;
  pilotlog: Pilotlog[];
  dataSource: any;
  displayedColumns: string[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public memberService: MemberService,
    public pilotLogService: PilotlogService
  ) {
    this.displayedColumns = ['flightId', 'planeNumber', 'departureLocation', 'departureTime',
      'arrivalLocation', 'arrivalTime', 'flightDuration', 'flightWithGuests'];
  }

  ngOnInit() {
    this.memberService.getMemberData(1).subscribe(
      (memberdata: Member) => {
        this.member = memberdata;
        this.pilotLogService.getPilotLogData(this.member.id).subscribe(
          (data: Pilotlog[]) => {
            this.pilotlog = data;
            this.addFlightDuration();
            this.dataSource = new MatTableDataSource(this.pilotlog);
            this.dataSource.sort = this.sort;
          }
        );
      }
    );
  }

  public calculateTimeDifference(start: string, end: string): string {
    const startSeconds = new Date(start).getTime();
    const endSeconds = new Date(end).getTime();
    const timeDifference = endSeconds - startSeconds;
    const hours = Math.floor(timeDifference / 1000 / 60 / 60);
    const minutes = (timeDifference - (hours * 60 * 60 * 1000)) / 1000 / 60;
    let returnString = '';
    if (hours !== 0) {
      returnString += hours + ' Stunden ';
    }
    if (minutes !== 0) {
      returnString += minutes + ' Minuten';
    }
    return returnString;
  }

  public addFlightDuration(): void {
    for (let i = 0; i < this.pilotlog.length; i++) {
      const newPilotLog = new Pilotlog(
        this.pilotlog[i].flightId,
        this.pilotlog[i].planeNumber,
        this.pilotlog[i].departureLocation,
        this.pilotlog[i].departureTime,
        this.pilotlog[i].arrivalLocation,
        this.pilotlog[i].arrivalTime,
        this.pilotlog[i].flightWithGuests,
        this.calculateTimeDifference(this.pilotlog[i].departureTime, this.pilotlog[i].arrivalTime)
      );
      this.pilotlog[i] = newPilotLog;
    }
  }

}
