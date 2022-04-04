import { Component, Input } from '@angular/core';
import { UxaThemeManager } from '@ux-aspects-angular/theming';
import { Theme } from '@ux-aspects-core/theming';

@Component({
  selector: 'theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  
})
export class ThemeSelectorComponent {
  @Input() theme: Theme = Theme.MicroFocus;
  get themes(): Theme { return this.theme; }
  set themes(theme: Theme) {
    this.theme = theme;
    
  }

  Theme = Theme;

  constructor(private readonly _themeManager: UxaThemeManager) {}

  updateTheme(theme: Theme): void {
    this._themeManager.setTheme(theme);
  }
  selectTheme(event: any): void {
    
    this._themeManager.setTheme(event);
  }
}
