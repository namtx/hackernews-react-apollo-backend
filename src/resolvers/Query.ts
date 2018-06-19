import {Context} from "../utils";

const feed = (parent, args, context: Context, info) => {
  return context.db.query.links({}, info)
};

export default {
  feed,
}