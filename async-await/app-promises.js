const users = [
  {
    id: 1,
    name: 'Lukas',
    schoolId: 101
  },
  {
    id: 2,
    name: 'Oreo',
    schoolId: 234
  }
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 99
  },
  {
    id: 2,
    schoolId: 234,
    grade: 120
  },
  {
    id: 3,
    schoolId: 101,
    grade: 50
  }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}`);
    }
  });
};

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getStatus = async userId => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  return `${user.name} has a ${average}% in the class`;
};

getStatus(2)
  .then(status => console.log(status))
  .catch(e => console.log(e));
