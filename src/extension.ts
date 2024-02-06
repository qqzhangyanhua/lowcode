import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function generateFiles(workspacePath: string, temp: string) {
  //获取文本编辑器中打开的文件
  console.log("开始执行===================1111111=");
  const vueFilePath = vscode.Uri.file(`${workspacePath}/index.vue`); // Vue 文件路径
  // const scssFilePath = vscode.Uri.file(`${workspacePath}/index.scss`); // SCSS 文件路径

  // 创建或覆盖 Vue 文件
  vscode.workspace.fs.writeFile(vueFilePath, Buffer.from(temp));

  // 创建或覆盖 SCSS 文件
  // vscode.workspace.fs.writeFile(scssFilePath, Buffer.from(scssTemplate));

  // 在编辑器中打开生成的文件
  vscode.workspace.openTextDocument(vueFilePath).then((doc) => {
    vscode.window.showTextDocument(doc);
  });
}
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("extension.generateFile", (fileUri) => {
    console.log("激活了,开始工作========", fileUri);
    let config = vscode.workspace.getConfiguration("myExtension");

    // 读取模板
    let templates: any = config.get("templates") || [];
    const folderPath = templates[0];
    const templateArr = readFilesInFolder(folderPath);
    vscode.window.showQuickPick(templateArr).then((template) => {
      if (template) {
        generateFiles(fileUri.path, template.value);
        vscode.window.showInformationMessage(`生成${template.label}模板成功`);
      }
    });
  });
  //   context.subscriptions.push(disposable2);
}
interface Template {
  label: string;
  value: string;
}
function readFilesInFolder(folderPath: string) {
  const files = fs.readdirSync(folderPath);
  const templateArr: Template[] = [];
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    console.log(stats.isFile(), path.extname(filePath));
    if (stats.isFile() && path.extname(filePath) === ".js") {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      // 在这里可以对文件内容进行处理
      const val = eval(fileContent);
      templateArr.push({
        label: val.name,
        value: val.template,
      });
    }
  });
  return templateArr;
}

export function deactivate() {}
