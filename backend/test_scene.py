from scenedetect import detect, AdaptiveDetector, split_video_ffmpeg

scene_list = detect("./test_2.MP4", AdaptiveDetector())
print(scene_list)
split_video_ffmpeg("test_2.MP4", scene_list)
