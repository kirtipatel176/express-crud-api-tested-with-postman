const express = require('express');
const cors = require('cors');
const app = express();
const{body, validationResult} = require('express-validator');
const port=5001;

//middleware 

app.use(cors());
app.use(express.json());

//sample products

let products =[
    {id :1, name: 'iphone'},
    {id :2, name: 'samsung'},
]

//get: home route 

app.get('/', (req, res) => {
    res.send('Welcome to the Product API');
});

//get all products 

app.get('/products', (req, res) => {
    res.json(products);
}); 

//get : product by id 

app.get('/products/:id', (req, res) => {
    const product=products.find(p=>p.id === parseInt(req.params.id));
    if(!product)  return res.status(404).send('Product not found');

    res.json(product);
});   
//post : add a new product 

app.post(
  '/products',
  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);

    // If validation errors, send them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProduct = {
      id: products.length + 1,
      name: req.body.name
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

//put : update a product 

app.put ('/products/:id', (req, res) => { 
    const product=products.find(p=>p.id ===parseInt(req.params.id));
    if(!product) return res.status(404).send('Product not found');

    product.name= req.body.name || product.name;
    res.json(product);
});

//delete : delete the a product 
app.delete('/products/:id', (req, res) => { 
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');

    products.splice(productIndex, 1);
    res.status(204).send(
        'Product successfully deleted'
    );
}); 


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);      
});