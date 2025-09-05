import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageUploadZone from './components/ImageUploadZone'
import ImageProcessor from './components/ImageProcessor'
import Header from './components/Header'
import { useImageStore } from './store/imageStore'

function App() {
  const { images, selectedImage } = useImageStore()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
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
                      <div key={image.id} className="relative group cursor-pointer">
                        <img
                          src={image.preview}
                          alt={image.file.name}
                          className="w-full h-24 object-cover rounded-lg border-2 border-transparent group-hover:border-primary-500 transition-colors"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium">Select</span>
                        </div>
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
                    Upload an image and select it to start the upscaling process
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