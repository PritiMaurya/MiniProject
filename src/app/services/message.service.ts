import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

type MessageCallback = () => void;

@Injectable()
export class MessageService {

  constructor() { }
  private handler = new Subject<any>();

  broadcast(type: any, login: any) {
    console.log('broadcast');
    console.log(login, type);
    this.handler.next({ type, login });
  }

  subscribe(data: string, callback: MessageCallback): Subscription {
    return this.handler
      .subscribe(callback);
  }

}
