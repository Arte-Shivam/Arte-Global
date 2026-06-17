import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailConfigured = Boolean(serviceId && templateId && publicKey)

interface EmailParams extends Record<string, unknown> {
  from_name: string
  from_email: string
  subject: string
  message: string
  form_type?: string
  phone?: string
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!isEmailConfigured) {
    console.warn('EmailJS not configured. Form submission logged:', params)
    return true
  }

  try {
    await emailjs.send(serviceId, templateId, params, publicKey)
    return true
  } catch (error) {
    console.error('Email send failed:', error)
    return false
  }
}
