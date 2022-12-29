const fs = require('fs');
const clc = require('cli-color');


const folder_classes = './src/managers/';
const doc_folder_classes = './docs/managers/'

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
let missing_data = {proprieties: 0, functions: 0};

create_classes_doc()
create_structures_doc()


function create_classes_doc(){
    fs.readdirSync(folder_classes).forEach(file => {
        if (file.indexOf('.js') > 0 && file !== 'index.js') {
            const file_content = fs.readFileSync(folder_classes + file, 'utf8');
            let name = file.replaceAll('.js', '').replaceAll('Manager', '');
            exports[name] = require(folder_classes + file);
            if(name.toLowerCase().includes('cached')) return

            fs.writeFileSync(doc_folder_classes + name + '.md', CreateDocFile(file, name, file_content))
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
                fs.writeFileSync(doc_folder_structures + name + '.md', CreateDocFile(file, name, file_content))
            }catch (e) {
                new Error('Error on create file ' + name + '.md')
            }

        }
    });
}


function CreateDocFile(file_url, name, file){
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
        proprieties.forEach(property => {
            content += `- [${property.name}](#${property.name.replaceAll('.','')})\n`;
        })
    }else content += '\n'

    // add methods
    content += `||| Methods\n`;
    if(functions){
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
            content += `this.${property.name}\n`
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
        }

        // Set example
        content += "\n"
        content += "```javascript\n"
        content += `${method.name}()\n`
        content += "```\n"
        content += `**Type: ${method.return_type}**\n\n`
        content += "===\n\n"
    })

    return content;
}


function get_functions_and_proprieties(fileName, file){
    const functions = []
    const proprieties = []

    // Delete JSDoc at the beginning of the file
    file = file.replace(/(\/\*\*\n.*?\*.*@type(.|\n)*?\*\/)|(\/\/.*JSDoc.*)/gi, '');

    // Get the zone of the file where the functions and properties are
    let data = file.match(/module\.exports\s\=.*((\n*.*)*)\}/g)
    if(data){
        const constructor = data[0].match(/constructor.*\{((.*\n*\s*)*?)\}/)[1]
        let constructor_data
        data = data[0].match(/\/\*\*\s*(\n[^\*]|\*[^\/]*)\*\/.*\n*(.*)/g) || []

        if(constructor) constructor_data = constructor.match(/this\.(\w*)\s?=.*/g)?.map(match => match.match(/this\.(\w*)\s?=.*/))?.map(match => constructor.match(`\/\/\\s?(.*).*\n{0,2}(.*)this.${match[1]}\\s?=.*`))?.map(match => match?match[0]:null).filter(match => match)
        else throw new Error(`File ${fileName} is malformed, no constructor found`)

        if(constructor_data?.length) constructor_data.forEach(e => data.push(e))

        if(data.length) {
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

    check_is_commented(fileName, file, {functions: functions, proprieties: proprieties})
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
    match = match.match(/\s\*\s([^].*)|\/\/\s?(.*)/g).map(m => m.replace(/.*\*\s/, ''))

    // Check if is a function or a property

    for (let jsdoc of match){

        // Get description
        if(jsdoc.startsWith('//') || (!jsdoc.startsWith('@') && !jsdoc.includes('*/'))) {
            return_object.description = contain_link(jsdoc.replace(/^\/\/\s?/g, ''));
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

function contain_link(elem) {
    if (elem.includes('{@link')) {
        const link = /\{@link\s([^}]*)\}/g.exec(elem)
        elem = elem.replace(link[0], is_type_of(link[1]))
    }
    return elem
}

function check_is_commented(fileName, file, {functions: functions, proprieties: proprieties}) {
    const missing = {proprieties: [], functions: []}
    console.log(clc.whiteBright(`${fileName}`))
    console.log(clc.cyan('Details:'))
    console.log(clc.blackBright(`   ${clc.yellow('[detected]')} Functions: ${functions.length}`))
    console.log(clc.blackBright(`   ${clc.yellow('[detected]')} Properties: ${proprieties.length}`))

    let data = file.match(/module\.exports\s\=.*((\n*.*)*)\}/g);

    // Check properties
    (data[0].match(/constructor.*\{((.*\n*\s*)*?)\}/)[1])?.match(/this\.(\w*)\s?=.*/g)?.map(match => match.match(/this\.(\w*)\s?=.*/))?.forEach(m => {
        if(!proprieties.find(p => p.name === m[1]))missing.proprieties.push(m[1])
    })
    missing.proprieties.forEach(p => {
        missing_data.proprieties++
        console.log(clc.red(`${clc.yellow('[missing]')} Propriety ${p} is not commented`))
    })

    // Check functions
    data[0].match(/\/\*\*\s*(\n[^\*]|\*[^\/]*)\*\/.*\n*(.*)/g)?.forEach(match => {
        const lastLine = (match.split('\n')[match.split('\n').length-1])
        if(lastLine.match(/.*(get)\s*\w+\(.*\)/g)){
            if(!proprieties.find(p => p.name === lastLine.match(/.*get\s*(\w+)\(.*\)/)[1])) missing.proprieties.push(lastLine.match(/.*get\s*(\w+)\(.*\)/)[1])
        }else if(!lastLine.match(/this\.\w*.*=.*/g) && !functions.find(f => f.name === lastLine.match(/(\w+)\s?\(.*\)/)[1])){
            missing.functions.push(lastLine.match(/(\w+)\s?\(.*\)/)[1])
        }
    })
    missing.functions.forEach(f => {
        missing_data.functions++
        console.log(clc.red(`${clc.yellow('[missing]')} Function ${f} is not commented`))
    })

    console.log('\n')
}

console.log(clc.whiteBright('Recap:'))
if(missing_data.proprieties) console.log(clc.red(`${clc.yellow('[missing]')} ${missing_data.proprieties} proprieties`))
if(missing_data.functions) console.log(clc.red(`${clc.yellow('[missing]')} ${missing_data.functions} functions`))
if(!missing_data.proprieties && !missing_data.functions) console.log(clc.green(`${clc.yellow('[ok]')} No missing data`))
