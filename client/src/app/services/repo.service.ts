import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  URL: string = environment.url
  constructor(private http: HttpClient) { }

  getRepos(params:{organization:string, issues:number, repository:number}){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("per_page",params.repository);
    queryParams = queryParams.append("issues_per_page",params.issues);
    return this.http.get(this.URL + `${params.organization}`,{params:queryParams})
  }

}
