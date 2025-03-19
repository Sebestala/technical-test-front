import { Snackbar, Alert } from '@mui/material'
import { useNotification } from '@context'

/**
 * Global notification component that displays temporary messages
 * Uses Material-UI's Snackbar and Alert components
 * Automatically hides after 3 seconds
 */
export function NotificationSnackbar() {
  const { notification, hideNotification } = useNotification()

  if (!notification.open) return null

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={hideNotification}
        severity={notification.type}
        variant="filled"
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}
