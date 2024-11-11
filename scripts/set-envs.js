//Crear y mover archivos
const {writeFileSync, mkdirSync, write, writeFile} = require('fs');

//Dependencia
require('dotenv').config();

//Directorio
const targetPath = './src/environments/environments.ts';

const envFileContent = `
    export const environment = {
        mapbox_key: "${process.env['MAPBOX_KEY']}",
    }
`;

//El recursivo hace que se sobreescriba el archivo si ya existe
mkdirSync('./src/environments', {recursive: true});
writeFileSync( targetPath, envFileContent);
