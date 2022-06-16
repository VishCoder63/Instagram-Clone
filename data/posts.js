import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl: "https://picsum.photos/200/300",
    user: USERS[0].user,
    likes: 7870,
    caption:
      "Nothing is Impossible!!Nothing is Impossible!!Nothing is Impossible!!Nothing is Impossible!!Nothing is Impossible!!Nothing is Impossible!!",
    profile_pic: USERS[0].image,
    comments: [
      {
        user: "ananth.dev",
        comment: "Wow its cool and all!",
      },
      {
        user: "socrates.dev",
        comment: "I bet!",
      },
    ],
  },
  {
    imageUrl: "https://picsum.photos/200/300",
    user: USERS[1].user,
    likes: 2270,
    caption: "Everything is possible!!",
    profile_pic: USERS[1].image,
    comments: [
      {
        user: "ananth.dev",
        comment: "Ok!",
      },
    ],
  },
];
