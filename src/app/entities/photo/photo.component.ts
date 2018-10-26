import { Component, OnInit } from "@angular/core";
import { Photo } from "src/app/models/photo";
import { Observable } from "rxjs/internal/Observable";
import { DBStandardService } from "src/app/services/db-standard.service";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.css"]
})
export class PhotoComponent implements OnInit {

  public photos$: Observable<Photo[]> = undefined;
  public allPhotos: Photo[] = [];
  public photos: Photo[] = [];
  public totalRecords: number;
  public firstTime: boolean = true;

  constructor(private dbStandardService: DBStandardService) { }
  cols: any[];

  ngOnInit() {
    this.cols = [
      { field: "title", header: "Title" }
    ];
    this.dbStandardService.getJSONRows<Photo[]>("photos")
      .subscribe(photos => {
        console.log(photos);
        this.allPhotos = photos;
        this.totalRecords = photos.length;
      });
  }

  onLazyLoad(event: LazyLoadEvent) {
    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // imitate db connection over a network
    setTimeout(() => {
      if (this.allPhotos) {
        this.photos = this.allPhotos.slice(event.first, (event.first + event.rows));
      }
    }, this.firstTime ? 1000 : 1);
    this.firstTime = false;
  }


}
