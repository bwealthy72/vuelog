const startWidth = 40;
export const state = () => ({
  minWidth: startWidth,
  maxWidth: 60,
  step: 5,
  items: [
    {
      name: "Post",
      img: require(`~/assets/images/dock/Post.png`),
      width: startWidth,
      active: false,
    },
  ],
});

export const mutations = {};

export const actions = {};
