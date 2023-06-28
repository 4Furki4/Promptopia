type Profile = {
    email: string;
    name: string;
    picture: string;
}

type Prompt = {
    prompt: string;
    tags: string[];
}
type InputPromt = {
    prompt: string;
    tags: string;
}
type CustomSession = {
    user: {
        sessionId: string,
        name: string,
        email: string,
        image: string,
    }
}
type Tag = {
    _id: string,
    tag: string,
}

type PromptAndUser = {
    _id: string,
    prompt: string,
    tags: Tag[],
    creator: {
        _id: string,
        email: string,
        username: string,
        image: string,
    }
}