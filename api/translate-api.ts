import axios from 'axios';
// @ts-ignore
import { TRANSLATE_API_KEY } from 'react-native-dotenv';

var endpoint = 'https://api.cognitive.microsofttranslator.com';

export const translate = () => {
  axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': TRANSLATE_API_KEY,
      'Content-type': 'application/json',
    },
    params: {
      'api-version': '3.0',
      from: 'en',
      to: ['de', 'it'],
    },
    data: [
      {
        text: 'Hello World!',
      },
    ],
    responseType: 'json',
  }).then(function (response: { data: any }) {
    console.log(JSON.stringify(response.data, null, 4));
  });
};

const detectLanguage = () => {
  axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': TRANSLATE_API_KEY,
      'Content-type': 'application/json',
    },
    params: {
      'api-version': '3.0',
      to: ['de', 'it'],
    },
    data: [
      {
        text: 'Hello World!',
      },
    ],
    responseType: 'json',
  }).then(function (response) {
    console.log(JSON.stringify(response.data, null, 4));
  });
};
