const baseUrl = 'https://www.reddit.com/';
const jsonPostfix = '.json';
const subRedditsPostfix = 'reddits.json';

export async function sendRequest(
  url: RequestInfo,
  requestParams: RequestInit,
) {
  let response = await fetch(url, requestParams);
  let result;

  try {
    result = await response.json();
  } catch (e) {
    result = { error: e };
  }
  return result;
}

class RedditAPI {
  static async getFeed(subreddit = '') {
    return sendRequest(`${baseUrl}r/${subreddit}${jsonPostfix}`, {});
  }

  static async fetchNextFeed(subreddit = '', lastPostName: string) {
    return sendRequest(
      `${baseUrl}${subreddit}${jsonPostfix}?count=25&after=${lastPostName}`,
      {},
    );
  }

  static async getComments(permalink: string) {
    return sendRequest(`${baseUrl}${permalink}${jsonPostfix}`, {});
  }

  static async getSubreddits() {
    return sendRequest(`${baseUrl}${subRedditsPostfix}`, {});
  }

  static async getNextSubreddits() {}
}

export default RedditAPI;
