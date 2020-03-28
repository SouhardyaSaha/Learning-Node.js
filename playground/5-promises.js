const doWorkWithPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 2, 1]);
    }, 2000);
});

doWorkWithPromise.then((result) => {
    console.log(result);

}).catch((error) => {
    console.log(error);

});