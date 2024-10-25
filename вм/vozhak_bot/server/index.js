const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/default.json');

const app = express();
const PORT = 5000
mongoose.connect('mongodb+srv://<dimshipunov>:<2X0CnyGEA9kz3dzg>@<vozhakDatabase>.mongodb.net/<products.productsBase>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    desc: String,
    image: String,
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products)
        res.json(products);
    } catch (err) {
        res.status(500).send('Error fetching products');
    }
});

// Удаление продукта по ID
app.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        res.status(200).send('Product deleted');
    } catch (err) {
        res.status(500).send('Error deleting product');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});