import Cookies from 'js-cookie';
import faker from 'faker';

const cookieProp = 'userName';

export const getUserName = () => {
  const name = Cookies.get(cookieProp);

  if (name) return name;

  const newName = faker.name.findName();

  Cookies.set(cookieProp, newName);

  return newName;
};

export const testFn = (f) => f;
