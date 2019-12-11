import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ayuda-login',
  templateUrl: './ayuda-login.component.html',
  styleUrls: ['./ayuda-login.component.css']
})
export class AyudaLoginComponent implements OnInit {

  @Input() title;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
