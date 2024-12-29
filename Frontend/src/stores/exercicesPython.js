import { create } from "zustand"

export const useExercicesPythonStore = create((set) => ({
  exercises: [],
  currentExercise: 0,

  setExercises: (exercises) => set({ exercises }),
  setCurrentExercise: (currentExerciseData) => set({ currentExerciseData }),
  nextExercise: () => {
    set((state) => {
      return { currentExercise: state.currentExercise + 1 }
    })
  },
  previousExercise: () => {
    set((state) => {
      return { currentExercise: state.currentExercise - 1 }
    })
  },

  fetchExercises: async (dificultity = "Fácil", language = "Python") => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ejercicios?nivel_dificultad=${dificultity}&lenguaje=${language}`
      )
      const data = await response.json()

      set({ exercises: data })
    } catch (error) {
      console.log(error)

      set({ exercises: [] })
    }
  }
}))