import { Routes } from '@angular/router';
import { RequisitionComponent } from './requisition/requisition.component';
import { NewRequisitionComponent } from './new-requisition/new-requisition.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'requisition',
        pathMatch: 'full'
    },
    {
        path: '',
       component: AppComponent
    },
    {
        path: 'requisition',
       component: RequisitionComponent
    },
    {
        path: 'new-requisition',
        component: NewRequisitionComponent
    }
];
