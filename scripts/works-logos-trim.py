"""포트폴리오 '함께한 브랜드' 로고 다듬기 (2026-11-09).

옛 로고 카드 사례(대표 이미지 없이 thumb 로고만 있는 works_items)의 로고 그림은 여백이 제각각이라
그대로 두면 어떤 로고는 칸에 꽉 차고 어떤 로고는 점처럼 작다. 흰 여백을 잘라 webp 로 저장하고,
눈으로 보기에 크기가 비슷해지도록(면적을 맞춤) 칸 너비 대비 비율을 manifest 에 적는다.

사용: ~/.venvs/whisper/bin/python scripts/works-logos-trim.py <공개 works JSON> <로고 원본 폴더>
  - 공개 works JSON = GET /api/admin/public/works 응답
  - 로고 원본 폴더 = thumb 주소의 마지막 부분(thumb_…) 이름으로 내려받은 파일들
출력: public/static/works-logos/<thumb_…>.webp, src/routes/renewal/works-logos.json ({키: 너비%})
"""
import json, math, os, sys
from PIL import Image, ImageChops

src_json, src_dir = sys.argv[1], sys.argv[2]
out_dir = 'public/static/works-logos'
items = json.load(open(src_json))['items']
manifest = {}
for w in items:
    if w.get('cover') or not w.get('thumb'):
        continue
    key = w['thumb'].rstrip('/').split('/')[-1]
    im = Image.open(os.path.join(src_dir, key)).convert('RGB')
    # 네 모서리 색을 바탕으로 보고, 바탕과 다른 부분만 남김(거의 흰색 잡티는 무시)
    bg = Image.new('RGB', im.size, im.getpixel((1, 1)))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 24 else 0)
    box = diff.getbbox() or (0, 0, im.width, im.height)
    pad = max(2, int(0.04 * max(box[2] - box[0], box[3] - box[1])))
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad))
    crop = im.crop(box)
    if crop.width > 480:
        crop = crop.resize((480, round(crop.height * 480 / crop.width)), Image.LANCZOS)
    crop.save(os.path.join(out_dir, key + '.webp'), 'WEBP', quality=90)
    # 칸(가로 3 : 세로 2) 안에서 면적이 같아 보이게: 너비 = sqrt(A * 비율), 너비 78%·높이 62% 를 넘지 않게
    r = crop.width / crop.height
    A = 0.15
    wid = math.sqrt(A * r)
    wid = min(wid, 0.78, 0.62 * (2 / 3) * r)
    manifest[key] = round(wid * 100, 1)
json.dump(manifest, open('src/routes/renewal/works-logos.json', 'w'), indent=0, sort_keys=True)
print(len(manifest), 'logos')
