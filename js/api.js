export const fetchPhotos = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }
      return response.json();
    });

export const sendFormData = (formData) =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
    return response.json();
  });
