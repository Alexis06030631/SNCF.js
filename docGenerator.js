const fs = require('fs');

const folder_manager = './src/managers/';
const doc_folder = './docs/documentation/'

fs.readdirSync(folder_manager).forEach(file => {
    if (file.indexOf('.js') > 0 && file !== 'index.js') {
        let name = file.replaceAll('.js', '').replaceAll('Manager', '');
        exports[name] = require(folder_manager + file);

        fs.writeFileSync(doc_folder + name + '.md', content_creator(exports[name], name))

    }
});


function content_creator(data, name){
    let content = '';
    let separator = '---';
    // create header
    content += `${separator}\n` + `title: ${name}\n` + `author:\n` + `${separator}\n\n`

    // create Title
    content += `# ${name}\n\n`;

    // add description
    // TODO: add description

    // add properties
    content += `||| Properties\n` + `=== List\n`;
    for (var name in data){
        console.log(name)
    }
    const properties = Object.getOwnPropertyNames(data.prototype)
    for(let i=0; properties.length>i; i++){
        content += `- [${properties[i]}](#${properties[i]})\n`;
    }
    content += `===\n`;

    // add methods
    content += `||| Methods\n` + `=== List\n`;

    content += `|||\n`;

    return content;
}