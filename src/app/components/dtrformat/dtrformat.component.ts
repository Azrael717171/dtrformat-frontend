import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';

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
  generatedReports: any[] = [];

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.reportForm = this.fb.group({
      selectAll: [false],
      selectedNames: this.fb.array([]),
      startDate: [''],
      endDate: ['']
    });
  }

  get selectedNames(): FormArray {
    return this.reportForm.get('selectedNames') as FormArray;
  }

  onSelectAll(event: any): void {
    const checked = event.target.checked;
    this.selectedNames.clear();
    if (checked) {
      this.names.forEach(name => this.selectedNames.push(this.fb.control(name.id)));
    }
  }

  onIndividualChange(event: any, nameId: number): void {
    const checked = event.target.checked;
    if (checked) {
      this.selectedNames.push(this.fb.control(nameId));
    } else {
      const index = this.selectedNames.controls.findIndex(x => x.value === nameId);
      this.selectedNames.removeAt(index);
    }

    const selectAllCheckbox = this.reportForm.get('selectAll');
    selectAllCheckbox?.setValue(this.selectedNames.length === this.names.length, { emitEvent: false });
  }

  generateReport(): void {
    const reportData = {
      selectedNames: this.selectedNames.value,
      startDate: this.reportForm.get('startDate')?.value,
      endDate: this.reportForm.get('endDate')?.value
    };

    this.reportService.generateReport(reportData).subscribe(response => {
      console.log('Report generated:', response);
      this.generatedReports.push(response.report);
    });
  }
} 