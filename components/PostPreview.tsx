import * as React from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { MaterialIcons } from '@expo/vector-icons';

import { translate } from '../api/translate-api';
import { Child, ChildData } from '../types/subredditData';
import { Text, TextProps, View } from './Themed';

type PostPreviewProps = {
  data: Child;
};
export const PostPreview = (props: PostPreviewProps) => {
  const { id: postid } = props.data.data;

  // the .replaceAll removes the quotations on either end of the string
  const title: string = props.data.data.title.replaceAll('^"|"$', '');

  return (
    <View style={styles.container}>
      <Text key={`${postid}-title`} style={styles.title}>
        {title}
      </Text>
      <Text key={postid} style={styles.post}>
        {title}
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginBottom: 10,
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={(e) => translate(title)}
          aria-label="translate"
        >
          <MaterialIcons name="translate" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Math.min(Dimensions.get('window').width - 5, 450),
    shadowOpacity: 0.25,
    shadowRadius: 2,
    // blurRadius: 7,
    shadowOffset: { height: 2, width: 1 },
    borderRadius: 10,
    marginBottom: 25,
    // justifyContent: 'center',
  },
  title: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    fontFamily: 'montserrat_medium',
    textAlign: 'center',
    fontSize: 16,
  },
  post: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    fontFamily: 'montserrat',
    textAlign: 'left',
  },
});
