from typing import Annotated

from fastapi import FastAPI, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from test_scene import process_file
from utils import transcribe
from fastapi.responses import JSONResponse

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
        with open(file.filename, 'wb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
    except Exception:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "There was an error uploading the file"})
    finally:
        file.file.close()

    return {"filename": file.filename}

@app.get("/processfile/", status_code=201)
async def process_file(file_name: str):
    folder_name = process_file(file_name)
    return {"foldername": folder_name}

@app.get("/transcribefile/")
async def process_file(file_name: str):
    process_file(file_name)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"filename": file_name})
