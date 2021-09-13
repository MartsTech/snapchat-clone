import firebase from "firebase/app";
import { makeAutoObservable } from "mobx";
import { db } from "../config/firebase";
import { Post } from "../types/post";

class PostStore {
  postsRegistery = new Map<string, Post>();
  selectedPost: Post | null = null;
  postsLimit = 10;
  hasMore = false;
  lastPostTimestamp: firebase.firestore.FieldValue | null = null;
  unsubscribePosts?: () => void;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.postsRegistery.clear();
    this.selectedPost = null;
    this.postsLimit = 10;
    this.hasMore = false;
    this.lastPostTimestamp = null;

    this.unsubscribePosts && this.unsubscribePosts();
    this.unsubscribePosts = undefined;
  };

  get posts() {
    return Array.from(this.postsRegistery.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  loadPosts = () => {
    if (this.postsRegistery.size !== 0) {
      return;
    }

    this.unsubscribePosts = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(this.postsLimit)
      .onSnapshot((snapshot) => {
        this.setPostsFromSnapshot(snapshot);
      });
  };

  loadMore = async () => {
    if (!this.hasMore) {
      return;
    }

    const snapshot = await db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .startAfter(this.lastPostTimestamp)
      .limit(this.postsLimit)
      .get();

    this.setPostsFromSnapshot(snapshot);
  };

  private setPostsFromSnapshot = (
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
    if (snapshot.size < this.postsLimit) {
      this.hasMore = false;
    } else {
      this.hasMore = true;
    }

    snapshot.docs.forEach((doc) => {
      // @ts-ignore
      const lastTimestamp = new Date(
        // @ts-ignore
        this.lastPostTimestamp?.toDate()
      ).getTime();
      const currentTimestamp = new Date(
        doc.data().timestamp?.toDate()
      ).getTime();

      if (currentTimestamp < lastTimestamp) {
        this.lastPostTimestamp = doc.data().timestamp;
      }

      const post = {
        id: doc.id,
        ...doc.data(),
        timestamp: new Date(doc.data().timestamp?.toDate()),
      } as Post;

      this.postsRegistery.set(post.id, post);
    });
  };

  selectPost = (id: string) => {
    if (!this.postsRegistery.has(id)) {
      return false;
    }

    const post = this.postsRegistery.get(id) as Post;

    if (post.read) {
      return false;
    }

    this.selectedPost = { ...post, read: true };

    void db.collection("posts").doc(id).set(
      {
        read: true,
      },
      { merge: true }
    );

    return true;
  };
}

export default PostStore;
