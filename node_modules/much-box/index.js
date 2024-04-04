const fs = require('fs');
const PDFParser = require('pdf2json');
const Docxtemplater = require('docxtemplater');

// 读取 PDF 文件并提取文字内容
function extractTextFromPdf(pdfFilePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    const pdfData = fs.readFileSync(pdfFilePath);
    pdfParser.on('pdfParser_dataError', reject);
    pdfParser.on('pdfParser_dataReady', pdfData => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });
    pdfParser.parseBuffer(pdfData);
  });
}

// 将文字内容生成 Word 文件
function generateWordFile(text, outputFilePath) {
  const doc = new Docxtemplater();
  doc.loadFromFile('template.docx');
  doc.setData({ content: text });
  doc.render();
  fs.writeFileSync(outputFilePath, doc.getZip().generate({ type: 'nodebuffer' }));
}

// 主函数
async function convertPdfToWord(pdfFilePath, outputFilePath) {
  try {
    const text = await extractTextFromPdf(pdfFilePath);
    generateWordFile(text, outputFilePath);
    console.log('转换完成！');
  } catch (error) {
    console.error('转换出错：', error);
  }
}

// 调用主函数进行转换
convertPdfToWord('input.pdf', 'output.docx');