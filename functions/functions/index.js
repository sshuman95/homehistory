const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express= require('express');
const app = express();
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(`/reports/homereport/:Query`,(req,res)=>{
    admin.firestore().collection('Reports').where('Query','==',req.params.Query)
    .get()
    .then((data) => {
        let reports = [];
        data.forEach(doc=>{
            reports.push(doc.data())
        });
        return res.json(reports);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        return response.status(500).json({error:'Something went wrong'});
      });
});

app.get(`/reports/sampledata/:Query`,(req,res)=>{
    admin.firestore().collection('Count').where('Query','==',req.params.Query)
    .get()
    .then((data) => {
        let reports = [];
        data.forEach(doc=>{
            reports.push(doc.data())
        });
        return res.json(reports);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        return response.status(500).json({error:'Something went wrong'});
      });
});

app.get(`/reports/:User`,(req,res)=>{
    admin.firestore().collection('Users').where('UserId','==',req.params.User)
    .get()
    .then((data) => {
        let reports = [];
        data.forEach(doc=>{
            reports.push(doc.data())
        });
        return res.json(reports);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        return response.status(500).json({error:'Something went wrong'});
      });
})



app.post('/reports',(request,response)=>{
    const newReport = {
        State: request.body.State,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        Zip:request.body.Zip,
        City:request.body.City,
        Address:request.body.Address,
        Business:request.body.Business,
        Specialty:request.body.Specialty,
        Contact:request.body.Contact,
        Query:request.body.Query,
        Details:request.body.Details
        
    };

    const sampleReport ={
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        Query:request.body.Query
    };
    admin.firestore()
    .collection('Reports')
    .add(newReport)
    .then(doc=>{
        response.json({message:`document ${doc.id} was created`})
    })
    .catch(err=>{
        console.error(err);
        return response.status(500).json({error:'Something went wrong'});
        
    });
    admin.firestore()
    .collection('Count')
    .add(sampleReport)
    .then(doc=>{
        response.json({message:`document ${doc.id} was created`})
    })
    .catch(err=>{
        console.error(err);
        return response.status(500).json({error:'Something went wrong'});
        
    });


});

app.post('/emails',(request,response)=>{
    var newEmail = {
        Name:request.body.Name,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        Email:request.body.Email,
        Comment:request.body.Comment,
        Phone:request.body.Phone,
        Address:request.body.Address,
    };
    admin.firestore()
    .collection('Emails')
    .add(newEmail)
    .then(doc=>{
        response.json({message:`document ${doc.id} was created`})
    })
    .catch(err=>{
        response.status(500).json({error:'Something went wrong'});
        console.error(err);
    })
});



exports.api = functions.https.onRequest(app);