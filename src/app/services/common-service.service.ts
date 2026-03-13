import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private feedbackMsg = new BehaviorSubject<string>('');
   private feedbackType = new BehaviorSubject<boolean>(true);
  feedbackResponseMsg = this.feedbackMsg.asObservable();
  feedbackResponseType = this.feedbackType.asObservable()
  constructor() {}

  setRequestFeedbackMsg(msg: string) {
    this.feedbackMsg.next(msg);
  }

  setRequestFeebackType(type:boolean){
    this.feedbackType.next(type)
  }
}
