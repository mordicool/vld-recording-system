path = require("path")
fs = require("fs")
program = require("commander")

function populateTree(tree, p)
{
    files = fs.readdirSync(p)
    
    var children = []
    
    files.map(function (file) {
        return path.join(p, file) // so I get whole file names
    }).filter(function (file) {
        return fs.statSync(file).isDirectory()
    }).forEach(function (dir) {
        populateTree(children, dir)
    })
    
    if (children.length < 1) {
        tree.push(path.basename(p))
    }
    else {
        var me = {}
        me.text = path.basename(p)
        me.state = {
            'disabled': true
        }
        me.children = children
        tree.push(me)
    }
}

program
    .version('1.0.0')
    .option('-s --scan-path <dir>', 'The path to scan', '.')
    .parse(process.argv)

scan_path = program.scanPath
body = []
populateTree(body, scan_path)
console.log(JSON.stringify(body, null, '\t'))
