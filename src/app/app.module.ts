import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Theme } from '@ux-aspects-core/theming';
import { UxaThemeModule } from '@ux-aspects-angular/theming';
import { UxaDateTimeAdapter } from '@ux-aspects-core/date-time';
import { UxaMomentDateTimeAdapter } from '@ux-aspects-core/date-time-moment';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { UxaSelectModule } from "@ux-aspects-angular/select";
import { TrimAppLayoutComponent } from './trim-app-layout/trim-app-layout.component';
import { UxaAppLayoutModule } from "@ux-aspects-angular/app-layout";
import { UxaMastheadModule } from "@ux-aspects-angular/masthead";
import { UxaToolbarModule } from "@ux-aspects-angular/toolbar";
import { UxaIconModule, search, addressBook } from '@ux-aspects-angular/icon';
import { UxaInputGroupModule } from "@ux-aspects-angular/input-group";
import { UxaButtonModule } from "@ux-aspects-angular/button";
import { SearchComponent } from './Component/search/search.component';
import { HeaderComponent } from './Component/header/header.component';
import { SecondaryHeaderComponent } from './Component/secondary-header/secondary-header.component';
import { SideNavComponent } from './Component/side-nav/side-nav.component';
import { MainContentComponent } from './Component/main-content/main-content.component';
import { RightSideNavComponent } from './Component/right-side-nav/right-side-nav.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
    declarations: [
        AppComponent,
        ThemeSelectorComponent,
        TrimAppLayoutComponent,
        SearchComponent,
        HeaderComponent,
        SecondaryHeaderComponent,
        SideNavComponent,
        MainContentComponent,
        RightSideNavComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        UxaThemeModule.forRoot(Theme.MicroFocus, {
            [Theme.MicroFocus]: () => import("@ux-aspects-themes/micro-focus").then(m => m.default),
            [Theme.MicroFocusDark]: () => import("@ux-aspects-themes/micro-focus-dark").then(m => m.default),
            [Theme.WhiteLabel]: () => import("@ux-aspects-themes/white-label").then(m => m.default)
        }),
        UxaSelectModule,
        UxaAppLayoutModule,
        UxaMastheadModule,
        UxaToolbarModule,
        UxaIconModule.withIcons({ search, addressBook }),
        UxaInputGroupModule,
        UxaButtonModule
    ],
    providers: [
    { provide: UxaDateTimeAdapter, useClass: UxaMomentDateTimeAdapter }
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
