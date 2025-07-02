// const { error } = require('console');
// const fs=require('fs');
// const path=require('path');

// //create the file 
// const filePath = path.join(__dirname, 'data.txt');

// if(!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, 'Hello, World!', 'utf8');
//     console.log('File created successfully!');
// }
// else {
//     console.log('File already exists.');
// }


// //read the file 
// if(fs.existsSync(filePath))
// {
//   const content=fs.readFileSync(filePath, 'utf8');
//   console.log('File content:', content);

// }
// else
// {
//   console.error('File does not exist.');
// }

// //update the files 

// if(fs.existsSync(filePath))
// {
//   fs.writeFileSync(filePath, ' this is a second chance!', 'utf8');
//   console.log('File updated successfully!');
// }
// else
// {
//   console.error('File does not exist, cannot update.');
// }

// //delete the file 

// if(fs.existsSync(filePath))
// {
//   fs.unlinkSync(filePath);
//   console.log('File deleted successfully!');
// }
// else
// {
//   console.error('File does not exist, cannot delete.');
// }



// const http = require('http');

// const server = http.createServer((req, res) =>  {
  
//   const url=req.url;

//   if(url === '/') {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>Welcome to the Home Page</h1>');
//   }
//   else if(url === '/about') {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>About Us</h1>');
    
//   }
//   else if(url === '/contact') {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>Contact Us</h1>');
//   }
//     });
    
//     const port= 4000;

//     server.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     } );  


// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// const fs=require('fs');
// const path=require('path');

// //create the file 

// const filepath= path.join(__dirname, 'data.txt');

// if(!fs.existsSync(filepath)) {
//     fs.writeFileSync(filepath, 'Hello i am kirtipatel', 'utf8');
//     console.log('File created successfully!');
// }
// else {
//     console.log('File already exists.');
// }

// //read the file 
// if(fs.existsSync(filepath))
// {
//  const content=fs.readFileSync(filepath, 'utf8');
//     console.log('File content:', content);
// }
// else{
//     console.error('File does not exist.');
// }

// //update the files 

// if(fs.existsSync(filepath))
// {
//     fs.writeFileSync(filepath, ' this is a second chance!', 'utf8');
//     console.log('File updated successfully!');
// }
// else
// {
//     console.error('files does not exist,cannot be updated.');
// }


// //detele the file 

// if(fs.existsSync)
// {
//     fs.unlinkSync(filepath);
//     console.log('File deleted successfully!');  
// }
// else
// {
//     console.error('File does not exist, cannot delete.');
// }

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// app.use(cors());
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// }); 


// const http = require('http');
// const port =3001;
// const server = http.createServer((req, res) => {
//     const url=req.url;

//     if(url === '/')
//     {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end('<h1>Welcome to the Home Page</h1>');
//     }
//     else if(url ==='/about')
//     {
//         url.writeHead200, {'Content-Type': 'text/html'};
//         res.end('<h1>About Us</h1>');   
//     }
// });

// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mobile' }
];

app.get('/products', (req, res) => {
  res.json(products);
});

//add a products
app.post('/products', (req, res) => {
  console.log("POST /products hit ✅");
  const newProduct = {
    id: products.length + 1,
    name: req.body.name
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//update the code
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  product.name = req.body.name;
  res.json(product);
});


app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send("Product not found");

  products.splice(productIndex, 1);
  res.send("Product successfully deleted");
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
