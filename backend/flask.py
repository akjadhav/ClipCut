from typing import Annotated

from fastapi import FastAPI, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from test_scene import process_file
from utils import transcribe, get_sentiment
from fastapi.responses import JSONResponse, FileResponse
import os
import shutil
import zipfile

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

@app.get('/addsentiment')
async def add_sentiment():
    text = "" # get text from txt
    try:
        sentiment = get_sentiment(text)
        # 
        
    except Exception as e:
        return e

@app.get("/download/")
async def download_files():
    upload_folder = "uploads"
    zip_file_path = upload_folder + '.zip'
    
    if os.path.exists(zip_file_path):
        os.remove(zip_file_path)
    
    with zipfile.ZipFile(zip_file_path, 'w') as my_zip:
        for foldername, subfolders, filenames in os.walk(upload_folder):
            for filename in filenames:
                file_path = os.path.join(foldername, filename)
                my_zip.write(file_path, os.path.relpath(file_path, upload_folder))

    return FileResponse(zip_file_path, media_type='application/zip', filename='processed.zip')
