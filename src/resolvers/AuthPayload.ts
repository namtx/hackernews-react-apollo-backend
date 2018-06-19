import {Context} from "../utils";

const user = (root, args, context: Context, info) => {
  return context.db.query.user({ where: {id: root.user.id } }, info);
};

export default {
  user
}
