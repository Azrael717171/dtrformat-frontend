import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model'; // Importing the Report interface

@Component({
  selector: 'app-dtrformat',
  templateUrl: './dtrformat.component.html',
  styleUrls: ['./dtrformat.component.css']
})
export class DtrformatComponent {
confirmDelete(arg0: string) {
throw new Error('Method not implemented.');
}
closeReportModal() {
throw new Error('Method not implemented.');
}
  reportForm: FormGroup;
  names = [
    { id: 1, name: 'Name 1' },
    { id: 2, name: 'Name 2' },
    { id: 3, name: 'Name 3' }
  ];
  generatedReports: Report[] = []; // Updated to use Report type
  selectedReport: Report | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.reportForm = this.fb.group({
      selectAll: [false],
      selectedNames: this.fb.array([]),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReports();
  }

  getNameById(id: number): string {
    const found = this.names.find(name => name.id === id);
    return found ? found.name : 'Unknown';
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
    if (this.reportForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const reportData = {
      selectedNames: this.selectedNames.value,
      startDate: this.reportForm.get('startDate')?.value,
      endDate: this.reportForm.get('endDate')?.value
    };

    this.reportService.generateReport(reportData).subscribe(
      response => {
        console.log('Report generated:', response);
        this.generatedReports.push(response.report);
        this.errorMessage = null; // Clear any previous error message
      },
      error => {
        this.errorMessage = 'Error generating report. Please try again.';
        console.error('Error generating report:', error);
      }
    );
  }

  loadReports(): void {
    this.reportService.getReports().subscribe(
      reports => {
        this.generatedReports = reports;
        this.errorMessage = null; // Clear any previous error message
      },
      error => {
        this.errorMessage = 'Error loading reports. Please try again.';
        console.error('Error loading reports:', error);
      }
    );
  }

  viewReport(report: Report): void {
    this.selectedReport = report;
  }

  deleteReport(reportId: string): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(reportId).subscribe(
        () => {
          this.generatedReports = this.generatedReports.filter(report => report._id !== reportId);
          console.log('Report deleted successfully');
        },
        error => {
          this.errorMessage = 'Error deleting report. Please try again.';
          console.error('Error deleting report:', error);
        }
      );
    }
  }
}
