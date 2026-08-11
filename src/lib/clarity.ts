import Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID =
  import.meta.env.VITE_CLARITY_PROJECT_ID ||
  import.meta.env.VITE_CLARITY_ID;

export const initClarity = (projectId?: string) => {
  const id = projectId || CLARITY_PROJECT_ID;

  if (typeof window === 'undefined') return;

  if (!id) {
    console.warn(
      '[Clarity] Project ID is not set. Please provide VITE_CLARITY_PROJECT_ID in your environment variables.'
    );
    return;
  }

  try {
    Clarity.init(id);
    console.log('[Clarity] Initialized with Project ID:', id);
  } catch (error) {
    console.error('[Clarity] Failed to initialize Microsoft Clarity:', error);
  }
};

export { Clarity };
export default Clarity;
