import {Context, APP_SECRET, getUserId} from "../utils";
const bcrypt = require( 'bcryptjs');
const jwt = require( 'jsonwebtoken');

const signup = async (parent, args, context: Context) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`);
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
};

const login = async (parent, args, context: Context) => {
  const user = await context.db.query.user({ where : { email: args.email } }, `{ id password }`);
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign( { userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const post = (parent, args, context: Context, info) => {
  const userId = getUserId(context);
  console.log(userId);
  return context.db.mutation.createLink({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  }, info);
};

const vote = async (parent, args, context: Context, info) => {
  const userId = getUserId(context);
  const existedVote = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (existedVote) {
    throw new Error(`Already voted for link ${args.linkId}`);
  }

  return context.db.mutation.createVote({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } },
    }
  }, info);
};

export default {
  signup,
  login,
  post,
  vote
};
