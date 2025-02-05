export interface Report {
  _id?: string;               // MongoDB auto-generated ID
  selectedName: number;       // For single name per report
  startDate: Date;
  endDate: Date;
  createdAt?: Date;           // Auto-generated timestamp
}
