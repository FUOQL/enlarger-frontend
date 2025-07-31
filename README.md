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
- Select "Save image as..." to download

### Advanced Features

#### Real-time Parameter Adjustment
- All changes are applied automatically
- No need to regenerate after each adjustment
- Instant visual feedback

#### Multiple Flip Types
- **Horizontal**: Mirror flip left to right
- **Vertical**: Mirror flip top to bottom  
- **Both**: Combine horizontal and vertical flips

#### Position Options
- **Below**: Place flipped image below original
- **Above**: Place flipped image above original
- **Left**: Place flipped image to the left
- **Right**: Place flipped image to the right

## 🛠️ Technical Implementation

### Core Technologies
- **React** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Canvas API** - Image manipulation and processing
- **Canva Apps SDK** - Integration with Canva platform
- **Webpack** - Build system

### Key Components

#### Image Processing
```javascript
async function flipImage(imageUrl, flipType, position, offset, opacity) {
  // Canvas-based image manipulation
  // Supports horizontal, vertical, and both flips
  // Configurable position and opacity
}
```

#### Download Functionality
```javascript
function downloadImage(dataUrl, filename) {
  // Method 1: Create download link
  // Method 2: Open in new tab for manual save
  // Returns success/failure status
}
```

### Architecture
```
src/
├── app.tsx          # Main application component
├── index.tsx        # Application entry point
styles/
├── components.css   # Styling and animations
```

## 🎨 UI/UX Features

### Modern Design
- **Gradient Backgrounds** - Beautiful visual effects
- **Glass Morphism** - Blur effects and transparency
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Adapts to all screen sizes

### User Interface
- **Intuitive Controls** - Easy-to-use sliders and buttons
- **Visual Feedback** - Loading states and progress indicators
- **Download Status** - Real-time download status and error handling
- **Error Handling** - Clear error messages and recovery options
- **Accessibility** - Keyboard navigation and screen reader support

## 📱 Responsive Design

### Desktop Experience
- Full-featured interface
- Large image previews
- Detailed control panels
- Hover effects and animations

### Mobile Experience
- Touch-optimized controls
- Compact layout
- Swipe-friendly interface
- Fast loading times

## 🔧 Development

### Project Structure
```
enlarger-frontend-main/
├── src/                    # Source code
│   ├── app.tsx            # Main app component
│   └── index.tsx          # Entry point
├── styles/                # Styling
│   └── components.css     # Component styles
├── scripts/               # Build and start scripts
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm lint:types` - Type checking

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain responsive design principles
- Ensure accessibility compliance

## 🚀 Performance Optimizations

### Image Processing
- **Canvas-based Processing** - Fast client-side image manipulation
- **Optimized Algorithms** - Efficient flip and transform operations
- **Memory Management** - Proper cleanup of canvas resources

### User Experience
- **Instant Feedback** - Real-time parameter updates
- **Smooth Animations** - 60fps transitions and effects
- **Fast Loading** - Optimized bundle size and lazy loading

## 🔍 Troubleshooting

### Common Issues

#### Installation Problems
```bash
# If npm install fails due to Node.js version
npm install --force

# If ngrok module is missing
npm install @ngrok/ngrok --force
```

#### Download Issues
- **Automatic download blocked**: Use right-click "Save as..." method
- **File not found**: Check your browser's download settings
- **Permission denied**: Ensure you have write access to downloads folder

#### Runtime Issues
- **Port 8080 in use**: Change port in `scripts/start/start.ts`
- **Image upload fails**: Check file size and format
- **Processing errors**: Refresh page and try again

### Download Troubleshooting

#### Browser Compatibility
- **Chrome/Edge**: Automatic download should work
- **Firefox**: May require manual save
- **Safari**: Use right-click method

#### Download Status Messages
- ✅ **"Download started! Check your downloads folder."** - Success
- ❌ **"Download failed. Try right-clicking the image and 'Save as...'"** - Use alternative method
- ⏳ **"Downloading..."** - In progress

### Debug Mode
- Open browser developer tools
- Check console for error messages
- Verify network requests

## 📋 Setup Instructions

### Step-by-Step Setup

1. **Environment Setup**
   ```bash
   # Check Node.js version
   node --version
   # Should be v18 or v20.10.0
   
   # Check npm version
   npm --version
   # Should be v9 or v10
   ```

2. **Project Setup**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd enlarger-frontend-main
   
   # Install dependencies
   npm install --force
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Access Application**
   - Open browser to `http://localhost:8080`
   - Upload an image
   - Adjust flip settings
   - Generate and download result

### Configuration Options

#### Port Configuration
If port 8080 is in use, modify `scripts/start/start.ts`:
```typescript
const port = 8081; // Change to available port
```

#### File Size Limits
Current limit: 5MB
To modify, update the FileInput component in `src/app.tsx`

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow existing code style
- Add TypeScript types
- Include error handling
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Canva Apps SDK** - For platform integration
- **React Community** - For excellent documentation
- **Canvas API** - For powerful image manipulation capabilities

---

**Built with ❤️ for the Canva community**
