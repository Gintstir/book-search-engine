import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedBook {
                _id
                author
                description
                bookId
                image
                link
                title

            }
        }
    }
`;