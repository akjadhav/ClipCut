import cv2 
import os
from google.cloud import storage


def upload_video(file_path_to_upload):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "D:\Chaitanya\HackMIT\project"
    client = storage.Client()

    bucket_name = "hackmit-videos"
    source_file_name = file_path_to_upload
    destination_blob_name = "destination/blob/name"

    bucket = client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)


def download_video():
    pass

def capture_video():
    pass

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


if __name__ == "__main__":
    pass
