import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    const email = formData.get("email");
    const emailData = {
        email: email,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ message: "Email Subscribed", success: true });
}

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({ message: "GET request successful", emails });
}   

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await EmailModel.findByIdAndDelete(id); 
    return NextResponse.json({ message: "Email Deleted", success: true });
}