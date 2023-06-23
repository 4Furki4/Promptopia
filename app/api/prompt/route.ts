import { connectToDb } from "@utils/database";
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";

export async function GET() {
    try {
        await connectToDb();
        const promptsAndRelatedUser = await Prompt.find({}).populate("creator");
        return new NextResponse(JSON.stringify(promptsAndRelatedUser), {
            status: 200,
        });
    } catch (err) {
        console.error(err);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}