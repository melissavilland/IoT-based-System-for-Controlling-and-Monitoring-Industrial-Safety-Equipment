import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMqttClient, IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { DoorsManagerService } from '../services/doors-manager.service';

@Component({
  selector: 'app-lock-monitor',
  templateUrl: './lock-monitor.component.html',
  styleUrls: ['./lock-monitor.component.css']
})
export class LockMonitorComponent implements OnInit, OnDestroy {
  @ViewChild('f') topicForm: NgForm;
  @ViewChild('msglog', {static: true}) msglog: ElementRef;
  @ViewChild('doorstatus', {static: true}) doorstatus: ElementRef;

  private subscription: Subscription;
  private client: IMqttClient;
  private message: IMqttMessage;
  msg: any;
  isConnected: boolean = false;
  submitted = false;
  doors = this.doorsManagerService.doors_list;
  subscribed = false;
  doorStates : string [] = [];
  newTopicname: string;
  topicname: string;
  topics: string[] = [];
  id: number;
  messages: string[] = [];

  constructor(private _mqttService: MqttService, private doorsManagerService: DoorsManagerService) {
  }

  ngOnInit(): void {
    for (let door of this.doors) {
      this.topicname = 'home/door' + door.id;
      this.topics.push(this.topicname);
    }
    console.log(this.doorStates);
    for(let topic of this.topics){
      let index = this.topics.indexOf(topic);
      this.subscribeNewTopic(topic, index);
    }

    console.log("doors: ", this.doors);
  }

  ngOnDestroy(): void {
    console.log("Este abonat: ", this.subscription);
    if (this.subscription) {

      this.subscription.unsubscribe();
    }
    // this.isConnected = false;
    // this.topicname = '';
    // this.topics = [];
    // this.doorStates = [];
    // this.messages = [];

  }

  logMsg(message): void {
    this.msglog.nativeElement.innerHTML = '<br><hr>' + message;
  }

  subscribeNewTopic(topic, index) {
    // for (let topic of this.topics){
    //   console.log("topic: ", topic);
      this.subscription = this._mqttService.observe(topic).subscribe(
        (message: IMqttMessage) => {
          console.log('Been here');
          this.msg = message.payload.toString();
          console.log('Message: ' + this.msg + ' for topic: ' + this.msg.topic);
          if(this.msg == 'close') {
            this.msg = this.msg + 'd';
          }
          this.doors[index].state = this.msg;
          this.doorStates.push(this.msg.payload.toString());
          console.log(this.doorStates, this.msg.topic);
        });
        // this._mqttService.observe(this.topics[1]).subscribe(
        //   (message: IMqttMessage) => {
        //     console.log('Been here');
        //     this.msg = message;
        //     console.log('Message: ' + this.msg.payload.toString() + ' for topic: ' + this.msg.topic);
        //     this.doorStates.push(this.msg.payload.toString());
        //     console.log(this.doorStates, this.msg.topic);
        //   });
    //}
  }

}
