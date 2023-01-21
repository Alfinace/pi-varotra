import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailUserInfoComponent } from 'src/app/shared/components/modals/detail-user-info/detail-user-info.component';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
  providers: [DialogService]
})
export class ListUserPage implements OnInit {
  customers: User[];

  representatives: any[];

  statuses: any[];

  items: MenuItem[];

  totalRecords: number;

  constructor(private userService: UserService,
    public dialogService: DialogService,) { }
  ref: DynamicDialogRef;
  ngOnInit(): void {
  }

  show(customer: User) {
    this.ref = this.dialogService.open(DetailUserInfoComponent, {
      // header: 'Information de ' + customer.username,
      data: {
        customer: customer
      },
      width: '90%',
      height: '100%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      modal: true,
      // showHeader: false,
      draggable: true,
      transitionOptions: '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
    });

    // this.ref.onClose.subscribe((product: Product) =>{
    //     if (product) {
    //         this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
    //     }
    // });
  }

  ionViewWillEnter() {
    this.userService.getAllUsers(0, 10).toPromise().then((res: any) => {
      console.log(res);
      this.customers = res.rows;
      this.totalRecords = res.count;
    });
    this.items = [{
      label: 'Options',
      items: [{
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        }
      }
      ]
    },
    {
      label: 'Navigate',
      items: [{
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload'
      }
      ]
    }
    ];
  }

  paginate(event: any) {
    console.log(event);

    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }

  update() {
    // this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }

  delete() {
    // this.messageService.add({severity:'warn', summary:'Delete', detail:'Data Deleted'});
  }
}
