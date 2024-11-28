import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            userasdfads
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }`;






