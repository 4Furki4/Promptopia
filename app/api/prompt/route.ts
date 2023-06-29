import { connectToDb } from "@utils/database";
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";
import { headers } from "next/headers"
export async function GET() {
    const headersList = headers();
    const referer = headersList.get('referer');
    try {
        await connectToDb();
        const promptsAndRelatedUser = await Prompt.find({}).populate("creator");
        return new NextResponse(JSON.stringify(promptsAndRelatedUser), {
            status: 200,
            // @ts-ignore
            headers: {
                referer: referer,
                'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            },
        });
    } catch (err) {
        console.error(err);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}   