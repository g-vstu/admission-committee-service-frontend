import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from './additional.service';
import {Additional} from './additional';

@Component({
  selector: 'additional',
  templateUrl: './additional.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: solid red 2px;
    }

    input.ng-touched.ng-valid {
      border: solid green 2px;
    }
  `],
  providers: [HttpService]
})

export class AdditionalComponent implements OnInit {

  token = JSON.parse(localStorage.getItem('token'));
  additional: Additional = new Additional();
  additionalEdited: Additional;
  additionalObject: Additional[] = [];
  receivedAdditional: Additional;
  done = false;

  constructor(private httpService: HttpService) {
  }

  submit(additional: Additional) {
    this.httpService.postData(additional)
      .subscribe(
        (data: Additional) => {
          this.receivedAdditional = data;
          this.done = true;
        },
        error => console.log(error)
      );
  }

  /* TODO Запрашивать данные каждый раз при посте, либо пушить в бд и одновременно при удачном пуше пушить в какой-то массив*/

  ngOnInit() {

    this.httpService.getAbitur().subscribe(data => {
      this.additionalObject = data['additionalInfo'];
      localStorage.setItem('additional', JSON.stringify(this.additionalObject));
    });

    this.httpService.getAbitur().subscribe(data => this.httpService.userid = data['id']);

    this.additionalEdited = JSON.parse(localStorage.getItem('additional'));
    if (this.additionalEdited == null) {
      console.log('set inputs');
    } else {
      this.additional.fatherFIO = this.additionalEdited['fatherFIO'];
      this.additional.fatherWork = this.additionalEdited['fatherWork'];
      this.additional.fatherPhone = this.additionalEdited['fatherPhone'];
      this.additional.motherFIO = this.additionalEdited['motherFIO'];
      this.additional.motherWork = this.additionalEdited['motherWork'];
      this.additional.motherPhone = this.additionalEdited['motherPhone'];
      this.additional.childCount = this.additionalEdited['childCount'];
      this.additional.workPlace = this.additionalEdited['workPlace'];
      this.additional.experience = this.additionalEdited['experience'];
      this.additional.reAdmission = this.additionalEdited['reAdmission'];
      this.additional.note = this.additionalEdited['note'];
    }

  }

}
