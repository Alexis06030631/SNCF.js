const yaml = require('js-yaml');
const glob = require('glob');
const fs = require('fs');
const gitlog = require("gitlog").default;


// Update the version in website app
try {
    const doc = yaml.load(fs.readFileSync(process.cwd()+'/retype.yml'));
    doc.branding.label = `V${process.env.npm_package_version}`;
    fs.writeFileSync(process.cwd()+'/retype.yml', yaml.dump(doc));

    glob(process.cwd()+"/docs/*.md", function (er, files) {
        for (let id in files) {

            const options = {
                repo: process.cwd(),
                file: files[id],
                number: 2,
                fields: ["hash", "abbrevHash", "subject", "authorName", "authorDateRel", "authorDate", "authorEmail"]
            };


            // Automatically update the author and the date in the docs
            gitlog(options, function (error, commits) {
                if(commits[0]) {
                    let md_content = fs.readFileSync(files[id], 'utf8')

                    let md_header_content = md_content.split('---')[1]

                    // Add author info to the header
                    if(md_header_content.includes('author')){
                        const athEmailComp = commits[0].authorEmail?.match(/(.*)\+(.*?)\@.*?/)
                        let author = (athEmailComp?.length >= 1? athEmailComp[2] : commits[0].authorName)
                        let author_id = (athEmailComp?.length >= 1? athEmailComp[1] : false)


                        if(md_header_content.search(/.*name:.*/mg) >= 0){
                            md_header_content = md_header_content.replace(/.*name:.*/mg, `  name: ${author}`)
                        }else {
                            md_header_content += `  name: ${author}\n`
                        }

                        if(md_header_content.search(/.*avatar:.*/mg) >= 0){
                            md_header_content = md_header_content.replace(/.*avatar:.*/mg, `  avatar: https://avatars.githubusercontent.com/u/${author_id}`)
                        }else {
                            md_header_content += `  avatar: https://avatars.githubusercontent.com/u/${author_id}\n`
                        }
                    }

                    // Add date info to the header
                    if(md_header_content.search(/.*date:.*/mg) >= 0){
                        md_header_content = md_header_content.replace(/.*date:.*/mg, `date: ${(new Date(commits[0].authorDate)).toISOString().substring(0, 16)}`)
                    }else md_header_content += `\ndate: ${(new Date(commits[0].authorDate)).toISOString().substring(0, 16)}\n`

                    const rebuild = md_content.split('---')
                    rebuild[1] = md_header_content
                    md_content = rebuild.join('---')
                    fs.writeFileSync(files[id], md_content)
                }
            });
        }
    })
} catch (e) {
    console.log(e);
}