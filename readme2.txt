The program parses a CSV file and uploads it to the TE Connectivity QCPC server.
Example:
node post_csv.js upload -f COOIS_components.txt -p Work_ctr bar Material_Description Reqmt_Date StgInd

-f specifies the file location relative to the base directory
-p requires the csv field names as arguments and sets the
  department, type, label, date and data fields respectively

all uploaded data is persisted in the server's database.

All Chart data points are a JSON object of the type:

const data = ({
    title: "title",
    department: "Fibre",
    type: 'pareto',
    label: 'new turnback label',
    date: new Date(),
    data: 1,
})

Chart Fields

title:
Any string but must be unique for each new chart. The program sets the filename
as the title.

department:
The value is interpereted as a string. This is used as an indentifier to
categorize the charts according to department. The text is the same as is used
in the dashboard homepage: http://nzl57wstdashbd/dashboard/home
Hence "Link" = Link and "New Department" = New Department

There is a mapping function located in Parse.js and maps as follows:

[[230, 220, "HIAA"], [400, "Fibre"], [240, "HELLA"],
[910, "Eaton"], [565, "JCI-Sales Kits"], [520,  520, 521, 522, 523, 525, 571, 572, "JCI-Special"],
[ 104, 105, 120, 205, "Cable"], [232, 233, "Link"], [507, 506, 517, 550, 566, 568, 680, "None"],
[505, 518, 510, 508, "PCB"], [265, "Rail"], [291, "Rocket Lab"] ];


type:
Sets the graph type (configured in the program arguments). It can be of any one
of: ['line', 'bar', 'radar', 'bubble', 'polarArea', 'scatter', 'mixed']
Defaults to 'line' for unrecognized input

label:
Identifies each specific graph item. This will be viewed as the x axis label.

date:
date associated. All charts entries are organized by date and show the current week or
month

data:
Must be a number. If it is undefined, it defaults to zero.
