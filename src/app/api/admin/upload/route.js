import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file or invalid file' }, { status: 400 });
    }

    const type = file.type || '';
    const size = file.size ?? 0;
    const name = file.name || 'image';

    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Invalid type. Use JPEG, PNG, GIF, or WebP.' }, { status: 400 });
    }
    if (size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const ext = path.extname(name) || '.jpg';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, safeName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    const origin = new URL(request.url).origin;
    const url = `${origin}/uploads/${safeName}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error?.message || 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
