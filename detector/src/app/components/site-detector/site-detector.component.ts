import { Component } from '@angular/core';
import { FileService } from '../../shared/services/file.service';
import { isUrlValidator } from '../../shared/validators/url.validator';
import { ExternalWebsiteDetectorService } from '../../shared/services/external-website-detector.service';
import { TypeExternalGetHtml } from '../../shared/enums/type-external-get-html';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'site-detector',
    templateUrl: './site-detector.component.html',
    styleUrl: './site-detector.component.scss'
})
export class SiteDetectorComponent {
    public baseUrl: string = window.location.href;
    public downloadJsonHref?: SafeUrl;
    public detectorForm: FormGroup;
    public nameExportFile?: string;
    public typeExternalGetHtmlArray = Object.values(TypeExternalGetHtml).filter(x => typeof x === 'string');

    constructor(
        private _formBuilder: FormBuilder,
        private _fileService: FileService,
        private _externalWebsiteDetectorService: ExternalWebsiteDetectorService,
        private _sanitizer: DomSanitizer,
        private _ngxService: NgxUiLoaderService) {
        this.detectorForm = this._formBuilder.group({
            fileUrl: ['', [Validators.required, isUrlValidator()]],
            typeApi: [this.typeExternalGetHtmlArray[0]]
        });
    }

    public onRun() {
        this._ngxService.start();
        this._fileService.getFileTxtByUrl(this.fileUrl.value).subscribe((result: string) => {
            let resultUrls = result.split("\r\n");
            Promise.all(
                resultUrls.map((url) => this._externalWebsiteDetectorService.getExternalHtml(url, this.typeApi.value))
            ).then((data) => {
                this.generateDownloadJsonUri(data);
            });
        })
    }

    get fileUrl() {
        return this.detectorForm.get('fileUrl')!;
    }

    get typeApi() {
        return this.detectorForm.get('typeApi')!;
    }

    generateDownloadJsonUri(data: any) {
        var theJSON = JSON.stringify(data);
        var uri = this._sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        this.downloadJsonHref = uri;
        this.nameExportFile = `export-${this.typeApi.value.toLowerCase()}-${new Date().toISOString()}.json`;
        this._ngxService.stop();
    }
}
