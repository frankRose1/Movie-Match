const usersController = {};

usersController.test = (req, res) => {
    const userData = {
        name: "John Boy",
        age: 25,
        phone: '123-456-7891',
        location: {
            street: '123 main street',
            city: 'New York',
            state: 'NY',
            zip: '10305'
        }
    };
    res.json(userData);
};

module.exports = {};