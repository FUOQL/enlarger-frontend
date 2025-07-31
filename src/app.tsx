import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Design, ImageElement } from '@canva/design';
import { Asset } from '@canva/asset';
import { Button, Card, CardContent, Slider, Switch, Tabs, Tab, Box, Typography } from '@canva/app-ui-kit';
import '../styles/components.css';

// Import compare slider component
import { CompareSlider, CompareSliderImage } from 'react-compare-slider';

// Define types
interface ImageData {
  url: string;
  width: number;
  height: number;
  id: string;
}

interface FlipOptions {
  type: 'horizontal' | 'vertical' | 'both';
  position: 'below' | 'above' | 'left' | 'right';
  offset: number;
  opacity: number;
}

// Main component
const MirrorFlipApp: React.FC = () => {
  // State hooks
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [flippedImage, setFlippedImage] = useState<HTMLCanvasElement | null>(null);
  const [flipOptions, setFlipOptions] = useState<FlipOptions>({
    type: 'horizontal',
    position: 'below',
    offset: 20,
    opacity: 80,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);

  // Fetch design images
  const { data: designImages, isLoading } = useQuery<ImageElement[]>({
    queryKey: ['designImages'],
    queryFn: async () => {
      try {
        const design = await Design.get();
        return design.getElements().filter((element): element is ImageElement => {
          return element.type === 'image';
        });
      } catch (error) {
        console.error('Failed to fetch design images:', error);
        setError('Failed to fetch design images. Please try again.');
        return [];
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // Handle image selection
  const handleImageSelect = (image: ImageData) => {
    setSelectedImage(image);
    setFlippedImage(null);
    setError(null);
  };

  // Generate flipped image
  const generateFlippedImage = () => {
    if (!selectedImage || !originalImageRef.current) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const img = originalImageRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Calculate canvas dimensions based on flip type and position
      let canvasWidth = img.width;
      let canvasHeight = img.height;

      if (flipOptions.position === 'left' || flipOptions.position === 'right') {
        canvasWidth = img.width * 2 + flipOptions.offset;
      } else if (flipOptions.position === 'above' || flipOptions.position === 'below') {
        canvasHeight = img.height * 2 + flipOptions.offset;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Draw original image
      if (flipOptions.position === 'right' || flipOptions.position === 'below') {
        ctx.drawImage(img, 0, 0);
      } else if (flipOptions.position === 'left') {
        ctx.drawImage(img, img.width + flipOptions.offset, 0);
      } else if (flipOptions.position === 'above') {
        ctx.drawImage(img, 0, img.height + flipOptions.offset);
      }

      // Prepare for flipping
      ctx.save();

      // Set opacity
      ctx.globalAlpha = flipOptions.opacity / 100;

      // Calculate flip position
      let flipX = 0;
      let flipY = 0;

      if (flipOptions.position === 'right') {
        flipX = img.width + flipOptions.offset;
      } else if (flipOptions.position === 'left') {
        flipX = 0;
      } else if (flipOptions.position === 'below') {
        flipY = img.height + flipOptions.offset;
      } else if (flipOptions.position === 'above') {
        flipY = 0;
      }

      // Apply transformations based on flip type
      if (flipOptions.type === 'horizontal') {
        ctx.translate(flipX + img.width, flipY);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
      } else if (flipOptions.type === 'vertical') {
        ctx.translate(flipX, flipY + img.height);
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0);
      } else if (flipOptions.type === 'both') {
        ctx.translate(flipX + img.width, flipY + img.height);
        ctx.scale(-1, -1);
        ctx.drawImage(img, 0, 0);
      }

      ctx.restore();

      setFlippedImage(canvas);
    } catch (err) {
      console.error('Error generating flipped image:', err);
      setError('Failed to generate flipped image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download image
  const downloadImage = () => {
    if (!flippedImage) return;

    const link = document.createElement('a');
    link.download = `flipped_${Date.now()}.png`;
    link.href = flippedImage.toDataURL('image/png');
    link.click();
  };

  // Add to Canva design
  const addToDesign = async () => {
    if (!flippedImage) return;

    try {
      setIsProcessing(true);

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        flippedImage.toBlob(resolve, 'image/png');
      });

      if (!blob) {
        throw new Error('Failed to convert canvas to blob');
      }

      // Upload as asset
      const asset = await Asset.upload({
        data: blob,
        mimeType: 'image/png',
        name: `flipped_image_${Date.now()}.png`,
      });

      // Add to design
      const design = await Design.get();
      await design.createImageElement({
        assetId: asset.id,
        width: flippedImage.width,
        height: flippedImage.height,
      });

      setError(null);
      alert('Image added to design successfully!');
    } catch (err) {
      console.error('Error adding image to design:', err);
      setError('Failed to add image to design. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Effect to load original image
  useEffect(() => {
    if (selectedImage && originalImageRef.current) {
      const img = originalImageRef.current;
      img.onload = () => {
        generateFlippedImage();
      };
      img.onerror = () => {
        setError('Failed to load selected image.');
      };
      img.src = selectedImage.url;
    }
  }, [selectedImage, flipOptions]);

  // Render image selection grid
  const renderImageSelection = () => {
    if (isLoading) {
      return <div className="loading">Loading images...</div>;
    }

    if (designImages.length === 0) {
      return <div className="no-images">No images found in your design.</div>;
    }

    return (
      <div className="image-grid">
        {designImages.map((image) => (
          <div
            key={image.id}
            className={`image-item ${selectedImage?.id === image.id ? 'selected' : ''}`}
            onClick={() =>
              handleImageSelect({
                url: image.getImageUrl(),
                width: image.width,
                height: image.height,
                id: image.id,
              })
            }
          >
            <img
              src={image.getImageUrl()}
              alt={`Image ${image.id}`}
              className="thumbnail"
            />
          </div>
        ))}
      </div>
    );
  };

  // Render flip options
  const renderFlipOptions = () => {
    if (!selectedImage) return null;

    return (
      <Card className="options-card">
        <CardContent>
          <Typography variant="h6" gutterBottom>Flip Options</Typography>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>Flip Type</Typography>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="horizontal"
                  checked={flipOptions.type === 'horizontal'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, type: e.target.value as 'horizontal' })
                  }
                />
                Horizontal
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="vertical"
                  checked={flipOptions.type === 'vertical'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, type: e.target.value as 'vertical' })
                  }
                />
                Vertical
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="both"
                  checked={flipOptions.type === 'both'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, type: e.target.value as 'both' })
                  }
                />
                Both
              </label>
            </div>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>Position</Typography>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="below"
                  checked={flipOptions.position === 'below'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, position: e.target.value as 'below' })
                  }
                />
                Below
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="above"
                  checked={flipOptions.position === 'above'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, position: e.target.value as 'above' })
                  }
                />
                Above
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="left"
                  checked={flipOptions.position === 'left'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, position: e.target.value as 'left' })
                  }
                />
                Left
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="right"
                  checked={flipOptions.position === 'right'}
                  onChange={(e) =>
                    setFlipOptions({ ...flipOptions, position: e.target.value as 'right' })
                  }
                />
                Right
              </label>
            </div>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              Offset Distance: {flipOptions.offset}px
            </Typography>
            <Slider
              value={flipOptions.offset}
              min={0}
              max={100}
              step={1}
              onChange={(e) =>
                setFlipOptions({ ...flipOptions, offset: e.target.value as number })
              }
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              Opacity: {flipOptions.opacity}%
            </Typography>
            <Slider
              value={flipOptions.opacity}
              min={10}
              max={100}
              step={1}
              onChange={(e) =>
                setFlipOptions({ ...flipOptions, opacity: e.target.value as number })
              }
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            disabled={isProcessing}
            onClick={generateFlippedImage}
            fullWidth
          >
            {isProcessing ? 'Generating...' : 'Generate Mirror Flip'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Render result view
  const renderResultView = () => {
    if (!flippedImage) return null;

    return (
      <div className="result-container">
        <div className="result-image-container">
          <img
            src={flippedImage.toDataURL('image/png')}
            alt="Flipped Image"
            className="result-image"
          />
        </div>
        <div className="result-actions">
          <Button
            variant="contained"
            color="primary"
            disabled={isProcessing}
            onClick={downloadImage}
            className="action-button"
          >
            Download Image
          </Button>
          <Button
            variant="outlined"
            color="primary"
            disabled={isProcessing}
            onClick={addToDesign}
            className="action-button"
          >
            Add to Design
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => setSelectedImage(null)}
            className="action-button"
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Helmet>
        <title>Mirror Flip Tool | Canva</title>
      </Helmet>

      <div className="app-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Mirror Flip Tool
        </Typography>
        <Typography variant="subtitle1">
          Create stunning mirror flip effects on your images
        </Typography>
      </div>

      {error && (
        <div className="error-message">
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </div>
      )}

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Select Image" />
        {selectedImage && <Tab label="Flip Options" />
        {flippedImage && <Tab label="Result" />}
      </Tabs>

      <div className="tab-content">
        {activeTab === 0 && renderImageSelection()}
        {activeTab === 1 && selectedImage && renderFlipOptions()}
        {activeTab === 2 && flippedImage && renderResultView()}
      </div>

      {/* Hidden image and canvas for processing */}
      <img
        ref={originalImageRef}
        style={{ display: 'none' }}
        alt="Original for processing"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default MirrorFlipApp;