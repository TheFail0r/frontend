import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ListMember } from './../models/list-member.model';
import { MemberListService } from './../services/memberlist.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AddUserFormComponent } from './../add-user-form/add-user-form.component';
import { Member, Status, Gender, OfficeEnum, AuthorizationEnum } from './../models/member.model';
import { MemberService } from './../services/member.service';
import { MemberAddService } from './../services/member-add.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  sort: any;
  displayedColumns: string[];
  dataSource: any;
  
  @ViewChild(MatSort) set content(sort: ElementRef) {
    this.sort = sort;
    if (this.sort) {
      this.dataSource.sort = this.sort;

    }
  }

  constructor(public memberListService: MemberListService, public router: Router, public addUserDialog: MatDialog,
    public memberAddService: MemberAddService, public snackBar: MatSnackBar, public activatedRoute: ActivatedRoute,
    public memberService: MemberService) {
    this.displayedColumns = ['id', 'firstName', 'lastName'];
  }

  ngOnInit() {
    this.memberListService.getMemberListData().subscribe(
      (data: ListMember[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      }
    );
  }

  public navigateTo(rowId): void {
    this.router.navigate(['/member', rowId]);
  }

  openAddUserDialog(): void {
    const dialogRef = this.addUserDialog.open(AddUserFormComponent, {
    });

    dialogRef.afterClosed().subscribe(newMember => {
      this.saveMember(newMember);
      console.log('The dialog was closed');
    });
  }

  public saveMember(member: Member): void {
    console.log(member);
    const newMemberData = JSON.parse(JSON.stringify(member));
    member = this.formatStringToEnum(member);
    console.log(member);
    this.memberAddService.addMemberData(member).subscribe(
      (response) => {
        if (response.status === 204) {
          this.snackBar.open('Änderungen erfolgreich gespeichert.', 'Schließen',
            {
              duration: 3000,
            }
          );
          this.dataSource.data.push(newMemberData);
        }
      },
      error => {
        if (error.status === 400) {
          this.snackBar.open('Pflichtfelder nicht ausgefüllt', 'Schließen',
            {
              duration: 4000,
            }
          );
        } else if (error.status === 404) {
          this.snackBar.open('Mitglied nicht gefunden.', 'Schließen',
            {
              duration: 4000,
            }
          );
        } else if (error.status === 0) {
          this.snackBar.open('Es konnte keine Verbindung zum Server aufgebaut werden', 'Schließen',
            {
              duration: 4000,
            }
          );
        }
      }
    );
  }

  public formatStringToEnum(member: any): any {
    member.gender = Gender.getEnumString(member.gender);
    member.status = Status.getEnumString(member.status);
    for (let i = 0; i < member.offices.length; i++) {
      member.offices[i].title = OfficeEnum.getEnumString(member.offices[i].title);
    }
    for (let i = 0; i < member.flightAuthorization.length; i++) {
      member.flightAuthorization[i].authorization = AuthorizationEnum.getEnumString(member.flightAuthorization[i].authorization);
    }
    return member;
  }

}
