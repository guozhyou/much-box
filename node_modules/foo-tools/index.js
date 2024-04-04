const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');

const app = express();
const upload = multer({ dest: 'uploads/' });

// 静态文件目录，包括 index.html 文件
app.use(express.static('public'));

// 处理文件上传
app.post('/upload', upload.single('excelFile'), (req, res) => {
  const { path } = req.file;

  // 解析上传的 Excel 文件
  const workbook = xlsx.readFile(path);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const records = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  res.json(records);

  // 删除上传的文件
  fs.unlinkSync(path);
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`服务器已启动，访问 http://localhost:${port}`);
});