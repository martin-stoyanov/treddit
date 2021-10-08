import axios from 'axios';
// @ts-ignore
import { TRANSLATE_API_KEY } from 'react-native-dotenv';

var endpoint = 'https://api.cognitive.microsofttranslator.com';

export const translate = async (text: string) => {
  const response = await axios({
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
  });
  // console.log(JSON.stringify(response, null, 4));
  return detectLanguage(text);
};

const detectLanguage = async (text: string) => {
  const response = await axios({
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
  });
  // console.log(text);
  // console.log(JSON.stringify(response.data[0].translations[0].text, null, 4));
  return JSON.stringify(response.data[0].translations[0].text, null, 4);
};
