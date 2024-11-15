import { getScriptLoader, getStylesheetLoader } from '@bigcommerce/script-loader';

import { getDefaultTranslations, isLanguageWindow } from '@bigcommerce/checkout/locale';

import { isAppExport } from './AppExport';
import { RenderCheckoutOptions } from './checkout';
import { configurePublicPath } from './common/bundler';
import { isRecordContainingKey, joinPaths } from './common/utility';
import { RenderOrderConfirmationOptions } from './order';

declare const LIBRARY_NAME: string;
declare const MANIFEST_JSON: AssetManifest;

export interface AssetManifest {
  appVersion: string;
  css: string[];
  dynamicChunks: { [key: string]: string[] };
  js: string[];
}

export interface LoadFilesOptions {
  publicPath?: string;
}

export interface LoadFilesResult {
  appVersion: string;
  renderCheckout(options: RenderCheckoutOptions): void;
  renderOrderConfirmation(options: RenderOrderConfirmationOptions): void;
}

export function loadFiles(options?: LoadFilesOptions): Promise<LoadFilesResult> {
  // Preconnect to critical domains
  const openSansLink = document.createElement('link');

  openSansLink.rel = 'preconnect';
  openSansLink.href = 'https://fonts.googleapis.com';
  document.head.appendChild(openSansLink);

  const openSansLink2 = document.createElement('link');

  openSansLink2.rel = 'preconnect';
  openSansLink2.href = 'https://fonts.gstatic.com';
  openSansLink2.crossOrigin = 'anonymous';
  document.head.appendChild(openSansLink2);

  const bigcommerceLink = document.createElement('link');

  bigcommerceLink.rel = 'preconnect';
  bigcommerceLink.href = 'https://store-qxtizk9ym4.mybigcommerce.com';
  bigcommerceLink.crossOrigin = 'anonymous';
  document.head.appendChild(bigcommerceLink);

  // Preload critical assets
  const imageLink = document.createElement('link');

  imageLink.rel = 'preload';
  imageLink.as = 'image';
  imageLink.href = 'https://store-qxtizk9ym4.mybigcommerce.com/content/images/logo.webp';
  document.head.appendChild(imageLink);

  // Prefetch fonts that will be needed soon
  const fontLink = document.createElement('link');

  fontLink.rel = 'prefetch';
  fontLink.as = 'font';
  fontLink.href = 'https://store-qxtizk9ym4.mybigcommerce.com/content/fonts/AvenirRegular.ttf';
  fontLink.type = 'font/ttf';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Load stylesheets with priority
  const openSansFont = document.createElement('link');

  openSansFont.rel = 'stylesheet';
  openSansFont.href =
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap';
  document.head.appendChild(openSansFont);

  const publicPath = configurePublicPath(options && options.publicPath);
  const {
    appVersion,
    css = [],
    dynamicChunks: { css: cssDynamicChunks = [], js: jsDynamicChunks = [] },
    js = [],
  } = MANIFEST_JSON;

  const scripts = getScriptLoader().loadScripts(js.map((path) => joinPaths(publicPath, path)));

  const stylesheets = getStylesheetLoader().loadStylesheets(
    css.map((path) => joinPaths(publicPath, path)),
    { prepend: true },
  );

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Page was restored from bfcache
      window.location.reload();
    }
  });

  getScriptLoader().preloadScripts(
    jsDynamicChunks.map((path) => joinPaths(publicPath, path)),
    { prefetch: true },
  );

  getStylesheetLoader().preloadStylesheets(
    cssDynamicChunks.map((path) => joinPaths(publicPath, path)),
    { prefetch: true },
  );

  const languageConfig = isLanguageWindow(window)
    ? window.language
    : { locale: 'en', locales: {}, translations: {} };

  return Promise.all([getDefaultTranslations(languageConfig.locale), scripts, stylesheets]).then(
    ([defaultTranslations]) => {
      if (!isRecordContainingKey(window, LIBRARY_NAME)) {
        throw new Error(`'${LIBRARY_NAME}' property is not available in window.`);
      }

      const appExport = window[LIBRARY_NAME];

      if (!isAppExport(appExport)) {
        throw new Error('The functions required to bootstrap the application are not available.');
      }

      const { renderCheckout, renderOrderConfirmation, initializeLanguageService } = appExport;

      initializeLanguageService({
        ...languageConfig,
        defaultTranslations,
      });

      return {
        appVersion,
        renderCheckout: (renderOptions) => renderCheckout({ publicPath, ...renderOptions }),
        renderOrderConfirmation: (renderOptions) =>
          renderOrderConfirmation({ publicPath, ...renderOptions }),
      };
    },
  );
}
