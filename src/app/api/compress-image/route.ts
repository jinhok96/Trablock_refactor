import { NextResponse } from 'next/server';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 요청에서 파일 데이터를 추출
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // 파일이 없는 경우 에러 반환
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 파일을 ArrayBuffer로 변환
    const buffer = await file.arrayBuffer();

    // sharp를 사용하여 이미지를 png로 변환 및 압축
    let compressedImageBuffer = await sharp(buffer).png().toBuffer();

    // 이미지를 5MB 미만으로 압축
    while (compressedImageBuffer.byteLength >= 5 * 1024 * 1024) {
      compressedImageBuffer = await sharp(compressedImageBuffer).png({ quality: 90 }).toBuffer();
    }

    // 압축된 이미지를 File로 변환
    const compressedImageBlob = new File([compressedImageBuffer], file.name, { type: 'image/png' });

    // File을 반환
    return new NextResponse(compressedImageBlob, {
      headers: {
        'Content-Type': 'image/png'
      }
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    return NextResponse.json({ error: 'Failed to compress image' }, { status: 500 });
  }
}
