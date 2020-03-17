const csv=require('csvtojson');

var keyvaluearray = [[230, 220, "HIAA"], [400, "Fibre"], [240, "HELLA"],
[910, "Eaton"], [565, "JCI-Sales Kits"], [520,  520, 521, 522, 523, 525, 571, 572, "JCI-Special"],
[ 104, 105, 120, 205, "Cable"], [232, 233, "Link"], [507, 506, 517, 550, 566, 568, 680, "None"],
[505, 518, 510, 508, "PCB"], [265, "Rail"], [291, "Rocket Lab"] ];

//iterate over
function mapDepartment(keyarray, key) {
  //keyarray.forEach((map) => {
  for(var n=0;n<(keyarray.length-1);n++) {
    var map = keyarray[n]
    for(var i=0;i<(map.length-1);i++) {
      if (key === map[i]) {
        return map[map.length-1] //[map.length]
      }
    }
  }
  return null
}

function codemap (code) {
  //let codedepartmentmap = new Map(keyvaluearray);
  var coderet =  mapDepartment(keyvaluearray, code);

  if (coderet === null) {
    return code
  } else {
    return coderet;
  }
}

function cleanline (line) {
    var result = line.
        replace(/\t/g, ',').
        replace(/ /g, '_').
        replace(/__+/g, '').
        replace(/\"/g, ' inches').
        replace(/(\d)\.(\d)/g, '$1/$2').
        replace(/\./g, '');
    var count = (result.match(/,/g) || []).length;

    if(count > 4) {
        return result;
    } else {
        return ' , ';
    }
  }

  function resetheaders (jsonObj) {
    var headerobj = [];
    var header = jsonObj[0];

    jsonObj.forEach(function (element, index) {
        var jsonString = "{"
        for(var key in element) {
            jsonString +='\"'+header[key]+'\"'+": "+'\"'+element[key]+'\",';
        }
        jsonString+="\"empty\":\"empty\"}";

        var cleanstring = jsonString.
        replace(/\'/g, '').
        replace(/\n/g, '').
        replace(/\r/g, '')

        var jsonelement = JSON.parse(cleanstring);

        headerobj[index] = jsonelement;
    });
    return headerobj;
  }

  async function SAPCSV(csvFilePath) {
    const parsedcsv = await csv({
        ignoreEmpty: true,
    })
    .on('header',(header)=>{

    })
    .preFileLine((line) => {
        return cleanline(line);
    })
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        return resetheaders(jsonObj);
    })

    return parsedcsv
  }

module.exports = {
    SAPCSV,
    codemap,
}
