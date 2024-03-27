---
 
# Ikshana: Satellite Image Analysis and Terrain Recognition
 
 
**Ikshana** is an Smart India Hackathon 2023 winner project aimed at analyzing satellite images and recognizing terrain types using deep learning models. It also provides powerful tools for terrain data analysis using the GDAL library and offers segmentation models for identifying mixed terrains.
 
## Features
 
1. **Terrain Recognition**:
   - Utilizes deep learning models to classify terrain types based on provided satellite images and terrain perspective images.
   - Recognizes terrain categories such as grassy, marshy, rocky, and sandy.
 
2. **Terrain Analysis**:
   - Provides tools to analyze terrain data using the **GDAL (Geospatial Data Abstraction Library)**.
   - Calculates various terrain indices, including:
     - **TRI (Terrain Ruggedness Index)**: Measures the variation in elevation within a specified neighborhood.
     - **TPI (Topographic Position Index)**: Describes the relative position of a location within its surroundings.
     - **Roughness, hillshade, aspect, and slope** calculations.
 
3. **Segmentation**:
   - Offers segmentation models to identify mixed terrains within satellite images.
   - Detects regions corresponding to water bodies, soil, grass, etc.
 
4. **Integration with OpenTopography API**:
   - Allows users to fetch terrain data based on coordinates from the **OpenTopography API**.
   - Enhances the project's capabilities by combining satellite imagery with ground truth data.
 
## Technologies Used
 
### Backend
 
- **Flask**:
  - Backend server framework for handling HTTP requests and responses.
  - Manages communication between the frontend and the deep learning models.
 
- **GDAL (Geospatial Data Abstraction Library)**:
  - Essential for processing raster and vector geospatial data.
  - Used for terrain analysis and data manipulation.
 
- **Deep Learning Models**:
  - Built using **Keras/TensorFlow**.
  - Trained for terrain recognition and segmentation tasks.
 
- **OpenTopography API**:
  - Integrated to fetch terrain data based on specified coordinates.
  - Enhances the project's capabilities by combining satellite imagery with ground truth data.
 
- **Matplotlib**:
  - Python library for creating static, animated, and interactive visualizations.
  - Useful for displaying terrain profiles, graphs, and results.
 
### Frontend (Web Application)
 
- **React**:
  - JavaScript library for building user interfaces.
  - Provides an interactive and responsive frontend for Ikshana.
 
- **Axios**:
  - Promise-based HTTP client for making requests from the frontend to the backend.
  - Facilitates seamless communication between the user interface and the server.
 
### Snapshots

 
## Getting Started
 
To run the project:
 
1. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
 
2. For the frontend:
   ```
   npm run dev
   ```
 
3. For the backend:
   - Execute the `backend_v2` file.
   - Note: The `requirements.txt` file contains necessary dependencies, but ensure you have Flask version 2.0.2, flask-cors, matplotlib, GDAL, Pillow, opencv-python, numpy, requests, and TensorFlow 2.6.0 installed.
