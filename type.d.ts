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
    prompt: string,
    tag: string,
    creator: {
        email: string,
        username: string,
        image: string,
    }
}