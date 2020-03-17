//cable: 104, 105, 120, 205
//hiaa: 220, 230
//jic specials

//introduces significant overhead
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

console.log(codemap(505)) //mapDepartment(keyvaluearray, 230))
