class product {
    constructor(productDetails) {
        this.name = productDetails.name;
        this.cost = productDetails.cost;
        this.type = productDetails.type;
        this.img = productDetails.img;
        this.id = this.createID();
    }

    createID() {
        return 1;
    }
}

const products =  [
    {
        name: "Chocolate Eclair",
        cost: 500,
        type: "eclair",
        img: "images/productImgs/chocolateEclair.jpg"
    },
    {
        name: "Strawberry Eclair",
        cost: 500,
        type: "eclair",
        img: "images/productImgs/strawberryEclair.jpg"
    },
    {
        name: "Matcha Opera",
        cost: 750,
        type: "opera",
        img: "images/productImgs/matchaOpera.jpg"
    },
    {
        name: "Chocolate Opera",
        cost: 750,
        type: "opera",
        img: "images/productImgs/chocolateOpera.jpg"
    },
    {
        name: "Raspberry Opera",
        cost: 750,
        type: "opera",
        img: "images/productImgs/raspberryOpera.jpg"
    },
    {
        name: "Strawberry Opera",
        cost: 750,
        type: "opera",
        img: "images/productImgs/strawberryOpera.jpg"
    },
    {
        name: "Orange Maccaron",
        cost: 250,
        type: "maccaron",
        img: "images/productImgs/orangeMaccaron.jpg"
    },
    {
        name: "Pistachio Maccaron",
        cost: 250,
        type: "maccaron",
        img: "images/productImgs/pistachioMaccaron.jpg"
    },
    {
        name: "Cherry Maccaron",
        cost: 250,
        type: "maccaron",
        img: "images/productImgs/cherryMaccaron.jpg"
    },
    {
        name: "Lemon Maccaron",
        cost: 250,
        type: "maccaron",
        img: "images/productImgs/lemonMaccaron.jpg"
    },
    {
        name: "Blueberry Maccaron",
        cost: 250,
        type: "maccaron",
        img: "images/productImgs/blueberryMaccaron.jpg"
    },
    {
        name: "Yuzu Moose",
        cost: 1250,
        type: "moose",
        img: "images/productImgs/yuzuMoose.jpg"
    },
    {
        name: "Berry Moose",
        cost: 1250,
        type: "moose",
        img: "images/productImgs/berryMoose.jpg"
    },
    {
        name: "Passionfruit Souffle",
        cost: 1000,
        type: "souffle",
        img: "images/productImgs/passionfruitSouffle.jpg"
    },
    {
        name: "Chocolate Souffle",
        cost: 1000,
        type: "souffle",
        img: "images/productImgs/chocolateSouffle.jpg"
    }
]

export const productsClassed = products.map((productDetails) => new product(productDetails));

export function getProduct(productName) {
    let matchingProduct;
    products.forEach((product) => {
        if(product.name === productName) {
            matchingProduct = product;
        }
    })
    return matchingProduct;
}