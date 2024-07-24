const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const StudentSchema = new mongoose.Schema(
  {
    Name: String,
    SID: String
  },
  {
    collection: "s24students"
  }
)

// Create a Model object
const StuModel = mongoose.model("student", StudentSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  const myuri = req.body.myuri;

  try {
    // Connect to the database
    await mongoose.connect(myuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create and save a new student document
    const student = new StuModel({
      Name: "Lovish Dhanda",
      SID: "300377652",
    });
    await student.save();

    // Send a response to the user
    res.send(`<h1>Document Added to Database</h1>`);
  } catch (error) {
    res.status(500).send(`<h1>Error: ${error.message}</h1>`);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});





