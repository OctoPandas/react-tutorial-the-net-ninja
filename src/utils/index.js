import faker from 'faker';

export function http(data, delay = 0.8) {
  delay *= 1000;
  return (...args) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (typeof data !== "function") resolve(data);
        else resolve(data(...args));
      }, delay);
    });
}

export const rndAge = () =>
  faker.random.number({
    min: 14,
    max: 50
  });
export const rndAddr = faker.address.streetAddress;
export const rndName = faker.name.findName;
export const rndPhr = faker.hacker.phrase;
export const rndSlug = faker.lorem.slug;
