from typing import Annotated

from fastapi import FastAPI, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from test_scene import process_file
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


@app.post("/files/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}


@app.post("/uploadfile/", status_code=200)
async def create_upload_file(file: UploadFile):
    try:
        with open(file.filename, 'wb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
    except Exception:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "There was an error uploading the file"})
    finally:
        file.file.close()

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"filename": file.filename})

@app.get("/processfile/")
async def process_file(file_name: str):
    process_file(file_name)
    return JSONResponse(status_code=status.HTTP_200_OK, content={"filename": file_name})
