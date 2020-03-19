const fs = require('fs');

// const data = {
//     title: 'idea to begin with',
//     author: 'Souhardya'
// };

// dataJSON = JSON.stringify(data);
// fs.writeFileSync('output.json', dataJSON);

const dataBUFFER = fs.readFileSync('output.json');
const dataJSON = dataBUFFER.toString();
const data = JSON.parse(dataJSON);
data.title = 'New BOok';
data.author = 'New author';

const newDataJSON = JSON.stringify(data);
fs.writeFileSync('output.json', newDataJSON);
console.log(newDataJSON);


