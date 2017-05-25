import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { UserPOJO } from '../dto/user';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  user: UserPOJO.UserDTO;
  display: boolean = false;
  qualificationName: String;
  year: Number;
  schoolCollegeName: String;
  university: String;
  qualification: Object[];
  editQualificationId: Number;
  editQualificationName: String;
  editYear: Number;
  editSchoolCollegeName: String;
  editUniversity: String;

  @ViewChild('popup1') createPopup: Popup;
  @ViewChild('editPopup') editPopup: Popup;
  @ViewChild('removePopup') removePopup: Popup;
  @ViewChild('qualPanelCollapseEl') qualPanelCollapseEl: ElementRef;

  isCollapsed: boolean = true;

  constructor(private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  /*addNewQualification() {
    this.createPopup.options = {
      header: "New Qualification",
      color: "#393A35", // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Create", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-primary", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger", // you class for styling the cancel button 
      animation: "" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.createPopup.show(this.createPopup.options);
  }

  editQualificationPopup() {
    this.editPopup.options = {
      header: "Edit Qualification",
      color: "#393A35", // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Save", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-primary", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger", // you class for styling the cancel button 
      animation: "" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.editPopup.show(this.editPopup.options);
  }

  removeQualificationPopup() {
    this.removePopup.options = {
      header: "Remove Qualification",
      color: "#393A35", // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Delete", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-danger", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "" //'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.removePopup.show(this.removePopup.options);
  }*/
  onNewQualificationSubmit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    //const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    console.log(this.user.username);
    const newqualification = {
      qualificationName: this.qualificationName,
      year: Number(this.year),
      schoolCollegeName: this.schoolCollegeName,
      university: this.university,
      userName: this.user.username,
      dateCreated: new Date(),
      dateModified: null
    }
    //Required fields
    if (!this.validateService.validateQualification(newqualification)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //Validate numeric fields
    if (!this.validateService.validateNumeric(newqualification.year)) {
      this.flashMessage.show('Year should be numeric', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    console.log(newqualification);
    //Add qualification
    this.authService.addNewQualification(newqualification).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('New Qualification added succesfully', { cssClass: 'alert-success', timeout: 3000 });
        this.createPopup.hide();
        this.clearData();
        this.loadData();
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  updateQualification() {
    console.log('Update clicked');
    this.user = JSON.parse(localStorage.getItem('user'));
    //const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    console.log(this.user.username);
    const updateQualification = {
      _id: this.editQualificationId,
      qualificationName: this.editQualificationName,
      year: this.editYear,
      schoolCollegeName: this.editSchoolCollegeName,
      university: this.editUniversity,
      userName: this.user.username,
      dateCreated: null,
      dateModified: new Date()
    }
    console.log(updateQualification);
    //Required fields
    if (!this.validateService.validateQualification(updateQualification)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //Validate numeric fields
    if (!this.validateService.validateNumeric(updateQualification.year)) {
      this.flashMessage.show('Year should be numeric', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } 
    //Update qualification
    this.authService.updateQualification(updateQualification).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.editPopup.hide();
        this.loadData();
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  removeQualification() {
    console.log('Remove clicked');
    this.user = JSON.parse(localStorage.getItem('user'));
    //const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    console.log(this.user.username);
    const removeQualification = {
      _id: this.editQualificationId,
      userName: this.user.username
    }
    //Remove qualification
    this.authService.removeQualification(removeQualification).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.removePopup.hide();
        this.loadData();
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  onRowclicked(qualificationObj: any) {
    console.log(qualificationObj);
    console.log(this.editQualificationId);
    this.editQualificationId = qualificationObj._id;
    this.editQualificationName = qualificationObj.qualificationName;
    this.editYear = qualificationObj.year;
    this.editSchoolCollegeName = qualificationObj.schoolCollegeName;
    this.editUniversity = qualificationObj.university;
  }

  loadData() {
    this.authService.getAllQualification().subscribe(data => {
      if (data.success) {
        if (Object.keys(data.qualification).length > 0)
          this.qualification = data.qualification;
        else
          this.qualification = null;
        console.log()
      }
    });
  }
  clearData() {
    this.qualificationName = null;
    this.year = null;
    this.schoolCollegeName = null;
    this.university = null;
  }

  qualPanelCollapse() {
    console.log('collpase clicked');
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.qualPanelCollapseEl.nativeElement.className = 'glyphicon glyphicon-collapse-down pull-right';
    } else {
      this.isCollapsed = true;
      this.qualPanelCollapseEl.nativeElement.className = 'glyphicon glyphicon-collapse-up pull-right';
    }
  }
}

