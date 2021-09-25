import React, { useState, useEffect } from 'react';
import { Button, GestureResponderEvent, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, TextInput, View } from '../components/Themed';
import RedditAPI from '../api/reddit-api';
import { translate } from '../api/translate-api';
import { SearchResults } from '../components/SearchResults';
import { ScrollView } from 'react-native-gesture-handler';

type FormData = {
  subreddit: string;
};

export default function TabTwoScreen() {
  const [redditData, setRedditData] = useState<any>(null);

  async function getSubredditPosts(data: FormData) {
    try {
      const s = await RedditAPI.getFeed(data.subreddit);
      setRedditData(s['data']);
    } catch (e) {}
  }

  return (
    <View style={styles.container}>
      <Formik initialValues={{ subreddit: '' }} onSubmit={getSubredditPosts}>
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.input}
              value={values.subreddit}
              onChangeText={handleChange('subreddit')}
              placeholder="&#128269;subreddit"
              placeholderTextColor="#757575"
            />
            <Button
              title="Submit"
              onPress={
                handleSubmit as unknown as (
                  event: GestureResponderEvent,
                ) => void
              }
            />
          </View>
        )}
      </Formik>

      {redditData && (
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={styles.subredditName}>
            {redditData['children'][0]['data']['subreddit_name_prefixed']}
          </Text>
        </View>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {redditData && <SearchResults data={redditData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    marginTop: 35,
    paddingLeft: 100,
    width: 264,
    height: 35,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderRadius: 10,
    fontFamily: 'montserrat',
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  subredditName: {
    fontFamily: 'montserrat',
    width: '100%',
    // textAlign: 'left',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
