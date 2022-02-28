import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable <Course[]>;
  displayedColumns = ['name', 'categorya'];
  //CoursesService: CoursesService;

  constructor(
    private CoursesService: CoursesService,
    private dialog:MatDialog
    ) {
   // this.courses = [];
   //this.CoursesService = new CoursesService();
   this.courses$ = this.CoursesService.list()
   .pipe(
    catchError(error => {
      this.onError('Erro ao carregar cursos.')
      return of([])
    } )
   );

   //this.CoursesService.list().subscribe(courses => this.courses = courses)
   }

   onError(errorMsg: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
     data: errorMsg
    });
  }


  ngOnInit(): void {
  }

}
