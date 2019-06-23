export const bookingEntity = {
    reservation:
        {
            ID: 1,
            IDCLIENT: 2,
            CHECKIN: '2019-03-24T23:00:00.000Z',
            CHECKOUT: '2019-03-27T23:00:00.000Z',
            IMPORT: 200,
            DEBT: 100,
            STATUS: 'OPEN',
        },
    client:
        {
            id: 2,
            NAME: 'Marina',
            SURNAME: 'Alonso',
            DNI: '44777666W',
            MAIL: 'marina@alonso.cat',
            PHONE: '654789023',
            BIRTHDATE: '22/06/1995'
        },
    hosts:
        [
            {ID: 1, NAME: 'nuevo1', DNI: '5655675M', BIRTHDATE: '1998-01-02T23:00:00.000Z'},
            {ID: 2, NAME: 'HOST', DNI: '63637', BIRTHDATE: null},
            {ID: 4, NAME: 'nuevo2', DNI: '5655175A', BIRTHDATE: '1998-01-02T23:00:00.000Z'}
        ],
    rooms: [
        {
            ID: 1,
            SIZE: "DOUBLE"
        },
        {
            ID: 2,
            SIZE: "SINGLE"
        }
    ]
};

export const bookingInsert = {
    IDCLIENT: 2,
    CHECKIN: '2019-03-24 23:00:00.000',
    CHECKOUT: '2019-03-27 23:00:00.000',
    IMPORT: 200,
    DEBT: 100,
    STATUS: 'OPEN',
};