let error = (err) => {
    if (err) {
        console.log(err);
        return;
    }
};

let success = (res, data) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.write(data);
    res.end();
};

let baseMeme = (id, title, memeSrc, description, privacy) => {
    return {
        id: id,
        title: title,
        memeSrc: memeSrc,
        description: description,
        privacy: privacy,
        dateStamp: Date.now()
    };
};


module.exports = {
    error: error,
    success: success,
    baseMeme: baseMeme
};