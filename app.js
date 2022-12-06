const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;

  const data  = {
     members: [
       {
       email_address: email,
       status: "subscribed",
       merge_fields: {
                FNAME: firstname,
                LNAME: lastname
       }
     }
   ]
 };

 const jsonData = JSON.stringify(data);
 const url = "https://us21.api.mailchimp.com/3.0/lists/3234833833";
 options = {
   method: "POST",
   auth: "ankush:76ef95a84640e7ff2d0d232ff5c9daf0-us21"
 }

 const request = https.request(url, options, function(response){

   if(response.statusCode === 200){
     res.sendFile(__dirname + "/sucess.html");
   }else{
     res.sendFile(__dirname + "/failure.html");
   }

   response.on("data", function(data){
     console.log(JSON.parse(data));
   })
 })

 request.write(jsonData);
 request.end()


});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("server start at port 3000....");
});

//API key
//76ef95a84640e7ff2d0d232ff5c9daf0-us21

//List ID
// 3234833833
