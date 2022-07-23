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
    const match = {
        start:"\\\/\\\*\\\*\\\s\*\(\\\n\[\^\\\*\]\|\\\*\[\^\\\/\]\*\)\\\*\\\/\.\*\\\n\*\.\*",
        end: ".*\(.*\)"
    }
    for(let i=0; methods.length>i; i++){
        let description = '';
        let return_type = '';
        let params = [];

        let jsdocs = file.match(new RegExp(match.start+methods[i]+match.end, 'g'));
        if(jsdocs){
            jsdocs = jsdocs[0]

            const jsdocs_filter = jsdocs.match(/\s\*\s([^].*)/g)

            for(let p=0; jsdocs_filter.length>p; p++){
                if(!jsdocs_filter[p].includes('@') && !jsdocs_filter[p].includes('*/')){
                    description = jsdocs_filter[p];

                    if(description.includes('{@link')){
                        const link = /\{@link\s([^}]*)\}/g.exec(description)
                        description = description.replace(link[0], `[${link[1].toLowerCase()}](${link[1].toString()})`)
                    }
                }else if(jsdocs_filter[p].includes('@return')) {
                    return_type = jsdocs_filter[p].match(/@.*\{(.*)((\<.*\>)?)\}\s?(.*)/)[1].match(/(?:(.*)<((\w*).*)>)?.*/)
                    if(type_of.includes(return_type[1]?.toLowerCase())) {
                        return_type[1] = return_type[1]?.toLowerCase()
                    }else{
                        return_type[1] = `[${return_type[1] || return_type[0]}](${return_type[1] || return_type[0]})`
                    }

                    if(return_type[3]){
                        return_type[1] += `<[${return_type[3]}](../structures/${return_type[3].match(/\w*/)[1] || return_type[3]})>`
                    }
                    return_type = return_type[1]
                }else if(jsdocs_filter[p].includes('@param')){
                    const param_type = jsdocs_filter[p].match(/.*{(.*)}\s?(\S*)?\s?(.*)/)
                    if(param_type){
                        params.push({
                            name: param_type[2].replace('[', '').replace(']', ''),
                            type: param_type[1],
                            description: param_type[3],
                            optional: param_type[2].includes('[')
                        })
                    }else {
                        throw new Error(`Error in param ${jsdocs_filter[p]}, in file ${data.name}`)
                    }
                }
            }
        }

        content += `## .${methods[i]}\n\n`
        // Set return type
        content += `=== ${methods[i]}()\n\n`
        // Set description
        content += `${description}\n\n`
        // add parameters
        if(params.length>0){
            content += `| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |\n`
            content += "| --- | --- | :---: | --- |\n"
            for(let p=0; params.length>p; p++){
                content += `| ${params[p].name} | ${params[p].type.replaceAll('||',';')} | ${params[p].optional?':icon-check:': ':icon-x:'} | ${params[p].description} |\n`
            }
        }
        // Set example
        content += "\n"
        content += "```javascript\n"
        content += `${methods[i]}()\n`
        content += "```\n"
        content += `**Type: ${return_type|| 'null'}**\n\n`
        content += "===\n\n"
    }

    return content;
}