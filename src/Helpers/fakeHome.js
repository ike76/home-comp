import faker from "faker";
import uuid from "uuid/v1";

const fakeHome = () => ({
  id: uuid(),
  location: {
    attrName: null,
    boxType: "roof",
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude()
  },
  price: {
    boxType: "price",
    value: faker.random.number(1000000)
  },
  square_ft: {
    boxType: "number",
    value: faker.random.number(5000)
  },
  bedrooms: {
    boxType: "number",
    value: faker.random.number(5)
  }
});

export { fakeHome };
