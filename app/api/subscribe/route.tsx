import { NextResponse } from "next/server";
import { graphClient } from "@/lib/graphClient";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await graphClient.api(`/users/${process.env.FROM_EMAIL}/sendMail`).post({
      message: {
        subject: "New Subscription",
        body: {
          contentType: "HTML",
          content: `<p>New subscription from <strong>${email}</strong></p>`,
        },
        toRecipients: [{ emailAddress: { address: process.env.FROM_EMAIL } }],
      },
    });

    return NextResponse.json(
      { message: "Subscription email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Graph Mail Error:", error);
    return NextResponse.json(
      { message: "Error sending subscription email" },
      { status: 500 }
    );
  }
}
