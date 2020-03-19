 

const add = function (value1, value2, callback) {
    setTimeout(() => {

        sum = value1 + value2;
        callback(sum);

    }, 2000);
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
});