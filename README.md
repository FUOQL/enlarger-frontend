# Canva Mirror Flip App

A professional image mirror flip tool built for Canva that allows users to create stunning mirror flip effects on their images with customizable parameters.

## ✨ Features

### Core Functionality
- **Horizontal Mirror Flip** - Flip images horizontally
- **Vertical Mirror Flip** - Flip images vertically  
- **Both Direction Flip** - Flip images in both directions
- **Position Control** - Place flipped image below, above, left, or right of original
- **Offset Adjustment** - Control distance between original and flipped image (0-100px)
- **Opacity Control** - Adjust transparency of flipped image (10-100%)

### User Experience
- **Simple Upload** - Drag & drop or click to upload images
- **Real-time Preview** - See changes instantly as you adjust parameters
- **Multiple Download Methods** - Download processed images with multiple options
- **Canva Integration** - Add images to Canva designs seamlessly
- **Responsive Design** - Works perfectly on all screen sizes
- **English Interface** - Clean, professional English UI

### Supported Formats
- PNG
- JPG/JPEG  
- WebP
- Maximum file size: 5MB

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or v20.10.0
- npm v9 or v10

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enlarger-frontend-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   **Note**: If you encounter Node.js version issues, use:
   ```bash
   npm install --force
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - The app will be ready to use!

## 📖 Usage Guide

### Basic Workflow

1. **Upload Image**
   - Drag and drop an image onto the upload area
   - Or click to select a file from your computer
   - Supported formats: PNG, JPG, WebP (max 5MB)

2. **Adjust Settings**
   - **Flip Type**: Choose Horizontal, Vertical, or Both
   - **Position**: Select Below, Above, Left, or Right
   - **Offset Distance**: Adjust spacing (0-100px)
   - **Opacity**: Control transparency (10-100%)

3. **Generate Effect**
   - Click "Generate Mirror Flip" button
   - Wait for processing (usually takes a few seconds)

4. **Download or Add to Design**
   - **Download**: Save the processed image to your computer (multiple methods available)
   - **Add to Design**: Insert the image into your Canva design
   - **Start Over**: Begin with a new image

### Download Methods

#### Method 1: Automatic Download
- Click the "Download Image" button
- Browser will automatically download the image to your default downloads folder
- Filename format: `flipped_originalfilename.png`

#### Method 2: Right-click Save
- Right-click on the processed image
- Select "Save image as..." or "另存为..."
- Choose your desired location and filename

#### Method 3: New Tab Download
- If automatic download fails, a new tab will open with the image
- Right-click the image in the new tab