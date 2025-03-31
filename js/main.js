function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

function generateComments() {
  const comments = [];
  const commentMessages = [
      "Всё отлично!",
      "В целом всё неплохо. Но не всё.",
      "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
      "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
      "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
      "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];

  const names = [
      "Артём",
      "Мария",
      "Дмитрий",
      "Екатерина",
      "Сергей",
      "Анна",
      "Иван",
      "Ольга",
      "Алексей",
      "Татьяна"
  ];

  const numberOfComments = getRandomInt(0, 30);
  const usedCommentIds = new Set();

  for (let i = 0; i < numberOfComments; i++) {
      let commentId;
      do {
          commentId = getRandomInt(1, 1000); // Генерируем случайный id для комментария
      } while (usedCommentIds.has(commentId));
      usedCommentIds.add(commentId);

      comments.push({
          id: commentId,
          avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
          message: getRandomElement(commentMessages),
          name: getRandomElement(names)
      });
  }

  return comments;
}

function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
      photos.push({
          id: i,
          url: `photos/${i}.jpg`,
          description: `Описание фотографии номер ${i}.`,
          likes: getRandomInt(15, 200),
          comments: generateComments()
      });
  }

  return photos;
}

// Генерация массива фотографий
const photosArray = generatePhotos();
console.log(photosArray);
