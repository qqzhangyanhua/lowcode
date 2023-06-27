import * as vscode from "vscode";
import path from "path";
import { vue2Template, scssTemplate, vue3Template ,vue2DialogTemp} from "./code";
function generateFiles(workspacePath: string, temp: string) {
  //获取文本编辑器中打开的文件
  console.log("开始执行====================");

  const vueFilePath = vscode.Uri.file(`${workspacePath}/index.vue`); // Vue 文件路径
  const scssFilePath = vscode.Uri.file(`${workspacePath}/index.scss`); // SCSS 文件路径

  // 创建或覆盖 Vue 文件
  vscode.workspace.fs.writeFile(vueFilePath, Buffer.from(temp));

  // 创建或覆盖 SCSS 文件
  vscode.workspace.fs.writeFile(scssFilePath, Buffer.from(scssTemplate));

  // 在编辑器中打开生成的文件
  vscode.workspace.openTextDocument(vueFilePath).then((doc) => {
    vscode.window.showTextDocument(doc);
  });
}
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "lowcode" is now active!');

  let disposable = vscode.commands.registerCommand(
    "lowcode.vue3Template",
    (fileUri) => {
      generateFiles(fileUri.path, vue3Template);

      vscode.window.showInformationMessage("生成vue3Template模板成功");
    }
  );
  let disposable2 = vscode.commands.registerCommand(
    "lowcode.vue2Template",
    (fileUri) => {
      generateFiles(fileUri.path, vue2Template);
      vscode.window.showInformationMessage("生成vue2Template模板成功");
    }
  );
  let disposable3 = vscode.commands.registerCommand(
    "lowcode.vue2DialogTemp",
    (fileUri) => {
      generateFiles(fileUri.path, vue2DialogTemp);
      vscode.window.showInformationMessage("生成vue2DialogTemp模板成功");
    }
  );
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable3);

}

export function deactivate() {}
