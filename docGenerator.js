const fs = require('fs');

const folder_classes = './src/managers/';
const doc_folder_classes = './docs/classes/'

const folder_structures = './src/structures/';
const doc_folder_structures = './docs/structures/'

const type_of_list = {
    "undefined": {
        name: "undefined",
        type: undefined,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
    },
    "object": {
        name: "object",
        type: Object,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
    },
    "function": {
        name: "function",
        type: Function,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
    },
    "string": {
        name: "string",
        type: String,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
    },
    "number": {
        name: "number",
        type: Number,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
    },
    "boolean": {
        name: "boolean",
        type: Boolean,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
    },
    "symbol": {
        name: "symbol",
        type: Symbol,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
    },
    "array": {
        name: "array",
        type: Array,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    },
    "date": {
        name: "date",
        type: Date,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
    },
    "promise": {
        name: "promise",
        type: Promise,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
    }
}
const type_of = ["undefined", "object", "function", "boolean", "string", "number", "symbol", "bigint", "promise"];

create_classes_doc()
create_structures_doc()


function create_classes_doc(){
    fs.readdirSync(folder_classes).forEach(file => {
        if (file.indexOf('.js') > 0 && file !== 'index.js') {
            const file_content = fs.readFileSync(folder_classes + file, 'utf8');
            let name = file.replaceAll('.js', '').replaceAll('Manager', '');
            exports[name] = require(folder_classes + file);

            fs.writeFileSync(doc_folder_classes + name + '.md', content_creator(file, exports[name], name, file_content))

        }
    });
}

function create_structures_doc(){
    fs.readdirSync(folder_structures).forEach(file => {
        if (file.indexOf('.js') > 0 && file !== 'index.js') {
            const file_content = fs.readFileSync(folder_structures + file, 'utf8');
            let name = file.replaceAll('.js', '').replaceAll('Manager', '');
            exports[name] = require(folder_structures + file);

            try {
                fs.writeFileSync(doc_folder_structures + name + '.md', content_creator(file, exports[name], name, file_content))
            }catch (e) {
                new Error('Error on create file ' + name + '.md')
            }

        }
    });
}


function content_creator(file_url, data, name, file){
    const {proprieties, functions} = get_functions_and_proprieties(file_url, file)
    let content = '';
    let separator = '---';
    // create header
    content += `${separator}\n` + `title: ${name}\n` + `author:\n` + `${separator}\n\n`

    // create Title
    content += `# ${name}\n\n`;

    // add description
    // TODO: add description

    // add properties
    content += `||| Properties\n`;
    if(proprieties){
        content += `=== Elements\n`;
        proprieties.forEach(property => {
            content += `- [${property.name}](#${property.name.replaceAll('.','')})\n`;
        })
        content += `===\n`;
    }else content += '\n'

    // add methods
    content += `||| Methods\n`;
    if(functions){
        content += `=== Functions\n`;
        functions.forEach(method => {
            content += `- [${method.name}](#${method.name.replaceAll('.','')})\n`;
        })
    }

    content += `|||\n`;

    // add properties descriptions
    content += `## Properties\n`;
    if(proprieties){
        proprieties.forEach(property => {

            content += `## .${property.name}\n\n`
            content += `=== ${property.name}\n\n`
            // Set description
            content += `${property.description}\n\n`
            // add parameters
            // Set example
            content += "\n"
            content += "```javascript\n"
            content += `${name}.${property.name}\n`
            content += "```\n"
            content += `**Type: ${property.return_type || 'string'}**\n\n`
            content += "===\n\n"
        })
    }

    // add methods descriptions
    content += `---\n## Methods\n`;
    functions.forEach(method =>{
        content += `## .${method.name}\n\n`
        content += `=== ${method.name}()\n\n`

        // Set description
        content += `${method.description}\n\n`

        // add parameters
        if(method.params.length){
            content += `| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |\n`
            content += "| --- | --- | :---: | --- |\n"
            method.params.forEach(parameter => {
                content += `| ${parameter.name} | ${parameter.type} | ${parameter.optional?':icon-check:': ':icon-x:'} | ${parameter.description} |\n`
            })

            // Set example
            content += "\n"
            content += "```javascript\n"
            content += `${method}()\n`
            content += "```\n"
            content += `**Type: ${method.return_type}**\n\n`
            content += "===\n\n"
        }
    })

    return content;
}


function get_functions_and_proprieties(fileName, file){
    const functions = []
    const proprieties = []

    let data = file.match(/module\.exports\s\=.*((\n*.*)*)\}/g)
    if(data){
        data = data[0].match(/\/\*\*\s*(\n[^\*]|\*[^\/]*)\*\/.*\n*(.*)/g)
        if(data) {
            data.forEach(function (match) {
                const mdata = matchJSdocs(fileName, match)

                if(mdata.type_of === 'function'){
                    functions.push(mdata)
                }else if(mdata.type_of === 'propriety'){
                    proprieties.push(mdata)
                }else {
                    process.emitWarning(`Unknown type ${mdata.type_of} in ${fileName}`)
                }
            })
        }
    }else throw new Error(`File ${fileName} is malformed`)

    return {functions: functions, proprieties: proprieties}
}

function matchJSdocs(fileName, match){
    const return_object = {
        name: '',
        description: '',
        return_type: '',
        return_description: '',
        async: false,
        params: [],
        type_of: ''
    }

    const lastLine = (match.split('\n')[match.split('\n').length-1])
    if(lastLine.match(/this\.\w*.*=.*/g)){
        return_object.name = lastLine.match(/this\.(\w*).*=.*/)[1]
        return_object.type_of = 'propriety'
    } else if(lastLine.match(/.*(get)\s*\w+\(.*\)/g)){
        return_object.name = lastLine.match(/.*get\s*(\w+)\(.*\)/)[1]
        return_object.type_of = 'propriety'
    }else {
        return_object.name = lastLine.match(/(\w+)\s?\(.*\)/)[1]
        return_object.type_of = 'function'
        if(lastLine.startsWith('async')) return_object.async = true
    }

    // Match all jsdocs in function return array
    match = match.match(/\s\*\s([^].*)/g).map(m => m.replace(/.*\*\s/, ''))


    // Check if is a function or a property

    for (let jsdoc of match){

        // Get description
        if(!jsdoc.startsWith('@') && !jsdoc.includes('*/')) {
            return_object.description = contain_link(jsdoc);
        }

        // Get return type
        if(jsdoc.startsWith('@return')){
            const elements = jsdoc.replace(/@return[s]?\s?/, '').match(/\{(.*)?\}\s?(.*)/)

            if(elements) {
                // Get return type
                if(elements[1].match(/(.*)\<(\w*)(.*)?\>/)) {
                    elements[1] = elements[1].match(/(.*)\<(\w*)(.*)?\>/)
                    return_object.return_type = `${is_type_of(elements[1][1])} <${is_type_of(elements[1][2])}${elements[1][3]?`${elements[1][3]}`:''}>`
                }else {
                    return_object.return_type = is_type_of(elements[1])
                }

                // Get return description
                return_object.return_description = contain_link(elements[2])
            }else {
                process.emitWarning(`${jsdoc}. Malformed in ${fileName}`)
            }

        }

        // Get parameters
        if(jsdoc.startsWith('@param')){
            const param_type = jsdoc.replace(/@param[s]?\s?/, '').match(/\{(.*)?\}\s?(\S*)\s?(.*)/)
            if(param_type){
                param_type[1] = param_type[1].split('.<')[0]
                if(param_type[1].split('||').length>1){
                    const paramwrts = param_type[1].split('||')
                    param_type[1] = ''
                    paramwrts.forEach(p => {
                        param_type[1] += is_type_of(p) + ' '
                    })
                }else param_type[1] = is_type_of(param_type[1])

                return_object.params.push({
                    name: param_type[2].replace('[', '').replace(']', ''),
                    type: param_type[1],
                    description: contain_link(param_type[3]),
                    optional: param_type[2].includes('[')
                })
            }else {
                process.emitWarning(`${jsdoc}. Malformed in ${fileName}`)
            }
        }
    }
    return return_object
}

function is_type_of(elem){
    elem = elem.toLowerCase()
    const typeOf = type_of_list[elem]
    if(typeOf){
        return `[${typeOf.name} :icon-link-external:](${typeOf.url})`
    }else {
        let url = '../classes/'
        if(!elem.endsWith('s')) url = '../structures/'
        return `[${elem}](${url}${elem})`
    }
}

function contain_link(elem){
    if(elem.includes('{@link')){
        const link = /\{@link\s([^}]*)\}/g.exec(elem)
        elem = elem.replace(link[0], is_type_of(link[1]))
    }
    return elem
}