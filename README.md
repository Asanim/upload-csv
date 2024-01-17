# upload-csv

## Introduction

This program facilitates the parsing of CSV files and subsequent uploading to the QCPC server in graph format (JSON) for the dynamic display of arbitrary graphs.

## Usage Examples

To run the upload program, utilize the following command:

```bash
node post_csv.js upload -f COOIS_components.txt -p Work_ctr bar Material_Description Reqmt_Date StgInd
```

- The `-f` option specifies the relative file location from the base directory.
- The `-p` option necessitates CSV field names as arguments and configures the department, type, label, date, and data fields, respectively.

All uploaded data is persisted in the server's database for future reference and analysis.

## Chart Data Points

Each chart data point is represented as a JSON object:

```javascript
const data = {
    title: "title",
    department: "Fibre",
    type: 'pareto',
    label: 'new turnback label',
    date: new Date(),
    data: 1,
};
```

## Chart Fields

- **title**: A unique string for each new chart, often set as the filename by the program.
- **department**: Interpreted as a string, this field serves as an identifier to categorize charts based on department.
  - The text matches that used in the dashboard homepage: [Dashboard Homepage](http://nzl57wstdashbd/dashboard/home)
  - A mapping function in `Parse.js` maps values as follows:

    ```javascript
  [230, 220, "CompanyA"],
  [400, "FiberOptic"],
  [240, "AutomotiveCo"],
  [910, "ElecCorp"],
  [565, "TechSales"],
  [520,  521, 522, 523, 525, 571, 572, "TechSpecial"],
  [104, 105, 120, 205, "ConnectCable"],
  [232, 233, "NetworkLink"],
  [507, 506, 517, 550, 566, 568, 680, "NoCategory"],
  [505, 518, 510, 508, "PrintedCircuitBoard"],
  [265, "RailTransport"],
  [291, "AerospaceLab"]
    ```
- **type**: Sets the graph type (configured in the program arguments). It can be one of: ['line', 'bar', 'radar', 'bubble', 'polarArea', 'scatter', 'mixed']. Defaults to 'line' for unrecognized input.
- **label**: Identifies each specific graph item and serves as the x-axis label.
- **date**: Date associated with the data. All chart entries are organized by date and display the current week or month.
- **data**: A numerical value representing the data point. If undefined, it defaults to zero.

The program provides a flexible and efficient way to visualize and analyze data through dynamic graph generation on the QCPC server.

## Setting Up the Node.js Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Asanim/upload-csv.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd upload-csv
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the project root and add the necessary environment variables.

5. **Run the Program:**
   ```bash
   node post_csv.js <command> ...
   ```

   Replace `<command>` with the desired command and provide appropriate arguments as needed.

Now, the Node.js project is set up and ready to parse and upload CSV files to the QCPC server.