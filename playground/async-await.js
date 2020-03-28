const add = (a, b) => {

    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) return reject('values cant be neg');

        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });

}

const doWork = async () => {

    const sum1 = await add(5, 4);
    const sum2 = await add(10, sum1);
    const sum3 = await add(-45, sum2);

    return sum3;
}

doWork().then((result) => {
    console.log(result);

}).catch((error) => {
    console.log(error);

});