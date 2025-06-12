import { Routes } from '@angular/router';
import { RequisitionComponent } from './requisition/requisition.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
       component: AppComponent
    },
    {
        path: 'requisition',
       component: RequisitionComponent
    }
];
