import { connectToDb } from '@utils/database'
import Prompt from '@models/prompt';
import { Tag } from '@models/tag';

export async function POST(req: any) {
    const { userId, prompt, tags } = await req.json();
    try {
        await connectToDb();
        const tagsArray = tags.map((tag: string) => {
            return new Tag({
                tag: tag
            })
        })
        const newPrompt = new Prompt({
            creator: userId,
            prompt: prompt,
            tags: tagsArray
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    } catch (err) {
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }
}