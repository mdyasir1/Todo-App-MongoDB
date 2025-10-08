import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Todo } from "../../../../models/Todo";


export async function GET() {
  await connectDB();
  const todos = await Todo.find().sort({ createdAt: -1 });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newTodo = await Todo.create(data);
  return NextResponse.json(newTodo);
}
