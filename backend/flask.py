from typing import Annotated

from fastapi import FastAPI, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from test_scene import process_file
from utils import transcribe
from fastapi.responses import JSONResponse
import os
import shutil

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/uploadfile/", status_code=201)
async def create_upload_file(file: UploadFile):
    try:
        target_directory = "uploads"
        if os.path.exists(target_directory):
            shutil.rmtree(target_directory)
        os.makedirs(target_directory)
        file_path = os.path.join(target_directory, file.filename)
        with open(file_path, 'wb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
    except Exception:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "There was an error uploading the file"})
    finally:
        file.file.close()
    return {"filename": file.filename}

@app.get("/processfile/", status_code=201)
async def process_video_file(file_name: str):
    folder_name = process_file(file_name)
    return {"foldername": folder_name}

@app.get("/transcribefiles/")
async def transcribe_files():
    try:
        transcribe('uploads')
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": f"There was an error transcribing the file: {str(e)}"})

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "Transcription process started"})
