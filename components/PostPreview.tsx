import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

import { Child, ChildData } from '../types/subredditData';
import { Text, TextProps, View } from './Themed';

type PostPreviewProps = {
  data: Child;
};
export const PostPreview = (props: PostPreviewProps) => {
  const { id: postid } = props.data.data;

  let { title } = props.data.data;

  return (
    <View style={styles.container}>
      <Text key={`${postid}-title`} style={styles.title}>
        {/* the .replaceAll removes the quotations on either end of the string */}
        {title.replaceAll('^"|"$', '')}
      </Text>
      <Text key={postid} style={styles.post}>
        {/* the .replaceAll removes the quotations on either end of the string */}
        {title.replaceAll('^"|"$', '')}aaaaa
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginBottom: 10,
          marginRight: 10,
        }}
      >
        <Text>&#x21c5;</Text>
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
