import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-requisition',
  imports: [],
  templateUrl: './new-requisition.component.html',
  styleUrl: './new-requisition.component.css'
})
export class NewRequisitionComponent {
  requisitionForm?: FormGroup;

  constructor (private fb: FormBuilder) {
    this.requisitionForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

}
