import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, TextProps, View } from './Themed';
import { Child, ChildData, SubredditData } from '../types/subredditData';
import { PostPreview } from './PostPreview';

export const SearchResults = (data: SubredditData) => {
  //   console.log(data);
  return (
    <ScrollView>
      {data.data.children.map((p) => {
        return <PostPreview data={p} key={p.data.id} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});
