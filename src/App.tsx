import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageUploadZone from './components/ImageUploadZone'
import ImageProcessor from './components/ImageProcessor'
import Header from './components/Header'
import { useImageStore } from './store/imageStore'

function App() {
  const { images, selectedImage, selectImage } = useImageStore()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleImageSelect = (image: any) => {
    selectImage(image)
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Image Upscaler
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Enhance your images with advanced AI-powered upscaling technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <ImageUploadZone />
              
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Uploaded Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image) => (
                      <div 
                        key={image.id} 
                        className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                          selectedImage?.id === image.id ? 'ring-2 ring-primary-500' : ''
                        }`}
                        onClick={() => handleImageSelect(image)}
                      >
                        <img
                          src={image.preview}
                          alt={image.file.name}
                          className="w-full h-24 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {selectedImage?.id === image.id ? 'Selected' : 'Select'}
                          </span>
                        </div>
                        {selectedImage?.id === image.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              {selectedImage ? (
                <ImageProcessor image={selectedImage} />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select an Image to Process
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Upload an image and click on it to start the upscaling process
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default App