import axios from 'axios';
// @ts-ignore
import { TRANSLATE_API_KEY } from 'react-native-dotenv';

var endpoint = 'https://api.cognitive.microsofttranslator.com';

export const translate = (text: string) => {
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
      to: ['en', 'de'],
    },
    data: [
      {
        text: text,
      },
    ],
    responseType: 'json',
  }).then(function (response: { data: any }) {
    console.log(JSON.stringify(response.data, null, 4));
    detectLanguage(text);
  });
};

const detectLanguage = (text: string) => {
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
      to: ['en', 'de'],
    },
    data: [
      {
        text: text,
      },
    ],
    responseType: 'json',
  }).then(function (response) {
    console.log(text);
    console.log(JSON.stringify(response.data, null, 4));
  });
};
