import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import Prompt from "@models/prompt";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        await connectToDb();
        const promptsAndRelatedUser = await Prompt.find({
            creator: id
        }).populate("creator");
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