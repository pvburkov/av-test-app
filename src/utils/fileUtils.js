const fs = require('fs');
const path = require('path');

const fsp = fs.promises;

const dirPath = path.resolve(__dirname, '/temp');
const filePath = path.resolve(dirPath, 'objectsInfo.json');

const readObjectsDataFromFile = async () => {
  if (!fs.existsSync(filePath)) {
    // если директории /temp не существует, создаем ее
    if (!fs.existsSync(dirPath)) {
      await fsp.mkdir(dirPath);
    }

    // генерим пустой файл, пишем в него пустой массив,
    // возвращаем пустой массив
    const file = await fsp.open(filePath, 'w');
    await file.write('[]');
    await file.close();
    return [];
  }
  
  const data = await fsp.readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(data);
};

const writeObjectsDataIntoFile = async (data) => {
  if (data === undefined) return;

  await fsp.writeFile(filePath, JSON.stringify(data), 'utf-8');
};

module.exports = {
  readObjectsDataFromFile,
  writeObjectsDataIntoFile
};
