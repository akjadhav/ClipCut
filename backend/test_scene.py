from scenedetect import detect, AdaptiveDetector, split_video_ffmpeg


def process_file(file_name: str):
    scene_list = detect(file_name, AdaptiveDetector())
    folder_name = file_name.split('.')[0]
    split_video_ffmpeg(file_name, scene_list, output_file_template=folder_name + '/$VIDEO_NAME-Scene-$SCENE_NUMBER.')
