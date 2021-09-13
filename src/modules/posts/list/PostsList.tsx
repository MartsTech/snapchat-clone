import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useStore } from "../../../stores/store";
import { AppNavigationProp } from "../../../types/navigation";
import PostsListItem from "./PostsListItem";

const PostsList = () => {
  const { posts, postsLimit, hasMore, loadMore, selectPost } =
    useStore().postStore;
  const navigation = useNavigation<AppNavigationProp>();

  const handleSelect = (id: string) => {
    const success = selectPost(id);

    if (success) {
      navigation.navigate("PostsView");
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PostsListItem post={item} handleSelect={handleSelect} />
      )}
      initialNumToRender={postsLimit}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      ListFooterComponent={() =>
        hasMore ? <ActivityIndicator size="large" color="black" /> : null
      }
    />
  );
};

export default observer(PostsList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
