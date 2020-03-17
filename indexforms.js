// =================== machine ========================

router.post('/bot/generic',(req, res) => {
    var graphitems = req.body
    console.log(graphitems)
    res.send(graphitems.length + "... receieved")
    /*
    GraphData.insertMany(graphitems).then(() => {
      console.log("data uploaded");
      res.send("data uploaded")
     }).catch((err) => {
      console.log("data upload failed" + err);
      res.send("data upload failed")
    });
    */
  });