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
  newCategoryName = "";

  listOfDepartments = ['Finance', 'Logistics', 'IT', 'Marketing'];
  newDepartmentName = "";

  constructor (private fb: FormBuilder) {
    this.requisitionForm = this.fb.group({
      name: ['', Validators.required],
      category: [[], [Validators.required, invalidOptions(this.listOfCategories)]], // we should remove category
      department: [[], [Validators.required, invalidOptions(this.listOfCategories)]],
      items: new FormArray([
        this.fb.group({
          name: ['', Validators.required],
          category: ['', Validators.required],
        })
      ])
    });
  }

  newCategory() {
    if (!this.requisitionForm) return;

    const categoryText = this.newCategoryName;

    if (!categoryText) return;

    const currentCategories = this.requisitionForm!!.get('category')!!.value;

    currentCategories.push(categoryText);

    this.requisitionForm!!.patchValue({'category': currentCategories});

    this.newCategoryName = "";
  }

  removeCategory(categoryIndex: number) {
    if (!this.requisitionForm) return;

    let currentCategories = this.requisitionForm!!.get('category')!!.value;

    if(!currentCategories) return;

    currentCategories.splice(categoryIndex, 1);

    this.requisitionForm!!.patchValue({'category': currentCategories});
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