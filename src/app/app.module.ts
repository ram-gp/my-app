import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
    declarations: [
        AppComponent,
        ThemeSelectorComponent,
        TrimAppLayoutComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
