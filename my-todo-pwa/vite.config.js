import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Todoist/my-todo-pwa/',  // 👈 replace with your repo name
})
