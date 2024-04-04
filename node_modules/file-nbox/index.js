const fs = require('fs');
const path = require('path');

// 生成文件报告
function generateFileReport(filePath, reportPath) {
  // 读取文件信息
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error('读取文件信息失败', err);
      return;
    }

    const fileSize = stats.size;
    const fileType = path.extname(filePath);

    // 读取目录下的文件列表
    fs.readdir(path.dirname(filePath), (err, files) => {
      if (err) {
        console.error('读取文件列表失败', err);
        return;
      }

      const fileCount = files.length;
      const fileNames = files.join('\n');

      // 生成报告内容
      const reportContent = `文件路径：${filePath}\n文件大小：${fileSize} 字节\n文件个数：${fileCount}\n文件类型：${fileType}\n\n文件名称列表：\n${fileNames}`;

      // 写入报告文件
      fs.writeFile(reportPath, reportContent, (err) => {
        if (err) {
          console.error('生成报告文件失败', err);
          return;
        }

        console.log(`文件报告生成成功，路径：${reportPath}`);
      });
    });
  });
}
