import { NextResponse } from "next/server";
import { graphClient } from "@/lib/graphClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, budget, message } = body;

    await graphClient.api("/users/" + process.env.FROM_EMAIL + "/sendMail").post({
      message: {
        subject: `New Lead from ${name}`,
        body: {
          contentType: "HTML",
          content: `
            <h3>New Lead Submitted</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `,
        },
        toRecipients: [
          { emailAddress: { address: process.env.FROM_EMAIL } },
        ],
      },
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Graph Mail Error:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}
