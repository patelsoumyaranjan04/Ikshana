from flask import Flask, request,jsonify
import os
from flask_cors import CORS
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
from osgeo import gdal
from PIL import Image
from base64 import b64encode
from keras.preprocessing import image
import cv2
from keras.models import load_model
import numpy as np
import requests
import time

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
MODEL_FOLDER='models'
INPUT_FOLDER='input'
OUTPUT_FOLDER='output'
TEMP_DATA='tempFile'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, MODEL_FOLDER), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, INPUT_FOLDER), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, OUTPUT_FOLDER), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, TEMP_DATA), exist_ok=True)

def get_file_path(file_name, subfolder=None):
    folder_path = app.config['UPLOAD_FOLDER']

    if subfolder:
        folder_path = os.path.join(folder_path, subfolder)

    return os.path.join(folder_path, file_name)

def gdal_api_method(file_path):
	dem= gdal.Open(file_path)

	processings=['slope','TRI','TPI','Roughness','aspect','hillshade']

	for process in processings:
		print('Processing: '+process)
		spl=gdal.DEMProcessing(get_file_path(process+'.tif',subfolder=TEMP_DATA),dem,process,computeEdges=True)
		splarray=spl.GetRasterBand(1).ReadAsArray()
		plt.imshow(splarray)
		plt.colorbar()
		plt.savefig(get_file_path(process+'.jpg',subfolder=OUTPUT_FOLDER))
		plt.close()

	image_dict=dict()

	for image in processings:
		image_path=get_file_path(image+'.jpg',subfolder=OUTPUT_FOLDER)

		with open(image_path, "rb") as f:
			image_data = f.read()
		byte_data=b64encode(image_data).decode('utf-8')
		image_dict[image]=byte_data

	return image_dict

def pknet(image_path):
	model_path=get_file_path('PKNet.h5',subfolder=MODEL_FOLDER)
	model=load_model(model_path)

	model.summary()
	class_names = ['AnnualCrop', 'Forest', 'HerbaceousVegetation', 'Highway', 'Industrial', 'Pasture', 'PermanentCrop', 'Residential', 'River','SeaLake']

	# Load and preprocess the input image
	img = image.load_img(image_path, target_size=(256, 256))
	img_array = image.img_to_array(img)
	img_array = np.expand_dims(img_array, axis=0)
	img_array /= 255.0  # Normalize the image

	# Make predictions using the loaded model
	predictions = model.predict(img_array)

	# Get the predicted class index
	predicted_class_index = np.argmax(predictions)
	# Map the class index to the class label using idx2label_dict
	predicted_class_label = class_names[predicted_class_index]

	return predicted_class_label

def recog4(image_path):
	model_path=get_file_path('finalmo_maybe.h5',subfolder=MODEL_FOLDER)
	model=load_model(model_path)

	class_names = ['Bareland', 'Beach', 'Bridge', 'Desert', 'Farmland', 'Forest', 'Meadow', 'Mountain', 'Pond', 'River', 'SparseResidential']

	original_image = Image.open(image_path)
	target_size = (300,300)
	resized_image = original_image.resize(target_size)
	resized_image_array= np.array(resized_image)[np.    newaxis, ...]
	preds=model.predict(resized_image_array)

	idx = np.argmax(preds)
	output=class_names[idx]

	if output=='Meadow':
		return 'Rocky'
	elif output=='Desert':
		return 'Sandy'
	elif output in ['Forest','Pond']:
		return 'Marsy'	

def huggingFaceApi(image_path):
	API_TOKEN='YOUR TOKEN'
	API_URL = "https://api-inference.huggingface.co/models/smp111/terrain_recognition"
	headers = {"Authorization": f"Bearer {API_TOKEN}"}
	
	with open(image_path, "rb") as f:
		data = f.read()

	while True:
		response = requests.post(API_URL, headers=headers, data=data)
		if response.status_code==200:
			break
		time.sleep(1)

	response=response.json()
	output=response[0]['label']

	if output!='grassy':
		return output
	else:
		pkOutput=pknet(image_path)
		if pkOutput in ['AnnualCrop', 'Forest', 'HerbaceousVegetation', 'Pasture', 'PermanentCrop']:
			return 'Grassy'
		else:
			return 'Marshy'

def opentopography(south,north,west,east):
	url = 'https://portal.opentopography.org/API/globaldem'
	params = {
		'demtype': 'SRTMGL3',
		'south': south,
		'north': north,
		'west': west,
		'east': east,
		'outputFormat': 'GTiff',
		'API_Key': 'YOUR API KEY',
	}

	response = requests.get(url, params=params)

	if response.status_code == 200:
		file_path = get_file_path('opentopography.tif',subfolder=TEMP_DATA)

	with open(file_path, 'wb') as file:
		file.write(response.content)
	
	return file_path

def segmentation(image_path):
	model_path=get_file_path('version2.h5',subfolder=MODEL_FOLDER)
	model = load_model(model_path, compile=False)

	opencv_image = cv2.imread(image_path)
	opencv_image = cv2.cvtColor(opencv_image, cv2.COLOR_BGR2RGB)  

	opencv_image_resized = cv2.resize(opencv_image, (1200, 800))
	opencv_image_resized = np.expand_dims(opencv_image_resized, axis=0)

	predictions = model.predict(opencv_image_resized)

	segmentation_mask = np.argmax(predictions[0], axis=-1)

	color_table = {
		0: {'label': 'unlabeled', 'color': [0, 0, 0]},        # unlabeled
		1: {'label': 'paved-area', 'color': [128, 64, 128]},    # paved-area
		2: {'label': 'dirt', 'color': [130, 76, 0]},      # dirt
	#  3: {'label': 'grass', 'color': [0, 102, 0]},       # grass
	# 4: {'label': 'gravel', 'color': [112, 103, 87]},    # gravel
		5: {'label': 'water', 'color': [28, 42, 168]},     # water
		6: {'label': 'rocks', 'color': [48, 41, 30]},      # rocks
	# 7: {'label': 'pool', 'color': [0, 50, 89]},       # pool
		8: {'label': 'vegetation', 'color': [107, 142, 35]},    # vegetation
		9: {'label': 'roof', 'color': [70, 70, 70]},      # roof
		10: {'label': 'wall', 'color': [102, 102, 156]},  # wall
		11: {'label': 'window', 'color': [254, 228, 12]},   # window
		12: {'label': 'door', 'color': [254, 148, 12]},   # door
		13: {'label': 'fence', 'color': [190, 153, 153]},  # fence
		14: {'label': 'fence-pole', 'color': [153, 153, 153]},  # fence-pole
	# 15: {'label': 'person', 'color': [255, 22, 96]},    # person
		16: {'label': 'dog', 'color': [102, 51, 0]},     # dog
		#17: {'label': 'car', 'color': [9, 143, 150]},    # car
		18: {'label': 'bicycle', 'color': [119, 11, 32]},    # bicycle
		19: {'label': 'grass', 'color': [51, 51, 0]},      # tree
		20: {'label': 'bald-tree', 'color': [190, 250, 190]},  # bald-tree
		21: {'label': 'gravel', 'color': [112, 150, 146]},  # grass
		#22: {'label': 'obstacle', 'color': [2, 135, 115]},    # obstacle
		#23: {'label': 'conflicting', 'color': [255, 0, 0]}       # conflicting
	}


	# Create a color-coded mask based on the segmentation results and color table
	color_coded_mask = np.zeros_like(opencv_image_resized[0])
	for class_index, class_info in color_table.items():
		color_coded_mask[segmentation_mask == class_index] = class_info['color']

	# Calculate the area covered by each class
	areas = [np.sum(segmentation_mask == class_index) for class_index in color_table]

	# Display the original image and color-coded mask
	fig, axes = plt.subplots(2, 1, figsize=(12, 12))
	axes[0].imshow(np.hstack((opencv_image_resized[0], color_coded_mask)))
	axes[0].set_title("Original Image and Color Coded Mask")

	# Plot the histogram with label colors and names
	axes[1].bar([class_info['label'] for class_info in color_table.values()], areas, color=[np.array(class_info['color']) / 255.0 for class_info in color_table.values()])
	axes[1].set_title("Label Areas")
	axes[1].set_xlabel("Label")
	axes[1].set_ylabel("Area")
	axes[1].tick_params(axis='x', rotation=45)  # Rotate x-axis labels for better visibility

	# Save the output image
	output_image_path = get_file_path('segmentation.jpg',subfolder=OUTPUT_FOLDER)
	plt.savefig(output_image_path)

	return output_image_path


@app.route('/api/gdal', methods=['POST'])
def gdal_api_controller():
	# getting file from react
	if 'file' not in request.files:
		return jsonify({'error': 'No file part'}), 403
	
	file = request.files['file']
	
	if file.filename == '':
		return jsonify({'error': 'No selected file'}), 403
	
	extention=file.filename.split('.')[-1:][0]
	if extention != 'tif':
		return jsonify({'error': 'Not a DEM file'}), 403
	
	# saving dem file
	file_path = get_file_path('input.tif',subfolder=INPUT_FOLDER)
	file.save(file_path)

	# gdal work
	image_dict=gdal_api_method(file_path)
	
	return jsonify({'message':'success','image':image_dict})

@app.route('/api/gdal/coordinates', methods=['POST'])
def gdal_from_coordinates():
	
	data = request.get_json()
	file_path=opentopography(
		data['south'],
		data['north'],
		data['west'],
		data['east']
	)

	# gdal work
	image_dict=gdal_api_method(file_path)
	
	return jsonify({'message':'success','image':image_dict})

@app.route('/api/segmentation', methods=['POST'])
def segmentation_api():
	file = request.files['file']

	image_path=get_file_path('input_segmentation.jpg',subfolder=INPUT_FOLDER)
	file.save(image_path)

	segmentation(image_path)
	
	return jsonify({'message':'success'})

@app.route('/api/segmentation/image', methods=['POST'])
def getSegmentation_image():
	output_image_path=get_file_path('segmentation.jpg',subfolder=OUTPUT_FOLDER)
	with open(output_image_path, "rb") as f:
		image_data = f.read()
	byte_data=b64encode(image_data).decode('utf-8')
	
	return jsonify({'message':'success','image':byte_data})


@app.route('/tojpg', methods=['POST'])
def to_Jpg():

	# getting file from react
	if 'file' not in request.files:
		return jsonify({'error': 'No file part'}), 403
	
	file = request.files['file']
	
	if file.filename == '':
		return jsonify({'error': 'No selected file'}), 403
	
	extention=file.filename.split('.')[-1:][0]
	if extention != 'tif':
		return jsonify({'error': 'Not a DEM file'}),403

	# saving image
	image_path=get_file_path('tif.tif',subfolder=INPUT_FOLDER)
	file.save(image_path)
	
	# converting tif to jpg
	tiff_image = Image.open(image_path)
	jpeg_image = tiff_image.convert("RGB")
	jpeg_image.thumbnail(jpeg_image.size)

	# saving converted jpg image
	output_image_path=get_file_path("tif.jpg",subfolder=OUTPUT_FOLDER)
	jpeg_image.save(output_image_path,'JPEG')
	
	with open(output_image_path, "rb") as f:
		image_data = f.read()
		byte_data=b64encode(image_data).decode('utf-8')

	return jsonify({'image':byte_data})

@app.route('/api/topview', methods=['POST'])
def top_view_controller():
	# getting file from react
	if 'file' not in request.files:
		return jsonify({'error': 'No file part'}), 403
	
	file = request.files['file']
	
	if file.filename == '':
		return jsonify({'error': 'No selected file'}), 403
	
	# saving image 
	extention=file.filename.split('.')[-1:][0]
	image_path=get_file_path('topview_image_input.'+extention,subfolder=INPUT_FOLDER)
	file.save(image_path)
	
	# ml work
	output=pknet(image_path)
	if output in ['AnnualCrop', 'Forest', 'HerbaceousVegetation', 'Pasture', 'PermanentCrop']:
		return jsonify({'output':'Grassy'})
	elif output=='Residential':
		return jsonify({'output':'Rocky'})
	else:
		output=recog4(image_path)
		return jsonify({'output':output})
		
@app.route('/api/buttomview', methods=['POST'])
def buttomview_controller():
	# getting file from react
	if 'file' not in request.files:
		return jsonify({'error': 'No file part'}), 403
	
	file = request.files['file']

	if file.filename == '':
		return jsonify({'error': 'No selected file'}), 403
	
	# saving input image
	extention=file.filename.split('.')[-1:][0]
	image_path=get_file_path('buttomview_image_input.'+extention,subfolder=INPUT_FOLDER)
	file.save(image_path)

	# ml work
	output=huggingFaceApi(image_path)

	return jsonify({'output':output})

if __name__ == '__main__':
	app.run()
