export interface DefaultState {
  status: 'idle' | 'loading' | 'complete' | 'error',
  error: string | null
}
