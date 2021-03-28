import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {                
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }
`;

// input savedBook {
//     authors: [String]
//     description: String
//     title: String
//     bookId: ID!
//     image: String
//     link: String
// }