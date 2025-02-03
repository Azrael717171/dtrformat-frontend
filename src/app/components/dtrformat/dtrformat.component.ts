import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dtrformat',
  templateUrl: './dtrformat.component.html',
  styleUrls: ['./dtrformat.component.css']
})
export class DtrformatComponent {
  reportForm: FormGroup;
  names = [
    { id: 1, name: 'Name 1' },
    { id: 2, name: 'Name 2' },
    { id: 3, name: 'Name 3' }
  ];

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      selectAll: [false],
      selectedNames: this.fb.array([])
    });
  }

  // Getter for FormArray
  get selectedNames(): FormArray {
    return this.reportForm.get('selectedNames') as FormArray;
  }

  // Handle Select All
  onSelectAll(event: any): void {
    const checked = event.target.checked;
    this.selectedNames.clear(); // Clear all selections first
    if (checked) {
      this.names.forEach(name => this.selectedNames.push(this.fb.control(name.id)));
    }
  }

  // Handle individual selection
  onIndividualChange(event: any, nameId: number): void {
    const checked = event.target.checked;
    if (checked) {
      this.selectedNames.push(this.fb.control(nameId));
    } else {
      const index = this.selectedNames.controls.findIndex(x => x.value === nameId);
      this.selectedNames.removeAt(index);
    }

    // Sync "Select All" checkbox
    const selectAllCheckbox = this.reportForm.get('selectAll');
    selectAllCheckbox?.setValue(this.selectedNames.length === this.names.length, { emitEvent: false });
  }

  // Handle form submission
  generateReport(): void {
    console.log('Selected Names:', this.selectedNames.value);
  }
}
