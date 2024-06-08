import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const customRollupConfig = {
  external: ['react', 'react-dom', 'he'], 
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'he': 'he', 
    },
  },
};

const additionalRollupConfig = {
  build: {
    rollupOptions: {
      external: ['react-confetti']
    }
  }
};

export default defineConfig({
  plugins: [react()],
  rollupInputOptions: customRollupConfig,
  ...additionalRollupConfig, 
});
