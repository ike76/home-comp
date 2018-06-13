import faker from "faker";
import uuid from "uuid/v1";

const fakeHome = () => ({
  _id: uuid(),
  location: {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude()
  },
  attributes: {
    price: {
      value: faker.random.number(1000000)
    },
    square_ft: {
      value: faker.random.number(5000)
    },
    bedrooms: {
      value: faker.random.number(5)
    },
    kitchen: {
      value: faker.random.number(7),
      images: [],
      selectedImageIndex: 0
    }
  }
});

export { fakeHome };
