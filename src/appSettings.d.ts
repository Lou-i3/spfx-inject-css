declare interface IAppSettings {
    siteUrl: string;
    cssUrl: string;
}

declare module 'appSettings' {
    const appSettings: IAppSettings;
    export = appSettings;
}