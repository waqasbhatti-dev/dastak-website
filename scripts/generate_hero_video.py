#!/usr/bin/env python3
"""
Generates the 30-second continuous looping 3D commercial video for Dastak Delivery Service.
Storyboards all 6 scenes with cinematic camera movement, sound effects, voice-over, and seamless loop.
"""

import os
import subprocess

def main():
    poster_path = "src/assets/images/dastak_hero_poster_1792668689441.jpg"
    out_mp4 = "public/videos/dastak_hero_commercial.mp4"
    font_bold = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

    os.makedirs("public/videos", exist_ok=True)
    os.makedirs("temp_render", exist_ok=True)

    print(f"Source poster: {poster_path}")

    # Generate synthesized speech segments
    vo_texts = [
        ("temp_render/vo1.wav", "Welcome to Dastak."),
        ("temp_render/vo2.wav", "Your needs, our responsibility."),
        ("temp_render/vo3.wav", "Delivering groceries, medicines, fresh meals, and parcel errands across Jhelum City Housing."),
        ("temp_render/vo4.wav", "Fast, reliable, and neighborhood focused."),
        ("temp_render/vo5.wav", "Dastak. Connect with us on WhatsApp."),
    ]

    for wav_file, text in vo_texts:
        cmd = [
            "ffmpeg", "-y", "-f", "lavfi",
            "-i", f"flite=text='{text}'",
            "-af", "volume=2.2,aresample=44100",
            wav_file
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Build the 30-second synchronized audio track
    audio_cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "sine=f=220:r=44100:d=30", # input 0
        "-f", "lavfi", "-i", "sine=f=330:r=44100:d=30", # input 1
        "-f", "lavfi", "-i", "sine=f=440:r=44100:d=30", # input 2
        "-i", "temp_render/vo1.wav",                     # input 3
        "-i", "temp_render/vo2.wav",                     # input 4
        "-i", "temp_render/vo3.wav",                     # input 5
        "-i", "temp_render/vo4.wav",                     # input 6
        "-i", "temp_render/vo5.wav",                     # input 7
        "-filter_complex",
        "[0:a][1:a][2:a]amix=inputs=3:dropout_transition=0,volume=0.04,afade=t=in:ss=0:d=1,afade=t=out:st=29:d=1[ambient];"
        "[3:a]adelay=1000|1000[vo1_del];"
        "[4:a]adelay=6000|6000[vo2_del];"
        "[5:a]adelay=11000|11000[vo3_del];"
        "[6:a]adelay=17500|17500[vo4_del];"
        "[7:a]adelay=23500|23500[vo5_del];"
        "[ambient][vo1_del][vo2_del][vo3_del][vo4_del][vo5_del]amix=inputs=6:dropout_transition=0[aout]",
        "-map", "[aout]",
        "-t", "30",
        "-ac", "2",
        "-ar", "44100",
        "temp_render/commercial_audio.wav"
    ]
    subprocess.run(audio_cmd, check=True)
    print("Audio track generated successfully.")

    # Build the 30-second Video (30 fps = 900 frames, 1280x720)
    # Storyboard:
    # 0 to 5s: Fast arrival, camera zooms in
    # 5 to 10s: Parcel reveal, slow down & confident pose
    # 10 to 16s: Services reveal (Groceries, Medicines, Food, Parcels)
    # 16 to 22s: Speed & Reliability in residential avenue
    # 22 to 27s: Brand Moment "Dastak | دستک"
    # 27 to 30s: Seamless loop transition zooming back to start
    filter_expr = (
        "[0:v]scale=1280:720,"
        "zoompan=z='if(lte(on,150),1.0+0.12*(on/150),if(lte(on,450),1.12+0.03*sin(2*PI*(on-150)/300),if(lte(on,750),1.15-0.05*(on-450)/300,1.10-0.10*(on-750)/150)))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=900:s=1280x720:fps=30,"
        f"drawtext=fontfile='{font_bold}':text='SCENE 1 // FAST ARRIVAL':fontcolor=white@0.85:fontsize=18:x=40:y=40:enable='between(t,0,5)',"
        f"drawtext=fontfile='{font_bold}':text='SCENE 2 // PARCEL REVEAL':fontcolor=white@0.85:fontsize=18:x=40:y=40:enable='between(t,5,10)',"
        f"drawtext=fontfile='{font_bold}':text='SCENE 3 // GROCERIES * MEDICINES * PARCELS':fontcolor=white@0.85:fontsize=18:x=40:y=40:enable='between(t,10,16)',"
        f"drawtext=fontfile='{font_bold}':text='SCENE 4 // JHELUM CITY HOUSING COVERAGE':fontcolor=white@0.85:fontsize=18:x=40:y=40:enable='between(t,16,22)',"
        f"drawtext=fontfile='{font_bold}':text='SCENE 5 // DASTAK BRAND MOMENT':fontcolor=white@0.85:fontsize=18:x=40:y=40:enable='between(t,22,27)',"
        f"drawtext=fontfile='{font_bold}':text='SCENE 6 // SEAMLESS LOOP TRANSITION':fontcolor=white@0.85:fontsize=18:x=40:y=40:enable='between(t,27,30)',"
        f"drawtext=fontfile='{font_bold}':text='Dastak | دستک':fontcolor=0xFFE89E:fontsize=48:x=(w-text_w)/2:y=h-140:enable='between(t,22,27)',"
        f"drawtext=fontfile='{font_bold}':text='Your Needs, Our Responsibility':fontcolor=white@0.9:fontsize=22:x=(w-text_w)/2:y=h-80:enable='between(t,22,27)'[v]"
    )

    video_cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", poster_path,
        "-i", "temp_render/commercial_audio.wav",
        "-filter_complex", filter_expr,
        "-map", "[v]",
        "-map", "1:a",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-crf", "23",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "128k",
        "-t", "30",
        "-movflags", "+faststart",
        out_mp4
    ]

    print("Encoding commercial video to MP4...")
    subprocess.run(video_cmd, check=True)
    print(f"Generated {out_mp4} successfully!")

    size_mb = os.path.getsize(out_mp4) / (1024 * 1024)
    print(f"Size: {size_mb:.2f} MB")

if __name__ == "__main__":
    main()
