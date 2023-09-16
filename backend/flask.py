from flask import Flask, request, jsonify
from flask_uploads import UploadSet, configure_uploads, patch_request_class, VIDEOS

app = Flask(__name__)

# Configuration for uploaded videos
app.config['UPLOADED_VIDEOS_DEST'] = 'uploads/videos'  # specify the folder 'uploads/videos'

videos = UploadSet('videos', VIDEOS)
configure_uploads(app, videos)

# Set a maximum file size, e.g. 100MB
patch_request_class(app, 100 * 1024 * 1024)

@app.route('/YOUR_BACKEND_ENDPOINT', methods=['POST'])
def upload_video():
    if 'video' in request.files:
        filename = videos.save(request.files['video'])
        return jsonify(success=True, message="Video uploaded!", filename=filename)
    else:
        return jsonify(success=False, message="Video upload failed!")

if __name__ == '__main__':
    app.run(debug=True)
