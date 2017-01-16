/**
 * Created by מרדכי on 08 ינואר 2017.
 */

function generateRecordingsTree(treeData) {
    var tree = [];
    treeData.forEach(function (file, index, array) {
        addFileToTree(tree, file.split('/'));
    });
    return tree;
}

function addFileToTree(tree, fileDirs) {
    if (fileDirs.length == 0 || fileDirs[0] == '') return;
    else {
        var isFound = tree.find(function (node) { return node.text == fileDirs[0]; });
        if (isFound) {
            addFileToTree(isFound.children, fileDirs.slice(1));
        } else {
            var node = {
                "text": fileDirs[0],
                "children": []
            };
            if (fileDirs.length == 1) node.type = "leaf";

            tree.push(node);
            addFileToTree(node.children, fileDirs.slice(1));
        }
    }
}

module.exports = {
    generateRecordingsTree: generateRecordingsTree
};