const express = require("express")
const connectDB = require("./models/db")
const engine = require("express-handlebars").engine
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express();
// const route = require("./controllers/routes")

connectDB();


app.use(express.json()); // accepts json data
app.use(express.urlencoded({extended : true}));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get("/", (req, res)=> {
    res.render("home");
});

app.use('/emp', require('./controllers/routes'));
// app.use('/admin', require('./controllers/admin'));

const PORT = process.env.PORT || 5050
app.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost/${PORT}`)
})