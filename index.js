import express from "express";
import bodyParser from "body-parser";


// crate obj og expree to define the handler
const app = new express();
const port = 3000;

// body data
app.use(bodyParser.urlencoded({ extended: true }));

// add middleware for static page
app.use(express.static("public"));

// my own middleware get URL

app.use(loggerURL);
var urlValue = "";

function loggerURL(req, res, next)  // next is used to continue to further and handover to your handler func().
{
  urlValue = req.url;
  console.log(`URL value: ${urlValue}`);
  next();
}

// get today handler
app.get("/",(req, res) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    let dayName = weekday[today.getDay()];

    const date = today.getDate();
    const month = today.getMonth();

    const monthName = monthToName(month);

    res.render("index.ejs", {
        ejsDate: date,
        ejsMonthName: monthName,
        ejsDayName: dayName,
        ejsTodayArray: todayArray,
    });
});

function monthToName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
  }

  // get /work hamdler
  app.get("/work",(req, res) => {

    res.render("index.ejs", {
      ejsDailyArray: DailyArray,
    });
  });

  // post form submission
  app.post("/submit",(req, res) => {
    
    const task = req.body["newItem"];
    //const checkTodayArray = req.body["ejsTodayArray"];
    //const checkDailyArray = req.body["ejsDailyArray"];

    if (req.body["todayItem"] != "") {
      todayArray.push(task);
      console.log(`Today: ${todayArray}`);           
    }
    else{
      if(req.body["dailyItem"] != "")
      {
          DailyArray.push(task);
      console.log(`Today: ${DailyArray}`);
      }
    
    }
    res.render("index.ejs",{
        //newTask: task,
        ejsDailyArray: DailyArray,
        ejsTodayArray: todayArray,
    });
    //console.log(task);
  });

// listerner
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  const todayArray =[
    "vegis","meat","Errand","sports"
  ]

  const DailyArray = [
    "Grocery","Polish","Fruits","soaps"
  ]