import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import Prompt from "@models/prompt";
import { Tag } from "@models/tag";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        await connectToDb();
        const promptAndRelatedUser = await Prompt.findById(id).populate("creator");

        if (!promptAndRelatedUser) {
            return new NextResponse("Prompt not found", {
                status: 404,
            });
        }
        return new NextResponse(JSON.stringify(promptAndRelatedUser), {
            status: 200,
        });
    } catch (err) {
        console.error(err);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}

export async function PATCH(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const { prompt, tags } = await request.json();
    try {
        await connectToDb()
        const existingPrompt = await Prompt.findById(id);

        if (!existingPrompt) {
            return new NextResponse("Prompt not found", {
                status: 404,
            });
        }
        console.log(existingPrompt)
        existingPrompt.prompt = prompt;
        existingPrompt.tags = [];
        tags.map((tag: string) => {
            const newTag = new Tag({
                tag: tag
            })
            existingPrompt.tags.push(newTag)
        })
        await existingPrompt.save();
        return new NextResponse(JSON.stringify(existingPrompt), {
            status: 200,
        });
    } catch (error: any) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        await connectToDb();
        await Prompt.findByIdAndRemove(id)
        return new NextResponse("Prompt deleted", {
            status: 200,
        });
    } catch (error) {
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}