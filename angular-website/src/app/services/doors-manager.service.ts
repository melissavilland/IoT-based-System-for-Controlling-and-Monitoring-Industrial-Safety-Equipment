import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DoorsManagerService {
  doors_list= [
    {id: 1, name: 'Door 1', state: ''},
    {id: 2, name: 'Door 2', state: ''},
    {id: 3, name: 'Door 3', state: ''}
  ];

  constructor() {
  }


}
