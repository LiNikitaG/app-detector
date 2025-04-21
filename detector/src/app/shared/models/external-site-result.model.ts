export class ExternalSiteResult {
    Url?: string;
    Error?: string;
    Header?: ExternalSiteHeader[];
}
export class ExternalSiteHeader{
    Tag?: string
    Attributes?: ExternalSiteAttributes[];
}
export class ExternalSiteAttributes {
    Name?: string | null;
    Value?: string | null;
}