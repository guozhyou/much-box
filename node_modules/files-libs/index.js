const fs = require('fs');

// 读取文件并将配置转化为JSON数据结构
function readFileAndConvertToJson(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const config = parseConfig(data);
        resolve(config);
      }
    });
  });
}

// 解析文件中的配置
function parseConfig(data) {
  // 根据不同的文件类型进行解析，这里仅支持文本文件
  const fileType = getFileType(data);
  if (fileType === 'txt') {
    return parseTxtConfig(data);
  } else if (fileType === 'csv') {
    return parseCsvConfig(data);
  } else {
    throw new Error('Unsupported file type');
  }
}

// 获取文件类型
function getFileType(data) {
  // 假设文件类型是通过文件内容中的特定标识来判断的，这里简单地根据文件内容是否包含逗号来判断文件类型
  if (data.includes(',')) {
    return 'csv';
  } else {
    return 'txt';
  }
}

// 解析文本文件中的配置
function parseTxtConfig(data) {
  // 假设文本文件中的配置是以键值对的形式存在，每行一个配置项，键和值用等号分隔
  const lines = data.split('\n');
  const config = {};

  lines.forEach(line => {
    const [key, value] = line.split('=');
    config[key.trim()] = value.trim();
  });

  return config;
}

// 解析CSV文件中的配置
function parseCsvConfig(data) {
  // 假设CSV文件中的配置是以逗号分隔的，第一行是键，第二行是值
  const lines = data.split('\n');
  const keys = lines[0].split(',');
  const values = lines[1].split(',');
  const config = {};

  keys.forEach((key, index) => {
    config[key.trim()] = values[index].trim();
  });

  return config;
}