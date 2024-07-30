import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class AppGridShortcut extends Extension {
	enable() {
		if (this._clickedSecondary) {
			return;
		}

		this._clickedSecondary = Main.panel.statusArea.activities.connect(
			'button-press-event',
			(actor, event) => {
				if (event.get_button() == Clutter.BUTTON_SECONDARY) {
					Main.overview.show(2);
				}
			}
		);
	}

	disable() {
		if (!this._clickedSecondary) {
			return;
		}

		Main.panel.statusArea.activities.disconnect(this._clickedSecondary);
		this._clickedSecondary = null;
	}
}
