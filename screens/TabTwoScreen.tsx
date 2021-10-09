import React, { useState, useEffect } from 'react';
import {
  Button,
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={values.subreddit}
              onChangeText={handleChange('subreddit')}
              placeholder="&#128269;subreddit"
              placeholderTextColor="#757575"
            />
            <TouchableOpacity
              onPress={
                handleSubmit as unknown as (
                  event: GestureResponderEvent,
                ) => void
              }
              aria-label="search"
            >
              <MaterialIcons
                name="send"
                size={18}
                color="#757575"
                style={{ paddingHorizontal: 15 }}
              />
            </TouchableOpacity>
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
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(Dimensions.get('window').width - 55, 450),
    height: 35,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
  },
  searchInput: {
    textAlign: 'center',
    flex: 1,
    height: 35,
    fontFamily: 'montserrat',
  },
  title: {
    fontSize: 20,
  },
  subredditName: {
    fontFamily: 'montserrat',
    width: '100%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
