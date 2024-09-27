import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, comment } = body

  try {
    await resend.emails.send({
      from: 'Hashtag Fish <onboarding@resend.dev>',
      to: ['your-email@example.com'],
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comment:</strong> ${comment}</p>
      `,
    })

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, message: 'Error sending email' }, { status: 500 })
  }
}