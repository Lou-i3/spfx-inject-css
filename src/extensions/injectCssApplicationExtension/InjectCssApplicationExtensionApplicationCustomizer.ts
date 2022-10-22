import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'InjectCssApplicationExtensionApplicationCustomizerStrings';
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ISPHttpClientConfiguration } from '@microsoft/sp-http';

const LOG_SOURCE: string = 'InjectCssApplicationExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IInjectCssApplicationExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  cssurl: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class InjectCssApplicationExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IInjectCssApplicationExtensionApplicationCustomizerProperties> {

    public async onInit(): Promise<void> {
      // Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
  
      const currentSiteUrl: string = this.context.pageContext.web.absoluteUrl;
      const cssUrlProp: string = this.properties.cssurl;
  
      // console.log(`Property for CSS is ${appSettings.cssUrl}`);
      // console.log(`Property for Site URL is ${appSettings.siteUrl}`);
  
      var listName = "ConfigMapping";
      var configKey = "CustomCssFileUrl";
  
      var cssUrl;
      if (cssUrlProp) {
        cssUrl = cssUrlProp;
      } 
  
      // await this.context.spHttpClient
      //   .get(`${appSettings.siteUrl}/_api/lists/GetByTitle('${listName}')/items?$filter=Title eq '${configKey}'&$top=1&$select=Value`, SPHttpClient.configurations.v1)
      //   .then((res: SPHttpClientResponse): Promise<any> => {
      //     return res.json();
      //   })
      //   .then((web: any): void => {
      //     // console.log(web);
      //     console.log("Found value for key customCssFileUrl: ",web.value[0].Value);
      //     cssUrl = web.value[0].Value;
      //   });
  
      if (!cssUrl) {
        console.log("No CSS URL found in ConfigMapping list, using default");
        cssUrl = currentSiteUrl + "/SiteAssets/css/custom.css";
      }
  
      if (cssUrl) {
        // inject the style sheet
        const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
        let customStyle: HTMLLinkElement = document.createElement("link");
        customStyle.href = cssUrl;
        console.log("CSS Url:" + customStyle.href);
        customStyle.rel = "stylesheet";
        customStyle.type = "text/css";
        head.insertAdjacentElement("beforeEnd", customStyle);
      }
  
      return Promise.resolve();
  
  
    }
}
