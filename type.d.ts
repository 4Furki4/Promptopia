type Profile = {
    email: string;
    name: string;
    picture: string;
}

type Prompt = {
    prompt: string;
    tag: string;
}
type CustomSession = {
    user: {
        sessionId: string,
        name: string,
        email: string,
        image: string,
    }
}

type PromptAndUser = {
    _id: string,
    prompt: string,
    tag: string,
    creator: {
        _id: string,
        email: string,
        username: string,
        image: string,
    }
}