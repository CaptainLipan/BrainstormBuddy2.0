export interface IComment {
    _id: string;
    text: string;
    createdAt: string;  // Assuming the date comes in as a string to convert later
    _creator: {
        username: string;
    };
}