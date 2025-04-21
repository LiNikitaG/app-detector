import { Injectable } from "@angular/core";
import { TypeExternalGetHtml } from "../enums/type-external-get-html";
import { ExternalSiteHeader, ExternalSiteResult } from "../models/external-site-result.model";

@Injectable({
    providedIn: 'root',
})
export class ExternalWebsiteDetectorService {
    private getAllOrigins(url: string) {
        return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then(response => {
                if (response.ok && response.status == 200) return response.json()
                throw new Error('Network response was not ok.')
            })
            .catch(error => console.log(error));
    }

    private getCorsAnywhere(url: string) {
        return fetch(`https://cors-anywhere.herokuapp.com/${url}`)
            .then(function (response) {
                if (response.ok && response.status == 200) return response.text()
                throw new Error('Network response was not ok.')
            })
            .catch(error => console.log(error));
    }

    private getApi(type: TypeExternalGetHtml | string) {
        switch (type) {
            case TypeExternalGetHtml[TypeExternalGetHtml.AllOrigins]:
            case TypeExternalGetHtml.AllOrigins: {
                return this.getAllOrigins;
            }
            case TypeExternalGetHtml[TypeExternalGetHtml.CorsAnywhere]:
            case TypeExternalGetHtml.CorsAnywhere: {
                return this.getCorsAnywhere;
            }
            default: {
                return this.getAllOrigins;
            }
        }
    }

    public getExternalHtml(url: any, type: TypeExternalGetHtml | string): Promise<ExternalSiteResult> {
        return this.getApi(type)(url)
            .then((html) => {
                let result = { Url: url } as ExternalSiteResult;
                if (!html) {
                    result.Error = "Ошибка";
                    return result;
                }
                result.Header = [];

                const content = type == TypeExternalGetHtml.AllOrigins || type == TypeExternalGetHtml[TypeExternalGetHtml.AllOrigins] ? html?.contents : html;
                const doc = new DOMParser().parseFromString(content, "text/html");

                const title = doc.querySelectorAll('title')[0];
                if (title && title?.innerText)
                    result.Header.push({ Tag: "title", Attributes: [{ Value: title?.innerText }] });
                
                const metaList = doc.querySelectorAll('meta');
                if (metaList.length > 0) {
                    let headerMeta = { Tag: "meta", Attributes: [] } as ExternalSiteHeader;
                    metaList.forEach(meta => {
                        if (meta.getAttribute('name') || meta.getAttribute('content'))
                            headerMeta.Attributes?.push({ Name: meta.getAttribute('name'), Value: meta.getAttribute('content') });
                    });
                    result.Header.push(headerMeta);
                }

                if (result.Header.length == 0) {
                    result.Header = undefined;
                    result.Error = "Ошибка";
                }
                
                return result;
            });
    }
}