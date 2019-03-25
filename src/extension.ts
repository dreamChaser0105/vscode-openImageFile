import {window, workspace, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

import * as openImageFile from './openImageFile';
import { print } from 'util';

export function activate(context: ExtensionContext) 
{
	let disposable = commands.registerCommand('openImageFile.openFile', () =>{
		openImageFile.execute();
	}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}

