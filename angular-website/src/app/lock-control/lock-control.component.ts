import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DoorsManagerService } from '../services/doors-manager.service';

@Component({
  selector: 'app-lock-control',
  templateUrl: './lock-control.component.html',
  styleUrls: ['./lock-control.component.css']
})
export class LockControlComponent implements OnInit {
  @ViewChild('f') topicForm: NgForm;
  @ViewChild('msglog', {static: true}) msglog: ElementRef;
  @ViewChild('doorstatus', {static: true}) doorstatus: ElementRef;

  topicname: any = '';
  msg: any;
  doors = this.doorsManagerService.doors_list;
  submitted = false;
  role = this.authService.role;


  constructor(private _mqttService: MqttService, private doorsManagerService: DoorsManagerService, private authService: AuthService) {}
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


  onSendMessage() {
    this.topicname = 'home/door' + this.topicForm.value.topic;
    this.msg = this.topicForm.value.message;
    this._mqttService.unsafePublish(this.topicname, this.msg, {qos: 1, retain: true});
    this.msg = '';
    this.submitted = true;
    }


  }




