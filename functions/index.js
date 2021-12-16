const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51JCke9SCIjL5FaavlTe3yASjIeQckaQQCwwoZ56dMPHiwgRUaGIRwCeQj5fgG29qPaxBZ5bS97W9kJcBtVc6FjsI00nwr1mM82')

const app = express();


app.use(cors({origin: true}));
app.use(express.json());


app.get('/',(request,response) => response.status(200).send("hello world"))

app.post('/payments/make', async (request,response) => {
    const total = request.query.total;

    console.log("Payment request recieved BOOM",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency:"INR",
    });

    // console.log("iPAYMENT_INTENT",paymentIntent)
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })

})

exports.api = functions.https.onRequest(app)

//http://localhost:5001/clone-95c38/us-central1/api