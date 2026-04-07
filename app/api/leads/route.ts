import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Lead from "../../../models/Lead";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    console.log("Received new lead data:", data);

    const { name, phone, email, service, message } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const leadNote = `Service Requested: ${service || 'None'}\nMessage: ${message || 'None'}`;

    const newLead = await Lead.create({
      name,
      phone,
      email,
      source: "Website Form",
      status: "New",
      notes: leadNote,
    });

    return NextResponse.json(
      { message: "Lead captured successfully", lead: newLead },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
