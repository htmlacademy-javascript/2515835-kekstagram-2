import { generateComments } from './comments.js';
import { getRandomInt } from './utils.js';

export function generatePhotos() {
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
