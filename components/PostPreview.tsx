import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import removeMarkdown from 'markdown-to-text';

import { translate } from '../api/translate-api';
import { Child } from '../types/subredditData';
import { usePrevious } from '../hooks/usePrevious';
import { Text, View } from './Themed';
import { ThemeContext, themes } from '../constants/Colors';

type PostPreviewProps = {
  data: Child;
};

/**
 * reformat a post's content. The function:
 * 1. turn a post's text from markdown into plain text
 * 2. It removes any newlines from the string
 * 3. It returns the first 100 characters
 */
const parseContent = (mdText: string) => {
  return removeMarkdown(mdText)
    .replace(/(\r\n|\n|\r)/gm, '')
    .substring(0, 100);
};

export const PostPreview = (props: PostPreviewProps) => {
  const postData = props.data.data;
  const { id: postid } = postData;

  // the .replaceAll removes the quotations on either end of the string
  const [title, setTitle] = useState(postData.title.replaceAll('^"|"$', ''));
  const [isTitleTranslated, setIsTitleTranslated] = useState(false);
  const prevTitle = usePrevious(title);

  const content: string | null =
    postData.selftext.replaceAll('^"|"$', '') !== title
      ? postData.selftext.replaceAll('^"|"$', '')
      : '';

  const updateTitle = () => {
    !isTitleTranslated
      ? translate(title).then((e) => setTitle(e.replaceAll('^"|"$', '')))
      : setTitle(prevTitle!);

    setIsTitleTranslated(() => !isTitleTranslated);
  };

  return (
    <View
      style={[styles.container, { flexDirection: content ? 'column' : 'row' }]}
    >
      <View
        style={{
          flexDirection: 'column',
          width: content
            ? Math.min(Dimensions.get('window').width - 35, 450)
            : Math.min(Dimensions.get('window').width - 65, 420),
        }}
      >
        <Text
          key={`${postid}-title`}
          style={[styles.title, { marginBottom: content ? 0 : 15 }]}
        >
          {title}
        </Text>
        {content ? (
          <Text key={postid} style={styles.post}>
            {parseContent(content)}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginTop: content ? 0 : 10,
          marginBottom: 10,
          marginRight: 10,
        }}
      >
        <TouchableOpacity onPress={updateTitle} aria-label="translate">
          <ThemeContext.Consumer>
            {(theme) => (
              <MaterialIcons
                name="translate"
                size={24}
                color={themes[theme].text}
              />
            )}
          </ThemeContext.Consumer>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Math.min(Dimensions.get('window').width - 35, 450),
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
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    fontFamily: 'montserrat',
    textAlign: 'left',
  },
});
