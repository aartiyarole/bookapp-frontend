import { Component ,OnInit} from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-errorpg',
  templateUrl: './errorpg.component.html',
  styleUrl: './errorpg.component.scss'
})
export class ErrorpgComponent implements OnInit{
    constructor(public nav:NavbarService){}
    ngOnInit(): void {
      this.nav.hide()
    }
}
