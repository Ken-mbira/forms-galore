import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-requisition',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './new-requisition.component.html',
  styleUrl: './new-requisition.component.css'
})
export class NewRequisitionComponent {
  requisitionForm?: FormGroup;

  listOfCategories = ['Stationary', 'Transportation', 'IT', 'Wellness'];

  listOfDepartments = ['Finance', 'Logistics', 'IT', 'Marketing'];
  newDepartmentName = "";

  constructor (private fb: FormBuilder) {
    this.requisitionForm = this.fb.group({
      name: ['', Validators.required],
      department: [[], [Validators.required, invalidOptions(this.listOfCategories)]],
      items: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          category: ['', Validators.required],
          description: ['', Validators.required],
          quantity: ['', Validators.required],
          price: ['', Validators.required],
        })
      ])
    });

  }

  get requisitionItems() {
    return this.requisitionForm?.get('items') ? this.requisitionForm.get('items') as FormArray : undefined;
  }

  newDepartment() {
    if (!this.requisitionForm) return;

    const departmentText = this.newDepartmentName;

    if (!departmentText) return;

    const currentDepartments = this.requisitionForm!!.get('department')!!.value;

    currentDepartments.push(departmentText);

    this.requisitionForm!!.patchValue({'department': currentDepartments});

    this.newDepartmentName = "";
  }

  removeDepartment(departmentIndex: number) {
    if (!this.requisitionForm) return;

    let currentDepartments = this.requisitionForm!!.get('department')!!.value;

    if(!currentDepartments) return;

    currentDepartments.splice(departmentIndex, 1);

    this.requisitionForm!!.patchValue({'department': currentDepartments});
  }

  newRequisitionItem() {
    if (!this.requisitionForm) return;

    const newItem = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    })

    this.requisitionItems?.push(newItem);
  }

  removeRequisitionItem(itemIndex: number) {
    if (!this.requisitionForm) return;

    this.requisitionItems?.removeAt(itemIndex);
  }

  setCategoryField(category: string, itemIndex: number){
    if (!this.requisitionForm) return;

    this.requisitionItems?.at(itemIndex).get('category');
  }
}

export function invalidOptions(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentOptions = control.value as string[];
    let invalidOptions: number[] = [];
    currentOptions.forEach((option, i) => {
      if(!validOptions.includes(option)) {
        invalidOptions.push(i);
      }
    })

    return invalidOptions.length ? {invalidOptions: invalidOptions} : null;
  }
}
