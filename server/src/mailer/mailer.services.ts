import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html: html || text, // Optional HTML version
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(
    to: string,
    resetLink: string,
    expiresIn: string = '24 hours',
  ) {
    const subject = 'Demande de réinitialisation du mot de passe';

    // Plain text version
    const text = `
      You requested a password reset for your account.
      Please click the following link to reset your password:
      ${resetLink}
      
      This link will expire in ${expiresIn}.
      
      If you didn't request this, please ignore this email.
    `;

    // HTML version
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #2c3e50; font-size: 24px; margin-bottom: 20px; }
          .content { margin: 20px 0; }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 15px 0;
          }
          .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
          .code { 
            font-family: monospace; 
            background-color: #f5f5f5; 
            padding: 2px 5px;
            border-radius: 3px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Demande de réinitialisation du mot de passe</div>
          <div class="content">
            <p>Vous avez demandé une réinitialisation du mot de passe pour votre compte.</p>
            <p>Veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe:</p>
            <p>
              <a href="${resetLink}" class="button">Réinitialiser le mot de passe</a>
            </p>
            <p>Ou copiez et collez ce lien dans votre navigateur:</p>
            <p class="code">${resetLink}</p>
            <p>Ce lien expirera dans <strong>${expiresIn}</strong>.</p>
            <p>Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail.</p>
          </div>
          <div class="footer">
            <p>Si vous rencontrez des problèmes avec le bouton ci-dessus, copiez et collez l'URL dans votre navigateur Web.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || text, // Optional HTML version
    });
  }

  async sendContactEmail(
    email: string,
    nom: string,
    prenom: string,
    msg: string,
    to: string,
  ) {
    const subject = 'Demande de réinitialisation du mot de passe';

    // Plain text version
    const text = `
      Nom: ${nom}
      Prenom: ${prenom}
      Email: ${email}
    `;

    // HTML version
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { color: #2c3e50; font-size: 24px; margin-bottom: 20px; }
          .content { margin: 20px 0; }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 15px 0;
          }
          .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
          .code { 
            font-family: monospace; 
            background-color: #f5f5f5; 
            padding: 2px 5px;
            border-radius: 3px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <p class="code">Bonjour, </p>
            <p>
              Nom: ${nom}
            </p>
            <p>
              Prenom: ${prenom}
            </p>
            <p>
              Email: ${email}
            </p>            
            <p class="code">Contenu du message: </p>
            <p class="code">${msg}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: html || text, // Optional HTML version
    });
  }
}
