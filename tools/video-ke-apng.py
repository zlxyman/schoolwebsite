"""Ubah video ikon (background hijau polos, dari Gemini/Veo) jadi PNG bergerak (APNG) transparan yang loop mulus.

Pakai:  python3 tools/video-ke-apng.py <video.mp4> <output.png> [ukuran-px=320] [fps=24]

Langkah:
1. Cari potongan loop terbaik: frame yang paling mirip dengan frame awal (minimal 2 detik).
2. Ujung loop di-crossfade ke awal supaya sambungannya tidak terlihat.
3. Background hijau dibuang (chroma key) + sisa pantulan hijau di pinggir objek dinetralkan.
4. Dipotong persegi di sekitar objek, diperkecil, disimpan sebagai APNG + versi diam (-diam.png).
"""
import sys

import cv2
import numpy as np
from PIL import Image


def read_frames(path):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24
    frames = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        frames.append(cv2.cvtColor(f, cv2.COLOR_BGR2RGB))
    return frames, fps


def key_green(rgb):
    f = rgb.astype(np.float32)
    r, g, b = f[..., 0], f[..., 1], f[..., 2]
    greenness = g - np.maximum(r, b)
    alpha = 1 - np.clip((greenness - 25) / 60, 0, 1)
    spill = np.clip(g - np.maximum(r, b), 0, None)
    f[..., 1] = g - spill * (1 - alpha * 0.2)
    f[..., 1] = np.minimum(f[..., 1], np.maximum(r, b) + 8)
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    return np.dstack([np.clip(f, 0, 255), alpha * 255]).astype(np.uint8)


def best_loop(frames, fps, min_sec=2.0):
    small = [cv2.resize(f, (96, 96)).astype(np.float32) for f in frames]
    start = 0
    best, best_i = 1e18, len(frames) - 1
    for i in range(int(min_sec * fps), len(frames)):
        d = np.mean((small[i] - small[start]) ** 2)
        if d < best:
            best, best_i = d, i
    return start, best_i


def main():
    src, out = sys.argv[1], sys.argv[2]
    size = int(sys.argv[3]) if len(sys.argv) > 3 else 320
    fps_out = int(sys.argv[4]) if len(sys.argv) > 4 else 24
    frames, fps = read_frames(src)
    s, e = best_loop(frames, fps)
    loop = frames[s:e]
    fade = max(1, int(0.4 * fps))
    for k in range(fade):
        w = (k + 1) / (fade + 1)
        loop[k] = (loop[k] * w + frames[e - fade + k] * (1 - w)).astype(np.uint8)
    loop = loop[: len(loop) - 0]
    step = max(1, round(fps / fps_out))
    loop = loop[::step]
    rgba = [key_green(f) for f in loop]
    union = np.max([f[..., 3] for f in rgba], axis=0) > 20
    ys, xs = np.nonzero(union)
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    side = int(max(xs.max() - xs.min(), ys.max() - ys.min()) * 1.08)
    x0, y0 = int(cx - side / 2), int(cy - side / 2)
    ims = []
    for f in rgba:
        pad = np.zeros((side, side, 4), np.uint8)
        sx0, sy0 = max(0, x0), max(0, y0)
        sx1, sy1 = min(f.shape[1], x0 + side), min(f.shape[0], y0 + side)
        pad[sy0 - y0:sy1 - y0, sx0 - x0:sx1 - x0] = f[sy0:sy1, sx0:sx1]
        im = Image.fromarray(pad, "RGBA").resize((size, size), Image.LANCZOS)
        ims.append(im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).convert("RGBA"))
    ims[0].save(out, save_all=True, append_images=ims[1:], duration=int(1000 * step / fps), loop=0, disposal=1, blend=0, optimize=True)
    ims[0].save(out.replace(".png", "-diam.png"))
    print(f"{len(ims)} frame, loop {(e - s) / fps:.2f} detik -> {out}")


if __name__ == "__main__":
    main()
