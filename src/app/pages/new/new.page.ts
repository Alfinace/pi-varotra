import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/new.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  public news: New[] = [
    {
      id: 1,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },
    {
      id: 1,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },
    {
      id: 1,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },
    {
      id: 1,
      title: 'Pi network still enclosed Mainnet',
      detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, facere! Repudiandae, aliquid. Quae est officiis q...',
      createdAt: '10/11/2022',
      updatedAt: '10/11/2022',
      image: '/assets/images/img1.png'
    },

  ]
  constructor() { }

  ngOnInit() {
  }

}
