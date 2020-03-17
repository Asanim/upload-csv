#!/usr/bin/env node

const Parse = require('./Parse')
const serverhttp = require('./post_simple')
const yargs = require('yargs');

var filename = 'COOIS_components.txt'
var url = 'http://localhost/forms/bot/generic' //'http://nzl57wstdashbd/forms/bot/generic'


const data = ({
    title: "title",
    department: "Fibre",
    type: 'pareto',
    label: 'new turnback label',
    date: new Date(),
    data: 1,
})

function upload_csv (fileloc, url, key) {
    var filedir = __dirname;
    var fileloc = filedir+'\\'+filename
    var title = filename.split('.')[0]


    Parse.SAPCSV(fileloc).then( (parseddata) => {
        var graphData = [];
        //skip the first as is junk
        parseddata.slice(1, 11).forEach ( (item) => {

            //convert dd-mm-yyyy to mm-dd-yyyy
            var from = item[key[3]].split("/")
            var date = new Date(from[2], from[1] - 1, from[0])
            
            //items must be a number type NOT string!
            var departmentname = Parse.codemap(Number(item[key[0]]))

            var data = ({
                title: title,
                department: departmentname,
                type: key[1],
                label: item[key[2]],
                date: date,
                data: item[key[4]],
            })
            graphData.push(data)
        })
        console.log(graphData)
        serverhttp.post(graphData, url)
    }).catch( (err) => {
        console.log(err)
    })
}

function log_csv (fileloc, option) {
    var filedir = __dirname;
    var fileloc = filedir+'\\'+filename

    Parse.SAPCSV(fileloc).then( (parseddata) => {
        if (option === 'all') {
            console.log(parseddata)
        } else {
            console.log(parseddata[1])
        }

    }).catch( (err) => {
        console.log(err)
    })
}
//change url...
//fix filename
const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command("test", "View the parsed output from the csv file") // "Upload a file to the server")
    .example("$0 upload -f file.txt ",
    "View the parsed output from the csv file")
    .example("node post_csv.js upload -f COOIS_components.txt -p Work_ctr bar Material_Description Reqmt_Date StgInd")

    .alias("f", "file")
    .nargs("f", 1) //requires 1 arg for option
    .describe("f", "Load a file")
    .demandOption(["f"])

    .command("upload", "Upload a file to the server")
    .example("$0 upload -f file.txt ",
    "Upload a file to the server")

    .alias("f", "file")
    .nargs("f", 1) //requires 1 arg for option
    .describe("f", "Load a file")
    .demandOption(["f"])

    .alias("p", "parameters")
    .nargs("p", 5) //requires 1 arg for option
    .describe("p", "List the: department, graph type, label, date, data point (should be a number)")

    .help('h')
    .alias('h', 'help').argv
    //department type label date data
//chart name is the filename
var key_array = ["Work_ctr", 'bar', "Material_Description", "Reqmt_Date", "Qty_wthdrn"]

if (argv._.includes('test')) {
    log_csv(argv.file, 'one')
}

if (argv._.includes('upload')) {
    key_array = argv.parameters
    console.log(key_array)
    upload_csv(argv.file, url, key_array)
}
