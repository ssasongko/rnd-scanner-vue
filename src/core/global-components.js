import vueInit from '@/core/initiate.js'

const components = import.meta.globEager('@/components/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  // "./components/Fruits.vue" will become "Fruits"
  const registeredName = definition.default.name !== undefined 
    ? definition.default.name.replace(/ /, '')
    : path.split('/').pop().replace(/\.\w+$/, '')

  // Register component on this Vue instance
  vueInit.component(registeredName, definition.default)
})
