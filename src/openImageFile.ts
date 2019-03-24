import * as vscode from 'vscode';
import {window, workspace, commands} from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';


export function execute()
{
	let editor = window.activeTextEditor;

	if(!editor){ return; }

	let doc = editor.document;

	if (doc.languageId === "markdown")
	 {
		let nLine = editor.selection.active.line;
		let linkMatchResult = doc.lineAt(nLine).text.match(/\!\[.*\]\((.*)\)/);

		if(linkMatchResult && linkMatchResult.length === 2)
		{
			let filePath = linkMatchResult[1] ;
			filePath = path.isAbsolute(filePath) ?
				filePath :
				resolve(path.dirname(doc.fileName), filePath);
			
			executeCommand(filePath);
		}
	}

	return;
}


export function resolve(baseDirPath: string, filePath: string)
{
	let filePathElements = filePath.replace(/\\/gi, "/").replace(/\/$/, "").split("/");
	let baseDirPathElements = baseDirPath.replace(/\\/gi, "/").replace(/\/$/, "").split("/");
	let nUpDir = 0;

	filePathElements.forEach(element => {
		if(element==="..")
		{
			nUpDir++;
		}
	});

	return (baseDirPathElements.length-nUpDir > 0) ? 
		baseDirPathElements.slice(0, baseDirPathElements.length-nUpDir).join("/") + "/" + filePathElements.slice(nUpDir, filePathElements.length).join("/") : 
		baseDirPathElements[0] + "/" + filePathElements.slice(nUpDir, filePathElements.length).join("/");
}


export function executeCommand(filePath: string)
{
	let execCommand = getOpenApplication() + " \"" + filePath.replace(/\//gi, "\\"); + "\"";

	child_process.exec(execCommand, (error, stdout, stderror) => {
		// commands.executeCommand('workbench.action.files.revert');
		// commands.executeCommand('workbench.action.reloadWindow');
	});
}


export function getOpenApplication(): string
{
	const openImageFileConfiguration = workspace.getConfiguration('openImageFile');

	return openImageFileConfiguration.get("openApplication", "mspaint.exe");
}

