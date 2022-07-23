const fs = require('fs');

const folder_manager = './src/managers/';
const doc_folder = './docs/classes/'

const type_of = ["undefined", "object", "function", "boolean", "string", "number", "symbol", "bigint", "promise"];

fs.readdirSync(folder_manager).forEach(file => {
    if (file.indexOf('.js') > 0 && file !== 'index.js') {
        const file_content = fs.readFileSync(folder_manager + file, 'utf8');
        let name = file.replaceAll('.js', '').replaceAll('Manager', '');
        exports[name] = require(folder_manager + file);

        fs.writeFileSync(doc_folder + name + '.md', content_creator(exports[name], name, file_content))

    }
});


function content_creator(data, name, file){
    let content = '';
    let separator = '---';
    // create header
    content += `${separator}\n` + `title: ${name}\n` + `author:\n` + `${separator}\n\n`

    // create Title
    content += `# ${name}\n\n`;

    // add description
    // TODO: add description

    // add properties
    const constructor_data = file.match(/constructor.*\{((.*\n*\s*)*?)\}/gm)
    const properties = constructor_data[0].match(/(this\.)(\S*)/g)
    content += `||| Properties\n` + `=== Elements\n`;
    if(properties){
        for(let i=0; properties.length>i; i++){
            properties[i] = properties[i].replace("this.", '')
            content += `- [${properties[i]}](#${properties[i]})\n`;
        }
    }
    content += `===\n`;

    // add methods
    content += `||| Methods\n` + `=== Functions\n`;
    const methods = Object.getOwnPropertyNames(data.prototype).filter(method => method !== 'constructor' && !method.startsWith("_"));
    for(let i=0; methods.length>i; i++){
        content += `- [${methods[i]}](#${methods[i]})\n`;
    }

    content += `|||\n`;

    // add properties descriptions
    content += `## Properties\n`;

    // add methods descriptions
    content += `---\n## Methods\n`;
    const functions_content = file.replace(constructor_data, '')
    for(let i=0; methods.length>i; i++){
        const match = `/${methods[i]}.*\\((.*)\\).*\\n*\\{/`
        //console.log(file.match(match))
        content += `## .${methods[i]}\n\n`
        // Set return type
        content += `=== ${methods[i]} : \`string\`\n\n`
        // Set description
        content += `${methods[i]} description.\n\n`
        // add parameters
        content += `Parameters | Description\n`
        content += "--- | ---\n"
        content += "`count` | description.\n"
        // Set example
        content += "\n"
        content += "```javascript Example.js\n"
        content += `${methods[i]}()\n`
        content += "```\n"
        content += "===\n\n"
    }

    return content;
}