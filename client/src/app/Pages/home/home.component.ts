import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  submitted = false;
  result:boolean = false;
  loading:boolean = false;
  results:any;

  myForm = new FormGroup({
    repository: new FormControl("", [Validators.max(10), Validators.min(1),Validators.required]),
    organization: new FormControl('',[Validators.required]),
    issues: new FormControl("", [Validators.max(10), Validators.min(1)]),

  })

  constructor(private Service: RepoService) { }

  ngOnInit(): void {


  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  submit(){
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }

   this.loading = true;
    this.Service.getRepos(this.myForm.value).subscribe(res=>{
      this.results = res;
      this.loading = false;
      this.result = true;
    })
  }
}
