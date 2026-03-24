import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './components/package-component/package-component';
import { Package2 } from './components/package2/package2';
import { Package3 } from './components/package3/package3';
import { Package4 } from './components/package4/package4';

const routes: Routes = [{
    path: 'package',
    component: PackageComponent   // default route
  },{
    path: 'package2',
    component: Package2   // default route
  },
{
    path: 'package3',
    component: Package3   // default route
  },{
    path: 'package4',
    component: Package4  // default route
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
