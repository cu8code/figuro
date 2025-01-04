"use client";

import { blendImagesTransParentMask, cookImage } from '@/lib/utils';
import React, { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { ModelContext } from './ModalContex';
import { Pencil, Eraser, Download } from 'lucide-react';

const IconButton = ({ onClick, title, active = false, children }) => (
    <button 
        onClick={onClick}
        className={`
            p-2 rounded-lg transition-all duration-200 
            ${active 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }
            flex items-center justify-center
            border border-gray-200 shadow-sm
        `}
        title={title}
    >
        {children}
    </button>
);

const ControlPanel = ({ currentMode, setCurrentMode, onDownload }) => {
    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200">
            <div className="flex gap-4">
                <IconButton 
                    onClick={() => setCurrentMode('draw')} 
                    title="Draw Mode"
                    active={currentMode === 'draw'}
                >
                    <Pencil size={20} />
                </IconButton>
                
                <IconButton 
                    onClick={() => setCurrentMode('erase')} 
                    title="Erase Mode"
                    active={currentMode === 'erase'}
                >
                    <Eraser size={20} />
                </IconButton>
                
                <IconButton 
                    onClick={onDownload} 
                    title="Download Image"
                >
                    <Download size={20} />
                </IconButton>
            </div>
            
            <div className="pl-4 border-l border-gray-200 flex items-center">
                <span className="text-sm font-medium text-gray-600 capitalize">
                    {currentMode} Mode
                </span>
            </div>
        </div>
    );
};

interface CanvasProps {
    imageUrl: string;
    brushSize?: number;
		mode?: 'draw' | 'erase'
}

const Canvas: React.FC<CanvasProps> = ({ imageUrl, brushSize = 20, mode = 'erase' }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [maskImageData, setMaskImageData] = useState<Uint8ClampedArray | null>(null);
    const [resizedImageData, setResizedImageData] = useState<Uint8ClampedArray | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentMode, setCurrentMode] = useState<'draw' | 'erase'>(mode);
    const model = useContext(ModelContext);
    
    const redrawCanvas = useCallback(() => {
        if (!canvasRef.current || !resizedImageData || !maskImageData) return;
        const ctx = canvasRef.current.getContext('2d')!;
        const blendedResult = blendImagesTransParentMask(
            resizedImageData,
            maskImageData,
            canvasRef.current.width,
            canvasRef.current.height
        );
        
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = new ImageData(blendedResult, canvasRef.current.width, canvasRef.current.height);
        ctx.putImageData(imageData, offset.x, offset.y);
    }, [resizedImageData, maskImageData, offset]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const load = async () => {
            try {
                const { resizedImageData, maskImageData, height: imgHeight, width: imgWidth } = 
                    await cookImage(imageUrl, model);
                canvas.height = imgHeight;
                canvas.width = imgWidth;
                setMaskImageData(maskImageData);
                setResizedImageData(resizedImageData);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        load();
        return () => {
            setMaskImageData(null);
            setResizedImageData(null);
        };
    }, [imageUrl, model]);

    useEffect(() => {
        redrawCanvas();
    }, [redrawCanvas]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDrawing(true);
        
        const x = e.nativeEvent.offsetX - offset.x;
        const y = e.nativeEvent.offsetY - offset.y;
        
        if (currentMode === 'draw') {
            drawCircle(x, y);
        } else {
            eraseCircle(x, y);
        }
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        
        const x = e.nativeEvent.offsetX - offset.x;
        const y = e.nativeEvent.offsetY - offset.y;
        
        if (currentMode === 'draw') {
            drawCircle(x, y);
        } else {
            eraseCircle(x, y);
        }
    };
    
    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const drawCircle = (x: number, y: number) => {
        if (!maskImageData) return;

        const newMaskImageData = new Uint8ClampedArray(maskImageData);
        const width = canvasRef.current!.width;
        const height = canvasRef.current!.height;

        for (let i = -brushSize; i <= brushSize; i++) {
            for (let j = -brushSize; j <= brushSize; j++) {
                if (i * i + j * j <= brushSize * brushSize) {
                    const newX = Math.round(x + i);
                    const newY = Math.round(y + j);
                    if (newX >= 0 && newY >= 0 && newX < width && newY < height) {
                        const pixelIndex = (newY * width + newX) * 4;
                        newMaskImageData[pixelIndex] = 255;
                        newMaskImageData[pixelIndex + 1] = 255;
                        newMaskImageData[pixelIndex + 2] = 255;
                        newMaskImageData[pixelIndex + 3] = 255;
                    }
                }
            }
        }

        setMaskImageData(newMaskImageData);
    };

    const eraseCircle = (x: number, y: number) => {
        if (!maskImageData) return;

        const newMaskImageData = new Uint8ClampedArray(maskImageData);
        const width = canvasRef.current!.width;
        const height = canvasRef.current!.height;

        for (let i = -brushSize; i <= brushSize; i++) {
            for (let j = -brushSize; j <= brushSize; j++) {
                if (i * i + j * j <= brushSize * brushSize) {
                    const newX = Math.round(x + i);
                    const newY = Math.round(y + j);
                    if (newX >= 0 && newY >= 0 && newX < width && newY < height) {
                        const pixelIndex = (newY * width + newX) * 4;
                        newMaskImageData[pixelIndex] = 0;
                        newMaskImageData[pixelIndex + 1] = 0;
                        newMaskImageData[pixelIndex + 2] = 0;
                        newMaskImageData[pixelIndex + 3] = 255;
                    }
                }
            }
        }

        setMaskImageData(newMaskImageData);
    };

    const handleDownloadClick = () => {
        const canvas = canvasRef.current;
        if (!canvas || !maskImageData || !resizedImageData) return;
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext('2d')!;
        
        const finalImageData = new Uint8ClampedArray(maskImageData.length);
        
        for (let i = 0; i < maskImageData.length; i += 4) {
            // Check if mask pixel is black (erased)
            if (maskImageData[i] === 0 && 
                maskImageData[i + 1] === 0 && 
                maskImageData[i + 2] === 0) {
                // Make transparent
                finalImageData[i] = 0;
                finalImageData[i + 1] = 0;
                finalImageData[i + 2] = 0;
                finalImageData[i + 3] = 0;
            } else {
                // Use original image data
                finalImageData[i] = resizedImageData[i];
                finalImageData[i + 1] = resizedImageData[i + 1];
                finalImageData[i + 2] = resizedImageData[i + 2];
                finalImageData[i + 3] = 255;
            }
        }
        
        ctx.putImageData(new ImageData(finalImageData, canvas.width, canvas.height), 0, 0);
        
        const link = document.createElement('a');
        link.download = 'canvas-image.png';
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <canvas
                ref={canvasRef}
                className="border border-gray-200 mx-auto cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
            />
            <ControlPanel 
                currentMode={currentMode}
                setCurrentMode={setCurrentMode}
                onDownload={handleDownloadClick}
            />
        </div>
    );
};

export default Canvas;
