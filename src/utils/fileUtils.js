const fsp = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, 'objectsInfo.json');

const readObjectsDataFromFile = async () => {
  try {
    const data = await fsp.readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (err) {
    // если файл не существует, то создаем его,
    // пишем в него пустой массив и возвращаем пустой массив 
    const file = await fsp.open(filePath, 'w');
    await file.write('[]');
    await file.close();
    return [];
  }
};

const writeObjectsDataIntoFile = async (data) => {
  if (data === undefined) return;

  await fsp.writeFile(filePath, JSON.stringify(data), 'utf-8');
};

module.exports = {
  readObjectsDataFromFile,
  writeObjectsDataIntoFile
};
