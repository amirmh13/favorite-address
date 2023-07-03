import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bare',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bare.component.html',
  styleUrls: ['./bare.component.scss']
})
export class BareComponent {

}
