import i18next from 'i18next';

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        ADD_CHANNEL: 'Something went wrong during creating the channel. Please try again.',
        EDIT_CHANNEL: 'Something went wrong during editing the channel. Please try again.',
        REMOVE_CHANNEL: 'Something went wrong during removing the channel. Please try again.',
      },
    },
  },
});

export default i18next;
