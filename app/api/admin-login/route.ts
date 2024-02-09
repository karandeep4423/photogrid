import { NextResponse, NextRequest } from "next/server";
import { connectToDb } from "@/middleware/mongodb";
import Admin from "@/modals/admin-schema";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json("Method Not Allowed");
    }

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "Invalid request body",
      });
    }

    await connectToDb();
    const user = await Admin.findOne({ username, password });
    if (user) {
      const token = jwt.sign(
        { id: user?._id },
        process.env.NEXT_PUBLIC_JWT as Secret
      );
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
