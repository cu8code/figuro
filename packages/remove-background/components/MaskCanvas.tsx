"use client";

import { blendImagesTransParentMask, cookImage } from '@/lib/utils';
import React, { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { ModelContext } from './ModalContex';
import { Download } from 'lucide-react';

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
        
        if (e.button === 2) {
            setCurrentMode('erase');
        } else if (e.button === 0) {
            setCurrentMode('draw');
        }
        
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
                style={{
                    border: '1px solid black',
                    display: 'block',
                    margin: 'auto',
                    cursor: isDrawing ? 'crosshair' : 'default',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onContextMenu={(e) => e.preventDefault()}
            />
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                padding: '5px',
            }}>
                <button 
                    onClick={handleDownloadClick}
                    style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                    }}
                    title="Download"
                >
                    <Download size={24} />
                </button>
            </div>
        </div>
    );
};

export default Canvas;
