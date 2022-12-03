const energyCost = 30;
class Product 
{
    id;
    name;
    model;
    productionAge;
    price;

    constructor(id, name, model, price, productionAge, energyExpanditure) 
    {
        energyExpanditure;
        this.name = name;
        this.id = id;
        this.price = price;
        this.model = model;
        this.energyExpanditure = energyExpanditure;
        this.productionAge = productionAge;
    }
  
    toString() 
    {
        return `id:${this.id} 
        name: ${this.name} 
        model: ${this.model} 
        price: ${this.price}
        production age: ${this.productionAge}
        energy expediture: ${this.energyExpanditure} `;
    }

    getPrice() 
    {
        return this.price;
    }

    getEnergyCost() 
    {
        return this.energyExpanditure * energyCost;
    }

    getProductAge() 
    {
        const today = new Date();
        return today.getFullYear() - this.productionAge;
    }

    getProductAgeInYears() 
    {
        const today = new Date().getFullYear();
        if (today - this.productionAge < 2) 
        {
            return `${today - this.productionAge} rok`;
        } 
        else 
        {
            return `${today - this.productionAge} lata`;
        }
    }
}

class ProductList 
{
    products;
    constructor() 
    {
        this.products = [];
    }

    printProduct(productId) 
    {
        return this.products.map((product) => 
        {

            if (product.id == productId) 
            {
                return product.toString();
            }
        })[0];
    }

    printProducts() 
    {
        let string = "";
        const products = this.products.map((product) => 
        {
            string += product.toString();
        });
        return string;
    }

    addProduct(product) 
    {
        const isAdded = this.isProductAdded(product.id);

        if (isAdded) 
        {
            throw new Error("Ten produkt jest juz na liscie");
        } 
        else 
        {
            this.products.push(product);
        }
    }

    isProductAdded(productId) 
    {
        const index = this.products.findIndex
        (
            (product) => product.id === productId
        );

        if (index === -1) 
        {
            return false;
        }

        return true;
    }

    replaceProduct(productId, product) 
    {
        this.products.forEach((pr) => 
        {
            if (pr.id === productId) 
            {
                pr.name = product.name;
                pr.model = product.model;
                pr.price = product.price;
                pr.productionAge = product.productionAge;
                pr.energyExpanditure = product.energyExpanditure;
            }
        });
    }

    findIndex(productId) 
    {
        return this.products.findIndex((product) => product.id === productId);
    }
}

class Warehouse extends ProductList 
{
    constructor() 
    {
        super();
    }

    addProduct(product, amount) 
    {
        const productWithAmount = { ...product, amount: amount };
        console.log(productWithAmount);
        super.addProduct(productWithAmount);
    }

    printProducts() 
    {
        for (let i = 0; i < this.products.length; i++) 
        {
            console.log(this.products[i]);
        }
    }

    removeProduct(id)
    {
        this.products.forEach(product => 
        {
            if(product.amount === 0 && product.id === id) 
            {
                throw new Error("Brak produktu w magazynie");
            }

            if(product.amount !== 0 && product.id === id) 
            {
                product.amount = product.amount - 1;
            }

        })
    }

    getProduct(...params) 
    {
        console.log(params);

        if (params.length === 1) 
        {
            const productId = params[0];
            const index = this.findIndex(productId);

            if (index === -1) 
            {
                throw new Error("Produktu nie ma!");
            }

            if (this.products[index].amount === 0) 
            {
                throw new Error("Nie mamy dostepnego produktu w magazynie");
            }

            this.products[index].amount = this.products[index].amount - 1;

            return {
                id: this.products[index].id,
                name: this.products[index].name,
                model: this.products[index].model,
                price: this.products[index].price,
                productionAge: this.products[index].productionAge,
                energyExpanditure: this.products[index].energyExpanditure,
            };
        } 
        else if (params.length == 2) 
        {
            const name = params[1];
            const model = params[0];
            const removedProduct = this.products.map((product) => 
            {
                if (product.model === model && product.name === name) 
                {
                    console.log(product);

                    if (product.amount === 0) 
                    {
                        throw new Error("Nie mamy takiej ilosci produktu w magazynie");
                    }

                    product.amount = product.amount - 1;

                    return {
                    id: product.id,
                    name: product.name,
                    model: product.model,
                    price: product.price,
                    productionAge: product.productionAge,
                    energyExpanditure: product.energyExpanditure,
                    };
                }
            })[0];
            return removedProduct;
        }
    }
}

class Shop extends ProductList 
{
    constructor() 
    {
        super();
    }

    addProduct(name, model, price, energyExpanditure) 
    {
        let id = Math.floor(Math.random() * 999);

        while (this.isIdUsed(id)) 
        {
            id = Math.floor(Math.random() * 999);
        }

        const productionAge = Math.floor(Math.random() * (2022-2001) + 2001);
        const product = new Product(id,name,model,price,productionAge,energyExpanditure)
        super.addProduct(product);
    }

    addProduct2(name, model,price,energyExpanditure,id)
    {
        const productionAge = Math.floor(Math.random() * (2022-2001) + 2001);
        const product = new Product(id,name,model,price,productionAge,energyExpanditure);
        super.addProduct(product);
    }

    makeOrder(...params)
    {
        const warehouse = params[params.length-1];
        params.pop();
        console.log(params);
        const items = params;
        items.forEach(item => 
        {
            console.log(item);
            warehouse.removeProduct(item);
        })

    }
}
const product = new Product(1, "odkurzacz", "toshiba v2", 3.5, 2000, 200);
const product2 = new Product(2, "telewizor", "samsung xd", 3.5, 2002, 200);
const productList = new ProductList();
productList.addProduct(product);
productList.addProduct(product2);
console.log(productList.products);

const warehouse = new Warehouse();
const amount = 3;
warehouse.addProduct(product, 5 );
warehouse.addProduct(product2, 5);
warehouse.printProducts();  

const shop = new Shop() 
shop.makeOrder(1 ,warehouse);

