import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ImageFile {
  id: string
  file: File
  preview: string
  metadata: {
    width: number
    height: number
    size: number
    type: string
  }
  status: 'uploaded' | 'processing' | 'completed' | 'error'
}

export interface ProcessedImage extends ImageFile {
  processedFile?: Blob
  processingSettings?: {
    scaleFactor: number
    algorithm: string
    quality: number
  }
}

interface ImageStore {
  images: ImageFile[]
  selectedImage: ImageFile | null
  processedImages: ProcessedImage[]
  isProcessing: boolean
  
  // Actions
  addImages: (files: File[]) => void
  removeImage: (id: string) => void
  selectImage: (image: ImageFile) => void
  setProcessing: (processing: boolean) => void
  addProcessedImage: (processedImage: ProcessedImage) => void
  clearImages: () => void
}

export const useImageStore = create<ImageStore>()()
  persist(
    (set, get) => ({
      images: [],
      selectedImage: null,
      processedImages: [],
      isProcessing: false,

      addImages: (files: File[]) => {
        const newImages: ImageFile[] = files.map(file => ({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
          metadata: {
            width: 0, // Will be updated after image loads
            height: 0,
            size: file.size,
            type: file.type
          },
          status: 'uploaded' as const
        }))
        
        set(state => ({
          images: [...state.images, ...newImages]
        }))
      },

      removeImage: (id: string) => {
        set(state => {
          const imageToRemove = state.images.find(img => img.id === id)
          if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.preview)
          }
          
          return {
            images: state.images.filter(img => img.id !== id),
            selectedImage: state.selectedImage?.id === id ? null : state.selectedImage
          }
        })
      },

      selectImage: (image: ImageFile) => {
        set({ selectedImage: image })
      },

      setProcessing: (processing: boolean) => {
        set({ isProcessing: processing })
      },

      addProcessedImage: (processedImage: ProcessedImage) => {
        set(state => ({
          processedImages: [...state.processedImages, processedImage]
        }))
      },

      clearImages: () => {
        const { images } = get()
        images.forEach(img => URL.revokeObjectURL(img.preview))
        set({
          images: [],
          selectedImage: null,
          processedImages: [],
          isProcessing: false
        })
      }
    }),
    {
      name: 'image-store',
      partialize: (state) => ({
        // Don't persist File objects, only metadata
        processedImages: state.processedImages.map(img => ({
          ...img,
          file: undefined,
          processedFile: undefined
        }))
      })
    }
  )