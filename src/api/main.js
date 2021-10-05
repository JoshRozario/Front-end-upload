var sypht = require('sypht-node-client');

async function main() {
    var data = await sypht.fileUpload(['generic-ai-ocr'], 'G:/Downloads/Sypht tasks/Sypth API/sypht-node-client-master/example/test.pdf');
    data = await sypht.fetchResults(data['fileId']);
    console.log(JSON.stringify(data, null, 2));
}
main().then(
    data => console.log(data)
)
    .catch(
        e => console.log(e)
    );


    