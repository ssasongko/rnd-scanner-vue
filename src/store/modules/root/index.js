import { defineStore, acceptHMRUpdate } from 'pinia'

const useRoot = defineStore('root', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})

// make sure to pass the right store definition, `useRoot` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoot, import.meta.hot))
}

export default useRoot
