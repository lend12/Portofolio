# Jon Nitaj — Portfolio

A single-page portfolio site for Jon Nitaj (video editor).

## How to add new videos

All videos on the site are listed in **one file**:

```
src/routes/index.tsx
```

Near the top of that file you'll see three arrays. Each array feeds one
section of the site:

| Array in code   | Section on the site         | Format             |
| --------------- | --------------------------- | ------------------ |
| `reels`         | Vertical Cuts (Reels)       | 9:16 vertical      |
| `montages`      | Montages & Sound Design     | 16:9 landscape     |
| `timelines`     | Timeline Breakdowns         | 16:9 landscape     |

### Step 1 — Get a URL for your video

You need a direct link to an `.mp4` file (a URL ending in `.mp4`).
You can:

- Upload the video to any hosting that gives you a direct `.mp4` link
  (Cloudinary, Bunny, S3, Dropbox direct link, etc.), **or**
- Ask Lovable to upload the file for you — it will generate a
  `src/assets/your-video.mp4.asset.json` file. Import it at the top of
  `src/routes/index.tsx` like the existing ones:

  ```ts
  import myClip from "@/assets/my-clip.mp4.asset.json";
  // then use myClip.url as the src
  ```

### Step 2 — Add an entry to the right array

Open `src/routes/index.tsx` and find the array for the section you want.

**Add a Reel (vertical, 9:16):**

```ts
const reels = [
  { id: "R1", title: "Noizy · Live", src: noizy.url },
  // 👇 add a new line like this:
  { id: "R6", title: "New Reel Title", src: "https://link-to-your-video.mp4" },
];
```

**Add a Montage / Sound Design piece (landscape, 16:9):**

```ts
const montages = [
  { id: "M4", kind: "Montage", title: "My New Montage", src: "https://link-to-your-video.mp4" },
];
```

**Add a Timeline Breakdown (landscape, 16:9):**

```ts
const timelines = [
  { id: "T4", kind: "Timeline", title: "My New Timeline", src: "https://link-to-your-video.mp4" },
];
```

### Step 3 — Fields explained

- `id` — any unique short code (`R6`, `M4`, `T4`…). Just don't repeat one
  in the same array.
- `title` — the label shown under / over the video.
- `kind` (montages & timelines only) — the small caption above the title
  (e.g. `"Montage"`, `"Timeline"`, `"Sound Design"`).
- `src` — the direct video URL, or `imported.url` if you imported an
  asset JSON file.

### Step 4 — Remove a video

Just delete its `{ ... }` line from the array.

### Step 5 — Save

Save the file. The site auto-refreshes with your new video in place.

## Contact

- Email: nitajjon@gmail.com
- Phone: +383 44 106 655
- Instagram: https://www.instagram.com/jonnitaj_/?hl=en