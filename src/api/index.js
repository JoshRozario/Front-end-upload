const express = require('express')
const upload = require('express-fileupload')
const fs = require("fs")
var cors = require('cors');
var sypht = require('sypht-node-client');

const app = express()

async function main(file) {
    var data = await sypht.fileUpload(['generic-ai-ocr'],file, "test.pdf");
    data = await sypht.fetchResults(data['fileId']);
    console.log(JSON.stringify(data, null, 2));
}


app.use(upload(),cors())

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

async function analyze(name) {
    var data = await sypht.fileUpload(['generic-ai-ocr'], './'+name);
    data = await sypht.fetchResults(data['fileId']);
    console.log(data)
    return data
}

app.post('/',async (req,res)=>{
    console.log(req.files.pdf)
        if (req.files.pdf){
            console.log(req.files.pdf)
            var file = req.files.pdf
            var filename = file.name
            file.mv('./'+ filename, function(err){
                if(err){
                    console.log("error")
                    res.send(err)
                } else{
                    console.log("File has been sent too Sypth back-end for analysis")
                    analyze(filename).then(
                        data => {
                            res.send(data)
                            console.log("Response sent to front end")
                        }
                    )
                        .catch(
                            e => {
                                console.log(e)
                                res.send("error")
                            }
                        );
                }
            })
        }else{
            console.log("nothing was sent as pdf")
        }
})


app.listen(9000)