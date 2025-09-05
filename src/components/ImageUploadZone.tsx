import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { useImageStore } from '../store/imageStore'

const ImageUploadZone = () => {
  const { addImages } = useImageStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'))
    if (imageFiles.length > 0) {
      addImages(imageFiles)
    }
  }, [addImages])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.bmp', '.tiff']
    },
    multiple: true,
    maxSize: 50 * 1024 * 1024 // 50MB
  })

  const getBorderColor = () => {
    if (isDragReject) return 'border-red-500'
    if (isDragAccept) return 'border-green-500'
    if (isDragActive) return 'border-primary-500'
    return 'border-gray-300 dark:border-gray-600'
  }

  const getBackgroundColor = () => {
    if (isDragReject) return 'bg-red-50 dark:bg-red-900/20'
    if (isDragAccept) return 'bg-green-50 dark:bg-green-900/20'
    if (isDragActive) return 'bg-primary-50 dark:bg-primary-900/20'
    return 'bg-white dark:bg-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${getBorderColor()}
          ${getBackgroundColor()}
          hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isDragActive ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-gray-100 dark:bg-gray-700'}
              transition-colors duration-200
            `}>
              {isDragActive ? (
                <motion.svg
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-8 h-8 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </motion.svg>
              ) : (
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {isDragActive ? 'Drop images here' : 'Upload Images'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isDragActive
                ? 'Release to upload your images'
                : 'Drag and drop images here, or click to select files'
              }
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Supports: JPEG, PNG, WebP, GIF, BMP, TIFF (Max: 50MB per file)
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ImageUploadZone