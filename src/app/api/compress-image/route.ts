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
      return NextResponse.json({ error: '이미지 파일이 존재하지 않습니다.' }, { status: 400 });
    }

    // 파일을 ArrayBuffer로 변환
    const buffer = await file.arrayBuffer();

    // sharp를 사용하여 이미지를 jpeg로 변환 및 압축
    let compressedImageBuffer = await sharp(buffer).jpeg({ quality: 100 }).toBuffer();

    // 이미지가 10MB 이상인 경우 크기를 절반으로 축소
    if (compressedImageBuffer.byteLength >= 10 * 1024 * 1024) {
      const metadata = await sharp(compressedImageBuffer).metadata();
      const metadataWidth = metadata.width || 0;
      const width = metadataWidth >= 1920 * 2 ? metadataWidth / 2 : 1920;
      compressedImageBuffer = await sharp(buffer)
        .resize(width >= 1920 * 2 ? width / 2 : 1920)
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    // 이미지를 5MB 미만으로 압축
    let quality = 70;
    while (compressedImageBuffer.byteLength >= 5 * 1024 * 1024 && quality >= 10) {
      compressedImageBuffer = await sharp(compressedImageBuffer).jpeg({ quality }).toBuffer();
      quality -= 10;
    }

    // 압축된 이미지를 File로 변환
    const compressedImageBlob = new File([compressedImageBuffer], file.name, { type: 'image/jpeg' });

    // File을 반환
    return new NextResponse(compressedImageBlob, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    return NextResponse.json({ error: '이미지 파일을 리사이징 혹은 압축 실패하였습니다.' }, { status: 500 });
  }
}
