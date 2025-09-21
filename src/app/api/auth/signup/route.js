
import { NextResponse } from 'next/server';
import { createUser } from '@/backend/controllers/userController';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const user = await createUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
