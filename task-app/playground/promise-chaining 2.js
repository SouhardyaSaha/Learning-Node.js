require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e7b4e2db01f6f101093faf6').then((result) => {
//     console.log(result);
//     return Task.countDocuments({age: 25});
// }).then((count) => {
//     console.log(count);
    
// }).catch((error) => {
//     console.log(error);
    
// });


const deleteByIdAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({});

    return count;
};


deleteByIdAndCount('5e7b4e0ed66d332ce4bf66e6').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
    
})

