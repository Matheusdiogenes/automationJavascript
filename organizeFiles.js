const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve('./'), (err, file) => {

  const fileExe = __filename.split('/')[__filename.split('/').length - 1]
  const files = file.filter(f => f.includes('.') && f !== fileExe && f[0] !== '.')  

  const currentDirectory = path.resolve('./')

  const extensions = []
  files.forEach(file => {
    const lastIndex = file.split('.').length - 1
    const dotFile = file.split('.')[lastIndex]
    dotFile !== undefined ? extensions.push(dotFile.toLowerCase()) : 0
  })

  if (extensions.length === 0) {
    console.log('Não foi encontrado arquivos nesse diretório.')
    return 0
  }

  extensions.forEach(dotFile => {
    fs.mkdir((currentDirectory, dotFile), (err) => {
      if (err) return 0
    })
  })

  files.forEach(file => {
    const lastIndex = file.split('.').length - 1
    const dotFile = file.split('.')[lastIndex]
    if (dotFile !== undefined) {
      fs.rename(`${currentDirectory}/${file}`, `${currentDirectory}/${dotFile.toLowerCase()}/${file}`, (err) => {
        if (err) console.error(err);
      })
    }
  })

  console.log('Files organized!')

})