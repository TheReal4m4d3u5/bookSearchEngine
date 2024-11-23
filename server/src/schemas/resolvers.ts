import {User} from '../models/index.js';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth.js';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'yourSecretKey';

interface Context {
  user?: {
    _id: string;
  };
}

interface AddUserArgs {

  username: string;
  email: string;
  password: string;

}

interface SaveBookArgs {
  input: {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
  };
}

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id).populate('savedBooks');
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '2h' });
      return { token, user };
    },
    addUser: async (_parent: any, { username, email, password }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
    
      const user = await User.create({username, email, password});

          // Sign a token with the user's information
          const token = signToken(username, email, user._id);

          // Return the token and the user
          return { token, user };
     
        // throw new AuthenticationError('Input invalid');
      },
      saveBook: async (_: any, { input }: SaveBookArgs, context: Context) => {
        if (context.user) {
          return User.findByIdAndUpdate(
            context.user._id,
            { $push: { savedBooks: input } },
            { new: true }
          ).populate('savedBooks');
        }
        throw new AuthenticationError('Not logged in');
      },
        removeBook: async (_: any, { bookId }: any, context: Context) => {
          if (context.user) {
            return User.findByIdAndUpdate(
              context.user._id,
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
          }
          throw new AuthenticationError('Not logged in');
        },
    },
  };



  export default resolvers;