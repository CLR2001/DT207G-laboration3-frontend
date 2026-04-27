export interface Employment {
  id?: number;
  company_name: string;
  job_title: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description?: string;
}