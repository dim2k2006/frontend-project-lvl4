import Cookies from 'js-cookie';
import faker from 'faker';

const cookieProp = 'userName';

const setUserName = () => {
  const name = faker.name.findName();

  Cookies.set(cookieProp, name);

  return name;
};

const getUserName = () => {
  const name = Cookies.get(cookieProp);

  return name;
};

export const genUserName = () => {
  const name = getUserName();

  if (name) return name;

  const newName = setUserName();

  return newName;
};

export const testFn = (f) => f;
