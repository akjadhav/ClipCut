import os
from scenedetect import detect, AdaptiveDetector, split_video_ffmpeg

def process_file(file_name: str):
    folder_name = "uploads"
    os.chdir(folder_name)
    scene_list = detect(file_name, AdaptiveDetector())
    split_video_ffmpeg(file_name, scene_list)
    os.chdir('..')
