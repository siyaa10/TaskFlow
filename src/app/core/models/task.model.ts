
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'Open' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}
