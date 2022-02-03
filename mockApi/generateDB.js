import faker from 'faker';

const generateData = () => {
  let posts = [];
  let reservations = [];
  let users = [];

  for (let id = 1; id <= 10; id++) {
    const userId = faker.datatype.number({ min: 1, max: 10 });
    const postId = faker.datatype.number({ min: 1, max: 10 });
    const title = faker.random.words(6);
    const information = faker.random.words(6);
    const numberOfPeople = faker.datatype.number();
    const pricePerNight = faker.datatype.number();
    const localisatiom = {
      address: faker.address,
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
    };
    const imageUrlList = new Array(5).fill('').map((i) => (i = faker.random.image()));
    const amenities = new Array(5).fill('').map((i) => (i = faker.random.words(4)));
    const dateStart = faker.date.between('2022-01-01', '2022-01-20');
    const dateEnd = faker.date.between('2022-01-20', '2022-01-30');

    posts.push({
      id,
      userId,
      title,
      information,
      localisatiom,
      amenities,
      pricePerNight,
      numberOfPeople,
      imageUrlList,
    });

    reservations.push({
      id,
      dateStart,
      dateEnd,
      userId,
      postId,
    });
  }

  return { users, posts, reservations };
};

console.log(JSON.stringify(generateData()));
