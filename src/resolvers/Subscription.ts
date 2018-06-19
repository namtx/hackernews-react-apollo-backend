import {Context} from "../utils";

const newLinkSubscribe = (parent, args, context: Context, info) => {
  return context.db.subscription.link({
    where: { mutation_in: ['CREATED'] },
  }, info);
};

const newVoteSubscribe = (parent, args, context: Context, info) => {
  return context.db.subscription.vote({
    where: { mutation_in: ['CREATED'] },
  }, info);
};

const newLink = {
  subscribe: newLinkSubscribe,
};

const newVote = {
  subscribe: newVoteSubscribe
};

export default {
  newLink,
  newVote
};