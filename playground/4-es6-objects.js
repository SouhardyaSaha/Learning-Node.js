// const name = 'Souhardya';
// const userAge = 23;

// const user = {
//     name, // equivalents to (name: name),
//     age: userAge,
// };

// console.log(user)


//  object destructuring
const product = {
    label: 'Watch',
    price: 3,
    stock: 23,
    salePrice: undefined,
    rating: 3.4
};

// rating will be 5 when there is no rating in the product object
// renaming the label variable to productLabel Variable
const { label: productLabel, price, rating = 5 } = product;

console.log(productLabel);
console.log(price);
console.log(rating);

