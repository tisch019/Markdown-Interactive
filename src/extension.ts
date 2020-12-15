// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import MarkdownIt = require('markdown-it');
import markdownItInteractive from './markdownItInteractive';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	// Track currently webview panel
	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "Markdown interactive" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('markdown.addElement', () => {
		// The code you place here will be executed every time your command is executed
		const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPanel) {
        // If we already have a panel, show it in the target column
        currentPanel.reveal(columnToShowIn);
      } else {
		currentPanel = vscode.window.createWebviewPanel(
			'Interactivity wizard',
			'Interactivity wizard',
			vscode.ViewColumn.Two,
			{
				// Enable scripts in the webview
				enableScripts: true
			  }
		  );
	
		  // And set its HTML content
		  currentPanel.webview.html = getWebviewContent(currentPanel.webview, context.extensionUri);

		  currentPanel.webview.onDidReceiveMessage(
			message => {
				//ohne switch, command direkt in Code Block setzen.
			  switch (message.command) {
				case 'mctest':
				  editor?.insertSnippet(new vscode.SnippetString("```mctest\n" + message.text + "\n```"));
				  return;
				case 'gallery':
					editor?.insertSnippet(new vscode.SnippetString("```gallery\n" + message.text + "\n```"));
					return;
				case 'map':
					editor?.insertSnippet(new vscode.SnippetString("```map\n" + message.text + "\n```"));
					return;
			  }
			},
			undefined,
			context.subscriptions
		  );
		// Reset when the current panel is closed
        currentPanel.onDidDispose(
			() => {
			  currentPanel = undefined;
			},
			null,
			context.subscriptions
		  );
		}
	});

	context.subscriptions.push(disposable);

	return {
		extendMarkdownIt(md: MarkdownIt) {
		  return md.use(markdownItInteractive);
		}
	  };
}

function getWebviewContent(webview: vscode.Webview, extensionUri: any) {
	// Local path to main script run in the webview
	const scriptPathOnDisk = vscode.Uri.joinPath(extensionUri, 'resources', 'main.js');
	// And the uri we use to load this script in the webview
	const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
	// Local path to css styles
	const stylesPathMainPath = vscode.Uri.joinPath(extensionUri, 'resources', 'style.css');
	// Uri to load styles into webview
	const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

	// Use a nonce to only allow specific scripts to be run
	const nonce = getNonce();

	return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
		integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	  <link href="${stylesMainUri}" rel="stylesheet">
	  <script nonce="${nonce}" src="${scriptUri}"></script>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Interactivity Wizard</title>
	</head>
	
	<body>
	  <h2> Interactivity Wizard</h2>
	  <div id="accordion">
		<div class="card">
		  <div class="card-header" id="headingOne">
			<h5 class="mb-0">
			  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
				aria-controls="collapseOne">Multiple Choice Test
			  </button>
			</h5>
		  </div>
	
		  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
			<div class="card-body">
			  <form>
				<div class="container-fluid">
				  <div class="question row">
					<input type="text" class="form-control questionInput col-10" placeholder="Frage eingeben">
					<button type="button" class="btn btn-danger col-2" onclick="removeQuestion(event)">Löschen</button>
					<div class="answers container-fluid">
					  <div class="answer row">
						<input type="checkbox" class="correctAnswer col-1">
						<input type="text" class="form-control answerInput col-9" placeholder="Antwort eingeben">
						<button type="button" class="btn btn-danger col-2" onclick="removeAnswer(event)">Löschen</button>
					  </div>
					  <button type="button" class="btn btn-success" onclick="addAnswer(event)">Antwort
						hinzufügen</button>
					</div>
				  </div>
				  <button type="button" class="btn btn-success" onclick="addQuestion(event)">Frage
					hinzufügen</button>
				</div>
				<div class="container-fluid">
				  <div class="row">
					<button type="button" class="btn btn-primary col-4 offset-4" onclick="parseMultipleChoiceTest()">In Markdown überführen</button>
				  </div>
				</div>
			  </form>
			</div>
		  </div>
		</div>
		<div class="card">
		  <div class="card-header" id="headingTwo">
			<h5 class="mb-0">
			  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
				aria-controls="collapseTwo">
				Gallery
			  </button>
			</h5>
		  </div>
		  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
		  	<div class="card-body">
				<form>
					<div class="container-fluid">
					<div class="galleryElement row">
						<input type="text" class="form-control imgPathInput col-12 mt-2" placeholder="Bild URL eingeben">
						<input type="text" class="form-control imgDescriptionInput col-12 mt-2" placeholder="Bild Beschreibung eingeben">
						<button type="button" class="btn btn-danger col-2 mt-2" onclick="removeGalleryElement(event)">Löschen</button>
					</div>
					<button type="button" class="btn btn-success mt-2" onclick="addGalleryElement(event)">Bild
					hinzufügen</button>
					</div>
					<div class="container-fluid">
					<div class="row">
					<button type="button" class="btn btn-primary col-4 offset-4" onclick="parseGallery()">In Markdown überführen</button>
					</div>
					</div>
				</form>
			</div>
		  </div>
		</div>
		<div class="card">
		  <div class="card-header" id="headingThree">
			<h5 class="mb-0">
			  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"
				aria-expanded="false" aria-controls="collapseThree">
				Map
			  </button>
			</h5>
		  </div>
		  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
			<div class="card-body">
			  
			<form>
			<div class="col-12">
			  <div class="form-group">
				  <label for="address-lat">Standorts</label>
				  <input class="form-control col-5" id="address-lat" placeholder="Breitengrad"></br>
				  <input class="form-control col-5" id="address-long" placeholder="Längengrad">
			  </div>
			  <div class="form-group">
				  <label for="title">Titel</label>
				  <input class="form-control" type="text" id="map-title">
			  </div>
			  <div class="form-group">
				  <label for="freetext">Beschreibung</label>
				  <textarea class="form-control" type="text" id="map-description"></textarea>
			  </div>
			  
			  <div class="form-group input-group--dimension">
				  <label for="map-width">Breite</label>
				  <input class="form-control slide-input" type="range" id="map-width" min="100" max="2000" value="400" step="1">
				  <div class="input-wrapper">
					  <input class="map-width-input" value="400" type="number">
				  </div>
			  </div>
			  <div class="form-group input-group--dimension">
				  <label for="map-height">Höhe</label>
				  <input class="form-control slide-input" type="range" id="map-height" min="100" max="2000" value="400" step="1">
				  <div class="input-wrapper">
					  <input class="map-height-input" value="400" type="number">
				  </div>
			  </div>
			  <div class="form-group input-group--api-key">
				  <label for="api-key">Google Maps API Key (verpflichtend seit 7/2016)</label>
				  <input class="form-control" type="text" id="api-key">
			  </div>
			  <div class="row">
					<button type="button" class="btn btn-primary col-4 offset-4" onclick="parseMap()">In Markdown überführen</button>
				</div>
		  </div>
		  </form>
			</div>
		  </div>
		</div>
	  </div>
	
	  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
		integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
		crossorigin="anonymous"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
		integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
		crossorigin="anonymous"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
		integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
		crossorigin="anonymous"></script>
		<script>
		init();
		</script>
	</body>
	
	</html>`;
  }

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

// this method is called when your extension is deactivated
export function deactivate() {}
