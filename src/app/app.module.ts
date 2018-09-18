import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AppComponent } from './app.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { NumberOnlyDirective } from './number.directive';

import { AppRoutingModule } from './app-routing.module';
import { MemberListModule } from './member-list/member-list.module';
import { MemberViewModule } from './member-view/member-view.module';
import { EditMemberDialogComponent } from './member-view/edit-member-dialog/edit-member-dialog.component';
import { PlaneListModule } from './plane-list/plane-list.module';
import { EditPlaneDialogComponent } from './plane-list/edit-plane-dialog/edit-plane-dialog.component';
import { FeeListModule } from './fee-list/fee-list.module';
import { SiteNavigationModule } from './site-navigation/site-navigation.module';
import { CreditListModule } from './credit-list/credit-list.module';
import { AccountModule } from './account/account.module';
import { DeletePlaneDialogComponent } from './plane-list/delete-plane-dialog/delete-plane-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserFormComponent,
    NumberOnlyDirective
  ],
  imports: [
    AppRoutingModule,
    MemberListModule,
    MemberViewModule,
    PlaneListModule,
    FeeListModule,
    SiteNavigationModule,
    CreditListModule,
    AccountModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ger' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditMemberDialogComponent,
    EditPlaneDialogComponent,
    DeletePlaneDialogComponent
  ]
})
export class AppModule { 
 }
