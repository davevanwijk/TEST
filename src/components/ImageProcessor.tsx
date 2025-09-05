import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageFile } from '../store/imageStore'

interface ImageProcessorProps {
  image: ImageFile
}

const ImageProcessor = ({ image }: ImageProcessorProps) => {
  const [scaleFactor, setScaleFactor] = useState(2)
  const [algorithm, setAlgorithm] = useState('bicubic')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)

  const handleUpscale = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For now, just return the original image as a placeholder
      // In a real implementation, this would call your upscaling algorithm
      setProcessedImage(image.preview)
    } catch (error) {
      console.error('Processing failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = `upscaled_${image.file.name}`
      link.click()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Process Image
          </h3>
          
          <div className="mb-4">
            <img
              src={image.preview}
              alt={image.file.name}
              className="w-full max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {image.file.name} • {(image.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Scale Factor: {scaleFactor}x
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={scaleFactor}
              onChange={(e) => setScaleFactor(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1x</span>
              <span>2x</span>
              <span>4x</span>
              <span>8x</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="nearest">Nearest Neighbor (Fast)</option>
              <option value="bilinear">Bilinear (Balanced)</option>
              <option value="bicubic">Bicubic (High Quality)</option>
              <option value="lanczos">Lanczos (Best Quality)</option>
              <option value="ai-enhanced">AI Enhanced (Experimental)</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpscale}
            disabled={isProcessing}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Upscale Image
              </>
            )}
          </motion.button>
          
          {processedImage && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </motion.button>
          )}
        </div>

        {processedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200 dark:border-gray-600 pt-6"
          >
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              Processed Result
            </h4>
            <img
              src={processedImage}
              alt="Processed"
              className="w-full max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
              <p>Original: {image.metadata.width}×{image.metadata.height}</p>
              <p>Upscaled: {Math.round(image.metadata.width * scaleFactor)}×{Math.round(image.metadata.height * scaleFactor)}</p>
              <p>Algorithm: {algorithm}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default ImageProcessor