
import { Routes, CanDeactivateFn } from '@angular/router';
import { TasksPage } from './features/tasks/tasks-page/tasks-page';
import { EditTaskComponent } from './features/edit-task/edit-task';
import { SettingsComponent } from './features/settings/settings';

export const unsavedChangesGuard: CanDeactivateFn<EditTaskComponent> =
  component => component.canLeave();

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksPage
  },
  {
    path: 'tasks/:id/edit',
    component: EditTaskComponent,
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
