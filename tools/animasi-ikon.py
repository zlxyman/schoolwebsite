"""Animasi ikon 3D core values Sedaya Bintang -> APNG transparan (PNG bergerak, loop mulus).

Pakai:  python3 tools/animasi-ikon.py <folder-input> <folder-output> [ukuran-px]
Input : budi-pekerti.png, trilingual.png, steam.png (PNG transparan dari Canva, resolusi asli).
Output: <nama>.png (APNG, loop tak terbatas) + <nama>-diam.png (frame diam untuk prefers-reduced-motion).

Cara kerja: tiap ikon dipisah per bagian berdasarkan warna (hati, gelembung, roket, api, bintang),
lalu tiap bagian digerakkan sesuai bentuknya. Semua gerakan memakai fungsi periodik, jadi frame
terakhir menyambung mulus ke frame pertama.
"""
import math
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from scipy import ndimage

FPS = 24


def load(path, size):
    im = Image.open(path).convert("RGBA")
    if size:
        im = im.resize((size, size), Image.LANCZOS)
    return np.array(im).astype(np.float32) / 255.0


def hsv(rgba):
    rgb = (rgba[..., :3] * 255).astype(np.uint8)
    h = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
    return h[..., 0] * 360 / 255, h[..., 1] / 255, h[..., 2] / 255


def clean(mask, keep_largest=True):
    mask = ndimage.binary_opening(mask, iterations=1)
    mask = ndimage.binary_fill_holes(mask)
    if keep_largest:
        lab, n = ndimage.label(mask)
        if n > 1:
            sizes = ndimage.sum(mask, lab, range(1, n + 1))
            mask = lab == (np.argmax(sizes) + 1)
    return ndimage.binary_dilation(mask, iterations=1)


def split(img, mask):
    """Pisah img jadi (bagian, sisa). Lubang di sisa diisi warna tetangga supaya tidak bolong."""
    soft = ndimage.gaussian_filter(mask.astype(np.float32), 0.6)
    part = img.copy()
    part[..., 3] *= soft
    rest = img.copy()
    rest[..., 3] *= 1 - soft
    return part, rest


def inpaint_under(layer, hole):
    """Isi area yang tertutup bagian lain dengan warna sekitar (dipakai saat bagian depan mengecil/bergeser)."""
    rgb = (layer[..., :3] * 255).astype(np.uint8)
    m = (hole & (layer[..., 3] < 0.5)).astype(np.uint8) * 255
    out = layer.copy()
    out[..., :3] = cv2.inpaint(rgb, m, 5, cv2.INPAINT_TELEA) / 255.0
    return out


def affine(layer, sx=1.0, sy=1.0, rot=0.0, tx=0.0, ty=0.0, anchor=(0, 0), alpha=1.0):
    h, w = layer.shape[:2]
    ax, ay = anchor
    a = math.radians(rot)
    c, s = math.cos(a), math.sin(a)
    m = np.array([[c * sx, -s * sy, 0], [s * sx, c * sy, 0]], np.float32)
    m[:, 2] = np.array([ax + tx, ay + ty]) - m[:, :2] @ np.array([ax, ay])
    out = cv2.warpAffine(layer, m, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    out = np.clip(out, 0, 1)
    out[..., 3] *= alpha
    return out


def over(dst, src):
    a = src[..., 3:4]
    out = dst.copy()
    out_a = a + dst[..., 3:4] * (1 - a)
    out[..., :3] = np.where(out_a > 0, (src[..., :3] * a + dst[..., :3] * dst[..., 3:4] * (1 - a)) / np.maximum(out_a, 1e-6), 0)
    out[..., 3:4] = out_a
    return out


def ease(t):
    return 0.5 - 0.5 * math.cos(2 * math.pi * t)


def pulse(t, center, width):
    d = abs(((t - center + 0.5) % 1.0) - 0.5)
    return max(0.0, 1 - d / width) ** 2 * (3 - 2 * max(0.0, 1 - d / width)) if d < width else 0.0


def bbox(mask):
    ys, xs = np.nonzero(mask)
    return xs.min(), ys.min(), xs.max(), ys.max()


# ---------- Budi Pekerti: hati berdetak (lub-dub) di atas tangan ----------
def budi_pekerti(img, seconds=1.6):
    H, S, V = hsv(img)
    heart = (img[..., 3] > 0.5) & (S > 0.35) & ((H > 320) | (H < 15))
    heart = clean(heart)
    part, hand = split(img, heart)
    x0, y0, x1, y1 = bbox(heart)
    anchor = ((x0 + x1) / 2, y1 - (y1 - y0) * 0.15)
    frames = []
    n = int(seconds * FPS)
    for i in range(n):
        t = i / n
        beat = pulse(t, 0.12, 0.10) * 1.0 + pulse(t, 0.32, 0.10) * 0.65
        sx = 1 + 0.14 * beat
        sy = 1 + 0.10 * beat
        lift = -2.0 * beat * img.shape[0] / 200
        f = affine(hand, ty=-0.6 * beat * img.shape[0] / 200)
        f = over(f, affine(part, sx, sy, tx=0, ty=lift, anchor=anchor))
        frames.append(f)
    return frames


# ---------- Trilingual: dua gelembung bergantian "bicara" ----------
def trilingual(img, seconds=2.4):
    H, S, V = hsv(img)
    a = img[..., 3] > 0.5
    yellow = clean(a & (H > 30) & (H < 65) & (S > 0.35))
    blue = clean(a & (H > 185) & (H < 230) & (S > 0.2) & ~yellow)
    front, rest = split(img, yellow)
    back = rest.copy()
    pts = cv2.findNonZero(blue.astype(np.uint8))
    hull = np.zeros(blue.shape, np.uint8)
    cv2.fillConvexPoly(hull, cv2.convexHull(pts), 1)
    hidden = (hull > 0) & yellow
    back = inpaint_under(back, ndimage.binary_dilation(hidden, iterations=2))
    back[..., 3] = np.where(ndimage.binary_dilation(hidden, iterations=1), 1.0, back[..., 3])
    back[..., 3] *= ndimage.gaussian_filter(ndimage.binary_dilation(hull > 0, iterations=2).astype(np.float32), 0.7)
    bx0, by0, bx1, by1 = bbox(blue)
    fx0, fy0, fx1, fy1 = bbox(yellow)
    a_back = (bx0 + (bx1 - bx0) * 0.25, by1)
    a_front = (fx0 + (fx1 - fx0) * 0.7, fy1)
    frames = []
    n = int(seconds * FPS)
    for i in range(n):
        t = i / n
        pb = pulse(t, 0.12, 0.16)
        pf = pulse(t, 0.55, 0.16)
        wob_b = math.sin(2 * math.pi * t * 2) * 1.5 * pb
        wob_f = math.sin(2 * math.pi * t * 2) * 1.5 * pf
        f = affine(back, 1 + 0.10 * pb, 1 + 0.13 * pb, rot=-5 * pb + wob_b, ty=-3 * pb * img.shape[0] / 200, anchor=a_back)
        f = over(f, affine(front, 1 + 0.10 * pf, 1 + 0.13 * pf, rot=5 * pf + wob_f, ty=-3 * pf * img.shape[0] / 200, anchor=a_front))
        frames.append(f)
    return frames


# ---------- STEAM: roket menyala & melesat pendek, bintang keluar dari ekor ----------
def steam(img, seconds=2.0):
    H, S, V = hsv(img)
    a = img[..., 3] > 0.5
    blue = clean(a & (H > 185) & (H < 235) & (S > 0.2))
    near_blue = ndimage.binary_dilation(blue, iterations=3)
    ylab, yn = ndimage.label(a & (H > 30) & (H < 70) & (S > 0.3))
    star = np.zeros_like(a)
    best = 0
    for k in range(1, yn + 1):
        comp = ylab == k
        if (comp & near_blue).sum() < 0.05 * comp.sum() and comp.sum() > best:
            best, star = comp.sum(), comp
    star = clean(star)
    flame = clean(a & (S > 0.3) & ((H > 330) | (H < 25)) & ~star)
    rocket_all = ndimage.binary_fill_holes(blue | flame) | clean(a & ~star, keep_largest=False)
    star_l, rest = split(img, star)
    flame_l, rocket = split(rest, flame)
    rocket = inpaint_under(rocket, np.zeros_like(flame))
    fx0, fy0, fx1, fy1 = bbox(flame)
    rx0, ry0, rx1, ry1 = bbox(rocket_all & ~flame)
    rc = ((rx0 + rx1) / 2, (ry0 + ry1) / 2)
    fc = ((fx0 + fx1) / 2, (fy0 + fy1) / 2)
    axis = np.array([rc[0] - fc[0], rc[1] - fc[1]], np.float32)
    axis /= np.linalg.norm(axis) + 1e-6
    f_anchor = (fc[0] + axis[0] * (fx1 - fx0) * 0.45, fc[1] + axis[1] * (fy1 - fy0) * 0.45)
    sx0, sy0, sx1, sy1 = bbox(star)
    sc = ((sx0 + sx1) / 2, (sy0 + sy1) / 2)
    scale = img.shape[0] / 200
    frames = []
    nf = int(seconds * FPS)
    sparks = [(0.0, -22), (0.33, 14), (0.66, -4)]
    for i in range(nf):
        t = i / nf
        thrust = ease(t)
        shake = math.sin(2 * math.pi * t * 6) * 0.6 * scale
        dx, dy = axis * (9 * scale * thrust)
        base = np.zeros_like(img)
        for off, ang in sparks:
            p = (t - off) % 1.0
            dist = 4 * scale + 34 * scale * p
            d = -axis
            ca, sa = math.cos(math.radians(ang)), math.sin(math.radians(ang))
            d = np.array([d[0] * ca - d[1] * sa, d[0] * sa + d[1] * ca])
            tip = (fc[0] - axis[0] * (fx1 - fx0) * 0.4, fc[1] - axis[1] * (fy1 - fy0) * 0.4)
            pos = (tip[0] + d[0] * dist, tip[1] + d[1] * dist)
            sz = 0.6 * (1 - 0.45 * p)
            alpha = min(1.0, p * 6) * (1 - p) ** 1.2
            base = over(base, affine(star_l, sz, sz, rot=360 * p, tx=pos[0] - sc[0], ty=pos[1] - sc[1], anchor=sc, alpha=alpha))
        fl = 1 + 0.22 * math.sin(2 * math.pi * t * 4) + 0.18 * thrust
        f = over(base, affine(flame_l, 1 + 0.08 * (fl - 1), fl, tx=dx + shake, ty=dy, anchor=f_anchor))
        f = over(f, affine(rocket, tx=dx + shake, ty=dy, anchor=rc))
        tw = 1 + 0.12 * math.sin(2 * math.pi * t * 2)
        f = over(f, affine(star_l, tw, tw, rot=12 * math.sin(2 * math.pi * t), anchor=sc))
        frames.append(f)
    return frames


def save_apng(frames, path, still):
    ims = [Image.fromarray((np.clip(f, 0, 1) * 255).astype(np.uint8), "RGBA") for f in frames]
    ims = [im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).convert("RGBA") for im in ims]
    ims[0].save(path, save_all=True, append_images=ims[1:], duration=int(1000 / FPS), loop=0, disposal=1, blend=0, optimize=True)
    Image.fromarray((np.clip(still, 0, 1) * 255).astype(np.uint8), "RGBA").save(str(path).replace(".png", "-diam.png"))


def main():
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    size = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    dst.mkdir(parents=True, exist_ok=True)
    for name, fn in [("budi-pekerti", budi_pekerti), ("trilingual", trilingual), ("steam", steam)]:
        img = load(src / f"{name}.png", size)
        frames = fn(img)
        save_apng(frames, dst / f"ikon-{name}.png", img)
        print(name, len(frames), "frame")


if __name__ == "__main__":
    main()
