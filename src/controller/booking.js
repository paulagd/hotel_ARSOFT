

export const getBooking = (req, res) => {
    res.status(200).send({
        bookings: [
            {id: 1},
            {id: 2}
        ]
    });
};