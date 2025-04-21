import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class FileService {
    constructor(protected httpClient: HttpClient){ }

    getFileTxtByUrl(url:string): Observable<string>{
        return this.httpClient.get(url, { responseType: 'text' });
    }
}