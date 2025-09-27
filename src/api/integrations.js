// Core integrations without base44 dependency

// LLM invocation function
export async function InvokeLLM(options = {}) {
    const {
        model = 'gpt-3.5-turbo',
        messages = [],
        temperature = 0.7,
        maxTokens = 1000,
        apiKey,
        baseUrl = 'https://api.openai.com/v1'
    } = options;

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
                max_tokens: maxTokens
            })
        });

        if (!response.ok) {
            throw new Error(`LLM API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error invoking LLM:', error);
        throw error;
    }
}

// Email sending function
export async function SendEmail(options = {}) {
    const {
        to,
        from,
        subject,
        text,
        html,
        apiKey,
        service = 'sendgrid' // or 'mailgun', 'ses', etc.
    } = options;

    try {
        // Example implementation for SendGrid
        if (service === 'sendgrid') {
            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    personalizations: [{
                        to: [{ email: to }]
                    }],
                    from: { email: from },
                    subject,
                    content: [
                        ...(text ? [{ type: 'text/plain', value: text }] : []),
                        ...(html ? [{ type: 'text/html', value: html }] : [])
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`Email API error: ${response.status}`);
            }

            return { success: true, messageId: response.headers.get('x-message-id') };
        }

        throw new Error(`Unsupported email service: ${service}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// File upload function
export async function UploadFile(options = {}) {
    const {
        file,
        bucket,
        key,
        contentType,
        apiKey
    } = options;

    try {
        const formData = new FormData();
        formData.append('file', file);
        if (bucket) formData.append('bucket', bucket);
        if (key) formData.append('key', key);
        if (contentType) formData.append('contentType', contentType);

        // Generic file upload endpoint
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Upload error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

// Image generation function
export async function GenerateImage(options = {}) {
    const {
        prompt,
        size = '1024x1024',
        model = 'dall-e-3',
        quality = 'standard',
        apiKey,
        baseUrl = 'https://api.openai.com/v1'
    } = options;

    try {
        const response = await fetch(`${baseUrl}/images/generations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                prompt,
                size,
                quality,
                n: 1
            })
        });

        if (!response.ok) {
            throw new Error(`Image generation error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

// Data extraction from uploaded files
export async function ExtractDataFromUploadedFile(options = {}) {
    const {
        fileUrl,
        filePath,
        extractionType = 'text', // 'text', 'json', 'csv', 'pdf'
        apiKey
    } = options;

    try {
        const response = await fetch('/api/extract-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                fileUrl,
                filePath,
                extractionType
            })
        });

        if (!response.ok) {
            throw new Error(`Data extraction error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error extracting data from file:', error);
        throw error;
    }
}

// Create signed URL for file access
export async function CreateFileSignedUrl(options = {}) {
    const {
        bucket,
        key,
        expiresIn = 3600, // 1 hour in seconds
        method = 'GET',
        apiKey,
        service = 's3'
    } = options;

    try {
        const response = await fetch('/api/signed-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                bucket,
                key,
                expiresIn,
                method,
                service
            })
        });

        if (!response.ok) {
            throw new Error(`Signed URL creation error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating signed URL:', error);
        throw error;
    }
}

// Upload private file function
export async function UploadPrivateFile(options = {}) {
    const {
        file,
        bucket,
        key,
        contentType,
        encryption = true,
        accessLevel = 'private',
        apiKey
    } = options;

    try {
        const formData = new FormData();
        formData.append('file', file);
        if (bucket) formData.append('bucket', bucket);
        if (key) formData.append('key', key);
        formData.append('accessLevel', accessLevel);
        formData.append('encryption', encryption.toString());
        if (contentType) formData.append('contentType', contentType);

        const response = await fetch('/api/upload-private', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Private upload error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error uploading private file:', error);
        throw error;
    }
}

// Core namespace object (DEBE ir AL FINAL después de declarar las funciones)
export const Core = {
    InvokeLLM,
    SendEmail,
    UploadFile,
    GenerateImage,
    ExtractDataFromUploadedFile,
    CreateFileSignedUrl,
    UploadPrivateFile
};