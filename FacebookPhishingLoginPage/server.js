const express=require("express")
const bodyParser=require("body-parser")
const mysql=require("mysql")



const app = express();
const port = 4000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginpassworddata',
  });



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('Public'));


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const sql = 'INSERT INTO datatable (Login, Password) VALUES (?, ?)';
      db.query(sql, [username, password], (error, result) => {
        if (error) {
          console.error('Error saving data to the database:', error);
          // Display an error message if there is an issue with the database
          res.send(`<p class="error-message">An error occurred. Please try again later.</p>`);
        } else {
          // Display a success message if the data is saved successfully
          res.send(`
            <div class="login-container">
              <p class="success-message">Login successful!</p>
            </div>
          `);
        }
      });
  })



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

