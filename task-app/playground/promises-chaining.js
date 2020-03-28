require('../src/db/mongoose');
const User = require('../src/models/user');

// Without async await
// User.findByIdAndUpdate('5e7a560a799c0b419c1374e6', { age: 23 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 23 });
// }).then((count) => {
//     console.log(count);

// }).catch((error) => {
//     console.log(error);

// })

const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return  count;

}

updateAgeAndCount('5e7a560a799c0b419c1374e6', 23).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);

})