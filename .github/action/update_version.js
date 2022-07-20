const yaml = require('js-yaml');
const fs   = require('fs');

// Update the version in website app
try {
    const doc = yaml.load(fs.readFileSync(process.cwd()+'/retype.yml'));
    doc.branding.label = `V${process.env.npm_package_version}`;
    fs.writeFileSync(process.cwd()+'/retype.yml', yaml.dump(doc));
} catch (e) {
    console.log(e);
}