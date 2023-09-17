import cv2
import openai
from moviepy.editor import VideoFileClip
import os
import json

openai.api_key_path = 'gpt-api-key.txt'

#NOT USED
def upload_video_google(file_path_to_upload):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "PATH/TO/KEY"
    client = storage.Client()

    bucket_name = "hackmit-videos"
    source_file_name = file_path_to_upload
    destination_blob_name = ""

    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
def split_on_timestamp(video, start_time, end_time):

    # Open the video file
    cap = cv2.VideoCapture(video, cv2.CAP_FFMPEG)

    # Check if the file opened successfully
    if not cap.isOpened():
        print("Error: Could not open video.")
        return None

    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    fourcc = cv2.VideoWriter_fourcc(*'XVID')  # codec

    # Create a VideoWriter object to save the video
    out = cv2.VideoWriter('output.avi', fourcc, fps, (width, height))

    start_frame = int(fps * start_time)
    end_frame = int(fps * end_time)
    current_frame = start_frame

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if start_frame <= current_frame <= end_frame:
            out.write(frame)
        
        current_frame += 1

    cap.release()
    out.release()

    return out


def convert_video_to_audio_moviepy(video_file, output_ext="mp3"):
    filename, ext = os.path.splitext(video_file)
    clip = VideoFileClip(video_file)
    clip.audio.write_audiofile(f"{filename}.{output_ext}")
    return filename+'.'+output_ext


def get_video_transcript(video_path):
    audio_file= open(video_path, "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    return transcript


def save_transcript(transcript, name):
    json_object = json.dumps(transcript, indent=4)

    with open(name+'.json', 'w') as file:
        file.write(json_object)


def transcribe(uploaded_video_path):
    uploads_dir = "uploads"
    for file_name in os.listdir(uploads_dir):
        if "Scene" in file_name:
            name, ext = os.path.splitext(file_name)

            if ext not in ['.mov', '.mp4']:
                raise Exception(f"Invalid Video Type: {ext}")

            video_path = os.path.join(uploads_dir, file_name)
            path_to_audio = convert_video_to_audio_moviepy(video_path)
            transcript = get_video_transcript(path_to_audio)

            save_transcript(transcript, name)

