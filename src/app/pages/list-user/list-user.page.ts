import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {
  customers: User[];

  representatives: any[];

  statuses: any[];

  items: MenuItem[];

  totalRecords: number;

  constructor(private userService: UserService) { }
  ngOnInit(): void {
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
